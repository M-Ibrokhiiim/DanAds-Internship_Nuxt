<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">My Courses</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="v in ['All', 'Active', 'Completed', 'Upcoming']"
            :key="v"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all"
            :class="activeFilter === v ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400 hover:text-slate-700'"
            @click="activeFilter = v"
          >{{ v }}</button>
        </div>
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="v in ['grid', 'list']"
            :key="v"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all"
            :class="viewMode === v ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400'"
            @click="viewMode = v"
          >{{ v === 'grid' ? '⊞' : '☰' }}</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-slate-100"
      >
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" :style="{ background: kpi.bg }">{{ kpi.icon }}</div>
        <div class="flex-1">
          <span class="block text-2xl font-bold leading-tight">{{ kpi.value }}</span>
          <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
        </div>
      </div>
    </div>

    <div v-if="viewMode === 'grid'" class="grid grid-cols-2 gap-5 mb-6">
      <div
        v-for="c in filteredCourses"
        :key="c.id"
        class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        <div class="h-2" :style="{ background: c.color }"></div>
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" :style="{ background: c.color + '18' }">{{ c.icon }}</div>
              <div>
                <h3 class="font-bold text-sm leading-snug">{{ c.name }}</h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ c.teacher }}</p>
              </div>
            </div>
            <span
              class="text-[0.68rem] font-bold px-2.5 py-1 rounded-full capitalize shrink-0"
              :class="{
                'bg-green-100 text-green-700':  c.status === 'active',
                'bg-slate-100 text-slate-500':  c.status === 'completed',
                'bg-amber-100 text-amber-700':  c.status === 'upcoming',
              }"
            >{{ c.status }}</span>
          </div>

          <p class="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{{ c.description }}</p>

          <div class="flex flex-wrap gap-1.5 mb-5">
            <span
              v-for="tag in c.tags"
              :key="tag"
              class="text-[0.67rem] font-semibold px-2 py-0.5 rounded-md"
              :style="{ background: c.color + '15', color: c.color }"
            >{{ tag }}</span>
          </div>

          <div class="grid grid-cols-3 gap-3 mb-5 py-3 border-y border-slate-50">
            <div class="text-center">
              <p class="text-sm font-bold text-slate-800">{{ c.lessons }}</p>
              <p class="text-[0.65rem] text-slate-400">Lessons</p>
            </div>
            <div class="text-center border-x border-slate-100">
              <p class="text-sm font-bold text-slate-800">{{ c.hours }}h</p>
              <p class="text-[0.65rem] text-slate-400">Duration</p>
            </div>
            <div class="text-center">
              <p class="text-sm font-bold text-slate-800">{{ c.assignments }}</p>
              <p class="text-[0.65rem] text-slate-400">Tasks</p>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-xs text-slate-400 font-medium">Progress</span>
              <span class="text-xs font-bold" :style="{ color: c.color }">{{ c.progress }}%</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" :style="{ width: c.progress + '%', background: c.color }"></div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex -space-x-1.5">
              <div
                v-for="m in c.classmates.slice(0, 4)"
                :key="m"
                class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[0.55rem]"
                :style="{ background: c.color }"
              >{{ m }}</div>
              <div class="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[0.55rem]">+{{ c.totalStudents - 4 }}</div>
            </div>
            <button
              class="px-4 py-1.5 rounded-xl text-xs font-bold text-white border-none cursor-pointer transition-all hover:opacity-90"
              :style="{ background: c.color }"
            >
              {{ c.status === 'completed' ? 'Review' : c.status === 'upcoming' ? 'Preview' : 'Continue →' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-3 mb-6">
      <div
        v-for="c in filteredCourses"
        :key="c.id"
        class="bg-white rounded-2xl border border-slate-100 px-6 py-4 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer"
      >
        <div class="w-1 self-stretch rounded-full shrink-0" :style="{ background: c.color }"></div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" :style="{ background: c.color + '18' }">{{ c.icon }}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <h3 class="font-bold text-sm">{{ c.name }}</h3>
            <span
              class="text-[0.65rem] font-bold px-2 py-0.5 rounded-full capitalize"
              :class="{
                'bg-green-100 text-green-700': c.status === 'active',
                'bg-slate-100 text-slate-500': c.status === 'completed',
                'bg-amber-100 text-amber-700': c.status === 'upcoming',
              }"
            >{{ c.status }}</span>
          </div>
          <p class="text-xs text-slate-400">{{ c.teacher }} · {{ c.lessons }} lessons · {{ c.hours }}h</p>
        </div>
        <div class="flex items-center gap-2 w-40 shrink-0">
          <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full rounded-full" :style="{ width: c.progress + '%', background: c.color }"></div>
          </div>
          <span class="text-xs font-bold w-9 text-right" :style="{ color: c.color }">{{ c.progress }}%</span>
        </div>
        <button
          class="px-4 py-1.5 rounded-xl text-xs font-bold text-white border-none cursor-pointer shrink-0 hover:opacity-90"
          :style="{ background: c.color }"
        >{{ c.status === 'completed' ? 'Review' : c.status === 'upcoming' ? 'Preview' : 'Continue' }}</button>
      </div>
    </div>

    <div v-if="activeCourse" class="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div class="h-1.5" :style="{ background: activeCourse.color }"></div>
      <div class="p-6">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl" :style="{ background: activeCourse.color + '18' }">{{ activeCourse.icon }}</div>
            <div>
              <h2 class="font-bold text-sm">{{ activeCourse.name }} — Lesson Plan</h2>
              <p class="text-xs text-slate-400">{{ activeCourse.teacher }}</p>
            </div>
          </div>
          <button class="text-xs text-slate-400 border-none bg-transparent cursor-pointer" @click="activeCourse = null">✕ Close</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="(lesson, idx) in activeCourse.syllabus"
            :key="idx"
            class="flex items-center gap-3 p-3 rounded-xl border transition-all"
            :class="lesson.done ? 'border-green-100 bg-green-50' : 'border-slate-100 hover:border-slate-200'"
          >
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
              :class="lesson.done ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'"
            >{{ lesson.done ? '✓' : idx + 1 }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold truncate" :class="lesson.done ? 'text-slate-500 line-through' : ''">{{ lesson.title }}</p>
              <p class="text-[0.65rem] text-slate-400">{{ lesson.duration }}</p>
            </div>
            <span v-if="lesson.current" class="text-[0.6rem] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">Now</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!activeCourse" class="mt-5">
      <h2 class="text-sm font-bold mb-4">Jump back in</h2>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="c in courses.filter(c => c.status === 'active')"
          :key="c.id"
          class="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all"
          @click="activeCourse = c"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" :style="{ background: c.color + '18' }">{{ c.icon }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold truncate">{{ c.name }}</p>
            <p class="text-[0.65rem] text-slate-400 mt-0.5">Next: {{ c.nextLesson }}</p>
          </div>
          <span class="text-slate-300 text-xs shrink-0">→</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const viewMode     = ref('grid')
const activeCourse = ref(null)

const kpis = ref([
  { label: 'Enrolled',   value: '4',   icon: '📚', bg: '#eef2ff' },
  { label: 'Completed',  value: '1',   icon: '🏆', bg: '#f0fdf4' },
  { label: 'In Progress',value: '2',   icon: '⚡', bg: '#fff7ed' },
  { label: 'Total Hours',value: '128', icon: '⏱️', bg: '#fdf4ff' },
])

const courses = ref([
  {
    id: 1,
    name:        'Full-Stack Development',
    description: 'Master modern web development from frontend to backend. Build real-world projects with React, Node.js, and PostgreSQL.',
    teacher:     'Amir Karimov',
    icon:        '🚀',
    color:       '#6366f1',
    status:      'active',
    progress:    72,
    lessons:     48,
    hours:       96,
    assignments: 12,
    totalStudents: 28,
    classmates:  ['AJ', 'BK', 'CM', 'DS'],
    nextLesson:  'REST API Design',
    tags:        ['React', 'Node.js', 'PostgreSQL', 'REST'],
    syllabus: [
      { title: 'HTML & CSS Foundations',     duration: '4h', done: true,  current: false },
      { title: 'JavaScript ES6+',            duration: '6h', done: true,  current: false },
      { title: 'React Fundamentals',         duration: '8h', done: true,  current: false },
      { title: 'React Hooks & State',        duration: '6h', done: true,  current: false },
      { title: 'Node.js & Express',          duration: '8h', done: true,  current: false },
      { title: 'REST API Design',            duration: '6h', done: false, current: true  },
      { title: 'PostgreSQL & Prisma',        duration: '8h', done: false, current: false },
      { title: 'Authentication & JWT',       duration: '6h', done: false, current: false },
      { title: 'Deployment & CI/CD',         duration: '6h', done: false, current: false },
      { title: 'Capstone Project',           duration: '12h',done: false, current: false },
    ],
  },
  {
    id: 2,
    name:        'Data Science Intro',
    description: 'Dive into data analysis, visualization, and machine learning fundamentals using Python, Pandas, and Scikit-learn.',
    teacher:     'Nodira Yusupova',
    icon:        '📊',
    color:       '#0ea5e9',
    status:      'active',
    progress:    30,
    lessons:     36,
    hours:       72,
    assignments: 8,
    totalStudents: 22,
    classmates:  ['FG', 'HI', 'JK', 'LM'],
    nextLesson:  'Pandas DataFrames',
    tags:        ['Python', 'Pandas', 'Matplotlib', 'ML'],
    syllabus: [
      { title: 'Python for Data Science',    duration: '6h', done: true,  current: false },
      { title: 'NumPy Essentials',           duration: '4h', done: true,  current: false },
      { title: 'Pandas DataFrames',          duration: '6h', done: false, current: true  },
      { title: 'Data Visualization',         duration: '6h', done: false, current: false },
      { title: 'Statistics Fundamentals',    duration: '8h', done: false, current: false },
      { title: 'Machine Learning Intro',     duration: '10h',done: false, current: false },
    ],
  },
  {
    id: 3,
    name:        'UI/UX Design',
    description: 'Learn design thinking, Figma, user research, and how to create stunning, user-centered digital products.',
    teacher:     'Malika Rahimova',
    icon:        '🎨',
    color:       '#f59e0b',
    status:      'completed',
    progress:    100,
    lessons:     24,
    hours:       48,
    assignments: 6,
    totalStudents: 25,
    classmates:  ['NO', 'PQ', 'RS', 'TU'],
    nextLesson:  'Completed',
    tags:        ['Figma', 'Design Systems', 'UX Research'],
    syllabus: [
      { title: 'Design Thinking',            duration: '4h', done: true, current: false },
      { title: 'Figma Basics',               duration: '6h', done: true, current: false },
      { title: 'Typography & Color',         duration: '4h', done: true, current: false },
      { title: 'Component Libraries',        duration: '6h', done: true, current: false },
      { title: 'User Research & Testing',    duration: '6h', done: true, current: false },
      { title: 'Portfolio Presentation',     duration: '4h', done: true, current: false },
    ],
  },
  {
    id: 4,
    name:        'DevOps Essentials',
    description: 'Get hands-on with Docker, Kubernetes, CI/CD pipelines, and cloud deployment on AWS. Build production-ready infrastructure.',
    teacher:     'Dilnoza Ergasheva',
    icon:        '☁️',
    color:       '#8b5cf6',
    status:      'upcoming',
    progress:    0,
    lessons:     20,
    hours:       40,
    assignments: 5,
    totalStudents: 21,
    classmates:  ['VW', 'XY', 'ZA', 'BC'],
    nextLesson:  'Starts Mar 10',
    tags:        ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    syllabus: [
      { title: 'Linux Fundamentals',         duration: '4h', done: false, current: false },
      { title: 'Docker & Containers',        duration: '8h', done: false, current: false },
      { title: 'Kubernetes Basics',          duration: '8h', done: false, current: false },
      { title: 'CI/CD with GitHub Actions',  duration: '6h', done: false, current: false },
      { title: 'AWS Deployment',             duration: '8h', done: false, current: false },
    ],
  },
])

const filteredCourses = computed(() => {
  if (activeFilter.value === 'All') return courses.value
  return courses.value.filter(c => c.status === activeFilter.value.toLowerCase())
})
</script>