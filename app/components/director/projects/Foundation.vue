<template>
  <div class=" bg-[#f8f9fc] w-[82.5vw] h-[86vh] -mt-2  overflow-scroll  text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Education Center</p>
        <h1 class="text-[1.6rem] font-bold m-0">Projects</h1>
      </div>
      <div class="flex gap-3 items-center">
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="v in ['grid', 'list']"
            :key="v"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all"
            :class="viewMode === v ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-500'"
            @click="viewMode = v"
          >
            {{ v === 'grid' ? '⊞ Grid' : '☰ List' }}
          </button>
        </div>
        <button class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
          + New Project
        </button>
      </div>
    </div>

    <div class="flex gap-3 mb-6 flex-wrap">
      <button
        v-for="f in filters"
        :key="f.key"
        class="px-4 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all"
        :class="activeFilter === f.key
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
        <span
          class="ml-1.5 px-1.5 py-0.5 rounded-full text-[0.65rem]"
          :class="activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'"
        >{{ f.count }}</span>
      </button>
    </div>

    <div v-if="viewMode === 'grid'" class="grid grid-cols-3 gap-5">
      <div
        v-for="p in filteredProjects"
        :key="p.id"
        class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        <div class="h-2 w-full" :style="{ background: p.color }"></div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              :style="{ background: p.color + '18' }"
            >
              {{ p.icon }}
            </div>
            <span
              class="text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full capitalize"
              :class="{
                'bg-green-100 text-green-700': p.status === 'active',
                'bg-amber-100 text-amber-700': p.status === 'planning',
                'bg-blue-100 text-blue-700':   p.status === 'review',
                'bg-slate-100 text-slate-500': p.status === 'completed',
              }"
            >{{ p.status }}</span>
          </div>

          <h3 class="font-bold text-[0.95rem] mb-1 leading-snug">{{ p.name }}</h3>
          <p class="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{{ p.description }}</p>

          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="text-[0.68rem] font-medium px-2 py-0.5 rounded-md"
              :style="{ background: p.color + '15', color: p.color }"
            >{{ tag }}</span>
          </div>

          <div class="mb-3">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-xs text-slate-400 font-medium">Progress</span>
              <span class="text-xs font-bold" :style="{ color: p.color }">{{ p.progress }}%</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: p.progress + '%', background: p.color }"
              ></div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-slate-50">
            <div class="flex -space-x-2">
              <div
                v-for="m in p.members.slice(0, 3)"
                :key="m.name"
                class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[0.6rem]"
                :style="{ background: m.color }"
                :title="m.name"
              >{{ m.initials }}</div>
              <div
                v-if="p.members.length > 3"
                class="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[0.6rem]"
              >+{{ p.members.length - 3 }}</div>
            </div>
            <div class="flex items-center gap-3 text-xs text-slate-400">
              <span>📅 {{ p.deadline }}</span>
              <span>🎯 {{ p.tasks.done }}/{{ p.tasks.total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="p in filteredProjects"
        :key="p.id"
        class="bg-white rounded-2xl border border-slate-100 px-6 py-4 flex items-center gap-5 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="w-1 self-stretch rounded-full shrink-0" :style="{ background: p.color }"></div>
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          :style="{ background: p.color + '18' }"
        >{{ p.icon }}</div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <h3 class="font-bold text-sm">{{ p.name }}</h3>
            <span
              class="text-[0.68rem] font-bold px-2 py-0.5 rounded-full capitalize"
              :class="{
                'bg-green-100 text-green-700': p.status === 'active',
                'bg-amber-100 text-amber-700': p.status === 'planning',
                'bg-blue-100 text-blue-700':   p.status === 'review',
                'bg-slate-100 text-slate-500': p.status === 'completed',
              }"
            >{{ p.status }}</span>
          </div>
          <p class="text-xs text-slate-400 truncate">{{ p.description }}</p>
        </div>

        <div class="flex items-center gap-2 w-36 shrink-0">
          <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full rounded-full" :style="{ width: p.progress + '%', background: p.color }"></div>
          </div>
          <span class="text-xs font-bold w-8 text-right" :style="{ color: p.color }">{{ p.progress }}%</span>
        </div>

        <div class="flex -space-x-2 shrink-0">
          <div
            v-for="m in p.members.slice(0, 3)"
            :key="m.name"
            class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[0.6rem]"
            :style="{ background: m.color }"
          >{{ m.initials }}</div>
        </div>

        <div class="text-xs text-slate-400 shrink-0 w-20 text-right">{{ p.deadline }}</div>

        <div class="text-xs text-slate-500 font-semibold shrink-0 w-14 text-right">
          {{ p.tasks.done }}/{{ p.tasks.total }} tasks
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-6">
      <div class="bg-white rounded-2xl p-5 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Total Projects</p>
        <p class="text-[2rem] font-extrabold font-mono leading-none mb-1">{{ projects.length }}</p>
        <p class="text-xs text-slate-400">Across all categories</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Active Now</p>
        <p class="text-[2rem] font-extrabold font-mono leading-none mb-1 text-green-500">
          {{ projects.filter(p => p.status === 'active').length }}
        </p>
        <p class="text-xs text-slate-400">In progress</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Avg Progress</p>
        <p class="text-[2rem] font-extrabold font-mono leading-none mb-1">{{ avgProgress }}<span class="text-lg font-semibold">%</span></p>
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
          <div class="h-full rounded-full bg-linear-to-r from-indigo-500 to-sky-400" :style="{ width: avgProgress + '%' }"></div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Completed</p>
        <p class="text-[2rem] font-extrabold font-mono leading-none mb-1">
          {{ projects.filter(p => p.status === 'completed').length }}
        </p>
        <p class="text-xs text-slate-400">This year</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode    = ref('grid')
const activeFilter = ref('all')

const filters = [
  { key: 'all',       label: 'All',       count: 8 },
  { key: 'active',    label: 'Active',    count: 4 },
  { key: 'planning',  label: 'Planning',  count: 2 },
  { key: 'review',    label: 'In Review', count: 1 },
  { key: 'completed', label: 'Completed', count: 1 },
]

const members = {
  amir:    { name: 'Amir Karimov',     initials: 'AK', color: '#6366f1' },
  nodira:  { name: 'Nodira Yusupova',  initials: 'NY', color: '#0ea5e9' },
  bekzod:  { name: 'Bekzod Toshev',    initials: 'BT', color: '#10b981' },
  malika:  { name: 'Malika Rahimova',  initials: 'MR', color: '#f59e0b' },
  jasur:   { name: 'Jasur Mirzayev',   initials: 'JM', color: '#ec4899' },
  dilnoza: { name: 'Dilnoza Ergasheva',initials: 'DE', color: '#8b5cf6' },
}

const projects = ref([
  {
    id: 1,
    name: 'Full-Stack Bootcamp v3',
    description: 'Revamped 6-month bootcamp covering React, Node.js, PostgreSQL and cloud deployment with real-world capstone projects.',
    icon: '🚀',
    color: '#6366f1',
    status: 'active',
    progress: 72,
    tags: ['React', 'Node.js', 'PostgreSQL'],
    deadline: 'Apr 15',
    tasks: { done: 18, total: 25 },
    members: [members.amir, members.nodira, members.malika],
  },
  {
    id: 2,
    name: 'Data Science Curriculum',
    description: 'End-to-end data science track with Python, Pandas, machine learning fundamentals and Kaggle competition prep.',
    icon: '📊',
    color: '#0ea5e9',
    status: 'active',
    progress: 55,
    tags: ['Python', 'ML', 'Pandas'],
    deadline: 'May 01',
    tasks: { done: 11, total: 20 },
    members: [members.nodira, members.bekzod],
  },
  {
    id: 3,
    name: 'Cybersecurity Lab Setup',
    description: 'Building an on-premise ethical hacking lab environment with Kali Linux, CTF challenges and penetration testing modules.',
    icon: '🔐',
    color: '#10b981',
    status: 'active',
    progress: 40,
    tags: ['Kali Linux', 'CTF', 'Pentesting'],
    deadline: 'Jun 10',
    tasks: { done: 8, total: 20 },
    members: [members.bekzod, members.dilnoza],
  },
  {
    id: 4,
    name: 'UI/UX Design Track',
    description: 'Comprehensive design programme covering Figma, design systems, user research and portfolio-ready case studies.',
    icon: '🎨',
    color: '#f59e0b',
    status: 'active',
    progress: 88,
    tags: ['Figma', 'Design Systems', 'UX Research'],
    deadline: 'Mar 20',
    tasks: { done: 22, total: 25 },
    members: [members.malika, members.jasur],
  },
  {
    id: 5,
    name: 'Mobile Dev with Flutter',
    description: 'Cross-platform mobile development course producing production-ready iOS and Android apps using Flutter and Dart.',
    icon: '📱',
    color: '#ec4899',
    status: 'planning',
    progress: 15,
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
    deadline: 'Jul 01',
    tasks: { done: 3, total: 20 },
    members: [members.jasur, members.amir],
  },
  {
    id: 6,
    name: 'DevOps & Cloud Essentials',
    description: 'Hands-on DevOps course covering Docker, Kubernetes, CI/CD pipelines and AWS fundamentals for developers.',
    icon: '☁️',
    color: '#8b5cf6',
    status: 'planning',
    progress: 10,
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    deadline: 'Aug 15',
    tasks: { done: 2, total: 18 },
    members: [members.dilnoza, members.bekzod, members.nodira],
  },
  {
    id: 7,
    name: 'Student Portal Redesign',
    description: 'Redesigning the internal student management portal with a modern stack, real-time notifications and mobile support.',
    icon: '🖥️',
    color: '#14b8a6',
    status: 'review',
    progress: 93,
    tags: ['Nuxt', 'Tailwind', 'Supabase'],
    deadline: 'Mar 05',
    tasks: { done: 28, total: 30 },
    members: [members.amir, members.malika, members.dilnoza, members.jasur],
  },
  {
    id: 8,
    name: 'IT Olympiad Preparation',
    description: 'Structured programme preparing top students for national and international programming olympiads and hackathons.',
    icon: '🏆',
    color: '#f97316',
    status: 'completed',
    progress: 100,
    tags: ['Algorithms', 'Competitive Programming'],
    deadline: 'Feb 10',
    tasks: { done: 30, total: 30 },
    members: [members.bekzod, members.nodira, members.amir],
  },
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter(p => p.status === activeFilter.value)
})

const avgProgress = computed(() =>
  Math.round(projects.value.reduce((a, p) => a + p.progress, 0) / projects.value.length)
)

onMounted(()=>{
  const router = useRouter()
})
</script>