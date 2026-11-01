// ─────────────────────────────────────────────────────────────
//  Physical examination popup: how each cranial nerve is examined at
//  the bedside — what to ask, look for and do, with what equipment.
//  Structure follows the standard teaching sequence (as in Talley &
//  O'Connor's Clinical Examination); the wording is our own summary.
// ─────────────────────────────────────────────────────────────

const Exam = (() => {
  // equipment tray · [label, icon]
  const KIT = {
    smell:   ['Smell bottles', '◇'],
    snellen: ['Snellen chart + pinhole', '▤'],
    near:    ['Near-vision card', '▭'],
    hatpin:  ['Red hatpin', '⊚'],
    ishihara:['Ishihara plates', '◍'],
    torch:   ['Pen torch', '☀'],
    ophth:   ['Ophthalmoscope', '◉'],
    cotton:  ['Cotton wool / bud', '☁'],
    neuro:   ['Neurotip', '✦'],
    cold:    ['Cold object', '❄'],
    hammer:  ['Tendon hammer', '⚒'],
    taste:   ['Taste solutions', '◈'],
    otoscope:['Otoscope', '◎'],
    fork:    ['512 Hz tuning fork', '⋔'],
    depress: ['Tongue depressor', '▬'],
    water:   ['Cup of water', '◡']
  };

  // one tab per step of the exam · nerves = which page nerves it opens on
  const STEPS = {
    setup: { tab: 'Setup & finish', nerves: [], kit: [],
      ask: ['“Do you wear glasses or a hearing aid?” — use them for the exam', '“Have you noticed any change in your sight, hearing, smell, taste, swallowing, speech or face?”', '“Any headaches, dizziness or double vision?”'],
      look: ['Patient seated, you at eye level about 1 m away', 'Face: asymmetry, drooping lid, prominent eye, wasting', 'Scars (craniotomy), skin lesions, speech, gait and walking aids'],
      do: ['Introduce yourself, explain the examination and gain consent', 'Work in order from I to XII — face, eyes, ears, mouth, neck', 'Compare the two sides at every step', 'To finish: thank the patient, summarise the findings in one line, and say what you would do next — full neurological examination of the limbs, fundoscopy if not done, a bedside swallow test, audiometry or perimetry, imaging'],
      means: ['A pattern beats a list: decide whether a problem is one nerve, several nerves at one place (foramen, sinus, brainstem), or not a nerve at all (muscle, junction)', 'Brainstem lesions add long-tract signs: limb weakness or sensory loss on the opposite side'] },
    I: { tab: 'I', nerves: ['I'], kit: ['smell'],
      ask: ['“Has your sense of smell changed?”', '“Does food taste different?”', '“Any recent head injury, cold or flu, or nasal blockage?”'],
      look: ['Each nostril is clear — block one and ask the patient to sniff'],
      do: ['Usually just ask; test formally if smell is a complaint', 'Eyes closed, block one nostril', 'Offer a familiar, non-irritant smell — coffee, peppermint, vanilla', '“Can you smell anything? What is it?”', 'Repeat on the other side'],
      means: ['One-sided loss is rarely noticed — think of a frontal mass (olfactory groove meningioma)', 'Both sides: viral, smoking, nasal disease, head trauma, Parkinson’s', 'Don’t use ammonia — it stimulates V, not I'] },
    II: { tab: 'II', nerves: ['II'], kit: ['snellen', 'near', 'hatpin', 'ishihara', 'torch', 'ophth'],
      ask: ['“Any blurred or lost vision? Sudden or gradual? One eye or both?”', '“Is it painful to move your eyes?”', '“Any flashes, floaters or curtains?”'],
      look: ['Pupils: size, shape, symmetry', 'Glasses — test with them on'],
      do: ['Acuity: each eye at 6 m on a Snellen chart (or a 3 m chart); record as 6/x; use a pinhole if worse than 6/6', 'Near vision with a reading card', 'Fields by confrontation: sit 1 m away, each of you covers the opposite eye; bring a finger or red hatpin in from each quadrant; compare with your own field', 'Inattention: move fingers on both sides at once', 'Colour: Ishihara plates; red desaturation with a red hatpin', 'Pupils: direct and consensual light reflex, swinging light, then accommodation (far, then a finger close to the nose)', 'Fundoscopy: dim room; red reflex, then disc, vessels, macula'],
      means: ['Field pattern tells you where — monocular (eye or nerve), bitemporal (chiasm), homonymous (behind the chiasm)', 'RAPD = an optic nerve problem on that side', 'Pale disc: optic atrophy · swollen disc: papilloedema or optic neuritis'] },
    eye: { tab: 'III · IV · VI', nerves: ['III', 'IV', 'VI'], kit: ['hatpin', 'torch'],
      ask: ['“Do you see double? Side by side or one above the other?”', '“Which direction makes it worse?”', '“Does it go away if you cover either eye?”', '“Any drooping of the eyelid? Is it worse in the evening?”'],
      look: ['Lid droop, eye position at rest, head tilt', 'Pupils (III carries the pupil fibres)'],
      do: ['Hold the patient’s chin still; ask them to follow a target about 50 cm away through an H-shaped path', 'At each position ask about double vision and watch for nystagmus (a few beats at the very extremes are normal)', 'If double: cover each eye in the worst direction — the outer image comes from the weak eye', 'Saccades: look quickly between two targets', 'Convergence: follow the target to the tip of the nose', 'Sustained upgaze for 30–60 s if myasthenia is possible — watch the lids'],
      means: ['III: down and out, ptosis, ± dilated pupil (pupil involved → think compression)', 'IV: vertical double vision on looking down and in; head tilted away', 'VI: horizontal double vision, eye can’t abduct', 'Fits no single nerve, or fatigues → myasthenia; adduction lag with abducting nystagmus → INO'] },
    V: { tab: 'V', nerves: ['V'], kit: ['cotton', 'neuro', 'cold', 'hammer'],
      ask: ['“Any numbness or tingling on your face?”', '“Any facial pain — sharp, electric, set off by touch or chewing?”', '“Any trouble chewing?”'],
      look: ['Wasting of the temples (temporalis) and jaw (masseter)'],
      do: ['Sensation: light touch (cotton wool) and pain (neurotip) on forehead, cheek and chin — V1, V2, V3 — comparing sides; temperature with a cold object if pain is lost', 'Avoid the angle of the jaw — it is C2', 'Corneal reflex: touch the cornea (not the sclera) from the side with a wisp of cotton; both eyes should blink · check for contact lenses first', 'Motor: feel the masseters as the patient clenches; open the mouth against resistance; move the jaw side to side', 'Jaw jerk: mouth slightly open, finger on the chin, tap with the hammer'],
      means: ['Loss in one division → a peripheral branch · onion-skin pattern → brainstem', 'Jaw deviates toward the weak side on opening', 'Absent corneal reflex: V afferent (neither eye blinks) or VII efferent (only that eye fails)', 'Brisk jaw jerk → bilateral upper motor neuron lesion'] },
    VII: { tab: 'VII', nerves: ['VII'], kit: ['cotton', 'taste', 'otoscope'],
      ask: ['“Any weakness of your face? Food collecting in your cheek or drooling?”', '“Is your eye watering or dry?”', '“Has taste changed? Are sounds unusually loud?”', '“Any ear pain or rash?”'],
      look: ['Asymmetry: flat nasolabial fold, drooping corner of the mouth, smooth forehead, slow blink', 'Vesicles in the ear canal or on the palate (herpes zoster)'],
      do: ['Raise the eyebrows', 'Screw the eyes shut — try to open them', 'Show the teeth, then puff out the cheeks against light pressure', 'Taste on the front two-thirds if relevant: sweet or salty solution on a cotton bud, tongue protruded', 'Look in the ears with an otoscope'],
      means: ['Forehead spared → upper motor neuron (stroke); whole half of the face → lower motor neuron (Bell’s palsy and others)', 'Taste, hyperacusis and dry eye help place the level along the nerve', 'Both sides weak: Guillain–Barré, sarcoidosis, Lyme disease'] },
    VIII: { tab: 'VIII', nerves: ['VIII'], kit: ['fork', 'otoscope'],
      ask: ['“Any loss of hearing? Sudden or gradual? One ear or both?”', '“Any ringing in the ears?”', '“Do you feel the room spinning? For seconds, hours or days? Set off by moving your head?”'],
      look: ['Ear canals and drums with an otoscope — wax, perforation, discharge'],
      do: ['Whisper test: stand behind at arm’s length, rub the opposite tragus to mask it, whisper a mix of numbers and letters', 'Rinne: 512 Hz fork on the mastoid, then beside the ear — “Which is louder?”', 'Weber: fork in the middle of the forehead — “Where do you hear it?”', 'If dizzy: look for nystagmus, do a head impulse test, Dix–Hallpike for positional vertigo, then Romberg and gait'],
      means: ['Conductive loss: bone louder than air on that side, Weber goes to the bad ear', 'Sensorineural loss: air still louder than bone, Weber goes to the good ear', 'One-sided sensorineural loss → think vestibular schwannoma', 'Acute vertigo with a normal head impulse → think stroke (HINTS)'] },
    ixx: { tab: 'IX · X', nerves: ['IX', 'X'], kit: ['torch', 'depress', 'cotton', 'water'],
      ask: ['“Any difficulty swallowing? Solids or liquids?”', '“Do you cough or choke when you eat? Does fluid come out of your nose?”', '“Has your voice changed?”'],
      look: ['Listen to the voice — hoarse, nasal, slurred', 'Uvula and palate at rest, with a pen torch'],
      do: ['Say “aah” — the palate should rise evenly and the uvula stay central', 'Gag (only if needed; warn first): touch each side of the back of the throat with a depressor or cotton bud; ask if both sides feel the same', 'Ask the patient to cough', 'Water swallow: a small sip, watching for coughing or a wet voice'],
      means: ['Uvula pulled toward the normal side → X lesion on the other side', 'Gag: IX carries the sensation, X the movement', 'Weak, “bovine” cough and hoarseness → vocal cord palsy (recurrent laryngeal nerve)', 'Both sides: bulbar (wasting, absent gag) vs pseudobulbar (brisk gag and jaw jerk)'] },
    XI: { tab: 'XI', nerves: ['XI'], kit: [],
      ask: ['“Any weakness turning your head or lifting your arm above your shoulder?”', '“Any shoulder ache?”'],
      look: ['Wasting of sternocleidomastoid and trapezius, a dropped shoulder'],
      do: ['Shrug the shoulders against your hands', 'Turn the head against your hand on the side of the jaw — feel the sternocleidomastoid on the opposite side'],
      means: ['The right sternocleidomastoid turns the head to the left', 'Trapezius weak but sternocleidomastoid normal → injury in the posterior triangle (lymph node biopsy)', 'Both weak → skull base (jugular foramen)'] },
    XII: { tab: 'XII', nerves: ['XII'], kit: ['depress'],
      ask: ['“Is your speech slurred?”', '“Any difficulty moving food around your mouth?”'],
      look: ['The tongue resting in the floor of the mouth: wasting, fasciculations (look before protrusion — protruding makes any tongue tremble)'],
      do: ['Stick the tongue out straight', 'Move it from side to side', 'Push it into each cheek against your finger', 'Say “la la la”, “ta ta ta”'],
      means: ['Lower motor neuron: wasting, fasciculations, deviation toward the weak side', 'Upper motor neuron: small, stiff, slow tongue; no wasting', 'Both sides wasted → bulbar palsy (motor neurone disease)'] }
  };

  let step = 'setup', kit = null, built = false;

  function card(s) {
    const kitChips = s.kit.length ? s.kit.map(k => `<span class="ex-k"><i>${KIT[k][1]}</i>${KIT[k][0]}</span>`).join('') : '<span class="ex-none">no equipment needed</span>';
    return `<div class="ex-card">
      <div class="ex-col"><h5><i>❝</i>Ask</h5><ul class="ex-ask">${s.ask.map(a => `<li>${a}</li>`).join('')}</ul>
        <h5><i>◉</i>Look</h5><ul>${s.look.map(a => `<li>${a}</li>`).join('')}</ul></div>
      <div class="ex-col do"><h5><i>☞</i>Do</h5><ol>${s.do.map(a => `<li>${a}</li>`).join('')}</ol></div>
      <div class="ex-col"><h5><i>⚑</i>Abnormal means</h5><ul>${s.means.map(a => `<li>${a}</li>`).join('')}</ul>
        <h5><i>⚒</i>Equipment</h5><div class="ex-kit">${kitChips}</div></div>
    </div>`;
  }

  function build() {
    Info.modal('examModal', 'exTitle', `
      <h2 id="exTitle">Physical examination</h2>
      <p class="fx-lead">How the cranial nerves are examined at the bedside — what to ask, look for and do. Ordered as the examination is usually taught (e.g. Talley &amp; O’Connor’s <em>Clinical Examination</em>); the wording is our own summary.</p>
      <div class="ex-tray"><span class="cg-l">Equipment tray · click to see where it’s used</span>
        <div class="ex-tray-row">${Object.entries(KIT).map(([k, [l, i]]) => `<button class="ex-tk" data-kit="${k}"><i>${i}</i>${l}</button>`).join('')}</div></div>
      <div class="ex-tabs">${Object.entries(STEPS).map(([k, s], n) => `<button class="ex-tab" data-ex-step="${k}">${n ? '' : '<span>⚙</span>'}${s.tab}</button>`).join('')}</div>
      <div class="fg-stack" id="exStack">${Object.entries(STEPS).map(([k, s]) => `<div class="fg-v" data-k="${k}">${card(s)}</div>`).join('')}</div>`,
      onClick, close);
    built = true;
  }

  function onClick(e) {
    const t = e.target.closest('[data-ex-step]');
    if (t) { step = t.dataset.exStep; paint(); return; }
    const k = e.target.closest('[data-kit]');
    if (k) { kit = kit === k.dataset.kit ? null : k.dataset.kit; paint(); }
  }

  function paint() {
    const root = document.getElementById('examModal');
    root.querySelectorAll('[data-ex-step]').forEach(b => {
      const s = STEPS[b.dataset.exStep];
      b.classList.toggle('on', b.dataset.exStep === step);
      b.classList.toggle('uses', !!kit && s.kit.includes(kit));     // the chosen instrument is used here
      b.classList.toggle('dim', !!kit && !s.kit.includes(kit));
    });
    root.querySelectorAll('[data-kit]').forEach(b => b.classList.toggle('on', b.dataset.kit === kit));
    root.querySelectorAll('#exStack .ex-k').forEach(c => c.classList.toggle('hl', !!kit && c.textContent.includes(KIT[kit][0])));
    document.querySelectorAll('#exStack > .fg-v').forEach(v => v.classList.toggle('on', v.dataset.k === step));
  }

  // open on the nerve currently shown on the page
  function open(nerve) {
    if (!built) build();
    const hit = Object.keys(STEPS).find(k => STEPS[k].nerves.includes(nerve));
    if (hit) step = hit;
    paint();
    Info.show('examModal');
  }
  function close() { Info.hide('examModal'); }

  return { open, close };
})();
