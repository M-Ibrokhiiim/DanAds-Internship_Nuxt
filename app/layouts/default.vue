<template>
  <div class="flex flex-col min-h-screen font-sans">
    
    <header class="flex justify-center bg-gray-800 text-white px-8 py-4">
      <nav class="w-[80%]">
        <ul class="flex justify-between">
          <li  
             
            :class="id == 1 ? 'underline' : ''">
            <a href="#" class="text-white no-underline">Home</a>
          </li>
          <li
            
            :class="id == 2 ? 'underline' : ''">
            <a href="#" class="text-white no-underline">About</a>
          </li>
          <li
            
            :class="id == 3 ? 'underline' : ''">
            <a href="#" class="text-white no-underline">Contact</a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="flex flex-1">
       
      <aside 
        class="w-55 bg-gray-100 p-4" 
        v-if="$route.path == '/' ">
        <ul class="h-42.5 flex flex-col justify-around">
          <li
            @click="goToPage(1)"      
            :class=" id == 1 ? 'bg-blue-200 rounded-lg pl-2' : ''">
            <a href="#" class="block py-2 text-gray-800 no-underline">Dashboard</a>
          </li>
          <li
            @click="goToPage(2)"   
            :class=" id == 2 ? 'bg-blue-200 rounded-lg pl-2' : ''">
            <a href="#" class="block py-2 text-gray-800 no-underline">Projects</a>
          </li>
          <li
             @click="goToPage(3)"   
            :class=" id == 3 ? 'bg-blue-200 rounded-lg pl-2' : ''">
            <a href="#" class="block py-2 text-gray-800 no-underline">Settings</a>
          </li>
        </ul>
      </aside>

      <main class="main-content bg-amber-700 w-[85vw] h-[86.7vh] flex-1 p-8 absolute left-55 top-14">
        <NuxtPage />  
      </main>
    </div>

    <footer class="bg-gray-800 text-white px-8 py-4 text-center">
      <p>© 2026 Application. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const id = ref<number>(1)

function goToPage(pageNumber:number){
  id.value = pageNumber 
}
</script>