export type UserRole = 'student' | 'teacher'

export interface User {
  id: string
  name: string
  role: UserRole
  avatar: string
}

export interface StudentRecord {
  id: number
  account: string
  name: string
  email: string
  createdAt: string
}

export interface ActivityRegistrant {
  id: number
  account: string
  name: string
  email: string
  registeredAt: string
}

export type ActivityCategory = 'academic' | 'culture' | 'sports' | 'volunteer' | 'club'

export interface Activity {
  id: number
  title: string
  category: ActivityCategory
  desc: string
  time: string
  location: string
  capacity: number
  enrolled: number
  deadline: string
  organizer: string
  icon: string
  teacherId: string | null
}

export type ViewName = 'discover' | 'myActivities' | 'publish' | 'manage' | 'students'
