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
  <h2 class="text">Товары в категории "{{selectedCategory.name}}"</h2>
  <div v-if="categoryProducts.length === 0">
    <p>Нет товаров в данной категории</p>
  </div>
  <div class="div" v-else>
    <div class="margin" v-for="product in categoryProducts.data" :key="product.id">
      <div @click="handleGetProduct(product.id)">
        <h3 class="product">{{ product.name }}</h3>
      </div>
      <div style="display:flex;">
        <div class="alt">
          <img v-if="product.photo" :src="URL_PHOTO + '/storage/' + product.photo" style="width: 250px; height: 272px; border-radius: 5px;" alt="Product Image">
          <img v-else src="/public/images/logo.png" style="width: 250px; height: 272px; border-radius: 5px;" alt="Default Image">
        </div>
        <div>
          <p class="desc">{{ product.description }}</p>
          <p class="price">Цена: {{ product.price }} руб.</p>
          <!-- Добавляем проверку на количество товара -->
          <Button class="button" v-if="product.quantity > 0" style=" background: #AE445A; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" @click="handleAddToCard(product.id)">В корзину</Button>
          <Button class="no" v-else style="background: #f39f5a; border: white 2px solid; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" disabled>Нет в наличии</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text {
  text-align: center;
}
.margin {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
}
.desc {
  margin-left: 10px;
  margin-top: 10px;
  width: 850px;
}
.alt {
  width: 260px;
  height: 282px;
  border: 5px solid #AE445A;
  margin-top: 10px;
}
.price {
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
}
.button {
  margin-left: 10px;
  margin-top: 10px;
  border: #662549 2px solid;
  box-shadow: #662549 0 5px 5px;
}
.button:hover {
  border: #f39f5a 2px solid;
  box-shadow: #f39f5a 0 5px 5px;
}
.no {
  box-shadow: #f39f5a 0 5px 5px;
}
</style>