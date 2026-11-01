// ─────────────────────────────────────────────────────────────
//  Main stage: brainstem (left) → skull base (middle) → target (right)
//  viewBox 0 0 1600 800. Brainstem midline at x = 270.
//  The right two zones depend on the region: 'orbit' (III IV VI) or 'face' (V VII).
// ─────────────────────────────────────────────────────────────

// Each nerve is a list of segments, in pathway order.
// f = fibre type · intra = inside brainstem · post = postganglionic · deep = far side / buried
const STAGE_NERVES = {
  // sensory paths start at the brain end so the (reversed) sparks travel toward the brain
  I: [
    ...[900, 920, 940, 960, 980].map(x => ({ f: 'SVA', tip: 'I-fila', d: `M${x},416 L${x - 2},446` })),
    { f: 'SVA', tip: 'I-tract', d: 'M740,406 C790,404 850,404 890,404' },
    { f: 'SVA', tip: 'I-lat', d: 'M456,500 C480,494 510,486 540,472 C552,462 566,454 590,450 C640,440 700,420 740,406' },
    { f: 'SVA', tip: 'I-med', d: 'M694,320 C712,340 730,380 740,404' },
    { f: 'SVA', tip: 'I-contra', deep: 1, d: 'M590,360 C604,346 620,336 638,330 C652,326 674,322 694,320' },
    { f: 'SVA', intra: 1, tip: 'I-md', d: 'M486,306 C510,340 540,400 560,450' },
    { f: 'SVA', intra: 1, tip: 'I-md', d: 'M820,388 C700,330 560,280 486,300' },
    { f: 'SVA', intra: 1, deep: 1, tip: 'I-ofc', d: 'M820,394 C740,402 640,422 566,446' },
    { f: 'SVA', intra: 1, tip: 'I-hyp', d: 'M566,382 C558,400 548,430 534,468' },
    { f: 'SVA', intra: 1, tip: 'I-hip', d: 'M420,460 C430,468 440,480 452,498' }
  ],
  // vision: paths run eye → brain; hfR / hfL colour the right / left visual field
  II: [
    { f: 'SSA', cls: 'vis hfR', tip: 'II-tR', d: 'M1258,226 C1200,250 1140,290 1110,302 C1060,322 1000,370 966,394 C940,380 860,340 800,326 C720,312 660,302 626,300' },
    { f: 'SSA', cls: 'vis hfL', tip: 'II-tL', d: 'M1258,236 C1200,262 1140,300 1112,310 C1062,330 1004,376 970,398 C940,420 860,462 800,476 C720,490 660,498 626,500' },
    { f: 'SSA', cls: 'vis hfR', tip: 'II-tR', d: 'M1258,564 C1200,538 1140,500 1112,490 C1062,470 1004,424 970,402 C940,380 860,338 800,324 C720,310 660,302 626,300' },
    { f: 'SSA', cls: 'vis hfL', tip: 'II-tL', d: 'M1258,574 C1200,550 1140,510 1110,498 C1060,478 1000,430 966,406 C940,420 860,460 800,474 C720,488 660,498 626,500' },
    { f: 'SSA', cls: 'vis hfR', tip: 'II-mey', d: 'M620,296 C640,220 700,150 640,120 C560,90 420,130 300,200 C240,240 190,300 170,320' },
    { f: 'SSA', cls: 'vis hfR', tip: 'II-par', d: 'M616,304 C520,310 380,320 260,326 C220,328 190,330 170,334' },
    { f: 'SSA', cls: 'vis hfL', tip: 'II-mey', d: 'M620,504 C640,580 700,650 640,680 C560,710 420,670 300,600 C240,560 190,500 170,480' },
    { f: 'SSA', cls: 'vis hfL', tip: 'II-par', d: 'M616,496 C520,490 380,480 260,474 C220,472 190,470 170,466' },
    { f: 'SSA', cls: 'vis hfR', deep: 1, tip: 'II-pre', d: 'M700,312 C650,330 600,360 570,382' },
    { f: 'SSA', cls: 'vis hfL', deep: 1, tip: 'II-pre', d: 'M700,488 C650,470 600,440 570,418' },
    { f: 'SSA', cls: 'vis', deep: 1, tip: 'II-scn', d: 'M962,396 C952,390 940,390 932,396' }
  ],
  III: [
    { f: 'GSE', intra: 1, tip: 'III-fasc', d: 'M278,176 C282,200 288,226 292,252' },
    { f: 'GVE', intra: 1, tip: 'III-gve', d: 'M272,160 C278,190 284,222 289,247' },
    { f: 'GSE', tip: 'III', d: 'M292,252 C305,250 330,244 360,240 C400,234 450,220 500,216 C560,214 600,218 640,224 C700,232 780,236 860,244 C880,246 892,252 902,260' },
    { f: 'GVE', tip: 'III-gve', d: 'M289,247 C302,245 327,239 357,235 C397,229 447,215 497,211 C559,209 599,213 639,219 C699,227 779,231 859,239 C883,241 897,249 908,256 C936,296 986,416 1046,447 C1076,461 1106,465 1136,469 C1148,474 1157,481 1165,487 C1175,465 1188,440 1200,424' },
    { f: 'GSE', tip: 'III-sup', d: 'M902,260 C940,290 990,370 1040,392 C1080,396 1110,392 1140,386' },
    { f: 'GSE', tip: 'III-sup-SR', d: 'M1140,386 C1158,380 1174,372 1188,364' },
    { f: 'GSE', tip: 'III-sup-LPS', d: 'M1140,386 C1160,370 1180,352 1200,339' },
    { f: 'GSE', tip: 'III-inf', d: 'M902,260 C930,300 980,420 1040,452 C1070,466 1100,470 1130,474' },
    { f: 'GSE', tip: 'III-inf-MR', deep: 1, d: 'M1130,474 C1160,466 1190,458 1222,452' },
    { f: 'GSE', tip: 'III-inf-IR', d: 'M1130,474 C1160,480 1190,488 1222,496' },
    { f: 'GSE', tip: 'III-inf-IO', d: 'M1130,474 C1210,500 1300,535 1386,554' },
    { f: 'GVE', post: 1, tip: 'short-ciliary', d: 'M1210,410 C1240,398 1280,396 1314,401' },
    { f: 'GVE', post: 1, tip: 'short-ciliary', d: 'M1212,414 C1246,412 1282,414 1311,419' },
    { f: 'GVE', post: 1, tip: 'short-ciliary', d: 'M1212,420 C1246,432 1282,442 1311,445' },
    { f: 'GVE', post: 1, tip: 'short-ciliary', d: 'M1208,424 C1240,446 1278,456 1314,459' },
    { f: 'GVE', post: 1, deep: 1, tip: 'in-globe', d: 'M1314,408 C1380,392 1460,398 1506,416' }
  ],
  IV: [
    { f: 'GSE', intra: 1, tip: 'IV-fasc', d: 'M263,224 C246,212 248,190 270,188 C300,186 350,210 390,244' },
    { f: 'GSE', tip: 'IV', d: 'M390,244 C400,250 420,252 450,250 C500,244 560,252 620,262 C660,268 690,272 720,274 C780,276 840,286 880,300 C930,318 985,338 1040,345 C1075,349 1110,346 1140,338 C1155,334 1165,328 1175,324' }
  ],
  VI: [
    { f: 'GSE', intra: 1, tip: 'VI-fasc', d: 'M278,420 C282,435 286,448 290,460' },
    { f: 'GSE', tip: 'VI', d: 'M290,460 C298,420 304,360 318,318 C332,282 380,300 450,312 C510,322 560,326 596,330 C620,334 640,340 660,346 C720,356 800,352 860,350 C920,350 975,410 1040,428 C1070,434 1100,436 1130,437 C1145,438 1155,438 1165,437' }
  ],
  V: [
    { f: 'GSA', intra: 1, tip: 'V-intra', d: 'M320,344 C350,342 372,340 392,338' },
    { f: 'SVE', intra: 1, tip: 'V-motor', d: 'M302,350 C340,350 370,348 392,346' },
    { f: 'GSA', tip: 'V-root', d: 'M392,338 C430,336 480,330 540,330 C580,330 606,330 630,330' },
    { f: 'SVE', tip: 'V-motor', d: 'M392,346 C440,350 500,356 560,362 C610,370 650,386 690,410 C710,425 730,440 750,452 C764,478 784,503 816,524' },
    { f: 'GSA', tip: 'V1', d: 'M668,312 C700,300 740,292 780,288 C840,282 900,268 950,258 C970,255 985,254 1000,254 C1100,252 1250,262 1360,276' },
    { f: 'GSA', tip: 'supraorb', d: 'M1360,276 C1400,276 1436,272 1446,258 C1452,236 1452,206 1446,170 C1442,140 1436,120 1428,104' },
    { f: 'GSA', tip: 'lacrimalN', d: 'M1300,268 C1340,266 1380,270 1412,276' },
    { f: 'GSA', tip: 'extnasal', d: 'M1360,276 C1420,292 1490,304 1530,330' },
    { f: 'GSA', tip: 'V2', d: 'M672,330 C720,332 780,336 840,338 C860,339 872,340 888,340 C910,342 930,348 950,356 C1050,356 1200,352 1320,350 C1380,350 1430,356 1458,366' },
    { f: 'GSA', tip: 'infraorb', d: 'M1458,366 C1462,350 1462,338 1458,326' },
    { f: 'GSA', tip: 'infraorb', d: 'M1458,366 C1480,366 1500,372 1518,380' },
    { f: 'GSA', tip: 'infraorb', d: 'M1458,366 C1470,390 1490,410 1508,424' },
    { f: 'GSA', tip: 'zygN', d: 'M1004,354 C1100,338 1200,320 1300,310 C1330,306 1350,298 1362,288' },
    { f: 'GSA', tip: 'supAlv', d: 'M1200,353 C1280,378 1380,408 1462,422' },
    { f: 'GSA', tip: 'palatine', deep: 1, d: 'M950,356 C956,390 962,440 968,500' },
    { f: 'GSA', tip: 'V3', d: 'M662,350 C690,380 720,420 746,454 C760,480 780,505 812,526' },
    { f: 'SVE', tip: 'masseteric', d: 'M816,524 C900,500 1050,470 1180,460 C1230,456 1260,462 1280,470' },
    { f: 'SVE', tip: 'deepTemp', d: 'M816,524 C880,470 1000,400 1150,360 C1200,346 1230,330 1250,300' },
    { f: 'SVE', tip: 'pteryN', deep: 1, d: 'M816,524 C900,505 1050,465 1204,440' },
    { f: 'GSA', tip: 'auriculotemp', d: 'M812,526 C880,520 960,505 1040,470 C1100,440 1140,400 1150,350 C1155,300 1150,250 1146,210' },
    { f: 'GSA', tip: 'buccalN', d: 'M812,526 C950,520 1150,500 1300,480 C1360,472 1400,468 1430,466' },
    { f: 'GSA', tip: 'lingual', d: 'M812,526 C950,540 1150,540 1290,530 C1360,522 1420,490 1470,476' },
    { f: 'GSA', tip: 'IAN', d: 'M812,526 C950,560 1100,540 1188,500 C1250,540 1380,545 1468,525 C1488,520 1500,512 1510,500' },
    { f: 'SVE', tip: 'mylohyoidN', d: 'M1188,500 C1250,560 1380,575 1450,566' }
  ],
  VII: [
    { f: 'SVE', intra: 1, tip: 'VII-genu', d: 'M303,432 C296,416 282,404 274,410 C266,418 276,428 290,430 C316,436 338,448 355,458' },
    { f: 'GVE', intra: 1, tip: 'n-SSN', d: 'M292,447 C320,452 345,458 366,461' },
    { f: 'SVA', intra: 1, tip: 'taste-in', d: 'M289,480 C318,474 344,466 366,464' },
    { f: 'SVE', tip: 'VII', d: 'M355,458 C420,462 500,466 560,468 C580,469 592,470 602,470 C630,456 660,436 690,420' },
    { f: 'GVE', tip: 'NI', d: 'M366,462 C420,467 500,473 560,475 C580,476 592,477 604,476 C632,461 664,441 694,425' },
    { f: 'SVA', tip: 'NI', d: 'M366,466 C420,471 500,477 560,479 C580,480 594,481 606,480 C634,465 666,445 696,429' },
    { f: 'GVE', tip: 'GSPN', d: 'M698,414 C712,404 722,398 740,392 C790,382 840,392 870,414 C900,436 930,414 958,402' },
    { f: 'GVE', post: 1, tip: 'post-lacrimal', d: 'M964,396 C980,378 992,362 1006,352 C1100,336 1200,318 1300,306 C1340,298 1380,286 1414,278' },
    { f: 'GVE', post: 1, tip: 'post-nasal', d: 'M966,408 C1050,420 1250,410 1400,390 C1440,384 1466,382 1486,382' },
    { f: 'SVE', tip: 'VII-canal', d: 'M690,420 C700,416 708,420 710,428 C740,450 820,476 900,488 C970,496 1020,492 1050,482 C1066,492 1080,515 1090,546' },
    { f: 'SVA', tip: 'chorda', d: 'M696,429 C712,436 742,457 822,481 C902,493 972,501 1024,497 C1054,491 1070,503 1080,520 C1083,524 1085,526 1086,528' },
    { f: 'GVE', tip: 'chorda', d: 'M694,425 C710,432 738,452 818,477 C898,489 968,497 1018,493 C1046,487 1062,497 1074,515 C1078,522 1080,526 1082,530' },
    { f: 'SVE', tip: 'stapN', d: 'M1050,482 C1048,476 1046,472 1045,468' },
    { f: 'SVA', tip: 'chorda', d: 'M1086,528 C1074,510 1064,494 1056,484 C1050,476 1060,470 1072,474 C1095,480 1110,484 1122,488 C1160,505 1230,524 1290,528 C1360,520 1420,488 1468,472' },
    { f: 'GVE', tip: 'chorda', d: 'M1082,530 C1070,512 1060,496 1052,486 C1046,478 1058,466 1072,470 C1095,476 1112,480 1124,484 C1162,502 1232,520 1296,526 C1320,530 1338,534 1350,538' },
    { f: 'GVE', post: 1, tip: 'post-smg', d: 'M1352,546 C1350,562 1342,576 1334,588' },
    { f: 'GVE', post: 1, tip: 'post-sl', d: 'M1358,538 C1392,526 1420,510 1442,498' },
    { f: 'SVE', tip: 'VII-ext', d: 'M1090,546 C1120,540 1150,526 1172,508' },
    { f: 'SVE', tip: 'temporalBr', d: 'M1172,508 C1220,440 1280,330 1380,232' },
    { f: 'SVE', tip: 'zygBr', d: 'M1172,508 C1250,450 1340,360 1408,318' },
    { f: 'SVE', tip: 'buccalBr', d: 'M1172,508 C1260,480 1380,450 1480,444' },
    { f: 'SVE', tip: 'mandBr', d: 'M1172,508 C1260,540 1400,540 1500,505' },
    { f: 'SVE', tip: 'cervBr', d: 'M1172,508 C1200,560 1240,620 1290,670' },
    { f: 'SVE', tip: 'postAurBr', d: 'M1090,546 C1076,500 1068,440 1062,384' },
    { f: 'SVE', tip: 'digBr', d: 'M1092,550 C1116,562 1138,572 1160,580' }
  ],
  // hearing & balance: paths run ear → brain; coch / vest colour the two divisions
  VIII: [
    ...[-0.4, 1.1, 2.6, 4.1].map(a => ({ f: 'SSA', cls: 'coch', tip: 'cochDend',
      d: `M${(1110 + 40 * Math.cos(a)).toFixed(1)},${(570 + 40 * Math.sin(a)).toFixed(1)} L${(1110 + 16 * Math.cos(a)).toFixed(1)},${(570 + 16 * Math.sin(a)).toFixed(1)}` })),
    { f: 'SSA', cls: 'coch', tip: 'VIII-c', d: 'M1110,570 C1070,546 1030,526 980,514 C920,502 860,500 790,498 C720,496 660,494 604,490 C520,484 440,474 368,468' },
    { f: 'SSA', cls: 'vest', tip: 'vAmpA', d: 'M1208,422 C1196,436 1184,446 1172,452' },
    { f: 'SSA', cls: 'vest', tip: 'vUtr', d: 'M1244,446 C1216,449 1192,451 1172,452' },
    { f: 'SSA', cls: 'vest', deep: 1, tip: 'vAmpL', d: 'M1284,444 C1250,458 1206,458 1172,452' },
    { f: 'SSA', cls: 'vest', tip: 'VIII-vs', d: 'M1172,452 C1080,452 980,456 900,460 C850,462 806,464 762,466' },
    { f: 'SSA', cls: 'vest', tip: 'vSac', d: 'M1222,484 C1208,488 1194,490 1180,490' },
    { f: 'SSA', cls: 'vest', deep: 1, tip: 'vAmpP', d: 'M1298,482 C1262,498 1222,500 1180,490' },
    { f: 'SSA', cls: 'vest', tip: 'VIII-vi', d: 'M1180,490 C1100,488 1000,484 900,480 C850,478 806,477 762,476' },
    { f: 'SSA', cls: 'vest', tip: 'VIII-v', d: 'M726,470 C680,470 640,468 604,466 C520,464 440,462 368,460' },
    { f: 'SSA', cls: 'vest', tip: 'vcb', d: 'M368,460 C390,474 420,496 450,516' },
    { f: 'SSA', cls: 'coch', intra: 1, tip: 'VIII-cn', d: 'M368,468 C362,470 356,472 348,474' },
    { f: 'SSA', cls: 'vest', intra: 1, tip: 'VIII-vn', d: 'M368,460 C350,454 330,448 316,446' },
    { f: 'SSA', cls: 'coch', intra: 1, tip: 'trap', d: 'M350,468 C340,464 328,460 318,456' },
    { f: 'SSA', cls: 'coch', intra: 1, tip: 'trapX', d: 'M348,472 C320,476 290,472 270,470 C250,468 236,462 224,456' },
    { f: 'SSA', cls: 'coch', intra: 1, tip: 'll', d: 'M318,450 C350,410 368,340 354,280 C346,240 334,216 324,206' },
    { f: 'SSA', cls: 'coch', intra: 1, tip: 'll', d: 'M222,450 C190,410 172,340 186,280 C194,240 206,216 216,206' },
    { f: 'SSA', cls: 'coch', intra: 1, deep: 1, tip: 'mgn', d: 'M322,186 C318,150 312,112 306,80' },
    { f: 'SSA', cls: 'coch', intra: 1, deep: 1, tip: 'mgn', d: 'M218,186 C222,150 228,112 234,80' },
    { f: 'SSA', cls: 'vest', intra: 1, tip: 'vor', d: 'M302,458 C292,446 280,432 270,425 C266,422 264,420 262,418' },
    { f: 'GSE', intra: 1, tip: 'mlf', d: 'M262,418 C268,410 276,404 282,398 C284,340 284,260 280,186' },
    { f: 'SSA', cls: 'vest', intra: 1, tip: 'vsp', d: 'M314,448 C314,540 306,640 296,720 C294,750 294,775 294,792' }
  ],
  IX: [
    { f: 'SVE', intra: 1, tip: 'IX-intra', d: 'M304,494 C314,492 324,490 334,488' },
    { f: 'GVE', intra: 1, tip: 'n-ISN', d: 'M292,474 C306,478 322,483 334,486' },
    { f: 'GVA', intra: 1, tip: 'IX-intra', d: 'M289,492 C304,492 320,491 334,490' },
    { f: 'SVE', tip: 'IX', d: 'M334,486 C400,470 500,424 600,372 C680,334 740,300 768,288 C792,286 812,290 826,294' },
    { f: 'GVE', tip: 'IX', d: 'M334,481 C400,465 500,419 600,367 C680,329 740,295 768,283 C792,281 812,285 824,289' },
    { f: 'GVA', tip: 'IX', d: 'M334,491 C400,475 500,429 600,377 C680,339 740,305 768,293 C792,291 812,295 828,299' },
    { f: 'SVE', tip: 'styloN', d: 'M832,296 C950,298 1100,286 1250,288' },
    { f: 'GVE', tip: 'IX-tymp', d: 'M824,288 C800,262 762,232 714,208' },
    { f: 'GVE', tip: 'lesserPet', d: 'M712,204 C760,190 820,182 862,182 C872,186 882,192 888,196' },
    { f: 'GVE', post: 1, tip: 'post-parotid', d: 'M896,198 C980,210 1100,214 1200,224 C1214,226 1222,228 1228,232' },
    { f: 'GVA', tip: 'sinusN', d: 'M830,300 C950,322 1150,342 1300,366 C1308,368 1314,370 1318,372' },
    { f: 'GVA', tip: 'IX-phar', d: 'M830,300 C950,300 1150,292 1270,300' },
    { f: 'SVA', tip: 'IX-ling', d: 'M830,302 C950,312 1150,312 1250,302 C1280,296 1300,280 1316,262' }
  ],
  X: [
    { f: 'SVE', intra: 1, tip: 'X-intra', d: 'M306,520 C316,516 326,514 334,512' },
    { f: 'GVE', intra: 1, tip: 'n-DMN', d: 'M282,524 C300,520 318,516 334,514' },
    { f: 'GVA', intra: 1, tip: 'X-intra', d: 'M289,528 C306,524 320,520 334,518' },
    { f: 'SVE', tip: 'X', d: 'M334,512 C420,490 520,420 620,372 C700,336 750,322 772,320 C800,322 830,330 846,336' },
    { f: 'GVE', tip: 'X', d: 'M334,507 C420,485 520,415 620,367 C700,331 750,317 772,315 C800,317 830,325 846,331' },
    { f: 'GVA', tip: 'X', d: 'M334,517 C420,495 520,425 620,377 C700,341 750,327 772,325 C800,327 830,335 846,341' },
    { f: 'SVE', tip: 'X', d: 'M856,338 C930,358 1050,330 1180,302 C1260,286 1300,300 1312,330 C1316,400 1316,480 1314,560 C1312,580 1312,592 1312,600' },
    { f: 'GVE', tip: 'X-visc', d: 'M856,334 C930,354 1050,326 1180,298 C1262,282 1304,296 1317,326 C1321,400 1321,480 1319,560 C1316,620 1304,660 1302,700 C1300,720 1300,736 1302,750' },
    { f: 'GVE', tip: 'cardiacX', d: 'M1319,600 C1330,620 1340,636 1350,652' },
    { f: 'GVE', tip: 'pulmX', d: 'M1318,620 C1296,632 1270,644 1250,652' },
    { f: 'GVE', tip: 'gastricX', d: 'M1302,750 C1314,758 1330,764 1348,766' },
    { f: 'SVE', tip: 'X-phar', d: 'M1240,292 C1255,296 1265,298 1272,300 C1282,276 1292,252 1298,230' },
    { f: 'GVA', tip: 'supLar', d: 'M1190,304 C1250,312 1300,322 1342,336' },
    { f: 'SVE', tip: 'extLar', d: 'M1296,320 C1336,348 1366,374 1380,398' },
    { f: 'SVE', tip: 'RLN', d: 'M1312,590 C1308,620 1292,638 1282,626 C1274,600 1300,520 1330,440 C1338,420 1346,406 1352,392' },
    { f: 'SVE', tip: 'RLNr', deep: 1, d: 'M1316,540 C1340,560 1366,580 1372,566 C1376,540 1360,470 1356,410' },
    { f: 'GSA', tip: 'arnold', d: 'M772,314 C850,278 1000,240 1100,222 C1150,214 1172,212 1186,214' }
  ],
  XI: [
    { f: 'SVE', intra: 1, tip: 'XI-root', d: 'M300,712 C312,712 330,712 348,714' },
    { f: 'SVE', intra: 1, tip: 'XI-root', d: 'M300,742 C312,742 330,742 348,744' },
    { f: 'SVE', intra: 1, tip: 'XI-root', d: 'M300,772 C312,772 330,772 348,774' },
    { f: 'SVE', tip: 'XI', d: 'M348,790 C348,740 348,680 346,620 C344,590 352,560 372,540 C460,470 600,380 700,342 C740,328 760,326 776,326' },
    { f: 'SVE', tip: 'XI-scm', d: 'M776,326 C820,330 900,350 1000,332 C1100,314 1160,284 1200,280 C1218,282 1228,300 1236,320' },
    { f: 'SVE', tip: 'XI-trap', d: 'M1236,320 C1200,360 1160,400 1120,440' },
    { f: 'SVE', tip: 'XI-cranial', deep: 1, d: 'M306,560 C318,560 330,560 336,560 C380,556 420,540 460,520' }
  ],
  XII: [
    { f: 'GSE', intra: 1, tip: 'XII-intra', d: 'M276,520 C284,520 292,522 298,522' },
    { f: 'GSE', intra: 1, tip: 'XII-intra', d: 'M276,545 C284,545 292,545 298,545' },
    { f: 'GSE', intra: 1, tip: 'XII-intra', d: 'M276,570 C284,570 292,570 298,570' },
    { f: 'GSE', tip: 'XII-intra', d: 'M298,522 C320,532 340,542 360,548' },
    { f: 'GSE', tip: 'XII-intra', d: 'M298,570 C320,562 340,554 360,548' },
    { f: 'GSE', tip: 'XII', d: 'M298,545 C320,546 340,547 360,548 C460,520 600,420 700,392 C716,388 724,386 730,384 C780,380 900,420 1000,430 C1100,440 1180,400 1220,370 C1240,356 1260,350 1290,350 C1320,348 1336,340 1350,330 C1370,312 1390,290 1410,270' },
    { f: 'GSE', tip: 'ansa', deep: 1, d: 'M1262,352 C1300,400 1350,440 1388,470' }
  ]
};

// Passengers & neighbours (not part of the region's nerves, drawn for context)
const ORBIT_CONTEXT = [
  { f: 'GSA', tip: 'V1', d: 'M630,402 C670,352 735,334 800,330 C860,326 910,336 952,352' },
  { f: 'GSA', tip: 'frontal', d: 'M952,352 C985,342 1010,333 1040,330 C1120,320 1220,296 1320,272' },
  { f: 'GSA', tip: 'nasocil', d: 'M952,352 C985,372 1010,404 1040,410 C1080,410 1110,404 1140,398 C1200,388 1260,380 1310,374' },
  { f: 'GSA', tip: 'sens-root', d: 'M1140,398 C1165,403 1185,408 1198,411' },
  { f: 'GSA', tip: 'V23', d: 'M640,430 C700,442 760,452 820,458' },
  { f: 'GSA', tip: 'V23', d: 'M614,446 C613,472 611,500 609,528' },
  { f: 'SYM', tip: 'symp-root', d: 'M852,350 C900,386 980,450 1040,462 C1100,458 1160,440 1198,420' }
];
const FACE_CONTEXT = [
  { f: 'SSA', tip: 'VIII', d: 'M368,464 C430,478 520,484 604,484' },
  { f: 'SYM', tip: 'deepPet', d: 'M846,444 C854,432 862,420 870,414' }
];

const ICA_D = 'M600,522 C620,502 640,470 660,440 C690,400 730,392 790,388 C840,384 870,350 862,300 C856,262 820,250 800,232 C786,218 790,198 806,184 C815,170 820,150 818,126';
const ICA_FACE = 'M800,610 C820,570 840,520 850,480 C860,440 850,400 830,380 C810,360 820,330 840,310 C855,296 860,280 856,256';

// visible segment: the drawn line itself takes the mouse, so hovering is exact
function seg(s, extra = '') {
  const cls = ['seg', s.f, s.intra ? 'intra' : '', s.post ? 'post' : '', s.deep ? 'deep' : '', s.cls || '', extra].join(' ');
  return `<g class="${cls}" data-tip="${s.tip}">
    <path class="halo" d="${s.d}"/><path class="base" d="${s.d}"/><path class="flow" d="${s.d}"/>
  </g>`;
}
// its wider, invisible hover band lives in a layer under every line, so it only catches
// the mouse near a line — never on top of a neighbouring one
function segHit(s, nerve = '') {
  return `<path class="hit seg-hit ${s.f}" data-tip="${s.tip}" ${nerve ? `data-nerve="${nerve}"` : ''} d="${s.d}"/>`;
}

function artery(d, w, tip, extra = '') {
  return `<g class="artery ${extra}" data-tip="${tip}">
    <path d="${d}" class="a-base" stroke-width="${w}"/>
    <path d="${d}" class="a-hi" stroke-width="${Math.max(1, w * 0.32)}"/>
    <path d="${d}" class="hit" stroke-width="${w + 14}"/>
  </g>`;
}

function muscle(id, d, nerve, stri, grad = 'muscle', extra = '') {
  return `<g class="muscle m-${nerve} ${extra}" data-tip="${id}" data-m="${id}">
    <path d="${d}" class="m-body" fill="url(#${grad})" fill-rule="evenodd"/>
    <path d="${d}" class="m-stri" fill="url(#${stri})" fill-rule="evenodd"/>
  </g>`;
}

function gland(tip, d, nerve, extra = '') {
  return `<g class="gland g-${nerve} ${extra}" data-tip="${tip}"><path d="${d}" fill="url(#gland)"/><path d="${d}" fill="url(#lobules)"/></g>`;
}

// label with optional leader line: [x,y] text, [lx,ly] → [tx,ty]
function lbl(x, y, text, anchor = 'start', lead = null, cls = '') {
  const line = lead ? `<path class="lbl-line" d="M${lead[0]},${lead[1]} L${lead[2]},${lead[3]}"/>` : '';
  return `${line}<text class="lbl ${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${text}</text>`;
}

function mirror(inner) { return `<g transform="translate(540,0) scale(-1,1)">${inner}</g>`; }

function medal(id, x, y) {
  return `<g class="medal" data-select="${id}" transform="translate(${x},${y})"><circle r="14"/><text y="4.5">${id}</text></g>`;
}

// ── shared brainstem ───────────────────────────────────────────
function brainstem() {
  let stri = '';
  for (let y = 272; y < 452; y += 13) stri += `<path d="M110,${y} Q270,${y + 12} 430,${y}"/>`;
  let folia = '';
  for (let i = 0; i < 7; i++) folia += `<path d="M${60 + i * 6},${410 + i * 22} C110,${400 + i * 22} 150,${404 + i * 22} 180,${416 + i * 22}"/>`;

  const crusR = 'M286,128 C300,112 322,88 350,68 C362,60 380,58 392,66 C398,100 380,170 352,256 C335,262 310,264 294,260 C292,210 290,168 286,128 Z';
  const crusLines = '<path d="M360,74 C352,140 330,210 312,258"/><path d="M376,72 C368,140 348,210 330,258"/><path d="M344,82 C334,150 316,212 300,256"/>';
  const ponsD = 'M160,262 C200,246 340,246 380,262 C420,300 422,410 380,448 C330,468 210,468 160,448 C118,410 120,300 160,262 Z';
  const mcpR = 'M384,282 C410,286 440,292 466,302 L466,402 C440,410 410,420 384,430 Z';
  const medulla = 'M206,452 C230,464 310,464 334,452 C336,520 322,620 306,720 L234,720 C218,620 204,520 206,452 Z';
  const pyrR = 'M272,464 L284,464 C287,560 286,640 282,700 L272,700 Z';
  const both = (inner) => inner + mirror(inner);

  const svg = `
  <g class="brainstem">
    <g class="cereb" data-tip="cerebellum">
      <ellipse cx="118" cy="488" rx="96" ry="98" fill="url(#cereb)"/>
      <ellipse cx="422" cy="488" rx="96" ry="98" fill="url(#cereb)"/>
      <g class="folia">${folia}${mirror(folia)}</g>
    </g>
    <g data-tip="chiasm" class="chiasm">
      <path d="M215,16 C235,45 255,60 270,64 C285,60 305,45 325,16"/>
      <path d="M190,114 C220,90 250,72 270,66 C290,72 320,90 350,114"/>
    </g>
    <g data-tip="crus">${both(`<path class="tissue crus" d="${crusR}"/>`)}<g class="crus-lines">${both(crusLines)}</g></g>
    <path data-tip="ipf" class="ipf" d="M270,132 C280,132 287,140 288,160 L292,258 L248,258 L252,160 C253,140 260,132 270,132 Z"/>
    <g class="pps">${[150, 170, 190, 210, 230].map((y, i) => `<circle cx="${262 + (i % 2) * 14}" cy="${y}" r="1.4"/><circle cx="270" cy="${y + 9}" r="1.1"/>`).join('')}</g>
    <g data-tip="mamm"><circle class="tissue" cx="259" cy="120" r="9"/><circle class="tissue" cx="281" cy="120" r="9"/></g>
    <g data-tip="mcp">${both(`<path class="cut" d="${mcpR}"/>`)}</g>
    <g data-tip="pons">
      <path class="tissue" d="${ponsD}"/>
      <clipPath id="ponsClip"><path d="${ponsD}"/></clipPath>
      <g class="striae" clip-path="url(#ponsClip)">${stri}</g>
      <path class="sulcus" d="M270,258 L270,454"/>
    </g>
    <g data-tip="medulla">
      <path class="tissue" d="${medulla}"/>
      <path d="M236,720 L304,720 L300,792 L240,792 Z" fill="url(#cord)" opacity=".7"/>
      <path class="sulcus" d="M270,464 L270,720"/>
    </g>
    <g data-tip="pyramid">${both(`<path class="tissue pyr" d="${pyrR}"/>`)}
      <path class="decus" d="M262,690 L280,712 M278,690 L260,712 M266,684 L276,706 M274,684 L264,706"/></g>
    <g data-tip="olive"><ellipse class="tissue olive" cx="226" cy="545" rx="15" ry="40"/><ellipse class="tissue olive" cx="314" cy="545" rx="15" ry="40"/></g>

    ${artery('M300,744 C296,640 290,530 274,458', 6, 'vert')}
    ${artery('M240,744 C244,640 250,530 266,458', 6, 'vert')}
    ${artery('M270,458 L270,256', 8, 'basilar')}
    ${artery('M270,254 C298,238 338,232 378,220 C412,210 444,200 476,194', 6, 'pca')}
    ${artery('M270,254 C242,238 202,232 162,220 C128,210 96,200 64,194', 6, 'pca', 'dim')}
    ${artery('M270,272 C300,270 344,272 386,268 C420,264 448,266 478,270', 5, 'sca')}
    ${artery('M270,272 C240,270 196,272 154,268 C120,264 92,266 62,270', 5, 'sca', 'dim')}
    ${artery('M270,428 C300,434 340,438 384,436', 3.5, 'aica')}
    ${artery('M270,428 C240,434 200,438 156,436', 3.5, 'aica', 'dim')}
  </g>`;

  // nuclei breathe when active, so they live on the animated layer
  const nuclei = `
  <g class="nuclei">
    <g class="nuc n-III" data-tip="n-III" data-nerve="III"><ellipse cx="262" cy="175" rx="9" ry="11" fill="url(#nucGSE)"/><ellipse cx="278" cy="175" rx="9" ry="11" fill="url(#nucGSE)"/></g>
    <g class="nuc n-III" data-tip="n-EW" data-nerve="III"><circle cx="265" cy="158" r="6" fill="url(#nucGVE)"/><circle cx="275" cy="158" r="6" fill="url(#nucGVE)"/></g>
    <g class="nuc n-IV" data-tip="n-IV" data-nerve="IV"><circle cx="263" cy="224" r="7" fill="url(#nucGSE)"/><circle cx="277" cy="224" r="7" fill="url(#nucGSE)"/></g>
    <g class="nuc n-VI" data-tip="n-VI" data-nerve="VI"><circle cx="262" cy="418" r="9" fill="url(#nucGSE)"/><circle cx="278" cy="418" r="9" fill="url(#nucGSE)"/></g>
    <g class="nuc n-V" data-tip="n-mesV" data-nerve="V">${both('<rect x="300" y="150" width="7" height="176" rx="3.5" fill="url(#nucGSA)"/>')}</g>
    <g class="nuc n-V" data-tip="n-prinV" data-nerve="V">${both('<ellipse cx="318" cy="338" rx="9" ry="13" fill="url(#nucGSA)"/>')}</g>
    <g class="nuc n-V" data-tip="n-motV" data-nerve="V">${both('<ellipse cx="301" cy="348" rx="6" ry="8" fill="url(#nucSVE)"/>')}</g>
    <g class="nuc n-V" data-tip="n-spV" data-nerve="V IX X">${both('<rect x="318" y="352" width="8" height="400" rx="4" fill="url(#nucGSA)"/>')}</g>
    <g class="nuc n-VII" data-tip="n-VII" data-nerve="VII">${both('<circle cx="303" cy="432" r="7" fill="url(#nucSVE)"/>')}</g>
    <g class="nuc n-VII" data-tip="n-SSN" data-nerve="VII">${both('<circle cx="292" cy="447" r="4.5" fill="url(#nucGVE)"/>')}</g>
    <g class="nuc n-VII" data-tip="n-NTS" data-nerve="VII IX X">${both('<rect x="285" y="470" width="7" height="30" rx="3.5" fill="url(#nucSVA)"/><rect x="285" y="500" width="7" height="90" rx="3.5" fill="url(#nucGVA)" opacity=".6"/>')}</g>
    <g class="nuc" data-tip="n-amb" data-nerve="IX X">${both('<rect x="304" y="478" width="6" height="100" rx="3" fill="url(#nucSVE)"/>')}</g>
    <g class="nuc" data-tip="n-DMN" data-nerve="X">${both('<rect x="279" y="492" width="5" height="90" rx="2.5" fill="url(#nucGVE)"/>')}</g>
    <g class="nuc" data-tip="n-ISN" data-nerve="IX">${both('<circle cx="292" cy="474" r="4" fill="url(#nucGVE)"/>')}</g>
    <g class="nuc" data-tip="n-XII" data-nerve="XII">${both('<rect x="272" y="490" width="6" height="95" rx="3" fill="url(#nucGSE)"/>')}</g>
    <g class="nuc" data-tip="n-acc" data-nerve="XI">${both('<rect x="296" y="700" width="7" height="90" rx="3.5" fill="url(#nucSVE)"/>')}</g>
    <!-- vestibular: medial to spinal V, caudal pons → rostral medulla · superior, lateral (Deiters), medial, inferior -->
    <g class="nuc" data-tip="n-vest" data-nerve="VIII">${both('<ellipse cx="312" cy="410" rx="5" ry="9" fill="url(#nucSSA)"/><ellipse cx="314" cy="440" rx="5" ry="8" fill="url(#nucSSA)"/><ellipse cx="302" cy="468" rx="4" ry="20" fill="url(#nucSSA)"/><ellipse cx="313" cy="490" rx="4.5" ry="20" fill="url(#nucSSA)"/>')}</g>
    <!-- cochlear: ventral + dorsal, on the lateral surface of the ICP where the root enters -->
    <g class="nuc" data-tip="n-coch" data-nerve="VIII">${both('<ellipse cx="352" cy="466" rx="5" ry="8" fill="url(#nucSSA)"/><ellipse cx="342" cy="482" rx="5" ry="8" fill="url(#nucSSA)"/>')}</g>
    <g class="nuc" data-tip="n-soc" data-nerve="VIII">${both('<circle cx="318" cy="456" r="5" fill="url(#nucSSA)"/>')}</g>
    <g class="nuc" data-tip="n-ic" data-nerve="VIII">${both('<circle cx="322" cy="196" r="9" fill="url(#nucSSA)"/>')}</g>
    <g class="decx n-IV"><path d="M263,182 L277,194 M277,182 L263,194"/></g>
  </g>`;

  const labels = `
    ${lbl(70, 170, 'MIDBRAIN', 'start', [128, 166, 196, 150])}
    ${lbl(54, 352, 'PONS', 'start')}
    ${lbl(70, 610, 'MEDULLA', 'start', [130, 606, 212, 590])}
    ${lbl(486, 190, 'PCA')}${lbl(486, 286, 'SCA')}
    ${lbl(248, 330, 'BASILAR', 'end', [252, 326, 266, 326])}
    ${lbl(392, 448, 'AICA')}`;
  return { svg, nuclei, labels };
}

// ── orbit region: cavernous sinus → SOF → orbit ─────────────────
function orbitScene() {
  const sinus = 'M640,252 C640,214 700,198 780,198 C860,198 920,212 940,250 C960,300 955,410 915,446 C860,486 700,486 655,456 C622,430 630,300 640,252 Z';
  const sof = 'M1032,300 C1048,292 1056,312 1054,346 C1052,392 1062,448 1058,492 C1055,512 1032,512 1029,492 C1025,448 1034,392 1030,346 C1028,320 1024,306 1032,300 Z';
  return {
    titles: `<text x="600" y="44">SKULL BASE</text><text x="600" y="62" class="zt-sub">lateral projection · front is right</text>
             <text x="1060" y="44">ORBIT</text><text x="1060" y="62" class="zt-sub">right orbit · lateral view</text>`,
    back: `
  <g class="skullbase">
    <g data-tip="tent" class="tent">
      <path class="veil" d="M440,206 C520,236 590,248 640,254"/>
      <path class="edge" d="M440,206 C520,236 590,248 640,254"/>
    </g>
    <g data-tip="petrous"><path class="bone" d="M520,356 C560,342 592,338 616,346 L628,378 C596,386 556,390 520,394 Z"/>
      <path d="M520,356 C560,342 592,338 616,346 L628,378 C596,386 556,390 520,394 Z" fill="url(#boneDots)"/></g>
    <path class="lig" data-tip="gruber" d="M572,344 C584,318 612,316 628,340"/>
    <g data-tip="cs" class="sinus"><path d="${sinus}" class="venous"/><path d="${sinus}" fill="url(#lattice)"/></g>
    <g data-tip="symp-plexus" class="plexus ctx"><path d="${ICA_D}"/></g>
    ${artery(ICA_D, 13, 'ica', 'ica')}
    ${artery('M372,221 C430,206 520,196 640,194 C700,193 760,192 802,188', 4, 'pcomm', 'pcomm')}
    <g class="ctx"><path data-tip="tg" class="tg" d="M590,408 C600,394 632,392 646,404 C652,422 640,442 622,446 C604,448 590,436 590,420 Z"/></g>
    <circle data-tip="porus" class="porus" cx="646" cy="224" r="8"/>
    <circle data-tip="dorello" class="porus" cx="598" cy="331" r="8"/>
  </g>
  <g class="orbit">
    <path class="fat" d="M1062,350 C1200,280 1350,215 1500,200 L1590,200 L1590,664 L1500,664 C1350,640 1200,560 1062,500 Z"/>
    <g data-tip="bone" class="owall">
      <path d="M1062,350 C1200,280 1350,215 1500,200"/><path d="M1062,500 C1200,560 1350,620 1500,640"/>
      <path class="rim" d="M1494,186 C1512,190 1520,206 1512,222"/><path class="rim" d="M1496,652 C1514,648 1522,632 1514,616"/>
    </g>
    ${muscle('MR', 'M1062,436 C1180,446 1300,452 1380,452 L1380,468 C1300,470 1180,464 1062,452 Z', 'III', 'striC', 'muscle', 'deep')}
    <path data-tip="optic-n" class="optic" d="M1060,428 C1130,420 1200,440 1312,432"/>
    <ellipse class="globe-shadow" cx="1424" cy="446" rx="128" ry="122"/>
    <g data-tip="globe" class="globe">
      <circle cx="1420" cy="430" r="110" fill="url(#sclera)"/>
      <ellipse cx="1494" cy="431" rx="12" ry="30" fill="url(#lensG)"/>
      <ellipse cx="1512" cy="431" rx="5" ry="40" class="iris-edge"/>
      <path d="M1521,384 C1552,398 1558,462 1521,478 Z" fill="url(#cornea)" stroke="rgba(200,235,255,.4)"/>
    </g>
    ${muscle('IR', 'M1062,452 C1175,470 1290,515 1402,532 L1398,548 C1290,540 1170,492 1062,472 Z', 'III', 'striB')}
    ${muscle('SR', 'M1062,384 C1170,352 1290,318 1398,316 L1405,334 C1300,338 1175,374 1062,402 Z', 'III', 'striA')}
    ${muscle('SO', 'M1062,356 C1160,318 1300,280 1430,262 L1434,274 C1300,294 1165,334 1062,368 Z', 'IV', 'striE')}
    <g class="muscle m-IV tendon" data-tip="SO" data-m="SO">
      <path d="M1432,268 L1456,264" class="tend"/>
      <path d="M1456,264 C1440,290 1405,312 1372,334" class="tend reflected"/>
    </g>
    <g data-tip="trochlea" class="trochlea"><path class="lig" d="M1458,252 L1466,212"/><ellipse cx="1457" cy="264" rx="7" ry="10"/></g>
    ${muscle('LPS', 'M1062,372 C1180,334 1320,290 1460,286 C1490,286 1515,300 1532,322 L1522,332 C1500,312 1480,306 1455,306 C1320,310 1185,352 1062,384 Z', 'III', 'striA')}
    ${muscle('IO', 'M1494,596 C1450,606 1395,585 1352,505 L1366,498 C1405,568 1455,590 1494,584 Z', 'III', 'striD', 'muscleRev')}
    <g data-tip="lid" class="lids"><path d="M1500,318 C1544,336 1566,380 1560,412"/><path d="M1560,452 C1566,486 1546,522 1500,542"/></g>
  </g>
  <g data-tip="sof" class="portal-g"><path class="portal" d="${sof}"/></g>
  <circle data-tip="optic-canal" class="ocanal" cx="1052" cy="428" r="11"/>`,
    ctx: ORBIT_CONTEXT,
    front: `
  ${muscle('LR', 'M1062,416 C1180,410 1300,410 1440,418 L1440,452 C1300,460 1180,456 1062,446 Z', 'VI', 'striC', 'muscle', 'glass')}
  <g data-tip="annulus" class="annulus"><ellipse cx="1044" cy="426" rx="25" ry="58"/></g>
  <g data-tip="cg" class="ganglion-g g-III"><path class="ganglion" d="M1204,402 C1214,404 1218,412 1216,418 C1214,426 1206,430 1198,428 C1190,424 1190,412 1196,406 C1198,403 1201,402 1204,402 Z"/></g>`,
    medals: medal('III', 452, 214) + medal('IV', 540, 262) + medal('VI', 470, 330),
    labels: `
    ${lbl(704, 186, 'PCOMM')}
    ${lbl(458, 112, 'TENTORIUM')}
    ${lbl(880, 280, 'ICA', 'start')}
    ${lbl(790, 476, 'CAVERNOUS SINUS', 'middle')}
    ${lbl(530, 412, 'PETROUS APEX')}
    ${lbl(570, 304, "DORELLO'S", 'middle')}
    ${lbl(612, 464, 'V GANGLION', 'end', [590, 456, 600, 444])}
    ${lbl(1043, 530, 'SOF', 'middle')}
    ${lbl(1078, 506, 'ANNULUS', 'start', [1076, 500, 1060, 476])}
    ${lbl(1232, 392, 'CILIARY G.', 'start', [1230, 394, 1214, 404])}
    ${lbl(1250, 470, 'OPTIC N.', 'start', [1258, 462, 1262, 440])}
    ${lbl(1300, 262, 'SO', 'middle')}${lbl(1340, 296, 'LPS', 'middle')}${lbl(1262, 334, 'SR', 'middle')}
    ${lbl(1270, 506, 'IR', 'middle')}${lbl(1452, 618, 'IO', 'middle')}${lbl(1360, 444, 'LR', 'middle')}
    ${lbl(1350, 476, 'MR', 'middle', null, 'faint')}
    ${lbl(1478, 238, 'TROCHLEA', 'start')}`
  };
}

// ── face region: Meckel's cave · petrous · facial canal → face ──
function faceScene() {
  const head = 'M1060,118 C1150,68 1330,58 1420,108 C1468,138 1486,196 1484,244 C1482,256 1478,262 1478,270 C1500,300 1532,330 1552,352 C1556,362 1544,378 1522,382 C1514,384 1510,390 1512,396 C1520,404 1526,416 1524,426 C1520,434 1512,438 1512,442 C1518,446 1524,452 1522,460 C1518,470 1506,474 1506,480 C1514,494 1522,508 1520,522 C1516,540 1506,552 1494,556 C1470,566 1440,574 1416,578 C1396,584 1384,600 1380,620 L1372,740 L1090,740 C1076,660 1060,600 1040,560 C1010,500 990,400 1000,300 C1008,220 1030,150 1060,118 Z';
  const d1 = 'M1100,110 C1220,62 1380,70 1450,130 C1480,170 1488,220 1480,262 C1505,300 1534,330 1552,352 L1536,358 C1505,330 1470,312 1440,314 C1404,312 1380,296 1362,278 C1290,262 1210,238 1140,204 C1110,180 1096,140 1100,110 Z';
  const d2 = 'M1140,204 C1210,238 1290,262 1362,278 C1380,296 1404,312 1440,314 C1470,312 1505,330 1536,358 C1548,368 1540,378 1522,382 C1512,386 1510,392 1512,396 C1520,404 1526,416 1524,428 L1510,440 C1450,428 1390,414 1330,396 C1280,382 1230,350 1200,300 C1180,268 1160,236 1140,204 Z';
  const d3 = 'M1140,204 C1160,236 1180,268 1200,300 C1230,350 1280,382 1330,396 C1390,414 1450,428 1510,440 C1520,448 1524,454 1522,462 C1516,472 1506,476 1506,482 C1516,496 1522,510 1520,524 C1516,542 1506,552 1494,556 C1440,566 1340,566 1250,556 C1220,500 1196,440 1170,390 C1156,330 1146,260 1140,204 Z';
  const canal = 'M602,472 C630,456 660,436 690,420 C700,416 708,420 710,428 C740,450 820,476 900,488 C970,496 1020,492 1050,482 C1066,492 1080,515 1090,546';
  const sinus = 'M700,280 C760,262 880,262 930,280 C950,300 950,340 930,355 C880,368 760,368 700,352 C690,330 690,300 700,280 Z';
  const petrous = 'M560,560 C600,505 670,440 760,400 L800,418 C760,452 730,500 720,570 Z';
  const ring = (cx, cy, rx, ry, ix, iy) => `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${2 * rx},0 a${rx},${ry} 0 1,0 ${-2 * rx},0 Z M${cx - ix},${cy} a${ix},${iy} 0 1,0 ${2 * ix},0 a${ix},${iy} 0 1,0 ${-2 * ix},0 Z`;
  let teeth = '';
  for (let i = 0; i < 6; i++) teeth += `<rect x="${1438 + i * 11}" y="424" width="8" height="10" rx="2"/><rect x="${1438 + i * 11}" y="452" width="8" height="10" rx="2"/>`;
  let buds = '';
  for (let i = 0; i < 9; i++) buds += `<circle cx="${1428 + (i % 5) * 14}" cy="${464 + Math.floor(i / 5) * 9}" r="1.6"/>`;

  return {
    titles: `<text x="600" y="44">SKULL BASE</text><text x="600" y="62" class="zt-sub">middle fossa · petrous bone · schematic</text>
             <text x="1060" y="44">FACE</text><text x="1060" y="62" class="zt-sub">right side · lateral view</text>`,
    back: `
  <g class="skullbase">
    <g data-tip="petrous"><path class="bone" d="${petrous}"/><path d="${petrous}" fill="url(#boneDots)"/></g>
    <path class="canal" data-tip="canal" d="${canal}"/>
    <g data-tip="cs" class="sinus"><path d="${sinus}" class="venous"/><path d="${sinus}" fill="url(#lattice)"/></g>
    ${artery(ICA_FACE, 11, 'ica', 'ica dim')}
    <ellipse data-tip="cave" class="cave" cx="660" cy="330" rx="46" ry="40"/>
    <ellipse data-tip="ppf" class="ppf" cx="955" cy="385" rx="26" ry="42"/>
    <g data-tip="middleEar" class="mear"><ellipse cx="1052" cy="480" rx="15" ry="20"/><path d="M1066,466 L1068,496"/></g>
    <circle data-tip="iam" class="porus big" cx="602" cy="472" r="13"/>
    <circle data-tip="hiatus" class="porus" cx="722" cy="398" r="6"/>
    <circle data-tip="lacerum" class="porus" cx="870" cy="414" r="8"/>
    <circle data-tip="rotundum" class="porus" cx="888" cy="340" r="9"/>
    <ellipse data-tip="ovale" class="porus" cx="748" cy="456" rx="8" ry="12"/>
    <path data-tip="sof" class="portal" d="M994,230 C1004,226 1009,240 1008,254 C1007,268 1004,278 998,281 C992,277 990,266 991,254 C991,242 990,233 994,230 Z"/>
  </g>
  <g class="face">
    <path data-tip="headF" class="head" d="${head}"/>
    <g class="derm d-V" data-tip="derm-V1"><path class="dz z1" d="${d1}"/></g>
    <g class="derm d-V" data-tip="derm-V2"><path class="dz z2" d="${d2}"/></g>
    <g class="derm d-V" data-tip="derm-V3"><path class="dz z3" d="${d3}"/></g>
    <g data-tip="zygoma" class="fbone"><path d="M1150,408 C1220,400 1320,392 1392,376 C1410,370 1418,356 1414,342"/></g>
    <g data-tip="mandible" class="fbone"><path d="M1146,428 C1152,470 1156,520 1168,560 C1180,572 1220,576 1280,574 C1380,570 1450,560 1500,546"/><path d="M1210,470 C1226,440 1244,420 1256,410"/></g>
    ${muscle('latPter', 'M1196,442 a40,9 0 1,0 80,0 a40,9 0 1,0 -80,0 Z', 'V', 'striC', 'musclePlain', 'deep')}
    ${muscle('medPter', 'M1211,504 a11,38 0 1,0 22,0 a11,38 0 1,0 -22,0 Z', 'V', 'striV', 'musclePlain', 'deep')}
    ${muscle('buccinator', 'M1372,456 a48,18 0 1,0 96,0 a48,18 0 1,0 -96,0 Z', 'VII', 'striC', 'musclePlain', 'deep')}
    ${muscle('mylohyoid', 'M1300,560 C1380,566 1450,562 1490,552 L1480,566 C1440,574 1380,578 1310,574 Z', 'V', 'striC', 'musclePlain', 'deep')}
    ${muscle('temporalis', 'M1150,250 C1170,180 1290,150 1390,196 C1386,246 1330,330 1262,410 L1238,412 C1206,350 1168,300 1150,250 Z', 'V', 'striV', 'musclePlain')}
    ${muscle('masseter', 'M1192,410 L1336,396 C1330,452 1302,520 1276,568 L1190,566 C1180,520 1180,452 1192,410 Z', 'V', 'striV', 'musclePlain')}
    ${muscle('antDig', 'M1430,572 L1492,556 L1494,564 L1434,580 Z', 'V', 'striC', 'musclePlain')}
    ${gland('parotid', 'M1112,430 C1160,418 1215,428 1232,456 C1244,500 1232,556 1204,578 C1176,592 1146,574 1134,546 C1122,506 1106,462 1112,430 Z', 'IX', 'ctxg')}
    <path class="duct" data-tip="parotid" d="M1220,470 C1280,466 1340,462 1392,458"/>
    ${gland('submand', 'M1290,566 C1310,550 1360,552 1380,572 C1390,592 1360,606 1330,604 C1300,602 1282,586 1290,566 Z', 'VII')}
    ${gland('sublingual', 'M1424,496 a22,7 0 1,0 44,0 a22,7 0 1,0 -44,0 Z', 'VII', 'deepg')}
    ${gland('lacrimalG', 'M1404,276 C1410,266 1426,264 1432,272 C1436,282 1426,290 1414,288 C1406,286 1402,282 1404,276 Z', 'VII')}
    <g class="gland g-VII deepg" data-tip="nasalG">${[[1478, 376], [1488, 384], [1470, 386], [1482, 394], [1494, 376]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="url(#gland)"/>`).join('')}</g>
    <g data-tip="tongue" class="tongue"><path d="M1340,470 C1390,452 1460,450 1500,460 C1494,476 1450,486 1390,488 C1360,488 1340,482 1340,470 Z"/>
      <path class="ant" d="M1420,456 C1460,450 1490,454 1500,460 C1494,476 1460,484 1420,486 Z"/><g class="buds">${buds}</g></g>
    <g class="teeth">${teeth}</g>
    ${muscle('platysma', 'M1200,566 C1300,590 1390,594 1420,584 L1396,736 L1210,736 Z', 'VII', 'striD', 'musclePlain', 'sheet')}
    ${muscle('postDig', 'M1088,552 C1150,580 1240,600 1310,604 L1308,612 C1240,608 1150,590 1084,560 Z', 'VII', 'striC', 'musclePlain')}
    ${muscle('frontalis', 'M1330,118 C1392,104 1452,126 1478,176 C1484,210 1482,232 1478,244 C1440,238 1392,234 1342,238 C1338,200 1334,160 1330,118 Z', 'VII', 'striV', 'musclePlain')}
    ${muscle('orbOculi', ring(1440, 298, 44, 30, 22, 10), 'VII', 'striC', 'musclePlain')}
    ${muscle('zygMaj', 'M1376,366 L1388,358 C1432,386 1472,412 1504,432 L1498,442 C1464,422 1422,396 1376,366 Z', 'VII', 'striB', 'musclePlain')}
    ${muscle('orbOris', ring(1504, 442, 20, 30, 8, 4), 'VII', 'striC', 'musclePlain')}
    ${muscle('mentalis', 'M1490,506 a10,14 0 1,0 20,0 a10,14 0 1,0 -20,0 Z', 'VII', 'striV', 'musclePlain')}
    ${muscle('postAur', 'M1056,372 a6,14 0 1,0 12,0 a6,14 0 1,0 -12,0 Z', 'VII', 'striV', 'musclePlain')}
    ${muscle('stapedius', 'M1039,468 a5,3 0 1,0 10,0 a5,3 0 1,0 -10,0 Z', 'VII', 'striC', 'musclePlain')}
    <g data-tip="globe" class="feye"><path d="M1418,298 C1428,290 1446,290 1456,298 C1446,304 1428,304 1418,298 Z"/><ellipse cx="1449" cy="298" rx="3" ry="5"/></g>
    <g data-tip="ear" class="fear"><path d="M1095,330 C1120,320 1140,340 1138,370 C1136,400 1128,420 1118,440 C1110,455 1095,460 1086,450 C1078,440 1084,430 1090,425 C1080,400 1076,360 1095,330 Z"/>
      <path class="concha" d="M1100,380 C1110,375 1118,385 1114,400 C1110,410 1100,410 1098,400 Z"/></g>
    <circle data-tip="supraorb" class="porus sm" cx="1448" cy="252" r="4"/>
    <circle data-tip="infraorb" class="porus sm" cx="1458" cy="366" r="4"/>
    <circle data-tip="IAN" class="porus sm" cx="1470" cy="522" r="4"/>
    <circle data-tip="stylomastoid" class="porus" cx="1090" cy="546" r="7"/>
    <ellipse data-tip="ptfissure" class="porus sm" cx="1122" cy="488" rx="6" ry="3"/>
  </g>`,
    ctx: FACE_CONTEXT,
    front: `
  <g data-tip="tg" class="sg-g g-V"><path class="tg big" d="M628,312 C640,296 676,294 690,308 C698,326 690,352 668,358 C648,362 630,350 628,334 Z"/></g>
  <g data-tip="geniculate" class="sg-g g-VII"><path class="tg" d="M698,408 C706,408 710,414 708,420 C706,426 698,428 692,424 C688,420 690,410 698,408 Z"/></g>
  <g data-tip="ppg" class="ganglion-g g-VII"><path class="ganglion" d="M960,392 C968,394 972,402 970,408 C968,414 960,418 954,414 C948,410 948,400 952,396 C954,393 957,392 960,392 Z"/></g>
  <g data-tip="smg" class="ganglion-g g-VII"><path class="ganglion" d="M1352,532 C1359,533 1362,540 1360,545 C1358,550 1351,552 1346,549 C1342,546 1343,537 1347,534 C1349,532 1350,532 1352,532 Z"/></g>`,
    medals: medal('V', 520, 312) + medal('VII', 470, 444),
    labels: `
    ${lbl(660, 284, "MECKEL'S CAVE", 'middle')}
    ${lbl(820, 254, 'CAVERNOUS SINUS', 'middle', null, 'faint')}
    ${lbl(888, 322, 'ROTUNDUM', 'middle')}
    ${lbl(736, 486, 'OVALE', 'end')}
    ${lbl(1000, 222, 'SOF', 'middle')}
    ${lbl(596, 502, 'IAM', 'middle')}
    ${lbl(700, 446, 'GENICULATE', 'middle', null, 'faint')}
    ${lbl(780, 376, 'GSPN', 'middle', null, 'faint')}
    ${lbl(870, 438, 'LACERUM', 'middle', null, 'faint')}
    ${lbl(960, 440, 'PPG', 'middle')}
    ${lbl(1036, 512, 'MIDDLE EAR', 'end', null, 'faint')}
    ${lbl(1078, 572, 'STYLOMASTOID', 'end')}
    ${lbl(640, 552, 'PETROUS', 'middle', null, 'faint')}
    ${lbl(1250, 186, 'TEMPORALIS', 'middle')}
    ${lbl(1250, 540, 'MASSETER', 'middle')}
    ${lbl(1190, 600, 'PAROTID', 'middle', null, 'faint')}
    ${lbl(1404, 140, 'FRONTALIS', 'middle')}
    ${lbl(1386, 324, 'ORB. OCULI', 'end')}
    ${lbl(1430, 408, 'ZYGOMATICUS', 'end', null, 'faint')}
    ${lbl(1540, 486, 'ORB. ORIS', 'start', [1538, 482, 1520, 462])}
    ${lbl(1350, 626, 'SUBMANDIBULAR', 'middle')}
    ${lbl(1366, 560, 'SMG', 'start', null, 'faint')}
    ${lbl(1300, 700, 'PLATYSMA', 'middle', null, 'faint')}
    ${lbl(1400, 268, 'LACRIMAL G.', 'end', null, 'faint')}
    ${lbl(1380, 500, 'TONGUE', 'middle', null, 'faint')}
    ${lbl(1300, 160, 'V1', 'middle', null, 'dz-l')}${lbl(1430, 346, 'V2', 'middle', null, 'dz-l')}${lbl(1330, 520, 'V3', 'middle', null, 'dz-l')}`
  };
}

// ── neck region: jugular foramen · hypoglossal canal → head, neck & thorax ──
function neckScene() {
  const sil = 'M1120,70 C1200,40 1340,40 1420,80 C1460,104 1476,140 1474,170 C1476,180 1490,196 1506,214 C1510,222 1500,232 1484,236 C1478,240 1478,246 1482,252 C1486,260 1484,268 1478,272 C1482,280 1486,290 1484,300 C1480,314 1466,322 1450,324 C1430,330 1410,334 1398,344 C1392,360 1398,380 1400,396 C1398,420 1392,470 1390,520 L1420,560 C1440,620 1450,700 1454,790 L1050,790 C1046,700 1040,620 1030,560 L1080,520 C1100,470 1110,400 1112,330 C1100,250 1092,160 1120,70 Z';
  let verts = '';
  for (let i = 0; i < 14; i++) verts += `<rect x="1214" y="${170 + i * 40}" width="36" height="32" rx="5"/>`;
  let rings = '';
  for (let y = 420; y < 600; y += 14) rings += `<path d="M1342,${y} L1376,${y}"/>`;
  return {
    titles: `<text x="600" y="44">SKULL BASE</text><text x="600" y="62" class="zt-sub">posterior fossa exits · schematic</text>
             <text x="1060" y="44">NECK · CHEST</text><text x="1060" y="62" class="zt-sub">right side · midline cut-away</text>`,
    back: `
  <ellipse data-tip="fmag" class="fmring" cx="270" cy="720" rx="92" ry="14"/>
  <g class="skullbase">
    <g data-tip="petrous"><path class="bone faintbone" d="M580,240 C640,214 740,196 840,190 L860,214 C780,226 680,250 620,280 Z"/></g>
    <path data-tip="sigmoid" class="sigsin" d="M600,150 C640,180 690,222 722,246 C746,262 760,278 770,292"/>
    <path data-tip="ijv" class="sigsin thin" d="M782,340 C800,400 840,450 900,470"/>
    <g data-tip="tympanic" class="mear"><ellipse cx="706" cy="204" rx="14" ry="18"/></g>
    <g data-tip="jf"><ellipse class="portal" cx="774" cy="306" rx="22" ry="36"/></g>
    <path data-tip="jspine" class="jspine" d="M754,302 L796,296"/>
    <circle data-tip="hgc" class="portal" cx="730" cy="384" r="10"/>
    <ellipse data-tip="ovale" class="porus" cx="862" cy="182" rx="7" ry="10"/>
  </g>
  <g class="neck">
    <path data-tip="neckF" class="head" d="${sil}"/>
    <g data-tip="vertebrae" class="verts">${verts}</g>
    <path data-tip="lungs" class="lungs" d="M1196,610 C1210,566 1300,552 1420,578 C1452,640 1452,720 1436,780 L1206,780 C1192,720 1190,660 1196,610 Z"/>
    <path data-tip="ijv" class="ijv" d="M1296,160 C1298,260 1306,380 1314,560 C1316,580 1320,592 1330,600"/>
    ${artery('M1360,622 C1360,592 1340,572 1316,574 C1296,576 1288,594 1290,622 L1292,780', 9, 'aorta')}
    ${artery('M1352,590 C1370,566 1396,552 1430,548', 5, 'subclavian')}
    ${artery('M1352,590 C1342,530 1328,450 1322,380', 6, 'cca')}
    ${artery('M1322,380 C1312,330 1296,260 1288,160', 5, 'icaN')}
    ${artery('M1322,380 C1342,350 1352,310 1352,250', 4, 'ecaN')}
    <path data-tip="esophagus" class="visc" d="M1280,380 L1304,380 L1308,740 L1286,740 Z"/>
    <path data-tip="stomach" class="visc" d="M1286,740 C1290,770 1320,792 1362,788 C1404,782 1424,758 1412,738 L1308,740 Z"/>
    <g data-tip="trachea"><path class="visc pale" d="M1340,410 L1378,410 L1372,604 L1346,604 Z"/><g class="trings">${rings}</g></g>
    <path data-tip="heart" class="visc heart" d="M1322,622 C1342,598 1392,602 1408,632 C1422,662 1402,702 1372,722 C1352,712 1318,692 1312,662 C1308,644 1312,632 1322,622 Z"/>
    <g data-tip="larynx" class="cart"><path d="M1330,330 L1382,334 C1394,350 1396,376 1386,398 L1334,398 Z"/><path class="fold" d="M1336,368 L1382,366"/></g>
    <path data-tip="epiglottis" class="cartl" d="M1312,290 C1320,300 1324,316 1322,332"/>
    <ellipse data-tip="hyoid" class="hyoid" cx="1352" cy="322" rx="14" ry="5"/>
    <g data-tip="mandible" class="fbone"><path d="M1196,214 C1204,250 1214,282 1236,302 C1300,312 1400,314 1476,306"/></g>
    <path data-tip="styloid" class="styl" d="M1196,232 L1240,292"/>
    <path class="hpal" data-tip="softPal" d="M1302,206 L1444,204"/>
    ${muscle('constrictors', 'M1262,168 C1258,240 1258,310 1262,380 L1282,380 C1278,310 1278,240 1282,168 Z', 'X', 'striC', 'musclePlain')}
    ${muscle('softPal', 'M1302,204 C1290,216 1282,232 1284,248 L1294,248 C1294,232 1300,220 1312,210 Z', 'X', 'striV', 'musclePlain')}
    ${muscle('tongueM', 'M1300,240 C1320,222 1400,214 1460,226 C1476,232 1476,246 1462,252 C1420,262 1370,268 1340,286 C1324,300 1306,300 1298,284 C1290,270 1292,252 1300,240 Z', 'XII', 'striB', 'musclePlain')}
    <g class="derm d-IX" data-tip="post3"><path class="dz z3" d="M1300,240 C1306,236 1316,232 1326,230 L1338,284 C1324,298 1306,298 1298,284 C1290,270 1292,252 1300,240 Z"/></g>
    ${muscle('stylophar', 'M1238,288 L1246,284 C1262,300 1274,316 1282,330 L1274,334 C1264,318 1252,302 1238,288 Z', 'IX', 'striB', 'musclePlain')}
    ${muscle('cricothyroid', 'M1380,390 L1394,398 L1390,414 L1376,406 Z', 'X', 'striC', 'musclePlain')}
    ${muscle('intrinsicLar', 'M1340,380 a12,7 0 1,0 24,0 a12,7 0 1,0 -24,0 Z', 'X', 'striC', 'musclePlain')}
    ${muscle('infrahyoid', 'M1388,330 L1398,332 L1396,520 L1386,520 Z', 'C1', 'striV', 'musclePlain', 'sheet')}
    ${gland('parotid', 'M1196,196 C1220,188 1252,196 1262,216 C1270,244 1258,276 1236,286 C1216,292 1202,276 1198,256 C1192,236 1190,212 1196,196 Z', 'IX')}
    <ellipse data-tip="carSinus" class="receptor" cx="1318" cy="370" rx="5" ry="9"/>
    <circle data-tip="carBody" class="receptor body" cx="1330" cy="386" r="3.5"/>
    <g data-tip="ear" class="fear"><ellipse cx="1182" cy="200" rx="13" ry="24" class="auricle"/></g>
    ${muscle('trapezius', 'M1118,110 L1150,124 C1140,260 1130,400 1116,520 L1040,566 C1066,480 1092,340 1118,110 Z', 'XI', 'striV', 'musclePlain', 'sheet')}
    ${muscle('scm', 'M1166,232 L1188,226 C1250,320 1320,430 1384,520 L1364,530 C1300,446 1230,336 1166,232 Z', 'XI', 'striA', 'musclePlain', 'sheet')}
  </g>`,
    ctx: [],
    front: `
  <g data-tip="supG9" class="sg-g g-IX"><circle class="tg" cx="768" cy="286" r="5"/></g>
  <g data-tip="infG9" class="sg-g g-IX"><circle class="tg" cx="826" cy="296" r="7"/></g>
  <g data-tip="supG10" class="sg-g g-X"><circle class="tg" cx="772" cy="318" r="6"/></g>
  <g data-tip="nodose" class="sg-g g-X"><ellipse class="tg" cx="850" cy="336" rx="11" ry="7"/></g>
  <g data-tip="otic" class="ganglion-g g-IX"><circle class="ganglion" cx="890" cy="196" r="7"/></g>`,
    medals: medal('IX', 420, 420) + medal('X', 560, 428) + medal('XI', 384, 612) + medal('XII', 450, 566),
    labels: `
    ${lbl(270, 750, 'FORAMEN MAGNUM', 'middle', null, 'faint')}
    ${lbl(740, 168, 'MIDDLE EAR', 'end', null, 'faint')}
    ${lbl(800, 262, 'JUGULAR F.', 'start')}
    ${lbl(716, 404, 'HYPOGLOSSAL C.', 'end')}
    ${lbl(862, 164, 'OVALE', 'middle', null, 'faint')}
    ${lbl(906, 204, 'OTIC', 'start')}
    ${lbl(640, 160, 'SIGMOID', 'middle', null, 'faint')}
    ${lbl(866, 362, 'NODOSE', 'start', null, 'faint')}
    ${lbl(838, 284, 'PETROSAL', 'start', null, 'faint')}
    ${lbl(1230, 182, 'PAROTID', 'middle', null, 'faint')}
    ${lbl(1392, 248, 'TONGUE', 'middle')}
    ${lbl(1250, 152, 'PHARYNX', 'middle', null, 'faint')}
    ${lbl(1410, 372, 'LARYNX', 'start')}
    ${lbl(1360, 620, 'TRACHEA', 'middle', null, 'faint')}
    ${lbl(1274, 700, 'OESOPH.', 'end', null, 'faint')}
    ${lbl(1380, 680, 'HEART', 'middle', null, 'dark')}
    ${lbl(1250, 604, 'AORTIC ARCH', 'end', null, 'faint')}
    ${lbl(1430, 760, 'LUNG', 'end', null, 'faint')}
    ${lbl(1366, 776, 'STOMACH', 'middle', null, 'faint')}
    ${lbl(1280, 448, 'SCM', 'middle')}
    ${lbl(1080, 400, 'TRAPEZIUS', 'middle')}
    ${lbl(1336, 368, 'SINUS', 'start', null, 'faint')}
    ${lbl(1250, 330, 'STYLOPHAR.', 'end', null, 'faint')}`
  };
}

// ── smell region: one sagittal view — cortex (left) · bulb (middle) · nasal cavity (right)
// replaces the brainstem panel, since CN I never reaches the brainstem
function smellScene() {
  const brain = 'M110,400 C70,300 110,150 270,96 C420,46 660,46 790,100 C870,134 912,220 914,300 C916,350 902,384 884,396 C840,404 780,406 720,412 C660,418 610,430 572,450 C540,468 516,496 494,520 C466,548 420,556 380,546 C330,592 260,606 190,586 C130,566 116,480 110,400 Z';
  const ctx = (tip, shape) => `<g class="ctxr c-I" data-tip="${tip}">${shape}</g>`;
  return {
    noBrainstem: true,
    titles: `<text x="40" y="44">OLFACTORY CORTEX</text><text x="40" y="62" class="zt-sub">medial view · front is right</text>
             <text x="600" y="44">BULB · CRIBRIFORM</text><text x="600" y="62" class="zt-sub">first synapse sits on the skull base</text>
             <text x="1060" y="44">NASAL CAVITY</text><text x="1060" y="62" class="zt-sub">right lateral wall</text>`,
    back: `
  <g class="smellbrain">
    <ellipse data-tip="cerebellum" class="cereb-s" cx="250" cy="600" rx="100" ry="66"/>
    <path data-tip="brainstem" class="tissue bstub" d="M356,500 C366,580 372,680 376,790 L432,790 C430,680 428,580 424,500 Z"/>
    <path data-tip="brainMed" class="tissue brainm" d="${brain}"/>
    <path data-tip="cc" class="ccx" d="M380,240 C450,196 620,186 720,226 C752,240 754,266 730,274 C690,258 610,236 510,246 C460,252 420,272 404,282 Z"/>
    ${ctx('thalMD', '<ellipse cx="480" cy="300" rx="54" ry="30"/>')}
    ${ctx('hypothal', '<ellipse cx="566" cy="370" rx="26" ry="16"/>')}
    ${ctx('septal', '<ellipse cx="692" cy="316" rx="18" ry="14"/>')}
    ${ctx('antComm', '<circle cx="636" cy="330" r="7"/>')}
    ${ctx('ofc', '<path d="M740,404 C790,400 850,398 884,394 L880,382 C840,384 790,388 746,392 Z"/>')}
    ${ctx('piriform', '<ellipse cx="566" cy="452" rx="30" ry="15"/>')}
    ${ctx('amygdala', '<ellipse cx="530" cy="478" rx="24" ry="15"/>')}
    ${ctx('entorhinal', '<ellipse cx="452" cy="502" rx="34" ry="13"/>')}
    <path data-tip="hippocampus" class="hippo" d="M372,470 C400,442 450,440 492,458"/>
  </g>
  <g class="skullbase">
    <path data-tip="bone" class="sbone" d="M790,70 C890,100 950,180 968,290 C976,340 982,384 986,414"/>
    <ellipse data-tip="frontalSin" class="air" cx="950" cy="300" rx="16" ry="32"/>
    <path data-tip="orbPlate" class="sbone thin" d="M720,420 C780,416 840,414 880,414"/>
    <g data-tip="sphenoidSin"><path class="bone faintbone" d="M760,432 C800,428 840,432 860,442 L860,520 C830,530 790,526 760,512 Z"/><ellipse class="air" cx="810" cy="476" rx="28" ry="24"/></g>
  </g>
  <g class="nose">
    <path data-tip="headF" class="noseskin" d="M986,300 C990,350 1000,400 1010,420 C1150,470 1360,540 1528,606 C1540,614 1536,630 1520,636 C1500,640 1490,648 1496,660 C1500,676 1490,690 1470,694 C1462,710 1460,730 1462,760"/>
    <path class="cavity" d="M992,421 C1100,432 1260,472 1400,562 C1440,592 1462,622 1452,648 L1430,700 L850,716 L866,442 Z"/>
    <path data-tip="palate" class="sbone" d="M850,716 L1430,700"/>
    <path data-tip="conchaS" class="concha" d="M900,470 C960,452 1040,462 1080,490 C1040,502 960,498 900,490 Z"/>
    <path data-tip="conchaM" class="concha" d="M880,532 C980,502 1120,514 1200,562 C1120,582 980,578 880,562 Z"/>
    <path data-tip="conchaI" class="concha" d="M860,612 C1000,582 1220,592 1340,652 C1220,670 1000,666 860,642 Z"/>
    <ellipse class="nostril" cx="1490" cy="652" rx="12" ry="6"/>
    <path class="airflow" d="M1480,648 C1300,600 1150,520 1020,462"/>
    ${ctx('olfEpi', '<path class="epi" d="M882,424 L1000,426 C1040,434 1070,448 1092,474 L1082,492 C1040,466 980,452 900,450 Z"/>')}
    <path data-tip="cribriform" class="crib" d="M880,417 L992,419"/>
  </g>`,
    ctx: [
      { f: 'GSA', tip: 'nasalV', d: 'M960,360 C1000,400 1040,440 1100,470 C1160,500 1240,540 1320,600' },
      { f: 'GSA', tip: 'nasalV', d: 'M840,560 C900,590 1000,620 1120,660' }
    ],
    front: `
  <g class="nuc" data-tip="bulb" data-nerve="I"><ellipse cx="936" cy="404" rx="50" ry="12" fill="url(#nucSVA)"/></g>
  <ellipse data-tip="bulb" class="bulb-out" cx="936" cy="404" rx="48" ry="11"/>`,
    medals: medal('I', 860, 366),
    labels: `
    ${lbl(560, 220, 'CORPUS CALLOSUM', 'middle', null, 'faint')}
    ${lbl(480, 262, 'MD THALAMUS', 'middle')}
    ${lbl(596, 376, 'HYPOTHALAMUS', 'start', null, 'faint')}
    ${lbl(714, 304, 'SEPTAL', 'start')}
    ${lbl(624, 326, 'ANT. COMM.', 'end', null, 'faint')}
    ${lbl(600, 470, 'PIRIFORM · UNCUS', 'start')}
    ${lbl(504, 500, 'AMYGDALA', 'end')}
    ${lbl(452, 532, 'ENTORHINAL', 'middle')}
    ${lbl(366, 462, 'HIPPOCAMPUS', 'end', null, 'faint')}
    ${lbl(812, 376, 'ORBITOFRONTAL', 'end', null, 'faint')}
    ${lbl(250, 620, 'CEREBELLUM', 'middle', null, 'faint')}
    ${lbl(440, 720, 'BRAINSTEM', 'start', null, 'faint')}
    ${lbl(936, 388, 'OLFACTORY BULB', 'middle')}
    ${lbl(800, 398, 'TRACT', 'middle', null, 'faint')}
    ${lbl(660, 444, 'LATERAL STRIA', 'end', null, 'faint')}
    ${lbl(744, 356, 'MEDIAL STRIA', 'start', null, 'faint')}
    ${lbl(1004, 412, 'CRIBRIFORM PLATE', 'start')}
    ${lbl(950, 250, 'FRONTAL SINUS', 'middle', null, 'faint')}
    ${lbl(810, 546, 'SPHENOID SINUS', 'middle', null, 'faint')}
    ${lbl(1100, 460, 'OLFACTORY EPITHELIUM', 'start')}
    ${lbl(1040, 548, 'MIDDLE CONCHA', 'middle', null, 'faint')}
    ${lbl(1100, 630, 'INFERIOR CONCHA', 'middle', null, 'faint')}
    ${lbl(1140, 728, 'HARD PALATE', 'middle', null, 'faint')}
    ${lbl(1490, 678, 'NOSTRIL', 'middle', null, 'faint')}`
  };
}

// ── vision region: from above, front is right, patient's left is UP
function visionScene() {
  const brain = 'M70,400 C60,200 200,70 420,64 C640,58 860,90 960,190 C1000,240 1010,300 1000,330 L1000,470 C1010,500 1000,560 960,610 C860,710 640,742 420,736 C200,730 60,600 70,400 Z';
  // eye at (cx, cy) seen from above: lens toward the right; back half split into two retinal halves
  const eye = (cx, cy, upCol, dnCol, tip) => `
    <g data-tip="${tip}" class="veye">
      <circle cx="${cx}" cy="${cy}" r="86" class="vglobe"/>
      <ellipse cx="${cx + 66}" cy="${cy}" rx="10" ry="34" fill="url(#lensG)"/>
      <path d="M${cx + 82},${cy - 30} C${cx + 100},${cy - 14} ${cx + 100},${cy + 14} ${cx + 82},${cy + 30}" class="vcornea"/>
    </g>
    <g data-tip="${upCol === 'R' ? (cy < 400 ? 'retinaT' : 'retinaN') : (cy < 400 ? 'retinaN' : 'retinaT')}"><path class="ret hf${upCol}" d="M${cx},${cy - 86} A86,86 0 0,0 ${cx - 86},${cy}"/></g>
    <g data-tip="${dnCol === 'L' ? (cy < 400 ? 'retinaN' : 'retinaT') : 'retinaT'}"><path class="ret hf${dnCol}" d="M${cx - 86},${cy} A86,86 0 0,0 ${cx},${cy + 86}"/></g>
    <circle cx="${cx - 84}" cy="${cy + (cy < 400 ? 2 : -2)}" r="6" class="vdisc" data-tip="disc"/>`;
  return {
    noBrainstem: true,
    titles: `<text x="40" y="44">VISUAL CORTEX</text><text x="40" y="62" class="zt-sub">from above · front is right · patient’s left is up</text>
             <text x="600" y="44">CHIASM · TRACTS</text><text x="600" y="62" class="zt-sub">nasal fibres cross</text>
             <text x="1060" y="44">EYES</text><text x="1060" y="62" class="zt-sub">each sees both halves of the world</text>`,
    back: `
  <path data-tip="brainTop" class="tissue brainm" d="${brain}"/>
  <path data-tip="midlineV" class="vmid" d="M70,400 L940,400"/>
  <g class="ctxr c-II" data-tip="v1"><ellipse cx="130" cy="330" rx="62" ry="36"/><ellipse cx="130" cy="470" rx="62" ry="36"/></g>
  <path class="calc" d="M84,330 C110,322 150,322 186,332 M84,470 C110,478 150,478 186,468"/>
  <g class="ctxr c-II" data-tip="pretectV"><ellipse cx="566" cy="400" rx="38" ry="46"/></g>
  <g class="ctxr c-II" data-tip="scn"><circle cx="930" cy="400" r="9"/></g>
  <g data-tip="opticCanalV"><ellipse class="portal" cx="1110" cy="306" rx="10" ry="16"/><ellipse class="portal" cx="1110" cy="494" rx="10" ry="16"/></g>
  ${eye(1340, 230, 'R', 'L', 'eyeL')}
  ${eye(1340, 570, 'R', 'L', 'eyeR')}
  <g data-tip="rayL" class="ray hfL"><path d="M1590,110 L1406,230 L1270,262"/><path d="M1590,110 L1406,570 L1300,632"/></g>
  <g data-tip="rayR" class="ray hfR"><path d="M1590,690 L1406,570 L1270,538"/><path d="M1590,690 L1406,230 L1300,168"/></g>`,
    ctx: [],
    front: `
  <g class="nuc" data-tip="lgn" data-nerve="II"><ellipse cx="626" cy="300" rx="20" ry="13" fill="url(#nucSSA)"/><ellipse cx="626" cy="500" rx="20" ry="13" fill="url(#nucSSA)"/></g>
  <g data-tip="chiasmV" class="vchi"><path d="M944,382 L988,418 M988,382 L944,418"/></g>`,
    medals: medal('II', 1040, 400),
    labels: `
    ${lbl(60, 100, 'LEFT HEMISPHERE', 'start', null, 'faint')}${lbl(60, 712, 'RIGHT HEMISPHERE', 'start', null, 'faint')}
    ${lbl(130, 290, 'V1 · CALCARINE', 'middle')}${lbl(130, 524, 'V1 · CALCARINE', 'middle')}
    ${lbl(626, 278, 'LGN', 'middle')}${lbl(626, 532, 'LGN', 'middle')}
    ${lbl(560, 104, "MEYER'S LOOP", 'middle')}${lbl(400, 314, 'PARIETAL RADIATION', 'middle', null, 'faint')}
    ${lbl(566, 460, 'PRETECTUM · SC', 'middle', null, 'faint')}${lbl(930, 380, 'SCN', 'middle', null, 'faint')}
    ${lbl(966, 440, 'CHIASM', 'middle')}${lbl(820, 300, 'OPTIC TRACT', 'middle', null, 'faint')}
    ${lbl(1110, 272, 'OPTIC CANAL', 'middle', null, 'faint')}${lbl(1180, 240, 'OPTIC N.', 'middle', null, 'faint')}
    ${lbl(1340, 128, 'LEFT EYE', 'middle')}${lbl(1340, 682, 'RIGHT EYE', 'middle')}
    ${lbl(1590, 96, 'LEFT VISUAL FIELD', 'end', null, 'hfLt')}${lbl(1590, 712, 'RIGHT VISUAL FIELD', 'end', null, 'hfRt')}
    ${lbl(1230, 176, 'temporal', 'middle', null, 'faint')}${lbl(1232, 300, 'nasal', 'middle', null, 'faint')}
    ${lbl(1232, 506, 'nasal', 'middle', null, 'faint')}${lbl(1230, 632, 'temporal', 'middle', null, 'faint')}`
  };
}

// cochlear duct as an inward spiral, cut into pieces so colour can run base (high pitch) → apex (low)
function cochleaSpiral(cx, cy, r0, r1, turns, pieces) {
  const a0 = -0.75, n = 120, pts = [];
  for (let i = 0; i <= n; i++) {
    const k = i / n, a = a0 - k * turns * 2 * Math.PI, r = r0 + (r1 - r0) * k;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const per = n / pieces;
  return [...Array(pieces)].map((_, p) => 'M' + pts.slice(Math.round(p * per), Math.round((p + 1) * per) + 1)
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L'));
}

// ── ear region: brainstem · IAM in the petrous bone → inner & middle ear (enlarged)
function earScene() {
  const petrous = 'M580,540 C610,450 700,404 820,396 C900,392 960,410 990,440 L990,560 C900,590 700,600 580,540 Z';
  const iamTube = 'M600,446 L790,446 C800,446 806,452 806,460 L806,494 C806,502 800,508 790,508 L600,508 Z';
  const otic = 'M1030,480 C1024,340 1110,186 1250,180 C1420,174 1540,250 1546,380 C1552,520 1440,654 1250,654 C1100,654 1036,600 1030,480 Z';
  const spiral = cochleaSpiral(1110, 570, 70, 14, 2.6, 6);
  const canal = (tip, d) => `<g data-tip="${tip}" class="canal-g"><path class="canal" d="${d}"/><path class="canal-in" d="${d}"/></g>`;
  return {
    titles: `<text x="600" y="44">IAM · PETROUS</text><text x="600" y="62" class="zt-sub">VIII and VII share the canal</text>
             <text x="1060" y="44">INNER EAR</text><text x="1060" y="62" class="zt-sub">right labyrinth · enlarged · schematic</text>`,
    back: `
  <g data-tip="flocculus" class="ctxr c-VIII"><path d="M436,512 C452,500 478,504 486,520 C490,536 470,546 452,540 C438,536 430,524 436,512 Z"/></g>
  <g class="skullbase">
    <g data-tip="petrous"><path class="bone faintbone" d="${petrous}"/><path d="${petrous}" fill="url(#boneDots)"/></g>
    <g data-tip="iamV"><path class="portal iamtube" d="${iamTube}"/></g>
    <path data-tip="fundus" class="fundus" d="M806,452 L806,502"/>
    ${artery('M430,560 C480,540 530,530 566,512 C590,500 606,500 626,506 C646,512 650,526 632,532', 3.5, 'aicaLoop', 'dim')}
    <ellipse data-tip="iamV" class="porus big" cx="600" cy="477" rx="12" ry="32"/>
  </g>
  <g class="ear">
    <g data-tip="oticCap"><path class="otic" d="${otic}"/></g>
    <g data-tip="mecav"><path class="mecav" d="M1256,500 C1300,492 1380,494 1420,510 L1420,610 C1370,622 1300,620 1268,604 Z"/></g>
    <g data-tip="earCanal"><path class="earcanal" d="M1418,524 L1600,496 L1600,624 L1418,598 Z"/></g>
    <g class="swaves">${[0, 1, 2].map(i => `<path d="M${1560 - i * 26},530 C${1548 - i * 26},548 ${1548 - i * 26},572 ${1560 - i * 26},590" style="animation-delay:${-i * .5}s"/>`).join('')}</g>
    <g data-tip="tm"><ellipse class="tmem" cx="1414" cy="560" rx="6" ry="38" transform="rotate(-12 1414 560)"/></g>
    <g data-tip="ossicles" class="ossicles">
      <path d="M1254,500 L1272,494 M1258,502 C1270,520 1288,534 1302,540 M1270,496 C1284,514 1296,528 1306,536"/>
      <path d="M1304,540 C1322,536 1338,528 1350,514 C1358,504 1368,500 1378,504"/>
      <circle cx="1386" cy="502" r="8"/><path d="M1388,510 C1396,530 1402,548 1410,566"/>
    </g>
    <ellipse data-tip="ovalW" class="owin" cx="1258" cy="496" rx="9" ry="5" transform="rotate(-18 1258 496)"/>
    <circle data-tip="roundW" class="owin" cx="1178" cy="534" r="6"/>
    ${canal('canalA', 'M1214,432 C1168,350 1176,220 1250,208 C1318,198 1336,300 1268,428')}
    ${canal('canalP', 'M1268,428 C1300,330 1390,240 1460,270 C1530,300 1520,420 1302,476')}
    ${canal('canalL', 'M1262,446 C1320,418 1410,402 1424,440 C1436,476 1340,480 1284,464')}
    <g data-tip="vestibule"><ellipse class="lymph" cx="1240" cy="462" rx="40" ry="34"/></g>
    <g data-tip="ampulla" class="amp"><ellipse cx="1208" cy="414" rx="10" ry="14" transform="rotate(-24 1208 414)"/><ellipse cx="1286" cy="442" rx="11" ry="8"/><ellipse cx="1300" cy="480" rx="11" ry="8"/></g>
    <g data-tip="utricle"><ellipse class="mac" cx="1246" cy="446" rx="22" ry="9"/></g>
    <g data-tip="saccule"><ellipse class="mac" cx="1224" cy="482" rx="11" ry="13"/></g>
    <path class="lymph-duct" d="M1161,522 C1180,508 1200,494 1214,488"/>
    <g data-tip="cochlea" class="cochlea">${spiral.map((d, i) => {
      const k = i / (spiral.length - 1), mix = (a, b) => Math.round(a + (b - a) * k);   // base #79e0ee → apex #3550c8
      return `<path class="cduct" style="stroke:rgb(${mix(121, 53)},${mix(224, 80)},${mix(238, 200)})" d="${d}"/>`;
    }).join('')}</g>
  </g>`,
    ctx: [{ f: 'SVE', tip: 'VII', d: 'M355,456 C420,456 520,454 604,454 C680,452 740,450 792,450 C812,442 826,430 838,416' }],
    front: `
  <g data-tip="scarpa" class="sg-g g-VIII"><ellipse class="tg" cx="744" cy="471" rx="18" ry="15"/></g>
  <g data-tip="spiralG" class="sg-g g-VIII"><circle class="tg" cx="1110" cy="570" r="13"/></g>`,
    medals: medal('VIII', 500, 356),
    labels: `
    ${lbl(398, 404, 'VESTIBULAR N.', 'start', [394, 402, 320, 418], 'vestT')}
    ${lbl(398, 494, 'COCHLEAR N.', 'start', [394, 490, 356, 474], 'cochT')}
    ${lbl(318, 482, 'SOC', 'middle', null, 'faint')}
    ${lbl(270, 494, 'TRAPEZOID', 'middle', null, 'faint')}
    ${lbl(372, 330, 'LAT. LEMNISCUS', 'start', null, 'faint')}
    ${lbl(340, 192, 'IC', 'start')}
    ${lbl(306, 70, 'MGN → A1', 'middle', null, 'faint')}
    ${lbl(290, 300, 'MLF', 'start', null, 'faint')}
    ${lbl(338, 640, 'VESTIBULOSPINAL', 'start', null, 'faint')}
    ${lbl(492, 552, 'FLOCCULUS', 'start')}
    ${lbl(440, 450, 'CPA', 'middle', null, 'faint')}
    ${lbl(600, 432, 'PORUS', 'middle', null, 'faint')}
    ${lbl(700, 438, 'IAM', 'middle')}
    ${lbl(744, 528, "SCARPA'S G.", 'middle')}
    ${lbl(812, 520, 'FUNDUS', 'start', null, 'faint')}
    ${lbl(846, 410, 'VII', 'start', null, 'faint')}
    ${lbl(700, 590, 'PETROUS', 'middle', null, 'faint')}
    ${lbl(640, 552, 'AICA', 'middle', null, 'faint')}
    ${lbl(1110, 668, 'COCHLEA', 'middle')}
    ${lbl(1110, 684, 'BASE = HIGH · APEX = LOW', 'middle', null, 'cochT')}
    ${lbl(1050, 640, 'SPIRAL G.', 'end', null, 'faint', [1052, 634, 1100, 580])}
    ${lbl(1250, 196, 'ANTERIOR', 'middle')}
    ${lbl(1470, 254, 'POSTERIOR', 'start')}
    ${lbl(1432, 432, 'LATERAL', 'start')}
    ${lbl(1172, 400, 'AMPULLA', 'end', null, 'faint')}
    ${lbl(1246, 434, 'UTRICLE', 'middle', null, 'dark')}
    ${lbl(1196, 510, 'SACCULE', 'end', null, 'faint')}
    ${lbl(1166, 528, 'ROUND W.', 'end', null, 'faint')}
    ${lbl(1250, 520, 'OVAL W.', 'middle', null, 'faint')}
    ${lbl(1330, 640, 'MIDDLE EAR', 'middle', null, 'faint')}
    ${lbl(1386, 486, 'OSSICLES', 'middle')}
    ${lbl(1414, 616, 'DRUM', 'middle', null, 'faint')}
    ${lbl(1590, 650, 'EAR CANAL', 'end', null, 'faint')}
    ${lbl(1590, 740, 'COCHLEAR', 'end', null, 'cochT')}${lbl(1590, 758, 'VESTIBULAR', 'end', null, 'vestT')}`
  };
}

// Two stacked svgs with the same viewBox:
//  · art  – static anatomy, painted once
//  · over – everything that animates (nerves, nuclei, ganglia, ring, spotlight) + labels,
//           on its own compositor layer so spark animation never repaints the art
function buildStage(region) {
  const sc = { face: faceScene, neck: neckScene, smell: smellScene, vision: visionScene, ear: earScene }[region]?.() || orbitScene();
  const bs = sc.noBrainstem ? { svg: '', nuclei: '', labels: '' } : brainstem();
  const ids = Object.keys(NERVES).filter(k => NERVES[k].region === region);
  const nerveGroups = ids.map(id =>
    `<g class="nv n-${id}" data-nerve="${id}">${STAGE_NERVES[id].map(s => seg(s)).join('')}</g>`).join('');
  const hitGroups = ids.map(id =>
    `<g class="nv-h" data-nerve="${id}">${STAGE_NERVES[id].map(s => segHit(s, id)).join('')}</g>`).join('');

  return `
<div class="stage-layers region-${region}">
<svg class="stage-svg stage-art" viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
  <text id="watermark" class="watermark" x="800" y="560" text-anchor="middle"></text>
  <path class="zone-div" d="M560,40 C540,260 590,520 560,770"/>
  <path class="zone-div" d="M1000,40 C1030,260 990,520 1010,770"/>
  <g class="zone-titles">
    ${sc.noBrainstem ? '' : '<text x="40" y="44">BRAINSTEM</text><text x="40" y="62" class="zt-sub">anterior view · nuclei ghosted</text>'}
    ${sc.titles}
  </g>
  ${bs.svg}
  ${sc.back}
</svg>
<svg class="stage-svg stage-over" id="stageSvg" viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
  <g class="hits">${hitGroups}<g class="ctx ctx-hits">${sc.ctx.map(s => segHit(s)).join('')}</g></g>
  <g id="fproxies"></g>
  ${bs.nuclei}
  <g class="ctx ctx-nerves">${sc.ctx.map(s => seg(s)).join('')}</g>
  ${nerveGroups}
  ${sc.front}
  ${sc.medals}
  <g class="labels">${bs.labels}${sc.labels}</g>
  <circle id="spot" class="spot" cx="-100" cy="-100" r="34"/>
</svg>
</div>`;
}
