<script setup>

import OrderView from "@/views/OrderView.vue";
import {onMounted, ref} from "vue";
import {getProfile} from "@/api/methods/profile/getProfile.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js";
import Loading from "@/components/Loading.vue";
const isLoading = ref()
const profile = ref([])
onMounted(async () => {
  isLoading.value = true
  try {
    const response = await getProfile()
    profile.value = response.data
  }catch (e) {
    console.log(e)
  }finally {
    isLoading.value = false
  }


})
</script>

<template>
  <Loading v-if="isLoading"></Loading>
<div class="center">
  <h2>Пользовательские данные</h2>
  <div class="data">
    <p>Фамилия: {{profile.surname}}</p>
    <p>Имя: {{profile.name}}</p>
    <p>Отчество: {{profile.patronymic}}</p>
    <p>Эл. почта: {{profile.email}}</p>
    <p>Телефон: {{profile.telephone}}</p>
    <p>Дата рождения: {{profile.birth}}</p>
  </div>
</div>
<OrderView></OrderView>
</template>

<style scoped>
.center {
  text-align: center;
}
.data {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>