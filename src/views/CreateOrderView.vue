<script setup>
import { getPayments } from "@/api/methods/profile/getPayments.js";
import Button from "@/components/Button.vue";
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {onMounted, reactive, ref} from "vue";
import {checkout} from "@/api/methods/profile/checkout.js";

const payments = ref([]);
const data = reactive({
  newAddress: '',
  newPayment: '',
});
const isLoading = ref()

const handleAddress = (e) => data.newAddress = e.target.value;
const handlePaymentId = (e) => data.newPayment = e.target.value;
const errors = reactive({
  data: {},
  message: ''
})
const handleCheckout = async () => {
  errors.data = {}
  isLoading.value = true

  try {
    const response = await checkout(data.newAddress, data.newPayment);
    console.log(response.errors)
    if (response.code === 422) {
      errors.data = response.errors;
      return;
    }
    if (response.code === 401) {
      errors.data = response.errors;
      return;
    }
    data.successMessage = 'Успех';
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false
  }
};

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await getPayments();
    payments.value = response.data;
  } catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
});
</script>

<template>
  <div>
    <h3>Адрес доставки</h3>
    <FormItem
        @change="handleAddress"
        id="address"
        name="address"
        type="text"
        :error-message="errors.data?.address"
    ></FormItem>
  </div>
  <div>
    <h3>Способ оплаты</h3>
    <Form method="POST" :submit="handleCheckout">
      <div v-for="payment in payments">
        <input type="radio" :id="payment.name" name="payment" @change="handlePaymentId" :value="payment.id">
        <label :for="payment.name">{{payment.name}}</label>
      </div>
    </Form>
  </div>
  <Button :disabled="data.isLoading" @click="handleCheckout">Оформить заказ</Button>
</template>

<style scoped>

</style>
