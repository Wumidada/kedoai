<template>
  <header class="site-nav" :class="{ 'is-scrolled': isScrolled }">
    <div class="site-nav-content">
      <div class="site-nav-left">
        <a href="/" @click.prevent="goHome">
          <img
            src="@/assets/logo/logo-kedo.png"
            alt="Kedo Logo"
            class="site-nav-logo"
            loading="lazy"
          />
        </a>
      </div>

      <nav class="site-nav-right">
        <a
          v-for="item in primaryLinks"
          :key="item.key"
          :href="item.path"
          class="site-nav-item"
          :class="{ 'is-active': isPrimaryActive(item.key) }"
          @click.prevent="handlePrimaryClick(item)"
        >
          {{ item.name }}
        </a>

        <!-- 产品中心 -->
        <div
          class="site-nav-dropdown"
          @mouseleave="closeDropdown"
        >
          <button
            type="button"
            class="site-nav-item site-nav-dropdown-toggle"
            :class="{ 'is-open': openDropdownKey === 'product' }"
            @click.stop="toggleDropdown('product')"
          >
            产品中心
            <span class="site-nav-dropdown-icon">▼</span>
          </button>
          <div
            class="site-nav-dropdown-menu"
            :class="{ 'is-open': openDropdownKey === 'product' }"
          >
            <template v-for="item in products" :key="item.title">
              <span v-if="item.comingSoon" class="site-nav-dropdown-item coming-soon-item">
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }} <ComingSoonBadge /></span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </span>
              <a
                v-else
                :href="item.href"
                class="site-nav-dropdown-item"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
              >
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }}</span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </a>
            </template>
          </div>
        </div>

        <!-- 解决方案 -->
        <div class="site-nav-dropdown" @mouseleave="closeDropdown">
          <button
            type="button"
            class="site-nav-item site-nav-dropdown-toggle"
            :class="{ 'is-open': openDropdownKey === 'solution' }"
            @click.stop="toggleDropdown('solution')"
          >
            解决方案
            <span class="site-nav-dropdown-icon">▼</span>
          </button>
          <div
            class="site-nav-dropdown-menu"
            :class="{ 'is-open': openDropdownKey === 'solution' }"
          >
            <template v-for="item in solutions" :key="item.title">
              <span v-if="item.comingSoon" class="site-nav-dropdown-item coming-soon-item">
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }} <ComingSoonBadge /></span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </span>
              <a
                v-else
                :href="item.href"
                class="site-nav-dropdown-item"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
              >
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }}</span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </a>
            </template>
          </div>
        </div>

        <!-- 资源中心 -->
        <div class="site-nav-dropdown" @mouseleave="closeDropdown">
          <button
            type="button"
            class="site-nav-item site-nav-dropdown-toggle"
            :class="{ 'is-open': openDropdownKey === 'resource' }"
            @click.stop="toggleDropdown('resource')"
          >
            资源中心
            <span class="site-nav-dropdown-icon">▼</span>
          </button>
          <div
            class="site-nav-dropdown-menu"
            :class="{ 'is-open': openDropdownKey === 'resource' }"
          >
            <template v-for="item in resources" :key="item.title">
              <span v-if="item.comingSoon" class="site-nav-dropdown-item coming-soon-item">
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }} <ComingSoonBadge /></span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </span>
              <a
                v-else
                :href="item.href"
                class="site-nav-dropdown-item"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
              >
                <NavMenuIcon v-if="item.icon" :name="item.icon" />
                <div class="site-nav-item-info">
                  <span class="site-nav-item-title">{{ item.title }}</span>
                  <span v-if="item.desc" class="site-nav-item-desc">{{ item.desc }}</span>
                </div>
              </a>
            </template>
          </div>
        </div>

        <a
          href="/#/community"
          class="site-nav-item"
          :class="{ 'is-active': activeKey === 'community' }"
          @click.prevent="goCommunity"
        >
          OPC社区
        </a>

        <span class="site-nav-item coming-soon-nav">帮助中心</span>
        <span class="site-nav-item coming-soon-nav">关于我们</span>

        <a
          href="#/board/orders"
          class="site-nav-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          我的订单
        </a>

        <template v-if="!isLoggedIn">
          <a href="/#/login/wechat" class="site-nav-button login">登录</a>
        </template>
        <template v-else>
          <a-dropdown>
            <a-avatar
              :src="userAvatar"
              :icon="!userAvatar ? h(UserOutlined) : undefined"
              class="site-nav-avatar"
            />
            <template #overlay>
              <a-menu @click="handleUserMenuClick">
                <a-menu-item key="profile" disabled>
                  <UserOutlined />
                  个人设置
                  <ComingSoonBadge />
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </nav>

      <button
        type="button"
        class="site-nav-mobile-btn"
        aria-label="打开菜单"
        @click="toggleMobileMenu"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div class="site-nav-mobile-panel" :class="{ 'is-open': isMobileMenuOpen }">
      <div class="site-nav-mobile-inner">
        <a
          v-for="item in primaryLinks"
          :key="item.key"
          href="#"
          class="site-nav-mobile-link"
          @click.prevent="handlePrimaryClick(item)"
        >
          {{ item.name }}
        </a>

        <div class="site-nav-mobile-section">
          <div class="site-nav-mobile-section-title">产品中心</div>
          <template v-for="item in products" :key="item.title">
            <a
              v-if="!item.comingSoon"
              :href="item.href"
              class="site-nav-mobile-link sub"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
            >
              {{ item.title }}
            </a>
            <span v-else class="site-nav-mobile-link sub coming-soon-item">
              {{ item.title }} <ComingSoonBadge />
            </span>
          </template>
        </div>

        <div class="site-nav-mobile-section">
          <div class="site-nav-mobile-section-title">解决方案</div>
          <a
            v-for="item in solutions"
            :key="item.title"
            :href="item.href"
            class="site-nav-mobile-link sub"
          >
            {{ item.title }}
          </a>
        </div>

        <div class="site-nav-mobile-section">
          <div class="site-nav-mobile-section-title">资源中心</div>
          <span
            v-for="item in resources"
            :key="item.title"
            class="site-nav-mobile-link sub coming-soon-item"
          >
            {{ item.title }} <ComingSoonBadge />
          </span>
        </div>

        <a href="/#/community" class="site-nav-mobile-link" @click.prevent="goCommunity">
          OPC社区
        </a>
        <span class="site-nav-mobile-link coming-soon-item">帮助中心</span>
        <span class="site-nav-mobile-link coming-soon-item">关于我们</span>

        <div class="site-nav-mobile-section">
          <div class="site-nav-mobile-section-title">我的</div>
          <a
            href="#/board/orders"
            class="site-nav-mobile-link sub"
            target="_blank"
            rel="noopener noreferrer"
          >
            我的订单
          </a>
        </div>

        <div v-if="!isLoggedIn" class="site-nav-mobile-actions">
          <a href="/#/login/wechat" class="site-nav-mobile-action login">登录</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/user'
import { useStorage } from '@/hooks/useStorage'
import NavMenuIcon from '@/components/nav/NavMenuIcon.vue'
import ComingSoonBadge from '@/components/nav/ComingSoonBadge.vue'
import {
  SITE_NAV_PRIMARY_LINKS,
  SITE_NAV_PRODUCTS,
  SITE_NAV_SOLUTIONS,
  SITE_NAV_RESOURCES,
  type SiteNavActiveKey,
  type SiteNavPrimaryLink,
} from '@/config/siteNav'

const props = defineProps<{
  activeKey?: SiteNavActiveKey
}>()

const router = useRouter()
const userStore = useUserStore()
const storage = useStorage()

const primaryLinks = SITE_NAV_PRIMARY_LINKS
const products = SITE_NAV_PRODUCTS
const solutions = SITE_NAV_SOLUTIONS
const resources = SITE_NAV_RESOURCES

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const openDropdownKey = ref<string | null>(null)

const userAvatar = computed(() => userStore.getUserAvatar)
const isLoggedIn = computed(() => !!userStore.getUserId)

const isPrimaryActive = (key: string) => props.activeKey === key

const goHome = () => {
  router.push('/')
}

const goCommunity = () => {
  isMobileMenuOpen.value = false
  router.push('/community')
}

const handlePrimaryClick = (item: SiteNavPrimaryLink) => {
  isMobileMenuOpen.value = false
  if (item.external) {
    window.open(item.path, '_blank', 'noopener,noreferrer')
    return
  }
  router.push(item.path)
}

const toggleDropdown = (key: string) => {
  openDropdownKey.value = openDropdownKey.value === key ? null : key
}

const closeDropdown = () => {
  openDropdownKey.value = null
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleDocumentClick = () => {
  openDropdownKey.value = null
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleUserMenuClick = ({ key }: { key: string }) => {
  if (key === 'logout') {
    handleLogout()
  }
}

const handleLogout = () => {
  Modal.confirm({
    title: '确认退出登录',
    content: '您确定要退出登录吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      try {
        storage.clearAll()
        userStore.clearUserInfo()
        sessionStorage.clear()
        message.success('退出登录成功')
        router.replace('/')
      } catch (error) {
        console.error('退出登录失败:', error)
        message.error('退出登录失败')
      }
    },
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleDocumentClick)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style lang="scss">
@import '@/styles/site-nav.scss';
</style>
