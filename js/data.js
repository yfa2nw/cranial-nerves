// ─────────────────────────────────────────────────────────────
//  Content layer: fibre types, nerves, muscles and hover notes.
//  Geometry lives in stage.js / panels.js; this file is words.
// ─────────────────────────────────────────────────────────────

const FIBERS = {
  GSE: { name: 'General somatic efferent',  role: 'Skeletal motor',             color: '#ff5f87' },
  GVE: { name: 'General visceral efferent', role: 'Parasympathetic',            color: '#ffb547' },
  SVE: { name: 'Special visceral efferent', role: 'Branchial motor',            color: '#b78cff' },
  GSA: { name: 'General somatic afferent',  role: 'Touch · pain · temperature', color: '#55c6ff' },
  GVA: { name: 'General visceral afferent', role: 'Visceral sensation',         color: '#5fe0a0' },
  SVA: { name: 'Special visceral afferent', role: 'Taste',                      color: '#ffe066' },
  SSA: { name: 'Special somatic afferent',  role: 'Vision · hearing · balance', color: '#f1ece2' },
  SYM: { name: 'Sympathetic passenger',     role: 'Hitch-hiking postganglionic', color: '#9aa6bd' }
};

// Stage regions = picker groups. short = picker label (&shy; lets long names wrap evenly).
const REGIONS = [
  { id: 'smell', name: 'Special senses', sub: 'smell · sight · hearing', nerves: ['I', 'II', 'VIII'] },
  { id: 'orbit', name: 'Orbit', sub: 'eye movements · pupil',        nerves: ['III', 'IV', 'VI'] },
  { id: 'face',  name: 'Face',  sub: 'sensation · chewing · expression', nerves: ['V', 'VII'] },
  { id: 'neck',  name: 'Neck',  sub: 'swallow · voice · viscera · shrug', nerves: ['IX', 'X', 'XI', 'XII'] }
];
const SHORT_NAMES = { IX: 'Glosso&shy;pharyngeal', XII: 'Hypo&shy;glossal', III: 'Oculo&shy;motor' };

// Visual vocabulary – every structure belongs to one of these.
const CATS = {
  nucleus:  { name: 'Nucleus',       color: '#ff9fb6' },
  ganglion: { name: 'Autonomic ganglion · synapse', color: '#f2c76e' },
  sganglion:{ name: 'Sensory ganglion · no synapse', color: '#7fd0ff' },
  skin:     { name: 'Skin territory', color: '#55c6ff' },
  viscera:  { name: 'Organ · receptor', color: '#ff8fa3' },
  foramen:  { name: 'Foramen',       color: '#e3c08d' },
  muscle:   { name: 'Muscle',        color: '#e0716b' },
  gland:    { name: 'Gland',         color: '#9be38f' },
  artery:   { name: 'Artery',        color: '#ff6b6b' },
  venous:   { name: 'Venous sinus',  color: '#a98bff' },
  bone:     { name: 'Bone',          color: '#cdbf9f' },
  dura:     { name: 'Dura · ligament', color: '#c9d4e8' },
  brain:    { name: 'Neural tissue', color: '#e7c3b5' },
  nerve:    { name: 'Nerve',         color: '#ffffff' },
  eye:      { name: 'Eye',           color: '#9ad0ff' },
  lesion:   { name: 'Lesion',        color: '#ff4d4d' }
};

const NERVES = {
  I: {
    id: 'I', name: 'Olfactory', tag: 'smell · and most of flavour', region: 'smell',
    fibers: ['SVA'], passengers: [],
    section: { title: 'Bulb microcircuit', sub: 'nose → plate → bulb → tract' },
    sig: { title: 'Straight to cortex', sub: 'the only sense with no thalamic relay first' },
    stations: [
      { k: 'skin',     t: 'Olfactory epithelium', s: 'roof of the nasal cavity',  at: [990, 440] },
      { k: 'fascicle', t: 'Fila olfactoria',      s: '~20 unmyelinated bundles',  at: [948, 432] },
      { k: 'foramen',  t: 'Cribriform plate',     s: 'of the ethmoid',            at: [936, 418] },
      { k: 'nucleus',  t: 'Olfactory bulb',       s: 'synapse · mitral cells',    at: [936, 404] },
      { k: 'fascicle', t: 'Olfactory tract',      s: 'along the orbital surface', at: [820, 405] },
      { k: 'split',    t: 'Olfactory striae',     s: 'lateral · medial',          at: [740, 406] },
      { k: 'cortex',   t: 'Piriform · amygdala · entorhinal', s: 'primary olfactory cortex', at: [540, 470] },
      { k: 'cortex',   t: 'Orbitofrontal cortex', s: 'via MD thalamus · conscious smell', at: [820, 388] }
    ],
    facts: [
      { i: '⤳', t: 'Reaches cortex without a thalamic relay' },
      { i: '↻', t: 'Receptor neurons regenerate for life' },
      { i: '◐', t: 'Test each nostril — one-sided loss goes unnoticed' },
      { i: '☁', t: 'Ammonia is felt by V, not smelled by I' }
    ]
  },
  II: {
    id: 'II', name: 'Optic', tag: 'sight · and the pupil’s afferent limb', region: 'vision',
    fibers: ['SSA'], passengers: [],
    section: { title: 'Eye → optic nerve', sub: 'disc · lamina cribrosa · sheath' },
    sig: { title: 'Pupillary light reflex', sub: 'II in, III out · try an RAPD' },
    stations: [
      { k: 'skin',     t: 'Retina',               s: 'ganglion cells → optic disc',   at: [1262, 232] },
      { k: 'fascicle', t: 'Optic nerve',          s: 'a CNS tract in a dural sheath', at: [1180, 270] },
      { k: 'foramen',  t: 'Optic canal',          s: 'with the ophthalmic artery',    at: [1110, 300] },
      { k: 'cross',    t: 'Optic chiasm',         s: 'nasal fibres cross',            at: [966, 400] },
      { k: 'fascicle', t: 'Optic tract',          s: 'one hemifield each',            at: [800, 326] },
      { k: 'nucleus',  t: 'LGN',                  s: 'thalamic relay',                at: [626, 300] },
      { k: 'split',    t: "Meyer's loop · parietal", s: 'upper · lower quadrant',     at: [560, 150] },
      { k: 'cortex',   t: 'Primary visual cortex', s: 'calcarine · macula at the pole', at: [140, 330] },
      { k: 'nucleus',  t: 'Pretectum · SC · SCN', s: 'pupil · orienting · body clock', at: [566, 392] }
    ],
    facts: [
      { i: '✕', t: 'Only nasal fibres cross at the chiasm' },
      { i: '◑', t: 'Each tract carries the opposite visual field' },
      { i: '◔', t: 'Meyer’s loop = "pie in the sky"' },
      { i: '◉', t: 'Pupil fibres leave before the LGN' }
    ]
  },
  III: {
    id: 'III', name: 'Oculomotor', tag: 'lid · four movers · pupil', region: 'orbit',
    fibers: ['GSE', 'GVE'], passengers: ['GSA', 'SYM'],
    section: { title: 'Midbrain', sub: 'superior colliculus level' },
    sig: { title: 'Ciliary ganglion', sub: 'pupil · accommodation' },
    palsy: 'down & out · ptosis · mydriasis',
    stations: [
      { k: 'nucleus',  t: 'Oculomotor + EW',       s: 'midbrain · SC level',   at: [270, 168] },
      { k: 'fascicle', t: 'Through red nucleus',   s: 'and medial crus',       at: [286, 214] },
      { k: 'exit',     t: 'Interpeduncular fossa', s: 'medial crus',           at: [292, 252] },
      { k: 'cistern',  t: 'PCA ⟷ SCA',             s: 'beside PComm',          at: [395, 236] },
      { k: 'dura',     t: 'Sinus roof',            s: 'oculomotor porus',      at: [646, 226] },
      { k: 'sinus',    t: 'Lateral wall',          s: 'highest',               at: [770, 236] },
      { k: 'split',    t: 'Divides',               s: 'superior · inferior',   at: [902, 260] },
      { k: 'foramen',  t: 'SOF',                   s: 'inside annulus',        at: [1042, 420] },
      { k: 'ganglion', t: 'Ciliary ganglion',      s: 'GVE synapse',           at: [1204, 414] },
      { k: 'muscle',   t: 'SR LPS · MR IR IO',     s: '+ sphincter, ciliary',  at: [1290, 430] }
    ],
    facts: [
      { i: '◉', t: 'Pupil fibres ride on the surface' },
      { i: '⚠', t: 'PComm aneurysm → blown pupil' },
      { i: '◐', t: 'Diabetic infarct spares pupil' },
      { i: '↘', t: 'Down & out · ptosis' }
    ]
  },
  IV: {
    id: 'IV', name: 'Trochlear', tag: 'one muscle, through a pulley', region: 'orbit',
    fibers: ['GSE'], passengers: [],
    section: { title: 'Midbrain', sub: 'inferior colliculus level' },
    sig: { title: 'Dorsal exit', sub: 'decussation in the velum' },
    palsy: 'hypertropia · extorsion · head tilts away',
    stations: [
      { k: 'nucleus', t: 'Trochlear nucleus',    s: 'midbrain · IC level',   at: [270, 224] },
      { k: 'decuss',  t: 'Sup. medullary velum', s: 'total decussation',     at: [270, 188] },
      { k: 'exit',    t: 'Dorsal surface',       s: 'below inf. colliculus', at: [390, 244] },
      { k: 'cistern', t: 'Around the crus',      s: 'PCA ⟷ SCA',             at: [445, 249] },
      { k: 'dura',    t: 'Tentorial edge',       s: 'pierces near apex',     at: [612, 259] },
      { k: 'sinus',   t: 'Lateral wall',         s: 'below III',             at: [740, 276] },
      { k: 'cross',   t: 'Crosses III',          s: 'climbs above it',       at: [968, 330] },
      { k: 'foramen', t: 'SOF',                  s: 'outside annulus',       at: [1042, 345] },
      { k: 'muscle',  t: 'Superior oblique',     s: 'upper surface',         at: [1175, 325] }
    ],
    facts: [
      { i: '↥', t: 'Only nerve leaving dorsally' },
      { i: '✕', t: 'Every fibre crosses' },
      { i: '⟿', t: 'Longest intracranial course' },
      { i: '│', t: 'Thinnest cranial nerve' }
    ]
  },
  VI: {
    id: 'VI', name: 'Abducens', tag: 'pulls the eye outward', region: 'orbit',
    fibers: ['GSE'], passengers: ['SYM'],
    section: { title: 'Caudal pons', sub: 'facial colliculus level' },
    sig: { title: 'Clival climb', sub: 'toggle raised ICP' },
    palsy: 'esotropia · no abduction',
    stations: [
      { k: 'nucleus', t: 'Abducens nucleus',  s: 'pons · facial colliculus', at: [278, 418] },
      { k: 'exit',    t: 'Pontomedullary jn.', s: 'above the pyramid',       at: [290, 460] },
      { k: 'cistern', t: 'Prepontine cistern', s: 'climbs the clivus',       at: [312, 345] },
      { k: 'dura',    t: "Dorello's canal",    s: "under Gruber's lig.",      at: [598, 330] },
      { k: 'sinus',   t: 'Inside the sinus',   s: 'beside the ICA',          at: [780, 354] },
      { k: 'foramen', t: 'SOF',                s: 'inside annulus',          at: [1042, 428] },
      { k: 'muscle',  t: 'Lateral rectus',     s: 'ocular surface',          at: [1165, 437] }
    ],
    facts: [
      { i: '⟰', t: 'Long climb up the clivus' },
      { i: '⇣', t: 'False localising sign of ↑ICP' },
      { i: '◎', t: 'Free inside the sinus' },
      { i: '⇄', t: 'Nucleus = horizontal gaze centre' }
    ]
  },
  V: {
    id: 'V', name: 'Trigeminal', tag: 'face sensation · chewing', region: 'face',
    fibers: ['GSA', 'SVE'], passengers: ['GVE', 'SVA'],
    section: { title: 'Mid pons', sub: 'trigeminal root level' },
    cs: ['Cavernous sinus', 'coronal · V1 & V2 in the wall'],
    sig: { title: 'Trigeminal nuclei', sub: 'one nerve, four nuclei · hover a ring' },
    stations: [
      { k: 'nucleus',   t: 'Four nuclei',           s: 'midbrain → C2',               at: [318, 338] },
      { k: 'exit',      t: 'Lateral mid-pons',      s: 'sensory + motor roots',       at: [392, 340] },
      { k: 'cistern',   t: 'Prepontine cistern',    s: 'over the petrous apex',       at: [520, 332] },
      { k: 'sganglion', t: 'Trigeminal ganglion',   s: "Meckel's cave · no synapse",  at: [660, 330] },
      { k: 'split',     t: 'Three divisions',       s: 'V1 · V2 · V3',                at: [700, 332] },
      { k: 'foramen',   t: 'SOF · rotundum · ovale', s: 'one exit per division',      at: [888, 340] },
      { k: 'ganglion',  t: 'Hitch-hikers',          s: 'PPG · SMG carried on V',      at: [960, 402] },
      { k: 'muscle',    t: 'Mastication',           s: 'masseter · temporalis · pterygoids', at: [1280, 470] },
      { k: 'skin',      t: 'Face & mouth',          s: 'V1 · V2 · V3 territories',    at: [1400, 330] }
    ],
    facts: [
      { i: '◐', t: 'Largest cranial nerve' },
      { i: '◎', t: 'Spinal nucleus maps the face like an onion' },
      { i: '✕', t: 'Angle of the jaw is C2–C3, not V' },
      { i: '⇆', t: 'Jaw deviates toward the lesion' }
    ]
  },
  VII: {
    id: 'VII', name: 'Facial', tag: 'expression · tears · saliva · taste', region: 'face',
    fibers: ['SVE', 'GVE', 'SVA', 'GSA'], passengers: ['SYM'],
    section: { title: 'Caudal pons', sub: 'facial colliculus level' },
    cs: ['Internal acoustic meatus', 'right fundus · looking in'],
    sig: { title: 'Tears · saliva · taste', sub: 'nervus intermedius · click a route' },
    stations: [
      { k: 'nucleus',   t: 'Facial · SSN · NTS',      s: 'pons & medulla',            at: [302, 432] },
      { k: 'fascicle',  t: 'Internal genu',           s: 'loops over VI nucleus',     at: [278, 410] },
      { k: 'exit',      t: 'Cerebellopontine angle',  s: 'with VIII + intermedius',   at: [358, 460] },
      { k: 'foramen',   t: 'Internal acoustic meatus', s: 'anterosuperior quadrant',  at: [602, 472] },
      { k: 'sganglion', t: 'Geniculate ganglion',     s: 'external genu · GSPN leaves', at: [698, 418] },
      { k: 'split',     t: 'Stapedius · chorda',      s: 'in the facial canal',       at: [1052, 484] },
      { k: 'foramen',   t: 'Stylomastoid foramen',    s: 'motor fibres only now',     at: [1090, 546] },
      { k: 'gland',     t: 'Through the parotid',     s: '5 branches · no supply',    at: [1172, 508] },
      { k: 'muscle',    t: 'Facial expression',       s: '+ stapedius · post. digastric', at: [1400, 320] },
      { k: 'ganglion',  t: 'PPG · SMG',               s: 'tears · saliva',            at: [960, 402] }
    ],
    facts: [
      { i: '⌒', t: 'Central lesion spares the forehead' },
      { i: '◔', t: 'Passes through the parotid, doesn’t supply it' },
      { i: '♪', t: 'Stapedius loss → hyperacusis' },
      { i: '◇', t: 'Taste rides the chorda onto the lingual' }
    ]
  },
  VIII: {
    id: 'VIII', name: 'Vestibulocochlear', tag: 'hearing · balance', region: 'ear',
    fibers: ['SSA'], passengers: [],
    section: { title: 'Pontomedullary junction', sub: 'VIII nuclei · trapezoid body' },
    sig: { title: 'Vestibulo-ocular reflex', sub: 'head turns, eyes stay · try a head impulse' },
    stations: [
      { k: 'viscera',   t: 'Cochlea · labyrinth',         s: 'hair cells in endolymph',      at: [1180, 470] },
      { k: 'sganglion', t: 'Spiral · Scarpa ganglia',     s: 'bipolar cells · no synapse',   at: [744, 470] },
      { k: 'foramen',   t: 'Internal acoustic meatus',    s: 'with VII · labyrinthine a.',   at: [604, 476] },
      { k: 'cistern',   t: 'Cerebellopontine angle',      s: 'beside the flocculus',         at: [440, 470] },
      { k: 'exit',      t: 'Pontomedullary junction',     s: 'enters lateral to VII',        at: [388, 466] },
      { k: 'nucleus',   t: 'Cochlear · vestibular nuclei', s: 'first synapse',               at: [360, 448] },
      { k: 'cross',     t: 'Trapezoid body',              s: 'hearing goes bilateral',       at: [270, 466] },
      { k: 'fascicle',  t: 'Lateral lemniscus → IC',      s: '→ MGN → Heschl’s gyrus',       at: [360, 320] },
      { k: 'split',     t: 'MLF · spine · cerebellum',    s: 'eyes · posture · flocculus',   at: [282, 330] }
    ],
    facts: [
      { i: '⇆', t: 'Hearing is bilateral above the cochlear nuclei' },
      { i: '◎', t: 'One-sided deafness = ear, nerve or nucleus' },
      { i: '↻', t: 'Head turns, eyes stay — the VOR' },
      { i: '⚠', t: 'Normal head impulse in acute vertigo → think stroke' }
    ]
  },
  IX: {
    id: 'IX', name: 'Glossopharyngeal', tag: 'swallow · gag · parotid · carotid sinus', region: 'neck',
    fibers: ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'], passengers: [],
    section: { title: 'Rostral medulla', sub: 'olive level' },
    sig: { title: 'Carotid sinus reflex', sub: 'IX in, X out · press massage' },
    stations: [
      { k: 'nucleus',   t: 'Ambiguus · ISN · NTS',   s: 'medulla',                    at: [300, 488] },
      { k: 'exit',      t: 'Postolivary sulcus',     s: 'upper rootlets',             at: [334, 488] },
      { k: 'foramen',   t: 'Jugular foramen',        s: 'pars nervosa',               at: [770, 290] },
      { k: 'sganglion', t: 'Superior · inferior g.', s: 'inferior = petrosal',        at: [826, 296] },
      { k: 'ganglion',  t: 'Otic ganglion',          s: 'tympanic → lesser petrosal', at: [890, 196] },
      { k: 'gland',     t: 'Parotid',                s: 'via auriculotemporal (V3)',  at: [1228, 236] },
      { k: 'muscle',    t: 'Stylopharyngeus',        s: 'its only muscle',            at: [1252, 290] },
      { k: 'viscera',   t: 'Carotid sinus · body',   s: 'pressure · O₂',              at: [1318, 372] },
      { k: 'skin',      t: 'Posterior ⅓ tongue',     s: 'taste · touch · gag',        at: [1316, 262] }
    ],
    facts: [
      { i: '◖', t: 'Afferent limb of the gag reflex' },
      { i: '♥', t: 'Carotid sinus → slows the heart' },
      { i: '◔', t: 'Parotid saliva starts in IX' },
      { i: '│', t: 'Stylopharyngeus is its only muscle' }
    ]
  },
  X: {
    id: 'X', name: 'Vagus', tag: 'voice · swallow · heart · gut', region: 'neck',
    fibers: ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'], passengers: [],
    section: { title: 'Rostral medulla', sub: 'olive level' },
    sig: { title: 'Recurrent laryngeal', sub: 'loops & vocal folds · try a palsy' },
    stations: [
      { k: 'nucleus',   t: 'Ambiguus · DMN · NTS',   s: 'medulla',                  at: [290, 520] },
      { k: 'exit',      t: 'Postolivary sulcus',     s: 'middle rootlets',          at: [334, 512] },
      { k: 'foramen',   t: 'Jugular foramen',        s: 'pars vascularis',          at: [772, 322] },
      { k: 'sganglion', t: 'Jugular · nodose g.',    s: 'superior · inferior',      at: [850, 336] },
      { k: 'split',     t: 'Pharyngeal · laryngeal', s: 'palate · pharynx · larynx', at: [1272, 300] },
      { k: 'cistern',   t: 'Carotid sheath',         s: 'between ICA and IJV',      at: [1314, 460] },
      { k: 'cross',     t: 'Recurrent loops',        s: 'subclavian · aortic arch', at: [1290, 628] },
      { k: 'muscle',    t: 'Palate · pharynx · larynx', s: 'nucleus ambiguus',      at: [1352, 384] },
      { k: 'viscera',   t: 'Heart · lungs · gut',    s: 'to the splenic flexure',   at: [1350, 660] }
    ],
    facts: [
      { i: '⟲', t: 'Left RLN hooks the aortic arch' },
      { i: '⇢', t: 'Uvula deviates away from the lesion' },
      { i: '♥', t: 'Parasympathetic to heart & gut' },
      { i: '◑', t: 'Ear canal: cough when touched (Arnold)' }
    ]
  },
  XI: {
    id: 'XI', name: 'Accessory', tag: 'turn the head · shrug', region: 'neck',
    fibers: ['SVE'], passengers: [],
    section: { title: 'Upper cervical cord', sub: 'C2 · accessory nucleus' },
    sig: { title: 'Up, then down', sub: 'two muscles, two lesion levels' },
    stations: [
      { k: 'nucleus', t: 'Spinal accessory nucleus', s: 'C1–C5 ventral horn',   at: [300, 745] },
      { k: 'exit',    t: 'Lateral cord',             s: 'between the roots',    at: [318, 740] },
      { k: 'cistern', t: 'Up through foramen magnum', s: 'beside the cord',     at: [348, 700] },
      { k: 'foramen', t: 'Jugular foramen',          s: 'and back down',        at: [776, 326] },
      { k: 'muscle',  t: 'Sternocleidomastoid',      s: 'pierces it',           at: [1236, 320] },
      { k: 'split',   t: 'Posterior triangle',       s: 'superficial · exposed', at: [1180, 384] },
      { k: 'muscle',  t: 'Trapezius',                s: 'from beneath',         at: [1112, 450] }
    ],
    facts: [
      { i: '⇅', t: 'Enters the skull, then leaves it' },
      { i: '↺', t: 'Right SCM turns the head left' },
      { i: '✂', t: 'Node biopsy risk in the posterior triangle' },
      { i: '?', t: 'Cranial root is really vagal' }
    ]
  },
  XII: {
    id: 'XII', name: 'Hypoglossal', tag: 'moves the tongue', region: 'neck',
    fibers: ['GSE'], passengers: [],
    section: { title: 'Rostral medulla', sub: 'olive level' },
    sig: { title: 'Genioglossus vectors', sub: 'why the tongue points to the lesion' },
    stations: [
      { k: 'nucleus', t: 'Hypoglossal nucleus',  s: 'floor of 4th ventricle',     at: [276, 530] },
      { k: 'exit',    t: 'Preolivary sulcus',    s: 'between pyramid and olive',  at: [298, 545] },
      { k: 'foramen', t: 'Hypoglossal canal',    s: 'above the condyle',          at: [730, 384] },
      { k: 'cross',   t: 'Around the carotids',  s: 'lateral to ICA & ECA',       at: [1300, 350] },
      { k: 'split',   t: 'Above the hyoid',      s: 'on hyoglossus',              at: [1350, 330] },
      { k: 'muscle',  t: 'Tongue muscles',       s: 'all but palatoglossus (X)',  at: [1410, 270] }
    ],
    facts: [
      { i: '⇠', t: 'Tongue points toward the lesion' },
      { i: '≋', t: 'LMN: wasting + fasciculations' },
      { i: '⊂', t: 'Carries C1 fibres (ansa cervicalis)' },
      { i: '●', t: 'Pure motor' }
    ]
  }
};

// Vision card lesions. Field defects are drawn as the patient sees them (left half = left field).
// defect keys: none all leftHalf rightHalf lowerHalf ulq llq urq lrq leftSpare central blindL blindR
const VISION_LESIONS = {
  aionR: {
    chip: 'R ischaemic optic neuropathy', name: 'Right anterior ischaemic optic neuropathy', where: 'right optic disc · posterior ciliary arteries',
    LE: 'none', RE: 'lowerHalf', rapd: 'R',
    see: ['Sudden, painless loss of the lower half of the right eye’s field', 'Swollen right disc', 'RAPD on the right', 'Arteritic: headache, scalp tenderness, jaw claudication, age over 50'],
    why: ['The optic nerve head is fed by short posterior ciliary arteries in two territories, upper and lower',
          'Infarcting one territory takes the fibres from one half of the disc → an altitudinal defect, sharply edged at the horizontal',
          'Giant cell arteritis inflames these arteries: an emergency — steroids now, biopsy later, because the other eye can follow within days',
          'Non-arteritic form: small, crowded discs and vascular risk factors; no pain'],
    try: { keys: ['fieldR', 'fieldL', 'swing'], text: 'Field right, Field left, then Swinging light' }
  },
  craoR: {
    chip: 'R central retinal artery occlusion', name: 'Right central retinal artery occlusion', where: 'right central retinal artery',
    LE: 'none', RE: 'all', rapd: 'R',
    see: ['Sudden, painless, near-total loss of vision in the right eye', 'Pale retina with a cherry-red spot at the macula', 'Marked RAPD on the right'],
    why: ['The central retinal artery is an end artery — usually an embolus from the carotid or heart, or giant cell arteritis',
          'The inner retina (ganglion cells) infarcts and swells, turning white',
          'The fovea has no ganglion cells over it, so the choroid’s red still shows through: the cherry-red spot',
          'A stroke equivalent: the patient needs urgent stroke work-up'],
    try: { keys: ['fieldR', 'swing'], text: 'Field right, then Swinging light' }
  },
  neuritisR: {
    chip: 'R optic neuritis', name: 'Right optic neuritis', where: 'right optic nerve',
    LE: 'none', RE: 'central', rapd: 'R',
    see: ['Right eye: blurred centre (central scotoma), colours washed out', 'Pain on moving the eye', 'Swinging light: both pupils dilate when the light reaches the right eye (RAPD)'],
    why: ['Inflammatory demyelination of the right optic nerve — often the first sign of MS',
          'The central (macular) fibres are the most numerous and the most affected',
          'Less signal from the right eye → a weaker light reflex from that side, seen as a relative afferent defect'],
    try: { keys: ['fieldR', 'fieldL', 'swing'], text: 'Field right, Field left, then Swinging light' }
  },
  chiasm: {
    chip: 'Chiasm', name: 'Chiasmal compression', where: 'optic chiasm · from below',
    LE: 'leftHalf', RE: 'rightHalf',
    see: ['Bitemporal hemianopia: both outer fields lost', 'Bumps into things at the sides', 'Pupils normal to direct light'],
    why: ['Only the nasal fibres cross — and they carry the temporal fields',
          'A pituitary adenoma presses up into the crossing fibres',
          'Inferior crossing fibres are hit first → superior temporal quadrants go first'],
    try: { keys: ['fieldL', 'fieldR'], text: 'Field left, then Field right' }
  },
  tractR: {
    chip: 'R optic tract', name: 'Right optic tract lesion', where: 'right optic tract',
    LE: 'leftHalf', RE: 'leftHalf',
    see: ['Left homonymous hemianopia in both eyes', 'Often incongruous — the two eyes’ defects don’t match exactly'],
    why: ['After the chiasm each tract carries the opposite visual field from both eyes',
          'Fibres from the two eyes aren’t yet perfectly interleaved → incongruity',
          'Pupil fibres travel in the tract, so a subtle left RAPD can appear'],
    try: { keys: ['fieldL', 'fieldR'], text: 'Field left, then Field right' }
  },
  meyerR: {
    chip: 'R Meyer’s loop', name: "Right Meyer's loop (temporal lobe)", where: 'right temporal radiation',
    LE: 'ulq', RE: 'ulq',
    see: ['Left upper quadrant lost in both eyes — "pie in the sky"'],
    why: ['Fibres for the upper field run from the lower retina and swing forward around the temporal horn',
          'A temporal lobe lesion (tumour, surgery for epilepsy) cuts them',
          'The right side carries the left field'],
    try: { keys: ['fieldL', 'fieldR'], text: 'Field left, then Field right' }
  },
  parietalR: {
    chip: 'R parietal', name: 'Right parietal radiation', where: 'right parietal lobe',
    LE: 'llq', RE: 'llq',
    see: ['Left lower quadrant lost in both eyes — "pie on the floor"'],
    why: ['Fibres for the lower field run straight back through the parietal lobe',
          'A parietal lesion takes them, sparing Meyer’s loop'],
    try: { keys: ['fieldL', 'fieldR'], text: 'Field left, then Field right' }
  },
  occipitalR: {
    chip: 'R occipital', name: 'Right occipital (PCA stroke)', where: 'right primary visual cortex',
    LE: 'leftSpare', RE: 'leftSpare',
    see: ['Left homonymous hemianopia with the centre spared', 'Pupils and swinging light normal'],
    why: ['The macula is represented at the occipital pole, which often gets a dual blood supply (PCA + MCA)',
          'Congruous defect — the two eyes’ fibres are perfectly interleaved in cortex',
          'Pupil fibres left the pathway before the LGN, so reflexes are intact'],
    try: { keys: ['fieldL', 'fieldR', 'swing'], text: 'Field left, Field right, Swinging light' }
  },
  papilledema: {
    chip: 'Papilloedema', name: 'Papilloedema', where: 'both optic discs · raised ICP',
    LE: 'blindL', RE: 'blindR',
    see: ['Enlarged blind spots', 'Brief greying-out of vision on standing (obscurations)', 'Headache worse lying down'],
    why: ['The optic nerve sheath is continuous with the subarachnoid space',
          'Raised CSF pressure squeezes the nerve and stalls axoplasmic flow → the disc swells',
          'The swollen disc pushes retina aside → a bigger blind spot'],
    try: { keys: ['fieldL', 'fieldR'], text: 'Field left, then Field right' }
  }
};

// Hearing & balance card lesions (patient's right unless stated).
// weber: 'mid' | 'R' | 'L' (where it sounds louder) · rinne R/L: 'ok' AC > BC · 'part' AC > BC but quiet · 'no' BC > AC
// hit R/L: 'ok' eyes stay on target · 'part' small catch-up · 'no' catch-up saccade (R = turning to the right)
// nys: 'none' | 'beatsL' | 'alt' (changes with gaze) | 'attacks' · hall R/L: 'ok' | 'no' (positive)
const HEAR_LESIONS = {
  conductR: {
    chip: 'R conductive', name: 'Right conductive hearing loss', where: 'right ear canal · drum · ossicles',
    weber: 'R', rinne: { R: 'no', L: 'ok' }, hit: { R: 'ok', L: 'ok' }, nys: 'none', hall: { R: 'ok', L: 'ok' },
    see: ['Right ear muffled', 'Weber: louder in the RIGHT — the bad ear', 'Rinne right: bone louder than air (negative)', 'Balance normal'],
    why: ['Sound can’t get through the canal, drum or ossicles — wax, fluid, otosclerosis',
          'Bone conduction skips the middle ear and reaches a healthy cochlea directly',
          'The blocked ear also hears less room noise, so the fork seems louder there',
          'Cochlea and VIII are fine → no vertigo, normal head impulse'],
    try: { keys: ['weber', 'rinneR', 'rinneL'], text: 'Weber, Rinne right, Rinne left' }
  },
  schwannomaR: {
    chip: 'Vestibular schwannoma', name: 'Right vestibular schwannoma', where: 'right IAM → cerebellopontine angle',
    weber: 'L', rinne: { R: 'part', L: 'ok' }, hit: { R: 'part', L: 'ok' }, nys: 'none', hall: { R: 'ok', L: 'ok' },
    see: ['Slowly worsening right hearing, with tinnitus', 'Weber: louder in the LEFT — the good ear', 'Rinne right: air still beats bone, but quietly', 'Mild unsteadiness, rarely vertigo', 'Large: numb right cornea (V), facial weakness (VII)'],
    why: ['A benign tumour of the Schwann cells on the vestibular nerve, inside the IAM',
          'It squeezes the cochlear nerve beside it → one-sided sensorineural loss',
          'Slow growth lets the brain compensate → little vertigo',
          'Growing into the CPA it meets V and VII · bilateral tumours = NF2'],
    try: { keys: ['weber', 'rinneR', 'hitR'], text: 'Weber, Rinne right, Head impulse right' }
  },
  neuritisR: {
    chip: 'Vestibular neuritis', name: 'Right vestibular neuritis', where: 'right vestibular nerve',
    weber: 'mid', rinne: { R: 'ok', L: 'ok' }, hit: { R: 'no', L: 'ok' }, nys: 'beatsL', hall: { R: 'ok', L: 'ok' },
    see: ['Sudden constant vertigo for days, vomiting', 'Nystagmus beating LEFT — away from the bad ear', 'Head impulse to the right: catch-up saccade', 'Hearing normal'],
    why: ['Viral inflammation of the vestibular nerve — usually the superior division',
          'The right vestibular nuclei lose their resting firing; the left side wins and the eyes drift right',
          'Each drift is reset by a quick jerk left → left-beating nystagmus',
          'Turning right needs the right canal to drive the VOR — without it the eyes go with the head, then jump back'],
    try: { keys: ['gaze', 'hitR', 'hitL', 'weber'], text: 'Look ahead, Head impulse right & left, Weber' }
  },
  labyrR: {
    chip: 'Labyrinthitis', name: 'Right labyrinthitis', where: 'right inner ear',
    weber: 'L', rinne: { R: 'part', L: 'ok' }, hit: { R: 'no', L: 'ok' }, nys: 'beatsL', hall: { R: 'ok', L: 'ok' },
    see: ['The neuritis picture — vertigo, left-beating nystagmus, abnormal right head impulse', '+ right hearing loss and tinnitus', 'Weber: louder in the LEFT ear'],
    why: ['Inflammation of the whole labyrinth: cochlea and vestibular organs together',
          'The hearing loss is what separates it from vestibular neuritis'],
    try: { keys: ['weber', 'rinneR', 'gaze', 'hitR'], text: 'Weber, Rinne right, Look ahead, Head impulse right' }
  },
  menieresR: {
    chip: 'Ménière’s', name: 'Ménière’s disease (right)', where: 'right endolymphatic space',
    weber: 'L', rinne: { R: 'part', L: 'ok' }, hit: { R: 'ok', L: 'ok' }, nys: 'attacks', hall: { R: 'ok', L: 'ok' },
    see: ['Attacks of vertigo lasting 20 min to hours', 'Roaring tinnitus and fullness in the right ear', 'Low-pitch hearing loss that comes and goes, then stays', 'Between attacks the head impulse is normal'],
    why: ['Endolymphatic hydrops: too much endolymph swells the membranous labyrinth',
          'Pressure and leaks upset the hair cells → episodic vertigo',
          'The wide, floppy apex — low pitches — suffers first',
          'The nerve is intact, so the VOR is normal between attacks'],
    try: { keys: ['weber', 'rinneR', 'hitR'], text: 'Weber, Rinne right, Head impulse right' }
  },
  bppvR: {
    chip: 'BPPV', name: 'BPPV · right posterior canal', where: 'right posterior semicircular canal',
    weber: 'mid', rinne: { R: 'ok', L: 'ok' }, hit: { R: 'ok', L: 'ok' }, nys: 'none', hall: { R: 'no', L: 'ok' },
    see: ['Seconds of spinning on rolling over or looking up', 'Hallpike right: after a short delay, up-beating twisting nystagmus', 'Fades within a minute, tires on repeating', 'Everything else normal'],
    why: ['Otoconia break off the utricle and settle in the posterior canal — its lowest point when lying down',
          'Moving the head lets them sink, dragging endolymph and bending the cupula',
          'Posterior canal → eyes beat up and twist toward the lower ear',
          'The Epley manoeuvre rolls the debris back into the utricle'],
    try: { keys: ['hallR', 'hallL'], text: 'Hallpike right, then left' }
  },
  cerebellar: {
    chip: 'Cerebellar stroke', name: 'Cerebellar stroke (HINTS)', where: 'right cerebellum · PICA',
    weber: 'mid', rinne: { R: 'ok', L: 'ok' }, hit: { R: 'ok', L: 'ok' }, nys: 'alt', hall: { R: 'ok', L: 'ok' },
    see: ['Acute vertigo that looks like neuritis', 'Head impulse NORMAL both ways', 'Nystagmus changes direction with gaze', 'Can’t sit or stand unsupported', 'Sometimes one eye sits higher (skew)'],
    why: ['The VOR arc — canal, nerve, nucleus, eye muscles — is intact, so the head impulse is normal',
          'In acute vertigo, a normal head impulse is the warning sign',
          'Gaze holding (flocculus) fails → the eyes drift back from each side → direction-changing nystagmus',
          'HINTS — Head Impulse, Nystagmus, Test of Skew — beats an early MRI for posterior stroke'],
    try: { keys: ['hitR', 'hitL', 'gaze'], text: 'Head impulse right & left, Look ahead' }
  }
};

// Smell card lesions. try.keys = tests (coffeeR coffeeL ammonia flavor)
// R / L / flavor: 'ok' | 'part' | 'no'
const SMELL_LESIONS = {
  trauma: {
    chip: 'Head trauma', name: 'Traumatic anosmia', where: 'cribriform plate · both sides',
    R: 'no', L: 'no', flavor: 'no', csf: true,
    see: ['No smell from either nostril', 'Food tastes bland — flavour is mostly smell', 'Ammonia still stings', 'Clear salty drip from the nose (CSF)'],
    why: ['The brain shifts on impact and shears the fila where they pierce the cribriform plate',
          'A fracture of the plate opens a CSF leak — and a path for meningitis',
          'Ammonia works through trigeminal endings (V), which are untouched'],
    try: { keys: ['coffeeR', 'coffeeL', 'ammonia', 'flavor'], text: 'Coffee right, Coffee left, Ammonia, Flavour' }
  },
  ogm: {
    chip: 'Groove meningioma', name: 'Olfactory groove meningioma', where: 'right olfactory groove',
    R: 'no', L: 'ok', flavor: 'ok',
    see: ['Right nostril: no smell', 'Left nostril: normal — so the patient rarely notices', 'Later: personality change (frontal lobe)', 'Foster Kennedy: right optic atrophy + left papilloedema'],
    why: ['The tumour sits on the cribriform plate and flattens the bulb and tract above it',
          'One working side is enough for everyday smell → test each nostril separately',
          'Pressing on the right optic nerve and raising ICP gives the Foster Kennedy picture'],
    try: { keys: ['coffeeR', 'coffeeL'], text: 'Coffee right, then Coffee left' }
  },
  viral: {
    chip: 'Post-viral', name: 'Post-viral smell loss', where: 'olfactory epithelium · both sides',
    R: 'part', L: 'part', flavor: 'part',
    see: ['Smell reduced on both sides', 'Odours distorted while recovering (parosmia)', 'Ammonia normal'],
    why: ['The virus damages receptor neurons and their support cells in the epithelium',
          'Basal stem cells rebuild receptor neurons — most people recover over months',
          'Rewiring during recovery can mismatch odours → parosmia'],
    try: { keys: ['coffeeR', 'coffeeL', 'ammonia'], text: 'Coffee right, Coffee left, Ammonia' }
  },
  kallmann: {
    chip: 'Kallmann', name: 'Kallmann syndrome', where: 'olfactory bulbs absent · congenital',
    R: 'no', L: 'no', flavor: 'no',
    see: ['Never able to smell', 'Delayed or absent puberty'],
    why: ['GnRH neurons begin in the olfactory placode and migrate into the brain along the olfactory nerve',
          'If that migration fails, the bulbs don’t form and the hypothalamus has no GnRH',
          'Anosmia + hypogonadotropic hypogonadism'],
    try: { keys: ['coffeeR', 'coffeeL', 'flavor'], text: 'Coffee right, Coffee left, Flavour' }
  },
  neuro: {
    chip: 'Parkinson · Alzheimer', name: 'Neurodegenerative hyposmia', where: 'bulb · anterior olfactory nucleus · entorhinal',
    R: 'part', L: 'part', flavor: 'part',
    see: ['Gradual, bilateral loss — often unnoticed', 'Can precede the motor or memory symptoms by years'],
    why: ['α-synuclein (Parkinson) and tau (Alzheimer) pathology appears early in the bulb and entorhinal cortex',
          'Smell testing is being studied as an early marker'],
    try: { keys: ['coffeeR', 'coffeeL'], text: 'Coffee right, then Coffee left' }
  },
  uncinate: {
    chip: 'Uncinate seizure', name: 'Uncinate fits (olfactory aura)', where: 'right uncus · piriform cortex',
    R: 'ok', L: 'ok', flavor: 'ok', phantom: true,
    see: ['Brief smell of burning or rotting with nothing there (phantosmia)', 'Smell testing between attacks is normal', 'Often followed by a temporal-lobe seizure'],
    why: ['The uncus and piriform cortex are primary olfactory cortex',
          'A seizure focus here fires the smell pathway from the top down',
          'The nerve and bulb are healthy, so testing is normal'],
    try: { keys: ['coffeeR', 'coffeeL'], text: 'Watch the patient, then test both nostrils' }
  },
  obstruct: {
    chip: 'Nasal polyps', name: 'Conductive smell loss', where: 'nasal airway · both sides',
    R: 'part', L: 'part', flavor: 'part', block: true,
    see: ['Reduced smell on both sides', 'Better after a decongestant or steroid', 'Ammonia normal'],
    why: ['Odorants never reach the epithelium at the roof of the nose',
          'Receptors, nerve and bulb are all healthy — it’s an airflow problem',
          'Compare: neural loss doesn’t improve with decongestants'],
    try: { keys: ['coffeeR', 'coffeeL', 'ammonia'], text: 'Coffee right, Coffee left, Ammonia' }
  }
};

// Throat & neck card lesions (patient's right unless stated).
// try.keys: expressions (aah tongue shrug turnL turnR) or tests (gagR gagL carotid voice taste9)
const THROAT_LESIONS = {
  ix: {
    n: 'IX', chip: 'IX lesion', name: 'Glossopharyngeal lesion', where: 'right IX',
    see: ['Touch the right pharynx → no gag', 'Touch the left → normal gag', 'No taste on the back of the right tongue', 'Carotid massage on the right → heart rate unchanged'],
    why: ['IX carries pharyngeal sensation — the afferent limb of the gag reflex',
          'The motor limb (X) is intact, so the left side still triggers a normal gag',
          'Baroreceptor signals from the carotid sinus travel in IX to the solitary nucleus'],
    try: { keys: ['gagR', 'gagL', 'carotid', 'taste9'], text: 'Gag right, Gag left, Carotid, Taste' }
  },
  x: {
    n: 'X', chip: 'X lesion', name: 'High vagal lesion', where: 'right X above the pharyngeal branch',
    see: ['"Aah": the uvula swings to the left', 'Right palate hangs low', 'Hoarse, breathy voice', 'Gag: only the left palate rises'],
    why: ['Levator veli palatini is supplied by X; the healthy left side pulls the uvula toward itself',
          'The right recurrent laryngeal fibres are lost → right vocal fold paralysed',
          'Sensation (IX) still reaches the brainstem, but only the left motor side responds'],
    try: { keys: ['aah', 'voice', 'gagR'], text: 'Say "aah", Voice, then Gag' }
  },
  rln: {
    n: 'X', chip: 'Left RLN', name: 'Left recurrent laryngeal palsy', where: 'left RLN under the aortic arch',
    see: ['Hoarse voice', 'Palate and gag normal', 'Swallowing mostly normal'],
    why: ['The left RLN loops under the aortic arch — vulnerable to aneurysm, lung cancer, mediastinal nodes',
          'Both RLNs are at risk in thyroid surgery',
          'The pharyngeal branch leaves X high in the neck, so the palate is spared'],
    try: { keys: ['voice', 'aah'], text: 'Voice, then "aah"' }
  },
  xiPost: {
    n: 'XI', chip: 'XI · posterior triangle', name: 'Accessory nerve injury in the posterior triangle', where: 'right XI after it leaves SCM',
    see: ['Right shoulder droops', 'Weak shrug on the right', 'Head turning normal'],
    why: ['XI has already given its branch to SCM by the time it crosses the posterior triangle',
          'Here it lies just under the skin — at risk in lymph-node biopsy',
          'Trapezius alone is lost'],
    try: { keys: ['shrug', 'turnL'], text: 'Shrug, then Turn head left' }
  },
  xiJug: {
    n: 'XI', chip: 'XI · jugular foramen', name: 'Accessory nerve lesion at the skull base', where: 'right XI at the jugular foramen',
    see: ['Can’t turn the head to the LEFT strongly', 'Right shoulder droops, weak shrug'],
    why: ['The right SCM rotates the face to the opposite (left) side',
          'A lesion above the SCM branch takes both muscles'],
    try: { keys: ['turnL', 'shrug'], text: 'Turn head left, then Shrug' }
  },
  xiiL: {
    n: 'XII', chip: 'XII · LMN', name: 'Hypoglossal nerve palsy', where: 'right XII',
    see: ['Tongue points to the RIGHT when stuck out', 'Right half wasted, with fasciculations', 'Slurred "l, t, d" sounds'],
    why: ['Each genioglossus pushes the tongue forward and toward the opposite side',
          'With the right one weak, the left pushes unopposed → tip swings right',
          'Lower motor neuron loss → denervation, wasting, fasciculation'],
    try: { keys: ['tongue'], text: 'Stick out the tongue' }
  },
  xiiU: {
    n: 'XII', chip: 'XII · UMN', name: 'Central tongue weakness', where: 'left motor cortex',
    see: ['Tongue points to the RIGHT — away from the stroke', 'No wasting, no fasciculation'],
    why: ['Genioglossus is driven mainly by the opposite cortex',
          'A left cortical lesion weakens the right genioglossus',
          'Upper motor neuron lesions don’t cause wasting'],
    try: { keys: ['tongue'], text: 'Stick out the tongue' }
  },
  wallenberg: {
    n: 'X', chip: 'Lateral medulla', name: 'Lateral medullary (Wallenberg) syndrome', where: 'right lateral medulla · PICA / vertebral',
    see: ['Uvula swings left, hoarse voice, trouble swallowing', 'Right face: pain/temp loss · left body: pain/temp loss', 'Right Horner · vertigo · right limb ataxia'],
    why: ['Nucleus ambiguus (IX, X) is in the lateral medulla',
          'Spinal V nucleus and the crossed spinothalamic tract sit side by side here',
          'Descending sympathetics, vestibular nuclei and the inferior cerebellar peduncle are neighbours'],
    try: { keys: ['aah', 'voice', 'carotid'], text: 'Say "aah", Voice, Carotid' }
  },
  vernet: {
    n: 'IX', chip: 'Jugular foramen', name: 'Jugular foramen (Vernet) syndrome', where: 'right jugular foramen',
    see: ['Everything from IX and X', '+ SCM and trapezius weakness', 'Tongue normal — XII leaves by its own canal'],
    why: ['IX, X and XI share the jugular foramen',
          'Glomus tumours, metastases and skull-base fractures hit all three',
          'Add XII → Collet–Sicard; add sympathetics → Villaret'],
    try: { keys: ['gagR', 'aah', 'turnL', 'shrug', 'tongue'], text: 'Gag, "aah", Turn left, Shrug, Tongue' }
  },
  bulbar: {
    n: 'IX · X · XII', chip: 'Bulbar (LMN)', name: 'Bulbar palsy', where: 'nucleus ambiguus + XII nuclei · both sides',
    see: ['Tongue wasted and fasciculating on both sides; it barely protrudes', 'Palate hardly lifts on "aah"; uvula stays central', 'Gag weak or absent', 'Nasal, breathy voice; choking on liquids', 'Jaw jerk normal or absent'],
    why: ['Lower motor neurons of the medulla are lost on both sides — motor neurone disease (progressive bulbar palsy), Guillain–Barré, syringobulbia, myasthenia',
          'Denervated muscle wastes and fasciculates, exactly as in a one-sided XII palsy — but symmetrically, so nothing deviates',
          'The sensory limb of the gag (IX) still works; the motor limb (X) has nothing to drive',
          'The palate can’t close off the nose → nasal speech and nasal regurgitation'],
    try: { keys: ['tongue', 'aah', 'gagR', 'voice'], text: 'Tongue out, "aah", Gag, Voice' }
  },
  pseudo: {
    n: 'IX · X · XII', chip: 'Pseudobulbar (UMN)', name: 'Pseudobulbar palsy', where: 'corticobulbar tracts · both sides',
    see: ['Tongue small, stiff and slow — no wasting, no fasciculations', 'Palate weak to command, but the gag is brisk', 'Slow, strained “hot potato” speech', 'Brisk jaw jerk · laughing or crying out of proportion (emotional lability)'],
    why: ['Upper motor neurons to the bulbar nuclei are cut on both sides — bilateral strokes, motor neurone disease, MS, small-vessel disease',
          'Each bulbar nucleus gets input from both hemispheres, so one-sided lesions barely show; it takes both sides',
          'Released from cortical control, the brainstem reflexes become exaggerated — brisk gag and jaw jerk',
          'Lower motor neurons are intact, so there is spasticity, not wasting'],
    try: { keys: ['tongue', 'aah', 'gagR', 'voice'], text: 'Tongue out, "aah", Gag, Voice · compare with Bulbar' }
  }
};

// Face card lesions (all affect the patient's right face).
// try.keys = expressions (brows close smile puff jaw clench) or tests (corneal sensation taste sound tears)
const FACE_LESIONS = {
  v1: {
    n: 'V', chip: 'V1 lesion', name: 'Ophthalmic division lesion', where: 'right V1',
    see: ['Numb forehead, upper lid and bridge of the nose', 'Touch the right cornea → neither eye blinks', 'Touch the left cornea → both blink normally'],
    why: ['V1 is the afferent limb of the corneal reflex',
          'The motor limb (VII) is fine, but the signal never arrives',
          'The spinal V nucleus feeds both facial nuclei, so the normal reflex is a bilateral blink'],
    try: { keys: ['corneal', 'sensation'], text: 'Corneal on, then Sensation map' }
  },
  v3: {
    n: 'V', chip: 'V3 lesion', name: 'Mandibular division lesion', where: 'right V3 at foramen ovale',
    see: ['Jaw swings to the right on opening', 'No masseter bulge on the right when clenching', 'Numb lower lip, chin, lower jaw and temple', 'Taste is still normal'],
    why: ['The lateral pterygoids pull the jaw forward; the healthy left one is unopposed and pushes it to the right',
          'Chewing muscles are branchial motor (SVE) through the V3 motor root',
          'The chorda tympani joins the lingual nerve below the foramen, so taste is spared'],
    try: { keys: ['jaw', 'clench', 'taste'], text: 'Open jaw, Clench, then Taste' }
  },
  spinalV: {
    n: 'V', chip: 'Spinal V', name: 'Spinal trigeminal nucleus lesion', where: 'right lateral medulla',
    see: ['Right face loses pain and temperature; touch is spared', 'Loss is onion-skin shaped — the outer face first', 'Corneal reflex is weak'],
    why: ['Pain/temperature fibres descend in the spinal tract to the spinal nucleus; touch goes to the principal nucleus in the pons',
          'Perioral face maps high in the nucleus, outer face low → caudal lesions take the outer rings',
          'Part of Wallenberg syndrome (PICA) — with pain loss on the opposite body'],
    try: { keys: ['sensation', 'corneal'], text: 'Sensation map, then Corneal' }
  },
  neuralgia: {
    n: 'V', chip: 'Neuralgia', name: 'Trigeminal neuralgia', where: 'right root entry zone',
    see: ['Seconds-long electric pain in V2/V3', 'Triggered by light touch, chewing, wind', 'Examination is normal — no numbness'],
    why: ['A vascular loop (often the SCA) presses on the root as it enters the pons',
          'Local demyelination lets touch fibres cross-talk into pain fibres (ephaptic transmission)',
          'Young or bilateral → think multiple sclerosis'],
    try: { keys: ['sensation'], text: 'Sensation map — light touch triggers it' }
  },
  umn: {
    n: 'VII', chip: 'Central (UMN)', name: 'Central facial palsy', where: 'left motor cortex · corticobulbar',
    see: ['Right lower face droops — weak smile', 'Forehead wrinkles on both sides', 'Eyes close; corneal blink normal'],
    why: ['The upper-face part of the facial nucleus gets input from both cortices',
          'The lower-face part gets input only from the opposite cortex',
          'So a stroke on the left weakens only the right lower face → forehead sparing'],
    try: { keys: ['brows', 'smile'], text: 'Raise brows, then Smile' }
  },
  bell: {
    n: 'VII', chip: 'Bell · stylomastoid', name: 'Facial palsy at the stylomastoid foramen', where: 'right VII after it leaves the skull',
    see: ['Whole right face weak, forehead included', 'Right eye won’t close — the eyeball rolls up (Bell phenomenon)', 'Taste, tears and hearing normal'],
    why: ['The lesion is below every branch inside the skull → only the motor branches are lost',
          'A lower motor neuron lesion cuts the only supply to both upper and lower face',
          'The upward roll is the normal eye movement during closure, now visible'],
    try: { keys: ['brows', 'close', 'smile', 'taste'], text: 'Raise brows, Close eyes, Smile, then Taste' }
  },
  chorda: {
    n: 'VII', chip: 'Above chorda', name: 'Lesion above the chorda tympani', where: 'right mastoid segment',
    see: ['Everything in Bell palsy', '+ loss of taste on the front of the right tongue', '+ less saliva from submandibular and sublingual glands'],
    why: ['The chorda leaves the facial canal just above the stylomastoid foramen',
          'It carries taste (SVA, cell bodies in the geniculate) and preganglionic fibres to the submandibular ganglion'],
    try: { keys: ['taste', 'smile'], text: 'Taste, then Smile' }
  },
  stap: {
    n: 'VII', chip: 'Above stapedius', name: 'Lesion above the nerve to stapedius', where: 'right tympanic segment',
    see: ['Everything above', '+ hyperacusis — normal sounds painfully loud on the right'],
    why: ['Stapedius damps movement of the stapes against loud sound',
          'Its nerve leaves the canal near the second genu, above the chorda'],
    try: { keys: ['sound', 'taste'], text: 'Loud sound, then Taste' }
  },
  genic: {
    n: 'VII', chip: 'Geniculate · Ramsay Hunt', name: 'Geniculate ganglion lesion', where: 'right geniculate ganglion',
    see: ['Everything above', '+ dry right eye (no tears)', 'In Ramsay Hunt: vesicles in the ear, ± hearing loss and vertigo'],
    why: ['The greater petrosal nerve leaves at the geniculate, carrying tear-gland parasympathetics to the pterygopalatine ganglion',
          'Varicella-zoster reactivates in the geniculate ganglion',
          'VIII shares the internal acoustic meatus and can be inflamed too'],
    try: { keys: ['tears', 'sound', 'taste'], text: 'Tears, Loud sound, Taste' }
  }
};

// Extra-ocular muscles. v = direction of the H-test field, in viewer
// coordinates for the patient's RIGHT eye (abduction = viewer-left).
const MUSCLES = {
  LPS: { name: 'Levator palpebrae', n: 'III', v: [0, -0.35],     acts: ['Lid elevation'], lid: true },
  SR:  { name: 'Superior rectus',   n: 'III', v: [-0.72, -0.72], acts: ['Elevation', 'Intorsion', 'Adduction'] },
  IR:  { name: 'Inferior rectus',   n: 'III', v: [-0.72, 0.72],  acts: ['Depression', 'Extorsion', 'Adduction'] },
  MR:  { name: 'Medial rectus',     n: 'III', v: [1, 0],         acts: ['Adduction'] },
  IO:  { name: 'Inferior oblique',  n: 'III', v: [0.72, -0.72],  acts: ['Extorsion', 'Elevation', 'Abduction'] },
  SO:  { name: 'Superior oblique',  n: 'IV',  v: [0.72, 0.72],   acts: ['Intorsion', 'Depression', 'Abduction'] },
  LR:  { name: 'Lateral rectus',    n: 'VI',  v: [-1, 0],        acts: ['Abduction'] }
};

// Gaze / pupil disorders shown in the Movements card (all drawn on the patient's right).
// palsy:true entries are the nerve palsies; only the selected nerve's one gets a chip.
// see = what the eyes do · why = mechanism · try = controls to pulse (gaze "x,y", light, near) + hint text
const DISORDERS = {
  III: {
    palsy: true, name: 'Oculomotor nerve palsy', where: 'right CN III',
    see: ['Eye rests down and out', 'Lid droops over the eye (ptosis)', 'Pupil dilated, no response to light or near', 'Only outward movement remains'],
    why: ['LR (VI) and SO (IV) are now unopposed — they pull the eye out and down',
          'LPS loses its supply, so the lid falls',
          'Parasympathetic fibres to the sphincter are cut — the sympathetic dilator wins',
          'Pupil spared → ischaemic (surface fibres survive) · pupil involved → compression, e.g. PComm aneurysm'],
    try: { keys: ['-1,0', '1,0', 'light'], text: 'look right (←), look left (→), switch on Light' }
  },
  IV: {
    palsy: true, name: 'Trochlear nerve palsy', where: 'right CN IV',
    see: ['Right eye sits higher (hypertropia)', 'Worse looking down and in — reading, stairs', 'Eye twisted outward; head tilts to the left'],
    why: ['SO normally depresses the adducted eye and intorts it',
          'Without it, IO is unopposed → the eye rides up and extorts',
          'Tilting the head away lets the eyes realign their torsion and fuse the images'],
    try: { keys: ['0.72,0.72'], text: 'look down and in (↘)' }
  },
  VI: {
    palsy: true, name: 'Abducens nerve palsy', where: 'right CN VI',
    see: ['Right eye turned in (esotropia)', 'Cannot move past the midline when looking right', 'Left eye moves normally'],
    why: ['MR is unopposed, so the eye drifts inward',
          'Only the right LR is weak — the interneurons to the left MR are intact (compare VI nucleus)',
          'Long course over the petrous apex → stretched by raised ICP'],
    try: { keys: ['-1,0', 'near'], text: 'look right (←), then Near' }
  },
  ino: {
    chip: 'INO', name: 'Internuclear ophthalmoplegia', where: 'right MLF',
    see: ['Looking left: right eye won’t cross the midline', 'Left eye jerks as it abducts (nystagmus)', 'Near: both eyes converge normally', 'Looking right: normal'],
    why: ['Left gaze = left PPRF → left VI nucleus → left LR, plus interneurons that cross into the right MLF to reach the right MR',
          'Cut the right MLF and the right MR never hears the command',
          'Convergence takes a separate midbrain route, so the MR itself still works',
          'The brain boosts drive to the lagging eye; Hering’s law sends it to both eyes → abducting nystagmus'],
    try: { keys: ['1,0', 'near'], text: 'look left (→), then Near' }
  },
  onehalf: {
    chip: 'One-and-a-half', name: 'One-and-a-half syndrome', where: 'right VI nucleus + right MLF',
    see: ['Looking right: neither eye moves', 'Looking left: right eye stuck, left eye abducts with nystagmus', 'Left-eye abduction is the only horizontal movement left'],
    why: ['VI nucleus (or PPRF) lesion → right gaze palsy = the "one"',
          'Neighbouring right MLF lesion → right INO = the "half"',
          'Left VI nucleus and left LR are untouched, so the left eye can still abduct',
          'Vertical gaze and convergence are usually spared'],
    try: { keys: ['-1,0', '1,0'], text: 'look right (←), then left (→)' }
  },
  vinuc: {
    chip: 'VI nucleus', name: 'Abducens nucleus lesion', where: 'right VI nucleus',
    see: ['Looking right: both eyes stall', 'Looking left: normal', 'Often a right facial palsy too'],
    why: ['The nucleus holds LR motor neurons AND interneurons to the opposite MR',
          'Lose both → a conjugate gaze palsy, not a single-muscle palsy',
          'The facial nerve loops over the nucleus (genu) and is often hit'],
    try: { keys: ['-1,0'], text: 'look right (←) · compare with the VI palsy chip' }
  },
  parinaud: {
    chip: 'Parinaud', name: 'Dorsal midbrain syndrome', where: 'pretectum · posterior commissure',
    see: ['Cannot look up — both eyes', 'Trying to: eyes jerk inward (convergence–retraction)', 'Lids pulled up (Collier sign)', 'Pupils mid-size: light ✗ · near ✓'],
    why: ['The vertical gaze centre (riMLF, posterior commissure) is compressed — classically a pineal tumour or hydrocephalus',
          'Attempted upgaze spills into all recti at once → convergence–retraction jerks',
          'Pretectal light fibres are hit; near fibres run more ventrally and survive → light–near dissociation'],
    try: { keys: ['0,-1', 'light', 'near'], text: 'look up (↑), then Light, then Near' }
  },
  argyll: {
    chip: 'Argyll Robertson', name: 'Argyll Robertson pupils', where: 'pretectum → EW light pathway',
    see: ['Small, irregular pupils', 'No constriction to light', 'Brisk constriction to near'],
    why: ['A dorsal midbrain lesion between pretectum and Edinger–Westphal cuts the light-reflex limb',
          'Near-response fibres reach EW more ventrally and are spared',
          'Classic cause: neurosyphilis'],
    try: { keys: ['light', 'near'], text: 'Light on, then Near on' }
  },
  horner: {
    chip: 'Horner', name: 'Horner syndrome', where: 'right sympathetic chain',
    see: ['Mild lid droop (1–2 mm)', 'Small right pupil, clearest in dim light', 'Less sweating on that side of the face', 'Both pupils still react'],
    why: ['3-neuron chain: hypothalamus → T1 → superior cervical ganglion → ICA plexus',
          'Müller muscle (sympathetic) gives the last lift of the lid; LPS (III) is fine → only a small droop',
          'Dilator pupillae loses tone, so the sphincter wins',
          'The parasympathetic light and near paths are intact → reflexes preserved'],
    try: { keys: ['light'], text: 'switch on Light · compare with the III palsy chip' }
  },
  adie: {
    chip: 'Adie pupil', name: 'Adie tonic pupil', where: 'right ciliary ganglion',
    see: ['Right pupil large', 'Light: barely constricts', 'Near: constricts slowly but strongly, then re-dilates slowly', 'Often absent knee and ankle jerks (Holmes–Adie)'],
    why: ['Usually a post-viral loss of neurons in the ciliary ganglion — the postganglionic parasympathetic relay',
          'Regrowing fibres meant for the ciliary muscle (far more numerous) reach the sphincter instead',
          'Near effort drives the ciliary muscle hard, so the sphincter is pulled along — slowly, “tonically”',
          'Light–near dissociation, like Argyll Robertson — but a large, unilateral pupil instead of small, bilateral ones'],
    try: { keys: ['light', 'near'], text: 'Light on, then Near on · compare with Argyll Robertson' }
  },
  uncal: {
    chip: 'Uncal herniation', name: 'Uncal (transtentorial) herniation', where: 'right III against the tentorial edge',
    see: ['Right pupil dilated — sluggish, then fixed', 'Eye movements still nearly normal at first', 'Falling consciousness, left-sided weakness', 'Later: ptosis and a down-and-out eye'],
    why: ['A right-sided mass (haematoma, tumour, oedema) pushes the uncus over the tentorial edge',
          'It compresses III from outside — the pupil fibres run on the nerve’s surface, so they go first',
          'The midbrain is squeezed too: the right cerebral peduncle → left-sided weakness (or right-sided, if the opposite peduncle hits the tentorium — Kernohan notch)',
          'A neurosurgical emergency: a new blown pupil in a drowsy patient is herniation until proven otherwise'],
    try: { keys: ['light', '-1,0'], text: 'Light on, then look right (←) · compare with the III palsy chip' }
  },
  mg: {
    chip: 'Myasthenia gravis', name: 'Ocular myasthenia gravis', where: 'neuromuscular junction · not a nerve',
    see: ['Asymmetric ptosis, worse on the right', 'Sustained upgaze → the lids sag further (fatigue)', 'Double vision that fits no single nerve and varies', 'Pupils completely normal'],
    why: ['Antibodies against acetylcholine receptors (or MuSK) at the neuromuscular junction',
          'Each repeated contraction releases less effective transmitter → weakness grows with use',
          'Eye muscles and levator are affected first — small motor units, high firing rates',
          'The nerve and the brainstem circuit are normal — only the synapse fails; the pupil uses smooth muscle and is never involved'],
    try: { keys: ['0,-1', '-1,0', 'light'], text: 'look up and hold (↑), look right (←), then Light' }
  },
  cavsinus: {
    chip: 'Cavernous sinus', name: 'Cavernous sinus syndrome', where: 'right cavernous sinus',
    see: ['Right eye fixed in every direction (III, IV, VI)', 'Ptosis, mid-sized pupil that doesn’t react', 'Numb forehead and cheek (V1, V2)', 'Proptosis and red, swollen conjunctiva; a bruit with a fistula'],
    why: ['III, IV, V1 and V2 run in the lateral wall; VI and the sympathetic plexus lie free beside the internal carotid',
          'Thrombosis (spread from face or sinus infection), a carotid–cavernous fistula, tumour or pituitary apoplexy compress them all',
          'Both parasympathetic (III) and sympathetic fibres are lost → the pupil sits mid-sized and fixed',
          'Venous outflow from the orbit is blocked → proptosis and chemosis'],
    try: { keys: ['-1,0', '1,0', '0,-1', 'light'], text: 'look right (←), left (→), up (↑), then Light' }
  }
};

// Hover notes. c = category, t = title, l = short lines, f = fibre types.
const TIPS = {
  // ── brainstem surface
  midbrain:  { c: 'brain', t: 'Midbrain', l: ['Houses III and IV nuclei'] },
  pons:      { c: 'brain', t: 'Pons', l: ['Basilar pons · transverse fibres', 'VI nucleus sits in its dorsal floor'] },
  medulla:   { c: 'brain', t: 'Medulla oblongata', l: ['Pyramids · olives'] },
  crus:      { c: 'brain', t: 'Crus cerebri', l: ['Corticospinal & corticobulbar fibres', 'III exits on its medial side'] },
  ipf:       { c: 'brain', t: 'Interpeduncular fossa', l: ['Exit of III', 'Floor = posterior perforated substance'] },
  mamm:      { c: 'brain', t: 'Mammillary bodies' },
  chiasm:    { c: 'nerve', t: 'Optic chiasm & tracts', l: ['CN II · special sense (separate page)'], f: ['SSA'] },
  olive:     { c: 'brain', t: 'Olive', l: ['Inferior olivary nucleus'] },
  pyramid:   { c: 'brain', t: 'Pyramid', l: ['Corticospinal tract', 'VI exits just above it'] },
  mcp:       { c: 'brain', t: 'Middle cerebellar peduncle', l: ['Cut surface'] },
  cerebellum:{ c: 'brain', t: 'Cerebellum', l: ['Behind the pons'] },

  // ── nuclei
  'n-III': { c: 'nucleus', t: 'Oculomotor nuclear complex', l: ['Midbrain, superior colliculus level', 'Ventral to the periaqueductal grey', 'SR subnucleus projects contralaterally', 'LPS from one midline subnucleus (bilateral)'], f: ['GSE'] },
  'n-EW':  { c: 'nucleus', t: 'Edinger–Westphal nucleus', l: ['Preganglionic parasympathetic', 'Rostral and dorsal to the III complex'], f: ['GVE'] },
  'n-IV':  { c: 'nucleus', t: 'Trochlear nucleus', l: ['Midbrain, inferior colliculus level', 'Indents the dorsal MLF', 'Supplies the contralateral SO'], f: ['GSE'] },
  'n-VI':  { c: 'nucleus', t: 'Abducens nucleus', l: ['Dorsal caudal pons, under facial colliculus', 'Motor neurons → ipsilateral LR', 'Interneurons → MLF → contralateral MR'], f: ['GSE'] },
  'n-VII': { c: 'nucleus', t: 'Facial motor nucleus', l: ['Its axons loop over VI nucleus (internal genu)'], f: ['SVE'] },

  // ── nerve segments
  'III-fasc': { c: 'nerve', t: 'III fascicles', l: ['Run ventrally through red nucleus', 'then the medial crus'], f: ['GSE'] },
  'III':      { c: 'nerve', t: 'Oculomotor nerve', l: ['Between PCA and SCA', 'Runs beside PComm', 'Roof → lateral wall of cavernous sinus'], f: ['GSE', 'GVE'] },
  'III-gve':  { c: 'nerve', t: 'Pupillomotor fibres', l: ['Superficial, superomedial on the trunk', 'Compressed first by aneurysms', 'Leave via nerve to inferior oblique'], f: ['GVE'] },
  'III-sup':  { c: 'nerve', t: 'Superior division', l: ['Inside the annulus', 'SR, then pierces it to LPS'], f: ['GSE'] },
  'III-sup-SR':  { c: 'nerve', t: 'Branch to superior rectus', l: ['Enters ocular (under) surface'], f: ['GSE'] },
  'III-sup-LPS': { c: 'nerve', t: 'Branch to levator', l: ['Pierces or skirts SR'], f: ['GSE'] },
  'III-inf':     { c: 'nerve', t: 'Inferior division', l: ['Inside the annulus', 'MR · IR · IO + parasympathetic root'], f: ['GSE', 'GVE'] },
  'III-inf-MR':  { c: 'nerve', t: 'Branch to medial rectus', l: ['Passes beneath the optic nerve'], f: ['GSE'] },
  'III-inf-IR':  { c: 'nerve', t: 'Branch to inferior rectus', f: ['GSE'] },
  'III-inf-IO':  { c: 'nerve', t: 'Nerve to inferior oblique', l: ['Longest branch, along lateral IR', 'Gives the motor root of the ciliary ganglion'], f: ['GSE', 'GVE'] },
  'short-ciliary': { c: 'nerve', t: 'Short ciliary nerves', l: ['Postganglionic parasympathetic', 'Pierce sclera around optic nerve', 'Sphincter pupillae · ciliary muscle'], f: ['GVE', 'SYM', 'GSA'] },
  'in-globe':  { c: 'nerve', t: 'Within the globe', l: ['Between sclera & choroid', 'to iris sphincter and ciliary body'], f: ['GVE'] },
  'IV-fasc':   { c: 'nerve', t: 'IV fascicles', l: ['Curve dorsally around the aqueduct', 'Decussate in superior medullary velum'], f: ['GSE'] },
  'IV':        { c: 'nerve', t: 'Trochlear nerve', l: ['Wraps around the crus', 'Under the tentorial free edge', 'Lateral wall, below III · crosses above III', 'SOF outside the annulus'], f: ['GSE'] },
  'VI-fasc':   { c: 'nerve', t: 'VI fascicles', l: ['Ventral through tegmentum and basilar pons', 'Pass near corticospinal bundles'], f: ['GSE'] },
  'VI':        { c: 'nerve', t: 'Abducens nerve', l: ['Up the clivus in prepontine cistern', "Over petrous apex in Dorello's canal", 'Inside cavernous sinus, lateral to ICA', 'SOF inside the annulus'], f: ['GSE'] },
  'V1':        { c: 'nerve', t: 'Ophthalmic nerve (V1)', l: ['Lateral wall of cavernous sinus, below IV', 'SOF → frontal · lacrimal · nasociliary', 'Afferent limb of the corneal reflex'], f: ['GSA'] },

  // ── trigeminal (stage)
  'n-mesV':  { c: 'nucleus', t: 'Mesencephalic nucleus of V', l: ['Midbrain · proprioception from jaw muscles', 'Only primary sensory cell bodies inside the CNS', 'Afferent limb of the jaw jerk'], f: ['GSA'] },
  'n-prinV': { c: 'nucleus', t: 'Principal sensory nucleus of V', l: ['Mid pons · fine touch, pressure'], f: ['GSA'] },
  'n-motV':  { c: 'nucleus', t: 'Motor nucleus of V', l: ['Mid pons, medial to the principal nucleus', 'Muscles of mastication + 4 small ones'], f: ['SVE'] },
  'n-spV':   { c: 'nucleus', t: 'Spinal nucleus of V', l: ['Pons → C2 · pain and temperature', 'Onion-skin map: perioral rostral, outer face caudal', 'Also receives GSA from VII, IX, X'], f: ['GSA'] },
  'V-intra': { c: 'nerve', t: 'Sensory root fibres', l: ['To principal, spinal and mesencephalic nuclei'], f: ['GSA'] },
  'V-root':  { c: 'nerve', t: 'Trigeminal sensory root', l: ['Leaves the lateral mid-pons at the MCP', 'Crosses the petrous apex into Meckel’s cave'], f: ['GSA'] },
  'V-motor': { c: 'nerve', t: 'Trigeminal motor root', l: ['Passes beneath the ganglion · no synapse', 'Joins V3 only — V1 and V2 are purely sensory'], f: ['SVE'] },
  supraorb:  { c: 'nerve', t: 'Supraorbital & supratrochlear nn.', l: ['V1 · frontal nerve branches', 'Forehead and scalp to the vertex'], f: ['GSA'] },
  lacrimalN: { c: 'nerve', t: 'Lacrimal nerve (V1)', l: ['Lateral upper lid', 'Delivers VII’s secretomotor fibres to the gland'], f: ['GSA'] },
  extnasal:  { c: 'nerve', t: 'Nasociliary → external nasal', l: ['Bridge and tip of the nose', 'Tip involvement in zoster = Hutchinson sign'], f: ['GSA'] },
  'V2':      { c: 'nerve', t: 'Maxillary nerve (V2)', l: ['Lateral wall of sinus → foramen rotundum', 'Pterygopalatine fossa → infraorbital nerve', 'Purely sensory'], f: ['GSA'] },
  infraorb:  { c: 'nerve', t: 'Infraorbital nerve', l: ['Exits the infraorbital foramen', 'Lower lid · side of nose · upper lip · cheek'], f: ['GSA'] },
  zygN:      { c: 'nerve', t: 'Zygomatic nerve (V2)', l: ['Zygomaticotemporal & zygomaticofacial', 'Carries PPG fibres toward the lacrimal gland'], f: ['GSA'] },
  supAlv:    { c: 'nerve', t: 'Superior alveolar nerves', l: ['Upper teeth and gums'], f: ['GSA'] },
  palatine:  { c: 'nerve', t: 'Palatine nerves', l: ['Hard and soft palate · through the PPG'], f: ['GSA'] },
  'V3':      { c: 'nerve', t: 'Mandibular nerve (V3)', l: ['Foramen ovale → infratemporal fossa', 'The only mixed division: sensory + motor'], f: ['GSA', 'SVE'] },
  masseteric:{ c: 'nerve', t: 'Masseteric nerve', l: ['Through the mandibular notch'], f: ['SVE'] },
  deepTemp:  { c: 'nerve', t: 'Deep temporal nerves', l: ['To temporalis'], f: ['SVE'] },
  pteryN:    { c: 'nerve', t: 'Pterygoid nerves', l: ['Lateral & medial pterygoids', '+ tensor tympani, tensor veli palatini'], f: ['SVE'] },
  auriculotemp: { c: 'nerve', t: 'Auriculotemporal nerve', l: ['Splits around the middle meningeal artery', 'Temple and front of ear', 'Carries IX fibres from the otic ganglion to the parotid'], f: ['GSA'] },
  buccalN:   { c: 'nerve', t: 'Buccal nerve (V3)', l: ['Sensory to cheek skin and mucosa', 'Not the motor buccal branch of VII'], f: ['GSA'] },
  lingual:   { c: 'nerve', t: 'Lingual nerve', l: ['General sensation, anterior 2/3 tongue', 'Picks up the chorda tympani (taste + saliva)'], f: ['GSA'] },
  IAN:       { c: 'nerve', t: 'Inferior alveolar nerve', l: ['Mandibular foramen → canal → mental foramen', 'Lower teeth · chin · lower lip'], f: ['GSA'] },
  mylohyoidN:{ c: 'nerve', t: 'Nerve to mylohyoid', l: ['Mylohyoid + anterior belly of digastric'], f: ['SVE'] },
  cave:      { c: 'dura', t: "Meckel's cave", l: ['Dural pouch holding the trigeminal ganglion'] },
  rotundum:  { c: 'foramen', t: 'Foramen rotundum', l: ['V2 → pterygopalatine fossa'] },
  ovale:     { c: 'foramen', t: 'Foramen ovale', l: ['V3 + lesser petrosal nerve', 'Accessory meningeal artery'] },
  spinosum:  { c: 'foramen', t: 'Foramen spinosum', l: ['Middle meningeal artery', 'Meningeal branch of V3'] },
  lacerum:   { c: 'foramen', t: 'Foramen lacerum', l: ['GSPN + deep petrosal pass over it', '→ pterygoid (Vidian) canal'] },
  ppf:       { c: 'bone', t: 'Pterygopalatine fossa', l: ['Behind the maxilla · V2 + PPG + maxillary artery'] },
  ppg:       { c: 'ganglion', t: 'Pterygopalatine ganglion', l: ['VII parasympathetic synapse (from GSPN)', '→ lacrimal gland, nasal & palatine glands', 'Hangs from V2 · V2 fibres pass through'], f: ['GVE', 'GSA', 'SYM'] },
  smg:       { c: 'ganglion', t: 'Submandibular ganglion', l: ['VII parasympathetic synapse (from chorda)', '→ submandibular & sublingual glands', 'Hangs from the lingual nerve'], f: ['GVE'] },

  // ── facial (stage)
  'VII-genu':  { c: 'nerve', t: 'Facial motor fibres', l: ['Loop dorsally over the VI nucleus (internal genu)', 'Raise the facial colliculus'], f: ['SVE'] },
  'n-SSN':     { c: 'nucleus', t: 'Superior salivatory nucleus', l: ['Preganglionic parasympathetic for VII', 'Tears, nasal, palatine, submandibular, sublingual'], f: ['GVE'] },
  'n-NTS':     { c: 'nucleus', t: 'Nucleus of the solitary tract', l: ['Rostral (gustatory) part: taste from VII, IX, X', 'Caudal part: visceral sensation'], f: ['SVA', 'GVA'] },
  'taste-in':  { c: 'nerve', t: 'Taste fibres', l: ['Enter the solitary tract → NTS'], f: ['SVA'] },
  'VII':       { c: 'nerve', t: 'Facial nerve (motor root)', l: ['Exits the cerebellopontine angle', 'Into the internal acoustic meatus with VIII'], f: ['SVE'] },
  NI:          { c: 'nerve', t: 'Nervus intermedius', l: ['Sensory + parasympathetic root of VII', 'Between VII motor root and VIII'], f: ['GVE', 'SVA', 'GSA'] },
  'VII-canal': { c: 'nerve', t: 'Facial canal', l: ['Labyrinthine → geniculate (external genu)', 'Tympanic segment past the middle ear', 'Mastoid segment down to stylomastoid'], f: ['SVE'] },
  GSPN:        { c: 'nerve', t: 'Greater petrosal nerve', l: ['Leaves at the geniculate ganglion', 'Over foramen lacerum, joins deep petrosal', '→ pterygoid canal → PPG'], f: ['GVE'] },
  'post-lacrimal': { c: 'nerve', t: 'Postganglionic to lacrimal gland', l: ['PPG → zygomatic (V2) → lacrimal (V1)', 'Rides trigeminal branches to its target'], f: ['GVE'] },
  'post-nasal':    { c: 'nerve', t: 'Postganglionic to nasal & palatine glands', f: ['GVE'] },
  stapN:       { c: 'nerve', t: 'Nerve to stapedius', l: ['Leaves near the second genu', 'Loss → hyperacusis'], f: ['SVE'] },
  chorda:      { c: 'nerve', t: 'Chorda tympani', l: ['Leaves just above the stylomastoid foramen', 'Crosses the eardrum, out the petrotympanic fissure', 'Joins the lingual nerve: taste + saliva'], f: ['SVA', 'GVE'] },
  'post-smg':  { c: 'nerve', t: 'To submandibular gland', f: ['GVE'] },
  'post-sl':   { c: 'nerve', t: 'To sublingual gland', f: ['GVE'] },
  'VII-ext':   { c: 'nerve', t: 'Facial nerve trunk', l: ['Leaves the stylomastoid foramen', 'Enters the parotid and splits (pes anserinus)'], f: ['SVE'] },
  temporalBr:  { c: 'nerve', t: 'Temporal branch', l: ['Frontalis · upper orbicularis oculi'], f: ['SVE'] },
  zygBr:       { c: 'nerve', t: 'Zygomatic branch', l: ['Orbicularis oculi — eye closure'], f: ['SVE'] },
  buccalBr:    { c: 'nerve', t: 'Buccal branch', l: ['Zygomaticus · buccinator · upper orbicularis oris'], f: ['SVE'] },
  mandBr:      { c: 'nerve', t: 'Marginal mandibular branch', l: ['Lower lip · mentalis'], f: ['SVE'] },
  cervBr:      { c: 'nerve', t: 'Cervical branch', l: ['Platysma'], f: ['SVE'] },
  postAurBr:   { c: 'nerve', t: 'Posterior auricular branch', l: ['Auricular muscles · occipitalis'], f: ['SVE'] },
  digBr:       { c: 'nerve', t: 'Digastric & stylohyoid branches', l: ['Posterior belly of digastric · stylohyoid'], f: ['SVE'] },
  VIII:        { c: 'nerve', t: 'Vestibulocochlear nerve (VIII)', l: ['Shares the IAM with VII · see the Special senses pod'], f: ['SSA'] },
  deepPet:     { c: 'nerve', t: 'Deep petrosal nerve', l: ['Sympathetic, from the carotid plexus', 'Joins GSPN → nerve of the pterygoid canal'], f: ['SYM'] },
  geniculate:  { c: 'sganglion', t: 'Geniculate ganglion', l: ['At the external genu of the facial canal', 'Cell bodies of taste (SVA) + ear skin (GSA)', 'No synapse · GSPN leaves here'], f: ['SVA', 'GSA'] },
  iam:         { c: 'foramen', t: 'Internal acoustic meatus', l: ['VII, nervus intermedius, VIII', 'Labyrinthine artery'] },
  hiatus:      { c: 'foramen', t: 'Hiatus for the GSPN', l: ['On the front of the petrous bone'] },
  stylomastoid:{ c: 'foramen', t: 'Stylomastoid foramen', l: ['Exit of VII from the skull', 'Between styloid and mastoid processes'] },
  ptfissure:   { c: 'foramen', t: 'Petrotympanic fissure', l: ['Chorda tympani leaves the middle ear'] },
  middleEar:   { c: 'bone', t: 'Middle ear', l: ['Chorda crosses between malleus and incus'] },
  canal:       { c: 'bone', t: 'Facial canal', l: ['Bony tunnel in the petrous temporal bone', 'Swelling here is squeezed → Bell palsy'] },

  // ── face (stage)
  temporalis: { c: 'muscle', t: 'Temporalis', l: ['V3 · deep temporal nerves', 'Elevates and retracts the jaw'], f: ['SVE'] },
  masseter:   { c: 'muscle', t: 'Masseter', l: ['V3 · masseteric nerve', 'Elevates the jaw · feel it on clenching'], f: ['SVE'] },
  latPter:    { c: 'muscle', t: 'Lateral pterygoid', l: ['V3 · the only jaw opener of the four', 'Weak → jaw deviates to that side'], f: ['SVE'] },
  medPter:    { c: 'muscle', t: 'Medial pterygoid', l: ['V3 · elevates jaw, side-to-side grinding'], f: ['SVE'] },
  mylohyoid:  { c: 'muscle', t: 'Mylohyoid', l: ['V3 · floor of the mouth'], f: ['SVE'] },
  antDig:     { c: 'muscle', t: 'Anterior belly of digastric', l: ['V3 (posterior belly is VII)'], f: ['SVE'] },
  frontalis:  { c: 'muscle', t: 'Frontalis', l: ['VII · temporal branch', 'Raises brows · wrinkles forehead'], f: ['SVE'] },
  orbOculi:   { c: 'muscle', t: 'Orbicularis oculi', l: ['VII · temporal + zygomatic branches', 'Closes the eye · efferent of corneal reflex'], f: ['SVE'] },
  zygMaj:     { c: 'muscle', t: 'Zygomaticus major', l: ['VII · buccal / zygomatic branch', 'Pulls the mouth corner up — smile'], f: ['SVE'] },
  orbOris:    { c: 'muscle', t: 'Orbicularis oris', l: ['VII · buccal + marginal mandibular', 'Closes and purses the lips'], f: ['SVE'] },
  buccinator: { c: 'muscle', t: 'Buccinator', l: ['VII · buccal branch (sensation is V3 buccal n.)', 'Holds air and food off the teeth'], f: ['SVE'] },
  mentalis:   { c: 'muscle', t: 'Mentalis', l: ['VII · marginal mandibular'], f: ['SVE'] },
  platysma:   { c: 'muscle', t: 'Platysma', l: ['VII · cervical branch'], f: ['SVE'] },
  postAur:    { c: 'muscle', t: 'Posterior auricular muscle', l: ['VII · posterior auricular branch'], f: ['SVE'] },
  postDig:    { c: 'muscle', t: 'Posterior belly of digastric', l: ['VII · digastric branch'], f: ['SVE'] },
  stapedius:  { c: 'muscle', t: 'Stapedius', l: ['VII · smallest skeletal muscle', 'Damps the stapes against loud sound'], f: ['SVE'] },
  parotid:    { c: 'gland', t: 'Parotid gland', l: ['VII passes through it — does NOT supply it', 'Secretomotor: IX → otic ganglion → auriculotemporal (V3)'] },
  submand:    { c: 'gland', t: 'Submandibular gland', l: ['VII · chorda → submandibular ganglion'], f: ['GVE'] },
  sublingual: { c: 'gland', t: 'Sublingual gland', l: ['VII · chorda → submandibular ganglion'], f: ['GVE'] },
  lacrimalG:  { c: 'gland', t: 'Lacrimal gland', l: ['VII · GSPN → PPG → zygomatic → lacrimal n.'], f: ['GVE'] },
  nasalG:     { c: 'gland', t: 'Nasal & palatine glands', l: ['VII · via the pterygopalatine ganglion'], f: ['GVE'] },
  tongue:     { c: 'eye', t: 'Tongue · anterior 2/3', l: ['Touch: lingual (V3) · Taste: chorda (VII)', 'Posterior 1/3 is IX (later page)'], f: ['GSA', 'SVA'] },
  'derm-V1':  { c: 'skin', t: 'V1 territory', l: ['Forehead, scalp to vertex, upper lid, nasal bridge and tip'], f: ['GSA'] },
  'derm-V2':  { c: 'skin', t: 'V2 territory', l: ['Lower lid, cheek, side of nose, upper lip, front of temple'], f: ['GSA'] },
  'derm-V3':  { c: 'skin', t: 'V3 territory', l: ['Lower lip, chin, jaw line, temple in front of the ear', 'Spares the angle of the jaw (C2–C3)'], f: ['GSA'] },
  zygoma:     { c: 'bone', t: 'Zygomatic arch' },
  mandible:   { c: 'bone', t: 'Mandible' },
  ear:        { c: 'eye', t: 'Auricle', l: ['Small patch of concha: GSA via VII'] },
  headF:      { c: 'brain', t: 'Face · lateral view', l: ['Right side · front is right'] },

  // ── cross-sections for V / VII
  'L-latpons': { c: 'lesion', t: 'Lateral mid-pons lesion', l: ['Trigeminal nuclei / root', 'Ipsilateral face numb + weak chewing', '+ contralateral body signs if large'] },
  'L-mg':      { c: 'lesion', t: 'Millard–Gubler syndrome', l: ['Ventral caudal pons', 'Ipsilateral VI + VII palsy', 'Contralateral hemiparesis'] },
  scpF:        { c: 'brain', t: 'Superior cerebellar peduncle' },
  mesTract:    { c: 'nerve', t: 'Mesencephalic tract of V', l: ['Proprioceptive fibres from jaw muscles'], f: ['GSA'] },
  spTract:     { c: 'nerve', t: 'Spinal tract of V', l: ['Pain/temp fibres turning down toward C2'], f: ['GSA'] },
  mcpX:        { c: 'brain', t: 'Middle cerebellar peduncle', l: ['V root pierces it'] },

  // ── IAM card
  'iam-vii':  { c: 'nerve', t: 'Facial nerve', l: ['Anterosuperior quadrant — "seven up"'], f: ['SVE'] },
  'iam-ni':   { c: 'nerve', t: 'Nervus intermedius', l: ['Between VII and VIII'], f: ['GVE', 'SVA'] },
  'iam-coch': { c: 'nerve', t: 'Cochlear nerve', l: ['Anteroinferior — "Coke down"'], f: ['SSA'] },
  'iam-sv':   { c: 'nerve', t: 'Superior vestibular nerve', l: ['Posterosuperior'], f: ['SSA'] },
  'iam-iv':   { c: 'nerve', t: 'Inferior vestibular nerve', l: ['Posteroinferior'], f: ['SSA'] },
  crest:      { c: 'bone', t: 'Transverse (falciform) crest', l: ['Splits upper from lower'] },
  billbar:    { c: 'bone', t: "Bill's bar", l: ['Vertical crest: VII in front, superior vestibular behind', 'Surgical landmark'] },
  aicaLoop:   { c: 'artery', t: 'AICA loop', l: ['Loops into the meatus near VII/VIII'] },

  // ── face card
  'fx-brows':  { c: 'eye', t: 'Raise eyebrows', l: ['Frontalis · upper face'] },
  'fx-close':  { c: 'eye', t: 'Close eyes tightly', l: ['Orbicularis oculi · upper face'] },
  'fx-smile':  { c: 'eye', t: 'Smile · show teeth', l: ['Zygomaticus, orbicularis oris · lower face'] },
  'fx-puff':   { c: 'eye', t: 'Puff out cheeks', l: ['Buccinator, orbicularis oris'] },
  'fx-jaw':    { c: 'eye', t: 'Open the jaw', l: ['Lateral pterygoids (V3)'] },
  'fx-clench': { c: 'eye', t: 'Clench teeth', l: ['Masseter, temporalis (V3)'] },
  'ft-corneal':   { c: 'eye', t: 'Touch the right cornea', l: ['Afferent V1 → spinal V → both VII nuclei', 'Normal: both eyes blink'] },
  'ft-sensation': { c: 'skin', t: 'Pinprick map', l: ['Shows numb areas in red'] },
  'ft-taste':     { c: 'eye', t: 'Sugar on the front of the tongue', l: ['Chorda tympani (VII)'] },
  'ft-sound':     { c: 'eye', t: 'Loud sound', l: ['Stapedius reflex damps it'] },
  'ft-tears':     { c: 'eye', t: 'Tear production', l: ['GSPN → PPG → lacrimal gland'] },
  'fc-ctx':   { c: 'brain', t: 'Motor cortex (face area)', l: ['Corticobulbar fibres to both facial nuclei'] },
  'fc-umn':   { c: 'nerve', t: 'Corticobulbar fibres', l: ['Upper face: from both sides', 'Lower face: from the opposite side only'] },
  'fc-fn':    { c: 'nucleus', t: 'Facial motor nucleus', l: ['Upper half → forehead, eye', 'Lower half → mouth, cheek'], f: ['SVE'] },
  'fc-r7':    { c: 'nerve', t: 'Right facial nerve', l: ['Branch points from top: GSPN, stapedius, chorda, stylomastoid'], f: ['SVE'] },
  'fc-l7':    { c: 'nerve', t: 'Left facial nerve', f: ['SVE'] },
  'fc-sv':    { c: 'nerve', t: 'Spinal V → facial nuclei', l: ['Corneal reflex interneurons · both sides'] },
  'fc-v':     { c: 'nerve', t: 'Trigeminal sensory fibres', f: ['GSA'] },
  'fc-v3m':   { c: 'nerve', t: 'V3 motor', l: ['To masseter, temporalis, pterygoids'], f: ['SVE'] },
  'F-v1':        { c: 'lesion', t: 'Right V1 lesion', l: ['Numb forehead · no corneal blink from the right'] },
  'F-v3':        { c: 'lesion', t: 'Right V3 lesion', l: ['Jaw deviates right · numb chin · weak chewing'] },
  'F-spinalV':   { c: 'lesion', t: 'Spinal V nucleus', l: ['Pain/temp loss · onion-skin'] },
  'F-neuralgia': { c: 'lesion', t: 'Trigeminal neuralgia', l: ['Vascular loop on the root entry zone'] },
  'F-umn':       { c: 'lesion', t: 'Left cortex / corticobulbar', l: ['Right lower face only · forehead spared'] },
  'F-bell':      { c: 'lesion', t: 'Stylomastoid foramen', l: ['Whole right face · nothing else'] },
  'F-chorda':    { c: 'lesion', t: 'Above the chorda', l: ['+ taste loss'] },
  'F-stap':      { c: 'lesion', t: 'Above stapedius', l: ['+ hyperacusis'] },
  'F-genic':     { c: 'lesion', t: 'Geniculate', l: ['+ dry eye · Ramsay Hunt'] },

  // ── optic (II)
  'II-tR':   { c: 'nerve', t: 'Fibres for the right visual field', l: ['Left eye temporal retina (stays) + right eye nasal retina (crosses)', '→ left tract → left LGN → left V1'], f: ['SSA'] },
  'II-tL':   { c: 'nerve', t: 'Fibres for the left visual field', l: ['Right eye temporal retina (stays) + left eye nasal retina (crosses)', '→ right tract → right LGN → right V1'], f: ['SSA'] },
  'II-mey':  { c: 'nerve', t: "Meyer's loop", l: ['Upper visual field fibres', 'Swing forward through the temporal lobe', 'Lesion → contralateral upper quadrantanopia'], f: ['SSA'] },
  'II-par':  { c: 'nerve', t: 'Parietal (dorsal) radiation', l: ['Lower visual field fibres', 'Lesion → contralateral lower quadrantanopia'], f: ['SSA'] },
  'II-pre':  { c: 'nerve', t: 'To pretectum & superior colliculus', l: ['Leave the tract before the LGN', 'Pupillary light reflex · orienting'], f: ['SSA'] },
  'II-scn':  { c: 'nerve', t: 'Retinohypothalamic tract', l: ['To the suprachiasmatic nucleus · body clock'], f: ['SSA'] },
  eyeL:      { c: 'eye', t: 'Left eye (seen from above)', l: ['Temporal retina sees the nasal field, and vice versa'] },
  eyeR:      { c: 'eye', t: 'Right eye (seen from above)' },
  retinaN:   { c: 'skin', t: 'Nasal retina', l: ['Sees the temporal field · fibres cross'], f: ['SSA'] },
  retinaT:   { c: 'skin', t: 'Temporal retina', l: ['Sees the nasal field · fibres stay'], f: ['SSA'] },
  rayL:      { c: 'eye', t: 'Light from the left visual field', l: ['Crosses in the lens → lands on the right half of each retina'] },
  rayR:      { c: 'eye', t: 'Light from the right visual field' },
  opticCanalV:{ c: 'foramen', t: 'Optic canal', l: ['Optic nerve + ophthalmic artery', 'Lesser wing of sphenoid'] },
  chiasmV:   { c: 'nerve', t: 'Optic chiasm', l: ['Nasal fibres cross; temporal fibres stay', 'Sits above the pituitary'], f: ['SSA'] },
  lgn:       { c: 'nucleus', t: 'Lateral geniculate nucleus', l: ['Thalamic relay · six layers', 'Each eye to its own layers'], f: ['SSA'] },
  v1:        { c: 'brain', t: 'Primary visual cortex (V1)', l: ['Banks of the calcarine sulcus', 'Macula at the occipital pole · periphery anterior', 'Upper field on the lower bank'] },
  pretectV:  { c: 'nucleus', t: 'Pretectum · superior colliculus', l: ['Pupillary light reflex (→ both EW)', 'Orienting eye and head movements'] },
  scn:       { c: 'nucleus', t: 'Suprachiasmatic nucleus', l: ['Hypothalamus · circadian rhythm'] },
  brainTop:  { c: 'brain', t: 'Brain · from above', l: ['Front is right · patient’s left is up'] },
  midlineV:  { c: 'brain', t: 'Midline' },
  // eye → nerve card
  disc:      { c: 'eye', t: 'Optic disc', l: ['Axons exit · no photoreceptors → blind spot'] },
  lamina:    { c: 'bone', t: 'Lamina cribrosa', l: ['Sieve in the sclera · axons pass through', 'Site of glaucomatous damage'] },
  myelin:    { c: 'nerve', t: 'Myelinated optic nerve', l: ['Myelin starts behind the lamina (oligodendrocytes)', 'CNS tissue → MS can affect it'], f: ['SSA'] },
  sheath:    { c: 'dura', t: 'Meningeal sheath', l: ['Dura, arachnoid, pia around the nerve', 'Subarachnoid space continuous with the brain’s'] },
  csfSheath: { c: 'venous', t: 'Subarachnoid space (CSF)', l: ['Raised ICP is transmitted here → papilloedema'] },
  cra:       { c: 'artery', t: 'Central retinal artery & vein', l: ['Enter the nerve ~1 cm behind the eye', 'Occlusion → sudden painless loss of vision'] },
  fovea:     { c: 'eye', t: 'Macula · fovea', l: ['Central vision · temporal to the disc'] },
  rgc:       { c: 'nucleus', t: 'Retinal ganglion cells', l: ['Their axons are the optic nerve'], f: ['SSA'] },
  'L-papill':   { c: 'lesion', t: 'Papilloedema', l: ['Disc swelling from raised ICP · enlarged blind spot'] },
  'L-neuritis': { c: 'lesion', t: 'Optic neuritis', l: ['Retrobulbar demyelination · central scotoma · RAPD'] },
  'L-glaucoma': { c: 'lesion', t: 'Glaucoma', l: ['Cupping of the disc · peripheral field loss first'] },
  // chiasm card
  third:     { c: 'venous', t: 'Third ventricle', l: ['Craniopharyngioma can grow down from here'] },
  'L-adenoma':  { c: 'lesion', t: 'Pituitary adenoma', l: ['Presses from below · bitemporal hemianopia', 'Superior quadrants first'] },
  'L-cranio':   { c: 'lesion', t: 'Craniopharyngioma', l: ['Presses from above · bitemporal', 'Inferior quadrants first'] },
  'L-aneur':    { c: 'lesion', t: 'ICA aneurysm', l: ['Presses from the side on uncrossed fibres', 'Ipsilateral nasal field defect'] },
  // field map card
  'FM-1': { c: 'lesion', t: '1 · Optic nerve', l: ['Blind in that eye'] },
  'FM-2': { c: 'lesion', t: '2 · Chiasm', l: ['Bitemporal hemianopia'] },
  'FM-3': { c: 'lesion', t: '3 · Optic tract', l: ['Contralateral homonymous hemianopia'] },
  'FM-4': { c: 'lesion', t: "4 · Meyer's loop", l: ['Contralateral upper quadrantanopia'] },
  'FM-5': { c: 'lesion', t: '5 · Parietal radiation', l: ['Contralateral lower quadrantanopia'] },
  'FM-6': { c: 'lesion', t: '6 · Visual cortex', l: ['Homonymous hemianopia, macula spared'] },
  // vision card
  'vt-fieldL': { c: 'eye', t: 'Confrontation · left eye', l: ['Cover the right eye, map the left eye’s field'] },
  'vt-fieldR': { c: 'eye', t: 'Confrontation · right eye', l: ['Cover the left eye, map the right eye’s field'] },
  'vt-lightL': { c: 'eye', t: 'Light in the left eye', l: ['Direct + consensual response'] },
  'vt-lightR': { c: 'eye', t: 'Light in the right eye' },
  'vt-swing':  { c: 'eye', t: 'Swinging flashlight', l: ['Swing between eyes every 2–3 s', 'Both pupils dilating as the light arrives = RAPD on that side'] },
  'vc-eye':    { c: 'eye', t: 'Eye' },
  'vc-v1':     { c: 'brain', t: 'Visual cortex' },
  'V-neuritisR':  { c: 'lesion', t: 'Right optic nerve' },
  'V-chiasm':     { c: 'lesion', t: 'Chiasm · crossing fibres' },
  'V-tractR':     { c: 'lesion', t: 'Right optic tract' },
  'V-meyerR':     { c: 'lesion', t: "Right Meyer's loop" },
  'V-parietalR':  { c: 'lesion', t: 'Right parietal radiation' },
  'V-occipitalR': { c: 'lesion', t: 'Right visual cortex' },
  'V-papilledema':{ c: 'lesion', t: 'Both discs swollen' },
  'V-aionR':      { c: 'lesion', t: 'Right optic disc infarct', l: ['Altitudinal field loss · think giant cell arteritis'] },
  'V-craoR':      { c: 'lesion', t: 'Right central retinal artery', l: ['Cherry-red spot · stroke equivalent'] },
  // pupil signature
  postComm:  { c: 'brain', t: 'Posterior commissure', l: ['Pretectal fibres cross here → consensual reflex'] },
  ewV:       { c: 'nucleus', t: 'Edinger–Westphal nuclei', l: ['Each receives from both pretecta'], f: ['GVE'] },

  // ── olfactory (I)
  'I-fila':   { c: 'nerve', t: 'Fila olfactoria', l: ['Axons of receptor neurons — the olfactory nerve proper', '~20 bundles through the cribriform plate', 'Unmyelinated · sheared in head trauma'], f: ['SVA'] },
  'I-tract':  { c: 'nerve', t: 'Olfactory tract', l: ['Mitral and tufted cell axons', 'Technically CNS, not nerve', 'Lies in the olfactory sulcus, under gyrus rectus'], f: ['SVA'] },
  'I-lat':    { c: 'nerve', t: 'Lateral olfactory stria', l: ['Main route · to piriform cortex, periamygdaloid cortex, amygdala, entorhinal', 'Reaches cortex with no thalamic relay'], f: ['SVA'] },
  'I-med':    { c: 'nerve', t: 'Medial olfactory stria', l: ['To septal area and anterior olfactory nucleus', 'Crosses in the anterior commissure to the other bulb'], f: ['SVA'] },
  'I-contra': { c: 'nerve', t: 'Anterior commissure route', l: ['To the opposite bulb and tract'], f: ['SVA'] },
  'I-md':     { c: 'nerve', t: 'Piriform → MD thalamus → orbitofrontal', l: ['Conscious identification and discrimination of odours', 'The thalamus comes after cortex, not before'], f: ['SVA'] },
  'I-ofc':    { c: 'nerve', t: 'Direct piriform → orbitofrontal', l: ['Odour + taste → flavour'], f: ['SVA'] },
  'I-hyp':    { c: 'nerve', t: 'Amygdala → hypothalamus', l: ['Emotional and autonomic responses to smell', 'Appetite, nausea, sexual behaviour'], f: ['SVA'] },
  'I-hip':    { c: 'nerve', t: 'Entorhinal → hippocampus', l: ['Why smells trigger vivid memories'], f: ['SVA'] },
  olfEpi:     { c: 'skin', t: 'Olfactory epithelium', l: ['Roof of nasal cavity, superior concha, upper septum', '~2.5 cm² each side', 'Receptor neurons + basal stem cells'], f: ['SVA'] },
  bulb:       { c: 'nucleus', t: 'Olfactory bulb', l: ['First synapse: receptor axons → mitral & tufted cells', 'In glomeruli · one receptor type per glomerulus', 'Lies on the cribriform plate'], f: ['SVA'] },
  cribriform: { c: 'foramen', t: 'Cribriform plate', l: ['Perforated roof of the nasal cavity (ethmoid)', 'Fracture → anosmia + CSF rhinorrhoea'] },
  conchaS:    { c: 'bone', t: 'Superior concha', l: ['Partly covered by olfactory epithelium'] },
  conchaM:    { c: 'bone', t: 'Middle concha' },
  conchaI:    { c: 'bone', t: 'Inferior concha' },
  palate:     { c: 'bone', t: 'Hard palate · nasal floor' },
  frontalSin: { c: 'bone', t: 'Frontal sinus' },
  sphenoidSin:{ c: 'bone', t: 'Sphenoid sinus' },
  nasalV:     { c: 'nerve', t: 'Trigeminal endings in the nose', l: ['V1 (anterior ethmoidal) and V2 (nasopalatine, posterior nasal)', 'Sense irritants — ammonia, menthol, pepper'], f: ['GSA'] },
  brainMed:   { c: 'brain', t: 'Brain · medial view', l: ['Front is right'] },
  brainstem:  { c: 'brain', t: 'Brainstem', l: ['CN I never reaches it'] },
  cc:         { c: 'brain', t: 'Corpus callosum' },
  thalMD:     { c: 'brain', t: 'Mediodorsal (MD) thalamus', l: ['Relays piriform → orbitofrontal'] },
  hypothal:   { c: 'brain', t: 'Hypothalamus', l: ['Feeding, autonomic and hormonal responses to smell'] },
  septal:     { c: 'brain', t: 'Septal area', l: ['Medial stria target'] },
  antComm:    { c: 'brain', t: 'Anterior commissure', l: ['Links the two olfactory systems'] },
  piriform:   { c: 'brain', t: 'Piriform cortex · uncus', l: ['Primary olfactory cortex', 'Seizure focus here → olfactory aura'] },
  amygdala:   { c: 'brain', t: 'Amygdala', l: ['Emotional tag on odours'] },
  entorhinal: { c: 'brain', t: 'Entorhinal cortex', l: ['Gateway to the hippocampus · memory'] },
  hippocampus:{ c: 'brain', t: 'Hippocampus' },
  ofc:        { c: 'brain', t: 'Orbitofrontal cortex', l: ['Conscious smell, flavour, reward value'] },
  // bulb card
  receptorN:  { c: 'nucleus', t: 'Olfactory receptor neurons', l: ['Bipolar · each expresses one receptor type', 'Replaced every few weeks from basal cells'], f: ['SVA'] },
  glom:       { c: 'nucleus', t: 'Glomeruli', l: ['All neurons with the same receptor converge on one glomerulus', 'A spatial "smell map"'] },
  mitral:     { c: 'nucleus', t: 'Mitral & tufted cells', l: ['Second-order neurons · axons form the tract'], f: ['SVA'] },
  granule:    { c: 'nucleus', t: 'Granule cells', l: ['Inhibitory interneurons · sharpen contrast'] },
  crista:     { c: 'bone', t: 'Crista galli', l: ['Midline crest · falx attaches'] },
  orbPlate:   { c: 'bone', t: 'Orbital plate of frontal bone' },
  'L-shear':     { c: 'lesion', t: 'Shearing of the fila', l: ['Head trauma · bilateral anosmia'] },
  'L-viralEpi':  { c: 'lesion', t: 'Epithelial damage', l: ['Viral · usually recovers'] },
  'L-cribFrac':  { c: 'lesion', t: 'Anterior fossa fracture', l: ['Anosmia + CSF rhinorrhoea', '"Racoon eyes"'] },
  'L-ogm':       { c: 'lesion', t: 'Olfactory groove meningioma', l: ['Unilateral anosmia · Foster Kennedy syndrome'] },
  'L-uncinate':  { c: 'lesion', t: 'Uncinate focus', l: ['Phantosmia · temporal-lobe seizures'] },
  // smell card
  'st-coffeeR':  { c: 'eye', t: 'Coffee · right nostril', l: ['Close the left nostril, sniff'] },
  'st-coffeeL':  { c: 'eye', t: 'Coffee · left nostril', l: ['Close the right nostril, sniff'] },
  'st-ammonia':  { c: 'eye', t: 'Ammonia', l: ['Irritant → trigeminal, not olfactory', 'A truly anosmic patient still feels it — "can’t smell it" suggests non-organic loss'] },
  'st-flavor':   { c: 'eye', t: 'Eat a strawberry', l: ['Flavour = taste + retronasal smell'] },
  'sc-epi':      { c: 'skin', t: 'Olfactory epithelium' },
  'sc-ctx':      { c: 'brain', t: 'Olfactory cortex', l: ['Piriform · amygdala · entorhinal'] },
  'sc-ofc':      { c: 'brain', t: 'Orbitofrontal (via MD)' },
  'sc-spv':      { c: 'nucleus', t: 'Spinal V nucleus', l: ['Irritants via trigeminal endings'], f: ['GSA'] },
  'S-trauma':    { c: 'lesion', t: 'Fila sheared · both sides' },
  'S-ogm':       { c: 'lesion', t: 'Right bulb / tract compressed' },
  'S-viral':     { c: 'lesion', t: 'Epithelium damaged · both sides' },
  'S-kallmann':  { c: 'lesion', t: 'Bulbs never formed' },
  'S-neuro':     { c: 'lesion', t: 'Bulb / entorhinal degeneration' },
  'S-uncinate':  { c: 'lesion', t: 'Right uncus · fires on its own' },
  'S-obstruct':  { c: 'lesion', t: 'Airway blocked · odorants can’t reach' },
  // olfaction info popup
  olOR:       { c: 'nucleus', t: 'Olfactory receptor (OR)', l: ['7-transmembrane G-protein-coupled receptor', 'One type per neuron · ~400 types in humans'], f: ['SVA'] },
  olG:        { c: 'nucleus', t: 'Gα<sub>olf</sub> · βγ', l: ['Olfactory-specific G protein', 'GTP-bound α activates adenylyl cyclase III'] },
  olAC:       { c: 'nucleus', t: 'Adenylyl cyclase III', l: ['ATP → cAMP · many per activated receptor'] },
  olCNG:      { c: 'nucleus', t: 'Cyclic-nucleotide-gated channel', l: ['Opened by cAMP · lets Na⁺ and Ca²⁺ in', 'Ca²⁺–calmodulin desensitises it → adaptation'] },
  olANO:      { c: 'nucleus', t: 'Ca²⁺-activated Cl⁻ channel (ANO2)', l: ['Cl⁻ leaves because the neuron keeps it high inside', 'Carries most of the receptor current'] },
  olOdor:     { c: 'viscera', t: 'Odorant', l: ['Small volatile molecule, dissolved in mucus', 'Odorant-binding proteins help ferry it'] },
  olGlom:     { c: 'nucleus', t: 'Glomerulus', l: ['All axons of one receptor type meet here', 'Synapse onto mitral & tufted cells'], f: ['SVA'] },

  // sight info popup
  cone:       { c: 'nucleus', t: 'Cone', l: ['Daylight, colour (S, M, L opsins)', 'Packed at the fovea'], f: ['SSA'] },
  rod:        { c: 'nucleus', t: 'Rod', l: ['Dim light · one photon is enough', 'None at the fovea'], f: ['SSA'] },
  rpe:        { c: 'eye', t: 'Retinal pigment epithelium', l: ['Recycles retinal (visual cycle), eats shed outer segments', 'Absorbs stray light'] },
  hcell:      { c: 'nucleus', t: 'Horizontal cell', l: ['Pools many cones · opposite-sign feedback', 'Builds the surround'] },
  onBip:      { c: 'nucleus', t: 'ON bipolar cell', l: ['mGluR6 → TRPM1 closes: sign-inverting', 'Depolarises in light · ends in the inner IPL'] },
  offBip:     { c: 'nucleus', t: 'OFF bipolar cell', l: ['AMPA / kainate: sign-conserving', 'Depolarises in dark · ends in the outer IPL'] },
  amacrine:   { c: 'nucleus', t: 'Amacrine cells', l: ['Lateral inhibition in the IPL · timing, direction selectivity'] },
  onRGC:      { c: 'nucleus', t: 'ON-centre ganglion cell', l: ['Fires for light in the centre, dark in the surround'], f: ['SSA'] },
  offRGC:     { c: 'nucleus', t: 'OFF-centre ganglion cell', l: ['Fires for dark in the centre, light in the surround'], f: ['SSA'] },
  rfield:     { c: 'eye', t: 'Receptive field', l: ['Centre from the direct cone → bipolar path', 'Surround from horizontal (and amacrine) cells'] },
  rhodopsin:  { c: 'nucleus', t: 'Rhodopsin', l: ['Opsin (7-TM GPCR) + 11-cis retinal', 'Light isomerises retinal → active'] },
  transducin: { c: 'nucleus', t: 'Transducin (G<sub>t</sub>)', l: ['Rod G protein · α subunit activates PDE6'] },
  pde6:       { c: 'nucleus', t: 'Phosphodiesterase 6', l: ['cGMP → 5′-GMP · enormous turnover'] },
  gcyc:       { c: 'nucleus', t: 'Guanylyl cyclase + GCAP', l: ['GTP → cGMP · sped up when Ca²⁺ falls'] },
  cngRod:     { c: 'nucleus', t: 'cGMP-gated channel', l: ['Open in the dark → dark current', 'Closes in light'] },
  lgnM:       { c: 'nucleus', t: 'Magnocellular layer', l: ['Big cells · parasol input · motion, depth'], f: ['SSA'] },
  lgnP:       { c: 'nucleus', t: 'Parvocellular layer', l: ['Small cells · midget input · detail, red–green'], f: ['SSA'] },
  lgnK:       { c: 'nucleus', t: 'Koniocellular zones', l: ['Between the main layers · blue–yellow'], f: ['SSA'] },
  v1Lam:      { c: 'brain', t: 'V1 laminae', l: ['LGN input lands in 4C (Mα, Pβ) and the 2/3 blobs (K)', '4B → MT · 2/3 → V2 · 6 → back to LGN'] },
  blob:       { c: 'brain', t: 'Colour blobs', l: ['Cytochrome-oxidase patches in V1 layers 2/3', 'Colour-opponent cells'] },
  mtArea:     { c: 'brain', t: 'MT (V5)', l: ['Motion direction and speed'] },
  v4Area:     { c: 'brain', t: 'V2 → V4 → IT', l: ['Form, colour constancy, objects'] },
  oriCol:     { c: 'brain', t: 'Orientation column', l: ['All cells in it prefer the same edge angle', 'Neighbouring columns shift ~10–20°'] },
  odCol:      { c: 'brain', t: 'Ocular dominance columns', l: ['Alternating left- / right-eye stripes, ~0.5 mm', 'Shaped by early experience (amblyopia)'] },
  brainLat:   { c: 'brain', t: 'Brain · lateral view', l: ['Occipital pole on the left'] },
  brV1:       { c: 'brain', t: 'V1 · striate cortex', l: ['Calcarine banks · retinotopic map'] },
  brV2:       { c: 'brain', t: 'V2', l: ['Thin, thick and pale stripes · illusory contours'] },
  brMT:       { c: 'brain', t: 'MT / V5', l: ['Motion · lesion → akinetopsia'] },
  brMST:      { c: 'brain', t: 'MST', l: ['Optic flow · heading'] },
  brPPC:      { c: 'brain', t: 'Posterior parietal cortex', l: ['Space, attention, reaching', 'Bilateral lesion → Bálint syndrome'] },
  brV4:       { c: 'brain', t: 'V4', l: ['Colour constancy, shape · lesion → achromatopsia'] },
  brFFA:      { c: 'brain', t: 'Fusiform face area', l: ['Ventral surface · faces', 'Lesion → prosopagnosia'] },
  brIT:       { c: 'brain', t: 'Inferotemporal cortex', l: ['Whole objects, invariant to size and position'] },

  // hearing info popup
  modiolus:   { c: 'bone', t: 'Modiolus', l: ['Bony core of the cochlea · holds the spiral ganglion'] },
  sVest:      { c: 'venous', t: 'Scala vestibuli', l: ['Perilymph · starts at the oval window'] },
  sMedia:     { c: 'viscera', t: 'Scala media (cochlear duct)', l: ['Endolymph: K⁺ ~150 mM, +80 mV', 'Holds the organ of Corti'] },
  sTymp:      { c: 'venous', t: 'Scala tympani', l: ['Perilymph · ends at the round window'] },
  stria:      { c: 'viscera', t: 'Stria vascularis', l: ['Pumps K⁺ into endolymph → +80 mV endocochlear potential', 'Target of loop diuretics'] },
  reissner:   { c: 'dura', t: 'Reissner’s membrane', l: ['Separates endolymph from perilymph above'] },
  lamina:     { c: 'bone', t: 'Osseous spiral lamina', l: ['Shelf of bone carrying the cochlear nerve fibres'] },
  bmem:       { c: 'viscera', t: 'Basilar membrane', l: ['Base: narrow, stiff → high pitch', 'Apex: wide, floppy → low pitch'] },
  limbus:     { c: 'bone', t: 'Spiral limbus', l: ['Anchors the tectorial membrane'] },
  ihc:        { c: 'nucleus', t: 'Inner hair cell', l: ['One row · ~3 500 cells', '90–95% of afferent fibres'], f: ['SSA'] },
  ohc:        { c: 'nucleus', t: 'Outer hair cells', l: ['Three rows · ~12 000 cells', 'Prestin amplifier · efferent control'] },
  tect:       { c: 'dura', t: 'Tectorial membrane', l: ['Gel roof over the hair cells · shear bends the bundles'] },
  retLam:     { c: 'dura', t: 'Reticular lamina', l: ['Tight junctions seal endolymph above from perilymph below'] },
  bundle:     { c: 'nucleus', t: 'Hair bundle', l: ['Stereocilia in a staircase, linked tip to side', 'Toward the tallest → opens · away → closes'] },
  cav:        { c: 'nucleus', t: 'Ca<sub>v</sub>1.3 channel', l: ['Voltage-gated Ca²⁺ entry at the active zone'] },
  ribbon:     { c: 'nucleus', t: 'Ribbon synapse', l: ['Tethers vesicles for fast, continuous glutamate release'] },
  afferent:   { c: 'nerve', t: 'Type I afferent', l: ['Spiral ganglion peripheral process · ~10–20 per inner hair cell'], f: ['SSA'] },
  kOut:       { c: 'nucleus', t: 'Basolateral K⁺ channels', l: ['KCNQ4 · BK — K⁺ exits into perilymph', 'KCNQ4 mutations → progressive deafness'] },
  ohcP:       { c: 'nucleus', t: 'Outer hair cell · prestin', l: ['Voltage-driven motor protein in the lateral wall', 'Depolarised → shorter · hyperpolarised → longer'] },
  lcHead:     { c: 'brain', t: 'Head from above', l: ['Nose up · ~17.5 cm wide → max ITD ~650 µs'] },
  lcSrc:      { c: 'viscera', t: 'Sound source' },
  mso:        { c: 'nucleus', t: 'Medial superior olive', l: ['Compares arrival times from the two ears', 'Low frequencies · ~10 µs resolution'], f: ['SSA'] },
  lso:        { c: 'nucleus', t: 'Lateral superior olive', l: ['Same-side excitation minus other-side inhibition (via MNTB)', 'High frequencies'], f: ['SSA'] },
  parabelt:   { c: 'brain', t: 'Parabelt', l: ['Lateral superior temporal gyrus · complex sounds'] },
  belt:       { c: 'brain', t: 'Belt', l: ['Around A1 · bands and frequency sweeps'] },
  brainLat2:  { c: 'brain', t: 'Brain · lateral view', l: ['Front on the right'] },
  sylvian:    { c: 'brain', t: 'Lateral (Sylvian) fissure', l: ['A1 lies hidden in its floor, on Heschl’s gyrus'] },
  acA1:       { c: 'brain', t: 'Primary auditory cortex', l: ['Heschl’s gyrus · tonotopic'] },
  acPT:       { c: 'brain', t: 'Planum temporale', l: ['Behind Heschl’s gyrus · larger on the left', 'Spatial hearing, speech sounds'] },
  acaSTG:     { c: 'brain', t: 'Anterior STG / STS', l: ['Sound and voice identity'] },
  acWA:       { c: 'brain', t: 'Wernicke’s area', l: ['Left posterior STG · speech comprehension'] },
  acIPL:      { c: 'brain', t: 'Inferior parietal lobule', l: ['Auditory space · links to eye and hand'] },
  acIFG:      { c: 'brain', t: 'Inferior frontal gyrus (Broca)', l: ['Speech production · fed by the arcuate fasciculus'] },
  acDPFC:     { c: 'brain', t: 'Dorsal prefrontal / premotor', l: ['Orienting to sound sources'] },

  // taste info popup
  tgVII:      { c: 'sganglion', t: 'Chorda tympani → geniculate ganglion', l: ['Anterior ⅔ taste · joins the lingual nerve'], f: ['SVA'] },
  tgIX:       { c: 'sganglion', t: 'IX → petrosal ganglion', l: ['Posterior ⅓ taste and touch'], f: ['SVA', 'GSA'] },
  tgX:        { c: 'sganglion', t: 'X → nodose ganglion', l: ['Epiglottis, pharynx, larynx'], f: ['SVA'] },
  tgall:      { c: 'sganglion', t: 'Gustatory ganglia', l: ['Geniculate (VII) · petrosal (IX) · nodose (X)', 'Pseudounipolar · no synapse'], f: ['SVA'] },
  tgEpi:      { c: 'skin', t: 'Epiglottis', l: ['Scattered taste buds · X'] },
  tgPost:     { c: 'skin', t: 'Posterior third of the tongue', l: ['Taste + touch · IX'] },
  tgAnt:      { c: 'skin', t: 'Anterior two-thirds of the tongue', l: ['Taste · VII (chorda tympani)', 'Touch · V3 (lingual nerve)'] },
  tasteX:     { c: 'nerve', t: 'Superior laryngeal nerve (X)', l: ['Taste from the epiglottis'], f: ['SVA'] },
  cvPap:      { c: 'skin', t: 'Circumvallate papillae', l: ['~10 in a V · hundreds of buds each', 'IX · von Ebner glands rinse the trench'] },
  folPap:     { c: 'skin', t: 'Foliate papillae', l: ['Folds on the lateral edges · VII and IX'] },
  fungPap:    { c: 'skin', t: 'Fungiform papillae', l: ['Mushroom-shaped, mostly near the tip · 1–5 buds each · VII'] },
  tqsweet:    { c: 'nucleus', t: 'Sweet cell (type II)', l: ['T1R2 + T1R3'], f: ['SVA'] },
  tqumami:    { c: 'nucleus', t: 'Umami cell (type II)', l: ['T1R1 + T1R3'], f: ['SVA'] },
  tqbitter:   { c: 'nucleus', t: 'Bitter cell (type II)', l: ['Many T2Rs in one cell'], f: ['SVA'] },
  tqsour:     { c: 'nucleus', t: 'Sour cell (type III)', l: ['OTOP1 proton channel · serotonin synapse'], f: ['SVA'] },
  tqsalty:    { c: 'nucleus', t: 'Salt cell', l: ['ENaC · amiloride-sensitive'], f: ['SVA'] },
  type1:      { c: 'nucleus', t: 'Type I cell', l: ['Glia-like support · clears transmitters'] },
  type4:      { c: 'nucleus', t: 'Basal (type IV) cells', l: ['Stem cells · replace bud cells every 1–2 weeks'] },
  tqAff:      { c: 'nerve', t: 'Gustatory afferent fibre', l: ['To the geniculate, petrosal or nodose ganglion'], f: ['SVA'] },
  tbEpi:      { c: 'skin', t: 'Stratified epithelium of the tongue' },
  tbBud:      { c: 'viscera', t: 'Taste bud', l: ['50–100 cells · all five qualities', 'Embedded in the papilla wall'] },
  tbPore:     { c: 'foramen', t: 'Taste pore', l: ['Microvilli reach saliva here'] },
  tcRec:      { c: 'nucleus', t: 'Taste GPCR', l: ['T1Rs: large “Venus flytrap” binding domain (sweet, umami)', 'T2Rs: bitter'] },
  gust:       { c: 'nucleus', t: 'Gustducin', l: ['Taste G protein · βγ drives PLCβ2'] },
  plc:        { c: 'nucleus', t: 'Phospholipase Cβ2', l: ['PIP₂ → IP₃ + DAG'] },
  er:         { c: 'nucleus', t: 'Endoplasmic reticulum', l: ['IP₃R3 releases stored Ca²⁺'] },
  trpm5:      { c: 'nucleus', t: 'TRPM5', l: ['Ca²⁺-activated cation channel · warmth-sensitive'] },
  calhm:      { c: 'nucleus', t: 'CALHM1/3 channel', l: ['Voltage-gated · ATP passes through the pore'] },
  p2x:        { c: 'nucleus', t: 'P2X2 / P2X3 receptors', l: ['ATP-gated channels on the afferent terminal'] },
  trCTT:      { c: 'nerve', t: 'Central tegmental tract', l: ['NTS → VPMpc, mostly ipsilateral'], f: ['SVA'] },
  trVPM:      { c: 'nucleus', t: 'VPM, parvicellular part', l: ['Thalamic taste relay'], f: ['SVA'] },
  trIns:      { c: 'brain', t: 'Anterior insula · frontal operculum', l: ['Primary gustatory cortex · quality and intensity'] },
  trOfc:      { c: 'brain', t: 'Orbitofrontal cortex', l: ['Flavour (taste + smell + texture) · pleasantness', 'Sensory-specific satiety'] },
  trVisc:     { c: 'nerve', t: 'Visceral signals', l: ['Gut and vagal afferents → caudal NTS → hypothalamus'], f: ['GVA'] },
  trReflex:   { c: 'nucleus', t: 'Brainstem reflexes', l: ['Salivatory nuclei, swallowing, gag, gaping'] },

  // signature
  thal:       { c: 'brain', t: 'Thalamus', l: ['Relay for vision, hearing, touch, taste'] },
  ctxPrim:    { c: 'brain', t: 'Primary sensory cortex' },

  // ── vestibulocochlear (VIII): nerve
  'VIII-c':   { c: 'nerve', t: 'Cochlear nerve', l: ['Central processes of spiral ganglion cells', 'Tonotopic: apex fibres in the core, base fibres outside', '→ cochlear nuclei'], f: ['SSA'] },
  'VIII-v':   { c: 'nerve', t: 'Vestibular nerve', l: ['From Scarpa’s ganglion in the IAM', '→ vestibular nuclei · some straight to the flocculus'], f: ['SSA'] },
  'VIII-vs':  { c: 'nerve', t: 'Superior vestibular division', l: ['Utricle + anterior and lateral canals', 'Usual target of vestibular neuritis'], f: ['SSA'] },
  'VIII-vi':  { c: 'nerve', t: 'Inferior vestibular division', l: ['Saccule + posterior canal', 'Commonest origin of vestibular schwannoma'], f: ['SSA'] },
  'VIII-cn':  { c: 'nerve', t: 'Cochlear root', l: ['Every fibre synapses in the cochlear nuclei on the same side'], f: ['SSA'] },
  'VIII-vn':  { c: 'nerve', t: 'Vestibular root', l: ['Passes medial to the ICP into the vestibular nuclei'], f: ['SSA'] },
  vAmpA:      { c: 'nerve', t: 'Anterior ampullary nerve', l: ['Superior division'], f: ['SSA'] },
  vAmpL:      { c: 'nerve', t: 'Lateral ampullary nerve', l: ['Superior division · horizontal head turns'], f: ['SSA'] },
  vAmpP:      { c: 'nerve', t: 'Posterior ampullary (singular) nerve', l: ['Inferior division'], f: ['SSA'] },
  vUtr:       { c: 'nerve', t: 'Utricular nerve', l: ['Superior division'], f: ['SSA'] },
  vSac:       { c: 'nerve', t: 'Saccular nerve', l: ['Inferior division'], f: ['SSA'] },
  cochDend:   { c: 'nerve', t: 'Spiral ganglion dendrites', l: ['Through the osseous spiral lamina to the hair cells', '~95% from inner hair cells'], f: ['SSA'] },
  vcb:        { c: 'nerve', t: 'Primary vestibulocerebellar fibres', l: ['Straight to the flocculonodular lobe via the juxtarestiform body', 'The only primary afferents to reach the cerebellum directly'], f: ['SSA'] },
  trap:       { c: 'nerve', t: 'Cochlear nuclei → same-side SOC', l: ['Superior olive compares the two ears → sound localisation'], f: ['SSA'] },
  trapX:      { c: 'nerve', t: 'Trapezoid body', l: ['Crossing fibres from the ventral cochlear nucleus', 'From here on each ear is heard on both sides'], f: ['SSA'] },
  ll:         { c: 'nerve', t: 'Lateral lemniscus', l: ['Ascends to the inferior colliculus', 'Carries both ears'], f: ['SSA'] },
  mgn:        { c: 'nerve', t: 'IC → MGN → auditory cortex', l: ['Brachium of the IC → medial geniculate (thalamus)', '→ Heschl’s gyrus, superior temporal lobe'], f: ['SSA'] },
  vor:        { c: 'nerve', t: 'Vestibular nucleus → opposite VI nucleus', l: ['Horizontal VOR: turn right → right canal fires → eyes driven left'], f: ['SSA'] },
  mlf:        { c: 'nerve', t: 'Medial longitudinal fasciculus', l: ['VI interneurons cross and climb to the opposite MR subnucleus of III', 'Yokes the eyes · cut = INO'], f: ['GSE'] },
  vsp:        { c: 'nerve', t: 'Vestibulospinal tracts', l: ['Lateral (Deiters) → extensors, same side · posture', 'Medial → neck muscles · head stabilising'], f: ['SSA'] },
  'n-vest':   { c: 'nucleus', t: 'Vestibular nuclei', l: ['Superior · lateral · medial · inferior', 'Floor of the 4th ventricle, pons–medulla', 'Out to eyes (MLF), spine, cerebellum, thalamus'], f: ['SSA'] },
  'n-coch':   { c: 'nucleus', t: 'Cochlear nuclei', l: ['Dorsal + ventral, wrapped on the ICP', 'Last station that hears only one ear'], f: ['SSA'] },
  'n-soc':    { c: 'nucleus', t: 'Superior olivary complex', l: ['First site where the ears meet', 'Timing and loudness differences → direction', 'Origin of the olivocochlear efferents'], f: ['SSA'] },
  'n-ic':     { c: 'nucleus', t: 'Inferior colliculus', l: ['Midbrain relay of the hearing pathway', 'Startle and turning toward sounds'], f: ['SSA'] },
  // ear scene
  iamV:       { c: 'foramen', t: 'Internal acoustic meatus', l: ['VII, intermedius, VIII + labyrinthine artery', 'Porus on the posterior face of the petrous bone'] },
  fundus:     { c: 'bone', t: 'Fundus of the IAM', l: ['Perforated plate: nerves enter the labyrinth here'] },
  scarpa:     { c: 'sganglion', t: 'Vestibular (Scarpa’s) ganglion', l: ['Bipolar cell bodies inside the IAM', 'No synapse'], f: ['SSA'] },
  spiralG:    { c: 'sganglion', t: 'Spiral ganglion', l: ['In the modiolus, the cochlea’s bony core', 'Bipolar · no synapse'], f: ['SSA'] },
  cochlea:    { c: 'viscera', t: 'Cochlea', l: ['2¾ turns · hair cells on the basilar membrane', 'Base: stiff & narrow → high pitch', 'Apex: wide & floppy → low pitch'] },
  vestibule:  { c: 'viscera', t: 'Vestibule', l: ['Holds the utricle and saccule'] },
  utricle:    { c: 'viscera', t: 'Utricle', l: ['Macula senses horizontal linear acceleration and tilt', 'Source of BPPV otoconia'] },
  saccule:    { c: 'viscera', t: 'Saccule', l: ['Macula senses vertical acceleration'] },
  canalA:     { c: 'viscera', t: 'Anterior semicircular canal', l: ['Rotation · pairs with the opposite posterior canal'] },
  canalP:     { c: 'viscera', t: 'Posterior semicircular canal', l: ['Lowest canal when lying down → where BPPV debris settles'] },
  canalL:     { c: 'viscera', t: 'Lateral semicircular canal', l: ['Horizontal head turns · tested by the head impulse and calorics'] },
  ampulla:    { c: 'viscera', t: 'Ampulla', l: ['Swelling at one end of each canal', 'Cupula + hair cells sense endolymph flow'] },
  ovalW:      { c: 'foramen', t: 'Oval window', l: ['Stapes footplate pushes into the vestibule'] },
  roundW:     { c: 'foramen', t: 'Round window', l: ['Bulges out to let the fluid move'] },
  ossicles:   { c: 'bone', t: 'Ossicles', l: ['Malleus → incus → stapes', 'Lever + drum-to-window area ratio ≈ 20× pressure gain', 'Fixed stapes = otosclerosis'] },
  tm:         { c: 'skin', t: 'Tympanic membrane', l: ['Outer surface: V3 and X (GSA)'] },
  earCanal:   { c: 'skin', t: 'External acoustic meatus', l: ['Wax here → conductive loss'] },
  mecav:      { c: 'bone', t: 'Middle ear', l: ['Air-filled · tympanic plexus of IX on the promontory', 'Stapedius (VII) damps the stapes'] },
  oticCap:    { c: 'bone', t: 'Otic capsule (bony labyrinth)', l: ['Densest bone in the body · perilymph inside'] },
  flocculus:  { c: 'brain', t: 'Flocculus · nodulus', l: ['Vestibulocerebellum: gaze holding, VOR tuning', 'Damage → nystagmus, imbalance'] },
  // xs card
  'L-aicaSyn':  { c: 'lesion', t: 'Lateral pontine (AICA) syndrome', l: ['Deafness + vertigo + facial palsy + face pain/temp loss', 'Hearing loss separates it from Wallenberg'] },
  'L-schwann':  { c: 'lesion', t: 'Vestibular schwannoma', l: ['Inside the IAM, from the vestibular nerve'] },
  mlfx:       { c: 'nerve', t: 'MLF', l: ['Next to the midline under the floor'], f: ['GSE'] },
  // pathway card
  a1:         { c: 'brain', t: 'Primary auditory cortex', l: ['Heschl’s gyrus · tonotopic', 'One-sided cortex damage barely changes hearing'] },
  vThal:      { c: 'brain', t: 'Vestibular thalamus → cortex', l: ['Awareness of motion · vertigo'] },
  vorOut:     { c: 'nucleus', t: 'III · IV · VI nuclei', l: ['Via the MLF · keeps the eyes still in space'], f: ['GSE'] },
  vspOut:     { c: 'nerve', t: 'Spinal cord', l: ['Vestibulospinal tracts · posture'] },
  'L-earSide':  { c: 'lesion', t: 'Below the crossing', l: ['Ear, VIII or cochlear nucleus → deaf in THAT ear'] },
  'L-above':    { c: 'lesion', t: 'Above the crossing', l: ['Lemniscus, IC, MGN, cortex → hearing barely changes', 'Both ears are already on both sides'] },
  // hearing card
  'ht-weber':  { c: 'eye', t: 'Weber', l: ['Fork on the forehead · where is it louder?', 'Conductive → toward the bad ear · sensorineural → toward the good ear'] },
  'ht-rinneR': { c: 'eye', t: 'Rinne · right ear', l: ['Fork on the mastoid, then beside the ear', 'Normal: air louder than bone'] },
  'ht-rinneL': { c: 'eye', t: 'Rinne · left ear' },
  'ht-hitR':   { c: 'eye', t: 'Head impulse · to the right', l: ['Fast small turn while the patient looks at your nose', 'Tests the right lateral canal'] },
  'ht-hitL':   { c: 'eye', t: 'Head impulse · to the left', l: ['Tests the left lateral canal'] },
  'ht-gaze':   { c: 'eye', t: 'Look ahead', l: ['Watch for spontaneous nystagmus', 'Named by its fast phase'] },
  'ht-hallR':  { c: 'eye', t: 'Dix-Hallpike · right', l: ['Head turned 45° right, lie back quickly with the head hanging'] },
  'ht-hallL':  { c: 'eye', t: 'Dix-Hallpike · left' },
  'hc-ear':    { c: 'viscera', t: 'Inner ear', l: ['Cochlea + vestibular organs'] },
  'hc-a1':     { c: 'brain', t: 'Auditory cortex' },
  'H-conductR':    { c: 'lesion', t: 'Right middle ear · canal' },
  'H-schwannomaR': { c: 'lesion', t: 'Right IAM tumour', l: ['Squeezes cochlear + vestibular nerves'] },
  'H-neuritisR':   { c: 'lesion', t: 'Right vestibular nerve' },
  'H-labyrR':      { c: 'lesion', t: 'Right labyrinth' },
  'H-menieresR':   { c: 'lesion', t: 'Right endolymph · hydrops' },
  'H-bppvR':       { c: 'lesion', t: 'Debris in the right posterior canal' },
  'H-cerebellar':  { c: 'lesion', t: 'Cerebellum · flocculus', l: ['The VOR arc itself is intact'] },
  // VOR signature
  canalH:     { c: 'viscera', t: 'Lateral canals', l: ['Head turns right → right canal fires more, left less'] },
  vTarget:    { c: 'eye', t: 'Target', l: ['The eyes should stay locked on it'] },

  // ── neck region (IX X XI XII): nuclei
  'n-amb':  { c: 'nucleus', t: 'Nucleus ambiguus', l: ['Branchial motor for IX and X', 'Pharynx, larynx, palate, upper oesophagus', 'Also cardioinhibitory neurons'], f: ['SVE'] },
  'n-DMN':  { c: 'nucleus', t: 'Dorsal motor nucleus of X', l: ['Preganglionic parasympathetic', 'Heart, lungs, gut to the splenic flexure'], f: ['GVE'] },
  'n-ISN':  { c: 'nucleus', t: 'Inferior salivatory nucleus', l: ['IX preganglionic → otic ganglion → parotid'], f: ['GVE'] },
  'n-XII':  { c: 'nucleus', t: 'Hypoglossal nucleus', l: ['Floor of 4th ventricle (hypoglossal trigone)', 'All tongue muscles but palatoglossus'], f: ['GSE'] },
  'n-acc':  { c: 'nucleus', t: 'Spinal accessory nucleus', l: ['Ventral horn C1–C5', 'SCM and trapezius'], f: ['SVE'] },

  // nerve segments
  'IX-intra': { c: 'nerve', t: 'IX rootlets', l: ['Leave the postolivary sulcus, uppermost'], f: ['SVE', 'GVE', 'GVA'] },
  'IX':       { c: 'nerve', t: 'Glossopharyngeal nerve', l: ['Through the jugular foramen (pars nervosa)', 'Superior + inferior (petrosal) ganglia'], f: ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'] },
  'IX-tymp':  { c: 'nerve', t: 'Tympanic nerve (Jacobson)', l: ['From the inferior ganglion into the middle ear', 'Forms the tympanic plexus'], f: ['GVE', 'GVA'] },
  lesserPet:  { c: 'nerve', t: 'Lesser petrosal nerve', l: ['From the tympanic plexus', 'Out through foramen ovale → otic ganglion'], f: ['GVE'] },
  'post-parotid': { c: 'nerve', t: 'Otic → parotid', l: ['Postganglionic fibres ride the auriculotemporal (V3)'], f: ['GVE'] },
  styloN:     { c: 'nerve', t: 'Nerve to stylopharyngeus', l: ['IX’s only motor branch'], f: ['SVE'] },
  sinusN:     { c: 'nerve', t: 'Carotid sinus nerve (Hering)', l: ['Baroreceptors (sinus) + chemoreceptors (body)', '→ solitary nucleus'], f: ['GVA'] },
  'IX-phar':  { c: 'nerve', t: 'Pharyngeal branches of IX', l: ['Sensation of the oropharynx', 'Afferent limb of the gag reflex'], f: ['GVA', 'GSA'] },
  'IX-ling':  { c: 'nerve', t: 'Lingual branch of IX', l: ['Posterior 1/3 of tongue', 'Taste (incl. circumvallate papillae) + touch'], f: ['SVA', 'GSA'] },
  'X-intra':  { c: 'nerve', t: 'X rootlets', l: ['Postolivary sulcus, below IX'], f: ['SVE', 'GVE', 'GVA'] },
  'X':        { c: 'nerve', t: 'Vagus nerve', l: ['Jugular foramen (pars vascularis)', 'Carotid sheath, between ICA and IJV', 'Down to the thorax and abdomen'], f: ['SVE', 'GVE', 'GVA', 'SVA', 'GSA'] },
  'X-visc':   { c: 'nerve', t: 'Vagal parasympathetics', l: ['Preganglionic all the way to the organ', 'Synapse in tiny ganglia in the organ wall'], f: ['GVE'] },
  'X-phar':   { c: 'nerve', t: 'Pharyngeal branch of X', l: ['Pharyngeal plexus → constrictors, palate (not tensor veli), palatoglossus'], f: ['SVE'] },
  supLar:     { c: 'nerve', t: 'Superior laryngeal nerve', l: ['Internal: sensation above the vocal folds (+ epiglottic taste)', 'External: cricothyroid'], f: ['GVA', 'SVA', 'SVE'] },
  extLar:     { c: 'nerve', t: 'External laryngeal nerve', l: ['Cricothyroid — tenses the folds, pitch', 'Runs with the superior thyroid artery'], f: ['SVE'] },
  RLN:        { c: 'nerve', t: 'Left recurrent laryngeal nerve', l: ['Hooks under the aortic arch', 'Up the tracheo-oesophageal groove', 'All intrinsic laryngeal muscles but cricothyroid'], f: ['SVE', 'GVA'] },
  RLNr:       { c: 'nerve', t: 'Right recurrent laryngeal nerve', l: ['Hooks under the right subclavian artery'], f: ['SVE', 'GVA'] },
  cardiacX:   { c: 'nerve', t: 'Cardiac branches', l: ['Slow the SA node and AV conduction'], f: ['GVE', 'GVA'] },
  pulmX:      { c: 'nerve', t: 'Pulmonary branches', l: ['Bronchoconstriction · secretion · stretch afferents'], f: ['GVE', 'GVA'] },
  gastricX:   { c: 'nerve', t: 'Oesophageal plexus → vagal trunks', l: ['Stomach, intestine to the splenic flexure', 'Motility and secretion'], f: ['GVE', 'GVA'] },
  arnold:     { c: 'nerve', t: 'Auricular branch (Arnold)', l: ['Skin of the ear canal and eardrum', 'Ear-canal cough reflex'], f: ['GSA'] },
  'XI-root':  { c: 'nerve', t: 'Spinal accessory rootlets', l: ['Leave the lateral cord, C1–C5'], f: ['SVE'] },
  'XI':       { c: 'nerve', t: 'Accessory nerve', l: ['Ascends through foramen magnum', 'Leaves through the jugular foramen'], f: ['SVE'] },
  'XI-cranial': { c: 'nerve', t: 'Cranial root', l: ['From nucleus ambiguus · joins X', 'Usually counted as part of the vagus'], f: ['SVE'] },
  'XI-scm':   { c: 'nerve', t: 'Branch to SCM', l: ['XI pierces the muscle'], f: ['SVE'] },
  'XI-trap':  { c: 'nerve', t: 'XI in the posterior triangle', l: ['Superficial · at risk in node biopsy', 'Ends in trapezius'], f: ['SVE'] },
  'XII-intra':{ c: 'nerve', t: 'XII rootlets', l: ['Leave between pyramid and olive'], f: ['GSE'] },
  'XII':      { c: 'nerve', t: 'Hypoglossal nerve', l: ['Hypoglossal canal', 'Loops lateral to ICA and ECA', 'Above the hyoid into the tongue'], f: ['GSE'] },
  ansa:       { c: 'nerve', t: 'C1 fibres → ansa cervicalis', l: ['Ride XII, then leave it', 'Geniohyoid, thyrohyoid, infrahyoid straps'], f: ['GSE'] },

  // structures
  jf:        { c: 'foramen', t: 'Jugular foramen', l: ['Pars nervosa: IX + inferior petrosal sinus', 'Pars vascularis: X, XI + sigmoid → IJV'] },
  hgc:       { c: 'foramen', t: 'Hypoglossal canal', l: ['XII only · above the occipital condyle'] },
  fmag:      { c: 'foramen', t: 'Foramen magnum', l: ['Medulla → cord · vertebral arteries', 'Spinal XI enters the skull here'] },
  sigmoid:   { c: 'venous', t: 'Sigmoid sinus', l: ['→ jugular foramen → IJV'] },
  ijv:       { c: 'venous', t: 'Internal jugular vein', l: ['Lateral in the carotid sheath'] },
  supG9:     { c: 'sganglion', t: 'Superior ganglion of IX', l: ['Small · GSA cell bodies'], f: ['GSA'] },
  infG9:     { c: 'sganglion', t: 'Inferior (petrosal) ganglion of IX', l: ['Visceral sensory + taste cell bodies'], f: ['GVA', 'SVA'] },
  supG10:    { c: 'sganglion', t: 'Superior (jugular) ganglion of X', l: ['GSA from the ear'], f: ['GSA'] },
  nodose:    { c: 'sganglion', t: 'Inferior (nodose) ganglion of X', l: ['Visceral sensation from heart, lungs, gut', 'Epiglottic taste'], f: ['GVA', 'SVA'] },
  otic:      { c: 'ganglion', t: 'Otic ganglion', l: ['IX parasympathetic synapse', 'Below foramen ovale, on V3'], f: ['GVE'] },
  tympanic:  { c: 'bone', t: 'Middle ear · tympanic plexus', l: ['On the promontory'] },
  styloid:   { c: 'bone', t: 'Styloid process' },
  hyoid:     { c: 'bone', t: 'Hyoid bone', l: ['XII runs just above it'] },
  vertebrae: { c: 'bone', t: 'Cervical vertebrae' },
  stylophar: { c: 'muscle', t: 'Stylopharyngeus', l: ['IX · elevates the pharynx when swallowing'], f: ['SVE'] },
  constrictors: { c: 'muscle', t: 'Pharyngeal constrictors', l: ['X · pharyngeal plexus · push the bolus down'], f: ['SVE'] },
  softPal:   { c: 'muscle', t: 'Soft palate (levator veli palatini)', l: ['X · lifts the palate — "aah"', 'Tensor veli palatini is V3'], f: ['SVE'] },
  tongueM:   { c: 'muscle', t: 'Tongue muscles', l: ['XII · genioglossus, hyoglossus, styloglossus + intrinsics', 'Palatoglossus is X'], f: ['GSE'] },
  post3:     { c: 'skin', t: 'Posterior 1/3 of tongue', l: ['IX · taste + general sensation'], f: ['SVA', 'GSA'] },
  epiglottis:{ c: 'bone', t: 'Epiglottis', l: ['Taste buds here use X'] },
  larynx:    { c: 'bone', t: 'Larynx', l: ['Above folds: internal laryngeal · below: RLN'] },
  cricothyroid: { c: 'muscle', t: 'Cricothyroid', l: ['X · external laryngeal', 'Tenses the folds — pitch'], f: ['SVE'] },
  intrinsicLar: { c: 'muscle', t: 'Intrinsic laryngeal muscles', l: ['X · recurrent laryngeal', 'Posterior cricoarytenoid = only abductor'], f: ['SVE'] },
  trachea:   { c: 'viscera', t: 'Trachea' },
  esophagus: { c: 'viscera', t: 'Oesophagus', l: ['Upper: skeletal (ambiguus) · lower: smooth (DMN)'] },
  stomach:   { c: 'viscera', t: 'Stomach', l: ['Vagal trunks · secretion and motility'] },
  heart:     { c: 'viscera', t: 'Heart', l: ['Vagus slows the SA node'] },
  lungs:     { c: 'viscera', t: 'Lungs', l: ['Bronchoconstriction, secretion, stretch afferents'] },
  aorta:     { c: 'artery', t: 'Aortic arch', l: ['Left RLN hooks under it'] },
  subclavian:{ c: 'artery', t: 'Right subclavian artery', l: ['Right RLN hooks under it'] },
  cca:       { c: 'artery', t: 'Common carotid artery', l: ['Bifurcates at C4 (upper thyroid cartilage)'] },
  ecaN:      { c: 'artery', t: 'External carotid artery' },
  icaN:      { c: 'artery', t: 'Internal carotid artery', l: ['No branches in the neck'] },
  carSinus:  { c: 'viscera', t: 'Carotid sinus', l: ['Baroreceptor at the ICA origin', 'IX → NTS → vagus: slows the heart'] },
  carBody:   { c: 'viscera', t: 'Carotid body', l: ['Chemoreceptor: low O₂, high CO₂', 'IX → NTS → breathing'] },
  scm:       { c: 'muscle', t: 'Sternocleidomastoid', l: ['XI · turns the face to the opposite side', 'Pierced by XI'], f: ['SVE'] },
  trapezius: { c: 'muscle', t: 'Trapezius', l: ['XI · shrugs, rotates scapula'], f: ['SVE'] },
  infrahyoid:{ c: 'muscle', t: 'Infrahyoid (strap) muscles', l: ['Ansa cervicalis (C1–C3), not XII'], f: ['GSE'] },
  neckF:     { c: 'brain', t: 'Head & neck · cut-away', l: ['Midline structures shown in section', 'SCM and trapezius drawn translucent'] },

  // cross-sections
  icp:       { c: 'brain', t: 'Inferior cerebellar peduncle' },
  solTract:  { c: 'nucleus', t: 'Solitary tract & nucleus', l: ['Taste (rostral) · visceral sensation (caudal)'], f: ['SVA', 'GVA'] },
  'L-dejerine':   { c: 'lesion', t: 'Medial medullary (Dejerine)', l: ['XII fascicles + pyramid + medial lemniscus', 'Tongue deviates toward lesion', 'Contralateral hemiparesis and loss of vibration/position'] },
  'L-wallenberg': { c: 'lesion', t: 'Lateral medullary (Wallenberg)', l: ['Ambiguus · spinal V · spinothalamic · sympathetics', 'Dysphagia, hoarseness, crossed pain loss, Horner'] },
  ventralHorn:{ c: 'brain', t: 'Ventral horn', l: ['Accessory nucleus sits dorsolaterally in it'] },
  dorsalHorn: { c: 'brain', t: 'Dorsal horn' },
  dorsalRoot: { c: 'nerve', t: 'Dorsal root', l: ['Context · C2'], f: ['GSA'] },
  ventralRoot:{ c: 'nerve', t: 'Ventral root', l: ['Context · C2'], f: ['GSE'] },
  spinoth:    { c: 'brain', t: 'Spinothalamic tract', l: ['Crossed body pain/temp'] },

  // jugular foramen card
  parsN:     { c: 'foramen', t: 'Pars nervosa', l: ['Anteromedial · IX + inferior petrosal sinus'] },
  parsV:     { c: 'foramen', t: 'Pars vascularis', l: ['Posterolateral · X, XI, sigmoid sinus → IJV'] },
  jspine:    { c: 'bone', t: 'Intrajugular process', l: ['Bony / fibrous septum between the two parts'] },
  ips:       { c: 'venous', t: 'Inferior petrosal sinus' },
  'L-vernet':  { c: 'lesion', t: 'Vernet syndrome', l: ['Jugular foramen · IX + X + XI'] },
  'L-collet':  { c: 'lesion', t: 'Collet–Sicard syndrome', l: ['IX + X + XI + XII', 'Lesion spanning foramen and hypoglossal canal'] },

  // posterior fossa card
  clivusPF:  { c: 'bone', t: 'Clivus' },
  sigGroove: { c: 'venous', t: 'Sigmoid groove' },
  cerebFossa:{ c: 'bone', t: 'Cerebellar fossa' },

  // throat card
  'tx-aah':    { c: 'eye', t: 'Say "aah"', l: ['Palate rises — X'] },
  'tx-tongue': { c: 'eye', t: 'Stick out the tongue', l: ['Genioglossus — XII'] },
  'tx-shrug':  { c: 'eye', t: 'Shrug', l: ['Trapezius — XI'] },
  'tx-turnL':  { c: 'eye', t: 'Turn head to the left', l: ['Right SCM — XI'] },
  'tx-turnR':  { c: 'eye', t: 'Turn head to the right', l: ['Left SCM — XI'] },
  'tt-gagR':   { c: 'eye', t: 'Touch right pharynx', l: ['IX in → both nuclei ambigui → X out'] },
  'tt-gagL':   { c: 'eye', t: 'Touch left pharynx', l: ['Left IX in → both X out'] },
  'tt-carotid':{ c: 'eye', t: 'Right carotid massage', l: ['IX in → NTS → DMN → X → heart slows'] },
  'tt-voice':  { c: 'eye', t: 'Phonate', l: ['Recurrent laryngeal → vocal folds'] },
  'tt-taste9': { c: 'eye', t: 'Bitter on the back of the right tongue', l: ['IX'] },
  'tc-ctx':    { c: 'brain', t: 'Motor cortex', l: ['Genioglossus driven mainly from the opposite side'] },
  'tc-umn':    { c: 'nerve', t: 'Corticobulbar to XII', l: ['Mostly crossed'] },
  'tc-nts':    { c: 'nucleus', t: 'Solitary nucleus', l: ['Receives IX afferents · relays to both ambigui and DMN'] },
  'tc-sens':   { c: 'nerve', t: 'IX afferents', f: ['GVA'] },
  'tc-inter':  { c: 'nerve', t: 'Brainstem interneurons', l: ['Gag: to both nuclei ambigui', 'Baroreflex: to DMN / ambiguus'] },
  'tc-x':      { c: 'nerve', t: 'Vagal motor', f: ['SVE'] },
  'tc-xh':     { c: 'nerve', t: 'Vagal cardiac', f: ['GVE'] },
  'tc-xii':    { c: 'nerve', t: 'Hypoglossal nerve', f: ['GSE'] },
  'tc-xi':     { c: 'nerve', t: 'Accessory nerve', f: ['SVE'] },
  'tc-gag':    { c: 'viscera', t: 'Pharyngeal receptors (right)' },
  'tc-cs':     { c: 'viscera', t: 'Right carotid sinus' },
  'T-ix':        { c: 'lesion', t: 'Right IX', l: ['No gag from the right · baroreflex lost'] },
  'T-x':         { c: 'lesion', t: 'Right X (high)', l: ['Palate · larynx · heart'] },
  'T-rln':       { c: 'lesion', t: 'Left RLN', l: ['Voice only'] },
  'T-xiPost':    { c: 'lesion', t: 'XI in the posterior triangle', l: ['Trapezius only'] },
  'T-xiJug':     { c: 'lesion', t: 'XI at the skull base', l: ['SCM + trapezius'] },
  'T-xiiL':      { c: 'lesion', t: 'Right XII', l: ['Tongue → right · wasting'] },
  'T-xiiU':      { c: 'lesion', t: 'Left cortex', l: ['Tongue → right · no wasting'] },
  'T-wallenberg':{ c: 'lesion', t: 'Right lateral medulla', l: ['Ambiguus + NTS + neighbours'] },
  'T-vernet':    { c: 'lesion', t: 'Right jugular foramen', l: ['IX + X + XI'] },
  'T-bulbar':    { c: 'lesion', t: 'Bulbar palsy · LMN', l: ['Ambiguus + XII nuclei, both sides', 'Wasting, fasciculation, absent gag'] },
  'T-pseudo':    { c: 'lesion', t: 'Pseudobulbar palsy · UMN', l: ['Corticobulbar tracts, both sides', 'Spastic tongue, brisk gag and jaw jerk'] },

  // neck signature cards
  baro:     { c: 'viscera', t: 'Baroreflex', l: ['↑ pressure stretches the sinus → more IX firing', '→ NTS → vagus → slower heart'] },
  folds:    { c: 'viscera', t: 'Vocal folds (laryngoscopic view)', l: ['Abduct to breathe, adduct to speak'] },
  arytenoid:{ c: 'bone', t: 'Arytenoid cartilages', l: ['Rotate to open and close the folds'] },
  ggR:      { c: 'muscle', t: 'Right genioglossus', l: ['Pushes the tongue forward and to the LEFT'], f: ['GSE'] },
  ggL:      { c: 'muscle', t: 'Left genioglossus', l: ['Pushes the tongue forward and to the RIGHT'], f: ['GSE'] },

  // ── V / VII signature cards
  'sb-oralis':  { c: 'nucleus', t: 'Subnucleus oralis', l: ['Most rostral · inner ring around the mouth'], f: ['GSA'] },
  'sb-interp':  { c: 'nucleus', t: 'Subnucleus interpolaris', l: ['Middle ring'], f: ['GSA'] },
  'sb-caudal':  { c: 'nucleus', t: 'Subnucleus caudalis', l: ['Medulla → C2 · outer ring of the face', 'Lost first in lateral medullary lesions'], f: ['GSA'] },
  jawjerk:      { c: 'nerve', t: 'Jaw jerk', l: ['Spindle → mesencephalic V → motor V', 'Monosynaptic · brisk in UMN lesions above the pons'], f: ['GSA', 'SVE'] },
  'frontal':   { c: 'nerve', t: 'Frontal & lacrimal nerves', l: ['V1 branches above the annulus'], f: ['GSA'] },
  'nasocil':   { c: 'nerve', t: 'Nasociliary nerve', l: ['V1 branch inside the annulus', 'Gives the sensory root of the ciliary ganglion'], f: ['GSA'] },
  'sens-root': { c: 'nerve', t: 'Sensory root of ciliary ganglion', l: ['Corneal & ocular sensation', 'Passes through · no synapse'], f: ['GSA'] },
  'symp-root': { c: 'nerve', t: 'Sympathetic root', l: ['From internal carotid plexus', 'Passes through · no synapse', '→ dilator pupillae · vessels'], f: ['SYM'] },
  'symp-plexus': { c: 'nerve', t: 'Internal carotid plexus', l: ['Postganglionic, from superior cervical ganglion', 'Briefly rides on VI in the sinus'], f: ['SYM'] },
  'V23':       { c: 'nerve', t: 'Maxillary & mandibular (V2, V3)', l: ['Context · to rotundum and ovale'], f: ['GSA'] },
  tg:          { c: 'sganglion', t: 'Trigeminal ganglion', l: ["In Meckel's cave on the petrous apex", 'Cell bodies of touch, pain, temperature', 'No synapse · motor root slips beneath'], f: ['GSA'] },

  // ── vessels & dura
  basilar:  { c: 'artery', t: 'Basilar artery', l: ['In the basilar sulcus of the pons'] },
  vert:     { c: 'artery', t: 'Vertebral arteries', l: ['Join at the pontomedullary junction'] },
  pca:      { c: 'artery', t: 'Posterior cerebral artery', l: ['III and IV pass beneath it'] },
  sca:      { c: 'artery', t: 'Superior cerebellar artery', l: ['III and IV pass above it'] },
  aica:     { c: 'artery', t: 'Anterior inferior cerebellar a.', l: ['VI crosses it'] },
  pcomm:    { c: 'artery', t: 'Posterior communicating artery', l: ['III runs right beside it', 'Aneurysm → painful III palsy + dilated pupil'] },
  ica:      { c: 'artery', t: 'Internal carotid artery', l: ['Cavernous segment · siphon', 'VI lies directly lateral'] },
  oa:       { c: 'artery', t: 'Ophthalmic artery', l: ['Through optic canal, below CN II'] },
  cs:       { c: 'venous', t: 'Cavernous sinus', l: ['Lateral wall: III · IV · V1 · V2', 'Within the sinus: ICA + VI'] },
  sov:      { c: 'venous', t: 'Superior ophthalmic vein', l: ['SOF, above the annulus'] },
  iov:      { c: 'venous', t: 'Inferior ophthalmic vein', l: ['Below the annulus'] },
  tent:     { c: 'dura', t: 'Tentorium cerebelli', l: ['IV runs under its free edge'] },
  gruber:   { c: 'dura', t: "Gruber's ligament", l: ['Petrosphenoidal ligament', "Roof of Dorello's canal"] },
  dorello:  { c: 'foramen', t: "Dorello's canal", l: ['VI bends sharply over petrous apex here', 'Tethered → stretched by raised ICP'] },
  porus:    { c: 'foramen', t: 'Oculomotor porus', l: ['III pierces dura of the oculomotor triangle'] },
  petrous:  { c: 'bone', t: 'Petrous apex', l: ['Temporal bone'] },
  clivus:   { c: 'bone', t: 'Clivus', l: ['Sloping basi-occiput', 'VI climbs it'] },

  // ── orbit
  sof:     { c: 'foramen', t: 'Superior orbital fissure', l: ['Between greater and lesser wings of sphenoid', 'Above ring: lacrimal · frontal · IV · SOV', 'In ring: III sup · nasociliary · III inf · VI'] },
  annulus: { c: 'dura', t: 'Common tendinous ring', l: ['Annulus of Zinn', 'Origin of the four recti', 'Encloses optic canal + middle SOF'] },
  'optic-canal': { c: 'foramen', t: 'Optic canal', l: ['CN II + ophthalmic artery'] },
  'optic-n': { c: 'nerve', t: 'Optic nerve', l: ['Special sense · separate page', 'Ciliary ganglion sits lateral to it'], f: ['SSA'] },
  cg:      { c: 'ganglion', t: 'Ciliary ganglion', l: ['Lateral to optic nerve, near the apex', 'Only GVE fibres synapse here', 'Sensory + sympathetic roots pass through'], f: ['GVE', 'GSA', 'SYM'] },
  globe:   { c: 'eye', t: 'Globe', l: ['Lateral view · anterior is right'] },
  lid:     { c: 'eye', t: 'Upper eyelid', l: ['LPS aponeurosis inserts here', 'Superior tarsal (Müller) m. = sympathetic'] },
  trochlea:{ c: 'dura', t: 'Trochlea', l: ['Fibrocartilage pulley', 'Redirects SO tendon backwards'] },
  bone:    { c: 'bone', t: 'Orbital walls' },
  SR:  { c: 'muscle', t: 'Superior rectus', l: ['III · superior division', 'Elevates (best in abduction)', '+ intorsion · adduction'], f: ['GSE'] },
  LPS: { c: 'muscle', t: 'Levator palpebrae superioris', l: ['III · superior division', 'Raises upper lid'], f: ['GSE'] },
  SO:  { c: 'muscle', t: 'Superior oblique', l: ['IV · enters upper surface', 'Depresses (best in adduction)', '+ intorsion · abduction'], f: ['GSE'] },
  IR:  { c: 'muscle', t: 'Inferior rectus', l: ['III · inferior division', 'Depresses (best in abduction)', '+ extorsion · adduction'], f: ['GSE'] },
  IO:  { c: 'muscle', t: 'Inferior oblique', l: ['III · inferior division', 'Elevates (best in adduction)', '+ extorsion · abduction', 'Only muscle not from the apex'], f: ['GSE'] },
  LR:  { c: 'muscle', t: 'Lateral rectus', l: ['VI · enters ocular surface', 'Abducts', 'Drawn as glass to see beneath'], f: ['GSE'] },
  MR:  { c: 'muscle', t: 'Medial rectus', l: ['III · inferior division', 'Adducts · on the far wall'], f: ['GSE'] },
  lacrimal: { c: 'nerve', t: 'Lacrimal nerve', l: ['V1 · above the ring'], f: ['GSA'] },

  // ── cross-sections
  aqueduct: { c: 'brain', t: 'Cerebral aqueduct', l: ['CSF · 3rd → 4th ventricle'] },
  pag:      { c: 'brain', t: 'Periaqueductal grey' },
  sc:       { c: 'brain', t: 'Superior colliculus', l: ['Level of the III nucleus'] },
  ic:       { c: 'brain', t: 'Inferior colliculus', l: ['Level of the IV nucleus'] },
  rn:       { c: 'brain', t: 'Red nucleus', l: ['III fascicles run through it'] },
  sn:       { c: 'brain', t: 'Substantia nigra' },
  mlf:      { c: 'brain', t: 'Medial longitudinal fasciculus', l: ['Links VI, IV and III nuclei', 'Lesion → internuclear ophthalmoplegia'] },
  scpx:     { c: 'brain', t: 'Decussation of sup. cerebellar peduncles' },
  smv:      { c: 'brain', t: 'Superior medullary velum', l: ['Roof of upper 4th ventricle', 'IV fibres cross here'] },
  v4:       { c: 'brain', t: 'Fourth ventricle' },
  fc:       { c: 'brain', t: 'Facial colliculus', l: ['Bump = VI nucleus + VII genu'] },
  ml:       { c: 'brain', t: 'Medial lemniscus' },
  cst:      { c: 'brain', t: 'Corticospinal bundles', l: ['Basilar pons'] },
  genu:     { c: 'nerve', t: 'Internal genu of VII', l: ['Loops over the VI nucleus'], f: ['SVE'] },
  inter:    { c: 'nerve', t: 'Abducens interneurons', l: ['Cross immediately · ascend contralateral MLF', '→ medial rectus subnucleus of III'], f: ['GSE'] },
  pineal:   { c: 'brain', t: 'Pineal gland' },
  scp:      { c: 'brain', t: 'Superior cerebellar peduncle' },
  pit:      { c: 'gland', t: 'Pituitary gland', l: ['In sella turcica, between the sinuses'] },
  sphenoid: { c: 'bone', t: 'Sphenoid sinus', l: ['Air · below the sella'] },
  temporal: { c: 'brain', t: 'Temporal lobe', l: ['Lateral to the sinus'] },
  'V1x':    { c: 'nerve', t: 'V1', l: ['Lateral wall'], f: ['GSA'] },
  'V2x':    { c: 'nerve', t: 'V2', l: ['Lowest in the lateral wall'], f: ['GSA'] },

  // ── lesions
  'L-weber':    { c: 'lesion', t: 'Weber syndrome', l: ['Crus + III fascicles', 'Ipsilateral III palsy', 'Contralateral hemiparesis'] },
  'L-benedikt': { c: 'lesion', t: 'Benedikt syndrome', l: ['Red nucleus + III fascicles', 'Ipsilateral III palsy', 'Contralateral tremor / ataxia'] },
  'L-iv-nuc':   { c: 'lesion', t: 'Nucleus / pre-crossing lesion', l: ['Contralateral SO palsy'] },
  'L-iv-nerve': { c: 'lesion', t: 'Lesion after the crossing', l: ['Ipsilateral SO palsy', 'Commonest: head trauma'] },
  'L-foville':  { c: 'lesion', t: 'VI nucleus (Foville)', l: ['Ipsilateral horizontal gaze palsy', 'not just LR — interneurons lost', '+ VII palsy from the genu'] },
  'L-ino':      { c: 'lesion', t: 'MLF lesion', l: ['Internuclear ophthalmoplegia', 'Ipsilateral eye fails to adduct', 'Abducting eye nystagmus'] },
  'L-raymond':  { c: 'lesion', t: 'Ventral pons (Raymond)', l: ['VI fascicles + corticospinal', 'Ipsilateral LR palsy', 'Contralateral hemiparesis'] },

  // ── gaze circuit (Movements card)
  'c-iii-n':   { c: 'nerve', t: 'III → medial rectus', l: ['Also carries vertical gaze and convergence'], f: ['GSE'] },
  'c-vi-n':    { c: 'nerve', t: 'VI → lateral rectus', f: ['GSE'] },
  'c-mlf':     { c: 'brain', t: 'MLF', l: ['Interneuron axons from the opposite VI nucleus', '→ medial rectus subnucleus of III'] },
  'c-pprf':    { c: 'brain', t: 'PPRF', l: ['Paramedian pontine reticular formation', 'Horizontal gaze centre → same-side VI nucleus'] },
  'c-rimlf':   { c: 'brain', t: 'Vertical gaze centre', l: ['riMLF + posterior commissure', 'Rostral dorsal midbrain'] },
  'c-pretect': { c: 'brain', t: 'Pretectal nuclei', l: ['Light reflex relay', 'Project to both Edinger–Westphal nuclei'] },
  'c-plr':     { c: 'nerve', t: 'Pretectum → Edinger–Westphal', l: ['Light-reflex limb · bilateral', 'The near response bypasses it'], f: ['GVE'] },
  'c-symp':    { c: 'nerve', t: 'Oculosympathetic chain', l: ['Hypothalamus → T1 → superior cervical ganglion', '→ ICA plexus → dilator pupillae, Müller m.'], f: ['SYM'] },
  'px-light':  { c: 'eye', t: 'Shine a light', l: ['Pretectum → both EW → both pupils constrict'] },
  'px-near':   { c: 'eye', t: 'Near triad', l: ['Convergence · accommodation · miosis', 'Cortical route that spares the pretectum'] },
  'px-gaze':   { c: 'eye', t: 'Gaze direction', l: ['Hover to look · left side = patient’s right'] },

  // ── disorders (lesion markers + chips)
  'D-III':      { c: 'lesion', t: 'Oculomotor nerve palsy', l: ['Down & out · ptosis · dilated, fixed pupil', 'No adduction, even with convergence'] },
  'D-IV':       { c: 'lesion', t: 'Trochlear nerve palsy', l: ['Hypertropia worst looking down & in', 'Head tilts away from the lesion'] },
  'D-VI':       { c: 'lesion', t: 'Abducens nerve palsy', l: ['Only the right eye fails to abduct', 'Compare: VI nucleus lesion'] },
  'D-ino':      { c: 'lesion', t: 'INO · right MLF', l: ['Right eye fails to adduct on left gaze', 'Left eye: abducting nystagmus', 'Convergence spared → MR itself is fine', 'Young: MS · older: stroke'] },
  'D-onehalf':  { c: 'lesion', t: 'One-and-a-half', l: ['Right gaze palsy ("one")', '+ right INO ("half")', 'Only left-eye abduction remains'] },
  'D-vinuc':    { c: 'lesion', t: 'VI nucleus lesion', l: ['Motor neurons + interneurons lost', 'Both eyes fail to look right', 'Often with VII palsy (genu)'] },
  'D-parinaud': { c: 'lesion', t: 'Parinaud · dorsal midbrain', l: ['Upgaze palsy · lid retraction (Collier)', 'Convergence–retraction nystagmus', 'Mid-dilated pupils: light ✗ near ✓', 'Pinealoma · hydrocephalus'] },
  'D-argyll':   { c: 'lesion', t: 'Argyll Robertson', l: ['Pretectal light fibres cut', 'Small, irregular pupils', 'Accommodate but don’t react', 'Neurosyphilis'] },
  'D-adie':     { c: 'lesion', t: 'Adie tonic pupil', l: ['Ciliary ganglion · postganglionic parasympathetic', 'Large pupil, poor light, slow near'] },
  'D-uncal':    { c: 'lesion', t: 'Uncal herniation', l: ['III compressed against the tentorium', 'Pupil first · emergency'] },
  'D-mg':       { c: 'lesion', t: 'Myasthenia gravis', l: ['Neuromuscular junction, not nerve', 'Fatigable ptosis · pupils spared'] },
  'D-cavsinus': { c: 'lesion', t: 'Cavernous sinus syndrome', l: ['III, IV, V1, V2, VI + sympathetics', 'Thrombosis · fistula · apoplexy'] },
  'D-horner':   { c: 'lesion', t: 'Horner syndrome', l: ['Ptosis (Müller m.) · miosis · anhidrosis', 'Pupil still reacts to light and near', 'Anywhere along the 3-neuron chain'] },

  // ── ciliary card
  sphincter: { c: 'muscle', t: 'Sphincter pupillae', l: ['Smooth muscle ring', 'Miosis · light reflex'], f: ['GVE'] },
  dilator:   { c: 'muscle', t: 'Dilator pupillae', l: ['Radial smooth muscle', 'Mydriasis · sympathetic'], f: ['SYM'] },
  ciliary:   { c: 'muscle', t: 'Ciliary muscle', l: ['Contracts → zonules slacken', 'Lens rounds up for near'], f: ['GVE'] },
  lens:      { c: 'eye', t: 'Lens', l: ['Accommodation'] },
  'pre-gve': { c: 'nerve', t: 'Preganglionic parasympathetic', l: ['EW → within III → motor root'], f: ['GVE'] }
};

// Abbreviations popup: [abbreviation, expansion, note]. Grouped by category.
const ABBREV = {
  'Fibre types': [
    ['GSE', 'General somatic efferent', 'skeletal muscle from somites — eye muscles, tongue'],
    ['GVE', 'General visceral efferent', 'parasympathetic, two-neuron chain'],
    ['SVE', 'Special visceral efferent', 'pharyngeal-arch muscles · “branchial motor”'],
    ['GSA', 'General somatic afferent', 'touch, pain, temperature, proprioception'],
    ['GVA', 'General visceral afferent', 'organ sensation · carotid sinus, gut'],
    ['SVA', 'Special visceral afferent', 'taste (and smell, by tradition)'],
    ['SSA', 'Special somatic afferent', 'vision, hearing, balance'],
    ['SYM', 'Sympathetic', 'postganglionic passengers from the superior cervical ganglion']
  ],
  'Cranial nerves': [
    ['I', 'Olfactory nerve', ''], ['II', 'Optic nerve', ''], ['III', 'Oculomotor nerve', ''], ['IV', 'Trochlear nerve', ''],
    ['V', 'Trigeminal nerve', ''], ['V1 · V2 · V3', 'Ophthalmic · maxillary · mandibular divisions of V', 'not to be confused with visual areas V1, V2'],
    ['VI', 'Abducens nerve', ''], ['VII', 'Facial nerve', ''], ['NI', 'Nervus intermedius', 'sensory + parasympathetic root of VII'],
    ['VIII', 'Vestibulocochlear nerve', ''], ['IX', 'Glossopharyngeal nerve', ''], ['X', 'Vagus nerve', ''],
    ['XI', 'Accessory nerve', ''], ['XII', 'Hypoglossal nerve', ''],
    ['CN', 'Cranial nerve', 'also: cochlear nucleus, in the hearing diagrams'],
    ['GSPN', 'Greater superficial petrosal nerve', 'VII → pterygopalatine ganglion · tears, palate taste'],
    ['RLN', 'Recurrent laryngeal nerve', 'X · loops under the subclavian / aortic arch'],
    ['IAN', 'Inferior alveolar nerve', 'V3 · lower teeth, chin']
  ],
  'Brainstem & nuclei': [
    ['EW', 'Edinger–Westphal nucleus', 'parasympathetic to the pupil and lens (III)'],
    ['NTS', 'Nucleus of the solitary tract', 'taste (rostral) and visceral sensation (caudal)'],
    ['DMN', 'Dorsal motor nucleus of the vagus', 'parasympathetic to heart, lungs, gut'],
    ['SSN', 'Superior salivatory nucleus', 'VII · tears, submandibular and sublingual saliva'],
    ['ISN', 'Inferior salivatory nucleus', 'IX · parotid saliva'],
    ['PPRF', 'Paramedian pontine reticular formation', 'horizontal gaze centre'],
    ['riMLF', 'Rostral interstitial nucleus of the MLF', 'vertical gaze centre'],
    ['SC', 'Superior colliculus', 'orienting eye and head movements'],
    ['IC', 'Inferior colliculus', 'midbrain hearing relay'],
    ['SOC', 'Superior olivary complex', 'where the two ears first meet'],
    ['MSO', 'Medial superior olive', 'interaural time differences'],
    ['LSO', 'Lateral superior olive', 'interaural level differences'],
    ['MNTB', 'Medial nucleus of the trapezoid body', 'inhibitory relay to the LSO · calyx of Held'],
    ['VCN · DCN', 'Ventral · dorsal cochlear nucleus', ''],
    ['VN', 'Vestibular nuclei', ''],
    ['SCN', 'Suprachiasmatic nucleus', 'hypothalamus · body clock'],
    ['ICP · MCP · SCP', 'Inferior · middle · superior cerebellar peduncle', 'ICP also = intracranial pressure'],
    ['CPA', 'Cerebellopontine angle', 'VII and VIII leave the brainstem here'],
    ['PMJ', 'Pontomedullary junction', '']
  ],
  'Pathways & tracts': [
    ['MLF', 'Medial longitudinal fasciculus', 'yokes the eyes · lesion = INO'],
    ['LOT', 'Lateral olfactory tract', 'bulb → piriform cortex'],
    ['CTT', 'Central tegmental tract', 'NTS → thalamus (taste)'],
    ['VOR', 'Vestibulo-ocular reflex', 'head turns, eyes stay on target'],
    ['VST', 'Vestibulospinal tract', 'posture']
  ],
  'Thalamus & cortex': [
    ['LGN', 'Lateral geniculate nucleus', 'thalamic relay for vision'],
    ['MGN', 'Medial geniculate nucleus', 'thalamic relay for hearing'],
    ['VPM · VPMpc', 'Ventral posteromedial nucleus · its parvicellular part', 'face sensation · taste relay'],
    ['MD', 'Mediodorsal thalamus', 'piriform → orbitofrontal'],
    ['V1 · V2 · V4', 'Primary, secondary and fourth visual areas', 'V4 = colour'],
    ['MT · V5', 'Middle temporal area', 'motion'],
    ['MST', 'Medial superior temporal area', 'optic flow'],
    ['IT', 'Inferotemporal cortex', 'objects'],
    ['FFA', 'Fusiform face area', 'faces · lesion = prosopagnosia'],
    ['PPC', 'Posterior parietal cortex', 'space, attention, reaching'],
    ['A1', 'Primary auditory cortex', 'Heschl’s gyrus'],
    ['PT', 'Planum temporale', 'behind Heschl’s gyrus'],
    ['STG · STS', 'Superior temporal gyrus · sulcus', ''],
    ['IFG', 'Inferior frontal gyrus', 'Broca’s area'],
    ['IPL', 'Inferior parietal lobule', ''],
    ['OFC', 'Orbitofrontal cortex', 'flavour, value'],
    ['PFC · dPFC', 'Prefrontal · dorsal prefrontal cortex', '']
  ],
  'Vessels & spaces': [
    ['ICA · ECA · CCA', 'Internal · external · common carotid artery', ''],
    ['PCA', 'Posterior cerebral artery', ''],
    ['SCA', 'Superior cerebellar artery', ''],
    ['AICA', 'Anterior inferior cerebellar artery', 'loops near VII and VIII'],
    ['PICA', 'Posterior inferior cerebellar artery', 'lateral medullary (Wallenberg) syndrome'],
    ['PComm', 'Posterior communicating artery', 'aneurysm → III palsy with a blown pupil'],
    ['CRA', 'Central retinal artery', ''],
    ['IJV', 'Internal jugular vein', ''],
    ['CSF', 'Cerebrospinal fluid', '']
  ],
  'Foramina & skull': [
    ['SOF', 'Superior orbital fissure', 'III, IV, V1, VI'],
    ['IAM', 'Internal acoustic meatus', 'VII, NI, VIII'],
    ['PPF', 'Pterygopalatine fossa', ''],
    ['JF', 'Jugular foramen', 'IX, X, XI']
  ],
  'Muscles, glands & ganglia': [
    ['LR · MR', 'Lateral · medial rectus', 'VI · III'],
    ['SR · IR', 'Superior · inferior rectus', 'III'],
    ['SO · IO', 'Superior · inferior oblique', 'IV · III'],
    ['LPS', 'Levator palpebrae superioris', 'III'],
    ['SCM', 'Sternocleidomastoid', 'XI'],
    ['PPG', 'Pterygopalatine ganglion', 'VII · tears, nasal glands'],
    ['SMG', 'Submandibular ganglion', 'VII · submandibular and sublingual glands'],
    ['RPE', 'Retinal pigment epithelium', 'recycles retinal'],
    ['RGC', 'Retinal ganglion cell', 'axons form the optic nerve'],
    ['IHC · OHC', 'Inner · outer hair cell', 'receptor · amplifier'],
    ['OR', 'Olfactory receptor', '~400 types in humans']
  ],
  'Molecules & channels': [
    ['GPCR', 'G-protein-coupled receptor', 'ORs, rhodopsin, taste T1R / T2R'],
    ['Gα<sub>olf</sub> · G<sub>t</sub>', 'Olfactory G protein · transducin', ''],
    ['AC III', 'Adenylyl cyclase type III', 'smell'],
    ['cAMP · cGMP', 'Cyclic adenosine / guanosine monophosphate', 'second messengers'],
    ['GTP · GDP', 'Guanosine tri- / diphosphate', ''],
    ['ATP', 'Adenosine triphosphate', 'also the taste transmitter'],
    ['IP₃ · DAG', 'Inositol trisphosphate · diacylglycerol', ''],
    ['PLCβ2', 'Phospholipase C β2', 'taste'],
    ['PDE6 · PDE1C', 'Phosphodiesterase 6 · 1C', 'vision · smell'],
    ['GC · GCAP', 'Guanylyl cyclase · its activating protein', ''],
    ['RK · GRK3', 'Rhodopsin kinase · G-protein receptor kinase 3', 'switch receptors off'],
    ['RGS9', 'Regulator of G-protein signalling 9', ''],
    ['CaM', 'Calmodulin', ''],
    ['CNG', 'Cyclic-nucleotide-gated channel', 'smell, rods and cones'],
    ['ANO2', 'Anoctamin 2', 'Ca²⁺-activated Cl⁻ channel in smell'],
    ['NKCC1', 'Na⁺–K⁺–2Cl⁻ cotransporter', 'loads smell neurons with Cl⁻'],
    ['MET', 'Mechanoelectrical transduction channel', 'hair-cell tips · TMC1/2'],
    ['TMC1/2', 'Transmembrane channel-like 1 / 2', ''],
    ['Ca<sub>v</sub>1.3', 'Voltage-gated Ca²⁺ channel', 'hair-cell synapse'],
    ['KCNQ4 · BK', 'K⁺ channels of the hair-cell base', ''],
    ['TRPM5 · TRPM1', 'Transient receptor potential channels', 'taste · ON bipolar cells'],
    ['TRPV1 · TRPM8', 'Heat (capsaicin) · cold (menthol) receptors', 'trigeminal, not taste'],
    ['CALHM1/3', 'Calcium homeostasis modulator', 'ATP-release channel in taste'],
    ['P2X2 · P2X3', 'ATP-gated receptors', 'on taste afferents'],
    ['ENaC', 'Epithelial Na⁺ channel', 'low salt taste'],
    ['OTOP1', 'Otopetrin 1', 'sour (H⁺) channel'],
    ['T1R · T2R', 'Taste receptor type 1 · type 2', 'sweet/umami · bitter'],
    ['Kir2.1', 'Inward-rectifier K⁺ channel', 'sour cells'],
    ['mGluR6', 'Metabotropic glutamate receptor 6', 'ON bipolar cells'],
    ['AMPA', 'Ionotropic glutamate receptor', 'OFF bipolar cells'],
    ['5-HT', 'Serotonin', 'sour (type III) cell transmitter'],
    ['ER', 'Endoplasmic reticulum', 'Ca²⁺ store'],
    ['PROP · PTC', 'Propylthiouracil · phenylthiocarbamide', 'bitter test compounds'],
    ['IMP · GMP', 'Inosine / guanosine monophosphate', 'umami enhancers']
  ],
  'Clinical & tests': [
    ['UMN · LMN', 'Upper · lower motor neuron', ''],
    ['INO', 'Internuclear ophthalmoplegia', 'MLF lesion'],
    ['RAPD', 'Relative afferent pupillary defect', 'swinging-light test'],
    ['ICP', 'Intracranial pressure', 'also: inferior cerebellar peduncle'],
    ['MS', 'Multiple sclerosis', ''],
    ['NF2', 'Neurofibromatosis type 2', 'bilateral vestibular schwannomas'],
    ['BPPV', 'Benign paroxysmal positional vertigo', ''],
    ['HIT', 'Head impulse test', ''],
    ['HINTS', 'Head Impulse, Nystagmus, Test of Skew', 'stroke vs neuritis in acute vertigo'],
    ['AC · BC', 'Air · bone conduction', 'Rinne test'],
    ['OAE', 'Otoacoustic emissions', 'outer hair cell test · newborn screening'],
    ['MRI', 'Magnetic resonance imaging', '']
  ],
  'Physics & units': [
    ['ITD', 'Interaural time difference', 'low-frequency localisation'],
    ['ILD', 'Interaural level difference', 'high-frequency localisation'],
    ['EP', 'Endocochlear potential', '+80 mV'],
    ['Hz · kHz', 'Hertz · kilohertz', 'cycles per second'],
    ['dB', 'Decibel', 'log scale of sound level'],
    ['µs · ms', 'Microsecond · millisecond', ''],
    ['mV · mM', 'Millivolt · millimolar', '']
  ]
};
