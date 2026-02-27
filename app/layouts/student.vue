<template>
  <div class="flex flex-col min-h-screen font-sans">
    
    <header class="flex justify-between items-center bg-blue-900 text-white px-8 py-4">
      <h1 class="text-lg font-semibold">Student Portal</h1>
      <nav>
        <ul class="flex gap-4">
          <li><a href="/" class="text-white no-underline">Home</a></li>
          <li><a href="/courses" class="text-white no-underline">Courses</a></li>
          <li><a href="/profile" class="text-white no-underline">Profile</a></li>
          <li><a href="/logout" class="text-white no-underline">Logout</a></li>
        </ul>
      </nav>
    </header>

    <div class="flex flex-1">
      
      <aside class="w-50 bg-indigo-100 p-4">
        <ul>
          <li>
            <a href="/dashboard" class="block py-2 text-blue-900 no-underline">Dashboard</a>
          </li>
          <li>
            <a href="/assignments" class="block py-2 text-blue-900 no-underline">Assignments</a>
          </li>
          <li>
            <a href="/grades" class="block py-2 text-blue-900 no-underline">Grades</a>
          </li>
          <li>
            <a href="/messages" class="block py-2 text-blue-900 no-underline">Messages</a>
          </li>
        </ul>
      </aside>

      <main class="flex-1 p-8 bg-red-200">
        <NuxtPage />
      </main>

    </div>

    <footer class="bg-blue-900 text-white px-8 py-4 text-center">
      <p>© 2026 Student Portal. All rights reserved.</p>
    </footer>

  </div>
</template>

<script setup lang="ts">
</script>