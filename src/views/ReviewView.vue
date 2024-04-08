<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue';
import Button from "@/components/Button.vue";
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import { addReview } from "@/api/methods/product_categories/reviews/addReview.js";
import { getReviews } from "@/api/methods/product_categories/reviews/getReviews.js";

const props = defineProps(['productId']);
const productId = ref(props.productId);
const reviews = ref([]);
const isLoading = ref()
const data = reactive({
  newRating: '',
  newText: '',
  errorMessages: {},
  successMessage: '',
  errorMessage: '',
});

const handleAddReview = async () => {
  isLoading.value = true
  data.errorMessages = {};
  data.errorMessage = '';
  const response = await addReview(productId.value, data.newRating, data.newText);
  if (response.success) {
    data.successMessage = 'Отзыв успешно добавлен';
    await loadReviews(); // Обновляем отзывы после успешного добавления
  } else {
    if (response.code === 422 || response.code === 401) {
      data.errorMessages = response.errors || {};
    } else if (response.code === 404 || response.code === 403) {
      data.errorMessage = response.message;
    }
  }
};

const loadReviews = async () => {
  reviews.value = await getReviews(productId.value);
};
const changeText = (e) => data.newText = e.target.value
const changeRating = (e) => data.newRating = e.target.value

onMounted(async () => await loadReviews())
</script>

<template>
  <Form method="POST" :submit="handleAddReview">
    <FormItem
        @change="changeRating"
        label="Рейтинг"
        placeholder="Введите рейтинг"
        type="number"
        id="rating"
        min="1"
        max="5"
        :value="data.newRating"
        :error-message="data.errorMessages.rating"
    >
    </FormItem>
    <FormItem
        @change="changeText"
        label="Ваш отзыв"
        placeholder="Введите отзыв тут"
        id="textReview"
        :value="data.newText"
        :error-message="data.errorMessages.textReview"
    >
    </FormItem>
    <Button type="submit" :disabled="data.isLoading">Добавить отзыв</Button>
    <p v-if="data.errorMessage" class="error">{{ data.errorMessage }}</p> <!-- Отображение сообщения об ошибке -->
    <p v-if="data.successMessage">{{ data.successMessage }}</p>
  </Form>
  <h3 class="review">Отзывы о товаре:</h3>
  <section>
    <div class="no" v-if="reviews.length === 0">Отзывов пока нет :(</div>
    <div v-else>
      <div v-for="review in reviews" :key="review.id">
        <p>Отзыв написан: {{ review.user.login }}</p>
        <p>Рейтинг: {{ review.rating }}</p>
        <p>Описание: {{ review.textReview }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  color: red;
}
.review {
  text-align: center;
  margin-top: 15px;
}
.no {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}
</style>
