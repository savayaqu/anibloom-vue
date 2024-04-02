<script setup>
import {addToCart} from "@/api/methods/product_categories/addToCart.js"
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Button from "@/components/Button.vue"
import Review from "@/views/ReviewView.vue"
import {URL_PHOTO} from "@/config/index.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js"
import Loading from "@/components/Loading.vue";
const router = useRouter()
const productId = router.currentRoute.value.params.id
const product = ref({})
const isLoading = ref()
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
  <section>
    <h3>{{ product.name }}</h3>
    <img :src=" URL_PHOTO + '/storage/' + product.photo" :alt="product.name" style="width: 250px; height: 272px;">
    <p>Описание товара: {{ product.description }}</p>
    <Button v-if="product.quantity > 0" @click="addToCart(product.id)">В корзину</Button>
    <button v-else disabled>Нет в наличии</button>
    <Review :productId="productId"></Review>
  </section>
</template>


