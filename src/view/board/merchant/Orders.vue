<template>
  <div class="merchant-orders-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>商家订单管理</h1>
      <p>查看和管理所有订单</p>
    </div>

    <!-- 订单状态筛选 -->
    <div class="order-filters">
      <a-radio-group v-model:value="activeStatus" button-style="solid">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="pending">待付款</a-radio-button>
        <a-radio-button value="paid">已付款</a-radio-button>
        <a-radio-button value="shipped">已发货</a-radio-button>
        <a-radio-button value="completed">已完成</a-radio-button>
        <a-radio-button value="cancelled">已取消</a-radio-button>
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

        <!-- 客户信息 -->
        <div class="customer-info" v-if="order.customerInfo">
          <h3>客户信息</h3>
          <div class="customer-details">
            <div class="customer-item">
              <span>姓名:</span>
              <span>{{ order.customerInfo.name }}</span>
            </div>
            <div class="customer-item">
              <span>电话:</span>
              <span>{{ order.customerInfo.phone }}</span>
            </div>
            <div class="customer-item">
              <span>地址:</span>
              <span>{{ order.customerInfo.address }}</span>
            </div>
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
        <div class="shipping-info" v-if="order.shippingInfo">
          <h3>物流信息</h3>
          <div class="shipping-details">
            <div class="shipping-item">
              <span>物流公司:</span>
              <span>{{ order.shippingInfo.carrier }}</span>
            </div>
            <div class="shipping-item" v-if="order.shippingInfo.trackingNumber">
              <span>运单号:</span>
              <span>{{ order.shippingInfo.trackingNumber }}</span>
            </div>
            <div class="shipping-item" v-if="order.shippingInfo.status">
              <span>物流状态:</span>
              <span>{{ order.shippingInfo.status }}</span>
            </div>
            <div class="shipping-item" v-if="order.shippingInfo.estimatedDelivery">
              <span>预计送达:</span>
              <span>{{ order.shippingInfo.estimatedDelivery }}</span>
            </div>
          </div>
        </div>

        <!-- 物流信息编辑 -->
        <div class="shipping-edit" v-if="order.status === 'paid'">
          <h3>填写物流信息</h3>
          <a-form :model="shippingForm" @finish="handleShippingSubmit(order.id)">
            <a-form-item label="物流公司" name="carrier" :rules="[{ required: true, message: '请选择物流公司' }]">
              <a-select v-model:value="shippingForm.carrier">
                <a-select-option value="顺丰速运">顺丰速运</a-select-option>
                <a-select-option value="中通快递">中通快递</a-select-option>
                <a-select-option value="申通快递">申通快递</a-select-option>
                <a-select-option value="圆通快递">圆通快递</a-select-option>
                <a-select-option value="韵达快递">韵达快递</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="运单号" name="trackingNumber" :rules="[{ required: true, message: '请填写运单号' }]">
              <a-input v-model:value="shippingForm.trackingNumber" placeholder="请输入运单号" />
            </a-form-item>
            <a-form-item label="预计送达" name="estimatedDelivery">
              <a-date-picker v-model:value="shippingForm.estimatedDelivery" format="YYYY-MM-DD" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">确认发货</a-button>
            </a-form-item>
          </a-form>
        </div>

        <!-- 订单操作 -->
        <div class="order-actions">
          <a-button 
            v-if="order.status === 'pending'"
            @click="handleUpdateStatus(order.id, 'cancelled')"
          >
            取消订单
          </a-button>
          <a-button 
            v-if="order.status === 'paid'"
            type="primary"
            @click="showShippingForm(order.id)"
          >
            发货
          </a-button>
          <a-button 
            v-if="order.status === 'shipped'"
            @click="handleUpdateStatus(order.id, 'completed')"
          >
            标记为已完成
          </a-button>
          <a-button 
            v-if="order.status !== 'cancelled' && order.status !== 'completed'"
            danger
            @click="handleUpdateStatus(order.id, 'cancelled')"
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
import { ref, computed, watch } from 'vue';
import { message, Modal, Form } from 'ant-design-vue';

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

// 客户信息接口
interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
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
  customerInfo?: CustomerInfo;
}

// 订单状态
const activeStatus = ref<string>('all');

// 从本地存储获取订单数据
const orders = ref<Order[]>([]);

// 物流表单
const shippingForm = ref({
  carrier: '',
  trackingNumber: '',
  estimatedDelivery: null as any
});

// 加载订单数据
const loadOrders = () => {
  // 直接从本地存储读取订单数据
  const storedOrders = localStorage.getItem('kedo_orders');
  const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
  orders.value = parsedOrders;
};

// 监听订单变化，同步到本地存储
watch(orders, (newOrders) => {
  localStorage.setItem('kedo_orders', JSON.stringify(newOrders));
}, { deep: true });

// 组件挂载时加载订单数据
loadOrders();

// 每3秒自动刷新订单数据
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

// 显示物流表单
const showShippingForm = (orderId: string) => {
  // 可以在这里添加逻辑，例如打开模态框等
  console.log('显示物流表单:', orderId);
};

// 提交物流信息
const handleShippingSubmit = (orderId: string) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = 'shipped';
    order.shippingInfo = {
      carrier: shippingForm.value.carrier,
      trackingNumber: shippingForm.value.trackingNumber,
      status: '运输中',
      estimatedDelivery: shippingForm.value.estimatedDelivery ? shippingForm.value.estimatedDelivery.format('YYYY-MM-DD') : undefined
    };
    message.success('发货成功');
    // 重置表单
    shippingForm.value = {
      carrier: '',
      trackingNumber: '',
      estimatedDelivery: null
    };
  }
};

// 更新订单状态
const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
  Modal.confirm({
    title: '确认操作',
    content: `确定要将订单状态更新为${getStatusText(status)}吗？`,
    onOk() {
      const order = orders.value.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        message.success('订单状态更新成功');
      }
    }
  });
};
</script>

<style scoped lang="scss">
.merchant-orders-container {
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

    .customer-info {
      margin-bottom: 16px;
      padding: 12px;
      background: #fafafa;
      border-radius: 4px;

      h3 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .customer-details {
        .customer-item {
          margin-bottom: 8px;
          font-size: 14px;

          span:first-child {
            display: inline-block;
            width: 80px;
            color: #666;
          }
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

      .shipping-details {
        .shipping-item {
          margin-bottom: 8px;
          font-size: 14px;

          span:first-child {
            display: inline-block;
            width: 80px;
            color: #666;
          }
        }
      }
    }

    .shipping-edit {
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;

      h3 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .ant-form-item {
        margin-bottom: 12px;
      }
    }

    .order-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}
</style>