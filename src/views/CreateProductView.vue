<script setup>
import { onMounted, ref } from "vue";
import { getCategories } from "@/api/methods/product_categories/getCategories.js";
import { createProduct } from "@/api/methods/product_categories/createProduct.js";
import FormItem from "@/components/FormItem.vue";
import Loading from "@/components/Loading.vue";
import router from "@/router/index.js";
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

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

  document.getElementById('PrName').value = ''
  document.getElementById('PrDesc').value = ''
  document.getElementById('PrPrice').value = ''
  document.getElementById('PrQuan').value = ''
  document.getElementById('PrCategoryId').value = ''
  document.getElementById('PrPhoto').value = null

}


};

</script>


<template>
<Loading v-if="isLoading"></Loading>
  <Form class="form" @submit.prevent>
    <FormItem :error-message="errors?.name" class="form-control m-3 w-50"  id="PrName" label="Введите название" name="PrName" type="text" placeholder="Введите название товара"/>
    <p class="p">Здесь вы можете написать описание</p>
    <textarea class="textarea"></textarea>
    <div class="d-f">
      <FormItem :error-message="errors?.price" class="form-control m-3 w-50" label="Введите цену" id="PrPrice" name="PrPrice" min="0.00" step="0.01" type="number" placeholder="Введите цену товара"/>
      <FormItem :error-message="errors?.quantity" class="form-control m-3 w-50" label="Введите количество" id="PrQuan" name="PrQuan" min="0" type="number" placeholder="Введите количество товара"/>
    </div>
    <FormItem :error-message="errors?.photo" class="form-control m-3 w-50" id="PrPhoto" label="Выберите фото" name="PrPhoto" type="file" placeholder="Фото"/>
    <p class="p">Выберите категорию</p>
    <select class="form-control m-3 select" id="PrCategoryId" required>
      <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
    </select>
    <Button class="btn btn-dark m-3 w-50" @click="handleCreateProduct">Добавить товар</Button>
  </Form>
</template>


<style scoped>
.textarea {
  width: 530px;
  height: 100px;
}
.select {
  width: 100px;
  height: 25px;
}
.d-f {
  display: flex;
  gap: 15px;
}
.p {
  margin-top: 20px;
}
</style>