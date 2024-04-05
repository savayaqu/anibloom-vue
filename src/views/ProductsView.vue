<script setup>
import {onMounted, reactive, ref} from "vue";
import {getProduct} from "@/api/methods/product_categories/getProduct.js";
import {getCategoryProducts} from "@/api/methods/product_categories/getCategoryProducts.js";
import {useRouter} from "vue-router";
import {URL_PHOTO} from "@/config/index.js";
import Button from "@/components/Button.vue";
import {addToCart} from "@/api/methods/product_categories/addToCart.js";
import {getCategories} from "@/api/methods/product_categories/getCategories.js";
import {loadOrder} from "@/api/methods/loadOrder.js";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";

const selectedCategory = ref({})
const categoryProducts = ref([])
const categories = reactive([])
const isLoading = ref()
const router = useRouter();
const categoryId = router.currentRoute.value.params.id;
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
const getSelectedCategory = async () => {
  isLoading.value = true
  try {
    const response = await getCategories()
    categories.value = response.data
    selectedCategory.value = categories.value.find(cat => cat.id === Number(categoryId))
  }catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }

}
const handleGetProduct = async (productId) =>
    router.push({name: 'product', params: {id: productId}})

onMounted(async () => {
  await getSelectedCategory()
  isLoading.value = true
  try {
    categoryProducts.value = await getCategoryProducts(categoryId)
  }catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <Modal v-if="dataModal.error !== '' || dataModal.success !== ''" :error="dataModal.error" :success="dataModal.success"></Modal>
  <h2>Товары в категории "{{selectedCategory.name}}"</h2>
  <div v-if="categoryProducts.length === 0">
    <p>Нет товаров в данной категории</p>
  </div>
  <div v-else>
    <div v-for="product in categoryProducts.data" :key="product.id">
      <div @click="handleGetProduct(product.id)">
        <h3>{{ product.name }}</h3>
        <img style="width: 250px; height: 272px;" :src="URL_PHOTO + '/storage/' + product.photo" alt="{{product.name}}">
      </div>
      <p>Цена: {{ product.price }} руб.</p>
      <!-- Добавляем проверку на количество товара -->
      <Button v-if="product.quantity > 0" style="margin: 0 auto; background: #F2364A; border: white 2px solid; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" @click="handleAddToCard(product.id)">В корзину</Button>
      <Button v-else style="margin: 0 auto; background: lightgray; border: white 2px solid; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" disabled>Нет в наличии</Button>

    </div>
  </div>
</template>

<style scoped>

</style>