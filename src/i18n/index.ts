import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import jaJP from './locales/ja-JP.json'
import zhTW from './locales/zh-TW.json'

// 支持的语言列表，便于后期维护
export const supportedLanguages = [
  {
    code: 'zh-CN',
    name: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'en-US', 
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  },
  {
    code: 'zh-TW',
    name: '繁體中文',
    flag: '🇹🇼'
  }
]

// 语言资源
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'zh-TW': zhTW
}

// 检测用户语言
function detectUserLanguage(): string {
  // 1. 从 localStorage 获取用户设置的语言
  const savedLanguage = localStorage.getItem('user-language')
  if (savedLanguage && messages[savedLanguage as keyof typeof messages]) {
    return savedLanguage
  }

  // 2. 从浏览器语言设置检测
  const browserLanguage = navigator.language || navigator.languages?.[0]
  
  // 精确匹配
  if (browserLanguage && messages[browserLanguage as keyof typeof messages]) {
    return browserLanguage
  }
  
  // 模糊匹配（例如 zh 匹配 zh-CN）
  const languageCode = browserLanguage?.split('-')[0]
  const supportedCodes = supportedLanguages.map(lang => lang.code)
  const matchedLanguage = supportedCodes.find(code => code.startsWith(languageCode + '-'))
  
  if (matchedLanguage) {
    return matchedLanguage
  }

  // 3. 默认返回英文
  return 'en-US'
}

// 获取默认语言
const defaultLanguage = detectUserLanguage()

// 创建 i18n 实例
export const i18n = createI18n({
  locale: defaultLanguage,
  fallbackLocale: 'en-US',
  messages,
  legacy: false,
  globalInjection: true
})

// 切换语言的方法
export function setLanguage(locale: string) {
  if (messages[locale as keyof typeof messages]) {
    i18n.global.locale.value = locale as 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW'
    localStorage.setItem('user-language', locale)
    document.documentElement.lang = locale
    
    // 语言切换后更新页面标题
    updateCurrentRouteTitle()
  }
}

// 获取当前语言
export function getCurrentLanguage() {
  return i18n.global.locale.value
}

// 获取支持的语言代码列表
export function getSupportedLanguageCodes() {
  return supportedLanguages.map(lang => lang.code)
}

// 翻译函数 - 可在任何地方使用
export function t(key: string) {
  return i18n.global.t(key)
}

// 路由标题处理函数
export function getRouteTitle(route: any): string {
  // 检查matched数组中的最后一个路由记录，即当前激活的子路由
  const lastMatchedRoute = route.matched[route.matched.length - 1]
  if (lastMatchedRoute?.meta?.titleKey) {
    return t(lastMatchedRoute.meta.titleKey)
  }
  return lastMatchedRoute?.meta?.title || ''
}

// 更新当前路由标题的函数
export function updateCurrentRouteTitle() {
  // 获取当前路由
  const currentRoute = window.__currentRoute
  if (currentRoute) {
    const title = getRouteTitle(currentRoute)
    if (title) {
      document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    }
  }
}

// 存储当前路由的全局变量（临时解决方案）
declare global {
  interface Window {
    __currentRoute: any
  }
}

export default i18n 