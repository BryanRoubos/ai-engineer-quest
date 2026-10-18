"""Independent, temporary SQLite tests; no Docker or running server required."""
import os
import tempfile
from pathlib import Path

tmp = tempfile.TemporaryDirectory()
os.environ["DATABASE_URL"] = "sqlite:///" + str(Path(tmp.name) / "tests.db")
os.environ["DEV_API_TOKEN"] = "test-token"

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402
from app.database import Base, engine  # noqa: E402
from app import models  # noqa: E402,F401
from app.main import app  # noqa: E402

client = TestClient(app)
AUTH = {"Authorization": "Bearer test-token"}

@pytest.fixture(autouse=True)
def clean_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def test_health():
    assert client.get("/health").json() == {"status": "ok", "version": "1.0"}

def test_authentication():
    assert client.get("/jobs").status_code == 401
    assert client.get("/jobs", headers={"Authorization": "Bearer wrong"}).status_code == 401
    assert client.get("/jobs", headers=AUTH).status_code == 200

def test_create_and_get():
    created = client.post("/jobs", headers=AUTH, json={"prompt": "hello"})
    assert created.status_code == 201
    job_id = created.json()["id"]
    assert client.get(f"/jobs/{job_id}", headers=AUTH).json()["prompt"] == "hello"
    assert client.get("/jobs", headers=AUTH).json()[0]["status"] == "queued"

def test_invalid_prompt():
    assert client.post("/jobs", headers=AUTH, json={"prompt": ""}).status_code == 422

def test_missing_job():
    assert client.get("/jobs/999999", headers=AUTH).status_code == 404

def test_delete_job():
    created = client.post("/jobs", headers=AUTH, json={"prompt": "test"})
    job_id = created.json()["id"]
    assert client.delete(f"/jobs/{job_id}", headers=AUTH).status_code == 204
    assert client.get(f"/jobs/{job_id}", headers=AUTH).status_code == 404

def test_persistence_across_sessions():
    created = client.post("/jobs", headers=AUTH, json={"prompt": "persist"})
    from app.database import SessionLocal
    with SessionLocal() as another_session:
        assert another_session.get(models.Job, created.json()["id"]).prompt == "persist"
