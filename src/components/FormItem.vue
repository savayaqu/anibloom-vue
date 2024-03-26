<script setup>
defineProps({
  value: String,
  id: String,
  onChange: Function,
  label: String,
  placeholder: String,
  type: {
    required: false,
    type: String,
    default: 'text'
  },
  errorMessage: {
    type: Array,
    default: [],
    required: false
  },
  multiple: Boolean
})
</script>

<template>
  <div class="inputWrapper">
<label class="label" :for="id">
  {{ label }}
</label>

  <input
      :multiple = "multiple"
      :class="['input', {error: errorMessage?.length}]"
  :type="type"
  :value="value"
  @input = "onChange"
  :placeholder="placeholder"
  :id="id">

  <ul v-if="errorMessage.length">
    <li class="errorMessage" v-for="message in errorMessage">
      {{  message  }}
    </li>
  </ul>
  </div>
</template>

<style scoped>
.inputWrapper{
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
}
.input {
  border-radius: 5px;
  padding: 10px 15px;
  outline: none;
  border: 1px solid var(--secondary-bg);
  background-color: var(--secondary-bg);
  color: white;
}
.input:hover {
 border:1px solid var(--color-pink) ;
  color:var(--color-pink) ;

}
.input:active {
  border:1px solid var(--secondary-color) ;
  color:var(--secondary-color) ;
}
.errorMessage,
.error {
  color: var(--error-text)
}
</style>