"""Architect Quest — Level 1 starter application."""
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Architect Quest API", version="0.1.0")


class HealthResponse(BaseModel):
    status: str
    version: str


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", version="0.1.0")


# TODO lab 1-1:
# Define JobCreate/JobResponse Pydantic models.
# Add POST /jobs, GET /jobs, GET /jobs/{id}, DELETE /jobs/{id}.
# Return 201 on create, 404 for missing id, and 422 for invalid input.
# TODO lab 1-2: replace temporary state with a PostgreSQL repository.
# TODO lab 1-4: add authorization without hardcoding secrets.
