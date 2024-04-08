<script setup>
defineProps({
  submit: {
    type: Function,
    required: false
  },
  method: {
    type: String,
    required: false,
    default: 'GET'
  }
})
</script>

<template>
<form class="form"
      :method="method"
      @submit.prevent="submit">
  <slot/>
</form>
</template>

<style scoped>
.form {
  margin: 0 auto;
  padding-top: 25px;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  gap: 12px;
  width: 500px;
  flex-direction: column;
}
</style>