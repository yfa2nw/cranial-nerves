# Cranial Nerves

An interactive, diagram-first map of the twelve cranial nerves: each nerve's course from nucleus to target, its fibre types, the anatomy along the way, and what happens when it is damaged.

It features plain HTML, CSS and JavaScript

---

## Running it

Open `index.html` in a modern browser. It works straight from the file system (`file://`) because every script is a classic script, not an ES module. Any static server works too:

```sh
npx serve .        # or: python -m http.server
```

Fonts (Cormorant Garamond, Inter) come from Google Fonts. Offline, the page falls back to system fonts and works otherwise unchanged.

---

## Features

- **Nerve picker:** the twelve nerves grouped by region (special senses · orbit · face · neck). The coloured dots under each numeral show the fibre types the nerve carries. A slim copy of the picker sticks to the top of the screen once you scroll past it.
- **Fibre-type legend:** one colour per fibre type, styled as carried, passenger or absent. Clicking a type hides those fibres on the stage.
- **Pathway strip:** the nerve's stations from nucleus to target. Hovering a station spotlights it on the stage.
- **Stage:** the whole course in one SVG.
  - Layout: brainstem on the left, skull base and foramina in the middle, the target on the right. Smell, sight and hearing get their own layouts.
  - Animation: white sparks show the direction of conduction.
  - Hover: every structure has a note; hovering a fibre highlights its nerve.
  - Tools: Labels · Context (neighbouring nerves) · Impulses (sparks) · Isolate.
- **Cards** (five per nerve):
  - **i–iii:** close-ups such as a brainstem cross-section, key passages (cavernous sinus, foramina, internal acoustic meatus…) and a field-defect map.
  - **iv · clinical:** an examinable patient, a circuit diagram that lights up to the first broken link, a findings strip, and a "what & why" explanation. Its lesions are listed below.
  - **v · signature:** one interactive idea per nerve, e.g. the ciliary ganglion, the VOR, the carotid sinus reflex or the recurrent laryngeal loop.
- **Clinical card lesions**, by card:

  | Card | Lesions |
  |---|---|
  | Movements (III/IV/VI) | III, IV and VI palsies · INO · one-and-a-half · VI nucleus · Parinaud · Argyll Robertson · Horner · Adie · uncal herniation · myasthenia gravis · cavernous sinus |
  | Face (V/VII) | V1 and V3 lesions · spinal V · trigeminal neuralgia · central (UMN) facial palsy · Bell's palsy at the stylomastoid foramen · lesions above the chorda and above the nerve to stapedius · geniculate (Ramsay Hunt) |
  | Throat & neck (IX–XII) | IX · high X · left RLN · XI (posterior triangle, jugular foramen) · XII (LMN, UMN) · Wallenberg · jugular foramen (Vernet) · bulbar · pseudobulbar |
  | Smell (I) | trauma · olfactory groove meningioma · post-viral · Kallmann · neurodegeneration · uncinate fits · nasal polyps |
  | Fields & pupils (II) | ischaemic optic neuropathy · central retinal artery occlusion · optic neuritis · chiasm · optic tract · Meyer's loop · parietal · occipital · papilloedema |
  | Hearing & balance (VIII) | conductive loss · vestibular schwannoma · vestibular neuritis · labyrinthitis · Ménière's · BPPV · cerebellar stroke (HINTS) |

- **Popups** in the header, grouped by purpose:
  - **"?" help:** quick start, a clickable page map, a drawing legend, keyboard shortcuts.
  - **Foundations:**
    - *Fibre types:* a G/S, S/V, A/E decoder and the nucleus columns.
    - *Foramina, ganglia & passengers:* what passes through each opening, who synapses in each ganglion, and which fibres share a nerve segment.
  - **How the senses work:** smell, sight, hearing and taste, each with step-through transduction and interactive pathway diagrams.
  - **Abbreviations:** about 140 entries, searchable and filterable.
- **Keyboard:** ← → previous/next nerve · `/` abbreviations · `?` help · `Esc` closes a popup.

---

## Code structure

```
index.html          page shell: header, legend, route strip, stage, five card slots, script tags
css/styles.css      all styling, grouped by section (header · stage · cards · each region · each popup)
js/
  data.js           CONTENT: fibre types, regions, nerves, lesion tables, hover notes, abbreviations
  defs.js           shared SVG <defs>: gradients, patterns, filters, markers
  stage.js          the stage: fibre geometry (STAGE_NERVES), brainstem, one scene per region, buildStage()
  panels.js         cards i–iii and v: cross-sections, foramen cards, signatures, small SVG helpers
  clinic.js         shared clinical-card machinery (circuits, findings strip, explanation panel)
  eyes.js           card iv · Movements (III IV VI)
  faces.js          card iv · Face (V VII)
  throat.js         card iv · Throat & neck (IX–XII)
  smell.js          card iv · Smell (I)
  vision.js         card iv · Fields & pupils (II)
  hear.js           card iv · Hearing & balance (VIII)
  fibres.js         popup · fibre-type naming
  info.js           shared popup machinery (modal, step player, stacked captions, explanation cards)
  olfaction.js      popup · how smell works
  sight.js          popup · how sight works
  hearing.js        popup · how hearing works
  taste.js          popup · how taste works
  passages.js       popup · foramina, ganglia & passengers
  abbr.js           popup · abbreviations
  help.js           popup · how to use this page
  app.js            state, picker, legend, route strip, card dispatch, tooltips, hover layers, wiring
```

### How the pieces fit

- **Load order matters.** Scripts share globals, so each file may only use what loaded before it. `data.js` comes first, `app.js` last, and `init()` at the end of `app.js` starts everything. Add new files above `app.js` in `index.html`.
- **Content and geometry are separate.** `data.js` holds the words. Coordinates live in `stage.js`, `panels.js` and each card module. Most text edits never touch geometry.
- **Selecting a nerve** calls `select(id)` in `app.js`. It rebuilds the stage if the region changed, toggles the highlight classes, re-renders the legend and route strip, and calls `renderCards()`. That function picks the card builders and the card-iv module from the nerve's `region`.
- **Hover notes.** Any element with `data-tip="key"` shows `TIPS[key]` from `data.js`, formatted as category · title · lines · fibre chips. Elements with `data-tip-html` carry their own encoded HTML.

### The stage

- **Coordinates:** `viewBox 0 0 1600 800`, with the brainstem midline at `x = 270`.
- **Two stacked SVGs:**
  - **`stage-art`:** static anatomy, painted once.
  - **`stage-over`:** everything that animates or takes the mouse.
- **Hover order inside the overlay**, bottom to top:
  1. Invisible fibre hover bands (`.seg-hit`): catch the mouse *near* a line.
  2. Transparent copies of every foramen and the annulus (`#fproxies`, built by `proxyForamina()` in `app.js`).
  3. Nuclei, then the drawn fibre lines themselves: these catch the mouse *exactly on* a line.

  This order keeps crowded fibre bundles and the foramina under them hoverable.
- **Fibre segments:** each segment is one entry in `STAGE_NERVES[id]`:

  ```js
  { f: 'GVE', tip: 'GSPN', d: 'M698,414 C…', intra: 1, post: 1, deep: 1, cls: 'coch' }
  ```

  | Field | Meaning |
  |---|---|
  | `f` | fibre type, which sets the colour |
  | `tip` | `TIPS` key for the hover note |
  | `d` | SVG path |
  | `intra` | inside the brainstem (dotted) |
  | `post` | postganglionic (beaded) |
  | `deep` | far side, drawn faded |
  | `cls` | extra classes |

- **Spark direction follows the path direction.** For GSA, GVA and SVA, the stylesheet reverses the sparks. So draw sensory paths from the brain *outward*, and their sparks will run toward the brain. A `.fwd` class cancels the reversal. SSA paths (and the `vis`, `coch` and `vest` classes) always run forward, so draw them from the receptor *inward*.

### Clinical cards (iv)

Every card-iv module follows the same pattern, built on `clinic.js`:

1. **A lesion table in `data.js`.** Each entry has `chip`, `name`, `where`, `see[]`, `why[]` and `try: { keys, text }`, plus card-specific fields: field defects for vision, Weber and Rinne results for hearing, and so on.
2. **In the module:**
   - a circuit definition (named segments);
   - `CHAINS`: which segments fire for each test;
   - a per-lesion record of blocked segments and lesion-marker positions;
   - a `resolve()` / `apply()` pair that turns *lesion + current test* into the patient picture and the findings strip.
3. **`Clinic` helpers:**
   - `segs` draws the circuit;
   - `paint` lights each chain up to its first blocked segment;
   - `marks` places the lesion markers;
   - `explain` writes the "what & why" panel;
   - `suggest` pulses the recommended tests;
   - `findings`, `setCell`, `setZones` and `setField` handle the findings strip.

### Popups

The popups use `Info` (`info.js`), except the fibre-type popup, which predates it:

- **`Info.modal(id, titleId, html, onClick, onClose)`:** the shell, including backdrop, ✕ and Esc.
- **`Info.show` / `Info.hide`.**
- **`Info.stepper(...)`:** the 1–7 step bar with Play. It adds `on1…onN` and `data-cur` classes to an SVG, so CSS reveals each stage.
- **`Info.fillCap` / `Info.showCap`:** stacked captions. See the conventions below.
- **`Info.why(blocks)`:** the row of explanation cards.

---

## How to add or edit

### Change wording

| What | Where |
|---|---|
| A hover note | `TIPS[key]` in `data.js` — find the key from the element's `data-tip` |
| A nerve's tagline, route stations, facts, card titles | `NERVES[id]` in `data.js` |
| A lesion's explanation | its entry in `DISORDERS`, `FACE_LESIONS`, `THROAT_LESIONS`, `SMELL_LESIONS`, `VISION_LESIONS` or `HEAR_LESIONS` |
| An abbreviation | `ABBREV` at the end of `data.js` |
| Popup text | the constants at the top of each popup file (`STEPS`, `WHY`, …) |
| Fibre colours | `FIBERS` in `data.js` (the CSS custom properties `--gse`, `--gve`… should match) |

### Add a lesion to a clinical card

Take the Movements card as an example:

1. Add an entry to `DISORDERS` in `data.js`. Its chip appears automatically.
2. Add a `TIPS['D-<key>']` hover note for the chip.
3. In `eyes.js`, add `LESIONS.<key> = { blk: [segments to block], marks: [[x, y, 'D-<key>']] }`.
4. In `eyes.js`, add a `case '<key>':` to `resolve()` describing where the eyes point, plus lid height, pupil size and so on.

The other cards work the same way:

| Card | Lesion table | Tip prefix | Module |
|---|---|---|---|
| Throat & neck | `THROAT_LESIONS` | `T-` | `TC_LES` in `throat.js`, flags in `resolve()` |
| Fields & pupils | `VISION_LESIONS` | `V-` | `VC_LES` in `vision.js` |
| Hearing & balance | `HEAR_LESIONS` | `H-` | `HC_LES` in `hear.js` |
| Smell | `SMELL_LESIONS` | `S-` | `SC_LES` in `smell.js` |
| Face | `FACE_LESIONS` | — | same pattern in `faces.js` |

New field-defect shapes go in `Clinic.FIELD` (`clinic.js`), drawn as the patient sees them.

### Add or reshape a fibre on the stage

Edit or add a segment in `STAGE_NERVES` (`stage.js`), following the direction rule above. Give it a `tip` that exists in `TIPS`. Hover bands and spark animation are generated automatically.

### Add a nerve or a stage region

1. Add a `REGIONS` entry and a `NERVES[id]` entry with `region`, `fibers`, `stations` and so on (`data.js`).
2. Add `STAGE_NERVES[id]` and, for a new region, a `<region>Scene()` function, registered in the map at the top of `buildStage()` (`stage.js`).
3. In `app.js`, add a `CARD_TITLES` entry and a branch in `renderCards()`. Write cards i–iii and the signature in `panels.js`, and add any signature behaviour to `bindSignature()`.
4. Write a card-iv module exposing `render(id)` and `bind(root)`, following the pattern above.

### Add an info popup

1. Create `js/<name>.js`. Build the popup with `Info.modal(...)` on first open, and expose `open()` and `close()`.
2. Add a `<script>` tag above `app.js`, and a button inside `.info-nav` in `index.html`.
3. In `app.js`, add a click handler for the button, and add the module to the list closed by `select()`.

---

## Conventions

- **Sides:** patient's right is the viewer's left in every front view. One-sided lesions are on the patient's right unless named.
- **Card numbering:** cards are i–v in every region. Their titles change per region (`CARD_TITLES`, `NERVES[id].section` / `sig`).
- **No jumping layouts:** any panel whose text changes with a button holds *every* variant stacked in one grid cell (`.fg-v`, `.ol-cv`, `.fx-v`), with only the active one visible. The box is always as tall as its longest variant. Hidden variants never transition, so switching is instant.
- **Seamless dash loops:** an animated dash pattern must divide its animation's offset exactly. `march` moves 64 units (patterns of 4, 8, 16); `flow` moves 27 (patterns of 9, 27). Otherwise the loop visibly jumps.
- **Performance:**
  - SVG dash animations repaint on the main thread, so sparks and slow pulses use `steps()` to update about 20 and 10 times a second.
  - Sections scrolled off-screen get `.paused` (via an IntersectionObserver).
  - Closed popups are hidden with all their animations paused.
  - The Impulses toggle turns sparks off entirely.
- **Accessibility:** `prefers-reduced-motion` disables animation.

---

## Limitations

- **Educational and schematic.** Anatomy is simplified and not to scale, and clinical content is for learning, not diagnosis or management.
- **Hover-first.** Much of the detail lives in hover notes and hover-to-perform tests. Touch devices get clicks but miss most hover content.
- **Desktop-first layout.** The stage needs about 980 px and scrolls sideways below that. The header and cards adapt down to phone width, but the diagrams get small.
- **Accessibility is partial.** Diagrams are SVG without full keyboard navigation or screen-reader descriptions. Buttons, popups and the reduced-motion setting are the accessible parts.
- **Global scope.** All modules share the global namespace, and everything depends on script order. There is no bundler or type checking.
- **One large content file.** `data.js` holds all the text (over 1,500 lines). Search it by key.
- **No automated tests.** Changes were verified by hand and with headless-browser screenshots.
- **Modern browsers only.** The code uses `color-mix()`, `:is()`, CSS custom properties in keyframes, `backdrop-filter`, and SVG geometry properties set from CSS. Current Chrome, Edge, Firefox and Safari are fine; old browsers are not supported.
- **No persistence.** Nothing is saved between visits: the selected nerve lives in the URL hash only.
