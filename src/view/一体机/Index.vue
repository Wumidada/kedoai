<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 一体机产品数据
const product = ref({
  id: 1,
  name: 'KedoClaw 智能盒子',
  description: '内置KedoClaw（小龙虾）AI系统的便携式智能设备',
  features: [
    '小巧便携，易于部署',
    '内置KedoClaw AI系统',
    '多网络接口支持',
    '高性能计算能力',
    '低功耗设计'
  ],
  price: 50,
  image: '../../assets/images/kedoclaw一体机白.jpg'
})

// 订购功能
const orderProduct = () => {
  // 跳转到订购页面
  router.push(`/order/${product.value.id}`)
}
</script>

<template>
  <div class="一体机-container">
    <div class="hero-section">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
    </div>
    
    <div class="product-section">
      <div class="product-details">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-features">
            <h3>核心功能</h3>
            <ul>
              <li v-for="(feature, index) in product.features" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="product-price">
            ¥{{ product.price }}
          </div>
          <button class="order-button" @click="orderProduct()">
            立即订购
          </button>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <h2>核心功能</h2>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>小巧便携</h3>
          <p>紧凑设计，易于携带和部署，适合各种场景使用</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>KedoClaw AI系统</h3>
          <p>内置最新的小龙虾AI系统，提供强大的智能分析能力</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>多网络接口</h3>
          <p>丰富的网络接口，支持多种连接方式，满足不同网络环境需求</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>高性能计算</h3>
          <p>强大的计算能力，支持复杂的AI模型运行和数据分析</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.一体机-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 1rem 0;
  
  .hero-section {
    text-align: center;
    padding: 2rem 1.5rem;
    background: linear-gradient(135deg, #1E9CFF 0%, #0DA8EF 100%);
    color: white;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }
    
    p {
      font-size: 1rem;
      opacity: 0.9;
    }
  }
  
  .product-section {
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
    
    .product-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        max-width: 900px;
        margin: 0 auto;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
        .product-image {
          height: 100%;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          &:hover img {
            transform: scale(1.05);
          }
        }
        
        .product-info {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          
          h2 {
            font-size: 1.5rem;
            margin-bottom: 0.8rem;
            color: #1A202C;
          }
          
          .product-description {
            color: #4A5568;
            margin-bottom: 1.2rem;
            line-height: 1.5;
            font-size: 0.9rem;
          }
          
          .product-features {
            margin-bottom: 1.2rem;
            
            h3 {
              font-size: 1.1rem;
              margin-bottom: 0.6rem;
              color: #1A202C;
            }
            
            ul {
              list-style: none;
              padding: 0;
              
              li {
                padding: 0.3rem 0;
                color: #4A5568;
                position: relative;
                padding-left: 1.2rem;
                font-size: 0.85rem;
                
                &:before {
                  content: '✓';
                  position: absolute;
                  left: 0;
                  color: #1E9CFF;
                  font-weight: bold;
                }
              }
            }
          }
          
          .product-price {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1E9CFF;
            margin-bottom: 1.2rem;
          }
          
          .order-button {
            width: 100%;
            padding: 0.8rem;
            background-color: #1E9CFF;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
            
            &:hover {
              background-color: #0DA8EF;
            }
          }
        }
      }
  }
  
  .features-section {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
    
    h2 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 1.2rem;
      color: #1A202C;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.2rem;
      max-width: 900px;
      margin: 0 auto;
      
      .feature-item {
        text-align: center;
        padding: 1.2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
        .feature-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 0.6rem;
          background: rgba(30, 156, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E9CFF;
        }
        
        h3 {
          font-size: 1rem;
          margin-bottom: 0.4rem;
          color: #1A202C;
        }
        
        p {
          color: #4A5568;
          line-height: 1.5;
          font-size: 0.85rem;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .一体机-container {
    .hero-section {
      padding: 2rem 1rem;
      
      h1 {
        font-size: 1.6rem;
      }
      
      p {
        font-size: 0.9rem;
      }
    }
    
    .product-section,
    .features-section {
      padding: 0 1rem;
    }
    
    .product-details {
      grid-template-columns: 1fr !important;
      
      .product-image {
        height: 200px;
      }
      
      .product-info {
        padding: 1.2rem;
        
        h2 {
          font-size: 1.4rem;
        }
        
        .product-price {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>