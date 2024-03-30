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
  isLoading: false,
});

const handleAddress = (e) => data.newAddress = e.target.value;
const handlePaymentId = (e) => data.newPayment = e.target.value;
const errors = reactive({
  data: {},
  message: ''
})
const handleCheckout = async () => {
  errors.data = {}


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
    data.isLoading = false;
  }
};

onMounted(async () => {
  try {
    const response = await getPayments();
    payments.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продукта:', error);
  }
});
</script>

<template>
  <div>
    <h3>Адрес доставки</h3>
    <FormItem
        @input="handleAddress"
        v-model="data.newAddress"
        id="address"
        name="address"
        type="text"
        :error-message="errors.data?.address"
    ></FormItem>
  </div>
  <div>
    <h3>Способ оплаты</h3>
    <Form method="POST" :submit="handleCheckout">
      <FormItem
          v-for="payment in payments"
          :key="payment.id"
          @input="handlePaymentId"
          type="radio"
          :label="payment.name"
          :value="payment.id"
          :checked="data.newPayment === payment.id"
          :error-message="errors.data?.payment_id"
      ></FormItem>
    </Form>
  </div>
  <Button :disabled="data.isLoading" @click="handleCheckout">Оформить заказ</Button>
</template>

<style scoped>

</style>
