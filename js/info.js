// ─────────────────────────────────────────────────────────────
//  Shared pieces of the physiology popups (smell, sight):
//  modal shell, step player, stacked captions, explanation cards.
// ─────────────────────────────────────────────────────────────

const Info = {
  // popup shell; onClick gets every click that isn't the backdrop or ✕
  modal(id, titleId, html, onClick, onClose) {
    const el = document.createElement('div');
    el.id = id;
    el.className = 'fx-back';
    el.innerHTML = `<div class="fx-panel glass ol-panel" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
      <button class="fx-close" aria-label="Close">✕</button>${html}</div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => (e.target === el || e.target.closest('.fx-close')) ? onClose() : onClick(e));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('on')) onClose(); });
    return el;
  },
  show(id) {
    const el = document.getElementById(id);
    el.classList.add('on');
    document.body.classList.add('modal-open');
    padHits(el);
  },
  hide(id) {
    document.getElementById(id)?.classList.remove('on');
    if (!document.querySelector('.fx-back.on')) document.body.classList.remove('modal-open');
  },

  // every caption variant is rendered up front and stacked in one grid cell,
  // so a box is always as tall as its longest text and nothing below it jumps
  fillCap(id, variants) {
    document.getElementById(id).innerHTML = variants.map(([k, html]) => `<div class="ol-cv" data-k="${k}">${html}</div>`).join('');
  },
  showCap(id, k) {
    document.querySelectorAll(`#${id} .ol-cv`).forEach(v => v.classList.toggle('on', v.dataset.k === String(k)));
  },
  stepCap: (steps, n) => {
    const [tt, line] = steps[n - 1] || ['Resting', 'Pick a step, or press Play.'];
    return `<b>${n ? `${n} · ` : ''}${tt}</b><span>${line}</span>`;
  },

  // step-through diagram: svg gets on1…onK + data-cur, the matching button and caption light up
  stepper(root, svgId, capId, n, onSet = () => {}, ms = 1800) {
    let step = 0, t = null;
    const btn = () => root.querySelector('[data-play]');
    const set = (k) => {
      step = k;
      const svg = document.getElementById(svgId);
      for (let i = 1; i <= n; i++) svg.classList.toggle(`on${i}`, i <= k);
      svg.dataset.cur = k;
      root.querySelectorAll('[data-step]').forEach(b => b.classList.toggle('on', +b.dataset.step === k));
      Info.showCap(capId, k);
      onSet(k, svg);
    };
    const stop = () => {
      clearInterval(t); t = null;
      const b = btn();
      if (b) { b.classList.remove('on'); b.innerHTML = '<span>▶</span>Play'; }
    };
    const play = () => {
      const b = btn();
      b.classList.add('on'); b.innerHTML = '<span>■</span>Stop';
      set(1);
      t = setInterval(() => (step >= n ? stop() : set(step + 1)), ms);
    };
    return { set, stop, toggle: () => (t ? stop() : play()), refresh: () => set(step) };
  },
  stepBar: (steps) => `<div class="ol-bar">
      <div class="seg2 ol-steps">${steps.map((s, i) => `<button class="seg-b" data-step="${i + 1}"><b>${i + 1}</b>${s[0].replace(/<[^>]+>/g, '')}</button>`).join('')}</div>
      <button class="pill ck ol-play" data-play="1"><span>▶</span>Play</button></div>`,

  why: (blocks) => `<div class="ol-why">${blocks.map(([h, p]) => `<div><h5>${h}</h5><p>${p}</p></div>`).join('')}</div>`
};
