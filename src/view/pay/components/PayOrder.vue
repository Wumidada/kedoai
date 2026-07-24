<template>
  <div class="pay-order">
    <!-- 产品信息 -->
    <div class="product-section">
      <h2 class="section-title">{{ $t('pay.productInfo') }}</h2>
      <div class="product-info">
        <span class="product-label">{{ $t('pay.productName') }}：</span>
        <span class="product-name">{{ productName }}</span>
      </div>
    </div>

    <!-- 套餐选择 -->
    <div class="package-section">
      <h2 class="section-title">{{ $t('pay.packageSelection') }}</h2>
      
      <!-- 加载状态 -->
      <div v-if="packageLoading" class="loading-state">
        <a-spin size="large" />
        <p>{{ $t('pay.loadingPackageInfo') }}</p>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="packageList.length === 0" class="empty-state">
        <p>{{ $t('pay.noAvailablePackages') }}</p>
      </div>
      
      <!-- 套餐列表 -->
      <div v-else class="package-list">
        <div
          v-for="item in packageList"
          :key="item.id"
          class="package-item"
          :class="{ active: item.isChoose }"
          @click="handlePackageSelect(item.id)"
        >
          <div class="package-content">
            <div class="package-info">
              <h3 class="package-duration">{{ item.time }}</h3>
              <p class="package-desc">{{ item.description || $t('pay.recommendedPackage') }}</p>
            </div>
            <div class="package-price">
              <span class="current-price">¥{{ formatPrice(item.nowPrice) }}</span>
              <span v-if="item.originPrice > item.nowPrice" class="original-price">¥{{ formatPrice(item.originPrice) }}</span>
            </div>
          </div>
          <div v-if="item.originPrice > item.nowPrice" class="package-badge">
            {{ getDiscountText(item.nowPrice, item.originPrice) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义金额 -->
    <div class="custom-section">
      <div class="custom-header">
        <a-checkbox v-model:checked="customPriceDetail.isCustom" @change="handleCustomChange">
          {{ $t('pay.customAmount') }}
        </a-checkbox>
      </div>
      
      <div v-if="customPriceDetail.isCustom" class="custom-content">
        <div class="custom-input-wrapper">
          <span class="input-label">{{ $t('pay.amount') }}：</span>
          <a-input-number
            v-model:value="customPriceDetail.money"
            :min="0.01"
            :max="100000"
            :step="0.01"
            :precision="2"
            class="custom-input"
            @change="handleCustomMoneyChange"
            :placeholder="$t('pay.enterAmount')"
          />
          <span class="input-unit">{{ $t('pay.yuan') }}</span>
          <span v-if="customPriceDetail.money && customPriceDetail.radio" class="token-preview">
            {{ $t('pay.tokenPreview', { count: formatTokenCount(customPriceDetail.money * customPriceDetail.radio) }) }}
          </span>
        </div>
        <p class="custom-desc">{{ customPriceDetail.description }}</p>
      </div>
    </div>

    <!-- 订单详情 -->
    <div class="order-section">
      <h2 class="section-title">{{ $t('pay.orderDetails') }}</h2>
      <a-table
        :columns="orderColumns"
        :dataSource="orderList"
        :pagination="false"
        :scroll="{ x: 500 }"
      />
      
      <div class="order-summary">
        <div class="summary-row">
          <span class="summary-label">{{ $t('pay.amountToPay') }}：</span>
          <span class="summary-price">¥{{ formatPrice(payMoney) }}</span>
        </div>
        <div v-if="saveMoney > 0" class="summary-row save">
          <span class="summary-label">{{ $t('pay.discountAmount') }}：</span>
          <span class="summary-price">¥{{ formatPrice(saveMoney) }}</span>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <a-button
        type="primary"
        size="large"
        :disabled="!canProceed"
        @click="handleNext"
      >
        {{ $t('pay.nextStep') }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { queryProductServices, getTokenPrice } from '@/api/pay'
import { awaitWrapper } from '@/api'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'

interface Props {
  productName: string
  productId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  next: [orderData: any]
}>()

const userStore = useUserStore()
const { t } = useI18n()

// 套餐数据
const packageList = ref<any[]>([])
const packageLoading = ref(false)

// 自定义价格详情
const customPriceDetail = reactive({
  proId: '',
  radio: 0,
  originRadio: 0,
  money: 0.01,
  isCustom: false,
  description: ''
})

// 订单信息
const orderList = ref([
  {
    name: props.productName,
    time: '',
    date: new Date().toLocaleDateString()
  }
])

// 支付相关
const payMoney = ref(0)
const saveMoney = ref(0)
const payProCode = ref('')

// 表格列配置
const orderColumns = [
  { title: t('pay.purchaseContent'), dataIndex: 'name', key: 'name' },
  { title: t('pay.purchaseQuantity'), dataIndex: 'time', key: 'time' },
  { title: t('pay.orderCreationTime'), dataIndex: 'date', key: 'date' }
]

// 计算属性
const canProceed = computed(() => {
  return payMoney.value > 0 || customPriceDetail.isCustom
})

// 加载套餐数据
const loadPackageData = async () => {
  packageLoading.value = true
  try {
    const [err, response] = await awaitWrapper(queryProductServices({ F_ProdId: props.productId }))
    if (err) {
      console.error('加载套餐数据失败:', err)
      message.error(t('pay.loadPackageDataFailed'))
      return
    }
    
    if (response?.data && response.data.length > 0) {
      packageList.value = response.data.map((item: any) => ({
        id: item.f_Months,
        nowPrice: Number(item.f_Price),
        originPrice: Number(item.f_OriginalPrice),
        time: item.f_Service_Duration,
        isChoose: false,
        payProCode: item.f_ProdCode,
        description: item.f_Description || getPriceDescription(Number(item.f_Price), Number(item.f_OriginalPrice))
      }))
    } else {
      console.log('API返回数据为空或格式不正确:', response)
    }
  } catch (error) {
    console.error('加载套餐数据失败:', error)
    message.error(t('pay.loadPackageDataFailed'))
  } finally {
    packageLoading.value = false
  }
}

// 生成价格描述
const getPriceDescription = (nowPrice: number, originalPrice: number) => {
  if (originalPrice > nowPrice) {
    const discount = Math.round((1 - nowPrice / originalPrice) * 100)
    return `特惠价格，节省${discount}%`
  }
  return '推荐套餐'
}

// 获取折扣文本
const getDiscountText = (nowPrice: number, originalPrice: number) => {
  const discount = Math.round((1 - nowPrice / originalPrice) * 100)
  return `${discount}折`
}

// 加载自定义价格数据
const loadCustomPriceData = async () => {
  try {
    const [err, response] = await awaitWrapper(getTokenPrice({ userId: userStore.getUserId as string }))
    if (err) {
      console.error('加载自定义价格数据失败:', err)
      return
    }
    
    if (response?.data) {
    const data = response.data
    Object.assign(customPriceDetail, {
      proId: data.f_ProdCode,
      radio: Number(data.f_Price), // 1元可购买的token数量
      originRadio: Number(data.f_OriginalPrice),
      money: 0.01,
      isCustom: false,
      description: data.f_Description
    })
  }
  } catch (error) {
    console.error('加载自定义价格数据失败:', error)
  }
}

// 套餐选择处理
const handlePackageSelect = (id: string) => {
  const selectedPackage = packageList.value.find(item => item.id === id)
  if (!selectedPackage) return

  if (selectedPackage.isChoose) {
    // 取消选择
    selectedPackage.isChoose = false
    payMoney.value = 0
    saveMoney.value = 0
    payProCode.value = ''
    orderList.value[0].time = ''
  } else {
    // 选择套餐
    packageList.value.forEach(item => {
      item.isChoose = item.id === id
    })
    customPriceDetail.isCustom = false
    
    payMoney.value = selectedPackage.nowPrice
    saveMoney.value = selectedPackage.originPrice - selectedPackage.nowPrice
    payProCode.value = selectedPackage.payProCode
    orderList.value[0].time = selectedPackage.time
  }
}

// 自定义金额切换
const handleCustomChange = (e: any) => {
  if (e.target.checked) {
    // 启用自定义金额
    packageList.value.forEach(item => {
      item.isChoose = false
    })
    handleCustomMoneyChange(customPriceDetail.money)
  } else {
    // 禁用自定义金额
    payMoney.value = 0
    saveMoney.value = 0
    payProCode.value = ''
    orderList.value[0].time = ''
  }
}

// 自定义金额变化
const handleCustomMoneyChange = (value: number) => {
  if (!customPriceDetail.isCustom) return
  
  customPriceDetail.money = value
  // 计算获得的token数量：金额 * 每元可购买的token数
  const tokenCount = value * customPriceDetail.radio
  orderList.value[0].time = formatTokenCount(tokenCount)
  payMoney.value = value
  
  // 计算优惠金额（如果原价和现价不同）
  if (customPriceDetail.originRadio > customPriceDetail.radio) {
    const originalCost = tokenCount / customPriceDetail.originRadio
    saveMoney.value = Number((originalCost - value).toFixed(2))
  } else {
    saveMoney.value = 0
  }
  
  payProCode.value = customPriceDetail.proId
}

// 格式化token数量显示
const formatTokenCount = (count: number) => {
  if (count >= 100000000) { // >= 1亿
    return `${(count / 100000000).toFixed(1)}亿 tokens`
  } else if (count >= 10000) { // >= 1万
    return `${(count / 10000).toFixed(0)}万 tokens`
  } else {
    return `${count} tokens`
  }
}

// 格式化价格显示
const formatPrice = (price: number) => {
  return price % 1 === 0 ? price.toString() : price.toFixed(2)
}

// 下一步
const handleNext = () => {
  if (!canProceed.value) {
    message.warning('请选择套餐')
    return
  }

  const orderData = {
    list: orderList.value,
    totalMoney: payMoney.value,
    proId: payProCode.value,
    productName: props.productName
  }

  emit('next', orderData)
}

// 监听 productId 变化
watch(() => props.productId, async (newProductId) => {
  if (newProductId) {
    await loadPackageData()
  }
}, { immediate: true })

// 初始化数据
onMounted(async () => {
  await loadCustomPriceData()
})
</script>

<style lang="scss" scoped>
.pay-order {
  padding: 32px;

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 16px;
    border-left: 4px solid var(--primary-color);
    padding-left: 12px;
  }

  .product-section {
    margin-bottom: 32px;

    .product-info {
      display: flex;
      align-items: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;

      .product-label {
        font-size: 16px;
        color: var(--text-light);
        margin-right: 12px;
      }

      .product-name {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-color);
      }
    }
  }

  .package-section {
    margin-bottom: 32px;

    .loading-state {
      text-align: center;
      padding: 40px;
      
      p {
        margin-top: 16px;
        color: var(--text-light);
      }
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: var(--text-light);
    }

    .package-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .package-item {
      position: relative;
      padding: 20px;
      border: 2px solid #e8e8e8;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(30, 156, 255, 0.15);
      }

      &.active {
        border-color: var(--primary-color);
        background: #f0f8ff;
        box-shadow: 0 4px 12px rgba(30, 156, 255, 0.2);
      }

      .package-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .package-info {
        .package-duration {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-color);
          margin: 0 0 4px 0;
        }

        .package-desc {
          font-size: 14px;
          color: var(--text-light);
          margin: 0;
        }
      }

      .package-price {
        text-align: right;

        .current-price {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-color);
        }

        .original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
          margin-left: 8px;
        }
      }

      .package-badge {
        position: absolute;
        top: -1px;
        right: -1px;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        color: white;
        padding: 4px 12px;
        border-radius: 0 12px 0 12px;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }

  .custom-section {
    margin-bottom: 32px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;

    .custom-header {
      margin-bottom: 16px;
    }

    .custom-content {
      .custom-input-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .input-label {
          margin-right: 12px;
          color: var(--text-color);
          font-weight: 500;
        }

        .custom-input {
          width: 120px;
          margin-right: 8px;
        }

        .input-unit {
          color: var(--text-light);
        }

        .token-preview {
          margin-left: 12px;
          color: var(--primary-color);
          font-weight: 500;
          font-size: 14px;
        }
      }

      .custom-desc {
        font-size: 14px;
        color: var(--text-light);
        margin: 0;
      }
    }
  }

  .order-section {
    margin-bottom: 32px;

    .order-summary {
      margin-top: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        &.save {
          .summary-price {
            color: #52c41a;
          }
        }

        .summary-label {
          font-size: 16px;
          color: var(--text-color);
        }

        .summary-price {
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-color);
        }
      }
    }
  }



  .action-section {
    text-align: center;

    .next-btn {
      min-width: 200px;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      background: var(--gradient-primary);
      border: none;
      border-radius: 8px;

      &:hover:not(:disabled) {
        background: var(--gradient-dark);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(30, 156, 255, 0.3);
      }
    }
  }
}
</style> 