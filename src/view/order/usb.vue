<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()

// U盘版产品配置数据
const configOptions = [
  {
    id: 'usb-32g',
    name: 'KedoBot U盘版 - 32GB',
    price: 299
  },
  {
    id: 'usb-64g',
    name: 'KedoBot U盘版 - 64GB',
    price: 399
  },
  {
    id: 'usb-128g',
    name: 'KedoBot U盘版 - 128GB',
    price: 499
  },
  {
    id: 'usb-256g',
    name: 'KedoBot U盘版 - 256GB',
    price: 699
  }
]

// 表单数据
const formData = ref({
  name: '',
  phone: '',
  address: '',
  quantity: 1,
  config: ''
})

// 计算当前选择的配置
const selectedConfig = computed(() => {
  return configOptions.find(option => option.id === formData.value.config) || null
})

// 更新总价
const updateTotalPrice = () => {
  if (selectedConfig.value) {
    totalPrice.value = selectedConfig.value.price * formData.value.quantity
  } else {
    totalPrice.value = 0
  }
}

// 计算总价
const totalPrice = ref(0)

// 初始化总价
updateTotalPrice()

// 从URL参数中获取配置ID
onMounted(() => {
  const configId = route.query.config
  
  if (configId) {
    const configExists = configOptions.some(option => option.id === configId)
    if (configExists) {
      formData.value.config = configId
    }
  } else {
    // 如果没有配置ID，选择第一个配置
    if (configOptions.length > 0) {
      formData.value.config = configOptions[0].id
    }
  }
})

// 增加数量
const increaseQuantity = () => {
  formData.value.quantity++
  updateTotalPrice()
}

// 减少数量
const decreaseQuantity = () => {
  if (formData.value.quantity > 1) {
    formData.value.quantity--
    updateTotalPrice()
  }
}

// 监听配置变化，自动更新总价
watch(() => formData.value.config, () => {
  updateTotalPrice()
})

// 返回上一页
const goBack = () => {
  router.push('/board/KedoBotUSB')
}

// 提交订单
const submitOrder = () => {
  // 简单验证
  if (!formData.value.name || !formData.value.phone || !formData.value.address) {
    message.error('请填写必填信息')
    return
  }
  
  if (!formData.value.config) {
    message.error('请选择产品配置')
    return
  }
  
  // 创建订单数据
  const order = {
    id: 'KD' + new Date().toISOString().replace(/[-:.TZ]/g, '').substring(0, 12),
    createdAt: new Date().toISOString(),
    status: 'pending',
    items: [{
      id: formData.value.config,
      name: selectedConfig.value.name,
      price: selectedConfig.value.price,
      quantity: formData.value.quantity,
      config: selectedConfig.value.name
    }],
    subtotal: totalPrice.value,
    shippingFee: 0,
    total: totalPrice.value,
    shippingInfo: {
      carrier: '顺丰速运',
      trackingNumber: '',
      status: '待发货',
      estimatedDelivery: ''
    },
    customerInfo: {
      name: formData.value.name,
      phone: formData.value.phone,
      address: formData.value.address
    }
  }
  
  // 保存订单到本地存储
  let orders = JSON.parse(localStorage.getItem('kedo_orders') || '[]')
  orders.unshift(order) // 添加到订单列表开头
  localStorage.setItem('kedo_orders', JSON.stringify(orders))
  
  // 显示成功消息
  message.success('订单提交成功！您可以在订单详情中查看')
  
  // 重置表单
  formData.value = {
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    config: ''
  }
  updateTotalPrice()
  
  // 3秒后跳转到订单详情页面
  setTimeout(() => {
    router.push('/board/orders')
  }, 3000)
}

// 产品数据
const product = {
  name: 'KedoBot U盘版',
  image: '../../assets/images/kedo_claw_usb.svg'
}
</script>

<template>
  <div class="order-container">
    <div class="order-header">
      <button class="back-button" @click="goBack" style="cursor: pointer;">
        &larr; 返回
      </button>
      <h1 class="decorated-title">KedoBot U盘版</h1>
      <p>填写以下信息完成订购</p>
    </div>
    
    <div class="order-content">
      <div class="product-info">
        <img :src="product.image" alt="KedoBot U盘版" />
        <div class="product-details">
          <h2>KedoBot U盘版</h2>
          <div class="price">¥{{ selectedConfig ? selectedConfig.price : '0' }}</div>
          <div class="quantity-control">
            <button @click="decreaseQuantity"><span>-</span></button>
            <span>{{ formData.quantity }}</span>
            <button @click="increaseQuantity"><span>+</span></button>
          </div>
          <div class="total-price">
            总价: <span>¥{{ totalPrice }}</span>
          </div>
          
          <div class="configuration-section">
            <h3>存储容量</h3>
            <div class="config-options">
              <label v-for="option in configOptions" :key="option.id" class="config-option detailed-config">
                <input type="radio" v-model="formData.config" :value="option.id" />
                <div class="config-info">
                  <span class="config-name">{{ option.name }}</span>
                  <span class="config-price">¥{{ option.price }}</span>
                </div>
              </label>
            </div>
          </div>
          
        </div>
      </div>
      
      <div class="order-form">
        <h3>联系信息</h3>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input type="text" id="name" v-model="formData.name" placeholder="请输入您的姓名" />
          </div>
          <div class="form-group">
            <label for="phone">电话 *</label>
            <input type="tel" id="phone" v-model="formData.phone" placeholder="请输入您的电话" />
          </div>
          <div class="form-group">
            <label for="address">地址 *</label>
            <textarea id="address" v-model="formData.address" placeholder="请输入您的收货地址"></textarea>
          </div>
          <button type="submit" class="submit-button">提交订单</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem 0;
  overflow-y: auto;
  height: auto;
  
  .order-header {
    position: relative;
    text-align: center;
    padding: 2rem;
    background: white;
    margin-bottom: 2rem;
    
    .back-button {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        background: #1E9CFF;
        border: 1px solid #1E9CFF;
        border-radius: 6px;
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        
        &:hover {
          background: #0DA8EF;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #1A202C;
    }
    
    .decorated-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #1E9CFF, #70D3FF);
        border-radius: 2px;
      }
    }
    
    p {
      color: #4A5568;
    }
  }
  
  .order-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    min-height: 100vh;
    
    .product-info {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: 500px;
      max-height: none;
      
      img {
        width: 100%;
        height: 200px;
        object-fit: contain;
        border-radius: 8px;
        margin-bottom: 1rem;
      }
      
      .product-details {
        flex: 1;
        min-height: 0;
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1A202C;
        }
        
        .price {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1E9CFF;
          margin-bottom: 1rem;
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          
          button {
            width: 36px;
            height: 36px;
            border: 1px solid #A0AEC0;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 600;
            
            &:hover {
              background: #F1F5F9;
            }
            
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
          
          span {
            margin: 0 1.5rem;
            font-size: 1.1rem;
            min-width: 40px;
            text-align: center;
            font-weight: 500;
          }
        }
        
        .total-price {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1A202C;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #EDF2F7;
          
          span {
            color: #1E9CFF;
            font-size: 1.5rem;
            font-weight: 700;
          }
        }
        
        .configuration-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #EDF2F7;
          
          h3 {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            color: #1A202C;
          }
          
          .config-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            
            .config-option {
              padding: 0.6rem 0.8rem;
              border: 1px solid #A0AEC0;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
              
              &:hover {
                border-color: #1E9CFF;
                background-color: rgba(30, 156, 255, 0.05);
              }
              
              input[type="radio"] {
                margin-bottom: 0.3rem;
              }
              
              .config-info {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
                
                .config-name {
                  font-size: 0.85rem;
                  line-height: 1.3;
                  color: #4A5568;
                }
                
                .config-price {
                  font-size: 0.9rem;
                  font-weight: 600;
                  color: #1E9CFF;
                }
              }
            }
            
            .config-option:has(input[type="radio"]:checked) {
              border-color: #1E9CFF;
              background-color: rgba(30, 156, 255, 0.1);
              
              .config-info {
                .config-name {
                  color: #1A202C;
                  font-weight: 500;
                }
              }
            }
            
            .detailed-config {
              padding: 1rem;
              border: 1px solid #A0AEC0;
              border-radius: 8px;
              background: white;
              transition: all 0.3s ease;
              
              &:hover {
                border-color: #1E9CFF;
                background-color: rgba(30, 156, 255, 0.05);
              }
              
              input[type="radio"] {
                margin-bottom: 0.5rem;
              }
              
              .config-info {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                
                .config-name {
                  font-size: 0.9rem;
                  line-height: 1.4;
                  color: #4A5568;
                }
                
                .config-price {
                  font-size: 1rem;
                  font-weight: 600;
                  color: #1E9CFF;
                }
              }
            }
            
            .detailed-config:has(input[type="radio"]:checked) {
              border-color: #1E9CFF;
              background-color: rgba(30, 156, 255, 0.1);
              box-shadow: 0 4px 12px rgba(30, 156, 255, 0.2);
              
              .config-info {
                .config-name {
                  color: #1A202C;
                  font-weight: 600;
                }
                
                .config-price {
                  color: #0DA8EF;
                }
              }
            }
          }
        }
      }
    }
    
    .order-form {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      
      h3 {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
        color: #1A202C;
      }
      
      .form-group {
        margin-bottom: 1rem;
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4A5568;
          font-weight: 500;
        }
        
        input,
        textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #A0AEC0;
          border-radius: 8px;
          font-size: 1rem;
          
          &:focus {
            outline: none;
            border-color: #1E9CFF;
            box-shadow: 0 0 0 2px rgba(30, 156, 255, 0.1);
          }
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }
      }
      
      .submit-button {
        width: 100%;
        padding: 1rem;
        background-color: #1E9CFF;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 1rem;
        
        &:hover {
          background-color: #0DA8EF;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .order-container {
    .order-content {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  }
}
</style>