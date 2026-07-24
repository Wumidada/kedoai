<template>
  <div class="folder-detail-container">
    <!-- 导航头部 -->
    <div class="folder-header">
      <div class="folder-header-left">
        <div class="back-button">
          <router-link :to="`/flowCenter/team/${teamId}`">
            <a-button type="text">
              <template #icon>
                <LeftOutlined />
              </template>
            </a-button>
          </router-link>
        </div>
        <span class="folder-header-left-title">{{ folderName || $t('flow.loading') }}</span>
      </div>

      <a-button type="primary" @click="showCreateFlowModal">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ $t('flow.createNewFile') }}
      </a-button>
    </div>

    <!-- 文件列表 -->
    <div class="file-content">
      <a-spin :spinning="loading" size="large">
        <div class="grid-view">
          <div v-if="fileList.length === 0" class="empty-state">
            <a-empty
              :description="$t('flow.noFiles')"
              :image="Empty.PRESENTED_IMAGE_SIMPLE"
            >
              <a-button type="primary" @click="showCreateFlowModal">
                {{ $t('flow.createFirstFile') }}
              </a-button>
            </a-empty>
          </div>

          <div v-else class="files-grid">
            <div v-for="flow in fileList" :key="flow.f_Id" class="flow-card">
              <div class="card-header">
                <div class="flow-preview">
                  <a-image
                    :src="flow.f_ImgUrl || defaultImg"
                    :alt="$t('flow.workflowPreview')"
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
                        @click="(info) => handleFlowAction(info.key, flow)"
                      >
                        <a-menu-item key="publish">{{ $t('flow.publishFile') }}</a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="edit">{{ $t('flow.editInfo') }}</a-menu-item>
                        <a-menu-item key="duplicate">{{ $t('flow.createCopy') }}</a-menu-item>
                        <a-menu-item key="delete" class="danger-item"
                          >{{ $t('flow.deleteFile') }}</a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown> -->
                </div>
              </div>

              <div class="card-footer">
                <a-button type="primary" block @click="handleOpenFlow(flow)"
                  >{{ $t('flow.openFile') }}</a-button
                >
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- 弹窗组件 -->
    <CreateFlowModal
      v-model:open="createFlowModalVisible"
      :team-id="teamId"
      :file-group-id="folderId"
      @success="handleCreateFlowSuccess"
    />

    <EditFlowModal
      v-model:open="editFlowModalVisible"
      :flow="currentFlow"
      @success="handleEditFlowSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { message, Empty } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";
import {
  PlusOutlined,
  BranchesOutlined,
  MoreOutlined,
  UserOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import { CreateFlowModal, EditFlowModal } from "../../modal";
import { useI18n } from "vue-i18n";

// 导入默认图片
const defaultImg = new URL(
  "@/assets/images/default_template.png",
  import.meta.url
).href;

const route = useRoute();
const userStore = useUserStore();
const { t } = useI18n();

// 响应式数据
const loading = ref(false);
const sortBy = ref("updateTime");
const fileList = ref<any[]>([]);
const createFlowModalVisible = ref(false);
const editFlowModalVisible = ref(false);
const currentFlow = ref<any>(null);

// 计算属性
const teamId = computed(() => route.params.teamId as string);
const folderId = computed(() => route.params.folderId as string);
const folderName = ref(""); // 将从API获取文件夹名称
const userId = computed(() => userStore.getUserId);

// 方法
const loadFolderInfo = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamFileGroupList({
        F_TeamId: teamId.value,
        UserId: String(userId.value),
      })
    );

    if (err) {
      console.error("获取文件夹信息失败:", err);
      return;
    }

    const folders = response.data || [];
    const currentFolder = folders.find(
      (folder) => folder.f_Id === folderId.value
    );
    if (currentFolder) {
      folderName.value = currentFolder.f_Caption;
    }
  } catch (error) {
    console.error("获取文件夹信息失败:", error);
  }
};

const loadFolderFiles = async () => {
  try {
    loading.value = true;
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamListInFileGroup({
        F_TeamId: teamId.value,
        FileGroupId: folderId.value,
      })
    );

    if (err) {
      console.error("获取文件夹内文件列表失败:", err);
      return;
    }

    fileList.value = response.data || [];
  } catch (error) {
    console.error("获取文件夹内文件列表失败:", error);
  } finally {
    loading.value = false;
  }
};

const showCreateFlowModal = () => {
  createFlowModalVisible.value = true;
};

const handleCreateFlowSuccess = () => {
  loadFolderFiles();
};

const handleEditFlowSuccess = () => {
  loadFolderFiles();
};

const handleOpenFlow = (flow: any) => {
  window.open(`/kedoAiFlow?id=${flow.f_Id}`, "_blank");
};

const handleFlowAction = async (action: string, flow: any) => {
  switch (action) {
    case "publish":
      // TODO: 实现发布功能
      message.info(t("flow.publishFeatureDeveloping"));
      break;
    case "edit":
      currentFlow.value = flow;
      editFlowModalVisible.value = true;
      break;

    case "duplicate":
      await duplicateFlow(flow);
      break;

    case "delete":
      await deleteFlow(flow);
      break;
  }
};

const duplicateFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.duplicateFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value),
        f_NewCaption: `${flow.f_Caption} - ${t('flow.copy')}`,
      })
    );

    if (err) {
      message.error(t("flow.copyFailed"));
      return;
    }

    message.success(t("flow.copySuccess"));
    loadFolderFiles();
  } catch (error) {
    console.error("复制工作流失败:", error);
    message.error(t("flow.copyFailed"));
  }
};

const deleteFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.removeFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value),
      })
    );

    if (err) {
      message.error(t("flow.deleteFailed"));
      return;
    }

    message.success(t("flow.deleteSuccess"));
    loadFolderFiles();
  } catch (error) {
    console.error("删除工作流失败:", error);
    message.error(t("flow.deleteFailed"));
  }
};

const handleSortChange = () => {
  // 根据排序方式重新获取数据
  loadFolderFiles();
};

const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

// 生命周期
onMounted(() => {
  if (folderId.value) {
    loadFolderInfo();
    loadFolderFiles();
  }
});
</script>

<style scoped lang="scss">
.folder-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}

.folder-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  &-left {
    display: flex;
    align-items: center;
    gap: 16px;
    .back-button {
      .ant-btn {
        color: #666;
        font-size: 16px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    &-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.file-content {
  flex: 1;
  overflow: hidden;
}

.grid-view {
  height: 100%;

  .empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .files-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 8px 0;
    margin-bottom: 24px;
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

:deep(.danger-item) {
  color: #ff4d4f;
}
</style>
