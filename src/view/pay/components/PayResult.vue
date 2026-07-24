<template>
  <div class="pay-result">
    <div class="result-container">
      <!-- 成功图标 -->
      <div class="result-icon">
        <CheckCircleFilled />
      </div>
      
      <!-- 结果信息 -->
      <div class="result-info">
        <h1 class="result-title">{{ $t('pay.paymentSuccessful') }}</h1>
        <p class="result-desc">{{ $t('pay.congratulations') }}</p>
      </div>
      
      <!-- 倒计时信息 -->
      <div class="countdown-info">
        <p class="countdown-text">
          <ClockCircleOutlined />
          {{ countdown }}{{ $t('pay.autoRedirect') }}
        </p>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a-button
        size="large"
          @click="goToHome"
          class="home-btn"
        >
          {{ $t('pay.goToConsole') }}
        </a-button>
      </div>
      
      <!-- 温馨提示 -->
      <div class="tips-section">
        <div class="tip-item">
          <InfoCircleOutlined />
          <span>{{ $t('pay.tokenRechargeSuccess') }}</span>
        </div>
        <div class="tip-item">
          <InfoCircleOutlined />
          <span>{{ $t('pay.viewBalanceInConsole') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getUserTokenBalance } from '@/api/pay'
import { awaitWrapper } from '@/api'
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()

// 倒计时
const countdown = ref(5)
let countdownTimer: number | null = null

// 开始倒计时
const startCountdown = () => {
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      goToBoard()
    }
  }, 1000)
}

// 前往控制台
const goToBoard = () => {
  router.push('/board')
}

// 返回首页
const goToHome = () => {
  router.push('/')
}

// 更新用户token余额
const updateTokenBalance = async () => {
  try {
    const userId = userStore.getUserId as string
    if (userId) {
      const [err, response] = await awaitWrapper(getUserTokenBalance({ userId }))
      if (err) {
        console.error('更新token余额失败:', err)
        return
      }
      
      if (response?.data && typeof response.data.balance === 'number') {
        userStore.setTokenBalance(response.data.balance)
      }
    }
  } catch (error) {
    console.error('更新token余额失败:', error)
  }
}

// 初始化
onMounted(() => {
  // updateTokenBalance() // 支付成功后更新余额
  startCountdown()
})

// 清理
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style lang="scss" scoped>
.pay-result {
  padding: 60px 32px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  .result-container {
    text-align: center;
    max-width: 500px;
    width: 100%;

    .result-icon {
      margin-bottom: 24px;

      .anticon {
        font-size: 80px;
        color: #52c41a;
      }
    }

    .result-info {
      margin-bottom: 32px;

      .result-title {
        font-size: 32px;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 12px;
      }

      .result-desc {
        font-size: 16px;
        color: var(--text-light);
        margin: 0;
        line-height: 1.6;
      }
    }

    .countdown-info {
      margin-bottom: 40px;
      padding: 16px 24px;
      background: #f0f8ff;
      border-radius: 8px;
      border: 1px solid #d4edda;

      .countdown-text {
        margin: 0;
        color: var(--primary-color);
        font-weight: 500;

        .anticon {
          margin-right: 8px;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 40px;

      .board-btn {
        height: 48px;
        padding: 0 32px;
        font-size: 16px;
        font-weight: 600;
        background: var(--gradient-primary);
        border: none;
        border-radius: 8px;

        &:hover {
          background: var(--gradient-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30, 156, 255, 0.3);
        }
      }

      .home-btn {
        height: 48px;
        padding: 0 32px;
        font-size: 16px;
        border-radius: 8px;
        border-color: #d9d9d9;

        &:hover {
          color: var(--primary-color);
          border-color: var(--primary-color);
        }
      }
    }

    .tips-section {
      .tip-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        font-size: 14px;
        color: var(--text-light);

        &:last-child {
          margin-bottom: 0;
        }

        .anticon {
          margin-right: 8px;
          color: var(--primary-color);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .pay-result {
    padding: 40px 20px;

    .result-container {
      .result-icon .anticon {
        font-size: 64px;
      }

      .result-info .result-title {
        font-size: 24px;
      }

      .action-buttons {
        flex-direction: column;

        .board-btn,
        .home-btn {
          width: 100%;
        }
      }
    }
  }
}
</style> 