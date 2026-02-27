<template>
  <div class="min-h-screen bg-[#f8f9fc] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Welcome back</p>
        <h1 class="text-[1.6rem] font-bold m-0">Good morning, Sherzod 👋</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 font-medium">
          📅 {{ currentDate }}
        </div>
        <div class="bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-xl">
          Full-Stack Dev · Batch 3
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-slate-100"
      >
        <div
          class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
          :style="{ background: kpi.bg }"
        >{{ kpi.icon }}</div>
        <div class="flex-1">
          <span class="block text-2xl font-bold leading-tight">{{ kpi.value }}</span>
          <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-5 mb-5" style="grid-template-columns: 1fr 360px;">

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-base font-bold m-0">My Courses</h2>
            <button class="bg-transparent border-none text-indigo-500 text-xs font-semibold cursor-pointer">View all →</button>
          </div>
          <div class="flex flex-col gap-4">
            <div
              v-for="course in courses"
              :key="course.id"
              class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                :style="{ background: course.color + '18' }"
              >{{ course.icon }}</div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1">
                  <p class="font-bold text-sm">{{ course.name }}</p>
                  <span class="text-xs font-bold ml-2 shrink-0" :style="{ color: course.color }">{{ course.progress }}%</span>
                </div>
                <p class="text-xs text-slate-400 mb-2">{{ course.teacher }} · {{ course.lessons }} lessons</p>
                <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :style="{ width: course.progress + '%', background: course.color }"
                  ></div>
                </div>
              </div>
              <span
                class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full shrink-0"
                :class="{
                  'bg-green-100 text-green-700': course.status === 'active',
                  'bg-amber-100 text-amber-700': course.status === 'upcoming',
                  'bg-slate-100 text-slate-500': course.status === 'completed',
                }"
              >{{ course.status }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-base font-bold m-0">Grades & Certificates</h2>
            <span class="text-xs text-slate-400 font-medium">GPA: <span class="font-bold text-slate-700">3.8</span></span>
          </div>
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Subject</th>
                <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Grade</th>
                <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Score</th>
                <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Certificate</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="g in grades"
                :key="g.subject"
                class="border-t border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td class="py-3 px-3 align-middle">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full shrink-0" :style="{ background: g.color }"></div>
                    <span class="font-medium text-sm">{{ g.subject }}</span>
                  </div>
                </td>
                <td class="py-3 px-3 align-middle">
                  <span
                    class="font-bold text-sm px-2 py-0.5 rounded-lg"
                    :class="{
                      'bg-green-100 text-green-700': ['A', 'A+'].includes(g.grade),
                      'bg-blue-100 text-blue-700':   g.grade === 'B+' || g.grade === 'B',
                      'bg-amber-100 text-amber-700': g.grade === 'C+' || g.grade === 'C',
                    }"
                  >{{ g.grade }}</span>
                </td>
                <td class="py-3 px-3 align-middle">
                  <div class="flex items-center gap-2">
                    <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :style="{ width: g.score + '%', background: g.color }"></div>
                    </div>
                    <span class="text-xs text-slate-500 font-medium">{{ g.score }}</span>
                  </div>
                </td>
                <td class="py-3 px-3 align-middle">
                  <button
                    v-if="g.certificate"
                    class="text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-lg border-none cursor-pointer hover:bg-indigo-100 transition-all"
                  >⬇ Download</button>
                  <span v-else class="text-xs text-slate-300 italic">In progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-base font-bold m-0">Assignments</h2>
            <span class="text-xs text-slate-400">{{ pendingCount }} pending</span>
          </div>
          <div class="flex flex-col gap-3">
            <div
              v-for="a in assignments"
              :key="a.id"
              class="flex items-start gap-3 p-3 rounded-xl border transition-all"
              :class="a.done ? 'border-slate-100 opacity-60' : 'border-slate-100 hover:border-indigo-200'"
            >
              <button
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-all"
                :class="a.done ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'"
                @click="a.done = !a.done"
              >
                <span v-if="a.done" class="text-white text-[0.6rem] font-bold">✓</span>
              </button>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold" :class="a.done ? 'line-through text-slate-400' : 'text-slate-800'">{{ a.title }}</p>
                <p class="text-[0.68rem] text-slate-400 mt-0.5">{{ a.course }}</p>
              </div>
              <div class="text-right shrink-0">
                <p
                  class="text-[0.68rem] font-bold"
                  :class="{
                    'text-red-500':   a.urgent && !a.done,
                    'text-amber-500': !a.urgent && !a.done,
                    'text-slate-300': a.done,
                  }"
                >{{ a.due }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-base font-bold m-0">This Week</h2>
            <span class="text-xs text-slate-400 font-medium">Feb 24 – Mar 2</span>
          </div>
          <div class="flex flex-col gap-2">
            <div
              v-for="s in schedule"
              :key="s.id"
              class="flex items-center gap-3 p-3 rounded-xl"
              :class="s.today ? 'bg-indigo-50 border border-indigo-100' : 'border border-slate-50'"
            >
              <div class="text-center w-10 shrink-0">
                <p class="text-[0.6rem] uppercase font-bold text-slate-400">{{ s.day }}</p>
                <p class="text-sm font-extrabold" :class="s.today ? 'text-indigo-600' : 'text-slate-700'">{{ s.date }}</p>
              </div>
              <div
                class="w-1 self-stretch rounded-full shrink-0"
                :style="{ background: s.color }"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold truncate">{{ s.subject }}</p>
                <p class="text-[0.68rem] text-slate-400">{{ s.time }} · {{ s.teacher }}</p>
              </div>
              <span v-if="s.today" class="text-[0.65rem] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full shrink-0">Today</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
)

const kpis = ref([
  { label: 'Courses Enrolled', value: '4',   icon: '📚', bg: '#eef2ff' },
  { label: 'Assignments Done', value: '18',  icon: '✅', bg: '#f0fdf4' },
  { label: 'Avg Score',        value: '87%', icon: '🎯', bg: '#fff7ed' },
  { label: 'Certificates',     value: '2',   icon: '🏆', bg: '#fdf4ff' },
])

const courses = ref([
  { id: 1, name: 'Full-Stack Development', teacher: 'Amir Karimov',    lessons: 48, progress: 72, status: 'active',    icon: '🚀', color: '#6366f1' },
  { id: 2, name: 'UI/UX Design Basics',    teacher: 'Malika Rahimova', lessons: 24, progress: 100, status: 'completed', icon: '🎨', color: '#f59e0b' },
  { id: 3, name: 'Data Science Intro',     teacher: 'Nodira Yusupova', lessons: 36, progress: 30, status: 'active',    icon: '📊', color: '#0ea5e9' },
  { id: 4, name: 'DevOps Essentials',      teacher: 'Dilnoza Ergasheva',lessons: 20, progress: 0, status: 'upcoming',  icon: '☁️', color: '#8b5cf6' },
])

const grades = ref([
  { subject: 'HTML & CSS',          grade: 'A+', score: 97, color: '#6366f1', certificate: true  },
  { subject: 'JavaScript',          grade: 'A',  score: 91, color: '#10b981', certificate: true  },
  { subject: 'React Fundamentals',  grade: 'B+', score: 85, color: '#0ea5e9', certificate: false },
  { subject: 'Node.js & Express',   grade: 'B',  score: 80, color: '#f59e0b', certificate: false },
  { subject: 'UI/UX Design',        grade: 'A',  score: 93, color: '#ec4899', certificate: true  },
])

const assignments = ref([
  { id: 1, title: 'Build a REST API with Node.js',    course: 'Full-Stack Dev',   due: 'Today',     urgent: true,  done: false },
  { id: 2, title: 'React state management task',      course: 'Full-Stack Dev',   due: 'Tomorrow',  urgent: false, done: false },
  { id: 3, title: 'EDA on Titanic dataset',           course: 'Data Science',     due: 'Mar 2',     urgent: false, done: false },
  { id: 4, title: 'Figma prototype — mobile app',     course: 'UI/UX Design',     due: 'Done',      urgent: false, done: true  },
  { id: 5, title: 'Deploy app to Vercel',             course: 'Full-Stack Dev',   due: 'Mar 5',     urgent: false, done: false },
  { id: 6, title: 'CSS animation project',            course: 'HTML & CSS',       due: 'Done',      urgent: false, done: true  },
])

const pendingCount = computed(() => assignments.value.filter(a => !a.done).length)

const schedule = ref([
  { id: 1, day: 'MON', date: '24', subject: 'Full-Stack Dev',  time: '10:00 – 12:00', teacher: 'Amir Karimov',     color: '#6366f1', today: false },
  { id: 2, day: 'TUE', date: '25', subject: 'Data Science',    time: '14:00 – 16:00', teacher: 'Nodira Yusupova',  color: '#0ea5e9', today: false },
  { id: 3, day: 'WED', date: '26', subject: 'Full-Stack Dev',  time: '10:00 – 12:00', teacher: 'Amir Karimov',     color: '#6366f1', today: false },
  { id: 4, day: 'THU', date: '27', subject: 'UI/UX Design',    time: '13:00 – 15:00', teacher: 'Malika Rahimova',  color: '#f59e0b', today: true  },
  { id: 5, day: 'FRI', date: '28', subject: 'Data Science',    time: '14:00 – 16:00', teacher: 'Nodira Yusupova',  color: '#0ea5e9', today: false },
  { id: 6, day: 'SAT', date: '01', subject: 'DevOps Intro',    time: '11:00 – 13:00', teacher: 'Dilnoza Ergasheva',color: '#8b5cf6', today: false },
])
</script>