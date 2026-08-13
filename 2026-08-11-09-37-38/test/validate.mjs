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
