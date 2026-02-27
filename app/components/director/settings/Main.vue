<template>
    <div class="grid gap-5" style="grid-template-columns: 260px 1fr;">

      <div class="flex flex-col gap-3">
        <div class="bg-white rounded-2xl border border-slate-100 p-5">
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-4">
              <div class="w-20 h-20 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-extrabold text-2xl">
                {{ initials }}
              </div>
              <button class="absolute -bottom-2 -right-2 w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs border-2 border-white cursor-pointer">
                ✎
              </button>
            </div>
            <p class="font-bold text-sm">{{ form.firstName }} {{ form.lastName }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ form.role }}</p>
            <span class="mt-2 bg-green-100 text-green-700 text-[0.68rem] font-bold px-2.5 py-0.5 rounded-full">Active</span>
          </div>

          <div class="border-t border-slate-50 mt-4 pt-4 flex flex-col gap-1">
            <p class="text-[0.68rem] uppercase tracking-wider text-slate-400 font-semibold mb-2">Quick Info</p>
            <div class="flex items-center gap-2 text-xs text-slate-500 py-1">
              <span class="text-base">📧</span>
              <span class="truncate">{{ form.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 py-1">
              <span class="text-base">📞</span>
              <span>{{ form.phone }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 py-1">
              <span class="text-base">📍</span>
              <span>{{ form.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 py-1">
              <span class="text-base">🗓️</span>
              <span>Joined {{ form.joined }}</span>
            </div>
          </div>
        </div>

        <nav class="bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-0.5">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium border-none cursor-pointer text-left transition-all w-full"
            :class="activeTab === tab.key
              ? 'bg-indigo-50 text-indigo-600 font-semibold'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'"
            @click="activeTab = tab.key"
          >
            <span class="text-base">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <div class="flex flex-col gap-5">

        <div v-if="activeTab === 'profile'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Personal Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                <input
                  v-model="form.firstName"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                <input
                  v-model="form.lastName"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role / Title</label>
                <input
                  v-model="form.role"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
                <input
                  v-model="form.location"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bio</label>
                <textarea
                  v-model="form.bio"
                  rows="3"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Contact Details</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <input
                  v-model="form.phone"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telegram</label>
                <input
                  v-model="form.telegram"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                  placeholder="@username"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn</label>
                <input
                  v-model="form.linkedin"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                  placeholder="linkedin.com/in/..."
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'security'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Change Password</h2>
            <div class="flex flex-col gap-4 max-w-md">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  v-model="security.current"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  v-model="security.newPass"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
                <div class="flex gap-1 mt-1">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="flex-1 h-1 rounded-full transition-all duration-300"
                    :class="passwordStrength >= i ? strengthColor : 'bg-slate-100'"
                  ></div>
                </div>
                <p class="text-xs text-slate-400">{{ strengthLabel }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  v-model="security.confirm"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <button class="bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold self-start border-none cursor-pointer mt-1">
                Update Password
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-sm font-bold mb-1">Two-Factor Authentication</h2>
                <p class="text-xs text-slate-400 max-w-sm">Add an extra layer of security to your account using an authenticator app.</p>
              </div>
              <button
                class="px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all"
                :class="security.twoFactor
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-indigo-50 text-indigo-600 border-indigo-200'"
                @click="security.twoFactor = !security.twoFactor"
              >
                {{ security.twoFactor ? 'Disable 2FA' : 'Enable 2FA' }}
              </button>
            </div>
            <div v-if="security.twoFactor" class="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <span class="text-green-500 text-base">✓</span>
              <p class="text-xs text-green-700 font-medium">Two-factor authentication is enabled for your account.</p>
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
                    <p class="text-[0.7rem] text-slate-400">{{ s.location }} · {{ s.time }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="s.current" class="bg-green-100 text-green-700 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">Current</span>
                  <button v-else class="text-xs text-red-500 font-semibold border-none bg-transparent cursor-pointer">Revoke</button>
                </div>
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
              class="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-none"
            >
              <div>
                <p class="text-sm font-semibold">{{ n.label }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ n.description }}</p>
              </div>
              <div class="flex items-center gap-4">
                <label v-for="ch in ['Email', 'SMS']" :key="ch" class="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="n[ch.toLowerCase()]"
                    @change="n[ch.toLowerCase()] = !n[ch.toLowerCase()]"
                    class="w-3.5 h-3.5 accent-indigo-500 cursor-pointer"
                  />
                  <span class="text-xs text-slate-400">{{ ch }}</span>
                </label>
                <button
                  class="w-10 h-5 rounded-full relative cursor-pointer border-none transition-all duration-200"
                  :class="n.enabled ? 'bg-indigo-500' : 'bg-slate-200'"
                  @click="n.enabled = !n.enabled"
                >
                  <span
                    class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                    :class="n.enabled ? 'left-[calc(100%-18px)]' : 'left-0.5'"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'center'" class="flex flex-col gap-5">
          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-5">Education Center Info</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Center Name</label>
                <input
                  v-model="center.name"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Founded</label>
                <input
                  v-model="center.founded"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Capacity (students)</label>
                <input
                  v-model="center.capacity"
                  type="number"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Website</label>
                <input
                  v-model="center.website"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Email</label>
                <input
                  v-model="center.email"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</label>
                <input
                  v-model="center.address"
                  class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
                />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold mb-4">Working Hours</h2>
            <div class="flex flex-col gap-3">
              <div v-for="d in workingHours" :key="d.day" class="flex items-center gap-4">
                <span class="text-xs font-semibold text-slate-500 w-24">{{ d.day }}</span>
                <button
                  class="w-9 h-5 rounded-full relative cursor-pointer border-none transition-all duration-200 shrink-0"
                  :class="d.open ? 'bg-indigo-500' : 'bg-slate-200'"
                  @click="d.open = !d.open"
                >
                  <span
                    class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                    :class="d.open ? 'left-[calc(100%-18px)]' : 'left-0.5'"
                  ></span>
                </button>
                <template v-if="d.open">
                  <input
                    v-model="d.from"
                    type="time"
                    class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-400 bg-white"
                  />
                  <span class="text-xs text-slate-400">to</span>
                  <input
                    v-model="d.to"
                    type="time"
                    class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-400 bg-white"
                  />
                </template>
                <span v-else class="text-xs text-slate-300 italic">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'danger'" class="flex flex-col gap-4">
          <div class="bg-white rounded-2xl border border-red-100 p-6">
            <h2 class="text-sm font-bold text-red-600 mb-4">Danger Zone</h2>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between py-3 border-b border-slate-50">
                <div>
                  <p class="text-sm font-semibold">Export All Data</p>
                  <p class="text-xs text-slate-400 mt-0.5">Download a full backup of all center data in JSON format.</p>
                </div>
                <button class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border-none cursor-pointer">
                  Export
                </button>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-slate-50">
                <div>
                  <p class="text-sm font-semibold">Deactivate Account</p>
                  <p class="text-xs text-slate-400 mt-0.5">Temporarily disable your director account. Data will be preserved.</p>
                </div>
                <button class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 cursor-pointer">
                  Deactivate
                </button>
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-semibold text-red-600">Delete Account</p>
                  <p class="text-xs text-slate-400 mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
                </div>
                <button class="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 text-white border-none cursor-pointer">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

</template>

<script setup lang="ts">

const activeTab = ref('profile')

const tabs = [
  { key: 'profile',       label: 'Profile',        icon: '👤' },
  { key: 'security',      label: 'Security',        icon: '🔒' },
  { key: 'notifications', label: 'Notifications',   icon: '🔔' },
  { key: 'center',        label: 'Center Settings', icon: '🏫' },
  { key: 'danger',        label: 'Danger Zone',     icon: '⚠️' },
]

const form = ref({
  firstName: 'Ibrokhim',
  lastName:  'Muysinov',
  role:      'Director',
  location:  'Tashkent, Uzbekistan',
  bio:       'Leading an IT-focused education center with a mission to train the next generation of Uzbek developers and tech professionals.',
  email:     'ibrokhimmuysinov@gmail.com',
  phone:     '+998 90 000 00 00',
  telegram:  '@ibrokhim_m',
  linkedin:  'linkedin.com/in/ibrokhim-muysinov',
  joined:    'March 2021',
})

 
const initials = computed(() =>
  (form.value.firstName[0] + form.value.lastName[0]).toUpperCase()
)

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
  if (p.length >= 8)          s++
  if (/[A-Z]/.test(p))        s++
  if (/[0-9]/.test(p))        s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthColor = computed(() => {
  const c = ['bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500']
  return c[passwordStrength.value - 1] || 'bg-slate-100'
})

const strengthLabel = computed(() => {
  const l = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return l[passwordStrength.value] || 'Enter a password'
})

const sessions = ref([
  { id: 1, device: 'Chrome on Windows 11', location: 'Tashkent, UZ', time: 'Active now',    icon: '🖥️', current: true  },
  { id: 2, device: 'Safari on iPhone 15',  location: 'Tashkent, UZ', time: '2 hours ago',   icon: '📱', current: false },
  { id: 3, device: 'Firefox on MacBook',   location: 'Samarkand, UZ',time: 'Yesterday',     icon: '💻', current: false },
])

const notifications = ref([
  { key: 'enrollment',  label: 'New Enrollment',       description: 'When a new student enrolls in any course.',         enabled: true,  email: true,  sms: false },
  { key: 'teacher',     label: 'Teacher Updates',       description: 'When a teacher submits a report or goes on leave.',  enabled: true,  email: true,  sms: false },
  { key: 'project',     label: 'Project Milestones',    description: 'When a project reaches a major milestone.',          enabled: true,  email: false, sms: false },
  { key: 'payment',     label: 'Payment Received',      description: 'When a student fee payment is confirmed.',           enabled: true,  email: true,  sms: true  },
  { key: 'system',      label: 'System Alerts',         description: 'Critical system or security notifications.',         enabled: true,  email: true,  sms: true  },
  { key: 'weekly',      label: 'Weekly Summary',        description: 'A weekly digest of center activity every Monday.',   enabled: false, email: true,  sms: false },
])

const center = ref({
  name:     'NextStep IT Academy',
  founded:  '2021',
  capacity: 200,
  website:  'nextstep.uz',
  email:    'info@nextstep.uz',
  address:  'Chilonzor district, 7th block, Tashkent',
})

const workingHours = ref([
  { day: 'Monday',    open: true,  from: '09:00', to: '18:00' },
  { day: 'Tuesday',   open: true,  from: '09:00', to: '18:00' },
  { day: 'Wednesday', open: true,  from: '09:00', to: '18:00' },
  { day: 'Thursday',  open: true,  from: '09:00', to: '18:00' },
  { day: 'Friday',    open: true,  from: '09:00', to: '17:00' },
  { day: 'Saturday',  open: true,  from: '10:00', to: '15:00' },
  { day: 'Sunday',    open: false, from: '09:00', to: '18:00' },
])
 
</script>