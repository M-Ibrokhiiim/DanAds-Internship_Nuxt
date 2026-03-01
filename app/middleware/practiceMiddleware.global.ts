 export default defineNuxtRouteMiddleware((to, from) => {
    if(from.fullPath === '/director/dashboard'){
       console.log('You moved from Director of DASHBOARD!')
    }
})