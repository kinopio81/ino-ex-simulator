/*
  특별제작품 (인디오더) 구성 시뮬레이터
  ------------------------------------------------
  - 제품 레지스트리(SPECIAL_PRODUCTS)에 제품을 추가하면 Step 1-2 선택지에 자동으로 나타납니다.
  - 등록 제품: 올글라스포치Ⅱ 슬라이드 시스템 (타카쇼 PROEX2026)
    데이터 출처 (카탈로그 인쇄 페이지, PDF 텍스트 레이어에서 직접 추출)
      P.1130~1131 세트 단가 / 유리문 그레이 가산   P.1132 프레임타입 가산
      P.1137 벽면세트 / 외부키                    P.1139 플랩스크린   P.1141 슬라이드스크린
      P.1142 내천정 (표준 / 통기구 / 라인라이트)   P.1143 추천 다운라이트 3종
      P.1144 방충망                               P.1145 틈새조정재 / 벽기대기 부재
      P.1150~1153 치수도 / 조명 참고 배치         P.1352 비엔타 커튼
      P.303~304 에버아트보드 일반                  P.331 에버아트보드 시크 / 레조넌스
    원화 환산: 엔화 × JPY_TO_KRW (현재 10배). 화면에는 원화만 표시합니다.
*/

const JPY_TO_KRW = 10;

const SPECIAL_PRODUCTS = [
  { id: "glassporch2", label: "올글라스포치Ⅱ 슬라이드 시스템", panel: "#porchConfigurator" }
];

const OPT_IMG = "assets/options/";

// 규격 단계. mm = 절단 기준 호칭, actual = 본체 실치수
const PORCH_SIZE_STEPS = {
  width: [
    { key: "30", mm: 3000, actual: 3033, label: "정면 3,000형" },
    { key: "37", mm: 3700, actual: 3737, label: "정면 3,700형" },
    { key: "44", mm: 4400, actual: 4435, label: "정면 4,400형" }
  ],
  depth: [
    { key: "24", mm: 2400, actual: 2454, label: "깊이 2,400형" },
    { key: "31", mm: 3100, actual: 3153, label: "깊이 3,100형" }
  ],
  height: [
    { key: "H25", mm: 2500, label: "높이 2,500" },
    { key: "H27", mm: 2700, label: "높이 2,700" }
  ]
};

const PORCH_FRONT_DOOR_COUNT = { "30": 4, "37": 5, "44": 6 };
const PORCH_SIDE_DOOR_COUNT = { "24": 3, "31": 4 };

const PORCH_LAYOUT_LABELS = {
  basic3: "기본 3면 (정면 + 양측면)",
  front1: "정면 1면",
  side1: "측면 1면",
  frontSide: "정면 + 측면 1면",
  side2: "측면 2면",
  all4: "4면 전체"
};

// 세트 가격표 (엔). key: depth-width. heatCut = 지붕 브라운 스모크(열선컷) 폴리카 가산액
const PORCH_SET_PRICES = {
  "24-30": {
    H25: { basic3: 4652100, front1: 2552100, side1: 2210000, frontSide: 3602700, side2: 3260600, all4: 6046000 },
    H27: { basic3: 4773200, front1: 2607200, side1: 2245300, frontSide: 3690700, side2: 3328800, all4: 6219600 },
    heatCut: { basic3: 62300, other: 61100 }
  },
  "24-37": {
    H25: { basic3: 5120300, front1: 3020600, side1: 2336700, frontSide: 4071200, side2: 3387300, all4: 6856300 },
    H27: { basic3: 5258400, front1: 3092600, side1: 2372000, frontSide: 4176100, side2: 3455500, all4: 7063700 },
    heatCut: { basic3: 73600, other: 72100 }
  },
  "24-44": {
    H25: { basic3: 5522000, front1: 3422500, side1: 2514200, frontSide: 4473100, side2: 3564800, all4: 7482600 },
    H27: { basic3: 5671200, front1: 3505600, side1: 2549500, frontSide: 4589100, side2: 3633000, all4: 7712200 },
    heatCut: { basic3: 79800, other: 78100 }
  },
  "31-30": {
    H25: { basic3: 5594600, front1: 2631000, side1: 2720900, frontSide: 4113600, side2: 4203500, all4: 6988900 },
    H27: { basic3: 5732500, front1: 2686100, side1: 2764500, frontSide: 4209900, side2: 4288300, all4: 7179100 },
    heatCut: { basic3: 65100, other: 63500 }
  },
  "31-37": {
    H25: { basic3: 6072200, front1: 3108800, side1: 2856900, frontSide: 4591400, side2: 4339500, all4: 7808500 },
    H27: { basic3: 6226900, front1: 3180800, side1: 2900500, frontSide: 4704600, side2: 4424300, all4: 8032500 },
    heatCut: { basic3: 77500, other: 75700 }
  },
  "31-44": {
    H25: { basic3: 6482200, front1: 3519000, side1: 3042700, frontSide: 5001600, side2: 4525300, all4: 8443100 },
    H27: { basic3: 6648100, front1: 3602100, side1: 3086300, frontSide: 5125900, side2: 4610100, all4: 8689300 },
    heatCut: { basic3: 82600, other: 80600 }
  }
};

// 유리문 세트 1개당 가산액 (엔). front = 정면 방향 양개, side = 깊이 방향 편개
const PORCH_GREY_SURCHARGE = {
  front: { 4: { H25: 110500, H27: 111200 }, 5: { H25: 144300, H27: 145400 }, 6: { H25: 153100, H27: 154900 } },
  side: { 3: { H25: 95100, H27: 95800 }, 4: { H25: 134000, H27: 135300 } }
};
const PORCH_FRAME_SURCHARGE = {
  front: { 4: { H25: 494400, H27: 499100 }, 5: { H25: 616800, H27: 621700 }, 6: { H25: 723400, H27: 730500 } },
  side: { 3: { H25: 392200, H27: 397300 }, 4: { H25: 516800, H27: 521200 } }
};
const PORCH_OUTER_KEY = { front: 69000, side: 51000 };

const PORCH_GLASS_TYPES = [
  { id: "standard", label: "표준 · 스텐컬러", image: "" },
  { id: "grey", label: "표준 · 그레이 (가산)", image: "" },
  { id: "frame", label: "프레임타입 · 그레이 (가산)", image: OPT_IMG + "frame-type.jpg" }
];

// 면 마감 (엔). W = 정면 방향(정면/배면), D = 깊이 방향(좌/우측면)
const PORCH_WALL_SET = {
  W: { "30": { H25: 816500, H27: 833800 }, "37": { H25: 869800, H27: 904000 }, "44": { H25: 1144400, H27: 1146400 } },
  D: { "24": { H25: 691800, H27: 719000 }, "31": { H25: 865900, H27: 899900 } }
};
const PORCH_FLAP_SCREEN = {
  grid: {
    W: { "30": { H25: 1427100, H27: 1464700 }, "37": { H25: 1657300, H27: 1694900 }, "44": { H25: 1754400, H27: 1792000 } },
    D: { "24": { H25: 1082000, H27: 1119200 }, "31": { H25: 1510600, H27: 1548200 } }
  },
  board: {
    W: { "30": { H25: 1588800, H27: 1637500 }, "37": { H25: 1691500, H27: 1739300 }, "44": { H25: 1980600, H27: 2028700 } },
    D: { "24": { H25: 1142800, H27: 1187400 }, "31": { H25: 1673800, H27: 1722500 } }
  }
};
const PORCH_SLIDE_SCREEN = {
  textile: {
    W: { "30": { H25: 1317800, H27: 1390400 } },
    D: { "24": { H25: 1289200, H27: 1358500 }, "31": { H25: 1317800, H27: 1386000 } }
  },
  board: {
    W: { "30": { H25: 949800, H27: 1022600 } },
    D: { "24": { H25: 918400, H27: 990100 }, "31": { H25: 948700, H27: 1019200 } }
  }
};

const PORCH_FACES = [
  { id: "front", label: "정면", axis: "W" },
  { id: "back", label: "배면", axis: "W" },
  { id: "left", label: "좌측면", axis: "D" },
  { id: "right", label: "우측면", axis: "D" }
];

const PORCH_FACE_FINISHES = [
  { id: "open", label: "개방", image: "" },
  { id: "glass", label: "유리문", image: "" },
  { id: "wall", label: "벽면세트 (에버아트보드)", image: OPT_IMG + "wall-set.jpg" },
  { id: "slideTextile", label: "슬라이드스크린 · 텍스타일", image: OPT_IMG + "slide-screen-textile.jpg" },
  { id: "slideBoard", label: "슬라이드스크린 · 아트보드", image: OPT_IMG + "slide-screen-board.jpg" }
];

// 플랩스크린: 본체 앞 전용 기둥·도리에 설치되므로 어떤 마감의 면에도 추가 가능
const PORCH_FLAP_OPTIONS = [
  { id: "none", label: "없음" },
  { id: "grid", label: "알루미늄 격자 (루버)" },
  { id: "board", label: "아트보드 (전면 가림)" }
];

const PORCH_FRAME_COLORS = [
  { id: "brown_ebony", label: "브라운 에보니 (표준)", madeToOrder: false },
  { id: "dark_pine", label: "다크 파인 (표준)", madeToOrder: false },
  { id: "natural_pine", label: "내추럴 파인 (표준)", madeToOrder: false },
  { id: "white_pine", label: "화이트 파인 (표준)", madeToOrder: false },
  { id: "matte_black", label: "매트 블랙 (표준)", madeToOrder: false },
  { id: "black_ebony", label: "블랙 에보니 (주문생산)", madeToOrder: true },
  { id: "kyomachiya_grey", label: "쿄마치야 카키차 (주문생산)", madeToOrder: true },
  { id: "matte_dark_grey", label: "매트 다크 그레이 (주문생산)", madeToOrder: true },
  { id: "matte_light_grey", label: "매트 라이트 그레이 (주문생산)", madeToOrder: true },
  { id: "matte_white", label: "매트 화이트 (주문생산)", madeToOrder: true },
  { id: "rusty_copper", label: "러스티 코퍼 (주문생산)", madeToOrder: true }
];

const PORCH_ROOF_MATERIALS = [
  { id: "clear_matte", label: "클리어 매트 폴리카 (기본)" },
  { id: "brown_smoke", label: "브라운 스모크 폴리카 · 열선컷 (가산)" }
];

// 내천정 (엔). key: depth-width
const PORCH_CEILING = {
  std: {
    "24-30": { base: 469400, line: 739000, lineW: "15W" }, "24-37": { base: 476400, line: 747500, lineW: "15W" }, "24-44": { base: 606900, line: 950700, lineW: "18W" },
    "31-30": { base: 577600, line: 942300, lineW: "20W" }, "31-37": { base: 588800, line: 954800, lineW: "20W" }, "31-44": { base: 708200, line: 1162300, lineW: "25W" }
  },
  vent: {
    "24-30": { base: 498900, line: 755500, lineW: "15W" }, "24-37": { base: 506200, line: 763900, lineW: "15W" }, "24-44": { base: 644900, line: 974100, lineW: "18W" },
    "31-30": { base: 613800, line: 963800, lineW: "20W" }, "31-37": { base: 625600, line: 975900, lineW: "20W" }, "31-44": { base: 752500, line: 1191400, lineW: "25W" }
  }
};
const PORCH_CEILING_TYPES = [
  { id: "none", label: "없음" },
  { id: "std", label: "내천정 표준" },
  { id: "vent", label: "내천정 통기구 타입 (결로 저감)" }
];
const PORCH_CEILING_COLORS = [
  "블랙 에보니", "브라운 에보니", "다크 파인", "오간우드 내추럴", "아카시아", "매트 블랙",
  "자라", "자라 가는격자", "화이트 파인", "내추럴 파인", "트래버틴"
];

// 내천정 추천 다운라이트 (P.1143, 엔/개). 트랜스는 제외.
const PORCH_DOWNLIGHTS = [
  { id: "none", label: "없음", jpy: 0, image: "" },
  { id: "dl2", label: "다운라이트 2형 유니버설 · 브라운 (HBH-D02B, 60W급 3.7W 350lm)", jpy: 41800, image: OPT_IMG + "downlight-2.jpg" },
  { id: "dl3g", label: "다운라이트 3형 · 그레이시 골드 (HBH-D07G, 40W급 3.1W 155lm)", jpy: 31900, image: OPT_IMG + "downlight-3.jpg" },
  { id: "dl3b", label: "다운라이트 3형 · 브라운 (HBH-D07B, 40W급 3.1W 155lm)", jpy: 31900, image: OPT_IMG + "downlight-3.jpg" },
  { id: "dl5", label: "다운라이트 5형 글레어리스 · 브라운 (HBH-D05B, 20W급 3.5W 145lm)", jpy: 35200, image: OPT_IMG + "downlight-5.jpg" }
];
// 조명 참고 배치도(P.1152) 기준 권장 수량: 내천정 패널 1장당 1개
const PORCH_DOWNLIGHT_DEFAULT = { "30": 8, "37": 8, "44": 10 };

// 비엔타 커튼 (P.1352, 엔). 생지 1장 가격 [높이 구간][폭 구간] / 취부키트 1세트
const PORCH_CURTAIN = {
  fabric: [
    { maxHeight: 1000, label: "300~1000", narrow: 46200, wide: 76800 },
    { maxHeight: 2000, label: "1010~2000", narrow: 49500, wide: 80300 },
    { maxHeight: 2620, label: "2010~2620", narrow: 52800, wide: 84700 }
  ],
  kit: 29400,
  colors: ["화이트", "샌드", "그레이"]
};
const PORCH_CURTAIN_HEIGHT = { H25: 2300, H27: 2500 }; // 유리문 개구 높이 기준 (P.1133)

// 방충망 (P.1144, 엔)
const PORCH_SCREEN_DOOR = {
  body: {
    H25: { W30: 204100, W37: 220200, W44: 374300, D24: 181800, D31: 272500 },
    H27: { W30: 215200, W37: 228700, W44: 385700, D24: 192300, D31: 291200 }
  },
  fix: { W30: 23100, W37: 24100, W44: 25500, D24: 15000, D31: 15900 },
  stopper: { H25: { single: 21400, pair: 35600 }, H27: { single: 21600, pair: 36100 } },
  frameColors: ["블랙", "화이트"]
};

// 연결부자재 (P.1145, 엔)
const PORCH_GAP_ADJUSTER = { H25: 193100, H27: 232900 };
const PORCH_WALL_SPACER = [
  { id: "20", label: "벽기대기 부재 2,000형 (L=2000)", maxMm: 2000, jpy: 33900 },
  { id: "40", label: "벽기대기 부재 4,000형 (L=4000)", maxMm: 4000, jpy: 51400 },
  { id: "60", label: "벽기대기 부재 6,000형 (L=5996)", maxMm: 5996, jpy: 70300 }
];

// 에버아트보드 (엔/장). 일반: P.303~304 / 시크·레조넌스: P.331
const PORCH_BOARD_GRADES = [
  { id: "basic", label: "에버아트보드 일반", sizes: { b1820: 29300, b2440: 39500 } },
  { id: "chic", label: "에버아트보드 시크 시리즈", sizes: { b1820: 38100, b2440: 52100 } },
  { id: "resonance", label: "에버아트보드 시크 레조넌스 컬러", sizes: { b1820: 42300, b2440: 53500 } }
];
const PORCH_BOARD_SIZES = [
  { id: "b1820", label: "910×1820 (3mm)" },
  { id: "b2440", label: "910×2440 (3mm)" }
];

// 벽면세트 보드 산출 (기본): 910×2440 보드를 세워 1단 시공. 길이 ÷ 910 올림 장수, 표리 양면.
// 마지막 장의 자투리(폭 = 장수×910 − 길이)는 높이 부족분 견절재(마감재)로 재활용하고, 모자라면 보드를 추가한다.
const PORCH_WALL_HEIGHT = { H25: 2300, H27: 2500 };
function planWallBoards(lengthMm, heightMm, grade) {
  const perSide = Math.ceil(lengthMm / 910);
  const offcutWidth = perSide * 910 - lengthMm; // 한 면당 자투리 폭
  const shortfall = Math.max(0, heightMm - 2440); // 높이 부족분 (견절재 높이)
  const trimAreaNeeded = shortfall * lengthMm * 2; // 양면 견절재 면적
  const offcutArea = offcutWidth * 2440 * 2; // 양면 자투리 면적
  let extraBoards = 0;
  if (trimAreaNeeded > offcutArea) {
    extraBoards = Math.ceil((trimAreaNeeded - offcutArea) / (910 * 2440));
  }
  const count = perSide * 2 + extraBoards;
  return {
    perSide,
    count,
    offcutWidth,
    shortfall,
    trimAreaNeeded,
    offcutArea,
    extraBoards,
    jpy: grade.sizes.b2440 * count
  };
}

const PORCH_PRODUCT_NAME = "올글라스포치Ⅱ 슬라이드 시스템";
const PORCH_CATEGORY = "특별제작품 / (올글라스포치Ⅱ)";
const PORCH_IMAGE = "assets/products/image37.png";
const PORCH_DEFAULT_INSTALL = 4800000;
const PORCH_CUSTOM_OPTION_COUNT = 3;

const $ = (selector) => document.querySelector(selector);
const specialProductSelect = $("#specialProductSelect");
const porchForm = $("#porchForm");
const porchWidthInput = $("#porchWidth");
const porchDepthInput = $("#porchDepth");
const porchHeightSelect = $("#porchHeight");
const porchGlassTypeSelect = $("#porchGlassType");
const porchOuterKeyToggle = $("#porchOuterKey");
const porchFaceTable = $("#porchFaceTable");
const porchFaceMedia = $("#porchFaceMedia");
const porchWallBoardGradeSelect = $("#porchWallBoardGrade");
const porchFlapTable = $("#porchFlapTable");
const porchFlapMedia = $("#porchFlapMedia");
const porchFrameColorSelect = $("#porchFrameColor");
const porchRoofSelect = $("#porchRoof");
const porchCeilingTypeSelect = $("#porchCeilingType");
const porchCeilingLineToggle = $("#porchCeilingLine");
const porchCeilingColorSelect = $("#porchCeilingColor");
const porchCeilingMedia = $("#porchCeilingMedia");
const porchDownlightSelect = $("#porchDownlight");
const porchDownlightQtyInput = $("#porchDownlightQty");
const porchDownlightMedia = $("#porchDownlightMedia");
const porchCurtainFaces = $("#porchCurtainFaces");
const porchCurtainColorSelect = $("#porchCurtainColor");
const porchCurtainMedia = $("#porchCurtainMedia");
const porchScreenFaces = $("#porchScreenFaces");
const porchScreenColorSelect = $("#porchScreenColor");
const porchScreenMedia = $("#porchScreenMedia");
const porchGapToggle = $("#porchGapAdjuster");
const porchSpacerToggle = $("#porchWallSpacer");
const porchConnectMedia = $("#porchConnectMedia");
const porchBoardGradeSelect = $("#porchBoardGrade");
const porchBoardSelect = $("#porchBoardSize");
const porchBoardQtyInput = $("#porchBoardQty");
const porchBoardMedia = $("#porchBoardMedia");
const porchInstallToggle = $("#porchInstallToggle");
const porchInstallFeeInput = $("#porchInstallFee");
const porchCustomOptions = $("#porchCustomOptions");
const porchBreakdown = $("#porchBreakdown");
const porchSpecSummary = $("#porchSpecSummary");
const porchTotalKrw = $("#porchTotalKrw");
const porchInstallKrw = $("#porchInstallKrw");
const porchGrandTotal = $("#porchGrandTotal");
const porchAddButton = $("#porchAddButton");
const porchWarning = $("#porchWarning");

let porchDownlightQtyTouched = false;

function jpyToKrw(value) {
  return Math.round(value * JPY_TO_KRW);
}

function porchPickStep(axis, requestedMm) {
  const step = PORCH_SIZE_STEPS[axis].find((candidate) => candidate.mm >= requestedMm);
  if (!step) return { step: null, requestedMm, cut: false, over: true };
  return { step, requestedMm, cut: step.mm > requestedMm, over: false };
}

function porchReadNumber(input, fallback) {
  const parsed = parseQuantityValue(input.value, fallback);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function describeSize(axisResult) {
  const base = `${formatNumber(axisResult.requestedMm)}mm`;
  return axisResult.cut ? `${base} (${axisResult.step.label} 부재 절단)` : `${base} (${axisResult.step.label})`;
}

function mediaMarkup(image, caption) {
  if (!image) return "";
  return `<figure class="porch-media"><img src="${image}" alt="${escapeHtml(caption)}"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
}

function readFaces() {
  return PORCH_FACES.map((face) => ({
    ...face,
    finish: porchFaceTable.querySelector(`[data-face="${face.id}"] [data-face-finish]`).value,
    flap: porchFlapTable.querySelector(`[data-flap-face="${face.id}"]`).value,
    curtain: porchCurtainFaces.querySelector(`[data-curtain-face="${face.id}"]`).checked,
    screen: porchScreenFaces.querySelector(`[data-screen-face="${face.id}"]`).checked
  }));
}

function readCustomOptions() {
  return Array.from(porchCustomOptions.querySelectorAll("[data-porch-option]"))
    .map((row) => ({
      label: row.querySelector("[data-porch-option-label]").value.trim(),
      krw: porchReadNumber(row.querySelector("[data-porch-option-krw]"), 0)
    }))
    .filter((option) => option.label && option.krw > 0);
}

function calculatePorch() {
  const width = porchPickStep("width", porchReadNumber(porchWidthInput, 3000));
  const depth = porchPickStep("depth", porchReadNumber(porchDepthInput, 2400));
  const heightKey = porchHeightSelect.value;
  const height = PORCH_SIZE_STEPS.height.find((step) => step.key === heightKey);
  const glassType = PORCH_GLASS_TYPES.find((item) => item.id === porchGlassTypeSelect.value) || PORCH_GLASS_TYPES[0];
  const frameColor = PORCH_FRAME_COLORS.find((item) => item.id === porchFrameColorSelect.value) || PORCH_FRAME_COLORS[0];
  const roof = PORCH_ROOF_MATERIALS.find((item) => item.id === porchRoofSelect.value) || PORCH_ROOF_MATERIALS[0];
  const faces = readFaces();
  const installFee = porchInstallToggle.checked ? porchReadNumber(porchInstallFeeInput, PORCH_DEFAULT_INSTALL) : 0;
  const customOptions = readCustomOptions();

  const warnings = [];
  const lines = [];
  const push = (line) => lines.push({ krw: 0, ...line });

  if (width.over || depth.over) {
    if (width.over) warnings.push(`정면 폭 ${formatNumber(width.requestedMm)}mm는 단일 세트 최대 규격(4,400mm)을 넘습니다. 카탈로그에 올글라스포치Ⅱ 연동 구성은 없어 단일 세트 범위로 입력해 주세요.`);
    if (depth.over) warnings.push(`깊이 ${formatNumber(depth.requestedMm)}mm는 단일 세트 최대 규격(3,100mm)을 넘습니다.`);
    return { valid: false, warnings, lines, width, depth, height };
  }

  const wk = width.step.key;
  const dk = depth.step.key;
  const sizeKey = `${dk}-${wk}`;
  const priceTable = PORCH_SET_PRICES[sizeKey];
  const sizeLabel = `${width.step.label} × ${depth.step.label} × ${height.label}`;
  const faceSizeLabel = (face) => (face.axis === "W" ? width.step.label : depth.step.label);
  const faceMm = (face) => (face.axis === "W" ? width.step.actual : depth.step.actual);

  // ---- 유리문 면 조합 → 세트 타입
  const glassFaces = faces.filter((face) => face.finish === "glass");
  const frontGlass = glassFaces.filter((face) => face.axis === "W").length;
  const sideGlass = glassFaces.filter((face) => face.axis === "D").length;
  const layoutMap = { "1-2": "basic3", "1-0": "front1", "0-1": "side1", "1-1": "frontSide", "0-2": "side2", "2-2": "all4" };
  const layoutId = layoutMap[`${frontGlass}-${sideGlass}`];
  if (!layoutId) {
    warnings.push(
      frontGlass + sideGlass === 0
        ? "유리문이 한 면도 없는 구성은 카탈로그 세트 가격표에 없습니다. 최소 한 면을 유리문으로 지정해 주세요."
        : "정면과 배면을 모두 유리문으로 하면서 측면이 0~1면인 조합은 카탈로그 세트 가격표에 없습니다. (지원 조합: 기본 3면, 정면 1면, 측면 1면, 정면+측면, 측면 2면, 4면)"
    );
    return { valid: false, warnings, lines, width, depth, height };
  }

  const setKrw = jpyToKrw(priceTable[heightKey][layoutId]);
  const basic3Krw = jpyToKrw(priceTable[heightKey].basic3);
  const setCompare = layoutId === "basic3"
    ? ""
    : ` · 기본 3면 세트 ${formatCurrency(basic3Krw)} 대비 ${setKrw < basic3Krw ? "−" : "+"}${formatCurrency(Math.abs(setKrw - basic3Krw))} (유리문 ${glassFaces.map((face) => face.label).join("·")}만 포함)`;
  push({
    group: "본체",
    label: `세트 본체 (${sizeLabel} / ${PORCH_LAYOUT_LABELS[layoutId]})`,
    detail: `본체 실치수 정면 ${formatNumber(width.step.actual)} × 깊이 ${formatNumber(depth.step.actual)}mm · 기둥·프레임·지붕재·유리문(스텐컬러) 포함, 내천정·조명 미포함${setCompare}`,
    krw: setKrw
  });

  // ---- 유리문 세트별 가산
  const doorSets = glassFaces.map((face) => {
    const kind = face.axis === "W" ? "front" : "side";
    const count = kind === "front" ? PORCH_FRONT_DOOR_COUNT[wk] : PORCH_SIDE_DOOR_COUNT[dk];
    return { face, kind, count, label: `${face.label} ${kind === "front" ? "양개" : "편개"} ${count}장` };
  });
  push({
    group: "유리문",
    label: `유리문 ${doorSets.length}세트 · ${glassType.label}`,
    detail: doorSets.map((set) => set.label).join(" / ") + " · 세트 본체 가격에 포함",
    included: true,
    image: glassType.image
  });
  if (glassType.id === "grey" || glassType.id === "frame") {
    const table = glassType.id === "grey" ? PORCH_GREY_SURCHARGE : PORCH_FRAME_SURCHARGE;
    doorSets.forEach((set) => {
      push({
        group: "유리문",
        label: `${glassType.id === "grey" ? "그레이색 가산" : "프레임타입 가산"} · ${set.label}`,
        detail: glassType.id === "grey" ? "유리문 그레이색 가산액표 (P.1131)" : "프레임타입 가산액표 (P.1132), 유리문은 그레이색",
        krw: jpyToKrw(table[set.kind][set.count][heightKey])
      });
    });
  }
  if (porchOuterKeyToggle.checked) {
    doorSets.forEach((set) => {
      push({
        group: "유리문",
        label: `외부키 사양 변경 · ${set.face.label}`,
        detail: "내부키 → 외부키, 1면당 가산 (P.1137)",
        krw: jpyToKrw(PORCH_OUTER_KEY[set.kind])
      });
    });
  }

  // ---- 지붕
  if (roof.id === "brown_smoke") {
    push({
      group: "지붕",
      label: "지붕재 브라운 스모크 폴리카 (열선컷 타입) 가산",
      detail: "열선컷 지붕재 가산액 (P.1130~1131)",
      krw: jpyToKrw(layoutId === "basic3" ? priceTable.heatCut.basic3 : priceTable.heatCut.other)
    });
  } else {
    push({ group: "지붕", label: "지붕재 클리어 매트 폴리카", detail: "세트 본체 가격에 포함", included: true });
  }

  // ---- 면 마감 (벽면세트 / 슬라이드스크린)
  const wallGrade = PORCH_BOARD_GRADES.find((item) => item.id === porchWallBoardGradeSelect.value) || PORCH_BOARD_GRADES[0];
  faces.forEach((face) => {
    const axisKey = face.axis === "W" ? wk : dk;
    const faceLabel = `${face.label} (${faceSizeLabel(face)})`;
    if (face.finish === "wall") {
      push({
        group: "면 구성",
        label: `벽면세트 프레임 · ${faceLabel}`,
        detail: "해당 면 유리문 대신 설치 (세트 가격에서 이 면 유리문 제외됨) · 견절재·알루미늄 프레임, 전 부재 절단·타공 가공품, 보드 별도 산출 (P.1137)",
        krw: jpyToKrw(PORCH_WALL_SET[face.axis][axisKey][heightKey]),
        image: OPT_IMG + "wall-set.jpg"
      });
      const lengthMm = faceMm(face);
      const wallHeight = PORCH_WALL_HEIGHT[heightKey];
      const plan = planWallBoards(lengthMm, wallHeight, wallGrade);
      let trimNote;
      if (!plan.shortfall) {
        trimNote = `자투리 폭 ${formatNumber(plan.offcutWidth)}mm × 2,440 (면당 1장분) 발생 → 견절재·코너 마감에 재활용`;
      } else if (!plan.extraBoards) {
        trimNote = `높이 ${formatNumber(wallHeight)}mm 대비 부족 ${plan.shortfall}mm 견절재(양면 ${(plan.trimAreaNeeded / 1e6).toFixed(2)}㎡)는 자투리(폭 ${formatNumber(plan.offcutWidth)}mm, 양면 ${(plan.offcutArea / 1e6).toFixed(2)}㎡)로 충당 → 추가 보드 없음`;
      } else {
        trimNote = `높이 부족 ${plan.shortfall}mm 견절재(양면 ${(plan.trimAreaNeeded / 1e6).toFixed(2)}㎡) > 자투리(${(plan.offcutArea / 1e6).toFixed(2)}㎡) → 보드 ${plan.extraBoards}장 추가`;
      }
      push({
        group: "면 구성",
        label: `벽면 보드 · ${face.label} ${wallGrade.label} 910×2440 ${plan.count}장`,
        detail: `길이 ${formatNumber(lengthMm)}mm ÷ 910 → 면당 ${plan.perSide}장 세워 1단 × 표리 2면${plan.extraBoards ? ` + 견절재용 ${plan.extraBoards}장` : ""} · 장당 ${formatCurrency(jpyToKrw(wallGrade.sizes.b2440))} · ${trimNote}`,
        krw: jpyToKrw(plan.jpy),
        image: OPT_IMG + "everart-board.jpg"
      });
    } else if (face.finish === "slideTextile" || face.finish === "slideBoard") {
      const kind = face.finish === "slideTextile" ? "textile" : "board";
      const table = PORCH_SLIDE_SCREEN[kind][face.axis][axisKey];
      if (!table) {
        warnings.push(`${face.label} 슬라이드스크린은 ${faceSizeLabel(face)} 규격에 설정이 없습니다 (정면 3,000형 / 깊이 2,400형 / 깊이 3,100형만 가능).`);
      } else {
        push({
          group: "면 구성",
          label: `슬라이드스크린 ${kind === "textile" ? "텍스타일" : "아트보드"} · ${faceLabel}`,
          detail: "해당 면 유리문 대신 설치 (세트 가격에서 이 면 유리문 제외됨) · 완전 가림 미닫이, 외부키 타입 (P.1141)",
          krw: jpyToKrw(table[heightKey]),
          image: OPT_IMG + (kind === "textile" ? "slide-screen-textile.jpg" : "slide-screen-board.jpg")
        });
      }
    }
  });

  // ---- 플랩스크린 (모든 면에 추가 가능)
  faces.filter((face) => face.flap !== "none").forEach((face) => {
    const axisKey = face.axis === "W" ? wk : dk;
    const finish = PORCH_FACE_FINISHES.find((item) => item.id === face.finish);
    push({
      group: "플랩스크린",
      label: `플랩스크린 ${face.flap === "grid" ? "알루미늄 격자" : "아트보드"} · ${face.label} (${faceSizeLabel(face)})`,
      detail: `${finish ? finish.label : ""} 면 앞 전용 기둥·도리에 설치, 2장 1조 폴딩도어 (P.1139)`,
      krw: jpyToKrw(PORCH_FLAP_SCREEN[face.flap][face.axis][axisKey][heightKey]),
      image: OPT_IMG + "flap-screen.jpg"
    });
  });

  // ---- 프레임 색상
  push({
    group: "마감",
    label: `프레임 색상 · ${frameColor.label}`,
    detail: frameColor.madeToOrder ? "주문생산 색상, 납기 확인 필요 (가산 없음, 카탈로그 기준)" : "표준 색상",
    included: true
  });

  // ---- 내천정
  const ceilingType = porchCeilingTypeSelect.value;
  const lineLight = porchCeilingLineToggle.checked;
  let hasCeiling = false;
  if (ceilingType === "std" || ceilingType === "vent") {
    hasCeiling = true;
    const entry = PORCH_CEILING[ceilingType][sizeKey];
    const color = porchCeilingColorSelect.value;
    push({
      group: "내천정",
      label: `${ceilingType === "std" ? "내천정 표준" : "내천정 통기구 타입"}${lineLight ? " · 라인라이트 사양" : ""} · ${color}`,
      detail: lineLight
        ? `에버아트보드 유닛 천정 + LED 라인라이트 ${entry.lineW} (전구색) · 트랜스·코드 별도 (P.1142)`
        : "에버아트보드 유닛 천정, 견절재 없는 구조 (P.1142)",
      krw: jpyToKrw(lineLight ? entry.line : entry.base),
      image: OPT_IMG + (lineLight ? "ceiling-linelight.jpg" : "ceiling.jpg")
    });
  }

  // ---- 다운라이트
  const downlight = PORCH_DOWNLIGHTS.find((item) => item.id === porchDownlightSelect.value) || PORCH_DOWNLIGHTS[0];
  if (downlight.id !== "none") {
    const qty = Math.max(1, Math.round(porchReadNumber(porchDownlightQtyInput, PORCH_DOWNLIGHT_DEFAULT[wk])));
    if (!hasCeiling) warnings.push("다운라이트는 내천정 패널에 매립 설치됩니다. 내천정을 함께 선택해 주세요.");
    push({
      group: "조명",
      label: `${downlight.label} × ${qty}개`,
      detail: `내천정 추천 다운라이트 (P.1143) · 참고 배치 ${PORCH_DOWNLIGHT_DEFAULT[wk]}개 기준 (P.1152) · 트랜스·배선 별도`,
      krw: jpyToKrw(downlight.jpy * qty),
      image: downlight.image
    });
  }

  // ---- 비엔타 커튼
  const curtainFaces = faces.filter((face) => face.curtain);
  if (curtainFaces.length) {
    const curtainColor = porchCurtainColorSelect.value;
    const curtainHeight = PORCH_CURTAIN_HEIGHT[heightKey];
    const band = PORCH_CURTAIN.fabric.find((row) => curtainHeight <= row.maxHeight) || PORCH_CURTAIN.fabric[PORCH_CURTAIN.fabric.length - 1];
    curtainFaces.forEach((face) => {
      const innerMm = faceMm(face);
      const pieces = Math.max(2, Math.ceil(innerMm / 2000));
      const pieceWidth = innerMm / pieces;
      const fabric = pieceWidth <= 1000 ? band.narrow : band.wide;
      push({
        group: "커튼",
        label: `비엔타 커튼 ${curtainColor} · ${face.label} 생지 ${pieces}장 (폴 길이 약 ${formatNumber(Math.round(pieceWidth))}mm)`,
        detail: `높이 ${formatNumber(curtainHeight)}mm (${band.label}) × 폭 ${pieceWidth <= 1000 ? "250~1000" : "1010~2000"} 구간 단가 (P.1352)`,
        krw: jpyToKrw(fabric * pieces),
        image: OPT_IMG + "vienta-curtain.jpg"
      });
      push({
        group: "커튼",
        label: `커튼 취부키트 (레일 폴 2m·브라켓) · ${face.label} × ${pieces}세트`,
        detail: "JDA-P11S, 생지 1장당 키트 1세트 (P.1352)",
        krw: jpyToKrw(PORCH_CURTAIN.kit * pieces)
      });
    });
  }

  // ---- 방충망
  const screenFaces = faces.filter((face) => face.screen);
  const screenGlassFaces = screenFaces.filter((face) => face.finish === "glass");
  if (screenFaces.length !== screenGlassFaces.length) {
    warnings.push("방충망은 유리문 면에만 설치됩니다. 유리문이 아닌 면의 방충망 체크는 계산에서 제외했습니다.");
  }
  if (screenGlassFaces.length) {
    const screenColor = porchScreenColorSelect.value;
    screenGlassFaces.forEach((face) => {
      const code = face.axis === "W" ? `W${wk}` : `D${dk}`;
      push({
        group: "방충망",
        label: `방충망 본체세트 · ${face.label} (${faceSizeLabel(face)}, ${height.label}) · 프레임 ${screenColor}`,
        detail: "플리츠 방충망 (P.1144)",
        krw: jpyToKrw(PORCH_SCREEN_DOOR.body[heightKey][code]),
        image: OPT_IMG + "screen-door.jpg"
      });
      push({
        group: "방충망",
        label: `방충망 고정부재세트 · ${face.label} (${faceSizeLabel(face)})`,
        detail: "스텐컬러 (P.1144)",
        krw: jpyToKrw(PORCH_SCREEN_DOOR.fix[code])
      });
    });
    const axes = new Set(screenGlassFaces.map((face) => face.axis));
    let bars;
    if (screenGlassFaces.length === 1) bars = 2;
    else if (screenGlassFaces.length === 2) bars = axes.size === 2 ? 3 : 4;
    else bars = 4;
    const pairs = Math.floor(bars / 2);
    const singles = bars % 2;
    const stopper = PORCH_SCREEN_DOOR.stopper[heightKey];
    push({
      group: "방충망",
      label: `방충망 문받이틀 ${height.label} ${bars}본 (2본입 ×${pairs}${singles ? ` + 1본입 ×${singles}` : ""})`,
      detail: `${screenGlassFaces.length}면 설치 기준 산출, 본체색과 동일 색상 (P.1144)`,
      krw: jpyToKrw(stopper.pair * pairs + stopper.single * singles)
    });
  }

  // ---- 연결부자재
  push({
    group: "연결부자재",
    label: "바닥 고정 · 하부 레일 및 기둥 기초 앵커",
    detail: "세트 본체 포함. 기초 콘크리트(600×600)는 현장 시공 (P.1150)",
    included: true
  });
  if (porchGapToggle.checked) {
    push({
      group: "연결부자재",
      label: `틈새조정재 ${height.label}용 (좌우 1세트)`,
      detail: "본체와 건물 사이 98~128mm 틈새 막음, 본체색 동일 (P.1145)",
      krw: jpyToKrw(PORCH_GAP_ADJUSTER[heightKey]),
      image: OPT_IMG + "gap-adjuster.jpg"
    });
  }
  if (porchSpacerToggle.checked) {
    const spacer = PORCH_WALL_SPACER.find((item) => width.step.actual <= item.maxMm) || PORCH_WALL_SPACER[PORCH_WALL_SPACER.length - 1];
    push({
      group: "연결부자재",
      label: `${spacer.label} (정면 ${formatNumber(width.step.actual)}mm 기준 자동 선택)`,
      detail: "지붕과 외벽 사이 70~100mm 틈새 커버, 현장 절단 (P.1145)",
      krw: jpyToKrw(spacer.jpy),
      image: OPT_IMG + "wall-spacer.jpg"
    });
  }

  // ---- 에버아트보드 추가
  const boardGrade = PORCH_BOARD_GRADES.find((item) => item.id === porchBoardGradeSelect.value) || PORCH_BOARD_GRADES[0];
  const boardSize = PORCH_BOARD_SIZES.find((item) => item.id === porchBoardSelect.value) || PORCH_BOARD_SIZES[0];
  const boardQty = Math.max(0, Math.round(porchReadNumber(porchBoardQtyInput, 0)));
  if (boardQty > 0) {
    push({
      group: "에버아트보드",
      label: `${boardGrade.label} ${boardSize.label} × ${boardQty}장`,
      detail: boardGrade.id === "basic" ? "정번 컬러 기준 장당 단가, 별주 컬러는 별도 (P.303~304)" : "시크 시리즈 장당 단가 (P.331)",
      krw: jpyToKrw(boardGrade.sizes[boardSize.id] * boardQty),
      image: OPT_IMG + "everart-board.jpg"
    });
  }

  customOptions.forEach((option) => {
    push({ group: "옵션", label: option.label, detail: "수동 입력 옵션", krw: option.krw });
  });

  const materialKrw = lines.reduce((sum, line) => sum + line.krw, 0);

  return {
    valid: true,
    warnings,
    lines,
    width,
    depth,
    height,
    layoutId,
    glassType,
    frameColor,
    roof,
    faces,
    sizeLabel,
    materialKrw,
    installFee,
    total: materialKrw + installFee
  };
}

function renderMedia() {
  const faces = readFaces();
  const usedFinishes = [];
  faces.forEach((face) => {
    const finish = PORCH_FACE_FINISHES.find((item) => item.id === face.finish);
    if (finish && finish.image && !usedFinishes.some((item) => item.image === finish.image)) usedFinishes.push(finish);
  });
  const glassType = PORCH_GLASS_TYPES.find((item) => item.id === porchGlassTypeSelect.value);
  porchFaceMedia.innerHTML = (glassType && glassType.image ? mediaMarkup(glassType.image, glassType.label) : "")
    + usedFinishes.map((finish) => mediaMarkup(finish.image, finish.label)).join("")
    + (faces.some((face) => face.finish === "wall") ? mediaMarkup(OPT_IMG + "everart-board.jpg", "벽면 에버아트보드") : "");

  porchFlapMedia.innerHTML = faces.some((face) => face.flap !== "none") ? mediaMarkup(OPT_IMG + "flap-screen.jpg", "플랩스크린") : "";

  const ceilingType = porchCeilingTypeSelect.value;
  porchCeilingMedia.innerHTML = ceilingType === "none"
    ? ""
    : mediaMarkup(OPT_IMG + (porchCeilingLineToggle.checked ? "ceiling-linelight.jpg" : "ceiling.jpg"), porchCeilingLineToggle.checked ? "내천정 라인라이트 사양" : "내천정 에버아트보드");

  const downlight = PORCH_DOWNLIGHTS.find((item) => item.id === porchDownlightSelect.value);
  porchDownlightMedia.innerHTML = downlight && downlight.image ? mediaMarkup(downlight.image, downlight.label) : "";

  porchCurtainMedia.innerHTML = faces.some((face) => face.curtain) ? mediaMarkup(OPT_IMG + "vienta-curtain.jpg", "비엔타 커튼") : "";
  porchScreenMedia.innerHTML = faces.some((face) => face.screen) ? mediaMarkup(OPT_IMG + "screen-door.jpg", "올글라스포치 방충망") : "";

  porchConnectMedia.innerHTML = (porchGapToggle.checked ? mediaMarkup(OPT_IMG + "gap-adjuster.jpg", "틈새조정재") : "")
    + (porchSpacerToggle.checked ? mediaMarkup(OPT_IMG + "wall-spacer.jpg", "벽기대기 부재") : "");

  porchBoardMedia.innerHTML = Math.round(porchReadNumber(porchBoardQtyInput, 0)) > 0 ? mediaMarkup(OPT_IMG + "everart-board.jpg", "에버아트보드") : "";
}

function syncDownlightDefault() {
  const width = porchPickStep("width", porchReadNumber(porchWidthInput, 3000));
  if (!width.over && !porchDownlightQtyTouched) {
    porchDownlightQtyInput.value = String(PORCH_DOWNLIGHT_DEFAULT[width.step.key]);
  }
  porchDownlightQtyInput.disabled = porchDownlightSelect.value === "none";
}

function renderPorch() {
  syncDownlightDefault();
  renderMedia();
  const result = calculatePorch();

  porchWarning.innerHTML = result.warnings.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
  porchWarning.hidden = !result.warnings.length;

  if (!result.valid) {
    porchSpecSummary.textContent = "구성 불가";
    porchBreakdown.innerHTML = `<tr><td colspan="2" class="porch-breakdown__empty">경고 내용을 확인하고 구성을 조정해 주세요.</td></tr>`;
    porchTotalKrw.textContent = formatCurrency(0);
    porchInstallKrw.textContent = formatCurrency(0);
    porchGrandTotal.textContent = formatCurrency(0);
    porchAddButton.disabled = true;
    return;
  }

  porchSpecSummary.textContent = `정면 ${describeSize(result.width)} × 깊이 ${describeSize(result.depth)} × ${result.height.label} · ${PORCH_LAYOUT_LABELS[result.layoutId]}`;

  porchBreakdown.innerHTML = result.lines.map((line) => `
    <tr class="${line.included ? "is-included" : ""}">
      <td>
        <div class="porch-breakdown__row">
          ${line.image ? `<img class="porch-breakdown__thumb" src="${line.image}" alt="">` : ""}
          <div>
            <span class="porch-breakdown__group">${escapeHtml(line.group)}</span>
            <strong>${escapeHtml(line.label)}</strong>
            <small>${escapeHtml(line.detail || "")}</small>
          </div>
        </div>
      </td>
      <td>${line.included ? "포함" : formatCurrency(line.krw)}</td>
    </tr>
  `).join("");

  porchTotalKrw.textContent = formatCurrency(result.materialKrw);
  porchInstallKrw.textContent = formatCurrency(result.installFee);
  porchGrandTotal.textContent = formatCurrency(result.total);
  porchAddButton.disabled = false;
}

function buildSpecialProductSelect() {
  specialProductSelect.innerHTML = SPECIAL_PRODUCTS
    .map((product) => `<option value="${product.id}">${product.label}</option>`)
    .join("");
}

function showSpecialProduct(productId) {
  SPECIAL_PRODUCTS.forEach((product) => {
    const panel = document.querySelector(product.panel);
    if (panel) panel.hidden = product.id !== productId;
  });
}

function buildPorchForm() {
  const option = (value, label) => `<option value="${value}">${escapeHtml(label)}</option>`;
  porchHeightSelect.innerHTML = PORCH_SIZE_STEPS.height.map((step) => option(step.key, `${formatNumber(step.mm)}mm`)).join("");
  porchGlassTypeSelect.innerHTML = PORCH_GLASS_TYPES.map((item) => option(item.id, item.label)).join("");
  porchFrameColorSelect.innerHTML = PORCH_FRAME_COLORS.map((item) => option(item.id, item.label)).join("");
  porchRoofSelect.innerHTML = PORCH_ROOF_MATERIALS.map((item) => option(item.id, item.label)).join("");
  porchCeilingTypeSelect.innerHTML = PORCH_CEILING_TYPES.map((item) => option(item.id, item.label)).join("");
  porchCeilingColorSelect.innerHTML = PORCH_CEILING_COLORS.map((color) => option(color, color)).join("");
  porchDownlightSelect.innerHTML = PORCH_DOWNLIGHTS.map((item) => option(item.id, item.label)).join("");
  porchCurtainColorSelect.innerHTML = PORCH_CURTAIN.colors.map((color) => option(color, color)).join("");
  porchScreenColorSelect.innerHTML = PORCH_SCREEN_DOOR.frameColors.map((color) => option(color, color)).join("");
  porchBoardSelect.innerHTML = PORCH_BOARD_SIZES.map((item) => option(item.id, item.label)).join("");
  porchBoardGradeSelect.innerHTML = PORCH_BOARD_GRADES.map((item) => option(item.id, item.label)).join("");
  porchWallBoardGradeSelect.innerHTML = PORCH_BOARD_GRADES.map((item) => option(item.id, item.label)).join("");

  const defaults = { front: "glass", back: "open", left: "glass", right: "glass" };
  porchFaceTable.innerHTML = PORCH_FACES.map((face) => `
    <tr data-face="${face.id}">
      <th scope="row">${face.label}<small>${face.axis === "W" ? "정면 방향" : "깊이 방향"}</small></th>
      <td>
        <select data-face-finish>
          ${PORCH_FACE_FINISHES.map((finish) => `<option value="${finish.id}" ${defaults[face.id] === finish.id ? "selected" : ""}>${escapeHtml(finish.label)}</option>`).join("")}
        </select>
      </td>
    </tr>
  `).join("");

  porchFlapTable.innerHTML = PORCH_FACES.map((face) => `
    <tr>
      <th scope="row">${face.label}<small>${face.axis === "W" ? "정면 방향" : "깊이 방향"}</small></th>
      <td>
        <select data-flap-face="${face.id}">
          ${PORCH_FLAP_OPTIONS.map((item) => option(item.id, item.label)).join("")}
        </select>
      </td>
    </tr>
  `).join("");

  porchCurtainFaces.innerHTML = PORCH_FACES.map((face) => `
    <label class="toggle-line"><input type="checkbox" data-curtain-face="${face.id}"><span>${face.label}</span></label>
  `).join("");
  porchScreenFaces.innerHTML = PORCH_FACES.map((face) => `
    <label class="toggle-line"><input type="checkbox" data-screen-face="${face.id}"><span>${face.label}</span></label>
  `).join("");

  porchCustomOptions.innerHTML = Array.from({ length: PORCH_CUSTOM_OPTION_COUNT }, (_, index) => `
    <div class="porch-option-row" data-porch-option>
      <input type="text" placeholder="옵션 ${index + 1} 명칭" data-porch-option-label>
      <input type="text" inputmode="numeric" placeholder="원화 금액" data-porch-option-krw>
    </div>
  `).join("");
  porchInstallFeeInput.value = String(PORCH_DEFAULT_INSTALL);
  porchBoardQtyInput.value = "0";
}

specialProductSelect.addEventListener("change", () => showSpecialProduct(specialProductSelect.value));
porchForm.addEventListener("input", renderPorch);
porchForm.addEventListener("change", renderPorch);
porchForm.addEventListener("submit", (event) => event.preventDefault());
porchDownlightQtyInput.addEventListener("input", () => { porchDownlightQtyTouched = true; });
porchWidthInput.addEventListener("input", () => { porchDownlightQtyTouched = false; });

porchAddButton.addEventListener("click", () => {
  const result = calculatePorch();
  if (!result.valid) return;

  const faceSummary = result.faces.map((face) => {
    const finish = PORCH_FACE_FINISHES.find((item) => item.id === face.finish);
    const extras = [
      face.flap !== "none" ? `플랩스크린 ${face.flap === "grid" ? "격자" : "아트보드"}` : "",
      face.curtain ? "커튼" : "",
      face.screen && face.finish === "glass" ? "방충망" : ""
    ].filter(Boolean);
    return `${face.label} ${finish ? finish.label : ""}${extras.length ? ` (+${extras.join("·")})` : ""}`;
  }).join(", ");

  const specParts = [
    `정면 ${describeSize(result.width)}`,
    `깊이 ${describeSize(result.depth)}`,
    result.height.label,
    `유리문 ${result.glassType.label}`,
    faceSummary,
    result.frameColor.label.replace(/ \(.*\)$/, ""),
    result.roof.label.replace(/ \(.*\)$/, "")
  ];

  quoteItems.push({
    category: PORCH_CATEGORY,
    name: PORCH_PRODUCT_NAME,
    spec: specParts.join(" / "),
    image: PORCH_IMAGE,
    materialLabel: `세트 구성 · ${formatCurrency(result.materialKrw)}`,
    installLabel: result.installFee > 0 ? `기본 시공 · ${formatCurrency(result.installFee)}` : "미반영",
    quantity: 1,
    quantityUnit: "EA",
    materialAmount: result.materialKrw,
    installAmount: result.installFee,
    totalAmount: result.total,
    breakdown: result.lines
      .filter((line) => !line.included)
      .map((line) => ({ label: line.label, krw: line.krw }))
  });

  saveQuoteItems();
  renderCartList();
  renderPrintQuote();
  updateTotals();
  switchView("cart");
});

buildSpecialProductSelect();
buildPorchForm();
showSpecialProduct(specialProductSelect.value);
renderPorch();
