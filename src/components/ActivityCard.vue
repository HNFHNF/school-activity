<script setup lang="ts">
import { computed } from 'vue'
import { useStore, categories } from '../composables/useStore'
import { getMonthDay } from '../utils/format'
import type { Activity } from '../types'

const props = defineProps<{
  activity: Activity
  hideRegistered?: boolean
}>()

const emit = defineEmits<{
  click: [activity: Activity]
}>()

const { state, isTeacher } = useStore()
const cat = categories[props.activity.category]

const date = computed(() => getMonthDay(props.activity.time))
const isFull = computed(() => props.activity.enrolled >= props.activity.capacity)
const isRegistered = computed(() => state.registrations.includes(props.activity.id))
const isMine = computed(() => isTeacher.value && props.activity.teacherId === state.currentUser?.id)
</script>

<template>
  <article class="card activity-card" @click="emit('click', activity)">
    <div class="cover">
      <div class="date-chip">{{ date.month }}月<br />{{ date.day }}日</div>
      <span>{{ activity.icon }}</span>
    </div>
    <div class="body">
      <div class="meta">
        <span class="badge" :class="`badge-${cat.color}`">{{ cat.label }}</span>
        <span v-if="isFull" class="badge badge-red">已满员</span>
        <span v-if="isRegistered && !hideRegistered" class="badge badge-green">已报名</span>
        <span v-if="isMine" class="badge badge-gray">我发布</span>
      </div>
      <h3>{{ activity.title }}</h3>
      <p class="desc">{{ activity.desc }}</p>
      <div class="footer">
        <span class="spots">
          <span class="dot" :style="{ background: isFull ? 'var(--error)' : 'var(--success)' }"></span>
          {{ activity.enrolled }}/{{ activity.capacity }} 人已报名
        </span>
        <span class="location">{{ activity.location }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.activity-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.cover {
  height: 160px;
  background: linear-gradient(135deg, var(--bg-300) 0%, var(--bg-200) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
}

.date-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  color: var(--text-800);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
  box-shadow: var(--shadow-xs);
}

.body { padding: 22px; flex: 1; display: flex; flex-direction: column; }

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

h3 {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  line-height: 1.3;
}

.desc {
  font-size: 0.9rem;
  color: var(--text-500);
  margin-bottom: 18px;
  line-height: 1.55;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--bg-200);
}

.spots {
  font-size: 0.85rem;
  color: var(--text-500);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.location {
  font-size: 0.85rem;
  color: var(--text-500);
}
</style>
