// lancé par le test « local » de NeoDex : le grand NeoMe s'affiche à une taille qui suit l'écran, la garde-robe vide reste cachée, rien ne déborde
module.exports = async ({ js: pj, sleep }) => {  // NeoMe vit dans la page de NeoDex (pas dans un cadre)
  let ok = false; for (let i = 0; i < 20 && !(ok = await pj(`!!document.querySelector('#nmMain .nmDoll img')?.naturalWidth`)); i++) await sleep(300);
  const r = await pj(`(() => { const d = document.querySelector('#nmMain .nmDoll'), side = document.querySelector('#nmMain .nmSide');
    return { doll: Math.round(d.getBoundingClientRect().width), bottom: Math.round(d.getBoundingClientRect().bottom), h: innerHeight, side: side && getComputedStyle(side).display, tabs: document.querySelectorAll('#nmMain .nmTab').length,
      over: [...document.querySelectorAll('.nmApp *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length }; })()`);
  if (!ok || r.doll < 190) throw new Error('grand NeoMe absent ou trop petit : ' + JSON.stringify(r));
  if (r.side !== 'none') throw new Error('la garde-robe vide est affichée : ' + JSON.stringify(r));
  if (r.over) throw new Error(r.over + ' élément(s) débordent à droite');
  await sleep(1000);
  return 'NeoMe de ' + r.doll + ' px (fenêtre de ' + r.h + ' px de haut), garde-robe vide cachée';
};
