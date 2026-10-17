const fs=require('fs'),vm=require('vm');
const index=fs.readFileSync('index.html','utf8');
for (const file of ['app.js','bootcamp.js','playground.js','workspace.js','career.js']) {
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
for(const f of ['app.js','bootcamp.js','playground.js','workspace.js','career.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
vm.runInContext('go(1)',context);
let html=e['#content'].innerHTML;
for(const marker of ['focus-sidebar','data-workspace-tab','YOUR MISSION','FINISH LINE'])if(!html.includes(marker))throw Error('Level 1 missing '+marker);
vm.runInContext('go(8)',context);
html=e['#content'].innerHTML;
if(!html.includes('data-workspace-tab'))throw Error('Level 8 lesson workspace missing');
const js=fs.readFileSync('playground.js','utf8');
const exercises=JSON.parse(js.match(/^const CODING_EXERCISES=(\[.*?\]);\n/s)[1]);
if(exercises.length!==40)throw Error('Expected 40 coding challenges');
for(const x of exercises)if(!x.id||!x.starter||!x.tests)throw Error('Incomplete exercise '+x.id);
vm.runInContext("navigate('career')",context);if(!e['#content'].innerHTML.includes('Junior MLOps'))throw Error('Career page missing');
console.log('PASS: scripts valid, 8-level navigation renders, 40 challenges available, Pages assets linked.');
