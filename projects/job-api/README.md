# Project 1 — AI Job API (complete runnable example)

A beginner-friendly backend service. It **does not call an AI model yet**. This deliberate first stage teaches the HTTP contract, validation, testing, containers and debugging that later AI systems depend on.

## Windows PowerShell

```powershell
cd projects/job-api
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

macOS/Linux: create/activate a Python 3.11+ virtual environment, then run `python -m pip install -r requirements.txt`, `python -m pytest -q`, `uvicorn app.main:app --reload`.

Visit http://127.0.0.1:8000/docs and http://127.0.0.1:8000/health. The latter should respond:

```json
{"status":"ok","version":"1.0"}
```

In another shell (PowerShell):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs -Method Post -ContentType "application/json" -Body '{"prompt":"hello"}'
```

Expected: a JSON job with a numeric id, the prompt, and `status: queued`.

## Docker

```bash
docker build -t ai-job-api:local .
docker run --rm -p 127.0.0.1:8000:8000 ai-job-api:local
```

## Understand the code

- `JobCreate` validates requests. An empty prompt returns HTTP 422.
- `POST /jobs` creates a new queued job with HTTP 201.
- `GET /jobs/{id}` returns HTTP 404 for missing jobs.
- `DELETE /jobs/{id}` responds HTTP 204 when deletion succeeds.
- Tests demonstrate success and failure behavior using FastAPI's TestClient.

## Follow the five lessons in order

Open [AI Engineer Quest](https://bryanroubos.github.io/ai-engineer-quest/), choose **Level 01: Software Engineer Foundations**, and use the **Understand → Build → Check → Help** tabs for each lesson. The actual application lives in this directory.

| Lesson | You will demonstrate |
| --- | --- |
| 1. Python API | Run the app, inspect health and explain decorators and data models |
| 2. HTTP validation | Create a job, show HTTP 201, provoke 422 and 404 |
| 3. Database fundamentals | Start PostgreSQL using Docker Compose; inspect schema; understand why the API is not persistent yet |
| 4. Automated testing | Run pytest; break an assertion on purpose; restore a green result |
| 5. Containers and networking | Build Docker image; publish port; inspect logs and recover from a stopped service |

**Important:** The Python source excerpts in the website teach specific concepts; they are not replacements for the complete checked-in `app/main.py`. Do not overwrite the file with a shortened excerpt.

For lesson 3, start Docker Desktop, then:

```powershell
cd projects/job-api
docker compose up -d db
docker compose ps
docker compose exec -T db psql -U quest -d quest -c "SELECT id, prompt, status FROM jobs;"
docker compose exec -T db psql -U quest -d quest -c "\d jobs"
```

The PostgreSQL schema is initialized by `database/schema.sql` when the local database volume is created. The API **does not yet read or write PostgreSQL**: that integration is a later coding extension, not a completed result. Keep the database local; its credentials are for learning only.

For lesson 5, stop any running uvicorn process before starting Docker on port 8000. In another terminal run `docker ps`, `docker logs quest-api`, and `Invoke-RestMethod http://127.0.0.1:8000/health`. Press Ctrl+C in the Docker run terminal to stop it.

## Known limitations and your next tasks

The app uses in-memory state; **data disappears after restart**, IDs are not durable, and it has **no authentication or model invocation**. Do not deploy it publicly as a production service.

Your next tasks:
1. Introduce PostgreSQL and Alembic migrations; test persistence after restart.
2. Add bearer authentication and authorization checks; test 401/403.
3. Add asynchronous worker and model backend; handle timeouts and retries.
4. Add structured logs, Prometheus metrics and deployment manifests.
5. Document a deliberate failure and repair in your portfolio.

See [debugging cases](../../DEBUGGING_LABS.md) and [interview practice](../../INTERVIEW_PRACTICE.md).
