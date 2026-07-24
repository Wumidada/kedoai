<template>
  <section class="ai-marketing-section" id="ai-marketing">
    <div class="section-container">
      <!-- 模块头部 -->
      <div class="section-header">
        <div class="header-badge">
          <span class="badge-icon">🤖</span>
          <span class="badge-text">AI 智能驱动</span>
        </div>
        <h2 class="section-title">AI营销智能体</h2>
        <p class="section-subtitle">基于大数据与AI算法，为您提供个性化营销策略与智能产品推荐</p>
      </div>

      <!-- 功能卡片区域 -->
      <div class="feature-cards">
        <!-- 个性化营销建议 -->
        <div class="feature-card" :class="{ 'active': activeTab === 'advice' }" @click="switchTab('advice')">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="card-title">个性化营销建议</h3>
          <p class="card-desc">基于用户行为数据，智能分析并提供定制化营销策略</p>
        </div>

        <!-- 智能产品推荐 -->
        <div class="feature-card" :class="{ 'active': activeTab === 'recommend' }" @click="switchTab('recommend')">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 11H7.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 11H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="card-title">智能产品推荐</h3>
          <p class="card-desc">根据您的业务需求，精准匹配最适合的产品方案</p>
        </div>

        <!-- 营销方案咨询 -->
        <div class="feature-card" :class="{ 'active': activeTab === 'consult' }" @click="switchTab('consult')">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5A8.38 8.38 0 0 1 12.5 20A8.38 8.38 0 0 1 4 11.5A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 11.5V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 7.5H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="card-title">营销方案咨询</h3>
          <p class="card-desc">一键生成专业营销方案框架，助力业务快速增长</p>
        </div>
      </div>

      <!-- 交互区域 -->
      <div class="interaction-area">
        <!-- 个性化营销建议面板 -->
        <div v-if="activeTab === 'advice'" class="panel advice-panel">
          <div class="panel-header">
            <h4>获取个性化营销建议</h4>
            <p>告诉我们您的业务类型和目标，AI将为您定制营销策略</p>
          </div>
          <div class="input-group">
            <div class="form-field">
              <label>您的业务类型</label>
              <select v-model="adviceForm.businessType" class="form-select">
                <option value="">请选择业务类型</option>
                <option value="ecommerce">电子商务</option>
                <option value="saas">SaaS服务</option>
                <option value="education">教育培训</option>
                <option value="healthcare">医疗健康</option>
                <option value="finance">金融服务</option>
                <option value="manufacturing">制造业</option>
              </select>
            </div>
            <div class="form-field">
              <label>营销目标</label>
              <select v-model="adviceForm.marketingGoal" class="form-select">
                <option value="">请选择营销目标</option>
                <option value="brand">品牌推广</option>
                <option value="conversion">转化提升</option>
                <option value="retention">客户留存</option>
                <option value="acquisition">新客获取</option>
              </select>
            </div>
            <button class="action-btn" @click="generateAdvice" :disabled="isLoading">
              <span v-if="isLoading" class="loading-spinner"></span>
              <span v-else>获取建议</span>
            </button>
          </div>
          <div v-if="adviceResult" class="result-area">
            <div class="result-card">
              <h5>🎯 营销策略建议</h5>
              <div class="result-content" v-html="adviceResult"></div>
            </div>
          </div>
        </div>

        <!-- 智能产品推荐面板 -->
        <div v-if="activeTab === 'recommend'" class="panel recommend-panel">
          <div class="panel-header">
            <h4>智能产品推荐</h4>
            <p>根据您的需求，为您推荐最适合的解决方案</p>
          </div>
          <div class="input-group">
            <div class="form-field">
              <label>您需要的功能</label>
              <div class="checkbox-group">
                <label v-for="feature in featureOptions" :key="feature.value" class="checkbox-item">
                  <input type="checkbox" v-model="recommendForm.features" :value="feature.value">
                  <span class="checkbox-label">{{ feature.label }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label>预算范围</label>
              <select v-model="recommendForm.budget" class="form-select">
                <option value="">请选择预算范围</option>
                <option value="low">5万以下</option>
                <option value="medium">5-20万</option>
                <option value="high">20万以上</option>
              </select>
            </div>
            <button class="action-btn" @click="generateRecommendations" :disabled="isLoading">
              <span v-if="isLoading" class="loading-spinner"></span>
              <span v-else>获取推荐</span>
            </button>
          </div>
          <div v-if="recommendations.length > 0" class="result-area">
            <div class="recommendation-list">
              <div v-for="(item, index) in recommendations" :key="index" class="recommendation-card">
                <div class="rec-icon">{{ item.icon }}</div>
                <div class="rec-content">
                  <h5>{{ item.name }}</h5>
                  <p>{{ item.description }}</p>
                  <div class="rec-tags">
                    <span v-for="tag in item.tags" :key="tag" class="rec-tag">{{ tag }}</span>
                  </div>
                </div>
                <button class="rec-btn" @click="viewProduct(item)">了解详情</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 营销方案咨询面板 -->
        <div v-if="activeTab === 'consult'" class="panel consult-panel">
          <div class="panel-header">
            <h4>营销方案咨询</h4>
            <p>描述您的业务场景，AI将为您生成初步方案框架</p>
          </div>
          <div class="input-group">
            <div class="form-field">
              <label>业务场景描述</label>
              <textarea 
                v-model="consultForm.description" 
                class="form-textarea" 
                placeholder="请描述您的业务场景、目标受众、预期效果等..."
                rows="4"
              ></textarea>
            </div>
            <div class="form-field">
              <label>方案类型</label>
              <select v-model="consultForm.planType" class="form-select">
                <option value="">请选择方案类型</option>
                <option value="digital">数字营销方案</option>
                <option value="content">内容营销方案</option>
                <option value="social">社交媒体方案</option>
                <option value="email">邮件营销方案</option>
              </select>
            </div>
            <button class="action-btn" @click="generatePlan" :disabled="isLoading">
              <span v-if="isLoading" class="loading-spinner"></span>
              <span v-else>生成方案</span>
            </button>
          </div>
          <div v-if="planResult" class="result-area">
            <div class="plan-card">
              <h5>📋 营销方案框架</h5>
              <div class="plan-content" v-html="planResult"></div>
              <button class="download-btn" @click="downloadPlan">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                下载方案
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 营销场景详情弹窗 -->
    <div v-if="showScenarios" class="scenarios-modal" @click.self="showScenarios = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>典型营销场景</h3>
          <button class="close-btn" @click="showScenarios = false">×</button>
        </div>
        <div class="scenarios-grid">
          <div v-for="scenario in marketingScenarios" :key="scenario.id" class="scenario-detail-card">
            <div class="scenario-icon">{{ scenario.icon }}</div>
            <h4>{{ scenario.title }}</h4>
            <p>{{ scenario.description }}</p>
            <div class="scenario-case">
              <strong>应用案例：</strong>{{ scenario.case }}
            </div>
            <div class="scenario-guide">
              <strong>操作指南：</strong>{{ scenario.guide }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 首次使用引导 -->
    <div v-if="showTutorial" class="tutorial-overlay">
      <div class="tutorial-content">
        <h3>欢迎使用AI营销智能体 👋</h3>
        <p>三步快速上手：</p>
        <ol>
          <li>选择上方功能卡片（营销建议/产品推荐/方案咨询）</li>
          <li>填写您的业务信息和需求</li>
          <li>点击按钮获取AI智能分析结果</li>
        </ol>
        <button class="tutorial-btn" @click="showTutorial = false">开始体验</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

// 当前激活的标签页
const activeTab = ref('advice')

// 加载状态
const isLoading = ref(false)

// 显示教程
const showTutorial = ref(false)

// 显示场景详情
const showScenarios = ref(false)

// 营销建议表单
const adviceForm = ref({
  businessType: '',
  marketingGoal: ''
})

// 营销建议结果
const adviceResult = ref('')

// 产品推荐表单
const recommendForm = ref({
  features: [] as string[],
  budget: ''
})

// 功能选项
const featureOptions = [
  { value: 'data', label: '数据分析' },
  { value: 'automation', label: '营销自动化' },
  { value: 'content', label: '内容管理' },
  { value: 'social', label: '社交媒体' },
  { value: 'email', label: '邮件营销' },
  { value: 'crm', label: '客户管理' }
]

// 推荐结果
const recommendations = ref<any[]>([])

// 方案咨询表单
const consultForm = ref({
  description: '',
  planType: ''
})

// 方案结果
const planResult = ref('')

// 营销场景数据
const marketingScenarios = [
  {
    id: 1,
    icon: '🛒',
    title: '电商促销场景',
    description: '针对电商平台的促销活动，提供全链路的营销自动化解决方案',
    case: '某服装品牌通过AI营销智能体，在双11期间实现转化率提升45%',
    guide: '设置促销规则 → 配置自动化流程 → 启动智能推荐 → 实时监控优化'
  },
  {
    id: 2,
    icon: '📱',
    title: '社交媒体运营',
    description: '智能化社交媒体内容创作与发布，提升品牌曝光和用户互动',
    case: '某科技公司通过AI内容生成，社交媒体粉丝增长300%',
    guide: '连接社交账号 → 设置内容偏好 → AI生成内容 → 定时发布分析'
  },
  {
    id: 3,
    icon: '📧',
    title: '邮件营销场景',
    description: '个性化邮件营销自动化，提高邮件打开率和点击率',
    case: '某SaaS企业通过智能邮件营销，客户留存率提升60%',
    guide: '导入用户列表 → 设计邮件模板 → 设置触发条件 → 分析邮件效果'
  },
  {
    id: 4,
    icon: '🎯',
    title: '精准广告投放',
    description: '基于用户画像的智能广告投放，优化广告ROI',
    case: '某教育机构通过精准投放，获客成本降低50%',
    guide: '定义目标受众 → 选择投放渠道 → 设置预算出价 → 实时优化调整'
  },
  {
    id: 5,
    icon: '🔄',
    title: '客户生命周期管理',
    description: '全生命周期客户价值管理，提升客户LTV',
    case: '某金融平台通过生命周期管理，客户价值提升80%',
    guide: '划分客户阶段 → 设计触达策略 → 自动化执行 → 效果追踪分析'
  }
]

// 切换标签页
const switchTab = (tab: string) => {
  activeTab.value = tab
  // 清除之前的结果
  adviceResult.value = ''
  recommendations.value = []
  planResult.value = ''
}

// 生成营销建议
const generateAdvice = async () => {
  if (!adviceForm.value.businessType || !adviceForm.value.marketingGoal) {
    message.warning('请填写完整信息')
    return
  }
  
  isLoading.value = true
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // 模拟生成建议
  const adviceMap: Record<string, Record<string, string>> = {
    ecommerce: {
      brand: `
        <div class="advice-item">
          <h6>🎯 品牌定位策略</h6>
          <p>建议通过KOL合作和内容营销提升品牌认知度，重点打造品牌故事和差异化价值主张。</p>
        </div>
        <div class="advice-item">
          <h6>📱 社交媒体矩阵</h6>
          <p>建立多平台社交媒体矩阵，包括小红书、抖音、微博等，实现全渠道品牌曝光。</p>
        </div>
        <div class="advice-item">
          <h6>💡 内容营销计划</h6>
          <p>制定每周3-5篇高质量内容计划，结合热点话题和产品特点，提升用户参与度。</p>
        </div>
      `,
      conversion: `
        <div class="advice-item">
          <h6>🛒 转化漏斗优化</h6>
          <p>优化从浏览到购买的每个环节，重点改善商品详情页和结算流程，减少流失率。</p>
        </div>
        <div class="advice-item">
          <h6>🎁 促销策略设计</h6>
          <p>设计阶梯式促销活动，包括满减、限时折扣、赠品等，刺激用户下单决策。</p>
        </div>
        <div class="advice-item">
          <h6>📧  abandoned cart挽回</h6>
          <p>设置购物车放弃自动提醒，通过邮件和短信多渠道触达，挽回潜在客户。</p>
        </div>
      `,
      retention: `
        <div class="advice-item">
          <h6>💎 会员体系搭建</h6>
          <p>建立积分和等级会员体系，通过专属权益和个性化服务提升客户忠诚度。</p>
        </div>
        <div class="advice-item">
          <h6>📊 客户分层运营</h6>
          <p>基于RFM模型对客户进行分层，针对不同价值客户制定差异化运营策略。</p>
        </div>
        <div class="advice-item">
          <h6>🔄 复购激励计划</h6>
          <p>设计复购优惠券和积分奖励机制，鼓励老客户持续购买。</p>
        </div>
      `,
      acquisition: `
        <div class="advice-item">
          <h6>🔍 SEO优化策略</h6>
          <p>优化网站关键词布局和内容结构，提升搜索引擎排名，获取自然流量。</p>
        </div>
        <div class="advice-item">
          <h6>📢 付费广告投放</h6>
          <p>在搜索引擎和社交媒体进行精准广告投放，快速获取目标用户。</p>
        </div>
        <div class="advice-item">
          <h6>🤝 联盟营销合作</h6>
          <p>建立联盟营销体系，通过分销和推荐奖励扩大获客渠道。</p>
        </div>
      `
    }
  }
  
  const defaultAdvice = `
    <div class="advice-item">
      <h6>📊 数据驱动决策</h6>
      <p>建议建立数据分析体系，通过用户行为数据指导营销决策。</p>
    </div>
    <div class="advice-item">
      <h6>🎯 精准用户画像</h6>
      <p>完善用户标签体系，实现精准营销和个性化推荐。</p>
    </div>
    <div class="advice-item">
      <h6>🚀 营销自动化</h6>
      <p>引入营销自动化工具，提升营销效率和客户体验。</p>
    </div>
  `
  
  adviceResult.value = adviceMap[adviceForm.value.businessType]?.[adviceForm.value.marketingGoal] || defaultAdvice
  
  isLoading.value = false
  message.success('营销建议已生成')
}

// 生成产品推荐
const generateRecommendations = async () => {
  if (recommendForm.value.features.length === 0 || !recommendForm.value.budget) {
    message.warning('请填写完整信息')
    return
  }
  
  isLoading.value = true
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 模拟推荐结果
  recommendations.value = [
    {
      icon: '🤖',
      name: 'KedoMind 智能营销套件',
      description: '一站式AI营销解决方案，包含数据分析、自动化营销、客户管理等功能',
      tags: ['AI驱动', '全渠道', '自动化']
    },
    {
      icon: '📊',
      name: 'KedoAnalytics 数据分析平台',
      description: '深度用户行为分析和营销效果追踪，助力数据驱动决策',
      tags: ['实时分析', '可视化', '预测模型']
    },
    {
      icon: '💬',
      name: 'KedoChat 智能客服系统',
      description: '7×24小时AI客服，提升客户满意度和服务效率',
      tags: ['自然语言', '多轮对话', '智能分配']
    }
  ]
  
  isLoading.value = false
  message.success('产品推荐已生成')
}

// 查看产品详情
const viewProduct = (product: any) => {
  message.info(`正在跳转到${product.name}详情页...`)
  // 实际项目中这里应该跳转到产品详情页
}

// 生成营销方案
const generatePlan = async () => {
  if (!consultForm.value.description || !consultForm.value.planType) {
    message.warning('请填写完整信息')
    return
  }
  
  isLoading.value = true
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // 模拟生成方案
  planResult.value = `
    <div class="plan-section">
      <h6>一、方案概述</h6>
      <p>基于您的业务场景，我们为您制定了完整的数字营销方案，预计可提升营销效果30-50%。</p>
    </div>
    <div class="plan-section">
      <h6>二、目标设定</h6>
      <ul>
        <li>短期目标（1-3个月）：建立营销基础体系，获取首批精准用户</li>
        <li>中期目标（3-6个月）：优化转化漏斗，提升ROI至1:3以上</li>
        <li>长期目标（6-12个月）：建立品牌认知，实现规模化增长</li>
      </ul>
    </div>
    <div class="plan-section">
      <h6>三、执行策略</h6>
      <ul>
        <li><strong>内容策略：</strong>制定内容日历，每周发布3-5篇高质量内容</li>
        <li><strong>渠道策略：</strong>重点布局社交媒体和搜索引擎，辅以邮件营销</li>
        <li><strong>转化策略：</strong>优化落地页，设置A/B测试，持续迭代优化</li>
        <li><strong>留存策略：</strong>建立会员体系，设计复购激励机制</li>
      </ul>
    </div>
    <div class="plan-section">
      <h6>四、预算规划</h6>
      <p>建议预算分配：内容创作30%、广告投放40%、工具平台20%、数据分析10%</p>
    </div>
    <div class="plan-section">
      <h6>五、关键指标</h6>
      <ul>
        <li>流量指标：UV、PV、跳出率</li>
        <li>转化指标：转化率、客单价、ROI</li>
        <li>留存指标：复购率、客户生命周期价值</li>
      </ul>
    </div>
  `
  
  isLoading.value = false
  message.success('营销方案已生成')
}

// 下载方案
const downloadPlan = () => {
  const element = document.createElement('a')
  const file = new Blob([planResult.value.replace(/<[^>]*>/g, '')], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = '营销方案.txt'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  message.success('方案已下载')
}

// 组件挂载时检查是否首次访问
onMounted(() => {
  const hasVisited = localStorage.getItem('aiMarketingVisited')
  if (!hasVisited) {
    showTutorial.value = true
    localStorage.setItem('aiMarketingVisited', 'true')
  }
})
</script>

<style scoped lang="scss">
.ai-marketing-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 50%, #e0f2fe 100%);
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
      radial-gradient(circle at 20% 50%, rgba(30, 156, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(13, 168, 239, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    border-radius: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(30, 156, 255, 0.3);

    .badge-icon {
      font-size: 20px;
    }

    .badge-text {
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .section-title {
    font-size: 36px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #1E9CFF, #0DA8EF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 16px;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(30, 156, 255, 0.15);
  }

  &.active {
    border-color: #1E9CFF;
    background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
  }

  .card-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 16px;
    color: #1E9CFF;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .card-desc {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }
}

.interaction-area {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
}

.panel {
  .panel-header {
    margin-bottom: 32px;
    text-align: center;

    h4 {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #6b7280;
    }
  }
}

.input-group {
  max-width: 600px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 24px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
}

.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  color: #1f2937;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1E9CFF;
    box-shadow: 0 0 0 3px rgba(30, 156, 255, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1E9CFF;
    background: #f0f9ff;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #1E9CFF;
  }

  .checkbox-label {
    font-size: 14px;
    color: #374151;
  }
}

.action-btn {
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 156, 255, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.result-area {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.result-card,
.plan-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;

  h5 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.result-content {
  :deep(.advice-item) {
    margin-bottom: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid #1E9CFF;

    h6 {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
    }
  }
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recommendation-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f9ff;
    transform: translateX(4px);
  }

  .rec-icon {
    font-size: 40px;
    flex-shrink: 0;
  }

  .rec-content {
    flex: 1;

    h5 {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
  }

  .rec-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .rec-tag {
    padding: 4px 10px;
    background: #e0f2fe;
    color: #1E9CFF;
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
  }

  .rec-btn {
    padding: 10px 20px;
    background: white;
    border: 1px solid #1E9CFF;
    color: #1E9CFF;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: #1E9CFF;
      color: white;
    }
  }
}

.plan-content {
  :deep(.plan-section) {
    margin-bottom: 20px;

    h6 {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.8;
        padding-left: 16px;
        position: relative;

        &::before {
          content: '•';
          color: #1E9CFF;
          position: absolute;
          left: 0;
          font-weight: bold;
        }
      }
    }
  }
}

.download-btn {
  margin-top: 16px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1E9CFF;
    color: #1E9CFF;
  }
}

.view-more-section {
  text-align: center;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: white;
  border: 2px solid #1E9CFF;
  color: #1E9CFF;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1E9CFF;
    color: white;
    transform: translateX(4px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
}

// 场景详情弹窗
.scenarios-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
  }

  .close-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e5e7eb;
      color: #1f2937;
    }
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 32px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}

.scenario-detail-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f9ff;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(30, 156, 255, 0.1);
  }

  .scenario-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .scenario-case,
  .scenario-guide {
    font-size: 13px;
    color: #374151;
    line-height: 1.5;
    margin-bottom: 8px;

    strong {
      color: #1E9CFF;
    }
  }
}

// 教程引导
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.3s ease;
}

.tutorial-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 480px;
  text-align: center;
  animation: slideUp 0.3s ease;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 16px;
  }

  ol {
    text-align: left;
    margin-bottom: 24px;
    padding-left: 20px;

    li {
      font-size: 14px;
      color: #374151;
      line-height: 1.8;
      margin-bottom: 8px;
    }
  }

  .tutorial-btn {
    padding: 12px 32px;
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(30, 156, 255, 0.4);
    }
  }
}

// 响应式优化
@media (max-width: 768px) {
  .ai-marketing-section {
    padding: 60px 0;
  }

  .section-header {
    .section-title {
      font-size: 28px;
    }

    .section-subtitle {
      font-size: 14px;
    }
  }

  .feature-cards {
    gap: 16px;
  }

  .feature-card {
    padding: 24px 16px;

    .card-icon {
      width: 48px;
      height: 48px;
    }

    .card-title {
      font-size: 16px;
    }

    .card-desc {
      font-size: 13px;
    }
  }

  .interaction-area {
    padding: 24px 16px;
  }

  .panel {
    .panel-header {
      h4 {
        font-size: 20px;
      }
    }
  }

  .recommendation-card {
    flex-direction: column;
    text-align: center;

    .rec-btn {
      width: 100%;
    }
  }
}
</style>