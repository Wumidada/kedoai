<template>
  <div class="recycle-bin-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <!-- <a-button 
          @click="handleClearAll"
          :disabled="flowList.length === 0"
          danger
        >
          清空回收站
        </a-button> -->
      </div>
      
      <div class="toolbar-right">
        <a-input-search
          v-model:value="searchKeyword"
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
        <div v-if="flowList.length === 0" class="empty-state">
          <a-empty 
            :description="$t('flow.emptyRecycleBin')" 
            :image="Empty.PRESENTED_IMAGE_SIMPLE"
          />
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
            </div>
            
            <div class="card-footer">
              <div class="flow-info">
                <div class="delete-time">{{ $t('flow.deletedAt') }} {{ formatTime(flow.f_DeleteDate) }}</div>
                <!-- <div class="expire-time" :class="{ 'expire-soon': isExpireSoon(flow.f_DeleteTime) }">
                  {{ getExpireTime(flow.f_DeleteTime) }} 过期
                </div> -->
              </div>
              <a-dropdown trigger="click" placement="topRight">
                <a-button type="text" size="small" class="more-btn" @click.stop>
                  <MoreOutlined />
                </a-button>
                <template #overlay>
                  <a-menu @click="(info) => handleFlowAction(info.key, flow)">
                    <a-menu-item key="restore">{{ $t('flow.restore') }}</a-menu-item>
                    <!-- <a-menu-item key="delete" class="danger-item">永久删除</a-menu-item> -->
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h } from 'vue'
import { message, Empty, Modal, Typography } from 'ant-design-vue'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  BranchesOutlined,
  ExclamationCircleOutlined,
  MoreOutlined
} from '@ant-design/icons-vue'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'
import defaultImg from '@/assets/images/default_template.png'
import debounce from 'lodash-es/debounce'

const { Paragraph } = Typography

const userStore = useUserStore()
const { t } = useI18n()

// 响应式数据
const loading = ref(false)
const flowList = ref<any[]>([])
const selectedRows = ref<any[]>([])
const searchKeyword = ref('')

// 计算属性
const userId = computed(() => userStore.getUserId)

// 表格列配置
const columns = [
  {
    title: '名称',
    key: 'name',
    dataIndex: 'f_Caption',
    width: 200
  },
  {
    title: '描述',
    key: 'description',
    dataIndex: 'f_Description',
    ellipsis: true
  },
  {
    title: '删除时间',
    key: 'deleteTime',
    dataIndex: 'f_DeleteTime',
    width: 180
  },
  {
    title: '过期时间',
    key: 'expireTime',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    align: 'center'
  }
]

// 行选择配置
const rowSelection = {
  selectedRowKeys: computed(() => selectedRows.value.map(row => row.f_Id)),
  onChange: (selectedRowKeys: string[], selectedRowsData: any[]) => {
    selectedRows.value = selectedRowsData
  }
}

// 方法
const loadRecycleBinList = async () => {
  try {
    loading.value = true
    const [err, response] = await awaitWrapper(
      flowCenterApi.getRecycleBinFlows({
        userId: String(userId.value),
        QueryField: searchKeyword.value
      })
    )

    if (err) {
      console.error('获取回收站列表失败:', err)
      return
    }

    flowList.value = response.data || []
  } catch (error) {
    console.error('获取回收站列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleRestore = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.restoreFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value)
      })
    )

    if (err) {
      message.error(t('flow.restoreFailed'))
      return
    }

    message.success(t('flow.restoreSuccess'))
    loadRecycleBinList()
  } catch (error) {
    console.error('恢复工作流失败:', error)
    message.error(t('flow.restoreFailed'))
  }
}

const handlePermanentDelete = async (flow: any) => {
  try {
    const [err] = await awaitWrapper(
      flowCenterApi.permanentDeleteFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value)
      })
    )

    if (err) {
      message.error(t('flow.permanentDeleteFailed'))
      return
    }

    message.success(t('flow.permanentDeleteSuccess'))
    loadRecycleBinList()
  } catch (error) {
    console.error('永久删除工作流失败:', error)
    message.error(t('flow.permanentDeleteFailed'))
  }
}

const handleBatchRestore = async () => {
  try {
    const promises = selectedRows.value.map(flow =>
      flowCenterApi.restoreFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value)
      })
    )

    const results = await Promise.all(promises.map(p => awaitWrapper(p)))
    const failedCount = results.filter(([err]) => err).length
    
    if (failedCount === 0) {
      message.success(t('flow.batchRestoreSuccess', { count: selectedRows.value.length }))
    } else {
      message.warning(t('flow.batchRestorePartial', { count: failedCount }))
    }

    selectedRows.value = []
    loadRecycleBinList()
  } catch (error) {
    console.error('批量恢复失败:', error)
    message.error(t('flow.batchRestoreFailed'))
  }
}

const handleBatchPermanentDelete = async () => {
  try {
    const promises = selectedRows.value.map(flow =>
      flowCenterApi.permanentDeleteFlow({
        f_Id: flow.f_Id,
        f_UserId: String(userId.value)
      })
    )

    const results = await Promise.all(promises.map(p => awaitWrapper(p)))
    const failedCount = results.filter(([err]) => err).length
    
    if (failedCount === 0) {
      message.success(t('flow.batchDeleteSuccess', { count: selectedRows.value.length }))
    } else {
      message.warning(t('flow.batchDeletePartial', { count: failedCount }))
    }

    selectedRows.value = []
    loadRecycleBinList()
  } catch (error) {
    console.error('批量删除失败:', error)
    message.error(t('flow.batchDeleteFailed'))
  }
}

const handleClearAll = () => {
  Modal.confirm({
    title: t('flow.confirmClearRecycleBin'),
    content: t('flow.clearRecycleBinWarning'),
    icon: () => h(ExclamationCircleOutlined),
    okText: t('flow.confirm'),
    cancelText: t('flow.cancel'),
    okType: 'danger',
    onOk: async () => {
      selectedRows.value = [...flowList.value]
      await handleBatchPermanentDelete()
    }
  })
}

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getExpireTime = (deleteTime: string) => {
  if (!deleteTime) return ''
  const expireDate = new Date(new Date(deleteTime).getTime() + 30 * 24 * 60 * 60 * 1000)
  return formatTime(expireDate.toISOString())
}

const isExpireSoon = (deleteTime: string) => {
  if (!deleteTime) return false
  const expireDate = new Date(new Date(deleteTime).getTime() + 30 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const diffDays = (expireDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= 7 // 7天内过期
}

const debouncedLoadRecycleBinList = debounce(() => {
  loadRecycleBinList()
}, 400)

const handleSearch = () => {
  loadRecycleBinList()
}

const handleSearchChange = (e: any) => {
  searchKeyword.value = e.target.value
  debouncedLoadRecycleBinList()
}

const handleFlowAction = (action: string, flow: any) => {
  if (action === 'restore') {
    handleRestore(flow)
  } else if (action === 'delete') {
    handlePermanentDelete(flow)
  }
}

// 生命周期
onMounted(() => {
  loadRecycleBinList()
})
</script>

<style scoped lang="scss">
.recycle-bin-container {
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
}

.warning-alert {
  margin-bottom: 24px;
}

.content-area {
  flex: 1;
  overflow: auto;
  
  .empty-state {
    height: 100%;
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

.flow-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;

  .flow-icon {
    color: #999;
    font-size: 16px;
  }

  .flow-name {
    color: #666;
  }
}

.flow-description {
  color: #666;
}

.expire-soon {
  color: #ff4d4f;
  font-weight: 500;
}

.danger-link {
  color: #ff4d4f;
  
  &:hover {
    color: #ff7875;
  }
}

.batch-actions {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1000;

  .batch-info {
    color: #666;
    font-size: 14px;
  }
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f5f7fa;
}

:deep(.ant-alert) {
  border-radius: 6px;
}

.flow-card {
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

      .expire-time {
        font-size: 12px;
        color: #999;
        
        &.expire-soon {
          color: #ff4d4f;
          font-weight: 500;
        }
      }
    }

    .more-btn {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
}
</style> 