<script setup>
import { onMounted, ref } from "vue";
import { getCategories } from "@/api/methods/product_categories/getCategories.js";
import { createProduct } from "@/api/methods/product_categories/createProduct.js";
import FormItem from "@/components/FormItem.vue";
import Loading from "@/components/Loading.vue";
import router from "@/router/index.js";

const categories = ref([]);
const errors = ref({});
const isLoading = ref()

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
});

const handleCreateProduct = async () => {
  errors.value = {};
  isLoading.value = true
  // Получение данных из формы
  const formData = new FormData();
  formData.append('name', document.getElementById('PrName').value.trim());
  formData.append('description', document.getElementById('PrDesc').value.trim());
  formData.append('price', document.getElementById('PrPrice').value.trim());
  formData.append('quantity', document.getElementById('PrQuan').value.trim());
  formData.append('category_id', document.getElementById('PrCategoryId').value);

  // Добавление фото в FormData, если выбрано
  const photoFile = document.getElementById('PrPhoto').files[0];
  if (photoFile) {
    formData.append('photo', photoFile);
  }

try {
  // Отправка данных на сервер
  const  response =  await createProduct(formData);
  errors.value = response.errors
} catch (e) {
    console.log(e)
} finally {
  isLoading.value = false
  await router.push({name: 'admin'})
}


};

</script>


<template>
<Loading v-if="isLoading"></Loading>
  <form class="form-control" @submit.prevent>
    <FormItem :error-message="errors?.name" class="form-control m-3 w-50"  id="PrName" name="PrName" type="text" placeholder="Введи название товара"/>
    <FormItem :error-message="errors?.description" class="form-control m-3 w-50" id="PrDesc" name="PrDesc" type="text" placeholder="Введи описание товара"/>
    <FormItem :error-message="errors?.price" class="form-control m-3 w-50"  id="PrPrice" name="PrPrice" type="text" placeholder="Введи цену товара"/>
    <FormItem :error-message="errors?.quantity" class="form-control m-3 w-50"  id="PrQuan" name="PrQuan" type="text" placeholder="Введи количество товара"/>
    <FormItem :error-message="errors?.photo" class="form-control m-3 w-50" id="PrPhoto" name="PrPhoto" type="file" placeholder="Фото"/>
    <select class="form-control m-3 w-50" id="PrCategoryId" required>
      <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
    </select>
    <button class="btn btn-dark m-3 w-50" @click="handleCreateProduct">Добавить товар</button>
  </form>
</template>


<style scoped>

</style>