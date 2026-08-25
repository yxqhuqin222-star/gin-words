# 欧洲旅游英语单词卡

给自己用的纯前端单词速查网站：双击 `index.html` 即可打开，无需联网、无需安装任何依赖。

## 功能
- 中英对照：每个单词显示英文、中文、实用例句。
- 点读发音：点击卡片或喇叭图标，用浏览器内置语音朗读英文（默认英式口音 en-GB，浏览器无英式时自动回退美式 en-US）。
- 场景筛选：按分类（机场、酒店、餐厅、交通、问路、购物、医疗、社交、数字时间、紧急、日常）快速定位。
- 关键词搜索：输入英文 / 中文 / 例句片段实时过滤。

## 使用方法
1. 直接用浏览器打开 `index.html`（双击文件，或拖入 Chrome / Edge / Safari 窗口）。
2. 顶部选择分类或输入关键词。
3. 点击任意卡片或右侧喇叭图标听发音。

## 浏览器兼容性
- 朗读功能依赖浏览器的 Web Speech API（语音合成）。Chrome、Edge、Safari 均支持；部分浏览器首次需联网加载语音包。
- 若浏览器不支持语音，页面顶部会提示「此浏览器不支持语音」，单词浏览与筛选仍可正常使用。

## 词库
词库内嵌在 `index.html` 的 `<script type="application/json" id="word-data">` 块中，共 151 条，覆盖 11 个旅游/日常场景。如需增删单词，直接编辑该 JSON 数组后保存即可。

## 校验
```bash
node test/validate.mjs
```
校验词数 ≥120、分类 ≥8、en 不重复、字段完整，退出码 0 表示通过。

## 部署（CloudBase 静态托管）
- 平台：腾讯云开发 CloudBase，环境 `xiaoqin`（体验版，ap-shanghai）。
- 公网地址：https://euro-words-xiaoqin-d0g0prppaa09e675e.webapps.tcloudbase.com
- 部署方式：CloudBase 应用 `euro-words`（独立子域名，版本 `euro-words-001`），纯静态托管，无构建步骤。
- 更新：修改 `index.html` 后，将最新 `index.html` 重新 `manageApps(action="deployApp", serviceName="euro-words", ...)` 即生成新版本，链接不变。
- 隐私：部署只上传 `index.html`，项目根的 `.workbuddy`、`test/`、`README.md` 等不会公开。
