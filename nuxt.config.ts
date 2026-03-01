import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },
   app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/Logo.png' }
      ],
      title:'CRM project of Ibrokhiiim'
    }
  }
});