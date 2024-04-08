<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {reactive, ref} from "vue";
import {register} from "@/api/methods/auth/register.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

const inputData = reactive({
  name: '',
  surname: '',
  patronymic: '',
  login: '',
  password: '',
  birth:  '',
  email: '',
  telephone: '',
})

const errors = reactive({
  data: {},
  message: ''
})

const isLoading = ref(false)


const onSubmit = async () => {
  isLoading.value = true

  errors.data = {}
  const data = await register(inputData.name, inputData.surname, inputData.patronymic, inputData.login, inputData.password, inputData.email, inputData.birth, inputData.telephone)

  isLoading.value = false


  if (data?.code === 422) {
    errors.data = data.errors
    return
  }
  if (data?.code === 401) {
    errors.data = data.errors
    return
  }
  await router.push({name: 'login'})

}
const onInputChange = (field, event) => {
  const value = event.target.value;
  errors.data[field] = [];

  inputData[field] = value;
}


</script>
<template>
  <main>
    <h1 class="reg">Регистрация</h1>

    <Form :submit="onSubmit" method="POST">

      <p v-if="isLoading">Загрузка...</p>

      <template v-else>
        <h2 class="reg">Введите информацию о вас, чтобы мы знали как к вам обращаться</h2>
        <div class="default">
          <FormItem
            id="name"
            label="Введите имя"
            placeholder="Введите имя"
            type="text"
            :value="inputData.name"
            :error-message="errors.data?.name"
            @change="(event) => onInputChange('name', event)"
        />
          <FormItem
              id="surname"
              label="Введите фамилию"
              placeholder="Введите фамилию"
              type="text"
              :value="inputData.surname"
              :error-message="errors.data?.surname"
              @change="(event) => onInputChange('surname', event)"
          />
          <FormItem
              id="patronymic"
              label="Введите отчество"
              placeholder="Введите отчество"
              type="text"
              :value="inputData.patronymic"
              :error-message="errors.data?.patronymic"
              @change="(event) => onInputChange('patronymic', event)"
          /></div>
        <h2 class="reg">Теперь, пожалуйста, дополнительную информацию</h2>
        <h2 class="reg">P.S: она нам тоже важна)</h2>
        <div class="default">
          <FormItem
              id="birth"
              label="Введите дату рождения"
              placeholder="Введите дату рождения"
              type="date"
              :value="inputData.birth"
              :error-message="errors.data?.birth"
              @change="(event) => onInputChange('birth', event)"
          />
          <FormItem
              id="email"
              label="Введите почту"
              placeholder="Введите почту"
              type="email"
              :value="inputData.email"
              :error-message="errors.data?.email"
              @change="(event) => onInputChange('email', event)"
          />
          <FormItem
              id="telephone"
              label="Введите номер телефона"
              placeholder="Введите номер телефона"
              type="text"
              :value="inputData.telephone"
              :error-message="errors.data?.telephone"
              @change="(event) => onInputChange('telephone', event)"
          />
        </div>
        <h2 class="reg">А теперь придумайте логин и пароль для входа в аккаунт</h2>
        <div>
          <FormItem
              id="login"
              label="Введите логин"
              placeholder="Введите логин"
              type="text"
              :value="inputData.login"
              :error-message="errors.data?.login"
              @change="(event) => onInputChange('login', event)"
          />
          <FormItem
              id="password"
              label="Введите пароль"
              placeholder="Введите пароль"
              type="password"
              :value="inputData.password"
              :error-message="errors.data?.password"
              @change="(event) => onInputChange('password', event)"
          />
        </div>



        <Button @submit.prevent="onSubmit" type="submit">Зарегистрироваться</Button>
      </template>

    </Form>
  </main>
</template>
<style scoped>
.reg {
  text-align: center;
}
.default {
  display: flex;
  gap: 20px;
}
</style>
