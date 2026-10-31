// ─────────────────────────────────────────────────────────────
//  Foramina, ganglia & passenger fibres popup: what goes through each
//  opening, who synapses in each ganglion, who just rides along.
// ─────────────────────────────────────────────────────────────

const Passages = (() => {
  // ── 1. foramina · pos = spot on the skull-base map (null = outside the skull)
  // items: [structure, fibre types (or [] for vessels), note]
  const FORAMINA = {
    crib: { name: 'Cribriform plate', bone: 'ethmoid · anterior fossa', pos: 'crib',
      items: [['Olfactory fila (I)', ['SVA'], 'receptor axons → bulb'], ['Anterior ethmoidal nerve (V1)', ['GSA'], 'back down into the nose'], ['Anterior ethmoidal vessels', [], '']],
      note: 'Fracture → anosmia + CSF rhinorrhoea.' },
    optic: { name: 'Optic canal', bone: 'lesser wing of sphenoid', pos: 'optic',
      items: [['Optic nerve (II)', ['SSA'], 'in its dural sheath'], ['Ophthalmic artery', [], 'below the nerve'], ['Sympathetic plexus on the artery', ['SYM'], '']],
      note: 'Canal fracture or tumour → monocular blindness with an RAPD.' },
    sof: { name: 'Superior orbital fissure', bone: 'between greater and lesser wings', pos: 'sof',
      items: [['Inside the annulus', [], ''], ['III · superior & inferior divisions', ['GSE', 'GVE'], 'GVE in the inferior division'], ['Nasociliary nerve (V1)', ['GSA'], ''], ['VI', ['GSE'], ''], ['Sympathetic root of the ciliary ganglion', ['SYM'], ''],
        ['Outside the annulus', [], ''], ['IV', ['GSE'], ''], ['Frontal & lacrimal nerves (V1)', ['GSA'], ''], ['Superior ophthalmic vein', [], '']],
      note: 'A lesion here → ophthalmoplegia + forehead numbness (superior orbital fissure syndrome); add II and it is the orbital apex.' },
    rotundum: { name: 'Foramen rotundum', bone: 'greater wing of sphenoid', pos: 'rotundum',
      items: [['Maxillary nerve (V2)', ['GSA'], '→ pterygopalatine fossa']],
      note: 'The only content is V2.' },
    ovale: { name: 'Foramen ovale', bone: 'greater wing of sphenoid', pos: 'ovale',
      items: [['Mandibular nerve (V3)', ['GSA', 'SVE'], 'sensory + motor roots'], ['Lesser petrosal nerve (IX)', ['GVE'], 'preganglionic → otic ganglion, just below'], ['Accessory meningeal artery', [], ''], ['Emissary vein', [], '']],
      note: 'The otic ganglion sits just below it, on the medial side of V3.' },
    spinosum: { name: 'Foramen spinosum', bone: 'greater wing of sphenoid', pos: 'spinosum',
      items: [['Middle meningeal artery', [], ''], ['Meningeal branch of V3 (nervus spinosus)', ['GSA'], 'back into the skull'], ['Sympathetic plexus on the artery', ['SYM'], '']],
      note: 'Pterion fracture tears the artery → extradural haematoma.' },
    lacerum: { name: 'Foramen lacerum', bone: 'between sphenoid, petrous and occipital', pos: 'lacerum',
      items: [['Internal carotid artery', [], 'runs across its top, not through'], ['Greater petrosal nerve (VII)', ['GVE', 'SVA'], 'joins the deep petrosal here'], ['Deep petrosal nerve', ['SYM'], 'from the carotid plexus'], ['→ nerve of the pterygoid canal', [], 'forward to the pterygopalatine ganglion']],
      note: 'Filled with cartilage in life — nothing truly passes through it.' },
    hiatus: { name: 'Hiatus for the greater petrosal nerve', bone: 'anterior face of petrous bone', pos: 'hiatus',
      items: [['Greater petrosal nerve (VII)', ['GVE', 'SVA'], 'leaves the geniculate ganglion'], ['Petrosal branch of the middle meningeal artery', [], '']],
      note: '' },
    iam: { name: 'Internal acoustic meatus', bone: 'posterior face of petrous bone', pos: 'iam',
      items: [['Facial motor root (VII)', ['SVE'], 'anterosuperior'], ['Nervus intermedius (VII)', ['GVE', 'SVA', 'GSA'], ''], ['Cochlear nerve (VIII)', ['SSA'], 'anteroinferior'], ['Superior & inferior vestibular nerves (VIII)', ['SSA'], 'posterior'], ['Labyrinthine artery', [], 'from AICA']],
      note: 'A vestibular schwannoma here takes VIII first, then VII.' },
    jugular: { name: 'Jugular foramen', bone: 'between petrous and occipital', pos: 'jugular',
      items: [['Pars nervosa', [], ''], ['IX', ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'], ''], ['Inferior petrosal sinus', [], ''],
        ['Pars vascularis', [], ''], ['X', ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'], ''], ['XI', ['SVE'], 'spinal root, back out'], ['Internal jugular vein (sigmoid sinus)', [], '']],
      note: 'Glomus tumour or fracture → Vernet syndrome (IX, X, XI).' },
    hgc: { name: 'Hypoglossal canal', bone: 'occipital, above the condyle', pos: 'hgc',
      items: [['XII', ['GSE'], ''], ['Meningeal branch of the ascending pharyngeal artery', [], ''], ['Venous plexus', [], '']],
      note: 'XII leaves alone — it is spared in jugular foramen syndromes.' },
    magnum: { name: 'Foramen magnum', bone: 'occipital', pos: 'magnum',
      items: [['Medulla → spinal cord', [], ''], ['Spinal root of XI', ['SVE'], 'climbs up beside the cord'], ['Vertebral arteries', [], ''], ['Anterior & posterior spinal arteries', [], '']],
      note: 'Coning: the tonsils herniate here and compress the medulla.' },
    stylo: { name: 'Stylomastoid foramen', bone: 'temporal · outside the skull', pos: null,
      items: [['Facial nerve (VII)', ['SVE'], 'only motor fibres are left by now'], ['Stylomastoid artery', [], '']],
      note: 'Bell’s palsy level: all facial muscles, taste and tears spared if below the chorda.' },
    ptfiss: { name: 'Petrotympanic fissure', bone: 'temporal · outside the skull', pos: null,
      items: [['Chorda tympani (VII)', ['SVA', 'GVE'], 'leaves the middle ear → joins the lingual nerve']],
      note: '' },
    ptcanal: { name: 'Pterygoid canal', bone: 'sphenoid · outside the skull', pos: null,
      items: [['Nerve of the pterygoid canal (Vidian)', ['GVE', 'SVA', 'SYM'], 'greater petrosal + deep petrosal → pterygopalatine ganglion']],
      note: '' },
    infra: { name: 'Infraorbital foramen', bone: 'maxilla · face', pos: null, items: [['Infraorbital nerve (V2)', ['GSA'], 'cheek, upper lip'], ['Infraorbital vessels', [], '']], note: 'Orbital floor fracture → numb cheek.' },
    supra: { name: 'Supraorbital foramen / notch', bone: 'frontal · face', pos: null, items: [['Supraorbital nerve (V1)', ['GSA'], 'forehead'], ['Supraorbital vessels', [], '']], note: '' },
    mental: { name: 'Mental foramen', bone: 'mandible · face', pos: null, items: [['Mental nerve (V3, from the IAN)', ['GSA'], 'chin, lower lip'], ['Mental vessels', [], '']], note: '' }
  };

  // ── 2. ganglia · rows: [origin, fibre, kind, destination, note] · kind: syn (synapses) · pass (passes through) · cell (cell bodies here)
  const GANGLIA = {
    ciliary: { name: 'Ciliary ganglion', kind: 'para', where: 'orbit, lateral to the optic nerve', rows: [
      ['III · inferior division', 'GVE', 'syn', 'short ciliary nn. → sphincter pupillae, ciliary muscle', 'from Edinger–Westphal'],
      ['V1 · nasociliary', 'GSA', 'pass', 'cornea, iris, ciliary body', 'sensory root'],
      ['SCG · carotid plexus', 'SYM', 'pass', 'ocular blood vessels', 'sympathetic root']] },
    ppg: { name: 'Pterygopalatine ganglion', kind: 'para', where: 'pterygopalatine fossa', rows: [
      ['VII · greater petrosal', 'GVE', 'syn', 'lacrimal gland (via V2 → V1), nasal & palatal glands', 'from the superior salivatory nucleus'],
      ['VII · greater petrosal', 'SVA', 'pass', 'taste from the palate', 'cell bodies in the geniculate'],
      ['SCG · deep petrosal', 'SYM', 'pass', 'vessels and glands', ''],
      ['V2 · ganglionic branches', 'GSA', 'pass', 'nose, palate, nasopharynx', 'the ganglion hangs from V2']] },
    smg: { name: 'Submandibular ganglion', kind: 'para', where: 'hanging from the lingual nerve', rows: [
      ['VII · chorda tympani', 'GVE', 'syn', 'submandibular & sublingual glands', 'from the superior salivatory nucleus'],
      ['VII · chorda tympani', 'SVA', 'pass', 'taste, anterior ⅔ of the tongue', 'stays in the lingual nerve'],
      ['V3 · lingual', 'GSA', 'pass', 'touch, anterior ⅔ of the tongue', ''],
      ['SCG · facial artery plexus', 'SYM', 'pass', 'gland vessels', '']] },
    otic: { name: 'Otic ganglion', kind: 'para', where: 'just below foramen ovale, medial to V3', rows: [
      ['IX · lesser petrosal', 'GVE', 'syn', 'auriculotemporal (V3) → parotid', 'from the inferior salivatory nucleus'],
      ['V3 · nerve to medial pterygoid', 'SVE', 'pass', 'tensor tympani, tensor veli palatini', ''],
      ['SCG · middle meningeal plexus', 'SYM', 'pass', 'parotid vessels', '']] },
    scg: { name: 'Superior cervical ganglion', kind: 'symp', where: 'neck, C2–C3, behind the carotid sheath', rows: [
      ['T1–T3 · sympathetic chain', 'SYM', 'syn', 'carotid plexuses → dilator, Müller muscle, sweat glands, vessels', 'preganglionic from the lateral horn'],
      ['Visceral pain afferents', 'GVA', 'pass', 'back to the cord', '']] },
    trig: { name: 'Trigeminal ganglion', kind: 'sens', where: 'Meckel’s cave, petrous apex', rows: [
      ['V1 · V2 · V3 → spinal & principal V', 'GSA', 'cell', 'touch, pain, temperature of the face', 'pseudo-unipolar'],
      ['V3 · motor root', 'SVE', 'pass', 'muscles of mastication', 'runs beneath the ganglion'],
      ['Jaw proprioception → mesencephalic V', 'GSA', 'pass', 'muscle spindles', 'cell bodies inside the brainstem — the exception']] },
    genic: { name: 'Geniculate ganglion', kind: 'sens', where: 'external genu of VII, petrous bone', rows: [
      ['VII · NI → solitary nucleus', 'SVA', 'cell', 'taste: anterior ⅔ tongue, palate', ''],
      ['VII · NI → spinal V', 'GSA', 'cell', 'skin of the concha', ''],
      ['VII · NI (from SSN)', 'GVE', 'pass', 'greater petrosal & chorda → synapse later', ''],
      ['VII · motor root', 'SVE', 'pass', 'facial muscles, stapedius', 'turns at the genu']] },
    ix: { name: 'IX ganglia · superior & inferior (petrosal)', kind: 'sens', where: 'in and below the jugular foramen', rows: [
      ['IX → solitary nucleus', 'SVA', 'cell', 'taste, posterior ⅓ of the tongue', 'inferior'],
      ['IX → solitary nucleus', 'GVA', 'cell', 'carotid sinus & body, pharynx', 'inferior'],
      ['IX → spinal V', 'GSA', 'cell', 'skin behind the ear', 'superior'],
      ['IX · ambiguus & ISN', 'SVE', 'pass', 'stylopharyngeus · (GVE → otic)', '']] },
    x: { name: 'X ganglia · jugular & nodose', kind: 'sens', where: 'jugular foramen · upper neck', rows: [
      ['X → spinal V', 'GSA', 'cell', 'ear canal (Arnold), dura', 'jugular (superior)'],
      ['X → solitary nucleus', 'GVA', 'cell', 'larynx, heart, lungs, gut', 'nodose (inferior)'],
      ['X → solitary nucleus', 'SVA', 'cell', 'taste, epiglottis', 'nodose'],
      ['X · ambiguus + XI cranial root', 'SVE', 'pass', 'palate, pharynx, larynx', ''],
      ['X · dorsal motor nucleus', 'GVE', 'pass', 'synapse in ganglia in the organ walls', '']] },
    viii: { name: 'Spiral & vestibular (Scarpa) ganglia', kind: 'sens', where: 'modiolus · internal acoustic meatus', rows: [
      ['VIII → cochlear nuclei', 'SSA', 'cell', 'hair cells of the cochlea', 'bipolar, spiral ganglion'],
      ['VIII → vestibular nuclei', 'SSA', 'cell', 'canals, utricle, saccule', 'bipolar, Scarpa’s ganglion']] }
  };
  const KIND = { para: 'Parasympathetic · synapse', symp: 'Sympathetic · synapse', sens: 'Sensory · cell bodies, no synapse' };

  // ── 3. shared segments · strands: [whose, fibre, post?, where to]
  const SEGMENTS = {
    lingual: { name: 'Lingual nerve (V3)', where: 'below where the chorda tympani joins', strands: [
      ['V3', 'GSA', 0, 'touch, anterior ⅔ of the tongue'], ['VII · chorda tympani', 'SVA', 0, 'taste, anterior ⅔'],
      ['VII · chorda tympani', 'GVE', 0, '→ submandibular ganglion'], ['submandibular g. (VII)', 'GVE', 1, '→ sublingual gland']] },
    auriculo: { name: 'Auriculotemporal nerve (V3)', where: 'wraps the middle meningeal artery, enters the parotid', strands: [
      ['V3', 'GSA', 0, 'temple, TMJ, ear'], ['otic g. (IX)', 'GVE', 1, '→ parotid gland'], ['SCG', 'SYM', 1, 'vessels, sweat glands']],
      note: 'After parotid surgery, regrowing parasympathetic fibres can reach sweat glands → gustatory sweating (Frey syndrome).' },
    lacrimal: { name: 'Zygomatic → lacrimal nerve (V2 → V1)', where: 'orbit, lateral wall', strands: [
      ['V2 / V1', 'GSA', 0, 'temple skin, conjunctiva'], ['pterygopalatine g. (VII)', 'GVE', 1, '→ lacrimal gland']] },
    vidian: { name: 'Nerve of the pterygoid canal', where: 'foramen lacerum → pterygopalatine fossa', strands: [
      ['VII · greater petrosal', 'GVE', 0, '→ synapse in the pterygopalatine g.'], ['VII · greater petrosal', 'SVA', 0, 'palate taste (cells in geniculate)'], ['SCG · deep petrosal', 'SYM', 1, 'passes through the pterygopalatine g.']] },
    palatine: { name: 'Greater & lesser palatine nerves (V2)', where: 'palatine canal → hard and soft palate', strands: [
      ['V2', 'GSA', 0, 'palate mucosa'], ['VII (via greater petrosal)', 'SVA', 0, 'palate taste'], ['pterygopalatine g. (VII)', 'GVE', 1, 'palatal glands']] },
    shortcil: { name: 'Short ciliary nerves', where: 'ciliary ganglion → back of the eye', strands: [
      ['ciliary g. (III)', 'GVE', 1, 'sphincter pupillae, ciliary muscle'], ['V1 · nasociliary', 'GSA', 0, 'cornea, iris'], ['SCG', 'SYM', 1, 'vessels (dilator mostly via long ciliary)']] },
    intermedius: { name: 'Nervus intermedius (VII)', where: 'brainstem → internal acoustic meatus', strands: [
      ['VII · superior salivatory', 'GVE', 0, 'tears, nasal & palatal glands, saliva'], ['VII · geniculate', 'SVA', 0, 'taste, anterior ⅔ & palate'], ['VII · geniculate', 'GSA', 0, 'skin of the concha']] },
    vagus: { name: 'Vagus below the jugular foramen', where: 'carotid sheath', strands: [
      ['X · nucleus ambiguus', 'SVE', 0, 'pharynx, larynx'], ['XI · cranial root', 'SVE', 0, 'joins X → palate, recurrent laryngeal'], ['X · dorsal motor nucleus', 'GVE', 0, 'heart, lungs, gut'],
      ['X · nodose g.', 'GVA', 0, 'viscera'], ['X · jugular g.', 'GSA', 0, 'ear canal, dura']] },
    hypoglossal: { name: 'Hypoglossal nerve in the neck', where: 'below the skull, around the carotids', strands: [
      ['XII', 'GSE', 0, 'all tongue muscles but palatoglossus'], ['C1 · spinal nerve', 'GSE', 0, 'geniohyoid, thyrohyoid, superior root of the ansa']],
      note: 'The C1 fibres only borrow XII’s sheath — they are spinal, not cranial.' },
    tympanic: { name: 'Tympanic plexus → lesser petrosal', where: 'middle ear promontory', strands: [
      ['IX · tympanic nerve', 'GVE', 0, '→ otic ganglion'], ['IX · tympanic nerve', 'GVA', 0, 'middle ear sensation'], ['SCG · caroticotympanic', 'SYM', 1, 'vessels']] }
  };

  const WHY = {
    foramina: [
      ['One nerve, one hole — mostly', 'Most foramina carry a single nerve plus a vessel. The crowded ones are where single lesions cause multi-nerve syndromes: superior orbital fissure (III, IV, V1, VI), internal acoustic meatus (VII, VIII), jugular foramen (IX, X, XI).'],
      ['Openings outside the skull', 'Several nerves leave the skull and then pass through second openings — stylomastoid foramen, petrotympanic fissure, pterygoid canal, infraorbital and mental foramina. A lesion’s level tells you which branches are already gone.'],
      ['Vessels travel too', 'Arteries bring their sympathetic plexus with them — the optic canal, foramen spinosum and carotid canal are routes for SYM fibres as much as for blood.']
    ],
    ganglia: [
      ['Two kinds of ganglion', 'Sensory ganglia hold cell bodies — pseudo-unipolar (bipolar in VIII) — and nothing synapses there. Autonomic ganglia are relay stations: preganglionic fibres synapse on the cells that send postganglionic fibres on.'],
      ['Four parasympathetic ganglia, three nerves', 'III → ciliary · VII → pterygopalatine and submandibular · IX → otic. X has no named head ganglion: it synapses in tiny ganglia inside the organ walls.'],
      ['Everyone else is a passenger', 'Sympathetic postganglionic fibres (already synapsed in the superior cervical ganglion) and sensory fibres of V run straight through the parasympathetic ganglia — so cutting a ganglion’s roots is not the same as cutting its parasympathetics.']
    ],
    shared: [
      ['V is the highway', 'Trigeminal branches reach every gland and the eye, so postganglionic parasympathetics leave their ganglia and hitch rides on them — the lacrimal nerve, auriculotemporal, palatine and short ciliary nerves.'],
      ['Taste rides with touch', 'Chorda tympani taste joins the lingual nerve, and palatal taste runs in palatine branches of V2. A lingual nerve injury takes touch and taste together; a chorda lesion takes taste alone.'],
      ['Misdirected regrowth', 'When shared nerves regrow, fibres can find the wrong target: Frey syndrome (sweating when eating), “crocodile tears” after a facial palsy (tears when eating), synkinesis.']
    ]
  };

  let fid = 'sof', gid = 'ciliary', sid = 'lingual', built = false;

  const chip = (f) => `<span class="fc-chip ${f === 'SYM' ? 'sym' : ''}" style="--c:${FIBERS[f].color}">${f}</span>`;
  const stack = (id, entries) => `<div class="fg-stack" id="${id}">${entries.map(([k, html]) => `<div class="fg-v" data-k="${k}">${html}</div>`).join('')}</div>`;
  const show = (id, k) => document.querySelectorAll(`#${id} > .fg-v`).forEach(v => v.classList.toggle('on', v.dataset.k === k));

  // ── 1. skull base, right half from above · front up, midline on the left (viewBox 0 0 520 360)
  const SPOTS = {
    crib: '<rect x="40" y="44" width="22" height="70" rx="9" class="portal"/>',
    optic: '<circle cx="84" cy="128" r="8" class="portal"/>',
    sof: '<path class="portal" d="M100,142 C130,140 170,130 214,112 L210,124 C170,142 130,152 102,154 Z"/>',
    rotundum: '<circle cx="122" cy="178" r="8" class="portal"/>',
    ovale: '<ellipse cx="164" cy="214" rx="9" ry="13" transform="rotate(20 164 214)" class="portal"/>',
    spinosum: '<circle cx="194" cy="232" r="5" class="portal"/>',
    lacerum: '<ellipse cx="92" cy="244" rx="14" ry="10" class="portal"/>',
    hiatus: '<path class="portal" d="M226,222 L250,214 L253,221 L229,229 Z"/>',
    iam: '<ellipse cx="240" cy="272" rx="13" ry="10" class="portal"/>',
    jugular: '<ellipse cx="262" cy="306" rx="18" ry="12" class="portal"/>',
    hgc: '<circle cx="168" cy="322" r="7" class="portal"/>',
    magnum: '<path class="portal" d="M30,300 C70,300 96,320 96,344 L30,344 Z"/>'
  };
  function mapSVG() {
    const floor = 'M30,18 C140,14 262,28 334,70 C424,122 476,202 476,262 C472,322 404,352 302,352 L30,352 Z';
    // reuse the stage's hover notes for each opening
    const tip = { crib: 'cribriform', optic: 'optic-canal', jugular: 'jf', hgc: 'hgc', magnum: 'fmag' };
    const spots = Object.entries(SPOTS).map(([k, s]) => `<g class="fg-spot" data-f="${k}" data-tip="${tip[k] || k}">${s}</g>`).join('');
    return `
    <svg viewBox="0 0 520 360" class="fg-map" id="fgMap">
      <path d="${floor}" class="bone floor"/><path d="${floor}" fill="url(#boneDots)"/>
      <path class="ridge" d="M56,122 C140,104 240,92 334,76"/><path class="ridge" d="M120,262 C220,238 330,214 452,196"/>
      <path class="fg-mid" d="M30,10 L30,356"/>
      ${spots}
      <g class="labels">
        ${t(66, 38, 'CRIBRIFORM', 'start')}${t(97, 132, 'OPTIC', 'start')}${t(222, 108, 'SOF', 'start')}${t(112, 194, 'ROTUNDUM', 'end')}
        ${t(178, 206, 'OVALE', 'start')}${t(204, 240, 'SPINOSUM', 'start')}${t(78, 266, 'LACERUM', 'start')}${t(258, 216, 'GSPN HIATUS', 'start')}
        ${t(258, 276, 'IAM', 'start')}${t(286, 310, 'JUGULAR', 'start')}${t(180, 326, 'HYPOGLOSSAL', 'start')}${t(102, 342, 'MAGNUM', 'start')}
        ${t(250, 60, 'ANTERIOR FOSSA', 'middle', 'faint')}${t(330, 160, 'MIDDLE FOSSA', 'middle', 'faint')}${t(380, 300, 'POSTERIOR FOSSA', 'middle', 'faint')}
        ${t(36, 10, '← MIDLINE', 'start', 'faint')}${t(476, 14, 'FRONT ↑', 'end', 'faint')}
      </g>
    </svg>`;
  }
  function foramenHTML(f) {
    return `<div class="fg-card">
      <h4>${f.name}</h4><div class="fg-bone">${f.bone}</div>
      <ul class="fg-items">${f.items.map(([s, fib, n]) => !fib.length && !n && /^(Inside|Outside|Pars)/.test(s)
        ? `<li class="fg-sub">${s}</li>`
        : `<li><span class="fg-chips">${fib.length ? fib.map(chip).join('') : '<span class="fc-chip vessel">other</span>'}</span><b>${s}</b>${n ? `<em>${n}</em>` : ''}</li>`).join('')}</ul>
      ${f.note ? `<p class="fg-note">${f.note}</p>` : ''}</div>`;
  }

  // ── 2. one ganglion: brain side on the left, periphery on the right
  function gangSVG(g) {
    const n = g.rows.length, H = 44 + n * 50, cy = 34 + (n - 1) * 25;   // blob centred on the rows
    const blob = g.kind === 'sens' ? 'tg' : 'ganglion';
    const rows = g.rows.map(([from, f, kind, to, note], i) => {
      const y = 34 + i * 50, cls = `fg-row ${kind}`;
      let lines;
      if (kind === 'syn') {
        lines = fib(`M260,${y} L442,${y}`, f, '') + `<circle cx="446" cy="${y}" r="5" class="fg-syn"/>` + fib(`M458,${y} L640,${y}`, f, '', 'post');
      } else if (kind === 'cell') {
        lines = fib(`M260,${y} L640,${y}`, f, '') + `<path d="M450,${y} L450,${y - 12}" class="fg-stalk"/><circle cx="450" cy="${y - 16}" r="6" class="fg-soma" style="--c:${FIBERS[f].color}"/>`;
      } else {
        lines = fib(`M260,${y} L640,${y}`, f, '', 'fg-pass');
      }
      const tag = { syn: 'synapses here', pass: 'passes through', cell: 'cell bodies here' }[kind];
      return `<g class="${cls}">${lines}
        <text x="250" y="${y - 4}" class="fg-from">${from}</text><text x="250" y="${y + 11}" class="fg-ft">${f} · ${tag}</text>
        ${note ? `<text x="650" y="${y - 4}" class="fg-to">${to}</text><text x="650" y="${y + 11}" class="fg-tn">${note}</text>`
               : `<text x="650" y="${y + 4}" class="fg-to">${to}</text>`}</g>`;
    }).join('');
    return `
    <svg viewBox="0 0 900 ${H}" class="fg-gsvg">
      <ellipse cx="450" cy="${cy}" rx="54" ry="${Math.max(36, n * 24)}" class="${blob} fg-blob"/>
      <text x="250" y="14" class="fg-hd">BRAIN SIDE · ORIGIN</text><text x="650" y="14" class="fg-hd" style="text-anchor:start">PERIPHERY · TARGET</text>
      ${rows}
    </svg>`;
  }
  function gangHTML(g) {
    return `<div class="fg-gh"><b>${g.name}</b><span class="fg-kind ${g.kind}">${KIND[g.kind]}</span><span class="fg-where">${g.where}</span></div>${gangSVG(g)}`;
  }

  // ── 3. a shared nerve segment drawn as a cable of coloured strands
  function cableHTML(s) {
    const n = s.strands.length, H = 24 + n * 34;
    const strands = s.strands.map(([who, f, post, to], i) => {
      const y = H / 2 + (i - (n - 1) / 2) * 34;                     // strands centred in the cable
      return `${fib(`M250,${y} L650,${y}`, f, '', post ? 'post' : '')}
        <text x="240" y="${y + 4}" class="fg-from">${who}</text>
        <text x="660" y="${y - 2}" class="fg-to">${to}</text><text x="660" y="${y + 12}" class="fg-ft" style="text-anchor:start">${f}${post ? ' · postganglionic' : ''}</text>`;
    }).join('');
    return `<div class="fg-gh"><b>${s.name}</b><span class="fg-where">${s.where}</span></div>
      <svg viewBox="0 0 900 ${H}" class="fg-gsvg">
        <rect x="268" y="4" width="364" height="${H - 8}" rx="${Math.min(40, (H - 8) / 2)}" class="fg-cable"/>
        ${strands}
      </svg>${s.note ? `<p class="fg-note">${s.note}</p>` : ''}`;
  }

  function build() {
    const fChip = (k) => `<button class="ab-cat" data-fo="${k}">${FORAMINA[k].name}</button>`;
    const outside = Object.keys(FORAMINA).filter(k => !FORAMINA[k].pos);
    const gGroup = (kind, label) => `<div class="fg-grp"><span class="cg-l">${label}</span>${Object.entries(GANGLIA).filter(([, g]) => g.kind === kind)
      .map(([k, g]) => `<button class="ab-cat" data-ga="${k}">${g.name.split(' ·')[0]}</button>`).join('')}</div>`;
    Info.modal('passModal', 'paTitle', `
      <h2 id="paTitle">Foramina, ganglia & passengers</h2>
      <p class="fx-lead">Where each nerve leaves the skull, where it synapses — and whose fibres are travelling inside it.</p>

      <h3><span class="ol-k">1</span>Foramina · what goes through</h3>
      <div class="fg-two">
        <div>${mapSVG()}<div class="fg-out"><span class="cg-l">Outside the skull</span>${outside.map(fChip).join('')}</div></div>
        ${stack('fgFor', Object.entries(FORAMINA).map(([k, f]) => [k, foramenHTML(f)]))}
      </div>
      ${Info.why(WHY.foramina)}

      <h3><span class="ol-k">2</span>Ganglia · who synapses, who passes</h3>
      <div class="fg-pick">${gGroup('para', 'Parasympathetic')}${gGroup('symp', 'Sympathetic')}${gGroup('sens', 'Sensory')}</div>
      <div class="fg-legend"><span><i class="lg-syn"></i>synapses here → beaded postganglionic</span><span><i class="lg-pass"></i>passes through, no synapse</span><span><i class="lg-cell"></i>cell body here (sensory)</span></div>
      ${stack('fgGang', Object.entries(GANGLIA).map(([k, g]) => [k, gangHTML(g)]))}
      ${Info.why(WHY.ganglia)}

      <h3><span class="ol-k">3</span>Shared segments · whose fibres ride where</h3>
      <div class="fg-pick"><div class="fg-grp">${Object.entries(SEGMENTS).map(([k, s]) => `<button class="ab-cat" data-se="${k}">${s.name}</button>`).join('')}</div></div>
      ${stack('fgSeg', Object.entries(SEGMENTS).map(([k, s]) => [k, cableHTML(s)]))}
      ${Info.why(WHY.shared)}`, onClick, close);
    built = true;
  }

  function onClick(e) {
    const b = e.target.closest('[data-fo], [data-f], [data-ga], [data-se]');
    if (!b) return;
    if (b.dataset.fo || b.dataset.f) fid = b.dataset.fo || b.dataset.f;
    if (b.dataset.ga) gid = b.dataset.ga;
    if (b.dataset.se) sid = b.dataset.se;
    paint();
  }

  function paint() {
    const root = document.getElementById('passModal');
    root.querySelectorAll('[data-fo]').forEach(b => b.classList.toggle('on', b.dataset.fo === fid));
    root.querySelectorAll('.fg-spot').forEach(s => s.classList.toggle('on', s.dataset.f === fid));
    root.querySelectorAll('[data-ga]').forEach(b => b.classList.toggle('on', b.dataset.ga === gid));
    root.querySelectorAll('[data-se]').forEach(b => b.classList.toggle('on', b.dataset.se === sid));
    show('fgFor', fid); show('fgGang', gid); show('fgSeg', sid);
  }

  function open() {
    if (!built) build();
    paint();
    Info.show('passModal');
  }
  function close() { Info.hide('passModal'); }

  return { open, close };
})();
