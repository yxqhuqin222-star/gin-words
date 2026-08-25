# Security Policy

## 项目安全敏感区域

- **部署配置**：`cloudbaserc.json`、`cloudfunctions/wordProgress/`、`2026-08-11-09-37-38/index.html` 中引用了 CloudBase 环境 ID（`xiaoqin-...`）与云函数 API 地址。这些是环境标识，非密钥，但公开后会暴露部署位置。
- **云函数后端**：`cloudfunctions/wordProgress/index.js` 直接读写进度数据表，依赖 CloudBase 环境鉴权。
- **用户数据**：进度数据按 `uid`（浏览器 `localStorage` 生成）隔离，不收集任何个人身份信息。

## 私有报告

如发现安全漏洞，请勿在公开 Issue 中披露，通过以下方式私有报告：

- GitHub 仓库的 **Security → Report a vulnerability**（若该仓库已开启 Private Vulnerability Reporting）；
- 或联系仓库维护者（GitHub: [@yxqhuqin222-star](https://github.com/yxqhuqin222-star)）。

报告中请包含：复现步骤、影响范围、建议修复方案。

## 密钥处理准则

- **严禁**在代码、Issue、PR 或评论中提交任何 API Key、Token、密码、私钥或数据库凭证。
- 本项目当前**不依赖**任何明文密钥文件（无 `.env`、无 `credentials.json`）；云函数通过 CloudBase 运行环境鉴权，密钥不在仓库内。
- 如发现历史上误提交了密钥，请立即私有报告，由维护者执行历史清理。

## 公开前清单

- 确认 `git log` 历史中无密钥泄露（见 `PRIVACY_SECURITY_CHECKLIST.md`）。
- 确认 `index.html` / 云函数中的环境标识为预期公开范围。
