# Junior AI Engineer interview practice

Use this **after** implementing and testing the corresponding project. Answer out loud, then demonstrate the relevant file or command. The goal is understanding, not memorized answers.

## Python and backend

1. Why does a Pydantic model reject an empty prompt? Demonstrate the exact 422 response.
2. Why does creating a resource return HTTP 201? What should GET missing ID return?
3. What's the difference between unit tests and integration tests? Which does the job API currently have?
4. Explain why an in-memory dictionary is unsafe for multi-replica deployments. Show where it is created.
5. What could go wrong if two requests update shared state concurrently? How would a database transaction help?

## AI and ML

6. Distinguish training, validation and inference. Give one concrete failure caused by data leakage.
7. Explain tokens, context windows, embeddings and retrieval with an example from a document assistant.
8. How would you compare two LLM serving options for a real workload? Name the metrics and a fair test.
9. How do you detect hallucinated citations in a RAG application?
10. When does a smaller or quantized model make more sense?

## Infrastructure and operations

11. Walk from source code to Docker image to Kubernetes pod and Service.
12. A pod stays Pending. Which three diagnostic commands do you run, and what are you looking for?
13. Why are liveness and readiness probes different?
14. The AI model endpoint times out. Demonstrate a safe response and explain retry limits.
15. What metrics would you show to prove your serving platform is healthy?

## System design

16. Design a document-based assistant for 100 simultaneous users. Sketch gateway, API, retrieval, model, persistence and observability.
17. Where are authentication and tenant authorization enforced?
18. Estimate request cost and capacity; list your assumptions and unknowns.
19. Explain one ADR where you selected an alternative and rejected two others.
20. What fails when your only GPU node disappears? What graceful degradation is possible?

## Portfolio mock interview

Prepare a **5-minute walkthrough** of two projects. For each: explain the problem, scope, code you wrote, one bug you diagnosed, one architectural trade-off and one limitation. Don't claim work you cannot demonstrate.

## Self-check rubric

Score each response 0–2:
- **0:** Can't explain or demonstrate.
- **1:** Can explain with hints but cannot connect to project evidence.
- **2:** Can explain, demonstrate in code or commands, and discuss failure/trade-offs.

Treat a score as practice feedback, not a certification or prediction of an interview result.
