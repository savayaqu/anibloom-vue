<script setup>
import {getCart} from "@/api/methods/profile/getCart.js";
import {URL_PHOTO} from "@/config/index.js";
import {onMounted, reactive, ref} from "vue";
import {updateCart} from "@/api/methods/profile/updateCart.js";
import {deleteCartItem} from "@/api/methods/profile/deleteCartItem.js";
import Button from "@/components/Button.vue";
import OrderView from "@/views/CreateOrderView.vue";
import Loading from "@/components/Loading.vue";
import CreateOrderView from "@/views/CreateOrderView.vue";
const cartItems = reactive({
  total: 0,
  items: []
})
const totalPrice = ref(0)
const isLoading = ref()
const handleGetCart = async () => {
  isLoading.value = true
  try {
    const data = await getCart()
    cartItems.items = data.cart_items
    totalPrice.value = data.total
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => await handleGetCart())


const data = reactive({
  fileId: '',
  email: '',
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  errorMessages: [],
  data: [],
  deleteMessage: ''
})

// Метод для вычисления доступных количеств товара
const availableQuantities = (item) => {
  // Проверяем, доступен ли объект товара в элементе корзины
  if (item.product) {
    // Получаем количество товара из объекта товара
    const productQuantity = item.product.quantity;
    // Создаем массив чисел от 1 до доступного количества товара
    return Array.from({ length: productQuantity }, (_, index) => index + 1);
  } else {
    return [];
  }
}
const handleDeleteCartItem = async (productId) => {
  await deleteCartItem(productId)
  await handleGetCart()
}
const handleUpdateCart = async (productId, quantity) => {
  await updateCart(productId, quantity)
  await handleGetCart()
}
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <div v-if="!cartItems.items.length">
    <h2>Ваша корзина пуста</h2>
  </div>
  <div v-else>
    <div v-for="item in cartItems.items" :key="item.id">
      <img :src=" URL_PHOTO + '/storage/' + item.product.photo" :alt="item.product.name">
      <p>{{item.price}}</p>
      <select v-model="item.quantity" @change="handleUpdateCart(item.product.id, item.quantity)">
        <option v-for="quantity in availableQuantities(item)" :key="quantity" :value="quantity">{{quantity}}</option>
      </select>
      <div>
        <Button @click="handleDeleteCartItem(item.product.id)">
          <img src="/images/trash.png" alt="Мусорка">
        </Button>
      </div>
      <div><b>Общая стоимость: {{totalPrice}}</b></div>

    </div>
    <CreateOrderView></CreateOrderView>

  </div>

</template>

<style scoped>

</style>