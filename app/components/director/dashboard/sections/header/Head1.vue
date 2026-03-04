<template>
<div class="flex justify-between items-end mb-8">
        <div>
          <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Good morning, Director</p>
          <h1 class="text-[1.6rem] font-bold m-0">
            Overview <span class="text-indigo-500">·</span> {{ currentDate }}
          </h1>
        </div>
        <div class="flex gap-3">
          <button class="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">
            Export Report
          </button>
          <button class="bg-indigo-500 text-white border-none px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
            + New Announcement
          </button>
        </div>
      </div>

</template>
<script setup lang="ts">
const currentDate = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
)
</script>