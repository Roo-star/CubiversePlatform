const e=`const validateDimensions=value=>{const d=Array.isArray(value)?[...value]:[value?.x,value?.y,value?.z];if(d.length!==3||d.some(n=>!Number.isSafeInteger(n)||n<1)||d.reduce((a,b)=>a*b,1)>4096)throw new RangeError('XYZ must be positive integers; maximum 4096 cells.');return d;};\r
// Web port of the verified local Game2048_3D and its MIT Pygame reference.\r
// Exact spawn policies, copied palette notice and Web differences: references/2048.md.\r
export const TILE_COLORS={\r
  0:'#cdc1b4',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',\r
  128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'\r
};\r
export const tileIndex=([x,y,z],[w,h])=>x+w*(y+h*z);\r
export const tileCoordinates=(index,[w,h])=>[index%w,Math.floor(index/w)%h,Math.floor(index/(w*h))];\r
export function merge2048Line(values){\r
  const compact=values.filter(value=>value!==0),merged=[];let score=0;\r
  for(let i=0;i<compact.length;i++){if(i+1<compact.length&&compact[i]===compact[i+1]){const combined=compact[i]*2;merged.push(combined);score+=combined;i++;}else merged.push(compact[i]);}\r
  return {values:merged.concat(Array(values.length-merged.length).fill(0)),score};\r
}\r
export class Game2048{\r
  constructor({dimensions=[4,4,4],random=Math.random,spawnPolicy='transformed',lossRule=spawnPolicy==='source-classic'?'no-moves':'full-board'}={}){\r
    dimensions=validateDimensions(dimensions);\r
    this.dimensions=[...dimensions];this.count=dimensions.reduce((a,b)=>a*b,1);if(this.count<2)throw new RangeError('2048 requires two cells');\r
    this.random=random;this.spawnPolicy=spawnPolicy==='source-classic'?'source-classic':'transformed';this.lossRule=lossRule==='no-moves'?'no-moves':'full-board';this.reset();\r
  }\r
  reset(){this.board=Array(this.count).fill(0);this.score=0;this.moves=0;this.spawned=0;this.lastSpawn=null;this.lastMergeCount=0;this.continuing=false;this.spawn();this.spawn();}\r
  spawn(){\r
    const empty=[];for(let i=0;i<this.count;i++)if(this.board[i]===0)empty.push(i);if(!empty.length)return false;\r
    const occupied=this.count-empty.length,total=this.board.reduce((sum,value)=>sum+value,0),index=empty[Math.floor(this.random()*empty.length)];\r
    const guaranteedTwo=this.spawnPolicy==='transformed'?occupied<2:total===0||total===2;\r
    this.board[index]=guaranteedTwo?2:this.random()<.5?2:4;this.lastSpawn=index;this.spawned++;return true;\r
  }\r
  move(axis,sign,{spawn=true}={}){\r
    if(this.gameOver||(this.won&&!this.continuing))return false;\r
    if(!Number.isInteger(axis)||axis<0||axis>2||![-1,1].includes(sign)||this.dimensions[axis]===1)return false;\r
    const result=Array(this.count).fill(0),others=[0,1,2].filter(i=>i!==axis);let gained=0;\r
    for(let a=0;a<this.dimensions[others[0]];a++)for(let b=0;b<this.dimensions[others[1]];b++){\r
      const indices=[];\r
      for(let step=0;step<this.dimensions[axis];step++){const p=[0,0,0];p[axis]=sign<0?step:this.dimensions[axis]-1-step;p[others[0]]=a;p[others[1]]=b;indices.push(tileIndex(p,this.dimensions));}\r
      const line=merge2048Line(indices.map(i=>this.board[i]));gained+=line.score;for(let i=0;i<indices.length;i++)result[indices[i]]=line.values[i];\r
    }\r
    if(result.every((value,i)=>value===this.board[i]))return false;\r
    this.lastMergeCount=this.board.filter(Boolean).length-result.filter(Boolean).length;this.board=result;this.score+=gained;this.moves++;this.lastSpawn=null;if(spawn)this.spawn();return true;\r
  }\r
  get maxTile(){return Math.max(...this.board);}\r
  get won(){return this.maxTile>=2048;}\r
  get gameOver(){\r
    if(this.board.includes(0))return false;\r
    if(this.lossRule==='full-board')return true;\r
    for(let index=0;index<this.count;index++){const p=tileCoordinates(index,this.dimensions);for(let axis=0;axis<3;axis++)if(p[axis]+1<this.dimensions[axis]){const next=[...p];next[axis]++;if(this.board[index]===this.board[tileIndex(next,this.dimensions)])return false;}}\r
    return true;\r
  }\r
  continueAfterGoal(){if(!this.won||this.gameOver)return false;this.continuing=true;return true;}\r
  getState(){return {dimensions:[...this.dimensions],board:[...this.board],score:this.score,moves:this.moves,spawned:this.spawned,lastSpawn:this.lastSpawn,lastMergeCount:this.lastMergeCount,maxTile:this.maxTile,won:this.won,gameOver:this.gameOver,outcome:this.gameOver?'lost':this.won&&!this.continuing?'won':'playing',continuing:this.continuing,spawnPolicy:this.spawnPolicy,lossRule:this.lossRule};}\r
}\r
export function edge2048Direction(index,dimensions){\r
  if(!Number.isInteger(index)||index<0||index>=dimensions.reduce((a,b)=>a*b,1))return null;\r
  const p=tileCoordinates(index,dimensions),offsets=p.map((v,i)=>v-(dimensions[i]-1)/2);\r
  let axis=-1;for(let i=0;i<3;i++)if(dimensions[i]>1&&(axis<0||Math.abs(offsets[i])>Math.abs(offsets[axis])))axis=i;\r
  if(axis<0||offsets[axis]===0)return null;const direction=[0,0,0];direction[axis]=offsets[axis]>0?1:-1;return direction;\r
}\r
\r
export function createGame(ctx){\r
  let game,spatial=true,dimensions=[4,4,4],selected=null,hovered=null;\r
  const doc=ctx.ui.ownerDocument??globalThis.document;\r
  ctx.ui.innerHTML='<div class="control-group"><label>Mode <select data-mode aria-label="2048 mode"><option value="spatial">3D</option><option value="classic">2D</option></select></label></div>'\r
    +'<div data-game-hud class="control-row game-hud-score hud-2048" style="justify-content:space-between;align-items:center"><strong style="font:700 40px Verdana,Arial,sans-serif;color:#776e65">2048</strong><div style="background:#bbada0;color:#f9f6f2;border-radius:5px;padding:8px 16px;text-align:center"><small>SCORE</small><br><strong data-score style="font:700 24px Verdana,Arial,sans-serif">0</strong></div></div>'\r
    +'<p data-position class="hint" hidden></p><div data-arrows class="control-row"></div><div data-turns class="control-row"></div><div class="control-row"><button data-continue class="primary-button" hidden>2048 · Keep going</button><button data-reset class="small-button">Restart</button></div><p class="hint" hidden>Slide matching numbers together. X slices; Z restores the whole view.</p>';\r
  const q=s=>ctx.ui.querySelector(s)??ctx.hud?.querySelector(s),button=(text,action)=>{const b=doc.createElement('button');b.className='small-button';b.textContent=text;b.onclick=action;return b;};\r
  if(ctx.hud){const hud=q('[data-game-hud]');if(hud)ctx.hud.append(hud);}\r
  const pitch=()=>spatial?1.22:1.06,world=index=>tileCoordinates(index,game.dimensions).map((v,i)=>(v-(game.dimensions[i]-1)/2)*pitch());\r
  function render(){\r
    const voxels=[],labels=[],edge=spatial?.94:.98,sy=spatial?.94:.3;\r
    for(let index=0;index<game.count;index++){\r
      const [x,y,z]=world(index),value=game.board[index];\r
      voxels.push({x,y,z,sx:edge,sy:value?sy:spatial?.88:.13,sz:edge,color:TILE_COLORS[value]??'#3c3a32',opacity:value||!spatial?1:.1,data:{index}});\r
      if(value)labels.push({x,y,z,text:String(value),color:value<=4?'#776e65':'#f9f6f2',fontFamily:'Verdana, Arial, sans-serif',cube:true,sx:edge+.009,sy:sy+.009,sz:edge+.009,data:{index}});\r
    }\r
    if(spatial){\r
      const extents=game.dimensions.map(v=>(v-1)*pitch()+1);\r
      for(let axis=0;axis<3;axis++)for(const a of [-extents[(axis+1)%3]/2,extents[(axis+1)%3]/2])for(const b of [-extents[(axis+2)%3]/2,extents[(axis+2)%3]/2]){\r
        const p=[0,0,0],s=[.023,.023,.023];p[(axis+1)%3]=a;p[(axis+2)%3]=b;s[axis]=extents[axis];voxels.push({x:p[0],y:p[1],z:p[2],sx:s[0],sy:s[1],sz:s[2],color:'#bbada0',opacity:.55});\r
      }\r
    }else voxels.push({x:0,y:-.25,z:0,sx:4.4,sy:.12,sz:4.4,color:'#bbada0'});\r
    if(hovered!==null){\r
      const [x,y,z]=world(hovered);voxels.push({x,y:y+(spatial?0:.23),z,sx:edge+ .06,sy:spatial?edge+.06:.035,sz:edge+.06,color:'#ffeab6',opacity:.16});\r
    }\r
    ctx.setVoxels(voxels);ctx.setLabels(labels);q('[data-score]').textContent=String(game.score);\r
    q('[data-continue]').hidden=!game.won||game.continuing||game.gameOver;\r
    const state=game.gameOver?(game.lossRule==='full-board'?'Board full':'No moves'):game.won&&!game.continuing?'2048!':game.continuing?'Keep going':'Playing';\r
    ctx.setStats({'Score':game.score,'Best tile':game.maxTile,'Moves':game.moves,'Empty':game.board.filter(v=>!v).length,'Status':state});\r
    q('[data-position]').textContent=(spatial?game.dimensions.join(' × '):'Classic 4×4')+' · '+(hovered!==null?'XYZ '+tileCoordinates(hovered,game.dimensions).map(v=>v+1).join(' / '):'Right drag to orbit · Arrows to slide');\r
    if(game.gameOver)ctx.message((game.lossRule==='full-board'?'BOARD FULL':'NO MOVES')+' · ↻ Restart');\r
    else if(game.won&&!game.continuing)ctx.message('2048 ✓ · ▶ Keep going');\r
  }\r
  function shift(vector){\r
    if(!vector||game.gameOver||(game.won&&!game.continuing))return;\r
    const axis=vector.findIndex(v=>v!==0);if(axis<0)return;\r
    const changed=game.move(axis,vector[axis]);if(changed){selected=null;hovered=null;ctx.sound?.(game.gameOver?'error':game.won?'win':game.lastMergeCount?'clear':'move');render();if(!game.won&&!game.gameOver)ctx.message(['X','Y','Z'][axis]+' '+(vector[axis]>0?'＋':'−')+' · '+(game.lastMergeCount?'Merge '+game.lastMergeCount:'Slide'));}\r
    else ctx.message('No move in that direction');\r
  }\r
  function direction(key){const vector=(spatial?ctx.spatial?.vectorForKey(key):null)??{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,0,-1],arrowdown:[0,0,1]}[key];shift(vector);}\r
  function reset(){\r
    game=new Game2048({dimensions:spatial?dimensions:[4,1,4],spawnPolicy:spatial?'transformed':'source-classic'});selected=null;hovered=null;\r
    q('[data-turns]').hidden=!spatial;render();\r
    if(spatial){const extents=dimensions.map(n=>(n-1)*pitch()+1);ctx.spatial?.volume?.({target:[0,0,0],distance:Math.max(...extents)*2.5+2,size:extents});}else ctx.frame({target:[0,0,0],distance:12,position:[0,12,.001]});\r
    if(!game.gameOver)ctx.message(spatial?'Swipe · X Slice · Z All':'Slide matching numbers together');\r
  }\r
  q('[data-arrows]').replaceChildren(...[['arrowup','↑ Slide'],['arrowleft','← Slide'],['arrowdown','↓ Slide'],['arrowright','Slide →']].map(([key,text])=>{const b=button(text,()=>direction(key));b.setAttribute('data-direction',key);return b;}));\r
  q('[data-turns]').replaceChildren(...[['up','W ↥'],['down','S ↧'],['left','A ↶'],['right','D ↷']].map(([turn,text])=>{const b=button(text,()=>ctx.spatial?.turn?.(turn));b.setAttribute('data-turn',turn);return b;}));\r
  q('[data-mode]').onchange=()=>{spatial=q('[data-mode]').value!=='classic';reset();};q('[data-reset]').onclick=reset;\r
  q('[data-continue]').onclick=()=>{if(game.continueAfterGoal()){render();ctx.message('Keep going ✓');}};\r
  ctx.setRules?.('<p>Slide matching numbers together. Each tile merges once per move. Valid moves add a new tile.</p><p>Reach 2048 to win. In 3D, filling the final empty cell ends the run immediately, even if a merge remains. The 2D Classic option ends only when no moves remain.</p><p>Swipe or use arrows. Right drag to orbit. X slices; Z restores the whole view.</p>');\r
  reset();\r
  return {reset,getDimensions(){const [x,y,z]=game.dimensions;return {x,y,z};},setDimensions(value){const next=validateDimensions(value);if(next.reduce((a,b)=>a*b,1)<2)throw new RangeError('2048 requires at least 2 cells.');dimensions=next;spatial=true;q('[data-mode]').value='spatial';reset();},getSelection(){const [x,y,z]=tileCoordinates(selected??hovered??Math.floor(game.count/2),game.dimensions);return {x,y,z};},selectCell(data){if(Number.isInteger(data?.index)&&data.index>=0&&data.index<game.count)selected=data.index;},cellPosition(data){return Number.isInteger(data?.index)&&data.index>=0&&data.index<game.count?tileCoordinates(data.index,game.dimensions):null;},render,onSwipe(key){direction(key.toLowerCase());},update(){},\r
    onKey(key,event){key=key.toLowerCase();if(['arrowup','arrowleft','arrowdown','arrowright'].includes(key)){event?.preventDefault();if(!event?.repeat)direction(key);}},\r
    onPick(data){if(Number.isInteger(data?.index)){selected=data.index;shift(edge2048Direction(data.index,game.dimensions));}},\r
    onHover(data){const next=Number.isInteger(data?.index)&&data.index>=0&&data.index<game.count?data.index:null;if(next===hovered)return;hovered=next;render();},\r
    getState(){return {...game.getState(),spatial,volume:spatial,selected,hovered};},dispose(){ctx.ui.replaceChildren();}};\r
}\r
`;export{e as default};
