const fs=require('fs'),vm=require('vm');
const files=['app.js','bootcamp.js','workspace.js','career.js','guided-builds.js','level1-course.js','practical.js'];
const index=fs.readFileSync('index.html','utf8');
for(const file of files){new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});if(!index.includes(file))throw Error('Missing script: '+file)}
if(index.includes('src="./playground.js'))throw Error('Old live runner still linked');
const elements={'#content':{innerHTML:''},'#xp':{textContent:''},'#rank':{textContent:''},'#toast':{innerHTML:''}};
const ctx={document:{querySelector:x=>elements[x]||null,querySelectorAll:()=>[],addEventListener:()=>{}},localStorage:{getItem:()=>null,setItem:()=>{}},window:{scrollTo:()=>{}},console};
vm.createContext(ctx);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
for(let n=1;n<=8;n++){vm.runInContext('go('+n+');workspaceTab="code";render()',ctx);const html=elements['#content'].innerHTML;for(const str of ['HANDS-ON WALKTHROUGH','chapter-rail','Next step','What this code does'])if(!html.includes(str))throw Error('Level '+n+' missing '+str)}
vm.runInContext('go(1);workspaceTab="lesson";render()',ctx);if(!elements['#content'].innerHTML.includes('WHAT YOU WILL BUILD'))throw Error('Walkthrough missing');vm.runInContext('workspaceTab="check";render()',ctx);if(!elements['#content'].innerHTML.includes('Finished means all of these are true'))throw Error('Missing concrete verification');if(elements['#content'].innerHTML.includes('Quick knowledge check'))throw Error('Old generic quiz still visible');
vm.runInContext('navigate("career")',ctx);if(!elements['#content'].innerHTML.includes('Junior MLOps'))throw Error('Career page missing');
const guides=JSON.parse(fs.readFileSync('guided-builds.js','utf8').match(/^const GUIDED_BUILDS=(\[.*?\]);\n/s)[1]);if(guides.length!==40||guides.some(g=>g.chapters.length!==6))throw Error('Expected 40 six-step walkthroughs');
vm.runInContext('go(1);workspaceTab="check";render()',ctx);if(!elements['#content'].innerHTML.includes('Run the complete Job API project'))throw Error('Reproducible project missing from Level 1');
vm.runInContext('go(8);render()',ctx);if(!elements['#content'].innerHTML.includes('junior interview preparation'))throw Error('Interview pack missing from Level 8');
for(let i=0;i<5;i++){
 vm.runInContext('go(1);window.getActiveLab=()=>'+i+';workspaceTab="code";render()',ctx);
 const rendered=elements['#content'].innerHTML;
 if(!rendered.includes('HANDS-ON WALKTHROUGH')||!rendered.includes('PowerShell'))throw Error('Missing usable Level 01 guide '+i);
}
if(!fs.existsSync('projects/job-api/compose.yaml')||!fs.existsSync('projects/job-api/database/schema.sql'))throw Error('Missing PostgreSQL lab files');
console.log('PASS: Level 01 course and lab infrastructure.');
console.log('PASS: all 8 levels, 40 guide records, manual evidence, career page, no live runner.');
