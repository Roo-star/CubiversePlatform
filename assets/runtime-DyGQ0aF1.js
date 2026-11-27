const e=`import {TicTacToeGame} from '../games/tictactoe.js';
import {surfaceBoard, surfaceIndex, surfaceStep} from '../surface-board.js';
import {validateProject} from './project.js';
import {isNativeProject} from './native.js';

// createSession(project) is the portable entry point. The host provides input and time.
export function createSession(value, random = Math.random) {
  const project = validateProject(value);
  if (isNativeProject(project)) throw new RangeError('This project runs in the CubiGames player.');
  if (project.game === 'tictactoe') {
    const match = new TicTacToeGame({dimensions:[3,3,project.layers]});
    function target(column, layer = 0) {
      if (!Number.isInteger(column) || column < 0 || column > 8) return -1;
      if (project.mode === 'free')
        return Number.isInteger(layer) && layer >= 0 && layer < project.layers ? column + 9 * layer : -1;
      for (let height=0; height<project.layers; height++)
        if (!match.board[column+9*height]) return column+9*height;
      return -1;
    }
    return {target, place:(column,layer)=>match.play(target(column,layer)), state:()=>match.getState()};
  }
  const size = project.side;
  const surface = surfaceBoard([size,size,size]);
  const mid = Math.floor(size/2);
  const head = surfaceIndex(surface,4,mid,mid);
  const body = [head, surfaceIndex(surface,4,mid-1,mid)];
  let direction = [1,0], queued = 0, status = 'playing', score = 0, crossings = 0;
  let food = surfaceIndex(surface,4,mid+1,mid);
  function turn(sign) {
    if (status !== 'playing' || queued || ![-1,1].includes(sign)) return false;
    queued = sign;
    return true;
  }
  function tick() {
    if (status !== 'playing') return false;
    const [du,dv] = direction;
    if (queued) direction = [queued*dv,-queued*du];
    queued = 0;
    const next = surfaceStep(surface,body[0],...direction);
    const grows = next.index === food;
    if (body.slice(0,grows ? body.length : -1).includes(next.index)) {
      status = 'lost'; return false;
    }
    if (surface.cells[next.index].face !== surface.cells[body[0]].face) crossings++;
    body.unshift(next.index);
    direction = [next.du,next.dv];
    if (!grows) body.pop();
    else {
      score++;
      const occupied = new Set(body);
      const empty = surface.cells.filter(cell=>!occupied.has(cell.index));
      food = empty.length ? empty[Math.floor(random()*empty.length)].index : -1;
      if (!empty.length) status = 'won';
    }
    return true;
  }
  return {surface, turn, tick, state:()=>({status,score,crossings,body:[...body],direction:[...direction],food})};
}

`;export{e as default};
