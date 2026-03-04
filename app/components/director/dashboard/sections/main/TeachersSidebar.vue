<template>
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
</template>

<script setup lang="ts">
const totalStudents = computed(() => teachers.value.reduce((a, t) => a + t.students, 0))
const maxStudents   = computed(() => Math.max(...teachers.value.map(t => t.students)))

const teachers = ref([
  { id: 1, name: 'Amir Karimov',     email: 'a.karimov@edu.uz',   initials: 'AK', color: '#6366f1', spec: 'Full-Stack Dev',  students: 28, courses: 4, rating: 4.9, status: 'active'   },
  { id: 2, name: 'Nodira Yusupova',  email: 'n.yusupova@edu.uz',  initials: 'NY', color: '#0ea5e9', spec: 'Data Science',    students: 22, courses: 3, rating: 4.7, status: 'active'   },
  { id: 3, name: 'Bekzod Toshev',    email: 'b.toshev@edu.uz',    initials: 'BT', color: '#10b981', spec: 'Cybersecurity',   students: 19, courses: 2, rating: 4.5, status: 'active'   },
  { id: 4, name: 'Malika Rahimova',  email: 'm.rahimova@edu.uz',  initials: 'MR', color: '#f59e0b', spec: 'UI/UX Design',    students: 25, courses: 3, rating: 4.8, status: 'active'   },
  { id: 5, name: 'Jasur Mirzayev',   email: 'j.mirzayev@edu.uz',  initials: 'JM', color: '#ec4899', spec: 'Mobile Dev',      students: 17, courses: 2, rating: 4.3, status: 'on-leave' },
  { id: 6, name: 'Dilnoza Ergasheva',email: 'd.ergasheva@edu.uz', initials: 'DE', color: '#8b5cf6', spec: 'DevOps / Cloud',  students: 21, courses: 3, rating: 4.6, status: 'active'   },
])


const recentStudents = ref([
  { id: 1, name: 'Sherzod Alimov',    course: 'Full-Stack Dev', date: 'Feb 25', initials: 'SA', color: '#6366f1' },
  { id: 2, name: 'Gulnora Hasanova',  course: 'UI/UX Design',   date: 'Feb 24', initials: 'GH', color: '#ec4899' },
  { id: 3, name: 'Otabek Normatov',   course: 'Data Science',   date: 'Feb 23', initials: 'ON', color: '#0ea5e9' },
  { id: 4, name: 'Feruza Yoldosheva', course: 'Cybersecurity',  date: 'Feb 22', initials: 'FY', color: '#10b981' },
  { id: 5, name: 'Ulugbek Sobirov',   course: 'Mobile Dev',     date: 'Feb 21', initials: 'US', color: '#f59e0b' },
])

</script>