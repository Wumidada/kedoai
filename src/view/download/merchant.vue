<template>
  <div class="download-page">
    <!-- Logo -->
    <div class="logo-container">
      <img :src="logoKedo" alt="Kedo Logo" class="logo" @click="goHome" />
    </div>

    <!-- Hero Section -->
    <div class="hero column">
      <div style="height: 124.08px"></div>
      <h1 class="hero-title-text">商家管理，轻松高效</h1>
      <div class="subtitle">Kedo 商家版客户端</div>
    </div>

    <img :src="bar" class="separator" />

    <div class="column cards">
      <a-popover :trigger="['hover', 'click']" placement="left">
        <template #content>
          <div class="qr-popover-content">
            <img
              :src="merchantQr"
              alt="扫码下载商家版APP"
              class="qr-popover-image"
            />
            <div class="qr-popover-tip">扫码下载商家版APP</div>
          </div>
        </template>
        <div class="qr-popover-text">
          <QuestionCircleFilled />
          <span> 扫码下载商家版APP </span>
        </div>
      </a-popover>
      <div
        v-for="card in downloadList"
        :key="`atropos-${card.platform}`"
        class="atropos"
        :ref="(el) => atroposRefs[card.platform] = el as HTMLElement | null"
      >
        <a-spin :spinning="card.loading">
          <div class="atropos-scale">
            <div class="atropos-rotate">
              <div class="atropos-inner">
                <div class="card-box column">
                  <img
                    :src="card.icon"
                    class="card-icon"
                    data-atropos-offset="5"
                  />
                  <div class="card-title" data-atropos-offset="5">
                    {{ card.platform }}
                  </div>
                  <div class="arch-switch" data-atropos-offset="5">
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
                    data-atropos-offset="5"
                  >
                  </a-typography-paragraph>
                  <div
                    class="card-footer"
                    data-atropos-offset="5"
                    v-if="card.children[card.selectedChildIndex]?.url"
                  >
                    <div
                      class="card-btn crossCenter"
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
                    </div>
                    <span class="card-footer-version">
                      v{{ card.children[card.selectedChildIndex]?.version }}
                    </span>
                  </div>
                  <div v-else class="card-badge crossCenter">待开发中</div>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
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
import { useRouter } from "vue-router";
import { awaitWrapper, getLatestVersion } from "@/api";
import { QuestionCircleFilled } from "@ant-design/icons-vue";
const router = useRouter();

// 商家版APP二维码
const merchantQr = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20for%20Kedo%20merchant%20app%20download&image_size=square';

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
        desc: "Kedo商家版客户端，专为商家设计，提供订单管理、物流管理等功能。\n\n功能特点：\n• 订单管理：查看和处理所有订单\n• 物流管理：填写物流信息并发货\n• 客户管理：查看客户信息\n• 数据统计：查看销售数据",
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
        version: "1.0.0",
        desc: "Kedo商家版客户端，专为商家设计，提供订单管理、物流管理等功能。\n\n功能特点：\n• 订单管理：查看和处理所有订单\n• 物流管理：填写物流信息并发货\n• 客户管理：查看客户信息\n• 数据统计：查看销售数据",
        url: "#",
      },
      {
        architecture: "arm64",
        version: "1.0.0",
        desc: "Kedo商家版客户端，专为商家设计，提供订单管理、物流管理等功能。\n\n功能特点：\n• 订单管理：查看和处理所有订单\n• 物流管理：填写物流信息并发货\n• 客户管理：查看客户信息\n• 数据统计：查看销售数据",
        url: "#",
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
        desc: "Kedo商家版客户端，专为商家设计，提供订单管理、物流管理等功能。\n\n功能特点：\n• 订单管理：查看和处理所有订单\n• 物流管理：填写物流信息并发货\n• 客户管理：查看客户信息\n• 数据统计：查看销售数据",
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

onMounted(async () => {
  // 初始化每个卡片的 Atropos
  await nextTick();
  downloadList.value.forEach(async (card) => {
    const el = atroposRefs.value[card.platform];
    if (el) {
      atroposInstances[card.platform] = Atropos({
        el,
        eventsEl: el.querySelector(".atropos-inner") as HTMLElement,
        shadow: false,
        shadowScale: 0.9,
        highlight: false,
        rotateTouch: false,
      });
    }
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
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  position: relative;
}

/* Logo */
.logo-container {
  position: fixed;
  top: 24px;
  left: 24px;

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

.crossCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Hero Section */
.hero {
  width: 100%;
  height: 322px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.08);
  border-radius: 16px;
  align-items: center;
  justify-content: flex-start;
}

.hero-title-text {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  user-select: none;
}

.subtitle {
  font-size: 20px;
  color: #6b7280;
  margin-top: 33.22px;
  margin-bottom: 81px;
}

/* Separator */
.separator {
  width: 100%;
  height: 78px;
}

/* Cards Container */
.cards {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;
  margin: -30px 50px 50px 50px;
}

/* Card Base */
.card-box {
  background: #ffffff;
  border: 1px solid rgba(34, 197, 94, 0.18);
  border-radius: 20px;
  align-items: center;
  padding: 28px 28px 24px;
  height: 420px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  margin-top: 16px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 3;
}

.card-desc {
  font-size: 14px;
  text-align: left;
  color: #6b7280;
  margin-top: 12px;
  line-height: 1.8;
  width: 100%;
  z-index: 2;
  white-space: pre-line;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &-version {
    font-size: 14px;
    color: #6b7280;
    margin-top: 10px;
  }
}
.card-btn {
  width: 200px;
  height: 52px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-top: auto;
  cursor: pointer;
  z-index: 999;

  box-shadow: 0 8px 18px rgba(34, 197, 94, 0.35);
}

.card-badge {
  width: 120px;
  height: 38px;
  margin-bottom: 24px;
  border-radius: 999px;
  background: #eef2f7;
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
  margin-top: auto;
}

.arch-switch {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.arch-pill {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.25);
  cursor: pointer;
  font-size: 12px;
  color: #16a34a;
  user-select: none;
}

.arch-pill.active {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  border-color: transparent;
}

/* Icon */
.card-icon {
  width: 76px;
  height: 76px;
  margin-top: 8px;
}

/* QR Popover */
.qr-popover-text {
  position: absolute;
  right: 0;
  top: -30px;
  z-index: 999;
  color: #16a34a;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
}

.qr-popover-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}
.qr-popover-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title-text {
    font-size: 38px;
  }
  .subtitle {
    font-size: 16px;
    margin-top: 16px;
  }
  .cards {
    margin-top: 40px;
    margin-bottom: 120px;
  }
  .card-box {
    width: 90%;
    padding: 24px 20px 20px;
  }
  .card-title {
    font-size: 22px;
  }
  .card-desc {
    font-size: 13px;
  }
  .card-btn {
    width: 180px;
    height: 48px;
    font-size: 16px;
  }
}
</style>