<template>
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

</template>
<script setup lang="ts">
const teachers = ref([
  { id: 1, name: 'Amir Karimov',     email: 'a.karimov@edu.uz',   initials: 'AK', color: '#6366f1', spec: 'Full-Stack Dev',  students: 28, courses: 4, rating: 4.9, status: 'active'   },
  { id: 2, name: 'Nodira Yusupova',  email: 'n.yusupova@edu.uz',  initials: 'NY', color: '#0ea5e9', spec: 'Data Science',    students: 22, courses: 3, rating: 4.7, status: 'active'   },
  { id: 3, name: 'Bekzod Toshev',    email: 'b.toshev@edu.uz',    initials: 'BT', color: '#10b981', spec: 'Cybersecurity',   students: 19, courses: 2, rating: 4.5, status: 'active'   },
  { id: 4, name: 'Malika Rahimova',  email: 'm.rahimova@edu.uz',  initials: 'MR', color: '#f59e0b', spec: 'UI/UX Design',    students: 25, courses: 3, rating: 4.8, status: 'active'   },
  { id: 5, name: 'Jasur Mirzayev',   email: 'j.mirzayev@edu.uz',  initials: 'JM', color: '#ec4899', spec: 'Mobile Dev',      students: 17, courses: 2, rating: 4.3, status: 'on-leave' },
  { id: 6, name: 'Dilnoza Ergasheva',email: 'd.ergasheva@edu.uz', initials: 'DE', color: '#8b5cf6', spec: 'DevOps / Cloud',  students: 21, courses: 3, rating: 4.6, status: 'active'   },
])
const totalStudents = computed(() => teachers.value.reduce((a, t) => a + t.students, 0)) 
const avgStudents   = computed(() => Math.round(totalStudents.value / teachers.value.length))
</script>