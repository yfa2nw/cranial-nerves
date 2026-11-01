// ─────────────────────────────────────────────────────────────
//  Reflex arcs popup: afferent → brainstem centre → efferent for the
//  cranial nerve reflexes, with a cut-a-limb switch and a summary table.
// ─────────────────────────────────────────────────────────────

const Reflexes = (() => {
  // aff / eff: [nerve label, fibre type] · both: the response appears on both sides
  const R = {
    light: { name: 'Pupillary light', stim: 'Light into one eye', rec: 'Retina', aff: ['II', 'SSA'], centre: ['Pretectal nuclei', '→ both Edinger–Westphal'],
      eff: ['III · parasympathetic', 'GVE'], effector: 'Sphincter pupillae', both: true, response: 'Both pupils constrict — direct and consensual',
      affCut: 'Light in the affected eye: neither pupil constricts. Light in the other eye: both constrict. A partial lesion gives an RAPD.',
      effCut: 'The affected pupil stays dilated whichever eye is lit; the other pupil reacts normally.',
      tip: 'The swinging-light test compares the two afferent limbs.' },
    near: { name: 'Accommodation', stim: 'Looking at a near target', rec: 'Retina (blurred image)', aff: ['II', 'SSA'], centre: ['Visual cortex', '→ EW + MR subnuclei'],
      eff: ['III', 'GVE'], effector: 'Ciliary m. · sphincter · medial recti', both: true, response: 'Lens thickens, pupils constrict, eyes converge',
      affCut: 'A blind eye can’t drive the response, but the seeing eye still triggers it in both eyes.',
      effCut: 'III palsy: that eye neither constricts nor converges.',
      tip: 'Light–near dissociation (Argyll Robertson, Adie, Parinaud): the near pathway reaches EW by a different route and survives.' },
    corneal: { name: 'Corneal', stim: 'Touching the cornea', rec: 'Cornea', aff: ['V1 · nasociliary', 'GSA'], centre: ['Spinal & principal V', '→ both facial nuclei'],
      eff: ['VII', 'SVE'], effector: 'Orbicularis oculi', both: true, response: 'Both eyes blink',
      affCut: 'Touch the affected cornea: neither eye blinks. Touch the other: both blink.',
      effCut: 'Whichever cornea is touched, the affected eye can’t blink — the other one does.',
      tip: 'Often the earliest sign of a cerebellopontine angle tumour (V compressed).' },
    lacrimal: { name: 'Lacrimation', stim: 'Irritating the cornea or conjunctiva', rec: 'Cornea · conjunctiva', aff: ['V1', 'GSA'], centre: ['Spinal V', '→ superior salivatory'],
      eff: ['VII · greater petrosal', 'GVE'], effector: 'Lacrimal gland', both: false, response: 'Tears (relayed in the pterygopalatine ganglion)',
      affCut: 'Irritating the numb eye produces no tears.',
      effCut: 'A dry eye on that side whatever the stimulus — the lesion is at or above the geniculate ganglion.',
      tip: 'Measured with the Schirmer test. “Crocodile tears” come from misdirected regrowth after a facial palsy.' },
    jaw: { name: 'Jaw jerk', stim: 'Tapping the chin, mouth slightly open', rec: 'Masseter muscle spindles', aff: ['V3', 'GSA'], centre: ['Mesencephalic V', '→ motor V (monosynaptic)'],
      eff: ['V3 · motor', 'SVE'], effector: 'Masseter', both: true, response: 'A small, often barely visible jaw closure',
      affCut: 'Reduced or absent.', effCut: 'Reduced or absent, with masseter wasting.',
      tip: 'A brisk jaw jerk means bilateral upper motor neuron damage above the pons — pseudobulbar palsy, motor neurone disease.' },
    gag: { name: 'Gag', stim: 'Touching the back of the throat', rec: 'Pharyngeal mucosa', aff: ['IX', 'GVA'], centre: ['Solitary nucleus', '→ nucleus ambiguus'],
      eff: ['X', 'SVE'], effector: 'Palate · pharyngeal constrictors', both: true, response: 'The palate rises and the pharynx contracts',
      affCut: 'Touch the affected side: no gag. Touch the other side: a normal gag.',
      effCut: 'Whichever side is touched, only the healthy half of the palate rises — the uvula is pulled toward it.',
      tip: 'Absent in up to a third of healthy people — compare the sides rather than relying on it.' },
    carotid: { name: 'Carotid sinus', stim: 'Stretch of the carotid sinus (pressure, massage)', rec: 'Carotid sinus baroreceptors', aff: ['IX · sinus nerve', 'GVA'], centre: ['Solitary nucleus', '→ DMN · ambiguus'],
      eff: ['X', 'GVE'], effector: 'SA and AV nodes', both: false, response: 'Heart rate and blood pressure fall',
      affCut: 'Massage on that side: no slowing.', effCut: 'Less slowing — the heart also gets vagal supply from the other side.',
      tip: 'Carotid sinus hypersensitivity causes fainting on turning the head or shaving; carotid massage can stop an SVT.' },
    cough: { name: 'Cough', stim: 'Something touching the larynx or trachea', rec: 'Laryngeal mucosa', aff: ['X · internal laryngeal', 'GVA'], centre: ['Solitary nucleus', '→ ambiguus + breathing centres'],
      eff: ['X · recurrent laryngeal', 'SVE'], effector: 'Larynx · diaphragm · abdominal wall', both: true, response: 'A forceful cough',
      affCut: 'Silent aspiration — food enters the larynx without a cough.',
      effCut: 'A weak, “bovine” cough — the vocal cords can’t close.',
      tip: 'Touching the ear canal (auricular branch of X) can trigger a cough — Arnold’s reflex.' },
    vor: { name: 'Vestibulo-ocular', stim: 'Turning the head', rec: 'Semicircular canals', aff: ['VIII · vestibular', 'SSA'], centre: ['Vestibular nuclei', '→ VI nucleus + MLF → III'],
      eff: ['III · IV · VI', 'GSE'], effector: 'Extraocular muscles', both: true, response: 'The eyes counter-rotate — gaze stays on target',
      affCut: 'Turn the head toward the affected side: the eyes move with it, then a catch-up saccade.',
      effCut: 'Depends on the muscle — with a VI palsy that eye can’t abduct during the turn.',
      tip: 'In coma, intact “doll’s eyes” or caloric responses mean the brainstem is working.' },
    stapedius: { name: 'Acoustic (stapedius)', stim: 'A loud sound', rec: 'Cochlea', aff: ['VIII · cochlear', 'SSA'], centre: ['Cochlear nuclei', '→ olive → both VII nuclei'],
      eff: ['VII · nerve to stapedius', 'SVE'], effector: 'Stapedius', both: true, response: 'The stapes stiffens in both ears, damping loud sound',
      affCut: 'A loud sound in the deaf ear: no reflex in either ear.',
      effCut: 'The affected ear never shows the reflex, whichever ear is stimulated — loud sounds feel painful (hyperacusis).',
      tip: 'Measured with tympanometry; it helps place VII and VIII lesions.' },
    oculocardiac: { name: 'Oculocardiac', stim: 'Pressure on the eye, or pulling on an eye muscle', rec: 'Orbital tissues', aff: ['V1', 'GSA'], centre: ['Spinal V', '→ dorsal motor nucleus of X'],
      eff: ['X', 'GVE'], effector: 'SA node', both: false, response: 'Sudden slowing of the heart — occasionally asystole',
      affCut: 'No reflex from that side.', effCut: 'Little or no slowing.',
      tip: 'A real risk in squint surgery and orbital fractures — relieved by releasing the traction, or atropine.' }
  };
  const CUT = { none: 'Intact', aff: 'Cut afferent', eff: 'Cut efferent' };
  const SENSORY = ['GSA', 'GVA', 'SVA'];

  const WHY = [
    ['Pairs to remember', 'V in → VII out: corneal, lacrimation. II in → III out: light, near. IX in → X out: gag, carotid sinus. VIII in → III/IV/VI out: VOR, or VII: stapedius. V in → X out: oculocardiac. V in → V out: jaw jerk.'],
    ['Which limb is cut?', 'Stimulate each side in turn. An afferent lesion silences the reflex only when its own side is stimulated — and then on both sides. An efferent lesion silences its own side whichever side is stimulated.'],
    ['Brainstem reflexes in coma', 'Pupils (midbrain), corneal (pons), vestibulo-ocular (pons), gag and cough (medulla) climb the brainstem level by level. Their pattern localises the damage; all absent, with no breathing, is the basis of brainstem death testing.']
  ];

  let rid = 'corneal', cut = 'none', built = false;

  // receptor → afferent → centre → efferent → effector (+ the other side when bilateral)
  // long names break onto two lines at a "·", "(" or the space nearest the middle
  const lines = (s, max) => {
    if (s.length <= max) return [s];
    const mid = s.length / 2;
    const cuts = [...s.matchAll(/ · | \(| /g)].map(m => m.index).sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    const i = cuts[0] ?? Math.round(mid);
    return [s.slice(0, i).trim(), s.slice(i).replace(/^ · /, '').trim()];
  };
  function wrap(s, x, y, cls, max = 13) {
    return `<text x="${x}" y="${y}" class="${cls}">${lines(s, max).map((l, i) => `<tspan x="${x}" ${i ? 'dy="16"' : ''}>${l}</tspan>`).join('')}</text>`;
  }
  // a nerve's name (wrapped) with its fibre type underneath
  function nerveLabel([name, f], x, y, role) {
    const ls = lines(name, 13);
    return `<text x="${x}" y="${y}" class="rf-n" style="fill:${FIBERS[f].color}">${ls.map((l, i) => `<tspan x="${x}" ${i ? 'dy="17"' : ''}>${l}</tspan>`).join('')}</text>
      <text x="${x}" y="${y + 17 * ls.length}" class="rf-f">${f} · ${role}</text>`;
  }

  function arcSVG(r) {
    const affD = 'M122,176 C200,176 270,150 350,138';
    const effD = 'M550,138 C624,150 690,176 762,176';
    const effD2 = 'M550,128 C624,114 690,98 764,96';
    const fwd = SENSORY.includes(r.aff[1]) ? 'fwd' : '';            // sparks always run toward the brainstem
    const c = (f) => FIBERS[f].color;
    return `
    <svg viewBox="40 22 830 222" class="rf-svg" data-cut="${cut}" data-both="${r.both ? 1 : 0}">
      <g data-tip="brainstem"><rect x="300" y="30" width="300" height="206" rx="40" class="rf-bs"/></g>
      <text x="450" y="52" class="rf-zone">BRAINSTEM</text>
      <text x="104" y="52" class="rf-zone">RECEPTOR</text><text x="780" y="52" class="rf-zone">EFFECTOR</text>
      <g class="rf-aff">${fib(affD, r.aff[1], '', fwd)}</g>
      <g class="rf-eff">${fib(effD, r.eff[1], '')}</g>
      ${r.both ? `<g class="rf-eff2">${fib(effD2, r.eff[1], '')}</g>` : ''}
      <g class="rf-node rf-rec"><circle cx="104" cy="176" r="17" style="--c:${c(r.aff[1])}"/></g>
      <g class="rf-node rf-ctr"><rect x="350" y="104" width="200" height="68" rx="14"/></g>
      <g class="rf-node rf-out"><circle cx="780" cy="176" r="17" style="--c:${c(r.eff[1])}"/></g>
      ${r.both ? `<g class="rf-node rf-out2"><circle cx="780" cy="96" r="14" style="--c:${c(r.eff[1])}"/></g>` : ''}
      ${wrap(r.rec, 104, 214, 'rf-l')}
      ${nerveLabel(r.aff, 236, 196, 'afferent')}
      <text x="450" y="132" class="rf-c">${r.centre[0]}</text><text x="450" y="152" class="rf-c sub">${r.centre[1]}</text>
      ${nerveLabel(r.eff, 662, 198, 'efferent')}
      ${wrap(r.effector, 780, 214, 'rf-l')}
      ${r.both ? '<text x="810" y="74" class="rf-s" style="text-anchor:end">other side</text><text x="804" y="148" class="rf-s" style="text-anchor:end">same side</text>' : ''}
      ${cut === 'aff' ? lesion(236, 162, 'L-rfAff') : ''}${cut === 'eff' ? lesion(662, 164, 'L-rfEff') : ''}
    </svg>`;
  }

  function detailHTML(r) {
    const row = (k, v) => `<div class="rf-dr"><b>${k}</b><span>${v}</span></div>`;
    return `<div class="rf-card"><h4>${r.name}</h4>
      ${row('Stimulus', r.stim)}${row('Afferent', `${chip(r.aff[1])} ${r.aff[0]}`)}${row('Centre', `${r.centre[0]} ${r.centre[1]}`)}
      ${row('Efferent', `${chip(r.eff[1])} ${r.eff[0]}`)}${row('Response', r.response)}
      <p class="rf-tip">${r.tip}</p></div>`;
  }
  const chip = (f) => `<span class="fc-chip ${f === 'SYM' ? 'sym' : ''}" style="--c:${FIBERS[f].color}">${f}</span>`;
  const outcome = (r, k) => k === 'none' ? r.response + (r.both ? ' — on both sides, from either side' : '') : k === 'aff' ? r.affCut : r.effCut;

  function tableHTML() {
    return `<table class="rf-tab"><thead><tr><th>Reflex</th><th>Afferent</th><th>Centre</th><th>Efferent</th></tr></thead><tbody>${Object.entries(R).map(([k, r]) =>
      `<tr data-rf="${k}"><td>${r.name}</td><td>${chip(r.aff[1])} ${r.aff[0]}</td><td>${r.centre[0]}</td><td>${chip(r.eff[1])} ${r.eff[0]}</td></tr>`).join('')}</tbody></table>`;
  }

  function build() {
    Info.modal('reflexModal', 'rfTitle', `
      <h2 id="rfTitle">Reflex arcs</h2>
      <p class="fx-lead">Every reflex tests two nerves and a piece of brainstem. Pick one, then cut a limb to see what you would find.</p>
      <div class="ab-cats">${Object.entries(R).map(([k, r]) => `<button class="ab-cat" data-rf="${k}">${r.name}</button>`).join('')}</div>
      <div class="rf-main">
        <div>
          <div id="rfArc"></div>
          <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">One-sided lesion</span>
            <div class="seg2">${Object.entries(CUT).map(([k, l]) => `<button class="seg-b" data-cut="${k}">${l}</button>`).join('')}</div></div></div>
          <div class="ol-cap" id="rfCap"></div>
        </div>
        <div class="fg-stack" id="rfDetail">${Object.entries(R).map(([k, r]) => `<div class="fg-v" data-k="${k}">${detailHTML(r)}</div>`).join('')}</div>
      </div>
      ${Info.why(WHY)}
      <h3>All the reflexes</h3>
      ${tableHTML()}`, onClick, close);
    const v = [];
    Object.entries(R).forEach(([k, r]) => Object.entries(CUT).forEach(([c, l]) => v.push([`${k}|${c}`, `<b>${l}</b><span>${outcome(r, c)}</span>`])));
    Info.fillCap('rfCap', v);
    built = true;
  }

  function onClick(e) {
    const r = e.target.closest('[data-rf]');
    if (r) { rid = r.dataset.rf; paint(); return; }
    const c = e.target.closest('[data-cut]');
    if (c && c.classList.contains('seg-b')) { cut = c.dataset.cut; paint(); }
  }

  function paint() {
    const root = document.getElementById('reflexModal');
    document.getElementById('rfArc').innerHTML = arcSVG(R[rid]);
    padHits(document.getElementById('rfArc'));
    root.querySelectorAll('[data-rf]').forEach(b => b.classList.toggle('on', b.dataset.rf === rid));
    root.querySelectorAll('.seg-b[data-cut]').forEach(b => b.classList.toggle('on', b.dataset.cut === cut));
    document.querySelectorAll('#rfDetail > .fg-v').forEach(v => v.classList.toggle('on', v.dataset.k === rid));
    Info.showCap('rfCap', `${rid}|${cut}`);
  }

  function open() {
    if (!built) build();
    paint();
    Info.show('reflexModal');
  }
  function close() { Info.hide('reflexModal'); }

  return { open, close };
})();
