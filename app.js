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
  { category: "가든 액세사리 / (가든 휀스)", name: "센시아 휀스 / 세로 가는 격자", spec: "600x2000", packUnit: "1EA", unit: "EA", leadTime: "-", supplier: "-", options: [{ label: "기본", price: 270000 }] },
  { category: "가든 액세사리 / (가든 휀스)", name: "센시아 휀스 / 가로 격자", spec: "600x2000", packUnit: "1EA", unit: "EA", leadTime: "-", supplier: "-", options: [{ label: "기본", price: 216000 }] },
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
  "엘리멘테 LABI": "assets/products/image17.png",
  "엘리멘테 SABULA": "assets/products/image16.png",
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
  "올글라스포치Ⅱ 슬라이드 시스템": "assets/products/image37.png",
  "홈야드루프Ⅱ": "assets/options/homeyard-roof.jpg",
  "에버아트 우드 / EVERART WOOD": "assets/products/image38.png",
  "센시아 휀스 / 세로 가는 격자": "assets/products/sensia-fence-vertical.png",
  "센시아 휀스 / 가로 격자": "assets/products/sensia-fence-horizontal.png",
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

const proposalCaseImages = {
  "엘리지안 EY 07 / (트래버틴)": ["assets/cases/case-04-1.png", "assets/cases/case-04-2.png"],
  "노르 RR 09 / (자연석)": ["assets/cases/case-05-1.png", "assets/cases/case-05-2.png"],
  "콰지티 QR 02 / (샌드스톤)": ["assets/cases/case-06-1.png", "assets/cases/case-06-2.png"],
  "글로컬 GC 02 / (콘크리트)": ["assets/cases/case-07-2.png"],
  "글로컬 GC 03 / (콘크리트)": ["assets/cases/case-08-1.png", "assets/cases/case-08-2.png"],
  "오드 OU 02 / (우드)": ["assets/cases/case-09-1.png", "assets/cases/case-09-2.png"],
  "오드 OU 05 / (우드)": ["assets/cases/case-10-1.png", "assets/cases/case-10-2.png"],
  "길리안 GY 04 / (우드)": ["assets/cases/case-11-1.png", "assets/cases/case-11-2.png"],
  "엘리멘테 LABI": ["assets/cases/case-12-1.png", "assets/cases/case-12-2.png"],
  "엘리멘테 SABULA": ["assets/cases/case-13-1.png", "assets/cases/case-13-2.png"],
  "아스트라 FOG": ["assets/cases/case-14-1.png", "assets/cases/case-14-2.png"],
  "콰지티에 CENERE": ["assets/cases/case-15-1.png", "assets/cases/case-15-2.png"],
  "트라메 ORIENTALE": ["assets/cases/case-16-2.png"],
  "트라메 CALEIDOSCOPIO": ["assets/cases/case-17-2.png"],
  "루체 GOLD": ["assets/cases/case-18-1.png", "assets/cases/case-18-2.png"],
  "루체 SILVER": ["assets/cases/case-19-1.png", "assets/cases/case-19-2.png"],
  "스프레 수전 / 오르타포트": ["assets/cases/case-20-2.png"],
  "라이언 수전 / 포트": ["assets/cases/case-21-1.png", "assets/cases/case-21-2.png"],
  "피노 수전 & 포트": ["assets/cases/case-22-1.png"],
  "바루 수전 & 데미 포트": ["assets/cases/case-23-1.png"],
  "크롬우체통 / 스탠드": ["assets/cases/case-24-1.png"],
  "셰이드네트 / 사각": ["assets/cases/case-25-1.png"],
  "셰이드네트 / 삼각": ["assets/cases/case-27-1.png"],
  "셰이드용 기둥 1개 SET": ["assets/cases/case-29-1.png"],
  "아트사인 4형": ["assets/cases/case-31-1.png"],
  "아트사인 6형": ["assets/cases/case-32-1.png"],
  "우드크리트": ["assets/cases/case-33-1.png", "assets/cases/case-33-2.png"],
  "IKS 테이블": ["assets/cases/case-35-1.png", "assets/cases/case-35-2.png"],
  "IKS 벤치": ["assets/cases/case-35-1.png", "assets/cases/case-35-2.png"],
  "IKS 테이블(1EA) & 벤치(2EA) SET": ["assets/cases/case-35-1.png", "assets/cases/case-35-2.png"],
  "연속형 벤치": ["assets/cases/case-37-2.png"],
  "홈야드루프 / 카야드 스타일": ["assets/cases/case-38-1.png", "assets/cases/case-38-2.png"],
  "홈야드루프 / 글라스포치": ["assets/cases/case-40-1.png", "assets/cases/case-40-2.png"],
  "올글라스포치Ⅱ 슬라이드 시스템": ["assets/cases/case-40-1.png", "assets/cases/case-40-2.png"],
  "홈야드루프Ⅱ": ["assets/cases/case-38-1.png", "assets/cases/case-38-2.png"],
  "에버아트 보드 / EVERART BOARD": ["assets/cases/case-42-1.png", "assets/cases/case-42-2.png"],
  "에버아트 우드 / EVERART WOOD": ["assets/cases/case-43-1.png", "assets/cases/case-43-2.png"],
  "센시아 휀스 / 세로 가는 격자": ["assets/cases/case-45-2.png"],
  "센시아 휀스 / 가로 격자": ["assets/cases/case-46-1.png", "assets/cases/case-46-2.png"],
  "노보월S": ["assets/cases/case-47-1.png", "assets/cases/case-47-2.png"],
  "월라이트": ["assets/cases/case-49-1.png"],
  "스프레드 라이트": ["assets/cases/case-50-1.png"],
  "익스프레스 미니 폴라이트": ["assets/cases/case-51-1.png"],
  "에버아트 폴라이트": ["assets/cases/case-52-1.png", "assets/cases/case-52-2.png"],
  "가든 업라이트 미오": ["assets/cases/case-53-1.png", "assets/cases/case-53-2.png"],
  "도트리스 LED바": ["assets/cases/case-54-1.png"],
  "12V 트랜스": ["assets/cases/case-55-1.png"],
  "호피석": ["assets/cases/case-56-1.png"],
  "해미석": ["assets/cases/case-57-1.png"],
  "개비온석": ["assets/cases/case-58-1.png"]
};

const tileInstallRates = {
  "600x600": { dryPedestal: 67000, floorFrame: 85000, wetMortar: 70000 },
  "1200x300": { dryPedestal: 85000, floorFrame: 85000, wetMortar: 70000 },
  "1200x600": { dryPedestal: 67000, floorFrame: 85000, wetMortar: 70000 },
  "1000x1000": { dryPedestal: 65000, floorFrame: 85000, wetMortar: 70000 },
  "1200x1200": { dryPedestal: 70000, floorFrame: 85000, wetMortar: 70000 }
};

const fencePanelLengthMeter = 2;

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
  },
  "센시아 휀스 / 세로 가는 격자": {
    kind: "length",
    methods: [{ id: "sensia_fence_install", label: "휀스 시공", rate: 100000, unitLabel: "m당 시공비" }],
    note: "센시아 휀스는 입력 길이를 기준으로 자재 수량과 m당 시공비를 계산합니다."
  },
  "센시아 휀스 / 가로 격자": {
    kind: "length",
    methods: [{ id: "sensia_fence_install", label: "휀스 시공", rate: 100000, unitLabel: "m당 시공비" }],
    note: "센시아 휀스는 입력 길이를 기준으로 자재 수량과 m당 시공비를 계산합니다."
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
const proposalPrintButton = document.querySelector("#proposalPrintButton");
const resetButton = document.querySelector("#resetButton");
const goBuilderButton = document.querySelector("#goBuilderButton");
const goCartButton = document.querySelector("#goCartButton");
const goProposalButton = document.querySelector("#goProposalButton");
const builderToCartButton = document.querySelector("#builderToCartButton");
const backToBuilderButton = document.querySelector("#backToBuilderButton");
const cartToProposalButton = document.querySelector("#cartToProposalButton");
const proposalToBuilderButton = document.querySelector("#proposalToBuilderButton");
const proposalToCartButton = document.querySelector("#proposalToCartButton");
const builderView = document.querySelector("#builderView");
const cartView = document.querySelector("#cartView");
const proposalView = document.querySelector("#proposalView");
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
const proposalBody = document.querySelector("#proposalBody");
const proposalDate = document.querySelector("#proposalDate");
const proposalItemCount = document.querySelector("#proposalItemCount");
const proposalGrandTotal = document.querySelector("#proposalGrandTotal");

const CART_STORAGE_KEY = "inoex-quote-items-v1";
const quoteItems = [];
let proposalCaseIndex = 0;

function saveQuoteItems() {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(quoteItems));
  } catch (error) {
    // 저장 공간이 없거나 시크릿 모드인 경우는 조용히 무시합니다.
  }
}

function loadQuoteItems() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    parsed.forEach((item) => {
      if (
        item
        && typeof item.name === "string"
        && Number.isFinite(item.quantity)
        && Number.isFinite(item.materialAmount)
        && Number.isFinite(item.installAmount)
      ) {
        quoteItems.push({ ...item, totalAmount: item.materialAmount + item.installAmount });
      }
    });
  } catch (error) {
    // 손상된 저장값은 무시하고 빈 장바구니로 시작합니다.
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("ko-KR").format(Math.round(value)) + "원";
}

function formatNumber(value) {
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(2));
  return new Intl.NumberFormat("ko-KR").format(rounded);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function isSensiaFence(product) {
  return product.name.startsWith("센시아 휀스");
}

function getSensiaFencePanelCount(lengthMeter) {
  return Math.max(1, Math.ceil(lengthMeter / fencePanelLengthMeter));
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
        { id: "dry_pedestal", label: "바닥 건식(페데스탈)", rate: rates.dryPedestal, unitLabel: "m2당 시공비" },
        { id: "floor_frame", label: "바닥 각관 공사", rate: rates.floorFrame, unitLabel: "m2당 시공비" },
        { id: "wet_mortar", label: "바닥 습식(몰탈 압착)", rate: rates.wetMortar, unitLabel: "m2당 시공비" },
        { id: "wall_dry", label: "담장 건식(각관+연결철물)", rate: 290000, unitLabel: "m2당 시공비" },
        { id: "wall_wet", label: "담장 습식(각관+습식부착)", rate: 240000, unitLabel: "m2당 시공비" },
        { id: "facade_dry", label: "벽체 건식(연결철물)", rate: 150000, unitLabel: "m2당 시공비" },
        { id: "facade_wet", label: "벽체 습식(습식부착)", rate: 100000, unitLabel: "m2당 시공비" }
      ],
      note: "타일은 바닥, 담장, 벽체 공사 방식에 맞춰 시공비를 선택할 수 있습니다."
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

  if (isSensiaFence(product)) {
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

  if (isSensiaFence(product)) {
    return getSensiaFencePanelCount(quantity) * option.price;
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

  if (isSensiaFence(product)) {
    return `${option.label} · ${formatCurrency(option.price)} / 1EA(길이 ${fencePanelLengthMeter}m)`;
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

function renderBreakdownList(item, className) {
  if (!Array.isArray(item.breakdown) || !item.breakdown.length) {
    return "";
  }
  return `
    <ul class="${className}">
      ${item.breakdown.map((line) => `
        <li class="${line.image ? "has-image" : ""}">
          ${line.image ? `<img src="${line.image}" alt="">` : ""}
          <span>${escapeHtml(line.label)}</span>
          <strong>${line.separate ? "별도 필요" : line.included ? "포함" : formatCurrency(line.krw)}</strong>
        </li>
      `).join("")}
    </ul>
  `;
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
        ${renderBreakdownList(item, "cart-item__breakdown")}
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
    ${Array.isArray(item.breakdown) && item.breakdown.length ? `
    <tr class="print-breakdown-row">
      <td></td>
      <td colspan="9">${renderBreakdownList(item, "print-breakdown")}</td>
    </tr>` : ""}
  `).join("");
}

function getQuoteTotals() {
  const material = quoteItems.reduce((sum, item) => sum + item.materialAmount, 0);
  const install = quoteItems.reduce((sum, item) => sum + item.installAmount, 0);
  return {
    material,
    install,
    total: material + install
  };
}

function getProposalInsights() {
  const hasTile = quoteItems.some((item) => item.category.includes("포세린 타일"));
  const hasWater = quoteItems.some((item) => item.category.includes("수전"));
  const hasShade = quoteItems.some((item) => item.name.includes("셰이드") || item.name.includes("파고라") || item.name.includes("글라스포치") || item.name.includes("카야드") || item.name.includes("홈야드루프"));
  const hasSeating = quoteItems.some((item) => item.name.includes("IKS") || item.name.includes("벤치"));
  const hasWoodcrete = quoteItems.some((item) => item.name.includes("우드크리트"));
  const hasLighting = quoteItems.some((item) => item.category.includes("LED조명"));
  const hasFence = quoteItems.some((item) => item.name.includes("센시아 휀스"));
  const hasWallMaterial = quoteItems.some((item) => item.name.includes("에버아트") || item.name.includes("노보월") || item.name.includes("스테가월"));
  const hasStone = quoteItems.some((item) => item.category.includes("조경석"));
  const hasMailOrSign = quoteItems.some((item) => item.category.includes("우체통") || item.category.includes("명패"));
  const hasWoodTone = quoteItems.some((item) => item.name.includes("우드") || item.name.includes("우드크리트") || item.name.includes("EVERART WOOD"));
  const hasTravertineTone = quoteItems.some((item) => item.name.includes("트래버틴") || item.name.includes("엘리멘테") || item.name.includes("SABULA") || item.name.includes("LABI"));
  const hasConcreteTone = quoteItems.some((item) => item.name.includes("글로컬") || item.name.includes("콘크리트") || item.name.includes("CENERE") || item.name.includes("FOG"));

  const insights = [];

  if (hasTile && hasShade && (hasSeating || hasWater)) {
    insights.push({
      kicker: "Courtyard Composition",
      title: "바닥, 그늘, 사물이 만드는 작은 중정",
      copy: "대형 포세린 타일을 조용한 바탕으로 깔고, 그늘 구조물과 수전·벤치를 하나의 생활 장면으로 묶는 구성입니다. 재료는 절제하되 체류 기능을 분명히 두어, 주택 정원이나 커뮤니티 공간이 단순한 외부 마감이 아니라 머무는 마당처럼 읽히게 합니다."
    });
  }

  if (hasTile && hasShade) {
    insights.push({
      kicker: "Shade & Ground",
      title: "그늘 아래에서 완성되는 포장면의 깊이",
      copy: "포세린 타일의 수평면 위에 파고라나 셰이드를 더하면 빛과 그림자가 공간의 표정을 만듭니다. 낮에는 부드러운 음영이 질감을 살리고, 계절에 따라 야외 테이블·휴식·정원 관리가 가능한 반외부 공간으로 확장됩니다."
    });
  }

  if (hasTile && hasWater) {
    insights.push({
      kicker: "Water Point",
      title: "정원 관리 동선을 드러내지 않는 수전 포인트",
      copy: "수전은 기능 설비이지만, 바닥 재료와 함께 계획하면 공간의 작은 오브제가 됩니다. 포세린 타일의 단단한 질감 위에 수전과 포트를 정리하면 세척·관수 동선이 자연스럽게 숨고, 물을 쓰는 영역도 깔끔한 장면으로 남습니다."
    });
  }

  if (hasTile && hasSeating) {
    insights.push({
      kicker: "Social Edge",
      title: "포장 끝에 놓이는 머무름의 가구",
      copy: "IKS 테이블과 벤치는 포장면의 가장자리나 식재가 열리는 지점에 놓였을 때 가장 자연스럽습니다. 단단한 바닥, 낮은 식재, 시선이 머무는 가구가 함께 구성되면 공동주택 라운지나 정원 테라스에 차분한 체류감이 생깁니다."
    });
  }

  if (hasWoodcrete) {
    insights.push({
      kicker: "Garden Walk",
      title: "정원 안쪽으로 천천히 유도하는 보행 리듬",
      copy: "우드크리트는 직선 포장보다 느슨한 보행감을 만들기 좋습니다. 자갈·잔디·초화 사이에 불규칙한 간격으로 배치하면 사용자의 속도가 자연스럽게 낮아지고, 정원은 통과하는 곳이 아니라 산책하며 감상하는 공간으로 바뀝니다."
    });
  }

  if (hasLighting) {
    insights.push({
      kicker: "Night Layer",
      title: "밤의 윤곽을 만드는 낮은 조도 계획",
      copy: "조명은 밝히기보다 윤곽을 남기는 방식이 좋습니다. 벽면, 식재 하부, 계단, 벤치 주변에 낮은 조도의 빛을 분산하면 안전성은 확보하면서도 호텔 라운지처럼 조용하고 깊이 있는 야간 경관을 만들 수 있습니다."
    });
  }

  if (hasFence) {
    insights.push({
      kicker: "Soft Boundary",
      title: "막지 않고 정리하는 얇은 경계",
      copy: "센시아 휀스는 공간을 강하게 차단하기보다 선을 정돈하는 요소로 쓰기 좋습니다. 낮은 식재와 함께 배치하면 시야는 열어두면서도 사적 영역과 공용 영역이 섬세하게 구분되고, 정원의 배경이 한층 정돈됩니다."
    });
  }

  if (hasWallMaterial && hasTile) {
    insights.push({
      kicker: "Monolithic Surface",
      title: "바닥과 벽을 하나의 덩어리처럼 연결",
      copy: "포세린 타일과 에버아트·월 자재를 함께 쓰면 바닥과 입면이 분리되지 않고 하나의 매스로 읽힙니다. 과한 장식보다 면의 비례와 줄눈 정렬을 강조하면 고급 주거의 차분한 기념비성이 살아납니다."
    });
  }

  if (hasStone && (hasTile || hasWoodcrete)) {
    insights.push({
      kicker: "Textural Contrast",
      title: "정제된 포장과 거친 자연 질감의 대비",
      copy: "포세린 타일이나 우드크리트처럼 정돈된 재료 옆에 조경석을 두면 공간이 지나치게 평면적으로 보이지 않습니다. 매끈한 면과 거친 입자의 대비가 식재의 자연성을 끌어올리고, 작은 정원도 깊이감 있게 보입니다."
    });
  }

  if (hasMailOrSign) {
    insights.push({
      kicker: "First Impression",
      title: "입구에서 시작되는 브랜드의 첫 장면",
      copy: "우체통과 명패는 작은 요소지만 공간의 첫 인상을 결정합니다. 벽체, 포장, 식재의 색을 절제하고 포인트 사인을 정확한 높이에 배치하면 외부 공간 전체가 더 정돈되고 의도적인 인상을 줍니다."
    });
  }

  if (hasWoodTone && hasConcreteTone) {
    insights.push({
      kicker: "Warm Minimal",
      title: "콘크리트의 절제감 위에 더하는 목질감",
      copy: "콘크리트 톤 타일이나 회색 계열 자재는 공간을 정돈하지만 차갑게 느껴질 수 있습니다. 우드 계열 제품을 동선이나 포인트 구조로 더하면 미니멀한 바탕 위에 따뜻한 촉감이 생겨 균형 잡힌 외부 공간이 됩니다."
    });
  }

  if (hasTravertineTone) {
    insights.push({
      kicker: "Quiet Luxury",
      title: "밝은 석재 톤으로 만드는 부드러운 고급감",
      copy: "트래버틴·샌드 계열의 밝은 포세린은 빛을 부드럽게 받아 작은 외부 공간도 넓고 온화하게 보이게 합니다. 식재의 녹색, 흰색 구조물, 수전 금속 질감과 함께 쓰면 리조트처럼 차분한 분위기를 만들 수 있습니다."
    });
  }

  if (!insights.length && quoteItems.length) {
    insights.push({
      kicker: "INO-EX Curation",
      title: "선택 제품의 질감과 기능을 중심으로 한 외부공간 제안",
      copy: "선택한 제품의 소재감, 색상, 사용 목적을 기준으로 공간의 첫 인상과 체류 장면을 함께 정리한 제안입니다. 현장 조건에 따라 배수, 고정 방식, 조명, 유지관리 계획을 더하면 완성도 높은 외부공간으로 확장할 수 있습니다."
    });
  }

  return insights.slice(0, 4);
}

function getCaseExamplesForItem(item) {
  const images = proposalCaseImages[item.name] || [];
  return images.map((image, index) => ({
    title: `${item.name} 시공사례 ${index + 1}`,
    image,
    copy: "",
    productName: item.name,
    category: item.category
  }));
}

function getProposalCases() {
  const seen = new Set();
  return quoteItems
    .flatMap(getCaseExamplesForItem)
    .filter((example) => {
      const key = `${example.image}-${example.productName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function getProposalMaterialTags() {
  const tags = [];
  const addTag = (condition, label) => {
    if (condition && !tags.includes(label)) tags.push(label);
  };

  addTag(quoteItems.some((item) => item.category.includes("포세린 타일")), "Porcelain Surface");
  addTag(quoteItems.some((item) => item.category.includes("수전")), "Water Object");
  addTag(quoteItems.some((item) => item.name.includes("셰이드") || item.name.includes("파고라") || item.name.includes("글라스포치") || item.name.includes("홈야드루프")), "Shade Structure");
  addTag(quoteItems.some((item) => item.name.includes("IKS") || item.name.includes("벤치")), "Outdoor Living");
  addTag(quoteItems.some((item) => item.category.includes("LED조명")), "Low Light");
  addTag(quoteItems.some((item) => item.name.includes("우드") || item.name.includes("우드크리트")), "Warm Texture");
  addTag(quoteItems.some((item) => item.name.includes("센시아 휀스")), "Soft Boundary");
  addTag(quoteItems.some((item) => item.category.includes("조경석")), "Natural Aggregate");

  return tags.slice(0, 6);
}

function renderProposal() {
  const totals = getQuoteTotals();
  proposalDate.textContent = `작성일시: ${new Date().toLocaleString("ko-KR")}`;
  proposalItemCount.textContent = `${quoteItems.length}개`;
  proposalGrandTotal.textContent = formatCurrency(totals.total);

  if (!quoteItems.length) {
    proposalBody.innerHTML = `
      <div class="proposal-empty">
        장바구니에 담긴 제품이 없습니다. Step 1에서 제품을 추가하면 조합 제안서가 생성됩니다.
      </div>
    `;
    return;
  }

  const insights = getProposalInsights();
  const [featuredInsight, ...supportInsights] = insights;
  const materialTags = getProposalMaterialTags();
  const cases = getProposalCases();
  proposalCaseIndex = cases.length ? Math.min(proposalCaseIndex, cases.length - 1) : 0;
  const currentCase = cases[proposalCaseIndex];

  proposalBody.innerHTML = `
    <section class="proposal-section proposal-section--direction">
      <div class="proposal-section__title">
        <div>
          <span>Design Direction</span>
          <h4>조합 제안 방향</h4>
        </div>
      </div>

      <div class="proposal-direction">
        <article class="proposal-insight proposal-insight--featured">
          <div class="proposal-insight__index">01</div>
          <span>${escapeHtml(featuredInsight.kicker || "Design Note")}</span>
          <strong>${escapeHtml(featuredInsight.title)}</strong>
          <p>${escapeHtml(featuredInsight.copy)}</p>
          <div class="proposal-insight__tags">
            ${materialTags.map((tag) => `<em>${escapeHtml(tag)}</em>`).join("")}
          </div>
        </article>

        <aside class="proposal-direction__rail">
          <div class="proposal-direction__note">
            <span>Material Mood</span>
            <strong>차분한 바탕 위에 기능적 오브제를 배치하는 큐레이션</strong>
            <p>면은 넓게, 포인트는 작게. INO-EX 제품 조합이 과장되지 않으면서도 선명한 첫인상을 만들도록 정리했습니다.</p>
          </div>
          <div class="proposal-insight-list">
            ${supportInsights.map((insight, index) => `
              <article class="proposal-insight proposal-insight--compact">
                <div class="proposal-insight__index">${String(index + 2).padStart(2, "0")}</div>
                <span>${escapeHtml(insight.kicker || "Design Note")}</span>
                <strong>${escapeHtml(insight.title)}</strong>
                <p>${escapeHtml(insight.copy)}</p>
              </article>
            `).join("")}
          </div>
        </aside>
      </div>
    </section>

    <section class="proposal-section">
      <h4>선택 제품 구성</h4>
      <div class="proposal-product-grid">
        ${quoteItems.map((item) => `
          <article class="proposal-product">
            ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">` : ""}
            <div>
              <span>${escapeHtml(item.category)}</span>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.materialLabel)} / ${escapeHtml(item.installLabel)}</p>
              ${renderBreakdownList(item, "proposal-product__breakdown")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="proposal-section">
      <h4>매칭 시공사례</h4>
      ${cases.length ? `
        <article class="proposal-case-slider" aria-label="매칭 시공사례 슬라이더">
          <div class="proposal-case-slider__stage">
            <img src="${currentCase.image}" alt="${escapeHtml(currentCase.title)}">
            <button class="proposal-case-slider__button proposal-case-slider__button--prev" type="button" data-case-slide="prev" aria-label="이전 시공사례">‹</button>
            <button class="proposal-case-slider__button proposal-case-slider__button--next" type="button" data-case-slide="next" aria-label="다음 시공사례">›</button>
            <div class="proposal-case-slider__count">${proposalCaseIndex + 1} / ${cases.length}</div>
          </div>
          <div class="proposal-case-slider__caption">
            <span>${escapeHtml(currentCase.productName)}</span>
            <strong>${escapeHtml(currentCase.title)}</strong>
            ${currentCase.copy ? `<p>${escapeHtml(currentCase.copy)}</p>` : ""}
          </div>
          <div class="proposal-case-slider__dots">
            ${cases.map((_, index) => `
              <button class="${index === proposalCaseIndex ? "is-active" : ""}" type="button" data-case-index="${index}" aria-label="${index + 1}번 시공사례"></button>
            `).join("")}
          </div>
        </article>

        <div class="proposal-case-grid">
          ${cases.map((example) => `
            <article>
              <img src="${example.image}" alt="${escapeHtml(example.title)}">
              <div>
                <span>${escapeHtml(example.productName)}</span>
                <strong>${escapeHtml(example.title)}</strong>
              </div>
            </article>
          `).join("")}
        </div>
      ` : `<div class="proposal-empty proposal-empty--small"></div>`}
    </section>
  `;
}

function updateTotals() {
  const { material, install, total } = getQuoteTotals();

  materialTotal.textContent = formatCurrency(material);
  materialTotalHero.textContent = formatCurrency(total);
  installTotal.textContent = formatCurrency(install);
  grandTotal.textContent = formatCurrency(total);
  printMaterialTotal.textContent = formatCurrency(material);
  printInstallTotal.textContent = formatCurrency(install);
  printGrandTotal.textContent = formatCurrency(total);
  printDate.textContent = `출력일시: ${new Date().toLocaleString("ko-KR")}`;
  renderCartBadge();
  renderProposal();
}

function switchView(view) {
  const showBuilder = view === "builder";
  const showCart = view === "cart";
  const showProposal = view === "proposal";

  builderView.classList.toggle("view--active", showBuilder);
  cartView.classList.toggle("view--active", showCart);
  proposalView.classList.toggle("view--active", showProposal);
  goBuilderButton.classList.toggle("is-active", showBuilder);
  goProposalButton.classList.toggle("is-active", showProposal);

  if (showProposal) {
    renderProposal();
  }
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

  quantityInput.value = "1";
  saveQuoteItems();
  renderCartList();
  renderPrintQuote();
  updateTotals();
  updatePreview();
});

resetButton.addEventListener("click", () => {
  quoteItems.length = 0;
  saveQuoteItems();
  renderCartList();
  renderPrintQuote();
  updateTotals();
  updatePreview();
});

function waitForImages(documentElement) {
  const images = Array.from(documentElement.images || documentElement.querySelectorAll("img"));
  if (!images.length) {
    return Promise.resolve();
  }

  return Promise.all(images.map((image) => {
    if (image.complete) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }));
}

function isMobilePdfDownload() {
  return window.matchMedia("(max-width: 820px)").matches
    || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function downloadPdfElement(element, mode) {
  if (typeof window.html2pdf !== "function") {
    return false;
  }

  const stage = document.createElement("div");
  let clone;
  const actionButton = mode === "proposal" ? proposalPrintButton : printButton;
  const originalButtonText = actionButton.textContent;
  const filename = mode === "proposal"
    ? "INO-EX_공간_조합_제안서.pdf"
    : "INO-EX_상세_견적서.pdf";
  const cleanup = () => {
    stage.remove();
    actionButton.disabled = false;
    actionButton.textContent = originalButtonText;
  };

  stage.className = "pdf-download-stage";
  actionButton.disabled = true;
  actionButton.textContent = "PDF 생성 중...";

  Promise.all([
    waitForImages(element),
    document.fonts?.ready || Promise.resolve()
  ])
    .then(() => {
      clone = element.cloneNode(true);
      clone.classList.add("pdf-download-sheet");
      stage.append(clone);
      document.body.append(stage);
      return waitForImages(stage);
    })
    .then(() => window.html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 1.35,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: [".proposal-insight", ".proposal-product", ".proposal-case-grid article", ".cart-item"]
        }
      })
      .from(clone)
      .save())
    .then(cleanup)
    .catch((error) => {
      console.error("PDF generation failed:", error);
      cleanup();
      window.alert("PDF 파일 생성에 실패했습니다. 웹 배포 주소 또는 로컬 서버 주소에서 다시 시도해 주세요.");
    });

  return true;
}

function printWithMode(mode) {
  const targetElement = mode === "proposal"
    ? document.querySelector("#proposalSheet")
    : document.querySelector("#printSheet");

  if (
    targetElement
    && (mode === "proposal" || isMobilePdfDownload())
    && downloadPdfElement(targetElement, mode)
  ) {
    return;
  }

  document.body.classList.remove("is-printing-quote", "is-printing-proposal");
  document.body.classList.add(mode === "proposal" ? "is-printing-proposal" : "is-printing-quote");
  window.print();
}

printButton.addEventListener("click", () => {
  renderPrintQuote();
  updateTotals();
  printWithMode("quote");
});

proposalPrintButton.addEventListener("click", () => {
  renderProposal();
  printWithMode("proposal");
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("is-printing-quote", "is-printing-proposal");
});

cartList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.matches(".remove-button")) {
    return;
  }

  const index = Number(target.dataset.index);
  quoteItems.splice(index, 1);
  saveQuoteItems();
  renderCartList();
  renderPrintQuote();
  updateTotals();
});

proposalBody.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const cases = getProposalCases();
  if (!cases.length) {
    return;
  }

  const slideButton = target.closest("[data-case-slide]");
  if (slideButton instanceof HTMLElement) {
    const direction = slideButton.dataset.caseSlide;
    proposalCaseIndex = direction === "prev"
      ? (proposalCaseIndex - 1 + cases.length) % cases.length
      : (proposalCaseIndex + 1) % cases.length;
    renderProposal();
    return;
  }

  const dotButton = target.closest("[data-case-index]");
  if (dotButton instanceof HTMLElement) {
    proposalCaseIndex = Number(dotButton.dataset.caseIndex) || 0;
    renderProposal();
  }
});

goBuilderButton.addEventListener("click", () => switchView("builder"));
goCartButton.addEventListener("click", () => switchView("cart"));
goProposalButton.addEventListener("click", () => switchView("proposal"));
builderToCartButton.addEventListener("click", () => switchView("cart"));
backToBuilderButton.addEventListener("click", () => switchView("builder"));
cartToProposalButton.addEventListener("click", () => switchView("proposal"));
proposalToBuilderButton.addEventListener("click", () => switchView("builder"));
proposalToCartButton.addEventListener("click", () => switchView("cart"));

previewImage.addEventListener("error", () => {
  previewImage.hidden = true;
  previewImagePlaceholder.hidden = false;
});

loadQuoteItems();
buildCategories();
renderProductOptions();
renderPriceOptions();
syncAll();
switchView("builder");
