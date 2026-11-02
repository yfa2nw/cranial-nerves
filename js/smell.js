// ─────────────────────────────────────────────────────────────
//  iv. Smell test card (I) – one nostril at a time, ammonia, flavour
//  + the smell circuit. Patient's right is the viewer's left.
// ─────────────────────────────────────────────────────────────

const Smell = (() => {
  // probe = the test acted out while its findings card is hovered; every result is always shown
  let mode = null, probe = null;

  // ── smell circuit (viewBox 0 0 300 320): right side on the left
  const SC = {
    rAir:   { f: 'SSA', tip: 'olfEpi', d: 'M72,290 L60,312' },
    lAir:   { f: 'SSA', tip: 'olfEpi', d: 'M228,290 L240,312' },
    rFila:  { f: 'SVA', tip: 'I-fila', d: 'M90,214 C84,240 78,262 72,282' },
    lFila:  { f: 'SVA', tip: 'I-fila', d: 'M210,214 C216,240 222,262 228,282' },
    rTract: { f: 'SVA', tip: 'I-tract', d: 'M90,122 C90,150 90,176 90,198' },
    lTract: { f: 'SVA', tip: 'I-tract', d: 'M210,122 C210,150 210,176 210,198' },
    rOfc:   { f: 'SVA', tip: 'I-md', d: 'M144,42 C120,62 100,84 92,102' },
    lOfc:   { f: 'SVA', tip: 'I-md', d: 'M156,42 C180,62 200,84 208,102' },
    ac:     { f: 'SVA', tip: 'I-contra', d: 'M100,190 C130,176 170,176 200,190' },
    vAm:    { f: 'GSA', tip: 'nasalV', d: 'M150,240 L150,296' }
  };
  const CHAINS = {
    coffeeR: [['rAir', 'rFila', 'rTract', 'rOfc']],
    coffeeL: [['lAir', 'lFila', 'lTract', 'lOfc']],
    ammonia: [['vAm']],
    flavor:  [['rAir', 'rFila', 'rTract', 'rOfc'], ['lAir', 'lFila', 'lTract', 'lOfc']]
  };
  const SC_LES = {
    trauma:   { blk: ['rFila', 'lFila'], marks: [[78, 252, 'S-trauma'], [222, 252, 'S-trauma']] },
    ogm:      { blk: ['rTract'], marks: [[90, 160, 'S-ogm']] },
    viral:    { blk: ['rFila', 'lFila'], marks: [[74, 276, 'S-viral'], [226, 276, 'S-viral']] },
    kallmann: { blk: ['rTract', 'lTract'], marks: [[90, 206, 'S-kallmann'], [210, 206, 'S-kallmann']] },
    neuro:    { blk: ['rTract', 'lTract'], marks: [[90, 178, 'S-neuro'], [210, 178, 'S-neuro']] },
    uncinate: { blk: [], marks: [[60, 112, 'S-uncinate']] },
    obstruct: { blk: ['rAir', 'lAir'], marks: [[66, 302, 'S-obstruct'], [234, 302, 'S-obstruct']] }
  };
  const NONE = { blk: [], marks: [] };

  function circuit() {
    return `
    <svg viewBox="0 0 300 320" class="circuit" id="scircuit">
      <path class="midline" d="M150,24 L150,224"/>
      <g data-tip="sc-ofc" class="ctxb"><ellipse cx="150" cy="30" rx="42" ry="12"/></g>
      <g data-tip="sc-ctx" class="ctxb"><ellipse cx="90" cy="110" rx="34" ry="13"/><ellipse cx="210" cy="110" rx="34" ry="13"/></g>
      <circle id="phantomDot" class="phantom" cx="90" cy="110" r="16"/>
      ${Clinic.segs(SC)}
      <g class="cn" data-tip="bulb"><ellipse cx="90" cy="206" rx="16" ry="9" fill="url(#nucSVA)"/><ellipse cx="210" cy="206" rx="16" ry="9" fill="url(#nucSVA)"/></g>
      <g class="cn" data-tip="sc-spv"><circle cx="150" cy="234" r="7" fill="url(#nucGSA)"/></g>
      <g class="cm-ic" data-tip="sc-epi"><rect x="56" y="282" width="34" height="8" rx="4"/><rect x="210" y="282" width="34" height="8" rx="4"/></g>
      <g id="scmarks"></g>
      <g class="labels">
        <text class="lbl faint" x="150" y="14" text-anchor="middle">ORBITOFRONTAL (VIA MD)</text>
        <text class="lbl" x="90" y="88" text-anchor="middle">CORTEX</text><text class="lbl" x="210" y="88" text-anchor="middle">CORTEX</text>
        <text class="lbl faint" x="120" y="210" text-anchor="start">BULB</text><text class="lbl faint" x="164" y="238" text-anchor="start">SP. V</text>
        <text class="lbl tiny" x="73" y="304" text-anchor="middle">epithelium</text><text class="lbl tiny" x="227" y="304" text-anchor="middle">epithelium</text>
        <text class="lbl tiny" x="150" y="308" text-anchor="middle">V endings</text>
        <text class="lbl faint" x="60" y="318" text-anchor="middle">RIGHT</text><text class="lbl faint" x="240" y="318" text-anchor="middle">LEFT</text>
      </g>
    </svg>`;
  }

  function patientSVG() {
    return `
    <svg viewBox="0 0 440 340" class="face-svg smell-svg">
      <ellipse class="fearf" cx="110" cy="176" rx="12" ry="26"/><ellipse class="fearf" cx="330" cy="176" rx="12" ry="26"/>
      <ellipse class="fhead" cx="220" cy="170" rx="110" ry="142" fill="url(#faceFront)"/>
      <path class="fbrow" d="M156,118 C172,108 194,108 206,114"/><path class="fbrow" d="M234,114 C246,108 268,108 284,118"/>
      <path class="tlid" d="M160,140 C172,134 190,134 200,140"/><path class="tlid" d="M240,140 C250,134 268,134 280,140"/>
      <path class="snose" d="M220,124 C214,164 200,204 192,228 C204,244 236,244 248,228 C240,204 226,164 220,124 Z"/>
      <ellipse class="nost" cx="208" cy="234" rx="7" ry="4"/><ellipse class="nost" cx="232" cy="234" rx="7" ry="4"/>
      <path class="smouth" d="M196,272 C210,280 230,280 244,272"/>
      <g id="csf" class="csf-drip"><path d="M208,240 c-3,6 -5,9 -5,12 a5,5 0 0,0 10,0 c0,-3 -2,-6 -5,-12 Z"/><path d="M232,240 c-3,6 -5,9 -5,12 a5,5 0 0,0 10,0 c0,-3 -2,-6 -5,-12 Z"/></g>
      <g id="fingerR" class="finger"><path d="M150,252 C170,246 190,240 204,236 C210,234 214,240 208,244 C194,252 176,262 156,268 Z"/></g>
      <g id="fingerL" class="finger"><path d="M290,252 C270,246 250,240 236,236 C230,234 226,240 232,244 C246,252 264,262 284,268 Z"/></g>
      <g id="vialR" class="vial"><rect x="132" y="244" width="22" height="34" rx="5"/><rect x="134" y="236" width="18" height="10" rx="3" class="cap"/><text x="143" y="266" class="vtxt" id="vialRt">☕</text>
        <path class="wisp2" d="M154,246 C170,238 186,238 200,236"/></g>
      <g id="vialL" class="vial"><rect x="286" y="244" width="22" height="34" rx="5"/><rect x="288" y="236" width="18" height="10" rx="3" class="cap"/><text x="297" y="266" class="vtxt" id="vialLt">☕</text>
        <path class="wisp2" d="M286,246 C270,238 254,238 240,236"/></g>
      <g id="berry" class="berry"><path d="M220,292 C210,292 204,300 208,310 C212,318 228,318 232,310 C236,300 230,292 220,292 Z"/><path d="M214,292 L220,286 L226,292" class="leaf"/></g>
      <g id="bubble" class="bubble">
        <circle cx="306" cy="98" r="5"/><circle cx="322" cy="78" r="8"/>
        <rect x="318" y="20" width="114" height="46" rx="20"/>
        <text id="bubbleT" x="375" y="49" text-anchor="middle"></text>
      </g>
      <text class="lbl faint" x="150" y="334" text-anchor="middle">RIGHT</text><text class="lbl faint" x="290" y="334" text-anchor="middle">LEFT</text>
    </svg>`;
  }

  function render() {
    const act = Clinic.act;
    const chips = Object.entries(SMELL_LESIONS).map(([k, l]) =>
      `<button class="dchip ck ${mode === k ? 'on' : ''}" data-sl="${k}" data-tip="S-${k}"><i></i>${l.chip}</button>`).join('');
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <div class="patient">${patientSVG()}</div>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear</small></div>
          <div class="dchips">${chips}</div>
        </section>
        ${Clinic.exam([
          { n: 'I', mine: true, tests: [
            { k: 'coffeeR', label: 'Coffee · right nostril', icon: '◖', tip: 'st-coffeeR' },
            { k: 'coffeeL', label: 'Coffee · left nostril', icon: '◗', tip: 'st-coffeeL' },
            { k: 'flavor', label: 'Eat a strawberry', icon: '◇', tip: 'st-flavor' }] },
          { n: 'V', tests: [
            { k: 'ammonia', label: 'Ammonia · irritant', icon: '☁', tip: 'st-ammonia' }] }])}
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  const $id = (x) => document.getElementById(x);
  const cls = (id, c, on) => $id(id)?.classList.toggle(c, !!on);
  const WORD = { ok: 'smells coffee', part: 'faint, odd', no: 'smells nothing' };

  function apply() {
    if (!$id('bubble')) return;
    const l = SMELL_LESIONS[mode] || { R: 'ok', L: 'ok', flavor: 'ok' };
    // the picture acts out the hovered test; the panel always shows every result
    const side = ['coffeeR', 'coffeeL'].includes(probe) ? probe : null;
    cls('fingerL', 'on', side === 'coffeeR');                 // finger closes the OTHER nostril
    cls('fingerR', 'on', side === 'coffeeL');
    cls('vialR', 'on', side === 'coffeeR' || probe === 'ammonia');
    cls('vialL', 'on', side === 'coffeeL');
    $id('vialRt').textContent = probe === 'ammonia' ? 'NH₃' : '☕';
    cls('berry', 'on', probe === 'flavor');
    cls('csf', 'on', l.csf);
    cls('phantomDot', 'on', l.phantom);

    // thought bubble: the hovered test, or the phantom smell
    const say = {
      coffeeR: [l.R, `${{ ok: '☕ coffee', part: '◐ faint…odd', no: '… nothing' }[l.R]}`],
      coffeeL: [l.L, `${{ ok: '☕ coffee', part: '◐ faint…odd', no: '… nothing' }[l.L]}`],
      ammonia: ['ok', '☁ it stings!'],
      flavor:  [l.flavor, `${{ ok: '◇ strawberry', part: '◐ dull', no: '◇ just sweet' }[l.flavor]}`]
    };
    const cur = probe ? say[probe] : l.phantom ? ['no', '⚠ burning?!'] : null;
    cls('bubble', 'on', !!cur);
    if (cur) { $id('bubbleT').textContent = cur[1]; $id('bubble').setAttribute('class', `bubble on ${cur[0]}`); }

    // results
    Clinic.result('coffeeR', l.R, WORD[l.R]);
    Clinic.result('coffeeL', l.L, WORD[l.L]);
    Clinic.result('flavor', l.flavor, { ok: 'tastes strawberry', part: 'dull, flat flavour', no: 'only sweet — no flavour' }[l.flavor]);
    Clinic.result('ammonia', 'ok', 'stings (V works)');
    paintCircuit();
  }

  function paintCircuit() {
    // at rest every test is drawn; while a test is hovered, only its own pathway
    const chains = probe ? CHAINS[probe] : Object.values(CHAINS).flat();
    Clinic.paint($id('scircuit'), chains, (SC_LES[mode] || NONE).blk);
  }

  function paintLesion() {
    Clinic.marks($id('scmarks'), (SC_LES[mode] || NONE).marks);
    const d = SMELL_LESIONS[mode];
    Clinic.explain($id('explain'), d, 'Pick a lesion in step 1 — this panel then explains what happens and why.', d ? 'I' : '');
    Clinic.suggest($id('card-eyes'), ['test'], d ? d.try.keys : []);
  }

  function bind(root) {
    Clinic.probe(root, k => { probe = k; apply(); });
    root.querySelectorAll('[data-sl]').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.sl ? null : b.dataset.sl;
      root.querySelectorAll('[data-sl]').forEach(c => c.classList.toggle('on', c.dataset.sl === mode));
      paintLesion(); apply();
    }));
    probe = null;
    paintLesion();
    requestAnimationFrame(apply);
  }

  return { render, bind };
})();
