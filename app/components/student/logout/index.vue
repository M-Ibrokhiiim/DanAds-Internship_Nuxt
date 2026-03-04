<template>
  <div class="min-h-screen bg-[#f0f4ff] flex items-center justify-center font-sans p-6">

    <div class="w-full max-w-md">

      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span class="text-white font-black text-xl">S</span>
        </div>
        <p class="text-xs text-slate-400 uppercase tracking-widest">IT Academy</p>
      </div>

      <div v-if="!loggedOut" class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

        <div class="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-violet-500"></div>

        <div class="p-8">

          <div class="flex flex-col items-center text-center mb-8">
            <div class="relative mb-4">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
                SA
              </div>
              <div class="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 class="font-bold text-lg text-slate-900">Sherzod Alimov</h2>
            <p class="text-xs text-slate-400 mt-0.5">Full-Stack Dev · Batch 3</p>
            <span class="mt-2 bg-indigo-50 text-indigo-600 text-[0.68rem] font-bold px-3 py-1 rounded-full">
              Session active for {{ sessionTime }}
            </span>
          </div>

          <div class="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3.5 flex gap-3 mb-6">
            <span class="text-amber-500 text-lg shrink-0 mt-0.5">⚠️</span>
            <div>
              <p class="text-xs font-bold text-amber-800 mb-0.5">Before you go</p>
              <p class="text-xs text-amber-700 leading-relaxed">Make sure you've saved any unsaved work. Your active session will be terminated and you'll need to log in again.</p>
            </div>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 mb-6">
            <p class="text-[0.68rem] uppercase tracking-wider text-slate-400 font-semibold mb-3">Session Summary</p>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div>
                <p class="text-sm font-bold text-slate-800">{{ sessionTime }}</p>
                <p class="text-[0.65rem] text-slate-400">Time Active</p>
              </div>
              <div class="border-x border-slate-200">
                <p class="text-sm font-bold text-slate-800">4</p>
                <p class="text-[0.65rem] text-slate-400">Pages Visited</p>
              </div>
              <div>
                <p class="text-sm font-bold text-slate-800">{{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</p>
                <p class="text-[0.65rem] text-slate-400">Today</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <button
              class="w-full py-3 rounded-2xl text-sm font-bold text-white border-none cursor-pointer transition-all bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 active:scale-95"
              @click="handleLogout"
              :disabled="loading"
            >
              <span v-if="!loading">🚪 Yes, Log Me Out</span>
              <span v-else class="flex items-center justify-center gap-2">
                <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                Logging out...
              </span>
            </button>
            <button
              class="w-full py-3 rounded-2xl text-sm font-bold text-slate-600 bg-slate-100 border-none cursor-pointer hover:bg-slate-200 transition-all active:scale-95"
              @click="goBack"
              :disabled="loading"
            >
              ← Stay Logged In
            </button>
          </div>

        </div>
      </div>

      <div v-else class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="h-1.5 w-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
        <div class="p-10 flex flex-col items-center text-center">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-5">
            ✅
          </div>
          <h2 class="font-bold text-lg text-slate-900 mb-2">You're logged out</h2>
          <p class="text-xs text-slate-400 leading-relaxed mb-6 max-w-xs">
            Your session has been safely terminated. See you next time, <span class="font-semibold text-slate-600">Sherzod</span>! 👋
          </p>
          <div class="bg-slate-50 rounded-2xl px-5 py-3 mb-6 text-center">
            <p class="text-xs text-slate-400">Redirecting to login in</p>
            <p class="text-3xl font-black text-indigo-600 leading-none mt-1">{{ countdown }}</p>
            <p class="text-xs text-slate-400 mt-0.5">seconds</p>
          </div>
          <button
            class="w-full py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 border-none cursor-pointer hover:opacity-90 transition-all"
            @click="goToLogin"
          >
            Go to Login Now →
          </button>
        </div>
      </div>

      <p class="text-center text-xs text-slate-400 mt-6">
        © 2026 IT Academy · Student Portal
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const router   = useRouter()
const loading  = ref(false)
const loggedOut = ref(false)
const countdown = ref(5)

const startTime    = ref(Date.now())
const sessionTime  = ref('0m 0s')
let sessionTimer: ReturnType<typeof setInterval>
let countdownTimer: ReturnType<typeof setInterval>

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
}

onMounted(() => {
  sessionTimer = setInterval(() => {
    sessionTime.value = formatDuration(Date.now() - startTime.value)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(sessionTimer)
  clearInterval(countdownTimer)
})

async function handleLogout() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  clearInterval(sessionTimer)
  loading.value  = false
  loggedOut.value = true
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      goToLogin()
    }
  }, 1000)
}

function goBack() {
  router.back()
}

function goToLogin() {
  router.push('/login')
}
</script>