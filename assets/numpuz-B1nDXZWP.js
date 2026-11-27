const e=`export function puzzleIndex(x, y, z, dimensions) { return x + dimensions.x * (z + dimensions.z * y); }\r
export function puzzleCoordinates(index, dimensions) {\r
  return { x: index % dimensions.x, y: Math.floor(index / (dimensions.x * dimensions.z)), z: Math.floor(index / dimensions.x) % dimensions.z };\r
}\r
export function puzzleNeighbors(index, dimensions) {\r
  const point = puzzleCoordinates(index, dimensions);\r
  const result = [];\r
  for (const axis of ['x', 'y', 'z']) for (const delta of [-1, 1]) {\r
    const next = { ...point, [axis]: point[axis] + delta };\r
    if (next[axis] >= 0 && next[axis] < dimensions[axis]) result.push(puzzleIndex(next.x, next.y, next.z, dimensions));\r
  }\r
  return result;\r
}\r
export function puzzleSolved(board) {\r
  return board.length > 0 && board.every((value, index) => value === (index === board.length - 1 ? 0 : index + 1));\r
}\r
export function validatePuzzleDimensions(dimensions) {\r
  return dimensions && ['x', 'y', 'z'].every(axis => Number.isInteger(dimensions[axis]) && dimensions[axis] >= 1 && Number.isSafeInteger(dimensions.x * dimensions.y * dimensions.z));\r
}\r
\r
/** Every shuffle step is an actual adjacent slide, so its inverse is always a solution. */\r
export function shufflePuzzle(dimensions, steps = 56, rng = Math.random) {\r
  if (!validatePuzzleDimensions(dimensions)) throw new RangeError('X, Y and Z must be positive integers.');\r
  if (!Number.isInteger(steps) || steps < 1 || steps > 5000) throw new RangeError('Numpuz shuffle steps must be 1–5000.');\r
  const count = dimensions.x * dimensions.y * dimensions.z;\r
  const board = Array.from({ length: count }, (_, index) => index === count - 1 ? 0 : index + 1);\r
  let blank = count - 1, previous = -1;\r
  const route = [];\r
  for (let step = 0; step < steps; step++) {\r
    let choices = puzzleNeighbors(blank, dimensions).filter(index => index !== previous);\r
    if (!choices.length) choices = puzzleNeighbors(blank, dimensions);\r
    if (!choices.length) break;\r
    const next = choices[Math.floor(rng() * choices.length)];\r
    route.push(blank);\r
    [board[blank], board[next]] = [board[next], board[blank]];\r
    previous = blank; blank = next;\r
  }\r
  if (puzzleSolved(board) && count > 1) {\r
    const next = puzzleNeighbors(blank, dimensions)[0];\r
    route.push(blank); [board[blank], board[next]] = [board[next], board[blank]]; blank = next;\r
  }\r
  return { board, blank, route };\r
}\r
\r
export class NumpuzGame {\r
  constructor({ dimensions = { x: 2, y: 2, z: 2 }, steps = 56, rng = Math.random } = {}) {\r
    this.dimensions = { ...dimensions };\r
    this.initial = shufflePuzzle(this.dimensions, steps, rng);\r
    this.restart();\r
  }\r
  restart() {\r
    this.board = [...this.initial.board]; this.blank = this.initial.blank; this.route = [...this.initial.route];\r
    this.moves = 0; this.hints = 0; this.elapsed = 0; this.started = false; this.won = puzzleSolved(this.board); this.history = [];\r
  }\r
  move(index, hint = false) {\r
    if (this.won || !Number.isInteger(index) || !puzzleNeighbors(this.blank, this.dimensions).includes(index)) return false;\r
    const oldBlank = this.blank;\r
    const reversed = this.route.length > 0 && this.route[this.route.length - 1] === index;\r
    this.history.push({ blank: oldBlank, target: index, reversed, hints: this.hints });\r
    if (reversed) this.route.pop(); else this.route.push(oldBlank);\r
    [this.board[oldBlank], this.board[index]] = [this.board[index], this.board[oldBlank]];\r
    this.blank = index; this.moves++; if (hint) this.hints++;\r
    this.started = true; this.won = puzzleSolved(this.board);\r
    return true;\r
  }\r
  moveAxis(axis, delta) {\r
    if (!['x', 'y', 'z'].includes(axis) || Math.abs(delta) !== 1) return false;\r
    const point = puzzleCoordinates(this.blank, this.dimensions);\r
    point[axis] += delta;\r
    if (point[axis] < 0 || point[axis] >= this.dimensions[axis]) return false;\r
    return this.move(puzzleIndex(point.x, point.y, point.z, this.dimensions));\r
  }\r
  undo() {\r
    const previous = this.history.pop();\r
    if (!previous) return false;\r
    [this.board[previous.blank], this.board[previous.target]] = [this.board[previous.target], this.board[previous.blank]];\r
    if (previous.reversed) this.route.push(previous.target); else this.route.pop();\r
    this.blank = previous.blank; this.hints = previous.hints; this.moves = Math.max(0, this.moves - 1); this.won = false;\r
    return true;\r
  }\r
  hint() {\r
    if (this.won || !this.route.length) return -1;\r
    const target = this.route[this.route.length - 1];\r
    return this.move(target, true) ? target : -1;\r
  }\r
  tick(dt) { if (this.started && !this.won) this.elapsed += dt; }\r
  getState() {\r
    return { dimensions: { ...this.dimensions }, board: [...this.board], blank: this.blank, moves: this.moves, hints: this.hints, elapsed: this.elapsed, won: this.won, legalMoves: puzzleNeighbors(this.blank, this.dimensions), routeRemaining: this.route.length };\r
  }\r
}\r
\r
export function numpuzGoalPlanes(dimensions,pair=0){\r
  const lower=Math.min(Math.max(0,pair*2),Math.max(0,dimensions.y-2)),levels=dimensions.y===1?[0]:[lower+1,lower];\r
  return levels.map((y,n)=>({y,name:n===0&&dimensions.y>1?'UP':'DOWN',values:Array.from({length:dimensions.x*dimensions.z},(_,i)=>{const index=puzzleIndex(i%dimensions.x,y,Math.floor(i/dimensions.x),dimensions);return index===dimensions.x*dimensions.y*dimensions.z-1?0:index+1;})}));\r
}\r
\r
export function numpuzPlaqueQuaternion(basis) {\r
  const matrix=new Matrix4().makeBasis(new Vector3(...basis.right),new Vector3(...basis.up),new Vector3(...basis.normal));\r
  return new Quaternion().setFromRotationMatrix(matrix).normalize().toArray();\r
}\r
\r
export function createGame(ctx) {\r
  let game,lastSecond=-1,showGoal=false,hovered=null,selectedIndex=null,customDimensions={x:2,y:2,z:2},activeSlice=null,goalPair=0,rails=[],slide=null,gimbal=null;\r
  const doc=ctx.ui.ownerDocument??globalThis.document;\r
  const numeralGeometry=ctx.THREE&&ctx.group?new ctx.THREE.PlaneGeometry(1,1):null;\r
  const numerals=numeralGeometry?new CubeLabels(ctx.group,numeralGeometry):null;\r
  const plaqueQuaternion=new Quaternion(),targetQuaternion=new Quaternion();\r
  const reducedMotion=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;\r
  ctx.ui.innerHTML='<div class="control-group"><label><select aria-label="Numpuz mode" data-mode><option value="volume">3D</option><option value="classic">15 Puzzle</option></select></label><label>↯ <select aria-label="Shuffle steps" data-level><option value="12">12</option><option value="56" selected>56</option><option value="120">120</option></select></label>'\r
    +'<p class="hint" data-position hidden></p><p class="hint" data-instructions hidden></p><div class="control-row" data-moves></div><div class="control-row" data-turns></div><div class="control-row"><button class="small-button" data-goal title="Preview solution">▦</button><button class="small-button" data-undo title="Undo U">↶ U</button><button class="small-button" data-hint title="Hint H">☀ H</button><button class="small-button" data-restart title="Restart">↻</button><button class="primary-button" data-new title="Shuffle again">↯</button></div><details><summary>Adjacent tiles</summary><div class="piece-grid" data-neighbors></div></details></div>';\r
  const hud=ctx.hud?doc.createElement('div'):null;\r
  if(hud){hud.className='game-hud numpuz-hud v13-numpuz-hud';ctx.hud.append(hud);}\r
  const q=selector=>ctx.ui.querySelector(selector),mode=q('[data-mode]'),isVolume=()=>mode.value!=='classic',pitch=()=>isVolume()?1.32:1.12;\r
  const button=(text,action)=>{const el=doc.createElement('button');el.type='button';el.className='small-button';el.textContent=text;el.onclick=action;return el;};\r
  const validIndex=index=>Number.isInteger(index)&&index>=0&&index<game.board.length;\r
  function world(point){return ['x','y','z'].map(axis=>(point[axis]-(game.dimensions[axis]-1)/2)*pitch());}\r
  function follow(){if(isVolume())ctx.spatial?.follow?.({target:world(puzzleCoordinates(game.blank,game.dimensions)),weight:.2});}\r
  function renderHud(){\r
    if(!hud)return;const d=game.dimensions;\r
    hud.innerHTML=\`<div class="numpuz-v13-counters"><span aria-label="Moves">↔ <b>\${game.moves}</b></span><span aria-label="Time">◷ <b>\${Math.floor(game.elapsed/60)}:\${String(Math.floor(game.elapsed)%60).padStart(2,'0')}</b></span></div><aside class="numpuz-v13-goals" aria-label="Solution">\${numpuzGoalPlanes(d,goalPair).map(plane=>\`<figure><figcaption>\${plane.name}\${d.y>2?\`<small>\${plane.y+1}</small>\`:''}</figcaption><div class="numpuz-v13-goal-tray" style="--columns:\${d.x}">\${plane.values.map((value,i)=>{const p={x:i%d.x,y:plane.y,z:Math.floor(i/d.x)},lit=activeSlice?.mode==='layer'&&p[activeSlice.axis]===activeSlice.index;return \`<span class="numpuz-v13-goal-tile\${!value?' empty':''}\${lit?' active':''}">\${value||''}</span>\`;}).join('')}</div></figure>\`).join('')}\${d.y>2?\`<nav><button data-goal-previous aria-label="Previous goal layers">‹</button><span>\${goalPair+1}/\${Math.ceil(d.y/2)}</span><button data-goal-next aria-label="Next goal layers">›</button></nav>\`:''}</aside>\`;\r
    const previous=hud.querySelector?.('[data-goal-previous]'),next=hud.querySelector?.('[data-goal-next]');if(previous)previous.onclick=()=>{goalPair=(goalPair+Math.ceil(d.y/2)-1)%Math.ceil(d.y/2);renderHud();};if(next)next.onclick=()=>{goalPair=(goalPair+1)%Math.ceil(d.y/2);renderHud();};\r
  }\r
  function status(){renderHud();const dim=game.dimensions;ctx.setStats({'Board':dim.x+' × '+dim.y+' × '+dim.z,'Moves':game.moves,'Time':Math.floor(game.elapsed/60)+':'+String(Math.floor(game.elapsed)%60).padStart(2,'0'),'Home':game.board.filter((v,i)=>v&&v===i+1).length+'/'+(game.board.length-1),'Hints':game.hints});}\r
  function buildRails(){\r
    rails=[];const dims=['x','y','z'].map(a=>game.dimensions[a]),space=pitch();\r
    if(!isVolume()){\r
      rails.push({x:0,y:-.15,z:0,sx:dims[0]*space+.12,sy:.14,sz:dims[2]*space+.12,color:'#9c754c',boardBase:true});\r
      for(let index=0;index<game.board.length;index++){const [x,y,z]=world(puzzleCoordinates(index,game.dimensions));rails.push({x,y:y-.06,z,sx:space-.07,sy:.025,sz:space-.07,color:'#bb9667',data:{index,bed:true}});}\r
      return;\r
    }\r
    // Connected rails surround open cell mouths. No floor crosses a Y passage.\r
    for(let axis=0;axis<3;axis++){\r
      const [a,b]=[0,1,2].filter(i=>i!==axis);\r
      for(let step=0;step<dims[axis];step++)for(let u=0;u<=dims[a];u++)for(let v=0;v<=dims[b];v++){\r
        const position=[0,0,0],size=[.034,.034,.034],cell=[0,0,0],outer=(u===0||u===dims[a])&&(v===0||v===dims[b]);\r
        position[axis]=(step-(dims[axis]-1)/2)*space;position[a]=(u-dims[a]/2)*space;position[b]=(v-dims[b]/2)*space;\r
        size[axis]=space+.02;if(outer)for(const i of [a,b])size[i]=.065;\r
        cell[axis]=step;cell[a]=Math.min(u,dims[a]-1);cell[b]=Math.min(v,dims[b]-1);\r
        rails.push({x:position[0],y:position[1],z:position[2],sx:size[0],sy:size[1],sz:size[2],color:outer?'#b98b54':'#c5a579',opacity:outer?1:.72,data:{index:puzzleIndex(...cell,game.dimensions),rail:true},railAxis:axis});\r
      }\r
    }\r
    // Small brass joints make the continuous three-axis rail connections clear.\r
    if(game.board.length<=512)for(let x=0;x<=dims[0];x++)for(let y=0;y<=dims[1];y++)for(let z=0;z<=dims[2];z++){\r
      const point=[x,y,z].map((v,a)=>(v-dims[a]/2)*space);rails.push({x:point[0],y:point[1],z:point[2],sx:.075,sy:.075,sz:.075,color:'#d9bc7d',joint:true});\r
    }\r
  }\r
  function drawBoard(){\r
    const dim=game.dimensions,legal=puzzleNeighbors(game.blank,dim),voxels=[...rails],labels=[],quaternion=plaqueQuaternion.toArray();\r
    const offset=local=>new Vector3(...local).applyQuaternion(plaqueQuaternion).toArray();\r
    const body=(position,local,size,color,data,opacity=1)=>{const shift=offset(local);voxels.push({x:position[0]+shift[0],y:position[1]+shift[1],z:position[2]+shift[2],sx:size[0],sy:size[1],sz:size[2],color,opacity,quaternion,data});};\r
    for(let index=0;index<game.board.length;index++){\r
      const value=showGoal?(index===game.board.length-1?0:index+1):game.board[index];\r
      if(!value)continue;let position=world(puzzleCoordinates(index,dim));\r
      if(slide&&slide.value===value&&!showGoal){const t=Math.min(1,slide.elapsed/slide.duration),e=t*t*(3-2*t);position=slide.from.map((v,a)=>v+(slide.to[a]-v)*e);}\r
      const isLegal=!showGoal&&legal.includes(index),inPlace=value===index+1,data={index,tile:true,value};\r
      const color=index===hovered?'#ffe5b2':isLegal?'#f6d6a0':inPlace?'#f1dfba':'#e3c391';\r
      body(position,[0,0,0],[.84,.84,.12],'#ad7c48',{...data,part:'body'});\r
      body(position,[0,0,.068],[.80,.80,.025],color,{...data,part:'face'});\r
      // An inset walnut border, paired with a warm bevel, reads as a wood plaque.\r
      for(const sign of [-1,1]){body(position,[sign*.37,0,.085],[.012,.72,.006],'#c89e67',{...data,part:'inlay'});body(position,[0,sign*.37,.085],[.72,.012,.006],'#c89e67',{...data,part:'inlay'});}\r
      if(isLegal)body(position,[0,-.285,.089],[.13,.024,.006],'#7c9a78',{...data,part:'legal'});\r
      const normal=offset([0,0,.091]);labels.push({x:position[0]+normal[0],y:position[1]+normal[1],z:position[2]+normal[2],text:String(value),color:'#765236',cube:!!numerals,sx:.65,sy:.65,sz:1,size:.52,fontFamily:'Georgia, serif',quaternion,data:{index}});\r
    }\r
    if(!showGoal){\r
      const blank=world(puzzleCoordinates(game.blank,dim));\r
      for(const sign of [-1,1]){body(blank,[sign*.36,0,0],[.025,.74,.025],'#8da892',{index:game.blank,empty:true},.65);body(blank,[0,sign*.36,0],[.74,.025,.025],'#8da892',{index:game.blank,empty:true},.65);}\r
      if(slide){const middle=slide.from.map((v,a)=>(v+slide.to[a])/2),axis=slide.from.findIndex((v,a)=>v!==slide.to[a]),size=[.025,.025,.025];size[axis]=pitch();voxels.push({x:middle[0],y:middle[1],z:middle[2],sx:size[0],sy:size[1],sz:size[2],color:'#dcab57',opacity:.22,slideGuide:true});}\r
    }\r
    ctx.setVoxels(voxels);if(numerals){numerals.set(labels);ctx.setLabels([]);}else ctx.setLabels(labels);\r
  }\r
  function render(){\r
    drawBoard();const dim=game.dimensions,blankPoint=puzzleCoordinates(game.blank,dim),legal=puzzleNeighbors(game.blank,dim);\r
    q('[data-position]').textContent='□ '+[blankPoint.x+1,blankPoint.y+1,blankPoint.z+1].join(' / ');q('[data-instructions]').textContent='Tile → Empty';\r
    q('[data-goal]').textContent=showGoal?'▦ ●':'▦';q('[data-goal]').setAttribute('aria-pressed',String(showGoal));\r
    const names={arrowup:'↑ Slide',arrowleft:'← Slide',arrowdown:'↓ Slide',arrowright:'Slide →'};\r
    q('[data-moves]').replaceChildren(...Object.keys(names).map(key=>{const el=button(names[key],()=>direction(key));el.setAttribute('data-direction',key);el.disabled=game.won||showGoal||!!slide;return el;}));\r
    q('[data-turns]').hidden=!isVolume();q('[data-turns]').replaceChildren(...[['up','W ↥'],['down','S ↧'],['left','A ↶'],['right','D ↷']].map(([turn,label])=>{const el=button(label,()=>{if(isVolume())ctx.spatial?.turn?.(turn);});el.setAttribute('data-turn',turn);return el;}));\r
    q('[data-neighbors]').replaceChildren(...legal.map(index=>{const el=button(String(game.board[index]),()=>act(()=>game.move(index)));el.setAttribute('data-index',String(index));el.disabled=game.won||showGoal||!!slide;return el;}));\r
    q('[data-undo]').disabled=!game.history.length||showGoal||!!slide;q('[data-hint]').disabled=game.won||showGoal||!!slide;status();\r
    if(game.won&&!slide)ctx.message('SOLVED · '+game.moves+' moves');\r
  }\r
  function act(action){\r
    if(showGoal||slide)return;\r
    const before=[...game.board];\r
    if(!action())return;\r
    const destination=game.board.findIndex((value,i)=>value&&before[i]!==value),value=game.board[destination],source=before.indexOf(value);\r
    slide={value,source,destination,from:world(puzzleCoordinates(source,game.dimensions)),to:world(puzzleCoordinates(destination,game.dimensions)),elapsed:0,duration:reducedMotion?.08:.34};\r
    hovered=null;selectedIndex=game.blank;ctx.sound?.(game.won?'win':'move');ctx.message('');render();follow();\r
  }\r
  function directionVector(key){if(isVolume()&&ctx.spatial?.vectorForKey)return ctx.spatial.vectorForKey(key);return {arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,0,-1],arrowdown:[0,0,1]}[key]??null;}\r
  function direction(key){const delta=directionVector(key);if(!delta)return;const axis=delta.findIndex(v=>v!==0);if(axis>=0)act(()=>game.moveAxis(['x','y','z'][axis],delta[axis]));}\r
  function hint(){act(()=>game.hint()>=0);}\r
  function start(){\r
    const dimensions=isVolume()?{...customDimensions}:{x:4,y:1,z:4};\r
    game=new NumpuzGame({dimensions,steps:Number(q('[data-level]').value)});showGoal=false;hovered=null;selectedIndex=game.blank;activeSlice=null;lastSecond=-1;slide=null;gimbal=null;\r
    plaqueQuaternion.fromArray(numpuzPlaqueQuaternion(isVolume()?{right:[1,0,0],up:[0,1,0],normal:[0,0,1]}:{right:[1,0,0],up:[0,0,-1],normal:[0,1,0]}));targetQuaternion.copy(plaqueQuaternion);buildRails();render();\r
    if(isVolume()&&ctx.spatial?.volume){const extents=['x','y','z'].map(a=>dimensions[a]*pitch()+.12);ctx.spatial.volume({target:[0,0,0],distance:Math.max(...extents)*2.05+2,size:extents});}\r
    else ctx.frame({target:[0,0,0],distance:12,position:[0,12,.001]});ctx.message('');\r
  }\r
  if(ctx.design?.shuffleSteps)q('[data-level]').value=String(ctx.design.shuffleSteps);
  mode.onchange=start;q('[data-level]').onchange=start;\r
  q('[data-goal]').onclick=()=>{slide=null;showGoal=!showGoal;render();};q('[data-undo]').onclick=()=>act(()=>game.undo());q('[data-hint]').onclick=hint;\r
  q('[data-restart]').onclick=()=>{game.restart();slide=null;showGoal=false;hovered=null;render();follow();ctx.message('');};q('[data-new]').onclick=start;\r
  ctx.setRules?.('<p>Slide any adjacent tile through the open rails into the empty cell. All six directions connect.</p><p>Match the UP / DOWN diagrams. Numbers run across X, then Z, then Y; the final corner stays empty. U undoes; H gives one solvable step.</p>');\r
  start();\r
  return {reset:start,\r
    onCameraChange(basis){if(!isVolume())return;targetQuaternion.fromArray(numpuzPlaqueQuaternion(basis));gimbal={from:plaqueQuaternion.clone(),elapsed:0};if(reducedMotion){plaqueQuaternion.copy(targetQuaternion);gimbal=null;}drawBoard();},\r
    onSlice(slice){activeSlice=slice;if(slice?.mode==='layer'&&slice.axis==='y')goalPair=Math.floor(slice.index/2);renderHud();},\r
    selectCell(data){if(validIndex(data?.index)){hovered=data.index;selectedIndex=data.index;drawBoard();}},\r
    getDimensions(){return {...game.dimensions};},setDimensions(dimensions){if(!validatePuzzleDimensions(dimensions)||dimensions.x*dimensions.y*dimensions.z>4096)throw new RangeError('XYZ must be positive integers; maximum 4096 cells.');customDimensions={...dimensions};goalPair=0;mode.value='volume';start();},\r
    getSelection(){return puzzleCoordinates(selectedIndex??game.blank,game.dimensions);},cellPosition(data){return validIndex(data?.index)?puzzleCoordinates(data.index,game.dimensions):null;},\r
    update(dt){\r
      game.tick(dt);let animated=false,finished=false;\r
      if(slide){slide.elapsed+=dt;animated=true;if(slide.elapsed>=slide.duration){slide=null;finished=true;}}\r
      if(gimbal){gimbal.elapsed+=dt;const t=Math.min(1,gimbal.elapsed/.22);plaqueQuaternion.slerpQuaternions(gimbal.from,targetQuaternion,t*t*(3-2*t));animated=true;if(t===1)gimbal=null;}\r
      if(finished)render();else if(animated)drawBoard();const second=Math.floor(game.elapsed);if(second!==lastSecond){lastSecond=second;status();}\r
    },\r
    onPick(data){if(validIndex(data?.index)){hovered=data.index;selectedIndex=data.index;act(()=>game.move(data.index));}},\r
    onHover(data){const next=validIndex(data?.index)?data.index:null;if(next===hovered)return;hovered=next;drawBoard();},\r
    onKey(key,event){key=key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown'].includes(key)){event?.preventDefault();direction(key);}else if(key==='u')act(()=>game.undo());else if(key==='h')hint();},\r
    getState(){return {...game.getState(),showGoal,volume:isVolume(),spatial:isVolume(),blankCoordinates:puzzleCoordinates(game.blank,game.dimensions),pitch:pitch(),worldBlank:world(puzzleCoordinates(game.blank,game.dimensions)),presentation:'connected-wood-rails',plaqueQuaternion:plaqueQuaternion.toArray(),animating:!!slide,slide:slide?{value:slide.value,source:slide.source,destination:slide.destination,from:[...slide.from],to:[...slide.to],progress:slide.elapsed/slide.duration}:null,goalPlanes:numpuzGoalPlanes(game.dimensions,goalPair)};},\r
    dispose(){numerals?.clear();numeralGeometry?.dispose();hud?.remove();ctx.ui.replaceChildren();}\r
  };\r
}\r
import {CubeLabels} from '../cube-labels.js';\r
import {Matrix4,Quaternion,Vector3} from 'three';\r
if(typeof window!=='undefined')import('../numpuz-v13.css');\r
`;export{e as default};
