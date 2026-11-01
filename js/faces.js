// ─────────────────────────────────────────────────────────────
//  iv. Face card (V and VII) – a front-view face + the face circuit.
//  Patient's right is the viewer's left. Lesions affect the right face.
// ─────────────────────────────────────────────────────────────

const Face = (() => {
  // held = the expression being hovered · probe = the test acted out while its findings card is hovered
  let mode = null, held = null, probe = null, nerve = 'VII';
  const TESTS = ['corneal', 'sensation', 'taste', 'sound', 'tears'];
  const EXPR = [['brows', 'Raise brows', '⌃'], ['close', 'Close eyes', '◡'], ['smile', 'Smile', '◠'],
                ['puff', 'Puff cheeks', '○'], ['jaw', 'Open jaw', '▽'], ['clench', 'Clench', '▣']];

  // ── face circuit (viewBox 0 0 300 320): right VII on the left, V in the middle, left VII on the right
  const FC = {
    umnR_uR: { f: 'SVE', tip: 'fc-umn', d: 'M96,36 C100,62 104,86 108,102' },
    umnR_uL: { f: 'SVE', tip: 'fc-umn', d: 'M110,34 C150,58 200,84 224,102' },
    umnR_lL: { f: 'SVE', tip: 'fc-umn', d: 'M116,34 C170,70 214,104 232,122' },
    umnL_uL: { f: 'SVE', tip: 'fc-umn', d: 'M224,36 C228,62 230,86 232,102' },
    umnL_uR: { f: 'SVE', tip: 'fc-umn', d: 'M210,34 C170,58 130,84 114,102' },
    umnL_lR: { f: 'SVE', tip: 'fc-umn', d: 'M204,34 C150,70 116,104 108,122' },
    r7a:   { f: 'SVE', tip: 'fc-r7', d: 'M102,118 C90,128 82,138 78,150' },
    r7b:   { f: 'SVE', tip: 'fc-r7', d: 'M78,150 C76,158 75,165 74,172' },
    gspn:  { f: 'GVE', tip: 'GSPN', d: 'M72,172 L48,172' },
    r7c:   { f: 'SVE', tip: 'fc-r7', d: 'M74,172 L74,196' },
    stap:  { f: 'SVE', tip: 'stapN', d: 'M72,196 L48,196' },
    r7d:   { f: 'SVE', tip: 'fc-r7', d: 'M74,196 L74,220' },
    chorda:{ f: 'SVA', tip: 'chorda', d: 'M72,220 L48,220' },
    r7e:   { f: 'SVE', tip: 'fc-r7', d: 'M74,220 L74,244' },
    r7up:  { f: 'SVE', tip: 'temporalBr', d: 'M74,244 C70,262 64,276 60,290' },
    r7lo:  { f: 'SVE', tip: 'buccalBr', d: 'M74,244 C80,262 86,276 92,290' },
    l7:    { f: 'SVE', tip: 'fc-l7', d: 'M238,118 C252,150 260,200 262,244' },
    l7up:  { f: 'SVE', tip: 'fc-l7', d: 'M262,244 C258,262 252,276 248,290' },
    l7lo:  { f: 'SVE', tip: 'fc-l7', d: 'M262,244 C268,262 274,276 280,290' },
    vroot: { f: 'GSA', tip: 'fc-v', d: 'M150,178 L150,206' },
    v1:    { f: 'GSA', tip: 'V1', d: 'M146,222 C138,246 130,268 124,290' },
    v2:    { f: 'GSA', tip: 'V2', d: 'M150,222 L152,290' },
    v3s:   { f: 'GSA', tip: 'V3', d: 'M154,222 C164,246 174,268 180,290' },
    sv_R:  { f: 'GSA', tip: 'fc-sv', fwd: 1, d: 'M146,146 C134,134 124,124 116,118' },
    sv_L:  { f: 'GSA', tip: 'fc-sv', fwd: 1, d: 'M154,146 C176,134 206,124 222,118' },
    v3m:   { f: 'SVE', tip: 'fc-v3m', d: 'M186,144 C192,190 200,250 206,290' }
  };
  const R7 = ['r7a', 'r7b', 'r7c', 'r7d', 'r7e'];
  const CHAINS = {
    upper:     [['umnR_uR', ...R7, 'r7up'], ['umnL_uR', ...R7, 'r7up'], ['umnL_uL', 'l7', 'l7up'], ['umnR_uL', 'l7', 'l7up']],
    lower:     [['umnL_lR', ...R7, 'r7lo'], ['umnR_lL', 'l7', 'l7lo']],
    jaw:       [['v3m']],
    corneal:   [['v1', 'vroot', 'sv_R', ...R7, 'r7up'], ['v1', 'vroot', 'sv_L', 'l7', 'l7up']],
    sensation: [['v1', 'vroot'], ['v2', 'vroot'], ['v3s', 'vroot']],
    taste:     [['chorda', 'r7d', 'r7c', 'r7b', 'r7a']],
    sound:     [['r7a', 'r7b', 'r7c', 'stap']],
    tears:     [['r7a', 'r7b', 'gspn']]
  };
  const EX_CHAIN = { brows: 'upper', close: 'upper', smile: 'lower', puff: 'lower', jaw: 'jaw', clench: 'jaw' };
  const FC_LES = {
    umn:       { blk: ['umnL_uL', 'umnL_uR', 'umnL_lR'], marks: [[220, 24, 'F-umn']] },
    bell:      { blk: ['r7up', 'r7lo'], marks: [[74, 254, 'F-bell']] },
    chorda:    { blk: ['r7d'], marks: [[74, 208, 'F-chorda']] },
    stap:      { blk: ['r7c'], marks: [[74, 184, 'F-stap']] },
    genic:     { blk: ['r7b'], marks: [[77, 161, 'F-genic']] },
    v1:        { blk: ['v1'], marks: [[132, 262, 'F-v1']] },
    v3:        { blk: ['v3s', 'v3m'], marks: [[170, 262, 'F-v3'], [200, 252, 'F-v3']] },
    spinalV:   { blk: ['vroot'], marks: [[150, 192, 'F-spinalV']] },
    neuralgia: { blk: [], marks: [[162, 206, 'F-neuralgia']] }
  };
  const NONE = { blk: [], marks: [] };

  function circuit() {
    const segs = Clinic.segs(FC);
    const fn = (cx, cy) => `<g class="fn" data-tip="fc-fn"><path d="M${cx - 10},${cy} a10,10 0 0,1 20,0 Z" fill="url(#nucSVE)"/><path d="M${cx - 10},${cy} a10,10 0 0,0 20,0 Z" fill="url(#nucSVE)" opacity=".7"/><path class="split" d="M${cx - 11},${cy} h22"/></g>`;
    const bottom = [[60, 'brow'], [92, 'mouth'], [124, 'cornea'], [152, 'cheek'], [180, 'chin'], [206, 'jaw'], [248, 'brow'], [280, 'mouth']];
    return `
    <svg viewBox="0 0 300 320" class="circuit" id="fcircuit">
      <path class="midline" d="M170,40 L170,300"/>
      <g data-tip="fc-ctx" class="ctxb"><ellipse cx="100" cy="24" rx="40" ry="12"/><ellipse cx="220" cy="24" rx="40" ry="12"/></g>
      <g class="cm-ic" data-tip="lacrimalG"><path d="M40,166 c-3,6 -5,9 -5,12 a5,5 0 0,0 10,0 c0,-3 -2,-6 -5,-12 Z"/></g>
      <g class="cm-ic" data-tip="stapedius"><path d="M44,190 a8,8 0 1,0 0,12" fill="none"/></g>
      <g class="cm-ic" data-tip="tongue"><ellipse cx="40" cy="220" rx="8" ry="5"/></g>
      ${segs}
      ${fn(110, 112)}${fn(230, 112)}
      <g class="cn" data-tip="n-spV"><rect x="146" y="138" width="8" height="40" rx="4" fill="url(#nucGSA)"/></g>
      <g class="cn" data-tip="n-motV"><circle cx="186" cy="138" r="7" fill="url(#nucSVE)"/></g>
      <g data-tip="tg"><path class="tg" d="M150,206 C158,206 162,212 160,218 C158,224 150,226 144,222 C140,218 142,208 150,206 Z"/></g>
      <g id="fcmarks"></g>
      <g class="labels">
        <text class="lbl faint" x="100" y="10" text-anchor="middle">R CORTEX</text><text class="lbl faint" x="220" y="10" text-anchor="middle">L CORTEX</text>
        <text class="lbl" x="122" y="104" text-anchor="start">VII</text><text class="lbl" x="216" y="104" text-anchor="end">VII</text>
        <text class="lbl faint" x="160" y="160" text-anchor="start">SP. V</text><text class="lbl faint" x="196" y="140" text-anchor="start">MOT. V</text>
        <text class="lbl faint" x="164" y="216" text-anchor="start">TG</text>
        <text class="lbl faint" x="32" y="175" text-anchor="end">tears</text><text class="lbl faint" x="32" y="199" text-anchor="end">stap.</text><text class="lbl faint" x="32" y="223" text-anchor="end">taste</text>
        ${bottom.map(([x, s]) => `<text class="lbl tiny" x="${x}" y="304" text-anchor="middle">${s}</text>`).join('')}
        <text class="lbl faint" x="76" y="318" text-anchor="middle">RIGHT FACE</text><text class="lbl faint" x="264" y="318" text-anchor="middle">LEFT</text>
      </g>
    </svg>`;
  }

  function feye(side, cx) {
    const E = 'M-26,0 C-13,-13 13,-13 26,0 C13,10 -13,10 -26,0 Z';
    return `
    <g transform="translate(${cx},140)" data-tip="globe">
      <clipPath id="fclip-${side}"><path d="${E}"/></clipPath>
      <path d="${E}" fill="url(#scleraFront)"/>
      <g clip-path="url(#fclip-${side})">
        <g class="firis" id="firis-${side}"><circle r="8" fill="url(#iris)"/><circle r="3.4" fill="#050505"/><circle cx="-2.5" cy="-3" r="1.6" fill="#fff"/></g>
        <g class="flidw" id="flidw-${side}"><path class="flid" id="flid-${side}" d="M-32,-30 H32 V0 C13,-13 -13,-13 -32,0 Z" fill="url(#skin)"/></g>
      </g>
      <path d="${E}" class="eye-line"/>
    </g>`;
  }

  function faceSVG() {
    const d1 = 'M96,150 C100,80 150,26 220,18 L220,204 C214,204 210,196 210,186 C210,170 208,152 202,140 C190,128 176,126 160,128 C136,130 112,140 96,150 Z';
    const d2 = 'M96,150 C112,140 136,130 160,128 C176,126 190,128 202,140 C208,152 210,170 210,186 C210,196 214,204 220,204 L220,238 C206,238 196,240 190,246 C160,238 130,228 106,214 C98,196 96,172 96,150 Z';
    const d3 = 'M106,214 C130,228 160,238 190,246 C196,240 206,238 220,238 L220,306 C190,304 150,290 124,252 C116,240 110,228 106,214 Z';
    const wr = '<path d="M140,80 C162,74 190,74 212,78"/><path d="M136,92 C160,86 190,86 212,90"/><path d="M140,104 C162,98 190,98 212,102"/>';
    const waves = (x, dir) => `<path d="M${x},160 q${dir * 8},10 0,20 M${x + dir * 8},154 q${dir * 10},16 0,32 M${x + dir * 16},148 q${dir * 12},22 0,44"/>`;
    return `
    <svg viewBox="0 0 440 340" class="face-svg">
      <clipPath id="rightHalf"><rect x="0" y="0" width="220" height="340"/></clipPath>
      <clipPath id="headClip"><ellipse cx="220" cy="160" rx="124" ry="146"/></clipPath>
      <g id="fface">
        <g data-tip="ear"><ellipse class="fearf" cx="96" cy="172" rx="13" ry="28"/><ellipse class="fearf" cx="344" cy="172" rx="13" ry="28"/></g>
        <g id="vesic" class="vesic">${[[92, 160], [99, 168], [94, 178], [100, 184], [90, 188]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>
        <g id="wavesR" class="waves">${waves(76, -1)}</g><g id="wavesL" class="waves">${waves(364, 1)}</g>
        <ellipse class="fhead" cx="220" cy="160" rx="124" ry="146" fill="url(#faceFront)"/>
        <g id="wrR" class="wr">${wr}</g><g id="wrL" class="wr" transform="translate(440,0) scale(-1,1)">${wr}</g>
        <g data-tip="masseter"><ellipse id="maR" class="mass" cx="124" cy="238" rx="14" ry="26"/><ellipse id="maL" class="mass" cx="316" cy="238" rx="14" ry="26"/></g>
        <ellipse id="chR" class="cheek" cx="160" cy="218" rx="28" ry="20"/><ellipse id="chL" class="cheek" cx="280" cy="218" rx="28" ry="20"/>
        <path id="browR" class="fbrow" d="M140,116 C160,102 190,100 210,108"/><path id="browL" class="fbrow" d="M230,108 C250,100 280,102 300,116"/>
        ${feye('R', 176)}${feye('L', 264)}
        <path class="fnose" d="M220,140 C216,170 206,190 204,202 C212,210 228,210 236,202 C234,190 224,170 220,140"/>
        <path id="nlR" class="nl" d="M202,206 C190,220 184,234 186,252"/><path id="nlL" class="nl" d="M238,206 C250,220 256,234 254,252"/>
        <g id="lowerJaw"><path class="chin" d="M140,268 C170,300 200,306 220,306 C240,306 270,300 300,268"/></g>
        <path id="mouthIn" class="mouth-in"/><path id="mouth" class="lips"/>
        <g id="leak" class="leak"><path d="M184,246 l-10,-3 M184,250 l-11,2 M186,254 l-8,6"/></g>
        <g id="fderm" class="fderm" clip-path="url(#headClip)">
          <path id="dR1" class="fz" d="${d1}"/><path id="dR2" class="fz" d="${d2}"/><path id="dR3" class="fz" d="${d3}"/>
          <g transform="translate(440,0) scale(-1,1)"><path class="fz" d="${d1}"/><path class="fz" d="${d2}"/><path class="fz" d="${d3}"/></g>
          <g id="onion" clip-path="url(#rightHalf)"><circle class="ring3" cx="220" cy="222" r="150"/><circle class="ring2" cx="220" cy="222" r="96"/><circle class="ring1" cx="220" cy="222" r="46"/></g>
          <text class="lbl dz-f" x="160" y="76" text-anchor="middle">V1</text><text class="lbl dz-f" x="146" y="186" text-anchor="middle">V2</text><text class="lbl dz-f" x="166" y="282" text-anchor="middle">V3</text>
        </g>
        <g id="bolts" class="bolts"><path d="M150,196 l10,10 -8,2 12,14"/><path d="M168,262 l10,9 -8,3 12,12"/></g>
        <path id="tearR" class="tear" d="M176,156 c-3,6 -5,9 -5,12 a5,5 0 0,0 10,0 c0,-3 -2,-6 -5,-12 Z"/>
        <path id="tearL" class="tear" d="M264,156 c-3,6 -5,9 -5,12 a5,5 0 0,0 10,0 c0,-3 -2,-6 -5,-12 Z"/>
        <path id="wisp" class="wisp" d="M130,126 C140,132 148,136 158,140"/>
      </g>
      <text class="lbl faint" x="150" y="334" text-anchor="middle">RIGHT</text><text class="lbl faint" x="290" y="334" text-anchor="middle">LEFT</text>
    </svg>`;
  }

  function render(id) {
    nerve = id;
    const act = Clinic.act;
    const chip = ([k, l]) => `<button class="dchip ck ${mode === k ? 'on' : ''}" data-fl="${k}" data-tip="F-${k}"><i></i>${l.chip}</button>`;
    const group = (n) => `<div class="dgroup ${n === id ? 'mine' : ''}"><span class="dg-n">${n}</span>${Object.entries(FACE_LESIONS).filter(([, l]) => l.n === n).map(([k, l]) => chip([k, l])).join('')}</div>`;
    const ex = EXPR.map(([k, l, g]) => `<div class="mchip hv xchip" data-ex="${k}" data-tip="fx-${k}"><b>${g}</b><span class="xl">${l}</span></div>`).join('');
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <div class="patient">${faceSVG()}${Clinic.findings([
          { k: 'blink', label: 'Corneal blink', icon: '✧', kind: 'lr', test: 'corneal', tip: 'ft-corneal' },
          { k: 'sens', label: 'Sensation', icon: '▦', kind: 'val', test: 'sensation', tip: 'ft-sensation' },
          { k: 'taste', label: 'Taste', icon: '◇', kind: 'tongue', test: 'taste', tip: 'ft-taste' },
          { k: 'sound', label: 'Loud sound', icon: '♪', kind: 'lr', test: 'sound', tip: 'ft-sound' },
          { k: 'tears', label: 'Tears', icon: '◖', kind: 'lr', test: 'tears', tip: 'ft-tears' }])}</div>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear · all on the patient’s right</small></div>
          <div class="dgroups">${group('V')}${group('VII')}</div>
        </section>
        <section class="step">
          <div class="step-h"><span class="sn">2</span><b>Ask the patient to…</b>${act('hover')}<small>watch the face and the circuit respond</small></div>
          <div class="mchips xchips">${ex}</div>
        </section>
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  // ── what the face does
  function resolve() {
    const m = mode;
    const weakUpR = ['bell', 'chorda', 'stap', 'genic'].includes(m);
    return {
      weakUpR, weakLoR: weakUpR || m === 'umn',
      noTasteR: ['chorda', 'stap', 'genic'].includes(m),
      hyperR: ['stap', 'genic'].includes(m),
      dryR: m === 'genic', vesicles: m === 'genic',
      jawDev: m === 'v3', weakJawR: m === 'v3',
      afferent: m !== 'v1', weakCorneal: m === 'spinalV'
    };
  }

  function mouth(s) {
    let cR = [190, 246], cL = [250, 246], up = 242, lo = 252, shift = 0;
    if (s.weakLoR) cR[1] += 5;
    if (held === 'smile') {
      if (!s.weakLoR) { cR = [182, 237]; } cL = [258, 237]; up = 240; lo = 258;
    }
    if (held === 'puff') { lo = up + 6; }
    if (held === 'jaw') { lo += 20; cR[1] += 5; cL[1] += 5; shift = s.jawDev ? -8 : 0; }
    const outer = `M${cR[0]},${cR[1]} C${cR[0] + 10},${up - 7} ${cL[0] - 10},${up - 7} ${cL[0]},${cL[1]} C${cL[0] - 10 + shift},${lo + 7} ${cR[0] + 10 + shift},${lo + 7} ${cR[0]},${cR[1]} Z`;
    const inner = `M${cR[0] + 3},${cR[1]} C${cR[0] + 12},${up + 1} ${cL[0] - 12},${up + 1} ${cL[0] - 3},${cL[1]} C${cL[0] - 12 + shift},${lo - 1} ${cR[0] + 12 + shift},${lo - 1} ${cR[0] + 3},${cR[1]} Z`;
    return { outer, inner, open: lo - up > 9 };
  }

  const $id = (x) => document.getElementById(x);
  const tf = (id, v) => { const el = $id(id); if (el) el.style.transform = v; };
  const cls = (id, c, on) => $id(id)?.classList.toggle(c, !!on);

  function apply() {
    if (!$id('fface')) return;
    const s = resolve();
    const raise = held === 'brows', close = held === 'close';
    tf('browR', `translateY(${s.weakUpR ? 4 : raise ? -9 : 0}px)`);
    tf('browL', `translateY(${raise ? -9 : 0}px)`);
    cls('wrR', 'on', raise && !s.weakUpR);
    cls('wrL', 'on', raise);
    tf('flid-R', `translateY(${close ? (s.weakUpR ? 3 : 17) : 0}px)`);
    tf('flid-L', `translateY(${close ? 17 : 0}px)`);
    tf('firis-R', `translateY(${close && s.weakUpR ? -7 : 0}px)`);
    const puff = held === 'puff';
    tf('chR', `scale(${puff ? (s.weakLoR ? 1.04 : 1.24) : 1})`);
    tf('chL', `scale(${puff ? 1.24 : 1})`);
    cls('leak', 'on', puff && s.weakLoR);
    cls('chR', 'on', puff); cls('chL', 'on', puff);
    cls('nlR', 'flat', s.weakLoR);
    const clench = held === 'clench';
    cls('maR', 'on', clench && !s.weakJawR);
    cls('maL', 'on', clench);
    tf('lowerJaw', held === 'jaw' ? `translate(${s.jawDev ? -10 : 0}px, 16px)` : 'none');
    const mo = mouth(s);
    $id('mouth').setAttribute('d', mo.outer);
    $id('mouthIn').setAttribute('d', mo.inner);
    cls('mouthIn', 'open', mo.open);

    // the hovered test, acted out on the face
    const corneal = probe === 'corneal', sens = probe === 'sensation';
    const blinkR = s.afferent && !s.weakUpR, blinkL = s.afferent;  // who blinks when the right cornea is touched
    cls('wisp', 'on', corneal);
    ['R', 'L'].forEach(side => {
      const on = corneal && (side === 'R' ? blinkR : blinkL);
      cls(`flidw-${side}`, 'blink', on && !s.weakCorneal);
      cls(`flidw-${side}`, 'blinkWeak', on && s.weakCorneal);
      cls(`flidw-${side}`, 'idle', !corneal && !held);
    });
    cls('fderm', 'on', sens);
    cls('dR1', 'numb', mode === 'v1');
    cls('dR3', 'numb', mode === 'v3');
    cls('onion', 'on', mode === 'spinalV');
    cls('bolts', 'on', sens && mode === 'neuralgia');
    cls('wavesR', 'on', probe === 'sound'); cls('wavesL', 'on', probe === 'sound');
    cls('wavesR', 'loud', probe === 'sound' && s.hyperR);
    cls('tearR', 'on', probe === 'tears' && !s.dryR);
    cls('tearL', 'on', probe === 'tears');
    cls('vesic', 'on', s.vesicles);

    // findings strip: every result, always
    const blink = (on) => !on ? ['no', 'no blink'] : s.weakCorneal ? ['part', 'weak'] : ['ok', 'blinks'];
    const lr = (k, r, l) => { Clinic.setCell(k, 'R', ...r); Clinic.setCell(k, 'L', ...l); Clinic.setNote(k, Clinic.sides(r, l)); };
    lr('blink', blink(blinkR), blink(blinkL));
    const SENS = { v1: ['no', 'R V1 numb'], v3: ['no', 'R V3 numb'], spinalV: ['part', 'R onion-skin'], neuralgia: ['part', 'trigger zone'] };
    const sv = SENS[mode] || ['ok', 'normal'];
    Clinic.setCell('sens', null, sv[0], sv[1]);
    Clinic.setNote('sens', mode === 'neuralgia' ? 'touch sets off the pain' : 'pinprick, both sides');
    Clinic.setZones('taste', { aR: s.noTasteR ? 'no' : 'ok' });
    Clinic.setNote('taste', s.noTasteR ? 'front ⅔ right: lost' : 'front ⅔ right: tastes');
    lr('tears', s.dryR ? ['no', 'dry'] : ['ok', 'normal'], ['ok', 'normal']);
    lr('sound', s.hyperR ? ['no', 'too loud'] : ['ok', 'comfortable'], ['ok', 'comfortable']);
    paintCircuit();
  }

  function paintCircuit() {
    // a hovered expression or test shows its own pathway; at rest, every test's pathway is drawn
    const chains = held ? CHAINS[EX_CHAIN[held]] : probe ? CHAINS[probe] : TESTS.flatMap(k => CHAINS[k]);
    Clinic.paint($id('fcircuit'), chains, (FC_LES[mode] || NONE).blk);
  }

  function paintLesion() {
    Clinic.marks($id('fcmarks'), (FC_LES[mode] || NONE).marks);
    const d = FACE_LESIONS[mode];
    Clinic.explain($id('explain'), d, 'Pick a lesion in step 1 — this panel then explains what the face does and why.', d ? d.n : '');
    Clinic.suggest($id('card-eyes'), ['ex', 'test'], d ? d.try.keys : []);
  }

  function bind(root) {
    root.querySelectorAll('[data-ex]').forEach(b => {
      b.addEventListener('mouseenter', () => { held = b.dataset.ex; apply(); });
      b.addEventListener('mouseleave', () => { held = null; apply(); });
    });
    Clinic.probe(root, k => { probe = k; apply(); });
    root.querySelectorAll('[data-fl]').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.fl ? null : b.dataset.fl;
      root.querySelectorAll('[data-fl]').forEach(c => c.classList.toggle('on', c.dataset.fl === mode));
      paintLesion(); apply();
    }));
    held = null; probe = null;
    paintLesion();
    requestAnimationFrame(apply);
  }

  return { render, bind };
})();
