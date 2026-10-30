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
  if (attached === "front") return { W: model.widthMm, D: model.depthMm, faces: { front: f.back, back: f.front, left: f.right, right: f.left } };
  if (attached === "left") return { W: model.depthMm, D: model.widthMm, faces: { front: f.right, back: f.left, left: f.front, right: f.back } };
  if (attached === "right") return { W: model.depthMm, D: model.widthMm, faces: { front: f.left, back: f.right, left: f.back, right: f.front } };
  return { W: model.widthMm, D: model.depthMm, faces: { front: f.front, back: f.back, left: f.left, right: f.right } };
}

function previewSvg(model) {
  const s = PREVIEW_SCALE;
  const o = orientPreview(model);
  const W = o.W;
  const D = o.D;
  const H = model.heightMm;
  const frameHex = PREVIEW_FRAME_HEX[model.frameColorId] || "#3a3a3a";
  const roof = model.roof || {};

  const project = (x, y, z) => [(x - y) * 0.866 * s, (x + y) * 0.5 * s - z * s];
  const corners = [[0, 0, 0], [W, 0, 0], [0, D, 0], [W, D, 0], [0, 0, H], [W, 0, H], [0, D, H], [W, D, H]].map((p) => project(...p));
  const minX = Math.min(...corners.map((p) => p[0]));
  const maxX = Math.max(...corners.map((p) => p[0]));
  const minY = Math.min(...corners.map((p) => p[1]));
  const maxY = Math.max(...corners.map((p) => p[1]));
  const viewH = Math.max(250, maxY - minY + 86);
  const ox = (PREVIEW_VIEW_W - (maxX - minX)) / 2 - minX;
  const oy = viewH - 44 - maxY;
  const pt = (x, y, z) => {
    const [px, py] = project(x, y, z);
    return [px + ox, py + oy];
  };
  const fmtPt = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const polygon = (points, attrs) => `<polygon points="${points.map(fmtPt).join(" ")}" ${attrs}/>`;
  const line = (a, b, attrs) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" ${attrs}/>`;

  const defs = [];
  const lateLabels = [];
  let patternCount = 0;
  const skewX = "matrix(0.866,0.5,0,1,0,0)";
  const skewY = "matrix(-0.866,0.5,0,1,0,0)";
  const skewTop = "matrix(0.866,0.5,-0.866,0.5,0,0)";
  const imagePattern = (url, transform, size = 34) => {
    const id = `pv-img-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="${size}" height="${size}" patternTransform="${transform}"><image href="${previewEscape(url)}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice"/></pattern>`);
    return `url(#${id})`;
  };
  const hatchPattern = (transform) => {
    const id = `pv-hatch-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="${transform}"><rect width="8" height="8" fill="#dcd7cd"/><path d="M0 8 L8 0" stroke="#b7b1a5" stroke-width="1"/></pattern>`);
    return `url(#${id})`;
  };
  const meshPattern = (transform, color) => {
    const id = `pv-mesh-${++patternCount}`;
    defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="${transform}"><path d="M0 0H4M0 0V4" stroke="${color}" stroke-width="0.6" opacity="0.7"/></pattern>`);
    return `url(#${id})`;
  };

  const glassFill = model.glassTint === "standard" ? "rgba(178,212,236,0.36)" : "rgba(126,138,150,0.42)";
  const glassStroke = model.glassTint === "frame" ? frameHex : "#8e9aa4";

  // 면 그리기. bl→br 방향이 면의 길이 방향, z 는 높이
  const drawFace = (face, bl, br, dir) => {
    if (!face) return "";
    const len = Math.hypot(br[0] - bl[0], br[1] - bl[1]);
    const at = (t, z) => pt(bl[0] + (br[0] - bl[0]) * t, bl[1] + (br[1] - bl[1]) * t, z);
    const quad = (t0, t1, z0, z1) => [at(t0, z0), at(t1, z0), at(t1, z1), at(t0, z1)];
    const transform = dir === "x" ? skewX : skewY;
    let out = "";
    if (face.finish === "building") {
      out += polygon(quad(-0.06, 1.06, 0, H + 1100), `fill="${hatchPattern(transform)}" stroke="#b3ada1" stroke-width="1"`);
      const c = at(0.96, H + 850);
      lateLabels.push(`<text x="${c[0].toFixed(1)}" y="${c[1].toFixed(1)}" text-anchor="start" font-size="10" font-weight="600" fill="#5f594f">건물 벽 · ${previewEscape(face.label)} 접속</text>`);
      return out;
    }
    if (face.finish === "glass") {
      out += polygon(quad(0, 1, 0, H), `fill="${glassFill}" stroke="${glassStroke}" stroke-width="1.4"`);
      const panels = Math.max(2, face.panels || Math.round(len / 700));
      for (let i = 1; i < panels; i += 1) out += line(at(i / panels, 0), at(i / panels, H), `stroke="${glassStroke}" stroke-width="0.8" opacity="0.9"`);
      if (model.glassTint === "frame") {
        out += line(at(0, 950), at(1, 950), `stroke="${frameHex}" stroke-width="1"`);
        out += line(at(0, H - 280), at(1, H - 280), `stroke="${frameHex}" stroke-width="1"`);
      }
      // 유리 광택
      out += polygon(quad(0.08, 0.2, 200, H - 150), `fill="#ffffff" opacity="0.18"`);
    } else if (face.finish === "wall") {
      out += polygon(quad(0, 1, 0, H), `fill="${imagePattern(face.swatch || `assets/options/colors/frame-${model.frameColorId}.jpg`, transform)}" stroke="${frameHex}" stroke-width="1.2"`);
    } else if (face.finish === "slideTextile") {
      out += polygon(quad(0, 1, 0, H), `fill="#e6dcc8" stroke="${frameHex}" stroke-width="1.2"`);
      for (let z = 400; z < H; z += 400) out += line(at(0, z), at(1, z), `stroke="#000" stroke-width="0.6" opacity="0.08"`);
    } else if (face.finish === "slideBoard") {
      out += polygon(quad(0, 1, 0, H), `fill="${imagePattern("assets/options/slide-screen-board.jpg", transform, 40)}" stroke="${frameHex}" stroke-width="1.2"`);
    }
    if (face.flap && face.flap !== "none") {
      const z0 = H - 620;
      if (face.flap === "grid") {
        out += polygon(quad(0, 1, z0, H), `fill="#ffffff" opacity="0.55" stroke="${frameHex}" stroke-width="1"`);
        for (let z = z0 + 80; z < H; z += 85) out += line(at(0, z), at(1, z), `stroke="${frameHex}" stroke-width="0.9"`);
      } else {
        out += polygon(quad(0, 1, z0, H), `fill="${imagePattern(`assets/options/colors/frame-${model.frameColorId}.jpg`, transform, 28)}" stroke="${frameHex}" stroke-width="1"`);
      }
    }
    if (face.curtain) {
      const hex = PREVIEW_CURTAIN_HEX[face.curtain] || "#e8e2d6";
      const folds = Math.max(6, Math.round(len / 9));
      for (let i = 0; i < folds; i += 1) {
        out += polygon(quad(i / folds, (i + 1) / folds, 180, H - 90), `fill="${hex}" opacity="${i % 2 ? 0.95 : 0.7}"`);
      }
    }
    if (face.screen) {
      out += polygon(quad(0, 1, 0, H), `fill="${meshPattern(transform, face.screen === "white" ? "#f4f4f4" : "#2b2b2b")}" opacity="0.5"`);
    }
    return out;
  };

  const postWidth = Math.max(3, 110 * s);
  const post = (x, y) => line(pt(x, y, 0), pt(x, y, H), `stroke="${frameHex}" stroke-width="${postWidth.toFixed(1)}"`);
  const faces = o.faces;
  const wallMount = faces.back && faces.back.finish === "building";
  let body = "";

  // 바닥 그림자
  body += polygon([pt(-120, -120, 0), pt(W + 120, -120, 0), pt(W + 120, D + 120, 0), pt(-120, D + 120, 0)], `fill="#16211d" opacity="0.06"`);
  // 뒷면·우측면 (뒤쪽부터)
  body += drawFace(faces.back, [W, D], [0, D], "x");
  body += drawFace(faces.right, [W, 0], [W, D], "y");
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
    [0.33, 0.67].forEach((t) => body += line(pt(W * t, 120, H), pt(W * t, D - 120, H), `stroke="#ffe39a" stroke-width="3" opacity="0.95"`));
  }
  if (model.downlights > 0) {
    const n = model.downlights;
    const cols = Math.max(1, Math.round(Math.sqrt(n * W / D)));
    const rows = Math.ceil(n / cols);
    let k = 0;
    for (let r = 0; r < rows && k < n; r += 1) {
      const inRow = Math.min(cols, n - k);
      for (let c = 0; c < inRow; c += 1, k += 1) {
        const p = pt(W * (c + 0.5) / inRow, D * (r + 0.5) / rows, H);
        body += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="#ffd66b" stroke="#c48f22" stroke-width="0.8"/>`;
      }
    }
  }
  // 도리 (지붕 테두리)
  const girder = Math.max(4, 160 * s);
  body += line(pt(0, D, H), pt(W, D, H), `stroke="${frameHex}" stroke-width="${(girder * 0.7).toFixed(1)}"`);
  body += line(pt(W, 0, H), pt(W, D, H), `stroke="${frameHex}" stroke-width="${(girder * 0.7).toFixed(1)}"`);
  if (roof.lightingFace) {
    body += polygon(roofPts, `fill="none" stroke="#ffd98a" stroke-width="${(girder * 1.4).toFixed(1)}" opacity="0.55"`);
  }
  body += line(pt(0, 0, H), pt(W, 0, H), `stroke="${frameHex}" stroke-width="${girder.toFixed(1)}"`);
  body += line(pt(0, 0, H), pt(0, D, H), `stroke="${frameHex}" stroke-width="${girder.toFixed(1)}"`);
  // 좌측면·정면 (앞쪽)
  body += drawFace(faces.left, [0, D], [0, 0], "y");
  body += drawFace(faces.front, [0, 0], [W, 0], "x");
  body += post(0, 0);
  body += post(W, 0);
  body += lateLabels.join("");
  if (roof.r) {
    const c = pt(W / 2, D / 2, H + 260);
    body += `<text x="${c[0].toFixed(1)}" y="${c[1].toFixed(1)}" text-anchor="middle" font-size="10" fill="#4b4f4c">지붕 R 사양</text>`;
  }

  // 치수 표기
  const label = (p, text, anchor, dx, dy) => `<text x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="#3f4542">${previewEscape(text)}</text>`;
  const dim = (a, b) => line(a, b, `stroke="#8a8f8c" stroke-width="0.8" stroke-dasharray="3 2"`);
  const fm = pt(W / 2, 0, 0);
  const lm = pt(0, D / 2, 0);
  body += dim(pt(0, 0, -160), pt(W, 0, -160)) + label([fm[0], fm[1] + 160 * s], `${faces.front.label} ${previewNumber(W)}`, "middle", 10, 14);
  body += dim(pt(0, 0, -160), pt(0, D, -160)) + label([lm[0], lm[1] + 160 * s], `${faces.left.label} ${previewNumber(D)}`, "end", -12, 14);
  body += label(pt(W, 0, H / 2), `높이 ${previewNumber(H)}`, "start", 12, 4);

  return `<svg viewBox="0 0 ${PREVIEW_VIEW_W} ${viewH.toFixed(0)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="구성 미리보기 도면"><defs>${defs.join("")}</defs>${body}</svg>`;
}

function renderStructurePreview(container, model) {
  if (!container) return;
  if (!model) {
    container.innerHTML = "";
    container.hidden = true;
    return;
  }
  container.hidden = false;
  const legend = (model.legend || []).filter(Boolean);
  container.innerHTML = `
    <div class="porch-preview__drawing">${previewSvg(model)}</div>
    ${model.photo ? `
      <figure class="porch-preview__photo">
        <img src="${previewEscape(model.photo)}" alt="">
        <figcaption>${previewEscape(model.photoCaption || "참고 사진")}</figcaption>
      </figure>` : ""}
    ${legend.length ? `<div class="porch-preview__legend">${legend.map((text) => `<span>${previewEscape(text)}</span>`).join("")}</div>` : ""}
  `;
}
