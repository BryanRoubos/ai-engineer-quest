"""Working, persistent FastAPI starter. Local bearer token is for learning only."""
import logging
import os
from hmac import compare_digest
from fastapi import Depends, FastAPI, Header, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Job

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s %(message)s")
logger = logging.getLogger("job-api")
app = FastAPI(title="AI Job API", version="1.0")

class JobCreate(BaseModel):
    prompt: str = Field(min_length=1, max_length=1000)

class JobOut(BaseModel):
    id: int
    prompt: str
    status: str
    model_config = {"from_attributes": True}

def get_db():
    with SessionLocal() as session:
        yield session

def require_token(authorization: str | None = Header(default=None)):
    expected = os.getenv("DEV_API_TOKEN", "dev-only-token")
    if not authorization or not authorization.startswith("Bearer ") or not compare_digest(authorization[7:], expected):
        raise HTTPException(status_code=401, detail="Valid bearer token required")

@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0"}

@app.post("/jobs", response_model=JobOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_token)])
def create_job(payload: JobCreate, db: Session = Depends(get_db)):
    job = Job(prompt=payload.prompt, status="queued")
    db.add(job)
    db.commit()
    db.refresh(job)
    logger.info("created job id=%s", job.id)
    return job

@app.get("/jobs", response_model=list[JobOut], dependencies=[Depends(require_token)])
def list_jobs(db: Session = Depends(get_db)):
    return db.scalars(select(Job).order_by(Job.id)).all()

@app.get("/jobs/{job_id}", response_model=JobOut, dependencies=[Depends(require_token)])
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_token)])
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    logger.info("deleted job id=%s", job_id)
