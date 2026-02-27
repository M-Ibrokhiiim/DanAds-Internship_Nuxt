<template>
    <main>
          <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Education Center</p>
        <h1 class="text-[1.6rem] font-bold m-0">Projects</h1>
      </div>
      <div class="flex gap-3 items-center">
        <button class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
          + New Project
        </button>
      </div>
    </div>

    <div class="flex gap-3 mb-6 flex-wrap">
      <button
        v-for="f in filters"
        :key="f.key"
        class="px-4 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all"
        :class="activeFilter === f.key
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
        <span
          class="ml-1.5 px-1.5 py-0.5 rounded-full text-[0.65rem]"
          :class="activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'"
        >{{ f.count }}</span>
      </button>
    </div>
    </main>
</template>
<script setup lang="ts">
const viewMode    = ref('grid')
const activeFilter = ref('all')

const filters = [
  { key: 'all',       label: 'All',       count: 8 },
  { key: 'active',    label: 'Active',    count: 4 },
  { key: 'planning',  label: 'Planning',  count: 2 },
  { key: 'review',    label: 'In Review', count: 1 },
  { key: 'completed', label: 'Completed', count: 1 },
]
</script>