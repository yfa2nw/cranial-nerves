// ─────────────────────────────────────────────────────────────
//  "Where is the lesion?" popup: tick the findings, the map lights up
//  the sites that explain them best. Cranial nerve signs are taken to be
//  on the patient's right, so brainstem lesions sit in the right half.
// ─────────────────────────────────────────────────────────────

const Localise = (() => {
  // findings, grouped as they'd be found at the bedside
  const F = {
    'Cranial nerves · right side': {
      II: 'Vision lost in one eye', III: 'III palsy — down & out, ptosis', IV: 'IV palsy — vertical diplopia', VI: 'VI palsy — can’t abduct',
      V: 'Face numb', VIIl: 'Whole half of face weak', VIIu: 'Lower face weak, forehead spared', VIII: 'Hearing loss · tinnitus',
      vert: 'Vertigo · nystagmus', IXX: 'Hoarse · dysphagia · uvula deviates', XI: 'Weak shrug · head turn', XII: 'Tongue deviates to the right',
      horner: 'Horner syndrome'
    },
    'Eye movements': { gaze: 'Neither eye looks right', ino: 'Right eye can’t adduct (INO)', upgaze: 'Can’t look up · light–near dissociation' },
    'Body': {
      hemi: 'Left arm & leg weak', hemiSame: 'Right arm & leg weak', hemiS: 'Left body: pain & temperature lost', dcol: 'Left body: vibration & position lost',
      ataxia: 'Right limbs clumsy', ataxiaC: 'Left limbs: tremor · ataxia', field: 'Right homonymous field loss'
    },
    'Other clues': {
      proptosis: 'Proptosis · chemosis', pain: 'Pain behind the eye or ear', fatigue: 'Fatigable · worse in the evening', drowsy: 'Drowsy · falling GCS',
      brisk: 'Brisk jaw jerk · emotional lability', fasc: 'Wasted, fasciculating tongue'
    }
  };
  const FL = Object.assign({}, ...Object.values(F));

  // core: what makes the syndrome · opt: often present too · zone: where it sits on the map
  const S = {
    cortex:  { name: 'Left cortex / internal capsule', zone: 'hemL', core: ['VIIu', 'hemiSame'], opt: ['field', 'XII'],
      cause: 'MCA stroke, lacune in the internal capsule, tumour',
      why: 'An upper motor neuron face with arm and leg weak on the same side: the lesion is above the brainstem, in the opposite hemisphere. The forehead is spared because each half of it is driven from both hemispheres.' },
    pseudo:  { name: 'Both hemispheres — pseudobulbar palsy', zone: 'hemB', core: ['brisk', 'IXX'], opt: ['VIIu', 'hemiSame'],
      cause: 'Bilateral strokes, motor neurone disease, MS',
      why: 'Bulbar muscles need upper motor neuron input from both sides, so it takes damage to both corticobulbar tracts. Spastic, slow tongue; brisk jaw jerk and gag; laughing or crying out of proportion.' },
    weber:   { name: 'Midbrain base — Weber', zone: 'mbCrus', core: ['III', 'hemi'], opt: [],
      cause: 'Posterior cerebral artery perforators',
      why: 'III fascicles leave through the cerebral peduncle, right beside the corticospinal tract — which crosses lower down, in the medulla. Same-side III, opposite-side weakness.' },
    benedikt:{ name: 'Midbrain tegmentum — Benedikt / Claude', zone: 'mbTeg', core: ['III', 'ataxiaC'], opt: ['hemi'],
      cause: 'Posterior cerebral artery branches',
      why: 'III fascicles pass through the red nucleus and the crossed cerebellar outflow, so the tremor and ataxia are on the other side. Reaching the peduncle too adds weakness (Benedikt).' },
    parinaud:{ name: 'Dorsal midbrain — Parinaud', zone: 'mbTect', core: ['upgaze'], opt: ['drowsy'],
      cause: 'Pineal tumour, hydrocephalus, stroke',
      why: 'The vertical gaze centres and posterior commissure sit at the top of the midbrain. Upgaze fails, pupils react to near but not light, and attempted upgaze gives convergence–retraction nystagmus.' },
    foville: { name: 'Dorsal pons — Foville', zone: 'ponsDors', core: ['gaze', 'VIIl'], opt: ['hemi', 'V', 'horner'],
      cause: 'Basilar branches, MS, tumour',
      why: 'The VI nucleus is a gaze centre — it drives the same-side lateral rectus and, via the MLF, the opposite medial rectus — so both eyes fail to look right. VII fibres loop over it (facial colliculus).' },
    ino:     { name: 'MLF — internuclear ophthalmoplegia', zone: 'mlf', core: ['ino'], opt: ['vert'],
      cause: 'MS in the young, stroke in the old',
      why: 'The MLF carries the gaze command from the opposite VI nucleus up to this III nucleus. Looking left, the right eye lags; the left eye abducts with nystagmus. Convergence is preserved.' },
    millard: { name: 'Ventral pons — Millard–Gubler', zone: 'ponsBase', core: ['VI', 'VIIl', 'hemi'], opt: [],
      cause: 'Basilar perforators, tumour',
      why: 'VI and VII fascicles run forward through the basis pontis among the corticospinal fibres. Same-side VI and LMN VII, opposite-side weakness.' },
    aica:    { name: 'Lateral pons — AICA', zone: 'ponsLat', core: ['VIIl', 'VIII', 'hemiS'], opt: ['V', 'vert', 'horner', 'ataxia'],
      cause: 'Anterior inferior cerebellar artery occlusion',
      why: 'Like a lateral medullary syndrome one level up: crossed pain and temperature loss, Horner, ataxia — but with VII and VIII (AICA also supplies the inner ear).' },
    wallenberg: { name: 'Lateral medulla — Wallenberg', zone: 'medLat', core: ['IXX', 'V', 'hemiS'], opt: ['vert', 'horner', 'ataxia'],
      cause: 'Vertebral artery or PICA occlusion, dissection',
      why: 'Crossed sensory loss: the spinal V nucleus (same-side face) and the spinothalamic tract (opposite body, already crossed). Nucleus ambiguus → hoarseness, dysphagia. No weakness — the pyramids are medial.' },
    dejerine:{ name: 'Medial medulla — Dejerine', zone: 'medMed', core: ['XII', 'hemi'], opt: ['dcol'],
      cause: 'Anterior spinal or vertebral artery branches',
      why: 'Pyramid, medial lemniscus and XII rootlets lie beside the midline: the tongue deviates toward the lesion, the body is weak and loses position sense on the other side.' },
    bulbar:  { name: 'Both sides of the medulla — bulbar palsy', zone: 'medBoth', core: ['fasc', 'IXX'], opt: ['XII'],
      cause: 'Motor neurone disease, Guillain–Barré, syringobulbia',
      why: 'Lower motor neurons on both sides: a wasted, fasciculating tongue, absent gag, nasal speech and choking. Compare pseudobulbar palsy, where everything is brisk.' },
    optic:   { name: 'Optic nerve', zone: 'optic', core: ['II'], opt: ['pain'],
      cause: 'Optic neuritis (painful), AION, compression',
      why: 'One eye only, with an RAPD: the lesion is in front of the chiasm. Behind it, field loss involves both eyes.' },
    apex:    { name: 'Orbital apex', zone: 'apex', core: ['II', 'III', 'VI'], opt: ['IV', 'V', 'proptosis', 'pain'],
      cause: 'Tumour, fungal infection, inflammation',
      why: 'The optic canal and superior orbital fissure meet here — vision goes along with the eye-movement nerves and V1.' },
    sof:     { name: 'Superior orbital fissure', zone: 'sof', core: ['III', 'IV', 'VI', 'V'], opt: ['proptosis', 'pain'],
      cause: 'Trauma, tumour, inflammation',
      why: 'All three eye-movement nerves and V1 — but vision is spared, because the optic nerve has its own canal.' },
    cav:     { name: 'Cavernous sinus', zone: 'cav', core: ['III', 'VI'], opt: ['IV', 'V', 'horner', 'proptosis', 'pain'],
      cause: 'Thrombosis, carotid–cavernous fistula, pituitary apoplexy, tumour',
      why: 'III, IV, V1, V2 and VI pass through with the carotid sympathetic plexus. VI floats in the sinus and is hit first; VI with a Horner is a cavernous clue. Vision is spared.' },
    tent:    { name: 'Tentorial edge — uncal herniation', zone: 'tent', core: ['III', 'drowsy'], opt: ['hemi', 'hemiSame'],
      cause: 'Expanding haematoma, tumour, oedema — an emergency',
      why: 'The uncus presses III against the tentorium: the pupil dilates first (its fibres are on the outside). Weakness is usually opposite, but can be same-side when the far peduncle is pushed onto the edge (Kernohan notch).' },
    iii:     { name: 'III on its course — PComm', zone: 'iii', core: ['III'], opt: ['pain'],
      cause: 'PComm aneurysm (pupil involved, painful) · microvascular (pupil spared)',
      why: 'An isolated III palsy. A dilated pupil means compression until proved otherwise — the pupil fibres run on the outside of the nerve.' },
    petrous: { name: 'Petrous apex — Gradenigo', zone: 'petrous', core: ['VI', 'pain'], opt: ['V', 'VIIl'],
      cause: 'Petrous apicitis from otitis media',
      why: 'VI crosses the petrous tip in Dorello’s canal, next to the trigeminal ganglion: VI palsy, deep facial or retro-orbital pain, and a discharging ear.' },
    vi:      { name: 'VI on its long course', zone: 'vi', core: ['VI'], opt: [],
      cause: 'Raised intracranial pressure, microvascular, trauma',
      why: 'The longest intracranial course: it is stretched over the petrous ridge when pressure rises — a false localising sign.' },
    cpa:     { name: 'Cerebellopontine angle', zone: 'cpa', core: ['VIII'], opt: ['vert', 'V', 'VIIl', 'ataxia'],
      cause: 'Vestibular schwannoma, meningioma',
      why: 'VIII goes first (one-sided hearing loss, tinnitus), then V (the corneal reflex is lost early), then VII, then cerebellar signs as the mass grows.' },
    facial:  { name: 'Facial canal & beyond — Bell’s', zone: 'facial', core: ['VIIl'], opt: ['pain'],
      cause: 'Bell’s palsy, Ramsay Hunt (ear vesicles, pain), parotid tumour',
      why: 'The whole half of the face and nothing else. Taste, tearing and hyperacusis tell you how far up the canal it is.' },
    jugular: { name: 'Jugular foramen — Vernet', zone: 'jugular', core: ['IXX', 'XI'], opt: [],
      cause: 'Glomus tumour, metastasis, schwannoma',
      why: 'IX, X and XI leave together; XII has its own canal just below, so the tongue is spared.' },
    collet:  { name: 'Below the skull base — Collet–Sicard', zone: 'collet', core: ['IXX', 'XI', 'XII'], opt: ['horner'],
      cause: 'Carotid dissection, retroparotid tumour, condylar fracture',
      why: 'Just below the skull, IX–XII lie together beside the carotid. Add the sympathetic chain (Horner) and it is Villaret syndrome.' },
    xii:     { name: 'Hypoglossal canal & nerve', zone: 'xii', core: ['XII'], opt: ['fasc'],
      cause: 'Tumour, carotid dissection, trauma',
      why: 'An isolated lower motor neuron tongue: wasting and fasciculation on the right, deviation toward it.' },
    nmj:     { name: 'Neuromuscular junction — myasthenia', zone: 'nmj', core: ['fatigue'], opt: ['III', 'IV', 'VI', 'VIIl', 'IXX'],
      cause: 'Myasthenia gravis',
      why: 'Fits no single nerve, varies through the day, and the pupils are always spared. Not a nerve lesion at all.' }
  };

  const WHY = [
    ['Crossed signs mean brainstem', 'A cranial nerve on one side with arm and leg signs on the other: the nerve has not crossed yet, the long tracts already have (or will below). Face and body weak on the same side points above the brainstem.'],
    ['The nerve sets the level', 'III–IV: midbrain. V–VIII: pons. IX–XII: medulla. Find the lowest and highest nerve involved and the lesion spans them.'],
    ['Medial or lateral', 'Motor nuclei III, IV, VI and XII sit beside the midline with the corticospinal tract, medial lemniscus and MLF. Lateral are the spinothalamic tract, sympathetics, spinal V and cerebellar connections — sensory loss, Horner, ataxia, no weakness.'],
    ['Several nerves, no long tracts', 'Look where the nerves travel together: orbital apex, superior orbital fissure, cavernous sinus, cerebellopontine angle, jugular foramen. If no single place fits and it fatigues — think of the junction.']
  ];

  let sel = new Set(), pinned = null, built = false;

  // ranking: how much of the syndrome is present × how much of what you found it explains
  function rank() {
    if (!sel.size) return [];
    return Object.entries(S).map(([k, s]) => {
      const all = [...s.core, ...s.opt];
      const cover = s.core.filter(f => sel.has(f)).length / s.core.length;
      const explain = [...sel].filter(f => all.includes(f)).length / sel.size;
      return [k, cover * explain];
    }).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1] || S[b[0]].core.length - S[a[0]].core.length).slice(0, 3);
  }

  // ── map: hemispheres, three brainstem sections, places outside the brainstem ──
  const PLACES = ['optic', 'apex', 'sof', 'cav', 'tent', 'iii', 'petrous', 'vi', 'cpa', 'facial', 'jugular', 'collet', 'xii', 'nmj'];
  function mapSVG() {
    const z = (id, shape) => `<g class="wl-z" data-zone="${id}">${shape}</g>`;
    // level names sit in the empty left half of each section
    const sec = (x, y, t) => `<text x="${x}" y="${y}" class="wl-lv">${t}</text>`;
    const site = (zone) => Object.keys(S).find(k => S[k].zone === zone);
    const pills = PLACES.map((p, i) => {
      const y = 26 + i * 33 + (p === 'nmj' ? 10 : 0);
      return `<g class="wl-z wl-p ${p === 'nmj' ? 'nmj' : ''}" data-zone="${p}" data-site="${site(p)}"><rect x="318" y="${y}" width="222" height="26" rx="13"/>
        <text x="429" y="${y + 17}">${S[site(p)].name.split(' — ')[0]}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 560 500" class="wl-map">
      <text x="140" y="16" class="wl-hd">INSIDE THE BRAIN</text><text x="429" y="16" class="wl-hd">ON THE WAY OUT</text>
      <!-- hemispheres: viewed from above, left on the left -->
      ${z('hemB', `<path d="M138,32 C70,24 34,42 34,70 C34,92 70,104 138,98 Z M142,32 C210,24 246,42 246,70 C246,92 210,104 142,98 Z" class="wl-o"/>`)}
      <g class="wl-z wl-hit" data-zone="hemL" data-site="cortex"><path d="M138,32 C70,24 34,42 34,70 C34,92 70,104 138,98 Z"/></g>
      <text x="86" y="70" class="wl-s">L</text><text x="194" y="70" class="wl-s">R</text>
      <line x1="140" y1="112" x2="140" y2="408" class="wl-mid"/>
      <!-- midbrain: tectum on top, peduncles below -->
      <path d="M70,140 C70,116 100,110 140,110 C180,110 210,116 210,140 C210,170 196,190 172,190 C158,190 150,178 140,172 C130,178 122,190 108,190 C84,190 70,170 70,140 Z" class="wl-o"/>
      ${z('mbTect', '<ellipse cx="164" cy="122" rx="24" ry="9"/>')}
      ${z('mbTeg', '<circle cx="160" cy="148" r="13"/>')}
      ${z('mbCrus', '<ellipse cx="180" cy="176" rx="22" ry="11" transform="rotate(-22 180 176)"/>')}
      <!-- pons: fourth ventricle on top, basis below -->
      <path d="M48,250 C48,222 82,208 120,212 L140,222 L160,212 C198,208 232,222 232,250 C232,280 192,296 140,296 C88,296 48,280 48,250 Z" class="wl-o"/>
      ${z('ponsDors', '<ellipse cx="160" cy="236" rx="16" ry="9"/>')}
      ${z('mlf', '<circle cx="146" cy="250" r="5"/>')}
      ${z('ponsLat', '<ellipse cx="206" cy="246" rx="16" ry="20"/>')}
      ${z('ponsBase', '<ellipse cx="170" cy="276" rx="30" ry="13"/>')}
      <!-- medulla -->
      <path d="M78,362 C78,334 104,322 140,322 C176,322 202,334 202,362 C202,390 176,404 140,404 C104,404 78,390 78,362 Z" class="wl-o"/>
      ${z('medBoth', '<path d="M78,362 C78,334 104,322 140,322 C176,322 202,334 202,362 C202,390 176,404 140,404 C104,404 78,390 78,362 Z" class="wl-all"/>')}
      ${z('medLat', '<ellipse cx="178" cy="354" rx="17" ry="22"/>')}
      ${z('medMed', '<ellipse cx="151" cy="370" rx="9" ry="26"/>')}
      ${sec(104, 154, 'MIDBRAIN')}${sec(96, 258, 'PONS')}${sec(110, 366, 'MEDULLA')}
      ${pills}
      <text x="140" y="440" class="wl-note">cross-sections · right half = side of</text><text x="140" y="456" class="wl-note">the cranial nerve signs</text>
    </svg>`;
  }

  function cardHTML(k) {
    if (!k) return `<div class="wl-card empty"><h4>Pick some findings</h4><p>Tick what you found on the left, or click a place on the map to see what a lesion there causes.</p></div>`;
    const s = S[k];
    const chips = (fs, cls) => fs.map(f => `<span class="wl-c ${cls}">${FL[f]}</span>`).join('');
    return `<div class="wl-card"><h4>${s.name}</h4>
      <div class="wl-cs">${chips(s.core, 'core')}${chips(s.opt, '')}</div>
      <p>${s.why}</p><p class="wl-cause"><b>Causes</b>${s.cause}</p></div>`;
  }

  function tableHTML() {
    const nerves = (s) => [...s.core, ...s.opt].filter(f => /^(II|III|IV|V|VI|VII.|VIII|IXX|XI|XII)$/.test(f)).map(f => f.replace('IXX', 'IX · X').replace(/VII./, 'VII')).filter((v, i, a) => a.indexOf(v) === i).join(' · ') || '—';
    const other = (s) => [...s.core, ...s.opt].filter(f => !/^(II|III|IV|V|VI|VII.|VIII|IXX|XI|XII)$/.test(f)).map(f => FL[f]).join(' · ') || '—';
    return `<table class="rf-tab wl-tab"><thead><tr><th>Site</th><th>Nerves</th><th>Other findings</th></tr></thead><tbody>${Object.entries(S).map(([k, s]) =>
      `<tr data-site="${k}"><td>${s.name}</td><td>${nerves(s)}</td><td>${other(s)}</td></tr>`).join('')}</tbody></table>`;
  }

  function build() {
    Info.modal('lesionModal', 'wlTitle', `
      <h2 id="wlTitle">Where is the lesion?</h2>
      <p class="fx-lead">Tick what you find and the map lights up the places that explain it best. The cranial nerve signs are taken to be on the patient’s right.</p>
      <div class="wl-main">
        <div class="wl-find">${Object.entries(F).map(([g, fs]) => `<div class="wl-grp"><span class="cg-l">${g}</span>
          <div class="wl-row">${Object.entries(fs).map(([k, l]) => `<button class="wl-f" data-f="${k}">${l}</button>`).join('')}</div></div>`).join('')}
          <button class="pill wl-clear" data-clear="1">Clear all</button></div>
        <div class="wl-out">
          <div id="wlMap">${mapSVG()}</div>
          <div class="wl-rank" id="wlRank">${[0, 1, 2].map(i => `<div class="wl-r" data-i="${i}"><b></b><i><s></s></i><span></span></div>`).join('')}</div>
        </div>
      </div>
      <div class="fg-stack" id="wlCard">${['', ...Object.keys(S)].map(k => `<div class="fg-v" data-k="${k}">${cardHTML(k)}</div>`).join('')}</div>
      ${Info.why(WHY)}
      <h3>Classic patterns</h3>
      ${tableHTML()}`, onClick, close);
    built = true;
  }

  function onClick(e) {
    const f = e.target.closest('[data-f]');
    if (f) { sel.has(f.dataset.f) ? sel.delete(f.dataset.f) : sel.add(f.dataset.f); pinned = null; paint(); return; }
    if (e.target.closest('[data-clear]')) { sel.clear(); pinned = null; paint(); return; }
    const r = e.target.closest('.wl-r[data-site]');
    if (r) { pinned = r.dataset.site; paint(); return; }
    // a place on the map or a table row: load that syndrome's core findings
    const s = e.target.closest('[data-site]') || e.target.closest('.wl-z[data-zone]');
    if (s) {
      const k = s.dataset.site || Object.keys(S).find(x => S[x].zone === s.dataset.zone);
      if (!k) return;
      sel = new Set(S[k].core); pinned = k; paint();
      if (s.tagName === 'TR') document.querySelector('#lesionModal .wl-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function paint() {
    const root = document.getElementById('lesionModal');
    const top = rank();
    const show = pinned || top[0]?.[0] || '';
    root.querySelectorAll('[data-f]').forEach(b => b.classList.toggle('on', sel.has(b.dataset.f)));
    root.querySelectorAll('.wl-z').forEach(g => {
      const k = Object.keys(S).find(x => S[x].zone === g.dataset.zone);
      const i = top.findIndex(([t]) => t === k);
      g.classList.toggle('on', k === show);
      g.classList.toggle('cand', i > -1 && k !== show);
    });
    root.querySelectorAll('.wl-r').forEach((r, i) => {
      const t = top[i];
      r.classList.toggle('empty', !t);
      r.classList.toggle('on', !!t && t[0] === show);
      if (t) r.dataset.site = t[0]; else delete r.dataset.site;
      r.querySelector('b').textContent = t ? `${i + 1}` : '';
      r.querySelector('span').textContent = t ? S[t[0]].name : (i ? '' : 'No match yet');
      r.querySelector('s').style.width = t ? `${Math.round(t[1] * 100)}%` : '0';
    });
    root.querySelectorAll('.wl-tab tr[data-site]').forEach(r => r.classList.toggle('on', r.dataset.site === show));
    document.querySelectorAll('#wlCard > .fg-v').forEach(v => v.classList.toggle('on', v.dataset.k === show));
  }

  function open() {
    if (!built) build();
    paint();
    Info.show('lesionModal');
  }
  function close() { Info.hide('lesionModal'); }

  return { open, close };
})();
