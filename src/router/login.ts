/**
 * 登录相关路由配置
 */

// 登录路由配置
export const LoginRoutesConfig = [
  {
    path: '/login',
    name: 'login',
    redirect: '/login/wechat',
    meta: { titleKey: 'route.login', requiresAuth: false }
  },
  {
    path: '/login/password',
    redirect: '/login/wechat',
    meta: { titleKey: 'route.wechatLogin', requiresAuth: false }
  },
  {
    path: '/login/ver_code',
    redirect: '/login/wechat',
    meta: { titleKey: 'route.wechatLogin', requiresAuth: false }
  },
  {
    path: '/login/sign_up',
    redirect: '/login/wechat',
    meta: { titleKey: 'route.wechatLogin', requiresAuth: false }
  },
  {
    path: '/login/forget_password',
    redirect: '/login/wechat',
    meta: { titleKey: 'route.wechatLogin', requiresAuth: false }
  },
  {
    path: '/login/wechat',
    name: 'wechatLogin',
    component: () => import('@/view/login/components/wechatLogin.vue'),
    meta: { titleKey: 'route.wechatLogin', requiresAuth: false }
  },
  {
    path: '/login/bind_phonenum',
    name: 'bindPhonenum',
    component: () => import('@/view/login/components/bindPhonenum.vue'),
    meta: { titleKey: 'route.bindPhonenum', requiresAuth: false }
  },
  {
    path: '/doc/use_agreement',
    name: 'useAgreement',
    component: () => import('@/view/doc/useAgreement.vue'),
    meta: { titleKey: 'route.useAgreement', requiresAuth: false }
  },
  {
    path: '/doc/privacy_policy',
    name: 'privacyPolicy',
    component: () => import('@/view/doc/privacyPolicy.vue'),
    meta: { titleKey: 'route.privacyPolicy', requiresAuth: false }
  }
]

// 登录相关路由路径白名单 - 直接定义，避免动态计算
export const LOGIN_WHITE_LIST = [
  '/login',
  '/login/password',
  '/login/ver_code', 
  '/login/sign_up',
  '/login/forget_password',
  '/login/wechat',
  '/login/bind_phonenum',
  '/doc/use_agreement',
  '/doc/privacy_policy',
  '/download'
]
