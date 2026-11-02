// ─────────────────────────────────────────────────────────────
//  Shared pieces of the clinical cards:
//  circuit segments, chain lighting, lesion markers, the examination panel, the
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

  // ── examination panel: one tile per test, naming what you do and showing what you find.
  // Every result is always shown; hovering a tile acts that test out on the patient.
  // groups: [{ n: group label, mine?: bool, tests: [{ k, label, icon, tip?, field? }] }]
  //   k = test key (used for data-test, result id and "try this" pulses) · field = tile shows a mini visual field
  exam(groups, num = 2) {
    const tile = (t) => `<div class="xt" data-test="${t.k}"${t.tip ? ` data-tip="${t.tip}"` : ''}>
      <i>${t.icon}</i><b>${t.label}</b><span class="xr" id="xr-${t.k}">${t.field ? `<span class="xf">${Clinic.fieldSVG('none')}</span>` : ''}<em>—</em></span></div>`;
    return `<section class="step step-exam">
      <div class="step-h"><span class="sn">${num}</span><b>Examine</b>${Clinic.act('hover')}<small>every result shown · hover a test to watch it on the patient</small></div>
      <div class="xt-groups">${groups.map(g => `<div class="xt-grp ${g.mine ? 'mine' : ''}">
        <span class="xt-n">${g.n}</span><div class="xt-list">${g.tests.map(tile).join('')}</div></div>`).join('')}</div>
    </section>`;
  },

  // write one test's result · state: 'ok' ✓ · 'part' ◐ · 'no' ✗ · field = defect key for a field tile
  result(k, state, text, field) {
    const r = document.getElementById(`xr-${k}`);
    if (!r) return;
    r.closest('.xt').dataset.state = state || '';
    r.querySelector('em').textContent = `${{ ok: '✓', part: '◐', no: '✗' }[state] || ''} ${text}`.trim();
    if (field !== undefined) r.querySelector('.xf').innerHTML = Clinic.fieldSVG(field);
  },

  // hovering a test tile calls cb(testKey); leaving the panel calls cb(null)
  probe(root, cb) {
    const panel = root.querySelector('.xt-groups');
    if (!panel) return;
    let cur = null;
    panel.addEventListener('mouseover', e => {
      const k = e.target.closest('[data-test]')?.dataset.test || null;
      if (k !== cur) { cur = k; cb(k); }
    });
    panel.addEventListener('mouseleave', () => { if (cur) { cur = null; cb(null); } });
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
  // the same defects in words
  FIELD_WORDS: {
    none: 'full field', all: 'blind', leftHalf: 'left half lost', rightHalf: 'right half lost', lowerHalf: 'lower half lost',
    ulq: 'upper-left quarter lost', llq: 'lower-left quarter lost', urq: 'upper-right quarter lost', lrq: 'lower-right quarter lost',
    leftSpare: 'left half lost, centre spared', central: 'central scotoma', blindL: 'enlarged blind spot', blindR: 'enlarged blind spot'
  },
  fieldSVG(def = 'none', attrs = '') {
    return `<svg viewBox="-1.2 -1.2 2.4 2.4" class="fmap" ${attrs}><circle r="1" class="fm-bg"/>
      <path class="fm-def" d="${Clinic.FIELD[def] || ''}"/>${def === 'leftSpare' ? '<circle r=".3" class="fm-bg"/>' : ''}
      <path class="fm-axis" d="M-1,0 H1 M0,-1 V1"/><circle r="1" class="fm-ring"/></svg>`;
  },

  explainShell: (n = 3) =>
    `<section class="step step-explain"><div class="step-h"><span class="sn">${n}</span><b>What &amp; why</b></div><div class="explain" id="explain"></div></section>`
};
