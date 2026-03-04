<template>
  <div>
    <NuxtLayout :name="isUser" >
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useUser } from '@/composables/useUser'
 

const router = useRouter()  
const { isUser } = useUser()


onMounted(()=>{
  if(isUser.value === 'director'){
   return  router.push('/director/dashboard')
  }
  router.push('/student')
})


</script>
