export const LoginRoutesConfig = [
  {
    path: '/login',
    name: 'login',
    redirect: '/login/wechat'
  },
  {
    path: '/login/wechat',
    name: 'wechatLogin',
    component: () => import('../views/WechatLogin.vue')
  },
  {
    path: '/login/bind_phonenum',
    name: 'bindPhonenum',
    component: () => import('../views/BindPhoneNum.vue')
  }
]

export const LOGIN_WHITE_LIST = ['/login', '/login/wechat', '/login/bind_phonenum']