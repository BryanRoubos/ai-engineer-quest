# Debugging practice — do not skip

Use the runnable [AI Job API project](projects/job-api/README.md). For each exercise, capture **symptom → diagnostic command → cause → fix → successful rerun** in `docs/debugging.md`.

## Case 1: Server does not start

**Reproduce:** In the job-api folder, intentionally run `python -m uvicorn missing_module:app`.

**Observe:** A module import error.

**Diagnose:** Check `pwd` (or `Get-Location` in PowerShell), directory contents and `python -c "import app.main"`.

**Fix:** Use `python -m uvicorn app.main:app --reload`.

**Evidence:** Screenshot of failing command and successful `/health` response.

## Case 2: Invalid user input

**Reproduce:** POST an empty prompt to `/jobs`.

**Observe:** HTTP 422; check validation details.

**Diagnose:** Inspect `JobCreate` and `/docs`; confirm `min_length=1`.

**Fix:** Send a nonempty prompt. Do **not** disable validation to make the error disappear.

**Evidence:** One failing request, one successful request and explanation of why different status codes are correct.

## Case 3: Lost jobs after restart

**Reproduce:** Create a job, restart uvicorn and request that job ID.

**Observe:** HTTP 404 because the dictionary is recreated.

**Diagnose:** Locate `jobs = {}` in `app/main.py`.

**Fix task:** Replace in-memory data with database persistence. Explain transaction safety and migration requirements.

**Evidence:** An integration test demonstrating persistence after restart; this case is **not solved in the starter project**.

## Case 4: Docker cannot access a server

**Reproduce:** Attempt to connect while the container is stopped or when port 8000 is occupied.

**Diagnose:** `docker ps`, `docker logs <container_id>`, and `docker port <container_id>`. Windows: `Get-NetTCPConnection -LocalPort 8000`.

**Fix:** Start the container, correct port publishing, and verify the API listens on `0.0.0.0` inside the container.

**Evidence:** Show the before/after result and explain host vs container ports.

## Reflection questions

For each case: What actually failed? What output proved it? Which other hypotheses did you eliminate? How can monitoring catch the issue earlier?
