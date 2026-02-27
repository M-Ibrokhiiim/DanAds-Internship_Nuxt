<template>
  <div class="flex flex-col min-h-screen font-sans">
    
    <header class="flex justify-between items-center bg-emerald-700 text-white px-8 py-4">
      <h1 class="text-lg font-semibold">Teacher Portal</h1>
      <nav>
        <ul class="flex gap-4">
          <li><a href="/" class="text-white no-underline">Home</a></li>
          <li><a href="/classes" class="text-white no-underline">Classes</a></li>
          <li><a href="/profile" class="text-white no-underline">Profile</a></li>
          <li><a href="/logout" class="text-white no-underline">Logout</a></li>
        </ul>
      </nav>
    </header>

    <div class="flex flex-1">
      
      <aside class="w-55 bg-emerald-100 p-4">
        <ul>
          <li>
            <a href="/dashboard" class="block py-2 text-emerald-700 no-underline">Dashboard</a>
          </li>
          <li>
            <a href="/assignments" class="block py-2 text-emerald-700 no-underline">Assignments</a>
          </li>
          <li>
            <a href="/grades" class="block py-2 text-emerald-700 no-underline">Grades</a>
          </li>
          <li>
            <a href="/messages" class="block py-2 text-emerald-700 no-underline">Messages</a>
          </li>
          <li>
            <a href="/reports" class="block py-2 text-emerald-700 no-underline">Reports</a>
          </li>
        </ul>
      </aside>

      <main class="flex-1 p-8 bg-green-50">
        <NuxtPage />
      </main>

    </div>

    <footer class="bg-emerald-700 text-white px-8 py-4 text-center">
      <p>© 2026 Teacher Portal. All rights reserved.</p>
    </footer>

  </div>
</template>

<script setup lang="ts">
</script>