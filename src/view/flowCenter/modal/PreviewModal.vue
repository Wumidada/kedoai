<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.workflowPreviewTitle')"
    :footer="false"
    width="600px"
  >
    <div class="preview-modal">
      <div class="preview-header">
        <h3>{{ flow?.f_Caption }}</h3>
        <p v-if="flow?.f_Description">{{ flow.f_Description }}</p>
      </div>
      
      <div class="preview-image">
        <a-image
          :src="flow?.f_ImgUrl || defaultTemplateImage"
          :preview="false"
          style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px;"
        />
      </div>
      
      <div class="preview-actions">
        <a-space>
          <a-button type="primary" @click="handleOpenFlow">
            {{ $t('flow.openWorkflow') }}
          </a-button>
          <a-button @click="handleCancel">
            {{ $t('flow.close') }}
          </a-button>
        </a-space>
      </div>
    </div>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/modal/Index.vue'

interface Props {
  open: boolean
  flow: any
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'open-flow', flow: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const modalVisible = ref(false)
const defaultTemplateImage = '/src/assets/images/flow.svg'

// 监听props变化
watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
})

// 监听内部visible变化
watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

// 方法
const handleCancel = () => {
  modalVisible.value = false
}

const handleOpenFlow = () => {
  emit('open-flow', props.flow)
  modalVisible.value = false
}
</script>

<style scoped lang="scss">
.preview-modal {
  .preview-header {
    margin-bottom: 20px;
    
    h3 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: #666;
      line-height: 1.4;
      font-size: 14px;
    }
  }
  
  .preview-image {
    margin-bottom: 20px;
  }
  
  .preview-actions {
    text-align: center;
  }
}
</style> 