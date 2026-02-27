<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import type { NuxtLayouts } from '#app';
const layout = ref<keyof NuxtLayouts>('director')
</script>
