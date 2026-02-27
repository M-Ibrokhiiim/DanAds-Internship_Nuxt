<template>
    <main>
        <div class="flex justify-between items-end mb-8">
        <div class="mt-3">
            <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Director Profile</p>
            <h1 class="text-[1.6rem] font-bold m-0">Settings</h1>
        </div>
        <div class="flex gap-3">
            <button
            class="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
            @click="resetForm"
            >
            Discard
            </button>
            <button
            class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
            @click="saveSettings"
            >
            Save Changes
            </button>
        </div>
        </div>
    </main>
</template>
<script setup lang="ts"> 
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

const originalForm = JSON.parse(JSON.stringify(form.value))

const toast = ref({ show: false, message: '' })
const showToast = (msg:string) => {
  toast.value = { show: true, message: msg }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const saveSettings = () => showToast('Settings saved successfully')
const resetForm    = () => { Object.assign(form.value, JSON.parse(JSON.stringify(originalForm))); showToast('Changes discarded') }
</script>