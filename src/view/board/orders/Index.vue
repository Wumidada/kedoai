<template>
  <div class="orders-container">
    <!-- 返回首页按钮 -->
    <div class="back-to-home">
      <a-button class="back-home-btn" @click="goToHome">
        <template #icon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12l9-9 9 9M4 10v10a2 2 0 002 2h12a2 2 0 002-2V10"/>
          </svg>
        </template>
        返回首页
      </a-button>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1>我的订单</h1>
      <p>查看和管理您的所有订单</p>
    </div>

    <!-- 订单状态筛选 -->
    <div class="order-filters">
      <a-radio-group v-model:value="activeStatus" button-style="solid">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="pending">待付款</a-radio-button>
        <a-radio-button value="paid">已付款</a-radio-button>
        <a-radio-button value="shipped">已发货</a-radio-button>
        <a-radio-button value="completed">已完成</a-radio-button>
      </a-radio-group>
    </div>

    <!-- 订单列表 -->
    <div class="order-list">
      <div 
        v-for="order in filteredOrders" 
        :key="order.id" 
        class="order-card"
      >
        <!-- 订单头部 -->
        <div class="order-header">
          <div class="order-info">
            <span class="order-id">订单号: {{ order.id }}</span>
            <span class="order-date">{{ order.createdAt }}</span>
          </div>
          <div class="order-status" :class="`status-${order.status}`">
            {{ getStatusText(order.status) }}
          </div>
        </div>

        <!-- 订单商品 -->
        <div class="order-items">
          <div class="order-item" v-for="item in order.items" :key="item.id">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-config" v-if="item.config">
                {{ item.config }}
              </div>
            </div>
            <div class="item-price">
              ¥{{ item.price.toFixed(2) }}
            </div>
            <div class="item-quantity">
              x{{ item.quantity }}
            </div>
          </div>
        </div>

        <!-- 订单金额 -->
        <div class="order-summary">
          <div class="summary-item">
            <span>商品总额:</span>
            <span>¥{{ order.subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-item" v-if="order.shippingFee > 0">
            <span>运费:</span>
            <span>¥{{ order.shippingFee.toFixed(2) }}</span>
          </div>
          <div class="summary-total">
            <span>实付金额:</span>
            <span>¥{{ order.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- 物流信息 -->
        <div class="order-shipping" v-if="order.status === 'paid' || order.status === 'shipped'">
          <div class="shipping-section">
            <h3>物流信息</h3>
            <div v-if="order.shippingInfo && order.shippingInfo.trackingNumber" class="shipping-info">
              <div class="shipping-item">
                <span class="label">物流公司:</span>
                <span class="value">{{ order.shippingInfo.carrier }}</span>
              </div>
              <div class="shipping-item">
                <span class="label">物流单号:</span>
                <span class="value">{{ order.shippingInfo.trackingNumber }}</span>
              </div>
              <div class="shipping-item">
                <span class="label">物流状态:</span>
                <span class="value">{{ order.shippingInfo.status }}</span>
              </div>
              <div class="shipping-item" v-if="order.shippingInfo.estimatedDelivery">
                <span class="label">预计送达:</span>
                <span class="value">{{ order.shippingInfo.estimatedDelivery }}</span>
              </div>
              <a-button type="link" @click="viewLogistics(order)">
                查看物流详情
              </a-button>
            </div>
            <div v-else class="shipping-input">
              <a-input
                v-model:value="trackingNumber"
                placeholder="请输入顺丰物流单号"
                style="width: 300px; margin-right: 8px;"
              />
              <a-button type="primary" @click="updateTrackingNumber(order.id)">
                更新物流单号
              </a-button>
            </div>
          </div>
        </div>

        <!-- 订单操作 -->
        <div class="order-actions">
          <a-button 
            v-if="order.status === 'pending' " 
            type="primary"
            @click="handlePayment(order.id)"
          >
            立即付款
          </a-button>
          <a-button 
            v-if="order.status === 'pending'"
            @click="handleMarkAsPaid(order.id)"
          >
            标记为已付款
          </a-button>
          <a-button 
            v-else-if="order.status === 'shipped'"
            @click="handleConfirmReceipt(order.id)"
          >
            确认收货
          </a-button>
          <a-button 
            v-else-if="order.status === 'completed'"
            @click="handleViewDetails(order.id)"
          >
            查看详情
          </a-button>
          <a-button 
            v-if="order.status !== 'completed'"
            @click="handleCancelOrder(order.id)"
          >
            取消订单
          </a-button>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredOrders.length === 0" class="empty-state">
      <a-empty 
        description="暂无订单"
        style="margin: 40px 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { getOrders } from '@/api/order';
import { awaitWrapper } from '@/api';

const router = useRouter();

// 返回首页
const goToHome = () => {
  router.push('/');
};

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

// 订单状态
const activeStatus = ref<string>('all');

// 物流单号输入
const trackingNumber = ref('');

// 从本地存储获取订单数据
const orders = ref<Order[]>([]);

// 加载订单数据
const loadOrders = () => {
  // 直接从本地存储读取订单数据，避免API调用产生的错误信息
  let storedOrders = localStorage.getItem('kedo_orders');
  let parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
  
  // 测试模式：如果没有订单，尝试从localStorage.json文件读取
  if (parsedOrders.length === 0) {
    try {
      // 这里只是模拟，实际项目中需要通过API获取
      console.log('No orders found in localStorage, using test data');
      // 手动创建测试订单
      parsedOrders = [{
        id: 'KD202603240812',
        createdAt: '2026-03-24T16:12:05.000Z',
        status: 'shipped',
        items: [{
          id: '1',
          name: 'KedoClaw 智能盒子',
          price: 0.01,
          quantity: 1,
          config: 'CPU: cpu2, 内存: memory1'
        }],
        subtotal: 0.01,
        shippingFee: 0,
        total: 0.01,
        paidAt: new Date().toISOString(),
        shippedAt: new Date().toISOString(),
        shippingInfo: {
          carrier: '顺丰速运',
          trackingNumber: 'SF5108692139876',
          status: '运输中',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN')
        }
      }];
      // 保存到localStorage
      localStorage.setItem('kedo_orders', JSON.stringify(parsedOrders));
      console.log('Test order created and saved to localStorage');
    } catch (error) {
      console.log('Error loading test orders:', error);
    }
  }
  
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
  
  // 只在开发模式下输出日志，并且减少输出频率
  if (process.env.NODE_ENV === 'development') {
    console.log('从本地存储读取的订单:', ordersWithShippingInfo);
  }
  orders.value = ordersWithShippingInfo;
};

// 监听订单变化，同步到本地存储
watch(orders, (newOrders) => {
  localStorage.setItem('kedo_orders', JSON.stringify(newOrders));
}, { deep: true });

// 组件挂载时加载订单数据
onMounted(() => {
  loadOrders();
});

// 每3秒自动刷新订单数据，确保能获取到最新数据
setInterval(loadOrders, 3000);

// 根据状态筛选订单
const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') {
    return orders.value;
  }
  return orders.value.filter(order => order.status === activeStatus.value);
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

// 处理付款
const handlePayment = (orderId: string) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    // 跳转到支付页面，传递订单金额和产品信息
    router.push({
      path: `/pay/order/${orderId}`,
      query: {
        amount: order.total.toString(),
        name: order.items[0]?.name || '产品',
        proId: '1' // 传递产品ID
      }
    });
  }
};

// 处理确认收货
const handleConfirmReceipt = (orderId: string) => {
  Modal.confirm({
    title: '确认收货',
    content: '您确定已经收到商品了吗？',
    onOk() {
      // 这里可以添加确认收货的逻辑
      const order = orders.value.find(o => o.id === orderId);
      if (order) {
        order.status = 'completed';
      }
      message.success('确认收货成功');
    }
  });
};

// 处理查看详情
const handleViewDetails = (orderId: string) => {
  message.info(`查看订单 ${orderId} 的详细信息`);
  // 这里可以跳转到订单详情页或显示详情模态框
};

// 处理取消订单
const handleCancelOrder = (orderId: string) => {
  Modal.confirm({
    title: '取消订单',
    content: '您确定要取消这个订单吗？',
    onOk() {
      // 这里可以添加取消订单的逻辑
      const order = orders.value.find(o => o.id === orderId);
      if (order) {
        order.status = 'cancelled';
      }
      message.success('订单已取消');
    }
  });
};

// 查看物流详情
const viewLogistics = (order: Order) => {
  if (order.shippingInfo && order.shippingInfo.trackingNumber) {
    router.push({
      path: '/board/logistics',
      query: {
        trackingNumber: order.shippingInfo.trackingNumber,
        carrier: order.shippingInfo.carrier
      }
    });
  }
};

// 手动标记为已付款
const handleMarkAsPaid = (orderId: string) => {
  Modal.confirm({
    title: '标记为已付款',
    content: '确定要将此订单标记为已付款吗？',
    onOk() {
      const order = orders.value.find(o => o.id === orderId);
      if (order) {
        order.status = 'paid';
        order.paidAt = new Date().toISOString();
        message.success('订单已标记为已付款');
      }
    }
  });
};

// 更新物流单号
const updateTrackingNumber = (orderId: string) => {
  if (!trackingNumber.value) {
    message.error('请输入物流单号');
    return;
  }
  
  const order = orders.value.find(o => o.id === orderId);
  if (order && order.shippingInfo) {
    order.shippingInfo.trackingNumber = trackingNumber.value;
    order.shippingInfo.status = '运输中';
    order.shippingInfo.estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN');
    order.status = 'shipped';
    message.success('物流单号更新成功');
    trackingNumber.value = '';
  }
};

// 获取物流进度（模拟数据）
const getShippingProgress = (trackingNumber: string) => {
  // 模拟物流进度数据
  return [
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
  ];
};
</script>

<style scoped lang="scss">
.orders-container {
  padding: 24px;
  min-height: 600px;
}

.back-to-home {
  margin-bottom: 20px;

  .back-home-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    height: auto;
    font-size: 15px;
    font-weight: 500;
    color: #333;
    background: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      color: #1890ff;
      background: #e6f7ff;
      border-color: #1890ff;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
    }

    svg {
      transition: transform 0.3s ease;
    }

    &:hover svg {
      transform: translateX(-3px);
    }
  }
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

.order-filters {
  margin-bottom: 24px;
}

.order-list {
  .order-card {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;

      .order-info {
        .order-id {
          font-weight: 500;
          margin-right: 20px;
        }
        .order-date {
          color: #999;
          font-size: 14px;
        }
      }

      .order-status {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;

        &.status-pending {
          background: #fff7e6;
          color: #fa8c16;
        }
        &.status-paid {
          background: #e6f7ff;
          color: #1890ff;
        }
        &.status-shipped {
          background: #f6ffed;
          color: #52c41a;
        }
        &.status-completed {
          background: #f0f0f0;
          color: #666;
        }
        &.status-cancelled {
          background: #fff1f0;
          color: #ff4d4f;
        }
      }
    }

    .order-items {
      margin-bottom: 16px;

      .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;

        .item-info {
          flex: 1;
          .item-name {
            font-weight: 500;
            margin-bottom: 4px;
          }
          .item-config {
            font-size: 12px;
            color: #999;
          }
        }

        .item-price {
          margin: 0 20px;
          font-weight: 500;
        }

        .item-quantity {
          color: #999;
        }
      }
    }

    .order-summary {
      margin-bottom: 16px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
      text-align: right;

      .summary-item {
        margin-bottom: 4px;
        font-size: 14px;

        span:first-child {
          margin-right: 10px;
          color: #666;
        }
      }

      .summary-total {
        font-size: 16px;
        font-weight: 600;
        margin-top: 8px;

        span:last-child {
          color: #ff4d4f;
        }
      }
    }

    .shipping-info {
      margin-bottom: 16px;
      padding: 12px;
      background: #fafafa;
      border-radius: 4px;

      h3 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
      }

      h4 {
        font-size: 13px;
        font-weight: 600;
        margin: 16px 0 12px 0;
      }

      .shipping-details {
        .shipping-item {
          margin-bottom: 8px;
          font-size: 14px;

          span:first-child {
            display: inline-block;
            width: 80px;
            color: #666;
          }

          .tracking-input {
            display: inline-flex;
            align-items: center;
          }
        }
      }

      .shipping-progress {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e8e8e8;

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

    .order-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .order-shipping {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;

      .shipping-section {
        h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #333;
        }

        .shipping-info {
          .shipping-item {
            display: flex;
            margin-bottom: 8px;
            align-items: center;

            .label {
              width: 80px;
              color: #666;
              font-size: 14px;
            }

            .value {
              flex: 1;
              color: #333;
              font-size: 14px;
            }
          }

          .ant-btn {
            margin-top: 8px;
          }
        }

        .shipping-input {
          display: flex;
          align-items: center;
          gap: 8px;

          .ant-input {
            flex: 1;
            max-width: 300px;
          }
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}
</style>