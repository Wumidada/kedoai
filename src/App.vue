<template>
  <div class="app-container">
    <a-config-provider :theme="themeConfig" :locale="antdLocale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

const { locale } = useI18n()

const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#1E9CFF',
    colorPrimaryHover: '#0DA8EF',
    colorPrimaryActive: '#0DA8EF',
    colorPrimaryText: '#1E9CFF',
    colorPrimaryTextHover: '#0DA8EF',
    colorPrimaryBg: 'rgba(30, 156, 255, 0.08)',
    colorPrimaryBgHover: 'rgba(30, 156, 255, 0.16)',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#F1F5F9',
    colorBgLayout: '#EDF2F7',
    colorText: '#1A202C',
    colorTextSecondary: '#4A5568',
    colorBorder: '#A0AEC0',
    colorSplit: '#A0AEC0',
    boxShadow: 'none'
  }
}))

// 根据当前i18n语言动态设置Ant Design语言包
const antdLocale = computed(() => {
  return locale.value === 'zh-CN' ? zhCN : enUS
})


</script>

<!-- 你原有的scoped样式完全保留，不用做任何修改 -->
<style lang="scss">
/* 你之前写的所有盾牌CSS、全局样式等，全部保留不动 */
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #ffffff;
}
</style>