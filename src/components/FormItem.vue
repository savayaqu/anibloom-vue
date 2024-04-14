<script setup>
defineProps({
  value: String,
  id: String,
  onChange: Function,
  label: String,
  placeholder: String,
  required: String,
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
  multiple: Boolean,
  min: Number,
  max: Number,
  step: Number,
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
      :step="step"
      :value="value"
      @input = "onChange"
      :placeholder="placeholder"
      :min=min
      :max=max
      :id="id"
      :required="required">
    <p style="text-align: center" v-if="errorMessage.length" class="errorMessage" v-for="message in errorMessage">
      {{  message  }}
    </p>
  </div>
</template>

<style scoped>
.inputWrapper{
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
}
.input {
  border-radius: 5px;
  padding: 10px 15px;
  outline: none;
  border: 3px solid #f39f5a;
  background-color: white;
  color: black;
  width: 250px;
  transition: .15s linear all;
}
.input:hover {
 border:3px solid #662549 ;
  color:#662549 ;

}
.input:active {
  border:3px solid var(--secondary-color) ;
  color:var(--secondary-color) ;
}
.errorMessage,
.error {
  color: var(--error-text)
}
</style>