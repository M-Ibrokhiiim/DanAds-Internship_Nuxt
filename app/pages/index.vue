<template>
  <DirectorDashboard  v-if="isUser === 'director'"  />
  <Student v-else />
</template>
<script setup lang="ts">
import { useUser } from '@/composables/useUser'

const { isUser } = useUser()
</script>