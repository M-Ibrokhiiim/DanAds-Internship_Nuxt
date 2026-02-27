<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">Schedule</h1>
      </div>
      <div class="flex items-center gap-3">
        <button @click="prevWeek" class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-50 transition-all text-sm">←</button>
        <div class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700">
          {{ weekLabel }}
        </div>
        <button @click="nextWeek" class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-50 transition-all text-sm">→</button>
        <button @click="goToToday" class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer hover:bg-indigo-600 transition-all">Today</button>
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="v in ['week', 'day']"
            :key="v"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all capitalize"
            :class="viewMode === v ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400'"
            @click="viewMode = v"
          >{{ v }}</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-slate-100">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" :style="{ background: kpi.bg }">{{ kpi.icon }}</div>
        <div class="flex-1">
          <span class="block text-2xl font-bold leading-tight">{{ kpi.value }}</span>
          <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-5" style="grid-template-columns: 1fr 300px;">

      <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden">

        <div v-if="viewMode === 'week'">
          <div class="grid border-b border-slate-100" style="grid-template-columns: 64px repeat(6, 1fr);">
            <div class="py-3 border-r border-slate-100"></div>
            <div
              v-for="day in weekDays"
              :key="day.key"
              class="py-3 px-2 text-center border-r border-slate-100 last:border-r-0"
              :class="day.isToday ? 'bg-indigo-50' : ''"
            >
              <p class="text-[0.65rem] font-bold uppercase tracking-wider" :class="day.isToday ? 'text-indigo-500' : 'text-slate-400'">{{ day.name }}</p>
              <p class="text-lg font-black mt-0.5" :class="day.isToday ? 'text-indigo-600' : 'text-slate-700'">{{ day.date }}</p>
              <div v-if="day.isToday" class="w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto mt-1"></div>
            </div>
          </div>

          <div class="overflow-y-auto" style="max-height: 520px;">
            <div
              v-for="hour in hours"
              :key="hour"
              class="grid border-b border-slate-50 last:border-none"
              style="grid-template-columns: 64px repeat(6, 1fr); min-height: 72px;"
            >
              <div class="px-3 py-2 text-right border-r border-slate-100 shrink-0">
                <span class="text-[0.65rem] text-slate-400 font-medium">{{ formatHour(hour) }}</span>
              </div>
              <div
                v-for="day in weekDays"
                :key="day.key"
                class="border-r border-slate-50 last:border-r-0 relative p-1"
                :class="day.isToday ? 'bg-indigo-50/30' : ''"
              >
                <div
                  v-for="lesson in getLessonsAt(day.key, hour)"
                  :key="lesson.id"
                  class="rounded-xl p-2 mb-1 cursor-pointer hover:opacity-90 transition-all"
                  :style="{ background: lesson.color + '18', borderLeft: '3px solid ' + lesson.color }"
                  @click="selectedLesson = lesson"
                >
                  <p class="text-[0.65rem] font-black leading-tight truncate" :style="{ color: lesson.color }">{{ lesson.subject }}</p>
                  <p class="text-[0.58rem] text-slate-400 mt-0.5 truncate">{{ lesson.teacher }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 class="font-bold text-sm">{{ todayLabel }}</h2>
            <span class="text-xs text-slate-400">{{ todayLessons.length }} classes today</span>
          </div>
          <div class="p-5 flex flex-col gap-3">
            <div
              v-for="lesson in todayLessons"
              :key="lesson.id"
              class="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all"
              :class="isCurrentLesson(lesson) ? 'border-indigo-200 bg-indigo-50' : 'border-slate-100'"
              @click="selectedLesson = lesson"
            >
              <div class="text-center w-14 shrink-0">
                <p class="text-xs font-black" :style="{ color: lesson.color }">{{ lesson.startTime }}</p>
                <div class="w-0.5 h-4 mx-auto my-0.5" :style="{ background: lesson.color + '60' }"></div>
                <p class="text-xs text-slate-400">{{ lesson.endTime }}</p>
              </div>
              <div class="w-1 self-stretch rounded-full shrink-0" :style="{ background: lesson.color }"></div>
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                :style="{ background: lesson.color + '18' }"
              >{{ lesson.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-sm">{{ lesson.subject }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ lesson.teacher }} · {{ lesson.room }}</p>
              </div>
              <div class="text-right shrink-0">
                <span
                  v-if="isCurrentLesson(lesson)"
                  class="bg-indigo-500 text-white text-[0.65rem] font-black px-2.5 py-1 rounded-full"
                >Live Now</span>
                <span
                  v-else-if="isUpcomingLesson(lesson)"
                  class="bg-amber-100 text-amber-700 text-[0.65rem] font-bold px-2.5 py-1 rounded-full"
                >Upcoming</span>
                <span
                  v-else
                  class="bg-slate-100 text-slate-400 text-[0.65rem] font-bold px-2.5 py-1 rounded-full"
                >Done</span>
              </div>
            </div>
            <div v-if="todayLessons.length === 0" class="flex flex-col items-center py-12 text-center">
              <span class="text-4xl mb-3">🎉</span>
              <p class="font-bold text-slate-600">No classes today!</p>
              <p class="text-xs text-slate-400 mt-1">Enjoy your free day.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-5">

        <div v-if="selectedLesson" class="bg-white rounded-2xl border overflow-hidden" :style="{ borderColor: selectedLesson.color + '40' }">
          <div class="h-1.5" :style="{ background: selectedLesson.color }"></div>
          <div class="p-5">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" :style="{ background: selectedLesson.color + '18' }">{{ selectedLesson.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-sm leading-snug">{{ selectedLesson.subject }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ selectedLesson.teacher }}</p>
              </div>
              <button class="text-slate-300 text-xs border-none bg-transparent cursor-pointer" @click="selectedLesson = null">✕</button>
            </div>
            <div class="flex flex-col gap-2.5 text-xs">
              <div class="flex items-center gap-2.5 text-slate-600">
                <span class="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">⏰</span>
                {{ selectedLesson.startTime }} – {{ selectedLesson.endTime }}
              </div>
              <div class="flex items-center gap-2.5 text-slate-600">
                <span class="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">📍</span>
                {{ selectedLesson.room }}
              </div>
              <div class="flex items-center gap-2.5 text-slate-600">
                <span class="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">📚</span>
                {{ selectedLesson.topic }}
              </div>
              <div class="flex items-center gap-2.5 text-slate-600">
                <span class="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">👥</span>
                {{ selectedLesson.students }} students
              </div>
            </div>
            <div v-if="selectedLesson.homework" class="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
              <p class="text-[0.68rem] font-bold text-amber-700 mb-0.5">📝 Homework</p>
              <p class="text-[0.65rem] text-amber-600">{{ selectedLesson.homework }}</p>
            </div>
            <div class="flex gap-2 mt-4">
              <button class="flex-1 py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer hover:opacity-90 transition-all" :style="{ background: selectedLesson.color }">Join Class</button>
              <button class="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border-none cursor-pointer hover:bg-slate-200 transition-all">Materials</button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Upcoming Classes</h2>
          <div class="flex flex-col gap-3">
            <div
              v-for="lesson in upcomingClasses"
              :key="lesson.id"
              class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-2 -mx-2 transition-all"
              @click="selectedLesson = lesson"
            >
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" :style="{ background: lesson.color + '18' }">{{ lesson.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold truncate">{{ lesson.subject }}</p>
                <p class="text-[0.65rem] text-slate-400">{{ lesson.dayLabel }} · {{ lesson.startTime }}</p>
              </div>
              <div class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ background: lesson.color }"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Weekly Load</h2>
          <div class="flex flex-col gap-2.5">
            <div v-for="day in weekDays" :key="day.key" class="flex items-center gap-3">
              <span class="text-[0.65rem] font-bold text-slate-400 w-8">{{ day.name }}</span>
              <div class="flex-1 h-5 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  class="h-full rounded-lg flex items-center px-2 transition-all duration-700"
                  :style="{
                    width: (getDayLessons(day.key).length / 3 * 100) + '%',
                    background: day.isToday ? '#6366f1' : '#94a3b8'
                  }"
                >
                  <span v-if="getDayLessons(day.key).length > 0" class="text-white text-[0.55rem] font-black">{{ getDayLessons(day.key).length }}</span>
                </div>
              </div>
              <span class="text-[0.65rem] text-slate-400 w-12 text-right">{{ getDayLessons(day.key).length }} class{{ getDayLessons(day.key).length !== 1 ? 'es' : '' }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-3">Course Legend</h2>
          <div class="flex flex-col gap-2">
            <div v-for="c in courseLegend" :key="c.name" class="flex items-center gap-2.5">
              <div class="w-3 h-3 rounded-sm shrink-0" :style="{ background: c.color }"></div>
              <span class="text-xs text-slate-600">{{ c.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode      = ref('week')
const selectedLesson = ref(null)
const weekOffset    = ref(0)

const today = new Date()

const hours = Array.from({ length: 10 }, (_, i) => i + 8)

function formatHour(h) {
  return `${String(h).padStart(2, '0')}:00`
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const weekDays = computed(() => {
  const base = new Date(today)
  const dow  = base.getDay() === 0 ? 6 : base.getDay() - 1
  base.setDate(base.getDate() - dow + weekOffset.value * 6)

  return dayNames.map((name, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const isToday = key === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return { name, date: d.getDate(), key, isToday }
  })
})

const weekLabel = computed(() => {
  if (!weekDays.value.length) return ''
  const first = weekDays.value[0]
  const last  = weekDays.value[5]
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const d0 = new Date(first.key)
  const d1 = new Date(last.key)
  return `${months[d0.getMonth()]} ${first.date} – ${months[d1.getMonth()]} ${last.date}, ${d1.getFullYear()}`
})

const todayKey = computed(() => {
  const d = today
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const todayLabel = computed(() => {
  return today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})

function prevWeek() { weekOffset.value-- }
function nextWeek() { weekOffset.value++ }
function goToToday() { weekOffset.value = 0 }

const lessons = ref([
  { id: 1,  dayKey: 'mon', hour: 10, subject: 'Full-Stack Dev',  teacher: 'Amir Karimov',     icon: '🚀', color: '#6366f1', startTime: '10:00', endTime: '12:00', room: 'Room 204', topic: 'REST API Design & JWT Auth', students: 28, homework: 'Build a protected API endpoint with JWT middleware.' },
  { id: 2,  dayKey: 'mon', hour: 14, subject: 'Data Science',    teacher: 'Nodira Yusupova',  icon: '📊', color: '#0ea5e9', startTime: '14:00', endTime: '16:00', room: 'Lab 101',  topic: 'Pandas DataFrames Deep Dive', students: 22, homework: 'Complete EDA on the provided housing dataset.' },
  { id: 3,  dayKey: 'tue', hour: 10, subject: 'Full-Stack Dev',  teacher: 'Amir Karimov',     icon: '🚀', color: '#6366f1', startTime: '10:00', endTime: '12:00', room: 'Room 204', topic: 'PostgreSQL & Prisma ORM',      students: 28, homework: null },
  { id: 4,  dayKey: 'wed', hour: 9,  subject: 'UI/UX Design',    teacher: 'Malika Rahimova',  icon: '🎨', color: '#f59e0b', startTime: '09:00', endTime: '11:00', room: 'Room 301', topic: 'Design Systems & Tokens',      students: 25, homework: 'Create a color token system in Figma.' },
  { id: 5,  dayKey: 'wed', hour: 13, subject: 'Data Science',    teacher: 'Nodira Yusupova',  icon: '📊', color: '#0ea5e9', startTime: '13:00', endTime: '15:00', room: 'Lab 101',  topic: 'Matplotlib & Seaborn',         students: 22, homework: null },
  { id: 6,  dayKey: 'thu', hour: 10, subject: 'Full-Stack Dev',  teacher: 'Amir Karimov',     icon: '🚀', color: '#6366f1', startTime: '10:00', endTime: '12:00', room: 'Room 204', topic: 'React Query & Data Fetching',  students: 28, homework: 'Integrate React Query in the existing project.' },
  { id: 7,  dayKey: 'thu', hour: 15, subject: 'DevOps',          teacher: 'Dilnoza Ergasheva',icon: '☁️', color: '#8b5cf6', startTime: '15:00', endTime: '17:00', room: 'Lab 202',  topic: 'Docker & Containerization',   students: 21, homework: 'Containerize a Node.js app with Docker.' },
  { id: 8,  dayKey: 'fri', hour: 9,  subject: 'Data Science',    teacher: 'Nodira Yusupova',  icon: '📊', color: '#0ea5e9', startTime: '09:00', endTime: '11:00', room: 'Lab 101',  topic: 'Statistics & Probability',    students: 22, homework: null },
  { id: 9,  dayKey: 'fri', hour: 13, subject: 'UI/UX Design',    teacher: 'Malika Rahimova',  icon: '🎨', color: '#f59e0b', startTime: '13:00', endTime: '15:00', room: 'Room 301', topic: 'Usability Testing Methods',   students: 25, homework: 'Conduct a usability test with 2 users.' },
  { id: 10, dayKey: 'sat', hour: 11, subject: 'Full-Stack Dev',  teacher: 'Amir Karimov',     icon: '🚀', color: '#6366f1', startTime: '11:00', endTime: '13:00', room: 'Room 204', topic: 'Project Workshop',             students: 28, homework: null },
])

const dayKeyMap = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5 }

function getLessonsAt(dateKey, hour) {
  return lessons.value.filter(l => {
    const wd = weekDays.value.find(d => d.key === dateKey)
    if (!wd) return false
    const dayIdx = weekDays.value.indexOf(wd)
    return Object.keys(dayKeyMap)[dayIdx] === l.dayKey && l.hour === hour
  })
}

function getDayLessons(dateKey) {
  const wd = weekDays.value.find(d => d.key === dateKey)
  if (!wd) return []
  const dayIdx = weekDays.value.indexOf(wd)
  const key = Object.keys(dayKeyMap)[dayIdx]
  return lessons.value.filter(l => l.dayKey === key)
}

const todayLessons = computed(() => {
  const wd = weekDays.value.find(d => d.isToday)
  if (!wd) return []
  const dayIdx = weekDays.value.indexOf(wd)
  const key = Object.keys(dayKeyMap)[dayIdx]
  return lessons.value.filter(l => l.dayKey === key).sort((a, b) => a.hour - b.hour)
})

function isCurrentLesson(lesson) {
  const now = today.getHours()
  return now >= lesson.hour && now < lesson.hour + 2
}

function isUpcomingLesson(lesson) {
  return lesson.hour > today.getHours()
}

const upcomingClasses = computed(() => {
  const now = today.getHours()
  return lessons.value
    .filter(l => {
      const wd = weekDays.value.find(d => d.isToday)
      if (!wd) return true
      const dayIdx = weekDays.value.indexOf(wd)
      const todayDayKey = Object.keys(dayKeyMap)[dayIdx]
      if (l.dayKey === todayDayKey) return l.hour > now
      return true
    })
    .slice(0, 5)
    .map(l => {
      const dayIdx = dayKeyMap[l.dayKey]
      return { ...l, dayLabel: dayNames[dayIdx] }
    })
})

const kpis = ref([
  { label: 'Classes This Week', value: '10', icon: '📅', bg: '#eef2ff' },
  { label: 'Hours of Study',    value: '20', icon: '⏱️', bg: '#f0fdf4' },
  { label: 'Subjects',          value: '4',  icon: '📚', bg: '#fff7ed' },
  { label: 'Free Days',         value: '1',  icon: '🎉', bg: '#fdf4ff' },
])

const courseLegend = [
  { name: 'Full-Stack Development', color: '#6366f1' },
  { name: 'Data Science',           color: '#0ea5e9' },
  { name: 'UI/UX Design',           color: '#f59e0b' },
  { name: 'DevOps Essentials',      color: '#8b5cf6' },
]
</script>