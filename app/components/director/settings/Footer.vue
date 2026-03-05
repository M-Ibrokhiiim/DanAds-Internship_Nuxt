 <template>
  <div class="mt-2.5 bg-white shadow-2xl text-white px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all">
    <div class="border-blue-400">
      <p class="mb-3 text-black">VeeValidate:</p>

      <div class="flex flex-col justify-center border-blue-400 border overflow-scroll items-center rounded-xl w-[30vw] h-[30vh]">
        <Form class="mt-2 flex flex-col" @submit="formSubmitter">

          <label for="name" class="ml-2 text-black">Name:</label>
          <Field
            v-model = formData.name
            type="text"
            placeholder="Jack"
            name="name"
            rules="required|minValue:3|maxValue:15"
            class="border-2 text-black border-blue-400 rounded-md ml-2 pl-2 focus:outline-none"
          />
          <ErrorMessage name="name" class="text-black" />

          <label for="surname" class="ml-2 text-black">Surname:</label>
          <Field
            v-model = formData.surname
            type="text"
            placeholder="Joerge"
            name="surname"
            rules="required|minValue:4|maxValue:15"
            class="border-2 text-black border-blue-400 rounded-md ml-2 pl-2 focus:outline-none"
          />
          <ErrorMessage name="surname" class="text-black" />

          <label for="email" class="ml-2 text-black">Gmail:</label>
          <Field
            v-model = formData.gmail
            type="email"
            placeholder="jackjoirge@gmail.com"
            name="email"
            rules="required|validEmail"
            class="border-2 border-blue-400 text-black rounded-md ml-2 pl-2 focus:outline-none"
          />
          <ErrorMessage name="email" class="text-black" />

          <button
            type="submit"
            :disabled="!isSubmittible"
            :class="isSubmittible
              ? 'bg-blue-500 text-white mt-4 ml-32.5 transition-all active:scale-50 duration-100 rounded-md cursor-pointer w-25'
              : 'bg-blue-500 mt-4 ml-32.5 duration-100 rounded-md text-white w-25 disabled:opacity-50 disabled:cursor-not-allowed'"
          >
            Submit
          </button>

        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { isSubmittible } from '~/composables/useValidators'
import type { FormData } from '~/types/useFormValidator'

const formData = ref<FormData>({
  name:'',
  surname: '',
  gmail: ''
})


function formSubmitter() {
   formData.value.name    = ''
   formData.value.surname = ''
   formData.value.gmail   = ''
   
}

</script>
