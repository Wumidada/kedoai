<template>
  <div class="ai-flow-container">
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
          <h1 class="product-title">{{ $t('products.kedoAiFlow.title') }}</h1>
          <p class="product-subtitle">{{ $t('products.kedoAiFlow.subtitle') }}</p>
          <p class="product-description">
            {{ $t('products.kedoAiFlow.description') }}
          </p>
          <div class="action-buttons">
            <a-button 
              type="primary" 
              size="large" 
              @click="handleAction" 
              class="action-btn"
            >
              <BranchesOutlined v-if="isMember" />
              <CrownOutlined v-else />
              {{ buttonText }}
            </a-button>
          </div>
        </div>
        
        <div class="product-visual">
          <div class="icon-container">
            <img src="@/assets/images/flow.svg" alt="KedoAiFlow" class="product-icon" />
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
            <DragOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.visualDrag') }}</h3>
          <p class="feature-desc">{{ $t('products.features.visualDragDesc') }}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <ApiOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.multiSourceIntegration') }}</h3>
          <p class="feature-desc">{{ $t('products.features.multiSourceIntegrationDesc') }}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <ThunderboltOutlined />
          </div>
          <h3 class="feature-title">{{ $t('products.features.automatedExecution') }}</h3>
          <p class="feature-desc">{{ $t('products.features.automatedExecutionDesc') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  BranchesOutlined,
  CrownOutlined,
  DragOutlined,
  ApiOutlined,
  ThunderboltOutlined,
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
  // 始终显示创建工作流按钮
  return t('products.kedoAiFlow.createWorkflow')
})

const handleAction = () => {
  // 始终跳转到工作流中心页面
  window.open('/#/flowCenter', '_blank')
}

const goBackHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.ai-flow-container {
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
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
      line-height: 1.6;
      color: #4a5568;
    }
  }
}



@media (max-width: 768px) {
  .product-showcase .product-content {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .product-info .product-title {
    font-size: 36px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .templates-container {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 