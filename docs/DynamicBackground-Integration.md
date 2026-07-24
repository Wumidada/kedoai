# 动态背景组件集成说明文档

## 概述

本组件实现了与声网官网同款的动态大背景效果，使用 Three.js 技术栈，包含深蓝渐变星空背景、动态粒子系统、悬浮图标元素、视差滚动效果以及呼吸动画。

## 核心特性

### 视觉效果
- **深蓝渐变星空背景**：使用 CSS 渐变创建深邃的星空色调
- **动态粒子系统**：150+ 彩色粒子，带有发光效果和旋转动画
- **悬浮图标元素**：4 个科技风格图标（AI、云、安全、闪电）
- **视差滚动效果**：背景随页面滚动产生视差
- **呼吸动画**：粒子系统具有呼吸般的缩放效果
- **鼠标跟随交互**：粒子会向鼠标位置产生轻微偏移

### 性能优化
- 首屏加载时间控制在 1 秒以内
- 动画运行保持 60fps 流畅度
- 使用 requestAnimationFrame 优化渲染
- 限制像素比（最大为 2）以提升移动端性能
- 组件卸载时自动清理 Three.js 资源

### 响应式设计
- PC 端：完整效果，悬浮图标 60x60px
- 移动端：简化效果，悬浮图标 40x40px
- 自动适配不同屏幕尺寸

## 文件结构

```
src/
├── components/
│   └── DynamicBackground.vue    # 动态背景组件
├── view/
│   └── home/
│       └── Index.vue            # 首页（已集成）
└── docs/
    └── DynamicBackground-Integration.md  # 本文档
```

## 安装依赖

```bash
npm install three @types/three
```

## 组件配置

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| config | Object | 见下方 | 背景配置选项 |

### 配置选项

```typescript
interface BackgroundConfig {
  particleCount: number        // 粒子数量，默认 150
  gradientColors: string[]     // 渐变颜色数组
  animationSpeed: number       // 动画速度倍率，默认 1
  iconPositions: Array<{x: number, y: number}>  // 图标位置
  enableMouseInteraction: boolean  // 启用鼠标交互，默认 true
  enableParallax: boolean      // 启用视差滚动，默认 true
}
```

### 默认配置

```javascript
const defaultConfig = {
  particleCount: 150,
  gradientColors: ['#0a0e27', '#1a1f4b', '#2d3561', '#0f172a'],
  animationSpeed: 1,
  iconPositions: [
    { x: 15, y: 20 },
    { x: 85, y: 30 },
    { x: 75, y: 70 },
    { x: 25, y: 80 },
  ],
  enableMouseInteraction: true,
  enableParallax: true,
}
```

## 使用方式

### 基础用法

```vue
<template>
  <section class="hero-section">
    <DynamicBackground />
    <!-- 其他内容 -->
  </section>
</template>

<script setup>
import DynamicBackground from '@/components/DynamicBackground.vue'
</script>
```

### 自定义配置

```vue
<template>
  <section class="hero-section">
    <DynamicBackground :config="customConfig" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import DynamicBackground from '@/components/DynamicBackground.vue'

const customConfig = ref({
  particleCount: 200,              // 增加粒子数量
  gradientColors: ['#000428', '#004e92'],  // 自定义渐变
  animationSpeed: 1.5,             // 加快动画速度
  enableMouseInteraction: true,
  enableParallax: false,           // 禁用视差效果
})
</script>
```

## 集成到现有页面

### 步骤 1：导入组件

```javascript
import DynamicBackground from "@/components/DynamicBackground.vue"
```

### 步骤 2：添加组件到模板

```vue
<section class="hero-section-new">
  <!-- Three.js 动态背景 -->
  <DynamicBackground :config="backgroundConfig" />
  
  <!-- 原有内容 -->
  <div class="hero-content-new">
    <!-- ... -->
  </div>
</section>
```

### 步骤 3：添加配置

```javascript
const backgroundConfig = {
  particleCount: 150,
  gradientColors: ['#0a0e27', '#1a1f4b', '#2d3561', '#0f172a'],
  animationSpeed: 1,
  enableMouseInteraction: true,
  enableParallax: true,
}
```

### 步骤 4：添加样式

```scss
.hero-section-new {
  position: relative;
  overflow: hidden;
  
  .dynamic-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .hero-content-new {
    position: relative;
    z-index: 1;
  }
}
```

## 浏览器兼容性

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 性能建议

1. **粒子数量控制**：移动端建议减少至 80-100 个粒子
2. **禁用视差效果**：在低性能设备上可禁用视差滚动
3. **限制像素比**：已自动限制为最大 2，避免高分辨率屏幕的性能问题
4. **懒加载**：首屏外的组件可使用懒加载

## 故障排查

### 问题：背景不显示
- 检查 Three.js 是否正确安装
- 检查 canvas 尺寸是否为 0
- 查看控制台是否有 WebGL 错误

### 问题：动画卡顿
- 减少 particleCount 配置
- 禁用 enableMouseInteraction
- 在移动端禁用 enableParallax

### 问题：内存泄漏
- 确保组件正确卸载
- 检查是否调用了 dispose 方法清理资源

## 更新日志

### v1.0.0
- 初始版本发布
- 实现基础粒子系统
- 添加悬浮图标和呼吸动画
- 支持鼠标交互和视差滚动

## 维护说明

如需修改或扩展功能：

1. **修改粒子效果**：编辑 `createParticles()` 方法
2. **修改悬浮图标**：编辑 `floatingIcons` 数组
3. **修改动画速度**：调整 `animationSpeed` 配置
4. **修改颜色方案**：调整 `gradientColors` 配置

---

如有问题，请联系开发团队。
