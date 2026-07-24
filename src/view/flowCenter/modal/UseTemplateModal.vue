<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.useTemplateCreateWorkflow')"
    :footer="false"
  >
    <div class="use-template-modal">
      <!-- <div class="template-info" v-if="template">
        <div class="template-preview">
          <img 
            v-if="template.f_PreviewImage" 
            :src="template.f_PreviewImage" 
            :alt="$t('flow.templatePreviewAlt')"
            class="preview-image"
          />
          <div v-else class="preview-placeholder">
            <BranchesOutlined />
          </div>
        </div>
        
        <div class="template-details">
          <h3 class="template-title">{{ template.f_Caption }}</h3>
          <p class="template-description">{{ template.f_Description }}</p>
          
          <div class="template-tags">
            <a-tag v-if="template.f_IsPopular" color="orange">{{ $t('flow.popular') }}</a-tag>
            <a-tag v-if="template.f_Category" color="blue">{{ getCategoryName(template.f_Category) }}</a-tag>
          </div>
        </div>
      </div>
      
      <a-divider /> -->
      
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
        
        <!-- <a-form-item 
          :label="$t('flow.selectTeam')" 
          name="teamId"
        >
          <a-select
            v-model:value="formData.teamId"
            :placeholder="$t('flow.selectTeamOptional')"
            allow-clear
            class="form-input"
          >
            <a-select-option value="">{{ $t('flow.personalWorkflow') }}</a-select-option>
            <a-select-option 
              v-for="team in teamList" 
              :key="team.f_Id" 
              :value="team.f_Id"
            >
              {{ team.f_Caption }}
            </a-select-option>
          </a-select>
        </a-form-item> -->
        
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
import { ref, reactive, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/modal/Index.vue'
import { useUserStore } from '@/store/user'
import { BranchesOutlined } from '@ant-design/icons-vue'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'

interface Props {
  open: boolean
  template?: any
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
const teamList = ref<any[]>([])
const formData = reactive({
  caption: '',
  description: '',
  teamId: ''
})

// 分类名称映射
const categoryNames = {
  automation: 'automation',
  data: 'dataProcessing',
  ai: 'aiApplication',
  business: 'businessProcess'
}

// 监听props变化
watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (newVal && props.template) {
    // 填充默认数据
    formData.caption = `${props.template.f_Caption} - ${t('flow.template')}`
    formData.description = props.template.f_Description || ''
    formData.teamId = ''
  }
})

// 监听内部visible变化
watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

// 方法
const loadTeamList = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamInfoList({
        F_UserId: String(userStore.getUserId)
      })
    )

    if (err) {
      console.error('获取团队列表失败:', err)
      return
    }

    teamList.value = response.data || []
  } catch (error) {
    console.error('获取团队列表失败:', error)
  }
}

const handleCancel = () => {
  modalVisible.value = false
}

const handleSubmit = async () => {
  if (!props.template?.f_Id) return

  try {
    loading.value = true  
    const [err, response] = await awaitWrapper(
      flowCenterApi.createFlow({
        f_Caption: formData.caption,
        f_Description: formData.description,
        f_CreateUserId: String(userStore.getUserId),
        f_TeamId: formData.teamId || undefined,
        f_OnionFlowSchemeData: props.template.f_OnionFlowSchemeData
      })
    )

    if (err) {
      console.error('基于模板创建工作流失败:', err)
      message.error(t('flow.createFromTemplateFailed'))
      return
    }

    message.success(t('flow.createFromTemplateSuccess'))
    emit('success', response.data)
    modalVisible.value = false
  } catch (error) {
    console.error('基于模板创建工作流失败:', error)
    message.error(t('flow.createFromTemplateFailed'))
  } finally {
    loading.value = false
  }
}

const getCategoryName = (category: string) => {
  const translationKey = categoryNames[category];
  return translationKey ? t(`flow.${translationKey}`) : category;
}

// 生命周期
onMounted(() => {
  // loadTeamList()
})
</script>

<style scoped lang="scss">
.use-template-modal {
  .template-info {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    .template-preview {
      width: 120px;
      height: 80px;
      background: #f5f5f5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      .preview-placeholder {
        color: #999;
        font-size: 24px;
      }
    }

    .template-details {
      flex: 1;

      .template-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0 0 8px 0;
      }

      .template-description {
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        margin: 0 0 12px 0;
      }

      .template-tags {
        display: flex;
        gap: 8px;
      }
    }
  }

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

  :deep(.ant-tag) {
    margin: 0;
    border-radius: 4px;
  }
}
</style> 