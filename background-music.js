(() => {
  const COLORS = ['#e76e55', '#209cee', '#92cc41', '#f7d51d'];

  const LAYERS = [
    { count: 22, scale: [2.0, 2.6], dur: [75, 105] },
    { count: 14, scale: [3.6, 4.6], dur: [22, 34] },
  ];

  const choose_random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (lo, hi) => lo + Math.random() * (hi - lo);

  // pixel-art note shapes, unscaled. draw_random_note scales the svg.
  const generate_quarter_note_shape = () => ({
    w: 5, h: 14,
    body: `
      <rect x="0" y="10" width="5" height="4"/>
      <rect x="4" y="0"  width="1" height="11"/>
    `,
  });

  const generate_eighth_note_shape = () => ({
    w: 8, h: 14,
    body: `
      <rect x="0" y="10" width="5" height="4"/>
      <rect x="4" y="0"  width="1" height="11"/>
      <rect x="5" y="0"  width="2" height="1"/>
      <rect x="6" y="1"  width="2" height="1"/>
      <rect x="7" y="2"  width="1" height="2"/>
    `,
  });

  const generate_sixteenth_note_shape = () => ({
    w: 15, h: 14,
    body: `
      <rect x="0"  y="10" width="5"  height="4"/>
      <rect x="10" y="10" width="5"  height="4"/>
      <rect x="4"  y="2"  width="1"  height="9"/>
      <rect x="14" y="2"  width="1"  height="9"/>
      <rect x="4"  y="0"  width="11" height="2"/>
    `,
  });

  const NOTE_SHAPE_GENERATORS = [
    generate_quarter_note_shape,
    generate_eighth_note_shape,
    generate_sixteenth_note_shape,
  ];

  const generate_note_shape = () => choose_random(NOTE_SHAPE_GENERATORS)();


  // spawn one note. css keyframe `note-fall` drives the falling motion.
  const draw_random_note = (layer) => {
    const shape = generate_note_shape();
    const scale = rand(layer.scale[0], layer.scale[1]);
    const dur   = rand(layer.dur[0],   layer.dur[1]);

    const note = document.createElement('span');
    note.className = 'note';
    note.innerHTML = `
      <svg width="${shape.w * scale}" height="${shape.h * scale}"
           viewBox="0 0 ${shape.w} ${shape.h}"
           xmlns="http://www.w3.org/2000/svg">${shape.body}</svg>
    `;

    note.style.setProperty('--top',    rand(0, 100) + 'vh');
    note.style.setProperty('--left',   rand(0, 100) + 'vw');
    note.style.setProperty('--dur',    dur + 's');
    note.style.setProperty('--delay',  (-rand(0, dur)) + 's');
    note.style.setProperty('--accent', choose_random(COLORS));

    note.addEventListener('mouseenter', () => {
      note.style.setProperty('--accent', choose_random(COLORS));
    });

    return note;
  };

  // runs once at startup, then css takes over the animation.
  const initialize_notes = (container) => {
    for (const layer of LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        container.appendChild(draw_random_note(layer));
      }
    }
  };

  document.body.classList.add('music-notes-interactive');

  const field = document.createElement('div');
  field.id = 'music-notes';
  field.setAttribute('aria-hidden', 'true');

  initialize_notes(field);
  document.body.appendChild(field);
})();
