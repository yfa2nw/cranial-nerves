// ─────────────────────────────────────────────────────────────
//  Vision physiology popup: retinal circuit & receptive fields ·
//  phototransduction · LGN layers & parallel streams · cortical parsing
// ─────────────────────────────────────────────────────────────

const Sight = (() => {
  // ── 1. retina: what each stimulus does to the centre–surround circuit
  // lit = cones hit by light · s = state of each cell (ex excited · in inhibited · act active) · spikes ON / OFF
  const STIM = {
    dark:     { name: 'Dark', icon: '●', lit: [], s: {}, on: 4, off: 4 },
    centre:   { name: 'Spot in centre', icon: '◉', lit: ['c1'], s: { onB: 'ex', offB: 'in', onG: 'ex', offG: 'in' }, on: 15, off: 0 },
    surround: { name: 'Ring in surround', icon: '◎', lit: ['c0', 'c2'], s: { hc: 'act', onB: 'in', offB: 'ex', onG: 'in', offG: 'ex' }, on: 1, off: 13 },
    full:     { name: 'Whole field', icon: '○', lit: ['c0', 'c1', 'c2'], s: { hc: 'act' }, on: 5, off: 5 }
  };
  const STIM_CAP = {
    dark: ['Dark', 'Cones sit depolarised (−40 mV) and release glutamate steadily. Both ganglion cells tick over at their resting rate.'],
    centre: ['Spot in the centre', 'The centre cone hyperpolarises and releases less glutamate. The ON bipolar (mGluR6, sign-inverting) depolarises → the ON-centre ganglion cell fires hard; the OFF pathway falls silent.'],
    surround: ['Ring in the surround', 'Surround cones drive horizontal cells, which feed back onto the centre cone with the opposite sign — as if the centre had gone dark. The OFF-centre cell fires; the ON-centre cell is suppressed.'],
    full: ['Whole field', 'Centre and surround cancel — both cells barely change. Ganglion cells report contrast and edges, not overall brightness.']
  };

  // ── 2. phototransduction steps
  const STEPS = [
    ['Photon hits rhodopsin', '11-cis retinal straightens to all-trans; rhodopsin becomes active metarhodopsin II.'],
    ['Transducin activates', 'Rhodopsin swaps GDP for GTP on transducin (G<sub>t</sub>); the α subunit breaks away.'],
    ['PDE6 burns cGMP', 'Gα<sub>t</sub> lifts the brake on phosphodiesterase 6, which hydrolyses cGMP to 5′-GMP.'],
    ['CNG channels close', 'Without cGMP the cGMP-gated channels shut — the inward dark current of Na⁺ and Ca²⁺ stops.'],
    ['Hyperpolarisation', 'The rod falls from −40 toward −70 mV and releases less glutamate: light is signalled as a decrease.'],
    ['Recovery', 'Falling Ca²⁺ frees GCAPs to drive guanylyl cyclase and rebuild cGMP; rhodopsin kinase + arrestin silence rhodopsin; RGS9 speeds transducin’s GTPase.'],
    ['Visual cycle', 'All-trans retinal leaves the opsin for the RPE, which re-isomerises it to 11-cis (made from vitamin A) — the pigment is ready again.']
  ];

  // ── 3. LGN: contralateral eye → 1 4 6, ipsilateral → 2 3 5 · magno 1–2, parvo 3–6, konio between
  const LAYERS = [1, 2, 3, 4, 5, 6].map(n => ({ n, s: n <= 2 ? 'M' : 'P', e: [1, 4, 6].includes(n) ? 'C' : 'I' }));
  const EYE_C = '#79e0ee', EYE_I = '#ffb547';
  const STREAMS = {
    all: ['All streams', 'Six layers, two eyes, three streams. Each layer hears from one eye only — the eyes are first combined in V1.'],
    M: ['Magnocellular · layers 1–2', 'Big parasol ganglion cells: fast, transient, very contrast-sensitive, colour-blind, coarse. Motion and depth → V1 4Cα → 4B → MT: the dorsal “where / how” stream.'],
    P: ['Parvocellular · layers 3–6', 'Small midget ganglion cells: slow, sustained, red–green colour, fine detail. Form and colour → V1 4Cβ → layers 2/3 → V2 → V4 / IT: the ventral “what” stream.'],
    K: ['Koniocellular · between layers', 'Small bistratified ganglion cells carrying blue–yellow colour → straight to the blobs in V1 layers 2/3.']
  };
  const EYES = {
    both: '',
    C: 'Contralateral eye (crossed, nasal retina) → layers <b>1, 4, 6</b>.',
    I: 'Ipsilateral eye (uncrossed, temporal retina) → layers <b>2, 3, 5</b> · “See I? I see, I see” = C I I C I C, layers 1 → 6.'
  };

  // ── 4. cortex: which areas each stimulus drives, and the lesion that removes it
  const CUES = {
    edge:   { name: 'Oriented edge', icon: '⟋', areas: ['V1', 'V2'], cap: ['Oriented edge', 'V1 simple cells fire for an edge at one orientation and place; complex cells for that orientation anywhere in their field. One hypercolumn holds every orientation, for both eyes, at one point in space.'] },
    motion: { name: 'Moving dots', icon: '⇉', areas: ['V1', 'V2', 'MT', 'MST', 'PPC', 'dorsal'], cap: ['Moving dots', 'Magno input → V1 4B → MT (V5) codes direction and speed; MST adds optic flow; parietal cortex maps where things are and guides reaching. MT lesion → akinetopsia, the world in freeze-frames.'] },
    colour: { name: 'Colour', icon: '◐', areas: ['V1', 'V2', 'V4', 'ventral', 'blob'], cap: ['Colour', 'Colour-opponent cells sit in the V1 blobs → V2 thin stripes → V4, which keeps colours constant under changing light. V4 lesion → cerebral achromatopsia: the world in greys.'] },
    face:   { name: 'Face', icon: '☺', areas: ['V1', 'V2', 'V4', 'IT', 'FFA', 'ventral'], cap: ['Face', 'Along the ventral stream receptive fields grow and features combine — edges → shapes → objects. The fusiform face area responds to faces. Damage → prosopagnosia: faces unrecognisable, voices still known.'] }
  };

  const WHY = {
    retina: [
      ['Light comes in backwards', 'The retina is inverted: light crosses the ganglion and bipolar layers to reach the photoreceptors. At the fovea those layers are pushed aside and cones wire 1 : 1 : 1 to bipolar and ganglion cells — maximum acuity. Rods converge many-to-one: sensitivity, not detail.'],
      ['ON and OFF from one signal', 'Cones release glutamate in the dark. OFF bipolars have ionotropic receptors (AMPA / kainate) and simply follow the cone. ON bipolars use mGluR6, which closes TRPM1 channels — sign-inverting, so they depolarise in light. ON and OFF terminals stratify in different halves of the inner plexiform layer.'],
      ['The surround', 'Horizontal cells pool many cones and feed back onto cone terminals with the opposite sign, so light in the surround opposes the centre. Amacrine cells add timing and direction selectivity. The output is contrast — edges — not absolute light.']
    ],
    photo: [
      ['The dark current', 'In darkness cGMP holds CNG channels open; Na⁺ and Ca²⁺ leak into the outer segment and are pumped out at the inner segment. The rod sits near −40 mV and releases glutamate continuously.'],
      ['Enormous gain', 'One rhodopsin activates hundreds of transducins, and each PDE6 hydrolyses about a thousand cGMP per second. A dark-adapted rod can signal a single photon.'],
      ['Shutting off and adapting', 'Ca²⁺ is the feedback signal: as it falls, GCAPs speed cGMP synthesis and channels reopen. Bleached opsin needs fresh 11-cis retinal from the RPE — vitamin A deficiency causes night blindness, RPE65 mutations a form of retinitis pigmentosa.']
    ],
    lgn: [
      ['One eye per layer', 'Crossed and uncrossed fibres stay segregated in alternate layers; no LGN cell is binocular. The eyes first meet in V1, above and below layer 4C — the basis of stereopsis.'],
      ['More than a relay', 'Only ~10% of LGN synapses are retinal. Most come from V1 layer 6 and the brainstem, and the thalamic reticular nucleus gates the relay — attention and arousal decide what passes.'],
      ['Parallel streams', 'Roughly 80% of ganglion cells are midget (P), 10% parasol (M) and 10% bistratified (K). They stay separate into V1 — 4Cα, 4Cβ and the blobs — then increasingly mix.']
    ],
    cortex: [
      ['Columns and hypercolumns', 'Cells stacked in a vertical column share orientation and eye preference (Hubel & Wiesel). A ~1 mm hypercolumn holds all orientations for both eyes plus colour blobs — a complete analyser for one point in space, repeated across the map.'],
      ['Building features', 'Simple cells: an edge at one orientation and position, built from aligned LGN inputs. Complex cells: that orientation anywhere in the field, often direction-selective. End-stopped cells code length and corners.'],
      ['Two streams, two kinds of lesion', 'Ventral (temporal, “what”): V4 colour, IT objects, fusiform faces → achromatopsia, prosopagnosia. Dorsal (parietal, “where / how”): MT motion, parietal space and reaching → akinetopsia, Bálint syndrome (simultanagnosia, optic ataxia).']
    ]
  };

  let stim = 'centre', stream = 'all', eye = 'both', cue = 'edge', steps = null;

  // ── 1. retina svg (viewBox 0 0 900 300): light enters from the top, through the inner retina
  function retinaSVG() {
    const cone = (k, x) => `<g class="rt-cone" data-n="${k}" data-tip="cone">
      <rect x="${x - 7}" y="178" width="14" height="6" rx="2"/><path d="M${x},184 L${x},200"/><ellipse cx="${x}" cy="212" rx="8" ry="12"/>
      <path d="M${x - 8},226 L${x + 8},226 L${x},262 Z"/></g>`;
    const rods = [180, 262, 372, 456, 498].map(x => `<g class="rt-rod" data-tip="rod"><circle cx="${x}" cy="190" r="3"/><path d="M${x},193 L${x},206"/><rect x="${x - 3}" y="206" width="6" height="56" rx="3"/></g>`).join('');
    const beam = (k, x, w) => `<path class="rt-beam" data-n="${k}" d="M${x - w},14 L${x + w},14 L${x + w * .55},262 L${x - w * .55},262 Z"/>`;
    const layer = (y, t) => `<text x="20" y="${y}" class="rt-lay">${t}</text>`;
    return `
    <svg viewBox="0 0 900 300" class="olt rt" id="rtSvg">
      ${beam('c0', 220, 16)}${beam('c1', 320, 16)}${beam('c2', 420, 16)}
      <text x="560" y="28" class="fx-lab dim" style="text-anchor:start">RECEPTIVE FIELD</text>
      <text x="444" y="12" class="ol-tl" style="text-anchor:start">← light enters here, from the vitreous</text>
      ${layer(46, 'ganglion cells')}${layer(104, 'inner plexiform')}${layer(146, 'bipolar · horizontal · amacrine')}${layer(184, 'outer plexiform')}${layer(226, 'rods & cones')}${layer(278, 'pigment epithelium')}
      <path class="rt-sub" d="M150,92 L520,92"/><path class="rt-sub" d="M150,112 L520,112"/>
      <text x="524" y="95" class="rt-lay sm">ON</text><text x="524" y="115" class="rt-lay sm">OFF</text>
      <g data-tip="rpe"><rect x="140" y="266" width="384" height="16" rx="5" class="rt-rpe"/></g>
      ${rods}${cone('c0', 220)}${cone('c1', 320)}${cone('c2', 420)}
      <g class="rt-cell" data-n="hc" data-tip="hcell"><path d="M220,182 C232,170 248,162 258,158 M320,182 C300,168 284,162 270,158 M420,182 C380,170 304,160 272,156"/><ellipse cx="264" cy="157" rx="13" ry="7"/></g>
      <g class="rt-cell" data-n="onB" data-tip="onBip"><path d="M316,182 C312,170 306,158 305,148 M305,131 L305,94"/><ellipse cx="305" cy="140" rx="7" ry="9"/><circle cx="305" cy="92" r="4"/></g>
      <g class="rt-cell" data-n="offB" data-tip="offBip"><path d="M324,182 C330,170 338,158 340,148 M340,131 L340,114"/><ellipse cx="340" cy="140" rx="7" ry="9"/><circle cx="340" cy="112" r="4"/></g>
      <g class="rt-am" data-tip="amacrine"><ellipse cx="410" cy="140" rx="9" ry="6"/><path d="M410,134 L410,104 M380,104 L440,104"/></g>
      <g class="rt-cell" data-n="onG" data-tip="onRGC"><path d="M282,68 C288,78 298,86 303,92 M276,52 C250,38 200,36 150,36"/><circle cx="280" cy="60" r="10"/></g>
      <g class="rt-cell" data-n="offG" data-tip="offRGC"><path d="M366,68 C356,86 348,100 343,112 M366,50 C330,30 220,26 150,26"/><circle cx="370" cy="60" r="10"/></g>
      <text x="146" y="22" class="rt-lay sm" style="text-anchor:end">to optic nerve ←</text>
      <text x="296" y="178" class="rt-sign">−</text><text x="334" y="178" class="rt-sign">+</text>
      <g class="rt-rf" data-tip="rfield">
        <circle cx="680" cy="104" r="70" class="rf-sur"/><circle cx="680" cy="104" r="28" class="rf-cen"/>
        <text x="680" y="108" class="rt-lay sm" style="text-anchor:middle">centre</text><text x="680" y="56" class="rt-lay sm" style="text-anchor:middle">surround</text>
      </g>
      <text x="560" y="206" class="rt-lay">ON-centre</text><text x="560" y="254" class="rt-lay">OFF-centre</text>
      <path d="M640,220 L890,220 M640,268 L890,268" class="rt-base"/>
      <g id="rtSpikes"></g>
    </svg>`;
  }
  const spikes = (n, y, seed) => [...Array(n)].map((_, i) => {
    const x = 650 + (i + .5) * (230 / n) + Math.sin(i * 7.3 + seed) * (60 / n);
    return `<path d="M${x.toFixed(1)},${y} L${x.toFixed(1)},${y - 22}"/>`;
  }).join('');

  // ── 2. phototransduction svg (viewBox 0 0 900 256): disc membrane on the left, plasma membrane on the right
  function photoSVG() {
    const helices = [...Array(7)].map((_, i) => `<rect x="${90 + i * 10}" y="96" width="8" height="58" rx="4"/>`).join('');
    const pent = 'M0,-6 L5.7,-1.9 L3.5,4.9 L-3.5,4.9 L-5.7,-1.9 Z';
    const pos = [[270, 200], [330, 226], [390, 196], [450, 230], [520, 204], [580, 228], [630, 196], [300, 236]];
    let wave = 'M24,6';
    for (let i = 1; i <= 24; i++) { const k = i / 24; wave += ` L${(24 + 92 * k + Math.sin(i * 1.6) * 4).toFixed(1)},${(6 + 86 * k + Math.cos(i * 1.6) * 4).toFixed(1)}`; }
    const ions = (x, cls, n, lab) => [...Array(n)].map((_, i) =>
      `<g class="ion ${cls}" style="animation-delay:${-i * 0.45}s"><circle cx="${x + (i % 2 ? 6 : -6)}" cy="0" r="5"/><text x="${x + (i % 2 ? 6 : -6)}" y="3">${lab}</text></g>`).join('');
    return `
    <svg viewBox="0 0 900 256" class="olt pt" id="ptSvg">
      <rect x="0" y="0" width="470" height="100" rx="12" class="pt-disc"/><rect x="490" y="0" width="220" height="100" rx="12" class="pt-out"/>
      <text x="200" y="22" class="fx-lab dim" style="text-anchor:start">INSIDE A DISC</text>
      <text x="600" y="22" class="fx-lab dim">OUTSIDE THE CELL</text>
      <text x="300" y="250" class="fx-lab dim">CYTOPLASM · OUTER SEGMENT</text>
      <g class="ol-mem"><rect x="0" y="100" width="470" height="30" class="pt-memb"/><path d="M0,102 L470,102 M0,128 L470,128" class="pt-heads"/></g>
      <g class="ol-mem"><rect x="490" y="100" width="220" height="30" class="pt-memb"/><path d="M490,102 L710,102 M490,128 L710,128" class="pt-heads"/></g>
      <text x="236" y="92" class="ol-pl sm">disc membrane</text><text x="600" y="92" class="ol-pl sm">plasma membrane</text>

      <path d="${wave}" class="pt-photon st1"/>
      <g class="prot p1" data-tip="rhodopsin"><g class="pt-rho">${helices}</g>
        <path d="M108,124 L118,118 L124,128 L134,120 L142,126" class="pt-ret cis"/><path d="M106,122 L144,122" class="pt-ret trans"/>
        <text x="125" y="172" class="ol-pl">RHODOPSIN</text></g>
      <g class="st6 pt-badge"><circle cx="78" cy="160" r="10"/><text x="78" y="163.5">RK</text><circle cx="172" cy="162" r="10"/><text x="172" y="165.5">Arr</text></g>
      <g class="ol-g p2" data-tip="transducin">
        <g class="galpha"><ellipse cx="212" cy="164" rx="22" ry="14"/><text x="212" y="168" class="ol-gtx"><tspan class="gdp">GDP</tspan><tspan class="gtp">GTP</tspan></text></g>
        <circle cx="238" cy="156" r="8" class="gbg"/><circle cx="244" cy="172" r="7" class="gbg"/><text x="262" y="186" class="ol-pl sm">βγ</text>
      </g>
      <g class="prot p3" data-tip="pde6"><path d="M350,130 L350,142" class="pt-anchor"/><ellipse cx="350" cy="154" rx="28" ry="13" class="pt-pde"/><text x="350" y="158" class="ol-pl dk">PDE6</text></g>
      <g class="prot p6" data-tip="gcyc"><rect x="420" y="96" width="22" height="58" rx="8" class="pt-gc"/><text x="431" y="172" class="ol-pl">GC</text>
        <g class="st6 pt-badge"><circle cx="458" cy="160" r="11"/><text x="458" y="163.5">GCAP</text></g></g>
      <g class="pt-cgmp">${pos.map(([x, y]) => `<path d="${pent}" transform="translate(${x},${y})" class="camp-s"/>`).join('')}</g>
      <g class="pt-gmp">${pos.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`).join('')}</g>
      <text x="270" y="222" class="ol-pl sm pt-cglab">cGMP</text><text x="270" y="222" class="ol-pl sm pt-gmplab">GMP</text>
      <g class="prot p4" data-tip="cngRod"><rect x="574" y="96" width="20" height="62" rx="7" class="ol-cng pt-l"/><rect x="606" y="96" width="20" height="62" rx="7" class="ol-cng pt-r"/>
        <text x="600" y="176" class="ol-pl">CNG</text></g>
      <g class="pt-ions">${ions(600, 'na', 3, 'Na')}${ions(600, 'ca', 2, 'Ca')}</g>
      <g class="st7 pt-cycle"><path d="M118,140 C96,190 70,214 40,226" class="pt-cyc" marker-end="url(#arrowW)"/>
        <text x="16" y="242" class="ol-tl" style="text-anchor:start">all-trans retinal → RPE → 11-cis</text></g>

      <g class="ol-trace">
        <rect x="724" y="0" width="176" height="256" rx="12" class="ol-tbox"/>
        <text x="812" y="24" class="fx-lab dim">ROD POTENTIAL</text>
        <path d="M738,70 L886,70" class="ol-rest"/><text x="884" y="64" class="ol-tl" style="text-anchor:end">dark −40</text>
        <path d="M738,160 L886,160" class="ol-thr"/><text x="884" y="176" class="ol-tl" style="text-anchor:end">light −70</text>
        <path d="M744,70 L772,70" class="ol-v"/>
        <path d="M772,70 C780,70 782,120 794,120" class="ol-v st4"/>
        <path d="M794,120 C802,120 804,160 814,160 L836,160" class="ol-v st5"/>
        <path d="M836,160 C848,160 852,84 868,78" class="ol-v st6"/>
        <path d="M868,78 L882,72" class="ol-v st7"/>
        <text x="812" y="208" class="fx-lab dim">GLUTAMATE RELEASE</text>
        <rect x="742" y="218" width="140" height="12" rx="6" class="pt-glubg"/><rect x="742" y="218" width="140" height="12" rx="6" class="pt-glu"/>
      </g>
    </svg>`;
  }

  // ── 3. LGN layers → V1 laminae (viewBox 0 0 900 300) · right LGN
  const GC = { x: 330, y: 262 }, A0 = 205 * Math.PI / 180, A1 = 335 * Math.PI / 180;
  const R = (n) => 34 + (n - 1) * 22;
  const pt = (r, a) => [GC.x + r * Math.cos(a), GC.y + r * Math.sin(a)];
  const f = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const band = (r, w) => `M${f(pt(r + w, A0))} A${r + w},${r + w} 0 0,1 ${f(pt(r + w, A1))} L${f(pt(r - w, A1))} A${r - w},${r - w} 0 0,0 ${f(pt(r - w, A0))} Z`;
  const arc = (r) => `M${f(pt(r, A0))} A${r},${r} 0 0,1 ${f(pt(r, A1))}`;
  const V1L = [['1', 40, 56], ['2/3', 56, 118], ['4A', 118, 132], ['4B', 132, 156], ['4Cα', 156, 186], ['4Cβ', 186, 216], ['5', 216, 242], ['6', 242, 280]];
  const v1y = (name) => { const l = V1L.find(x => x[0] === name); return (l[1] + l[2]) / 2; };

  function lgnSVG() {
    const layers = LAYERS.map(L => {
      // label sits at the apex of its own band; dots leave a gap for it
      const r = R(L.n), w = L.s === 'M' ? 9 : 7, dots = [], top = 1.5 * Math.PI, gap = 22 / r;
      for (let a = A0 + .06; a < A1 - .04; a += L.s === 'M' ? .11 : .07) {
        if (Math.abs(a - top) > gap) dots.push(`<circle cx="${pt(r, a)[0].toFixed(1)}" cy="${pt(r, a)[1].toFixed(1)}" r="${L.s === 'M' ? 3 : 1.7}"/>`);
      }
      return `<g class="gn-layer ${L.s}" data-s="${L.s}" data-e="${L.e}" data-tip="lgn${L.s}" style="--ec:${L.e === 'C' ? EYE_C : EYE_I}">
        <path d="${band(r, w)}" class="gn-band"/><g class="gn-dots">${dots.join('')}</g>
        <text x="${GC.x}" y="${GC.y - r + 3.5}" class="gn-lab">${L.n} ${L.s} ${L.e}</text></g>`;
    }).join('');
    const konio = [0, 1, 2, 3, 4, 5].map(i => `<path d="${arc(R(1) - 11 + i * 22)}" class="gn-k" data-s="K" data-tip="lgnK"/>`).join('');
    const eyeIn = LAYERS.map(L => {
      const [x, y] = pt(R(L.n), A0), ey = L.e === 'C' ? 92 : 214;
      return `<path class="gn-fib" data-s="${L.s}" data-e="${L.e}" style="--ec:${L.e === 'C' ? EYE_C : EYE_I}" d="M74,${ey} C150,${ey} 170,${y.toFixed(1)} ${(x - 4).toFixed(1)},${y.toFixed(1)}"/>`;
    }).join('');
    const rad = LAYERS.map(L => {
      const [x, y] = pt(R(L.n), A1), ty = v1y(L.s === 'M' ? '4Cα' : '4Cβ') + (L.n - 3.5) * 2;
      return `<path class="gn-rad ${L.s}" data-s="${L.s}" data-e="${L.e}" d="M${(x + 4).toFixed(1)},${y.toFixed(1)} C${x + 120},${y.toFixed(1)} 560,${ty.toFixed(1)} 650,${ty.toFixed(1)}"/>`;
    }).join('');
    const v1 = V1L.map(([n, y0, y1]) => `<g class="gn-v1" data-tip="v1Lam"><rect x="650" y="${y0}" width="110" height="${y1 - y0}" class="${['4Cα', '4Cβ', '4B', '2/3'].includes(n) ? 'key' : ''}"/>
      <text x="660" y="${(y0 + y1) / 2 + 3.5}" class="gn-vl">${n}</text></g>`).join('');
    const out = (y, s, tip, a, b) => `<g data-s="${s}" data-tip="${tip}" class="gn-out"><text x="790" y="${y}">${a}</text><text x="790" y="${y + 13}" class="sub">${b}</text></g>`;
    return `
    <svg viewBox="0 0 900 300" class="olt gn" id="gnSvg">
      <text x="330" y="22" class="fx-lab dim">RIGHT LGN · SIX LAYERS</text><text x="705" y="22" class="fx-lab dim">V1 LAYERS</text>
      <g data-tip="eyeL"><circle cx="52" cy="92" r="22" class="vglobe dk"/><text x="52" y="132" class="gn-eye" style="fill:${EYE_C}">LEFT EYE</text><text x="52" y="145" class="gn-eye sub">contralateral</text></g>
      <g data-tip="eyeR"><circle cx="52" cy="214" r="22" class="vglobe dk"/><text x="52" y="254" class="gn-eye" style="fill:${EYE_I}">RIGHT EYE</text><text x="52" y="267" class="gn-eye sub">ipsilateral</text></g>
      ${eyeIn}${konio}${layers}${rad}
      <path class="gn-rad K" data-s="K" d="M${f(pt(R(4) + 11, A1))} C460,120 560,${v1y('2/3')} 650,${v1y('2/3')}"/>
      ${v1}
      ${[0, 1, 2].map(i => `<circle cx="${690 + i * 26}" cy="87" r="7" class="gn-blob" data-s="K" data-tip="blob"/>`).join('')}
      <path class="gn-int M" data-s="M" d="M740,${v1y('4Cα')} C752,${v1y('4Cα') - 10} 752,${v1y('4B') + 6} 740,${v1y('4B')}"/>
      <path class="gn-int P" data-s="P" d="M748,${v1y('4Cβ')} C770,${v1y('4Cβ') - 40} 770,${v1y('2/3') + 30} 748,${v1y('2/3') + 12}"/>
      <path class="gn-arr" data-s="M" d="M760,${v1y('4B')} L784,${v1y('4B')}"/><path class="gn-arr" data-s="P" d="M760,104 L784,104"/><path class="gn-arr" data-s="K" d="M760,74 L784,74"/>
      ${out(v1y('4B') - 2, 'M', 'mtArea', 'MT · dorsal', 'motion, depth')}
      ${out(102, 'P', 'v4Area', 'V2 → V4 / IT', 'form, detail')}
      ${out(66, 'K', 'blob', 'V2 thin stripes', 'colour')}
    </svg>`;
  }

  // ── 4. hypercolumn + two streams (viewBox 0 0 900 300) · brain lateral view, occipital pole on the left
  const ORI = ['#ff8fa3', '#ffb547', '#5fe0a0', '#79e0ee'];
  function cortexSVG() {
    const wheel = (cx, cy) => [...Array(8)].map((_, i) => {
      const a0 = i * Math.PI / 4 - Math.PI / 2, a1 = a0 + Math.PI / 4, r = 56, k = i % 4, am = (a0 + a1) / 2;
      const p = (a, rr) => `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
      const ori = k * Math.PI / 4, mx = cx + 36 * Math.cos(am), my = cy + 36 * Math.sin(am);
      return `<g class="hc-w" data-k="${k}" data-tip="oriCol"><path d="M${cx},${cy} L${p(a0, r)} A${r},${r} 0 0,1 ${p(a1, r)} Z" style="--c:${ORI[k]}"/>
        <path class="hc-tick" d="M${(mx - 7 * Math.cos(ori)).toFixed(1)},${(my + 7 * Math.sin(ori)).toFixed(1)} L${(mx + 7 * Math.cos(ori)).toFixed(1)},${(my - 7 * Math.sin(ori)).toFixed(1)}"/></g>`;
    }).join('') + `<circle cx="${cx}" cy="${cy}" r="10" class="hc-blob" data-tip="blob"/>`;
    const area = (id, shape, lab, lx, ly, a = 'middle') => `<g class="br-a" data-a="${id}" data-tip="br${id}">${shape}</g><text x="${lx}" y="${ly}" class="br-l" style="text-anchor:${a}">${lab}</text>`;
    const brain = 'M380,170 C376,110 430,62 520,50 C620,36 760,48 840,96 C884,124 892,176 868,210 C846,240 800,252 760,250 C720,262 680,280 630,278 C580,290 520,282 480,262 C430,248 386,222 380,170 Z';
    return `
    <svg viewBox="0 0 900 300" class="olt cx4" id="cxSvg">
      <text x="170" y="24" class="fx-lab dim">V1 HYPERCOLUMN · ~1 MM · FROM ABOVE</text>
      <g data-tip="odCol"><rect x="28" y="80" width="142" height="142" rx="10" class="hc-od L"/><rect x="170" y="80" width="142" height="142" rx="10" class="hc-od R"/></g>
      <text x="99" y="72" class="br-l">LEFT-EYE COLUMN</text><text x="241" y="72" class="br-l">RIGHT-EYE COLUMN</text>
      ${wheel(99, 151)}${wheel(241, 151)}
      <text x="170" y="246" class="ol-tl" style="text-anchor:middle">wedges = orientation columns · centre = colour blob</text>
      <text x="170" y="262" class="ol-tl" style="text-anchor:middle">motion cells lie deeper, in layer 4B</text>
      <path class="lg-div" d="M346,30 L346,280"/>
      <g data-tip="brainLat"><path d="${brain}" class="br-out"/></g>
      <path class="br-sulc" d="M560,52 C580,110 600,150 640,180 M450,200 C520,210 600,214 700,208"/>
      <path class="br-stream" data-a="dorsal" d="M414,150 C440,118 470,104 500,96 C530,88 556,86 590,86" marker-end="url(#arrowW)"/>
      <path class="br-stream" data-a="ventral" d="M414,198 C452,228 500,242 560,250 C600,254 624,254 646,250" marker-end="url(#arrowW)"/>
      ${area('V2', '<ellipse cx="424" cy="172" rx="16" ry="48"/>', 'V2', 438, 116)}
      ${area('V1', '<ellipse cx="398" cy="172" rx="14" ry="30"/>', 'V1', 398, 216)}
      ${area('MT', '<ellipse cx="482" cy="160" rx="18" ry="13"/>', 'MT / V5', 504, 172, 'start')}
      ${area('MST', '<ellipse cx="512" cy="136" rx="13" ry="9"/>', 'MST', 530, 140, 'start')}
      ${area('PPC', '<ellipse cx="566" cy="96" rx="44" ry="22"/>', 'POSTERIOR PARIETAL', 566, 68)}
      ${area('V4', '<ellipse cx="470" cy="222" rx="20" ry="13"/>', 'V4', 470, 205)}
      ${area('FFA', '<ellipse cx="530" cy="250" rx="18" ry="9" class="ventral"/>', 'FFA', 530, 274)}
      ${area('IT', '<ellipse cx="610" cy="244" rx="40" ry="14"/>', 'INFEROTEMPORAL', 640, 274)}
      <text x="620" y="40" class="br-st dorsal">DORSAL · where / how</text>
      <text x="770" y="230" class="br-st ventral">VENTRAL · what</text>
      <text x="840" y="160" class="ol-tl" style="text-anchor:middle">front →</text>
    </svg>`;
  }

  function build() {
    const el = Info.modal('sightModal', 'siTitle', `
      <h2 id="siTitle">How sight works</h2>
      <p class="fx-lead">From a photon in a rod to an object — and a place — in cortex.</p>

      <h3><span class="ol-k si">1</span>Retina · centre and surround</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Stimulus</span>
        <div class="seg2">${Object.entries(STIM).map(([k, s]) => `<button class="seg-b" data-stim="${k}"><span>${s.icon}</span>${s.name}</button>`).join('')}</div></div></div>
      ${retinaSVG()}
      <div class="ol-cap si" id="siCap1"></div>
      ${Info.why(WHY.retina)}

      <h3><span class="ol-k si">2</span>Phototransduction in a rod</h3>
      ${Info.stepBar(STEPS)}
      ${photoSVG()}
      <div class="ol-cap si" id="siCap2"></div>
      ${Info.why(WHY.photo)}

      <h3><span class="ol-k si">3</span>LGN · six layers, three streams</h3>
      <div class="ol-bar">
        <div class="ctrl-grp"><span class="cg-l">Stream</span><div class="seg2">${Object.entries(STREAMS).map(([k, s]) => `<button class="seg-b" data-stream="${k}">${k === 'all' ? 'All' : s[0].split(' ·')[0]}</button>`).join('')}</div></div>
        <div class="ctrl-grp"><span class="cg-l">Eye</span><div class="seg2"><button class="seg-b" data-eye="both">Both</button><button class="seg-b" data-eye="C">Contralateral</button><button class="seg-b" data-eye="I">Ipsilateral</button></div></div>
      </div>
      ${lgnSVG()}
      <div class="ol-cap si" id="siCap3"></div>
      ${Info.why(WHY.lgn)}

      <h3><span class="ol-k si">4</span>Cortex · columns and two streams</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Stimulus</span>
        <div class="seg2">${Object.entries(CUES).map(([k, c]) => `<button class="seg-b" data-cue="${k}"><span>${c.icon}</span>${c.name}</button>`).join('')}</div></div></div>
      ${cortexSVG()}
      <div class="ol-cap si" id="siCap4"></div>
      ${Info.why(WHY.cortex)}`, onClick, close);

    const cap = ([t, l]) => `<b>${t}</b><span>${l}</span>`;
    Info.fillCap('siCap1', Object.keys(STIM).map(k => [k, cap(STIM_CAP[k])]));
    Info.fillCap('siCap2', [...Array(STEPS.length + 1)].map((_, n) => [n, Info.stepCap(STEPS, n)]));
    const v3 = [];
    Object.keys(STREAMS).forEach(s => Object.keys(EYES).forEach(e => v3.push([`${s}|${e}`, `<b>${STREAMS[s][0]}</b><span>${STREAMS[s][1]} ${EYES[e]}</span>`])));
    Info.fillCap('siCap3', v3);
    Info.fillCap('siCap4', Object.entries(CUES).map(([k, c]) => [k, cap(c.cap)]));
    // dark current runs until PDE6 has cleared the cGMP, and returns once it is rebuilt
    steps = Info.stepper(el, 'ptSvg', 'siCap2', STEPS.length, (k, svg) => {
      svg.classList.toggle('cg', k < 3 || k >= 6);
      svg.classList.toggle('open', k < 4 || k >= 6);
    });
  }

  function onClick(e) {
    const s = e.target.closest('[data-step]');
    if (s) { steps.stop(); steps.set(+s.dataset.step); return; }
    if (e.target.closest('[data-play]')) { steps.toggle(); return; }
    const b = e.target.closest('[data-stim], [data-stream], [data-eye], [data-cue]');
    if (!b) return;
    if (b.dataset.stim) stim = b.dataset.stim;
    if (b.dataset.stream) stream = b.dataset.stream;
    if (b.dataset.eye) eye = b.dataset.eye;
    if (b.dataset.cue) cue = b.dataset.cue;
    paint();
  }

  function paint() {
    const root = document.getElementById('sightModal');
    const mark = (attr, v) => root.querySelectorAll(`button[data-${attr}]`).forEach(b => b.classList.toggle('on', b.dataset[attr] === v));
    mark('stim', stim); mark('stream', stream); mark('eye', eye); mark('cue', cue);

    // 1. retina
    const S = STIM[stim];
    root.querySelectorAll('#rtSvg [data-n]').forEach(el => {
      const n = el.dataset.n;
      el.dataset.s = el.classList.contains('rt-beam') || el.classList.contains('rt-cone') ? (S.lit.includes(n) ? 'lit' : '') : (S.s[n] || '');
    });
    const rt = document.getElementById('rtSvg');
    rt.dataset.stim = stim;
    document.getElementById('rtSpikes').innerHTML =
      `<g class="rt-sp on">${spikes(S.on, 220, 1)}</g><g class="rt-sp off">${spikes(S.off, 268, 4)}</g>`;
    Info.showCap('siCap1', stim);

    // 3. LGN
    const gn = document.getElementById('gnSvg');
    gn.dataset.stream = stream; gn.dataset.eye = eye;
    Info.showCap('siCap3', `${stream}|${eye}`);

    // 4. cortex
    const c = CUES[cue];
    root.querySelectorAll('#cxSvg [data-a]').forEach(el => el.classList.toggle('hl', c.areas.includes(el.dataset.a)));
    root.querySelectorAll('#cxSvg .hc-w').forEach(el => el.classList.toggle('hl', cue === 'edge' && el.dataset.k === '1'));
    root.querySelectorAll('#cxSvg .hc-blob').forEach(el => el.classList.toggle('hl', cue === 'colour'));
    Info.showCap('siCap4', cue);
  }

  function open() {
    if (!steps) build();
    steps.refresh();
    paint();
    Info.show('sightModal');
  }
  function close() {
    steps?.stop();
    Info.hide('sightModal');
  }

  return { open, close };
})();
