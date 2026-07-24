<template>
  <div class="external-page">
    <!-- 加载状态 -->
    <div v-if="isLoading && !hasError" class="loading-container">
      <div class="loading-content">
        <img :src="logoImage" alt="Kedo" class="loading-logo" />
        <p class="loading-text">{{ $t('external.loading') }}</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-if="hasError" class="error-container">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">{{ $t('external.loadFailed') }}</h3>
        <p class="error-desc">
          {{ $t('external.loadFailedDesc') }}<br/>
          {{ $t('external.networkIssue') }}<br/>
          {{ $t('external.serverUnavailable') }}<br/>
          {{ $t('external.securityPolicy') }}
        </p>
        <div class="error-actions">
          <a-button type="primary" @click="handleRetry">{{ $t('external.reload') }}</a-button>
          <a-button @click="handleDirectOpen">{{ $t('external.openInNewWindow') }}</a-button>
        </div>
      </div>
    </div>

    <!-- iframe -->
    <iframe
      v-if="iframeSrc && !hasError"
      :src="iframeSrc"
      :style="{ display: isLoading ? 'none' : 'block' }"
      class="iframe-content"
      :allow="allowPermissions"
      referrerpolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads allow-pointer-lock"
      @load="handleIframeLoad"
      @error="handleIframeError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@/hooks/useStorage'
import { useUserStore } from '@/store/user'
import logoImage from '@/assets/logo/logo_o.svg'

const { t } = useI18n()
const userStore = useUserStore()

// Props
interface Props {
  url: string
  name: string
  controlToken?: boolean // 是否加token，默认true
  controlRefreshToken?: boolean // 是否加refreshToken，默认true
  extraParams?: Record<string, string> // 其它自定义参数
}

const props = withDefaults(defineProps<Props>(), {
  controlToken: true,
  controlRefreshToken: true
})

const storage = useStorage()

// 状态
const isLoading = ref(true)
const hasError = ref(false)

// iframe权限配置
const allowPermissions = 'camera; microphone; clipboard-read; clipboard-write; fullscreen;'

// 计算iframe源地址
const iframeSrc = computed(() => {
  const baseUrl = props.url
  
  if (!baseUrl) {
    return ''
  }

  // 构建URL参数
  const url = new URL(baseUrl)
  
  // 添加token参数
  if (props.controlToken !== false) {
    const token = storage.getToken()
    if (!token) {
      console.warn('缺少认证token')
    } else {
      url.searchParams.set('token', token)
    }
  }
  
  // 添加refreshToken参数
  if (props.controlRefreshToken !== false) {
    const refreshToken = storage.getRefreshToken()
    if (!refreshToken) {
      console.warn('缺少认证refreshToken')
    } else {
      url.searchParams.set('refreshToken', refreshToken)
    }
  }
  
  // 添加userId参数
  if (userStore.id) {
    url.searchParams.set('userId', userStore.id.toString())
  }
  
  // 添加自定义参数
  if (props.extraParams) {
    Object.entries(props.extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value)
      }
    })
  }
  console.log('iframeSrc', url.toString())
  
  return url.toString()
})

// 设置页面标题
document.title = props.name + ' - KedoAI'

// 处理iframe加载完成
const handleIframeLoad = () => {
  isLoading.value = false
}

// 处理iframe加载错误
const handleIframeError = (event: Event) => {
  console.error('Iframe加载错误:', event)
  isLoading.value = false
  hasError.value = true
}

// 重新加载
const handleRetry = () => {
  hasError.value = false
  isLoading.value = true
  // 强制重新加载iframe
  window.location.reload()
}

// 在新窗口打开
const handleDirectOpen = () => {
  if (iframeSrc.value) {
    window.open(iframeSrc.value, '_blank')
  }
}

// 监听来自iframe的消息
const handleMessage = (event: MessageEvent) => {
  console.log('Received message from iframe:', event.data)
  
  // 如果iframe发送了新的token，更新本地存储
  const { accessToken, refreshToken } = event.data
  if (accessToken) {
    storage.setToken(accessToken)
  }
  if (refreshToken) {
    storage.setRefreshToken(refreshToken)
  }
}

onMounted(() => {
  // 添加消息监听器
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<style scoped lang="scss">
.external-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #fff;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 10;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-logo {
  width: 320px;
  height: 80px;
  margin-bottom: 16px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin: 0;
}

.error-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  z-index: 10;
}

.error-content {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.error-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}

.error-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
  text-align: left;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
}
</style> 