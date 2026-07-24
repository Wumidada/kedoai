<!--  -->
<template>
  <div class="login-layout">
    <!-- 语言切换器 - 左上角 -->
    <div class="login-layout-top">
      <div class="language-switcher-container">
        <LanguageSwitcher />
      </div>
    </div>

    <!-- 左侧品牌展示区 -->
    <div class="brand-section">
      <div class="brand-content">
        <img src="@/assets/logo/logo-kedo.png" alt="KEDO" class="brand-logo" />
        <div class="brand-slogan">
          <span class="gradient-text">{{ displayedText }}</span>
        </div>
        <div class="brand-desc">{{ $t("brand.companyName") }}</div>
        <!-- 下载按钮 - 右上角 -->

        <a-button
          class="download-button"
          type="primary"
          size="large"
          @click="goToDownload"
        > 
          个人版本免费下载
        </a-button>
      </div>
    </div>

    <!-- 右侧登录表单区 -->
    <div class="form-section">
      <div class="form-blur-bg"></div>
      <div class="form-container">
        <slot />
      </div>
    </div>

    <!-- 底部备案信息 -->
    <div class="footer-beian" @click="openBeian">
      {{ $t("brand.companyInfo") }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { DownloadOutlined } from "@ant-design/icons-vue";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const { t } = useI18n();
const router = useRouter();

// 打字机动画实现
const displayedText = ref("");
let typewriterTimer: number | null = null;

function startTypewriter(text: string) {
  displayedText.value = "";
  let i = 0;
  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterTimer = window.setInterval(() => {
    displayedText.value = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(typewriterTimer!);
      typewriterTimer = null;
    }
  }, 80);
}

const goToDownload = () => {
  window.open("/#/download", "_blank");
};
onMounted(() => {
  startTypewriter(t("brand.slogan"));
});

watch(
  () => t("brand.slogan"),
  (val) => {
    startTypewriter(val);
  }
);

const openBeian = () => {
  window.open("https://beian.miit.gov.cn");
};
</script>

<style lang="scss" scoped>
.login-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    rgba(236, 228, 255, 0.5),
    #ffffff 21%,
    #ffffff 49%,
    rgba(255, 255, 255, 0.72) 78%,
    rgba(222, 238, 255, 0.5)
  );
  overflow: hidden;
  position: relative;
  &-top {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 1000;
    display: flex;
    gap: 8px;
    align-items: center;
  }
}

.brand-section {
  margin-left: 6%;
  min-width: 450px;
  max-width: 800px;
  width: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .brand-content {
    .brand-logo {
      width: 241px;
      height: 80px;
    }

    .brand-slogan {
      font-size: 46px;
      color: #000000;
      margin-top: 20px;
      display: flex;

      .gradient-text {
        font-weight: 550;
        background: linear-gradient(
          90deg,
          #1ed7ff 0%,
          #3e50e6 50%,
          #0009e1 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        white-space: normal;
        word-break: break-word;
        overflow: hidden;
        text-align: left;
      }
    }

    .brand-desc {
      font-size: 20px;
      color: #808080;
      margin-top: 10px;
      line-height: 1.4;
      word-break: break-word;
      white-space: pre-line;
    }
    .download-button {
      padding: 12px 16px;
      height: auto;
      margin-top: 20px;
      font-weight: 550;
      // background-color: #1E9CFF;
    }
  }
}

.form-section {
  position: relative;
  width: 480px;
  min-height: 620px;
  margin-right: 12%;
  display: flex;
  align-items: center;
  padding-left: 41.64px;
  box-sizing: border-box;
  flex-shrink: 0;

  .form-blur-bg {
    position: absolute;
    opacity: 0.2;
    background: linear-gradient(181deg, #2affdb 0%, #533aff 100%);
    filter: blur(50px);
    z-index: 0;
    left: 80px;
    top: 140px;
    right: -65px;
    bottom: 140px;
  }

  .form-container {
    width: 100%;
    min-height: 620px;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 1;
    position: relative;
    padding: 60px 0;
  }
}

.footer-beian {
  color: rgb(187, 187, 187);
  font-family: Arial, sans-serif;
  font-size: 12px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  text-align: center;
  cursor: pointer;
  line-height: 1.3;
  word-break: break-word;
  padding: 0 5px;

  @media (max-width: 768px) {
    font-size: 10px;
    bottom: 8px;
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .brand-section {
    margin-left: 4%;
    min-width: 380px;
    max-width: 600px;
    width: 55%;

    .brand-content {
      .brand-logo {
        width: 200px;
        height: 66px;
      }

      .brand-slogan {
        font-size: 32px;
      }

      .brand-desc {
        font-size: 16px;
      }
    }
  }

  .form-section {
    width: 420px;
    margin-right: 5%;
  }
}

@media (max-width: 768px) {
  .login-layout {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .brand-section {
    margin: 0;
    margin-bottom: 40px;
    max-width: 95%;
    width: 100%;

    .brand-content {
      text-align: center;

      .brand-logo {
        width: 160px;
        height: 53px;
      }

      .brand-slogan {
        font-size: 24px;

        .gradient-text {
          white-space: normal;
          word-break: break-word;
        }
      }

      .brand-desc {
        font-size: 14px;
      }
    }
  }

  .form-section {
    width: 90%;
    max-width: 400px;
    margin: 0;
    padding: 0;
    min-height: auto;

    .form-container {
      padding-top: 40px;
      min-height: 500px;
    }
  }
}
</style>
