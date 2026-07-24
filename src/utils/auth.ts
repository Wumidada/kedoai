import { Modal, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useStorage } from '@/hooks/useStorage'

/**
 * 通用退出登录函数
 * @param options 配置选项
 */
export const useLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const storage = useStorage()

  const logout = (showConfirm: boolean = true) => {
    const performLogout = () => {
      try {
        // 清除本地存储的token
        storage.clearAll()

        // 清除用户状态
        userStore.clearUserInfo()

        // 清除其他可能的本地存储
        sessionStorage.clear()
        
        // 显示成功提示
        message.success('退出登录成功')

        // 跳转到登录页
        router.replace('/login')
      } catch (error) {
        console.error('退出登录失败:', error)
        message.error('退出登录失败，请重试')
      }
    }

    if (showConfirm) {
      Modal.confirm({
        title: '确认退出',
        content: '确定要退出登录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: performLogout,
      })
    } else {
      performLogout()
    }
  }

  return {
    logout
  }
}

/**
 * 检查用户是否已登录
 */
export const checkAuthStatus = () => {
  const storage = useStorage()
  const userStore = useUserStore()
  
  const token = storage.getToken()
  const userId = userStore.getUserId
  
  return !!(token && userId)
}

/**
 * 强制退出登录（不显示确认框）
 * 用于token过期等情况
 * 这个函数不依赖Vue组合函数，可以在任何地方调用
 */
export const forceLogout = () => {
  try {
    // 清除localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    
    // 清除sessionStorage
    sessionStorage.clear()
    
    // 跳转到登录页
    window.location.href = '#/login'
  } catch (error) {
    console.error('强制退出登录失败:', error)
  }
} 