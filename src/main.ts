import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import './styles/coming-soon.scss'
import 'atropos/css'
import pinia from './store'
import i18n from './i18n'

// 按需引入 Ant Design Vue 组件
import { message, Modal, Dropdown, Avatar, Menu, Divider, ConfigProvider, Button, Spin, Popconfirm, Space, Table, Input, Form, Modal as AntModal, Layout } from 'ant-design-vue'
import {
  DesktopOutlined,
  UsbOutlined,
  ShoppingOutlined,
  SettingOutlined,
  CreditCardOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  LeftOutlined
} from '@ant-design/icons-vue'

const app = createApp(App)

// 注册按需引入的组件
app.config.globalProperties.$message = message
app.config.globalProperties.$modal = Modal

// 全局组件注册
app.component('a-dropdown', Dropdown)
app.component('a-avatar', Avatar)
app.component('a-menu', Menu)
app.component('a-menu-item', Menu.Item)
app.component('a-menu-divider', Menu.Divider)
app.component('a-divider', Divider)
app.component('a-button', Button)
app.component('a-spin', Spin)
app.component('a-popconfirm', Popconfirm)
app.component('a-space', Space)
app.component('a-table', Table)
app.component('a-input', Input)
app.component('a-textarea', Input.TextArea)
app.component('a-form', Form)
app.component('a-form-item', Form.Item)
app.component('a-modal', AntModal)
app.component('a-config-provider', ConfigProvider)
app.component('a-layout', Layout)
app.component('a-layout-content', Layout.Content)

// 注册图标组件
app.component('DesktopOutlined', DesktopOutlined)
app.component('UsbOutlined', UsbOutlined)
app.component('ShoppingOutlined', ShoppingOutlined)
app.component('SettingOutlined', SettingOutlined)
app.component('CreditCardOutlined', CreditCardOutlined)
app.component('CarOutlined', CarOutlined)
app.component('CustomerServiceOutlined', CustomerServiceOutlined)
app.component('GiftOutlined', GiftOutlined)
app.component('LeftOutlined', LeftOutlined)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')

// 性能监控
if (import.meta.env.PROD) {
  // 监控页面加载性能
  window.addEventListener('load', () => {
    const performanceData = {
      navigationStart: performance.timing.navigationStart,
      loadEventEnd: performance.timing.loadEventEnd,
      domContentLoadedEventEnd: performance.timing.domContentLoadedEventEnd,
      // 计算关键指标
      loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
      domContentLoadedTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      // 资源加载情况
      resources: performance.getEntriesByType('resource').map((resource) => ({
        name: resource.name,
        duration: resource.duration,
        transferSize: resource.transferSize,
        decodedBodySize: resource.decodedBodySize
      })),
      // 内存使用情况
      memory: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      } : null
    }
    
    // 发送性能数据到控制台（实际项目中可以发送到监控服务器）
    console.log('Performance Data:', performanceData)
    
    // 监控首屏渲染时间
    const firstPaint = performance.getEntriesByType('paint').find((entry) => entry.name === 'first-paint')
    const firstContentfulPaint = performance.getEntriesByType('paint').find((entry) => entry.name === 'first-contentful-paint')
    
    if (firstPaint && firstContentfulPaint) {
      console.log('First Paint:', firstPaint.startTime)
      console.log('First Contentful Paint:', firstContentfulPaint.startTime)
    }
  })
  
  // 监控动画帧率
  let frameCount = 0
  let lastTime = performance.now()
  
  const monitorFps = () => {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount
      console.log('FPS:', fps)
      
      // 如果帧率低于30，记录警告
      if (fps < 30) {
        console.warn('Low FPS detected:', fps)
      }
      
      frameCount = 0
      lastTime = currentTime
    }
    
    requestAnimationFrame(monitorFps)
  }
  
  // 启动帧率监控
  requestAnimationFrame(monitorFps)
  
  // 监控内存使用
  setInterval(() => {
    if (performance.memory) {
      const memory = performance.memory
      const memoryUsage = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      console.log('Memory Usage:', memoryUsage.toFixed(2) + '%')
      
      // 如果内存使用率超过80%，记录警告
      if (memoryUsage > 80) {
        console.warn('High memory usage detected:', memoryUsage.toFixed(2) + '%')
      }
    }
  }, 5000)
}
