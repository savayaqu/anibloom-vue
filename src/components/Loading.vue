<template>
  <div class="loading-spinner">
    <div class="snake"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      rotation: 0
    };
  },
  mounted() {
    // Обновляем угол поворота кружка каждые 50 миллисекунд
    this.rotateSpinner();
  },
  methods: {
    rotateSpinner() {
      setInterval(() => {
        this.rotation += 10;
      }, 50);
    }
  }
};
</script>

<style scoped>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(118, 135, 163, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.snake {
  width: 50px;
  height: 50px;
  border: 5px solid #333;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
