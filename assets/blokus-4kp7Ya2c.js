const e=`// Original Cubiverse adapter. Source and rules audit: references/blokus.md.\r
export const PIECES = [\r
  ['1', [[0,0]]], ['2', [[0,0],[1,0]]],\r
  ['I3', [[0,0],[1,0],[2,0]]], ['V3', [[0,0],[0,1],[1,1]]],\r
  ['I4', [[0,0],[1,0],[2,0],[3,0]]], ['O4', [[0,0],[1,0],[0,1],[1,1]]],\r
  ['T4', [[0,0],[1,0],[2,0],[1,1]]], ['L4', [[0,0],[0,1],[0,2],[1,2]]],\r
  ['Z4', [[0,0],[1,0],[1,1],[2,1]]],\r
  ['F5', [[1,0],[2,0],[0,1],[1,1],[1,2]]], ['I5', [[0,0],[1,0],[2,0],[3,0],[4,0]]],\r
  ['L5', [[0,0],[0,1],[0,2],[0,3],[1,3]]], ['P5', [[0,0],[1,0],[0,1],[1,1],[0,2]]],\r
  ['N5', [[0,0],[0,1],[1,1],[1,2],[1,3]]], ['T5', [[0,0],[1,0],[2,0],[1,1],[1,2]]],\r
  ['U5', [[0,0],[2,0],[0,1],[1,1],[2,1]]], ['V5', [[0,0],[0,1],[0,2],[1,2],[2,2]]],\r
  ['W5', [[0,0],[0,1],[1,1],[1,2],[2,2]]], ['X5', [[1,0],[0,1],[1,1],[2,1],[1,2]]],\r
  ['Y5', [[0,0],[0,1],[1,1],[0,2],[0,3]]], ['Z5', [[0,0],[1,0],[1,1],[1,2],[2,2]]],\r
].map(([id,cells]) => ({id,cells}));\r
\r
const FACE = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];\r
const DIAGONAL = [];\r
for (let x=-1;x<=1;x++) for(let y=-1;y<=1;y++) for(let z=-1;z<=1;z++) {\r
  if (Math.abs(x)+Math.abs(y)+Math.abs(z)>=2) DIAGONAL.push([x,y,z]);\r
}\r
const CONTACTS=[...FACE,...DIAGONAL];\r
const COLORS = ['#1976e8','#ffc928','#ed4150','#2eba70'];\r
const COLOR_NAMES = ['Blue','Yellow','Red','Green'];\r
export const blokusPiece=id=>typeof id==='number'?PIECES[((id%21)+21)%21]:id;\r
export const blokusWorldVectorToLogical=([x,y,z])=>[x,-z,y].map(n=>n||0);\r
export const blokusLogicalToWorld=(p,dims)=>[p[0]-(dims[0]-1)/2,p[2]+.45,-(p[1]-(dims[1]-1)/2)];\r
export const mapBlokusSpatialBasis=basis=>({...basis,right:blokusWorldVectorToLogical(basis.right),up:blokusWorldVectorToLogical(basis.up),normal:blokusWorldVectorToLogical(basis.normal)});\r
export const index3 = ([x,y,z], [w,h]) => x + w*(y+h*z);\r
const add = (a,b) => a.map((v,i)=>v+b[i]);\r
const inside=(p,dims)=>Array.isArray(p)&&p.length===3&&p.every((v,i)=>Number.isInteger(v)&&v>=0&&v<dims[i]);\r
const equal = (a,b)=>a.every((v,i)=>v===b[i]);\r
function normalize(cells) {\r
  const mins=[0,1,2].map(i=>Math.min(...cells.map(c=>c[i])));\r
  return cells.map(c=>c.map((v,i)=>v-mins[i])).sort((a,b)=>a[2]-b[2]||a[1]-b[1]||a[0]-b[0]);\r
}\r
export function rotateBlokusCells(cells,axis='y',turns=1) {\r
  let result=cells.map(c=>[...c]);\r
  for(let i=0;i<((turns%4)+4)%4;i++)result=result.map(([x,y,z])=>axis==='x'?[x,-z,y]:axis==='y'?[z,y,-x]:[-y,x,z]);\r
  return normalize(result);\r
}\r
// All 24 proper rotations of a cube (determinant +1), including standing and\r
// underside orientations. Reflections of a planar piece arise by turning it over.\r
const rawRotate=(p,axis)=>axis==='x'?[p[0],-p[2],p[1]]:axis==='y'?[p[2],p[1],-p[0]]:[-p[1],p[0],p[2]];\r
export const CUBE_ROTATIONS=(()=>{\r
  const list=[[[1,0,0],[0,1,0],[0,0,1]]],seen=new Set([JSON.stringify(list[0])]);\r
  for(let i=0;i<list.length;i++)for(const axis of ['x','y','z']){\r
    const rotation=list[i].map(p=>rawRotate(p,axis)),key=JSON.stringify(rotation);\r
    if(!seen.has(key)){seen.add(key);list.push(rotation);}\r
  }\r
  return list;\r
})();\r
export function orientPiece3(piece,orientation=0) {\r
  const matrix=CUBE_ROTATIONS[((orientation%24)+24)%24];\r
  return normalize(blokusPiece(piece).cells.map(([u,v])=>matrix[0].map((component,axis)=>component*u+matrix[1][axis]*v)));\r
}\r
export function orientPiece(piece, plane='xy', turns=0, flipped=false) {\r
  let cells=blokusPiece(piece).cells.map(([u,v])=>[flipped?-u:u,v]);\r
  for(let n=0;n<((turns%4)+4)%4;n++) cells=cells.map(([u,v])=>[-v,u]);\r
  return normalize(cells.map(([u,v])=>plane==='xy'?[u,v,0]:plane==='yz'?[0,u,v]:[u,0,v]));\r
}\r
const orientationCache=new Map();\r
export function orientations(piece, spatial=false) {\r
  const key=\`\${piece%21}/\${spatial}\`;\r
  if(orientationCache.has(key)) return orientationCache.get(key);\r
  const seen=new Set(), list=[];\r
  if(spatial){\r
    for(let orientation=0;orientation<24;orientation++){\r
      const cells=orientPiece3(piece,orientation),serial=JSON.stringify(cells);\r
      if(!seen.has(serial)){seen.add(serial);list.push({cells,orientation,plane:cells.every(c=>c[1]===0)?'xz':cells.every(c=>c[2]===0)?'xy':'yz'});}\r
    }\r
    orientationCache.set(key,list);return list;\r
  }\r
  for(const plane of ['xy']) for(let flip=0;flip<2;flip++) for(let turns=0;turns<4;turns++) {\r
    const cells=orientPiece(piece,plane,turns,!!flip), serial=JSON.stringify(cells);\r
    if(!seen.has(serial)) { seen.add(serial); list.push({cells,plane,turns,flipped:!!flip}); }\r
  }\r
  orientationCache.set(key,list); return list;\r
}\r
const validateDimensions=value=>{const d=Array.isArray(value)?[...value]:[value?.x,value?.y,value?.z];if(d.length!==3||d.some(n=>!Number.isSafeInteger(n)||n<1)||d.reduce((a,b)=>a*b,1)>4096)throw new RangeError('XYZ must be positive integers; maximum 4096 cells.');return d;};\r
export function blokusInventory(dimensions,spatial=true) {\r
  if(!spatial)return PIECES.map((_,i)=>i);\r
  const available=PIECES.map((_,i)=>i).filter(piece=>orientations(piece,true).some(o=>o.cells.every(p=>inside(p,dimensions))));\r
  const players=new Set([[0,0],[dimensions[0]-1,0],[dimensions[0]-1,dimensions[1]-1],[0,dimensions[1]-1]].map(p=>p.join(','))).size;\r
  const budget=Math.max(1,Math.floor(dimensions.reduce((a,b)=>a*b,1)*.72/players)),setSize=available.reduce((sum,i)=>sum+blokusPiece(i).cells.length,0);\r
  if(budget>=setSize){const sets=Math.max(1,Math.floor(budget/setSize));return Array.from({length:sets},(_,copy)=>available.map(i=>i+21*copy)).flat();}\r
  const result=[];let used=0;for(const piece of available){const size=PIECES[piece].cells.length;if(used+size<=budget){result.push(piece);used+=size;}}return result;\r
}\r
export function createBlokusState(spatial=true,dimensions=null) {\r
  const dims=validateDimensions(dimensions??(spatial?[10,10,5]:[20,20,1])),inventory=blokusInventory(dims,spatial),players=[],seen=new Set();\r
  for(let player=0;player<4;player++){const key=startingCorner({dims},player).join(',');if(!seen.has(key)){players.push(player);seen.add(key);}}\r
  const count=dims.reduce((a,b)=>a*b,1);\r
  return {spatial,dims,board:new Int8Array(count).fill(-1),pieceIds:new Int32Array(count).fill(-1),nextPieceId:0,players,inventory:[...inventory],\r
    remaining:Array.from({length:4},(_,i)=>players.includes(i)?[...inventory]:[]),placed:[0,0,0,0],last:[null,null,null,null],\r
    player:0,passes:0,over:false,turn:0};\r
}\r
const nextPlayer=state=>state.players[(state.players.indexOf(state.player)+1)%state.players.length];\r
export function moveBlokusCursor(cursor,delta,dims) {\r
  return cursor.map((v,i)=>Math.max(0,Math.min(dims[i]-1,v+delta[i])));\r
}\r
export function startingCorner(state,player) {\r
  const [w,h,d]=state.dims;\r
  return [[0,0,0],[w-1,0,0],[w-1,h-1,0],[0,h-1,0]][player];\r
}\r
// IDs distinguish separate pieces of the same opponent. Legacy/manual boards\r
// have no IDs: their face-connected same-color components are rigid pieces,\r
// because separate pieces of one color cannot legally share a face.\r
function contactPieceKey(state,index,legacyIds) {\r
  const owner=state.board[index],id=state.pieceIds?.[index];\r
  if(Number.isInteger(id)&&id>=0)return \`\${owner}:\${id}\`;\r
  if(legacyIds.has(index))return legacyIds.get(index);\r
  const key=\`\${owner}:legacy:\${index}\`,pending=[index],[w,h]=state.dims;\r
  legacyIds.set(index,key);\r
  while(pending.length){\r
    const current=pending.pop(),position=[current%w,Math.floor(current/w)%h,Math.floor(current/(w*h))];\r
    for(const delta of FACE){\r
      const neighbour=add(position,delta);if(!inside(neighbour,state.dims))continue;\r
      const next=index3(neighbour,state.dims),knownId=state.pieceIds?.[next];\r
      if(state.board[next]!==owner||legacyIds.has(next)||(Number.isInteger(knownId)&&knownId>=0))continue;\r
      legacyIds.set(next,key);pending.push(next);\r
    }\r
  }\r
  return key;\r
}\r
export function placementError(state,player,cells,anchor) {\r
  if(!cells?.length||!Array.isArray(anchor)||!state.players.includes(player))return 'Select a piece.';\r
  const positions=cells.map(c=>add(c,anchor)),newCells=new Set(positions.map(p=>p.join(',')));\r
  if(newCells.size!==positions.length||positions.some(p=>!inside(p,state.dims)))return 'Outside the board.';\r
  if(positions.some(p=>state.board[index3(p,state.dims)]!==-1))return 'That cell is occupied.';\r
  // Every new column must be grounded. A vertical cell in this same rigid piece\r
  // can support the next cell; horizontal overhangs require an existing support.\r
  if(state.spatial&&positions.some(([x,y,z])=>z>0&&!newCells.has([x,y,z-1].join(','))&&state.board[index3([x,y,z-1],state.dims)]<0))return 'Every cell needs support below.';\r
  let contact=false;const opponentContacts=new Map(),legacyIds=new Map();\r
  for(const p of positions){\r
    if(FACE.some(delta=>{const n=add(p,delta);return inside(n,state.dims)&&state.board[index3(n,state.dims)]===player;}))return 'Your pieces may touch at corners or diagonal edges, never face to face.';\r
    if(DIAGONAL.some(delta=>{const n=add(p,delta);return inside(n,state.dims)&&state.board[index3(n,state.dims)]===player;}))contact=true;\r
    if(state.spatial)for(const delta of CONTACTS){\r
      const n=add(p,delta);if(!inside(n,state.dims))continue;\r
      const index=index3(n,state.dims),owner=state.board[index];if(owner<0||owner===player)continue;\r
      const key=contactPieceKey(state,index,legacyIds),distance=delta.reduce((sum,value)=>sum+Math.abs(value),0);\r
      opponentContacts.set(key,Math.min(opponentContacts.get(key)??3,distance));\r
    }\r
  }\r
  if([...opponentContacts.values()].some(distance=>distance===3))return 'Meet other colors along an edge or face, not only at a corner.';\r
  if(state.placed[player]===0)return positions.some(p=>equal(p,startingCorner(state,player)))?'':'Cover your ground corner with the first piece.';\r
  return contact?'':'Connect to a corner or diagonal edge of your own color.';\r
}\r
export function canPlace(state,player,cells,anchor) { return !placementError(state,player,cells,anchor); }\r
export function findBlokusMove(state,player=state.player,onlyPiece=null) {\r
  if(state.over||!state.players.includes(player))return null;\r
  const targets=new Map();\r
  if(state.placed[player]===0) {const c=startingCorner(state,player);targets.set(c.join(','),c);}\r
  else {\r
    const [w,h,d]=state.dims;\r
    for(let z=0;z<d;z++) for(let y=0;y<h;y++) for(let x=0;x<w;x++) {\r
      if(state.board[index3([x,y,z],state.dims)]!==player) continue;\r
      for(const delta of DIAGONAL) {\r
        const p=add([x,y,z],delta);\r
        if(inside(p,state.dims)&&state.board[index3(p,state.dims)]===-1) targets.set(p.join(','),p);\r
      }\r
    }\r
  }\r
  const pieces=state.remaining[player].filter(i=>onlyPiece===null||i===onlyPiece).sort((a,b)=>blokusPiece(b).cells.length-blokusPiece(a).cells.length);\r
  for(const piece of pieces) for(const orientation of orientations(piece,state.spatial)) {\r
    const checked=new Set();\r
    for(const target of targets.values()) for(const cell of orientation.cells) {\r
      const anchor=target.map((v,i)=>v-cell[i]), key=anchor.join(',');\r
      if(checked.has(key)) continue;checked.add(key);\r
      if(canPlace(state,player,orientation.cells,anchor)) return {piece,anchor,...orientation};\r
    }\r
  }\r
  return null;\r
}\r
export function blokusScores(state) {\r
  return state.remaining.map((pieces,p)=>!state.players.includes(p)?0:pieces.length?-pieces.reduce((sum,i)=>sum+blokusPiece(i).cells.length,0):15+(state.last[p]%21===0?5:0));\r
}\r
export function placeBlokus(state,piece,cells,anchor) {\r
  const p=state.player;\r
  if(state.over||!state.remaining[p].includes(piece)||!canPlace(state,p,cells,anchor))return false;\r
  if(!orientations(piece,state.spatial).some(o=>JSON.stringify(o.cells)===JSON.stringify(normalize(cells))))return false;\r
  if(state.pieceIds?.length!==state.board.length)state.pieceIds=new Int32Array(state.board.length).fill(-1);\r
  const pieceId=Math.max(state.nextPieceId??0,1+state.pieceIds.reduce((max,id)=>Math.max(max,id),-1));\r
  state.nextPieceId=pieceId+1;\r
  for(const cell of cells){const index=index3(add(cell,anchor),state.dims);state.board[index]=p;state.pieceIds[index]=pieceId;}\r
  state.remaining[p]=state.remaining[p].filter(i=>i!==piece);\r
  state.placed[p]++;state.last[p]=piece;state.passes=0;state.turn++;\r
  state.player=nextPlayer(state);\r
  if(state.remaining.every(pieces=>pieces.length===0)) state.over=true;\r
  return true;\r
}\r
export function passBlokus(state) {\r
  if(state.over||findBlokusMove(state)) return false;\r
  state.passes++;state.turn++;state.player=nextPlayer(state);\r
  if(state.passes>=state.players.length) state.over=true;\r
  return true;\r
}\r
\r
export function createGame(ctx) {\r
  let spatial=true,dimensions=[10,10,5],state,selected=11,turns=0,flipped=false,cursor=[0,0,0],activeShape=[],hoverCell=null,botTimer=0,solo=true,lastFollow=null;\r
  let modeSelect,piecesEl,passButton,confirmButton,statusEl,spatialRotationRow,classicRotationRow,turnRow;\r
  const doc=ctx.ui.ownerDocument,shape=()=>spatial?activeShape:orientPiece(selected,'xy',turns,flipped);\r
  const hud=doc.createElement('div');hud.className='game-hud-score hud-blokus';ctx.hud?.append(hud);\r
  function button(text,action,className='small-button'){const el=doc.createElement('button');el.textContent=text;el.className=className;el.onclick=action;return el;}\r
  function row(...els){const el=doc.createElement('div');el.className='control-row';el.append(...els);ctx.ui.append(el);return el;}\r
  function select(options,action){const el=doc.createElement('select');for(const [value,label] of options){const o=doc.createElement('option');o.value=value;o.textContent=label;el.append(o);}el.onchange=()=>action(el.value);return el;}\r
  function world(p){return blokusLogicalToWorld(p,state.dims);}\r
  function follow(){if(!spatial)return;const target=world(cursor),key=target.join(',');if(key===lastFollow)return;lastFollow=key;ctx.spatial?.follow?.({target,weight:.3});}\r
  modeSelect=select([['3d','3D'],['2d','2D']],value=>{spatial=value==='3d';reset();});modeSelect.setAttribute('aria-label','BLOKUS mode');\r
  const players=select([['solo','You + 3 bots'],['local','Local players']],value=>{solo=value==='solo';botTimer=0;render();});players.setAttribute('aria-label','Players');row(modeSelect,players);\r
  row(button('↑ Move',()=>moveCursor('arrowup')),button('← Move',()=>moveCursor('arrowleft')),button('↓ Move',()=>moveCursor('arrowdown')),button('Move →',()=>moveCursor('arrowright')));\r
  turnRow=row(...[['left','A ↶'],['right','D ↷']].map(([direction,label])=>{const b=button(label,()=>{if(spatial)ctx.spatial?.turn?.(direction);});b.setAttribute('data-turn',direction);return b;}));\r
  spatialRotationRow=row(button('↻ X · Q',()=>rotate('x')),button('↻ Y · Z',()=>rotate('y')),button('↻ Z · C',()=>rotate('z')));\r
  classicRotationRow=row(button('↻ Q',()=>rotate('z')),button('↔ Z',()=>{flipped=!flipped;render();}));\r
  const lower=button('− Z',()=>changeHeight(-1)),higher=button('＋ Z',()=>changeHeight(1));lower.setAttribute('data-blokus-height','down');higher.setAttribute('data-blokus-height','up');row(lower,higher);\r
  row(button('Hint [H]',hint),confirmButton=button('Place [Enter]',placePreview,'primary-button'));row(passButton=button('Pass',pass),button('Restart',reset));\r
  statusEl=doc.createElement('p');statusEl.className='hint';statusEl.hidden=true;ctx.ui.append(statusEl);\r
  piecesEl=doc.createElement('div');piecesEl.className='piece-grid';piecesEl.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px';ctx.ui.append(piecesEl);\r
  const hintText=doc.createElement('p');hintText.className='hint';hintText.textContent='Right drag to orbit. A / D turn. Arrows move. Q / Z / C rotate; Shift reverses. PageUp / PageDown change height. Enter places';hintText.hidden=true;ctx.ui.append(hintText);\r
  ctx.setRules?.('<p>Start on your ground corner. Your separate pieces must meet at a corner or diagonal edge, never face to face, including vertically. In 3D, meet each touching opponent piece along an edge or face; a corner alone is not enough.</p><p>Every cell needs support: the ground, another color, or the same new rigid piece. A / D turn; Q / Z / C rotate; PageUp / PageDown change height; Enter places.</p><p>Pass only when blocked. Fewest unplaced cells wins. Place every piece for +15; finish with a single cell for +5 more.</p>');\r
  function selectPiece(i){selected=i;turns=0;flipped=false;activeShape=orientPiece3(i);render();}\r
  function refreshPieces(){\r
    piecesEl.replaceChildren();for(const i of state.remaining[state.player]){\r
      const p=blokusPiece(i),b=button('',()=>selectPiece(i),'piece-button'+(selected===i?' selected':''));b.setAttribute('aria-label',p.id+(i>=21?' #'+(Math.floor(i/21)+1):'')+', '+p.cells.length+' cells');b.style.cssText='min-height:58px;display:flex;align-items:center;gap:5px;padding:5px;border-color:'+(selected===i?COLORS[state.player]:'');\r
      const icon=doc.createElement('span');icon.style.cssText='display:grid;grid-template-columns:repeat(5,6px);grid-template-rows:repeat(5,6px);gap:1px;flex-shrink:0';\r
      for(const [u,v] of p.cells){const tile=doc.createElement('span');tile.style.cssText='grid-column:'+(u+1)+';grid-row:'+(v+1)+';background:'+COLORS[state.player]+';border-radius:1px';icon.append(tile);}\r
      const label=doc.createElement('span');label.textContent=p.id+(i>=21?'·'+(Math.floor(i/21)+1):'');b.append(icon,label);b.disabled=state.over||(solo&&state.player!==0);piecesEl.append(b);\r
    }\r
  }\r
  function render(){\r
    if(!state)return;const voxels=[],labels=[],dims=state.dims,selectedShape=shape(),preview=selectedShape.map(c=>add(c,cursor)),valid=canPlace(state,state.player,selectedShape,cursor);\r
    voxels.push({x:0,y:-.13,z:0,sx:dims[0]+.3,sy:.18,sz:dims[1]+.3,color:'#a6b6a3',boardBase:true});\r
    for(let y=0;y<dims[1];y++)for(let x=0;x<dims[0];x++){\r
      const p=[x,y,0],[wx,,wz]=world(p),corner=state.players.find(i=>equal(p,startingCorner(state,i)));\r
      voxels.push({x:wx,y:-.02,z:wz,sx:.96,sy:.05,sz:.96,color:corner!==undefined?COLORS[corner]:(x+y)%2?'#e0e7d9':'#edf0e5',data:{cell:p},ground:true});\r
      let highest=-1;\r
      for(let z=0;z<dims[2];z++){\r
        const cell=[x,y,z],owner=state.board[index3(cell,dims)];if(owner<0)continue;highest=z;\r
        const [px,py,pz]=world(cell);voxels.push({x:px,y:py,z:pz,sx:.91,sy:.91,sz:.91,color:COLORS[owner],data:{cell},piece:true});\r
      }\r
      // Pick the empty supported cell above a stack, never an arbitrary air voxel.\r
      if(spatial&&highest>=0&&highest+1<dims[2]){const cell=[x,y,highest+1],[px,py,pz]=world(cell);voxels.push({x:px,y:py-.44,z:pz,sx:.92,sy:.035,sz:.92,color:'#b4c4ad',opacity:.28,data:{cell,surface:true},placementSurface:true});}\r
    }\r
    if(spatial&&dims[2]>1){\r
      const px=-dims[0]/2-.3,pz=-dims[1]/2-.3;\r
      voxels.push({x:px,y:dims[2]/2,z:pz,sx:.018,sy:dims[2],sz:.018,color:'#90a68f',opacity:.32,heightGuide:true});\r
      const levels=[...new Set([0,Math.floor(dims[2]/2),dims[2]-1])];\r
      for(const level of levels){voxels.push({x:px+.09,y:level+.04,z:pz,sx:.2,sy:.014,sz:.014,color:'#90a68f',opacity:.4,heightGuide:true});labels.push({x:px-.2,y:level+.1,z:pz,text:String(level+1),size:.18,color:'#7c927d'});}\r
    }\r
    if(!state.over&&!(solo&&state.player!==0))for(const p of preview){const [x,y,z]=world(p);voxels.push({x,y,z,color:valid?COLORS[state.player]:'#e77d72',sx:.93,sy:.93,sz:.93,opacity:valid?.56:.25,data:inside(p,dims)?{cell:p,preview:true}:undefined,preview:true});}\r
    if(hoverCell&&!equal(hoverCell,cursor)){const [x,y,z]=world(hoverCell);voxels.push({x,y:y-.43,z,sx:.96,sy:.025,sz:.96,color:'#f6d688',opacity:.8,data:{cell:hoverCell},hover:true});}\r
    for(const i of state.players){const [x,,z]=world(startingCorner(state,i));labels.push({x,y:.09,z,text:'●',size:.26,color:COLORS[i],data:{cell:startingCorner(state,i)}});}\r
    ctx.setVoxels(voxels);ctx.setLabels(labels);refreshPieces();\r
    const scores=blokusScores(state),placedSquares=[0,1,2,3].map(player=>state.board.reduce((total,owner)=>total+Number(owner===player),0));\r
    hud.innerHTML=\`<span style="display:inline-flex;align-items:center;gap:7px" title="\${COLOR_NAMES[state.player]} · Pieces left" aria-label="\${COLOR_NAMES[state.player]} turn, \${state.remaining[state.player].length} pieces left"><i style="width:9px;height:9px;border-radius:50%;background:\${COLORS[state.player]};box-shadow:0 0 0 3px \${COLORS[state.player]}22"></i><svg aria-hidden="true" width="15" height="15" viewBox="0 0 15 15" fill="\${COLORS[state.player]}"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="1" y="8" width="6" height="6" rx="1"/><rect x="8" y="8" width="6" height="6" rx="1"/></svg><b>\${state.remaining[state.player].length}</b></span><span style="display:inline-flex;gap:11px;margin-left:16px;padding-left:15px;border-left:1px solid #53685926">\${placedSquares.map((count,i)=>\`<span style="display:inline-flex;align-items:center;gap:4px" title="\${COLOR_NAMES[i]} placed \${count} cells" aria-label="\${COLOR_NAMES[i]} placed \${count} cells"><i style="width:8px;height:8px;border-radius:2px;background:\${COLORS[i]}"></i><b>\${count}</b></span>\`).join('')}</span>\`;hud.style.color='#344b40';\r
    ctx.setStats({'Turn':state.turn+1,'Player':COLOR_NAMES[state.player]+(solo&&state.player!==0?' (bot)':''),'Pieces':state.remaining[state.player].length,'Ground X/Y · Height Z':cursor.map(v=>v+1).join(' / '),'Blue / Yellow / Red / Green':scores.join(' / ')});\r
    confirmButton.disabled=!valid||state.over||(solo&&state.player!==0);passButton.disabled=state.over||(solo&&state.player!==0);statusEl.textContent=state.over?'Game over. Restart to play again.':'Piece '+blokusPiece(selected).id+' · '+(spatial?'3D orientation':turns*90+'°'+(flipped?' flipped':''))+' · '+(valid?'Ready to place':'Invalid position');\r
    if(state.over){const max=Math.max(...state.players.map(p=>scores[p])),winners=scores.flatMap((s,i)=>s===max&&state.players.includes(i)?[COLOR_NAMES[i]]:[]);ctx.message(winners.join(' & ')+' '+(winners.length>1?'tie':'wins')+' · '+max+' points');}\r
  }\r
  function moveCursor(key){\r
    if(state.over||(solo&&state.player!==0))return;\r
    const delta=(spatial?ctx.spatial?.vectorForKey(key):null)??{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,0,-1],arrowdown:[0,0,1]}[key];if(!delta)return;\r
    const logical=blokusWorldVectorToLogical(delta),next=moveBlokusCursor(cursor,logical,state.dims);if(equal(next,cursor))return;cursor=next;hoverCell=null;render();follow();\r
  }\r
  function changeHeight(amount){if(!spatial||state.over||(solo&&state.player!==0))return;cursor[2]=Math.max(0,Math.min(state.dims[2]-1,cursor[2]+amount));hoverCell=null;render();}\r
  function rotate(axis,inverse=false){if(state.over||(solo&&state.player!==0))return;if(spatial)activeShape=rotateBlokusCells(activeShape,axis,inverse?-1:1);else turns=(turns+(inverse?3:1))%4;render();}\r
  function reset(){\r
    state=createBlokusState(spatial,spatial?dimensions:null);selected=state.remaining[0].includes(11)?11:state.remaining[0].at(-1)??0;turns=0;flipped=false;cursor=[0,0,0];activeShape=orientPiece3(selected);hoverCell=null;botTimer=0;lastFollow=null;\r
    modeSelect.value=spatial?'3d':'2d';spatialRotationRow.hidden=!spatial;classicRotationRow.hidden=spatial;turnRow.hidden=!spatial;ctx.message('Blue starts · Cover the blue corner');render();\r
    if(spatial&&ctx.spatial?.volume)ctx.spatial.volume({target:[0,Math.min(2,state.dims[2]/3),0],distance:Math.max(state.dims[0],state.dims[1],state.dims[2])*2.3,size:[state.dims[0],state.dims[2]+.3,state.dims[1]]});else ctx.frame({target:[0,0,0],distance:spatial?29:33,position:spatial?undefined:[0,33,.001]});\r
  }\r
  function next(){turns=0;flipped=false;selected=state.remaining[state.player].at(-1)??0;activeShape=orientPiece3(selected);botTimer=0;cursor=startingCorner(state,state.player);hoverCell=null;render();if(!solo||state.player===0)follow();}\r
  function hint(){\r
    if(state.over||(solo&&state.player!==0))return;const move=findBlokusMove(state,state.player,selected)??findBlokusMove(state);\r
    if(!move){ctx.message('No legal move · Pass');render();return;}\r
    selected=move.piece;cursor=[...move.anchor];activeShape=move.cells.map(c=>[...c]);turns=move.turns??0;flipped=move.flipped??false;hoverCell=null;render();follow();ctx.message('✓ '+blokusPiece(selected).id+' · Enter to place');\r
  }\r
  function placePreview(){\r
    if(state.over||(solo&&state.player!==0))return;if(!placeBlokus(state,selected,shape(),cursor)){ctx.message(placementError(state,state.player,shape(),cursor));ctx.sound?.('error');return;}ctx.sound?.('move');ctx.message(COLOR_NAMES[state.player]+' to play');next();\r
  }\r
  function pass(){if(state.over||(solo&&state.player!==0))return;if(!passBlokus(state)){ctx.message('A legal move is available.');hint();return;}ctx.message('No legal move · Next player.');next();}\r
  reset();\r
  return {reset,cameraTurns:['a','d'],mapSpatialBasis:mapBlokusSpatialBasis,getDimensions(){const [x,y,z]=state.dims;return {x,y,z};},setDimensions(value){dimensions=validateDimensions(value);spatial=true;reset();},getSelection(){const [x,y,z]=cursor;return {x,y,z};},cellPosition(data){return Array.isArray(data?.cell)&&inside(data.cell,state.dims)?[...data.cell]:null;},selectCell(data){if(Array.isArray(data?.cell)&&inside(data.cell,state.dims)){cursor=[...data.cell];hoverCell=null;render();}},render,\r
    update(dt){if(!solo||state.over||state.player===0)return;botTimer+=dt;if(botTimer<.65)return;botTimer=0;const move=findBlokusMove(state);if(move)placeBlokus(state,move.piece,move.cells,move.anchor);else passBlokus(state);ctx.message(state.player===0?'Blue to play · Enter to place':COLOR_NAMES[state.player]+' bot is playing…');next();},\r
    onPick(data){if(!inside(data?.cell,state.dims)||state.over||(solo&&state.player!==0))return;cursor=[...data.cell];hoverCell=null;if(spatial){render();follow();}else placePreview();},\r
    onHover(data){if(state.over||(solo&&state.player!==0))return;const next=inside(data?.cell,state.dims)?data.cell:null;if(JSON.stringify(next)===JSON.stringify(hoverCell))return;hoverCell=next?[...next]:null;render();},\r
    onKey(key,event){const normalized=key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown'].includes(normalized)){event?.preventDefault();moveCursor(normalized);}else if(normalized==='q')rotate(spatial?'x':'z',event?.shiftKey);else if(normalized==='z'){if(spatial)rotate('y',event?.shiftKey);else{flipped=!flipped;render();}}else if(normalized==='c'&&spatial)rotate('z',event?.shiftKey);else if(normalized==='pageup'){event?.preventDefault();changeHeight(1);}else if(normalized==='pagedown'){event?.preventDefault();changeHeight(-1);}else if(normalized==='h')hint();else if(normalized==='enter'){event?.preventDefault();if(!event?.repeat)placePreview();}},\r
    getState(){return {...state,inventory:[...state.inventory],players:[...state.players],dims:[...state.dims],remaining:state.remaining.map(p=>[...p]),placed:[...state.placed],last:[...state.last],board:Array.from(state.board),pieceIds:Array.from(state.pieceIds),selected,turns,flipped,hover:hoverCell?[...hoverCell]:null,cursor:[...cursor],shape:shape().map(c=>[...c]),preview:shape().map(c=>add(c,cursor)),placementValid:canPlace(state,state.player,shape(),cursor),solo,volume:spatial,groundAxes:['x','y'],heightAxis:'z',worldAxes:['x','z','-y'],inventoryCells:state.inventory.reduce((total,i)=>total+blokusPiece(i).cells.length,0),scores:blokusScores(state)};},dispose(){hud.remove?.();ctx.ui.replaceChildren();}\r
  };\r
}\r
`;export{e as default};
