<template>
  <div class="team-container">
    <!-- 团队标题区域 -->
    <div class="team-header">
      <div class="team-header-top">
        <a-avatar class="team-avatar" :class="{ 'team-avatar-text': !teamInfo?.f_HeadIcon }" :size="36" :src="teamInfo?.f_HeadIcon">
          {{ teamInfo?.f_TeamName?.charAt(0) || "T" }}
        </a-avatar>
        <span class="team-name">{{ teamInfo?.f_TeamName || $t('common.loading') }}</span>
      </div>
      <p class="team-header-bottom">
        {{ teamInfo?.f_Description || $t('flow.noDescription') }}
      </p>
    </div>

    <!-- 主要内容区域 -->
    <div class="team-content">
      <a-tabs
        v-model:activeKey="activeTab"
        @change="handleTabChange"
        class="team-tabs"
      >
        <!-- 全部文件 Tab -->
        <a-tab-pane key="files">
          <template #tab>
            <span class="tab-title">
              <FileOutlined />
              {{ $t('flow.allFiles') }}
            </span>
          </template>
          <div class="files-content">
            <!-- 根据路由参数决定显示内容 -->
            <FolderDetail v-if="hasFolderId" />

            <!-- 没有文件夹ID时显示团队文件列表 -->
            <div v-else>
              <div class="section-header">
                <span class="section-title">{{ $t('flow.folders') }}</span>
                <a-button
                  type="primary"
                  @click="createFolderModalVisible = true"
                >
                  <FolderOutlined />
                  {{ $t('flow.newFolder') }}
                </a-button>
              </div>
              <!-- 文件夹区域 -->
              <div v-if="folderList.length > 0" class="folders-section">
                <div class="folder-grid">
                  <FolderCard
                    v-for="folder in folderList"
                    :key="folder.f_Id"
                    :folder="folder"
                    :team-id="teamId"
                    @rename="handleRenameFolder"
                    @delete="handleDeleteFolder"
                    @refresh="loadFolderList"
                  />
                </div>
              </div>
              <div v-if="folderList.length === 0" class="empty-state">
                <a-empty
                  :description="$t('flow.noFolders')"
                  :image="Empty.PRESENTED_IMAGE_SIMPLE"
                />
              </div>

              <!-- 文件区域 -->
              <div class="files-section">
                <div class="section-header">
                  <span class="section-title">{{ $t('flow.files') }}</span>
                  <a-button
                    type="primary"
                    @click="createFlowModalVisible = true"
                  >
                    <FileOutlined />
                    {{ $t('flow.newFile') }}
                  </a-button>
                </div>

                <a-spin :spinning="loading" size="large">
                  <div v-if="flowList.length === 0" class="empty-state">
                    <a-empty
                      :description="$t('flow.noFiles')"
                      :image="Empty.PRESENTED_IMAGE_SIMPLE"
                    />
                  </div>
                  <div v-else class="files-grid">
                    <div
                      v-for="flow in flowList"
                      :key="flow.f_Id"
                      class="flow-card"
                    >
                      <div class="card-header">
                        <div class="flow-preview">
                          <a-image
                            :src="flow.f_ImgUrl || defaultImg"
                            alt="工作流预览"
                            class="preview-image"
                            @click.stop
                          />
                        </div>
                      </div>

                      <div class="card-content">
                        <h3 class="flow-title" :title="flow.f_Caption">
                          {{ flow.f_Caption }}
                        </h3>
                        <p
                          class="flow-description"
                          :title="flow.f_Description || $t('flow.noDescription')"
                        >
                          {{ flow.f_Description || $t('flow.noDescription') }}
                        </p>
                        <div class="update-row">
                          <span class="update-time"
                            >{{ $t('flow.createdAt') }} {{ formatTime(flow.f_CreateDate) }}</span
                          >
                          <!-- <a-dropdown trigger="click" placement="topRight">
                            <a-button
                              type="text"
                              size="small"
                              class="more-btn"
                              @click.stop
                            >
                              <MoreOutlined />
                            </a-button>
                            <template #overlay>
                              <a-menu
                                @click="
                                  (info) => handleFlowAction(info.key, flow)
                                "
                              >
                                <a-menu-item key="publish"
                                  >{{ $t('flow.publishFile') }}</a-menu-item
                                >
                                <a-menu-divider />
                                <a-menu-item key="edit">{{ $t('flow.editInfo') }}</a-menu-item>
                                <a-menu-item key="duplicate"
                                  >{{ $t('flow.createCopy') }}</a-menu-item
                                >
                                <a-menu-item key="delete" class="danger-item"
                                  >{{ $t('flow.deleteFile') }}</a-menu-item
                                >
                              </a-menu>
                            </template>
                          </a-dropdown> -->
                        </div>
                      </div>

                      <div class="card-footer">
                        <a-button
                          type="primary"
                          block
                          @click="handleOpenFlow(flow)"
                          >{{ $t('flow.openFile') }}</a-button
                        >
                      </div>
                    </div>
                  </div>
                </a-spin>

                <!-- 分页 -->
                <div class="pagination-wrapper" v-if="pagination.total > 0">
                  <a-pagination
                    v-model:current="pagination.current"
                    v-model:page-size="pagination.pageSize"
                    :total="pagination.total"
                    :show-size-changer="false"
                    :show-quick-jumper="false"
                    :show-total="
                      (total, range) =>
                        `${$t('flow.range')} ${range[0]}-${range[1]} ${$t('flow.to')}，${$t('flow.total')} ${total} ${$t('flow.items')}`
                    "
                    :page-size-options="['10', '20', '50', '100']"
                    @change="handlePageChange"
                    @show-size-change="
                      (current, size) => {
                        pagination.current = 1;
                        pagination.pageSize = size;
                        loadTeamFlowList();
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>

        <!-- 回收站 Tab -->
        <a-tab-pane key="recycle">
          <template #tab>
            <span class="tab-title">
              <DeleteOutlined />
              {{ $t('flow.recycleBin') }}
            </span>
          </template>
          <div class="recycle-content">
            <a-spin :spinning="recycleLoading" size="large">
              <div v-if="recycleList.length === 0" class="empty-state">
                <a-empty
                  :description="$t('flow.emptyRecycleBinDesc')"
                  :image="Empty.PRESENTED_IMAGE_SIMPLE"
                />
              </div>

              <div v-else class="recycle-grid">
                <div
                  v-for="flow in recycleList"
                  :key="flow.f_Id"
                  class="recycle-card"
                >
                  <div class="card-header">
                    <div class="flow-preview">
                      <a-image
                        :src="flow.f_ImgUrl || defaultImg"
                        alt="工作流预览"
                        class="preview-image"
                        @click.stop
                      />
                    </div>
                  </div>

                  <div class="card-content">
                    <h3 class="flow-title" :title="flow.f_Caption">
                      {{ flow.f_Caption }}
                    </h3>
                    <p
                      class="flow-description"
                      :title="flow.f_Description || $t('flow.noDescription')"
                    >
                      {{ flow.f_Description || $t('flow.noDescription') }}
                    </p>
                  </div>

                  <div class="card-footer">
                    <div class="flow-info">
                      <div class="delete-time">
                        {{ $t('flow.deletedAt') }} {{ formatTime(flow.f_DeleteTime) }}
                      </div>
                    </div>
                    <a-dropdown trigger="click" placement="topRight">
                      <a-button
                        type="text"
                        size="small"
                        class="more-btn"
                        @click.stop
                      >
                        <MoreOutlined />
                      </a-button>
                      <template #overlay>
                        <a-menu
                          @click="(info) => handleRecycleAction(info.key, flow)"
                        >
                          <a-menu-item key="restore">{{ $t('flow.restore') }}</a-menu-item>
                          <a-menu-item key="delete" class="danger-item"
                            >{{ $t('flow.permanentDelete') }}</a-menu-item
                          >
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </div>
                </div>
              </div>
            </a-spin>
          </div>
        </a-tab-pane>

        <!-- 团队成员 Tab -->
        <a-tab-pane key="members">
          <template #tab>
            <span class="tab-title">
              <UserOutlined />
              {{ $t('flow.teamMembers') }}
            </span>
          </template>
          <TeamMembers :team-id="teamId" :team-info="teamInfo" />
        </a-tab-pane>

        <!-- 团队设置 Tab -->
        <a-tab-pane v-if="isTeamOwner" key="settings">
          <template #tab>
            <span class="tab-title">
              <SettingOutlined />
              {{ $t('flow.teamSettings') }}
            </span>
          </template>
          <div class="settings-content">
            <TeamSettings
              :team-info="teamInfo"
              :is-team-owner="isTeamOwner"
              @refreshTeamInfo="loadTeamInfo"
              @handoverTeam="
                () => {
                  activeTab = 'files';
                }
              "
              @leave-team="
                () => {
                  /* 退出团队逻辑，如需实现 */
                }
              "
              @avatar-upload="
                (file) => {
                  /* 头像上传逻辑，如需实现 */
                }
              "
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- 弹窗组件 -->
    <CreateFlowModal
      v-model:open="createFlowModalVisible"
      :team-id="teamId"
      :team-onion-flow-file-group="currentDirId"
      @success="handleCreateFlowSuccess"
    />

    <CreateFolderModal
      v-model:open="createFolderModalVisible"
      :team-id="teamId"
      @success="handleCreateFolderSuccess"
    />

    <RenameFolderModal
      v-model:open="renameFolderModalVisible"
      :folder="currentFolder"
      @success="handleRenameFolderSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { message, Empty } from "ant-design-vue";
import {
  BranchesOutlined,
  MoreOutlined,
  UserOutlined,
  FolderOutlined,
  FileOutlined,
  SettingOutlined,
  DeleteOutlined,
  RestOutlined,
} from "@ant-design/icons-vue";
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import {
  CreateFlowModal,
  CreateFolderModal,
  RenameFolderModal,
} from "../../modal";
import TeamSettings from "./TeamSettings.vue";
import FolderDetail from "./FolderDetail.vue";
import FolderCard from "./FolderCard.vue";
import TeamMembers from "./TeamMembers.vue";

// 导入图标
const folderIcon = new URL(
  "@/view/flowCenter/AiFlow/team/allDir/imgs/icon_dir.png",
  import.meta.url
).href;
const defaultImg = new URL(
  "@/assets/images/default_template.png",
  import.meta.url
).href;

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// 响应式数据
const activeTab = ref("files");
const teamInfo = ref<any>(null);
const folderList = ref<any[]>([]);
const flowList = ref<any[]>([]);
const recycleList = ref<any[]>([]);
const loading = ref(false);
const recycleLoading = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});
const currentDirId = ref("");
const folderLoadingStates = reactive<Record<string, boolean>>({});

// 弹窗状态
const createFlowModalVisible = ref(false);
const createFolderModalVisible = ref(false);
const renameFolderModalVisible = ref(false);
const currentFolder = ref<any>(null);

// 计算属性
const teamId = computed(() => route.params.teamId as string);
const folderId = computed(() => route.params.folderId as string);
const hasFolderId = computed(() => !!folderId.value);
const userId = computed(() => userStore.getUserId);
const isTeamOwner = computed(
  () => teamInfo.value?.f_OwnerUserId === String(userId.value)
);

const emit = defineEmits<{
  refreshTeamList: [];
}>();

// 获取团队信息
const loadTeamInfo = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamInfoList({
        F_UserId: String(userId.value),
      })
    );

    if (err) {
      console.error("获取团队信息失败:", err);
      return;
    }

    const teams = response.data || [];
    teamInfo.value = teams.find((team) => team.f_Id === teamId.value);

    // 调试信息
    console.log("团队信息:", teamInfo.value);
    console.log("当前用户ID:", userId.value);
    console.log("团队所有者ID:", teamInfo.value?.f_OwnerId);
    console.log("是否为团队所有者:", isTeamOwner.value);

    emit("refreshTeamList");

    // 如果团队已被解散，自动跳转到我的文件
    if (!teamInfo.value) {
      router.replace("/flowCenter/myFiles");
    }
  } catch (error) {
    console.error("获取团队信息失败:", error);
  }
};

// 获取文件夹列表
const loadFolderList = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamFileGroupList({
        F_TeamId: teamId.value,
        UserId: String(userId.value),
      })
    );

    if (err) {
      console.error("获取文件夹列表失败:", err);
      return;
    }

    folderList.value = response.data || [];
  } catch (error) {
    console.error("获取文件夹列表失败:", error);
  }
};

// 获取团队文件列表
const loadTeamFlowList = async () => {
  try {
    loading.value = true;
    const [err, response] = await awaitWrapper(
      flowCenterApi.getTeamFlowList({
        TeamId: teamId.value,
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      })
    );

    if (err) {
      console.error("获取团队工作流列表失败:", err);
      return;
    }

    const data = response.data || {};
    flowList.value = data.items || [];
    pagination.total = data.totalCount || 0;
  } catch (error) {
    console.error("获取团队工作流列表失败:", error);
  } finally {
    loading.value = false;
  }
};

// 获取回收站列表
const loadRecycleList = async () => {
  try {
    recycleLoading.value = true;
    const [err, response] = await awaitWrapper(
      flowCenterApi.getRecycleBinFlows({
        TeamId: teamId.value,
      })
    );

    if (err) {
      console.error("获取回收站列表失败:", err);
      return;
    }

    recycleList.value = response.data || [];
  } catch (error) {
    console.error("获取回收站列表失败:", error);
  } finally {
    recycleLoading.value = false;
  }
};

// Tab 切换处理
const handleTabChange = (key: string) => {
  activeTab.value = key;

  switch (key) {
    case "files":
      loadFolderList();
      loadTeamFlowList();
      break;
    case "recycle":
      loadRecycleList();
      break;
  }
};

// 获取 Tab 额外内容
const getTabExtraContent = () => {
  return null; // 使用模板中的tabBarExtraContent插槽
};

// 文件夹点击处理
const handleFolderClick = (folder: any) => {
  router.push(`/flowCenter/team/${teamId.value}/${folder.f_Id}`);
};

// 重命名文件夹
const handleRenameFolder = (folder: any) => {
  currentFolder.value = folder;
  renameFolderModalVisible.value = true;
};

// 删除文件夹
const handleDeleteFolder = async (folderId: string) => {
  try {
    folderLoadingStates[folderId] = true;
    const [err] = await awaitWrapper(
      flowCenterApi.removeFileGroup({
        f_Id: folderId,
        f_DeleteUserId: String(userId.value),
      })
    );

    if (err) {
      message.error("删除失败");
      return;
    }

    message.success("删除成功");
    loadFolderList();
  } catch (error) {
    console.error("删除文件夹失败:", error);
    message.error("删除失败");
  } finally {
    folderLoadingStates[folderId] = false;
  }
};

// 恢复文件
const handleRestore = async (flow: any) => {
  try {
    // TODO: 实现恢复文件API
    console.log("恢复文件:", flow);
    message.success("恢复成功");
    loadRecycleList();
  } catch (error) {
    console.error("恢复文件失败:", error);
    message.error("恢复失败");
  }
};

// 回收站操作处理
const handleRecycleAction = (action: string, flow: any) => {
  if (action === "restore") {
    handleRestore(flow);
  } else if (action === "delete") {
    handlePermanentDelete(flow);
  }
};

// 永久删除文件
const handlePermanentDelete = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.permanentDeleteFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value),
      })
    );

    if (err) {
      message.error("删除失败");
      return;
    }

    message.success("删除成功");
    loadRecycleList();
  } catch (error) {
    console.error("永久删除文件失败:", error);
    message.error("删除失败");
  }
};

// 分页处理
const handlePageChange = (page: number) => {
  pagination.current = page;
  loadTeamFlowList();
};

// 成功回调
const handleCreateFlowSuccess = () => {
  // 延时1秒
  loadTeamFlowList();
};

const handleCreateFolderSuccess = () => {
  loadFolderList();
};

const handleRenameFolderSuccess = () => {
  loadFolderList();
};

// 格式化时间
const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

// 监听路由变化
watch(
  () => route.params.teamId,
  (newTeamId) => {
    if (newTeamId) {
      loadTeamInfo();
      loadFolderList();
      loadTeamFlowList();
    }
  },
  { immediate: true }
);

// 生命周期
onMounted(() => {
  // 不再重复调用 loadTeamInfo/loadFolderList/loadTeamFlowList，避免和watch immediate重复
});

// 打开文件
const handleOpenFlow = (flow: any) => {
  // 新开一个KedoAiFlow页面并带参数
  const query = new URLSearchParams({
    flowId: flow.flowId || flow.f_Id || "",
    flowName: flow.flowName || flow.f_Caption || "",
    flowDescription: flow.flowDescription || flow.f_Description || "",
    userId: flow.userId || flow.f_CreateUserId || "",
  }).toString();
  window.open(`/#/kedoAiFlow?${query}`, "_blank");
};

// 文件操作
const handleFlowAction = (action: string, flow: any) => {
  switch (action) {
    case "publish":
      // TODO: 实现发布功能
      message.info("发布功能开发中");
      break;
    case "edit":
      // TODO: 实现编辑功能
      message.info("编辑功能开发中");
      break;
    case "duplicate":
      handleDuplicateFlow(flow);
      break;
    case "delete":
      handleDeleteFlow(flow);
      break;
  }
};

// 复制文件
const handleDuplicateFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.duplicateFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value),
        f_NewCaption: `${flow.f_Caption} - 副本`,
      })
    );

    if (err) {
      message.error("复制失败");
      return;
    }

    message.success("复制成功");
    loadTeamFlowList();
  } catch (error) {
    console.error("复制文件失败:", error);
    message.error("复制失败");
  }
};

// 删除文件
const handleDeleteFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.removeFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value),
      })
    );

    if (err) {
      message.error("删除失败");
      return;
    }

    message.success("已移至回收站");
    loadTeamFlowList();
  } catch (error) {
    console.error("删除文件失败:", error);
    message.error("删除失败");
  }
};
</script>

<style scoped lang="scss">
.team-container {
  height: 100vh;
  padding: 24px;
  height: 100vh;
}

.team-header {
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  padding: 24px;
  &-top {
    display: flex;
    align-items: center;
    gap: 10px;
    .team-avatar {
      &-text{
        background-color: #1890ff;
        color: white;
        font-size: 12px;
      }
    }
    .team-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
  &-bottom {
    margin-top: 10px;
  }
}

.team-content {
  flex: 1;
  margin-top: 3px;
  overflow: hidden;
}

.team-tabs {
  height: 100%;

  :deep(.ant-tabs-nav) {
    margin: 0;

    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          font-size: 16px;
          font-weight: 500;

          &.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
              color: #1890ff;
            }
          }
        }
      }
    }
  }

  :deep(.ant-tabs-content-holder) {
    height: calc(100% - 50px);
    overflow: hidden;

    .ant-tabs-content {
      height: 100%;

      .ant-tabs-tabpane {
        height: 100%;
        overflow: auto;
      }
    }
  }
}

.files-content {
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.folders-section,
.files-section {
  margin-bottom: 32px;
}

.folders-section {
  margin: 16px 0 0 0;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 8px 0;
}

.files-section {
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }

  .files-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 8px 0;
    margin-bottom: 24px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}

.flow-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: fit-content;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    position: relative;
    height: 120px;
    overflow: hidden;

    .flow-preview {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .card-content {
    padding: 12px 12px 0 12px;

    .flow-title {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin: 0 0 6px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .flow-description {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
      margin: 0 0 8px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 32px;
    }

    .update-row {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .update-time {
        font-size: 12px;
        color: #999;
      }

      .more-btn {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }
  }

  .card-footer {
    padding: 12px;
    border-top: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .ant-btn-primary {
      flex: 1;
    }
  }
}

.recycle-content {
  height: 100%;
  overflow: auto;
  padding: 20px;

  .empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .recycle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 8px 0;
    margin-bottom: 24px;
  }
}

.recycle-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 280px;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    position: relative;
    flex-shrink: 0;
    height: 140px;
    overflow: hidden;

    .flow-preview {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .card-content {
    padding: 16px 16px 0 16px;
    flex: 1;

    .flow-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 12px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .flow-description {
      font-size: 14px;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .card-footer {
    padding: 4px 12px;
    border-top: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    .flow-info {
      flex: 1;

      .delete-time {
        font-size: 12px;
        color: #999;
        margin-bottom: 4px;
      }
    }

    .more-btn {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
}

.danger-link {
  color: #ff4d4f;
}

:deep(.danger-item) {
  color: #ff4d4f;
}

// 全局 section-header 美化
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 8px 8px;
  margin: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  min-height: 44px;
  background: transparent;

  .section-title {
    font-size: 17px;
    font-weight: 600;
    color: #222;
    letter-spacing: 1px;
  }
}
</style>
