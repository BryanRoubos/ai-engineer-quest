"""Reproducible junior backend project: a small AI job queue API."""
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="AI Job API", version="1.0")
jobs: dict[int, dict] = {}
next_id = 1

class JobCreate(BaseModel):
    prompt: str = Field(min_length=1, max_length=1000)

@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0"}

@app.post("/jobs", status_code=status.HTTP_201_CREATED)
def create_job(payload: JobCreate):
    global next_id
    job = {"id": next_id, "prompt": payload.prompt, "status": "queued"}
    jobs[next_id] = job
    next_id += 1
    return job

@app.get("/jobs")
def list_jobs():
    return list(jobs.values())

@app.get("/jobs/{job_id}")
def get_job(job_id: int):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return jobs[job_id]

@app.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: int):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    del jobs[job_id]
