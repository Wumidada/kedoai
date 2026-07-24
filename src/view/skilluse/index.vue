<template>
  <div class="skill-use-container">
    <!-- 顶部导航 -->
    <div class="skill-use-header">
      <div class="header-content">
        <div class="skill-info">
          <div class="skill-icon">
            <img :src="skillInfo.icon" :alt="skillInfo.name" />
          </div>
          <div class="skill-details">
            <h1 class="skill-name">{{ skillInfo.name }}</h1>
            <p class="skill-author">作者: {{ skillInfo.author || '未知' }}</p>
          </div>
        </div>
        <a-button type="default" @click="goBack" class="back-button">
          <LeftOutlined /> 返回
        </a-button>
      </div>
    </div>

    <!-- 技能详情 -->
    <div class="skill-details-section">
      <div class="section-content">
        <h2 class="section-title">技能描述</h2>
        <p class="skill-description">{{ skillInfo.description }}</p>
        
        <h2 class="section-title">核心功能</h2>
        <div class="feature-list">
          <div 
            v-for="(feature, index) in skillInfo.features || []" 
            :key="index"
            class="feature-item"
          >
            <span class="feature-icon">✓</span>
            <span class="feature-text">{{ feature }}</span>
          </div>
          <div v-if="!skillInfo.features || skillInfo.features.length === 0" class="no-features">
            暂无核心功能信息
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天界面 -->
    <div class="chat-section">
      <div class="chat-container">
        <div class="chat-header">
          <h2>与技能对话</h2>
          <p>根据技能的功能描述，AI会为您提供相应的服务</p>
        </div>
        <div class="chat-messages">
          <div class="message ai-message">
            <div class="message-content">
              <p>您好！我是基于"{{ skillInfo.name }}"技能的AI助手。</p>
              <p v-if="skillInfo.description">根据技能描述，我可以{{ skillInfo.description }}</p>
              <p>请告诉我您需要什么帮助？</p>
            </div>
          </div>
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']"
          >
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
        </div>
        <div class="chat-input-area">
          <a-input
            v-model:value="inputMessage"
            placeholder="请输入您的问题或需求..."
            @keyup.enter="sendMessage"
            class="chat-input"
          />
          <a-button type="primary" @click="sendMessage" class="send-button">
            发送
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LeftOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

// 技能信息
const skillInfo = ref({
  id: '',
  name: '',
  description: '',
  author: '',
  icon: '',
  features: []
})

// 聊天消息
const messages = ref([])
const inputMessage = ref('')

// 返回
const goBack = () => {
  router.back()
}

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: inputMessage.value
  })
  
  // 保存输入内容
  const userInput = inputMessage.value
  inputMessage.value = ''
  
  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      type: 'ai',
      content: `基于"${skillInfo.value.name}"技能，我可以为您提供以下帮助：\n\n${userInput}\n\n这是一个模拟回复，实际应用中会根据技能的具体功能和要求生成相应的回答。`
    })
  }, 1000)
}

// 初始化技能信息
onMounted(() => {
  // 从URL参数中获取技能信息
  const skillId = route.query.id as string
  const skillName = route.query.skill as string
  
  if (skillId) {
    // 这里可以根据技能ID从API获取详细信息
    // 暂时使用模拟数据
    skillInfo.value = {
      id: skillId,
      name: skillName || '未知技能',
      description: '这是一个技能的描述信息，会根据实际技能的功能来显示。',
      author: '技能作者',
      icon: `https://api.dicebear.com/7.x/shapes/svg?seed=${skillId}&backgroundColor=1E9CFF,6B73FF`,
      features: [
        '根据用户需求提供个性化解决方案',
        '结合技能的核心功能进行智能分析',
        '提供详细的操作建议和指导',
        '支持多种场景下的应用'
      ]
    }
  } else if (skillName) {
    // 如果只有技能名称，使用默认信息
    skillInfo.value = {
      id: `skill_${Date.now()}`,
      name: skillName,
      description: '这是一个技能的描述信息，会根据实际技能的功能来显示。',
      author: '技能作者',
      icon: `https://api.dicebear.com/7.x/shapes/svg?seed=${skillName}&backgroundColor=1E9CFF,6B73FF`,
      features: [
        '根据用户需求提供个性化解决方案',
        '结合技能的核心功能进行智能分析',
        '提供详细的操作建议和指导',
        '支持多种场景下的应用'
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.skill-use-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 0;
}

/* 顶部导航 */
.skill-use-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .skill-info {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .skill-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      overflow: hidden;
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      
      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }
    
    .skill-details {
      .skill-name {
        font-size: 20px;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 4px 0;
      }
      
      .skill-author {
        font-size: 14px;
        color: #718096;
        margin: 0;
      }
    }
  }
  
  .back-button {
    border-radius: 8px;
  }
}

/* 技能详情 */
.skill-details-section {
  padding: 40px;
  background: white;
  margin: 20px auto;
  max-width: 1200px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .section-content {
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 16px;
    }
    
    .skill-description {
      font-size: 16px;
      line-height: 1.6;
      color: #4a5568;
      margin-bottom: 32px;
    }
    
    .feature-list {
      .feature-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 12px;
        
        .feature-icon {
          color: #1E9CFF;
          font-weight: bold;
          margin-top: 2px;
        }
        
        .feature-text {
          font-size: 14px;
          line-height: 1.5;
          color: #4a5568;
        }
      }
      
      .no-features {
        font-size: 14px;
        color: #718096;
        font-style: italic;
      }
    }
  }
}

/* 聊天界面 */
.chat-section {
  padding: 0 40px 40px;
  
  .chat-container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    
    .chat-header {
      background: linear-gradient(135deg, #1E9CFF 0%, #6B73FF 100%);
      color: white;
      padding: 24px;
      text-align: center;
      
      h2 {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      
      p {
        font-size: 14px;
        margin: 0;
        opacity: 0.9;
      }
    }
    
    .chat-messages {
      padding: 24px;
      max-height: 500px;
      overflow-y: auto;
      
      .message {
        margin-bottom: 20px;
        
        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          line-height: 1.5;
        }
        
        &.ai-message {
          .message-content {
            background: #f1f5f9;
            color: #1a202c;
            border-top-left-radius: 4px;
          }
        }
        
        &.user-message {
          text-align: right;
          
          .message-content {
            background: linear-gradient(135deg, #1E9CFF 0%, #6B73FF 100%);
            color: white;
            border-top-right-radius: 4px;
            display: inline-block;
          }
        }
      }
    }
    
    .chat-input-area {
      padding: 24px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 12px;
      
      .chat-input {
        flex: 1;
        border-radius: 8px;
      }
      
      .send-button {
        border-radius: 8px;
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .skill-use-header {
    padding: 16px 20px;
    
    .header-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
  
  .skill-details-section {
    padding: 24px;
    margin: 16px;
  }
  
  .chat-section {
    padding: 0 16px 24px;
    
    .chat-container {
      .chat-messages {
        max-height: 400px;
        
        .message {
          .message-content {
            max-width: 90%;
          }
        }
      }
    }
  }
}
</style>