<template>
  <div>
    <NuxtLayout :name="isUserDirector ? 'director' : 'student'" >
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useUser } from '@/composables/useUser'
const router = useRouter()  

const { isUserDirector } = useUser()

onMounted(()=>{
  if(isUserDirector) {
   return  router.push('/director/dashboard')
  }
  router.push('/student')
})
</script>
