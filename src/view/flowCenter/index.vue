<template>
  <div class="flow-center-container">
    <!-- 左侧导航 -->
    <div class="flow-center-sidebar">
      <!-- Logo 区域 -->
      <div class="logo-section">
        <img
          src="@/assets/logo/logo-kedo.png"
          alt="Kedo"
          class="logo"
          @click="goToBoard"
        />
      </div>

      <a-divider class="sidebar-divider" />

      <!-- 主要菜单 -->
      <div class="menu-section">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="light"
          class="sidebar-menu"
          :items="menuList"
          @select="handleMenuSelect"
        >
        </a-menu>
      </div>

      <a-divider class="sidebar-divider" />

      <!-- 团队列表 -->
      <div class="team-section">
        <div class="team-header">
          <span class="team-title">{{ $t('flow.teamSpace') }}</span>
          <a-button
            type="text"
            size="small"
            @click="showCreateTeamModal"
            class="add-team-btn"
          >
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </div>

        <div class="team-list" v-if="teamList.length > 0">
          <div
            v-for="team in teamList"
            :key="team.f_Id"
            class="team-item"
            :class="{ active: selectedTeamId === team.f_Id }"
            @click="selectTeam(team)"
          >
            <a-avatar :size="22" class="team-avatar" :class="{ 'team-avatar-text': !team?.f_HeadIcon }" :src="team?.f_HeadIcon">
              {{ team.f_TeamName.charAt(0) }}
            </a-avatar>
            <span class="team-name" :title="team.f_TeamName">{{
              team.f_TeamName
            }}</span>
          </div>
        </div>

        <div v-else class="empty-teams">{{ $t('flow.noTeams') }}</div>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="flow-center-content">
      <!-- 主要内容 -->
      <div class="content-main">
        <router-view @refreshTeamList="loadTeamList" />
      </div>
    </div>

    <!-- 创建团队弹窗 -->
    <CreateTeamModal
      v-model:open="createTeamModalVisible"
      @success="handleCreateTeamSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import { useI18n } from "vue-i18n";
import {
  FileOutlined,
  AppstoreOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import { CreateTeamModal } from "./modal";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { t } = useI18n();

// 响应式数据
const selectedKeys = ref<string[]>(["myFiles"]);
const selectedTeamId = ref<string>("");
const searchKeyword = ref<string>("");
const createTeamModalVisible = ref(false);
const teamList = ref<any[]>([]);
const loading = ref(false);

// 计算属性
const userId = computed(() => userStore.getUserId);

const menuList = reactive([
  {
    key: "myFiles",
    label: computed(() => t('flow.myFiles')),
    icon: () => h(FileOutlined),
    path: "/flowCenter/myFiles",
  },
  {
    key: "templates",
    label: computed(() => t('flow.templates')),
    icon: () => h(AppstoreOutlined),
    path: "/flowCenter/templates",
  },
  {
    key: "recycle",
    label: computed(() => t('flow.recycleBin')),
    icon: () => h(DeleteOutlined),
    path: "/flowCenter/recycle",
  },
]);

// 方法
const goToBoard = () => {
  router.push("/board");
};

const handleMenuSelect = ({ key }: { key: string }) => {
  selectedTeamId.value = "";
  const menuItem = menuList.find((item) => item.key === key);
  if (menuItem) {
    console.log(menuItem.path);
    router.push(menuItem.path);
  }
};

const selectTeam = (team: any) => {
  selectedKeys.value = [];
  selectedTeamId.value = team.f_Id;
  router.push(`/flowCenter/team/${team.f_Id}`);
};

const handleSearch = (value: string) => {
  // 搜索逻辑在子组件中处理
  console.log("搜索:", value);
};

const showCreateTeamModal = () => {
  createTeamModalVisible.value = true;
};

const handleCreateTeamSuccess = async (team: any) => {
  await loadTeamList();
};

const loadTeamList = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamInfoList({
        F_UserId: String(userId.value),
      })
    );

    if (err) {
      console.error("获取团队列表失败:", err);
      return;
    }

    teamList.value = response.data || [];
  } catch (error) {
    console.error("获取团队列表失败:", error);
  }
};

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    // 检查是否是团队路径
    const teamMatch = newPath.match(/^\/flowCenter\/team\/([^\/]+)(?:\/.*)?$/);
    if (teamMatch) {
      const teamId = teamMatch[1];
      selectedKeys.value = [];
      selectedTeamId.value = teamId;
    } else {
      // 检查菜单项路径
      const menuItem = menuList.find((item) => item.path === newPath);
      if (menuItem) {
        selectedKeys.value = [menuItem.key];
        selectedTeamId.value = "";
      }
    }
  },
  { immediate: true }
);

// 生命周期
onMounted(() => {
  loadTeamList();
});
</script>

<style scoped lang="scss">
.flow-center-container {
  display: flex;
  height: 100vh;
  background: #fff;
}

.flow-center-sidebar {
  width: 240px;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;

  .logo-section {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      height: 34px;
      cursor: pointer;
      transition: all 0.3s ease;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));

      &:hover {
        transform: scale(1.03);
        filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15));
      }
    }
  }

  .sidebar-divider {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .menu-section {
    .sidebar-menu {
      border: none;
      background: transparent;

      :deep(.ant-menu-item) {
        border-radius: 8px;
        margin-bottom: 4px;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(24, 144, 255, 0.1);
        }

        &.ant-menu-item-selected {
          background-color: rgba(24, 144, 255, 0.15);
          color: #1890ff;
          font-weight: 600;
        }
      }
    }
  }

  .team-section {
    background: rgba(245, 247, 250, 0.7);
    border-radius: 10px;
    padding: 12px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);

    .team-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .team-title {
        font-size: 14px;
        font-weight: 600;
        color: #666;
      }

      .add-team-btn {
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .team-list {
      max-height: calc(100vh - 350px);
      overflow-y: auto;

      .team-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 4px;

        &:hover {
          background-color: rgba(24, 144, 255, 0.1);
        }

        &.active {
          background-color: rgba(24, 144, 255, 0.15);
          color: #1890ff;
          font-weight: 600;
        }

        .team-avatar {
          margin-right: 8px;

          &-text {
            background-color: #1890ff;
            color: white;
            font-size: 12px!important;
          }
        }

        .team-name {
          font-size: 14px;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .empty-teams {
      text-align: center;
      color: #999;
      font-size: 12px;
      padding: 20px 0;
    }
  }
}

.flow-center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .content-header {
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;

    .search-container {
      max-width: 400px;

      .search-input {
        width: 100%;
        height: 36px;
        background: #f5f5f5;
        border-radius: 10px;
        border: none;

        :deep(.ant-input) {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        :deep(.ant-input-group-addon) {
          background: transparent;
          border: none;
        }
      }
    }
  }

  .content-main {
    flex: 1;
    overflow: hidden;
    background: #ffffff;
  }
}
</style>
