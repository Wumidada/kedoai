<template>
  <div class="home-container">
    <!-- 动态背景画布 -->
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    
    <SiteNav active-key="home" />

    <!-- 首屏 Hero 区 - 全新设计 -->
    <section class="hero-section-new">
      <!-- Three.js 动态背景 -->
      <DynamicBackground :config="backgroundConfig" />
      <div class="hero-content-new">
        <div class="hero-text-new">

          <h1 class="hero-title-new">
            <span class="title-line">硅基时代</span>
            <span class="title-line highlight">迎接你的数字员工</span>
          </h1>

          <div class="hero-actions-new">
            <a href="#/board/smartBox" class="btn-primary-new">
              <span>立即体验</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#/kedoBot-demo" class="btn-secondary-new">
              <span>查看演示</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </a>
          </div>
          <div class="hero-stats-new">
            <div class="stat-item-new" v-for="(stat, index) in heroStats" :key="index">
              <div class="stat-number-new">{{ stat.number }}</div>
              <div class="stat-label-new">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="hero-visual-new">
          <div class="visual-container">
            <div class="floating-card card-1">
              <div class="card-icon ai-agent-icon">
                <img src="@/assets/images/AI 智能体.svg" alt="AI 智能体" width="180" height="180" />
              </div>
              <div class="card-text">AI 智能体</div>
            </div>
            <div class="floating-card card-2">
              <div class="card-content">
                <div class="card-text">实时响应</div>
                <div class="card-icon ai-agent-icon"><img src="@/assets/images/实时响应.svg" alt="实时响应" width="180" height="180" /></div>
              </div>
            </div>
            <div class="floating-card card-3">
              <div class="card-icon ai-agent-icon"><img src="@/assets/images/安全可靠盾牌形状.svg" alt="安全可靠" width="180" height="180" /></div>
              <div class="card-text">安全可靠</div>
            </div>
            <div class="central-visual">
              <div class="orbit-ring ring-1"></div>
              <div class="orbit-ring ring-2"></div>
              <div class="orbit-ring ring-3"></div>
              <div class="core-circle">
                <span class="core-text">Kedo</span>
                <div class="core-glow"></div>
                <div class="core-shine"></div>
                <div class="core-highlight"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" :class="{ 'hidden': isScrollIndicatorHidden }">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>

    <!-- 核心能力展示 -->
    <section class="capabilities-section" id="capabilities">
      <div class="capabilities-bg">
        <div class="capabilities-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/科技_.svg" alt="科技装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/员工__.svg" alt="员工装饰" class="decoration-svg">
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header-new" v-scroll-reveal>
          <span class="section-tag">核心能力</span>
          <h2 class="section-title-new">KedoMind——OPC智能数字员工</h2>
          <p class="section-desc-new">KedoMind 以全栈自研技术实现端到端自主决策与深度自主执行，赋能千行百业，打造中国版"数字员工"操作系统，重新定义智能时代生产力。</p>
        </div>
        <div class="capabilities-grid-new">
          <div 
            v-for="(cap, index) in capabilities" 
            :key="index" 
            :class="['capability-card-new']"
            v-scroll-reveal="{ delay: index * 100 }"
            @mouseenter="activeCapability = index"
            @mouseleave="activeCapability = null"
          >
            <div class="card-glow" :class="{ 'active': activeCapability === index }"></div>
            <div class="card-content">
              <img 
                :src="cap.icon" 
                :alt="cap.title" 
                loading="lazy"
                decoding="async"
                :width="120"
                :height="120"
                class="capability-icon"
                v-lazy-load
              />
              <h3 class="card-title">{{ cap.title }}</h3>
              <p class="card-description">{{ cap.description }}</p>
              <div class="card-features">
                <span v-for="(feature, fIndex) in cap.features" :key="fIndex" class="feature-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品生态 -->
    <section class="products-section" id="products">
      <div class="products-bg">
        <div class="products-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="products-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/火箭.svg" alt="火箭装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/知识___.svg" alt="知识装饰" class="decoration-svg">
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header-new" v-scroll-reveal>
          <span class="section-tag">产品矩阵</span>
          <h2 class="section-title-new">完整的产品生态</h2>
          <p class="section-desc-new">覆盖企业智能化转型的全链路需求</p>
        </div>
        <div class="products-showcase">
          <div class="product-showcase-item" v-for="(product, index) in products" :key="index" v-scroll-reveal="{ delay: index * 150 }">
            <div class="showcase-content" :class="{ 'reverse': index % 2 === 1 }">
              <div class="showcase-text">
                <div class="product-tag">{{ product.tag }}</div>
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-desc">{{ product.description }}</p>
                <ul class="product-features">
                  <li v-for="(feature, fIndex) in product.features" :key="fIndex">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
                <a :href="product.link" class="product-link" target="_blank" rel="noopener noreferrer">
                  了解更多
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div class="showcase-visual">
                <img 
                  v-if="product.image"
                  :src="product.image" 
                  :alt="product.name" 
                  class="product-image" 
                  loading="lazy"
                  decoding="async"
                />
                <div class="visual-card" v-else>
                  <div class="card-bg" :style="{ background: product.gradient }"></div>
                  <div class="card-content-center">
                    <span class="product-icon">{{ product.icon }}</span>
                    <span class="product-short">{{ product.shortName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 场景方案 -->
    <section class="scenarios-section-new" id="scenarios">
      <div class="scenarios-bg">
        <div class="scenarios-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="section-container">
        <div class="scenario-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/场景svg1.svg" alt="场景装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/场景svg2.svg" alt="场景装饰" class="decoration-svg">
          </div>
        </div>
        <div class="section-header-new" v-scroll-reveal>
          <span class="section-tag">场景方案</span>
          <h2 class="section-title-new">赋能千行百业</h2>
          <p class="section-desc-new">为不同业务场景提供定制化的智能解决方案</p>
        </div>
        <div class="scenarios-tabs">
          <div 
            v-for="(scenario, index) in scenarios" 
            :key="index"
            class="scenario-tab"
            :class="{ 'active': activeScenario === index }"
            @click="activeScenario = index"
          >
            <span class="tab-icon">{{ scenario.icon }}</span>
            <span class="tab-name">{{ scenario.name }}</span>
          </div>
        </div>
        <div class="scenario-content-wrapper">
          <transition name="fade-slide" mode="out-in">
            <div class="scenario-panel" :key="activeScenario">
              <div class="panel-content">
                <div class="panel-text">
                  <div class="scenario-tag" v-if="activeScenario === 0">营销智能</div>
                  <div class="scenario-tag" v-else-if="activeScenario === 1">技术支持</div>
                  <div class="scenario-tag" v-else-if="activeScenario === 2">管理决策</div>
                  <h3 class="panel-title">{{ scenarios[activeScenario].title }}</h3>
                  <p class="panel-desc">{{ scenarios[activeScenario].description }}</p>
                  <div class="panel-features">
                    <div v-for="(feature, fIndex) in scenarios[activeScenario].features" :key="fIndex" class="panel-feature">
                      <div class="feature-icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div class="feature-text-box">
                        <h4>{{ feature.title }}</h4>
                        <p>{{ feature.desc }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="panel-buttons">
                    <a :href="`#/agent/${getAgentId(activeScenario)}`" class="panel-btn">
                      立即对话
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </a>
                    <a href="#/scenarios" class="panel-btn secondary">
                      查看详情
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="panel-visual">
                  <div class="scenario-visual-card" v-if="activeScenario === 0" style="background: rgba(255,255,255,0.9); border: 1px solid rgba(186,220,255,0.5); box-shadow: 0 2px 14px rgba(30,156,255,0.08);">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20marketing%20dashboard&image_size=landscape_16_9" alt="AI营销智能体" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;">
                  </div>
                  <div class="scenario-visual-card" v-else-if="activeScenario === 1" style="background: rgba(255,255,255,0.9); border: 1px solid rgba(186,220,255,0.5); box-shadow: 0 2px 14px rgba(30,156,255,0.08);">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=programmer%20coding&image_size=landscape_16_9" alt="7×24小时程序员" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;">
                  </div>
                  <div class="scenario-visual-card" v-else-if="activeScenario === 2" style="background: rgba(255,255,255,0.9); border: 1px solid rgba(186,220,255,0.5); box-shadow: 0 2px 14px rgba(30,156,255,0.08);">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20decision%20dashboard&image_size=landscape_16_9" alt="老板的智能决策者" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;">
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- 数据统计展示 -->
    <section class="stats-section" id="stats">
      <div class="stats-bg">
        <div class="stats-gradient"></div>
        <div class="stats-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="stats-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/场景svg1.svg" alt="场景装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/场景svg2.svg" alt="场景装饰" class="decoration-svg">
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="stats-grid">
          <div 
            v-for="(stat, index) in statsData" 
            :key="index" 
            class="stat-card"
            v-scroll-reveal="{ delay: index * 100 }"
          >
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-number-wrapper">
              <span class="stat-prefix" v-if="stat.prefix">{{ stat.prefix }}</span>
              <span class="stat-value" :data-target="stat.value">{{ stat.displayValue }}</span>
              <span class="stat-suffix" v-if="stat.suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-name">{{ stat.name }}</div>
            <div class="stat-desc">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 安全防线 -->
    <section ref="securitySectionRef" class="security-section-new" id="security">
      <Transition name="security-shield">
        <div
          v-if="showSecurityShield"
          class="security-shield-overlay"
          :class="{ 'is-fading': shieldFading }"
          aria-hidden="true"
        >
          <div class="shield-backdrop">
            <div class="shield-spotlight"></div>
          </div>
          <div class="shield-stage">
            <div class="shield-3d-wrap">
              <div class="shield-orbit orbit-outer"></div>
              <div class="shield-orbit orbit-inner"></div>
              <div class="shield-green-aura"></div>
              <div class="lens-flare flare-h"></div>
              <svg class="shield-3d-svg" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="metalBrush" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
                  </pattern>
                  <linearGradient id="metalOuter" x1="15%" y1="5%" x2="85%" y2="95%">
                    <stop offset="0%" stop-color="#dce8ef"/>
                    <stop offset="18%" stop-color="#a8bcc8"/>
                    <stop offset="45%" stop-color="#6d8494"/>
                    <stop offset="78%" stop-color="#4a6272"/>
                    <stop offset="100%" stop-color="#2e4252"/>
                  </linearGradient>
                  <linearGradient id="metalBevel" x1="50%" y1="0%" x2="50%" y2="50%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.72)"/>
                    <stop offset="55%" stop-color="rgba(255,255,255,0.18)"/>
                    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                  </linearGradient>
                  <linearGradient id="metalBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#7a929e"/>
                    <stop offset="100%" stop-color="#4a6270"/>
                  </linearGradient>
                  <linearGradient id="energyCore" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stop-color="rgba(0,255,200,0.42)"/>
                    <stop offset="45%" stop-color="rgba(0,255,160,0.28)"/>
                    <stop offset="100%" stop-color="rgba(0,240,180,0.32)"/>
                  </linearGradient>
                  <radialGradient id="corePulse" cx="50%" cy="40%" r="48%">
                    <stop offset="0%" stop-color="rgba(120,255,220,0.55)"/>
                    <stop offset="45%" stop-color="rgba(0,255,180,0.28)"/>
                    <stop offset="100%" stop-color="rgba(0,255,136,0)"/>
                  </radialGradient>
                  <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#5ffbff"/>
                    <stop offset="30%" stop-color="#00ffbb"/>
                    <stop offset="65%" stop-color="#00ffee"/>
                    <stop offset="100%" stop-color="#00ffaa"/>
                  </linearGradient>
                  <linearGradient id="circuitNeon" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stop-color="#c8ffe8"/>
                    <stop offset="100%" stop-color="#00ff99"/>
                  </linearGradient>
                  <radialGradient id="rivetGrad" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stop-color="#eef6fa"/>
                    <stop offset="45%" stop-color="#9eb4c2"/>
                    <stop offset="100%" stop-color="#4a6270"/>
                  </radialGradient>
                  <filter id="greenBloom" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="edgeBloom" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="shieldShadow" x="-35%" y="-25%" width="170%" height="170%">
                    <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#00ffbb" flood-opacity="0.5"/>
                    <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.25"/>
                  </filter>
                </defs>
                <g filter="url(#shieldShadow)" class="shield-body-group">
                  <path
                    class="shield-metal-base"
                    d="M200 24 C275 24 336 56 354 88 L364 218 C364 305 310 382 200 442 C90 382 36 305 36 218 L46 88 C64 56 125 24 200 24 Z"
                    fill="url(#metalOuter)"
                    stroke="#3a5260"
                    stroke-width="2"
                  />
                  <path
                    class="shield-metal-texture"
                    d="M200 24 C275 24 336 56 354 88 L364 218 C364 305 310 382 200 442 C90 382 36 305 36 218 L46 88 C64 56 125 24 200 24 Z"
                    fill="url(#metalBrush)"
                    opacity="0.85"
                  />
                  <path
                    class="shield-metal-highlight"
                    d="M200 24 C275 24 336 56 354 88 L364 218 C364 305 310 382 200 442 C90 382 36 305 36 218 L46 88 C64 56 125 24 200 24 Z"
                    fill="url(#metalBevel)"
                    opacity="0.78"
                  />
                  <path
                    class="shield-bezel"
                    d="M200 46 C258 46 312 70 326 94 L334 212 C334 288 290 358 200 412 C110 358 66 288 66 212 L74 94 C88 70 142 46 200 46 Z"
                    fill="url(#metalBezel)"
                    stroke="#8aa4b4"
                    stroke-width="1.5"
                  />
                  <path
                    class="shield-glass"
                    d="M200 58 C250 58 298 78 310 98 L316 208 C316 278 278 342 200 396 C122 342 84 278 84 208 L90 98 C102 78 150 58 200 58 Z"
                    fill="url(#energyCore)"
                  />
                  <ellipse cx="200" cy="195" rx="95" ry="110" fill="url(#corePulse)" class="shield-core-pulse"/>
                  <path
                    class="shield-rim"
                    d="M200 24 C275 24 336 56 354 88 L364 218 C364 305 310 382 200 442 C90 382 36 305 36 218 L46 88 C64 56 125 24 200 24 Z"
                    fill="none"
                    stroke="url(#edgeGlow)"
                    stroke-width="3"
                    filter="url(#edgeBloom)"
                  />
                  <path
                    d="M200 58 C250 58 298 78 310 98 L316 208 C316 278 278 342 200 396 C122 342 84 278 84 208 L90 98 C102 78 150 58 200 58 Z"
                    fill="none"
                    stroke="rgba(0,255,220,0.35)"
                    stroke-width="1.2"
                  />
                  <g class="shield-rivets">
                    <circle cx="200" cy="38" r="5.5" fill="url(#rivetGrad)" stroke="#00ffee" stroke-width="1"/><circle cx="200" cy="38" r="2" fill="rgba(0,255,200,0.85)"/>
                    <circle cx="128" cy="66" r="4.5" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/><circle cx="272" cy="66" r="4.5" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/>
                    <circle cx="68" cy="132" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/><circle cx="332" cy="132" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/>
                    <circle cx="52" cy="212" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/><circle cx="348" cy="212" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/>
                    <circle cx="118" cy="338" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/><circle cx="282" cy="338" r="4" fill="url(#rivetGrad)" stroke="#a8c0cc" stroke-width="0.8"/>
                    <circle cx="200" cy="424" r="5" fill="url(#rivetGrad)" stroke="#00ffee" stroke-width="1"/><circle cx="200" cy="424" r="2" fill="rgba(0,255,200,0.75)"/>
                  </g>
                  <g class="shield-circuits" stroke="url(#circuitNeon)" stroke-width="1.8" filter="url(#greenBloom)">
                    <polygon class="circuit-hex" points="200,152 230,169 230,203 200,220 170,203 170,169" fill="rgba(0,255,180,0.22)" stroke-width="2.2"/>
                    <polygon points="200,165 218,176 218,196 200,207 182,196 182,176" fill="rgba(0,255,200,0.1)" stroke-width="1.2" opacity="0.85"/>
                    <line class="circuit-line" x1="200" y1="152" x2="200" y2="92"/>
                    <line class="circuit-line" x1="230" y1="169" x2="296" y2="126"/>
                    <line class="circuit-line" x1="230" y1="203" x2="304" y2="232"/>
                    <line class="circuit-line" x1="200" y1="220" x2="200" y2="302"/>
                    <line class="circuit-line" x1="170" y1="203" x2="96" y2="232"/>
                    <line class="circuit-line" x1="170" y1="169" x2="104" y2="126"/>
                    <line x1="115" y1="178" x2="285" y2="178" stroke-dasharray="5 7" opacity="0.75"/>
                    <line x1="125" y1="208" x2="275" y2="208" stroke-dasharray="3 9" opacity="0.6"/>
                    <line x1="138" y1="238" x2="262" y2="238" stroke-dasharray="7 5" opacity="0.65"/>
                    <line x1="152" y1="268" x2="248" y2="268" stroke-dasharray="2 10" opacity="0.5"/>
                    <rect x="186" y="176" width="28" height="28" rx="3" fill="rgba(0,255,180,0.15)" stroke-width="1.2"/>
                    <circle cx="200" cy="190" r="7" fill="rgba(0,255,200,0.35)" stroke="#a8ffe0" stroke-width="1.5" class="shield-lock-dot"/>
                    <path d="M155 118 L172 118 L172 134" stroke-width="1.3" fill="none" opacity="0.8"/>
                    <path d="M245 118 L228 118 L228 134" stroke-width="1.3" fill="none" opacity="0.8"/>
                    <path d="M155 312 L172 312 L172 296" stroke-width="1.3" fill="none" opacity="0.8"/>
                    <path d="M245 312 L228 312 L228 296" stroke-width="1.3" fill="none" opacity="0.8"/>
                  </g>
                  <line class="shield-flare-line" x1="55" y1="212" x2="345" y2="212" stroke="#5ffbff" stroke-width="1.4" opacity="0.7"/>
                  <line class="shield-flare-line" x1="75" y1="217" x2="325" y2="217" stroke="#ffffff" stroke-width="0.7" opacity="0.55"/>
                </g>
              </svg>
              <div class="shield-reflection"></div>
            </div>
            <div class="hud-footer">
              <div class="hud-title">安全护盾已激活</div>
              <div class="hud-progress">
                <div class="hud-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <div class="security-bg">
        <div class="security-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="security-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/场景svg1.svg" alt="场景装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/场景svg2.svg" alt="场景装饰" class="decoration-svg">
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header-new" v-scroll-reveal>
          <span class="section-tag">安全保障</span>
          <h2 class="section-title-new">多维防护体系</h2>
          <p class="section-desc-new">筑牢 OpenClaw 安全防线，全方位保护您的数据资产</p>
        </div>
        <div class="security-grid">
          <div 
            v-for="(item, index) in securityFeatures" 
            :key="index" 
            class="security-card-new"
            v-scroll-reveal="{ delay: index * 100 }"
          >
            <div class="security-icon-wrapper">
              <div class="icon-bg" :style="{ background: item.bgColor }">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="item.iconColor" stroke-width="2">
                  <path v-for="(path, pIndex) in item.iconPaths" :key="pIndex" :d="path"/>
                </svg>
              </div>
            </div>
            <h3 class="security-title-new">{{ item.title }}</h3>
            <p class="security-desc-new">{{ item.description }}</p>
            <div class="security-mock">
              <div class="mock-header">
                <div class="mock-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="mock-title-text">{{ item.mockTitle }}</span>
              </div>
              <div class="mock-body">
                <div class="mock-content" v-html="item.mockContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户案例/合作伙伴 -->
    <section class="partners-section" id="partners">
      <div class="partners-bg">
        <div class="partners-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="partners-decorations">
          <div class="decoration-left">
            <img src="@/assets/images/场景svg1.svg" alt="场景装饰" class="decoration-svg">
          </div>
          <div class="decoration-right">
            <img src="@/assets/images/场景svg2.svg" alt="场景装饰" class="decoration-svg">
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header-new" v-scroll-reveal>
          <span class="section-tag">合作伙伴</span>
          <h2 class="section-title-new">信赖之选</h2>
          <p class="section-desc-new">众多行业领先企业正在使用 Kedo 产品</p>
        </div>
        <div class="partners-marquee" v-scroll-reveal>
          <div class="marquee-track">
            <div class="partner-logo" v-for="(partner, index) in partners" :key="`a-${index}`">
              <span class="partner-name">{{ partner }}</span>
            </div>
            <div class="partner-logo" v-for="(partner, index) in partners" :key="`b-${index}`">
              <span class="partner-name">{{ partner }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="cta-section" id="cta">
      <div class="cta-bg">
        <div class="cta-gradient"></div>
        <div class="cta-pattern"></div>
      </div>
      <div class="section-container">
        <div class="cta-content" v-scroll-reveal>
          <h2 class="cta-title">开启智能化转型之旅</h2>
          <p class="cta-desc">立即体验 Kedo 产品，让 AI 成为您的得力助手</p>
          <div class="cta-actions">
            <a href="#/board/smartBox" class="cta-btn primary">
              免费试用
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="cta-btn secondary coming-soon-btn">
              联系客服
              <ComingSoonBadge />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 客服功能模块 -->
    <div class="customer-service coming-soon-widget">
      <div class="service-button">
        <div class="service-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <div class="online-indicator"></div>
        </div>
        <span class="service-text">在线客服</span>
        <div class="service-panel">
          <div class="qrcode-container">
            <div class="qrcode-placeholder">
              <div class="qrcode-content">
                <div class="qrcode-grid"></div>
                <div class="qrcode-text">客服二维码</div>
                <div class="qrcode-hint">扫描二维码联系客服</div>
              </div>
            </div>
          </div>
          <div class="service-hours">服务时间：9:00-18:00</div>
        </div>
      </div>
    </div>

    <!-- 底部 Footer -->
    <footer class="footer-new">
      <div class="footer-container">
        <div class="footer-main">
          <div class="footer-brand">
            <img src="@/assets/logo/logo-kedo.png" alt="Kedo Logo" class="footer-logo-new" loading="lazy" />
            <p class="footer-desc">Kedo —— 智能边缘计算的领导者，为企业提供高效、可靠的 OPC 解决方案</p>
            <div class="footer-social">
              <span class="social-link coming-soon-item" title="即将上线">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                </svg>
              </span>
              <span class="social-link coming-soon-item" title="即将上线">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.579-.18-.401-.649.386-1.02.425-1.899.003-2.525-.793-1.17-2.966-1.109-5.419-.031 0 0-.777.34-.578-.274.381-1.205.324-2.213-.27-2.8-1.347-1.327-4.928.047-8.001 3.07C1.353 10.476 0 12.555 0 14.359c0 3.457 4.439 5.56 8.783 5.56 5.691 0 9.479-3.307 9.479-5.929 0-1.587-1.339-2.486-2.203-2.741zm.814-5.212c-.643-.756-1.595-1.125-2.604-1.054-.349.025-.606.327-.579.677.026.349.328.605.678.58.608-.044 1.176.178 1.568.639.392.461.536 1.058.404 1.681-.083.396.172.79.568.874.396.084.79-.171.874-.567.218-1.03-.015-2.075-.649-2.858l-.27-.172zm2.155-2.229C19.91 1.282 18.37.427 16.678.333c-.35-.02-.655.244-.674.593-.02.35.244.655.593.675 1.27.07 2.454.72 3.238 1.792.783 1.072 1.018 2.403.653 3.747-.104.381.12.777.502.881.381.103.777-.121.881-.502.468-1.726.163-3.518-.856-4.914l-.168-.228z"/>
                </svg>
              </span>
              <span class="social-link coming-soon-item" title="即将上线">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="footer-links-grid">
            <div class="footer-column-new">
              <h4 class="column-title">产品</h4>
              <ul class="column-links">
                <li><a href="#/board/kedoChat" target="_blank" rel="noopener noreferrer">KedoChat</a></li>
                <li><a href="#/board/kedoKnowledgeBase" target="_blank" rel="noopener noreferrer">Kedo知识库</a></li>
                <li><a href="#/board/kedoAiFlow" target="_blank" rel="noopener noreferrer">KedoAiFlow</a></li>
                <li><a href="#/board/kedoMind" target="_blank" rel="noopener noreferrer">KedoMind</a></li>
                <li><a href="#/kedoBot-demo">KedoBot</a></li>
                <li><a href="#/board/kedoClaw" target="_blank" rel="noopener noreferrer">KedoClaw</a></li>
              </ul>
            </div>
            <div class="footer-column-new">
              <h4 class="column-title">解决方案</h4>
              <ul class="column-links">
                <li><a href="#/scenarios">AI营销智能体</a></li>
                <li><a href="#/scenarios">7×24程序员</a></li>
                <li><a href="#/scenarios">老板数字助手</a></li>
                <li><a href="#/scenarios">智能客服</a></li>
              </ul>
            </div>
            <div class="footer-column-new">
              <h4 class="column-title">资源</h4>
              <ul class="column-links">
                <li><span class="coming-soon-link">文档中心 <ComingSoonBadge /></span></li>
                <li><span class="coming-soon-link">API 参考 <ComingSoonBadge /></span></li>
                <li><span class="coming-soon-link">技术博客 <ComingSoonBadge /></span></li>
                <li><span class="coming-soon-link">案例库 <ComingSoonBadge /></span></li>
              </ul>
            </div>
            <div class="footer-column-new">
              <h4 class="column-title">公司</h4>
              <ul class="column-links">
                <li><span class="coming-soon-link">关于我们 <ComingSoonBadge /></span></li>
                <li><span class="coming-soon-link">联系我们 <ComingSoonBadge /></span></li>
                <li><span class="coming-soon-link">加入我们 <ComingSoonBadge /></span></li>
                <li><a href="#/doc/privacyPolicy">隐私政策</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom-new">
          <p>Copyright © 2025 Kedo. 保留所有权利 | 
            <a href="#/doc/privacyPolicy">隐私政策</a> | 
            <a href="#/doc/useAgreement">服务条款</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import ComingSoonBadge from '@/components/nav/ComingSoonBadge.vue'
import SiteNav from '@/components/nav/SiteNav.vue'
import DynamicBackground from '@/components/DynamicBackground.vue'
import {
  RobotFilled,
  ThunderboltFilled,
  SafetyCertificateFilled,
} from "@ant-design/icons-vue"

// 滚动状态
const isScrollIndicatorHidden = ref(false)

// Hero 统计数据
const heroStats = [
  { number: '99.99%', label: '系统稳定性' },
  { number: '1000+', label: '企业客户' },
  { number: '7×24', label: '技术支持' }
]

// 动态背景配置
const backgroundConfig = {
  particleCount: 150,
  gradientColors: ['#0a0e27', '#1a1f4b', '#2d3561', '#0f172a'],
  animationSpeed: 1,
  enableMouseInteraction: true,
  enableParallax: true,
}

// 核心能力数据
const capabilities = [
  {
    icon: new URL('@/assets/images/云端环境.jpg', import.meta.url).href,
    title: '云端环境',
    description: '封装完整环境，无需本地配置，一键启动即可使用，大幅降低部署成本',
    features: ['一键部署', '弹性扩展', '高可用性']
  },
  {
    icon: new URL('@/assets/images/多人协作.jpg', import.meta.url).href,
    title: '在线协作',
    description: '多人同时在线，实时共享调试状态，提升团队协作效率',
    features: ['实时同步', '版本管理', '权限控制']
  },
  {
    icon: new URL('@/assets/images/丰富生态.jpg', import.meta.url).href,
    title: '丰富生态',
    description: '丰富的 OPC 工具集，轻松对接各类设备和数据系统',
    features: ['工具集成', 'API开放', '插件扩展']
  }
]

const activeCapability = ref<number | null>(null)

// 产品数据
const products = [
  {
    tag: '智能对话',
    name: 'KedoChat',
    shortName: 'Chat',
    description: '基于大语言模型的智能对话系统，支持多轮对话、知识问答、任务执行等多种场景，为企业提供7×24小时智能客服解决方案。',
    features: ['多轮对话理解', '知识库集成', '情感分析', '多渠道接入'],
    icon: '💬',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    link: '#/board/kedoChat',
    image: new URL('@/assets/images/kedochat首页.png', import.meta.url).href
  },
  {
    tag: '知识管理',
    name: 'Kedo知识库',
    shortName: 'KB',
    description: '企业级知识管理平台，支持多源数据接入、智能检索、知识图谱构建，让知识触手可及。',
    features: ['智能检索', '知识图谱', '多格式支持', '权限管理'],
    icon: '📚',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    link: '#/board/kedoKnowledgeBase',
    image: new URL('@/assets/images/kedo知识库首页.png', import.meta.url).href
  },
  {
    tag: '边缘计算',
    name: 'KedoBot',
    shortName: 'Bot',
    description: '智能边缘计算终端，为企业提供本地化的AI能力，确保数据安全和实时响应。',
    features: ['本地部署', '离线运行', '数据安全', '实时响应'],
    icon: '🦞',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    link: '#/kedoBot-demo',
    image: new URL('@/assets/images/kedoclaw一体机白.jpg', import.meta.url).href
  },
  {
    tag: '数字员工',
    name: 'KedoMind',
    shortName: 'Mind',
    description: 'OPC智能数字员工平台，以全栈自研技术实现端到端自主决策与深度自主执行。',
    features: ['自主决策', '任务执行', '学习能力', '多端协同'],
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    link: '#/board/kedoMind',
    image: new URL('@/assets/images/M1.jpg', import.meta.url).href
  }
]

// 场景方案数据
const scenarios = [
  {
    icon: '🎯',
    name: 'AI营销',
    title: 'AI营销智能体',
    description: '基于大数据与AI算法，为您提供个性化营销策略与智能产品推荐，提升营销转化率。',
    features: [
      { title: '个性化营销建议', desc: '基于用户画像的智能推荐' },
      { title: '智能产品推荐', desc: '精准匹配用户需求' },
      { title: '营销方案咨询', desc: 'AI驱动的策略优化' }
    ],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '💻',
    name: '程序员',
    title: '7×24小时程序员',
    description: '不间断的技术支持与开发服务，确保项目持续推进，降低人力成本。',
    features: [
      { title: '持续开发', desc: '全天候代码编写与调试' },
      { title: '技术支持', desc: '实时问题诊断与解决' },
      { title: '智能辅助', desc: '代码审查与优化建议' }
    ],
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    icon: '👔',
    name: '智能决策',
    title: '老板的智能决策者',
    description: '全方位的企业管理辅助，为决策提供数据支持，提升管理效率。',
    features: [
      { title: '数据分析', desc: '多维度业务数据洞察' },
      { title: '智能决策', desc: 'AI辅助的管理建议' },
      { title: '团队管理', desc: '人员与任务智能调度' }
    ],
    gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)'
  },
  {
    icon: '🎨',
    name: '前端开发',
    title: '前端开发工程师',
    description: '专业的前端开发服务，提供现代化的Web应用界面和交互体验。',
    features: [
      { title: '响应式设计', desc: '适配各种设备的界面设计' },
      { title: '性能优化', desc: '提升页面加载速度和用户体验' },
      { title: '交互设计', desc: '打造流畅的用户交互体验' }
    ],
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    icon: '🏗️',
    name: '后端架构',
    title: '后端架构师',
    description: '专业的后端系统设计和开发，确保系统的可扩展性和稳定性。',
    features: [
      { title: 'API设计', desc: '构建RESTful和GraphQL API' },
      { title: '数据库设计', desc: '优化数据存储和查询性能' },
      { title: '系统架构', desc: '设计可扩展的微服务架构' }
    ],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '📱',
    name: '移动开发',
    title: '移动应用开发者',
    description: '专业的移动应用开发服务，为iOS和Android平台打造高质量应用。',
    features: [
      { title: '原生开发', desc: 'iOS和Android原生应用开发' },
      { title: '跨平台开发', desc: 'React Native和Flutter应用开发' },
      { title: '应用发布', desc: '应用商店发布和推广' }
    ],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '🤖',
    name: 'AI工程',
    title: 'AI工程师',
    description: '专业的人工智能开发服务，为您的业务提供智能化解决方案。',
    features: [
      { title: '模型训练', desc: '构建和训练机器学习模型' },
      { title: 'AI集成', desc: '将AI能力集成到现有系统' },
      { title: '自然语言处理', desc: '构建智能对话系统和文本分析' }
    ],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    icon: '🚀',
    name: 'DevOps',
    title: 'DevOps自动化工程师',
    description: '专业的DevOps服务，自动化部署和监控，确保系统的可靠性和稳定性。',
    features: [
      { title: 'CI/CD', desc: '构建自动化持续集成和部署流程' },
      { title: '基础设施自动化', desc: '使用Terraform和Ansible管理基础设施' },
      { title: '监控告警', desc: '设置系统监控和告警机制' }
    ],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    icon: '⚡',
    name: '原型开发',
    title: '快速原型开发师',
    description: '快速构建产品原型，验证产品概念和用户需求。',
    features: [
      { title: '快速POC', desc: '快速构建概念验证原型' },
      { title: 'MVP开发', desc: '构建最小可行产品' },
      { title: '用户测试', desc: '基于原型进行用户测试' }
    ],
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    icon: '💎',
    name: '资深开发',
    title: '资深开发工程师',
    description: '专业的资深开发服务，解决复杂的技术问题和架构挑战。',
    features: [
      { title: '复杂实现', desc: '解决复杂的技术问题' },
      { title: '架构决策', desc: '提供技术架构和设计建议' },
      { title: '代码审查', desc: '进行高质量的代码审查' }
    ],
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
  },
  {
    icon: '🔧',
    name: 'Filament',
    title: 'Filament优化专家',
    description: '专业的Filament PHP admin优化服务，提升管理后台的用户体验和性能。',
    features: [
      { title: '表单优化', desc: '优化Filament表单和资源' },
      { title: 'UI改进', desc: '提升管理后台的用户界面' },
      { title: '性能优化', desc: '提高管理后台的性能' }
    ],
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  },
  {
    icon: '🔒',
    name: '安全工程',
    title: '安全工程师',
    description: '专业的安全服务，确保系统和应用的安全性。',
    features: [
      { title: '威胁建模', desc: '识别和评估系统安全威胁' },
      { title: '安全代码审查', desc: '检查代码中的安全漏洞' },
      { title: '安全架构', desc: '设计安全的系统架构' }
    ],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '⚡',
    name: '优化架构',
    title: '自主优化架构师',
    description: '专业的AI系统优化服务，提升系统的性能和成本效益。',
    features: [
      { title: 'LLM路由', desc: '智能选择和路由LLM请求' },
      { title: '成本优化', desc: '降低AI系统的运行成本' },
      { title: '影子测试', desc: '进行系统性能和可靠性测试' }
    ],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '🔩',
    name: '嵌入式',
    title: '嵌入式固件工程师',
    description: '专业的嵌入式系统开发服务，为IoT设备和嵌入式系统提供固件。',
    features: [
      { title: '裸机编程', desc: '编写底层硬件驱动和固件' },
      { title: 'RTOS', desc: '使用实时操作系统开发' },
      { title: 'IoT设备', desc: '为物联网设备开发固件' }
    ],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '🚨',
    name: '事件响应',
    title: '事件响应指挥官',
    description: '专业的事件响应服务，管理和处理系统故障和安全事件。',
    features: [
      { title: '事件管理', desc: '协调和管理系统故障响应' },
      { title: '事后分析', desc: '分析事件原因和改进措施' },
      { title: '待命服务', desc: '提供24/7事件响应支持' }
    ],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    icon: '⛓️',
    name: '智能合约',
    title: 'Solidity智能合约工程师',
    description: '专业的区块链开发服务，为以太坊和其他区块链平台编写智能合约。',
    features: [
      { title: '合约开发', desc: '编写安全的Solidity智能合约' },
      { title: ' gas优化', desc: '优化合约的gas消耗' },
      { title: 'DeFi开发', desc: '构建去中心化金融应用' }
    ],
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    icon: '📚',
    name: '技术写作',
    title: '技术作家',
    description: '专业的技术文档编写服务，为项目提供清晰准确的技术文档。',
    features: [
      { title: 'API文档', desc: '编写API参考文档' },
      { title: '用户指南', desc: '创建用户使用指南' },
      { title: '教程', desc: '编写技术教程和示例' }
    ],
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
  },
  {
    icon: '🎯',
    name: '威胁检测',
    title: '威胁检测工程师',
    description: '专业的安全威胁检测服务，识别和应对系统安全威胁。',
    features: [
      { title: 'SIEM规则', desc: '配置安全信息和事件管理规则' },
      { title: '威胁狩猎', desc: '主动搜索系统中的安全威胁' },
      { title: 'ATT&CK映射', desc: '使用MITRE ATT&CK框架评估威胁' }
    ],
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  },
  {
    icon: '💬',
    name: '小程序',
    title: '微信小程序开发者',
    description: '专业的微信小程序开发服务，为微信生态系统构建应用。',
    features: [
      { title: '小程序开发', desc: '构建微信小程序' },
      { title: '支付集成', desc: '集成微信支付功能' },
      { title: '生态整合', desc: '与微信生态系统整合' }
    ],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '👁️',
    name: '代码审查',
    title: '代码审查员',
    description: '专业的代码审查服务，确保代码质量和安全性。',
    features: [
      { title: '代码质量', desc: '评估代码质量和可维护性' },
      { title: '安全审查', desc: '检查代码中的安全漏洞' },
      { title: '架构审查', desc: '评估代码架构和设计' }
    ],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '🗄️',
    name: '数据库',
    title: '数据库优化师',
    description: '专业的数据库优化服务，提升数据库性能和可靠性。',
    features: [
      { title: '架构设计', desc: '设计高效的数据库架构' },
      { title: '查询优化', desc: '优化数据库查询性能' },
      { title: '索引策略', desc: '设计有效的索引策略' }
    ],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '🌿',
    name: 'Git工作流',
    title: 'Git工作流大师',
    description: '专业的Git工作流管理服务，确保代码版本控制的高效和规范。',
    features: [
      { title: '分支策略', desc: '设计有效的Git分支策略' },
      { title: '提交规范', desc: '执行规范化的Git提交' },
      { title: '历史管理', desc: '维护清晰的Git历史' }
    ],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    icon: '🏛️',
    name: '软件架构',
    title: '软件架构师',
    description: '专业的软件架构设计服务，为项目提供合理的架构方案。',
    features: [
      { title: '系统设计', desc: '设计可扩展的系统架构' },
      { title: '领域建模', desc: '进行领域驱动设计' },
      { title: '权衡分析', desc: '评估技术选择的利弊' }
    ],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    icon: '🛡️',
    name: 'SRE',
    title: 'SRE工程师',
    description: '专业的站点可靠性工程服务，确保系统的可靠性和性能。',
    features: [
      { title: 'SLOs', desc: '定义和监控服务水平目标' },
      { title: '错误预算', desc: '管理系统错误预算' },
      { title: '可观测性', desc: '提升系统的可观测性' }
    ],
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    icon: '🧬',
    name: '数据修复',
    title: 'AI数据修复工程师',
    description: '专业的AI数据修复服务，确保数据的质量和可靠性。',
    features: [
      { title: '自修复管道', desc: '构建自动修复数据的管道' },
      { title: '气隙SLM', desc: '在隔离环境中管理语言模型' },
      { title: '语义聚类', desc: '使用语义技术组织数据' }
    ],
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
  },
  {
    icon: '🔧',
    name: '数据工程',
    title: '数据工程师',
    description: '专业的数据工程服务，构建和维护数据管道和数据湖。',
    features: [
      { title: '数据管道', desc: '构建和维护数据处理管道' },
      { title: '数据湖', desc: '设计和管理数据湖架构' },
      { title: 'ETL', desc: '开发提取、转换和加载流程' }
    ],
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  },
  {
    icon: '📱',
    name: 'Bilibili',
    title: 'Bilibili内容策略师',
    description: '专业的Bilibili内容策略服务，帮助您在B站上推广品牌和内容。',
    features: [
      { title: 'UP主成长', desc: '帮助UP主快速成长' },
      { title: '弹幕文化', desc: '利用弹幕文化增强互动' },
      { title: '算法优化', desc: '优化内容推荐算法' }
    ],
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
  }
]

const activeScenario = ref(0)

// 根据场景索引获取智能体ID
const getAgentId = (index) => {
  const agentIds = ['bilibili-content-strategist', 'frontend-developer', 'backend-architect', 'frontend-developer', 'backend-architect', 'ai-engineer', 'ai-engineer', 'devops-automator', 'ui-designer', 'frontend-developer', 'image-prompt-engineer', 'ai-engineer', 'ai-engineer', 'frontend-developer', 'ai-engineer', 'ai-engineer', 'technicalwriter', 'ai-engineer', 'ai-engineer', 'ai-engineer', 'data-engineer', 'ai-engineer', 'ai-engineer', 'devops-automator', 'ai-data-remediation-engineer', 'data-engineer', 'bilibili-content-strategist']
  return agentIds[index] || 'bilibili-content-strategist'
}

// 统计数据
const statsData = [
  { icon: '🏢', value: 1000, suffix: '+', name: '企业客户', description: '遍布各行业领域', displayValue: '1000' },
  { icon: '⚡', value: 99, suffix: '.99%', name: '系统稳定性', description: '高可用服务保障', displayValue: '99' },
  { icon: '🌍', value: 200, suffix: '+', name: '服务节点', description: '覆盖全球区域', displayValue: '200' },
  { icon: '⏱️', value: 76, prefix: '<', suffix: 'ms', name: '平均延迟', description: '极速响应体验', displayValue: '76' }
]

// 安全功能数据
const securityFeatures = [
  {
    title: '流量检测',
    description: '检测 OpenClaw 仿冒软件等恶意行为，检测内网是否部署了 OpenClaw',
    bgColor: '#e0f2fe',
    iconColor: '#0284c7',
    iconPaths: ['M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z', 'M12 8V16', 'M8 12H16'],
    mockTitle: '流量检测',
    mockContent: '<div class="mock-table"><div class="mock-row"><span>192.168.1.100</span><span class="warning">警告</span></div><div class="mock-row"><span>192.168.1.101</span><span class="success">正常</span></div></div>'
  },
  {
    title: '漏洞扫描',
    description: '支持检测 OpenClaw 相关漏洞，及时发现并修复安全隐患',
    bgColor: '#fef3c7',
    iconColor: '#d97706',
    iconPaths: ['M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z', 'M12 8V12L15 15'],
    mockTitle: '漏洞扫描',
    mockContent: '<div class="mock-list"><div class="mock-item warning"><span>⚠</span><span>OpenClaw 仿冒软件检测</span></div><div class="mock-item warning"><span>⚠</span><span>接口安全漏洞</span></div></div>'
  },
  {
    title: '资产测绘',
    description: '支持探测 OpenClaw 指纹，一键搜索，全面掌握资产分布',
    bgColor: '#d1fae5',
    iconColor: '#059669',
    iconPaths: ['M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z', 'M9 22V12H15V22'],
    mockTitle: '资产测绘',
    mockContent: '<div class="mock-table"><div class="mock-row"><span>OpenClaw 服务器</span><span class="success">在线</span></div><div class="mock-row"><span>OpenClaw 客户端</span><span class="success">在线</span></div></div>'
  },
  {
    title: '仿真蜜罐',
    description: '动态仿真 OpenClaw 龙虾控制台，诱捕攻击者，保护真实系统',
    bgColor: '#fce7f3',
    iconColor: '#db2777',
    iconPaths: ['M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z', 'M12 8V12', 'M12 16H12.01'],
    mockTitle: '仿真蜜罐',
    mockContent: '<div class="mock-honeypot"><div class="hp-icon">🦞</div><div class="hp-text">OpenClaw 控制台</div></div><div class="mock-activity"><div>10:30 检测到可疑访问</div><div>10:35 成功诱捕攻击者</div></div>'
  }
]

// 合作伙伴
const partners = [
  '华为', '阿里巴巴', '腾讯', '百度', '京东', '美团', '字节跳动', '小米',
  '滴滴', '网易', '携程', '拼多多', '快手', '哔哩哔哩', '知乎'
]

// 画布引用
const bgCanvas = ref<HTMLCanvasElement | null>(null)

// 滚动监听
const handleScroll = () => {
  isScrollIndicatorHidden.value = window.scrollY > 80
}

// 数字动画
const animateNumbers = () => {
  statsData.forEach((stat, index) => {
    const duration = 2000
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // 使用缓动函数使动画更自然
      const easeOutQuad = 1 - (1 - progress) * (1 - progress)
      const current = stat.value * easeOutQuad
      
      stat.displayValue = Math.floor(current).toString()
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        stat.displayValue = stat.value.toString()
      }
    }
    
    requestAnimationFrame(animate)
  })
}

// 动态背景
const initCanvas = () => {
  if (!bgCanvas.value) return
  const canvas = bgCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 优化：使用设备像素比
  const dpr = window.devicePixelRatio || 1
  
  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
  }
  resize()
  
  // 优化：节流 resize 事件
  let resizeTimeout: number | null = null
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(resize, 200)
  })

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    opacity: number
  }> = []

  // 优化：根据屏幕大小调整粒子数量
  const particleCount = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 10000))
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    })
  }

  let animationId: number
  let lastTime = 0
  
  // 优化：创建离屏 canvas，只创建一次
  const offscreenCanvas = document.createElement('canvas')
  offscreenCanvas.width = canvas.width
  offscreenCanvas.height = canvas.height
  const offscreenCtx = offscreenCanvas.getContext('2d')
  
  // 优化：根据帧率控制渲染
  const animate = (timestamp: number) => {
    // 限制帧率为 60fps
    if (timestamp - lastTime < 16.67) {
      animationId = requestAnimationFrame(animate)
      return
    }
    lastTime = timestamp

    // 优化：使用 clearRect 的最小范围
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
    
    if (offscreenCtx) {
      // 清除离屏画布
      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height)
      // 保存上下文状态
      offscreenCtx.save()
      // 只缩放一次
      offscreenCtx.scale(dpr, dpr)
      
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width / dpr) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height / dpr) p.vy *= -1

        offscreenCtx.beginPath()
        offscreenCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        offscreenCtx.fillStyle = `rgba(30, 156, 255, ${p.opacity})`
        offscreenCtx.fill()

        // 优化：限制连线计算数量
        particles.slice(i + 1, i + 8).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            offscreenCtx.beginPath()
            offscreenCtx.moveTo(p.x, p.y)
            offscreenCtx.lineTo(p2.x, p2.y)
            offscreenCtx.strokeStyle = `rgba(30, 156, 255, ${0.1 * (1 - dist / 120)})`
            offscreenCtx.stroke()
          }
        })
      })
      
      // 恢复上下文状态
      offscreenCtx.restore()
      
      // 一次性绘制到主画布
      ctx.drawImage(offscreenCanvas, 0, 0, canvas.width / dpr, canvas.height / dpr)
    }

    animationId = requestAnimationFrame(animate)
  }
  animate(0)

  return () => {
    // 清理动画
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
    
    // 清理事件监听器
    window.removeEventListener('resize', () => {})  
    
    // 清理定时器
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
      resizeTimeout = null
    }
    
    // 清理粒子数组
    particles.length = 0
    
    // 清理离屏canvas
    if (offscreenCanvas) {
      // 释放离屏canvas资源
      offscreenCanvas.width = 0
      offscreenCanvas.height = 0
    }
    
    // 清理画布引用
    if (bgCanvas.value) {
      bgCanvas.value.width = 0
      bgCanvas.value.height = 0
      bgCanvas.value = null
    }
  }
}

// 滚动显示指令
const vScrollReveal = {
  mounted(el: HTMLElement, binding: any) {
    const delay = binding.value?.delay || 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = `all 0.8s ease ${delay}ms`
    el.style.willChange = 'opacity, transform' // 提示浏览器优化
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 使用requestAnimationFrame确保动画流畅
          requestAnimationFrame(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(el)
  }
}

// 图片懒加载指令
const vLazyLoad = {
  mounted(el: HTMLElement) {
    const handleLoad = () => {
      el.classList.add('loaded')
    }
    
    // 类型断言为HTMLImageElement
    const imgEl = el as HTMLImageElement
    if (imgEl.complete) {
      handleLoad()
    } else {
      el.addEventListener('load', handleLoad)
    }
    
    // 清理
    return () => {
      el.removeEventListener('load', handleLoad)
    }
  }
}

// 安全防护盾牌动画
const securitySectionRef = ref<HTMLElement | null>(null)
const showSecurityShield = ref(false)
const shieldFading = ref(false)
let shieldTimer: ReturnType<typeof setTimeout> | null = null
let securityShieldObserver: IntersectionObserver | null = null

const clearShieldTimer = () => {
  if (shieldTimer) {
    clearTimeout(shieldTimer)
    shieldTimer = null
  }
}

const triggerSecurityShield = () => {
  if (showSecurityShield.value) return

  showSecurityShield.value = true
  shieldFading.value = false
  clearShieldTimer()

  shieldTimer = setTimeout(() => {
    shieldFading.value = true
    shieldTimer = setTimeout(() => {
      showSecurityShield.value = false
      shieldFading.value = false
      shieldTimer = null
    }, 800)
  }, 3000)
}

const initSecurityShieldObserver = () => {
  if (!securitySectionRef.value) return

  let wasInView = false
  securityShieldObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !wasInView) {
        triggerSecurityShield()
      }
      wasInView = entry.isIntersecting
    })
  }, { threshold: 0.25 })

  securityShieldObserver.observe(securitySectionRef.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 初始化画布
  const cleanup = initCanvas()

  nextTick(() => {
    initSecurityShieldObserver()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearShieldTimer()
    securityShieldObserver?.disconnect()
    if (cleanup) cleanup()
  })
})
</script>

<style scoped lang="scss">
// 设计系统变量
:root {
  --primary-color: #1E9CFF;
  --primary-dark: #0DA8EF;
  --primary-light: #60b6ff;
  --secondary-color: #6366f1;
  --accent-color: #8b5cf6;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-tertiary: #e2e8f0;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 40px rgba(30, 156, 255, 0.3);
  // 排版变量
  --line-height-sm: 1.4;
  --line-height-base: 1.6;
  --line-height-lg: 1.8;
  --line-height-xl: 2;
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0.01em;
  --letter-spacing-wide: 0.025em;
}

// 浮动动画
@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(5deg);
  }
  50% {
    transform: translate(0, 10px) rotate(0deg);
  }
  75% {
    transform: translate(-10px, -5px) rotate(-5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

// 基础样式
.home-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  position: relative;
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-normal);
}

// 图片加载优化
.lazy-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.lazy-image.loaded {
  opacity: 1;
}

// 动态背景加载状态
.dynamic-background-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f4b 50%, #2d3561 100%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

// 通用文本样式
p {
  margin-bottom: 1.5rem;
  line-height: var(--line-height-lg);
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-tight);
}

// 动态背景画布
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

// Hero 区域
.hero-section-new {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 120px 40px 80px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f4b 50%, #2d3561 100%);

  .hero-content-new {
    max-width: 1400px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 1;
    animation: heroContentIn 0.75s ease 0.12s both;
  }

  :deep(.dynamic-background) {
    opacity: 0;
    transition: opacity 0.6s ease;

    &.is-ready {
      opacity: 1;
    }
  }

  .hero-text-new {
    padding-top: 40px;

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 32px;
          letter-spacing: var(--letter-spacing-normal);

          .badge-dot {
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
          }
        }

        .hero-title-new {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 60px;
          letter-spacing: -0.02em;

          .title-line {
            display: block;
            color: #fff;
            margin-bottom: 24px;

            &.highlight {
              color: #fff;
            }
          }
        }

        .hero-description-new {
          font-size: 18px;
          line-height: var(--line-height-lg);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 48px;
          max-width: 540px;
          letter-spacing: var(--letter-spacing-normal);
        }

    .hero-actions-new {
      display: flex;
      gap: 16px;
      margin-top: 80px;
      margin-bottom: 60px;

      .btn-primary-new {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 32px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        color: white;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 12px;
        box-shadow: 0 4px 14px rgba(30, 156, 255, 0.4);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 156, 255, 0.5);
        }

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: translateX(4px);
        }
      }

      .btn-secondary-new {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 32px;
        background: white;
        color: var(--text-primary);
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
          box-shadow: var(--shadow-md);
        }

        svg {
          color: var(--primary-color);
        }
      }
    }

    .hero-stats-new {
      display: flex;
      gap: 48px;

      .stat-item-new {
        .stat-number-new {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label-new {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 4px;
        }
      }
    }
  }

  .hero-visual-new {
    .visual-container {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;

      .floating-card {
          position: absolute;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: floatCard 6s ease-in-out infinite;

          .card-content {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .card-icon {
            font-size: 24px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

        .ai-agent-icon {
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 180px;
            height: 180px;
            filter: brightness(1) drop-shadow(0 0 15px rgba(100, 116, 255, 0.6));
          }
        }

        .card-text {
          font-size: 16px;
          font-weight: 600;
          color: #4F46E5; /* 靛蓝色：现代、高级的科技感 */
          /* 备选方案1：蓝紫色 - color: #6366F1; */
          /* 备选方案2：深蓝色 - color: #1E3A8A; */
          /* 备选方案3：暗青色 - color: #0E7490; */
        }

        &.card-1 {
          top: 5%;
          left: -10%;
          animation-delay: 0s;
        }

        &.card-2 {
          top: 30%;
          right: -15%;
          animation-delay: -2s;
        }

        &.card-3 {
          bottom: -5%;
          left: -10%;
          animation-delay: -4s;
        }
      }

      .central-visual {
        position: relative;
        width: 300px;
        height: 300px;
        transform-style: preserve-3d;
        perspective: 1000px;

        .orbit-ring {
          position: absolute;
          border: 2px solid rgba(30, 156, 255, 0.6);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(30, 156, 255, 0.2) 0%, transparent 70%);
          box-shadow: 0 0 30px rgba(30, 156, 255, 0.4);
          opacity: 0.8;
          mix-blend-mode: screen;

          &.ring-1 {
            width: 100%;
            height: 100%;
            animation: rotate3D 20s linear infinite;
          }

          &.ring-2 {
            width: 70%;
            height: 70%;
            animation: rotate3D 15s linear infinite reverse;
            transform: translate(-50%, -50%) rotateX(45deg);
            border-width: 1.5px;
          }

          &.ring-3 {
            width: 40%;
            height: 40%;
            animation: rotate3D 10s linear infinite;
            transform: translate(-50%, -50%) rotateX(-30deg) rotateY(45deg);
            border-width: 1px;
          }
        }

        .core-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at 35% 35%, #81c4ff, #3b82f6, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 0 60px rgba(59, 130, 246, 0.8),
            0 0 100px rgba(99, 102, 241, 0.5),
            inset 0 0 30px rgba(255, 255, 255, 0.3),
            inset 0 0 60px rgba(59, 130, 246, 0.2);
          animation: pulse 4s ease-in-out infinite;

          .core-text {
            font-size: 26px;
            font-weight: 900;
            color: white;
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.9),
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 30px rgba(99, 102, 241, 0.6);
            z-index: 3;
          }

          .core-glow {
            position: absolute;
            top: -20%;
            left: -20%;
            width: 140%;
            height: 140%;
            border-radius: 50%;
            background: radial-gradient(circle, 
              rgba(59, 130, 246, 0.4) 0%, 
              rgba(99, 102, 241, 0.3) 30%, 
              rgba(139, 92, 246, 0.2) 60%, 
              transparent 80%);
            animation: glow 3s ease-in-out infinite alternate, pulse 4s ease-in-out infinite;
          }

          .core-shine {
            position: absolute;
            top: 8%;
            left: 8%;
            width: 45%;
            height: 45%;
            border-radius: 50%;
            background: radial-gradient(circle, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(255, 255, 255, 0.6) 30%, 
              transparent 60%);
            transform: rotate(40deg);
            z-index: 2;
          }

          .core-highlight {
            position: absolute;
            bottom: 10%;
            right: 15%;
            width: 25%;
            height: 25%;
            border-radius: 50%;
            background: radial-gradient(circle, 
              rgba(255, 255, 255, 0.7) 0%, 
              transparent 40%);
            z-index: 2;
          }
        }
      }
    }
  }

  // 动态背景组件样式
  .dynamic-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    transition: all 0.4s ease-out;
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    z-index: 1;

    &.hidden {
      opacity: 0;
      visibility: hidden;
      transform: translateX(-50%) translateY(-20px);
    }

    .mouse {
      width: 24px;
      height: 36px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 8px;
      transition: all 0.4s ease-out;

      .wheel {
        width: 4px;
        height: 8px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 2px;
        animation: scrollWheel 2s ease-in-out infinite;
        transition: all 0.4s ease-out;
      }
    }

    span {
      transition: all 0.4s ease-out;
    }
  }
}

@keyframes heroContentIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 通用容器
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

// 通用 section header
.section-header-new {
  text-align: center;
  margin-bottom: 80px;
  padding: 0 20px;

  .section-tag {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(30, 156, 255, 0.1);
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 600;
    border-radius: 100px;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
  }

  .section-title-new {
    font-size: 42px;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 24px;
    letter-spacing: var(--letter-spacing-tight);
    line-height: var(--line-height-sm);
  }

  .section-desc-new {
    font-size: 18px;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: var(--line-height-lg);
    letter-spacing: var(--letter-spacing-normal);
  }
}

// 核心能力区域
.capabilities-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #e8f4ff 0%, #f2f9ff 50%, #fafcff 100%);
  position: relative;

  .capabilities-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;

    .capabilities-decorations {
      width: 100%;
      height: 100%;
      position: relative;

      .decoration-left {
        position: absolute;
        top: 20%;
        left: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }

      .decoration-right {
        position: absolute;
        bottom: 20%;
        right: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .section-container {
    position: relative;
    z-index: 1;
  }

  .capabilities-grid-new {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    .capability-card-new {
      position: relative;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 250, 255, 0.92) 100%);
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 2px 16px rgba(30, 156, 255, 0.06);
      transition: all 0.4s ease;
      overflow: hidden;
      border: 1px solid rgba(186, 220, 255, 0.5);
      backdrop-filter: blur(8px);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(30, 156, 255, 0.45), transparent);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 24px rgba(30, 156, 255, 0.1);
        border-color: rgba(30, 156, 255, 0.25);

        &::before {
          transform: translateX(100%);
        }
      }

      .card-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 0%, rgba(30, 156, 255, 0.08), transparent 70%);
        opacity: 0;
        transition: opacity 0.4s ease;

        &.active {
          opacity: 1;
        }
      }

      .card-content {
        position: relative;
        z-index: 1;
      }

      .capability-icon {
        width: 120px;
        height: 120px;
        margin-bottom: 32px;
        object-fit: contain;
        transition: all 0.3s ease;
        filter: drop-shadow(0 2px 8px rgba(30, 156, 255, 0.12));

        &:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 4px 12px rgba(30, 156, 255, 0.2));
        }
      }

      .card-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 16px;
        line-height: var(--line-height-sm);
        letter-spacing: var(--letter-spacing-tight);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .card-description {
        font-size: 16px;
        color: var(--text-secondary);
        line-height: var(--line-height-lg);
        margin-bottom: 24px;
        letter-spacing: var(--letter-spacing-normal);
      }

      .card-features {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .feature-tag {
          padding: 8px 16px;
          background: rgba(30, 156, 255, 0.08);
          color: #2b8fe8;
          font-size: 13px;
          font-weight: 600;
          border-radius: 100px;
          letter-spacing: var(--letter-spacing-normal);
          border: 1px solid rgba(30, 156, 255, 0.15);
          transition: all 0.3s ease;

          &:hover {
            background: rgba(30, 156, 255, 0.14);
            border-color: rgba(30, 156, 255, 0.28);
          }
        }
      }
    }
  }
}

// 产品区域
.products-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #f0f8ff 0%, #e8f4fd 45%, #f5faff 100%);
  position: relative;
  overflow: hidden;

  .products-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .products-shapes {
      position: absolute;
      inset: 0;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(30, 156, 255, 0.35) 0%, rgba(96, 165, 250, 0.25) 100%);
        opacity: 0.18;
        animation: float 25s ease-in-out infinite;

        &.shape-1 {
          width: 280px;
          height: 280px;
          top: -80px;
          left: -80px;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          right: 15%;
          animation-delay: 8s;
        }

        &.shape-3 {
          width: 140px;
          height: 140px;
          top: 30%;
          right: -40px;
          animation-delay: 15s;
        }
      }
    }

    .products-decorations {
      width: 100%;
      height: 100%;
      position: relative;

      .decoration-left {
        position: absolute;
        top: 20%;
        left: 0px;
        width: 200px;
        opacity: 0.8;
        z-index: 0;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }

      .decoration-right {
        position: absolute;
        bottom: 20%;
        right: 0px;
        width: 200px;
        opacity: 0.8;
        z-index: 0;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .products-showcase {
    display: flex;
    flex-direction: column;
    gap: 80px;

    .product-showcase-item {
      .showcase-content {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 248, 255, 0.9) 100%);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: center;
          box-shadow: 0 2px 20px rgba(30, 156, 255, 0.07);
          border: 1px solid rgba(186, 220, 255, 0.55);
          transition: all 0.3s ease;

          &:hover {
            box-shadow: 0 4px 28px rgba(30, 156, 255, 0.1);
            border-color: rgba(30, 156, 255, 0.2);
          }

        &.reverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }

        .showcase-text {
          .product-tag {
            display: inline-block;
            padding: 8px 18px;
            background: rgba(30, 156, 255, 0.1);
            color: #2b8fe8;
            font-size: 13px;
            font-weight: 600;
            border-radius: 100px;
            margin-bottom: 20px;
            letter-spacing: var(--letter-spacing-normal);
            border: 1px solid rgba(30, 156, 255, 0.18);
          }

          .product-name {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 24px;
            line-height: var(--line-height-sm);
            letter-spacing: var(--letter-spacing-tight);
            background: linear-gradient(135deg, #1E9CFF 0%, #3B82F6 55%, #60A5FA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            display: block;
            transition: all 0.3s ease;
          }

          .product-desc {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: var(--line-height-lg);
            margin-bottom: 32px;
            letter-spacing: var(--letter-spacing-normal);
          }

          .product-features {
            list-style: none;
            padding: 0;
            margin: 0 0 40px;

            li {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              padding: 12px 0;
              font-size: 16px;
              color: var(--text-secondary);
              line-height: var(--line-height-base);

              svg {
                color: white;
                flex-shrink: 0;
                margin-top: 2px;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
                padding: 4px;
                box-shadow: 0 2px 6px rgba(30, 156, 255, 0.2);
                transition: all 0.3s ease;
              }

              &:hover svg {
                transform: scale(1.05);
                box-shadow: 0 3px 10px rgba(30, 156, 255, 0.28);
              }
            }
          }

          .product-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            letter-spacing: var(--letter-spacing-normal);
            padding: 14px 28px;
            border-radius: 12px;
            background: linear-gradient(135deg, #1E9CFF 0%, #3B82F6 100%);
            border: none;
            box-shadow: 0 3px 12px rgba(30, 156, 255, 0.25);
            position: relative;
            overflow: hidden;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
              transition: left 0.5s ease;
            }

            &:hover {
              gap: 14px;
              background: linear-gradient(135deg, #3B82F6 0%, #1E9CFF 100%);
              box-shadow: 0 5px 18px rgba(30, 156, 255, 0.32);
              transform: translateY(-2px);

              &::before {
                left: 100%;
              }

              svg {
                transform: translateX(4px);
              }
            }

            &:active {
              transform: translateY(0);
              box-shadow: 0 2px 8px rgba(30, 156, 255, 0.22);
            }

            svg {
              transition: transform 0.3s ease;
              filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
            }
          }
        }

        .showcase-visual {
          display: flex;
          align-items: center;
          justify-content: center;

          .product-image {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            transition: transform 0.4s ease;

            &:hover {
              transform: scale(1.03);
            }
          }

          .visual-card {
            position: relative;
            width: 100%;
            aspect-ratio: 4/3;
            overflow: hidden;
            border-radius: 16px;
            box-shadow: 0 2px 14px rgba(30, 156, 255, 0.08);
            border: 1px solid rgba(186, 220, 255, 0.4);
            transition: all 0.4s ease;

            .card-bg {
              position: absolute;
              inset: 0;
              transition: all 0.4s ease;

              &:hover {
                transform: scale(1.05);
              }
            }

            .card-content-center {
              position: absolute;
              inset: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 16px;
              background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1) 0%, transparent 70%);

              .product-icon {
                font-size: 64px;
                color: rgba(255, 255, 255, 0.9);
                text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
              }

              .product-short {
                font-size: 32px;
                font-weight: 800;
                color: white;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                background: rgba(0, 0, 0, 0.2);
                padding: 8px 24px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
              }
            }
          }
        }
      }
    }
  }
}

// 场景方案区域
.scenarios-section-new {
  padding: 120px 0;
  background: linear-gradient(180deg, #eef6ff 0%, #f5faff 50%, #fafcff 100%);
  position: relative;
  overflow: hidden;

  .section-container {
    position: relative;
    z-index: 1;
  }

  .scenario-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .decoration-left {
      position: absolute;
      top: 20%;
      left: -50px;
      transform: translateY(-50%);

      .decoration-svg {
        width: 200px;
        height: auto;
        opacity: 0.8;
      }
    }

    .decoration-right {
      position: absolute;
      top: 80%;
      right: -50px;
      transform: translateY(-50%);

      .decoration-svg {
        width: 200px;
        height: auto;
        opacity: 0.8;
      }
    }
  }

  .scenarios-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .scenarios-shapes {
      position: absolute;
      inset: 0;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(30, 156, 255, 0.4) 0%, rgba(96, 165, 250, 0.3) 100%);
        opacity: 0.16;
        animation: float 20s ease-in-out infinite;

        &.shape-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: 10%;
          animation-delay: 5s;
        }

        &.shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: -50px;
          animation-delay: 10s;
        }
      }
    }
  }

  .scenarios-tabs {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;

    .scenario-tab {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      background: rgba(255, 255, 255, 0.92);
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 12px rgba(30, 156, 255, 0.08);
      border: 1px solid rgba(186, 220, 255, 0.5);

      &:hover {
        box-shadow: 0 4px 16px rgba(30, 156, 255, 0.14);
        border-color: rgba(30, 156, 255, 0.25);
        transform: translateY(-2px);
      }

      &.active {
        background: linear-gradient(135deg, #1E9CFF, #3B82F6);
        color: white;
        box-shadow: 0 4px 18px rgba(30, 156, 255, 0.28);
        border-color: rgba(30, 156, 255, 0.4);
      }

      .tab-icon {
        font-size: 22px;
      }

      .tab-name {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: var(--letter-spacing-normal);
      }
    }
  }

  .scenario-content-wrapper {
    .scenario-panel {
      .panel-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 36px;
            align-items: center;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 248, 255, 0.9) 100%);
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 2px 20px rgba(30, 156, 255, 0.07);
            border: 1px solid rgba(186, 220, 255, 0.55);
            transition: all 0.3s ease;
            position: relative;
            max-width: 1200px;
            margin: 0 auto;

        .panel-text {
          .scenario-tag {
            display: inline-block;
            padding: 8px 18px;
            background: linear-gradient(135deg, rgba(30, 156, 255, 0.1) 0%, rgba(13, 168, 239, 0.1) 100%);
            color: #1E9CFF;
            font-size: 13px;
            font-weight: 600;
            border-radius: 100px;
            margin-bottom: 20px;
            letter-spacing: var(--letter-spacing-normal);
            border: 1px solid rgba(30, 156, 255, 0.2);
          }
          .panel-title {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 16px;
            line-height: var(--line-height-sm);
            letter-spacing: var(--letter-spacing-tight);
            background: linear-gradient(135deg, #1E9CFF 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .panel-desc {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: var(--line-height-lg);
            margin-bottom: 24px;
            letter-spacing: var(--letter-spacing-normal);
          }

          .panel-features {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 24px;

            .panel-feature {
              display: flex;
              gap: 10px;

              .feature-icon-box {
                width: 32px;
                height: 32px;
                background: rgba(30, 156, 255, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #2b8fe8;
                flex-shrink: 0;
                margin-top: 2px;
                border: 1px solid rgba(30, 156, 255, 0.15);
                box-shadow: none;

                svg {
                  width: 16px;
                  height: 16px;
                }
              }

              .feature-text-box {
                h4 {
                  font-size: 14px;
                  font-weight: 600;
                  color: var(--text-primary);
                  margin-bottom: 2px;
                  line-height: var(--line-height-sm);
                }

                p {
                  font-size: 12px;
                  color: var(--text-secondary);
                  line-height: var(--line-height-base);
                  letter-spacing: var(--letter-spacing-normal);
                }
              }
            }
          }

          .panel-buttons {
            display: flex;
            gap: 16px;
            margin-top: 24px;
          }

          .panel-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #1E9CFF, #3B82F6);
            color: white;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 10px;
            box-shadow: 0 3px 12px rgba(30, 156, 255, 0.25);
            transition: all 0.3s ease;
            letter-spacing: var(--letter-spacing-normal);
            border: 1px solid rgba(30, 156, 255, 0.2);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(30, 156, 255, 0.32);
              background: linear-gradient(135deg, #3B82F6, #1E9CFF);
            }

            &.secondary {
              background: rgba(255, 255, 255, 0.8);
              border: 1px solid rgba(30, 156, 255, 0.35);
              color: #2b8fe8;
              box-shadow: 0 2px 8px rgba(30, 156, 255, 0.08);

              &:hover {
                background: rgba(30, 156, 255, 0.08);
                box-shadow: 0 4px 14px rgba(30, 156, 255, 0.16);
              }
            }

            svg {
              transition: transform 0.3s ease;
            }

            &:hover svg {
              transform: translateX(4px);
            }
          }
        }

        .panel-visual {
          .scenario-visual-card {
            aspect-ratio: 1;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            transform: scale(0.8);

            .scenario-big-icon {
              font-size: 100px;
              opacity: 0.9;
            }

            .visual-elements {
              position: absolute;
              inset: 0;

              .element {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);

                &:nth-child(1) {
                  width: 200px;
                  height: 200px;
                  top: -50px;
                  right: -50px;
                }

                &:nth-child(2) {
                  width: 150px;
                  height: 150px;
                  bottom: 20px;
                  left: -30px;
                }

                &:nth-child(3) {
                  width: 100px;
                  height: 100px;
                  bottom: -20px;
                  right: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 统计数据区域
.stats-section {
  padding: 100px 0 120px;
  background: linear-gradient(180deg, #e8f4fd 0%, #f0f8ff 50%, #f5faff 100%);
  position: relative;
  overflow: hidden;

  .stats-bg {
    position: absolute;
    inset: 0;

    .stats-shapes {
      position: absolute;
      inset: 0;
      pointer-events: none;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(30, 156, 255, 0.35) 0%, rgba(96, 165, 250, 0.25) 100%);
        opacity: 0.16;
        animation: float 20s ease-in-out infinite;

        &.shape-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: 10%;
          animation-delay: 5s;
        }

        &.shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: -50px;
          animation-delay: 10s;
        }
      }
    }

    .stats-decorations {
      width: 100%;
      height: 100%;
      position: relative;
      pointer-events: none;

      .decoration-left {
        position: absolute;
        top: 20%;
        left: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }

      .decoration-right {
        position: absolute;
        bottom: 20%;
        right: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    position: relative;
    z-index: 1;

    .stat-card {
      text-align: center;
      padding: 40px 24px;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 250, 255, 0.92) 100%);
      border-radius: 20px;
      box-shadow: 0 2px 16px rgba(30, 156, 255, 0.07);
      border: 1px solid rgba(186, 220, 255, 0.45);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 24px rgba(30, 156, 255, 0.12);
        border-color: rgba(30, 156, 255, 0.2);
      }

      .stat-icon {
        font-size: 40px;
        margin-bottom: 16px;
      }

      .stat-number-wrapper {
        font-size: 40px;
        font-weight: 800;
        background: linear-gradient(135deg, #1E9CFF 0%, #3B82F6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;

        .stat-prefix,
        .stat-suffix {
          font-size: 24px;
          color: var(--text-secondary);
        }
      }

      .stat-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
      }

      .stat-desc {
        font-size: 13px;
        color: var(--text-muted);
      }
    }
  }
}

// 安全区域
.security-section-new {
  padding: 100px 0;
  background: linear-gradient(180deg, #f2f9ff 0%, #eef6ff 50%, #fafcff 100%);
  position: relative;
  overflow: hidden;

  .security-shield-overlay {
    position: fixed;
    inset: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    &.is-fading {
      .shield-backdrop {
        opacity: 0;
      }

      .shield-stage {
        animation: shieldExit 0.8s ease forwards;
      }
    }

    .shield-backdrop {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 52% at 50% 42%, rgba(0, 18, 28, 0.82) 0%, rgba(0, 35, 40, 0.55) 42%, rgba(0, 50, 45, 0.18) 100%);
      backdrop-filter: blur(6px);
      transition: opacity 0.8s ease;

      .shield-spotlight {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 380px;
        height: 300px;
        background: radial-gradient(ellipse at 50% 0%, rgba(0, 255, 180, 0.28) 0%, rgba(0, 255, 240, 0.12) 40%, transparent 72%);
        pointer-events: none;
        animation: spotlightPulse 3s ease-in-out infinite;
      }
    }

    .shield-stage {
      position: relative;
      width: 360px;
      height: 460px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: shieldEnter 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .shield-3d-wrap {
      position: relative;
      width: 300px;
      height: 360px;
      perspective: 1000px;
      animation: shieldHover3d 3.5s ease-in-out infinite 1s;
    }

    .shield-orbit {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;

      &.orbit-outer {
        width: 340px;
        height: 340px;
        border: 1px dashed rgba(0, 255, 220, 0.35);
        animation: cyberOrbitSpin 16s linear infinite;
      }

      &.orbit-inner {
        width: 290px;
        height: 290px;
        border: 2px solid transparent;
        border-top-color: rgba(0, 255, 180, 0.65);
        border-right-color: rgba(95, 251, 255, 0.35);
        animation: cyberOrbitSpin 7s linear infinite reverse;
      }
    }

    .shield-green-aura {
      position: absolute;
      inset: -20px -10px 0;
      background: radial-gradient(ellipse at 50% 42%, rgba(0, 255, 180, 0.38) 0%, rgba(0, 255, 240, 0.15) 45%, transparent 70%);
      filter: blur(22px);
      z-index: 1;
      animation: greenAuraPulse 2.5s ease-in-out infinite;
    }

    .lens-flare {
      position: absolute;
      z-index: 5;
      pointer-events: none;

      &.flare-h {
        top: 47%;
        left: -10%;
        width: 120%;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, rgba(95, 251, 255, 0.65) 28%, rgba(255, 255, 255, 0.8) 50%, rgba(95, 251, 255, 0.65) 72%, transparent 100%);
        box-shadow: 0 0 22px rgba(0, 255, 220, 0.65), 0 0 44px rgba(0, 255, 180, 0.35);
        animation: flareShimmer 2.5s ease-in-out infinite;
      }
    }

    .shield-3d-svg {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 3;
      transform: rotateX(8deg);
      transform-origin: center bottom;
      animation: shieldReveal 1.2s ease forwards;

      .shield-body-group {
        opacity: 0;
        animation: shieldBodyIn 1s ease forwards 0.15s;
      }

      .shield-core-pulse {
        animation: coreEnergyPulse 2s ease-in-out infinite 0.8s;
      }

      .shield-rim {
        animation: rimPulse 2s ease-in-out infinite 1s;
      }

      .circuit-hex {
        animation: hexPulse 2s ease-in-out infinite;
      }

      .shield-lock-dot {
        animation: shieldLockPulse 1.8s ease-in-out infinite 1s;
      }

      .circuit-line {
        stroke-dasharray: 90;
        stroke-dashoffset: 90;
        animation: circuitDraw 1.4s ease forwards 0.5s;
      }

      .circuit-line:nth-of-type(3) { animation-delay: 0.6s; }
      .circuit-line:nth-of-type(4) { animation-delay: 0.68s; }
      .circuit-line:nth-of-type(5) { animation-delay: 0.75s; }
      .circuit-line:nth-of-type(6) { animation-delay: 0.82s; }
      .circuit-line:nth-of-type(7) { animation-delay: 0.88s; }
      .circuit-line:nth-of-type(8) { animation-delay: 0.94s; }

      .shield-flare-line {
        animation: flareLinePulse 2s ease-in-out infinite 1.2s;
      }

      .shield-rivets circle {
        animation: rivetBlink 3s ease-in-out infinite;

        &:nth-child(odd) { animation-delay: 0.4s; }
      }
    }

    .shield-reflection {
      position: absolute;
      bottom: -28px;
      left: 50%;
      transform: translateX(-50%) scaleY(-1);
      width: 220px;
      height: 55px;
      background: radial-gradient(ellipse, rgba(0, 255, 220, 0.32) 0%, rgba(0, 255, 180, 0.18) 45%, transparent 72%);
      filter: blur(14px);
      opacity: 0.75;
      z-index: 0;
      animation: reflectionPulse 2.5s ease-in-out infinite;
    }

    .hud-footer {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 260px;
      text-align: center;
      animation: shieldFadeIn 0.8s ease forwards 1s;
      opacity: 0;

      .hud-title {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.35em;
        color: #00ffbb;
        text-shadow: 0 0 18px rgba(0, 255, 200, 0.85), 0 0 36px rgba(95, 251, 255, 0.45);
        margin-bottom: 10px;
      }

      .hud-progress {
        height: 2px;
        background: rgba(0, 229, 255, 0.15);
        border-radius: 2px;
        overflow: hidden;

        .hud-progress-fill {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #5ffbff, #00ffbb, #00ff99);
          box-shadow: 0 0 12px rgba(0, 255, 200, 0.75);
          animation: hudProgressFill 2.5s ease forwards 1.2s;
        }
      }
    }
  }

  .security-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .security-shapes {
      position: absolute;
      inset: 0;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(30, 156, 255, 0.35) 0%, rgba(96, 165, 250, 0.25) 100%);
        opacity: 0.16;
        animation: float 25s ease-in-out infinite;

        &.shape-1 {
          width: 250px;
          height: 250px;
          top: -50px;
          left: -50px;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 180px;
          height: 180px;
          bottom: -30px;
          right: 10%;
          animation-delay: 8s;
        }

        &.shape-3 {
          width: 120px;
          height: 120px;
          top: 30%;
          right: -30px;
          animation-delay: 15s;
        }
      }
    }

    .security-decorations {
      width: 100%;
      height: 100%;
      position: relative;

      .decoration-left {
        position: absolute;
        top: 20%;
        left: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }

      .decoration-right {
        position: absolute;
        bottom: 20%;
        right: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .security-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    .security-card-new {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 250, 255, 0.92) 100%);
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 2px 16px rgba(30, 156, 255, 0.07);
      border: 1px solid rgba(186, 220, 255, 0.45);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 24px rgba(30, 156, 255, 0.12);
        border-color: rgba(30, 156, 255, 0.2);
      }

      .security-icon-wrapper {
        margin-bottom: 20px;

        .icon-bg {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .security-title-new {
        font-size: 18px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 8px;
      }

      .security-desc-new {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .security-mock {
        background: var(--bg-tertiary);
        border-radius: 12px;
        overflow: hidden;

        .mock-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);

          .mock-dots {
            display: flex;
            gap: 4px;

            span {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--text-muted);
            }
          }

          .mock-title-text {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-secondary);
          }
        }

        .mock-body {
          padding: 12px;
          font-size: 11px;

          .mock-table {
            .mock-row {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              border-bottom: 1px solid var(--border-color);

              &:last-child {
                border-bottom: none;
              }

              .warning {
                color: #f59e0b;
              }

              .success {
                color: #10b981;
              }
            }
          }

          .mock-list {
            .mock-item {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 6px 0;
              border-bottom: 1px solid var(--border-color);

              &:last-child {
                border-bottom: none;
              }

              &.warning {
                color: #f59e0b;
              }
            }
          }

          .mock-honeypot {
            text-align: center;
            padding: 12px 0;

            .hp-icon {
              font-size: 32px;
              margin-bottom: 4px;
            }

            .hp-text {
              font-size: 12px;
              font-weight: 600;
              color: var(--text-primary);
            }
          }

          .mock-activity {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--border-color);

            div {
              padding: 4px 0;
              color: var(--text-secondary);
            }
          }
        }
      }
    }
  }
}

// 合作伙伴区域
.partners-section {
  padding: 100px 0;
  background: linear-gradient(180deg, #e8f4ff 0%, #f0f8ff 50%, #f5faff 100%);
  position: relative;
  overflow: hidden;

  .partners-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .partners-shapes {
      position: absolute;
      inset: 0;

      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(30, 156, 255, 0.3) 0%, rgba(96, 165, 250, 0.2) 100%);
        opacity: 0.16;
        animation: float 30s ease-in-out infinite;

        &.shape-1 {
          width: 280px;
          height: 280px;
          bottom: -80px;
          left: -80px;
          animation-delay: 0s;
        }

        &.shape-2 {
          width: 200px;
          height: 200px;
          top: -50px;
          right: 15%;
          animation-delay: 10s;
        }

        &.shape-3 {
          width: 140px;
          height: 140px;
          bottom: 20%;
          right: -40px;
          animation-delay: 20s;
        }
      }
    }

    .partners-decorations {
      width: 100%;
      height: 100%;
      position: relative;

      .decoration-left {
        position: absolute;
        top: 20%;
        left: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }

      .decoration-right {
        position: absolute;
        bottom: 20%;
        right: -50px;
        width: 200px;
        opacity: 0.8;
        z-index: -1;

        .decoration-svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  overflow: hidden;

  .partners-marquee {
    position: relative;

    .marquee-track {
      display: flex;
      gap: 48px;
      animation: marquee 30s linear infinite;

      &:hover {
        animation-play-state: paused;
      }

      .partner-logo {
        flex-shrink: 0;
        padding: 20px 40px;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(186, 220, 255, 0.45);
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(30, 156, 255, 0.06);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(30, 156, 255, 0.2);
          transform: scale(1.03);
          box-shadow: 0 4px 16px rgba(30, 156, 255, 0.1);
        }

        .partner-name {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }
      }
    }
  }
}

// CTA 区域
.cta-section {
  padding: 120px 0;
  position: relative;
  overflow: hidden;

  .cta-bg {
    position: absolute;
    inset: 0;

    .cta-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    }

    .cta-pattern {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }

  .cta-content {
    position: relative;
    z-index: 1;
    text-align: center;

    .cta-title {
      font-size: 48px;
      font-weight: 800;
      color: white;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }

    .cta-desc {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 40px;
    }

    .cta-actions {
      display: flex;
      justify-content: center;
      gap: 16px;

      .cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 12px;
        transition: all 0.3s ease;

        &.primary {
          background: white;
          color: var(--primary-color);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          }
        }

        &.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: translateX(4px);
        }
      }
    }
  }
}

// Footer
.footer-new {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 80px 0 40px;

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    margin-bottom: 60px;

    .footer-brand {
      .footer-logo-new {
        height: 32px;
        margin-bottom: 20px;
      }

      .footer-desc {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 24px;
        max-width: 300px;
      }

      .footer-social {
        display: flex;
        gap: 12px;

        .social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 10px;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);

          &:hover {
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
        }
      }
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;

      .footer-column-new {
        .column-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .column-links {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            margin-bottom: 12px;

            a {
              font-size: 14px;
              color: var(--text-secondary);
              text-decoration: none;
              transition: all 0.3s ease;

              &:hover {
                color: var(--primary-color);
              }
            }
          }
        }
      }
    }
  }

  .footer-bottom-new {
    padding-top: 40px;
    border-top: 1px solid var(--border-color);
    text-align: center;

    p {
      font-size: 13px;
      color: var(--text-muted);

      a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

.security-shield-enter-active,
.security-shield-leave-active {
  transition: opacity 0.3s ease;
}

.security-shield-enter-from,
.security-shield-leave-to {
  opacity: 0;
}

@keyframes shieldEnter {
  0% {
    opacity: 0;
    transform: scale(0.75) translateY(30px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

@keyframes shieldExit {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(1.05) translateY(-10px);
    filter: blur(8px);
  }
}

@keyframes shieldHover3d {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shieldReveal {
  0% { filter: brightness(0.5) saturate(1.2); }
  100% { filter: brightness(1.15) saturate(1.35) contrast(1.05); }
}

@keyframes cyberOrbitSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes coreEnergyPulse {
  0%, 100% { opacity: 0.65; }
  50% { opacity: 1; }
}

@keyframes shieldLockPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes greenAuraPulse {
  0%, 100% { opacity: 0.7; transform: scale(0.97); }
  50% { opacity: 1; transform: scale(1.03); }
}

@keyframes shieldBodyIn {
  to { opacity: 1; }
}

@keyframes spotlightPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes rimPulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

@keyframes hexPulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

@keyframes circuitDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes flareShimmer {
  0%, 100% { opacity: 0.6; transform: scaleX(0.95); }
  50% { opacity: 1; transform: scaleX(1); }
}

@keyframes flareLinePulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

@keyframes rivetBlink {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes reflectionPulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleY(-1) scale(0.95); }
  50% { opacity: 0.85; transform: translateX(-50%) scaleY(-1) scale(1.05); }
}

@keyframes shieldFadeIn {
  to { opacity: 1; }
}

@keyframes hudProgressFill {
  to { width: 100%; }
}

// 动画
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatCard {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// 3D旋转动画
@keyframes rotate3D {
  0% {
    transform: translate(-50%, -50%) rotateY(0deg) rotateX(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateY(360deg) rotateX(360deg);
  }
}

// 星球脉冲动画
@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 
      0 0 40px rgba(30, 156, 255, 0.6),
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 
      0 0 60px rgba(30, 156, 255, 0.8),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }
}

// 发光动画
@keyframes glow {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

// 旋转动画
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 60px;
  }
}

@keyframes scrollWheel {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

// 过渡动画
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

// 响应式设计
@media (max-width: 1200px) {
  .hero-section-new {
    .hero-content-new {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 60px;

      .hero-text-new {
        .hero-description-new {
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions-new {
          justify-content: center;
        }

        .hero-stats-new {
          justify-content: center;
        }
      }
    }
  }

  .capabilities-section {
    .capabilities-grid-new {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .products-section {
    .products-showcase {
      .product-showcase-item {
        .showcase-content {
          grid-template-columns: 1fr;
          gap: 40px;

          &.reverse {
            direction: ltr;
          }
        }
      }
    }
  }

  .scenarios-section-new {
    .scenario-content-wrapper {
      .scenario-panel {
        .panel-content {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  .stats-section {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .security-section-new {
    .security-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .hero-section-new {
    padding: 100px 20px 60px;

    .hero-content-new {
      .hero-text-new {
        .hero-title-new {
          font-size: 40px;
          line-height: 1.3;

          .title-line {
            margin-bottom: 16px;
          }
        }

        .hero-actions-new {
          flex-direction: column;

          .btn-primary-new,
          .btn-secondary-new {
            width: 100%;
            justify-content: center;
          }
        }

        .hero-stats-new {
          flex-direction: column;
          gap: 24px;
        }
      }

      .hero-visual-new {
        .visual-container {
          height: 350px;

          .central-visual {
            width: 200px;
            height: 200px;
            transform-style: preserve-3d;
            perspective: 800px;

            .orbit-ring {
              border-width: 1px;
              box-shadow: 0 0 20px rgba(30, 156, 255, 0.4);
              opacity: 0.8;
              mix-blend-mode: screen;

              &.ring-2 {
                border-width: 0.8px;
              }

              &.ring-3 {
                border-width: 0.5px;
              }
            }

            .core-circle {
              width: 70px;
              height: 70px;
              box-shadow: 
                0 0 30px rgba(30, 156, 255, 0.6),
                inset 0 0 15px rgba(255, 255, 255, 0.2);

              .core-text {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }

  .section-container {
    padding: 0 20px;
  }

  .section-header-new {
    .section-title-new {
      font-size: 28px;
    }
  }

  .capabilities-section {
    padding: 80px 0;

    .capabilities-grid-new {
      grid-template-columns: 1fr;
    }
  }

  .products-section {
    padding: 80px 0;

    .products-showcase {
      gap: 60px;

      .product-showcase-item {
        .showcase-content {
          .showcase-text {
            .product-name {
              font-size: 28px;
            }
          }
        }
      }
    }
  }

  .scenarios-section-new {
    padding: 80px 0;

    .scenarios-tabs {
      flex-wrap: wrap;

      .scenario-tab {
        padding: 10px 16px;
      }
    }

    .scenario-content-wrapper {
      .scenario-panel {
        .panel-content {
          padding: 24px;
        }
      }
    }
  }

  .stats-section {
    padding: 60px 0;

    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  .security-section-new {
    padding: 80px 0;

    .security-shield-overlay {
      .shield-stage {
        width: 280px;
        height: 380px;
      }

      .shield-3d-wrap {
        width: 240px;
        height: 300px;
      }

      .shield-orbit.orbit-outer { width: 270px; height: 270px; }
      .shield-orbit.orbit-inner { width: 230px; height: 230px; }

      .hud-footer {
        width: 220px;

        .hud-title {
          font-size: 11px;
          letter-spacing: 0.25em;
        }
      }
    }

    .security-grid {
      grid-template-columns: 1fr;
    }
  }

  .cta-section {
    padding: 80px 0;

    .cta-content {
      .cta-title {
        font-size: 32px;
      }

      .cta-actions {
        flex-direction: column;
        padding: 0 20px;

        .cta-btn {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }

  .footer-new {
    padding: 60px 0 30px;

    .footer-main {
      grid-template-columns: 1fr;
      gap: 40px;

      .footer-brand {
        text-align: center;

        .footer-desc {
          max-width: 100%;
        }

        .footer-social {
          justify-content: center;
        }
      }

      .footer-links-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
    }
  }
}

// 客服功能模块
.customer-service {
  position: fixed;
  right: 30px;
  top: 70%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .service-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: white;
    border-radius: 24px;
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
    z-index: 1;

    &:hover {
      transform: translateX(-4px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }

    &:hover .service-panel {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(-100%) scale(1);
    }

    .service-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: var(--primary-color);
        width: 24px;
        height: 24px;
      }

      .online-indicator {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
        background: #10b981;
        border-radius: 50%;
        border: 2px solid white;
        animation: pulse 2s ease-in-out infinite;
      }
    }

    .service-text {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
    }

    .service-panel {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-120%) scale(0.9);
      width: 240px;
      background: white;
      border-radius: 16px;
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--border-color);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .qrcode-container {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .qrcode-placeholder {
        width: 100%;
        height: 200px;
        background: var(--bg-secondary);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, #e2e8f0 25%, transparent 25%), 
            linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #e2e8f0 75%), 
            linear-gradient(-45deg, transparent 75%, #e2e8f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          opacity: 0.5;
          animation: gridMove 20s linear infinite;
        }

        .qrcode-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          width: 100%;
          height: 100%;
          justify-content: center;

          .qrcode-grid {
            width: 160px;
            height: 160px;
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .qrcode-text {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
            margin-top: 12px;
          }

          .qrcode-hint {
            font-size: 14px;
            color: var(--text-muted);
          }
        }
      }

      .service-hours {
        font-size: 14px;
        color: var(--text-muted);
        text-align: center;
        margin-top: 8px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .customer-service {
    right: 16px;

    .service-button {
      padding: 10px 16px;

      .service-text {
        font-size: 12px;
      }

      .service-icon {
        svg {
          width: 20px;
          height: 20px;
        }
      }

      .service-panel {
        width: 200px;
        transform: translateY(-50%) translateX(-120%) scale(0.9);

        &:hover {
          transform: translateY(-50%) translateX(-100%) scale(1);
        }

        .qrcode-placeholder {
          width: 100%;
          height: 160px;

          .qrcode-content {
            .qrcode-grid {
              width: 120px;
              height: 120px;
            }

            .qrcode-text {
              font-size: 14px;
            }

            .qrcode-hint {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .hero-section-new {
    .hero-content-new {
      .hero-text-new {
        .hero-title-new {
          font-size: 28px;
        }
      }
    }
  }

  .section-header-new {
    .section-title-new {
      font-size: 24px;
    }

    .section-desc-new {
      font-size: 16px;
    }
  }

  .customer-service {
    .service-button {
      .service-text {
        display: none;
      }

      .service-panel {
        width: 180px;
        transform: translateY(-50%) translateX(-110%) scale(0.9);

        &:hover {
          transform: translateY(-50%) translateX(-100%) scale(1);
        }

        .qrcode-placeholder {
          width: 100%;
          height: 140px;

          .qrcode-content {
            .qrcode-grid {
              width: 100px;
              height: 100px;
            }

            .qrcode-text {
              font-size: 12px;
            }

            .qrcode-hint {
              font-size: 10px;
            }
          }
        }
      }
    }
  }

  .footer-new {
    .footer-main {
      .footer-links-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
