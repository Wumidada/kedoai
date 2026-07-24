<template>
  <External 
    :url="kedoMindUrl" 
    :name="kedoMindName" 
  />
</template>

<script setup lang="ts">
import External from '@/components/external'

// KedoMind 配置
const kedoMindUrl = 'https://www.kedoai.com:8321'
const kedoMindName = 'KedoMind'
</script> 