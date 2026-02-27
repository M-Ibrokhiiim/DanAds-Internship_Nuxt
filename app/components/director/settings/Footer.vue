<template>
    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2 transition-all"
    >
      <span>✓</span> {{ toast.message }}
    </div>
</template>
<script setup lang="ts">
const toast = ref({ show: false, message: '' })
</script>