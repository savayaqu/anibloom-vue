<template>
  <section>
    <h3>{{ product.name }}</h3>
    <img :src=" URL_PHOTO + '/storage/' + product.photo" :alt="product.name" style="width: 250px; height: 272px;">
    <p>Описание товара: {{ product.description }}</p>
    <Button v-if="product.quantity > 0" @click="addToCart(product.id)">В корзину</Button>
    <button v-else disabled>Нет в наличии</button>
    <Review :productId="productId"></Review>
  </section>
</template>

<script setup>
import { getProduct } from "@/api/methods/product_categories/getProduct.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import Review from "@/views/Review.vue";
import {URL_PHOTO} from "@/config/index.js"; // Подключаем компонент Review

const router = useRouter();
const productId = router.currentRoute.value.params.id;
const product = ref({});

onMounted(async () => {
  try {
    const response = await getProduct(productId);
    product.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продукта:', error);
  }
});
</script>
