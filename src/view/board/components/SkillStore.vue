  <template>
  <div class="skill-store-container">
    <!-- 顶部导航栏 -->
    <div class="skill-store-header">
      <div class="header-content">
        <div class="header-brand">
          <h1 class="brand-title">技能商城</h1>
          <p class="brand-subtitle">发现并使用优质技能，提升工作效率</p>
        </div>
        <div class="header-actions">
          <div class="search-container">
            <a-input-search 
              placeholder="搜索更多技能" 
              class="search-input"
              :value="activeTab === 'store' ? searchKeyword : mySkillsSearchKeyword"
              @input="handleSearchInput"
              @search="activeTab === 'store' ? handleSearch : handleMySkillsSearch"
              size="large"
            />
          </div>
          <a-button type="default" @click="openPurchaseHistory" class="purchase-history-button">
            购买记录
          </a-button>
          <a-button type="primary" @click="createSkill" class="create-button">
            <PlusOutlined /> 创建技能
          </a-button>
        </div>
      </div>
      
      <!-- 标签切换 -->
      <div class="tab-navigation">
        <div class="tab-container">
          <a-tabs v-model:activeKey="activeTab" class="main-tabs" size="large">
            <a-tab-pane key="store" tab="技能商店" />
            <a-tab-pane key="mySkills" tab="我的技能" />
          </a-tabs>
        </div>
      </div>
      
      <!-- 行业分类导航 -->
      <div v-if="activeTab === 'store'" class="category-nav">
        <div class="category-content">
          <div class="category-tabs">
            <div 
              v-for="category in categories" 
              :key="category.value"
              class="category-item"
              :class="{ active: activeCategory === category.value }"
              @click="activeCategory = category.value"
            >
              {{ category.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能商店内容 -->
    <div v-if="activeTab === 'store'" class="store-content">
      <!-- 横幅区域 -->
      <div class="hero-section">
        <div class="hero-content">
          <h2 class="hero-title">发现优质技能，解锁无限可能</h2>
          <p class="hero-description">从创意设计到生产力工具，找到适合你的专业技能</p>
          <div class="hero-actions">
            <a-button type="primary" size="large" class="hero-button primary">
              探索技能
            </a-button>
            <a-button size="large" class="hero-button secondary">
              了解更多
            </a-button>
          </div>
        </div>
      </div>

      <!-- 编辑推荐 -->
      <div class="featured-section">
        <div class="section-header">
          <h2 class="section-title">🌟 编辑推荐</h2>
          <p class="section-subtitle">精选优质技能，为你推荐</p>
        </div>
        <div class="featured-skills">
          <div 
            v-for="skill in featuredSkills" 
            :key="skill.id"
            class="featured-skill-card"
            @click="showSkillDetail(skill)"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <div class="skill-info">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-author">
                <Avatar :src="skill.icon" size="small" />
                <span>@{{ skill.author }}</span>
              </div>
            </div>
            <div class="skill-badge">
              <span class="badge-text">推荐</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑精选 -->
      <div class="editor-picks-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">✨ 编辑精选</h2>
            <p class="section-subtitle">精心挑选的高质量技能</p>
          </div>
          <a-button type="text" class="more-button" @click="showMoreSkills('editorPicks')">
            {{ showMoreEditorPicks ? '收起 ↑' : '查看更多 >' }}
          </a-button>
        </div>
        <div class="skills-grid">
          <div 
            v-for="skill in editorPicks" 
            :key="skill.id"
            class="skill-card"
            @click="showSkillDetail(skill)"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <div class="skill-info">
              <div class="skill-rating">
                <span class="rating-stars">
                  ★★★★{{ skill.rating && skill.rating < 5 ? '☆' : '★' }}
                </span>
                <span class="rating-score">{{ skill.rating || 4.5 }}</span>
              </div>
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-meta">
                <span class="skill-price">{{ skill.price === 0 ? '免费' : `¥${skill.price}` }}</span>
                <div class="skill-author">
                  <Avatar :src="skill.icon" size="small" />
                  <span>@{{ skill.author }}</span>
                </div>
              </div>
              <a-button 
                type="primary" 
                class="install-button"
                @click.stop="installSkill(skill.id)"
              >
                {{ skill.installed ? '已安装' : '安装' }}
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 近期热门 -->
      <div class="trending-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">🔥 近期热门</h2>
            <p class="section-subtitle">大家都在使用的热门技能</p>
          </div>
          <div class="trending-controls">
            <a-button type="text" class="nav-button">&lt;</a-button>
            <a-button type="text" class="nav-button">&gt;</a-button>
          </div>
        </div>
        <div class="trending-skills">
          <div 
            v-for="skill in trendingSkills" 
            :key="skill.id"
            class="trending-skill-card"
            @click="showSkillDetail(skill)"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <div class="skill-info">
              <div class="skill-rating">
                <span class="rating-stars">
                  ★★★★{{ skill.rating && skill.rating < 5 ? '☆' : '★' }}
                </span>
              </div>
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-meta">
                <span class="skill-price">{{ skill.price === 0 ? '免费' : `¥${skill.price}` }}</span>
                <span class="skill-hot">热门</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的技能内容 -->
    <div v-else-if="activeTab === 'mySkills'" class="my-skills-content">
      <div class="my-skills-header">
        <h2 class="my-skills-title">我的技能</h2>
        <div class="my-skills-actions">
          <a-input-search 
            placeholder="搜索我的技能" 
            :value="mySkillsSearchKeyword"
            @input="handleSearchInput"
            @search="handleMySkillsSearch"
            style="width: 250px; margin-right: 12px;"
          />
          <a-button type="primary" @click="createSkill" class="create-button">
            <PlusOutlined /> 创建技能
          </a-button>
        </div>
      </div>
      <div class="my-skills-tabs">
        <a-radio-group v-model:value="mySkillsTab" button-style="solid">
          <a-radio-button value="added">我添加的</a-radio-button>
          <a-radio-button value="created">我创建的</a-radio-button>
        </a-radio-group>
      </div>
      <div class="my-skills-section">
        <div class="my-skills-list">
          <div 
            v-for="skill in filteredMySkills" 
            :key="skill.id"
            class="my-skill-card"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <div class="skill-info">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-type">
                <span class="type-tag">{{ skill.type === 'added' ? '添加的技能' : '创建的技能' }}</span>
              </div>
            </div>
            <div class="skill-actions">
              <a-button type="primary" @click="useSkill(skill.id)">立即使用</a-button>
              <a-dropdown>
                <a-button type="text">
                  <EllipsisOutlined />
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="editSkill(skill.id)">
                      编辑
                    </a-menu-item>
                    <a-menu-item @click="removeSkill(skill.id)">
                      移除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
        <div v-if="filteredMySkills.length === 0" class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">🎯</div>
            <h3 class="empty-title">暂无技能</h3>
            <p class="empty-description">去技能商店探索并添加感兴趣的技能吧</p>
            <a-button type="primary" @click="activeTab = 'store'">
              去技能商店
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 创建技能模态框 -->
  <a-modal
    v-model:visible="isCreateModalVisible"
    title="创建技能"
    width="600px"
    @ok="handleCreateSkill"
    @cancel="isCreateModalVisible = false"
    class="create-skill-modal"
  >
    <div class="modal-header">
      <h3>创建属于你的技能</h3>
      <p>分享你的专业知识，帮助更多人</p>
    </div>
    <a-form
      ref="createFormRef"
      :model="skillForm"
      layout="vertical"
    >
      <a-form-item
        label="技能名称"
        name="name"
        :rules="[{ required: true, message: '请输入技能名称' }, { min: 2, max: 50, message: '技能名称长度应在2-50个字符之间' }]"
      >
        <a-input v-model:value="skillForm.name" placeholder="请输入技能名称" size="large" />
      </a-form-item>
      <a-form-item
        label="技能描述"
        name="description"
        :rules="[{ required: true, message: '请输入技能描述' }, { min: 10, max: 2000, message: '技能描述长度应在10-2000个字符之间' }]"
      >
        <a-textarea v-model:value="skillForm.description" placeholder="请输入技能描述" :rows="4" size="large" />
      </a-form-item>
      <a-form-item
        label="技能分类"
        name="category"
        :rules="[{ required: true, message: '请选择技能分类' }]"
      >
        <a-select v-model:value="skillForm.category" size="large">
          <a-select-option value="生产力">生产力</a-select-option>
          <a-select-option value="创意设计">创意设计</a-select-option>
          <a-select-option value="教育学习">教育学习</a-select-option>
          <a-select-option value="商业管理">商业管理</a-select-option>
          <a-select-option value="工具助手">工具助手</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="技能价格"
        name="price"
      >
        <a-input-number v-model:value="skillForm.price" min="0" placeholder="请输入技能价格" style="width: 100%;" size="large" />
        <div class="form-hint">设置为0表示免费技能</div>
      </a-form-item>
      <a-form-item
        label="是否开源"
        name="openSource"
      >
        <a-switch v-model:checked="skillForm.openSource" />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 编辑技能模态框 -->
  <a-modal
    v-model:visible="isEditModalVisible"
    title="编辑技能"
    width="600px"
    @ok="handleEditSkill"
    @cancel="isEditModalVisible = false"
  >
    <a-form
      ref="editFormRef"
      :model="editSkillForm"
      layout="vertical"
    >
      <a-form-item
        label="技能名称"
        name="name"
        :rules="[{ required: true, message: '请输入技能名称' }]"
      >
        <a-input v-model:value="editSkillForm.name" placeholder="请输入技能名称" />
      </a-form-item>
      <a-form-item
        label="技能描述"
        name="description"
        :rules="[{ required: true, message: '请输入技能描述' }, { min: 10, max: 2000, message: '技能描述长度应在10-2000个字符之间' }]"
      >
        <a-textarea v-model:value="editSkillForm.description" placeholder="请输入技能描述" :rows="4" />
      </a-form-item>
      <a-form-item
        label="技能分类"
        name="category"
        :rules="[{ required: true, message: '请选择技能分类' }]"
      >
        <a-select v-model:value="editSkillForm.category">
          <a-select-option value="生产力">生产力</a-select-option>
          <a-select-option value="创意设计">创意设计</a-select-option>
          <a-select-option value="教育学习">教育学习</a-select-option>
          <a-select-option value="商业管理">商业管理</a-select-option>
          <a-select-option value="工具助手">工具助手</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 购买记录模态框 -->
  <a-modal
    v-model:visible="isPurchaseHistoryVisible"
    title="购买记录"
    width="800px"
    @cancel="isPurchaseHistoryVisible = false"
  >
    <div class="purchase-history-content">
      <a-table :data-source="purchaseHistory" :columns="purchaseHistoryColumns" row-key="id">
        <template #status="{ record }">
          <a-tag :color="record.status === 'completed' ? 'green' : 'blue'">
            {{ record.status === 'completed' ? '已完成' : '处理中' }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="text" @click="viewPurchaseDetail(record.id)">
            查看详情
          </a-button>
        </template>
      </a-table>
    </div>
  </a-modal>

  <!-- 技能详情模态框 -->
  <a-modal
    v-model:visible="isSkillDetailVisible"
    :title="''"
    width="800px"
    :footer="null"
    @cancel="isSkillDetailVisible = false"
    class="skill-detail-modal"
  >
    <div v-if="selectedSkill" class="skill-detail-content">
      <div class="skill-detail-header">
        <div class="skill-icon large">
          <img :src="selectedSkill.icon" :alt="selectedSkill.name" />
        </div>
        <div class="skill-detail-info">
          <div class="skill-badges">
            <span class="badge featured">精选</span>
            <span v-if="selectedSkill.price === 0" class="badge free">免费</span>
          </div>
          <h2 class="skill-detail-name">{{ selectedSkill.name }}</h2>
          <p class="skill-detail-description">{{ selectedSkill.description }}</p>
          <div class="skill-detail-meta">
            <div class="meta-item">
              <span class="meta-label">评分</span>
              <span class="skill-rating">
                {{ selectedSkill.rating || 4.5 }}
                <span class="stars">
                  ★★★★{{ selectedSkill.rating && selectedSkill.rating < 5 ? '☆' : '★' }}
                </span>
              </span>
            </div>
            <div class="meta-item">
              <span class="meta-label">分类</span>
              <span class="skill-category">{{ selectedSkill.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">开发者</span>
              <span class="skill-author">@{{ selectedSkill.author }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">版本</span>
              <span class="skill-version">v1.0</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">用户</span>
              <span class="skill-users">{{ Math.floor(Math.random() * 10000) }}w</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">开源</span>
              <span class="skill-open-source">{{ selectedSkill.openSource ? '是' : '否' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="skill-detail-body">
        <div class="skill-core-features">
          <h3 class="section-title">核心功能</h3>
          <ul class="feature-list">
            <li v-for="(feature, index) in selectedSkill.features || [
              '针对用户需求提供个性化解决方案',
              '结合实时数据进行智能分析',
              '提供详细的操作建议和指导',
              '支持多种场景下的应用'
            ]" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="skill-cases">
          <h3 class="section-title">精选案例</h3>
          <div class="cases-grid">
            <div v-for="(caseItem, index) in selectedSkill.cases || [
              { title: '案例一', description: '详细的案例描述和效果展示' },
              { title: '案例二', description: '详细的案例描述和效果展示' },
              { title: '案例三', description: '详细的案例描述和效果展示' }
            ]" :key="index" class="case-card">
              <div class="case-icon">📋</div>
              <h4 class="case-title">{{ caseItem.title }}</h4>
              <p class="case-description">{{ caseItem.description }}</p>
            </div>
          </div>
        </div>

        <div class="skill-rating-detail">
          <h3 class="section-title">用户评价</h3>
          <div class="rating-overview">
            <div class="rating-score">{{ selectedSkill.rating || 4.5 }}</div>
            <div class="rating-stars">
              ★★★★{{ selectedSkill.rating && selectedSkill.rating < 5 ? '☆' : '★' }}
            </div>
            <div class="rating-count">{{ Math.floor(Math.random() * 500) + 100 }}条评价</div>
          </div>
          <div class="rating-distribution">
            <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="rating-bar">
              <span class="star-label">{{ star }}星</span>
              <div class="bar-container">
                <div class="bar-fill" :style="{ width: `${Math.random() * 100}%` }"></div>
              </div>
              <span class="bar-percentage">{{ Math.floor(Math.random() * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="skill-detail-footer">
        <a-button 
          type="primary" 
          class="add-button"
          @click="installSkill(selectedSkill.id)"
        >
          {{ selectedSkill.installed ? '已安装' : '添加' }}
        </a-button>
        <a-button class="share-button" @click="shareSkill(selectedSkill.id)">
          分享技能
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { message } from 'ant-design-vue'
import {
  PlusOutlined,
  EllipsisOutlined
} from '@ant-design/icons-vue'
import { Avatar } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

const router = useRouter()
const userStore = useUserStore()

// 当前激活的标签
const activeTab = ref('store')
// 搜索关键词
const searchKeyword = ref('')
// 当前选中的分类
const activeCategory = ref('all')
// 我的技能搜索关键词
const mySkillsSearchKeyword = ref('')
// 我的技能标签
const mySkillsTab = ref('added')
// 是否显示更多编辑精选技能
const showMoreEditorPicks = ref(false)

// 分类数据
const categories = [
  { value: 'all', label: '全部' },
  { value: '生产力', label: '生产力' },
  { value: '创意设计', label: '创意设计' },
  { value: '教育学习', label: '教育学习' },
  { value: '商业管理', label: '商业管理' },
  { value: '工具助手', label: '工具助手' }
]

// 技能创建和编辑相关
const isCreateModalVisible = ref(false)
const isEditModalVisible = ref(false)
const currentEditSkill = ref<any>(null)
const createFormRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()

// 技能详情相关
const isSkillDetailVisible = ref(false)
const selectedSkill = ref<any>(null)

// 购买记录相关
const isPurchaseHistoryVisible = ref(false)
const purchaseHistory = ref([
  {
    id: '1',
    skillName: '智能写作助手',
    price: 0,
    purchaseTime: '2026-03-20 14:30:00',
    status: 'completed'
  },
  {
    id: '2',
    skillName: '创意设计生成器',
    price: 0,
    purchaseTime: '2026-03-18 09:15:00',
    status: 'completed'
  },
  {
    id: '3',
    skillName: '知识问答专家',
    price: 0,
    purchaseTime: '2026-03-15 16:45:00',
    status: 'completed'
  }
])

const purchaseHistoryColumns = [
  {
    title: '技能名称',
    dataIndex: 'skillName',
    key: 'skillName'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => price === 0 ? '免费' : `¥${price}`
  },
  {
    title: '购买时间',
    dataIndex: 'purchaseTime',
    key: 'purchaseTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

// 查看购买详情
const viewPurchaseDetail = (purchaseId: string) => {
  message.success(`查看购买详情: ${purchaseId}`)
}

// 打开购买记录
const openPurchaseHistory = () => {
  isPurchaseHistoryVisible.value = true
}

// 表单数据
const skillForm = ref({
  name: '',
  description: '',
  category: '生产力',
  price: 0,
  openSource: false
})

// 编辑表单数据
const editSkillForm = ref({
  name: '',
  description: '',
  category: '生产力'
})

// 模拟技能数据
const skills = ref([
  {
    id: '1',
    name: '智能写作助手',
    description: '帮助您快速生成各种类型的文本内容，包括文章、邮件、报告等',
    category: '生产力',
    rating: 4.8,
    price: 0,
    author: '阿基',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=writing&backgroundColor=00b4ff,7b61ff',
    installed: false
  },
  {
    id: '2',
    name: '创意设计生成器',
    description: '根据您的需求生成创意设计方案，包括logo、海报、UI设计等',
    category: '创意设计',
    rating: 4.6,
    price: 0,
    author: '云小墨',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=design&backgroundColor=ff6b6b,4ecdc4',
    installed: false
  },
  {
    id: '3',
    name: '知识问答专家',
    description: '回答各种知识领域的问题，提供详细准确的信息',
    category: '教育学习',
    rating: 4.9,
    price: 0,
    author: '开心需要',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=knowledge&backgroundColor=4ecdc4,45b7d1',
    installed: false
  },
  {
    id: '4',
    name: '数据分析工具',
    description: '帮助您分析数据，生成图表和报告，提供数据洞察',
    category: '商业管理',
    rating: 4.7,
    price: 0,
    author: '洋洋',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=data&backgroundColor=96ceb4,ffeead',
    installed: false
  },
  {
    id: '5',
    name: '代码助手',
    description: '帮助您编写、调试和优化代码，支持多种编程语言',
    category: '工具助手',
    rating: 4.8,
    price: 0,
    author: 'RootUser',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=code&backgroundColor=98d8c8,f7dc6f',
    installed: false
  },
  {
    id: '6',
    name: '语言翻译器',
    description: '支持多种语言之间的翻译，提供准确的翻译结果',
    category: '工具助手',
    rating: 4.6,
    price: 0,
    author: '开心需要',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=translate&backgroundColor=bb8fce,85c1e9',
    installed: false
  },
  {
    id: '7',
    name: '演讲助手',
    description: '帮助您准备和优化演讲内容，提供演讲技巧和建议',
    category: '生产力',
    rating: 4.5,
    price: 0,
    author: '洋洋',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=speech&backgroundColor=f8c471,85c1e9',
    installed: false
  },
  {
    id: '8',
    name: '学习计划制定',
    description: '根据您的学习目标，制定个性化的学习计划',
    category: '教育学习',
    rating: 4.7,
    price: 0,
    author: 'RootUser',
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=study&backgroundColor=82e0aa,85c1e9',
    installed: false
  }
])

// 编辑推荐技能
const featuredSkills = computed(() => {
  let result = [
    {
      id: 'f1',
      name: '剧本生成分镜',
      description: '专为视频创作者设计的剧本分镜提示词生成器',
      author: '阿基',
      category: '创意设计',
      icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=script&backgroundColor=ff9ff3,54a0ff'
    },
    {
      id: 'f2',
      name: '小说从 0 到神',
      description: '一站式小说创作全流程辅助，从书名、人设、大纲到开篇、爽点、反转、节奏优化，全程陪伴，轻松写出爆款。',
      author: '云小墨',
      category: '创意设计',
      icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=novel&backgroundColor=54a0ff,5f27cd'
    }
  ]
  
  // 按分类过滤
  if (activeCategory.value !== 'all') {
    result = result.filter(skill => skill.category === activeCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value && typeof searchKeyword.value === 'string') {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(keyword) || 
      skill.description.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 编辑精选技能
const editorPicks = computed(() => {
  let result = skills.value
  
  // 按分类过滤
  if (activeCategory.value !== 'all') {
    result = result.filter(skill => skill.category === activeCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value && typeof searchKeyword.value === 'string') {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(keyword) || 
      skill.description.toLowerCase().includes(keyword)
    )
  }
  
  // 根据是否显示更多来决定显示数量
  const limit = showMoreEditorPicks.value ? result.length : 6
  return result.slice(0, limit)
})

// 近期热门技能
const trendingSkills = computed(() => {
  let result = skills.value
  
  // 按分类过滤
  if (activeCategory.value !== 'all') {
    result = result.filter(skill => skill.category === activeCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value && typeof searchKeyword.value === 'string') {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(keyword) || 
      skill.description.toLowerCase().includes(keyword)
    )
  }
  
  return result.slice(6, 10)
})

// 从本地存储加载我的技能数据
const loadMySkills = () => {
  console.log('Loading skills from localStorage...')
  const savedSkills = localStorage.getItem('mySkills')
  console.log('Saved skills:', savedSkills)
  if (savedSkills) {
    try {
      const parsedSkills = JSON.parse(savedSkills)
      console.log('Parsed skills:', parsedSkills)
      return parsedSkills
    } catch (error) {
      console.error('Failed to parse saved skills:', error)
      return []
    }
  }
  // 默认数据
  console.log('No saved skills found, using default data')
  return [
    {
      id: '101',
      name: '快速榨干一本书',
      description: '我AI把烂书的书内内容快速处理了且，新脑取核心知识转化为可执行的行动计划。',
      icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=book&backgroundColor=1dd1a1,5f27cd',
      type: 'added' // added 或 created
    },
    {
      id: '102',
      name: '短视频脚本生成器',
      description: '根据主题快速生成吸引人的短视频脚本，包括开头、中间和结尾。',
      icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=video&backgroundColor=ff6b6b,48dbfb',
      type: 'created'
    }
  ]
}

// 保存我的技能数据到本地存储
const saveMySkills = (skills: any[]) => {
  console.log('Saving skills to localStorage:', skills)
  localStorage.setItem('mySkills', JSON.stringify(skills))
  console.log('Saved successfully')
}

// 我的技能数据
const mySkills = ref(loadMySkills())

// 过滤技能列表
const filteredSkills = computed(() => {
  let result = skills.value
  
  // 按分类过滤
  if (activeCategory.value !== 'all') {
    result = result.filter(skill => skill.category === activeCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value && typeof searchKeyword.value === 'string') {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(keyword) || 
      skill.description.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 过滤我的技能
const filteredMySkills = computed(() => {
  let result = mySkills.value
  
  // 按类型过滤
  if (mySkillsTab.value === 'added') {
    result = result.filter(skill => skill.type === 'added')
  } else if (mySkillsTab.value === 'created') {
    result = result.filter(skill => skill.type === 'created')
  }
  
  // 按关键词搜索
  if (mySkillsSearchKeyword.value) {
    const keyword = mySkillsSearchKeyword.value.toLowerCase()
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(keyword) || 
      skill.description.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 处理搜索
const handleSearch = () => {
  // 搜索逻辑已在computed中处理
  message.success(`搜索: ${searchKeyword.value}`)
}

// 处理我的技能搜索
const handleMySkillsSearch = () => {
  // 搜索逻辑已在computed中处理
  message.success(`搜索我的技能: ${mySkillsSearchKeyword.value}`)
}

// 处理搜索输入
const handleSearchInput = (e: any) => {
  const value = typeof e === 'string' ? e : (e.target ? e.target.value : '')
  if (activeTab.value === 'store') {
    searchKeyword.value = value
  } else {
    mySkillsSearchKeyword.value = value
  }
}

// 安装技能
const installSkill = (skillId: string) => {
  const skill = skills.value.find(s => s.id === skillId)
  if (skill) {
    skill.installed = !skill.installed
    message.success(skill.installed ? '技能安装成功' : '技能已卸载')
    
    // 如果安装成功，添加到我的技能列表
    if (skill.installed) {
      // 检查是否已经存在
      const existingSkill = mySkills.value.find(s => s.id === `added_${skillId}`)
      if (!existingSkill) {
        mySkills.value.push({
          id: `added_${skillId}`,
          name: skill.name,
          description: skill.description,
          icon: skill.icon,
          type: 'added'
        })
        // 保存到本地存储
        saveMySkills(mySkills.value)
      }
    } else {
      // 如果卸载，从我的技能列表中移除
      const index = mySkills.value.findIndex(s => s.id === `added_${skillId}`)
      if (index > -1) {
        mySkills.value.splice(index, 1)
        // 保存到本地存储
        saveMySkills(mySkills.value)
      }
    }
  }
}

// 使用技能
const useSkill = (skillId: string) => {
  const skill = mySkills.value.find(s => s.id === skillId)
  if (skill) {
    // 跳转到技能使用页面，带上技能信息
    message.success(`正在使用技能: ${skill.name}`)
    // 跳转到新的技能使用页面
    router.push(`/skilluse?id=${skill.id}&skill=${encodeURIComponent(skill.name)}`)
  }
}



// 移除技能
const removeSkill = (skillId: string) => {
  const index = mySkills.value.findIndex(s => s.id === skillId)
  if (index > -1) {
    mySkills.value.splice(index, 1)
    message.success('技能已移除')
    // 保存到本地存储
    saveMySkills(mySkills.value)
    
    // 如果是从商店添加的技能，更新其安装状态
    if (skillId.startsWith('added_')) {
      const originalSkillId = skillId.replace('added_', '')
      const skill = skills.value.find(s => s.id === originalSkillId)
      if (skill) {
        skill.installed = false
      }
    }
  }
}

// 创建技能
const createSkill = () => {
  // 重置表单
  skillForm.value = {
    name: '',
    description: '',
    category: '生产力',
    price: 0,
    openSource: false
  }
  isCreateModalVisible.value = true
}

// 处理创建技能
const handleCreateSkill = async () => {
  if (!createFormRef.value) return
  
  try {
    await createFormRef.value.validate()
    
    // 创建新技能
    const categoryMap: Record<string, string> = {
      '生产力': 'productivity',
      '创意设计': 'creative design',
      '教育学习': 'education',
      '商业管理': 'business management',
      '工具助手': 'tool assistant'
    }
    
    const categoryEn = categoryMap[skillForm.value.category] || 'skill'
    const colors = [
      '00b4ff,7b61ff',
      'ff6b6b,4ecdc4',
      '4ecdc4,45b7d1',
      '96ceb4,ffeead',
      '98d8c8,f7dc6f',
      'bb8fce,85c1e9',
      'f8c471,85c1e9',
      '82e0aa,85c1e9',
      'ff9ff3,54a0ff',
      '54a0ff,5f27cd',
      '1dd1a1,5f27cd',
      'ff6b6b,48dbfb'
    ]
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const seed = skillForm.value.name.toLowerCase().replace(/\s+/g, '-')
    
    const newSkill = {
      id: `created_${Date.now()}`,
      name: skillForm.value.name,
      description: skillForm.value.description,
      category: skillForm.value.category,
      price: skillForm.value.price,
      openSource: skillForm.value.openSource,
      author: '我',
      rating: 5.0,
      icon: `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=${randomColor}`,
      type: 'created'
    }
    
    // 添加到我的技能列表
    mySkills.value.push(newSkill)
    // 保存到本地存储
    saveMySkills(mySkills.value)
    
    message.success('技能创建成功')
    isCreateModalVisible.value = false
  } catch (error) {
    console.error('创建技能失败:', error)
  }
}

// 编辑技能
const editSkill = (skillId: string) => {
  const skill = mySkills.value.find(s => s.id === skillId)
  if (skill) {
    currentEditSkill.value = skill
    editSkillForm.value = {
      name: skill.name,
      description: skill.description,
      category: '生产力'
    }
    isEditModalVisible.value = true
  }
}

// 处理编辑技能
const handleEditSkill = async () => {
  if (!editFormRef.value || !currentEditSkill.value) return
  
  try {
    await editFormRef.value.validate()
    
    // 更新技能信息
    const index = mySkills.value.findIndex(s => s.id === currentEditSkill.value.id)
    if (index > -1) {
      mySkills.value[index] = {
        ...mySkills.value[index],
        name: editSkillForm.value.name,
        description: editSkillForm.value.description
      }
      // 保存到本地存储
      saveMySkills(mySkills.value)
    }
    
    message.success('技能编辑成功')
    isEditModalVisible.value = false
  } catch (error) {
    console.error('编辑技能失败:', error)
  }
}

// 显示技能详情
const showSkillDetail = (skill: any) => {
  selectedSkill.value = skill
  isSkillDetailVisible.value = true
}

// 分享技能
const shareSkill = (skillId: string) => {
  // 这里可以实现分享功能，例如复制链接或打开分享对话框
  message.success('技能分享功能已触发')
  // 模拟复制到剪贴板
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`https://kedoai.com/skill/${skillId}`).then(() => {
      message.success('技能链接已复制到剪贴板')
    })
  }
}

// 查看更多技能
const showMoreSkills = (type: string) => {
  if (type === 'editorPicks') {
    showMoreEditorPicks.value = !showMoreEditorPicks.value
    if (showMoreEditorPicks.value) {
      message.success('已展开显示所有技能')
    } else {
      message.success('已收起')
    }
  }
}
</script>

<style scoped lang="scss">
.skill-store-container {
  padding: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 10% 20%, rgba(30, 156, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 90% 80%, rgba(107, 115, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

/* 顶部导航栏 */
.skill-store-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }
  
  .header-brand {
    flex: 1;
    
    .brand-title {
      font-size: 32px;
      font-weight: 700;
      color: #1E9CFF;
      margin-bottom: 4px;
    }
    
    .brand-subtitle {
      font-size: 14px;
      color: #718096;
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .search-container {
    flex: 1;
    max-width: 400px;
    
    .search-input {
      width: 100%;
      border-radius: 8px;
      background: white;
      border: 1px solid #e2e8f0;
      
      :deep(.ant-input) {
        border-radius: 8px;
        padding: 10px 16px;
        border: none;
        box-shadow: none;
      }
      
      :deep(.ant-input-search-button) {
        border-radius: 0 8px 8px 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-left: none;
        color: #718096;
        
        &:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #4a5568;
        }
      }
    }
  }
  
  .purchase-history-button {
    font-size: 14px;
    color: #4a5568;
    font-weight: 500;
    border-radius: 8px;
    padding: 10px 16px;
    background: white;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #2d3748;
    }
  }
  
  .create-button {
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 600;
    background: linear-gradient(135deg, #1E9CFF 0%, #6B73FF 100%);
    border-color: #1E9CFF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
      background: linear-gradient(135deg, #1890ff 0%, #5a61ff 100%);
      border-color: #1890ff;
      box-shadow: 0 4px 12px rgba(30, 156, 255, 0.3);
    }
  }
  
  /* 标签切换 */
  .tab-navigation {
    margin-top: 20px;
    
    .tab-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    :deep(.ant-tabs-nav) {
      justify-content: center;
    }
    
    :deep(.ant-tabs-tab) {
      font-size: 16px;
      font-weight: 600;
      padding: 12px 24px;
      position: relative;
      transition: all 0.2s ease;
      
      &:hover {
        color: #1677ff;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 2px;
        background: #e5e7eb;
        transition: all 0.2s ease;
      }
    }
    
    :deep(.ant-tabs-tab-active) {
      color: #1677ff;
      
      &::after {
        background: #1677ff;
        height: 3px;
        font-weight: bold;
      }
    }
    
    :deep(.ant-tabs-ink-bar) {
      display: none;
    }
  }
  
  /* 行业分类导航 */
  .category-nav {
    border-top: 1px solid #e2e8f0;
    margin-top: 20px;
    padding-top: 20px;
    margin-bottom: 24px;
    
    .category-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .category-tabs {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      
      .category-item {
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        text-align: center;
        cursor: pointer;
        background: white;
        border: 1px solid #d1d5db;
        color: #374151;
        
        &:hover {
          color: #1677ff;
          border-color: #1677ff;
        }
        
        &.active {
          background: #1677ff;
          border-color: #1677ff;
          color: white;
          
          &:hover {
            background: #1e88e5;
            border-color: #1e88e5;
          }
        }
      }
    }
  }
}

/* 技能商店内容 */
.store-content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 24px;
}

/* 横幅区域 */
.hero-section {
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f0f7ff 0%, #f8fbff 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
  .hero-content {
    text-align: center;
    padding: 0 20px;
    
    .hero-title {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 12px;
    }
    
    .hero-description {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 24px;
    }
    
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      
      .hero-button {
        border-radius: 8px;
        padding: 16px 24px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &.primary {
          background: #1677ff;
          border-color: #1677ff;
          color: white;
          
          &:hover {
            background: #1e88e5;
            border-color: #1e88e5;
          }
        }
        
        &.secondary {
          background: white;
          border-color: #1677ff;
          color: #1677ff;
          
          &:hover {
            background: #f0f7ff;
          }
        }
      }
    }
  }
}

/* 编辑推荐区域 */
.featured-section {
  margin-bottom: 40px;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0;
  }
  
  .section-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }
  
  .more-button {
    color: #1677ff;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .featured-skills {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(48%, 1fr));
    gap: 24px;
  }
  
  .featured-skill-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    display: flex;
    gap: 16px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      border-color: #1677ff;
    }
    
    .skill-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      
      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }
    
    .skill-info {
      flex: 1;
      
      .skill-name {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
      }
      
      .skill-description {
        font-size: 14px;
        line-height: 1.6;
        color: #6b7280;
        margin-bottom: 16px;
      }
      
      .skill-author {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #9ca3af;
        font-weight: 500;
        
        .ant-avatar {
          width: 20px;
          height: 20px;
        }
      }
    }
    
    .skill-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e5f2ff;
      color: #1677ff;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
  }
}

/* 编辑精选区域 */
.editor-picks-section {
  margin-bottom: 40px;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
  }
  
  .section-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }
  
  .more-button {
    color: #1677ff;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px 20px;
  }
  
  .skill-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      border-color: #1677ff;
    }
    
    .skill-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }
    
    .skill-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e5f2ff;
      color: #1677ff;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .skill-info {
      flex: 1;
      
      .skill-rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .rating-stars {
          color: #f59e0b;
          font-size: 14px;
        }
        
        .rating-score {
          font-size: 14px;
          color: #374151;
          font-weight: 600;
        }
      }
      
      .skill-name {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
        line-height: 1.3;
      }
      
      .skill-description {
        font-size: 14px;
        line-height: 1.6;
        color: #6b7280;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .skill-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        .skill-price {
          font-size: 14px;
          color: #1677ff;
          font-weight: 600;
        }
        
        .skill-author {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          
          .ant-avatar {
            width: 20px;
            height: 20px;
          }
        }
      }
      
      .install-button {
        width: 100%;
        margin-top: auto;
        padding: 8px 0;
        height: 36px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        background: #1677ff;
        border-color: #1677ff;
        color: white;
        transition: all 0.2s ease;
        
        &:hover {
          background: #1e88e5;
          border-color: #1e88e5;
          box-shadow: 0 4px 8px rgba(22, 119, 255, 0.3);
        }
        
        &:disabled {
          background: #e5e7eb;
          border-color: #e5e7eb;
          color: #9ca3af;
        }
      }
    }
  }
}

/* 近期热门区域 */
.trending-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
  }
  
  .section-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }
  
  .trending-controls {
    display: flex;
    gap: 8px;
  }
  
  .nav-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #1677ff;
      color: #1677ff;
    }
  }
  
  .trending-skills {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 24px 20px;
  }
  
  .trending-skill-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      border-color: #1677ff;
    }
    
    .skill-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }
    
    .skill-info {
      flex: 1;
      
      .skill-rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .rating-stars {
          color: #f59e0b;
          font-size: 14px;
        }
      }
      
      .skill-name {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
        line-height: 1.3;
      }
      
      .skill-description {
        font-size: 14px;
        line-height: 1.6;
        color: #6b7280;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .skill-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .skill-price {
          font-size: 14px;
          color: #1677ff;
          font-weight: 600;
        }
        
        .skill-hot {
          font-size: 12px;
          color: #f59e0b;
          font-weight: 500;
          background: #fffbeb;
          padding: 2px 8px;
          border-radius: 4px;
        }
      }
    }
  }
}

/* 我的技能内容 */
.my-skills-content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.my-skills-tabs {
  margin-bottom: 20px;
}

.my-skills-section {
  .my-skills-list {
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  
  .my-skill-card {
    padding: 24px;
    border-bottom: 1px solid #e2e8f0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background: #f8fafc;
      transform: translateX(8px);
    }
    
    .skill-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(30, 156, 255, 0.2);
      }
      
      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
        transition: all 0.3s ease;
      }
    }
    
    .skill-info {
      flex: 1;
      
      .skill-name {
        font-size: 18px;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 8px;
      }
      
      .skill-description {
        font-size: 14px;
        line-height: 1.6;
        color: #4a5568;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    
    .skill-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .ant-btn {
        border-radius: 10px;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(30, 156, 255, 0.3);
        }
      }
    }
  }
  
  .empty-state {
    padding: 60px 0;
    text-align: center;
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
  }
}

.form-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 8px;
}

/* 技能详情模态框 */
.skill-detail-modal {
  :deep(.ant-modal-content) {
    border-radius: 20px;
    overflow: hidden;
  }
  
  :deep(.ant-modal-header) {
    border-bottom: none;
    padding: 0;
  }
  
  :deep(.ant-modal-body) {
    padding: 0;
  }
}

.skill-detail-content {
  padding: 32px;
}

.skill-detail-header {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
  
  .skill-icon.large {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 60%;
      height: 60%;
      object-fit: contain;
    }
  }
  
  .skill-detail-info {
    flex: 1;
    
    .skill-detail-name {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 12px;
    }
    
    .skill-detail-description {
      font-size: 16px;
      line-height: 1.6;
      color: #4a5568;
      margin-bottom: 16px;
    }
    
    .skill-detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      
      span {
        font-size: 14px;
        color: #718096;
        
        &.skill-rating {
          color: #f59e0b;
          font-weight: 600;
          
          .stars {
            margin-left: 8px;
          }
        }
        
        &.skill-category {
          background: #e6f7ff;
          color: #1E9CFF;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 500;
        }
      }
    }
  }
}

.skill-detail-body {
  margin-bottom: 32px;
  
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 16px;
  }
  
  .skill-core-features {
    margin-bottom: 32px;
    
    .feature-list {
      list-style: none;
      padding: 0;
      
      li {
        font-size: 14px;
        line-height: 1.6;
        color: #4a5568;
        margin-bottom: 8px;
        padding-left: 20px;
        position: relative;
        
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #1E9CFF;
          font-weight: bold;
        }
      }
    }
  }
  
  .skill-cases {
    margin-bottom: 32px;
    
    .cases-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      
      .case-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 16px;
        border: 1px solid #e2e8f0;
        
        .case-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }
        
        .case-description {
          font-size: 12px;
          line-height: 1.4;
          color: #4a5568;
        }
      }
    }
  }
  
  .skill-rating-detail {
    .rating-overview {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      
      .rating-score {
        font-size: 32px;
        font-weight: 700;
        color: #1a202c;
      }
      
      .rating-stars {
        font-size: 16px;
        color: #f59e0b;
      }
      
      .rating-count {
        font-size: 14px;
        color: #718096;
      }
    }
    
    .rating-distribution {
      .rating-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
        
        .star-label {
          width: 40px;
          font-size: 14px;
          color: #718096;
        }
        
        .bar-container {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          
          .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
            border-radius: 4px;
          }
        }
        
        .bar-percentage {
          width: 50px;
          font-size: 14px;
          color: #718096;
          text-align: right;
        }
      }
    }
  }
}

.skill-detail-footer {
  display: flex;
  justify-content: center;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  
  .add-button {
    width: 200px;
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    background: linear-gradient(135deg, #1E9CFF 0%, #6B73FF 100%);
    border-color: #1E9CFF;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(30, 156, 255, 0.3);
    }
  }
}

/* 创建技能模态框 */
.create-skill-modal {
  :deep(.ant-modal-content) {
    border-radius: 16px;
    overflow: hidden;
  }
  
  :deep(.ant-modal-body) {
    padding: 32px;
  }
  
  .modal-header {
    text-align: center;
    margin-bottom: 24px;
    
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 14px;
      color: #718096;
      margin: 0;
    }
  }
  
  .ant-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .ant-form-item {
    margin-bottom: 16px;
  }
  
  .ant-form-item-label {
    text-align: center;
    margin-bottom: 8px;
  }
  
  .ant-input, .ant-select, .ant-input-number {
    text-align: center;
  }
  
  .ant-input-number-input {
    text-align: center;
  }
  
  .ant-switch {
    margin: 0 auto;
  }
  
  .form-hint {
    text-align: center;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .skill-store-container {
    .skill-store-header {
      padding: 16px 20px;
      
      .header-content {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }
      
      .header-brand {
        text-align: center;
      }
      
      .header-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        
        .search-container {
          max-width: none;
          
          .search-input {
            width: 100% !important;
          }
        }
        
        .purchase-history-button {
          width: 100%;
          justify-content: center;
        }
        
        .create-button {
          width: 100%;
        }
      }
      
      .tab-navigation {
        margin-top: 16px;
      }
      
      .category-nav {
        margin-top: 16px;
        padding-top: 16px;
        
        .category-tabs {
          justify-content: flex-start;
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: 8px;
          
          .category-item {
            flex-shrink: 0;
            padding: 8px 20px;
            font-size: 13px;
          }
        }
      }
    }
    
    .store-content {
      padding: 20px;
      
      .hero-section {
        .hero-content {
          text-align: center;
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        }
      }
      
      .featured-section {
        .featured-skills {
          grid-template-columns: 1fr;
        }
      }
      
      .editor-picks-section {
        .skills-grid {
          grid-template-columns: 1fr;
        }
      }
      
      .trending-section {
        .trending-skills {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
    
    .my-skills-content {
      padding: 20px;
      
      .my-skills-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        
        .my-skills-actions {
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          
          .ant-input-search {
            width: 100% !important;
          }
        }
      }
      
      .my-skills-section {
        .my-skill-card {
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 16px;
          
          .skill-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      }
    }
    
    .skill-detail-modal {
      :deep(.ant-modal-content) {
        width: 90vw !important;
        max-width: 90vw !important;
      }
      
      .skill-detail-content {
        padding: 20px;
        
        .skill-detail-header {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .skill-core-features {
          .feature-list {
            li {
              padding-left: 16px;
            }
          }
        }
        
        .skill-cases {
          .cases-grid {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .skill-store-container {
    .store-content {
      .trending-section {
        .trending-skills {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>