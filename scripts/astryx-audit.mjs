
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const SCAN_DIRS = ["src", "app", "pages", "components"];

const CODE_EXTENSIONS = new Set([
  ".tsx",
  ".jsx",
  ".ts",
  ".js"
]);

const STYLE_EXTENSIONS = new Set([
  ".css",
  ".scss"
]);

const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  ".git"
]);

// Native HTML tags and possible Astryx alternatives.
// The div tag is intentionally excluded.
const nativeTags = {
  // Form controls
  input: ["TextInput", "NumberInput", "DateInput"],
  button: ["Button", "IconButton"],
  select: ["Selector", "Typeahead", "MultiSelector"],
  textarea: ["TextArea"],
  label: ["Label"],
  fieldset: ["Fieldset"],
  legend: ["Text"],
  datalist: ["Typeahead"],
  option: ["Selector"],
  optgroup: ["Selector"],
  output: ["Text"],
  progress: ["Progress"],
  meter: ["Progress"],

  // Layout and semantic elements
  main: ["Section"],
  section: ["Section"],
  article: ["Card", "Section"],
  aside: ["Card", "Section"],
  header: ["Section"],
  footer: ["Section"],
  nav: ["NavigationMenu"],
  address: ["Text"],

  // Typography
  span: ["Text"],
  p: ["Text"],
  h1: ["Heading", "Text"],
  h2: ["Heading", "Text"],
  h3: ["Heading", "Text"],
  h4: ["Heading", "Text"],
  h5: ["Heading", "Text"],
  h6: ["Heading", "Text"],
  strong: ["Text"],
  b: ["Text"],
  em: ["Text"],
  i: ["Text"],
  small: ["Text"],
  mark: ["Text"],
  blockquote: ["Text"],
  pre: ["Text"],
  code: ["Text"],
  q: ["Text"],
  abbr: ["Text"],
  time: ["Text"],
  cite: ["Text"],
  del: ["Text"],
  ins: ["Text"],
  sub: ["Text"],
  sup: ["Text"],

  // Links and media
  a: ["Link", "Button"],
 
  picture: ["Image"],
  video: ["Video"],
  audio: ["Audio"],
  source: ["Image", "Video", "Audio"],
  iframe: ["Embed"],
  figure: ["Card"],
  figcaption: ["Text"],
  canvas: [],
  svg: [],
  path: [],
  circle: [],
  rect: [],
  line: [],
  polygon: [],
  polyline: [],
  ellipse: [],
  g: [],

  // Lists
  ul: ["List"],
  ol: ["List"],
  li: ["ListItem"],
  dl: ["List"],
  dt: ["Text"],
  dd: ["Text"],

  // Tables
  table: ["Table"],
  thead: ["Table"],
  tbody: ["Table"],
  tfoot: ["Table"],
  tr: ["TableRow"],
  th: ["TableCell"],
  td: ["TableCell"],
  caption: ["Text"],
  colgroup: [],
  col: [],

  // Interactive elements
  details: ["Accordion"],
  summary: ["Accordion"],
  dialog: ["Dialog", "AlertDialog"],
  menu: ["DropdownMenu"],
  menuitem: ["DropdownMenu"],
  search: ["Input"],
  slot: [],

  // Other HTML elements
  hr: ["Divider"],
  br: [],
  wbr: [],
  template: [],
  noscript: [],
  script: [],
  style: [],
  link: [],
  meta: [],
  title: [],
  head: [],
  body: [],
  html: []
};

const report = {
  scannedFiles: 0,
  nativeElements: [],
  cssFiles: [],
  inlineStyles: [],
  astryxImports: [],
  findings: []
};

// Recursively collect project files.
function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) {
          return [];
        }

        return walk(fullPath);
      }

      return [fullPath];
    });
}

// Collect files from configured directories.
const files = [
  ...new Set(
    SCAN_DIRS.flatMap(dir =>
      walk(path.join(ROOT, dir))
    )
  )
];

// Scan every collected file.
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const relative = path.relative(ROOT, file);

  // Collect CSS and SCSS files.
  if (STYLE_EXTENSIONS.has(ext)) {
    report.cssFiles.push(relative);
    continue;
  }

  // Ignore unsupported file types.
  if (!CODE_EXTENSIONS.has(ext)) {
    continue;
  }

  const source = fs.readFileSync(file, "utf8");

  report.scannedFiles++;

  // Detect Astryx imports.
  const importPattern =
    /import\s+[\s\S]*?\sfrom\s*["']@astryxdesign\/core(?:\/[^"']*)?["']/g;

  for (const match of source.matchAll(importPattern)) {
    report.astryxImports.push({
      file: relative,
      statement: match[0].replace(/\s+/g, " ").trim()
    });
  }

  // Remove comments while preserving line numbers.
  // This is a lightweight scanner, not a complete JSX parser.
  const searchableSource = source
    .replace(/\/\*[\s\S]*?\*\//g, match =>
      match.replace(/[^\n]/g, " ")
    )
    .replace(/^\s*\/\/.*$/gm, match =>
      match.replace(/[^\n]/g, " ")
    );

  // Detect native HTML opening tags.
  // Case-sensitive: <button> is native HTML; <Button> is a component.
  // The div tag is not present in nativeTags, so it is not scanned.
  for (const [tag, alternatives] of Object.entries(nativeTags)) {
    const pattern = new RegExp(
      `<${tag}(?=[\\s/>])`,
      "g"
    );

    for (const match of searchableSource.matchAll(pattern)) {
      const line = searchableSource
        .slice(0, match.index)
        .split("\n").length;

      const finding = {
        file: relative,
        line,
        element: tag,
        suggestedAstryxComponents: alternatives,
        reason:
          `Native HTML <${tag}> detected. ` +
          (
            alternatives.length > 0
              ? "Review whether an Astryx component is suitable."
              : "Review whether this native element is necessary."
          )
      };

      report.nativeElements.push(finding);
      report.findings.push(finding);
    }
  }

  // Detect inline style={{ ... }}.
  const stylePattern = /\bstyle\s*=\s*\{\s*\{/g;

  for (const match of searchableSource.matchAll(stylePattern)) {
    report.inlineStyles.push({
      file: relative,
      line: searchableSource
        .slice(0, match.index)
        .split("\n").length
    });
  }
}

// Create reports directory.
const outputDir = path.join(ROOT, "reports");

fs.mkdirSync(outputDir, {
  recursive: true
});

// JSON output file.
const outputFile = path.join(
  outputDir,
  "astryx-audit.json"
);

fs.writeFileSync(
  outputFile,
  JSON.stringify(report, null, 2),
  "utf8"
);

// Print audit summary.
console.log("\n=== Astryx Component Audit ===");

console.log("Files scanned:", report.scannedFiles);
console.log("Native elements:", report.nativeElements.length);
console.log("CSS/SCSS files:", report.cssFiles.length);
console.log("Inline styles:", report.inlineStyles.length);
console.log("Astryx imports:", report.astryxImports.length);

// Print detected native elements.
if (report.nativeElements.length > 0) {
  console.log("\nNative HTML elements to review:");

  for (const item of report.nativeElements) {
    console.log(
      `${item.file}:${item.line} - <${item.element}>` +
      " | Possible Astryx alternatives: " +
      (
        item.suggestedAstryxComponents.length > 0
          ? item.suggestedAstryxComponents.join(", ")
          : "No suggested replacement"
      )
    );
  }
} else {
  console.log("\nNo native elements detected.");
}

// Print inline style locations.
if (report.inlineStyles.length > 0) {
  console.log("\nInline styles to review:");

  for (const item of report.inlineStyles) {
    console.log(`${item.file}:${item.line} - inline style detected`);
  }
}

// Print CSS/SCSS files.
if (report.cssFiles.length > 0) {
  console.log("\nCSS/SCSS files:");

  for (const file of report.cssFiles) {
    console.log(file);
  }
}

// Print report location.
console.log("\nReport saved to:", outputFile);