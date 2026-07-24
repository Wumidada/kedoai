<!--  -->
<template>
  <LoginLayout>
    <div class="login-form">
      <div class="title">{{ $t('auth.welcome') }}</div>

      <div class="tab-row">
        <div 
          class="tab-item"
          :class="{ active: loginType === 'password' }"
          @click="setLoginType('password')"
        >
          {{ $t('auth.passwordLogin') }}
        </div>
        <div 
          class="tab-item"
          :class="{ active: loginType === 'ver_code' }"
          @click="setLoginType('ver_code')"
        >
          {{ $t('auth.verCodeLogin') }}
        </div>
      </div>

      <a-form
        :model="formData"
        @finish="handleLogin"
        autocomplete="off"
      >
        <a-form-item
          name="f_Account"
          :rules="[
            { required: true, message: $t('auth.phoneRequired') },
            { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: $t('auth.phoneInvalid') }
          ]"
        >
          <a-input 
            v-model:value="formData.f_Account"
            :placeholder="$t('auth.phoneNumber')" 
            :style="inputStyle" 
          />
        </a-form-item>

        <!-- 密码登录模式 -->
        <template v-if="loginType === 'password'">
          <a-form-item
            name="f_Password"
            :rules="[{ required: true, message: $t('auth.passwordRequired') }]"
          >
            <div style="position: relative">
              <a-input-password
                v-model:value="formData.f_Password"
                :placeholder="$t('auth.password')"
                :style="{ ...inputStyle, paddingRight: '120px' }"
              />
              <a-button
                type="link"
                class="forget-btn"
                @click="goToForgetPassword"
                :title="$t('auth.forgetPassword')"
              >
                {{ $t('auth.forgetPassword') }}
              </a-button>
            </div>
          </a-form-item>
        </template>

        <!-- 验证码登录模式 -->
        <template v-if="loginType === 'ver_code'">
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
        </template>

        <div class="bottom-links">
          <div>{{ $t('auth.noAccount') }}</div>
          <a-button
            type="link"
            style="padding: 0"
            @click="goToSignUp"
          >
            {{ $t('auth.freeRegister') }}
          </a-button>
        </div>

        <a-button
          type="primary"
          html-type="submit"
          block
          :loading="loginLoading"
          :disabled="loginLoading"
          class="login-btn"
        >
          {{ $t('common.login') }}{{ loginLoading ? $t('common.loading') : '' }}
        </a-button>
      </a-form>

      <a-divider class="divider">{{ $t('auth.thirdPartyLogin') }}</a-divider>

      <a-button
        block
        class="wechat-btn"
        @click="goToWechatLogin"
      >
        <div class="wechat-content">
          <img src="@/assets/images/icon_wechat.svg" :alt="$t('auth.wechatLogin')" style="width: 26px; height: 26px;" />
          <span style="margin-left: 14px">{{ $t('auth.wechatLogin') }}</span>
        </div>
      </a-button>
    </div>
  </LoginLayout>
</template>

<script lang="ts" setup>
import { ref, reactive, onUnmounted, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { 
  userLoginByAccount, 
  userLoginByMobile, 
  getVerificationCode,
  awaitWrapper 
} from '@/api'
import { useUserStore } from '@/store'
import { useStorage } from '@/hooks/useStorage'
import { RouteHomeRedirectPath } from '@/router'
import LoginLayout from './components/Layout.vue'

const router = useRouter()
const route = useRoute()
const storage = useStorage()
const userStore = useUserStore()

// 表单相关
const formData = reactive({
  f_Account: '',
  f_Password: '',
  f_VerificationCode: ''
})

// 登录类型
const loginType = ref<'password' | 'ver_code'>('password')

// 根据路由设置初始登录类型
onMounted(() => {
  const path = route.path
  if (path === '/login/ver_code') {
    loginType.value = 'ver_code'
  } else {
    loginType.value = 'password'
  }
})

// 加载状态
const loginLoading = ref(false)
const sendingCode = ref(false)

// 倒计时
const timeLeft = ref(0)
let countdownTimer: number | null = null

// 设置登录类型
const setLoginType = (type: 'password' | 'ver_code') => {
  loginType.value = type
  // 清空表单
  formData.f_Password = ''
  formData.f_VerificationCode = ''
  
  // 更新路由
  if (type === 'password') {
    router.replace('/login/password')
  } else {
    router.replace('/login/ver_code')
  }
}

// 发送验证码
const handleSendCode = async () => {
  if (sendingCode.value || timeLeft.value > 0) return
  
  const mobile = formData.f_Account
  if (!mobile?.trim()) {
    message.warning('获取手机号失败')
    return
  }

  // 验证手机号格式
  const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (!phoneRegex.test(mobile)) {
    message.error('手机号格式不正确')
    return
  }

  sendingCode.value = true
  const [err, res] = await awaitWrapper(getVerificationCode({ phoneNum: mobile }))
  sendingCode.value = false

  if (res) {
    message.success('验证码发送成功')
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

// 登录处理
const handleLogin = async () => {
  loginLoading.value = true
  
  try {
    let apiCall
    let params
    
    if (loginType.value === 'password') {
      apiCall = userLoginByAccount
      params = {
        f_Account: formData.f_Account,
        f_Password: formData.f_Password
      }
    } else {
      apiCall = userLoginByMobile
      params = {
        f_Mobile: formData.f_Account,
        f_VerificationCode: formData.f_VerificationCode
      }
    }

    const [err, res] = await awaitWrapper(apiCall(params))
    
    if (res && res.data) {
      // 1. 先保存用户信息到 localStorage（同步操作）
      storage.setToken(res.data.token || res.data.f_Token)
      storage.setRefreshToken(res.data.refreshtoken || res.data.f_RefreshToken)
      
      // 2. 使用统一的方法更新用户信息到 store，包括 f_IsMember
      userStore.setUserLoginInfo(res.data)

      // 3. 显示成功提示
      message.success('登录成功')
      
    
      // 5. 检查是否需要绑定手机号
      if (!res.data.f_Mobile?.trim()) {
        await router.replace('/login/bind_phonenum')
      } else {
        // 检查是否有重定向路径
        const needLoginFromPath = sessionStorage.getItem('needLoginFromPath')?.trim()
        sessionStorage.removeItem('needLoginFromPath')
        
        // 6. 立即跳转路由
        await router.replace(needLoginFromPath || RouteHomeRedirectPath)
      }
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loginLoading.value = false
  }
}

// 导航方法
const goToForgetPassword = () => {
  router.push('/login/forget_password')
}

const goToSignUp = () => {
  router.push('/login/sign_up')
}

const goToWechatLogin = () => {
  router.push('/login/wechat')
}

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

// 组件销毁时清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
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

.tab-row {
  display: flex;
  font-size: 20px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 20px;

  .tab-item {
    cursor: pointer;
    
    &.active {
      color: #000000;
    }
    
    &:nth-child(2) {
      margin-left: 22px;
    }
  }
}

.forget-btn {
  position: absolute;
  right: 0;
  height: 100%;
  font-size: 14px;
  color: #666666;
  z-index: 1;
  padding: 0 8px;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.code-btn {
  position: absolute;
  right: 0;
  height: 100%;
  font-size: 14px;
  padding: 0 8px;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.bottom-links {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999999;
  margin-top: -10px;
}

.login-btn {
  margin-top: 38px;
  height: 52px;
  border-radius: 14px;
  font-size: 20px;
  
  &:not(.ant-btn-loading) {
    color: #ffffff;
  }
  
  &.ant-btn-loading {
    color: #000;
  }
}

.divider {
  font-size: 12px;
  color: #808080;
  margin: 38px 0 0;
}

.wechat-btn {
  font-size: 16px;
  color: #808080;
  width: 340px;
  height: 52px;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 14px;
  margin: 18px 0 41px;

  .wechat-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
