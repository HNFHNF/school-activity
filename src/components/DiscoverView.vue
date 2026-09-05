<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../composables/useStore'
import ActivityCard from './ActivityCard.vue'
import type { Activity, ActivityCategory } from '../types'

const props = defineProps<{
  onShowDetail: (a: Activity) => void
}>()

const { state, filteredActivities } = useStore()

const categoryList: { key: ActivityCategory | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'academic', label: '学术讲座' },
  { key: 'culture', label: '文化艺术' },
  { key: 'sports', label: '体育运动' },
  { key: 'volunteer', label: '志愿服务' },
  { key: 'club', label: '社团活动' }
]

const featured = computed(() => state.activities[0])
</script>

<template>
  <section class="view">
    <div class="topbar">
      <div>
        <h1>活动广场</h1>
        <p class="sub">发现本学期最值得参与的校园活动</p>
      </div>
      <div class="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" v-model="state.searchQuery" placeholder="搜索活动名称、地点..." />
      </div>
    </div>

    <div class="hero-banner">
      <div class="hero-content">
        <span class="eyebrow">本周精选</span>
        <h2>{{ featured.title }}</h2>
        <p>{{ featured.desc }}</p>
        <button class="btn btn-secondary" @click="props.onShowDetail(featured)">了解详情</button>
      </div>
    </div>

    <div class="filter-row">
      <button
        v-for="cat in categoryList"
        :key="cat.key"
        class="chip"
        :class="{ active: state.activeCategory === cat.key }"
        @click="state.activeCategory = cat.key"
      >{{ cat.label }}</button>
    </div>

    <div class="section-header">
      <h2>最新活动</h2>
      <p>共 {{ filteredActivities.length }} 个活动</p>
    </div>

    <div class="activity-grid">
      <ActivityCard
        v-for="activity in filteredActivities"
        :key="activity.id"
        :activity="activity"
        @click="(a: Activity) => props.onShowDetail(a)"
      />
      <div v-if="filteredActivities.length === 0" class="empty-state" style="grid-column:1/-1">
        <div class="icon">🔍</div>
        <h3>暂无匹配活动</h3>
        <p>换个关键词或类别试试看</p>
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

.search-bar {
  position: relative;
  width: 320px;
}

.search-bar input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid var(--bg-400);
  border-radius: 9999px;
  background: var(--bg-50);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-bar input:focus {
  border-color: var(--brand-500);
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}

.search-bar svg {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-400);
}

.hero-banner {
  position: relative;
  border-radius: calc(var(--radius) + 4px);
  padding: 48px;
  color: #fff;
  overflow: hidden;
  margin-bottom: 36px;
  background: linear-gradient(115deg, #00275a 0%, #004fad 45%, #007aff 100%);
}

.hero-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(255,255,255,0.14) 0%, transparent 35%),
    radial-gradient(circle at 90% 80%, rgba(255,255,255,0.08) 0%, transparent 40%);
}

.hero-content { position: relative; z-index: 1; max-width: 560px; }

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 14px;
}

.hero-banner h2 {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
}

.hero-banner p {
  font-size: 1.05rem;
  opacity: 0.85;
  margin-bottom: 28px;
  max-width: 460px;
}

.filter-row {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid var(--bg-300);
  background: var(--bg-50);
  color: var(--text-600);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover { border-color: var(--brand-300); color: var(--brand-600); }
.chip.active { background: var(--brand-500); color: #fff; border-color: var(--brand-500); }

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-header p { color: var(--text-500); font-size: 0.95rem; }

.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
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
  .topbar { flex-direction: column; align-items: stretch; gap: 16px; }
  .search-bar { width: 100%; }
}

@media (max-width: 640px) {
  .activity-grid { grid-template-columns: 1fr; }
  .hero-banner { padding: 32px 24px; }
  .hero-banner h2 { font-size: 1.8rem; }
}
</style>
