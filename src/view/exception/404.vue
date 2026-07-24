<template>
  <div class="error">
    <div class="text-center">
      <img src="@/assets/images/403.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，未找到该页面</h1>
    </div>
    <a-button type="primary" @click="goHome">回到官网</a-button>
  </div>
</template>

<script lang="ts" setup>
function goHome() {
  window.location.replace("https://www.kedoai.com/");
}
</script>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text-center {
  h1 {
    color: #666;
    padding: 20px 0;
  }
}

img {
  width: 350px;
  margin: 0 auto;
}
</style>
