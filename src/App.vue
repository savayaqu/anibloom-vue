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
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 10px;
}
</style>
