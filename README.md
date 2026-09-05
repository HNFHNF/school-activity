# 校园活动管理系统

这是一个基于 Vue 3、TypeScript、Electron 30 和 electron-vite 的桌面应用。学生可以浏览和报名活动，教师可以发布和管理活动；账号数据保存在本机用户目录的加密数据库中。

## 开发

环境要求：Node.js 20.19+（或 22.12+）和 npm。

```bash
npm install
npm start
```

`npm start` 和 `npm run dev` 都会启动 electron-vite 开发模式，包含渲染进程热更新以及主进程/预加载脚本的自动重建。

## 构建

```bash
npm run typecheck
npm run build
```

`npm run build` 会先进行 Vue/TypeScript 类型检查，再将三个 Electron 进程构建到 `out/`，最后使用 electron-builder 生成当前平台的安装包。只生成未安装的目录包可以运行 `npm run build:pack`。

生产预览使用：

```bash
npm run preview
```

## 加密数据库恢复

如果程序曾经使用其他 Windows 用户或管理员权限运行，旧的 `campus-events.key` 可能无法被当前用户解密。关闭所有应用窗口后，将下面目录中的 `campus-events.db.enc` 和 `campus-events.key` 改名为带 `.backup` 后缀的文件，再重新启动即可创建新的本机账号库：

`%APPDATA%\campus-activity-manager\`

程序也会在检测到无法解密时尝试自动备份并重建账号库。旧账号无法在缺少原加密密钥的情况下恢复，需要重新注册。

## 项目结构

- `electron/main.ts`：Electron 主进程、窗口和 IPC 处理器。
- `electron/preload.ts`：通过 `contextBridge` 暴露给渲染进程的安全 API。
- `electron/database.ts`：本机加密数据库和认证逻辑。
- `src/`：Vue 渲染进程界面。
- `electron.vite.config.ts`：electron-vite 的 main、preload、renderer 三进程配置。

构建结果位于 `out/main`、`out/preload` 和 `out/renderer`，electron-builder 的配置位于 `electron-builder.json5`。

## QQ 邮箱密码重置

密码重置需要 QQ 邮箱 SMTP 发件账号和授权码（不是 QQ 登录密码）。在 Windows PowerShell 中配置后重新启动应用：

```powershell
[Environment]::SetEnvironmentVariable("QQ_SMTP_USER", "你的QQ邮箱@qq.com", "User")
[Environment]::SetEnvironmentVariable("QQ_SMTP_AUTH_CODE", "QQ邮箱SMTP授权码", "User")
```
