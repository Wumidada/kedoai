<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.editTeamName')"
    :footer="false"
  >
    <div class="edit-team-name-modal">
      <a-form 
        layout="vertical" 
        :model="formData"
        @finish="handleSubmit"
        ref="formRef"
      >
        <a-form-item 
          :label="$t('flow.teamName')" 
          name="caption"
          :rules="[{ required: true, message: $t('flow.teamNameRequired') }]"
        >
          <a-input
            v-model:value="formData.caption"
            :placeholder="$t('flow.enterTeamName')"
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
              {{ $t('flow.confirmModify') }}
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
  team: any
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

const modalVisible = ref(false)
const formData = reactive({
  caption: ''
})

watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (newVal && props.team) {
    formData.caption = props.team.f_TeamName || ''
  }
})

watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

const handleCancel = () => {
  modalVisible.value = false
}

const handleSubmit = async () => {
  try {
    loading.value = true
    const [err] = await awaitWrapper(
      flowCenterApi.modifyTeam({
        f_Id: props.team.f_Id,
        f_Caption: formData.caption.trim(),
        f_UserId: String(userStore.getUserId)
      })
    )
    if (err) {
      message.error(t('flow.modifyFailed'))
      return
    }
    message.success(t('flow.modifySuccess'))
    emit('success')
    modalVisible.value = false
  } catch (error) {
    message.error(t('flow.modifyFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.edit-team-name-modal {
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