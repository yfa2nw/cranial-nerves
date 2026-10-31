// ─────────────────────────────────────────────────────────────
//  Taste physiology popup: tongue → three nerves · inside a taste bud ·
//  GPCR transduction (sweet, umami, bitter) · central pathway & flavour
// ─────────────────────────────────────────────────────────────

const Taste = (() => {
  // ── 1. which nerve carries taste from where
  const NERVES_T = {
    all: ['All three', 'Taste from three cranial nerves converges on one place: the rostral solitary nucleus. Touch, pain and temperature from the same tongue go elsewhere — V3 in front, IX behind — to the trigeminal nuclei.'],
    VII: ['VII · chorda tympani', 'Anterior two-thirds of the tongue (fungiform and front foliate papillae) → chorda tympani → joins the lingual nerve (V3) → geniculate ganglion. The palate’s taste rides the greater petrosal nerve. Damage: middle-ear surgery, Bell’s palsy.'],
    IX: ['IX · glossopharyngeal', 'Posterior third — circumvallate and back foliate papillae, which hold most of the tongue’s taste buds → inferior (petrosal) ganglion. IX also carries touch from here, so it is the afferent limb of the gag.'],
    X: ['X · vagus', 'Taste buds on the epiglottis and in the pharynx and larynx → superior laryngeal nerve → inferior (nodose) ganglion. These protect the airway more than they inform the palate.']
  };

  // ── 2. five qualities: receptor · cell · transmitter · what it means
  const Q = {
    sweet:  { name: 'Sweet',  c: '#ff8fa3', rec: 'T1R2 + T1R3', cell: 'II',  tx: 'ATP',  mean: 'energy',
      cap: 'Type II cells with T1R2 + T1R3 — the same heterodimer binds sugars, sweet proteins and artificial sweeteners. ATP leaves through CALHM1/3 onto the afferent fibre.' },
    umami:  { name: 'Umami',  c: '#b78cff', rec: 'T1R1 + T1R3', cell: 'II',  tx: 'ATP',  mean: 'protein',
      cap: 'Type II cells with T1R1 + T1R3, tuned to glutamate and boosted by nucleotides (IMP, GMP) — the savoury synergy of stock and mushrooms.' },
    bitter: { name: 'Bitter', c: '#5fe0a0', rec: 'T2Rs (~25)', cell: 'II',  tx: 'ATP',  mean: 'toxins',
      cap: 'Type II cells, each expressing many of the ~25 T2Rs. The cell reports “bitter”, not which compound — ideal for detecting toxins, poor at telling them apart.' },
    sour:   { name: 'Sour',   c: '#ffe066', rec: 'OTOP1 (H⁺)', cell: 'III', tx: '5-HT', mean: 'acid · spoilage',
      cap: 'Type III cells: H⁺ enters through the OTOP1 proton channel, acidifies the cell and blocks Kir2.1 K⁺ channels → depolarisation. These are the only cells with true synapses (serotonin vesicles).' },
    salty:  { name: 'Salty',  c: '#9ad0ff', rec: 'ENaC (Na⁺)', cell: 'ENaC', tx: 'ATP', mean: 'electrolytes',
      cap: 'Low, pleasant salt: Na⁺ flows straight in through amiloride-sensitive ENaC in a dedicated cell type. High, aversive salt recruits the bitter and sour cells instead.' }
  };

  // ── 3. type II cascade
  const STEPS = [
    ['Tastant binds', 'A sugar, amino acid or bitter compound binds its GPCR on the microvilli — T1R2 + T1R3 (sweet), T1R1 + T1R3 (umami) or a T2R (bitter).'],
    ['Gustducin splits', 'The receptor activates gustducin; the βγ pair (Gβ3γ13) breaks away from α-gustducin.'],
    ['PLCβ2 makes IP₃', 'Gβγ switches on phospholipase Cβ2, which cleaves PIP₂ into IP₃ and DAG.'],
    ['Ca²⁺ from the ER', 'IP₃ opens IP₃R3 channels on the endoplasmic reticulum, and Ca²⁺ floods the cytoplasm.'],
    ['TRPM5 depolarises', 'Ca²⁺ opens TRPM5 (and TRPM4), cation channels in the basolateral membrane; Na⁺ enters and the cell depolarises.'],
    ['ATP through a channel', 'Depolarisation opens CALHM1/3 and ATP itself pours out through the channel pore — no vesicles, no classic synapse.'],
    ['The afferent fires', 'ATP activates P2X2 / P2X3 receptors on the gustatory fibre; spikes travel in VII, IX or X to the solitary nucleus.']
  ];

  // ── 4. central pathway: which boxes and links each situation uses
  const ROUTE = {
    sweet:   { name: 'Sweet', icon: '◇', on: ['R', 'N', 'NTS', 'RF', 'VPM', 'INS', 'OFC', 'HYP', 'R-N', 'N-NTS', 'NTS-RF', 'NTS-VPM', 'VPM-INS', 'INS-OFC', 'OFC-HYP'],
      cap: ['Sweet', 'NTS → VPMpc → insula, which codes quality and intensity; orbitofrontal cortex adds pleasantness and talks to the hypothalamus. Meanwhile the NTS triggers salivation and swallowing reflexes through the brainstem.'] },
    bitter:  { name: 'Bitter', icon: '✕', on: ['R', 'N', 'NTS', 'RF', 'VPM', 'INS', 'AMY', 'R-N', 'N-NTS', 'NTS-RF', 'NTS-VPM', 'VPM-INS', 'INS-AMY'],
      cap: ['Bitter', 'Brainstem reflexes reject it — gaping, gagging — before cortex is involved. Insula → amygdala tags the taste as aversive; pair a taste once with nausea and it is avoided for years (conditioned taste aversion).'] },
    flavour: { name: 'Flavour', icon: '❦', on: ['R', 'N', 'NTS', 'VPM', 'INS', 'OFC', 'PIR', 'R-N', 'N-NTS', 'NTS-VPM', 'VPM-INS', 'INS-OFC', 'PIR-OFC'],
      cap: ['Flavour · a strawberry', 'Taste and retronasal smell meet in orbitofrontal cortex (with texture and sight) — that merger is flavour. Most of what we call the “taste” of food is smell: pinch your nose and a strawberry is only sweet and sour.'] },
    sated:   { name: 'After a full meal', icon: '◒', on: ['R', 'N', 'NTS', 'VPM', 'INS', 'OFC', 'HYP', 'R-N', 'N-NTS', 'NTS-VPM', 'VPM-INS', 'INS-OFC', 'OFC-HYP', 'NTS-HYP'], sated: true,
      cap: ['After a full meal', 'Gut signals reach the caudal NTS and hypothalamus. The insula still reports the same sweetness, but orbitofrontal neurons stop responding to the food just eaten — and not to others: sensory-specific satiety, the “room for dessert”.'] }
  };

  const WHY = {
    tongue: [
      ['Three nerves, one nucleus', 'Anterior two-thirds and palate → VII (chorda tympani, greater petrosal) → geniculate. Posterior third → IX → petrosal. Epiglottis and pharynx → X → nodose. All central processes run in the solitary tract to its rostral, gustatory part.'],
      ['Taste vs touch', 'The tongue’s touch, pain and temperature travel in V3 (front) and IX (back) to the trigeminal nuclei. Chilli “heat” (TRPV1) and mint “cool” (TRPM8) are trigeminal sensations, not tastes.'],
      ['There is no tongue map', 'Every taste bud holds cells for all five qualities, and thresholds barely differ across the tongue. Papillae differ in bud count: fungiform (front, a few each), foliate (sides), circumvallate (~10, hundreds each); filiform have none.']
    ],
    bud: [
      ['Cells with jobs', 'Type I: glia-like support. Type II: one quality each (sweet, umami or bitter), no vesicles, ATP release through CALHM1/3. Type III: true synapses (serotonin), sense sour. Type IV: basal stem cells — the bud turns over every ~1–2 weeks.'],
      ['Sour and salty use channels', 'Sour: H⁺ enters through OTOP1, acidifies the cell and shuts Kir2.1 K⁺ channels. Low salt: Na⁺ through ENaC (blocked by amiloride). High salt recruits bitter and sour cells, which is why it tastes unpleasant.'],
      ['Labelled lines', 'A sweet cell always means “sweet”: mice engineered to express a bitter receptor in their sweet cells are attracted to that bitter compound. Each quality carries a meaning — energy, protein, toxins, spoilage, salt balance.']
    ],
    cascade: [
      ['One cascade, three tastes', 'Sweet, umami and bitter share gustducin, PLCβ2, IP₃R3, TRPM5 and CALHM1/3 — knock out any one and all three are lost while sour and salty remain. Only the receptor at the top differs.'],
      ['Tuned by genes', 'T2R38 variants decide whether PTC / PROP — and broccoli — taste intensely bitter. T1R variants shift sweet sensitivity; cats lack a working T1R2 and ignore sugar.'],
      ['ATP as the transmitter', 'Mice lacking P2X2 and P2X3 lose nearly all taste. TRPM5 is warmth-sensitive, which is why the same drink tastes sweeter warm than ice-cold.']
    ],
    central: [
      ['Ipsilateral and visceral', 'Rostral NTS → central tegmental tract → VPMpc → anterior insula and frontal operculum, mostly on the same side. The caudal NTS takes gut and cardiovascular afferents, so taste sits inside the visceral system.'],
      ['Quality vs pleasure', 'The insula codes what and how strong; orbitofrontal cortex codes how pleasant and how valuable, combining taste with smell, texture and sight into flavour — and turning down a food you have just had your fill of.'],
      ['Lesions', 'Chorda tympani damage → loss on the front two-thirds of one side. Insula / operculum lesions → same-side hypogeusia. Zinc deficiency, drugs (e.g. metronidazole) and radiotherapy → dysgeusia; head trauma usually takes smell, and with it flavour.']
    ]
  };

  let nerve = 'all', qual = 'sweet', route = 'sweet', steps = null;
  const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

  // ── 1. tongue from above, tip down (viewBox 0 0 900 300)
  function tongueSVG() {
    const tongue = 'M104,50 C140,38 290,38 326,50 C352,100 346,176 318,232 C294,276 256,292 215,292 C174,292 136,276 112,232 C84,176 78,100 104,50 Z';
    const vy = (x) => 122 - Math.abs(x - 215) * (26 / 103);
    const cv = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(i => { const x = 215 + i * 22; return `<circle cx="${x}" cy="${(vy(x) + 9).toFixed(1)}" r="5.5"/>`; }).join('');
    const fol = (x, d) => [0, 1, 2, 3, 4].map(i => `<path d="M${x},${118 + i * 10} L${x + d * 10},${118 + i * 10}"/>`).join('');
    const r = rng(7), fung = [];
    while (fung.length < 46) {
      const x = 110 + r() * 210, y = 140 + r() * 145;
      if (Math.hypot((x - 215) / 1.05, y - 150) < 150 && y < 288 - Math.abs(x - 215) * .5) fung.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + r() * 1.4).toFixed(1)}"/>`);
    }
    const gbox = (n, y, a, b) => `<g class="tg-box" data-n="${n}" data-tip="tg${n}"><rect x="480" y="${y - 22}" width="180" height="44" rx="12"/>
      <text x="570" y="${y - 4}">${a}</text><text x="570" y="${y + 11}" class="sub">${b}</text></g>`;
    return `
    <svg viewBox="0 0 900 300" class="olt tq1" id="tq1">
      <defs><clipPath id="tongueClip"><path d="${tongue}"/></clipPath></defs>
      <g class="tg-reg" data-n="X" data-tip="tgEpi"><ellipse cx="215" cy="22" rx="30" ry="13"/></g>
      <path d="${tongue}" class="tg-tongue"/>
      <g clip-path="url(#tongueClip)">
        <path class="tg-reg" data-n="IX" data-tip="tgPost" d="M80,40 L350,40 L350,96 L215,122 L80,96 Z"/>
        <path class="tg-reg" data-n="VII" data-tip="tgAnt" d="M80,96 L215,122 L350,96 L350,300 L80,300 Z"/>
      </g>
      <path d="M112,96 L215,122 L318,96" class="tg-v"/><path d="M215,132 L215,270" class="tg-mid"/>
      <g class="tg-cv" data-tip="cvPap">${cv}</g>
      <g class="tg-fol" data-tip="folPap">${fol(92, 1)}${fol(338, -1)}</g>
      <g class="tg-fung" data-tip="fungPap">${fung.join('')}</g>
      ${fib('M250,22 C340,22 420,40 480,46', 'SVA', 'tasteX', 'tg-f')}${fib('M330,84 C400,96 440,116 480,120', 'SVA', 'IX-ling', 'tg-f')}${fib('M336,190 C400,196 440,206 480,210', 'SVA', 'chorda', 'tg-f')}
      ${gbox('X', 46, 'X · superior laryngeal', 'nodose (inferior) ganglion')}
      ${gbox('IX', 120, 'IX · lingual branch', 'petrosal (inferior) ganglion')}
      ${gbox('VII', 210, 'VII · chorda tympani', 'geniculate ganglion')}
      ${fib('M660,46 C720,46 740,110 770,124', 'SVA', 'solTract', 'tg-c X')}${fib('M660,120 L770,128', 'SVA', 'solTract', 'tg-c IX')}${fib('M660,210 C720,210 740,146 770,134', 'SVA', 'solTract', 'tg-c VII')}
      <g data-tip="n-NTS" class="tg-nts"><rect x="770" y="92" width="110" height="74" rx="14"/><text x="825" y="124">NTS</text><text x="825" y="140" class="sub">rostral · gustatory</text></g>
      <text x="268" y="16" class="br-l" style="text-anchor:start">EPIGLOTTIS</text>
      <text x="215" y="80" class="br-l">POSTERIOR ⅓</text><text x="215" y="208" class="br-l">ANTERIOR ⅔</text>
      <text x="64" y="128" class="ol-tl" style="text-anchor:end">foliate</text><text x="215" y="148" class="ol-tl" style="text-anchor:middle">circumvallate ↑</text>
      <text x="215" y="248" class="ol-tl" style="text-anchor:middle">fungiform</text>
      <text x="40" y="290" class="ol-tl" style="text-anchor:start">tip ↓</text>
    </svg>`;
  }

  // ── 2. a taste bud + the quality table (viewBox 0 0 900 300)
  const CELLS = [['I', 132, 20], ['sweet', 162, 17], ['umami', 190, 17], ['salty', 216, 16], ['sour', 244, 17], ['bitter', 272, 17], ['I', 302, 20]];
  function budSVG() {
    const spindle = (xb, w) => {
      const xa = 230 + (xb - 217) * .12, ya = 80, yb = 268;
      return `M${xa},${ya} C${xa + w},${ya + 70} ${xb + w},${yb - 70} ${xb},${yb} C${xb - w},${yb - 70} ${xa - w},${ya + 70} ${xa},${ya} Z`;
    };
    const cells = CELLS.map(([k, x, w]) => {
      const col = Q[k] ? Q[k].c : '#8a8fa3', xa = 230 + (x - 217) * .12;
      return `<g class="tb-cell ${Q[k] ? '' : 'glia'}" data-q="${k}" style="--c:${col}" data-tip="${Q[k] ? `tq${k}` : 'type1'}">
        <path d="${spindle(x, w)}"/><path d="M${xa},80 L${xa - 2},64 M${xa},80 L${xa + 2},64" class="mv"/></g>`;
    }).join('');
    const aff = CELLS.filter(([k]) => Q[k]).map(([k, x]) => fib(`M${x},266 C${x},290 120,292 30,294`, 'SVA', 'tqAff', `tb-aff q-${k}`)).join('');
    const rows = Object.entries(Q).map(([k, q], i) => {
      const y = 76 + i * 44;
      return `<g class="tb-row" data-q="${k}"><rect x="466" y="${y - 22}" width="426" height="40" rx="10" class="tb-hl"/>
        <circle cx="484" cy="${y - 4}" r="6" style="fill:${q.c}"/><text x="498" y="${y}" class="tb-n">${q.name}</text><text x="498" y="${y + 13}" class="tb-s">${q.mean}</text>
        <text x="604" y="${y + 2}" class="tb-v">${q.rec}</text><text x="728" y="${y + 2}" class="tb-v">${q.cell}</text><text x="796" y="${y + 2}" class="tb-v">${q.tx}</text></g>`;
    }).join('');
    return `
    <svg viewBox="0 0 900 300" class="olt tq2" id="tq2">
      <text x="230" y="20" class="ol-tl" style="text-anchor:middle">saliva · tastants dissolve here</text>
      <g data-tip="tbEpi"><rect x="20" y="40" width="420" height="40" rx="10" class="tb-epi"/></g>
      <g data-tip="tbBud"><path d="M230,64 C330,70 380,170 350,250 C330,282 130,282 110,250 C80,170 130,70 230,64 Z" class="tb-bud"/></g>
      ${aff}${cells}
      <g data-tip="type4">${[[186, 262], [276, 262]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" class="tb-basal"/>`).join('')}</g>
      <g data-tip="tbPore"><ellipse cx="230" cy="58" rx="12" ry="5" class="tb-pore"/></g>
      <text x="390" y="62" class="ol-tl" style="text-anchor:middle">taste pore</text>
      <text x="40" y="288" class="ol-tl" style="text-anchor:start">→ VII · IX · X</text>
      <text x="400" y="200" class="ol-tl" style="text-anchor:middle">I = support</text><text x="400" y="216" class="ol-tl" style="text-anchor:middle">○ basal stem cells</text>
      <path class="lg-div" d="M452,20 L452,290"/>
      <text x="498" y="28" class="rt-lay" style="text-anchor:start">quality</text><text x="604" y="28" class="rt-lay" style="text-anchor:start">receptor</text>
      <text x="728" y="28" class="rt-lay" style="text-anchor:start">cell</text><text x="796" y="28" class="rt-lay" style="text-anchor:start">transmitter</text>
      ${rows}
    </svg>`;
  }

  // ── 3. type II cell: apical membrane (left) · basolateral membrane over the afferent (right) · viewBox 0 0 900 256
  function cascadeSVG() {
    const helices = [...Array(7)].map((_, i) => `<rect x="${102 + i * 10}" y="94" width="8" height="34" rx="4"/>`).join('');
    const hex = 'M9,0 L4.5,7.8 L-4.5,7.8 L-9,0 L-4.5,-7.8 L4.5,-7.8 Z';
    const ions = (x, y, cls, n, lab, anim) => [...Array(n)].map((_, i) =>
      `<g class="ion ${cls} ${anim}" style="animation-delay:${-i * 0.45}s"><circle cx="${x + (i % 2 ? 5 : -5)}" cy="${y}" r="5"/><text x="${x + (i % 2 ? 5 : -5)}" y="${y + 3}">${lab}</text></g>`).join('');
    return `
    <svg viewBox="0 0 900 256" class="olt tc" id="tcSvg">
      <rect x="0" y="0" width="470" height="96" rx="12" class="tc-pore"/>
      <text x="18" y="22" class="fx-lab dim" style="text-anchor:start">TASTE PORE · SALIVA</text>
      <g class="ol-mem"><rect x="0" y="96" width="470" height="30" class="tc-memb"/><path d="M0,98 L470,98 M0,124 L470,124" class="tc-heads"/></g>
      <text x="400" y="90" class="ol-pl sm">apical membrane</text>
      <g class="ol-mem"><rect x="490" y="196" width="220" height="30" class="tc-memb"/><path d="M490,198 L710,198 M490,224 L710,224" class="tc-heads"/></g>
      <text x="708" y="188" class="ol-pl sm" style="text-anchor:end">basolateral membrane</text>
      <text x="18" y="244" class="fx-lab dim" style="text-anchor:start">CYTOPLASM · TYPE II CELL</text>

      <g class="prot p1" data-tip="tcRec"><ellipse cx="137" cy="72" rx="34" ry="20" class="tc-vft"/>${helices.replace(/<rect/g, '<rect class="tc-hx"')}
        <text x="137" y="146" class="ol-pl">T1R / T2R</text></g>
      <g class="tc-tastant" data-tip="olOdor"><path d="${hex}" class="tc-sugar"/></g>
      <g class="ol-g p2" data-tip="gust">
        <ellipse cx="214" cy="168" rx="22" ry="13" class="tc-ga"/><text x="214" y="171" class="ol-gtx">α-gust</text>
        <g class="tc-bg"><circle cx="242" cy="160" r="8" class="gbg"/><circle cx="248" cy="175" r="7" class="gbg"/><text x="262" y="190" class="ol-pl sm">βγ</text></g>
      </g>
      <g class="prot p3" data-tip="plc"><path d="M340,126 L340,138" class="pt-anchor"/><ellipse cx="340" cy="150" rx="28" ry="13" class="tc-plc"/><text x="340" y="154" class="ol-pl dk">PLCβ2</text></g>
      <g class="st3 tc-ip3">${[0, 1, 2].map(i => `<path d="M0,-5 L5,4 L-5,4 Z" class="ip3" style="animation-delay:${-i * .45}s"/>`).join('')}</g>
      <text x="368" y="190" class="ol-pl sm st3">IP₃</text>
      <g class="prot p4" data-tip="er"><path d="M286,214 C300,204 316,222 332,212 C348,202 364,222 380,212 C394,204 404,214 404,224 C390,236 300,236 286,226 Z" class="tc-er"/><text x="345" y="244" class="ol-pl sm">ER</text></g>
      <g class="st4 tc-ca">${[0, 1, 2, 3].map(i => `<g class="caf" style="animation-delay:${-i * .4}s"><circle r="5"/><text y="3">Ca</text></g>`).join('')}</g>
      <g class="prot p5" data-tip="trpm5"><rect x="520" y="192" width="16" height="38" rx="6" class="tc-trp"/><rect x="544" y="192" width="16" height="38" rx="6" class="tc-trp"/>
        <text x="540" y="168" class="ol-pl">TRPM5</text></g>
      <g class="st5">${ions(540, 250, 'na', 3, 'Na', 'ionUpL')}</g>
      <g class="prot p6" data-tip="calhm"><rect x="620" y="192" width="16" height="38" rx="6" class="tc-cal"/><rect x="644" y="192" width="16" height="38" rx="6" class="tc-cal"/>
        <text x="640" y="168" class="ol-pl">CALHM1/3</text></g>
      <g class="st6 tc-atp">${[0, 1, 2].map(i => `<g class="atp" style="animation-delay:${-i * .45}s"><rect x="633" y="-5" width="14" height="10" rx="3"/><text x="640" y="3">ATP</text></g>`).join('')}</g>
      <g class="prot p7" data-tip="p2x"><ellipse cx="640" cy="248" rx="26" ry="7" class="tc-bout"/></g>
      ${fib('M666,248 L712,248', 'SVA', 'tqAff', 'tc-aff')}

      <g class="ol-trace">
        <rect x="724" y="0" width="176" height="256" rx="12" class="ol-tbox"/>
        <text x="812" y="24" class="fx-lab dim">RECEPTOR CELL</text>
        <path d="M738,130 L886,130" class="ol-rest"/><text x="884" y="146" class="ol-tl" style="text-anchor:end">rest</text>
        <path d="M744,130 L790,130" class="ol-v"/>
        <path d="M790,130 C798,130 800,70 812,70 L880,70" class="ol-v st5"/>
        <text x="812" y="196" class="fx-lab dim">AFFERENT FIBRE</text>
        <path d="M744,236 L886,236" class="ol-rest"/>
        <path d="M812,236 L812,214 M824,236 L824,214 M836,236 L836,214 M848,236 L848,214 M860,236 L860,214 M872,236 L872,214" class="ol-v spike st7"/>
      </g>
    </svg>`;
  }

  // ── 4. central pathway (viewBox 0 0 900 300)
  function routeSVG() {
    const box = (k, x, y, w, a, b, tip) => `<g class="tr-box" data-k="${k}" data-tip="${tip}"><rect x="${x - w / 2}" y="${y - 19}" width="${w}" height="38" rx="11"/>
      <text x="${x}" y="${y - 3}">${a}</text><text x="${x}" y="${y + 11}" class="sub">${b}</text></g>`;
    const ln = (k, d, tip) => `<g class="tr-ln" data-k="${k}">${fib(d, 'SVA', tip)}</g>`;
    return `
    <svg viewBox="0 0 900 300" class="olt tr" id="trSvg">
      ${ln('R-N', 'M90,231 L90,189', 'chorda')}${ln('N-NTS', 'M150,170 L205,170', 'solTract')}${ln('NTS-RF', 'M260,189 L260,243', 'n-NTS')}
      ${ln('NTS-VPM', 'M315,162 C340,150 350,110 365,104', 'trCTT')}${ln('VPM-INS', 'M475,100 L530,100', 'trVPM')}${ln('INS-OFC', 'M650,100 L720,100', 'trIns')}
      ${ln('PIR-OFC', 'M780,49 L780,81', 'I-ofc')}${ln('INS-AMY', 'M590,119 L590,191', 'trIns')}${ln('OFC-HYP', 'M780,119 L780,191', 'trOfc')}
      ${ln('NTS-HYP', 'M315,180 C400,250 600,260 720,216', 'trVisc')}
      ${box('R', 90, 250, 130, 'TASTE BUDS', 'tongue · palate · epiglottis', 'tbBud')}
      ${box('N', 90, 170, 120, 'VII · IX · X', 'their ganglia · no synapse', 'tgall')}
      ${box('NTS', 260, 170, 110, 'NTS', 'rostral solitary nucleus', 'n-NTS')}
      ${box('RF', 260, 262, 130, 'BRAINSTEM REFLEXES', 'saliva · swallow · gag', 'trReflex')}
      ${box('VPM', 420, 100, 110, 'VPMpc', 'thalamus · same side', 'trVPM')}
      ${box('INS', 590, 100, 120, 'INSULA', 'quality · intensity', 'trIns')}
      ${box('OFC', 780, 100, 120, 'ORBITOFRONTAL', 'flavour · pleasantness', 'trOfc')}
      ${box('PIR', 780, 30, 120, 'SMELL', 'retronasal odour', 'piriform')}
      ${box('AMY', 590, 210, 120, 'AMYGDALA', 'aversion · learning', 'amygdala')}
      ${box('HYP', 780, 210, 120, 'HYPOTHALAMUS', 'hunger · satiety', 'hypothal')}
      <text x="796" y="152" class="tr-sated" style="text-anchor:start">value ↓</text>
    </svg>`;
  }

  function build() {
    const el = Info.modal('tasteModal', 'taTitle', `
      <h2 id="taTitle">How taste works</h2>
      <p class="fx-lead">From a molecule in saliva to flavour in the orbitofrontal cortex.</p>

      <h3><span class="ol-k">1</span>Tongue · three nerves, one nucleus</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Nerve</span>
        <div class="seg2">${Object.entries(NERVES_T).map(([k, n]) => `<button class="seg-b" data-tn="${k}">${k === 'all' ? 'All' : n[0].split(' ·')[0]}</button>`).join('')}</div></div></div>
      ${tongueSVG()}
      <div class="ol-cap" id="taCap1"></div>
      ${Info.why(WHY.tongue)}

      <h3><span class="ol-k">2</span>Inside a taste bud</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Quality · or click a row</span>
        <div class="seg2">${Object.entries(Q).map(([k, q]) => `<button class="seg-b" data-q="${k}"><span style="color:${q.c}">●</span>${q.name}</button>`).join('')}</div></div></div>
      ${budSVG()}
      <div class="ol-cap" id="taCap2"></div>
      ${Info.why(WHY.bud)}

      <h3><span class="ol-k">3</span>Transduction · sweet, umami, bitter</h3>
      ${Info.stepBar(STEPS)}
      ${cascadeSVG()}
      <div class="ol-cap" id="taCap3"></div>
      ${Info.why(WHY.cascade)}

      <h3><span class="ol-k">4</span>To cortex · from taste to flavour</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Situation</span>
        <div class="seg2">${Object.entries(ROUTE).map(([k, r]) => `<button class="seg-b" data-rt="${k}"><span>${r.icon}</span>${r.name}</button>`).join('')}</div></div></div>
      ${routeSVG()}
      <div class="ol-cap" id="taCap4"></div>
      ${Info.why(WHY.central)}`, onClick, close);

    const cap = (t, l) => `<b>${t}</b><span>${l}</span>`;
    Info.fillCap('taCap1', Object.entries(NERVES_T).map(([k, n]) => [k, cap(n[0], n[1])]));
    Info.fillCap('taCap2', Object.entries(Q).map(([k, q]) => [k, cap(`${q.name} · ${q.mean}`, q.cap)]));
    Info.fillCap('taCap3', [...Array(STEPS.length + 1)].map((_, n) => [n, Info.stepCap(STEPS, n)]));
    Info.fillCap('taCap4', Object.entries(ROUTE).map(([k, r]) => [k, cap(r.cap[0], r.cap[1])]));
    steps = Info.stepper(el, 'tcSvg', 'taCap3', STEPS.length);
  }

  function onClick(e) {
    const s = e.target.closest('[data-step]');
    if (s) { steps.stop(); steps.set(+s.dataset.step); return; }
    if (e.target.closest('[data-play]')) { steps.toggle(); return; }
    const b = e.target.closest('[data-tn], .seg-b[data-q], .tb-row, [data-rt]');
    if (!b) return;
    if (b.dataset.tn) nerve = b.dataset.tn;
    if (b.dataset.q) qual = b.dataset.q;
    if (b.dataset.rt) route = b.dataset.rt;
    paint();
  }

  function paint() {
    const root = document.getElementById('tasteModal');
    const mark = (sel, attr, v) => root.querySelectorAll(sel).forEach(b => b.classList.toggle('on', b.dataset[attr] === v));
    mark('button[data-tn]', 'tn', nerve); mark('button[data-q]', 'q', qual); mark('button[data-rt]', 'rt', route); mark('.tb-row', 'q', qual);

    document.getElementById('tq1').dataset.n = nerve;
    root.querySelectorAll('#tq1 .tg-f').forEach((f, i) => f.classList.toggle('dim', nerve !== 'all' && ['X', 'IX', 'VII'][i] !== nerve));
    root.querySelectorAll('#tq1 .tg-c').forEach(f => f.classList.toggle('dim', nerve !== 'all' && !f.classList.contains(nerve)));
    Info.showCap('taCap1', nerve);

    root.querySelectorAll('#tq2 .tb-cell').forEach(c => c.classList.toggle('hl', c.dataset.q === qual));
    root.querySelectorAll('#tq2 .tb-aff').forEach(a => a.classList.toggle('hl', a.classList.contains(`q-${qual}`)));
    Info.showCap('taCap2', qual);

    const r = ROUTE[route];
    root.querySelectorAll('#trSvg [data-k]').forEach(el => el.classList.toggle('hl', r.on.includes(el.dataset.k)));
    document.getElementById('trSvg').classList.toggle('sated', !!r.sated);
    Info.showCap('taCap4', route);
  }

  function open() {
    if (!steps) build();
    steps.refresh();
    paint();
    Info.show('tasteModal');
  }
  function close() {
    steps?.stop();
    Info.hide('tasteModal');
  }

  return { open, close };
})();
