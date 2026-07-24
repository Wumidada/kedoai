<template>
  <span class="nav-menu-icon" :class="`nav-menu-icon--${name}`">
    <!-- KedoChat -->
    <svg v-if="name === 'chat'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 18V8.5C5 6.57 6.57 5 8.5 5h7C17.43 5 19 6.57 19 8.5V13c0 1.93-1.57 3.5-3.5 3.5H10l-3.5 2.5V18Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M8.5 10h7M8.5 13h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="17.5" cy="7" r="2.5" fill="currentColor" opacity="0.9"/>
    </svg>
    <!-- 知识库 -->
    <svg v-else-if="name === 'knowledge'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 6.5C5 5.67 5.67 5 6.5 5H18v14H6.5A1.5 1.5 0 0 1 5 17.5V6.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M8 5v14M12 8h5M12 11h5M12 14h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- KedoAiFlow -->
    <svg v-else-if="name === 'flow'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
      <rect x="15" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
      <rect x="9" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
      <path d="M9 7h3M12 10v4M15 17h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- KedoMind -->
    <svg v-else-if="name === 'mind'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4c-2.5 0-4.5 1.8-4.5 4.2 0 1.2.5 2.3 1.3 3.1C7.8 12.5 7 14 7 15.5 7 18 9 20 12 20s5-2 5-4.5c0-1.5-.8-3-1.8-4.2.8-.8 1.3-1.9 1.3-3.1C16.5 5.8 14.5 4 12 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M10 11.5c.8-.6 1.7-.9 2-.9s1.2.3 2 .9M9.5 15h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
    <!-- KedoBot 一体机 -->
    <svg v-else-if="name === 'bot'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="8" width="12" height="10" rx="2.5" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="9.5" cy="12.5" r="1.2" fill="currentColor"/>
      <circle cx="14.5" cy="12.5" r="1.2" fill="currentColor"/>
      <path d="M10 16h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M12 8V5.5M9 5.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="12" cy="4" r="1" fill="currentColor"/>
    </svg>
    <!-- KedoClaw -->
    <svg v-else-if="name === 'claw'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/>
      <path d="M8 10h2M14 10h2M8 14h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="12" cy="4.5" r="1.5" fill="currentColor"/>
      <path d="M12 6v1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 产品订购 -->
    <svg v-else-if="name === 'order'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8h14l-1.2 9H7.2L6 8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M9.5 12h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 技能商城 -->
    <svg v-else-if="name === 'skill'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5 12 5l8 4.5-8 4.5-8-4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M7 11.5V16c0 .8 2.2 2 5 2s5-1.2 5-2v-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M18 10v5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- AI营销 -->
    <svg v-else-if="name === 'marketing'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
      <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 程序员 -->
    <svg v-else-if="name === 'code'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 6l-4 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <!-- 老板助手 -->
    <svg v-else-if="name === 'assistant'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 19V9.5C6 7.57 7.57 6 9.5 6h5C16.43 6 18 7.57 18 9.5V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M4 19h16M9 11h6M9 14h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 文档 -->
    <svg v-else-if="name === 'docs'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 4h8l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M16 4v4h4M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 案例 -->
    <svg v-else-if="name === 'cases'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V6.5A1.5 1.5 0 0 1 5.5 5H18.5A1.5 1.5 0 0 1 20 6.5V18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M4 14h16M8 10h2M8 14h2M14 10h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <!-- 博客 -->
    <svg v-else-if="name === 'blog'" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 5h12v14H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M8 9h8M8 12h6M8 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M15 5v3h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
</template>

<script setup lang="ts">
import type { NavMenuIconName } from './navMenuIconTypes'

defineProps<{
  name: NavMenuIconName
}>()
</script>

<style scoped lang="scss">
.nav-menu-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  box-shadow: 0 2px 8px rgba(30, 156, 255, 0.12);

  svg {
    width: 22px;
    height: 22px;
  }

  &--chat {
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  }

  &--knowledge {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  &--flow {
    background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
  }

  &--mind {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  }

  &--bot {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  }

  &--claw {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }

  &--order {
    background: linear-gradient(135deg, #1e9cff 0%, #0da8ef 100%);
  }

  &--skill {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }

  &--marketing {
    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  }

  &--code {
    background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  }

  &--assistant {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  }

  &--docs {
    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
  }

  &--cases {
    background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
  }

  &--blog {
    background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
  }
}
</style>
