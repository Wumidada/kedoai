<template>
  <div class="smart-box-container">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-title">KedoBot 产品系列</div>
        <div class="sidebar-menu">
          <a-menu
            mode="inline"
            :selected-keys="[activeProduct]"
            @select="handleProductSelect"
            style="width: 100%"
          >
            <a-menu-item key="smartBox">
              <DesktopOutlined />
              <span>KedoBot 一体机</span>
            </a-menu-item>
            <a-menu-item key="kedoBotUSB">
              <UsbOutlined />
              <span>KedoBot U盘版</span>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
    </div>

    <!-- 主要产品展示区域 -->
    <div class="main-content">
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
            <h1 class="product-title">KedoBot 一体机</h1>
            <p class="product-subtitle">Kedo 产品订购中心</p>
            <p class="product-description">
              欢迎来到 Kedo 产品订购中心，在这里您可以查看和订购我们的智能产品，目前主要提供 KedoBot 一体机。我们提供多种配置选项，满足不同企业的需求。
            </p>
            
            <div class="action-buttons" style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a-button
                type="primary" 
                size="large" 
                @click="handleAction" 
                class="action-btn"
                style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 24px; border-radius: 12px; font-size: 16px; font-weight: 600; background: linear-gradient(135deg, #1E9CFF, #0DA8EF); border: none; box-shadow: 0 4px 14px rgba(30, 156, 255, 0.4); transition: all 0.3s ease; min-width: 160px; text-align: center;"
              >
                <ShoppingOutlined />
                立即订购
              </a-button>
              <a-button
                type="default" 
                size="large" 
                @click="handleUsage" 
                class="action-btn"
                style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 24px; border-radius: 12px; font-size: 16px; font-weight: 600; background: white; border: 2px solid #1E9CFF; color: #1E9CFF; box-shadow: 0 4px 14px rgba(30, 156, 255, 0.2); transition: all 0.3s ease; min-width: 160px; text-align: center;"
              >
                <FileTextOutlined />
                使用说明
              </a-button>
            </div>
          </div>
          
          <div class="product-visual">
            <div class="icon-container">
              <!-- 产品订购中心图标 -->
              <img src="@/assets/images/product_order.svg" alt="产品订购" class="product-icon" />
            </div>
          </div>
        </div>
      </div>

      <!-- 功能特性区域 -->
      <div class="features-section">
        <h2 class="section-title">订购服务</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <ShoppingOutlined />
            </div>
            <h3 class="feature-title">产品选择</h3>
            <p class="feature-desc">
              浏览我们的 KedoBot 一体机产品，根据您的需求选择合适的配置
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <SettingOutlined />
            </div>
            <h3 class="feature-title">配置定制</h3>
            <p class="feature-desc">
              根据您的具体需求，定制产品配置，确保产品性能满足您的业务需求
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <CreditCardOutlined />
            </div>
            <h3 class="feature-title">安全支付</h3>
            <p class="feature-desc">
              提供多种安全支付方式，保障您的交易安全，让您的购买过程更加放心
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <CarOutlined />
            </div>
            <h3 class="feature-title">快速配送</h3>
            <p class="feature-desc">
              与多家物流合作伙伴合作，确保产品快速送达，缩短您的等待时间
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <CustomerServiceOutlined />
            </div>
            <h3 class="feature-title">专业支持</h3>
            <p class="feature-desc">
              提供专业的技术支持和售后服务，解决您在使用过程中遇到的问题
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <GiftOutlined />
            </div>
            <h3 class="feature-title">优惠活动</h3>
            <p class="feature-desc">
              定期推出优惠活动和促销方案，让您享受更多实惠，降低采购成本
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  AppstoreOutlined,
  WifiOutlined,
  SettingOutlined,
  CloudOutlined,
  LineChartOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  CarOutlined,
  LeftOutlined,
  DesktopOutlined,
  UsbOutlined,
  FileTextOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()

const activeProduct = ref('smartBox')

const handleAction = () => {
  window.open('/#/order/1', '_blank')
}

const handleUsage = () => {
  window.open('/#/usage?type=smartBox', '_blank')
}

const goBackHome = () => {
  router.push('/')
}

const handleProductSelect = (info: { key: string; keyPath: string[] }) => {
  const key = info.key
  if (key === 'smartBox') {
    router.push('/board/smartBox')
  } else if (key === 'kedoBotUSB') {
    router.push('/board/KedoBotUSB')
  }
}

onMounted(() => {
  // 初始化激活的产品
  if (route.path.includes('smartBox')) {
    activeProduct.value = 'smartBox'
  } else if (route.path.includes('KedoBotUSB')) {
    activeProduct.value = 'kedoBotUSB'
  }
})
</script>

<style scoped lang="scss">
.smart-box-container {
  display: flex;
  padding: 0;
  background: #fff;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  padding: 20px 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;

  .sidebar-content {
    padding: 0 20px;

    .sidebar-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 30px;
      padding: 0 16px;
    }

    .sidebar-menu {
      :deep(.ant-menu) {
        background: transparent !important;
        border: none !important;

        .ant-menu-item {
          margin: 8px 0 !important;
          border-radius: 8px !important;
          height: 48px !important;
          line-height: 48px !important;

          &.ant-menu-item-selected {
            background: linear-gradient(135deg, #1E9CFF, #0DA8EF) !important;
            color: white !important;

            .anticon {
              color: white !important;
            }
          }

          &:hover {
            background: #e6f7ff !important;
          }

          .anticon {
            margin-right: 12px !important;
            font-size: 16px !important;
          }
        }
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-left: 240px;
  width: calc(100% - 240px);
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
          height: 48px;
          padding: 0 32px;
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
          border: none;
          box-shadow: 0 4px 15px rgba(30, 156, 255, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(30, 156, 255, 0.4);
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
  .smart-box-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 10px 0;
  }

  .main-content {
    flex: 1;
    margin-left: 0;
    width: 100%;
  }

  .product-showcase {
    padding: 40px 20px;
    
    .product-content {
      flex-direction: column;
      gap: 40px;
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