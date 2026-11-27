const e=`// Cubiverse authored adapter. Sources and explicit spatial rule changes: references/pacman.md.\r
import {pacmanInitialFrame,pacmanTurnFrame,pacmanTurnName,pacmanWallPanels,pacmanCameraCutaway,PACMAN_CHASE} from './pacman-navigation.js';\r
import {generateExplorerMaze,pacmanPath} from './pacman-maze-v13.js';\r
import {createPacmanPipes} from './pacman-pipes.js';\r
export const PACMAN_MAZE = [\r
  '############################',\r
  '#............##............#',\r
  '#.####.#####.##.#####.####.#',\r
  '#o####.#####.##.#####.####o#',\r
  '#.####.#####.##.#####.####.#',\r
  '#..........................#',\r
  '#.####.##.########.##.####.#',\r
  '#.####.##.########.##.####.#',\r
  '#......##....##....##......#',\r
  '######.##### ## #####.######',\r
  '######.##### ## #####.######',\r
  '######.##          ##.######',\r
  '######.## ###--### ##.######',\r
  '######.## #      # ##.######',\r
  '      .   #      #   .      ',\r
  '######.## #      # ##.######',\r
  '######.## ######## ##.######',\r
  '######.##          ##.######',\r
  '######.## ######## ##.######',\r
  '######.## ######## ##.######',\r
  '#............##............#',\r
  '#.####.#####.##.#####.####.#',\r
  '#.####.#####.##.#####.####.#',\r
  '#o..##.......  .......##..o#',\r
  '###.##.##.########.##.##.###',\r
  '###.##.##.########.##.##.###',\r
  '#......##....##....##......#',\r
  '#.##########.##.##########.#',\r
  '#.##########.##.##########.#',\r
  '#..........................#',\r
  '############################',\r
];\r
export const PACMAN_DIRECTIONS = [[0,-1],[-1,0],[0,1],[1,0]];\r
export const PACMAN_PORTALS = [{x:1,z:1},{x:26,z:29}];\r
const ghostColors=['#ff5262','#ff9ed6','#43dce5','#ffb46b'];\r
const ghostNames=['Blinky','Pinky','Inky','Clyde'];\r
const same=(a,b)=>a.x===b.x&&a.z===b.z&&a.y===b.y;\r
const key=p=>\`\${p.x},\${p.y},\${p.z}\`;\r
const copy=p=>({x:p.x,y:p.y,z:p.z});\r
\r
export class PacmanEngine {\r
  constructor({layers=2,random=Math.random}={}) {this.layers=Math.max(1,Math.min(3,layers));this.random=random;this.reset();}\r
  reset() {this.score=0;this.lives=3;this.level=1;this.extraLife=false;this.loadLevel();}\r
  loadLevel() {\r
    this.pellets=new Set();this.powerPills=new Set();\r
    for(let y=0;y<this.layers;y++) for(let z=0;z<31;z++) for(let x=0;x<28;x++) {\r
      if(PACMAN_MAZE[z][x]==='.') this.pellets.add(key({x,y,z}));\r
      if(PACMAN_MAZE[z][x]==='o') this.powerPills.add(key({x,y,z}));\r
    }\r
    this.initialPellets=this.pellets.size+this.powerPills.size;this.fruit=null;this.fruitTriggers=new Set();this.events=[];this.respawn();\r
  }\r
  respawn() {\r
    this.player={x:13,y:0,z:23,dir:1,wanted:1};this.previousPlayer=copy(this.player);\r
    this.ghosts=ghostNames.map((name,i)=>({name,color:ghostColors[i],x:[13,13,14,12][i],z:i===0?11:14,y:i===0?0:i%this.layers,dir:i%2?3:1,returning:false,release:i===0?0:1+i*1.6,previous:{x:[13,13,14,12][i],z:i===0?11:14,y:i===0?0:i%this.layers}}));\r
    this.status='ready';this.readyTime=1.25;this.frightened=0;this.ghostCombo=0;this.modeClock=0;this.mode='scatter';this.tickClock=0;this.tickCount=0;this.invulnerable=0;\r
  }\r
  passable(x,y,z,ghost=false) {\r
    if(y<0||y>=this.layers||x<0||x>=28||z<0||z>=31)return false;\r
    const c=PACMAN_MAZE[z][x];\r
    // The house is only open to ghosts. Its gate cannot be used as a player shortcut.\r
    return c!=='#' && (ghost || (c!=='-' && !(x>=11&&x<=16&&z>=13&&z<=15)));\r
  }\r
  neighbor(position,dir,ghost=false) {\r
    const [dx,dz]=PACMAN_DIRECTIONS[dir];let x=position.x+dx,z=position.z+dz;\r
    if(z===14) {if(x<0)x=27;if(x>27)x=0;}\r
    return this.passable(x,position.y,z,ghost)?{x,y:position.y,z,dir}:null;\r
  }\r
  isPortal(p) {return this.layers>1&&PACMAN_PORTALS.some(t=>t.x===p.x&&t.z===p.z);}\r
  neighbors(p,ghost=false) {\r
    const results=PACMAN_DIRECTIONS.map((_,d)=>this.neighbor(p,d,ghost)).filter(Boolean);\r
    if(this.isPortal(p))for(const dy of [-1,1])if(p.y+dy>=0&&p.y+dy<this.layers)results.push({x:p.x,y:p.y+dy,z:p.z,dir:p.dir??3,vertical:true});\r
    return results;\r
  }\r
  setDirection(dir) {if(dir>=0&&dir<4)this.player.wanted=dir;}\r
  changeLayer(delta) {\r
    if(!['ready','playing'].includes(this.status)||!this.isPortal(this.player)||this.player.y+delta<0||this.player.y+delta>=this.layers)return false;\r
    this.previousPlayer=copy(this.player);this.player.y+=delta;this.previousPlayer=copy(this.player);this.eat();this.checkCollision();this.events.push('portal');return true;\r
  }\r
  addScore(points) {this.score+=points;if(!this.extraLife&&this.score>=10000){this.lives++;this.extraLife=true;this.events.push('life');}}\r
  eat() {\r
    const id=key(this.player);\r
    if(this.pellets.delete(id)){this.addScore(10);this.events.push('pellet');}\r
    if(this.powerPills.delete(id)){\r
      this.addScore(50);this.frightened=Math.max(2,7-this.level*.4);this.ghostCombo=0;\r
      for(const g of this.ghosts)if(!g.returning)g.dir=(g.dir+2)%4;\r
      this.events.push('power');\r
    }\r
    const eaten=this.initialPellets-this.pellets.size-this.powerPills.size;\r
    for(const threshold of [70,170])if(eaten>=threshold*this.layers&&!this.fruitTriggers.has(threshold)){this.fruitTriggers.add(threshold);this.fruit={x:13,y:this.player.y,z:17,time:10,points:[100,300,500,700,1000][Math.min(4,this.level-1)]};}\r
    if(this.fruit&&same(this.fruit,this.player)){this.addScore(this.fruit.points);this.fruit=null;this.events.push('fruit');}\r
    if(this.pellets.size+this.powerPills.size===0){this.status='won';this.events.push('win');}\r
  }\r
  nextLevel() {if(this.status==='won'){this.level++;this.loadLevel();return true;}return false;}\r
  loseLife() {\r
    if(this.status!=='playing')return;\r
    this.lives--;this.events.push('death');\r
    if(this.lives<=0)this.status='gameover';else this.respawn();\r
  }\r
  checkCollision(previousPlayer=null) {\r
    if(this.status!=='playing'||this.invulnerable>0)return;\r
    for(const g of this.ghosts) {\r
      const crossed=previousPlayer&&g.previous&&same(g,previousPlayer)&&same(g.previous,this.player);\r
      if(!g.returning&&g.release<=0&&(same(g,this.player)||crossed)) {\r
        if(this.frightened>0) {g.returning=true;this.addScore(200*Math.pow(2,Math.min(this.ghostCombo++,3)));this.events.push('ghost');}\r
        else {this.loseLife();return;}\r
      }\r
    }\r
  }\r
  targetFor(g,index) {\r
    if(g.returning)return {x:13,y:g.y,z:14};\r
    if(g.release>0||(g.x>=11&&g.x<=16&&g.z>=12&&g.z<=15))return {x:13,y:g.y,z:11};\r
    const corners=[{x:26,z:1},{x:1,z:1},{x:26,z:29},{x:1,z:29}];\r
    if(this.mode==='scatter')return {...corners[index],y:g.y};\r
    const p=this.player,[dx,dz]=PACMAN_DIRECTIONS[p.dir];\r
    if(index===0)return copy(p);\r
    if(index===1)return {x:p.x+dx*4,y:p.y,z:p.z+dz*4};\r
    if(index===2){const red=this.ghosts[0];return {x:(p.x+dx*2)*2-red.x,y:p.y,z:(p.z+dz*2)*2-red.z};}\r
    return Math.hypot(g.x-p.x,g.z-p.z)>8?copy(p):{...corners[3],y:g.y};\r
  }\r
  moveGhost(g,index) {\r
    g.previous=copy(g);\r
    if(g.release>0)return;\r
    if(this.frightened>0&&!g.returning&&this.tickCount%2===0)return;\r
    let options=this.neighbors(g,true),target=this.targetFor(g,index);\r
    if(options.length>1) {const forward=options.filter(n=>n.vertical||n.dir!==(g.dir+2)%4);if(forward.length)options=forward;}\r
    if(!options.length)return;\r
    let selected;\r
    if(this.frightened>0&&!g.returning)selected=options[Math.floor(this.random()*options.length)];\r
    else {\r
      // A ghost on another floor pursues the nearest explicit portal first.\r
      if(target.y!==g.y) {\r
        if(this.isPortal(g)) {selected=options.find(n=>n.y===g.y+Math.sign(target.y-g.y));}\r
        const portal=PACMAN_PORTALS.slice().sort((a,b)=>Math.hypot(g.x-a.x,g.z-a.z)-Math.hypot(g.x-b.x,g.z-b.z))[0];\r
        target={...portal,y:g.y};\r
      }\r
      if(!selected)selected=options.reduce((best,n)=>{\r
        const cost=p=>Math.pow(p.x-target.x,2)+Math.pow(p.z-target.z,2)+Math.pow((p.y-target.y)*30,2);\r
        return cost(n)<cost(best)?n:best;\r
      });\r
    }\r
    Object.assign(g,selected);\r
    if(g.returning&&g.x===13&&g.z===14){g.returning=false;g.release=1.5;}\r
  }\r
  step() {\r
    if(this.status!=='playing')return;\r
    this.tickCount++;this.previousPlayer=copy(this.player);\r
    const intended=this.neighbor(this.player,this.player.wanted);\r
    const destination=intended||this.neighbor(this.player,this.player.dir);\r
    if(destination)Object.assign(this.player,destination);\r
    this.eat();if(this.status!=='playing')return;\r
    this.checkCollision();if(this.status!=='playing')return;\r
    for(let i=0;i<this.ghosts.length;i++)this.moveGhost(this.ghosts[i],i);\r
    this.checkCollision(this.previousPlayer);\r
  }\r
  update(dt) {\r
    if(this.status==='ready'){this.readyTime-=dt;if(this.readyTime<=0)this.status='playing';return false;}\r
    if(this.status!=='playing')return false;\r
    this.frightened=Math.max(0,this.frightened-dt);this.invulnerable=Math.max(0,this.invulnerable-dt);\r
    if(this.fruit){this.fruit.time-=dt;if(this.fruit.time<=0)this.fruit=null;}\r
    for(const g of this.ghosts)g.release=Math.max(0,g.release-dt);\r
    if(this.frightened<=0){const before=this.mode;this.modeClock+=dt;const t=this.modeClock%27;this.mode=t<7?'scatter':'chase';if(before!==this.mode)for(const g of this.ghosts)g.dir=(g.dir+2)%4;}\r
    this.tickClock+=dt;const period=Math.max(.105,.17-(this.level-1)*.009);let changed=false;\r
    while(this.tickClock>=period&&this.status==='playing'){this.tickClock-=period;this.step();changed=true;}\r
    return changed;\r
  }\r
  snapshot() {return {layers:this.layers,score:this.score,lives:this.lives,level:this.level,status:this.status,mode:this.mode,frightened:this.frightened,player:{...this.player},ghosts:this.ghosts.map(g=>({...g,previous:{...g.previous}})),remaining:this.pellets.size+this.powerPills.size,pellets:[...this.pellets],powerPills:[...this.powerPills],fruit:this.fruit?{...this.fruit}:null};}\r
}\r
\r
// The volume has its own graph: coordinates are actual X / Y / Z cells, Y positive up.\r
export const VOLUME_DIRECTIONS = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];\r
export const VOLUME_PLANES = {\r
  xy:{right:[1,0,0],up:[0,1,0],normal:[0,0,1],axis:'z'},\r
  xz:{right:[1,0,0],up:[0,0,-1],normal:[0,1,0],axis:'y'},\r
  yz:{right:[0,0,-1],up:[0,1,0],normal:[1,0,0],axis:'x'},\r
};\r
export function pacmanVectorForKey(input,plane='xy') {\r
  const basis=VOLUME_PLANES[plane]||VOLUME_PLANES.xy,k=input.toLowerCase();\r
  const source=k==='arrowright'?basis.right:k==='arrowleft'?basis.right.map(v=>-v):k==='arrowup'?basis.up:k==='arrowdown'?basis.up.map(v=>-v):null;\r
  return source?source.map(v=>v||0):null;\r
}\r
function directionIndex(vector) {return VOLUME_DIRECTIONS.findIndex(d=>d.every((v,i)=>v===vector[i]));}\r
const manhattan=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y)+Math.abs(a.z-b.z);\r
function seededRandom(seed) {let n=seed>>>0;return ()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}\r
export function validatePacmanDimensions(values=10) {\r
  const source=typeof values==='number'?{x:values,y:values,z:values}:values;\r
  const dimensions={x:Number(source.x),y:Number(source.y),z:Number(source.z)};\r
  if(Object.values(dimensions).some(n=>!Number.isSafeInteger(n)||n<1))throw new RangeError('X / Y / Z must be positive whole numbers.');\r
  if(dimensions.x*dimensions.y*dimensions.z>32768)throw new RangeError('Maximum volume: 32,768 cells. Reduce one axis.');\r
  return dimensions;\r
}\r
export function generateVolumeMaze(dimensions=10,seed=7463) {\r
  const d=validatePacmanDimensions(dimensions),random=seededRandom(seed),cells=new Set(),rooms=[];\r
  const low={},high={},middle={};\r
  for(const axis of ['x','y','z']){\r
    low[axis]=d[axis]>3?1:0;high[axis]=d[axis]>3?d[axis]-2:d[axis]-1;\r
    const span=high[axis]-low[axis];middle[axis]=low[axis]+Math.round(span*(.4+random()*.2));\r
  }\r
  const line=(a,b)=>{const axis=['x','y','z'].find(k=>a[k]!==b[k]);if(!axis){cells.add(key(a));return;}const sign=Math.sign(b[axis]-a[axis]);for(let value=a[axis];value!==b[axis]+sign;value+=sign)cells.add(key({...a,[axis]:value}));};\r
  // Three broad, intersecting circuits and a six-way central junction.\r
  // Each circuit occupies a different principal plane; no stacked copies.\r
  for(const fixed of ['x','y','z']){\r
    const [a,b]=['x','y','z'].filter(k=>k!==fixed),corners=[[low[a],low[b]],[high[a],low[b]],[high[a],high[b]],[low[a],high[b]]].map(([av,bv])=>({[a]:av,[b]:bv,[fixed]:middle[fixed]}));\r
    for(let i=0;i<4;i++)line(corners[i],corners[(i+1)%4]);\r
  }\r
  for(const axis of ['x','y','z'])line({...middle,[axis]:low[axis]},{...middle,[axis]:high[axis]});\r
  for(const id of cells){const [x,y,z]=id.split(',').map(Number);rooms.push({x,y,z});}\r
  const start={x:middle.x,y:middle.y,z:high.z};\r
  return {size:d.x,dimensions:d,cells,rooms,start,low,high,middle,seed};\r
}\r
\r
export class VolumePacmanEngine {\r
  constructor({size=10,dimensions=null,width,height,depth,seed=7463,random=Math.random,firstPerson=false,variant=null}={}) {\r
    this.dimensions=validatePacmanDimensions(dimensions??{x:width??size,y:height??size,z:depth??size});\r
    this.size=this.dimensions.x;this.seed=seed;this.random=random;this.variant=variant;this.firstPerson=firstPerson||variant==='a';this.reset();\r
  }\r
  reset(){this.score=0;this.lives=3;this.level=1;this.extraLife=false;this.loadLevel();}\r
  loadLevel() {\r
    this.maze=(this.variant==='b'?generateExplorerMaze:generateVolumeMaze)(this.dimensions,this.seed+this.level*397);this.cells=this.maze.cells;\r
    this.start={...this.maze.start};\r
    const distant=this.maze.rooms.filter(p=>manhattan(p,this.start)>=Math.min(3,Math.max(...Object.values(this.dimensions))-1)).sort((a,b)=>manhattan(b,this.start)-manhattan(a,this.start));\r
    this.homes=[];\r
    if(this.cells.size>=12)for(const p of distant){if(this.homes.every(home=>manhattan(p,home)>=3))this.homes.push(copy(p));if(this.homes.length===4)break;}\r
    this.pellets=new Set([...this.cells].filter(id=>{const [x,y,z]=id.split(',').map(Number);return (x+y+z)%2===0;}));this.pellets.delete(key(this.start));\r
    this.powerPills=new Set(this.homes.map(key));for(const id of this.powerPills)this.pellets.delete(id);\r
    if(!this.pellets.size&&!this.powerPills.size&&this.cells.size>1)this.pellets.add([...this.cells].find(id=>id!==key(this.start)));\r
    this.initialPellets=this.pellets.size+this.powerPills.size;this.fruit=null;this.fruitTriggers=new Set();this.events=[];this.respawn();\r
  }\r
  respawn() {\r
    const first=this.neighbors(this.start).find(n=>n.dir===1)?.dir??this.neighbors(this.start)[0]?.dir??0;\r
    this.player={...this.start,dir:first,wanted:first};this.previousPlayer=copy(this.player);\r
    this.heading=pacmanInitialFrame(VOLUME_DIRECTIONS[first]);this.pendingTurns=[];this.route=[];this.routeTarget=null;this.pendingTarget=null;this.crossingTime=0;\r
    this.ghosts=this.homes.map((home,i)=>({...home,name:ghostNames[i],color:ghostColors[i],dir:1,returning:false,release:3+i*2,previous:copy(home)}));\r
    this.status=this.initialPellets?'ready':'won';this.readyTime=1.25;this.frightened=0;this.ghostCombo=0;this.modeClock=0;this.mode='scatter';this.tickClock=0;this.tickCount=0;this.invulnerable=0;\r
  }\r
  passable(x,y,z){return this.cells.has(key({x,y,z}));}\r
  neighbor(p,dir) {\r
    if(!Number.isInteger(dir)||!VOLUME_DIRECTIONS[dir])return null;\r
    const [dx,dy,dz]=VOLUME_DIRECTIONS[dir],q={x:p.x+dx,y:p.y+dy,z:p.z+dz,dir};\r
    return this.passable(q.x,q.y,q.z)?q:null;\r
  }\r
  neighbors(p){return VOLUME_DIRECTIONS.map((_,dir)=>this.neighbor(p,dir)).filter(Boolean);}\r
  setDirection(dir){if(Number.isInteger(dir)&&dir>=0&&dir<6)this.player.wanted=dir;}\r
  setVector(vector){const dir=directionIndex(vector);if(dir<0)return false;this.setDirection(dir);return true;}\r
  turn(input){\r
    const name=pacmanTurnName(input);\r
    if(!name||!['ready','playing'].includes(this.status))return false;\r
    // A moving player reaches the next cell centre before changing direction.\r
    // This keeps every camera segment on a real edge, even with rapid input.\r
    if(this.status==='playing'&&this.tickClock>1e-8&&this.neighbor(this.player,this.player.dir)){\r
      if(this.pendingTurns.length>=4)return false;\r
      this.pendingTurns.push(name);\r
    }else{\r
      this.applyTurn(name);this.tickClock=0;\r
    }\r
    return true;\r
  }\r
  applyTurn(input){\r
    const pitch=['up','down'].includes(pacmanTurnName(input));\r
    this.heading=pacmanTurnFrame(this.heading,input);\r
    this.player.dir=this.player.wanted=directionIndex(this.heading.forward);\r
    // Cinematic widening is reserved for a real change of movement plane.\r
    if(this.variant==='a'&&pitch&&this.neighbor(this.player,this.player.dir))this.crossingTime=1.35;\r
  }\r
  setTarget(target){\r
    if(this.variant!=='b'||!['ready','playing'].includes(this.status)||!this.passable(target.x,target.y,target.z))return false;\r
    const inFlight=this.status==='playing'&&this.tickClock>1e-8?this.neighbor(this.player,this.player.dir):null;\r
    const route=pacmanPath(this.cells,inFlight??this.player,target);if(!route)return false;\r
    this.routeTarget=copy(target);\r
    if(inFlight)this.pendingTarget=copy(target);\r
    else {this.route=route;this.pendingTarget=null;this.aimRoute();}\r
    return true;\r
  }\r
  aimRoute(){\r
    while(this.route.length&&same(this.route[0],this.player))this.route.shift();\r
    const next=this.route[0];if(!next)return;\r
    const vector=[next.x-this.player.x,next.y-this.player.y,next.z-this.player.z];\r
    const dir=directionIndex(vector);if(dir>=0){this.player.dir=this.player.wanted=dir;this.heading=pacmanInitialFrame(vector);}\r
  }\r
  playerPose(){\r
    if(!this.firstPerson&&this.variant!=='b')return copy(this.player);\r
    const next=this.status==='playing'?this.neighbor(this.player,this.player.dir):null;\r
    const alpha=next?Math.min(1,this.tickClock/this.period):0;\r
    return {x:this.player.x+(next?next.x-this.player.x:0)*alpha,y:this.player.y+(next?next.y-this.player.y:0)*alpha,z:this.player.z+(next?next.z-this.player.z:0)*alpha};\r
  }\r
  addScore(points){this.score+=points;if(!this.extraLife&&this.score>=10000){this.lives++;this.extraLife=true;this.events.push('life');}}\r
  eat() {\r
    const id=key(this.player);\r
    if(this.pellets.delete(id)){this.addScore(10);this.events.push('pellet');}\r
    if(this.powerPills.delete(id)){this.addScore(50);this.frightened=Math.max(2,7-this.level*.4);this.ghostCombo=0;for(const g of this.ghosts)if(!g.returning)g.dir^=1;this.events.push('power');}\r
    const count=this.initialPellets-this.pellets.size-this.powerPills.size;\r
    for(const portion of [.3,.7])if(count>=Math.floor(this.initialPellets*portion)&&!this.fruitTriggers.has(portion)){this.fruitTriggers.add(portion);const room=this.maze.rooms[Math.floor(this.maze.rooms.length/2)];this.fruit={...room,time:12,points:100*this.level};}\r
    if(this.fruit&&same(this.player,this.fruit)){this.addScore(this.fruit.points);this.fruit=null;this.events.push('fruit');}\r
    if(!this.pellets.size&&!this.powerPills.size){this.status='won';this.events.push('win');}\r
  }\r
  nextLevel(){if(this.status!=='won')return false;this.level++;this.loadLevel();return true;}\r
  loseLife(){if(this.status!=='playing')return;this.lives--;this.events.push('death');if(this.lives<=0)this.status='gameover';else this.respawn();}\r
  checkCollision(previousPlayer=null){\r
    if(this.status!=='playing'||this.invulnerable>0)return;\r
    for(const g of this.ghosts){const crossed=previousPlayer&&g.previous&&same(g,previousPlayer)&&same(g.previous,this.player);if(!g.returning&&g.release<=0&&(same(g,this.player)||crossed)){if(this.frightened>0){g.returning=true;this.addScore(200*2**Math.min(this.ghostCombo++,3));this.events.push('ghost');}else{this.loseLife();return;}}}\r
  }\r
  targetFor(g,index) {\r
    if(g.returning)return this.homes[index];\r
    if(this.mode==='scatter')return this.homes[(index+1)%this.homes.length];\r
    const p=this.player,[dx,dy,dz]=VOLUME_DIRECTIONS[p.dir];\r
    if(index===0)return copy(p);\r
    if(index===1)return {x:p.x+dx*3,y:p.y+dy*3,z:p.z+dz*3};\r
    if(index===2){const red=this.ghosts[0];return {x:(p.x+dx*2)*2-red.x,y:(p.y+dy*2)*2-red.y,z:(p.z+dz*2)*2-red.z};}\r
    return manhattan(g,p)>5?copy(p):this.homes[index];\r
  }\r
  distancesTo(target) {\r
    let closest=null,best=Infinity;\r
    for(const id of this.cells){const [x,y,z]=id.split(',').map(Number),p={x,y,z},distance=manhattan(p,target);if(distance<best){best=distance;closest=p;if(!distance)break;}}\r
    const distances=new Map([[key(closest),0]]),queue=[closest];\r
    for(let i=0;i<queue.length;i++)for(const n of this.neighbors(queue[i]))if(!distances.has(key(n))){distances.set(key(n),distances.get(key(queue[i]))+1);queue.push(n);}\r
    return distances;\r
  }\r
  moveGhost(g,index) {\r
    g.previous=copy(g);if(g.release>0||(this.frightened>0&&!g.returning&&this.tickCount%2===0))return;\r
    let options=this.neighbors(g);if(options.length>1&&!g.returning){const noReverse=options.filter(n=>n.dir!==(g.dir^1));if(noReverse.length)options=noReverse;}\r
    if(!options.length)return;\r
    let chosen;if(this.frightened>0&&!g.returning)chosen=options[Math.floor(this.random()*options.length)];\r
    else {const distances=this.distancesTo(this.targetFor(g,index));chosen=options.reduce((a,b)=>(distances.get(key(b))??Infinity)<(distances.get(key(a))??Infinity)?b:a);}\r
    Object.assign(g,chosen);if(g.returning&&same(g,this.homes[index])){g.returning=false;g.release=1.5;}\r
  }\r
  step() {\r
    if(this.status!=='playing')return;\r
    this.tickCount++;this.previousPlayer=copy(this.player);const destination=this.firstPerson||this.variant==='b'?this.neighbor(this.player,this.player.dir):(this.neighbor(this.player,this.player.wanted)||this.neighbor(this.player,this.player.dir));if(destination)Object.assign(this.player,destination);\r
    if(this.variant==='b'){\r
      if(this.pendingTarget){this.route=pacmanPath(this.cells,this.player,this.pendingTarget)??[];this.pendingTarget=null;}\r
      this.aimRoute();if(this.routeTarget&&same(this.routeTarget,this.player)){this.routeTarget=null;this.route=[];}\r
    }\r
    this.eat();if(this.status!=='playing')return;this.checkCollision();if(this.status!=='playing')return;\r
    this.ghosts.forEach((g,i)=>this.moveGhost(g,i));this.checkCollision(this.previousPlayer);\r
    if(this.status==='playing')for(const turn of this.pendingTurns.splice(0))this.applyTurn(turn);\r
  }\r
  get period(){return this.variant==='a'?Math.max(.32,.46-(this.level-1)*.012):Math.max(.15,.24-(this.level-1)*.012);}\r
  get transition(){return Math.sin(Math.PI*Math.max(0,Math.min(1,this.crossingTime/1.35)));}\r
  get simulationSpeed(){return this.variant==='a'?1-.4*this.transition:1;}\r
  update(dt) {\r
    if(this.status==='ready'){this.readyTime-=dt;if(this.readyTime<=0)this.status='playing';return false;}\r
    if(this.status!=='playing')return false;\r
    const speed=this.simulationSpeed;this.crossingTime=Math.max(0,this.crossingTime-dt);dt*=speed;\r
    this.frightened=Math.max(0,this.frightened-dt);this.invulnerable=Math.max(0,this.invulnerable-dt);if(this.fruit){this.fruit.time-=dt;if(this.fruit.time<=0)this.fruit=null;}\r
    for(const g of this.ghosts)g.release=Math.max(0,g.release-dt);\r
    if(!this.frightened){const before=this.mode;this.modeClock+=dt;this.mode=this.modeClock%27<7?'scatter':'chase';if(before!==this.mode)for(const g of this.ghosts)g.dir^=1;}\r
    this.tickClock+=dt;let changed=false;while(this.tickClock>=this.period&&this.status==='playing'){this.tickClock-=this.period;this.step();changed=true;}return changed;\r
  }\r
  snapshot(){return {size:this.size,dimensions:[this.dimensions.x,this.dimensions.y,this.dimensions.z],score:this.score,lives:this.lives,level:this.level,status:this.status,mode:this.mode,frightened:this.frightened,player:{...this.player},pose:this.playerPose(),heading:{forward:[...this.heading.forward],up:[...this.heading.up],right:[...this.heading.right]},pendingTurns:[...this.pendingTurns],variant:this.variant,route:this.route.map(copy),routeTarget:this.routeTarget?copy(this.routeTarget):null,transition:this.transition,simulationSpeed:this.simulationSpeed,period:this.period,blocked:!this.neighbor(this.player,this.player.dir),ghosts:this.ghosts.map(g=>({...g,previous:{...g.previous}})),remaining:this.pellets.size+this.powerPills.size,pellets:[...this.pellets],powerPills:[...this.powerPills],cells:[...this.cells],fruit:this.fruit?{...this.fruit}:null};}\r
}\r
\r
export function createGame(ctx) {\r
  const THREE=ctx.THREE,world=new THREE.Group(),geometries=new Set(),materials=new Set(),levelMeshes=[],pelletMeshes=new Map();world.name='pacman-world';ctx.group.add(world);\r
  let mode='spatial',dimensions={x:10,y:10,z:10},engine,clock=0,disposed=false,lastMetrics='',lastMessage='',lastPelletCount=-1,viewMode='chase',inspection=null,variant='a',lastArchitecture='',lastDt=1/60,wallPanels=[],pipes=null,started=false,viewUp=[0,1,0],roundDetails=null;\r
  const geo=g=>(geometries.add(g),g),mat=opts=>{const m=new THREE.MeshStandardMaterial(opts);materials.add(m);return m;};\r
  const box=geo(new THREE.BoxGeometry(1,1,1)),dot=geo(new THREE.SphereGeometry(.12,8,6)),power=geo(new THREE.SphereGeometry(.23,12,8));\r
  const yellow=mat({color:'#ffdf39',emissive:'#a16c00',emissiveIntensity:.28,roughness:.5}),white=mat({color:'#fff7e9',roughness:.5}),pupil=mat({color:'#172765'}),blue=mat({color:'#225be4',emissive:'#1948dd',emissiveIntensity:.32,roughness:.55}),cream=mat({color:'#ffe9c2',emissive:'#bd8955',emissiveIntensity:.32}),fright=mat({color:'#294cdd',emissive:'#16309c',emissiveIntensity:.3});\r
  const temp=new THREE.Object3D(),directionVector=new THREE.Vector3(),localRight=new THREE.Vector3(1,0,0);\r
  const playerMesh=new THREE.Group();playerMesh.name='pacman-player';\r
  const mouth=new THREE.Mesh(geo(new THREE.SphereGeometry(.39,20,14,Math.PI+.34,Math.PI*2-.68)),yellow);mouth.rotation.x=Math.PI/2;playerMesh.add(mouth);\r
  const eye=new THREE.Mesh(geo(new THREE.SphereGeometry(.046,8,6)),pupil);eye.position.set(.08,.23,.25);playerMesh.add(eye);world.add(playerMesh);\r
  const ghosts=ghostColors.map((color,index)=>{\r
    const root=new THREE.Group(),colorMat=mat({color,emissive:color,emissiveIntensity:.15,roughness:.5}),body=[];root.name=\`pacman-ghost-\${index}\`;\r
    const cap=new THREE.Mesh(geo(new THREE.SphereGeometry(.35,14,9,0,Math.PI*2,0,Math.PI/2)),colorMat);cap.position.y=.12;root.add(cap);body.push(cap);\r
    const skirt=new THREE.Mesh(geo(new THREE.CylinderGeometry(.35,.35,.36,14,1,true)),colorMat);skirt.position.y=-.06;root.add(skirt);body.push(skirt);\r
    for(let i=0;i<5;i++){const foot=new THREE.Mesh(geo(new THREE.SphereGeometry(.09,8,5)),colorMat);foot.position.set((i-2)*.14,-.25,.03);root.add(foot);body.push(foot);}\r
    for(const x of [-.14,.14]){const eyeball=new THREE.Mesh(geo(new THREE.SphereGeometry(.1,10,7)),white);eyeball.scale.set(1,1.25,.6);eyeball.position.set(x,.14,.32);root.add(eyeball);const iris=new THREE.Mesh(geo(new THREE.SphereGeometry(.046,8,6)),pupil);iris.position.set(x,.14,.38);root.add(iris);}\r
    world.add(root);return {root,colorMat,body};\r
  });\r
  const fruit=new THREE.Mesh(geo(new THREE.SphereGeometry(.21,10,7)),mat({color:'#ee395b',emissive:'#a92342',emissiveIntensity:.15,roughness:.3}));fruit.name='pacman-fruit';world.add(fruit);\r
  const targetMarker=new THREE.Mesh(geo(new THREE.OctahedronGeometry(.52)),mat({color:'#ffeb7c',emissive:'#ffce4a',emissiveIntensity:.6,wireframe:true,depthTest:false}));targetMarker.name='pacman-target';targetMarker.renderOrder=90;targetMarker.visible=false;world.add(targetMarker);\r
  const routeGeometry=geo(new THREE.BufferGeometry()),routeMaterial=new THREE.LineBasicMaterial({color:'#ffe17b',transparent:true,opacity:.85,depthTest:false});materials.add(routeMaterial);\r
  const routeMesh=new THREE.Line(routeGeometry,routeMaterial);routeMesh.name='pacman-route-preview';routeMesh.renderOrder=80;world.add(routeMesh);let lastRoute='';\r
  const headlight=new THREE.PointLight('#fff1ce',8,8,1.5);headlight.name='pacman-headlight';world.add(headlight);\r
  const rimLight=new THREE.PointLight('#76d9c6',2.3,7,1.7);rimLight.name='pacman-route-light';world.add(rimLight);\r
  const studGeometry=geo(new THREE.SphereGeometry(.04,8,5)),studMaterial=mat({color:'#9ce7d4',emissive:'#4dba9c',emissiveIntensity:.65,roughness:.35});\r
  const toWorld=p=>mode==='spatial'?[p.x-(dimensions.x-1)/2,p.y-(dimensions.y-1)/2,p.z-(dimensions.z-1)/2]:[p.x-13.5,15-p.z,.08];\r
  const setPosition=(mesh,p)=>{mesh.position.set(...toWorld(p));mesh.userData.pickData=copy(p);},el=s=>ctx.ui.querySelector(s);\r
  ctx.ui.innerHTML='<div class="control-group"><label>Play style <select data-mode><option value="spatial">A · Chase</option><option value="explorer">B · Click & Go</option><option value="classic">2D · Classic</option></select></label></div><div class="control-group"><div data-direction-controls class="control-row"><button class="small-button" data-key="arrowup" title="Pitch up · W">↑</button><button class="small-button" data-key="arrowleft" title="Turn left · A">←</button><button class="small-button" data-key="arrowdown" title="Pitch down · S">↓</button><button class="small-button" data-key="arrowright" title="Turn right · D">→</button></div><div data-view-controls class="control-row"><button class="small-button" data-pilot title="Follow player" aria-label="Follow player">◉</button><button class="small-button" data-overview title="Overview" aria-label="Overview">◎</button></div><div class="control-row"><button class="primary-button" data-next disabled aria-label="Next level">▶▶</button><button class="small-button" data-reset aria-label="Restart">↺</button></div></div>';\r
  function disposeLevel(){if(pipes){world.remove(pipes.group);pipes.dispose();pipes=null;}roundDetails=null;for(const mesh of levelMeshes){world.remove(mesh);if(mesh.isInstancedMesh)mesh.dispose();if(mesh.userData.ownGeometry){geometries.delete(mesh.geometry);mesh.geometry.dispose();}if(mesh.isLineSegments){materials.delete(mesh.material);mesh.material.dispose();}}levelMeshes.length=0;pelletMeshes.clear();}\r
  function addLevelMesh(mesh,name){mesh.name=name;world.add(mesh);levelMeshes.push(mesh);return mesh;}\r
  function followPlayer(){\r
    if(mode!=='spatial'||variant!=='a'||viewMode!=='chase')return;\r
    const position=toWorld(engine.playerPose()),{forward,up}=engine.heading,transition=engine.transition;\r
    headlight.position.set(...position);\r
    rimLight.position.set(...position.map((n,i)=>n+forward[i]*2.8+up[i]*.22));\r
    if(ctx.spatial?.chase)ctx.spatial.chase({position,forward:[...forward],up:[...up],dt:lastDt,transition,distance:PACMAN_CHASE.distance+PACMAN_CHASE.pullback*transition,height:PACMAN_CHASE.height+PACMAN_CHASE.lift*transition,side:PACMAN_CHASE.side*transition,fov:PACMAN_CHASE.fov+4*transition,near:.06});\r
    else ctx.frame({target:position.map((n,i)=>n+forward[i]*.65),up:[...up],position:position.map((n,i)=>n-forward[i]*PACMAN_CHASE.distance+up[i]*PACMAN_CHASE.height)});\r
  }\r
  function initialiseCamera(){\r
    if(mode==='spatial'){\r
      if(variant==='a'){viewMode='chase';followPlayer();}\r
      else {viewMode='overview';ctx.spatial?.overview?.({target:[0,0,0],distance:Math.max(...Object.values(dimensions))*1.55});}\r
    }else if(ctx.spatial?.focus)ctx.spatial.focus({plane:'xy',target:[0,0,0],distance:48,animate:false});else ctx.frame({target:[0,0,0],distance:48,position:[0,0,48]});\r
  }\r
  function onView(view='overview'){\r
    if(mode!=='spatial'){ctx.spatial?.focus?.({plane:'xy',target:[0,0,0],distance:48,animate:false});return;}\r
    viewMode=variant==='a'&&['first-person','pilot','play','chase'].includes(view)?'chase':'overview';\r
    if(viewMode==='chase'){inspection=null;followPlayer();}\r
    lastArchitecture='';draw(true);\r
  }\r
  function updateArchitecture(force=false){\r
    if(mode!=='spatial')return;\r
    const architecture=variant==='b'?'b':\`\${viewMode}:\${key(engine.player)}:\${engine.heading.forward}:\${engine.heading.up}\`;\r
    if(!force&&architecture===lastArchitecture)return;lastArchitecture=architecture;\r
    const voxels=[],studs=[];\r
    if(variant==='b'){\r
      // The maze's entire visual and pick surface is the round pipe network.\r
      // There are no hidden rectangular route cubes underneath it.\r
    }else{\r
      const player=engine.player,{forward,up}=engine.heading;\r
      for(const panel of wallPanels){\r
        const delta=panel.position.map((n,i)=>n-[player.x,player.y,player.z][i]),near=Math.hypot(...delta)<6.7;\r
        const facing=panel.normal.reduce((sum,n,i)=>sum+n*(-forward[i]*.85+up[i]),0);\r
        // An opaque dollhouse cutaway opens only the camera side of the local\r
        // corridor. Remaining wall panels and the road itself stay solid.\r
        if(viewMode==='chase'&&near&&(facing>.12||pacmanCameraCutaway(panel,player,engine.heading)))continue;\r
        const p=panel.position,w=toWorld({x:p[0],y:p[1],z:p[2]}),[sx,sy,sz]=panel.scale;\r
        const palette={wall:'#183b4b',floor:'#163044',ceiling:'#102535'};\r
        voxels.push({x:w[0],y:w[1],z:w[2],sx,sy,sz,color:palette[panel.surface],opacity:1,data:{...panel.cell,surface:panel.surface,normal:panel.normal}});\r
        const trimPosition=w.map((n,i)=>n-panel.normal[i]*.046),trimScale=[...panel.scale],axis=['x','y','z'].indexOf(panel.axis);\r
        trimScale[axis]=.014;for(let i=0;i<3;i++)if(i!==axis)trimScale[i]=.81;\r
        if(panel.surface==='wall'){\r
          const insetScale=[...trimScale];insetScale[1]=.55;\r
          voxels.push({x:trimPosition[0],y:trimPosition[1]+.035,z:trimPosition[2],sx:insetScale[0],sy:insetScale[1],sz:insetScale[2],color:'#285e67',opacity:1,data:{...panel.cell,surface:'wall-inset'}});\r
          trimPosition[1]-=.32;trimScale[1]=.028;voxels.push({x:trimPosition[0],y:trimPosition[1],z:trimPosition[2],sx:trimScale[0],sy:trimScale[1],sz:trimScale[2],color:'#ffd184',opacity:1,data:{...panel.cell,surface:'sill'}});\r
        }else if(panel.surface==='floor'){\r
          voxels.push({x:trimPosition[0],y:trimPosition[1],z:trimPosition[2],sx:trimScale[0],sy:trimScale[1],sz:trimScale[2],color:'#23545f',opacity:1,data:{...panel.cell,surface:'floor-tile'}});\r
          for(const sign of [-1,1]){\r
            voxels.push({x:w[0],y:trimPosition[1]+.012,z:w[2]+sign*.32,sx:.84,sy:.015,sz:.024,color:'#e9bc76',opacity:1,data:{...panel.cell,surface:'route-strip'}});\r
            studs.push({position:[w[0]+sign*.34,trimPosition[1]+.025,w[2]+sign*.34],cell:panel.cell});\r
          }\r
        }\r
      }\r
    }\r
    ctx.setVoxels(voxels);\r
    if(roundDetails){roundDetails.count=studs.length;roundDetails.userData.pickCells=studs.map(stud=>({...stud.cell}));studs.forEach((stud,i)=>{temp.position.fromArray(stud.position);temp.scale.setScalar(1);temp.quaternion.identity();temp.updateMatrix();roundDetails.setMatrixAt(i,temp.matrix);});roundDetails.instanceMatrix.needsUpdate=true;roundDetails.computeBoundingSphere();}\r
  }\r
  function buildMaze(){\r
    disposeLevel();lastPelletCount=-1;lastMetrics='';lastMessage='';\r
    if(mode==='spatial'){\r
      wallPanels=pacmanWallPanels(engine.cells);lastArchitecture='';\r
      if(variant==='b'){pipes=createPacmanPipes(THREE,{cells:engine.cells,dimensions,toWorld});world.add(pipes.group);pipes.update(viewUp,0,{immediate:true});}\r
      else roundDetails=addLevelMesh(new THREE.InstancedMesh(studGeometry,studMaterial,wallPanels.length*2),'pacman-round-deck-lights');\r
      updateArchitecture(true);\r
    }else{\r
      ctx.setVoxels([]);const walls=[];for(let z=0;z<31;z++)for(let x=0;x<28;x++)if(PACMAN_MAZE[z][x]==='#')walls.push({x,y:0,z});\r
      const maze=addLevelMesh(new THREE.InstancedMesh(box,blue,walls.length),'pacman-classic-walls');walls.forEach((p,i)=>{temp.position.set(...toWorld(p));temp.position.z=-.2;temp.scale.set(.94,.94,.4);temp.updateMatrix();maze.setMatrixAt(i,temp.matrix);});maze.instanceMatrix.needsUpdate=true;maze.computeBoundingSphere();\r
    }\r
    const small=[...engine.pellets].map(id=>{const [x,y,z]=id.split(',').map(Number);return {x,y,z};}),pellets=addLevelMesh(new THREE.InstancedMesh(dot,cream,small.length),'pacman-pellets');\r
    pellets.userData.pickCells=small;\r
    small.forEach((p,index)=>pelletMeshes.set(key(p),{p,mesh:pellets,index,power:false}));\r
    for(const id of engine.powerPills){const [x,y,z]=id.split(',').map(Number),p={x,y,z},mesh=addLevelMesh(new THREE.Mesh(power,cream),'pacman-power');setPosition(mesh,p);pelletMeshes.set(id,{p,mesh,power:true});}\r
    ctx.setLabels([]);draw(true);\r
  }\r
  function updatePellets(force=false){const count=engine.pellets.size+engine.powerPills.size;if(!force&&count===lastPelletCount)return;\r
    for(const [id,entry]of pelletMeshes){const visible=engine.pellets.has(id)||engine.powerPills.has(id);if(entry.power)entry.mesh.visible=visible;else{temp.position.set(...toWorld(entry.p));temp.scale.setScalar(visible?1:0);temp.updateMatrix();entry.mesh.setMatrixAt(entry.index,temp.matrix);entry.mesh.instanceMatrix.needsUpdate=true;}}\r
    lastPelletCount=count;\r
  }\r
  function draw(force=false){\r
    if(disposed||!engine)return;followPlayer();updateArchitecture();updatePellets(force);\r
    const period=mode==='spatial'?engine.period:Math.max(.105,.17-(engine.level-1)*.009),alpha=engine.status==='playing'?Math.min(1,engine.tickClock/period):1;\r
    function animated(mesh,current,previous){let p=current;if(previous&&manhattan(current,previous)<=1)p={x:previous.x+(current.x-previous.x)*alpha,y:previous.y+(current.y-previous.y)*alpha,z:previous.z+(current.z-previous.z)*alpha};setPosition(mesh,p);mesh.userData.pickData=copy(current);mesh.traverse(child=>{if(child.isMesh)child.userData.pickData=copy(current);});}\r
    if(mode==='spatial'){setPosition(playerMesh,engine.playerPose());playerMesh.userData.pickData=copy(engine.player);playerMesh.traverse(child=>{if(child.isMesh)child.userData.pickData=copy(engine.player);});}\r
    else animated(playerMesh,engine.player,engine.previousPlayer);\r
    playerMesh.visible=true;headlight.visible=mode==='spatial'&&variant==='a';rimLight.visible=headlight.visible;\r
    playerMesh.scale.setScalar(mode==='spatial'?.7:1);ghosts.forEach(ghost=>ghost.root.scale.setScalar(mode==='spatial'?.7:1));\r
    targetMarker.visible=mode==='spatial'&&variant==='b'&&!!engine.routeTarget;\r
    if(targetMarker.visible){setPosition(targetMarker,engine.routeTarget);targetMarker.rotation.y=clock*.9;targetMarker.rotation.x=clock*.6;targetMarker.scale.setScalar(.9+.1*Math.sin(clock*4));}\r
    const routeKey=variant==='b'?\`\${key(engine.player)}:\${engine.route.map(key).join('|')}\`:'';\r
    routeMesh.visible=mode==='spatial'&&variant==='b'&&engine.route.length>0;\r
    if(routeKey!==lastRoute){lastRoute=routeKey;routeGeometry.dispose();routeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(variant==='b'?[engine.player,...engine.route].flatMap(toWorld):[],3));routeGeometry.computeBoundingSphere();}\r
    const d=mode==='spatial'?VOLUME_DIRECTIONS[engine.player.dir]:[PACMAN_DIRECTIONS[engine.player.dir][0],-PACMAN_DIRECTIONS[engine.player.dir][1],0];\r
    playerMesh.quaternion.setFromUnitVectors(localRight,directionVector.set(...d));mouth.scale.y=.8+.2*Math.abs(Math.sin(clock*12));\r
    const basis=mode==='spatial'?{right:engine.heading.right,up:engine.heading.up,normal:engine.heading.forward.map(n=>-n||0)}:VOLUME_PLANES.xy,basisMatrix=new THREE.Matrix4().makeBasis(new THREE.Vector3(...basis.right),new THREE.Vector3(...basis.up),new THREE.Vector3(...basis.normal));\r
    ghosts.forEach((mesh,i)=>{const g=engine.ghosts[i];mesh.root.visible=!!g;if(!g)return;animated(mesh.root,g,g.previous);mesh.root.quaternion.setFromRotationMatrix(basisMatrix);mesh.root.visible=true;mesh.body.forEach(b=>{b.visible=!g.returning;b.material=engine.frightened>0?(engine.frightened<2&&Math.sin(clock*12)>0?white:fright):mesh.colorMat;});});\r
    for(const entry of pelletMeshes.values())if(entry.power)entry.mesh.scale.setScalar(.85+.15*Math.sin(clock*5));fruit.visible=!!engine.fruit;if(engine.fruit)setPosition(fruit,engine.fruit);\r
    const blocked=mode==='spatial'&&!engine.neighbor(engine.player,engine.player.dir);\r
    const turnAnchor=mode==='spatial'&&engine.status==='playing'&&engine.tickClock>1e-8?(engine.neighbor(engine.player,engine.player.dir)||engine.player):engine.player;\r
    const routes=mode==='spatial'?['left','up','down','right'].map(turn=>engine.neighbor(turnAnchor,directionIndex(pacmanTurnFrame(engine.heading,turn).forward))!==null):[];\r
    const metrics=\`\${engine.score}:\${engine.lives}:\${engine.level}:\${lastPelletCount}:\${engine.status}:\${viewMode}:\${blocked}:\${routes.join()}:\${engine.pendingTurns?.length}:\${!!engine.routeTarget}:\${engine.transition>.1}\`;\r
    if(force||metrics!==lastMetrics){ctx.setStats({'Score':engine.score,'Lives':'●'.repeat(engine.lives),'Level':engine.level,'Pellets':lastPelletCount});lastMetrics=metrics;el('[data-next]').disabled=engine.status!=='won';\r
      if(ctx.hud)ctx.hud.innerHTML='<div class="arcade-scoreboard pacman-scoreboard" style="display:flex;gap:24px;align-items:center;font-family:monospace;color:#fff4d0;text-shadow:0 2px #06142b"><div><small>1UP</small><strong style="display:block;font-size:24px">'+String(engine.score).padStart(6,'0')+'</strong></div><span style="color:#ffdc36;font-size:22px;letter-spacing:3px">'+'◕'.repeat(engine.lives)+'</span><div><small>LEVEL</small><strong style="display:block;font-size:20px">'+engine.level+'</strong></div><div><small>●</small><strong style="display:block;font-size:20px">'+lastPelletCount+'</strong></div></div>'+(mode==='spatial'?'<div class="pacman-pilot-hud" style="position:absolute;bottom:90px;left:50%;transform:translateX(-50%);text-align:center;color:#ffe783;font-family:monospace;background:rgba(7,19,34,.9);border:1px solid rgba(255,231,131,.2);border-radius:20px;padding:8px 18px;box-shadow:0 4px 18px rgba(0,0,0,.2);white-space:nowrap"><div style="display:flex;justify-content:center;gap:16px;font-size:23px">'+(variant==='a'?['←','↑','↓','→'].map((glyph,i)=>'<span style="opacity:'+(routes[i]?1:.22)+'">'+glyph+'</span>').join(''):'<span>◎</span><span style="font-size:13px;align-self:center">CLICK A PATH</span>')+'</div><div style="font-size:10px;letter-spacing:1px">'+(variant==='b'?(engine.routeTarget?'◉ TARGET LOCKED':'▶ AUTO'):(viewMode==='overview'?'◎ PAUSED':engine.transition>.1?'↗ CROSSING':blocked?'■ TURN':'▶ AUTO'))+'</div></div>':'');\r
\r
    }\r
    const message=engine.status==='gameover'?'GAME OVER · R ↺':engine.status==='won'?'CLEAR! · ▶▶':engine.status==='ready'?'READY!':'';\r
    if(force||message!==lastMessage){ctx.message(message);lastMessage=message;}\r
  }\r
  function reset(){\r
    engine=mode==='spatial'?new VolumePacmanEngine({dimensions,variant}):new PacmanEngine({layers:1});clock=0;viewMode=variant==='a'?'chase':'overview';inspection=null;lastArchitecture='';\r
    el('[data-mode]').disabled=started;el('[data-view-controls]').hidden=mode==='classic'||variant==='b';el('[data-direction-controls]').hidden=mode==='spatial'&&variant==='b';buildMaze();initialiseCamera();\r
  }\r
  function setStarted(value){started=!!value;el('[data-mode]').disabled=started;}\r
  function setVariant(value){\r
    if(started||!['a','b','classic'].includes(value))return false;\r
    mode=value==='classic'?'classic':'spatial';variant=value==='b'?'b':'a';el('[data-mode]').value=mode==='classic'?'classic':variant==='b'?'explorer':'spatial';reset();return true;\r
  }\r
  function updateView(dt=1/60){\r
    if(!pipes||disposed)return;\r
    const up=ctx.spatial?.viewUp?.()??viewUp;\r
    if(Array.isArray(up)&&up.length===3&&up.every(Number.isFinite)){viewUp=[...up];pipes.update(viewUp,dt);}\r
  }\r
  function move(input){\r
    let handled=false;\r
    if(mode==='spatial'){\r
      if(variant==='b')return false;\r
      viewMode='chase';inspection=null;handled=engine.turn(input);\r
      if(handled)ctx.sound?.('move');\r
    }else{const dir={arrowup:0,arrowleft:1,arrowdown:2,arrowright:3}[input];if(dir!==undefined){engine.setDirection(dir);handled=true;}}\r
    draw(true);return handled;\r
  }\r
  function onCrossAxis(input){\r
    if(mode!=='spatial'||variant==='b')return false;\r
    return pacmanTurnName(input)?move(input):false;\r
  }\r
  function next(){if(engine.nextLevel()){viewMode=variant==='a'?'chase':'overview';buildMaze();initialiseCamera();}}\r
  el('[data-mode]').addEventListener('change',e=>{if(!setVariant(e.target.value==='classic'?'classic':e.target.value==='explorer'?'b':'a'))el('[data-mode]').value=mode==='classic'?'classic':variant==='b'?'explorer':'spatial';});el('[data-reset]').addEventListener('click',reset);el('[data-next]').addEventListener('click',next);\r
  ctx.ui.querySelectorAll('[data-key]').forEach(button=>button.addEventListener('click',()=>move(button.dataset.key)));\r
  el('[data-pilot]').addEventListener('click',()=>onView('first-person'));\r
  el('[data-overview]').addEventListener('click',()=>{onView('overview');ctx.spatial?.overview?.({target:[0,0,0],distance:Math.max(...Object.values(dimensions))*2});});\r
  ctx.setRules?.('<p>A · Arrow keys / WASD turn the player; auto forward. B · Click a path cell to travel; WASD rotates the view. Right-drag to look. X isolates a layer; Z restores the view.</p><p>Collect every pellet to clear the level. Energizers turn ghosts edible. Three lives; no lives means game over.</p>');\r
  if(ctx.design?.navigation==='route')setVariant('b');else reset();\r
  return {reset,setStarted,setVariant,updateView,onView,onCrossAxis,onCameraChange(basis){if(basis?.up)viewUp=[...basis.up];updateView();/* Observing never rotates the pilot's navigation frame. */},update(dt){lastDt=dt;clock+=dt;if(mode==='classic'||variant==='b'||viewMode==='chase')engine.update(dt);for(const event of engine.events.splice(0)){if(['power','ghost','fruit'].includes(event))ctx.sound?.('clear');if(event==='death')ctx.sound?.('error');if(event==='win')ctx.sound?.('win');}draw();},\r
    onKey(input,event){const k=input.toLowerCase();if(pacmanTurnName(k)){event?.preventDefault();if(!event?.repeat)move(k);}else if(k==='enter'){event?.preventDefault();next();}},\r
    getDimensions(){return mode==='spatial'?{...dimensions}:{x:28,y:31,z:1};},setDimensions(values){if(started&&mode==='classic')throw new Error('Choose a 3D play style before starting to edit XYZ.');dimensions=validatePacmanDimensions(values);mode='spatial';el('[data-mode]').value=variant==='b'?'explorer':'spatial';reset();},\r
    getSelection(){return inspection??(mode==='spatial'?copy(engine.player):{x:engine.player.x,y:30-engine.player.z,z:0});},\r
    selectCell(data){if(data&&['x','y','z'].every(k=>Number.isInteger(data[k]))){inspection={x:data.x,y:data.y,z:data.z};return true;}return false;},\r
    cellPosition(data){return data&&['x','y','z'].every(k=>Number.isInteger(data[k]))?{x:data.x,y:data.y,z:data.z}:null;},\r
    onSwipe(input){if(variant!=='b')move(input.toLowerCase());},\r
    onPick(data){if(mode==='spatial'&&variant==='b'&&data){const accepted=engine.setTarget(data);if(accepted){inspection=copy(data);ctx.sound?.('move');draw(true);}return accepted;}return false;},\r
    getState(){return {...engine.snapshot(),mode,variant,started,modeLocked:started,visuals:{actorScale:mode==='spatial'?.7:1,corridors:variant==='b'?pipes?.getState():{type:'opaque-navy-teal',deckLights:roundDetails?.count??0}},ghostMode:engine.mode,fullVolume:mode==='spatial',follow:mode==='spatial'&&variant==='a'&&viewMode==='chase',viewMode:mode==='spatial'?viewMode:'classic',cameraMode:mode==='spatial'?(variant==='a'?'chase':'overview'):'classic',cameraIntent:mode==='spatial'&&variant==='a'?{type:engine.transition>.1?'crossing':'chase',angle:Math.atan(PACMAN_CHASE.height/PACMAN_CHASE.distance)*180/Math.PI,distance:PACMAN_CHASE.distance+PACMAN_CHASE.pullback*engine.transition,height:PACMAN_CHASE.height+PACMAN_CHASE.lift*engine.transition,transition:engine.transition}:null,controls:variant==='b'?'click-target':'quarter-turn',dimensions:mode==='spatial'?{...dimensions}:{x:28,y:31,z:1}};},\r
    dispose(){disposed=true;disposeLevel();ctx.group.remove(world);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());if(ctx.hud)ctx.hud.innerHTML='';}};\r
}\r
`;export{e as default};
