<template>
  <div class="bg-[#f8f9fc] overflow-scroll w-[82vw] h-[85vh]   text-slate-900 p-8 font-sans">
   
    <header >
        <DirectorDashboardHeader/>
    </header>

    <main class="grid gap-5 mb-5" style="grid-template-columns: 1fr 380px;">
       <DirectorDashboardMain/>
    </main>
     
    <footer>
        <DirectorDashboardFooter/>
    </footer>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const router = useRouter()
const teacherTab = ref('All') // header


const teachers = ref([
  { id: 1, name: 'Amir Karimov',     email: 'a.karimov@edu.uz',   initials: 'AK', color: '#6366f1', spec: 'Full-Stack Dev',  students: 28, courses: 4, rating: 4.9, status: 'active'   },
  { id: 2, name: 'Nodira Yusupova',  email: 'n.yusupova@edu.uz',  initials: 'NY', color: '#0ea5e9', spec: 'Data Science',    students: 22, courses: 3, rating: 4.7, status: 'active'   },
  { id: 3, name: 'Bekzod Toshev',    email: 'b.toshev@edu.uz',    initials: 'BT', color: '#10b981', spec: 'Cybersecurity',   students: 19, courses: 2, rating: 4.5, status: 'active'   },
  { id: 4, name: 'Malika Rahimova',  email: 'm.rahimova@edu.uz',  initials: 'MR', color: '#f59e0b', spec: 'UI/UX Design',    students: 25, courses: 3, rating: 4.8, status: 'active'   },
  { id: 5, name: 'Jasur Mirzayev',   email: 'j.mirzayev@edu.uz',  initials: 'JM', color: '#ec4899', spec: 'Mobile Dev',      students: 17, courses: 2, rating: 4.3, status: 'on-leave' },
  { id: 6, name: 'Dilnoza Ergasheva',email: 'd.ergasheva@edu.uz', initials: 'DE', color: '#8b5cf6', spec: 'DevOps / Cloud',  students: 21, courses: 3, rating: 4.6, status: 'active'   },
]) // footer

const filteredTeachers = computed(() => {
  if (teacherTab.value === 'Active')   return teachers.value.filter(t => t.status === 'active')
  if (teacherTab.value === 'On Leave') return teachers.value.filter(t => t.status === 'on-leave')
  return teachers.value
})  // main

const totalStudents = computed(() => teachers.value.reduce((a, t) => a + t.students, 0)) // main, footer
const maxStudents   = computed(() => Math.max(...teachers.value.map(t => t.students)))// main




const recentStudents = ref([
  { id: 1, name: 'Sherzod Alimov',    course: 'Full-Stack Dev', date: 'Feb 25', initials: 'SA', color: '#6366f1' },
  { id: 2, name: 'Gulnora Hasanova',  course: 'UI/UX Design',   date: 'Feb 24', initials: 'GH', color: '#ec4899' },
  { id: 3, name: 'Otabek Normatov',   course: 'Data Science',   date: 'Feb 23', initials: 'ON', color: '#0ea5e9' },
  { id: 4, name: 'Feruza Yoldosheva', course: 'Cybersecurity',  date: 'Feb 22', initials: 'FY', color: '#10b981' },
  { id: 5, name: 'Ulugbek Sobirov',   course: 'Mobile Dev',     date: 'Feb 21', initials: 'US', color: '#f59e0b' },
]) // main

onMounted(()=>{
    router.push('/director/dashboard')
})
</script>