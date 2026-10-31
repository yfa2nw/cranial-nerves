// ─────────────────────────────────────────────────────────────
//  How-to popup: quick start · clickable page map · how to read
//  the drawings · keyboard shortcuts
// ─────────────────────────────────────────────────────────────

const Help = (() => {
  const QUICK = [
    ['◎', 'Pick a nerve', 'Click a numeral in the header — or press ← / →. Everything on the page switches to that nerve.'],
    ['⟿', 'Follow the stage', 'Brainstem on the left, skull base in the middle, target on the right. Hover anything; sparks show which way signals travel.'],
    ['▦', 'Read the cards', 'i – iii zoom into key places along the route. v is the nerve’s signature idea, made interactive.'],
    ['⚡', 'Try a lesion', 'In the clinical card: pick a lesion, run the tests, then read what happens and why.']
  ];

  // page-map regions: [title, what it is, how to use it (bullets), tip]
  const PARTS = {
    picker: ['Nerve picker', 'The twelve nerves, grouped by where they work: special senses, orbit, face, neck.',
      ['Click a disc to load that nerve across the whole page', 'Coloured dots under a numeral = the fibre types it carries', '← / → step through I → XII'],
      'Scroll down and a slim copy follows you at the top of the screen.'],
    reading: ['Reading bar', 'Background popups, grouped by purpose.',
      ['Foundations — how fibre types are named; foramina, ganglia & passenger fibres', 'How the senses work — smell, sight, hearing, taste, each a step-through of the physiology', 'Look up an abbreviation — a searchable list (press /)'],
      'Choosing a nerve closes any open popup.'],
    legend: ['Fibre types', 'One colour per fibre type, used everywhere on the page.',
      ['Solid chip — carried by this nerve', 'Dashed chip — a passenger riding along inside it', 'Faint chip — not in this nerve', 'Click a chip to hide those fibres on the stage'],
      'The “Fibre types” popup explains what G/S, S/V and A/E mean.'],
    route: ['Pathway strip', 'Every station of the nerve in order, from nucleus to target.',
      ['Hover a station to spotlight it on the stage', 'Click it to scroll the stage into view'],
      'Read left to right, it is the nerve’s whole journey in one line.'],
    stage: ['Stage', 'The whole course in one picture: brainstem (left) → skull base and foramina (middle) → target organ (right). Smell and sight get their own layouts.',
      ['Hover any structure for a note; hovering a fibre highlights its whole nerve', 'White sparks travel in the direction of conduction', 'Region medals (circled numerals) switch nerves too'],
      'Dotted lines run inside the brainstem; beaded lines are postganglionic.'],
    tools: ['Stage tools', 'Four switches in the stage’s top-right corner.',
      ['Labels — show or hide text', 'Context — neighbouring nerves drawn faintly for orientation', 'Impulses — the moving sparks (off = lightest on your computer)', 'Isolate — hide every nerve but the selected one'],
      ''],
    cards: ['Cards i – iii', 'Close-ups of the places that matter for this nerve — a brainstem cross-section at its nucleus, then key passages such as the cavernous sinus, a foramen or the internal acoustic meatus.',
      ['Hover parts for notes', 'Red ⚡ markers are classic lesion sites — hover them'],
      'They change with every nerve.'],
    clinic: ['Clinical card iv', 'A patient to examine, a circuit diagram and an explanation — in three steps.',
      ['1 · Pick a lesion (click; click again to clear)', '2 · Test: ◌ hover to perform an action, ● click to switch a test on or off', 'Results land in the findings strip; the circuit lights up to the first broken link', '3 · What & why explains the signs'],
      'Pulsing buttons are the tests worth trying for the chosen lesion.'],
    sig: ['Signature card v', 'One idea that defines the nerve, made interactive — the ciliary ganglion, the VOR, the carotid sinus reflex, the recurrent laryngeal loop…',
      ['Use its buttons or switches to run it', 'The badges summarise the nerve’s high-yield facts'],
      ''],
    mini: ['Sticky bar', 'Appears at the top once the nerve picker scrolls out of view.',
      ['Current nerve on the left', 'Click a numeral to switch nerve without losing your place', 'Jump to Stage, Cards, Clinic or Signature'],
      '']
  };

  const KEYS = [['← →', 'previous / next nerve'], ['/', 'look up an abbreviation'], ['?', 'this help'], ['Esc', 'close a popup']];

  let part = 'stage', built = false;

  // a wireframe of the page; each block opens its explanation
  function mapSVG() {
    const r = (k, x, y, w, h, label, cls = '') => `<g class="hm-r ${cls}" data-part="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>${label ? `<text x="${x + w / 2}" y="${y + h / 2 + 3.5}">${label}</text>` : ''}</g>`;
    return `
    <svg viewBox="0 0 360 536" class="hm-map">
      ${r('mini', 10, 4, 340, 20, 'sticky bar · on scroll', 'ghost')}
      <g class="hm-static"><rect x="10" y="32" width="100" height="44" rx="5"/><text x="60" y="51">title</text><text x="60" y="66" class="sm">+ ? help</text></g>
      ${r('picker', 116, 32, 234, 44, 'nerve picker')}
      ${r('reading', 10, 82, 340, 20, 'reading bar · popups')}
      ${r('legend', 10, 108, 340, 20, 'fibre types')}
      ${r('route', 10, 134, 340, 24, 'pathway strip')}
      ${r('stage', 10, 164, 340, 116, '')}
      <g class="hm-zones"><path d="M124,190 L124,274 M236,190 L236,274"/><text x="67" y="236">brainstem</text><text x="180" y="236">skull base</text><text x="293" y="236">target</text></g>
      <text x="20" y="182" class="hm-lab">STAGE</text>
      ${r('tools', 270, 170, 74, 18, 'tools')}
      ${r('cards', 10, 288, 110, 60, 'i')}${r('cards', 125, 288, 110, 60, 'ii')}${r('cards', 240, 288, 110, 60, 'iii')}
      ${r('clinic', 10, 356, 340, 96, 'iv · clinical')}
      ${r('sig', 10, 460, 340, 70, 'v · signature')}
    </svg>`;
  }

  function partHTML([title, what, how, tip]) {
    return `<div class="hp-card"><h4>${title}</h4><p class="hp-what">${what}</p>
      <ul>${how.map(h => `<li>${h}</li>`).join('')}</ul>${tip ? `<p class="hp-tip">${tip}</p>` : ''}</div>`;
  }

  // what the colours, lines and shapes mean
  function legendHTML() {
    const line = (style, label) => `<span class="hl-i"><svg width="44" height="12"><path d="M2,6 H42" style="${style}"/></svg>${label}</span>`;
    const fibres = Object.entries(FIBERS).map(([k, f]) => `<span class="hl-f" style="--c:${f.color}"><i></i><b>${k}</b>${f.role}</span>`).join('');
    const shapes = [['nucleus', 'nucleus'], ['sganglion', 'sensory ganglion · no synapse'], ['ganglion', 'autonomic ganglion · synapse'], ['foramen', 'foramen'], ['muscle', 'muscle'], ['gland', 'gland'], ['lesion', 'lesion site']]
      .map(([k, l]) => `<span class="hl-i">${ico(k, 24)}${l}</span>`).join('');
    return `
      <div class="hl-grp"><span class="cg-l">Fibre colours</span><div class="hl-row">${fibres}</div></div>
      <div class="hl-grp"><span class="cg-l">Line styles</span><div class="hl-row">
        ${line('stroke:#ff5f87;stroke-width:3.5;stroke-linecap:round', 'nerve')}
        ${line('stroke:#ff5f87;stroke-width:3;stroke-dasharray:1 6;stroke-linecap:round', 'inside the brainstem')}
        ${line('stroke:#ffb547;stroke-width:3.6;stroke-dasharray:.1 6.5;stroke-linecap:round', 'postganglionic')}
        ${line('stroke:#9aa6bd;stroke-width:2;stroke-dasharray:5 5', 'sympathetic passenger')}
        ${line('stroke:#ff4d4d;stroke-width:2.4;stroke-dasharray:2 5', 'cut by a lesion (circuits)')}
        <span class="hl-i"><svg width="44" height="12"><path d="M2,6 H42" style="stroke:#55c6ff;stroke-width:3"/><circle cx="30" cy="6" r="1.6" fill="#fff"/></svg>white spark = direction of conduction</span>
      </div></div>
      <div class="hl-grp"><span class="cg-l">Shapes</span><div class="hl-row">${shapes}</div></div>
      <div class="hl-grp"><span class="cg-l">Controls</span><div class="hl-row">
        <span class="hl-i"><span class="act hover">◌ hover</span>do it while the pointer is on it</span>
        <span class="hl-i"><span class="act click">● click</span>switch on / off or choose</span>
        <span class="hl-i"><span class="hl-pulse"></span>pulsing = worth trying next</span>
      </div></div>`;
  }

  function build() {
    const el = Info.modal('helpModal', 'hpTitle', `
      <h2 id="hpTitle">How to use this page</h2>
      <p class="fx-lead">A map of the twelve cranial nerves: their course, their anatomy and what happens when they fail.</p>

      <h3><span class="ol-k">1</span>Quick start</h3>
      <div class="hq">${QUICK.map(([i, t, d], n) => `<div class="hq-s"><span class="hq-n">${n + 1}</span><i>${i}</i><b>${t}</b><p>${d}</p></div>`).join('')}</div>

      <h3><span class="ol-k">2</span>The page, part by part</h3>
      <p class="fx-lead">Click any part of the map.</p>
      <div class="hm">
        ${mapSVG()}
        <div class="fg-stack" id="hpStack">${Object.entries(PARTS).map(([k, p]) => `<div class="fg-v" data-k="${k}">${partHTML(p)}</div>`).join('')}</div>
      </div>

      <h3><span class="ol-k">3</span>Reading the drawings</h3>
      ${legendHTML()}

      <h3><span class="ol-k">4</span>Keyboard</h3>
      <div class="hk">${KEYS.map(([k, d]) => `<span><kbd>${k}</kbd>${d}</span>`).join('')}</div>`,
      e => { const p = e.target.closest('[data-part]'); if (p) { part = p.dataset.part; paint(); } }, close);
    built = !!el;
  }

  function paint() {
    document.querySelectorAll('#helpModal .hm-r').forEach(r => r.classList.toggle('on', r.dataset.part === part));
    document.querySelectorAll('#hpStack > .fg-v').forEach(v => v.classList.toggle('on', v.dataset.k === part));
  }

  function open() {
    if (!built) build();
    paint();
    Info.show('helpModal');
  }
  function close() { Info.hide('helpModal'); }

  return { open, close };
})();
