<script setup>
import {onMounted, reactive, ref} from 'vue';
import {getCategories} from "@/api/methods/product_categories/getCategories.js";
import {getCategoryProducts} from "@/api/methods/product_categories/getCategoryProducts.js";
import {API_URL, URL_PHOTO} from "@/config/index.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

const isLoading = ref()

const handleGetProducts = async (categoryId) =>
    router.push({name: 'products', params: {id: categoryId}})

const handleGetProduct = async (productId) =>
    router.push({name: 'product', params: {id: productId}})

const categories = reactive([]);

import {addToCart} from "@/api/methods/product_categories/addToCart.js";
import Loading from "@/components/Loading.vue";
import {getProfile} from "@/api/methods/profile/getProfile.js";
const loadCategories = async () => {
  isLoading.value = true
  try {
    const response = await getCategories();
    categories.splice(0, categories.length, ...response.data); // Заменяем все элементы массива categories новыми данными
    // После загрузки категорий загружаем первые три продукта для каждой категории
    await Promise.all(categories.map(category => loadCategoryProducts(category.id, category.name)));
  } catch (e) {
    console.log(e);
  }
  finally {
    isLoading.value = false
  }
};

const loadCategoryProducts = async (categoryId, categoryName) => {
  isLoading.value = true
  try {
    const response = await getCategoryProducts(categoryId);
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex !== -1) {
      // Если категория найдена, добавляем только первые три продукта к уже существующим продуктам
      categories[categoryIndex].products = response.data.slice(0, 3);
    }
  } catch (e) {
    console.log(e);
  }
  finally {
    isLoading.value = false
  }
};

onMounted(async () => {
  await loadCategories()
  await getProfile()
})
</script>
<template>
  <Loading v-if="isLoading"></Loading>
  <section class="p-2">
    <div style="display: flex; flex-direction: row; justify-content: center">
      <a v-for="category in categories" :key="category.id" class="category2" @click="handleGetProducts(category.id)" style="font-size: 32px; text-transform: uppercase; text-decoration: none; margin-right: 10px; font-weight: 600; padding: 10px; cursor: pointer">{{ category.name }}</a>
    </div>
    <h2 style="width: 540px; display: flex; justify-content: center; text-align: center; padding-top: 30px; margin: 0 auto; font-weight: 700">Интернет-магазин аниме товаров «Anibloom»</h2>
    <template v-for="category in categories" :key="category.id">
      <div v-if="category.products && category.products.length > 0" style="margin-top: 45px;">
        <div class="category">
          <h3 style="text-align: center">{{ category.name }}</h3>
        </div>
        <div class="card-body" style="display: flex; justify-content: center; gap: 145px; padding-bottom: 35px; margin-top: 30px;">
          <div v-for="product in category.products" :key="product.id"  style=" box-shadow: #662549 0 0 10px 5px; width: 279px; border:ridge 10px #AE445A; height: 485px;">
            <div style="margin: 11px; display: flex; flex-direction: column;">
              <div @click="handleGetProduct(product.id)">
                <img style="width: 235px; height: 270px;" :src="URL_PHOTO + '/storage/' + product.photo" :alt="product.name">
                <p style="text-align: left;  -webkit-line-clamp: 1; display: -webkit-box;  -webkit-box-orient: vertical; overflow: hidden; margin-top: 13px; color: #333333; height:22px; font-size: 16px; font-weight: 600;">{{ product.name }}</p>
                <p style="text-align: left; overflow: hidden; -webkit-line-clamp: 4; display: -webkit-box; -webkit-box-orient: vertical; margin-top: 5px; color: #333333; height: 75px; font-size: 12px; font-weight: 600;">{{product.description}}</p>
              </div>
              <div style="margin-top: -15px;">
                <strong style="margin-top: 86px; color: #333333; font-size: 28px; font-weight: 800">{{ product.price }} руб</strong>
                <Button v-if="product.quantity > 0" style="margin: 0 auto; background: #AE445A; box-shadow: #662549 0 5px 5px; border: #662549 2px solid; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" @click="addToCart(product.id)">В корзину</Button>
                <Button v-else style="margin: 0 auto; background: #f39f5a; border: white 2px solid; border-radius: 10px; width: 235px; height: 40px; color: white; font-size: 16px;" disabled>Нет в наличии</Button>
              </div>
            </div>
          </div>
        </div>
        <Button @click="handleGetProducts(category.id)" style="font-size: 24px; background: #AE445A; box-shadow: #662549 0 5px 5px; border: #662549 2px solid; color: white; text-decoration: none; display: flex; justify-content: center; width: 500px; height: 75px; border-radius: 10px; text-align: center; font-weight: 600; margin: 0 auto;">Просмотреть все товары категории "{{category.name}}"</Button>
      </div>
    </template>
    <div style="margin: 30px;">
      <h2 style="font-weight: 700; font-size: 32px; text-align: center;">ANIBLOOM - магазин аниме, манги, кружек, милых приятностей и значков со всего мира.</h2>
      <p class="end">Все это замечательно подходит в качестве необычного подарка для себя или для близких.</p>
      <p class="end">Неважно, какой у вас повод - у нас есть подарки на Новый год, на день рождения, на 23 февраля и на 8 марта. Мы подберем интересные подарки девушке, парню, брату, сестре, маме, папе, сыну, дочке, племянникам. Особенно вольготно у нас будет любителям гик-культуры - в наличии тысячи штуковин по вашим любимым фильмам, сериалам, аниме, играм и мультикам. Подарочный набор по любимому фандому - будь то Геншин, Наруто, Токийский гуль, Бродячие псы, Евангелион, Берсерк, Токийские мстители, Ван пис, Клинок рассекающий демонов или Джо Джо - это лучший подарок анимешнику.</p>
      <p class="end">Мы находимся в России, у нас есть филиалы в Новосибирске - на ул. Кирова 27, Красном проспекте 69 и пр. Карла Маркса 24а. В Красноярске - на ул. Республики, 43. И в Томске, на улице Елизаровых 43. Мы доставляем - по городу, по России и в другие страны.</p>
    </div>
  </section>
</template>
<style scoped>
.end {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 20px;
  color: #333333;
}
.category {
  box-shadow: 0 5px 15px black;
  border-radius: 10px;
  background: #AE445A;
  color: white;
}
.category2 {
  color: black;
  font-size: 32px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 400;
}
.category2:hover {
  color: grey;
}
</style>


