# Level 01 — Software Engineering Foundations: your runnable application

This is **one real project shared across all five lessons**. You build a persistent, authenticated Python job API, test it, run migrations, and deploy it in Docker. It queues job records; it does **not** run AI models yet.

## Before starting on Windows

Install **Git**, **Python 3.11 or 3.12**, **VS Code**, and **Docker Desktop** (Docker is used in lessons 3 and 5).

Open PowerShell in the repository root. You can clone the project with:

```powershell
git clone https://github.com/BryanRoubos/ai-engineer-quest.git
cd ai-engineer-quest/projects/job-api
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

The migration creates a local SQLite database (`jobs.db`). Keep this PowerShell window open. In **a second PowerShell window** open the same `projects/job-api` directory for the next commands.

## Lesson 1: Python and FastAPI

```powershell
Invoke-RestMethod http://127.0.0.1:8000/health
```

Expected: `status : ok` and `version : 1.0`. Study the `app/main.py` route decorator and return dictionary. Stop Uvicorn and reproduce a failed connection; restart it.

## Lesson 2: HTTP, validation and simple authentication

The learning token is **dev-only-token**. It is not a real production authentication system. Every jobs endpoint requires this header:

```powershell
$headers = @{ Authorization = "Bearer dev-only-token" }
$job = Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs -Method Post -Headers $headers -ContentType "application/json" -Body '{"prompt":"hello"}'
$job
Invoke-RestMethod -Uri "http://127.0.0.1:8000/jobs/$($job.id)" -Headers $headers
Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs -Headers $headers
```

Create should return ID, prompt `hello`, and status `queued`. Check failures:

```powershell
# Without bearer header: HTTP 401
Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs
# With token but invalid prompt: HTTP 422
Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs -Method Post -Headers $headers -ContentType "application/json" -Body '{"prompt":""}'
# Missing resource: HTTP 404
Invoke-RestMethod -Uri http://127.0.0.1:8000/jobs/999999 -Headers $headers
```

PowerShell usually displays a terminating error for 401/422/404. Those failures are **expected exercises**, not a broken application. The API routes are also documented at http://127.0.0.1:8000/docs.

## Lesson 3: PostgreSQL, migrations and persistence

Start Docker Desktop, and stop Uvicorn with Ctrl+C before switching database URLs. In PowerShell:

```powershell
docker compose up -d db
docker compose ps
$env:DATABASE_URL = "postgresql+psycopg://quest:local-dev-only@127.0.0.1:5433/quest"
.\.venv\Scripts\python.exe -m alembic upgrade head
docker compose exec -T db psql -U quest -d quest -c "\d jobs"
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Create a job as in lesson 2, stop and restart Uvicorn, then query it again: **the job remains in PostgreSQL**. Stop Uvicorn when done. `migrations/versions/0001_create_jobs.py` provides the actual schema migration. To switch back to local SQLite, close/reopen PowerShell or run `Remove-Item Env:DATABASE_URL`.

**Important:** `docker compose down` stops the database but preserves its named volume. `docker compose down -v` deliberately **deletes** the database volume and all lab data.

## Lesson 4: automated tests, Git and CI

Tests use their own temporary SQLite database, regardless of whether PostgreSQL is running:

```powershell
.\.venv\Scripts\python.exe -m pytest -v
git status --short
git diff --check
```

Open `tests/test_api.py`. Temporarily change an assertion expecting `422` to `200`, rerun pytest (it should fail), restore it, and rerun (green). Never commit a broken test. GitHub Actions runs the same tests and a Docker build in `.github/workflows/job-api.yml`.

## Lesson 5: Docker, Linux concepts, ports and logs

Stop any running Uvicorn instance before using port 8000.

```powershell
docker build -t ai-job-api:local .
docker run --rm --name quest-api -p 127.0.0.1:8000:8000 ai-job-api:local
```

From another PowerShell window:

```powershell
docker ps
docker logs quest-api
Invoke-RestMethod http://127.0.0.1:8000/health
```

The container uses its own SQLite database and runs Alembic on startup. Its filesystem is **ephemeral** unless you attach a volume. To keep its data across restarts, run with `-v quest_api_data:/data` (Docker named volume). See `Dockerfile` and explain port mapping, container network binding, and process logging.

## Level 01 completion checklist

- Explain the Python `def`, request model, API decorator, authentication dependency, and status codes.
- Demonstrate 201, 401, 404 and 422 responses.
- Migrate and persist at least one PostgreSQL job across API restarts.
- Show passing tests, one intentional failure and the corrected rerun.
- Build a Docker image, get a healthy response, and diagnose a stopped container.

Save **real commands, real output and what you learned**. Completing the website checkbox is self-reported, not automatic grading.

## Scope and security

This is a **learning project**, not production software. The shared development token is for localhost only; it has no users, JWTs or role-based authorization. There is no job worker or model inference yet. Do not expose it publicly with the default token. Dependencies are version-ranged rather than locked.

Site: https://bryanroubos.github.io/ai-engineer-quest/
