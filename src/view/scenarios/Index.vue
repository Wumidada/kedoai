<template>
  <div class="scenarios-page">
    <!-- 顶部导航 -->
    <header class="page-header">
      <div class="header-content">
        <div class="logo-section" @click="goHome">
          <img src="@/assets/logo/logo-kedo.png" alt="Kedo Logo" class="logo" />
          <span class="logo-text">场景中心</span>
        </div>
        <nav class="header-nav">
          <a href="/" class="nav-link">首页</a>
          <a href="/#/overview" class="nav-link">总览</a>
          <a href="/community" class="nav-link">社区</a>
        </nav>
      </div>
    </header>

    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="animated-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span class="badge-text">探索无限可能</span>
        </div>
        <h1 class="hero-title">
          智能场景
          <span class="gradient-text">解决方案</span>
        </h1>
        <p class="hero-description">
          发现适合您业务场景的AI智能解决方案，从营销到开发，从管理到决策，
          <br />
          我们提供全方位的数字化赋能服务
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">场景方案</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1000+</div>
            <div class="stat-label">企业客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">满意度</div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>向下滚动探索</span>
      </div>
    </section>

    <!-- 场景分类筛选 -->
    <section class="filter-section">
      <div class="filter-container">
        <!-- 搜索框 -->
        <div class="search-container">
          <div class="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input 
              type="text" 
              v-model="searchKeyword" 
              placeholder="搜索智能体..." 
              class="search-input"
            />
            <button v-if="searchKeyword" class="clear-btn" @click="searchKeyword = ''">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="filter-tabs">
          <button
            v-for="(category, index) in categories"
            :key="category.id"
            class="filter-tab"
            :class="{ active: activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            <span class="tab-icon">{{ category.icon }}</span>
            <span class="tab-text">{{ category.name }}</span>
          </button>
          <div v-if="activeCategory === 'all' && scenarios.length > defaultVisibleCount" class="show-all-container">
            <button class="show-all-btn" @click="showAllScenarios = !showAllScenarios">
              {{ showAllScenarios ? '收起' : '展开全部' }}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" :class="{ 'rotated': showAllScenarios }">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 场景展示区域 -->
    <section class="scenarios-showcase">
      <div class="showcase-container">
        <div class="scenarios-grid">
          <div
            v-for="scenario in filteredScenarios"
            :key="scenario.id"
            class="scenario-card"
            :class="{ 'featured': scenario.featured }"
            @mouseenter="hoveredScenario = scenario.id"
            @mouseleave="hoveredScenario = null"
          >
            <div class="card-background">
              <div class="gradient-bg" :style="{ background: scenario.gradient }"></div>
            </div>
            <div class="card-content">
              <div class="card-header">
                <div class="card-icon">{{ scenario.icon }}</div>
                <div v-if="scenario.featured" class="featured-badge">热门</div>
              </div>
              <h3 class="card-title">{{ scenario.title }}</h3>
              <p class="card-description">{{ scenario.description }}</p>
              <div class="card-features">
                <div
                  v-for="(feature, index) in scenario.features"
                  :key="index"
                  class="feature-tag"
                >
                  {{ feature }}
                </div>
              </div>
              <div class="card-footer">
                <div class="card-stats">
                  <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                    {{ scenario.rating }}
                  </span>
                  <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{ scenario.duration }}
                  </span>
                </div>
                <button class="explore-btn" @click="exploreScenario(scenario)">
                  立即体验
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-glow" :class="{ active: hoveredScenario === scenario.id }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色场景展示 -->
    <section class="featured-section">
      <div class="featured-container">
        <div class="section-header">
          <span class="section-label">精选推荐</span>
          <h2 class="section-title">明星场景方案</h2>
          <p class="section-desc">经过千家企业验证的高效解决方案</p>
        </div>
        <div class="featured-showcase">
          <div
            v-for="(scenario, index) in featuredScenarios"
            :key="scenario.id"
            :id="scenario.id"
            class="featured-item"
            :class="{ 'reverse': index % 2 === 1 }"
          >
            <div class="featured-visual">
              <div class="visual-container" :style="{ background: scenario.gradient }">
                <div class="visual-icon">{{ scenario.icon }}</div>
                <div class="visual-effects">
                  <div class="effect-circle"></div>
                  <div class="effect-circle"></div>
                  <div class="effect-circle"></div>
                </div>
              </div>
            </div>
            <div class="featured-content">
              <div class="content-badge">{{ scenario.category }}</div>
              <h3 class="content-title">{{ scenario.title }}</h3>
              <p class="content-description">{{ scenario.fullDescription }}</p>
              <ul class="content-features">
                <li v-for="(feature, idx) in scenario.keyFeatures" :key="idx">
                  <span class="feature-check">✓</span>
                  {{ feature }}
                </li>
              </ul>
              <div class="content-actions">
                <button class="primary-btn" @click="exploreScenario(scenario)">
                  开始使用
                </button>
                <button class="secondary-btn" @click="showDetails(scenario)">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta-section">
      <div class="cta-background">
        <div class="cta-gradient"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">准备好开始您的智能化转型了吗？</h2>
        <p class="cta-description">
          联系我们的专家团队，获取定制化的场景解决方案
        </p>
        <div class="cta-actions">
          <button class="cta-primary-btn" @click="contactUs">
            联系专家
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="cta-secondary-btn" @click="viewDemo">
            观看演示
          </button>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="@/assets/logo/logo-kedo.png" alt="Kedo Logo" class="footer-logo" />
          <p class="footer-desc">智能边缘计算的领导者，为企业提供高效、可靠的数字化解决方案</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>产品</h4>
            <a href="/kedochat">KedoChat</a>
            <a href="/kedoknowledgebase">Kedo知识库</a>
            <a href="/kedoAiFlow">KedoAiFlow</a>
            <a href="/kedomind">KedoMind</a>
          </div>
          <div class="link-group">
            <h4>场景</h4>
            <a href="#" @click.prevent="filterByCategory('marketing')">AI营销</a>
            <a href="#" @click.prevent="filterByCategory('development')">智能开发</a>
            <a href="#" @click.prevent="filterByCategory('management')">企业管理</a>
          </div>
          <div class="link-group">
            <h4>支持</h4>
            <a href="/community">社区</a>
            <a href="/doc/useAgreement">服务条款</a>
            <a href="/doc/privacyPolicy">隐私政策</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Kedo. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const activeCategory = ref('all')
const hoveredScenario = ref<string | null>(null)
const showAllScenarios = ref(false)
const defaultVisibleCount = 9
const searchKeyword = ref('')

// 页面加载时处理滚动
onMounted(() => {
  // 首先滚动到页面顶部
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  
  // 然后处理哈希滚动
  const hash = route.hash
  if (hash) {
    // 延迟处理哈希滚动，确保页面先滚动到顶部
    setTimeout(() => {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
})

// 分类数据 - 按照GitHub上的分类
const categories = [
  { id: 'all', name: '全部场景', icon: '🎯' },
  { id: 'academic', name: '学术研究', icon: '🎓' },
  { id: 'design', name: '设计创意', icon: '🎨' },
  { id: 'engineering', name: '工程技术', icon: '⚙️' },
  { id: 'game-development', name: '游戏开发', icon: '🎮' },
  { id: 'marketing', name: '市场营销', icon: '📈' },
  { id: 'paid-media', name: '付费媒体', icon: '💰' },
  { id: 'product', name: '产品管理', icon: '📋' },
  { id: 'project-management', name: '项目管理', icon: '📅' },
  { id: 'sales', name: '销售策略', icon: '💼' },
  { id: 'spatial-computing', name: '空间计算', icon: '🌐' },
  { id: 'specialized', name: '专业领域', icon: '🔧' },
  { id: 'support', name: '支持服务', icon: '🛠️' },
  { id: 'testing', name: '测试验证', icon: '🧪' }
]

// 场景数据 - 从agency-agents-main文件夹中提取的智能体
const scenarios = [
  // 学术研究
  {
    id: 'anthropologist',
    title: '人类学家',
    description: '专注于人类文化、社会结构和历史演变的学术专家。',
    fullDescription: '人类学家通过深入研究人类文化、社会结构和历史演变，为您提供跨文化视角和深度分析。支持文化遗产保护、社会发展研究、跨文化交流等领域的专业咨询。',
    icon: '🧪',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    category: 'academic',
    categoryName: '学术研究',
    featured: false,
    features: ['文化研究', '社会分析', '历史演变', '跨文化交流'],
    keyFeatures: ['文化遗产保护', '社会发展研究', '跨文化交流咨询', '历史演变分析', '人类学田野调查方法'],
    rating: 4.7,
    duration: '30分钟咨询'
  },
  {
    id: 'geographer',
    title: '地理学家',
    description: '研究地球表面特征、人类与环境关系的专家。',
    fullDescription: '地理学家专注于研究地球表面特征、人类与环境的相互关系。支持地理空间分析、环境规划、可持续发展等领域的专业咨询和研究。',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'academic',
    categoryName: '学术研究',
    featured: false,
    features: ['地理分析', '环境研究', '空间关系', '可持续发展'],
    keyFeatures: ['地理空间分析', '环境规划咨询', '可持续发展研究', '地理信息系统应用', '区域发展规划'],
    rating: 4.6,
    duration: '45分钟咨询'
  },
  {
    id: 'historian',
    title: '历史学家',
    description: '研究历史事件、文化遗产和历史演变的专家。',
    fullDescription: '历史学家通过深入研究历史事件、文化遗产和历史演变，为您提供历史视角和深度分析。支持历史研究、文化遗产保护、历史教育等领域的专业咨询。',
    icon: '📜',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'academic',
    categoryName: '学术研究',
    featured: false,
    features: ['历史研究', '文化遗产', '历史分析', '历史教育'],
    keyFeatures: ['历史事件分析', '文化遗产保护', '历史教育咨询', '历史文献研究', '历史文化旅游规划'],
    rating: 4.8,
    duration: '60分钟咨询'
  },
  {
    id: 'narratologist',
    title: '叙事学家',
    description: '叙事理论、故事结构、角色弧线和文学分析专家。',
    fullDescription: '叙事学家基于从普罗普到坎贝尔到现代叙事学的既定框架，为您提供深入的叙事分析和故事结构建议。支持小说写作、剧本创作、游戏叙事等领域的专业咨询。',
    icon: '📜',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'academic',
    categoryName: '学术研究',
    featured: false,
    features: ['叙事分析', '故事结构', '角色弧线', '文学分析'],
    keyFeatures: ['叙事结构分析', '故事连贯性评估', '角色发展指导', '类型惯例分析', '框架应用'],
    rating: 4.7,
    duration: '45分钟咨询'
  },
  {
    id: 'psychologist',
    title: '心理学家',
    description: '人类行为、人格理论、动机和认知模式专家。',
    fullDescription: '心理学家基于临床和研究框架，为您提供深入的心理分析和行为洞察。支持角色塑造、人际关系分析、创伤反应模拟等领域的专业咨询。',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'academic',
    categoryName: '学术研究',
    featured: false,
    features: ['人格分析', '动机研究', '认知模式', '人际关系'],
    keyFeatures: ['角色心理分析', '创伤反应模拟', '人际动态评估', '群体心理学分析', '发展轨迹分析'],
    rating: 4.9,
    duration: '60分钟咨询'
  },
  
  // 设计创意
  {
    id: 'brand-guardian',
    title: '品牌守护者',
    description: '保护和维护品牌形象、视觉一致性的设计专家。',
    fullDescription: '品牌守护者专注于保护和维护品牌形象、视觉一致性。支持品牌战略规划、视觉识别系统设计、品牌资产管理等领域的专业服务。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: true,
    features: ['品牌管理', '视觉一致性', '品牌策略', '品牌资产'],
    keyFeatures: ['品牌战略规划', '视觉识别系统设计', '品牌资产管理', '品牌一致性审计', '品牌传播策略'],
    rating: 4.9,
    duration: '2小时咨询'
  },
  {
    id: 'ui-designer',
    title: 'UI设计师',
    description: '专注于用户界面设计、交互体验和视觉美感的专家。',
    fullDescription: 'UI设计师专注于用户界面设计、交互体验和视觉美感。支持移动应用、网站、桌面软件等产品的用户界面设计和用户体验优化。',
    icon: '🖌️',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: true,
    features: ['界面设计', '交互体验', '视觉美感', '用户体验'],
    keyFeatures: ['移动应用界面设计', '网站界面设计', '交互原型设计', '视觉风格指南', '用户体验优化'],
    rating: 4.8,
    duration: '3小时设计'
  },
  {
    id: 'image-prompt-engineer',
    title: '图像提示工程师',
    description: '专注于为AI图像生成制作详细、引人入胜的提示词的专家。',
    fullDescription: '图像提示工程师精通将视觉概念转化为精确语言的艺术，通过生成式AI工具产生令人惊叹的专业品质摄影。了解摄影的技术方面和AI模型最有效响应的语言模式。',
    icon: '📷',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['提示词工程', '摄影技术', 'AI图像生成', '视觉概念'],
    keyFeatures: ['专业摄影提示词', '平台特定优化', '技术摄影翻译', '视觉概念沟通', '多平台提示模式'],
    rating: 4.9,
    duration: '2小时咨询'
  },
  {
    id: 'inclusive-visuals-specialist',
    title: '包容性视觉专家',
    description: '专门生成文化准确、肯定性和非刻板印象图像和视频的专家。',
    fullDescription: '包容性视觉专家致力于击败系统AI偏见，生成文化准确、肯定性和非刻板印象的图像和视频。确保生成的媒体以尊严、能动性和真实的情境现实主义描绘主体，而不是依赖标准AI原型。',
    icon: '🌈',
    gradient: 'linear-gradient(135deg, #4DB6AC 0%, #26A69A 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['文化准确性', '无偏见表示', 'AI幻觉预防', '包容性设计'],
    keyFeatures: ['反偏见提示架构', '负面提示库', '物理现实定义', '社区验证', '多模态连续性提示'],
    rating: 4.8,
    duration: '3小时咨询'
  },
  {
    id: 'ux-architect',
    title: 'UX架构师',
    description: '技术架构和UX专家，为开发人员提供坚实的基础、CSS系统和明确的实现指导。',
    fullDescription: 'UX架构师创建开发人员就绪的基础，包括CSS设计系统、布局框架和清晰的UX结构。弥合项目规范和实现之间的差距，确保专业的UX基线。',
    icon: '📐',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['CSS架构', '布局系统', '组件设计', '响应式策略'],
    keyFeatures: ['设计系统变量', '布局框架规范', '主题切换实现', '信息架构', '开发者交接文档'],
    rating: 4.7,
    duration: '4小时架构设计'
  },
  {
    id: 'ux-researcher',
    title: 'UX研究员',
    description: '专注于用户行为分析、可用性测试和数据驱动设计洞察的专家。',
    fullDescription: 'UX研究员通过严格的研究方法和数据驱动的建议，弥合用户需求和设计解决方案之间的差距。进行全面的用户研究，创建详细的用户角色，并通过可用性测试验证设计决策。',
    icon: '🔬',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['用户研究', '可用性测试', '数据驱动洞察', '用户行为分析'],
    keyFeatures: ['用户角色创建', '用户旅程映射', '研究协议设计', '数据合成', '可操作建议'],
    rating: 4.6,
    duration: '5小时研究'
  },
  {
    id: 'visual-storyteller',
    title: '视觉故事讲述者',
    description: '专注于创建引人入胜的视觉叙事、多媒体内容和品牌故事的专家。',
    fullDescription: '视觉故事讲述者将复杂信息转化为引人入胜的视觉故事，与受众建立联系并推动情感参与。创建视频内容、动画、信息图表和交互式媒体，确保跨平台的一致品牌故事讲述。',
    icon: '🎬',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['视觉叙事', '多媒体设计', '品牌故事', '信息设计'],
    keyFeatures: ['故事弧创建', '视频故事讲述', '数据可视化', '跨平台适应', '情感旅程映射'],
    rating: 4.8,
    duration: '4小时创作'
  },
  {
    id: 'whimsy-injector',
    title: '创意专家',
    description: '专注于为品牌体验添加个性、愉悦和有趣元素的专家。',
    fullDescription: '创意专家通过意外的愉悦时刻为品牌体验增添个性和差异化，同时保持专业性和品牌完整性。设计令人难忘的、快乐的互动，包括微交互、有趣的微文案和隐藏功能。',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'design',
    categoryName: '设计创意',
    featured: false,
    features: ['品牌个性', '微交互', '游戏化', '愉悦体验'],
    keyFeatures: ['品牌个性框架', '微交互设计系统', '有趣的微文案', '游戏化系统设计', '复活节彩蛋系统'],
    rating: 4.7,
    duration: '3小时创意设计'
  },
  
  // 工程技术
  {
    id: 'frontend-developer',
    title: '前端开发工程师',
    description: '专业的前端开发服务，提供现代化的Web应用界面和交互体验。',
    fullDescription: '前端开发工程师专注于现代Web技术、UI框架和性能优化。创建响应式、可访问且性能优异的Web应用，实现像素级设计和卓越的用户体验。',
    icon: '🖥️',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: true,
    features: ['响应式设计', '性能优化', '交互设计', '代码质量'],
    keyFeatures: ['现代Web应用开发', 'UI框架实现', '性能优化', '可访问性设计', '前端架构设计'],
    rating: 4.9,
    duration: '即时响应'
  },
  {
    id: 'backend-architect',
    title: '后端架构师',
    description: '设计和实现可扩展、高性能的后端系统和API架构。',
    fullDescription: '后端架构师专注于设计和实现可扩展、高性能的后端系统和API架构。支持服务器端系统、微服务、云基础设施等领域的设计和开发。',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: true,
    features: ['系统架构', 'API设计', '性能优化', '安全性'],
    keyFeatures: ['后端系统设计', 'API架构设计', '微服务架构', '数据库设计', '云基础设施'],
    rating: 4.8,
    duration: '2小时咨询'
  },
  {
    id: 'ai-engineer',
    title: 'AI工程师',
    description: '开发和部署机器学习模型、AI系统和数据管道的专家。',
    fullDescription: 'AI工程师专注于开发和部署机器学习模型、AI系统和数据管道。支持机器学习功能、数据处理、AI集成等领域的设计和实现。',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: true,
    features: ['机器学习', '模型部署', '数据管道', 'AI集成'],
    keyFeatures: ['机器学习模型开发', '模型部署和监控', '数据管道构建', 'AI系统集成', '自然语言处理'],
    rating: 4.9,
    duration: '3小时咨询'
  },
  {
    id: 'devops-automator',
    title: 'DevOps自动化工程师',
    description: '设计和实现CI/CD管道、自动化部署和基础设施管理的专家。',
    fullDescription: 'DevOps自动化工程师专注于设计和实现CI/CD管道、自动化部署和基础设施管理。支持管道开发、部署自动化、监控等领域的设计和实现。',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['CI/CD', '自动化部署', '基础设施管理', '监控'],
    keyFeatures: ['CI/CD管道设计', '自动化部署脚本', '基础设施即代码', '监控系统搭建', '容器化部署'],
    rating: 4.7,
    duration: '2小时配置'
  },
  {
    id: 'ai-data-remediation-engineer',
    title: 'AI数据修复工程师',
    description: '专注于自修复数据管道的专家，使用本地SLM和语义聚类自动检测、分类和修复大规模数据异常。',
    fullDescription: 'AI数据修复工程师使用气隙本地SLM和语义聚类来自动检测、分类和大规模修复数据异常。专注于修复层：拦截不良数据，通过Ollama生成确定性修复逻辑，并保证零数据丢失。',
    icon: '🧬',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['数据修复', '语义聚类', '本地AI', '零数据丢失'],
    keyFeatures: ['语义异常压缩', '气隙SLM修复生成', '零数据丢失保证', '混合指纹识别', '完整审计跟踪'],
    rating: 4.9,
    duration: '3小时修复'
  },
  {
    id: 'data-engineer',
    title: '数据工程师',
    description: '专注于构建可靠的数据管道、湖仓架构和可扩展数据基础设施的专家。',
    fullDescription: '数据工程师掌握ETL/ELT、Apache Spark、dbt、流系统和云数据平台，将原始数据转化为可信赖的、分析就绪的资产。设计和构建幂等、可观察和自修复的管道，实现Medallion架构（Bronze → Silver → Gold）。',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['数据管道', '湖仓架构', '数据质量', '流处理'],
    keyFeatures: ['ETL/ELT管道设计', 'Medallion架构实现', '数据质量检查', '流处理系统', '云数据平台架构'],
    rating: 4.8,
    duration: '4小时架构设计'
  },
  {
    id: 'autonomous-optimization-architect',
    title: '自主优化架构师',
    description: '智能系统调节器，持续测试API性能，同时执行严格的财务和安全护栏，防止成本失控。',
    fullDescription: '自主优化架构师是自改进软件的调节器，其任务是实现自主系统进化（寻找更快、更便宜、更智能的任务执行方式），同时在数学上保证系统不会破产或陷入恶意循环。',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #673AB7 0%, #5E35B1 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['A/B优化', '自主路由', '财务护栏', '安全护栏'],
    keyFeatures: ['LLM-as-a-Judge评估', '多提供商路由器', '影子流量实现', '成本执行监控', '异常检测'],
    rating: 4.8,
    duration: '3小时优化'
  },
  {
    id: 'cms-developer',
    title: 'CMS开发者',
    description: 'Drupal和WordPress专家，专注于主题开发、自定义插件/模块、内容架构和代码优先的CMS实现。',
    fullDescription: 'CMS开发者是Drupal和WordPress网站开发的专家，构建从小型非营利组织的宣传网站到服务数百万页面浏览量的企业Drupal平台。将CMS视为一流的工程环境，而不是拖放式事后想法。',
    icon: '🧱',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['主题开发', '插件开发', '内容架构', '代码优先'],
    keyFeatures: ['WordPress主题开发', 'Drupal模块开发', 'Gutenberg块开发', 'ACF集成', '内容模型设计'],
    rating: 4.7,
    duration: '4小时开发'
  },
  {
    id: 'code-reviewer',
    title: '代码审查员',
    description: '提供建设性、可操作的反馈，专注于正确性、可维护性、安全性和性能，而不是风格偏好的专家。',
    fullDescription: '代码审查员是提供全面、建设性代码审查的专家，专注于重要的方面——正确性、安全性、可维护性和性能——而不是标签与空格的争论。',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['代码审查', '质量保证', '安全检查', '性能优化'],
    keyFeatures: ['正确性检查', '安全漏洞检测', '可维护性评估', '性能瓶颈识别', '测试覆盖评估'],
    rating: 4.8,
    duration: '2小时审查'
  },
  {
    id: 'database-optimizer',
    title: '数据库优化师',
    description: '专注于PostgreSQL、MySQL和现代数据库如Supabase和PlanetScale的模式设计、查询优化、索引策略和性能调优的专家。',
    fullDescription: '数据库优化师是数据库性能专家，思考查询计划、索引和连接池。设计可扩展的模式，编写快速查询，并使用EXPLAIN ANALYZE调试慢查询。PostgreSQL是主要领域，但也精通MySQL、Supabase和PlanetScale模式。',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['模式设计', '查询优化', '索引策略', '性能调优'],
    keyFeatures: ['PostgreSQL优化', 'EXPLAIN ANALYZE分析', '索引策略设计', 'N+1查询检测', '连接池管理'],
    rating: 4.7,
    duration: '3小时优化'
  },
  {
    id: 'email-intelligence-engineer',
    title: '邮件智能工程师',
    description: '从原始邮件线程中提取结构化、可推理数据的专家，为AI智能体和自动化系统服务。',
    fullDescription: '邮件智能工程师是构建将原始邮件数据转换为AI智能体可用的结构化、可推理上下文的管道的专家。专注于线程重建、参与者检测、内容去重，并提供智能体框架可以可靠消费的干净结构化输出。',
    icon: '📧',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['邮件解析', '线程重建', '内容去重', '上下文组装'],
    keyFeatures: ['MIME解析', '引用内容去重', '参与者检测', '决策跟踪', '混合检索'],
    rating: 4.8,
    duration: '4小时开发'
  },
  {
    id: 'embedded-firmware-engineer',
    title: '嵌入式固件工程师',
    description: '裸机和RTOS固件专家，专注于ESP32/ESP-IDF、PlatformIO、Arduino、ARM Cortex-M、STM32 HAL/LL、Nordic nRF5/nRF Connect SDK、FreeRTOS、Zephyr。',
    fullDescription: '嵌入式固件工程师为资源受限的嵌入式系统设计和实现生产级固件，编写尊重硬件约束（RAM、闪存、时序）的正确、确定性固件，设计避免优先级反转和死锁的RTOS任务架构。',
    icon: '🔩',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['固件开发', 'RTOS', '通信协议', '硬件集成'],
    keyFeatures: ['ESP32/ESP-IDF', 'STM32 HAL/LL', 'Nordic nRF', 'FreeRTOS', 'Zephyr'],
    rating: 4.7,
    duration: '5小时开发'
  },
  {
    id: 'feishu-integration-developer',
    title: '飞书集成开发者',
    description: '飞书（Lark）开放平台的全栈集成专家，精通飞书机器人、小程序、审批工作流、Bitable（多维表格）、交互式消息卡片、Webhooks、SSO认证和工作流自动化。',
    fullDescription: '飞书集成开发者是飞书开放平台的全栈集成专家，精通飞书的每一层能力——从低级API到高级业务编排——并能在飞书生态系统内高效实现企业OA审批、数据管理、团队协作和业务通知。',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['飞书机器人', '审批工作流', 'Bitable', 'SSO认证'],
    keyFeatures: ['消息卡片构建', '事件订阅', 'Bitable数据同步', 'OAuth授权', '小程序开发'],
    rating: 4.8,
    duration: '4小时集成'
  },
  {
    id: 'filament-optimization-specialist',
    title: 'Filament优化专家',
    description: '重组和优化Filament PHP管理界面以实现最大可用性和效率的专家，专注于有影响力的结构变化，而不仅仅是表面调整。',
    fullDescription: 'Filament优化专家专注于使Filament PHP应用程序生产就绪且美观，专注于结构上的高影响力变化，这些变化真正改变管理员体验表单的方式——而不是表面级的调整，如添加图标或提示。',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['结构优化', '表单设计', '导航改进', '用户体验'],
    keyFeatures: ['标签分离', '并排部分', '范围滑块替换', '可折叠部分', '重复器项目标签'],
    rating: 4.7,
    duration: '3小时优化'
  },
  {
    id: 'git-workflow-master',
    title: 'Git工作流大师',
    description: 'Git工作流、分支策略和版本控制最佳实践的专家，包括常规提交、变基、工作树和CI友好的分支管理。',
    fullDescription: 'Git工作流大师是Git工作流和版本控制策略的专家，帮助团队保持干净的历史记录，使用有效的分支策略，并利用高级Git功能如工作树、交互式变基和二分查找。',
    icon: '🌿',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['Git工作流', '分支策略', '版本控制', 'CI集成'],
    keyFeatures: ['常规提交', '变基策略', '工作树管理', '冲突解决', '分支保护'],
    rating: 4.6,
    duration: '2小时咨询'
  },
  {
    id: 'incident-response-commander',
    title: '事件响应指挥官',
    description: '专注于生产事件管理、结构化响应协调、事后分析 facilitation、SLO/SLI跟踪和可靠工程组织的待命流程设计的专家。',
    fullDescription: '事件响应指挥官是将混乱转化为结构化解决方案的专家事件管理专家，协调生产事件响应，建立严重性框架，运行无责备的事后分析，并构建保持系统可靠和工程师理智的待命文化。',
    icon: '🚨',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['事件管理', '事后分析', 'SLO/SLI', '待命流程'],
    keyFeatures: ['严重性分类', '结构化响应', '无责备文化', '运行手册维护', '混沌工程'],
    rating: 4.9,
    duration: '24小时响应'
  },
  {
    id: 'mobile-app-builder',
    title: '移动应用构建师',
    description: '专业的移动应用开发者，精通原生iOS/Android开发和跨平台框架。',
    fullDescription: '移动应用构建师是专业的移动应用开发者，精通原生iOS/Android开发和跨平台框架，创建高性能、用户友好的移动体验，具有平台特定的优化和现代移动开发模式。',
    icon: '📲',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['原生开发', '跨平台', '性能优化', '用户体验'],
    keyFeatures: ['iOS SwiftUI', 'Android Jetpack Compose', 'React Native', 'Flutter', '性能优化'],
    rating: 4.8,
    duration: '5小时开发'
  },
  {
    id: 'rapid-prototyper',
    title: '快速原型师',
    description: '专注于超快速概念验证开发和MVP创建的专家，使用高效的工具和框架。',
    fullDescription: '快速原型师是超快速概念验证开发和MVP创建的专家，擅长快速验证想法，构建功能原型，并使用最高效的工具和框架创建最小可行产品，在几天而不是几周内交付工作解决方案。',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['快速原型', 'MVP创建', '验证驱动', '效率优先'],
    keyFeatures: ['Next.js', 'Supabase', 'Clerk', 'shadcn/ui', 'A/B测试'],
    rating: 4.7,
    duration: '3天交付'
  },
  {
    id: 'ai-data-remediation-engineer',
    title: 'AI数据修复工程师',
    description: '专注于自修复数据管道的专家，使用本地SLM和语义聚类自动检测、分类和修复大规模数据异常。',
    fullDescription: 'AI数据修复工程师是处理大规模数据损坏问题的专家，使用本地小型语言模型和语义聚类技术，自动检测、分类和修复数据异常，确保零数据丢失，专注于修复层的精确操作。',
    icon: '🧬',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['数据修复', '语义聚类', '本地AI', '零数据丢失'],
    keyFeatures: ['语义异常压缩', '本地SLM修复', '零数据丢失保证', 'PII保护', '完整审计跟踪'],
    rating: 4.9,
    duration: '4小时修复'
  },
  {
    id: 'ai-engineer',
    title: 'AI工程师',
    description: '专注于机器学习模型开发、部署和集成到生产系统的专家AI/ML工程师。',
    fullDescription: 'AI工程师是专注于机器学习模型开发、部署和集成到生产系统的专家，致力于构建智能功能、数据管道和AI驱动的应用程序，强调实用、可扩展的解决方案。',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['机器学习', '模型部署', 'AI集成', '数据管道'],
    keyFeatures: ['TensorFlow', 'PyTorch', 'Hugging Face', 'MLOps', 'AI伦理'],
    rating: 4.8,
    duration: '5小时开发'
  },
  {
    id: 'backend-architect',
    title: '后端架构师',
    description: '专注于可扩展系统设计、数据库架构、API开发和云基础设施的高级后端架构师。',
    fullDescription: '后端架构师是专注于可扩展系统设计、数据库架构和云基础设施的高级专家，构建健壮、安全、高性能的服务器端应用程序和微服务，能够处理大规模负载同时保持可靠性和安全性。',
    icon: '🏗️',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['系统设计', '数据库架构', 'API开发', '云基础设施'],
    keyFeatures: ['微服务架构', '数据库优化', 'API设计', '安全架构', '性能优化'],
    rating: 4.9,
    duration: '4小时设计'
  },
  {
    id: 'data-engineer',
    title: '数据工程师',
    description: '专注于构建可靠数据管道、数据湖仓架构和可扩展数据基础设施的专家数据工程师。',
    fullDescription: '数据工程师是设计、构建和运营支持分析、AI和商业智能的数据基础设施的专家，将来自不同来源的原始、混乱数据转化为可靠、高质量、可分析的资产，按时、大规模且完全可观察。',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['数据管道', '数据湖仓', 'ETL/ELT', '流处理'],
    keyFeatures: ['Medallion架构', 'Apache Spark', 'dbt', 'Delta Lake', 'Kafka'],
    rating: 4.8,
    duration: '4小时开发'
  },
  {
    id: 'devops-automator',
    title: 'DevOps自动化专家',
    description: '专注于基础设施自动化、CI/CD管道开发和云操作的专家DevOps工程师。',
    fullDescription: 'DevOps自动化专家是专注于基础设施自动化、CI/CD管道开发和云操作的专家，简化开发工作流程，确保系统可靠性，并实现可扩展的部署策略，消除手动流程并减少运营开销。',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['基础设施自动化', 'CI/CD管道', '容器编排', '监控告警'],
    keyFeatures: ['Terraform', 'GitHub Actions', 'Kubernetes', 'Prometheus', '零停机部署'],
    rating: 4.7,
    duration: '3小时配置'
  },
  {
    id: 'frontend-developer',
    title: '前端开发者',
    description: '专注于现代Web技术、React/Vue/Angular框架、UI实现和性能优化的专家前端开发者。',
    fullDescription: '前端开发者是专注于现代Web技术、UI框架和性能优化的专家，创建响应式、可访问且高性能的Web应用程序，具有像素级设计实现和卓越的用户体验。',
    icon: '🖥️',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['现代Web应用', 'UI框架', '性能优化', '可访问性'],
    keyFeatures: ['React', 'Vue', 'Angular', 'TypeScript', 'Core Web Vitals'],
    rating: 4.8,
    duration: '4小时开发'
  },
  {
    id: 'security-engineer',
    title: '安全工程师',
    description: '专注于威胁建模、漏洞评估、安全代码审查、安全架构设计和事件响应的专家应用安全工程师。',
    fullDescription: '安全工程师是专注于威胁建模、漏洞评估、安全代码审查、安全架构设计和事件响应的专家，通过早期识别风险、将安全集成到开发生命周期中，并确保每一层的深度防御，保护应用程序和基础设施。',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['威胁建模', '漏洞评估', '安全代码审查', '安全架构'],
    keyFeatures: ['OWASP Top 10', 'CVSS 3.1', 'SAST/DAST', '零信任架构', '防御深度'],
    rating: 4.9,
    duration: '4小时评估'
  },
  {
    id: 'senior-developer',
    title: '高级开发者',
    description: '高级全栈开发专家，精通Laravel/Livewire/FluxUI、高级CSS和Three.js集成。',
    fullDescription: '高级开发者是创建优质Web体验的高级全栈开发者，精通Laravel/Livewire/FluxUI、高级CSS和Three.js集成，注重细节、性能和创新，打造高端、流畅的用户体验。',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['全栈开发', 'Laravel', 'Livewire', 'FluxUI', 'Three.js'],
    keyFeatures: ['高级CSS', '玻璃拟态', '微交互', '响应式设计', '性能优化'],
    rating: 4.8,
    duration: '5小时开发'
  },
  {
    id: 'software-architect',
    title: '软件架构师',
    description: '专注于系统设计、领域驱动设计、架构模式和技术决策的专家软件架构师。',
    fullDescription: '软件架构师是设计可维护、可扩展且与业务领域对齐的软件系统的专家，以有界上下文、权衡矩阵和架构决策记录为思考基础，平衡竞争关注点并创建能够随团队发展的系统。',
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['系统设计', '领域驱动设计', '架构模式', '技术决策'],
    keyFeatures: ['有界上下文', '架构决策记录', '权衡分析', '演进策略', 'CQRS'],
    rating: 4.9,
    duration: '4小时设计'
  },
  {
    id: 'solidity-smart-contract-engineer',
    title: 'Solidity智能合约工程师',
    description: '专注于EVM智能合约架构、gas优化、可升级代理模式、DeFi协议开发和安全优先合约设计的专家Solidity开发者。',
    fullDescription: 'Solidity智能合约工程师是经验丰富的智能合约开发者，精通EVM，将每一个wei的gas视为宝贵资源，将每一次外部调用视为潜在攻击向量，构建能够在主网上安全运行的合约，其中漏洞可能导致数百万损失且没有第二次机会。',
    icon: '⛓️',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['智能合约开发', 'DeFi协议', 'gas优化', '安全审计'],
    keyFeatures: ['Solidity', 'ERC标准', '可升级代理', 'Foundry', '安全最佳实践'],
    rating: 4.9,
    duration: '5小时开发'
  },
  {
    id: 'sre',
    title: '站点可靠性工程师',
    description: '专注于SLO、错误预算、可观察性、混沌工程和大规模生产系统辛劳减少的专家站点可靠性工程师。',
    fullDescription: '站点可靠性工程师将可靠性视为具有可测量预算的特性，定义反映用户体验的SLO，构建能够回答尚未提出的问题的可观察性，并自动化辛劳工作，使工程师能够专注于重要事项。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['SLO管理', '可观察性', '混沌工程', '自动化'],
    keyFeatures: ['错误预算', '监控告警', '混沌测试', '容量规划', '辛劳减少'],
    rating: 4.8,
    duration: '4小时优化'
  },
  {
    id: 'technical-writer',
    title: '技术写作者',
    description: '专注于开发者文档、API参考、README文件和教程的专家技术写作者。',
    fullDescription: '技术写作者是连接构建者和使用者之间的桥梁，将复杂的工程概念转化为清晰、准确且引人入胜的文档，让开发者真正愿意阅读和使用。',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['开发者文档', 'API参考', '教程编写', '文档架构'],
    keyFeatures: ['README编写', 'API文档', '教程创建', 'Docusaurus', '文档测试'],
    rating: 4.7,
    duration: '3小时文档'
  },
  {
    id: 'threat-detection-engineer',
    title: '威胁检测工程师',
    description: '专注于SIEM规则开发、MITRE ATT&CK覆盖映射、威胁狩猎、告警调优和检测即代码管道的专家检测工程师。',
    fullDescription: '威胁检测工程师构建在攻击者绕过预防控制后捕获他们的检测层，编写SIEM检测规则，映射MITRE ATT&CK覆盖，狩猎自动化检测遗漏的威胁，并严格调优告警，确保SOC团队信任他们看到的内容。',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #7B2D8E 0%, #641E7A 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['SIEM规则', 'MITRE ATT&CK', '威胁狩猎', '告警调优'],
    keyFeatures: ['Sigma规则', '检测即代码', '威胁狩猎', 'MITRE映射', '告警优化'],
    rating: 4.8,
    duration: '4小时配置'
  },
  {
    id: 'wechat-mini-program-developer',
    title: '微信小程序开发者',
    description: '专注于使用WXML/WXSS/WXS开发小程序、微信API集成、支付系统、订阅消息和完整微信生态系统的专家微信小程序开发者。',
    fullDescription: '微信小程序开发者是专注于在微信生态系统中构建高性能、用户友好的小程序的专家，理解小程序不仅仅是应用，而是深度集成到微信的社交结构、支付基础设施和超过10亿人的日常用户习惯中。',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'engineering',
    categoryName: '工程技术',
    featured: false,
    features: ['小程序开发', '微信API集成', '支付系统', '订阅消息'],
    keyFeatures: ['WXML/WXSS', '微信支付', '订阅消息', '性能优化', '生态系统集成'],
    rating: 4.7,
    duration: '5小时开发'
  },
  
  // 游戏开发
  {
    id: 'game-designer',
    title: '游戏设计师',
    description: '设计游戏机制、关卡、故事和游戏体验的专家。',
    fullDescription: '游戏设计师专注于设计游戏机制、关卡、故事和游戏体验。支持游戏概念设计、玩法设计、关卡设计等领域的专业服务。',
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'game-development',
    categoryName: '游戏开发',
    featured: false,
    features: ['游戏机制', '关卡设计', '故事创作', '游戏体验'],
    keyFeatures: ['游戏概念设计', '玩法机制设计', '关卡设计', '游戏故事创作', '游戏平衡调整'],
    rating: 4.6,
    duration: '4小时设计'
  },
  {
    id: 'technical-artist',
    title: '技术美术师',
    description: '将艺术与技术结合，创建游戏视觉效果和资产的专家。',
    fullDescription: '技术美术师专注于将艺术与技术结合，创建游戏视觉效果和资产。支持3D建模、材质设计、特效制作等领域的专业服务。',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'game-development',
    categoryName: '游戏开发',
    featured: false,
    features: ['视觉效果', '资产创建', '技术实现', '性能优化'],
    keyFeatures: ['3D建模和纹理', '材质和着色器设计', '特效制作', '资产优化', '实时渲染技术'],
    rating: 4.7,
    duration: '5小时制作'
  },
  {
    id: 'game-audio-engineer',
    title: '游戏音频工程师',
    description: '交互式音频专家，精通FMOD/Wwise集成、自适应音乐系统、空间音频和所有游戏引擎的音频性能预算。',
    fullDescription: '游戏音频工程师设计交互式音频架构，响应游戏状态，实现自适应音乐系统，构建空间音景，并通过FMOD、Wwise或原生引擎音频集成音频。确保每个枪声、脚步声和音乐提示在游戏世界中感觉生动。',
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    category: 'game-development',
    categoryName: '游戏开发',
    featured: false,
    features: ['音频集成', '自适应音乐', '空间音频', '性能优化'],
    keyFeatures: ['FMOD/Wwise集成', '自适应音乐系统', '空间音频设计', '音频性能预算', '音频参数架构'],
    rating: 4.8,
    duration: '4小时音频设计'
  },
  
  // 市场营销
  {
    id: 'bilibili-content-strategist',
    title: 'Bilibili内容策略师',
    description: '专注于B站内容策略、UP主成长和社区运营的专家。',
    fullDescription: 'Bilibili内容策略师专注于B站内容策略、UP主成长和社区运营。支持内容策划、UP主培养、社区建设等领域的专业服务。',
    icon: '📺',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'marketing',
    categoryName: '市场营销',
    featured: true,
    features: ['内容策略', 'UP主成长', '社区运营', '平台算法'],
    keyFeatures: ['B站内容策划', 'UP主培养计划', '社区建设策略', '平台算法优化', '品牌内容营销'],
    rating: 4.8,
    duration: '2小时咨询'
  },
  {
    id: 'seo-specialist',
    title: 'SEO专家',
    description: '优化网站搜索引擎排名、提高有机流量的专家。',
    fullDescription: 'SEO专家专注于优化网站搜索引擎排名、提高有机流量。支持关键词研究、内容优化、技术SEO等领域的专业服务。',
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'marketing',
    categoryName: '市场营销',
    featured: false,
    features: ['关键词优化', '内容策略', '流量分析', '技术SEO'],
    keyFeatures: ['关键词研究', '内容优化策略', '技术SEO审计', '链接建设', '流量分析和优化'],
    rating: 4.7,
    duration: '3小时优化'
  },
  {
    id: 'social-media-strategist',
    title: '社交媒体策略师',
    description: '制定和执行社交媒体营销策略、内容创作和社区管理的专家。',
    fullDescription: '社交媒体策略师专注于制定和执行社交媒体营销策略、内容创作和社区管理。支持社交媒体规划、内容创作、社区互动等领域的专业服务。',
    icon: '📱',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'marketing',
    categoryName: '市场营销',
    featured: false,
    features: ['营销策略', '内容创作', '社区管理', '数据分析'],
    keyFeatures: ['社交媒体策略规划', '内容创作和发布', '社区互动管理', '社交媒体广告', '数据分析和优化'],
    rating: 4.6,
    duration: '2小时策略'
  },
  {
    id: 'douyin-strategist',
    title: '抖音策略师',
    description: '短视频营销专家，专注于抖音平台，精通推荐算法机制、viral视频策划、直播电商流程和通过内容矩阵策略实现全漏斗品牌增长。',
    fullDescription: '抖音策略师设计高完成率视频结构：黄金3秒钩子 + 信息密度 + 结尾悬念，规划内容矩阵系列，紧跟抖音热门BGM、挑战活动和话题标签，优化视频节奏，掌握抖音核心算法，确保短视频真正被看到。',
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    category: 'marketing',
    categoryName: '市场营销',
    featured: false,
    features: ['短视频策划', '流量运营', '直播电商', '算法优化'],
    keyFeatures: ['视频结构设计', '内容矩阵策略', 'DOU+投放', '直播脚本设计', '数据优化'],
    rating: 4.8,
    duration: '4小时策略规划'
  },
  
  // 产品管理
  {
    id: 'product-manager',
    title: '产品经理',
    description: '规划和管理产品生命周期、功能优先级和用户需求的专家。',
    fullDescription: '产品经理专注于规划和管理产品生命周期、功能优先级和用户需求。支持产品规划、需求管理、产品路线图等领域的专业服务。',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
    category: 'product',
    categoryName: '产品管理',
    featured: true,
    features: ['产品规划', '需求管理', '优先级设定', '用户研究'],
    keyFeatures: ['产品战略规划', '需求收集和管理', '产品路线图制定', '用户研究和分析', '产品发布和迭代'],
    rating: 4.8,
    duration: '3小时规划'
  },
  {
    id: 'behavioral-nudge-engine',
    title: '行为推动引擎',
    description: '行为心理学专家，通过适应软件交互节奏和风格来最大化用户动机和成功。',
    fullDescription: '行为推动引擎将被动软件仪表板转变为主动、定制的生产力伙伴。它适应软件交互以通过行为心理学最大化用户动机，包括节奏个性化、认知负荷减少、动力建立和默认偏见利用。',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #FF8A65 0%, #FF7043 100%)',
    category: 'product',
    categoryName: '产品管理',
    featured: false,
    features: ['行为心理学', '用户动机', '交互设计', '习惯形成'],
    keyFeatures: ['节奏个性化', '认知负荷减少', '动力建立', '默认偏见利用', '微冲刺提示'],
    rating: 4.7,
    duration: '2小时咨询'
  },
  
  // 销售策略
  {
    id: 'sales-strategist',
    title: '销售策略师',
    description: '制定销售策略、客户开发和交易达成的专家。',
    fullDescription: '销售策略师专注于制定销售策略、客户开发和交易达成。支持销售计划制定、客户开发、谈判策略等领域的专业服务。',
    icon: '💼',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'sales',
    categoryName: '销售策略',
    featured: false,
    features: ['销售策略', '客户开发', '交易达成', '谈判技巧'],
    keyFeatures: ['销售策略制定', '客户开发计划', '销售漏斗优化', '谈判策略', '销售团队培训'],
    rating: 4.7,
    duration: '2小时咨询'
  },
  {
    id: 'account-strategist',
    title: '客户账户策略师',
    description: '专业售后账户策略师，专注于落地和扩展执行、利益相关者映射、QBR促进和净收入保留。通过系统扩展规划和多线程账户开发将已关闭的交易转变为长期平台关系。',
    fullDescription: '客户账户策略师将每个客户账户视为有空白空间需要填补的领地，系统识别扩展机会，建立多线程关系，将点解决方案转变为企业平台。擅长设计和执行针对账户成熟度和产品采用阶段的扩展剧本，监控使用触发的扩展信号，构建冠军启用工具包，并协调产品和客户成功团队进行产品内扩展提示。',
    icon: '🗺️',
    gradient: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
    category: 'sales',
    categoryName: '销售策略',
    featured: false,
    features: ['账户扩展', '利益相关者映射', 'QBR设计', '净收入保留'],
    keyFeatures: ['落地和扩展执行', '多线程账户开发', '冠军启用', 'QBR促进', '客户健康管理'],
    rating: 4.8,
    duration: '3小时策略规划'
  },
  
  // 付费媒体
  {
    id: 'ppc-strategist',
    title: 'PPC广告策略师',
    description: '高级付费媒体策略师，专注于Google、Microsoft和Amazon广告平台的大规模搜索、购物和Performance Max广告活动架构。',
    fullDescription: 'PPC广告策略师设计从每月10K到10M+支出规模的账户结构、预算分配框架和出价策略。擅长账户架构设计、自动化出价策略选择、预算管理和跨平台广告活动设计。',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'paid-media',
    categoryName: '付费媒体',
    featured: false,
    features: ['账户架构', '出价策略', '预算管理', '关键词策略'],
    keyFeatures: ['广告活动结构设计', '自动化出价策略', '预算分配框架', '跨平台广告活动', '受众策略'],
    rating: 4.8,
    duration: '3小时策略规划'
  },
  
  // 项目管理
  {
    id: 'project-shepherd',
    title: '项目牧羊人',
    description: '专业项目经理，专注于跨职能项目协调、时间线管理和利益相关者对齐。将项目从概念引导至完成，同时管理多个团队和部门的资源、风险和沟通。',
    fullDescription: '项目牧羊人是跨职能项目协调和利益相关者对齐专家，擅长规划和执行涉及多个团队和部门的大规模项目，开发综合项目时间线，协调资源分配，管理项目范围、预算和时间线，并确保95%的项目按时在批准的预算内交付。',
    icon: '🐑',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'project-management',
    categoryName: '项目管理',
    featured: false,
    features: ['项目协调', '时间线管理', '利益相关者对齐', '风险缓解'],
    keyFeatures: ['跨职能项目规划', '资源分配', '沟通策略', '风险评估', '质量保证'],
    rating: 4.9,
    duration: '4小时项目规划'
  },
  
  // 空间计算
  {
    id: 'visionos-spatial-engineer',
    title: 'visionOS空间工程师',
    description: '原生visionOS空间计算、SwiftUI体积界面和Liquid Glass设计实现专家。',
    fullDescription: 'visionOS空间工程师专注于利用visionOS 26的空间计算能力创建沉浸式、高性能的应用程序，遵循Apple的Liquid Glass设计原则。擅长Liquid Glass设计系统、空间小部件、增强WindowGroups、SwiftUI体积API和RealityKit-SwiftUI集成。',
    icon: '🥽',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['空间计算', 'SwiftUI', 'RealityKit', 'Liquid Glass设计'],
    keyFeatures: ['Liquid Glass设计系统', '空间小部件', '增强WindowGroups', 'SwiftUI体积API', 'RealityKit-SwiftUI集成'],
    rating: 4.7,
    duration: '4小时开发'
  },
  {
    id: 'xr-interface-architect',
    title: 'XR界面架构师',
    description: 'XR界面架构专家，专注于设计和实现沉浸式空间用户界面。',
    fullDescription: 'XR界面架构师专注于设计和实现沉浸式空间用户界面，创建直观、舒适的空间交互体验。擅长空间布局设计、交互模式设计、性能优化和跨平台XR界面开发。',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['XR界面设计', '空间布局', '交互模式', '性能优化'],
    keyFeatures: ['空间用户界面设计', '交互模式设计', '性能优化', '跨平台兼容', '用户体验测试'],
    rating: 4.8,
    duration: '4小时设计'
  },
  {
    id: 'macos-spatial-metal-engineer',
    title: 'macOS空间Metal工程师',
    description: 'macOS空间计算和Metal图形编程专家，专注于高性能图形渲染和空间效果。',
    fullDescription: 'macOS空间Metal工程师专注于利用Metal图形API实现高性能图形渲染和空间效果，为macOS应用程序创建沉浸式空间体验。擅长Metal编程、图形优化、空间渲染技术和GPU加速。',
    icon: '💻',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['Metal编程', '图形渲染', '性能优化', '空间效果'],
    keyFeatures: ['Metal图形编程', '高性能渲染', '空间效果实现', 'GPU加速', '跨设备兼容'],
    rating: 4.7,
    duration: '4小时开发'
  },
  {
    id: 'xr-immersive-developer',
    title: 'XR沉浸式开发者',
    description: 'XR沉浸式应用开发专家，专注于创建互动性强、视觉效果出色的沉浸式体验。',
    fullDescription: 'XR沉浸式开发者专注于创建互动性强、视觉效果出色的沉浸式体验，包括VR、AR和MR应用。擅长3D建模、交互设计、物理模拟和跨平台XR开发。',
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['XR开发', '3D建模', '交互设计', '物理模拟'],
    keyFeatures: ['沉浸式应用开发', '3D场景构建', '交互系统设计', '物理模拟', '跨平台部署'],
    rating: 4.6,
    duration: '5小时开发'
  },
  {
    id: 'xr-cockpit-specialist',
    title: 'XR驾驶舱专家',
    description: 'XR驾驶舱和控制室设计专家，专注于创建高效、直观的空间控制界面。',
    fullDescription: 'XR驾驶舱专家专注于设计和实现高效、直观的空间控制界面，为专业用户提供沉浸式的控制体验。擅长人机界面设计、空间布局优化、控制模式设计和性能优化。',
    icon: '✈️',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['驾驶舱设计', '控制界面', '空间布局', '用户体验'],
    keyFeatures: ['空间控制界面设计', '人机交互优化', '性能优化', '专业应用集成', '用户测试'],
    rating: 4.7,
    duration: '4小时设计'
  },
  {
    id: 'terminal-integration',
    title: '终端集成专家',
    description: '空间计算终端集成专家，专注于将传统终端功能与空间计算环境无缝集成。',
    fullDescription: '终端集成专家专注于将传统终端功能与空间计算环境无缝集成，创建高效、直观的空间终端体验。擅长命令行界面设计、空间交互优化、性能调优和跨平台兼容。',
    icon: '💻',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'spatial-computing',
    categoryName: '空间计算',
    featured: false,
    features: ['终端集成', '命令行界面', '空间交互', '性能优化'],
    keyFeatures: ['空间终端设计', '命令行界面优化', '空间交互模式', '性能调优', '跨平台兼容'],
    rating: 4.6,
    duration: '3小时开发'
  },
  
  // 专业领域
  {
    id: 'workflow-architect',
    title: '工作流架构师',
    description: '工作流设计专家，为每个系统、用户旅程和智能体交互映射完整的工作流树，涵盖快乐路径、所有分支条件、失败模式、恢复路径、交接契约和可观察状态。',
    fullDescription: '工作流架构师介于产品意图和实现之间，确保在构建任何东西之前，系统的每条路径都被明确命名，每个决策节点都被记录，每个失败模式都有恢复动作，系统之间的每次交接都有定义的契约。生成工程师可以实现、QA可以测试的构建就绪规范。',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['工作流设计', '系统分析', '失败模式', '交接契约'],
    keyFeatures: ['工作流发现', '工作流注册表', '分支条件映射', '可观察状态', '构建就绪规范'],
    rating: 4.9,
    duration: '5小时设计'
  },
  {
    id: 'accounts-payable-agent',
    title: '应付账款智能体',
    description: '自主支付处理专家，执行供应商支付、承包商发票和跨任何支付渠道的定期账单 — 加密货币、法定货币、稳定币。',
    fullDescription: '应付账款智能体是自主支付运营专家，处理从一次性供应商发票到定期承包商付款的所有事项。它尊重每一分钱，维护清晰的审计跟踪，并且在没有适当验证的情况下从不发送付款。',
    icon: '💸',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['支付处理', '审计跟踪', '多渠道支付', '集成能力'],
    keyFeatures: ['自主支付执行', '多渠道支付路由', '幂等性保证', '供应商注册表', '审计报告生成'],
    rating: 4.8,
    duration: '即时处理'
  },
  {
    id: 'agentic-identity-trust',
    title: '智能体身份与信任架构师',
    description: '设计自主AI智能体在多智能体环境中运行的身份、认证和信任验证系统。',
    fullDescription: '智能体身份与信任架构师构建让自主智能体在高风险环境中安全运行的身份和验证基础设施。设计智能体可以证明自己身份、验证彼此权限并为每个重要行动生成防篡改记录的系统。',
    icon: '🔐',
    gradient: 'linear-gradient(135deg, #2d5a27 0%, #1b3a1a 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['身份系统', '信任验证', '审计跟踪', '授权链'],
    keyFeatures: ['加密身份系统', '信任评分模型', '防篡改证据链', '多跳授权', '零信任架构'],
    rating: 4.9,
    duration: '4小时设计'
  },
  {
    id: 'agents-orchestrator',
    title: '智能体编排器',
    description: '自主管道管理器，协调整个开发工作流程。您是此过程的领导者。',
    fullDescription: '智能体编排器是自主管道管理器，从规范到生产就绪实现运行完整的开发工作流。协调多个专业智能体并通过持续的开发-QA循环确保质量。',
    icon: '🎛️',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['工作流编排', '质量控制', '自主操作', '状态管理'],
    keyFeatures: ['完整开发管道', '持续质量循环', '智能决策', '错误处理', '进度跟踪'],
    rating: 4.8,
    duration: '项目全程'
  },
  {
    id: 'automation-governance-architect',
    title: '自动化治理架构师',
    description: '以治理为先的业务自动化架构师（优先使用n8n），在实施前审计价值、风险和可维护性。',
    fullDescription: '自动化治理架构师负责决定什么应该被自动化，如何实现，以及什么必须保持人工控制。默认使用n8n作为主要编排工具，但治理规则与平台无关。',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['治理审计', '价值评估', '风险分析', '标准化'],
    keyFeatures: ['自动化评估框架', '工作流标准化', '可靠性基线', '审计触发', '实施标准'],
    rating: 4.7,
    duration: '3小时评估'
  },
  {
    id: 'blockchain-security-auditor',
    title: '区块链安全审计师',
    description: '专家智能合约安全审计师，专注于漏洞检测、形式化验证、漏洞分析和DeFi协议及区块链应用的综合审计报告编写。',
    fullDescription: '区块链安全审计师是无情的智能合约安全研究员，假设每个合约都可被利用，直到被证明否则。已经剖析了数百个协议，重现了数十个真实世界的漏洞，并编写了防止数百万损失的审计报告。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['智能合约审计', '漏洞检测', '形式化验证', '报告编写'],
    keyFeatures: ['漏洞检测', '形式化验证', '审计报告编写', 'DeFi特定审计', '漏洞利用分析'],
    rating: 4.9,
    duration: '5小时审计'
  },
  {
    id: 'compliance-auditor',
    title: '合规审计师',
    description: '专注于SOC 2、ISO 27001、HIPAA和PCI-DSS审计的专家技术合规审计师 — 从准备评估到证据收集再到认证。',
    fullDescription: '合规审计师是指导组织通过安全和隐私认证流程的专家技术合规审计师。专注于合规的运营和技术方面 — 控制实施、证据收集、审计准备和差距修复 — 而非法律解释。',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['审计准备', '差距评估', '控制实施', '证据收集'],
    keyFeatures: ['审计准备评估', '控制实施', '证据收集', '审计执行支持', '持续合规'],
    rating: 4.8,
    duration: '4小时评估'
  },
  {
    id: 'corporate-training-designer',
    title: '企业培训设计师',
    description: '企业培训系统设计和课程开发专家 — 精通培训需求分析、教学设计方法、混合学习项目设计、内部培训师发展、领导力项目以及培训效果评估和持续优化。',
    fullDescription: '企业培训设计师是中国企业环境中的企业培训和组织学习专家。熟悉主流企业学习平台和中国培训生态系统。设计由业务需求驱动的系统化培训解决方案，真正提高员工能力和组织绩效。',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['培训需求分析', '课程设计', '教学设计', '培训评估'],
    keyFeatures: ['培训需求分析', '课程系统设计', '教学设计方法', '内容开发', '内部培训师发展'],
    rating: 4.7,
    duration: '5小时设计'
  },
  {
    id: 'data-consolidation-agent',
    title: '数据整合智能体',
    description: '将提取的销售数据整合到实时报告仪表板中，包含区域、销售代表和管道摘要。',
    fullDescription: '数据整合智能体是战略数据合成器，将原始销售指标转换为可操作的实时仪表板。能够看到大局并提供驱动决策的见解。',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['数据整合', '实时报告', '销售分析', '仪表板创建'],
    keyFeatures: ['区域性能摘要', '销售代表绩效排名', '管道快照', '趋势分析', '顶级表现者亮点'],
    rating: 4.8,
    duration: '即时处理'
  },
  {
    id: 'government-digital-presales-consultant',
    title: '政府数字化售前顾问',
    description: '中国政府数字化转型市场（ToG）的售前专家，精通政策解读、方案设计、投标文件准备、POC验证、合规要求（等级保护/密码测评/信创国产化）和利益相关者管理 — 帮助技术团队高效赢得政府IT项目。',
    fullDescription: '政府数字化售前顾问是深耕中国政府信息化市场的售前专家。熟悉从中央到地方各级政府的数字化转型需求，精通数字政府、智慧城市、一网通办、城市大脑等主流方向的方案设计和投标策略，帮助团队在从机会发现到签约的全项目生命周期中做出最优决策。',
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['政策解读', '方案设计', '投标管理', '合规要求'],
    keyFeatures: ['政策解读与机会发现', '解决方案设计', '投标文件准备', '合规要求与信创适配', 'POC与技术验证'],
    rating: 4.9,
    duration: '5小时咨询'
  },
  {
    id: 'healthcare-marketing-compliance',
    title: '医疗营销合规专家',
    description: '中国医疗营销合规专家，精通《广告法》、《医疗广告管理办法》、《药品管理法》及相关法规 — 覆盖药品、医疗器械、医疗美容、保健品和互联网医疗的内容审查、风险控制、平台规则解读和患者隐私保护，帮助企业在法律边界内开展有效的健康营销。',
    fullDescription: '医疗营销合规专家是中国医疗营销合规领域的资深专家。深度熟悉从药品、医疗器械到医疗美容和保健品等子行业的广告法规和监管政策。帮助医疗企业在品牌推广、内容营销和学术推广中保持合规边界，同时最大化营销效果。',
    icon: '⚕️',
    gradient: 'linear-gradient(135deg, #2E8B57 0%, #276641 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['医疗广告合规', '药品营销标准', '医疗器械推广', '互联网医疗合规'],
    keyFeatures: ['医疗广告合规', '药品营销标准', '医疗器械推广', '互联网医疗合规', '数据与隐私保护'],
    rating: 4.8,
    duration: '4小时评估'
  },
  {
    id: 'identity-graph-operator',
    title: '身份图操作者',
    description: '操作多个AI智能体可解析的共享身份图。确保多智能体系统中的每个智能体对"这个实体是谁？"得到相同的规范答案 — 即使在并发写入的情况下也是确定性的。',
    fullDescription: '身份图操作者是任何多智能体系统中共享身份层的拥有者。当多个智能体遇到同一个现实世界实体（人、公司、产品或任何记录）时，确保它们都解析到同一个规范身份。不猜测，不硬编码，通过身份引擎解析并让证据决定。',
    icon: '🕸️',
    gradient: 'linear-gradient(135deg, #C5A572 0%, #A68A56 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['身份解析', '多智能体协调', '图完整性', '证据驱动决策'],
    keyFeatures: ['记录解析到规范实体', '多智能体身份决策协调', '图完整性维护', '确定性解析', '租户隔离'],
    rating: 4.9,
    duration: '即时处理'
  },
  {
    id: 'lsp-index-engineer',
    title: 'LSP/索引工程师',
    description: '语言服务器协议专家，通过LSP客户端编排和语义索引构建统一的代码智能系统。',
    fullDescription: 'LSP/索引工程师是专门的系统工程师，负责编排语言服务器协议客户端并构建统一的代码智能系统。将异构语言服务器转换为凝聚的语义图，为沉浸式代码可视化提供动力。',
    icon: '🔎',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['LSP客户端编排', '语义索引', '性能优化', '代码智能'],
    keyFeatures: ['构建graphd LSP聚合器', '创建语义索引基础设施', '规模和性能优化', 'LSP协议合规', '图一致性要求'],
    rating: 4.8,
    duration: '4小时开发'
  },
  {
    id: 'recruitment-specialist',
    title: '招聘专家',
    description: '专业招聘运营和人才获取专家 — 熟练掌握中国主要招聘平台、人才评估框架和劳动法合规。帮助公司高效吸引、筛选和留住顶尖人才，同时建立有竞争力的雇主品牌。',
    fullDescription: '招聘专家是深植于中国人力资源市场的招聘运营和人才获取专家。掌握国内主要招聘平台的运营策略、人才评估方法和劳动法合规要求。帮助公司构建高效的招聘系统，从人才吸引到入职和保留全程把控。',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['招聘渠道运营', '职位描述优化', '简历筛选', '面试流程设计'],
    keyFeatures: ['招聘渠道运营', '职位描述优化', '简历筛选与人才评估', '面试流程设计', '中国劳动法合规'],
    rating: 4.7,
    duration: '5小时咨询'
  },
  {
    id: 'report-distribution-agent',
    title: '报告分发智能体',
    description: '根据区域参数自动将整合的销售报告分发给销售代表的AI智能体。',
    fullDescription: '报告分发智能体是可靠的通信协调员，确保正确的报告在正确的时间到达正确的人。准时、有条理，并且对交付确认一丝不苟。',
    icon: '📤',
    gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['自动分发', '区域路由', '调度管理', '审计跟踪'],
    keyFeatures: ['基于区域的路由', '经理摘要', '完整日志记录', '调度遵守', '优雅失败处理'],
    rating: 4.8,
    duration: '即时处理'
  },
  {
    id: 'sales-data-extraction-agent',
    title: '销售数据提取智能体',
    description: '专门监控Excel文件并提取关键销售指标（MTD、YTD、年终）用于内部实时报告的AI智能体。',
    fullDescription: '销售数据提取智能体是智能数据管道专家，实时监控、解析和从Excel文件中提取销售指标。细致、准确，从不丢失数据点。',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #2b6cb0 0%, #1a4b7a 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['文件监控', '指标提取', '数据持久化', '实时处理'],
    keyFeatures: ['文件监控', '指标提取', '数据持久化', '灵活的模式处理', '完整的审计跟踪'],
    rating: 4.9,
    duration: '即时处理'
  },
  // 专业领域 - 继续
  {
    id: 'civil-engineer',
    title: '土木工程师',
    description: '全球标准的土木工程师，专注于可持续基础设施、风险评估和技术规范。',
    fullDescription: '土木工程师是认证的专业人士，精通国际标准和最佳实践，专注于可持续基础设施、风险评估和技术规范。设计、分析和监督各种土木工程项目，确保安全、可持续和符合规范。',
    icon: '🏗️',
    gradient: 'linear-gradient(135deg, #65A30D 0%, #4D7C0F 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['基础设施设计', '风险评估', '可持续发展', '技术规范'],
    keyFeatures: ['可持续基础设施设计', '风险评估和管理', '国际技术规范', '项目监督', '环境影响评估'],
    rating: 4.8,
    duration: '4小时咨询'
  },
  {
    id: 'cultural-intelligence-strategist',
    title: '文化智能策略师',
    description: '软件设计中的文化智能专家，确保产品在全球范围内具有文化适应性和用户友好性。',
    fullDescription: '文化智能策略师是软件设计中的文化智能专家，确保产品在全球范围内具有文化适应性和用户友好性。分析文化差异，提供文化适应性设计建议，确保产品在不同文化背景下的成功。',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['文化分析', '用户体验', '全球适应', '本地化策略'],
    keyFeatures: ['文化差异分析', '用户体验本地化', '全球适应策略', '跨文化沟通', '文化敏感性培训'],
    rating: 4.7,
    duration: '3小时咨询'
  },
  {
    id: 'developer-advocate',
    title: '开发者倡导者',
    description: '连接开发者社区与产品团队的技术沟通专家，专注于API设计、开发者体验和社区建设。',
    fullDescription: '开发者倡导者是连接开发者社区与产品团队的技术沟通专家，专注于API设计、开发者体验和社区建设。通过技术内容、社区活动和产品反馈，构建强大的开发者生态系统。',
    icon: '👨‍💻',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['API设计', '开发者体验', '社区建设', '技术沟通'],
    keyFeatures: ['API设计和文档', '开发者体验优化', '社区建设和活动', '技术内容创建', '产品反馈收集'],
    rating: 4.8,
    duration: '2小时咨询'
  },
  {
    id: 'document-generator',
    title: '文档生成器',
    description: '专业文档生成专家，创建高质量的技术文档、报告和知识资源。',
    fullDescription: '文档生成器是专业文档生成专家，创建高质量的技术文档、报告和知识资源。确保文档清晰、准确、结构良好，满足专业标准和用户需求。',
    icon: '📄',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['技术文档', '报告生成', '知识管理', '文档标准'],
    keyFeatures: ['技术文档编写', '报告生成', '知识资源创建', '文档结构设计', '文档质量保证'],
    rating: 4.7,
    duration: '3小时文档创建'
  },
  {
    id: 'french-consulting-market-navigator',
    title: '法国咨询市场导航者',
    description: '法国咨询市场专家，精通当地商业文化、市场准入策略和行业动态。',
    fullDescription: '法国咨询市场导航者是法国咨询市场专家，精通当地商业文化、市场准入策略和行业动态。帮助企业理解和进入法国咨询市场，提供文化和商业洞察。',
    icon: '🇫🇷',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['市场分析', '文化洞察', '准入策略', '行业动态'],
    keyFeatures: ['法国市场分析', '商业文化洞察', '市场准入策略', '行业动态监控', '本地化建议'],
    rating: 4.6,
    duration: '4小时咨询'
  },
  {
    id: 'korean-business-navigator',
    title: '韩国商业导航者',
    description: '韩国商业文化和市场专家，帮助企业理解和进入韩国市场。',
    fullDescription: '韩国商业导航者是韩国商业文化和市场专家，帮助企业理解和进入韩国市场。提供文化洞察、市场分析和商业策略，确保在韩国市场的成功。',
    icon: '🇰🇷',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['市场分析', '文化洞察', '商业策略', '本地化建议'],
    keyFeatures: ['韩国市场分析', '商业文化洞察', '市场准入策略', '本地化建议', '商业关系建立'],
    rating: 4.7,
    duration: '4小时咨询'
  },
  {
    id: 'mcp-builder',
    title: 'MCP构建者',
    description: '模型上下文协议（MCP）专家，设计和实现智能体之间的通信和协作框架。',
    fullDescription: 'MCP构建者是模型上下文协议（MCP）专家，设计和实现智能体之间的通信和协作框架。创建标准化的智能体交互协议，确保智能体系统的高效协作。',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['协议设计', '智能体通信', '协作框架', '标准化'],
    keyFeatures: ['MCP协议设计', '智能体通信框架', '协作机制实现', '标准化接口', '性能优化'],
    rating: 4.8,
    duration: '5小时开发'
  },
  {
    id: 'model-qa-specialist',
    title: '模型QA专家',
    description: 'AI模型质量保证和可解释性专家，确保模型性能、可靠性和透明度。',
    fullDescription: '模型QA专家是AI模型质量保证和可解释性专家，确保模型性能、可靠性和透明度。设计和执行模型测试，分析模型行为，提供可解释性解决方案。',
    icon: '🧪',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['模型测试', '性能评估', '可解释性', '质量保证'],
    keyFeatures: ['模型性能测试', '可靠性评估', '可解释性分析', '质量保证流程', '模型监控'],
    rating: 4.9,
    duration: '4小时评估'
  },
  {
    id: 'salesforce-architect',
    title: 'Salesforce架构师',
    description: 'Salesforce平台解决方案架构专家，专注于多云设计、集成模式和企业级组织治理。',
    fullDescription: 'Salesforce架构师是Salesforce平台解决方案架构专家，专注于多云设计、集成模式和企业级组织治理。设计和实现可扩展的Salesforce解决方案，确保性能和可靠性。',
    icon: '☁️',
    gradient: 'linear-gradient(135deg, #00A1E0 0%, #0077B6 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['Salesforce架构', '集成设计', '治理策略', '性能优化'],
    keyFeatures: ['多云架构设计', '集成模式实现', '治理策略制定', '性能优化', '安全最佳实践'],
    rating: 4.8,
    duration: '4小时咨询'
  },
  {
    id: 'study-abroad-advisor',
    title: '留学顾问',
    description: '全面的留学规划专家，涵盖美国、英国、加拿大、澳大利亚、欧洲、香港和新加坡的申请策略。',
    fullDescription: '留学顾问是全面的留学规划专家，涵盖美国、英国、加拿大、澳大利亚、欧洲、香港和新加坡的申请策略。帮助中国学生制定个性化的留学计划，从选校到签证准备全程指导。',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #1B4D3E 0%, #0F3426 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['留学规划', '申请策略', '学校选择', '签证准备'],
    keyFeatures: ['留学方向规划', '申请策略制定', '学校选择指导', '文书辅导', '签证准备'],
    rating: 4.7,
    duration: '5小时咨询'
  },
  {
    id: 'supply-chain-strategist',
    title: '供应链策略师',
    description: '供应链管理和采购策略专家，专注于供应商开发、战略采购和供应链数字化。',
    fullDescription: '供应链策略师是供应链管理和采购策略专家，专注于供应商开发、战略采购和供应链数字化。基于中国制造业生态系统，帮助企业构建高效、弹性和可持续的供应链。',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['供应链管理', '战略采购', '供应商开发', '数字化转型'],
    keyFeatures: ['供应商管理系统', '战略采购策略', '成本优化', '风险管理', '数字化转型'],
    rating: 4.8,
    duration: '4小时咨询'
  },
  {
    id: 'zk-steward',
    title: 'ZK管家',
    description: '基于Niklas Luhmann的Zettelkasten精神的知识库管家，专注于原子笔记、连接性和验证循环。',
    fullDescription: 'ZK管家是基于Niklas Luhmann的Zettelkasten精神的知识库管家，专注于原子笔记、连接性和验证循环。用于知识库构建、笔记链接、复杂任务分解和跨领域决策支持。',
    icon: '🗃️',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    category: 'specialized',
    categoryName: '专业领域',
    featured: false,
    features: ['知识库管理', '笔记链接', '任务分解', '决策支持'],
    keyFeatures: ['原子笔记管理', '知识网络构建', '领域专家切换', '验证循环', '连接性优化'],
    rating: 4.7,
    duration: '3小时咨询'
  },
  
  // 支持服务
  {
    id: 'analytics-reporter',
    title: '分析报告生成器',
    description: '专业数据分析师，将原始数据转化为可操作的业务洞察，创建仪表板和报告。',
    fullDescription: '分析报告生成器是专业数据分析师，将原始数据转化为可操作的业务洞察。创建仪表板、执行统计分析、跟踪KPI，并通过数据可视化和报告提供战略决策支持。',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['数据分析', '仪表板创建', 'KPI跟踪', '业务洞察'],
    keyFeatures: ['数据可视化', '统计分析', 'KPI跟踪', '预测建模', '决策支持'],
    rating: 4.8,
    duration: '3小时分析'
  },
  {
    id: 'executive-summary-generator',
    title: '执行摘要生成器',
    description: '顾问级AI专家，像高级战略顾问一样思考和沟通，将复杂的业务输入转化为简洁、可操作的执行摘要。',
    fullDescription: '执行摘要生成器是顾问级AI专家，像高级战略顾问一样思考和沟通，将复杂的业务输入转化为简洁、可操作的执行摘要。使用麦肯锡SCQA、BCG金字塔原则和贝恩框架为C级决策者提供洞察。',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['执行摘要', '战略分析', '决策支持', '沟通优化'],
    keyFeatures: ['SCQA框架应用', '金字塔原则', '行动导向建议', '量化分析', '执行沟通'],
    rating: 4.9,
    duration: '2小时生成'
  },
  {
    id: 'finance-tracker',
    title: '财务跟踪器',
    description: '专业财务分析师和控制器，专注于财务规划、预算管理和业务绩效分析。',
    fullDescription: '财务跟踪器是专业财务分析师和控制器，专注于财务规划、预算管理和业务绩效分析。维护财务健康、优化现金流，并为业务增长提供战略财务洞察。',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['财务规划', '预算管理', '绩效分析', '现金流优化'],
    keyFeatures: ['预算制定', '现金流管理', '财务报告', '投资分析', '风险管理'],
    rating: 4.8,
    duration: '3小时分析'
  },
  {
    id: 'infrastructure-maintainer',
    title: '基础设施维护者',
    description: '专注于系统可靠性、性能优化和技术运营管理的基础设施专家。',
    fullDescription: '基础设施维护者是专注于系统可靠性、性能优化和技术运营管理的基础设施专家。维护支持业务运营的强大、可扩展的基础设施，确保安全性、性能和成本效益。',
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['系统可靠性', '性能优化', '安全管理', '成本控制'],
    keyFeatures: ['监控系统', '自动化部署', '灾难恢复', '安全强化', '成本优化'],
    rating: 4.7,
    duration: '4小时维护'
  },
  {
    id: 'legal-compliance-checker',
    title: '法律合规检查器',
    description: '专业法律和合规专家，确保业务运营、数据处理和内容创建符合相关法律、法规和行业标准。',
    fullDescription: '法律合规检查器是专业法律和合规专家，确保业务运营、数据处理和内容创建符合相关法律、法规和行业标准。进行风险评估、政策制定和合规监控，确保多司法管辖区的合规性。',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['合规评估', '风险管理', '政策制定', '法规监控'],
    keyFeatures: ['GDPR合规', '数据保护', '合同审查', '风险评估', '合规培训'],
    rating: 4.9,
    duration: '4小时评估'
  },
  {
    id: 'support-responder',
    title: '支持响应者',
    description: '专业客户支持专家，提供卓越的客户服务、问题解决和用户体验优化。',
    fullDescription: '支持响应者是专业客户支持专家，提供卓越的客户服务、问题解决和用户体验优化。专注于多渠道支持、主动客户关怀，将支持互动转化为积极的品牌体验。',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'support',
    categoryName: '支持服务',
    featured: false,
    features: ['客户服务', '问题解决', '多渠道支持', '用户体验'],
    keyFeatures: ['多渠道支持', '问题解决', '知识库管理', '客户反馈', '满意度优化'],
    rating: 4.7,
    duration: '即时响应'
  },
  
  // 测试验证
  {
    id: 'accessibility-auditor',
    title: '无障碍审计师',
    description: '无障碍专家，根据WCAG标准审计界面，使用辅助技术测试，确保包容性设计。',
    fullDescription: '无障碍审计师是无障碍专家，根据WCAG标准审计界面，使用辅助技术测试，确保包容性设计。默认发现障碍 — 如果没有用屏幕阅读器测试，就不是无障碍的。',
    icon: '♿',
    gradient: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['WCAG标准', '辅助技术', '包容性设计', '无障碍测试'],
    keyFeatures: ['WCAG合规审计', '屏幕阅读器测试', '键盘导航测试', '无障碍修复', '包容性设计建议'],
    rating: 4.8,
    duration: '4小时审计'
  },
  {
    id: 'api-tester',
    title: 'API测试器',
    description: 'API测试专家，专注于全面的API验证、性能测试和所有系统和第三方集成的质量保证。',
    fullDescription: 'API测试器是API测试专家，专注于全面的API验证、性能测试和所有系统和第三方集成的质量保证。确保可靠、高性能和安全的API集成。',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['API验证', '性能测试', '安全测试', '集成测试'],
    keyFeatures: ['功能测试', '性能测试', '安全测试', '合同测试', '集成验证'],
    rating: 4.9,
    duration: '3小时测试'
  },
  {
    id: 'evidence-collector',
    title: '证据收集器',
    description: '痴迷于截图的QA专家，默认发现3-5个问题，对所有内容都需要视觉证据。',
    fullDescription: '证据收集器是痴迷于截图的QA专家，默认发现3-5个问题，对所有内容都需要视觉证据。通过视觉证明确保质量，避免幻想报告。',
    icon: '📸',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['视觉测试', '证据收集', '质量保证', '问题发现'],
    keyFeatures: ['截图证据', '视觉验证', '问题发现', '质量评估', '测试报告'],
    rating: 4.7,
    duration: '3小时测试'
  },
  {
    id: 'performance-benchmarker',
    title: '性能基准测试器',
    description: '性能测试和优化专家，专注于测量、分析和改进所有应用程序和基础设施的性能。',
    fullDescription: '性能基准测试器是性能测试和优化专家，专注于测量、分析和改进所有应用程序和基础设施的性能。确保系统满足性能要求并提供卓越的用户体验。',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['性能测试', '负载测试', '基准测试', '优化建议'],
    keyFeatures: ['负载测试', '压力测试', '性能分析', '优化建议', '基准比较'],
    rating: 4.8,
    duration: '4小时测试'
  },
  {
    id: 'reality-checker',
    title: '现实检查器',
    description: '停止幻想批准，基于证据的认证 — 默认状态为"需要工作"，需要压倒性的证据证明生产就绪性。',
    fullDescription: '现实检查器是停止幻想批准的专家，基于证据的认证 — 默认状态为"需要工作"，需要压倒性的证据证明生产就绪性。确保只有真正就绪的系统获得生产批准。',
    icon: '🧐',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['现实检查', '证据验证', '生产就绪评估', '质量认证'],
    keyFeatures: ['证据验证', '生产就绪评估', '质量认证', '问题发现', '改进建议'],
    rating: 4.9,
    duration: '3小时评估'
  },
  {
    id: 'test-results-analyzer',
    title: '测试结果分析器',
    description: '测试结果分析专家，专注于分析测试数据、识别模式和提供改进建议。',
    fullDescription: '测试结果分析器是测试结果分析专家，专注于分析测试数据、识别模式和提供改进建议。通过深入分析测试结果，帮助团队提高软件质量和测试效率。',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['结果分析', '模式识别', '改进建议', '质量评估'],
    keyFeatures: ['测试数据分析', '趋势识别', '改进建议', '质量评估', '测试策略优化'],
    rating: 4.7,
    duration: '3小时分析'
  },
  {
    id: 'tool-evaluator',
    title: '工具评估器',
    description: '测试工具评估专家，评估和推荐适合特定测试需求的工具和框架。',
    fullDescription: '工具评估器是测试工具评估专家，评估和推荐适合特定测试需求的工具和框架。帮助团队选择最适合其需求的测试工具，提高测试效率和质量。',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['工具评估', '框架分析', '需求匹配', '效率优化'],
    keyFeatures: ['工具评估', '框架分析', '需求匹配', '效率优化', '集成建议'],
    rating: 4.6,
    duration: '3小时评估'
  },
  {
    id: 'workflow-optimizer',
    title: '工作流优化器',
    description: '测试工作流优化专家，设计和优化测试流程、自动化策略和质量保证框架。',
    fullDescription: '工作流优化器是测试工作流优化专家，设计和优化测试流程、自动化策略和质量保证框架。通过优化测试工作流程，提高测试效率和软件质量。',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'testing',
    categoryName: '测试验证',
    featured: false,
    features: ['工作流设计', '自动化策略', '质量保证', '效率优化'],
    keyFeatures: ['测试流程设计', '自动化策略', '质量保证框架', '效率优化', '持续改进'],
    rating: 4.7,
    duration: '4小时优化'
  }
]

// 计算属性
const filteredScenarios = computed(() => {
  let filtered
  if (activeCategory.value === 'all') {
    filtered = scenarios
  } else {
    filtered = scenarios.filter(s => s.category === activeCategory.value)
  }
  
  // 搜索过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(s => {
      return s.title.toLowerCase().includes(keyword) || 
             s.description.toLowerCase().includes(keyword) ||
             s.features.some(feature => feature.toLowerCase().includes(keyword))
    })
  }
  
  // 展开/收起逻辑（仅在全部场景且无搜索时应用）
  if (activeCategory.value === 'all' && !searchKeyword.value && !showAllScenarios.value && filtered.length > defaultVisibleCount) {
    return filtered.slice(0, defaultVisibleCount)
  }
  
  return filtered
})

const featuredScenarios = computed(() => {
  return scenarios.filter(s => s.featured)
})

// 方法
const goHome = () => {
  router.push('/')
}

const exploreScenario = (scenario: any) => {
  // 跳转到智能体详情页面
  router.push(`/agent/${scenario.id}`)
}

const showDetails = (scenario: any) => {
  // 跳转到智能体详情页面
  router.push(`/agent/${scenario.id}`)
}

const filterByCategory = (category: string) => {
  activeCategory.value = category
  // 滚动到场景展示区域
  const showcaseSection = document.querySelector('.scenarios-showcase')
  if (showcaseSection) {
    showcaseSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const contactUs = () => {
  message.info('请联系我们的销售团队：sales@kedo.ai')
}

const viewDemo = () => {
  message.info('演示视频即将播放...')
}
</script>

<style scoped lang="scss">
.scenarios-page {
  min-height: 100vh;
  background: #1a1a2e;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

// 顶部导航
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  .logo {
    height: 32px;
  }

  .logo-text {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(90deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
}

.header-nav {
  display: flex;
  gap: 32px;

  .nav-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #1E9CFF;
    }
  }
}

// 英雄区域
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 40px 80px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 50%, rgba(30, 156, 255, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(13, 168, 239, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, rgba(30, 156, 255, 0.1) 0%, transparent 50%);
  }

  .animated-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: float 20s infinite ease-in-out;

      &.shape-1 {
        width: 600px;
        height: 600px;
        background: rgba(30, 156, 255, 0.3);
        top: -200px;
        left: -200px;
        animation-delay: 0s;
      }

      &.shape-2 {
        width: 500px;
        height: 500px;
        background: rgba(13, 168, 239, 0.2);
        top: 50%;
        right: -150px;
        animation-delay: -5s;
      }

      &.shape-3 {
        width: 400px;
        height: 400px;
        background: rgba(118, 75, 162, 0.2);
        bottom: -100px;
        left: 30%;
        animation-delay: -10s;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(30, 156, 255, 0.1);
  border: 1px solid rgba(30, 156, 255, 0.3);
  border-radius: 50px;
  margin-bottom: 32px;

  .badge-icon {
    font-size: 18px;
  }

  .badge-text {
    font-size: 14px;
    font-weight: 600;
    color: #1E9CFF;
  }
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;

  .gradient-text {
      background: linear-gradient(90deg, #1E9CFF, #0DA8EF, #667eea);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
}

.hero-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 64px;

  .stat-item {
    text-align: center;

    .stat-number {
      font-size: 48px;
      font-weight: 800;
      background: linear-gradient(90deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;

  .mouse {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    position: relative;

    .wheel {
      width: 4px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      animation: scroll 2s infinite;
    }
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
}

// 筛选区域
.filter-section {
  padding: 40px;
  background: rgba(26, 26, 46, 1);
  position: sticky;
  top: 64px;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-container {
  max-width: 1400px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  
  svg:first-child {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.5);
  }
  
  .search-input {
    width: 100%;
    padding: 12px 16px 12px 48px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    color: white;
    font-size: 15px;
    outline: none;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: rgba(30, 156, 255, 0.5);
      box-shadow: 0 0 0 2px rgba(30, 156, 255, 0.2);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  
  .clear-btn {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}



.filter-tabs {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(30, 156, 255, 0.5);
  }

  &.active {
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    border-color: transparent;
    color: white;
  }

  .tab-icon {
    font-size: 18px;
  }
}

// 场景展示区域
.scenarios-showcase {
  padding: 60px 40px;
}

.showcase-container {
  max-width: 1400px;
  margin: 0 auto;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}

.show-all-container {
  .show-all-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(30, 156, 255, 0.3);
    }
    
    svg {
      transition: transform 0.3s ease;
      
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
}

.scenario-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(30, 156, 255, 0.3);
  }

  &.featured {
    border-color: rgba(30, 156, 255, 0.3);
  }

  .card-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    overflow: hidden;

    .gradient-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.3;
    }
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 32px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    .card-icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      font-size: 32px;
      backdrop-filter: blur(10px);
    }

    .featured-badge {
      padding: 6px 12px;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .card-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .card-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;

    .feature-tag {
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .card-stats {
      display: flex;
      gap: 16px;

      .stat {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);

        svg {
          color: #1E9CFF;
        }
      }
    }

    .explore-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: transparent;
      border: 1px solid rgba(30, 156, 255, 0.5);
      border-radius: 8px;
      color: #1E9CFF;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #1E9CFF;
        color: white;
      }
    }
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(30, 156, 255, 0.2), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;

    &.active {
      opacity: 1;
    }
  }
}

// 特色场景展示
.featured-section {
  padding: 100px 40px;
  background: linear-gradient(180deg, rgba(26, 26, 46, 1) 0%, rgba(30, 30, 50, 1) 50%, rgba(26, 26, 46, 1) 100%);
}

.featured-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;

  .section-label {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(30, 156, 255, 0.1);
    border: 1px solid rgba(30, 156, 255, 0.3);
    border-radius: 20px;
    font-size: 14px;
    color: #1E9CFF;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 16px;
  }

  .section-desc {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.6);
  }
}

.featured-showcase {
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.featured-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  &.reverse {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }
}

.featured-visual {
  .visual-container {
    position: relative;
    aspect-ratio: 4/3;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .visual-icon {
      font-size: 120px;
      z-index: 1;
    }

    .visual-effects {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .effect-circle {
        position: absolute;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.1);
        animation: ripple 4s infinite ease-out;

        &:nth-child(1) {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &:nth-child(2) {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 1s;
        }

        &:nth-child(3) {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 2s;
        }
      }
    }
  }
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.featured-content {
  .content-badge {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(30, 156, 255, 0.1);
    border-radius: 20px;
    font-size: 14px;
    color: #1E9CFF;
    margin-bottom: 20px;
  }

  .content-title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .content-description {
    font-size: 17px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .content-features {
    list-style: none;
    padding: 0;
    margin-bottom: 40px;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 16px;

      .feature-check {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
        border-radius: 50%;
        font-size: 14px;
      }
    }
  }

  .content-actions {
    display: flex;
    gap: 16px;

    .primary-btn {
      padding: 14px 32px;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(30, 156, 255, 0.4);
      }
    }

    .secondary-btn {
      padding: 14px 32px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

// CTA区域
.cta-section {
  position: relative;
  padding: 120px 40px;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .cta-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 30% 50%, rgba(30, 156, 255, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 50%, rgba(118, 75, 162, 0.15) 0%, transparent 50%);
  }
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  .cta-title {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .cta-description {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 40px;
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 20px;

    .cta-primary-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 40px;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(30, 156, 255, 0.4);
      }
    }

    .cta-secondary-btn {
      padding: 16px 40px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      color: white;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

// 页脚
.page-footer {
  padding: 80px 40px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 80px;
  margin-bottom: 60px;
}

.footer-brand {
  .footer-logo {
    height: 40px;
    margin-bottom: 20px;
  }

  .footer-desc {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  .link-group {
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    a {
      display: block;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 12px;
      transition: color 0.3s ease;

      &:hover {
        color: #1E9CFF;
      }
    }
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

// 响应式设计
@media (max-width: 1024px) {
  .hero-title {
    font-size: 56px;
  }

  .featured-item {
    grid-template-columns: 1fr;
    gap: 40px;

    &.reverse {
      direction: ltr;
    }
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 16px 20px;
  }

  .header-nav {
    display: none;
  }

  .hero-section {
    padding: 100px 20px 60px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 24px;

    .stat-item .stat-number {
      font-size: 36px;
    }
  }

  .filter-section {
    padding: 20px;
    top: 56px;
  }

  .filter-tabs {
    gap: 8px;
  }

  .filter-tab {
    padding: 10px 16px;
    font-size: 14px;
  }

  .scenarios-showcase {
    padding: 40px 20px;
  }

  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .featured-section {
    padding: 60px 20px;
  }

  .section-header {
    .section-title {
      font-size: 32px;
    }
  }

  .featured-content {
    .content-title {
      font-size: 28px;
    }

    .content-actions {
      flex-direction: column;
    }
  }

  .cta-section {
    padding: 80px 20px;
  }

  .cta-content {
    .cta-title {
      font-size: 32px;
    }

    .cta-actions {
      flex-direction: column;
    }
  }

  .footer-content {
    padding: 60px 20px 40px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>