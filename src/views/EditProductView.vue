<script setup>
import {onMounted, reactive, ref} from "vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import {getProduct} from "@/api/methods/product_categories/getProduct.js";
import {editProduct} from "@/api/methods/product_categories/editProduct.js";
import {getCategories} from "@/api/methods/product_categories/getCategories.js";
import {URL_PHOTO} from "@/config/index.js";
import FormItem from "@/components/FormItem.vue";
import {deleteProduct} from "@/api/methods/product_categories/deleteProduct.js";
import Loading from "@/components/Loading.vue";

const errors = ref({});
const isLoading = ref()
const productId = router.currentRoute.value.params.id;
let product = ref([])
const categories = ref([])

const load = async () => {
  isLoading.value = true
  try {
    const response = await getProduct(productId)
    product.value = response.data
    const aee = await getCategories()
    categories.value = aee.data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }

}



const  handleEditProduct = async (item) => {
  isLoading.value = true
  errors.value = {};
  const formData = new FormData();
  const eName = document.getElementById('eName').value;
  const eDesc = document.getElementById('eDesc').value;
  const ePrice = document.getElementById('ePrice').value;
  const eQuan = document.getElementById('eQuan').value;
  const eCat = document.getElementById('eCat').value;

  if (eName !== item.name) {
    formData.append('name', eName);
  }
  if (eDesc !== item.description) {
    formData.append('description', eDesc);
  }
  if (ePrice !== item.price) {
    formData.append('price', ePrice);
  }
  if (eQuan !== item.quantity) {
    formData.append('quantity', eQuan);
  }
  formData.append('category_id', eCat);

  const eFile = document.getElementById('eFile').files[0];
  if (eFile) {
    formData.append('photo', eFile);
  }

  try {
    const response = await editProduct(productId, formData)
    errors.value = response.errors
  } catch (e) {
    console.log(e)
  } finally {
    await load()
    isLoading.value = false
  }
}
const handleDeleteProduct = async () => {
await deleteProduct(productId)
  await load()
}
onMounted(async () => {
  await load()
})
</script>
<template>
  <Loading v-if="isLoading"></Loading>
  <main>
    <h1>Редактирование товара</h1>
    <table>
      <tr>
        <td><FormItem :error-message="errors?.name" :value="product.name" id="eName" type="text"/></td>
        <td><textarea :value="product.description" id="eDesc"></textarea> </td>
        <td><FormItem :error-message="errors?.price" :value="product.price" type="text" id="ePrice"/></td>
        <td><FormItem :error-message="errors?.quantity" :value="product.quantity" type="text" id="eQuan"/></td>
        <td>
          <img style="width: 250px; height: 272px;" :src=" URL_PHOTO + '/storage/' + product.photo" alt="{{item.name}}">
          <FormItem :error-message="errors?.photo" type="file" id="eFile"/>
        </td>
        <td>
          <select class="form-control m-3 w-50"  required>
            <option v-for="category in categories" :value="category.id" id="eCat">{{ category.name }}</option>
          </select>
        </td>
        <td>
          <button class="btn btn-primary m-3 w-50" @click="handleEditProduct(product)">Редактировать</button>
          <button class="btn btn-danger m-3 w-50" @click="handleDeleteProduct">Удалить</button>
        </td>
      </tr>
    </table>
  </main>
</template>
