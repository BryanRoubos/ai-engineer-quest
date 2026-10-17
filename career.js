/* Job-market grounded competency checklist — independent from lesson XP. */
const ROLE_REQUIREMENTS=[
{label:"Junior AI Engineer",focus:"Python, REST APIs, SQL, Docker, tests, LLM integration",must:[0,1,2,3,4,9,10,12],url:"https://www.unboundai.nl/careers/junior-ai-engineer"},
{label:"Junior MLOps / Platform Engineer",focus:"Python, Linux, CI/CD, containers, Kubernetes, ML lifecycle",must:[0,3,4,5,6,8,15,16,18,19],url:"https://werkenbij.enexis.nl/vacatures/mlops-engineer-16389"},
{label:"AI Infrastructure Engineer",focus:"GPU operations, K8s, distributed systems, reliability, cloud",must:[3,4,15,16,17,18,19,20,22,24,25,27,29],url:"https://jobs.ashbyhq.com/meshy/de871fcf-d042-4b07-ad8e-0059d71e0933"},
{label:"AI Systems Architect",focus:"Experience operating platforms plus system design and technical leadership",must:[20,24,25,27,28,29,30,31,32,33,34,35,36,39],url:"https://job-boards.greenhouse.io/openteams/jobs/4735509005"}
];
const CORE_COMPETENCIES=[
"Build and test an API","Secure role-based access","Operate a database","Run CI on every change","Debug Linux/network failures",
"Train a reproducible ML baseline","Validate data and avoid leakage","Debug a neural-network experiment","Track and version models","Serve a packaged model",
"Call LLMs with retry limits","Build document ingestion/search","Measure grounded RAG quality","Prevent unsafe tool execution","Benchmark model inference",
"Build secure containers","Operate local Kubernetes","Configure quotas and RBAC","Use GitOps/Helm deployment","Operate metrics and alerts",
"Design cloud network","Use IAM and secrets safely","Provision infrastructure as code","Automate releases and rollback","Calculate capacity and cost",
"Estimate concurrent demand","Build reliable asynchronous jobs","Recover from outages","Isolate multiple tenants","Load test and report SLOs",
"Translate stakeholder requirements","Draw clear C4 views","Defend ADR choices","Compare hosting cost and risk","Lead a security design review",
"Scope portfolio project","Document system architecture","Integrate secure AI platform","Prove operational readiness","Present and defend project"
];
function careerPage(){
let completed=CORE_COMPETENCIES.map((_,i)=>!!s.done[(Math.floor(i/5)+1)+'-'+(i%5)]);
return '<div class="eyebrow">RESEARCHED CAREER PATH · OCTOBER 2026</div><h1 style="font-size:clamp(30px,4vw,48px)">Build proof. Then apply.</h1><p class="muted">This is not a job guarantee or a certification. Companies hire for engineering experience, code quality, deployment skills, communication, and convincing project evidence. Passing a browser coding drill is not equivalent to production experience.</p><div class="section-title"><h2>Explore career targets</h2></div><div class="grid">'+ROLE_REQUIREMENTS.map(r=>{let n=r.must.filter(i=>completed[i]).length;return '<article class="panel"><div class="eyebrow">TARGET ROLE</div><h3 style="margin-top:10px">'+r.label+'</h3><p class="muted small">'+r.focus+'</p><div class="flex small"><span>'+n+' / '+r.must.length+' skill labs marked complete</span><span>'+Math.round(n/r.must.length*100)+'%</span></div><div class="bar" style="margin:10px 0 13px"><span style="width:'+n/r.must.length*100+'%"></span></div><p class="small muted">Use this to identify learning gaps. Completion is self-reported and not externally verified.</p><a href="'+r.url+'" target="_blank" rel="noopener noreferrer">Read example job requirements ↗</a></article>'}).join('')+'</div><div class="section-title"><h2>Evidence checklist</h2></div><div class="panel"><p class="muted">For junior job applications, focus on one strong backend project and one deployed AI/ML platform project rather than 40 unrelated microprojects.</p><div class="stack">'+[['01','Backend proof','Python or Go, SQL, tests, CI, authentication and API documentation.'],['02','Deployed AI proof','Model serving, Docker, Kubernetes manifests, metrics and benchmark report.'],['03','Operations proof','Incident or failure test, monitoring dashboard, rollback plan, security checks.'],['04','Architecture proof','C4 diagrams, ADRs, cost/tradeoff memo, runbook and clear README.'],['05','Experience proof','Internship/team contribution, PR reviews, user feedback, and honest scope of ownership.']].map(x=>'<div class="quest"><span class="focus-index">'+x[0]+'</span><div><b>'+x[1]+'</b><p class="small muted" style="margin:4px 0">'+x[2]+'</p></div></div>').join('')+'</div></div>'+readinessSection()+'<div class="panel" style="margin-top:15px"><h3>How to decide whether to apply</h3><p class="muted">Read a specific vacancy. If you can explain and demonstrate most essential requirements, apply even if you lack some preferred tools. For senior positions asking 3–7 years in production, coursework alone does not replace that experience.</p><a href="https://github.com/BryanRoubos/ai-architect-quest/blob/main/JOB_MARKET.md" target="_blank" rel="noopener noreferrer">Read research and source postings ↗</a></div>'
}

const READINESS_CHECKS=[
{title:"Backend independence",description:"Build an API with authentication, database migrations, automated tests and CI. Demonstrate a clean setup.",level:1},
{title:"AI integration",description:"Implement model serving or RAG, evaluate results and handle failed model requests.",level:3},
{title:"Deployment",description:"Containerize and deploy your service with health checks and repeatable configuration.",level:4},
{title:"Troubleshooting",description:"Reproduce and resolve three realistic faults using logs, metrics and diagnostic commands.",level:6},
{title:"Portfolio",description:"Publish two reproducible projects with READMEs, test evidence and architecture decisions.",level:8},
{title:"Team experience",description:"Show real pull requests, code reviews, collaboration and clearly stated personal contributions.",level:8}
];
function readinessSection(){
const flags=s.readiness||{};
const n=READINESS_CHECKS.filter(x=>flags[x.title]).length;
return '<section class="panel" style="margin-top:20px"><div class="eyebrow">JUNIOR ENGINEER GRADUATION CRITERIA</div><h2 style="margin:9px 0">What you must be able to demonstrate</h2><p class="muted">These are self-assessed outcomes, separate from XP. Complete them only when you have evidence from working projects.</p><div class="flex"><b>'+n+' of '+READINESS_CHECKS.length+' demonstrated</b></div><div class="bar" style="margin:12px 0 18px"><span style="width:'+(n/READINESS_CHECKS.length*100)+'%"></span></div><div class="stack">'+READINESS_CHECKS.map((x,i)=>'<div class="quest"><input type="checkbox" data-readiness="'+i+'" '+(flags[x.title]?'checked':'')+' aria-label="Demonstrated '+x.title+'"><div style="flex:1"><b>'+x.title+'</b><p class="small muted" style="margin:5px 0">'+x.description+'</p>'+readinessAdvice(i)+'<button class="btn alt" data-level="'+x.level+'">Go to Level '+x.level+' →</button></div></div>').join('')+'</div><p class="small muted">Not a certification or hiring guarantee. Keep evidence in your project repositories.</p></section>';
}
document.addEventListener('change',event=>{const x=event.target.closest('[data-readiness]');if(!x)return;const i=Number(x.dataset.readiness);if(!READINESS_CHECKS[i])return;s.readiness||={};s.readiness[READINESS_CHECKS[i].title]=x.checked;save();render()});


const READINESS_GUIDES=[
{build:"From a clean checkout, launch a FastAPI or Go API with at least two useful endpoints, input validation, role checks, PostgreSQL migrations, and a passing CI pipeline.",prove:"Include a README quickstart, API example requests/responses, tests for success/invalid input/forbidden access, and a successful CI run.",where:"Level 1, labs 1–5"},
{build:"Connect a real inference endpoint; build retrieval over your own documents; return cited results and a clear fallback when the model or retrieval fails.",prove:"Commit an evaluation dataset, measured pass/fail examples, citation samples, and an error-handling demonstration.",where:"Level 3, labs 1–5"},
{build:"Build an image, deploy the API in a local kind cluster, configure a Service, readiness/liveness probes, resource requests, namespace permissions and versioned manifests.",prove:"Provide Dockerfile, Kubernetes YAML, health-check output, kubectl get/describe output and recovery after deleting one pod.",where:"Level 4, labs 1–5"},
{build:"Intentionally stop the model backend, deny a permission, and trigger an overloaded or unhealthy service. Diagnose each with commands, logs and metrics, then recover.",prove:"Write three short incident notes: symptoms, exact diagnostics, root cause, correction, and before/after evidence.",where:"Level 6, labs 3–5"},
{build:"Publish two focused projects: one production-style backend and one AI platform or integrated serving system. Make both independently reproducible.",prove:"Link repository commits, setup instructions, test logs, architecture diagram, benchmark results, screenshots/demo and known limitations.",where:"Level 8, labs 1–5"},
{build:"Work on a team-owned feature or contribute reviewed PRs. Ask collaborators for review and document your own changes and their impact.",prove:"Include links to your PRs, review comments, issues, decision notes and a short honest statement of your contribution.",where:"Level 8 and your team project"}
];
function readinessAdvice(i){
const x=READINESS_GUIDES[i];
return '<div class="small" style="margin:9px 0"><b>Build:</b> '+x.build+'</div><div class="small" style="margin:8px 0"><b>Evidence:</b> '+x.prove+'</div><div class="small muted">'+x.where+'</div>';
}
const baseCourseDetail=detail;
detail=function(){
 let html=baseCourseDetail();
 if(workspaceTab!=='check')return html;
 const related=READINESS_CHECKS.map((x,i)=>({x,i})).filter(y=>y.x.level===current);
 if(!related.length)return html;
 return html+'<section class="panel" style="margin-top:16px"><div class="eyebrow">JOB-READINESS MILESTONES</div><h3>Turn this level into hiring evidence</h3><p class="small muted">The lesson checkbox tracks study progress. These additional outcomes require working evidence.</p>'+related.map(({x,i})=>'<div class="focus-target"><label class="quest"><input type="checkbox" data-readiness="'+i+'" '+((s.readiness||{})[x.title]?'checked':'')+'><span><b>'+x.title+'</b><small>'+x.description+'</small></span></label>'+readinessAdvice(i)+'</div>').join('')+'<button class="btn alt" data-nav="career">View all career outcomes →</button></section>';
};

const baseRender=render;
render=function(){if(page==='career'){document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav==='career'));document.querySelector('#content').innerHTML=careerPage();updateStatusBar()}else{baseRender()}};
