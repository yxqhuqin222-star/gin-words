# Contributing

感谢参与本项目的完善。请遵循以下约定。

## 分支与提交

- 从 `main` 切出特性分支（`feat/`、`fix/` 等）。
- 提交信息清晰描述「做了什么 / 为什么」。
- 一个 PR 聚焦一个改动点，避免无关重构。

## 本地检查

前端词库改动后必须运行校验：

```bash
node 2026-08-11-09-37-38/test/validate.mjs
```

校验通过条件：词数 ≥120、分类 ≥8、`en` 字段不重复、字段完整，退出码 0 表示通过。

云函数改动后做语法检查：

```bash
bash -n cloudfunctions/wordProgress/scf_bootstrap
node --check cloudfunctions/wordProgress/index.js
```

## 提交规范

- **不要**提交密钥、`.env`、生成的缓存、日志、依赖文件夹（`node_modules/`）、本地备份或无关重构。
- 词库数据直接编辑 `2026-08-11-09-37-38/index.html` 内嵌的 `word-data` JSON 块后保存。
- 如涉及付费 API / 云资源用量，在 PR 说明中标注影响。

## PR 模板

提交 PR 时请填写 `.github/PULL_REQUEST_TEMPLATE.md` 中的核对项，并确认无隐私/密钥泄露。
