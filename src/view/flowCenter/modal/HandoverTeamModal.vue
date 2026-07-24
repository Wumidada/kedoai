<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.handoverTeam')"
    :footer="false"
  >
    <div class="handover-team-modal">
      <a-form 
        layout="vertical" 
        :model="formData"
        @finish="handleSubmit"
        ref="formRef"
      >
        <a-form-item 
          :label="$t('flow.selectHandoverTarget')" 
          name="toUserId"
          :rules="[{ required: true, message: $t('flow.handoverTargetRequired') }]"
        >
          <a-select v-model:value="formData.toUserId" :placeholder="$t('flow.pleaseSelectHandoverTarget')">
            <a-select-option v-for="m in members" :key="String(m.f_UserId)" :value="String(m.f_UserId)">{{ m.f_UserName }}</a-select-option>
          </a-select>
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
              {{ $t('flow.confirmHandover') }}
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
import request from '@/utils/request'

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
const members = ref<any[]>([])

const modalVisible = ref(false)
const formData = reactive({
  toUserId: ''
})

watch(() => props.open, async (newVal) => {
  modalVisible.value = newVal
  if (newVal && props.team) {
    // 获取团队成员
    const res = await request.get('/OnionFlowTeam/QueryOnionFlowTeamMembersList', { params: { F_TeamId: props.team.f_Id } })
    members.value = (res.data || []).filter((m: any) => String(m.f_UserId) !== String(userStore.getUserId))
    formData.toUserId = ''
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
    await request.post('/OnionFlowTeam/TransferOnionFlowTeamPossession', {
      f_FromUserId: String(userStore.getUserId),
      f_TeamId: props.team.f_Id,
      f_ToUserId: formData.toUserId,
    })
    message.success(t('flow.handoverSuccess'))
    emit('success')
    modalVisible.value = false
  } catch (error) {
    message.error(t('flow.handoverFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.handover-team-modal {
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
}
</style> 