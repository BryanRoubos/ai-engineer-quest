# AI Platform & Systems Engineering — job-market research (October 2026)

## Important career distinction

This roadmap aims first at **junior AI Engineer**, **junior MLOps**, **junior platform/backend engineer** roles. After professional experience, **AI Platform / AI Infrastructure Engineer** is a realistic specialization. **AI Systems Architect** is typically a later responsibility, not an entry-level certificate.

## Skills recurring in actual vacancies

| Competency | Evidence worth producing |
|---|---|
| Python/Go, APIs, databases | Tested and documented multi-endpoint service with authentication and migrations |
| Linux and networking | Troubleshooting case study of a real deployment fault |
| CI/CD, Docker, IaC | Reproducible build, policy checks, versioned rollout/rollback |
| Kubernetes and GitOps | Resource-limited deployment with isolation, health checks and rollback |
| Inference and GPUs | Throughput/latency/memory benchmarking and serving trade-offs |
| MLOps | Tracked model experiments, validated data and reproducible model serving |
| Observability | Metrics dashboard, SLO, error budget and failure experiment |
| Architecture | Requirements, C4, ADRs, cost/risk decision memo |
| Collaboration | Peer review, team delivery, user support, clearly stated ownership |

## Sources — specific job postings

- [Enexis — Junior/medior MLOps Engineer](https://werkenbij.enexis.nl/vacatures/mlops-engineer-16389): Python, Linux, Git, Docker, CI/CD, Kubernetes fundamentals, platform teamwork.
- [Unbound AI — Junior AI Engineer](https://www.unboundai.nl/careers/junior-ai-engineer): Python backend, APIs, Docker, cloud, LLMs and testing.
- [Mollie — ML Platform Engineer I](https://magnet.me/nl-NL/vacature/1072287/machine-learning-platform-engineer-i): Python, Terraform and production ML platform work.
- [OpenTeams — Platform Engineer, AI/ML Infrastructure](https://job-boards.greenhouse.io/openteams/jobs/4735509005): K8s/GPU isolation, IaC, GitOps, CI/CD, reliability, documentation.
- [Meshy — AI Infrastructure Engineer](https://jobs.ashbyhq.com/meshy/de871fcf-d042-4b07-ad8e-0059d71e0933): backend/Linux/networking/Kubernetes and inference or scheduling experience.
- [Perplexity — AI Infrastructure Engineer](https://jobs.ashbyhq.com/perplexity/60deb376-51b5-46c6-9e17-55377a5ef34e/): advanced cluster administration, Slurm, GPU workloads, observability; typically experienced.
- [Alliander — AI Platform Engineer](https://werkenbij.alliander.com/vacature/ai-platform-engineer/JR18614): operating on-prem AI platform; asks 5–7 years experience.

**Caveats:** Job advertisements change and may be closed; this is a snapshot, not a promise of vacancy availability. Years of experience are meaningful constraints for senior roles. Completing this training does not itself establish professional production experience.

## Capstone hiring rubric

A project should be presented as portfolio-ready only after:
1. A reproducible README takes a reviewer from clone to running system.
2. The implementation passes unit, integration and at least one deliberate failure-case test.
3. Authentication/authorization and secrets are handled safely.
4. Deployment is automated; rollback and recovery are documented.
5. Operational evidence includes metrics, logs, latency and resource measurements.
6. Decisions include alternatives, trade-offs and costs.
7. Your individual contributions and limitations are accurately stated.
