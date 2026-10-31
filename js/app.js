// ─────────────────────────────────────────────────────────────
//  App: state, picker, legend, route strip, tooltips, animation.
// ─────────────────────────────────────────────────────────────

const state = { nerve: 'III', labels: true, ctx: true, isolate: false, flow: true, hidden: new Set() };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ── small glyphs for the route strip / shape key
const ICON = {
  nucleus:  '<circle cx="16" cy="16" r="9" fill="url(#nucGSE)"/><circle cx="16" cy="16" r="3" fill="#fff"/>',
  fascicle: '<path d="M8,6 C14,12 10,20 16,26 M14,6 C20,12 16,20 22,26 M20,6 C26,12 22,20 28,26" class="ic-l"/>',
  exit:     '<path d="M6,24 C10,10 22,10 26,24" class="ic-t"/><path d="M16,20 L16,4 M11,9 L16,4 L21,9" class="ic-l"/>',
  cistern:  '<path d="M4,12 C9,8 13,16 18,12 S27,8 30,12 M4,20 C9,16 13,24 18,20 S27,16 30,20" class="ic-a"/><circle cx="16" cy="16" r="2.5" fill="#fff"/>',
  dura:     '<path d="M4,10 H28 M4,16 H28 M4,22 H28" class="ic-d"/><circle cx="16" cy="16" r="4" class="ic-p"/>',
  sinus:    '<path d="M5,16 C5,6 27,6 27,16 C27,26 5,26 5,16 Z" fill="rgba(143,111,224,.45)" stroke="#a98bff"/><path d="M10,10 L22,22 M22,10 L10,22" stroke="#c7b4ff" stroke-opacity=".5"/>',
  split:    '<path d="M6,16 H15 C20,16 22,8 28,8 M15,16 C20,16 22,24 28,24" class="ic-l"/>',
  foramen:  '<ellipse cx="16" cy="16" rx="8" ry="12" fill="url(#portal)" stroke="#e3c08d"/><ellipse cx="16" cy="18" rx="5" ry="7" fill="none" stroke="#f2c76e" stroke-dasharray="2 2"/>',
  ganglion: '<path d="M16,5 C24,7 27,14 25,19 C23,26 16,29 10,26 C4,22 5,12 9,8 C11,6 13,5 16,5 Z" fill="url(#ganglion)"/>',
  sganglion:'<path d="M16,5 C24,7 27,14 25,19 C23,26 16,29 10,26 C4,22 5,12 9,8 C11,6 13,5 16,5 Z" fill="url(#ganglionBlue)"/>',
  cortex:   '<path d="M6,20 C4,10 12,5 18,7 C24,4 30,10 27,17 C30,23 24,28 18,26 C12,29 6,26 6,20 Z" fill="rgba(231,195,181,.3)" stroke="#e7c3b5"/><path d="M11,14 C14,12 16,16 19,14 M10,20 C14,18 18,22 22,19" class="ic-l"/>',
  viscera:  '<path d="M16,9 C19,4 27,6 27,13 C27,20 20,25 16,28 C12,25 5,20 5,13 C5,6 13,4 16,9 Z" fill="#ff8fa3" fill-opacity=".55" stroke="#ff8fa3"/>',
  skin:     '<path d="M8,26 C6,14 10,6 16,6 C22,6 26,14 24,26 Z" fill="rgba(85,198,255,.18)" stroke="#55c6ff" stroke-dasharray="2 2"/><path d="M9,14 H23 M8,20 H24" stroke="#55c6ff" stroke-opacity=".5"/>',
  muscle:   '<path d="M3,16 C8,6 24,6 29,16 C24,26 8,26 3,16 Z" fill="url(#musclePlain)"/><path d="M3,16 C8,6 24,6 29,16 C24,26 8,26 3,16 Z" fill="url(#striV)"/>',
  decuss:   '<path d="M6,6 L26,26 M26,6 L6,26" class="ic-l"/>',
  cross:    '<path d="M4,24 C12,22 20,10 28,8 M4,10 C12,12 20,20 28,22" class="ic-l"/>',
  artery:   '<path d="M3,20 C10,8 22,24 29,12" stroke="#b5323c" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M3,20 C10,8 22,24 29,12" stroke="#ff9a8f" stroke-width="2" fill="none" opacity=".5"/>',
  venous:   '<rect x="4" y="7" width="24" height="18" rx="9" fill="rgba(143,111,224,.45)" stroke="#a98bff"/><rect x="4" y="7" width="24" height="18" rx="9" fill="url(#lattice)"/>',
  bone:     '<rect x="4" y="8" width="24" height="16" rx="4" fill="url(#bone)"/><rect x="4" y="8" width="24" height="16" rx="4" fill="url(#boneDots)"/>',
  gland:    '<circle cx="12" cy="13" r="6" fill="#7fc47a"/><circle cx="20" cy="12" r="5" fill="#8fd38a"/><circle cx="17" cy="20" r="6" fill="#6bb466"/>',
  lesion:   '<circle cx="16" cy="16" r="10" fill="rgba(255,77,77,.15)" stroke="#ff4d4d"/><path d="M14,9 L18,15 L14,17 L18,23" stroke="#ff4d4d" fill="none" stroke-width="1.8"/>'
};
const ico = (k, size = 32) => `<svg viewBox="0 0 32 32" width="${size}" height="${size}">${ICON[k]}</svg>`;

// ── header pieces
function renderPicker() {
  $('#picker').innerHTML = REGIONS.map(r => `
    <div class="pod" data-region="${r.id}">
      <div class="pod-h"><b>${r.name}</b><small>${r.sub}</small></div>
      <div class="pod-row">${r.nerves.map(id => {
        const n = NERVES[id];
        return `<button class="nbtn" data-select="${id}" aria-label="${n.name} nerve">
          <span class="disc"><span class="num">${id}</span><span class="dots">${n.fibers.map(f => `<i style="--c:${FIBERS[f].color}"></i>`).join('')}</span></span>
          <span class="nm">${SHORT_NAMES[id] || n.name}</span>
        </button>`;
      }).join('')}${(r.soon || []).map(id => `
        <span class="nbtn soon" title="Coming soon"><span class="disc"><span class="num">${id}</span></span><span class="nm">soon</span></span>`).join('')}</div>
    </div>`).join('');
}

// compact sticky switcher: current nerve · I–XII grouped by region · jumps to the page sections
const JUMPS = [['Stage', '.stage-wrap'], ['Cards', '.cards'], ['Clinic', '#card-eyes'], ['Signature', '#card-sig']];
function renderMini() {
  $('#miniBar').innerHTML = `
    <span class="mb-cur"><b id="mbNum"></b><span id="mbName"></span></span>
    <div class="mb-discs">${REGIONS.map(r => `<div class="mb-grp">${r.nerves.map(id =>
      `<button class="mb-d" data-select="${id}" data-tip-html="${encodeURIComponent(`<span class='cat' style='--cc:var(--gse)'>${r.name}</span><h4>${id} · ${NERVES[id].name}</h4><p>${NERVES[id].tag}</p>`)}">${id}</button>`).join('')}</div>`).join('')}</div>
    <div class="mb-jump">${JUMPS.map(([l, sel]) => `<button data-jump="${sel}">${l}</button>`).join('')}</div>`;
  // show it only while the full picker is off screen · checked at most once per frame
  let queued = false;
  const check = () => { queued = false; $('#miniBar').classList.toggle('on', $('#picker').getBoundingClientRect().bottom < 20); };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(check); } }, { passive: true });
  addEventListener('resize', check);
  check();
}

function renderLegend() {
  const n = NERVES[state.nerve];
  $('#fiber-legend').innerHTML = Object.entries(FIBERS).map(([k, f]) => {
    const own = n.fibers.includes(k), pass = n.passengers.includes(k);
    const cls = own ? 'own' : pass ? 'pass' : 'off';
    return `<button class="fchip ${cls} ${state.hidden.has(k) ? 'muted' : ''} ${k === 'SYM' ? 'dashed' : ''}" data-fiber="${k}" style="--c:${f.color}"
      data-tip-html="${encodeURIComponent(`<span class='cat' style='--cc:${f.color}'>${own ? 'carried' : pass ? 'passenger' : 'not in ' + n.id}</span><h4>${f.name}</h4><p>${f.role}</p>`)}">
      <i></i><b>${k}</b></button>`;
  }).join('');
  // key = sample chips in the same three styles, worded for this nerve
  const none = !n.passengers.length;
  $('#lg-key').innerHTML = `
    <span class="kk own">carried by ${n.id}</span>
    <span class="kk pass ${none ? 'none' : ''}">passenger${none ? ` · none in ${n.id}` : ' · rides along'}</span>
    <span class="kk off">not in ${n.id}</span>
    <span class="kk-hint">click a chip to hide those fibres on the stage</span>`;
}

function renderTools() {
  const tools = [['labels', 'Labels'], ['ctx', 'Context'], ['flow', 'Impulses'], ['isolate', 'Isolate']];
  $('#tools').innerHTML = tools.map(([k, t]) => `<button class="tog ${state[k] ? 'on' : ''}" data-tool="${k}"><i></i>${t}</button>`).join('');
}

function renderShapeKey() {
  const keys = ['nucleus', 'sganglion', 'ganglion', 'foramen', 'muscle', 'gland', 'skin', 'viscera', 'artery', 'venous', 'bone', 'lesion'];
  const lines = `
    <span class="sk-line"><svg width="34" height="10"><path d="M2,5 H32" stroke="#ff5f87" stroke-width="3.5" stroke-linecap="round"/></svg>nerve</span>
    <span class="sk-line"><svg width="34" height="10"><path d="M2,5 H32" stroke="#ff5f87" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/></svg>in brainstem</span>
    <span class="sk-line"><svg width="34" height="10"><path d="M2,5 H32" stroke="#ffb547" stroke-width="3.6" stroke-dasharray=".1 6.5" stroke-linecap="round"/></svg>post-ganglionic</span>
    <span class="sk-line"><svg width="34" height="10"><path d="M2,5 H32" stroke="#9aa6bd" stroke-width="2" stroke-dasharray="5 5"/></svg>sympathetic</span>`;
  $('#shape-key').innerHTML = keys.map(k => `<span class="sk" data-tip-html="${encodeURIComponent(`<span class='cat' style='--cc:${(CATS[k] || CATS.nerve).color}'>shape</span><h4>${CATS[k].name}</h4>`)}">${ico(k, 26)}<em>${CATS[k].name}</em></span>`).join('') + lines;
}

function renderRoute() {
  const n = NERVES[state.nerve];
  $('#route').innerHTML = `<div class="route-title"><span class="rt-num">${n.id}</span><span class="rt-name">${n.name}<small>${n.tag}</small></span></div>` +
    n.stations.map((s, i) => `
    <div class="stn" style="--d:${i * 55}ms" data-at="${s.at.join(',')}">
      <div class="ico">${ico(s.k)}</div>
      <b>${s.t}</b><small>${s.s}</small>
    </div>`).join('');
}

// ── cards
const CARD_TITLES = {
  vision: { cs: ['Optic chiasm', 'coronal · what presses from where'], sof: ['Lesion → field defect', 'the classic map · fields as the patient sees'], mv: ['Fields & pupils', 'confrontation · swinging light · pick a lesion'] },
  ear:    { cs: ['Internal acoustic meatus', 'right fundus · VIII lit · looking in'], sof: ['Two pathways', 'hearing crosses early · balance fans out'], mv: ['Hearing & balance', 'tuning fork · head impulse · Hallpike · pick a lesion'] },
  smell: { cs: ['Cribriform plate', 'anterior cranial fossa · from above'], sof: ['Olfactory cortex', 'base of the brain · from below'], mv: ['Smell test', 'one nostril at a time · pick a lesion'] },
  orbit: { cs: ['Cavernous sinus', 'coronal · right side lit'], sof: ['Superior orbital fissure', 'right apex · front view'], mv: ['Movements', 'gaze · light · near · pick a lesion'] },
  face:  { sof: ['Skull base foramina', 'right middle fossa · from above'], mv: ['Face', 'expressions · reflexes · pick a lesion'] },
  neck:  { cs: ['Jugular foramen', 'right side · + hypoglossal canal'], sof: ['Posterior fossa foramina', 'right side · from above'], mv: ['Throat & neck', 'swallow · speak · shrug · pick a lesion'] }
};

function renderCards() {
  const n = NERVES[state.nerve], face = n.region === 'face', neck = n.region === 'neck', smell = n.region === 'smell', vision = n.region === 'vision', ear = n.region === 'ear';
  const ct = CARD_TITLES[n.region];
  const title = (k, [tt, ss]) => { $(`#${k}-title`).textContent = tt; $(`#${k}-sub`).textContent = ss; };
  title('xs', [n.section.title, n.section.sub]);
  title('cs', n.cs || ct.cs);
  title('sof', ct.sof);
  title('mv', ct.mv);
  title('sig', [n.sig.title, n.sig.sub]);
  $('#card-xs').innerHTML = crossSection(n.id);
  $('#card-cs').innerHTML = vision ? chiasmCard() : smell ? cribriformCard() : neck ? jugularCard(n.id) : (n.id === 'VII' || ear) ? iam(n.id) : cavernous(n.id);
  $('#card-sof').innerHTML = ear ? hearPathCard() : vision ? fieldMapCard() : smell ? olfCortexCard() : neck ? posteriorFossa(n.id) : face ? skullFloor(n.id) : sofRosette(n.id);
  if (face || neck || smell || vision || ear) {
    const Mod = face ? Face : neck ? Throat : smell ? Smell : vision ? Vision : Hear;
    Eyes.stop();
    $('#card-eyes').innerHTML = Mod.render(n.id);
    Mod.bind($('#card-eyes'));
  } else {
    $('#card-eyes').innerHTML = Eyes.render(n.id);
    Eyes.bind($('#card-eyes'));
  }
  $('#card-sig').innerHTML = signature(n.id) + factBadges(n.id);
  $$('.cards .card-body').forEach(b => { b.classList.remove('enter'); void b.offsetWidth; b.classList.add('enter'); });
  bindSignature(n.id);
  padHits($('.cards'));
  applyHidden();
}

// ── selection
function select(id) {
  state.nerve = id;
  const region = NERVES[id].region;
  if (region !== state.region) {           // swap the right half of the stage
    state.region = region;
    $('#stage').innerHTML = buildStage(region);
    padHits($('#stage'));
    proxyForamina();
    hoveredNerve = null;
  }
  const svg = $('#stage');                 // both layers (art + animated overlay)
  $$('.nv, .nv-h', svg).forEach(g => g.classList.toggle('on', g.dataset.nerve === id));
  $$('.nuc', svg).forEach(g => g.classList.toggle('on', g.dataset.nerve.split(' ').includes(id)));   // some nuclei serve several nerves
  $$('.muscle', svg).forEach(m => m.classList.toggle('tgt', m.classList.contains(`m-${id}`)));
  $$('.gland, .derm, .ctxr', svg).forEach(m => m.classList.toggle('tgt', [`g-${id}`, `d-${id}`, `c-${id}`].some(c => m.classList.contains(c))));
  $$('.ganglion-g, .sg-g', svg).forEach(g => g.classList.toggle('on', g.classList.contains(`g-${id}`)));
  $('.decx', svg)?.classList.toggle('on', id === 'IV');          // no brainstem panel in the smell scene
  $$('.medal', svg).forEach(m => m.classList.toggle('on', m.dataset.select === id));
  $$('.nbtn, .mb-d').forEach(b => b.classList.toggle('on', b.dataset.select === id));
  $('#mbNum').textContent = id;
  $('#mbName').textContent = NERVES[id].name;
  // a pod can hold nerves from several stage regions (Special senses: smell + vision)
  $$('.pod').forEach(p => p.classList.toggle('on', REGIONS.find(r => r.id === p.dataset.region).nerves.includes(id)));
  $('#watermark').textContent = id;
  document.body.dataset.nerve = id;
  history.replaceState(null, '', `#${id}`);
  renderLegend();
  renderRoute();
  renderCards();
  drawIn(svg, id);
}

function drawIn(root, id) {
  $$(`.n-${id} .seg`, root).forEach((g, i) => {
    [g.querySelector('.base'), g.querySelector('.halo')].forEach(p => {
      const len = p.getTotalLength();
      p.animate([{ strokeDasharray: `${len} ${len}`, strokeDashoffset: len }, { strokeDasharray: `${len} ${len}`, strokeDashoffset: 0 }],
        { duration: 1100, delay: i * 110, easing: 'cubic-bezier(.65,.05,.25,1)', fill: 'backwards' });
    });
  });
}

function applyHidden() {
  $$('.seg, .seg-hit').forEach(g => {
    const f = ['GSE', 'GVE', 'SVE', 'GSA', 'GVA', 'SVA', 'SSA', 'SYM'].find(k => g.classList.contains(k));
    g.classList.toggle('fiber-off', state.hidden.has(f));
  });
}

// ── spotlight from the route strip
function spot(at) {
  const s = $('#spot');
  s.classList.remove('on');
  if (!at) return;
  const [x, y] = at.split(',');
  s.setAttribute('cx', x); s.setAttribute('cy', y);
  requestAnimationFrame(() => requestAnimationFrame(() => s.classList.add('on')));   // restart pulse without forcing layout
}

// ── enlarge hover targets of thin strokes and small dots with invisible twins
const THIN = '.lig, .tend, .owall path, .chiasm path, .colliculi, .dura-wall, .fc path, .scp path, .stalk, .tent .edge, .sulcus';
const SMALL = '.xn circle, .lesion .l-ring, .porus, .vein ellipse, .ocanal, .ica-x circle:not(.hi), .trochlea ellipse, .pineal, .nucx circle, .nucx ellipse';
function padHits(root) {
  $$(THIN, root).forEach(p => {
    if (p.nextElementSibling?.classList.contains('hitp')) return;
    const c = p.cloneNode(false);
    c.removeAttribute('class'); c.removeAttribute('id'); c.classList.add('hitp');
    p.after(c);
  });
  $$(SMALL, root).forEach(el => {
    if (el.nextElementSibling?.classList.contains('hitc')) return;
    const bb = el.getBBox(), r = Math.max(bb.width, bb.height) / 2 + 7;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', bb.x + bb.width / 2); c.setAttribute('cy', bb.y + bb.height / 2); c.setAttribute('r', r);
    const tr = el.getAttribute('transform'); if (tr) c.setAttribute('transform', tr);
    if (el.dataset.tip) c.dataset.tip = el.dataset.tip;
    c.classList.add('hitc');
    el.after(c);
  });
}

// ── foramina sit on the art layer, under every fibre; give each a transparent stand-in on the
// overlay, between the fibres' hover bands and the drawn lines, so it can be hovered wherever
// the cursor isn't directly on a line (the annulus too, which is drawn as a thin ring)
function proxyForamina() {
  const layer = $('#fproxies');
  if (!layer) return;
  const shapes = [...$$('.stage-art :is(.portal, .porus, .ocanal, .crib, .fmring)'), ...$$('#stageSvg .annulus ellipse')];
  layer.innerHTML = '';
  shapes.forEach(el => {
    const tipEl = el.closest('[data-tip]');
    if (!tipEl) return;
    const c = el.cloneNode(false);
    c.removeAttribute('id');
    c.setAttribute('class', 'fproxy');
    c.dataset.tip = tipEl.dataset.tip;
    layer.appendChild(c);
  });
}

// ── pause animations of sections that are off-screen
const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting)), { rootMargin: '120px' });

// ── tooltip
const tip = $('#tip');
function tipHTML(key) {
  const d = TIPS[key];
  if (!d) return null;
  const cat = CATS[d.c] || CATS.nerve;
  return `<span class="cat" style="--cc:${cat.color}">${cat.name}</span><h4>${d.t}</h4>` +
    (d.l ? d.l.map(x => `<p>${x}</p>`).join('') : '') +
    (d.f ? `<div class="tf">${d.f.map(f => `<span style="--c:${FIBERS[f].color}">${f}</span>`).join('')}</div>` : '');
}
function showTip(el, e) {
  const html = el.dataset.tipHtml ? decodeURIComponent(el.dataset.tipHtml) : tipHTML(el.dataset.tip);
  if (!html) return hideTip();
  tip.innerHTML = html;
  tip.classList.add('on');
  moveTip(e);
}
function moveTip(e) {
  const pad = 18, w = tip.offsetWidth, h = tip.offsetHeight;
  let x = e.clientX + pad, y = e.clientY + pad;
  if (x + w > innerWidth - 8) x = e.clientX - w - pad;
  if (y + h > innerHeight - 8) y = e.clientY - h - pad;
  tip.style.transform = `translate(${x}px, ${y}px)`;
}
function hideTip() { tip.classList.remove('on'); }

// ── signature card behaviours
function bindSignature(id) {
  if (id === 'III') {
    const svg = $('#ciliarySvg');
    $$('[data-reflex]').forEach(b => b.addEventListener('click', () => {
      const near = b.dataset.reflex === 'near';
      svg.classList.remove('light', 'near'); void svg.getBBox();
      svg.classList.add(near ? 'near' : 'light');
      clearTimeout(svg._t);
      svg._t = setTimeout(() => svg.classList.remove('light', 'near'), 2600);
    }));
  }
  if (id === 'V') {
    // hovering a ring lights the matching spinal subnucleus, and vice versa
    const svg = $('#trigSvg');
    $$('[data-band]', svg).forEach(el => {
      el.addEventListener('mouseenter', () => svg.dataset.hl = el.dataset.band);
      el.addEventListener('mouseleave', () => delete svg.dataset.hl);
    });
  }
  if (id === 'VII') {
    const svg = $('#glandSvg');
    $$('[data-route]').forEach(b => b.addEventListener('click', () => {
      const r = b.dataset.route, on = svg.dataset.route !== r;
      $$('[data-route]').forEach(x => x.classList.toggle('on', on && x === b));
      on ? (svg.dataset.route = r) : delete svg.dataset.route;
    }));
  }
  if (id === 'I') {
    const svg = $('#olfSvg');
    $$('[data-orow]').forEach(b => b.addEventListener('click', () => {
      svg.dataset.row = b.dataset.orow;
      $$('[data-orow]').forEach(x => x.classList.toggle('on', x === b));
    }));
  }
  if (id === 'II') {
    const svg = $('#pupSvg');
    $$('[data-plight]').forEach(b => b.addEventListener('click', () => {
      svg.dataset.light = b.dataset.plight;
      $$('[data-plight]').forEach(x => x.classList.toggle('on', x === b));
    }));
    $('[data-pneur]').addEventListener('click', e => e.currentTarget.classList.toggle('on', svg.classList.toggle('neuritis')));
  }
  if (id === 'VIII') {
    // head impulse: the head snaps 20°, the eyes counter-rotate · a dead canal leaves them behind, then a catch-up saccade
    const svg = $('#vorSvg'), head = $('#vorHead'), eyes = $$('.vor-eye', svg), msg = $('#vorMsg');
    const LBL = {
      R: ['R lat. canal', 'R vest. n.', 'L VI n.', 'R III → MR', 'L LR', 'both eyes → left'],
      L: ['L lat. canal', 'L vest. n.', 'R VI n.', 'L III → MR', 'R LR', 'both eyes → right']
    };
    let loss = false, timers = [];
    const move = (el, deg, dur) => { el.style.transition = `transform ${dur}s cubic-bezier(.2,.8,.3,1)`; el.style.transform = `rotate(${deg}deg)`; };
    const turn = (dir) => {
      timers.forEach(clearTimeout); timers = [];
      const s = dir === 'R' ? 1 : -1, bad = loss && dir === 'R';
      LBL[dir].forEach((txt, i) => { $(`#vb${i + 1}`).textContent = txt; });
      svg.dataset.turn = dir;
      svg.classList.toggle('bad', bad);
      msg.textContent = '';
      move(head, 20 * s, .16);
      eyes.forEach(e => move(e, bad ? 0 : -20 * s, .16));
      if (bad) timers.push(setTimeout(() => { eyes.forEach(e => move(e, -20 * s, .06)); msg.textContent = 'catch-up saccade'; }, 420));
      timers.push(setTimeout(() => { move(head, 0, .7); eyes.forEach(e => move(e, 0, .7)); }, 1700));
      timers.push(setTimeout(() => { delete svg.dataset.turn; }, 2400));
    };
    $$('[data-vturn]').forEach(b => b.addEventListener('click', () => turn(b.dataset.vturn)));
    $('[data-vloss]').addEventListener('click', e => { loss = !loss; e.currentTarget.classList.toggle('on', loss); svg.classList.toggle('loss', loss); });
  }
  if (id === 'IX') {
    const svg = $('#baroSvg');
    $('[data-baro]').addEventListener('click', e => {
      const on = svg.classList.toggle('massage');
      e.currentTarget.classList.toggle('on', on);
      $('#bpm').textContent = on ? '56 bpm' : '72 bpm';
    });
  }
  if (id === 'X') {
    const svg = $('#foldSvg');
    $$('[data-fold]').forEach(b => b.addEventListener('click', () => {
      svg.dataset.state = b.dataset.fold;
      $$('[data-fold]').forEach(x => x.classList.toggle('on', x === b));
    }));
    $('[data-lrln]').addEventListener('click', e => e.currentTarget.classList.toggle('on', svg.classList.toggle('palsy')));
  }
  if (id === 'XI') {
    const svg = $('#xiSvg');
    $$('[data-xil]').forEach(b => b.addEventListener('click', () => {
      const on = svg.dataset.les !== b.dataset.xil;
      on ? (svg.dataset.les = b.dataset.xil) : delete svg.dataset.les;
      $$('[data-xil]').forEach(x => x.classList.toggle('on', on && x === b));
    }));
  }
  if (id === 'XII') {
    // each genioglossus pushes forward + toward the opposite side; drop one and the sum swings to the lesion
    const paint = (lesion) => {
      const dev = lesion ? -40 : 0;
      $('#ggTongue').setAttribute('d', `M180,232 C176,170 ${196 + dev},${70} ${235 + dev},${54} C${274 + dev},${70} 294,170 290,232 Z`);
      $('#ggMid').setAttribute('d', `M235,232 C235,180 ${235 + dev * 0.6},${110} ${235 + dev},${62}`);
      $('#ggR').classList.toggle('lost', lesion);
      $('#ggS path').setAttribute('d', lesion ? 'M235,214 L185,96' : 'M235,214 L235,90');
    };
    paint(false);
    $('[data-gg]').addEventListener('click', e => paint(e.currentTarget.classList.toggle('on')));
  }
  if (id === 'VI') {
    const vi = $('#sagVI'), stem = $('#sagStem'), arrows = $('#icpArrows');
    let k = 0, target = 0, raf;
    const paint = () => {
      const d = SAG_VI(-12 * k, 18 * k);
      vi.querySelectorAll('path').forEach(p => p.setAttribute('d', d));
      stem.style.transform = `translate(${-12 * k}px, ${18 * k}px)`;
      vi.classList.toggle('stretched', k > 0.5);
      arrows.style.opacity = k;
    };
    paint();
    $('[data-icp]').addEventListener('click', e => {
      target = target ? 0 : 1;
      e.currentTarget.classList.toggle('on', !!target);
      cancelAnimationFrame(raf);
      const step = () => { k += (target - k) * 0.09; if (Math.abs(target - k) < 0.002) k = target; paint(); if (k !== target) raf = requestAnimationFrame(step); };
      step();
    });
  }
}

// ── wiring
let hoveredNerve = null;
function bind() {
  document.addEventListener('click', e => {
    const sel = e.target.closest('[data-select]');
    if (sel) { select(sel.dataset.select); [Fibres, Olfaction, Sight, Hearing, Taste, Passages, Abbr, Help].forEach(m => m.close()); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) { $(jump.dataset.jump).closest('.card, section').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (e.target.closest('#fibreInfo')) { Fibres.open(NERVES[state.nerve].fibers[0]); return; }
    if (e.target.closest('#olfInfo')) { Olfaction.open(); return; }
    if (e.target.closest('#sightInfo')) { Sight.open(); return; }
    if (e.target.closest('#hearInfo')) { Hearing.open(); return; }
    if (e.target.closest('#tasteInfo')) { Taste.open(); return; }
    if (e.target.closest('#abbrInfo')) { Abbr.open(); return; }
    if (e.target.closest('#helpInfo')) { Help.open(); return; }
    if (e.target.closest('#passInfo')) { Passages.open(); return; }
    const tool = e.target.closest('[data-tool]');
    if (tool) {
      const k = tool.dataset.tool;
      state[k] = !state[k];
      tool.classList.toggle('on', state[k]);
      document.body.classList.toggle(`no-${k}`, !state[k]);
      document.body.classList.toggle('isolate', state.isolate);
      return;
    }
    const fc = e.target.closest('[data-fiber]');
    if (fc) {
      const f = fc.dataset.fiber;
      state.hidden.has(f) ? state.hidden.delete(f) : state.hidden.add(f);
      fc.classList.toggle('muted', state.hidden.has(f));
      applyHidden();
      return;
    }
    const st = e.target.closest('.stn');
    if (st) { spot(st.dataset.at); $('.stage-wrap').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-tip],[data-tip-html]');
    el ? showTip(el, e) : hideTip();
    // a hover band stands in for its nerve
    const band = e.target.closest('#stageSvg .nv-h');
    const nv = e.target.closest('#stageSvg .nv') || (band && $(`#stageSvg .nv[data-nerve="${band.dataset.nerve}"]`));
    if (nv !== hoveredNerve) {
      hoveredNerve?.classList.remove('hov');
      nv?.classList.add('hov');
      $('#stageSvg').classList.toggle('hovering', !!nv);
      hoveredNerve = nv;
    }
    const st = e.target.closest('.stn');
    if (st) spot(st.dataset.at);
  });
  document.addEventListener('mousemove', e => { if (tip.classList.contains('on')) moveTip(e); });
  $('#route').addEventListener('mouseleave', () => spot(null));
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;           // typing in a search box, not navigating
    if (e.key === '/') { e.preventDefault(); Abbr.open(); return; }
    if (e.key === '?') { e.preventDefault(); Help.open(); return; }
    const ids = Object.keys(NERVES), i = ids.indexOf(state.nerve);
    if (e.key === 'ArrowRight') select(ids[(i + 1) % ids.length]);
    if (e.key === 'ArrowLeft') select(ids[(i + ids.length - 1) % ids.length]);
  });
}

function init() {
  $('#defs').innerHTML = DEFS;
  renderPicker();
  renderMini();
  renderTools();
  renderShapeKey();
  $$('.stage-wrap, .card').forEach(el => io.observe(el));
  bind();
  const fromHash = location.hash.slice(1);
  select(NERVES[fromHash] ? fromHash : 'III');
}

init();
