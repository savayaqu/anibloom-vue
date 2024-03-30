<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {storeToRefs} from "pinia";
import router from "@/router/index.js";
import Button from "@/components/Button.vue";
import {logOut} from "@/api/methods/logOut.js";


const state = useAuthStore()
const  {token} = storeToRefs(state)

const handleLogout = async () => {
  await logOut()
  state.setToken('')

  await router.resolve({name: 'login'})
}
</script>

<template>
<header class="header">
  <ul class="list">
    <li class="item">
      <router-link to="/"><img class="img" src="/images/logo.png" alt="Логотип"></router-link>
    </li>
    <template v-if="token">
      <li class="item">
        <Button @click="router.back()">Назад</Button>
      </li>
      <li class="item">
        <router-link to="/profile"><img class="img-icon" src="/images/user.png" alt="Профиль"></router-link>
      </li>
      <li class="item">
        <router-link to="/cart"><img class="img-icon" src="/images/cart.png" alt="Корзина"></router-link>
      </li>
      <li class="item">
        <Button @click="handleLogout()">Выход</Button>
      </li>
    </template>
    <template v-else>
      <li class="item">
        <router-link to="login">Вход</router-link>
      </li>
      <li class="item">
        <router-link to="register">Регистрация</router-link>
      </li>
    </template>
  </ul>
</header>
</template>

<style scoped>
.img {
  width: 120px;
  height: 120px;
}
.header {

  margin: 10px 0;
  padding: 10px 0;
  background-color: var(--secondary-bg);
  border-radius: 10px;
}
.list {
  display: flex;
  align-items: center;
  gap: 30px;
justify-content: space-around;
  list-style-type: none;
}
.item a {
  padding: 8px 10px;
  transition: .15s linear all;
}
.item a:hover {
color: var(--color-pink);
}
.img-icon {
  height: 30px;
  width: 30px;
}
</style>