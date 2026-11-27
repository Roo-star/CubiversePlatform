const e=`// Original Cubiverse adapter. Source and adaptation audit: references/match3.md.\r
import {MatchAssist,MatchMoveCache} from './match3-assist.js';\r
if(typeof window!=='undefined')import('../match3-v13.css');\r
export const GEM_COLORS=['#ec7755','#deae76','#f4d145','#68be72','#63bde3','#b48bd1'];\r
export const matchIndex=([x,y,z],[w,h])=>x+w*(y+h*z);\r
export const matchCoord=(i,[w,h])=>[i%w,Math.floor(i/w)%h,Math.floor(i/(w*h))];\r
const inBounds=(p,dims)=>p.every((v,i)=>Number.isInteger(v)&&v>=0&&v<dims[i]);\r
const sameCell=(a,b)=>a?.every((v,i)=>v===b?.[i]);\r
export function areAdjacent(a,b){return a.length===3&&b.length===3&&a.reduce((sum,v,i)=>sum+Math.abs(v-b[i]),0)===1;}\r
export function findMatches(board,dims) {\r
  const marked=new Set(),runs=[];\r
  for(let axis=0;axis<3;axis++) {\r
    if(dims[axis]<3) continue;\r
    for(let i=0;i<board.length;i++) {\r
      const start=matchCoord(i,dims);if(start[axis]!==0)continue;\r
      let cells=[],previous=-1;\r
      const flush=()=>{if(cells.length>=3){runs.push([...cells]);for(const cell of cells)marked.add(cell);}};\r
      for(let t=0;t<=dims[axis];t++) {\r
        const p=[...start];p[axis]=t;const index=matchIndex(p,dims),value=t===dims[axis]?-2:board[index];\r
        if(value>=0&&value===previous)cells.push(index);\r
        else{flush();cells=value>=0?[index]:[];previous=value;}\r
      }\r
    }\r
  }\r
  return {cells:[...marked],runs};\r
}\r
function swap(board,i,j){[board[i],board[j]]=[board[j],board[i]];}\r
export function legalMatchMoves(board,dims,limit=Infinity){\r
  const result=[];\r
  const matchedAt=p=>{const value=board[matchIndex(p,dims)];return [0,1,2].some(axis=>{let run=1;for(const dir of [-1,1])for(let step=1;step<dims[axis];step++){const q=[...p];q[axis]+=step*dir;if(!inBounds(q,dims)||board[matchIndex(q,dims)]!==value)break;run++;}return run>=3;});};\r
  for(let i=0;i<board.length;i++) {\r
    const a=matchCoord(i,dims);\r
    for(let axis=0;axis<3;axis++){\r
      const b=[...a];b[axis]++;if(!inBounds(b,dims))continue;\r
      const j=matchIndex(b,dims);if(board[i]===board[j])continue;\r
      swap(board,i,j);const matches=matchedAt(a)||matchedAt(b);swap(board,i,j);\r
      if(matches){result.push([a,b]);if(result.length>=limit)return result;}\r
    }\r
  }\r
  return result;\r
}\r
export function freshMatchBoard(dims,rng=Math.random,colors=6){\r
  if(!Array.isArray(dims)||dims.length!==3||dims.some(n=>!Number.isSafeInteger(n)||n<1))throw new RangeError('XYZ must be positive integers.');\r
  // Forward generation forbids a run on every axis, including the depth axis.\r
  const board=new Int8Array(dims.reduce((a,b)=>a*b,1)).fill(-1);\r
  for(let attempt=0;attempt<64;attempt++){\r
    board.fill(-1);\r
    for(let i=0;i<board.length;i++){\r
      const p=matchCoord(i,dims),start=Math.floor(rng()*colors)%colors;\r
      for(let offset=0;offset<colors;offset++){\r
        const value=(start+offset)%colors;\r
        const forbidden=[0,1,2].some(axis=>{if(p[axis]<2)return false;const q=[...p],r=[...p];q[axis]--;r[axis]-=2;return board[matchIndex(q,dims)]===value&&board[matchIndex(r,dims)]===value;});\r
        if(!forbidden){board[i]=value;break;}\r
      }\r
    }\r
    if(legalMatchMoves(board,dims,1).length||!dims.some(n=>n>=3))return board;\r
  }\r
  // Deterministic valid fall-back: no triples, with a guaranteed A-B-A / C-A-C swap.\r
  for(let i=0;i<board.length;i++){const [x,y,z]=matchCoord(i,dims);board[i]=(x+2*y+3*z)%colors;}\r
  const axis=dims.findIndex(n=>n>=3),cross=dims.findIndex((n,i)=>i!==axis&&n>=2);\r
  const set=(along,across,value)=>{const p=[0,0,0];p[axis]=along;if(cross>=0)p[cross]=across;board[matchIndex(p,dims)]=value;};\r
  if(axis>=0&&cross>=0){set(0,0,0);set(1,0,1);set(2,0,0);set(1,1,0);}\r
  else if(axis>=0&&dims[axis]>=4){set(0,0,0);set(1,0,1);set(2,0,0);set(3,0,0);}\r
  if(findMatches(board,dims).cells.length){let seed=98537;return freshMatchBoard(dims,()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296),colors);}\r
  return board;\r
}\r
export function gravityRefill(board,dims,axis=1,rng=Math.random,colors=6,direction=-1){\r
  const moves=[];\r
  for(let i=0;i<board.length;i++){\r
    const start=matchCoord(i,dims);if(start[axis]!==0)continue;\r
    const positions=Array.from({length:dims[axis]},(_,n)=>{const p=[...start];p[axis]=direction<0?n:dims[axis]-1-n;return p;});\r
    const kept=positions.map(p=>({p,value:board[matchIndex(p,dims)]})).filter(v=>v.value>=0);\r
    for(let n=0;n<positions.length;n++){\r
      const to=positions[n],value=n<kept.length?kept[n].value:Math.floor(rng()*colors)%colors;\r
      board[matchIndex(to,dims)]=value;\r
      const from=n<kept.length?kept[n].p:to.map((v,a)=>a===axis?(direction<0?dims[axis]+n-kept.length:-1-n+kept.length):v);\r
      moves.push({from,to,value});\r
    }\r
  }\r
  return moves;\r
}\r
export function reshuffleMatchBoard(board,dims,rng=Math.random){\r
  const original=[...board];\r
  for(let attempt=0;attempt<80;attempt++){\r
    for(let i=board.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));swap(board,i,j);}\r
    if(!findMatches(board,dims).cells.length&&legalMatchMoves(board,dims,1).length)return true;\r
  }\r
  board.set(freshMatchBoard(dims,rng));\r
  return original.some((v,i)=>v!==board[i]);\r
}\r
export function createMatchState(spatial=true,rng=Math.random,dimensions,moveBudget=30){\r
  const dims=dimensions?[...dimensions]:spatial?[5,5,3]:[8,1,8];\r
  return {spatial,dims,board:freshMatchBoard(dims,rng),score:0,moves:moveBudget,goal:spatial?Math.max(300,Math.round(dims.reduce((a,b)=>a*b,1)*32/100)*100):2400,over:false,won:false,totalCleared:0,maxCombo:0,reshuffles:0,timeLeft:120,timeLimit:120,chain:0,chainLeft:0,charge:0,powers:{row:1,burst:1,time:1},lineClears:0,blastClears:0,endReason:null};\r
}\r
function ensureRound(state){\r
  state.timeLeft??=120;state.timeLimit??=120;state.chain??=0;state.chainLeft??=0;state.charge??=0;state.powers??={row:1,burst:1,time:1};state.lineClears??=0;state.blastClears??=0;\r
}\r
function finishRound(state){\r
  state.won=state.score>=state.goal;state.over=state.won||state.moves<=0||state.timeLeft<=0;\r
  state.endReason=state.won?'goal':state.timeLeft<=0?'time':state.moves<=0?'moves':null;\r
}\r
export function tickMatchState(state,dt){\r
  ensureRound(state);if(state.over)return false;\r
  state.timeLeft=Math.max(0,state.timeLeft-Math.max(0,dt));state.chainLeft=Math.max(0,state.chainLeft-Math.max(0,dt));\r
  if(!state.chainLeft)state.chain=0;finishRound(state);return state.over;\r
}\r
export function expandMatchRewards(matches,dims){\r
  const cells=new Set(matches.cells),lines=[],blasts=[];\r
  const line=(center,axis)=>{const p=matchCoord(center,dims),run=[];for(let n=0;n<dims[axis];n++){const q=[...p];q[axis]=n;const index=matchIndex(q,dims);cells.add(index);run.push(index);}lines.push(run);};\r
  for(const run of matches.runs){\r
    if(run.length<4)continue;\r
    const first=matchCoord(run[0],dims),last=matchCoord(run.at(-1),dims),axis=first.findIndex((n,i)=>n!==last[i]);\r
    if(run.length>=5){const center=run[Math.floor(run.length/2)];blasts.push(center);for(let a=0;a<3;a++)line(center,a);}\r
    else line(run[Math.floor(run.length/2)],axis);\r
  }\r
  return {cells:[...cells],lines,blasts};\r
}\r
function resolveMatchCascade(state,initial,rng,frames){\r
  let matches=initial,combo=0;const initialScore=state.score;\r
  while(matches.cells.length&&combo<32){\r
    combo++;const reward=expandMatchRewards(matches,state.dims),multiplier=combo*Math.max(1,state.chain);\r
    const points=reward.cells.length*10*multiplier+reward.lines.length*50+reward.blasts.length*150;\r
    state.score+=points;state.totalCleared+=reward.cells.length;state.lineClears+=reward.lines.length;state.blastClears+=reward.blasts.length;\r
    frames.push({type:'clear',board:[...state.board],...reward,combo,multiplier,points,duration:reward.lines.length?.46:.29});\r
    for(const index of reward.cells)state.board[index]=-1;\r
    const fall=gravityRefill(state.board,state.dims,state.spatial?1:2,rng,6,state.spatial?-1:1);\r
    frames.push({type:'fall',board:[...state.board],fall,combo,duration:.31});matches=findMatches(state.board,state.dims);\r
  }\r
  if(matches.cells.length){state.board.set(freshMatchBoard(state.dims,rng));state.reshuffles++;frames.push({type:'shuffle',board:[...state.board],duration:.2});}\r
  if(!legalMatchMoves(state.board,state.dims,1).length){reshuffleMatchBoard(state.board,state.dims,rng);state.reshuffles++;frames.push({type:'shuffle',board:[...state.board],duration:.25});}\r
  state.maxCombo=Math.max(state.maxCombo,combo);state.charge+=combo;\r
  while(state.charge>=5){state.charge-=5;state.powers.burst=Math.min(3,state.powers.burst+1);state.timeLeft=Math.min(state.timeLimit,state.timeLeft+5);}\r
  finishRound(state);return {valid:true,frames,combo,points:state.score-initialScore};\r
}\r
export function playMatchSwap(state,a,b,rng=Math.random){\r
  ensureRound(state);\r
  if(state.over||!inBounds(a,state.dims)||!inBounds(b,state.dims)||!areAdjacent(a,b))return {valid:false,reason:'adjacent',frames:[]};\r
  const board=state.board,i=matchIndex(a,state.dims),j=matchIndex(b,state.dims),before=[...board];\r
  swap(board,i,j);\r
  let matches=findMatches(board,state.dims);\r
  if(!matches.cells.includes(i)&&!matches.cells.includes(j)){\r
    swap(board,i,j);return {valid:false,reason:'no-match',frames:[{type:'swap',board:before,a,b,reverse:false,duration:.16},{type:'swap',board:before,a,b,reverse:true,duration:.16}]};\r
  }\r
  const frames=[{type:'swap',board:before,a,b,reverse:false,duration:.16}];\r
  state.moves--;state.chain=state.chainLeft>0?Math.min(5,state.chain+1):1;state.chainLeft=7;\r
  return resolveMatchCascade(state,matches,rng,frames);\r
}\r
\r
export function useMatchPower(state,power,cell=[0,0,0],axis=0,rng=Math.random){\r
  ensureRound(state);if(state.over||!state.powers[power])return {valid:false,reason:'unavailable',frames:[]};\r
  if(power==='time'){state.powers.time--;state.timeLeft+=10;state.timeLimit=Math.max(state.timeLimit,state.timeLeft);return {valid:true,frames:[],combo:0,points:0,power};}\r
  if(!inBounds(cell,state.dims))return {valid:false,reason:'cell',frames:[]};\r
  const cells=[];\r
  if(power==='row'){axis=Math.max(0,Math.min(2,axis));for(let n=0;n<state.dims[axis];n++){const p=[...cell];p[axis]=n;cells.push(matchIndex(p,state.dims));}}\r
  else if(power==='burst'){for(let i=0;i<state.board.length;i++)if(matchCoord(i,state.dims).every((n,a)=>Math.abs(n-cell[a])<=1))cells.push(i);}\r
  else return {valid:false,reason:'power',frames:[]};\r
  state.powers[power]--;state.chain=Math.max(1,state.chain);state.chainLeft=7;\r
  const result=resolveMatchCascade(state,{cells,runs:[]},rng,[]);result.power=power;\r
  if(power==='row')state.lineClears++;else state.blastClears++;\r
  if(result.frames[0]){result.frames[0].power=power;result.frames[0].duration=.48;if(power==='row')result.frames[0].lines=[cells];else result.frames[0].blasts=[matchIndex(cell,state.dims)];}\r
  return result;\r
}\r
\r
// Fallback for a fixed classic camera. Spatial arrows come from the host's\r
// current 24-orientation camera basis; WASD exclusively rotates that camera.\r
export function matchDirection(key,plane='xz'){\r
  const maps={xy:{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,1,0],arrowdown:[0,-1,0]},xz:{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,0,-1],arrowdown:[0,0,1]},yz:{arrowleft:[0,0,1],arrowright:[0,0,-1],arrowup:[0,1,0],arrowdown:[0,-1,0]}};\r
  return maps[plane]?.[String(key).toLowerCase()]??null;\r
}\r
// Rounded toys retain one local front expression while their bodies turn.\r
// Every batch keeps cell identity for the shared slice system.\r
export function createGame(ctx){\r
  const THREE=ctx.THREE,doc=ctx.ui.ownerDocument,CAPACITY=4096,SPACING=1.16;\r
  let spatial=true,dimensions=[5,5,3],state,selected=null,hintCells=[],frames=[],elapsed=0,pending=null,disposed=false,currentSlice={mode:null},clock=0,lastHud='',lastStats='',cameraPreset='volume',lastSoundFrame=null,notice='',noticeLife=0,announced=false,renderClock=0;\r
  let boardRevision=0,automaticHint=false,applyingAssist=false;\r
  const assist=new MatchAssist(),moveCache=new MatchMoveCache(legalMatchMoves);\r
  const cachedMoves=()=>moveCache.read(state.board,state.dims,boardRevision);\r
  const reducedMotion=typeof window!=='undefined'&&window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;\r
  const resources=new Set(),meshes=[],gems=[],ears=[],own=r=>(resources.add(r),r);\r
  const dummy=THREE?new THREE.Object3D():null,bodyQ=THREE?new THREE.Quaternion():null,faceQ=THREE?new THREE.Quaternion():null,partQ=THREE?new THREE.Quaternion():null,vec=THREE?new THREE.Vector3():null;\r
  const identityQ=THREE?new THREE.Quaternion():null;\r
  const counts=new Uint32Array(6),earCounts=new Uint32Array(6);\r
  let grid,eyes,pupils,muzzles,noses,sparkles,selection,hints,ribbons;\r
  const hud=ctx.hud?doc.createElement('div'):null;\r
  const hudInfo=hud?doc.createElement('div'):null,powerButtons={};\r
  if(hud){hud.className='game-hud v13-match3-hud';hud.append(hudInfo);ctx.hud.append(hud);}\r
  const world=p=>p.map((n,a)=>(n-(state.dims[a]-1)/2)*SPACING);\r
  function instanced(geometry,material,capacity,name,pick=false){\r
    const mesh=new THREE.InstancedMesh(geometry,material,capacity);mesh.name=name;mesh.count=0;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.userData[pick?'pickCells':'sliceCells']=[];ctx.group.add(mesh);meshes.push(mesh);return mesh;\r
  }\r
  function place(mesh,i,position,scale,cell,rotation=null,offset=null){\r
    dummy.position.set(...position);if(offset){vec.set(...offset);if(rotation)vec.applyQuaternion(rotation);dummy.position.add(vec);}\r
    dummy.quaternion.copy(rotation??identityQ);dummy.scale.set(...scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);\r
    const cells=mesh.userData.pickCells??mesh.userData.sliceCells;cells[i]={cell};\r
    const facing=mesh.geometry.getAttribute('m3Facing');if(facing){vec.set(0,0,1).applyQuaternion(rotation??identityQ);facing.setXYZ(i,vec.x,vec.y,vec.z);}\r
  }\r
  function material(color,extra={}){return own(new THREE.MeshStandardMaterial({color,roughness:.33,metalness:.04,...extra}));}\r
  function faceBatch(geometry,color,capacity,name){\r
    const g=own(geometry.clone());g.setAttribute('m3Facing',new THREE.InstancedBufferAttribute(new Float32Array(capacity*3),3).setUsage(THREE.DynamicDrawUsage));\r
    const m=material(color);m.onBeforeCompile=shader=>{\r
      shader.vertexShader='attribute vec3 m3Facing; varying float m3FaceVisible;\\n'+shader.vertexShader;\r
      shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\\nm3FaceVisible = dot(normalize(mat3(modelViewMatrix) * m3Facing), normalize(-mvPosition.xyz));');\r
      shader.fragmentShader='varying float m3FaceVisible;\\n'+shader.fragmentShader;\r
      shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\\nif (m3FaceVisible < 0.12) discard;');\r
    };m.customProgramCacheKey=()=> 'm3-single-face-v131';\r
    return instanced(g,m,capacity,name);\r
  }\r
  if(THREE&&ctx.group){\r
    const body=own(new THREE.SphereGeometry(1,12,8)),detail=own(new THREE.SphereGeometry(1,8,5)),cone=own(new THREE.ConeGeometry(1,2,5));\r
    for(let type=0;type<6;type++){\r
      gems.push(instanced(body,material(GEM_COLORS[type]),CAPACITY,\`match3-jewel-\${type}\`,true));\r
      ears.push(instanced(type===0||type===5?cone:detail,material(GEM_COLORS[type]),CAPACITY*2,\`match3-ears-\${type}\`));\r
    }\r
    const box=own(new THREE.BoxGeometry(1,1,1));\r
    grid=instanced(box,own(new THREE.MeshBasicMaterial({color:'#345669',transparent:true,opacity:.52,depthWrite:false})),CAPACITY*12,'match3-open-grid');\r
    ribbons=instanced(box,own(new THREE.MeshBasicMaterial({color:'#e8fff0',transparent:true,opacity:.65,depthWrite:false})),CAPACITY*3,'match3-line-rays');\r
    eyes=faceBatch(detail,'#fffdf0',CAPACITY*2,'match3-animal-eyes');\r
    pupils=faceBatch(detail,'#183147',CAPACITY*2,'match3-animal-pupils');\r
    muzzles=faceBatch(detail,'#fff0ce',CAPACITY,'match3-animal-muzzles');\r
    noses=faceBatch(detail,'#5e3a51',CAPACITY,'match3-animal-noses');\r
    const octa=own(new THREE.OctahedronGeometry(1,0));\r
    sparkles=instanced(octa,own(new THREE.MeshBasicMaterial({color:'#fff0a2',transparent:true,depthWrite:false})),CAPACITY*7,'match3-sparkle-burst');\r
    const torus=own(new THREE.TorusGeometry(.49,.027,5,24));\r
    selection=instanced(torus,own(new THREE.MeshBasicMaterial({color:'#ffce53',depthTest:false})),3,'match3-selection-orbits');\r
    hints=instanced(torus,own(new THREE.MeshBasicMaterial({color:'#a1ffe6',depthTest:false})),6,'match3-hint-orbits');\r
    grid.renderOrder=1;gems.forEach(m=>m.renderOrder=10);ears.forEach(m=>m.renderOrder=11);muzzles.renderOrder=20;eyes.renderOrder=30;pupils.renderOrder=40;noses.renderOrder=41;selection.renderOrder=60;hints.renderOrder=60;ribbons.renderOrder=65;sparkles.renderOrder=70;\r
  }\r
  function button(text,action,title=text){const b=doc.createElement('button');b.textContent=text;b.className='small-button';b.setAttribute('aria-label',title);b.onclick=()=>{onUserAction({type:'control'});action();};return b;}\r
  function row(...children){const el=doc.createElement('div');el.className='control-row';el.append(...children);ctx.ui.append(el);return el;}\r
  const mode=doc.createElement('select');for(const [value,label]of [['3d','3D'],['2d','8 × 8']]){const option=doc.createElement('option');option.value=value;option.textContent=label;mode.append(option);}mode.setAttribute('aria-label','Match Three mode');mode.onchange=()=>{spatial=mode.value==='3d';reset();};\r
  row(mode,button('↻',reset,'Restart'));\r
  row(button('☀ H',hint,'Hint'),button('×',()=>{selected=null;hintCells=[];render();},'Clear selection'));\r
  row(...[['←','ArrowLeft'],['↑','ArrowUp'],['↓','ArrowDown'],['→','ArrowRight']].map(([label,key])=>button(label,()=>directionAction(key))));\r
  row(...[['W','up'],['S','down'],['A','left'],['D','right']].map(([label,direction])=>button(label,()=>ctx.spatial?.turn?.(direction),'Rotate view')));\r
  row(button('↔ 1',()=>power('row'),'Line clear'),button('✦ 2',()=>power('burst'),'Burst'),button('◷ 3',()=>power('time'),'Add 10 seconds'));\r
  if(hud){const tray=doc.createElement('div');tray.className='m3-power-tray';for(const [name,icon,key,title]of [['row','↔','1','Line clear'],['burst','✦','2','Burst'],['time','+10s','3','Add 10 seconds']]){const b=button('',()=>power(name),title);b.setAttribute('data-match-power',name);const symbol=doc.createElement('span'),keycap=doc.createElement('kbd'),count=doc.createElement('b');symbol.textContent=icon;keycap.textContent=key;b.append(symbol,keycap,count);tray.append(b);powerButtons[name]={button:b,count};}hud.append(tray);}\r
  const statusEl=doc.createElement('p');statusEl.className='hint';ctx.ui.append(statusEl);\r
  ctx.setRules?.('<p>Swap neighbours. Match 3 on X, Y or Z. Match 4 → full line. Match 5 → three-axis blast.</p><p>120 seconds · '+(ctx.design?.moveBudget??30)+' moves. Reach the star target. Fast matches multiply points. Five cascades refill a burst and add 5 seconds.</p><p>1 line · 2 burst · 3 +10s · H hint</p>');\r
  function initCamera(){const size=state.dims.map(n=>n*SPACING),distance=Math.max(...size)*1.65;if(spatial&&ctx.spatial?.volume)ctx.spatial.volume({target:[0,0,0],distance,size});else ctx.frame({target:[0,0,0],distance:spatial?distance:15,position:spatial?[distance*.7,distance*.5,distance]:[0,15,.001]});}\r
  function showNotice(text){notice=text;noticeLife=1.5;}\r
  function renderHud(){\r
    const progress=Math.min(100,state.score/state.goal*100),time=Math.ceil(state.timeLeft),pct=state.charge/5*100,terminal=state.over?(state.won?'STAR PARTY!':state.endReason==='time'?'TIME UP':'OUT OF MOVES'):'';\r
    const markup=\`<div class="m3-scoreboard"><div class="m3-time \${time<20?'urgent':''}"><span>◷</span><strong>\${time}</strong></div><div class="m3-score"><span class="m3-stars">\${'★'.repeat(Math.min(3,Math.floor(progress/33.33)))}\${'☆'.repeat(3-Math.min(3,Math.floor(progress/33.33)))}</span><strong>\${state.score.toLocaleString()}</strong><div class="m3-progress"><i style="width:\${progress}%"></i></div><small>/\${state.goal.toLocaleString()}</small></div><div class="m3-moves"><span>↔</span><strong>\${state.moves}</strong></div></div><div class="m3-combo-meter"><span>✦ <b>\${Math.max(1,state.chain)}×</b></span><div><i style="width:\${Math.round(state.chainLeft/7*100)}%"></i></div><span class="m3-charge" style="--charge:\${pct}%">\${state.charge}/5</span></div>\${terminal?\`<div class="m3-end \${state.won?'won':''}"><span>\${state.won?'★ ★ ★':'◷'}</span><strong>\${terminal}</strong><small>\${state.score.toLocaleString()} / \${state.goal.toLocaleString()}</small><button data-match-restart aria-label="Play again">↻</button></div>\`:noticeLife>0?\`<div class="m3-praise">\${notice}</div>\`:''}\`;\r
    if(hudInfo&&markup!==lastHud){hudInfo.innerHTML=markup;lastHud=markup;const restart=hudInfo.querySelector?.('[data-match-restart]');if(restart)restart.onclick=reset;}\r
    for(const [name,control]of Object.entries(powerButtons)){control.button.disabled=state.over||!state.powers[name];control.count.textContent=state.powers[name];}\r
    const stats={Score:state.score,Goal:state.goal,Time:time,Moves:state.moves,Combo:\`×\${state.maxCombo}\`,Lines:state.lineClears},statsKey=JSON.stringify(stats);if(statsKey!==lastStats){ctx.setStats(stats);lastStats=statsKey;}\r
    statusEl.textContent=selected?selected.map(n=>n+1).join(' / '):'';\r
  }\r
  function render(){\r
    if(!state||disposed)return;const current=frames[0],board=current?.board??state.board,t=current?Math.min(1,elapsed/current.duration):1;\r
    const clear=new Set(current?.cells??[]),fallMap=new Map((current?.fall??[]).map(m=>[matchIndex(m.to,state.dims),m]));\r
    let gridCount=0,faceCount=0,particleCount=0,selectionCount=0,hintCount=0;counts.fill(0);earCounts.fill(0);\r
    const fallback=[];\r
    for(let i=0;i<board.length;i++){\r
      const cell=matchCoord(i,state.dims),base=world(cell),value=board[i];let position=[...base],scale=1;\r
      if(grid)for(let axis=0;axis<3;axis++)for(const a of [-1,1])for(const b of [-1,1]){const axes=[0,1,2].filter(n=>n!==axis),offset=[0,0,0],size=[.028,.028,.028];offset[axes[0]]=a*SPACING/2;offset[axes[1]]=b*SPACING/2;size[axis]=SPACING;place(grid,gridCount++,base,size,cell,null,offset);}\r
      if(value<0)continue;\r
      if(current?.type==='swap'&&(sameCell(cell,current.a)||sameCell(cell,current.b))){const other=sameCell(cell,current.a)?current.b:current.a,u=t*t*(3-2*t),k=current.reverse?1-u:u,end=world(other);position=position.map((n,a)=>n+(end[a]-n)*k);}\r
      if(current?.type==='clear'&&clear.has(i))scale=t<.23?1+t:Math.max(.001,1-(t-.23)/.77);\r
      if(current?.type==='fall'){const m=fallMap.get(i);if(m){const from=world(m.from);position=position.map((n,a)=>from[a]+(n-from[a])*(1-(1-t)**3));}}\r
      const bob=reducedMotion?0:Math.sin(clock*1.5+i*.71)*.035;position[1]+=bob;\r
      const isSelected=sameCell(selected,cell),isHint=hintCells.some(p=>sameCell(p,cell));if(isSelected)scale*=1.09;\r
      if(gems.length){\r
        bodyQ.setFromEuler(new THREE.Euler(reducedMotion?0:Math.sin(clock*.3+i)*.055,reducedMotion?0:clock*.2+i*.33,0));\r
        const n=counts[value]++,radius=value===3?[.41,.35,.38]:value===2?[.36,.4,.36]:[.39,.38,.39];place(gems[value],n,position,radius.map(r=>r*scale),cell,bodyQ);\r
        for(const side of [-1,1]){const earScale=value===0||value===5?[.12,.15,.12]:value===3?[.15,.13,.14]:value===2?[.085,.13,.08]:[.15,.16,.13];place(ears[value],earCounts[value]++,position,earScale.map(n=>n*scale),cell,bodyQ,[side*(value===2?.09:.25)*scale,.33*scale,0]);}\r
        // One expression, attached to the front of this rotating animal.\r
        {\r
          faceQ.copy(bodyQ);\r
          for(const sign of [-1,1]){const eye=faceCount*2+(sign===1?1:0);place(eyes,eye,position,[.067,.077,.034].map(n=>n*scale),cell,faceQ,[sign*.12*scale,.07*scale,.356*scale]);place(pupils,eye,position,[.029,.044,.018].map(n=>n*scale),cell,faceQ,[(sign*.12+.008)*scale,.065*scale,.387*scale]);}\r
          place(muzzles,faceCount,position,[.125,.061,.035].map(n=>n*scale),cell,faceQ,[0,-.105*scale,.361*scale]);place(noses,faceCount,position,[(value===2?.055:.03),.025,.027].map(n=>n*scale),cell,faceQ,[0,-.077*scale,.394*scale]);faceCount++;\r
        }\r
        for(const [active,target]of [[isSelected,selection],[isHint,hints]])if(active)for(let a=0;a<3;a++){partQ.setFromEuler(new THREE.Euler(a===1?Math.PI/2:0,a===2?Math.PI/2:0,clock*.25));const pulse=automaticHint&&target===hints&&!reducedMotion?1+.09*Math.sin(clock*4):1;place(target,target===selection?selectionCount++:hintCount++,position,[pulse,pulse,pulse],cell,partQ);}\r
        if(current?.type==='clear'&&clear.has(i))for(let n=0;n<7;n++){const angle=n*2.399+i*.7,r=.1+t*(current.lines.length?1.65:1.1),s=(1-t)*.065+.015;place(sparkles,particleCount++,position,[s,s*1.7,s],cell,null,[Math.cos(angle)*r,Math.sin(angle)*r,Math.sin(angle*.7)*r]);}\r
      }else fallback.push({x:position[0],y:position[1],z:position[2],sx:.75*scale,sy:.75*scale,sz:.75*scale,color:GEM_COLORS[value],data:{cell}});\r
    }\r
    if(gems.length){gems.forEach((m,i)=>m.count=counts[i]);ears.forEach((m,i)=>m.count=earCounts[i]);grid.count=gridCount;eyes.count=pupils.count=faceCount*2;muzzles.count=noses.count=faceCount;sparkles.count=particleCount;sparkles.material.opacity=current?.type==='clear'?1-t:0;selection.count=selectionCount;hints.count=hintCount;ribbons.count=0;\r
      if(current?.type==='clear')for(const line of current.lines){const first=matchCoord(line[0],state.dims),last=matchCoord(line.at(-1),state.dims),a=world(first),b=world(last),axis=first.findIndex((v,i)=>v!==last[i]),scale=[.1,.1,.1];if(axis<0)continue;scale[axis]=Math.abs(b[axis]-a[axis])+SPACING;place(ribbons,ribbons.count++,a.map((n,i)=>(n+b[i])/2),scale,matchCoord(line[Math.floor(line.length/2)],state.dims));}ribbons.material.opacity=Math.sin(t*Math.PI)*.68;\r
      for(const m of meshes){m.instanceMatrix.needsUpdate=true;const facing=m.geometry.getAttribute('m3Facing');if(facing)facing.needsUpdate=true;(m.userData.pickCells??m.userData.sliceCells).length=m.count;m.boundingBox=null;m.boundingSphere=null;}\r
    }\r
    if(!gems.length)ctx.setVoxels(fallback);renderHud();\r
  }\r
  function reset(){ctx.spatial?.cancelAssist?.();assist.reset();automaticHint=false;currentSlice={mode:null};state=createMatchState(spatial,Math.random,spatial?dimensions:undefined,ctx.design?.moveBudget);boardRevision++;selected=null;hintCells=[];frames=[];pending=null;elapsed=0;clock=0;announced=false;noticeLife=0;lastHud='';lastSoundFrame=null;cameraPreset=spatial?'volume':'classic';mode.value=spatial?'3d':'2d';ctx.setVoxels([]);ctx.setLabels([]);render();initCamera();if(!cachedMoves().length)ctx.message('Make one axis longer to create matches.');}\r
  function finish(){\r
    if(state.over&&!announced){announced=true;ctx.message(state.won?'Star target reached!':state.endReason==='time'?'Time up.':'Out of moves.');ctx.sound?.(state.won?'win':'error');}\r
    if(!pending)return;const result=pending;pending=null;\r
    if(!result.valid)ctx.message('Try another pair.');render();\r
  }\r
  function perform(a,b){if(frames.length||state.over)return;const result=playMatchSwap(state,a,b);if(result.valid)boardRevision++;selected=null;hintCells=[];automaticHint=false;assist.interrupt();if(result.reason==='adjacent'){ctx.message('Choose a neighbour.');render();return;}frames=result.frames;pending=result;elapsed=0;ctx.sound?.(result.valid?'move':'error');render();if(!frames.length)finish();}\r
  function pick(cell){if(frames.length||state.over||!inBounds(cell,state.dims))return;if(!selected||!areAdjacent(selected,cell)){selected=sameCell(selected,cell)?null:[...cell];hintCells=[];render();return;}perform([...selected],cell);}\r
  function directionAction(key){if(frames.length||state.over)return;if(!selected){ctx.message('Pick an animal.');return;}const vector=spatial?(ctx.spatial?.vectorForKey?.(key)??matchDirection(key,'xy')):matchDirection(key,'xz');if(vector){const next=selected.map((n,a)=>n+vector[a]);if(inBounds(next,state.dims))perform([...selected],next);}}\r
  function power(name){\r
    if(frames.length||state.over)return;if(name!=='time'&&!selected){ctx.message('Pick an animal first.');return;}\r
    const vector=ctx.spatial?.vectorForKey?.('ArrowRight')??[1,0,0],axis=vector.findIndex(n=>n!==0),result=useMatchPower(state,name,selected??[0,0,0],axis);if(!result.valid)return;\r
    if(name!=='time')boardRevision++;frames=result.frames;pending=result;elapsed=0;selected=null;hintCells=[];automaticHint=false;assist.interrupt();showNotice(name==='time'?'+10 SECONDS!':name==='row'?'LINE PARTY!':'BOOM!');ctx.sound?.(name==='time'?'power':name==='row'?'line':'burst');render();if(!frames.length)finish();\r
  }\r
  function inCurrentSlice(cell){if(!currentSlice.mode)return true;const axes=['x','y','z'];if(currentSlice.mode==='layer')return cell[axes.indexOf(currentSlice.axis)]===currentSlice.index;return axes.every((a,i)=>Math.abs(cell[i]-currentSlice.center?.[a])<=(currentSlice.mode==='cell'?0:1));}\r
  function hint(){if(frames.length||state.over)return;automaticHint=false;const move=currentSlice.mode?cachedMoves().find(pair=>pair.every(inCurrentSlice)):cachedMoves()[0];if(!move){hintCells=[];selected=null;if(currentSlice.mode)ctx.message('X → next layer');else{reshuffleMatchBoard(state.board,state.dims);state.reshuffles++;boardRevision++;}render();return;}hintCells=move.map(p=>[...p]);selected=[...move[0]];ctx.message('Swap the glowing pair.');render();}\r
  function onUserAction(event={}){const clear=automaticHint;assist.interrupt(event);ctx.spatial?.cancelAssist?.();if(clear){hintCells=[];automaticHint=false;render();}}\r
  function onGlobalView(){onUserAction({type:'control'});assist.globalView();}\r
  function onSlice(snapshot){\r
    const changed=currentSlice.mode!==snapshot?.mode||currentSlice.axis!==snapshot?.axis||currentSlice.index!==snapshot?.index;\r
    currentSlice={...snapshot,center:snapshot?.center&&{...snapshot.center}};\r
    if(changed&&!applyingAssist){onUserAction({type:'control'});if(snapshot?.mode)assist.manualSlice();}\r
    if(hintCells.length&&!hintCells.every(inCurrentSlice)){hintCells=[];automaticHint=false;render();}\r
  }\r
  function updateAssist(dt){\r
    const blocked=!!selected||frames.length>0||state.over;\r
    if(blocked&&(assist.active||assist.pending)){ctx.spatial?.cancelAssist?.();if(automaticHint){hintCells=[];automaticHint=false;}}\r
    const action=assist.advance(dt,blocked?{blocked:true}:{moves:cachedMoves(),dims:state.dims,slice:currentSlice,basis:ctx.spatial?.basis?.(),spatial});\r
    if(!action)return;\r
    if(action.type==='pulse'){hintCells=action.pair.map(p=>[...p]);automaticHint=true;assist.applied(action);return;}\r
    let accepted=false;applyingAssist=true;\r
    try{const options={axis:action.axis,sign:action.sign,duration:850};accepted=action.type==='slice'?ctx.spatial?.assistSlice?.({...options,index:action.index})===true:ctx.spatial?.assistFace?.(options)===true;}\r
    finally{applyingAssist=false;}\r
    assist.applied(action,accepted,.95);\r
  }\r
  reset();\r
  return {reset,getDimensions(){return {x:state.dims[0],y:state.dims[1],z:state.dims[2]};},setDimensions(d){const next=[d.x,d.y,d.z];if(next.some(n=>!Number.isSafeInteger(n)||n<1)||next.reduce((a,b)=>a*b,1)>CAPACITY)throw new RangeError('XYZ must be positive integers, up to 4,096 cells.');dimensions=next;spatial=true;reset();},getSelection(){const p=selected??state.dims.map(n=>Math.floor((n-1)/2));return {x:p[0],y:p[1],z:p[2]};},cellPosition(data){return data?.cell?{x:data.cell[0],y:data.cell[1],z:data.cell[2]}:null;},selectCell(data){onUserAction({type:'control'});if(data?.cell&&inBounds(data.cell,state.dims)){selected=[...data.cell];hintCells=[];render();}},onSlice,onUserAction,onGlobalView,onView(view){cameraPreset=view;},update(dt){\r
    clock+=dt;noticeLife=Math.max(0,noticeLife-dt);const over=tickMatchState(state,dt);\r
    if(frames.length){elapsed+=dt;while(frames.length&&elapsed>=frames[0].duration){elapsed-=frames[0].duration;frames.shift();}\r
      if(frames[0]?.type==='clear'&&lastSoundFrame!==frames[0]){lastSoundFrame=frames[0];const f=frames[0],big=f.blasts.length>0,line=f.lines.length>0;showNotice(big?'SUPER NOVA!':line?'LINE PARTY!':f.combo>2?\`WILD! ×\${f.multiplier}\`:f.combo>1?\`SWEET! ×\${f.multiplier}\`:\`+\${f.points}\`);ctx.sound?.(big?'burst':line?'line':f.combo>1?'combo':'clear');}\r
      if(!frames.length)finish();\r
    }else if(over)finish();updateAssist(dt);renderClock+=dt;if(frames.length||renderClock>=1/30){renderClock=0;render();}\r
  },onPick(data){onUserAction({type:'control'});if(data?.cell)pick(data.cell);},onKey(key,event){onUserAction({type:'key',key});if(matchDirection(key,'xy')){event?.preventDefault();directionAction(key);}else if(key==='h')hint();else if(['1','2','3'].includes(key))power({1:'row',2:'burst',3:'time'}[key]);else if(key==='Escape'){selected=null;hintCells=[];render();}},getState(){return {...state,board:[...state.board],selected,plane:spatial?'volume':'xz',viewMode:spatial?'volume':'classic',cameraPreset,animating:frames.length>0,hintCells:hintCells.map(p=>[...p]),assist:{...assist.snapshot(),automaticHint,moveCacheComputations:moveCache.computations},presentation:'floating-animal-lattice',activeEffect:frames[0]?.type??null};},dispose(){disposed=true;ctx.spatial?.cancelAssist?.();assist.reset();for(const mesh of meshes){ctx.group?.remove(mesh);mesh.dispose?.();}for(const resource of resources)resource.dispose();hud?.remove();ctx.ui.replaceChildren();}};\r
}\r
`;export{e as default};
