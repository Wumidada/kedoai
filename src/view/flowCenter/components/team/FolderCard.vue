<template>
  <div class="folder-card">
    <div class="folder-content" @click="handleFolderClick">
      <div class="folder-icon">
        <FolderOutlined />
      </div>
      <div class="folder-name">{{ folder.f_Caption }}</div>
    </div>
    
    <div class="folder-actions">
      <a-tooltip :title="$t('flow.rename')">
        <a-button 
          type="text" 
          size="small" 
          @click.stop="handleRename"
        >
          <template #icon>
            <EditOutlined />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="$t('flow.delete')">
        <a-popconfirm
          :title="$t('flow.confirmDeleteFolder')"
          @confirm="handleDelete"
        >
          <a-button 
            type="text" 
            size="small" 
            danger
            @click.stop
          >
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </a-popconfirm>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { FolderOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'

interface Props {
  folder: any
  teamId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  rename: [folder: any]
  delete: [folderId: string]
  refresh: []
}>()

const router = useRouter()
const loading = ref(false)
const { t } = useI18n()

const handleFolderClick = () => {
  router.push({
    path: `/flowCenter/team/${props.teamId}/${props.folder.f_Id}`
  })
}

const handleRename = () => {
  emit('rename', props.folder)
}

const handleDelete = () => {
  emit('delete', props.folder.f_Id)
}
</script>

<style scoped lang="scss">
.folder-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  height: 180px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    transform: translateY(-2px);
  }

  .folder-content {
    flex: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .folder-icon {
    color: #1890ff;
    font-size: 48px;
    margin-bottom: 12px;
  }

  .folder-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    max-width: 100%;
  }

  .folder-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;

    .ant-btn {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  &:hover .folder-actions {
    opacity: 1;
  }
}
</style> 