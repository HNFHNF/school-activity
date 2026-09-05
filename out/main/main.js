import { app, safeStorage, BrowserWindow, Menu, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import nodemailer from "nodemailer";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const DB_FILE = "campus-events.db.enc";
const KEY_FILE = "campus-events.key";
const ADMIN_ACCOUNT = "admin";
const ADMIN_SALT = "campus-events-admin-v1";
const ADMIN_HASH = "030d022ae91f89b3bb563cf2fa23d0b4cb44d1b7d1ed023f1b0835c65c944cde4a9cb87a8aa604bece9b8cfb9da91c08ae04914d2be683b3f4431c9c21328288";
let databasePromise;
const resetCodes = /* @__PURE__ */ new Map();
const registrationCodes = /* @__PURE__ */ new Map();
const seedActivities = [
  { title: "2026 校园科技创新节", category: "academic", desc: "汇聚全校优秀科技项目，展示学生创新成果，更有知名企业嘉宾现场点评与实习机会。活动包含项目路演、技术工作坊、企业招聘宣讲三大板块，是本学期不可错过的科技盛宴。", time: "2026-09-15 09:00", location: "大学生活动中心一楼展厅", capacity: 300, deadline: "2026-09-14 18:00", organizer: "校团委科技创新部", icon: "🚀", teacherId: "admin" },
  { title: "名企校友分享会：从校园到职场", category: "academic", desc: "邀请三位毕业五年内的校友回校分享职业选择、面试技巧与成长心得。", time: "2026-09-08 19:00", location: "图书馆报告厅", capacity: 120, deadline: "2026-09-07 23:59", organizer: "学生职业发展协会", icon: "🎤", teacherId: "admin" },
  { title: "秋季校园马拉松", category: "sports", desc: "5公里趣味跑，设置个人挑战组与团队接力组，完赛即可获得纪念奖牌。", time: "2026-09-20 07:30", location: "东校区田径场", capacity: 500, deadline: "2026-09-18 22:00", organizer: "体育教研部", icon: "🏃", teacherId: "admin" },
  { title: "中秋月光市集", category: "culture", desc: "传统手作、国风表演、灯谜游戏与特色美食，共度团圆佳节。", time: "2026-09-17 17:00", location: "中心广场", capacity: 200, deadline: "2026-09-16 12:00", organizer: "传统文化社", icon: "🏮", teacherId: "admin" },
  { title: "社区英语辅导志愿服务", category: "volunteer", desc: "面向周边社区小学生开展英语口语与作业辅导，需具备基础沟通能力。", time: "2026-09-13 14:00", location: "阳光社区服务中心", capacity: 30, deadline: "2026-09-12 20:00", organizer: "青年志愿者协会", icon: "🤝", teacherId: "admin" },
  { title: "摄影社：城市光影外拍", category: "club", desc: "周末外拍活动，由专业摄影教师带队，适合所有摄影爱好者。", time: "2026-09-21 08:00", location: "老校区西门集合", capacity: 25, deadline: "2026-09-19 18:00", organizer: "摄影协会", icon: "📷", teacherId: "admin" },
  { title: "人工智能前沿讲座：大模型应用实践", category: "academic", desc: "计算机学院副教授带你了解大模型在校园学习与科研中的实际应用。", time: "2026-09-10 15:30", location: "工科楼A301", capacity: 80, deadline: "2026-09-09 23:59", organizer: "计算机学院", icon: "🤖", teacherId: "admin" },
  { title: "草地音乐节", category: "culture", desc: "乐队演出、独立音乐人、自由舞台，欢迎大家自带野餐垫参与。", time: "2026-09-24 18:00", location: "西校区大草坪", capacity: 400, deadline: "2026-09-23 12:00", organizer: "音乐社", icon: "🎸", teacherId: "admin" },
  { title: "新生篮球友谊赛", category: "sports", desc: "各学院新生篮球队友谊赛，欢迎到场加油助威。", time: "2026-09-12 16:00", location: "体育馆主馆", capacity: 150, deadline: "2026-09-11 12:00", organizer: "体育部", icon: "🏀", teacherId: "admin" }
];
async function getDatabase() {
  try {
    return await (databasePromise ??= openDatabase());
  } catch (error) {
    console.error("[database] initialization failed:", error);
    databasePromise = void 0;
    throw error;
  }
}
function getPaths() {
  const userData = app.getPath("userData");
  return {
    database: path.join(userData, DB_FILE),
    key: path.join(userData, KEY_FILE)
  };
}
function backupUnavailableStore(keyPath) {
  const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
  const databasePath = path.join(path.dirname(keyPath), DB_FILE);
  for (const filePath of [keyPath, databasePath]) {
    if (!fs.existsSync(filePath)) continue;
    const backupPath = `${filePath}.backup-${stamp}`;
    fs.renameSync(filePath, backupPath);
    console.warn(`[database] encrypted store was backed up to ${backupPath}`);
  }
}
function getEncryptionKey(keyPath) {
  if (fs.existsSync(keyPath)) {
    const stored = fs.readFileSync(keyPath, "utf8");
    if (stored.startsWith("safe:") && !safeStorage.isEncryptionAvailable()) {
      throw new Error("系统加密服务暂不可用，无法读取本地账号数据库");
    }
    if (stored.startsWith("safe:")) {
      try {
        return safeStorage.decryptString(Buffer.from(stored.slice(5), "base64"));
      } catch (error) {
        console.error("[database] stored encryption key cannot be decrypted; creating a fresh local store", error);
        backupUnavailableStore(keyPath);
      }
    }
    if (!stored.startsWith("safe:")) return stored;
  }
  const key = crypto.randomBytes(32).toString("base64");
  if (safeStorage.isEncryptionAvailable()) {
    const protectedKey = safeStorage.encryptString(key).toString("base64");
    fs.writeFileSync(keyPath, `safe:${protectedKey}`, { mode: 384 });
  } else {
    fs.writeFileSync(keyPath, key, { mode: 384 });
  }
  return key;
}
function encryptDatabase(data, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "base64"), iv);
  const encrypted = Buffer.concat([cipher.update(Buffer.from(data)), cipher.final()]);
  return Buffer.concat([Buffer.from("CEV1"), iv, cipher.getAuthTag(), encrypted]);
}
function decryptDatabase(data, key) {
  if (data.subarray(0, 4).toString() !== "CEV1") throw new Error("Invalid database format");
  const iv = data.subarray(4, 16);
  const tag = data.subarray(16, 32);
  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "base64"), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data.subarray(32)), decipher.final()]);
}
async function openDatabase() {
  const { database: databasePath, key: keyPath } = getPaths();
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const key = getEncryptionKey(keyPath);
  const require3 = createRequire(import.meta.url);
  const initSqlJs = require3("sql.js");
  const SQL = await initSqlJs({ locateFile: () => path.join(process.env.VITE_PUBLIC, "sql-wasm.wasm") });
  let db;
  if (fs.existsSync(databasePath)) {
    db = new SQL.Database(new Uint8Array(decryptDatabase(fs.readFileSync(databasePath), key)));
  } else {
    db = new SQL.Database();
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
      remember_me INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      activity_time TEXT NOT NULL,
      location TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      enrolled INTEGER NOT NULL DEFAULT 0,
      deadline TEXT NOT NULL,
      organizer TEXT NOT NULL,
      icon TEXT NOT NULL,
      teacher_id TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS activity_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      activity_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      registered_at TEXT NOT NULL,
      UNIQUE(activity_id, student_id),
      FOREIGN KEY(activity_id) REFERENCES activities(id),
      FOREIGN KEY(student_id) REFERENCES users(id)
    )
  `);
  seedActivities.forEach((activity, id) => {
    db.run(
      `INSERT OR IGNORE INTO activities (id, title, category, description, activity_time, location, capacity, enrolled, deadline, organizer, icon, teacher_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, activity.title, activity.category, activity.desc, activity.time, activity.location, activity.capacity, id === 0 ? 217 : id === 1 ? 98 : id === 2 ? 356 : id === 3 ? 189 : id === 4 ? 12 : id === 5 ? 24 : id === 6 ? 76 : id === 7 ? 312 : 45, activity.deadline, activity.organizer, activity.icon, activity.teacherId]
    );
  });
  db.run("UPDATE activities SET enrolled = (SELECT COUNT(*) FROM activity_registrations WHERE activity_id = activities.id)");
  try {
    db.run("ALTER TABLE users ADD COLUMN email TEXT");
  } catch {
  }
  db.run("DELETE FROM users WHERE role = 'student' AND (email IS NULL OR TRIM(email) = '')");
  await persistDatabase(db, databasePath, key);
  return db;
}
function activityFromRow(row) {
  const [id, title, category, desc, time, location, capacity, enrolled, deadline, organizer, icon, teacherId] = row;
  return { id: Number(id), title: String(title), category: String(category), desc: String(desc), time: String(time), location: String(location), capacity: Number(capacity), enrolled: Number(enrolled), deadline: String(deadline), organizer: String(organizer), icon: String(icon), teacherId: String(teacherId) };
}
async function listActivities() {
  const db = await getDatabase();
  const result = db.exec("SELECT id, title, category, description, activity_time, location, capacity, enrolled, deadline, organizer, icon, teacher_id FROM activities ORDER BY id");
  return (result[0]?.values ?? []).map(activityFromRow);
}
async function createActivity(input) {
  const db = await getDatabase();
  const id = Date.now();
  db.run(
    `INSERT INTO activities (id, title, category, description, activity_time, location, capacity, enrolled, deadline, organizer, icon, teacher_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)`,
    [id, input.title, input.category, input.desc, input.time, input.location, input.capacity, input.deadline, input.organizer, input.icon, input.teacherId ?? "admin"]
  );
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
  return { ...input, id, enrolled: 0 };
}
async function updateActivity(id, input) {
  const db = await getDatabase();
  const result = db.exec("SELECT enrolled FROM activities WHERE id = ? AND teacher_id = ?", [id, input.teacherId ?? ""]);
  const enrolled = Number(result[0]?.values[0]?.[0] ?? 0);
  if (!result[0]?.values[0]) throw new Error("无权修改该活动");
  if (input.capacity < enrolled) throw new Error(`人数上限不能少于当前报名人数 ${enrolled}`);
  db.run(
    `UPDATE activities SET title = ?, category = ?, description = ?, activity_time = ?, location = ?, capacity = ?, deadline = ?, organizer = ?, icon = ? WHERE id = ? AND teacher_id = ?`,
    [input.title, input.category, input.desc, input.time, input.location, input.capacity, input.deadline, input.organizer, input.icon, id, input.teacherId]
  );
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
  return { ...input, id, enrolled };
}
async function removeActivity(id) {
  const db = await getDatabase();
  db.run("DELETE FROM activity_registrations WHERE activity_id = ?", [id]);
  db.run("DELETE FROM activities WHERE id = ?", [id]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
}
async function listStudentRegistrations(account) {
  const db = await getDatabase();
  const result = db.exec("SELECT ar.activity_id FROM activity_registrations ar JOIN users u ON u.id = ar.student_id WHERE u.account = ?", [account.trim()]);
  return (result[0]?.values ?? []).map((row) => Number(row[0]));
}
async function registerForActivity(account, activityId) {
  const db = await getDatabase();
  const student = db.exec("SELECT id FROM users WHERE account = ? AND role = 'student'", [account.trim()])[0]?.values[0];
  if (!student) throw new Error("学生账号不存在");
  const activity = db.exec("SELECT capacity, enrolled FROM activities WHERE id = ?", [activityId])[0]?.values[0];
  if (!activity) throw new Error("活动不存在");
  if (Number(activity[1]) >= Number(activity[0])) throw new Error("活动名额已满");
  try {
    db.run("INSERT INTO activity_registrations (activity_id, student_id, registered_at) VALUES (?, ?, ?)", [activityId, Number(student[0]), (/* @__PURE__ */ new Date()).toISOString()]);
  } catch {
    throw new Error("你已经报名过该活动");
  }
  db.run("UPDATE activities SET enrolled = enrolled + 1 WHERE id = ?", [activityId]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
}
async function unregisterFromActivity(account, activityId) {
  const db = await getDatabase();
  db.run("DELETE FROM activity_registrations WHERE activity_id = ? AND student_id = (SELECT id FROM users WHERE account = ?)", [activityId, account.trim()]);
  db.run("UPDATE activities SET enrolled = MAX(0, enrolled - 1) WHERE id = ?", [activityId]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
}
async function listActivityRegistrants(activityId) {
  const db = await getDatabase();
  const result = db.exec(`SELECT u.id, u.account, u.name, COALESCE(u.email, ''), ar.registered_at
    FROM activity_registrations ar JOIN users u ON u.id = ar.student_id
    WHERE ar.activity_id = ? ORDER BY ar.registered_at DESC`, [activityId]);
  return (result[0]?.values ?? []).map(([id, account, name, email, registeredAt]) => ({ id: Number(id), account: String(account), name: String(name), email: String(email), registeredAt: String(registeredAt) }));
}
async function persistDatabase(db, databasePath, key) {
  const temporaryPath = `${databasePath}.tmp`;
  fs.writeFileSync(temporaryPath, encryptDatabase(db.export(), key), { mode: 384 });
  fs.renameSync(temporaryPath, databasePath);
}
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}
function publicUser(account, name, role) {
  return { id: account, name, role, avatar: name.charAt(0).toUpperCase() };
}
async function registerUser(input) {
  const db = await getDatabase();
  const account = input.account.trim();
  const name = input.name.trim();
  if (input.role !== "student") throw new Error("教师端不支持注册");
  if (!/^\d{16}$/.test(account)) throw new Error("学号必须是 16 位数字");
  if (input.password.length < 6) throw new Error("密码至少需要 6 位");
  if (!input.email || !/^\S+@qq\.com$/i.test(input.email.trim())) throw new Error("请填写有效的 QQ 邮箱");
  if (!account || !input.password || !name) throw new Error("请填写完整的账号、密码和姓名");
  if (account.toLowerCase() === ADMIN_ACCOUNT) throw new Error("该账号为教师专用账号");
  const verification = registrationCodes.get(account);
  if (!verification || verification.expiresAt < Date.now()) {
    registrationCodes.delete(account);
    throw new Error("请先获取注册验证码");
  }
  if (verification.email !== input.email.trim().toLowerCase()) throw new Error("验证码与注册邮箱不匹配");
  if (++verification.attempts > 5) {
    registrationCodes.delete(account);
    throw new Error("验证码错误次数过多，请重新获取");
  }
  const actualCode = hashPassword(input.verificationCode?.trim() ?? "", "register-code-salt");
  if (!crypto.timingSafeEqual(Buffer.from(actualCode), Buffer.from(verification.hash))) throw new Error("注册验证码错误");
  const salt = crypto.randomBytes(16).toString("hex");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  try {
    db.run(
      `INSERT INTO users (account, password_hash, password_salt, name, email, role, remember_me, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [account, hashPassword(input.password, salt), salt, name, input.email.trim().toLowerCase(), input.role, 0, now, now]
    );
  } catch {
    throw new Error("该账号已经注册过了");
  }
  registrationCodes.delete(account);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
  return publicUser(account, name, input.role);
}
async function getRegisteredStudentCount() {
  const db = await getDatabase();
  const result = db.exec("SELECT COUNT(*) FROM users WHERE role = 'student'");
  return Number(result[0]?.values[0]?.[0] ?? 0);
}
async function listStudents() {
  const db = await getDatabase();
  const result = db.exec("SELECT id, account, name, COALESCE(email, ''), created_at FROM users WHERE role = 'student' ORDER BY id DESC");
  return (result[0]?.values ?? []).map(([id, account, name, email, createdAt]) => ({
    id: Number(id),
    account: String(account),
    name: String(name),
    email: String(email),
    createdAt: String(createdAt)
  }));
}
async function updateStudent(id, input) {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (!name || !/^\S+@qq\.com$/i.test(email)) throw new Error("请填写有效的姓名和 QQ 邮箱");
  const db = await getDatabase();
  db.run("UPDATE users SET name = ?, email = ?, updated_at = ? WHERE id = ? AND role = 'student'", [name, email, (/* @__PURE__ */ new Date()).toISOString(), id]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
  return { id, name, email };
}
async function resetStudentPasswordByAdmin(id, newPassword) {
  if (newPassword.length < 6) throw new Error("新密码至少需要 6 位");
  const db = await getDatabase();
  const salt = crypto.randomBytes(16).toString("hex");
  db.run("UPDATE users SET password_hash = ?, password_salt = ?, updated_at = ? WHERE id = ? AND role = 'student'", [hashPassword(newPassword, salt), salt, (/* @__PURE__ */ new Date()).toISOString(), id]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
}
async function removeStudent(id) {
  const db = await getDatabase();
  db.run("DELETE FROM activity_registrations WHERE student_id = ?", [id]);
  db.run("DELETE FROM users WHERE id = ? AND role = 'student'", [id]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
}
function mailTransport() {
  const user = process.env.QQ_SMTP_USER || "3586621881@qq.com";
  const pass = process.env.QQ_SMTP_AUTH_CODE || "kmrtxynqdembcjji";
  return { user, transporter: nodemailer.createTransport({ host: "smtp.qq.com", port: 465, secure: true, auth: { user, pass } }) };
}
async function sendResetCode(account) {
  const db = await getDatabase();
  const result = db.exec("SELECT email FROM users WHERE account = ? AND role = 'student'", [account.trim()]);
  const email = result[0]?.values[0]?.[0];
  if (!email) throw new Error("该用户不存在或未绑定 QQ 邮箱");
  const code = String(crypto.randomInt(1e5, 1e6));
  const { user, transporter } = mailTransport();
  try {
    await transporter.sendMail({ from: user, to: String(email), subject: "CampusEvents 密码重置验证码", text: `你的验证码是 ${code}，5 分钟内有效。` });
  } catch {
    throw new Error("验证码发送失败，请稍后重试");
  }
  resetCodes.set(account.trim(), { hash: hashPassword(code, "reset-code-salt"), expiresAt: Date.now() + 5 * 60 * 1e3, attempts: 0 });
  return { maskedEmail: String(email).replace(/^(.{2}).*(@.*)$/, "$1****$2") };
}
async function resetStudentPassword(account, code, newPassword) {
  const key = account.trim();
  const entry = resetCodes.get(key);
  if (!entry || entry.expiresAt < Date.now()) {
    resetCodes.delete(key);
    throw new Error("验证码无效或已过期");
  }
  if (++entry.attempts > 5) {
    resetCodes.delete(key);
    throw new Error("验证码错误次数过多，请重新获取");
  }
  const actual = hashPassword(code, "reset-code-salt");
  if (!crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(entry.hash))) throw new Error("验证码错误");
  if (newPassword.length < 6) throw new Error("新密码至少需要 6 位");
  const db = await getDatabase();
  const salt = crypto.randomBytes(16).toString("hex");
  db.run("UPDATE users SET password_hash = ?, password_salt = ?, updated_at = ? WHERE account = ? AND role = 'student'", [hashPassword(newPassword, salt), salt, (/* @__PURE__ */ new Date()).toISOString(), key]);
  const { database: databasePath, key: keyPath } = getPaths();
  await persistDatabase(db, databasePath, getEncryptionKey(keyPath));
  resetCodes.delete(key);
}
async function sendRegistrationCode(account, email) {
  const normalizedAccount = account.trim();
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedAccount) throw new Error("请输入注册账号");
  if (!/^\S+@qq\.com$/i.test(normalizedEmail)) throw new Error("请填写有效的 QQ 邮箱");
  const db = await getDatabase();
  if (db.exec("SELECT 1 FROM users WHERE account = ?", [normalizedAccount])[0]?.values[0]) throw new Error("该账号已经注册过了");
  const code = String(crypto.randomInt(1e5, 1e6));
  const { user, transporter } = mailTransport();
  try {
    await transporter.sendMail({ from: user, to: normalizedEmail, subject: "CampusEvents 注册验证码", text: `你的注册验证码是 ${code}，5 分钟内有效。` });
  } catch {
    throw new Error("验证码发送失败，请稍后重试");
  }
  registrationCodes.set(normalizedAccount, { email: normalizedEmail, hash: hashPassword(code, "register-code-salt"), expiresAt: Date.now() + 5 * 60 * 1e3, attempts: 0 });
  return { maskedEmail: normalizedEmail.replace(/^(.{2}).*(@.*)$/, "$1****$2") };
}
async function loginUser(account, password, loginRole) {
  if (loginRole === "teacher") {
    const actual2 = hashPassword(password, ADMIN_SALT);
    if (account.trim() !== ADMIN_ACCOUNT || actual2.length !== ADMIN_HASH.length || !crypto.timingSafeEqual(Buffer.from(actual2), Buffer.from(ADMIN_HASH))) {
      throw new Error("账号或密码错误");
    }
    return publicUser(ADMIN_ACCOUNT, "admin", "teacher");
  }
  const db = await getDatabase();
  const result = db.exec("SELECT account, password_hash, password_salt, name, role FROM users WHERE account = ?", [account.trim()]);
  const row = result[0]?.values[0];
  if (!row) throw new Error("USER_NOT_FOUND");
  if (!row) throw new Error("账号或密码错误");
  const [storedAccount, storedHash, salt, name, userRole] = row.map(String);
  const actual = hashPassword(password, salt);
  if (actual.length !== storedHash.length || !crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(storedHash))) {
    throw new Error("账号或密码错误");
  }
  return publicUser(storedAccount, name, userRole);
}
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..", "..");
const VITE_DEV_SERVER_URL = process.env["ELECTRON_RENDERER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "out", "main");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "out", "renderer");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1232,
    height: 920,
    minWidth: 1232,
    minHeight: 920,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(process.env.APP_ROOT, "out", "preload", "preload.cjs")
    }
  });
  win.webContents.on("before-input-event", (event, input) => {
    if (input.type === "keyDown" && input.key === "F12") {
      event.preventDefault();
      win?.webContents.toggleDevTools();
    }
  });
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  ipcMain.handle("auth:register", (_event, input) => registerUser(input));
  ipcMain.handle("auth:send-registration-code", (_event, input) => sendRegistrationCode(input?.account ?? "", input?.email ?? ""));
  ipcMain.handle("activities:list", () => listActivities());
  ipcMain.handle("activities:create", (_event, input) => createActivity(input));
  ipcMain.handle("activities:update", (_event, input) => updateActivity(Number(input.id), input));
  ipcMain.handle("activities:registrations", (_event, input) => listStudentRegistrations(input.account));
  ipcMain.handle("activities:register", (_event, input) => registerForActivity(input.account, Number(input.activityId)));
  ipcMain.handle("activities:unregister", (_event, input) => unregisterFromActivity(input.account, Number(input.activityId)));
  ipcMain.handle("activities:registrants", (_event, id) => listActivityRegistrants(Number(id)));
  ipcMain.handle("activities:delete", (_event, id) => removeActivity(Number(id)));
  ipcMain.handle("students:list", () => listStudents());
  ipcMain.handle("students:update", (_event, input) => updateStudent(Number(input.id), input));
  ipcMain.handle("students:reset-password", (_event, input) => resetStudentPasswordByAdmin(Number(input.id), input.password));
  ipcMain.handle("students:delete", (_event, id) => removeStudent(Number(id)));
  ipcMain.handle("stats:public", async () => {
    try {
      return { registeredStudents: await getRegisteredStudentCount() };
    } catch {
      throw new Error("统计数据暂时不可用");
    }
  });
  ipcMain.handle("auth:send-reset-code", async (_event, input) => {
    try {
      return await sendResetCode(input?.account ?? "");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("不存在") || message.includes("未绑定")) throw new Error("该用户不存在或未绑定 QQ 邮箱");
      if (message.includes("QQ 邮箱服务")) throw new Error("尚未配置 QQ 邮箱服务，请联系管理员");
      throw new Error("验证码发送失败，请稍后重试");
    }
  });
  ipcMain.handle("auth:reset-password", async (_event, input) => {
    try {
      await resetStudentPassword(input?.account ?? "", input?.code ?? "", input?.newPassword ?? "");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("验证码无效")) throw new Error("验证码无效或已过期");
      if (message.includes("验证码错误次数")) throw new Error("验证码错误次数过多，请重新获取");
      if (message.includes("验证码错误")) throw new Error("验证码错误");
      if (message.includes("至少需要")) throw new Error("新密码至少需要 6 位");
      throw new Error("密码修改失败，请稍后重试");
    }
  });
  ipcMain.handle("auth:login", async (_event, input) => {
    try {
      return await loginUser(input.account, input.password, input.role);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message === "USER_NOT_FOUND") throw new Error("该用户不存在");
      if (message.includes("账号") || message.includes("密码") || message.includes("璐") || message.includes("鎴")) throw new Error("密码错误");
      throw new Error("数据库暂时不可用，请重启软件后重试");
    }
  });
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
