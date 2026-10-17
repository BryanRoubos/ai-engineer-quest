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

## Known limitations and your next tasks

The app uses in-memory state; **data disappears after restart**, IDs are not durable, and it has **no authentication or model invocation**. Do not deploy it publicly as a production service.

Your next tasks:
1. Introduce PostgreSQL and Alembic migrations; test persistence after restart.
2. Add bearer authentication and authorization checks; test 401/403.
3. Add asynchronous worker and model backend; handle timeouts and retries.
4. Add structured logs, Prometheus metrics and deployment manifests.
5. Document a deliberate failure and repair in your portfolio.

See [debugging cases](../../DEBUGGING_LABS.md) and [interview practice](../../INTERVIEW_PRACTICE.md).
