<template>
    <div>
       <DirectorDashboardFoundation  v-if="isDirector"/>
       <Student v-else/>
    </div>
  
</template>
<script setup lang="ts">
const isDirector = ref<boolean>(false)

 </script>
