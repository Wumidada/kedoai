<template>
  <div class="pay-container">
    <!-- 头部导航 -->
    <div class="pay-header">
      <div class="header-content">
        <div class="header-left">
          <a-button 
            class="back-btn"
            @click="handleBack"
          >
            &larr; 返回
          </a-button>
          <div class="logo-section" @click="goHome">
            <img
              :src="logoImage"
              alt="Kedo"
              class="logo"
            />
          </div>
        </div>
        
        <div class="header-right">
          <a-button 
            type="primary" 
            class="board-btn"
            @click="goToBoard"
          >
            {{ $t('nav.enterWorkspace') }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="pay-main">
      <div class="pay-wrapper">
        <!-- 支付标题 -->
        <div class="pay-title-section">
          <h1 class="pay-title">{{ $t('pay.paymentCenter') }}</h1>
        </div>

        <!-- 步骤指示器 -->
        <div class="steps-section">
          <a-steps :current="currentStep" class="pay-steps">
            <a-step :title="$t('pay.selectPlan')" />
            <a-step :title="$t('pay.confirmPayment')" />
            <a-step :title="$t('pay.paymentSuccess')" />
          </a-steps>
        </div>

        <!-- 支付内容区域 -->
        <div class="pay-content">
          <!-- 步骤1: 订单选择 -->
          <PayOrder
            v-if="currentStep === 0 && !isOrderPayment"
            :product-name="productName"
            :product-id="productId"
            @next="handleOrderNext"
          />

          <!-- 步骤2: 支付页面 -->
          <PayPayment
            v-if="currentStep === 1 || isOrderPayment"
            :order="orderDetails"
            @next="handlePaymentNext"
            @back="handleBack"
          />

          <!-- 步骤3: 支付结果 -->
          <PayResult
            v-if="currentStep === 2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import logoImage from '@/assets/logo/logo-kedo.png'
import PayOrder from './components/PayOrder.vue'
import PayPayment from './components/PayPayment.vue'
import PayResult from './components/PayResult.vue'

const route = useRoute()
const router = useRouter()

// 状态管理
const currentStep = ref(0)
const orderDetails = ref<any>({})

// 从路由参数获取产品信息（响应式）
const productName = computed(() => route.query.name as string || 'KedoChat')
const productId = computed(() => route.query.proId as string || '1')
const orderId = computed(() => route.params.orderId as string)
const amount = computed(() => route.query.amount as string)
const isOrderPayment = computed(() => !!orderId.value)

// 导航方法
const goHome = () => {
  router.push('/')
}

const goToBoard = () => {
  router.push('/board')
}

// 步骤处理方法
const handleOrderNext = (orderData: any) => {
  orderDetails.value = orderData
  currentStep.value = 1
}

const handlePaymentNext = () => {
  currentStep.value = 2
}

const handleBack = () => {
  // 如果是订单支付模式，直接返回到订单列表页面
  if (isOrderPayment.value) {
    router.push('/board/orders')
  } else if (currentStep.value > 0) {
    currentStep.value--
  } else {
    // 如果在步骤0，使用浏览器的返回功能
    try {
      router.back()
    } catch (error) {
      console.error('router.back()失败:', error)
      window.history.back()
    }
  }
}

// 初始化
onMounted(() => {
  // 如果是订单支付，直接设置订单详情并跳转到支付步骤
  if (isOrderPayment.value && amount.value) {
    orderDetails.value = {
      list: [{
        name: productName.value,
        time: '1',
        date: new Date().toLocaleDateString()
      }],
      totalMoney: parseFloat(amount.value),
      proId: '1',
      productName: productName.value
    }
    currentStep.value = 1
  }
})
</script>

<style lang="scss" scoped>
.pay-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.pay-header {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 32px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .back-btn {
      height: 40px;
      padding: 0 16px;
      border: 1px solid #1E9CFF;
      border-radius: 6px;
      font-size: 14px;
      color: #1E9CFF;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #1E9CFF;
        color: white;
      }
    }

    .logo-section {
      cursor: pointer;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }

      .logo {
        height: 48px;
      }
    }

    .board-btn {
      border: none;
      border-radius: 8px;
      height: 40px;
      padding: 0 20px;
      font-weight: 500;
    }
  }

.pay-main {
  flex: 1;
  // padding: 40px 20px;
  overflow-y: auto;
  min-height: 0; /* 允许 flex 子项收缩 */
}

.pay-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.pay-title-section {
  text-align: center;
  // margin-bottom: 40px;

  .pay-title {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.steps-section {
  margin-bottom: 40px;

  .pay-steps {
    :deep(.ant-steps-item-finish .ant-steps-item-icon) {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    :deep(.ant-steps-item-process .ant-steps-item-icon) {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    :deep(.ant-steps-item-finish .ant-steps-item-title) {
      color: var(--primary-color);
    }
  }
}

.pay-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
</style>
