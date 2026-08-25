# GitHub 设置检查清单（GitHub Settings Checklist）

> 以下操作需在 `gh auth status` 已登录、且获得显式授权后执行。本清单仅作准备，不自动变更 GitHub 设置。

## 基本仓库元信息

- [ ] 仓库描述（About）填写：欧洲旅游英语单词卡 + CloudBase 云函数进度持久化
- [ ] 添加 Topics：`gin`、`english`，`flashcards`，`cloudbase`，`static-site`
- [ ] 主页链接指向部署地址（如已公开）

## 分支保护 / Rulesets

- [ ] 对 `main` 启用分支保护或规则集：
  - 禁止直接 push
  - 要求 PR 通过
  - 启用「合并后删除分支」

## 安全功能

- [ ] 启用 Dependabot alerts
- [ ] 启用 Dependabot security updates
- [ ] 如仓库为 Public 且套餐支持：启用 Secret scanning
- [ ] 如仓库为 Public 且套餐支持：启用 Push protection

## Actions 权限

- [ ] Workflow 权限设为 read-only
- [ ] 禁用 Actions 的 PR 审批

## 合并策略

- [ ] 启用 squash merge
- [ ] 禁用 merge commits / rebase merge（按团队偏好）
- [ ] 合并后删除分支

## 协作者权限

- [ ] 最小权限原则分配协作者角色
- [ ] 不使用个人访问令牌长期写权限

## 上传后复核

- [ ] 确认公开内容无密钥/隐私泄露
- [ ] 确认 `git` 历史无敏感信息
- [ ] 确认 README 中链接有效
