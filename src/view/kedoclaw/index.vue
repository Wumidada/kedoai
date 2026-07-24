<template>
  <External 
    :url="kedoClawUrl" 
    :name="kedoClawName" 
  />
</template>

<script setup lang="ts">
import External from '@/components/external'

// KedoClaw 配置
const kedoClawUrl = 'https://www.kedoai.com:8321' // 暂时使用与kedomind相同的URL，后续可以修改
const kedoClawName = 'KedoClaw'
</script> 