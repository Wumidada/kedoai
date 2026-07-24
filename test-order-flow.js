// 测试订单流程脚本
import fs from 'fs';

// 模拟本地存储
class LocalStorage {
  constructor() {
    this.storage = {};
    this.loadFromFile();
  }
  
  loadFromFile() {
    try {
      const data = fs.readFileSync('./localStorage.json', 'utf8');
      this.storage = JSON.parse(data);
    } catch (error) {
      console.log('No existing localStorage file, creating new');
    }
  }
  
  saveToFile() {
    fs.writeFileSync('./localStorage.json', JSON.stringify(this.storage, null, 2));
  }
  
  getItem(key) {
    return this.storage[key] || null;
  }
  
  setItem(key, value) {
    this.storage[key] = value;
    this.saveToFile();
  }
}

const localStorage = new LocalStorage();

// 订单ID
const orderId = 'KD202603240812';
// 物流单号
const trackingNumber = 'SF5108692139876';

// 检查是否存在订单
let orders = JSON.parse(localStorage.getItem('kedo_orders') || '[]');

// 查找订单
let order = orders.find(o => o.id === orderId);

if (!order) {
  // 创建新订单
  order = {
    id: orderId,
    createdAt: new Date('2026-03-24 16:12:05').toISOString(),
    status: 'pending',
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
    shippingInfo: {
      carrier: '顺丰速运',
      trackingNumber: '',
      status: '待发货',
      estimatedDelivery: ''
    }
  };
  orders.push(order);
  console.log('Created new order:', orderId);
}

// 模拟付款成功
order.status = 'paid';
order.paidAt = new Date().toISOString();
console.log('Order marked as paid:', orderId);

// 模拟发货
order.status = 'shipped';
order.shippingInfo.trackingNumber = trackingNumber;
order.shippingInfo.status = '运输中';
order.shippingInfo.estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN');
order.shippedAt = new Date().toISOString();
console.log('Order marked as shipped with tracking number:', trackingNumber);

// 保存订单
localStorage.setItem('kedo_orders', JSON.stringify(orders));
console.log('Orders saved to localStorage');

// 显示订单状态
console.log('\nOrder Status:');
console.log('Order ID:', order.id);
console.log('Status:', order.status);
console.log('Tracking Number:', order.shippingInfo.trackingNumber);
console.log('Carrier:', order.shippingInfo.carrier);
console.log('Estimated Delivery:', order.shippingInfo.estimatedDelivery);

// 模拟物流查询
console.log('\nSimulating logistics query...');
console.log('Tracking Number:', trackingNumber);
console.log('Carrier: 顺丰速运');
console.log('\nLogistics Progress:');
console.log('1. [2026-03-27 10:00:00] 包裹已由【深圳宝安仓库】发出');
console.log('2. [2026-03-27 08:30:00] 包裹已到达【深圳转运中心】');
console.log('3. [2026-03-27 06:15:00] 包裹已由【深圳宝安仓库】揽收');
console.log('4. [2026-03-26 23:45:00] 商家已下单');

console.log('\nTest completed successfully!');
console.log('You can now check the order in the \'我的订单\' page.');
console.log('Click on the order to view logistics details.');
