<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {reactive, ref} from "vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import {login} from "@/api/methods/auth/login.js";
import {useAuthStore} from "@/stores/auth.js";

const  { setToken} = useAuthStore()

const inputData = reactive({
  login: '',
  password: '',
})

const errors = reactive({
  data: {},
  message: ''
})

const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true;

  errors.data = {};
  const data = await login(inputData.login, inputData.password);
  isLoading.value = false;

  if (data?.code === 422) {
    errors.data = data.errors; // Обрабатываем поле `errors`
    return;
  }
  if (data?.code === 401) {
    errors.data = data.errors; // Обрабатываем поле `errors`
    return;
  }

  console.log(data.data)
  setToken?.(data?.data.api_token);
  await router.push({ name: 'home' });
};

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
            id = "login"
            label="Введите логин"
            placeholder="Введите логин"
            type="text"
            :value="inputData.login"
            :error-message="errors.data?.login"
            @change="(event) => onInputChange('login', event)"
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
      </template v-else>

    </Form>
  </main>
</template>
