<template>
  <div class="h-screen bg-[#f0f4ff] font-sans flex flex-col overflow-hidden">

    <div class="flex flex-1 overflow-hidden gap-5 p-6">

      <div class="w-80 bg-white rounded-2xl border border-slate-100 flex flex-col overflow-hidden shrink-0">

        <div class="p-4 border-b border-slate-100">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-bold text-sm text-slate-900">Messages</h2>
            <button class="w-8 h-8 rounded-xl bg-indigo-500 text-white text-lg flex items-center justify-center border-none cursor-pointer hover:bg-indigo-600 transition-all">+</button>
          </div>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              v-model="search"
              placeholder="Search messages..."
              class="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-300 transition-colors"
            />
          </div>
        </div>

        <div class="flex gap-1 px-3 pt-3 pb-2">
          <button
            v-for="tab in ['All', 'Teachers', 'Groups']"
            :key="tab"
            class="flex-1 py-1.5 rounded-lg text-[0.7rem] font-semibold border-none cursor-pointer transition-all"
            :class="activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'bg-transparent text-slate-400 hover:text-slate-700'"
            @click="activeTab = tab"
          >{{ tab }}</button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div
            v-for="conv in filteredConversations"
            :key="conv.id"
            class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-slate-50 last:border-none"
            :class="activeConv?.id === conv.id ? 'bg-indigo-50' : 'hover:bg-slate-50'"
            @click="activeConv = conv; markRead(conv)"
          >
            <div class="relative shrink-0">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                :style="{ background: conv.color }"
              >{{ conv.initials }}</div>
              <div
                v-if="conv.online"
                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <p class="text-xs font-bold text-slate-800 truncate">{{ conv.name }}</p>
                <span class="text-[0.6rem] text-slate-400 ml-1 shrink-0">{{ conv.time }}</span>
              </div>
              <p class="text-[0.68rem] text-slate-400 truncate mt-0.5">{{ conv.lastMessage }}</p>
            </div>
            <div v-if="conv.unread > 0" class="w-5 h-5 bg-indigo-500 text-white text-[0.55rem] font-black rounded-full flex items-center justify-center shrink-0">
              {{ conv.unread }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 bg-white rounded-2xl border border-slate-100 flex flex-col overflow-hidden">

        <div v-if="activeConv" class="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                :style="{ background: activeConv.color }"
              >{{ activeConv.initials }}</div>
              <div v-if="activeConv.online" class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p class="font-bold text-sm text-slate-900">{{ activeConv.name }}</p>
              <p class="text-[0.65rem]" :class="activeConv.online ? 'text-green-500' : 'text-slate-400'">
                {{ activeConv.online ? 'Online now' : activeConv.role }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm border-none cursor-pointer hover:bg-slate-200 transition-all">📞</button>
            <button class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm border-none cursor-pointer hover:bg-slate-200 transition-all">🎥</button>
            <button class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm border-none cursor-pointer hover:bg-slate-200 transition-all">⋯</button>
          </div>
        </div>

        <div v-if="activeConv" ref="messagesContainer" class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div v-for="(group, date) in groupedMessages" :key="date">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex-1 h-px bg-slate-100"></div>
              <span class="text-[0.62rem] text-slate-400 font-semibold px-3 bg-white">{{ date }}</span>
              <div class="flex-1 h-px bg-slate-100"></div>
            </div>
            <div class="flex flex-col gap-3">
              <div
                v-for="msg in group"
                :key="msg.id"
                class="flex gap-3"
                :class="msg.mine ? 'flex-row-reverse' : 'flex-row'"
              >
                <div
                  v-if="!msg.mine"
                  class="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[0.6rem] shrink-0 mt-auto"
                  :style="{ background: activeConv.color }"
                >{{ activeConv.initials }}</div>

                <div class="max-w-[70%] flex flex-col" :class="msg.mine ? 'items-end' : 'items-start'">
                  <div
                    class="px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                    :class="msg.mine
                      ? 'bg-indigo-500 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'"
                  >{{ msg.text }}</div>
                  <div class="flex items-center gap-1 mt-1 px-1">
                    <span class="text-[0.58rem] text-slate-400">{{ msg.time }}</span>
                    <span v-if="msg.mine" class="text-[0.58rem]" :class="msg.read ? 'text-indigo-400' : 'text-slate-300'">{{ msg.read ? '✓✓' : '✓' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeConv.typing" class="flex gap-3">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[0.6rem] shrink-0" :style="{ background: activeConv.color }">{{ activeConv.initials }}</div>
            <div class="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>

        <div v-if="activeConv" class="px-5 py-4 border-t border-slate-100 shrink-0">
          <div class="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-100 focus-within:border-indigo-300 transition-colors">
            <button class="text-slate-400 text-base border-none bg-transparent cursor-pointer hover:text-slate-600 transition-colors shrink-0">📎</button>
            <input
              v-model="newMessage"
              :placeholder="'Message ' + activeConv.name + '...'"
              class="flex-1 bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400"
              @keydown.enter.prevent="sendMessage"
              @input="handleTyping"
            />
            <button class="text-slate-400 text-base border-none bg-transparent cursor-pointer hover:text-slate-600 transition-colors shrink-0">😊</button>
            <button
              class="w-8 h-8 rounded-xl flex items-center justify-center text-white border-none cursor-pointer transition-all shrink-0"
              :class="newMessage.trim() ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-slate-200'"
              :disabled="!newMessage.trim()"
              @click="sendMessage"
            >→</button>
          </div>
        </div>

        <div v-if="!activeConv" class="flex-1 flex flex-col items-center justify-center text-center p-10">
          <div class="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-4xl mb-4">💬</div>
          <h3 class="font-bold text-slate-700 mb-2">Select a conversation</h3>
          <p class="text-xs text-slate-400 max-w-xs">Choose a teacher or group from the left to start messaging.</p>
        </div>
      </div>

      <div class="w-64 flex flex-col gap-4 shrink-0">

        <div v-if="activeConv" class="bg-white rounded-2xl border border-slate-100 p-5">
          <div class="flex flex-col items-center text-center mb-4">
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-3"
              :style="{ background: activeConv.color }"
            >{{ activeConv.initials }}</div>
            <p class="font-bold text-sm">{{ activeConv.name }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ activeConv.role }}</p>
            <span
              class="mt-2 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full"
              :class="activeConv.online ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'"
            >{{ activeConv.online ? '● Online' : '○ Offline' }}</span>
          </div>
          <div class="border-t border-slate-50 pt-3 flex flex-col gap-2">
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span>📚</span>
              <span>{{ activeConv.course }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span>📧</span>
              <span class="truncate">{{ activeConv.email }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-5 flex-1">
          <h3 class="text-xs font-bold text-slate-700 mb-3">Quick Actions</h3>
          <div class="flex flex-col gap-2">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium border-none cursor-pointer transition-all text-left w-full"
              :class="'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'"
            >
              <span class="text-base">{{ action.icon }}</span>
              {{ action.label }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const search      = ref('')
const activeTab   = ref('All')
const newMessage  = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const conversations = ref([
  {
    id: 1, name: 'Amir Karimov', initials: 'AK', color: '#6366f1',
    role: 'Full-Stack Dev Teacher', course: 'Full-Stack Development',
    email: 'a.karimov@edu.uz', online: true, type: 'teacher',
    time: '10:42', lastMessage: 'Great work on the REST API!', unread: 2, typing: false,
    messages: [
      { id: 1,  text: 'Hello Sherzod! How is your progress on the Node.js assignment?', time: '09:10', mine: false, read: true,  date: 'Yesterday' },
      { id: 2,  text: 'Hi sir! Going well, almost finished. Just stuck on JWT refresh tokens.', time: '09:15', mine: true,  read: true,  date: 'Yesterday' },
      { id: 3,  text: 'That is a common issue. Use httpOnly cookies for storing refresh tokens — much safer than localStorage.', time: '09:18', mine: false, read: true,  date: 'Yesterday' },
      { id: 4,  text: 'Understood! I will try that approach right away. Thank you!', time: '09:20', mine: true,  read: true,  date: 'Yesterday' },
      { id: 5,  text: 'I just reviewed your submission. Great work on the REST API!', time: '10:40', mine: false, read: false, date: 'Today' },
      { id: 6,  text: 'The authentication flow is clean and your error handling is solid.', time: '10:42', mine: false, read: false, date: 'Today' },
    ],
  },
  {
    id: 2, name: 'Nodira Yusupova', initials: 'NY', color: '#0ea5e9',
    role: 'Data Science Teacher', course: 'Data Science',
    email: 'n.yusupova@edu.uz', online: false, type: 'teacher',
    time: 'Yesterday', lastMessage: 'Submit the EDA notebook by Friday.', unread: 0, typing: false,
    messages: [
      { id: 1, text: 'Sherzod, please make sure to submit the EDA notebook by Friday before midnight.', time: '14:30', mine: false, read: true, date: 'Yesterday' },
      { id: 2, text: 'Understood, I will have it ready. Should I include the visualizations too?', time: '14:45', mine: true,  read: true, date: 'Yesterday' },
      { id: 3, text: 'Yes, all visualizations are required. Matplotlib and Seaborn both accepted.', time: '15:00', mine: false, read: true, date: 'Yesterday' },
    ],
  },
  {
    id: 3, name: 'Malika Rahimova', initials: 'MR', color: '#f59e0b',
    role: 'UI/UX Design Teacher', course: 'UI/UX Design',
    email: 'm.rahimova@edu.uz', online: true, type: 'teacher',
    time: 'Mon', lastMessage: 'Your Figma prototype got 93/100 🎉', unread: 1, typing: false,
    messages: [
      { id: 1, text: 'Sherzod, I have finished grading your Figma prototype.', time: '11:00', mine: false, read: false, date: 'Monday' },
      { id: 2, text: 'You scored 93/100 🎉 Excellent work on the banking app flows!', time: '11:01', mine: false, read: false, date: 'Monday' },
    ],
  },
  {
    id: 4, name: 'Full-Stack Batch 3', initials: 'B3', color: '#10b981',
    role: 'Group · 28 members', course: 'Full-Stack Development',
    email: '', online: true, type: 'group',
    time: '08:15', lastMessage: 'Dilnoza: Who finished the JWT task?', unread: 5, typing: false,
    messages: [
      { id: 1, text: 'Who finished the JWT task already? I am stuck on the refresh token part.', time: '08:10', mine: false, read: false, date: 'Today' },
      { id: 2, text: 'I finished it last night! Amir sir gave a hint — use httpOnly cookies.', time: '08:13', mine: true,  read: true,  date: 'Today' },
      { id: 3, text: 'Thanks Sherzod! That is exactly what I needed.', time: '08:15', mine: false, read: false, date: 'Today' },
    ],
  },
  {
    id: 5, name: 'Dilnoza Ergasheva', initials: 'DE', color: '#8b5cf6',
    role: 'DevOps Teacher', course: 'DevOps Essentials',
    email: 'd.ergasheva@edu.uz', online: false, type: 'teacher',
    time: 'Sun', lastMessage: 'DevOps course starts March 10.', unread: 0, typing: false,
    messages: [
      { id: 1, text: 'Hi Sherzod! Just a reminder that DevOps Essentials starts on March 10.', time: '16:00', mine: false, read: true, date: 'Sunday' },
      { id: 2, text: 'Please make sure you have Docker Desktop installed before the first session.', time: '16:01', mine: false, read: true, date: 'Sunday' },
      { id: 3, text: 'Got it! I already have Docker installed. Looking forward to it!', time: '16:30', mine: true,  read: true, date: 'Sunday' },
    ],
  },
])

const activeConv = ref(conversations.value[0])

const filteredConversations = computed(() => {
  let list = conversations.value
  if (activeTab.value === 'Teachers') list = list.filter(c => c.type === 'teacher')
  if (activeTab.value === 'Groups')   list = list.filter(c => c.type === 'group')
  if (search.value.trim()) list = list.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
  return list
})

const groupedMessages = computed(() => {
  if (!activeConv.value) return {}
  const groups: Record<string, typeof activeConv.value.messages> = {}
  for (const msg of activeConv.value.messages) {
    if (!groups[msg.date]) groups[msg.date] = []
    groups[msg.date].push(msg)
  }
  return groups
})

function markRead(conv: typeof conversations.value[0]) {
  conv.unread = 0
}

let typingTimeout: ReturnType<typeof setTimeout>

function handleTyping() {
  if (activeConv.value) {
    activeConv.value.typing = false
  }
  clearTimeout(typingTimeout)
}

async function sendMessage() {
  if (!newMessage.value.trim() || !activeConv.value) return
  const text = newMessage.value.trim()
  const now   = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const msgId = Date.now()

  activeConv.value.messages.push({ id: msgId, text, time: now, mine: true, read: false, date: 'Today' })
  activeConv.value.lastMessage = text
  activeConv.value.time = now
  newMessage.value = ''

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }

  if (activeConv.value.online) {
    activeConv.value.typing = true
    typingTimeout = setTimeout(async () => {
      if (!activeConv.value) return
      activeConv.value.typing = false
      const replies = [
        'Got it, thanks!',
        'Sure, I will check that.',
        'Great question! Let me get back to you on that.',
        'Understood. Keep up the good work!',
        'I will review and respond shortly.',
      ]
      const reply = replies[Math.floor(Math.random() * replies.length)]
      const replyTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      activeConv.value.messages.push({ id: Date.now(), text: reply, time: replyTime, mine: false, read: false, date: 'Today' })
      activeConv.value.lastMessage = reply
      activeConv.value.time = replyTime

      await nextTick()
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }, 2000)
  }
}

const quickActions = [
  { icon: '📎', label: 'Share File'         },
  { icon: '📅', label: 'Schedule Meeting'   },
  { icon: '❓', label: 'Ask a Question'     },
  { icon: '📝', label: 'Request Feedback'   },
  { icon: '🔔', label: 'Set Reminder'       },
]
</script>