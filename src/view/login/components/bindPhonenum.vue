<template>
  <LoginLayout>
    <div class="bind-form">
      <div class="title">{{ $t('auth.bindPhone') }}</div>
      
      <a-form 
        :model="formData"
        @finish="handleBindPhone" 
        autocomplete="off"
      >
        <a-form-item
          name="f_PhoneNum"
          :rules="[
            { required: true, message: $t('auth.phoneRequired') },
            { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: $t('auth.phoneInvalid') }
          ]"
        >
          <a-input 
            v-model:value="formData.f_PhoneNum" 
            :placeholder="$t('auth.phoneNumber')" 
            :style="inputStyle"
          />
        </a-form-item>

        <a-form-item
          name="f_VerificationCode"
          :rules="[{ required: true, message: $t('auth.verCodeRequired') }]"
        >
          <div style="position: relative">
            <a-input 
              v-model:value="formData.f_VerificationCode" 
              :placeholder="$t('auth.verificationCode')" 
              :style="{ ...inputStyle, paddingRight: '90px' }"
            />
            <a-button
              type="link"
              class="code-btn"
              @click="handleSendCode"
              :disabled="sendingCode || timeLeft > 0"
            >
              <a-spin v-if="sendingCode" />
              <span v-else-if="timeLeft > 0">{{ Math.floor(timeLeft / 1000) }}</span>
              <span v-else>{{ $t('auth.sendCode') }}</span>
            </a-button>
          </div>
        </a-form-item>

        <a-button
          type="primary"
          html-type="submit"
          block
          :loading="bindLoading"
          :disabled="bindLoading"
          class="bind-btn"
        >
          {{ $t('auth.confirm') }}
        </a-button>
      </a-form>

      <div class="bottom-links">
        <span>{{ $t('auth.hasAccount') }}</span>
        <a-button
          type="link"
          style="padding: 0"
          @click="goBack"
        >
          {{ $t('auth.backToLogin') }}
        </a-button>
      </div>
    </div>
  </LoginLayout>
</template>

<script lang="ts" setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { 
  modifyUserPhoneNum, 
  getVerificationCode,
  userLoginByWechat,
  awaitWrapper 
} from '@/api'
import { useUserStore } from '@/store'
import { useStorage } from '@/hooks/useStorage'
import { RouteHomeRedirectPath } from '@/router'
import LoginLayout from './Layout.vue'

const router = useRouter()
const userStore = useUserStore()
const storage = useStorage()
const { t } = useI18n()

// 表单数据
const formData = reactive({
  f_PhoneNum: '',
  f_VerificationCode: ''
})

// 状态
const bindLoading = ref(false)
const sendingCode = ref(false)
const timeLeft = ref(0)
let countdownTimer: number | null = null

// 发送验证码
const handleSendCode = async () => {
  if (sendingCode.value || timeLeft.value > 0) return
  
  const mobile = formData.f_PhoneNum
  if (!mobile?.trim()) {
    message.warning(t('auth.sendCodeFailed'))
    return
  }

  sendingCode.value = true
  const [err, res] = await awaitWrapper(getVerificationCode({ phoneNum: mobile }))
  sendingCode.value = false

  if (res) {
    message.success(t('auth.sendCodeSuccess'))
    startCountdown()
  }
}

// 开始倒计时
const startCountdown = () => {
  timeLeft.value = 60000 // 60秒
  countdownTimer = setInterval(() => {
    timeLeft.value -= 1000
    if (timeLeft.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

// 绑定手机号处理
const handleBindPhone = async () => {
  bindLoading.value = true
  
  try {
    const userId = userStore.id
    
    // 如果没有用户ID，说明是新用户，需要先完成微信登录流程
    if (!userId) {
      // 获取微信信息（应该从sessionStorage或其他地方获取）
      // 这里假设之前的微信扫码流程已经保存了微信用户信息
      const wechatUserInfo = sessionStorage.getItem('wechatUserInfo')
      if (!wechatUserInfo) {
        message.error(t('auth.wechatInfoMissing'))
        router.replace('/login/wechat')
        return
      }

      const userInfo = JSON.parse(wechatUserInfo)
      // 先进行微信登录，带上手机号
      const [wechatErr, wechatRes] = await awaitWrapper(userLoginByWechat({
        f_OpenId: userInfo.openid,
        f_UnionId: userInfo.unionid,
        f_UserName: userInfo.nickname,
        f_Sex: String(userInfo.sex),
        f_HeadImgurl: userInfo.headimgurl,
        f_Mobile: formData.f_PhoneNum,
        f_VerificationCode: formData.f_VerificationCode
      }))

      if (wechatRes && wechatRes.data) {
        // 保存登录信息
        storage.setToken(wechatRes.data.token || wechatRes.data.f_Token)
        storage.setRefreshToken(wechatRes.data.refreshtoken || wechatRes.data.f_RefreshToken)
        
        // 使用统一的方法更新用户信息到 store，包括 f_IsMember
        userStore.setUserLoginInfo(wechatRes.data)
        // 确保手机号被设置（因为是绑定流程）
        userStore.setMobile(formData.f_PhoneNum)

        message.success(t('auth.bindSuccess'))
        
        // 清除临时存储的微信信息
        sessionStorage.removeItem('wechatUserInfo')
        
        // 跳转到原来要去的页面或首页
        const needLoginFromPath = sessionStorage.getItem('needLoginFromPath')?.trim()
        sessionStorage.removeItem('needLoginFromPath')
        router.replace(needLoginFromPath || RouteHomeRedirectPath)
      } else {
        message.error(t('auth.bindFailed'))
      }
    } else {
      // 已有用户ID，直接修改手机号
      const [err, res] = await awaitWrapper(modifyUserPhoneNum({
        f_Id: String(userId),
        f_PhoneNum: formData.f_PhoneNum,
        f_VerificationCode: formData.f_VerificationCode
      }))

      if (res) {
        message.success(t('auth.bindSuccess'))
        
        // 更新用户store中的手机号
        userStore.setMobile(formData.f_PhoneNum)
        
        // 跳转到原来要去的页面或首页
        const needLoginFromPath = sessionStorage.getItem('needLoginFromPath')?.trim()
        sessionStorage.removeItem('needLoginFromPath')
        router.replace(needLoginFromPath || RouteHomeRedirectPath)
      }
    }
  } catch (error) {
    console.error('绑定手机号失败:', error)
  } finally {
    bindLoading.value = false
  }
}

// 导航方法
const goBack = () => {
  // 清除token，然后跳转到登录页
  storage.clearAll()
  userStore.clearUserInfo()
  sessionStorage.removeItem('wechatUserInfo')
  router.replace('/login')
}

// 组件卸载时清理
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

// 样式对象
const inputStyle = {
  width: '340px',
  height: '52px',
  borderRadius: '14px',
  fontSize: '16px',
  fontWeight: '500',
  padding: '15px 20px',
  boxSizing: 'border-box' as const
}
</script>

<style lang="scss" scoped>
.bind-form {
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

.code-btn {
  position: absolute;
  right: 0;
  height: 100%;
  font-size: 16px;
  border: none;
  background: transparent;
  color: #666666;
  padding: 0 15px;
  z-index: 1;
}

.bottom-links {
  font-size: 14px;
  color: #999999;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.bind-btn {
  margin-top: 38px;
  height: 52px;
  border-radius: 14px;
  font-size: 20px;
  width: 340px;
  
  &:disabled {
    color: #000;
  }
}
</style> 