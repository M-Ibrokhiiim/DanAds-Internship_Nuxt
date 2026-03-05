 export function useUser(){
    const isUserDirector = ref<boolean>(true)
    
    return{
       isUserDirector
    }
}