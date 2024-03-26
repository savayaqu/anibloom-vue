<script setup>
import {onMounted, ref} from "vue";
import {getFiles} from "@/api/methods/files/getFiles.js";

import Button from "@/components/Button.vue";
import {handleDownloadFile} from "@/utils/handleDownloadFile.js";

const isLoading = ref()
const uploadedFiles = ref([])

const handleGetFiles = async () => {
  isLoading.value = true

  try {
    uploadedFiles.value = await getFiles()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => await handleGetFiles())

</script>

<template>
  <main>
    <p v-if="isLoading">Загрузка...</p>

    <template v-else-if="uploadedFiles.length">
      <h1>Ваши файлы</h1>

      <section>
        <ul class="list">
          <li v-for="file in uploadedFiles">
            <h4>Имя: {{ file.name }}</h4>
            <Button @click="handleDownloadFile(file)">Скачать</Button>
          </li>
        </ul>
      </section>
    </template>
    <h2 v-else>У вас нет файлов</h2>
  </main>
</template>
