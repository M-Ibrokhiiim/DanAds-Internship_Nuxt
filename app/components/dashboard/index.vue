<template>
  <div class="bg-[#f8f9fc] overflow-scroll w-[84vw] h-[85vh]   text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Good morning, Director</p>
        <h1 class="text-[1.6rem] font-bold m-0">
          Overview <span class="text-indigo-500">·</span> {{ currentDate }}
        </h1>
      </div>
      <div class="flex gap-3">
        <button class="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">
          Export Report
        </button>
        <button class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
          + New Announcement
        </button>
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
        >
          {{ kpi.icon }}
        </div>
        <div class="flex-1">
          <span class="block text-2xl font-bold leading-tight">{{ kpi.value }}</span>
          <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
        </div>
        <div
          class="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
          :class="kpi.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
        >
          {{ kpi.trend > 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
        </div>
      </div>
    </div>

    <div class="grid gap-5 mb-5" style="grid-template-columns: 1fr 380px;">

      <div class="bg-white rounded-2xl p-6 border border-slate-100">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-base font-bold m-0">Teachers</h2>
          <div class="flex gap-1 bg-slate-100 rounded-lg p-0.5">
            <button
              v-for="tab in ['All', 'Active', 'On Leave']"
              :key="tab"
              class="px-3 py-1 rounded-md text-xs font-semibold border-none cursor-pointer transition-all"
              :class="teacherTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'bg-transparent text-slate-500'"
              @click="teacherTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </div>
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Teacher</th>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Specialization</th>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Students</th>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Courses</th>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Rating</th>
              <th class="text-left pb-3 px-3 text-[0.72rem] uppercase tracking-wider text-slate-400 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in filteredTeachers"
              :key="t.id"
              class="border-t border-slate-100 hover:bg-[#fafbff] transition-colors"
            >
              <td class="py-3 px-3 align-middle">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                    :style="{ background: t.color }"
                  >
                    {{ t.initials }}
                  </div>
                  <div>
                    <p class="font-semibold m-0 text-[0.87rem]">{{ t.name }}</p>
                    <p class="text-slate-400 m-0 text-xs">{{ t.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-3 align-middle">
                <span class="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                  {{ t.spec }}
                </span>
              </td>
              <td class="py-3 px-3 align-middle">
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-[0.9rem] w-6">{{ t.students }}</span>
                  <div class="flex-1 h-1.5 bg-slate-100 rounded-full min-w-12.5">
                    <div
                      class="h-full rounded-full"
                      :style="{ width: (t.students / 30 * 100) + '%', background: t.color }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-3 align-middle text-sm">{{ t.courses }}</td>
              <td class="py-3 px-3 align-middle">
                <div class="flex items-center gap-px">
                  <span
                    v-for="s in 5"
                    :key="s"
                    class="text-xs"
                    :class="s <= Math.round(t.rating) ? 'text-amber-400' : 'text-slate-200'"
                  >★</span>
                  <span class="ml-1 text-xs font-semibold text-slate-500">{{ t.rating }}</span>
                </div>
              </td>
              <td class="py-3 px-3 align-middle">
                <span
                  class="px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold capitalize"
                  :class="{
                    'bg-green-100 text-green-700': t.status === 'active',
                    'bg-amber-100 text-amber-700': t.status === 'on-leave'
                  }"
                >
                  {{ t.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl p-6 border border-slate-100">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-base font-bold m-0">Students per Teacher</h2>
            <span class="text-xs text-slate-400 font-medium">{{ totalStudents }} total</span>
          </div>
          <div class="flex flex-col gap-2.5">
            <div v-for="t in teachers" :key="t.id" class="flex items-center gap-3">
              <div class="flex items-center gap-1.5 w-22.5 shrink-0">
                <div
                  class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[0.68rem] shrink-0"
                  :style="{ background: t.color }"
                >
                  {{ t.initials }}
                </div>
                <span class="text-xs font-semibold truncate">{{ t.name.split(' ')[0] }}</span>
              </div>
              <div class="flex-1 flex items-center gap-2">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :style="{ width: (t.students / maxStudents * 100) + '%', background: t.color }"
                  ></div>
                </div>
                <span class="text-xs font-bold text-slate-500 w-5 text-right">{{ t.students }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-100">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-base font-bold m-0">Recent Enrollments</h2>
            <button class="bg-transparent border-none text-indigo-500 text-xs font-semibold cursor-pointer">
              View all →
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <div
              v-for="s in recentStudents"
              :key="s.id"
              class="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-none"
            >
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[0.68rem] shrink-0"
                :style="{ background: s.color }"
              >
                {{ s.initials }}
              </div>
              <div class="flex-1">
                <p class="font-semibold m-0 text-[0.87rem]">{{ s.name }}</p>
                <p class="text-slate-400 m-0 text-xs">{{ s.course }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-400 m-0 mb-0.5">{{ s.date }}</p>
                <span class="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold">new</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white rounded-2xl p-6 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Avg Students / Teacher</p>
        <p class="text-[2.2rem] font-extrabold font-mono leading-none mb-1">{{ avgStudents }}</p>
        <p class="text-xs text-slate-400 m-0">Recommended max: 25</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Course Completion Rate</p>
        <p class="text-[2.2rem] font-extrabold font-mono leading-none mb-1">
          84<span class="text-xl font-semibold">%</span>
        </p>
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
          <div class="h-full rounded-full bg-linear-to-r from-indigo-500 to-sky-400" style="width: 84%"></div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Active IT Courses</p>
        <p class="text-[2.2rem] font-extrabold font-mono leading-none mb-1">12</p>
        <p class="text-xs text-slate-400 m-0">3 starting next week</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-100">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Certificates Issued</p>
        <p class="text-[2.2rem] font-extrabold font-mono leading-none mb-1">248</p>
        <p class="text-xs text-slate-400 m-0">↑ 18% this quarter</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const teacherTab = ref('All')

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
)

const teachers = ref([
  { id: 1, name: 'Amir Karimov',     email: 'a.karimov@edu.uz',   initials: 'AK', color: '#6366f1', spec: 'Full-Stack Dev',  students: 28, courses: 4, rating: 4.9, status: 'active'   },
  { id: 2, name: 'Nodira Yusupova',  email: 'n.yusupova@edu.uz',  initials: 'NY', color: '#0ea5e9', spec: 'Data Science',    students: 22, courses: 3, rating: 4.7, status: 'active'   },
  { id: 3, name: 'Bekzod Toshev',    email: 'b.toshev@edu.uz',    initials: 'BT', color: '#10b981', spec: 'Cybersecurity',   students: 19, courses: 2, rating: 4.5, status: 'active'   },
  { id: 4, name: 'Malika Rahimova',  email: 'm.rahimova@edu.uz',  initials: 'MR', color: '#f59e0b', spec: 'UI/UX Design',    students: 25, courses: 3, rating: 4.8, status: 'active'   },
  { id: 5, name: 'Jasur Mirzayev',   email: 'j.mirzayev@edu.uz',  initials: 'JM', color: '#ec4899', spec: 'Mobile Dev',      students: 17, courses: 2, rating: 4.3, status: 'on-leave' },
  { id: 6, name: 'Dilnoza Ergasheva',email: 'd.ergasheva@edu.uz', initials: 'DE', color: '#8b5cf6', spec: 'DevOps / Cloud',  students: 21, courses: 3, rating: 4.6, status: 'active'   },
])

const filteredTeachers = computed(() => {
  if (teacherTab.value === 'Active')   return teachers.value.filter(t => t.status === 'active')
  if (teacherTab.value === 'On Leave') return teachers.value.filter(t => t.status === 'on-leave')
  return teachers.value
})

const totalStudents = computed(() => teachers.value.reduce((a, t) => a + t.students, 0))
const maxStudents   = computed(() => Math.max(...teachers.value.map(t => t.students)))
const avgStudents   = computed(() => Math.round(totalStudents.value / teachers.value.length))

const kpis = ref([
  { label: 'Total Students', value: '132', icon: '🎓', bg: '#eef2ff', trend: 12 },
  { label: 'Total Teachers', value: '6',   icon: '👨‍🏫', bg: '#f0fdf4', trend: 0  },
  { label: 'Active Courses', value: '12',  icon: '💻', bg: '#fff7ed', trend: 8  },
  { label: 'Avg Rating',     value: '4.6', icon: '⭐', bg: '#fdf4ff', trend: 3  },
])

const recentStudents = ref([
  { id: 1, name: 'Sherzod Alimov',    course: 'Full-Stack Dev', date: 'Feb 25', initials: 'SA', color: '#6366f1' },
  { id: 2, name: 'Gulnora Hasanova',  course: 'UI/UX Design',   date: 'Feb 24', initials: 'GH', color: '#ec4899' },
  { id: 3, name: 'Otabek Normatov',   course: 'Data Science',   date: 'Feb 23', initials: 'ON', color: '#0ea5e9' },
  { id: 4, name: 'Feruza Yoldosheva', course: 'Cybersecurity',  date: 'Feb 22', initials: 'FY', color: '#10b981' },
  { id: 5, name: 'Ulugbek Sobirov',   course: 'Mobile Dev',     date: 'Feb 21', initials: 'US', color: '#f59e0b' },
])
</script>