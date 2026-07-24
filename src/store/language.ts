import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setLanguage, getCurrentLanguage, supportedLanguages } from '@/i18n'

export const useLanguageStore = defineStore(
  'language',
  () => {
    // 当前语言
    const currentLanguage = ref(getCurrentLanguage())

    // 切换语言
    const switchLanguage = (locale: string) => {
      setLanguage(locale)
      currentLanguage.value = locale as 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW'
    }

    // 获取当前语言信息
    const getCurrentLanguageInfo = () => {
      return supportedLanguages.find(lang => lang.code === currentLanguage.value)
    }

    // 获取支持的语言列表
    const getSupportedLanguages = () => {
      return supportedLanguages
    }

    // 是否为中文
    const isChineseBrowser = () => {
      return currentLanguage.value === 'zh-CN'
    }

    // 是否为英文
    const isEnglishBrowser = () => {
      return currentLanguage.value === 'en-US'
    }

    // 是否为日文
    const isJapaneseBrowser = () => {
      return currentLanguage.value === 'ja-JP'
    }

    // 是否为繁体中文
    const isTraditionalChineseBrowser = () => {
      return currentLanguage.value === 'zh-TW'
    }

    return {
      currentLanguage,
      switchLanguage,
      getCurrentLanguageInfo,
      getSupportedLanguages,
      isChineseBrowser,
      isEnglishBrowser,
      isJapaneseBrowser,
      isTraditionalChineseBrowser
    }
  },
  {
    persist: {
      key: 'language-store',
      storage: localStorage
    }
  }
) 