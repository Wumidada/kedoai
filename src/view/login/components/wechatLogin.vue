<!--  -->
<template>
  <LoginLayout>
    <div class="wechat-login-form">
      <div class="title">{{ $t('auth.welcome') }}</div>
      <p class="wechat-subtitle">{{ $t('auth.wechatLogin') }}</p>

      <div class="qr-container">
        <!-- 二维码显示区域 -->
        <div v-if="ticket && !qrCodeLoading" class="qr-content">
          <img 
            :src="`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`"
            width="220"
            height="220"
            :alt="$t('auth.wechatQrCode')"
          />
          <div class="qr-tip">
            <div>{{ $t('auth.wechatScanTip') }}</div>
            <div style="text-align: center">"{{ $t('auth.companyBrand') }}"</div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="qrCodeLoading || (!ticket && !qrCodeIsError)" class="loading-overlay">
          <div v-if="qrCodeIsError" class="error-message">
            <span style="color: white">{{ $t('auth.qrCodeFailed') }}</span>
          </div>
          <div v-else class="loading-content">
            <a-spin size="large" />
            <div class="loading-text">{{ $t('auth.qrCodeLoading') }}</div>
          </div>
        </div>

        <!-- 错误状态 -->
        <div v-if="qrCodeIsError && !qrCodeLoading" class="error-overlay">
          <div class="error-message">
            <span style="color: white">{{ $t('auth.qrCodeFailed') }}</span>
            <a-button type="primary" size="small" @click="retryGetQRCode" style="margin-top: 10px;">
              {{ $t('auth.retryQrCode') }}
            </a-button>
          </div>
        </div>

        <!-- 登录状态覆盖层 -->
        <div v-if="loging" class="login-overlay">
          <a-spin size="large" />
          <div class="loading-text">{{ $t('auth.wechatLogging') }}</div>
        </div>
      </div>

      <div class="agreement-text">
        <span>{{ $t('auth.agreePrefix') }}</span>
        <a @click="goToUseAgreement">{{ $t('auth.useAgreement') }}</a>
        <span>{{ $t('auth.agreeSuffix') }}及《</span>
        <a @click="goToPrivacyPolicy">{{ $t('auth.privacyPolicy') }}</a>
        <span>{{ $t('auth.agreeSuffix') }}</span>
      </div>
    </div>
  </LoginLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { 
  getWeChatQRCodeInfo,
  getWeChatUserInfoByTick,
  userLoginByWechat,
  awaitWrapper 
} from '@/api'
import { useUserStore } from '@/store'
import { useStorage } from '@/hooks/useStorage'
import { RouteHomeRedirectPath } from '@/router'
import LoginLayout from './Layout.vue'

const router = useRouter()
const storage = useStorage()
const userStore = useUserStore()
const { t } = useI18n()

// 状态
const ticket = ref('')
const sceneId = ref('')
const qrCodeIsError = ref(false)
const loging = ref(false)
const qrCodeLoading = ref(true)
let isScanOver = false
let pollTimer: number | null = null

// 获取二维码信息
const getQRCodeInfo = async () => {
  qrCodeLoading.value = true
  const [err, res] = await awaitWrapper(getWeChatQRCodeInfo())
  
  console.log('getQRCodeInfo - 完整响应:', res)
  console.log('getQRCodeInfo - err:', err)
  
  if (res) {
    try {
      // 尝试多种可能的数据结构
      const responseData = res.data || res
      console.log('getQRCodeInfo - responseData:', responseData)
      
      const { scene_id, qr_info } = responseData
      console.log('getQRCodeInfo - scene_id:', scene_id)
      console.log('getQRCodeInfo - qr_info:', qr_info)
      
      const qrData = JSON.parse(qr_info)
      
      if (!qrData.ticket || !scene_id) {
        qrCodeIsError.value = true
        qrCodeLoading.value = false
        message.error(qrData.errmsg || t('auth.qrCodeFailed'))
        return
      }
      
      ticket.value = qrData.ticket
      sceneId.value = scene_id
      qrCodeLoading.value = false
    } catch (error) {
      qrCodeIsError.value = true
      qrCodeLoading.value = false
      message.error(t('auth.qrCodeParseFailed'))
    }
  } else {
    qrCodeIsError.value = true
    qrCodeLoading.value = false
    message.error('微信登录服务暂时不可用，请稍后重试')
  }
}

// 微信登录
const wechatLogin = async (userInfo: {
  openid: string
  unionid: string
  nickname: string
  sex: number
  headimgurl: string
}) => {
  const [err, res] = await awaitWrapper(userLoginByWechat({
    f_OpenId: userInfo.openid,
    f_UnionId: userInfo.unionid,
    f_UserName: userInfo.nickname,
    f_Sex: String(userInfo.sex),
    f_HeadImgurl: userInfo.headimgurl
  }))

  if (res && res.data) {
    // 保存用户信息
    storage.setToken(res.data.token || res.data.f_Token)
    storage.setRefreshToken(res.data.refreshtoken || res.data.f_RefreshToken)
    
    // 使用统一的方法更新用户信息到 store，包括 f_IsMember
    userStore.setUserLoginInfo(res.data)

    // 检查是否需要绑定手机号
    if (!res.data.f_Mobile?.trim()) {
      console.log(res.data);
     await router.replace('/login/bind_phonenum')
    } else {
      const needLoginFromPath = sessionStorage.getItem('needLoginFromPath')?.trim()
      sessionStorage.removeItem('needLoginFromPath')
      await router.replace(needLoginFromPath || RouteHomeRedirectPath)
    }
  } else {
    // API调用失败，可能是新用户需要绑定手机号
    // 先保存微信用户信息到store和sessionStorage，供绑定页面使用
    userStore.setName(userInfo.nickname)
    userStore.setAvatar(userInfo.headimgurl)
    
    // 保存完整的微信用户信息到sessionStorage
    sessionStorage.setItem('wechatUserInfo', JSON.stringify(userInfo))
    
    // 跳转到绑定手机号页面
    await router.replace('/login/bind_phonenum')
  }
  
  loging.value = false
}

// 轮询检查扫码状态
const checkScanStatus = async () => {
  if (!sceneId.value || isScanOver) return

  const [err, res] = await awaitWrapper(getWeChatUserInfoByTick({ 
    scene_Id: sceneId.value 
  }))

  if (res && res.data && res.data !== "0") {
    if (isScanOver) return
    
    isScanOver = true
    loging.value = true
    
    try {
      const userInfo = JSON.parse(res.data)
      await wechatLogin(userInfo)
    } catch (error) {
      loging.value = false
      message.error(t('auth.loginInfoParseFailed'))
    }
  }
}

// 开始轮询
const startPolling = () => {
  pollTimer = setInterval(checkScanStatus, 1000)
}

// 导航方法
const goToUseAgreement = (e: Event) => {
  e.stopPropagation()
  e.preventDefault()
  router.push('/doc/use_agreement')
}

const goToPrivacyPolicy = (e: Event) => {
  e.stopPropagation()
  e.preventDefault()
  router.push('/doc/privacy_policy')
}

// 重试获取二维码
const retryGetQRCode = async () => {
  qrCodeIsError.value = false
  isScanOver = false
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  await getQRCodeInfo()
  if (ticket.value && sceneId.value) {
    startPolling()
  }
}

// 组件挂载时初始化
onMounted(async () => {
  await getQRCodeInfo()
  if (ticket.value && sceneId.value) {
    startPolling()
  }
})

// 组件卸载时清理
onUnmounted(() => {
  isScanOver = false
  if (pollTimer) {
    clearInterval(pollTimer)
  }
})
</script>

<style lang="scss" scoped>
.wechat-login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 40px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.wechat-subtitle {
  font-size: 16px;
  color: #999999;
  margin: 0 0 28px;
}

.qr-container {
  width: 340px;
  height: 360px;
  background: #ffffff;
  border: 1px solid #ededed;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .qr-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .qr-tip {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-top: 20px;
    }
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .error-message {
      color: white;
      text-align: center;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      :deep(.ant-spin-dot-item) {
        background-color: white !important;
      }
    }

    .loading-text {
      color: white;
      font-size: 14px;
      margin-top: 15px;
    }
  }

  .error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .error-message {
      color: white;
      text-align: center;
    }
  }

  .login-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    :deep(.ant-spin-dot-item) {
      background-color: white !important;
    }

    .loading-text {
      color: white;
      font-size: 14px;
      margin-top: 15px;
    }
  }
}

.agreement-text {
  font-size: 14px;
  color: #999999;
  margin: 20px 0 70px;

  a {
    color: #1890ff;
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.custom-loading-icon {
  animation: spin 1s linear infinite;
}
</style> 