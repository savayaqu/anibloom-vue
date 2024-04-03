<script setup>
import {RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
    <Footer/>
  </div>
</template>

<style scoped>

.container {
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}
</style>
