import { defineRule } from 'vee-validate'

export const isSubmittible = ref<boolean>(false)
const isValidMin = ref<boolean>(false)
const isValidMax = ref<boolean>(false)

defineRule('required',(value:string)=>{
    if(!value) {
      isSubmittible.value = false
      return 'Please, fill the input'
    } 

    isValidMin.value = true
    return true
})

defineRule('minValue',(value:string, [limit]:[string]) => {
    if(value.length <= Number(limit)) {
        isValidMin.value = false
        isSubmittible.value  = false

        return `Input value must be longer than ${limit}!`
    }
    
    isValidMax.value = true
    return true
})

defineRule('maxValue', (value:string, [limit]:[string]) =>{
    if(value.length > Number(limit)) {
        isSubmittible.value = false
        return `Input value must be smaller than ${limit}!`
    }
    
    isSubmittible.value = true
    return true
})

defineRule('validEmail', (value:string) =>{
    const pattern = /@gmail.com/

    if(!pattern.test(value)) {
      isValidMax.value = false
      isValidMin.value = false  
      isSubmittible.value = false

      return `Gmail must be @gmail.com pattern format!`
    }

     if(!isValidMax.value && !isValidMin.value) {
        isSubmittible.value = true
     }

    return true
})
