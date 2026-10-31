// Shared SVG paint server: gradients, patterns and filters used by every diagram.
const DEFS = `
<defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2.4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="glowBig" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur stdDeviation="7" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="blur2"><feGaussianBlur stdDeviation="1.4"/></filter>
  <filter id="lift" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#000" flood-opacity=".5"/>
  </filter>

  <!-- tissue -->
  <radialGradient id="tissue" cx="42%" cy="30%" r="80%">
    <stop offset="0" stop-color="#f4dccf"/><stop offset=".55" stop-color="#d9ab9b"/><stop offset="1" stop-color="#9a6a62"/>
  </radialGradient>
  <radialGradient id="tissueDeep" cx="50%" cy="40%" r="75%">
    <stop offset="0" stop-color="#d9a999"/><stop offset="1" stop-color="#7f5450"/>
  </radialGradient>
  <linearGradient id="crus" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e9c5b6"/><stop offset="1" stop-color="#b98274"/>
  </linearGradient>
  <radialGradient id="cereb" cx="50%" cy="40%" r="70%">
    <stop offset="0" stop-color="#c79a8c" stop-opacity=".55"/><stop offset="1" stop-color="#5d3c3c" stop-opacity=".15"/>
  </radialGradient>
  <linearGradient id="cord" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d9ab9b"/><stop offset="1" stop-color="#d9ab9b" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="section" cx="50%" cy="45%" r="65%">
    <stop offset="0" stop-color="#f1d6c8"/><stop offset=".7" stop-color="#d7a796"/><stop offset="1" stop-color="#b07e72"/>
  </radialGradient>
  <radialGradient id="grey" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#b98d86" stop-opacity=".9"/><stop offset="1" stop-color="#b98d86" stop-opacity=".25"/>
  </radialGradient>

  <!-- nuclei -->
  <radialGradient id="nucGSE"><stop offset="0" stop-color="#fff0f4"/><stop offset=".45" stop-color="#ff5f87"/><stop offset="1" stop-color="#ff5f87" stop-opacity="0"/></radialGradient>
  <radialGradient id="nucGVE"><stop offset="0" stop-color="#fff6e6"/><stop offset=".45" stop-color="#ffb547"/><stop offset="1" stop-color="#ffb547" stop-opacity="0"/></radialGradient>
  <radialGradient id="nucSSA"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#f1ece2"/><stop offset="1" stop-color="#f1ece2" stop-opacity="0"/></radialGradient>
  <radialGradient id="nucGSA"><stop offset="0" stop-color="#eaf8ff"/><stop offset=".45" stop-color="#55c6ff"/><stop offset="1" stop-color="#55c6ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="nucSVA"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#ffe066"/><stop offset="1" stop-color="#ffe066" stop-opacity="0"/></radialGradient>
  <radialGradient id="nucGVA"><stop offset="0" stop-color="#e9fff3"/><stop offset=".45" stop-color="#5fe0a0"/><stop offset="1" stop-color="#5fe0a0" stop-opacity="0"/></radialGradient>
  <radialGradient id="gland" cx="40%" cy="35%" r="75%">
    <stop offset="0" stop-color="#c8f0b8"/><stop offset=".6" stop-color="#7cc472"/><stop offset="1" stop-color="#3f7a3c"/>
  </radialGradient>
  <pattern id="lobules" width="9" height="9" patternUnits="userSpaceOnUse">
    <circle cx="4.5" cy="4.5" r="3.6" fill="none" stroke="#1f3d1d" stroke-opacity=".35" stroke-width=".8"/>
  </pattern>
  <linearGradient id="faceSkin" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e9c2a8" stop-opacity=".16"/><stop offset="1" stop-color="#c99579" stop-opacity=".1"/>
  </linearGradient>
  <radialGradient id="faceFront" cx="45%" cy="38%" r="70%">
    <stop offset="0" stop-color="#f1cdb6"/><stop offset=".7" stop-color="#d9a98e"/><stop offset="1" stop-color="#a87862"/>
  </radialGradient>
  <pattern id="numb" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="6" height="6" fill="#ff4d4d" fill-opacity=".22"/><path d="M0 0v6" stroke="#ff4d4d" stroke-opacity=".7" stroke-width="1.6"/>
  </pattern>
  <radialGradient id="nucSVE"><stop offset="0" stop-color="#f6eeff"/><stop offset=".45" stop-color="#b78cff"/><stop offset="1" stop-color="#b78cff" stop-opacity="0"/></radialGradient>

  <!-- ganglion -->
  <radialGradient id="ganglion" cx="35%" cy="30%" r="75%">
    <stop offset="0" stop-color="#fff4cf"/><stop offset=".5" stop-color="#f0b84a"/><stop offset="1" stop-color="#8f5c12"/>
  </radialGradient>
  <radialGradient id="ganglionBlue" cx="35%" cy="30%" r="75%">
    <stop offset="0" stop-color="#e6f7ff"/><stop offset=".55" stop-color="#4fa6d6"/><stop offset="1" stop-color="#1d4f74"/>
  </radialGradient>

  <!-- muscle: belly → tendon. muscleRev for muscles that insert to the left -->
  <linearGradient id="muscle" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4a1a22"/><stop offset=".5" stop-color="#7e3333"/><stop offset=".84" stop-color="#94443f"/><stop offset=".96" stop-color="#d8c8b2"/>
  </linearGradient>
  <linearGradient id="muscleRev" x1="1" y1="0" x2="0" y2="0">
    <stop offset="0" stop-color="#4a1a22"/><stop offset=".5" stop-color="#7e3333"/><stop offset=".84" stop-color="#94443f"/><stop offset=".96" stop-color="#d8c8b2"/>
  </linearGradient>
  <linearGradient id="musclePlain" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#9a3338"/><stop offset="1" stop-color="#c9584f"/>
  </linearGradient>
  <pattern id="striA" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-17)"><path d="M0 1.2h5" stroke="#ffd2c8" stroke-opacity=".22" stroke-width=".8"/></pattern>
  <pattern id="striB" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(19)"><path d="M0 1.2h5" stroke="#ffd2c8" stroke-opacity=".22" stroke-width=".8"/></pattern>
  <pattern id="striC" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-2)"><path d="M0 1.2h5" stroke="#ffd2c8" stroke-opacity=".22" stroke-width=".8"/></pattern>
  <pattern id="striD" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-58)"><path d="M0 1.2h5" stroke="#ffd2c8" stroke-opacity=".22" stroke-width=".8"/></pattern>
  <pattern id="striE" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-26)"><path d="M0 1.2h5" stroke="#ffd2c8" stroke-opacity=".22" stroke-width=".8"/></pattern>
  <pattern id="striV" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><path d="M0 1h4" stroke="#ffd2c8" stroke-opacity=".25" stroke-width=".7"/></pattern>

  <!-- venous / bone / portal -->
  <radialGradient id="venous" cx="40%" cy="40%" r="75%">
    <stop offset="0" stop-color="#8f6fe0" stop-opacity=".42"/><stop offset="1" stop-color="#3c2a78" stop-opacity=".22"/>
  </radialGradient>
  <pattern id="lattice" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
    <path d="M0 8h16M8 0v16" stroke="#c7b4ff" stroke-opacity=".16" stroke-width=".9"/>
  </pattern>
  <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e2d6bb"/><stop offset="1" stop-color="#a99876"/>
  </linearGradient>
  <pattern id="boneDots" width="7" height="7" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r=".9" fill="#5a4a33" fill-opacity=".35"/><circle cx="5.5" cy="5" r=".6" fill="#5a4a33" fill-opacity=".25"/>
  </pattern>
  <radialGradient id="portal" cx="50%" cy="50%" r="60%">
    <stop offset="0" stop-color="#05040a"/><stop offset=".7" stop-color="#120d1e"/><stop offset="1" stop-color="#2b2238"/>
  </radialGradient>
  <linearGradient id="fat" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#f2d27a" stop-opacity=".02"/><stop offset="1" stop-color="#f2d27a" stop-opacity=".07"/>
  </linearGradient>

  <!-- eye -->
  <radialGradient id="sclera" cx="40%" cy="36%" r="72%">
    <stop offset="0" stop-color="#fbf8f1"/><stop offset=".72" stop-color="#e2d8c8"/><stop offset="1" stop-color="#ad9f8b"/>
  </radialGradient>
  <radialGradient id="scleraFront" cx="50%" cy="45%" r="60%">
    <stop offset="0" stop-color="#fffdf8"/><stop offset=".8" stop-color="#ebe3d6"/><stop offset="1" stop-color="#c9bba6"/>
  </radialGradient>
  <radialGradient id="iris" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#2b1d0e"/><stop offset=".35" stop-color="#7a5a2a"/><stop offset=".7" stop-color="#4f8a8e"/><stop offset=".95" stop-color="#1f3f48"/><stop offset="1" stop-color="#0d1a20"/>
  </radialGradient>
  <radialGradient id="cornea" cx="30%" cy="50%" r="70%">
    <stop offset="0" stop-color="#e8f6ff" stop-opacity=".55"/><stop offset="1" stop-color="#9ad0ff" stop-opacity=".15"/>
  </radialGradient>
  <linearGradient id="optic" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#efe9dc"/><stop offset=".5" stop-color="#d6cfbf"/><stop offset="1" stop-color="#a39b8a"/>
  </linearGradient>
  <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#c79c86"/><stop offset="1" stop-color="#e2b9a2"/>
  </linearGradient>
  <radialGradient id="pituitary" cx="45%" cy="40%" r="65%">
    <stop offset="0" stop-color="#f7c6cf"/><stop offset="1" stop-color="#b9707f"/>
  </radialGradient>
  <radialGradient id="lensG" cx="40%" cy="40%" r="70%">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".8"/><stop offset="1" stop-color="#bfe3ff" stop-opacity=".25"/>
  </radialGradient>
  <radialGradient id="softShadow" cx="50%" cy="50%" r="50%">
    <stop offset=".78" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="spot" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <marker id="arrowW" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0 1 L9 5 L0 9 z" fill="rgba(236,232,244,.75)"/>
  </marker>
  <marker id="arrowR" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0 1 L9 5 L0 9 z" fill="#ff5f87"/>
  </marker>
</defs>`;
