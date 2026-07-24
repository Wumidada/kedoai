<template>
  <a-dropdown placement="bottomRight" >
    <a-button type="text" class="language-switcher">
      <template #icon>
        <GlobalOutlined />
      </template>
      <span class="language-text">{{ currentLanguageInfo?.name }}</span>
    </a-button>
    
    <template #overlay>
      <a-menu @click="handleLanguageChange" :selected-keys="[languageStore.currentLanguage]">
        <a-menu-item 
          v-for="language in supportedLanguages" 
          :key="language.code"
          class="language-menu-item"
        >
          <span class="language-name">{{ language.name }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GlobalOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useLanguageStore } from '@/store/language'

const languageStore = useLanguageStore()

// 获取当前语言信息
const currentLanguageInfo = computed(() => {
  return languageStore.getCurrentLanguageInfo()
})

// 获取支持的语言列表
const supportedLanguages = computed(() => {
  return languageStore.getSupportedLanguages()
})

// 处理语言切换
const handleLanguageChange = ({ key }: { key: string }) => {
  if (key !== languageStore.currentLanguage) {
    languageStore.switchLanguage(key)
  }
}
</script>

<style scoped lang="scss">
.language-switcher {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  .language-text {
    font-size: 14px;
    margin-left: 4px;
  }
}

.language-menu-item {
  display: flex;
  align-items: center;
  min-width: 120px;
  
  .language-flag {
    font-size: 16px;
    margin-right: 8px;
  }
  
  .language-name {
    font-size: 14px;
  }
}

:deep(.ant-dropdown-menu-item) {
  padding: 8px 12px;
  
  &:hover {
    background-color: rgba(24, 144, 255, 0.1);
  }
  
  &.ant-dropdown-menu-item-selected {
    background-color: rgba(24, 144, 255, 0.1);
    color: #1890ff;
  }
}
</style> 