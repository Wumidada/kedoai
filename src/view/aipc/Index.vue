<template>
  <div class="aipc-page">
    <!-- 顶部标题栏 -->
    <div class="aipc-hero">
      <h1 class="aipc-title">AIPC — 智能边缘计算终端</h1>
      <p class="aipc-subtitle">KedoClaw 产品介绍</p>
      <p class="aipc-scroll-hint">向下滚动浏览</p>
    </div>

    <!-- PPT 幻灯片展示区 -->
    <div class="aipc-slides">
      <div
        v-for="i in slideCount"
        :key="i"
        class="aipc-slide"
      >
        <div class="aipc-slide-number">Slide {{ i }} / {{ slideCount }}</div>
        <img
          :src="`/kedoclaw-ppt/image${i}.png`"
          :alt="`Slide ${i}`"
          class="aipc-slide-img"
          loading="lazy"
        />
      </div>
    </div>

    <!-- 底部返回 -->
    <div class="aipc-footer">
      <p>— KedoClaw AIPC —</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const slideCount = 25
</script>

<style lang="scss" scoped>
.aipc-page {
  width: 100%;
  min-height: 100vh;
  background: #0a0e17;
  color: #ffffff;
}

.aipc-hero {
  text-align: center;
  padding: 80px 20px 60px;

  .aipc-title {
    font-size: 42px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
  }

  .aipc-subtitle {
    font-size: 20px;
    color: #8892b0;
    margin-bottom: 8px;
  }

  .aipc-scroll-hint {
    font-size: 14px;
    color: #495670;
    animation: bounce 2s infinite;
    margin-top: 20px;
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(6px); opacity: 1; }
}

.aipc-slides {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.aipc-slide {
  margin-bottom: 60px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  background: #111827;

  .aipc-slide-number {
    position: absolute;
    top: 12px;
    right: 16px;
    z-index: 2;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 12px;
    border-radius: 20px;
  }

  .aipc-slide-img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.aipc-footer {
  text-align: center;
  padding: 60px 20px;
  color: #495670;
  font-size: 14px;
}

@media (max-width: 768px) {
  .aipc-hero {
    padding: 50px 16px 40px;

    .aipc-title {
      font-size: 28px;
    }

    .aipc-subtitle {
      font-size: 16px;
    }
  }

  .aipc-slides {
    padding: 10px;
  }

  .aipc-slide {
    margin-bottom: 30px;
  }
}
</style>
