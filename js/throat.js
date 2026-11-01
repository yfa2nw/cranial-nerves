// ─────────────────────────────────────────────────────────────
//  iv. Throat & neck card (IX X XI XII) – open mouth, neck, shoulders
//  + the throat circuit. Patient's right is the viewer's left.
// ─────────────────────────────────────────────────────────────

const Throat = (() => {
  // held = the movement being hovered · probe = the test acted out while its findings card is hovered
  let mode = null, held = null, probe = null;
  const TESTS = ['gagR', 'gagL', 'carotid', 'voice', 'taste9'];
  const EXPR = [['aah', 'Say "aah"', '◠'], ['tongue', 'Tongue out', '▼'], ['shrug', 'Shrug', '⇑'],
                ['turnL', 'Turn head left', '↷'], ['turnR', 'Turn head right', '↶']];

  // ── throat circuit (viewBox 0 0 300 320): right side on the left
  const TC = {
    umnL_xR: { f: 'GSE', tip: 'tc-umn', d: 'M200,32 C180,56 154,76 134,90' },
    umnR_xL: { f: 'GSE', tip: 'tc-umn', d: 'M100,32 C120,56 146,76 166,90' },
    rXIIn:   { f: 'GSE', tip: 'tc-xii', d: 'M128,100 C110,160 70,230 52,286' },
    lXIIn:   { f: 'GSE', tip: 'tc-xii', d: 'M172,100 C190,160 224,230 240,286' },
    g9:      { f: 'GVA', tip: 'tc-sens', d: 'M126,152 C100,158 60,170 26,180' },
    cs9:     { f: 'GVA', tip: 'sinusN', d: 'M128,158 C100,182 60,208 26,222' },
    nts_aR:  { f: 'GVA', tip: 'tc-inter', fwd: 1, d: 'M126,146 C116,140 108,136 102,132' },
    nts_aL:  { f: 'GVA', tip: 'tc-inter', fwd: 1, d: 'M134,146 C160,138 186,134 198,132' },
    nts_d:   { f: 'GVA', tip: 'tc-inter', fwd: 1, d: 'M132,156 C134,164 138,170 140,174' },
    rXp:     { f: 'SVE', tip: 'X-phar', d: 'M98,136 C80,180 40,240 24,286' },
    lXp:     { f: 'SVE', tip: 'X-phar', d: 'M202,136 C220,180 260,240 276,286' },
    rRLN:    { f: 'SVE', tip: 'RLNr', d: 'M100,138 C96,190 86,240 80,286' },
    lRLN:    { f: 'SVE', tip: 'RLN', d: 'M200,138 C202,190 204,240 204,286' },
    rXh:     { f: 'GVE', tip: 'tc-xh', d: 'M142,180 C150,220 158,250 164,286' },
    acc_s:   { f: 'SVE', tip: 'XI-scm', d: 'M96,236 C100,252 104,268 108,286' },
    acc_t:   { f: 'SVE', tip: 'XI-trap', d: 'M98,236 C112,252 126,268 136,286' }
  };
  const CHAINS = {
    aah: [['rXp'], ['lXp']], tongue: [['umnL_xR', 'rXIIn'], ['umnR_xL', 'lXIIn']],
    shrug: [['acc_t']], turnL: [['acc_s']], turnR: [],
    gagR: [['g9', 'nts_aR', 'rXp'], ['g9', 'nts_aL', 'lXp']], gagL: [['lXp'], ['rXp']],
    carotid: [['cs9', 'nts_d', 'rXh']], voice: [['rRLN'], ['lRLN']], taste9: [['g9']]
  };
  const TC_LES = {
    ix:         { blk: ['g9', 'cs9'], marks: [[62, 170, 'T-ix']] },
    x:          { blk: ['rXp', 'rRLN', 'rXh'], marks: [[72, 196, 'T-x']] },
    rln:        { blk: ['lRLN'], marks: [[204, 232, 'T-rln']] },
    xiPost:     { blk: ['acc_t'], marks: [[124, 266, 'T-xiPost']] },
    xiJug:      { blk: ['acc_s', 'acc_t'], marks: [[96, 236, 'T-xiJug']] },
    xiiL:       { blk: ['rXIIn'], marks: [[100, 176, 'T-xiiL']] },
    xiiU:       { blk: ['umnL_xR'], marks: [[200, 24, 'T-xiiU']] },
    wallenberg: { blk: ['rXp', 'rRLN', 'nts_aR', 'nts_d'], marks: [[104, 132, 'T-wallenberg']] },
    vernet:     { blk: ['g9', 'cs9', 'rXp', 'rRLN', 'rXh', 'acc_s', 'acc_t'], marks: [[52, 196, 'T-vernet']] },
    bulbar:     { blk: ['rXp', 'lXp', 'rRLN', 'lRLN', 'rXIIn', 'lXIIn'], marks: [[100, 120, 'T-bulbar'], [200, 120, 'T-bulbar']] },
    pseudo:     { blk: ['umnL_xR', 'umnR_xL'], marks: [[118, 56, 'T-pseudo'], [182, 56, 'T-pseudo']] }
  };
  const NONE = { blk: [], marks: [] };
  const has = (...ks) => ks.includes(mode);

  function circuit() {
    const bottom = [[24, 'palate'], [52, 'tongue'], [80, 'larynx'], [108, 'SCM'], [136, 'trap.'], [164, 'heart'], [204, 'larynx'], [240, 'tongue'], [276, 'palate']];
    return `
    <svg viewBox="0 0 300 320" class="circuit" id="tcircuit">
      <path class="midline" d="M150,40 L150,300"/>
      <g data-tip="tc-ctx" class="ctxb"><ellipse cx="90" cy="22" rx="40" ry="12"/><ellipse cx="210" cy="22" rx="40" ry="12"/></g>
      <g class="cm-ic" data-tip="tc-gag"><circle cx="20" cy="180" r="6"/></g>
      <g class="cm-ic" data-tip="tc-cs"><ellipse cx="20" cy="222" rx="5" ry="8"/></g>
      ${Clinic.segs(TC)}
      <g class="cn" data-tip="n-XII"><circle cx="130" cy="94" r="7" fill="url(#nucGSE)"/><circle cx="170" cy="94" r="7" fill="url(#nucGSE)"/></g>
      <g class="cn" data-tip="n-amb"><circle cx="100" cy="132" r="7" fill="url(#nucSVE)"/><circle cx="200" cy="132" r="7" fill="url(#nucSVE)"/></g>
      <g class="cn" data-tip="tc-nts"><circle cx="130" cy="152" r="7" fill="url(#nucGVA)"/></g>
      <g class="cn" data-tip="n-DMN"><circle cx="140" cy="178" r="6" fill="url(#nucGVE)"/></g>
      <g class="cn" data-tip="n-acc"><rect x="92" y="216" width="8" height="22" rx="4" fill="url(#nucSVE)"/></g>
      <g id="tcmarks"></g>
      <g class="labels">
        <text class="lbl faint" x="90" y="10" text-anchor="middle">R CORTEX</text><text class="lbl faint" x="210" y="10" text-anchor="middle">L CORTEX</text>
        <text class="lbl" x="150" y="84" text-anchor="middle">XII</text><text class="lbl faint" x="86" y="124" text-anchor="end">AMB</text>
        <text class="lbl faint" x="118" y="160" text-anchor="end">NTS</text><text class="lbl faint" x="152" y="184" text-anchor="start">DMN</text>
        <text class="lbl faint" x="86" y="230" text-anchor="end">C1–5</text>
        <text class="lbl faint" x="30" y="170" text-anchor="start">gag</text><text class="lbl faint" x="30" y="214" text-anchor="start">sinus</text>
        ${bottom.map(([x, s]) => `<text class="lbl tiny" x="${x}" y="302" text-anchor="middle">${s}</text>`).join('')}
        <text class="lbl faint" x="80" y="318" text-anchor="middle">RIGHT</text><text class="lbl faint" x="240" y="318" text-anchor="middle">LEFT</text>
      </g>
    </svg>`;
  }

  function throatSVG() {
    return `
    <svg viewBox="0 0 440 360" class="face-svg throat-svg">
      <g id="tShR" class="tsh"><path class="tshoulder" d="M196,270 C150,276 90,290 40,320 L40,360 L200,360 Z"/>
        <path class="ttrap" data-tip="trapezius" d="M196,262 C160,270 110,284 60,306"/></g>
      <g id="tShL" class="tsh"><path class="tshoulder" d="M244,270 C290,276 350,290 400,320 L400,360 L240,360 Z"/>
        <path class="ttrap" data-tip="trapezius" d="M244,262 C280,270 330,284 380,306"/></g>
      <path class="tneck" d="M178,210 L174,300 L266,300 L262,210 Z"/>
      <path id="tScmR" class="tscm" data-tip="scm" d="M168,190 C176,230 192,270 208,300"/>
      <path id="tScmL" class="tscm" data-tip="scm" d="M272,190 C264,230 248,270 232,300"/>
      <g id="tHead">
        <ellipse class="fhead" cx="220" cy="128" rx="92" ry="106" fill="url(#faceFront)"/>
        <ellipse class="fearf" cx="128" cy="132" rx="11" ry="22"/><ellipse class="fearf" cx="312" cy="132" rx="11" ry="22"/>
        <path class="fbrow" d="M168,82 C182,74 200,74 210,80"/><path class="fbrow" d="M230,80 C240,74 258,74 272,82"/>
        <path class="tlid" d="M172,100 C182,94 198,94 206,100"/><path class="tlid" d="M234,100 C242,94 258,94 268,100"/>
        <path class="fnose" d="M220,98 C216,118 210,130 208,138 C214,144 226,144 232,138"/>
        <ellipse class="tlips" cx="220" cy="186" rx="58" ry="42"/>
        <ellipse class="tcav" cx="220" cy="186" rx="50" ry="35"/>
        <ellipse class="tpwall" data-tip="constrictors" cx="220" cy="186" rx="26" ry="20"/>
        <path id="tSwabR" class="swab" d=""/><path id="tSwabL" class="swab" d=""/>
        <path id="tPalate" class="tpal" data-tip="softPal" d=""/>
        <path id="tUvula" class="tuv" data-tip="softPal" d=""/>
        <path class="tteeth" d="M172,162 C200,152 240,152 268,162"/>
        <path id="tTongue" class="ttongue" data-tip="tongueM" d=""/>
        <g id="tFasc" class="fasc"><path d="M196,206 l4,-2 M204,214 l-3,3 M192,220 l4,1"/></g>
        <g id="tFascL" class="fasc"><path d="M244,206 l-4,-2 M236,214 l3,3 M248,220 l-4,1"/></g>
      </g>
      <g id="tVoice" class="tvoice"><path id="tWave" d=""/></g>
      <text class="lbl faint" x="120" y="352" text-anchor="middle">RIGHT</text><text class="lbl faint" x="320" y="352" text-anchor="middle">LEFT</text>
    </svg>`;
  }

  function render(id) {
    const act = Clinic.act;
    const chip = ([k, l]) => `<button class="dchip ck ${mode === k ? 'on' : ''}" data-tl="${k}" data-tip="T-${k}"><i></i>${l.chip}</button>`;
    // the last group (bulbar / pseudobulbar) spans IX, X and XII on both sides
    const groups = ['IX', 'X', 'XI', 'XII', 'IX · X · XII'].map(n => {
      const items = Object.entries(THROAT_LESIONS).filter(([, l]) => l.n === n);
      const multi = n.includes('·'), mine = multi ? ['IX', 'X', 'XII'].includes(id) : n === id;
      return `<div class="dgroup ${mine ? 'mine' : ''}"><span class="dg-n" ${multi ? `title="${n} · both sides"` : ''}>${multi ? 'both' : n}</span>${items.map(chip).join('')}</div>`;
    }).join('');
    const ex = EXPR.map(([k, l, g]) => `<div class="mchip hv xchip" data-ex="${k}" data-tip="tx-${k}"><b>${g}</b><span class="xl">${l}</span></div>`).join('');
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <div class="patient">${throatSVG()}${Clinic.findings([
          { k: 'gag', label: 'Gag reflex', icon: '✧', kind: 'lr', sides: { R: 'gagR', L: 'gagL' }, tip: 'tt-gagR' },
          { k: 'taste', label: 'Taste', icon: '◇', kind: 'tongue', test: 'taste9', tip: 'tt-taste9' },
          { k: 'hr', label: 'Heart rate', icon: '♥', kind: 'val', test: 'carotid', tip: 'tt-carotid' },
          { k: 'voice', label: 'Voice', icon: '♪', kind: 'val', test: 'voice', tip: 'tt-voice' }])}</div>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear · right side unless named</small></div>
          <div class="dgroups">${groups}</div>
        </section>
        <section class="step">
          <div class="step-h"><span class="sn">2</span><b>Ask the patient to…</b>${act('hover')}<small>watch the patient and the circuit respond</small></div>
          <div class="mchips xchips">${ex}</div>
        </section>
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  // ── what the patient does
  function resolve() {
    const xR = has('x', 'wallenberg', 'vernet');
    const bulbar = has('bulbar'), pseudo = has('pseudo');
    return {
      xR, ixR: has('ix', 'vernet'), bulbar, pseudo,
      hoarse: xR || has('rln') || bulbar || pseudo,
      voiceText: bulbar ? 'nasal' : pseudo ? 'spastic' : 'hoarse',
      trapR: has('xiPost', 'xiJug', 'vernet'), scmR: has('xiJug', 'vernet'),
      tongueDev: has('xiiL', 'xiiU') ? -26 : 0, wasting: has('xiiL'),
      wastingBoth: bulbar, tongueShort: bulbar || pseudo
    };
  }

  const $id = (x) => document.getElementById(x);
  const tf = (id, v) => { const el = $id(id); if (el) el.style.transform = v; };
  const cls = (id, c, on) => $id(id)?.classList.toggle(c, !!on);

  function apply() {
    if (!$id('tHead')) return;
    const s = resolve();
    // palate: each side rises if its vagus works and something drives it
    const gagFires = (probe === 'gagR' && !s.ixR) || probe === 'gagL';
    const drive = held === 'aah' || gagFires;
    // bulbar: neither side can lift · pseudobulbar: weak to command, but the gag reflex is brisk
    const both = s.bulbar ? 0 : s.pseudo ? (gagFires ? -13 : -3) : -10;
    const liftR = drive && !s.xR ? both : 0, liftL = drive ? both : 0;
    const droopR = s.xR ? 6 : 0;
    const uvx = 220 + (drive && s.xR ? 16 : 0);
    const peak = 174 + (liftR + liftL) / 2;
    $id('tPalate').setAttribute('d', `M174,${188 + droopR} Q196,${164 + droopR + liftR} ${uvx},${peak} Q244,${164 + liftL} 266,188`);
    $id('tUvula').setAttribute('d', `M${uvx - 5},${peak} Q${uvx},${peak + 22} ${uvx + 5},${peak} Z`);
    // tongue
    const out = held === 'tongue', dev = out ? s.tongueDev : 0;
    const tip = s.tongueShort ? 236 : 264;                       // a weak or spastic tongue barely protrudes
    $id('tTongue').setAttribute('d', out
      ? `M186,198 C184,${tip - 28} ${206 + dev},${tip - 2} ${220 + dev},${tip} C${234 + dev},${tip - 2} 256,${tip - 28} 254,198 Z`
      : 'M182,206 C184,192 256,192 258,206 C254,216 186,216 182,206 Z');
    cls('tTongue', 'wasted', s.wasting || s.wastingBoth);
    cls('tFasc', 'on', s.wasting || s.wastingBoth);
    cls('tFascL', 'on', s.wastingBoth);
    tf('tFasc', out ? `translate(${dev / 2}px, ${s.tongueShort ? 12 : 30}px)` : 'none');
    tf('tFascL', out ? 'translate(0px, 12px)' : 'none');
    // shoulders & head
    const shrug = held === 'shrug';
    tf('tShR', `translateY(${s.trapR ? (shrug ? 3 : 8) : shrug ? -14 : 0}px)`);
    tf('tShL', `translateY(${shrug ? -14 : 0}px)`);
    const turn = held === 'turnL' ? (s.scmR ? 5 : 22) : held === 'turnR' ? -22 : 0;
    tf('tHead', `translateX(${turn}px) rotate(${turn / 4}deg)`);
    cls('tScmR', 'on', held === 'turnL' && !s.scmR);
    cls('tScmR', 'weak', s.scmR);
    cls('tScmL', 'on', held === 'turnR');
    // the hovered test, acted out in the picture …
    $id('tSwabR').setAttribute('d', probe === 'gagR' ? 'M150,250 L204,196' : '');
    $id('tSwabL').setAttribute('d', probe === 'gagL' ? 'M290,250 L236,196' : '');
    cls('tVoice', 'on', probe === 'voice');
    cls('tVoice', 'hoarse', probe === 'voice' && s.hoarse);
    let w = 'M300,190';
    for (let i = 0; i < 10; i++) w += s.hoarse ? ` l6,${(i % 2 ? 1 : -1) * (4 + (i * 7) % 9)}` : ` q3,${i % 2 ? 8 : -8} 6,0`;
    $id('tWave').setAttribute('d', w);

    // … and every result in the findings strip
    const gag = (side) => {
      if (side === 'R' && s.ixR) return ['no', 'absent'];
      if (s.bulbar) return ['no', 'absent · no motor limb'];
      if (s.pseudo) return ['part', 'brisk · exaggerated'];
      return s.xR ? ['part', 'left palate only'] : ['ok', 'present'];
    };
    const gR = gag('R'), gL = gag('L');
    Clinic.setCell('gag', 'R', ...gR);
    Clinic.setCell('gag', 'L', ...gL);
    Clinic.setNote('gag', Clinic.sides(gR, gL));
    Clinic.setZones('taste', { pR: s.ixR ? 'no' : 'ok' });
    Clinic.setNote('taste', s.ixR ? 'back ⅓ right: lost' : 'back ⅓ right: tastes');
    const slows = !s.ixR && !s.xR;
    Clinic.setCell('hr', null, slows ? 'ok' : 'no', slows ? '72 → 56' : '72 → 72');
    Clinic.setNote('hr', `right carotid massage · ${slows ? 'reflex intact' : 'reflex lost'}`);
    Clinic.setCell('voice', null, s.hoarse ? 'no' : 'ok', s.hoarse ? s.voiceText : 'clear');
    Clinic.setNote('voice', s.hoarse ? 'vocal folds don’t meet' : 'say “eee”');
    paintCircuit();
  }

  function paintCircuit() {
    // a hovered movement or test shows its own pathway; at rest, every test's pathway is drawn
    const chains = held ? CHAINS[held] : probe ? CHAINS[probe] : TESTS.flatMap(k => CHAINS[k]);
    Clinic.paint($id('tcircuit'), chains, (TC_LES[mode] || NONE).blk);
  }

  function paintLesion() {
    Clinic.marks($id('tcmarks'), (TC_LES[mode] || NONE).marks);
    const d = THROAT_LESIONS[mode];
    Clinic.explain($id('explain'), d, 'Pick a lesion in step 1 — this panel then explains what happens and why.', d ? d.n : '');
    Clinic.suggest($id('card-eyes'), ['ex', 'test'], d ? d.try.keys : []);
  }

  function bind(root) {
    root.querySelectorAll('[data-ex]').forEach(b => {
      b.addEventListener('mouseenter', () => { held = b.dataset.ex; apply(); });
      b.addEventListener('mouseleave', () => { held = null; apply(); });
    });
    Clinic.probe(root, k => { probe = k; apply(); });
    root.querySelectorAll('[data-tl]').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.tl ? null : b.dataset.tl;
      root.querySelectorAll('[data-tl]').forEach(c => c.classList.toggle('on', c.dataset.tl === mode));
      paintLesion(); apply();
    }));
    held = null; probe = null;
    paintLesion();
    requestAnimationFrame(apply);
  }

  return { render, bind };
})();
