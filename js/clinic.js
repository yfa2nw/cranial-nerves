// ─────────────────────────────────────────────────────────────
//  Shared pieces of the clinical cards (Movements, Face):
//  circuit segments, chain lighting, lesion markers, the
//  What & why panel and the "try this" pulses.
// ─────────────────────────────────────────────────────────────

const Clinic = {
  // circuit segments keyed by name: { f, tip, d, fwd? }
  segs(defs) {
    return Object.entries(defs).map(([k, s]) =>
      `<g class="seg cs ${s.f} ${s.fwd ? 'fwd' : ''}" data-c="${k}" data-tip="${s.tip}"><path class="halo" d="${s.d}"/><path class="base" d="${s.d}"/><path class="flow" d="${s.d}"/><path class="hit" d="${s.d}"/></g>`).join('');
  },

  // a chain lights up only until its first lesioned segment, which flashes
  paint(root, chains, blk) {
    if (!root) return;
    const act = new Set(), tried = new Set();
    for (const ch of chains) {
      for (const k of ch) {
        if (blk.includes(k)) { tried.add(k); break; }
        act.add(k);
      }
    }
    root.querySelectorAll('[data-c]').forEach(el => {
      const k = el.dataset.c;
      el.classList.toggle('act', act.has(k));
      el.classList.toggle('blk', blk.includes(k));
      el.classList.toggle('tried', tried.has(k));
    });
  },

  marks(el, marks) {
    if (!el) return;
    el.innerHTML = marks.map(([x, y, t]) => lesion(x, y, t)).join('');
    padHits(el);
  },

  // d = { name, where, see[], why[], try: { text } }; tag = optional nerve badge
  explain(box, d, empty, tag = '') {
    if (!box) return;
    box.innerHTML = d ? `
      <div class="ex-head"><b>${d.name}</b><span class="where">${d.where}</span>${tag ? `<span class="nb-tag">${tag}</span>` : ''}</div>
      <div class="ex-try"><span>try</span>${d.try.text}</div>
      <div class="ex-cols">
        <div class="ex-col"><h5><i>◉</i>What you see</h5><ul>${d.see.map(s => `<li>${s}</li>`).join('')}</ul></div>
        <div class="ex-col why"><h5><i>⚙</i>Why it happens</h5><ol>${d.why.map(s => `<li>${s}</li>`).join('')}</ol></div>
      </div>`
      : `<p class="ex-empty">${empty}</p>`;
  },

  // pulse the controls whose data-<attr> value is in keys
  suggest(scope, attrs, keys) {
    scope.querySelectorAll(attrs.map(a => `[data-${a}]`).join(',')).forEach(el =>
      el.classList.toggle('suggest', keys.includes(attrs.map(a => el.dataset[a]).find(v => v !== undefined))));
  },

  act: (k) => `<span class="act ${k}">${k === 'hover' ? '◌ hover' : '● click'}</span>`,

  sw: (key, attr, on, icon, label, tip) =>
    `<button class="switch ck ${on ? 'on' : ''}" data-${attr}="${key}" data-tip="${tip}"><span class="sw-ic">${icon}</span>${label}<span class="track"><span class="knob"></span></span></button>`,

  // ── findings strip: explicit results for each test
  // items: [{ k, label, icon, kind: 'lr' | 'tongue' | 'val' }]
  findings(items) {
    const body = (it) =>
      it.kind === 'lr' ? `<div class="lr"><span class="cell" data-side="R"><b>R</b><em>—</em></span><span class="cell" data-side="L"><b>L</b><em>—</em></span></div>`
      : it.kind === 'tongue' ? Clinic.tongueMap()
      : it.kind === 'field' ? `<div class="fieldbox untested">${Clinic.fieldSVG('none')}</div>`
      : `<div class="lr"><span class="cell wide"><em>—</em></span></div>`;
    return `<div class="findings">${items.map(it =>
      `<div class="fd" id="fd-${it.k}"><div class="fd-h"><i>${it.icon}</i>${it.label}</div>${body(it)}<small class="fd-note"></small></div>`).join('')}</div>`;
  },

  // visual field circle (unit radius), drawn as the patient sees it: left half = left field
  FIELD: {
    none: '', all: 'M0,-1 A1,1 0 1,0 0,1 A1,1 0 1,0 0,-1 Z',
    leftHalf: 'M0,-1 A1,1 0 0,0 0,1 Z', rightHalf: 'M0,-1 A1,1 0 0,1 0,1 Z', lowerHalf: 'M-1,0 A1,1 0 0,0 1,0 Z',
    ulq: 'M0,0 L0,-1 A1,1 0 0,0 -1,0 Z', llq: 'M0,0 L-1,0 A1,1 0 0,0 0,1 Z',
    urq: 'M0,0 L1,0 A1,1 0 0,0 0,-1 Z', lrq: 'M0,0 L0,1 A1,1 0 0,0 1,0 Z',
    leftSpare: 'M0,-1 A1,1 0 0,0 0,1 Z', central: 'M-.36,0 A.36,.36 0 1,0 .36,0 A.36,.36 0 1,0 -.36,0 Z',
    blindL: 'M-.78,0 A.3,.24 0 1,0 -.18,0 A.3,.24 0 1,0 -.78,0 Z', blindR: 'M.18,0 A.3,.24 0 1,0 .78,0 A.3,.24 0 1,0 .18,0 Z'
  },
  fieldSVG(def = 'none', attrs = '') {
    return `<svg viewBox="-1.2 -1.2 2.4 2.4" class="fmap" ${attrs}><circle r="1" class="fm-bg"/>
      <path class="fm-def" d="${Clinic.FIELD[def] || ''}"/>${def === 'leftSpare' ? '<circle r=".3" class="fm-bg"/>' : ''}
      <path class="fm-axis" d="M-1,0 H1 M0,-1 V1"/><circle r="1" class="fm-ring"/></svg>`;
  },
  setField(k, def, tested) {
    const box = document.querySelector(`#fd-${k} .fieldbox`);
    if (!box) return;
    box.innerHTML = Clinic.fieldSVG(def);
    box.classList.toggle('untested', !tested);
  },

  // tongue seen from the front, tip up · patient's right on the viewer's left
  tongueMap() {
    return `<svg viewBox="0 0 64 76" class="tmap">
      <path class="tz" data-z="aR" d="M32,4 C18,4 8,16 8,32 L8,50 L32,50 Z"/>
      <path class="tz" data-z="aL" d="M32,4 C46,4 56,16 56,32 L56,50 L32,50 Z"/>
      <path class="tz" data-z="pR" d="M8,50 C8,62 18,72 32,72 L32,50 Z"/>
      <path class="tz" data-z="pL" d="M56,50 C56,62 46,72 32,72 L32,50 Z"/>
      <path class="tsulc" d="M10,46 L32,56 L54,46"/>
      <text x="32" y="30" class="tzl">VII</text><text x="32" y="67" class="tzl">IX</text>
    </svg>`;
  },

  // state: 'ok' ✓ · 'part' ◐ · 'no' ✗ · '' not tested
  setCell(k, side, state, text) {
    const cell = document.querySelector(`#fd-${k} .cell${side ? `[data-side="${side}"]` : ''}`);
    if (!cell) return;
    // side cells are narrow: symbol only (meaning goes in the note); the wide cell shows text too
    const sym = { ok: '✓', part: '◐', no: '✗' }[state];
    cell.className = `cell ${side ? '' : 'wide'} ${state}`;
    cell.title = text || '';
    cell.querySelector('em').textContent = state ? (side ? sym : `${sym} ${text}`) : '—';
  },
  // "R absent · L present" from per-side [state, text] pairs
  sides(r, l) {
    return [['R', r], ['L', l]].filter(([, v]) => v[0]).map(([s, v]) => `${s} ${v[1]}`).join(' · ');
  },
  setZones(k, zones) {
    document.querySelectorAll(`#fd-${k} .tz`).forEach(z => { z.setAttribute('class', `tz ${zones[z.dataset.z] || ''}`); });
  },
  setNote(k, text) {
    const n = document.querySelector(`#fd-${k} .fd-note`);
    if (n) n.textContent = text;
  },

  explainShell: () =>
    `<section class="step step-explain"><div class="step-h"><span class="sn">3</span><b>What &amp; why</b></div><div class="explain" id="explain"></div></section>`
};
