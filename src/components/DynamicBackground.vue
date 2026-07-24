<template>
  <div ref="containerRef" class="dynamic-background" :class="{ 'is-ready': isReady }">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>
    <!-- 悬浮图标元素 -->
    <div class="floating-icons">
      <div 
        v-for="(icon, index) in floatingIcons" 
        :key="index"
        class="floating-icon"
        :style="getIconStyle(icon, index)"
      >
        <component :is="icon.component" v-if="icon.component" />
        <img v-else-if="icon.image" :src="icon.image" class="icon-image" />
        <span v-else class="icon-text">{{ icon.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'

// 配置选项接口
interface BackgroundConfig {
  particleCount: number
  gradientColors: string[]
  animationSpeed: number
  iconPositions: { x: number; y: number }[]
  enableMouseInteraction: boolean
  enableParallax: boolean
}

// 默认配置
const defaultConfig: BackgroundConfig = {
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

// Props
const props = defineProps<{
  config?: Partial<BackgroundConfig>
}>()

// 合并配置
const config = computed(() => ({
  ...defaultConfig,
  ...props.config,
}))

// Refs
const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const isReady = ref(false)

// Three.js 相关变量
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let particleGeometry: THREE.BufferGeometry
let particleMaterial: THREE.PointsMaterial
let animationId: number
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

// 导入 SVG 图片
const aiSvgUrl = new URL('@/assets/images/ai.svg', import.meta.url).href
const starSvgUrl = new URL('@/assets/images/星星.svg', import.meta.url).href

// 悬浮图标数据
const floatingIcons = ref([
  { image: starSvgUrl, x: 5, y: 5, delay: 0 },
  { image: aiSvgUrl, x: 25, y: 80, delay: 6 },
])

// 获取图标样式
const getIconStyle = (icon: any, index: number) => {
  return {
    left: `${icon.x}%`,
    top: `${icon.y}%`,
    animationDelay: `${icon.delay}s`,
  }
}

// 初始化场景
const initScene = () => {
  if (!canvasRef.value || !containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 50

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  // 根据设备性能调整像素比
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)

  // 创建粒子系统
  createParticles()

  // 创建星空背景
  createStarField()

  // 开始动画
  animationId = requestAnimationFrame(animate)
}

// 创建粒子系统
const createParticles = () => {
  // 根据设备类型和性能调整粒子数量
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isLowPerformance = isMobile || navigator.hardwareConcurrency < 4
  const particleCount = isLowPerformance ? Math.max(60, config.value.particleCount * 0.5) : config.value.particleCount
  
  // 使用Float32Array提高性能
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  const colorPalette = [
    new THREE.Color(0x1E9CFF),
    new THREE.Color(0x6366f1),
    new THREE.Color(0x8b5cf6),
    new THREE.Color(0xffffff),
  ]

  // 优化粒子位置分布，避免过度拥挤
  for (let i = 0; i < particleCount; i++) {
    // 位置 - 使用球面坐标分布，更均匀
    const radius = Math.random() * 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    // 颜色
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // 大小 - 根据距离调整
    const distance = Math.sqrt(
      positions[i * 3] * positions[i * 3] +
      positions[i * 3 + 1] * positions[i * 3 + 1] +
      positions[i * 3 + 2] * positions[i * 3 + 2]
    )
    sizes[i] = Math.max(0.5, 2 - distance * 0.02)
  }

  particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  // 优化：计算 bounding sphere 以提高渲染性能
  particleGeometry.computeBoundingSphere()

  // 创建粒子材质
  const sprite = createParticleTexture()
  particleMaterial = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
    map: sprite,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true, // 开启大小衰减，更真实
    alphaTest: 0.1, // 减少过度绘制
  })

  particles = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particles)
}

// 创建粒子纹理
const createParticleTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext('2d')!

  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, 32, 32)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// 创建星空背景
const createStarField = () => {
  // 根据设备类型和性能调整星星数量
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isLowPerformance = isMobile || navigator.hardwareConcurrency < 4
  const starCount = isLowPerformance ? 300 : 800
  
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  const starSizes = new Float32Array(starCount)
  const starColors = new Float32Array(starCount * 3)
  const starOpacities = new Float32Array(starCount)
  
  // 颜色数组，模拟不同类型的星星
  const starColorPalette = [
    new THREE.Color(0xffffff), // 白色
    new THREE.Color(0xfff176), // 黄色
    new THREE.Color(0x90caf9), // 蓝色
    new THREE.Color(0xef9a9a), // 红色
  ]

  // 优化星星分布，使用球面坐标
  for (let i = 0; i < starCount; i++) {
    const radius = 80 + Math.random() * 120
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    starPositions[i * 3 + 2] = radius * Math.cos(phi)
    
    // 星星大小随机
    starSizes[i] = Math.random() * 0.6 + 0.1
    
    // 随机颜色
    const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)]
    starColors[i * 3] = color.r
    starColors[i * 3 + 1] = color.g
    starColors[i * 3 + 2] = color.b
    
    // 初始透明度
    starOpacities[i] = Math.random() * 0.8 + 0.2
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
  starGeometry.setAttribute('opacity', new THREE.BufferAttribute(starOpacities, 1))
  
  // 优化：计算 bounding sphere
  starGeometry.computeBoundingSphere()

  // 创建粒子纹理，使用更真实的星形
  const starSprite = createStarTexture()
  
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: {
        value: starSprite
      }
    },
    vertexShader: `
      attribute float size;
      attribute float opacity;
      attribute vec3 color;
      varying float vOpacity;
      varying vec3 vColor;
      
      void main() {
        vOpacity = opacity;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying float vOpacity;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, vOpacity) * texture(uTexture, gl_PointCoord);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)
  
  // 添加星星闪烁动画
  stars.userData = {
    opacity: starOpacities,
    speed: new Float32Array(starCount).fill(0).map(() => Math.random() * 0.01 + 0.005),
    direction: new Float32Array(starCount).fill(0).map(() => Math.random() > 0.5 ? 1 : -1)
  }
  
  // 存储星星对象，用于动画
  stars.userData.isStars = true
  
  return stars
}

// 创建星星纹理
const createStarTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext('2d')!

  // 创建星形渐变
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.1, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)')
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.3)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')

  context.fillStyle = gradient
  context.beginPath()
  context.arc(16, 16, 16, 0, Math.PI * 2)
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// 节流函数
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 动画循环
let lastTime = 0
const animate = (timestamp: number) => {
  // 限制帧率为60fps
  if (timestamp - lastTime < 16.67) {
    animationId = requestAnimationFrame(animate)
    return
  }
  lastTime = timestamp

  const time = Date.now() * 0.001 * config.value.animationSpeed

  // 粒子旋转动画
  if (particles) {
    particles.rotation.y = time * 0.05
    particles.rotation.x = Math.sin(time * 0.1) * 0.1

    // 鼠标交互效果
    if (config.value.enableMouseInteraction) {
      targetMouseX += (mouseX - targetMouseX) * 0.05
      targetMouseY += (mouseY - targetMouseY) * 0.05

      particles.rotation.y += targetMouseX * 0.001
      particles.rotation.x += targetMouseY * 0.001
    }
  }

  // 呼吸动画效果
  const breathe = Math.sin(time * 0.5) * 0.1 + 1
  if (particles) {
    particles.scale.set(breathe, breathe, breathe)
  }

  // 星星闪烁动画
  scene.traverse((object) => {
    if ((object as any).userData.isStars) {
      const stars = object as THREE.Points
      const opacities = stars.userData.opacity
      const speeds = stars.userData.speed
      const directions = stars.userData.direction
      
      for (let i = 0; i < opacities.length; i++) {
        opacities[i] += speeds[i] * directions[i]
        
        if (opacities[i] > 0.8) {
          directions[i] = -1
        } else if (opacities[i] < 0.2) {
          directions[i] = 1
        }
      }
      
      // 更新透明度
      (stars.geometry as THREE.BufferGeometry).attributes['opacity'].needsUpdate = true
    }
  })

  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}

// 鼠标移动处理（使用节流优化）
const handleMouseMove = throttle((event: MouseEvent) => {
  if (!config.value.enableMouseInteraction) return

  mouseX = (event.clientX / window.innerWidth) * 2 - 1
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1
}, 16) // 约60fps

// 视差滚动效果（使用节流优化）
const handleScroll = throttle(() => {
  if (!config.value.enableParallax || !camera) return

  const scrollY = window.scrollY
  camera.position.y = scrollY * 0.01
}, 16)

// 窗口大小调整（使用节流优化）
const handleResize = throttle(() => {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}, 100)

// 生命周期
onMounted(() => {
  initScene()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isReady.value = true
    })
  })

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 清理动画
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = 0
  }
  
  // 清理事件监听器
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)

  // 清理Three.js资源
  if (particleGeometry) {
    particleGeometry.dispose()
    particleGeometry = null as any
  }
  if (particleMaterial) {
    // 清理材质中的纹理
    if (particleMaterial.map) {
      particleMaterial.map.dispose()
    }
    particleMaterial.dispose()
    particleMaterial = null as any
  }
  if (particles) {
    scene.remove(particles)
    particles = null as any
  }
  if (renderer) {
    renderer.dispose()
    renderer = null as any
  }
  if (camera) {
    camera = null as any
  }
  if (scene) {
    // 清理场景中的所有对象
    while (scene.children.length > 0) {
      const child = scene.children[0]
      scene.remove(child)
      // 清理几何体和材质
      if ((child as any).geometry) {
        (child as any).geometry.dispose()
      }
      if ((child as any).material) {
        if (Array.isArray((child as any).material)) {
          (child as any).material.forEach((mat: any) => {
            if (mat.map) mat.map.dispose()
            mat.dispose()
          })
        } else {
          if ((child as any).material.map) {
            (child as any).material.map.dispose()
          }
          (child as any).material.dispose()
        }
      }
    }
    scene = null as any
  }
  
  // 清理引用
  containerRef.value = null
  canvasRef.value = null
  floatingIcons.value = []
})
</script>

<style scoped lang="scss">
.dynamic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f4b 50%, #2d3561 100%);

  .bg-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .floating-icons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .floating-icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: floatIcon 6s ease-in-out infinite;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

        .icon-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #1E9CFF, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &:nth-child(1) {
          .icon-image {
            filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.3));
          }
          animation-delay: 0s;
          width: 200px;
          height: 200px;
          background: none;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }

        &:nth-child(2) {
          .icon-image {
            filter: brightness(1.1) drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
          }
          animation-delay: 4.5s;
          width: 200px;
          height: 200px;
          background: none;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }
      }
  }
}

@keyframes floatIcon {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

// 移动端适配
@media (max-width: 768px) {
  .dynamic-background {
    .floating-icons {
      .floating-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;

        .icon-text {
          font-size: 16px;
        }

        &:nth-child(1) {
          width: 100px;
          height: 100px;
          background: none;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }
        &:nth-child(2) {
          width: 100px;
          height: 100px;
          background: none;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
