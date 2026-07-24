<template>
  <div class="my-files-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <a-button type="primary" @click="showCreateFlowModal">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ $t('flow.newWorkflow') }}
        </a-button>
      </div>
      
      <div class="toolbar-right">
        <a-input-search
          v-model:value="searchQuery"
          :placeholder="$t('flow.searchWorkflow')"
          style="width: 250px"
          @search="handleSearch"
          @change="handleSearchChange"
          allow-clear
        />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <a-spin :spinning="loading" size="large">
        <!-- 网格视图 -->
        <div class="grid-view">
          <div v-if="flowList.length === 0" class="empty-state">
            <a-empty 
              :description="$t('flow.noWorkflows')" 
              :image="Empty.PRESENTED_IMAGE_SIMPLE"
            >
              <a-button type="primary" @click="showCreateFlowModal">
                {{ $t('flow.createFirstWorkflow') }}
              </a-button>
            </a-empty>
          </div>
          
          <div v-else class="flow-grid">
            <div
              v-for="flow in flowList"
              :key="flow.f_Id"
              class="flow-card"
            >
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
                <h3 class="flow-title" :title="flow.f_Caption">{{ flow.f_Caption }}</h3>
                <Paragraph 
                  class="flow-description" 
                  :title="flow.f_Description || $t('flow.noDescription')"
                  :ellipsis="{ rows: 2, tooltip: false }"
                >
                  {{ flow.f_Description || $t('flow.noDescription') }}
                </Paragraph>
                <div class="update-row">
                  <span class="update-time">{{ $t('flow.createdAt') }} {{ formatTime(flow.f_CreateDate) }}</span>
                  <a-dropdown trigger="click" placement="topRight">
                    <a-button type="text" size="small" class="more-btn" @click.stop>
                      <MoreOutlined />
                    </a-button>
                    <template #overlay>
                      <a-menu @click="(info) => handleFlowAction(info.key, flow)">
                        <a-menu-item key="publish">{{ $t('flow.publishFile') }}</a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="edit">{{ $t('flow.editInfo') }}</a-menu-item>
                        <a-menu-item key="duplicate">{{ $t('flow.createCopy') }}</a-menu-item>
                        <a-menu-item key="delete" class="danger-item">{{ $t('flow.deleteFile') }}</a-menu-item>
                        <a-menu-divider/>
                        <a-menu-item key="copy">{{ $t('flow.copyLink') }}Id</a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </div>
              
              <div class="card-footer">
                <a-button type="primary" block @click="handleOpenFlow(flow)">{{ $t('flow.openFile') }}</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="flowList.length > 0">
      <a-pagination
        v-model:current="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :show-size-changer="false"
        :show-quick-jumper="false"
        :show-total="(total, range) => `${$t('flow.range')} ${range[0]}${$t('flow.to')}${range[1]} ${$t('flow.items')}，${$t('flow.total')} ${total} ${$t('flow.items')}`"
        :page-size-options="['10', '20', '50', '100']"
        @change="handlePageChange"
        @show-size-change="handlePageSizeChange"
      />
    </div>

    <!-- 创建工作流弹窗 -->
    <CreateFlowModal
      v-model:open="createFlowModalVisible"
      @success="handleCreateFlowSuccess"
    />

    <!-- 编辑工作流弹窗 -->
    <EditFlowModal
      v-model:open="editFlowModalVisible"
      :flow="currentFlow"
      @success="handleEditFlowSuccess"
    />

    <!-- 预览弹窗 -->
    <PreviewModal
      v-model:open="previewModalVisible"
      :flow="previewFlow"
      @open-flow="handleOpenFlow"
    />

    <!-- 发布弹窗 -->
    <PublishModal
      v-model:open="publishModalVisible"
      :flow="publishFlow"
      @success="handlePublishSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { message, Empty, Typography } from 'ant-design-vue'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  PlusOutlined,
  BranchesOutlined,
  MoreOutlined
} from '@ant-design/icons-vue'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'
import { 
  CreateFlowModal, 
  EditFlowModal, 
  PreviewModal, 
  PublishModal 
} from '../modal'
import defaultImg from '@/assets/images/default_template.png'
import debounce from 'lodash-es/debounce'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'

const userStore = useUserStore()
const { Paragraph } = Typography
const router = useRouter()
const { t } = useI18n()
const { copy: copyToClipboard, isSupported: clipboardSupported } = useClipboard()

// 响应式数据
const loading = ref(false)
const searchQuery = ref('')
const flowList = ref<any[]>([])
const createFlowModalVisible = ref(false)
const editFlowModalVisible = ref(false)
const currentFlow = ref<any>(null)
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

// 预览相关
const previewModalVisible = ref(false)
const previewFlow = ref<any>(null)

// 发布相关
const publishModalVisible = ref(false)
const publishFlow = ref<any>(null)

// 计算属性
const userId = computed(() => userStore.getUserId)

// 方法
const debouncedLoadFlowList = debounce(() => {
  pagination.page = 1
  loadFlowList()
}, 400)

const loadFlowList = async () => {
  try {
    loading.value = true
    const [err, response] = await awaitWrapper(
      flowCenterApi.getFlowList({
        userId: String(userId.value),
        pageIndex: pagination.page,
        pageSize: pagination.pageSize,
        QueryField: searchQuery.value
      })
    )

    if (err) {
      console.error('获取工作流列表失败:', err)
      return
    }
    
    flowList.value = response.data?.items || []
    pagination.total = response.data?.totalCount || 0
  } catch (error) {
    console.error('获取工作流列表失败:', error)
  } finally {
    loading.value = false
  }
}

const showCreateFlowModal = () => {
  createFlowModalVisible.value = true
}

const handleCreateFlowSuccess = () => {
  loadFlowList()
}

const handleEditFlowSuccess = () => {
  loadFlowList()
}

const handleFlowClick = (flow: any) => {
  // 显示预览弹窗
  previewFlow.value = flow
  previewModalVisible.value = true
}

const handleOpenFlow = (flow: any) => {
  // 新开一个KedoAiFlow页面并带参数
  const query = new URLSearchParams({
    flowId: flow.flowId || flow.f_Id || '',
    flowName: flow.flowName || flow.f_Caption || '',
    flowDescription: flow.flowDescription || flow.f_Description || '',
    userId: String(userId.value) ||''
  }).toString()
  window.open(`/#/kedoAiFlow?${query}`, '_blank')
}

const handleFlowAction = async (action: string, flow: any) => {
  switch (action) {
    case 'open':
      handleFlowClick(flow)
      break
      
    case 'publish':
      publishFlow.value = flow
      publishModalVisible.value = true
      break
      
    case 'edit':
      currentFlow.value = flow
      editFlowModalVisible.value = true
      break
      
    case 'duplicate':
      await duplicateFlow(flow)
      break
      
    case 'delete':
      await deleteFlow(flow)
      break

    case 'copy':
      try {
        const id = flow?.flowId || flow?.f_Id || ''
        if (!id) {
          message.error(t('flow.copyFailed'))
          break
        }
        await copyToClipboard(id)
        message.success(t('flow.copySuccess'))
      } catch (e) {
        message.error(t('flow.copyFailed'))
      }
      break
  }
}

const handlePublishSuccess = () => {
  // 发布成功后的处理
  console.log('发布成功')
}

const duplicateFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.createFlow({
        f_Caption: `${flow.f_Caption} - 副本`,
        f_Description: flow.f_Description || '',
        f_CreateUserId: String(userId.value),
        f_TeamId: flow.f_TeamId || undefined,
        f_TemplateId: flow.f_TemplateId || undefined
      })
    )

    if (err) {
      message.error(t('flow.copyFailed'))
      return
    }

    message.success(t('flow.copySuccess'))
    loadFlowList()
  } catch (error) {
    console.error('复制工作流失败:', error)
    message.error(t('flow.copyFailed'))
  }
}

const deleteFlow = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.removeFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value)
      })
    )

    if (err) {
      message.error(t('flow.deleteFailed'))
      return
    }

    message.success(t('flow.deleteSuccess'))
    loadFlowList()
  } catch (error) {
    console.error('删除工作流失败:', error)
    message.error(t('flow.deleteFailed'))
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadFlowList()
}

const handleSearchChange = (e: any) => {
  searchQuery.value = e.target.value
  debouncedLoadFlowList()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadFlowList()
}

const handlePageSizeChange = (current: number, size: number) => {
  pagination.page = 1
  pagination.pageSize = size
  loadFlowList()
}

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 生命周期
onMounted(() => {
  loadFlowList()
})
</script>

<style scoped lang="scss">
.my-files-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.content-area {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.grid-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flow-grid {
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

.pagination-wrapper {
  margin-top: 24px;
  text-align: center;
}
</style> 