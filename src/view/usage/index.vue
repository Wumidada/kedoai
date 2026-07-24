<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CarOutlined, CustomerServiceOutlined, GiftOutlined, LeftOutlined, PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取产品类型
const productType = ref(route.query.type || 'all')

// 视频链接（示例）
const videoLinks = {
  'all': 'https://example.com/videos/kedoclaw-overview.mp4',
  'smartBox': 'https://example.com/videos/kedoclaw-machine.mp4',
  'KedoBotUSB': 'https://example.com/videos/kedoclaw-usb.mp4'
}

// 当前产品的视频链接
const currentVideoLink = ref(videoLinks[productType.value] || videoLinks['all'])

// 回退函数
const goBack = () => {
  // 如果是在新窗口中打开的，关闭窗口
  if (window.opener) {
    window.close()
  } else {
    // 否则返回上一页
    router.back()
  }
}

// 切换产品类型
const switchProductType = (type) => {
  productType.value = type
  currentVideoLink.value = videoLinks[type] || videoLinks['all']
}

onMounted(() => {
  // 页面加载时的初始化逻辑
})
</script>

<template>
  <div class="usage-container">
    <div class="usage-header">
      <button class="back-button" @click="goBack" style="cursor: pointer;">
        <LeftOutlined /> 返回
      </button>
      <h1 class="decorated-title">使用说明</h1>
      <p>了解如何使用 KedoBot 产品</p>
    </div>
    
    <div class="usage-content">
      <!-- 产品类型切换 -->
      <div class="product-tabs">
        <button 
          v-for="type in ['all', 'smartBox', 'kedoBotUSB']" 
          :key="type"
          :class="['tab-button', { active: productType === type }]"
          @click="switchProductType(type)"
        >
          {{ type === 'all' ? '全部产品' : type === 'smartBox' ? 'KedoBot 一体机' : 'KedoBot U盘版' }}
        </button>
      </div>
      
      <!-- 视频教程 -->
      <div class="video-section">
        <h2 class="section-title">
          <PlayCircleOutlined /> 视频教程
        </h2>
        <div class="video-container">
          <div class="video-placeholder">
            <PlayCircleOutlined style="font-size: 48px; color: #1E9CFF;" />
            <p>点击播放视频教程</p>
            <p class="video-link">{{ currentVideoLink }}</p>
          </div>
        </div>
      </div>
      
      <!-- 使用说明文档 -->
      <div class="docs-section">
        <h2 class="section-title">
          <FileTextOutlined /> 使用文档
        </h2>
        
        <!-- 通用使用说明 -->
        <div v-if="productType === 'all' || productType === 'smartBox'" class="doc-card">
          <h3>KedoBot 一体机使用说明</h3>
          <div class="doc-content">
            <h4>1. 开箱与安装</h4>
            <p>• 打开包装，检查所有配件是否齐全</p>
            <p>• 将一体机放置在平稳的桌面上</p>
            <p>• 连接电源适配器</p>
            <p>• 按下电源按钮启动设备</p>
            
            <h4>2. 首次设置</h4>
            <p>• 按照屏幕提示完成初始化设置</p>
            <p>• 连接到网络</p>
            <p>• 登录您的 Kedo 账户</p>
            <p>• 激活设备</p>
            
            <h4>3. 基本操作</h4>
            <p>• 触摸屏幕进行操作</p>
            <p>• 使用内置摄像头进行人脸识别</p>
            <p>• 通过语音指令控制设备</p>
            <p>• 访问内置应用程序</p>
            
            <h4>4. 维护与保养</h4>
            <p>• 定期清洁屏幕和机身</p>
            <p>• 保持设备通风良好</p>
            <p>• 定期更新系统软件</p>
            <p>• 避免阳光直射和高温环境</p>
          </div>
        </div>
        
        <!-- U盘版使用说明 -->
        <div v-if="productType === 'all' || productType === 'kedoBotUSB'" class="doc-card">
          <h3>KedoBot U盘版使用说明</h3>
          <div class="doc-content">
            <h4>1. 开箱与检查</h4>
            <p>• 打开包装，检查U盘是否完好</p>
            <p>• 查看配件清单，确保所有物品齐全</p>
            <p>• 检查U盘接口是否干净无损坏</p>
            
            <h4>2. 首次使用</h4>
            <p>• 将U盘插入电脑的USB接口</p>
            <p>• 等待电脑识别U盘</p>
            <p>• 打开U盘，运行安装程序</p>
            <p>• 按照向导完成安装</p>
            
            <h4>3. 基本操作</h4>
            <p>• 启动KedoClaw应用程序</p>
            <p>• 登录您的Kedo账户</p>
            <p>• 开始使用智能功能</p>
            <p>• 定期备份数据到U盘</p>
            
            <h4>4. 维护与保养</h4>
            <p>• 使用前确保U盘接口干净</p>
            <p>• 避免频繁插拔U盘</p>
            <p>• 定期查杀病毒</p>
            <p>• 存储在干燥阴凉的环境中</p>
          </div>
        </div>
      </div>
      
      <!-- 常见问题 -->
      <div class="faq-section">
        <h2 class="section-title">常见问题</h2>
        <div class="faq-list">
          <div class="faq-item">
            <h4>Q: 如何更新KedoClawBot的系统？</h4>
            <p>A: 一体机版本可以通过系统设置中的更新选项进行更新，U盘版本则需要从官方网站下载最新版本并重新安装。</p>
          </div>
          <div class="faq-item">
            <h4>Q: 忘记密码怎么办？</h4>
            <p>A: 可以通过注册时使用的邮箱或手机号进行密码重置，或者联系客服寻求帮助。</p>
          </div>
          <div class="faq-item">
            <h4>Q: 设备出现故障如何处理？</h4>
            <p>A: 首先查看使用手册中的故障排除部分，如果问题仍然存在，请联系客服获取技术支持。</p>
          </div>
          <div class="faq-item">
            <h4>Q: U盘版和一体机版有什么区别？</h4>
            <p>A: U盘版是一个可移植的解决方案，可以在任何电脑上使用；一体机版是一个完整的硬件设备，具有更强大的性能和更多的功能。</p>
          </div>
        </div>
      </div>
      
      <!-- 联系支持 -->
      <div class="support-section">
        <h2 class="section-title">
          <CustomerServiceOutlined /> 联系支持
        </h2>
        <div class="support-content">
          <p>如果您在使用过程中遇到任何问题，请随时联系我们的客服团队：</p>
          <ul>
            <li>客服热线：400-123-4567</li>
            <li>邮箱：support@kedo.com</li>
            <li>工作时间：周一至周五 9:00-18:00</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.usage-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem 0;
  overflow-y: auto;
  height: auto;
  
  .usage-header {
    position: relative;
    text-align: center;
    padding: 2rem;
    background: white;
    margin-bottom: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    transition: all 0.3s ease;
    
    .back-button {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        background: #1E9CFF;
        border: 1px solid #1E9CFF;
        border-radius: 6px;
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 8px;
        
        &:hover {
          background: #0DA8EF;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #1A202C;
    }
    
    .decorated-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #1E9CFF, #70D3FF);
        border-radius: 2px;
      }
    }
    
    p {
      color: #4A5568;
    }
  }
  
  .usage-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    
    // 产品类型切换
    .product-tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      
      .tab-button {
        padding: 0.8rem 1.5rem;
        border: 1px solid #A0AEC0;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
        
        &:hover {
          border-color: #1E9CFF;
          color: #1E9CFF;
        }
        
        &.active {
          background: #1E9CFF;
          color: white;
          border-color: #1E9CFF;
          box-shadow: 0 4px 12px rgba(30, 156, 255, 0.2);
        }
      }
    }
    
    // 视频教程部分
    .video-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      margin-bottom: 2rem;
      transition: all 0.3s ease;
      
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1A202C;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .video-container {
        width: 100%;
        height: 400px;
        background: #F1F5F9;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .video-placeholder {
          text-align: center;
          color: #4A5568;
          
          p {
            margin-top: 1rem;
            font-size: 1.1rem;
          }
          
          .video-link {
            font-size: 0.9rem;
            color: #1E9CFF;
            margin-top: 0.5rem;
          }
        }
      }
    }
    
    // 文档部分
    .docs-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      margin-bottom: 2rem;
      transition: all 0.3s ease;
      
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1A202C;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .doc-card {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #EDF2F7;
        
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1A202C;
          margin-bottom: 1rem;
        }
        
        .doc-content {
          h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2D3748;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          p {
            margin-bottom: 0.5rem;
            color: #4A5568;
            line-height: 1.5;
          }
        }
      }
    }
    
    // 常见问题部分
    .faq-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      margin-bottom: 2rem;
      transition: all 0.3s ease;
      
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1A202C;
        margin-bottom: 1.5rem;
      }
      
      .faq-list {
        .faq-item {
          margin-bottom: 1.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 0.5rem;
          }
          
          p {
            color: #4A5568;
            line-height: 1.5;
          }
        }
      }
    }
    
    // 联系支持部分
    .support-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1A202C;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .support-content {
        p {
          margin-bottom: 1rem;
          color: #4A5568;
        }
        
        ul {
          list-style: none;
          padding: 0;
          
          li {
            margin-bottom: 0.5rem;
            color: #4A5568;
            display: flex;
            align-items: center;
            gap: 8px;
            
            &:before {
              content: '•';
              color: #1E9CFF;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .usage-container {
    .usage-content {
      padding: 0 1rem;
      
      .product-tabs {
        flex-direction: column;
        
        .tab-button {
          width: 100%;
          text-align: center;
        }
      }
      
      .video-section {
        .video-container {
          height: 250px;
        }
      }
    }
  }
}
</style>