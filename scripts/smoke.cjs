const fs=require('fs'),vm=require('vm');
const index=fs.readFileSync('index.html','utf8');
for (const file of ['app.js','bootcamp.js','playground.js']) {
  new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
  if(!index.includes(file)) throw Error('Missing script '+file);
}
const e={'#content':{innerHTML:''},'#xp':{textContent:''},'#rank':{textContent:''},'#toast':{innerHTML:''}};
const listeners={};
const context={
  document:{querySelector:x=>e[x]||null,querySelectorAll:()=>[],addEventListener:(event,fn)=>{(listeners[event]??=[]).push(fn)}},
  localStorage:{getItem:()=>null,setItem:()=>{}},
  window:{scrollTo:()=>{}},
  console
};
vm.createContext(context);
for(const f of ['app.js','bootcamp.js','playground.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
vm.runInContext('go(1)',context);
let html=e['#content'].innerHTML;
for(const marker of ['Step 1','Run + Grade Tests','Check repository structure','Resources for this specific lab'])if(!html.includes(marker))throw Error('Level 1 missing '+marker);
vm.runInContext('go(8)',context);
html=e['#content'].innerHTML;
if(!html.includes('Run + Grade Tests'))throw Error('Level 8 playground missing');
const js=fs.readFileSync('playground.js','utf8');
const exercises=JSON.parse(js.match(/^const CODING_EXERCISES=(\[.*?\]);\n/s)[1]);
if(exercises.length!==40)throw Error('Expected 40 coding challenges');
for(const x of exercises)if(!x.id||!x.starter||!x.tests)throw Error('Incomplete exercise '+x.id);
console.log('PASS: scripts valid, 8-level navigation renders, 40 challenges available, Pages assets linked.');
