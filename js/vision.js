// ─────────────────────────────────────────────────────────────
//  iv. Fields & pupils card (II) – confrontation per eye, light per eye,
//  swinging flashlight + the visual circuit. Patient's right is the viewer's left.
// ─────────────────────────────────────────────────────────────

const Vision = (() => {
  let mode = null;
  const tests = { fieldR: false, fieldL: false, lightR: false, lightL: false, swing: false };
  // one test per group is active at a time; results are remembered once done (like recording each eye)
  const GROUPS = {
    field: [['fieldR', 'Right eye', '◐'], ['fieldL', 'Left eye', '◑']],
    light: [['lightR', 'Right eye', '☀'], ['lightL', 'Left eye', '☀'], ['swing', 'Swinging', '⇄']]
  };
  let recorded = {};

  // ── visual circuit (viewBox 0 0 300 320), front view: right eye on the left
  // hfL = carries the left visual field (→ right hemisphere), hfR = the right field
  const VC = {
    rOn:    { f: 'SSA vis', tip: 'myelin', d: 'M90,40 C96,62 110,82 124,94' },
    lOn:    { f: 'SSA vis', tip: 'myelin', d: 'M210,40 C204,62 190,82 176,94' },
    rStay:  { f: 'SSA hfL', tip: 'II-tL', d: 'M126,96 C120,112 108,140 96,166' },
    rCross: { f: 'SSA hfR', tip: 'II-tR', d: 'M126,96 C150,108 180,130 204,166' },
    lStay:  { f: 'SSA hfR', tip: 'II-tR', d: 'M174,96 C180,112 192,140 204,166' },
    lCross: { f: 'SSA hfL', tip: 'II-tL', d: 'M174,96 C150,108 120,130 96,166' },
    rMey:   { f: 'SSA hfL', tip: 'II-mey', d: 'M84,178 C52,200 48,244 80,276' },
    rPar:   { f: 'SSA hfL', tip: 'II-par', d: 'M94,178 C98,210 98,244 94,272' },
    lMey:   { f: 'SSA hfR', tip: 'II-mey', d: 'M216,178 C248,200 252,244 220,276' },
    lPar:   { f: 'SSA hfR', tip: 'II-par', d: 'M206,178 C202,210 202,244 206,272' },
    rPre:   { f: 'SSA hfL', tip: 'II-pre', d: 'M104,148 C118,160 134,172 146,182' },
    lPre:   { f: 'SSA hfR', tip: 'II-pre', d: 'M196,148 C182,160 166,172 154,182' }
  };
  const CHAINS = {
    fieldR: [['rOn', 'rStay', 'rMey'], ['rOn', 'rStay', 'rPar'], ['rOn', 'rCross', 'lMey'], ['rOn', 'rCross', 'lPar']],
    fieldL: [['lOn', 'lStay', 'lMey'], ['lOn', 'lStay', 'lPar'], ['lOn', 'lCross', 'rMey'], ['lOn', 'lCross', 'rPar']],
    lightR: [['rOn', 'rStay', 'rPre'], ['rOn', 'rCross', 'lPre']],
    lightL: [['lOn', 'lStay', 'lPre'], ['lOn', 'lCross', 'rPre']]
  };
  CHAINS.swing = [...CHAINS.lightR, ...CHAINS.lightL];
  const VC_LES = {
    aionR:       { blk: ['rOn'], marks: [[90, 46, 'V-aionR']] },
    craoR:       { blk: ['rOn'], marks: [[90, 28, 'V-craoR']] },
    neuritisR:   { blk: ['rOn'], marks: [[100, 64, 'V-neuritisR']] },
    chiasm:      { blk: ['rCross', 'lCross'], marks: [[150, 104, 'V-chiasm']] },
    tractR:      { blk: ['rStay', 'lCross'], marks: [[106, 140, 'V-tractR']] },
    meyerR:      { blk: ['rMey'], marks: [[54, 226, 'V-meyerR']] },
    parietalR:   { blk: ['rPar'], marks: [[98, 226, 'V-parietalR']] },
    occipitalR:  { blk: ['rMey', 'rPar'], marks: [[90, 286, 'V-occipitalR']] },
    papilledema: { blk: [], marks: [[90, 28, 'V-papilledema'], [210, 28, 'V-papilledema']] }
  };
  const NONE = { blk: [], marks: [] };

  function circuit() {
    return `
    <svg viewBox="0 0 300 320" class="circuit" id="vcircuit">
      <path class="midline" d="M150,40 L150,300"/>
      <g data-tip="vc-eye" class="c-eye"><circle cx="90" cy="28" r="16"/><circle cx="210" cy="28" r="16"/></g>
      ${Clinic.segs(VC)}
      <g data-tip="chiasmV" class="vchi small"><path d="M140,94 L160,110 M160,94 L140,110"/></g>
      <g class="cn" data-tip="lgn"><ellipse cx="90" cy="172" rx="12" ry="8" fill="url(#nucSSA)"/><ellipse cx="210" cy="172" rx="12" ry="8" fill="url(#nucSSA)"/></g>
      <g class="cn" data-tip="pretectV"><circle cx="150" cy="186" r="7" fill="url(#nucSSA)"/></g>
      <g data-tip="vc-v1" class="ctxb"><ellipse cx="90" cy="286" rx="30" ry="10"/><ellipse cx="210" cy="286" rx="30" ry="10"/></g>
      <g id="vcmarks"></g>
      <g class="labels">
        <text class="lbl faint" x="90" y="8" text-anchor="middle">R EYE</text><text class="lbl faint" x="210" y="8" text-anchor="middle">L EYE</text>
        <text class="lbl faint" x="164" y="114" text-anchor="start">CHIASM</text>
        <text class="lbl faint" x="70" y="166" text-anchor="end">LGN</text><text class="lbl faint" x="150" y="206" text-anchor="middle">PRETECTUM</text>
        <text class="lbl tiny" x="40" y="240" text-anchor="middle">Meyer</text><text class="lbl tiny" x="112" y="246" text-anchor="start">parietal</text>
        <text class="lbl faint" x="90" y="312" text-anchor="middle">R V1</text><text class="lbl faint" x="210" y="312" text-anchor="middle">L V1</text>
      </g>
    </svg>`;
  }

  function patientSVG() {
    const eye = (side, cx) => `
      <g data-tip="globe"><path class="veye-f" d="M${cx - 50},140 C${cx - 26},110 ${cx + 26},110 ${cx + 50},140 C${cx + 26},164 ${cx - 26},164 ${cx - 50},140 Z"/>
        <circle cx="${cx}" cy="140" r="21" fill="url(#iris)"/><circle id="vp${side}" cx="${cx}" cy="140" class="vpupil"/><circle cx="${cx - 7}" cy="133" r="3.5" fill="#fff" opacity=".8"/></g>
      <g id="occ${side}" class="occ"><rect x="${cx - 58}" y="104" width="116" height="74" rx="22"/></g>
      <g id="torch${side}" class="vtorch"><path class="beam" d="M${cx - (side === 'R' ? 70 : -70)},214 L${cx},152"/><rect x="${cx - (side === 'R' ? 92 : -48)}" y="210" width="44" height="16" rx="5"/></g>`;
    return `
    <svg viewBox="0 0 440 300" class="face-svg vision-svg">
      <ellipse class="fearf" cx="100" cy="150" rx="12" ry="26"/><ellipse class="fearf" cx="340" cy="150" rx="12" ry="26"/>
      <ellipse class="fhead" cx="220" cy="150" rx="122" ry="140" fill="url(#faceFront)"/>
      <path class="fbrow" d="M96,108 C120,94 160,94 184,104"/><path class="fbrow" d="M256,104 C280,94 320,94 344,108"/>
      ${eye('R', 140)}${eye('L', 300)}
      <path class="fnose" d="M220,150 C216,180 208,200 206,212 C214,220 226,220 234,212"/>
      <path class="smouth" d="M196,252 C210,258 230,258 244,252"/>
      <text class="lbl faint" x="140" y="294" text-anchor="middle">RIGHT</text><text class="lbl faint" x="300" y="294" text-anchor="middle">LEFT</text>
    </svg>`;
  }

  function render() {
    const act = Clinic.act;
    const chips = Object.entries(VISION_LESIONS).map(([k, l]) =>
      `<button class="dchip ck ${mode === k ? 'on' : ''}" data-vl="${k}" data-tip="V-${k}"><i></i>${l.chip}</button>`).join('');
    const seg = (grp) => `<div class="seg2">${GROUPS[grp].map(([k, l, g]) =>
      `<button class="seg-b ${tests[k] ? 'on' : ''}" data-test="${k}" data-tip="vt-${k}"><span>${g}</span>${l}</button>`).join('')}</div>`;
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <div class="patient">${patientSVG()}${Clinic.findings([
          { k: 'fRE', label: 'Right eye field', icon: '◐', kind: 'field' },
          { k: 'fLE', label: 'Left eye field', icon: '◑', kind: 'field' },
          { k: 'pup', label: 'Pupils to light', icon: '☀', kind: 'val' },
          { k: 'rapd', label: 'Swinging light', icon: '⇄', kind: 'val' }])}</div>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear</small></div>
          <div class="dchips">${chips}</div>
        </section>
        <section class="step">
          <div class="step-h"><span class="sn">2</span><b>Test fields &amp; pupils</b>${act('click')}<small>results stay recorded · fields drawn as the patient sees them</small></div>
          <div class="sig-ctrl groups">
            <div class="ctrl-grp"><span class="cg-l">Confrontation · one eye at a time</span>${seg('field')}</div>
            <div class="ctrl-grp"><span class="cg-l">Light · one at a time</span>${seg('light')}</div>
          </div>
        </section>
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  const $id = (x) => document.getElementById(x);
  const cls = (id, c, on) => $id(id)?.classList.toggle(c, !!on);

  function apply() {
    if (!$id('vpR')) return;
    const l = VISION_LESIONS[mode] || { LE: 'none', RE: 'none' };
    const rapdR = l.rapd === 'R';
    const field = GROUPS.field.map(g => g[0]).find(k => tests[k]) || null;
    const light = GROUPS.light.map(g => g[0]).find(k => tests[k]) || null;
    cls('occL', 'on', field === 'fieldR');                 // cover the other eye
    cls('occR', 'on', field === 'fieldL');
    const litR = light === 'lightR' || light === 'swing', litL = light === 'lightL';
    cls('torchR', 'on', litR); cls('torchL', 'on', litL);
    let r = 11;                                               // pupils move together (consensual)
    if (litL) r = 5;
    if (light === 'lightR') r = rapdR ? 8 : 5;
    if (light === 'swing') r = rapdR ? 12.5 : 5;
    ['vpR', 'vpL'].forEach(id => $id(id).style.r = `${r}px`);

    // findings: everything tested so far stays recorded
    Clinic.setField('fRE', recorded.fieldR ? l.RE : 'none', recorded.fieldR);
    Clinic.setNote('fRE', recorded.fieldR ? (l.RE === 'none' ? 'full field' : 'defect recorded') : 'test the right eye');
    Clinic.setField('fLE', recorded.fieldL ? l.LE : 'none', recorded.fieldL);
    Clinic.setNote('fLE', recorded.fieldL ? (l.LE === 'none' ? 'full field' : 'defect recorded') : 'test the left eye');
    const anyLight = recorded.lightR || recorded.lightL;
    const weakR = recorded.lightR && rapdR;
    Clinic.setCell('pup', null, anyLight ? (weakR ? 'part' : 'ok') : '', weakR ? 'weak R' : 'brisk');
    Clinic.setNote('pup', anyLight ? (weakR ? 'weaker from the right eye' : 'both pupils, direct + consensual') : 'shine a light');
    Clinic.setCell('rapd', null, recorded.swing ? (rapdR ? 'no' : 'ok') : '', rapdR ? 'RAPD' : 'none');
    Clinic.setNote('rapd', recorded.swing ? (rapdR ? 'both dilate on reaching the right eye' : 'both stay small on each swing') : 'swing the light');
    paintCircuit();
  }

  function paintCircuit() {
    const chains = [];
    Object.keys(tests).forEach(k => { if (tests[k]) chains.push(...CHAINS[k]); });
    Clinic.paint($id('vcircuit'), chains, (VC_LES[mode] || NONE).blk);
  }

  function paintLesion() {
    Clinic.marks($id('vcmarks'), (VC_LES[mode] || NONE).marks);
    const d = VISION_LESIONS[mode];
    Clinic.explain($id('explain'), d, 'Pick a lesion in step 1 — this panel then explains what happens and why.', d ? 'II' : '');
    Clinic.suggest($id('card-eyes'), ['test'], d ? d.try.keys : []);
  }

  function bind(root) {
    root.querySelectorAll('[data-test]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.test, grp = GROUPS.field.some(g => g[0] === k) ? 'field' : 'light';
      const turnOn = !tests[k];
      GROUPS[grp].forEach(([x]) => { tests[x] = false; });     // pick one: clicking the active one clears it
      tests[k] = turnOn;
      if (turnOn) recorded[k] = true;
      root.querySelectorAll('[data-test]').forEach(x => x.classList.toggle('on', tests[x.dataset.test]));
      apply();
    }));
    root.querySelectorAll('[data-vl]').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.vl ? null : b.dataset.vl;
      root.querySelectorAll('[data-vl]').forEach(c => c.classList.toggle('on', c.dataset.vl === mode));
      recorded = {};                                              // new patient: start a fresh record
      Object.keys(tests).forEach(k => { if (tests[k]) recorded[k] = true; });
      paintLesion(); apply();
    }));
    paintLesion();
    requestAnimationFrame(apply);
  }

  return { render, bind };
})();
