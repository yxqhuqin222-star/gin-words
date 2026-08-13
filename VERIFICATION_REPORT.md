# Verification Report

- **仓库**：gin-words（欧洲旅游英语单词卡 + CloudBase 云函数进度持久化）
- **验证日期**：2026-08-13
- **验证工具**：`github-publish-prep/scripts/validate_github_publish_prep.py` + 项目自带校验
- **分支**：`main`（与 `origin/main` 同步，未提交改动）

## 1. 发布文件验证（validator）

| 检查项 | 结果 |
| --- | --- |
| 13 个必需文件存在且非空 | PASS |
| Shell 语法检查 | PASS |
| 当前文件真实密钥命中 | 0 |
| 高风险文件 | 无 |
| `.env.example` | 缺失（备注：项目不依赖 `.env`，可接受） |

必需文件清单：README.md、.gitignore、LICENSE、SECURITY.md、CONTRIBUTING.md、CODE_OF_CONDUCT.md、PRE_UPLOAD_CHECKLIST.md、PRIVACY_SECURITY_CHECKLIST.md、GITHUB_SETTINGS_CHECKLIST.md、.github/PULL_REQUEST_TEMPLATE.md、.github/ISSUE_TEMPLATE/bug_report.md、.github/ISSUE_TEMPLATE/feature_request.md、.github/dependabot.yml。

## 2. 项目校验

| 检查项 | 命令 | 结果 |
| --- | --- | --- |
| 词库校验 | `node 2026-08-11-09-37-38/test/validate.mjs` | PASS（151 词 / 11 类 / en 唯一 / 字段完整） |
| 云函数语法 | `node --check cloudfunctions/wordProgress/index.js` | PASS |
| 启动脚本语法 | `bash -n cloudfunctions/wordProgress/scf_bootstrap` | PASS |

## 3. 隐私 / 密钥扫描

- **当前文件模式扫描**：除文档模板自带 `secret` 字样与词库正常例句 "What is the wifi password?" 外，无真实密钥（sk-/ghp_/AKIA/AIza 等）命中。
- **Git 历史扫描**：`git log --all -G'(PASSWORD|SECRET|TOKEN|API_KEY|PRIVATE KEY|DATABASE_URL)'` 与密钥文件历史均为空，无历史泄露。

## 4. Git 状态

```
 M .gitignore
?? .github/
?? CODE_OF_CONDUCT.md
?? CONTRIBUTING.md
?? GITHUB_SETTINGS_CHECKLIST.md
?? LICENSE
?? PRE_UPLOAD_CHECKLIST.md
?? PRIVACY_SECURITY_CHECKLIST.md
?? README.md
?? SECURITY.md
?? docs/
```

未 commit、未 push。

## 5. 剩余风险

1. **`.env.example` 缺失**：可接受，项目不使用 `.env`。
2. **CloudBase 环境标识公开**：`index.html` / `cloudbaserc.json` / 云函数中的 `envId`（`xiaoqin-...`）与云函数 API 地址已随代码公开。经确认保留原样——属环境标识而非密钥，但会暴露部署位置，请知悉。
3. **预览图未提供**：`docs/images/README.md` 已占位，建议后续补充公开安全截图。
4. **未安装 gitleaks**：本次仅用正则扫描，如需更强保证可后续安装 gitleaks 复扫。

## 6. 结论

本地发布准备完成，13 项发布文件齐备、校验通过、无密钥泄露。可进入 commit/push 与 GitHub 设置阶段，需获得显式授权后执行。
