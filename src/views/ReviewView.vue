<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue';
import Button from "@/components/Button.vue";
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import { addReview } from "@/api/methods/product_categories/reviews/addReview.js";
import { getReviews } from "@/api/methods/product_categories/reviews/getReviews.js";
import Modal from "@/components/Modal.vue";

const props = defineProps(['productId']);
const productId = ref(props.productId);
const reviews = ref([]);
const isLoading = ref()
const token = localStorage.getItem('api_token')
const data = reactive({
  newRating: '',
  newText: '',
  errorMessages: {},
  successMessage: '',
  errorMessage: '',
});
const dataModal = reactive({
  error: '',
  success: ''
})

const handleAddReview = async () => {
  isLoading.value = true
  const response = await addReview(productId.value, data.newRating, data.newText);
  if (response.message === "Отзыв успешно сохранен") {
    dataModal.success = response.message
    setTimeout(() => {
      dataModal.success = '';
    }, 3000);
    await loadReviews(); // Обновляем отзывы после успешного добавления
  } else {
    dataModal.error = response.message
    setTimeout(() => {
      dataModal.error = '';
    }, 3000);
    if (response.code === 422 || response.code === 401) {
      data.errorMessages = response.errors || {};
    } else if (response.code === 404 || response.code === 403) {
      data.errorMessage = response.message;
      await error();
    }
  }

};
const error = async () => {
  dataModal.error = 'Вы не можете оставить отзыв на товар, который вы не покупали'
  setTimeout(() => {
    dataModal.error = '';
  }, 5000);
}
const loadReviews = async () => {
  reviews.value = await getReviews(productId.value);
};
const changeText = (e) => {
 data.newText = e.target.value
  data.errorMessages = ''
}

const changeRating = (e) => {
  data.newRating = e.target.value
}

onMounted(async () => await loadReviews())
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
</script>

<template>
  <div>
    <Form method="POST" :submit="handleAddReview">
      <FormItem
          required
          @change="changeRating"
          label="Рейтинг"
          placeholder="Введите рейтинг"
          type="number"
          id="rating"
          min=1
          max=5
          :value="data.newRating"
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
    </Form>
    <h3 class="review">Отзывы о товаре:</h3>
    <section>
      <div class="no" v-if="reviews.length === 0">Отзывов пока нет :(</div>
      <div v-else>
        <div class="review_div" v-for="review in reviews" :key="review.id">
          <p class="name margin"><b>{{ review.user.login }}</b> - {{ formatDate(review.updated_at) }}</p>
          <p class="rating margin">Рейтинг: {{ review.rating }}</p>
          <p class="review_p margin">{{ review.textReview }}</p>
        </div>
      </div>
    </section>
  </div>
  <Modal  :error="dataModal.error" :success="dataModal.success"></Modal>
</template>

<style scoped>
.name {
  font-size: 20px;
  margin-top: 5px;
}
.rating {
  margin-top: 5px;
  border-bottom: 2px solid black;
}
.review_p {
  margin-top: 5px;
  padding-bottom: 5px;
}
.margin {
  margin-left: 5px;
  margin-right: 5px;
}
.error {
  color: red;
}
.review_div {
  border: 10px ridge #AE445A;
  margin-top: 10px;
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
