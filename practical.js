/* Practical materials live inside each relevant level, not in a disconnected checklist. */
const PRACTICAL_MATERIALS={
1:[["Run the complete Job API project","projects/job-api/README.md","Follow the exact installation, launch and test commands on a working API."],["See real Python source code","projects/job-api/app/main.py","Understand data validation, endpoints and correct HTTP responses."],["Study the repository tests","projects/job-api/tests/test_api.py","Learn how each passing and failing case is checked."]],
2:[["Practice Python and ML interview questions","INTERVIEW_PRACTICE.md","Explain training, inference, evaluation and data leakage with examples."]],
3:[["Practise AI-system interview questions","INTERVIEW_PRACTICE.md","Discuss LLM evaluation, retrieval and model serving."]],
4:[["Debug container and service failures","DEBUGGING_LABS.md","Reproduce deployment problems and capture the diagnostic evidence."]],
6:[["Complete the debugging scenarios","DEBUGGING_LABS.md","Investigate four specific faults and document root cause and recovery."]],
7:[["Practise architecture explanations","INTERVIEW_PRACTICE.md","Design a multi-user AI service and defend trade-offs."]],
8:[["Run the junior interview preparation","INTERVIEW_PRACTICE.md","Complete the mock interview and self-review rubric."],["Show reproducible portfolio evidence","projects/job-api/README.md","Use the backend project as the first portfolio baseline."]]
};
function practicalResources(level){
const list=PRACTICAL_MATERIALS[level]||[];
if(!list.length)return '';
return '<section class="focus-target"><div class="eyebrow">PRACTICAL BOOTCAMP PACKAGE</div><h3>Open a worked project or exercise</h3><div class="focus-resources">'+list.map(row=>'<a target="_blank" rel="noopener noreferrer" href="https://github.com/BryanRoubos/ai-engineer-quest/blob/main/'+row[1]+'"><span><b>'+row[0]+'</b><small>'+row[2]+'</small></span><span aria-hidden="true">↗</span></a>').join('')+'</div></section>';
}
const previousDetailWithCareer=detail;
detail=function(){return previousDetailWithCareer()+practicalResources(current)};
