const fs=require('fs'),vm=require('vm');
const files=['app.js','bootcamp.js','workspace.js','career.js','guided-builds.js'];
const index=fs.readFileSync('index.html','utf8');
for(const file of files){new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});if(!index.includes(file))throw Error('Missing script: '+file)}
if(index.includes('src="./playground.js'))throw Error('Old live runner still linked');
const elements={'#content':{innerHTML:''},'#xp':{textContent:''},'#rank':{textContent:''},'#toast':{innerHTML:''}};
const ctx={document:{querySelector:x=>elements[x]||null,querySelectorAll:()=>[],addEventListener:()=>{}},localStorage:{getItem:()=>null,setItem:()=>{}},window:{scrollTo:()=>{}},console};
vm.createContext(ctx);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
for(let n=1;n<=8;n++){vm.runInContext('go('+n+');workspaceTab="code";render()',ctx);const html=elements['#content'].innerHTML;for(const str of ['Create this file','Paste and understand this example code','Verify from the terminal','Expected result'])if(!html.includes(str))throw Error('Level '+n+' missing '+str)}
vm.runInContext('go(1);workspaceTab="lesson";render()',ctx);if(!elements['#content'].innerHTML.includes('WHAT YOU WILL BUILD'))throw Error('Walkthrough missing');vm.runInContext('workspaceTab="check";render()',ctx);if(!elements['#content'].innerHTML.includes('Finished means all of these are true'))throw Error('Missing concrete verification');if(elements['#content'].innerHTML.includes('Quick knowledge check'))throw Error('Old generic quiz still visible');
vm.runInContext('navigate("career")',ctx);if(!elements['#content'].innerHTML.includes('Junior MLOps'))throw Error('Career page missing');
const guides=JSON.parse(fs.readFileSync('guided-builds.js','utf8').match(/^const GUIDED_BUILDS=(\[.*?\]);\n/s)[1]);if(guides.length!==40)throw Error('Expected 40 guided build records');
console.log('PASS: all 8 levels, 40 guide records, manual evidence, career page, no live runner.');
