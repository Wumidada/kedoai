<template>
  <External 
    :url="kedoAiFlowUrl" 
    :name="kedoAiFlowName" 
    :extra-params="extraParams"
    :control-token="false"
    :control-refresh-token="false"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import External from '@/components/external'

const kedoAiFlowUrl = 'https://www.kedowen.com:6602' 
const kedoAiFlowName = 'KedoAiFlow'

const route = useRoute()
const extraParams = {
  flowId: route.query.flowId as string || '',
  flowName: route.query.flowName as string || '',
  flowDescription: route.query.flowDescription as string || '',
  userId: route.query.userId as string || ''
}
</script>

<style scoped>
.kedo-ai-flow-page {
  padding: 32px;
  text-align: center;
}
</style> 