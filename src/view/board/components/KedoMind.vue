<template>
  <div class="kedo-mind-container">
    <!-- 主要产品展示区域 -->
    <div class="product-showcase">
      <div class="product-content">
        <div class="product-info">
          <div class="back-button">
            <a-button 
              type="text" 
              @click="goBackHome" 
              style="display: inline-flex; align-items: center; gap: 4px; color: #1E9CFF; font-size: 14px; transition: all 0.3s ease; cursor: pointer;"
            >
              <LeftOutlined />
              返回首页
            </a-button>
          </div>
          <h1 class="product-title">{{ $t('products.kedoMind.title') }}</h1>
          <p class="product-subtitle">{{ $t('products.kedoMind.subtitle') }}</p>
          <p class="product-description">
            {{ $t('products.kedoMind.description') }}
          </p>
          
          <div class="action-buttons">
            <a-button 
              type="primary" 
              size="large" 
              @click="handleAction" 
              class="action-btn"
            >
              <ExperimentOutlined v-if="isMember" />
              <CrownOutlined v-else />
              {{ buttonText }}
            </a-button>
            <a-button 
              size="large" 
              @click="handleDemoClick" 
              class="demo-btn"
            >
              查看演示
            </a-button>
          </div>
        </div>
        
        <div class="product-visual">
          <div class="icon-container">
            <!-- KedoMind AI思维SVG图标 -->
            <img src="@/assets/images/kedo_mind.svg" alt="KedoMind" class="product-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- 功能特性区域 -->
    <div class="features-section">
      <h2 class="section-title">{{ $t('products.common.coreCapabilities') }}</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <BulbOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.autonomousThinking') }}</h3>
          <p class="feature-desc">
            {{ $t('products.features.autonomousThinkingDesc') }}
          </p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <SettingOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.intelligentTaskExecution') }}</h3>
          <p class="feature-desc">
            {{ $t('products.features.intelligentTaskExecutionDesc') }}
          </p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <NodeIndexOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.toolchainEcosystem') }}</h3>
          <p class="feature-desc">
            {{ $t('products.features.toolchainEcosystemDesc') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  BulbOutlined,
  SettingOutlined,
  NodeIndexOutlined,
  CrownOutlined,
  ExperimentOutlined,
  LeftOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

// 获取用户会员状态和token余额
const isMember = computed(() => userStore.getUserIsMember)
const tokenBalance = computed(() => userStore.getUserTokenBalance)

// 计算按钮文本
const buttonText = computed(() => {
  // 始终显示下载应用按钮
  return t('products.kedoMind.downloadApp')
  // if (isMember.value) {
  //   return t('products.kedoMind.startExperience')
  // } else if (tokenBalance.value > 0) {
  //   return t('products.kedoMind.startExperience')
  // } else {
  //   return t('products.kedoMind.downloadApp')
  // }
})

const handleAction = () => {
  window.open('/#/download', '_blank')
}

// 演示视频相关
const handleDemoClick = () => {
  // 跳转到 KedoMind 演示页面
  window.open('/#/board/kedoMindDemo', '_blank')
}

const goBackHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.kedo-mind-container {
  padding: 0;
  background: #fff;
  min-height: 100vh;
}

.product-showcase {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 60px 40px;
  
  .product-content {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: 60px;
  }

  .product-info {
    flex: 1;

    .back-button {
      margin-bottom: 20px;

      :deep(.ant-btn-text) {
        cursor: pointer !important;
      }

      :deep(.ant-btn-text:hover) {
        color: #0DA8EF !important;
        transform: translateX(-2px);
        cursor: pointer !important;
      }
    }

    .product-title {
      font-size: 48px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .product-subtitle {
      font-size: 20px;
      color: #4a5568;
      margin-bottom: 24px;
      font-weight: 500;
    }

    .product-description {
      font-size: 16px;
      line-height: 1.8;
      color: #2d3748;
      margin-bottom: 40px;
      max-width: 600px;
    }

    .action-buttons {
      display: flex;
      align-items: flex-start;
      gap: 20px;

      .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 24px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
        border: none;
        box-shadow: 0 4px 14px rgba(30, 156, 255, 0.4);
        transition: all 0.3s ease;
        min-width: 160px;
        text-align: center;
        cursor: pointer !important;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 156, 255, 0.5);
          background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
          cursor: pointer !important;
        }
      }

      .demo-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 24px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        background: white;
        border: 1px solid #1E9CFF;
        color: #1E9CFF;
        box-shadow: 0 2px 8px rgba(30, 156, 255, 0.15);
        transition: all 0.3s ease;
        min-width: 160px;
        text-align: center;
        cursor: pointer !important;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(30, 156, 255, 0.25);
          background: rgba(30, 156, 255, 0.05);
          cursor: pointer !important;
        }
      }
    }
  }

  .product-visual {
    flex: 0 0 350px;

    .icon-container {
      position: relative;
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

      .product-icon {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }
}

.features-section {
  padding: 80px 40px;
  background: white;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 60px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: #f8fafc;
    padding: 40px 30px;
    border-radius: 16px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      background: white;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #1E9CFF, #70D3FF);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      color: white;
      font-size: 24px;
    }

    .feature-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 16px;
    }

    .feature-desc {
      font-size: 14px;
      line-height: 1.8;
      color: #4a5568;
      text-align: left;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .product-showcase {
    padding: 40px 20px;
    
    .product-content {
      flex-direction: column;
      gap: 40px;
    }

    .product-info {
      .action-buttons {
        flex-direction: column;
        gap: 16px;

        .action-btn,
        .demo-btn {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }
      }
    }

    .product-visual {
      flex: none;
      width: 280px;
    }
  }

  .features-section {
    padding: 60px 20px;

    .features-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style> 