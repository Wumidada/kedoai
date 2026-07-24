<template>
  <a-layout class="board-layout">
    <!-- 主要内容区域 -->
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
// 简化版board布局，只保留内容区域
</script>

<style scoped lang="scss">
.board-layout {
  height: 100vh;
  overflow-y: auto;
  background: #f5f7fa;
}

.content {
  margin: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  min-height: calc(100vh - 48px);
}

</style>
