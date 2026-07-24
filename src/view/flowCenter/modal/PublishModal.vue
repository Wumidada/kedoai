<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.publishFile')"
    :footer="false"
    width="600px"
  >
    <div class="publish-modal">
      <div class="flow-info">
        <h4>{{ $t('flow.flowInfo') }}</h4>
        <div class="info-card">
          <div class="info-item">
            <span class="label">{{ $t('flow.name') }}</span>
            <span>{{ flow?.f_Caption }}</span>
          </div>
          <div v-if="flow?.f_Description" class="info-item">
            <span class="label">{{ $t('flow.description') }}</span>
            <span>{{ flow.f_Description }}</span>
          </div>
        </div>
      </div>
      
      <div class="category-select">
        <h4>{{ $t('flow.selectCategory') }}</h4>
        <a-select
          v-model:value="selectedCategory"
          :placeholder="$t('flow.pleaseSelectCategory')"
          style="width: 100%"
          :loading="categoriesLoading"
        >
          <a-select-option 
            v-for="category in categories" 
            :key="category.f_ItemValue" 
            :value="category.f_ItemValue"
          >
            {{ category.f_ItemName }}
          </a-select-option>
        </a-select>
      </div>
      
      <div class="publish-actions">
        <a-space>
          <a-button 
            type="primary" 
            :loading="publishing"
            @click="handlePublish"
          >
            {{ $t('flow.publish') }}
          </a-button>
          <a-button @click="handleCancel">
            {{ $t('flow.cancel') }}
          </a-button>
        </a-space>
      </div>
    </div>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/modal/Index.vue'
import * as flowCenterApi from '@/api/flowcenter'
import { awaitWrapper } from '@/api'

interface Props {
  open: boolean
  flow: any
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const modalVisible = ref(false)
const selectedCategory = ref('')
const categories = ref<any[]>([])
const categoriesLoading = ref(false)
const publishing = ref(false)

// 监听props变化
watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (newVal) {
    loadCategories()
  }
})

// 监听内部visible变化
watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

// 方法
const loadCategories = async () => {
  try {
    categoriesLoading.value = true
    const [err, response] = await awaitWrapper(
      flowCenterApi.getFlowIndustryCategory({
        mBIIndustryCategory: "IndustryCategory"
      })
    )

    if (err) {
      console.error('获取分类失败:', err)
      return
    }

    categories.value = response.data || []
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0].f_ItemValue
    }
  } catch (error) {
    console.error('获取分类失败:', error)
  } finally {
    categoriesLoading.value = false
  }
}

const handleCancel = () => {
  modalVisible.value = false
}

const handlePublish = async () => {
  if (!selectedCategory.value) {
    message.error(t('flow.categoryRequired'))
    return
  }

  try {
    publishing.value = true
    const [err] = await awaitWrapper(
      flowCenterApi.publishFlow({
        onionFlowId: props.flow.f_Id,
        flowtype: selectedCategory.value
      })
    )

    if (err) {
      message.error(t('flow.publishFailed'))
      return
    }

    message.success(t('flow.publishSuccess'))
    emit('success')
    modalVisible.value = false
  } catch (error) {
    console.error('发布失败:', error)
    message.error(t('flow.publishFailed'))
  } finally {
    publishing.value = false
  }
}
</script>

<style scoped lang="scss">
.publish-modal {
  .flow-info {
    margin-bottom: 24px;
    
    h4 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
    
    .info-card {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      
      .info-item {
        margin-bottom: 8px;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .label {
          font-weight: bold;
          color: #666;
          margin-right: 8px;
        }
      }
    }
  }
  
  .category-select {
    margin-bottom: 24px;
    
    h4 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
  }
  
  .publish-actions {
    text-align: center;
  }
}
</style> 