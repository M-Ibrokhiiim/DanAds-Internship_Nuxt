<template>
    <main>
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
    </main>
</template>
<script setup lang="ts">


const members = {
  amir:    { name: 'Amir Karimov',     initials: 'AK', color: '#6366f1' },
  nodira:  { name: 'Nodira Yusupova',  initials: 'NY', color: '#0ea5e9' },
  bekzod:  { name: 'Bekzod Toshev',    initials: 'BT', color: '#10b981' },
  malika:  { name: 'Malika Rahimova',  initials: 'MR', color: '#f59e0b' },
  jasur:   { name: 'Jasur Mirzayev',   initials: 'JM', color: '#ec4899' },
  dilnoza: { name: 'Dilnoza Ergasheva',initials: 'DE', color: '#8b5cf6' },
}

const avgProgress = computed(() =>
  Math.round(projects.value.reduce((a, p) => a + p.progress, 0) / projects.value.length)
)


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

</script>