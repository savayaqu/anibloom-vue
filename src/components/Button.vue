<script setup>
defineProps({
  type: {
    required: false,
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <button :type="type" class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;

  border: 3px solid #662549;
  background-color: #AE445A;
  color: white;
  font-weight: bold;

  transition: .15s linear all;
}
.button:hover {
  border: 3px solid #f39f5a;
}
</style>