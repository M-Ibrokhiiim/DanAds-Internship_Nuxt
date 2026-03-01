<template>
  <div class="flex min-h-screen bg-[#f8f9fc] font-sans">

    <aside class="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 bottom-0 z-20">

      <div class="px-6 py-5 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
            <span class="text-white font-bold text-sm">IT</span>
          </div>
          <div>
            <p class="font-bold text-sm text-slate-900 leading-tight">IT Academy</p>
            <p class="text-[0.68rem] text-slate-400">Director Panel</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-3 py-4 flex flex-col gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="goToPage(item.id)"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left border-none cursor-pointer transition-all duration-150"
          :class="id === item.id
            ? 'bg-indigo-50 text-indigo-600 font-semibold'
            : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
        >
          <span
            class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 transition-all"
            :class="id === item.id ? 'bg-indigo-100' : 'bg-slate-100'"
          >{{ item.icon }}</span>
          {{ item.label }}
          <span
            v-if="id === item.id"
            class="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
          ></span>
        </button>
      </nav>

      <div class="px-4 py-4 border-t border-slate-100">
        <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
          <div class="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            IM
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-slate-800 truncate">Ibrokhim Muysinov</p>
            <p class="text-[0.65rem] text-slate-400 truncate">Director</p>
          </div>
          <span class="text-slate-300 text-xs">⚙</span>
        </div>
      </div>
    </aside>

    <div class="flex flex-col flex-1 ml-64">

      <header class="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-999">
        <div class="flex items-center gap-2">
          <span class="text-slate-300 text-xs">Director Panel</span>
          <!-- <span class="text-slate-300">/</span> -->
          <span class="text-sm font-semibold text-slate-700 -ml-1 lowercase">{{  userPath }}</span>
        </div>
        <div class="flex items-center gap-3">
          <button class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-200 transition-all text-sm">
            🔔
          </button>
          <div class="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer">
            IM
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-auto">
        <!-- <NuxtPage /> -->
         <slot/> 
      </main>

      <footer class="h-12 bg-white border-t border-slate-100 flex items-center justify-center">
        <p class="text-xs text-slate-400">© 2026 IT Academy. All rights reserved.</p>
      </footer>
    </div>

  </div>
</template>

<script setup lang="ts">
const id = ref<number>(1)
const router = useRouter()
const route = useRoute()
const pathObj = ref({url1:'', url2:''})

const userPath = computed(()=>{
  if(route.path === '/director/dashboard'){
     pathObj.value.url1 = 'director'
     pathObj.value.url2 = 'dashboard'

     return ` / ${pathObj.value.url1} / ${pathObj.value.url2}`
  }else if(route.path === '/director/projects'){
     pathObj.value.url1 = 'director'
     pathObj.value.url2 = 'projects'

     return ` / ${pathObj.value.url1} / ${pathObj.value.url2}`
  }else{
     pathObj.value.url1 = 'director'
     pathObj.value.url2 = 'settings'

     return ` / ${pathObj.value.url1} / ${pathObj.value.url2}`
  }
})

const navItems = [
  { id: 1, label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 2, label: 'Projects',  icon: '🚀', path: '/projects'  },
  { id: 3, label: 'Settings',  icon: '⚙️', path: '/settings'  },
]

function goToPage(pageNumber: number) {
  switch (pageNumber) {
    case 1: router.push('/director/dashboard'); break
    case 2: router.push('/director/projects');  break
    case 3: router.push('/director/settings');  break
  }
  id.value = pageNumber
}

 

</script>