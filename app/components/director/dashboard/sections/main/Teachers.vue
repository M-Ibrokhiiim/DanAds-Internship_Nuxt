<template>
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

</template>
<script setup lang="ts">
const teacherTab = ref('All')


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


</script>