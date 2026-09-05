import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createActivity, getRegisteredStudentCount, listActivities, listActivityRegistrants, listStudentRegistrations, listStudents, loginUser, registerForActivity, registerUser, removeActivity, removeStudent, resetStudentPassword, resetStudentPasswordByAdmin, sendRegistrationCode, sendResetCode, unregisterFromActivity, updateActivity, updateStudent } from './database'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ out
// │ │ ├─┬ main
// │ │ │ └── main.js
// │ │
// │ │ ├─┬ preload
// │ │ │ └── preload.cjs
// │ │ └─┬ renderer
// │ │   └── index.html
// │
process.env.APP_ROOT = path.join(__dirname, '..', '..')

export const VITE_DEV_SERVER_URL = process.env['ELECTRON_RENDERER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'out', 'main')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'out', 'renderer')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1232,
    height: 920,
    minWidth: 1232,
    minHeight: 920,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(process.env.APP_ROOT, 'out', 'preload', 'preload.cjs'),
    },
  })

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F12') {
      event.preventDefault()
      win?.webContents.toggleDevTools()
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  // Remove Electron's default application menu (File / Edit / View / Window / Help).
  Menu.setApplicationMenu(null)
  ipcMain.handle('auth:register', (_event, input) => registerUser(input))
  ipcMain.handle('auth:send-registration-code', (_event, input: { account: string; email: string }) => sendRegistrationCode(input?.account ?? '', input?.email ?? ''))
  ipcMain.handle('activities:list', () => listActivities())
  ipcMain.handle('activities:create', (_event, input) => createActivity(input))
  ipcMain.handle('activities:update', (_event, input) => updateActivity(Number(input.id), input))
  ipcMain.handle('activities:registrations', (_event, input: { account: string; activityId: number }) => listStudentRegistrations(input.account))
  ipcMain.handle('activities:register', (_event, input: { account: string; activityId: number }) => registerForActivity(input.account, Number(input.activityId)))
  ipcMain.handle('activities:unregister', (_event, input: { account: string; activityId: number }) => unregisterFromActivity(input.account, Number(input.activityId)))
  ipcMain.handle('activities:registrants', (_event, id: number) => listActivityRegistrants(Number(id)))
  ipcMain.handle('activities:delete', (_event, id: number) => removeActivity(Number(id)))
  ipcMain.handle('students:list', () => listStudents())
  ipcMain.handle('students:update', (_event, input: { id: number; name: string; email: string }) => updateStudent(Number(input.id), input))
  ipcMain.handle('students:reset-password', (_event, input: { id: number; password: string }) => resetStudentPasswordByAdmin(Number(input.id), input.password))
  ipcMain.handle('students:delete', (_event, id: number) => removeStudent(Number(id)))
  ipcMain.handle('stats:public', async () => {
    try {
      return { registeredStudents: await getRegisteredStudentCount() }
    } catch {
      throw new Error('统计数据暂时不可用')
    }
  })
  ipcMain.handle('auth:send-reset-code', async (_event, input: { account: string }) => {
    try {
      return await sendResetCode(input?.account ?? '')
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message.includes('不存在') || message.includes('未绑定')) throw new Error('该用户不存在或未绑定 QQ 邮箱')
      if (message.includes('QQ 邮箱服务')) throw new Error('尚未配置 QQ 邮箱服务，请联系管理员')
      throw new Error('验证码发送失败，请稍后重试')
    }
  })
  ipcMain.handle('auth:reset-password', async (_event, input: { account: string; code: string; newPassword: string }) => {
    try {
      await resetStudentPassword(input?.account ?? '', input?.code ?? '', input?.newPassword ?? '')
      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message.includes('验证码无效')) throw new Error('验证码无效或已过期')
      if (message.includes('验证码错误次数')) throw new Error('验证码错误次数过多，请重新获取')
      if (message.includes('验证码错误')) throw new Error('验证码错误')
      if (message.includes('至少需要')) throw new Error('新密码至少需要 6 位')
      throw new Error('密码修改失败，请稍后重试')
    }
  })
  ipcMain.handle('auth:login', async (_event, input: { account: string; password: string; role: 'student' | 'teacher' }) => {
    try {
      return await loginUser(input.account, input.password, input.role)
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message === 'USER_NOT_FOUND') throw new Error('该用户不存在')
      if (message.includes('账号') || message.includes('密码') || message.includes('璐') || message.includes('鎴')) throw new Error('密码错误')
      throw new Error('数据库暂时不可用，请重启软件后重试')
    }
  })
  createWindow()
})
