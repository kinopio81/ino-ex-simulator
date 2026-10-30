/*
  특별제작품 #2: 홈야드루프Ⅱ (타카쇼 홈야드루프 시스템)
  특별제작품 #3: 홈야드루프 글라스 시스템 (홈야드루프Ⅱ 본체 + 국내 유리, 높이 2,450/3,000 한정)
  ------------------------------------------------
  데이터 출처 (카탈로그 인쇄 페이지, PDF 텍스트 레이어에서 직접 추출)
    P.1166 독립형 싱글(W13/20 직선, W27/30 지붕R)·더블(W26/40) 세트 단가 / 열선컷 가산
    P.1167 벽부착형 싱글(W13/20)·더블(W26/40) 세트 단가 / 이동주 100각 가산
    P.1169 내천정 일반·시크 (표준) / P.1170 내천정 통기구 타입 (일반·시크)
    P.1171 추천 다운라이트 3종 (올글라스포치와 동일)
    P.1201 천면용 디자인 패널 / P.1202 로프식 개폐 셰이드 / P.1205 라이팅 페이스
    P.1159 본체 컬러 12색
  규격 매칭: 요청 폭·길이·높이 이상인 규격 중 최저가 (큰 부재를 절단해 사용).
  glassporch.js의 공용 함수(jpyToKrw, createSwatchPicker, mediaMarkup 등)와 공용 데이터를 재사용한다.
  두 제품은 같은 폼 구조(id 접두사 hyr / hyg)를 쓰므로 createHyrConfigurator(cfg)로 한 번씩 생성한다.
  글라스 시스템 유리 단가: 면 길이 1m당 1,500,000원 (높이 무관, 국내 유리), 옵션은 홈야드루프Ⅱ와 동일.
*/

const HYR_IMG = OPT_IMG;
const HYR_HEIGHT_STEPS = [{ key: "H24", mm: 2450, label: "높이 2,450" }, { key: "H30", mm: 3000, label: "높이 3,000" }, { key: "H37", mm: 3700, label: "높이 3,700" }];
const HYR_L_STEPS = [{ key: "L20", mm: 2000 }, { key: "L27", mm: 2667 }, { key: "L33", mm: 3333 }, { key: "L40", mm: 4000 }, { key: "L47", mm: 4667 }, { key: "L53", mm: 5333 }, { key: "L60", mm: 6000 }];

// 본체 (엔). rows[L] = [H24, H30, H37, 열선컷 가산]
const HYR_BODY = {
  free: {
    W13: { mm: 1300, kind: "single", roof: "직선", label: "싱글 W13", rows: { L20: [651400, 655800, 819100, 17300], L27: [708000, 712400, 875800, 22700], L33: [819500, 823900, 987300, 28300], L40: [967200, 972900, 1161000, 34000], L47: [1091600, 1097300, 1285400, 39600], L53: [1117100, 1122800, 1310900, 45200], L60: [1144800, 1150500, 1338600, 50900] } },
    W20: { mm: 2000, kind: "single", roof: "직선", label: "싱글 W20", rows: { L20: [692100, 696500, 859800, 45000], L27: [754900, 759300, 922600, 58200], L33: [876500, 880900, 1044300, 71900], L40: [1030900, 1036600, 1224700, 87200], L47: [1161300, 1167000, 1355100, 100900], L53: [1196700, 1202500, 1390600, 114600], L60: [1230700, 1236400, 1424500, 129900] } },
    W27: { mm: 2700, kind: "singleR", roof: "지붕 R", label: "싱글 W27 (지붕 R)", rows: { L20: [913000, 918800, 1106900, 38800], L27: [1033100, 1038800, 1226900, 52600], L33: [1130300, 1136000, 1324100, 66500], L40: [1334500, 1342800, 1580400, 80300], L47: [1449300, 1457700, 1695300, 94200], L53: [1505000, 1513300, 1750900, 108000], L60: [1562600, 1571000, 1808600, 121900] } },
    W30: { mm: 3000, kind: "singleR", roof: "지붕 R", label: "싱글 W30 (지붕 R)", rows: { L20: [927300, 933100, 1121200, 42700], L27: [1055200, 1060900, 1249000, 56800], L33: [1160500, 1166300, 1354400, 70600], L40: [1366800, 1375200, 1612800, 84700], L47: [1485600, 1494000, 1731600, 98500], L53: [1549200, 1557500, 1795100, 112600], L60: [1615000, 1623300, 1860900, 126400] } },
    W26: { mm: 2600, kind: "double", roof: "직선", label: "더블 W26", rows: { L20: [971700, 977400, 1165500, 34100], L27: [1076600, 1082300, 1270400, 45400], L33: [1251700, 1257500, 1445600, 56600], L40: [1501100, 1509500, 1747100, 67900], L47: [1724200, 1732500, 1970100, 79200], L53: [1776300, 1784700, 2022300, 90400], L60: [1833900, 1842200, 2079800, 101700] } },
    W40: { mm: 4000, kind: "double", roof: "직선", label: "더블 W40", rows: { L20: [1072300, 1078000, 1266100, 87400], L27: [1189400, 1195100, 1383200, 116400], L33: [1380900, 1386600, 1574700, 143800], L40: [1647600, 1656000, 1893600, 172800], L47: [1883200, 1891600, 2129200, 201800], L53: [1953100, 1961500, 2199100, 229200], L60: [2027000, 2035400, 2273000, 258200] } }
  },
  wall: {
    W13: { mm: 1300, kind: "single", roof: "직선", label: "싱글 W13", rows: { L20: [576600, 579400, 673500, 17300], L27: [619800, 622600, 716700, 22700], L33: [736100, 738900, 833000, 28300], L40: [878600, 882800, 1001600, 34000], L47: [953000, 957200, 1076000, 39600], L53: [978600, 982800, 1101600, 45200] } },
    W20: { mm: 2000, kind: "single", roof: "직선", label: "싱글 W20", rows: { L20: [614300, 617100, 711200, 45000], L27: [663800, 666600, 760700, 58200], L33: [790200, 793000, 887100, 71900], L40: [939200, 943400, 1062200, 87200], L47: [1019600, 1023800, 1142600, 100900], L53: [1055200, 1059300, 1178100, 114600] } },
    W26: { mm: 2600, kind: "double", roof: "직선", label: "더블 W26", rows: { L20: [941400, 946300, 1085600, 34100], L27: [1032900, 1037800, 1177200, 45400], L33: [1212800, 1217600, 1357000, 56600], L40: [1488500, 1496600, 1706000, 67900], L47: [1661800, 1670000, 1879400, 79200], L53: [1713700, 1721900, 1931300, 90400] } },
    W40: { mm: 4000, kind: "double", roof: "직선", label: "더블 W40", rows: { L20: [1052600, 1057500, 1196800, 87400], L27: [1156300, 1161100, 1300500, 116400], L33: [1352500, 1357300, 1496700, 143800], L40: [1645500, 1653700, 1863100, 172800], L47: [1831400, 1839600, 2049000, 201800], L53: [1901100, 1909200, 2118600, 229200] } }
  }
};

// 내천정 (엔). [grade][vent][W] = { L: [base, line, lineW] }. 더블은 양측 설치 가격.
const HYR_CEILING = {
  basic: {
    std: {
      W13: { L20: [185300, 0, ""], L27: [188400, 0, ""], L33: [248800, 0, ""], L40: [309500, 490700, "18W"], L47: [311100, 492400, "18W"], L53: [368600, 586100, "22W"], L60: [426300, 679600, "26W"] },
      W20: { L20: [224600, 0, ""], L27: [227600, 0, ""], L33: [300500, 0, ""], L40: [374800, 641000, "31W"], L47: [376300, 642600, "31W"], L53: [448900, 768400, "37W"], L60: [520200, 892700, "43W"] },
      W27: { L20: [335600, 0, ""], L27: [342400, 0, ""], L33: [440200, 0, ""], L40: [538400, 762500, "18W"], L47: [541800, 765700, "18W"], L53: [648400, 906100, "22W"], L60: [743100, 1036400, "26W"] },
      W30: { L20: [339700, 0, ""], L27: [344400, 0, ""], L33: [443800, 0, ""], L40: [542700, 787100, "31W"], L47: [545900, 790300, "31W"], L53: [653600, 938200, "37W"], L60: [748900, 1073200, "43W"] },
      W26: { L20: [370600, 0, ""], L27: [376800, 0, ""], L33: [497600, 0, ""], L40: [619000, 800200, "18W"], L47: [622200, 803500, "18W"], L53: [737200, 954700, "22W"], L60: [852600, 1105900, "26W"] },
      W40: { L20: [449200, 0, ""], L27: [455200, 0, ""], L33: [601000, 0, ""], L40: [749600, 1015800, "31W"], L47: [752600, 1018900, "31W"], L53: [897800, 1217300, "37W"], L60: [1040400, 1412900, "43W"] }
    },
    vent: {
      W13: { L20: [209300, 0, ""], L27: [212800, 0, ""], L33: [281200, 0, ""], L40: [349800, 542000, "18W"], L47: [351500, 543800, "18W"], L53: [416800, 647200, "22W"], L60: [481600, 750600, "26W"] },
      W20: { L20: [253800, 0, ""], L27: [257300, 0, ""], L33: [339500, 0, ""], L40: [423600, 707800, "31W"], L47: [425300, 709600, "31W"], L53: [507300, 848600, "37W"], L60: [588000, 985900, "43W"] },
      W27: { L20: [380700, 0, ""], L27: [387600, 0, ""], L33: [485300, 0, ""], L40: [584200, 806700, "18W"], L47: [587400, 809100, "18W"], L53: [694200, 950100, "22W"], L60: [789300, 1080600, "26W"] },
      W30: { L20: [385000, 0, ""], L27: [389100, 0, ""], L33: [489000, 0, ""], L40: [588500, 831300, "31W"], L47: [591600, 834600, "31W"], L53: [699800, 981700, "37W"], L60: [795000, 1117500, "43W"] },
      W26: { L20: [418600, 0, ""], L27: [425600, 0, ""], L33: [562400, 0, ""], L40: [699600, 891800, "18W"], L47: [703000, 895300, "18W"], L53: [833600, 1064000, "22W"], L60: [963200, 1232200, "26W"] },
      W40: { L20: [507600, 0, ""], L27: [514600, 0, ""], L33: [679000, 0, ""], L40: [847200, 1131400, "31W"], L47: [850600, 1134900, "31W"], L53: [1014600, 1355900, "37W"], L60: [1176000, 1573900, "43W"] }
    }
  },
  chic: {
    std: {
      W13: { L20: [222800, 0, ""], L27: [225900, 0, ""], L33: [298800, 0, ""], L40: [372000, 553200, "18W"], L47: [373600, 554900, "18W"], L53: [443600, 661100, "22W"], L60: [513800, 767100, "26W"] },
      W20: { L20: [262100, 0, ""], L27: [265100, 0, ""], L33: [350500, 0, ""], L40: [437300, 703500, "31W"], L47: [438800, 705100, "31W"], L53: [523900, 843400, "37W"], L60: [607700, 980200, "43W"] },
      W27: { L20: [410600, 0, ""], L27: [417400, 0, ""], L33: [540200, 0, ""], L40: [663400, 887500, "18W"], L47: [666800, 890700, "18W"], L53: [798400, 1056100, "22W"], L60: [918100, 1211400, "26W"] },
      W30: { L20: [414700, 0, ""], L27: [419400, 0, ""], L33: [543800, 0, ""], L40: [667700, 912100, "31W"], L47: [670900, 915300, "31W"], L53: [803600, 1088200, "37W"], L60: [923900, 1248200, "43W"] },
      W26: { L20: [445600, 0, ""], L27: [451800, 0, ""], L33: [597600, 0, ""], L40: [744000, 925200, "18W"], L47: [747200, 928500, "18W"], L53: [887200, 1104700, "22W"], L60: [1027600, 1280900, "26W"] },
      W40: { L20: [524200, 0, ""], L27: [530200, 0, ""], L33: [701000, 0, ""], L40: [874600, 1140800, "31W"], L47: [877600, 1143900, "31W"], L53: [1047800, 1367300, "37W"], L60: [1215400, 1587900, "43W"] }
    },
    vent: {
      W13: { L20: [246800, 0, ""], L27: [250300, 0, ""], L33: [331200, 0, ""], L40: [412300, 604500, "18W"], L47: [414000, 606300, "18W"], L53: [491800, 722200, "22W"], L60: [569100, 838100, "26W"] },
      W20: { L20: [291300, 0, ""], L27: [294800, 0, ""], L33: [389500, 0, ""], L40: [486100, 770300, "31W"], L47: [487800, 772100, "31W"], L53: [582300, 923600, "37W"], L60: [675500, 1073400, "43W"] },
      W27: { L20: [455700, 0, ""], L27: [462600, 0, ""], L33: [585300, 0, ""], L40: [709200, 980700, "18W"], L47: [712400, 983300, "18W"], L53: [844200, 1159000, "22W"], L60: [964300, 1324200, "26W"] },
      W30: { L20: [460000, 0, ""], L27: [464100, 0, ""], L33: [589000, 0, ""], L40: [713500, 956300, "31W"], L47: [716600, 959600, "31W"], L53: [849800, 1131700, "37W"], L60: [970000, 1292500, "43W"] },
      W26: { L20: [493600, 0, ""], L27: [500600, 0, ""], L33: [662400, 0, ""], L40: [824600, 1016800, "18W"], L47: [828000, 1020300, "18W"], L53: [983600, 1214000, "22W"], L60: [1138200, 1407200, "26W"] },
      W40: { L20: [582600, 0, ""], L27: [589600, 0, ""], L33: [779000, 0, ""], L40: [972200, 1256400, "31W"], L47: [975600, 1259900, "31W"], L53: [1164600, 1505900, "37W"], L60: [1351000, 1748900, "43W"] }
    }
  }
};
const HYR_CEILING_GRADES = [
  { id: "basic", label: "에버아트보드 일반" },
  { id: "chic", label: "에버아트보드 시크 시리즈" }
];

// 이동주 100각 (엔/본). [縦樋無, 縦樋有]
const HYR_MOVING_POST = { H24: [29800, 44700], H30: [47300, 61400], H37: [65300, 77500] };

// 로프식 개폐 셰이드 (엔). 지붕 직선 전용(W13/W20). 더블은 2세트 (W26→W13×2, W40→W20×2)
const HYR_ROPE_SHADE = {
  net: { W13: { L20: 152700, L27: 187100, L33: 207800, L40: 239700, L47: 272900, L53: 294100, L60: 317600 }, W20: { L20: 169800, L27: 203600, L33: 225800, L40: 269400, L47: 305800, L53: 331300, L60: 358400 } },
  canvas: { W13: { L20: 210900, L27: 267500, L33: 312600, L40: 338300, L47: 396500, L53: 440800, L60: 468300 }, W20: { L20: 253700, L27: 328300, L33: 389300, L40: 414600, L47: 489700, L53: 550700, L60: 579800 } }
};
const HYR_SHADE_OPTIONS = [
  { id: "none", label: "없음", swatch: HYR_IMG + "none.jpg" },
  { id: "net", label: "셰이드넷 (샌드스톤)", swatch: HYR_IMG + "hyr-rope-shade.jpg" },
  { id: "canvas", label: "캔버스 생지 (선브렐라)", swatch: HYR_IMG + "hyr-rope-shade.jpg" }
];
const HYR_CANVAS_COLORS = ["샌드스톤", "모카트위드", "오이스터", "터쿼이즈블루"];

// 천면용 디자인 패널 (엔/장, W950×L1898)
const HYR_DESIGN_PANELS = [
  { id: "copper", label: "코퍼", jpy: 218400 },
  { id: "black", label: "블랙", jpy: 218400 },
  { id: "shine", label: "샤인", jpy: 231900 }
];

// 라이팅 페이스 (엔, 4변 사양 가산). [W][L] = jpy
const HYR_LIGHTING_FACE = {
  W13: { L20: 262800, L27: 290900, L33: 344800, L40: 376600, L47: 384100, L53: 469400, L60: 471900 },
  W20: { L20: 288400, L27: 316500, L33: 370400, L40: 404200, L47: 411700, L53: 497000, L60: 499500 },
  W26: { L20: 314900, L27: 343000, L33: 396900, L40: 429600, L47: 437100, L53: 522400, L60: 524900 },
  W40: { L20: 403600, L27: 431700, L33: 485600, L40: 518800, L47: 526300, L53: 611600, L60: 614100 }
};

const HYR_COLORS = [
  { id: "brown_ebony", label: "브라운 에보니 (정번)", madeToOrder: false },
  { id: "dark_pine", label: "다크 파인 (정번)", madeToOrder: false },
  { id: "natural_pine", label: "내추럴 파인 (정번)", madeToOrder: false },
  { id: "white_pine", label: "화이트 파인 (정번)", madeToOrder: false },
  { id: "matte_black", label: "매트 블랙 (정번)", madeToOrder: false },
  { id: "black_ebony", label: "블랙 에보니 (주문생산)", madeToOrder: true },
  { id: "kyomachiya_grey", label: "쿄마치야 카키차 (주문생산)", madeToOrder: true },
  { id: "matte_dark_grey", label: "매트 다크 그레이 (주문생산)", madeToOrder: true },
  { id: "matte_light_grey", label: "매트 라이트 그레이 (주문생산)", madeToOrder: true },
  { id: "matte_beige", label: "매트 베이지 (주문생산)", madeToOrder: true },
  { id: "matte_white", label: "매트 화이트 (주문생산)", madeToOrder: true },
  { id: "rusty_copper", label: "러스티 코퍼 (주문생산)", madeToOrder: true }
].map((item) => ({ ...item, swatch: `${SWATCH_IMG}hyr-${item.id}.jpg` }));

const HYR_ROOF_PREFS = [
  { id: "auto", label: "자동 (조건 충족 최저가)" },
  { id: "single", label: "싱글 사양만" },
  { id: "double", label: "더블 사양만 (중앙 도리)" }
];

const HYR_DEFAULT_INSTALL = 3000000;
const HYG_GLASS_PER_METER = 1500000; // 홈야드루프 글라스 시스템 유리 단가 (원/m, 면 길이 기준)

function createHyrConfigurator(cfg) {
  const el = (name) => $(`#${cfg.prefix}${name}`);
  const hyrGlassFaces = el("GlassFaces");
  const hyrGlassMedia = el("GlassMedia");
  const hyrPreview = el("Preview");
  const hyrForm = el("Form");
  const hyrWidthInput = el("Width");
  const hyrLengthInput = el("Length");
  const hyrHeightSelect = el("Height");
  const hyrMountSelect = el("Mount");
  const hyrRoofPrefSelect = el("RoofPref");
  const hyrRoofSelect = el("Roof");
  const hyrColorSelect = el("Color");
  const hyrCeilingTypeSelect = el("CeilingType");
  const hyrCeilingLineToggle = el("CeilingLine");
  const hyrCeilingGradeSelect = el("CeilingGrade");
  const hyrCeilingColorSelect = el("CeilingColor");
  const hyrCeilingMedia = el("CeilingMedia");
  const hyrDownlightSelect = el("Downlight");
  const hyrDownlightModeSelect = el("DownlightMode");
  const hyrDownlightQtyInput = el("DownlightQty");
  const hyrDownlightHint = el("DownlightHint");
  const hyrDownlightMedia = el("DownlightMedia");
  const hyrLightingFaceToggle = el("LightingFace");
  const hyrLightingMedia = el("LightingMedia");
  const hyrMovingPostInput = el("MovingPost");
  const hyrMovingPostGutterInput = el("MovingPostGutter");
  const hyrShadeSelect = el("Shade");
  const hyrShadeColorSelect = el("ShadeColor");
  const hyrShadeMedia = el("ShadeMedia");
  const hyrPanelSelect = el("Panel");
  const hyrPanelQtyInput = el("PanelQty");
  const hyrPanelMedia = el("PanelMedia");
  const hyrSpacerToggle = el("WallSpacer");
  const hyrConnectMedia = el("ConnectMedia");
  const hyrInstallToggle = el("InstallToggle");
  const hyrInstallFeeInput = el("InstallFee");
  const hyrCustomOptions = el("CustomOptions");
  const hyrBreakdown = el("Breakdown");
  const hyrSpecSummary = el("SpecSummary");
  const hyrTotalKrw = el("TotalKrw");
  const hyrInstallKrw = el("InstallKrw");
  const hyrGrandTotal = el("GrandTotal");
  const hyrAddButton = el("AddButton");
  const hyrWarning = el("Warning");

  function hyrPickBody(mount, pref, reqW, reqL, reqH) {
    const table = HYR_BODY[mount];
    const h = HYR_HEIGHT_STEPS.find((item) => item.mm >= reqH) || null;
    if (!h) return { error: `높이 ${formatNumber(reqH)}mm는 최대 기둥 높이 3,700mm를 넘습니다.` };
    const hi = HYR_HEIGHT_STEPS.indexOf(h);
    const len = HYR_L_STEPS.find((item) => item.mm >= reqL);
    if (!len) return { error: `길이 ${formatNumber(reqL)}mm는 최대 6,000mm를 넘습니다.` };
    let best = null;
    Object.entries(table).forEach(([wKey, spec]) => {
      if (spec.mm < reqW) return;
      if (pref === "single" && spec.kind === "double") return;
      if (pref === "double" && spec.kind !== "double") return;
      const row = spec.rows[len.key];
      if (!row) return;
      const candidate = { wKey, spec, lKey: len.key, lMm: len.mm, height: h, hi, jpy: row[hi], heatCut: row[3] };
      if (!best || candidate.jpy < best.jpy) best = candidate;
    });
    if (!best) {
      const maxL = mount === "wall" ? "5,333" : "6,000";
      return { error: `요청 폭 ${formatNumber(reqW)} × 길이 ${formatNumber(reqL)}mm를 덮는 ${mount === "wall" ? "벽부착형" : "독립형"} 규격이 없습니다 (최대 폭 4,000 × 길이 ${maxL}${pref !== "auto" ? ", 지붕 사양 제한 포함" : ""}).` };
    }
    return best;
  }

  let hyrLastLines = [];
  bindBreakdownRemove(hyrBreakdown, () => hyrLastLines);

  function hyrReadCustomOptions() {
    return Array.from(hyrCustomOptions.querySelectorAll("[data-porch-option]"))
      .map((row) => ({
        row,
        label: row.querySelector("[data-porch-option-label]").value.trim(),
        krw: porchReadNumber(row.querySelector("[data-porch-option-krw]"), 0)
      }))
      .filter((option) => option.label && option.krw > 0);
  }

  function calculateHyr() {
    const reqW = porchReadNumber(hyrWidthInput, 2000);
    const reqL = porchReadNumber(hyrLengthInput, 3000);
    const reqH = porchReadNumber(hyrHeightSelect, 2450);
    const mount = hyrMountSelect.value;
    const pref = hyrRoofPrefSelect.value;
    const roof = PORCH_ROOF_MATERIALS.find((item) => item.id === hyrRoofSelect.value) || PORCH_ROOF_MATERIALS[0];
    const color = HYR_COLORS.find((item) => item.id === hyrColorSelect.value) || HYR_COLORS[0];
    const installFee = hyrInstallToggle.checked ? porchReadNumber(hyrInstallFeeInput, cfg.defaultInstall) : 0;
    const warnings = [];
    const lines = [];
    const push = (line) => lines.push({ krw: 0, ...line });

    const pick = hyrPickBody(mount, pref, reqW, reqL, reqH);
    if (pick.error) {
      warnings.push(pick.error);
      return { valid: false, warnings, lines };
    }
    const { wKey, spec, lKey, lMm, height, hi } = pick;
    const specLabel = `${mount === "wall" ? "벽부착형" : "독립형"} ${spec.label} × ${lKey} (${formatNumber(lMm)}) × ${height.label}`;

    push({
      group: "본체",
      label: `홈야드루프Ⅱ ${specLabel}`,
      detail: `요청 폭 ${formatNumber(reqW)} × 길이 ${formatNumber(reqL)} × 높이 ${formatNumber(reqH)}mm → 지붕 폭 ${formatNumber(spec.mm)} × 길이 ${formatNumber(lMm)} × 기둥 ${formatNumber(height.mm)}mm (큰 규격 절단 사용) · 지붕 ${spec.roof} · 기둥·도리·지붕재 포함 (${mount === "wall" ? "P.1167" : "P.1166"})`,
      krw: jpyToKrw(pick.jpy),
      image: HYR_IMG + (spec.kind === "double" ? "homeyard-roof-double.jpg" : "homeyard-roof.jpg")
    });

    if (roof.id === "brown_smoke") {
      push({ group: "지붕", label: "지붕재 브라운 스모크 폴리카 (열선컷 타입) 가산", detail: `${spec.label} × ${lKey} 열선컷 가산액`, krw: jpyToKrw(pick.heatCut), remove: () => porchResetControl(hyrRoofSelect, "clear_matte"), image: roof.swatch });
    } else {
      push({ group: "지붕", label: "지붕재 클리어 매트 폴리카", detail: "본체 가격에 포함", included: true, image: roof.swatch });
    }

    push({
      group: "마감",
      label: `본체 색상 · ${color.label}`,
      detail: color.madeToOrder ? "주문생산 색상, 납기 확인 필요 (가산 없음, P.1159)" : "정번 색상 (P.1159)",
      included: true,
      image: color.swatch
    });

    // ---- 유리 시스템 (홈야드루프 글라스 시스템 전용)
    let glassFaces = [];
    if (cfg.glass) {
      glassFaces = PORCH_FACES.filter((face) => {
        const box = hyrGlassFaces.querySelector(`[data-glass-face="${face.id}"]`);
        return box && box.checked && !(mount === "wall" && face.id === "back");
      });
      if (!glassFaces.length) {
        warnings.push("홈야드루프 글라스 시스템은 최소 한 면에 유리를 넣어야 합니다. 유리가 없는 구성은 \"홈야드루프Ⅱ\"를 선택해 주세요.");
        return { valid: false, warnings, lines };
      }
      glassFaces.forEach((face) => {
        const faceMm = face.axis === "W" ? reqW : reqL;
        const meters = faceMm / 1000;
        push({
          group: "유리",
          label: `글라스 시스템 · ${face.label} (${face.axis === "W" ? "폭" : "길이"} ${formatNumber(faceMm)}mm)`,
          detail: `국내 유리 적용 · 1m당 ${formatCurrency(HYG_GLASS_PER_METER)} × ${meters.toFixed(2)}m · 높이 ${formatNumber(reqH)}mm (높이별 단가 차이 없음)`,
          krw: Math.round(meters * HYG_GLASS_PER_METER / 100) * 100,
          remove: () => porchResetControl(hyrGlassFaces.querySelector(`[data-glass-face="${face.id}"]`), false),
          image: HYR_IMG + "porch-glass.jpg"
        });
      });
    }

    // ---- 내천정
    const ceilingType = hyrCeilingTypeSelect.value;
    const lineLight = hyrCeilingLineToggle.checked;
    let hasCeiling = false;
    if (ceilingType !== "none") {
      const grade = HYR_CEILING_GRADES.find((item) => item.id === hyrCeilingGradeSelect.value) || HYR_CEILING_GRADES[0];
      const ceilingColor = PORCH_CEILING_COLORS.find((item) => item.id === hyrCeilingColorSelect.value) || PORCH_CEILING_COLORS[0];
      const entry = HYR_CEILING[grade.id][ceilingType][wKey][lKey];
      if (lineLight && !entry[1]) {
        warnings.push(`라인라이트 사양은 길이 4,000 이상(L40~)에만 설정되어 있습니다. ${lKey}는 표준 내천정으로 산정했습니다.`);
      }
      const useLine = lineLight && entry[1] > 0;
      hasCeiling = true;
      push({
        group: "내천정",
        label: `내천정 ${ceilingType === "vent" ? "통기구 타입" : "표준"} · ${grade.label}${useLine ? ` · 라인라이트 사양 ${entry[2]}` : ""}`,
        detail: `${spec.label} × ${lKey} 기준${spec.kind === "double" ? " (더블 양측 설치 가격)" : ""} · 트랜스·코드 별도 (${ceilingType === "vent" ? "P.1170" : "P.1169"})`,
        krw: jpyToKrw(useLine ? entry[1] : entry[0]),
        remove: () => porchResetControl(hyrCeilingTypeSelect, "none"),
        image: HYR_IMG + (useLine ? "ceiling-linelight.jpg" : "ceiling.jpg")
      });
      push({ group: "내천정", label: `내천정 보드 색상 · ${ceilingColor.label}`, detail: "정번 컬러 11색 (P.1169), 그 외 별주 대응", included: true, image: ceilingColor.swatch });
    }

    // ---- 다운라이트
    const downlight = PORCH_DOWNLIGHTS.find((item) => item.id === hyrDownlightSelect.value) || PORCH_DOWNLIGHTS[0];
    if (downlight.id !== "none") {
      const qty = Math.max(1, Math.round(porchReadNumber(hyrDownlightQtyInput, 4)));
      const mode = PORCH_DOWNLIGHT_MODES.find((item) => item.id === hyrDownlightModeSelect.value) || PORCH_DOWNLIGHT_MODES[0];
      const areaM2 = spec.mm * lMm / 1e6;
      const modeNote = mode.id === "manual" ? "직접 입력" : mode.id === "catalog" ? `지붕 면적 ${areaM2.toFixed(1)}㎡ ÷ 약 1.4㎡당 1개` : recommendDownlights(mode, "30", areaM2, downlight.id).note;
      if (!hasCeiling) warnings.push("다운라이트는 내천정 패널에 매립 설치됩니다. 내천정을 함께 선택해 주세요.");
      push({
        group: "조명",
        label: `${downlight.label} × ${qty}개`,
        detail: `내천정 추천 다운라이트 (P.1171) · 수량 산정: ${modeNote} · 트랜스·배선 별도`,
        krw: jpyToKrw(downlight.jpy * qty),
        remove: () => porchResetControl(hyrDownlightSelect, "none"),
        image: downlight.image
      });
    }

    // ---- 라이팅 페이스
    if (hyrLightingFaceToggle.checked) {
      const table = HYR_LIGHTING_FACE[wKey];
      if (!table) {
        warnings.push(`라이팅 페이스는 W13/W20/W26/W40에만 설정되어 있어 ${spec.label}에는 적용하지 못했습니다.`);
      } else {
        push({
          group: "조명",
          label: `라이팅 페이스 (도리 4변 발광 라인, 전구색) · ${spec.label} × ${lKey}`,
          detail: "24V 저전압, 본체 가산액. 트랜스 별도 (P.1205)",
          krw: jpyToKrw(table[lKey]),
          remove: () => porchResetControl(hyrLightingFaceToggle, false),
          image: HYR_IMG + "hyr-lighting-face.jpg"
        });
      }
    }
    if ((hasCeiling && lineLight) || downlight.id !== "none" || hyrLightingFaceToggle.checked) {
      push({ group: "조명", label: "저전압 트랜스 (12V/24V 타이머 트랜스) · 별도 필요", detail: "라인라이트·다운라이트·라이팅 페이스 전원용. 트랜스, 전선보호관, 전원코드는 본 견적에 포함하지 않음 (P.1171, P.642~646)", separate: true });
    }

    // ---- 이동주
    const movingTotal = Math.max(0, Math.round(porchReadNumber(hyrMovingPostInput, 0)));
    const movingGutter = Math.min(movingTotal, Math.max(0, Math.round(porchReadNumber(hyrMovingPostGutterInput, 0))));
    if (movingTotal > 0) {
      const rates = HYR_MOVING_POST[height.key];
      const plain = movingTotal - movingGutter;
      push({
        group: "기둥",
        label: `이동주 100각 ${height.label} × ${movingTotal}본${movingGutter ? ` (세로 홈통 기둥 ${movingGutter}본 포함)` : ""}`,
        detail: `통상 기둥을 이동주로 변경, 1본당 가산 · 홈통 없음 ${formatCurrency(jpyToKrw(rates[0]))} / 홈통 있음 ${formatCurrency(jpyToKrw(rates[1]))} (P.1167)`,
        krw: jpyToKrw(rates[0] * plain + rates[1] * movingGutter),
        remove: () => { hyrMovingPostGutterInput.value = "0"; porchResetControl(hyrMovingPostInput, "0"); }
      });
    }

    // ---- 로프식 개폐 셰이드
    const shade = HYR_SHADE_OPTIONS.find((item) => item.id === hyrShadeSelect.value) || HYR_SHADE_OPTIONS[0];
    if (shade.id !== "none") {
      const shadeTable = HYR_ROPE_SHADE[shade.id];
      let baseW = null;
      let sets = 1;
      if (wKey === "W13" || wKey === "W20") baseW = wKey;
      else if (wKey === "W26") { baseW = "W13"; sets = 2; }
      else if (wKey === "W40") { baseW = "W20"; sets = 2; }
      if (!baseW) {
        warnings.push(`로프식 개폐 셰이드는 지붕 직선 사양 전용이라 ${spec.label}에는 적용하지 못했습니다.`);
      } else {
        const colorText = shade.id === "canvas" ? ` · ${hyrShadeColorSelect.value}` : " · 샌드스톤";
        push({
          group: "셰이드",
          label: `로프식 개폐 셰이드 ${shade.label}${colorText} · ${baseW} × ${lKey}${sets > 1 ? ` × ${sets}세트 (더블)` : ""}`,
          detail: "자외선 약 90% 차단, 로프 개폐, 본체 설치 후 추가 가능 (P.1202)",
          krw: jpyToKrw(shadeTable[baseW][lKey] * sets),
          remove: () => porchResetControl(hyrShadeSelect, "none"),
          image: HYR_IMG + "hyr-rope-shade.jpg"
        });
      }
    }

    // ---- 천면용 디자인 패널
    const panel = HYR_DESIGN_PANELS.find((item) => item.id === hyrPanelSelect.value) || HYR_DESIGN_PANELS[0];
    const panelQty = Math.max(0, Math.round(porchReadNumber(hyrPanelQtyInput, 0)));
    if (panelQty > 0) {
      push({
        group: "디자인 패널",
        label: `천면용 디자인 패널 W950×L1898 ${panel.label} × ${panelQty}장`,
        detail: "유칼리 / 크로스 디자인, 장변 방향 도리 2본 필요 (P.1201)",
        krw: jpyToKrw(panel.jpy * panelQty),
        remove: () => porchResetControl(hyrPanelQtyInput, "0"),
        image: HYR_IMG + "hyr-design-panel.jpg"
      });
    }

    // ---- 연결부자재
    push({ group: "연결부자재", label: "바닥 고정 · 기둥 기초 앵커", detail: "본체 포함. 기초 콘크리트는 현장 시공 (P.1208~1211)", included: true });
    if (mount === "wall" && hyrSpacerToggle.checked) {
      const spacer = PORCH_WALL_SPACER.find((item) => lMm <= item.maxMm) || PORCH_WALL_SPACER[PORCH_WALL_SPACER.length - 1];
      push({
        group: "연결부자재",
        label: `${spacer.label} (벽부착 길이 ${formatNumber(lMm)}mm 기준 자동 선택)`,
        detail: "지붕과 외벽 사이 70~100mm 틈새 커버, 현장 절단 (P.1145)",
        krw: jpyToKrw(spacer.jpy),
        remove: () => porchResetControl(hyrSpacerToggle, false),
        image: HYR_IMG + "wall-spacer.jpg"
      });
    }

    hyrReadCustomOptions().forEach((option) => push({ group: "옵션", label: option.label, detail: "수동 입력 옵션", krw: option.krw, remove: () => porchClearCustomOption(option.row) }));

    const materialKrw = lines.reduce((sum, line) => sum + (line.separate ? 0 : line.krw), 0);
    return { valid: true, warnings, lines, pick, specLabel, glassFaces, mount, roof, color, reqW, reqL, reqH, materialKrw, installFee, total: materialKrw + installFee };
  }

  function renderHyrMedia(result) {
    hyrCeilingMedia.innerHTML = hyrCeilingTypeSelect.value === "none" ? "" : mediaMarkup(HYR_IMG + (hyrCeilingLineToggle.checked ? "ceiling-linelight.jpg" : "ceiling.jpg"), hyrCeilingLineToggle.checked ? "내천정 라인라이트 사양" : "내천정 에버아트보드");
    const downlight = PORCH_DOWNLIGHTS.find((item) => item.id === hyrDownlightSelect.value);
    hyrDownlightMedia.innerHTML = downlight && downlight.image ? mediaMarkup(downlight.image, downlight.label) : "";
    hyrLightingMedia.innerHTML = hyrLightingFaceToggle.checked ? mediaMarkup(HYR_IMG + "hyr-lighting-face.jpg", "라이팅 페이스") : "";
    hyrShadeMedia.innerHTML = hyrShadeSelect.value !== "none" ? mediaMarkup(HYR_IMG + "hyr-rope-shade.jpg", "로프식 개폐 셰이드") : "";
    hyrPanelMedia.innerHTML = Math.round(porchReadNumber(hyrPanelQtyInput, 0)) > 0 ? mediaMarkup(HYR_IMG + "hyr-design-panel.jpg", "천면용 디자인 패널") : "";
    hyrConnectMedia.innerHTML = hyrMountSelect.value === "wall" && hyrSpacerToggle.checked ? mediaMarkup(HYR_IMG + "wall-spacer.jpg", "벽기대기 부재") : "";
    hyrShadeColorSelect.closest(".field").hidden = hyrShadeSelect.value !== "canvas";
    hyrSpacerToggle.closest(".toggle-line").hidden = hyrMountSelect.value !== "wall";
    if (cfg.glass) {
      const backBox = hyrGlassFaces.querySelector('[data-glass-face="back"]');
      const wallMount = hyrMountSelect.value === "wall";
      backBox.disabled = wallMount;
      if (wallMount) backBox.checked = false;
      backBox.closest(".toggle-line").classList.toggle("is-disabled", wallMount);
      const faces = result.valid ? result.glassFaces : [];
      hyrGlassMedia.innerHTML = faces.length ? mediaMarkup(HYR_IMG + "porch-glass.jpg", `유리 시스템 · ${faces.map((face) => face.label).join("·")}`) : "";
    }
    void result;
  }

  function syncHyrDownlight() {
    const noLight = hyrDownlightSelect.value === "none";
    hyrDownlightModeSelect.disabled = noLight;
    const pick = hyrPickBody(hyrMountSelect.value, hyrRoofPrefSelect.value, porchReadNumber(hyrWidthInput, 2000), porchReadNumber(hyrLengthInput, 3000), porchReadNumber(hyrHeightSelect, 2450));
    if (noLight || pick.error) {
      hyrDownlightQtyInput.disabled = true;
      hyrDownlightHint.textContent = "";
      return;
    }
    const areaM2 = pick.spec.mm * pick.lMm / 1e6;
    const mode = PORCH_DOWNLIGHT_MODES.find((item) => item.id === hyrDownlightModeSelect.value) || PORCH_DOWNLIGHT_MODES[0];
    const catalogQty = Math.max(1, Math.ceil(areaM2 / 1.4));
    const rec = (m) => (m.id === "catalog" ? catalogQty : recommendDownlights(m, "30", areaM2, hyrDownlightSelect.value).qty);
    hyrDownlightHint.textContent = `지붕 면적 ${areaM2.toFixed(1)}㎡ 기준 추천: 패널당 1개 ${catalogQty}개 · 휴식·일반 약 50lx ${rec(PORCH_DOWNLIGHT_MODES[2])}개 · 식사·파티 약 100lx ${rec(PORCH_DOWNLIGHT_MODES[3])}개`;
    if (mode.id === "manual") {
      hyrDownlightQtyInput.disabled = false;
      if (!hyrDownlightQtyInput.value) hyrDownlightQtyInput.value = String(catalogQty);
    } else {
      hyrDownlightQtyInput.disabled = true;
      hyrDownlightQtyInput.value = String(rec(mode));
    }
  }

  function buildHyrPreviewModel(result) {
    const { spec } = result.pick;
    const wallMount = result.mount === "wall";
    const ceilingType = hyrCeilingTypeSelect.value;
    const hasCeiling = ceilingType !== "none";
    const ceilingColor = PORCH_CEILING_COLORS.find((item) => item.id === hyrCeilingColorSelect.value) || PORCH_CEILING_COLORS[0];
    const grade = HYR_CEILING_GRADES.find((item) => item.id === hyrCeilingGradeSelect.value) || HYR_CEILING_GRADES[0];
    const lineLight = hasCeiling && hyrCeilingLineToggle.checked;
    const downlights = hyrDownlightSelect.value !== "none" ? Math.max(1, Math.round(porchReadNumber(hyrDownlightQtyInput, 4))) : 0;
    const shade = hyrShadeSelect.value !== "none" && (spec.kind === "single" || spec.kind === "double") ? hyrShadeSelect.value : null;
    const panels = Math.max(0, Math.round(porchReadNumber(hyrPanelQtyInput, 0)));
    const movingPosts = Math.max(0, Math.round(porchReadNumber(hyrMovingPostInput, 0)));
    const lightingFace = hyrLightingFaceToggle.checked && !!HYR_LIGHTING_FACE[result.pick.wKey];
    const glassIds = result.glassFaces.map((face) => face.id);
    const faces = {};
    PORCH_FACES.forEach((face) => {
      faces[face.id] = {
        label: face.label,
        finish: wallMount && face.id === "back" ? "building" : glassIds.includes(face.id) ? "glass" : "open",
        panels: Math.max(2, Math.round((face.axis === "W" ? result.reqW : result.reqL) / 700)),
        flap: "none",
        curtain: null,
        screen: null
      };
    });
    let photo;
    let photoCaption;
    const glassCount = glassIds.length;
    if (cfg.glass) {
      const byCount = { 1: ["agp-attached-1face", "유리 1면 (카탈로그 P.1126)"], 2: ["agp-attached-2face", "유리 2면 (카탈로그 P.1129)"], 3: ["agp-wall-3glass", "유리 3면 (카탈로그 P.1127)"], 4: ["agp-all4-night", "유리 4면 (카탈로그 P.1129)"] };
      const pick = byCount[Math.min(4, Math.max(1, glassCount))];
      photo = PREVIEW_IMG + pick[0] + ".jpg";
      photoCaption = `참고 사진 · 올글라스포치 ${pick[1]} 시공 예와 유사한 구성`;
    } else if (shade) {
      photo = PREVIEW_IMG + "hyr-shade.jpg";
      photoCaption = "참고 사진 · 홈야드루프Ⅱ + 로프식 개폐 셰이드 (카탈로그 P.1161)";
    } else if (wallMount && hasCeiling) {
      photo = PREVIEW_IMG + "hyr-wall-ceiling.jpg";
      photoCaption = "참고 사진 · 벽부착형, 내천정 보드 (카탈로그 P.1162)";
    } else if (hasCeiling && (downlights || lightingFace || lineLight)) {
      photo = PREVIEW_IMG + "hyr-night-lighting.jpg";
      photoCaption = "참고 사진 · 내천정 + 조명 야간 (카탈로그 P.1127)";
    } else if (hasCeiling) {
      photo = PREVIEW_IMG + "hyr-ceiling.jpg";
      photoCaption = "참고 사진 · 내천정 에버아트보드 (카탈로그 P.1161)";
    } else {
      photo = HYR_IMG + (spec.kind === "double" ? "homeyard-roof-double.jpg" : "homeyard-roof.jpg");
      photoCaption = `참고 사진 · 홈야드루프Ⅱ ${spec.kind === "double" ? "더블" : "싱글"} 사양 (카탈로그 P.1166)`;
    }
    const legend = [
      `${wallMount ? "벽부착형" : "독립형"} · ${spec.label}`,
      glassCount ? `유리 ${glassCount}면 (${result.glassFaces.map((face) => face.label).join("·")})` : "",
      hasCeiling ? `내천정 ${grade.label.replace("에버아트보드 ", "")} · ${ceilingColor.label}` : "",
      lineLight ? "라인라이트" : "",
      downlights ? `다운라이트 ${downlights}개` : "",
      lightingFace ? "라이팅 페이스" : "",
      shade ? `로프식 셰이드 · ${shade === "canvas" ? "캔버스" : "셰이드넷"}` : "",
      panels ? `디자인 패널 ${panels}장` : "",
      movingPosts ? `이동주 ${movingPosts}본` : "",
      result.roof.id === "brown_smoke" ? "지붕 브라운 스모크" : ""
    ];
    return {
      widthMm: result.reqW,
      depthMm: result.reqL,
      heightMm: result.pick.height.mm,
      frameColorId: result.color.id,
      glassTint: "standard",
      roof: { tint: result.roof.id, ceilingSwatch: hasCeiling ? ceilingColor.swatch : null, lineLight, double: spec.kind === "double", r: spec.kind === "singleR", shade, panels, lightingFace },
      faces,
      downlights,
      photo,
      photoCaption,
      legend
    };
  }

  function renderHyr() {
    syncHyrDownlight();
    const result = calculateHyr();
    renderHyrMedia(result);
    renderStructurePreview(hyrPreview, result.valid ? buildHyrPreviewModel(result) : null);
    hyrWarning.innerHTML = result.warnings.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    hyrWarning.hidden = !result.warnings.length;
    if (!result.valid) {
      hyrSpecSummary.textContent = "구성 불가";
      hyrLastLines = [];
      hyrBreakdown.innerHTML = `<tr><td colspan="2" class="porch-breakdown__empty">경고 내용을 확인하고 치수를 조정해 주세요.</td></tr>`;
      hyrTotalKrw.textContent = formatCurrency(0);
      hyrInstallKrw.textContent = formatCurrency(0);
      hyrGrandTotal.textContent = formatCurrency(0);
      hyrAddButton.disabled = true;
      return;
    }
    hyrSpecSummary.textContent = `폭 ${formatNumber(result.reqW)} × 길이 ${formatNumber(result.reqL)} × 높이 ${formatNumber(result.reqH)}mm → ${result.specLabel}${result.glassFaces.length ? ` · 유리 ${result.glassFaces.map((face) => face.label).join('·')}` : ""}`;
    hyrLastLines = result.lines;
    hyrBreakdown.innerHTML = porchBreakdownRows(result.lines);
    hyrTotalKrw.textContent = formatCurrency(result.materialKrw);
    hyrInstallKrw.textContent = formatCurrency(result.installFee);
    hyrGrandTotal.textContent = formatCurrency(result.total);
    hyrAddButton.disabled = false;
  }

  function buildHyrForm() {
    const option = (value, label) => `<option value="${value}">${escapeHtml(label)}</option>`;
    hyrHeightSelect.innerHTML = cfg.heights.map((mm) => option(mm, `${formatNumber(mm)}mm`)).join("");
    hyrMountSelect.innerHTML = option("free", "독립형 (4기둥)") + option("wall", "벽부착형 (건물 벽에 고정)");
    hyrRoofPrefSelect.innerHTML = HYR_ROOF_PREFS.map((item) => option(item.id, item.label)).join("");
    hyrRoofSelect.innerHTML = PORCH_ROOF_MATERIALS.map((item) => option(item.id, item.label)).join("");
    createSwatchPicker(hyrRoofSelect, PORCH_ROOF_MATERIALS);
    hyrColorSelect.innerHTML = HYR_COLORS.map((item) => option(item.id, item.label)).join("");
    createSwatchPicker(hyrColorSelect, HYR_COLORS);
    hyrCeilingTypeSelect.innerHTML = PORCH_CEILING_TYPES.map((item) => option(item.id, item.label)).join("");
    hyrCeilingGradeSelect.innerHTML = HYR_CEILING_GRADES.map((item) => option(item.id, item.label)).join("");
    hyrCeilingColorSelect.innerHTML = PORCH_CEILING_COLORS.map((item) => option(item.id, item.label)).join("");
    createSwatchPicker(hyrCeilingColorSelect, PORCH_CEILING_COLORS);
    hyrDownlightSelect.innerHTML = PORCH_DOWNLIGHTS.map((item) => option(item.id, item.label)).join("");
    hyrDownlightModeSelect.innerHTML = PORCH_DOWNLIGHT_MODES.map((item) => option(item.id, item.id === "catalog" ? "면적 기준 (패널당 1개)" : item.label)).join("");
    hyrDownlightModeSelect.value = "catalog";
    hyrShadeSelect.innerHTML = HYR_SHADE_OPTIONS.map((item) => option(item.id, item.label)).join("");
    createSwatchPicker(hyrShadeSelect, HYR_SHADE_OPTIONS);
    hyrShadeColorSelect.innerHTML = HYR_CANVAS_COLORS.map((color) => option(color, color)).join("");
    hyrPanelSelect.innerHTML = HYR_DESIGN_PANELS.map((item) => option(item.id, item.label)).join("");
    hyrCustomOptions.innerHTML = Array.from({ length: PORCH_CUSTOM_OPTION_COUNT }, (_, index) => `
      <div class="porch-option-row" data-porch-option>
        <input type="text" placeholder="옵션 ${index + 1} 명칭" data-porch-option-label>
        <input type="text" inputmode="numeric" placeholder="원화 금액" data-porch-option-krw>
      </div>
    `).join("");
    hyrInstallFeeInput.value = String(cfg.defaultInstall);
    if (cfg.glass) {
      hyrGlassFaces.innerHTML = PORCH_FACES.map((face) => `
        <label class="toggle-line"><input type="checkbox" data-glass-face="${face.id}"${face.id === "front" ? " checked" : ""}><span>${face.label} <small>(${face.axis === "W" ? "폭" : "길이"} 기준)</small></span></label>
      `).join("");
    }
    hyrPanelQtyInput.value = "0";
    hyrMovingPostInput.value = "0";
    hyrMovingPostGutterInput.value = "0";
  }

  hyrForm.addEventListener("input", renderHyr);
  hyrForm.addEventListener("change", renderHyr);
  hyrForm.addEventListener("submit", (event) => event.preventDefault());

  hyrAddButton.addEventListener("click", () => {
    const result = calculateHyr();
    if (!result.valid) return;
    const specParts = [
      `폭 ${formatNumber(result.reqW)} × 길이 ${formatNumber(result.reqL)} × 높이 ${formatNumber(result.reqH)}mm`,
      result.specLabel,
      result.glassFaces.length ? `유리 ${result.glassFaces.map((face) => face.label).join("·")}` : "",
      result.color.label.replace(/ \(.*\)$/, ""),
      result.roof.label.replace(/ \(.*\)$/, "")
    ].filter(Boolean);
    quoteItems.push({
      category: cfg.category,
      name: cfg.name,
      spec: specParts.join(" / "),
      image: cfg.image,
      materialLabel: `세트 구성 · ${formatCurrency(result.materialKrw)}`,
      installLabel: result.installFee > 0 ? `기본 시공 · ${formatCurrency(result.installFee)}` : "미반영",
      quantity: 1,
      quantityUnit: "EA",
      materialAmount: result.materialKrw,
      installAmount: result.installFee,
      totalAmount: result.total,
      breakdown: result.lines
        .filter((line) => !line.included || line.image || line.separate)
        .map((line) => ({ label: line.label, krw: line.krw, included: !!line.included, separate: !!line.separate, image: line.image || "" }))
    });
    saveQuoteItems();
    renderCartList();
    renderPrintQuote();
    updateTotals();
    switchView("cart");
  });

  SPECIAL_PRODUCTS.push({ id: cfg.id, label: cfg.name, panel: cfg.panel });
  buildHyrForm();
  renderHyr();
}

createHyrConfigurator({
  id: "homeyardroof2",
  prefix: "hyr",
  name: "홈야드루프Ⅱ",
  category: "특별제작품 / (홈야드루프Ⅱ)",
  panel: "#hyrConfigurator",
  image: HYR_IMG + "homeyard-roof.jpg",
  heights: [2450, 3000, 3700],
  glass: false,
  defaultInstall: HYR_DEFAULT_INSTALL
});
createHyrConfigurator({
  id: "homeyardroofglass",
  prefix: "hyg",
  name: "홈야드루프 글라스 시스템",
  category: "특별제작품 / (홈야드루프 글라스 시스템)",
  panel: "#hygConfigurator",
  image: HYR_IMG + "porch-glass.jpg",
  heights: [2450, 3000],
  glass: true,
  defaultInstall: HYR_DEFAULT_INSTALL
});
buildSpecialProductSelect();
showSpecialProduct(specialProductSelect.value);
