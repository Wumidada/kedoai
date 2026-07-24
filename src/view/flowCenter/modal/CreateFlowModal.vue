<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.createWorkflow')"
    :footer="false"
  >
    <div class="create-flow-modal">
      <a-form 
        layout="vertical" 
        :model="formData"
        @finish="handleSubmit"
        ref="formRef"
      >
        <a-form-item 
          :label="$t('flow.workflowName')" 
          name="caption"
          :rules="[{ required: true, message: $t('flow.workflowNameRequired') }]"
        >
          <a-input
            v-model:value="formData.caption"
            :placeholder="$t('flow.enterWorkflowName')"
            maxlength="50"
            show-count
            class="form-input"
          />
        </a-form-item>
        
        <a-form-item 
          :label="$t('flow.workflowDescription')" 
          name="description"
        >
          <a-textarea
            v-model:value="formData.description"
            :placeholder="$t('flow.enterWorkflowDescription')"
            :rows="3"
            maxlength="200"
            show-count
            class="form-input"
          />
        </a-form-item>
        
        <a-form-item class="form-buttons">
          <a-space>
            <a-button @click="handleCancel">
              {{ $t('flow.cancel') }}
            </a-button>
            <a-button 
              type="primary" 
              html-type="submit"
              :loading="loading"
            >
              {{ $t('flow.createWorkflow') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/modal/Index.vue'
import { useUserStore } from '@/store/user'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'

interface Props {
  open: boolean
  teamId?: string,
  fileGroupId?: string,
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success', flow: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const userStore = useUserStore()
const { t } = useI18n()
const formRef = ref()
const loading = ref(false)

// 响应式数据
const modalVisible = ref(false)
const formData = reactive({
  caption: '',
  description: ''
})

// 监听props变化
watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (newVal) {
    // 重置表单
    formData.caption = ''
    formData.description = ''
  }
})

// 监听内部visible变化
watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

// 方法
const handleCancel = () => {
  modalVisible.value = false
}

const handleSubmit = async () => {
  try {
    loading.value = true
    
    const [err, response] = await awaitWrapper(
      flowCenterApi.createFlow({
        f_Caption: formData.caption,
        f_Description: formData.description,
        f_CreateUserId: String(userStore.getUserId),
        f_TeamId: props.teamId || "",
        f_TeamOnionFlowFileGroup: props.fileGroupId || ""
      })
    )

    if (err) {
      console.error('创建工作流失败:', err)
      message.error(t('flow.createWorkflowFailed'))
      return
    }

    message.success(t('flow.createWorkflowSuccess'))
    emit('success', response.data)
    modalVisible.value = false
  } catch (error) {
    console.error('创建工作流失败:', error)
    message.error(t('flow.createWorkflowFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.create-flow-modal {
  .form-input {
    border-radius: 6px;
    
    &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .form-buttons {
    margin-top: 24px;
    margin-bottom: 0;
    
    :deep(.ant-form-item-control-input-content) {
      display: flex;
      justify-content: flex-end;
    }
  }

  :deep(.ant-form-item-label > label) {
    font-weight: 600;
    color: #333;
  }

  :deep(.ant-input-show-count-suffix) {
    color: #999;
  }
}
</style> 