<template>
  <div class="kedo-mind-demo-container">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1 class="demo-title">KedoMind 使用演示</h1>
      <p class="demo-subtitle">AI 自主思考与任务执行平台的使用流程</p>
    </div>

    <!-- 演示步骤 -->
    <div class="demo-steps">
      <div 
        v-for="(step, index) in demoSteps" 
        :key="index"
        class="demo-step"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <h3 class="step-title">{{ step.title }}</h3>
          <div class="step-image">
            <img :src="step.image" :alt="step.title" />
          </div>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 演示步骤数据
const demoSteps = [
  {
    title: '步骤 1: 启动 KedoMind',
    image: '/src/assets/images/M1.jpg',
    description: '打开 KedoMind 应用，进入主界面。您将看到简洁的操作面板，包含任务输入区和功能导航栏。'
  },
  {
    title: '步骤 2: 输入任务指令',
    image: '/src/assets/images/M2.jpg',
    description: '在任务输入框中输入您的需求或问题。KedoMind 支持自然语言指令，您可以描述您想要完成的任务。'
  },
  {
    title: '步骤 3: AI 分析与规划',
    image: '/src/assets/images/M3.jpg',
    description: 'KedoMind 会分析您的任务，进行深度思考，并制定详细的执行计划。您可以看到 AI 的思考过程和规划步骤。'
  },
  {
    title: '步骤 4: 工具选择与配置',
    image: '/src/assets/images/M4.jpg',
    description: '根据任务需求，KedoMind 会自动选择合适的工具，并进行必要的配置。您也可以手动调整工具设置。'
  },
  {
    title: '步骤 5: 任务执行',
    image: '/src/assets/images/M5.jpg',
    description: 'KedoMind 开始执行任务，您可以实时查看执行进度和中间结果。系统会自动处理各种复杂操作。'
  },
  {
    title: '步骤 6: 结果分析',
    image: '/src/assets/images/M6.jpg',
    description: '任务执行完成后，KedoMind 会对结果进行分析和总结，提供详细的执行报告和建议。'
  },
  {
    title: '步骤 7: 任务优化',
    image: '/src/assets/images/M7.jpg',
    description: '基于执行结果，KedoMind 会提供优化建议，帮助您改进任务流程和提高效率。'
  },
  {
    title: '步骤 8: 任务保存与分享',
    image: '/src/assets/images/M8.jpg',
    description: '您可以保存任务流程，以便将来重复使用，也可以将结果分享给团队成员或导出为其他格式。'
  }
]
</script>

<style scoped lang="scss">
.kedo-mind-demo-container {
  padding: 60px 40px;
  background: #f8fafc;
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 60px;

  .demo-title {
    font-size: 36px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  .demo-subtitle {
    font-size: 18px;
    color: #4a5568;
    line-height: 1.6;
  }
}

.demo-steps {
  max-width: 1000px;
  margin: 0 auto 60px;
}

.demo-step {
  display: flex;
  gap: 32px;
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 156, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(30, 156, 255, 0.15);
    border-color: rgba(30, 156, 255, 0.3);
  }

  &.active {
    border-color: #1E9CFF;
    box-shadow: 0 8px 24px rgba(30, 156, 255, 0.2);
  }

  .step-number {
    flex: 0 0 60px;
    height: 60px;
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin-top: 8px;
  }

  .step-content {
    flex: 1;

    .step-title {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
    }

    .step-image {
      margin-bottom: 24px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.02);
        }
      }
    }

    .step-description {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.7;
    }
  }
}



// 响应式设计
@media (max-width: 768px) {
  .kedo-mind-demo-container {
    padding: 40px 20px;
  }

  .demo-header {
    .demo-title {
      font-size: 28px;
    }
  }

  .demo-step {
    flex-direction: column;
    padding: 32px 24px;

    .step-number {
      align-self: center;
    }

    .step-content {
      .step-title {
        font-size: 20px;
        text-align: center;
      }
    }
  }


}
</style>