# 隐私与安全检查清单（Privacy & Security Checklist）

## 禁止提交项（Do-Not-Commit）

本项目当前不依赖明文密钥文件。以下一律禁止提交：

- `.env`、`*.env`、`*.env.*`（除非是 `.env.example` 占位）
- 密钥文件：`*.pem`、`*.key`、`*.p12`、`*.pfx`、`id_rsa`、`id_ed25519`
- `credentials.json`、`service-account*.json`
- 本地数据库：`*.sqlite`、`*.sqlite3`、`*.db`、`*.dump`、`*.backup`
- 日志、`node_modules/`、缓存、本地备份、无关重构

## 密钥扫描命令（当前文件）

```bash
# 文档/模式命中（区分真实密钥与文档示例）
grep -rniE "(api[_-]?key|secret|token|password|passwd|AKIA|AIza|sk-[A-Za-z0-9]{20}|private[_-]?key|-----BEGIN)" \
  --include=*.md --include=*.json --include=*.js --include=*.html . || echo "无匹配"
```

## 高风险文件扫描

```bash
git ls-files | grep -Ei "(\.env|\.env\..*|\.pem|\.key|\.p12|\.pfx|credentials\.json|service-account.*\.json|\.sqlite|\.db|\.csv|\.xlsx)$"
```

## 历史泄露扫描

```bash
git log --all --stat -- .env '*.pem' '*.key' '*.pfx' credentials.json
git log --all -G'(PASSWORD|SECRET|TOKEN|API_KEY|PRIVATE KEY|DATABASE_URL)' --oneline
```

## 响应规则

| 命中类型 | 处理方式 |
| --- | --- |
| 当前文件真实密钥（sk-/ghp_/AKIA 等） | 立即暂停，私有报告，执行历史清理后重发 |
| 文档/示例中的模式命中 | 标注为文档示例，不阻断；确认非真实密钥 |
| Git 历史中的密钥 | 停止发布，由维护者决定历史改写（git filter-repo / BFG） |
| 私有截图 / 账号 / 私人 URL | 删除并替换为脱敏内容 |

## 本项目说明

- 云函数 `cloudfunctions/wordProgress/index.js` 通过 CloudBase 运行环境鉴权，**不**在仓库内保存密钥。
- 前端 `index.html` 与 `cloudbaserc.json` 含 CloudBase 环境标识（`xiaoqin-...`），属环境标识而非密钥；公开会暴露部署位置，已在决策中确认保留原样。
