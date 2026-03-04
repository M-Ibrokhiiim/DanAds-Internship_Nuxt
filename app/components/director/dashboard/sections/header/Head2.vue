<template>
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-slate-100"
        >
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            :style="{ background: kpi.bg }"
          >
            {{ kpi.icon }}
          </div>
          <div class="flex-1">
            <span class="block text-2xl font-bold leading-tight">{{ kpi.value }}</span>
            <span class="text-xs text-slate-400 font-medium">{{ kpi.label }}</span>
          </div>
          <div
            class="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
            :class="kpi.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
          >
            {{ kpi.trend > 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
          </div>
        </div>
     </div>
</template>
<script setup lang="ts">
const kpis = ref([
  { label: 'Total Students', value: '132', icon: '🎓', bg: '#eef2ff', trend: 12 },
  { label: 'Total Teachers', value: '6',   icon: '👨‍🏫', bg: '#f0fdf4', trend: 0  },
  { label: 'Active Courses', value: '12',  icon: '💻', bg: '#fff7ed', trend: 8  },
  { label: 'Avg Rating',     value: '4.6', icon: '⭐', bg: '#fdf4ff', trend: 3  },
])
</script>