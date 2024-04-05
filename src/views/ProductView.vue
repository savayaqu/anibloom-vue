<script setup>
import {addToCart} from "@/api/methods/product_categories/addToCart.js"
import {ref, onMounted, reactive} from "vue"
import { useRouter } from "vue-router"
import Button from "@/components/Button.vue"
import Review from "@/views/ReviewView.vue"
import {URL_PHOTO} from "@/config/index.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js"
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
const router = useRouter()
const productId = router.currentRoute.value.params.id
const product = ref({})
const isLoading = ref()
const dataModal = reactive({
  error: '',
  success: ''
})
const token = localStorage.getItem('api_token')
const handleAddToCard = async (productId) => {
  if (!token) {
    dataModal.error = 'Добавление товара в корзину доступно только авторизированным пользователям'
    setTimeout(() => {
      dataModal.error = '';
    }, 3000);
  }
  else {
    const response = await addToCart(productId)
    dataModal.success = response.message
    setTimeout(() => {
      dataModal.success = '';
    }, 3000);
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await getProduct(productId)
    product.value = response.data;
  }catch (e) {
    console.log(e)
  }finally {
    isLoading.value = false
  }

});
</script>
<template>
<Loading v-if="isLoading"></Loading>
  <Modal v-if="dataModal.error !== '' || dataModal.success !== ''" :error="dataModal.error" :success="dataModal.success"></Modal>
  <section>
    <h3>{{ product.name }}</h3>
    <img :src=" URL_PHOTO + '/storage/' + product.photo" :alt="product.name" style="width: 250px; height: 272px;">
    <p>Описание товара: {{ product.description }}</p>
    <Button v-if="product.quantity > 0" @click="handleAddToCard(product.id)">В корзину</Button>
    <button v-else disabled>Нет в наличии</button>
    <Review :productId="productId"></Review>
  </section>
</template>


