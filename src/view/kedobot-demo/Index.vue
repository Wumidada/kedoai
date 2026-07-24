<template>
  <div class="kedoBot-demo-container">
    <SiteNav active-key="kedobot-demo" />

    <!-- 首屏 Hero 区（视频区） -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">KedoBot 小龙虾一体机 —— 自动化的智能核心</h1>
          <p class="hero-subtitle">封装全流程 OPC 能力，让设备接入、数据采集、边缘计算一步到位</p>
        </div>
        <div class="hero-video">
          <div class="video-container">
            <video 
              id="kedoBotVideo" 
              class="video-player"
              poster="@/assets/images/安装视频封面.png"
              controls
              controlsList="download"
              preload="metadata"
            >
              <source src="https://gitcode.com/Kedowen/kedomind/releases/download/kedoclaw/KedoClaw%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B.mp4" type="video/mp4">
              您的浏览器不支持视频播放
            </video>
            <div class="video-download">
              <a href="https://gitcode.com/Kedowen/kedomind/releases/download/kedoclaw/KedoClaw%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B.mp4" download="KedoClaw安装教程.mp4" class="download-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                下载视频
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 硬件接口区 -->
    <section class="interface-section">
      <h2 class="section-title">KedoBot一体机</h2>
      <div class="interface-content">
        <img 
          src="../../assets/images/kedoclaw一体机白.jpg" 
          alt="KedoBot一体机" 
          class="interface-image"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>

    <!-- 配置价格区 -->
    <section class="config-section">
      <h2 class="section-title">灵活配置，满足不同场景需求</h2>
      <p class="config-description">所有配置均预安装 KedoBot，出厂即封装，到手即用</p>
      <div class="config-grid">
        <div v-for="(product, index) in productList" :key="product.id" class="config-card" @click="handleProductClick(product)" style="cursor: pointer;">
          <div class="config-content">
            <div class="config-name">{{ product.name }}</div>
            <div class="config-description">{{ product.description }}</div>
            <div class="config-price">{{ product.basePrice }} 元起</div>
            <div class="config-action">点击选择配置</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部交互区 -->
    <section class="action-section" style="padding: 60px 40px; background: white; display: flex; justify-content: center;">
      <a href="#/board/smartBox" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 32px; border-radius: 12px; font-size: 16px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; min-width: 200px; text-align: center; background: linear-gradient(135deg, #1E9CFF, #0DA8EF); color: white; box-shadow: 0 4px 14px rgba(30, 156, 255, 0.4);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"/>
          <circle cx="12" cy="17" r="1"/>
        </svg>
        立即订购
      </a>
    </section>

    <!-- 底部 Footer 区 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <p>Copyright © 2025 Kedo. 保留所有权利</p>
        </div>
        <div class="footer-center">
          <a href="#" class="footer-link" @click.prevent="handleFooterClick('关于我们')">关于我们</a>
          <a href="#" class="footer-link" @click.prevent="handleFooterClick('联系我们')">联系我们</a>
          <a href="#" class="footer-link" @click.prevent="handleFooterClick('隐私政策')">隐私政策</a>
          <a href="#" class="footer-link" @click.prevent="handleFooterClick('服务条款')">服务条款</a>
        </div>
        <div class="footer-right">
          <a href="#" class="social-icon" @click.prevent="handleFooterClick('微信')">微信</a>
          <a href="#" class="social-icon" @click.prevent="handleFooterClick('微博')">微博</a>
          <a href="#" class="social-icon" @click.prevent="handleFooterClick('LinkedIn')">LinkedIn</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue"
import SiteNav from '@/components/nav/SiteNav.vue'

const router = useRouter()
const productList = [
  {
    id: 'x31g',
    name: 'X31G-i5 4200U',
    description: '双网双串口主机',
    basePrice: '2557'
  },
  {
    id: 'x30g',
    name: 'X30G-N5105',
    description: '【4 核 4 线程】双网双串口主机',
    basePrice: '3204'
  },
  {
    id: 'x58',
    name: 'X58-I5-8350U',
    description: '【4 核 8 线程】双网双串 8USB 主机',
    basePrice: '4153'
  },
  {
    id: 'x89',
    name: 'X89-I5-1135G7',
    description: '【4 核 8 线程】双网 6 串口主机',
    basePrice: '4155'
  },
  {
    id: 'x78',
    name: 'X78-I5-1335u',
    description: '【10 核 12 线程】双网四显主机',
    basePrice: '5439'
  },
  {
    id: 'x107g',
    name: 'X107G-I7-13650HX',
    description: '【14 核 20 线程】4 显双网 6 串口主机',
    basePrice: '8143'
  }
]

// 处理产品卡片点击
const handleProductClick = (product: any) => {
  // 跳转到订购页面，并传递产品ID
  router.push(`/order/1?product=${product.id}`)
}

// 处理配置卡片点击
const handleConfigClick = (config: any) => {
  router.push(`/order/1?config=${config.id}`)
}

// 处理视频点击
const handleVideoClick = () => {
  message.info('视频播放功能待开发');
}

// 处理底部链接点击
const handleFooterClick = (name: string) => {
  message.info(name + '功能待开发');
}
</script>

<style scoped lang="scss">
/* 全局样式 */
.kedoBot-demo-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #f0f7ff 0%, #f8fbff 100%);
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 72px;

  .hero-content {
    max-width: 1200px;
    width: 100%;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 600px;
    gap: 80px;
    align-items: center;
  }

  .hero-text {
    .hero-title {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
      line-height: 1.3;
    }

    .hero-subtitle {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 32px;
    }
  }

  .hero-video {
    .video-container {
      width: 600px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background: #000;
    }

    .video-player {
      width: 100%;
      height: 340px;
      display: block;
      border: none;
    }

    .video-download {
      background: #f9fafb;
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: center;

      .download-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: #1677ff;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover {
          background: #1e88e5;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3);
        }
      }
    }
  }
}

/* 硬件接口区 */
.interface-section {
  padding: 80px 40px;
  background: white;

  .section-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: 40px;
  }

  .interface-content {
    display: flex;
    justify-content: center;

    .interface-image {
      max-width: 800px;
      width: 100%;
      height: 450px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .image-placeholder {
      width: 100%;
      max-width: 800px;
      height: 450px;
      background: #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      .placeholder-content {
        text-align: center;

        .placeholder-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .placeholder-text {
          font-size: 18px;
          color: #6b7280;
          font-weight: 500;
        }
      }
    }
  }
}

/* 配置价格区 */
.config-section {
  padding: 80px 40px;
  background: #f9fafb;

  .section-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: 16px;
  }

  .config-description {
    font-size: 14px;
    color: #6b7280;
    text-align: center;
    margin-bottom: 40px;
  }

  .config-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 24px;
  }

  .config-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .config-content {
      .config-name {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 8px;
      }

      .config-description {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 12px;
        line-height: 1.4;
      }

      .config-price {
        font-size: 18px;
        font-weight: 600;
        color: #1677ff;
        margin-bottom: 12px;
      }

      .config-action {
        font-size: 12px;
        color: #1677ff;
        font-weight: 500;
        text-decoration: underline;
      }
    }
  }
}

/* 底部交互区 */
.action-section {
  padding: 60px 40px;
  background: white;
  display: flex;
  justify-content: center;
}

/* 按钮样式 */
.btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 16px 32px !important;
  border-radius: 12px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
  min-width: 200px !important;
  text-align: center !important;

  &.primary {
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF) !important;
    color: white !important;
    box-shadow: 0 4px 14px rgba(30, 156, 255, 0.4) !important;

    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(30, 156, 255, 0.5) !important;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF) !important;
    }
  }

  &.secondary {
    background: white !important;
    color: #1677ff !important;
    border: 1px solid #1677ff !important;

    &:hover {
      background: #f0f7ff !important;
    }
  }
}

/* 底部 Footer 区 */
.footer {
  background: #f3f4f6;
  padding: 32px 40px;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-left {
      p {
        font-size: 14px;
        color: #6b7280;
      }
    }

    .footer-center {
      display: flex;
      gap: 24px;

      .footer-link {
        font-size: 14px;
        color: #6b7280;
        text-decoration: none;
        transition: all 0.2s ease;

        &:hover {
          color: #1677ff;
        }
      }
    }

    .footer-right {
      display: flex;
      gap: 16px;

      .social-icon {
        font-size: 14px;
        color: #6b7280;
        text-decoration: none;
        transition: all 0.2s ease;

        &:hover {
          color: #1677ff;
        }
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-nav {
    .nav-content {
      padding: 0 20px;

      .nav-right {
        gap: 16px;

        .nav-item {
          display: none;
        }
      }
    }
  }

  .hero-section {
    height: auto;
    padding: 60px 20px;

    .hero-content {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;

      .hero-video {
        .video-placeholder {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
      }
    }
  }

  .interface-section {
    padding: 60px 20px;
  }

  .config-section {
    padding: 60px 20px;

    .config-grid {
      grid-template-columns: 1fr;
    }
  }

  .action-section {
    padding: 40px 20px;
  }

  .footer {
    padding: 32px 20px;

    .footer-content {
      flex-direction: column;
      gap: 24px;
      text-align: center;

      .footer-center {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>