<script setup lang="ts">
import { computed } from 'vue'
import { useStore, categories } from '../composables/useStore'
import { formatDate } from '../utils/format'
import type { Activity } from '../types'

const props = defineProps<{
  activity: Activity | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { state, isTeacher, register, unregister, deleteActivity } = useStore()

const cat = computed(() => {
  if (!props.activity) return { label: '', color: 'gray' }
  return categories[props.activity.category]
})

const isFull = computed(() => props.activity ? props.activity.enrolled >= props.activity.capacity : false)
const isRegistered = computed(() => props.activity ? state.registrations.includes(props.activity.id) : false)
const isMine = computed(() => {
  if (!isTeacher.value || !props.activity) return false
  return props.activity.teacherId === state.currentUser?.id
})

async function onRegister() {
  if (!props.activity) return
  if (await register(props.activity.id)) emit('close')
}

async function onUnregister() {
  if (!props.activity) return
  if (await unregister(props.activity.id)) emit('close')
}

function onDelete() {
  if (!props.activity) return
  if (confirm('确定要删除这个活动吗？')) {
    deleteActivity(props.activity.id)
    emit('close')
  }
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div class="modal-overlay" :class="{ open: activity }" @click="onOverlayClick">
    <div class="modal" v-if="activity">
      <div class="modal-header">
        <span style="font-size:4rem">{{ activity.icon }}</span>
        <button class="modal-close" @click="emit('close')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="meta-row">
          <span class="badge" :class="`badge-${cat.color}`">{{ cat.label }}</span>
          <span v-if="isFull" class="badge badge-red">名额已满</span>
          <span v-else class="badge badge-green">报名中</span>
          <span v-if="isRegistered" class="badge badge-green">已报名</span>
          <span v-if="isMine" class="badge badge-gray">我发布</span>
        </div>
        <h2>{{ activity.title }}</h2>
        <p class="desc">{{ activity.desc }}</p>
        <div class="info-grid">
          <div class="info-item"><div class="label-small">活动时间</div><div class="value">{{ formatDate(activity.time) }}</div></div>
          <div class="info-item"><div class="label-small">报名截止</div><div class="value">{{ formatDate(activity.deadline) }}</div></div>
          <div class="info-item"><div class="label-small">活动地点</div><div class="value">{{ activity.location }}</div></div>
          <div class="info-item"><div class="label-small">报名人数</div><div class="value">{{ activity.enrolled }} / {{ activity.capacity }}</div></div>
          <div class="info-item"><div class="label-small">主办方</div><div class="value">{{ activity.organizer }}</div></div>
          <div class="info-item"><div class="label-small">剩余名额</div><div class="value" :style="{ color: isFull ? 'var(--error)' : 'var(--success)' }">{{ isFull ? 0 : activity.capacity - activity.enrolled }}</div></div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="emit('close')">关闭</button>
          <template v-if="isTeacher">
            <button v-if="isMine" class="btn btn-danger" @click="onDelete">删除活动</button>
          </template>
          <template v-else>
            <button v-if="isRegistered" class="btn btn-danger" @click="onUnregister">取消报名</button>
            <button v-else-if="isFull" class="btn btn-primary" disabled style="opacity:0.6;cursor:not-allowed">名额已满</button>
            <button v-else class="btn btn-primary" @click="onRegister">立即报名</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.modal-overlay.open { opacity: 1; pointer-events: auto; }

.modal {
  background: var(--bg-50);
  border-radius: calc(var(--radius) + 6px);
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  transform: scale(0.96);
  transition: transform 0.25s ease;
}

.modal-overlay.open .modal { transform: scale(1); }

.modal-header {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, var(--bg-300) 0%, var(--bg-200) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-800);
  transition: background 0.2s ease;
}

.modal-close:hover { background: #fff; }

.modal-body { padding: 32px; overflow-y: auto; max-height: calc(90vh - 200px); }

.meta-row {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.modal-body h2 {
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.desc {
  color: var(--text-500);
  line-height: 1.65;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.info-item {
  background: var(--bg-100);
  border-radius: 0.9rem;
  padding: 16px;
}

.label-small {
  font-size: 0.78rem;
  color: var(--text-500);
  font-weight: 600;
  margin-bottom: 4px;
}

.value { font-weight: 700; color: var(--text-800); }

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 640px) {
  .info-grid { grid-template-columns: 1fr; }
  .modal { max-height: 95vh; }
}
</style>
