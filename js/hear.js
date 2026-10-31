// ─────────────────────────────────────────────────────────────
//  iv. Hearing & balance card (VIII) – tuning forks, head impulse,
//  nystagmus, Dix-Hallpike + the VIII circuit. Patient's right is the viewer's left.
// ─────────────────────────────────────────────────────────────

const Hear = (() => {
  let mode = null;
  const tests = { weber: false, rinneR: false, rinneL: false, hitR: false, hitL: false, gaze: false, hallR: false, hallL: false };
  // one test per group at a time; results stay recorded until the lesion changes
  const GROUPS = {
    fork: [['weber', 'Weber', '⋔'], ['rinneR', 'Rinne right', '◖'], ['rinneL', 'Rinne left', '◗']],
    hit:  [['hitR', 'Turn right', '↶'], ['hitL', 'Turn left', '↷']],
    eyes: [['gaze', 'Look ahead', '◉'], ['hallR', 'Hallpike right', '⤵'], ['hallL', 'Hallpike left', '⤵']]
  };
  const NORMAL = { weber: 'mid', rinne: { R: 'ok', L: 'ok' }, hit: { R: 'ok', L: 'ok' }, nys: 'none', hall: { R: 'ok', L: 'ok' } };
  let recorded = {};

  // ── VIII circuit (viewBox 0 0 300 320), front view: right side on the left
  const HC = {
    rC:     { f: 'SSA coch', tip: 'VIII-c', d: 'M46,284 C50,266 54,250 58,240' },
    lC:     { f: 'SSA coch', tip: 'VIII-c', d: 'M254,284 C250,266 246,250 242,240' },
    rCi:    { f: 'SSA coch', tip: 'trap', d: 'M64,226 C76,218 86,212 96,208' },
    lCi:    { f: 'SSA coch', tip: 'trap', d: 'M236,226 C224,218 214,212 204,208' },
    rCx:    { f: 'SSA coch', tip: 'trapX', d: 'M66,236 C110,248 170,242 196,210' },
    lCx:    { f: 'SSA coch', tip: 'trapX', d: 'M234,236 C190,248 130,242 104,210' },
    rLL:    { f: 'SSA coch', tip: 'll', d: 'M98,198 C90,170 78,140 72,124' },
    lLL:    { f: 'SSA coch', tip: 'll', d: 'M202,198 C210,170 222,140 228,124' },
    rA:     { f: 'SSA coch', tip: 'mgn', d: 'M68,108 C64,80 62,56 60,36' },
    lA:     { f: 'SSA coch', tip: 'mgn', d: 'M232,108 C236,80 238,56 240,36' },
    rV:     { f: 'SSA vest', tip: 'VIII-v', d: 'M52,288 C70,278 86,268 98,261' },
    lV:     { f: 'SSA vest', tip: 'VIII-v', d: 'M248,288 C230,278 214,268 202,261' },
    rVx:    { f: 'SSA vest', tip: 'vor', d: 'M110,250 C134,226 156,186 166,158' },
    lVx:    { f: 'SSA vest', tip: 'vor', d: 'M190,250 C166,226 144,186 134,158' },
    lVIlr:  { f: 'GSE', tip: 'n-VI', d: 'M174,142 C180,110 184,80 183,54' },
    rVIlr:  { f: 'GSE', tip: 'n-VI', d: 'M126,142 C120,110 116,80 117,54' },
    lVImlf: { f: 'GSE', tip: 'mlf', d: 'M166,146 C152,134 138,118 131,104' },
    rVImlf: { f: 'GSE', tip: 'mlf', d: 'M134,146 C148,134 162,118 169,104' },
    rIII:   { f: 'GSE', tip: 'n-III', d: 'M126,90 C122,74 120,62 119,54' },
    lIII:   { f: 'GSE', tip: 'n-III', d: 'M174,90 C178,74 180,62 181,54' }
  };
  const R_HEAR = [['rC', 'rCi', 'rLL', 'rA'], ['rC', 'rCx', 'lLL', 'lA']];
  const L_HEAR = [['lC', 'lCi', 'lLL', 'lA'], ['lC', 'lCx', 'rLL', 'rA']];
  const CHAINS = {
    weber: [...R_HEAR, ...L_HEAR], rinneR: R_HEAR, rinneL: L_HEAR,
    hitR: [['rV', 'rVx', 'lVIlr'], ['rV', 'rVx', 'lVImlf', 'rIII']],
    hitL: [['lV', 'lVx', 'rVIlr'], ['lV', 'lVx', 'rVImlf', 'lIII']],
    gaze: [['rV'], ['lV']], hallR: [['rV']], hallL: [['lV']]
  };
  const HC_LES = {
    conductR:    { blk: [], marks: [[20, 300, 'H-conductR']] },
    schwannomaR: { blk: ['rC', 'rV'], marks: [[54, 262, 'H-schwannomaR']] },
    neuritisR:   { blk: ['rV'], marks: [[76, 278, 'H-neuritisR']] },
    labyrR:      { blk: ['rC', 'rV'], marks: [[40, 300, 'H-labyrR']] },
    menieresR:   { blk: [], marks: [[40, 300, 'H-menieresR']] },
    bppvR:       { blk: [], marks: [[20, 280, 'H-bppvR']] },
    cerebellar:  { blk: [], marks: [[150, 292, 'H-cerebellar']] }
  };
  const NONE = { blk: [], marks: [] };

  function circuit() {
    return `
    <svg viewBox="0 0 300 320" class="circuit" id="hcircuit">
      <path class="midline" d="M150,20 L150,276"/>
      <g data-tip="hc-a1" class="ctxb"><ellipse cx="60" cy="26" rx="26" ry="9"/><ellipse cx="240" cy="26" rx="26" ry="9"/></g>
      <g data-tip="vc-eye" class="c-eye"><circle cx="118" cy="42" r="12"/><circle cx="182" cy="42" r="12"/></g>
      ${Clinic.segs(HC)}
      <g class="cn" data-tip="n-III"><circle cx="128" cy="96" r="6" fill="url(#nucGSE)"/><circle cx="172" cy="96" r="6" fill="url(#nucGSE)"/></g>
      <g class="cn" data-tip="n-VI"><circle cx="130" cy="150" r="6" fill="url(#nucGSE)"/><circle cx="170" cy="150" r="6" fill="url(#nucGSE)"/></g>
      <g class="cn" data-tip="n-ic"><circle cx="70" cy="116" r="7" fill="url(#nucSSA)"/><circle cx="230" cy="116" r="7" fill="url(#nucSSA)"/></g>
      <g class="cn" data-tip="n-soc"><circle cx="100" cy="204" r="6" fill="url(#nucSSA)"/><circle cx="200" cy="204" r="6" fill="url(#nucSSA)"/></g>
      <g class="cn" data-tip="n-coch"><circle cx="60" cy="232" r="7" fill="url(#nucSSA)"/><circle cx="240" cy="232" r="7" fill="url(#nucSSA)"/></g>
      <g class="cn" data-tip="n-vest"><circle cx="104" cy="256" r="7" fill="url(#nucSSA)"/><circle cx="196" cy="256" r="7" fill="url(#nucSSA)"/></g>
      <g data-tip="hc-ear" class="c-ear"><circle cx="44" cy="296" r="13"/><circle cx="256" cy="296" r="13"/></g>
      <g id="hcmarks"></g>
      <g class="labels">
        <text class="lbl faint" x="60" y="12" text-anchor="middle">R A1</text><text class="lbl faint" x="240" y="12" text-anchor="middle">L A1</text>
        <text class="lbl tiny" x="138" y="100" text-anchor="end">III</text><text class="lbl tiny" x="140" y="154" text-anchor="end">VI</text>
        <text class="lbl tiny" x="82" y="120" text-anchor="start">IC</text><text class="lbl tiny" x="100" y="222" text-anchor="middle">SOC</text>
        <text class="lbl tiny" x="54" y="220" text-anchor="end">CN</text><text class="lbl tiny" x="116" y="268" text-anchor="start">VN</text>
        <text class="lbl faint" x="44" y="318" text-anchor="middle">R EAR</text><text class="lbl faint" x="256" y="318" text-anchor="middle">L EAR</text>
      </g>
    </svg>`;
  }

  function patientSVG() {
    const fork = (id) => `<g id="${id}" class="hfork"><path class="tine" d="M-6,-58 L-6,-26 C-6,-18 6,-18 6,-26 L6,-58"/><path d="M0,-20 L0,0"/>
      <path class="buzz" d="M-12,-50 C-15,-44 -15,-36 -12,-30 M12,-50 C15,-44 15,-36 12,-30"/></g>`;
    const eye = (s, cx) => `
      <path class="veye-f" d="M${cx - 34},150 C${cx - 18},130 ${cx + 18},130 ${cx + 34},150 C${cx + 18},166 ${cx - 18},166 ${cx - 34},150 Z"/>
      <g class="h-eye"><g class="h-iris" style="transform-origin:${cx}px 150px"><circle cx="${cx}" cy="150" r="13" fill="url(#iris)"/><circle cx="${cx}" cy="150" r="5.5" fill="#050505"/>
        <path class="tmark" d="M${cx},138 L${cx},143"/><circle cx="${cx - 4}" cy="146" r="2.4" fill="#fff" opacity=".8"/></g></g>`;
    const waves = (id, x, dir) => `<g id="${id}" class="hwaves">${[0, 1, 2].map(i => `<path d="M${x + dir * i * 9},${158 - 10 - i * 5} C${x + dir * (i * 9 + 6)},${158 - 4} ${x + dir * (i * 9 + 6)},${158 + 4} ${x + dir * i * 9},${158 + 10 + i * 5}" style="animation-delay:${i * .25}s"/>`).join('')}</g>`;
    return `
    <svg viewBox="0 0 440 300" class="face-svg hear-svg" id="hearSvg">
      <g id="hHead" style="transform-origin:220px 160px">
        <ellipse class="fearf" cx="102" cy="160" rx="12" ry="28"/><ellipse class="fearf" cx="338" cy="160" rx="12" ry="28"/>
        <ellipse class="fhead" cx="220" cy="150" rx="116" ry="138" fill="url(#faceFront)"/>
        <g id="hFeat">
          <path class="fbrow" d="M138,118 C156,108 182,108 198,114"/><path class="fbrow" d="M242,114 C258,108 284,108 302,118"/>
          ${eye('R', 168)}${eye('L', 272)}
          <path class="fnose" d="M220,150 C216,180 208,200 206,212 C214,220 226,220 234,212"/>
          <path class="smouth" d="M196,252 C210,258 230,258 244,252"/>
        </g>
      </g>
      ${waves('wavR', 84, -1)}${waves('wavL', 356, 1)}
      <g transform="translate(220,44)">${fork('forkW')}</g>
      <g transform="translate(96,214)">${fork('forkRm')}</g><g transform="translate(62,190)">${fork('forkRa')}</g>
      <g transform="translate(344,214)">${fork('forkLm')}</g><g transform="translate(378,190)">${fork('forkLa')}</g>
      <g id="hpose" class="hpose"><rect x="4" y="8" width="168" height="22" rx="11"/><text x="88" y="23" id="hposeT" text-anchor="middle"></text></g>
      <g id="hbubble" class="bubble">
        <circle cx="326" cy="70" r="5"/><circle cx="338" cy="54" r="7"/>
        <rect x="294" y="6" width="144" height="40" rx="18"/>
        <text id="hbubbleT" x="366" y="31" text-anchor="middle"></text>
      </g>
      <text class="lbl faint" x="150" y="298" text-anchor="middle">RIGHT</text><text class="lbl faint" x="290" y="298" text-anchor="middle">LEFT</text>
    </svg>`;
  }

  function render() {
    const act = Clinic.act;
    const chips = Object.entries(HEAR_LESIONS).map(([k, l]) =>
      `<button class="dchip ck ${mode === k ? 'on' : ''}" data-hl="${k}" data-tip="H-${k}"><i></i>${l.chip}</button>`).join('');
    const seg = (grp) => `<div class="seg2">${GROUPS[grp].map(([k, l, g]) =>
      `<button class="seg-b ${tests[k] ? 'on' : ''}" data-test="${k}" data-tip="ht-${k}"><span>${g}</span>${l}</button>`).join('')}</div>`;
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <div class="patient">${patientSVG()}${Clinic.findings([
          { k: 'web', label: 'Weber', icon: '⋔', kind: 'val' },
          { k: 'rin', label: 'Rinne', icon: '◖', kind: 'lr' },
          { k: 'hit', label: 'Impulse', icon: '↶', kind: 'lr' },
          { k: 'nys', label: 'Gaze', icon: '◉', kind: 'val' },
          { k: 'hal', label: 'Hallpike', icon: '⤵', kind: 'lr' }]).replace('class="findings"', 'class="findings f5"')}</div>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear</small></div>
          <div class="dchips">${chips}</div>
        </section>
        <section class="step">
          <div class="step-h"><span class="sn">2</span><b>Test hearing &amp; balance</b>${act('click')}<small>one per row at a time · results stay recorded</small></div>
          <div class="sig-ctrl groups">
            <div class="ctrl-grp"><span class="cg-l">Tuning fork · 512 Hz</span>${seg('fork')}</div>
            <div class="ctrl-grp"><span class="cg-l">Head impulse</span>${seg('hit')}</div>
            <div class="ctrl-grp"><span class="cg-l">Eyes</span>${seg('eyes')}</div>
          </div>
        </section>
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  const $id = (x) => document.getElementById(x);
  const cls = (id, c, on) => $id(id)?.classList.toggle(c, !!on);
  const pick = (grp) => GROUPS[grp].map(g => g[0]).find(k => tests[k]) || null;

  const RIN = { ok: 'AC > BC', part: 'AC > BC, quiet', no: 'BC > AC' };
  const HIT = { ok: 'eyes stay on target', part: 'small catch-up', no: 'catch-up saccade' };
  const NYS = { none: ['ok', 'none'], beatsL: ['no', 'beats L'], alt: ['no', 'flips'], attacks: ['part', 'attacks'] };
  const WEB = { mid: 'middle', R: 'right', L: 'left' };

  function apply() {
    const svg = $id('hearSvg');
    if (!svg) return;
    const l = HEAR_LESIONS[mode] || NORMAL;
    const fork = pick('fork'), hit = pick('hit'), eyes = pick('eyes');

    // picture: forks, sound, head and eye movements
    cls('forkW', 'on', fork === 'weber');
    ['forkRm', 'forkRa'].forEach(id => cls(id, 'on', fork === 'rinneR'));
    ['forkLm', 'forkLa'].forEach(id => cls(id, 'on', fork === 'rinneL'));
    const heardR = fork === 'weber' ? l.weber !== 'L' : fork === 'rinneR';
    const heardL = fork === 'weber' ? l.weber !== 'R' : fork === 'rinneL';
    cls('wavR', 'on', heardR); cls('wavL', 'on', heardL);
    cls('wavR', 'faint', fork === 'rinneR' && l.rinne.R !== 'ok');
    cls('wavL', 'faint', fork === 'rinneL' && l.rinne.L !== 'ok');
    const bub = $id('hbubble');
    let say = '', tone = 'ok';
    if (fork === 'weber') { say = l.weber === 'mid' ? '“in the middle”' : `“my ${l.weber === 'R' ? 'right' : 'left'} ear”`; tone = l.weber === 'mid' ? 'ok' : 'part'; }
    if (fork === 'rinneR' || fork === 'rinneL') {
      const r = l.rinne[fork.slice(-1)];
      say = r === 'no' ? '“behind is louder”' : r === 'part' ? '“in front · faint”' : '“in front is louder”';
      tone = r;
    }
    bub.setAttribute('class', `bubble ${say ? 'on' : ''} ${tone}`);
    $id('hbubbleT').textContent = say;

    const side = hit ? hit.slice(-1) : null;
    svg.dataset.hit = side || '';
    svg.dataset.hitq = side ? l.hit[side] : '';
    const hallSide = eyes && eyes.startsWith('hall') ? eyes.slice(-1) : null;
    svg.dataset.hall = hallSide || '';
    svg.dataset.nys = eyes === 'gaze' ? l.nys : hallSide && l.hall[hallSide] === 'no' ? 'tor' : '';
    cls('hpose', 'on', !!hallSide);
    $id('hposeT').textContent = hallSide ? `head 45° ${hallSide === 'R' ? 'right' : 'left'} · lying back` : '';

    // findings strip
    const rw = recorded.weber;
    Clinic.setCell('web', null, rw ? (l.weber === 'mid' ? 'ok' : 'part') : '', WEB[l.weber]);
    Clinic.setNote('web', rw ? (l.weber === 'mid' ? 'symmetrical' : `louder ${WEB[l.weber]}: conductive there, or nerve loss on the other side`) : 'fork on the forehead');
    const rin = (s) => recorded[`rinne${s}`] ? [l.rinne[s], RIN[l.rinne[s]]] : ['', ''];
    const rR = rin('R'), rL = rin('L');
    Clinic.setCell('rin', 'R', rR[0], rR[1]); Clinic.setCell('rin', 'L', rL[0], rL[1]);
    Clinic.setNote('rin', Clinic.sides(rR, rL) || 'mastoid, then beside the ear');
    const hi = (s) => recorded[`hit${s}`] ? [l.hit[s], HIT[l.hit[s]]] : ['', ''];
    const hR = hi('R'), hL = hi('L');
    Clinic.setCell('hit', 'R', hR[0], hR[1]); Clinic.setCell('hit', 'L', hL[0], hL[1]);
    Clinic.setNote('hit', Clinic.sides(hR, hL) || 'quick turn, eyes on your nose');
    const ny = NYS[l.nys];
    Clinic.setCell('nys', null, recorded.gaze ? ny[0] : '', ny[1]);
    Clinic.setNote('nys', recorded.gaze ? (l.nys === 'beatsL' ? 'fast phase away from the bad ear' : l.nys === 'alt' ? 'changes direction with gaze' : l.nys === 'attacks' ? 'none between attacks' : 'eyes steady') : 'look straight ahead');
    const ha = (s) => recorded[`hall${s}`] ? [l.hall[s], l.hall[s] === 'no' ? 'positive' : 'negative'] : ['', ''];
    const aR = ha('R'), aL = ha('L');
    Clinic.setCell('hal', 'R', aR[0], aR[1]); Clinic.setCell('hal', 'L', aL[0], aL[1]);
    Clinic.setNote('hal', Clinic.sides(aR, aL) || 'turn 45°, lie back');
    paintCircuit();
  }

  function paintCircuit() {
    const chains = [];
    Object.keys(tests).forEach(k => { if (tests[k]) chains.push(...CHAINS[k]); });
    Clinic.paint($id('hcircuit'), chains, (HC_LES[mode] || NONE).blk);
  }

  function paintLesion() {
    Clinic.marks($id('hcmarks'), (HC_LES[mode] || NONE).marks);
    const d = HEAR_LESIONS[mode];
    Clinic.explain($id('explain'), d, 'Pick a lesion in step 1 — this panel then explains what happens and why.', d ? 'VIII' : '');
    Clinic.suggest($id('card-eyes'), ['test'], d ? d.try.keys : []);
  }

  function bind(root) {
    root.querySelectorAll('[data-test]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.test, grp = Object.keys(GROUPS).find(g => GROUPS[g].some(x => x[0] === k));
      const turnOn = !tests[k];
      GROUPS[grp].forEach(([x]) => { tests[x] = false; });       // pick one: clicking the active one clears it
      tests[k] = turnOn;
      if (turnOn) recorded[k] = true;
      root.querySelectorAll('[data-test]').forEach(x => x.classList.toggle('on', tests[x.dataset.test]));
      apply();
    }));
    root.querySelectorAll('[data-hl]').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.hl ? null : b.dataset.hl;
      root.querySelectorAll('[data-hl]').forEach(c => c.classList.toggle('on', c.dataset.hl === mode));
      recorded = {};                                                // new patient: start a fresh record
      Object.keys(tests).forEach(k => { if (tests[k]) recorded[k] = true; });
      paintLesion(); apply();
    }));
    paintLesion();
    requestAnimationFrame(apply);
  }

  return { render, bind };
})();
