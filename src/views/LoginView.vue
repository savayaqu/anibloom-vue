<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {reactive, ref} from "vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import {authorization} from "@/api/methods/auth/authorization.js";
import {useAuthStore} from "@/stores/auth.js";

const  { setToken} = useAuthStore()

const inputData = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
})

const errors = reactive({
  data: {},
  message: ''
})

const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true

  errors.message = ''
  errors.data = {}
  const data = await authorization(inputData.email, inputData.password)

  isLoading.value = false


  if (data?.code === 422) {
    errors.data = data.message
    return
  }
  if (data?.code === 401) {
    errors.data = data.message
    return
  }
  setToken?.(data?.token)
  await router.push({name: 'home'})

}
const  onInputChange = (field, event) => {
  const value = event.target.value

  errors.data[field] = []
  inputData[field] = value
}
</script>

<template>
  <main>
    <h1>Авторизация</h1>

    <Form :submit="onSubmit" method="POST">
      <p v-if="errors.message">Неправильные данные для входа</p>
      <p v-if="isLoading">Загрузка...</p>

      <template v-else>
        <FormItem
            id = "email"
            label="Введите почту"
            placeholder="Введите почту"
            type="email"
            :value="inputData.email"
            :error-message="errors.data?.email"
            @change="(event) => onInputChange('email', event)"
        />

        <FormItem
            id = "password"
            label="Введите пароль"
            placeholder="Введите пароль"
            type="password"
            :value="inputData.password"
            :error-message="errors.data?.password"
            @change="(event) => onInputChange('password', event)"
        />
        <Button @submit.prevent="onSubmit" type="submit">Войти</Button>
      </template>

    </Form>
  </main>
</template>
