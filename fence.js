/*
  특별제작품 #4: 센시아 휀스 (타카쇼 에버아트 휀스 센시아)
  특별제작품 #5: 센시아 휀스R (패널 래핑 컬러 + 알루미늄 프레임)
  ------------------------------------------------
  데이터 출처 (카탈로그 인쇄 페이지, PDF 텍스트 레이어에서 직접 추출)
    P.714~719 센시아 본체 6종 (가로 패널·가로 루버·가로 패널 콤비·가로 가는 격자·세로 가는 격자·세로 격자) 단가, 컷 가공비, 부품
    P.708~711 센시아R 본체 4종 (가로 패널·가로 루버·가로 패널 콤비·가로 가는 격자) 단가, 컷 가공비, 부품
    P.735 프리폴·고강도 프리폴 (알루미늄 컬러) / P.739 2단·3단 프리폴, 다단 홈 커버 / P.740 하부 막음 커버, 엔드캡, 고정금구
    P.741 코너 부품 3종 (코너 연결부품 / 격자부 코너 / 가림 코너), 단부 커버 / P.743~745 필요 부재 산출 예, 다단 높이 조합, 기초 치수
  단가는 모두 엔화 × 10 = 원화. 조립·시공비 불포함 가격이라 시공비는 스팬당 단가(가정값)를 별도로 더한다.
  산출 규칙 (카탈로그 P.743 "フリーポール使用時の必要部材" 기준)
    · 휀스 1장 = W1998 (기둥 심간 2,000). 총 길이 ÷ 2,000 → 스팬 수, 나머지는 마지막 1장을 절단(컷 가공비 + 단부 커버).
    · 프리폴 = 스팬 + 1본. 고강도 납마리(풍속 42m/s)는 H06~H10 전용 고강도 프리폴, H12·다단은 표준 프리폴을 기둥 심간 1,000 이내로.
    · 다단(2단·3단)은 다단 프리폴 1본당 상하부 고정금구 1세트 + 중간 고정금구 (단수−1)세트, 독립 기초 필수.
    · 코너는 코너 부품(3종 택1)을 코너 × 단수만큼. 엔드캡(4개 세트)은 1세트.
    · 하부 막음 커버(옵션)는 스팬당 1본 + 코너당 코너용 1본.
  glassporch.js의 공용 함수(jpyToKrw, createSwatchPicker, mediaMarkup, porchResetControl 등)를 재사용하며,
  두 시리즈는 같은 폼 구조(id 접두사 sfa / sfr)를 createFenceConfigurator(cfg)로 한 번씩 만든다.
*/

const FENCE_IMG = "assets/fence/";
const FENCE_SPAN_MM = 2000;
const FENCE_PANEL_W = 1998;
const FENCE_DEFAULT_INSTALL_PER_SPAN = 150000;

const FENCE_HEIGHTS = [
  { key: "H06", code: "2006", mm: 540, fullMm: 600, poleL: 741.5 },
  { key: "H08", code: "2008", mm: 720, fullMm: 800, poleL: 941.5 },
  { key: "H10", code: "2010", mm: 920, fullMm: 1000, poleL: 1141.5 },
  { key: "H12", code: "2012", mm: 1120, fullMm: 1200, poleL: 1341.5 }
];
const FENCE_HEIGHT_BY_MM = Object.fromEntries(FENCE_HEIGHTS.map((h) => [h.mm, h]));

// 공통 부품 단가 (엔) — 패널 높이 키별
const FENCE_PARTS = {
  cut: { H06: 2500, H08: 3000, H10: 3500, H12: 4000 },
  pole: { H06: 4600, H08: 4900, H10: 6600, H12: 8900 },
  hsPole: { H06: 6100, H08: 7800, H10: 9800, H12: null },
  endCap: 1600,
  cornerJoint: 2800,
  latticeCorner: { H06: 4500, H08: 4700, H10: 4800, H12: 4900 },
  privacyCorner: { H06: 6700, H08: 7400, H10: 7600, H12: 8400 },
  endCoverA: { H06: 4400, H08: 5000, H10: 5700, H12: 6600 },
  endCoverB: { H06: 4700, H08: 5300, H10: 6100, H12: 7000 },
  lowerCover: 10400,
  lowerCoverCorner: 13600,
  bracketTopBottom: 1600,
  bracketMiddle: 1800,
  grooveCoverShort: 4400,
  grooveCoverLong: 6800
};

const FENCE_CORNER_TYPES = [
  { id: "joint", label: "코너 연결부품 (2개 세트, 60°~300° 가동)", short: "코너 연결부품" },
  { id: "lattice", label: "격자부 코너 부품 (코너 틈새를 격자로 마감)", short: "격자부 코너" },
  { id: "privacy", label: "가림 코너 부품 (코너 틈새를 완전히 가림)", short: "가림 코너" }
];

// 다단 프리폴 (알루미늄 컬러, 엔) 과 높이 조합 (카탈로그 P.744~745 센시아용)
const FENCE_MULTI = {
  2: [
    { key: "H12", tiers: [540, 540], total: 1441, jpy: 14000, post: 60, found: "350×350×600 / 고강도 350×350×500" },
    { key: "H14", tiers: [540, 720], total: 1621, jpy: 15900, post: 60, found: "350×350×600 / 고강도 350×350×500" },
    { key: "H16", tiers: [540, 920], total: 1821, jpy: 17700, post: 60, found: "400×400×600 / 고강도 400×400×500" },
    { key: "H16", tiers: [720, 720], total: 1821, jpy: 17700, post: 60, found: "400×400×600 / 고강도 400×400×500" },
    { key: "H18", tiers: [720, 920], total: 2021, jpy: 19600, post: 60, found: "500×500×600 / 고강도 450×450×500" },
    { key: "H18", tiers: [540, 1120], total: 2021, jpy: 19600, post: 60, found: "500×500×600 / 고강도 450×450×500" },
    { key: "H20", tiers: [920, 920], total: 2221, jpy: 21400, post: 60, found: "550×550×600 / 고강도 500×500×500" },
    { key: "H20", tiers: [720, 1120], total: 2221, jpy: 21400, post: 60, found: "550×550×600 / 고강도 500×500×500" },
    { key: "H22", tiers: [920, 1120], total: 2949, jpy: 42000, post: 75, found: "550×550×800 / 고강도 350×350×800" },
    { key: "H24", tiers: [1120, 1120], total: 3149, jpy: 72100, post: 75, found: "600×600×800 / 고강도 400×400×800" }
  ],
  3: [
    { key: "H22a", tiers: [540, 720, 720], total: 2870, jpy: 41400, post: 75, found: "500×500×800 / 고강도 350×350×800" },
    { key: "H22b", tiers: [540, 540, 920], total: 2890, jpy: 41400, post: 75, found: "500×500×800 / 고강도 350×350×800" },
    { key: "H24a", tiers: [540, 720, 920], total: 3070, jpy: 71300, post: 75, found: "550×550×800 / 고강도 400×400×800" },
    { key: "H24a", tiers: [720, 720, 720], total: 3070, jpy: 71300, post: 75, found: "550×550×800 / 고강도 400×400×800" },
    { key: "H24b", tiers: [540, 540, 1120], total: 3090, jpy: 76900, post: 75, found: "550×550×800 / 고강도 400×400×800" },
    { key: "H26", tiers: [540, 920, 920], total: 3270, jpy: 73200, post: 75, found: "600×600×800 / 고강도 450×450×800" },
    { key: "H26", tiers: [720, 720, 920], total: 3270, jpy: 73200, post: 75, found: "600×600×800 / 고강도 450×450×800" },
    { key: "H26", tiers: [540, 720, 1120], total: 3270, jpy: 73200, post: 75, found: "600×600×800 / 고강도 450×450×800" },
    { key: "H28", tiers: [540, 920, 1120], total: 3470, jpy: 77300, post: 75, found: "650×650×800 / 고강도 500×500×800" },
    { key: "H28", tiers: [720, 720, 1120], total: 3470, jpy: 77300, post: 75, found: "650×650×800 / 고강도 500×500×800" },
    { key: "H28", tiers: [720, 920, 920], total: 3470, jpy: 77300, post: 75, found: "650×650×800 / 고강도 500×500×800" },
    { key: "H30", tiers: [540, 1120, 1120], total: 3670, jpy: 81900, post: 75, found: "650×650×800 / 고강도 500×500×800" },
    { key: "H30", tiers: [720, 920, 1120], total: 3670, jpy: 81900, post: 75, found: "650×650×800 / 고강도 500×500×800" },
    { key: "H30", tiers: [920, 920, 920], total: 3670, jpy: 81900, post: 75, found: "650×650×800 / 고강도 500×500×800" }
  ]
};

// 설치 방식. 단단(35각 프리폴)은 셋 중 선택, 다단(60·75각)은 독립 기초만 가능.
const FENCE_MOUNTS = [
  { id: "block", label: "기존 담장 위 신설 · 프리폴 앵커를 블록에 매설", short: "담장 위 매설" },
  { id: "foundation", label: "기초 콘크리트 신설 · 독립 기초에 매설", short: "기초 콘크리트 매설" },
  { id: "plate", label: "베이스 플레이트 앵커 고정 · 콘크리트 바닥면 (국내 개량형)", short: "베이스 플레이트 앵커" }
];
const FENCE_BASE_PLATE_PER_M = 100000; // 베이스 플레이트(부자재 20,000) + 설치 인건비 70,000 + 경비 10,000 = 1m당 합계

const FENCE_WIND = [
  { id: "std", label: "표준 사양 (풍속 34m/s 상당 · 기둥 심간 2,000)" },
  { id: "high", label: "고강도 사양 (풍속 42m/s 상당)" }
];

const FENCE_SERIES = {
  sensia: {
    id: "sensia",
    name: "센시아 휀스",
    category: "특별제작품 / (센시아 휀스)",
    pages: "P.714~719",
    colorMode: "single",
    intro: "알루미늄 단색 본체. 블랙·세피아 브라운·스텐컬러 3색",
    colors: [
      { id: "black", label: "블랙", hex: "#2a2a2a", swatch: FENCE_IMG + "colors/s-black.jpg" },
      { id: "sepia_brown", label: "세피아 브라운", hex: "#5b4d47", swatch: FENCE_IMG + "colors/s-sepia_brown.jpg" },
      { id: "stainless", label: "스텐컬러", hex: "#c8c1b4", swatch: FENCE_IMG + "colors/s-stainless.jpg" }
    ],
    designs: [
      { id: "hpanel", label: "가로 패널", pattern: "hpanel", screen: 88, light: 12, vent: 12, page: 714, endCover: "endCoverA", body: { H06: 22700, H08: 28200, H10: 34300, H12: 37600 } },
      { id: "louver", label: "가로 루버", pattern: "louver", screen: 100, light: 0, vent: 5, page: 715, endCover: "endCoverB", body: { H06: 26700, H08: 33000, H10: 39200, H12: 44500 } },
      { id: "combi", label: "가로 패널 콤비", pattern: "combi", screen: 76, light: 24, vent: 24, page: 716, endCover: "endCoverB", body: { H06: 30900, H08: 37300, H10: 45600, H12: 53400 } },
      { id: "hslim", label: "가로 가는 격자", pattern: "hslim", screen: 68, light: 32, vent: 32, page: 717, endCover: "endCoverB", body: { H06: 30900, H08: 37300, H10: 45600, H12: 53700 } },
      { id: "vslim", label: "세로 가는 격자", pattern: "vslim", screen: 56, light: 44, vent: 44, page: 718, endCover: null, body: { H06: 28400, H08: 35700, H10: 39600 } },
      { id: "vlattice", label: "세로 격자", pattern: "vlattice", screen: 33, light: 67, vent: 67, page: 719, endCover: null, cut: { H06: 2000, H08: 2500, H10: 3000 }, body: { H06: 20500, H08: 22700, H10: 26200 } }
    ]
  },
  sensiaR: {
    id: "sensiaR",
    name: "센시아 휀스R",
    category: "특별제작품 / (센시아 휀스R)",
    pages: "P.708~711",
    colorMode: "dual",
    intro: "목재 질감 래핑 패널 + 알루미늄 프레임. 패널 4색 × 프레임 2색",
    panelColors: [
      { id: "brown_ebony", label: "브라운 에보니", hex: "#5a3a2a", swatch: FENCE_IMG + "colors/r-brown_ebony.jpg" },
      { id: "dark_pine", label: "다크 파인", hex: "#6a4a3a", swatch: FENCE_IMG + "colors/r-dark_pine.jpg" },
      { id: "natural_pine", label: "내추럴 파인", hex: "#b4824e", swatch: FENCE_IMG + "colors/r-natural_pine.jpg" },
      { id: "black_ebony", label: "블랙 에보니 (수주생산)", hex: "#2b2622", swatch: FENCE_IMG + "colors/r-black_ebony.jpg", madeToOrder: true }
    ],
    frameColors: [
      { id: "black", label: "블랙", hex: "#2a2a2a", swatch: FENCE_IMG + "colors/f-black.jpg" },
      { id: "stainless", label: "스텐컬러", hex: "#c8c1b4", swatch: FENCE_IMG + "colors/f-stainless.jpg" }
    ],
    designs: [
      { id: "hpanel", label: "가로 패널", pattern: "hpanel", screen: 88, light: 12, vent: 12, page: 708, endCover: "endCoverA", body: { H06: 36300, H08: 45300, H10: 52500, H12: 62800 } },
      { id: "louver", label: "가로 루버", pattern: "louver", screen: 100, light: 0, vent: 5, page: 709, endCover: "endCoverB", body: { H06: 39600, H08: 50200, H10: 58300, H12: 69700 } },
      { id: "combi", label: "가로 패널 콤비", pattern: "combi", screen: 76, light: 24, vent: 24, page: 710, endCover: "endCoverB", body: { H06: 38800, H08: 46800, H10: 56500, H12: 65100 } },
      { id: "hslim", label: "가로 가는 격자", pattern: "hslim", screen: 68, light: 32, vent: 32, page: 711, endCover: "endCoverB", body: { H06: 38800, H08: 46800, H10: 56500, H12: 65100 } }
    ]
  }
};

function fenceDesignAssets(seriesId, design) {
  return {
    photo: `${FENCE_IMG}${seriesId}-${design.id}.jpg`,
    draw: `${FENCE_IMG}${seriesId}-${design.id}-draw.jpg`
  };
}

function createFenceConfigurator(cfg) {
  const series = FENCE_SERIES[cfg.series];
  const el = (name) => $(`#${cfg.prefix}${name}`);
  const fenForm = el("Form");
  const fenDesignSelect = el("Design");
  const fenDesignMedia = el("DesignMedia");
  const fenColorSelect = el("Color");
  const fenPanelColorSelect = el("PanelColor");
  const fenFrameColorSelect = el("FrameColor");
  const fenTiersSelect = el("Tiers");
  const fenHeightSelect = el("Height");
  const fenLengthInput = el("Length");
  const fenCornersInput = el("Corners");
  const fenCornerTypeSelect = el("CornerType");
  const fenWindSelect = el("Wind");
  const fenMountSelect = el("Mount");
  const fenBaseRateInput = el("BaseRate");
  const fenBaseRateField = el("BaseRateField");
  const fenInstallRateField = el("InstallRateField");
  const fenLowerCoverToggle = el("LowerCover");
  const fenEndCoverToggle = el("EndCover");
  const fenGrooveCoverToggle = el("GrooveCover");
  const fenGrooveCoverLabel = fenGrooveCoverToggle ? fenGrooveCoverToggle.closest("label") : null;
  const fenPoleMedia = el("PoleMedia");
  const fenOptionMedia = el("OptionMedia");
  const fenInstallToggle = el("InstallToggle");
  const fenInstallRateInput = el("InstallRate");
  const fenCustomOptions = el("CustomOptions");
  const fenPreview = el("Preview");
  const fenSpecSummary = el("SpecSummary");
  const fenWarning = el("Warning");
  const fenBreakdown = el("Breakdown");
  const fenTotalKrw = el("TotalKrw");
  const fenInstallKrw = el("InstallKrw");
  const fenGrandTotal = el("GrandTotal");
  const fenAddButton = el("AddButton");
  const fenHint = el("HeightHint");

  let fenLastLines = [];
  bindBreakdownRemove(fenBreakdown, () => fenLastLines);

  const option = (value, label) => `<option value="${value}">${escapeHtml(label)}</option>`;

  function currentDesign() {
    return series.designs.find((item) => item.id === fenDesignSelect.value) || series.designs[0];
  }

  function designHeights(design) {
    return FENCE_HEIGHTS.filter((h) => design.body[h.key] != null);
  }

  // 단수에 따라 높이(조합) 선택지를 다시 채운다. 디자인에 없는 높이(세로 격자류는 H12 없음)가 포함된 조합은 제외.
  function buildHeightOptions() {
    const design = currentDesign();
    const tiers = Number(fenTiersSelect.value) || 1;
    const previous = fenHeightSelect.value;
    let html = "";
    if (tiers === 1) {
      html = designHeights(design).map((h) => option(h.key, `${h.key} · 패널 ${formatNumber(h.mm)} · 전고 약 ${formatNumber(h.fullMm)}`)).join("");
    } else {
      html = FENCE_MULTI[tiers]
        .filter((combo) => combo.tiers.every((mm) => design.body[FENCE_HEIGHT_BY_MM[mm].key] != null))
        .map((combo, index) => option(`${tiers}-${index}`, `${combo.key} · ${combo.tiers.map((mm) => formatNumber(mm)).join(" + ")} (전고 ${formatNumber(combo.total)}mm)`))
        .join("");
    }
    fenHeightSelect.innerHTML = html;
    if (Array.from(fenHeightSelect.options).some((o) => o.value === previous)) fenHeightSelect.value = previous;
    if (fenGrooveCoverLabel) fenGrooveCoverLabel.hidden = tiers === 1;
    // 다단 프리폴은 블록 위·베이스 플레이트 시공 불가 → 독립 기초로 고정
    if (tiers > 1) {
      fenMountSelect.value = "foundation";
      fenMountSelect.disabled = true;
    } else {
      fenMountSelect.disabled = false;
    }
    syncMountUi();
    if (fenHint) {
      fenHint.textContent = tiers === 1
        ? "휀스 1장 W1998 × 패널 높이. 기둥은 35각 프리폴, 블록 위 시공 가능"
        : `${tiers}단 프리폴(${tiers === 2 ? "H12~H20은 60각, H22 이상 75각" : "75각"})에 패널 ${tiers}장을 상하로 조합. 블록 위 시공 불가, 독립 기초 필수 (P.744~745)`;
    }
  }

  function currentMount() {
    return FENCE_MOUNTS.find((item) => item.id === fenMountSelect.value) || FENCE_MOUNTS[0];
  }

  function syncMountUi() {
    const plate = currentMount().id === "plate";
    if (fenBaseRateField) fenBaseRateField.hidden = !plate;
    if (fenInstallRateField) fenInstallRateField.hidden = plate;
    const installLabel = fenInstallKrw.previousElementSibling;
    if (installLabel) installLabel.textContent = plate ? "베이스 플레이트 + 시공비" : "시공비";
  }

  function pickHeight() {
    const tiers = Number(fenTiersSelect.value) || 1;
    if (tiers === 1) {
      const h = FENCE_HEIGHTS.find((item) => item.key === fenHeightSelect.value) || designHeights(currentDesign())[0];
      return { tiers: 1, panels: [h], totalMm: h.fullMm, label: `${h.key} (패널 ${formatNumber(h.mm)})`, combo: null };
    }
    const index = Number(String(fenHeightSelect.value).split("-")[1]) || 0;
    const list = FENCE_MULTI[tiers].filter((combo) => combo.tiers.every((mm) => currentDesign().body[FENCE_HEIGHT_BY_MM[mm].key] != null));
    const combo = list[index] || list[0];
    return { tiers, panels: combo.tiers.map((mm) => FENCE_HEIGHT_BY_MM[mm]), totalMm: combo.total, label: `${tiers}단 ${combo.key} (${combo.tiers.map((mm) => formatNumber(mm)).join("+")})`, combo };
  }

  function fenReadCustomOptions() {
    return Array.from(fenCustomOptions.querySelectorAll("[data-porch-option]"))
      .map((row) => ({
        row,
        label: row.querySelector("[data-porch-option-label]").value.trim(),
        krw: porchReadNumber(row.querySelector("[data-porch-option-krw]"), 0)
      }))
      .filter((item) => item.label && item.krw > 0);
  }

  function calculateFence() {
    const design = currentDesign();
    const assets = fenceDesignAssets(series.id, design);
    const color = series.colorMode === "single"
      ? (series.colors.find((item) => item.id === fenColorSelect.value) || series.colors[0])
      : null;
    const panelColor = series.colorMode === "dual"
      ? (series.panelColors.find((item) => item.id === fenPanelColorSelect.value) || series.panelColors[0])
      : null;
    const frameColor = series.colorMode === "dual"
      ? (series.frameColors.find((item) => item.id === fenFrameColorSelect.value) || series.frameColors[0])
      : null;
    const height = pickHeight();
    const lengthMm = Math.max(0, Math.round(porchReadNumber(fenLengthInput, 6000)));
    const corners = Math.max(0, Math.round(porchReadNumber(fenCornersInput, 0)));
    const cornerType = FENCE_CORNER_TYPES.find((item) => item.id === fenCornerTypeSelect.value) || FENCE_CORNER_TYPES[0];
    const wind = fenWindSelect.value === "high" ? "high" : "std";
    const mount = currentMount();
    const installRate = fenInstallToggle.checked ? porchReadNumber(fenInstallRateInput, FENCE_DEFAULT_INSTALL_PER_SPAN) : 0;
    const baseRate = fenInstallToggle.checked ? porchReadNumber(fenBaseRateInput, FENCE_BASE_PLATE_PER_M) : 0;

    const warnings = [];
    const lines = [];
    const push = (line) => lines.push({ krw: 0, ...line });

    if (lengthMm < 500) {
      warnings.push("휀스 총 길이를 500mm 이상으로 입력해 주세요.");
      return { valid: false, warnings, lines };
    }
    if (corners > Math.max(0, Math.ceil(lengthMm / FENCE_SPAN_MM) - 1)) {
      warnings.push("코너 수가 스팬 수보다 많습니다. 코너는 스팬 사이에만 들어갑니다.");
    }

    // ---- 스팬·절단
    const spans = Math.ceil(lengthMm / FENCE_SPAN_MM);
    const lastW = lengthMm - FENCE_SPAN_MM * (spans - 1);
    const cut = lastW < FENCE_PANEL_W;
    const fullPanels = cut ? spans - 1 : spans;
    const sizeLabel = `총 길이 ${formatNumber(lengthMm)}mm = 2,000 스팬 × ${fullPanels}${cut ? ` + 절단 ${formatNumber(lastW)}` : ""}`;

    // ---- 기둥 (프리폴) 수
    const pitch1000 = wind === "high" && (height.tiers > 1 || height.panels[0].key === "H12");
    let poles = spans + 1;
    if (pitch1000) poles = (spans - 1) * 2 + (lastW > 1000 ? 2 : 1) + 1;
    const hsPoleType = wind === "high" && height.tiers === 1 && height.panels[0].key !== "H12";

    // ---- 본체 (단별)
    const colorText = series.colorMode === "single"
      ? color.label
      : `패널 ${panelColor.label.replace(/ \(.*\)$/, "")} / 프레임 ${frameColor.label}`;
    height.panels.forEach((h, tierIndex) => {
      const tierLabel = height.tiers > 1 ? `${tierIndex + 1}단 ` : "";
      const unit = design.body[h.key];
      push({
        group: "본체",
        label: `${series.name} ${design.label} ${h.code} (W1998×H${h.mm}) ${tierLabel}× ${spans}장`,
        detail: `${colorText} · 가림률 ${design.screen}% · 채광 ${design.light}% · 통풍 ${design.vent}% · 장당 ${formatCurrency(jpyToKrw(unit))} (${series.pages})`,
        krw: jpyToKrw(unit * spans),
        image: assets.photo
      });
      if (cut) {
        const cutJpy = (design.cut || FENCE_PARTS.cut)[h.key];
        push({
          group: "본체",
          label: `컷 가공비 · ${tierLabel}마지막 1장을 ${formatNumber(lastW)}mm로 절단`,
          detail: "W2,000 이하로 절단하는 가산액. 상하 가로대 998 이하 절단은 별도 문의 (카탈로그 비고)",
          krw: jpyToKrw(cutJpy)
        });
        if (design.endCover && fenEndCoverToggle.checked) {
          push({
            group: "본체",
            label: `센시아 단부 커버 (1세트) · ${tierLabel}절단면 마감`,
            detail: "절단한 패널의 절단면에 끼우는 커버 (P.741)",
            krw: jpyToKrw(FENCE_PARTS[design.endCover][h.key]),
            remove: () => porchResetControl(fenEndCoverToggle, false)
          });
        }
      }
    });
    if (series.colorMode === "dual" && panelColor.madeToOrder) {
      warnings.push("블랙 에보니 패널은 수주생산 컬러로 납기 확인이 필요합니다 (가산 없음).");
    }

    // ---- 기둥
    const topKey = height.panels[height.panels.length - 1].key;
    if (height.tiers === 1) {
      const h = height.panels[0];
      const unit = hsPoleType ? FENCE_PARTS.hsPole[h.key] : FENCE_PARTS.pole[h.key];
      const mountNote = mount.id === "block"
        ? "기존 담장(중량 블록 JIS C종 이상) 위에 앵커 매설"
        : mount.id === "foundation"
          ? "신설 기초 콘크리트에 앵커 매설 (기초는 현장 시공)"
          : "프리폴 속에 스테인리스 베이스 플레이트를 끼워 콘크리트 바닥면에 앵커 고정";
      push({
        group: "기둥",
        label: `${hsPoleType ? "고강도 " : ""}프리폴 35각 ${h.key} (L${h.poleL}) × ${poles}본`,
        detail: `${pitch1000 ? "H12는 고강도 프리폴이 없어 표준 프리폴을 기둥 심간 1,000 이내로 배치" : hsPoleType ? "풍속 42m/s 상당 고강도 사양" : "풍속 34m/s 상당, 기둥 심간 2,000 이내"} · ${mountNote} · 상·하부 금구, 기둥 캡, 조인트 슬리브 2개 포함 (P.735)`,
        krw: jpyToKrw(unit * poles),
        image: FENCE_IMG + "free-pole.jpg",
        remove: wind === "high" ? () => porchResetControl(fenWindSelect, "std") : null
      });
    } else {
      const combo = height.combo;
      push({
        group: "기둥",
        label: `${height.tiers}단 프리폴 ${combo.post}각 ${combo.key} × ${poles}본`,
        detail: `${pitch1000 ? "기둥 심간 1,000 이내 고강도 사양(풍속 42m/s)" : "기둥 심간 2,000 이내 (풍속 34m/s)"} · 신설 기초 콘크리트에 매설, 독립 기초 ${combo.found} (P.739, P.744~745)`,
        krw: jpyToKrw(combo.jpy * poles),
        image: FENCE_IMG + "multi-pole.jpg",
        remove: wind === "high" ? () => porchResetControl(fenWindSelect, "std") : null
      });
      push({
        group: "기둥",
        label: `상하부 고정금구 세트 × ${poles}세트`,
        detail: "다단 프리폴 1본당 1세트, 75각·60각 겸용 (P.740)",
        krw: jpyToKrw(FENCE_PARTS.bracketTopBottom * poles)
      });
      push({
        group: "기둥",
        label: `중간 고정금구 세트 × ${poles * (height.tiers - 1)}세트`,
        detail: `단 사이 고정용, 프리폴 1본당 ${height.tiers - 1}세트 (P.740)`,
        krw: jpyToKrw(FENCE_PARTS.bracketMiddle * poles * (height.tiers - 1))
      });
      if (fenGrooveCoverToggle && fenGrooveCoverToggle.checked) {
        const longCover = combo.total > 2300;
        push({
          group: "기둥",
          label: `다단 프리폴 홈 커버 ${longCover ? "L2630" : "L1695"} × ${poles}본`,
          detail: "기둥 홈을 덮는 알루미늄 컬러 커버 (P.739)",
          krw: jpyToKrw((longCover ? FENCE_PARTS.grooveCoverLong : FENCE_PARTS.grooveCoverShort) * poles),
          image: FENCE_IMG + "multi-pole.jpg",
          remove: () => porchResetControl(fenGrooveCoverToggle, false)
        });
      }
    }

    // ---- 코너·엔드
    push({
      group: "연결부품",
      label: "엔드캡 (4개 세트) × 1세트",
      detail: "양 끝 상·하 가로대 마감 캡, 프리폴 색상 대응 (P.740)",
      krw: jpyToKrw(FENCE_PARTS.endCap)
    });
    if (corners > 0) {
      const perCorner = height.panels.reduce((sum, h) => {
        if (cornerType.id === "joint") return sum + FENCE_PARTS.cornerJoint;
        if (cornerType.id === "lattice") return sum + FENCE_PARTS.latticeCorner[h.key];
        return sum + FENCE_PARTS.privacyCorner[h.key];
      }, 0);
      push({
        group: "연결부품",
        label: `${cornerType.short} × 코너 ${corners}곳${height.tiers > 1 ? ` × ${height.tiers}단` : ""}`,
        detail: `${cornerType.label} · 코너 1곳당 ${formatCurrency(jpyToKrw(perCorner))} (P.741)`,
        krw: jpyToKrw(perCorner * corners),
        remove: () => porchResetControl(fenCornersInput, "0")
      });
    }

    // ---- 하부 막음 커버
    if (fenLowerCoverToggle.checked) {
      push({
        group: "옵션",
        label: `하부 막음 커버 L2000×D18×H90 × ${spans}본${corners ? ` + 코너용 L2097 × ${corners}본` : ""}`,
        detail: "휀스 하단과 블록 사이 55~85mm 틈새를 막는 알루미늄 컬러 커버, 절단분은 현장 절단 (P.740)",
        krw: jpyToKrw(FENCE_PARTS.lowerCover * spans + FENCE_PARTS.lowerCoverCorner * corners),
        image: FENCE_IMG + "lower-cover.jpg",
        remove: () => porchResetControl(fenLowerCoverToggle, false)
      });
    }

    fenReadCustomOptions().forEach((item) => push({ group: "옵션", label: item.label, detail: "수동 입력 옵션", krw: item.krw, remove: () => porchClearCustomOption(item.row) }));

    const materialKrw = lines.reduce((sum, line) => sum + (line.separate ? 0 : line.krw), 0);
    const meters = lengthMm / 1000;
    const installFee = mount.id === "plate"
      ? Math.round(baseRate * meters / 100) * 100
      : Math.round(installRate * spans);
    const installLabel = installFee <= 0
      ? "미반영"
      : mount.id === "plate"
        ? `베이스 플레이트 + 앵커 시공 ${formatCurrency(baseRate)}/m × ${meters.toFixed(2)}m · ${formatCurrency(installFee)}`
        : `시공비 (${mount.short}, 스팬 ${spans} × ${formatCurrency(installRate)}) · ${formatCurrency(installFee)}`;
    return {
      valid: true, warnings, lines, design, assets, color, panelColor, frameColor, height, lengthMm, corners, cornerType, wind, pitch1000, hsPoleType, mount, installLabel, meters,
      spans, lastW, cut, fullPanels, poles, sizeLabel, topKey, materialKrw, installFee, total: materialKrw + installFee
    };
  }

  function buildFencePreviewModel(result) {
    const { design, height } = result;
    const panelHex = series.colorMode === "single" ? result.color.hex : result.panelColor.hex;
    const frameHex = series.colorMode === "single" ? result.color.hex : result.frameColor.hex;
    const legend = [
      `${series.name} · ${design.label}`,
      series.colorMode === "single" ? `색상 ${result.color.label}` : `패널 ${result.panelColor.label.replace(/ \(.*\)$/, "")} · 프레임 ${result.frameColor.label}`,
      height.tiers > 1 ? `${height.tiers}단 ${height.combo.key} (${height.combo.tiers.map((mm) => formatNumber(mm)).join("+")})` : `${height.panels[0].key} 단단`,
      `스팬 ${result.spans}${result.cut ? ` (마지막 ${formatNumber(result.lastW)} 절단)` : ""} · 기둥 ${result.poles}본`,
      result.mount.short,
      result.wind === "high" ? "고강도 사양 42m/s" : "",
      result.corners ? `코너 ${result.corners}곳 · ${result.cornerType.short}` : "",
      fenLowerCoverToggle.checked ? "하부 막음 커버" : "",
      fenGrooveCoverToggle && fenGrooveCoverToggle.checked && height.tiers > 1 ? "다단 홈 커버" : ""
    ];
    return {
      kind: "fence",
      seriesName: series.name,
      designLabel: design.label,
      pattern: design.pattern,
      panelHex,
      frameHex,
      panelSwatch: series.colorMode === "dual" ? result.panelColor.swatch : null,
      tiers: height.panels.map((h) => h.mm),
      totalHeightMm: height.totalMm,
      spans: result.spans,
      lastW: result.lastW,
      cut: result.cut,
      lengthMm: result.lengthMm,
      poles: result.poles,
      pitch1000: result.pitch1000,
      postSize: height.tiers > 1 ? height.combo.post : 35,
      corners: result.corners,
      mount: result.mount.id,
      lowerCover: fenLowerCoverToggle.checked,
      highStrength: result.wind === "high",
      summary: `총 길이 ${formatNumber(result.lengthMm)} × 전고 ${formatNumber(height.totalMm)}mm · 스팬 ${result.spans}`,
      photo: result.assets.photo,
      photoCaption: `참고 사진 · ${series.name} ${design.label} (카탈로그 P.${design.page})`,
      legend
    };
  }

  function renderFenceMedia(result) {
    if (!result.valid) return;
    fenDesignMedia.innerHTML = mediaMarkup(result.assets.photo, `${series.name} ${result.design.label} · 가림률 ${result.design.screen}% · 채광 ${result.design.light}% · 통풍 ${result.design.vent}%`)
      + mediaMarkup(result.assets.draw, `${result.design.label} 패널 구성도 (W1998, 패널 피치 100)`);
    fenPoleMedia.innerHTML = result.height.tiers > 1
      ? mediaMarkup(FENCE_IMG + "multi-pole.jpg", `${result.height.tiers}단 프리폴 · 독립 기초 시공`)
      : result.mount.id === "plate"
        ? mediaMarkup(FENCE_IMG + "base-plate.jpg", "베이스 플레이트 (스테인리스) · 프리폴에 끼워 바닥 앵커 고정") + mediaMarkup(FENCE_IMG + "base-plate-side.jpg", "베이스 플레이트 측면 · 1m당 100,000원 (부자재 + 설치 인건비 + 경비)")
        : mediaMarkup(FENCE_IMG + "free-pole.jpg", result.mount.id === "block" ? "프리폴 35각 · 기존 담장 위 앵커 매설" : "프리폴 35각 · 신설 기초 콘크리트에 매설");
    fenOptionMedia.innerHTML = fenLowerCoverToggle.checked ? mediaMarkup(FENCE_IMG + "lower-cover.jpg", "하부 막음 커버 (틈새 55~85mm)") : "";
  }

  function renderFence() {
    const result = calculateFence();
    renderFenceMedia(result);
    renderStructurePreview(fenPreview, result.valid ? buildFencePreviewModel(result) : null);
    fenWarning.innerHTML = result.warnings.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    fenWarning.hidden = !result.warnings.length;
    if (!result.valid) {
      fenSpecSummary.textContent = "구성 불가";
      fenLastLines = [];
      fenBreakdown.innerHTML = `<tr><td colspan="2" class="porch-breakdown__empty">경고 내용을 확인하고 치수를 조정해 주세요.</td></tr>`;
      fenTotalKrw.textContent = formatCurrency(0);
      fenInstallKrw.textContent = formatCurrency(0);
      fenGrandTotal.textContent = formatCurrency(0);
      fenAddButton.disabled = true;
      return;
    }
    fenSpecSummary.textContent = `${result.design.label} · ${result.height.label} · ${result.sizeLabel} · 기둥 ${result.poles}본 (${result.mount.short})${result.corners ? ` · 코너 ${result.corners}` : ""}`;
    fenLastLines = result.lines;
    fenBreakdown.innerHTML = porchBreakdownRows(result.lines);
    fenTotalKrw.textContent = formatCurrency(result.materialKrw);
    fenInstallKrw.textContent = formatCurrency(result.installFee);
    fenGrandTotal.textContent = formatCurrency(result.total);
    fenAddButton.disabled = false;
  }

  function buildFenceForm() {
    fenDesignSelect.innerHTML = series.designs.map((item) => option(item.id, `${item.label} (가림률 ${item.screen}%)`)).join("");
    createSwatchPicker(fenDesignSelect, series.designs.map((item) => ({ id: item.id, label: `${item.label} (가림률 ${item.screen}%)`, swatch: fenceDesignAssets(series.id, item).draw })));
    if (series.colorMode === "single") {
      fenColorSelect.innerHTML = series.colors.map((item) => option(item.id, item.label)).join("");
      createSwatchPicker(fenColorSelect, series.colors);
    } else {
      fenPanelColorSelect.innerHTML = series.panelColors.map((item) => option(item.id, item.label)).join("");
      createSwatchPicker(fenPanelColorSelect, series.panelColors);
      fenFrameColorSelect.innerHTML = series.frameColors.map((item) => option(item.id, item.label)).join("");
      createSwatchPicker(fenFrameColorSelect, series.frameColors);
    }
    fenTiersSelect.innerHTML = option(1, "단단 (패널 1장, H06~H12)") + option(2, "2단 (패널 2장 상하 조합, 전고 ~3.1m)") + option(3, "3단 (패널 3장, 전고 ~3.7m)");
    fenCornerTypeSelect.innerHTML = FENCE_CORNER_TYPES.map((item) => option(item.id, item.label)).join("");
    fenWindSelect.innerHTML = FENCE_WIND.map((item) => option(item.id, item.label)).join("");
    fenMountSelect.innerHTML = FENCE_MOUNTS.map((item) => option(item.id, item.label)).join("");
    fenBaseRateInput.value = String(FENCE_BASE_PLATE_PER_M);
    fenCustomOptions.innerHTML = Array.from({ length: PORCH_CUSTOM_OPTION_COUNT }, (_, index) => `
      <div class="porch-option-row" data-porch-option>
        <input type="text" placeholder="옵션 ${index + 1} 명칭" data-porch-option-label>
        <input type="text" inputmode="numeric" placeholder="원화 금액" data-porch-option-krw>
      </div>
    `).join("");
    fenInstallRateInput.value = String(FENCE_DEFAULT_INSTALL_PER_SPAN);
    buildHeightOptions();
    fenHeightSelect.value = Array.from(fenHeightSelect.options).some((o) => o.value === "H10") ? "H10" : fenHeightSelect.options[0].value;
  }

  fenTiersSelect.addEventListener("change", buildHeightOptions);
  fenMountSelect.addEventListener("change", syncMountUi);
  fenDesignSelect.addEventListener("change", buildHeightOptions);
  fenForm.addEventListener("input", renderFence);
  fenForm.addEventListener("change", renderFence);
  fenForm.addEventListener("submit", (event) => event.preventDefault());

  fenAddButton.addEventListener("click", () => {
    const result = calculateFence();
    if (!result.valid) return;
    const specParts = [
      `${result.design.label} · ${result.height.label}`,
      `총 길이 ${formatNumber(result.lengthMm)}mm (스팬 ${result.spans}${result.cut ? `, 절단 ${formatNumber(result.lastW)}` : ""})`,
      series.colorMode === "single" ? result.color.label : `패널 ${result.panelColor.label.replace(/ \(.*\)$/, "")} / 프레임 ${result.frameColor.label}`,
      result.mount.short,
      result.wind === "high" ? "고강도 사양" : "",
      result.corners ? `코너 ${result.corners} (${result.cornerType.short})` : ""
    ].filter(Boolean);
    quoteItems.push({
      category: series.category,
      name: series.name,
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

  SPECIAL_PRODUCTS.push({ id: cfg.id, label: series.name, panel: cfg.panel });
  buildFenceForm();
  renderFence();
}

createFenceConfigurator({ id: "sensiafence", prefix: "sfa", series: "sensia", panel: "#sfaConfigurator" });
createFenceConfigurator({ id: "sensiafenceR", prefix: "sfr", series: "sensiaR", panel: "#sfrConfigurator" });
buildSpecialProductSelect();
showSpecialProduct(specialProductSelect.value);
