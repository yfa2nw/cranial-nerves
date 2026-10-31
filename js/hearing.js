// ─────────────────────────────────────────────────────────────
//  Hearing physiology popup: scala media & travelling wave ·
//  hair-cell transduction · ITD / ILD localisation · cortical parsing
// ─────────────────────────────────────────────────────────────

const Hearing = (() => {
  // ── 1. travelling wave: three tones, base (high) → apex (low)
  const FREQ = { f200: [200, '200 Hz'], f1k: [1000, '1 kHz'], f8k: [8000, '8 kHz'] };
  const BM = { x0: 440, x1: 880, y: 118 };
  // position along the membrane from the base (0) to the apex (1), log scale 20 kHz → 20 Hz
  const place = (f) => 1 - Math.log(f / 20) / Math.log(1000);
  const bmX = (f) => BM.x0 + place(f) * (BM.x1 - BM.x0);

  // ── 2. hair-cell transduction steps
  const STEPS = [
    ['Bundle deflects', 'The basilar membrane rises; shear against the tectorial membrane tips the hair bundle toward its tallest stereocilium.'],
    ['Tip links open channels', 'Tension in the tip links (cadherin-23 · protocadherin-15) pulls open MET channels (TMC1/2) at the stereocilia tips — no second messenger.'],
    ['K⁺ flows in', 'Endolymph is K⁺-rich at +80 mV and the cell sits near −45 mV: ~125 mV drives K⁺ in, and the cell depolarises.'],
    ['Ca²⁺ channels open', 'Depolarisation opens voltage-gated Ca²⁺ channels (Ca<sub>v</sub>1.3) at the base of the cell.'],
    ['Glutamate → VIII', 'Ca²⁺ triggers release at the ribbon synapse onto type I spiral ganglion fibres; spikes phase-lock to the sound wave up to ~4 kHz.'],
    ['K⁺ leaves at the base', 'The base faces K⁺-poor perilymph, so K⁺ exits through KCNQ4 / BK channels — repolarised without the hair cell spending ATP.'],
    ['Outer hair cells amplify', 'In outer hair cells the same current drives prestin: the cell shortens and lengthens with each cycle, pumping energy back into the membrane.']
  ];

  // ── 3. localisation
  const AZ = { L90: [-90, 'Left 90°'], L45: [-45, 'Left 45°'], C: [0, 'Ahead'], R45: [45, 'Right 45°'], R90: [90, 'Right 90°'] };
  const HEAD = { x: 210, y: 150, arc: 118 };
  // Woodworth: ITD ≈ (r / c)(θ + sin θ), r 8.75 cm → ~656 µs at 90°; level difference only when the head casts a shadow
  const cues = (az, hi) => {
    const th = Math.abs(az) * Math.PI / 180;
    return { itd: Math.round(656 * (th + Math.sin(th)) / (Math.PI / 2 + 1)), ild: Math.round((hi ? 20 : 2) * Math.sin(th)), side: Math.sign(az) };
  };

  // ── 4. cortex
  const CUES = {
    low:    { name: 'Low tone', icon: '∿', areas: ['A1'], mk: 254,
      cap: ['Low tone · 250 Hz', 'Apical hair cells → low-frequency fibres → the low end of A1’s map on Heschl’s gyrus. The cochlear place code survives every relay up to cortex.'] },
    high:   { name: 'High tone', icon: '≋', areas: ['A1'], mk: 90,
      cap: ['High tone · 8 kHz', 'Basal hair cells → the high end of the map. Noise damage and ageing take this end first — and it is the end of the cochlea nearest the oval window.'] },
    speech: { name: 'Speech', icon: '❝', areas: ['A1', 'beltA', 'pbA', 'aSTG', 'WA', 'IFG', 'ventral', 'arc'],
      cap: ['Speech', 'Belt and parabelt cells prefer complex sounds. The anterior “what” stream (anterior STG / STS → inferior frontal gyrus) identifies words and voices; left posterior STG (Wernicke) links sound to meaning, and the arcuate fasciculus links it to speech output. Lesions: Wernicke aphasia, pure word deafness.'] },
    moving: { name: 'Moving sound', icon: '⇉', areas: ['A1', 'beltP', 'pbP', 'PT', 'IPL', 'DPFC', 'dorsal'],
      cap: ['Moving sound', 'The posterior “where” stream: planum temporale → inferior parietal lobule → dorsal prefrontal and premotor cortex, tracking where sounds are and turning eyes and head toward them. One-sided damage spares hearing but blurs localisation in the opposite field.'] }
  };

  const WHY = {
    cochlea: [
      ['Three chambers, two fluids', 'Scala vestibuli and tympani hold perilymph — Na⁺-rich, near 0 mV — and meet at the helicotrema. Scala media holds endolymph: ~150 mM K⁺ at +80 mV, the endocochlear potential made by the stria vascularis. Reissner’s membrane and the reticular lamina keep the two apart.'],
      ['A place code', 'The basilar membrane is narrow and stiff at the base, wide and floppy at the apex. Sound launches a travelling wave from the base that grows until it reaches the place tuned to its frequency, then dies away. Each hair cell → one frequency: tonotopy, all the way to cortex.'],
      ['The amplifier', 'A passive wave would be broad and weak. Outer hair cells pump energy in at the peak, adding ~40–60 dB and sharpening tuning. Noise, aminoglycosides or cisplatin destroy them: sounds get quieter and muddier — why hearing aids restore loudness better than clarity.']
    ],
    hair: [
      ['Why K⁺ depolarises', 'Normally K⁺ leaving a cell repolarises it. Here the apex faces endolymph (K⁺ high, +80 mV) while the cell sits at −45 mV, so K⁺ is driven in. The base faces K⁺-poor perilymph, so K⁺ leaves there. The battery is the stria vascularis, not the hair cell.'],
      ['Built for speed', 'MET channels open directly by tip-link tension, in microseconds. Ribbon synapses release continuously, so spiral ganglion fibres fire locked to the phase of the wave up to ~4 kHz — the timing the brainstem needs for localisation.'],
      ['Two hair cells, two jobs', '~3 500 inner hair cells receive 90–95% of afferent fibres — they are the receptors. ~12 000 outer hair cells have few afferents but heavy efferent input from the olivocochlear bundle, which turns the amplifier down. Otoacoustic emissions — used in newborn screening — come from them.']
    ],
    loc: [
      ['Duplex theory', 'Below ~1.5 kHz the wavelength is longer than the head, so there is little shadow — but fibres phase-lock, so timing works. Above it the head casts a shadow and level differences grow, but phase-locking fails. Around 2 kHz both cues are weak and localisation is worst.'],
      ['MSO: a timing comparator', 'MSO neurons get input from both cochlear nuclei and fire most when the two arrive together. Delay lines (Jeffress) plus precisely timed glycinergic inhibition (MNTB, LNTB) tune each cell to a different ITD — differences of ~10 µs are resolved.'],
      ['LSO: excitation minus inhibition', 'The same-side cochlear nucleus excites the LSO; the opposite side inhibits it via the MNTB, through the giant calyx of Held. LSO firing tracks the level difference. Front-back and up-down ambiguity is resolved by the pinna’s spectral filtering and by turning the head.']
    ],
    cortex: [
      ['The map repeats', 'A1 on Heschl’s gyrus keeps the cochlear frequency map. The surrounding belt and parabelt prefer bands, sweeps and vocalisations — complexity grows outward from the core, as in vision.'],
      ['What and where', 'An anterior-ventral stream (anterior STG / STS → ventrolateral prefrontal) identifies sounds and speech. A posterior-dorsal stream (planum temporale → parietal → dorsal prefrontal) localises them and maps sound onto action, such as repeating a word.'],
      ['Lesions above the crossing', 'Every relay from the superior olive up carries both ears, so one-sided cortical damage barely dents hearing. Bilateral damage → cortical deafness or auditory agnosia; left posterior STG → Wernicke aphasia; selective damage → pure word deafness.']
    ]
  };

  let freq = 'f1k', ohc = true, az = 'R45', hi = false, cue = 'speech', steps = null, raf = null;

  // ── 1. cochlear cross-section + unrolled basilar membrane (viewBox 0 0 900 300)
  function cochleaSVG() {
    const ticks = [[20000, '20 kHz'], [8000, '8k'], [1000, '1k'], [200, '200'], [20, '20 Hz']]
      .map(([fr, l]) => `<path d="M${bmX(fr).toFixed(1)},244 L${bmX(fr).toFixed(1)},250" class="hr-tk"/><text x="${bmX(fr).toFixed(1)}" y="264" class="hr-tl">${l}</text>`).join('');
    return `
    <svg viewBox="0 0 900 300" class="olt hr1" id="hr1">
      <g data-tip="oticCap"><rect x="10" y="22" width="380" height="270" rx="24" class="hr-bone"/></g>
      <g data-tip="modiolus"><rect x="18" y="30" width="50" height="254" rx="18" class="hr-mod"/></g>
      <g data-tip="sVest"><path d="M84,36 L372,36 L372,84 L132,170 L84,150 Z" class="hr-peri"/></g>
      <g data-tip="sMedia"><path d="M132,170 L372,84 L372,190 L124,190 Z" class="hr-endo"/></g>
      <g data-tip="sTymp"><path d="M84,198 L372,198 L372,276 L84,276 Z" class="hr-peri"/></g>
      <g data-tip="stria"><rect x="356" y="86" width="16" height="102" rx="4" class="hr-stria"/></g>
      <g data-tip="reissner"><path d="M132,170 L372,84" class="hr-reis"/></g>
      <g data-tip="lamina"><rect x="66" y="186" width="62" height="10" rx="3" class="hr-lam"/></g>
      <g data-tip="bmem"><path d="M124,194 L372,194" class="hr-bm"/></g>
      <g data-tip="limbus"><ellipse cx="150" cy="180" rx="20" ry="9" class="hr-limb"/></g>
      ${fib('M200,190 C170,196 120,192 62,192', 'SSA', 'VIII-c', 'coch')}
      <g data-tip="ihc"><ellipse cx="200" cy="181" rx="6" ry="9" class="hr-ihc"/></g>
      <g data-tip="ohc">${[238, 254, 270].map(x => `<rect x="${x - 4}" y="172" width="8" height="18" rx="3" class="hr-ohc"/>`).join('')}</g>
      <g data-tip="tect"><path d="M140,168 C190,158 250,154 300,158 L300,166 C250,164 190,168 146,176 Z" class="hr-tect"/></g>
      <g data-tip="spiralG"><ellipse cx="43" cy="192" rx="15" ry="22" class="tg"/></g>
      <path d="M354,176 L328,178" class="hr-karr" marker-end="url(#arrowW)"/><text x="318" y="182" class="hr-k" style="text-anchor:end">K⁺</text>
      <g class="labels">
        ${t(228, 58, 'SCALA VESTIBULI', 'middle')}${t(228, 72, 'perilymph · Na⁺ · 0 mV', 'middle', 'hr-sub')}
        ${t(300, 146, 'SCALA MEDIA', 'middle', 'cochT')}${t(300, 160, 'endolymph · K⁺ · +80 mV', 'middle', 'hr-sub')}
        ${t(228, 244, 'SCALA TYMPANI', 'middle')}${t(228, 258, 'perilymph · Na⁺ · 0 mV', 'middle', 'hr-sub')}
        ${t(304, 100, "REISSNER'S", 'middle', 'faint')}
        ${t(200, 212, 'IHC', 'middle', 'faint')}${t(254, 212, 'OHC', 'middle', 'faint')}${t(314, 212, 'BASILAR M.', 'middle', 'faint')}
        ${t(364, 80, 'STRIA', 'middle', 'faint')}${t(43, 232, 'SPIRAL G.', 'middle', 'faint')}${t(43, 278, 'MODIOLUS', 'middle', 'faint')}
      </g>

      <text x="660" y="24" class="fx-lab dim">BASILAR MEMBRANE · UNROLLED</text>
      <path d="M${BM.x0},${BM.y} L${BM.x1},${BM.y}" class="hr-axis"/>
      <path id="hrEnv" class="hr-env"/>
      <path id="hrWave" class="hr-wave"/>
      <g id="hrPk" class="hr-pk"><path d="M0,${BM.y - 70} L0,190"/><text x="0" y="${BM.y - 76}" id="hrPkT"></text></g>
      <g data-tip="bmem"><path d="M${BM.x0},196 L${BM.x1},184 L${BM.x1},216 L${BM.x0},204 Z" class="hr-bmu"/></g>
      <text x="${BM.x0}" y="234" class="hr-end" style="text-anchor:start">BASE · stiff, narrow</text>
      <text x="${BM.x1}" y="234" class="hr-end" style="text-anchor:end">APEX · wide, floppy</text>
      ${ticks}
      <text x="${BM.x0}" y="286" class="ol-tl" style="text-anchor:start">↑ oval window · stapes</text>
      <text x="${BM.x1}" y="286" class="ol-tl" style="text-anchor:end">helicotrema</text>
    </svg>`;
  }

  // wave y = A(u) · sin(ωt − φ(u)): the phase builds toward the peak, so crests travel base → apex and bunch up
  function waveFrame(time) {
    const up = place(FREQ[freq][0]);
    const amp = ohc ? 58 : 18;
    const A = (u) => u <= up
      ? amp * (ohc ? .2 * Math.exp(-(up - u) / .35) + .8 * Math.exp(-(((up - u) / .07) ** 2)) : Math.exp(-(up - u) / .3))
      : amp * Math.exp(-(((u - up) / (ohc ? .025 : .06)) ** 2));
    const phi = (u) => 2 * Math.PI * 5 * (Math.min(u, up) / up) ** 2 + (u > up ? (u - up) * 60 : 0);
    let w = '', e1 = '', e2 = '';
    for (let i = 0; i <= 160; i++) {
      const u = i / 160, x = (BM.x0 + u * (BM.x1 - BM.x0)).toFixed(1), a = A(u);
      w += `${i ? 'L' : 'M'}${x},${(BM.y - a * Math.sin(time * 5 - phi(u))).toFixed(1)} `;
      e1 += `${i ? 'L' : 'M'}${x},${(BM.y - a).toFixed(1)} `;
      e2 += `${i ? 'L' : 'M'}${x},${(BM.y + a).toFixed(1)} `;
    }
    document.getElementById('hrWave').setAttribute('d', w);
    document.getElementById('hrEnv').setAttribute('d', e1 + e2);
  }
  function loop(ts) {
    waveFrame(ts / 1000);
    raf = requestAnimationFrame(loop);
  }

  // ── 2. one inner hair cell + an outer hair cell (viewBox 0 0 900 256)
  function hairSVG() {
    const ions = (x, y, cls, n, lab, anim) => [...Array(n)].map((_, i) =>
      `<g class="ion ${cls} ${anim}" style="animation-delay:${-i * 0.45}s"><circle cx="${x + (i % 2 ? 5 : -5)}" cy="${y}" r="5"/><text x="${x + (i % 2 ? 5 : -5)}" y="${y + 3}">${lab}</text></g>`).join('');
    return `
    <svg viewBox="0 0 900 256" class="olt hc2" id="hc2">
      <g data-tip="sMedia"><rect x="0" y="0" width="700" height="96" rx="12" class="hc-endo"/></g>
      <text x="18" y="22" class="fx-lab dim" style="text-anchor:start">ENDOLYMPH · K⁺ 150 mM · +80 mV</text>
      <text x="420" y="248" class="fx-lab dim" style="text-anchor:start">PERILYMPH · K⁺ LOW · 0 mV</text>
      <g data-tip="tect"><rect x="330" y="18" width="330" height="26" rx="8" class="hc-tect"/><text x="560" y="35" class="ol-pl sm">tectorial membrane</text></g>
      <g data-tip="retLam"><rect x="0" y="96" width="700" height="6" class="hc-ret"/></g>

      <g class="prot p3" data-tip="ihc"><path d="M212,102 C200,140 196,190 214,214 C230,232 270,232 286,214 C304,190 300,140 288,102 Z" class="hc-ihc"/>
        <circle cx="250" cy="160" r="14" class="hc-nuc"/></g>
      <g class="prot p1 p2 bundle" data-tip="bundle" style="transform-origin:250px 100px">
        <rect x="228" y="70" width="7" height="30" rx="3.5"/><rect x="245" y="56" width="7" height="44" rx="3.5"/><rect x="262" y="40" width="7" height="60" rx="3.5"/>
        <path d="M231.5,71 L245,62 M248.5,57 L262,47" class="tiplink"/>
        <circle cx="231.5" cy="71" r="3" class="met"/><circle cx="248.5" cy="57" r="3" class="met"/></g>
      <g class="st3">${ions(250, 46, 'k', 4, 'K', 'ionK')}</g>
      <g class="prot p4" data-tip="cav"><rect x="212" y="200" width="10" height="16" rx="3" class="hc-cav"/></g>
      <g class="st4">${ions(212, 242, 'ca', 2, 'Ca', 'ionUp')}</g>
      <g class="prot p5" data-tip="ribbon"><rect x="244" y="204" width="12" height="16" rx="3" class="hc-rib"/>
        ${[[238, 208], [262, 208], [240, 218], [260, 218]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" class="hc-ves"/>`).join('')}</g>
      <g class="st5 hc-glu">${[0, 1, 2].map(i => `<circle cx="${244 + i * 6}" cy="226" r="2.2" style="animation-delay:${-i * .3}s"/>`).join('')}</g>
      <g data-tip="afferent"><ellipse cx="250" cy="238" rx="15" ry="6" class="hc-bouton"/></g>
      ${fib('M236,240 C180,248 120,248 52,246', 'SSA', 'VIII-c', 'coch hc-aff')}
      <text x="52" y="236" class="ol-tl" style="text-anchor:start">← to the spiral ganglion · VIII</text>
      <g class="prot p6" data-tip="kOut"><rect x="290" y="176" width="10" height="16" rx="3" class="hc-kch"/></g>
      <g class="st6">${ions(304, 184, 'k', 3, 'K', 'ionX')}</g>

      <g class="prot p7" data-tip="ohcP"><g class="ohc-body" style="transform-origin:495px 102px">
        <path d="M478,102 L478,212 C478,226 512,226 512,212 L512,102 Z" class="hc-ohc"/>
        ${[120, 146, 172, 198].map(y => `<circle cx="478" cy="${y}" r="2.5" class="prestin"/><circle cx="512" cy="${y}" r="2.5" class="prestin"/>`).join('')}</g>
        <rect x="484" y="80" width="6" height="20" rx="3" class="hc-st"/><rect x="492" y="66" width="6" height="34" rx="3" class="hc-st"/><rect x="500" y="44" width="6" height="56" rx="3" class="hc-st"/></g>
      <g class="st7 hc-motil"><path d="M530,120 L530,200" marker-end="url(#arrowW)" marker-start="url(#arrowW)"/></g>
      <text x="316" y="150" class="ol-pl" style="text-anchor:start">INNER HAIR CELL</text><text x="316" y="164" class="ol-tl" style="text-anchor:start">the receptor</text>
      <text x="544" y="150" class="ol-pl" style="text-anchor:start">OUTER HAIR CELL</text><text x="544" y="164" class="ol-tl" style="text-anchor:start">prestin motor</text>
      <text x="150" y="58" class="ol-tl" style="text-anchor:end">tip links →</text>

      <g class="ol-trace">
        <rect x="724" y="0" width="176" height="256" rx="12" class="ol-tbox"/>
        <text x="812" y="24" class="fx-lab dim">HAIR CELL POTENTIAL</text>
        <path d="M738,150 L886,150" class="ol-rest"/><text x="884" y="166" class="ol-tl" style="text-anchor:end">rest −45</text>
        <path d="M744,150 L776,150" class="ol-v"/>
        <path d="M776,150 C784,150 786,96 798,96 L830,96" class="ol-v st3"/>
        <path d="M830,96 C840,96 842,150 856,150 L880,150" class="ol-v st6"/>
        <text x="812" y="200" class="fx-lab dim">VIII FIBRE</text>
        <path d="M744,236 L886,236" class="ol-rest"/>
        <path d="M790,236 L790,214 M800,236 L800,214 M810,236 L810,214 M820,236 L820,214 M830,236 L830,214" class="ol-v spike st5"/>
      </g>
    </svg>`;
  }

  // ── 3. ITD / ILD (viewBox 0 0 900 300): head from above, nose up · patient's right is the viewer's right
  function locSVG() {
    const neurons = [...Array(7)].map((_, i) => {
      const x = 520 + i * 50;
      return `<path d="M${x},70 L${x},82 M${x},100 L${x},112" class="lc-tap"/><circle cx="${x}" cy="91" r="9" class="lc-n" data-i="${i}"/>`;
    }).join('');
    return `
    <svg viewBox="0 0 900 300" class="olt lc" id="lcSvg">
      <path d="M${HEAD.x - HEAD.arc},${HEAD.y} A${HEAD.arc},${HEAD.arc} 0 0,1 ${HEAD.x + HEAD.arc},${HEAD.y}" class="lc-arc"/>
      <g id="lcWaves">${[0, 1, 2].map(i => `<circle class="lc-wf" r="0" style="animation-delay:${-i * .6}s"/>`).join('')}</g>
      <ellipse id="lcShadow" class="lc-shadow" rx="74" ry="44"/>
      <g data-tip="lcHead"><ellipse cx="${HEAD.x}" cy="${HEAD.y}" rx="50" ry="58" class="vor-head"/>
        <path d="M${HEAD.x - 10},${HEAD.y - 56} L${HEAD.x},${HEAD.y - 72} L${HEAD.x + 10},${HEAD.y - 56}" class="vor-nose"/>
        <ellipse cx="${HEAD.x - 52}" cy="${HEAD.y}" rx="6" ry="14" class="vor-ear"/><ellipse cx="${HEAD.x + 52}" cy="${HEAD.y}" rx="6" ry="14" class="vor-ear"/>
        <text x="${HEAD.x - 30}" y="${HEAD.y + 4}" class="lbl faint" text-anchor="middle">L</text><text x="${HEAD.x + 30}" y="${HEAD.y + 4}" class="lbl faint" text-anchor="middle">R</text></g>
      <g id="lcSrc" class="lc-src" data-tip="lcSrc"><circle r="11"/><path d="M-4,-5 L0,-5 L5,-9 L5,9 L0,5 L-4,5 Z"/></g>
      <text x="24" y="246" class="rt-lay">arrival</text><text x="24" y="276" class="rt-lay">level</text>
      <path d="M90,242 L290,242" class="rt-base"/>
      <g id="lcTL" class="lc-tick L"><path d="M0,232 L0,252"/><text x="-3" y="230" style="text-anchor:end">L</text></g>
      <g id="lcTR" class="lc-tick R"><path d="M0,232 L0,252"/><text x="3" y="230" style="text-anchor:start">R</text></g>
      <text x="310" y="248" class="lc-val" id="lcItd"></text>
      <rect x="90" y="262" width="190" height="8" rx="4" class="pt-glubg"/><rect x="90" y="262" width="190" height="8" rx="4" class="lc-lv L" id="lcLL"/>
      <rect x="90" y="276" width="190" height="8" rx="4" class="pt-glubg"/><rect x="90" y="276" width="190" height="8" rx="4" class="lc-lv R" id="lcLR"/>
      <text x="286" y="270" class="rt-lay sm" style="text-anchor:start">L</text><text x="286" y="284" class="rt-lay sm" style="text-anchor:start">R</text>
      <text x="310" y="280" class="lc-val" id="lcIld"></text>
      <path class="lg-div" d="M430,20 L430,290"/>

      <g class="lc-mso" data-tip="mso">
        <text x="460" y="24" class="rt-lay" style="text-anchor:start">MSO · timing</text><text x="560" y="24" class="ol-tl" style="text-anchor:start">coincidence detectors · low frequencies</text>
        ${fib('M460,70 L870,70', 'SSA', 'mso', 'coch fwd')}${fib('M880,112 L470,112', 'SSA', 'mso', 'coch fwd')}
        ${neurons}
        <text x="460" y="62" class="rt-lay sm" style="text-anchor:start">from L ear →</text><text x="880" y="128" class="rt-lay sm" style="text-anchor:end">← from R ear</text>
        <text x="670" y="146" class="ol-tl" style="text-anchor:middle" id="lcMsoT"></text>
      </g>
      <g class="lc-lso" data-tip="lso">
        <text x="460" y="184" class="rt-lay" style="text-anchor:start">LSO · level</text><text x="550" y="184" class="ol-tl" style="text-anchor:start">same side +, other side − via MNTB · high frequencies</text>
        <text x="460" y="222" class="rt-lay sm" style="text-anchor:start">L LSO</text><text x="460" y="258" class="rt-lay sm" style="text-anchor:start">R LSO</text>
        <rect x="520" y="212" width="340" height="14" rx="7" class="pt-glubg"/><rect x="520" y="212" width="340" height="14" rx="7" class="lc-bar" id="lcBL"/>
        <rect x="520" y="248" width="340" height="14" rx="7" class="pt-glubg"/><rect x="520" y="248" width="340" height="14" rx="7" class="lc-bar" id="lcBR"/>
        <path d="M690,204 L690,270" class="lc-mid"/><text x="690" y="284" class="ol-tl" style="text-anchor:middle">resting rate</text>
      </g>
    </svg>`;
  }

  // ── 4. A1 tonotopy + the two auditory streams (viewBox 0 0 900 300) · front is right
  function cortexSVG() {
    const area = (id, shape, lab, lx, ly, a = 'middle') => `<g class="br-a" data-a="${id}" data-tip="ac${id}">${shape}</g><text x="${lx}" y="${ly}" class="br-l" style="text-anchor:${a}">${lab}</text>`;
    const half = (id, x, y, w, h, cls) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2.6}" class="${cls}" data-a="${id}"/>`;
    const brain = 'M380,170 C376,110 430,62 520,50 C620,36 760,48 840,96 C884,124 892,176 868,210 C846,240 800,252 760,250 C720,262 680,280 630,278 C580,290 520,282 480,262 C430,248 386,222 380,170 Z';
    return `
    <svg viewBox="0 0 900 300" class="olt ac" id="acSvg">
      <defs><linearGradient id="tonoG" x1="0" x2="1"><stop offset="0" stop-color="#79e0ee"/><stop offset="1" stop-color="#3550c8"/></linearGradient></defs>
      <text x="172" y="24" class="fx-lab dim">SUPERIOR TEMPORAL PLANE · OPENED</text>
      <g data-tip="parabelt">${half('pbP', 22, 70, 152, 150, 'ac-pb')}${half('pbA', 170, 70, 152, 150, 'ac-pb')}</g>
      <g data-tip="belt">${half('beltP', 40, 92, 134, 106, 'ac-belt')}${half('beltA', 170, 92, 134, 106, 'ac-belt')}</g>
      <g data-tip="a1"><rect x="64" y="122" width="216" height="46" rx="23" fill="url(#tonoG)" class="ac-core" data-a="A1"/></g>
      <circle id="acMk" cx="0" cy="145" r="9" class="ac-mk"/>
      <text x="172" y="62" class="br-l">PARABELT</text><text x="172" y="86" class="br-l">BELT</text><text x="172" y="116" class="br-l">A1 · HESCHL’S GYRUS</text>
      <text x="84" y="186" class="br-l" style="fill:#79e0ee">HIGH</text><text x="260" y="186" class="br-l" style="fill:#8fa6ff">LOW</text>
      <text x="30" y="246" class="ol-tl" style="text-anchor:start">← posterior</text><text x="314" y="246" class="ol-tl" style="text-anchor:end">anterior →</text>
      <path class="lg-div" d="M346,30 L346,280"/>
      <g data-tip="brainLat2"><path d="${brain}" class="br-out"/></g>
      <path class="br-sulc" d="M780,178 C700,172 620,166 560,162 C530,160 510,150 496,136" data-tip="sylvian"/>
      <path class="br-stream" data-a="ventral" d="M604,178 C640,200 680,210 720,206 C744,202 756,198 764,194" marker-end="url(#arrowW)"/>
      <path class="br-stream" data-a="dorsal" d="M566,160 C534,140 522,120 550,104 C600,82 680,84 734,96" marker-end="url(#arrowW)"/>
      <path class="br-stream arc" data-a="arc" d="M512,192 C484,150 520,124 600,122 C680,122 744,150 760,180"/>
      ${area('A1', '<ellipse cx="588" cy="170" rx="26" ry="9" class="ventral"/>', 'A1 (in the fissure)', 588, 154)}
      ${area('PT', '<ellipse cx="532" cy="162" rx="18" ry="7" class="ventral"/>', 'PT', 524, 150)}
      ${area('aSTG', '<ellipse cx="680" cy="206" rx="44" ry="12"/>', 'ANTERIOR STG', 680, 230)}
      ${area('WA', '<ellipse cx="516" cy="198" rx="30" ry="14"/>', 'WERNICKE', 516, 226)}
      ${area('IPL', '<ellipse cx="540" cy="104" rx="40" ry="22"/>', 'INFERIOR PARIETAL', 540, 76)}
      ${area('IFG', '<ellipse cx="780" cy="196" rx="26" ry="16"/>', 'BROCA · IFG', 780, 226)}
      ${area('DPFC', '<ellipse cx="764" cy="100" rx="30" ry="18"/>', 'DORSAL PFC', 764, 74)}
      <text x="640" y="44" class="br-st dorsal">DORSAL · where</text>
      <text x="660" y="268" class="br-st ventral">VENTRAL · what</text>
      <text x="840" y="146" class="ol-tl" style="text-anchor:middle">front →</text>
    </svg>`;
  }

  function build() {
    const el = Info.modal('hearModal', 'heTitle', `
      <h2 id="heTitle">How hearing works</h2>
      <p class="fx-lead">From a pressure wave in the air to a word — and a place — in cortex.</p>

      <h3><span class="ol-k">1</span>Scala media and the travelling wave</h3>
      <div class="ol-bar">
        <div class="ctrl-grp"><span class="cg-l">Tone</span><div class="seg2">${Object.entries(FREQ).map(([k, f]) => `<button class="seg-b" data-freq="${k}">${f[1]}</button>`).join('')}</div></div>
        <div class="ctrl-grp"><span class="cg-l">Outer hair cells</span>${Clinic.sw('1', 'ohc', true, '≋', 'Cochlear amplifier', 'ohc')}</div>
      </div>
      ${cochleaSVG()}
      <div class="ol-cap" id="heCap1"></div>
      ${Info.why(WHY.cochlea)}

      <h3><span class="ol-k">2</span>Hair-cell transduction</h3>
      ${Info.stepBar(STEPS)}
      ${hairSVG()}
      <div class="ol-cap" id="heCap2"></div>
      ${Info.why(WHY.hair)}

      <h3><span class="ol-k">3</span>Where is it? Timing and level</h3>
      <div class="ol-bar">
        <div class="ctrl-grp"><span class="cg-l">Sound source</span><div class="seg2">${Object.entries(AZ).map(([k, a]) => `<button class="seg-b" data-az="${k}">${a[1]}</button>`).join('')}</div></div>
        <div class="ctrl-grp"><span class="cg-l">Pitch</span><div class="seg2"><button class="seg-b" data-hi="0">500 Hz</button><button class="seg-b" data-hi="1">4 kHz</button></div></div>
      </div>
      ${locSVG()}
      <div class="ol-cap" id="heCap3"></div>
      ${Info.why(WHY.loc)}

      <h3><span class="ol-k">4</span>Cortex · tonotopy and two streams</h3>
      <div class="ol-bar"><div class="ctrl-grp"><span class="cg-l">Sound</span>
        <div class="seg2">${Object.entries(CUES).map(([k, c]) => `<button class="seg-b" data-cue="${k}"><span>${c.icon}</span>${c.name}</button>`).join('')}</div></div></div>
      ${cortexSVG()}
      <div class="ol-cap" id="heCap4"></div>
      ${Info.why(WHY.cortex)}`, onClick, close);

    const v1 = [];
    Object.entries(FREQ).forEach(([k, [f, l]]) => [true, false].forEach(o => v1.push([`${k}|${o}`, cap1(f, l, o)])));
    Info.fillCap('heCap1', v1);
    Info.fillCap('heCap2', [...Array(STEPS.length + 1)].map((_, n) => [n, Info.stepCap(STEPS, n)]));
    const v3 = [];
    Object.keys(AZ).forEach(a => [false, true].forEach(h => v3.push([`${a}|${h}`, cap3(a, h)])));
    Info.fillCap('heCap3', v3);
    Info.fillCap('heCap4', Object.entries(CUES).map(([k, c]) => [k, `<b>${c.cap[0]}</b><span>${c.cap[1]}</span>`]));
    steps = Info.stepper(el, 'hc2', 'heCap2', STEPS.length);
  }

  function cap1(f, l, o) {
    const where = f >= 4000 ? 'near the base' : f >= 800 ? 'midway along' : 'near the apex';
    return `<b>${l} · peaks ${where}</b><span>${o
      ? 'The wave rises from the base, crests where the membrane’s stiffness matches the tone, then collapses — outer hair cells sharpen and boost that peak.'
      : 'Without outer hair cells the peak is ~40 dB lower and smeared over a long stretch: sounds are quieter <em>and</em> less distinct — cochlear hearing loss.'}</span>`;
  }
  function cap3(a, h) {
    const [deg] = AZ[a], c = cues(deg, h);
    if (!deg) return `<b>Straight ahead · ${h ? '4 kHz' : '500 Hz'}</b><span>Same time, same level at both ears — ITD 0 µs, ILD 0 dB. Front and back give identical cues (the cone of confusion); the pinna’s spectral filtering and small head turns sort them out.</span>`;
    const near = deg > 0 ? 'right' : 'left';
    return `<b>${AZ[a][1]} · ${h ? '4 kHz' : '500 Hz'}</b><span>The ${near} ear hears it <em>${c.itd} µs earlier</em>${h
      ? ` and <em>${c.ild} dB louder</em> — at this short wavelength the head casts a shadow. Fibres can’t phase-lock to 4 kHz, so the LSO’s level comparison carries the location.`
      : `, but only ~${c.ild} dB louder — a 69 cm wave bends round the head. Fibres phase-lock at 500 Hz, so the MSO’s timing comparison carries the location.`}</span>`;
  }

  function onClick(e) {
    const s = e.target.closest('[data-step]');
    if (s) { steps.stop(); steps.set(+s.dataset.step); return; }
    if (e.target.closest('[data-play]')) { steps.toggle(); return; }
    const b = e.target.closest('[data-freq], [data-ohc], [data-az], [data-hi], [data-cue]');
    if (!b) return;
    if (b.dataset.freq) freq = b.dataset.freq;
    if (b.dataset.ohc) ohc = !ohc;
    if (b.dataset.az) az = b.dataset.az;
    if (b.dataset.hi) hi = b.dataset.hi === '1';
    if (b.dataset.cue) cue = b.dataset.cue;
    paint();
  }

  function paint() {
    const root = document.getElementById('hearModal');
    const mark = (attr, v) => root.querySelectorAll(`button[data-${attr}]`).forEach(b => b.classList.toggle('on', b.dataset[attr] === v));
    mark('freq', freq); mark('az', az); mark('hi', hi ? '1' : '0'); mark('cue', cue);
    root.querySelector('[data-ohc]').classList.toggle('on', ohc);

    // 1. peak marker (the wave itself is drawn every frame)
    const pk = bmX(FREQ[freq][0]);
    document.getElementById('hrPk').setAttribute('transform', `translate(${pk.toFixed(1)},0)`);
    document.getElementById('hrPkT').textContent = FREQ[freq][1];
    document.getElementById('hr1').classList.toggle('no-ohc', !ohc);
    waveFrame(performance.now() / 1000);
    Info.showCap('heCap1', `${freq}|${ohc}`);

    // 3. source, wavefronts, head shadow, ear readouts, MSO and LSO
    const deg = AZ[az][0], rad = deg * Math.PI / 180, c = cues(deg, hi);
    const sx = HEAD.x + HEAD.arc * Math.sin(rad), sy = HEAD.y - HEAD.arc * Math.cos(rad);
    document.getElementById('lcSrc').setAttribute('transform', `translate(${sx.toFixed(1)},${sy.toFixed(1)})`);
    root.querySelectorAll('.lc-wf').forEach(w => { w.setAttribute('cx', sx.toFixed(1)); w.setAttribute('cy', sy.toFixed(1)); });
    const sh = document.getElementById('lcShadow');
    sh.setAttribute('cx', (HEAD.x - 62 * Math.sin(rad)).toFixed(1));
    sh.setAttribute('cy', (HEAD.y + 62 * Math.cos(rad)).toFixed(1));
    sh.setAttribute('transform', `rotate(${deg} ${(HEAD.x - 62 * Math.sin(rad)).toFixed(1)} ${(HEAD.y + 62 * Math.cos(rad)).toFixed(1)})`);
    sh.classList.toggle('on', hi && deg !== 0);
    const tx = (us) => 100 + us / 700 * 180;                       // arrival axis: 0–700 µs
    const tL = c.side > 0 ? c.itd : 0, tR = c.side < 0 ? c.itd : 0;
    document.getElementById('lcTL').setAttribute('transform', `translate(${tx(tL).toFixed(1)},0)`);
    document.getElementById('lcTR').setAttribute('transform', `translate(${tx(tR).toFixed(1)},0)`);
    document.getElementById('lcItd').textContent = `ITD ${c.itd} µs`;
    const lvL = 70 - c.side * c.ild / 2, lvR = 70 + c.side * c.ild / 2;
    document.getElementById('lcLL').style.transform = `scaleX(${(lvL / 90).toFixed(3)})`;
    document.getElementById('lcLR').style.transform = `scaleX(${(lvR / 90).toFixed(3)})`;
    document.getElementById('lcIld').textContent = `ILD ${c.ild} dB`;
    // the lead ear's spikes travel further along the delay line before meeting the lagging ones
    const lit = 3 - Math.round(c.side * c.itd / 656 * 3);
    root.querySelectorAll('.lc-n').forEach(n => n.classList.toggle('on', +n.dataset.i === lit));
    document.getElementById('lcMsoT').textContent = hi ? 'no phase-locking at 4 kHz — timing unusable' : deg ? `cell ${lit + 1} fires: its delays cancel the ${c.itd} µs head start` : 'middle cell: both arrive together';
    const lso = (ipsi, contra) => Math.max(.06, Math.min(1, .5 + (ipsi - contra) / 24));
    document.getElementById('lcBL').style.transform = `scaleX(${lso(lvL, lvR).toFixed(3)})`;
    document.getElementById('lcBR').style.transform = `scaleX(${lso(lvR, lvL).toFixed(3)})`;
    document.getElementById('lcSvg').classList.toggle('hi', hi);
    Info.showCap('heCap3', `${az}|${hi}`);

    // 4. cortex
    const q = CUES[cue];
    root.querySelectorAll('#acSvg [data-a]').forEach(el => el.classList.toggle('hl', q.areas.includes(el.dataset.a)));
    const mk = document.getElementById('acMk');
    mk.setAttribute('cx', q.mk || 0);
    mk.classList.toggle('on', !!q.mk);
    Info.showCap('heCap4', cue);
  }

  function open() {
    if (!steps) build();
    steps.refresh();
    paint();
    Info.show('hearModal');
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }
  function close() {
    steps?.stop();
    cancelAnimationFrame(raf);
    Info.hide('hearModal');
  }

  return { open, close };
})();
