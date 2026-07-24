<template>
  <div class="recycle-content">
    <a-spin :spinning="loading" size="large">
      <a-table
        :columns="columns"
        :data-source="recycleList"
        :pagination="false"
        row-key="f_Id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="flow-name-cell">
              <BranchesOutlined class="flow-icon" />
              <span class="flow-name">{{ record.f_Caption }}</span>
            </div>
          </template>
          
          <template v-if="column.key === 'deleteTime'">
            {{ formatTime(record.f_DeleteTime) }}
          </template>
          
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleRestore(record)">{{ $t('flow.restore') }}</a>
              <a-popconfirm
                :title="$t('flow.confirmPermanentDelete')"
                @confirm="handlePermanentDelete(record)"
              >
                <a class="danger-link">{{ $t('flow.permanentDelete') }}</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { BranchesOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

interface Props {
  recycleList: any[]
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  restore: [flow: any]
  permanentDelete: [flow: any]
}>()
const { t } = useI18n()

const columns = [
  {
    title: t('flow.name'),
    key: 'name',
    dataIndex: 'f_Caption',
    width: 200
  },
  {
    title: t('flow.deletedAt'),
    key: 'deleteTime',
    dataIndex: 'f_DeleteTime',
    width: 180
  },
  {
    title: t('flow.action'),
    key: 'action',
    width: 150,
    align: 'center'
  }
]

const handleRestore = (flow: any) => {
  emit('restore', flow)
}

const handlePermanentDelete = (flow: any) => {
  emit('permanentDelete', flow)
}

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped lang="scss">
.recycle-content {
  height: 100%;
  overflow: hidden;
}

.flow-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;

  .flow-icon {
    color: #1890ff;
    font-size: 16px;
  }

  .flow-name {
    font-size: 14px;
    color: #333;
  }
}

.danger-link {
  color: #ff4d4f;
}
</style> 