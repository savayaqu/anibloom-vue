<script setup>
import {onMounted, ref} from "vue";
import {getFiles} from "@/api/methods/files/getFiles.js";
import {deleteFile} from "@/api/methods/files/deleteFile.js";

import router from "@/router/index.js";

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

const handleDeleteFile = async (fileId) => {
  const data = await deleteFile(fileId)

  if (!data.success) return

  await handleGetFiles()
}

const handleEditFileRights = async (fileId, fileName) =>
    router.push({name: 'rights', params: {id: fileId}})

const handleEditFileName = async (fileId, fileName) =>
    router.push({name: 'edit', params: {id: fileId}})


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

            <div>
              <Button @click="handleDownloadFile(file)">Скачать</Button>
              <Button @click="handleEditFileRights(file.file_id, file.name)">Редактировать права</Button>
              <Button @click="handleEditFileName(file.file_id, file.name)">Переименовать</Button>
              <Button @click="handleDeleteFile(file.file_id)">Удалить</Button>
            </div>
          </li>
        </ul>
      </section>
    </template>
    <h2 v-else>У вас нет файлов</h2>
  </main>
</template>
<style scoped>
.list {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.list > li {
  border: 2px solid var(--secondary-color);
  list-style-type: none;
  padding: 30px;
  border-radius: 8px;
  flex-basis:  30%;
}
.list > li div {
  gap: 3px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
main {
  margin-bottom: 100px;
}
</style>