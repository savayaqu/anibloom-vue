<template>
  <main>
    <h1 class="reg">Редактирование профиля</h1>

    <Form :submit="onSubmit" method="PATCH">
      <p v-if="isLoading">Загрузка...</p>

      <template v-else>
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
          />
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
              id="birth"
              label="Введите дату рождения"
              placeholder="Введите дату рождения"
              type="date"
              :value="inputData.birth"
              :error-message="errors.data?.birth"
              @change="(event) => onInputChange('birth', event)"
          />
          <FormItem
              id="telephone"
              label="Введите телефон"
              placeholder="Введите телефон"
              type="text"
              :value="inputData.telephone"
              :error-message="errors.data?.telephone"
              @change="(event) => onInputChange('telephone', event)"
          />
        </div>

        <Button @submit.native.prevent="onSubmit" type="submit">Сохранить</Button>
      </template>
    </Form>
  </main>
</template>

<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";
import {onMounted, reactive, ref} from "vue";
import {getProfile} from "@/api/methods/profile/getProfile.js";
import {updateProfile} from "@/api/methods/profile/updateProfile.js";
import router from "@/router/index.js";

let profile = ref({});
const inputData = reactive({
  name: "",
  surname: "",
  patronymic: "",
  login: "",
  password: "",
  birth: "",
  email: "",
  telephone: "",
});
const errors = reactive({
  data: {},
  message: "",
});
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const response = await getProfile();
  profile.value = response.data;
  isLoading.value = false;

  // Установка значений из профиля в поля ввода
  inputData.name = profile.value.name;
  inputData.surname = profile.value.surname;
  inputData.patronymic = profile.value.patronymic;
  inputData.login = profile.value.login;
  inputData.password = profile.value.password;
  inputData.email = profile.value.email;
  inputData.birth = profile.value.birth;
  inputData.telephone = profile.value.telephone;
});

const onSubmit = async () => {
  isLoading.value = true;
  errors.data = {};

  const data = await updateProfile(inputData.name,inputData.surname,inputData.patronymic,inputData.login,inputData.password,inputData.email,inputData.birth,profile.value.telephone);

  isLoading.value = false;

  if (data?.code === 422 || data?.code === 401) {
    errors.data = data.errors;
    return;
  }

  await router.push({name: "profile"});
};

const onInputChange = (field, event) => {
  const value = event.target.value;
  errors.data[field] = [];
  inputData[field] = value;
};
</script>

<style scoped>
.reg {
  text-align: center;
}

.default {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
