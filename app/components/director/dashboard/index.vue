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
const router = useRouter() 

onMounted(()=>{
    router.push('/director/dashboard')
})
</script>