<template>
    <DirectorDashboard/>
</template>
<script setup lang="ts">
const res = await $fetch('/api/hello')
const res2 = await $fetch('/greating')
console.log(res2)

definePageMeta({
  layout: 'director'
})

useHead({
    title:'Dashboard'
})

</script>