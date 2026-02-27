<template>
  <div class="min-h-screen bg-[#f0f4ff] text-slate-900 p-8 font-sans">

    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Student Portal</p>
        <h1 class="text-[1.6rem] font-bold m-0">Settings</h1>
      </div>
      <div class="flex gap-3">
        <button
          class="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-slate-50 transition-all"
          @click="discard"
        >Discard</button>
        <button
          class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-indigo-600 transition-all"
          @click="save"
        >Save Changes</button>
      </div>
    </div>

    <div class="grid gap-5" style="grid-template-columns: 240px 1fr;">

      <div class="flex flex-col gap-3">
        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-3">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                SA
              </div>
              <button class="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[0.6rem] border-2 border-white cursor-pointer">✎</button>
            </div>
            <p class="font-bold text-sm">{{ form.firstName }} {{ form.lastName }}</p>
            <p class="text-[0.65rem] text-slate-400 mt-0.5">Full-Stack Dev · Batch 3</p>
            <span class="mt-2 bg-green-100 text-green-700 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full">● Active</span>
          </div>
          <div class="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
            <div class="flex items-center gap-2 text-[0.68rem] text-slate-500"><span>📧</span><span class="truncate">{{ form.email }}</span></div>
            <div class="flex items-center gap-2 text-[0.68rem] text-slate-500"><span>📞</span><span>{{ form.phone }}</span></div>
            <div class="flex items-center gap-2 text-[0.68rem] text-slate-500"><span>🎓</span><span>GPA 3.8</span></div>
          </div>
        </div>

        <nav class="bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-0.5">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold border-none cursor-pointer text-left transition-all w-full"
            :class="activeTab === tab.key
              ? 'bg-indigo-50 text-indigo-600'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'"
            @click="activeTab = tab.key"
          >
            <span
              class="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
              :class="activeTab === tab.key ? 'bg-indigo-100' : 'bg-slate-100'"
            >{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <div class="flex flex-col gap-5">

        <div v-if="activeTab === 'account'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Account Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
                <input v-model="form.firstName" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
                <input v-model="form.lastName" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                <input v-model="form.email" type="email" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                <input v-model="form.phone" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Telegram</label>
                <input v-model="form.telegram" placeholder="@username" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date of Birth</label>
                <input v-model="form.dob" type="date" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio</label>
                <textarea v-model="form.bio" rows="3" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white resize-none"></textarea>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Language & Region</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Language</label>
                <select v-model="form.language" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white cursor-pointer">
                  <option value="en">English</option>
                  <option value="uz">O'zbek</option>
                  <option value="ru">Русский</option>
                </select>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Timezone</label>
                <select v-model="form.timezone" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white cursor-pointer">
                  <option value="Asia/Tashkent">Tashkent (UTC+5)</option>
                  <option value="Europe/Moscow">Moscow (UTC+3)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'security'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Change Password</h2>
            <div class="flex flex-col gap-4 max-w-md">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Password</label>
                <input v-model="security.current" type="password" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                <input v-model="security.newPass" type="password" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
                <div class="flex gap-1 mt-1">
                  <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-all duration-300" :class="passwordStrength >= i ? strengthColor : 'bg-slate-100'"></div>
                </div>
                <p class="text-xs text-slate-400">{{ strengthLabel }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                <input v-model="security.confirm" type="password" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white" />
                <p v-if="security.confirm && security.newPass !== security.confirm" class="text-xs text-red-500">Passwords do not match</p>
              </div>
              <button class="bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold self-start border-none cursor-pointer hover:bg-indigo-600 transition-all">Update Password</button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-sm font-bold mb-1">Two-Factor Authentication</h2>
                <p class="text-xs text-slate-400 max-w-sm">Secure your account with an authenticator app like Google Authenticator.</p>
              </div>
              <button
                class="px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all"
                :class="security.twoFactor ? 'bg-red-50 text-red-500 border-red-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'"
                @click="security.twoFactor = !security.twoFactor"
              >{{ security.twoFactor ? 'Disable 2FA' : 'Enable 2FA' }}</button>
            </div>
            <div v-if="security.twoFactor" class="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <span class="text-green-500">✓</span>
              <p class="text-xs text-green-700 font-medium">Two-factor authentication is active on your account.</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-4">Active Sessions</h2>
            <div class="flex flex-col gap-3">
              <div v-for="s in sessions" :key="s.id" class="flex items-center justify-between py-2 border-b border-slate-50 last:border-none">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-lg">{{ s.icon }}</div>
                  <div>
                    <p class="text-xs font-semibold">{{ s.device }}</p>
                    <p class="text-[0.65rem] text-slate-400">{{ s.location }} · {{ s.time }}</p>
                  </div>
                </div>
                <span v-if="s.current" class="bg-green-100 text-green-700 text-[0.62rem] font-bold px-2 py-0.5 rounded-full">Current</span>
                <button v-else class="text-xs text-red-400 font-semibold border-none bg-transparent cursor-pointer hover:text-red-600">Revoke</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'notifications'" class="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 class="text-sm font-bold mb-5">Notification Preferences</h2>
          <div class="flex flex-col gap-0.5">
            <div
              v-for="n in notifications"
              :key="n.key"
              class="flex items-center justify-between py-4 border-b border-slate-50 last:border-none"
            >
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5" :style="{ background: n.color + '18' }">{{ n.icon }}</div>
                <div>
                  <p class="text-sm font-semibold">{{ n.label }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ n.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4 shrink-0 ml-4">
                <label v-for="ch in ['Email', 'SMS']" :key="ch" class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" :checked="n[ch.toLowerCase()]" @change="n[ch.toLowerCase()] = !n[ch.toLowerCase()]" class="w-3.5 h-3.5 accent-indigo-500 cursor-pointer" />
                  <span class="text-xs text-slate-400">{{ ch }}</span>
                </label>
                <button
                  class="w-10 h-5 rounded-full relative cursor-pointer border-none transition-all duration-200"
                  :class="n.enabled ? 'bg-indigo-500' : 'bg-slate-200'"
                  @click="n.enabled = !n.enabled"
                >
                  <span class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" :class="n.enabled ? 'left-[calc(100%-18px)]' : 'left-0.5'"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'appearance'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Theme</h2>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="t in themes"
                :key="t.key"
                class="border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2"
                :class="appearance.theme === t.key ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-200'"
                @click="appearance.theme = t.key"
              >
                <span class="text-2xl">{{ t.icon }}</span>
                <span class="text-xs font-semibold text-slate-600">{{ t.label }}</span>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Accent Color</h2>
            <div class="flex gap-3 flex-wrap">
              <button
                v-for="c in accentColors"
                :key="c.key"
                class="w-9 h-9 rounded-xl cursor-pointer border-2 transition-all"
                :style="{ background: c.hex }"
                :class="appearance.accent === c.key ? 'border-slate-900 scale-110' : 'border-transparent hover:scale-105'"
                @click="appearance.accent = c.key"
              ></button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Display</h2>
            <div class="flex flex-col gap-4">
              <div
                v-for="opt in displayOptions"
                :key="opt.key"
                class="flex items-center justify-between py-2"
              >
                <div>
                  <p class="text-sm font-semibold">{{ opt.label }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ opt.description }}</p>
                </div>
                <button
                  class="w-10 h-5 rounded-full relative cursor-pointer border-none transition-all duration-200"
                  :class="appearance[opt.key] ? 'bg-indigo-500' : 'bg-slate-200'"
                  @click="appearance[opt.key] = !appearance[opt.key]"
                >
                  <span class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" :class="appearance[opt.key] ? 'left-[calc(100%-18px)]' : 'left-0.5'"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'privacy'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Privacy Controls</h2>
            <div class="flex flex-col gap-0.5">
              <div
                v-for="opt in privacyOptions"
                :key="opt.key"
                class="flex items-center justify-between py-4 border-b border-slate-50 last:border-none"
              >
                <div>
                  <p class="text-sm font-semibold">{{ opt.label }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ opt.description }}</p>
                </div>
                <button
                  class="w-10 h-5 rounded-full relative cursor-pointer border-none transition-all duration-200"
                  :class="privacy[opt.key] ? 'bg-indigo-500' : 'bg-slate-200'"
                  @click="privacy[opt.key] = !privacy[opt.key]"
                >
                  <span class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" :class="privacy[opt.key] ? 'left-[calc(100%-18px)]' : 'left-0.5'"></span>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-2">Data & Storage</h2>
            <p class="text-xs text-slate-400 mb-4">Manage your personal data stored on our servers.</p>
            <div class="flex gap-3">
              <button class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border-none cursor-pointer hover:bg-slate-200 transition-all">⬇ Export My Data</button>
              <button class="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-500 border border-red-200 cursor-pointer hover:bg-red-100 transition-all">🗑 Delete Account</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="toast.show" class="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
      <span>✓</span> {{ toast.message }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('account')
const toast     = ref({ show: false, message: '' })

const tabs = [
  { key: 'account',       label: 'Account',       icon: '👤' },
  { key: 'security',      label: 'Security',       icon: '🔒' },
  { key: 'notifications', label: 'Notifications',  icon: '🔔' },
  { key: 'appearance',    label: 'Appearance',     icon: '🎨' },
  { key: 'privacy',       label: 'Privacy',        icon: '🛡️' },
]

const form = ref({
  firstName: 'Sherzod',
  lastName:  'Alimov',
  email:     'sherzod.alimov@student.edu.uz',
  phone:     '+998 91 234 56 78',
  telegram:  '@sherzod_alimov',
  dob:       '2002-05-14',
  bio:       'Passionate developer from Tashkent building real-world projects and learning every day.',
  language:  'en',
  timezone:  'Asia/Tashkent',
})

const originalForm = JSON.parse(JSON.stringify(form.value))

const security = ref({
  current:   '',
  newPass:   '',
  confirm:   '',
  twoFactor: true,
})

const passwordStrength = computed(() => {
  const p = security.value.newPass
  if (!p) return 0
  let s = 0
  if (p.length >= 8)           s++
  if (/[A-Z]/.test(p))         s++
  if (/[0-9]/.test(p))         s++
  if (/[^A-Za-z0-9]/.test(p))  s++
  return s
})

const strengthColor = computed(() => {
  return ['bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500'][passwordStrength.value - 1] || 'bg-slate-100'
})

const strengthLabel = computed(() => {
  return ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value] || 'Enter a password'
})

const sessions = ref([
  { id: 1, device: 'Chrome on Windows 11',  location: 'Tashkent, UZ',  time: 'Active now',  icon: '🖥️', current: true  },
  { id: 2, device: 'Safari on iPhone 15',   location: 'Tashkent, UZ',  time: '3 hours ago', icon: '📱', current: false },
  { id: 3, device: 'Firefox on MacBook Pro', location: 'Samarkand, UZ', time: 'Yesterday',  icon: '💻', current: false },
])

const notifications = ref([
  { key: 'assignment', label: 'New Assignment',    description: 'When a teacher posts a new assignment.',              icon: '📝', color: '#6366f1', enabled: true,  email: true,  sms: false },
  { key: 'grade',      label: 'Grade Posted',      description: 'When your assignment or exam is graded.',             icon: '🎯', color: '#10b981', enabled: true,  email: true,  sms: true  },
  { key: 'message',    label: 'New Message',       description: 'When a teacher or classmate sends you a message.',    icon: '💬', color: '#0ea5e9', enabled: true,  email: false, sms: false },
  { key: 'reminder',   label: 'Deadline Reminder', description: 'Reminder 24h before an assignment deadline.',         icon: '⏰', color: '#f59e0b', enabled: true,  email: true,  sms: true  },
  { key: 'schedule',   label: 'Class Reminder',    description: 'Reminder 30 minutes before each scheduled class.',   icon: '📅', color: '#ec4899', enabled: true,  email: false, sms: true  },
  { key: 'announce',   label: 'Announcements',     description: 'Center-wide announcements from the director.',        icon: '📢', color: '#8b5cf6', enabled: false, email: true,  sms: false },
])

const appearance = ref({
  theme:          'light',
  accent:         'indigo',
  compactMode:    false,
  showAvatars:    true,
  animationsOn:   true,
})

const themes = [
  { key: 'light',  label: 'Light',  icon: '☀️' },
  { key: 'dark',   label: 'Dark',   icon: '🌙' },
  { key: 'system', label: 'System', icon: '💻' },
]

const accentColors = [
  { key: 'indigo', hex: '#6366f1' },
  { key: 'violet', hex: '#8b5cf6' },
  { key: 'sky',    hex: '#0ea5e9' },
  { key: 'emerald',hex: '#10b981' },
  { key: 'amber',  hex: '#f59e0b' },
  { key: 'pink',   hex: '#ec4899' },
  { key: 'rose',   hex: '#f43f5e' },
  { key: 'slate',  hex: '#475569' },
]

const displayOptions = [
  { key: 'compactMode',  label: 'Compact Mode',      description: 'Reduce spacing and padding for a denser layout.' },
  { key: 'showAvatars',  label: 'Show Avatars',       description: 'Display profile pictures in messages and lists.'  },
  { key: 'animationsOn', label: 'Enable Animations',  description: 'Smooth transitions and micro-interactions.'       },
]

const privacy = ref({
  profileVisible:  true,
  showOnline:      true,
  showGrades:      false,
  allowMessages:   true,
  activityVisible: false,
})

const privacyOptions = [
  { key: 'profileVisible',  label: 'Public Profile',        description: 'Allow teachers and classmates to view your profile.' },
  { key: 'showOnline',      label: 'Show Online Status',     description: 'Let others see when you are active.'                 },
  { key: 'showGrades',      label: 'Share Grade Summary',    description: 'Display your GPA on your public profile.'            },
  { key: 'allowMessages',   label: 'Allow Direct Messages',  description: 'Let classmates send you direct messages.'            },
  { key: 'activityVisible', label: 'Activity Visibility',    description: 'Show your activity timeline to others.'              },
]

function showToast(msg) {
  toast.value = { show: true, message: msg }
  setTimeout(() => { toast.value.show = false }, 3000)
}

function save()    { showToast('Settings saved successfully') }
function discard() { Object.assign(form.value, JSON.parse(JSON.stringify(originalForm))); showToast('Changes discarded') }
</script>