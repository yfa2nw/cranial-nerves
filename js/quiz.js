// ─────────────────────────────────────────────────────────────
//  Quiz popup: rounds of multiple-choice questions in three fields
//  (anatomy & function · pathways & physiology · clinical findings),
//  each split into topics. Options are shuffled every time.
// ─────────────────────────────────────────────────────────────

const Quiz = (() => {
  // field → topics · [id, label]
  const FIELDS = {
    anat: { name: 'Anatomy & function', short: 'Anatomy', icon: '⌬', topics: [['origin', 'Origins & nuclei'], ['foramen', 'Foramina'], ['ganglion', 'Ganglia'], ['supply', 'What it supplies'], ['fibre', 'Fibre types'], ['arch', 'Pharyngeal arches']] },
    path: { name: 'Pathways & physiology', short: 'Pathways', icon: '↺', topics: [['reflex', 'Reflex arcs'], ['central', 'Pathways in the brain'], ['trans', 'Transduction']] },
    clin: { name: 'Clinical findings', short: 'Clinical', icon: '⚕', topics: [['sign', 'Condition → finding'], ['dx', 'Findings → condition']] }
  };
  const TOPIC = Object.fromEntries(Object.entries(FIELDS).flatMap(([f, F]) => F.topics.map(([t, l]) => [t, { field: f, label: l }])));

  // [topic, question, correct answer, [wrong answers], explanation]
  const BANK = [
    // ── anatomy · origins & nuclei
    ['origin', 'Which cranial nerve leaves the back (dorsal surface) of the brainstem?', 'IV · trochlear', ['III · oculomotor', 'VI · abducens', 'V · trigeminal'], 'IV is the only nerve to emerge dorsally, just below the inferior colliculus, and the only one whose fibres all cross before leaving.'],
    ['origin', 'Where does the oculomotor nerve leave the brainstem?', 'Interpeduncular fossa of the midbrain', ['Pontomedullary junction', 'Below the inferior colliculus', 'Preolivary sulcus of the medulla'], 'III emerges between the cerebral peduncles, then passes between the PCA and SCA.'],
    ['origin', 'Which nerve leaves at the pontomedullary junction, closest to the midline?', 'VI · abducens', ['VII · facial', 'VIII · vestibulocochlear', 'XII · hypoglossal'], 'From medial to lateral at the junction: VI, then VII, then VIII.'],
    ['origin', 'The hypoglossal rootlets emerge from…', 'The preolivary sulcus, between pyramid and olive', ['The postolivary sulcus, behind the olive', 'The pontomedullary junction', 'The lateral surface of the pons'], 'XII leaves in front of the olive; IX, X and XI leave behind it.'],
    ['origin', 'Which nerves leave from the postolivary sulcus?', 'IX, X and XI', ['XII only', 'VII and VIII', 'VI and XII'], 'IX, X and the cranial rootlets of XI emerge in a line behind the olive.'],
    ['origin', 'The trigeminal nerve attaches to…', 'The lateral pons, at the middle cerebellar peduncle', ['The interpeduncular fossa', 'The pontomedullary junction', 'The preolivary sulcus'], 'V has a large sensory root and a small motor root on the side of the pons.'],
    ['origin', 'Where are the motor neurons of the (spinal) accessory nerve?', 'Upper cervical cord, about C1–C5', ['Nucleus ambiguus', 'Hypoglossal nucleus', 'Dorsal motor nucleus of X'], 'The roots climb through the foramen magnum, then leave via the jugular foramen.'],
    ['origin', 'Which nucleus sends motor fibres in IX and X to the pharynx and larynx?', 'Nucleus ambiguus', ['Dorsal motor nucleus of X', 'Solitary nucleus', 'Hypoglossal nucleus'], 'Nucleus ambiguus = branchial motor (SVE) for swallowing and voice.'],
    ['origin', 'Taste fibres in VII, IX and X end in…', 'The solitary nucleus', ['The spinal trigeminal nucleus', 'Nucleus ambiguus', 'The inferior salivatory nucleus'], 'The upper (gustatory) part of the solitary nucleus takes taste; the lower part takes visceral sensation.'],
    ['origin', 'The Edinger–Westphal nucleus sends parasympathetic fibres in which nerve?', 'III', ['VII', 'IX', 'IV'], 'EW → III → ciliary ganglion → sphincter pupillae and ciliary muscle.'],
    ['origin', 'Which two cranial nerves don’t attach to the brainstem?', 'I and II', ['I and XI', 'II and IV', 'XI and XII'], 'I ends in the olfactory bulb and II in the diencephalon — both are really outgrowths of the forebrain.'],
    ['origin', 'Which nucleus drives the parotid gland?', 'Inferior salivatory nucleus (via IX)', ['Superior salivatory nucleus (via VII)', 'Dorsal motor nucleus of X', 'Edinger–Westphal nucleus'], 'Inferior salivatory → IX → lesser petrosal → otic ganglion → parotid.'],
    ['origin', 'Where is the facial motor nucleus?', 'Lower pons', ['Midbrain', 'Rostral medulla, beside XII', 'Upper cervical cord'], 'Its fibres loop around the VI nucleus (forming the facial colliculus) before leaving at the pontomedullary junction.'],

    // ── anatomy · foramina
    ['foramen', 'What passes through the optic canal?', 'The optic nerve and the ophthalmic artery', ['The optic nerve and the ophthalmic vein', 'II, III and IV', 'The optic nerve and V1'], 'The ophthalmic veins go through the superior orbital fissure instead.'],
    ['foramen', 'Which branch leaves through the foramen rotundum?', 'V2 · maxillary', ['V1 · ophthalmic', 'V3 · mandibular', 'VI · abducens'], 'V1 → superior orbital fissure, V2 → foramen rotundum, V3 → foramen ovale.'],
    ['foramen', 'Which branch leaves through the foramen ovale?', 'V3 · mandibular', ['V2 · maxillary', 'VII · facial', 'IX · glossopharyngeal'], 'The lesser petrosal nerve usually travels with it.'],
    ['foramen', 'Which nerves enter the internal acoustic meatus?', 'VII and VIII', ['VIII only', 'IX and X', 'VII, VIII and IX'], 'VII (with its intermediate nerve) and VIII share the canal, with the labyrinthine artery.'],
    ['foramen', 'Which nerves pass through the jugular foramen?', 'IX, X and XI', ['IX, X and XII', 'X, XI and XII', 'VII, IX and X'], 'XII has its own canal just below — so a jugular foramen lesion spares the tongue.'],
    ['foramen', 'Which nerve leaves through the stylomastoid foramen?', 'The facial nerve’s motor branches', ['Chorda tympani', 'Greater petrosal nerve', 'The glossopharyngeal nerve'], 'By the time VII exits here, the greater petrosal, stapedius and chorda tympani branches have already left.'],
    ['foramen', 'Which nerve passes through the superior orbital fissure outside the common tendinous ring?', 'IV · trochlear', ['VI · abducens', 'Superior division of III', 'Nasociliary nerve'], 'Outside the ring: lacrimal, frontal and IV. Inside: both divisions of III, nasociliary and VI.'],
    ['foramen', 'Olfactory nerve fibres reach the bulb through…', 'The cribriform plate', ['The optic canal', 'The superior orbital fissure', 'The foramen rotundum'], 'A fracture here can shear the fibres — anosmia and a CSF leak from the nose.'],
    ['foramen', 'Which nerve runs inside the cavernous sinus itself rather than in its wall?', 'VI · abducens', ['III · oculomotor', 'IV · trochlear', 'V1 · ophthalmic'], 'VI lies beside the internal carotid in the sinus, so it is often the first nerve affected.'],
    ['foramen', 'The spinal root of which nerve climbs up through the foramen magnum?', 'XI · accessory', ['XII · hypoglossal', 'IX · glossopharyngeal', 'X · vagus'], 'It enters the skull through the foramen magnum and leaves again through the jugular foramen.'],
    ['foramen', 'The chorda tympani leaves the skull through…', 'The petrotympanic fissure', ['The stylomastoid foramen', 'The foramen ovale', 'The internal acoustic meatus'], 'It crosses the middle ear, exits through the petrotympanic fissure and joins the lingual nerve.'],
    ['foramen', 'Which opening transmits the hypoglossal nerve?', 'Hypoglossal canal', ['Jugular foramen', 'Foramen magnum', 'Foramen lacerum'], 'The canal sits just above the occipital condyle.'],

    // ── anatomy · ganglia
    ['ganglion', 'Preganglionic fibres reach the ciliary ganglion in which nerve?', 'III', ['VII', 'V1', 'IX'], 'They synapse there; the short ciliary nerves carry the postganglionic fibres to the eye.'],
    ['ganglion', 'The pterygopalatine ganglion gets its preganglionic fibres from…', 'The greater petrosal nerve (VII)', ['The lesser petrosal nerve (IX)', 'The chorda tympani (VII)', 'The deep petrosal nerve'], 'It drives the lacrimal gland and the glands of the nose and palate. The deep petrosal nerve is sympathetic and just passes through.'],
    ['ganglion', 'The otic ganglion supplies…', 'The parotid gland', ['The submandibular gland', 'The lacrimal gland', 'The ciliary muscle'], 'IX → lesser petrosal → otic ganglion → auriculotemporal nerve (V3) → parotid.'],
    ['ganglion', 'Preganglionic fibres reach the submandibular ganglion via…', 'Chorda tympani, riding on the lingual nerve', ['Lesser petrosal nerve', 'Greater petrosal nerve', 'Hypoglossal nerve'], 'It drives the submandibular and sublingual glands.'],
    ['ganglion', 'Which fibres synapse in the ciliary ganglion?', 'Parasympathetic fibres to the sphincter pupillae', ['Sympathetic fibres to the dilator pupillae', 'Sensory fibres from the cornea', 'Motor fibres to the inferior oblique'], 'Sympathetic and sensory fibres pass through without synapsing — they are passengers.'],
    ['ganglion', 'The geniculate ganglion holds…', 'Cell bodies of taste fibres from the front of the tongue', ['Parasympathetic neurons to the lacrimal gland', 'Motor neurons to stapedius', 'Sympathetic neurons to the face'], 'Like every sensory ganglion, it holds cell bodies and has no synapses.'],
    ['ganglion', 'Do any fibres synapse in the trigeminal ganglion?', 'No — it only holds sensory cell bodies', ['Yes — parasympathetic fibres', 'Yes — the motor fibres of V3', 'Yes — sympathetic fibres'], 'Sensory ganglia are relay-free; synapses happen in autonomic ganglia.'],
    ['ganglion', 'The spiral ganglion contains…', 'Cell bodies of the cochlear nerve', ['Cell bodies of the vestibular nerve', 'The hair cells', 'Olivocochlear efferent neurons'], 'It sits in the modiolus of the cochlea. The vestibular equivalent is Scarpa’s ganglion.'],
    ['ganglion', 'Scarpa’s (vestibular) ganglion lies in…', 'The internal acoustic meatus', ['The jugular foramen', 'The cavernous sinus', 'The middle ear'], 'It holds the cell bodies of the vestibular nerve.'],
    ['ganglion', 'The inferior ganglion of the vagus carries mainly…', 'Visceral sensation from the chest and abdomen', ['Skin sensation from the ear', 'Taste from the anterior tongue', 'Parasympathetic motor fibres'], 'The superior ganglion handles the small patch of skin sensation in the ear.'],
    ['ganglion', 'Which nerve carries IX’s parasympathetic fibres to the otic ganglion?', 'Lesser petrosal nerve', ['Greater petrosal nerve', 'Deep petrosal nerve', 'Chorda tympani'], 'Via the tympanic plexus in the middle ear.'],

    // ── anatomy · what it supplies
    ['supply', 'Which nerve supplies the lateral rectus?', 'VI', ['III', 'IV', 'V1'], 'VI supplies only the lateral rectus; IV only the superior oblique; III the rest of the extraocular muscles.'],
    ['supply', 'Which nerve supplies the superior oblique?', 'IV', ['III', 'VI', 'V1'], 'It depresses and intorts the eye, most effectively when the eye is turned in.'],
    ['supply', 'Which nerve supplies the muscles of mastication?', 'V3', ['VII', 'V2', 'IX'], 'Masseter, temporalis and both pterygoids.'],
    ['supply', 'Which nerve supplies stapedius?', 'VII', ['V3', 'VIII', 'IX'], 'Tensor tympani, the other middle-ear muscle, is supplied by V3.'],
    ['supply', 'Which is the only muscle supplied by IX?', 'Stylopharyngeus', ['Palatoglossus', 'Superior constrictor', 'Levator veli palatini'], 'It lifts the pharynx during swallowing.'],
    ['supply', 'Which tongue muscle is not supplied by XII?', 'Palatoglossus (X)', ['Genioglossus', 'Styloglossus', 'Hyoglossus'], 'Palatoglossus is a palate muscle, supplied by the pharyngeal plexus (X).'],
    ['supply', 'Which palate muscle is not supplied by X?', 'Tensor veli palatini (V3)', ['Levator veli palatini', 'Palatoglossus', 'Musculus uvulae'], 'Like tensor tympani, it is a first-arch muscle.'],
    ['supply', 'General sensation from the posterior third of the tongue is carried by…', 'IX', ['V3 (lingual nerve)', 'VII (chorda tympani)', 'XII'], 'IX carries both taste and touch from the back third.'],
    ['supply', 'Taste from the anterior two-thirds of the tongue is carried by…', 'VII, via the chorda tympani', ['V3, via the lingual nerve', 'IX', 'X'], 'The lingual nerve (V3) carries touch from the same area; the taste fibres just ride along with it.'],
    ['supply', 'Which nerve carries sensation from the cornea?', 'V1, via the nasociliary nerve', ['V2', 'VII', 'II'], 'The afferent limb of the corneal reflex.'],
    ['supply', 'Skin over the angle of the jaw is supplied by…', 'C2–C3 (great auricular nerve)', ['V3', 'V2', 'VII'], 'A numb face that spares the jaw angle points to V; numbness of the angle itself does not.'],
    ['supply', 'Which nerve drives tear secretion?', 'VII (via the pterygopalatine ganglion)', ['V1 (lacrimal nerve)', 'III', 'IX'], 'The lacrimal nerve (V1) only delivers the postganglionic fibres to the gland.'],
    ['supply', 'Which nerve carries signals from the carotid sinus?', 'IX', ['X', 'XI', 'Sympathetic trunk'], 'Aortic arch baroreceptors use X instead.'],
    ['supply', 'Which nerve supplies sternocleidomastoid and trapezius?', 'XI', ['XII', 'C5 only', 'X'], 'The right sternocleidomastoid turns the head to the left.'],
    ['supply', 'Which laryngeal muscle is not supplied by the recurrent laryngeal nerve?', 'Cricothyroid', ['Posterior cricoarytenoid', 'Lateral cricoarytenoid', 'Thyroarytenoid'], 'Cricothyroid is supplied by the external laryngeal branch of the superior laryngeal nerve.'],
    ['supply', 'Sensation from the larynx above the vocal folds is carried by…', 'The internal laryngeal nerve (X)', ['The recurrent laryngeal nerve', 'IX', 'The external laryngeal nerve'], 'It is the afferent limb of the cough reflex. Below the folds, the recurrent laryngeal nerve takes over.'],
    ['supply', 'Which nerve supplies levator palpebrae superioris?', 'III', ['VII', 'Sympathetic fibres only', 'IV'], 'Müller’s muscle, its small smooth-muscle partner, is sympathetic — hence the mild ptosis of Horner syndrome.'],
    ['supply', 'Which nerve supplies the posterior belly of digastric?', 'VII', ['V3', 'IX', 'XII'], 'The anterior belly is V3 — the two bellies come from different arches.'],

    // ── anatomy · fibre types
    ['fibre', 'Which fibre types does the chorda tympani carry?', 'SVA (taste) and GVE (parasympathetic)', ['GSA and SVE', 'SVA and GSA', 'GVE and SVE'], 'Taste from the anterior tongue, plus preganglionic fibres to the submandibular ganglion.'],
    ['fibre', 'The greater petrosal nerve mainly carries…', 'GVE · preganglionic fibres for the lacrimal gland', ['SVE · motor fibres to stapedius', 'GSA · skin sensation', 'SSA · hearing'], 'It also carries a few taste fibres from the palate.'],
    ['fibre', 'The nerve to masseter carries which fibre type?', 'SVE · branchial motor', ['GSE · somatic motor', 'GVE · autonomic', 'GSA · general sensory'], 'Muscles from the pharyngeal arches are classed as SVE.'],
    ['fibre', 'What fibre type does the trochlear nerve carry?', 'GSE', ['SVE', 'GVE', 'GSA'], 'Eye muscles develop from somites → somatic motor.'],
    ['fibre', 'The olfactory nerve carries…', 'SVA', ['SSA', 'GVA', 'GSA'], 'Smell (like taste) is classed as special visceral afferent.'],
    ['fibre', 'The optic nerve carries…', 'SSA', ['SVA', 'GSA', 'GVA'], 'Vision and hearing are special somatic afferent.'],
    ['fibre', 'Motor fibres of the recurrent laryngeal nerve are…', 'SVE', ['GSE', 'GVE', 'GVA'], 'The laryngeal muscles come from the 6th arch.'],
    ['fibre', 'The hypoglossal nerve carries…', 'GSE', ['SVE', 'GVE', 'GSA'], 'Tongue muscles come from occipital somites.'],
    ['fibre', 'The carotid sinus nerve carries…', 'GVA', ['GSA', 'SVA', 'GVE'], 'Visceral sensation — stretch of the vessel wall.'],
    ['fibre', 'The deep petrosal nerve carries…', 'Postganglionic sympathetic fibres', ['Preganglionic parasympathetic fibres', 'Taste fibres', 'Branchial motor fibres'], 'From the plexus on the internal carotid; it joins the greater petrosal to form the nerve of the pterygoid canal.'],
    ['fibre', 'The lingual nerve, before the chorda tympani joins it, carries…', 'GSA · touch and pain from the tongue', ['SVA · taste', 'GVE · secretomotor', 'GSE · tongue movement'], 'Taste and secretomotor fibres hitch a ride from VII further down.'],

    // ── anatomy · pharyngeal arches
    ['arch', 'Which nerve belongs to the 1st pharyngeal arch?', 'V3', ['VII', 'IX', 'X'], 'Arch nerves: 1 → V3, 2 → VII, 3 → IX, 4 and 6 → X.'],
    ['arch', 'Which muscles come from the 2nd arch?', 'Muscles of facial expression', ['Muscles of mastication', 'Stylopharyngeus', 'Intrinsic laryngeal muscles'], 'Also stapedius, stylohyoid and the posterior belly of digastric — all VII.'],
    ['arch', 'Which muscle comes from the 3rd arch?', 'Stylopharyngeus', ['Stylohyoid', 'Styloglossus', 'Cricothyroid'], 'The only muscle of IX.'],
    ['arch', 'Tensor tympani and tensor veli palatini come from which arch?', '1st', ['2nd', '3rd', '4th'], 'Both are supplied by V3.'],
    ['arch', 'Cricothyroid comes from which arch?', '4th', ['6th', '3rd', '2nd'], '4th arch → superior laryngeal nerve. The 6th arch gives the other laryngeal muscles (recurrent laryngeal).'],
    ['arch', 'Which muscle is a 1st-arch muscle?', 'Mylohyoid', ['Stylohyoid', 'Buccinator', 'Platysma'], 'Mylohyoid and the anterior belly of digastric are V3; buccinator and platysma are VII.'],
    ['arch', 'The intrinsic laryngeal muscles (except cricothyroid) come from…', 'The 6th arch, via the recurrent laryngeal nerve', ['The 4th arch, via the superior laryngeal nerve', 'The 3rd arch, via IX', 'Occipital somites, via XII'], 'This is why the recurrent laryngeal nerve loops under the subclavian (right) or the aortic arch (left).'],

    // ── pathways · reflex arcs
    ['reflex', 'Pupillary light reflex: afferent and efferent limbs?', 'II in, III out', ['V1 in, III out', 'II in, VII out', 'III in, II out'], 'Pretectal nuclei → both Edinger–Westphal nuclei → ciliary ganglion → sphincter pupillae.'],
    ['reflex', 'Corneal reflex: afferent and efferent limbs?', 'V1 in, VII out', ['VII in, V1 out', 'V2 in, VII out', 'II in, VII out'], 'Touching one cornea makes both eyes blink.'],
    ['reflex', 'Gag reflex: afferent and efferent limbs?', 'IX in, X out', ['X in, IX out', 'IX in, XII out', 'V3 in, X out'], 'Sensation from the pharynx (IX) → nucleus ambiguus → pharyngeal muscles (X).'],
    ['reflex', 'The jaw jerk uses which nerve(s)?', 'V3 in and V3 out', ['V3 in, VII out', 'V2 in, V3 out', 'VII in and out'], 'A monosynaptic stretch reflex through the mesencephalic nucleus of V.'],
    ['reflex', 'What does the carotid sinus reflex do when blood pressure rises?', 'Slows the heart and lowers blood pressure', ['Speeds the heart up', 'Constricts the pupils', 'Increases breathing'], 'IX carries the stretch signal in; X slows the heart.'],
    ['reflex', 'Vestibulo-ocular reflex: what is it for?', 'Keeping the eyes on target while the head moves', ['Focusing on near objects', 'Protecting the ear from loud sound', 'Blinking when the cornea is touched'], 'VIII (vestibular) in → III, IV, VI out; the eyes counter-rotate as fast as the head turns.'],
    ['reflex', 'The stapedius (acoustic) reflex: afferent and efferent?', 'VIII in, VII out', ['VII in, VIII out', 'VIII in, V3 out', 'V3 in, VII out'], 'It damps loud sounds. Without it (VII palsy above the stapedius branch) sounds are painfully loud.'],
    ['reflex', 'The oculocardiac reflex: pressure on the eye causes…', 'Sudden slowing of the heart', ['Rise in blood pressure', 'Pupil dilation', 'Tear production only'], 'V1 in, X out — a risk during squint surgery.'],
    ['reflex', 'Lacrimation reflex: afferent and efferent?', 'V1 in, VII out', ['VII in, V1 out', 'II in, VII out', 'V1 in, III out'], 'Irritation of the eye → superior salivatory nucleus → greater petrosal → pterygopalatine ganglion → tears.'],
    ['reflex', 'Light in the right eye: neither pupil constricts. Light in the left: both do. Where is the problem?', 'Right optic nerve', ['Right oculomotor nerve', 'Left optic nerve', 'Left oculomotor nerve'], 'An afferent lesion silences both pupils only when its own eye is lit.'],
    ['reflex', 'Why does light in one eye constrict both pupils?', 'Each pretectal nucleus projects to both Edinger–Westphal nuclei', ['The optic nerves fuse completely at the chiasm', 'III supplies both eyes', 'The ciliary ganglia are linked'], 'That bilateral wiring gives the consensual response.'],
    ['reflex', 'A brisk jaw jerk suggests…', 'Upper motor neuron damage on both sides above the pons', ['A V3 lesion', 'A facial nerve palsy', 'Normal ageing'], 'Seen in pseudobulbar palsy and motor neurone disease.'],
    ['reflex', 'Which three things happen in the near (accommodation) response?', 'Convergence, pupil constriction, lens thickening', ['Divergence, pupil dilation, lens flattening', 'Blinking, tearing, convergence', 'Pupil dilation, lens thickening, convergence'], 'All driven by III — the medial recti, sphincter pupillae and ciliary muscle.'],
    ['reflex', 'The cough reflex afferent comes from…', 'The internal laryngeal nerve (X)', ['The recurrent laryngeal nerve', 'IX', 'The phrenic nerve'], 'Lose it and food can enter the airway silently.'],

    // ── pathways · in the brain
    ['central', 'Which sense reaches the cortex without first relaying in the thalamus?', 'Smell', ['Vision', 'Hearing', 'Taste'], 'Olfactory tract → piriform cortex, amygdala and entorhinal cortex directly.'],
    ['central', 'Olfactory receptor neurons synapse in…', 'Glomeruli of the olfactory bulb', ['The piriform cortex', 'The thalamus', 'The amygdala'], 'They meet mitral and tufted cells there.'],
    ['central', 'Retinal ganglion cell axons for conscious vision relay in…', 'The lateral geniculate nucleus (LGN)', ['The medial geniculate nucleus (MGN)', 'The superior colliculus', 'The pulvinar'], 'LGN → optic radiation → primary visual cortex.'],
    ['central', 'Which retinal fibres cross at the optic chiasm?', 'Those from the nasal half of each retina', ['Those from the temporal half', 'All of them', 'Only fibres from the macula'], 'Nasal fibres carry the temporal fields — so a chiasm lesion gives bitemporal loss.'],
    ['central', 'Pupil-reflex fibres leave the optic tract to reach…', 'The pretectal area', ['The LGN', 'The visual cortex', 'The hypothalamus'], 'They branch off before the LGN, so cortical blindness leaves pupils reacting.'],
    ['central', 'Retinal fibres to the suprachiasmatic nucleus set…', 'The body clock (circadian rhythm)', ['Pupil size', 'Eye movements', 'Colour vision'], 'A small group of light-sensitive ganglion cells (melanopsin) drives this retinohypothalamic tract.'],
    ['central', 'Fibres of Meyer’s loop carry which part of the visual field?', 'Upper quadrant, opposite side', ['Lower quadrant, opposite side', 'Upper quadrant, same side', 'Central vision only'], 'They sweep through the temporal lobe — a temporal lesion gives a “pie in the sky” defect.'],
    ['central', 'Where is the primary visual cortex?', 'Around the calcarine sulcus, occipital lobe', ['Superior temporal gyrus', 'Postcentral gyrus', 'Insula'], 'Each side sees the opposite half of the visual field.'],
    ['central', 'The dorsal visual stream (“where / how”) runs toward the…', 'Parietal lobe — position and motion', ['Temporal lobe — faces and objects', 'Frontal lobe — speech', 'Cerebellum — balance'], 'The ventral (“what”) stream runs into the temporal lobe for recognition.'],
    ['central', 'The thalamic relay for hearing is…', 'The medial geniculate nucleus (MGN)', ['The lateral geniculate nucleus (LGN)', 'The VPM nucleus', 'The pulvinar'], 'MGN → primary auditory cortex (Heschl’s gyrus).'],
    ['central', 'Where are sounds from the two ears first compared?', 'Superior olivary complex', ['Cochlear nuclei', 'Inferior colliculus', 'Auditory cortex'], 'The cochlear nuclei are the last station that hears only one ear.'],
    ['central', 'Which order is right for the auditory pathway?', 'Cochlear nuclei → olive → inferior colliculus → MGN → cortex', ['Cochlear nuclei → MGN → olive → cortex', 'Olive → cochlear nuclei → LGN → cortex', 'Inferior colliculus → olive → MGN → cortex'], 'The lateral lemniscus links the olive to the inferior colliculus.'],
    ['central', 'Why doesn’t damage to one auditory cortex cause deafness in one ear?', 'Each ear projects to both sides from the olive upward', ['The cochlear nuclei are bilateral', 'Hearing is processed in the cerebellum', 'The auditory nerve splits at the chiasm'], 'One-sided deafness points to the ear, VIII or the cochlear nuclei.'],
    ['central', 'Which tract links the vestibular nuclei to the eye-muscle nuclei?', 'Medial longitudinal fasciculus (MLF)', ['Lateral lemniscus', 'Corticobulbar tract', 'Spinothalamic tract'], 'Damage to it causes an internuclear ophthalmoplegia.'],
    ['central', 'Taste and facial sensation relay in which thalamic nucleus?', 'VPM (ventral posteromedial)', ['LGN', 'MGN', 'Anterior nucleus'], 'Taste continues to the insula / frontal operculum.'],
    ['central', 'In the LGN, magnocellular layers mostly carry…', 'Motion and contrast', ['Colour and fine detail', 'Smell', 'Eye position'], 'Parvocellular layers carry colour and fine detail.'],

    // ── pathways · transduction
    ['trans', 'What does light do to a photoreceptor?', 'Hyperpolarises it', ['Depolarises it', 'Opens sodium channels', 'Releases more glutamate'], 'In darkness cGMP holds channels open; light lowers cGMP, the channels close and transmitter release falls.'],
    ['trans', 'In rods, activated rhodopsin turns on…', 'Transducin, which activates a cGMP phosphodiesterase', ['Adenylyl cyclase, raising cAMP', 'A ligand-gated sodium channel', 'Voltage-gated calcium channels directly'], 'Breaking down cGMP closes the cation channels.'],
    ['trans', 'Odorant receptors are…', 'G-protein-coupled receptors (Golf → cAMP)', ['Ligand-gated ion channels', 'Mechanically gated channels', 'Receptor tyrosine kinases'], 'cAMP opens CNG channels; Ca²⁺ then opens Cl⁻ channels, which adds to the depolarisation.'],
    ['trans', 'Each olfactory receptor neuron expresses…', 'One receptor type, and all neurons of that type converge on a few glomeruli', ['Every receptor type', 'Two receptor types, one per nostril', 'A receptor type that changes daily'], 'This turns each odour into a map of active glomeruli.'],
    ['trans', 'What opens hair-cell transduction channels?', 'Bending the stereocilia toward the tallest one', ['Bending them toward the shortest one', 'A rise in perilymph sodium', 'Light'], 'Tip links pull the channels open; K⁺ flows in from the endolymph and depolarises the cell.'],
    ['trans', 'What is unusual about endolymph?', 'It is high in potassium, at about +80 mV', ['It is high in sodium, like plasma', 'It contains no ions', 'It is identical to CSF'], 'The stria vascularis pumps K⁺ into the scala media, which powers transduction.'],
    ['trans', 'The outer hair cells’ main job is to…', 'Amplify vibration of the basilar membrane', ['Send most of the signal to the brain', 'Detect head rotation', 'Produce endolymph'], 'They change length (prestin). Inner hair cells carry most of the afferent signal.'],
    ['trans', 'Which part of the basilar membrane responds to low frequencies?', 'The apex', ['The base', 'The round window', 'The middle only'], 'High frequencies peak near the base — the first part lost with ageing or noise.'],
    ['trans', 'Salty taste is detected mainly by…', 'ENaC sodium channels', ['T1R G-protein-coupled receptors', 'T2R bitter receptors', 'Proton pumps'], 'Sweet, umami and bitter use G-protein-coupled receptors; sour senses protons.'],
    ['trans', 'Rods differ from cones in that rods…', 'Work in dim light but don’t see colour', ['See colour in bright light', 'Pack the fovea', 'Give the sharpest vision'], 'The fovea is pure cones — sharp, colour vision in good light.'],
    ['trans', 'Interaural time differences help locate mostly…', 'Low-frequency sounds', ['High-frequency sounds', 'Sounds above the head only', 'Very loud sounds only'], 'High frequencies rely on level differences (the head casts a sound shadow).'],
    ['trans', 'Olfactory receptor neurons are unusual because they…', 'Are replaced throughout life', ['Have no axons', 'Are not neurons', 'Synapse in the thalamus'], 'Basal stem cells renew them every month or two — which is why post-viral smell loss can recover.'],

    // ── clinical · condition → finding
    ['sign', 'Bell’s palsy — which finding is most likely?', 'Weakness of the whole half of the face, forehead included', ['Weakness of the lower face, forehead spared', 'Numbness of the face', 'Ptosis with a small pupil'], 'A lower motor neuron lesion of VII takes the whole half of the face.'],
    ['sign', 'A stroke affecting the corticobulbar fibres to VII — most likely finding?', 'Weak lower face on the opposite side, forehead spared', ['Weak whole face on the same side', 'Loss of taste on the same side', 'Hyperacusis'], 'The forehead gets input from both hemispheres, so it is spared.'],
    ['sign', 'Posterior communicating artery aneurysm — most likely finding?', 'Painful III palsy with a dilated pupil', ['III palsy with a normal pupil', 'VI palsy', 'Horner syndrome'], 'The pupil fibres lie on the outside of III and are compressed first.'],
    ['sign', 'Diabetic (microvascular) III palsy — most likely finding?', 'Down-and-out eye and ptosis, pupil normal', ['Fixed dilated pupil', 'Bitemporal field loss', 'Vertical nystagmus'], 'Ischaemia hits the core of the nerve and spares the outer pupil fibres.'],
    ['sign', 'Horner syndrome — which finding?', 'Mild ptosis and a small pupil', ['Complete ptosis and a large pupil', 'A pupil that reacts to near but not light', 'Proptosis'], 'Loss of sympathetic supply: Müller’s muscle and the dilator pupillae fail. Sweating may be reduced too.'],
    ['sign', 'IV palsy — most likely complaint?', 'Vertical double vision, worse going downstairs', ['Horizontal double vision on looking to the side', 'Loss of vision in one eye', 'Drooping eyelid'], 'Patients often tilt their head away from the affected side.'],
    ['sign', 'Raised intracranial pressure most often damages which eye nerve?', 'VI — horizontal double vision', ['IV — vertical double vision', 'III — ptosis', 'II — sudden blindness'], 'VI has the longest course inside the skull — a false localising sign.'],
    ['sign', 'Vestibular schwannoma — most likely early finding?', 'One-sided hearing loss and tinnitus', ['Facial palsy', 'Double vision', 'Loss of smell'], 'Then the corneal reflex goes (V), then the face (VII), then balance.'],
    ['sign', 'Pituitary macroadenoma pressing upward — most likely finding?', 'Bitemporal hemianopia', ['Homonymous hemianopia', 'Central scotoma in one eye', 'Upper quadrantanopia'], 'It squeezes the crossing nasal fibres at the chiasm.'],
    ['sign', 'Optic neuritis — most likely finding?', 'Painful loss of vision in one eye with an RAPD', ['Painless sudden loss of vision with a cherry-red spot', 'Bitemporal hemianopia', 'Double vision'], 'Pain on eye movement and poor colour vision are typical; often linked to MS.'],
    ['sign', 'Myasthenia gravis — which finding?', 'Ptosis and double vision that worsen through the day, pupils normal', ['Fixed dilated pupil', 'Facial numbness', 'Deafness'], 'Fatigable weakness at the neuromuscular junction; it fits no single nerve.'],
    ['sign', 'Left recurrent laryngeal nerve palsy — most likely finding?', 'Hoarse voice and a weak (“bovine”) cough', ['Loss of taste', 'Tongue deviation', 'Weak shoulder shrug'], 'The left nerve loops under the aortic arch — lung cancer, aortic aneurysm or surgery can damage it.'],
    ['sign', 'A lower motor neuron lesion of the right XII — which finding?', 'Tongue deviates to the right, with wasting', ['Tongue deviates to the left', 'Uvula deviates to the right', 'Loss of taste on the right'], 'The intact left genioglossus pushes the tongue toward the weak side.'],
    ['sign', 'A right vagus nerve lesion — what happens to the uvula on saying “aah”?', 'It deviates to the left', ['It deviates to the right', 'It stays central', 'It doesn’t move at all'], 'The healthy left side lifts and pulls the uvula toward itself.'],
    ['sign', 'Ramsay Hunt syndrome — which finding?', 'Facial palsy with blisters in the ear canal', ['Facial palsy with forehead sparing', 'Painless deafness only', 'Ptosis and miosis'], 'Herpes zoster in the geniculate ganglion; it may also cause hearing loss and vertigo.'],
    ['sign', 'Trigeminal neuralgia — most likely finding?', 'Brief, electric-shock face pain set off by touch', ['Constant numbness of the whole face', 'Weak chewing', 'Loss of the corneal reflex'], 'Usually V2 or V3; examination is normal between attacks.'],
    ['sign', 'Internuclear ophthalmoplegia — which finding?', 'On looking sideways, one eye fails to adduct while the other shows nystagmus', ['Neither eye can look up', 'One eye can’t abduct', 'Both pupils are fixed'], 'MLF lesion — MS in the young, stroke in the old. Convergence is preserved.'],
    ['sign', 'Uncal herniation — earliest localising finding?', 'A dilated pupil on the side of the mass', ['A small pupil on the opposite side', 'Bilateral VI palsy', 'Bitemporal hemianopia'], 'The uncus presses III against the tentorium — an emergency.'],
    ['sign', 'Cavernous sinus thrombosis — which finding?', 'Painful eye-movement palsies with proptosis and chemosis', ['Isolated loss of smell', 'Painless one-sided deafness', 'Tongue wasting'], 'III, IV, V1, V2 and VI are all at risk; vision is often spared early.'],
    ['sign', 'Right conductive hearing loss — what do the tuning-fork tests show?', 'Weber goes to the right; Rinne bone > air on the right', ['Weber goes to the left; Rinne normal on both sides', 'Weber central; Rinne bone > air on the left', 'Weber goes to the left; Rinne bone > air on the right'], 'In sensorineural loss Weber goes to the good ear and Rinne stays air > bone.'],
    ['sign', 'Pseudobulbar palsy — which finding?', 'Brisk jaw jerk and a stiff, slow tongue', ['Wasted, fasciculating tongue', 'Absent gag reflex', 'One-sided facial palsy'], 'Bilateral upper motor neuron damage; emotional lability is common.'],
    ['sign', 'Giant cell arteritis affecting the eye — most likely finding?', 'Sudden painless vision loss with a swollen pale disc', ['Gradual painless field loss over years', 'Painful red eye with halos', 'Double vision on looking up'], 'Arteritic AION — check ESR/CRP and start steroids urgently.'],

    // ── clinical · findings → condition
    ['dx', 'Hoarseness, dysphagia, numb face on one side, loss of pain on the opposite side of the body, Horner syndrome and ataxia. Most likely?', 'Lateral medullary (Wallenberg) syndrome', ['Medial medullary syndrome', 'Weber syndrome', 'Bell’s palsy'], 'Vertebral or PICA occlusion — crossed sensory loss without weakness.'],
    ['dx', 'Right III palsy with weakness of the left arm and leg. Most likely?', 'Right midbrain (Weber) stroke', ['Left internal capsule stroke', 'Right cavernous sinus lesion', 'Myasthenia gravis'], 'Crossed signs mean brainstem; III sets the level at the midbrain.'],
    ['dx', 'Small irregular pupils that constrict to near but not to light. Most likely?', 'Argyll Robertson pupils (neurosyphilis)', ['Adie pupil', 'Horner syndrome', 'III palsy'], 'Light–near dissociation with small pupils.'],
    ['dx', 'A young woman with one large pupil that reacts slowly, and absent knee jerks. Most likely?', 'Adie (tonic) pupil', ['Argyll Robertson pupil', 'III palsy from an aneurysm', 'Horner syndrome'], 'Damage to the ciliary ganglion; the pupil reacts better to near than light.'],
    ['dx', 'Brief spinning vertigo when rolling over in bed, positive Dix–Hallpike, normal hearing. Most likely?', 'Benign paroxysmal positional vertigo', ['Vestibular schwannoma', 'Ménière’s disease', 'Cerebellar stroke'], 'Loose otoconia in the posterior canal; treated with a repositioning manoeuvre.'],
    ['dx', 'Episodes of vertigo lasting hours, with fluctuating low-tone hearing loss, tinnitus and ear fullness. Most likely?', 'Ménière’s disease', ['BPPV', 'Vestibular neuritis', 'Acoustic neuroma'], 'Endolymphatic hydrops.'],
    ['dx', 'Days of constant vertigo after a cold, with normal hearing and an abnormal head impulse test. Most likely?', 'Vestibular neuritis', ['Labyrinthitis', 'BPPV', 'Brainstem stroke'], 'With hearing loss too, it would be labyrinthitis. A normal head impulse in acute vertigo is a red flag for stroke.'],
    ['dx', 'Loss of smell on one side, then personality change. Most likely?', 'Olfactory groove meningioma', ['Post-viral anosmia', 'Kallmann syndrome', 'Nasal polyps'], 'It grows under the frontal lobes; Foster Kennedy syndrome if it compresses one optic nerve.'],
    ['dx', 'Wasted, fasciculating tongue, absent gag reflex and nasal speech. Most likely?', 'Bulbar palsy', ['Pseudobulbar palsy', 'Unilateral XII palsy', 'Myasthenia gravis'], 'Bilateral lower motor neuron loss — e.g. motor neurone disease.'],
    ['dx', 'Dysphagia, hoarseness and a weak shoulder shrug, all on one side; tongue normal. Most likely?', 'Jugular foramen syndrome', ['Lateral medullary syndrome', 'Hypoglossal canal lesion', 'Cerebellopontine angle tumour'], 'IX, X and XI share the jugular foramen; XII leaves separately.'],
    ['dx', 'Contralateral upper outer quadrant field loss in both eyes. Most likely lesion site?', 'Temporal lobe (Meyer’s loop)', ['Parietal lobe', 'Optic chiasm', 'Optic nerve'], '“Pie in the sky” — the lower radiation fibres loop through the temporal lobe.'],
    ['dx', 'Sudden painless loss of vision in one eye; the retina is pale with a cherry-red spot. Most likely?', 'Central retinal artery occlusion', ['Optic neuritis', 'Papilloedema', 'Retinal detachment'], 'The fovea keeps its choroidal supply, so it stays red against the pale retina.'],
    ['dx', 'Headache worse lying down, swollen optic discs, enlarged blind spots, vision near normal. Most likely?', 'Papilloedema from raised intracranial pressure', ['Optic neuritis', 'Arteritic AION', 'Glaucoma'], 'Raised pressure swells both discs; acuity is preserved until late.'],
    ['dx', 'Right VI palsy, right LMN facial palsy and left-sided weakness. Most likely?', 'Right ventral pontine (Millard–Gubler) syndrome', ['Left midbrain stroke', 'Right cerebellopontine angle tumour', 'Bell’s palsy'], 'VI and VII fascicles run through the basis pontis beside the corticospinal tract.'],
    ['dx', 'Right tongue deviation with wasting, plus left arm and leg weakness and loss of position sense. Most likely?', 'Right medial medullary syndrome', ['Right lateral medullary syndrome', 'Left internal capsule stroke', 'Right hypoglossal canal tumour'], 'Pyramid, medial lemniscus and XII lie together near the midline.'],
    ['dx', 'Dry eye, loss of taste, painfully loud sounds and a full facial palsy, all on the right. Where is the lesion?', 'Right facial nerve at or above the geniculate ganglion', ['At the stylomastoid foramen', 'In the parotid gland', 'In the left motor cortex'], 'All branches are lost, so the lesion lies above the greater petrosal branch.'],
    ['dx', 'Fatigable ptosis, double vision that changes from hour to hour, normal pupils and improvement with an ice pack. Most likely?', 'Myasthenia gravis', ['III palsy', 'Horner syndrome', 'Thyroid eye disease'], 'Cooling improves neuromuscular transmission; antibodies to the acetylcholine receptor are typical.'],
    ['dx', 'VI palsy, deep facial pain and a discharging ear on the same side. Most likely?', 'Petrous apicitis (Gradenigo syndrome)', ['Cavernous sinus thrombosis', 'Raised intracranial pressure', 'Bell’s palsy'], 'Infection at the petrous tip involves VI and the trigeminal ganglion.'],
    ['dx', 'Unilateral sensorineural hearing loss and tinnitus, then reduced corneal reflex on the same side. Most likely?', 'Vestibular schwannoma', ['Ménière’s disease', 'Otosclerosis', 'Presbycusis'], 'A cerebellopontine angle mass compresses VIII first, then V.'],
    ['dx', 'An elderly patient with new headache, jaw pain on chewing and a tender scalp. What is the main risk?', 'Sudden blindness from giant cell arteritis', ['Bell’s palsy', 'Trigeminal neuralgia', 'Acute glaucoma'], 'Check ESR/CRP and start steroids before the biopsy.'],
    ['dx', 'Brisk jaw jerk, spastic tongue, slurred speech and uncontrollable laughing or crying. Most likely?', 'Pseudobulbar palsy', ['Bulbar palsy', 'Myasthenia gravis', 'Bell’s palsy'], 'Both corticobulbar tracts are damaged — e.g. bilateral strokes or MND.']
  ];

  const LEN = [['10', 10], ['20', 20], ['All', 999]];
  let field = 'anat', topic = 'all', len = 10, round = [], at = 0, picked = null, results = [], built = false;

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pool = () => BANK.filter(([t]) => (field === 'mix' || TOPIC[t].field === field) && (topic === 'all' || t === topic));

  function start(list) {
    round = shuffle(list || pool()).slice(0, len).map(q => ({ q, opts: shuffle([q[2], ...q[3]]) }));
    at = 0; picked = null; results = [];
    paint();
  }

  // ── rendering
  function topicsHTML() {
    const ts = field === 'mix' ? [] : FIELDS[field].topics;
    const n = (t) => BANK.filter(q => (field === 'mix' || TOPIC[q[0]].field === field) && (t === 'all' || q[0] === t)).length;
    return [['all', 'All topics'], ...ts].map(([k, l]) => `<button class="ab-cat qz-t ${k === topic ? 'on' : ''}" data-qt="${k}">${l}<em>${n(k)}</em></button>`).join('');
  }

  function questionHTML() {
    const { q, opts } = round[at];
    const done = picked !== null;
    const ok = done && opts[picked] === q[2];
    return `<div class="qz-card">
      <div class="qz-meta"><span class="qz-tag">${FIELDS[TOPIC[q[0]].field].short} · ${TOPIC[q[0]].label}</span><span>Question ${at + 1} of ${round.length}</span></div>
      <h4 class="qz-q">${q[1]}</h4>
      <div class="qz-opts">${opts.map((o, i) => {
        const cls = !done ? '' : o === q[2] ? 'right' : i === picked ? 'wrong' : 'dim';
        return `<button class="qz-o ${cls}" data-opt="${i}" ${done ? 'disabled' : ''}><kbd>${i + 1}</kbd><span>${o}</span></button>`;
      }).join('')}</div>
      <div class="qz-fb ${done ? (ok ? 'ok' : 'no') : ''}">${done
        ? `<b>${ok ? '✓ Correct' : '✗ Not quite'}</b><p>${ok ? '' : `Answer: <strong>${q[2]}</strong>. `}${q[4]}</p><button class="pill ck qz-next" data-next="1">${at + 1 < round.length ? 'Next question' : 'See results'} <kbd>Enter</kbd></button>`
        : '<p class="qz-hint">Pick an answer — click, or press 1–4.</p>'}</div>
    </div>`;
  }

  function resultHTML() {
    const right = results.filter(Boolean).length;
    const by = {};
    round.forEach(({ q }, i) => { const t = q[0]; (by[t] = by[t] || [0, 0])[1]++; if (results[i]) by[t][0]++; });
    const missed = round.filter((_, i) => !results[i]);
    const pct = Math.round(100 * right / round.length);
    return `<div class="qz-card qz-end">
      <div class="qz-score"><b>${right}<small>/${round.length}</small></b><span>${pct >= 85 ? 'Excellent' : pct >= 65 ? 'Good work' : pct >= 40 ? 'Getting there' : 'Worth another look'}</span></div>
      <div class="qz-by">${Object.entries(by).map(([t, [r, n]]) => `<div class="qz-bt"><span>${TOPIC[t].label}</span><i><s style="width:${Math.round(100 * r / n)}%"></s></i><em>${r}/${n}</em></div>`).join('')}</div>
      ${missed.length ? `<h5>To review</h5><ul class="qz-miss">${missed.map(({ q }) => `<li><span>${q[1]}</span><b>${q[2]}</b></li>`).join('')}</ul>` : '<p class="qz-hint">Nothing missed — try a longer round or another field.</p>'}
      <div class="qz-acts">${missed.length ? '<button class="pill ck" data-retry="1">Retry the missed ones</button>' : ''}<button class="pill ck" data-again="1">New round</button></div>
    </div>`;
  }

  function build() {
    Info.modal('quizModal', 'qzTitle', `
      <h2 id="qzTitle">Quiz</h2>
      <p class="fx-lead">Short rounds of multiple-choice questions. Pick a field and a topic; every answer comes with a one-line explanation.</p>
      <div class="ex-tabs qz-fields">${Object.entries(FIELDS).map(([k, F]) => `<button class="ex-tab" data-qf="${k}"><span>${F.icon}</span>${F.name}</button>`).join('')}
        <button class="ex-tab" data-qf="mix"><span>✦</span>Mixed</button></div>
      <div class="qz-bar"><div class="ab-cats qz-topics" id="qzTopics"></div>
        <div class="ctrl-grp"><span class="cg-l">Round</span><div class="seg2">${LEN.map(([l, n]) => `<button class="seg-b" data-ql="${n}">${l}</button>`).join('')}</div></div></div>
      <div class="qz-dots" id="qzDots"></div>
      <div id="qzBody"></div>`, onClick, close);
    document.addEventListener('keydown', onKey);
    built = true;
  }

  function onKey(e) {
    if (!document.getElementById('quizModal')?.classList.contains('on') || e.target.closest('input, textarea')) return;
    if (at < round.length && picked === null && /^[1-4]$/.test(e.key) && +e.key <= round[at].opts.length) { answer(+e.key - 1); e.preventDefault(); }
    else if (e.key === 'Enter' && picked !== null) { next(); e.preventDefault(); }
  }

  function answer(i) {
    picked = i;
    results[at] = round[at].opts[i] === round[at].q[2];
    paint();
  }
  function next() { at++; picked = null; paint(); }

  function onClick(e) {
    const f = e.target.closest('[data-qf]');
    if (f) { field = f.dataset.qf; topic = 'all'; start(); return; }
    const t = e.target.closest('[data-qt]');
    if (t) { topic = t.dataset.qt; start(); return; }
    const l = e.target.closest('[data-ql]');
    if (l) { len = +l.dataset.ql; start(); return; }
    const o = e.target.closest('[data-opt]');
    if (o && picked === null) { answer(+o.dataset.opt); return; }
    if (e.target.closest('[data-next]')) { next(); return; }
    if (e.target.closest('[data-retry]')) { start(round.filter((_, i) => !results[i]).map(r => r.q)); return; }
    if (e.target.closest('[data-again]')) start();
  }

  function paint() {
    const root = document.getElementById('quizModal');
    root.querySelectorAll('[data-qf]').forEach(b => b.classList.toggle('on', b.dataset.qf === field));
    root.querySelectorAll('[data-ql]').forEach(b => b.classList.toggle('on', +b.dataset.ql === len));
    document.getElementById('qzTopics').innerHTML = topicsHTML();
    document.getElementById('qzDots').innerHTML = round.map((_, i) =>
      `<i class="${i in results ? (results[i] ? 'r' : 'w') : ''} ${i === at ? 'cur' : ''}"></i>`).join('');
    document.getElementById('qzBody').innerHTML = at < round.length ? questionHTML() : resultHTML();
  }

  // field: 'anat' | 'path' | 'clin' | 'mix' — opening on a new field starts a fresh round
  function open(f) {
    if (!built) build();
    if (f && f !== field) { field = f; topic = 'all'; start(); }
    else if (!round.length) start();
    else paint();
    Info.show('quizModal');
  }
  function close() { Info.hide('quizModal'); }

  return { open, close };
})();
