// ─────────────────────────────────────────────────────────────
//  Detail cards. Each builder returns an svg string for one nerve.
// ─────────────────────────────────────────────────────────────

const MID_OUTLINE = 'M200,52 C186,36 150,30 128,42 C100,56 80,84 70,116 C58,156 60,196 78,226 C96,256 130,272 160,272 C180,272 192,252 200,240 C208,252 220,272 240,272 C270,272 304,256 322,226 C340,196 342,156 330,116 C320,84 300,56 272,42 C250,30 214,36 200,52 Z';

function mx(inner, cx = 200) { return `<g transform="translate(${cx * 2},0) scale(-1,1)">${inner}</g>`; }

function lesion(x, y, key) {
  return `<g class="lesion" data-tip="${key}" transform="translate(${x},${y})">
    <circle r="9" class="l-ring"/><path d="M-2.5,-5 L1.5,-1 L-1.5,0.5 L2.5,5" class="l-bolt"/></g>`;
}

function fib(d, f, tip, extra = '') {
  return `<g class="seg ${f} ${extra}" data-tip="${tip}"><path class="halo" d="${d}"/><path class="base" d="${d}"/><path class="flow" d="${d}"/><path class="hit" d="${d}"/></g>`;
}

function t(x, y, s, a = 'middle', c = '') { return `<text class="lbl ${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`; }

// ── i. brainstem cross-sections ────────────────────────────────
function crossSection(id) {
  if (id === 'I') return bulbSection();
  if (id === 'II') return eyeNerveCard();
  if (id === 'VIII') return pmjSection();
  if (id === 'IX' || id === 'X' || id === 'XII') return medullaSection(id);
  if (id === 'XI') return cordSection();
  if (id === 'III') return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="midbrain"><path d="${MID_OUTLINE}" fill="url(#section)" class="xs-out"/></g>
  <g data-tip="sc"><path d="M128,42 C150,30 186,36 200,52 C214,36 250,30 272,42" class="colliculi"/></g>
  <g data-tip="crus" class="xs-crus">
    <path d="M86,210 C110,250 140,268 168,266 C182,262 192,250 198,240 C186,236 170,232 150,222 C126,210 104,196 92,182 Z"/>
    ${mx('<path d="M86,210 C110,250 140,268 168,266 C182,262 192,250 198,240 C186,236 170,232 150,222 C126,210 104,196 92,182 Z"/>')}
  </g>
  <g data-tip="sn" class="xs-sn"><path d="M96,176 C116,198 150,214 186,224 L190,232 C150,224 110,206 90,186 Z"/>${mx('<path d="M96,176 C116,198 150,214 186,224 L190,232 C150,224 110,206 90,186 Z"/>')}</g>
  <g data-tip="rn" class="xs-rn"><circle cx="162" cy="168" r="22"/><circle cx="238" cy="168" r="22"/></g>
  <g data-tip="pag"><ellipse cx="200" cy="92" rx="40" ry="30" fill="url(#grey)"/></g>
  <g data-tip="aqueduct"><ellipse cx="200" cy="88" rx="6" ry="10" class="csf"/></g>
  <g data-tip="mlf" class="xs-mlf"><ellipse cx="184" cy="142" rx="5" ry="3"/><ellipse cx="216" cy="142" rx="5" ry="3"/></g>
  ${fib('M212,132 C224,152 234,172 232,196 C230,216 220,232 211,244', 'GSE', 'III-fasc')}
  ${fib('M214,132 C232,158 248,182 242,206 C238,224 228,238 216,248', 'GSE', 'III-fasc')}
  ${fib('M206,114 C214,136 226,170 222,198 C220,218 214,232 207,244', 'GVE', 'III-gve')}
  ${mx(fib('M212,132 C224,152 234,172 232,196 C230,216 220,232 211,244', 'GSE', 'III-fasc', 'dimmer') + fib('M206,114 C214,136 226,170 222,198 C220,218 214,232 207,244', 'GVE', 'III-gve', 'dimmer'))}
  ${fib('M212,246 C218,264 226,280 238,296', 'GSE', 'III', 'thick')}
  <g class="nucx" data-tip="n-III"><ellipse cx="188" cy="126" rx="12" ry="8" fill="url(#nucGSE)"/><ellipse cx="212" cy="126" rx="12" ry="8" fill="url(#nucGSE)"/></g>
  <g class="nucx" data-tip="n-EW"><circle cx="194" cy="110" r="6" fill="url(#nucGVE)"/><circle cx="206" cy="110" r="6" fill="url(#nucGVE)"/></g>
  ${lesion(246, 228, 'L-weber')}
  ${lesion(258, 160, 'L-benedikt')}
  <g class="labels">
    ${t(200, 22, 'SUPERIOR COLLICULUS')}${t(282, 92, 'PAG', 'start')}${t(286, 168, 'RED N.', 'start')}
    ${t(318, 206, 'SN', 'start')}${t(300, 262, 'CRUS', 'start')}${t(150, 128, 'III', 'end')}${t(176, 104, 'EW', 'end')}
    ${t(170, 150, 'MLF', 'end', 'faint')}${t(250, 296, 'III', 'start')}${t(20, 290, 'DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;

  if (id === 'IV') return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="smv" class="smv"><path d="M140,30 C170,22 230,22 260,30 L256,36 C226,30 174,30 144,36 Z"/></g>
  <g data-tip="midbrain"><path d="${MID_OUTLINE}" fill="url(#section)" class="xs-out"/></g>
  <g data-tip="ic"><path d="M128,42 C150,30 186,36 200,52 C214,36 250,30 272,42" class="colliculi"/></g>
  <g data-tip="crus" class="xs-crus">
    <path d="M86,210 C110,250 140,268 168,266 C182,262 192,250 198,240 C186,236 170,232 150,222 C126,210 104,196 92,182 Z"/>
    ${mx('<path d="M86,210 C110,250 140,268 168,266 C182,262 192,250 198,240 C186,236 170,232 150,222 C126,210 104,196 92,182 Z"/>')}
  </g>
  <g data-tip="sn" class="xs-sn"><path d="M96,176 C116,198 150,214 186,224 L190,232 C150,224 110,206 90,186 Z"/>${mx('<path d="M96,176 C116,198 150,214 186,224 L190,232 C150,224 110,206 90,186 Z"/>')}</g>
  <g data-tip="scpx" class="scpx"><path d="M150,150 C180,165 220,185 250,200 M250,150 C220,165 180,185 150,200"/><circle cx="200" cy="175" r="30"/></g>
  <g data-tip="pag"><ellipse cx="200" cy="92" rx="40" ry="30" fill="url(#grey)"/></g>
  <g data-tip="aqueduct"><ellipse cx="200" cy="88" rx="6" ry="10" class="csf"/></g>
  <g data-tip="mlf" class="xs-mlf"><ellipse cx="188" cy="136" rx="7" ry="4"/><ellipse cx="212" cy="136" rx="7" ry="4"/></g>
  ${fib('M186,124 C160,120 150,95 160,70 C170,48 188,36 200,32 C214,28 240,30 262,26 C280,22 296,20 312,24', 'GSE', 'IV-fasc')}
  ${fib('M312,24 C352,40 374,110 368,170 C364,215 348,250 324,282', 'GSE', 'IV', 'thick')}
  ${mx(fib('M186,124 C160,120 150,95 160,70 C170,48 188,36 200,32 C214,28 240,30 262,26 C280,22 296,20 312,24', 'GSE', 'IV-fasc', 'dimmer') + fib('M312,24 C352,40 374,110 368,170 C364,215 348,250 324,282', 'GSE', 'IV', 'dimmer'))}
  <g class="nucx" data-tip="n-IV"><circle cx="188" cy="123" r="7" fill="url(#nucGSE)"/><circle cx="212" cy="123" r="7" fill="url(#nucGSE)"/></g>
  <g class="xmark"><path d="M194,26 L206,38 M206,26 L194,38"/></g>
  ${lesion(160, 104, 'L-iv-nuc')}
  ${lesion(352, 78, 'L-iv-nerve')}
  <g class="labels">
    ${t(200, 14, 'SUP. MEDULLARY VELUM · CROSSING')}${t(200, 60, 'IC', 'middle', 'faint')}
    ${t(246, 120, 'IV', 'start')}${t(226, 146, 'MLF', 'start', 'faint')}${t(200, 214, 'SCP ✕', 'middle', 'faint')}
    ${t(300, 262, 'CRUS', 'start')}${t(372, 220, 'IV', 'start')}${t(20, 290, 'DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;

  if (id === 'V') {
    let cstV = '', transV = '';
    [[160, 214], [190, 232], [160, 248], [240, 214], [210, 232], [240, 248], [200, 258]].forEach(([x, y]) => {
      for (let i = 0; i < 6; i++) cstV += `<circle cx="${x + (i % 3) * 6 - 6}" cy="${y + Math.floor(i / 3) * 6}" r="1.6"/>`;
    });
    for (let y = 168; y < 290; y += 12) transV += `<path d="M10,${y} Q200,${y + 12} 390,${y}"/>`;
    const out = 'M70,80 C90,58 150,52 176,58 L200,66 L224,58 C250,52 310,58 330,80 C352,100 372,130 394,150 L394,232 C360,240 344,250 330,262 C300,288 250,294 200,294 C150,294 100,288 70,262 C56,250 40,240 6,232 L6,150 C28,130 48,100 70,80 Z';
    const sens = 'M286,132 C320,150 348,180 360,214 C364,226 368,236 376,246';
    const mot = 'M252,140 C290,160 330,190 352,222 C358,232 362,240 368,250';
    return `
<svg viewBox="0 0 400 300" class="xs">
  <clipPath id="ponsVClip"><path d="${out}"/></clipPath>
  <g data-tip="pons"><path d="${out}" fill="url(#section)" class="xs-out"/><g class="trans" clip-path="url(#ponsVClip)">${transV}</g></g>
  <g data-tip="mcpX" class="mcpx"><path d="M330,96 C360,120 380,140 394,150 L394,232 C370,238 352,246 336,258 C350,210 350,150 330,96 Z"/>${mx('<path d="M330,96 C360,120 380,140 394,150 L394,232 C370,238 352,246 336,258 C350,210 350,150 330,96 Z"/>')}</g>
  <g data-tip="v4"><path d="M150,62 C180,54 220,54 250,62 C236,74 220,80 200,82 C180,80 164,74 150,62 Z" class="csf"/></g>
  <g data-tip="scpF" class="xs-scp"><ellipse cx="148" cy="96" rx="17" ry="10"/><ellipse cx="252" cy="96" rx="17" ry="10"/></g>
  <g data-tip="ml" class="xs-ml"><ellipse cx="168" cy="172" rx="30" ry="7"/><ellipse cx="232" cy="172" rx="30" ry="7"/></g>
  <g data-tip="cst" class="cstd">${cstV}</g>
  <g data-tip="mesTract" class="nucx"><circle cx="232" cy="74" r="4" fill="url(#nucGSA)"/><circle cx="168" cy="74" r="4" fill="url(#nucGSA)"/></g>
  <g data-tip="spTract" class="sptract"><circle cx="292" cy="152" r="7"/><circle cx="108" cy="152" r="7"/></g>
  ${fib(sens, 'GSA', 'V-root')}${fib(mot, 'SVE', 'V-motor')}
  ${mx(fib(sens, 'GSA', 'V-root', 'dimmer') + fib(mot, 'SVE', 'V-motor', 'dimmer'))}
  ${fib('M376,246 C384,262 390,276 396,292', 'GSA', 'V-root', 'thick')}
  <g class="nucx" data-tip="n-prinV"><ellipse cx="272" cy="128" rx="16" ry="11" fill="url(#nucGSA)"/><ellipse cx="128" cy="128" rx="16" ry="11" fill="url(#nucGSA)"/></g>
  <g class="nucx" data-tip="n-motV"><ellipse cx="244" cy="134" rx="10" ry="8" fill="url(#nucSVE)"/><ellipse cx="156" cy="134" rx="10" ry="8" fill="url(#nucSVE)"/></g>
  ${lesion(326, 178, 'L-latpons')}
  <g class="labels">
    ${t(200, 46, '4TH V.', 'middle', 'faint')}${t(252, 116, 'SCP', 'middle', 'faint')}${t(300, 122, 'PRINCIPAL V', 'start')}
    ${t(236, 156, 'MOTOR V', 'end')}${t(244, 70, 'MES. V', 'start', 'faint')}${t(304, 160, 'SPINAL TR.', 'start', 'faint')}
    ${t(372, 140, 'MCP', 'end', 'faint')}${t(384, 290, 'V ROOT', 'end')}${t(130, 232, 'CST', 'end', 'faint')}${t(20, 290, 'DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;
  }

  // VI / VII — caudal pons (same level, different nerve lit)
  const isVII = id === 'VII';
  let cst = '';
  [[150, 220], [176, 238], [150, 250], [250, 220], [224, 238], [250, 250], [198, 262], [202, 226]].forEach(([x, y]) => {
    for (let i = 0; i < 6; i++) cst += `<circle cx="${x + (i % 3) * 6 - 6}" cy="${y + Math.floor(i / 3) * 6}" r="1.6"/>`;
  });
  let trans = '';
  for (let y = 176; y < 286; y += 12) trans += `<path d="M50,${y} Q200,${y + 10} 350,${y}"/>`;
  const genu = 'M268,166 C250,140 214,110 207,92 C201,76 212,66 224,68 C238,72 242,86 236,98 C252,130 300,190 348,238';
  return `
<svg viewBox="0 0 400 300" class="xs">
  <clipPath id="ponsXClip"><path d="M60,70 C80,52 140,48 170,56 L200,62 L230,56 C260,48 320,52 340,70 C368,110 372,190 345,240 C315,285 250,292 200,292 C150,292 85,285 55,240 C28,190 32,110 60,70 Z"/></clipPath>
  <g data-tip="pons"><path d="M60,70 C80,52 140,48 170,56 L200,62 L230,56 C260,48 320,52 340,70 C368,110 372,190 345,240 C315,285 250,292 200,292 C150,292 85,285 55,240 C28,190 32,110 60,70 Z" fill="url(#section)" class="xs-out"/>
    <g class="trans" clip-path="url(#ponsXClip)">${trans}</g></g>
  <g data-tip="v4"><path d="M100,58 C140,38 260,38 300,58 C270,62 246,64 232,66 C220,60 210,64 200,70 C190,64 180,60 168,66 C154,64 130,62 100,58 Z" class="csf"/></g>
  <g data-tip="fc" class="fc"><path d="M168,66 C176,58 190,60 196,70 M204,70 C210,60 224,58 232,66"/></g>
  <g data-tip="ml" class="xs-ml"><ellipse cx="166" cy="160" rx="32" ry="7"/><ellipse cx="234" cy="160" rx="32" ry="7"/></g>
  <g data-tip="cst" class="cstd">${cst}</g>
  <g data-tip="mlf" class="xs-mlf"><ellipse cx="192" cy="104" rx="5" ry="3"/><ellipse cx="208" cy="104" rx="5" ry="3"/></g>
  ${fib(genu, 'SVE', 'genu', isVII ? '' : 'ctxfib')}
  ${mx(fib(genu, 'SVE', 'genu', isVII ? 'dimmer' : 'ctxfib'))}
  ${isVII ? fib('M348,238 C358,252 366,266 376,284', 'SVE', 'VII', 'thick') : ''}
  <g class="nucx" data-tip="n-VII"><circle cx="270" cy="168" r="10" fill="url(#nucSVE)"/><circle cx="130" cy="168" r="10" fill="url(#nucSVE)"/></g>
  ${isVII ? '<g class="nucx" data-tip="n-SSN"><circle cx="256" cy="140" r="5" fill="url(#nucGVE)"/><circle cx="144" cy="140" r="5" fill="url(#nucGVE)"/></g>' : ''}
  ${fib('M222,96 C228,130 236,180 238,226 C239,252 237,274 236,300', 'GSE', 'VI-fasc', isVII ? 'ctxfib' : '')}
  ${mx(fib('M222,96 C228,130 236,180 238,226 C239,252 237,274 236,300', 'GSE', 'VI-fasc', 'dimmer'))}
  ${isVII ? '' : fib('M214,88 C204,96 196,100 192,106 C190,80 190,50 188,8', 'GSE', 'inter', 'inter')}
  <g class="nucx" data-tip="n-VI"><circle cx="179" cy="84" r="10" fill="url(#nucGSE)"/><circle cx="221" cy="84" r="10" fill="url(#nucGSE)"/></g>
  ${lesion(248, 86, 'L-foville')}
  ${isVII ? lesion(300, 222, 'L-mg') : lesion(176, 112, 'L-ino') + lesion(262, 238, 'L-raymond')}
  <g class="labels">
    ${t(200, 30, '4TH VENTRICLE', 'middle', 'faint')}${t(150, 86, 'VI', 'end')}${t(98, 168, 'VII', 'end')}
    ${t(168, 112, 'MLF', 'end', 'faint')}${t(110, 150, 'ML', 'end', 'faint')}${t(100, 232, 'CST', 'end', 'faint')}
    ${t(244, 298, 'VI', 'start')}${isVII ? t(286, 136, 'SSN', 'start', 'faint') : t(200, 14, '↑ TO CONTRALATERAL MR', 'middle', 'faint')}${t(354, 254, 'VII', 'start')}
  </g>
</svg>`;
}

// ── ii. cavernous sinus, coronal ───────────────────────────────
function cavernous(id) {
  const side = (lit) => `
    <g data-tip="temporal" class="temporal"><path d="M352,80 C390,84 418,120 418,170 C418,220 394,250 360,250 C350,210 350,130 352,80 Z"/></g>
    <g data-tip="cs" class="sinus">
      <path d="M250,108 C276,96 318,100 334,118 C346,140 348,180 338,202 C320,216 280,216 256,202 C246,176 244,136 250,108 Z" class="venous"/>
      <path d="M250,108 C276,96 318,100 334,118 C346,140 348,180 338,202 C320,216 280,216 256,202 C246,176 244,136 250,108 Z" fill="url(#lattice)"/>
    </g>
    <path class="dura-wall" d="M334,116 C346,140 348,180 340,204"/>
    <g data-tip="ica" class="ica-x"><circle cx="282" cy="152" r="16"/><circle cx="276" cy="150" r="5" class="hi"/></g>
    <g data-tip="symp-plexus"><circle cx="282" cy="152" r="21" class="plexus-ring"/></g>
    <g data-tip="ica" class="ica-x small"><circle cx="268" cy="92" r="10"/></g>
    <g class="xn ${lit === 'VI' ? 'lit' : ''} GSE" data-tip="VI"><circle cx="308" cy="170" r="6.5"/></g>
    <g class="xn ${lit === 'III' ? 'lit' : ''} GSE" data-tip="III"><circle cx="338" cy="126" r="8"/>${lit === 'III' ? '<circle cx="333" cy="121" r="2.6" class="gve-dot"/>' : ''}</g>
    <g class="xn ${lit === 'IV' ? 'lit' : ''} GSE" data-tip="IV"><circle cx="343" cy="145" r="4.5"/></g>
    <g class="xn GSA ${lit === 'V' ? 'lit' : 'ctxn'}" data-tip="V1x"><circle cx="345" cy="167" r="6.5"/></g>
    <g class="xn GSA ${lit === 'V' ? 'lit' : 'ctxn'}" data-tip="V2x"><circle cx="342" cy="193" r="6.5"/></g>`;
  return `
<svg viewBox="0 0 420 300" class="cs-svg">
  <g data-tip="chiasm" class="chiasm-x"><path d="M150,62 C180,72 240,72 270,62 L262,76 C240,82 180,82 158,76 Z"/></g>
  <path class="stalk" d="M206,80 C206,100 208,112 210,122"/>
  <g data-tip="sphenoid">
    <path class="bone" d="M100,198 C140,188 168,194 172,182 C176,214 244,214 248,182 C252,194 280,188 320,198 L332,296 L88,296 Z"/>
    <path d="M100,198 C140,188 168,194 172,182 C176,214 244,214 248,182 C252,194 280,188 320,198 L332,296 L88,296 Z" fill="url(#boneDots)"/>
    <ellipse cx="210" cy="250" rx="66" ry="30" class="air"/>
  </g>
  <g data-tip="pit"><ellipse cx="210" cy="150" rx="36" ry="30" fill="url(#pituitary)" class="pit"/></g>
  <g class="side-l">${mx(side(''), 210)}</g>
  <g class="side-r">${side(id)}</g>
  <g class="labels">
    ${t(210, 50, 'OPTIC CHIASM')}${t(210, 154, 'PITUITARY', 'middle', 'dark')}${t(210, 254, 'SPHENOID SINUS', 'middle', 'faint')}
    ${t(282, 186, 'ICA', 'middle', 'faint')}${t(372, 124, 'III', 'start')}${t(372, 144, 'IV', 'start')}
    ${t(372, 168, 'V1', 'start', 'faint')}${t(372, 196, 'V2', 'start', 'faint')}${t(304, 228, 'VI', 'middle')}
    <path class="lbl-line" d="M347,126 L368,122 M348,145 L368,141 M352,167 L368,165 M349,193 L368,193 M308,177 L305,218"/>
  </g>
</svg>`;
}

// ── iii. superior orbital fissure rosette ──────────────────────
function sofRosette(id) {
  const lit = (k) => (k === id ? 'lit' : '');
  const petal = (x, y, rx, ry, rot, tip, n) =>
    `<g class="petal m-${n} ${n === id ? 'tgt' : ''}" data-tip="${tip}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="url(#musclePlain)"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="url(#striV)"/></g>`;
  return `
<svg viewBox="0 0 420 320" class="sof-svg">
  <g data-tip="bone"><rect x="10" y="10" width="400" height="300" rx="24" class="apex-bone"/><rect x="10" y="10" width="400" height="300" rx="24" fill="url(#boneDots)"/></g>
  ${petal(258, 70, 13, 30, 8, 'LPS', 'III')}
  ${petal(330, 84, 12, 30, 40, 'SO', 'IV')}
  ${petal(248, 96, 30, 15, 0, 'SR', 'III')}
  ${petal(336, 182, 14, 32, -10, 'MR', 'III')}
  ${petal(236, 252, 32, 14, -8, 'IR', 'III')}
  ${petal(152, 230, 14, 28, 30, 'LR', 'VI')}
  ${petal(170, 120, 12, 24, -40, 'LR', 'VI')}
  <g data-tip="sof"><path class="portal" d="M66,66 C100,66 160,104 222,150 C244,166 254,192 240,214 C228,234 200,232 184,216 C158,188 118,140 78,94 C64,84 58,70 66,66 Z"/></g>
  <g data-tip="optic-canal"><circle cx="278" cy="140" r="30" class="portal"/></g>
  <g data-tip="optic-n" class="cn2"><circle cx="278" cy="137" r="19"/></g>
  <g data-tip="oa" class="ica-x small"><circle cx="292" cy="156" r="5"/></g>
  <g data-tip="annulus" class="annulus"><ellipse cx="246" cy="174" rx="88" ry="62" transform="rotate(-24 246 174)"/></g>
  <g class="xn GSA ctxn" data-tip="lacrimal"><circle cx="94" cy="84" r="4.5"/></g>
  <g class="xn GSA ctxn" data-tip="frontal"><circle cx="118" cy="100" r="6"/></g>
  <g class="xn GSE ${lit('IV')}" data-tip="IV"><circle cx="146" cy="118" r="4.6"/></g>
  <g data-tip="sov" class="vein"><ellipse cx="128" cy="126" rx="7" ry="5"/></g>
  <g class="xn GSE ${lit('III')}" data-tip="III-sup"><circle cx="216" cy="166" r="7.5"/></g>
  <g class="xn GSA ctxn" data-tip="nasocil"><circle cx="200" cy="184" r="5"/></g>
  <g class="xn GSE ${lit('VI')}" data-tip="VI"><circle cx="186" cy="204" r="6"/></g>
  <g class="xn GSE ${lit('III')}" data-tip="III-inf"><circle cx="218" cy="206" r="7.5"/>${id === 'III' ? '<circle cx="223" cy="210" r="2.6" class="gve-dot"/>' : ''}</g>
  <g data-tip="iov" class="vein"><ellipse cx="270" cy="250" rx="6" ry="4.5"/></g>
  <g class="labels">
    ${t(278, 141, 'II', 'middle', 'dark')}${t(52, 54, 'LATERAL', 'start', 'faint')}${t(380, 54, 'MEDIAL', 'end', 'faint')}
    ${t(248, 100, 'SR', 'middle', 'onm')}${t(258, 58, 'LPS', 'middle', 'onm')}${t(334, 82, 'SO', 'middle', 'onm')}
    ${t(336, 186, 'MR', 'middle', 'onm')}${t(236, 256, 'IR', 'middle', 'onm')}${t(152, 236, 'LR', 'middle', 'onm')}
    ${t(146, 106, 'IV', 'middle')}${t(234, 170, 'III', 'start')}${t(236, 211, 'III', 'start')}${t(176, 214, 'VI', 'end')}
    ${t(140, 296, 'ABOVE RING → IV · FRONTAL · LACRIMAL · SOV', 'start', 'faint')}
  </g>
</svg>`;
}

// ── v. signatures ──────────────────────────────────────────────
function signature(id) {
  if (id === 'I') return olfSignature();
  if (id === 'II') return pupilSignature();
  if (id === 'VIII') return vorSignature();
  if (['IX', 'X', 'XI', 'XII'].includes(id)) return neckSignature(id);
  if (id === 'III') {
    let dil = '';
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      dil += `<path d="M${(392 + Math.cos(a) * 21).toFixed(1)},${(84 + Math.sin(a) * 21).toFixed(1)} L${(392 + Math.cos(a) * 40).toFixed(1)},${(84 + Math.sin(a) * 40).toFixed(1)}"/>`;
    }
    return `
<div class="sig-row">
<svg viewBox="0 0 470 250" class="sig-svg" id="ciliarySvg">
  ${fib('M40,240 C110,226 170,186 202,140', 'SYM', 'symp-root', 'ctxfib')}
  ${fib('M218,112 C260,66 320,48 360,58', 'SYM', 'symp-root', 'ctxfib')}
  ${fib('M206,6 C208,50 210,90 210,108', 'GSA', 'sens-root', 'ctxfib')}
  ${fib('M214,138 C250,190 300,222 350,240', 'GSA', 'sens-root', 'ctxfib')}
  ${fib('M58,124 C110,124 150,126 194,124', 'GVE', 'pre-gve', 'pre')}
  ${fib('M226,118 C262,100 300,86 348,84', 'GVE', 'short-ciliary', 'post p-sph')}
  ${fib('M226,130 C262,154 300,178 346,190', 'GVE', 'short-ciliary', 'post p-cil')}
  <g data-tip="n-EW" class="nucx"><circle cx="44" cy="124" r="16" fill="url(#nucGVE)"/></g>
  <g data-tip="cg" class="cg-big"><path class="ganglion" d="M210,104 C226,108 232,118 228,128 C224,140 212,146 200,142 C188,136 188,116 196,108 C200,104 204,103 210,104 Z"/><circle cx="210" cy="124" r="26" class="syn-ring"/></g>
  <g class="iris-front">
    <g data-tip="dilator" class="dil">${dil}</g>
    <circle cx="392" cy="84" r="42" fill="url(#iris)" opacity=".85"/>
    <g data-tip="dilator" class="dil top">${dil}</g>
    <circle data-tip="sphincter" cx="392" cy="84" r="18" class="sph"/>
    <circle cx="392" cy="84" r="12" class="pupil" id="sigPupil"/>
    <circle cx="384" cy="76" r="3.5" fill="#fff" opacity=".7"/>
  </g>
  <g class="lens-side">
    <g data-tip="ciliary" class="cil"><path d="M380,150 L404,150 L392,166 Z"/><path d="M380,232 L404,232 L392,216 Z"/></g>
    <path class="zon" d="M392,166 L392,174 M392,216 L392,208"/>
    <ellipse data-tip="lens" id="sigLens" cx="392" cy="191" rx="9" ry="20" fill="url(#lensG)" class="lens"/>
  </g>
  <g class="labels">
    ${t(20, 154, 'EDINGER–WESTPHAL', 'start')}${t(210, 168, 'CILIARY GANGLION')}${t(210, 182, 'synapse', 'middle', 'faint')}
    ${t(120, 114, 'PRE', 'middle', 'faint')}${t(288, 80, 'SHORT CILIARY', 'middle', 'faint')}
    ${t(440, 84, 'IRIS', 'start')}${t(424, 196, 'CILIARY M.', 'start')}${t(424, 210, '+ LENS', 'start', 'faint')}
    ${t(216, 16, 'NASOCILIARY', 'start', 'faint')}${t(46, 232, 'SYMPATHETIC', 'start', 'faint')}
  </g>
</svg>
<div class="sig-ctrl">
  <button class="pill ck" data-reflex="light"><span>☀</span>Light</button>
  <button class="pill ck" data-reflex="near"><span>◎</span>Near</button>
</div>
</div>`;
  }

  if (id === 'IV') return `
<div class="sig-row">
<svg viewBox="0 0 470 250" class="sig-svg">
  <g data-tip="midbrain"><path d="M150,30 C190,10 280,10 320,30 C330,80 318,130 300,160 C300,200 290,236 272,250 L198,250 C180,236 170,200 170,160 C152,130 140,80 150,30 Z" fill="url(#tissue)" class="xs-out"/></g>
  <g data-tip="pineal"><ellipse cx="235" cy="40" rx="8" ry="11" class="pineal"/></g>
  <g data-tip="sc" class="coll"><circle cx="210" cy="78" r="19"/><circle cx="260" cy="78" r="19"/></g>
  <g data-tip="ic" class="coll"><circle cx="213" cy="122" r="14"/><circle cx="257" cy="122" r="14"/></g>
  <g data-tip="scp" class="scp"><path d="M196,150 C186,180 176,210 168,246 M274,150 C284,180 294,210 302,246"/></g>
  <g data-tip="smv" class="smv"><path d="M200,146 C215,152 255,152 270,146 L262,176 C248,180 222,180 208,176 Z"/></g>
  <g data-tip="v4"><path d="M210,182 C225,186 245,186 260,182 L276,246 L194,246 Z" class="csf"/></g>
  <g class="nucx" data-tip="n-IV"><circle cx="224" cy="112" r="6" fill="url(#nucGSE)" class="ghost"/><circle cx="246" cy="112" r="6" fill="url(#nucGSE)" class="ghost"/></g>
  ${fib('M224,112 C220,132 226,150 235,158 C246,166 260,166 272,164', 'GSE', 'IV-fasc', 'intra')}
  ${fib('M246,112 C250,132 244,150 235,158 C224,166 210,166 198,164', 'GSE', 'IV-fasc', 'intra dimmer')}
  ${fib('M272,164 C310,168 348,150 368,118 C384,92 388,60 376,30', 'GSE', 'IV')}
  ${fib('M198,164 C160,168 122,150 102,118 C86,92 82,60 94,30', 'GSE', 'IV', 'dimmer')}
  <g class="xmark pulse"><path d="M229,152 L241,164 M241,152 L229,164"/></g>
  <g class="labels">
    ${t(235, 24, 'PINEAL', 'middle', 'faint')}${t(210, 82, 'SC', 'middle', 'dark')}${t(213, 126, 'IC', 'middle', 'dark')}
    ${t(236, 214, '4TH V.', 'middle', 'dark')}${t(392, 40, 'IV', 'start')}${t(386, 140, 'wraps the crus →', 'start', 'faint')}
    ${t(300, 168, 'VELUM ✕', 'start', 'faint')}${t(20, 20, 'DORSAL VIEW', 'start', 'faint')}
  </g>
</svg>
</div>`;

  if (id === 'V') {
    const bands = [['oralis', 138, 166, 'sb-oralis'], ['interp', 166, 202, 'sb-interp'], ['caudal', 202, 246, 'sb-caudal']];
    const rings = [['caudal', 96], ['interp', 52], ['oralis', 26]];
    return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="trigSvg">
  <clipPath id="faceRingClip"><ellipse cx="398" cy="134" rx="62" ry="86"/></clipPath>
  <g data-tip="pons"><path d="M84,12 C104,6 146,6 166,12 L172,96 C186,108 188,128 176,138 L166,252 L94,252 L84,138 C72,128 74,108 88,96 Z" fill="url(#tissue)" class="xs-out" opacity=".5"/></g>
  <path class="lvl" d="M66,96 L184,96 M66,138 L184,138 M66,214 L184,214"/>
  <g data-tip="n-mesV" class="nucx"><rect x="116" y="20" width="8" height="74" rx="4" fill="url(#nucGSA)"/></g>
  <g data-tip="n-prinV" class="nucx"><ellipse cx="120" cy="117" rx="10" ry="15" fill="url(#nucGSA)"/></g>
  <g data-tip="n-motV" class="nucx"><ellipse cx="148" cy="118" rx="7" ry="10" fill="url(#nucSVE)"/></g>
  ${bands.map(([k, y0, y1, tip]) => `<g class="band b-${k}" data-band="${k}" data-tip="${tip}"><rect x="114" y="${y0}" width="12" height="${y1 - y0 - 2}" rx="5"/></g>`).join('')}
  <path class="jj" data-tip="jawjerk" d="M126,44 C162,52 168,92 152,106" marker-end="url(#arrowW)"/>
  <g clip-path="url(#faceRingClip)">
    <ellipse cx="398" cy="134" rx="62" ry="86" fill="url(#faceFront)" opacity=".45"/>
    ${rings.map(([k, r]) => `<g class="ring b-${k}" data-band="${k}" data-tip="sb-${k === 'interp' ? 'interp' : k}"><circle cx="398" cy="156" r="${r}"/></g>`).join('')}
  </g>
  <ellipse cx="398" cy="134" rx="62" ry="86" class="face-edge"/>
  <g class="face-lines"><path d="M376,114 h12 M408,114 h12 M398,120 C394,134 390,142 398,146 M384,166 C392,172 404,172 412,166"/></g>
  <g class="labels">
    ${t(62, 58, 'MIDBRAIN', 'end', 'faint')}${t(62, 120, 'PONS', 'end', 'faint')}${t(62, 178, 'MEDULLA', 'end', 'faint')}${t(62, 236, 'C1–C2', 'end', 'faint')}
    ${t(196, 58, 'PROPRIOCEPTION', 'start')}${t(196, 70, 'mesencephalic', 'start', 'faint')}
    ${t(196, 112, 'TOUCH', 'start')}${t(196, 124, 'principal · motor', 'start', 'faint')}
    ${t(196, 196, 'PAIN · TEMP', 'start')}${t(196, 208, 'spinal · 3 subnuclei', 'start', 'faint')}
    ${t(398, 238, 'ONION-SKIN MAP', 'middle', 'faint')}
  </g>
</svg>
</div>`;
  }

  if (id === 'VII') return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="glandSvg">
  <g class="route r-cry r-saliva">${fib('M58,104 C90,116 120,132 142,146', 'GVE', 'NI')}</g>
  <g class="route r-cry">
    ${fib('M156,140 C190,110 230,82 258,72', 'GVE', 'GSPN')}
    ${fib('M282,66 C320,54 360,44 388,40', 'GVE', 'post-lacrimal', 'post')}
    ${fib('M282,74 C320,84 360,96 386,100', 'GVE', 'post-nasal', 'post')}
  </g>
  <g class="route r-saliva">
    ${fib('M160,158 C200,178 230,188 258,190', 'GVE', 'chorda')}
    ${fib('M282,188 C320,184 360,182 386,180', 'GVE', 'post-smg', 'post')}
    ${fib('M282,194 C320,206 360,222 386,228', 'GVE', 'post-sl', 'post')}
  </g>
  <g class="route r-taste">
    ${fib('M162,152 C220,158 320,148 386,142', 'SVA', 'chorda')}
    ${fib('M58,198 C90,186 120,170 140,158', 'SVA', 'taste-in')}
  </g>
  <g class="nucx" data-tip="n-SSN"><circle cx="44" cy="104" r="14" fill="url(#nucGVE)"/></g>
  <g class="nucx" data-tip="n-NTS"><circle cx="44" cy="198" r="14" fill="url(#nucSVA)"/></g>
  <g data-tip="geniculate"><path class="tg" d="M150,138 C160,138 166,146 164,154 C162,162 152,166 144,162 C138,158 138,144 144,140 C146,138 148,138 150,138 Z"/></g>
  <g data-tip="ppg"><path class="ganglion" d="M270,58 C280,60 284,68 282,76 C280,84 270,88 262,84 C256,80 256,66 262,61 C265,59 267,58 270,58 Z"/></g>
  <g data-tip="smg"><path class="ganglion" d="M270,178 C280,180 284,188 282,196 C280,204 270,208 262,204 C256,200 256,186 262,181 C265,179 267,178 270,178 Z"/></g>
  ${gland('lacrimalG', 'M392,30 C398,20 416,18 424,28 C430,40 418,50 404,48 C394,46 388,40 392,30 Z', 'VII')}
  <g class="gland g-VII" data-tip="nasalG">${[[394, 96], [404, 104], [392, 108], [406, 94], [414, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="url(#gland)"/>`).join('')}</g>
  <g data-tip="tongue" class="tongue"><path d="M388,132 C410,124 440,126 452,136 C446,150 420,156 396,154 C386,152 382,142 388,132 Z"/><path class="ant" d="M410,128 C430,126 446,130 452,136 C446,150 430,154 410,155 Z"/></g>
  ${gland('submand', 'M390,172 C400,162 424,162 432,174 C438,188 422,196 406,194 C394,192 386,184 390,172 Z', 'VII')}
  ${gland('sublingual', 'M390,228 a22,8 0 1,0 44,0 a22,8 0 1,0 -44,0 Z', 'VII')}
  <g class="labels">
    ${t(44, 82, 'SUP. SALIVATORY', 'middle')}${t(44, 226, 'SOLITARY N.', 'middle')}${t(152, 182, 'GENICULATE', 'middle', 'faint')}
    ${t(270, 102, 'PPG', 'middle')}${t(270, 222, 'SMG', 'middle')}${t(206, 98, 'GSPN', 'middle', 'faint')}${t(206, 200, 'CHORDA', 'middle', 'faint')}
    ${t(440, 52, 'LACRIMAL', 'start', 'faint')}${t(424, 118, 'NASAL', 'start', 'faint')}${t(458, 142, 'TASTE', 'end', 'faint')}
    ${t(440, 186, 'SUBMAND.', 'start', 'faint')}${t(440, 246, 'SUBLING.', 'start', 'faint')}
  </g>
</svg>
<div class="sig-ctrl">
  <button class="pill ck" data-route="cry"><span>◖</span>Tears</button>
  <button class="pill ck" data-route="saliva"><span>≈</span>Saliva</button>
  <button class="pill ck" data-route="taste"><span>◇</span>Taste</button>
</div>
</div>`;

  // VI — sagittal clivus
  return `
<div class="sig-row">
<svg viewBox="0 0 470 250" class="sig-svg" id="clivusSvg">
  <g class="icp-arrows" id="icpArrows">${[110, 160, 210].map(x => `<path d="M${x},6 L${x},34" marker-end="url(#arrowR)"/>`).join('')}</g>
  <g data-tip="clivus"><path class="bone" d="M336,40 L358,48 C338,112 268,192 206,244 L174,240 C236,182 306,110 336,40 Z"/><path d="M336,40 L358,48 C338,112 268,192 206,244 L174,240 C236,182 306,110 336,40 Z" fill="url(#boneDots)"/></g>
  <g data-tip="petrous"><path class="bone faintbone" d="M300,104 C318,90 344,92 352,104 C344,118 318,122 300,118 Z"/></g>
  <path class="lig" data-tip="gruber" d="M296,96 C312,74 340,74 356,90"/>
  <g data-tip="cs" class="sinus"><path d="M360,60 C400,54 450,60 462,80 C470,100 454,124 420,126 C390,128 364,118 358,100 Z" class="venous"/><path d="M360,60 C400,54 450,60 462,80 C470,100 454,124 420,126 C390,128 364,118 358,100 Z" fill="url(#lattice)"/></g>
  <g id="sagStem" class="sag-stem">
    <g data-tip="pons"><path d="M120,40 C200,30 262,70 262,122 C262,162 232,178 210,186 L190,250 L120,250 L130,186 C96,160 86,62 120,40 Z" fill="url(#tissue)" class="xs-out"/></g>
    <path class="sulcus" d="M150,186 L240,182"/>
    <g class="nucx" data-tip="n-VI"><circle cx="170" cy="150" r="8" fill="url(#nucGSE)"/></g>
  </g>
  ${fib('M170,150 C190,160 205,170 220,184', 'GSE', 'VI-fasc', 'intra')}
  <g class="seg GSE" data-tip="VI" id="sagVI"><path class="halo"/><path class="base"/><path class="flow"/><path class="hit"/></g>
  <g class="labels">
    ${t(150, 110, 'PONS', 'middle', 'dark')}${t(232, 220, 'CLIVUS', 'start', 'faint')}${t(326, 70, "GRUBER'S", 'middle', 'faint')}
    ${t(412, 96, 'SINUS', 'middle')}${t(20, 244, 'SAGITTAL · FRONT →', 'start', 'faint')}
  </g>
</svg>
<div class="sig-ctrl">
  <button class="pill ck" data-icp="1"><span>⇣</span>Raise ICP</button>
</div>
</div>`;
}

// ── ii (VII). internal acoustic meatus, fundus ─────────────────
function iam(id) {
  const lit = id === 'VII' ? 'lit' : '';
  const v8 = (cls) => (id === 'VIII' ? `lit ${cls}` : 'ctxn');
  return `
<svg viewBox="0 0 420 300" class="iam-svg">
  <g data-tip="petrous"><rect x="20" y="10" width="380" height="280" rx="24" class="apex-bone"/><rect x="20" y="10" width="380" height="280" rx="24" fill="url(#boneDots)"/></g>
  <g data-tip="iam"><circle cx="210" cy="150" r="116" class="portal"/></g>
  <g data-tip="crest" class="crest"><path d="M98,150 L322,150"/></g>
  <g data-tip="billbar" class="crest"><path d="M210,44 L210,150"/></g>
  <g data-tip="aicaLoop" class="artery"><path class="a-base" stroke-width="5" d="M118,250 C150,232 186,242 206,228 C236,208 278,238 302,252"/></g>
  <g class="xn SSA ${v8('vestx')}" data-tip="iam-sv"><circle cx="154" cy="98" r="25"/></g>
  <g class="xn SSA ${v8('cochx')}" data-tip="iam-coch"><circle cx="266" cy="204" r="32"/></g>
  <g class="xn SSA ${v8('vestx')}" data-tip="iam-iv"><circle cx="154" cy="204" r="24"/></g>
  <g class="xn SVE ${lit || (id === 'VIII' ? 'ctxn' : '')}" data-tip="iam-vii"><circle cx="266" cy="98" r="28"/></g>
  <g class="xn NIx ${lit || (id === 'VIII' ? 'ctxn' : '')}" data-tip="iam-ni"><circle cx="238" cy="132" r="9"/></g>
  ${id === 'VIII' ? lesion(118, 236, 'L-schwann') : ''}
  <g class="labels">
    ${t(266, 102, 'VII', 'middle', 'onm')}${t(154, 102, 'SUP. VEST.', 'middle')}${t(266, 208, 'COCHLEAR', 'middle')}
    ${t(154, 208, 'INF. VEST.', 'middle')}${t(252, 128, 'NI', 'start')}
    ${t(388, 30, 'ANTERIOR →', 'end', 'faint')}${t(32, 30, 'SUPERIOR ↑', 'start', 'faint')}
    ${t(210, 284, 'SEVEN UP · COKE DOWN', 'middle')}
  </g>
</svg>`;
}

// ── iii (V, VII). skull base foramina, right middle fossa from above ──
function skullFloor(id) {
  const V = id === 'V', VII = id === 'VII';
  const fp = (tip, shape, on) => `<g class="fp ${on ? 'lit' : ''}" data-tip="${tip}">${shape}</g>`;
  const floor = 'M24,48 L200,30 C262,30 340,62 398,112 C410,170 388,232 346,252 L140,262 C80,252 36,210 24,168 Z';
  return `
<svg viewBox="0 0 420 320" class="skull-svg">
  <g data-tip="bone"><path class="bone floor" d="${floor}"/><path d="${floor}" fill="url(#boneDots)"/></g>
  <path class="pfossa" data-tip="petrous" d="M120,262 C200,240 290,196 398,132 L410,170 L410,312 L120,312 Z"/>
  <path class="ridge" d="M120,262 C200,240 290,196 398,132"/>
  <path class="ridge" d="M30,58 C120,40 220,36 300,60"/>
  <g data-tip="pit"><ellipse cx="48" cy="128" rx="20" ry="17" class="sella"/></g>
  ${fp('optic-canal', '<circle cx="66" cy="70" r="7" class="portal"/>', false)}
  ${fp('sof', '<path class="portal" d="M96,80 C130,84 170,80 214,66 L210,78 C170,92 130,96 100,94 Z"/>', V)}
  ${fp('rotundum', '<circle cx="116" cy="122" r="7" class="portal"/>', V)}
  ${fp('ovale', '<ellipse cx="166" cy="164" rx="8" ry="12" transform="rotate(20 166 164)" class="portal"/>', V)}
  ${fp('spinosum', '<circle cx="192" cy="184" r="4.5" class="portal"/>', false)}
  ${fp('lacerum', '<ellipse cx="98" cy="196" rx="12" ry="9" class="portal"/>', VII)}
  ${fp('hiatus', '<path class="portal" d="M222,206 L244,198 L247,205 L225,213 Z"/>', VII)}
  ${fp('iam', '<ellipse cx="250" cy="272" rx="13" ry="10" class="portal"/>', VII)}
  <g data-tip="tg" class="tgx ${V ? 'on' : ''}"><path class="tg" d="M130,218 C140,204 170,202 180,214 C186,228 176,242 158,244 C142,244 130,234 130,218 Z"/></g>
  ${V ? fib('M146,208 C140,160 140,120 150,90', 'GSA', 'V1') + fib('M140,212 C126,180 118,150 116,128', 'GSA', 'V2') + fib('M160,206 C164,192 166,182 166,176', 'GSA', 'V3') : ''}
  ${VII ? fib('M226,210 C190,212 140,206 108,198', 'GVE', 'GSPN') : ''}
  <g class="labels">
    ${t(66, 58, 'OPTIC', 'middle', 'faint')}${t(220, 62, 'SOF', 'start')}${t(102, 118, 'ROTUNDUM', 'end')}
    ${t(178, 156, 'OVALE', 'start')}${t(200, 188, 'SPINOSUM', 'start', 'faint')}${t(84, 212, 'LACERUM', 'end')}
    ${t(252, 196, 'GSPN HIATUS', 'start')}${t(268, 276, 'IAM', 'start')}${t(48, 154, 'SELLA', 'middle', 'faint')}
    ${t(155, 256, 'TRIGEMINAL G.', 'middle', 'faint')}${t(330, 160, 'PETROUS RIDGE', 'middle', 'faint')}
    ${t(330, 300, 'POSTERIOR FOSSA', 'middle', 'faint')}${t(24, 300, '← MIDLINE', 'start', 'faint')}
  </g>
</svg>`;
}

// ── i (IX X XII). rostral medulla at the olive ─────────────────
function medullaSection(id) {
  const on9 = id === 'IX' || id === 'X', on12 = id === 'XII';
  const dim = (on) => (on ? '' : 'dimmer');
  const out = 'M70,80 C90,60 150,50 200,62 C250,50 310,60 330,80 C356,110 362,170 344,210 C330,240 300,268 260,282 C240,288 216,290 200,288 C184,290 160,288 140,282 C100,268 70,240 56,210 C38,170 44,110 70,80 Z';
  const olive = 'M234,206 C246,194 270,196 276,212 C282,230 270,246 252,246 C238,246 230,236 236,226 C240,218 252,216 258,224';
  const xii = 'M214,106 C218,150 224,210 232,288';
  const sve = 'M272,176 C282,198 294,226 304,252 L316,270', gve = 'M236,108 C262,142 286,192 300,246 L310,266', gva = 'M256,118 C276,152 292,198 306,248 L320,264';
  return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="medulla"><path d="${out}" fill="url(#section)" class="xs-out"/></g>
  <g data-tip="v4"><path d="M110,72 C150,58 250,58 290,72 C260,80 232,84 200,86 C168,84 140,80 110,72 Z" class="csf"/></g>
  <g data-tip="icp" class="xs-scp"><ellipse cx="84" cy="122" rx="16" ry="20"/><ellipse cx="316" cy="122" rx="16" ry="20"/></g>
  <g data-tip="spTract" class="sptract"><ellipse cx="98" cy="164" rx="12" ry="18"/><ellipse cx="302" cy="164" rx="12" ry="18"/></g>
  <g data-tip="spinoth" class="xs-ml"><ellipse cx="100" cy="214" rx="14" ry="8"/><ellipse cx="300" cy="214" rx="14" ry="8"/></g>
  <g data-tip="ml" class="xs-ml"><ellipse cx="190" cy="196" rx="7" ry="32"/><ellipse cx="210" cy="196" rx="7" ry="32"/></g>
  <g data-tip="pyramid" class="pyrx"><ellipse cx="180" cy="262" rx="20" ry="15"/><ellipse cx="220" cy="262" rx="20" ry="15"/></g>
  <g data-tip="olive" class="olivex"><path d="${olive}"/>${mx(`<path d="${olive}"/>`)}</g>
  ${fib(xii, 'GSE', 'XII-intra', dim(on12))}${mx(fib(xii, 'GSE', 'XII-intra', 'dimmer'))}
  ${fib(sve, 'SVE', 'n-amb', dim(on9))}${fib(gve, 'GVE', 'n-DMN', dim(on9))}${fib(gva, 'GVA', 'solTract', dim(on9))}
  ${mx(fib(sve, 'SVE', 'n-amb', 'dimmer') + fib(gve, 'GVE', 'n-DMN', 'dimmer'))}
  <g class="nucx" data-tip="n-XII"><ellipse cx="186" cy="98" rx="10" ry="7" fill="url(#nucGSE)"/><ellipse cx="214" cy="98" rx="10" ry="7" fill="url(#nucGSE)"/></g>
  <g class="nucx" data-tip="n-DMN"><ellipse cx="166" cy="104" rx="9" ry="6" fill="url(#nucGVE)"/><ellipse cx="234" cy="104" rx="9" ry="6" fill="url(#nucGVE)"/></g>
  <g class="nucx" data-tip="solTract"><circle cx="146" cy="116" r="10" fill="url(#nucGVA)"/><circle cx="254" cy="116" r="10" fill="url(#nucGVA)"/></g>
  <g class="nucx" data-tip="n-amb"><circle cx="130" cy="176" r="7" fill="url(#nucSVE)"/><circle cx="270" cy="176" r="7" fill="url(#nucSVE)"/></g>
  <g class="nucx" data-tip="n-spV"><circle cx="108" cy="164" r="6" fill="url(#nucGSA)"/><circle cx="292" cy="164" r="6" fill="url(#nucGSA)"/></g>
  ${lesion(216, 210, 'L-dejerine')}
  ${lesion(288, 192, 'L-wallenberg')}
  <g class="labels">
    ${t(200, 50, '4TH V.', 'middle', 'faint')}${t(200, 122, 'XII', 'middle')}${t(234, 92, 'DMN', 'start', 'faint')}
    ${t(266, 120, 'NTS', 'start', 'faint')}${t(258, 168, 'AMBIGUUS', 'end', 'faint')}${t(330, 160, 'SP. V', 'start', 'faint')}
    ${t(336, 124, 'ICP', 'start', 'faint')}${t(268, 236, 'OLIVE', 'end', 'faint')}${t(200, 284, 'PYRAMIDS', 'middle', 'dark')}
    ${t(238, 298, 'XII', 'start')}${t(326, 276, 'IX · X', 'start')}${t(20, 290, 'DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;
}

// ── i (XI). upper cervical cord ────────────────────────────────
function cordSection() {
  const fly = 'M200,92 C188,92 182,102 172,114 C152,102 122,82 114,92 C108,106 142,122 152,140 C132,152 112,172 118,198 C124,216 152,212 170,198 C180,208 192,214 200,214 C208,214 220,208 230,198 C248,212 276,216 282,198 C288,172 268,152 248,140 C258,122 292,106 286,92 C278,82 248,102 228,114 C218,102 212,92 200,92 Z';
  return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="medulla"><ellipse cx="200" cy="154" rx="150" ry="106" fill="url(#section)" class="xs-out"/></g>
  <g data-tip="ventralHorn"><path d="${fly}" class="greym"/></g>
  <circle cx="200" cy="154" r="4" class="csf"/>
  ${fib('M242,98 C280,74 312,62 344,52', 'GSA', 'dorsalRoot', 'ctxfib')}${fib('M238,206 C272,230 302,246 332,256', 'GSE', 'ventralRoot', 'ctxfib')}
  ${fib('M268,174 C300,162 330,154 352,150', 'SVE', 'XI-root')}
  ${fib('M352,150 C362,122 366,92 366,58', 'SVE', 'XI', 'thick')}
  ${mx(fib('M268,174 C300,162 330,154 352,150', 'SVE', 'XI-root', 'dimmer'))}
  <g class="nucx" data-tip="n-acc"><circle cx="262" cy="178" r="10" fill="url(#nucSVE)"/><circle cx="138" cy="178" r="10" fill="url(#nucSVE)"/></g>
  <path d="M366,70 L366,50 M360,58 L366,48 L372,58" class="up-arrow"/>
  <g class="labels">
    ${t(150, 84, 'DORSAL HORN', 'end', 'faint')}${t(150, 232, 'VENTRAL HORN', 'end', 'faint')}${t(262, 202, 'ACCESSORY N.', 'middle')}
    ${t(320, 140, 'XI ROOTLETS', 'middle', 'faint')}${t(374, 40, '↑ FORAMEN MAGNUM', 'end')}${t(344, 44, 'DORSAL ROOT', 'end', 'faint')}
    ${t(336, 272, 'VENTRAL ROOT', 'end', 'faint')}${t(20, 290, 'C2 · DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;
}

// ── ii (IX–XII). jugular foramen + hypoglossal canal ───────────
function jugularCard(id) {
  const st = (n) => (n === id ? 'lit' : '');
  return `
<svg viewBox="0 0 420 300" class="jf-svg">
  <g data-tip="bone"><rect x="20" y="10" width="380" height="280" rx="24" class="apex-bone"/><rect x="20" y="10" width="380" height="280" rx="24" fill="url(#boneDots)"/></g>
  <g data-tip="parsN"><ellipse cx="150" cy="120" rx="36" ry="30" class="portal"/></g>
  <g data-tip="parsV"><ellipse cx="256" cy="140" rx="64" ry="50" class="portal"/></g>
  <path data-tip="jspine" class="jspine big" d="M190,98 L198,162"/>
  <g data-tip="ips" class="vein"><ellipse cx="134" cy="134" rx="9" ry="7"/></g>
  <g data-tip="sigmoid" class="vein big"><ellipse cx="270" cy="166" rx="32" ry="22"/></g>
  <g class="xn SVE ${st('IX')}" data-tip="IX"><circle cx="162" cy="112" r="10"/></g>
  <g class="xn SVE ${st('X')}" data-tip="X"><circle cx="238" cy="118" r="14"/></g>
  <g class="xn SVE ${st('XI')}" data-tip="XI"><circle cx="276" cy="108" r="10"/></g>
  <g data-tip="hgc"><circle cx="180" cy="238" r="24" class="portal"/></g>
  <g class="xn GSE ${st('XII')}" data-tip="XII"><circle cx="180" cy="238" r="10"/></g>
  ${lesion(206, 52, 'L-vernet')}
  ${lesion(130, 196, 'L-collet')}
  <g class="labels">
    ${t(150, 78, 'PARS NERVOSA', 'middle')}${t(300, 82, 'PARS VASCULARIS', 'middle')}
    ${t(162, 116, 'IX', 'middle', 'onm')}${t(238, 122, 'X', 'middle', 'onm')}${t(276, 112, 'XI', 'middle', 'onm')}
    ${t(134, 152, 'IPS', 'middle', 'faint')}${t(270, 206, 'SIGMOID → IJV', 'middle', 'faint')}
    ${t(180, 242, 'XII', 'middle', 'onm')}${t(214, 246, 'HYPOGLOSSAL CANAL', 'start')}
    ${t(388, 284, 'FROM INSIDE THE SKULL', 'end', 'faint')}
  </g>
</svg>`;
}

// ── iii (IX–XII). posterior cranial fossa from above ───────────
function posteriorFossa(id) {
  const fp = (tip, shape, on) => `<g class="fp ${on ? 'lit' : ''}" data-tip="${tip}">${shape}</g>`;
  const fossa = 'M24,30 L250,30 C330,40 392,90 400,160 C404,230 360,292 280,304 L24,304 Z';
  const jf = id === 'IX' || id === 'X' || id === 'XI';
  return `
<svg viewBox="0 0 420 320" class="skull-svg">
  <g data-tip="bone"><path class="bone floor" d="${fossa}"/><path d="${fossa}" fill="url(#boneDots)"/></g>
  <ellipse data-tip="cerebFossa" class="pfossa" cx="268" cy="236" rx="120" ry="60"/>
  <path data-tip="clivusPF" class="bone clivusx" d="M30,36 L92,36 L100,184 L30,184 Z"/>
  <path class="ridge" d="M92,40 C180,60 280,80 392,120"/>
  <path data-tip="sigGroove" class="sigsin" d="M396,236 C340,240 300,220 272,196 C246,174 220,160 196,166"/>
  ${fp('iam', '<ellipse cx="212" cy="104" rx="12" ry="9" class="portal"/>', false)}
  ${fp('jf', '<ellipse cx="180" cy="170" rx="17" ry="11" transform="rotate(-20 180 170)" class="portal"/>', jf)}
  ${fp('hgc', '<circle cx="128" cy="208" r="7" class="portal"/>', id === 'XII')}
  ${fp('fmag', '<path class="portal" d="M30,192 C84,192 116,226 116,252 C116,282 84,306 30,306 Z"/>', id === 'XI')}
  ${jf ? fib('M60,168 C110,164 146,166 166,170', id === 'XI' ? 'SVE' : 'SVE', id) : ''}
  ${id === 'XI' ? fib('M80,250 C116,224 150,196 172,176', 'SVE', 'XI') : ''}
  ${id === 'XII' ? fib('M60,212 C86,210 104,209 122,208', 'GSE', 'XII') : ''}
  <g class="labels">
    ${t(62, 112, 'CLIVUS', 'middle', 'faint')}${t(230, 96, 'IAM', 'start', 'faint')}${t(200, 190, 'JUGULAR F.', 'start')}
    ${t(140, 228, 'HYPOGLOSSAL C.', 'start')}${t(62, 256, 'FORAMEN', 'middle')}${t(62, 268, 'MAGNUM', 'middle')}
    ${t(330, 128, 'PETROUS RIDGE', 'middle', 'faint')}${t(350, 252, 'SIGMOID', 'middle', 'faint')}
    ${t(290, 276, 'CEREBELLAR FOSSA', 'middle', 'faint')}${t(24, 20, '← MIDLINE', 'start', 'faint')}
  </g>
</svg>`;
}

// ── v (IX–XII). signatures ─────────────────────────────────────
function neckSignature(id) {
  if (id === 'IX') {
    let ecg = '';
    for (let i = 0; i < 6; i++) { const x = i * 60; ecg += `L${x + 20},230 L${x + 26},214 L${x + 32},244 L${x + 38},230 L${x + 60},230 `; }
    return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="baroSvg">
  ${artery('M90,256 L90,150', 9, 'cca')}${artery('M90,150 C84,110 76,70 70,24', 7, 'icaN')}${artery('M90,150 C100,110 110,70 118,24', 6, 'ecaN')}
  <ellipse data-tip="carSinus" class="receptor sinus" cx="82" cy="128" rx="9" ry="18"/>
  ${fib('M252,82 C220,90 190,100 176,108', 'GVA', 'sinusN')}${fib('M164,112 C130,118 104,124 90,128', 'GVA', 'sinusN')}
  ${fib('M266,92 C280,108 290,124 296,134', 'GVA', 'baro', 'fwd')}
  ${fib('M306,146 C340,160 376,168 404,170', 'GVE', 'cardiacX')}
  <g data-tip="infG9"><circle class="tg" cx="170" cy="110" r="9"/></g>
  <g class="nucx" data-tip="n-NTS"><circle cx="260" cy="82" r="14" fill="url(#nucGVA)"/></g>
  <g class="nucx" data-tip="n-DMN"><circle cx="302" cy="142" r="12" fill="url(#nucGVE)"/></g>
  <g data-tip="heart" class="beat"><path class="visc heart" d="M424,150 C434,138 452,142 454,158 C456,176 440,192 428,200 C416,192 400,176 402,158 C404,142 418,138 424,150 Z"/></g>
  <clipPath id="ecgClip"><rect x="250" y="206" width="210" height="44"/></clipPath>
  <g clip-path="url(#ecgClip)"><g class="ecg"><path d="M250,230 ${ecg}" transform="translate(240,0)"/></g></g>
  <text id="bpm" class="bpm" x="456" y="124" text-anchor="end">72 bpm</text>
  <g class="labels">
    ${t(104, 132, 'CAROTID SINUS', 'start')}${t(170, 136, 'PETROSAL G.', 'middle', 'faint')}${t(260, 62, 'NTS', 'middle')}
    ${t(302, 172, 'DMN · X', 'middle')}${t(206, 92, 'IX', 'middle', 'faint')}${t(356, 152, 'X', 'middle', 'faint')}
  </g>
</svg>
<div class="sig-ctrl"><button class="pill ck" data-baro="1"><span>✋</span>Massage sinus</button></div>
</div>`;
  }

  if (id === 'X') return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="foldSvg" data-state="breathe">
  <g data-tip="larynx" class="cart"><path d="M100,26 L140,26 L144,58 L96,58 Z"/></g>
  <g data-tip="trachea"><path class="visc pale" d="M110,58 L130,58 L128,196 L112,196 Z"/></g>
  ${artery('M26,150 C50,146 74,146 104,150', 6, 'subclavian')}
  ${artery('M116,214 C140,188 192,184 222,214', 9, 'aorta')}
  ${fib('M40,12 C44,60 52,110 58,150', 'SVE', 'X')}
  ${fib('M58,150 C62,172 78,172 82,156 C88,120 100,80 110,52', 'SVE', 'RLNr')}
  ${fib('M204,12 C200,80 190,150 184,204', 'SVE', 'X')}
  <g class="lrln">${fib('M184,204 C180,226 156,228 152,210 C146,160 136,100 130,52', 'SVE', 'RLN')}</g>
  <g data-tip="folds"><circle cx="360" cy="130" r="96" class="portal"/></g>
  <g class="fold-g" id="foldR"><path class="fold-v" d="M360,58 L326,196 L342,198 Z"/><circle data-tip="arytenoid" class="aryt" cx="334" cy="204" r="9"/></g>
  <g class="fold-g" id="foldL"><path class="fold-v" d="M360,58 L394,196 L378,198 Z"/><circle data-tip="arytenoid" class="aryt" cx="386" cy="204" r="9"/></g>
  <g class="labels">
    ${t(120, 20, 'LARYNX', 'middle', 'faint')}${t(30, 140, 'R SUBCLAVIAN', 'start', 'faint')}${t(170, 236, 'AORTIC ARCH', 'middle', 'faint')}
    ${t(66, 190, 'R RLN', 'middle')}${t(150, 250, 'L RLN', 'middle')}${t(304, 236, 'R', 'middle')}${t(416, 236, 'L', 'middle')}
    ${t(360, 50, 'FRONT', 'middle', 'faint')}
  </g>
</svg>
<div class="sig-ctrl groups">
  <div class="ctrl-grp"><span class="cg-l">Folds · pick one</span>
    <div class="seg2"><button class="seg-b on" data-fold="breathe"><span>◯</span>Breathe</button><button class="seg-b" data-fold="phonate"><span>♪</span>Phonate</button></div>
  </div>
  <div class="ctrl-grp"><span class="cg-l">Lesion · on / off</span>
    ${Clinic.sw('1', 'lrln', false, '⚡', 'Left RLN palsy', 'RLN')}
  </div>
</div>
</div>`;

  if (id === 'XI') return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="xiSvg">
  <g data-tip="medulla"><path d="M52,16 C70,10 100,10 118,16 L112,120 L104,252 L66,252 L58,120 Z" fill="url(#tissue)" class="xs-out" opacity=".55"/></g>
  <path class="ridge" d="M24,112 L300,112"/>
  <ellipse data-tip="fmag" class="fmring" cx="86" cy="120" rx="44" ry="8"/>
  <g data-tip="jf"><ellipse cx="232" cy="112" rx="14" ry="9" class="portal"/></g>
  ${[236, 208, 180].map(y => fib(`M84,${y} C96,${y} 104,${y - 2} 110,${y - 4}`, 'SVE', 'XI-root')).join('')}
  ${fib('M110,250 C110,200 110,150 112,120 C114,96 140,80 170,80 C200,80 222,92 230,104 C236,116 240,128 246,140', 'SVE', 'XI')}
  ${fib('M246,140 C262,150 280,160 296,170', 'SVE', 'XI-scm')}
  ${fib('M296,170 C320,184 350,196 384,208', 'SVE', 'XI-trap')}
  <g class="mus m-scm" data-tip="scm"><path d="M262,122 L282,118 C312,170 332,200 352,236 L334,242 C314,206 292,168 262,122 Z" fill="url(#musclePlain)"/></g>
  <g class="mus m-trap" data-tip="trapezius"><path d="M366,150 C406,160 446,190 464,244 L384,244 C384,212 376,182 366,150 Z" fill="url(#musclePlain)"/></g>
  <g class="xi-les les-post">${lesion(340, 192, 'T-xiPost')}</g>
  <g class="xi-les les-jug">${lesion(232, 112, 'T-xiJug')}</g>
  <g class="labels">
    ${t(40, 176, 'C1–C5', 'end', 'faint')}${t(130, 132, 'FORAMEN MAGNUM', 'start', 'faint')}${t(232, 96, 'JUGULAR F.', 'middle')}
    ${t(300, 254, 'SCM', 'middle')}${t(430, 254, 'TRAPEZIUS', 'middle')}${t(160, 70, 'up…', 'middle', 'faint')}${t(258, 160, '…down', 'end', 'faint')}
  </g>
</svg>
<div class="sig-ctrl">
  <button class="pill ck" data-xil="post"><span>✂</span>Posterior triangle</button>
  <button class="pill ck" data-xil="jug"><span>⚡</span>Jugular foramen</button>
</div>
</div>`;

  // XII — genioglossus vectors (tongue seen from above, front at top)
  return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="ggSvg">
  <path data-tip="mandible" class="fbone jaw" d="M120,40 C120,180 180,240 235,240 C290,240 350,180 350,40"/>
  <path id="ggTongue" class="ggt" data-tip="tongueM" d=""/>
  <path id="ggMid" class="ggmid" d=""/>
  <g id="ggR" class="ggv" data-tip="ggR"><path d="M196,214 L246,96" marker-end="url(#arrowR)"/></g>
  <g id="ggL" class="ggv" data-tip="ggL"><path d="M274,214 L224,96" marker-end="url(#arrowR)"/></g>
  <g id="ggS" class="ggs"><path d="" marker-end="url(#arrowW)"/></g>
  <g class="labels">
    ${t(170, 236, 'R genioglossus', 'end')}${t(300, 236, 'L genioglossus', 'start')}${t(235, 24, 'TIP · FRONT', 'middle', 'faint')}
    ${t(60, 140, 'R', 'middle')}${t(410, 140, 'L', 'middle')}
  </g>
</svg>
<div class="sig-ctrl"><button class="pill ck" data-gg="1"><span>⚡</span>Right XII lesion</button></div>
</div>`;
}

// ── CN II cards ────────────────────────────────────────────────
// mini visual-field pair (left eye, right eye) placed inside a card svg
function fieldPair(x, y, size, le, re, gap = 8) {
  const one = (dx, def, lab) => `<g transform="translate(${x + dx},${y})">
    <svg width="${size}" height="${size}" viewBox="-1.2 -1.2 2.4 2.4"><circle r="1" class="fm-bg"/><path class="fm-def" d="${Clinic.FIELD[def]}"/>${def === 'leftSpare' ? '<circle r=".3" class="fm-bg"/>' : ''}<path class="fm-axis" d="M-1,0 H1 M0,-1 V1"/><circle r="1" class="fm-ring"/></svg>
    <text x="${size / 2}" y="${size + 9}" class="fm-lab">${lab}</text></g>`;
  return one(0, le, 'L') + one(size + gap, re, 'R');
}

// i. eye → optic nerve: disc, lamina cribrosa, myelin, meningeal sheath
function eyeNerveCard() {
  let axons = '';
  [-60, -36, -14, 14, 36, 60].forEach(dy => {
    axons += `<path class="rgcax" d="M${300 - Math.abs(dy) * .3},${150 + dy * 1.6} C${250},${150 + dy * 1.2} ${214},${150 + dy * .3} 196,${150 + dy * .08}"/>`;
  });
  return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="globe"><path class="vglobe dk" d="M196,40 C260,30 340,60 380,110 L380,190 C340,240 260,270 196,260 Z"/></g>
  <g data-tip="rgc"><path class="retline" d="M196,48 C260,40 330,70 370,112 M196,252 C260,260 330,230 370,188"/></g>
  <g data-tip="fovea"><circle cx="320" cy="210" r="7" class="fovea"/></g>
  <g data-tip="rgc">${axons}</g>
  <g data-tip="csfSheath"><path class="csfsh" d="M190,112 L20,112 L20,188 L190,188 Z"/></g>
  <g data-tip="sheath"><path class="sheathl" d="M196,104 L20,104 M196,196 L20,196"/></g>
  <g data-tip="myelin"><rect x="20" y="124" width="160" height="52" rx="10" class="myelin"/></g>
  ${fib('M196,150 L20,150', 'SSA', 'myelin', 'vis')}
  <g data-tip="lamina" class="lamina"><path d="M188,122 L188,178 M193,120 L193,180 M198,122 L198,178"/></g>
  <g data-tip="disc"><ellipse cx="200" cy="150" rx="8" ry="26" class="vdisc"/></g>
  ${artery('M60,166 C110,166 150,160 196,154', 4, 'cra')}
  ${lesion(214, 118, 'L-papill')}${lesion(110, 92, 'L-neuritis')}${lesion(214, 186, 'L-glaucoma')}
  <g class="labels">
    ${t(300, 26, 'RETINA', 'middle', 'faint')}${t(320, 236, 'MACULA', 'middle', 'faint')}${t(240, 150, 'DISC', 'start')}
    ${t(100, 142, 'MYELINATED NERVE', 'middle')}${t(100, 216, 'DURA · CSF · PIA', 'middle', 'faint')}${t(60, 182, 'CRA', 'middle', 'faint')}
    ${t(192, 214, 'LAMINA', 'middle', 'faint')}${t(20, 290, '← TO THE CHIASM', 'start', 'faint')}
  </g>
</svg>`;
}

// ii. chiasm, coronal: anatomy on the left, a legend of what presses from where on the right
function chiasmCard() {
  const row = (y, key, name, sub, le, re) => `
    <g data-tip="${key}">${lesion(300, y + 14, key)}
      <text x="314" y="${y + 10}" class="lg-n">${name}</text><text x="314" y="${y + 22}" class="lg-s">${sub}</text>
      ${fieldPair(330, y + 30, 26, le, re, 8)}</g>`;
  return `
<svg viewBox="0 0 420 300" class="cs-svg">
  <g data-tip="third"><path class="csf" d="M138,24 L162,24 L160,86 L140,86 Z"/></g>
  <g data-tip="hypothal" class="ctxr"><ellipse cx="150" cy="96" rx="52" ry="16"/></g>
  <g data-tip="chiasmV" class="xn SSA lit"><rect x="84" y="118" width="132" height="20" rx="10" class="chibar"/></g>
  <path class="chicross" d="M98,122 L202,134 M98,134 L202,122"/>
  ${artery('M38,128 a14,14 0 1,0 0.1,0', 6, 'ica')}${artery('M234,128 a14,14 0 1,0 0.1,0', 6, 'ica')}
  <path class="stalk" d="M150,138 C150,156 150,166 150,178"/>
  <g data-tip="sphenoid"><path class="bone" d="M40,206 C80,196 108,202 112,190 C116,224 184,224 188,190 C192,202 220,196 260,206 L270,292 L30,292 Z"/><ellipse cx="150" cy="258" rx="58" ry="24" class="air"/></g>
  <g data-tip="pit"><ellipse cx="150" cy="198" rx="32" ry="20" fill="url(#pituitary)" class="pit"/></g>
  ${lesion(150, 160, 'L-adenoma')}${lesion(198, 102, 'L-cranio')}${lesion(58, 108, 'L-aneur')}
  <path class="lg-div" d="M284,16 L284,286"/>
  ${row(14, 'L-adenoma', 'Pituitary adenoma', 'from below', 'ulq', 'urq')}
  ${row(104, 'L-cranio', 'Craniopharyngioma', 'from above', 'llq', 'lrq')}
  ${row(194, 'L-aneur', 'R ICA aneurysm', 'from the side', 'none', 'leftHalf')}
  <g class="labels">
    ${t(150, 16, '3RD VENTRICLE', 'middle', 'faint')}${t(150, 154, 'CHIASM', 'middle')}${t(150, 202, 'PITUITARY', 'middle', 'dark')}
    ${t(38, 158, 'ICA', 'middle', 'faint')}${t(262, 158, 'ICA', 'middle', 'faint')}${t(150, 262, 'SPHENOID', 'middle', 'faint')}
  </g>
</svg>`;
}

// iii. the classic lesion → field-defect map
function fieldMapCard() {
  const sites = [
    [1, '', [70, 82], 'all', 'none'],
    [2, '', [130, 104], 'leftHalf', 'rightHalf'],
    [3, '', [194, 140], 'leftHalf', 'leftHalf'],
    [4, '', [276, 228], 'ulq', 'ulq'],
    [5, '', [222, 232], 'llq', 'llq'],
    [6, '', [270, 290], 'leftSpare', 'leftSpare']
  ];
  const marks = sites.map(([n, , [x, y]]) => `<g class="fmk" data-tip="FM-${n}"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + 3.5}">${n}</text></g>`).join('');
  const rows = sites.map(([n, , , le, re], i) => `<g data-tip="FM-${n}"><text x="318" y="${30 + i * 48}" class="fm-n">${n}</text>${fieldPair(330, 12 + i * 48, 30, le, re, 6)}</g>`).join('');
  return `
<svg viewBox="0 0 420 320" class="xs fieldmap">
  <g data-tip="eyeL"><circle cx="70" cy="34" r="20" class="vglobe"/></g><g data-tip="eyeR"><circle cx="190" cy="34" r="20" class="vglobe"/></g>
  ${fib('M74,52 C90,74 110,92 130,104 C150,116 196,134 226,170', 'SSA', 'II-tL', 'vis hfL')}
  ${fib('M64,52 C70,90 80,130 90,170', 'SSA', 'II-tR', 'vis hfR')}
  ${fib('M186,52 C170,74 150,92 130,104 C110,116 100,134 90,170', 'SSA', 'II-tR', 'vis hfR')}
  ${fib('M196,52 C200,90 214,130 226,170', 'SSA', 'II-tL', 'vis hfL')}
  <g data-tip="lgn" class="nucx"><ellipse cx="90" cy="176" rx="14" ry="9" fill="url(#nucSSA)"/><ellipse cx="226" cy="176" rx="14" ry="9" fill="url(#nucSSA)"/></g>
  ${fib('M84,184 C50,206 50,250 80,282', 'SSA', 'II-mey', 'vis hfR')}${fib('M94,184 C98,220 98,250 94,282', 'SSA', 'II-par', 'vis hfR')}
  ${fib('M232,184 C276,206 286,248 252,282', 'SSA', 'II-mey', 'vis hfL')}${fib('M222,184 C220,220 224,250 238,282', 'SSA', 'II-par', 'vis hfL')}
  <g data-tip="v1" class="ctxr c-II tgt"><ellipse cx="88" cy="292" rx="34" ry="12"/><ellipse cx="246" cy="292" rx="34" ry="12"/></g>
  ${marks}${rows}
  <g class="labels">
    ${t(70, 10, 'L EYE', 'middle', 'faint')}${t(190, 10, 'R EYE', 'middle', 'faint')}${t(150, 98, 'CHIASM', 'middle', 'faint')}
    ${t(150, 176, 'LGN', 'middle', 'faint')}${t(166, 304, 'V1', 'middle', 'faint')}${t(345, 316, 'L · R EYE FIELDS', 'middle', 'faint')}
  </g>
</svg>`;
}

// v. pupillary light reflex arc
function pupilSignature() {
  return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="pupSvg" data-light="R">
  <g data-tip="eyeR"><circle cx="130" cy="50" r="34" class="vglobe"/><circle cx="130" cy="50" r="15" fill="url(#iris)"/><circle id="ppR" cx="130" cy="50" class="pp"/></g>
  <g data-tip="eyeL"><circle cx="340" cy="50" r="34" class="vglobe"/><circle cx="340" cy="50" r="15" fill="url(#iris)"/><circle id="ppL" cx="340" cy="50" class="pp"/></g>
  <g class="s-rOn">${fib('M150,78 C170,92 200,104 228,110', 'SSA', 'II-tL', 'vis')}</g>
  <g class="s-lOn">${fib('M320,78 C300,92 270,104 242,110', 'SSA', 'II-tR', 'vis')}</g>
  <g class="s-aff">${fib('M228,114 C214,130 196,150 184,164', 'SSA', 'II-pre', 'vis')}${fib('M242,114 C256,130 274,150 286,164', 'SSA', 'II-pre', 'vis')}
    ${fib('M190,172 C220,180 250,180 280,172', 'SSA', 'postComm', 'vis')}
    ${fib('M184,178 C190,192 198,204 204,210', 'SSA', 'ewV', 'vis')}${fib('M188,176 C214,190 242,202 260,210', 'SSA', 'ewV', 'vis')}
    ${fib('M286,178 C280,192 272,204 266,210', 'SSA', 'ewV', 'vis')}${fib('M282,176 C256,190 228,202 210,210', 'SSA', 'ewV', 'vis')}</g>
  <g class="s-eff">${fib('M202,222 C150,244 76,206 70,142', 'GVE', 'III-gve')}${fib('M268,222 C320,244 394,206 400,142', 'GVE', 'III-gve')}
    ${fib('M72,126 C84,106 102,88 116,74', 'GVE', 'short-ciliary', 'post')}${fib('M398,126 C386,106 368,88 354,74', 'GVE', 'short-ciliary', 'post')}</g>
  <g data-tip="chiasmV" class="vchi small"><path d="M226,104 L244,118 M244,104 L226,118"/></g>
  <g class="nucx" data-tip="pretectV"><circle cx="184" cy="170" r="9" fill="url(#nucSSA)"/><circle cx="286" cy="170" r="9" fill="url(#nucSSA)"/></g>
  <g class="nucx" data-tip="ewV"><circle cx="206" cy="216" r="8" fill="url(#nucGVE)"/><circle cx="264" cy="216" r="8" fill="url(#nucGVE)"/></g>
  <g data-tip="cg"><circle class="ganglion" cx="70" cy="134" r="7"/><circle class="ganglion" cx="400" cy="134" r="7"/></g>
  <g id="torch" class="torch"><path d="M60,10 L100,34" class="beam"/><rect x="40" y="2" width="22" height="12" rx="3"/></g>
  <g class="labels">
    ${t(130, 100, 'RIGHT EYE', 'middle', 'faint')}${t(340, 100, 'LEFT EYE', 'middle', 'faint')}${t(184, 154, 'PRETECTUM', 'end', 'faint')}
    ${t(235, 246, 'EDINGER–WESTPHAL', 'middle', 'faint')}${t(56, 160, 'CILIARY G.', 'middle', 'faint')}${t(235, 196, 'POST. COMM.', 'middle', 'faint')}
    ${t(150, 120, 'II', 'middle')}${t(40, 210, 'III', 'middle')}
  </g>
</svg>
<div class="sig-ctrl groups">
  <div class="ctrl-grp"><span class="cg-l">Light · pick one</span>
    <div class="seg2"><button class="seg-b on" data-plight="R"><span>☀</span>Right eye</button><button class="seg-b" data-plight="L"><span>☀</span>Left eye</button></div>
  </div>
  <div class="ctrl-grp"><span class="cg-l">Lesion · on / off</span>${Clinic.sw('1', 'pneur', false, '⚡', 'Right optic neuritis', 'L-neuritis')}</div>
</div>
</div>`;
}

// ── CN I cards ─────────────────────────────────────────────────
const ODOR = ['#ffb547', '#5fe0a0', '#ff8fa3'];        // three receptor types → three glomeruli

// i. bulb microcircuit: epithelium → cribriform plate → glomeruli → mitral cells → tract
function bulbSection() {
  const gx = [130, 210, 290];
  const neurons = [[78, 0], [112, 1], [146, 2], [180, 1], [214, 0], [248, 2], [282, 1], [316, 0], [350, 2]];
  const axons = neurons.map(([x, k]) =>
    `<path class="ax" style="stroke:${ODOR[k]}" d="M${x},244 L${x},214 C${x},196 ${gx[k]},198 ${gx[k]},178"/>`).join('');
  const cells = neurons.map(([x, k]) =>
    `<g data-tip="receptorN"><path class="cilia" d="M${x},262 L${x},282 M${x - 4},282 l4,6 4,-6"/><circle cx="${x}" cy="254" r="6" style="fill:${ODOR[k]}"/></g>`).join('');
  const holes = neurons.map(([x]) => x);
  let plate = '';
  [40, ...holes].forEach((x, i) => { const nx = holes[i] ?? 380; plate += `<rect x="${x + (i ? 5 : 0)}" y="204" width="${nx - x - (i ? 10 : 5)}" height="12" rx="3"/>`; });
  return `
<svg viewBox="0 0 400 300" class="xs">
  <g data-tip="bulb"><rect x="40" y="40" width="340" height="156" rx="30" class="bulbbg"/></g>
  ${gx.map((x, i) => `
    ${fib(`M20,30 C${x - 50},34 ${x},50 ${x},96`, 'SVA', 'I-tract')}
    <g data-tip="granule" class="gran"><circle cx="${x - 34}" cy="74" r="6"/><path d="M${x - 28},78 L${x - 8},100"/></g>
    <g data-tip="mitral" class="nucx"><path d="M${x},96 L${x - 10},116 L${x + 10},116 Z" fill="url(#nucSVA)"/></g>
    <path class="dend" d="M${x},116 L${x},158"/>
    <g data-tip="glom"><circle cx="${x}" cy="168" r="15" class="glom" style="stroke:${ODOR[i]};fill:${ODOR[i]}55"/></g>`).join('')}
  <g data-tip="cribriform" class="cribx">${plate}</g>
  <g data-tip="I-fila">${axons}</g>
  <g data-tip="olfEpi"><rect x="40" y="236" width="340" height="36" rx="10" class="epix"/></g>
  ${cells}
  <path class="mucus" d="M40,284 C120,290 280,280 380,286"/>
  ${lesion(372, 210, 'L-shear')}
  ${lesion(372, 256, 'L-viralEpi')}
  <g class="labels">
    ${t(24, 22, '← OLFACTORY TRACT', 'start')}${t(396, 78, 'GRANULE', 'end')}${t(396, 112, 'MITRAL', 'end')}
    ${t(396, 160, 'GLOMERULI', 'end')}${t(396, 228, 'CRIBRIFORM', 'end')}
    ${t(44, 230, 'RECEPTOR NEURONS', 'start')}${t(210, 298, 'MUCUS · CILIA · ODOURS ARRIVE HERE', 'middle', 'faint')}
  </g>
</svg>`;
}

// ii. cribriform plate from above
function cribriformCard() {
  const floor = 'M40,288 C40,120 110,30 210,26 C310,30 380,120 380,288 Z';
  let dots = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) dots += `<circle cx="${178 + c * 14}" cy="${82 + r * 15}" r="1.6"/><circle cx="${228 + c * 14}" cy="${82 + r * 15}" r="1.6"/>`;
  return `
<svg viewBox="0 0 420 300" class="skull-svg">
  <g data-tip="bone"><path class="bone floor" d="${floor}"/><path d="${floor}" fill="url(#boneDots)"/></g>
  <g data-tip="orbPlate" class="ridges"><path d="M80,120 C110,110 140,118 160,140 M70,170 C100,160 140,168 162,190 M340,120 C310,110 280,118 260,140 M350,170 C320,160 280,168 258,190"/></g>
  <g class="fp lit" data-tip="cribriform"><rect x="168" y="70" width="36" height="104" rx="12" class="portal"/><rect x="216" y="70" width="36" height="104" rx="12" class="portal"/></g>
  <g class="cribdots">${dots}</g>
  <path data-tip="crista" class="crista" d="M206,52 L214,52 L217,168 L203,168 Z"/>
  <g class="nuc on" data-tip="bulb"><ellipse cx="186" cy="118" rx="12" ry="32" fill="url(#nucSVA)"/><ellipse cx="234" cy="118" rx="12" ry="32" fill="url(#nucSVA)"/></g>
  ${fib('M190,240 C190,210 186,180 186,150', 'SVA', 'I-tract')}${fib('M230,240 C230,210 234,180 234,150', 'SVA', 'I-tract')}
  <path class="ridge" d="M60,238 C120,222 170,230 196,246 M360,238 C300,222 250,230 224,246"/>
  <g data-tip="chiasm" class="chiasm-x"><path d="M178,256 C196,264 224,264 242,256 L236,270 C222,276 198,276 184,270 Z"/></g>
  ${lesion(210, 196, 'L-cribFrac')}
  <g class="ogm" data-tip="L-ogm"><circle cx="252" cy="118" r="20"/>${lesion(252, 118, 'L-ogm')}</g>
  <g class="labels">
    ${t(210, 44, 'CRISTA GALLI', 'middle', 'faint')}${t(160, 122, 'BULB', 'end')}${t(112, 210, 'ORBITAL PLATE', 'middle', 'faint')}
    ${t(210, 290, 'OPTIC CHIASM', 'middle', 'faint')}${t(150, 70, 'CRIBRIFORM', 'end')}${t(196, 228, 'TRACTS', 'end', 'faint')}
    ${t(34, 22, 'L', 'start')}${t(386, 22, 'R', 'end')}${t(210, 14, 'FROM ABOVE · FRONT ↑', 'middle', 'faint')}
  </g>
</svg>`;
}

// iii. olfactory cortex on the base of the brain
function olfCortexCard() {
  const out = 'M210,20 C120,20 50,70 44,150 C40,200 60,230 90,250 C80,280 100,310 140,312 C170,314 190,296 200,280 L220,280 C230,296 250,314 280,312 C320,310 340,280 330,250 C360,230 380,200 376,150 C370,70 300,20 210,20 Z';
  const ctx = (tip, shape) => `<g class="ctxr c-I tgt" data-tip="${tip}">${shape}</g>`;
  const half = (s) => s + mx(s, 210);
  return `
<svg viewBox="0 0 420 320" class="xs">
  <g data-tip="brainMed"><path d="${out}" fill="url(#section)" class="xs-out"/></g>
  <path class="sulcus" d="M210,22 L210,160"/>
  ${ctx('ofc', half('<path d="M90,70 C120,60 160,62 182,80 L178,140 C150,150 110,146 86,130 Z"/>'))}
  ${ctx('piriform', half('<ellipse cx="140" cy="222" rx="20" ry="13"/>'))}
  ${ctx('entorhinal', half('<ellipse cx="156" cy="276" rx="14" ry="26"/>'))}
  <g data-tip="amygdala" class="amyx">${half('<ellipse cx="146" cy="240" rx="12" ry="9"/>')}</g>
  <g data-tip="chiasm" class="chiasm-x"><path d="M190,188 C202,196 218,196 230,188 L226,202 C218,206 202,206 194,202 Z"/></g>
  <g data-tip="mamm">${half('<circle cx="204" cy="222" r="5" class="tissue"/>')}</g>
  <g data-tip="septal" class="aps"><ellipse cx="210" cy="170" rx="18" ry="8"/></g>
  <g class="nuc on" data-tip="bulb">${half('<ellipse cx="196" cy="56" rx="7" ry="17" fill="url(#nucSVA)"/>')}</g>
  ${fib('M196,148 L196,74', 'SVA', 'I-tract')}${fib('M224,148 L224,74', 'SVA', 'I-tract')}
  ${fib('M140,210 C150,182 172,158 196,150', 'SVA', 'I-lat')}${fib('M280,210 C270,182 248,158 224,150', 'SVA', 'I-lat')}
  ${fib('M210,166 C206,160 200,154 196,150', 'SVA', 'I-med')}${fib('M210,166 C214,160 220,154 224,150', 'SVA', 'I-med')}
  ${lesion(108, 222, 'L-uncinate')}
  <g class="labels">
    ${t(178, 50, 'BULB', 'end')}${t(232, 160, 'TRACT', 'start', 'faint')}${t(130, 100, 'ORBITO-', 'middle', 'faint')}${t(130, 112, 'FRONTAL', 'middle', 'faint')}
    ${t(154, 172, 'LAT. STRIA', 'end', 'faint')}${t(244, 176, 'MED. STRIA', 'start', 'faint')}${t(250, 196, 'CHIASM', 'start', 'faint')}
    ${t(140, 202, 'UNCUS', 'middle')}${t(170, 246, 'AMYGDALA', 'start', 'faint')}${t(176, 300, 'ENTORHINAL', 'start', 'faint')}
    ${t(210, 14, 'FROM BELOW · FRONT ↑', 'middle', 'faint')}
  </g>
</svg>`;
}

// v. straight to cortex: smell skips the thalamus on the way in
function olfSignature() {
  const box = (x, y, w, tip, label, cls = '') => `<g data-tip="${tip}" class="sg-box ${cls}"><rect x="${x - w / 2}" y="${y - 16}" width="${w}" height="32" rx="10"/><text x="${x}" y="${y + 4}">${label}</text></g>`;
  return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="olfSvg" data-row="smell">
  <g class="row row-other">
    <text x="16" y="38" class="row-t">EVERY OTHER SENSE</text>
    ${fib('M380,70 C340,70 320,70 296,70', 'GSA', 'thal')}${fib('M224,70 C200,70 180,70 156,70', 'GSA', 'thal')}${fib('M104,70 C90,70 80,70 64,70', 'GSA', 'thal')}
    ${box(40, 70, 48, 'receptorN', 'receptor')}${box(130, 70, 52, 'thal', 'relay')}${box(260, 70, 72, 'thal', 'THALAMUS', 'thal-on')}${box(420, 70, 80, 'ctxPrim', 'cortex')}
  </g>
  <g class="row row-smell">
    <text x="16" y="148" class="row-t">SMELL</text>
    ${fib('M288,180 C250,180 220,180 184,180', 'SVA', 'I-lat')}${fib('M120,180 C100,180 84,180 64,180', 'SVA', 'I-fila')}
    ${fib('M398,148 C380,156 366,166 352,174', 'SVA', 'I-hyp')}${fib('M398,212 C380,204 366,194 352,186', 'SVA', 'I-hip')}
    ${fib('M330,164 C320,130 290,116 262,116 C236,116 220,112 200,112', 'SVA', 'I-md', 'intra')}
    ${box(40, 180, 48, 'olfEpi', 'receptor')}${box(152, 180, 64, 'bulb', 'BULB')}${box(320, 180, 64, 'piriform', 'CORTEX', 'ctx-on')}
    ${box(430, 140, 64, 'amygdala', 'amygdala')}${box(430, 220, 64, 'entorhinal', 'memory')}
    <g class="skip" data-tip="thal"><rect x="208" y="200" width="64" height="30" rx="10"/><text x="240" y="219">thalamus</text><path d="M210,202 L270,228"/>
      <text x="240" y="246" class="skip-t">skipped</text></g>
    ${box(160, 112, 76, 'ofc', 'MD → OFC', 'later')}
  </g>
  <g class="labels">
    <text class="lbl faint" x="160" y="146" text-anchor="middle">thalamus only afterwards</text>
  </g>
</svg>
<div class="sig-ctrl groups">
  <div class="ctrl-grp"><span class="cg-l">Trace · pick one</span>
    <div class="seg2"><button class="seg-b on" data-orow="smell"><span>◇</span>Smell</button><button class="seg-b" data-orow="other"><span>◎</span>Other senses</button></div>
  </div>
</div>
</div>`;
}

// ── CN VIII cards ──────────────────────────────────────────────
// i. pontomedullary junction: vestibular nuclei under the floor, cochlear nuclei on the ICP
function pmjSection() {
  const out = 'M60,80 C90,58 150,50 200,60 C250,50 310,58 340,80 C366,110 370,170 352,212 C336,246 300,272 260,284 C240,290 216,292 200,290 C184,292 160,290 140,284 C100,272 64,246 48,212 C30,170 34,110 60,80 Z';
  const side = (on) => `
    <g data-tip="icp" class="xs-scp"><ellipse cx="318" cy="132" rx="16" ry="22"/></g>
    <g data-tip="spTract" class="sptract"><ellipse cx="300" cy="182" rx="11" ry="15"/></g>
    <g class="nucx ${on ? '' : 'ghost'}" data-tip="n-vest"><ellipse cx="244" cy="104" rx="18" ry="9" fill="url(#nucSSA)"/><ellipse cx="282" cy="112" rx="13" ry="10" fill="url(#nucSSA)"/></g>
    <g class="nucx ${on ? '' : 'ghost'}" data-tip="n-coch"><ellipse cx="330" cy="102" rx="12" ry="7" fill="url(#nucSSA)"/><ellipse cx="346" cy="152" rx="10" ry="13" fill="url(#nucSSA)"/></g>
    <g class="nucx ${on ? '' : 'ghost'}" data-tip="n-soc"><circle cx="262" cy="208" r="8" fill="url(#nucSSA)"/></g>
    <g data-tip="mlfx" class="xs-ml"><ellipse cx="214" cy="122" rx="6" ry="5"/></g>`;
  return `
<svg viewBox="0 0 400 300" class="xs pmj">
  <g data-tip="medulla"><path d="${out}" class="xs-out pmj-out"/></g>
  <g data-tip="v4"><path d="M96,70 C150,56 250,56 304,70 C268,84 236,92 200,94 C164,92 132,84 96,70 Z" class="csf"/></g>
  <g data-tip="ml" class="xs-ml"><ellipse cx="184" cy="234" rx="20" ry="7"/><ellipse cx="216" cy="234" rx="20" ry="7"/></g>
  <g data-tip="pyramid" class="pyrx"><ellipse cx="180" cy="266" rx="20" ry="13"/><ellipse cx="220" cy="266" rx="20" ry="13"/></g>
  ${mx(side(false))}${side(true)}
  ${fib('M342,166 C300,226 200,232 146,212', 'SSA', 'trapX', 'coch')}
  ${fib('M340,162 C318,190 294,202 272,206', 'SSA', 'trap', 'coch')}
  ${fib('M398,160 C382,158 368,156 356,154', 'SSA', 'VIII-cn', 'coch')}
  ${fib('M346,140 C342,124 338,112 336,108', 'SSA', 'VIII-cn', 'coch')}
  ${fib('M398,176 C360,178 330,172 306,152 C296,140 290,128 286,120', 'SSA', 'VIII-vn', 'vest')}
  ${fib('M232,108 C226,112 220,116 218,120', 'SSA', 'vor', 'vest')}
  ${lesion(336, 214, 'L-aicaSyn')}
  <g class="labels">
    ${t(200, 50, '4TH V.', 'middle', 'faint')}${t(244, 132, 'VESTIBULAR', 'middle', 'vestT')}${t(330, 88, 'DCN', 'middle', 'cochT')}
    ${t(362, 134, 'VCN', 'start', 'cochT')}${t(318, 162, 'ICP', 'middle', 'faint')}${t(262, 228, 'SOC', 'middle', 'faint')}
    ${t(200, 152, 'MLF', 'middle', 'faint')}${t(200, 214, 'TRAPEZOID', 'middle', 'faint')}${t(200, 284, 'PYRAMIDS', 'middle', 'faint')}
    ${t(396, 196, 'VIII', 'end')}${t(20, 290, 'DORSAL ↑', 'start', 'faint')}
  </g>
</svg>`;
}

// iii. two pathways: hearing crosses right after the cochlear nuclei · balance fans out
function hearPathCard() {
  const bx = (x, y, w, tip, label, cls = '') => `<g data-tip="${tip}" class="sg-box hp ${cls}"><rect x="${x - w / 2}" y="${y - 13}" width="${w}" height="26" rx="9"/><text x="${x}" y="${y + 3.5}">${label}</text></g>`;
  const col = (x, s) => `
    ${fib(`M${x},277 L${x},253`, 'SSA', 'VIII-c', 'coch')}${fib(`M${x},227 L${x},203`, 'SSA', 'trap', 'coch')}
    ${fib(`M${x},177 L${x},143`, 'SSA', 'll', 'coch')}${fib(`M${x},117 L${x},95`, 'SSA', 'mgn', 'coch')}${fib(`M${x},69 L${x},47`, 'SSA', 'mgn', 'coch')}
    ${bx(x, 290, 48, 'cochlea', `${s} EAR`, 'coch')}${bx(x, 240, 48, 'n-coch', 'CN')}${bx(x, 190, 48, 'n-soc', 'SOC')}
    ${bx(x, 130, 48, 'n-ic', 'IC')}${bx(x, 82, 48, 'mgn', 'MGN')}${bx(x, 34, 48, 'a1', 'A1')}`;
  return `
<svg viewBox="0 0 420 320" class="xs hpath">
  <text x="96" y="12" class="row-t" text-anchor="middle">HEARING</text><text x="310" y="12" class="row-t" text-anchor="middle">BALANCE</text>
  <path class="hp-cut" d="M14,215 L204,215"/>
  ${fib('M60,228 C80,214 106,212 120,204', 'SSA', 'trapX', 'coch')}${fib('M118,228 C98,214 72,212 58,204', 'SSA', 'trapX', 'coch')}
  ${col(46, 'R')}${col(132, 'L')}
  ${lesion(89, 264, 'L-earSide')}${lesion(89, 158, 'L-above')}
  <text x="204" y="232" class="hp-note" text-anchor="end">one ear</text><text x="204" y="208" class="hp-note" text-anchor="end">both ears</text>
  <path class="lg-div" d="M214,24 L214,306"/>
  ${fib('M300,277 L300,245', 'SSA', 'VIII-v', 'vest')}
  ${fib('M270,219 C260,200 252,184 250,163', 'SSA', 'vor', 'vest')}${fib('M318,219 C334,200 346,184 350,163', 'SSA', 'vcb', 'vest')}
  ${fib('M348,232 L364,232', 'SSA', 'vsp', 'vest')}${fib('M290,219 L290,83', 'SSA', 'vThal', 'vest')}
  ${bx(300, 290, 120, 'vestibule', 'canals · otoliths', 'vest')}${bx(300, 232, 96, 'n-vest', 'vest. nuclei')}
  ${bx(250, 150, 60, 'vorOut', 'III IV VI')}${bx(350, 150, 64, 'flocculus', 'flocculus')}${bx(390, 232, 52, 'vspOut', 'spine')}
  ${bx(290, 70, 110, 'vThal', 'thalamus → cortex')}
  <g class="labels">
    ${t(250, 128, 'eyes · VOR', 'middle', 'faint')}${t(350, 128, 'gaze holding', 'middle', 'faint')}
    ${t(390, 258, 'posture', 'middle', 'faint')}${t(290, 48, 'feeling of motion', 'middle', 'faint')}
  </g>
</svg>`;
}

// v. vestibulo-ocular reflex: top view, nose up · patient's right is the viewer's right
function vorSignature() {
  const bx = (x, y, w, tip, id, label, cls = '') => `<g data-tip="${tip}" class="sg-box ${cls}"><rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="9"/><text x="${x}" y="${y + 4}" id="${id}">${label}</text></g>`;
  const eye = (cx) => `<g class="vor-eye" style="transform-origin:${cx}px 104px"><path class="gaze" d="M${cx},104 L${cx + (120 - cx) * .95},26"/><circle cx="${cx}" cy="104" r="11" class="vglobe"/><circle cx="${cx + (120 - cx) * .08}" cy="96" r="4.5" class="vpup"/></g>`;
  return `
<div class="sig-row">
<svg viewBox="0 0 470 260" class="sig-svg" id="vorSvg">
  <g data-tip="vTarget" class="vtarget"><path d="M120,10 L124,20 L134,20 L126,26 L129,36 L120,30 L111,36 L114,26 L106,20 L116,20 Z"/></g>
  <g id="vorHead" style="transform-origin:120px 150px">
    <ellipse cx="120" cy="150" rx="62" ry="72" class="vor-head"/>
    <path d="M110,80 L120,64 L130,80" class="vor-nose"/>
    <ellipse cx="56" cy="152" rx="7" ry="16" class="vor-ear"/><ellipse cx="184" cy="152" rx="7" ry="16" class="vor-ear"/>
    <g data-tip="canalH" class="vor-canal"><ellipse cx="76" cy="152" rx="9" ry="7"/><ellipse cx="164" cy="152" rx="9" ry="7"/></g>
    ${eye(96)}${eye(144)}
    <text x="80" y="176" class="lbl faint" text-anchor="middle">L</text><text x="160" y="176" class="lbl faint" text-anchor="middle">R</text>
    <text x="120" y="208" class="lbl tiny" text-anchor="middle">from above</text>
  </g>
  <text id="vorMsg" x="120" y="250" class="vor-msg" text-anchor="middle"></text>
  <g class="vor-c">
    ${fib('M285,213 L285,182', 'SSA', 'VIII-v', 'vest v-in')}
    ${fib('M330,166 L365,166', 'SSA', 'vor', 'vest v-mid')}
    ${fib('M405,152 L405,112', 'GSE', 'n-VI', 'v-out')}
    ${fib('M372,154 C350,130 338,120 330,112', 'GSE', 'mlf', 'v-out')}
    ${fib('M285,82 C290,66 300,56 312,50', 'GSE', 'n-III', 'v-out')}${fib('M405,82 C400,66 390,56 378,50', 'GSE', 'n-VI', 'v-out')}
    ${bx(285, 226, 92, 'canalH', 'vb1', 'R lat. canal', 'vest')}${bx(285, 166, 90, 'n-vest', 'vb2', 'R vest. n.')}
    ${bx(405, 166, 76, 'n-VI', 'vb3', 'L VI n.')}${bx(285, 96, 92, 'MR', 'vb4', 'R III → MR')}${bx(405, 96, 76, 'LR', 'vb5', 'L LR')}
    ${bx(345, 36, 150, 'vTarget', 'vb6', 'both eyes → left')}
    <text x="350" y="124" class="lbl faint" text-anchor="middle">MLF</text>
  </g>
</svg>
<div class="sig-ctrl groups">
  <div class="ctrl-grp"><span class="cg-l">Head impulse · click to turn</span>
    <div class="seg2"><button class="seg-b" data-vturn="R"><span>↷</span>Turn right</button><button class="seg-b" data-vturn="L"><span>↶</span>Turn left</button></div>
  </div>
  <div class="ctrl-grp"><span class="cg-l">Lesion · on / off</span>${Clinic.sw('1', 'vloss', false, '⚡', 'Right vestibular loss', 'H-neuritisR')}</div>
</div>
</div>`;
}

function factBadges(id) {
  return `<div class="badges">${NERVES[id].facts.map(f => `<div class="badge"><i>${f.i}</i>${f.t}</div>`).join('')}</div>`;
}

// VI stretch: brainstem shifts down & back, nerve pulled over the apex
const SAG_VI = (dx, dy) => {
  const sx = 220 + dx, sy = 184 + dy;
  return `M${sx},${sy} C${246 + dx * 0.6},${160 + dy * 0.6} ${284 + dx * 0.2},${118 + dy * 0.2} 302,96 C310,86 320,84 334,86 C360,90 390,92 430,92`;
};
