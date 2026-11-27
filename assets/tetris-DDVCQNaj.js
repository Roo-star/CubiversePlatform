const e=`// Cubiverse authored adapter. External reference and adaptation notes: references/tetris.md.\r
// Classic rotation-layout data transcribed from Jake Gordon's MIT-licensed\r
// javascript-tetris. Copyright (c) 2011–2016 Jake Gordon and contributors.\r
// Full upstream copyright and permission notice: references/tetris.md.\r
export const TETROMINOES = {\r
  I: { color: '#20d6e8', cells: [[0,1],[1,1],[2,1],[3,1]], size: 4 },\r
  J: { color: '#4169ed', cells: [[0,0],[0,1],[1,1],[2,1]], size: 3 },\r
  L: { color: '#ff9f30', cells: [[2,0],[0,1],[1,1],[2,1]], size: 3 },\r
  O: { color: '#ffdb3b', cells: [[0,0],[1,0],[0,1],[1,1]], size: 2 },\r
  S: { color: '#61cf6c', cells: [[1,0],[2,0],[0,1],[1,1]], size: 3 },\r
  T: { color: '#b76cf1', cells: [[1,0],[0,1],[1,1],[2,1]], size: 3 },\r
  Z: { color: '#f15b6c', cells: [[0,0],[1,0],[1,1],[2,1]], size: 3 },\r
};\r
\r
export function rotatedCells(type, rotation = 0) {\r
  const shape = TETROMINOES[type];\r
  let cells = shape.cells.map(c => [...c]);\r
  if (type === 'O') return cells;\r
  for (let n = 0; n < ((rotation % 4) + 4) % 4; n++) cells = cells.map(([x,y]) => [shape.size - 1 - y, x]);\r
  return cells;\r
}\r
\r
const SOURCE_ROTATIONS={\r
  I:[0x0f00,0x2222,0x00f0,0x4444],J:[0x44c0,0x8e00,0x6440,0x0e20],\r
  L:[0x4460,0x0e80,0xc440,0x2e00],O:[0xcc00,0xcc00,0xcc00,0xcc00],\r
  S:[0x06c0,0x8c40,0x6c00,0x4620],T:[0x0e40,0x4c40,0x4e00,0x4640],Z:[0x0c60,0x4c80,0xc600,0x2640],\r
};\r
const SOURCE_COLORS={I:'#00ffff',J:'#0000ff',L:'#ffa500',O:'#ffff00',S:'#008000',T:'#800080',Z:'#ff0000'};\r
export function sourceRotatedCells(type,rotation=0){const mask=SOURCE_ROTATIONS[type][((rotation%4)+4)%4],cells=[];for(let i=0;i<16;i++)if(mask&(1<<(15-i)))cells.push([i%4,Math.floor(i/4)]);return cells;}\r
\r
// Spatial shapes use integer voxel coordinates, independent of the classic masks.\r
// Rotating about an axis and translating back into the positive octant preserves\r
// face connectivity while allowing a tetromino to stand through several Z cells.\r
export function normalizeVoxels(cells) {\r
  const min=[0,1,2].map(axis=>Math.min(...cells.map(c=>c[axis])));\r
  return cells.map(c=>c.map((v,i)=>v-min[i])).sort((a,b)=>a[2]-b[2]||a[1]-b[1]||a[0]-b[0]);\r
}\r
export function rotateVoxels(cells,axis='z',direction=1) {\r
  let result=cells.map(c=>[...c]);\r
  for(let i=0;i<((direction%4)+4)%4;i++)result=result.map(([x,y,z])=>axis==='x'?[x,-z,y]:axis==='y'?[z,y,-x]:[-y,x,z]);\r
  return normalizeVoxels(result);\r
}\r
\r
export function validateTetrisDimensions({x,y,z}) {\r
  const dimensions={x:Number(x),y:Number(y),z:Number(z)};\r
  if(Object.values(dimensions).some(n=>!Number.isSafeInteger(n)||n<1))throw new RangeError('X / Y / Z must be positive integers.');\r
  if(dimensions.x*dimensions.y*dimensions.z>32768)throw new RangeError('Maximum 32,768 cells. Reduce one axis.');\r
  return dimensions;\r
}\r
\r
export class TetrisEngine {\r
  constructor({ width = 6, height = 20, depth = 6, random = Math.random, rules = 'spatial-modern' } = {}) {\r
    this.rules=rules==='source-classic'?'source-classic':'spatial-modern';\r
    this.isSourceClassic=this.rules==='source-classic';\r
    const dimensions=this.isSourceClassic?{x:10,y:20,z:1}:validateTetrisDimensions({x:width,y:height,z:depth});\r
    this.width=dimensions.x;this.height=dimensions.y;this.depth=dimensions.z;\r
    this.random = random;\r
    this.reset();\r
  }\r
  reset() {\r
    this.board = Array.from({length:this.height}, () => Array.from({length:this.depth}, () => Array(this.width).fill(null)));\r
    this.bag = []; this.queue = []; this.queueSpawns=[]; this.score = 0; this.lines = 0; this.level = 1;\r
    this.gameOver = false; this.gravity = 0; this.lockTime = 0; this.holdType = null; this.canHold = true; this.lastClear = 0; this.lastClearCells=[]; this.lastClearWaves=0; this.lastClearScore=0;\r
    this.fillQueue(); this.spawn();\r
  }\r
  fillQueue() {\r
    if(this.isSourceClassic){\r
      while(this.queue.length<1){\r
        if(!this.bag.length)this.bag=Object.keys(TETROMINOES).flatMap(type=>Array(4).fill(type));\r
        // The source passes a float in [0, length-1) to Array.splice, which\r
        // truncates it. Preserve that sampling, including the final fixed slot.\r
        const index=Math.floor(this.random()*Math.max(0,this.bag.length-1));\r
        const type=this.bag.splice(index,1)[0];this.queue.push(type);\r
        this.queueSpawns.push(Math.round(this.random()*(this.width-TETROMINOES[type].size)));\r
      }\r
      return;\r
    }\r
    while (this.queue.length < 5) {\r
      if (!this.bag.length) {\r
        this.bag = Object.keys(TETROMINOES);\r
        for (let i=this.bag.length-1;i>0;i--) { const j=Math.floor(this.random()*(i+1)); [this.bag[i],this.bag[j]]=[this.bag[j],this.bag[i]]; }\r
      }\r
      this.queue.push(this.bag.pop());\r
    }\r
  }\r
  spawn(type = null) {\r
    const selected = type || this.queue.shift();\r
    const spawnX=this.isSourceClassic?(type?Math.round(this.random()*(this.width-TETROMINOES[selected].size)):this.queueSpawns.shift()):Math.floor((this.width-TETROMINOES[selected].size)/2);\r
    this.fillQueue();\r
    this.active = { type:selected, rotation:0, x:spawnX, y:0, z:Math.floor(this.depth/2) };\r
    if(!this.isSourceClassic) {\r
      this.active.voxels=normalizeVoxels(TETROMINOES[selected].cells.map(([x,y])=>[x,y,0]));\r
      this.active.x=Math.floor((this.width-Math.max(...this.active.voxels.map(c=>c[0]))-1)/2);\r
      this.active.z=Math.floor((this.depth-1)/2);\r
    }\r
    this.lockResets=0;this.everGrounded=false;this.groundAge=0;\r
    if(!this.isSourceClassic)this.gravity = 0; this.lockTime = 0;\r
    if (!this.fits(this.active)) this.gameOver = true;\r
  }\r
  shapeCells(type,rotation=0){return this.isSourceClassic?sourceRotatedCells(type,rotation):rotatedCells(type,rotation);}\r
  colorFor(type){return this.isSourceClassic?SOURCE_COLORS[type]:TETROMINOES[type].color;}\r
  localCells(piece=this.active) {return !this.isSourceClassic&&piece.voxels?piece.voxels:this.shapeCells(piece.type,piece.rotation).map(([x,y])=>[x,y,0]);}\r
  cells(piece = this.active) { return this.localCells(piece).map(([x,y,z]) => ({x:x+piece.x,y:y+piece.y,z:z+piece.z})); }\r
  fits(piece) {\r
    return this.cells(piece).every(({x,y,z}) => x>=0 && x<this.width && y>=0 && y<this.height && z>=0 && z<this.depth && !this.board[y][z][x]);\r
  }\r
  move(dx, dz = 0, dy = 0) {\r
    if (this.gameOver) return false;\r
    const next={...this.active,x:this.active.x+dx,y:this.active.y+dy,z:this.active.z+dz};\r
    if (!this.fits(next)) {if(this.isSourceClassic&&dy===1&&dx===0&&dz===0)this.lock();return false;}\r
    const wasGrounded=!this.fits({...this.active,y:this.active.y+1});\r
    this.active=next; this.resetLockDelay(wasGrounded);\r
    if (dy>0&&!this.isSourceClassic) this.score+=dy;\r
    return true;\r
  }\r
  resetLockDelay(wasGrounded) {\r
    if(this.isSourceClassic){this.lockTime=0;return;}\r
    if(wasGrounded){this.everGrounded=true;if(this.lockResets<15){this.lockResets++;this.lockTime=0;}}\r
    else if(!this.everGrounded)this.lockTime=0;\r
  }\r
  rotate(direction=1,axis='z') {\r
    if (this.gameOver) return false;\r
    if(this.isSourceClassic){if(direction!==1)return false;const next={...this.active,rotation:(this.active.rotation+1)%4};if(!this.fits(next))return false;this.active=next;return true;}\r
    if(!['x','y','z'].includes(axis))return false;\r
    const voxels=rotateVoxels(this.localCells(),axis,direction),rotation=(this.active.rotation+direction+4)%4;\r
    const wasGrounded=!this.fits({...this.active,y:this.active.y+1});\r
    const kicks=[[0,0,0],[-1,0,0],[1,0,0],[0,0,-1],[0,0,1],[-2,0,0],[2,0,0],[0,0,-2],[0,0,2],[-3,0,0],[3,0,0],[0,0,-3],[0,0,3],[0,-1,0],[0,-2,0],[0,-3,0]];\r
    for (const [dx,dy,dz] of kicks) {\r
      const next={...this.active,voxels,rotation,x:this.active.x+dx,y:this.active.y+dy,z:this.active.z+dz};\r
      if(this.fits(next)) { this.active=next; this.resetLockDelay(wasGrounded); return true; }\r
    }\r
    return false;\r
  }\r
  ghost() { const p={...this.active}; while(this.fits({...p,y:p.y+1})) p.y++; return p; }\r
  hardDrop() {\r
    if(this.gameOver||this.isSourceClassic) return 0;\r
    const landing=this.ghost(), distance=landing.y-this.active.y;\r
    this.score+=distance*2; this.active=landing; this.lock(); return distance;\r
  }\r
  hold() {\r
    if(this.gameOver || !this.canHold || this.isSourceClassic) return false;\r
    const type=this.active.type, previous=this.holdType; this.holdType=type;\r
    this.spawn(previous); this.canHold=false; return true;\r
  }\r
  clearPlanes() {\r
    // Retain the public method name for older adapters. Spatial clears now act\r
    // on individual horizontal X or Z lines, never on a vertical Y column.\r
    let count=0;this.lastClearCells=[];this.lastClearWaves=0;\r
    if(this.isSourceClassic){\r
      for(let y=this.height-1;y>=0;y--){\r
        if(this.board[y][0].every(Boolean)){this.board.splice(y,1);this.board.unshift([Array(this.width).fill(null)]);count++;y++;}\r
      }\r
    }else{\r
      for(;;){\r
        const removed=new Set();let lines=0;\r
        const mark=(x,y,z)=>removed.add(x+this.width*(z+this.depth*y));\r
        for(let y=0;y<this.height;y++){\r
          if(this.width>1||this.depth===1)for(let z=0;z<this.depth;z++)if(this.board[y][z].every(Boolean)){\r
            lines++;for(let x=0;x<this.width;x++)mark(x,y,z);\r
          }\r
          // A one-cell depth must not turn every occupied classic cell into a line.\r
          if(this.depth>1)for(let x=0;x<this.width;x++)if(this.board[y].every(lane=>Boolean(lane[x]))){\r
            lines++;for(let z=0;z<this.depth;z++)mark(x,y,z);\r
          }\r
        }\r
        if(!lines)break;\r
        count+=lines;this.lastClearWaves++;\r
        for(const index of removed){const x=index%this.width,z=Math.floor(index/this.width)%this.depth,y=Math.floor(index/(this.width*this.depth));this.lastClearCells.push({x,y,z});}\r
        // Each XZ column falls by its cleared cells. Unrelated air gaps retain\r
        // their shape, exactly matching classic row collapse when depth is one.\r
        for(let z=0;z<this.depth;z++)for(let x=0;x<this.width;x++){\r
          let destination=this.height-1;\r
          for(let y=this.height-1;y>=0;y--)if(!removed.has(x+this.width*(z+this.depth*y)))this.board[destination--][z][x]=this.board[y][z][x];\r
          while(destination>=0)this.board[destination--][z][x]=null;\r
        }\r
      }\r
    }\r
    this.lines+=count; this.level=1+Math.floor(this.lines/10);\r
    this.lastClearScore=this.isSourceClassic?(count>0?100*Math.pow(2,count-1):0):([0,100,300,500,800][Math.min(count,4)]+Math.max(0,count-4)*300)*this.level;\r
    this.score+=this.lastClearScore;\r
    this.lastClear=count; return count;\r
  }\r
  lock() {\r
    if(this.gameOver) return;\r
    if(this.isSourceClassic)this.score+=10;\r
    for(const {x,y,z} of this.cells()) this.board[y][z][x]=this.active.type;\r
    this.clearPlanes(); this.canHold=true; this.spawn();\r
  }\r
  update(dt) {\r
    if(this.gameOver) return false;\r
    this.gravity+=dt;\r
    let changed=false;\r
    const period=this.dropPeriod();\r
    while(this.gravity>=period) {\r
      this.gravity-=period;\r
      const next={...this.active,y:this.active.y+1};\r
      if(this.fits(next)) {this.active=next;if(this.lockResets<15)this.lockTime=0;changed=true;} else {if(this.isSourceClassic){this.lock();changed=true;}break;}\r
    }\r
    if(this.isSourceClassic)return changed;\r
    const grounded=!this.fits({...this.active,y:this.active.y+1});\r
    if(grounded)this.everGrounded=true;\r
    if(this.everGrounded)this.groundAge+=dt;\r
    // Fifteen manipulation resets, and eight seconds total after first contact.\r
    // The latter also bounds repeated up/down translations away from the floor.\r
    if(this.groundAge>=8){this.hardDrop();return true;}\r
    if(grounded) { this.lockTime+=dt; if(this.lockTime>=.42) {this.lock();changed=true;} }\r
    else if(this.lockResets<15)this.lockTime=0;\r
    return changed;\r
  }\r
  dropPeriod(){return this.isSourceClassic?Math.max(.1,.6-.005*this.lines):Math.max(.09,.8*Math.pow(.83,this.level-1));}\r
  snapshot() { return {rules:this.rules,width:this.width,height:this.height,depth:this.depth,score:this.score,lines:this.lines,level:this.level,gameOver:this.gameOver,lastClear:this.lastClear,lastClearCells:this.lastClearCells.map(c=>({...c})),lastClearWaves:this.lastClearWaves,lastClearScore:this.lastClearScore,active:{...this.active,...(this.active.voxels?{voxels:this.active.voxels.map(c=>[...c])}:{})},lockResets:this.lockResets,groundAge:this.groundAge,next:this.queue.slice(0,3),hold:this.holdType,board:this.board.map(row=>row.map(lane=>lane.slice()))}; }\r
}\r
\r
export function createGame(ctx) {\r
  let mode='spatial',dimensions={x:6,y:20,z:6},engine,lastFollow=null,inspection=null,clearNotice=0,clearText='';\r
  ctx.ui.innerHTML='<div class="control-group"><label>Mode <select data-mode><option value="spatial">3D</option><option value="classic">2D · Classic</option></select></label></div>'\r
    +'<div class="control-group"><div class="control-row"><button class="small-button" data-key="arrowup" aria-label="Move up">↑</button><button class="small-button" data-key="arrowleft" aria-label="Move left">←</button><button class="small-button" data-key="arrowdown" aria-label="Move down">↓</button><button class="small-button" data-key="arrowright" aria-label="Move right">→</button></div>'\r
    +'<div data-turns class="control-row"><button class="small-button" data-turn="left">A ↶</button><button class="small-button" data-turn="right">D ↷</button></div>'\r
    +'<div class="control-row" data-spatial-rotations><button class="small-button" data-action="rotate-x" title="Rotate X; Shift reverses">Q ↻X</button><button class="small-button" data-action="rotate-y" title="Rotate Y; Shift reverses">Z ↻Y</button><button class="small-button" data-action="rotate-z" title="Rotate Z; Shift reverses">C ↻Z</button></div><div class="control-row"><button class="small-button" data-classic-rotate data-action="classic-rotate">↑ / Z ↻</button><button class="primary-button" data-action="drop">Space ⤓</button><button class="small-button" data-action="hold">H ⇄</button><button class="small-button" data-action="reset" aria-label="Restart">↺</button></div></div>';\r
  const el=s=>ctx.ui.querySelector(s);\r
  const point=({x,y,z})=>[x-(engine.width-1)/2,(engine.height-1)/2-y,z-(engine.depth-1)/2];\r
  const logical=({x,y,z})=>({x,y:engine.height-1-y,z});\r
  function activeCenter(){const cells=engine.cells();return point({x:cells.reduce((sum,c)=>sum+c.x,0)/4,y:cells.reduce((sum,c)=>sum+c.y,0)/4,z:cells.reduce((sum,c)=>sum+c.z,0)/4});}\r
  function follow(){\r
    if(engine.isSourceClassic)return;\r
    const target=activeCenter(),key=target.join(',');if(key===lastFollow)return;\r
    lastFollow=key;ctx.spatial?.follow?.({target,weight:.3});\r
  }\r
  function preview(type){\r
    if(!type)return '<span style="opacity:.4">—</span>';\r
    const cells=engine.shapeCells(type);\r
    return '<span style="display:inline-grid;grid-template-columns:repeat(4,9px);grid-template-rows:repeat(4,9px);gap:2px;vertical-align:middle" aria-label="'+type+'">'+Array.from({length:16},(_,i)=>'<i style="border-radius:1px;background:'+(cells.some(([x,y])=>x===i%4&&y===Math.floor(i/4))?engine.colorFor(type):'transparent')+'"></i>').join('')+'</span>';\r
  }\r
  function draw(){\r
    const voxels=[],world=c=>{const [x,y,z]=point(c);return {x,y,z};};\r
    for(let y=0;y<engine.height;y++)for(let z=0;z<engine.depth;z++)for(let x=0;x<engine.width;x++){\r
      const type=engine.board[y][z][x];if(type)voxels.push({...world({x,y,z}),color:engine.colorFor(type),sx:.88,sy:.88,sz:.88,data:logical({x,y,z})});\r
    }\r
    if(!engine.gameOver){\r
      if(!engine.isSourceClassic)for(const cell of engine.cells(engine.ghost()))voxels.push({...world(cell),color:engine.colorFor(engine.active.type),sx:.94,sy:.94,sz:.94,opacity:.22,data:{...logical(cell),ghost:true}});\r
      for(const cell of engine.cells())voxels.push({...world(cell),color:engine.colorFor(engine.active.type),sx:.96,sy:.96,sz:.96,data:{...logical(cell),active:true}});\r
    }\r
    for(let z=0;z<engine.depth;z++)for(let x=0;x<engine.width;x++)voxels.push({...world({x,y:engine.height-.45,z}),color:(x+z)%2?'#2b4765':'#344e6a',sx:.93,sy:.06,sz:.93,data:{x,y:0,z,floor:true}});\r
    // An open well: four thin vertical rails and a rim provide depth without an enclosing cube cage.\r
    for(const x of [-.55,engine.width-.45])for(const z of [-.55,engine.depth-.45])voxels.push({...world({x,y:(engine.height-1)/2,z}),color:'#8ca6c1',sx:.025,sy:engine.height,sz:.025,opacity:.35});\r
    for(const z of [-.55,engine.depth-.45])voxels.push({...world({x:(engine.width-1)/2,y:engine.height-.5,z}),color:'#8ca6c1',sx:engine.width+.1,sy:.025,sz:.025,opacity:.35});\r
    for(const x of [-.55,engine.width-.45])voxels.push({...world({x,y:engine.height-.5,z:(engine.depth-1)/2}),color:'#8ca6c1',sx:.025,sy:.025,sz:engine.depth+.1,opacity:.35});\r
    ctx.setVoxels(voxels);ctx.setLabels([]);\r
    ctx.setStats({'Score':engine.score,'Lines':engine.lines,'Level':engine.level});\r
    if(ctx.hud)ctx.hud.innerHTML='<div class="arcade-scoreboard tetris-scoreboard" style="display:flex;gap:18px;align-items:flex-start;color:#e9f0f6;font-family:monospace;text-shadow:0 1px 3px #071320"><div><small>SCORE</small><strong style="display:block;font-size:24px">'+String(engine.score).padStart(6,'0')+'</strong><small>LEVEL '+String(engine.level).padStart(2,'0')+' · CLEAR '+engine.lines+'</small></div><div><small style="display:block;margin-bottom:5px">NEXT</small>'+engine.queue.slice(0,engine.isSourceClassic?1:3).map(preview).join(' ')+'</div>'+(engine.isSourceClassic?'':'<div><small style="display:block;margin-bottom:5px">HOLD</small>'+preview(engine.holdType)+'</div>')+'</div>';\r
    ctx.message(engine.gameOver?'GAME OVER · R ↺':clearNotice>0?clearText:'');\r
  }\r
  function reset(){\r
    engine=new TetrisEngine(mode==='classic'?{rules:'source-classic'}:{width:dimensions.x,height:dimensions.y,depth:dimensions.z});lastFollow=null;inspection=null;clearNotice=0;\r
    el('[data-turns]').hidden=engine.isSourceClassic;el('[data-spatial-rotations]').hidden=engine.isSourceClassic;el('[data-classic-rotate]').hidden=!engine.isSourceClassic;\r
    for(const action of ['drop','hold'])el('[data-action="'+action+'"]').hidden=engine.isSourceClassic;\r
    draw();\r
    if(engine.isSourceClassic)ctx.frame({target:[0,0,0],distance:33,position:[0,2,33]});\r
    else {const size=[dimensions.x,dimensions.y,dimensions.z],distance=Math.max(...size)*2.6+3;if(ctx.spatial?.volume)ctx.spatial.volume({target:[0,0,0],distance,size});else ctx.frame({target:[0,0,0],distance,position:[size[0]*1.6,size[1]*1.2,size[2]*1.8]});}\r
  }\r
  function direction(key){\r
    if(engine.isSourceClassic){if(key==='arrowleft')return engine.move(-1);if(key==='arrowright')return engine.move(1);if(key==='arrowdown')return engine.move(0,0,1);if(key==='arrowup')return engine.rotate();return false;}\r
    const delta=ctx.spatial?.vectorForKey(key)??{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,1,0],arrowdown:[0,-1,0]}[key];\r
    return delta?engine.move(delta[0],delta[2],-delta[1]):false;\r
  }\r
  function act(action,key=null,inverse=false){\r
    if(action==='reset'){reset();return;}\r
    inspection=null;\r
    const oldLines=engine.lines,oldOver=engine.gameOver;let changed=false;\r
    if(action==='direction')changed=direction(key);if(action==='classic-rotate')changed=engine.rotate();\r
    if(action.startsWith('rotate-')&&!engine.isSourceClassic)changed=engine.rotate(inverse?-1:1,action.at(-1));\r
    if(action==='drop'&&!engine.isSourceClassic&&!engine.gameOver){engine.hardDrop();changed=true;}\r
    if(action==='hold')changed=engine.hold();\r
    if(engine.lines>oldLines){clearNotice=1.4;clearText=engine.lastClear+' '+(engine.lastClear===1?'LINE':'LINES')+' · +'+engine.lastClearScore;ctx.sound?.('clear');}else if(!oldOver&&engine.gameOver)ctx.sound?.('error');else if(changed)ctx.sound?.('move');draw();if(changed)follow();\r
  }\r
  el('[data-mode]').addEventListener('change',e=>{mode=e.target.value;reset();});\r
  ctx.ui.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>act(b.dataset.action)));\r
  ctx.ui.querySelectorAll('[data-key]').forEach(b=>b.addEventListener('click',()=>act('direction',b.dataset.key)));\r
  ctx.ui.querySelectorAll('[data-turn]').forEach(b=>b.addEventListener('click',()=>ctx.spatial?.turn?.(b.dataset.turn)));\r
  ctx.setRules?.('<p>Fill a horizontal X or Z line to clear it. Y is gravity. Crossed lines clear together; blocks above fall.</p><p>Arrows move. Q / Z / C rotate, Shift reverses. Space drops, H holds. A / D turn the view. X slices; Z restores the whole view.</p><p>Reach 10 lines to level up. A blocked spawn ends the game. The 2D Classic option preserves its original row rules.</p>');\r
  reset();\r
  return {reset,update(dt){const oldLines=engine.lines,oldOver=engine.gameOver,hadNotice=clearNotice>0;clearNotice=Math.max(0,clearNotice-dt);if(engine.update(dt)){if(engine.lines>oldLines){clearNotice=1.4;clearText=engine.lastClear+' '+(engine.lastClear===1?'LINE':'LINES')+' · +'+engine.lastClearScore;ctx.sound?.('clear');}else if(!oldOver&&engine.gameOver)ctx.sound?.('error');draw();follow();}else if(hadNotice&&clearNotice===0)draw();},\r
    onKey(key,event){key=key.toLowerCase();const directionKey=['arrowleft','arrowright','arrowup','arrowdown'].includes(key);const action=directionKey?'direction':engine.isSourceClassic?{z:'classic-rotate'}[key]:{' ':'drop',h:'hold',q:'rotate-x',z:'rotate-y',c:'rotate-z'}[key];if(action){event?.preventDefault();if(event?.repeat&&!directionKey)return;act(action,key,event?.shiftKey);}},\r
    getDimensions(){return {x:engine.width,y:engine.height,z:engine.depth};},\r
    setDimensions(values){dimensions=validateTetrisDimensions(values);mode='spatial';el('[data-mode]').value=mode;reset();},\r
    getSelection(){return inspection??logical(engine.cells().find(c=>c.x>=0&&c.x<engine.width&&c.y>=0&&c.y<engine.height&&c.z>=0&&c.z<engine.depth)??{x:0,y:0,z:0});},\r
    selectCell(data){if(data&&['x','y','z'].every(k=>Number.isInteger(data[k]))){inspection={x:data.x,y:data.y,z:data.z};return true;}return false;},\r
    cellPosition(data){return data&&['x','y','z'].every(k=>Number.isInteger(data[k]))?{x:data.x,y:data.y,z:data.z}:null;},\r
    cameraTurns:['a','d'],\r
    getState(){return {mode,spatial:!engine.isSourceClassic,volume:!engine.isSourceClassic,worldActive:engine.cells().map(point),ghost:engine.cells(engine.ghost()),dimensions:{x:engine.width,y:engine.height,z:engine.depth},...engine.snapshot()};},dispose(){if(ctx.hud)ctx.hud.innerHTML='';}};\r
}\r
`;export{e as default};
