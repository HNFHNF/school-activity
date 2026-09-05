<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from './composables/useStore'
import AuthScreen from './components/AuthScreen.vue'
import Sidebar from './components/Sidebar.vue'
import DiscoverView from './components/DiscoverView.vue'
import MyActivitiesView from './components/MyActivitiesView.vue'
import PublishView from './components/PublishView.vue'
import ManageView from './components/ManageView.vue'
import StudentManageView from './components/StudentManageView.vue'
import ActivityDetail from './components/ActivityDetail.vue'
import type { Activity } from './types'

const { state, isLoggedIn, toast } = useStore()
const selectedActivity = ref<Activity | null>(null)

function showDetail(activity: Activity) {
  selectedActivity.value = activity
}

function closeDetail() {
  selectedActivity.value = null
}
</script>

<template>
  <AuthScreen v-if="!isLoggedIn" />
  <div v-else class="app-shell">
    <Sidebar />
    <main class="main-content">
      <DiscoverView v-if="state.currentView === 'discover'" :on-show-detail="showDetail" />
      <MyActivitiesView v-else-if="state.currentView === 'myActivities'" :on-show-detail="showDetail" />
      <PublishView v-else-if="state.currentView === 'publish'" />
      <ManageView v-else-if="state.currentView === 'manage'" :on-show-detail="showDetail" />
      <StudentManageView v-else-if="state.currentView === 'students'" />
    </main>
    <ActivityDetail :activity="selectedActivity" @close="closeDetail" />
    <div class="toast" :class="{ show: toast }">{{ toast }}</div>
  </div>
</template>
