const e=`// Authored Web adapter of the completed Turtle / CubeEngine Connect Four demo.\r
// Exact local sources, Apache-2.0 attribution and adaptations: references/connect4.md.\r
export const CONNECT4_DIRECTIONS = Object.freeze([\r
  [1,0,0], [0,1,0], [0,0,1],\r
  [1,1,0], [1,-1,0], [1,0,1], [1,0,-1], [0,1,1], [0,1,-1],\r
  [1,1,1], [1,1,-1], [1,-1,1], [1,-1,-1],\r
].map(direction=>Object.freeze(direction)));\r
\r
const PITCH = 1.18;\r
const COLORS = [null, '#ffcf24', '#ef4050'];\r
const NAMES = [null, 'Yellow', 'Red'];\r
const BLUE = '#1f6fce';\r
const inside = (cell,dimensions)=>Array.isArray(cell)&&cell.length===3&&cell.every((v,i)=>Number.isInteger(v)&&v>=0&&v<dimensions[i]);\r
const equal = (a,b)=>a?.every((v,i)=>v===b?.[i]);\r
export const connect4Index = ([x,y,z],[width,height])=>x+width*(y+height*z);\r
export const connect4Coordinates = (index,[width,height])=>[index%width,Math.floor(index/width)%height,Math.floor(index/(width*height))];\r
\r
const validateDimensions=value=>{const d=Array.isArray(value)?[...value]:[value?.x,value?.y,value?.z];if(d.length!==3||d.some(n=>!Number.isSafeInteger(n)||n<1)||d.reduce((a,b)=>a*b,1)>4096)throw new RangeError('XYZ must be positive integers, up to 4,096 cells.');return d;};\r
export function createConnectFourState(dimensions=[6,4,3]) {\r
  dimensions=validateDimensions(dimensions);\r
  return {dimensions:[...dimensions],board:new Uint8Array(dimensions.reduce((a,b)=>a*b,1)),player:1,winner:0,status:'playing',moves:0,lastMove:null,winningCells:[]};\r
}\r
\r
const validGravity=g=>Array.isArray(g)&&g.length===3&&g.every(n=>[-1,0,1].includes(n))&&g.filter(Boolean).length===1;\r
export function connect4LandingAt(state,selected,gravity=[0,-1,0]) {\r
  if(!inside(selected,state.dimensions)||!validGravity(gravity))return null;\r
  const axis=gravity.findIndex(Boolean),sign=gravity[axis],cell=[...selected];\r
  cell[axis]=sign<0?state.dimensions[axis]-1:0;\r
  if(state.board[connect4Index(cell,state.dimensions)])return null;\r
  let landing=[...cell];\r
  for(let n=1;n<state.dimensions[axis];n++){\r
    cell[axis]+=sign;if(state.board[connect4Index(cell,state.dimensions)])break;landing=[...cell];\r
  }\r
  return landing;\r
}\r
export function connect4Landing(state,x,z) {return connect4LandingAt(state,[x,0,z]);}\r
\r
export function findConnectFourLine(state,origin,owner=null) {\r
  if(!inside(origin,state.dimensions))return [];\r
  owner??=state.board[connect4Index(origin,state.dimensions)];\r
  if(!owner||state.board[connect4Index(origin,state.dimensions)]!==owner)return [];\r
  for(const direction of CONNECT4_DIRECTIONS) {\r
    const rays=[-1,1].map(sign=>{\r
      const cells=[];\r
      for(let step=1;;step++) {\r
        const p=origin.map((v,i)=>v+direction[i]*step*sign);\r
        if(!inside(p,state.dimensions)||state.board[connect4Index(p,state.dimensions)]!==owner)break;\r
        cells.push(p);\r
      }\r
      return cells;\r
    });\r
    const line=[...rays[0].reverse(),[...origin],...rays[1]];\r
    if(line.length>=4)return line.slice(Math.max(0,rays[0].length-3),Math.max(0,rays[0].length-3)+4);\r
  }\r
  return [];\r
}\r
\r
export function dropConnectFourAt(state,selected,gravity=[0,-1,0]) {\r
  if(state.status!=='playing')return null;\r
  const cell=connect4LandingAt(state,selected,gravity);\r
  if(!cell)return null;\r
  const player=state.player;\r
  state.board[connect4Index(cell,state.dimensions)]=player;\r
  state.moves++;\r
  state.lastMove={cell:[...cell],player};\r
  state.winningCells=findConnectFourLine(state,cell,player);\r
  if(state.winningCells.length) {state.status='win';state.winner=player;}\r
  else if(state.moves===state.board.length)state.status='draw';\r
  else state.player=3-player;\r
  return {cell:[...cell],player,status:state.status,winningCells:state.winningCells.map(p=>[...p])};\r
}\r
\r
export function dropConnectFour(state,x,z){return dropConnectFourAt(state,[x,0,z]);}\r
export function chooseConnectFourMove(state,gravity=[0,-1,0]) {\r
  if(state.status!=='playing'||!validGravity(gravity))return null;\r
  const axis=gravity.findIndex(Boolean),others=[0,1,2].filter(i=>i!==axis),candidates=[];\r
  for(let a=0;a<state.dimensions[others[0]];a++)for(let b=0;b<state.dimensions[others[1]];b++){\r
    const cell=[0,0,0];cell[others[0]]=a;cell[others[1]]=b;const landing=connect4LandingAt(state,cell,gravity);if(landing)candidates.push(landing);\r
  }\r
  // One-ply win / block policy, then favour central legal columns.\r
  for(const player of [state.player,3-state.player])for(const cell of candidates){const i=connect4Index(cell,state.dimensions);state.board[i]=player;const won=findConnectFourLine(state,cell,player).length>0;state.board[i]=0;if(won)return [...cell];}\r
  candidates.sort((a,b)=>others.reduce((sum,i)=>sum+Math.abs(a[i]-(state.dimensions[i]-1)/2)-Math.abs(b[i]-(state.dimensions[i]-1)/2),0));return candidates[0]??null;\r
}\r
\r
export function moveConnectFourCursor(cursor,delta,dimensions) {\r
  if(!Array.isArray(delta)||delta.length!==3||delta.some(n=>!Number.isInteger(n)))return [...cursor];\r
  return cursor.map((v,i)=>Math.max(0,Math.min(dimensions[i]-1,v+delta[i])));\r
}\r
\r
export function createGame(ctx) {\r
  const THREE=ctx.THREE,world=new THREE.Group(),geometries=new Set(),materials=new Set(),staticMeshes=[];\r
  world.name='connect4-world';ctx.group.add(world);\r
  let spatial=true,dimensions=[6,4,3],solo=false,aiTimer=0,state,cursor,hover=null,animation=null,disposed=false,boardKey='',pieces,instanceForCell=new Map(),lastFollow=null;\r
  const doc=ctx.ui.ownerDocument;\r
  const geo=geometry=>(geometries.add(geometry),geometry);\r
  const material=options=>{const value=new THREE.MeshStandardMaterial(options);materials.add(value);return value;};\r
  const lineMaterial=options=>{const value=new THREE.LineBasicMaterial(options);materials.add(value);return value;};\r
  const box=geo(new THREE.BoxGeometry(1,1,1)),sphere=geo(new THREE.SphereGeometry(.37,18,12)),disc=geo(new THREE.CylinderGeometry(.37,.37,.24,28)),emptyDisc=geo(new THREE.CylinderGeometry(.42,.42,.035,28));\r
  const socket=geo(new THREE.TorusGeometry(.435,.032,5,20)),edges=geo(new THREE.EdgesGeometry(box));\r
  const pieceMat=material({color:'#ffffff',roughness:.32,metalness:.08});\r
  const ringMat=material({color:BLUE,transparent:true,opacity:.15,depthWrite:false,roughness:.6});\r
  const frameMat=material({color:BLUE,roughness:.47,metalness:.04});\r
  const emptyMat=material({color:'#eef4fb',roughness:.7});\r
  const ghostMat=material({color:COLORS[1],transparent:true,opacity:.36,depthWrite:false,roughness:.35});\r
  const cursorMat=lineMaterial({color:'#d69a06',transparent:true,opacity:.92,depthWrite:false});\r
  const columnMat=lineMaterial({color:'#2ebd90',transparent:true,opacity:.65,depthWrite:false});\r
  const ghost=new THREE.Mesh(sphere,ghostMat);ghost.name='connect4-landing-ghost';ghost.renderOrder=3;\r
  const cursorBox=new THREE.LineSegments(edges,cursorMat);cursorBox.name='connect4-cursor';\r
  const columnBox=new THREE.LineSegments(edges,columnMat);columnBox.name='connect4-gravity-column';\r
  const winMat=new THREE.MeshBasicMaterial({color:'#ffc43d',transparent:true,opacity:.9,depthTest:false,depthWrite:false});materials.add(winMat);\r
  const winMesh=new THREE.Mesh(geo(new THREE.CylinderGeometry(.045,.045,1,10)),winMat);winMesh.name='connect4-winning-line';winMesh.visible=false;winMesh.renderOrder=6;\r
  world.add(ghost,cursorBox,columnBox,winMesh);\r
  const temp=new THREE.Object3D(),color=new THREE.Color(),identity=new THREE.Quaternion();\r
  const worldPosition=cell=>cell.map((v,i)=>(v-(state.dimensions[i]-1)/2)*PITCH);\r
  const gravity=()=>spatial?(ctx.spatial?.basis?.()?.up??[0,1,0]).map(n=>n===0?0:-n):[0,-1,0];\r
  const landingAt=cell=>connect4LandingAt(state,cell,gravity());\r
  const humanTurn=()=>!solo||state.player===1;\r
  const hud=doc.createElement('div');hud.className='game-hud-score hud-connect4';ctx.hud?.append(hud);\r
  const button=(text,action,primary=false)=>{\r
    const el=doc.createElement('button');el.textContent=text;el.className=primary?'primary-button':'small-button';el.onclick=action;return el;\r
  };\r
  const row=(...children)=>{const el=doc.createElement('div');el.className='control-row';el.append(...children);ctx.ui.append(el);return el;};\r
  const select=(label,options,action)=>{\r
    const wrapper=doc.createElement('label');wrapper.textContent=label+' ';wrapper.className='control-group';\r
    const el=doc.createElement('select');for(const [value,text]of options){const option=doc.createElement('option');option.value=value;option.textContent=text;el.append(option);}el.onchange=()=>action(el.value);wrapper.append(el);ctx.ui.append(wrapper);return {el,wrapper};\r
  };\r
  const modeSelect=select('Game mode',[['spatial','3D'],['classic','2D']],value=>{spatial=value==='spatial';reset(true);});\r
  const opponentSelect=select('♟',[['local','2P'],['ai','1P · AI']],value=>{solo=value==='ai';reset(false);});opponentSelect.el.setAttribute('aria-label','Connect Four opponent');\r
  row(button('↑',()=>move('arrowup')));\r
  row(button('←',()=>move('arrowleft')),button('↓',()=>move('arrowdown')),button('→',()=>move('arrowright')));\r
  const turnRows=[\r
    row(button('W',()=>turn('up')),button('S',()=>turn('down'))),\r
    row(button('A',()=>turn('left')),button('D',()=>turn('right'))),\r
  ];\r
  const dropButton=button('Drop · Enter',drop,true);row(dropButton,button('Restart',()=>reset(false)));\r
  const status=doc.createElement('p');status.className='hint';status.hidden=true;ctx.ui.append(status);\r
  const controls=doc.createElement('p');controls.className='hint';controls.hidden=true;ctx.ui.append(controls);\r
\r
  function matrix(mesh,index,position,scale=[1,1,1],rotation=identity) {\r
    temp.position.set(...position);temp.scale.set(...scale);temp.quaternion.copy(rotation);temp.updateMatrix();mesh.setMatrixAt(index,temp.matrix);\r
  }\r
  function addStatic(mesh,name) {mesh.name=name;world.add(mesh);staticMeshes.push(mesh);return mesh;}\r
  function clearStatic() {\r
    for(const mesh of staticMeshes){world.remove(mesh);if(mesh.isInstancedMesh)mesh.dispose();if(mesh.userData.ownGeometry){geometries.delete(mesh.geometry);mesh.geometry.dispose();}}\r
    staticMeshes.length=0;pieces=null;instanceForCell.clear();\r
  }\r
  function buildBoard() {\r
    const key=\`\${spatial}/\${state.dimensions.join('x')}\`;\r
    if(key===boardKey)return;\r
    boardKey=key;clearStatic();\r
    const [w,h,d]=state.dimensions,cells=Array.from({length:w*h*d},(_,index)=>connect4Coordinates(index,state.dimensions));\r
    if(spatial) {\r
      // Three intersecting circular socket rings make every cell a real cage,\r
      // readable from all faces without placing an opaque blue sheet inside it.\r
      const rotations=[identity,new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2)];\r
      for(let axis=0;axis<3;axis++) {\r
        const mesh=addStatic(new THREE.InstancedMesh(socket,ringMat,cells.length),\`connect4-sockets-\${['xy','yz','xz'][axis]}\`);\r
        mesh.userData.socketRotation=rotations[axis];\r
        mesh.userData.pickCells=cells.map(cell=>({cell}));\r
        cells.forEach((cell,index)=>matrix(mesh,index,worldPosition(cell),[1,1,1],rotations[axis]));\r
        mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();\r
      }\r
      const voxels=cells.map(cell=>{const [x,y,z]=worldPosition(cell);return {x,y,z,sx:.94,sy:.94,sz:.94,color:BLUE,opacity:.01,pickOnly:true,data:{cell}};});\r
      ctx.setVoxels(voxels);\r
      const beams=[];\r
      for(let axis=0;axis<3;axis++)for(const a of [-1,1])for(const b of [-1,1]) {\r
        const position=[0,0,0],scale=[.12,.12,.12];scale[axis]=state.dimensions[axis]*PITCH+.12;\r
        position[(axis+1)%3]=a*state.dimensions[(axis+1)%3]*PITCH/2;position[(axis+2)%3]=b*state.dimensions[(axis+2)%3]*PITCH/2;beams.push({position,scale});\r
      }\r
      const frame=addStatic(new THREE.InstancedMesh(box,frameMat,beams.length),'connect4-blue-cube-frame');\r
      beams.forEach(({position,scale},index)=>matrix(frame,index,position,scale));frame.instanceMatrix.needsUpdate=true;frame.computeBoundingSphere();\r
    } else {\r
      ctx.setVoxels([]);\r
      const width=w*PITCH+.18,height=h*PITCH+.18,shape=new THREE.Shape();\r
      shape.moveTo(-width/2,-height/2);shape.lineTo(width/2,-height/2);shape.lineTo(width/2,height/2);shape.lineTo(-width/2,height/2);shape.closePath();\r
      for(const cell of cells){const [x,y]=worldPosition(cell),hole=new THREE.Path();hole.absarc(x,y,.445,0,Math.PI*2,true);shape.holes.push(hole);}\r
      const plate=addStatic(new THREE.Mesh(geo(new THREE.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.035,bevelThickness:.035,curveSegments:16})),frameMat),'connect4-classic-blue-plate');\r
      plate.position.z=-.09;plate.userData.ownGeometry=true;\r
      const sockets=addStatic(new THREE.InstancedMesh(emptyDisc,emptyMat,cells.length),'connect4-classic-sockets');sockets.userData.pickCells=cells.map(cell=>({cell}));\r
      const face=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2);\r
      sockets.userData.socketRotation=face;\r
      cells.forEach((cell,index)=>{const p=worldPosition(cell);p[2]=-.1;matrix(sockets,index,p,[1,1,1],face);});sockets.instanceMatrix.needsUpdate=true;sockets.computeBoundingSphere();\r
    }\r
    pieces=addStatic(new THREE.InstancedMesh(spatial?sphere:disc,pieceMat,cells.length),'connect4-pieces');pieces.count=0;pieces.frustumCulled=false;pieces.instanceMatrix.setUsage(THREE.DynamicDrawUsage);\r
    ghost.geometry=spatial?sphere:disc;\r
    ghost.rotation.x=spatial?0:Math.PI/2;\r
    ctx.setLabels([]);\r
  }\r
\r
  function renderPieces() {\r
    for(const mesh of staticMeshes)if(mesh.userData.socketRotation){\r
      mesh.userData.pickCells.forEach(({cell},index)=>{const occupied=state.board[connect4Index(cell,state.dimensions)]!==0,position=worldPosition(cell);if(!spatial)position[2]=-.1;matrix(mesh,index,position,occupied?[0,0,0]:[1,1,1],mesh.userData.socketRotation);});\r
      mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();\r
    }\r
    const winning=new Set(state.winningCells.map(p=>connect4Index(p,state.dimensions))),pickCells=[];instanceForCell.clear();let count=0;\r
    for(let index=0;index<state.board.length;index++) {\r
      const owner=state.board[index];if(!owner)continue;\r
      const cell=connect4Coordinates(index,state.dimensions),position=worldPosition(cell);\r
      if(!spatial)position[2]=.06;\r
      if(animation&&index===animation.index)position[animation.axis]=animation.current;\r
      const rotation=spatial?identity:new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2),scale=winning.has(index)?1.1:1;\r
      matrix(pieces,count,position,[scale,scale,scale],rotation);pieces.setColorAt(count,color.set(COLORS[owner]));instanceForCell.set(index,count);pickCells.push({cell});count++;\r
    }\r
    pieces.count=count;pieces.userData.pickCells=pickCells;pieces.instanceMatrix.needsUpdate=true;if(pieces.instanceColor)pieces.instanceColor.needsUpdate=true;pieces.computeBoundingSphere();\r
    winMesh.visible=spatial&&state.status==='win'&&!animation;\r
    if(winMesh.visible) {\r
      const start=new THREE.Vector3(...worldPosition(state.winningCells[0])),end=new THREE.Vector3(...worldPosition(state.winningCells.at(-1)));\r
      winMesh.position.copy(start).add(end).multiplyScalar(.5);winMesh.scale.set(1,start.distanceTo(end),1);\r
      winMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.sub(start).normalize());\r
    }\r
  }\r
  function renderSelection() {\r
    const selected=hover??cursor,position=worldPosition(selected),landing=landingAt(selected),available=state.status==='playing'&&!animation&&humanTurn(),g=gravity(),axis=g.findIndex(Boolean);\r
    cursorBox.position.set(...position);cursorBox.scale.set(.99,.99,spatial?.99:.34);cursorBox.visible=available;\r
    cursorMat.color.set(landing?'#d69a06':'#ed4051');\r
    const columnPosition=[...position],columnScale=[.98,.98,spatial?.98:.4];columnPosition[axis]=0;columnScale[axis]=state.dimensions[axis]*PITCH;columnBox.position.set(...columnPosition);columnBox.scale.set(...columnScale);columnBox.visible=available;\r
    columnMat.color.set(landing?'#1dbd8c':'#ed4051');\r
    ghost.visible=available&&!!landing;\r
    if(landing){const p=worldPosition(landing);if(!spatial)p[2]=.09;ghost.position.set(...p);ghostMat.color.set(COLORS[state.player]);}\r
    dropButton.disabled=!available||!landingAt(cursor);\r
    const end=state.status==='win'?\`\${NAMES[state.winner]} connects four!\`:state.status==='draw'?'Full board. Draw.':animation?\`\${NAMES[animation.player]} dropping…\`:\`\${NAMES[state.player]} to drop.\`;\r
    ctx.setStats({'Turn':state.status==='win'?NAMES[state.winner]+' wins':state.status==='draw'?'Draw':NAMES[state.player],'Moves':\`\${state.moves} / \${state.board.length}\`,'Cell XYZ':cursor.map(n=>n+1).join(' / '),'Gravity':\`\${g[axis]<0?'−':'+'}\${'XYZ'[axis]}\`,'Board':state.dimensions.join(' × ')});\r
    hud.textContent=\`\${state.status==='win'?NAMES[state.winner]+' WIN':state.status==='draw'?'DRAW':state.player===1?'● Yellow':'● Red'} · \${state.moves}　↓ \${g[axis]<0?'−':'+'}\${'XYZ'[axis]}\`;hud.style.color=state.player===1?'#936600':'#b63646';\r
    status.textContent=end+(state.status!=='playing'||animation?'':landing?\` \${landing.map(n=>n+1).join(' / ')}.\`:' Full column.');\r
  }\r
  function follow(cell,weight=.22) {\r
    if(!spatial||!ctx.spatial?.follow)return;\r
    const target=worldPosition(cell),key=target.join(',');if(key===lastFollow)return;lastFollow=key;ctx.spatial.follow({target,weight});\r
  }\r
  function followFallingPiece() {\r
    if(!spatial||!animation||!ctx.spatial?.follow)return;\r
    const target=worldPosition(animation.cell);target[animation.axis]=animation.current;lastFollow=target.join(',');ctx.spatial.follow({target,weight:.13});\r
  }\r
  function finishMessage() {\r
    if(state.status==='win'){ctx.message(\`\${NAMES[state.winner]} wins ✓\`);ctx.sound?.('win');}\r
    else if(state.status==='draw'){ctx.message('Full board · Draw');ctx.sound?.('clear');}\r
    else ctx.message(\`Turn \${NAMES[state.player]} · Enter → place\`);\r
  }\r
  function drop(ai=false) {\r
    if(disposed||animation||state.status!=='playing'||(ai!==true&&!humanTurn()))return;\r
    const g=gravity(),axis=g.findIndex(Boolean),result=dropConnectFourAt(state,cursor,g);\r
    if(!result){ctx.message('Full column. Choose another.');ctx.sound?.('error');renderSelection();return;}\r
    hover=null;cursor=[...result.cell];\r
    const start=(g[axis]<0?state.dimensions[axis]/2+.7:-state.dimensions[axis]/2-.7)*PITCH,end=worldPosition(result.cell)[axis];\r
    animation={...result,index:connect4Index(result.cell,state.dimensions),axis,elapsed:0,duration:Math.min(.55,.2+Math.sqrt(Math.abs(start-end)/PITCH)*.1),start,end,current:start};\r
    renderPieces();renderSelection();followFallingPiece();ctx.sound?.('move');ctx.message(\`\${NAMES[result.player]} ↓ \${g[axis]<0?'−':'+'}\${'XYZ'[axis]}\`);\r
\r
  }\r
  function move(key) {\r
    if(disposed||animation||state.status!=='playing'||!humanTurn())return;\r
    const delta=(spatial?ctx.spatial?.vectorForKey?.(key):null)??{arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,1,0],arrowdown:[0,-1,0]}[key];\r
    if(!delta)return;\r
    const next=moveConnectFourCursor(cursor,delta,state.dimensions);if(equal(cursor,next))return;cursor=next;hover=null;renderSelection();follow(cursor);\r
  }\r
  function turn(direction){if(spatial&&!disposed)ctx.spatial?.turn?.(direction);}\r
  function reset(fit=false) {\r
    if(disposed)return;\r
    state=createConnectFourState(spatial?dimensions:[7,6,1]);cursor=[Math.floor(state.dimensions[0]/2),state.dimensions[1]-1,Math.floor(state.dimensions[2]/2)];aiTimer=0;hover=null;animation=null;lastFollow=null;\r
    modeSelect.el.value=spatial?'spatial':'classic';opponentSelect.el.value=solo?'ai':'local';turnRows.forEach(el=>el.hidden=!spatial);\r
    buildBoard();renderPieces();renderSelection();\r
    controls.textContent='Arrows → column · Enter → drop · X → slice · Z → all';\r
    if(fit) {\r
      const [w,h,d]=state.dimensions,settings={target:[0,0,0],distance:Math.max(w,h,d)*PITCH*2.65,size:[w*PITCH+.3,h*PITCH+1.8,d*PITCH+.3]};\r
      if(spatial&&ctx.spatial?.volume)ctx.spatial.volume(settings);else ctx.frame({...settings,position:spatial?undefined:[0,0,settings.distance]});\r
    }\r
    ctx.message('Yellow starts. Connect four.');\r
  }\r
  ctx.setRules?.('<p>Connect four on any axis or diagonal. Play against AI or a friend. XYZ is customisable.</p><p>New pieces fall toward screen-down. Rotate to change gravity. Arrows select; click or Enter drops. X slices, Z restores all cells.</p>');\r
  reset(true);\r
  return {\r
    reset(){reset(false);},getDimensions(){const [x,y,z]=state.dimensions;return {x,y,z};},setDimensions(value){dimensions=validateDimensions(value);spatial=true;reset(true);},getSelection(){const [x,y,z]=cursor;return {x,y,z};},cellPosition(data){return inside(data?.cell,state.dimensions)?[...data.cell]:null;},selectCell(data){if(inside(data?.cell,state.dimensions)){cursor=[...data.cell];hover=null;renderSelection();}},onCameraChange(){renderSelection();},render(){buildBoard();renderPieces();renderSelection();},\r
    update(dt) {\r
      if(disposed)return;if(!animation){if(solo&&state.player===2&&state.status==='playing'){aiTimer+=dt;if(aiTimer>=.45){aiTimer=0;const move=chooseConnectFourMove(state,gravity());if(move){cursor=move;drop(true);}}}return;}\r
      animation.elapsed+=Math.max(0,Math.min(.05,Number.isFinite(dt)?dt:0));const t=Math.min(1,animation.elapsed/animation.duration);\r
      animation.current=t===1?animation.end:animation.start+(animation.end-animation.start)*t*t;\r
      const index=instanceForCell.get(animation.index),position=worldPosition(animation.cell);position[animation.axis]=animation.current;if(!spatial)position[2]=.06;\r
      matrix(pieces,index,position,[1,1,1],spatial?identity:new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2));pieces.instanceMatrix.needsUpdate=true;followFallingPiece();\r
      if(t===1){animation=null;renderPieces();renderSelection();finishMessage();}\r
    },\r
    onPick(data) {if(disposed||animation||state.status!=='playing'||!humanTurn()||!inside(data?.cell,state.dimensions))return;cursor=[...data.cell];hover=null;drop();},\r
    onHover(data) {if(disposed||animation||state.status!=='playing')return;const cell=inside(data?.cell,state.dimensions)?[...data.cell]:null;if((!cell&&!hover)||equal(cell,hover))return;hover=cell;renderSelection();},\r
    onKey(key,event) {const normalized=key.toLowerCase();if(normalized.startsWith('arrow')){event?.preventDefault();move(normalized);}else if(normalized==='enter'||normalized===' '){event?.preventDefault();drop();}},\r
    getState(){return {...state,board:Array.from(state.board),dimensions:[...state.dimensions],lastMove:state.lastMove?{cell:[...state.lastMove.cell],player:state.lastMove.player}:null,winningCells:state.winningCells.map(cell=>[...cell]),playerName:state.player===1?'yellow':'red',winnerName:state.winner?state.winner===1?'yellow':'red':null,spatial,volume:spatial,fullVolume:spatial,cursor:[...cursor],hover:hover?[...hover]:null,landing:landingAt(cursor),falling:animation?{cell:[...animation.cell],player:animation.player,axis:animation.axis,worldPosition:animation.current,worldY:animation.axis===1?animation.current:worldPosition(animation.cell)[1]}:null,gravity:gravity(),opponent:solo?'ai':'local',aiThinking:solo&&state.player===2&&state.status==='playing',pitch:PITCH};},\r
    dispose(){if(disposed)return;disposed=true;clearStatic();ctx.group.remove(world);geometries.forEach(geometry=>geometry.dispose());materials.forEach(value=>value.dispose());ctx.ui.replaceChildren();},\r
  };\r
}\r
`;export{e as default};
