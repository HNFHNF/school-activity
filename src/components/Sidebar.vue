<script setup lang="ts">
import { useStore } from '../composables/useStore'
import type { ViewName } from '../types'

const { state, isTeacher, logout, switchView } = useStore()

const navItems: { view: ViewName; label: string; icon: string }[] = [
  { view: 'discover', label: '活动广场', icon: 'home' },
  { view: 'myActivities', label: '我的活动', icon: 'ticket' }
]

const teacherItems: { view: ViewName; label: string; icon: string }[] = [
  { view: 'publish', label: '发布活动', icon: 'plus' },
  { view: 'manage', label: '活动管理', icon: 'edit' },
  { view: 'students', label: '学生管理', icon: 'users' }
]

function iconSvg(name: string) {
  const icons: Record<string, string> = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    ticket: '<path d="M16 3.467a7.49 7.49 0 0 0-4.5 0"/><path d="M4 7.997A5.54 5.54 0 0 1 7.5 4.45a7.49 7.49 0 0 1 9 0A5.54 5.54 0 0 1 20 7.997"/><path d="M18.5 9.5v.5H19a4 4 0 0 1 4 4v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-7a4 4 0 0 1 4-4h.5v-.5"/><circle cx="12" cy="14" r="2"/>',
    plus: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  }
  return icons[name]
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-mark">C</div>
      <span>CampusEvents</span>
    </div>
    <nav>
      <ul class="nav-list">
        <li
          v-for="item in navItems"
          :key="item.view"
          class="nav-item"
          :class="{ active: state.currentView === item.view }"
          @click="switchView(item.view)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="iconSvg(item.icon)" />
          {{ state.currentUser?.role === 'teacher' && item.view === 'myActivities' ? '我的发布' : item.label }}
        </li>
        <li
          v-for="item in teacherItems"
          :key="item.view"
          v-if="isTeacher"
          class="nav-item"
          :class="{ active: state.currentView === item.view }"
          @click="switchView(item.view)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="iconSvg(item.icon)" />
          {{ item.label }}
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <div class="user-mini">
        <div class="user-avatar">{{ state.currentUser?.avatar }}</div>
        <div class="user-meta">
          <div class="name">{{ state.currentUser?.name }}</div>
          <div class="role">{{ state.currentUser?.role === 'teacher' ? '组织教师' : '学生' }}</div>
        </div>
      </div>
      <button class="btn btn-ghost" style="width:100%;margin-top:12px;justify-content:flex-start" @click="logout">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        退出登录
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  background: var(--bg-50);
  border-right: 1px solid var(--bg-300);
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  z-index: 50;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
  padding: 0 12px;
}

.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--brand-500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 0.9rem;
  color: var(--text-600);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-item:hover { background: var(--bg-200); color: var(--text-800); }

.nav-item.active {
  background: var(--brand-500);
  color: #fff;
  box-shadow: 0 4px 14px rgba(0, 122, 255, 0.28);
}

.nav-item svg { width: 20px; height: 20px; flex-shrink: 0; }

.sidebar-footer {
  padding: 16px 12px 0;
  border-top: 1px solid var(--bg-300);
}

.user-mini {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--brand-500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.user-meta { min-width: 0; }
.user-meta .name { font-weight: 700; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-meta .role { font-size: 0.78rem; color: var(--text-500); }

@media (max-width: 980px) {
  .sidebar { display: none; }
}
</style>
