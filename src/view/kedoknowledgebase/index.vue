<template>
  <External
    :url="kedoKnowledgeBaseUrl"
    :name="kedoKnowledgeBaseName"
    :control-token="false"
    :control-refresh-token="false"
    :extra-params="knowledgeBaseAuthParams"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import External from '@/components/external'
import { useStorage } from '@/hooks/useStorage'
import { useUserStore } from '@/store/user'

const kedoKnowledgeBaseUrl = 'https://www.kedowen.com:8666'
const kedoKnowledgeBaseName = 'Kedo知识库'
const storage = useStorage()
const userStore = useUserStore()

// 知识库的单点登录入口读取 accesstoken / userid（区分大小写），
// 与 Chat 使用的 token / userId 不同。复用官网凭据，由知识库验证并建立会话。
const knowledgeBaseAuthParams = computed<Record<string, string>>(() => {
  const params: Record<string, string> = {}
  const token = storage.getToken()
  if (token) params.accesstoken = token
  if (userStore.id) params.userid = String(userStore.id)
  return params
})
</script>
