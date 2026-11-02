/*
  특별제작품 구성 미리보기
  ------------------------------------------------
  치수에 비례해 커지는 입체(등각) 도면과, 구성에 가장 가까운 카탈로그 참고 사진을 결과 패널 상단에 그린다.
  - 도면: 유리문(패널 분할·그레이·프레임타입), 벽면세트, 슬라이드스크린, 플랩스크린, 커튼, 방충망, 건물 접속면,
          내천정(보드 색상), 다운라이트 수량, 라인라이트, 라이팅 페이스, 로프 셰이드, 디자인 패널, 더블 지붕 중앙 도리
  - 사진: assets/preview/*.jpg (타카쇼 PROEX2026 P.1126~1129, P.1161~1162 시공 사진)
  glassporch.js / homeyardroof.js 보다 먼저 로드되며, 각 제품이 model 객체를 만들어 renderStructurePreview()를 호출한다.

  model = {
    widthMm, depthMm, heightMm,            // 실제 구조물 치수 (mm)
    frameColorId,                          // PREVIEW_FRAME_HEX 키
    glassTint: "standard" | "grey" | "frame",
    roof: { tint: "clear_matte" | "brown_smoke", ceilingSwatch, lineLight, double, r, shade, panels, lightingFace },
    faces: { front, back, left, right: { label, finish, panels, flap, curtain, screen } },
      finish: "open" | "glass" | "wall" | "slideTextile" | "slideBoard" | "building"
    downlights, photo, photoCaption, legend: []
  }
*/

const PREVIEW_IMG = "assets/preview/";
const PREVIEW_SCALE = 0.045; // px / mm
const PREVIEW_VIEW_W = 600;
const PREVIEW_FRAME_HEX = {
  brown_ebony: "#4a3628", dark_pine: "#5b4636", natural_pine: "#b48a5a", white_pine: "#e9e3d7", matte_black: "#2a2a2a",
  black_ebony: "#1d1a18", kyomachiya_grey: "#6a5d50", matte_dark_grey: "#4e5256", matte_light_grey: "#a4a8ab",
  matte_beige: "#cdb89b", matte_white: "#f2f0eb", rusty_copper: "#8b5a3b"
};
const PREVIEW_CURTAIN_HEX = { white: "#f3efe6", sand: "#d6c4a2", grey: "#8d9195" };

function previewEscape(text) {
  return String(text == null ? "" : text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

function previewNumber(value) {
  return Math.round(value).toLocaleString("ko-KR");
}

// 건물 접속면이 항상 도면의 뒤쪽(y = D)에 오도록 면 배치를 회전한다.
function orientPreview(model) {
  const f = model.faces;
  const attached = ["front", "back", "left", "right"].find((key) => f[key] && f[key].finish === "building") || null;
  const asWidth = { W: model.widthMm, D: model.depthMm, wIsWidth: true, wNote: model.widthNote || "", dNote: model.depthNote || "" };
  const asDepth = { W: model.depthMm, D: model.widthMm, wIsWidth: false, wNote: model.depthNote || "", dNote: model.widthNote || "" };
  if (attached === "front") return { ...asWidth, faces: { front: f.back, back: f.front, left: f.right, right: f.left } };
  if (attached === "left") return { ...asDepth, faces: { front: f.right, back: f.left, left: f.front, right: f.back } };
  if (attached === "right") return { ...asDepth, faces: { front: f.left, back: f.right, left: f.back, right: f.front } };
  return { ...asWidth, faces: { front: f.front, back: f.back, left: f.left, right: f.right } };
}

let previewSvgSeq = 0;
function previewSvg(model) {
  const s = PREVIEW_SCALE;
  const o = orientPreview(model);
  const W = o.W;
  const D = o.D;
  const H = model.heightMm;
  const frameHex = PREVIEW_FRAME_HEX[model.frameColorId] || "#3a3a3a";
  const roof = model.roof || {};

  // 등각 투영. x 는 오른쪽 위, y 는 왼쪽 위로 뻗어 (0,0) 모서리가 관찰자에게 가장 가깝다.
  const project = (x, y, z) => [(x - y) * 0.866 * s, -(x + y) * 0.5 * s - z * s];
  const corners = [[0, 0, 0], [W, 0, 0], [0, D, 0], [W, D, 0], [0, 0, H], [W, 0, H], [0, D, H], [W, D, H]].map((p) => project(...p));
  const minX = Math.min(...corners.map((p) => p[0]));
  const maxX = Math.max(...corners.map((p) => p[0]));
  const minY = Math.min(...corners.map((p) => p[1]));
  const maxY = Math.max(...corners.map((p) => p[1]));
  const viewH = Math.max(260, maxY - minY + 104);
  const ox = (PREVIEW_VIEW_W - (maxX - minX)) / 2 - minX;
  const oy = viewH - 62 - maxY;
  const pt = (x, y, z) => {
    const [px, py] = project(x, y, z);
    return [px + ox, py + oy];
  };
  const fmtPt = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const polygon = (points, attrs) => `<polygon points="${points.map(fmtPt).join(" ")}" ${attrs}/>`;
  const line = (a, b, attrs) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" ${attrs}/>`;

  const defs = [];
  const lateLabels = [];
  let body0 = "";
  // 같은 페이지에 도면이 여럿(모바일 독 + 결과 패널) 있어도 패턴·그라디언트 id 가 겹치지 않게 한다.
  const uid = `pv${++previewSvgSeq}`;
  let patternCount = 0;
  const skewX = "matrix(0.866,-0.5,0,1,0,0)";
  const skewY = "matrix(-0.866,-0.5,0,1,0,0)";
  const skewTop = "matrix(0.866,-0.5,-0.866,-0.5,0,0)";
  const imagePattern = (url, transform, size = 34) => {
    const id = `${uid}-img-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="${size}" height="${size}" patternTransform="${transform}"><image href="${previewEscape(url)}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice"/></pattern>`);
    return `url(#${id})`;
  };
  const hatchPattern = (transform) => {
    const id = `${uid}-hatch-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="${transform}"><rect width="8" height="8" fill="#dcd7cd"/><path d="M0 8 L8 0" stroke="#b7b1a5" stroke-width="1"/></pattern>`);
    return `url(#${id})`;
  };
  const meshPattern = (transform, color) => {
    const id = `${uid}-mesh-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="${transform}"><path d="M0 0H4M0 0V4" stroke="${color}" stroke-width="0.6" opacity="0.7"/></pattern>`);
    return `url(#${id})`;
  };

  // 조명(다운라이트·라인라이트·라이팅 페이스)이 하나라도 있으면 저녁 장면으로 그려 빛이 드러나게 한다.
  const night = (model.downlights || 0) > 0 || !!roof.lineLight || !!roof.lightingFace;
  const ink = night ? "#f3efe6" : "#3f4542";
  const inkSoft = night ? "#d8d2c6" : "#5f594f";
  const glassFill = night
    ? "rgba(255,214,150,0.22)"
    : model.glassTint === "standard" ? "rgba(178,212,236,0.36)" : "rgba(126,138,150,0.42)";
  const glassStroke = model.glassTint === "frame" ? frameHex : night ? "#c9c2b4" : "#8e9aa4";
  const lateLights = [];
  const tag = (p, text, accent) => {
    const rows = (Array.isArray(text) ? text : [text]).filter(Boolean);
    if (!rows.length) return;
    const w = Math.max(...rows.map((row) => String(row).length)) * 9.8 + 16;
    const h = rows.length * 13 + 7;
    const x = p[0] - w / 2;
    const y = p[1] - h / 2;
    const texts = rows.map((row, i) => `<text x="${p[0].toFixed(1)}" y="${(y + 13.5 + i * 13).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="#2f2a24">${previewEscape(row)}</text>`).join("");
    lateLabels.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="9" fill="rgba(255,255,255,0.94)" stroke="${accent}" stroke-width="1.2"/>${texts}`);
  };
  if (night) {
    const gid = `${uid}-dusk`;
    defs.push(`<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2a3a" stop-opacity="0.82"/><stop offset="1" stop-color="#3c3a3a" stop-opacity="0.72"/></linearGradient>`);
    defs.push(`<radialGradient id="${uid}-halo"><stop offset="0" stop-color="#fff3c4" stop-opacity="0.95"/><stop offset="0.35" stop-color="#ffd978" stop-opacity="0.55"/><stop offset="1" stop-color="#ffd978" stop-opacity="0"/></radialGradient>`);
    defs.push(`<radialGradient id="${uid}-pool"><stop offset="0" stop-color="#ffe6a6" stop-opacity="0.8"/><stop offset="1" stop-color="#ffe6a6" stop-opacity="0"/></radialGradient>`);
    body0 = `<rect x="0" y="0" width="${PREVIEW_VIEW_W}" height="${viewH.toFixed(0)}" rx="14" fill="url(#${gid})"/>`;
  }

  // 면 그리기. bl→br 방향이 면의 길이 방향, z 는 높이, off 는 면 바깥쪽(관찰자 쪽)으로의 거리(mm)
  const CURTAIN_LABEL = { white: "화이트", sand: "샌드", grey: "그레이" };
  const drawFace = (face, bl, br, dir, tagZ = 0.5) => {
    if (!face) return "";
    const labels = [];
    const dx = br[0] - bl[0];
    const dy = br[1] - bl[1];
    const len = Math.hypot(dx, dy);
    const nx = dy / len;
    const ny = -dx / len;
    const at = (t, z, off = 0) => pt(bl[0] + dx * t + nx * off, bl[1] + dy * t + ny * off, z);
    const quad = (t0, t1, z0, z1, off = 0) => [at(t0, z0, off), at(t1, z0, off), at(t1, z1, off), at(t0, z1, off)];
    // 비스듬한 판: (t0, off0) → (t1, off1) 사이, z0~z1
    const slab = (t0, off0, t1, off1, z0, z1) => [at(t0, z0, off0), at(t1, z0, off1), at(t1, z1, off1), at(t0, z1, off0)];
    const transform = dir === "x" ? skewX : skewY;
    const shade = dir === "y" ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.08)";
    let out = "";
    if (face.finish === "building") {
      out += polygon(quad(-0.06, 1.06, 0, H + 1100), `fill="${hatchPattern(transform)}" stroke="#b3ada1" stroke-width="1"`);
      tag(at(0.5, H + 880), `건물 벽 · ${face.label} 접속`, "#b3ada1");
      return out;
    }

    // ---- 기본 마감
    if (face.finish === "glass") {
      out += polygon(quad(0, 1, 0, H), `fill="${glassFill}" stroke="${glassStroke}" stroke-width="1.4"`);
      const panels = Math.max(2, face.panels || Math.round(len / 700));
      for (let i = 1; i < panels; i += 1) out += line(at(i / panels, 0), at(i / panels, H), `stroke="${glassStroke}" stroke-width="0.8" opacity="0.9"`);
      if (model.glassTint === "frame") {
        out += line(at(0, 950), at(1, 950), `stroke="${frameHex}" stroke-width="1"`);
        out += line(at(0, H - 280), at(1, H - 280), `stroke="${frameHex}" stroke-width="1"`);
      }
      out += polygon(quad(0.08, 0.2, 200, H - 150), `fill="#ffffff" opacity="0.18"`);
    } else if (face.finish === "wall") {
      const boardUrl = face.swatch || `assets/options/colors/frame-${model.frameColorId}.jpg`;
      out += polygon(quad(0, 1, 0, H), `fill="${imagePattern(boardUrl, transform, 64)}" stroke="${frameHex}" stroke-width="2"`);
      out += polygon(quad(0, 1, 0, H), `fill="${shade}"`);
      const boards = Math.max(2, Math.round(len / 910));
      for (let i = 1; i < boards; i += 1) out += line(at(i / boards, 60), at(i / boards, H - 60), `stroke="#000" stroke-width="1.1" opacity="0.38"`);
      for (let i = 0; i < boards; i += 1) {
        for (let g = 1; g <= 3; g += 1) {
          const t = (i + g / 4) / boards;
          out += line(at(t, 120), at(t, H - 120), `stroke="#000" stroke-width="0.5" opacity="0.09"`);
        }
      }
      out += polygon(quad(0, 1, H - 110, H), `fill="${frameHex}"`);
      out += polygon(quad(0, 1, 0, 110), `fill="${frameHex}"`);
      labels.push("벽면세트 · 에버아트보드");
    } else if (face.finish === "slideTextile" || face.finish === "slideBoard") {
      // 슬라이드스크린: 상부 레일에 매단 큰 미닫이 패널 3장. 패널마다 살짝 엇갈려(앞뒤) 겹쳐 보이게 그린다.
      const textile = face.finish === "slideTextile";
      const panelsN = 3;
      out += polygon(quad(0, 1, H - 120, H), `fill="${frameHex}"`);
      for (let i = 0; i < panelsN; i += 1) {
        const t0 = i / panelsN;
        const t1 = (i + 1) / panelsN;
        const off = i % 2 ? 0 : 70;
        const q = quad(t0 + 0.004, t1 - 0.004, 90, H - 130, off);
        if (textile) {
          out += polygon(q, `fill="#8e9094" stroke="${frameHex}" stroke-width="1.2"`);
          // 직물 결 (사선)
          for (let k = 1; k < 7; k += 1) {
            const tt = t0 + (t1 - t0) * k / 7;
            out += line(at(tt, 140, off), at(tt, H - 180, off), `stroke="#ffffff" stroke-width="0.6" opacity="0.14"`);
          }
          for (let z = 400; z < H - 200; z += 360) out += line(at(t0 + 0.01, z, off), at(t1 - 0.01, z, off), `stroke="#ffffff" stroke-width="0.6" opacity="0.1"`);
        } else {
          out += polygon(q, `fill="${imagePattern("assets/options/slide-screen-board.jpg", transform, 46)}" stroke="${frameHex}" stroke-width="1.2"`);
          for (let k = 1; k < 4; k += 1) {
            const tt = t0 + (t1 - t0) * k / 4;
            out += line(at(tt, 140, off), at(tt, H - 180, off), `stroke="#000" stroke-width="0.7" opacity="0.25"`);
          }
        }
        out += polygon(q, `fill="${shade}"`);
        // 행거(레일 고리)
        [0.25, 0.75].forEach((f) => {
          const h0 = at(t0 + (t1 - t0) * f, H - 130, off);
          const h1 = at(t0 + (t1 - t0) * f, H - 40, off);
          out += line(h0, h1, `stroke="${frameHex}" stroke-width="2"`);
        });
      }
      labels.push(`슬라이드스크린 · ${textile ? "텍스타일" : "아트보드"}`);
    }

    // ---- 비엔타 커튼: 유리 안쪽 레일에 매단 얇은 주름 커튼 (반투명)
    if (face.curtain) {
      const hex = PREVIEW_CURTAIN_HEX[face.curtain] || "#e8e2d6";
      const inner = -60;
      const folds = Math.max(8, Math.round(len / 160));
      for (let i = 0; i < folds; i += 1) {
        out += polygon(quad(i / folds, (i + 1) / folds, 140, H - 110, inner), `fill="${hex}" opacity="${i % 2 ? 0.62 : 0.4}"`);
      }
      for (let i = 1; i < folds; i += 1) out += line(at(i / folds, 140, inner), at(i / folds, H - 110, inner), `stroke="#000" stroke-width="0.4" opacity="0.1"`);
      // 레일 + 링
      out += line(at(0, H - 100, inner), at(1, H - 100, inner), `stroke="#9a9a96" stroke-width="1.6"`);
      const rings = Math.max(6, Math.round(len / 300));
      for (let i = 0; i <= rings; i += 1) {
        const r = at(i / rings, H - 100, inner);
        out += `<circle cx="${r[0].toFixed(1)}" cy="${r[1].toFixed(1)}" r="1.6" fill="#f5f5f2" stroke="#8f8f8a" stroke-width="0.6"/>`;
      }
      labels.push(`커튼 · ${CURTAIN_LABEL[face.curtain] || ""}`.trim());
    }

    // ---- 방충망: 유리문 면에만. 플리츠(세로 주름) 망이 한쪽 절반을 덮은 모습
    if (face.screen && face.finish === "glass") {
      const dark = face.screen !== "white";
      const frame = dark ? "#2b2b2b" : "#f1f1ee";
      const off = 40;
      const q = quad(0.5, 1, 40, H - 40, off);
      out += polygon(q, `fill="${dark ? "rgba(40,40,40,0.22)" : "rgba(255,255,255,0.35)"}" stroke="${frame}" stroke-width="2"`);
      const pleats = Math.max(10, Math.round(len / 2 / 60));
      for (let i = 1; i < pleats; i += 1) {
        const t = 0.5 + 0.5 * i / pleats;
        out += line(at(t, 60, off), at(t, H - 60, off), `stroke="${dark ? "#1e1e1e" : "#ffffff"}" stroke-width="0.6" opacity="${i % 2 ? 0.55 : 0.3}"`);
      }
      // 손잡이 세로틀
      out += polygon(quad(0.49, 0.515, 40, H - 40, off), `fill="${frame}"`);
      labels.push(`방충망 · ${dark ? "블랙" : "화이트"}`);
    }

    // ---- 플랩스크린: 면 앞 전용 기둥·도리에 선 전신 폴딩도어 (2장 1조). 양쪽에 접힌 모습으로 그린다.
    if (face.flap && face.flap !== "none") {
      const grid = face.flap === "grid";
      const depth = 620;
      const z0 = 60;
      const z1 = H - 60;
      const frontRail = quad(-0.01, 1.01, H - 110, H, depth);
      // 전용 기둥 2본
      [0, 1].forEach((t) => out += line(at(t, 0, depth), at(t, H, depth), `stroke="${frameHex}" stroke-width="${Math.max(3, 100 * s).toFixed(1)}"`));
      const panelFill = grid
        ? `fill="#ffffff" opacity="0.72"`
        : `fill="${imagePattern(`assets/options/colors/frame-${model.frameColorId}.jpg`, transform, 30)}"`;
      const drawPanel = (ta, oa, tb, ob) => {
        const poly = slab(ta, oa, tb, ob, z0, z1);
        out += polygon(poly, `${panelFill} stroke="${frameHex}" stroke-width="1.4" stroke-linejoin="round"`);
        if (grid) {
          for (let z = z0 + 120; z < z1; z += 110) out += line(at(ta, z, oa), at(tb, z, ob), `stroke="${frameHex}" stroke-width="1" opacity="0.9"`);
        } else {
          for (let k = 1; k < 3; k += 1) {
            const f = k / 3;
            out += line(at(ta + (tb - ta) * f, z0 + 40, oa + (ob - oa) * f), at(ta + (tb - ta) * f, z1 - 40, oa + (ob - oa) * f), `stroke="#000" stroke-width="0.6" opacity="0.25"`);
          }
        }
        out += polygon(poly, `fill="${shade}"`);
      };
      // 왼쪽: 기둥 쪽으로 접힌 2장 (지그재그, 면을 가리지 않음)
      drawPanel(0, depth, 0.05, depth - 430);
      drawPanel(0.05, depth - 430, 0.1, depth - 40);
      // 오른쪽: 닫힌 1장 + 접히는 중인 1장 → 질감과 개폐 방식이 함께 보인다
      drawPanel(1, depth, 0.74, depth);
      drawPanel(0.74, depth, 0.66, depth - 430);
      out += polygon(frontRail, `fill="${frameHex}"`);
      labels.push(`플랩스크린 · ${grid ? "알루미늄 격자" : "아트보드"}`);
    }
    if (labels.length) tag(at(0.5, H * tagZ), labels, frameHex);
    return out;
  };

  const postWidth = Math.max(3, 110 * s);
  const post = (x, y) => line(pt(x, y, 0), pt(x, y, H), `stroke="${frameHex}" stroke-width="${postWidth.toFixed(1)}"`);
  const faces = o.faces;
  const wallMount = faces.back && faces.back.finish === "building";
  let body = "";

  // 저녁 배경 (조명 있을 때)
  body += body0;
  // 바닥 그림자
  body += polygon([pt(-120, -120, 0), pt(W + 120, -120, 0), pt(W + 120, D + 120, 0), pt(-120, D + 120, 0)], `fill="#16211d" opacity="${night ? 0.35 : 0.06}"`);
  // 다운라이트 위치 (지붕 아래 균등 배치)
  const lightPts = [];
  if (model.downlights > 0) {
    const n = model.downlights;
    const cols = Math.max(1, Math.round(Math.sqrt(n * W / D)));
    const rows = Math.ceil(n / cols);
    let k = 0;
    for (let r = 0; r < rows && k < n; r += 1) {
      const inRow = Math.min(cols, n - k);
      for (let c = 0; c < inRow; c += 1, k += 1) lightPts.push([W * (c + 0.5) / inRow, D * (r + 0.5) / rows]);
    }
  }
  if (night) {
    // 실내 바닥 전체에 따뜻한 빛
    body += polygon([pt(0, 0, 0), pt(W, 0, 0), pt(W, D, 0), pt(0, D, 0)], `fill="#ffd98a" opacity="0.28"`);
    const poolR = Math.min(1400, Math.max(700, Math.sqrt(W * D / Math.max(1, lightPts.length)) * 0.6));
    lightPts.forEach(([x, y]) => {
      const c = pt(x, y, 0);
      body += `<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${(poolR * 1.22 * s).toFixed(1)}" ry="${(poolR * 0.71 * s).toFixed(1)}" fill="url(#${uid}-pool)"/>`;
    });
    if (roof.lineLight) {
      [0.33, 0.67].forEach((t) => body += line(pt(W * t, 120, 0), pt(W * t, D - 120, 0), `stroke="#ffe6a6" stroke-width="${(520 * s).toFixed(1)}" opacity="0.45" stroke-linecap="round"`));
    }
  }
  // 뒷면·우측면 (뒤쪽부터)
  body += drawFace(faces.back, [W, D], [0, D], "x", 0.8);
  body += drawFace(faces.right, [W, 0], [W, D], "y", 0.8);
  if (!wallMount) {
    body += post(0, D);
    body += post(W, D);
  } else {
    body += post(0, D);
    body += post(W, D);
  }
  // 지붕
  const roofPts = [pt(0, 0, H), pt(W, 0, H), pt(W, D, H), pt(0, D, H)];
  const roofFill = roof.ceilingSwatch
    ? imagePattern(roof.ceilingSwatch, skewTop, 30)
    : roof.tint === "brown_smoke" ? "rgba(104,76,58,0.62)" : "rgba(196,216,230,0.55)";
  body += polygon(roofPts, `fill="${roofFill}" stroke="${frameHex}" stroke-width="1"`);
  if (roof.ceilingSwatch) {
    // 에버아트보드 천정 줄눈 (폭 방향 보드)
    const rowsC = Math.max(2, Math.round(D / 455));
    for (let i = 1; i < rowsC; i += 1) body += line(pt(40, D * i / rowsC, H), pt(W - 40, D * i / rowsC, H), `stroke="#000" stroke-width="0.7" opacity="0.22"`);
    if (night) body += polygon(roofPts, `fill="#ffd98a" opacity="0.18"`);
  }
  if (!roof.ceilingSwatch) body += polygon([pt(W * 0.08, D * 0.1, H), pt(W * 0.35, D * 0.1, H), pt(W * 0.2, D * 0.9, H), pt(W * 0.0, D * 0.9, H)], `fill="#ffffff" opacity="0.25"`);
  if (roof.shade) {
    for (let y = 150; y < D; y += 320) body += line(pt(60, y, H), pt(W - 60, y, H), `stroke="${roof.shade === "canvas" ? "#d9c9ab" : "#e6dcc8"}" stroke-width="${(230 * s).toFixed(1)}" opacity="0.9"`);
  }
  if (roof.panels > 0) {
    const pw = 950;
    const pl = 1898;
    const cols = Math.max(1, Math.floor(W / pw));
    for (let i = 0; i < roof.panels; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x0 = 80 + col * pw;
      const y0 = 80 + row * pl;
      if (x0 + pw > W + 50 || y0 + pl > D + 50) break;
      body += polygon([pt(x0, y0, H), pt(x0 + pw - 60, y0, H), pt(x0 + pw - 60, y0 + pl - 60, H), pt(x0, y0 + pl - 60, H)], `fill="#3a3531" opacity="0.9" stroke="#111" stroke-width="0.6"`);
    }
  }
  if (roof.double) body += line(pt(W / 2, 0, H), pt(W / 2, D, H), `stroke="${frameHex}" stroke-width="${(150 * s).toFixed(1)}"`);
  if (roof.lineLight) {
    [0.33, 0.67].forEach((t) => {
      const a = pt(W * t, 120, H);
      const b = pt(W * t, D - 120, H);
      lateLights.push(line(a, b, `stroke="#ffd978" stroke-width="9" opacity="0.35" stroke-linecap="round"`));
      lateLights.push(line(a, b, `stroke="#fff3c4" stroke-width="2.6" opacity="1" stroke-linecap="round"`));
    });
    const c = pt(W * 0.33, 120, H);
    tag([c[0], c[1] + 20], "라인라이트", "#d9a63a");
  }
  lightPts.forEach(([x, y]) => {
    const c = pt(x, y, H);
    lateLights.push(`<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="13" fill="url(#${uid}-halo)"/>`);
    lateLights.push(`<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="4" fill="#fff6d2" stroke="#d9a63a" stroke-width="1"/>`);
    // 빛 기둥 (지붕 → 바닥)
    const f = pt(x, y, 0);
    lateLights.push(`<polygon points="${fmtPt([c[0] - 2, c[1]])} ${fmtPt([c[0] + 2, c[1]])} ${fmtPt([f[0] + 1000 * s, f[1]])} ${fmtPt([f[0] - 1000 * s, f[1]])}" fill="#ffe6a6" opacity="0.1"/>`);
  });
  if (lightPts.length) {
    const c = pt(lightPts[0][0], lightPts[0][1], H);
    tag([c[0] - 26, c[1] - 22], `다운라이트 ${model.downlights}개`, "#d9a63a");
  }
  // 도리 (지붕 테두리)
  const girder = Math.max(4, 160 * s);
  body += line(pt(0, D, H), pt(W, D, H), `stroke="${frameHex}" stroke-width="${(girder * 0.7).toFixed(1)}"`);
  body += line(pt(W, 0, H), pt(W, D, H), `stroke="${frameHex}" stroke-width="${(girder * 0.7).toFixed(1)}"`);
  if (roof.lightingFace) {
    lateLights.push(polygon(roofPts, `fill="none" stroke="#ffd978" stroke-width="${(girder * 3.2).toFixed(1)}" opacity="0.3" stroke-linejoin="round"`));
    lateLights.push(polygon(roofPts, `fill="none" stroke="#fff3c4" stroke-width="${(girder * 0.9).toFixed(1)}" opacity="0.95" stroke-linejoin="round"`));
    const c = pt(W, D / 2, H);
    tag([c[0] + 40, c[1] - 30], "라이팅 페이스", "#d9a63a");
  }
  body += line(pt(0, 0, H), pt(W, 0, H), `stroke="${frameHex}" stroke-width="${girder.toFixed(1)}"`);
  body += line(pt(0, 0, H), pt(0, D, H), `stroke="${frameHex}" stroke-width="${girder.toFixed(1)}"`);
  // 좌측면·정면 (앞쪽)
  body += drawFace(faces.left, [0, D], [0, 0], "y", 0.45);
  body += drawFace(faces.front, [0, 0], [W, 0], "x", 0.45);
  body += post(0, 0);
  body += post(W, 0);
  body += lateLights.join("");
  body += lateLabels.join("");
  if (roof.r) {
    const c = pt(W / 2, D / 2, H + 260);
    body += `<text x="${c[0].toFixed(1)}" y="${c[1].toFixed(1)}" text-anchor="middle" font-size="10" fill="${ink}">지붕 R 사양</text>`;
  }

  // 치수 표기
  const label = (p, text, anchor, dx, dy) => `<text x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="${ink}">${previewEscape(text)}</text>`;
  const dim = (a, b) => line(a, b, `stroke="${night ? "#b9b3a6" : "#8a8f8c"}" stroke-width="0.8" stroke-dasharray="3 2"`);
  const note = (p, text, anchor, dx, dy) => text
    ? `<text x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="${anchor}" font-size="9" fill="${inkSoft}">${previewEscape(text)}</text>`
    : "";
  const fm = pt(W / 2, 0, 0);
  const lm = pt(0, D / 2, 0);
  const wName = o.wIsWidth ? "정면 폭" : "깊이";
  const dName = o.wIsWidth ? "깊이" : "정면 폭";
  body += dim(pt(0, 0, -160), pt(W, 0, -160))
    + label([fm[0], fm[1] + 160 * s], `${wName} ${previewNumber(W)}`, "middle", 12, 14)
    + note([fm[0], fm[1] + 160 * s], o.wNote, "middle", 12, 26);
  body += dim(pt(0, 0, -160), pt(0, D, -160))
    + label([lm[0], lm[1] + 160 * s], `${dName} ${previewNumber(D)}`, "end", -12, 14)
    + note([lm[0], lm[1] + 160 * s], o.dNote, "end", -12, 26);
  const frontFlap = faces.front && faces.front.flap && faces.front.flap !== "none";
  body += label(pt(W, 0, H / 2), `높이 ${previewNumber(H)}`, "start", frontFlap ? 12 + 620 * 0.866 * s : 12, 4);

  return `<svg viewBox="0 0 ${PREVIEW_VIEW_W} ${viewH.toFixed(0)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="구성 미리보기 도면"><defs>${defs.join("")}</defs>${body}</svg>`;
}


/*
  휀스 입면 도면 (센시아 휀스 / 센시아 휀스R). model.kind === "fence"
  { seriesName, designLabel, pattern, panelHex, frameHex, panelSwatch, tiers:[mm…](아래→위), totalHeightMm,
    spans, lastW, cut, lengthMm, poles, pitch1000, postSize, corners, lowerCover, highStrength, summary, photo, photoCaption, legend }
*/
function fenceSvg(model) {
  const uid = `pf${++previewSvgSeq}`;
  const VW = PREVIEW_VIEW_W;
  const defs = [];
  const tiers = model.tiers.slice();
  const spans = Math.max(1, model.spans);
  const lastW = model.cut ? model.lastW : 2000;
  // 스팬이 많으면 앞 5칸 + 생략 표시 + 뒤 2칸만 그린다
  const MAX_DRAW = 7;
  const compact = spans > MAX_DRAW;
  const segments = []; // { w: mm, index, cut }
  if (compact) {
    for (let i = 0; i < 5; i += 1) segments.push({ w: 2000, index: i });
    segments.push({ gap: true, w: 700 });
    segments.push({ w: 2000, index: spans - 2 });
    segments.push({ w: lastW, index: spans - 1, cut: model.cut });
  } else {
    for (let i = 0; i < spans; i += 1) segments.push({ w: i === spans - 1 ? lastW : 2000, index: i, cut: i === spans - 1 && model.cut });
  }
  const drawnLen = segments.reduce((sum, seg) => sum + seg.w, 0);
  const Htot = model.totalHeightMm;
  const marginL = 76;
  const marginR = 96;
  const s = Math.min((VW - marginL - marginR) / drawnLen, 180 / Htot);
  const groundY = 46 + Htot * s + 6;
  const viewH = Math.max(230, groundY + 62);
  const x0 = marginL + ((VW - marginL - marginR) - drawnLen * s) / 2;
  const X = (mm) => x0 + mm * s;
  const Y = (mmAboveGround) => groundY - mmAboveGround * s;
  const rect = (x, y, w, h, attrs) => `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(0.4, w).toFixed(1)}" height="${Math.max(0.4, h).toFixed(1)}" ${attrs}/>`;
  const line = (x1, y1, x2, y2, attrs) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" ${attrs}/>`;
  const text = (x, y, str, attrs) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ${attrs}>${previewEscape(str)}</text>`;
  const lighten = (hex, amount) => {
    const n = parseInt(hex.slice(1), 16);
    const ch = (v) => Math.min(255, Math.round(v + (255 - v) * amount));
    return `#${[ch(n >> 16), ch((n >> 8) & 255), ch(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  };
  let panelFill = model.panelHex;
  if (model.panelSwatch) {
    defs.push(`<pattern id="${uid}-wood" patternUnits="userSpaceOnUse" width="40" height="40"><image href="${previewEscape(model.panelSwatch)}" width="40" height="40" preserveAspectRatio="xMidYMid slice"/></pattern>`);
    panelFill = `url(#${uid}-wood)`;
  }
  const slatShade = model.panelSwatch ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.22)";
  const bg = "#f4f1ea";
  let body = "";

  // 하늘/바닥
  body += rect(0, 0, VW, viewH, `fill="none"`);
  body += rect(0, groundY, VW, viewH - groundY, `fill="#e3ddd1"`);
  body += line(0, groundY, VW, groundY, `stroke="#9a948a" stroke-width="1"`);

  // 패널 1장 그리기 (x, w: px, bottomMm, hMm)
  const RAIL = 40;
  const drawPanel = (xPx, wPx, bottomMm, hMm, isCut) => {
    const top = Y(bottomMm + hMm);
    const hPx = hMm * s;
    let out = "";
    // 프레임(상하 가로대 + 세로틀)
    out += rect(xPx, top, wPx, hPx, `fill="${bg}" stroke="${model.frameHex}" stroke-width="1"`);
    const innerTop = top + RAIL * s;
    const innerH = (hMm - RAIL * 2) * s;
    const clipId = `${uid}-c${Math.round(xPx)}-${Math.round(top)}`;
    defs.push(`<clipPath id="${clipId}"><rect x="${xPx.toFixed(1)}" y="${innerTop.toFixed(1)}" width="${wPx.toFixed(1)}" height="${innerH.toFixed(1)}"/></clipPath>`);
    let pat = "";
    const p = model.pattern;
    if (p === "hpanel" || p === "louver" || p === "combi" || p === "hslim") {
      const pitch = p === "hslim" ? 32 : 100;
      for (let mm = 0; mm < hMm - RAIL * 2 + pitch; mm += pitch) {
        const yTop = innerTop + mm * s;
        if (p === "hpanel") {
          pat += rect(xPx, yTop, wPx, 85 * s, `fill="${panelFill}"`);
        } else if (p === "louver") {
          pat += rect(xPx, yTop, wPx, 100 * s, `fill="${panelFill}"`);
          pat += rect(xPx, yTop + 72 * s, wPx, 28 * s, `fill="${slatShade}"`);
        } else if (p === "combi") {
          pat += rect(xPx, yTop, wPx, 57.9 * s, `fill="${panelFill}"`);
          pat += rect(xPx, yTop + 68 * s, wPx, 21.7 * s, `fill="${panelFill}"`);
        } else {
          pat += rect(xPx, yTop, wPx, 21.7 * s, `fill="${panelFill}"`);
        }
      }
    } else {
      const pitch = p === "vslim" ? 29.9 : 60.6;
      const bar = p === "vslim" ? 10 : 15;
      for (let mm = 12; mm < wPx / s; mm += pitch) {
        pat += rect(xPx + mm * s, innerTop, bar * s, innerH, `fill="${panelFill}"`);
      }
    }
    out += `<g clip-path="url(#${clipId})">${pat}</g>`;
    // 상하 가로대
    out += rect(xPx, top, wPx, RAIL * s, `fill="${model.frameHex}"`);
    out += rect(xPx, top + hPx - RAIL * s, wPx, RAIL * s, `fill="${model.frameHex}"`);
    if (isCut) {
      out += line(xPx + wPx - 1, top - 4, xPx + wPx - 1, top + hPx + 4, `stroke="#b03a2c" stroke-width="1.4" stroke-dasharray="4 3"`);
    }
    return out;
  };

  // 기둥
  const postW = Math.max(3.5, model.postSize * s);
  const capH = Math.max(2, 20 * s);
  const drawPole = (xPx) => {
    let out = "";
    if (model.tiers.length > 1) {
      // 독립 기초
      out += rect(xPx - 14, groundY, 28, 14, `fill="#cfc8bb" stroke="#a9a296" stroke-width="0.8"`);
    }
    out += rect(xPx - postW / 2, Y(Htot) - capH, postW, Htot * s + capH, `fill="${model.frameHex}"`);
    out += rect(xPx - postW / 2 - 1, Y(Htot) - capH - 2, postW + 2, 3, `fill="${lighten(model.frameHex, 0.25)}"`);
    return out;
  };

  // 단 배치: 바닥에서 A=80mm 띄우고, 단 사이 12mm
  const A = tiers[0] === 540 && tiers.length === 1 ? 60 : 80;
  const tierBottoms = [];
  let cursor = A;
  tiers.forEach((h) => { tierBottoms.push(cursor); cursor += h + 12; });

  let cx = 0; // mm cursor
  let panels = "";
  let polesOut = "";
  let gapOut = "";
  polesOut += drawPole(X(0));
  segments.forEach((seg) => {
    if (seg.gap) {
      const gx = X(cx + seg.w / 2);
      gapOut += text(gx, Y(Htot / 2), "⋯", `text-anchor="middle" font-size="22" fill="#7a746a"`);
      gapOut += text(gx, Y(Htot / 2) + 16, `스팬 ${spans - 7}칸 생략`, `text-anchor="middle" font-size="9" fill="#7a746a"`);
      cx += seg.w;
      polesOut += drawPole(X(cx));
      return;
    }
    const xPx = X(cx) + postW / 2 + 1;
    const wPx = Math.max(2, seg.w * s - postW - 2);
    tiers.forEach((h, i) => { panels += drawPanel(xPx, wPx, tierBottoms[i], h, seg.cut); });
    if (model.lowerCover) panels += rect(X(cx) + postW / 2, Y(90), seg.w * s - postW, 90 * s, `fill="${lighten(model.frameHex, 0.15)}" stroke="${model.frameHex}" stroke-width="0.6"`);
    // 고강도 중간 기둥 (심간 1,000)
    if (model.pitch1000 && seg.w > 1000) polesOut += drawPole(X(cx + 1000));
    cx += seg.w;
    polesOut += drawPole(X(cx));
  });
  body += panels + polesOut + gapOut;

  // 치수: 총 길이
  const dimY = groundY + 30;
  body += line(X(0), dimY, X(drawnLen), dimY, `stroke="#8a8f8c" stroke-width="0.8" stroke-dasharray="3 2"`);
  body += line(X(0), dimY - 5, X(0), dimY + 5, `stroke="#8a8f8c" stroke-width="0.8"`);
  body += line(X(drawnLen), dimY - 5, X(drawnLen), dimY + 5, `stroke="#8a8f8c" stroke-width="0.8"`);
  body += text(X(drawnLen / 2), dimY + 14, `총 길이 ${previewNumber(model.lengthMm)}`, `text-anchor="middle" font-size="11" font-weight="600" fill="#3f4542"`);
  body += text(X(drawnLen / 2), dimY + 26, `2,000 스팬 × ${model.cut ? spans - 1 : spans}${model.cut ? ` + 절단 ${previewNumber(model.lastW)}` : ""} · 기둥 ${model.poles}본${model.pitch1000 ? " (심간 1,000)" : ""}`, `text-anchor="middle" font-size="9" fill="#5f594f"`);
  // 치수: 전고 + 단별 패널 높이
  const hx = X(drawnLen) + 22;
  body += line(hx, Y(Htot), hx, groundY, `stroke="#8a8f8c" stroke-width="0.8" stroke-dasharray="3 2"`);
  body += text(hx + 6, Y(Htot / 2) + 4, `전고 ${previewNumber(Htot)}`, `text-anchor="start" font-size="11" font-weight="600" fill="#3f4542"`);
  tiers.forEach((h, i) => {
    const yMid = Y(tierBottoms[i] + h / 2);
    body += text(X(0) - 10, yMid + 3, `${tiers.length > 1 ? `${i + 1}단 ` : "패널 "}${previewNumber(h)}`, `text-anchor="end" font-size="9.5" fill="#5f594f"`);
  });
  if (model.cut) {
    const cutSeg = segments[segments.length - 1];
    const cxEnd = drawnLen;
    body += text(X(cxEnd - cutSeg.w / 2), groundY - 5, `절단 ${previewNumber(model.lastW)}`, `text-anchor="middle" font-size="9" font-weight="700" fill="#b03a2c"`);
  }
  // 상단 태그
  const tag = (x, y, str, anchor = "middle") => {
    const w = str.length * 9.8 + 16;
    const tx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
    return `<rect x="${tx.toFixed(1)}" y="${(y - 10).toFixed(1)}" width="${w.toFixed(1)}" height="20" rx="9" fill="rgba(255,255,255,0.94)" stroke="${model.frameHex}" stroke-width="1.2"/>` + text(tx + w / 2, y + 4, str, `text-anchor="middle" font-size="10" font-weight="700" fill="#2f2a24"`);
  };
  body += tag(VW / 2, 18, `${model.seriesName} · ${model.designLabel}${model.tiers.length > 1 ? ` · ${model.tiers.length}단` : ""}`);
  const extras = [model.highStrength ? "고강도 42m/s" : "", model.corners ? `코너 ${model.corners}곳` : "", model.lowerCover ? "하부 커버" : ""].filter(Boolean);
  if (extras.length) body += tag(VW / 2, 40, extras.join(" · "));

  return `<svg viewBox="0 0 ${VW} ${viewH.toFixed(0)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="휀스 입면 미리보기"><defs>${defs.join("")}</defs>${body}</svg>`;
}

// 모델 종류에 따라 도면 생성기를 고른다 (포치·루프 등각 / 휀스 입면)
function previewSvgFor(model) {
  return model && model.kind === "fence" ? fenceSvg(model) : previewSvg(model);
}

/*
  모바일(한 열 레이아웃)에서는 결과 패널이 폼 아래로 내려가 도면이 안 보이므로,
  각 구성 패널 맨 위에 붙는 접이식 독(.porch-dock)에도 같은 도면을 그린다. 열림/닫힘은 기억한다.
*/
const PREVIEW_DOCK_KEY = "inoex-preview-dock-open-v1";

function previewDockOpen() {
  try {
    return window.localStorage.getItem(PREVIEW_DOCK_KEY) !== "0";
  } catch (error) {
    return true;
  }
}

function setPreviewDockOpen(dock, open) {
  dock.classList.toggle("is-open", open);
  const toggle = dock.querySelector(".porch-dock__toggle");
  if (toggle) toggle.setAttribute("aria-expanded", String(open));
  const body = dock.querySelector(".porch-dock__body");
  if (body) body.hidden = !open;
}

function bindPreviewDock(dock) {
  if (dock.dataset.bound) return;
  dock.dataset.bound = "1";
  setPreviewDockOpen(dock, previewDockOpen());
  const toggle = dock.querySelector(".porch-dock__toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = !dock.classList.contains("is-open");
    setPreviewDockOpen(dock, next);
    try {
      window.localStorage.setItem(PREVIEW_DOCK_KEY, next ? "1" : "0");
    } catch (error) {
      /* 저장 불가 환경은 무시 */
    }
  });
}

function renderPreviewDock(container, model, svg, legend) {
  const layout = container.closest(".porch-layout");
  const dock = layout ? layout.querySelector(".porch-dock") : null;
  if (!dock) return;
  if (!model) {
    dock.hidden = true;
    return;
  }
  bindPreviewDock(dock);
  dock.hidden = false;
  const summary = dock.querySelector(".porch-dock__summary");
  if (summary) {
    const optionCount = Math.max(0, legend.length - 1);
    summary.textContent = model.summary || `${previewNumber(model.widthMm)} × ${previewNumber(model.depthMm)} × 높이 ${previewNumber(model.heightMm)}mm${optionCount ? ` · 옵션 ${optionCount}` : ""}`;
  }
  const body = dock.querySelector(".porch-dock__body");
  if (body) {
    body.innerHTML = `
      <div class="porch-preview__drawing">${svg}</div>
      ${legend.length ? `<div class="porch-preview__legend">${legend.map((text) => `<span>${previewEscape(text)}</span>`).join("")}</div>` : ""}
    `;
  }
}

function renderStructurePreview(container, model) {
  if (!container) return;
  if (!model) {
    container.innerHTML = "";
    container.hidden = true;
    renderPreviewDock(container, null, "", []);
    return;
  }
  container.hidden = false;
  const legend = (model.legend || []).filter(Boolean);
  renderPreviewDock(container, model, previewSvgFor(model), legend);
  container.innerHTML = `
    <div class="porch-preview__drawing">${previewSvgFor(model)}</div>
    ${model.photo ? `
      <figure class="porch-preview__photo">
        <img src="${previewEscape(model.photo)}" alt="">
        <figcaption>${previewEscape(model.photoCaption || "참고 사진")}</figcaption>
      </figure>` : ""}
    ${legend.length ? `<div class="porch-preview__legend">${legend.map((text) => `<span>${previewEscape(text)}</span>`).join("")}</div>` : ""}
  `;
}
