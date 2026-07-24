<template>
  <LoginLayout>
    <div class="login-form">
      <div class="title">绑定手机号</div>
      
      <a-form :model="formData" @finish="handleBind">
        <a-form-item
          name="f_Mobile"
          :rules="[
            { required: true, message: '请输入手机号!' },
            { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]"
        >
          <a-input v-model:value="formData.f_Mobile" placeholder="手机号" :style="inputStyle" />
        </a-form-item>

        <a-form-item
          name="f_VerificationCode"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <div style="position: relative">
            <a-input
              v-model:value="formData.f_VerificationCode"
              placeholder="验证码"
              :style="{ ...inputStyle, paddingRight: '90px' }"
            />
            <a-button
              type="link"
              class="code-btn"
              @click="handleSendCode"
              :disabled="sendingCode || timeLeft > 0"
            >
              <a-spin v-if="sendingCode" />
              <span v-else-if="timeLeft > 0">{{ Math.floor(timeLeft / 1000) }}秒</span>
              <span v-else>发送验证码</span>
            </a-button>
          </div>
        </a-form-item>

        <a-button type="primary" html-type="submit" block :loading="loading" :disabled="loading" class="login-btn">
          确认绑定
        </a-button>
      </a-form>
    </div>
  </LoginLayout>
</template>

<script lang="ts" setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { getVerificationCode, userLoginByWechat } from '../api/auth'
import { useUserStore } from '../store/user'
import { useStorage } from '../hooks/useStorage'
import LoginLayout from '../components/LoginLayout.vue'

const router = useRouter()
const userStore = useUserStore()
const storage = useStorage()

const formData = reactive({ f_Mobile: '', f_VerificationCode: '' })
const loading = ref(false)
const sendingCode = ref(false)
const timeLeft = ref(0)
let countdownTimer: number | null = null

const handleSendCode = async () => {
  if (sendingCode.value || timeLeft.value > 0) return
  
  const mobile = formData.f_Mobile
  if (!mobile?.trim() || !/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(mobile)) {
    message.error('请输入正确的手机号')
    return
  }

  sendingCode.value = true
  try {
    const res = await getVerificationCode({ phoneNum: mobile })
    if (res) {
      message.success('验证码发送成功')
      startCountdown()
    }
  } catch (error) {
    message.error('发送验证码失败')
  } finally {
    sendingCode.value = false
  }
}

const startCountdown = () => {
  timeLeft.value = 60000
  countdownTimer = setInterval(() => {
    timeLeft.value -= 1000
    if (timeLeft.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

const handleBind = async () => {
  loading.value = true
  
  try {
    const wechatInfoStr = sessionStorage.getItem('wechatUserInfo')
    if (!wechatInfoStr) {
      message.error('微信信息缺失，请重新扫码')
      await router.push('/login/wechat')
      return
    }
    
    const wechatInfo = JSON.parse(wechatInfoStr)
    
    const res = await userLoginByWechat({
      f_OpenId: wechatInfo.openid,
      f_UnionId: wechatInfo.unionid,
      f_UserName: wechatInfo.nickname,
      f_Sex: String(wechatInfo.sex),
      f_HeadImgurl: wechatInfo.headimgurl,
      f_Mobile: formData.f_Mobile,
      f_VerificationCode: formData.f_VerificationCode
    })

    if (res && res.data) {
      storage.setToken(res.data.token || res.data.f_Token)
      storage.setRefreshToken(res.data.refreshtoken || res.data.f_RefreshToken)
      userStore.setUserLoginInfo(res.data)
      sessionStorage.removeItem('wechatUserInfo')
      message.success('绑定成功')
      await router.replace('/')
    }
  } catch (error) {
    message.error('绑定失败，请重试')
  } finally {
    loading.value = false
  }
}

const inputStyle = {
  width: '340px', height: '52px', borderRadius: '14px', fontSize: '16px',
  fontWeight: '500', padding: '15px 20px', boxSizing: 'border-box' as const
}

onUnmounted(() => { if (countdownTimer) clearInterval(countdownTimer) })
</script>

<style lang="scss" scoped>
.login-form { width: 100%; display: flex; flex-direction: column; align-items: center; }
.title { font-size: 40px; font-weight: 600; color: #333333; margin-bottom: 40px; }
.code-btn { position: absolute; right: 0; height: 100%; font-size: 14px; padding: 0 8px; margin-right: 8px; }
.login-btn { margin-top: 38px; height: 52px; border-radius: 14px; font-size: 20px; }
</style>