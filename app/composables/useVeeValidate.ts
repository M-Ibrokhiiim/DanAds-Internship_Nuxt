import type { Inputs } from "~/types/useFormValidator"

export default function useFormValidator(){
    const formInputs:Inputs = {name: '', surname: '', gmail:''}

    const isSubmittible = ref<boolean>(true)
    const isValidName = ref<boolean>(false)
    const isValidSurname = ref<boolean>(false)
    
    function formSubmitter(values:unknown){
     
      formInputs.name = '' 
      formInputs.surname = ''
      formInputs.gmail = ''
      console.log(values)
    }
    function nameValidator(input:unknown):string | boolean{
        const value = input as string

        if(!value){
            isValidName.value = false
            isSubmittible.value = true
            return 'Please fill the field!'
        }else if(value.length <=3){
            isValidName.value = false
            isSubmittible.value = true
            return 'Sorry,NAME must be longer than 3 letters!'
        }

        isValidName.value = true
        return true
    }

    function surnameValidator(input:unknown):string | boolean{
        const value = input as string
        if(!value){
            isValidSurname.value  = false
            isSubmittible.value = true
            return 'Please fill the field!'
        }else if(value.length <= 3){
            isValidSurname.value  = false
            isSubmittible.value = true
            return 'Sorry,SURNAME must be longer than 3 letters!'
        }

        isValidSurname.value = true
        return true
    }

    function gmailValidator(input:unknown):string | boolean{
        const value = input as string
        const pattern = /@gmail.com/

        if(!value){
            isSubmittible.value = true
            return 'Please fill the field!'
        }else if(!pattern.test(value)){
            isSubmittible.value = true
            return 'Please, write @gmail.com after your full-gmail'
        }
        
        if(isValidName.value && isValidSurname.value){
            isSubmittible.value = false
        } 
        isSubmittible.value = false
        return true
    }
 
    return{
       nameValidator,
       surnameValidator,
       gmailValidator,
       isSubmittible,
       formSubmitter,
       formInputs
    }
}