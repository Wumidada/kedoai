<template>
  <div class="pay-payment">
    <!-- 订单详情 -->
    <div class="order-section">
      <h2 class="section-title">{{ $t('pay.orderDetails') }}</h2>
      <a-table
        :columns="orderColumns"
        :dataSource="order.list"
        :pagination="false"
        :scroll="{ x: 500 }"
        class="order-table"
      />
      
      <div class="order-summary">
        <div class="summary-row">
          <span class="summary-label">{{ $t('pay.totalAmount') }}：</span>
          <span class="summary-price">¥{{ order.totalMoney }}</span>
        </div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="payment-section">
      <h2 class="section-title">{{ $t('pay.paymentMethod') }}</h2>
      
      <div class="payment-methods">
        <div class="payment-method active">
          <div class="method-header">
            <WechatOutlined class="method-icon" />
            <span class="method-name">{{ $t('pay.wechatPay') }}</span>
          </div>
          
          <div class="payment-content">
            <!-- 始终显示canvas元素 -->
            <div class="qr-container" v-show="qrCodeGenerated">
              <canvas ref="qrCodeRef" class="qr-code"></canvas>
            </div>
            
            <!-- 加载状态 -->
            <div v-if="loading" class="payment-loading">
              <a-spin size="large" />
              <p>{{ $t('pay.generatingQRCode') }}</p>
            </div>
            
            <!-- 二维码提示 -->
            <div v-else-if="qrCodeGenerated" class="qr-tips">
              <p class="tip-main">{{ $t('pay.scanToPay') }}</p>
              <p class="tip-sub">{{ $t('pay.paymentCompleteTip') }}</p>
            </div>
            
            <!-- 错误状态 -->
            <div v-else class="payment-error">
              <ExclamationCircleOutlined />
              <p>{{ errorMessage || $t('pay.qrCodeGenerationFailed') }}</p>
              <a-button @click="generateQRCode">{{ $t('pay.regenerate') }}</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <a-button @click="handleBack" class="back-btn">
        <LeftOutlined />
        {{ $t('pay.backToPrevious') }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/user'
import { getWeChatPayQRCode, checkOrderPaymentStatus } from '@/api/pay'
import { awaitWrapper } from '@/api'
import QRCode from 'qrcode'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
  WechatOutlined,
  ExclamationCircleOutlined,
  LeftOutlined
} from '@ant-design/icons-vue'

interface Props {
  order: {
    list: any[]
    totalMoney: number
    proId: string
    productName: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  next: []
  back: []
}>()

const userStore = useUserStore()
const { t } = useI18n()
const router = useRouter()

// 状态
const loading = ref(false)
const qrCodeRef = ref<HTMLCanvasElement | null>(null)
const qrCodeGenerated = ref(false)
const errorMessage = ref('')
let orderId = ''
let pollTimer: number | null = null
let pollCount = 0
const maxPollCount = 30 // 最多轮询30次，约60秒
const pollInterval = 2000 // 每2秒轮询一次

// 表格列配置
const orderColumns = [
  { title: t('pay.purchaseContent'), dataIndex: 'name', key: 'name' },
  { title: t('pay.purchaseQuantity'), dataIndex: 'time', key: 'time' },
  { title: t('pay.orderCreationTime'), dataIndex: 'date', key: 'date' }
]

// 生成支付二维码
const generateQRCode = async () => {
  loading.value = true
  qrCodeGenerated.value = false
  errorMessage.value = ''
  try {
    const userId = userStore.getUserId as string
    console.log('用户ID:', userId)
    console.log('用户ID类型:', typeof userId)
    
    if (!userId || userId === '') {
      errorMessage.value = '请先登录'
      message.error('请先登录')
      loading.value = false
      return
    }

    // 检查订单信息是否完整
    console.log('订单信息:', props.order)
    if (!props.order || !props.order.totalMoney) {
      errorMessage.value = '订单信息不完整'
      message.error('订单信息不完整，请稍后重试')
      loading.value = false
      return
    }

    console.log('开始调用支付API')
    console.log('订单总金额:', props.order.totalMoney)
    console.log('订单总金额类型:', typeof props.order.totalMoney)
    
    // 确保amount是一个整数
    const amount = Math.round(Number(props.order.totalMoney) * 100)
    console.log('支付金额（分）:', amount)
    console.log('支付金额类型:', typeof amount)
    
    // 确保prodId不为空
    const prodId = props.order.proId || '1'
    console.log('产品ID:', prodId)
    
    // 确保productName不为空
    const productName = props.order.productName || 'KedoBot 一体机'
    console.log('产品名称:', productName)
    
    const paymentData = {
      userId,
      body: productName,
      description: 'Kedo 产品订购',
      amount: amount,
      prodId: prodId,
      payProject: '01', // 尝试使用不同的支付项目代码
      ip: '127.0.0.1'
    }
    
    console.log('支付数据:', paymentData)
    
    // 验证所有必填字段
    const requiredFields = ['userId', 'body', 'amount', 'prodId', 'payProject', 'ip']
    const missingFields = requiredFields.filter(field => !paymentData[field as keyof typeof paymentData])
    if (missingFields.length > 0) {
      console.error('缺少必填字段:', missingFields)
      errorMessage.value = `缺少必填字段: ${missingFields.join(', ')}`
      message.error(`缺少必填字段: ${missingFields.join(', ')}`)
      loading.value = false
      return
    }
    
    // 验证金额是否有效
    if (amount <= 0) {
      console.error('无效的金额:', amount)
      errorMessage.value = '无效的支付金额'
      message.error('无效的支付金额')
      loading.value = false
      return
    }
    
    const [err, response] = await awaitWrapper(getWeChatPayQRCode(paymentData))

    if (err) {
      console.error('生成二维码失败:', err)
      errorMessage.value = `API调用失败: ${err.message || '未知错误'}`
      message.error('生成二维码失败，请检查网络连接')
      loading.value = false
      return
    }
    
    console.log('API调用成功，响应:', response)

    // 检查API返回的状态（statusCode/succeeded 在外层 response 上）
    if (!response || response.statusCode !== 200 || !response.succeeded) {
      console.error('API返回错误:', response)
      console.error('API返回状态码:', response?.statusCode)
      console.error('API返回成功标志:', response?.succeeded)
      console.error('API返回错误信息:', response?.errors)
      console.error('API返回完整数据:', response)

      // 针对不同的错误情况提供更具体的错误信息
      let errorText = response?.errors || '未知错误'
      if (errorText.includes('创建订单失败')) {
        errorText = '创建订单失败，请检查订单信息或联系客服'
      } else if (errorText.includes('未登录')) {
        errorText = '请先登录后再进行支付'
      } else if (errorText.includes('金额')) {
        errorText = '支付金额无效，请检查订单金额'
      }

      errorMessage.value = `API返回错误: ${errorText}`
      message.error(`获取二维码失败: ${errorText}`)
      loading.value = false
      return
    }

    // 业务数据在 response.data 里（内层 data）
    const respData = response.data

    if (respData && respData.qrCodeUrl) {
      orderId = respData.orderId
      loading.value = false
      
      // 尝试多次获取qrCodeRef，确保DOM元素已经渲染
      let attempts = 0
      const maxAttempts = 5
      
      while (!qrCodeRef.value && attempts < maxAttempts) {
        console.log(`尝试获取qrCodeRef，第${attempts + 1}次`)
        await nextTick()
        attempts++
      }
      
      if (!qrCodeRef.value) {
        console.error('无法获取qrCodeRef元素')
        errorMessage.value = '二维码渲染失败：无法获取渲染元素'
        message.error('生成二维码失败')
        return
      }
      
      try {
        console.log('开始渲染二维码:', respData.qrCodeUrl)
        await QRCode.toCanvas(qrCodeRef.value, respData.qrCodeUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        console.log('二维码渲染成功')
        qrCodeGenerated.value = true
        message.success('支付二维码生成成功')
        // 开始轮询订单状态
        startPolling()
        return
      } catch (error) {
        console.error('二维码渲染失败:', error)
        errorMessage.value = `二维码渲染失败: ${error instanceof Error ? error.message : '未知错误'}`
        message.error('生成二维码失败')
        return
      }
    }
    
    console.error('API返回数据格式错误:', response)
    errorMessage.value = 'API返回数据格式错误，缺少二维码URL'
    loading.value = false
    message.error('获取二维码失败')
  } catch (error) {
    console.error('生成二维码失败:', error)
    errorMessage.value = `系统错误: ${error instanceof Error ? error.message : '未知错误'}`
    message.error('生成二维码失败，请稍后重试')
    loading.value = false
  }
}

// 查询订单支付状态
const queryPaymentStatus = async () => {
  if (!orderId) return { status: 'error', message: '订单ID不存在' }
  
  try {
    const [err, response] = await awaitWrapper(checkOrderPaymentStatus({ OrderId: orderId }))
    if (err) {
      console.error('查询订单状态失败:', err)
      return { status: 'error', message: '查询失败' }
    }
    const respData = response?.data?.data
    if (respData?.payStatus === true) {
      return { status: 'success', message: '支付成功' }
    } else if (respData?.payStatus === false) {
      return { status: 'failed', message: '支付失败' }
    } else {
      return { status: 'pending', message: '等待支付' }
    }
  } catch (error) {
    console.error('查询订单状态失败:', error)
    return { status: 'error', message: '查询失败' }
  }
}

// 开始轮询支付状态
const startPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
  
  pollCount = 0
  
  pollTimer = setInterval(async () => {
    pollCount++
    
    const paymentStatus = await queryPaymentStatus()
    
    if (paymentStatus.status === 'success') {
      clearInterval(pollTimer!)
      message.success(t('pay.paymentSuccessMessage'))
      // 跳转到我的订单页面
      setTimeout(() => {
        router.push('/board/orders')
      }, 1000)
    } else if (paymentStatus.status === 'failed') {
      clearInterval(pollTimer!)
      message.error('支付失败，请重新支付')
    } else if (pollCount >= maxPollCount) {
      // 超时处理
      clearInterval(pollTimer!)
      message.warning('支付超时，请重新支付')
    }
    // 支付中或查询失败，继续轮询
  }, pollInterval)
}

// 返回上一步
const handleBack = () => {
  emit('back')
}

// 初始化
onMounted(() => {
  // 延迟调用，确保orderDetails已经设置
  setTimeout(() => {
    generateQRCode()
  }, 100)
})

// 清理
onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
})
</script>

<style lang="scss" scoped>
.pay-payment {
  padding: 32px;

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 16px;
    border-left: 4px solid var(--primary-color);
    padding-left: 12px;
  }

  .order-section {
    margin-bottom: 32px;

    .order-table {
      margin-bottom: 16px;
    }

    .order-summary {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: right;

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .summary-label {
          font-size: 16px;
          color: var(--text-color);
        }

        .summary-price {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-color);
        }
      }
    }
  }

  .payment-section {
    margin-bottom: 32px;

    .payment-methods {
      .payment-method {
        border: 2px solid #e8e8e8;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s;

        &.active {
          border-color: var(--primary-color);
        }

        .method-header {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e8e8e8;

          .method-icon {
            font-size: 24px;
            color: #09bb07;
            margin-right: 12px;
          }

          .method-name {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-color);
          }
        }

        .payment-content {
          padding: 32px;
          text-align: center;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .payment-loading {
            p {
              margin-top: 16px;
              color: var(--text-light);
            }
          }

          .qr-container {
            margin-bottom: 20px;
            padding: 16px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            text-align: center;

            .qr-code {
              display: block;
              margin: 0 auto;
            }
          }

          .qr-tips {
            .tip-main {
              font-size: 16px;
              font-weight: 600;
              color: var(--text-color);
              margin-bottom: 8px;
            }

            .tip-sub {
              font-size: 14px;
              color: var(--text-light);
              margin: 0;
            }
          }

          .payment-error {
            color: #ff4d4f;

            .anticon {
              font-size: 48px;
              margin-bottom: 16px;
            }

            p {
              margin-bottom: 16px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  .action-section {
    .back-btn {
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      border-radius: 6px;

      &:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }
}
</style> 