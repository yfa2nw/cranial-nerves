// ─────────────────────────────────────────────────────────────
//  Abbreviations popup: every abbreviation on the page, searchable
//  and filterable by category. Content lives in ABBREV (data.js).
// ─────────────────────────────────────────────────────────────

const Abbr = (() => {
  const CATS = Object.keys(ABBREV);
  const ENTRIES = CATS.flatMap(cat => ABBREV[cat].map(([a, f, n]) => ({ cat, a, f, n })));
  const plain = (s) => s.replace(/<[^>]+>/g, '');
  ENTRIES.forEach(e => { e.key = `${plain(e.a)} ${e.f} ${e.n}`.toLowerCase(); });

  let q = '', cat = 'all', built = false;

  // wrap matches in <mark>, leaving any tags (e.g. <sub>) untouched
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hl = (s) => !q ? s : s.split(/(<[^>]+>)/).map(part =>
    part.startsWith('<') ? part : part.replace(new RegExp(`(${esc(q)})`, 'gi'), '<mark>$1</mark>')).join('');

  function build() {
    const sections = CATS.map(c => `
      <section class="ab-sec" data-cat="${c}"><h4>${c}</h4><div class="ab-grid">${ENTRIES.map((e, i) => e.cat !== c ? '' :
        `<div class="ab-e" data-i="${i}"><b class="ab-a"></b><div class="ab-t"><span class="ab-f"></span><small class="ab-n"></small></div></div>`).join('')}</div></section>`).join('');
    Info.modal('abbrModal', 'abTitle', `
      <h2 id="abTitle">Abbreviations</h2>
      <p class="fx-lead">Every abbreviation used on this page.</p>
      <div class="ab-bar">
        <label class="ab-search"><i>⌕</i><input type="search" id="abQ" placeholder="Search — e.g. NTS, cochlear, channel…" autocomplete="off" spellcheck="false"></label>
        <span class="ab-count" id="abN"></span>
      </div>
      <div class="ab-cats">${['all', ...CATS].map(c => `<button class="ab-cat" data-cat="${c}">${c === 'all' ? 'All' : c}</button>`).join('')}</div>
      <div class="ab-list" id="abList">${sections}<p class="ab-empty" id="abEmpty">No abbreviation matches “<span></span>”.</p></div>`,
      onClick, close);
    document.getElementById('abQ').addEventListener('input', e => { q = e.target.value.trim(); paint(); });
    built = true;
  }

  function onClick(e) {
    const c = e.target.closest('.ab-cat');
    if (c) { cat = c.dataset.cat; paint(); document.getElementById('abList').scrollTop = 0; }
  }

  function paint() {
    const ql = q.toLowerCase();
    let shown = 0;
    document.querySelectorAll('#abbrModal .ab-e').forEach(el => {
      const e = ENTRIES[+el.dataset.i];
      const on = (cat === 'all' || e.cat === cat) && (!ql || e.key.includes(ql));
      el.hidden = !on;
      if (!on) return;
      shown++;
      el.querySelector('.ab-a').innerHTML = hl(e.a);
      el.querySelector('.ab-f').innerHTML = hl(e.f);
      el.querySelector('.ab-n').innerHTML = hl(e.n);
    });
    document.querySelectorAll('#abbrModal .ab-sec').forEach(s => { s.hidden = !s.querySelector('.ab-e:not([hidden])'); });
    document.querySelectorAll('#abbrModal .ab-cat').forEach(b => b.classList.toggle('on', b.dataset.cat === cat));
    const empty = document.getElementById('abEmpty');
    empty.hidden = shown > 0;
    empty.querySelector('span').textContent = q;
    document.getElementById('abN').textContent = `${shown} of ${ENTRIES.length}`;
  }

  function open() {
    if (!built) build();
    paint();
    Info.show('abbrModal');
    setTimeout(() => document.getElementById('abQ').focus(), 50);
  }
  function close() { Info.hide('abbrModal'); }

  return { open, close };
})();
