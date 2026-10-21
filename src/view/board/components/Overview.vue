<template>
  <div class="overview-container">
    <!-- 广告位卡片 -->
    <div class="welcome-banner">
      <div class="banner-content">
        <div class="banner-info">
          <h1 class="banner-title">{{ $t('dashboard.welcome.title') }}</h1>
          <p class="banner-subtitle">{{ $t('dashboard.welcome.subtitle') }}</p>
          <p class="banner-description">
            {{ $t('dashboard.welcome.description') }}
          </p>
          
          <div class="banner-actions">
            <a-button 
              type="primary" 
              size="large" 
              @click="handleQuickStart" 
              class="quick-start-btn"
            >
              {{ $t('dashboard.welcome.quickStart') }}
            </a-button>
          </div>
        </div>
        
        <div class="banner-visual">
          <img src="@/assets/images/welcome_workspace.svg" alt="Welcome" class="banner-icon" />
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="content-left">
        <!-- 统计卡片区域 -->
        <div class="card-section">
          <!-- Token使用量卡片 -->
          <div class="stat-card usage-card">
            <div class="card-content">
              <span class="card-title">{{ $t('dashboard.stats.tokenUsage') }}</span>
              <span class="card-value">{{ tokenUsed || "0" }}</span>
            </div>
            <div class="card-icon">
              <BarChartOutlined />
            </div>
          </div>

          <!-- Token剩余量卡片 -->
          <div class="stat-card remaining-card">
            <div class="card-content">
              <span class="card-title">{{ $t('dashboard.stats.tokenRemaining') }}</span>
              <span class="card-value">{{ tokenRemaining || "0" }}</span>
              <div v-if="tokenTip" class="card-tip">
                <ExclamationCircleOutlined />
                {{ tokenTip }}
              </div>
            </div>
            <div class="card-icon">
              <WalletOutlined />
            </div>
            <a-button type="link" class="card-button" @click="handleGoToRecharge">
              {{ $t('dashboard.stats.goToRecharge') }} <ArrowRightOutlined />
            </a-button>
          </div>
        </div>

        <!-- 当前 Token 可调用的模型 -->
        <section class="available-models-card" aria-labelledby="board-available-models-title">
          <div class="models-heading">
            <span id="board-available-models-title" class="models-title">
              {{ $t('dashboard.exchange.availableModelsTitle') }}
            </span>
            <span class="models-subtitle">
              {{ $t('dashboard.exchange.availableModelsSubtitle') }}
            </span>
          </div>
          <div class="model-list" role="list">
            <span
              v-for="model in availableModels"
              :key="model"
              class="model-tag"
              role="listitem"
            >
              {{ model }}
            </span>
          </div>
        </section>

        <!-- 密钥管理区域 -->
        <div class="key-card">
          <div class="key-header">
            <span class="key-title">{{ $t('dashboard.keyManagement.title') }}</span>
            <a-button type="link" @click="handleCreateKey" class="create-btn">
              {{ $t('dashboard.keyManagement.create') }}
              <ArrowRightOutlined />
            </a-button>
          </div>
          <a-table
            :columns="columns"
            :dataSource="keyList"
            :loading="keyLoading"
            :pagination="false"
            bordered
            class="key-table"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="handleViewKey(record)">{{ $t('dashboard.keyManagement.viewKey') }}</a>
                  <a @click="handleEditKey(record)">{{ $t('dashboard.keyManagement.edit') }}</a>
                  <a-popconfirm
                    :title="$t('dashboard.keyManagement.confirmDelete')"
                    @confirm="handleDeleteKey(record, index)"
                  >
                    <a-spin v-if="deleteLoading === record.f_Id" size="small" />
                    <a v-else>{{ $t('dashboard.keyManagement.delete') }}</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
      </div>

      <!-- 右侧Exchange组件 -->
      <div class="side-content">
      <div class="exchange-container">
        <div class="exchange-header">
          <h3 class="exchange-title">{{ $t('dashboard.exchange.title') }}</h3>
        </div>

        <div class="exchange-tips">
          <p class="tip-item">
            <span class="required">*</span>
            {{ $t('dashboard.exchange.tip1') }}
          </p>
          <p class="tip-item">
            <span class="required">*</span>
            {{ $t('dashboard.exchange.tip2') }}
          </p>
        </div>

        <div class="exchange-input-wrapper">
          <a-input
            v-model:value="exchangeCode"
            :placeholder="$t('dashboard.exchange.placeholder')"
            :maxlength="maxCodeLength"
            :aria-label="$t('dashboard.exchange.placeholder')"
            autocomplete="off"
            spellcheck="false"
            size="large"
            class="exchange-input"
            @pressEnter="handleExchange"
          />
          <div class="input-decoration">
            <GiftOutlined />
          </div>
        </div>

        <div class="exchange-action">
          <a-button
            type="primary"
            size="large"
            :loading="exchangeLoading"
            :disabled="!canExchange"
            @click="handleExchange"
          >
            {{ $t('dashboard.exchange.exchangeNow') }}
          </a-button>
        </div>
      </div>
    </div>
  </div>

  <!-- 创建/编辑密钥模态框 -->
  <CustomModal
    :footer="false"
    v-model:open="keyModalVisible"
    :title="isAddKey ? $t('dashboard.keyManagement.createKeyProject') : $t('dashboard.keyManagement.editKeyProject')"
  >
    <div style="padding: 0 50px 0 25px">
      <a-form :model="keyForm" @finish="handleKeyModalOk" layout="vertical">
        <div style="font-size: 16px; color: #808080; margin-bottom: 8px">{{ $t('dashboard.keyManagement.projectName') }}</div>
        <a-form-item 
          name="f_Caption" 
          :rules="[{ required: true, message: $t('dashboard.keyManagement.projectNameRequired') }]"
        >
          <a-input
            v-model:value="keyForm.f_Caption"
            :placeholder="$t('dashboard.keyManagement.projectNamePlaceholder')"
            style="height: 50px; border: 1px solid #e6e6e6; font-size: 18px; border-radius: 6px"
          />
        </a-form-item>
        <div style="font-size: 16px; color: #808080; margin-bottom: 8px">{{ $t('dashboard.keyManagement.purpose') }}</div>
        <a-form-item name="f_Description">
          <a-textarea
            v-model:value="keyForm.f_Description"
            :placeholder="$t('dashboard.keyManagement.purposePlaceholder')"
            :rows="6"
            style="height: 132px; border: 1px solid #e6e6e6; font-size: 18px; border-radius: 6px"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="keyModalLoading"
            block
            style="font-size: 16px; font-weight: 500; height: 46px; background: linear-gradient(135deg, #1E9CFF, #0DA8EF); border: none; border-radius: 8px; margin-top: 32px"
          >
            {{ isAddKey ? $t('dashboard.keyManagement.confirmCreate') : $t('dashboard.keyManagement.confirmEdit') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </CustomModal>

  <!-- 查看密钥模态框 -->
  <CustomModal v-model:open="viewKeyModalVisible" :title="$t('dashboard.keyManagement.keyDetails')" :footer="false">
    <div v-if="currentKey" style="padding: 0 50px 0 25px; font-size: 16px">
      <p>
        <span style="color: rgb(128, 128, 128)">{{ $t('dashboard.keyManagement.projectName') }}</span>
        <span style="color: rgb(0,0,0)">{{ currentKey.f_Caption }}</span>
      </p>
      <p>
        <span style="color: rgb(128, 128, 128)">{{ $t('dashboard.keyManagement.projectPurpose') }}</span>
        <span style="color: rgb(0,0,0)">{{ currentKey.f_Description }}</span>
      </p>
      <p>
        <span style="color: rgb(128, 128, 128)">创建时间：</span>
        <span style="color: rgb(0,0,0)">{{ currentKey.f_CreateDate }}</span>
      </p>
      <p>
        <span style="color: rgb(128, 128, 128)">AppId：</span>
        <span style="color: rgb(0,0,0)">{{ currentKey.f_AppId }}</span>
        <CopyOutlined 
          style="margin-left: 10px; color: #1E85FF; cursor: pointer" 
          @click="copyToClipboard('AppId', currentKey.f_AppId)"
        />
      </p>
      <p>
        <span style="color: rgb(128, 128, 128)">SecretKey：</span>
        <span style="color: rgb(0,0,0)">{{ currentKey.f_SecretKey }}</span>
        <CopyOutlined 
          style="margin-left: 10px; color: #1E85FF; cursor: pointer" 
          @click="copyToClipboard('SecretKey', currentKey.f_SecretKey)"
        />
      </p>
    </div>
  </CustomModal>
</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useMembershipCode } from "@/hooks/useMembershipCode";
import { useI18n } from "vue-i18n";
import { message } from "ant-design-vue";
import CustomModal from "@/components/modal/Index.vue";
import {
  ArrowRightOutlined,
  CopyOutlined,
  BarChartOutlined,
  WalletOutlined,
  GiftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { 
  awaitWrapper,
  GetUserGPTAccountInfo,
  OnionGPT_GetGTPProjects,
  OnionGPT_CreateGPTProject,
  OnionGPT_ModifyGPTProject,
  OnionGPT_RemoveGPTProject
} from "@/api";

const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

// 响应式数据
const tokenUsed = ref<string>("");
const tokenRemaining = ref<string>("");

// 使用计算属性来响应语言变化
const tokenTip = computed(() => {
  if (tokenRemaining.value === "0" || parseInt(tokenRemaining.value) <= 0) {
    return t('dashboard.stats.tokenNotEnough');
  }
  return "";
});

const keyList = ref<any[]>([]);
const keyLoading = ref(false);
const deleteLoading = ref<string>("");
const keyModalLoading = ref(false);

// 激活码兑换逻辑由 composable 统一维护，避免不同入口行为不一致。
const {
  exchangeCode,
  exchangeLoading,
  availableModels,
  canExchange,
  maxCodeLength,
  handleExchange,
} = useMembershipCode({
  onSuccess: ({ remainingQnty }) => {
    tokenRemaining.value = String(remainingQnty);
  },
});

// 密钥相关
const keyModalVisible = ref(false);
const viewKeyModalVisible = ref(false);
const isAddKey = ref(true);
const currentKey = ref<any>(null);
const keyForm = reactive({
  f_Caption: "",
  f_Description: "",
  f_Id: "",
});

// 表格列配置 - 使用计算属性来响应语言变化
const columns = computed(() => [
  {
    title: t('dashboard.keyManagement.projectName').toString().replace('：', ''),
    dataIndex: "f_Caption",
    key: "f_Caption",
    width: 300,
    ellipsis: true,
  },
  {
    title: t('dashboard.keyManagement.purpose').toString().replace('：', ''),
    dataIndex: "f_Description",
    key: "f_Description",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "f_CreateDate",
    key: "f_CreateDate",
    ellipsis: true,
  },
  {
    title: "操作",
    key: "action",
    width: 200,
    align: "center",
  },
]);

// 获取用户账户信息
const getUserAccountInfo = async () => {
  try {
    const userId = userStore.getUserId;
    if (!userId) return;

    const [err, response] = await awaitWrapper(
      GetUserGPTAccountInfo({ F_UserId: String(userId) })
    );
    
    if (err) {
      console.error("获取账户信息失败:", err);
      return;
    }

    const data = response.data;
    tokenUsed.value = String(data.usageQnty || "0");
    
    // 更新store中的token余额
    userStore.setTokenBalance(data.remainingQnty || 0);
    
    if (data.remainingQnty <= 0) {
      tokenRemaining.value = "0";
    } else {
      tokenRemaining.value = String(data.remainingQnty);
    }
  } catch (error) {
    console.error("获取账户信息失败:", error);
  }
};

// 前往充值
const handleGoToRecharge = () => {
  router.push("/pay/OnionAI/1");
};

// 获取密钥列表
const getKeyList = async () => {
  keyLoading.value = true;
  try {
    const userId = userStore.getUserId;
    if (!userId) return;

    const [err, response] = await awaitWrapper(
      OnionGPT_GetGTPProjects({ F_UserId: String(userId) })
    );
    
    if (err) {
      console.error("获取密钥列表失败:", err);
      message.error("获取密钥列表失败");
      return;
    }

    keyList.value = response.data || [];
  } catch (error) {
    console.error("获取密钥列表失败:", error);
    message.error("获取密钥列表失败");
  } finally {
    keyLoading.value = false;
  }
};

// 事件处理
const handleCreateKey = () => {
  isAddKey.value = true;
  keyForm.f_Caption = "";
  keyForm.f_Description = "";
  keyForm.f_Id = "";
  keyModalVisible.value = true;
};

const handleEditKey = (record: any) => {
  isAddKey.value = false;
  keyForm.f_Caption = record.f_Caption;
  keyForm.f_Description = record.f_Description;
  keyForm.f_Id = record.f_Id;
  keyModalVisible.value = true;
};

const handleViewKey = (record: any) => {
  currentKey.value = record;
  viewKeyModalVisible.value = true;
};

const handleDeleteKey = async (record: any, index: number) => {
  deleteLoading.value = String(record.f_Id);
  try {
    const userId = userStore.getUserId;
    if (!userId) return;

    const [err, response] = await awaitWrapper(
      OnionGPT_RemoveGPTProject({ 
        f_UserId: String(userId), 
        f_Id: record.f_Id 
      })
    );
    
    if (err) {
      console.error("删除失败:", err);
      message.error("删除失败");
      return;
    }

    message.success("删除成功");
    await getKeyList(); // 重新获取列表
  } catch (error) {
    console.error("删除失败:", error);
    message.error("删除失败");
  } finally {
    deleteLoading.value = "";
  }
};

const handleKeyModalOk = async () => {
  keyModalLoading.value = true;
  try {
    const userId = userStore.getUserId;
    if (!userId) return;

    if (isAddKey.value) {
      // 创建
      const [err, response] = await awaitWrapper(
        OnionGPT_CreateGPTProject({
          f_CreateUserId: String(userId),
          f_Caption: keyForm.f_Caption,
          f_Description: keyForm.f_Description || "",
        })
      );
      
      if (err) {
        console.error("创建失败:", err);
        return;
      }
      
      message.success("创建成功");
    } else {
      // 编辑
      const [err, response] = await awaitWrapper(
        OnionGPT_ModifyGPTProject({
          f_Id: keyForm.f_Id,
          f_Caption: keyForm.f_Caption,
          f_UserId: String(userId),
          f_Description: keyForm.f_Description || "",
        })
      );
      
      if (err) {
        console.error("编辑失败:", err);
        return;
      }
      
      message.success("编辑成功");
    }

    keyModalVisible.value = false;
    await getKeyList(); // 重新获取列表
  } catch (error) {
    console.error("操作失败:", error);
    message.error("操作失败");
  } finally {
    keyModalLoading.value = false;
  }
};

const copyToClipboard = async (title: string, content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    message.success(`复制${title}成功，请妥善保管`);
  } catch (error) {
    message.error("复制失败");
  }
};

// 快速开始
const handleQuickStart = () => {
  // 根据用户状态跳转到合适的页面
  window.open('/#/download', '_blank');
  // if (userStore.getUserIsMember || userStore.getUserTokenBalance > 0) {
  //   // 有权限时跳转到KedoMind页面
  //   window.open('/#/kedomind', '_blank');
  // } else {
  //   // 无权限时跳转到充值页面
  //   router.push('/pay/KedoMind/4');
  // }
};

// 生命周期
onMounted(() => {
  getUserAccountInfo();
  // OnionGPT 密钥模块未启用时，不主动请求密钥列表。
  // getKeyList();
});
</script>

<style scoped lang="scss">
@import "@/style/theme.scss";
.overview-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  padding: 24px;
}

// 广告位卡片样式
.welcome-banner {
  background: linear-gradient(225deg, #ffffff 0%, #f0f9ff 30%, #e0f2fe 60%, #bae6fd 100%);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin: 0 auto;
  }

  .banner-info {
    flex: 1;
    text-align: left;
    margin-left: 30px;

    .banner-title {
      font-size: 32px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #1E9CFF, #0DA8EF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-align: left;
    }

    .banner-subtitle {
      font-size: 18px;
      color: #4a5568;
      margin-bottom: 20px;
      font-weight: 500;
      text-align: left;
    }

    .banner-description {
      font-size: 14px;
      line-height: 1.7;
      color: #2d3748;
      margin-bottom: 32px;
      max-width: 500px;
      text-align: left;
    }

    .banner-actions {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .quick-start-btn {
        height: 44px;
        padding: 0 28px;
        font-size: 15px;
        font-weight: 600;
        background: linear-gradient(135deg, #1E9CFF, #0DA8EF) !important;
        border: none !important;
        color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(30, 156, 255, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(30, 156, 255, 0.4) !important;
          background: linear-gradient(135deg, #0DA8EF, #1E9CFF) !important;
        }
      }
    }
  }

  .banner-visual {
    flex: 0 0 350px;
    margin-right: 100px;

    .banner-icon {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.main-content {
  display: flex;
  gap: 24px;
  justify-content: space-between;
}

.main-content {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding-bottom: 50px;
}

.content-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.side-content {
  width: 360px;
  flex-shrink: 0;
}

.card-section {
  display: flex;
  gap: 24px;
  margin-bottom: 0;
}

.stat-card {
  flex: 1;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 24px;
  height: 150px;
  position: relative;
 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  &.usage-card {
    background: linear-gradient(135deg, #1E9CFF 0%, #70D3FF 100%);
  
    
    .card-title,
    .card-value {
      color: white;
    }
    
    .card-icon {
      color: #ffffff;
      opacity: 0.9;
    }
  }

  &.remaining-card {
    background: linear-gradient(135deg, #0DA8EF 0%, #1E9CFF 100%);
    border: 1px solid rgba(13, 168, 239, 0.3);
    
    .card-title,
    .card-value {
      color: white;
    }
    
    .card-icon {
      color: #ffffff;
      opacity: 0.9;
    }
  }
}

.card-content {
  display: flex;
  flex-direction: column;

  .card-title {
    color: $text-light;
    font-size: 14px;
    margin-bottom: 12px;
  }

  .card-value {
    font-size: 28px;
    font-weight: 600;
    color: $text-color;
    margin-bottom: 8px;
  }

  .card-tip {
    position: absolute;
    bottom: 20px;
    left: 24px;
    color: #ff4d4f;
    font-size: 12px;
  }
}

.stat-card .card-button {
  position: absolute !important;
  bottom: 16px !important;
  right: 16px !important;
  color: $primary-color !important;
  font-size: 14px !important;
  padding: 6px 12px !important;
  height: auto !important;
  border-radius: 8px !important;
  background: rgba(30, 156, 255, 0.1) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: rgba(30, 156, 255, 0.2) !important;
    transform: translateY(-1px) !important;
    color: $primary-color !important;
  }
}

.remaining-card .card-button {
  color: white !important;
  background: rgba(255, 255, 255, 0.2) !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
}

.remaining-card .card-tip {
  color: #ffeb3b !important;
}

.card-icon {
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 42px;
  color: $primary-color;
  opacity: 0.3;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
}

.available-models-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 26px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  border: 1px solid rgba(30, 156, 255, 0.16);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(30, 156, 255, 0.08);
}

.models-heading {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.models-title {
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.models-subtitle {
  color: #64748b;
  font-size: 13px;
}

.model-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.model-tag {
  padding: 8px 14px;
  color: #087fc2;
  font-size: 14px;
  font-weight: 600;
  background: rgba(30, 156, 255, 0.1);
  border: 1px solid rgba(30, 156, 255, 0.22);
  border-radius: 999px;
}

.key-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.key-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid $border-color;
  margin-bottom: 24px;
}

.key-title {
  font-weight: 600;
  color: $text-color;
}

.create-btn {
  padding: 0;
  color: $primary-color;

  &:hover {
    opacity: 0.8;
  }
}

.key-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

// Exchange组件样式
.exchange-container {
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.exchange-header {
  margin-bottom: 16px;

  .exchange-title {
    color: $text-color;
    font-size: 18px;
    font-weight: 550;
    margin: 0;
  }
}

.exchange-tips {
  margin-bottom: 28px;

  .tip-item {
    color: $text-light;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 10px 0;

    .required {
      color: #ff0000;
      margin-right: 8px;
    }
  }
}

.exchange-input-wrapper {
  position: relative;
  margin-bottom: 20px;

  .exchange-input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
  }

  .input-decoration {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    color: $primary-color;
    font-size: 18px;
    background: $main-content-bg-color;
    padding: 0 4px;
  }
}

.exchange-action {
  display: flex;
  justify-content: center;
  margin-top: auto;

  .ant-btn-primary {
    width: fit-content;
    padding: 8px 24px;
    height: 48px;
    background: linear-gradient(135deg, #1E9CFF, #0DA8EF) !important;
    border: none !important;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(30, 156, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(30, 156, 255, 0.4) !important;
      background: linear-gradient(135deg, #0DA8EF, #1E9CFF) !important;
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
  }

  .side-content {
    width: 100%;
  }

  .welcome-banner {
    .banner-content {
      flex-direction: column;
      text-align: center;
      gap: 30px;
    }

    .banner-visual {
      flex: none;
      width: 180px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 768px) {
  .overview-container {
    padding: 16px;
  }

  .welcome-banner {
    padding: 24px;

    .banner-info {
      .banner-title {
        font-size: 24px;
      }

      .banner-subtitle {
        font-size: 16px;
      }

      .banner-description {
        font-size: 13px;
        max-width: 100%;
      }
    }

    .banner-visual {
      width: 150px;
    }
  }

  .card-section {
    flex-direction: column;
  }

  .available-models-card {
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }

  .model-list {
    justify-content: flex-start;
  }

  .key-card {
    padding: 20px;
  }

  .exchange-container {
    padding: 20px;
    height: auto;
  }
}
</style>
