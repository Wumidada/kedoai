<template>
  <div class="download-page">
    <!-- Logo -->
    <div class="logo-container">
      <img :src="logoKedo" alt="Kedo Logo" class="logo" @click="goHome" />
    </div>

    <!-- Hero Section -->
    <div class="hero column">
      <h1 class="hero-title-text">让工作更加智能化和高效</h1>
      <div class="subtitle">Kedo Mind 客户端</div>
      <!-- <a-button
        type="primary"
        class="hero-btn"
        @click="download('/Onion Chat-Word.rar', 'Onion Chat-Word.rar')"
      >
        立即下载
      </a-button> -->
    </div>

    <img :src="bar" class="separator" />

    <!-- 扫码加群提示 -->
    <div class="qr-section">
      <a-popover :trigger="['hover', 'click']" placement="left">
        <template #content>
          <div class="qr-popover-content">
            <img
              :src="wxQr"
              alt="扫码加群获取激活码"
              class="qr-popover-image"
            />
          </div>
        </template>
        <div class="qr-popover-text">
          <QuestionCircleFilled />
          <span> 扫码加群获取激活码 </span>
        </div>
      </a-popover>
    </div>

    <!-- 下载卡片容器 -->
    <div class="download-cards-container">
      <!-- 卡片列表 -->
      <div class="download-cards">
        <div
          v-for="card in downloadList"
          :key="`download-${card.platform}`"
          class="download-card"
        >
          <a-spin :spinning="card.loading">
            <div class="card-content">
              <!-- 平台图标 -->
              <img
                :src="card.icon"
                class="card-icon"
                :alt="card.platform"
              />
              
              <!-- 平台名称 -->
              <h3 class="card-title">{{ card.platform }}</h3>
              
              <!-- 架构选择 -->
              <div class="arch-switch">
                <span
                  v-for="(child, idx) in card.children"
                  :key="child.architecture"
                  :class="[
                    'arch-pill',
                    { active: idx === card.selectedChildIndex },
                  ]"
                  @click="card.selectedChildIndex = idx"
                  >{{ child.architecture }}</span
                >
              </div>
              
              <!-- 版本描述 -->
              <a-typography-paragraph
                class="card-desc"
                :ellipsis="{
                  rows: 3,
                  tooltip: formatDescription(
                    card.children[card.selectedChildIndex]?.desc || ''
                  ),
                }"
                :content="
                  formatDescription(
                    card.children[card.selectedChildIndex]?.desc || ''
                  )
                "
              >
              </a-typography-paragraph>
              
              <!-- 底部按钮 -->
              <div class="card-footer">
                <div v-if="card.children[card.selectedChildIndex]?.url" class="card-actions">
                  <button
                    class="card-btn"
                    @click="
                      download(
                        card.children[card.selectedChildIndex]?.url,
                        card.platform +
                          ' ' +
                          (card.children[card.selectedChildIndex]
                            ?.architecture || '') +
                          ' ' +
                          (card.children[card.selectedChildIndex]?.version ||
                            '')
                      )
                    "
                  >
                    立即下载
                  </button>
                  <span class="card-version">
                    v{{ card.children[card.selectedChildIndex]?.version }}
                  </span>
                </div>
                <div v-else class="card-actions">
                  <button class="card-btn disabled">
                    开发中
                  </button>
                </div>
              </div>
            </div>
          </a-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Atropos from "atropos";

// 图片资源
import bar from "@/assets/images/bar.png";
import logoKedo from "@/assets/logo/logo-kedo.png";
import windowsSvg from "@/assets/images/windows.svg";
import macosSvg from "@/assets/images/macos.svg";
import linuxSvg from "@/assets/images/linux.svg";
import wxQr from "@/assets/images/wx.jpg";
import { useRouter } from "vue-router";
import { awaitWrapper, getLatestVersion } from "@/api";
import { QuestionCircleFilled } from "@ant-design/icons-vue";
const router = useRouter();
const downloadList = ref([
  {
    loading: false,
    icon: windowsSvg,
    platform: "Windows",
    selectedChildIndex: 0,
    children: [
      {
        architecture: "x64",
        version: "1.0.0",
        desc: "Windows 64位版本，支持Windows 10及以上系统",
        url: "#",
      },
    ],
  },
  {
    loading: false,
    icon: macosSvg,
    platform: "MacOS",
    selectedChildIndex: 0,
    children: [
      {
        architecture: "x64",
        version: "",
        desc: "MacOS 64位版本，支持macOS 10.15及以上系统",
        url: "",
      },
      {
        architecture: "arm64",
        version: "",
        desc: "MacOS ARM64版本，支持M系列芯片",
        url: "",
      },
    ],
  },
  {
    loading: false,
    icon: linuxSvg,
    platform: "Linux",
    selectedChildIndex: 0,
    children: [
      {
        architecture: "x64",
        version: "1.0.0",
        desc: "Linux 64位版本，支持主流Linux发行版",
        url: "#",
      },
      {
        architecture: "arm64",
        version: "1.0.0",
        desc: "Linux ARM64版本，支持ARM架构设备",
        url: "#",
      },
      {
        architecture: "armv7l",
        version: "1.0.0",
        desc: "Linux ARMv7版本，支持树莓派等设备",
        url: "#",
      },
    ],
  },
]);

const goHome = () => {
  router.push("/");
};

// Atropos 实例管理
const atroposRefs = ref<{ [key: string]: HTMLElement | null }>({});
let atroposInstances: { [key: string]: any } = {};

const getLatestVersionByPlatformAndArchitecture = async (
  platform,
  architecture
) => {
  const parent = downloadList.value.find((item) => item.platform === platform);
  if (!parent) return;
  parent.loading = true;
  const [err, response] = await awaitWrapper(
    getLatestVersion({
      platform: platform,
      architecture: architecture,
      currentVersion: "1.0.0",
    })
  );
  parent.loading = false;
  if (err) {
    console.error(`获取${platform} ${architecture}最新版本失败:`, err);
    return;
  }
  const resData = response.data.data;
  const child = parent.children.find((c) => c.architecture === architecture);
  if (!child) return;
  child.version = resData.latestVersion;
  child.desc = resData.updateDescription;
  child.url = resData.downloadUrl;
};

onMounted(async () => {
  // 初始化每个卡片的 Atropos
  await nextTick();
  downloadList.value.forEach(async (card) => {
    card.children.forEach(async (child) => {
      await getLatestVersionByPlatformAndArchitecture(
        card.platform,
        child.architecture
      );
    });
  });
});

onBeforeUnmount(() => {
  Object.values(atroposInstances).forEach((instance) => {
    if (instance && typeof instance.destroy === "function") instance.destroy();
  });
  atroposInstances = {};
});

// 格式化描述文本，将换行符转换为真正的换行符
function formatDescription(desc: string) {
  if (!desc) return "";
  return desc.replace(/\\n/g, "\n");
}

// 格式化描述文本用于Tooltip，将换行符转换为HTML <br> 标签
function formatDescriptionForTooltip(desc: string) {
  if (!desc) return "";
  return desc.replace(/\\n/g, "<br>");
}

// 下载函数
function download(url: string, filename?: string) {
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  if (filename) link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="scss" scoped>
.download-page {
  overflow-y: auto;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  position: relative;
  background-color: #f9fafb;
  padding-bottom: 60px;
}

/* Logo */
.logo-container {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1000;

  .logo {
    height: 40px;
    width: auto;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hero Section */
.hero {
  width: 100%;
  max-width: 1200px;
  height: 322px;
  background: linear-gradient(135deg, #f5fbff 0%, #eef7ff 100%);
  box-shadow: 0 10px 30px rgba(13, 168, 239, 0.08);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40px;
  padding: 0 20px;
  text-align: center;
  margin-top: 80px;
}

.hero-title-text {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  background: linear-gradient(90deg, #1e9cff 0%, #0da8ef 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  user-select: none;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 20px;
  color: #6b7280;
  margin-bottom: 30px;
}

/* Separator */
.separator {
  width: 100%;
  max-width: 1200px;
  height: 78px;
  margin: 0 auto;
  display: block;
}

/* 扫码加群提示 */
.qr-section {
  position: relative;
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 0 20px;
  text-align: right;
}

.qr-popover-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #1e9cff;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0da8ef;
  }
}

.qr-popover-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

/* 下载卡片容器 */
.download-cards-container {
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1240px; /* 1200px + 20px padding on each side */
}

/* 下载卡片列表 - 使用Flexbox布局 */
.download-cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  flex-wrap: wrap;
}

/* 下载卡片 */
.download-card {
  flex: 1 1 300px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 300px */
  background: #ffffff;
  border: 1px solid rgba(13, 168, 239, 0.18);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(13, 168, 239, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(13, 168, 239, 0.15);
  }
}

/* 卡片内容 */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 28px;
  min-height: 400px;
}

/* 卡片图标 */
.card-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  object-fit: contain;
}

/* 卡片标题 */
.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  text-align: center;
}

/* 架构选择 */
.arch-switch {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.arch-pill {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(13, 168, 239, 0.25);
  cursor: pointer;
  font-size: 14px;
  color: #0da8ef;
  user-select: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(13, 168, 239, 0.1);
  }
  
  &.active {
    background: linear-gradient(135deg, #1e9cff, #0da8ef);
    color: #fff;
    border-color: transparent;
  }
}

/* 卡片描述 */
.card-desc {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
  display: flex;
  align-items: center;
}

/* 卡片底部 */
.card-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}

/* 卡片操作区 */
.card-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* 卡片按钮 */
.card-btn {
  width: 200px;
  height: 52px;
  background: linear-gradient(135deg, #1e9cff, #0da8ef);
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 156, 255, 0.3);
  
  &:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 156, 255, 0.4);
  }
  
  &:active:not(.disabled) {
    transform: translateY(0);
  }
  
  &.disabled {
    background: #e5e7eb;
    color: #6b7280;
    cursor: not-allowed;
    box-shadow: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

/* 版本号 */
.card-version {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
}

/* 响应式设计 */

/* 桌面端（≥1200px）：3列布局 */
@media (min-width: 1200px) {
  .download-cards {
    gap: 24px;
  }
  
  .download-card {
    flex-basis: calc(33.333% - 16px); /* 3列布局，考虑gap */
    max-width: calc(33.333% - 16px);
  }
}

/* 平板端（768px-1199px）：2列布局 */
@media (min-width: 768px) and (max-width: 1199px) {
  .download-cards {
    gap: 20px;
  }
  
  .download-card {
    flex-basis: calc(50% - 10px); /* 2列布局，考虑gap */
    max-width: calc(50% - 10px);
    min-width: 280px;
  }
  
  .hero-title-text {
    font-size: 48px;
  }
}

/* 移动端（<768px）：1列布局 */
@media (max-width: 767px) {
  .download-cards {
    gap: 20px;
  }
  
  .download-card {
    flex-basis: 100%;
    max-width: 100%;
    min-width: 260px;
  }
  
  .hero {
    height: 280px;
    margin-top: 70px;
  }
  
  .hero-title-text {
    font-size: 36px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .card-content {
    padding: 24px 20px 24px;
    min-height: 360px;
  }
  
  .card-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }
  
  .card-title {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  .card-btn {
    width: 180px;
    height: 48px;
    font-size: 15px;
  }
  
  .qr-section {
    text-align: center;
    margin-bottom: 16px;
  }
  
  .logo-container {
    top: 16px;
    left: 16px;
    
    .logo {
      height: 32px;
    }
  }
}
</style>