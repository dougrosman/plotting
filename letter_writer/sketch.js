// Letter Writer: renders pasted text with single-stroke SVG fonts and exports a plotter-ready SVG.

const FONTS = {
  "Hershey Sans 1": "fonts/Hershey/HersheySans1.svg",
  "Hershey Sans Med": "fonts/Hershey/HersheySansMed.svg",
  "Hershey Serif Med": "fonts/Hershey/HersheySerifMed.svg",
  "Hershey Serif Bold": "fonts/Hershey/HersheySerifBold.svg",
  "Hershey Script 1": "fonts/Hershey/HersheyScript1.svg",
  "Hershey Script Med": "fonts/Hershey/HersheyScriptMed.svg",
  "Hershey Goth English": "fonts/Hershey/HersheyGothEnglish.svg",
  "Hershey Goth German": "fonts/Hershey/HersheyGothGerman.svg",
  "Hershey Goth Italian": "fonts/Hershey/HersheyGothItalian.svg",
  "Twin Sans": "fonts/Hershey/TwinSans.svg",
  "EMS Allure": "fonts/EMS/EMSAllure.svg",
  "EMS Bird": "fonts/EMS/EMSBird.svg",
  "EMS Bird Swash Caps": "fonts/EMS/EMSBirdSwashCaps.svg",
  "EMS Brush": "fonts/EMS/EMSBrush.svg",
  "EMS Capitol": "fonts/EMS/EMSCapitol.svg",
  "EMS Casual Hand": "fonts/EMS/EMSCasualHand.svg",
  "EMS Decorous Script": "fonts/EMS/EMSDecorousScript.svg",
  "EMS Delight": "fonts/EMS/EMSDelight.svg",
  "EMS Delight Swash Caps": "fonts/EMS/EMSDelightSwashCaps.svg",
  "EMS Elfin": "fonts/EMS/EMSElfin.svg",
  "EMS Felix": "fonts/EMS/EMSFelix.svg",
  "EMS Herculean": "fonts/EMS/EMSHerculean.svg",
  "EMS Invite": "fonts/EMS/EMSInvite.svg",
  "EMS League": "fonts/EMS/EMSLeague.svg",
  "EMS Little Princess": "fonts/EMS/EMSLittlePrincess.svg",
  "EMS Misty Night": "fonts/EMS/EMSMistyNight.svg",
  "EMS Neato": "fonts/EMS/EMSNeato.svg",
  "EMS Nixish": "fonts/EMS/EMSNixish.svg",
  "EMS Osmotron": "fonts/EMS/EMSOsmotron.svg",
  "EMS Pancakes": "fonts/EMS/EMSPancakes.svg",
  "EMS Pepita": "fonts/EMS/EMSPepita.svg",
  "EMS Qwandry": "fonts/EMS/EMSQwandry.svg",
  "EMS Readability": "fonts/EMS/EMSReadability.svg",
  "EMS Society": "fonts/EMS/EMSSociety.svg",
  "EMS Space Rocks": "fonts/EMS/EMSSpaceRocks.svg",
  "EMS Swiss": "fonts/EMS/EMSSwiss.svg",
  "EMS Tech": "fonts/EMS/EMSTech.svg",
};

// Italic counterparts (only some fonts have one)
const ITALIC_PATHS = {
  "fonts/Hershey/HersheySerifMed.svg": "fonts/Hershey/HersheySerifMedItalic.svg",
  "fonts/Hershey/HersheySerifBold.svg": "fonts/Hershey/HersheySerifBoldItalic.svg",
  "fonts/EMS/EMSNixish.svg": "fonts/EMS/EMSNixishItalic.svg",
  "fonts/EMS/EMSReadability.svg": "fonts/EMS/EMSReadabilityItalic.svg",
};

const fontCache = {}; // path -> SvgFont
let exportRequested = false;
let overflowed = false;

const $ = (id) => document.getElementById(id);

function getFont(path) {
  if (!fontCache[path]) {
    fontCache[path] = new SvgFont(path); // loads async via loadStrings
  }
  return fontCache[path];
}

function opts() {
  return {
    text: $("text").value,
    fontPath: FONTS[$("font").value],
    sizePt: parseFloat($("fontSize").value) || 12,
    lineHeight: parseFloat($("lineHeight").value) || 1.4,
    padV: parseFloat($("padV").value) || 0,
    padH: parseFloat($("padH").value) || 0,
    docW: parseFloat($("docW").value) || 8.5,
    docH: parseFloat($("docH").value) || 11,
    dpi: parseFloat($("dpi").value) || 96,
  };
}

//---------------------------------------------------------
// Text parsing: markdown/plain -> array of lines of {c, it} chars (italic flag only)
function normalizeText(s) {
  return s
    .replace(/\r\n?/g, "\n")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/ /g, " ")
    .replace(/\t/g, "    ");
}

function parseParagraph(line) {
  // strip markdown block markers
  line = line.replace(/^\s{0,3}#{1,6}\s+/, "").replace(/^\s*>\s?/, "").replace(/^(\s*)[*+-]\s+/, "$1- ");
  const out = [];
  let italic = false;
  const isWord = (ch) => ch !== undefined && /[A-Za-z0-9]/.test(ch);
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "\\" && i + 1 < line.length) { out.push({ c: line[++i], it: italic }); continue; }
    if (ch === "*") {
      // '**' (bold) is ignored; a single '*' toggles italics. '***' = bold+italic -> toggle italic.
      let n = 1;
      while (line[i + n] === "*") n++;
      if (n % 2 === 1) italic = !italic;
      i += n - 1;
      continue;
    }
    if (ch === "_") {
      let n = 1;
      while (line[i + n] === "_") n++;
      const prev = line[i - 1], next = line[i + n];
      if (!(isWord(prev) && isWord(next))) { // skip snake_case
        if (n % 2 === 1) italic = !italic;
        i += n - 1;
        continue;
      }
    }
    if (ch === "`") continue;
    out.push({ c: ch, it: italic });
  }
  return out;
}

//---------------------------------------------------------
// Layout
function advanceOf(font, ch, sizePx) {
  const g = font.glyphs[ch];
  if (!g) return 0;
  return g.horizAdvX * sizePx / font.unitsPerEm;
}

function layout(o, regular, italic) {
  const sizePx = o.sizePt / 72 * o.dpi;
  const maxW = (o.docW - 2 * o.padH) * o.dpi;
  const lineStep = sizePx * o.lineHeight;
  const lines = []; // each: array of runs {text, it, x}

  const pick = (it) => (it && italic && italic.isReady() ? italic : regular);
  const spaceW = (f) => advanceOf(f, " ", sizePx) || sizePx * 0.4;

  for (const para of normalizeText(o.text).split("\n")) {
    const chars = parseParagraph(para);
    if (chars.length === 0 || chars.every((c) => c.c === " ")) { lines.push([]); continue; }

    // split into words (arrays of chars) on spaces
    const words = [];
    let cur = [];
    const leading = [];
    for (const ch of chars) {
      if (ch.c === " ") { if (cur.length) { words.push(cur); cur = []; } else if (!words.length) leading.push(ch); }
      else cur.push(ch);
    }
    if (cur.length) words.push(cur);

    let line = [];
    let x = leading.length * spaceW(regular);
    const flush = () => { lines.push(line); line = []; x = 0; };
    for (const w of words) {
      const f0 = pick(w[0].it);
      const wordW = w.reduce((s, ch) => s + advanceOf(pick(ch.it), ch.c, sizePx), 0);
      const gap = line.length ? spaceW(f0) : 0;
      if (line.length && x + gap + wordW > maxW) flush();
      const startX = x + (line.length ? spaceW(f0) : 0);
      // group chars into runs of same italic state
      let rx = startX;
      let run = null;
      for (const ch of w) {
        const f = pick(ch.it);
        if (!f.glyphs[ch.c]) continue; // skip glyphs the font lacks
        if (!run || run.it !== !!ch.it) { run = { text: "", it: !!ch.it, x: rx }; line.push(run); }
        run.text += ch.c;
        rx += advanceOf(f, ch.c, sizePx);
      }
      x = rx;
      if (!line.length) continue;
    }
    lines.push(line);
  }
  return { lines, sizePx, lineStep };
}

//---------------------------------------------------------
// p5
let needsRedraw = true;

function setup() {
  const sel = $("font");
  for (const name of Object.keys(FONTS)) {
    const op = document.createElement("option");
    op.textContent = name;
    sel.appendChild(op);
  }
  sel.value = "Hershey Serif Med";

  const o = opts();
  const c = createCanvas(Math.round(o.docW * o.dpi), Math.round(o.docH * o.dpi));
  c.parent("canvasHolder");
  noLoop();
  pixelDensity(1);

  for (const id of ["text", "font", "fontSize", "lineHeight", "padV", "padH", "docW", "docH", "dpi"]) {
    $(id).addEventListener("input", () => { needsRedraw = true; redraw(); });
  }
  $("save").addEventListener("click", () => { exportRequested = true; redraw(); });
  // fonts load asynchronously; poll until the selected ones are ready
  setInterval(() => { if (needsRedraw) redraw(); }, 150);
}

function render(o, landscape) {
  const regular = getFont(o.fontPath);
  const italicPath = ITALIC_PATHS[o.fontPath];
  const italic = italicPath ? getFont(italicPath) : null;
  if (!regular.isReady() || (italic && !italic.isReady())) return false;

  const { lines, sizePx, lineStep } = layout(o, regular, italic);
  const left = o.padH * o.dpi;
  const top = o.padV * o.dpi;
  const bottomLimit = (o.docH - o.padV) * o.dpi;

  stroke(0);
  strokeWeight(1);
  noFill();
  push();
  if (landscape) {
    // page (w x h) -> landscape (h x w): (x, y) -> (h - y, x)
    translate(o.docH * o.dpi, 0);
    rotate(HALF_PI);
  }
  overflowed = false;
  let y = top + sizePx; // baseline of first line
  for (const line of lines) {
    if (y > bottomLimit + 0.5) { overflowed = true; break; }
    for (const run of line) {
      (run.it && italic ? italic : regular).drawString(run.text, left + run.x, y, sizePx);
    }
    y += lineStep;
  }
  pop();
  return true;
}

function draw() {
  const o = opts();
  const w = Math.round(o.docW * o.dpi), h = Math.round(o.docH * o.dpi);
  if (width !== w || height !== h) resizeCanvas(w, h);
  background(255);

  if (exportRequested) {
    exportRequested = false;
    // landscape document: width/height swapped, content rotated 90 degrees
    setSvgResolutionDPI(o.dpi);
    setSvgDocumentSize(h, w);
    setSvgFlattenTransforms(true);
    beginRecordSvg(this, "letter.svg");
    render(o, true);
    endRecordSvg();
    background(255);
  }

  const ok = render(o, false);
  needsRedraw = !ok;
  $("status").textContent = !ok ? "Loading font..." : overflowed ? "Warning: text overflows the page; the rest was cut off." : "";
}
