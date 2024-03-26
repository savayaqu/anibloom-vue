<script setup>

import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {ref} from "vue";
import {handleUploadFiles} from "@/utils/handleUploadFiles.js";
import Button from "@/components/Button.vue";
import {handleDownloadFile} from "@/utils/handleDownloadFile.js";

const isLoading = ref()
const uploadedFiles = ref([])
const onSubmit = async (event) => {
  uploadedFiles.value = []
  const  files = event.target.files
  if (!files.length) return


  isLoading.value = true


  try {
    uploadedFiles.value = await handleUploadFiles(files)
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
  }

  isLoading.value = false
}



</script>

<template>
  <main>
    <h1>Загрузка файлов</h1>

    <p>Выберит файлы для загрузки</p>
    <Form :submit="onSubmit" method="POST">
    <form-item
      type="file"
      label="Загрузка файлов"
      id="fileInput"
      @change="onSubmit"
      multiple
    ></form-item>
    </Form>

    <section>
      <p v-if="isLoading">Загрузка...</p>
      <ul v-if="uploadedFiles.length">
        <li v-for="file in uploadedFiles">
          <h4>Имя: {{ file.name }}</h4>
          <p>
            Статус:
            <span :class="[{ error: !file.success, success: file.success }]">
              {{ file.success ? 'загружен' : 'ошибка' }}
            </span>
          </p>
          <Button v-if="file.success" @click="handleDownloadFile(file)">Скачать</Button>
        </li>
      </ul>
    </section>
  </main>
</template>


<style scoped>

.error {
  color: var(--error-text)
}


.list {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
}

.list > li {
  border: 2px solid var(--secondary-color);
  list-style-type: none;
  padding: 30px;
  border-radius: 8px;
  flex-basis:  30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>