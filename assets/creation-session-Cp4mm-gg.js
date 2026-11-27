const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./GLTFLoader-t0v7kTxG.js","./three-CXivr22E.js"])))=>i.map(i=>d[i]);
import{m as Gt}from"./mine-neighborhood-DkFKDYSC.js";import{merge2048Line as qt}from"./2048-B7c4WAa9.js";import{_ as it}from"./preload-helper-DMGCcr4D.js";import{m as Ut,a as zt}from"./cubitool-assets-B4v9deTh.js";const nt="https://www.chiark.greenend.org.uk/~sgtatham/puzzles",ze="https://github.com",Yt=`${ze}/godotengine/godot-demo-projects`,Je=(t,n,r,a,e,s,c,i={})=>({id:t,title:n,category:r,platform:s,url:a,sourceProject:Object.freeze(c),language:c.language,player:{url:a,info:a,provider:e,publisher:e},...i}),Xt=[["blackbox","Black Box","Logic"],["bridges","Bridges","Logic"],["cube","Cube","Logic"],["dominosa","Dominosa","Blocks"],["fifteen","Fifteen","Number"],["filling","Filling","Logic"],["flip","Flip","Logic"],["flood","Flood","Logic"],["galaxies","Galaxies","Logic"],["guess","Guess","Logic"],["inertia","Inertia","Maze"],["keen","Keen","Number"],["lightup","Light Up","Logic"],["loopy","Loopy","Maze"],["magnets","Magnets","Logic"],["map","Map","Logic"],["mines","Mines","Logic"],["mosaic","Mosaic","Logic"],["net","Net","Logic"],["netslide","Netslide","Blocks"],["palisade","Palisade","Logic"],["pattern","Pattern","Logic"],["pearl","Pearl","Maze"],["pegs","Pegs","Board game"],["range","Range","Number"],["rect","Rectangles","Blocks"],["samegame","Same Game","Blocks"],["signpost","Signpost","Logic"],["singles","Singles","Number"],["sixteen","Sixteen","Number"],["slant","Slant","Logic"],["solo","Solo","Number"],["tents","Tents","Logic"],["towers","Towers","Number"],["tracks","Tracks","Maze"],["twiddle","Twiddle","Blocks"],["undead","Undead","Logic"],["unequal","Unequal","Number"],["unruly","Unruly","Logic"],["untangle","Untangle","Logic"]].map(([t,n,r])=>Je(`portable-${t}`,n,r,`${nt}/js/${t}.html`,"Simon Tatham’s Portable Puzzle Collection","Portable Puzzles",{url:nt,license:"MIT",language:"C",repository:"https://git.tartarus.org/simon/puzzles.git",entry:`${t}.c`},{cover:`${nt}/${t}-web.png`})),$t={"2048-original":"Slide all tiles together. Matching neighbors merge once per move and a new number appears after a valid slide. Form 2048 before running out of moves.","portable-fifteen":"Slide a numbered tile next to the single blank into that blank. Arrange the tiles in numeric order and leave the blank in the final position.","portable-mines":"Reveal every safe square and flag suspected mines. A revealed number counts adjacent mines. Revealing a mine ends the game."},Vt={"2048-original":{game:"2048",change:"Use a 4 by 4 by 3 board."},"portable-fifteen":{game:"numpuz",change:"Use a 3 by 2 by 2 board."},"portable-mines":{game:"minesweeper",change:"Count the six face-sharing neighbors on a 6 by 7 by 4 board."}};["Maze: Path of Light","Level Devil","Rotate","Laser Maze - Puzzle","Words Search Classic Edition","Paper Block","Ludo Hero","Bubbleshooter","Longcat","One Line Draw","Tens!","Free The Key","Chess Pro","Word Slide","Blumgi Bounce","Block Blast!","Ten Crush","Jelly Run 2048","Brick Out - Shoot the ball","Brick Breaker: Legend Balls","Fancade"].sort((t,n)=>n.length-t.length);const _t=t=>t.normalize("NFKC").trim().toLowerCase(),Zt=(t,n)=>t?.startsWith(n)&&/^(?:[\s,.!?;:。]|轉|转|變|变|做|改|$)/.test(t.slice(n.length)),Wt=t=>t.match(/^(?:(?:convert|turn|make|in|for|remake|transform)\s+|(?:請\s*|请\s*)?[把將将]\s*)(.+)$/)?.[1],Ve=Object.freeze([Je("q42-0hh1","0h h1","Logic","https://0hh1.com/","Q42","Creator editions",{url:`${ze}/florisluiten/0hh1/tree/25910e580d6ea6bc1dfbfd29b2637e47844a96f9`,license:"MIT · OFL fonts",language:"JavaScript",entry:"index.html"},{benchmark:!0}),Je("godot-dodge-the-creeps","Dodge the Creeps","Arcade","https://godotengine.github.io/godot-demo-projects/2d/dodge_the_creeps/","Godot Engine","Godot Demos",{url:`${Yt}/tree/4.2-31d1c0c/2d/dodge_the_creeps`,license:"MIT · CC0 art · CC BY music · OFL font",language:"GDScript",entry:"project.godot"},{benchmark:!0,cover:"https://raw.githubusercontent.com/godotengine/godot-demo-projects/master/2d/dodge_the_creeps/screenshots/dodge.png"}),Je("q42-0hn0","0h n0","Logic","https://0hn0.com/","Q42","Creator editions",{url:`${ze}/Techdojo/0hn0/tree/a207bafd92608eec7c112f31992050aad8de4c27`,license:"MIT · OFL fonts",language:"JavaScript",entry:"index.html"}),Je("2048-original","2048","Number","https://gabrielecirulli.github.io/2048/","Gabriele Cirulli","Creator editions",{url:`${ze}/gabrielecirulli/2048`,license:"MIT",language:"JavaScript",entry:"index.html"}),...Xt].map(t=>Object.freeze({...t,rules:$t[t.id],boardConversion:Vt[t.id]})));function fr(t="",n="all",r=!1){const a=t.trim().toLowerCase();return Ve.filter(e=>(!r||e.player)&&(n==="all"||n===e.platform)&&`${e.title} ${e.category} ${e.platform}`.toLowerCase().includes(a))}function ct(t){return Ve.find(n=>n.id===t)}function ft(t){return{id:t.id,kind:"catalog",title:t.title,url:t.url,language:t.language,entry:t.sourceProject.entry,license:t.sourceProject.license,repository:t.sourceProject.url,...t.rules&&{rules:t.rules}}}function hr(t,n=""){return{title:t.title,url:t.url,...t.language?{language:t.language}:{},rules:n.trim()||t.rules||`Retrieve and inspect the original ${t.platform} project before planning a source-backed conversion.`}}const en=t=>`Convert ${t.title} into a playable 3D game and preserve its core rules.`,tn=t=>t.boardConversion?`In ${t.title}, ${t.boardConversion.change[0].toLowerCase()}${t.boardConversion.change.slice(1)}`:en(t);function nn(t,n){const r=t.trim().toLowerCase().replace(/[.!。！]+$/u,"").trim(),a=n.title.toLowerCase();return[tn(n).toLowerCase().slice(0,-1),`convert ${a} to 3d`,`turn ${a} into 3d`,`把${a}轉成3d`,`把 ${a} 轉成 3d`].includes(r)}function rn(t){const n=_t(t).replace(/\b[0o]h\s*(h1|n0)\b/g,"0h $1"),r=Wt(n);return Ve.filter(e=>{const s=e.title.toLowerCase();return nn(n,e)||e.id.startsWith("q42-")&&n===s||Zt(r,s)}).sort((e,s)=>s.title.length-e.title.length)[0]}const lt={volume:{en:["Fixed XYZ board","Every position in a bounded volume can participate in the rules from the start.","Players need a way to inspect and select interior cells. More legal moves can change opening balance."],zh:["固定 XYZ 棋盤","開局就能使用有界的三維格位，可將原規則延伸到不同高度。","要能看清並選取內層格位，也要重測增加合法步數後的先手優勢。"]},stack:{en:["Progressive stacking","A placement can support a future move or cover an earlier one. Height becomes part of strategy.","Decide which supports are legal, what happens to covered pieces, and when the height limit ends play."],zh:["逐層堆疊","每次放置都可能新增支撐點或蓋住舊棋子，改變下一步能走的位置。","要定義支撐、遮蓋後的效果，以及到達高度上限後如何繼續。"]},surface:{en:["Playable surfaces in 3D","Keep local movement on readable surfaces. Connect their edges for cross-face play or embed the original plane in a 3D world.","Choose whether edges connect. Players need readable orientation, boundaries and picks after the view changes."],zh:["三維世界中的可玩表面","保留易讀的局部平面，可把邊界接到另一個面，也可把原地圖嵌入三維場景。","要確定哪些邊能跨越，以及轉面後的方向、鄰格和選取方式。"]},custom:{en:["Game-specific spatial mechanic","Design a new action or interaction around a distinctive rule of this game.","Agree on a concrete situation where the new mechanic changes the outcome, then test it against a control."],zh:["自訂空間機制","從原作的一項關鍵規則出發，設計新的動作或空間互動。","生成前先敲定一個可操作情境，並用對照案例驗證它確實改變結果。"]},"visual-only":{en:["3D presentation only"],zh:["僅轉換三維外觀"]}};function an(t,n=[]){return t?/^(?:zh|chinese|中文|繁體)/i.test(t)?"zh":"en":n.some(r=>r.role==="user"&&/[\u3400-\u9fff]/u.test(r.content))?"zh":"en"}function Ye(t,n){return lt[t]?.[an(n)]?.[0]??""}const on={volume:/\b(?:fixed (?:xyz|3d) (?:board|grid)|fixed volume|cube board|volumetric (?:board|grid)|fixed.volume)\b|固定.{0,6}(?:立方|體積|体积|XYZ|三維棋盤|三维棋盘)|跨層連線|跨层连线/iu,stack:/\b(?:stacking|stack pieces|stack the pieces|stack upward|gravity stack|progressive stack)\b|逐層堆[疊叠]|逐层堆[疊叠]|(?:落下|沿.{0,4}[zZ軸轴]|垂直|物理).{0,5}堆[疊叠]|堆[疊叠](?:模式|玩法|棋盤|棋盘)/iu,surface:/\b(?:cross.face|across (?:the )?(?:cube )?faces|surface traversal|connected faces|playable faces|(?:six|6) (?:cube )?faces|(?:outer|cube) shell|folded (?:map|maze)|embed.{0,22}plane in.{0,10}3d world)\b|跨面(?:移動|移动|遊玩|游玩|行走)?|可玩表面|立方體外殼|立方体外壳|立方體表面|立方体表面|摺疊地圖|折叠地图|平面.{0,8}嵌入.{0,5}(?:場景|场景|世界)/iu,custom:/\b(?:custom (?:spatial )?(?:mechanic|spatialization|transformation)|freeform spatial|game.specific spatial mechanic)\b|自[訂定](?:空間|空间)(?:機制|机制|玩法)|(?:將|把).{1,12}(?:躲避|閃避|闪避).{0,10}(?:跳[躍跃]|起跳)/iu,"visual-only":/\b(?:visual.only|3d (?:presentation|visuals|appearance) only|(?:just|only) (?:change|update|convert) (?:the )?(?:render(?:er|ing)|(?:3d )?visuals?|appearance)|keep (?:a |the |one |single )*(?:flat|planar) (?:grid|board)|keep (?:all )?(?:gameplay|moves|rules) (?:strictly )?(?:in 2d|planar))\b|(?:只|僅|仅)(?:做|改|轉換|转换|要|改變|改变)?.{0,5}(?:外觀|外观|視覺|视觉|渲染)|(?:保持|維持|维持)(?:單一|单一)?平面(?:棋盤|棋盘|格局)/iu};function sn(t=[]){for(const n of t.slice().reverse()){if(n.role!=="user"||typeof n.content!="string")continue;if(/\b(?:what if|what (?:is|does)|explain|compare|pros and cons|tell me about|which (?:one|route|approach)|should (?:we|I))\b|有何差別|有什麼(?:分別|差別|區別)|什麼意思|比較|比较/iu.test(n.content))return null;const a=n.content.split(/[。.!！？?；;，,\n]|\bbut\b|但是|改為|改为/iu),e=new Set;let s=!1,c=!1;for(const i of a){const y=/\b(?:original(?:ly)?|existing|currently|already|in the source)\b|原作|原本|原版|目前|現有/iu.test(i),v=/\b(?:convert|turn|transform|make|build|choose|keep|I want|let the player)\b|轉[換成為]|改[成為]|我[想要]|保留|請|生成/iu.test(i);if(y&&!v)continue;/\b[1-9]\d*\s*[×x*]\s*[1-9]\d*\s*[×x*]\s*[1-9]\d*\b/iu.test(i)&&!/\b(?:already|originally|avoid|not|without)\b|原本|原來|不要|不用/iu.test(i)&&(c=!0,s=!0);const A=Object.keys(lt).find(g=>[g,...Object.values(lt[g]).map(o=>o[0])].some(o=>o.toLowerCase()===i.trim().toLowerCase()));for(const[g,o]of Object.entries(on)){const C=o.exec(i);if(!C&&A!==g)continue;s=!0;const B=C?i.slice(0,C.index):"";/(?:\b(?:no|not|without|avoid|instead of|rather than|don't want|do not want)\b|不要|不用|避免|不想|並非|而非|取消)\s*(?:(?:a|the|any|use|using|使用|做)\s*){0,3}$/iu.test(B)||e.add(g)}}if(s)return(e.size>1||c&&e.size)&&/\bor\b|或者|還是|还是/iu.test(n.content)?null:!e.size&&c?"volume":e.size===1?[...e][0]:null}return null}const ht=[["gameplay","Gameplay"],["format","Format"],["camera","Camera"],["players","Players"],["style","Art direction"]];function ne(t,n,r){const a=document.createElement(t);return n&&(a.className=n),r&&(a.textContent=r),a}function cn(t,{onSend:n,onChooseSpatial:r,onGenerate:a,onRetry:e,onBack:s,onStartExample:c}){t.innerHTML=`<div class="cb-brief">
    <button type="button" class="cb-back">← Studio</button>
    <header class="cb-brief-heading"><img src="./studio-design/studio.svg" alt=""><h1>Game brief</h1></header>
    <div class="cb-brief-layout"><section class="cb-thread" aria-label="Design conversation">
      <div class="cb-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <section class="cb-routes" hidden><h2></h2><div></div></section>
      <form class="cb-compose"><label class="sr-only" for="cb-reply">Reply to CubiEngine</label>
        <textarea id="cb-reply" rows="2" maxlength="4000" placeholder="Describe your game or answer the agent…"></textarea>
        <div class="cb-compose-actions"><span role="status"></span><button class="cb-send" type="submit">Send <span aria-hidden="true">↗</span></button></div>
      </form><div class="cb-suggestions" aria-label="Suggested replies"></div>
      <div class="cb-error" hidden><p role="alert"></p><button type="button" class="cb-retry">Try again</button>
      <button type="button" class="cb-example">Open local example</button></div>
    </section><aside class="cb-spec"><div class="cb-spec-heading"><h2>Build brief</h2><img src="./studio-design/cube.svg" alt=""></div>
      <h3></h3><details class="cb-source" hidden><summary></summary><p></p><ul></ul></details>
      <details class="cb-understanding" hidden><summary></summary><div></div></details>
      <section class="cb-spatial-plan" hidden><h4></h4><dl></dl></section><dl class="cb-fields"></dl>
      <button class="cb-build" type="button">Generate first version <span aria-hidden="true">↗</span></button>
    </aside></div></div>`;const i=b=>t.querySelector(b),y=i(".cb-messages"),v=i(".cb-fields"),A=i("textarea"),g=i(".cb-send"),o=i(".cb-build"),C=i('[role="status"]'),B=i(".cb-suggestions"),T=i(".cb-error");let F=!1,D=[];async function K(b,...O){try{await b?.(...O)}catch($){T.hidden=!1,i(".cb-error p").textContent=$.message||"The request could not be completed."}}i(".cb-back").onclick=()=>K(s),i(".cb-retry").onclick=()=>K(e),i(".cb-example").onclick=()=>K(c),o.onclick=()=>K(a);function H(){g.disabled=F||!A.value.trim()}A.oninput=H;const X=i("form");X.onsubmit=b=>{b.preventDefault();const O=A.value.trim();!O||F||(A.value="",H(),K(n,O))},A.onkeydown=b=>{b.key==="Enter"&&!b.shiftKey&&!b.isComposing&&(b.preventDefault(),X.requestSubmit())};function W(b){const O=b.role==="user",$=ne("article",O?"cb-message cb-user":"cb-message cb-agent");if(b.superseded){const oe=ne("details");oe.append(ne("summary",null,"Earlier source request"),ne("p",null,b.content??b.text)),$.append(oe)}else $.append(ne("strong",null,O?"You":"CubiEngine"),ne("p",null,b.content??b.text));y.append($)}function re({messages:b=[],brief:O,ready:$,source:oe,sourceReceipt:ie,busy:Ae,status:G,suggestions:ge=[],error:l,mode:I,gameUnderstanding:f,spatialOptions:k=[],spatialChoice:R,spatialPlan:w,canonicalIR:L}){if(F=!!Ae,b.length!==D.length||b.some((d,p)=>d.content!==D[p]?.content||d.role!==D[p]?.role||d.superseded!==D[p]?.superseded)){const d=D.length<=b.length&&D.every((p,E)=>p.content===b[E].content&&p.role===b[E].role&&p.superseded===b[E].superseded);d||y.replaceChildren(),b.slice(d?D.length:0).forEach(W),D=b.map(p=>({...p})),y.scrollTop=y.scrollHeight}A.readOnly=F,H();const m=b.some(d=>d.role==="user"&&/[\u3400-\u9fff]/u.test(d.content)),x=w?.family,V=x&&(x==="visual-only"||L?.target?.family===x),_=R&&f&&!V,Q=oe?.kind==="catalog"&&!ie,J=I==="convert"&&!f,M=Ye(R,m?"zh":"en");C.textContent=_&&l&&!F?m?"已保存「"+M+"」，等待確認規則。":"Saved selection · "+M+" · Awaiting confirmation":G||(F?"Thinking…":"");const le=I==="convert"&&!V,we=!J&&Array.isArray(k)?k:[],me=le&&$&&!l&&!we.length;o.disabled=F||!me&&(!$||le)||Q,o.onclick=()=>{if(!o.disabled)return K(me?e:a)},o.firstChild.textContent=me?m?"分析空間玩法 ":"Review spatial rules ":m?"生成第一版 ":"Generate first version ";const ve=i(".cb-routes");ve.hidden=!we.length,ve.querySelector("h2").textContent=R?m?"空間玩法":"Spatial mechanics":m?"選擇空間玩法":"Choose the spatial mechanic",ve.querySelector("div").replaceChildren(...we.map(d=>{const p=ne("button","cb-route");p.type="button",p.dataset.family=d.family,p.setAttribute("aria-pressed",String(d.family===(x||R))),p.disabled=F||d.family===(x||R)&&(V||!l);const E=ne("strong",null,d.label||Ye(d.family,m?"zh":"en"));return d.recommended&&E.append(ne("small",null,m?"建議":"Recommended")),p.append(E,ne("span",null,d.benefit)),d.tradeoff&&p.append(ne("span","cb-tradeoff",(m?"取捨：":"Trade-off · ")+d.tradeoff)),p.onclick=()=>K(r,d.family),p}));const ye=i(".cb-understanding");if(ye.hidden=!f,f){ye.querySelector("summary").textContent=m?"原作規則與依據":"Original rules and evidence";const d=ye.querySelector("div");d.replaceChildren();const p=[f.topology,...f.rules||[],...f.actions||[]];for(const E of p.filter(h=>h?.description)){const h=ne("p",null,E.description),ae=(E.evidence||[]).filter(z=>z.kind==="code").map(z=>z.path+" · "+z.start+"–"+z.end),ee={stated:m?"需求描述":"Brief",observed:m?"輸入圖像":"Visual input","asset-listed":m?"資源清單":"Asset inventory",inferred:m?"推斷":"Inferred"},j=ae.join(", ")||ee[E.basis];j&&h.append(ne("small",null,j)),d.append(h)}for(const E of f.uncertainties||[])d.append(ne("p","cb-tradeoff",(m?"待確認：":"Uncertain · ")+E))}const Qe=i(".cb-spatial-plan");if(Qe.hidden=!V,V){Qe.querySelector("h4").textContent=(m?"已選玩法 · ":"Selected mechanic · ")+(w.label||Ye(x,m?"zh":"en"));const d=L?.target,p=[[m?"空間尺寸":"Dimensions",d?.dimensions?.join(" × ")],[m?"操作方式":"Player action",d?.interaction],[m?"視角與可見性":"Visibility",d?.visibility],[m?"策略與平衡":"Balance",d?.balance]];Qe.querySelector("dl").replaceChildren(...p.filter(([,E])=>E).map(([E,h])=>{const ae=ne("div");return ae.append(ne("dt",null,E),ne("dd",null,h)),ae}))}const ke=i(".cb-source");ke.hidden=!ie,ie&&(ke.querySelector("summary").textContent="Source attached · "+ie.fileCount+" files",ke.querySelector("p").textContent=oe.title+" · "+ie.version.slice(0,14),ke.querySelector("ul").replaceChildren(...ie.paths.map(d=>ne("li",null,d)))),i(".cb-spec h3").textContent=O?.title||oe?.title||"Your game";const We=J?ht.filter(([d])=>O?.[d]):ht;v.replaceChildren(...We.map(([d,p])=>{const E=ne("div"),h=O?.[d];return E.append(ne("dt",null,p),ne("dd",h?"":"cb-unset",h||"To define")),E})),B.replaceChildren(...(Array.isArray(ge)?ge:[]).filter(d=>typeof d=="string").map(d=>{const p=ne("button",null,d);return p.type="button",p.disabled=F,p.onclick=()=>{F||K(n,d)},p}));const u=J&&l&&!Q?l.replace(/^The model output did not pass the project checks\.\s*/u,""):l;T.hidden=!l||F,i(".cb-error p").textContent=u&&J&&!Q?(m?"原作規則分析尚未完成。":"Source analysis is incomplete. ")+u:u||"",i(".cb-retry").textContent=Q?m?"重新開啟原始檔":"Retry opening source":_?m?"重新確認玩法":"Retry confirmation":J?m?"重試原作分析":"Retry source analysis":"Try again",i(".cb-retry").disabled=F,i(".cb-example").hidden=!c||I==="convert"}return{update:re,destroy(){t.replaceChildren()}}}function fe(t,n,r,a,e,s,c){return{id:t,name:n,category:r,description:a,tags:e,usage:s,path:"asset-"+t+".js",source:c.trim()+`
`,format:"js",origin:"CubiEngine Asset Library",version:1}}const Oe=[fe("mine-neighbors","CubiGames mine neighborhood","Game Logic","The clue neighborhood from CubiGames Minesweeper, supporting 26 touching, 6 face-sharing or 8 planar cells.",["minesweeper","minefield","踩地雷","掃雷","扫雷"],"mineNeighborOffset(dx,dy,dz,mode) returns whether an offset counts toward a mine clue.","export const mineNeighborOffset = "+Gt.toString()+";"),fe("2048-merge","CubiGames 2048 merge","Game Logic","The original CubiGames 2048 move-line function, including single-merge rules and score.",["2048","sliding tiles","数字合成","數字合成"],"merge2048Line(values) returns {values,score} for a line in move order.","export const merge2048Line = "+qt.toString()+";"),fe("mechanical-pawn","Mechanical pawn","Game Pieces","A motorized pawn with a stepped metal base, signal band and forward-facing lens. Unit height.",["pawn","game piece","ludo","mechanical","robot","flying chess","機械","棋子","飛行棋","飞行棋","机械"],"createPiece(THREE, color) returns a standing Group.",`
export function createPiece(THREE, color = 0x78e8da) {
  const piece = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x414757, metalness: 0.7, roughness: 0.28 });
  const light = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35 });
  const ring = (top, bottom, height, y, material) => {
    const part = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, height, 12), material);
    part.position.y = y;
    piece.add(part);
  };
  ring(0.29, 0.35, 0.16, 0.08, metal);
  ring(0.26, 0.28, 0.07, 0.195, light);
  ring(0.18, 0.24, 0.42, 0.44, metal);
  ring(0.22, 0.27, 0.35, 0.825, metal);
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), light);
  lens.scale.set(1, 0.65, 0.45);
  lens.position.set(0, 0.84, 0.24);
  piece.add(lens);
  return piece;
}`),fe("tic-tac-toe-marks","Cross and ring","Game Pieces","Raised X and O pieces for a horizontal grid. Each piece fits a one-unit cell.",["tic tac toe","noughts and crosses","xo","井字棋","圈叉","井字"],"createMark(THREE, 'X' or 'O', color) returns a Group.",`
export function createMark(THREE, sign, color) {
  const mark = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.32, roughness: 0.26 });
  if (sign === 'O') {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.09, 12, 40), material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.09;
    mark.add(ring);
  } else {
    const geometry = new THREE.BoxGeometry(1.2, 0.16, 0.16);
    for (const angle of [-Math.PI / 4, Math.PI / 4]) {
      const arm = new THREE.Mesh(geometry, material);
      arm.rotation.y = angle;
      arm.position.y = 0.08;
      mark.add(arm);
    }
  }
  return mark;
}`),fe("floating-grid","Floating grid","Board Templates","An open rectangular board of horizontal cells. Each tile carries its row and column for picking.",["board","grid","checkerboard","tile","floating","棋盤","棋盘","網格","格子","懸浮","悬浮"],"createBoard(THREE, rows, columns, color) returns a Group with independently pickable tiles.",`
export function createBoard(THREE, rows = 3, columns = 3, color = 0x48415c) {
  const board = new THREE.Group();
  const tile = new THREE.BoxGeometry(0.94, 0.12, 0.94);
  const surface = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.18 });
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = new THREE.Mesh(tile, surface);
      cell.position.set(column - (columns - 1) / 2, 0.06, row - (rows - 1) / 2);
      cell.userData.cell = { row, column };
      board.add(cell);
    }
  }
  return board;
}`),fe("voxel-crate","Voxel crate","3D Objects","A unit-sized obstacle with raised corner straps.",["crate","voxel","block","obstacle","箱子","體素","体素","障礙","障碍"],"createCrate(THREE, color) returns a Group.",`
export function createCrate(THREE, color = 0xbe865a) {
  const crate = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color, roughness: 0.87 });
  const band = new THREE.MeshStandardMaterial({ color: 0x424655, metalness: 0.6 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.94, 0.94), wood);
  body.position.y = 0.5;
  crate.add(body);
  const strap = new THREE.BoxGeometry(0.11, 1, 1);
  for (const x of [-0.34, 0.34]) {
    const mesh = new THREE.Mesh(strap, band);
    mesh.position.set(x, 0.5, 0);
    crate.add(mesh);
  }
  return crate;
}`),fe("layer-position","Layer coordinates","Spatial Components","Maps board column, row and floor to a centered Three.js X, Y, Z position with adjustable layer spacing.",["layer","height","z axis","z-axis","z軸","z轴","層高","层高","分層","stacked","lattice"],"cellPosition(column, row, floor, columns, rows, layerSpacing) returns [x,y,z].",`
export function cellPosition(column, row, floor, columns, rows, layerSpacing = 1) {
  return [column - (columns - 1) / 2, floor * layerSpacing, row - (rows - 1) / 2];
}`),fe("isometric-camera","Isometric camera","Camera Presets","Fits an orthographic camera to a board using its visible span and viewport aspect.",["isometric","orthographic","2.5d","camera","等距","正交","斜視","斜视"],"createCamera(THREE, aspect, span) returns an OrthographicCamera with the origin in view.",`
export function createCamera(THREE, aspect, span = 7) {
  const half = span / (2 * Math.min(1, aspect));
  const camera = new THREE.OrthographicCamera(-half * aspect, half * aspect, half, -half, 0.01, span * 8);
  camera.position.set(span, span, span);
  camera.lookAt(0, 0, 0);
  return camera;
}`),fe("cell-picking","Pointer selection","Interaction Components","Converts a pointer event into coordinates on the game canvas and raycasts pickable objects.",["click","pointer","picking","tap","select","點擊","點選","选择","点击"],"pickObject(THREE, event, canvas, camera, objects) returns a raycast hit or null.",`
export function pickObject(THREE, event, canvas, camera, objects) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const point = new THREE.Vector2(2 * (event.clientX - rect.left) / rect.width - 1,
    1 - 2 * (event.clientY - rect.top) / rect.height);
  const ray = new THREE.Raycaster();
  ray.setFromCamera(point, camera);
  return ray.intersectObjects(objects, true)[0] || null;
}`),fe("neon-alloy","Neon alloy","Visual Styles","Dark chassis and emissive accent materials for mechanical scenes.",["cyberpunk","sci fi","science fiction","neon","neon alloy","賽博","赛博","霓虹","科幻"],"createMaterials(THREE, accentColor) returns {chassis, accent}.",`
export function createMaterials(THREE, accentColor = 0x73efcb) {
  return {
    chassis: new THREE.MeshStandardMaterial({ color: 0x374157, roughness: 0.34, metalness: 0.72 }),
    accent: new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 0.9 })
  };
}`),fe("landing-animation","Landing arc","Animation Presets","Interpolates a moving piece along a hop between board positions and returns it to the destination.",["hop","jump","landing","bounce","跳躍","跳跃","落地"],"hopPosition(THREE, start, end, progress, height) returns an interpolated Vector3.",`
export function hopPosition(THREE, start, end, progress, height = 0.4) {
  const t = THREE.MathUtils.clamp(progress, 0, 1);
  const point = new THREE.Vector3().lerpVectors(start, end, t);
  point.y += 4 * height * t * (1 - t);
  return point;
}`),fe("turn-indicator","Turn indicator","UI Components","An accessible HUD readout for the active player or result.",["turn indicator","hud","turn based","scoreboard","回合","計分","计分"],"createTurnIndicator(parent) returns a function that updates an accessible text element.",`
export function createTurnIndicator(parent) {
  const text = parent.ownerDocument.createElement('output');
  text.setAttribute('aria-live', 'polite');
  parent.append(text);
  return value => { text.textContent = String(value); };
}`)];function dt(t){return String(t??"").normalize("NFKC").toLowerCase().replace(/[-_]+/g," ").replace(/\s+/g," ").trim()}function rt(t,n){const r=dt(n);return r?/[^\x00-\x7f]/.test(r)?t.includes(r):new RegExp("(?:^|[^a-z0-9])"+r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?:$|[^a-z0-9])").test(t):!1}function ln(t,{limit:n=6,category:r,catalog:a=Oe}={}){const e=dt(t);return e?a.filter(s=>!r||s.category===r).map(s=>{const i=s.tags.filter(y=>rt(e,y)).reduce((y,v)=>y+(dt(v).includes(" ")?3:2),0)+(rt(e,s.id)||rt(e,s.name)?8:0);return{asset:s,score:i}}).filter(s=>s.score>0).sort((s,c)=>c.score-s.score||s.asset.id.localeCompare(c.asset.id)).slice(0,n).map(s=>s.asset):[]}function dn({source:t,...n}){return n}async function _e(t,n,r,a={}){const e=await fetch("/api/v1/"+t,{method:n,headers:{...r&&{"Content-Type":"application/json"},...a},body:r?JSON.stringify(r):void 0,cache:"no-store"}),s=await e.json();if(!e.ok)throw Error(s.error||"Studio could not complete the asset request.");return s}const un=t=>_e("asset-quotes/","POST",t),pn=(t,n)=>_e("asset-jobs/","POST",{quoteId:t},{"Idempotency-Key":n}),An=t=>_e("asset-jobs/"+encodeURIComponent(t),"GET"),gn=()=>_e("asset-library/","GET");async function mn(t,{up:n="+Y",forward:r="+Z"}={}){if(!t?.name?.toLowerCase().endsWith(".glb")||t.size>20*1024*1024)throw Error("Choose a self-contained GLB under 20 MB.");const a=await fetch("/api/v1/asset-library/",{method:"POST",body:t,headers:{"Content-Type":"model/gltf-binary","X-Asset-Name":encodeURIComponent(t.name),"X-Asset-Up":n,"X-Asset-Forward":r}}),e=await a.json();if(!a.ok)throw Error(e.error||"Studio could not import this GLB.");return e}function fn(t,n,r){t.innerHTML=`<div class="cw-quote-head">
    <label>3D model provider <select><option value="">Available provider</option><option value="tripo">Tripo P2</option><option value="meshy">Meshy</option><option value="rodin">Rodin</option></select></label>
    <button type="button" class="cw-outline" data-price>Find model &amp; quote</button></div>
    <div class="cw-quote-result" hidden><p role="status"></p><button type="button" class="cw-outline" data-confirm hidden></button><a data-model hidden download>Download GLB</a></div>`;const a=t.querySelector("select"),e=t.querySelector("[data-price]"),s=t.querySelector(".cw-quote-result"),c=s.querySelector("p"),i=t.querySelector("[data-confirm]"),y=t.querySelector("[data-model]");let v="",A,g,o,C=0,B=!1,T=!1,F;function D(){return r()&&"cubiverse.asset-job."+r()}function K(b){if(D())try{b?localStorage.setItem(D(),b):localStorage.removeItem(D())}catch{}}function H(b){s.hidden=!b,c.textContent=b||"",i.hidden=!0,y.hidden=!0}function X(){const b=T||["queued","running"].includes(g?.status);e.disabled=b||!v.trim(),a.disabled=b}async function W(b){const O=C;try{const $=await An(b);if(B||O!==C)return;g=$;const oe=Number.isFinite(g.progress)?" · "+g.progress+"%":"",ie=Number.isFinite(g.billing?.creditsConsumed)?" · "+g.billing.creditsConsumed+" credits reported":"",Ae=g.remoteId?" · Provider task "+g.remoteId:"";H("Job "+b.slice(0,12)+" · "+g.status+oe+ie+Ae+(g.message?" · "+g.message:"")),g.status==="succeeded"?(K(null),g.asset?.format==="glb"&&(y.href="/api/v1/asset-library/"+encodeURIComponent(g.asset.id)+"/file",y.download=g.asset.id+".glb",y.hidden=!1,n?.(g.asset))):g.status==="failed"?(K(null),g.billing?.refund&&(c.textContent+=" · Refund "+g.billing.refund)):o=setTimeout(()=>W(b),Math.max(1e3,Math.min(15e3,(g.nextPollAt||Date.now()+2500)-Date.now())))}catch($){if(B||O!==C)return;H($.message),i.hidden=!1,i.textContent="Refresh job",i.onclick=()=>{i.hidden=!0,W(b)}}finally{!B&&O===C&&X()}}e.onclick=async()=>{if(!v.trim()||e.disabled)return;const b=++C;T=!0,A=null,g=null,H("Checking the library and provider availability…"),X();try{const O=await un({query:v,provider:a.value||void 0});if(B||b!==C)return;if(A=O,A.status!=="available"){H(A.message||"No provider is available for this request.");return}if(A.kind==="reuse"){H("Library match · "+A.asset.name+" · "+A.price.amount+" "+A.price.unit),n?.(A.asset),A.asset.format==="glb"&&(y.href="/api/v1/asset-library/"+encodeURIComponent(A.asset.id)+"/file",y.download=A.asset.id+".glb",y.hidden=!1);return}if(!Number.isFinite(A.price?.amount)||A.price.amount<0||!A.price.unit){H("The provider could not provide a price for this model. Request a fresh quote before generating.");return}const $=A.price.amount.toLocaleString()+" "+A.price.unit,oe={ov:"Global",cn:"Mainland China"}[A.reference?.region],ie=A.provider==="tripo"?"Tripo P2":A.provider;H([ie,oe,(A.price.estimated?"Estimate · ":"Price · ")+$,"Expires "+new Date(A.expiresAt).toLocaleTimeString()].filter(Boolean).join(" · ")+(A.message?". "+A.message:"")),i.textContent=A.price.estimated?"Confirm generation · est. "+$:"Generate for "+$,i.hidden=!1,i.onclick=async()=>{if(!T){T=!0,i.disabled=!0,X();try{const Ae=await pn(A.id,"workbench-"+A.id);if(B||b!==C)return;g=Ae,K(g.id),H("Job "+g.id.slice(0,12)+" · "+g.status),W(g.id)}catch(Ae){!B&&b===C&&(c.textContent=Ae.message)}finally{!B&&b===C&&(T=!1,i.disabled=!1,X())}}}}catch(O){!B&&b===C&&H(O.message)}finally{!B&&b===C&&(T=!1,X())}};function re(){C++,clearTimeout(o),A=null,g=null,T=!1,i.disabled=!1,H(""),X()}return a.onchange=re,{selectProvider(b){!a.disabled&&a.value!==b&&(a.value=b,re())},update(b){if(D()!==F){re(),F=D();try{const O=D()&&localStorage.getItem(D());O&&(g={id:O,status:"running"},W(O))}catch{}}b!==v&&(v=b,!["queued","running"].includes(g?.status)&&!(i.disabled&&T)&&re()),X()},destroy(){B=!0,clearTimeout(o)}}}const hn="/api/studio/settings/tripo",Rt={windows:"Saved for this Windows user.",session:"Saved for this Studio server session.",environment:"Loaded from the Studio server environment.",none:"Check balance reads the account balance. Generation has a separate confirmation."},ut={ov:"Global",cn:"Mainland China"};function wt(t,n,r){return r==="key_rejected"||t===401?"Tripo rejected this key or its permissions. Check the API account site and paste its matching key.":r==="key_storage"?"Studio could not access the saved key for this Windows user.":r==="key_missing"?"Save your Tripo key before checking the balance.":t===403?"Access was denied. Open Studio on this computer and check your API account site and key.":t===404||t===405?"This Studio server needs the Tripo settings update. Restart the updated local launcher.":t===429?"Tripo received too many requests. Try again shortly.":n==="save"&&(t===400||t===422)?"Check the selected account site and enter a valid Tripo developer API key.":n==="save"?"Studio could not save this key. Check that the local server is running and try again.":n==="verify"?"Studio could not read the Tripo balance. Check the server connection, account site and API key.":"Studio could not load the local key settings. Restart the local Studio server and reopen settings."}async function wn(t,n,r){const a=t==="status"?"GET":"POST";let e,s;try{e=await fetch(hn+(t==="verify"?"/verify":""),{method:a,mode:"same-origin",credentials:"same-origin",redirect:"error",cache:"no-store",signal:n,...a==="POST"&&{headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}}),s=await e.json()}catch{throw Error(wt(e?.status,t))}if(!e.ok||typeof s?.configured!="boolean"||!Object.hasOwn(Rt,s.storage)||!Object.hasOwn(ut,s.region)||t==="verify"&&s.verified!==!0)throw Error(wt(e.status,t,s?.code));return s}function yn({onOpenLibrary:t}={}){const n=document.getElementById("tripo-settings");if(!n||n.open)return;const r=n.querySelector("form"),a=n.querySelector("input"),e=n.querySelector("select"),s=n.querySelector(".tripo-save"),c=n.querySelector(".tripo-verify"),i=n.querySelector(".tripo-library"),y=n.querySelector("[data-tripo-notice]"),v=n.querySelector("[data-tripo-storage]"),A=new AbortController;let g=!1,o;function C(K,H){y.dataset.kind=K,y.textContent=H}function B(){const K=!!(o&&!g);a.disabled=e.disabled=!K,s.disabled=!K||!a.value.trim(),c.disabled=!K||!o?.configured||!!a.value||e.value!==o.region,i.hidden=!t||!o?.configured,i.disabled=!K}function T(K){o=K,e.value=o.region,a.placeholder=o.configured?"Paste a replacement API key":"Paste your API key",v.textContent=(o.configured?ut[o.region]+" account. ":"")+Rt[o.storage]}async function F(K,H){if(!g){g=!0,C("pending",{status:"Checking local settings…",save:"Saving to Studio…",verify:"Checking your Tripo balance…"}[K]),B();try{const X=await wn(K,A.signal,H);if(A.signal.aborted)return;if(T(X),K==="verify"){const W=Number.isFinite(X.balance)?"Balance · "+X.balance.toLocaleString()+" credits.":"Key verified.",re=Number.isFinite(X.frozen)&&X.frozen>0?" Frozen · "+X.frozen.toLocaleString()+" credits.":"";C("success",ut[o.region]+" account verified. "+W+re)}else K==="save"?C("success","Key saved. Check balance to verify it with Tripo."):C("idle",o.configured?"A key is configured. You can check its balance or replace it.":"")}catch(X){A.signal.aborted||C("error",X.message)}finally{g=!1,A.signal.aborted||(B(),K==="status"&&o&&!o.configured&&document.activeElement===n.querySelector(".tripo-close")&&a.focus())}}}function D(){o?.configured&&e.value!==o.region?C("idle","Paste and save the key issued by the selected account site."):C("idle",""),B()}if(a.value="",e.value="ov",v.textContent="",a.oninput=e.onchange=D,r.onsubmit=K=>{if(K.preventDefault(),s.disabled||g)return;const H=a.value.trim();a.value="",F("save",{apiKey:H,region:e.value})},c.onclick=()=>{c.disabled||F("verify",{})},i.onclick=()=>{n.close(),t?.()},n.querySelector(".tripo-close").onclick=()=>n.close(),n.addEventListener("close",()=>{A.abort(),a.value="",a.disabled=!0,r.onsubmit=a.oninput=e.onchange=c.onclick=i.onclick=null},{once:!0}),n.showModal(),B(),!["http:","https:"].includes(location.protocol)||!["127.0.0.1","localhost","[::1]"].includes(location.hostname)){C("error","Open the local Studio server to manage your Tripo API key.");return}F("status")}const bn={back:"m14.5 5-7 7 7 7",chevron:"m9 6 6 6-6 6",chat:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-6 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",preview:"M3 4.5h18v13H3zM8 21h8m-4-3.5V21",code:"m7.5 7-5 5 5 5m9-10 5 5-5 5m-3-14-3 18",assets:"m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5m-9 5v10",experiments:"M9 3h6m-5 0v6L4 19c-.5 1 .2 2 1.3 2h13.4c1.1 0 1.8-1 1.3-2L14 9V3M7 15h10",send:"M12 20V4m-7 7 7-7 7 7",restart:"M4 10a8 8 0 1 1 1 8M4 4v6h6",expand:"M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5",file:"M6 3h8l4 4v14H6V3Zm8 0v5h4",save:"M5 3h11l4 4v14H4V3Zm2 0v6h9V3M8 21v-8h8v8",download:"M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6",search:"M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-2 5.5 5.5",lab:"M4 19h16M7 15l4-7 3 4 3-6",layers:"m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5",camera:"M3 6h12v12H3Zm12 4 6-4v12l-6-4",audio:"M4 10h4l5-5v14l-5-5H4Zm13-3a7 7 0 0 1 0 10",image:"M3 4h18v16H3Zm0 13 6-6 4 4 3-3 5 5M16 8h.1",cursor:"m5 3 13 8-6 2-2 7Z",dots:"M4 7h16M4 12h16M4 17h10",clock:"M12 3a9 9 0 1 0 .01 0Zm0 4v5l3 2",warn:"m12 3 10 17H2Zm0 6v5m0 3v.1"},Re=[["preview","Preview"],["code","Code"],["assets","Assets"],["experiments","Experiments"]],ue=t=>`<svg class="cw-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${bn[t]}"/></svg>`;function S(t,n,r){const a=document.createElement(t);return n&&(a.className=n),r!=null&&(a.textContent=String(r)),a}function En(t){return typeof t=="string"?t:JSON.stringify(t,null,2)||""}function Cn(t){const n=t?.files??{},r=Array.isArray(n)?n.map(a=>[a.path,a]):Object.entries(n);return new Map(r.flatMap(([a,e])=>{const s=typeof e=="string"?e:e?.content;return a&&typeof s=="string"?[[a,s]]:[]}))}function vn(t){const n=[t.category,t.kind,t.type,t.name].join(" ").toLowerCase();return/board|spatial/.test(n)?"layers":/logic|rule|script|component/.test(n)?"code":/camera/.test(n)?"camera":/material|style|texture|image/.test(n)?"image":/interact|input/.test(n)?"cursor":/audio|sound/.test(n)?"audio":"assets"}let Qn=0;function Bn(t,n={}){const r="cw-"+ ++Qn,a=S("div","cw-shell");a.innerHTML=`
    <header class="cw-header">
      <button class="cw-back" type="button" data-back aria-label="Back to Studio" title="Back to Studio">${ue("back")}</button>
      <div class="cw-brand"><img src="./brand/cubiverse-symbol-light.svg" alt=""><span>CubiEngine <b>Studio</b></span></div>
      <span class="cw-header-slash" aria-hidden="true">/</span><h1 data-title tabindex="-1">Workbench</h1>
      <span class="cw-revision" data-revision hidden></span>
      <button type="button" class="cw-download" data-export hidden>${ue("download")}<span>Download game</span></button>
    </header>
    <div class="cw-layout">
      <aside class="cw-agent" aria-label="CubiEngine conversation">
        <div class="cw-agent-head"><span class="cw-agent-mark">${ue("assets")}</span><div><h2>CubiEngine Agent</h2><span>Project conversation</span></div>
          <button type="button" class="cw-mobile-chat" data-collapse aria-controls="${r}-conversation" aria-expanded="false">Show chat</button>
        </div>
        <div class="cw-conversation" id="${r}-conversation">
          <div class="cw-chat-scroll" data-chat-scroll><div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" data-messages></div>
            <div class="cw-chat-status" data-chat-status role="status" hidden><i></i><span></span></div>
            <div class="cw-error" data-error hidden><div>${ue("warn")}<span role="alert"></span></div><button type="button" data-retry>Try again</button><button type="button" data-revise>Revise brief</button><button type="button" data-example>Open local example</button></div>
          </div>
          <form class="cw-compose"><label for="${r}-input">Message the agent</label>
            <div class="cw-compose-box"><textarea id="${r}-input" rows="2" placeholder="Describe a change to your game…" data-input></textarea>
              <div><small>Shift + Enter for a new line</small><button type="submit" class="cw-send" aria-label="Send message" title="Send message">${ue("send")}</button></div>
            </div>
          </form>
        </div>
      </aside>
      <section class="cw-work" aria-label="Game workspace">
        <div class="cw-tabs" role="tablist" aria-label="Workspace views">${Re.map(([u,d],p)=>`<button type="button" id="${r}-tab-${u}" role="tab" aria-controls="${r}-panel-${u}" aria-selected="${p===0}" tabindex="${p===0?0:-1}" data-tab="${u}">${ue(u)}<span>${d}</span></button>`).join("")}</div>
        <section id="${r}-panel-preview" class="cw-panel cw-preview" role="tabpanel" aria-labelledby="${r}-tab-preview" data-panel="preview">
          <div class="cw-preview-head"><div><span class="cw-live-dot" data-live></span><h2>Live preview</h2></div><div>
            <button type="button" data-restart aria-label="Restart game" title="Restart game">${ue("restart")}</button>
            <button type="button" data-expand aria-label="Expand preview" title="Expand preview">${ue("expand")}</button>
          </div></div>
          <div class="cw-game" data-game></div>
          <div class="cw-preview-empty" data-preview-empty><span class="cw-wire" aria-hidden="true"><i></i><i></i><i></i></span><strong></strong><p></p></div>
        </section>
        <section id="${r}-panel-code" class="cw-panel cw-code" role="tabpanel" aria-labelledby="${r}-tab-code" data-panel="code" hidden>
          <div class="cw-files"><h2>Project files</h2><div data-files></div></div>
          <div class="cw-editor"><div class="cw-editor-head"><span data-filename>Select a file</span><button type="button" class="cw-outline" data-save>${ue("save")}<span>Save &amp; run</span></button></div>
            <textarea aria-label="Project source code" data-editor wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
            <div class="cw-editor-footer"><span data-code-status role="status"></span><button type="button" data-discard hidden>Discard changes</button></div>
          </div>
        </section>
        <section id="${r}-panel-assets" class="cw-panel cw-library" role="tabpanel" aria-labelledby="${r}-tab-assets" data-panel="assets" hidden>
          <div class="cw-section-head"><div><h2>Asset manager</h2><p data-asset-count></p></div><label class="cw-search">${ue("search")}<input type="search" placeholder="Find an asset" aria-label="Find an asset" maxlength="1600"></label></div>
          <div class="cw-library-tools"><div class="cw-library-views" role="group" aria-label="Asset collection"><button type="button" data-collection="project" aria-pressed="true">In this project</button><button type="button" data-collection="library" aria-pressed="false">Asset Library</button></div>
          <div class="cw-library-actions"><button type="button" class="cw-outline" data-tripo-settings aria-haspopup="dialog" aria-controls="tripo-settings">Tripo API key</button><button type="button" class="cw-outline" data-import-glb>Import GLB</button></div><input type="file" accept=".glb,model/gltf-binary" data-glb hidden></div>
          <p class="cw-import-status" data-import-status role="status"></p>
          <div class="cw-asset-grid" data-assets></div>
          <div class="cw-detail" data-asset-detail hidden></div>
          <div class="cw-quote" data-quote hidden></div>
        </section>
        <section id="${r}-panel-experiments" class="cw-panel cw-history" role="tabpanel" aria-labelledby="${r}-tab-experiments" data-panel="experiments" hidden>
          <div class="cw-section-head"><div><h2>Experiments</h2><p>Builds, revisions and their recorded results.</p></div></div>
          <div data-experiments></div>
        </section>
      </section>
    </div>`,t.replaceChildren(a);const e=u=>a.querySelector(u),s=u=>[...a.querySelectorAll(u)],c=e("[data-input]"),i=e("[data-editor]"),y=e("[data-game]"),v=e("[data-chat-scroll]"),A=e('[data-panel="preview"]'),g=new Map;let o={messages:[],experiments:[]},C=new Map,B="",T="",F="project",D=Oe,K,H=!1,X=[],W="preview",re="",b=!1,O=!1,$=null,oe=0,ie,Ae,G=!1,ge,l=!1;const I=fn(e("[data-quote]"),u=>{K=u,D.some(d=>d.id===u.id)||(D=[...D,u]),T=u.id,M()},()=>o.id||o.projectId||o.project?.id),f=()=>{oe++,typeof $=="function"?$():$?.dispose?.(),$=null,y.replaceChildren()};function k(u,d=!1){W=u,s("[data-tab]").forEach(p=>{const E=p.dataset.tab===u;p.setAttribute("aria-selected",String(E)),p.tabIndex=E?0:-1,E&&d&&p.focus()}),s("[data-panel]").forEach(p=>{p.hidden=p.dataset.panel!==u}),u==="assets"&&M(),u==="experiments"&&Qe(),u==="preview"&&requestAnimationFrame(()=>window.dispatchEvent(new Event("resize")))}s("[data-tab]").forEach((u,d)=>{u.onclick=()=>k(u.dataset.tab),u.onkeydown=p=>{const E={ArrowRight:(d+1)%Re.length,ArrowLeft:(d+Re.length-1)%Re.length,Home:0,End:Re.length-1}[p.key];E!==void 0&&(p.preventDefault(),k(Re[E][0],!0))}});function R(u,d=""){const p=e("[data-preview-empty]");p.querySelector("strong").textContent=u,p.querySelector("p").textContent=d,p.hidden=!1,e("[data-live]").dataset.ready="false"}async function w(){f();const u=oe,d=o.project;if(ie=d,Ae=o.revision??d?.revision,!d){if(o.pendingQuestion&&!o.busy){R("Waiting for your answer","Reply in the conversation to continue generating your game.");return}R(o.busy?"Building your first preview":o.error?"Preview unavailable":"Waiting for a project",o.busy?"Your game will appear here when the build is ready.":o.error?"See the build details in the conversation.":"");return}if(!n.onPreview){R("Preview unavailable");return}e("[data-preview-empty]").hidden=!0,e("[data-live]").dataset.ready="true";const p=S("div","cw-runtime");y.append(p);try{const E=await n.onPreview(p,d);u===oe?$=E:typeof E=="function"?E():E?.dispose?.()}catch(E){if(u!==oe)return;y.replaceChildren(),R("Could not start the preview",E.message)}}e("[data-restart]").onclick=w,e("[data-export]").onclick=async()=>{if(!(!o.project||!n.onExport||l)){l=!0,e("[data-export]").disabled=!0;try{await n.onExport(o.project)}catch(u){re=u.message,m()}finally{l=!1,G||(e("[data-export]").disabled=!!o.busy)}}},e("[data-expand]").onclick=async()=>{if(document.fullscreenElement===A)return document.exitFullscreen();try{await A.requestFullscreen()}catch{A.classList.toggle("cw-max"),L()}};function L(){const u=document.fullscreenElement===A||A.classList.contains("cw-max"),d=e("[data-expand]");d.title=u?"Exit expanded preview":"Expand preview",d.setAttribute("aria-label",d.title)}document.addEventListener("fullscreenchange",L);const U=u=>{u.key==="Escape"&&(A.classList.remove("cw-max"),L())};document.addEventListener("keydown",U),e("[data-collapse]").onclick=()=>{const u=a.classList.toggle("cw-chat-open");e("[data-collapse]").setAttribute("aria-expanded",String(u)),e("[data-collapse]").textContent=u?"Hide chat":"Show chat"};function m(){const u=e("[data-messages]"),d=(o.messages||[]).map(j=>({role:j.role||"assistant",content:En(j.content??j.text??"")})),p=X.length<=d.length&&X.every((j,z)=>j.role===d[z].role&&j.content===d[z].content),E=v.scrollHeight-v.scrollTop-v.clientHeight<45;p||u.replaceChildren();for(const j of d.slice(p?X.length:0)){const z=S("article","cw-message");z.dataset.role=j.role,z.append(S("strong","cw-author",j.role==="user"?"You":j.role==="system"?"Studio":"CubiEngine"),S("p","",j.content)),u.append(z)}X=d;const h=e("[data-chat-status]");h.hidden=!o.busy,h.querySelector("span").textContent=o.status||"Working on your project…";const ae=e("[data-error]"),ee=o.error?.message||o.error||re;ae.hidden=!ee,ae.querySelector("span").textContent=ee||"",e("[data-retry]").hidden=!o.error||!n.onRetry,e("[data-retry]").textContent=o.canRepairChecks?"Repair failed checks":o.pendingQuestion?"Retry original request":"Try again",e("[data-retry]").disabled=!!(o.busy||b),e("[data-example]").hidden=!!(o.pendingQuestion||o.project||o.busy||!o.error||!n.onStartExample),e("[data-example]").disabled=b,e("[data-revise]").hidden=!!(o.project||o.busy||!o.error||!n.onReviseBrief),x(),E&&(v.scrollTop=v.scrollHeight)}function x(){const u=!!o.pendingQuestion;c.disabled=!o.project&&!u,c.placeholder=u?"Type your answer…":o.project?"Describe a change to your game…":"Editing opens after the first build.",e(".cw-compose label").textContent=u?"Reply to continue the build":"Message the agent";const d=e(".cw-send");d.title=u?"Send answer and continue":"Send message",d.setAttribute("aria-label",d.title),d.disabled=!!(c.disabled||!c.value.trim()||b||o.busy||!n.onSend)}e(".cw-compose").onsubmit=async u=>{u.preventDefault();const d=c.value.trim();if(!d||b||o.busy||c.disabled||!n.onSend)return;const p=o.pendingQuestion,E=c.value;re="",b=!0,c.value="",m();try{await n.onSend(d)===!1&&!c.value&&(!p||o.pendingQuestion===p)&&(c.value=E)}catch(h){re=h.message,c.value||(c.value=E)}finally{b=!1,G||m()}},c.oninput=x,c.onkeydown=u=>{u.key==="Enter"&&!u.shiftKey&&!u.isComposing&&u.keyCode!==229&&(u.preventDefault(),e(".cw-compose").requestSubmit())},e("[data-retry]").onclick=async()=>{if(!(b||o.busy||!o.error)){b=!0,m();try{await n.onRetry()}catch(u){re=u.message}finally{b=!1,G||m()}}},e("[data-example]").onclick=async()=>{if(!(b||o.busy||o.project)){b=!0,m();try{await n.onStartExample()}catch(u){re=u.message}finally{b=!1,G||m()}}},e("[data-revise]").onclick=()=>le(n.onReviseBrief);function V(){return g.size>0}e("[data-back]").onclick=()=>{(!V()||window.confirm("Leave Studio and discard your unsaved code changes?"))&&n.onBack?.()};const _=u=>{V()&&(u.preventDefault(),u.returnValue="")};window.addEventListener("beforeunload",_);function Q(){const u=g.get(B),d=C.get(B),p=u&&u.base!==d,E=u?.text??d??"";i.value!==E&&(i.value=E),i.disabled=d===void 0||!n.onSaveFile,e("[data-filename]").textContent=B||"No project files",e("[data-code-status]").textContent=p?"This file changed in the project. Discard your draft to load the latest source.":u?.error||(u?"Unsaved changes":B?"Project source":"Files appear after generation."),e("[data-save]").disabled=!u||p||O||o.busy||!n.onSaveFile,e("[data-discard]").hidden=!u,e("[data-discard]").disabled=O}function J(){const u=e("[data-files]"),d=[];for(const p of C.keys()){const E=S("button","cw-file");E.type="button",E.title=p,E.innerHTML=ue("file"),E.append(S("span","",p)),g.has(p)&&E.append(S("i","cw-unsaved")),E.setAttribute("aria-pressed",String(p===B)),E.onclick=()=>{B=p,J(),Q(),i.focus()},d.push(E)}u.replaceChildren(...d)}i.oninput=()=>{B&&(i.value===C.get(B)?g.delete(B):g.set(B,{base:g.get(B)?.base??C.get(B),text:i.value}),J(),Q())},i.onkeydown=u=>{(u.ctrlKey||u.metaKey)&&u.key.toLowerCase()==="s"&&(u.preventDefault(),e("[data-save]").click())},e("[data-discard]").onclick=()=>{g.delete(B),J(),Q()},e("[data-save]").onclick=async()=>{const u=B,d=g.get(u);if(!(!d||O||o.busy||d.base!==C.get(u))){O=!0,Q();try{if(await n.onSaveFile(u,d.text)===!1){d.error=o.error?.message||o.error||"This revision could not be saved.";return}g.get(u)===d&&C.get(u)===d.text&&g.delete(u),W==="code"&&B===u&&C.get(u)===d.text&&!g.has(u)&&k("preview",!0)}catch(p){d.error=p.message}finally{O=!1,G||(J(),Q())}}};function M(){const u=o.assets??o.project?.assets??[],d=Array.isArray(u)?u:Object.values(u),p=F==="library",E=e(".cw-search input").value.trim(),h=E.toLowerCase();let ae=p?D:d;if(h){const Z=ae.filter(Y=>{const pe=typeof Y=="string"?{name:Y}:Y||{};return[pe.name,pe.title,pe.id,pe.category,pe.description,...pe.tags||[]].join(" ").toLowerCase().includes(h)});ae=p?[...new Set([...Z,...ln(h,{limit:8,catalog:D})])]:Z,p&&T&&K?.id===T&&!ae.some(Y=>Y.id===T)&&(ae=[...ae,D.find(Y=>Y.id===T)||K])}const ee=[],j=e("[data-assets]"),z=e("[data-asset-detail]"),Ke=p?D.length:d.length;e("[data-asset-count]").textContent=Ke+(Ke===1?" asset":" assets")+(p?" in the library":" in this project");let q;if(ae.forEach(Z=>{const Y=typeof Z=="string"?{name:Z}:Z;if(!Y)return;const pe=Y.name||Y.title||Y.label||Y.id||"Asset",et=Y.category||Y.kind||Y.type||"Project asset",Ie=Y.id||Y.path||pe;T===Ie&&(q=Y);const be=S("button","cw-asset");be.type="button",be.setAttribute("aria-pressed",String(Ie===T));const Me=S("span","cw-asset-glyph");Me.innerHTML=ue(vn(Y)),be.append(Me,S("small","",et),S("strong","",pe)),be.onclick=()=>{T=Ie===T?"":Ie,M()},ee.push(be)}),j.replaceChildren(...ee),ee.length||j.append(S("p","cw-empty-text",h?"No matching assets.":o.project?"This project has no linked assets.":"Generated and retrieved assets appear here after generation.")),z.hidden=!q,q){if(z.replaceChildren(S("h3","",q.name||q.title||q.id||"Asset details")),q.description&&z.append(S("p","",q.description)),(q.path||q.usage)&&z.append(S("pre","",[q.path,q.usage].filter(Boolean).join(`
`))),q.format==="glb"&&/^[a-f\d-]+$/i.test(q.id)){const Z=S("a","cw-outline","Download GLB");Z.href="/api/v1/asset-library/"+encodeURIComponent(q.id)+"/file",Z.download=q.id+".glb",z.append(Z)}if(p&&(q.source||q.format==="glb")&&n.onUseAsset){const Z=C.has(q.path)||d.some(pe=>pe.id===q.id),Y=S("button","cw-outline",Z?"Already in project":"Add to project");Y.type="button",Y.disabled=!!(o.busy||!o.project||Z),Y.onclick=()=>le(()=>n.onUseAsset(q)),z.append(Y)}else if(q.path&&C.has(q.path)){const Z=S("button","cw-outline","Open source");Z.type="button",Z.onclick=()=>{B=q.path,J(),Q(),k("code"),i.focus()},z.append(Z)}}e("[data-quote]").hidden=!p,e("[data-import-glb]").disabled=!!(H||o.busy||!o.project||!n.onUseAsset),I.update(E)}e(".cw-search input").oninput=()=>{T="",K=null,M()},e("[data-tripo-settings]").onclick=()=>yn({onOpenLibrary:async()=>{await e('[data-collection="library"]').onclick(),G||(I.selectProvider("tripo"),e(".cw-search input").focus())}}),s("[data-collection]").forEach(u=>{u.onclick=async()=>{if(F=u.dataset.collection,T="",K=null,s("[data-collection]").forEach(d=>d.setAttribute("aria-pressed",String(d===u))),M(),F==="library")try{const d=await gn();G||(D=[...Oe,...(d.assets||[]).filter(p=>p.format==="glb")],!G&&F==="library"&&M())}catch{}u.focus()}}),e("[data-import-glb]").onclick=()=>e("[data-glb]").click(),e("[data-glb]").onchange=async u=>{const d=u.target.files[0];if(u.target.value="",!d||H||!o.project)return;const p=ge,E=e("[data-import-status]");H=!0,M(),E.textContent="Inspecting and normalizing "+d.name+"…";try{const h=await mn(d);if(G||p!==ge)return;D.some(ee=>ee.id===h.id)||(D=[...D,h]);const ae=await n.onUseAsset(h);G||(E.textContent=ae===!1?"Model saved in Asset Library. See the project error in chat.":"Imported "+h.name+".")}catch(h){G||(E.textContent=h.message)}finally{H=!1,G||M()}};async function le(u){try{await u()}catch(d){re=d.message,m()}}const we=new Map,me=new Set,ve=new Set,ye=new Map;function Qe(){const u=o.experiments||[],d=e("[data-experiments]"),p=new Set([...d.querySelectorAll("details[open]")].map(h=>h.dataset.record)),E=u.map((h,ae)=>{const ee=S("details","cw-run"),j=h.id||h.experimentId||h.runId||String(ae+1);ee.dataset.record=j,ee.open=p.has(String(j));const z=S("summary"),Ke=S("span","cw-run-icon");Ke.innerHTML=ue("lab");const q=S("div","cw-run-name"),Z=h.testResults||[],Y=Z.filter(N=>N.passed===!0).length,pe=Z.length?Y+"/"+Z.length+" checks passed":"No checks recorded",et={generate:"First build",edit:"Agent edit",code:"Code edit",asset:"Add asset",example:"Local example",restore:"Restore revision"};q.append(S("strong","",h.title||h.action||et[h.kind]||h.kind||"Experiment"),S("small","cw-run-metrics",[h.model,pe].filter(Boolean).join(" · ")));const Ie=(h.runtimeLogs||[]).filter(N=>N?.type==="error").at(-1),be=h.error||Ie?.message||Z.find(N=>N.passed===!1)?.detail;if(be&&q.append(S("span","cw-run-diagnostic",String(be))),z.append(Ke,q),h.status){const N=S("span","cw-run-status",h.status==="needs-input"?"Needs input":h.status);N.dataset.status=h.status,z.append(N)}const Me=S("span","cw-run-arrow");Me.innerHTML=ue("chevron"),z.append(Me),ee.append(z);const Se=S("div","cw-run-details");if(Se.append(S("code","cw-run-id",j)),h.spatialPlan){const N=o.messages?.some(de=>de.role==="user"&&/[\u3400-\u9fff]/u.test(de.content)),te=h.canonicalIR?.target,se=S("details","cw-run-contract");if(se.append(S("summary",null,(N?"已選空間規則 · ":"Agreed spatial rules · ")+(h.spatialPlan.label||Ye(h.spatialPlan.family,N?"zh":"en")))),te){te.dimensions&&se.append(S("p","",te.dimensions.join(" × ")));const de=h.gameUnderstanding?.rules||h.canonicalIR.source?.rules||[];for(const tt of te.ruleMappings||[]){const Ht=de.find(Pt=>Pt.id===tt.sourceRule),mt=S("p","");mt.append(S("strong","",Ht?.description||tt.sourceRule),document.createTextNode(" → "+tt.targetRule)),se.append(mt)}te.interaction&&se.append(S("p","",te.interaction))}Se.append(se)}if(h.repair){const N=S("details","cw-run-repair");N.append(S("summary","","Checks before repair"),S("p","",h.repair.error));for(const te of h.repair.testResults.filter(se=>!se.passed))N.append(S("p","",[te.name,te.detail].filter(Boolean).join(" · ")));Se.append(N)}if((h.summary||!be&&h.qualityAssessment?.message)&&Se.append(S("p","",h.summary||h.qualityAssessment.message)),Z.length){const N=S("ul","cw-test-list");for(const te of Z){const se=S("li","");se.append(S("b",te.passed?"cw-check-pass":"cw-check-fail",te.passed?"Pass":"Fail"),S("span","",[te.name,te.detail].filter(Boolean).join(" · "))),N.append(se)}Se.append(N)}ee.append(Se);const Ge=S("div","cw-run-actions"),Ne=S("button","cw-outline","Download record");Ne.type="button";const Te=S("p","cw-replay-status",ye.get(j)||"");if(Te.setAttribute("role","status"),Ne.onclick=async()=>{Ne.disabled=!0;let N=h;if(n.onReadExperiment)try{N=await n.onReadExperiment(j)||h}catch{Te.textContent="The archive could not be loaded. Downloaded the recorded metadata."}if(!G)try{const te=URL.createObjectURL(new Blob([JSON.stringify(N,null,2)],{type:"application/json"})),se=document.createElement("a");se.href=te,se.download=String(j).replace(/[^a-zA-Z0-9_-]/g,"-")+".json",se.click(),setTimeout(()=>URL.revokeObjectURL(te),1e3)}catch(te){Te.textContent=te.message}finally{Ne.disabled=!1}},Ge.append(Ne),n.onReplay&&h.status!=="running"){const N=S("button","cw-outline","Run checks again");N.type="button",Ge.append(N);const te=h.hasSnapshot??!!(h.project||h.snapshot||h.status==="succeeded"||we.get(j));N.hidden=!te,N.disabled=!!(o.busy||ve.has(j));async function se(){if(!(te||h.hasSnapshot!=null||!n.onReadExperiment||we.has(j)||me.has(j))){me.add(j);try{const de=await n.onReadExperiment(j);we.set(j,!!(de?.project?.files||de?.generatedCode)),!G&&W==="experiments"&&!a.contains(N)?Qe():N.hidden=!we.get(j)}catch(de){Te.textContent=de.message}finally{me.delete(j)}}}ee.ontoggle=()=>{ee.open&&se()},ee.open&&se(),N.onclick=async()=>{if(!ve.has(j)){ve.add(j),N.disabled=!0,ye.set(j,"Running the archived project checks…"),Te.textContent=ye.get(j);try{const de=await n.onReplay(j);ye.set(j,de?.summary||(de?.passed?"Archived checks passed.":"Archived checks failed."))}catch(de){ye.set(j,de.message)}finally{ve.delete(j),!G&&W==="experiments"&&Qe()}}}}if(n.onRestore&&h.status==="succeeded"&&(h.project||h.snapshot||h.revision!=null)){const N=S("button","cw-outline","Restore revision");N.type="button",N.disabled=!!(o.busy||V()),N.onclick=()=>le(()=>n.onRestore(h)),Ge.append(N)}return ee.append(Ge,Te),ee});d.replaceChildren(...E),u.length||d.append(S("p","cw-empty-text","Experiment records appear when a build or edit is recorded."))}function ke(u={}){if(G)return;Object.hasOwn(u,"error")&&(re="");const d=!!(o.error||o.pendingQuestion);o={...o,...u};const p=o.project,E=o.revision??p?.revision,h=o.id??o.projectId??p?.id;ge!=null&&h!==ge&&(g.clear(),T="",B="",re="",c.value="",e(".cw-search input").value=""),ge=h,a.dataset.busy=String(!!o.busy),e("[data-title]").textContent=o.title||p?.title||"Workbench";const ae=e("[data-revision]");ae.hidden=E==null,ae.textContent=E==null?"":typeof E=="number"?"Rev "+E:String(E),e("[data-back]").hidden=!n.onBack,e("[data-export]").hidden=!p||!n.onExport,e("[data-export]").disabled=!!(o.busy||l),e("[data-restart]").disabled=!p||!n.onPreview,C=Cn(p),C.has(B)||(B=C.has("main.js")?"main.js":C.keys().next().value||"");for(const[j,z]of g)C.get(j)===z.text&&g.delete(j);J(),Q(),m(),!d&&(o.error||o.pendingQuestion)&&window.matchMedia("(max-width:760px)").matches&&!a.classList.contains("cw-chat-open")&&e("[data-collapse]").click(),W==="assets"&&M(),W==="experiments"&&Qe();const ee=E==null?p!==ie:E!==Ae||p?.id!==ie?.id;(!p||ee)&&w()}ke();function We(){G=!0,f(),I.destroy(),document.removeEventListener("fullscreenchange",L),document.removeEventListener("keydown",U),window.removeEventListener("beforeunload",_),a.remove()}return{update:ke,destroy:We,selectTab:k}}const kn=`// This entire bootstrap runs in a separate, opaque-origin document.
(() => {
  let active = false;
  let failed = false;
  let logCount = 0;
  let token = '';
  let cleanup;
  let checkingInput = false;
  let startingGame = false;
  const objectUrls = [];
  const results = [];
  const root = document.getElementById('game');
  const embedded = document.getElementById('embedded-game');
  const scriptNonce = document.currentScript.nonce;

  function notify(type, message, testResults, checkFailure = false) {
    parent.postMessage({ channel: 'cubiverse-preview', token, type, message: String(message).slice(0, 1600), testResults, checkFailure }, '*');
  }

  function report(message) {
    if (++logCount <= 120) notify('log', message);
  }

  function fail(error, checkFailure = false) {
    if (failed) return;
    failed = true;
    const message = error?.message || String(error);
    const status = document.getElementById('preview-error');
    status.hidden = false;
    status.textContent = message;
    notify('error', message, results, checkFailure);
  }

  function startupFailure(error) {
    const detail = error?.message || String(error);
    // A device that cannot create a graphics context or load runtime resources
    // cannot validate a model repair. Keep that failure at the preview stage.
    const unavailable = /(?:error (?:creating|initializing)|could not create|unable to (?:create|initialize)|failed to (?:create|initialize)).{0,50}(?:webgl|graphics context)|webgl.{0,40}(?:not supported|unavailable|context lost)|failed to fetch dynamically imported module|networkerror/i.test(detail);
    if (startingGame && !checkingInput && !unavailable && !failed) {
      const name = 'Browser game mounted';
      const row = {name, passed:false, detail:detail.slice(0,600)};
      const previous = results.findIndex(test => test.name === name);
      if (previous < 0) results.push(row); else results[previous] = row;
      fail(error,true);
    } else fail(error,checkingInput && !unavailable);
  }
  addEventListener('error', event => startupFailure(event.error || event.message));
  addEventListener('unhandledrejection', event => startupFailure(event.reason || 'Unhandled game error'));
  addEventListener('pagehide', () => {
    try { cleanup?.(); } finally { objectUrls.forEach(url => URL.revokeObjectURL(url)); }
  }, { once: true });

  async function runGameChecks() {
    const checks = await import('cubi-project:checks.js');
    if (typeof checks.runChecks !== 'function') throw new Error('checks.js must export runChecks().');
    const rows = await checks.runChecks();
    if (!Array.isArray(rows) || !rows.length || rows.length > 100) throw new Error('runChecks() must return 1–100 test results.');
    for (const row of rows) {
      if (!row || typeof row.name !== 'string' || typeof row.passed !== 'boolean') {
        throw new Error('Each check requires a name and a boolean passed value.');
      }
      results.push({ name: row.name.slice(0, 180), passed: row.passed, detail: String(row.detail || '').slice(0, 600) });
    }
    const failures = results.filter(row => !row.passed);
    if (failures.length) {
      const details = failures.map(row => row.detail ? \`\${row.name} (\${row.detail})\` : row.name);
      throw new Error('Game check failed: ' + details.join(', '));
    }
  }

  async function start(data) {
    if (active) return;
    active = true;
    token = data.token;
    for (const method of ['log', 'info', 'warn', 'error']) {
      const original = console[method].bind(console);
      console[method] = (...args) => {
        original(...args);
        report(args.map(value => typeof value === 'string' ? value : String(value)).join(' '));
      };
    }
    try {
      const imports = Object.create(null);
      for (const [name, code] of Object.entries(data.modules)) {
        const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
        imports[name] = url;
        objectUrls.push(url);
      }
      const map = document.createElement('script');
      map.type = 'importmap';
      map.nonce = scriptNonce;
      map.textContent = JSON.stringify({ imports });
      document.head.append(map);
      const THREE = await import('three');
      startingGame = true;
      const game = await import('cubi-project:main.js');
      if (typeof game.mount !== 'function') throw new Error('main.js must export mount({ THREE, root, assets, report }).');
      if (imports['cubi-project:checks.js']) {
        try { await runGameChecks(); }
        catch (error) { fail(error, true); return; }
      }
      let live, rules, verifier, spatialRuntime;
      if (data.canonicalTarget) {
        try {
          [verifier, spatialRuntime, {spatialRules:rules}] = await Promise.all([
            import('cubi-runtime:canonical'), import('cubi-runtime:spatial'), import('cubi-project:logic.js'),
          ]);
          const rows = verifier.runCanonicalChecks(data.canonicalTarget, rules);
          results.push(...rows);
          const failure = rows.find(row => !row.passed);
          if (failure) throw Error(failure.name + ': ' + failure.detail);
          live = spatialRuntime.createLiveSpatialController(rules, crypto.getRandomValues(new Uint32Array(1))[0]);
        } catch (error) { fail(error, true); return; }
      }
      const scheduler = live && spatialRuntime.createSpatialFrameClock(window, data.verifySpatialInput);
      const handle = await game.mount({ THREE, root, assets: data.assets, report, ...(live && {spatial:live.spatial, clock:scheduler.clock}) });
      cleanup = typeof handle === 'function' ? handle : handle?.dispose?.bind(handle);
      if (!root.childElementCount) throw new Error('Game startup finished without adding a view to the preview.');
      results.push({ name: 'Browser game mounted', passed: true });
      if (live) {
        let name = 'Canonical • mounted game subscribes to spatial rules';
        checkingInput = true;
        try {
          live.assertView(handle);
          results.push({name, passed:true});
          if (data.verifySpatialInput) {
            name = 'Canonical • player input changes the mounted spatial state';
            const probe = verifier.canonicalLiveProbe(data.canonicalTarget);
            await spatialRuntime.checkMountedSpatialInput(live, rules, probe, handle, root, scheduler);
            results.push({name, passed:true, detail:'Replayed a player action through the mounted DOM control against the seeded spatial witness.'});
          }
        } catch (error) {
          results.push({name, passed:false, detail:String(error.message || error).slice(0,600)});
          fail(error, true);
          return;
        } finally { checkingInput = false; }
      }
      // Rejections and startup errors queued by mount must arrive before a successful revision.
      await new Promise(resolve => setTimeout(resolve, 0));
      startingGame = false;
      if (!failed) notify('ready', 'Game running', results);
    } catch (error) {
      startupFailure(error);
    }
  }
  if (embedded) start(JSON.parse(embedded.textContent));
  else addEventListener('message', event => {
    if (event.source === parent && event.data?.channel === 'cubiverse-preview-load') start(event.data);
  });
})();
`,xn=`// This module is embedded as a private runtime module inside the game iframe.
// The editable logic owns transitions. The view receives one controller for them.
export function createLiveSpatialController(rules, seed) {
  for (const name of ['initialState', 'isLegal', 'step', 'observe']) {
    if (typeof rules?.[name] !== 'function') throw Error('logic.js spatialRules needs ' + name + '().');
  }
  const listeners = new Set();
  let state = rules.initialState(seed);
  let inspectAction, mapping = false;

  function read() {
    return structuredClone(state);
  }
  function notify() {
    for (const listener of listeners) listener(read());
  }
  const spatial = Object.freeze({
    getState: read,
    dispatch(action) {
      if (mapping) throw Error('inputFor must describe player input without applying it.');
      if (!rules.isLegal(state, action)) return false;
      const next = rules.step(state, action);
      if (next == null) throw Error('spatialRules.step must return the next game state.');
      state = next;
      inspectAction?.(action, state);
      notify();
      return true;
    },
    reset(nextSeed = seed) {
      if (mapping) throw Error('inputFor cannot reset the game.');
      state = rules.initialState(nextSeed);
      notify();
    },
    subscribe(listener) {
      if (typeof listener !== 'function') throw Error('spatial.subscribe requires a render callback.');
      listeners.add(listener);
      listener(read());
      return () => listeners.delete(listener);
    },
  });
  return {
    spatial,
    observation() { return structuredClone(rules.observe(state)); },
    assertView(handle) {
      if (!listeners.size) throw Error('The mounted view must subscribe to the live spatial state.');
      if (typeof handle?.inputFor !== 'function') throw Error('mount must return inputFor(action) for the mounted game controls.');
    },
    inputsFor(handle, action) {
      mapping = true;
      try { return handle.inputFor(structuredClone(action)); }
      finally { mapping = false; }
    },
    trackAction(listener) { inspectAction = listener; },
  };
}

// Compare JSON data independently of the order in which object keys were added.
function signature(value) {
  return JSON.stringify(value, (_key, entry) => entry && typeof entry === 'object' && !Array.isArray(entry)
    ? Object.fromEntries(Object.keys(entry).sort().map(key => [key, entry[key]])) : entry);
}

function sendPlayerInput(root, input) {
  const { element, type, init = {} } = input || {};
  if (!element?.dispatchEvent || !root.contains(element) || element.disabled || element.closest('[hidden],[inert],[aria-disabled="true"]')) {
    throw Error('inputFor must identify an enabled control in the mounted game.');
  }
  const view = root.ownerDocument.defaultView;
  const rect = element.getBoundingClientRect();
  const style = view.getComputedStyle(element);
  if (!(rect.width && rect.height) || style.visibility !== 'visible' || style.display === 'none') {
    throw Error('The spatial control is not visible on the mounted board.');
  }
  const constructors = {
    click: view.MouseEvent, mousedown: view.MouseEvent, mouseup: view.MouseEvent,
    pointerdown: view.PointerEvent, pointerup: view.PointerEvent, pointermove: view.PointerEvent,
    keydown: view.KeyboardEvent, keyup: view.KeyboardEvent,
  };
  if (!Object.hasOwn(constructors, type)) throw Error('inputFor returned an unsupported control event: ' + type);
  const options = {bubbles:true, cancelable:true, composed:true};
  let eventTarget = element;
  if (type === 'keydown' || type === 'keyup') {
    options.key = String(init.key || '');
    options.code = String(init.code || '');
  } else {
    options.clientX = init.clientX ?? rect.left + rect.width / 2;
    options.clientY = init.clientY ?? rect.top + rect.height / 2;
    const { clientX, clientY } = options;
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY) || clientX < rect.left ||
        clientX >= rect.right || clientY < rect.top || clientY >= rect.bottom) {
      throw Error('Spatial input projects outside its game control.');
    }
    const hit = root.ownerDocument.elementFromPoint(clientX, clientY);
    if (!hit || !element.contains(hit)) throw Error('The selected spatial control is offscreen or covered.');
    eventTarget = hit;
    options.button = init.button ?? 0;
    options.buttons = init.buttons ?? (type.endsWith('down') ? (options.button === 2 ? 2 : 1) : 0);
    options.pointerId = Number.isInteger(init.pointerId) ? init.pointerId : 1;
    options.pointerType = ['mouse', 'touch', 'pen'].includes(init.pointerType) ? init.pointerType : 'mouse';
    options.isPrimary = true;
  }
  for (const key of ['shiftKey', 'altKey', 'ctrlKey', 'metaKey']) options[key] = Boolean(init[key]);
  eventTarget.dispatchEvent(new constructors[type](type, options));
}

function nextFrame(view) {
  return new Promise(resolve => {
    const timer = setTimeout(resolve, 60);
    view.requestAnimationFrame(() => { clearTimeout(timer); resolve(); });
  });
}

// In a verification mount, only the verifier holds advance(). Game code gets the
// same three clock methods in live play and tests, including normal RAF timing.
export function createSpatialFrameClock(view, controlled) {
  if (!controlled) return {clock:{
    now:() => view.performance.now(),
    requestAnimationFrame:callback => view.requestAnimationFrame(callback),
    cancelAnimationFrame:id => view.cancelAnimationFrame(id),
  }};
  let time = 0, nextId = 1;
  const pending = new Map();
  const clock = Object.freeze({
    now:() => time,
    requestAnimationFrame(callback) {
      const id = nextId++;
      pending.set(id,callback);
      return id;
    },
    cancelAnimationFrame:id => pending.delete(id),
  });
  return {clock, get pending() { return pending.size; }, advance(ms) {
    const start = time;
    const count = Math.max(1, Math.ceil(ms * 60 / 1000));
    for (let i = 1; i <= count; i++) {
      time = start + ms * i / count;
      for (const [id,callback] of [...pending]) {
        if (pending.delete(id)) callback(time);
      }
    }
  }};
}

// Floating-point addition over 27 ordinary movement frames can round a position
// differently from a single 450 ms transition. Preserve every observation field
// and distinguish integer observations exactly.
function sameTimedObservation(a,b) {
  if (a === b) return true;
  if (Number.isFinite(a) && Number.isFinite(b)) return Math.abs(a-b) <= 1e-7;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(key => Object.hasOwn(b,key) && sameTimedObservation(a[key],b[key]));
}

// Only called in the disposable verification iframe. Live previews and exports
// never get synthetic moves. Exercise the actual DOM listener for the last move
// after putting the exact canonical witness's prerequisite moves on the board.
export async function checkMountedSpatialInput(live, rules, probe, handle, root, scheduler) {
  live.assertView(handle);
  if (!probe?.actions?.length) throw Error('The spatial contract needs a legal player-action witness.');
  const { actions, seed } = probe;
  // Establish the first RAF timestamp before rebuilding the witness state.
  scheduler?.advance?.(0);
  live.spatial.reset(seed);
  // Rebuild the oracle from the same seed; a structured-cloned view snapshot
  // may omit prototype methods used by an existing game's native rule objects.
  let reference = rules.initialState(seed);
  for (const setup of actions.slice(0, -1)) {
    if (!rules.isLegal(reference,setup)) throw Error('The reference rejected a spatial witness prerequisite.');
    reference = rules.step(reference,structuredClone(setup));
    if (!live.spatial.dispatch(structuredClone(setup))) throw Error('A prerequisite action was rejected by the mounted game.');
  }
  const action = actions.at(-1);
  if (!rules.isLegal(reference, action)) throw Error('The mounted spatial witness must end with a legal action.');
  const before = signature(rules.observe(reference));
  const expected = signature(rules.observe(rules.step(reference, structuredClone(action))));
  if (before === expected) throw Error('The mounted witness needs an observable state change.');
  const view = root.ownerDocument.defaultView;
  await nextFrame(view);
  const input = live.inputsFor(handle, action);
  const events = Array.isArray(input) ? input : [input];
  if (!events.length || events.length > 12) throw Error('inputFor must return one to twelve DOM inputs.');
  let matched = false, observed;
  const expectedAction = signature(action);
  const timed = scheduler?.pending && action.type === 'frame' && action.seconds > 0 && Number.isFinite(action.seconds);
  const start = timed ? scheduler.clock.now() : 0;
  let elapsed = 0, diverged = false, accumulated = false;
  const frameInput = frame => signature({...frame,seconds:undefined});
  const requestedInput = timed && frameInput(action);
  live.trackAction((actual, state) => {
    if (matched) return;
    if (timed && actual.type === 'frame') {
      elapsed += actual.seconds;
      if (!(actual.seconds > 0) || !Number.isFinite(elapsed) || frameInput(actual) !== requestedInput) diverged = true;
      if (!diverged && Math.abs(elapsed - action.seconds) <= 1e-8 &&
          Math.abs((scheduler.clock.now() - start) / 1000 - elapsed) <= 1e-8) {
        accumulated = true;
        matched = true;
        observed = signature(rules.observe(state));
      }
    } else if (signature(actual) === expectedAction) {
      matched = true;
      // Record the live result at dispatch time before any subsequent simulation tick.
      observed = signature(rules.observe(state));
    }
  });
  try {
    let delay = 0;
    for (const event of events) {
      const wait = event?.waitMs ?? 0;
      if (!Number.isFinite(wait) || wait < 0 || (delay += wait) > 1000) throw Error('A spatial input sequence can wait up to one second.');
      if (wait && scheduler?.pending) scheduler.advance(wait);
      else if (wait) await new Promise(resolve => setTimeout(resolve, wait));
      sendPlayerInput(root, event);
    }
    // Games may apply keyboard/pointer input in their next animation tick.
    for (let frame = 0; !matched && frame < 6; frame++) {
      if (scheduler?.pending) scheduler.advance(1000/60);
      else await nextFrame(view);
    }
    if (!matched) throw Error('The mounted control did not dispatch the canonical action ' + expectedAction.slice(0, 240));
    const wanted = accumulated && JSON.parse(expected);
    const correct = accumulated ? sameTimedObservation(JSON.parse(observed),wanted) && sameTimedObservation(live.observation(),wanted) : observed === expected;
    if (!correct) {
      throw Error('The mounted control produced a different spatial state from the replayed rule.');
    }
  } finally { live.trackAction(undefined); }
}
`,In=`// Trusted verifier, also embedded as its own module in the opaque preview frame.
// All game transitions run there; generated code is never executed on the API server.
function check(ok, message) { if (!ok) throw Error(message); }
function samePoint(a,b) { return a.every((n,i) => Math.abs(n-b[i]) < 1e-7); }
function snapshot(adapter,state) {
  const view = adapter.observe(state);
  check(Array.isArray(view?.position) && view.position.length === 3 && view.position.every(Number.isFinite),
    'observe must identify the affected gameplay position in XYZ.');
  check(typeof view.surface === 'string' && view.facts && typeof view.facts === 'object' && !Array.isArray(view.facts), 'observe must return surface and gameplay facts.');
  return structuredClone({position:view.position,surface:view.surface,facts:view.facts});
}
function readFact(view,key) {
  check(Object.hasOwn(view.facts,key),'Observation is missing gameplay fact ' + key + '.');
  return view.facts[key];
}
function legal(adapter,state,action) {
  const result = adapter.isLegal(state,action);
  check(typeof result === 'boolean','isLegal must return a boolean.');
  return result;
}
function step(adapter,state,action) {
  const next = adapter.step(state,action);
  check(next != null,'step must return the updated game state.');
  return next;
}
function playTrace(adapter,w,trace,shouldAccept,expectedAfter) {
  let state = adapter.initialState(w.seed);
  for (const [i,action] of trace.setup.entries()) {
    check(legal(adapter,state,action), 'Setup step ' + (i+1) + ' rejected: ' + JSON.stringify(action));
    state = step(adapter,state,action);
  }
  const before = snapshot(adapter,state);
  const accepted = legal(adapter,state,trace.action);
  check(accepted === shouldAccept, 'For ' + JSON.stringify(trace.action) + ', expected legal=' + shouldAccept + ', got ' + accepted + '.');
  if (accepted) state = step(adapter,state,trace.action);
  const after = snapshot(adapter,state);
  if (!accepted) check(JSON.stringify(before) === JSON.stringify(after), 'Checking a rejected action mutated the game.');
  const actual = readFact(after,w.fact);
  check(actual === expectedAfter, w.fact + ' after ' + JSON.stringify(trace.action) + ': expected ' + JSON.stringify(expectedAfter) + ', got ' + JSON.stringify(actual) + '.');
  return {before,after,accepted};
}
function within(point, dims) {
  return Array.isArray(point) && point.length === 3 && point.every((n,i) => Number.isInteger(n) && n >= 0 && n < dims[i]);
}
function checkSpatialTransition(target,w,trial,control) {
  const {before,after} = trial;
  // A defensive move can preserve every fact while its played alternative loses
  // a life, ends a run or breaks a constraint. Compare the actual replay outcomes.
  const avoidedOutcome = control.accepted && readFact(after,w.fact) !== readFact(control.after,w.fact) &&
    readFact(before,w.fact) === readFact(control.before,w.fact);
  check(avoidedOutcome || JSON.stringify(before.facts) !== JSON.stringify(after.facts),
    'The spatial action neither changed gameplay facts nor prevented the outcome observed on its control.');
  if (target.family === 'volume' || target.family === 'stack') {
    for (const v of [before,after,control.before,control.after]) check(within(v.position,target.dimensions),'Gameplay position outside the declared XYZ board: ' + JSON.stringify(v.position));
  }
  if (target.family === 'volume') {
    if (Array.isArray(w.action.at) && Array.isArray(w.control.action.at)) {
      const a = w.action.at, b = w.control.action.at;
      check(within(a,target.dimensions) && within(b,target.dimensions) && a[0]===b[0] && a[1]===b[1] && a[2]!==b[2], 'Compare the same XY cell at two different in-bounds depths.');
      check(samePoint(a,after.position), 'The affected gameplay cell differs from the requested XYZ cell.');
      if (control.accepted) check(samePoint(b,control.after.position),'The control selected the wrong gameplay cell.');
    }
    check(after.position[2] !== before.position[2] || after.position[2] !== control.after.position[2], 'Both actions remained on the same gameplay layer.');
  } else if (target.family === 'stack') {
    check(after.position[2] > 0, 'No supported piece reached a higher layer.');
    if (control.accepted) {
      check(after.position[0] === control.after.position[0] && after.position[1] === control.after.position[1] && after.position[2] > control.after.position[2],
        'Removing support did not lower the landing position in the same column.');
    }
  } else if (target.family === 'surface' && target.variant === 'seams') {
    check(before.surface && after.surface && before.surface !== after.surface, 'The action never crossed a face boundary.');
    check(target.topology.links.some(({from,to}) => from.surface === before.surface && samePoint(from.position,before.position) &&
      to.surface === after.surface && samePoint(to.position,after.position)), 'The crossed edge does not join the declared face coordinates.');
    check(control.before.surface === control.after.surface, 'The control also crossed a face instead of staying on its original face.');
  } else if (target.family === 'surface') {
    check(before.surface && before.surface === after.surface && !samePoint(before.position,after.position),'No movement on the embedded gameplay plane.');
    for (const view of [before,after]) {
      const distance = view.position.reduce((d,x,i) => d + (x - target.plane.origin[i])*target.plane.normal[i], 0);
      check(Math.abs(distance) < 1e-5,'World-space point is off the declared gameplay plane: ' + JSON.stringify(view.position));
    }
  }
}
export function canonicalLiveProbe(target) {
  const w = target.witnesses.find(witness => witness.kind === 'spatial');
  return {seed:w.seed,actions:structuredClone([...w.setup,w.action])};
}

function gridIndex([x,y,z],dims) { return x + dims[0]*(y + dims[1]*z); }
function pointAt(i,[x,y]) { return [i % x,Math.floor(i/x) % y,Math.floor(i/(x*y))]; }
function directionSet() {
  const directions = [];
  for (let x=-1;x<=1;x++) for (let y=-1;y<=1;y++) for (let z=-1;z<=1;z++) {
    if ([x,y,z].find(v => v !== 0) === 1) directions.push([x,y,z]);
  }
  return directions;
}
function winningTriples(dims) {
  const count = dims.reduce((product,n) => product*n,1);
  const lines = [];
  // Full enumeration on compact boards; bound oracle cost for wide custom games.
  const stride = count <= 125 ? 1 : Math.ceil(count/90);
  const origins = new Set([0, Math.floor(count/2)]);
  for (let i=0;i<count;i+=stride) origins.add(i);
  for (const delta of directionSet()) {
    origins.add(gridIndex(delta.map((v,axis) => v < 0 ? dims[axis]-1 : 0),dims));
  }
  for (const i of origins) {
    const start = pointAt(i,dims);
    for (const delta of directionSet()) {
      const mid = start.map((n,i) => n + delta[i]);
      const end = mid.map((n,i) => n + delta[i]);
      if (within(end,dims)) lines.push([i,gridIndex(mid,dims),gridIndex(end,dims)]);
    }
  }
  return lines;
}
function verifyPlacement(adapter,dims) {
  const count = dims.reduce((a,n) => a*n,1);
  check(Number.isSafeInteger(count) && count <= 100000,'The placement oracle supports up to 100,000 cells.');
  const start = () => adapter.initialState(1);
  const request = index => ({type:'place',at:pointAt(index,dims)});
  const initial = start();
  const first = snapshot(adapter,initial).facts;
  check(Array.isArray(first.board) && first.board.length === count && first.board.every(v => v===0) && first.turn === 1 && first.winner === 0, 'Initial board, active player or winner does not match the free-placement contract.');
  const stride = count <= 125 ? 1 : Math.ceil(count/125);
  for (let i=0;i<count;i+=stride) check(legal(adapter,initial,request(i)), 'Empty cell incorrectly blocked: ' + request(i).at);
  for (let axis=0;axis<3;axis++) for (const n of [-1,dims[axis]]) {
    const at = [0,0,0]; at[axis] = n;
    check(!legal(adapter,initial,{type:'place',at}), 'Out-of-bounds placement allowed at ' + at);
  }
  const lines = winningTriples(dims);
  function replay(triple,player,wins) {
    // Opponent placements are always distinct, and cannot win before player's
    // third mark. For a player-2 check, choose three non-collinear fillers.
    const fillers = [];
    for (let i=0;fillers.length<(player===1?2:3) && i<count;i++) {
      if (triple.includes(i)) continue;
      if (fillers.length===2) {
        const v = [fillers[0],fillers[1],i].map(n => pointAt(n,dims));
        if ([0,1,2].some(j => v[j].every((n,k) => 2*n === v[(j+1)%3][k]+v[(j+2)%3][k]))) continue;
      }
      fillers.push(i);
    }
    const moves = player===1 ? [triple[0],fillers[0],triple[1],fillers[1],triple[2]] :
      [fillers[0],triple[0],fillers[1],triple[1],fillers[2],triple[2]];
    let state = start();
    for (const [i,index] of moves.entries()) {
      const move = request(index);
      check(legal(adapter,state,move),'A legal placement was rejected at ' + move.at);
      state = step(adapter,state,move);
      const facts = adapter.observe(state).facts;
      const winner = i === moves.length-1 && wins ? player : 0;
      check(facts.board[index] === 1+i%2 && facts.winner === winner && (winner || facts.turn===2-i%2), 'Incorrect board, turn or winner after ' + JSON.stringify(moves.slice(0,i+1).map(n => pointAt(n,dims))) + '; expected winner ' + winner + ', got ' + facts.winner + '.');
      check(!legal(adapter,state,move), 'An occupied placement cell remained legal.');
    }
    if (wins) {
      const unused = Array.from({length:7},(_,i)=>i).find(i=>!moves.includes(i));
      check(!legal(adapter,state,request(unused)), 'A finished game allowed another placement.');
    }
  }
  // Exhaust every line of a 3×3×3 game (axes, face and body diagonals).
  // Sample all directions on larger boards without making QA slower than play.
  const sampleSize = count <= 125 ? lines.length : Math.min(lines.length,65);
  for (let n=0;n<sampleSize;n++) replay(lines[Math.floor(n*lines.length/sampleSize)],1,true);
  const diagonal = dims.every(n=>n>=3) ? [0,gridIndex([1,1,1],dims),gridIndex([2,2,2],dims)] : lines[0];
  replay(diagonal,2,true);
  for (const bent of [[[0,0,0],[1,1,1],[1,0,1]], [[0,0,0],[0,1,0],[1,1,0]], [[1,0,0],[1,0,1],[0,1,1]]]) {
    replay(bent.map(p=>gridIndex(p,dims)),1,false);
  }
  let center = '';
  if (count <= 125 && dims.every(n => n % 2 === 1)) {
    const middle = dims.map(n => Math.floor(n/2));
    const through = lines.filter(line => line.includes(gridIndex(middle,dims)));
    const planar = through.filter(line => line.every(i => pointAt(i,dims)[2] === middle[2]));
    center = ' Center belongs to ' + through.length + ' winning lines, ' + planar.length + ' within its own layer.';
  }
  return count + ' cells; ' + sampleSize + ' winning lines exercised; both players, illegal moves and non-winning triples checked.' + center;
}

export function runCanonicalChecks(target,adapter) {
  const rows = [];
  function test(name,fn) {
    try { const detail = fn(); rows.push({name,passed:true,detail:detail || ''}); }
    catch (error) { rows.push({name,passed:false,detail:String(error.message || error).slice(0,600)}); }
  }
  test('Canonical • live rules interface',() => {
    for (const key of ['initialState','isLegal','step','observe']) check(typeof adapter?.[key] === 'function','Missing spatialRules.' + key);
  });
  if (!rows[0].passed) return rows;
  for (const [index,w] of target.witnesses.entries()) test('Canonical • ' + w.kind + ' • ' + w.rule + ' #' + (index+1),() => {
    const main = playTrace(adapter,w,w,w.kind!=='boundary',w.after);
    check(readFact(main.before,w.fact) === w.before,w.fact + ' before: expected ' + JSON.stringify(w.before) + ', got ' + JSON.stringify(readFact(main.before,w.fact)) + '.');
    if (w.kind === 'spatial') {
      const control = playTrace(adapter,w,w.control,w.control.accepted,w.control.after);
      checkSpatialTransition(target,w,main,control);
    }
  });
  if (target.oracle === 'placement-line3') test('Canonical • three-in-line placement oracle',() => verifyPlacement(adapter,target.dimensions));
  return rows;
}

`;/*! es-module-lexer 1.7.0, from Vite 7.1.12. Import specifiers are read literally in Studio.
MIT License
-----------

Copyright (C) 2018-2022 Guy Bedford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/var yt;(function(t){t[t.Static=1]="Static",t[t.Dynamic=2]="Dynamic",t[t.ImportMeta=3]="ImportMeta",t[t.StaticSourcePhase=4]="StaticSourcePhase",t[t.DynamicSourcePhase=5]="DynamicSourcePhase",t[t.StaticDeferPhase=6]="StaticDeferPhase",t[t.DynamicDeferPhase=7]="DynamicDeferPhase"})(yt||(yt={}));const Sn=new Uint8Array(new Uint16Array([1]).buffer)[0]===1;function Lt(t,n="@"){if(!P)return jt.then((()=>Lt(t)));const r=t.length+1,a=(P.__heap_base.value||P.__heap_base)+4*r-P.memory.buffer.byteLength;a>0&&P.memory.grow(Math.ceil(a/65536));const e=P.sa(r-1);if((Sn?Rn:Tn)(t,new Uint16Array(P.memory.buffer,e,r)),!P.parse())throw Object.assign(new Error(`Parse error ${n}:${t.slice(0,P.e()).split(`
`).length}:${P.e()-t.lastIndexOf(`
`,P.e()-1)}`),{idx:P.e()});const s=[],c=[];for(;P.ri();){const y=P.is(),v=P.ie(),A=P.it(),g=P.ai(),o=P.id(),C=P.ss(),B=P.se();let T;P.ip()&&(T=i(t.slice(o===-1?y-1:y,o===-1?v+1:v))),s.push({n:T,t:A,s:y,e:v,ss:C,se:B,d:o,a:g})}for(;P.re();){const y=P.es(),v=P.ee(),A=P.els(),g=P.ele(),o=t.slice(y,v),C=o[0],B=A<0?void 0:t.slice(A,g),T=B?B[0]:"";c.push({s:y,e:v,ls:A,le:g,n:C==='"'||C==="'"?i(o):o,ln:T==='"'||T==="'"?i(B):B})}function i(y){return y.slice(1,-1)}return[s,c,!!P.f(),!!P.ms()]}function Tn(t,n){const r=t.length;let a=0;for(;a<r;){const e=t.charCodeAt(a);n[a++]=(255&e)<<8|e>>>8}}function Rn(t,n){const r=t.length;let a=0;for(;a<r;)n[a]=t.charCodeAt(a++)}let P;const Ln=()=>{return t="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GzYCHAtBAEEAKAKwCkECajYCsAoCQAJAAkACQEEAECkiAUHhAEYNACABQfcARg0BQQAoArAKIQEMAgtBACgCsAoiAUECakHACEEKEC8NAUEGIQIMAgtBACgCsAoiAS8BAkHpAEcNACABLwEEQfQARw0AQQQhAiABLwEGQegARg0BC0EAIAFBfmo2ArAKDwtBACABIAJBAXRqNgKwCgJAQQEQKUH7AEYNAEEAIAE2ArAKDwtBACgCsAoiACECA0BBACACQQJqNgKwCgJAAkACQEEBECkiAkEiRg0AIAJBJ0cNAUEnEBpBAEEAKAKwCkECajYCsApBARApIQIMAgtBIhAaQQBBACgCsApBAmo2ArAKQQEQKSECDAELIAIQLCECCwJAIAJBOkYNAEEAIAE2ArAKDwtBAEEAKAKwCkECajYCsAoCQEEBECkiAkEiRg0AIAJBJ0YNAEEAIAE2ArAKDwsgAhAaQQBBACgCsApBAmo2ArAKAkACQEEBECkiAkEsRg0AIAJB/QBGDQFBACABNgKwCg8LQQBBACgCsApBAmo2ArAKQQEQKUH9AEYNAEEAKAKwCiECDAELC0EAKALwCSIBIAA2AhAgAUEAKAKwCkECajYCDAttAQJ/AkACQANAAkAgAEH//wNxIgFBd2oiAkEXSw0AQQEgAnRBn4CABHENAgsgAUGgAUYNASAAIQIgARAoDQJBACECQQBBACgCsAoiAEECajYCsAogAC8BAiIADQAMAgsLIAAhAgsgAkH//wNxC6sBAQR/AkACQEEAKAKwCiICLwEAIgNB4QBGDQAgASEEIAAhBQwBC0EAIAJBBGo2ArAKQQEQKSECQQAoArAKIQUCQAJAIAJBIkYNACACQSdGDQAgAhAsGkEAKAKwCiEEDAELIAIQGkEAQQAoArAKQQJqIgQ2ArAKC0EBECkhA0EAKAKwCiECCwJAIAIgBUYNACAFIARBACAAIAAgAUYiAhtBACABIAIbEAILIAMLcgEEf0EAKAKwCiEAQQAoArQKIQECQAJAA0AgAEECaiECIAAgAU8NAQJAAkAgAi8BACIDQaR/ag4CAQQACyACIQAgA0F2ag4EAgEBAgELIABBBGohAAwACwtBACACNgKwChAlQQAPC0EAIAI2ArAKQd0AC0kBA39BACEDAkAgAkUNAAJAA0AgAC0AACIEIAEtAAAiBUcNASABQQFqIQEgAEEBaiEAIAJBf2oiAg0ADAILCyAEIAVrIQMLIAMLC+wBAgBBgAgLzgEAAHgAcABvAHIAdABtAHAAbwByAHQAZgBvAHIAZQB0AGEAbwB1AHIAYwBlAHIAbwBtAHUAbgBjAHQAaQBvAG4AcwBzAGUAcgB0AHYAbwB5AGkAZQBkAGUAbABlAGMAbwBuAHQAaQBuAGkAbgBzAHQAYQBuAHQAeQBiAHIAZQBhAHIAZQB0AHUAcgBkAGUAYgB1AGcAZwBlAGEAdwBhAGkAdABoAHIAdwBoAGkAbABlAGkAZgBjAGEAdABjAGYAaQBuAGEAbABsAGUAbABzAABB0AkLEAEAAAACAAAAAAQAAEA5AAA=",typeof Buffer<"u"?Buffer.from(t,"base64"):Uint8Array.from(atob(t),(n=>n.charCodeAt(0)));var t},jt=WebAssembly.compile(Ln()).then(WebAssembly.instantiate).then((({exports:t})=>{P=t})),jn=/^(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]*\.js$/,Dn=new Set(["__proto__","prototype","constructor"]);function Dt(t){if(!t||typeof t!="object"||Array.isArray(t)||!Object.hasOwn(t,"main.js"))throw new Error("The project needs a main.js entry module.");const n=Object.entries(t);if(n.length>100)throw new Error("A project can contain up to 100 editable modules.");let r=0;for(const[a,e]of n){if(a.length>180||!jn.test(a)||a.split("/").some(s=>Dn.has(s)))throw new Error("Invalid project module path: "+a);if(typeof e!="string"||e.length>3e5)throw new Error("Invalid source in "+a);r+=e.length}if(r>1e6)throw new Error("Project JavaScript exceeds the 1 MB preview limit.");if(!t["main.js"].trim())throw new Error("main.js is empty.");return t}function Kn(t,n,r){if(n==="three")return"three";if(typeof n!="string"||!/^\.{1,2}\//.test(n))throw new Error(t+" imports an unavailable module: "+String(n));const a=t.split("/").slice(0,-1);for(const s of n.split("/"))if(s!==".")if(s===".."&&a.length)a.pop();else{if(s===".."||!s)throw new Error(t+" imports outside the project: "+n);a.push(s)}const e=a.join("/");if(!Object.hasOwn(r,e))throw new Error(t+" cannot find "+e);return"cubi-project:"+e}async function Mn(t){Dt(t),await jt;const n=Object.create(null);for(const[r,a]of Object.entries(t)){const[e]=Lt(a,r);let s=a;for(const c of e.reverse()){if(c.d===-2)continue;if(c.n===void 0)throw new Error(r+" needs a literal path for each import.");const i=Kn(r,c.n,t),y=c.d<0?i:JSON.stringify(i);s=s.slice(0,c.s)+y+s.slice(c.e)}n["cubi-project:"+r]=s+`
//# sourceURL=cubi-project:/`+r}return n}const Nn=40*1024*1024,Fn=64*1024*1024;function Jn(t){const n=r=>typeof r=="string"?/^data:image\//.test(r):Array.isArray(r?.data);if((t.images||[]).some(r=>![r.url].flat().every(n)))throw Error("The GLB contains an image that could not be embedded.")}async function On(t=[]){if(!Array.isArray(t)||t.length>100)throw Error("Invalid project asset list.");if(!t.some(c=>c?.format==="glb"))return t;const{LoadingManager:n}=await it(async()=>{const{LoadingManager:c}=await import("./three-CXivr22E.js").then(i=>i.u);return{LoadingManager:c}},[],import.meta.url),{GLTFLoader:r}=await it(async()=>{const{GLTFLoader:c}=await import("./GLTFLoader-t0v7kTxG.js");return{GLTFLoader:c}},__vite__mapDeps([0,1]),import.meta.url);let a=0,e=0;const s=[];for(const c of t){if(c?.format!=="glb"){s.push(c);continue}if(!/^[a-f0-9]{64}$/.test(c.id))throw Error("This project references an invalid library GLB.");const i=AbortSignal.timeout(12e3),y=await fetch("/api/v1/asset-library/"+c.id+"/file",{signal:i});if(!y.ok)throw Error("The project GLB is unavailable on this Studio server.");const v=await y.arrayBuffer();if(a+=v.byteLength,v.byteLength>Ut||a>Nn)throw Error("Project models exceed the 40 MB preview budget.");zt(v);const A=new Uint8Array(await crypto.subtle.digest("SHA-256",v));if(Array.from(A,B=>B.toString(16).padStart(2,"0")).join("")!==c.id)throw Error("The library GLB content no longer matches this project revision.");const g=new n;g.setURLModifier(B=>{if(B.startsWith("blob:")||B.startsWith("data:"))return B;throw Error("Library GLB resources must be embedded.")});const o=await new r(g).parseAsync(v,"");let C;try{if(o.scene.animations=o.animations,C=o.scene.toJSON(),Jn(C),e+=JSON.stringify(C).length,e>Fn)throw Error("Decoded models exceed the 64 MB preview budget.")}finally{const B=new Set;o.scene.traverse(T=>{T.geometry?.dispose();for(const F of[T.material].flat().filter(Boolean))Object.values(F).filter(D=>D?.isTexture).forEach(D=>B.add(D)),F.dispose()});for(const T of B)T.dispose(),T.image?.close?.()}s.push({...c,object:C})}return s}const Hn="html,body,#game{width:100%;height:100%;margin:0;overflow:hidden}body{background:#172134;color:#f4f5f1;font:14px system-ui,sans-serif}#game{position:relative;isolation:isolate}canvas{display:block}button{font:inherit;cursor:pointer}#preview-error{position:absolute;left:12px;right:12px;bottom:12px;padding:14px;color:#ffe3df;background:#532d35;border-radius:8px;white-space:pre-wrap;overflow-wrap:anywhere}";function Kt(t,n){const r="default-src 'none'; script-src 'nonce-"+t+"' blob:; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data: blob:; connect-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'",a=n?'<script type="application/json" id="embedded-game">'+JSON.stringify(n).replaceAll("<","\\u003c")+"<\/script>":"";return'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="'+r+'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+Hn+'</style></head><body><main id="game"></main><div id="preview-error" role="alert" hidden></div>'+a+'<script nonce="'+t+'">'+kn+"<\/script></body></html>"}async function Mt(t,n,r=!1){const a=t.canonicalIR?.target;if(!a&&(t.ir?.canonical?.target||["volume","stack","surface","custom"].includes(t.spatialPlan?.family)))throw Error("The spatial project is missing its canonical target. Restore the agreed transformation before verifying it.");const[e,{threeModules:s},c]=await Promise.all([Mn(t.files),it(()=>import("./creation-runtime-three-CAR-gmZJ.js"),[],import.meta.url),On(Array.isArray(t.assets)?t.assets:[])]);return{channel:"cubiverse-preview-load",token:n,modules:{...e,...s,...a?{"cubi-runtime:spatial":xn,"cubi-runtime:canonical":In}:{}},assets:c,...a&&{canonicalTarget:a,verifySpatialInput:r}}}function $e(){return Array.from(crypto.getRandomValues(new Uint8Array(18)),t=>t.toString(16).padStart(2,"0")).join("")}function Nt(t,n,{onEvent:r=()=>{},verifyInput:a=!1}={}){const e=document.createElement("iframe"),s=$e();let c=!1,i=!1,y;e.title=(n.title||"Untitled game")+" live preview",a&&(e.tabIndex=-1),e.setAttribute("sandbox","allow-scripts"),e.setAttribute("referrerpolicy","no-referrer"),e.style.cssText="display:block;width:100%;height:100%;border:0;background:#172134";const v=(o,C,B=[],T=!1)=>{c||(o!=="log"&&(i=!0,clearTimeout(y)),r({type:o,message:C,testResults:B,checkFailure:T}))},A=o=>{const C=o.data;o.source!==e.contentWindow||o.origin!=="null"||C?.channel!=="cubiverse-preview"||C.token!==s||["ready","log","error"].includes(C.type)&&v(C.type,C.message,C.testResults,C.type==="error"&&C.checkFailure===!0)};window.addEventListener("message",A);const g=Mt(n,s,a).catch(o=>(v("error",o.message),null));return e.addEventListener("load",async()=>{const o=await g;!c&&o&&!i&&e.contentWindow?.postMessage(o,"*")},{once:!0}),e.srcdoc=Kt($e()),t.append(e),y=setTimeout(()=>{i||(e.remove(),v("error","The game did not finish starting within 30 seconds."))},3e4),{dispose(){c=!0,clearTimeout(y),window.removeEventListener("message",A),e.remove()}}}async function Pn(t){const n=Kt($e(),await Mt(t,$e())),r=e=>e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;"),a=r(String(t.title||"Cubiverse game"));return'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+a+'</title><style>html,body,iframe{margin:0;width:100%;height:100%;border:0;display:block;background:#172134}</style></head><body><iframe sandbox="allow-scripts" title="'+a+'" srcdoc="'+r(n)+'"></iframe></body></html>'}const Ft=`// Web port of the user's existing 3D Tic-Tac-Toe demo. See references/tictactoe.md.\r
export const TICTACTOE_COLORS=Object.freeze({1:'#468cff',2:'#ff4b4b'});\r
const dimensionsOf=value=>Array.isArray(value)?value:value?[3,3,3]:[3,3,1];\r
const validateDimensions=value=>{const d=Array.isArray(value)?[...value]:[value?.x,value?.y,value?.z];if(d.length!==3||d.some(n=>!Number.isSafeInteger(n)||n<1)||d.reduce((a,b)=>a*b,1)>4096)throw new RangeError('XYZ must be positive integers, up to 4,096 cells.');return d;};\r
export const tttIndex=([x,y,z=0],dimensions=[3,3,3])=>x+dimensions[0]*(y+dimensions[1]*z);\r
export const tttCoordinate=(index,dimensions=[3,3,3])=>[index%dimensions[0],Math.floor(index/dimensions[0])%dimensions[1],Math.floor(index/(dimensions[0]*dimensions[1]))];\r
const lineCache=new Map();\r
export function ticTacToeLines(spatial=true) {\r
  const dimensions=dimensionsOf(spatial),key=dimensions.join(',');if(lineCache.has(key))return lineCache.get(key);const lines=[];\r
  for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)for(let dz=-1;dz<=1;dz++){\r
    const direction=[dx,dy,dz];if(direction.find(value=>value!==0)!==1)continue;\r
    for(let x=0;x<dimensions[0];x++)for(let y=0;y<dimensions[1];y++)for(let z=0;z<dimensions[2];z++){\r
      const center=[x,y,z],points=[-1,0,1].map(step=>center.map((value,axis)=>value+step*direction[axis]));\r
      if(points.every(p=>p.every((value,axis)=>value>=0&&value<dimensions[axis])))lines.push(Object.freeze(points.map(p=>tttIndex(p,dimensions))));\r
    }\r
  }\r
  const frozen=Object.freeze(lines);lineCache.set(key,frozen);return frozen;\r
}\r
export function evaluateTicTacToe(board,spatial=true) {\r
  const dims=dimensionsOf(spatial);if(board.length!==dims.reduce((a,b)=>a*b,1)||[...board].some(value=>![0,1,2].includes(value)))throw new RangeError('Invalid Tic-Tac-Toe board.');\r
  const lines=ticTacToeLines(dims).filter(line=>board[line[0]]!==0&&line.every(index=>board[index]===board[line[0]]));\r
  if(lines.length){const winner=board[lines[0][0]];return {status:'won',winner,lines:lines.filter(line=>board[line[0]]===winner).map(line=>[...line])};}\r
  return {status:board.every(value=>value!==0)?'draw':'playing',winner:0,lines:[]};\r
}\r
export class TicTacToeGame {\r
  constructor({spatial=true,dimensions=null}={}){this.spatial=spatial;this.dimensions=validateDimensions(dimensions??dimensionsOf(spatial));this.restart();}\r
  restart(){this.board=new Int8Array(this.dimensions.reduce((a,b)=>a*b,1));this.player=1;this.status='playing';this.winner=0;this.winningLines=[];this.history=[];}\r
  play(index,player=this.player){\r
    if(this.status!=='playing'||player!==this.player||!Number.isInteger(index)||index<0||index>=this.board.length||this.board[index]!==0)return false;\r
    this.board[index]=player;this.history.push({index,player});this.applyResult();if(this.status==='playing')this.player=3-player;return true;\r
  }\r
  applyResult(){const result=evaluateTicTacToe(this.board,this.dimensions);this.status=result.status;this.winner=result.winner;this.winningLines=result.lines;}\r
  undo(count=1){if(!Number.isInteger(count)||count<1||!this.history.length)return false;for(let n=0;n<count&&this.history.length;n++){const move=this.history.pop();this.board[move.index]=0;this.player=move.player;}this.applyResult();return true;}\r
  legalMoves(){return this.status==='playing'?[...this.board.keys()].filter(index=>this.board[index]===0):[];}\r
  getState(){return {spatial:this.spatial,dimensions:[...this.dimensions],board:[...this.board],player:this.player,currentPlayer:this.player,status:this.status,winner:this.winner,winningLines:this.winningLines.map(line=>[...line]),history:this.history.map(move=>({...move})),moves:this.history.length};}\r
}\r
const aiModelCache=new Map();\r
function aiModel(dims){\r
  const key=dims.join(',');if(aiModelCache.has(key))return aiModelCache.get(key);\r
  const lines=ticTacToeLines(dims),size=dims.reduce((a,b)=>a*b,1),through=Array.from({length:size},()=>[]);\r
  lines.forEach((line,n)=>line.forEach(index=>through[index].push(n)));\r
  const priority=Array.from({length:size},(_,index)=>{const p=tttCoordinate(index,dims);return through[index].length*.1-p.reduce((sum,v,axis)=>sum+Math.abs(v-(dims[axis]-1)/2),0)*.01;});\r
  const model={lines,through,priority};aiModelCache.set(key,model);return model;\r
}\r
// A bounded, deterministic search: no hidden board changes or outcome targeting.\r
// Win/block and the legal centre take precedence, including on custom XYZ boards.\r
export function chooseTicTacToeMove(board,player=2,spatial=true) {\r
  const dims=dimensionsOf(spatial);if(![1,2].includes(player)||evaluateTicTacToe(board,dims).status!=='playing')return -1;\r
  const cells=Int8Array.from(board),{lines,through,priority}=aiModel(dims),counts=[null,new Uint8Array(lines.length),new Uint8Array(lines.length)];\r
  let empty=0,nodes=0;for(let index=0;index<cells.length;index++){if(!cells[index]){empty++;continue;}for(const line of through[index])counts[cells[index]][line]++;}\r
  const MATE=100000,weights=[0,3,28],budget=cells.length<=64?6500:cells.length<=216?1800:cells.length<=512?400:90;\r
  function threats(owner){const result=new Set();for(let n=0;n<lines.length;n++)if(counts[owner][n]===2&&!counts[3-owner][n])for(const index of lines[n])if(!cells[index])result.add(index);return [...result];}\r
  function put(index,owner){cells[index]=owner;empty--;for(const n of through[index])counts[owner][n]++;}\r
  function take(index,owner){cells[index]=0;empty++;for(const n of through[index])counts[owner][n]--;}\r
  function won(index,owner){return through[index].some(n=>counts[owner][n]===3);}\r
  function value(owner){let score=0;for(let n=0;n<lines.length;n++){const own=counts[owner][n],other=counts[3-owner][n];if(!other)score+=weights[own]??MATE;if(!own)score-=weights[other]??MATE;}return score;}\r
  function ranked(owner,limit){\r
    const scores=new Float64Array(cells.length);for(let n=0;n<lines.length;n++){\r
      const own=counts[owner][n],other=counts[3-owner][n];if(own&&other)continue;\r
      const weight=own===2?500:other===2?450:own===1?14:other===1?11:1;\r
      for(const index of lines[n])if(!cells[index])scores[index]+=weight;\r
    }\r
    const moves=[];for(let index=0;index<cells.length;index++)if(!cells[index])moves.push(index);\r
    return moves.sort((a,b)=>scores[b]-scores[a]||priority[b]-priority[a]||a-b).slice(0,limit);\r
  }\r
  function search(owner,depth,alpha,beta,ply){\r
    nodes++;if(!empty)return 0;\r
    const wins=threats(owner);if(wins.length)return MATE-ply;\r
    const danger=threats(3-owner);if(danger.length>1)return -MATE+ply+1;\r
    if(nodes>=budget||ply>=12||(depth<=0&&!danger.length))return value(owner);\r
    const moves=danger.length?danger:ranked(owner,cells.length<=9?9:6);let best=-Infinity;\r
    for(const index of moves){\r
      put(index,owner);const score=won(index,owner)?MATE-ply:-search(3-owner,depth-1,-beta,-alpha,ply+1);take(index,owner);\r
      best=Math.max(best,score);alpha=Math.max(alpha,score);if(alpha>=beta||nodes>=budget)break;\r
    }\r
    return best;\r
  }\r
  const wins=threats(player);if(wins.length)return wins[0];\r
  const danger=threats(3-player);if(danger.length===1)return danger[0];\r
  const center=tttIndex(dims.map(n=>Math.floor(n/2)),dims);if(!danger.length&&!cells[center])return center;\r
  // A completed fork is a forced win; assess every legal candidate before pruning.\r
  // The opposite side's immediate wins were handled above.\r
  if(!danger.length)for(const index of ranked(player,cells.length)){\r
    const targets=new Set();for(const n of through[index])if(counts[player][n]===1&&!counts[3-player][n])for(const other of lines[n])if(other!==index&&!cells[other])targets.add(other);\r
    if(targets.size>1)return index;\r
  }\r
  const candidates=danger.length?danger:ranked(player,cells.length<=9?9:12),depth=cells.length<=9?empty:cells.length<=64?5:cells.length<=216?4:2;\r
  let best=candidates[0]??-1;\r
  // Complete shallow passes before spending the remaining budget on deeper ones.\r
  // An interrupted pass never displaces the last fully evaluated result.\r
  for(let horizon=1;horizon<=depth&&nodes<budget;horizon++){\r
    const ordered=[best,...candidates.filter(index=>index!==best)];let next=best,bestScore=-Infinity,alpha=-Infinity,complete=true;\r
    for(const index of ordered){\r
      put(index,player);const score=won(index,player)?MATE:-search(3-player,horizon-1,-Infinity,-alpha,1);take(index,player);\r
      if(nodes>=budget){complete=false;break;}\r
      if(score>bestScore){next=index;bestScore=score;}alpha=Math.max(alpha,score);if(bestScore>=MATE-3)break;\r
    }\r
    if(complete)best=next;if(bestScore>=MATE-3)break;\r
  }\r
  return best;\r
}\r
\r
export function createGame(ctx) {\r
  const THREE=ctx.THREE,doc=ctx.ui.ownerDocument;\r
  let spatial=true,dimensions=[3,3,3],solo=true,game,cursor=13,hovered=-1,aiTimer=0,disposed=false;\r
  const owned=new Set(),retained=[],markMeshes=[],dummy=THREE?new THREE.Object3D():null,up=THREE?new THREE.Vector3(0,1,0):null;\r
  let xMesh,oMesh,winMesh,cage,cursorFrame,hoverFrame;\r
  const own=resource=>(owned.add(resource),resource);\r
  function lineBox(size,color,name){const box=new THREE.BoxGeometry(...size),geometry=own(new THREE.EdgesGeometry(box));box.dispose();const line=new THREE.LineSegments(geometry,own(new THREE.LineBasicMaterial({color,transparent:true,opacity:.7})));line.name=name;ctx.group.add(line);retained.push(line);return line;}\r
  function instanced(geometry,material,count,name){const mesh=new THREE.InstancedMesh(geometry,material,count);mesh.count=0;mesh.frustumCulled=false;mesh.name=name;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);ctx.group.add(mesh);retained.push(mesh);markMeshes.push(mesh);return mesh;}\r
  if(THREE&&ctx.group){\r
    xMesh=instanced(own(new THREE.CapsuleGeometry(.064,.62,3,8)),own(new THREE.MeshStandardMaterial({color:TICTACTOE_COLORS[1],roughness:.3,emissive:TICTACTOE_COLORS[1],emissiveIntensity:.15})),8192,'tictactoe-solid-x');\r
    oMesh=instanced(own(new THREE.TorusGeometry(.28,.071,8,24)),own(new THREE.MeshStandardMaterial({color:TICTACTOE_COLORS[2],roughness:.3,emissive:TICTACTOE_COLORS[2],emissiveIntensity:.12})),4096,'tictactoe-solid-o');\r
    winMesh=instanced(own(new THREE.CylinderGeometry(.025,.025,1,8)),own(new THREE.MeshBasicMaterial({color:'#ffe081'})),53248,'tictactoe-winning-lines');\r
    cage=instanced(own(new THREE.CylinderGeometry(.065,.065,1,10)),own(new THREE.MeshStandardMaterial({color:'#f4c94c',roughness:.32,metalness:.03})),12,'tictactoe-full-cube');\r
    cursorFrame=lineBox([1.09,1.09,1.09],'#ffd573','tictactoe-cursor');\r
    hoverFrame=lineBox([1.04,1.04,1.04],'#adf2e6','tictactoe-hover');\r
  }\r
  function button(text,action,className='small-button'){const b=doc.createElement('button');b.textContent=text;b.className=className;b.onclick=action;return b;}\r
  function row(...children){const r=doc.createElement('div');r.className='control-row';r.append(...children);ctx.ui.append(r);return r;}\r
  function select(options,action,label){const s=doc.createElement('select');s.setAttribute('aria-label',label);for(const [value,text]of options){const option=doc.createElement('option');option.value=value;option.textContent=text;s.append(option);}s.onchange=()=>action(s.value);return s;}\r
  const modeSelect=select([['3d','3D'],['2d','2D']],value=>{spatial=value==='3d';reset();},'Tic-Tac-Toe mode');\r
  const opponentSelect=select([['ai','1P · AI'],['local','2P']],value=>{solo=value==='ai';restart(false);},'Tic-Tac-Toe opponent');row(modeSelect,opponentSelect);\r
  const confirm=button('Place · Enter',()=>place(cursor),'primary-button'),undoButton=button('Undo · U',undo);row(confirm,undoButton,button('Restart',()=>restart(false)));\r
  row(button('←',()=>moveCursor('ArrowLeft')),button('↑',()=>moveCursor('ArrowUp')),button('↓',()=>moveCursor('ArrowDown')),button('→',()=>moveCursor('ArrowRight')));\r
  const turnRow=row(button('W',()=>ctx.spatial?.turn?.('up')),button('S',()=>ctx.spatial?.turn?.('down')),button('A',()=>ctx.spatial?.turn?.('left')),button('D',()=>ctx.spatial?.turn?.('right')));\r
  const positionEl=doc.createElement('p');positionEl.className='hint';positionEl.hidden=true;ctx.ui.append(positionEl);\r
  const help=doc.createElement('p');help.className='hint';help.hidden=true;ctx.ui.append(help);\r
  const touchTitle=doc.createElement('p');touchTitle.className='hint';touchTitle.textContent='X → centre · Enter → place';touchTitle.hidden=true;ctx.ui.append(touchTitle);\r
  const touchBoard=doc.createElement('div');touchBoard.className='control-group';touchBoard.setAttribute('aria-label','Tic-Tac-Toe cells');touchBoard.hidden=true;ctx.ui.append(touchBoard);\r
  const world=index=>tttCoordinate(index,game.dimensions).map((value,axis)=>(value-(game.dimensions[axis]-1)/2)*1.2);\r
  const hud=doc.createElement('div');hud.className='game-hud-score tictactoe-hud';hud.setAttribute('aria-live','polite');ctx.hud?.append(hud);\r
  const humanTurn=()=>game.status==='playing'&&(!solo||game.player===1);\r
  function initCamera(){if(spatial){if(ctx.spatial?.volume)ctx.spatial.volume({target:[0,0,0],distance:Math.max(...game.dimensions)*3.5,size:game.dimensions.map(n=>Number((n*1.2).toFixed(6)))});else ctx.frame({target:[0,0,0],distance:10.5});}else ctx.frame({target:[0,0,0],distance:10,position:[0,0,10]});}\r
  function matrix(mesh,index,position,quaternion=null,scale=[1,1,1]){dummy.position.set(...position);dummy.quaternion.identity();if(quaternion)dummy.quaternion.copy(quaternion);dummy.scale.set(...scale);dummy.updateMatrix();mesh.setMatrixAt(index,dummy.matrix);}\r
  function refreshHover(){if(hoverFrame){hoverFrame.visible=hovered>=0&&humanTurn()&&game.board[hovered]===0&&hovered!==cursor;if(hoverFrame.visible)hoverFrame.position.set(...world(hovered));}}\r
  function render(){\r
    if(disposed)return;const voxels=[],labels=[],winning=new Set(game.winningLines.flat());let xs=0,os=0;const xPicks=[],oPicks=[];\r
    if(!spatial)voxels.push({x:0,y:0,z:-.13,sx:3.6,sy:3.6,sz:.14,color:'#a2b5c6'});\r
    for(let index=0;index<game.board.length;index++){\r
      const value=game.board[index],[x,y,z]=world(index),isCursor=index===cursor;\r
      voxels.push({x,y,z,sx:.98,sy:.98,sz:spatial?.98:.12,color:value?TICTACTOE_COLORS[value]:spatial?'#86aacd':'#f1f5f8',opacity:spatial?(winning.has(index)?.3:value?.2:isCursor?.17:.08):1,data:{index}});\r
      if(value&&xMesh){\r
        const position=[x,y,z+(spatial?0:.16)];\r
        if(value===1)for(const angle of [-Math.PI/4,Math.PI/4]){const quaternion=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),angle);matrix(xMesh,xs++,position,quaternion);xPicks.push({index});}\r
        else {matrix(oMesh,os++,position);oPicks.push({index});}\r
      }else if(value)labels.push({x,y,z,cube:spatial,text:value===1?'X':'O',sx:1,sy:1,sz:1,color:TICTACTOE_COLORS[value],size:.55,data:{index}});\r
    }\r
    if(xMesh){\r
      xMesh.count=xs;oMesh.count=os;xMesh.userData.pickCells=xPicks;oMesh.userData.pickCells=oPicks;winMesh.count=game.winningLines.length;\r
      game.winningLines.forEach((line,index)=>{const start=new THREE.Vector3(...world(line[0])),end=new THREE.Vector3(...world(line[2])),delta=end.clone().sub(start),center=start.clone().add(end).multiplyScalar(.5);if(!spatial)center.z=.17;const quaternion=new THREE.Quaternion().setFromUnitVectors(up,delta.clone().normalize());matrix(winMesh,index,center.toArray(),quaternion,[1,delta.length()+.35,1]);});\r
      for(const mesh of markMeshes){mesh.instanceMatrix.needsUpdate=true;mesh.boundingBox=null;mesh.boundingSphere=null;}\r
      cage.visible=spatial;cage.count=12;let rail=0;\r
      for(let axis=0;axis<3;axis++)for(const a of [-1,1])for(const b of [-1,1]){const position=[0,0,0],direction=[0,0,0];direction[axis]=1;position[(axis+1)%3]=a*game.dimensions[(axis+1)%3]*.6;position[(axis+2)%3]=b*game.dimensions[(axis+2)%3]*.6;const rotation=new THREE.Quaternion().setFromUnitVectors(up,new THREE.Vector3(...direction));matrix(cage,rail++,position,rotation,[1,game.dimensions[axis]*1.2+.07,1]);}\r
      cage.instanceMatrix.needsUpdate=true;cursorFrame.visible=false;cursorFrame.position.set(...world(cursor));cursorFrame.scale.set(1,1,spatial?1:.16);refreshHover();\r
    }\r
    ctx.setVoxels(voxels);ctx.setLabels(labels);\r
    ctx.setStats({'Turn':game.status==='playing'?\`\${game.player===1?'X':'O'}\${solo&&game.player===2?' · AI':''}\`:game.status==='draw'?'Draw':\`\${game.winner===1?'X':'O'} wins\`,'Size':game.dimensions.join(' × '),'Winning lines':ticTacToeLines(game.dimensions).length,'Moves':game.history.length,'Mode':solo?'1P · AI':'2P'});\r
    const p=tttCoordinate(cursor,game.dimensions);positionEl.textContent=\`Cell: X\${p[0]+1} Y\${p[1]+1}\${spatial?\` Z\${p[2]+1}\`:''} · \${game.board[cursor]?(game.board[cursor]===1?'X':'O'):'Empty'}\`;\r
    hud.textContent=game.status==='won'?\`\${game.winner===1?'✕':'○'}  WIN\`:game.status==='draw'?'DRAW':\`\${game.player===1?'✕':'○'}  ·  \${game.history.length}\`;hud.style.color=TICTACTOE_COLORS[game.player];\r
    confirm.disabled=!humanTurn()||game.board[cursor]!==0;undoButton.disabled=game.history.length===0;\r
    touchBoard.replaceChildren();\r
    for(let z=0;game.board.length<=216&&z<game.dimensions[2];z++){\r
      const caption=doc.createElement('p');caption.className='hint';caption.textContent=spatial?\`Z \${z+1} · \${z===1?'centre':'all cells'}\`:'all cells';touchBoard.append(caption);\r
      const grid=doc.createElement('div');grid.className='piece-grid';grid.style.gridTemplateColumns=\`repeat(\${game.dimensions[0]},1fr)\`;grid.style.maxHeight='none';\r
      for(let y=game.dimensions[1]-1;y>=0;y--)for(let x=0;x<game.dimensions[0];x++){\r
        const index=tttIndex([x,y,z],game.dimensions),value=game.board[index],b=button(value===1?'X':value===2?'O':'·',()=>{cursor=index;render();});b.classList.add?.(index===cursor?'selected':'cell');b.setAttribute('data-cell',String(index));b.setAttribute('aria-label',\`X\${x+1} Y\${y+1} Z\${z+1}, \${value===1?'X':value===2?'O':'Empty'}\`);if(value)b.style.color=TICTACTOE_COLORS[value];grid.append(b);\r
      }\r
      touchBoard.append(grid);\r
    }\r
  }\r
  function message(){if(game.status==='won')ctx.message(\`\${game.winner===1?'X':'O'} wins ✓\`);else if(game.status==='draw')ctx.message('Draw · U → undo');else ctx.message(solo&&game.player===2?'AI…':\`Turn \${game.player===1?'X':'O'} · Enter → place\`);}\r
  function place(index){\r
    if(!Number.isInteger(index)||index<0||index>=game.board.length)return;\r
    if(!humanTurn()){ctx.message(game.status==='playing'?'AI is thinking.':'Round over. Undo or restart.');return;}\r
    cursor=index;if(!game.play(index)){ctx.message('Choose an empty cell.');render();return;}\r
    aiTimer=solo&&game.player===2&&game.status==='playing'?.4:0;ctx.sound?.(game.status==='won'?'win':'move');render();message();\r
  }\r
  function moveCursor(key){\r
    const fallback={arrowleft:[-1,0,0],arrowright:[1,0,0],arrowup:[0,1,0],arrowdown:[0,-1,0]},vector=spatial?(ctx.spatial?.vectorForKey?.(key)??fallback[key.toLowerCase()]):fallback[key.toLowerCase()];if(!vector)return;\r
    const p=tttCoordinate(cursor,game.dimensions).map((value,axis)=>Math.max(0,Math.min(game.dimensions[axis]-1,value+vector[axis])));cursor=tttIndex(p,game.dimensions);render();\r
  }\r
  function undo(){\r
    aiTimer=0;const last=game.history.at(-1),amount=solo&&last?.player===2?2:1;\r
    if(game.undo(amount)){cursor=last.index;ctx.sound?.('move');render();message();}\r
  }\r
  function restart(resetView=true){\r
    game=new TicTacToeGame({spatial,dimensions:spatial?dimensions:[3,3,1]});cursor=tttIndex(game.dimensions.map(n=>Math.floor(n/2)),game.dimensions);hovered=-1;aiTimer=0;modeSelect.value=spatial?'3d':'2d';opponentSelect.value=solo?'ai':'local';turnRow.hidden=!spatial;\r
    help.textContent=spatial?'Right drag → orbit · X → centre · Z → all · Enter → place':'Click → place · U → undo';render();message();if(resetView)initCamera();\r
  }\r
  function reset(){restart(true);}\r
  ctx.setRules?.('<p>Line up three on any axis or diagonal. X reveals the centre; Z restores all cells. XYZ is customisable.</p><p>Click to place. Arrows select, Enter confirms, U undoes. Play against AI or a friend.</p>');\r
  reset();\r
  return {reset,getDimensions(){const [x,y,z]=game.dimensions;return {x,y,z};},setDimensions(value){dimensions=validateDimensions(value);spatial=true;reset();},getSelection(){const [x,y,z]=tttCoordinate(cursor,game.dimensions);return {x,y,z};},selectCell(data){if(Number.isInteger(data?.index)&&data.index>=0&&data.index<game.board.length){cursor=data.index;render();}},cellPosition(data){return Number.isInteger(data?.index)&&data.index>=0&&data.index<game.board.length?tttCoordinate(data.index,game.dimensions):null;},render,onView(){},update(dt){if(aiTimer>0){aiTimer=Math.max(0,aiTimer-dt);if(aiTimer===0&&solo&&game.player===2&&game.status==='playing'){const index=chooseTicTacToeMove(game.board,2,game.dimensions);if(index>=0&&game.play(index)){ctx.sound?.(game.status==='won'?'error':'move');render();message();}}}},onKey(key,event){const lower=key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown'].includes(lower)){event?.preventDefault();moveCursor(key);}else if(lower==='enter'){event?.preventDefault();place(cursor);}else if(lower==='u')undo();},onPick(data){if(Number.isInteger(data?.index))place(data.index);},onHover(data){const next=Number.isInteger(data?.index)&&data.index>=0&&data.index<game.board.length?data.index:-1;if(next!==hovered){hovered=next;refreshHover();}},getState(){return {...game.getState(),opponent:solo?'ai':'local',cursor,cursorCoordinates:tttCoordinate(cursor,game.dimensions),aiThinking:aiTimer>0,viewMode:spatial?'volume':'classic'};},dispose(){disposed=true;for(const mesh of retained){ctx.group.remove(mesh);if(mesh.isInstancedMesh)mesh.dispose();}for(const resource of owned)resource.dispose();ctx.ui.replaceChildren();}};\r
}\r
`,wr=Object.freeze(Object.defineProperty({__proto__:null,default:Ft},Symbol.toStringTag,{value:"Module"})),Gn=`import { TicTacToeGame, chooseTicTacToeMove } from './logic.js';
import { mountBoard } from './board.js';
import { mountUI } from './ui.js';

export function mount({ THREE, root, report }) {
  const game = new TicTacToeGame({ spatial: true });
  const ui = mountUI(root);
  let layer = 0;
  let timer;
  let view;
  let flatCells = [];
  const playingBot = () => ui.mode.value === 'computer' && game.player === 2 && game.status === 'playing';
  function paint() {
    const state = game.getState();
    const symbol = (game.winner || game.player) === 1 ? 'X' : 'O';
    ui.status.textContent = game.status === 'won' ? symbol + ' wins' : game.status === 'draw' ? 'Draw game' : playingBot() ? 'Computer is thinking…' : symbol + ' to play';
    ui.buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === layer)));
    view?.paint(state, layer);
    flatCells.forEach((button, cell) => {
      const owner = game.board[layer * 9 + cell];
      button.dataset.owner = owner;
      button.textContent = owner === 1 ? 'X' : owner === 2 ? 'O' : '·';
      button.disabled = Boolean(owner) || game.status !== 'playing' || playingBot();
    });
  }
  function play(index) {
    if (playingBot() || !game.play(index)) return;
    paint();
    if (playingBot()) {
      timer = setTimeout(() => {
        const reply = chooseTicTacToeMove(game.board, 2, true);
        if (reply >= 0 && game.play(reply)) layer = Math.floor(reply / 9);
        paint();
      }, 220);
    }
  }
  function restart() {
    clearTimeout(timer);
    game.restart();
    layer = 0;
    paint();
  }
  try {
    view = mountBoard(THREE, ui.stage, play);
  } catch (error) {
    report('WebGL unavailable. Showing the selected playable layer. ' + error.message);
    const flat = document.createElement('div');
    flat.className = 'flat';
    flatCells = Array.from({ length: 9 }, (_, index) => {
      const cell = document.createElement('button');
      cell.setAttribute('aria-label', 'Place at row ' + (1 + Math.floor(index / 3)) + ', column ' + (1 + index % 3));
      cell.onclick = () => play(layer * 9 + index);
      flat.append(cell);
      return cell;
    });
    ui.stage.replaceChildren(flat);
  }
  ui.buttons.forEach((button, index) => { button.onclick = () => { layer = index; paint(); }; });
  ui.restart.onclick = restart;
  ui.mode.onchange = restart;
  function onKey(event) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.target.tagName === 'SELECT') return;
    if (/^[1-9]$/.test(event.key)) play(layer * 9 + Number(event.key) - 1);
    else if (event.key === '[' || event.key === ']') {
      layer = Math.min(2, Math.max(0, layer + (event.key === '[' ? -1 : 1)));
      paint();
    }
  }
  window.addEventListener('keydown', onKey);
  paint();
  return () => {
    clearTimeout(timer);
    window.removeEventListener('keydown', onKey);
    view?.dispose();
    root.replaceChildren();
  };
}
`,qn=`import { createBoard } from './asset-floating-grid.js';
import { createMark } from './asset-tic-tac-toe-marks.js';
import { palette, layerSpacing } from './materials.js';

export function mountBoard(THREE, stage, onCell) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0, 0);
  stage.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xd8e9ff, 0x66788c, 2.1));
  const key = new THREE.DirectionalLight(0xfff5df, 3.2);
  key.position.set(-4, 6, 4);
  scene.add(key);
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 40);
  camera.position.set(6.6, 4.4, 8);
  camera.lookAt(0, 0, 0);
  const boards = [];
  const marks = new THREE.Group();
  scene.add(marks);
  let activeLayer = 0;
  for (let layer = 0; layer < 3; layer++) {
    const group = createBoard(THREE, 3, 3, palette.floor);
    group.position.y = (layer - 1) * layerSpacing;
    group.children.forEach(cell => {
      cell.material.transparent = true;
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cell.geometry),
        new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 0.36 }));
      cell.add(edges);
    });
    scene.add(group);
    boards.push(group);
  }
  const ray = new THREE.Raycaster();
  function pick(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    const pointer = new THREE.Vector2((event.clientX - bounds.left) / bounds.width * 2 - 1, 1 - (event.clientY - bounds.top) / bounds.height * 2);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(boards[activeLayer].children, false)[0];
    if (hit) {
      const { column, row } = hit.object.userData.cell;
      onCell(activeLayer * 9 + row * 3 + column);
    }
  }
  renderer.domElement.addEventListener('click', pick);
  const render = () => renderer.render(scene, camera);
  function resize() {
    const w = Math.max(1, stage.clientWidth), h = Math.max(1, stage.clientHeight);
    const aspect = w / h, halfHeight = Math.max(2.65, 2.8 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    render();
  }
  function release(group) {
    const resources = new Set();
    group.traverse(node => {
      if (node.geometry) resources.add(node.geometry);
      if (node.material) resources.add(node.material);
    });
    resources.forEach(resource => resource.dispose());
  }
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  return {
    paint(state, layer) {
      activeLayer = layer;
      boards.forEach((group, index) => {
        const selected = layer === index;
        const surface = group.children[0].material;
        surface.color.setHex(selected ? palette.activeFloor : palette.floor);
        surface.opacity = selected ? 0.88 : 0.15;
        surface.depthWrite = selected;
        group.children.forEach(cell => {
          cell.children[0].material.opacity = selected ? 0.62 : 0.22;
          cell.renderOrder = selected ? 0 : 1;
        });
      });
      release(marks);
      marks.clear();
      const winning = new Set(state.winningLines.flat());
      state.board.forEach((player, index) => {
        if (!player) return;
        const mark = createMark(THREE, player === 1 ? 'X' : 'O', winning.has(index) ? palette.winner : player === 1 ? palette.x : palette.o);
        mark.scale.setScalar(0.73);
        mark.position.set(index % 3 - 1, (Math.floor(index / 9) - 1) * layerSpacing + 0.14, Math.floor(index / 3) % 3 - 1);
        marks.add(mark);
      });
      render();
    },
    dispose() {
      observer.disconnect();
      renderer.domElement.removeEventListener('click', pick);
      release(scene);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
`,Un=`export const palette = {
  background: '#161e30',
  floor: 0x455472,
  activeFloor: 0x8397ba,
  edge: 0xa9bad3,
  x: 0xff906f,
  o: 0x90dae8,
  winner: 0xe9fb75,
};

// Vertical distance between successive playable layers.
export const layerSpacing = 1.18;
`,zn=`export function mountUI(root) {
  const style = document.createElement('style');
  style.textContent = \`
    * {box-sizing:border-box}
    #game {display:grid;grid-template-rows:auto minmax(0,1fr) auto; min-height:100%;color:#f4f5f1;
      background: radial-gradient(ellipse at 53% 43%,#36415a 0%,#1b2538 47%,#131a29 88%)}
    .hud,.tools {position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px}
    .hud {align-items:flex-start}
    .hud strong {display:block;font-size:clamp(15px,2.2vw,22px);line-height:1.2}
    .rule {display:block;color:#bdc7d6;font-size:12px;line-height:1.45;margin-top:4px}
    .actions,.layers {display:flex;align-items:center;gap:5px}
    button,select {border:1px solid #536073;border-radius:6px;padding:6px 9px;font:600 12px system-ui;
      background:#242e42;color:#eef2f6;cursor:pointer;min-height:32px}
    button:focus-visible,select:focus-visible {outline:2px solid #e9fb75;outline-offset:2px}
    button:hover,select:hover {border-color:#a5b4c7}
    .layers button[aria-pressed=true] {background:#deed87;color:#19202b;border-color:#deed87}
    .stage {position:relative;width:100%;height:100%;min-height:0;overflow:hidden}
    .stage canvas {position:absolute;inset:0;cursor:crosshair}
    .tools {padding-top:8px}
    .layer-label {color:#bfcbdb;font-size:12px;padding-right:4px}
    .hint {color:#b6c2d2;font-size:11px}
    .flat {height:100%;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:5px;
      max-width:260px;max-height:220px;aspect-ratio:1;margin:auto;padding:7px}
    .flat button {min-height:0;font-size:clamp(16px,4vh,30px);color:#ffac97}
    .flat button[data-owner="2"] {color:#90dae8}
    @media(max-width:480px){.hud,.tools{padding:10px;gap:6px}.hint{display:none}.rule{max-width:230px}.actions{flex-wrap:wrap;justify-content:flex-end}}
    @media(max-height:250px){.hud,.tools{padding:4px 8px}.rule,.hint{display:none}}
  \`;
  root.append(style);
  const hud = document.createElement('div');
  hud.className = 'hud';
  hud.innerHTML = '<div><strong role="status"></strong><span class="rule">Place three in a line across any layer.</span></div>' +
    '<div class="actions"><select aria-label="Opponent"><option value="local">2 players</option><option value="computer">Computer</option></select><button type="button" data-restart>Restart</button></div>';
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.setAttribute('aria-label', '3D tic-tac-toe board');
  const tools = document.createElement('div');
  tools.className = 'tools';
  tools.innerHTML = '<div class="layers" aria-label="Board layer"><span class="layer-label">Layer</span></div><span class="hint">Click a tile · 1–9 to place · [ ] to switch layers</span>';
  const layers = tools.querySelector('.layers');
  const buttons = ['Lower', 'Middle', 'Upper'].map(name => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    layers.append(button);
    return button;
  });
  root.append(hud, stage, tools);
  return { stage, status: hud.querySelector('strong'), mode: hud.querySelector('select'), restart: hud.querySelector('[data-restart]'), buttons };
}
`,Yn=`import { TicTacToeGame, ticTacToeLines, chooseTicTacToeMove } from './logic.js';

export function runChecks() {
  const game = new TicTacToeGame({ spatial: true });
  const topology = ticTacToeLines(true).length === 49;
  game.play(0);
  const occupied = !game.play(0) && game.player === 2 && game.history.length === 1;
  [1, 13, 2, 26].forEach(index => game.play(index));
  const diagonal = game.winner === 1 && game.winningLines.some(line => line.includes(0) && line.includes(13) && line.includes(26));
  const terminal = !game.play(3);
  game.restart();
  const reset = game.history.length === 0 && game.legalMoves().length === 27 && game.player === 1;
  game.play(0);
  const bot = game.play(chooseTicTacToeMove(game.board, 2, true));
  return [
    { name: '49 spatial winning lines', passed: topology },
    { name: 'Occupied cells preserve the turn', passed: occupied },
    { name: 'A diagonal through three floors wins', passed: diagonal },
    { name: 'Win closes the round', passed: terminal },
    { name: 'Restart restores 27 empty cells', passed: reset },
    { name: 'Computer returns a legal reply', passed: bot },
  ];
}
`,Xn=Ft.split("export function createGame(ctx)")[0].trimEnd()+`
`;function bt(){const t={"main.js":Gn,"logic.js":Xn,"board.js":qn,"materials.js":Un,"ui.js":zn,"checks.js":Yn},n=Oe.filter(r=>["tic-tac-toe-marks","floating-grid"].includes(r.id)).map(r=>{const{source:a,...e}=r;return t[r.path]=a,e});return{title:"Floating Tic-Tac-Toe",description:"Line up three across a floating cube. Play a friend on this device or switch to the computer.",files:t,assets:n}}async function at(t,n){Dt(t.files),n.throwIfAborted();const r=document.createElement("div");r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;left:-10000px;top:0;width:800px;height:520px",document.body.append(r);let a,e;const s=[];let c;try{return await new Promise((i,y)=>{const v=(A,g=[],o=!1)=>y(Object.assign(new Error(A),{runtimeLogs:s,testResults:g,checkFailure:o}));c=()=>y(n.reason),n.addEventListener("abort",c,{once:!0}),e=setTimeout(()=>v("The game did not finish starting within 30 seconds."),3e4),a=Nt(r,t,{verifyInput:!0,onEvent(A){s.length<60&&s.push({type:A.type,message:String(A.message??"").slice(0,1200)}),A.type==="error"&&v(A.message||"Preview failed to start.",A.testResults,A.checkFailure===!0),A.type==="ready"&&i({runtimeLogs:s,testResults:A.testResults||[]})}})})}finally{clearTimeout(e),c&&n.removeEventListener("abort",c),a?.dispose(),r.remove()}}const $n=["checks.js","logic.js","solver.js","topology.js"],Vn="bf7582924a73b8c3f54c5295f898b059d4b7b7a4fa25d07806f67dd36e8db440";async function _n({project:t}){if(t?.sourceReceipt?.id!=="q42-0hn0"||!globalThis.crypto?.subtle)return null;const n=$n.map(e=>t.files?.[e]);if(n.some(e=>typeof e!="string"))return null;const r=new TextEncoder().encode(JSON.stringify(n)),a=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(a,e=>e.toString(16).padStart(2,"0")).join("")!==Vn?null:{files:{"checks.js":t.files["checks.js"].replace("visibleCount(cells,3,4)===3","visibleCount(cells,3,4)===2")},summary:"Corrected the visibility check. The center sees two blue tiles, one above and one below. Both horizontal neighbors are red.",model:"Reviewed local correction"}}const Et={gameplay:["What does the player do, and how do they win or lose?",[]],format:["How should the game use space?",["3D","2.5D","Voxel"]],players:["Who will play together?",["Single player","Two players on one device"]],style:["What visual style and camera would you like?",["Isometric with bright arcade colours","Perspective with a cyberpunk palette","Use the Studio defaults"]]},Zn={gameplay:["玩家可以做甚麼？怎樣才算獲勝或結束一局？",[]],format:["玩家如何使用遊戲空間？",["3D","2.5D","Voxel"]],players:["這款遊戲由誰一起玩？",["單人","同一裝置雙人輪流玩"]],style:["你想用甚麼視角和美術風格？",["等距視角，明亮街機配色","透視鏡頭，賽博朋克風格"]]},Wn=[/2[.．]5\s*d|2\.5\s*維/i,/voxel|體素|体素/i,/(?:\b3\s*d\b|3\s*d|三維|三维|立體|立体)/i];function yr(t){const n=/\b(?:3\s*d|spatial|volumetric|cube|stacking|across faces)\b|三[維维]|立[體体]|空[間间]|跨面|[堆疊叠]{2}|3\s*d|[xyz]\s*[軸轴]|\d+\s*[×x]\s*\d+\s*[×x]\s*\d+/iu,r=/\b(?:convert|transform|adapt|port|reimagine|remake)\b|\b(?:turn|extend)\b.{1,120}\b(?:into|from)\b|2\s*d\s*(?:[→➜]|->|to|到|[轉转])\s*3\s*d|[轉转][換换成為为到入]|改[編编造成為为]|移植|[擴扩]展|[變变]成|[轉转]\s*3\s*d|(?:把|將|将).{1,80}做成/iu;return n.test(t)&&r.test(t)}function qe(t){return t.some(n=>typeof n=="string"&&(/\b(?:upload|attach|provide|share|send)\b.{0,110}\b(?:source (?:files?|code|folder)|(?:original |source )?project(?: zip| files?| folder)|zip (?:archive|file))\b/i.test(n)||/(?:上[傳传]|提供|附上|傳送|发送).{0,60}(?:原[始版]|源[碼码]|源码|源文件|專案|項目|项目|zip)/i.test(n)))}function Ct(t){const n=t.messages.filter(g=>g.role==="user").map(g=>g.content),r=n.at(-1)||"",a=n.join(`
`),e={...t.brief||{}},s=/use the studio defaults|use defaults|採用預設|使用默认/i.test(r);t.localQuestion&&!s&&t.messages.at(-1)?.role==="user"&&(e[t.localQuestion]=r),e.title||(e.title=t.source?.title||n[0]?.slice(0,72)||"Untitled game"),!e.gameplay&&(a.length>38||/井字棋|飛行棋|飞行棋|掃雷|扫雷|俄羅斯方塊|tic.tac.toe|ludo|tetris|minesweeper|dodge|platformer|maze|connect four/i.test(a))&&(e.gameplay=n[0]);const c=Wn.findIndex(g=>g.test(a));!e.format&&c!==-1&&(e.format=["2.5D","Voxel","3D"][c]),e.players||(/single.player|solo|單人|单人/i.test(a)?e.players="Single player":/hot.seat|two.player|local multiplayer|雙人|双人/i.test(a)?e.players="Two players on one device":/multiplayer|多人/i.test(a)&&(e.players="Multiplayer")),e.style||(e.style=a.match(/cyberpunk|賽博朋克|赛博朋克|low.poly|pixel.art|像素|noir|minimalist/iu)?.[0]||""),e.camera||(e.camera=a.match(/isometric|orthographic|perspective|top.down|side.view|等[距角]|正交|透視|俯視|側視/i)?.[0]||""),s&&(e.gameplay||(e.gameplay=n[0]),e.format||(e.format="3D"),e.players||(e.players="Single player"),e.style||(e.style="Studio palette"));const i=Object.keys(Et).find(g=>!e[g]);i||e.camera||(e.camera="Choose a camera suited to the gameplay");const y=/[\u3400-\u9fff]/.test(n[0]||""),v=y?Zn:Et,A=y?"採用預設":"Use the Studio defaults";return{brief:e,ready:!i,localQuestion:i||null,message:i?v[i][0]:y?"需求已經齊全。你可以補充細節，或生成第一個版本。":"Your brief is ready. You can add detail or generate the first version.",suggestions:i?[...new Set([...v[i][1],A])]:[]}}let Ue;async function vt(t,n){const a=await fetch("./catalog-sources/"+t,{signal:n,mode:"same-origin",redirect:"error",cache:"no-store"});if(!a.ok)throw Error("The installed Studio is missing its bundled game originals. Open the updated Studio and retry.");return a}async function er(t,n){if(!Ue?.projects[t]){const a=(await(await vt("index.json",n)).json())[t];if(!/^[a-f0-9]{64}$/.test(a||""))throw Error("The selected game is missing from the installed source catalog.");const e=await(await vt(a+".json.gz",n)).arrayBuffer();if(Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",e)),y=>y.toString(16).padStart(2,"0")).join("")!==a)throw Error("The bundled original failed its source integrity check.");const c=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip")),i=await new Response(c).json();if(i.projects?.[t]?.sourceReceipt.id!==t)throw Error("The selected game is missing from its source archive.");n?.throwIfAborted(),Ue=i}return{group:Ue,game:Ue.projects[t]}}async function tr(t,n){const{game:r}=await er(t,n);return{sourceReceipt:r.sourceReceipt,transport:"static"}}const nr="cubiverse-creation-projects",ce="sessions",Be="snapshots",rr=new Set(["id","version","revision","project","experiments","createdAt","updatedAt"]);let Fe;function ar(){if(!globalThis.indexedDB)throw new Error("Project storage is unavailable in this browser.");return Fe||(Fe=new Promise((t,n)=>{const r=indexedDB.open(nr,1);r.onupgradeneeded=()=>{r.result.createObjectStore(ce,{keyPath:"id"}).createIndex("updatedAt","updatedAt"),r.result.createObjectStore(Be,{keyPath:["sessionId","experimentId"]})},r.onsuccess=()=>{const a=r.result;a.onversionchange=()=>{a.close(),Fe=void 0},t(a)},r.onerror=()=>n(r.error)}).catch(t=>{throw Fe=void 0,t})),Fe}function Le(t){return new Promise((n,r)=>{t.onsuccess=()=>n(t.result),t.onerror=()=>r(t.error)})}async function Ce(t,n,r){const e=(await ar()).transaction(t,n),s=new Promise((c,i)=>{e.oncomplete=c,e.onabort=()=>i(e.error||new Error("The project transaction was interrupted."))});try{const c=await r(e);return await s,c}catch(c){try{e.abort()}catch{}throw await s.catch(()=>{}),c}}function Ze(t){return Object.assign(new Error(t),{code:"REVISION_CONFLICT"})}function gt(t){return Object.fromEntries(Object.entries(t).filter(([n])=>!rr.has(n)))}function je(){return new Date().toISOString()}function He(t,n,r=!0){return r&&(n.version+=1,n.updatedAt=je()),t.objectStore(ce).put(n),n}async function De(t,n,r){const a=await Le(t.objectStore(ce).get(n));if(!a)throw new Error("This Studio project could not be found on this browser.");if(r!==void 0&&r!==a.version)throw Ze("This project was updated in another workspace. Reopen the latest revision and retry.");return a}function Pe(t,n){const r=t.experiments.find(a=>a.id===n);if(!r)throw new Error("This experiment could not be found in the project.");return r}function Qt(t={}){const n=je(),r={title:"Untitled game",messages:[],brief:null,...gt(t),id:crypto.randomUUID(),version:1,revision:0,project:null,experiments:[],createdAt:n,updatedAt:n};return Ce([ce],"readwrite",a=>(a.objectStore(ce).add(r),r))}function Bt(t){return Ce([ce],"readonly",async n=>{const r=n.objectStore(ce);return t!=null?await Le(r.get(t))||null:(await Le(r.index("updatedAt").openCursor(null,"prev")))?.value??null})}function br(){return Ce([ce],"readonly",async t=>(await Le(t.objectStore(ce).index("updatedAt").getAll())).reverse().map(({id:r,title:a,revision:e,updatedAt:s,phase:c,mode:i})=>({id:r,title:a,revision:e,updatedAt:s,phase:c,mode:i})))}function or(t,n,r){return Ce([ce],"readwrite",async a=>{const e=await De(a,t,r);return Object.assign(e,gt(n)),He(a,e)})}function sr(t,n={},r){return Ce([ce],"readwrite",async a=>{const e=await De(a,t,r);if(n.repairOf){const c=Pe(e,n.repairOf);if(c.baseRevision!==e.revision)throw Ze("The failed candidate belongs to an earlier revision.");c.status==="running"&&(c.status="failed",c.finishedAt=je(),c.error="A manual repair resumed this candidate in a new experiment.")}const s={...n,id:crypto.randomUUID(),kind:n.kind||"generate",status:"running",baseRevision:e.revision,revision:null,startedAt:je(),finishedAt:null,startVersion:e.version+1,sourceVersion:n.sourceVersion??e.source?.version??null,gameType:n.gameType??e.brief?.genre??null,transformationStrategy:n.transformationStrategy??null,instruction:n.instruction??(typeof n.agentInstructions=="string"?n.agentInstructions:""),agentInstructions:n.agentInstructions??n.instruction??"",generatedIR:n.generatedIR??e.brief??null,buildConfiguration:n.buildConfiguration??{entry:"main.js",renderer:"Three.js"},runtimeLogs:[],testResults:[],qualityAssessment:{status:"pending"}};return e.experiments.unshift(s),{session:He(a,e),experimentId:s.id}})}function ir(t,n,r,a,e){return Ce([ce,Be],"readwrite",async s=>{const c=await De(s,t),i=Pe(c,n);if(i.status!=="running"||i.repair||i.startVersion!==c.version||i.baseRevision!==c.revision)throw Ze("The project changed before the failed checks could be repaired. Reopen the latest experiment.");return i.repair=a,i.hasSnapshot=!0,i.model=e.model,i.summary=e.summary,s.objectStore(Be).add({sessionId:t,experimentId:n,project:r}),He(s,c,!1)})}function Jt(t,n){if(n.runtimeLogs?.length){const r=n.runtimeLogs.slice(-100).map(e=>typeof e=="string"?e.slice(0,1600):{type:String(e?.type||"log").slice(0,32),message:String(e?.message??"").slice(0,1600),at:e?.at??je()}),a=t.runtimeLogs.length+n.runtimeLogs.length;t.runtimeLogs=t.runtimeLogs.concat(r).slice(-100),t.omittedRuntimeLogs=(t.omittedRuntimeLogs||0)+a-t.runtimeLogs.length}n.testResults?.length&&t.testResults.push(...n.testResults),n.qualityAssessment!=null&&(t.qualityAssessment=n.qualityAssessment)}async function ot(t,n,r){if(!["succeeded","failed","needs-input"].includes(r.status))throw new Error("An experiment must finish with a result.");if(r.status==="succeeded"&&!r.project?.files)throw new Error("A successful experiment needs its editable project.");const a=await Ce([ce,Be],"readwrite",async e=>{const s=await De(e,t),c=Pe(s,n);if(c.status!=="running")return{session:s};const i=r.status==="succeeded"&&c.baseRevision!==s.revision,y=r.project??null;if(c.hasSnapshot=!!(y||c.repair),y&&c.repair){const v=e.objectStore(Be),A=await Le(v.get([t,n]));v.put({sessionId:t,experimentId:n,project:y,beforeRepair:A.project})}else y&&e.objectStore(Be).add({sessionId:t,experimentId:n,project:y});for(const v of["model","summary","error","sourceVersion","gameType","transformationStrategy","agentInstructions","generatedIR","buildConfiguration","testCorrections","spatialChoice","spatialPlan","gameUnderstanding","spatialOptions","canonicalIR"])r[v]!==void 0&&(c[v]=r[v]);return c.status=i?"failed":r.status,c.finishedAt=je(),Jt(c,r),!i&&s.version===c.startVersion&&r.sessionPatch&&Object.assign(s,gt(r.sessionPatch)),i?(c.error="Another revision finished first. Reapply this edit to the latest project.",c.qualityAssessment={status:"conflict"}):r.status==="succeeded"&&(s.project=y,s.revision+=1,s.title=y.title||s.title,c.revision=s.revision),{session:He(e,s),stale:i,message:c.error}});if(a.stale)throw Ze(a.message);return a.session}function kt(t,n,r){return Ce([ce],"readwrite",async a=>{const e=await De(a,t);return Jt(Pe(e,n),r),He(a,e,!1)})}function pt(t,n){return Ce([ce,Be],"readonly",async r=>{const a=await De(r,t),e=Pe(a,n),s=await Le(r.objectStore(Be).get([t,n]));return{...e,project:s?.project??null,generatedCode:s?.project.files??null,...s?.beforeRepair&&{beforeRepair:s.beforeRepair}}})}async function xt(t,n){const{project:r}=await pt(t,n);if(!r)throw new Error("This experiment ended before a playable project was produced.");return r}const cr={entry:"main.js",renderer:"Three.js r180",target:"Browser",checks:"checks.js"},he=(t,n)=>({role:t,content:n}),It={en:"Your brief is saved. Review the spatial rules or choose a mechanic below to finish the plan.",zh:"需求已保存，還需要確認空間玩法。請重新分析或在下方選擇一種玩法。"},Ot=["gameUnderstanding","spatialOptions","spatialChoice","spatialPlan","canonicalIR"];function Ee(t){return Object.fromEntries(Ot.filter(n=>t?.[n]!=null).map(n=>[n,t[n]]))}function xe(t){const n=t?.spatialPlan?.family;return!!(n&&(n==="visual-only"||t.canonicalIR?.target?.family===n))}function St(t){return t.mode==="convert"&&!t.gameUnderstanding?"Source analysis was interrupted. Your request is saved.":t.spatialChoice&&!xe(t)?"Spatial rule confirmation was interrupted.":"Your last message is saved. If a reply is still missing, choose Try again to continue the brief."}function st(t){return["generate","edit"].includes(t.pendingAction?.kind)?t.pendingQuestion?t.pendingQuestion:!t.errorCode&&typeof t.error=="string"&&/[?？]\s*$/u.test(t.error)?t.error:"":""}function Tt(t){const n=t.experiments?.[0];if(!n||!["generate","edit"].includes(n.kind)||n.kind!==t.pendingAction?.kind||n.baseRevision!==t.revision||!["failed","running"].includes(n.status))return null;if(n.repairOf&&!n.hasSnapshot)return n.repairOf;if(!n.hasSnapshot)return null;if(n.repair||t.errorCode==="creation_checks_failed")return n.id;const r=!t.errorCode||t.errorCode==="operation_failed",a=n.runtimeLogs?.findLast(s=>s.type==="error");if(!r||!a)return null;const e=/webgl|webgpu|renderer|graphics context|gpu device|did not finish starting within|without adding a view|failed to fetch|networkerror/i;return n.testResults?.some(s=>s.passed===!1)||!e.test([n.error,a.message].join(" "))?n.id:null}function lr(t,n){return{operation:n,error:t.message,testResults:t.testResults||[],runtimeLogs:t.runtimeLogs||[]}}function At(t,n){const r=n.testResults.filter(e=>e.passed===!0).map(e=>e.name),a=[];for(const e of(t.testResults||[]).filter(s=>!s.synthetic&&!s.replayedAt)){const s=r.indexOf(e.name);s<0?a.push(e.name):r.splice(s,1)}if(a.length)throw Object.assign(Error("The repaired game omitted original checks: "+a.join(", ")),{code:"creation_checks_failed",checkFailure:!0,runtimeLogs:n.runtimeLogs,testResults:[...n.testResults,...a.map(e=>({name:e,passed:!1,detail:"Missing from the repaired test results."}))]})}function dr(t,n,r){const a=new Set;let e=t;for(;e&&!a.has(e.id);)At(e,r),e.repair&&At(e.repair,r),a.add(e.id),e=e.repairOf&&n.find(s=>s.id===e.repairOf)}async function Xe(t,n,r){{if(t==="source"&&ct(n.source?.id))return tr(n.source.id,r);throw Object.assign(new Error("Open the local CubiEngine Studio app for AI generation."),{code:"service_unavailable"})}}async function ur(t,n){const{sourceReceipt:r,transport:a}=await Xe("source",{source:t},n);if(n.throwIfAborted(),!r||r.id!==t.id||!r.fingerprint||!r.version||!Number.isInteger(r.fileCount)||r.fileCount<1||!r.paths?.length)throw Error("Studio could not verify the original game files. Retry to load the source library.");return{source:{...t,revision:r.version,fingerprint:r.fingerprint,...a==="static"&&{transport:a}},sourceReceipt:r}}function Er({briefHost:t,workbenchHost:n,onPhase:r,onBack:a}){let e,s,c,i,y="",v="",A=!1,g;function o(){!e||A||(s!==e.phase&&(c?.destroy(),s=e.phase,r?.(s,e.id),c=s==="brief"?cn(t,{onSend:l=>W(l),onChooseSpatial:X,onGenerate:()=>G({kind:"generate"}),onRetry:()=>W(),onBack:a,onStartExample:oe}):Bn(n,{onSend:l=>st(e)?G(e.pendingAction,l):e.project?G({kind:"edit",instruction:l}):re(l),onSaveFile:(l,I)=>G({kind:"code",path:l,content:I,instruction:"Edit "+l}),onUseAsset:l=>G({kind:"asset",assetId:l.id,format:l.format,instruction:"Add "+l.name+" to project assets"}),onReviseBrief:()=>re(),onRestore:l=>G({kind:"restore",experimentId:l.id,instruction:"Restore revision "+l.revision}),onReadExperiment:l=>pt(e.id,l),onReplay:b,onRetry:()=>G(e.pendingAction||{kind:e.project?"edit":"generate",instruction:e.messages.filter(l=>l.role==="user").at(-1)?.content},void 0,Tt(e)),onPreview:B,onExport:C,onBack:a,onStartExample:oe})),c.update({...e,pendingQuestion:st(e),canRepairChecks:!!Tt(e),busy:!!i,status:y||e.status||"",error:v||e.error||"",assets:e.project?.assets||[]}))}async function C(l){try{const I=await Pn(l),f=URL.createObjectURL(new Blob([I],{type:"text/html"})),k=document.createElement("a");k.href=f,k.download=(l.title.replace(/[^\p{L}\p{N}_-]+/gu,"-").slice(0,70)||"game")+".html",k.click(),setTimeout(()=>URL.revokeObjectURL(f),1e4)}catch(I){v=I.message,o()}}function B(l,I){const f=e.id,k=e.revision,R=e.experiments.find(x=>x.revision===k&&x.status==="succeeded");let w=[],L;const U=()=>{if(clearTimeout(L),L=null,!R||!w.length)return;const x=w;w=[];const V=x.find(_=>_.type==="error");kt(f,R.id,{runtimeLogs:x,...V?{qualityAssessment:{status:"runtime-error",message:V.message}}:{}}).then(_=>{!A&&!i&&e.id===_.id&&e.version===_.version&&(e=_,o())}).catch(()=>{})},m=Nt(l,I,{onEvent(x){w.length<50&&w.push({type:x.type,message:String(x.message??"").slice(0,1200)}),L||(L=setTimeout(U,500)),x.type==="error"&&(v=x.message,o())}});return()=>{m.dispose(),U()}}async function T(l){e=await or(e.id,l,e.version)}async function F(l,I){if(i||A)return!1;const f=new AbortController;i=f,y=l,v="",o();try{return await I(f.signal),!0}catch(k){return k.code==="REVISION_CONFLICT"&&(e=await Bt(e.id)),f.signal.aborted?!A&&e.phase==="brief"&&e.messages.at(-1)?.role==="user"&&(v=St(e)):v=k.message,!1}finally{i===f&&(i=null,y="",o())}}function D(){return{brief:e.brief,messages:e.messages.filter(l=>!l.superseded).slice(-24),source:e.source,...e.mode==="convert"||e.canonicalIR?{sourcePrompt:e.project?.sourcePrompt||e.source?.sourcePrompt||e.messages.find(l=>l.role==="user")?.content}:{},assets:e.project?.assets||e.assets||[],image:e.attachments?.image||e.project?.sourceImage,mode:e.mode,...Ee(e)}}function K(l){const{sourceImage:I,source:f,...k}=l;return k}async function H(l){if(e.source?.kind!=="catalog"||e.sourceReceipt)return;y="Opening original game files…",o();const I=ct(e.source.id||e.source.sourceId),f=I?ft(I):e.source,k=g;g=void 0;const R=await(k||ur(f,l));l.throwIfAborted();const w={...R,error:""},L=e.messages.at(-1);e.phase==="brief"&&L?.role==="assistant"&&qe([L.content,...e.suggestions||[]])&&(w.messages=[...e.messages.slice(0,-1),{...L,superseded:!0},he("assistant",`I’ve opened the original ${f.title} files. Review the spatial rules to compare possible moves and strategies.`)],w.suggestions=[],w.ready=!1,w.localQuestion=null),await T(w),o()}function X(l){const I=e.spatialOptions?.find(k=>k.family===l);if(!I||i)return!1;if(l===e.spatialChoice)return!xe(e)&&(e.error||v)?W():!1;const f=e.messages.some(k=>k.role==="user"&&/[\u3400-\u9fff]/u.test(k.content));return W(f?"選擇「"+I.label+"」。":"Use "+I.label+".",l)}function W(l,I){const f=e.mode==="convert"||!!(e.spatialPlan||e.gameUnderstanding),k=f&&!e.gameUnderstanding?"Analyzing the original game…":I||e.spatialChoice?"Confirming spatial rules…":"Reviewing your brief…";return F(k,async R=>{const w=e.spatialPlan,L=e.canonicalIR;let U=!1;if(l){const Q=he("user",l),J=I||f&&sn([Q]);U=w&&(!J||J===w.family),await T({messages:[...e.messages,Q],error:"",errorCode:null,...f&&{ready:!1,spatialPlan:null,canonicalIR:null,analysisRetry:null,...J&&{spatialChoice:J}}})}o();let m,x="";try{if(await H(R),y=k,o(),m=await Xe("brief",{...D(),draftId:e.id,...!l&&f&&e.analysisRetry&&{analysisRetry:e.analysisRetry},...U&&{spatialPlan:w,canonicalIR:L}},R),f&&!m.gameUnderstanding&&!e.gameUnderstanding&&(m.ready||m.spatialOptions?.length||m.spatialPlan))throw Error("Studio could not verify the original gameplay rules from the supplied input.");if(e.spatialChoice&&(m.ready||m.spatialPlan)&&(m.spatialPlan?.family!==e.spatialChoice||!xe(m)))throw Error("Studio could not confirm the rules for the selected mechanic.");if(e.source?.transport==="static"&&e.sourceReceipt&&qe([m.message,...m.suggestions||[]])){if(f)throw Error("Restart the updated Studio server to analyze the attached game files.");m=Ct(e)}}catch(Q){if(R.throwIfAborted(),f){if(Q.code==="creation_needs_input"&&!(e.sourceReceipt&&qe([Q.message]))){const M=e.messages.at(-1),le=M?.role==="assistant"&&M.content===Q.message?e.messages:[...e.messages,he("assistant",Q.message)];await T({messages:le,ready:!1,error:"",errorCode:null,analysisRetry:null,status:"",suggestions:[],localQuestion:null});return}await T({messages:e.messages,ready:!1,error:Q.message,errorCode:Q.code||"brief_request_failed",analysisRetry:Q.analysisRetry??e.analysisRetry??null,status:"",suggestions:[],localQuestion:null});return}const J=Q.code==="creation_needs_input"&&e.source?.transport==="static"&&e.sourceReceipt&&qe([Q.message]);if(!J&&Q.code&&!/^(provider|model|service_unavailable|missing_api)/.test(Q.code))throw Q;J||(x=Q.message+" You can continue with the local brief."),m=Ct(e)}R.throwIfAborted();const V=f||!!(m.spatialPlan||m.gameUnderstanding);if(V&&!m.spatialPlan&&!m.spatialOptions?.length&&m.ready){const Q=e.messages.some(J=>J.role==="user"&&/[\u3400-\u9fff]/u.test(J.content));m.message=It[Q?"zh":"en"]}const _=V?{...Ee(m),spatialPlan:m.spatialPlan||null,canonicalIR:m.canonicalIR||null,spatialChoice:m.spatialPlan?.family||e.spatialChoice||null}:{};await T({brief:m.brief,title:m.brief.title||e.title,..._,ready:m.ready&&(!V||xe(_)),suggestions:m.suggestions||[],localQuestion:m.localQuestion||null,error:x,errorCode:null,analysisRetry:null,status:x?"Local requirements interview":"",model:m.model||null,messages:[...e.messages,he("assistant",m.message)]})})}async function re(l){const I=await F("Opening your brief…",async()=>{await T({phase:"brief",pendingAction:null,pendingQuestion:null,errorCode:null,error:""}),o()});return I&&l?W(l):I}async function b(l){let I="The checks could not start.";return{passed:await F("Replaying archived project checks…",async k=>{const R=await xt(e.id,l),w=new Date().toISOString();let L,U;try{L=await at(R,k),I=L.testResults.length+" checks passed."}catch(m){k.throwIfAborted(),U=m,L={testResults:m.testResults||[],runtimeLogs:m.runtimeLogs||[]},I=m.message}if(e=await kt(e.id,l,{runtimeLogs:[...L.runtimeLogs,{type:"replay",at:w,message:I}],testResults:L.testResults.map(m=>({...m,replayedAt:w}))}),U)throw U}),summary:I}}async function O({prompt:l="",source:I=null,mode:f="create",assets:k=[],attachments:R=null,catalogOpening:w}={}){if(A||i)return!1;g=I?.id&&w?.id===I.id?w.promise:void 0;const L=l.trim()||(I?"Create a spatial version of "+I.title:"");return e=await Qt({phase:"brief",mode:f,source:I,assets:k,attachments:R,...f==="remix"&&I?.canonicalIR&&Ee(I),title:I?.title||L.slice(0,72)||"New game",messages:L?[he("user",L)]:[]}),s=null,o(),L?W():!0}async function $(l){if(A||i)return!1;const I=await Bt(l);if(!I||A)return!1;if(e=I,e.phase==="brief"&&(e.mode==="convert"||e.spatialChoice)&&!xe(e)&&e.error&&e.status==="Local requirements interview"){!e.gameUnderstanding&&e.messages.at(-1)?.role==="assistant"&&(e.messages=e.messages.slice(0,-1));const f=Object.values(It);e.messages=e.messages.filter(k=>k.role!=="assistant"||!f.includes(k.content)),e.ready=!1,e.status="",e.suggestions=[],e.localQuestion=null}if(s=null,v=e.pendingAction&&!e.error&&!e.pendingQuestion?"The last operation was interrupted or is open in another tab. You can retry it here.":"",o(),e.mode==="convert"&&!e.sourceReceipt&&!e.source?.files&&e.phase==="brief"){const f=e.source,k=f?ct(f.id||f.sourceId)||Ve.find(R=>R.title===f.title&&(R.url===f.url||R.sourceProject.url===f.url)):rn(e.messages.find(R=>R.role==="user")?.content||"");(k||f?.kind==="catalog")&&await F("Opening original game files…",async R=>{k&&f?.kind!=="catalog"&&await T({source:ft(k)}),await H(R)})}return!v&&!e.error&&!e.ready&&e.phase==="brief"&&(e.mode==="convert"&&!e.gameUnderstanding&&(e.spatialOptions?.length||e.messages.at(-2)?.superseded&&e.sourceReceipt)?v="The attached game is ready for source analysis.":e.messages.at(-1)?.role==="user"&&(v=St(e)),o()),!0}async function oe(){if(A||i)return!1;const l=bt();return e=await Qt({title:l.title,mode:"example",phase:"workbench",brief:{title:l.title,gameplay:l.description||"Make a line of three.",format:"3D",players:"Two players on one device"},messages:[he("assistant","This is a local starter project. Play a round, edit its JavaScript, or describe a change.")]}),s=null,G({kind:"example",instruction:"Open the local 3D Tic-Tac-Toe example"})}async function ie(l,I){const f=e.project;switch(l.kind){case"example":return{project:bt(),model:"Local starter",summary:"Opened the editable starter."};case"restore":return{project:await xt(e.id,l.experimentId),summary:l.instruction};case"code":{if(!f||!Object.hasOwn(f.files,l.path))throw new Error("Reopen the project to edit this file.");return{project:{...f,files:{...f.files,[l.path]:l.content}},summary:"Saved "+l.path+"."}}case"asset":{if(!f)throw new Error("Open a project before adding an asset.");if(f.assets?.some(R=>R.id===l.assetId))throw new Error("This asset is already in the project.");if(l.format==="glb"&&/^[a-f0-9]{64}$/.test(l.assetId)){const R=await fetch("/api/v1/asset-library/"+l.assetId,{signal:I});if(!R.ok)throw new Error("The local 3D asset could not be loaded.");const w=await R.json();if(w.id!==l.assetId||w.format!=="glb")throw new Error("The stored model does not match the selected asset.");return{project:{...f,assets:[...f.assets||[],w]},summary:"Added "+w.name+". Ask the agent to place it in the game, or use it from code."}}const k=Oe.find(R=>R.id===l.assetId);if(!k)throw new Error("This asset has no editable library module.");if(Object.hasOwn(f.files,k.path))throw new Error("This module is already in the project.");return{project:{...f,files:{...f.files,[k.path]:k.source},assets:[...f.assets||[],dn(k)]},summary:"Added "+k.name+". Import "+k.path+" in code or ask the agent to use it."}}case"generate":case"edit":{const k=l.kind==="edit";if(k&&!f)throw new Error("Generate the first version before editing it.");const R=e.experiments.find(x=>x.revision===e.revision&&x.status==="succeeded"),w=await Xe(l.kind,{...D(),...k?{project:K(f),instruction:l.instruction,runtimeLogs:R?.runtimeLogs||[]}:{draftId:e.id}},I),L=f||e,U={...Ee(L),...Ee(w)};if(L.spatialPlan&&U.spatialPlan.family!==L.spatialPlan.family||U.spatialPlan&&!xe(U))throw Error("The build returned a spatial contract that does not match the chosen mechanic. Reopen the brief and confirm the plan.");return L.canonicalIR&&(U.canonicalIR=L.canonicalIR),{...w,project:{...f,title:w.title||f?.title||e.title,...U,...U.spatialPlan&&{sourcePrompt:f?.sourcePrompt||e.source?.sourcePrompt||e.messages.find(x=>x.role==="user")?.content},...U.spatialPlan&&e.attachments?.image&&{sourceImage:e.attachments.image},...e.sourceReceipt&&{source:e.source,sourceReceipt:e.sourceReceipt},...U.canonicalIR&&!e.sourceReceipt&&e.source&&{source:e.source.originalSource||e.source,...e.source.sourceReceipt&&{sourceReceipt:e.source.sourceReceipt}},files:k?{...f.files,...w.files}:w.files,assets:w.assets??f?.assets??[],ir:w.ir||f?.ir||e.brief,...w.parentProjectId||w.parentVersion?{parentProjectId:w.parentProjectId,parentVersion:w.parentVersion}:{},description:w.summary}}}default:throw new Error("Unknown project operation.")}}async function Ae(l,I,f,k){const R=await _n(l);k.throwIfAborted();const w=R||await Xe("repair",{...D(),project:K(l.project)},k);if(k.throwIfAborted(),!w.files||!Object.entries(w.files).some(([L,U])=>U!==l.project.files[L]))throw Error("The repair returned no changed files. The candidate and its failed checks are saved.");if(!R&&e.sourceReceipt&&Object.hasOwn(w.files,"checks.js")&&w.files["checks.js"]!==l.project.files["checks.js"]&&!w.testCorrections?.length)throw Error("The repair changed the original checks without a verified source correction.");return{...l,...w,project:{...l.project,files:{...l.project.files,...w.files},assets:w.assets??l.project.assets,ir:w.ir||l.project.ir,description:w.summary||l.project.description}}}function G(l,I,f){if(e.phase==="brief"&&e.mode==="convert"&&l.kind==="generate"&&(!e.ready||!xe(e)))return!1;const k=e.pendingAction===l,R=st(e);return F(f?"Rechecking the saved candidate…":l.kind==="generate"?"Generating your first version…":"Preparing the revision…",async w=>{(l.kind==="generate"||l.kind==="edit")&&await H(w);const L=[...e.messages];if(I&&R){const Q=L.at(-1);(Q?.role!=="assistant"||Q.content!==R)&&L.push(he("assistant",R)),L.push(he("user",I))}else l.kind==="edit"&&!k&&L.push(he("user",l.instruction));const U=l.instruction||L.filter(Q=>Q.role==="user").map(Q=>Q.content).join(`
`);await T({phase:"workbench",pendingAction:l,pendingQuestion:null,messages:L,errorCode:null,error:"",status:""}),o();const m=await sr(e.id,{kind:l.kind,instruction:U,gameType:e.brief?.gameplay||e.title,...Ee(e.project||e),...f&&{repairOf:f},sourceVersion:e.project?"revision "+e.revision:e.source?.revision||e.source?.version||null,transformationStrategy:e.mode,generatedIR:e.brief,buildConfiguration:cr},e.version);e=m.session,o();let x,V,_;try{if(f){if(_=await pt(e.id,f),!_.project?.files)throw Error("The failed candidate could not be opened.");x={project:_.project,model:_.model,summary:_.summary,sourceVersion:_.sourceVersion}}else x=await ie(l,w);w.throwIfAborted(),y="Running the preview and project checks…",o();let Q;try{Q=await at(x.project,w)}catch(M){if(w.throwIfAborted(),!M.checkFailure||!["generate","edit"].includes(l.kind))throw M;V=lr(M,l.kind)}if(V&&(e=await ir(e.id,m.experimentId,x.project,V,x),w.throwIfAborted(),y="Repairing the failed game checks…",o(),x=await Ae(x,U.slice(0,6e3),V,w),y="Rechecking the repaired game…",o(),Q=await at(x.project,w),At(V,Q)),_&&dr(_,e.experiments,Q),_&&!V){const M=Q.testResults.filter(le=>le.passed&&le.name!=="Browser game mounted");if(!M.length)throw Error("The saved candidate did not report any passing game checks.");x.model="Local verification",x.summary=`Rechecked the saved candidate. ${M.length} game ${M.length===1?"check":"checks"} passed and the game started.`}w.throwIfAborted();const J=x.summary||"The new revision is ready to play.";e=await ot(e.id,m.experimentId,{status:"succeeded",...Q,project:x.project,model:x.model||"Local edit",sourceVersion:x.sourceVersion??void 0,generatedIR:x.project.ir||x.ir||e.brief,summary:J,...Ee(x.project),testCorrections:x.testCorrections,gameType:x.ir?.gameType,transformationStrategy:x.ir?.spatialStrategy,qualityAssessment:{status:"preview-verified",message:"Browser startup and included project checks passed. Gameplay fidelity and visual quality require playtesting."},sessionPatch:{...Object.fromEntries(Ot.filter(M=>e[M]!=null||x.project[M]!=null).map(M=>[M,x.project[M]??null])),pendingAction:null,error:"",messages:[...L,he("assistant",J)]}})}catch(Q){if(Q.code==="REVISION_CONFLICT")throw Q;if(!V&&!w.aborted&&Q.code==="creation_needs_input"&&["generate","edit"].includes(l.kind)){const me=Q.message;e=await ot(e.id,m.experimentId,{status:"needs-input",summary:me,qualityAssessment:{status:"needs-input",message:me},sessionPatch:{pendingQuestion:me,errorCode:Q.code,error:"",messages:[...L,he("assistant",me)]}});return}let J=w.aborted?"The operation was interrupted.":Q.message;!w.aborted&&Q.code==="provider_timeout"&&!V&&(J+=l.kind==="edit"?" Your edit request is saved. Choose Try again to apply it to the current version.":" Your game brief is saved. Choose Try again to generate the first version.");const M=Q.evidence||{},le=x?.project||M.project&&{...M.project,...Ee(e)},we=Q.code||(Object.hasOwn(Q,"checkFailure")?"creation_preview_failed":"operation_failed");throw e=await ot(e.id,m.experimentId,{status:"failed",project:le,model:x?.model||M.model,testCorrections:x?.testCorrections,...Ee(le),generatedIR:x?.ir||M.generatedIR,sourceVersion:M.sourceVersion??void 0,error:J,testResults:Q.testResults||M.testResults||[],runtimeLogs:Q.runtimeLogs||M.runtimeLogs||[],qualityAssessment:{status:"failed",message:J},sessionPatch:{errorCode:Q.checkFailure?"creation_checks_failed":we,error:J}}),!w.aborted&&Q.code==="provider_timeout"?new Error(J,{cause:Q}):Q}})}function ge(){i?.abort()}return window.addEventListener("pagehide",ge),{start:O,reopen:$,show:$,starter:oe,dispose(){A=!0,ge(),window.removeEventListener("pagehide",ge),c?.destroy()}}}export{Ve as a,ft as b,en as c,yr as d,ur as e,fr as f,Er as g,Bt as h,rn as i,pt as j,br as l,yn as o,hr as r,ct as s,wr as t};
