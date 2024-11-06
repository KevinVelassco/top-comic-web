<template>
  <div class="gradient flex justify-center items-center h-screen">
    <RouterView />
  </div>
</template>

<style scoped>
.gradient {
  background-image: linear-gradient(120deg, #fffdfd 0%, #f9f9f9 100%);
}
</style>
