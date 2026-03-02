<template>
    <div
      
      class="bottom-6 right-6 bg-slate-900  text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2 transition-all"
    >
      <div>
        <p class="mb-3">VeeValidate:</p>
        <div class=" flex  flex-col justify-center  border  overflow-scroll items-center rounded-xl w-[30vw] h-[30vh]">
          <Form class="mt-2  flex  flex-col"  @submit="handleInputs" >
            <label for="name" class="ml-2">Name:</label> 
            <Field type="text"  name="name" :rules="inputValidator" class=" border-2 border-white rounded-md ml-2 pl-2 focus:outline-none"/>
            <ErrorMessage name="name"/>

            <label for="surname" class="ml-2">Surname:</label> 
            <Field type="text"  name="surname" :rules="CheckSurname" class=" border-2 border-white rounded-md ml-2 pl-2 focus:outline-none"/>
            <ErrorMessage name="surname"/>

            <label for="email" class="ml-2">Gmail:</label> 
            <Field type="email"  name="email" :rules="inputValidator" class=" border-2 border-white rounded-md ml-2 pl-2 focus:outline-none"/>
            <ErrorMessage name="email"/>
            
            <button type="submit" class=" bg-white transition-all active:scale-50 mt-4 ml-[130px] duration-100 cursor-pointer rounded-md text-black w-[100px]">Submit</button>
          </Form>
          
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage} from 'vee-validate'

function handleInputs(values:any){
  console.log(values)
}

function inputValidator(value:any){
  if(!value) {
    return 'Please, fill the field!'
  }

  return true
}

function CheckSurname(value:any){
   if(!value) {
    return 'Please, fill the field!'
  }

  if(!value.startsWith('-')){
    return 'Surname must start with dash(-)'
  }

  return true
}
</script>