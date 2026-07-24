<template>
  <div class="community-container">
    <SiteNav active-key="community" />

    <!-- 页面头部 Banner 区 -->
    <section class="banner-section">
      <div class="banner-content">
        <h1 class="banner-title">OPC 名师大讲堂</h1>
        <p class="banner-subtitle">深耕自动化与数字化领域，汇聚 OPC 技术大咖，打造专业级技术成长社区，从入门到精通，一站式掌握 OPC 核心技能</p>
        <div class="banner-actions">
          <span class="btn primary coming-soon-btn">全部课程 <ComingSoonBadge /></span>
          <span class="btn secondary coming-soon-btn">入驻名师 <ComingSoonBadge /></span>
          <div class="search-box">
            <input type="text" placeholder="搜索你想学的 OPC 课程" class="search-input" />
            <button class="search-button">搜索</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门课程 TOP 榜 -->
    <section class="top-courses-section">
      <div class="section-header">
        <h2 class="section-title">热门课程 TOP 榜</h2>
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索课程或讲师" 
            class="search-input"
            @input="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
        <a href="#" class="view-more-btn" @click.prevent="handleButtonClick('查看更多课程')">
          {{ showAllCourses ? '收起' : '查看更多课程' }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      <div class="top-courses-grid">
        <div v-for="course in filteredCourses" :key="course.id" class="top-course-card" @click="handleCourseClick(course)">
          <div class="course-rank">{{ course.rank }}</div>
          <div class="course-cover small">
            <img :src="course.cover" :alt="course.title" />
          </div>
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-teacher">{{ course.teacher }}</p>
            <div class="course-stats">
              <span class="stat-item">{{ course.views }} 次播放</span>
              <span class="stat-item">{{ course.rating }} 分</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心主体区 - 名师大讲堂 -->
    <section class="main-section">
      <div class="main-content">
        <!-- 左侧名师卡片列表区 -->
        <div class="teachers-sidebar">
          <div class="sidebar-header">
            <h2 class="sidebar-title">入驻名师</h2>
            <a href="#" class="view-more-btn" @click.prevent="handleButtonClick('查看更多名师')">
              {{ showAllTeachers ? '收起' : '查看更多名师' }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div class="teachers-list">
            <div 
              v-for="teacher in showAllTeachers ? teachers : teachers.slice(0, 3)" 
              :key="teacher.id"
              class="teacher-card"
              :class="{ active: selectedTeacherId === teacher.id }"
              @click="selectTeacher(teacher.id)"
            >
              <div class="teacher-avatar">
                <img :src="teacher.avatar" :alt="teacher.name" />
              </div>
              <h3 class="teacher-name">{{ teacher.name }} <span class="teacher-title">{{ teacher.title }}</span></h3>
              <p class="teacher-bio">{{ teacher.bio }}</p>
              <div class="teacher-stats">
                <span class="stat-item">课程数：{{ teacher.courseCount }}</span>
                <span class="stat-divider">|</span>
                <span class="stat-item">学员：{{ teacher.studentCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧课程展示区 -->
        <div class="courses-section">
          <div class="courses-header">
            <h2 class="courses-title">{{ selectedTeacher.name }} 老师的全部课程</h2>
            <div class="courses-filter">
              <label for="sort-select">课程排序：</label>
              <select id="sort-select" v-model="sortOption" class="sort-select">
                <option value="latest">最新发布</option>
                <option value="popular">最热播放</option>
                <option value="rating">好评优先</option>
              </select>
            </div>
          </div>

          <!-- 课程卡片网格 -->
          <div v-if="selectedTeacherCourses.length > 0" class="courses-grid">
            <div v-for="course in selectedTeacherCourses" :key="course.id" class="course-card">
              <div class="course-cover">
                <img :src="course.cover" :alt="course.title" />
              </div>
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-info">
                <span class="course-teacher">{{ course.teacher }}</span>
                <span class="course-tag">{{ course.tag }}</span>
                <span class="course-duration">{{ course.duration }}</span>
              </div>
              <a href="#" class="btn primary small" @click.prevent="handleButtonClick('立即学习')">立即学习</a>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="empty-state">
            <div class="empty-icon">📚</div>
            <h3 class="empty-title">暂无课程</h3>
            <p class="empty-description">该名师暂未发布课程，敬请期待</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 Footer 区 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <img src="@/assets/logo/logo-kedo.png" alt="Kedo Logo" class="footer-logo" />
          <p class="footer-description">Kedo —— 智能边缘计算的领导者，为企业提供高效、可靠的 OPC 解决方案</p>
          <div class="footer-social">
            <span class="social-icon coming-soon-item">微信</span>
            <span class="social-icon coming-soon-item">微博</span>
            <span class="social-icon coming-soon-item">LinkedIn</span>
          </div>
        </div>
        <div class="footer-center">
          <div class="footer-column">
            <h4 class="footer-column-title">产品</h4>
            <ul class="footer-links">
              <li><a href="#/board/kedoChat" target="_blank" rel="noopener noreferrer">KedoChat</a></li>
              <li><a href="#/board/kedoKnowledgeBase" target="_blank" rel="noopener noreferrer">Kedo知识库</a></li>
              <li><a href="#/board/kedoAiFlow" target="_blank" rel="noopener noreferrer">KedoAiFlow</a></li>
              <li><a href="#/board/kedoMind" target="_blank" rel="noopener noreferrer">KedoMind</a></li>
              <li><a href="#/kedoBot-demo">KedoBot</a></li>
              <li><a href="#/board/kedoClaw" target="_blank" rel="noopener noreferrer">KedoClaw</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-column-title">解决方案</h4>
            <ul class="footer-links">
              <li><a href="#/scenarios">AI营销智能体</a></li>
              <li><a href="#/scenarios">7×24程序员</a></li>
              <li><a href="#/scenarios">老板数字助手</a></li>
              <li><span class="coming-soon-link">智能客服 <ComingSoonBadge /></span></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-column-title">资源</h4>
            <ul class="footer-links">
              <li><span class="coming-soon-link">文档中心 <ComingSoonBadge /></span></li>
              <li><span class="coming-soon-link">案例库 <ComingSoonBadge /></span></li>
              <li><span class="coming-soon-link">技术博客 <ComingSoonBadge /></span></li>
              <li><span class="coming-soon-link">API 参考 <ComingSoonBadge /></span></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-column-title">公司</h4>
            <ul class="footer-links">
              <li><span class="coming-soon-link">关于我们 <ComingSoonBadge /></span></li>
              <li><span class="coming-soon-link">联系我们 <ComingSoonBadge /></span></li>
              <li><a href="#/doc/privacyPolicy">隐私政策</a></li>
              <li><a href="#/doc/useAgreement">服务条款</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2025 Kedo. 保留所有权利</p>
      </div>
    </footer>

    <!-- 课程详情模态框 -->
    <div v-if="showCourseModal" class="course-modal-overlay" @click="showCourseModal = false">
      <div class="course-modal" @click.stop>
        <div class="course-modal-header">
          <h3 class="course-modal-title">{{ selectedCourse?.title }}</h3>
          <button class="course-modal-close" @click="showCourseModal = false">×</button>
        </div>
        <div class="course-modal-content">
          <div class="course-modal-info">
            <p class="course-modal-teacher">讲师：{{ selectedCourse?.teacher }}</p>
            <p class="course-modal-stats">
              <span>{{ selectedCourse?.views }} 次播放</span>
              <span>{{ selectedCourse?.rating }} 分</span>
            </p>
          </div>
          <div class="course-modal-description">
            <h4>课程简介</h4>
            <p>{{ selectedCourse?.description }}</p>
          </div>
        </div>
        <div class="course-modal-footer">
          <button class="btn secondary" @click="showCourseModal = false">关闭</button>
          <button class="btn primary" @click="handleButtonClick('立即学习')">立即学习</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ComingSoonBadge from '@/components/nav/ComingSoonBadge.vue'
import SiteNav from '@/components/nav/SiteNav.vue'

// 响应式变量
const showAllCourses = ref(false)
const showAllTeachers = ref(false)
const searchQuery = ref('')
const selectedCourse = ref<(Course | TopCourse) | null>(null)
const showCourseModal = ref(false)
const selectedTeacherId = ref(1)
const sortOption = ref('latest')

// 类型定义
interface Teacher {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  courseCount: number;
  studentCount: string;
}

interface Course {
  id: number;
  teacherId: number;
  title: string;
  description: string;
  cover: string;
  teacher: string;
  tag: string;
  duration: string;
  views: number;
  rating: number;
}

interface TopCourse {
  id: number;
  rank: number;
  title: string;
  teacher: string;
  cover: string;
  views: number;
  rating: number;
  description: string;
}

// 名师数据 (延迟加载)
const teachers = ref<Teacher[]>([])

// 延迟加载名师数据
const loadTeachers = () => {
  teachers.value = [
    {
      id: 1,
      name: '张教授',
      title: '| OPC 技术资深专家',
      bio: '前头部自动化品牌技术负责人，15 年自动化与数字化技术经验，主导百余个大型数字化项目 OPC 系统落地',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20male%20technical%20expert%20in%20business%20attire%2C%20confident%20expression%2C%20clean%20background&image_size=portrait_4_3',
      courseCount: 12,
      studentCount: '2w+'
    },
    {
      id: 2,
      name: '李工程师',
      title: '| 自动化系统架构师',
      bio: '专注于 OPC UA 技术研究与应用，拥有丰富的工业自动化系统设计经验，曾主导多个大型企业的数字化转型项目',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20female%20engineer%20in%20business%20attire%2C%20smart%20expression%2C%20clean%20background&image_size=portrait_4_3',
      courseCount: 8,
      studentCount: '1.5w+'
    },
    {
      id: 3,
      name: '王博士',
      title: '| 工业物联网专家',
      bio: '博士学位，专注于工业物联网与 OPC 技术的融合研究，发表多篇相关领域论文，拥有丰富的教学经验',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20an%20Asian%20male%20PhD%20in%20business%20attire%2C%20scholarly%20expression%2C%20clean%20background&image_size=portrait_4_3',
      courseCount: 15,
      studentCount: '3w+'
    },
    {
      id: 4,
      name: '赵工程师',
      title: '| OPC 安全专家',
      bio: '专注于 OPC 系统安全研究，拥有丰富的工业网络安全经验，曾为多家大型企业提供 OPC 安全解决方案',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20male%20security%20expert%20in%20business%20attire%2C%20serious%20expression%2C%20clean%20background&image_size=portrait_4_3',
      courseCount: 6,
      studentCount: '1w+'
    },
    {
      id: 5,
      name: '陈教授',
      title: '| 自动化控制专家',
      bio: '高校教授，专注于自动化控制系统与 OPC 技术的教学与研究，培养了大量自动化领域专业人才',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20middle-aged%20professor%20in%20academic%20attire%2C%20wise%20expression%2C%20clean%20background&image_size=portrait_4_3',
      courseCount: 10,
      studentCount: '2.5w+'
    }
  ]
}

// 课程数据 (延迟加载)
const courses = ref<Course[]>([])

// 延迟加载课程数据
const loadCoursesData = () => {
  courses.value = [
  {
    id: 1,
    teacherId: 1,
    title: 'OPC UA 从入门到精通全系列实战课',
    description: '全面讲解 OPC UA 技术原理与应用实践，从基础概念到高级功能，帮助你快速掌握 OPC UA 核心技能',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=OPC%20UA%20technology%20concept%20with%20digital%20interface%2C%20professional%20tech%20style%2C%20blue%20color%20scheme&image_size=landscape_4_3',
    teacher: '张教授',
    tag: '进阶',
    duration: '24 课时',
    views: 12000,
    rating: 4.9
  },
  {
    id: 2,
    teacherId: 1,
    title: 'OPC 历史与发展趋势分析',
    description: '深入解析 OPC 技术的发展历程，探讨未来趋势，帮助你把握行业技术方向',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20evolution%20timeline%20with%20OPC%20logo%2C%20professional%20tech%20style&image_size=landscape_4_3',
    teacher: '张教授',
    tag: '理论',
    duration: '8 课时',
    views: 8500,
    rating: 4.7
  },
  {
    id: 3,
    teacherId: 2,
    title: '工业自动化系统设计与 OPC 集成',
    description: '结合实际案例，讲解工业自动化系统设计方法与 OPC 技术集成方案',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20automation%20system%20control%20room%2C%20professional%20tech%20style&image_size=landscape_4_3',
    teacher: '李工程师',
    tag: '实战',
    duration: '16 课时',
    views: 9200,
    rating: 4.8
  },
  {
    id: 4,
    teacherId: 3,
    title: 'OPC UA 安全配置与最佳实践',
    description: '详细讲解 OPC UA 安全配置方法与最佳实践，确保系统安全稳定运行',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20concept%20with%20OPC%20UA%20security%20symbols%2C%20professional%20tech%20style&image_size=landscape_4_3',
    teacher: '王博士',
    tag: '进阶',
    duration: '12 课时',
    views: 7800,
    rating: 4.9
  },
  {
    id: 5,
    teacherId: 3,
    title: '工业物联网与 OPC 技术融合',
    description: '探讨工业物联网与 OPC 技术的融合应用，打造智能工厂解决方案',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20internet%20of%20things%20concept%20with%20OPC%20integration%2C%20professional%20tech%20style&image_size=landscape_4_3',
    teacher: '王博士',
    tag: '高级',
    duration: '20 课时',
    views: 10500,
    rating: 4.8
  }
  ];
};

// 热门课程 TOP 榜数据 (延迟加载)
const topCourses = ref<TopCourse[]>([])

// 延迟加载课程数据
const loadCourses = () => {
  topCourses.value = [
    {
      id: 1,
      rank: 1,
      title: 'OPC UA 从入门到精通全系列实战课',
      teacher: '张教授',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=OPC%20UA%20technology%20concept%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 12000,
      rating: 4.9,
      description: '全面讲解 OPC UA 技术原理与应用实践，从基础概念到高级功能，帮助你快速掌握 OPC UA 核心技能' 
    },
    {
      id: 2,
      rank: 2,
      title: '工业物联网与 OPC 技术融合',
      teacher: '王博士',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20IoT%20concept%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 10500,
      rating: 4.8,
      description: '探讨工业物联网与 OPC 技术的融合应用，打造智能工厂解决方案，提升企业数字化水平' 
    },
    {
      id: 3,
      rank: 3,
      title: '工业自动化系统设计与 OPC 集成',
      teacher: '李工程师',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20automation%20system%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 9200,
      rating: 4.8,
      description: '结合实际案例，讲解工业自动化系统设计方法与 OPC 技术集成方案，提升系统稳定性' 
    },
    {
      id: 4,
      rank: 4,
      title: 'OPC UA 安全配置与最佳实践',
      teacher: '王博士',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20concept%20with%20OPC%20UA%20security%20symbols%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 7800,
      rating: 4.9,
      description: '详细讲解 OPC UA 安全配置方法与最佳实践，确保系统安全稳定运行，防范潜在风险' 
    },
    {
      id: 5,
      rank: 5,
      title: 'OPC 历史与发展趋势分析',
      teacher: '张教授',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20evolution%20timeline%20with%20OPC%20logo%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 8500,
      rating: 4.7,
      description: '深入解析 OPC 技术的发展历程，探讨未来趋势，帮助你把握行业技术方向' 
    },
    {
      id: 6,
      rank: 6,
      title: 'OPC DA 与 UA 迁移指南',
      teacher: '李工程师',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20migration%20concept%20with%20OPC%20logo%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 6500,
      rating: 4.6,
      description: '详细介绍从 OPC DA 到 OPC UA 的迁移方法和注意事项，确保平滑过渡' 
    },
    {
      id: 7,
      rank: 7,
      title: 'OPC 服务器开发实战',
      teacher: '张教授',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=server%20development%20concept%20with%20code%20editor%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 7200,
      rating: 4.7,
      description: '通过实战案例，讲解 OPC 服务器开发的核心技术和实现方法，提升开发能力' 
    },
    {
      id: 8,
      rank: 8,
      title: 'OPC 客户端应用开发',
      teacher: '王博士',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=client%20application%20development%20interface%2C%20professional%20tech%20style&image_size=landscape_4_3',
      views: 6800,
      rating: 4.5,
      description: '讲解 OPC 客户端应用开发的关键技术和最佳实践，帮助你构建高效稳定的客户端应用' 
    }
  ]
}

// 计算选中的名师信息
const selectedTeacher = computed(() => {
  const foundTeacher = teachers.value.find(teacher => teacher.id === selectedTeacherId.value);
  return foundTeacher || teachers.value[0] || { name: '名师', title: '', bio: '', avatar: '', courseCount: 0, studentCount: '0' };
})

// 计算选中名师的课程
const selectedTeacherCourses = computed(() => {
  if (!courses.value || courses.value.length === 0) {
    return [];
  }
  
  let filteredCourses = courses.value.filter(course => course.teacherId === selectedTeacherId.value)
  
  // 根据排序选项排序
  switch (sortOption.value) {
    case 'latest':
      // 假设 ID 越大越新
      return filteredCourses.sort((a, b) => b.id - a.id)
    case 'popular':
      return filteredCourses.sort((a, b) => b.views - a.views)
    case 'rating':
      return filteredCourses.sort((a, b) => b.rating - a.rating)
    default:
      return filteredCourses
  }
})

// 选择名师
const selectTeacher = (teacherId: number) => {
  selectedTeacherId.value = teacherId
}

// 过滤课程
const filteredCourses = computed(() => {
  if (!topCourses.value || topCourses.value.length === 0) {
    return [];
  }
  
  let result = topCourses.value;
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.teacher.toLowerCase().includes(query)
    );
  }
  
  // 展开/收起过滤
  if (!showAllCourses.value && !searchQuery.value) {
    result = result.slice(0, 5);
  }
  
  return result;
});

// 处理按钮点击
const handleButtonClick = (name: string) => {
  if (name === '查看更多课程') {
    showAllCourses.value = !showAllCourses.value;
  } else if (name === '查看更多名师') {
    showAllTeachers.value = !showAllTeachers.value;
  }
}

// 处理课程点击
const handleCourseClick = (course: TopCourse) => {
  selectedCourse.value = course;
  showCourseModal.value = true;
}

// 处理搜索
const handleSearch = () => {
  // 搜索逻辑已在computed中处理
}

onMounted(() => {
  setTimeout(() => {
    loadCourses();
    loadTeachers();
    loadCoursesData();
  }, 100);
});
</script>

<style scoped lang="scss">
@import './community-styles.css';

/* 全局样式 */
.community-container {
  font-family: Inter, 'PingFang SC', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 30%, #e0f2fe 70%, #bae6fd 100%);
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
      linear-gradient(rgba(30, 156, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30, 156, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridMove 15s linear infinite;
    z-index: 0;
  }

  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 40px;
    }
  }
}

/* 页面头部 Banner 区 */
.banner-section {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 72px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 50%, #e0f2fe 100%);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(30, 156, 255, 0.15) 0%, rgba(13, 168, 239, 0.08) 50%, transparent 70%);
    border-radius: 50%;
    filter: blur(80px);
    animation: pulse 6s ease-in-out infinite;
  }

  .banner-content {
    max-width: 1200px;
    width: 100%;
    padding: 0 60px;
    text-align: center;
    position: relative;
    z-index: 2;

    .banner-title {
      font-size: 52px;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 24px;
      color: #1E9CFF;
      letter-spacing: -0.5px;
    }

    .banner-subtitle {
      font-size: 18px;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 40px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .banner-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      .search-box {
        position: relative;
        margin-left: 20px;

        .search-input {
          padding: 14px 20px;
          padding-right: 50px;
          border: 1px solid rgba(30, 156, 255, 0.2);
          border-radius: 10px;
          font-size: 14px;
          width: 300px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: #1E9CFF;
            box-shadow: 0 0 0 3px rgba(30, 156, 255, 0.1);
          }

          &::placeholder {
            color: #9ca3af;
          }
        }

        .search-button {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;

          &:hover {
            background: linear-gradient(135deg, #0DA8EF, #1E9CFF);
            transform: translateY(-50%) scale(1.05);
          }
        }
      }
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.9;
    }
  }
}

/* 核心主体区 */
.main-section {
  padding: 80px 40px;
  position: relative;
  z-index: 1;
  background: white;

  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 60px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    /* 左侧名师卡片列表区 */
    .teachers-sidebar {
      .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;

        .sidebar-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0;
        }

        .view-more-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #1E9CFF;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            color: #0DA8EF;
            transform: translateY(-1px);
          }
        }
      }

      .teachers-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 800px;
        overflow-y: auto;
        padding-right: 10px;

        .teacher-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(30, 156, 255, 0.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          cursor: pointer;

          &:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(30, 156, 255, 0.15);
            border-color: rgba(30, 156, 255, 0.3);
          }

          &.active {
            border-color: #1E9CFF;
            box-shadow: 0 8px 24px rgba(30, 156, 255, 0.2);

            .teacher-avatar {
              border-color: #1E9CFF;
            }
          }

          .teacher-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 16px;
            border: 3px solid rgba(30, 156, 255, 0.1);
            transition: all 0.3s ease;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .teacher-name {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            text-align: center;
            margin-bottom: 12px;

            .teacher-title {
              font-size: 14px;
              font-weight: 400;
              color: #6b7280;
            }
          }

          .teacher-bio {
            font-size: 14px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 16px;
            text-align: center;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .teacher-stats {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: #6b7280;

            .stat-divider {
              color: #d1d5db;
            }
          }
        }
      }
    }

    /* 右侧课程展示区 */
    .courses-section {
      .courses-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;

        .courses-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
        }

        .courses-filter {
          display: flex;
          align-items: center;
          gap: 12px;

          label {
            font-size: 14px;
            color: #4a5568;
            font-weight: 500;
          }

          .sort-select {
            padding: 8px 16px;
            border: 1px solid rgba(30, 156, 255, 0.2);
            border-radius: 8px;
            font-size: 14px;
            color: #1f2937;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              border-color: #1E9CFF;
              box-shadow: 0 0 0 3px rgba(30, 156, 255, 0.1);
            }
          }
        }
      }

      /* 课程卡片网格 */
      .courses-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;

        @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .course-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(30, 156, 255, 0.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;

          &:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(30, 156, 255, 0.15);
            border-color: rgba(30, 156, 255, 0.3);
          }

          .course-cover {
            width: 100%;
            height: 160px;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 16px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .course-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .course-description {
            font-size: 14px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .course-info {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            flex-wrap: wrap;

            .course-teacher {
              font-size: 13px;
              color: #6b7280;
            }

            .course-tag {
              font-size: 12px;
              padding: 4px 8px;
              background: rgba(30, 156, 255, 0.1);
              color: #1E9CFF;
              border-radius: 4px;
              font-weight: 500;
            }

            .course-duration {
              font-size: 13px;
              color: #6b7280;
            }
          }

          .btn.small {
            width: 100%;
            text-align: center;
            padding: 10px 20px;
            font-size: 14px;
          }
        }
      }

      /* 空状态 */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 0;
        text-align: center;

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .empty-description {
          font-size: 14px;
          color: #6b7280;
        }
      }
    }
  }
}

/* 热门课程 TOP 榜 */
.top-courses-section {
    padding: 80px 40px;
    position: relative;
    z-index: 1;
    background: #f8fafc;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      flex-wrap: wrap;
      gap: 20px;

      .section-title {
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        flex: 1;
      }

      .search-container {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        max-width: 400px;

        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: #1E9CFF;
            box-shadow: 0 0 0 3px rgba(30, 156, 255, 0.1);
          }
        }

        .search-btn {
          padding: 10px 16px;
          background: #1E9CFF;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: #0DA8EF;
            transform: translateY(-1px);
          }
        }
      }

      .view-more-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #1E9CFF;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          color: #0DA8EF;
          transform: translateY(-1px);
        }
      }
    }

  .top-courses-grid {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 32px;

    .top-course-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(30, 156, 255, 0.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.4s ease;
      display: flex;
      align-items: center;
      gap: 16px;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 32px rgba(30, 156, 255, 0.15);
        border-color: rgba(30, 156, 255, 0.3);
      }

      .course-rank {
        font-size: 24px;
        font-weight: 800;
        color: #1E9CFF;
        min-width: 40px;
        text-align: center;
      }

      .course-cover.small {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .course-info {
        flex: 1;

        .course-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-teacher {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .course-stats {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #9ca3af;

          .stat-item {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

/* 按钮样式 */
.btn {
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
    color: white;
    box-shadow: 0 4px 15px rgba(30, 156, 255, 0.3);

    &:hover {
      background: linear-gradient(135deg, #0DA8EF, #1E9CFF);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30, 156, 255, 0.4);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }
  }

  &.secondary {
    background: rgba(26, 26, 46, 0.8);
    color: #1E9CFF;
    border: 1px solid rgba(30, 156, 255, 0.5);
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: #1E9CFF;
      box-shadow: 0 4px 15px rgba(30, 156, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

/* 底部 Footer 区 */
.footer {
  background: white;
  border-top: 1px solid rgba(30, 156, 255, 0.1);
  padding: 60px 40px 30px;
  position: relative;
  z-index: 1;

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 80px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 40px;
    }

    .footer-left {
      flex: 1;
      max-width: 400px;

      .footer-logo {
        height: 36px;
        margin-bottom: 24px;
      }

      .footer-description {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 24px;
      }

      .footer-social {
        display: flex;
        gap: 16px;

        .social-icon {
          font-size: 14px;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            color: #1E9CFF;
            transform: translateY(-2px);
          }
        }
      }
    }

    .footer-center {
      flex: 2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      .footer-column {
        .footer-column-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            margin-bottom: 12px;

            a {
              font-size: 14px;
              color: #6b7280;
              text-decoration: none;
              transition: all 0.3s ease;

              &:hover {
                color: #1E9CFF;
                padding-left: 4px;
              }
            }
          }
        }
      }
    }
  }

  .footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 30px;
    border-top: 1px solid rgba(30, 156, 255, 0.1);
    text-align: center;

    p {
      font-size: 14px;
      color: #9ca3af;
      margin: 0;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-section {
    height: auto;
    padding: 60px 20px;

    .banner-content {
      padding: 0 20px;

      .banner-title {
        font-size: 36px;
      }

      .banner-actions {
        flex-direction: column;
        align-items: stretch;

        .search-box {
          margin-left: 0;
          margin-top: 20px;

          .search-input {
            width: 100%;
          }
        }
      }
    }
  }

  .main-section {
    padding: 60px 20px;

    .main-content {
      gap: 40px;
    }
  }

  .top-courses-section {
    padding: 60px 20px;
  }

  .footer {
    padding: 40px 20px 20px;
  }
}
</style>