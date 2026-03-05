<template>
  <DirectorDashboard  v-if="isUserDirector"  />
  <Student v-else />
</template>
<script setup lang="ts">
import { useUser  } from '@/composables/useUser'

const { isUserDirector } = useUser()
</script>