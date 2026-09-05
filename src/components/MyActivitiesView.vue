<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../composables/useStore'
import ActivityCard from './ActivityCard.vue'
import type { Activity } from '../types'

const props = defineProps<{
  onShowDetail: (a: Activity) => void
}>()

const { myActivities, isTeacher, beginEditActivity } = useStore()

const title = computed(() => isTeacher.value ? '我的发布' : '我的活动')
const subtitle = computed(() => isTeacher.value ? '管理你创建和发布的所有活动' : '查看你已报名参加的活动')
const emptyIcon = computed(() => isTeacher.value ? '📝' : '🎫')
const emptyTitle = computed(() => isTeacher.value ? '还没有发布过活动' : '还没有报名任何活动')
const emptyDesc = computed(() => isTeacher.value ? '点击左侧"发布活动"开始创建第一个活动' : '去活动广场发现感兴趣的活动吧')
</script>

<template>
  <section class="view">
    <div class="topbar">
      <div>
        <h1>{{ title }}</h1>
        <p class="sub">{{ subtitle }}</p>
      </div>
    </div>

    <div class="activity-grid">
      <div v-for="activity in myActivities" :key="activity.id" class="activity-item">
        <ActivityCard :activity="activity" hide-registered @click="(a: Activity) => props.onShowDetail(a)" />
        <button v-if="isTeacher" class="edit-button" @click.stop="beginEditActivity(activity)">✎ 编辑活动</button>
      </div>
      <div v-if="myActivities.length === 0" class="empty-state" style="grid-column:1/-1">
        <div class="icon">{{ emptyIcon }}</div>
        <h3>{{ emptyTitle }}</h3>
        <p>{{ emptyDesc }}</p>
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
}

.topbar h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.sub { color: var(--text-500); font-size: 0.95rem; }

.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.activity-item { position:relative; min-width:0; }
.activity-item :deep(.activity-card .body) { padding-bottom:62px; }
.edit-button { position:absolute; right:14px; bottom:14px; z-index:2; border:1px solid var(--brand-200); border-radius:9px; background:rgba(255,255,255,.96); color:var(--brand-600); padding:6px 9px; font-size:.75rem; font-weight:700; cursor:pointer; box-shadow:var(--shadow-xs); }
.edit-button:hover { background:var(--brand-50); }

.empty-state {
  text-align: center;
  padding: 100px 20px;
  color: var(--text-500);
}

.empty-state .icon {
  width: 88px;
  height: 88px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: var(--bg-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
}

.empty-state h3 { color: var(--text-800); font-size: 1.2rem; margin-bottom: 8px; }

@media (max-width: 640px) {
  .activity-grid { grid-template-columns: 1fr; }
}
</style>
