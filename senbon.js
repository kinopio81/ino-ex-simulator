/*
  특별제작품 #6: 천본격자 휀스 (타카쇼 에버아트우드 휀스 千本格子 시리즈)
  특별제작품 #7: 에버아트우드 판 붙임 휀스 (세로 판 붙임 / 밀착 세로 판 붙임 / 코다와리 판 — P.816~821, 같은 팩토리로 생성)
  ------------------------------------------------
  데이터 출처 (카탈로그 인쇄 페이지, PDF 텍스트 레이어에서 직접 추출)
    P.798~799 가격 매트릭스 / P.802~803 기둥 일체형(足付) 유닛 30×50 (틈 30·53), 코너 부재, 각도 자재 가림 코너
    P.804~805 바로크 유닛 / P.806~807 파사드 유닛 20×150 (틈 30·50)
    P.808~809 격자 유닛 30×50 (각주·엔드캡·벽부착 금구 별도) / P.810~811 리버서블 유닛 (엔드·센터·코너 기둥)
    P.812 W2000 대응 유닛 (75각 기둥·동연·캡) / P.814 현장 조립식 세트 (W990~3870, 기둥 포함)
  단가는 모두 엔화 × 10 = 원화. 래핑 컬러와 알루미늄 컬러(스텐컬러)로 가격이 나뉜다.
  시공비: 사용자 단가표 — 1m당 130,000원 (부자재 15,000 + 설치 인건비 100,000 + 경비 15,000), 유닛 종류 무관.
  산출 규칙
    · 기둥 일체형·바로크·파사드: 유닛 폭으로 스팬 수를 구해 기본형 1장 + 추가형 (n−1)장. 코너는 코너 부재(외/내/각도 자재) × 코너 수.
    · 격자 유닛: 패널 n장 + 각주 (n + 1 + 코너) 본 + 엔드캡 1세트 (+ 코너 부재, 벽부착 금구).
    · 리버서블: 패널 n장 + 엔드 기둥 2 + 센터 기둥 (n − 1 − 코너) + 코너 기둥 (코너) — 독립 기초 필수.
    · W2000 대응: 2,000 스팬마다 패널 2장 + 동연 1조, 75각 엔드 2 + 센터/코너 기둥, 캡 2개입 세트.
    · 현장 조립식 세트: W3870 → 2910 → 1950 → 990 순으로 총 길이를 채움 (H1800만).
  glassporch.js의 공용 함수(jpyToKrw, createSwatchPicker, mediaMarkup, porchResetControl, bindHoverPreviews 등)를 재사용한다.
*/

const SENBON_IMG = "assets/senbon/";
const SENBON_INSTALL_PER_M = 130000;

const SENBON_COLORS = [
  { id: "charcoal_grey", label: "차콜 그레이", finish: "wrap", hex: "#4a4a4c" },
  { id: "brown_ebony", label: "브라운 에보니", finish: "wrap", hex: "#5a3a2a" },
  { id: "dark_pine", label: "다크 파인", finish: "wrap", hex: "#6a4a3a" },
  { id: "natural_pine", label: "내추럴 파인", finish: "wrap", hex: "#b4824e" },
  { id: "stainless", label: "스텐컬러 (알루미늄)", finish: "alu", hex: "#c8c1b4" },
  { id: "black_ebony", label: "블랙 에보니 (수주생산)", finish: "wrap", hex: "#2b2622", madeToOrder: true },
  { id: "walnut", label: "월넛 (수주생산)", finish: "wrap", hex: "#4f3a2d", madeToOrder: true },
  { id: "redwood", label: "레드우드 (수주생산)", finish: "wrap", hex: "#8a4a30", madeToOrder: true },
  { id: "light_oak", label: "라이트 오크 (수주생산)", finish: "wrap", hex: "#c9a26c", madeToOrder: true },
  { id: "jarrah", label: "자라 (수주생산)", finish: "wrap", hex: "#7a3f2e", madeToOrder: true },
  { id: "acty_oak", label: "액티 오크 (수주생산)", finish: "wrap", hex: "#a0764f", madeToOrder: true },
  { id: "white_pine", label: "화이트 파인 (수주생산)", finish: "wrap", hex: "#e6ded0", madeToOrder: true },
  { id: "matte_black", label: "매트 블랙 (수주생산)", finish: "wrap", hex: "#2a2a2a", madeToOrder: true },
  { id: "matte_light_grey", label: "매트 라이트 그레이 (수주생산)", finish: "wrap", hex: "#9a9a98", madeToOrder: true },
  { id: "rusty_copper", label: "러스티 코퍼 (수주생산)", finish: "wrap", hex: "#7c4a35", madeToOrder: true }
].map((item) => ({ ...item, swatch: `${SENBON_IMG}colors/${item.id}.jpg` }));

const SENBON_CORNERS = [
  { id: "outer", label: "외코너 부재 (볼록 모서리)", short: "외코너 부재" },
  { id: "inner", label: "내코너 부재 (오목 모서리)", short: "내코너 부재" },
  { id: "free", label: "각도 자재 가림 코너 부재 (임의 각도)", short: "각도 자재 가림 코너" }
];

// 높이별 가격 테이블은 { H: [기본형, 추가형] } 또는 { H: 단가 } (엔)
const SENBON_TYPES = [
  {
    id: "ashitsuki", label: "기둥 일체형 유닛 30×50", short: "기둥 일체형", page: "P.802~803", kind: "basicAdd", pattern: "senbon", slatW: 30, postSize: 50,
    desc: "격자 30×50 + 기둥 일체(철심 보강). 기본형은 기둥 2본, 추가형은 기둥 1본 부착. 기둥을 지면에 매설",
    gaps: [
      { id: "g30", label: "격자 틈 30mm (W900)", unitW: 900, gap: 30, screen: 53, light: 47, vent: 47 },
      { id: "g53", label: "격자 틈 53mm (W1000)", unitW: 1000, gap: 53, screen: 40, light: 60, vent: 60 }
    ],
    heights: [1200, 1500, 1800, 2000, 2400],
    prices: {
      g30: { wrap: { 1200: [143900, 137500], 1500: [159700, 150500], 1800: [167200, 154600], 2000: [173700, 164300], 2400: [204500, 195300] },
             alu: { 1200: [114200, 107800], 1500: [120400, 110300], 1800: [139300, 123900], 2000: [145800, 131900], 2400: [158200, 144300] } },
      g53: { wrap: { 1200: [108500, 102500], 1500: [132600, 123400], 1800: [143800, 128000], 2000: [164300, 152000], 2400: [181400, 169100] },
             alu: { 1200: [84700, 77000], 1500: [99400, 90100], 1800: [124800, 104000], 2000: [131100, 110300], 2400: [142700, 127400] } }
    },
    corner: {
      outer: { wrap: { 1200: 25000, 1500: 30300, 1800: 31700, 2000: 36300, 2400: 45500 }, alu: { 1200: 19700, 1500: 24000, 1800: 25700, 2000: 31100, 2400: 39900 } },
      inner: { wrap: { 1200: 25000, 1500: 30300, 1800: 31700, 2000: 36300, 2400: 45500 }, alu: { 1200: 19700, 1500: 24000, 1800: 25700, 2000: 31100, 2400: 39900 } },
      free: { wrap: { 1200: 22200, 1500: 24700, 1800: 27100, 2000: 29500, 2400: 33300 }, alu: { 1200: 17300, 1500: 19700, 1800: 22200, 2000: 25900, 2400: 28300 } }
    }
  },
  {
    id: "baroque", label: "기둥 일체형 바로크 유닛", short: "바로크", page: "P.804~805", kind: "basicAdd", pattern: "baroque", slatW: 30, postSize: 50,
    desc: "30×50 격자와 20×150 판을 섞은 디자인 유닛. 래핑 컬러 5색만, 기둥 일체(철심 보강)",
    gaps: [{ id: "g53", label: "격자 틈 53mm (W1000)", unitW: 1000, gap: 53, screen: 47, light: 53, vent: 53 }],
    heights: [1800, 2000],
    colors: ["brown_ebony", "dark_pine", "natural_pine", "white_pine", "matte_black"],
    prices: { g53: { wrap: { 1800: [212100, 200600], 2000: [231500, 219900] }, alu: {} } },
    corner: {
      outer: { wrap: { 1800: 31700, 2000: 36300 }, alu: {} },
      inner: { wrap: { 1800: 31700, 2000: 36300 }, alu: {} },
      free: { wrap: { 1800: 27100, 2000: 29500 }, alu: {} }
    }
  },
  {
    id: "facade", label: "파사드 유닛 20×150", short: "파사드", page: "P.806~807", kind: "basicAdd", pattern: "facade", slatW: 150, postSize: 50,
    desc: "20×150 평판 격자로 깊이감 있는 파사드. 기본형에 단부재 동봉, 동연은 실버",
    gaps: [
      { id: "g30", label: "격자 틈 30mm (W400)", unitW: 400, gap: 30, screen: 44, light: 56, vent: 56 },
      { id: "g50", label: "격자 틈 50mm (W560)", unitW: 560, gap: 50, screen: 33, light: 67, vent: 67 }
    ],
    heights: [1350, 1500, 1800, 2000, 2400],
    prices: {
      g30: { wrap: { 1350: [173800, 145600], 1500: [188500, 149900], 1800: [218000, 169000], 2000: [287100, 199900], 2400: [359600, 273700] },
             alu: { 1350: [167400, 141900], 1500: [178100, 141900], 1800: [203000, 155800], 2000: [255500, 187400], 2400: [320700, 252500] } },
      g50: { wrap: { 1350: [174700, 146700], 1500: [190200, 151000], 1800: [219700, 160000], 2000: [288800, 200900], 2400: [361500, 275400] },
             alu: { 1350: [169000, 143500], 1500: [179200, 143500], 1800: [205000, 151600], 2000: [257400, 188600], 2400: [322800, 254100] } }
    },
    corner: null
  },
  {
    id: "unit", label: "격자 유닛 30×50 (각주 별도)", short: "격자 유닛", page: "P.808~809", kind: "panelPost", pattern: "senbon", slatW: 30, postSize: 60,
    desc: "격자 패널만 있는 유닛. 격자 유닛용 각주(기둥)와 엔드캡을 따로 더해 프리폴식으로 세움",
    gaps: [
      { id: "g30", label: "격자 틈 30mm (W1000)", unitW: 1000, gap: 30, screen: 57, light: 43, vent: 43 },
      { id: "g53", label: "격자 틈 53mm (W1020)", unitW: 1020, gap: 53, screen: 46, light: 54, vent: 54 }
    ],
    heights: [1350, 1800, 2000, 2500],
    prices: {
      g30: { wrap: { 1350: 125100, 1800: 149000, 2000: 179200, 2500: 243500 }, alu: { 1350: 86700, 1800: 105800, 2000: 131300, 2500: 173000 } },
      g53: { wrap: { 1350: 94800, 1800: 111800, 2000: 132800, 2500: 181500 }, alu: { 1350: 70700, 1800: 80100, 2000: 99200, 2500: 128900 } }
    },
    post: { wrap: { 1350: 22900, 1800: 27000, 2000: 27000, 2500: 43300 }, alu: { 1350: 21700, 1800: 24700, 2000: 24700, 2500: 39800 } },
    endCap: 3700,
    wallBracket: 3300,
    corner: {
      outer: { wrap: { 1350: 26900, 1800: 31700, 2000: 36300, 2500: 48000 }, alu: { 1350: 21700, 1800: 25700, 2000: 31000, 2500: 42000 } },
      inner: { wrap: { 1350: 26900, 1800: 31700, 2000: 36300, 2500: 48000 }, alu: { 1350: 21700, 1800: 25700, 2000: 31000, 2500: 42000 } },
      free: { wrap: { 1350: 23500, 1800: 27100, 2000: 29500, 2500: 35700 }, alu: { 1350: 18400, 1800: 22200, 2000: 25900, 2500: 31900 } }
    }
  },
  {
    id: "reversible", label: "리버서블 유닛 (양면 동일)", short: "리버서블", page: "P.810~811", kind: "reversible", pattern: "senbon", slatW: 30, postSize: 60,
    desc: "앞뒤가 같은 양면 마감. 격자와 같은 굵기의 엔드·센터·코너 기둥(30×60 / 60×60)으로 일체감 있는 라인. 블록 위 시공 불가, 독립 기초",
    gaps: [
      { id: "g30", label: "격자 틈 30mm (W870)", unitW: 870, gap: 30, screen: 54, light: 46, vent: 46 },
      { id: "g50", label: "격자 틈 50mm (W1170)", unitW: 1170, gap: 50, screen: 42, light: 58, vent: 58 }
    ],
    heights: [1350, 1500, 1800, 2000, 2400],
    prices: {
      g30: { wrap: { 1350: 122900, 1500: 137500, 1800: 157000, 2000: 173100, 2400: 235200 }, alu: { 1350: 91500, 1500: 103900, 1800: 117000, 2000: 132300, 2400: 167900 } },
      g50: { wrap: { 1350: 122900, 1500: 137500, 1800: 157900, 2000: 173800, 2400: 236700 }, alu: { 1350: 91500, 1500: 103900, 1800: 117600, 2000: 132700, 2400: 168100 } }
    },
    postEnd: { wrap: { 1350: 22200, 1500: 23600, 1800: 27200, 2000: 29600, 2400: 34000 }, alu: { 1350: 19700, 1500: 20500, 1800: 24200, 2000: 26600, 2400: 31600 } },
    postCenter: { wrap: { 1350: 23400, 1500: 26700, 1800: 30100, 2000: 34400, 2400: 35900 }, alu: { 1350: 20600, 1500: 25300, 1800: 27200, 2000: 31400, 2400: 32300 } },
    postCorner: { wrap: { 1350: 21600, 1500: 25300, 1800: 29400, 2000: 32300, 2400: 33900 }, alu: { 1350: 19300, 1500: 23600, 1800: 24500, 2000: 29400, 2400: 30100 } },
    wallBracket: 3300,
    corner: null
  },
  {
    id: "w2000", label: "W2000 대응 유닛 30×50", short: "W2000 대응", page: "P.812", kind: "w2000", pattern: "senbon", slatW: 30, postSize: 75,
    desc: "기둥 심간 2,000에 패널 2장을 거는 장스팬용. 75각 기둥과 W2000 동연(가로대)으로 시공성 향상",
    gaps: [{ id: "g53", label: "격자 틈 53mm (패널 W1000 × 2장 / 스팬)", unitW: 1000, gap: 53, screen: 46, light: 54, vent: 54 }],
    heights: [1500, 1800, 2000],
    prices: { g53: { wrap: { 1500: 103900, 1800: 110400, 2000: 128500 }, alu: { 1500: 77600, 1800: 80700, 2000: 99000 } } },
    rail2000: { wrap: 29600, alu: 20000 },
    rail1000: { wrap: 14800, alu: 9900 },
    postEnd: { wrap: { 1500: 28400, 1800: 29700, 2000: 31500 }, alu: { 1500: 21600, 1800: 25000, 2000: 26600 } },
    postCenter: { wrap: { 1500: 30000, 1800: 31500, 2000: 33200 }, alu: { 1500: 23600, 1800: 26600, 2000: 28400 } },
    postCorner: { wrap: { 1500: 30000, 1800: 31500, 2000: 33200 }, alu: { 1500: 23600, 1800: 26600, 2000: 28400 } },
    capSet: 2000,
    corner: null
  },
  {
    id: "siteset", label: "현장 조립식 세트 30×50", short: "현장 조립 세트", page: "P.814", kind: "siteset", pattern: "senbon", slatW: 30, postSize: 60,
    desc: "기둥(철심)·격자·커버·동연을 현장에서 조립하는 저가형 세트. W990 / 1950 / 2910 / 3870 × H1800, 기둥 매입 400",
    gaps: [{ id: "g50", label: "격자 틈 50mm", unitW: 990, gap: 50, screen: 46, light: 54, vent: 54 }],
    heights: [1800],
    sets: [
      { w: 3870, wrap: 469200, alu: 340300 },
      { w: 2910, wrap: 356700, alu: 260300 },
      { w: 1950, wrap: 243700, alu: 179000 },
      { w: 990, wrap: 130800, alu: 98300 }
    ],
    corner: null
  }
];

function senbonAssets(type, img = SENBON_IMG) {
  return { photo: `${img}${type.id}.jpg`, draw: `${img}${type.id}-draw.jpg` };
}

// ---- 판 붙임 계열 (P.816~821): 모두 격자 유닛과 같은 "패널 + 각주 + 엔드캡" 구조
const ITABARI_IMG = "assets/itabari/";
const ITABARI_COLORS = SENBON_COLORS.concat([
  { id: "rusty_copper_bamboo", label: "러스티 코퍼 + 에코 호랑이 대나무", finish: "wrap", hex: "#7c4a35", swatch: `${ITABARI_IMG}colors/rusty_copper_bamboo.jpg` },
  { id: "rusty_dark_bamboo", label: "러스티 다크 + 에코 호랑이 대나무", finish: "wrap", hex: "#4a3a30", swatch: `${ITABARI_IMG}colors/rusty_dark_bamboo.jpg` }
]);
const ITABARI_POST = { wrap: { 1500: 25200, 1800: 27000, 2000: 27000 }, alu: { 1500: 21700, 1800: 24700, 2000: 24700 } };
const ITABARI_FREE_CORNER = { wrap: { 1500: 24600, 1800: 28200, 2000: 30600 }, alu: { 1500: 22200, 1800: 25800, 2000: 28200 } };
const ITABARI_TATE_COLORS = ["brown_ebony", "dark_pine", "black_ebony", "natural_pine", "jarrah", "rusty_copper"];
const ITABARI_MITSU_COLORS = ["brown_ebony", "dark_pine", "black_ebony", "white_pine", "natural_pine", "jarrah", "rusty_copper", "stainless"];
const ITABARI_KODAWARI_COLORS = ["brown_ebony", "dark_pine", "black_ebony", "natural_pine", "jarrah", "rusty_copper"];
function itabariType(def) {
  const gap = { id: "std", label: def.gapLabel, unitW: def.unitW, gap: def.gap, screen: def.screen, light: 100 - def.screen, vent: 100 - def.screen };
  return {
    id: def.id, label: def.label, short: def.short, page: def.page, kind: "panelPost", pattern: "boards",
    boardWidths: def.boards, gapMm: def.gap, postSize: 50, alternateTone: !!def.alternate,
    desc: def.desc, gaps: [gap], heights: [1500, 1800, 2000], colors: def.colors,
    prices: { std: { wrap: def.wrap, alu: def.alu || {} } },
    post: ITABARI_POST, endCap: 3700, wallBracket: 3300,
    corner: def.outerInner
      ? { outer: { wrap: def.outerInner, alu: {} }, inner: { wrap: def.outerInner, alu: {} }, free: ITABARI_FREE_CORNER }
      : { free: ITABARI_FREE_CORNER }
  };
}
const ITABARI_TYPES = [
  itabariType({ id: "tate_80_40", label: "세로 판 붙임 80폭+40폭", short: "세로 판 80+40", page: "P.816", unitW: 1000, gap: 11.4, boards: [80, 40], screen: 85,
    gapLabel: "80폭·40폭 판 교대 · 틈 11.4 (W1000)", desc: "폭 80과 40의 에버아트우드 평판을 틈 11.4mm로 번갈아 세로로 붙인 유닛. 동연 3본, 래핑 컬러만", colors: ITABARI_TATE_COLORS,
    wrap: { 1500: 110000, 1800: 114700, 2000: 164100 } }),
  itabariType({ id: "tate_80_18", label: "세로 판 붙임 80폭+18폭", short: "세로 판 80+18", page: "P.817", unitW: 1000, gap: 11.8, boards: [80, 18], screen: 80,
    gapLabel: "80폭·18폭 판 교대 · 틈 11.8 (W1000)", desc: "폭 80 평판 사이에 가는 18폭 판을 틈 11.8mm로 끼운 유닛. 동연 3본, 래핑 컬러만", colors: ITABARI_TATE_COLORS,
    wrap: { 1500: 115200, 1800: 119400, 2000: 170000 } }),
  itabariType({ id: "tate_102_40", label: "세로 판 붙임 102폭+40폭", short: "세로 판 102+40", page: "P.817", unitW: 1000, gap: 12.3, boards: [102, 40], screen: 87,
    gapLabel: "102폭·40폭 판 교대 · 틈 12.3 (W1000)", desc: "폭 102와 40 평판을 틈 12.3mm로 번갈아 붙인 유닛. 동연 3본, 래핑 컬러만", colors: ITABARI_TATE_COLORS,
    wrap: { 1500: 112400, 1800: 116200, 2000: 168700 } }),
  itabariType({ id: "mitsu_80", label: "밀착 세로 판 붙임 80폭", short: "밀착 80폭", page: "P.818", unitW: 935, gap: 5, boards: [80], screen: 95,
    gapLabel: "80폭 판 밀착 (W935)", desc: "80폭 평판을 틈 5mm로 빽빽하게 붙여 면을 강조. 래핑·알루미늄 컬러", colors: ITABARI_MITSU_COLORS,
    wrap: { 1500: 128400, 1800: 131600, 2000: 137900 }, alu: { 1500: 91500, 1800: 94500, 2000: 99200 } }),
  itabariType({ id: "mitsu_40", label: "밀착 세로 판 붙임 40폭", short: "밀착 40폭", page: "P.819", unitW: 900, gap: 5, boards: [40], screen: 90,
    gapLabel: "40폭 판 밀착 (W900)", desc: "40폭 평판을 틈 5mm로 붙인 유닛. 래핑·알루미늄 컬러", colors: ITABARI_MITSU_COLORS,
    wrap: { 1500: 136100, 1800: 139300, 2000: 145500 }, alu: { 1500: 94500, 1800: 97600, 2000: 102200 } }),
  itabariType({ id: "mitsu_yamato", label: "밀착 세로 판 붙임 야마토 담", short: "밀착 야마토 담", page: "P.819", unitW: 896, gap: 5, boards: [80, 22], screen: 92, alternate: true,
    gapLabel: "80폭 앞판 + 뒤판 22 노출 (W896)", desc: "80폭 앞판 사이로 뒤판이 22mm씩 보이도록 앞뒤로 어긋나게 붙인 일본식 담(야마토 담). 틈 5mm. 러스티 컬러 + 에코 호랑이 대나무 2색", colors: ["rusty_copper_bamboo", "rusty_dark_bamboo"],
    wrap: { 1500: 118400, 1800: 124800, 2000: 135800 } }),
  itabariType({ id: "kodawari_tate", label: "코다와리 판 세로 붙임 유닛", short: "코다와리 판 세로 붙임", page: "P.820", unitW: 1000, gap: 25, boards: [100], screen: 82,
    gapLabel: "코다와리 판 100폭 · 틈 25 (W1000)", desc: "나무 결 요철이 깊은 폭 100 코다와리 판(프리미엄 판)을 틈 25mm로 세로로 붙인 상위 라인. 전용 외·내코너 부재", colors: ITABARI_KODAWARI_COLORS,
    wrap: { 1500: 103600, 1800: 118200, 2000: 141200 }, outerInner: { 1500: 39900, 1800: 46500, 2000: 51200 } }),
  itabariType({ id: "kodawari_yamato", label: "코다와리 판 야마토 담 유닛", short: "코다와리 판 야마토 담", page: "P.821", unitW: 1000, gap: 0, boards: [200, 50], screen: 90, alternate: true,
    gapLabel: "코다와리 판 200폭 앞뒤 겹침 (W1000)", desc: "폭 200 코다와리 판을 앞뒤로 어긋나게 붙여 뒤판이 50mm씩 보이는 야마토 담. 갓 부재에 코다와리 장인 대나무 사용. 전용 외·내코너 부재", colors: ["brown_ebony", "dark_pine", "black_ebony"],
    wrap: { 1500: 115000, 1800: 124800, 2000: 152900 }, outerInner: { 1500: 43200, 1800: 49700, 2000: 52800 } }),
  itabariType({ id: "kodawari_roji", label: "코다와리 판 골목 담 유닛", short: "코다와리 판 골목 담", page: "P.821", unitW: 993, gap: 0, boards: [150, 30], screen: 100, alternate: true,
    gapLabel: "코다와리 판 150폭 앞뒤 겹침 (W993)", desc: "폭 150 코다와리 판을 앞뒤로 30mm씩 겹쳐 붙인 가림률 100% 완전 차폐형(골목 담). 전용 외·내코너 부재", colors: ["dark_pine", "brown_ebony", "black_ebony"],
    wrap: { 1500: 156000, 1800: 180400, 2000: 196700 }, outerInner: { 1500: 51300, 1800: 59400, 2000: 65900 } })
];

function createSenbonConfigurator(cfg) {
  const TYPES = cfg.types || SENBON_TYPES;
  const COLORS = cfg.colors || SENBON_COLORS;
  const IMG = cfg.img || SENBON_IMG;
  const el = (name) => $(`#${cfg.prefix}${name}`);
  const snForm = el("Form");
  const snTypeSelect = el("Type");
  const snTypeMedia = el("TypeMedia");
  const snGapSelect = el("Gap");
  const snColorSelect = el("Color");
  const snHeightSelect = el("Height");
  const snLengthInput = el("Length");
  const snCornersInput = el("Corners");
  const snCornerTypeSelect = el("CornerType");
  const snCornerTypeField = el("CornerTypeField");
  const snWallBracketInput = el("WallBracket");
  const snWallBracketField = el("WallBracketField");
  const snHint = el("Hint");
  const snInstallToggle = el("InstallToggle");
  const snInstallRateInput = el("InstallRate");
  const snCustomOptions = el("CustomOptions");
  const snPreview = el("Preview");
  const snSpecSummary = el("SpecSummary");
  const snWarning = el("Warning");
  const snBreakdown = el("Breakdown");
  const snTotalKrw = el("TotalKrw");
  const snInstallKrw = el("InstallKrw");
  const snGrandTotal = el("GrandTotal");
  const snAddButton = el("AddButton");

  let snLastLines = [];
  bindBreakdownRemove(snBreakdown, () => snLastLines);
  const option = (value, label) => `<option value="${value}">${escapeHtml(label)}</option>`;

  function currentType() {
    return TYPES.find((item) => item.id === snTypeSelect.value) || TYPES[0];
  }
  function typeColors(type) {
    return type.colors ? COLORS.filter((c) => type.colors.includes(c.id)) : COLORS;
  }

  // 타입이 바뀌면 격자 틈·색상·높이 선택지를 그 타입에 맞게 다시 채운다
  function rebuildDependentOptions() {
    const type = currentType();
    const keep = (select, html) => {
      const previous = select.value;
      select.innerHTML = html;
      if (Array.from(select.options).some((o) => o.value === previous)) select.value = previous;
      if (select._swatchSync) select._swatchSync();
    };
    keep(snGapSelect, type.gaps.map((g) => option(g.id, `${g.label} · 가림률 ${g.screen}%`)).join(""));
    keep(snHeightSelect, type.heights.map((h) => option(h, `H${h} (격자 높이 ${formatNumber(h)}mm)`)).join(""));
    const colors = typeColors(type);
    const prevColor = snColorSelect.value;
    snColorSelect.innerHTML = colors.map((c) => option(c.id, c.label)).join("");
    snColorSelect.value = colors.some((c) => c.id === prevColor) ? prevColor : colors[0].id;
    if (snColorSelect._swatchRebuild) snColorSelect._swatchRebuild(colors);
    if (snCornerTypeField) snCornerTypeField.hidden = !type.corner;
    // 그 타입에 설정된 코너 부재만 선택지로 (세로 판 붙임·밀착은 각도 자재 가림 코너만)
    keep(snCornerTypeSelect, SENBON_CORNERS.filter((c) => !type.corner || type.corner[c.id]).map((c) => option(c.id, c.label)).join(""));
    if (snWallBracketField) snWallBracketField.hidden = !type.wallBracket;
    if (snHint) snHint.textContent = `${type.desc} (${type.page})`;
  }

  function snReadCustomOptions() {
    return Array.from(snCustomOptions.querySelectorAll("[data-porch-option]"))
      .map((row) => ({ row, label: row.querySelector("[data-porch-option-label]").value.trim(), krw: porchReadNumber(row.querySelector("[data-porch-option-krw]"), 0) }))
      .filter((item) => item.label && item.krw > 0);
  }

  function calculateSenbon() {
    const type = currentType();
    const assets = senbonAssets(type, IMG);
    const gap = type.gaps.find((g) => g.id === snGapSelect.value) || type.gaps[0];
    const color = typeColors(type).find((c) => c.id === snColorSelect.value) || typeColors(type)[0];
    const finish = color.finish;
    const finishLabel = finish === "wrap" ? "래핑 컬러" : "알루미늄 컬러";
    const H = Number(snHeightSelect.value) || type.heights[0];
    const lengthMm = Math.max(0, Math.round(porchReadNumber(snLengthInput, 6000)));
    const corners = Math.max(0, Math.round(porchReadNumber(snCornersInput, 0)));
    const cornerType = SENBON_CORNERS.find((c) => c.id === snCornerTypeSelect.value) || SENBON_CORNERS[0];
    const wallBrackets = type.wallBracket ? Math.max(0, Math.round(porchReadNumber(snWallBracketInput, 0))) : 0;
    const installRate = snInstallToggle.checked ? porchReadNumber(snInstallRateInput, cfg.installPerM || SENBON_INSTALL_PER_M) : 0;
    const warnings = [];
    const lines = [];
    const push = (line) => lines.push({ krw: 0, ...line });
    const P = (table) => (table && table[finish] ? table[finish][H] : undefined);

    if (lengthMm < 400) {
      warnings.push("휀스 총 길이를 400mm 이상으로 입력해 주세요.");
      return { valid: false, warnings, lines };
    }
    if (color.madeToOrder) warnings.push(`${color.label.replace(" (수주생산)", "")}는 수주생산 컬러로 납기 확인이 필요합니다 (가산 없음).`);

    const colorText = `${color.label.replace(/ \(.*\)$/, "")} · ${finishLabel}`;
    let spans = 0;
    let posts = 0;
    let unitsLabel = "";
    let summaryParts = [];

    if (type.kind === "basicAdd") {
      spans = Math.ceil(lengthMm / gap.unitW);
      const pair = P(type.prices[gap.id]);
      if (!pair) {
        warnings.push(`${type.label}은 ${finishLabel}로는 설정이 없습니다. 래핑 컬러를 선택해 주세요.`);
        return { valid: false, warnings, lines };
      }
      posts = spans + 1;
      unitsLabel = `기본형 1 + 추가형 ${spans - 1}`;
      push({
        group: "본체",
        label: `${type.label} ${gap.label.split(" (")[0]} W${gap.unitW}×H${H} 기본형 (기둥 2본) × 1장`,
        detail: `${colorText} · 가림률 ${gap.screen}% · 채광 ${gap.light}% · 통풍 ${gap.vent}% · 장당 ${formatCurrency(jpyToKrw(pair[0]))} (${type.page})`,
        krw: jpyToKrw(pair[0]),
        image: assets.photo
      });
      if (spans > 1) {
        push({
          group: "본체",
          label: `${type.short} 추가형 (기둥 1본) W${gap.unitW}×H${H} × ${spans - 1}장`,
          detail: `기본형에 이어 붙이는 추가 유닛, 좌·우 사양 지정 · 장당 ${formatCurrency(jpyToKrw(pair[1]))}`,
          krw: jpyToKrw(pair[1] * (spans - 1))
        });
      }
      summaryParts = [`유닛 W${gap.unitW} × ${spans}장 (${unitsLabel})`];
    } else if (type.kind === "panelPost") {
      spans = Math.ceil(lengthMm / gap.unitW);
      const unit = P(type.prices[gap.id]);
      posts = spans + 1 + corners;
      push({
        group: "본체",
        label: `${type.label} ${gap.label.split(" (")[0]} W${gap.unitW}×H${H} × ${spans}장`,
        detail: `${colorText} · 가림률 ${gap.screen}% · 채광 ${gap.light}% · 통풍 ${gap.vent}% · 장당 ${formatCurrency(jpyToKrw(unit))} (${type.page})`,
        krw: jpyToKrw(unit * spans),
        image: assets.photo
      });
      push({
        group: "기둥",
        label: `격자 유닛용 각주 H${H} × ${posts}본`,
        detail: `스팬 + 1본${corners ? ` + 코너마다 1본` : ""} · 기둥 심간 ${formatNumber(gap.unitW)} 이하, 지면 매설 (P.808 산출 예)`,
        krw: jpyToKrw(P(type.post) * posts)
      });
      push({ group: "연결부품", label: "격자 유닛용 엔드캡 (4개 세트) × 1세트", detail: "동연 양 끝 마감 (P.809)", krw: jpyToKrw(type.endCap) });
      summaryParts = [`패널 W${gap.unitW} × ${spans}장 · 각주 ${posts}본`];
    } else if (type.kind === "reversible") {
      spans = Math.ceil(lengthMm / gap.unitW);
      const unit = P(type.prices[gap.id]);
      const centerPosts = Math.max(0, spans - 1 - corners);
      posts = 2 + centerPosts + corners;
      push({
        group: "본체",
        label: `${type.label} ${gap.label.split(" (")[0]} W${gap.unitW}×H${H} × ${spans}장`,
        detail: `${colorText} · 가림률 ${gap.screen}% · 채광 ${gap.light}% · 통풍 ${gap.vent}% · 장당 ${formatCurrency(jpyToKrw(unit))} (${type.page})`,
        krw: jpyToKrw(unit * spans),
        image: assets.photo
      });
      push({ group: "기둥", label: `리버서블 엔드 기둥 30×60 H${H} × 2본`, detail: "양 끝 기둥 (P.811)", krw: jpyToKrw(P(type.postEnd) * 2) });
      if (centerPosts > 0) push({ group: "기둥", label: `리버서블 센터 기둥 30×60 H${H} × ${centerPosts}본`, detail: "패널 사이 기둥 (스팬 − 1 − 코너)", krw: jpyToKrw(P(type.postCenter) * centerPosts) });
      if (corners > 0) push({ group: "기둥", label: `리버서블 코너 기둥 60×60 H${H} × ${corners}본`, detail: "코너마다 1본", krw: jpyToKrw(P(type.postCorner) * corners), remove: () => porchResetControl(snCornersInput, "0") });
      warnings.push("리버서블 유닛은 블록 위 시공이 불가해 독립 기초로 시공합니다.");
      summaryParts = [`패널 W${gap.unitW} × ${spans}장 · 기둥 ${posts}본`];
    } else if (type.kind === "w2000") {
      const spans2000 = Math.ceil(lengthMm / 2000);
      const remainder = lengthMm - 2000 * (spans2000 - 1);
      const halfLast = remainder <= 1000;
      spans = spans2000;
      const panels = halfLast ? 2 * (spans2000 - 1) + 1 : 2 * spans2000;
      const unit = P(type.prices[gap.id]);
      const centerPosts = Math.max(0, spans2000 - 1 - corners);
      posts = 2 + centerPosts + corners;
      push({
        group: "본체",
        label: `${type.label} 패널 W1000×H${H} × ${panels}장`,
        detail: `${colorText} · 2,000 스팬당 2장${halfLast ? " (마지막 스팬 1장)" : ""} · 가림률 ${gap.screen}% · 장당 ${formatCurrency(jpyToKrw(unit))} (${type.page})`,
        krw: jpyToKrw(unit * panels),
        image: assets.photo
      });
      const rails2000 = halfLast ? spans2000 - 1 : spans2000;
      if (rails2000 > 0) push({ group: "연결부품", label: `동연 W2000용 30×60 (2본입) × ${rails2000}조`, detail: "2,000 스팬마다 상하 가로대 1조, 고정 비스 포함", krw: jpyToKrw(type.rail2000[finish] * rails2000) });
      if (halfLast) push({ group: "연결부품", label: "동연 W1000용 30×60 (2본입) × 1조", detail: "마지막 1,000 이하 스팬용", krw: jpyToKrw(type.rail1000[finish]) });
      push({ group: "기둥", label: `75각 엔드 기둥 H${H} × 2본`, detail: "양 끝 기둥 (P.812)", krw: jpyToKrw(P(type.postEnd) * 2) });
      if (centerPosts > 0) push({ group: "기둥", label: `75각 센터 기둥 H${H} × ${centerPosts}본`, detail: "기둥 심간 2,000 (스팬 − 1 − 코너)", krw: jpyToKrw(P(type.postCenter) * centerPosts) });
      if (corners > 0) push({ group: "기둥", label: `75각 코너 기둥 H${H} × ${corners}본`, detail: "코너마다 1본", krw: jpyToKrw(P(type.postCorner) * corners), remove: () => porchResetControl(snCornersInput, "0") });
      const capSets = Math.ceil(posts / 2);
      push({ group: "연결부품", label: `기둥 캡 (2개입) × ${capSets}세트`, detail: "75각 기둥 상단 캡", krw: jpyToKrw(type.capSet * capSets) });
      summaryParts = [`2,000 스팬 × ${spans2000} · 패널 ${panels}장 · 75각 기둥 ${posts}본`];
    } else if (type.kind === "siteset") {
      let remain = lengthMm;
      const picks = [];
      type.sets.forEach((set, index) => {
        if (index === 0) {
          const n = Math.floor(remain / set.w);
          if (n > 0) { picks.push({ set, n }); remain -= n * set.w; }
        }
      });
      if (remain > 0) {
        const fit = [...type.sets].reverse().find((set) => set.w >= remain) || type.sets[0];
        const existing = picks.find((p) => p.set === fit);
        if (existing) existing.n += 1; else picks.push({ set: fit, n: 1 });
      }
      spans = picks.reduce((sum, p) => sum + p.n, 0);
      picks.forEach((p) => {
        push({
          group: "본체",
          label: `현장 조립식 세트 W${p.set.w}×H1800 × ${p.n}세트`,
          detail: `${colorText} · 기둥(철심)·격자·커버·동연 포함, 기둥 매입 400 · 세트당 ${formatCurrency(jpyToKrw(p.set[finish]))} (${type.page})`,
          krw: jpyToKrw(p.set[finish] * p.n),
          image: assets.photo
        });
      });
      posts = picks.reduce((sum, p) => sum + p.n * (Math.round(p.set.w / 960) + 1), 0);
      summaryParts = [picks.map((p) => `W${p.set.w} × ${p.n}`).join(" + ")];
      if (corners > 0) warnings.push("현장 조립식 세트는 코너 전용 부재가 없어 코너는 세트를 맞대어 시공합니다 (가격 가산 없음).");
    }

    // 코너 부재 (기둥 일체형·바로크·격자 유닛)
    if (type.corner && corners > 0) {
      const unit = P(type.corner[cornerType.id]);
      if (unit == null) {
        warnings.push("선택한 색상 계열에는 코너 부재 설정이 없습니다.");
      } else {
        push({
          group: "연결부품",
          label: `${cornerType.short} H${H} × ${corners}본`,
          detail: `${cornerType.label} · 동연 2단 사양, 본당 ${formatCurrency(jpyToKrw(unit))} (P.823)`,
          krw: jpyToKrw(unit * corners),
          remove: () => porchResetControl(snCornersInput, "0")
        });
      }
    }
    if (type.wallBracket && wallBrackets > 0) {
      push({
        group: "연결부품",
        label: `벽부착용 스테인리스 금구 × ${wallBrackets}개`,
        detail: "휀스 끝을 건물 벽에 고정할 때 사용 (P.809)",
        krw: jpyToKrw(type.wallBracket * wallBrackets),
        remove: () => porchResetControl(snWallBracketInput, "0")
      });
    }

    snReadCustomOptions().forEach((item) => push({ group: "옵션", label: item.label, detail: "수동 입력 옵션", krw: item.krw, remove: () => porchClearCustomOption(item.row) }));

    const materialKrw = lines.reduce((sum, line) => sum + (line.separate ? 0 : line.krw), 0);
    const meters = lengthMm / 1000;
    const installFee = Math.round(installRate * meters / 100) * 100;
    const installLabel = installFee > 0 ? `시공비 ${formatCurrency(installRate)}/m × ${meters.toFixed(2)}m · ${formatCurrency(installFee)}` : "미반영";
    return {
      valid: true, warnings, lines, type, assets, gap, color, finish, finishLabel, H, lengthMm, corners, cornerType, spans, posts, wallBrackets,
      summaryParts, materialKrw, installFee, installLabel, total: materialKrw + installFee
    };
  }

  function buildSenbonPreviewModel(result) {
    const { type, gap } = result;
    const legend = [
      `${cfg.seriesName} · ${type.label}`,
      `${result.color.label.replace(/ \(.*\)$/, "")} · ${result.finishLabel}`,
      `H${result.H} · ${gap.label.split(" (")[0]}`,
      result.summaryParts[0],
      result.corners ? `코너 ${result.corners}곳${type.corner ? ` · ${result.cornerType.short}` : " · 코너 기둥"}` : "",
      result.wallBrackets ? `벽부착 금구 ${result.wallBrackets}` : ""
    ];
    const spanW = type.kind === "w2000" ? 2000 : type.kind === "siteset" ? 1950 : gap.unitW;
    const spans = type.kind === "siteset" ? Math.max(1, Math.round(result.lengthMm / spanW)) : result.spans;
    return {
      kind: "fence",
      seriesName: cfg.seriesName,
      designLabel: type.label,
      pattern: type.pattern,
      slatW: type.slatW,
      boardWidths: type.boardWidths || null,
      alternateTone: !!type.alternateTone,
      slatGap: type.gapMm != null ? type.gapMm : gap.gap,
      rails: result.H >= 2400 ? 3 : 2,
      panelHex: result.color.hex,
      frameHex: result.finish === "alu" ? "#9a9590" : result.color.hex,
      panelSwatch: result.finish === "wrap" ? result.color.swatch : null,
      tiers: [result.H],
      totalHeightMm: result.H + 100,
      bottomGap: 100,
      spans,
      spanW,
      lastW: spanW,
      cut: false,
      lengthMm: result.lengthMm,
      poles: result.posts,
      pitch1000: false,
      postSize: type.postSize,
      corners: result.corners,
      mount: "foundation",
      lowerCover: false,
      highStrength: false,
      summary: `총 길이 ${formatNumber(result.lengthMm)} × H${result.H} · ${result.summaryParts[0]}`,
      photo: result.assets.photo,
      photoCaption: `참고 사진 · ${cfg.seriesName} ${type.label} (카탈로그 ${type.page})`,
      legend
    };
  }

  function renderSenbonMedia(result) {
    if (!result.valid) return;
    snTypeMedia.innerHTML = mediaMarkup(result.assets.photo, `${result.type.label} · 가림률 ${result.gap.screen}% · 채광 ${result.gap.light}% · 통풍 ${result.gap.vent}%`)
      + mediaMarkup(result.assets.draw, `${result.type.short} 유닛 구성도`);
  }

  function renderSenbon() {
    const result = calculateSenbon();
    renderSenbonMedia(result);
    renderStructurePreview(snPreview, result.valid ? buildSenbonPreviewModel(result) : null);
    snWarning.innerHTML = result.warnings.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    snWarning.hidden = !result.warnings.length;
    if (!result.valid) {
      snSpecSummary.textContent = "구성 불가";
      snLastLines = [];
      snBreakdown.innerHTML = `<tr><td colspan="2" class="porch-breakdown__empty">경고 내용을 확인하고 치수를 조정해 주세요.</td></tr>`;
      snTotalKrw.textContent = formatCurrency(0);
      snInstallKrw.textContent = formatCurrency(0);
      snGrandTotal.textContent = formatCurrency(0);
      snAddButton.disabled = true;
      return;
    }
    snSpecSummary.textContent = `${result.type.label} · H${result.H} · ${result.gap.label.split(" (")[0]} · 총 길이 ${formatNumber(result.lengthMm)}mm → ${result.summaryParts.join(" · ")}${result.corners ? ` · 코너 ${result.corners}` : ""}`;
    snLastLines = result.lines;
    snBreakdown.innerHTML = porchBreakdownRows(result.lines);
    snTotalKrw.textContent = formatCurrency(result.materialKrw);
    snInstallKrw.textContent = formatCurrency(result.installFee);
    snGrandTotal.textContent = formatCurrency(result.total);
    snAddButton.disabled = false;
  }

  function buildSenbonForm() {
    snTypeSelect.innerHTML = TYPES.map((t) => option(t.id, t.label)).join("");
    createSwatchPicker(snTypeSelect, TYPES.map((t) => ({ id: t.id, label: t.label, swatch: senbonAssets(t, IMG).draw })));
    snColorSelect.innerHTML = COLORS.map((c) => option(c.id, c.label)).join("");
    const colorPicker = createSwatchPicker(snColorSelect, COLORS);
    // 타입별 색상 제한: 목록 항목을 숨기는 방식으로 재구성
    snColorSelect._swatchRebuild = (colors) => {
      const allowed = new Set(colors.map((c) => c.id));
      colorPicker.querySelectorAll("li[data-value]").forEach((li) => { li.hidden = !allowed.has(li.dataset.value); });
      if (snColorSelect._swatchSync) snColorSelect._swatchSync();
    };
    snCornerTypeSelect.innerHTML = SENBON_CORNERS.map((c) => option(c.id, c.label)).join("");
    snCustomOptions.innerHTML = Array.from({ length: PORCH_CUSTOM_OPTION_COUNT }, (_, index) => `
      <div class="porch-option-row" data-porch-option>
        <input type="text" placeholder="옵션 ${index + 1} 명칭" data-porch-option-label>
        <input type="text" inputmode="numeric" placeholder="원화 금액" data-porch-option-krw>
      </div>
    `).join("");
    snInstallRateInput.value = String(cfg.installPerM || SENBON_INSTALL_PER_M);
    rebuildDependentOptions();
    snHeightSelect.value = Array.from(snHeightSelect.options).some((o) => o.value === "1800") ? "1800" : snHeightSelect.options[0].value;
    bindHoverPreviews(snForm);
  }

  snTypeSelect.addEventListener("change", rebuildDependentOptions);
  snForm.addEventListener("input", renderSenbon);
  snForm.addEventListener("change", renderSenbon);
  snForm.addEventListener("submit", (event) => event.preventDefault());

  snAddButton.addEventListener("click", () => {
    const result = calculateSenbon();
    if (!result.valid) return;
    const specParts = [
      `${result.type.label} · H${result.H} · ${result.gap.label.split(" (")[0]}`,
      `총 길이 ${formatNumber(result.lengthMm)}mm (${result.summaryParts.join(", ")})`,
      `${result.color.label.replace(/ \(.*\)$/, "")} · ${result.finishLabel}`,
      result.corners ? `코너 ${result.corners}` : ""
    ].filter(Boolean);
    quoteItems.push({
      category: cfg.category,
      name: cfg.name,
      spec: specParts.join(" / "),
      image: result.assets.photo,
      materialLabel: `휀스 구성 · ${formatCurrency(result.materialKrw)}`,
      installLabel: result.installLabel,
      quantity: 1,
      quantityUnit: "식",
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
  buildSenbonForm();
  renderSenbon();
}

createSenbonConfigurator({ id: "senbonfence", prefix: "snb", name: "천본격자 휀스", seriesName: "천본격자", category: "특별제작품 / (천본격자 휀스)", panel: "#snbConfigurator" });
createSenbonConfigurator({ id: "itabarifence", prefix: "itb", name: "에버아트우드 판 붙임 휀스", seriesName: "판 붙임", category: "특별제작품 / (판 붙임 휀스)", panel: "#itbConfigurator", types: ITABARI_TYPES, colors: ITABARI_COLORS, img: ITABARI_IMG });
buildSpecialProductSelect();
showSpecialProduct(specialProductSelect.value);
