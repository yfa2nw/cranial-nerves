// ─────────────────────────────────────────────────────────────
//  iv. Movements card – a living pair of eyes + the gaze circuit.
//  Patient's right eye is on the viewer's left. Lesions are right-sided.
// ─────────────────────────────────────────────────────────────

const Eyes = (() => {
  const EYE = 'M-72,0 C-42,-40 42,-40 72,0 C42,34 -42,34 -72,0 Z';
  const LID = 'M-90,-96 H90 V0 C42,-40 -42,-40 -90,0 Z';
  const REACH = [20, 13];          // iris travel in px for a unit gaze vector
  const LID_REST = 6;              // upper lid normally covers the top of the iris

  let gaze = [0, 0], held = null, mode = null, nerve = 'III', idleTimer = null;
  const px = { light: false, near: false };          // reflex switches (click to toggle)
  const on = k => px[k];
  const info = () => (mode === 'palsy' ? DISORDERS[nerve] : DISORDERS[mode]);

  // ── gaze circuit geometry (viewBox 0 0 260 296)
  const CIRCUIT = {
    rIIIn: { f: 'GSE', tip: 'c-iii-n', d: 'M100,108 C98,80 92,62 88,48' },
    lIIIn: { f: 'GSE', tip: 'c-iii-n', d: 'M160,108 C162,80 168,62 172,48' },
    rVIn:  { f: 'GSE', tip: 'c-vi-n',  d: 'M84,200 C50,180 36,110 40,50' },
    lVIn:  { f: 'GSE', tip: 'c-vi-n',  d: 'M176,200 C210,180 224,110 220,50' },
    mlfR:  { f: 'GSE', tip: 'c-mlf',   d: 'M176,200 C150,196 118,190 112,176 C108,160 104,130 100,108' },
    mlfL:  { f: 'GSE', tip: 'c-mlf',   d: 'M84,200 C110,196 142,190 148,176 C152,160 156,130 160,108' },
    rPP:   { f: 'GSE', tip: 'c-pprf',  d: 'M98,240 C94,228 88,214 84,200' },
    lPP:   { f: 'GSE', tip: 'c-pprf',  d: 'M162,240 C166,228 172,214 176,200' },
    vert:  { f: 'GSE', tip: 'c-rimlf', d: 'M130,80 C118,88 108,98 100,108 M130,80 C142,88 152,98 160,108' },
    plr:   { f: 'GVE', tip: 'c-plr',   d: 'M122,76 C117,82 114,88 112,95 M138,76 C143,82 146,88 148,95' },
    symp:  { f: 'SYM', tip: 'c-symp',  d: 'M14,286 C12,200 12,120 16,76 C20,56 30,46 44,38' }
  };

  // blocked segments + marker positions for each lesion
  const LESIONS = {
    III:      { blk: ['rIIIn'], marks: [[93, 72, 'D-III']] },
    IV:       { blk: [], marks: [] },
    VI:       { blk: ['rVIn'], marks: [[40, 124, 'D-VI']] },
    ino:      { blk: ['mlfR'], marks: [[106, 148, 'D-ino']] },
    onehalf:  { blk: ['rPP', 'rVIn', 'mlfL', 'mlfR'], marks: [[84, 200, 'D-onehalf'], [106, 148, 'D-onehalf']] },
    vinuc:    { blk: ['rVIn', 'mlfL'], marks: [[84, 200, 'D-vinuc']] },
    parinaud: { blk: ['vert', 'plr'], marks: [[130, 80, 'D-parinaud']] },
    argyll:   { blk: ['plr'], marks: [[116, 86, 'D-argyll']] },
    horner:   { blk: ['symp'], marks: [[13, 186, 'D-horner']] },
    adie:     { blk: [], marks: [[80, 46, 'D-adie']] },                       // ciliary ganglion sits beyond the drawn circuit
    uncal:    { blk: ['rIIIn'], marks: [[93, 72, 'D-uncal']] },
    mg:       { blk: [], marks: [[64, 60, 'D-mg']] },                         // the circuit is intact — the synapse at the muscle fails
    cavsinus: { blk: ['rIIIn', 'rVIn', 'symp'], marks: [[93, 72, 'D-cavsinus'], [40, 124, 'D-cavsinus']] }
  };
  const NONE = { blk: [], marks: [] };
  const lesionKey = () => (mode === 'palsy' ? nerve : mode);
  const lesionNow = () => LESIONS[lesionKey()] || NONE;

  function crypts() {
    let s = '';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2, r1 = 12, r2 = 26 + (i % 3);
      s += `<path d="M${(Math.cos(a) * r1).toFixed(1)},${(Math.sin(a) * r1).toFixed(1)} L${(Math.cos(a) * r2).toFixed(1)},${(Math.sin(a) * r2).toFixed(1)}"/>`;
    }
    return s;
  }

  function eye(side, cx) {
    return `
    <g transform="translate(${cx},122)" class="eye eye-${side}" data-tip="globe">
      <clipPath id="clip-${side}"><path d="${EYE}"/></clipPath>
      <path d="${EYE}" fill="url(#scleraFront)"/>
      <g clip-path="url(#clip-${side})">
        <g class="iris-g" id="iris-${side}"><g class="iris-j" id="irisj-${side}">
          <circle r="29" fill="url(#iris)"/>
          <g class="crypt">${crypts()}</g>
          <path class="notch" d="M0,-28 L0,-18"/>
          <circle r="10" class="pupil" id="pupil-${side}"/>
          <circle cx="-8" cy="-9" r="4.5" fill="#fff" opacity=".85"/>
        </g></g>
        <path d="${LID}" class="lid" id="lid-${side}" fill="url(#skin)"/>
      </g>
      <path d="${EYE}" class="eye-line"/>
      <g class="vec" id="vec-${side}"></g>
    </g>`;
  }

  function circuit() {
    const segs = Clinic.segs(CIRCUIT);
    const pill = (x, tip) => `<g class="cm" data-tip="${tip}"><ellipse cx="${x}" cy="40" rx="4.5" ry="11" fill="url(#musclePlain)"/></g>`;
    return `
    <svg viewBox="0 0 260 296" class="circuit" id="circuit">
      <path class="midline" d="M130,52 L130,276"/>
      <g class="c-eye" data-tip="globe"><circle cx="64" cy="34" r="19"/><circle cx="196" cy="34" r="19"/></g>
      ${pill(40, 'LR')}${pill(88, 'MR')}${pill(172, 'MR')}${pill(220, 'LR')}
      <g data-tip="c-pretect"><ellipse cx="130" cy="78" rx="22" ry="8" class="pretect"/></g>
      ${segs}
      <g class="cn" data-tip="n-III"><circle cx="100" cy="108" r="8" fill="url(#nucGSE)"/><circle cx="160" cy="108" r="8" fill="url(#nucGSE)"/></g>
      <g class="cn" data-tip="n-EW"><circle cx="112" cy="96" r="4.5" fill="url(#nucGVE)"/><circle cx="148" cy="96" r="4.5" fill="url(#nucGVE)"/></g>
      <g class="cn" data-tip="n-VI"><circle cx="84" cy="200" r="8" fill="url(#nucGSE)"/><circle cx="176" cy="200" r="8" fill="url(#nucGSE)"/></g>
      <g class="cn pprf" data-tip="c-pprf"><ellipse cx="98" cy="242" rx="10" ry="6"/><ellipse cx="162" cy="242" rx="10" ry="6"/></g>
      <g data-tip="c-symp"><path class="ganglion" d="M14,244 C19,245 21,250 19,254 C17,258 11,258 9,254 C7,250 9,245 14,244 Z"/></g>
      <g id="cmarks"></g>
      <g class="labels">
        <text class="lbl" x="64" y="70" text-anchor="middle">R</text><text class="lbl" x="196" y="70" text-anchor="middle">L</text>
        <text class="lbl faint" x="130" y="64" text-anchor="middle">PRETECTUM</text>
        <text class="lbl" x="86" y="112" text-anchor="end">III</text><text class="lbl" x="68" y="204" text-anchor="end">VI</text>
        <text class="lbl faint" x="130" y="262" text-anchor="middle">PPRF</text><text class="lbl faint" x="130" y="150" text-anchor="middle">MLF</text>
        <text class="lbl faint" x="24" y="282" text-anchor="start">T1 · SCG</text>
        <text class="lbl faint" x="256" y="112" text-anchor="end">MIDBRAIN</text><text class="lbl faint" x="256" y="214" text-anchor="end">PONS</text>
      </g>
    </svg>`;
  }

  function render(id) {
    nerve = id;
    const chips = Object.entries(MUSCLES).map(([k, m]) =>
      `<div class="mchip hv ${m.n === id ? 'mine' : ''}" data-mus="${k}" data-tip="${k}">
        <b>${k}</b><span class="nb">${m.n}</span>
        <i>${m.acts.map(a => glyph(a)).join('')}</i>
      </div>`).join('');
    const dirs = [[-.72, -.72, '↖'], [0, -1, '↑'], [.72, -.72, '↗'], [-1, 0, '←'], [0, 0, '•'], [1, 0, '→'], [-.72, .72, '↙'], [0, 1, '↓'], [.72, .72, '↘']];
    const pad = dirs.map(([x, y, g]) => `<div class="gp hv" data-g="${x},${y}">${g}</div>`).join('');
    const dchips = [['palsy', `${id} palsy`, `D-${id}`],
      ...Object.entries(DISORDERS).filter(([, d]) => !d.palsy).map(([k, d]) => [k, d.chip, `D-${k}`])]
      .map(([k, label, tip]) => `<button class="dchip ck ${mode === k ? 'on' : ''}" data-dis="${k}" data-tip="${tip}"><i></i>${label}</button>`).join('');
    const sw = (k, icon, label) => Clinic.sw(k, 'px', px[k], icon, label, `px-${k}`);
    const act = Clinic.act;
    return `
    <div class="eyes-wrap">
      <div class="eyes-top">
        <svg viewBox="0 0 440 236" class="eyes-svg">
          <g id="face">
            <path class="brow" d="M60,62 C92,40 160,40 196,62"/><path class="brow" d="M244,62 C280,40 348,40 380,62"/>
            <path class="nose" d="M208,96 C204,140 196,170 210,186 M232,96 C236,140 244,170 230,186"/>
            ${eye('R', 130)}${eye('L', 310)}
            <path id="tiltArrow" class="tilt" d="M380,206 C410,180 418,150 414,120" marker-end="url(#arrowW)"/>
          </g>
          <text class="lbl faint" x="130" y="210" text-anchor="middle">RIGHT EYE</text>
          <text class="lbl faint" x="310" y="210" text-anchor="middle">LEFT EYE</text>
        </svg>
        ${circuit()}
      </div>
      <div class="eye-ctrl">
        <section class="step">
          <div class="step-h"><span class="sn">1</span><b>Pick a lesion</b>${act('click')}<small>one at a time · click again to clear · all lesions are on the patient’s right</small></div>
          <div class="dchips">${dchips}</div>
        </section>
        <section class="step">
          <div class="step-h"><span class="sn">2</span><b>Test the eyes</b><small>watch the eyes and the circuit respond</small></div>
          <div class="test-grid">
            <div class="tcol">
              <div class="sub-h">${act('hover')}look</div>
              <div class="gpad">${pad}</div>
              <small class="cap">← = patient’s right</small>
            </div>
            <div class="tcol grow">
              <div class="sub-h">${act('hover')}one muscle’s pull</div>
              <div class="mchips">${chips}</div>
            </div>
            <div class="tcol">
              <div class="sub-h">${act('click')}reflex on / off</div>
              <div class="switches">${sw('light', '☀', 'Light')}${sw('near', '◎', 'Near')}</div>
            </div>
          </div>
        </section>
      </div>
      ${Clinic.explainShell()}
    </div>`;
  }

  function glyph(a) {
    const g = { Elevation: '↑', Depression: '↓', Adduction: '→', Abduction: '←', Intorsion: '↻', Extorsion: '↺', 'Lid elevation': '⌃' }[a];
    return `<em title="${a}">${g}</em>`;
  }

  // Where does each eye actually point, given gaze + near + lesion?
  function resolve(g) {
    const s = { R: [...g], L: [...g], rot: 0, lidR: 0, lidL: 0, pupR: 1, pupL: 1, nysL: false, cr: false, irregular: false, tilt: 0,
      tonic: false, fatigue: false, chemosis: false };
    const near = on('near'), light = on('light');
    let lightOK = true, fixedR = false;
    if (near) { s.R = [0.6, g[1] + 0.12]; s.L = [-0.6, g[1] + 0.12]; }

    switch (lesionKey()) {
      case 'III':
        s.R = !near && g[0] < -0.3 ? [-1, 0.5] : [-0.75, 0.5];
        s.lidR = 36; s.pupR = 1.55; fixedR = true; break;
      case 'IV':
        if (near) s.R[1] -= 0.22;
        else s.R = g[0] > 0.3 && g[1] > 0.3 ? [g[0], -0.12] : [g[0], g[1] - 0.22];
        s.rot = -11; s.tilt = 9; break;
      case 'VI':
        if (!near) s.R = [g[0] < 0 ? 0.08 : Math.max(g[0], 0.4), g[1]]; break;
      case 'ino':
        if (!near && g[0] > 0.3) { s.R = [0.05, g[1]]; s.nysL = true; } break;
      case 'onehalf':
        if (!near && g[0] < -0.3) { s.R = [0, g[1]]; s.L = [0, g[1]]; }
        if (!near && g[0] > 0.3) { s.R = [0, g[1]]; s.nysL = true; } break;
      case 'vinuc':
        if (!near && g[0] < -0.3) { s.R = [0, g[1]]; s.L = [0, g[1]]; } break;
      case 'parinaud':
        if (g[1] < -0.2) { s.R = [s.R[0], 0.04]; s.L = [s.L[0], 0.04]; s.cr = true; }
        s.lidR = s.lidL = -9; s.pupR = s.pupL = 1.3; lightOK = false; break;
      case 'argyll':
        s.pupR = s.pupL = 0.6; s.irregular = true; lightOK = false; break;
      case 'horner':
        s.pupR = 0.7; s.lidR = 9; break;
      case 'adie':                    // big pupil: barely reacts to light, slow strong response to near
        s.pupR = 1.45 * (light ? 0.93 : 1) * (near ? 0.55 : 1); s.tonic = true; fixedR = true; break;
      case 'uncal':                   // surface pupil fibres go first; movements still nearly normal
        s.pupR = 1.6; s.lidR = 5; fixedR = true; break;
      case 'mg':                      // fatigable, asymmetric ptosis; variable weakness; pupils untouched
        s.lidR = 14; s.lidL = 5;
        if (g[1] < -0.3) { s.lidR = 30; s.lidL = 15; s.fatigue = true; }
        if (!near && g[0] < -0.3) s.R = [-0.55, g[1]];
        break;
      case 'cavsinus':                // III, IV, VI all lost: frozen eye; para + sympathetic lost: mid-sized fixed pupil
        s.R = [0, 0.04]; s.lidR = 34; s.pupR = 1.2; fixedR = true; s.chemosis = true; break;
    }

    const k = (light && lightOK ? 0.55 : 1) * (near ? 0.65 : 1);
    if (!fixedR) s.pupR *= k;
    s.pupL *= k;
    return s;
  }

  function apply() {
    const s = resolve(gaze);
    const lift = held && MUSCLES[held]?.lid ? -10 : 0;
    const set = (side, v, rot, pup, lid) => {
      const iris = document.getElementById(`iris-${side}`);
      if (!iris) return;
      iris.style.transform = `translate(${v[0] * REACH[0]}px, ${v[1] * REACH[1]}px) rotate(${rot}deg)`;
      document.getElementById(`pupil-${side}`).style.transform = s.irregular
        ? `rotate(25deg) scale(${pup * 0.8}, ${pup})` : `scale(${pup})`;
      document.getElementById(`lid-${side}`).style.transform = `translateY(${LID_REST + (lid || lift)}px)`;
    };
    set('R', s.R, s.rot, s.pupR, s.lidR);
    set('L', s.L, 0, s.pupL, s.lidL);
    document.getElementById('pupil-R')?.classList.toggle('tonic', s.tonic);
    ['R', 'L'].forEach(side => document.getElementById(`lid-${side}`)?.classList.toggle('fatigue', s.fatigue));
    document.querySelector('.eyes-svg .eye-R')?.classList.toggle('chemosis', s.chemosis);
    document.getElementById('irisj-L')?.classList.toggle('nys-abd', s.nysL);
    document.getElementById('irisj-R')?.classList.toggle('cr-R', s.cr);
    document.getElementById('irisj-L')?.classList.toggle('cr-L', s.cr);
    const face = document.getElementById('face');
    if (face) face.style.transform = `rotate(${s.tilt}deg)`;
    document.getElementById('tiltArrow')?.classList.toggle('on', s.tilt !== 0);
    paintCircuit();
  }

  // signal chains that fire for the current gaze / reflex, upstream → downstream
  function chains() {
    const c = [['symp']];
    if (gaze[0] < -0.3) c.push(['rPP', 'rVIn'], ['rPP', 'mlfL', 'lIIIn']);
    if (gaze[0] > 0.3) c.push(['lPP', 'lVIn'], ['lPP', 'mlfR', 'rIIIn']);
    if (Math.abs(gaze[1]) > 0.3) c.push(['vert', 'rIIIn'], ['vert', 'lIIIn']);
    if (on('light')) c.push(['plr']);
    if (on('near')) c.push(['rIIIn'], ['lIIIn']);
    return c;
  }

  function paintCircuit() {
    Clinic.paint(document.getElementById('circuit'), chains(), lesionNow().blk);
  }

  function paintLesion() {
    Clinic.marks(document.getElementById('cmarks'), lesionNow().marks);
    const d = info();
    Clinic.explain(document.getElementById('explain'), d, 'Pick a lesion in step 1 — this panel then explains what the eyes do and why.');
    Clinic.suggest(document.getElementById('card-eyes'), ['g', 'px'], d ? d.try.keys : []);
  }

  function showVector(k) {
    const el = document.getElementById('vec-R');
    if (!el) return;
    if (!k) { el.innerHTML = ''; return; }
    const v = MUSCLES[k].v, len = 46;
    const tors = MUSCLES[k].acts.find(a => a.endsWith('torsion'));
    el.innerHTML = `<path d="M0,0 L${v[0] * len},${v[1] * len * 0.8}" class="v-arrow" marker-end="url(#arrowR)"/>` +
      (tors ? `<path d="${tors === 'Intorsion' ? 'M-20,-36 C10,-46 34,-30 40,-8' : 'M20,-36 C-10,-46 -34,-30 -40,-8'}" class="v-tors" marker-end="url(#arrowR)"/>` : '');
  }

  function idle() {
    clearInterval(idleTimer);
    idleTimer = setInterval(() => {
      if (held || on('near') || document.hidden || document.getElementById('card-eyes')?.closest('.card').classList.contains('paused')) return;
      gaze = Math.random() < 0.35 ? [0, 0] : [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.35];
      apply();
    }, 2300);
  }

  function bind(root) {
    const look = (g, k = 'gaze') => { held = k; gaze = g; apply(); };
    const release = () => { held = null; gaze = [0, 0]; showVector(null); apply(); };
    root.querySelectorAll('.mchip').forEach(b => {
      b.addEventListener('mouseenter', () => { showVector(b.dataset.mus); look(MUSCLES[b.dataset.mus].v, b.dataset.mus); });
      b.addEventListener('mouseleave', release);
    });
    root.querySelectorAll('.gp').forEach(b => {
      b.addEventListener('mouseenter', () => look(b.dataset.g.split(',').map(Number)));
      b.addEventListener('mouseleave', release);
    });
    root.querySelectorAll('[data-px]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.px;
      px[k] = !px[k]; b.classList.toggle('on', px[k]); apply();
    }));
    root.querySelectorAll('.dchip').forEach(b => b.addEventListener('click', () => {
      mode = mode === b.dataset.dis ? null : b.dataset.dis;
      root.querySelectorAll('.dchip').forEach(c => c.classList.toggle('on', c.dataset.dis === mode));
      paintLesion(); apply();
    }));
    gaze = [0, 0]; held = null;
    paintLesion();
    requestAnimationFrame(apply);
    idle();
  }

  return { render, bind, stop: () => clearInterval(idleTimer) };
})();
