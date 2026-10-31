// ─────────────────────────────────────────────────────────────
//  Olfaction physiology popup: transduction cascade · combinatorial
//  code → glomerular map · cortical parsing in piriform
// ─────────────────────────────────────────────────────────────

const Olfaction = (() => {
  // ── 1. transduction steps (title, line) – the svg reveals one stage per step
  const STEPS = [
    ['Odorant binds', 'A volatile molecule dissolves in the mucus and docks in an olfactory receptor (OR) — a 7-transmembrane GPCR on the cilia.'],
    ['Gα<sub>olf</sub> activates', 'The receptor swaps GDP for GTP on Gα<sub>olf</sub>, which breaks away from βγ.'],
    ['cAMP is made', 'Gα<sub>olf</sub> switches on adenylyl cyclase III. One receptor → many cAMP: the first amplification.'],
    ['CNG channels open', 'cAMP opens cyclic-nucleotide-gated channels — Na⁺ and Ca²⁺ flow in.'],
    ['Cl⁻ flows out', 'Ca²⁺ opens Ca²⁺-activated Cl⁻ channels (ANO2). The neuron keeps Cl⁻ high inside (NKCC1), so Cl⁻ leaves — most of the current, a second amplification.'],
    ['Spikes to the bulb', 'The receptor potential spreads to the soma; action potentials run along the unmyelinated axon, through the cribriform plate.'],
    ['Adaptation', 'Ca²⁺–calmodulin makes CNG channels less sensitive, PDE1C clears cAMP, GRK3 / arrestin uncouple the receptor — a steady odour fades.']
  ];

  // ── 2–3. eight receptor types · four odours. strong = low concentration, extra = recruited only when strong
  const TYPES = ['#ffb547', '#5fe0a0', '#ff8fa3', '#79e0ee', '#b78cff', '#ffe066', '#ff6b6b', '#9ad0ff'];
  const NAMES = 'ABCDEFGH';
  const ODORS = {
    lemon:  { name: 'Lemon',  mol: 'limonene',        icon: '◐', strong: [0, 3], extra: [5] },
    rose:   { name: 'Rose',   mol: 'phenylethanol',   icon: '✿', strong: [1, 4], extra: [6] },
    banana: { name: 'Banana', mol: 'isoamyl acetate', icon: '◗', strong: [2, 3], extra: [7] },
    cheese: { name: 'Cheese', mol: 'butyric acid',    icon: '▱', strong: [5, 7], extra: [0, 6] }
  };

  // longer explanations for the harder steps · [heading, text]
  const WHY = {
    cascade: [
      ['Two amplifiers', 'One receptor activates many Gα<sub>olf</sub>; each cyclase makes many cAMP. Then the Ca²⁺ entering through CNG channels opens ANO2, and Cl⁻ efflux adds most of the current — a handful of molecules can trigger a spike.'],
      ['Why Cl⁻ leaves', 'Most neurons keep Cl⁻ low, so opening Cl⁻ channels inhibits them. Receptor neurons pump Cl⁻ in with NKCC1, which puts its equilibrium potential above rest — so Cl⁻ flows out and depolarises. It also shields the signal from the variable salt content of mucus.'],
      ['Ca²⁺ is signal and brake', 'Within seconds Ca²⁺–calmodulin lowers the CNG channel’s sensitivity to cAMP; PDE1C and GRK3 / β-arrestin act more slowly. Longer-lasting adaptation happens in the bulb and cortex.']
    ],
    map: [
      ['Zones and convergence', 'Each receptor type is expressed in a broad epithelial zone, scattered within it. All its axons find the same glomerulus (one medial, one lateral per bulb) — over a thousand inputs each, so weak signals add up and noise averages out.'],
      ['A combinatorial code', 'Receptors are broadly tuned: each answers many odorants, and each odorant drives several receptors with graded strength. ~400 types combined this way can separate a vast number of odours; similar molecules drive overlapping sets and can smell alike.'],
      ['Lateral inhibition', 'Mitral cell dendrites excite granule cells, which inhibit neighbouring mitral cells through reciprocal dendrodendritic synapses (periglomerular cells do the same at the surface). Strongly driven glomeruli silence weakly driven ones — contrast sharpens and the pattern depends less on concentration.']
    ],
    cortex: [
      ['Coincidence detection', 'Each piriform pyramidal cell samples random glomeruli and fires only when several are active at once. The odour is coded by which cells fire together — a distributed ensemble, not a place.'],
      ['Completion and separation', 'Recurrent collaterals strengthen between cells that fire together (Hebbian learning). A partial input re-ignites the whole ensemble — pattern completion — while overlapping odours are pushed apart — pattern separation.'],
      ['From object to meaning', 'Piriform → orbitofrontal cortex (directly and via MD thalamus) gives identity, value and flavour, combined with taste. The amygdala tags emotion, entorhinal → hippocampus files the context, and hunger reshapes OFC responses (sensory-specific satiety).']
    ]
  };
  const why = (k) => Info.why(WHY[k]);

  let odor = 'lemon', high = false, inhib = false, partial = false, steps = null;

  // seeded random so the piriform wiring is the same every time
  const rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  // ── 1. transduction svg (viewBox 0 0 900 300) · outside above the membrane, cytoplasm below
  function cascadeSVG() {
    const helices = [...Array(7)].map((_, i) => `<rect x="${112 + i * 10}" y="106" width="8" height="54" rx="4"/>`).join('');
    const hex = 'M9,0 L4.5,7.8 L-4.5,7.8 L-9,0 L-4.5,-7.8 L4.5,-7.8 Z';
    const pent = 'M0,-6 L5.7,-1.9 L3.5,4.9 L-3.5,4.9 L-5.7,-1.9 Z';
    const ions = (x, cls, n, lab) => [...Array(n)].map((_, i) =>
      `<g class="ion ${cls}" style="animation-delay:${-i * 0.45}s"><circle cx="${x + (i % 2 ? 6 : -6)}" cy="0" r="5"/><text x="${x + (i % 2 ? 6 : -6)}" y="3">${lab}</text></g>`).join('');
    return `
    <svg viewBox="0 0 900 256" class="olt" id="olt">
      <rect x="0" y="0" width="710" height="118" rx="12" class="ol-mucus"/>
      <text x="18" y="22" class="fx-lab dim" style="text-anchor:start">MUCUS · OUTSIDE THE CILIUM</text>
      <text x="18" y="248" class="fx-lab dim" style="text-anchor:start">CYTOPLASM</text>
      <g class="ol-mem"><rect x="20" y="118" width="680" height="30" class="ol-memb"/><path d="M20,120 L700,120 M20,146 L700,146" class="ol-heads"/></g>

      <g class="prot p1" data-tip="olOR"><g class="ol-or">${helices}</g><text x="146" y="182" class="ol-pl">OR</text></g>
      <g class="prot p3" data-tip="olAC"><rect x="362" y="104" width="20" height="58" rx="8" class="ol-ac"/><rect x="388" y="104" width="20" height="58" rx="8" class="ol-ac"/>
        <ellipse cx="385" cy="182" rx="28" ry="15" class="ol-ac"/><text x="385" y="186" class="ol-pl dk">AC III</text></g>
      <g class="prot p4" data-tip="olCNG"><rect x="496" y="100" width="20" height="66" rx="7" class="ol-cng"/><rect x="528" y="100" width="20" height="66" rx="7" class="ol-cng"/>
        <text x="522" y="186" class="ol-pl">CNG</text><g class="st7 ol-cam"><circle cx="560" cy="170" r="10"/><text x="560" y="174">CaM</text></g></g>
      <g class="prot p5" data-tip="olANO"><rect x="636" y="100" width="20" height="66" rx="7" class="ol-ano"/><rect x="668" y="100" width="20" height="66" rx="7" class="ol-ano"/>
        <text x="662" y="186" class="ol-pl">ANO2</text></g>

      <g class="ol-g p2" data-tip="olG">
        <g class="galpha"><ellipse cx="236" cy="180" rx="22" ry="14"/><text x="236" y="184" class="ol-gtx"><tspan class="gdp">GDP</tspan><tspan class="gtp">GTP</tspan></text></g>
        <circle cx="262" cy="172" r="8" class="gbg"/><circle cx="268" cy="188" r="7" class="gbg"/><text x="286" y="200" class="ol-pl sm">βγ</text>
      </g>
      <g class="odor-m" data-tip="olOdor"><path d="${hex}" class="ol-odor"/></g>
      ${[[300, 44], [430, 70], [600, 36]].map(([x, y]) => `<path d="${hex}" transform="translate(${x},${y}) scale(.8)" class="ol-odor idle"/>`).join('')}

      <g class="st3 ol-camp">${[0, 1, 2, 3].map(i => `<path d="${pent}" class="camp" style="animation-delay:${-i * 0.4}s"/>`).join('')}</g>
      <text x="452" y="226" class="ol-pl sm st3">cAMP</text>
      <g class="st4 ol-ions-in">${ions(522, 'na', 3, 'Na')}${ions(522, 'ca', 2, 'Ca')}</g>
      <g class="st5 ol-ions-out">${ions(662, 'cl', 4, 'Cl')}</g>

      <g class="ol-trace">
        <rect x="724" y="0" width="176" height="256" rx="12" class="ol-tbox"/>
        <text x="812" y="24" class="fx-lab dim">MEMBRANE POTENTIAL</text>
        <path d="M738,206 L886,206" class="ol-rest"/><text x="884" y="224" class="ol-tl" style="text-anchor:end">rest</text>
        <path d="M738,156 L886,156" class="ol-thr"/><text x="884" y="150" class="ol-tl" style="text-anchor:end">threshold</text>
        <path d="M744,206 L770,206" class="ol-v"/>
        <path d="M770,206 C778,206 780,188 790,188" class="ol-v st4"/>
        <path d="M790,188 C796,188 798,158 806,158" class="ol-v st5"/>
        <path d="M806,158 L810,60 L814,214 L819,158 L823,60 L827,214 L832,158 L836,60 L840,214 L845,160" class="ol-v spike st6"/>
        <path d="M845,160 C854,170 866,188 880,194" class="ol-v st7"/>
      </g>
    </svg>`;
  }

  // ── 2. epithelium → glomeruli (viewBox 0 0 900 300)
  // four epithelial zones, each expressing two receptor types; same-type axons converge on one glomerulus
  const NEURONS = [];
  for (let r = 0; r < 4; r++) for (let j = 0; j < 10; j++) {
    const jit = rng(r * 31 + j * 7 + 3);
    NEURONS.push({ type: 2 * r + ((j + r) % 2 ^ (j % 3 === 0 ? 1 : 0)), x: 44 + j * 27 + (jit() - .5) * 10, y: 68 + r * 55 + (jit() - .5) * 18 });
  }
  const GLOM = TYPES.map((_, i) => {
    const a = -1.12 + i * (2.24 / 7);
    return { x: 680 - 102 * Math.cos(a), y: 150 + 116 * Math.sin(a) };
  });

  function mapSVG() {
    const axons = NEURONS.map(n => {
      const g = GLOM[n.type];
      return `<path class="ol-ax" data-t="${n.type}" style="--c:${TYPES[n.type]}" d="M${n.x.toFixed(1)},${n.y.toFixed(1)} C${360},${n.y.toFixed(1)} ${500},${g.y.toFixed(1)} ${(g.x - 14).toFixed(1)},${g.y.toFixed(1)}"/>`;
    }).join('');
    const cells = NEURONS.map(n => `<circle class="ol-orn" data-t="${n.type}" style="--c:${TYPES[n.type]}" cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="6"/>`).join('');
    const gl = GLOM.map((g, i) => {
      const mx = g.x + (680 - g.x) * .36, my = g.y + (150 - g.y) * .36;
      return `<path class="ol-mit-ax" data-t="${i}" d="M${mx.toFixed(1)},${my.toFixed(1)} C${760},${my.toFixed(1)} ${790},150 820,150"/>
        <g data-tip="olGlom"><circle class="ol-glom" data-t="${i}" style="--c:${TYPES[i]}" cx="${g.x.toFixed(1)}" cy="${g.y.toFixed(1)}" r="14"/>
        <text x="${g.x.toFixed(1)}" y="${(g.y + 3.5).toFixed(1)}" class="ol-gl">${NAMES[i]}</text></g>
        <path class="ol-mit" data-t="${i}" d="M${mx.toFixed(1)},${(my - 7).toFixed(1)} L${(mx - 7).toFixed(1)},${(my + 6).toFixed(1)} L${(mx + 7).toFixed(1)},${(my + 6).toFixed(1)} Z"/>`;
    }).join('');
    return `
    <svg viewBox="0 0 900 300" class="olmap" id="olmap">
      <g data-tip="olfEpi"><rect x="20" y="36" width="300" height="230" rx="16" class="ol-epi"/></g>
      ${[95, 150, 205].map(y => `<path d="M30,${y} L310,${y}" class="ol-zone"/>`).join('')}
      <text x="170" y="28" class="fx-lab dim">EPITHELIUM · FOUR ZONES</text>
      ${axons}${cells}
      <g data-tip="bulb"><ellipse cx="680" cy="150" rx="112" ry="130" class="ol-bulb"/></g>
      <g data-tip="granule"><ellipse cx="704" cy="150" rx="42" ry="74" class="ol-gran" id="olGran"/></g>
      ${gl}
      ${fib('M820,150 L890,150', 'SVA', 'I-tract')}
      <text x="680" y="12" class="fx-lab dim">BULB · ONE GLOMERULUS PER TYPE</text>
      <text x="704" y="242" class="ol-tl" style="text-anchor:middle">granule cells</text>
      <text x="856" y="134" class="ol-tl" style="text-anchor:middle">to cortex ↓</text>
    </svg>`;
  }

  // receptor × odour matrix: the combinatorial code
  function matrixSVG() {
    const rows = Object.entries(ODORS).map(([k, o], r) => {
      const y = 44 + r * 30;
      const cells = TYPES.map((c, i) => {
        const lvl = o.strong.includes(i) ? 'st' : o.extra.includes(i) ? 'wk' : '';
        return `<rect class="mx-c ${lvl}" data-t="${i}" style="--c:${c}" x="${84 + i * 21}" y="${y - 12}" width="17" height="17" rx="4"/>`;
      }).join('');
      return `<g class="mx-row" data-odor="${k}"><rect x="2" y="${y - 16}" width="256" height="25" rx="8" class="mx-hl"/>
        <text x="10" y="${y + 1}" class="mx-l">${o.icon} ${o.name}</text>${cells}</g>`;
    }).join('');
    return `
    <svg viewBox="0 0 260 168" class="olmx">
      ${TYPES.map((c, i) => `<text x="${92.5 + i * 21}" y="16" class="mx-h" style="fill:${c}">${NAMES[i]}</text>`).join('')}
      ${rows}
      <rect x="84" y="152" width="12" height="12" rx="3" class="mx-c st" style="--c:#ececec"/><text x="100" y="162" class="mx-k">low dose</text>
      <rect x="162" y="152" width="12" height="12" rx="3" class="mx-c wk" style="--c:#ececec"/><text x="178" y="162" class="mx-k">+ high</text>
    </svg>`;
  }

  // ── 3. piriform: each glomerulus scatters to random cells; a cell fires with ≥2 active inputs
  const PIR = { cx: 400, cy: 150, rx: 200, ry: 100 };
  const PCELLS = (() => {
    const r = rng(42), out = [];
    while (out.length < 64) {
      const x = (r() * 2 - 1), y = (r() * 2 - 1);
      if (x * x + y * y < .82) out.push({ x: PIR.cx + x * PIR.rx, y: PIR.cy + y * PIR.ry });
    }
    return out;
  })();
  const GL3 = TYPES.map((_, i) => ({ x: 64, y: 50 + i * 28 }));
  const PROJ = GL3.map((_, i) => {
    const r = rng(100 + i * 17), set = new Set();
    while (set.size < 22) set.add(Math.floor(r() * PCELLS.length));
    return [...set];
  });

  function cortexSVG() {
    const lines = PROJ.map((targets, i) => targets.map(c =>
      `<path class="pr-ln" data-t="${i}" style="--c:${TYPES[i]}" d="M${GL3[i].x + 10},${GL3[i].y} C${180},${GL3[i].y} ${PCELLS[c].x - 80},${PCELLS[c].y.toFixed(1)} ${PCELLS[c].x.toFixed(1)},${PCELLS[c].y.toFixed(1)}"/>`).join('')).join('');
    const box = (y, tip, a, b) => `<g data-tip="${tip}" class="sg-box pr-out"><rect x="702" y="${y - 20}" width="184" height="40" rx="11"/>
      <text x="794" y="${y - 3}">${a}</text><text x="794" y="${y + 11}" class="pr-sub">${b}</text></g>`;
    return `
    <svg viewBox="0 0 900 300" class="olpir" id="olpir">
      <text x="64" y="26" class="fx-lab dim">GLOMERULI · FROM a</text>
      <g data-tip="piriform"><ellipse cx="${PIR.cx}" cy="${PIR.cy}" rx="${PIR.rx + 16}" ry="${PIR.ry + 16}" class="pr-field"/></g>
      <text x="${PIR.cx}" y="26" class="fx-lab dim">PIRIFORM CORTEX · NO MAP</text>
      <text x="${PIR.cx - 120}" y="${PIR.cy + PIR.ry + 34}" class="ol-tl" style="text-anchor:middle">anterior · odour features</text>
      <text x="${PIR.cx + 120}" y="${PIR.cy + PIR.ry + 34}" class="ol-tl" style="text-anchor:middle">posterior · odour category</text>
      ${lines}
      <g id="prRec"></g>
      ${PCELLS.map((p, i) => `<circle class="pr-c" data-i="${i}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5"/>`).join('')}
      ${GL3.map((g, i) => `<g data-tip="olGlom"><circle class="ol-glom" data-t="${i}" style="--c:${TYPES[i]}" cx="${g.x}" cy="${g.y}" r="10"/><text x="${g.x}" y="${g.y + 3.5}" class="ol-gl">${NAMES[i]}</text></g>`).join('')}
      ${[60, 120, 180, 240].map(y => `<path class="pr-arrow" d="M${PIR.cx + PIR.rx + 18},${PIR.cy + (y - 150) * .3} C660,${PIR.cy + (y - 150) * .3} 670,${y} 700,${y}"/>`).join('')}
      ${box(60, 'ofc', 'Orbitofrontal', 'identity · value · flavour')}
      ${box(120, 'amygdala', 'Amygdala', 'emotion')}
      ${box(180, 'entorhinal', 'Entorhinal → hippocampus', 'memory')}
      ${box(240, 'hypothal', 'Hypothalamus', 'appetite · hormones')}
    </svg>`;
  }

  function build() {
    const el = Info.modal('olfModal', 'olTitle', `
      <h2 id="olTitle">How smell works</h2>
      <p class="fx-lead">From a molecule in the mucus to an odour object in cortex.</p>

      <h3><span class="ol-k">1</span>Transduction in the cilia</h3>
      ${Info.stepBar(STEPS)}
      ${cascadeSVG()}
      <div class="ol-cap" id="olCap1"></div>
      ${why('cascade')}

      <h3><span class="ol-k">2</span>From odour to odour object</h3>
      <p class="fx-lead">One odour, followed from the nose through the bulb to cortex — the picker drives both panels.</p>
      <div class="ol-pick">
        <div class="ctrl-grp"><span class="cg-l">Odour</span>
          <div class="seg2 ol-odors">${Object.entries(ODORS).map(([k, o]) => `<button class="seg-b" data-odor="${k}"><span>${o.icon}</span>${o.name}</button>`).join('')}</div></div>
        <div class="ctrl-grp"><span class="cg-l">Strength</span>
          <div class="seg2"><button class="seg-b" data-conc="low">Faint</button><button class="seg-b" data-conc="high">Strong</button></div></div>
        <span class="ol-drives">drives a and b ↓</span>
      </div>
      <div class="ol-chain">
        <div class="ol-sub"><span class="ol-sk">a</span><b>Bulb · combinatorial code → glomerular map</b>${Clinic.sw('1', 'inhib', false, '⊣', 'Lateral inhibition', 'granule')}</div>
        <div class="ol-code">
          <div class="ol-ctl"><span class="cg-l">Receptor × odour · click a row</span>${matrixSVG()}</div>
          <div>${mapSVG()}<p class="ol-stat"><b>40 neurons → 8 glomeruli</b> in this sketch · in life <b>~10 million → ~5 500</b>, over a thousand neurons per glomerulus</p></div>
        </div>
        <div class="ol-cap" id="olCap2"></div>
        ${why('map')}

        <div class="ol-sub"><span class="ol-sk">b</span><b>Cortex · parsing the pattern</b>${Clinic.sw('1', 'partial', false, '◔', 'Lose one input', 'piriform')}</div>
        ${cortexSVG()}
        <div class="ol-cap" id="olCap3"></div>
        ${why('cortex')}
      </div>`, onClick, close);
    fillCaps();
    steps = Info.stepper(el, 'olt', 'olCap1', STEPS.length);
  }

  function onClick(e) {
    const s = e.target.closest('[data-step]');
    if (s) { steps.stop(); steps.set(+s.dataset.step); return; }
    if (e.target.closest('[data-play]')) { steps.toggle(); return; }
    const o = e.target.closest('[data-odor]');
    if (o) { odor = o.dataset.odor; paintCode(); return; }
    const c = e.target.closest('[data-conc]');
    if (c) { high = c.dataset.conc === 'high'; paintCode(); return; }
    const sw = e.target.closest('[data-inhib], [data-partial]');
    if (sw) {
      if (sw.dataset.inhib) inhib = !inhib; else partial = !partial;
      sw.classList.toggle('on', sw.dataset.inhib ? inhib : partial);
      paintCode();
    }
  }

  function fillCaps() {
    Info.fillCap('olCap1', [...Array(STEPS.length + 1)].map((_, n) => [n, Info.stepCap(STEPS, n)]));
    const v2 = [], v3 = [];
    Object.keys(ODORS).forEach(k => [false, true].forEach(hi => [false, true].forEach(inh => {
      v2.push([`${k}|${hi}|${inh}`, cap2(k, hi, inh)]);
      [false, true].forEach(pt => v3.push([`${k}|${hi}|${inh}|${pt}`, cap3(k, hi, inh, pt)]));
    })));
    Info.fillCap('olCap2', v2);
    Info.fillCap('olCap3', v3);
  }

  // ── 2–3. odour → receptors → glomeruli → piriform ensemble
  // piriform ensemble: inputs = strong (+ weak when strong & uninhibited); "lose one input" drops the first one
  function ensemble(k, hi, inh, pt) {
    const o = ODORS[k];
    const inputs = [...o.strong, ...(hi && !inh ? o.extra : [])];
    const count = (ins) => { const c = new Array(PCELLS.length).fill(0); ins.forEach(t => PROJ[t].forEach(i => c[i]++)); return c; };
    const full = count(inputs).map(v => v >= 2);
    return { full, part: pt ? count(inputs.slice(1)).map(v => v >= 2) : full, lost: pt ? inputs[0] : -1 };
  }
  const rec = (ts) => ts.map(t => `<i style="--c:${TYPES[t]}">${NAMES[t]}</i>`).join('');
  function cap2(k, hi, inh) {
    const o = ODORS[k];
    return `<b>${o.icon} ${o.name} · ${o.mol}</b><span>
      Receptors ${rec(o.strong)}${hi ? ` + weakly ${rec(o.extra)}` : ''} → the same letters light up as glomeruli: an odour is a <em>pattern</em>, not a receptor.
      ${hi ? (inh ? 'Granule cells suppress the weak glomeruli — contrast sharpened, the pattern stays recognisable.' : 'At high strength low-affinity receptors join in, and the pattern — and the smell — changes.') : 'Every receptor also answers other odours: compare the rows.'}</span>`;
  }
  function cap3(k, hi, inh, pt) {
    const e = ensemble(k, hi, inh, pt);
    const nFull = e.full.filter(Boolean).length, nPart = e.part.filter(Boolean).length;
    return pt
      ? `<b>${nPart} of ${nFull} cells driven directly</b><span>Glomerulus ${rec([e.lost])} is lost. Recurrent links between piriform cells (dashed) refill the rest — <em>pattern completion</em>: a familiar smell recognised from a degraded whiff.</span>`
      : `<b>${nFull} piriform cells fire together</b><span>Neighbouring glomeruli scatter widely, so cortex keeps no map. A cell fires only when two of its inputs coincide — the ensemble <em>is</em> the odour object, sent on to OFC, amygdala, entorhinal cortex and hypothalamus.</span>`;
  }

  function paintCode() {
    const o = ODORS[odor];
    const lvl = (t) => o.strong.includes(t) ? 'st' : (high && o.extra.includes(t)) ? (inhib ? 'sup' : 'wk') : '';
    const m = document.getElementById('olmap'), p = document.getElementById('olpir');
    const root = document.getElementById('olfModal');
    root.querySelectorAll('[data-odor]').forEach(b => b.classList.toggle('on', b.dataset.odor === odor));
    root.querySelectorAll('[data-conc]').forEach(b => b.classList.toggle('on', (b.dataset.conc === 'high') === high));
    [m, p].forEach(svg => svg.querySelectorAll('[data-t]').forEach(el => el.setAttribute('data-l', lvl(+el.dataset.t))));
    document.getElementById('olGran').classList.toggle('on', inhib);

    const { full, part, lost } = ensemble(odor, high, inhib, partial);
    p.querySelectorAll('.pr-c').forEach(c => {
      const i = +c.dataset.i;
      c.setAttribute('class', `pr-c ${part[i] ? 'on' : full[i] ? 'done' : ''}`);
    });
    p.querySelectorAll('.pr-ln, .ol-glom').forEach(el => el.classList.toggle('lost', +el.dataset.t === lost));
    // pattern completion: recurrent links from the surviving ensemble refill the missing cells
    const on = PCELLS.map((c, i) => part[i] ? c : null).filter(Boolean);
    const anchors = on.length ? on : PCELLS.filter((_, i) => full[i]);
    document.getElementById('prRec').innerHTML = partial ? PCELLS.map((c, i) => {
      if (!full[i] || part[i]) return '';
      const a = anchors.filter(x => x !== c).sort((u, v) => Math.hypot(u.x - c.x, u.y - c.y) - Math.hypot(v.x - c.x, v.y - c.y))[0];
      return a ? `<path class="pr-rec" d="M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${((a.x + c.x) / 2).toFixed(1)},${((a.y + c.y) / 2 - 18).toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}"/>` : '';
    }).join('') : '';

    Info.showCap('olCap2', `${odor}|${high}|${inhib}`);
    Info.showCap('olCap3', `${odor}|${high}|${inhib}|${partial}`);
  }

  function open() {
    if (!steps) build();
    steps.refresh();
    paintCode();
    Info.show('olfModal');
  }
  function close() {
    steps?.stop();
    Info.hide('olfModal');
  }

  return { open, close };
})();
