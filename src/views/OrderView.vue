<script setup>
import {onMounted, reactive, ref} from "vue";
import {loadOrder} from "@/api/methods/loadOrder.js";
import Button from "@/components/Button.vue";
import {URL_PHOTO} from "@/config/index.js";
import router from "@/router/index.js";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
const isLoading = ref()
const ocp = ref([])
onMounted(async () => {
  isLoading.value = true
  try {
    ocp.value = await loadOrder()
  }catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
const handleGetProduct = async (fileId) =>
    router.push({name: 'product', params: {id: fileId}})

</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <h2 class="center">Ваши заказы:</h2>
  <div v-for="item in ocp" :key="item.order.id" class="order">
    <h2 class="center">Заказ №{{item.order.id}}</h2>
    <h4>Заказ от {{item.order.dateOrder}}</h4>
    <div class="margin2">
      <h2 style="padding-bottom: 20px;">Товары заказа:</h2>
      <table class="table2">
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Количество</th>
          <th></th>
        </tr>
        <tr v-for="(compound, index) in item.compound" :key="index" class="product">
          <td><img :src="URL_PHOTO + '/storage/' + item.products[index].photo" alt="Упс..." style="object-fit: cover; width: 100px; height: auto;"></td>
          <td>{{item.products[index].name}}</td>
          <td>{{compound.total}} руб</td>
          <td>{{compound.quantity}} шт</td>
          <td><Button @click="handleGetProduct(item.products[index].id)">Оставить отзыв</Button>
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<style scoped>
.table2 {
  margin: 0 auto;
}

td {
  width: fit-content;
  text-align: center;
  padding: 20px;
}

.margin2 {
  margin-top: 20px;
}

.center {
  text-align: center;
  margin-top: 30px;
}

.order {
  margin-top: 15px;
}

.product {
  margin-top: 15px;
}
</style>