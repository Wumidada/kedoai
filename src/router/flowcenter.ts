import { RouteRecordRaw } from 'vue-router'

export const FlowCenterRoutesConfig: Array<RouteRecordRaw> = [
  {
    path: '/flowCenter',
    name: 'flowCenter',
    component: () => import('@/view/flowCenter/index.vue'),
    redirect: '/flowCenter/myFiles',
    meta: { title: 'KedoAiFlow工作流', requiresAuth: true },
    children: [
      {
        path: 'myFiles',
        name: 'flowCenterHome',
        component: () => import('@/view/flowCenter/components/MyFiles.vue'),
        meta: { titleKey: 'flow.myFiles', requiresAuth: true }
      },
      {
        path: 'templates',
        name: 'flowCenterTemplates',
        component: () => import('@/view/flowCenter/components/Templates.vue'),
        meta: { titleKey: 'flow.templates', requiresAuth: true }
      },
      {
        path: 'recycle',
        name: 'flowCenterRecycle',
        component: () => import('@/view/flowCenter/components/RecycleBin.vue'),
        meta: { titleKey: 'flow.recycleBin', requiresAuth: true }
      },
      {
        path: 'team/:teamId/:folderId?',
        name: 'flowCenterTeam',
        component: () => import('@/view/flowCenter/components/team/index.vue'),
        meta: { titleKey: 'flow.teamSpace', requiresAuth: true }
      }
    ]
  }
] 