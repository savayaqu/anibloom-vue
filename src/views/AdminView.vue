<script setup>

import Button from "@/components/Button.vue";
import {deleteCategory} from "@/api/methods/product_categories/deleteCategory.js";
import {onMounted, reactive, ref} from "vue";
import {getCategories} from "@/api/methods/product_categories/getCategories.js";
import {getProducts} from "@/api/methods/product_categories/getProducts.js";
import {URL_PHOTO} from "@/config/index.js";
import {createCategory} from "@/api/methods/product_categories/createCategory.js";
import FormItem from "@/components/FormItem.vue";
import {editCategory} from "@/api/methods/product_categories/editCategory.js";

import {getProfile} from "@/api/methods/profile/getProfile.js";
import router from "@/router/index.js";
import {deleteProduct} from "@/api/methods/product_categories/deleteProduct.js";
import Loading from "@/components/Loading.vue";
const categories = ref([])
const products = ref([])
const profile = ref([])
const isLoading = ref()
const isAdmin = ref()


const load = async () => {
  isLoading.value = true
  isAdmin.value = false
  try {
    const aaa = await getProfile()
    profile.value = aaa.data
    const role = aaa.data.role_id
    const response = await getCategories()
    categories.value = response.data
    const pr = await getProducts()
    products.value = pr.data
    if(role === 2){
      isAdmin.value = true
    }
  }
  catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }

}

const data = reactive({
  fileId: '',
  addNameCategory: '',
  editNameCategory: '',
  successMessage: '',
  errorMessage: '',
  errorMessages: [],
})
const handleAddNameCategory = (e) => data.addNameCategory = e.target.value
const handleEditNameCategory = (e) => data.editNameCategory = e.target.value

const handleAddCategory = async  () => {
  isLoading.value = true
  try {
    const response = await createCategory(data.addNameCategory)
    if(response.code === 422) {
      data.errorMessages = response.message
      alert(response.message)
      return
    }
    if(response.code === 401) {
      data.errorMessages = response.message
      return
    }
    data.successMessage = 'Успех'
  }
  catch (e) {
    console.error(e)
  }
  finally {
    data.addNameCategory = ''
    await load()
    isLoading.value = false
  }
}

const handleEditCategory = async  (categoryId) => {
  isLoading.value = true
  try {
    const response = await editCategory(categoryId, data.editNameCategory)
    if(response.code === 422) {
      data.errorMessage = response.message
      alert(response.message)
      return
    }
    if(response.code === 401) {
      data.errorMessages = response.message
      return
    }
    data.successMessage = 'Успех'
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
    await load()
  }
}
const handleDeleteCategory = async (categoryId) => {
  isLoading.value = true
  try {
    const response = await deleteCategory(categoryId)
    if(response.code === 422) {
      data.errorMessage = response.message
      alert(response.message)
      return
    }
    if(response.code === 401) {
      data.errorMessages = response.message
      return
    }
    data.successMessage = 'Успех'
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
  }
}
const handleDeleteProduct = async (productId) => {
  isLoading.value = true

  try {
    const response = await deleteProduct(productId)
    if(response.code === 422) {
      data.errorMessage = response.message
      alert(response.message)
      return
    }
    if(response.code === 401) {
      data.errorMessages = response.message
      return
    }
    data.successMessage = 'Успех'
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
  }
}
const handleGetProduct = async (productId) =>
    router.push({name: 'EditProduct', params: {id: productId}})
const handleAddProduct = async () =>
    router.push({name: 'CreateProduct'})

onMounted(async () => await load())

</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <section v-if="isAdmin === true">
    <div>
      <h2>Категории</h2>
        <h3>Создание новой категории</h3>
        <FormItem
            @change="handleAddNameCategory"
            label="Название категории"
            placeholder="Введите название категории"
            id="addCategory"
            :error-message="data.errorMessages?.name"
            :value="data.addNameCategory"
        ></FormItem>
        <Button type="submit" @click="handleAddCategory">Создать</Button>
      <table class="table">
        <thead>
        <tr>
          <th>Название</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>
            <FormItem
                @change="handleEditNameCategory"
                label="Название категории"
                placeholder="Введите название категории"
                :id="category.name"
                :error-message="data.errorMessage?.name"
                :value="category.name"
            ></FormItem>
          </td>
          <td>
            <Button class="btn btn-primary m-3 w-50" @click="handleEditCategory(category.id)">Редактировать</Button>
            <Button class="btn btn-danger m-3 w-50" @click="handleDeleteCategory(category.id)">Удалить</Button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
      <h2>Товары</h2>
      <Button @click="handleAddProduct">Создать товар</Button>
    <table>
      <tr>
        <th>Название</th>
        <th>Фото</th>
        <th>Цена</th>
        <th>В наличие</th>
        <th>Действия</th>
      </tr>
      <tr v-for="item in products">
        <td>{{item.name}}</td>
        <td><img :src="URL_PHOTO + '/storage/' + item.photo"></td>
        <td>{{item.price}}</td>
        <td>{{item.quantity}}</td>
        <td>
          <Button @click="handleGetProduct(item.id)">Редактировать</Button>
          <Button @click="handleDeleteProduct(item.id)">Удалить</Button>
        </td>
      </tr>
    </table>

  </section>
  <div v-else>
    <h1>ТЕБЕ ТУТ НЕ РАДЫ</h1>
  </div>
</template>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
td {
  width: fit-content;
  text-align: center;
  padding: 20px;
}
</style>