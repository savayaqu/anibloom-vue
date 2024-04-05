<script setup>
defineProps( {
  error: String,
  success: String,

})
</script>

<template>
    <div class="modal" >
        <div v-if="error" class="alert-danger">
          <h2>Ошибка</h2>
          <p>{{error}}</p>
        </div>
        <div v-if="success" class="alert-success">
          <h2>Успех</h2>
          <p>{{success}}</p>
        </div>
    </div>
</template>

<style scoped>
/* Стили модального окна */
.modal {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 130px;
  animation: modalChange .5s linear;
  text-align: center;
}
.alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
.alert-success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
h2 {
  padding-top: 10px;
  padding-bottom: 15px;
}

</style>
