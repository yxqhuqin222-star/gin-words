# 发布前检查清单（Pre-Upload Checklist）

## 1. 仓库状态确认

- [ ] 当前分支为 `main`，工作区干净（`git status --short --branch` 无未提交改动）
- [ ] 远程 `origin` 指向预期仓库（`git remote -v`）
- [ ] `git fetch` 后本地与远程无分叉、无落后

## 2. 必需文件

- [ ] `README.md`（根目录总览 + 链接到项目 README）
- [ ] `.gitignore`（已含密钥/凭据/缓存排除规则）
- [ ] `LICENSE`（MIT）
- [ ] `SECURITY.md`
- [ ] `CONTRIBUTING.md`
- [ ] `CODE_OF_CONDUCT.md`
- [ ] `PRE_UPLOAD_CHECKLIST.md`
- [ ] `PRIVACY_SECURITY_CHECKLIST.md`
- [ ] `GITHUB_SETTINGS_CHECKLIST.md`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] `.github/dependabot.yml`
- [ ] `docs/images/README.md`
- [ ] `VERIFICATION_REPORT.md`

## 3. README 内容核对

- [ ] 项目名 + 一句话用途清晰
- [ ] 功能、用法、校验命令准确对应实际代码
- [ ] 未编造截图、性能数据或兼容性声明
- [ ] 部署信息（CloudBase 环境标识）与代码一致

## 4. 密钥 / 隐私核对

- [ ] `PRIVACY_SECURITY_CHECKLIST.md` 的扫描命令全部跑过且无真实密钥命中
- [ ] `git log --all -S'SECRET|TOKEN|API_KEY|PRIVATE KEY'` 无历史泄露
- [ ] 公开内容中的环境标识为预期范围

## 5. 项目验证

- [ ] `node 2026-08-11-09-37-38/test/validate.mjs` 退出码 0
- [ ] 云函数语法检查通过

## 6. 暂停条件（出现则停止并确认）

- 发现真实密钥 / 私人数据
- 资产版权归属不清
- 需清理 Git 历史
- License 选择存在重大法律风险
- 涉及付费服务或生产数据
