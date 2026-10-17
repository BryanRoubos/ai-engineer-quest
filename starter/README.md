# Architect Quest — runnable coding labs

This folder contains a working **Python/FastAPI assessment harness** for Level 1. You can run it locally or let GitHub Actions test it.

## Setup (Python 3.11+)

```bash
cd starter
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m pytest -q
uvicorn app.main:app --reload
```

Open http://127.0.0.1:8000/docs and http://127.0.0.1:8000/health.

## Your assignment

1. Start with the passing smoke test, then change `/health` to return version `1.0.0`.
2. Add endpoints `POST /jobs`, `GET /jobs`, `GET /jobs/{id}`, `DELETE /jobs/{id}` using Pydantic models.
3. Run `python -m pytest -q`. The additional assignment tests start as expected failures until you implement the endpoints.
4. Add PostgreSQL persistence, authentication and CI as you progress through Level 1.

Passing initial tests **does not imply you've completed the full bootcamp**. Save evidence and verify project-specific criteria. Never put production credentials into Git.
