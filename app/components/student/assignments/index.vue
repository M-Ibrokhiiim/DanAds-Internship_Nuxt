<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">Assignments</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="v in ['All', 'Pending', 'Submitted', 'Graded']"
            :key="v"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all"
            :class="activeFilter === v
              ? 'bg-slate-900 text-white'
              : 'bg-transparent text-slate-400 hover:text-slate-700'"
            @click="activeFilter = v"
          >{{ v }}</button>
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

    <div class="grid gap-5" style="grid-template-columns: 1fr 320px;">

      <div class="flex flex-col gap-4">

        <div
          v-for="a in filteredAssignments"
          :key="a.id"
          class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-200"
          :class="{ 'opacity-70': a.status === 'graded' }"
        >
          <div class="h-1 w-full" :style="{ background: a.color }"></div>
          <div class="p-5">
            <div class="flex items-start gap-4">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5"
                :style="{ background: a.color + '18' }"
              >{{ a.icon }}</div>

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3 mb-1.5">
                  <h3 class="font-bold text-sm leading-snug">{{ a.title }}</h3>
                  <span
                    class="text-[0.68rem] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 capitalize"
                    :class="{
                      'bg-amber-100 text-amber-700':  a.status === 'pending',
                      'bg-blue-100  text-blue-700':   a.status === 'submitted',
                      'bg-green-100 text-green-700':  a.status === 'graded',
                      'bg-red-100   text-red-600':    a.status === 'overdue',
                    }"
                  >{{ a.status }}</span>
                </div>

                <p class="text-xs text-slate-400 mb-3">{{ a.course }} · {{ a.teacher }}</p>
                <p class="text-xs text-slate-500 leading-relaxed mb-4">{{ a.description }}</p>

                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span
                    v-for="tag in a.tags"
                    :key="tag"
                    class="text-[0.67rem] font-semibold px-2 py-0.5 rounded-md"
                    :style="{ background: a.color + '15', color: a.color }"
                  >{{ tag }}</span>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div class="flex items-center gap-4 text-xs text-slate-400">
                    <span class="flex items-center gap-1">
                      📅
                      <span :class="a.urgent && a.status === 'pending' ? 'text-red-500 font-bold' : ''">
                        Due {{ a.due }}
                      </span>
                    </span>
                    <span class="flex items-center gap-1">🎯 {{ a.points }} pts</span>
                    <span v-if="a.grade" class="flex items-center gap-1 font-bold text-green-600">✓ {{ a.grade }}/{{ a.points }}</span>
                  </div>

                  <div class="flex gap-2">
                    <button
                      v-if="a.status === 'pending' || a.status === 'overdue'"
                      class="px-4 py-1.5 rounded-xl text-xs font-bold text-white border-none cursor-pointer transition-all"
                      :style="{ background: a.color }"
                      @click="submitAssignment(a)"
                    >Submit</button>
                    <button
                      v-if="a.status === 'submitted'"
                      class="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border-none cursor-pointer"
                    >View Submission</button>
                    <button
                      v-if="a.status === 'graded'"
                      class="px-4 py-1.5 rounded-xl text-xs font-bold bg-green-50 text-green-700 border-none cursor-pointer"
                    >View Feedback</button>
                    <button class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-500 border-none cursor-pointer">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredAssignments.length === 0" class="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center text-center">
          <span class="text-4xl mb-3">📭</span>
          <p class="font-bold text-slate-700 mb-1">No assignments here</p>
          <p class="text-xs text-slate-400">Nothing in this category right now.</p>
        </div>
      </div>

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Upcoming Deadlines</h2>
          <div class="flex flex-col gap-3">
            <div
              v-for="a in upcomingDeadlines"
              :key="a.id"
              class="flex items-center gap-3"
            >
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                :style="{ background: a.color + '18' }"
              >{{ a.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold truncate">{{ a.title }}</p>
                <p class="text-[0.68rem] text-slate-400">{{ a.course }}</p>
              </div>
              <div class="text-right shrink-0">
                <p
                  class="text-[0.68rem] font-bold"
                  :class="a.urgent ? 'text-red-500' : 'text-slate-400'"
                >{{ a.due }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Progress Overview</h2>
          <div class="flex flex-col gap-3">
            <div v-for="c in courseProgress" :key="c.name">
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs font-semibold text-slate-600 truncate">{{ c.name }}</span>
                <span class="text-xs font-bold ml-2 shrink-0" :style="{ color: c.color }">{{ c.done }}/{{ c.total }}</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :style="{ width: (c.done / c.total * 100) + '%', background: c.color }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Recent Grades</h2>
          <div class="flex flex-col gap-2.5">
            <div
              v-for="g in recentGrades"
              :key="g.title"
              class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-none"
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                :style="{ background: g.color + '18' }"
              >{{ g.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold truncate">{{ g.title }}</p>
                <p class="text-[0.65rem] text-slate-400">{{ g.course }}</p>
              </div>
              <div
                class="text-sm font-extrabold"
                :class="{
                  'text-green-600': g.percent >= 85,
                  'text-amber-500': g.percent >= 70 && g.percent < 85,
                  'text-red-500':   g.percent < 70,
                }"
              >{{ g.score }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2"
    >
      <span>✅</span> {{ toast.message }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')

const kpis = ref([
  { label: 'Total',     value: '12', icon: '📝', bg: '#eef2ff' },
  { label: 'Pending',   value: '4',  icon: '⏳', bg: '#fff7ed' },
  { label: 'Submitted', value: '5',  icon: '📤', bg: '#eff6ff' },
  { label: 'Graded',    value: '3',  icon: '✅', bg: '#f0fdf4' },
])

const assignments = ref([
  {
    id: 1,
    title:       'Build a REST API with Node.js & Express',
    description: 'Create a fully functional REST API with CRUD operations, JWT authentication, and PostgreSQL integration. Deploy to Railway.',
    course:      'Full-Stack Development',
    teacher:     'Amir Karimov',
    icon:        '🚀',
    color:       '#6366f1',
    status:      'pending',
    due:         'Today, 23:59',
    urgent:      true,
    points:      100,
    grade:       null,
    tags:        ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
  },
  {
    id: 2,
    title:       'React State Management with Zustand',
    description: 'Refactor the provided e-commerce UI to use Zustand for global state. Implement cart, auth, and product filter state.',
    course:      'Full-Stack Development',
    teacher:     'Amir Karimov',
    icon:        '⚛️',
    color:       '#6366f1',
    status:      'pending',
    due:         'Tomorrow, 18:00',
    urgent:      false,
    points:      80,
    grade:       null,
    tags:        ['React', 'Zustand', 'State Management'],
  },
  {
    id: 3,
    title:       'Exploratory Data Analysis – Titanic Dataset',
    description: 'Perform EDA on the Titanic dataset. Visualize survival rates by class, gender, and age. Submit as a Jupyter Notebook.',
    course:      'Data Science',
    teacher:     'Nodira Yusupova',
    icon:        '📊',
    color:       '#0ea5e9',
    status:      'submitted',
    due:         'Mar 2',
    urgent:      false,
    points:      90,
    grade:       null,
    tags:        ['Python', 'Pandas', 'Matplotlib', 'EDA'],
  },
  {
    id: 4,
    title:       'Figma Prototype – Mobile Banking App',
    description: 'Design a high-fidelity Figma prototype for a mobile banking app with onboarding, dashboard, and transfer flows.',
    course:      'UI/UX Design',
    teacher:     'Malika Rahimova',
    icon:        '🎨',
    color:       '#f59e0b',
    status:      'graded',
    due:         'Feb 20',
    urgent:      false,
    points:      100,
    grade:       93,
    tags:        ['Figma', 'Prototyping', 'Mobile UI'],
  },
  {
    id: 5,
    title:       'Docker Containerization Lab',
    description: 'Containerize the provided Node.js application using Docker. Write a docker-compose.yml with app, database, and Nginx.',
    course:      'DevOps Essentials',
    teacher:     'Dilnoza Ergasheva',
    icon:        '🐳',
    color:       '#8b5cf6',
    status:      'graded',
    due:         'Feb 15',
    urgent:      false,
    points:      80,
    grade:       76,
    tags:        ['Docker', 'docker-compose', 'Nginx'],
  },
  {
    id: 6,
    title:       'CSS Animation & Micro-interactions',
    description: 'Implement at least 5 CSS animations and micro-interactions on a provided HTML template. No JavaScript allowed.',
    course:      'Full-Stack Development',
    teacher:     'Amir Karimov',
    icon:        '✨',
    color:       '#ec4899',
    status:      'overdue',
    due:         'Feb 22',
    urgent:      true,
    points:      60,
    grade:       null,
    tags:        ['CSS', 'Animations', 'Transitions'],
  },
  {
    id: 7,
    title:       'SQL Query Optimization Challenge',
    description: 'Optimize 10 slow SQL queries provided in the repo. Use EXPLAIN ANALYZE to benchmark before and after results.',
    course:      'Data Science',
    teacher:     'Nodira Yusupova',
    icon:        '🗃️',
    color:       '#0ea5e9',
    status:      'submitted',
    due:         'Feb 26',
    urgent:      false,
    points:      70,
    grade:       null,
    tags:        ['SQL', 'PostgreSQL', 'Optimization'],
  },
])

const filteredAssignments = computed(() => {
  if (activeFilter.value === 'All') return assignments.value
  return assignments.value.filter(a => a.status === activeFilter.value.toLowerCase())
})

const upcomingDeadlines = computed(() =>
  assignments.value
    .filter(a => a.status === 'pending' || a.status === 'overdue')
    .slice(0, 4)
)

const courseProgress = ref([
  { name: 'Full-Stack Dev', done: 5, total: 8,  color: '#6366f1' },
  { name: 'Data Science',   done: 2, total: 5,  color: '#0ea5e9' },
  { name: 'UI/UX Design',   done: 3, total: 4,  color: '#f59e0b' },
  { name: 'DevOps',         done: 1, total: 3,  color: '#8b5cf6' },
])

const recentGrades = ref([
  { title: 'Figma Prototype',       course: 'UI/UX Design',   icon: '🎨', color: '#f59e0b', score: '93/100', percent: 93 },
  { title: 'Docker Lab',            course: 'DevOps',         icon: '🐳', color: '#8b5cf6', score: '76/80',  percent: 95 },
  { title: 'JavaScript Basics',     course: 'Full-Stack Dev', icon: '⚡', color: '#6366f1', score: '88/100', percent: 88 },
])

const toast = ref({ show: false, message: '' })

function submitAssignment(a) {
  a.status = 'submitted'
  toast.value = { show: true, message: `"${a.title.slice(0, 30)}..." submitted!` }
  setTimeout(() => { toast.value.show = false }, 3000)
}
</script>