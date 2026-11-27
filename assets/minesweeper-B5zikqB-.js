const e=`import {mineNeighborhoods, mineNeighborOffset} from '../mine-neighborhood.js';\r
\r
const validateDimensions=value=>{const d=Array.isArray(value)?[...value]:[value?.x,value?.y,value?.z];if(d.length!==3||d.some(n=>!Number.isSafeInteger(n)||n<1)||d.reduce((a,b)=>a*b,1)>4096)throw new RangeError('XYZ must be positive integers, up to 4,096 cells.');return d;};\r
// Web port of the locally verified CubeEngine Minesweeper3D behavior.\r
// Source, license and deliberate Web interaction additions: references/minesweeper.md.\r
export const MINE_NUMBER_COLORS=['#777777','#0000ff','#008000','#ff0000','#000080','#800000','#008080','#000000','#808080'];\r
export const mineIndex=([x,y,z],[w,h])=>x+w*(y+h*z);\r
export const mineCoordinates=(index,[w,h])=>[index%w,Math.floor(index/w)%h,Math.floor(index/(w*h))];\r
export function mineNeighbours(index,dimensions,neighborhood='touching'){\r
  const p=mineCoordinates(index,dimensions),result=[];\r
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){\r
    if(!mineNeighborOffset(x,y,z,neighborhood))continue;const n=[p[0]+x,p[1]+y,p[2]+z];\r
    if(n.every((v,i)=>v>=0&&v<dimensions[i]))result.push(mineIndex(n,dimensions));\r
  }\r
  return result;\r
}\r
const halfEven=value=>{const floor=Math.floor(value);return value-floor===.5?floor+(floor%2):Math.round(value);};\r
export class MinesweeperGame{\r
  constructor({dimensions=[5,8,3],mineCount=null,random=Math.random,neighborhood='touching'}={}){\r
    dimensions=validateDimensions(dimensions);\r
    if(mineCount!==null&&(!Number.isInteger(mineCount)||mineCount<0))throw new RangeError('Invalid mine count');\r
    if(!Object.hasOwn(mineNeighborhoods,neighborhood))throw new RangeError('Invalid clue neighborhood');\r
    this.neighborhood=neighborhood;this.dimensions=[...dimensions];this.count=dimensions.reduce((a,b)=>a*b,1);this.random=random;\r
    this.requestedMines=Math.max(0,Math.min(this.count-1,mineCount===null?halfEven(this.count*.1):Math.floor(mineCount)));this.reset();\r
  }\r
  reset(){this.mines=new Set();this.revealed=new Set();this.flags=new Set();this.generated=false;this.exploded=null;this.elapsed=0;this.started=false;}\r
  valid(index){return Number.isInteger(index)&&index>=0&&index<this.count;}\r
  get mineCount(){return this.generated?this.mines.size:this.requestedMines;}\r
  get status(){return this.exploded!==null?'lost':this.generated&&this.revealed.size===this.count-this.mines.size?'won':'playing';}\r
  neighbors(index){return mineNeighbours(index,this.dimensions,this.neighborhood);}\r
  adjacent(index){return this.neighbors(index).reduce((sum,i)=>sum+Number(this.mines.has(i)),0);}\r
  generate(first){\r
    const protectedCells=new Set([first,...this.neighbors(first)]),candidates=[];\r
    for(let i=0;i<this.count;i++)if(!protectedCells.has(i))candidates.push(i);\r
    const count=Math.min(this.requestedMines,candidates.length);\r
    // Partial Fisher-Yates gives unique positions without retrying random cells.\r
    for(let i=0;i<count;i++){const j=i+Math.floor(this.random()*(candidates.length-i));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];this.mines.add(candidates[i]);}\r
    this.generated=true;\r
  }\r
  reveal(index){\r
    if(!this.valid(index)||this.status!=='playing'||this.flags.has(index)||this.revealed.has(index))return false;\r
    if(!this.generated)this.generate(index);this.started=true;\r
    if(this.mines.has(index)){this.exploded=index;return true;}\r
    const queue=[index];\r
    while(queue.length){const current=queue.pop();if(this.revealed.has(current)||this.flags.has(current)||this.mines.has(current))continue;this.revealed.add(current);if(this.adjacent(current)===0)queue.push(...this.neighbors(current));}\r
    return true;\r
  }\r
  toggleFlag(index){\r
    if(!this.valid(index)||this.status!=='playing'||this.revealed.has(index))return false;\r
    if(this.flags.has(index))this.flags.delete(index);else this.flags.add(index);return true;\r
  }\r
  chord(index){\r
    if(!this.valid(index)||this.status!=='playing'||!this.revealed.has(index))return false;\r
    const neighbours=this.neighbors(index),number=this.adjacent(index);\r
    if(number===0||neighbours.filter(i=>this.flags.has(i)).length!==number)return false;\r
    let changed=false;\r
    for(const neighbour of neighbours){if(this.status!=='playing')break;if(!this.flags.has(neighbour)&&!this.revealed.has(neighbour))changed=this.reveal(neighbour)||changed;}\r
    return changed;\r
  }\r
  tick(dt){if(this.started&&this.status==='playing')this.elapsed+=Math.max(0,dt);}\r
  getState(){return {dimensions:[...this.dimensions],mineCount:this.mineCount,requestedMines:this.requestedMines,generated:this.generated,mines:[...this.mines],revealed:[...this.revealed],flags:[...this.flags],exploded:this.exploded,status:this.status,elapsed:this.elapsed,started:this.started};}\r
}\r
\r
export function createGame(ctx){\r
  let game,spatial=true,dimensions=[5,8,3],selected=0,hovered=null,lastSecond=-1;\r
  const neighborhood=Object.hasOwn(mineNeighborhoods,ctx.design?.neighborhood)?ctx.design.neighborhood:'touching';\r
  ctx.ui.innerHTML='<div class="control-group"><label>Mode <select data-mode aria-label="Minesweeper mode"><option value="spatial">3D · '+mineNeighborhoods[neighborhood]+'</option><option value="classic">2D · 10 × 10 · 10 mines</option></select></label></div>'\r
    +'<div data-game-hud class="control-row game-hud-score hud-minesweeper" style="padding:9px;background:#c0c0c0;border:2px solid #eee;justify-content:space-between"><strong data-counter aria-label="Mines remaining" style="background:#180000;color:#ff3232;font:700 24px monospace;padding:3px 6px">012</strong><button data-smile class="small-button" aria-label="Restart">🙂</button><strong data-time aria-label="Seconds elapsed" style="background:#180000;color:#ff3232;font:700 24px monospace;padding:3px 6px">000</strong></div>';\r
  const q=s=>ctx.ui.querySelector(s)??ctx.hud?.querySelector(s),hud=q('[data-game-hud]');\r
  if(ctx.hud&&hud)ctx.hud.append(hud);\r
  const pitch=()=>spatial?1.22:1.02,world=index=>mineCoordinates(index,game.dimensions).map((v,i)=>(v-(game.dimensions[i]-1)/2)*pitch());\r
  function stats(){\r
    const remaining=game.mineCount-game.flags.size;\r
    ctx.setStats({'Mines':game.mineCount,'Unflagged':remaining,'Revealed':game.revealed.size+'/'+(game.count-game.mineCount),'Time':Math.floor(game.elapsed)+' s','Status':game.status==='won'?'Complete':game.status==='lost'?'Mine hit':'Playing'});\r
    q('[data-counter]').textContent=(remaining<0?'-':'')+String(Math.abs(remaining)).padStart(3,'0');q('[data-time]').textContent=String(Math.min(999,Math.floor(game.elapsed))).padStart(3,'0');\r
    q('[data-smile]').textContent=game.status==='lost'?'☹':game.status==='won'?'😎':'🙂';\r
  }\r
  function outline(voxels,index,color,width=.026,{lengths=[.98,spatial?.98:.32,.98],opacity=1,cellState,part='selection'}={}){\r
    const p=world(index);\r
    for(let axis=0;axis<3;axis++)for(const a of [-lengths[(axis+1)%3]/2,lengths[(axis+1)%3]/2])for(const b of [-lengths[(axis+2)%3]/2,lengths[(axis+2)%3]/2]){\r
      const c=[...p],s=[width,width,width];c[(axis+1)%3]+=a;c[(axis+2)%3]+=b;s[axis]=lengths[axis];voxels.push({x:c[0],y:c[1],z:c[2],sx:s[0],sy:s[1],sz:s[2],color,opacity,data:{index},decoration:true,cellState,part});\r
    }\r
  }\r
  function render(){\r
    const voxels=[],labels=[];\r
    for(let index=0;index<game.count;index++){\r
      const [x,y,z]=world(index),open=game.revealed.has(index),flag=game.flags.has(index),mine=game.mines.has(index),lostMine=game.status==='lost'&&mine,wrongFlag=game.status==='lost'&&flag&&!mine;\r
      const sy=spatial?.9:.25,opacity=1,cellState=open?'open':'covered';\r
      if(open){\r
        // The invisible hit volume retains the entire cell as a target. Its\r
        // smaller opaque inner faces sit behind the numbers and rim. The\r
        // recessed matte tile stays distinct from a covered raised gray tile.\r
        voxels.push({x,y,z,sx:.9,sy,sz:.9,color:'#ffffff',opacity:.01,pickOnly:true,data:{index},cellState,part:'hit'});\r
        voxels.push({x,y:y-(spatial?0:.06),z,sx:.64,sy:spatial?.64:.06,sz:.64,color:'#b7c0b4',opacity:1,data:{index},decoration:true,cellState,part:'open-face'});\r
        outline(voxels,index,'#7f8e81',.022,{lengths:[.78,spatial?.78:.13,.78],opacity:1,cellState,part:'open-rim'});\r
        voxels.push({x,y:y-(spatial?.36:.09),z,sx:.74,sy:.028,sz:.74,color:'#cbd3c7',opacity:1,data:{index},decoration:true,cellState,part:'open-floor'});\r
      }else voxels.push({x,y,z,sx:.9,sy,sz:.9,color:index===game.exploded?'#f44848':'#9b9b9b',opacity,data:{index},cellState,part:'raised-tile'});\r
      // Raised six-face caps and paired bevel edges reproduce the familiar gray\r
      // Windows tile appearance using shared boxes, without image downloads.\r
      if(!open&&!lostMine&&game.count<=512){\r
        const lengths=[.9,sy,.9];\r
        for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){\r
          const c=[x,y,z],s=[.78,spatial?.78:.18,.78];c[axis]+=sign*(lengths[axis]/2+.006);s[axis]=.016;\r
          voxels.push({x:c[0],y:c[1],z:c[2],sx:s[0],sy:s[1],sz:s[2],color:'#c0c0c0',opacity,data:{index},decoration:true,cellState,part:'bevel'});\r
          const u=(axis+1)%3,v=(axis+2)%3;\r
          for(const side of [-1,1]){\r
            const edgePoint=[...c],edgeSize=[...s];edgePoint[u]+=side*(lengths[u]/2-.04);edgeSize[u]=.045;edgeSize[v]=lengths[v]-.025;\r
            voxels.push({x:edgePoint[0],y:edgePoint[1],z:edgePoint[2],sx:edgeSize[0],sy:edgeSize[1],sz:edgeSize[2],color:side<0?'#ffffff':'#808080',opacity,data:{index},decoration:true,cellState,part:'bevel'});\r
          }\r
        }\r
      }\r
      let text='',color='#111111';\r
      if(lostMine){text='✹';color='#111111';}else if(wrongFlag){text='×';color='#d71919';}else if(flag){text='⚑';color='#db1515';}else if(open&&game.adjacent(index)){const number=game.adjacent(index);text=String(number);color=MINE_NUMBER_COLORS[number]??'#4c2589';}\r
      if(text)labels.push({x,y:y-(open&&!spatial?.06:0),z,text,color,cube:true,sx:open?.68:.946,sy:open?(spatial?.68:.08):sy+.046,sz:open?.68:.946,data:{index},cellState});\r
    }\r
    if(!spatial)voxels.push({x:0,y:-.24,z:0,sx:10.4,sy:.1,sz:10.4,color:'#808080'});\r
    outline(voxels,selected,'#438bd5');if(hovered!==null&&hovered!==selected)outline(voxels,hovered,'#f3c85a',.018);\r
    ctx.setVoxels(voxels);ctx.setLabels(labels);stats();\r
    if(game.status==='lost')ctx.message('Mine hit · ☹ Restart');\r
    else if(game.status==='won')ctx.message('Complete ✓');\r
  }\r
  function act(kind,index=selected){\r
    if(!game.valid(index))return;selected=index;\r
    const old=game.status,changed=kind==='flag'?game.toggleFlag(index):kind==='chord'?game.chord(index):game.reveal(index);\r
    if(changed){ctx.sound?.(game.status==='lost'?'error':game.status==='won'?'win':'move');if(old==='playing'&&game.status==='playing')ctx.message('Right click → ⚑ · X → slice');}\r
    render();\r
  }\r
  function moveCursor(key){\r
    const delta=(spatial?ctx.spatial?.vectorForKey(key):null)??{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,0,-1],arrowdown:[0,0,1]}[key];if(!delta)return;\r
    const p=mineCoordinates(selected,game.dimensions),next=p.map((v,i)=>Math.max(0,Math.min(game.dimensions[i]-1,v+delta[i]))),index=mineIndex(next,game.dimensions);\r
    if(index===selected)return;selected=index;render();if(spatial)ctx.spatial?.follow?.({target:world(selected),weight:.15});\r
  }\r
  function reset(){\r
    game=new MinesweeperGame({dimensions:spatial?dimensions:[10,1,10],mineCount:spatial?null:10,neighborhood:spatial?neighborhood:'plane'});selected=0;hovered=null;lastSecond=-1;\r
    ctx.setRules?.('<p>Reveal every safe cell. Clues count mines in up to '+mineNeighborhoods[game.neighborhood]+'. The first cell and its neighbors are safe.</p><p>Left click reveals. Right click flags; right drag orbits. Chord on a revealed number when its flag count matches. X slices, double X isolates the clue neighborhood, Z restores all cells. F flags; C chords.</p>');\r
    render();if(spatial){const extents=dimensions.map(n=>(n-1)*pitch()+1);ctx.spatial?.volume?.({target:[0,0,0],distance:Math.max(...extents)*2.5+2,size:extents});}else ctx.frame({target:[0,0,0],distance:25,position:[0,25,.001]});\r
    ctx.message('Left click → reveal · Right click → flag');\r
  }\r
  q('[data-mode]').onchange=()=>{spatial=q('[data-mode]').value!=='classic';reset();};\r
  q('[data-smile]').onclick=reset;\r
  reset();\r
  return {reset,getDimensions(){const [x,y,z]=game.dimensions;return {x,y,z};},setDimensions(value){dimensions=validateDimensions(value);spatial=true;q('[data-mode]').value='spatial';reset();},getSelection(){const [x,y,z]=mineCoordinates(selected,game.dimensions);return {x,y,z};},selectCell(data){if(game.valid(data?.index)){selected=data.index;render();}},cellPosition(data){return game.valid(data?.index)?mineCoordinates(data.index,game.dimensions):null;},render,update(dt){game.tick(dt);const second=Math.floor(game.elapsed);if(second!==lastSecond){lastSecond=second;stats();}},\r
    onPick(data){if(!Number.isInteger(data?.index)||!game.valid(data.index))return;act(game.revealed.has(data.index)?'chord':'reveal',data.index);},\r
    onSecondaryPick(data){if(game.valid(data?.index))act('flag',data.index);},\r
    onHover(data){const next=game.valid(data?.index)?data.index:null;if(next===hovered)return;hovered=next;render();},\r
    onKey(key,event){key=key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown'].includes(key)){event?.preventDefault();moveCursor(key);}else if(key==='enter'||key===' '){event?.preventDefault();act(game.revealed.has(selected)?'chord':'reveal');}else if(key==='f')act('flag');else if(key==='c')act('chord');},\r
    getNeighborhood(){return game.neighborhood;},\r
    getState(){return {...game.getState(),spatial,volume:spatial,selected,cursor:mineCoordinates(selected,game.dimensions),hovered};},dispose(){hud?.remove?.();ctx.ui.replaceChildren();}};\r
}\r
`;export{e as default};
