# Cranial Nerves

An interactive, diagram-first map of the twelve cranial nerves. For each nerve the page shows its course from nucleus to target, its fibre types, the anatomy along the way, and what happens when it is damaged. Popups cover the background (fibre types, foramina, reflexes, how the senses work, the bedside exam) and there is a quiz to test yourself.

Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies.

> **A study aid, not a clinical reference.** The drawings are simplified schematics. Check anything that matters against a textbook or a clinician.

---

## Contents

1. [Running it](#running-it)
2. [Features](#features)
3. [Project layout](#project-layout)
4. [How the page boots and updates](#how-the-page-boots-and-updates)
5. [The JavaScript, file by file](#the-javascript-file-by-file)
6. [Shared globals](#shared-globals)
7. [index.html and styles.css](#indexhtml-and-stylescss)
8. [How to add or edit](#how-to-add-or-edit)
9. [Conventions](#conventions)
10. [Limitations](#limitations)

---

## Running it

Open `index.html` in a modern browser. It works straight from the file system (`file://`) because every script is a classic `<script>`, not an ES module. Any static server works too:

```sh
npx serve .        # or: python -m http.server
```

Fonts (Cormorant Garamond, Inter) come from Google Fonts. Offline, the page falls back to system fonts and works otherwise unchanged.

The selected nerve is kept in the URL hash, so `index.html#VII` opens on the facial nerve.

---

## Features

### Page order, top to bottom

| Part | What it is |
|---|---|
| **Title + "?"** | The "?" opens the how-to popup. It opens by itself on the first visit only. |
| **Reading room** | Popups that don't depend on the chosen nerve, in four columns: Foundations · How the senses work · At the bedside · Test yourself. The abbreviation search sits in its top-right corner. |
| **Nerve picker** | The twelve nerves grouped by region (special senses · orbit · face · neck). The coloured dots under each numeral show the fibre types the nerve carries. A slim copy (the *sticky bar*) follows you once the picker scrolls off-screen. |
| **Pathway strip** | The nerve's stations from nucleus to target. Hover a station to spotlight it on the stage; click to scroll the stage into view. |
| **Stage** | The whole course in one SVG: brainstem on the left, skull base and foramina in the middle, target on the right. Smell, sight and hearing get their own layouts. The **fibre-type key** runs along its top edge (click a type to hide those fibres), with four **tools** at the right end: Labels · Context (neighbouring nerves) · Impulses (sparks) · Isolate. |
| **Cards i–v** | i–iii: close-ups (a brainstem cross-section, key passages such as the cavernous sinus, a foramen or the internal acoustic meatus, a field-defect map). iv: the **clinical card**. v: the **signature**, one interactive idea per nerve. |
| **Footer** | Disclaimer and a link to the GitHub repository. |

### Clinical cards (iv)

Each card has an examinable patient, a circuit diagram that lights up to the first broken link, a findings strip, and a "what & why" explanation.

| Card | Nerves | Lesions |
|---|---|---|
| Movements | III · IV · VI | III, IV and VI palsies · INO · one-and-a-half · VI nucleus · Parinaud · Argyll Robertson · Horner · Adie · uncal herniation · myasthenia gravis · cavernous sinus |
| Face | V · VII | V1 and V3 lesions · spinal V · trigeminal neuralgia · central (UMN) facial palsy · Bell's palsy at the stylomastoid foramen · lesions above the chorda and above the nerve to stapedius · geniculate (Ramsay Hunt) |
| Throat & neck | IX–XII | IX · high X · left RLN · XI (posterior triangle, jugular foramen) · XII (LMN, UMN) · Wallenberg · jugular foramen (Vernet) · bulbar · pseudobulbar |
| Smell | I | trauma · olfactory groove meningioma · post-viral · Kallmann · neurodegeneration · uncinate fits · nasal polyps |
| Fields & pupils | II | ischaemic optic neuropathy · central retinal artery occlusion · optic neuritis · chiasm · optic tract · Meyer's loop · parietal · occipital · papilloedema |
| Hearing & balance | VIII | conductive loss · vestibular schwannoma · vestibular neuritis · labyrinthitis · Ménière's · BPPV · cerebellar stroke (HINTS) |

### Popups

| Group | Popup | What it does |
|---|---|---|
| — | **How to use this page** ("?") | Quick start, a clickable wireframe of the page, a drawing legend, keyboard shortcuts. |
| Foundations | **Fibre types** | A G/S · S/V · A/E decoder and where each nucleus column sits. |
| | **Foramina & ganglia** | What passes through each opening, who synapses in each ganglion, which fibres share a nerve segment. |
| | **Reflex arcs** | Eleven reflexes drawn as receptor → afferent → brainstem centre → efferent → effector. Cut either limb to see what you'd find; a summary table lists them all. |
| How the senses work | **Smell · Sight · Hearing · Taste** | Step-through transduction plus interactive pathway diagrams. |
| At the bedside | **Physical exam** | How each nerve is examined: what to ask, look for and do, with what equipment, and what abnormal means. Click an instrument to see where it is used. Opens on the current nerve. |
| | **Where is the lesion?** | Tick findings (cranial nerve signs are taken to be on the right). A map of the hemispheres, three brainstem sections and 14 places outside the brainstem lights up the three best-fitting sites and explains the best one. |
| Test yourself | **Quiz** (Anatomy · Pathways · Clinical) | 157 multiple-choice questions. Rounds of 10, 20 or all; filter by field (or Mixed) and topic; every answer comes with an explanation; the end screen scores each topic and can retry the missed questions. |
| (search box) | **Abbreviations** | About 140 entries, searchable and filterable by category. |

### Keyboard

| Key | Action |
|---|---|
| `←` `→` | previous / next nerve (ignored while a popup is open) |
| `/` | abbreviations |
| `?` | help |
| `1`–`4`, `Enter` | answer, next question (quiz) |
| `Esc` | close the open popup |

---

## Project layout

```
index.html          page shell: header (title + reading room), picker, sticky bar, route strip,
                    stage (+ fibre key + tools), five card slots, footer, tooltip, script tags
css/styles.css      all styling (~2,000 lines), one section per part of the page and per popup
js/
  ── content & drawing primitives
  data.js           CONTENT: fibre types, regions, nerves, lesion tables, muscles, hover notes, abbreviations
  defs.js           shared SVG <defs>: gradients, patterns, filters, markers
  stage.js          the stage: fibre geometry, the brainstem, one scene per region, buildStage()
  panels.js         cards i–iii and v, plus small SVG helpers used everywhere
  ── clinical cards (card iv)
  clinic.js         shared machinery: circuits, chain lighting, findings strip, explanation panel
  eyes.js           Movements (III IV VI)
  faces.js          Face (V VII)
  throat.js         Throat & neck (IX–XII)
  smell.js          Smell (I)
  vision.js         Fields & pupils (II)
  hear.js           Hearing & balance (VIII)
  ── popups
  fibres.js         fibre-type naming
  info.js           shared popup machinery (modal shell, step player, stacked captions, explanation cards)
  olfaction.js      how smell works
  sight.js          how sight works
  hearing.js        how hearing works
  taste.js          how taste works
  passages.js       foramina, ganglia & passengers
  abbr.js           abbreviations
  help.js           how to use this page
  exam.js           physical examination
  reflex.js         reflex arcs
  lesion.js         where is the lesion?
  quiz.js           quizzes
  ── glue
  app.js            state, header, legend, route strip, card dispatch, tooltips, hover layers, wiring, init()
```

Rough sizes: `data.js` ~1,750 lines, `panels.js` ~1,000, `stage.js` ~900, `app.js` ~500; each card module and popup is 60–400.

---

## How the page boots and updates

### Load order

Every file is a classic script sharing one global scope, so **a file may only use what was loaded before it**. The order in `index.html` is:

```
data → defs → stage → panels → clinic → eyes → faces → throat → smell → vision → hear
     → fibres → info → olfaction → sight → hearing → taste → passages → abbr → help
     → exam → reflex → lesion → quiz → app
```

`app.js` is last and its final line calls `init()`. New files go anywhere above `app.js` (after anything they use).

### `init()` (app.js)

1. Injects `DEFS` into the hidden `<svg id="defs">`, so every SVG on the page can use the gradients and patterns.
2. Renders the static header pieces: `renderPicker()`, `renderMini()` (sticky bar), `renderTools()`, `renderShapeKey()`.
3. Registers the stage and cards with the IntersectionObserver that pauses off-screen animation.
4. `bind()` attaches the document-level listeners (click, mouseover, mousemove, keydown).
5. `select(hash || 'III')` draws the first nerve.
6. `welcomeOnce()` opens the help popup if the `localStorage` flag isn't set.

### `select(id)`: what happens when a nerve is chosen

1. `state.nerve = id`.
2. If the nerve's **stage region** differs from the current one, it rebuilds the stage with `buildStage(region)`, then runs `padHits()` and `proxyForamina()` on it.
3. Toggles highlight classes across both stage layers: the nerve group (`.nv`), its nuclei (`.nuc[data-nerve~=id]`), target muscles, glands, skin and cortex regions (`.tgt`), ganglia, medals, picker discs and pods.
4. Sets the watermark numeral, `body[data-nerve]` and the URL hash.
5. Calls `renderLegend()`, `renderRoute()` and `renderCards()`, then animates the nerve drawing itself in (`drawIn`).

Clicking any `[data-select]` element (picker disc, sticky-bar disc, stage medal) also closes every popup.

### `renderCards()`

Picks content for the five card slots from the nerve's `region`:

| Slot | Builder |
|---|---|
| `#card-xs` (i) | `crossSection(id)` in panels.js |
| `#card-cs` (ii) | `chiasmCard`, `cribriformCard`, `jugularCard`, `iam` or `cavernous` |
| `#card-sof` (iii) | `hearPathCard`, `fieldMapCard`, `olfCortexCard`, `posteriorFossa`, `skullFloor` or `sofRosette` |
| `#card-eyes` (iv) | `Mod.render(id)` then `Mod.bind(root)`, where `Mod` is `Eyes`, `Face`, `Throat`, `Smell`, `Vision` or `Hear` |
| `#card-sig` (v) | `signature(id) + factBadges(id)`, then `bindSignature(id)` attaches its behaviour |

Card titles come from `NERVES[id].section` / `.sig` (cards i and v) and `CARD_TITLES[region]` (ii–iv).

### Stage regions vs picker groups

These are two different groupings:

- **Picker groups** (`REGIONS` in data.js): Special senses (I, II, VIII) · Orbit · Face · Neck.
- **Stage regions** (`NERVES[id].region`): `smell` (I), `vision` (II), `ear` (VIII), `orbit` (III IV VI), `face` (V VII), `neck` (IX–XII). Each has its own scene in stage.js and its own clinical card.

---

## The JavaScript, file by file

### `data.js`: all the words

No logic, only content. Everything else reads from it.

| Constant | Shape | Used by |
|---|---|---|
| `FIBERS` | `{ GSE: { name, role, color }, … SYM }`, the 7 fibre types plus sympathetic passengers | legend, every fibre colour, chips |
| `REGIONS` | `[{ id, name, sub, nerves[] }]`, the picker groups | picker, sticky bar |
| `SHORT_NAMES` | picker labels with soft hyphens for long names | picker |
| `CATS` | `{ key: { name, color } }`, the visual vocabulary (nucleus, ganglion, foramen, muscle, …) | tooltip category badge, shape key |
| `NERVES` | per nerve: `id, name, tag, region, fibers[], passengers[], section{title,sub}, sig{title,sub}, stations[], facts[]` (+ optional `cs`) | everywhere |
| `VISION_LESIONS`, `HEAR_LESIONS`, `SMELL_LESIONS`, `THROAT_LESIONS`, `FACE_LESIONS`, `DISORDERS` | lesion tables for the clinical cards (see below) | card-iv modules |
| `MUSCLES` | extraocular muscles: `name, n (nerve), v (pull vector), acts[]` | Movements card |
| `TIPS` | `{ key: { c, t, l[], f[] } }`: category, title, lines, fibre chips, about 700 entries | tooltip |
| `ABBREV` | `{ category: [[abbr, expansion, note], …] }` | abbreviations popup |

**A station** (`NERVES[id].stations[]`): `{ k: icon key, t: title, s: subtitle, at: [x, y] }`. `k` names an `ICON` in app.js; `at` is the stage point the spotlight pulses on.

**A lesion entry** (all lesion tables):

```js
craoR: {
  chip: 'R central retinal artery occlusion',     // button label
  name: 'Right central retinal artery occlusion', // explanation heading
  where: 'right central retinal artery',
  see: ['…', '…'],                                 // "What you see"
  why: ['…', '…'],                                 // "Why it happens"
  try: { keys: ['fieldR', 'swing'], text: 'Field right, then Swinging light' },  // tests to pulse
  // + card-specific fields, e.g. vision: LE / RE field defects and rapd; hearing: weber / rinne results
}
```

`DISORDERS` entries with `palsy: true` are the nerve palsies; only the current nerve's one gets a chip.

### `defs.js`: shared SVG definitions

One template string `DEFS` containing every `<linearGradient>`, `<radialGradient>`, `<pattern>`, `<filter>` and `<marker>` used on the page (tissue, bone, muscle striations, nucleus glows per fibre type, ganglia, the foramen "portal", glands…). Injected once by `init()`; referenced as `url(#id)` from any SVG.

### `stage.js`: the big picture

**Coordinates:** every scene shares `viewBox 0 0 1600 800`. The brainstem midline is `x = 270`; `mirror()` flips right-side structures to the left around it.

**`STAGE_NERVES[id]`**: one array of segments per nerve:

```js
{ f: 'GVE', tip: 'GSPN', d: 'M698,414 C…', intra: 1, post: 1, deep: 1, cls: 'coch' }
```

| Field | Meaning |
|---|---|
| `f` | fibre type, which sets colour and spark direction |
| `tip` | `TIPS` key for the hover note |
| `d` | SVG path |
| `intra` | runs inside the brainstem (dotted) |
| `post` | postganglionic (beaded) |
| `deep` | on the far side, drawn faded |
| `cls` | extra classes (`coch`, `vest`, `vis`, `fwd`…) |

`ORBIT_CONTEXT` and `FACE_CONTEXT` are faint neighbouring fibres shown by the Context tool; `ICA_D` / `ICA_FACE` are carotid paths reused across scenes.

**Builders:**

| Function | Returns |
|---|---|
| `seg(s)` | the visible segment: halo + base + flow (sparks) paths |
| `segHit(s, nerve)` | its invisible, wider hover band |
| `artery(d, w, tip)` · `muscle(id, d, nerve, stri)` · `gland(tip, d, nerve)` | tissue pieces with hover notes |
| `lbl(x, y, text, anchor, lead, cls)` | a label, optionally with a leader line `[x1,y1,x2,y2]` |
| `mirror(inner)` | the same SVG flipped to the left half of the brainstem |
| `medal(id, x, y)` | the circled numeral that selects a nerve |
| `brainstem()` | `{ svg, nuclei, labels }`: the shared anterior-view brainstem, all cranial nerve nuclei (ghosted until their nerve is selected; `data-nerve` may list several nerves), arteries |
| `orbitScene()`, `faceScene()`, `neckScene()`, `smellScene()`, `visionScene()`, `earScene()` | one region each, as `{ titles, back, ctx, front, medals, labels, noBrainstem? }` |
| `cochleaSpiral(...)` | the cochlea geometry for `earScene` |
| `buildStage(region)` | the full stage HTML (below) |

**`buildStage(region)`** stacks two SVGs with the same viewBox:

- **`.stage-art`**: static anatomy (zone titles, brainstem tissue, the scene's `back`), painted once.
- **`.stage-over#stageSvg`**: everything that animates or takes the mouse, in this order (bottom → top):
  1. `.hits`: invisible hover bands for every fibre, which catch the mouse *near* a line;
  2. `#fproxies`: transparent copies of the foramina and annulus, filled in by `proxyForamina()` in app.js;
  3. nuclei;
  4. context fibres, then each nerve's drawn segments (`<g class="nv n-ID">`), which catch the mouse *exactly on* a line;
  5. the scene's `front` (ganglia etc.), medals, labels, and the route-strip spotlight `#spot`.

  This order keeps crowded bundles and the foramina beneath them hoverable, and keeps spark animation from repainting the art.

### `panels.js`: cards i–iii, v and SVG helpers

**Helpers** (global, used by many files):

| Function | Purpose |
|---|---|
| `lesion(x, y, tipKey)` | red ⚡ lesion marker |
| `fib(d, f, tip, extra)` | a fibre segment for small diagrams (popups and cards) |
| `t(x, y, s, anchor, cls)` | a text label |
| `mx(inner, cx)` | mirror around `cx` |

**Card builders**, one function per card, each returning an SVG string:

| Card | Functions |
|---|---|
| i · cross-section | `crossSection(id)` dispatches to inline midbrain/pons sections, `bulbSection` (I), `eyeNerveCard` (II), `pmjSection` (VIII), `medullaSection` (IX X XII), `cordSection` (XI) |
| ii | `cavernous`, `iam`, `jugularCard`, `chiasmCard`, `cribriformCard` |
| iii | `sofRosette`, `skullFloor`, `posteriorFossa`, `fieldMapCard`, `olfCortexCard`, `hearPathCard` |
| v · signature | `signature(id)` dispatches to inline III/IV/V/VI/VII signatures, `olfSignature`, `pupilSignature`, `vorSignature`, `neckSignature(id)` |
| facts | `factBadges(id)` turns `NERVES[id].facts` into badges |

`SAG_VI(dx, dy)` builds the VI signature's stretchable nerve path; `fieldPair` draws a pair of visual fields.

The signatures are static SVG; their interaction lives in `bindSignature(id)` in app.js.

### `clinic.js`: shared clinical-card machinery

`Clinic` is an object of helpers used by every card-iv module:

| Member | Purpose |
|---|---|
| `segs(defs)` | draw a circuit from `{ name: { f, tip, d, fwd? } }`; each segment gets `data-c="name"` |
| `paint(root, chains, blk)` | light every chain (an array of segment names) up to its first blocked segment; mark blocked (`.blk`) and reached-but-blocked (`.tried`) segments |
| `marks(el, marks)` | place lesion markers `[[x, y, tipKey], …]` |
| `explain(box, d, empty, tag)` | write the "what & why" panel from a lesion entry |
| `suggest(scope, attrs, keys)` | pulse the controls whose `data-<attr>` is in `keys` (from `try.keys`) |
| `act(k)` · `sw(...)` | the ◌ hover / ● click badge and toggle-switch buttons |
| `findings(items)` | the findings strip; items are `{ k, label, icon, kind: 'lr' \| 'tongue' \| 'field' \| 'val' }` |
| `setCell(k, side, state, text)` · `setNote` · `setZones` · `setField` · `sides(r, l)` | update the findings strip (`state`: `ok` ✓, `part` ◐, `no` ✗) |
| `FIELD` · `fieldSVG(def)` | visual-field defect shapes, drawn as the patient sees them |
| `tongueMap()` | tongue zones for taste findings |
| `explainShell()` | the step-3 container |

### Card-iv modules: `eyes.js`, `faces.js`, `throat.js`, `smell.js`, `vision.js`, `hear.js`

Each is an IIFE (`const Eyes = (() => { … })()`) exposing `render(id)` (returns HTML) and `bind(root)` (attaches listeners). `Eyes` also exposes `stop()`, which clears its idle-gaze timer when another card takes over.

They all follow the same internal pattern:

| Piece | Example (hear.js) | Role |
|---|---|---|
| state | `mode` (current lesion), `tests`, `recorded` | what's selected and what's been tested |
| tests / controls | `GROUPS`, `TESTS`, `EXPR` | the buttons in step 2; ◌ = hold/hover to perform, ● = click to toggle |
| circuit | `HC` | named segments drawn with `Clinic.segs` |
| chains | `CHAINS` | which segments each test sends a signal through |
| lesion records | `HC_LES` (`LESIONS`, `FC_LES`, `TC_LES`, `SC_LES`, `VC_LES` elsewhere) | per lesion: `blk` (blocked segments) and `marks` (marker positions) |
| `resolve()` | (eyes, faces, throat) | turns *lesion + current action* into the patient picture: eye position, lid, pupil, mouth, palate, tongue… |
| `apply()` | | updates the patient drawing and the findings strip |
| `paintCircuit()` · `paintLesion()` | | call `Clinic.paint` / `Clinic.marks` |

Card-specific notes:

- **eyes.js:** a living pair of eyes. `gaze` is a unit vector; `MUSCLES` (data.js) gives each muscle's pull, so `resolve(g)` works out where each eye can actually point. Light/near reflex switches, an idle wander when nothing is held.
- **faces.js:** expressions (`EXPR`) plus tests (corneal, sensation map, taste); separate upper/lower-face chains explain forehead sparing.
- **throat.js:** "aah", tongue, shrug, gag on each side, carotid massage; `has(...)` groups lesions that share signs (bulbar + pseudobulbar, for example).
- **smell.js:** one nostril at a time, with coffee and an irritant (ammonia, which tests V not I).
- **vision.js:** confrontation fields per eye, swinging light; field defects come from the lesion entry (`LE`, `RE`, `rapd`).
- **hear.js:** Weber, Rinne each side, head impulse each way, look ahead, Hallpike each side. One test per group at a time, and results stay recorded until the lesion changes.

### `info.js`: shared popup machinery

| Member | Purpose |
|---|---|
| `Info.modal(id, titleId, html, onClick, onClose)` | builds the popup (backdrop, panel, ✕), wires Esc and backdrop clicks to `onClose`, sends every other click to `onClick` |
| `Info.show(id)` · `Info.hide(id)` | open/close; toggles `body.modal-open` |
| `Info.fillCap(id, [[key, html], …])` · `Info.showCap(id, key)` | stacked captions (all variants rendered, one visible, so the box never changes height) |
| `Info.stepper(root, svgId, capId, n, onSet, ms)` | the numbered step bar with Play: adds `on1…onK` and `data-cur` to the SVG so CSS reveals each stage |
| `Info.stepBar(steps)` · `Info.stepCap(steps, n)` | markup for the step bar and its captions |
| `Info.why(blocks)` | a row of explanation cards from `[[heading, text], …]` |

### Popup modules

Every popup is an IIFE exposing `open()` and `close()`. On first `open()` it calls `build()` (which calls `Info.modal`), then `paint()` syncs the DOM with its state. Clicks are handled in one delegated `onClick`.

| File | Global | Key data | Notes |
|---|---|---|---|
| `fibres.js` | `Fibres` | `LETTERS`, `COLS`, `INFO`, `TIPS` | Builds its own modal (it predates `Info`). `open(type)` preselects a fibre type; app.js passes the current nerve's first fibre. |
| `passages.js` | `Passages` | `FORAMINA`, `GANGLIA`, `SEGMENTS`, `WHY`, `SPOTS` | Three linked sections: skull-base map → foramen contents, ganglion diagrams, shared-segment "cables". |
| `reflex.js` | `Reflexes` | `R` (11 reflexes: stimulus, receptor, `aff`/`eff` `[nerve, fibre]`, centre, effector, `both`, outcomes when each limb is cut), `CUT`, `WHY` | `arcSVG(r)` draws the arc; `lines()`/`wrap()` break long labels onto two lines so nothing clips. |
| `olfaction.js` | `Olfaction` | `STEPS`, `ODORS`, `TYPES`, `WHY` | Transduction stepper; receptor neurons → glomerular map (seeded random layout); cortical ensembles. |
| `sight.js` | `Sight` | `STIM`, `STEPS`, `LAYERS` (LGN), `STREAMS`, `EYES`, `CUES`, `WHY` | Retina, phototransduction stepper, LGN layers by eye and stream, V1 and the dorsal/ventral streams. |
| `hearing.js` | `Hearing` | `FREQ`, `BM`, `STEPS`, `AZ`, `CUES`, `WHY` | Travelling wave on the basilar membrane (`requestAnimationFrame` loop, stopped on close), hair-cell stepper, ITD/ILD localisation, auditory cortex. |
| `taste.js` | `Taste` | `NERVES_T`, `Q` (qualities), `STEPS`, `ROUTE`, `WHY` | Tongue map by nerve, taste-bud cells, transduction per quality, route to cortex. |
| `abbr.js` | `Abbr` | `ABBREV` (data.js) | Search box with highlighting plus category chips; fixed panel height so it doesn't jump while filtering. |
| `help.js` | `Help` | `QUICK`, `PARTS`, `KEYS` | `mapSVG()` is a clickable wireframe of the page; each block shows its `PARTS` card. Opened by `welcomeOnce()` on the first visit. |
| `exam.js` | `Exam` | `KIT` (equipment), `STEPS` (one per exam step: `ask`, `look`, `do`, `means`, `kit`, `nerves`) | `open(nerve)` jumps to the step for that nerve; clicking an instrument highlights the steps that use it. |
| `lesion.js` | `Localise` | `F` (findings, grouped), `S` (26 sites: `name, zone, core[], opt[], cause, why`), `PLACES`, `WHY` | See "Lesion ranking" below. |
| `quiz.js` | `Quiz` | `FIELDS`, `TOPIC`, `BANK`, `LEN` | See "Quiz engine" below. |

#### Lesion ranking (`lesion.js`)

For every site, with `sel` as the ticked findings:

```
cover   = (core findings present) / (core findings)      how much of the syndrome is there
explain = (ticked findings the site accounts for) / sel  how much of what you see it explains
score   = cover × explain
```

The top three by score (ties go to the more specific site) are shown as bars. The best is filled on the map, the others are outlined. Clicking a map zone, a bar or a table row loads that site's core findings. The map (`mapSVG()`) is two hemispheres, midbrain/pons/medulla cross-sections (lesions in the right half) and pills for the places outside the brainstem; each zone carries `data-zone`, which matches a site's `zone`.

#### Quiz engine (`quiz.js`)

- `FIELDS`: `anat`, `path`, `clin`, each with a name, short label, icon and topics `[[id, label], …]`.
- `BANK`: `[topic, question, correctAnswer, [wrong, wrong, wrong], explanation]`.
- `start(list?)` shuffles the pool (field + topic filter, or a given list for "retry missed"), takes `len` questions, and shuffles each question's options.
- State: `round` (questions + shuffled options), `at` (index), `picked` (chosen option or `null`), `results` (true/false per question).
- `questionHTML()` and `resultHTML()` render the card. The question card has a fixed minimum height, so feedback appearing doesn't move anything.
- `onKey` handles `1`–`4` and `Enter` only while the quiz is open.
- `open(field)` starts a fresh round if the field changes; otherwise it resumes the current round.

### `app.js`: the glue

| Piece | Purpose |
|---|---|
| `state` | `{ nerve, region, labels, ctx, isolate, flow, hidden: Set<fibre> }` |
| `$` · `$$` | `querySelector` / `querySelectorAll` (as an array) |
| `ICON` · `ico(k, size)` | small glyphs for the route strip, shape key and help legend |
| `renderPicker` · `renderMini` · `renderLegend` · `renderTools` · `renderShapeKey` · `renderRoute` | header, sticky bar, fibre key, stage tools, shape key, pathway strip |
| `CARD_TITLES` · `renderCards` · `select` · `drawIn` | see "How the page boots" |
| `applyHidden()` | hides fibres whose type is switched off in the legend |
| `spot(at)` | pulses the stage spotlight at a station's coordinates |
| `padHits(root)` | gives thin strokes (`THIN`) and small dots (`SMALL`) invisible, larger hover twins |
| `proxyForamina()` | fills `#fproxies` with transparent copies of the foramina and annulus |
| `io` | IntersectionObserver that adds `.paused` to off-screen sections |
| `tipHTML` · `showTip` · `moveTip` · `hideTip` | the tooltip: `data-tip="key"` reads `TIPS[key]`; `data-tip-html` carries its own encoded HTML |
| `bindSignature(id)` | per-nerve behaviour for card v (ciliary reflex, trigeminal rings, gland routes, odour rows, RAPD, head impulse, carotid massage, vocal folds, XI lesions, genioglossus vectors, VI stretch) |
| `bind()` | one delegated listener each for click (nerve select, popup buttons, tools, fibre chips, stations), mouseover (tooltips, nerve hover highlight, station spotlight), mousemove and keydown |
| `init()` · `welcomeOnce()` | start-up; first-visit help |

---

## Shared globals

Because everything shares one scope, these names are global and **must not be reused** for something else:

- **data.js:** `FIBERS REGIONS SHORT_NAMES CATS NERVES VISION_LESIONS HEAR_LESIONS SMELL_LESIONS THROAT_LESIONS FACE_LESIONS MUSCLES DISORDERS TIPS ABBREV`
- **defs.js:** `DEFS`
- **stage.js:** `STAGE_NERVES ORBIT_CONTEXT FACE_CONTEXT ICA_D ICA_FACE seg segHit artery muscle gland lbl mirror medal brainstem orbitScene faceScene neckScene smellScene visionScene cochleaSpiral earScene buildStage`
- **panels.js:** `MID_OUTLINE ODOR SAG_VI mx lesion fib t crossSection cavernous sofRosette signature iam skullFloor medullaSection cordSection jugularCard posteriorFossa neckSignature fieldPair eyeNerveCard chiasmCard fieldMapCard pupilSignature bulbSection cribriformCard olfCortexCard olfSignature pmjSection hearPathCard vorSignature factBadges`
- **Modules:** `Clinic Eyes Face Throat Smell Vision Hear Info Fibres Olfaction Sight Hearing Taste Passages Abbr Help Exam Reflexes Localise Quiz`
- **app.js:** `state $ $$ ICON ico JUMPS CARD_TITLES THIN SMALL io tip hoveredNerve` and its functions

---

## index.html and styles.css

**index.html** is a static shell. JavaScript fills these containers:

| Element | Filled by |
|---|---|
| `#defs` | `DEFS` |
| `#picker` · `#miniBar` | `renderPicker` · `renderMini` |
| `#route` | `renderRoute` |
| `.stage-head` → `#fiber-legend`, `#lg-key`, `#tools` | `renderLegend`, `renderTools` |
| `#stage` · `#shape-key` | `buildStage` · `renderShapeKey` |
| `#card-xs` `#card-cs` `#card-sof` `#card-eyes` `#card-sig` (+ `*-title`, `*-sub`) | `renderCards` |
| `#tip` | tooltip |

The Reading room buttons are written directly in the HTML; each has an id (or `data-quiz`) that `bind()` maps to a popup. Popups append their own `.fx-back` element to `<body>` on first open.

**styles.css** is one file, organised top to bottom:

1. Tokens (`:root` colours, including one custom property per fibre type), base, `.glass`, `.paused`, hover-pad classes.
2. Header: title, Reading room (`.info-nav`, `.in-*`), picker (`.pod`, `.nbtn`, `.disc`), sticky bar (`.mini-bar`, `.mb-*`).
3. Stage head (fibre key, tools), route strip, stage and its SVG internals (tissue, arteries, nerves, sparks, nuclei, labels).
4. Cards, then each region's card styles.
5. Clinical-card shared styles (circuit, findings strip, explanation).
6. One section per popup (`#fibreModal`, `#olfModal`, `#sightModal`, … `#quizModal`, `#abbrModal`), each prefixed with a comment banner.
7. Footer, responsive breakpoints, `prefers-reduced-motion`.

**Reading room breakpoints:** four equal columns ≥ 1400 px · 2 × 2 from 761 to 1399 px · stacked ≤ 760 px. Tile columns use `minmax(max-content, 1fr)` so labels never clip; the breakpoints keep each column wide enough for that.

---

## How to add or edit

### Change wording

| What | Where |
|---|---|
| A hover note | `TIPS[key]` in `data.js`. Find the key from the element's `data-tip` (DevTools). |
| A nerve's tagline, stations, facts, card titles | `NERVES[id]` in `data.js` |
| A lesion's explanation | its entry in `DISORDERS`, `FACE_LESIONS`, `THROAT_LESIONS`, `SMELL_LESIONS`, `VISION_LESIONS` or `HEAR_LESIONS` |
| An abbreviation | `ABBREV` in `data.js` |
| Popup text | the constants at the top of each popup file (`STEPS`, `WHY`, `R`, `S`, …) |
| A quiz question | `BANK` in `quiz.js` |
| Fibre colours | `FIBERS` in `data.js`, plus the matching CSS custom properties (`--gse`, `--gve`, …) |

### Add a quiz question or topic

- **Question:** append `['topic', 'Question?', 'Correct answer', ['Wrong 1', 'Wrong 2', 'Wrong 3'], 'Explanation.']` to `BANK`. Keep the options similar in length, so the right one doesn't stand out.
- **Topic:** add `['id', 'Label']` to the right field's `topics` in `FIELDS`, then tag questions with that `id`. Topic chips and counts update automatically.

### Add a lesion to a clinical card

Using the Movements card as the example:

1. Add an entry to `DISORDERS` in `data.js` (`name`, `where`, `see`, `why`, `try`). Its chip appears automatically.
2. Add `TIPS['D-<key>']` for the chip's hover note.
3. In `eyes.js`, add `LESIONS.<key> = { blk: [segments to block], marks: [[x, y, 'D-<key>']] }`.
4. In `eyes.js`, add a `case '<key>':` to `resolve()` describing where the eyes point, lid height, pupil size and so on.

The other cards work the same way:

| Card | Lesion table | Tip prefix | Module record |
|---|---|---|---|
| Throat & neck | `THROAT_LESIONS` | `T-` | `TC_LES` in `throat.js`, flags in `resolve()` |
| Fields & pupils | `VISION_LESIONS` | `V-` | `VC_LES` in `vision.js` |
| Hearing & balance | `HEAR_LESIONS` | `H-` | `HC_LES` in `hear.js` |
| Smell | `SMELL_LESIONS` | `S-` | `SC_LES` in `smell.js` |
| Face | `FACE_LESIONS` | — | `FC_LES` in `faces.js` |

New field-defect shapes go in `Clinic.FIELD` (clinic.js), drawn as the patient sees them.

### Add a site to "Where is the lesion?"

1. Add any new findings to `F` (in the right group).
2. Add the site to `S` with `zone`, `core`, `opt`, `cause`, `why`.
3. Give it a place on the map: a new `data-zone` shape inside `mapSVG()`, or add its zone id to `PLACES` to get a pill.

### Add or reshape a fibre on the stage

Edit or add a segment in `STAGE_NERVES` (stage.js), following the direction rule under [Conventions](#conventions), with a `tip` that exists in `TIPS`. Hover bands, sparks and draw-in animation are generated automatically. If you move a nucleus in `brainstem()`, move the intra-brainstem segments that start or end on it too.

### Add a nerve or a stage region

1. `data.js`: a `REGIONS` entry (or add to one) and a `NERVES[id]` entry with `region`, `fibers`, `stations` and so on.
2. `stage.js`: `STAGE_NERVES[id]` and, for a new region, a `<region>Scene()` registered in the map at the top of `buildStage()`.
3. `app.js`: a `CARD_TITLES` entry and branches in `renderCards()`; behaviour in `bindSignature()`.
4. `panels.js`: cards i–iii and the signature.
5. A card-iv module exposing `render(id)` and `bind(root)`.

### Add a popup

1. Create `js/<name>.js`: an IIFE that builds with `Info.modal(...)` on first open and exposes `open()` and `close()`.
2. `index.html`: a `<script>` tag above `app.js`, and a `.in-b` button in the right `.in-grp` of the Reading room.
3. `app.js`: a click handler in `bind()`, and add the module to the list that `[data-select]` clicks close.
4. `css/styles.css`: a section for `#<name>Modal`. Set `--acc` for its accent colour.
5. Mention it in `help.js` (`PARTS.reading`) and in this README.

---

## Conventions

- **Sides:** the patient's right is the viewer's left in every front view. One-sided lesions are on the patient's right unless named.
- **Spark direction follows path direction.** For GSA, GVA and SVA, the stylesheet reverses the sparks, so draw sensory paths from the brain *outward* and their sparks will run toward the brain. A `.fwd` class cancels the reversal. SSA paths (and the `vis`, `coch`, `vest` classes) always run forward, so draw them from the receptor *inward*.
- **No jumping layouts:** any panel whose text changes with a button holds *every* variant stacked in one grid cell (`.fg-v`, `.ol-cv`, `.fx-v`), with only the active one visible. The box is always as tall as its longest variant, and hidden variants never transition.
- **Seamless dash loops:** an animated dash pattern must divide its animation's offset exactly. `march` moves 64 units (patterns of 4, 8, 16); `flow` moves 27 (patterns of 9, 27).
- **Card numbering:** cards are i–v in every region; only their titles change.
- **Performance:**
  - SVG dash animations repaint on the main thread, so sparks and slow pulses use `steps()` to update about 20 and 10 times a second.
  - Off-screen sections get `.paused`.
  - Closed popups are `visibility: hidden`, have their animations paused, and get `pointer-events: none`, so nothing inside them can catch the mouse.
  - Only the selected picker disc's ring spins. Impulses off removes the sparks entirely.
- **Accessibility:** `prefers-reduced-motion` disables animation. Popups are `role="dialog"` with `aria-modal` and a labelled title.

---

## Limitations

- **Educational and schematic.** Anatomy is simplified and not to scale. Clinical content is for learning, not diagnosis or management. The quiz bank has not been peer-reviewed.
- **Hover-first.** Much of the detail lives in hover notes and hover-to-perform tests. Touch devices get clicks but miss most hover content.
- **Desktop-first.** The stage needs about 980 px and scrolls sideways below that. The header, Reading room and cards adapt down to phone width, but the diagrams get small.
- **Partial accessibility.** Diagrams are SVG without full keyboard navigation or screen-reader descriptions.
- **Global scope.** Every module shares the global namespace and depends on script order. There is no bundler, linter or type checking.
- **One large content file.** `data.js` holds almost all the text. Search it by key.
- **No automated tests.** Changes were verified by hand and with headless-browser screenshots and DOM measurements.
- **Modern browsers only.** The code uses `color-mix()`, `:is()`, `minmax(max-content, …)`, `backdrop-filter`, and SVG geometry set from CSS. Current Chrome, Edge, Firefox and Safari are fine.
- **Almost no persistence.** The only saved value is the `localStorage` flag `cranial-nerves:seen-help` (the how-to popup has been shown). The nerve lives in the URL hash; quiz progress lasts until the page reloads.
