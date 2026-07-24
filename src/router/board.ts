export const BoardRoutesConfig = [
  {
    path: '/board',
    name: 'board',
    component: () => import('@/view/board/Index.vue'),
    meta: { titleKey: 'route.dashboard', requiresAuth: true },
    redirect: '/board/overview', // 默认重定向到概览页面
    children: [
      {
        path: 'overview',
        name: 'boardOverview',
        component: () => import('@/view/board/components/Overview.vue'),
        meta: { titleKey: 'route.overview', requiresAuth: true }
      },
      {
        path: 'kedoChat',
        name: 'kedoChat',
        component: () => import('@/view/board/components/KedoChat.vue'),
        meta: { titleKey: 'nav.kedoChat', requiresAuth: true }
      },
      {
        path: 'kedoKnowledgeBase',
        name: 'kedoKnowledgeBase',
        component: () => import('@/view/board/components/KedoKnowledgeBase.vue'),
        meta: { titleKey: 'nav.kedoKnowledgeBase', requiresAuth: true }
      },
      {
        path: 'kedoAiFlow',
        name: 'boardKedoAiFlow',
        component: () => import('@/view/board/components/KedoAiFlow.vue'),
        meta: { titleKey: 'nav.kedoAiFlow', requiresAuth: true }
      },
      {
        path: 'kedoMind',
        name: 'kedoMind',
        component: () => import('@/view/board/components/KedoMind.vue'),
        meta: { titleKey: 'nav.kedoMind', requiresAuth: true }
      },
      {
        path: 'kedoClaw',
        name: 'kedoClaw',
        component: () => import('@/view/board/components/KedoClaw.vue'),
        meta: { titleKey: 'nav.kedoClaw', requiresAuth: true }
      },
      {
        path: 'smartBox',
        name: 'smartBox',
        component: () => import('@/view/board/components/SmartBox.vue'),
        meta: { title: 'KedoBot 一体机', requiresAuth: true }
      },
      {
        path: 'KedoBotUSB',
        name: 'KedoBotUSB',
        component: () => import('@/view/board/components/KedoBotUsb.vue'),
        meta: { title: 'KedoBot U盘版', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/view/board/orders/Index.vue'),
        meta: { title: '我的订单', requiresAuth: true }
      },
      {
        path: 'logistics',
        name: 'logistics',
        component: () => import('@/view/board/orders/Logistics.vue'),
        meta: { title: '物流查询', requiresAuth: true }
      },
      {
        path: 'merchant/orders',
        name: 'merchantOrders',
        component: () => import('@/view/board/merchant/Orders.vue'),
        meta: { title: '商家订单管理', requiresAuth: true, requiresMerchant: true }
      },
      {
        path: 'skillStore',
        name: 'skillStore',
        component: () => import('@/view/board/components/SkillStore.vue'),
        meta: { title: '技能商城', requiresAuth: true }
      },
      {
        path: 'kedoMindDemo',
        name: 'kedoMindDemo',
        component: () => import('@/view/board/components/KedoMindDemo.vue'),
        meta: { title: 'KedoMind 演示', requiresAuth: true }
      },

    ]
  }
]