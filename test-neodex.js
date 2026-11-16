// lancé par le test « local » de NeoDex : le grand NeoMe suit l'écran, la garde-robe montre les 17 auras,
// débloqués par le niveau de NeoMe, et rien ne déborde
module.exports = async ({ js: pj0, sleep, shot = async () => {} }) => {
  let step = 'début'; const pj = async c => { try { return await pj0(c); } catch (e) { throw new Error(step + ' : ' + e.message); } };  // NeoMe vit dans la page de NeoDex (pas dans un cadre)
  let ok = false; for (let i = 0; i < 20 && !(ok = await pj(`!!document.querySelector('#nmMain .nmDoll img')?.naturalWidth`)); i++) await sleep(300);
  const r = await pj(`(() => { const d = document.querySelector('#nmMain .nmDoll');
    return { doll: Math.round(d.getBoundingClientRect().width), items: document.querySelectorAll('#nmMain .nmItem').length,
      locked: document.querySelectorAll('#nmMain .nmItem.locked').length, byLevel: [...document.querySelectorAll('#nmMain .nmItem small')].filter(s => /(niveau|level) \\d+/.test(s.textContent)).length,
      over: [...document.querySelectorAll('.nmApp *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length }; })()`);
  if (!ok || r.doll < 190) throw new Error('grand NeoMe absent ou trop petit : ' + JSON.stringify(r));
  if (r.items !== 17 || r.locked !== r.byLevel) throw new Error('garde-robe incomplète : ' + JSON.stringify(r));
  if (r.over) throw new Error(r.over + ' élément(s) débordent à droite');
  // une aura sur le grand NeoMe au survol ; celles qui changent de couleur bougent
  await pj(`[...document.querySelectorAll('#nmMain .nmItem')].at(-1).dispatchEvent(new PointerEvent('pointerenter'))`); await sleep(300);
  const au = await pj(`(() => { const i = document.querySelector('#nmMain .nmDoll img'); return { f: i.style.filter, anim: i.getAnimations().filter(a => a.id === 'aura').length }; })()`);
  if (!/drop-shadow/.test(au.f) || au.anim !== 1) throw new Error('l’aura survolée ne va pas sur le grand NeoMe : ' + JSON.stringify(au));
  // Pas d'ombre : chaque niveau a une solution ; le niveau du jour se joue avec celle du solveur, puis le jeu est fait pour aujourd'hui
  const N = `[...document.querySelectorAll('*')].find(e => e.__nm).__nm`;
  step = 'niveaux'; const bad = await pj(`(() => { const m = ${N}, o = m.om; return m.levels().map((l, i) => { const {lv, st} = o.omParse(l.rows), s = o.omSolve(lv, st, 300000); return !s ? i + 1 + ' impossible' : s.length !== l.par ? i + 1 + ' par ' + s.length : ''; }).filter(Boolean); })()`);
  if (bad.length) throw new Error('niveaux faux : ' + bad.join(', '));
  const xp0 = await pj(`${N}.pet().xp`);
  step = 'ouverture'; await pj(`${N}.play('ombre').catch(e => { throw new Error(e.stack.slice(0, 300)); })`); await sleep(800);
  const c = await pj(`(() => { const cv = document.querySelector('#nmMain .omGame canvas'); if (!cv) return null; const b = cv.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), bottom: Math.round(b.bottom), H: innerHeight, right: Math.round(b.right), W: innerWidth }; })()`);
  if (!c || c.w < 300 || c.right > c.W + 1) throw new Error("Pas d'ombre ne s'affiche pas bien : " + JSON.stringify(c));
  step = 'solution'; const sol = await pj(`(() => { const m = ${N}, l = m.ombre.lv, o = m.om; return o.omSolve(l, m.ombre.state(), 300000); })()`);
  for (const [i, d] of sol.entries()) { await pj(`${N}.ombre.go(${d})`); await sleep(160); if (i === sol.length >> 1) await shot('ombre'); }
  await sleep(900);
  const w = await pj(`({ won: ${N}.ombre.won(), xp: ${N}.pet().xp, end: !!document.querySelector('#nmMain .omGame .nmEnd.on'), card: document.querySelector('#nmMain .nmGame1 button')?.textContent })`);
  if (!w.won || !w.end || w.xp <= xp0 || !/FAIT|DONE/.test(w.card)) throw new Error("fin de Pas d'ombre : " + JSON.stringify(w));
  // Ondes de minuit : chaque jardin se fait avec le nombre de miroirs annoncé ; un essai sans miroir rate, la solution du solveur réveille tout le monde
  step = 'jardins'; const badO = await pj(`(() => { const m = ${N}, o = m.od; return m.odLevels().map((l, i) => { const s = o.odSolve(o.odParse(l.rows, l.stock, l.range)); return !s ? i + 1 + ' impossible' : s.mirrors !== l.stock ? i + 1 + ' : ' + s.mirrors + ' miroirs' : ''; }).filter(Boolean); })()`);
  if (badO.length) throw new Error('jardins faux : ' + badO.join(', '));
  step = 'ondes'; await pj(`document.querySelector('#nmMain .omGame .nmEnd button').click()`); await sleep(300);
  const xp1 = await pj(`${N}.pet().xp`);
  const pe = await pj(`(() => { try { ${N}.play('ondes'); return ''; } catch (e) { return e.stack.slice(0, 400); } })()`); if (pe) throw new Error(pe); await sleep(800);
  const O = `${N}.ondes`;
  await pj(`${O}.play()`); for (let i = 0; i < 40 && await pj(`${O}.playing()`); i++) await sleep(250);
  const miss = await pj(`({ won: ${O}.won(), head: document.querySelector('#nmMain .odGame .omMoves').textContent })`);
  if (miss.won || !/essai 2|try 2/.test(miss.head)) throw new Error('un essai sans miroir devrait rater : ' + JSON.stringify(miss));
  const osol = await pj(`(() => { const m = ${N}, lv = m.ondes.lv; return m.od.odSolve(lv).sol; })()`);
  for (const [k, mm] of osol) await pj(`${O}.place(${k}, ${JSON.stringify(mm)})`);
  await pj(`${O}.play()`); await sleep(700); await shot('ondes');
  for (let i = 0; i < 40 && await pj(`${O}.playing()`); i++) await sleep(250);
  await sleep(1200);
  const ow = await pj(`({ won: ${O}.won(), xp: ${N}.pet().xp, end: !!document.querySelector('#nmMain .odGame .nmEnd.on'), card: [...document.querySelectorAll('#nmMain .nmGame1 button')][1]?.textContent })`);
  if (!ow.won || !ow.end || ow.xp <= xp1 || !/FAIT|DONE/.test(ow.card)) throw new Error('fin des Ondes : ' + JSON.stringify(ow));
  // Éclosion : le pilote automatique finit chaque jardin ; un trou fait tomber et ramène à la dernière luciole ; une vraie partie au pilote
  step = 'jardins de nuit'; const badE = await pj(`(() => { const m = ${N}, o = m.ec; return m.ecLevels().map((l, i) => { const lv = o.ecParse(l.rows), s = o.ecNew(lv); while (!s.won && s.t < 180) { const [x, y] = o.ecBot(lv, s); o.ecStep(lv, s, x, y, 1 / 60); } return s.won ? '' : i + 1 + ' pas fini'; }).filter(Boolean); })()`);
  if (badE.length) throw new Error('jardins de nuit faux : ' + badE.join(', '));
  const fall = await pj(`(() => { const o = ${N}.ec, lv = o.ecParse(${N}.ecLevels()[0].rows), s = o.ecNew(lv), k = lv.rows.join('').indexOf('O'); s.x = k % lv.w + .5; s.y = (k / lv.w | 0) + .5; o.ecStep(lv, s, 0, 0, 1 / 60); const f = s.falls; for (let i = 0; i < 60; i++) o.ecStep(lv, s, 0, 0, 1 / 60); return {f, back: s.x === lv.start[0] && s.y === lv.start[1]}; })()`);
  if (fall.f !== 1 || !fall.back) throw new Error('chute dans un trou : ' + JSON.stringify(fall));
  step = 'éclosion'; await pj(`document.querySelector('#nmMain .omGame .nmEnd button').click()`); await sleep(300);
  const xp2 = await pj(`${N}.pet().xp`);
  const pe2 = await pj(`(() => { try { ${N}.play('eclo'); return ''; } catch (e) { return e.stack.slice(0, 400); } })()`); if (pe2) throw new Error(pe2); await sleep(800);
  await pj(`${N}.eclo.auto(true)`); await sleep(5000); await shot('eclo');
  for (let i = 0; i < 120 && !await pj(`${N}.eclo.won()`); i++) await sleep(500);
  await sleep(900);
  const ew = await pj(`({ won: ${N}.eclo.won(), t: ${N}.eclo.state().t, xp: ${N}.pet().xp, end: !!document.querySelector('#nmMain .odGame .nmEnd.on'), card: [...document.querySelectorAll('#nmMain .nmGame1 button')][2]?.textContent })`);
  if (!ew.won || !ew.end || ew.xp <= xp2 || !/FAIT|DONE/.test(ew.card)) throw new Error("fin d'Éclosion : " + JSON.stringify(ew));
  // après la campagne : un niveau du jour tiré au hasard, valable (3 dates par jeu), puis un jardin d'Ondes au hasard joué jusqu'au bout
  step = 'niveaux du jour'; const rnd = await pj(`(() => { const m = ${N}, R = m.rand, out = [];
    for (const seed of [141828812, 141828819, 141828826]) {
      const a = R.omRandom(seed + 1), b = R.odRandom(seed + 2), c = R.ecRandom(seed + 3);
      if (!a) out.push('ombre ' + seed + ' : rien'); else { const {lv, st} = m.om.omParse(a.rows), s = m.om.omSolve(lv, st, 400000); if (!s || s.length !== a.par || a.par < 10) out.push('ombre ' + seed + ' : ' + (s && s.length) + '/' + a.par); }
      if (!b) out.push('ondes ' + seed + ' : rien'); else { const s = m.od.odSolve(m.od.odParse(b.rows, b.stock, b.range)); if (!s || s.mirrors !== b.stock) out.push('ondes ' + seed); }
      if (!c) out.push('éclosion ' + seed + ' : rien'); else { const o = m.ec, lv = o.ecParse(c.rows), s = o.ecNew(lv); while (!s.won && s.t < 90) { const [x, y] = o.ecBot(lv, s); o.ecStep(lv, s, x, y, 1 / 60); } if (!s.won) out.push('éclosion ' + seed); }
    } return out; })()`);
  if (rnd.length) throw new Error('niveaux du jour faux : ' + rnd.join(', '));
  await pj(`document.querySelector('#nmMain .omGame .nmEnd button').click()`); await sleep(300);
  await pj(`(() => { const p = ${N}.pet(); p.ondes = {lv: ${N}.odLevels().length, done: '', stars: []}; })()`);
  const pe3 = await pj(`(() => { try { ${N}.play('ondes'); return ''; } catch (e) { return e.stack.slice(0, 400); } })()`); if (pe3) throw new Error(pe3); await sleep(1200);
  const rh = await pj(`document.querySelector('#nmMain .odGame .omHead .label')?.textContent || ''`);
  if (!/JARDIN DU JOUR|GARDEN OF THE DAY/.test(rh)) throw new Error('pas de jardin du jour après la campagne : ' + rh);
  for (const [k, mm] of await pj(`${N}.od.odSolve(${N}.ondes.lv).sol`)) await pj(`${N}.ondes.place(${k}, ${JSON.stringify(mm)})`);
  await pj(`${N}.ondes.play()`); for (let i = 0; i < 40 && await pj(`${N}.ondes.playing()`); i++) await sleep(250);
  if (!await pj(`${N}.ondes.won()`)) throw new Error('jardin du jour pas gagné avec la solution');
  return `NeoMe de ${r.doll} px, ${r.items} tenues dont ${r.locked} à débloquer par le niveau, Pas d'ombre gagné en ${sol.length} pas (${c.w}×${c.h} px), Ondes gagné avec ${osol.length} miroirs au 2e essai, Éclosion finie au pilote en ${ew.t.toFixed(1)} s, niveaux du jour bons et jardin du jour gagné`;
};
