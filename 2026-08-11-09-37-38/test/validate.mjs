import { readFileSync } from "node:fs";

const MIN_WORDS = 120;
const MIN_CATS = 8;

let html;
try {
  html = readFileSync("index.html", "utf8");
} catch (e) {
  console.error("✗ 找不到 index.html：", e.message);
  process.exit(1);
}

const m = html.match(
  /<script type="application\/json" id="word-data">([\s\S]*?)<\/script>/
);
if (!m) {
  console.error("✗ 找不到词库脚本块（word-data）");
  process.exit(1);
}

let words;
try {
  words = JSON.parse(m[1]);
} catch (e) {
  console.error("✗ 词库 JSON 解析失败：", e.message);
  process.exit(1);
}

const errors = [];

if (!Array.isArray(words)) errors.push("词库不是数组");
if (words.length < MIN_WORDS)
  errors.push(`词数 ${words.length} < 最低 ${MIN_WORDS}`);

const seen = new Set();
const catCount = {};
words.forEach((w, i) => {
  const at = `第 ${i + 1} 条`;
  if (typeof w.en !== "string" || !w.en.trim()) errors.push(`${at} 缺 en`);
  if (typeof w.zh !== "string" || !w.zh.trim()) errors.push(`${at} 缺 zh`);
  if (typeof w.cat !== "string" || !w.cat.trim()) errors.push(`${at} 缺 cat`);
  if (w.en) {
    const key = w.en.trim().toLowerCase();
    if (seen.has(key)) errors.push(`en 重复：${w.en}`);
    seen.add(key);
    catCount[w.cat] = (catCount[w.cat] || 0) + 1;
  }
});

const cats = Object.keys(catCount);
if (cats.length < MIN_CATS)
  errors.push(`分类数 ${cats.length} < 最低 ${MIN_CATS}`);

if (errors.length) {
  console.error("验收未通过：");
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}

console.log(`✓ 词数：${words.length}（≥${MIN_WORDS}）`);
console.log(`✓ 分类数：${cats.length}（≥${MIN_CATS}）`);
console.log("分类计数：");
cats
  .slice()
  .sort()
  .forEach((c) => console.log(`  ${c}: ${catCount[c]}`));
console.log("✓ 全部校验通过");

// ===== 常用句（sentence-data）校验 =====
const SENT_MIN = 100;
const SENT_MIN_CATS = 5;
const sm = html.match(
  /<script type="application\/json" id="sentence-data">([\s\S]*?)<\/script>/
);
if (!sm) {
  console.error("✗ 找不到句库脚本块（sentence-data）");
  process.exit(1);
}
let sentences;
try {
  sentences = JSON.parse(sm[1]);
} catch (e) {
  console.error("✗ 句库 JSON 解析失败：", e.message);
  process.exit(1);
}
const sErrors = [];
if (!Array.isArray(sentences)) sErrors.push("句库不是数组");
if (sentences.length < SENT_MIN)
  sErrors.push(`句数 ${sentences.length} < 最低 ${SENT_MIN}`);
const sCatCount = {};
sentences.forEach((w, i) => {
  const at = `句 ${i + 1}`;
  if (typeof w.en !== "string" || !w.en.trim()) sErrors.push(`${at} 缺 en`);
  if (typeof w.zh !== "string" || !w.zh.trim()) sErrors.push(`${at} 缺 zh`);
  if (typeof w.cat !== "string" || !w.cat.trim()) sErrors.push(`${at} 缺 cat`);
  if (w.cat) sCatCount[w.cat] = (sCatCount[w.cat] || 0) + 1;
});
const sCats = Object.keys(sCatCount);
if (sCats.length < SENT_MIN_CATS)
  sErrors.push(`句库分类数 ${sCats.length} < 最低 ${SENT_MIN_CATS}`);
if (sErrors.length) {
  console.error("常用句验收未通过：");
  sErrors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`✓ 句数：${sentences.length}（≥${SENT_MIN}）`);
console.log(`✓ 句库分类数：${sCats.length}（≥${SENT_MIN_CATS}）`);
console.log("✓ 常用句校验通过");
