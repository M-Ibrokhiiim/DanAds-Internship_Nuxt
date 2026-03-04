<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">My Profile</h1>
      </div>
      <div class="flex gap-3">
        <button
          class="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-slate-50 transition-all"
          @click="editing = !editing"
        >
          {{ editing ? 'Cancel' : '✎ Edit Profile' }}
        </button>
        <button
          v-if="editing"
          class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-indigo-600 transition-all"
          @click="saveProfile"
        >
          Save Changes
        </button>
      </div>
    </div>

    <div class="grid gap-5" style="grid-template-columns: 300px 1fr;">

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center">
          <div class="relative mb-4">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-3xl shadow-lg">
              SA
            </div>
            <div class="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-green-400 rounded-xl border-2 border-white flex items-center justify-center">
              <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <button
              v-if="editing"
              class="absolute -top-2 -right-2 w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs border-2 border-white cursor-pointer"
            >✎</button>
          </div>
          <h2 class="font-bold text-base text-slate-900">{{ profile.firstName }} {{ profile.lastName }}</h2>
          <p class="text-xs text-slate-400 mt-0.5">{{ profile.batch }} · Batch {{ profile.batchNo }}</p>
          <div class="flex gap-2 mt-3">
            <span class="bg-indigo-50 text-indigo-600 text-[0.68rem] font-bold px-2.5 py-1 rounded-full">🎓 Student</span>
            <span class="bg-green-50 text-green-600 text-[0.68rem] font-bold px-2.5 py-1 rounded-full">● Active</span>
          </div>

          <div class="w-full border-t border-slate-100 mt-5 pt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <p class="text-base font-black text-slate-800">3.8</p>
              <p class="text-[0.62rem] text-slate-400">GPA</p>
            </div>
            <div class="border-x border-slate-100">
              <p class="text-base font-black text-slate-800">4</p>
              <p class="text-[0.62rem] text-slate-400">Courses</p>
            </div>
            <div>
              <p class="text-base font-black text-slate-800">3</p>
              <p class="text-[0.62rem] text-slate-400">Certs</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <p class="text-[0.68rem] uppercase tracking-wider text-slate-400 font-semibold mb-3">Contact</p>
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center gap-2.5 text-xs text-slate-600">
              <span class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">📧</span>
              <span class="truncate">{{ profile.email }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-xs text-slate-600">
              <span class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">📞</span>
              <span>{{ profile.phone }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-xs text-slate-600">
              <span class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">📍</span>
              <span>{{ profile.location }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-xs text-slate-600">
              <span class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm shrink-0">🗓️</span>
              <span>Enrolled {{ profile.enrolled }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-xs text-slate-600">
              <span class="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center text-sm shrink-0">✈️</span>
              <span>{{ profile.telegram }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <p class="text-[0.68rem] uppercase tracking-wider text-slate-400 font-semibold mb-3">Skills</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="skill in profile.skills"
              :key="skill.name"
              class="text-[0.68rem] font-semibold px-2.5 py-1 rounded-xl"
              :style="{ background: skill.color + '18', color: skill.color }"
            >{{ skill.name }}</span>
          </div>
        </div>

      </div>

      <div class="flex flex-col gap-5">

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 class="text-sm font-bold mb-5">Personal Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
              <input
                v-model="profile.firstName"
                :disabled="!editing"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
              <input
                v-model="profile.lastName"
                :disabled="!editing"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date of Birth</label>
              <input
                v-model="profile.dob"
                :disabled="!editing"
                type="date"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
              <input
                v-model="profile.location"
                :disabled="!editing"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
              <input
                v-model="profile.email"
                :disabled="!editing"
                type="email"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
              <input
                v-model="profile.phone"
                :disabled="!editing"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              />
            </div>
            <div class="flex flex-col gap-1.5 col-span-2">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio</label>
              <textarea
                v-model="profile.bio"
                :disabled="!editing"
                rows="3"
                class="border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white resize-none"
                :class="editing ? 'border-slate-200 focus:border-indigo-400' : 'border-transparent bg-slate-50 text-slate-700'"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 class="text-sm font-bold mb-5">Course Progress</h2>
          <div class="flex flex-col gap-4">
            <div v-for="course in courses" :key="course.id" class="flex items-center gap-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" :style="{ background: course.color + '18' }">{{ course.icon }}</div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-xs font-semibold truncate">{{ course.name }}</p>
                  <span class="text-xs font-bold ml-2 shrink-0" :style="{ color: course.color }">{{ course.progress }}%</span>
                </div>
                <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700" :style="{ width: course.progress + '%', background: course.color }"></div>
                </div>
              </div>
              <span
                class="text-[0.65rem] font-bold px-2 py-0.5 rounded-full capitalize shrink-0"
                :class="{
                  'bg-green-100 text-green-700':  course.status === 'active',
                  'bg-slate-100 text-slate-500':  course.status === 'completed',
                  'bg-amber-100 text-amber-700':  course.status === 'upcoming',
                }"
              >{{ course.status }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-5">

          <div class="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 class="text-sm font-bold mb-4">Certificates</h2>
            <div class="flex flex-col gap-3">
              <div
                v-for="cert in certificates"
                :key="cert.name"
                class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-none"
              >
                <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" :style="{ background: cert.color + '18' }">{{ cert.icon }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold truncate">{{ cert.name }}</p>
                  <p class="text-[0.62rem] text-slate-400 mt-0.5">{{ cert.date }}</p>
                </div>
                <button class="text-[0.62rem] font-bold bg-indigo-50 text-indigo-600 border-none px-2 py-1 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all shrink-0">⬇</button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 class="text-sm font-bold mb-4">Achievements</h2>
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="badge in achievements"
                :key="badge.label"
                class="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl border transition-all cursor-default"
                :class="badge.earned ? 'border-amber-100 bg-amber-50' : 'border-slate-100 opacity-40'"
                :title="badge.desc"
              >
                <span class="text-2xl">{{ badge.icon }}</span>
                <p class="text-[0.6rem] font-bold text-slate-600 leading-tight">{{ badge.label }}</p>
              </div>
            </div>
          </div>

        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 class="text-sm font-bold mb-4">Activity This Month</h2>
          <div class="flex items-end gap-1.5 h-24">
            <div
              v-for="(day, idx) in activityData"
              :key="idx"
              class="flex-1 rounded-t-lg transition-all duration-500 cursor-pointer hover:opacity-80 relative group"
              :style="{ height: (day.count / maxActivity * 100) + '%', background: day.count > 0 ? '#6366f1' : '#f1f5f9' }"
            >
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[0.55rem] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
                {{ day.count }} tasks
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-2">
            <span class="text-[0.6rem] text-slate-400">Feb 1</span>
            <span class="text-[0.6rem] text-slate-400">Feb 14</span>
            <span class="text-[0.6rem] text-slate-400">Feb 28</span>
          </div>
        </div>

      </div>
    </div>

    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2"
    >
      <span>✓</span> {{ toast.message }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const editing = ref(false)
const toast   = ref({ show: false, message: '' })

const profile = ref({
  firstName: 'Sherzod',
  lastName:  'Alimov',
  dob:       '2002-05-14',
  location:  'Tashkent, Uzbekistan',
  email:     'sherzod.alimov@student.edu.uz',
  phone:     '+998 91 234 56 78',
  telegram:  '@sherzod_alimov',
  batch:     'Full-Stack Dev',
  batchNo:   3,
  enrolled:  'September 2025',
  bio:       'Passionate developer from Tashkent building real-world projects and learning every day. Interested in backend architecture, APIs, and cloud infrastructure.',
  skills: [
    { name: 'HTML/CSS',   color: '#f97316' },
    { name: 'JavaScript', color: '#eab308' },
    { name: 'React',      color: '#0ea5e9' },
    { name: 'Node.js',    color: '#10b981' },
    { name: 'PostgreSQL', color: '#6366f1' },
    { name: 'Figma',      color: '#ec4899' },
    { name: 'Git',        color: '#f59e0b' },
    { name: 'Docker',     color: '#0ea5e9' },
  ],
})

const courses = ref([
  { id: 1, name: 'Full-Stack Development', icon: '🚀', color: '#6366f1', progress: 72,  status: 'active'    },
  { id: 2, name: 'Data Science',           icon: '📊', color: '#0ea5e9', progress: 30,  status: 'active'    },
  { id: 3, name: 'UI/UX Design',           icon: '🎨', color: '#f59e0b', progress: 100, status: 'completed' },
  { id: 4, name: 'DevOps Essentials',      icon: '☁️', color: '#8b5cf6', progress: 0,   status: 'upcoming'  },
])

const certificates = ref([
  { name: 'HTML & CSS Mastery',       icon: '🌐', color: '#f97316', date: 'Jan 20, 2026' },
  { name: 'JavaScript Fundamentals',  icon: '⚡', color: '#eab308', date: 'Feb 5, 2026'  },
  { name: 'UI/UX Design Certificate', icon: '🎨', color: '#ec4899', date: 'Feb 24, 2026' },
])

const achievements = ref([
  { icon: '🔥', label: '7-Day Streak',    desc: 'Logged in 7 days in a row',           earned: true  },
  { icon: '⚡', label: 'Fast Submitter',  desc: 'Submitted 5 tasks before deadline',   earned: true  },
  { icon: '🏆', label: 'Top Scorer',      desc: 'Scored 90%+ on 3 assignments',        earned: true  },
  { icon: '💬', label: 'Team Player',     desc: 'Sent 50+ messages in group chats',    earned: true  },
  { icon: '📚', label: 'Bookworm',        desc: 'Completed 30 lessons',                earned: false },
  { icon: '🎯', label: 'Perfectionist',   desc: 'Got 100% on any assignment',          earned: false },
  { icon: '🚀', label: 'Graduate',        desc: 'Complete a full course',              earned: false },
  { icon: '🌟', label: "Dean's List",     desc: 'Maintain GPA above 3.7 for a term',  earned: false },
  { icon: '🤝', label: 'Mentor',          desc: 'Help 3 classmates with assignments',  earned: false },
])

const activityData = ref(
  Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    count: Math.floor(Math.random() * 5),
  }))
)

const maxActivity = computed(() => Math.max(...activityData.value.map(d => d.count), 1))

function saveProfile() {
  editing.value = false
  toast.value = { show: true, message: 'Profile updated successfully' }
  setTimeout(() => { toast.value.show = false }, 3000)
}
</script>