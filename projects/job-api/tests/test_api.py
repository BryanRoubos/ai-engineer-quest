from fastapi.testclient import TestClient
from app.main import app, jobs

client = TestClient(app)

def setup_function():
    jobs.clear()

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "1.0"}

def test_create_and_get():
    created = client.post("/jobs", json={"prompt": "hello"})
    assert created.status_code == 201
    job_id = created.json()["id"]
    assert client.get(f"/jobs/{job_id}").json()["prompt"] == "hello"

def test_invalid_prompt():
    assert client.post("/jobs", json={"prompt": ""}).status_code == 422

def test_missing_job():
    assert client.get("/jobs/999999").status_code == 404

def test_delete_job():
    created = client.post("/jobs", json={"prompt": "test"})
    job_id = created.json()["id"]
    assert client.delete(f"/jobs/{job_id}").status_code == 204
    assert client.get(f"/jobs/{job_id}").status_code == 404
