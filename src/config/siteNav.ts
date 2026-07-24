import type { NavMenuIconName } from '@/components/nav/navMenuIconTypes'

export type SiteNavActiveKey = 'home' | 'community' | 'overview' | 'aipc' | 'kedobot-demo'

export interface SiteNavPrimaryLink {
  key: string
  name: string
  path: string
  external?: boolean
}

export interface SiteNavDropdownItem {
  title: string
  desc?: string
  href: string
  icon?: NavMenuIconName
  external?: boolean
  comingSoon?: boolean
}

export const SITE_NAV_PRIMARY_LINKS: SiteNavPrimaryLink[] = [
  { key: 'home', name: '首页', path: '/' },
  { key: 'overview', name: '总览', path: '/#/overview', external: true },
  { key: 'aipc', name: 'AIPC', path: '/aipc' },
]

/** 产品中心 — KedoBot（一体机）与 KedoClaw（边缘终端）为独立产品线 */
export const SITE_NAV_PRODUCTS: SiteNavDropdownItem[] = [
  {
    title: 'KedoChat',
    desc: '智能对话系统',
    href: '#/board/kedoChat',
    icon: 'chat',
    external: true,
  },
  {
    title: 'Kedo知识库',
    desc: '企业知识管理',
    href: '#/board/kedoKnowledgeBase',
    icon: 'knowledge',
    external: true,
  },
  {
    title: 'KedoAiFlow',
    desc: '智能工作流',
    href: '#/board/kedoAiFlow',
    icon: 'flow',
    external: true,
  },
  {
    title: 'KedoMind',
    desc: '数字员工平台',
    href: '#/board/kedoMind',
    icon: 'mind',
    external: true,
  },
  {
    title: 'KedoBot',
    desc: '智能一体机',
    href: '#/kedoBot-demo',
    icon: 'bot',
  },
  {
    title: 'KedoClaw',
    desc: '边缘计算终端',
    href: '#/board/kedoClaw',
    icon: 'claw',
    external: true,
  },
  {
    title: '产品订购',
    desc: 'Kedo 产品购买',
    href: '#/board/smartBox',
    icon: 'order',
    external: true,
  },
  {
    title: '技能商城',
    desc: 'AI 技能交易平台',
    href: '#/board/skillStore',
    icon: 'skill',
    external: true,
  },
]

export const SITE_NAV_SOLUTIONS: SiteNavDropdownItem[] = [
  {
    title: 'AI营销智能体',
    desc: '智能营销解决方案',
    href: '#/scenarios#ai-marketing',
    icon: 'marketing',
  },
  {
    title: '7×24程序员',
    desc: '全天候开发支持',
    href: '#/scenarios#programmer',
    icon: 'code',
  },
  {
    title: '老板数字助手',
    desc: '企业管理辅助',
    href: '#/scenarios#boss-assistant',
    icon: 'assistant',
  },
]

export const SITE_NAV_RESOURCES: SiteNavDropdownItem[] = [
  {
    title: '文档中心',
    desc: '产品使用指南',
    href: '#',
    icon: 'docs',
    comingSoon: true,
  },
  {
    title: '案例库',
    desc: '成功实践分享',
    href: '#',
    icon: 'cases',
    comingSoon: true,
  },
  {
    title: '技术博客',
    desc: '前沿技术洞察',
    href: '#',
    icon: 'blog',
    comingSoon: true,
  },
]
