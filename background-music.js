(() => {
  const COLORS = ['#e76e55', '#209cee', '#92cc41', '#f7d51d'];

  const NOTE_SVGS = [
    { w: 5,  h: 14, body: '<rect x="0" y="10" width="5" height="4"/><rect x="4" y="0" width="1" height="11"/>' },
    { w: 8,  h: 14, body: '<rect x="0" y="10" width="5" height="4"/><rect x="4" y="0" width="1" height="11"/><rect x="5" y="0" width="2" height="1"/><rect x="6" y="1" width="2" height="1"/><rect x="7" y="2" width="1" height="2"/>' },
    { w: 15, h: 14, body: '<rect x="0" y="10" width="5" height="4"/><rect x="10" y="10" width="5" height="4"/><rect x="4" y="2" width="1" height="9"/><rect x="14" y="2" width="1" height="9"/><rect x="4" y="0" width="11" height="2"/>' },
  ];

  const LAYERS = [
    { count: 22, scale: [2.0, 2.6], dur: [75, 105] },
    { count: 14, scale: [3.6, 4.6], dur: [22, 34] },
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (lo, hi) => lo + Math.random() * (hi - lo);

  document.body.classList.add('music-notes-interactive');

  const layer = document.createElement('div');
  layer.id = 'music-notes';
  layer.setAttribute('aria-hidden', 'true');

  for (const cfg of LAYERS) {
    for (let i = 0; i < cfg.count; i++) {
      const tpl = pick(NOTE_SVGS);
      const scale = rand(cfg.scale[0], cfg.scale[1]);
      const dur   = rand(cfg.dur[0], cfg.dur[1]);

      const note = document.createElement('span');
      note.className = 'note';
      note.innerHTML = '<svg width="' + (tpl.w * scale) + '" height="' + (tpl.h * scale) +
                       '" viewBox="0 0 ' + tpl.w + ' ' + tpl.h +
                       '" xmlns="http://www.w3.org/2000/svg">' + tpl.body + '</svg>';

      note.style.setProperty('--top',    rand(0, 100) + 'vh');
      note.style.setProperty('--left',   rand(0, 100) + 'vw');
      note.style.setProperty('--dur',    dur + 's');
      note.style.setProperty('--delay',  (-rand(0, dur)) + 's');
      note.style.setProperty('--accent', pick(COLORS));

      note.addEventListener('mouseenter', () => {
        note.style.setProperty('--accent', pick(COLORS));
      });

      layer.appendChild(note);
    }
  }

  document.body.appendChild(layer);
})();
