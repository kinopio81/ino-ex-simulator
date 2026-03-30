const products = [
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "엘리지안 EY 07 / (트래버틴)", spec: "1,200x600x20T (0.72m2) / 32kg/box 44.4kg/m2", packUnit: "박스 당 1장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 120000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "노르 RR 09 / (자연석)", spec: "600x600x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 110000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "콰지티 QR 02 / (샌드스톤)", spec: "600x600x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 110000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "글로컬 GC 02 / (콘크리트)", spec: "1200x600x20T (0.72m2) / 32kg/box 44.4kg/m2", packUnit: "박스 당 1장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 120000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "글로컬 GC 03 / (콘크리트)", spec: "600x600x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 110000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "오드 OU 02 / (우드)", spec: "1200x300x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "오드 OU 05 / (우드)", spec: "1200x300x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 MIRAGE)", name: "길리안 GY 04 / (우드)", spec: "1200x300x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "MIRAGE / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "엘리멘테 LABI", spec: "1000x1000x20T (1.00m2) / 44.9kg/box 44.9kg/m2", packUnit: "박스 당 1장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "엘리멘테 SABULA", spec: "1000x1000x20T (1.00m2) / 44.9kg/box 44.9kg/m2", packUnit: "박스 당 1장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "아스트라 FOG", spec: "600x600x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 120000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "콰지티에 CENERE", spec: "600x600x20T (0.36m2) / 32.33kg/box 44.9kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 120000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "트라메 ORIENTALE", spec: "1200x1200x8T (1.44m2) / 50.69kg/box 17.6kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "트라메 CALEIDOSCOPIO", spec: "1200x1200x8T (1.44m2) / 50.69kg/box 17.6kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 140000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "루체 GOLD", spec: "1000x1000x6T (1.00m2) / 26.4kg/box 13.2kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 160000 }] },
  { category: "포세린 타일 / (이탈리아 IRIS)", name: "루체 SILVER", spec: "1000x1000x6T (1.00m2) / 26.4kg/box 13.2kg/m2", packUnit: "박스 당 2장", unit: "m2", leadTime: "약 3개월", supplier: "IRIS / (이탈리아)", options: [{ label: "기본", price: 160000 }] },
  { category: "가든 악세사리 / (수전)", name: "스프레 수전 / 오르타포트", spec: "수전 64x64x800 / 오르타포트 350x150", packUnit: "각 1EA씩 / 별도 포장", unit: "EA / SET", leadTime: "약 2주", supplier: "유니손 / (일본)", options: [{ label: "단품", price: 820000 }, { label: "SET", price: 1105000 }] },
  { category: "가든 악세사리 / (수전)", name: "라이언 수전 / 포트", spec: "수전 70x1050x260 / 포트 350x830", packUnit: "각 1EA씩 / 별도 포장", unit: "SET", leadTime: "약 2주", supplier: "유니손 / (일본)", options: [{ label: "SET", price: 1555000 }] },
  { category: "가든 악세사리 / (수전)", name: "피노 수전 & 포트", spec: "수전 ø43x1143 / 포트 350x830", packUnit: "각 1EA씩 / 별도 포장", unit: "SET", leadTime: "약 2주", supplier: "유니손 / (일본)", options: [{ label: "SET", price: 1400000 }] },
  { category: "가든 악세사리 / (수전)", name: "바루 수전 & 데미 포트", spec: "수전 ø22x920 / 데미포트 ø360x170", packUnit: "각 1EA씩 / 별도 포장", unit: "SET", leadTime: "약 2주", supplier: "유니손 / (일본)", options: [{ label: "SET", price: 1120000 }] },
  { category: "가든 악세사리 / (우체통)", name: "크롬우체통 / 스탠드", spec: "우체통 337x124x420 / 스탠드 180x1170x30", packUnit: "각 1EA씩 / 별도 포장", unit: "EA / SET", leadTime: "약 2주", supplier: "유니손 / (일본)", options: [{ label: "단품", price: 480000 }, { label: "SET", price: 900000 }] },
  { category: "가든 악세사리 / (쉐이드 네트)", name: "셰이드네트 / 사각", spec: "5000x3000 / 기둥SET 최대 4개 필요", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 622000 }] },
  { category: "가든 악세사리 / (쉐이드 네트)", name: "셰이드네트 / 삼각", spec: "5000x5000x5000 / 기둥SET 최대 3개 필요", packUnit: "1EA", unit: "EA", leadTime: "-", supplier: "-", options: [{ label: "기본", price: 434000 }] },
  { category: "가든 악세사리 / (쉐이드 네트)", name: "셰이드용 기둥 1개 SET", spec: "연결고리 포함 / 높이 선택 H2500 또는 H3000 / Φ60x2900", packUnit: "1SET", unit: "SET", leadTime: "-", supplier: "-", options: [{ label: "기본", price: 405000 }] },
  { category: "가든 악세사리 / (명패)", name: "아트사인 4형", spec: "180x9x180", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 298000 }] },
  { category: "가든 악세사리 / (명패)", name: "아트사인 6형", spec: "350x15x15", packUnit: "1SET", unit: "SET", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 498000 }] },
  { category: "가든 액세사리 / (우드크리트)", name: "우드크리트", spec: "1000x200xT60", packUnit: "각 1EA씩", unit: "EA", leadTime: "약 8주", supplier: "니꼬 / (일본)", options: [{ label: "기본", price: 120000 }] },
  { category: "가든 액세사리 / (벤치형)", name: "IKS 테이블", spec: "테이블 1800x900x830", packUnit: "각 1EA씩 / 별도 포장", unit: "EA", leadTime: "약 2개월", supplier: "니꼬 / (일본)", options: [{ label: "단품", price: 4134000 }] },
  { category: "가든 액세사리 / (벤치형)", name: "IKS 벤치", spec: "벤치 1800x400x660", packUnit: "각 1EA씩 / 별도 포장", unit: "EA", leadTime: "-", supplier: "-", options: [{ label: "단품", price: 2000000 }] },
  { category: "가든 액세사리 / (벤치형)", name: "IKS 테이블(1EA) & 벤치(2EA) SET", spec: "테이블 1800x900x830 / 벤치 1800x400x660 x 2EA", packUnit: "각 1EA씩 / 별도 포장", unit: "SET", leadTime: "-", supplier: "-", options: [{ label: "SET", price: 8134000 }] },
  { category: "가든 액세사리 / (벤치형)", name: "연속형 벤치", spec: "1090x500x520", packUnit: "각 1EA씩", unit: "EA", leadTime: "약 2개월", supplier: "-", options: [{ label: "기본", price: 2000000 }] },
  { category: "가든 액세사리 / (카포트)", name: "홈야드루프 / 카야드 스타일", spec: "W6000xL6000xH3000", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 25409000 }] },
  { category: "가든 액세사리 / (파고라)", name: "홈야드루프 / 글라스포치", spec: "W4000xL6000xH3000 / 3면 유리 포함", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 30408000 }] },
  { category: "가든 액세사리 / (내, 외장재)", name: "에버아트 보드 / EVERART BOARD", spec: "910x2440", packUnit: "1장", unit: "m2", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 336000 }] },
  { category: "가든 액세사리 / (내, 외장재, 독립재)", name: "에버아트 우드 / EVERART WOOD", spec: "75x75x1800 / 각재", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 138000 }] },
  { category: "이노블록 월", name: "노보월S", spec: "500x250x150", packUnit: "-", unit: "EA", leadTime: "약 1개월", supplier: "자체생산", options: [{ label: "기본", price: 25000 }] },
  { category: "이노블록 월", name: "스테가월", spec: "394x250xH98 / 다각형 구조 / 1m2 = 13ea", packUnit: "-", unit: "EA", leadTime: "약 6개월", supplier: "고델만 / (독일)", options: [{ label: "기본", price: 25000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "월라이트", spec: "100x50x43 / 12V·24V / 1.8W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 270000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "스프레드 라이트", spec: "Ø145x450 / 12V·24V / 3.5W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 360000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "익스프레스 미니 폴라이트", spec: "Ø140x306 / 12V / 4.5W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 390000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "에버아트 폴라이트", spec: "Ø78x626 / 12V·24V / 3.6W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 430000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "가든 업라이트 미오", spec: "78x76x150 / 12V / 2W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 190000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "도트리스 LED바", spec: "1000x13x6 / 12V / 1.2W", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 170000 }] },
  { category: "익스테리어 상품 / (LED조명)", name: "12V 트랜스", spec: "222x62x174 / 타이머 설정 가능 / 용량 75W (권장 52.5W)", packUnit: "1EA", unit: "EA", leadTime: "약 1개월", supplier: "타카쇼 / (일본)", options: [{ label: "기본", price: 330000 }] },
  { category: "익스테리어 상품 / (조경석)", name: "호피석", spec: "50T 부정형", packUnit: "m2", unit: "m2", leadTime: "약 1주", supplier: "-", options: [{ label: "기본", price: 30800 }] },
  { category: "익스테리어 상품 / (조경석)", name: "해미석", spec: "30mm / 40mm", packUnit: "1포", unit: "포", leadTime: "약 1주", supplier: "-", options: [{ label: "기본", price: 11200 }] },
  { category: "익스테리어 상품 / (조경석)", name: "개비온석", spec: "80~150mm", packUnit: "1톤", unit: "톤", leadTime: "약 1주", supplier: "-", options: [{ label: "기본", price: 336000 }] }
];

const productImages = {
  "엘리지안 EY 07 / (트래버틴)": "assets/products/image8.png",
  "노르 RR 09 / (자연석)": "assets/products/image9.png",
  "콰지티 QR 02 / (샌드스톤)": "assets/products/image10.png",
  "글로컬 GC 02 / (콘크리트)": "assets/products/image11.png",
  "글로컬 GC 03 / (콘크리트)": "assets/products/image12.png",
  "오드 OU 02 / (우드)": "assets/products/image13.png",
  "오드 OU 05 / (우드)": "assets/products/image14.png",
  "길리안 GY 04 / (우드)": "assets/products/image15.png",
  "엘리멘테 LABI": "assets/products/image16.png",
  "엘리멘테 SABULA": "assets/products/image17.png",
  "아스트라 FOG": "assets/products/image18.png",
  "콰지티에 CENERE": "assets/products/image19.png",
  "트라메 ORIENTALE": "assets/products/image20.png",
  "트라메 CALEIDOSCOPIO": "assets/products/image21.png",
  "루체 GOLD": "assets/products/image22.png",
  "루체 SILVER": "assets/products/image23.png",
  "스프레 수전 / 오르타포트": "assets/products/image24.png",
  "라이언 수전 / 포트": "assets/products/image25.png",
  "피노 수전 & 포트": "assets/products/image26.png",
  "바루 수전 & 데미 포트": "assets/products/image27.png",
  "크롬우체통 / 스탠드": "assets/products/image28.png",
  "셰이드네트 / 삼각": "assets/products/image29.png",
  "셰이드네트 / 사각": "assets/products/image30.png",
  "셰이드용 기둥 1개 SET": "assets/products/Image 90.jpg",
  "아트사인 4형": "assets/products/image32.png",
  "아트사인 6형": "assets/products/image33.png",
  "IKS 테이블": "assets/products/image34.png",
  "IKS 벤치": "assets/products/image34.png",
  "IKS 테이블(1EA) & 벤치(2EA) SET": "assets/products/image34.png",
  "우드크리트": "assets/products/image35.png",
  "연속형 벤치": "assets/products/image36.png",
  "홈야드루프 / 글라스포치": "assets/products/image37.png",
  "에버아트 우드 / EVERART WOOD": "assets/products/image38.png",
  "노보월S": "assets/products/image39.png",
  "월라이트": "assets/products/image40.png",
  "스프레드 라이트": "assets/products/image41.png",
  "익스프레스 미니 폴라이트": "assets/products/image42.png",
  "에버아트 폴라이트": "assets/products/image43.png",
  "가든 업라이트 미오": "assets/products/image44.png",
  "도트리스 LED바": "assets/products/image45.png",
  "12V 트랜스": "assets/products/image46.png",
  "홈야드루프 / 카야드 스타일": "assets/products/image1.png",
  "에버아트 보드 / EVERART BOARD": "assets/products/image4.jpeg",
  "호피석": "assets/products/image6.png",
  "해미석": "assets/products/image7.png",
  "개비온석": "assets/products/image5.png"
};

const tileInstallRates = {
  "600x600": { dryPedestal: 67000, wetMortar: 70000 },
  "1200x300": { dryPedestal: 85000, wetMortar: 70000 },
  "1200x600": { dryPedestal: 67000, wetMortar: 70000 },
  "1000x1000": { dryPedestal: 65000, wetMortar: 70000 },
  "1200x1200": { dryPedestal: 70000, wetMortar: 70000 }
};

const fixedInstallRules = {
  "스프레 수전 / 오르타포트": {
    kind: "fixed",
    methods: [
      { id: "faucet_basic", label: "수전 교체만", rate: 200000, unitLabel: "EA당 시공비" },
      { id: "faucet_pipe", label: "하부 수도관 수정 포함", rate: 500000, unitLabel: "EA당 시공비" }
    ],
    note: "수전 제품은 교체 범위에 따라 시공비가 달라집니다."
  },
  "라이언 수전 / 포트": {
    kind: "fixed",
    methods: [
      { id: "faucet_basic", label: "수전 교체만", rate: 200000, unitLabel: "SET당 시공비" },
      { id: "faucet_pipe", label: "하부 수도관 수정 포함", rate: 500000, unitLabel: "SET당 시공비" }
    ],
    note: "수전 제품은 교체 범위에 따라 시공비가 달라집니다."
  },
  "피노 수전 & 포트": {
    kind: "fixed",
    methods: [
      { id: "faucet_basic", label: "수전 교체만", rate: 200000, unitLabel: "SET당 시공비" },
      { id: "faucet_pipe", label: "하부 수도관 수정 포함", rate: 500000, unitLabel: "SET당 시공비" }
    ],
    note: "수전 제품은 교체 범위에 따라 시공비가 달라집니다."
  },
  "바루 수전 & 데미 포트": {
    kind: "fixed",
    methods: [
      { id: "faucet_basic", label: "수전 교체만", rate: 200000, unitLabel: "SET당 시공비" },
      { id: "faucet_pipe", label: "하부 수도관 수정 포함", rate: 500000, unitLabel: "SET당 시공비" }
    ],
    note: "수전 제품은 교체 범위에 따라 시공비가 달라집니다."
  },
  "크롬우체통 / 스탠드": {
    kind: "fixed",
    methods: [{ id: "mailbox", label: "기본 시공", rate: 500000, unitLabel: "SET당 시공비" }],
    note: "우체통 설치 시공비가 반영됩니다."
  },
  "셰이드네트 / 사각": {
    kind: "fixed",
    methods: [{ id: "shade_square", label: "기본 시공", rate: 500000, unitLabel: "EA당 시공비" }],
    note: "현장 컨디션에 따라 바닥 평탄화나 미장이 추가될 수 있습니다."
  },
  "셰이드네트 / 삼각": {
    kind: "fixed",
    methods: [{ id: "shade_triangle", label: "기본 시공", rate: 500000, unitLabel: "EA당 시공비" }],
    note: "현장 컨디션에 따라 바닥 평탄화나 미장이 추가될 수 있습니다."
  },
  "아트사인 4형": {
    kind: "fixed",
    methods: [{ id: "artsign", label: "기본 시공", rate: 50000, unitLabel: "EA당 시공비" }],
    note: "명패 설치 시공비를 반영합니다."
  },
  "아트사인 6형": {
    kind: "fixed",
    methods: [{ id: "artsign", label: "기본 시공", rate: 50000, unitLabel: "SET당 시공비" }],
    note: "명패 설치 시공비를 반영합니다."
  },
  "홈야드루프 / 카야드 스타일": {
    kind: "fixed",
    methods: [{ id: "carport", label: "기본 시공", rate: 4800000, unitLabel: "EA당 시공비" }],
    note: "카포트 시공 고정비가 반영됩니다."
  },
  "홈야드루프 / 글라스포치": {
    kind: "fixed",
    methods: [{ id: "pergola", label: "기본 시공", rate: 4800000, unitLabel: "EA당 시공비" }],
    note: "파고라 시공 고정비가 반영됩니다."
  },
  "에버아트 보드 / EVERART BOARD": {
    kind: "area",
    methods: [{ id: "board_install", label: "보드 시공", rate: 85000, unitLabel: "m2당 시공비" }],
    note: "에버아트 보드는 m2당 시공비로 계산됩니다."
  },
  "에버아트 우드 / EVERART WOOD": {
    kind: "length",
    methods: [{ id: "wood_install", label: "우드 시공", rate: 15000, unitLabel: "m당 시공비" }],
    note: "에버아트 우드는 간격에 따라 m당 자재비와 m당 시공비 기준으로 계산됩니다."
  }
};

const excludedInstallNames = new Set([
  "우드크리트",
  "IKS 테이블",
  "IKS 벤치",
  "IKS 테이블(1EA) & 벤치(2EA) SET",
  "연속형 벤치",
  "노보월S",
  "스테가월",
  "월라이트",
  "스프레드 라이트",
  "익스프레스 미니 폴라이트",
  "에버아트 폴라이트",
  "가든 업라이트 미오",
  "도트리스 LED바",
  "12V 트랜스",
  "호피석",
  "해미석",
  "개비온석"
]);

const categorySelect = document.querySelector("#categorySelect");
const productSelect = document.querySelector("#productSelect");
const optionSelect = document.querySelector("#optionSelect");
const quantityInput = document.querySelector("#quantityInput");
const quantityLabel = document.querySelector("#quantityLabel");
const installToggle = document.querySelector("#installToggle");
const installMethodSelect = document.querySelector("#installMethodSelect");
const addButton = document.querySelector("#addButton");
const printButton = document.querySelector("#printButton");
const resetButton = document.querySelector("#resetButton");
const goBuilderButton = document.querySelector("#goBuilderButton");
const goCartButton = document.querySelector("#goCartButton");
const builderToCartButton = document.querySelector("#builderToCartButton");
const backToBuilderButton = document.querySelector("#backToBuilderButton");
const builderView = document.querySelector("#builderView");
const cartView = document.querySelector("#cartView");
const cartList = document.querySelector("#cartList");
const cartEmpty = document.querySelector("#cartEmpty");
const cartBadge = document.querySelector("#cartBadge");
const printQuoteBody = document.querySelector("#printQuoteBody");

const previewName = document.querySelector("#previewName");
const previewSpec = document.querySelector("#previewSpec");
const previewPackUnit = document.querySelector("#previewPackUnit");
const previewUnit = document.querySelector("#previewUnit");
const previewLeadTime = document.querySelector("#previewLeadTime");
const previewSupplier = document.querySelector("#previewSupplier");
const previewPrice = document.querySelector("#previewPrice");
const previewMaterialSubtotal = document.querySelector("#previewMaterialSubtotal");
const previewInstallSubtotal = document.querySelector("#previewInstallSubtotal");
const previewSubtotal = document.querySelector("#previewSubtotal");
const previewImage = document.querySelector("#previewImage");
const previewImagePlaceholder = document.querySelector("#previewImagePlaceholder");
const installRatePreview = document.querySelector("#installRatePreview");
const installNote = document.querySelector("#installNote");

const materialTotal = document.querySelector("#materialTotal");
const materialTotalHero = document.querySelector("#materialTotalHero");
const installTotal = document.querySelector("#installTotal");
const grandTotal = document.querySelector("#grandTotal");
const selectedCount = document.querySelector("#selectedCount");
const printMaterialTotal = document.querySelector("#printMaterialTotal");
const printInstallTotal = document.querySelector("#printInstallTotal");
const printGrandTotal = document.querySelector("#printGrandTotal");
const printDate = document.querySelector("#printDate");

const quoteItems = [];

function formatCurrency(value) {
  return new Intl.NumberFormat("ko-KR").format(Math.round(value)) + "원";
}

function formatNumber(value) {
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(2));
  return new Intl.NumberFormat("ko-KR").format(rounded);
}

function parseQuantityValue(rawValue, fallback) {
  const normalized = String(rawValue).replace(/,/g, "").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildCategories() {
  const categories = [...new Set(products.map((product) => product.category))];
  categorySelect.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

function getSelectedProduct() {
  return getProductsByCategory(categorySelect.value).find((product) => product.name === productSelect.value);
}

function getSelectedOption(product) {
  return product.options[Number(optionSelect.value) || 0];
}

function getTileSizeKey(product) {
  const normalizedSpec = product.spec
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/\s+/g, "");

  if (normalizedSpec.includes("600x600")) return "600x600";
  if (normalizedSpec.includes("1200x300")) return "1200x300";
  if (normalizedSpec.includes("1200x600")) return "1200x600";
  if (normalizedSpec.includes("1000x1000")) return "1000x1000";
  if (normalizedSpec.includes("1200x1200")) return "1200x1200";
  return "";
}

function getEverArtWoodMaterialRate(product, option) {
  const specMatch = product.spec.match(/x(\d{4})/i);
  const lengthMm = specMatch ? Number(specMatch[1]) : 1800;
  const lengthMeter = lengthMm / 1000;
  return option.price / lengthMeter;
}

function getBoardAreaFromSpec(product) {
  const normalizedSpec = product.spec.replace(/,/g, "").trim();
  const match = normalizedSpec.match(/(\d+)\s*x\s*(\d+)/i);
  if (!match) {
    return 1;
  }

  const widthMeter = Number(match[1]) / 1000;
  const heightMeter = Number(match[2]) / 1000;
  return widthMeter * heightMeter;
}

function getInstallRule(product, option) {
  if (product.category.startsWith("포세린 타일")) {
    const sizeKey = getTileSizeKey(product);
    const rates = tileInstallRates[sizeKey];
    if (!rates) {
      return { available: false, note: "타일 규격에 맞는 시공 단가를 아직 연결하지 못했습니다." };
    }

    return {
      available: true,
      kind: "area",
      methods: [
        { id: "dry_pedestal", label: "건식(페데스탈)", rate: rates.dryPedestal, unitLabel: "m2당 시공비" },
        { id: "wet_mortar", label: "습식(몰탈 압착)", rate: rates.wetMortar, unitLabel: "m2당 시공비" }
      ],
      note: "타일은 페데스탈을 이용한 건식공법과 몰탈 압착 습식공법 중에서 선택할 수 있습니다."
    };
  }

  if (fixedInstallRules[product.name]) {
    if (product.name === "에버아트 우드 / EVERART WOOD") {
      const materialRate = getEverArtWoodMaterialRate(product, option);
      return {
        available: true,
        ...fixedInstallRules[product.name],
        materialRatePerUnit: materialRate,
        materialUnitLabel: "m당 자재비"
      };
    }
    return { available: true, ...fixedInstallRules[product.name] };
  }

  if (excludedInstallNames.has(product.name)) {
    return { available: false, note: "이 제품은 조경공사 포함 또는 별도 협의 품목이라 시공비를 제외했습니다." };
  }

  return { available: false, note: "현재 등록된 시공비 정보가 없습니다." };
}

function renderProductOptions() {
  const categoryProducts = getProductsByCategory(categorySelect.value);
  productSelect.innerHTML = categoryProducts.map((product) => `<option value="${product.name}">${product.name}</option>`).join("");
}

function renderPriceOptions() {
  const product = getSelectedProduct();
  optionSelect.innerHTML = product.options.map((option, index) => `<option value="${index}">${option.label}</option>`).join("");
}

function renderInstallMethods() {
  const product = getSelectedProduct();
  const option = getSelectedOption(product);
  const installRule = getInstallRule(product, option);

  if (!installRule.available) {
    installMethodSelect.innerHTML = `<option value="">시공 없음</option>`;
    installMethodSelect.disabled = true;
    installToggle.checked = false;
    installToggle.disabled = true;
    installRatePreview.textContent = "시공 없음";
    installNote.textContent = installRule.note;
    return;
  }

  installMethodSelect.disabled = false;
  installToggle.disabled = false;
  installMethodSelect.innerHTML = installRule.methods.map((method, index) => `<option value="${index}">${method.label}</option>`).join("");

  const selectedMethod = installRule.methods[0];
  const materialLine = installRule.materialRatePerUnit
    ? `${installRule.materialUnitLabel} ${formatCurrency(installRule.materialRatePerUnit)}`
    : "";
  const divider = materialLine ? " / " : "";

  installRatePreview.textContent = `${selectedMethod.unitLabel} ${formatCurrency(selectedMethod.rate)}${divider}${materialLine}`;
  installNote.textContent = installRule.note;
}

function getQuantityMeta(product, option) {
  const installRule = getInstallRule(product, option);

  if (product.name === "에버아트 우드 / EVERART WOOD") {
    return { label: "길이(m)", min: 0.1, step: 0.1, unitText: "m" };
  }

  if (installRule.kind === "area" || product.unit.includes("m2")) {
    return { label: "면적(m2)", min: 0.1, step: 0.1, unitText: "m2" };
  }

  return { label: "수량", min: 1, step: 1, unitText: product.unit || "EA" };
}

function normalizeQuantityInput() {
  const product = getSelectedProduct();
  const option = getSelectedOption(product);
  const quantityMeta = getQuantityMeta(product, option);
  const parsed = parseQuantityValue(quantityInput.value, quantityMeta.min);
  const clamped = Math.max(quantityMeta.min, parsed);
  const normalized = quantityMeta.step === 1 ? Math.round(clamped) : Number(clamped.toFixed(2));
  quantityInput.value = String(normalized);
  return normalized;
}

function getMaterialAmount(product, option, quantity, installRule) {
  if (product.name === "에버아트 우드 / EVERART WOOD" && installRule.materialRatePerUnit) {
    return installRule.materialRatePerUnit * quantity;
  }

  if (product.name === "에버아트 보드 / EVERART BOARD") {
    const boardArea = getBoardAreaFromSpec(product);
    const materialRatePerSquareMeter = option.price / boardArea;
    return materialRatePerSquareMeter * quantity;
  }

  return option.price * quantity;
}

function getInstallAmount(quantity, installRule, selectedMethodIndex) {
  if (!installRule.available || !installToggle.checked) {
    return 0;
  }

  const method = installRule.methods[selectedMethodIndex];
  return method.rate * quantity;
}

function updateInstallRatePreview() {
  const product = getSelectedProduct();
  const option = getSelectedOption(product);
  const installRule = getInstallRule(product, option);

  if (!installRule.available) {
    installRatePreview.textContent = "시공 없음";
    installNote.textContent = installRule.note;
    return;
  }

  const method = installRule.methods[Number(installMethodSelect.value) || 0];
  const materialLine = installRule.materialRatePerUnit
    ? ` / ${installRule.materialUnitLabel} ${formatCurrency(installRule.materialRatePerUnit)}`
    : "";

  installRatePreview.textContent = `${method.unitLabel} ${formatCurrency(method.rate)}${materialLine}`;
  installNote.textContent = installRule.note;
}

function getMaterialLabel(product, option, installRule) {
  if (product.name === "에버아트 우드 / EVERART WOOD" && installRule.materialRatePerUnit) {
    return `m당 자재비 · ${formatCurrency(installRule.materialRatePerUnit)}`;
  }

  if (product.name === "에버아트 보드 / EVERART BOARD") {
    return `m2당 자재비 · ${formatCurrency(option.price / getBoardAreaFromSpec(product))}`;
  }

  return `${option.label} · ${formatCurrency(option.price)}`;
}

function renderPreviewImage(product) {
  const imageSrc = productImages[product.name];
  previewImage.alt = product.name;

  if (!imageSrc) {
    previewImage.hidden = true;
    previewImage.removeAttribute("src");
    previewImagePlaceholder.hidden = false;
    return;
  }

  previewImage.hidden = false;
  previewImagePlaceholder.hidden = true;
  previewImage.src = imageSrc;
}

function updatePreview() {
  const product = getSelectedProduct();
  const option = getSelectedOption(product);
  const installRule = getInstallRule(product, option);
  const quantityMeta = getQuantityMeta(product, option);
  const parsedQuantity = Math.max(quantityMeta.min, parseQuantityValue(quantityInput.value, quantityMeta.min));
  const quantity = quantityMeta.step === 1 ? Math.round(parsedQuantity) : parsedQuantity;
  const materialAmount = getMaterialAmount(product, option, quantity, installRule);
  const installAmount = getInstallAmount(quantity, installRule, Number(installMethodSelect.value) || 0);
  const totalAmount = materialAmount + installAmount;

  quantityLabel.textContent = quantityMeta.label;
  quantityInput.dataset.min = String(quantityMeta.min);
  quantityInput.dataset.step = String(quantityMeta.step);
  quantityInput.placeholder = quantityMeta.step === 1 ? "1" : "0.1";

  previewName.textContent = product.name;
  previewSpec.textContent = product.spec;
  previewPackUnit.textContent = product.packUnit;
  previewUnit.textContent = quantityMeta.unitText;
  previewLeadTime.textContent = product.leadTime;
  previewSupplier.textContent = product.supplier;
  previewPrice.textContent = getMaterialLabel(product, option, installRule);

  updateInstallRatePreview();
  previewMaterialSubtotal.textContent = formatCurrency(materialAmount);
  previewInstallSubtotal.textContent = formatCurrency(installAmount);
  previewSubtotal.textContent = formatCurrency(totalAmount);
  renderPreviewImage(product);
}

function renderCartBadge() {
  cartBadge.textContent = String(quoteItems.length);
  selectedCount.textContent = String(quoteItems.length);
}

function renderCartList() {
  if (!quoteItems.length) {
    cartList.innerHTML = "";
    cartEmpty.classList.add("is-visible");
    return;
  }

  cartEmpty.classList.remove("is-visible");
  cartList.innerHTML = quoteItems.map((item, index) => `
    <article class="cart-item">
      <div class="cart-item__media">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}">`
          : `<div class="cart-item__placeholder">이미지 준비중</div>`}
      </div>
      <div>
        <div class="cart-item__top">
          <div>
            <span class="pill">${item.category}</span>
            <h3 class="cart-item__name">${item.name}</h3>
          </div>
          <button class="remove-button" type="button" data-index="${index}">삭제</button>
        </div>
        <div class="cart-item__meta">
          <div><span>자재 옵션</span><strong>${item.materialLabel}</strong></div>
          <div><span>시공 옵션</span><strong>${item.installLabel}</strong></div>
          <div><span>규격</span><strong>${item.spec}</strong></div>
          <div><span>수량</span><strong>${formatNumber(item.quantity)} ${item.quantityUnit}</strong></div>
        </div>
      </div>
      <div class="cart-item__amount">
        <div><span>자재비</span><strong>${formatCurrency(item.materialAmount)}</strong></div>
        <div><span>시공비</span><strong>${formatCurrency(item.installAmount)}</strong></div>
        <div><span>합계</span><strong>${formatCurrency(item.totalAmount)}</strong></div>
      </div>
    </article>
  `).join("");
}

function renderPrintQuote() {
  if (!quoteItems.length) {
    printQuoteBody.innerHTML = '<tr class="empty-row"><td colspan="10">추가된 견적 항목이 없습니다.</td></tr>';
    return;
  }

  printQuoteBody.innerHTML = quoteItems.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        ${item.image
          ? `<img class="print-thumb" src="${item.image}" alt="${item.name}">`
          : `<div class="print-thumb print-thumb--empty">-</div>`}
      </td>
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${item.materialLabel}</td>
      <td>${item.installLabel}</td>
      <td>${formatNumber(item.quantity)} ${item.quantityUnit}</td>
      <td>${formatCurrency(item.materialAmount)}</td>
      <td>${formatCurrency(item.installAmount)}</td>
      <td>${formatCurrency(item.totalAmount)}</td>
    </tr>
  `).join("");
}

function updateTotals() {
  const material = quoteItems.reduce((sum, item) => sum + item.materialAmount, 0);
  const install = quoteItems.reduce((sum, item) => sum + item.installAmount, 0);
  const total = material + install;

  materialTotal.textContent = formatCurrency(material);
  materialTotalHero.textContent = formatCurrency(total);
  installTotal.textContent = formatCurrency(install);
  grandTotal.textContent = formatCurrency(total);
  printMaterialTotal.textContent = formatCurrency(material);
  printInstallTotal.textContent = formatCurrency(install);
  printGrandTotal.textContent = formatCurrency(total);
  printDate.textContent = `출력일시: ${new Date().toLocaleString("ko-KR")}`;
  renderCartBadge();
}

function switchView(view) {
  const showBuilder = view === "builder";
  builderView.classList.toggle("view--active", showBuilder);
  cartView.classList.toggle("view--active", !showBuilder);
  goBuilderButton.classList.toggle("is-active", showBuilder);
}

function syncAll() {
  renderInstallMethods();
  updatePreview();
  renderCartList();
  renderPrintQuote();
  updateTotals();
}

categorySelect.addEventListener("change", () => {
  renderProductOptions();
  renderPriceOptions();
  syncAll();
});

productSelect.addEventListener("change", () => {
  renderPriceOptions();
  syncAll();
});

optionSelect.addEventListener("change", syncAll);
installMethodSelect.addEventListener("change", updatePreview);
installToggle.addEventListener("change", updatePreview);
quantityInput.addEventListener("input", updatePreview);
quantityInput.addEventListener("blur", () => {
  normalizeQuantityInput();
  updatePreview();
});

addButton.addEventListener("click", () => {
  const product = getSelectedProduct();
  const option = getSelectedOption(product);
  const installRule = getInstallRule(product, option);
  const quantityMeta = getQuantityMeta(product, option);
  const parsedQuantity = Math.max(quantityMeta.min, parseQuantityValue(quantityInput.value, quantityMeta.min));
  const quantity = quantityMeta.step === 1 ? Math.round(parsedQuantity) : parsedQuantity;
  const installMethod = installRule.available ? installRule.methods[Number(installMethodSelect.value) || 0] : null;

  const materialAmount = getMaterialAmount(product, option, quantity, installRule);
  const installAmount = getInstallAmount(quantity, installRule, Number(installMethodSelect.value) || 0);

  quoteItems.push({
    category: product.category,
    name: product.name,
    spec: product.spec,
    image: productImages[product.name] || "",
    materialLabel: getMaterialLabel(product, option, installRule),
    installLabel: installToggle.checked && installMethod
      ? `${installMethod.label} · ${formatCurrency(installMethod.rate)}`
      : "미반영",
    quantity,
    quantityUnit: quantityMeta.unitText,
    materialAmount,
    installAmount,
    totalAmount: materialAmount + installAmount
  });

  quantityInput.value = quantityMeta.step === 1 ? "1" : "0.1";
  renderCartList();
  renderPrintQuote();
  updateTotals();
  updatePreview();
});

resetButton.addEventListener("click", () => {
  quoteItems.length = 0;
  renderCartList();
  renderPrintQuote();
  updateTotals();
  updatePreview();
});

printButton.addEventListener("click", () => {
  renderPrintQuote();
  updateTotals();
  window.print();
});

cartList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.matches(".remove-button")) {
    return;
  }

  const index = Number(target.dataset.index);
  quoteItems.splice(index, 1);
  renderCartList();
  renderPrintQuote();
  updateTotals();
});

goBuilderButton.addEventListener("click", () => switchView("builder"));
goCartButton.addEventListener("click", () => switchView("cart"));
builderToCartButton.addEventListener("click", () => switchView("cart"));
backToBuilderButton.addEventListener("click", () => switchView("builder"));

previewImage.addEventListener("error", () => {
  previewImage.hidden = true;
  previewImagePlaceholder.hidden = false;
});

buildCategories();
renderProductOptions();
renderPriceOptions();
syncAll();
switchView("builder");
