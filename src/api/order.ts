import service from '@/utils/request';

// 是否启用后端API，设置为false可以减少控制台错误信息
const ENABLE_BACKEND_API = true;

// 订单接口
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  config?: string;
}

export interface ShippingInfo {
  carrier: string;
  trackingNumber?: string;
  status?: string;
  estimatedDelivery?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingInfo?: ShippingInfo;
  customerInfo?: CustomerInfo;
}

// 创建订单
export async function createOrder(orderData: {
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerInfo: CustomerInfo;
}) {
  if (!ENABLE_BACKEND_API) {
    return Promise.reject(new Error('Backend API disabled'));
  }
  return service.post('/Order/CreateOrder', orderData);
}

// 获取订单列表
export async function getOrders() {
  if (!ENABLE_BACKEND_API) {
    return Promise.reject(new Error('Backend API disabled'));
  }
  return service.get('/Order/GetOrders');
}

// 获取单个订单
export async function getOrder(orderId: string) {
  if (!ENABLE_BACKEND_API) {
    return Promise.reject(new Error('Backend API disabled'));
  }
  return service.get(`/Order/GetOrderById?orderId=${orderId}`);
}

// 更新订单状态
export async function updateOrderStatus(orderId: string, status: Order['status']) {
  if (!ENABLE_BACKEND_API) {
    return Promise.reject(new Error('Backend API disabled'));
  }
  return service.post('/Order/UpdateOrderStatus', { orderId, status });
}

// 取消订单
export async function cancelOrder(orderId: string) {
  if (!ENABLE_BACKEND_API) {
    return Promise.reject(new Error('Backend API disabled'));
  }
  return service.post('/Order/CancelOrder', { orderId });
}
