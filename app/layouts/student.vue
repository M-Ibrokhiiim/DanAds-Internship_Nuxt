<template>
  <div class="flex min-h-screen bg-[#f0f4ff] font-sans">

    <aside class="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 bottom-0 z-20 shadow-sm">

      <div class="px-6 py-5 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-md">
            <span class="text-white font-black text-sm">S</span>
          </div>
          <div>
            <p class="font-bold text-sm text-slate-900 leading-tight">Student Portal</p>
            <p class="text-[0.65rem] text-slate-400">IT Academy</p>
          </div>
        </div>
      </div>

      <div class="px-4 py-4 border-b border-slate-100">
        <div class="flex items-center gap-3 bg-slate-50 rounded-2xl px-3 py-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-sm shrink-0">
            SA
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">Sherzod Alimov</p>
            <p class="text-[0.63rem] text-slate-400 truncate">Full-Stack Dev · Batch 3</p>
          </div>
          <div class="w-2 h-2 bg-green-400 rounded-full shrink-0 ring-2 ring-green-100"></div>
        </div>
      </div>

      <nav class="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p class="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Menu</p>

        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 no-underline group"
          :class="$route.path === item.href
            ? 'bg-indigo-50 text-indigo-600 font-semibold'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
        >
          <span
            class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 transition-all"
            :class="$route.path === item.href ? 'bg-indigo-100' : 'bg-slate-100 group-hover:bg-slate-200'"
          >{{ item.icon }}</span>
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="text-[0.6rem] font-black px-1.5 py-0.5 rounded-full"
            :class="$route.path === item.href ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-200 text-slate-500'"
          >{{ item.badge }}</span>
          <span v-if="$route.path === item.href" class="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
        </NuxtLink>

        <p class="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4">Account</p>

        <NuxtLink
          v-for="item in accountItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 no-underline group"
          :class="$route.path === item.href
            ? 'bg-indigo-50 text-indigo-600 font-semibold'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'"
        >
          <span
            class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 transition-all"
            :class="$route.path === item.href ? 'bg-indigo-100' : 'bg-slate-100 group-hover:bg-slate-200'"
          >{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="px-4 py-4 border-t border-slate-100">
        <NuxtLink
          to="/student/logout"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all no-underline group w-full"
        >
          <span class="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-base shrink-0 transition-all">🚪</span>
          Logout
        </NuxtLink>
      </div>
    </aside>

    <div class="flex flex-col flex-1 ml-64">

      <header class="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 text-xs text-slate-400">
            <span>IT Academy</span>
            <span class="text-slate-300">/</span>
            <span class="font-semibold text-slate-700">{{ pageTitle }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="relative">
            <button class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-200 transition-all text-sm">
              🔍
            </button>
          </div>
          <div class="relative">
            <button class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-200 transition-all text-sm">
              🔔
            </button>
            <span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[0.55rem] font-black rounded-full flex items-center justify-center">3</span>
          </div>
          <button class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border-none cursor-pointer hover:bg-slate-200 transition-all text-sm">
            💬
          </button>
          <div class="w-px h-6 bg-slate-200 mx-1"></div>
          <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
              SA
            </div>
            <div class="hidden sm:block">
              <p class="text-xs font-bold text-slate-800 leading-tight">Sherzod Alimov</p>
              <p class="text-[0.62rem] text-slate-400">Student</p>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-auto">
        <NuxtPage />
      </main>

      <footer class="h-12 bg-white border-t border-slate-100 flex items-center justify-between px-8">
        <p class="text-xs text-slate-400">© 2026 Student Portal · IT Academy. All rights reserved.</p>
        <p class="text-xs text-slate-400">Batch 3 · Full-Stack Development</p>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'



const route = useRoute()

const navItems = [
  { href: '/student',   label: 'Dashboard',   icon: '📊', badge: null },
  { href: '/student/courses',     label: 'Courses',     icon: '📚', badge: '4'  },
  { href: '/student/assignments', label: 'Assignments', icon: '📝', badge: '3'  },
  { href: '/student/grades',      label: 'Grades',      icon: '🎯', badge: null },
  { href: '/student/schedules',    label: 'Schedule',    icon: '🗓️', badge: null },
  { href: '/student/messages',    label: 'Messages',    icon: '💬', badge: '2'  },
]
console.log(typeof (navItems[0]?.icon))
const accountItems = [
  { href: '/student/profile',  label: 'My Profile', icon: '👤' },
  { href: '/student/settings', label: 'Settings',   icon: '⚙️' },
]

const pageTitles: Record<string, string> = {
  '/student/dashboard':   'Dashboard',
  '/student/courses':     'My Courses',
  '/student/assignments': 'Assignments',
  '/student/grades':      'Grades',
  '/student/schedule':    'Schedule',
  '/student/messages':    'Messages',
  '/student/profile':     'My Profile',
  '/student/settings':    'Settings',
}

const pageTitle = computed(() => pageTitles[route.path] ?? 'Student Portal')
</script>