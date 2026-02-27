<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">Grades</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            v-for="term in ['All Terms', 'Term 1', 'Term 2', 'Term 3']"
            :key="term"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all"
            :class="activeTerm === term ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400 hover:text-slate-700'"
            @click="activeTerm = term"
          >{{ term }}</button>
        </div>
        <button class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2">
          ⬇ Export
        </button>
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
          <span class="block text-2xl font-bold leading-tight" :style="{ color: kpi.color || '' }">{{ kpi.value }}</span>
          <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-5 mb-5" style="grid-template-columns: 1fr 320px;">

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-base font-bold m-0">Course Grades</h2>
            <span class="text-xs text-slate-400">Sorted by course</span>
          </div>

          <div class="flex flex-col gap-4">
            <div
              v-for="course in grades"
              :key="course.id"
              class="rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                class="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-slate-50 transition-all border-none cursor-pointer text-left"
                @click="course.expanded = !course.expanded"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" :style="{ background: course.color + '18' }">{{ course.icon }}</div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm">{{ course.name }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ course.teacher }} · {{ course.items.length }} graded items</p>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <p class="text-xs text-slate-400 mb-0.5">Average</p>
                    <p class="font-black text-lg leading-none" :style="{ color: course.color }">{{ course.avg }}%</p>
                  </div>
                  <div class="text-center w-12">
                    <span
                      class="block text-base font-black px-2 py-1 rounded-xl"
                      :class="gradeClass(course.avg)"
                    >{{ letterGrade(course.avg) }}</span>
                  </div>
                  <span class="text-slate-300 text-xs transition-transform duration-200" :class="course.expanded ? 'rotate-90' : ''">▶</span>
                </div>
              </button>

              <div v-if="course.expanded" class="border-t border-slate-100">
                <div class="px-5 py-2">
                  <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4 mt-2">
                    <div class="h-full rounded-full transition-all duration-700" :style="{ width: course.avg + '%', background: course.color }"></div>
                  </div>
                </div>
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr class="bg-slate-50">
                      <th class="text-left py-2.5 px-5 text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">Assignment</th>
                      <th class="text-left py-2.5 px-4 text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">Type</th>
                      <th class="text-left py-2.5 px-4 text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">Submitted</th>
                      <th class="text-left py-2.5 px-4 text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">Score</th>
                      <th class="text-left py-2.5 px-4 text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in course.items"
                      :key="item.title"
                      class="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td class="py-3 px-5 align-middle">
                        <p class="text-xs font-semibold">{{ item.title }}</p>
                      </td>
                      <td class="py-3 px-4 align-middle">
                        <span class="text-[0.68rem] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{{ item.type }}</span>
                      </td>
                      <td class="py-3 px-4 align-middle text-xs text-slate-400">{{ item.date }}</td>
                      <td class="py-3 px-4 align-middle">
                        <div class="flex items-center gap-2">
                          <div class="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full rounded-full" :style="{ width: (item.score / item.max * 100) + '%', background: course.color }"></div>
                          </div>
                          <span class="text-xs font-bold text-slate-600">{{ item.score }}/{{ item.max }}</span>
                        </div>
                      </td>
                      <td class="py-3 px-4 align-middle">
                        <span
                          class="text-xs font-black px-2 py-0.5 rounded-lg"
                          :class="gradeClass(item.score / item.max * 100)"
                        >{{ letterGrade(item.score / item.max * 100) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">GPA Breakdown</h2>
          <div class="flex flex-col items-center mb-5">
            <div class="w-28 h-28 rounded-full flex items-center justify-center border-8 border-indigo-100 mb-3" style="border-color: #eef2ff;">
              <div class="text-center">
                <p class="text-3xl font-black text-indigo-600 leading-none">3.8</p>
                <p class="text-[0.6rem] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">GPA</p>
              </div>
            </div>
            <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Dean's List 🎖️</span>
          </div>
          <div class="flex flex-col gap-2.5">
            <div v-for="course in grades" :key="course.id" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full shrink-0" :style="{ background: course.color }"></div>
              <span class="text-xs text-slate-600 flex-1 truncate">{{ course.name.split(' ')[0] }}</span>
              <div class="flex items-center gap-1.5">
                <div class="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: course.avg + '%', background: course.color }"></div>
                </div>
                <span class="text-xs font-bold w-8 text-right" :style="{ color: course.color }">{{ course.avg }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Certificates</h2>
          <div class="flex flex-col gap-3">
            <div
              v-for="cert in certificates"
              :key="cert.name"
              class="rounded-2xl border p-4 transition-all"
              :class="cert.earned ? 'border-green-100 bg-green-50' : 'border-slate-100 opacity-60'"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  :style="{ background: cert.color + '20' }"
                >{{ cert.icon }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold truncate">{{ cert.name }}</p>
                  <p class="text-[0.65rem] text-slate-400 mt-0.5">{{ cert.issued }}</p>
                </div>
                <button
                  v-if="cert.earned"
                  class="text-[0.65rem] font-bold bg-white border border-green-200 text-green-700 px-2 py-1 rounded-lg cursor-pointer hover:bg-green-100 transition-all shrink-0"
                >⬇</button>
                <span v-else class="text-[0.65rem] text-slate-300 italic shrink-0">Pending</span>
              </div>
              <div v-if="!cert.earned" class="mt-2.5">
                <div class="flex justify-between mb-1">
                  <span class="text-[0.62rem] text-slate-400">Progress</span>
                  <span class="text-[0.62rem] font-bold" :style="{ color: cert.color }">{{ cert.progress }}%</span>
                </div>
                <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: cert.progress + '%', background: cert.color }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 class="text-sm font-bold mb-4">Grade Distribution</h2>
          <div class="flex flex-col gap-2">
            <div v-for="g in distribution" :key="g.label" class="flex items-center gap-3">
              <span
                class="text-xs font-black w-8 text-center py-0.5 rounded-lg"
                :class="g.class"
              >{{ g.label }}</span>
              <div class="flex-1 h-5 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  class="h-full rounded-lg flex items-center px-2 transition-all duration-700"
                  :class="g.bar"
                  :style="{ width: (g.count / 12 * 100) + '%' }"
                >
                  <span v-if="g.count > 0" class="text-white text-[0.6rem] font-black">{{ g.count }}</span>
                </div>
              </div>
              <span class="text-xs text-slate-400 w-8 text-right">{{ g.count }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTerm = ref('All Terms')

const kpis = ref([
  { label: 'Overall GPA',     value: '3.8',  icon: '🎯', bg: '#eef2ff', color: '#6366f1' },
  { label: 'Highest Score',   value: '97%',  icon: '🏆', bg: '#f0fdf4', color: '#16a34a' },
  { label: 'Graded Items',    value: '18',   icon: '📝', bg: '#fff7ed', color: ''        },
  { label: 'Certificates',    value: '3',    icon: '🎓', bg: '#fdf4ff', color: ''        },
])

const grades = ref([
  {
    id: 1, name: 'Full-Stack Development', teacher: 'Amir Karimov',
    icon: '🚀', color: '#6366f1', avg: 88, expanded: true,
    items: [
      { title: 'HTML & CSS Project',        type: 'Project',    date: 'Jan 10', score: 97,  max: 100 },
      { title: 'JavaScript Quiz',           type: 'Quiz',       date: 'Jan 24', score: 84,  max: 100 },
      { title: 'React Todo App',            type: 'Project',    date: 'Feb 5',  score: 91,  max: 100 },
      { title: 'Node.js Midterm',           type: 'Exam',       date: 'Feb 14', score: 79,  max: 100 },
    ],
  },
  {
    id: 2, name: 'Data Science', teacher: 'Nodira Yusupova',
    icon: '📊', color: '#0ea5e9', avg: 83, expanded: false,
    items: [
      { title: 'NumPy Lab',                 type: 'Lab',        date: 'Jan 18', score: 88,  max: 100 },
      { title: 'Pandas EDA Assignment',     type: 'Assignment', date: 'Feb 2',  score: 76,  max: 100 },
      { title: 'Statistics Quiz',           type: 'Quiz',       date: 'Feb 20', score: 85,  max: 100 },
    ],
  },
  {
    id: 3, name: 'UI/UX Design', teacher: 'Malika Rahimova',
    icon: '🎨', color: '#f59e0b', avg: 94, expanded: false,
    items: [
      { title: 'Wireframe Submission',      type: 'Project',    date: 'Jan 15', score: 92,  max: 100 },
      { title: 'Figma Prototype',           type: 'Project',    date: 'Jan 30', score: 96,  max: 100 },
      { title: 'UX Research Report',        type: 'Report',     date: 'Feb 12', score: 93,  max: 100 },
      { title: 'Final Portfolio',           type: 'Project',    date: 'Feb 22', score: 95,  max: 100 },
    ],
  },
  {
    id: 4, name: 'DevOps Essentials', teacher: 'Dilnoza Ergasheva',
    icon: '☁️', color: '#8b5cf6', avg: 80, expanded: false,
    items: [
      { title: 'Docker Lab',                type: 'Lab',        date: 'Feb 8',  score: 76,  max: 80  },
      { title: 'Linux Commands Quiz',       type: 'Quiz',       date: 'Feb 17', score: 68,  max: 80  },
    ],
  },
])

const certificates = ref([
  { name: 'HTML & CSS Mastery',      icon: '🌐', color: '#6366f1', earned: true,  issued: 'Issued Jan 20, 2026',  progress: 100 },
  { name: 'JavaScript Fundamentals', icon: '⚡', color: '#f59e0b', earned: true,  issued: 'Issued Feb 5, 2026',   progress: 100 },
  { name: 'UI/UX Design Certificate',icon: '🎨', color: '#ec4899', earned: true,  issued: 'Issued Feb 24, 2026',  progress: 100 },
  { name: 'Full-Stack Developer',    icon: '🚀', color: '#6366f1', earned: false, issued: 'Expected Apr 2026',    progress: 72  },
  { name: 'Data Science Analyst',    icon: '📊', color: '#0ea5e9', earned: false, issued: 'Expected May 2026',    progress: 30  },
])

const distribution = ref([
  { label: 'A+', count: 3,  class: 'bg-green-100 text-green-700',  bar: 'bg-green-500'  },
  { label: 'A',  count: 5,  class: 'bg-green-100 text-green-600',  bar: 'bg-green-400'  },
  { label: 'B+', count: 4,  class: 'bg-blue-100  text-blue-700',   bar: 'bg-blue-500'   },
  { label: 'B',  count: 3,  class: 'bg-blue-100  text-blue-600',   bar: 'bg-blue-400'   },
  { label: 'C+', count: 2,  class: 'bg-amber-100 text-amber-700',  bar: 'bg-amber-400'  },
  { label: 'C',  count: 1,  class: 'bg-red-100   text-red-600',    bar: 'bg-red-400'    },
])

function letterGrade(pct) {
  if (pct >= 97) return 'A+'
  if (pct >= 90) return 'A'
  if (pct >= 85) return 'B+'
  if (pct >= 80) return 'B'
  if (pct >= 75) return 'C+'
  if (pct >= 70) return 'C'
  return 'D'
}

function gradeClass(pct) {
  if (pct >= 90) return 'bg-green-100 text-green-700'
  if (pct >= 80) return 'bg-blue-100 text-blue-700'
  if (pct >= 70) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-600'
}
</script>