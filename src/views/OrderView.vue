<script setup>
import {onMounted, ref} from "vue";
import {loadOrder} from "@/api/methods/loadOrder.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js";
import Button from "@/components/Button.vue";
import {URL_PHOTO} from "@/config/index.js";
import router from "@/router/index.js";
const ocp = ref([])
onMounted(async () => {
  ocp.value = await loadOrder()
})
const handleGetProduct = async (fileId) =>
    router.push({name: 'product', params: {id: fileId}})

</script>

<template>
<h2>Заказы: </h2>
  <div v-for="item in ocp" :key="item.order.id" class="order">
    <p>Дата оформления заказа: {{ item.order.dateOrder }}</p>
    <p>Адрес доставки: {{ item.order.address }}</p>
    <p>Способ оплаты: {{item.paymentName}}</p>
    <p>Статус заказа: {{item.statusName}}</p>
    <p>Товары:</p>
    <div v-for="(compound, index) in item.compound" :key="index" class="product" style="display: flex; flex-direction: row; column-gap: 40px" >
      <img :src="URL_PHOTO + '/storage/' + item.products[index].photo" :alt="item.products[index].name" style="object-fit: cover; width: 100px; height: auto;">
      <p>{{ item.products[index].name }}</p>
      <p>Количество: {{ compound.quantity }}</p>
      <p>Общая цена: {{ compound.total }} руб</p>
      <Button @click="handleGetProduct(item.products[index].id)">Оставить отзыв</Button>
    </div>
  </div>
</template>

<style scoped>

</style>