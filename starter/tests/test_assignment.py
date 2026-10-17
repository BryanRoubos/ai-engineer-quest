"""Level 1 assignment checks.

These tests intentionally fail until you implement the job endpoints.
Run: python -m pytest tests/test_assignment.py -q
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_job():
    r = client.post("/jobs", json={"name": "embedding-index"})
    assert r.status_code == 201
    assert isinstance(r.json()["id"], int)
    assert r.json()["name"] == "embedding-index"


def test_invalid_job_rejected():
    r = client.post("/jobs", json={})
    assert r.status_code == 422


def test_missing_job_returns_404():
    r = client.get("/jobs/999999999")
    assert r.status_code == 404


def test_job_list():
    r = client.get("/jobs")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_delete_missing_job():
    r = client.delete("/jobs/999999999")
    assert r.status_code == 404
