<template>
  <External 
    :url="kedoChatUrl" 
    :name="kedoChatName" 
  />
</template>

<script setup lang="ts">
import External from '@/components/external'

// KedoChat 配置
const kedoChatUrl = 'https://www.kedowen.com:8001'
const kedoChatName = 'KedoChat'
</script> 