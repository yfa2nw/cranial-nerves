// ─────────────────────────────────────────────────────────────
//  Fibre-type explainer popup: name decoder · nucleus columns · tips
// ─────────────────────────────────────────────────────────────

const Fibres = (() => {
  const LETTERS = {
    g: { G: ['General', 'Found all over the body — spinal nerves carry these too'],
         S: ['Special', 'Head-only: special senses, or muscles from the pharyngeal arches'] },
    s: { S: ['Somatic', 'Body wall: skin, joints, skeletal muscle from somites'],
         V: ['Visceral', 'Organs, glands, smooth muscle — and, by tradition, arch muscles and taste'] },
    a: { A: ['Afferent', 'Toward the brain — sensory. A = arrives'],
         E: ['Efferent', 'Away from the brain — motor. E = exits'] }
  };

  // medial → lateral, the order of the nucleus columns
  const COLS = ['GSE', 'SVE', 'GVE', 'GVA', 'SVA', 'GSA', 'SSA'];
  const INFO = {
    GSE: { what: 'Skeletal muscle that grew from somites — the eye muscles and the tongue', col: 'Most medial motor column', nuclei: ['III', 'IV', 'VI', 'XII'], extra: '' },
    SVE: { what: 'Muscles from the pharyngeal arches — chewing, facial expression, pharynx, larynx', col: 'Motor column, ventrolateral', nuclei: ['motor V', 'facial', 'ambiguus'], extra: 'Many texts call it "branchial motor"' },
    GVE: { what: 'Parasympathetic — always two neurons, with a synapse in a ganglion near the target', col: 'Motor column, next to the sulcus limitans', nuclei: ['EW', 'SSN', 'ISN', 'DMN X'], extra: '' },
    GVA: { what: 'Sensation from organs — carotid sinus, heart, lungs, gut; mostly unconscious', col: 'First sensory column', nuclei: ['solitary', '(caudal)'], extra: '' },
    SVA: { what: 'Taste — and smell, by tradition', col: 'Shares the solitary nucleus with GVA', nuclei: ['solitary', '(rostral)'], extra: 'Smell (I) is SVA by tradition but skips the solitary nucleus — it goes to olfactory cortex; some texts call it SSA' },
    GSA: { what: 'Touch, pain, temperature and proprioception from skin and mucosa', col: 'Lateral sensory column', nuclei: ['mesenceph.', 'principal', 'spinal V'], extra: '' },
    SSA: { what: 'Vision, hearing and balance', col: 'Most lateral column', nuclei: ['vestibular', 'cochlear'], extra: '' }
  };

  const TIPS = [
    ['⇆', 'Medial motor, lateral sensory', 'The sulcus limitans splits motor columns (basal plate) from sensory ones (alar plate) — the spinal cord’s ventral and dorsal horns, opened like a book at the 4th ventricle.'],
    ['▥', 'One column, many nerves', 'Each fibre type has its own nucleus column; nerves just borrow from it. All head touch and pain lands in the trigeminal nuclei — even when it travels in VII, IX or X.'],
    ['◇', 'All visceral sensation → one nucleus', 'GVA and SVA both end in the solitary nucleus: taste at the top, gut and heart lower down.'],
    ['⌒', 'Arches predict SVE', '1st arch → V · 2nd → VII · 3rd → IX · 4th–6th → X. A muscle keeps the nerve of the arch it came from.'],
    ['●', 'GVE is a two-neuron chain', 'Preganglionic from the brainstem, then a synapse in a gold ganglion — ciliary, pterygopalatine, submandibular, otic, or in the organ wall.'],
    ['⊘', 'There is no SSE', '"Special" means head-only, and the head has no somatic motor tissue of its own — so that combination never occurs.'],
    ['⟷', 'Sympathetics are guests', 'No cranial nerve has its own. Postganglionic fibres from the superior cervical ganglion hitch rides — the dashed passengers.'],
    ['✎', 'Newer names', 'Somatic motor, branchial motor, visceral motor, visceral sensory, special sensory… same columns, plainer words.']
  ];

  let sel = { g: 'G', s: 'S', a: 'E' }, built = false;
  const code = () => sel.g + sel.s + sel.a;

  function columnsSVG() {
    // motor columns left of the sulcus limitans (x 340), sensory columns right of it, with clearance both sides
    const x = (i) => (i < 3 ? 40 + i * 100 : 350 + (i - 3) * 97);
    const cols = COLS.map((k, i) => {
      const c = FIBERS[k].color;
      const lines = INFO[k].nuclei.map((n, j) => `<text x="${x(i) + 45}" y="${116 + j * 14}" class="fx-nuc">${n}</text>`).join('');
      return `<g class="fx-col" data-col="${k}" style="--c:${c}">
        <rect x="${x(i)}" y="58" width="90" height="118" rx="14"/>
        <text x="${x(i) + 45}" y="90" class="fx-code">${k}</text>${lines}</g>`;
    }).join('');
    // .fx-lab centres text via CSS, so left-aligned labels need an inline text-anchor
    return `
    <svg viewBox="0 0 760 252" class="fx-cols">
      <path class="fx-v4" d="M30,14 L740,14 L740,40 L352,40 L340,50 L328,40 L30,40 Z"/>
      <text x="385" y="31" class="fx-lab dim">FLOOR OF THE 4TH VENTRICLE</text>
      <path class="fx-mid" d="M30,8 L30,244"/>
      <path class="fx-sl" d="M340,50 L340,226"/>
      ${cols}
      <path class="fx-brk" d="M40,190 L40,198 L330,198 L330,190"/><text x="185" y="214" class="fx-lab">BASAL PLATE · MOTOR</text>
      <path class="fx-brk" d="M350,190 L350,198 L731,198 L731,190"/><text x="540" y="214" class="fx-lab">ALAR PLATE · SENSORY</text>
      <text x="38" y="242" class="fx-lab dim" style="text-anchor:start">◂ MIDLINE · MEDIAL</text>
      <text x="340" y="242" class="fx-lab">SULCUS LIMITANS</text>
      <text x="730" y="242" class="fx-lab dim" style="text-anchor:end">LATERAL ▸</text>
    </svg>`;
  }

  function build() {
    const seg = (key) => `<div class="fx-seg" data-k="${key}">${Object.entries(LETTERS[key]).map(([L, [w]]) =>
      `<button class="seg-b" data-l="${L}"><b>${L}</b>${w}</button>`).join('')}</div>`;
    const el = document.createElement('div');
    el.id = 'fibreModal';
    el.className = 'fx-back';
    el.innerHTML = `
    <div class="fx-panel glass" role="dialog" aria-modal="true" aria-labelledby="fxTitle">
      <button class="fx-close" aria-label="Close">✕</button>
      <h2 id="fxTitle">How fibre types are named</h2>
      <p class="fx-lead">Each fibre type has its own function.</p>

      <section class="fx-dec">
        <div class="fx-q"><span class="fx-n">1</span><span>Found everywhere, or head-only?</span>${seg('g')}</div>
        <div class="fx-q"><span class="fx-n">2</span><span>Body wall, or organs?</span>${seg('s')}</div>
        <div class="fx-q"><span class="fx-n">3</span><span>Toward the brain, or away?</span>${seg('a')}</div>
        <div class="fx-out" id="fxOut"></div>
      </section>

      <h3>Where they come from</h3>
      <p class="fx-lead">Every type has its own column of nuclei. Click a column.</p>
      ${columnsSVG()}

      <h3>Patterns worth knowing</h3>
      <div class="fx-tips">${TIPS.map(([i, t, d]) => `<div class="fx-tip"><i>${i}</i><b>${t}</b><p>${d}</p></div>`).join('')}</div>
    </div>`;
    document.body.appendChild(el);
    fillOut();

    el.addEventListener('click', e => {
      if (e.target === el || e.target.closest('.fx-close')) return close();
      const b = e.target.closest('.fx-seg .seg-b');
      if (b) { sel[b.parentElement.dataset.k] = b.dataset.l; paint(); return; }
      const col = e.target.closest('[data-col]');
      if (col) { set(col.dataset.col); }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    built = true;
  }

  function set(t) { sel = { g: t[0], s: t[1], a: t[2] }; paint(); }

  // one result panel per letter combination
  function outHTML(t) {
    const letters = ['g', 's', 'a'].map((k, i) =>
      `<span class="fx-let"><b>${t[i]}</b><em>${LETTERS[k][t[i]][0]}</em><small>${LETTERS[k][t[i]][1]}</small></span>`).join('');
    if (!FIBERS[t]) {
      return `<div class="fx-code-big none">${t}</div><div class="fx-letters">${letters}</div>
        <div class="fx-res"><h4>Doesn’t exist</h4><p>"Special" means head-only, and the head has no somatic motor tissue of its own — all skeletal muscle there is GSE (somites) or SVE (arches).</p></div>`;
    }
    const f = FIBERS[t], inf = INFO[t];
    const nerves = Object.values(NERVES).filter(n => n.fibers.includes(t)).map(n => n.id);
    return `
      <div class="fx-code-big" style="--c:${f.color}">${t}</div>
      <div class="fx-letters">${letters}</div>
      <div class="fx-res" style="--c:${f.color}">
        <h4>${f.name}</h4><p>${inf.what}</p>
        <div class="fx-meta"><span><b>Column</b>${inf.col}</span><span><b>Nuclei</b>${inf.nuclei.join(' ').replace(' (', ' · ').replace(')', '')}</span>
          <span><b>Carried by</b>${nerves.length ? nerves.map(n => `<button class="fx-nv" data-select="${n}">${n}</button>`).join('') : '—'}${inf.extra ? ` <em>${inf.extra}</em>` : ''}</span></div>
      </div>`;
  }

  // all eight panels are stacked in one grid cell, so the box keeps the height of the longest
  function fillOut() {
    const codes = [];
    'GS'.split('').forEach(g => 'SV'.split('').forEach(s => 'AE'.split('').forEach(a => codes.push(g + s + a))));
    document.getElementById('fxOut').innerHTML = codes.map(t => `<div class="fx-v" data-t="${t}">${outHTML(t)}</div>`).join('');
  }

  function paint() {
    const t = code();
    document.querySelectorAll('#fibreModal .fx-seg').forEach(s =>
      s.querySelectorAll('.seg-b').forEach(b => b.classList.toggle('on', b.dataset.l === sel[s.dataset.k])));
    document.querySelectorAll('#fibreModal [data-col]').forEach(c => c.classList.toggle('on', c.dataset.col === t));
    document.querySelectorAll('#fxOut .fx-v').forEach(v => v.classList.toggle('on', v.dataset.t === t));
  }

  function open(t) {
    if (!built) build();
    if (t && FIBERS[t] && t !== 'SYM') set(t); else paint();
    document.getElementById('fibreModal').classList.add('on');
    document.body.classList.add('modal-open');
  }
  function close() {
    document.getElementById('fibreModal')?.classList.remove('on');
    document.body.classList.remove('modal-open');
  }

  return { open, close };
})();
