<template>
  <External 
    :url="kedoKnowledgeBaseUrl" 
    :name="kedoKnowledgeBaseName" 
  />
</template>

<script setup lang="ts">
import External from '@/components/external'

// Kedo知识库 配置
const kedoKnowledgeBaseUrl = 'https://www.kedowen.com:8666'
const kedoKnowledgeBaseName = 'Kedo知识库'
</script> 