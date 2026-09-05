<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore, categories } from '../composables/useStore'
import { formatDate } from '../utils/format'
import type { Activity, ActivityRegistrant } from '../types'

const props = defineProps<{
  onShowDetail: (a: Activity) => void
}>()

const { teacherActivities, deleteActivity, switchView } = useStore()
const registrants = ref<ActivityRegistrant[]>([])
const registrantsActivity = ref<Activity | null>(null)
const loadingRegistrants = ref(false)

const stats = computed(() => {
  const acts = teacherActivities.value
  const totalCapacity = acts.reduce((s, a) => s + a.capacity, 0)
  const totalEnrolled = acts.reduce((s, a) => s + a.enrolled, 0)
  return {
    count: acts.length,
    capacity: totalCapacity,
    enrolled: totalEnrolled,
    full: acts.filter(a => a.enrolled >= a.capacity).length
  }
})

async function onDelete(id: number) {
  if (confirm('确定要删除这个活动吗？此操作不可撤销。')) {
    await deleteActivity(id)
  }
}

async function viewRegistrants(activity: Activity) {
  registrantsActivity.value = activity
  loadingRegistrants.value = true
  try {
    registrants.value = await window.ipcRenderer.invoke('activities:registrants', activity.id) as ActivityRegistrant[]
  } finally {
    loadingRegistrants.value = false
  }
}

function closeRegistrants() {
  registrantsActivity.value = null
  registrants.value = []
}
</script>

<template>
  <section class="view">
    <div class="topbar">
      <div>
        <h1>活动管理</h1>
        <p class="sub">查看、编辑和删除你发布的活动</p>
      </div>
      <button class="btn btn-primary" @click="switchView('publish')">+ 发布新活动</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-label">已发布活动</div>
        <div class="stat-value">{{ stats.count }}</div>
      </div>
      <div class="stat-card card">
        <div class="stat-label">总名额</div>
        <div class="stat-value">{{ stats.capacity }}</div>
      </div>
      <div class="stat-card card">
        <div class="stat-label">已报名人数</div>
        <div class="stat-value">{{ stats.enrolled }}</div>
      </div>
      <div class="stat-card card">
        <div class="stat-label">已满员活动</div>
        <div class="stat-value">{{ stats.full }}</div>
      </div>
    </div>

    <div class="table-card card">
      <table class="activity-table">
        <thead>
          <tr>
            <th>活动</th>
            <th>时间</th>
            <th>地点</th>
            <th>报名情况</th>
            <th>状态</th>
            <th style="width:120px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in teacherActivities" :key="activity.id">
            <td>
              <div class="activity-name">
                <span class="activity-icon">{{ activity.icon }}</span>
                <div>
                  <div class="title">{{ activity.title }}</div>
                  <div class="meta">{{ categories[activity.category].label }} · {{ activity.organizer }}</div>
                </div>
              </div>
            </td>
            <td>{{ formatDate(activity.time) }}</td>
            <td>{{ activity.location }}</td>
            <td><button class="enrollment-link" @click="viewRegistrants(activity)">{{ activity.enrolled }} / {{ activity.capacity }}</button></td>
            <td>
              <span v-if="activity.enrolled >= activity.capacity" class="badge badge-red">已满员</span>
              <span v-else class="badge badge-green">报名中</span>
            </td>
            <td>
              <div class="row-actions">
                <button class="btn btn-ghost" style="padding:8px 12px" @click="props.onShowDetail(activity)">查看</button>
                <button class="btn btn-danger" style="padding:8px 12px" @click="onDelete(activity.id)">删除</button>
              </div>
            </td>
          </tr>
          <tr v-if="teacherActivities.length === 0">
            <td colspan="6" class="empty-cell">
              <div class="empty-state">
                <div class="icon">📝</div>
                <h3>还没有发布过活动</h3>
                <p>点击右上角按钮发布第一个活动</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="registrantsActivity" class="registrants-overlay" @click.self="closeRegistrants">
      <div class="registrants-modal card">
        <div class="registrants-head"><div><h2>报名学生</h2><p>{{ registrantsActivity.title }}</p></div><button class="btn btn-ghost" @click="closeRegistrants">关闭</button></div>
        <div v-if="loadingRegistrants" class="registrants-empty">加载中...</div>
        <div v-else-if="registrants.length === 0" class="registrants-empty">暂无报名学生</div>
        <table v-else class="registrants-table"><thead><tr><th>姓名</th><th>账号</th><th>QQ 邮箱</th><th>报名时间</th></tr></thead><tbody><tr v-for="student in registrants" :key="`${student.id}-${student.registeredAt}`"><td>{{ student.name }}</td><td>{{ student.account }}</td><td>{{ student.email }}</td><td>{{ formatDate(student.registeredAt) }}</td></tr></tbody></table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.view { animation: fadeIn 0.35s ease; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}

.topbar h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.sub { color: var(--text-500); font-size: 0.95rem; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 24px;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-500);
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-800);
}

.table-card {
  padding: 8px;
  overflow-x: auto;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.activity-table th {
  text-align: left;
  padding: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--bg-200);
}

.activity-table td {
  padding: 16px;
  border-bottom: 1px solid var(--bg-200);
  color: var(--text-700);
}

.activity-table tbody tr:last-child td { border-bottom: none; }

.activity-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.activity-name .title {
  font-weight: 700;
  color: var(--text-800);
  margin-bottom: 2px;
}

.activity-name .meta {
  font-size: 0.8rem;
  color: var(--text-500);
}

.row-actions {
  display: flex;
  gap: 8px;
}
.enrollment-link { border:0; background:transparent; color:var(--brand-600); font-weight:700; cursor:pointer; padding:0; font-size:.95rem; text-decoration:underline; text-underline-offset:3px; }
.registrants-overlay { position:fixed; inset:0; z-index:120; display:flex; align-items:center; justify-content:center; padding:24px; background:rgba(15,27,48,.48); backdrop-filter:blur(4px); }
.registrants-modal { width:min(760px,100%); max-height:80vh; overflow:auto; padding:26px; box-shadow:var(--shadow-2xl); }
.registrants-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:22px; }.registrants-head h2 { font-size:1.35rem; }.registrants-head p { margin-top:5px; color:var(--text-500); font-size:.86rem; }.registrants-empty { padding:50px 0; text-align:center; color:var(--text-500); }.registrants-table { width:100%; border-collapse:collapse; font-size:.9rem; }.registrants-table th,.registrants-table td { padding:13px 10px; text-align:left; border-bottom:1px solid var(--bg-200); }.registrants-table th { color:var(--text-500); font-size:.76rem; text-transform:uppercase; }

.empty-cell {
  padding: 60px 20px;
}

.empty-state {
  text-align: center;
  color: var(--text-500);
}

.empty-state .icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: var(--bg-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
}

.empty-state h3 { color: var(--text-800); font-size: 1.2rem; margin-bottom: 8px; }

@media (max-width: 980px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
  .activity-table th, .activity-table td { padding: 12px; }
}
</style>
