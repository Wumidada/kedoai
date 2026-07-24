<template>
  <div class="logistics-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>物流查询</h1>
      <p>输入物流单号查询物流信息</p>
    </div>

    <!-- 物流查询表单 -->
    <div class="logistics-form">
      <a-form layout="vertical" @submit.prevent="searchLogistics">
        <a-form-item label="物流公司">
          <a-select v-model:value="selectedCarrier" style="width: 200px;">
            <a-select-option value="顺丰速运">顺丰速运</a-select-option>
            <a-select-option value="中通快递">中通快递</a-select-option>
            <a-select-option value="圆通快递">圆通快递</a-select-option>
            <a-select-option value="申通快递">申通快递</a-select-option>
            <a-select-option value="韵达快递">韵达快递</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="物流单号">
          <a-input 
            v-model:value="trackingNumber" 
            placeholder="请输入物流单号" 
            style="width: 400px;"
          />
        </a-form-item>
        
        <a-form-item label="手机号后四位">
          <a-input 
            v-model:value="phoneTail" 
            placeholder="无月结账户时填写" 
            style="width: 400px;"
            maxlength="4"
          />
        </a-form-item>
        
        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 物流信息展示 -->
    <div v-if="logisticsInfo" class="logistics-info">
      <h2>物流信息</h2>
      <div class="info-card">
        <div class="info-item">
          <span class="label">物流公司:</span>
          <span class="value">{{ logisticsInfo.carrier }}</span>
        </div>
        <div class="info-item">
          <span class="label">物流单号:</span>
          <span class="value">{{ logisticsInfo.trackingNumber }}</span>
        </div>
        <div class="info-item">
          <span class="label">物流状态:</span>
          <span class="value">{{ logisticsInfo.status }}</span>
        </div>
        <div class="info-item">
          <span class="label">预计送达:</span>
          <span class="value">{{ logisticsInfo.estimatedDelivery }}</span>
        </div>
      </div>

      <!-- 物流进度 -->
      <div class="logistics-progress">
        <h3>物流进度</h3>
        <div class="progress-timeline">
          <div 
            v-for="(step, index) in logisticsInfo.progress" 
            :key="index"
            class="progress-step"
            :class="{ 'active': step.status === 'completed' }"
          >
            <div class="step-dot"></div>
            <div class="step-content">
              <div class="step-time">{{ step.time }}</div>
              <div class="step-description">{{ step.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list-section">
      <h2>我的订单</h2>
      <div class="order-list">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="order-card"
          @click="selectOrder(order)"
        >
          <div class="order-header">
            <span class="order-id">订单号: {{ order.id }}</span>
            <span class="order-status">{{ getStatusText(order.status) }}</span>
          </div>
          <div class="order-items">
            <div class="order-item" v-for="item in order.items" :key="item.id">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">¥{{ item.price.toFixed(2) }} x {{ item.quantity }}</div>
            </div>
          </div>
          <div class="order-summary">
            总金额: ¥{{ order.total.toFixed(2) }}
          </div>
          <div class="order-shipping" v-if="order.shippingInfo && order.shippingInfo.trackingNumber">
            <span class="shipping-label">物流单号:</span>
            <span class="shipping-number">{{ order.shippingInfo.trackingNumber }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { getSFExpressTracking, formatLogisticsInfo } from '@/api/logistics';

// 订单状态类型
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

// 订单商品接口
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  config?: string;
}

// 物流信息接口
interface ShippingInfo {
  carrier: string;
  trackingNumber?: string;
  status?: string;
  estimatedDelivery?: string;
}

// 物流进度接口
interface LogisticsStep {
  time: string;
  description: string;
  status: 'completed' | 'pending';
}

// 完整物流信息接口
interface LogisticsInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  progress: LogisticsStep[];
}

// 订单接口
interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingInfo?: ShippingInfo;
}

// 状态
const selectedCarrier = ref('顺丰速运');
const trackingNumber = ref('');
const phoneTail = ref('');
const logisticsInfo = ref<LogisticsInfo | null>(null);
const orders = ref<Order[]>([]);

// 加载订单数据
const loadOrders = () => {
  const storedOrders = localStorage.getItem('kedo_orders');
  const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
  
  // 为没有 shippingInfo 的订单添加默认物流信息
  const ordersWithShippingInfo = parsedOrders.map(order => {
    if (!order.shippingInfo) {
      return {
        ...order,
        shippingInfo: {
          carrier: '顺丰速运',
          trackingNumber: '',
          status: '待发货',
          estimatedDelivery: ''
        }
      };
    }
    return order;
  });
  
  orders.value = ordersWithShippingInfo;
};

// 组件挂载时加载订单数据
onMounted(() => {
  loadOrders();
  // 从URL参数获取物流信息
  const urlParams = new URLSearchParams(window.location.search);
  const tracking = urlParams.get('trackingNumber');
  const carrier = urlParams.get('carrier');
  if (tracking) {
    trackingNumber.value = tracking;
    if (carrier) {
      selectedCarrier.value = carrier;
    }
    // 自动查询物流
    setTimeout(() => {
      searchLogistics();
    }, 100);
  }
});

// 获取状态文本
const getStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    pending: '待付款',
    paid: '已付款',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  };
  return statusMap[status];
};

// 选择订单
const selectOrder = (order: Order) => {
  if (order.shippingInfo && order.shippingInfo.trackingNumber) {
    selectedCarrier.value = order.shippingInfo.carrier;
    trackingNumber.value = order.shippingInfo.trackingNumber;
    searchLogistics();
  } else {
    message.info('该订单暂无物流信息');
  }
};

// 查询物流
const searchLogistics = async () => {
  console.log('点击查询了！');
  if (!trackingNumber.value) {
    message.error('请输入物流单号');
    return;
  }
  
  console.log('准备查询物流，单号:', trackingNumber.value);
  message.loading('正在查询物流信息...');
  
  try {
    // 使用真实的顺丰API查询
    console.log('调用 getSFExpressTracking 函数');
    const result = await getSFExpressTracking(trackingNumber.value, phoneTail.value);
    console.log('API返回结果:', result);
    // 格式化物流信息
    logisticsInfo.value = formatLogisticsInfo(result);
    console.log('格式化后的物流信息:', logisticsInfo.value);
    message.success('物流信息查询成功');
  } catch (error) {
    console.error('物流查询失败:', error);
    message.error('物流查询失败，请稍后重试');
    // 失败时使用模拟数据
    logisticsInfo.value = {
      carrier: selectedCarrier.value,
      trackingNumber: trackingNumber.value,
      status: '运输中',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN'),
      progress: [
        {
          time: new Date().toLocaleString('zh-CN'),
          description: '包裹已由【深圳宝安仓库】发出',
          status: 'completed'
        },
        {
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('zh-CN'),
          description: '包裹已到达【深圳转运中心】',
          status: 'completed'
        },
        {
          time: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleString('zh-CN'),
          description: '包裹已由【深圳宝安仓库】揽收',
          status: 'completed'
        },
        {
          time: new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString('zh-CN'),
          description: '商家已下单',
          status: 'completed'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.logistics-container {
  padding: 24px;
  min-height: 600px;
}

.page-header {
  margin-bottom: 24px;
  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  p {
    color: #666;
    font-size: 14px;
  }
}

.logistics-form {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.logistics-info {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 24px 0 16px 0;
  }

  .info-card {
    background: #fafafa;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 24px;

    .info-item {
      margin-bottom: 8px;
      font-size: 14px;

      .label {
        display: inline-block;
        width: 100px;
        color: #666;
      }

      .value {
        font-weight: 500;
      }
    }
  }

  .logistics-progress {
    .progress-timeline {
      position: relative;
      padding-left: 20px;

      &:before {
        content: '';
        position: absolute;
        left: 6px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #e8e8e8;
      }

      .progress-step {
        position: relative;
        margin-bottom: 16px;

        .step-dot {
          position: absolute;
          left: -20px;
          top: 4px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e8e8e8;
          border: 2px solid #fff;
          transition: all 0.3s ease;
        }

        .step-content {
          min-height: 40px;

          .step-time {
            font-size: 12px;
            color: #999;
            margin-bottom: 4px;
          }

          .step-description {
            font-size: 13px;
            color: #333;
          }
        }

        &.active {
          .step-dot {
            background: #1890ff;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
          }

          .step-content {
            .step-description {
              color: #1890ff;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}

.order-list-section {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .order-list {
    .order-card {
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: #1890ff;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
      }

      .order-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .order-id {
          font-weight: 500;
        }

        .order-status {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          background: #f0f0f0;
          color: #666;
        }
      }

      .order-items {
        margin-bottom: 12px;

        .order-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;

          .item-name {
            font-size: 14px;
          }

          .item-price {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }

      .order-summary {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .order-shipping {
        font-size: 12px;
        color: #666;

        .shipping-label {
          margin-right: 4px;
        }

        .shipping-number {
          color: #1890ff;
        }
      }
    }
  }
}
</style>