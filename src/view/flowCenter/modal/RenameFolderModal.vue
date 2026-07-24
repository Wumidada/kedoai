<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.renameFolder')"
    :footer="false"
  >
    <div class="rename-folder-modal">
      <a-form 
        layout="vertical" 
        :model="formData"
        @finish="handleSubmit"
        ref="formRef"
      >
        <a-form-item 
          :label="$t('flow.folderName')" 
          name="caption"
          :rules="[
            { required: true, message: $t('flow.folderNameRequired') },
            { min: 1, max: 50, message: $t('flow.folderNameLength') }
          ]"
        >
          <a-input
            v-model:value="formData.caption"
            :placeholder="$t('flow.enterFolderName')"
            maxlength="50"
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
              {{ $t('flow.confirmRename') }}
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
  folder: any
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
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
  caption: ''
})

// 监听props变化
watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (newVal && props.folder) {
    // 设置当前文件夹名称
    formData.caption = props.folder.f_Caption || ''
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
    
    const [err] = await awaitWrapper(
      flowCenterApi.renameFileGroup({
        f_Id: props.folder.f_Id,
        f_FileGroupNewName: formData.caption.trim(),
        f_ModifyUserId: String(userStore.getUserId)
      })
    )

    if (err) {
      console.error('重命名文件夹失败:', err)
      message.error(t('flow.renameFailed'))
      return
    }

    message.success(t('flow.renameSuccess'))
    emit('success')
    modalVisible.value = false
  } catch (error) {
    console.error('重命名文件夹失败:', error)
    message.error(t('flow.renameFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.rename-folder-modal {
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