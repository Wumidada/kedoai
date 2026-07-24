<template>
  <LoginLayout>
    <div class="login-form">
      <div class="title">微信登录</div>
      
      <div class="qr-container">
        <div v-if="qrCodeLoading" class="loading-overlay">
          <a-spin size="large" />
          <div class="loading-text">正在获取二维码...</div>
        </div>
        
        <div v-if="qrCodeUrl" class="qr-code">
          <img :src="qrCodeUrl" alt="微信登录二维码" />
        </div>
        
        <div v-if="qrCodeIsError && !qrCodeLoading" class="error-overlay">
          <div class="error-message">
            <span>获取二维码失败</span>
            <a-button type="primary" size="small" @click="retryGetQRCode">
              重新获取
            </a-button>
          </div>
        </div>

        <div v-if="loging" class="login-overlay">
          <a-spin size="large" />
          <div class="loading-text">正在登录中...</div>
        </div>
      </div>

      <div class="scan-tip">使用微信扫一扫登录</div>
    </div>
  </LoginLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { getWeChatQRCodeInfo, getWeChatUserInfoByTick, userLoginByWechat } from '../api/auth'
import { useUserStore } from '../store/user'
import { useStorage } from '../hooks/useStorage'
import LoginLayout from '../components/LoginLayout.vue'

const router = useRouter()
const userStore = useUserStore()
const storage = useStorage()

const qrCodeUrl = ref('')
const qrCodeLoading = ref(true)
const qrCodeIsError = ref(false)
const loging = ref(false)
const sceneId = ref('')
const isScanOver = ref(false)
let pollTimer: number | null = null

const getQRCode = async () => {
  qrCodeLoading.value = true
  qrCodeIsError.value = false
  
  try {
    const res = await getWeChatQRCodeInfo()
    if (res && res.data) {
      qrCodeUrl.value = res.data.qrCodeUrl || res.data.f_QRCodeUrl
      sceneId.value = res.data.sceneId || res.data.f_SceneId
      startPolling()
    } else {
      qrCodeIsError.value = true
    }
  } catch (error) {
    qrCodeIsError.value = true
    message.error('微信登录服务暂时不可用')
  } finally {
    qrCodeLoading.value = false
  }
}

const retryGetQRCode = () => {
  isScanOver.value = false
  getQRCode()
}

const checkScanStatus = async () => {
  if (!sceneId.value || isScanOver.value) return

  try {
    const res = await getWeChatUserInfoByTick({ scene_Id: sceneId.value })
    
    if (res && res.data && res.data !== "0") {
      if (isScanOver.value) return
      
      isScanOver.value = true
      loging.value = true
      
      const userInfo = JSON.parse(res.data)
      await wechatLogin(userInfo)
    }
  } catch (error) {
    console.error('检查扫码状态失败:', error)
  }
}

const wechatLogin = async (userInfo: {
  openid: string
  unionid: string
  nickname: string
  sex: number
  headimgurl: string
}) => {
  try {
    const res = await userLoginByWechat({
      f_OpenId: userInfo.openid,
      f_UnionId: userInfo.unionid,
      f_UserName: userInfo.nickname,
      f_Sex: String(userInfo.sex),
      f_HeadImgurl: userInfo.headimgurl
    })

    if (res && res.data) {
      storage.setToken(res.data.token || res.data.f_Token)
      storage.setRefreshToken(res.data.refreshtoken || res.data.f_RefreshToken)
      userStore.setUserLoginInfo(res.data)

      if (!res.data.f_Mobile?.trim()) {
        await router.replace('/login/bind_phonenum')
      } else {
        await router.replace('/')
      }
    }
  } catch (error) {
    userStore.setName(userInfo.nickname)
    userStore.setAvatar(userInfo.headimgurl)
    sessionStorage.setItem('wechatUserInfo', JSON.stringify(userInfo))
    await router.replace('/login/bind_phonenum')
  } finally {
    loging.value = false
  }
}

const startPolling = () => {
  pollTimer = setInterval(checkScanStatus, 1000)
}

onMounted(() => {
  getQRCode()
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 40px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 40px;
}

.qr-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;

  .qr-code {
    width: 100%;
    height: 100%;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 180px;
      height: 180px;
    }
  }

  .loading-overlay, .login-overlay, .error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .error-overlay {
    background: rgba(255, 230, 230, 0.9);
  }

  .loading-text {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }

  .error-message {
    text-align: center;
    color: #ff4d4f;
  }
}

.scan-tip {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}
</style>