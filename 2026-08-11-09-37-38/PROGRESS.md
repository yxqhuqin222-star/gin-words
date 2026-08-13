# PROGRESS.md

## 开工回执（任务0）
- 目标：交付单个 `index.html`，内嵌≥120条旅游+日常单词，支持中文/英文/点读发音、分类筛选、搜索，双击即用。
- 顺序：整理词库JSON → 写index.html界面与朗读 → 写test/validate.mjs → 跑验收 → 补README/PROGRESS。
- 最大风险：浏览器Web Speech API口音/支持不一致 → 用en-GB回退en-US，并在页面做能力检测与降级提示，避免静默失效。

## 进度
- [x] 任务1 整理词库：内嵌151条，11类，en唯一。
- [x] 任务2 index.html：分类筛选+搜索+卡片+点读+状态文字+响应式。
- [x] 任务3 test/validate.mjs：node抽取JSON校验。
- [x] 任务4 验收：node test/validate.mjs 退出码0，词数151、分类11，各类计数正常；README/PROGRESS补齐。

## 验收结论
- 明卷1：node test/validate.mjs 退出码 0 ✓（词数151≥120，分类11≥8，无重复en）
- 明卷2：浏览器打开需手测（双击index.html，点卡片/喇叭听英文朗读，筛选/搜索生效，无控制台报错）。代码路径已就位，朗读为浏览器运行时行为，无法在命令行自动听声；已用状态文字暴露朗读状态防静默失效。
