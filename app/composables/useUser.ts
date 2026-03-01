import type { NuxtLayouts } from '#app';

export function useUser(){
    const isUser = ref<keyof NuxtLayouts>('director') 

    return{
       isUser
    }
}