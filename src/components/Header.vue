<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import router from "@/router/index.js";
import Button from "@/components/Button.vue";
import { logOut } from "@/api/methods/logOut.js";
import { getProfile } from "@/api/methods/profile/getProfile.js";
import {onMounted, ref, watch} from "vue";
import { getProducts } from "@/api/methods/product_categories/getProducts.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js";

const profile = ref([]);
const originalProducts = ref([]); // Сохраняем оригинальный список продуктов
let products = [];
const state = useAuthStore();
const { token } = storeToRefs(state);
const isAdmin = ref();
const searchQuery = ref('');

onMounted(async () => {
  isAdmin.value = false;
  const aaa = await getProducts();
  originalProducts.value = aaa.data; // Сохраняем оригинальный список продуктов
  products.value = aaa.data;
  const response = await getProfile();
  profile.value = response.data;
  const role = response.data.role_id;
  if (role === 2){
    isAdmin.value = true;
  }
});

const handleInputChange = () => {
  searchChange(); // Вызываем функцию фильтрации при каждом изменении ввода
};

const searchChange = () => {
  if (searchQuery.value.trim() === '') {
    filteredProducts.value = [];
    return;
  }

  filteredProducts.value = originalProducts.value.filter(product => {
    const name = product.name ? product.name : '';
    const description = product.description ? product.description : '';
    const searchQueryValue = searchQuery.value.toLowerCase(); // Приводим поисковой запрос к нижнему регистру

    // Проверяем, содержится ли поисковой запрос в названии или описании товара
    return name.toLowerCase().includes(searchQueryValue) || description.toLowerCase().includes(searchQueryValue);
  });
};

const handleLogout = async () => {
  await logOut();
  state.setToken('');
  await router.push({ name: 'login' });
};

const filteredProducts = ref([]);

watch(searchQuery, () => {
  searchChange();
});
const clearSearch = async () => {
  searchQuery.value = ''
  filteredProducts.value = []
  await searchChange()
}
const handleProductClick = async (productId) => {
  await router.push({name: 'product', params: {id: productId}});
  await clearSearch();
};


</script>
<template>
  <header class="header">
    <ul class="list">
      <li class="item">
        <router-link to="/"><img class="img" src="/images/logo.png" alt="Логотип"></router-link>
      </li>
      <li class="item">
        <input placeholder="Поиск..." v-model="searchQuery" @input="handleInputChange">
        <div class="header__search" v-show="filteredProducts.length > 0">
          <ul class="products">
            <li class="list_products" @click="handleProductClick(product.id)" v-for="product in filteredProducts" :key="product.id">
              {{product.name}}
            </li>
          </ul>
        </div>
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
        <li class="item" v-if="isAdmin">
          <router-link to="/admin"><img class="img-icon" src="/images/admin.png" alt="Админ-панель"></router-link>
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
input {
  width: 270px;
  height: 30px;
  border-radius: 10px;
  border: none;
  font-size: 24px;
}
.products {
  list-style: none;
  width: 250px;
}
.list_products {
  margin-top: 5px;
}
.header__search {
  position: relative;
  width: 100%;
  max-height: 50px;
  background: gray;
  color: white;
  overflow-y: auto;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  z-index: 1060;
  top: 100%;
  border: 1px solid darkgray;
  border-top: 0;
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
