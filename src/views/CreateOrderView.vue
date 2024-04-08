<script setup>
import { getPayments } from "@/api/methods/profile/getPayments.js";
import Button from "@/components/Button.vue";
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {onMounted, reactive, ref} from "vue";
import {checkout} from "@/api/methods/profile/checkout.js";
import router from "@/router/index.js";

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
// Добавляем свойство onCheckoutOrder
const { onCheckoutOrder, handleGetCart } = defineProps(['onCheckoutOrder', 'handleGetCart']);

// Обработка события checkoutOrder
const handleCheckout = async () => {
  isLoading.value = true;
  try {
    const response = await checkout(data.newAddress, data.newPayment);
    if (response.code === 422 || response.code === 401) {
      errors.value.data = response.errors;
      return;
    }
    // Вызываем переданную функцию handleGetCart
    if (typeof handleGetCart === 'function') {
      handleGetCart();
    }
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
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
  <Form style="margin-top: 20px;">
    <div>
      <FormItem
          @change="handleAddress"
          id="address"
          name="address"
          type="text"
          label="Введите адрес доставки"
          :error-message="errors.data?.address"
      ></FormItem>
    </div>
    <div>
      <h3 class="text">Выберите способ оплаты: </h3>
      <Form class="left" method="POST" :submit="handleCheckout">
        <div v-for="payment in payments">
          <input type="radio" :id="payment.name" name="payment" @change="handlePaymentId" :value="payment.id">
          <label :for="payment.name">{{payment.name}}</label>
        </div>
      </Form>
    </div>
    <Button :ref="handleGetCart" @click="handleCheckout">Оформить заказ</Button>
  </Form>

</template>

<style scoped>
.text {
  text-align: center;
}
.left {
  align-items: flex-start;
  margin-left: 225px;
  margin-top: -15px;
}
</style>
