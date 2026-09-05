import { reactive, computed, ref } from 'vue'
import type { User, Activity, ActivityCategory, ViewName } from '../types'

export const categories: Record<ActivityCategory, { label: string; color: string }> = {
  academic: { label: '学术讲座', color: 'blue' },
  culture: { label: '文化艺术', color: 'badge' },
  sports: { label: '体育运动', color: 'green' },
  volunteer: { label: '志愿服务', color: 'green' },
  club: { label: '社团活动', color: 'gray' }
}

const state = reactive({
  currentUser: null as User | null,
  activities: [] as Activity[],
  registrations: [] as number[],
  currentView: 'discover' as ViewName,
  activeCategory: 'all' as ActivityCategory | 'all',
  searchQuery: '',
  editingActivity: null as Activity | null
})

const toast = ref('')
let toastTimer: number | undefined

export function useStore() {
  const isLoggedIn = computed(() => state.currentUser !== null)
  const isTeacher = computed(() => state.currentUser?.role === 'teacher')

  async function loadActivities() {
    const activities = await window.ipcRenderer.invoke('activities:list') as Activity[]
    state.activities = Array.isArray(activities) ? activities : []
  }

  const filteredActivities = computed(() => {
    return state.activities.filter(a => {
      const matchCat = state.activeCategory === 'all' || a.category === state.activeCategory
      const q = state.searchQuery.toLowerCase()
      const matchSearch = !q ||
        a.title.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        categories[a.category].label.includes(q)
      return matchCat && matchSearch
    })
  })

  const myActivities = computed(() => {
    if (!state.currentUser) return []
    if (state.currentUser.role === 'student') {
      return state.activities.filter(a => state.registrations.includes(a.id))
    }
    return state.activities.filter(a => a.teacherId === state.currentUser!.id)
  })

  const teacherActivities = computed(() => {
    if (!state.currentUser || state.currentUser.role !== 'teacher') return []
    return state.activities.filter(a => a.teacherId === state.currentUser!.id)
  })

  async function login(user: User) {
    state.currentUser = user
    state.registrations = user.role === 'student'
      ? await window.ipcRenderer.invoke('activities:registrations', { account: user.id }) as number[]
      : []
    state.currentView = 'discover'
  }

  function logout() {
    state.currentUser = null
    state.registrations = []
    state.currentView = 'discover'
    state.activeCategory = 'all'
    state.searchQuery = ''
  }

  function switchView(view: ViewName) {
    state.currentView = view
  }

  function activityStartTime(time: string) {
    const parsed = new Date(time.includes('T') ? time : time.replace(' ', 'T')).getTime()
    return Number.isNaN(parsed) ? null : parsed
  }

  async function register(id: number) {
    const act = state.activities.find(a => a.id === id)
    if (!act || state.registrations.includes(id) || act.enrolled >= act.capacity) return false

    if (state.currentUser?.role === 'student') {
      const targetStart = activityStartTime(act.time)
      const conflict = targetStart === null ? undefined : state.activities.find(registered => {
        if (!state.registrations.includes(registered.id)) return false
        const registeredStart = activityStartTime(registered.time)
        return registeredStart !== null && Math.abs(registeredStart - targetStart) < 2 * 60 * 60 * 1000
      })
      if (conflict) {
        showToast(`报名失败：与“${conflict.title}”开始时间相差不足 2 小时`)
        return false
      }
    }

    try {
      await window.ipcRenderer.invoke('activities:register', { account: state.currentUser?.id, activityId: id })
    } catch (error) {
      showToast(error instanceof Error ? error.message : '报名失败，请稍后重试')
      return false
    }
    state.registrations.push(id)
    act.enrolled++
    showToast('报名成功！')
    return true
  }

  async function unregister(id: number) {
    const idx = state.registrations.indexOf(id)
    if (idx === -1) return false
    const act = state.activities.find(a => a.id === id)
    try {
      await window.ipcRenderer.invoke('activities:unregister', { account: state.currentUser?.id, activityId: id })
    } catch (error) {
      showToast(error instanceof Error ? error.message : '取消报名失败，请稍后重试')
      return false
    }
    if (act) act.enrolled = Math.max(0, act.enrolled - 1)
    state.registrations.splice(idx, 1)
    showToast('已取消报名')
    return true
  }

  async function publishActivity(activity: Omit<Activity, 'id' | 'enrolled'>) {
    const newActivity = await window.ipcRenderer.invoke('activities:create', activity) as Activity
    state.activities.unshift(newActivity)
    showToast('活动发布成功')
    return newActivity
  }

  async function updateActivity(activity: Activity) {
    const updated = await window.ipcRenderer.invoke('activities:update', activity) as Activity
    const index = state.activities.findIndex(item => item.id === updated.id)
    if (index >= 0) state.activities[index] = updated
    state.editingActivity = null
    showToast('活动信息已更新')
    return updated
  }

  function beginEditActivity(activity: Activity) {
    state.editingActivity = { ...activity }
    state.currentView = 'publish'
  }

  function cancelEditActivity() {
    state.editingActivity = null
  }

  async function deleteActivity(id: number) {
    await window.ipcRenderer.invoke('activities:delete', id)
    state.activities = state.activities.filter(a => a.id !== id)
    state.registrations = state.registrations.filter(rid => rid !== id)
    showToast('活动已删除')
  }

  function showToast(msg: string) {
    toast.value = msg
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => { toast.value = '' }, 2600)
  }

  return {
    state,
    toast,
    isLoggedIn,
    isTeacher,
    loadActivities,
    filteredActivities,
    myActivities,
    teacherActivities,
    login,
    logout,
    switchView,
    register,
    unregister,
    publishActivity,
    updateActivity,
    beginEditActivity,
    cancelEditActivity,
    deleteActivity,
    showToast
  }
}
