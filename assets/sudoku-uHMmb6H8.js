const e=`const ALL = 0b111111111;\r
const constraintCache = new Map();\r
export function sudokuIndex(x,y,z,volume=true){return volume?x+6*(z+6*y):x+9*z;}\r
export function sudokuCoordinates(index,volume=true){return volume?{x:index%6,y:Math.floor(index/36),z:Math.floor(index/6)%6}:{x:index%9,y:0,z:Math.floor(index/9)};}\r
function shuffled(values,rng){const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}\r
\r
export function sudokuConstraints(volume=true){\r
  volume=!!volume;if(constraintCache.has(volume))return constraintCache.get(volume);\r
  const groups=[],kinds=[],push=(cells,kind)=>{groups.push(cells);kinds.push(kind);};\r
  if(volume){\r
    for(let y=0;y<6;y++)for(let z=0;z<6;z++)push(Array.from({length:6},(_,x)=>sudokuIndex(x,y,z)),'axis-x');\r
    for(let x=0;x<6;x++)for(let z=0;z<6;z++)push(Array.from({length:6},(_,y)=>sudokuIndex(x,y,z)),'axis-y');\r
    for(let x=0;x<6;x++)for(let y=0;y<6;y++)push(Array.from({length:6},(_,z)=>sudokuIndex(x,y,z)),'axis-z');\r
    for(let bx=0;bx<2;bx++)for(let by=0;by<2;by++)for(let bz=0;bz<2;bz++)for(const axis of ['x','y','z'])for(let fixed=0;fixed<3;fixed++){\r
      const cells=[];for(let a=0;a<3;a++)for(let b=0;b<3;b++){const p=axis==='x'?{x:fixed,y:a,z:b}:axis==='y'?{x:a,y:fixed,z:b}:{x:a,y:b,z:fixed};cells.push(sudokuIndex(bx*3+p.x,by*3+p.y,bz*3+p.z));}push(cells,\`block-plane-\${axis}\`);\r
    }\r
  }else{\r
    for(let z=0;z<9;z++)push(Array.from({length:9},(_,x)=>sudokuIndex(x,0,z,false)),'row');\r
    for(let x=0;x<9;x++)push(Array.from({length:9},(_,z)=>sudokuIndex(x,0,z,false)),'column');\r
    for(let bx=0;bx<3;bx++)for(let bz=0;bz<3;bz++){const cells=[];for(let z=0;z<3;z++)for(let x=0;x<3;x++)cells.push(sudokuIndex(bx*3+x,0,bz*3+z,false));push(cells,'box');}\r
  }\r
  const membership=Array.from({length:volume?216:81},()=>[]);groups.forEach((cells,g)=>cells.forEach(index=>membership[index].push(g)));\r
  const result={groups,membership,kinds,layers:volume?6:1,size:volume?6:9,digits:9};constraintCache.set(volume,result);return result;\r
}\r
export function sudokuConflicts(board,volume=true){\r
  const conflicts=new Set(),{groups,membership}=sudokuConstraints(volume);if(board.length!==membership.length)return new Set(board.map((_,i)=>i));\r
  board.forEach((value,index)=>{if(!Number.isInteger(value)||value<0||value>9)conflicts.add(index);});\r
  for(const cells of groups){const seen=new Map();for(const index of cells){const value=board[index];if(!value)continue;if(seen.has(value)){conflicts.add(index);conflicts.add(seen.get(value));}else seen.set(value,index);}}\r
  return conflicts;\r
}\r
export function sudokuSolved(board,volume=true){return board.length===(volume?216:81)&&board.every(v=>Number.isInteger(v)&&v>=1&&v<=9)&&sudokuConflicts(board,volume).size===0;}\r
\r
/** A timeout is never accepted as a uniqueness proof. Masks include all nine digits. */\r
export function countSudokuSolutions(input,volume=true,{limit=2,maxNodes=20000}={}){\r
  const {membership,groups}=sudokuConstraints(volume),board=[...input],masks=new Uint16Array(groups.length);let count=0,nodes=0,aborted=false,solution=null;\r
  if(board.length!==membership.length)return {count:0,complete:true,nodes,solution};\r
  for(let i=0;i<board.length;i++){const value=board[i];if(!Number.isInteger(value)||value<0||value>9)return {count:0,complete:true,nodes,solution};if(!value)continue;const bit=1<<(value-1);if(membership[i].some(g=>masks[g]&bit))return {count:0,complete:true,nodes,solution};for(const g of membership[i])masks[g]|=bit;}\r
  function search(){\r
    if(count>=limit||aborted)return;if(++nodes>maxNodes){aborted=true;return;}\r
    let best=-1,bestMask=0,bestCount=10;\r
    for(let i=0;i<board.length;i++){if(board[i])continue;let used=0;for(const g of membership[i])used|=masks[g];const available=ALL&~used;if(!available)return;let amount=0;for(let b=available;b;b&=b-1)amount++;if(amount<bestCount){best=i;bestMask=available;bestCount=amount;}if(amount===1)break;}\r
    if(best===-1){count++;if(!solution)solution=[...board];return;}\r
    for(let value=1;value<=9;value++){const bit=1<<(value-1);if(!(bestMask&bit))continue;board[best]=value;for(const g of membership[best])masks[g]|=bit;search();for(const g of membership[best])masks[g]&=~bit;board[best]=0;if(count>=limit||aborted)break;}\r
  }\r
  search();return {count,complete:!aborted,nodes,solution};\r
}\r
function coordinatePermutation(size,rng){const blocks=shuffled(Array.from({length:size/3},(_,i)=>i),rng);return blocks.flatMap(b=>shuffled([b*3,b*3+1,b*3+2],rng));}\r
export function generateSudoku({volume=true,rng=Math.random,holes=volume?96:42}={}){\r
  const digits=shuffled([1,2,3,4,5,6,7,8,9],rng),solution=[];\r
  if(volume){\r
    const maps=Array.from({length:3},()=>coordinatePermutation(6,rng)),axes=shuffled([0,1,2],rng);\r
    for(let y=0;y<6;y++)for(let z=0;z<6;z++)for(let x=0;x<6;x++){\r
      const original=[maps[0][x],maps[1][y],maps[2][z]],[u,v,w]=axes.map(a=>original[a]);\r
      const a=(u%3+w%3+Math.floor(v/3)+Math.floor(w/3))%3,b=(v%3+w%3+Math.floor(u/3))%3;solution.push(digits[a+3*b]);\r
    }\r
  }else{\r
    const rows=coordinatePermutation(9,rng),columns=coordinatePermutation(9,rng),transpose=rng()<.5;\r
    for(let row=0;row<9;row++)for(let column=0;column<9;column++){const x=transpose?rows[row]:columns[column],z=transpose?columns[column]:rows[row];solution.push(digits[(x+z*3+Math.floor(z/3))%9]);}\r
  }\r
  const clues=[...solution];let removed=0,rejectedBudget=0;\r
  for(const index of shuffled(clues.map((_,i)=>i),rng)){if(removed>=holes)break;const value=clues[index];clues[index]=0;const proof=countSudokuSolutions(clues,volume,{maxNodes:4000});if(proof.complete&&proof.count===1)removed++;else{clues[index]=value;if(!proof.complete)rejectedBudget++;}}\r
  return {solution,clues,volume,unique:true,removed,rejectedBudget};\r
}\r
export function validSudokuDimensions(d){return d&&['x','y','z'].every(a=>Number.isSafeInteger(d[a])&&d[a]>0)&&Number.isSafeInteger(d.x*d.y*d.z);}\r
export const dimensionSudokuIndex=(x,y,z,d)=>x+d.x*(z+d.z*y);\r
export const dimensionSudokuCoordinates=(index,d)=>({x:index%d.x,y:Math.floor(index/(d.x*d.z)),z:Math.floor(index/d.x)%d.z});\r
export function dimensionSudokuConstraints(d){\r
  if(!validSudokuDimensions(d))throw new RangeError('XYZ must be positive integers.');\r
  if(d.x===6&&d.y===6&&d.z===6)return sudokuConstraints(true);\r
  const groups=[],membership=Array.from({length:d.x*d.y*d.z},()=>[]),blockPlanes=Math.max(d.x,d.y,d.z)<=9&&Object.values(d).filter(n=>n>=3).length>=2;\r
  for(const axis of ['x','y','z']){const other=['x','y','z'].filter(a=>a!==axis);for(let a=0;a<d[other[0]];a++)for(let b=0;b<d[other[1]];b++){\r
    const line=[];for(let n=0;n<d[axis];n++){const p={[axis]:n,[other[0]]:a,[other[1]]:b};line.push(dimensionSudokuIndex(p.x,p.y,p.z,d));}const id=groups.length;groups.push(line);line.forEach(i=>membership[i].push(id));\r
  }}\r
  if(blockPlanes)for(let bx=0;bx<d.x;bx+=3)for(let by=0;by<d.y;by+=3)for(let bz=0;bz<d.z;bz+=3)for(const axis of ['x','y','z'])for(let fixed=0;fixed<Math.min(3,d[axis]-({x:bx,y:by,z:bz}[axis]));fixed++){\r
    const origin={x:bx,y:by,z:bz},others=['x','y','z'].filter(a=>a!==axis),line=[];\r
    for(let a=0;a<Math.min(3,d[others[0]]-origin[others[0]]);a++)for(let b=0;b<Math.min(3,d[others[1]]-origin[others[1]]);b++){const p={...origin,[axis]:origin[axis]+fixed,[others[0]]:origin[others[0]]+a,[others[1]]:origin[others[1]]+b};line.push(dimensionSudokuIndex(p.x,p.y,p.z,d));}\r
    const id=groups.length;groups.push(line);line.forEach(i=>membership[i].push(id));\r
  }\r
  return {groups,membership,digits:blockPlanes?9:Math.max(d.x,d.y,d.z),kinds:groups.map(()=> 'axis'),ruleVariant:blockPlanes?'block-3-clipped':'latin-axis'};\r
}\r
export function dimensionSudokuConflicts(board,d){const {groups,digits,membership}=dimensionSudokuConstraints(d),bad=new Set();if(board.length!==membership.length)return new Set(board.map((_,i)=>i));board.forEach((v,i)=>{if(!Number.isInteger(v)||v<0||v>digits)bad.add(i);});for(const group of groups){const found=new Map();for(const i of group){if(!board[i])continue;if(found.has(board[i])){bad.add(i);bad.add(found.get(board[i]));}else found.set(board[i],i);}}return bad;}\r
export function generateDimensionSudoku(dimensions,{rng=Math.random,holes=Math.floor(dimensions.x*dimensions.y*dimensions.z*.42)}={}){\r
  if(!validSudokuDimensions(dimensions))throw new RangeError('XYZ must be positive integers.');\r
  if(dimensions.x===6&&dimensions.y===6&&dimensions.z===6)return {...generateSudoku({rng,holes}),dimensions:{...dimensions},digits:9,ruleVariant:'block-3'};\r
  const {groups,membership,digits,ruleVariant}=dimensionSudokuConstraints(dimensions),palette=shuffled(Array.from({length:digits},(_,i)=>i+1),rng),solution=membership.map((_,i)=>{const p=dimensionSudokuCoordinates(i,dimensions);if(ruleVariant==='block-3-clipped'){const a=(p.x%3+p.z%3+Math.floor(p.y/3)+Math.floor(p.z/3))%3,b=(p.y%3+p.z%3+Math.floor(p.x/3))%3;return palette[a+3*b];}return palette[(p.x+p.y+p.z)%digits];}),clues=[...solution];let removed=0;\r
  // Reversing this forced-value removal sequence proves uniqueness.\r
  for(const index of shuffled(solution.map((_,i)=>i),rng)){if(removed>=holes)break;const seen=new Set(membership[index].flatMap(g=>groups[g]).filter(i=>i!==index).map(i=>clues[i]).filter(Boolean));if(seen.size===digits-1){clues[index]=0;removed++;}}\r
  return {solution,clues,dimensions:{...dimensions},volume:true,digits,ruleVariant,unique:true,removed};\r
}\r
export class SudokuGame{\r
  constructor(options={}){this.newPuzzle(options);}\r
  newPuzzle(options={}){const puzzle=options.puzzle||(options.dimensions?generateDimensionSudoku(options.dimensions,options):options.volume===false?generateSudoku(options):generateDimensionSudoku({x:3,y:3,z:3},options));this.volume=puzzle.volume;this.dimensions=puzzle.dimensions??(this.volume?{x:6,y:6,z:6}:{x:9,y:1,z:9});this.digits=puzzle.digits??9;this.ruleVariant=puzzle.ruleVariant??(this.volume?'block-3':'classic');this.solution=[...puzzle.solution];this.clues=[...puzzle.clues];if(options.puzzle){const proof=countSudokuSolutions(this.clues,this.volume);this.unique=proof.complete&&proof.count===1;}else this.unique=puzzle.unique;this.restart();}\r
  conflicts(){return ['latin-axis','block-3-clipped'].includes(this.ruleVariant)?dimensionSudokuConflicts(this.board,this.dimensions):sudokuConflicts(this.board,this.volume);}\r
  isSolved(){return this.board.every(v=>Number.isInteger(v)&&v>0&&v<=this.digits)&&this.conflicts().size===0;}\r
  restart(){this.board=[...this.clues];this.notes=this.board.map(()=>[]);this.history=[];this.elapsed=0;this.started=false;this.hints=0;this.moves=0;this.won=this.isSolved();}\r
  set(index,value,asNote=false){\r
    if(this.won||!Number.isInteger(index)||index<0||index>=this.board.length||this.clues[index]||!Number.isInteger(value)||value<0||value>this.digits)return false;\r
    if(asNote&&value&&this.board[index])return false;const old={index,value:this.board[index],notes:[...this.notes[index]],hints:this.hints};\r
    if(asNote&&value){const notes=this.notes[index];this.notes[index]=notes.includes(value)?notes.filter(n=>n!==value):[...notes,value].sort((a,b)=>a-b);}else{if(this.board[index]===value&&!this.notes[index].length)return false;this.board[index]=value;this.notes[index]=[];}\r
    this.history.push(old);this.started=true;this.moves++;this.won=this.isSolved();return true;\r
  }\r
  undo(){const old=this.history.pop();if(!old)return false;this.board[old.index]=old.value;this.notes[old.index]=old.notes;this.hints=old.hints;this.moves=Math.max(0,this.moves-1);this.won=false;return true;}\r
  hint(preferred){if(this.won)return -1;const target=Number.isInteger(preferred)&&preferred>=0&&preferred<this.board.length&&!this.clues[preferred]&&this.board[preferred]!==this.solution[preferred]?preferred:this.board.findIndex((v,i)=>v!==this.solution[i]);if(target<0||!this.set(target,this.solution[target]))return -1;this.hints++;return target;}\r
  tick(dt){if(this.started&&!this.won)this.elapsed+=dt;}\r
  getState(){return {volume:this.volume,dimensions:['x','y','z'].map(a=>this.dimensions[a]),blockSize:this.ruleVariant==='latin-axis'?null:this.volume?[3,3,3]:[3,1,3],digits:this.digits,ruleVariant:this.ruleVariant,board:[...this.board],clues:[...this.clues],notes:this.notes.map(n=>[...n]),conflicts:[...this.conflicts()],elapsed:this.elapsed,moves:this.moves,hints:this.hints,won:this.won,unique:this.unique};}\r
}\r
export const SUDOKU_PLANES={xy:{right:[1,0,0],up:[0,1,0],normal:[0,0,1],axis:'z'},xz:{right:[1,0,0],up:[0,0,-1],normal:[0,1,0],axis:'y'},yz:{right:[0,0,-1],up:[0,1,0],normal:[1,0,0],axis:'x'}};\r
export function sudokuVectorForKey(input,plane='xy'){const k=input.toLowerCase(),b=SUDOKU_PLANES[plane]||SUDOKU_PLANES.xy;const v=k==='arrowright'?b.right:k==='arrowleft'?b.right.map(v=>-v):k==='arrowup'?b.up:k==='arrowdown'?b.up.map(v=>-v):null;return v?v.map(v=>v||0):null;}\r
export function moveSudokuSelection(index,vector,volume=true){const p=sudokuCoordinates(index,volume),size=volume?6:9;if(volume){p.x+=vector[0];p.y+=vector[1];p.z+=vector[2];}else{p.x+=vector[0];p.z-=vector[1];}return sudokuIndex(Math.max(0,Math.min(size-1,p.x)),volume?Math.max(0,Math.min(5,p.y)):0,Math.max(0,Math.min(size-1,p.z)),volume);}\r
\r
export { createGame } from './sudoku-view.js';\r
`;export{e as default};
