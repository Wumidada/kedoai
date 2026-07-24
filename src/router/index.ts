import { createRouter, createWebHashHistory } from 'vue-router'
import { LoginRoutesConfig } from './login'
import { BoardRoutesConfig } from './board'
import { FlowCenterRoutesConfig } from './flowcenter'
import { useStorage } from "@/hooks/useStorage"
import { getRouteTitle } from '@/i18n'
import { useUserStore } from '@/store/user'
import { message } from 'ant-design-vue'


export const RouteHomeRedirectPath = '/'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/view/home/Index.vue'),
    meta: { title: '首页', requiresAuth: false }
  },
  {
    path: '/home',
    redirect: '/'
  },
  // 登录相关路由
  ...LoginRoutesConfig,
  // 控制台相关路由
  ...BoardRoutesConfig,
  // FlowCenter 相关路由
  ...FlowCenterRoutesConfig,
  // 三方登录相关路由
  {
    path: '/thirdLogin',
    name: 'thirdLogin',
    component: () => import('@/view/thirdLogin/Index.vue'),
    meta: { titleKey: 'route.thirdLogin', requiresAuth: false }
  },
  // 支付相关路由
  {
    path: '/pay/:name/:proId',
    name: 'pay',
    component: () => import('@/view/pay/Index.vue'),
    meta: { titleKey: 'route.paymentCenter', requiresAuth: true }
  },
  {
    path: '/pay/order/:orderId',
    name: 'payOrder',
    component: () => import('@/view/pay/Index.vue'),
    meta: { titleKey: 'route.paymentCenter', requiresAuth: true }
  },
  // KedoChat 独立页面
  {
    path: '/kedochat',
    name: 'kedochat',
    component: () => import('@/view/kedochat/index.vue'),
    meta: { titleKey: 'nav.kedoChat', requiresAuth: false }
  },
  // Kedo知识库 独立页面
  {
    path: '/kedoknowledgebase',
    name: 'kedoknowledgebase',
    component: () => import('@/view/kedoknowledgebase/index.vue'),
    meta: { titleKey: 'nav.kedoKnowledgeBase', requiresAuth: false }
  },
  // KedoMind 独立页面
  {
    path: '/kedomind',
    name: 'kedomind',
    component: () => import('@/view/kedomind/index.vue'),
    meta: { titleKey: 'nav.kedoMind', requiresAuth: false }
  },

  // KedoAiFlow 独立页面
  {
    path: '/kedoAiFlow',
    name: 'kedoAiFlow',
    component: () => import('@/view/kedoAiFlow/index.vue'),
    meta: { titleKey: 'nav.kedoAiFlow', requiresAuth: false }
  },
  // 技能使用页面
  {
    path: '/skilluse',
    name: 'skilluse',
    component: () => import('@/view/skilluse/index.vue'),
    meta: { title: '技能使用', requiresAuth: false }
  },
  // 下载页面（公开）
  {
    path: '/download',
    name: 'download',
    component: () => import('@/view/download/index.vue'),
    meta: { title: '下载', requiresAuth: false }
  },
  // KedoClaw下载页面（公开）
  {
    path: '/download/kedoclaw',
    name: 'kedoclawDownload',
    component: () => import('@/view/download/kedoclaw.vue'),
    meta: { title: 'KedoClaw下载', requiresAuth: false }
  },
  // 商家版下载页面（公开）
  {
    path: '/download/merchant',
    name: 'merchantDownload',
    component: () => import('@/view/download/merchant.vue'),
    meta: { title: '商家版下载', requiresAuth: false }
  },
  // KedoBot U盘版下载页面（公开）
  {
    path: '/download/kedobotusb',
    name: 'kedobotusbDownload',
    component: () => import('@/view/download/KedoBotUsb.vue'),
    meta: { title: 'KedoBot U盘版下载', requiresAuth: false }
  },
  // 一体机页面（公开）
  {
    path: '/一体机',
    name: '一体机',
    component: () => import('@/view/一体机/Index.vue'),
    meta: { title: '智能一体机', requiresAuth: false }
  },
  // KedoBot 演示页面（公开）
  {
    path: '/kedoBot-demo',
    name: 'kedoBot-demo',
    component: () => import('@/view/kedobot-demo/Index.vue'),
    meta: { title: 'KedoBot 一体机演示', requiresAuth: false }
  },
  // OPC 社区页面
  {
    path: '/community',
    name: 'community',
    component: () => import('@/view/community/Index.vue'),
    meta: { title: 'OPC 社区', requiresAuth: false }
  },
  // 总览页面
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/view/overview/Index.vue'),
    meta: { title: '总览', requiresAuth: false }
  },
  // AIPC 产品介绍页面
  {
    path: '/aipc',
    name: 'aipc',
    component: () => import('@/view/aipc/Index.vue'),
    meta: { title: 'AIPC', requiresAuth: false }
  },
  // 场景页面
  {
    path: '/scenarios',
    name: 'scenarios',
    component: () => import('@/view/scenarios/Index.vue'),
    meta: { title: '场景方案', requiresAuth: false }
  },
  // 订购页面（公开）
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('@/view/order/Index.vue'),
    meta: { title: '订购', requiresAuth: false }
  },
  // U盘版订购页面（公开）
  {
    path: '/order/usb',
    name: 'orderUsb',
    component: () => import('@/view/order/usb.vue'),
    meta: { title: 'KedoBot U盘版订购', requiresAuth: false }
  },
  // 使用说明页面（公开）
  {
    path: '/usage',
    name: 'usage',
    component: () => import('@/view/usage/index.vue'),
    meta: { title: '使用说明', requiresAuth: false }
  },
  // 智能体详情页面（公开）
  {
    path: '/agent/:id',
    name: 'agent',
    component: () => import('@/view/agent/index.vue'),
    meta: { title: '智能体详情', requiresAuth: false }
  },
  // 文档页面（公开）
  {
    path: '/doc/privacyPolicy',
    name: 'privacyPolicy',
    component: () => import('@/view/doc/privacyPolicy.vue'),
    meta: { title: '隐私政策', requiresAuth: false }
  },
  {
    path: '/doc/useAgreement',
    name: 'useAgreement',
    component: () => import('@/view/doc/useAgreement.vue'),
    meta: { title: '服务条款', requiresAuth: false }
  },
  // 401 未授权页面
  {
    path: '/401',
    name: 'Unauthorized',
    component: () => import('@/view/exception/401.vue'),
    meta: { title: '401', requiresAuth: false }
  },
  // 404 未找到
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/view/exception/404.vue'),
    meta: { title: '404', requiresAuth: false }
  },
  // 404 兜底路由 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAll',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

/**
 * 验证登录状态
 * @returns boolean
 */
function checkIsLogin() {
  const { getToken } = useStorage()
  return !!getToken()
}

// 路由导航守卫
router.beforeEach((to, from, next) => {
  try {
    // 存储当前路由供标题更新使用
    window.__currentRoute = to
    
    // 设置页面标题 - 支持国际化
    const title = getRouteTitle(to)
    if (title) {
      document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    }

    // 获取路由的 requiresAuth 配置，默认为 true（需要登录）
    const requiresAuth = to.meta?.requiresAuth !== false
    
    // 如果路由不需要登录验证，直接允许访问
    if (!requiresAuth) {
      // 如果已登录且访问登录页面（但绑定手机号页面例外），重定向到首页
      const isLogin = checkIsLogin()
      if (isLogin && to.path.startsWith('/login') && to.path !== '/login/bind_phonenum') {
        next(RouteHomeRedirectPath)
        return
      }
      next()
      return
    }

    // 需要登录验证的路由
    const isLogin = checkIsLogin()
    
    // 如果用户已登录，检查商家权限
    if (isLogin) {
      // 检查是否需要商家权限
      const requiresMerchant = to.meta?.requiresMerchant === true
      if (requiresMerchant) {
        const userStore = useUserStore()
        if (!userStore.getUserIsMerchant) {
          message.error('您没有权限访问该页面')
          next('/board/overview')
          return
        }
      }
      next()
      return
    }

    // 如果用户未登录，保存当前路径并重定向到登录页
    if (to.path !== '/login/wechat') {
      sessionStorage.setItem('needLoginFromPath', to.fullPath)
    }
    next('/login/wechat')
  } catch (err) {
    console.error('路由守卫错误:', err)
    next('/login/wechat')
  }
})

// 路由后置守卫
router.afterEach((to) => {
    const loadingElement = document.querySelector('.app-loading')
    if (loadingElement) {
      // 添加一个短暂延迟，确保页面已经渲染
      setTimeout(() => {
        loadingElement.classList.add('loaded')
        // 延迟移除元素，让动画完成
        setTimeout(() => {
          if (loadingElement.parentNode) {
            loadingElement.parentNode.removeChild(loadingElement)
          }
        }, 500)
      }, 100)
    }
  
})

export default router
export * from './login'