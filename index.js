// NeoMe : ton compagnon d'origine (code inchangé), livré en plugin avec ses 25 images et son style.
// Son état (nom, niveau, humeur…) est dans le dossier du plugin, que NeoDex sauvegarde (synchro cloud comprise) ; à la première ouverture il reprend ton NeoMe d'avant.
// Il demande l'accès complet pour vivre dans la page de NeoDex. NeoDex ne le charge que s'il est signé.
const HTML = "<div class=\"appWrap wide\"><div class=\"agHead\"><span class=\"label\">NeoMe</span></div><div class=\"hint\">NeoMe vit sur l'accueil de NeoDex et se balade dans la barre des tâches : clique-le, chatouille-le, nourris-le et joue à la balle avec lui (clic droit).</div><div class=\"row\"><button class=\"btn main px\" id=\"nmToggle\">MONTRER / CACHER NEOME</button></div></div>";
const PET_CSS = `/* NeoMe, the pet of the home page (pet.js): its pictures, and its motions */
#pet{position:fixed;left:20px;bottom:-16px;z-index:40;user-select:none}
#pet img{display:block;width:181px;height:auto;cursor:var(--cp,pointer);touch-action:none;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45));transform-origin:50% 85%}
#pet.toBar img{opacity:.75;scale:.6;transition:scale .15s,opacity .15s}
body.browsing #pet,body.browsing .petBall,body.browsing .petBallShadow,body.browsing .petMenu{display:none!important}
.nm-breathe{animation:nmBreathe 3.2s ease-in-out infinite} @keyframes nmBreathe{50%{transform:scale(1.02,.98) translateY(1px)}}
.nm-sleep{animation:nmBreathe 4.5s ease-in-out infinite}
.nm-hop{animation:nmHop .6s cubic-bezier(.3,.7,.4,1.4)} @keyframes nmHop{0%{transform:scale(1.06,.92)}35%{transform:translateY(-22px) scale(.96,1.05)}70%{transform:translateY(0) scale(1.05,.95)}100%{transform:none}}
.nm-bounce{animation:nmHop .5s cubic-bezier(.3,.7,.4,1.4) infinite}
.nm-dance{animation:nmDance .52s ease-in-out infinite} @keyframes nmDance{0%,100%{transform:rotate(-6deg) translateY(0)}25%{transform:rotate(0) translateY(-8px)}50%{transform:rotate(6deg) translateY(0)}75%{transform:rotate(0) translateY(-8px)}}
.nm-float{animation:nmFloat 1.6s ease-in-out infinite} @keyframes nmFloat{50%{transform:translateY(-8px) scale(1.03)}}
.nm-jolt{animation:nmJolt .45s cubic-bezier(.2,1.6,.4,1)} @keyframes nmJolt{0%{transform:scale(.92,1.08)}30%{transform:translateY(-14px) scale(1.06,.95)}100%{transform:none}}
.nm-tilt{animation:nmTilt 2s ease-in-out infinite} @keyframes nmTilt{0%,100%{transform:rotate(0)}30%,70%{transform:rotate(-8deg)}}
.nm-lean{animation:nmLean 1.8s ease-in-out infinite} @keyframes nmLean{50%{transform:rotate(7deg) translateY(-4px)}}
.nm-shake{animation:nmShake .12s linear infinite} @keyframes nmShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px) rotate(-2deg)}75%{transform:translateX(3px) rotate(2deg)}}
.nm-tremble{animation:nmShake .08s linear infinite}
.nm-droop{animation:nmDroop 2.6s ease-in-out infinite} @keyframes nmDroop{50%{transform:translateY(4px) scale(1.03,.96)}}
.nm-dizzy{animation:nmDizzy .9s ease-in-out infinite} @keyframes nmDizzy{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
.nm-shy{animation:nmShy 1.4s ease-in-out infinite} @keyframes nmShy{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(-4deg) scale(.97,1.02)}}
.nm-sway{animation:nmSway 2.4s ease-in-out infinite} @keyframes nmSway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg) translateY(-2px)}}
.nm-squish{animation:nmSquish .9s ease-in-out infinite} @keyframes nmSquish{50%{transform:scale(1.08,.9)}}
.nm-ko{animation:nmKo .7s ease-out forwards} @keyframes nmKo{60%{transform:rotate(18deg) translateY(4px)}100%{transform:rotate(12deg) translateY(6px)}}
.nm-glitch{animation:nmGlitch .3s steps(2) infinite} @keyframes nmGlitch{0%{transform:translate(0);filter:none}25%{transform:translate(-4px,1px) skewX(6deg)}50%{transform:translate(3px,-2px);filter:hue-rotate(90deg)}75%{transform:translate(-2px,2px) skewX(-4deg)}}
@media (prefers-reduced-motion:reduce){#pet img{animation:none!important}}
.petBubble{position:absolute;left:50%;bottom:calc(100% - 10px);transform:translateX(-50%) scale(.6);opacity:0;pointer-events:none;white-space:nowrap;background:var(--win);color:#fff;font:15px var(--text);padding:7px 12px;box-shadow:0 0 0 2px var(--line2),0 3px 0 2px #05010b;transition:opacity .15s,transform .15s steps(3)}
.petBubble.on{opacity:1;transform:translateX(-50%) scale(1)} .petBubble::after{content:'';position:absolute;left:50%;top:100%;margin-left:-5px;border:5px solid transparent;border-top-color:var(--line2)}
.petFood{position:absolute;width:20px;height:20px;transition:top .6s cubic-bezier(.5,0,1,1);background:radial-gradient(circle at 35% 35%,#f6c37a 0 30%,#d08a3a 31% 60%,transparent 61%);box-shadow:inset 0 0 0 2px #5a2e10;border-radius:50%}
.petBall{position:fixed;left:0;top:0;width:22px;height:22px;z-index:41;cursor:var(--cg,grab);touch-action:none;border-radius:50%;box-shadow:0 0 0 2px #05010b,inset -4px -4px 0 rgba(0,0,0,.25);
  background:radial-gradient(circle at 32% 30%,#fff 0 14%,transparent 15%),conic-gradient(var(--magenta) 0 25%,var(--pink) 0 50%,var(--magenta) 0 75%,var(--pink) 0)} .petBall.held{cursor:var(--cgg,grabbing)}
.petBallShadow{position:fixed;left:0;top:0;width:24px;height:7px;z-index:39;border-radius:50%;background:rgba(0,0,0,.55);pointer-events:none}
.petBall.fade,.petBallShadow.fade{opacity:0!important;transition:opacity .5s}
.petMenu{position:fixed;z-index:200;display:flex;flex-direction:column;gap:4px;min-width:220px;padding:12px;background:var(--win);box-shadow:0 0 0 2px var(--line2),0 4px 0 2px #05010b}
.petMenu button{all:unset;cursor:var(--cp,pointer);padding:6px 8px;color:var(--shell);font:15px var(--text)} .petMenu button:hover{background:rgba(var(--pkr),.2);color:#fff}
.petTitle{font:9px var(--title);color:var(--lilac);margin-bottom:6px} .petStat{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:8px;font-size:13px;color:var(--muted)}
.petStat b{height:8px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px var(--line2)} .petStat i{display:block;height:100%;background:var(--magenta)} .petMenu input{font:15px var(--text);padding:6px}
.petCos{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;transform-origin:50% 85%}
.petCos .cosL,.nmDoll .cosL,.nmMini .cosL{position:absolute;left:0;top:0;width:100%;height:auto;pointer-events:none}
#pet .petCos .cosL:not([data-hp]){filter:none}
.hpRainbow{animation:hpHue 4s linear infinite} @keyframes hpHue{to{filter:hue-rotate(360deg)}}
.nmApp .nmXpTxt,.nmApp .nmCard .hint{font-size:clamp(14px,.95vw,17px)}.nmApp .nmXp{height:clamp(12px,.9vw,16px);min-width:220px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 2px var(--line2);margin:6px 0}.nmApp .nmXp i{display:block;height:100%;background:var(--pink)}
.nmApp .nmDress{display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap;margin-top:14px}
.nmApp .nmStage{position:sticky;top:10px;display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 14px;background:radial-gradient(circle at 50% 58%,rgba(var(--pkr),.22),transparent 68%),rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px var(--line2)}
.nmApp .nmDoll,.nmApp .nmMini{position:relative;line-height:0}.nmApp .nmDoll{width:clamp(200px,min(24vw,46vh),420px)}.nmApp [hidden]{display:none!important}.nmApp .nmMini{width:clamp(76px,5.6vw,110px)}
.nmApp .nmDoll>img:first-child,.nmApp .nmMini>img:first-child{width:100%;height:auto;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45))}
.nmApp .nmSide{flex:1;min-width:280px}.nmApp .nmTabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.nmApp .nmTab{all:unset;cursor:var(--cp,pointer);padding:6px 12px;font:clamp(13px,.9vw,16px) var(--text);color:var(--muted);box-shadow:inset 0 0 0 2px var(--line2)}.nmApp .nmTab.on,.nmApp .nmTab:hover{color:#fff;box-shadow:inset 0 0 0 2px var(--pink)}
.nmApp .nmWard{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(108px,8vw,150px),1fr));gap:clamp(8px,.7vw,12px)}
.nmApp .nmItem{all:unset;cursor:var(--cp,pointer);display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px;background:rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px var(--line2);font:clamp(13px,.9vw,15px) var(--text);color:var(--shell);text-align:center}
.nmApp .nmItem:hover{background:rgba(var(--pkr),.12)}.nmApp .nmItem.on{box-shadow:inset 0 0 0 2px var(--pink);color:#fff}
.nmApp .nmGames{margin-top:16px}.nmApp .nmGames{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(220px,18vw,300px),1fr));gap:12px}.nmApp .nmGames h3{grid-column:1/-1;margin:0}
.nmApp .nmGame1{display:flex;flex-direction:column;gap:6px;padding:12px 14px;background:rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px var(--line2)}.nmApp .nmGame1 small{color:var(--muted);font:clamp(12px,.85vw,14px) var(--text)}
.nmApp .nmGame1 button{align-self:flex-start;margin-top:auto}.nmApp .nmGame1.done{opacity:.75}
.nmApp .omGame{margin-top:14px;display:flex;flex-direction:column;gap:8px;width:min(100%,1200px)}.nmApp .omHead{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline}
.nmApp .omMoves{font:clamp(13px,.9vw,16px) var(--text);color:var(--shell)}.nmApp .omStage{position:relative;line-height:0;align-self:center;box-shadow:0 0 0 3px #3a2f52,0 0 30px rgba(0,0,0,.6)}
.nmApp .odGame .omStage{box-shadow:0 0 0 3px #16291f,0 0 30px rgba(0,0,0,.6)}.nmApp .omStage{max-width:100%}.nmApp .omStage canvas{display:block;width:100%;height:auto;image-rendering:pixelated;outline:none;cursor:var(--cp,pointer)}
.nmApp .omTools{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.nmApp .omStarsBig{font:clamp(26px,3vw,48px) var(--title);color:#ffd84a;letter-spacing:6px}
.nmApp .nmEnd{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:rgba(10,6,18,.8);line-height:1.4;text-align:center;padding:12px}.nmApp .nmEnd.on{display:flex}
.nmApp .nmItem.locked{cursor:default}.nmApp .nmItem.locked .nmMini{opacity:.4;filter:grayscale(.7)}.nmApp .nmItem small{color:var(--muted)}.nmApp h3{font:clamp(11px,.8vw,14px) var(--title);color:var(--lilac);margin:0 0 10px}`;
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, sfx, ask, newTab, pixIcon, PIX, WX } = host;  // (toast et showTab : ceux de la page, NeoMe les enveloppe comme avant)
  const folder = ctx.folder;
  const $ = id => document.getElementById(id);
  const W2 = new URLSearchParams(location.search).get('w2');  // une 2e fenêtre : pas de NeoMe dedans
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const __storeGet = async n => {
    let d = await doc(n);
    if (d == null) { try { d = await neo.storeGet(n); } catch { d = null; } if (d != null) await folder.write(n, d); }  // première ouverture : tu retrouves ton NeoMe d'avant
    return d;
  };
  const __storeSet = async (n, d) => { await folder.write(n, d); return true; };
  if (!document.getElementById('petStyle')) { const st = document.createElement('style'); st.id = 'petStyle'; st.textContent = PET_CSS; document.head.append(st); }
  view.innerHTML = HTML;
  const __imgs = {};  // les 25 images livrées avec le plugin
  const __b64 = {};
  await Promise.all(["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png"].map(async n => { const b = await neo.pluginFileRead(ctx.id, 'img/' + n); __b64[n] = b; __imgs[n] = URL.createObjectURL(new Blob([Uint8Array.from(atob(b), c => c.charCodeAt(0))], { type: 'image/png' })); }));
  // la barre des tâches (une autre fenêtre) reçoit les images dont elle a besoin
  neo.tbPetImgs?.(Object.fromEntries([1, 2, 3, 4, 8, 9, 10, 15, 17, 21, 22, 25].map(n => [n, 'data:image/png;base64,' + __b64[n + '.png']])));
  // ---- ton code d'origine ----
/* ---------- NeoMe, the pet of the home page: a little horned shadow with glowing eyes and headphones, in a broken egg shell.
   Its 25 expressions are pictures (web/pet/1..25.png, cut by tools/cut-neome.py); the motions are CSS animations on top (breathing,
   hops, trembling, dizzy sway, glitch...); it keeps the colours of its drawings.
   It lives: hunger, joy and energy go down with time (even while NeoDex is closed); it sleeps at night or when left alone, dances to
   NeoMusic, watches the search bar and the notifications, greets you when you come back home, and does small things by itself.
   You pet it (click), tickle it (double click), carry it (drag), shake the mouse over it, feed it and play ball with it (right click).
   Its state is the "pet" store (more-main.js), in the synced save: the same pet on every PC. ---------- */
const PETV = 4;  // the pictures' version: a new number when they are cut again, so no old copy is shown
// the expressions: picture number, motion, and what it can say
const NM = {
  idle: [1, 'breathe'], content: [2, 'hop'], love: [3, 'float'], sleep: [4, 'sleep'], surprised: [5, 'jolt'], confused: [6, 'tilt'], angry: [7, 'shake'],
  sad: [8, 'droop'], music: [9, 'dance'], wink: [10, 'hop'], amazed: [11, 'float'], dizzy: [12, 'dizzy'], laugh: [13, 'shake'], shy: [14, 'shy'], cool: [15, 'sway'],
  stressed: [16, 'tremble'], think: [17, 'tilt'], hug: [18, 'squish'], ko: [19, 'ko'], bug: [20, 'glitch'], bored: [21, 'droop'], curious: [22, 'lean'],
  joy: [23, 'bounce'], scared: [24, 'tremble'], hello: [25, 'hop'],
};
const petNew = () => ({name: 'NeoMe', born: Date.now(), xp: 0, food: 80, joy: 80, energy: 90, last: Date.now(), pos: null, hidden: false, pets: 0, meals: 0, ballBest: 0, inBar: false});
let pet = null, petBox = null, petImg = null, petCos = null, petSaveT = 0;
const petSt = {mode: 'idle', act: null, until: 0, sleeping: false, idleAt: Date.now(), nextIdle: Date.now() + 6000, hover: false, near: false, said: 0, ball: null, shake: [], lastDir: 0, combo: 0, lastPet: 0, dizzies: []};
const petLevel = xp => 1 + Math.floor(Math.sqrt(xp / 8));
console.assert(petLevel(0) === 1 && petLevel(8) === 2 && petLevel(32) === 3, 'petLevel');
const petClamp = v => Math.max(0, Math.min(100, v));
const petHour = () => petSt.hour ?? new Date().getHours();  // petSt.hour: a self-test can pretend it is day
const petNight = () => { const h = petHour(); return h >= 23 || h < 6; };
// time passing: about 10 h to get hungry, 13 h to get bored; energy comes back while it sleeps (or while you are away)
function petAge(now = Date.now()) {
  const min = Math.max(0, (now - pet.last) / 60000), away = min > 20;
  pet.food = petClamp(pet.food - min / 6); pet.joy = petClamp(pet.joy - min / 8);
  pet.energy = petClamp(pet.energy + (petSt.sleeping || away ? min / 2 : -min / 10));
  pet.last = now;
}
const petSave = () => { clearTimeout(petSaveT); petSaveT = setTimeout(() => __storeSet('pet', pet).catch(() => {}), 1500); };
function petXp(n) {
  const before = petLevel(pet.xp); pet.xp += n; petSave();
  const now = petLevel(pet.xp);
  if (now > before) { const got = COS.filter(c => c.lv > before && c.lv <= now); petAct('amazed', 2200); petSay('Niveau ' + now + ' !' + (got.length ? ' Nouveau : ' + got.map(c => c.name).join(', ') : '')); }
  nmRender();
}

/* ---------- showing an expression ---------- */
function petShowFace(name) {
  const [n, motion] = NM[name] || NM.idle;
  if (petImg.dataset.face !== name) { petImg.dataset.face = name; cosFace(n); }
  if (petImg.dataset.motion !== motion) { petImg.className = petCos.className = ''; void petImg.offsetWidth; petImg.className = 'nm-' + motion; petCos.className = 'petCos nm-' + motion; petImg.dataset.motion = motion; }  // restarts the motion (the cosmetics move with it)
  petSt.mode = name;
}
// an expression for a while, then back to the mood
function petAct(name, ms = 1500) { petSt.act = name; petSt.until = Date.now() + ms; petShowFace(name); }
const petMode = (m, ms) => m === 'sleep' ? (petSt.sleeping = true, petSt.act = null, petShowFace('sleep')) : m === 'idle' ? (petSt.act = null, petSt.until = 0, petShowFace('idle')) : petAct(m, ms);
const musicOn = () => (typeof pluginPlaying === 'function' && pluginPlaying());
// the mood when nothing special happens
function petMood() {
  if (petSt.sleeping) return 'sleep';
  if (musicOn()) return 'music';
  if (pet.food < 20) return 'sad';
  if (pet.joy < 20) return 'bored';
  if (petSt.hover) return 'shy';
  if (pet.energy < 15 || petNight()) return 'bored';
  if (petSt.near) return 'curious';
  return 'idle';
}
function petSay(text, ms = 3200) {
  const b = petBox.querySelector('.petBubble'); b.textContent = text; b.classList.add('on'); petSt.said = Date.now();
  clearTimeout(petSay.t); petSay.t = setTimeout(() => b.classList.remove('on'), ms);
}
function petWake() {
  if (!petSt.sleeping) return false;
  petSt.sleeping = false;
  if (petNight()) { petAct('angry', 1800); petSay('Mmh… il fait nuit…'); } else { petAct('content', 1500); petSay('Bien dormi !'); }
  return true;
}
const petActive = () => { petSt.idleAt = Date.now(); };
// the small things it does when nothing happens
function petIdle() {
  const tired = pet.energy < 40 || petNight();
  const list = [['wink', 1500, 3], ['cool', 2600, 2], ['confused', 2000, 2], ['curious', 2000, 2], ['amazed', 2000, 1], ['content', 1500, 2], ['think', 2600, 2],
    ['love', 2000, pet.joy > 80 ? 2 : 0], ['bored', 2400, tired ? 3 : 1], ['stressed', 1600, 1], ['bug', 900, .5], ['joy', 1400, pet.joy > 60 ? 1 : 0]];
  let n = Math.random() * list.reduce((s, x) => s + x[2], 0);
  for (const [name, ms, w] of list) { n -= w; if (n <= 0) { petAct(name, ms); if (name === 'bug') petSay('*bzzt*', 900); return; } }
}
function petTick() {
  if (!pet || pet.hidden || document.hidden || document.body.classList.contains('browsing')) return;
  const now = Date.now(), st = petSt, idle = now - st.idleAt;
  // falling asleep: left alone 4 min, at night after 1 min, or exhausted; waking up rested in the day
  if (!st.sleeping && !st.act && !st.ball && (idle > 240e3 || (petNight() && idle > 60e3) || pet.energy < 8)) { st.sleeping = true; petSay('Bonne nuit…', 2500); }
  if (st.sleeping && pet.energy >= 100 && !petNight()) petWake();
  if (st.act && now > st.until) st.act = null;
  // close to the mouse: it looks curious
  const r = petImg.getBoundingClientRect(), m = st.mouse;
  st.near = !!m && Math.hypot(m[0] - (r.left + r.width / 2), m[1] - (r.top + r.height / 2)) < 220;
  if (!st.act && !st.sleeping && !musicOn() && now > st.nextIdle) { petIdle(); st.nextIdle = now + 6000 + Math.random() * 8000; }
  if (!st.act && !st.sleeping && now - st.said > 90e3 && Math.random() < .02) {
    if (pet.food < 25) { petSay("J'ai faim… (clic droit : nourrir)"); petAct('sad', 2500); }
    else if (pet.joy < 25) { petSay('On joue ? (clic droit)'); petAct('bored', 2500); }
  }
  if (!st.act) petShowFace(petMood());
}
// every 30 s: time passes for its needs
function petLive() { if (!pet) return; petAge(); petSave(); }

/* ---------- what you do to it ---------- */
function petClick() {
  petActive(); if (petWake()) return;
  pet.joy = petClamp(pet.joy + 4); pet.pets++; petXp(1);
  petSt.combo = Date.now() - petSt.lastPet < 1500 ? petSt.combo + 1 : 1; petSt.lastPet = Date.now();
  if (petSt.combo >= 4) { petSt.combo = 0; petAct('love', 2000); petSay('♥ ♥ ♥', 1500); } else petAct(petSt.combo === 3 ? 'hug' : 'content', 1200);
  const n = pet.pets; if (n === 1 || n % 25 === 0) petSay(n === 1 ? 'Coucou ! Je suis ' + pet.name + ' !' : n + ' câlins ! ♥');
}
function petTickle() {
  petActive(); if (petWake()) return;
  pet.joy = petClamp(pet.joy + 6); petXp(2); petAct('laugh', 1600); petSay(['Hihihi !', 'Arrête, ça chatouille !', 'Hahaha !'][Math.random() * 3 | 0], 1500);
}
function petFeed() {
  petActive(); petWake();
  if (pet.food > 92) { petAct('bored', 1500); return petSay("J'ai plus faim !", 1800); }
  const c = el('div', 'petFood'); petBox.append(c);
  c.style.left = petImg.offsetWidth / 2 - 10 + 'px'; c.style.top = '-40px';
  petAct('surprised', 700);
  requestAnimationFrame(() => { c.style.top = petImg.offsetHeight * .45 + 'px'; });
  setTimeout(() => { c.remove(); pet.food = petClamp(pet.food + 30); pet.meals++; petXp(3); petAct('hug', 1600); petSay(['Miam !', 'Trop bon !', 'Merci !'][Math.random() * 3 | 0], 1800); setTimeout(() => petAct('joy', 1200), 1600); }, 650);
}
/* ---------- the ball game: you throw the ball (grab it and fling it, or click it), NeoMe runs after it and heads it back.
   Every save in a row is a combo; 3 balls on the floor and the game is over; the best combo is kept (pet.ballBest, synced).
   The ball lives on the home page only, between the tabs and the taskbar: opening a site, hiding NeoMe or Escape ends the game. ---------- */
function petBall() {
  petActive(); petWake(); if (petSt.ball) return;
  const b = el('div', 'petBall'), sh = el('div', 'petBallShadow'), r = petImg.getBoundingClientRect();
  document.body.append(sh, b);
  const s = petSt.ball = {el: b, sh, x: r.left + r.width / 2, y: r.top + 20, vx: 3 + Math.random() * 3, vy: -14, spin: 0, combo: 0, misses: 0, held: null, hitAt: 0, floorAt: 0, home: petBox.offsetLeft, squash: 0};
  petSay('Lance-moi la balle ! (attrape-la et jette-la)', 2600); petAct('amazed', 900);
  // the ground is where NeoMe sits (the bottom of its shell), wherever you put it; the ceiling is under the tabs
  const area = () => { const pr = petImg.getBoundingClientRect(); return {top: ($('tabstrip')?.getBoundingClientRect().bottom || 0) + 12, floor: Math.min(innerHeight - 14, pr.top + pr.height * .85 - 11), w: innerWidth}; };
  // grab it and throw it: the speed of the mouse when you let go
  b.onpointerdown = e => { e.stopPropagation(); e.preventDefault(); b.setPointerCapture(e.pointerId); s.held = {t: Date.now(), x: e.clientX, y: e.clientY, pts: [[e.clientX, e.clientY, Date.now()]]}; s.vx = s.vy = 0; };
  b.onpointermove = e => { if (!s.held) return; s.x = e.clientX; s.y = e.clientY; s.held.pts.push([e.clientX, e.clientY, Date.now()]); if (s.held.pts.length > 6) s.held.pts.shift(); };
  b.onpointerup = e => {
    if (!s.held) return; const p = s.held.pts, a = p[0], z = p[p.length - 1], dt = Math.max(16, z[2] - a[2]) / 16;
    if (Math.hypot(z[0] - s.held.x, z[1] - s.held.y) < 6) { s.vx = (Math.random() - .5) * 16; s.vy = -15 - Math.random() * 5; }  // a click: a kick up
    else { s.vx = Math.max(-30, Math.min(30, (z[0] - a[0]) / dt)); s.vy = Math.max(-32, Math.min(20, (z[1] - a[1]) / dt)); }
    s.held = null; s.thrown = true; petActive();
  };
  const key = e => { if (e.key === 'Escape') end('Partie finie.'); };
  s.end = end;
  addEventListener('keydown', key);
  // linger: the ball stays where it fell that many ms (still bouncing), then fades away
  function end(msg, linger = 0) {
    if (petSt.ball !== s || s.over) return;
    s.over = true; removeEventListener('keydown', key);
    const gone = () => { if (petSt.ball === s) petSt.ball = null; clearInterval(s.timer); b.remove(); sh.remove(); };
    if (linger) { setTimeout(() => { b.classList.add('fade'); sh.classList.add('fade'); setTimeout(gone, 500); }, linger); } else gone();
    petBox.style.transition = 'left .5s'; petBox.style.left = s.home + 'px'; setTimeout(() => { petBox.style.transition = ''; petShow(); }, 520);
    if (msg) petSay(msg, 3000);
  }
  const step = () => {
    if (petSt.ball !== s) return;
    if (document.body.classList.contains('browsing') || pet.hidden) { s.over = false; return end(''); }  // only on NeoDex's home page
    const A = area(), now = Date.now(), k = Math.min(4, (now - (s.last || now - 16)) / 16.7); s.last = now;  // k: frames of 60 Hz since the last step
    if (!s.held) {
      s.vy += .75 * k; s.x += s.vx * k; s.y += s.vy * k; s.vx *= .996 ** k; s.spin += s.vx * 2 * k;
      if (s.y < A.top) { s.y = A.top; s.vy = Math.abs(s.vy) * .6; }
      if (s.x < 12 || s.x > A.w - 12) { s.vx *= -.85; s.x = Math.max(12, Math.min(A.w - 12, s.x)); }
      if (s.y > A.floor) {  // on the floor: a bounce, and a ball NeoMe missed
        s.y = A.floor; s.squash = Math.min(.45, Math.abs(s.vy) / 30); s.vy *= -.62; s.vx *= .85;
        if (Math.abs(s.vy) < 2.5) s.vy = 0;
        if (s.thrown && !s.over && now - s.floorAt > 700 && now - s.hitAt > 300) {
          s.floorAt = now; s.misses++;
          if (s.combo >= 3) petSay('Combo de ' + s.combo + ' !', 1800);
          s.combo = 0; petAct(s.misses >= 3 ? 'sad' : 'confused', 1200);
          if (s.misses >= 3) {
            const best = Math.max(pet.ballBest || 0, s.best || 0), rec = (s.best || 0) > (pet.ballBest || 0);
            pet.ballBest = best; petSave(); if (rec) petAct('amazed', 2200);
            return end(rec ? 'Nouveau record : ' + best + ' de suite !' : 'Fin de la partie ! Record : ' + best, 3000);
          }
          petSay(['Raté !', 'Oups…', 'Encore une !'][s.misses - 1] || 'Raté !', 1400);
        }
      }
      s.squash *= .8;
      s.rest = !s.vy && Math.abs(s.vx) < .4 ? s.rest || now : 0;
      if (s.rest && now - s.rest > 3000 && !s.over) end(s.thrown ? 'Tu ne joues plus ? À plus tard !' : '', 1);  // left on the floor
    }
    // NeoMe runs under the ball, a little hop at each step (not once the game is lost)
    const pr = petImg.getBoundingClientRect(), pcx = pr.left + pr.width / 2, head = pr.top + pr.height * .3;
    if (!s.held && !s.over) {
      const want = Math.max(0, Math.min(A.w - pr.width, s.x - pr.width / 2 + s.vx * 6)), cur = petBox.offsetLeft, d = want - cur;
      if (Math.abs(d) > 4) { petBox.style.left = cur + Math.sign(d) * Math.min(Math.abs(d), 9 * k) + 'px'; petBox.style.bottom = petBox.style.bottom || ''; if (petSt.act !== 'joy' && petSt.act !== 'sad' && petSt.act !== 'confused') petAct('curious', 300); }
    }
    // the header: the ball falling on its head
    if (!s.held && !s.over && s.vy > 0 && Math.abs(s.x - pcx) < pr.width * .4 && s.y > head - 30 && s.y < head + 40 && now - s.hitAt > 350) {
      s.hitAt = now; s.combo++; s.best = Math.max(s.best || 0, s.combo);
      // sent back up; the more saves in a row, the wider it goes
      s.vy = -15 - Math.random() * 5; s.vx = Math.max(-14, Math.min(14, (A.w / 2 - s.x) / 200 + (Math.random() - .5) * (5 + s.combo * 1.2)));
      pet.joy = petClamp(pet.joy + 2); petXp(1); petAct('joy', 700);
      if (s.combo > 1) petSay('x' + s.combo + (s.combo > (pet.ballBest || 0) ? ' · record !' : ''), 900);
    }
    const sq = s.squash, sc = 1 - Math.min(1, (A.floor - s.y) / 600) * .5;
    b.style.transform = `translate(${s.x - 11}px, ${s.y - 11}px) rotate(${s.spin}deg) scale(${1 + sq}, ${1 - sq})`;
    sh.style.transform = `translate(${s.x - 12}px, ${A.floor + 8}px) scale(${sc})`; sh.style.opacity = .25 + sc * .35;
    b.classList.toggle('held', !!s.held);
  };
  s.timer = setInterval(step, 16);
}
function petMenu(x, y) {
  petActive();
  document.querySelector('.petMenu')?.remove();
  const m = el('div', 'petMenu px'), bar = (name, v) => { const r = el('div', 'petStat'), b = el('b'), g = el('i'); g.style.width = Math.round(v) + '%'; b.append(g); r.append(el('span', '', name), b); return r; };
  m.append(el('div', 'petTitle', pet.name + ' · niveau ' + petLevel(pet.xp)), bar('Ventre', pet.food), bar('Joie', pet.joy), bar('Énergie', pet.energy));
  const act = (label, f) => { const b = el('button', '', label); b.onclick = () => { m.remove(); f(); }; m.append(b); };
  act('Nourrir', petFeed); act('Jouer à la balle', petBall); act('Câlin', petClick);
  act(petSt.sleeping ? 'Réveiller' : 'Dormir', () => { if (!petWake()) { petSt.sleeping = true; petSt.act = null; petSay('Bonne nuit…', 2000); } });
  act('Renommer…', () => {
    const f = el('div', 'petMenu px'), i = Object.assign(el('input', 'f'), {value: pet.name, maxLength: 16}), ok = el('button', '', 'OK');
    const done = () => { const v = i.value.trim(); if (v) { pet.name = v; petSave(); petSay('Je m’appelle ' + v + ' !'); petAct('joy', 1200); } f.remove(); };
    ok.onclick = done; i.onkeydown = e => { if (e.key === 'Enter') done(); if (e.key === 'Escape') f.remove(); };
    f.append(el('div', 'petTitle', 'Son nom'), i, ok); Object.assign(f.style, {left: x + 'px', top: y + 'px'}); document.body.append(f); i.focus(); i.select();
  });
  act('Son niveau…', () => newTab('plugin:neodex.neome'));
  act('Mettre dans la barre des tâches', () => petToBar(true));
  act('Cacher (MENU pour le remettre)', () => { pet.hidden = true; petSave(); petShow(); });
  m.append(el('div', 'hint', `${pet.pets} câlins · ${pet.meals} repas · record à la balle : ${pet.ballBest || 0} · né le ${new Date(pet.born).toLocaleDateString('fr-FR')}`));
  document.body.append(m);
  Object.assign(m.style, {left: Math.min(x, innerWidth - m.offsetWidth - 8) + 'px', top: Math.max(8, Math.min(y, innerHeight - m.offsetHeight - 8)) + 'px'});
  setTimeout(() => addEventListener('pointerdown', function off(e) { if (!m.contains(e.target)) { m.remove(); removeEventListener('pointerdown', off, true); } }, true));
}
// NeoMe in the taskbar: it walks there, tiny (taskbar.js); the bar gets its mood
function petBarMood() {
  if (petSt.sleeping || (petNight() && Date.now() - petSt.idleAt > 60e3)) return 'sleep';
  if (musicOn()) return 'music';
  if (pet.food < 20) return 'sad';
  if (pet.joy < 20 || pet.energy < 15) return 'bored';
  return 'idle';
}
let petBarSent = '';
function petBarSync(force) {
  const d = {on: !!pet.inBar && !pet.hidden, mood: petBarMood()}, k = JSON.stringify(d);
  if (force || k !== petBarSent) { petBarSent = k; neo.tbPet(d); }
}
async function petToBar(on) {
  if (on && !(await neo.tbInfo().catch(() => ({}))).on) { toast("La barre des tâches n'est pas affichée (MENU > Barre des tâches)"); petAct('confused', 1500); return false; }
  pet.inBar = on; petSave(); petShow(); petBarSync(true);
  if (on) toast(pet.name + ' se balade dans la barre des tâches (double-clic dessus pour le faire revenir)');
  else { pet.pos = null; petShow(); petAct('hello', 2000); petSay('Me revoilà !'); }
  return true;
}
function petShow() {
  petBox.style.display = pet.hidden || pet.inBar ? 'none' : '';
  const p = pet.pos; if (p) Object.assign(petBox.style, {left: Math.round(p.x * innerWidth) + 'px', top: Math.round(p.y * innerHeight) + 'px', bottom: 'auto'});
}

/* ---------- setting up: the element, the pointer, the hooks into NeoDex ---------- */
async function petStart() {
  pet = {...petNew(), ...(await __storeGet('pet').catch(() => null) || {})};
  if (pet.name === 'Osu') pet.name = 'NeoMe';  // the first pet's name
  petAge();
  for (const [n] of Object.values(NM)) { new Image().src = __imgs[n + '.png']; }  // all the expressions ready: no blink when it changes face
  petBox = el('div'); petBox.id = 'pet';
  petImg = el('img'); petImg.alt = ''; petImg.draggable = false;
  petCos = el('div', 'petCos');
  petBox.append(el('div', 'petBubble'), petImg, petCos); document.body.append(petBox); cosWear();
  petShowFace('idle'); petShow();
  // click / double click / drag / right click
  let down = null, clickT = 0;
  petImg.onpointerdown = e => {
    if (e.button) return;
    const r = petBox.getBoundingClientRect(); down = {x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, drag: false};
    petImg.setPointerCapture(e.pointerId);
  };
  petImg.onpointermove = e => {
    if (!down) return;
    if (!down.drag && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) { down.drag = true; petWake(); petAct('scared', 864e5); petSay('Waaah !', 1200); }
    if (down.drag) { const low = e.clientY >= innerHeight - Math.max(30, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tbH')) || 0); petBox.classList.toggle('toBar', low); if (low && !down.said) { down.said = true; petSay('Lâche-moi dans la barre !', 1500); } }
    if (down.drag) Object.assign(petBox.style, {left: Math.max(0, Math.min(innerWidth - 120, e.clientX - down.dx)) + 'px', top: Math.max(0, Math.min(innerHeight - 140, e.clientY - down.dy)) + 'px', bottom: 'auto'});
  };
  petImg.onpointerup = e => {
    if (!down) return; const d = down; down = null; petActive(); petBox.classList.remove('toBar');
    if (d.drag && e.clientY >= innerHeight - Math.max(30, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tbH')) || 0)) { pet.pos = null; return petToBar(true); }
    if (d.drag) { const r = petBox.getBoundingClientRect(); pet.pos = {x: r.left / innerWidth, y: r.top / innerHeight}; petSave(); petAct('dizzy', 900); return; }
    if (clickT) { clearTimeout(clickT); clickT = 0; return petTickle(); }
    clickT = setTimeout(() => { clickT = 0; petClick(); }, 260);
  };
  petImg.oncontextmenu = e => { e.preventDefault(); petMenu(e.clientX, e.clientY); };
  petImg.onpointerenter = () => { petSt.hover = true; };
  petImg.onpointerleave = () => { petSt.hover = false; };
  // shaking the mouse hard over it: dizzy, and K.O. if it happens again soon
  addEventListener('pointermove', e => {
    petSt.mouse = [e.clientX, e.clientY];
    if (!petSt.hover || down) return;
    const dir = Math.sign(e.movementX), now = Date.now();
    if (dir && dir !== petSt.lastDir) { petSt.lastDir = dir; petSt.shake = petSt.shake.filter(t => now - t < 1200).concat(now); }
    if (petSt.shake.length >= 7 && petSt.act !== 'dizzy' && petSt.act !== 'ko') {
      petSt.shake = []; petWake(); petSt.dizzies = petSt.dizzies.filter(t => now - t < 15000).concat(now);
      if (petSt.dizzies.length >= 2) { petSt.dizzies = []; petAct('ko', 3500); petSay('K.O. …', 2500); } else { petAct('dizzy', 2600); petSay('La tête me tourne…', 2200); }
    }
  });
  // typing in the search bar: it thinks along
  $('search')?.addEventListener('input', () => { petActive(); if (!petSt.sleeping && petSt.act !== 'think') petAct('think', 2200); });
  // a notification: surprised (stressed if it is an error)
  if (typeof toast === 'function') { const real = toast; toast = function (msg, err) { real.apply(this, arguments); if (pet && !petSt.sleeping && !pet.hidden) petAct(err ? 'stressed' : 'surprised', 1400); }; }
  // coming back home after a while: hello!
  { const real = showTab; showTab = function (t) { const was = document.body.classList.contains('browsing'); real.apply(this, arguments);
    if (t) { if (!was) petSt.away = Date.now(); petSt.ball?.end(''); return; }
    if (was && petSt.away && Date.now() - petSt.away > 120e3 && pet && !pet.hidden) { petSt.away = 0; petWake(); petAct('hello', 2200); petSay(['Te revoilà !', 'Tu m’as manqué !', 'Coucou !'][Math.random() * 3 | 0]); petActive(); }
  }; }
  addEventListener('keydown', petActive); addEventListener('pointerdown', petActive);
  addEventListener('resize', () => petShow());
  // hello for the day
  setTimeout(() => { const h = petHour(); petAct('hello', 2200); petSay(h < 6 ? 'Encore debout ?' : h < 12 ? 'Bonjour !' : h < 18 ? 'Salut !' : 'Bonsoir !', 2500); }, 1200);
  setInterval(petTick, 250); setInterval(petLive, 30000);
  neo.onTbPetHome(() => petToBar(false));
  neo.onTbPetPoke(() => { pet.joy = petClamp(pet.joy + 2); pet.pets++; petXp(1); petActive(); });
  setInterval(() => pet.inBar && petBarSync(), 2000); petBarSync(true);
  addEventListener('beforeunload', () => { petAge(); __storeSet('pet', pet); });
}
const petToggle = () => { if (!pet) return; if (pet.inBar) return petToBar(false); pet.hidden = !pet.hidden; petSave(); petShow(); petBarSync(); toast(pet.hidden ? pet.name + ' se cache' : pet.name + ' est de retour !'); if (!pet.hidden) { petSay('Me revoilà !'); petAct('hello', 2000); } };
/* ---------- the wardrobe: cosmetics (img/cos), unlocked by level, worn on the home page ---------- */
// each one is a 320 x 330 layer drawn over his picture 1, so it sits exactly on his head; head things follow the head, shells and
// neck things the body (offsets per picture, in img/cos/items.json: offsets, body). A shell also gets, on the pictures whose shell rim is
// drawn higher, a small patch that covers that rim (img/cos/coq). Coloured headphones: only the magenta of his own (img/hp, one per picture), recoloured.
const COS_SLOTS = {aura: 'Auras'};
const COS_ORDER = [];  // drawn from back to front (layers from img/cos/items.json; none since the hats left)
const COS_HEAD = new Set(['tete']);
// the auras: a halo of one colour (glow), or of colours it goes through (a list, one round in ms); pulse: the halo breathes; two: a second, wider ring
const COS_CODE = [
  {id: 'aura_menthe', name: 'Aura menthe', lv: 2, glow: '#5cffb0'},
  {id: 'aura_lilas', name: 'Aura lilas', lv: 3, glow: '#b98cff', pulse: 1},
  {id: 'aura_braise', name: 'Aura braise', lv: 4, glow: ['#ff7a1a', '#ff2a1a'], pulse: 1, ms: 1400},
  {id: 'aura_ocean', name: 'Aura océan', lv: 5, glow: ['#2f8bff', '#21d4fd'], ms: 4000},
  {id: 'aura_rose', name: 'Aura rose', lv: 6, glow: '#ff4fa8'},
  {id: 'aura_lucioles', name: 'Aura lucioles', lv: 7, glow: ['#d8ff5c', '#7dff6a'], pulse: 1, ms: 2200},
  {id: 'aura_nuit', name: 'Aura de minuit', lv: 8, glow: '#3b2bff', two: '#8a2bff'},
  {id: 'aura_fantome', name: 'Aura fantôme', lv: 9, glow: '#ffffff', pulse: 1, ms: 3200},
  {id: 'aura_glace', name: 'Aura glacée', lv: 10, glow: '#5ec8ff', two: '#e6fbff'},
  {id: 'aura_toxique', name: 'Aura toxique', lv: 11, glow: ['#9dff1a', '#2bff88'], pulse: 1, ms: 1800},
  {id: 'aura_soleil', name: 'Aura coucher de soleil', lv: 12, glow: ['#ff4fa8', '#ff9a3c', '#ffd84a'], ms: 5000},
  {id: 'aura_or', name: 'Aura dorée', lv: 13, glow: '#ffd84a', two: '#ff9a3c'},
  {id: 'aura_sakura', name: 'Aura sakura', lv: 14, glow: ['#ffb7d5', '#ff6fae'], pulse: 1, ms: 2600},
  {id: 'aura_orage', name: 'Aura d’orage', lv: 15, glow: ['#5ec8ff', '#5ec8ff', '#ffffff', '#5ec8ff'], ms: 900, two: '#2a4bff'},
  {id: 'aura_arc', name: 'Aura arc-en-ciel', lv: 16, glow: ['#ff4fa8', '#5ec8ff', '#ffd84a'], ms: 3000},
  {id: 'aura_galaxie', name: 'Aura galaxie', lv: 18, glow: ['#7b2bff', '#ff4fa8', '#21d4fd'], pulse: 1, ms: 4200, two: '#2a0f5c'},
  {id: 'aura_neon', name: 'Aura double néon', lv: 20, glow: ['#ff2bd6', '#21d4fd'], ms: 2000, two: '#21d4fd'},
].map(a => ({...a, slot: 'aura'}));
// img/cos/items.json: layers drawn over his picture (none for now) and, per picture, where his head is (offsets)
let COS = [], COS_OFF = {}, COS_BODY = {}, COQ = {};
const cosUrl = {};
const blobUrl = async p => URL.createObjectURL(new Blob([Uint8Array.from(atob(await neo.pluginFileRead(ctx.id, p)), ch => ch.charCodeAt(0))], {type: 'image/png'}));
async function cosLoad() {
  const meta = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(await neo.pluginFileRead(ctx.id, 'img/cos/items.json')), ch => ch.charCodeAt(0))));
  COS_OFF = meta.offsets || {}; COS_BODY = meta.body || {}; COQ = meta.coq || {};
  COS = [...meta.items, ...COS_CODE].sort((a, b) => a.lv - b.lv);
  await Promise.all(meta.items.map(async c => { cosUrl[c.id] = await blobUrl('img/cos/' + c.id + '.png'); }));
}
const cosOn = () => (pet.wear && typeof pet.wear === 'object') ? pet.wear : (pet.wear = {});
const cosOk = c => !!c && petLevel(pet.xp) >= c.lv;
const cosWorn = () => Object.fromEntries(Object.entries(cosOn()).filter(([, id]) => cosOk(COS.find(o => o.id === id))));
const auraFilter = (c, r, two) => `drop-shadow(0 0 ${r}px ${c})` + (two ? ` drop-shadow(0 0 ${r + 8}px ${two})` : '') + ' drop-shadow(0 6px 6px rgba(0,0,0,.45))';
function auraOn(img, a) {  // puts the aura on a picture of NeoMe, animated when it changes colour or breathes
  img.getAnimations().forEach(x => x.id === 'aura' && x.cancel());
  const cols = a ? [].concat(a.glow) : []; img.style.filter = a ? auraFilter(cols[0], 9, a.two) : '';
  if (!a || (cols.length < 2 && !a.pulse)) return;
  const ks = (cols.length > 1 ? [...cols, cols[0]] : [cols[0], cols[0], cols[0]]).map((c, i) => ({filter: auraFilter(c, a.pulse && i % 2 ? 17 : 9, a.two)}));
  Object.assign(img.animate(ks, {duration: a.ms || 3000, iterations: Infinity}), {id: 'aura'});
}
// an outfit: the base picture and the layers on top; face: which of the 25 pictures
const cosAt = (i, [dx, dy], bb = [0, 0, 320, 330]) => Object.assign(i.style, {left: (bb[0] + dx) / 3.2 + '%', top: (bb[1] + dy) / 3.3 + '%', width: (bb[2] - bb[0]) / 3.2 + '%'});
// the patch of a shell for this picture (loaded the first time it is needed)
const coqUrl = {};
async function coqPatch(i, id, face) {
  const bb = COQ[id]?.[face]; i.hidden = !bb; if (!bb) return;
  const k = id + '@' + face; coqUrl[k] ??= blobUrl('img/cos/coq/' + k + '.png');
  i.src = await coqUrl[k]; cosAt(i, COS_BODY[face] || [0, 0], bb);
}
function cosLayers(box, base, wear, face = 1) {
  box.querySelectorAll('.cosL').forEach(n => n.remove());
  base.src = __imgs[face + '.png'];
  for (const slot of COS_ORDER) {
    const c = COS.find(o => o.id === wear[slot]); if (!c) continue;
    const src = cosUrl[c.id]; if (!src) continue;
    const i = el('img', 'cosL'); i.src = src; i.alt = '';
    if (COS_HEAD.has(slot)) { i.dataset.head = 1; cosAt(i, COS_OFF[face] || [0, 0]); }
    else { i.dataset.body = 1; cosAt(i, COS_BODY[face] || [0, 0]); }
    box.append(i);
    if (slot === 'coquille' && COQ[c.id]) { const p = el('img', 'cosL'); p.alt = ''; p.dataset.coq = c.id; box.append(p); coqPatch(p, c.id, face); }
  }
}
function cosFace(n) {  // the pet changes face: its base picture, its headphones, what sits on its head and its shell follow
  petImg.src = __imgs[n + '.png'];
  petCos.querySelectorAll('.cosL[data-head]').forEach(i => cosAt(i, COS_OFF[n] || [0, 0]));
  petCos.querySelectorAll('.cosL[data-body]').forEach(i => cosAt(i, COS_BODY[n] || [0, 0]));
  petCos.querySelectorAll('.cosL[data-coq]').forEach(i => coqPatch(i, i.dataset.coq, n));
}
// the taskbar (another window) gets NeoMe's pictures with his outfit drawn in
const TB_FACES = [1, 2, 3, 4, 8, 9, 10, 15, 17, 21, 22, 25];
const imgOf = src => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
async function cosBarImgs() {
  if (!neo.tbPetImgs) return;
  const wear = cosWorn(), a = COS.find(o => o.id === wear.aura), out = {};
  for (const n of TB_FACES) {
    const cv = document.createElement('canvas'); cv.width = 320; cv.height = 330; const g = cv.getContext('2d');
    g.filter = a ? auraFilter([].concat(a.glow)[0], 9, a.two) : 'none'; g.drawImage(await imgOf(__imgs[n + '.png']), 0, 0); g.filter = 'none';
    for (const slot of COS_ORDER) {
      const c = COS.find(o => o.id === wear[slot]); if (!c) continue;
      const src = cosUrl[c.id]; if (!src) continue;
      const [dx, dy] = (COS_HEAD.has(slot) ? COS_OFF : COS_BODY)[n] || [0, 0];
      g.drawImage(await imgOf(src), dx, dy);
      const bb = slot === 'coquille' && COQ[c.id]?.[n];
      if (bb) { const k = c.id + '@' + n; coqUrl[k] ??= blobUrl('img/cos/coq/' + k + '.png'); g.drawImage(await imgOf(await coqUrl[k]), bb[0] + dx, bb[1] + dy); }
    }
    out[n] = cv.toDataURL('image/png');
  }
  neo.tbPetImgs(out);
}
function cosWear() {
  if (!petCos || !pet) return;
  cosBarImgs().catch(e => console.error('NeoMe, barre des tâches :', e));
  const wear = cosWorn(), a = COS.find(o => o.id === wear.aura);
  cosLayers(petCos, petImg, wear, (NM[petSt.mode] || NM.idle)[0]);
  auraOn(petImg, a);
}
function cosToggle(c) {
  if (!cosOk(c)) return;
  const on = cosOn(); on[c.slot] = on[c.slot] === c.id ? '' : c.id;
  petSave(); cosWear(); nmRender();
  if (on[c.slot]) { petAct('cool', 1800); petSay(['Trop classe !', 'Ça me va bien ?', 'Stylé !', 'J’adore !'][Math.random() * 4 | 0], 1800); }
}

/* ombre:logic — Pas d'ombre : NeoMe ne peut se tenir que dans l'ombre. Règles pures (testées par node), partagées par le jeu et le solveur.
   Carte : # mur · . sol · P NeoMe · E coquille (sortie) · B caisse · M lampe qu'on pousse · L lampe fixe · ^ > v < projecteur qui tourne d'un quart à chaque pas
   · o lampe qui s'éteint tant qu'une dalle _ est enfoncée (par NeoMe, une caisse ou une lampe) · _ dalle */
const OM_DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
function omParse(rows) {
  const lv = {w: rows[0].length, h: rows.length, wall: new Set(), lamps: [], spots: [], offs: [], plates: [], exit: null}, st = {x: 0, y: 0, crates: [], mov: [], t: 0};
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    const k = x + y * lv.w;
    if (c === '#') lv.wall.add(k); else if (c === 'P') { st.x = x; st.y = y; } else if (c === 'E') lv.exit = k; else if (c === 'B') st.crates.push(k);
    else if (c === 'M') st.mov.push(k); else if (c === 'L') lv.lamps.push(k); else if (c === 'o') lv.offs.push(k); else if (c === '_') lv.plates.push(k);
    else if ('^>v<'.includes(c)) lv.spots.push({k, d: '^>v<'.indexOf(c)});
  }));
  return {lv, st};
}
const omSolid = (lv, st, k) => lv.wall.has(k) || lv.lamps.includes(k) || lv.offs.includes(k) || lv.spots.some(s => s.k === k) || st.crates.includes(k) || st.mov.includes(k);
const omPressed = (lv, st) => lv.plates.some(p => p === st.x + st.y * lv.w || st.crates.includes(p) || st.mov.includes(p));
// the light sources this turn: [cell, radius, cone direction or -1]
function omSources(lv, st) {
  const out = [...lv.lamps, ...st.mov].map(k => [k, 2.5, -1]);
  if (!omPressed(lv, st)) for (const k of lv.offs) out.push([k, 2.5, -1]);
  for (const s of lv.spots) out.push([s.k, 4.5, (s.d + st.t) % 4]);
  return out;
}
// how lit each cell is (0 = shadow), sampled at `sub` points per cell side for the drawing; the rules only use the centre (sub = 1)
function omLight(lv, st, sub = 1) {
  const W = lv.w * sub, out = new Float32Array(W * lv.h * sub);
  for (const [k, rad, dir] of omSources(lv, st)) {
    const lx = k % lv.w + .5, ly = (k / lv.w | 0) + .5, me = st.x + st.y * lv.w, solidOther = c => c !== k && c !== me && omSolid(lv, st, c);
    for (let sy = 0; sy < lv.h * sub; sy++) for (let sx = 0; sx < W; sx++) {
      const px = (sx + .5) / sub, py = (sy + .5) / sub, dx = px - lx, dy = py - ly, d = Math.hypot(dx, dy);
      if (d > rad) continue;
      if (dir >= 0 && d > .4) { const [ux, uy] = OM_DIRS[dir]; if ((dx * ux + dy * uy) / d < Math.SQRT1_2 - 1e-6) continue; }
      let blocked = false;
      for (let s = .35; s < d - .05 && !blocked; s += .2) { const c = Math.floor(lx + dx / d * s) + Math.floor(ly + dy / d * s) * lv.w; if (solidOther(c) && c !== Math.floor(px) + Math.floor(py) * lv.w) blocked = true; }
      if (!blocked) { const i = sx + sy * W; out[i] = Math.max(out[i], 1 - (d / rad) ** 2 * .55); }
    }
  }
  return out;
}
// is the centre of cell k lit (the rules: only NeoMe's cell matters, so only it is checked)
function omLit(lv, st, k) {
  const px = k % lv.w + .5, py = (k / lv.w | 0) + .5, me = st.x + st.y * lv.w;
  for (const [s, rad, dir] of omSources(lv, st)) {
    const lx = s % lv.w + .5, ly = (s / lv.w | 0) + .5, dx = px - lx, dy = py - ly, d = Math.hypot(dx, dy);
    if (d > rad || s === k) continue;
    if (dir >= 0 && d > .4) { const [ux, uy] = OM_DIRS[dir]; if ((dx * ux + dy * uy) / d < Math.SQRT1_2 - 1e-6) continue; }
    let blocked = false;
    for (let t = .35; t < d - .05 && !blocked; t += .2) { const c = Math.floor(lx + dx / d * t) + Math.floor(ly + dy / d * t) * lv.w; if (c !== s && c !== k && c !== me && omSolid(lv, st, c)) blocked = true; }
    if (!blocked) return true;
  }
  return false;
}
// one move (dir 0..3, or -1 to wait): the new state, or null + why
function omStep(lv, st, dir) {
  const n = {x: st.x, y: st.y, crates: [...st.crates], mov: [...st.mov], t: st.t + 1};
  if (dir >= 0) {
    const [dx, dy] = OM_DIRS[dir], nx = st.x + dx, ny = st.y + dy, k = nx + ny * lv.w;
    if (nx < 0 || ny < 0 || nx >= lv.w || ny >= lv.h) return [null, 'mur'];
    const box = n.crates.indexOf(k), lamp = n.mov.indexOf(k);
    if (box >= 0 || lamp >= 0) {
      const bx = nx + dx, by = ny + dy, b = bx + by * lv.w;
      if (bx < 0 || by < 0 || bx >= lv.w || by >= lv.h || omSolid(lv, n, b) || b === lv.exit) return [null, 'bloqué'];
      if (box >= 0) n.crates[box] = b; else n.mov[lamp] = b;
    } else if (omSolid(lv, n, k)) return [null, 'mur'];
    n.x = nx; n.y = ny;
  } else if (!lv.spots.length) return [null, 'rien'];
  if (omLit(lv, n, n.x + n.y * lv.w)) return [null, 'lumière'];
  return [n, ''];
}
const omWon = (lv, st) => st.x + st.y * lv.w === lv.exit;
const omKey = (lv, st) => st.x + st.y * lv.w + '|' + [...st.crates].sort((a, b) => a - b) + '|' + [...st.mov].sort((a, b) => a - b) + '|' + (lv.spots.length ? st.t % 4 : 0);
// shortest solution (moves), or null; limit = states explored at most
function omSolve(lv, st0, limit = 200000, noPush = false) {
  const seen = new Set([omKey(lv, st0)]); let q = [[st0, []]];
  while (q.length && seen.size < limit) {
    const nq = [];
    for (const [st, path] of q) for (const d of [0, 1, 2, 3, -1]) {
      const [n] = omStep(lv, st, d); if (!n) continue;
      if (noPush && (n.crates.join() !== st.crates.join() || n.mov.join() !== st.mov.join())) continue;
      const key = omKey(lv, n); if (seen.has(key)) continue; seen.add(key);
      const p = [...path, d]; if (omWon(lv, n)) return p; nq.push([n, p]);
    }
    q = nq;
  }
  return null;
}
/* /ombre:logic */
// the 24 levels (found by tools/ombre, checked solvable and not solvable without pushing; par = fewest steps)
const OM_LEVELS = /*OM_LEVELS*/[
  {name: "Premiers pas", par: 14, rows: ["#############","#P..........#","#.....L.....#","#...........#","#...#####...#","#..........E#","#############"]},
  {name: "La caisse", par: 11, rows: ["#########","#..P..L.#","#..#..#.#","#.#..#E.#","#....B..#","#########"]},
  {name: "Le paravent", par: 14, rows: ["#########","#..P....#","#.##E...#","#.B.....#","#....L..#","#########"]},
  {name: "Deux caisses", par: 24, rows: ["###########","#...#P..L.#","#...B.....#","#....E....#","#.......B.#","#...L.....#","###########"]},
  {name: "Coin sombre", par: 29, rows: ["###########","#.L...#...#","#.........#","#.#E#.B#..#","#.B.......#","#...P...L.#","###########"]},
  {name: "Le couloir", par: 38, rows: ["###########","#......L..#","#.B....#.E#","#.#..B....#","#....P##..#","#.L.......#","###########"]},
  {name: "Bois et lumière", par: 43, rows: ["###########","#......B.P#","#...##....#","##B.......#","#....E...L#","#..#...L..#","###########"]},
  {name: "Le grenier", par: 47, rows: ["###########","#....#....#","#.........#","#....P.#..#","#....E.B.B#","#.LL...#..#","###########"]},
  {name: "La lanterne", par: 14, rows: ["###########","#.L.L..E..#","#......#..#","#.........#","#..BP.....#","#........M#","###########"]},
  {name: "Pousse la lumière", par: 23, rows: ["###########","#....LM...#","#.B#.L....#","#..E......#","#......P..#","#.........#","###########"]},
  {name: "Lanternes en balade", par: 28, rows: ["###########","#...#.#...#","#..B......#","#..E......#","#.........#","#P..L.L..M#","###########"]},
  {name: "La ronde", par: 50, rows: ["############","#..L.......#","#M....P#.#B#","#.....#.#..#","#.....B....#","#..E.####..#","#M.........#","############"]},
  {name: "Le veilleur", par: 56, rows: ["############","#....M.....#","#........B##","#M.........#","#L.......#.#","#..E.##...B#","#.......#.P#","############"]},
  {name: "La dalle", par: 15, rows: ["###########","#P#.B.....#","#.........#","#.......#.#","#....L....#","#L._o...E.#","###########"]},
  {name: "Clic, plus de lampe", par: 26, rows: ["###########","#.o.L.....#","#.......#P#","#.E.......#","#.B....._.#","#........L#","###########"]},
  {name: "Le poids d’une caisse", par: 35, rows: ["###########","#o.#P..._L#","#.E.#.....#","#...#....L#","#....B....#","#...#.....#","###########"]},
  {name: "Interrupteur", par: 46, rows: ["###########","#P.....L.L#","#.........#","##.#....o.#","##B#......#","#......_.E#","###########"]},
  {name: "Le projecteur", par: 10, rows: ["###########","#.........#","#.........#","#.........#","#.L....E.B#","#....v...P#","###########"]},
  {name: "Un quart de tour", par: 24, rows: ["#########","#.......#","#...B#..#","#.....P.#","#.Ev....#","#########"]},
  {name: "Le phare", par: 31, rows: ["###########","#.........#","#.......E.#","#.#...^...#","#..BP..L..#","#...#.....#","###########"]},
  {name: "Attendre son tour", par: 53, rows: ["###########","#L......#.#","#....#....#","#..P....#.#","#E#...#B#.#","#....>....#","###########"]},
  {name: "Tout à la fois", par: 38, rows: ["############","#....P..#..#","#....#...B.#","#....E....B#","#v.........#","#..Mo......#","#.....L_...#","############"]},
  {name: "La grande nuit", par: 50, rows: ["############","#..........#","#o.M.....#.#","#_.....##..#","#.<.#....BP#","#E.....B.#.#","#.#......L.#","############"]},
  {name: "Minuit", par: 59, rows: ["############","#..M>.....##","#o...._....#","#...L..#.#.#","#E........B#","#......B...#","#....P..#..#","############"]}];
/* ---------- « Pas d'ombre », the first game of the day: NeoMe is a shadow and can only stand where no light falls. Push the crates and
   the lanterns to cast shadow lanes, step on plates to put lamps out, wait for the spotlights to turn, and reach his egg shell.
   One new level a day (the next of the 24, then levels of the day), a little XP for it; the rules are the om* functions above. ---------- */
const OM_T = 32;  // a tile, in canvas pixels (drawn 2x2 per art pixel)
let omArt = null;
async function omLoad() {
  if (omArt) return omArt;
  const walk = {};
  for (const d of ['bas', 'haut', 'gauche', 'droite']) for (const p of ['repos', 'mi1', 'pas1', 'mi2', 'pas2']) walk[d + '_' + p] = await imgOf(await blobUrl('img/jeu/' + d + '_' + p + '.png'));
  const tile = f => { const c = document.createElement('canvas'); c.width = c.height = OM_T; const g = c.getContext('2d'); f(g, (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x * 2, y * 2, w * 2, h * 2); }); return c; };
  // the floor: dark planks, four variants so the room does not look tiled
  const floor = [0, 1, 2, 3].map(v => tile((g, p) => {
    p(0, 0, 16, 16, ['#56445e', '#594661', '#53425b', '#57455d'][v]);
    for (let r = 0; r < 4; r++) { p(0, r * 4, 16, 1, '#5a4862'); p(0, r * 4 + 3, 16, 1, '#2e2236'); p((r * 5 + v * 3) % 14 + 1, r * 4 + 1, 1, 2, '#1f1829'); }
    p((v * 7) % 12 + 2, 1 + (v % 3) * 4, 3, 1, '#3c2e44'); if (v === 2) { p(4, 9, 1, 1, '#6a5874'); p(11, 5, 1, 1, '#6a5874'); }
  }));
  // the wall: stones seen from above, with a darker front face when the floor is below it
  const wallTop = tile((g, p) => {
    p(0, 0, 16, 16, '#3a2f52'); for (const [x, y, w] of [[0, 0, 7], [8, 0, 8], [0, 5, 4], [5, 5, 7], [13, 5, 3], [0, 10, 9], [10, 10, 6]]) { p(x, y, w, 4, '#43375e'); p(x, y, w, 1, '#544672'); p(x, y + 4, w, 1, '#2a2140'); }
  });
  const wallFace = tile((g, p) => { p(0, 0, 16, 16, '#2a2140'); for (let x = 0; x < 16; x += 5) p(x, 0, 1, 16, '#221a35'); p(0, 7, 16, 1, '#221a35'); p(0, 15, 16, 1, '#160f24'); });
  const crate = tile((g, p) => {
    p(1, 1, 14, 14, '#6b4423'); p(1, 1, 14, 1, '#8a5a2f'); p(1, 14, 14, 1, '#3d2410'); p(1, 1, 1, 14, '#7d5029'); p(14, 1, 1, 14, '#4a2c14');
    p(2, 2, 12, 12, '#7a4f29'); for (let i = 0; i < 12; i++) { p(2 + i, 2 + i, 1, 1, '#4a2c14'); p(13 - i, 2 + i, 1, 1, '#4a2c14'); }
    p(2, 7, 12, 2, '#5c3a1b'); p(2, 7, 12, 1, '#8a5a2f'); p(3, 3, 1, 1, '#b8b0c8'); p(12, 3, 1, 1, '#b8b0c8'); p(3, 12, 1, 1, '#b8b0c8'); p(12, 12, 1, 1, '#b8b0c8');
  });
  const lamp = (shade, rim) => tile((g, p) => {
    p(5, 13, 6, 2, '#1a1424'); p(7, 7, 2, 7, '#5a5068'); p(6, 13, 4, 1, '#7a6f8a');
    p(4, 3, 8, 4, shade); p(3, 6, 10, 1, rim); p(5, 2, 6, 1, rim); p(6, 4, 4, 1, '#fff4d6');
  });
  const lampOn = lamp('#ffd27a', '#c89a3a'), lampCyan = lamp('#7ce8ff', '#2f9ab8'), lampOff = lamp('#3d4a5a', '#28323e');
  const lantern = tile((g, p) => {
    p(4, 13, 8, 2, '#1a1424'); p(5, 4, 6, 9, '#3a2c20'); p(6, 5, 4, 7, '#ffcf6a'); p(7, 6, 2, 3, '#fff6d8'); p(5, 3, 6, 1, '#5a4430'); p(6, 1, 4, 1, '#7a6040'); p(6, 1, 1, 2, '#7a6040'); p(9, 1, 1, 2, '#7a6040');
    p(5, 12, 6, 1, '#5a4430'); p(4, 14, 2, 1, '#7a6f8a'); p(10, 14, 2, 1, '#7a6f8a');
  });
  const spot = tile((g, p) => { p(4, 11, 8, 4, '#2a2238'); p(5, 11, 6, 1, '#4a3f5c'); p(7, 7, 2, 4, '#5a5068'); });
  const spotHead = tile((g, p) => { p(5, 3, 6, 6, '#5a3a3a'); p(6, 1, 4, 2, '#ff9a6a'); p(7, 1, 2, 1, '#fff0d0'); p(5, 8, 6, 1, '#3a2424'); });  // pointing up, turned when drawn
  const plate = on => tile((g, p) => { p(2, 2, 12, 12, '#2f9ab8'); p(3, 3, 10, 10, on ? '#1f3440' : '#3e5868'); p(3, 3, 10, 1, on ? '#162630' : '#5a7a8c'); p(7, 7, 2, 2, on ? '#7ce8ff' : '#2f9ab8'); });
  const shell = tile((g, p) => {
    p(3, 12, 10, 2, '#1a1424'); p(2, 8, 12, 5, '#efe2ff'); p(3, 12, 10, 1, '#c8b0e8'); p(2, 8, 1, 4, '#d8c4f4'); p(13, 8, 1, 4, '#c8b0e8');
    for (let x = 2; x < 14; x += 2) p(x, x % 4 ? 6 : 7, 2, x % 4 ? 2 : 1, '#efe2ff');
    p(4, 9, 3, 3, '#e04fd0'); p(9, 10, 3, 2, '#e04fd0'); p(5, 9, 1, 1, '#ff9af0'); p(10, 10, 1, 1, '#ff9af0');
  });
  return omArt = {walk, floor, wallTop, wallFace, crate, lampOn, lampCyan, lampOff, lantern, spot, spotHead, plateUp: plate(false), plateDown: plate(true), shell};
}
// today as 2026-11-16, without toLocaleDateString: in English NeoDex turns French date formats into English ones
const omToday = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
// the level of the day: the next of the campaign; when it is finished, the same level again
const omStars = (moves, par) => moves <= par ? 3 : moves <= Math.ceil(par * 1.4) ? 2 : 1;
function omDraw(g, lv, st, art, light, t, anim) {
  const T = OM_T, W = lv.w, H = lv.h;
  g.imageSmoothingEnabled = false;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = x + y * W;
    if (lv.wall.has(k)) g.drawImage(lv.wall.has(k + W) || y === H - 1 ? art.wallTop : art.wallFace, x * T, y * T);
    else g.drawImage(art.floor[(x * 7 + y * 13) % 4], x * T, y * T);
  }
  const press = omPressed(lv, st), at = k => [k % W * T, (k / W | 0) * T];
  for (const k of lv.plates) g.drawImage(press ? art.plateDown : art.plateUp, ...at(k));
  const pulse = .5 + Math.sin(t * 3) * .5;
  { const [x, y] = at(lv.exit); g.globalAlpha = .25 + pulse * .25; g.fillStyle = '#ff9af0'; g.fillRect(x + 4, y + 18, 24, 10); g.globalAlpha = 1; g.drawImage(art.shell, x, y); }
  for (const k of lv.lamps) g.drawImage(art.lampOn, ...at(k));
  for (const k of lv.offs) g.drawImage(press ? art.lampOff : art.lampCyan, ...at(k));
  for (const s of lv.spots) {
    const [x, y] = at(s.k), a = ((s.d + st.t) % 4 - (anim?.spin || 0)) * Math.PI / 2;
    g.drawImage(art.spot, x, y); g.save(); g.translate(x + T / 2, y + T / 2 - 4); g.rotate(a); g.drawImage(art.spotHead, -T / 2, -T / 2); g.restore();
  }
  const slide = (k, from) => { const [x, y] = at(k); if (anim && anim.p < 1 && from != null && from !== k) { const [fx, fy] = at(from); return [fx + (x - fx) * anim.p, fy + (y - fy) * anim.p]; } return [x, y]; };
  st.crates.forEach((k, i) => g.drawImage(art.crate, ...slide(k, anim?.prev?.crates[i])));
  st.mov.forEach((k, i) => g.drawImage(art.lantern, ...slide(k, anim?.prev?.mov[i])));
  // the light: brightness per 4 px (8 per tile), warm where lit, deep blue night elsewhere
  const sub = 8, sz = T / sub;
  for (let sy = 0; sy < H * sub; sy++) for (let sx = 0; sx < W * sub; sx++) {
    const l = light[sx + sy * W * sub];
    g.fillStyle = l > 0 ? `rgba(255,190,100,${(.06 + l * .3).toFixed(3)})` : 'rgba(10,6,32,.5)';
    g.fillRect(sx * sz, sy * sz, sz, sz);
    // the edge of the light, so you see at a glance where NeoMe may go
    if (l > 0 && (!light[sx - 1 + sy * W * sub] || !light[sx + 1 + sy * W * sub] || !light[sx + (sy - 1) * W * sub] || !light[sx + (sy + 1) * W * sub])) { g.fillStyle = 'rgba(255,214,140,.22)'; g.fillRect(sx * sz, sy * sz, sz, sz); }
  }
  g.globalCompositeOperation = 'lighter';
  for (const [k, , dir] of omSources(lv, st)) { if (dir >= 0) continue; const [x, y] = at(k), cx = x + T / 2, cy = y + T / 2 - 4, r = T * (1.1 + Math.sin(t * 7 + k) * .04), gr = g.createRadialGradient(cx, cy, 2, cx, cy, r);
    gr.addColorStop(0, 'rgba(255,220,150,.55)'); gr.addColorStop(1, 'rgba(255,180,80,0)'); g.fillStyle = gr; g.fillRect(cx - r, cy - r, r * 2, r * 2); }
  g.globalCompositeOperation = 'source-over';
  // NeoMe on top: his walking sprite, half size, sliding from tile to tile
  const me = st.x + st.y * W, [mx, my] = slide(me, anim?.prev ? anim.prev.x + anim.prev.y * W : null);
  const pose = anim && anim.p < 1 ? ['mi1', 'pas1', 'mi2', 'pas2'][Math.min(3, anim.p * 4 | 0)] : 'repos', shake = anim?.no ? Math.sin(t * 60) * 2 * (1 - anim.p) : 0;
  g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(mx + T / 2, my + T - 3, 10, 3, 0, 0, 7); g.fill();
  g.drawImage(art.walk[(anim?.dir || 'bas') + '_' + pose], mx - 4 + shake, my - 12, 40, 40);
}
async function nmOmbre() {
  const box = view.querySelector('#nmMain'); if (!box || box.querySelector('.omGame')) return;
  const art = await omLoad(), day = pet.ombre ||= {lv: 0, done: '', stars: []};
  const lvl = await nmPick(day, OM_LEVELS, omRandom, 1), parsed = omParse(lvl.rows), lv = parsed.lv;
  let st = parsed.st, hist = [], moves = 0, won = false, anim = null, msg = '', msgT = 0, raf = 0;
  const wrap = el('div', 'omGame'), head = el('div', 'omHead'), cv = Object.assign(document.createElement('canvas'), {width: lv.w * OM_T, height: lv.h * OM_T}), g = cv.getContext('2d');
  const tools = el('div', 'omTools'), end = el('div', 'nmEnd');
  const btn = (label, key, f) => { const b = el('button', 'btn px', label); b.title = key; b.onclick = () => { f(); cv.focus(); }; tools.append(b); return b; };
  wrap.append(head, el('div', 'omStage'), tools); wrap.querySelector('.omStage').append(cv, end);
  wrap.querySelector('.omStage').style.width = `min(100%, calc((100vh - 190px) * ${lv.w / lv.h}), ${lv.w * OM_T * 3}px)`;  // as big as the window allows
  box.querySelector('.nmGames').after(wrap); requestAnimationFrame(() => wrap.scrollIntoView({block: 'start'}));
  let lightNow = omLight(lv, st, 8), lightOld = lightNow;
  const said = (m) => { msg = m; msgT = performance.now(); };
  const hud = () => { head.replaceChildren(el('span', 'label', `PAS D'OMBRE · ${nmStage(day, OM_LEVELS.length, lvl)}`), el('span', 'omMoves', `${moves} pas · objectif ${lvl.par}` + (msg && performance.now() - msgT < 1600 ? ' · ' + msg : ''))); };
  const go = d => {
    if (won || (anim && anim.p < 1)) return;
    const [n, why] = omStep(lv, st, d), dir = d >= 0 ? ['haut', 'droite', 'bas', 'gauche'][d] : anim?.dir || 'bas';
    if (!n) { anim = {p: 0, no: true, dir, prev: null}; sfx?.(why === 'lumière' ? 'error' : 'click'); said(why === 'lumière' ? 'trop de lumière par là !' : why === 'rien' ? 'rien ne bouge ici' : ''); hud(); return; }
    hist.push(st); anim = {p: 0, dir, prev: st, spin: lv.spots.length ? 1 : 0}; st = n; moves++; sfx?.('click');
    lightOld = lightNow; lightNow = omLight(lv, st, 8); hud();
    if (omWon(lv, st)) win();
  };
  const undo = () => { if (won || !hist.length) return; st = hist.pop(); moves = Math.max(0, moves - 1); lightOld = lightNow = omLight(lv, st, 8); anim = null; hud(); };
  const restart = () => { if (won) return; st = parsed.st; hist = []; moves = 0; lightOld = lightNow = omLight(lv, st, 8); anim = null; hud(); };
  function win() {
    won = true; const stars = omStars(moves, lvl.par), xp = 2 + stars * 2;
    day.stars[day.lv || 0] = Math.max(day.stars[day.lv || 0] || 0, stars); day.done = omToday(); day.lv = (day.lv || 0) + 1;
    petXp(xp); pet.joy = petClamp(pet.joy + 8); petSave(); sfx?.('notify');
    setTimeout(() => {
      end.replaceChildren(el('div', 'label', 'NEOME EST RENTRÉ DANS SA COQUILLE'), el('div', 'omStarsBig', '★'.repeat(stars) + '☆'.repeat(3 - stars)),
        el('div', 'hint', `${moves} pas (objectif ${lvl.par}) · +${xp} XP · le prochain niveau demain`));
      const back = el('button', 'btn main px', 'RETOUR'); back.onclick = stop; end.append(back); end.classList.add('on'); nmGamesRender();
    }, 450);
  }
  const K = {ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3, z: 0, w: 0, d: 1, s: 2, q: 3, a: 3, ' ': -1};
  const kd = e => {
    if (e.target.closest?.('input,textarea') || !wrap.isConnected) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k in K) { e.preventDefault(); go(K[k]); } else if (k === 'Backspace' || (k === 'u')) { e.preventDefault(); undo(); } else if (k === 'r') restart(); else if (k === 'Escape') stop();
  };
  cv.tabIndex = 0; cv.onpointerdown = e => {  // a click next to NeoMe: one step that way
    const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * lv.w | 0, y = (e.clientY - r.top) / r.height * lv.h | 0, dx = x - st.x, dy = y - st.y;
    if (!dx && !dy) go(-1); else go(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
  };
  btn('ANNULER', 'Retour arrière (U)', undo); btn('RECOMMENCER', 'R', restart);
  if (lv.spots.length) btn('ATTENDRE', 'Espace : les projecteurs tournent', () => go(-1));
  btn('QUITTER', 'Échap', () => stop());
  addEventListener('keydown', kd);
  function stop() { cancelAnimationFrame(raf); removeEventListener('keydown', kd); wrap.remove(); }
  const mix = new Float32Array(lightNow.length);
  const loop = now => {
    if (!wrap.isConnected) return stop();
    if (anim && anim.p < 1) anim.p = Math.min(1, anim.p + 1 / 7);
    const p = anim && !anim.no ? anim.p : 1;
    for (let i = 0; i < mix.length; i++) mix[i] = lightOld[i] + (lightNow[i] - lightOld[i]) * p;
    omDraw(g, lv, st, art, mix, now / 1000, anim && anim.p < 1 ? {...anim, spin: (anim.spin || 0) * (1 - anim.p)} : null);
    if (msg && now - msgT > 1600) { msg = ''; hud(); }
    raf = requestAnimationFrame(loop);
  };
  hud(); cv.focus(); raf = requestAnimationFrame(loop);
  view.__nm.ombre = {go, state: () => st, won: () => won, lv};
}
/* ondes:logic */
// « Ondes de minuit » : NeoMe (> < ^ v) lance l'onde de son casque. Elle avance d'une case par temps et s'essouffle après lv.range cases.
// # mur · . herbe (on peut y poser un miroir) · x fleurs (on ne pose rien) · / \ miroirs fixes · A ampli (portée remise au maximum)
// X prisme (l'onde repart des deux côtés) · 1-9 créatures endormies, à réveiller dans l'ordre (une réveillée trop tôt grogne : raté)
const ODIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];
function odParse(rows, stock, range) {
  const h = rows.length, w = rows[0].length, lv = {w, h, rows, wall: new Set(), fixed: new Map(), amps: new Set(), prisms: new Set(), beasts: new Map(), free: new Set(), stock, range};
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    const k = x + y * w;
    if (c === '#') lv.wall.add(k); else if (c === '.') lv.free.add(k); else if (c === '/' || c === '\\') lv.fixed.set(k, c);
    else if (c === 'A') lv.amps.add(k); else if (c === 'X') lv.prisms.add(k); else if (c >= '1' && c <= '9') lv.beasts.set(k, +c);
    else if ('^>v<'.includes(c)) { lv.me = k; lv.dir = '^>v<'.indexOf(c); }
  }));
  lv.n = lv.beasts.size;
  return lv;
}
const odTurn = (m, d) => m === '/' ? [1, 0, 3, 2][d] : [3, 2, 1, 0][d];
// the wave, time step by time step. dec: Map cell -> '/' | '\\' (the player's mirrors). With ask, stops at the first grass cell
// that is not in dec ({need: k}); without, grass is empty. Returns the path drawn per time step, who woke when, and how it ended.
function odRun(lv, dec, ask) {
  const W = lv.w, seen = new Map(), woke = new Map(), steps = [];
  let beams = [{k: lv.me, d: lv.dir, e: lv.range}], next = 1, bad = 0;
  for (let t = 1; beams.length && t < 400; t++) {
    const nb = [], step = [];
    for (const b of beams) {
      const x = b.k % W + ODIR[b.d][0], y = (b.k / W | 0) + ODIR[b.d][1], k = x + y * W, e = b.e - 1;
      if (x < 0 || y < 0 || x >= W || y >= lv.h || lv.wall.has(k)) { step.push({k, d: b.d, hit: 1}); continue; }
      if (e < 0) continue;
      if (ask && lv.free.has(k) && !dec.has(k)) return {need: k};
      let d = b.d, ee = e;
      const m = lv.fixed.get(k) || dec.get(k);
      step.push({k, d: b.d, e});
      const n = lv.beasts.get(k);
      if (n && !woke.has(n)) { woke.set(n, t); if (n === next) next++; else if (!bad) bad = n; }
      if (lv.amps.has(k)) ee = lv.range;
      const outs = lv.prisms.has(k) ? [(d + 1) % 4, (d + 3) % 4] : [m ? odTurn(m, d) : d];
      for (const o of outs) { const s = k * 4 + o; if ((seen.get(s) ?? -1) >= ee) continue; seen.set(s, ee); nb.push({k, d: o, e: ee}); }
    }
    steps.push(step);
    // two waking at the same time step: fine if they follow each other (next already moved past both)
    if (bad && bad < next) bad = 0;
    if (bad) return {steps, woke, bad, won: false};
    beams = nb;
  }
  return {steps, woke, bad: 0, won: woke.size === lv.n && next > lv.n};
}
// the fewest mirrors that wake everyone in order: deepening search, a choice only at grass cells the wave really reaches
function odSolve(lv, max = lv.stock, all = false) {
  let found = null, count = 0, sims = 0;
  const go = (dec, left) => {
    if (++sims > 300000) return;
    const r = odRun(lv, dec, true);
    if (!r.need) { if (r.won) { count++; found ||= new Map(dec); } return; }
    if (r.bad) return;
    dec.set(r.need, ''); go(dec, left);
    if (left > 0) for (const m of ['/', '\\']) { dec.set(r.need, m); go(dec, left - 1); if (found && !all) break; }
    dec.delete(r.need);
  };
  for (let m = 0; m <= max; m++) {
    go(new Map(), m);
    if (found) { const sol = [...found].filter(([, v]) => v); return {mirrors: sol.length, sol, count, sims}; }
  }
  return null;
}
/* /ondes:logic */
// the 24 gardens (made by a generator and checked by odSolve: stock = the fewest mirrors that work)
const OD_LEVELS = /*OD_LEVELS*/[
  {name: "Premier écho", stock: 1, range: 30, rows: ["#########","#>..1...#","#..x....#","#....2..#","#########"]},
  {name: "Le reflet", stock: 2, range: 30, rows: ["##########","#x.#.#...#","#x.#...#.#","#.#...<..#","#21.....##","#.x......#","##########"]},
  {name: "Ricochet", stock: 2, range: 30, rows: ["##########","#.....#2.#","#....#x1.#","#..x.....#","###..v#.##","#........#","##########"]},
  {name: "Le détour", stock: 2, range: 30, rows: ["##########","#.2...x..#","#.1......#","#......\\.#","#.xv.....#","#...##.x.#","##########"]},
  {name: "Coin de jardin", stock: 2, range: 30, rows: ["##########","#\\...#x.x#","#3......##","#.#.2#..##","#...1x#.##","##>...x..#","##########"]},
  {name: "Le grand tour", stock: 3, range: 30, rows: ["##########","#....x.#.#","#.....1.x#","#\\..2#.^.#","#.#...x.##","#....3.#.#","##########"]},
  {name: "Souffle court", stock: 2, range: 7, rows: ["###########","#..x12#...#","#.<....#.x#","##A.......#","#..#..#x..#","#/...#....#","###########"]},
  {name: "L’ampli", stock: 2, range: 7, rows: ["###########","#.x...xx..#","#.#.......#","#A#.#..x..#","#....#vx.2#","#....#.1..#","###########"]},
  {name: "Plus loin", stock: 2, range: 7, rows: ["###########","#.....#...#","#..xx...<.#","#..A..1x..#","#...#2..#.#","##...x....#","###########"]},
  {name: "Juste assez", stock: 2, range: 7, rows: ["###########","#.>.#..A###","#x.1...x..#","#x.2......#","#x.x..x...#","#....3....#","###########"]},
  {name: "Écho lointain", stock: 2, range: 7, rows: ["###########","#.x321....#","#.\\.>.....#","#..xx.....#","#...#.#...#","#..A.#....#","###########"]},
  {name: "Le relais", stock: 3, range: 7, rows: ["###########","##....A./.#","#...21...##","#..3>.....#","#.....x.#x#","###xx..x#.#","###########"]},
  {name: "Le prisme", stock: 2, range: 30, rows: ["###########","#..3v..xx.#","#..2..x.#.#","#X........#","#..1..x#..#","##.....x..#","##...#x...#","###########"]},
  {name: "Deux chemins", stock: 2, range: 30, rows: ["###########","#3....X.x.#","#.2....#x.#","#.xx......#","#.1.......#","#..<...#..#","##xx#.....#","###########"]},
  {name: "En même temps", stock: 2, range: 30, rows: ["###########","#/x#....X.#","#.#xx....x#","#....#4x..#","#.x.....3.#","#..>x1.2..#","#...#.....#","###########"]},
  {name: "Les jumeaux", stock: 2, range: 30, rows: ["###########","#43.2..xx.#","#..#.1.x.x#","#......<x.#","###..x...\\#","#.........#","#x...X....#","###########"]},
  {name: "Fourche", stock: 2, range: 30, rows: ["###########","#....../#.#","#X........#","#..2...#..#","#...#1.x..#","#.3.x....x#","#.4..^x...#","###########"]},
  {name: "L’éventail", stock: 3, range: 30, rows: ["###########","#..3......#","#.x.......#","#.1x<.....#","#.2X#x.xx.#","#....#x...#","#4....../##","###########"]},
  {name: "Concert de nuit", stock: 2, range: 8, rows: ["############","#x...#...#.#","#...#......#","#.#.#...123#","#...\\>....##","#.A..#....X#","#.#..x.....#","############"]},
  {name: "La chorale", stock: 2, range: 8, rows: ["############","#X..#....A.#","#......1x#.#","#......2...#","#.......^/x#","#...#..3...#","#..........#","############"]},
  {name: "Grand écho", stock: 2, range: 8, rows: ["############","##.........#","#..x.#.....#","#../...A...#","#......21.<#","##....3..x.#","#...X4..x..#","############"]},
  {name: "Minuit pile", stock: 3, range: 8, rows: ["############","#..12X3#.#.#","#.^......#.#","#.#........#","#x........##","#..#.x\\....#","#.......A..#","############"]},
  {name: "Le dernier dormeur", stock: 3, range: 8, rows: ["############","#.123.#....#","#.<##X4....#","#........A.#","##.........#","#......xx..#","#..#\\../x..#","############"]},
  {name: "Aube", stock: 4, range: 8, rows: ["############","#.x.....#..#","#..1..45..x#","#...Ax.#..##","#.^\\23xx...#","##...X#....#","#.\\.......##","############"]}];
/* ---------- « Ondes de minuit », the second game of the day: NeoMe's headphones send a wave through the night garden. Place mirrors
   on the grass so it wakes the sleeping creatures in their order (one woken too early grumbles), before it runs out of breath.
   The wave is only seen when it is sent, and each try counts for the stars. One new level a day; the rules are the od* functions. ---------- */
const OD_T = 32;
const OD_COLORS = [['#ffb36b', '#c8742e'], ['#8be08b', '#3f9a4f'], ['#ff8fb8', '#c04a7a'], ['#8fc8ff', '#3f78c0'], ['#e0c86b', '#a08a2e'], ['#c8a0ff', '#7a50c0'], ['#7ce8d8', '#2f9a8a'], ['#ff9a8a', '#c04a3a'], ['#d8d8e8', '#8a8aa0']];
let odArt = null;
async function odLoad() {
  if (odArt) return odArt;
  const walk = {};
  for (const d of ['bas', 'haut', 'gauche', 'droite']) walk[d] = await imgOf(await blobUrl('img/jeu/' + d + '_repos.png'));
  const tile = f => { const c = document.createElement('canvas'); c.width = c.height = OD_T; const g = c.getContext('2d'); f((x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x * 2, y * 2, w * 2, h * 2); }); return c; };
  const grass = [0, 1, 2, 3].map(v => tile(p => {
    p(0, 0, 16, 16, ['#1b3638', '#1d383a', '#1a3436', '#1c3739'][v]);
    for (let i = 0; i < 7; i++) { const x = (i * 5 + v * 3) % 15, y = (i * 7 + v * 5) % 14 + 1; p(x, y, 1, 2, '#27504c'); p(x + 1, y - 1, 1, 1, '#2e5e58'); }
    p((v * 7) % 13 + 1, (v * 3) % 12 + 2, 2, 1, '#132a2c');
  }));
  const hedgeTop = tile(p => { p(0, 0, 16, 16, '#16291f'); for (const [x, y] of [[1, 1], [8, 0], [4, 6], [11, 6], [0, 11], [7, 11], [13, 12]]) { p(x, y, 5, 4, '#1f3a2a'); p(x + 1, y, 3, 1, '#2c5238'); p(x + 1, y + 1, 1, 1, '#3a6a46'); } });
  const hedgeFace = tile(p => { p(0, 0, 16, 16, '#10201a'); for (let x = 0; x < 16; x += 3) p(x, (x * 5) % 7, 2, 3, '#18301f'); p(0, 14, 16, 2, '#0a140f'); });
  const flowers = grass.map(gr => tile(p => {
    for (const [x, y, c] of [[3, 3, '#9ad8ff'], [10, 5, '#c8a8ff'], [5, 10, '#9ad8ff'], [12, 12, '#ffd2f0']]) { p(x, y + 2, 1, 2, '#2e5e58'); p(x - 1, y, 3, 1, c); p(x, y - 1, 1, 3, c); p(x, y, 1, 1, '#fff6c8'); }
  }));
  const mirror = (m, frame, rim) => tile(p => {
    p(3, 14, 10, 1, '#0c1a1c');
    for (let i = 0; i < 12; i++) { const x = m === '/' ? 2 + i : 13 - i, y = 13 - i; p(x, y - 1, 2, 3, frame); p(x, y, 1, 1, '#e8f4ff'); p(x + (m === '/' ? 1 : 0), y, 1, 1, '#a8c0e0'); }
    p(m === '/' ? 1 : 13, 13, 2, 2, rim); p(m === '/' ? 13 : 1, 1, 2, 2, rim);
  });
  const amp = tile(p => {
    p(2, 2, 12, 13, '#2a2238'); p(2, 2, 12, 1, '#4a3f5c'); p(2, 14, 12, 1, '#160f20');
    p(4, 5, 8, 8, '#4a3f5c'); p(5, 6, 6, 6, '#8a7aa8'); p(6, 7, 4, 4, '#2a2238'); p(7, 8, 2, 2, '#1a1424');
    p(4, 3, 1, 1, '#ffd27a'); p(6, 3, 1, 1, '#7ce8ff'); p(11, 3, 1, 1, '#ff8fb8');
  });
  const prism = tile(p => {
    p(3, 14, 10, 1, '#0c1a1c');
    for (let r = 0; r < 11; r++) { const w = 1 + r; p(8 - (w >> 1) - 1, 3 + r, w + 1, 1, r < 3 ? '#efe2ff' : '#c8a8ff'); p(8 - (w >> 1) - 1, 3 + r, 1, 1, '#ffffff'); p(8 + (w >> 1), 3 + r, 1, 1, '#8a6ad8'); }
    p(4, 13, 9, 1, '#8a6ad8'); p(7, 6, 1, 3, '#ffffff');
  });
  // the creatures: a round sleeping ball of fluff in its own color; awake, the eyes open
  const beast = (n, awake, grumpy) => tile(p => {
    const [c, d] = grumpy ? ['#ff6a5a', '#a02a2a'] : OD_COLORS[(n - 1) % OD_COLORS.length];
    p(3, 14, 10, 1, '#0c1a1c'); p(4, 6, 8, 8, c); p(3, 8, 10, 5, c); p(5, 5, 6, 1, c); p(4, 13, 8, 1, d); p(3, 12, 1, 1, d); p(12, 12, 1, 1, d);
    p(5, 4, 2, 2, c); p(9, 4, 2, 2, c); p(5, 4, 1, 1, d); p(10, 4, 1, 1, d);  // ears
    p(5, 7, 2, 1, '#ffffff55');
    if (!awake) { p(5, 9, 2, 1, d); p(9, 9, 2, 1, d); }
    else if (grumpy) { p(5, 8, 2, 1, '#1a1424'); p(9, 8, 2, 1, '#1a1424'); p(5, 9, 2, 1, '#ffffff'); p(9, 9, 2, 1, '#ffffff'); p(7, 11, 2, 1, '#1a1424'); }
    else { p(5, 8, 2, 2, '#1a1424'); p(9, 8, 2, 2, '#1a1424'); p(5, 8, 1, 1, '#ffffff'); p(9, 8, 1, 1, '#ffffff'); p(7, 11, 2, 1, d); }
  });
  const beasts = {}; for (let n = 1; n <= 9; n++) beasts[n] = [beast(n, false), beast(n, true), beast(n, true, true)];
  return odArt = {walk, grass, hedgeTop, hedgeFace, flowers, fixed: {'/': mirror('/', '#5a5468', '#8a8098'), '\\': mirror('\\', '#5a5468', '#8a8098')},
    mine: {'/': mirror('/', '#2f9ab8', '#7ce8ff'), '\\': mirror('\\', '#2f9ab8', '#7ce8ff')}, amp, prism, beasts};
}
const odStars = tries => tries <= 1 ? 3 : tries <= 3 ? 2 : 1;
// the garden, the pieces, the wave up to time step cur (a float), the cursor
function odDraw(g, lv, dec, art, run, cur, t, cursor) {
  const T = OD_T, W = lv.w, H = lv.h, at = k => [k % W * T, (k / W | 0) * T];
  g.imageSmoothingEnabled = false;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = x + y * W, v = (x * 7 + y * 13) % 4;
    if (lv.wall.has(k)) { g.drawImage(lv.wall.has(k + W) || y === H - 1 ? art.hedgeTop : art.hedgeFace, x * T, y * T); continue; }
    g.drawImage(art.grass[v], x * T, y * T);
    if (lv.rows[y][x] === 'x') g.drawImage(art.flowers[v], x * T, y * T);
  }
  if (cursor != null && lv.free.has(cursor)) { const [x, y] = at(cursor); g.strokeStyle = 'rgba(124,232,255,.8)'; g.lineWidth = 2; g.setLineDash([4, 3]); g.strokeRect(x + 2, y + 2, T - 4, T - 4); g.setLineDash([]); }
  for (const [k, m] of lv.fixed) g.drawImage(art.fixed[m], ...at(k));
  for (const [k, m] of dec) if (m) g.drawImage(art.mine[m], ...at(k));
  for (const k of lv.amps) g.drawImage(art.amp, ...at(k));
  for (const k of lv.prisms) g.drawImage(art.prism, ...at(k));
  // the wave: arcs at each cell it crossed, bright at its head and fading behind, paler when it runs out of breath
  if (run) run.steps.forEach((step, i) => {
    const age = cur - (i + 1); if (age < 0) return;
    for (const p of step) {
      const [x, y] = at(p.k), cx = x + T / 2, cy = y + T / 2, a0 = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][p.d];
      const a = Math.max(.12, 1 - age / 5) * (p.hit ? .6 : 1), breath = p.hit ? 1 : .45 + .55 * Math.min(1, (p.e + 1) / Math.min(lv.range, 8));
      g.strokeStyle = `rgba(124,232,255,${(a * breath).toFixed(3)})`; g.lineWidth = 2;
      if (p.hit) { const bx = cx - [0, 1, 0, -1][p.d] * T / 2, by = cy - [-1, 0, 1, 0][p.d] * T / 2; g.beginPath(); g.arc(bx, by, 4 + Math.min(age, 1) * 6, 0, 7); g.stroke(); continue; }
      for (const r of [5, 10, 15]) { const off = age < 1 ? (age - .5) * T * .6 : 0; g.beginPath(); g.arc(cx + Math.cos(a0) * off, cy + Math.sin(a0) * off, r, a0 - .8, a0 + .8); g.stroke(); }
    }
  });
  // the creatures: asleep (with their number and a floating z), awake, or grumbling when woken too early
  for (const [k, n] of lv.beasts) {
    const [x, y] = at(k), w = run?.woke.get(n), awake = w != null && cur >= w, grr = awake && run.bad === n, shake = grr ? Math.sin(t * 50) * 2 : 0, hop = awake && !grr ? -Math.abs(Math.sin((cur - w) * 3)) * 4 * Math.max(0, 1 - (cur - w) / 4) : 0;
    g.drawImage(art.beasts[n][awake ? grr ? 2 : 1 : 0], x + shake, y + hop);
    g.fillStyle = awake && !grr ? '#ffd27a' : '#0c1a1c'; g.beginPath(); g.arc(x + T - 6, y + 6, 6, 0, 7); g.fill();
    g.fillStyle = awake && !grr ? '#1a1424' : '#efe2ff'; g.font = 'bold 9px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(n, x + T - 6, y + 6.5);
    g.font = 'bold 10px monospace';
    if (!awake) { const z = (t * .6 + n * .37) % 1; g.fillStyle = `rgba(239,226,255,${(1 - z) * .8})`; g.fillText('z', x + 8 + z * 6, y + 4 - z * 8); }
    else if (grr) { g.fillStyle = '#ff6a5a'; g.fillText('!', x + 6, y + 2); }
    else if (cur - w < 6) { g.fillStyle = `rgba(255,210,122,${1 - (cur - w) / 6})`; g.fillText('♪', x + 6, y + 2 - (cur - w) * 2); }
  }
  // NeoMe and his headphones: his sprite facing the way the wave leaves, notes bobbing
  const [mx, my] = at(lv.me);
  g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(mx + T / 2, my + T - 3, 10, 3, 0, 0, 7); g.fill();
  g.drawImage(art.walk[['haut', 'droite', 'bas', 'gauche'][lv.dir]], mx - 4, my - 12, 40, 40);
  g.fillStyle = '#e04fd0'; g.fillRect(mx + 3, my + 4, 4, 7); g.fillRect(mx + T - 7, my + 4, 4, 7); g.fillStyle = '#3a3048'; g.fillRect(mx + 5, my - 1, T - 10, 2);
  // moonlight from the top, darker corners
  const vg = g.createRadialGradient(W * T / 2, H * T * .3, T, W * T / 2, H * T / 2, Math.max(W, H) * T * .75);
  vg.addColorStop(0, 'rgba(180,200,255,.06)'); vg.addColorStop(1, 'rgba(4,6,20,.45)'); g.fillStyle = vg; g.fillRect(0, 0, W * T, H * T);
}
async function nmOndes() {
  const box = view.querySelector('#nmMain'); if (!box || box.querySelector('.omGame')) return;
  const art = await odLoad(), day = pet.ondes ||= {lv: 0, done: '', stars: []};
  const lvl = await nmPick(day, OD_LEVELS, odRandom, 2), lv = odParse(lvl.rows, lvl.stock, lvl.range);
  const dec = new Map(); let run = null, cur = 0, playing = false, tries = 0, won = false, msg = '', cursor = [...lv.free][0], raf = 0, last = 0;
  const wrap = el('div', 'omGame odGame'), head = el('div', 'omHead'), cv = Object.assign(document.createElement('canvas'), {width: lv.w * OD_T, height: lv.h * OD_T}), g = cv.getContext('2d');
  const tools = el('div', 'omTools'), end = el('div', 'nmEnd'), stage = el('div', 'omStage');
  const btn = (label, key, f, main) => { const b = el('button', 'btn px' + (main ? ' main' : ''), label); b.title = key; b.onclick = () => { f(); cv.focus(); }; tools.append(b); return b; };
  wrap.append(head, stage, tools); stage.append(cv, end);
  stage.style.width = `min(100%, calc((100vh - 190px) * ${lv.w / lv.h}), ${lv.w * OD_T * 3}px)`;
  box.querySelector('.nmGames').after(wrap); requestAnimationFrame(() => wrap.scrollIntoView({block: 'start'}));
  const used = () => [...dec.values()].filter(Boolean).length;
  const hud = () => head.replaceChildren(el('span', 'label', `ONDES DE MINUIT · ${nmStage(day, OD_LEVELS.length, lvl)}`),
    el('span', 'omMoves', `miroirs ${used()} / ${lv.stock} · portée ${lv.range > 20 ? '∞' : lv.range} · essai ${tries + (playing ? 0 : 1)}` + (msg ? ' · ' + msg : '')));
  // a grass cell: nothing → / → \ → nothing (a new mirror only while some are left)
  const place = (k, m) => {
    if (playing || won || !lv.free.has(k)) return false;
    const now = dec.get(k) || '', want = m ?? (now === '' ? '/' : now === '/' ? '\\' : '');
    if (want && !now && used() >= lv.stock) { msg = 'plus de miroir : reprends-en un'; sfx?.('error'); hud(); return false; }
    if (want) dec.set(k, want); else dec.delete(k);
    run = null; msg = ''; sfx?.('click'); hud(); return true;
  };
  const play = () => {
    if (playing || won) return;
    run = odRun(lv, dec, false); tries++; cur = 0; playing = true; msg = ''; sfx?.('launch'); hud();
  };
  const finish = () => {
    playing = false;
    if (run.won) return win();
    const asleep = [...lv.beasts.values()].filter(n => !run.woke.has(n)).sort((a, b) => a - b);
    const tired = run.steps.at(-1)?.some(p => !p.hit && p.e === 0);
    msg = run.bad ? `le n° ${run.bad} s’est réveillé trop tôt et grogne` : `${tired ? 'l’onde s’est essoufflée' : 'l’onde s’est perdue'} · encore endormis : ${asleep.join(', ')}`;  // in pieces locales/en.json knows
    sfx?.('error'); hud();
  };
  function win() {
    won = true; const stars = odStars(tries), xp = 2 + stars * 2;
    day.stars[day.lv || 0] = Math.max(day.stars[day.lv || 0] || 0, stars); day.done = omToday(); day.lv = (day.lv || 0) + 1;
    petXp(xp); pet.joy = petClamp(pet.joy + 8); petSave(); sfx?.('notify');
    setTimeout(() => {
      end.replaceChildren(el('div', 'label', 'TOUT LE JARDIN EST RÉVEILLÉ'), el('div', 'omStarsBig', '★'.repeat(stars) + '☆'.repeat(3 - stars)),
        el('div', 'hint', `${tries} essai${tries > 1 ? 's' : ''} · +${xp} XP · le prochain jardin demain`));
      const back = el('button', 'btn main px', 'RETOUR'); back.onclick = stop; end.append(back); end.classList.add('on'); nmGamesRender();
    }, 900);
  }
  const clear = () => { if (playing || won) return; dec.clear(); run = null; msg = ''; hud(); };
  cv.tabIndex = 0;
  cv.onpointerdown = e => { const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * lv.w | 0, y = (e.clientY - r.top) / r.height * lv.h | 0; cursor = x + y * lv.w; place(cursor); };
  const kd = e => {
    if (e.target.closest?.('input,textarea') || !wrap.isConnected) return;
    const mv = {ArrowUp: -lv.w, ArrowDown: lv.w, ArrowLeft: -1, ArrowRight: 1}[e.key];
    if (mv) { e.preventDefault(); let k = cursor; for (let i = 0; i < lv.w * lv.h; i++) { k += mv; if (k < 0 || k >= lv.w * lv.h) break; if (lv.free.has(k)) { cursor = k; break; } } }
    else if (e.key === 'Enter') { e.preventDefault(); place(cursor); }
    else if (e.key === ' ') { e.preventDefault(); play(); }
    else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); if (dec.get(cursor)) place(cursor, ''); }
    else if (e.key.toLowerCase() === 'r') clear(); else if (e.key === 'Escape') stop();
  };
  btn('LANCER L’ONDE', 'Espace', play, true); btn('TOUT ENLEVER', 'R', clear); btn('QUITTER', 'Échap', () => stop());
  addEventListener('keydown', kd);
  function stop() { cancelAnimationFrame(raf); removeEventListener('keydown', kd); wrap.remove(); }
  const loop = now => {
    if (!wrap.isConnected) return stop();
    const dt = last ? Math.min(.1, (now - last) / 1000) : 0; last = now;
    if (playing) { cur += dt * 7; if (cur >= run.steps.length + 1.5) finish(); }
    odDraw(g, lv, dec, art, run, playing || run ? cur : 0, now / 1000, playing || won ? null : cursor);
    raf = requestAnimationFrame(loop);
  };
  hud(); cv.focus(); raf = requestAnimationFrame(loop);
  view.__nm.ondes = {place, play, won: () => won, playing: () => playing, lv, tries: () => tries};
}
/* eclo:logic */
// « Éclosion » : la coquille roule dans un jardin de nuit qu'on incline. # pierre · . herbe · ^ > v < pente · O trou · ~ boue
// B champignon (rebondit) · * luciole · S départ · N nid (s'ouvre quand toutes les lucioles sont ramassées). Unités : la case.
const EC = {acc: 13, slope: 6, fric: 1.6, mud: 7, max: 6, mudMax: 2.4, r: .32, fall: .7};
function ecParse(rows) {
  const lv = {w: rows[0].length, h: rows.length, rows, flies: [], bumps: []};
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    if (c === 'S') lv.start = [x + .5, y + .5]; else if (c === 'N') lv.nest = [x + .5, y + .5];
    else if (c === '*') lv.flies.push([x + .5, y + .5]); else if (c === 'B') lv.bumps.push([x + .5, y + .5]);
  }));
  return lv;
}
const ecAt = (lv, x, y) => lv.rows[Math.floor(y)]?.[Math.floor(x)] ?? '#';
const ecNew = lv => ({x: lv.start[0], y: lv.start[1], vx: 0, vy: 0, got: [], falls: 0, fall: 0, safe: [...lv.start], t: 0, won: false, roll: 0});
// one physics step: tilt (ix, iy in -1..1), slopes, friction, stones, mushrooms, holes, fireflies, the nest
function ecStep(lv, s, ix, iy, dt) {
  if (s.won) return s;
  s.t += dt;
  if (s.fall > 0) { s.fall -= dt; if (s.fall <= 0) { s.fall = 0; [s.x, s.y] = s.safe; s.vx = s.vy = 0; } return s; }
  const c = ecAt(lv, s.x, s.y), sl = {'^': [0, -1], '>': [1, 0], 'v': [0, 1], '<': [-1, 0]}[c] || [0, 0], mud = c === '~';
  const n = Math.hypot(ix, iy); if (n > 1) { ix /= n; iy /= n; }
  s.vx += (ix * EC.acc + sl[0] * EC.slope) * dt; s.vy += (iy * EC.acc + sl[1] * EC.slope) * dt;
  const k = Math.max(0, 1 - (mud ? EC.mud : EC.fric) * dt); s.vx *= k; s.vy *= k;
  const sp = Math.hypot(s.vx, s.vy), mx = mud ? EC.mudMax : EC.max; if (sp > mx) { s.vx *= mx / sp; s.vy *= mx / sp; }
  const solid = (x, y) => ecAt(lv, x, y) === '#', r = EC.r;
  const nx = s.x + s.vx * dt;
  if (solid(nx + Math.sign(s.vx) * r, s.y - r * .7) || solid(nx + Math.sign(s.vx) * r, s.y + r * .7)) s.vx *= -.4; else s.x = nx;
  const ny = s.y + s.vy * dt;
  if (solid(s.x - r * .7, ny + Math.sign(s.vy) * r) || solid(s.x + r * .7, ny + Math.sign(s.vy) * r)) s.vy *= -.4; else s.y = ny;
  s.roll += Math.hypot(s.vx, s.vy) * dt;
  for (const [bx, by] of lv.bumps) {  // a mushroom: pushes out and throws back, a little harder than it came
    const dx = s.x - bx, dy = s.y - by, d = Math.hypot(dx, dy), min = .38 + r;
    if (d < min && d > 1e-6) { s.x = bx + dx / d * min; s.y = by + dy / d * min; const vn = s.vx * dx / d + s.vy * dy / d; if (vn < 0) { const b = Math.max(-vn * 1.3, 4); s.vx += (b - vn) * dx / d; s.vy += (b - vn) * dy / d; s.bump = s.t; } }
  }
  if (ecAt(lv, s.x, s.y) === 'O') { s.fall = EC.fall; s.falls++; s.fallAt = [s.x, s.y]; return s; }
  lv.flies.forEach((f, i) => { if (!s.got.includes(i) && Math.hypot(s.x - f[0], s.y - f[1]) < .55) { s.got.push(i); s.safe = [...f]; } });
  if (s.got.length === lv.flies.length && Math.hypot(s.x - lv.nest[0], s.y - lv.nest[1]) < .5) s.won = true;
  return s;
}
const ecStars = falls => falls === 0 ? 3 : falls <= 2 ? 2 : 1;
// a careful pilot (for the self-test and the level check): shortest path on the grass, around holes and mushrooms,
// to the nearest firefly then the nest, aiming a few cells ahead at low speed
function ecBot(lv, s) {
  const W = lv.w, goal = lv.flies.map((f, i) => s.got.includes(i) ? null : f).filter(Boolean), tg = goal.length ? goal : [lv.nest];
  const ok = k => { const c = lv.rows[k / W | 0][k % W]; return c !== '#' && c !== 'O' && c !== 'B'; };
  const start = Math.floor(s.x) + Math.floor(s.y) * W, want = new Set(tg.map(([x, y]) => Math.floor(x) + Math.floor(y) * W));
  const prev = new Map([[start, -1]]), q = [start]; let end = -1;
  for (let i = 0; i < q.length && end < 0; i++) for (const d of [1, -1, W, -W]) {
    const k = q[i] + d; if (prev.has(k) || !ok(k)) continue; prev.set(k, q[i]); if (want.has(k)) { end = k; break; } q.push(k);
  }
  if (end < 0) return [0, 0];
  const path = []; for (let k = end; k >= 0; k = prev.get(k)) path.unshift(k);
  const nx = path[Math.min(1, path.length - 1)], tx = nx % W + .5, ty = (nx / W | 0) + .5;
  const c = ecAt(lv, s.x, s.y), sl = {'^': [0, -1], '>': [1, 0], 'v': [0, 1], '<': [-1, 0]}[c] || [0, 0];
  let dx = tx - s.x, dy = ty - s.y; const d = Math.hypot(dx, dy) || 1, sp = 2.2;
  return [(dx / d * sp - s.vx) * 1.5 - sl[0] * EC.slope / EC.acc, (dy / d * sp - s.vy) * 1.5 - sl[1] * EC.slope / EC.acc];
}
/* /eclo:logic */
/* ---------- « Éclosion », the third game of the day: tilt the night garden so NeoMe's egg shell rolls over to every firefly
   (they light the way) then to the nest, past slopes, holes, mud and bouncing mushrooms. Fewer falls, more stars. One garden a day;
   the physics are the ec* functions above, ecBot is the pilot the self-test uses. ---------- */
const EC_T = 32;
const EC_LEVELS = /*EC_LEVELS*/[
  {name: "Premier roulé", rows: ["################", "#S.....*.......#", "#..............#", "#....OO....*...#", "#....OO........#", "#..*.......OO..#", "#..........OO..#", "#......*......N#", "################"]},
  {name: "La pente", rows: ["################", "#S..>>>>>>>>...#", "#...>>>>>>>>.*.#", "#.*.>>>>>>>>...#", "#...........OOO#", "#OOO....*......#", "#...<<<<<<<<...#", "#.*.<<<<<<<<..N#", "################"]},
  {name: "Le gué de boue", rows: ["################", "#S...~~~~~~....#", "#....~~*~~~..*.#", "#.OO.~~~~~~....#", "#.OO......OOOO.#", "#....*....OOOO.#", "#~~~~~~~.......#", "#~~*~~~~....*.N#", "################"]},
  {name: "Champignons", rows: ["################", "#S.....B.....*.#", "#...B.....B....#", "#.*....OO......#", "#....B.OO.B..*.#", "#......B.......#", "#.OO.......OO..#", "#.OO..*..B.OO.N#", "################"]},
  {name: "Le couloir", rows: ["################", "#S.OOOOOOOOOO*.#", "#..O........O..#", "#..O.*OOOO..O..#", "#..O..O..O..O..#", "#..O..O*.O.....#", "#.....OO.O.OOOO#", "#OOOOO.......*N#", "################"]},
  {name: "Le toboggan", rows: ["################", "#S>>>>>>>>>>>v.#", "#.^.........v..#", "#.^.*OOOOO..v*.#", "#.^..OOOOO..v..#", "#.^.........v..#", "#.^<<<<<<<<<<..#", "#*........OO..N#", "################"]},
  {name: "Nuit de vent", rows: ["################", "#S..vvvv....*..#", "#...vvvv..>>>>.#", "#.*.vvvv..>>>>.#", "#OOOOOO...>>>>O#", "#......^^^^...O#", "#.*....^^^^..*O#", "#......^^^^...N#", "################"]},
  {name: "Les marches", rows: ["################", "#S......*......#", "#vvvvvvvvvvvvvv#", "#..*....OO.....#", "#^^^^^^^^^^^^^^#", "#.....OO....*..#", "#vvvvvvvvvvvvvv#", "#.*..OO.......N#", "################"]},
  {name: "Le grand jardin", rows: ["################", "#S...~~~..B..*.#", "#.>>>>>~....OO.#", "#.....~~.B..OO.#", "#OO.*..........#", "#OO...<<<<<<.*.#", "#..B..OO..~~~~.#", "#*....OO..~*~~N#", "################"]},
  {name: "Minuit au jardin", rows: ["################", "#S.B.OO...>>>v*#", "#....OO...^..v.#", "#.*..~~...^OOv.#", "#OOO.~~*..^OOv.#", "#....~~...^<<<.#", "#.B....OOOO....#", "#.*..B.......*N#", "################"]}];
let ecArt = null;
async function ecLoad() {
  if (ecArt) return ecArt;
  const od = await odLoad(), om = await omLoad();
  const tile = f => { const c = document.createElement('canvas'); c.width = c.height = EC_T; const g = c.getContext('2d'); f((x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x * 2, y * 2, w * 2, h * 2); }); return c; };
  const hole = tile(p => { p(0, 0, 16, 16, '#05040c'); p(3, 8, 1, 1, '#1a1830'); p(11, 12, 1, 1, '#1a1830'); });
  const mud = [0, 1].map(v => tile(p => { p(0, 0, 16, 16, '#2e2418'); for (let i = 0; i < 6; i++) { const x = (i * 5 + v * 7) % 14, y = (i * 9 + v * 3) % 14; p(x, y, 3, 1, '#3e3020'); p(x + 1, y + 1, 1, 1, '#1e170e'); } }));
  const mush = tile(p => {
    p(4, 14, 8, 1, '#0c1a1c'); p(6, 9, 4, 5, '#e8dcc8'); p(6, 13, 4, 1, '#b8a890');
    p(2, 4, 12, 5, '#8a4ad8'); p(3, 3, 10, 1, '#8a4ad8'); p(5, 2, 6, 1, '#a868f0'); p(2, 8, 12, 1, '#5a2a98');
    p(4, 4, 2, 2, '#e8c8ff'); p(9, 3, 2, 1, '#e8c8ff'); p(11, 6, 1, 1, '#e8c8ff');
  });
  const nest = open => tile(p => {
    p(1, 6, 14, 8, '#5a4028'); p(2, 5, 12, 1, '#7a5838'); p(1, 13, 14, 1, '#3a2818');
    for (let x = 1; x < 15; x += 2) { p(x, 7 + (x % 4 ? 1 : 0), 2, 1, '#8a6840'); p(x + 1, 10 + (x % 3 ? 1 : 0), 2, 1, '#3a2818'); }
    p(4, 6, 8, 3, open ? '#ffe9a8' : '#2a1c10'); if (open) p(6, 6, 4, 1, '#fff8e0');
  });
  return ecArt = {grass: od.grass, wallTop: od.hedgeTop, wallFace: od.hedgeFace, hole, mud, mush, nestOff: nest(false), nestOn: nest(true), shell: om.shell, dark: document.createElement('canvas')};
}
function ecDraw(g, lv, s, art, t) {
  const T = EC_T, W = lv.w, H = lv.h, open = s.got.length === lv.flies.length;
  g.imageSmoothingEnabled = false;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = lv.rows[y][x], v = (x * 7 + y * 13) % 4, X = x * T, Y = y * T;
    if (c === '#') { g.drawImage(lv.rows[y + 1]?.[x] === '#' || y === H - 1 ? art.wallTop : art.wallFace, X, Y); continue; }
    if (c === 'O') {  // a hole: its rim only where the ground is, so holes side by side make one pit
      g.drawImage(art.hole, X, Y); const n = (dx, dy) => lv.rows[y + dy]?.[x + dx] !== 'O';
      if (n(0, -1)) { g.fillStyle = '#4a6a78'; g.fillRect(X, Y, T, 2); g.fillStyle = '#24384a'; g.fillRect(X, Y + 2, T, 4); g.fillStyle = '#101a26'; g.fillRect(X, Y + 6, T, 2); }
      g.fillStyle = '#1e3040'; if (n(-1, 0)) g.fillRect(X, Y, 2, T); if (n(1, 0)) g.fillRect(X + T - 2, Y, 2, T); if (n(0, 1)) g.fillRect(X, Y + T - 2, T, 2);
      continue;
    }
    g.drawImage(c === '~' ? art.mud[v & 1] : art.grass[v], X, Y);
    const sl = {'^': [0, -1], '>': [1, 0], 'v': [0, 1], '<': [-1, 0]}[c];
    if (sl) {  // a slope: pale chevrons gliding downhill
      g.save(); g.beginPath(); g.rect(X, Y, T, T); g.clip(); g.translate(X + T / 2, Y + T / 2); g.rotate(Math.atan2(sl[1], sl[0]));
      g.strokeStyle = 'rgba(160,230,220,.22)'; g.lineWidth = 2; const o = (t * 18) % 16;
      for (let i = -2; i < 2; i++) { const a = i * 16 + o; g.beginPath(); g.moveTo(a - 4, -7); g.lineTo(a + 2, 0); g.lineTo(a - 4, 7); g.stroke(); }
      g.restore();
    }
  }
  for (const [bx, by] of lv.bumps) { const sq = s.bump && t - s.bumpShow < .25 && Math.hypot(s.x - bx, s.y - by) < 1.2 ? 1.15 : 1; g.drawImage(art.mush, bx * T - T / 2 * sq, by * T - T / 2 * sq, T * sq, T * sq); }
  g.drawImage(open ? art.nestOn : art.nestOff, lv.nest[0] * T - T / 2, lv.nest[1] * T - T / 2);
  lv.flies.forEach(([fx, fy], i) => {
    if (s.got.includes(i)) return;
    const bx = fx * T + Math.sin(t * 2 + i) * 4, by = fy * T + Math.cos(t * 1.6 + i * 2) * 3 - 4;
    const gr = g.createRadialGradient(bx, by, 1, bx, by, 12); gr.addColorStop(0, 'rgba(255,240,140,.9)'); gr.addColorStop(1, 'rgba(255,220,80,0)');
    g.fillStyle = gr; g.fillRect(bx - 12, by - 12, 24, 24); g.fillStyle = '#fffbe0'; g.fillRect(bx - 2, by - 2, 4, 4);
  });
  // the shell: rolls as it goes, shrinks when it falls in a hole
  const fallen = s.fall > 0 ? s.fall / EC.fall : 1, [sx, sy] = s.fall > 0 ? s.fallAt : [s.x, s.y];
  if (s.fall <= 0) { g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(sx * T, sy * T + 10, 10, 3, 0, 0, 7); g.fill(); }
  g.save(); g.translate(sx * T, sy * T); g.rotate(Math.sin(s.roll * 2.2) * .5); g.scale(fallen, fallen); g.drawImage(art.shell, -T / 2, -T / 2 - 4); g.restore();
  // the night: dark everywhere but around the fireflies, the shell, the open nest and a faint glow on the mushrooms
  const d = art.dark; if (d.width !== g.canvas.width || d.height !== g.canvas.height) { d.width = g.canvas.width; d.height = g.canvas.height; }
  const dg = d.getContext('2d'); dg.globalCompositeOperation = 'source-over'; dg.clearRect(0, 0, d.width, d.height); dg.fillStyle = 'rgba(4,6,22,.58)'; dg.fillRect(0, 0, d.width, d.height);
  dg.globalCompositeOperation = 'destination-out';
  const hole = (x, y, r, a) => { const gr = dg.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); dg.fillStyle = gr; dg.fillRect(x - r, y - r, r * 2, r * 2); };
  hole(sx * T, sy * T, T * 2.6, .95);
  lv.flies.forEach(([fx, fy], i) => { if (!s.got.includes(i)) hole(fx * T, fy * T, T * (1.7 + Math.sin(t * 3 + i) * .1), .9); });
  if (open) hole(lv.nest[0] * T, lv.nest[1] * T, T * 2, .9);
  for (const [bx, by] of lv.bumps) hole(bx * T, by * T, T * .9, .5);
  g.drawImage(d, 0, 0);
}
async function nmEclo() {
  const box = view.querySelector('#nmMain'); if (!box || box.querySelector('.omGame')) return;
  const art = await ecLoad(), day = pet.eclo ||= {lv: 0, done: '', stars: []};
  const lvl = await nmPick(day, EC_LEVELS, ecRandom, 3), lv = ecParse(lvl.rows);
  let s = ecNew(lv), started = false, raf = 0, last = 0, acc = 0, won = false, auto = false, note = '', noteT = 0, gotN = 0, fallsN = 0;
  const keys = new Set(); let pointer = null;
  const wrap = el('div', 'omGame odGame'), head = el('div', 'omHead'), cv = Object.assign(document.createElement('canvas'), {width: lv.w * EC_T, height: lv.h * EC_T}), g = cv.getContext('2d');
  const tools = el('div', 'omTools'), end = el('div', 'nmEnd'), stage = el('div', 'omStage');
  const btn = (label, key, f) => { const b = el('button', 'btn px', label); b.title = key; b.onclick = () => { f(); cv.focus(); }; tools.append(b); return b; };
  wrap.append(head, stage, tools); stage.append(cv, end);
  stage.style.width = `min(100%, calc((100vh - 190px) * ${lv.w / lv.h}), ${lv.w * EC_T * 3}px)`;
  box.querySelector('.nmGames').after(wrap); requestAnimationFrame(() => wrap.scrollIntoView({block: 'start'}));
  let shown = '';
  const hud = () => {
    const txt = started ? `lucioles ${s.got.length} / ${lv.flies.length} · chutes ${s.falls} · ${s.t.toFixed(1).replace('.', ',')} s` + (performance.now() - noteT < 1800 ? ' · ' + note : '') : 'flèches ou ZQSD pour pencher le jardin · ou garde le clic enfoncé';
    if (txt !== shown) { shown = txt; head.replaceChildren(el('span', 'label', `ÉCLOSION · ${nmStage(day, EC_LEVELS.length, lvl)}`), el('span', 'omMoves', txt)); }
  };
  const say = m => { note = m; noteT = performance.now(); };
  const tilt = () => {
    if (auto) return ecBot(lv, s);
    let ix = 0, iy = 0;
    for (const k of keys) { if (k === 'arrowleft' || k === 'q' || k === 'a') ix--; if (k === 'arrowright' || k === 'd') ix++; if (k === 'arrowup' || k === 'z' || k === 'w') iy--; if (k === 'arrowdown' || k === 's') iy++; }
    if (pointer && !ix && !iy) { const r = cv.getBoundingClientRect(), px = (pointer[0] - r.left) / r.width * lv.w, py = (pointer[1] - r.top) / r.height * lv.h, dx = px - s.x, dy = py - s.y, d = Math.hypot(dx, dy); if (d > .3) { ix = dx / Math.max(d, 1.5); iy = dy / Math.max(d, 1.5); } }
    return [ix, iy];
  };
  function win() {
    won = true; const stars = ecStars(s.falls), xp = 2 + stars * 2;
    day.stars[day.lv || 0] = Math.max(day.stars[day.lv || 0] || 0, stars); day.done = omToday(); day.lv = (day.lv || 0) + 1;
    petXp(xp); pet.joy = petClamp(pet.joy + 8); petSave(); sfx?.('notify');
    setTimeout(() => {
      end.replaceChildren(el('div', 'label', 'LA COQUILLE EST AU NID'), el('div', 'omStarsBig', '★'.repeat(stars) + '☆'.repeat(3 - stars)),
        el('div', 'hint', `${s.t.toFixed(1).replace('.', ',')} s · ${s.falls} chute${s.falls > 1 ? 's' : ''} · +${xp} XP · un autre jardin demain`));
      const back = el('button', 'btn main px', 'RETOUR'); back.onclick = stop; end.append(back); end.classList.add('on'); nmGamesRender();
    }, 500);
  }
  const restart = () => { if (won) return; s = ecNew(lv); started = false; gotN = fallsN = 0; hud(); };
  const kd = e => {
    if (e.target.closest?.('input,textarea') || !wrap.isConnected) return;
    const k = e.key.toLowerCase();
    if (k === 'escape') return stop(); if (k === 'r') return restart();
    if (/^(arrow(up|down|left|right)|[zqsdwa])$/.test(k)) { e.preventDefault(); keys.add(k); }
  };
  const ku = e => keys.delete(e.key.toLowerCase());
  cv.tabIndex = 0;
  cv.onpointerdown = e => { pointer = [e.clientX, e.clientY]; cv.setPointerCapture?.(e.pointerId); };
  cv.onpointermove = e => { if (pointer) pointer = [e.clientX, e.clientY]; };
  cv.onpointerup = cv.onpointercancel = () => { pointer = null; };
  btn('RECOMMENCER', 'R', restart); btn('QUITTER', 'Échap', () => stop());
  addEventListener('keydown', kd); addEventListener('keyup', ku); const bl = () => keys.clear(); addEventListener('blur', bl);
  function stop() { cancelAnimationFrame(raf); removeEventListener('keydown', kd); removeEventListener('keyup', ku); removeEventListener('blur', bl); wrap.remove(); }
  const loop = now => {
    if (!wrap.isConnected) return stop();
    const dt = last ? Math.min(.1, (now - last) / 1000) : 0; last = now;
    if (!won) {
      const [ix, iy] = tilt(); if (ix || iy) started = true;
      if (started) for (acc += dt; acc >= 1 / 120; acc -= 1 / 120) { ecStep(lv, s, ix, iy, 1 / 120); if (s.bump && s.bump !== s.bumpSeen) { s.bumpSeen = s.bump; s.bumpShow = now / 1000; sfx?.('click'); } }
      if (s.got.length > gotN) { gotN = s.got.length; sfx?.('type'); say(gotN === lv.flies.length ? 'le nid s’ouvre !' : 'une luciole de plus'); }
      if (s.falls > fallsN) { fallsN = s.falls; sfx?.('error'); say('plouf ! retour à la dernière luciole'); }
      if (s.got.length < lv.flies.length && Math.hypot(s.x - lv.nest[0], s.y - lv.nest[1]) < .5 && now - noteT > 1500) say('il manque des lucioles');
      if (s.won) win();
      if (started) hud();
    }
    ecDraw(g, lv, s, art, now / 1000);
    raf = requestAnimationFrame(loop);
  };
  hud(); cv.focus(); raf = requestAnimationFrame(loop);
  view.__nm.eclo = {auto: on => { auto = on; }, state: () => s, won: () => won, lv};
}
/* ombre:rand */
// a level of the day once the 24 are done: a random room improved cell by cell (longer solution, more pushes, fewer walls),
// that must be solvable, not solvable without pushing, and not longer than 60 steps. The seed is the date: the same level all day.
const nmRng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const OM_KINDS = [[2, 2, 0, 0, 0, 11, 7], [2, 1, 1, 0, 0, 11, 7], [2, 1, 0, 0, 1, 11, 7], [1, 1, 0, 1, 0, 11, 7], [1, 2, 1, 1, 1, 12, 8]];
function omRandom(seed, turns = 300) {
  const R = nmRng(seed), [nL, nB, nM, nS, nO, W, H] = OM_KINDS[seed % OM_KINDS.length], cell = () => [1 + (R() * (W - 2) | 0), 1 + (R() * (H - 2) | 0)];
  const items = [...'PE', ...'L'.repeat(nL), ...'B'.repeat(nB), ...'M'.repeat(nM), ...Array.from({length: nS}, () => '^>v<'[R() * 4 | 0]), ...'o_'.repeat(nO)];
  const score = rows => {
    const {lv, st} = omParse(rows); if (omLit(lv, st, st.x + st.y * lv.w)) return -1;
    const sol = omSolve(lv, st, 40000); if (!sol || sol.length > 60) return -1;
    if (omSolve(lv, st, 40000, true)) return 0;
    let s = st, push = 0, waits = 0;
    for (const d of sol) { const [n] = omStep(lv, s, d); if (n.crates.join() !== s.crates.join() || n.mov.join() !== s.mov.join()) push++; if (d < 0) waits++; s = n; }
    return sol.length + 4 * push + 2 * waits - .7 * (rows.slice(1, -1).join('').split('#').length - 1 - 2 * (H - 2));
  };
  const random = () => {
    const g = Array.from({length: H}, (_, y) => Array.from({length: W}, (_, x) => x === 0 || y === 0 || x === W - 1 || y === H - 1 ? '#' : R() < .08 ? '#' : '.'));
    for (const c of items) for (;;) { const [x, y] = cell(); if (g[y][x] === '.') { g[y][x] = c; break; } }
    return g.map(r => r.join(''));
  };
  const mutate = rows => {
    const g = rows.map(r => [...r]), [x, y] = cell(), [x2, y2] = cell();
    if (R() < .5) [g[y][x], g[y2][x2]] = [g[y2][x2], g[y][x]]; else if (g[y][x] === '.' || g[y][x] === '#') g[y][x] = g[y][x] === '#' ? '.' : '#';
    return g.map(r => r.join(''));
  };
  let keep = null;
  for (let round = 0; round < 6; round++) {  // a few fresh starts until the level is long enough (14 steps at least)
    let best = null, bs = -1;
    for (let i = 0; bs <= 0 && i < 400; i++) { const r = random(), s = score(r); if (s > bs) { best = r; bs = s; } }
    if (bs <= 0) continue;
    for (let i = 0; i < turns; i++) { const r = mutate(best), s = score(r); if (s >= bs && s > 0) { best = r; bs = s; } }
    const {lv, st} = omParse(best), sol = omSolve(lv, st, 400000);
    if (sol && (!keep || sol.length > keep.par)) keep = {name: 'Niveau du jour', par: sol.length, rows: best};
    if (keep && keep.par >= 14) break;
  }
  return keep;
}
/* /ombre:rand */
/* ondes:rand */
// a garden of the day once the 24 are done: a random solution (mirrors on the wave's path), the creatures put on it in the order the wave
// meets them, then odSolve checks the fewest mirrors; the best of a few tries (more mirrors, fewer ways to do it) is kept
const OD_KINDS = [
  {w: 10, h: 7, mir: [2, 3], beasts: [2, 3], range: 30, amps: 0, prisms: 0, fixed: [0, 1]},
  {w: 11, h: 7, mir: [2, 3], beasts: [2, 3], range: 7, amps: 1, prisms: 0, fixed: [0, 1]},
  {w: 11, h: 8, mir: [2, 3], beasts: [3, 4], range: 30, amps: 0, prisms: 1, fixed: [0, 1]},
  {w: 12, h: 8, mir: [3, 4], beasts: [3, 5], range: 8, amps: 1, prisms: 1, fixed: [1, 2]},
];
function odRandom(seed) {
  const c = OD_KINDS[seed % OD_KINDS.length], R = nmRng(seed), ri = (a, b) => a + Math.floor(R() * (b - a + 1));
  let best = null;
  for (let tries = 0, ok = 0; tries < 6000 && ok < 40; tries++) {
    const g = [...Array(c.h)].map((_, y) => [...Array(c.w)].map((_, x) => x === 0 || y === 0 || x === c.w - 1 || y === c.h - 1 ? '#' : '.'));
    const inner = () => [ri(1, c.w - 2), ri(1, c.h - 2)];
    for (let i = ri(3, 9); i--;) { const [x, y] = inner(); g[y][x] = '#'; }
    for (let i = ri(2, 7); i--;) { const [x, y] = inner(); g[y][x] = 'x'; }
    const put = ch => { for (let t = 0; t < 50; t++) { const [x, y] = inner(); if (g[y][x] === '.') { g[y][x] = ch; return; } } };
    put('^>v<'[ri(0, 3)]);
    for (let i = c.amps; i--;) put('A'); for (let i = c.prisms; i--;) put('X'); for (let i = ri(...c.fixed); i--;) put(R() < .5 ? '/' : '\\');
    const lv0 = odParse(g.map(r => r.join('')), 9, c.range); if (lv0.me == null) continue;
    const dec = new Map();
    for (let i = ri(...c.mir); i--;) {
      const cells = odRun(lv0, dec, false).steps.flat().map(p => p.k).filter(k => lv0.free.has(k) && !dec.has(k));
      if (!cells.length) break;
      dec.set(cells[ri(Math.min(1, cells.length - 1), cells.length - 1)], R() < .5 ? '/' : '\\');
    }
    const run = odRun(lv0, dec, false), when = new Map();
    run.steps.forEach((st, t) => st.forEach(p => { if (lv0.free.has(p.k) && !dec.has(p.k) && !when.has(p.k)) when.set(p.k, t); }));
    const lastMir = Math.max(...[...dec.keys()].map(k => run.steps.findIndex(st => st.some(p => p.k === k))));
    const spots = [...when].filter(([, t]) => t > 0), n = ri(...c.beasts); if (spots.length < n) continue;
    const pick = []; for (let t = 0; pick.length < n && t < 200; t++) { const sp = spots[ri(0, spots.length - 1)]; if (!pick.some(p => p[1] === sp[1] || p[0] === sp[0])) pick.push(sp); }
    if (pick.length < n || Math.max(...pick.map(p => p[1])) <= lastMir) continue;
    pick.sort((a, b) => a[1] - b[1]).forEach(([k], i) => { g[k / c.w | 0][k % c.w] = String(i + 1); });
    const rows = g.map(r => r.join('')), lv = odParse(rows, dec.size, c.range), sol = odSolve(lv, dec.size, true);
    if (!sol || sol.mirrors < 2) continue;
    const flat = run.steps.flat(), score = sol.mirrors * 3 + n * 2 - Math.log2(sol.count) * 2 - (lv.amps.size && !flat.some(p => lv.amps.has(p.k)) ? 9 : 0) - (lv.prisms.size && !flat.some(p => lv.prisms.has(p.k)) ? 9 : 0);
    ok++; if (!best || score > best.score) best = {name: 'Jardin du jour', stock: sol.mirrors, range: c.range, rows, score};
  }
  return best;
}
/* /ondes:rand */
/* eclo:rand */
// a garden of the day once the 10 are done: holes, slope bands, mud, mushrooms and stones laid at random, fireflies spread out,
// the nest far from the start; kept only if the careful pilot finishes it without a fall in 14 to 40 s
function ecRandom(seed) {
  const R = nmRng(seed), ri = (a, b) => a + Math.floor(R() * (b - a + 1)), W = 16, H = 9;
  for (let tries = 0; tries < 300; tries++) {
    const g = [...Array(H)].map((_, y) => [...Array(W)].map((_, x) => x === 0 || y === 0 || x === W - 1 || y === H - 1 ? '#' : '.'));
    const rect = (w, h, ch) => { const x0 = ri(1, W - 1 - w), y0 = ri(1, H - 1 - h); for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) g[y][x] = ch; };
    for (let i = ri(1, 3); i--;) { const d = '^>v<'[ri(0, 3)], horiz = d === '>' || d === '<'; rect(horiz ? ri(4, 9) : ri(1, 3), horiz ? ri(1, 3) : ri(3, 6), d); }
    for (let i = ri(0, 2); i--;) rect(ri(2, 4), ri(2, 3), '~');
    for (let i = ri(3, 6); i--;) { const s = [[1, 2], [2, 1], [2, 2], [1, 3], [3, 1]][ri(0, 4)]; rect(s[0], s[1], 'O'); }
    for (let i = ri(2, 7); i--;) rect(1, 1, '#');
    const free = () => { for (let t = 0; t < 200; t++) { const x = ri(1, W - 2), y = ri(1, H - 2); if (g[y][x] === '.') return [x, y]; } return null; };
    for (let i = ri(0, 3); i--;) { const p = free(); if (p) g[p[1]][p[0]] = 'B'; }
    const S = free(); if (!S) continue; g[S[1]][S[0]] = 'S';
    let N = null; for (let t = 0; t < 60 && !N; t++) { const p = free(); if (p && Math.abs(p[0] - S[0]) + Math.abs(p[1] - S[1]) >= 9) N = p; }
    if (!N) continue; g[N[1]][N[0]] = 'N';
    const flies = [], want = ri(4, 5);
    for (let t = 0; t < 200 && flies.length < want; t++) { const p = free(); if (p && [S, N, ...flies].every(q => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) >= 3)) { flies.push(p); g[p[1]][p[0]] = '*'; } }
    if (flies.length < want) continue;
    const rows = g.map(r => r.join('')), lv = ecParse(rows), s = ecNew(lv);
    while (!s.won && s.t < 60 && s.falls === 0) { const [x, y] = ecBot(lv, s); ecStep(lv, s, x, y, 1 / 60); }
    if (s.won && s.falls === 0 && s.t >= 14 && s.t <= 40) return {name: 'Jardin du jour', rows};
  }
  return null;
}
/* /eclo:rand */
// after the campaign, one level of the day made from the date (the same all day, kept in the save); a moment to make it (up to ~3 s for Pas d'ombre)
async function nmDaily(day, make, salt) {
  const today = omToday();
  if (day.rnd?.date !== today || !day.rnd.lvl) { await new Promise(r => setTimeout(r, 60)); const seed = +today.replace(/-/g, '') * 7 + salt; day.rnd = {date: today, lvl: make(seed) || make(seed + 1)}; petSave(); }
  return day.rnd.lvl;
}
const nmPick = (day, list, make, salt) => (day.lv || 0) < list.length ? list[day.lv || 0] : nmDaily(day, make, salt);
// « 3/24 · LE DÉTOUR » during the campaign, then « NIVEAU DU JOUR »
const nmStage = (day, n, lvl) => ((day.lv || 0) < n ? `${(day.lv || 0) + 1}/${n} · ` : '') + lvl.name.toUpperCase();
const nmInfo = (d, n, word) => ((d?.lv || 0) < n ? `${word} ${(d?.lv || 0) + 1} / ${n}` : `${word} du jour, tiré au hasard`) + ` · ${(d?.stars || []).reduce((a, b) => a + (b || 0), 0)} ★`;
/* ---------- the games of the day: each one can be played once a day (a little XP each time); the card says which are left ---------- */
const NM_GAMES = [
  {id: 'ombre', name: 'Pas d’ombre', what: 'NeoMe ne vit que dans l’ombre : pousse caisses et lanternes jusqu’à sa coquille.', play: () => nmOmbre(),
    info: () => nmInfo(pet.ombre, OM_LEVELS.length, 'niveau'), done: () => pet.ombre?.done === omToday()},
  {id: 'ondes', name: 'Ondes de minuit', what: 'Pose des miroirs pour que l’onde du casque réveille les créatures du jardin, chacune à son tour.', play: () => nmOndes(),
    info: () => nmInfo(pet.ondes, OD_LEVELS.length, 'jardin'), done: () => pet.ondes?.done === omToday()},
  {id: 'eclo', name: 'Éclosion', what: 'Penche le jardin de nuit : la coquille roule vers les lucioles, puis jusqu’au nid, sans tomber dans les trous.', play: () => nmEclo(),
    info: () => nmInfo(pet.eclo, EC_LEVELS.length, 'jardin'), done: () => pet.eclo?.done === omToday()}
];
function nmGamesRender() {
  const box = view.querySelector('#nmMain .nmGames'); if (!box || !pet) return;
  const mid = new Date(); mid.setHours(24, 0, 0, 0); const left = Math.max(0, mid - Date.now()), h = left / 36e5 | 0, m = (left / 6e4 | 0) % 60;
  box.replaceChildren(el('h3', '', 'JEUX DU JOUR'), ...NM_GAMES.map(gm => {
    const done = gm.done(), card = el('div', 'nmGame1' + (done ? ' done' : ''));
    card.append(el('div', 'label', gm.name.toUpperCase()), el('div', 'hint', gm.what), el('small', '', gm.info()));
    const b = el('button', 'btn px' + (done ? '' : ' main'), done ? `✓ FAIT · REVIENT DANS ${h} H ${String(m).padStart(2, '0')}` : 'JOUER');
    b.disabled = done; b.onclick = () => { if (gm.done()) return; b.textContent = 'UN INSTANT…'; gm.play().finally(nmGamesRender).catch(e => console.error('NeoMe, ' + gm.id + ' :', e)); };
    card.append(b); return card;
  }));
}
/* ---------- the plugin's tab: its level and the wardrobe (a big NeoMe to dress, items by slot, hover one to try it on) ---------- */
let nmSlot = 'tout', nmTry = null;
function nmDoll(box, wear) {
  const a = COS.find(o => o.id === wear.aura), base = box.querySelector('img');
  cosLayers(box, base, wear); auraOn(base, a);
}
function nmTryOn() {  // what the big NeoMe shows: what he wears, plus the item under the pointer 
  const w = cosWorn(); if (!nmTry) return w;
  return {...w, [nmTry.slot]: nmTry.id};
}
const nmPreview = () => { const box = view.querySelector('.nmDoll'); if (box) nmDoll(box, nmTryOn()); };
function nmRender() {
  const box = view.querySelector('#nmMain'); if (!box || !pet) return;
  const lv = petLevel(pet.xp), lo = 8 * (lv - 1) ** 2, hi = 8 * lv ** 2, on = cosOn(), next = COS.find(c => c.lv > lv);
  box.querySelector('.nmName').textContent = pet.name + ' · niveau ' + lv;
  box.querySelector('.nmXp i').style.width = Math.round((pet.xp - lo) / (hi - lo) * 100) + '%';
  box.querySelector('.nmXpTxt').textContent = `${pet.xp - lo} / ${hi - lo} XP vers le niveau ${lv + 1} · ${COS.filter(cosOk).length} / ${COS.length} tenues` + (next ? ` · prochaine : ${next.name} (niveau ${next.lv})` : '');
  box.querySelector('.nmTabs').replaceChildren(...['tout', ...Object.keys(COS_SLOTS)].map(s => {
    const b = el('button', 'nmTab' + (nmSlot === s ? ' on' : ''), s === 'tout' ? 'Tout' : COS_SLOTS[s]);
    b.onclick = () => { nmSlot = s; nmRender(); }; return b;
  }));
  const ward = box.querySelector('.nmWard'); ward.replaceChildren();
  for (const c of COS.filter(c => nmSlot === 'tout' || c.slot === nmSlot)) {
    const ok = cosOk(c), worn = on[c.slot] === c.id;
    const b = el('button', 'nmItem' + (ok ? '' : ' locked') + (worn ? ' on' : '')), mini = el('div', 'nmMini'), face = el('img');
    face.alt = ''; mini.append(face); nmDoll(mini, {[c.slot]: c.id});
    b.append(mini, el('span', '', c.name), el('small', '', !ok ? '🔒 niveau ' + c.lv : worn ? 'porté ✓' : COS_SLOTS[c.slot]));
    b.onclick = () => cosToggle(c);
    b.onpointerenter = () => { nmTry = c; nmPreview(); }; b.onpointerleave = () => { nmTry = null; nmPreview(); };
    ward.append(b);
  }
  nmPreview();
}
function nmView() {
  const box = el('div'); box.id = 'nmMain';
  box.innerHTML = `<div class="nmCard"><div><div class="label nmName"></div><div class="nmXp"><i></i></div><div class="hint nmXpTxt"></div>
    <div class="hint">Il gagne de l'XP quand tu t'occupes de lui : câlins, repas, balle, musique, jeux du jour… </div></div></div>
    <div class="nmGames"></div>
    <div class="nmDress"><div class="nmStage"><div class="nmDoll"><img alt=""></div><button class="btn px nmOff">Tout retirer</button></div>
    <div class="nmSide"><h3>GARDE-ROBE</h3><div class="nmTabs"></div><div class="nmWard"></div></div></div>`;
  box.querySelector('.nmOff').onclick = () => { pet.wear = {}; petSave(); cosWear(); nmRender(); };
  const wrap = view.querySelector('.appWrap'); wrap.classList.add('nmApp'); wrap.append(box);
  nmRender(); nmGamesRender(); setInterval(nmGamesRender, 60000);
}
view.__nm = {view: () => view.querySelector('#nmMain'), pet: () => pet, ombre: null, play: id => NM_GAMES.find(g => g.id === id).play(), levels: () => OM_LEVELS, om: {omParse, omStep, omSolve, omWon}, odLevels: () => OD_LEVELS, od: {odParse, odRun, odSolve}, ecLevels: () => EC_LEVELS, ec: {ecParse, ecNew, ecStep, ecBot}, rand: {omRandom, odRandom, ecRandom}};  // pour l'auto-test
if (window.neo && !W2) cosLoad().catch(e => console.error('NeoMe, garde-robe :', e)).then(petStart).then(nmView).catch(e => console.error('pet:', e));
  // ---- fin ----
  view.querySelector('#nmToggle').onclick = () => petToggle();
  ctx.onClose(() => { document.getElementById('pet')?.remove(); document.getElementById('petStyle')?.remove(); });
}
