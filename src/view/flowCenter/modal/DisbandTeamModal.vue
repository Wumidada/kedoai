<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.disbandTeam')"
    :footer="false"
  >
    <div class="disband-team-modal">
      <div class="danger-text">{{ $t('flow.disbandTeamWarning') }}</div>
      <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
        <a-space>
          <a-button @click="handleCancel">{{ $t('flow.cancel') }}</a-button>
          <a-button type="primary" danger :loading="loading" @click="handleDisband">{{ $t('flow.confirmDisband') }}</a-button>
        </a-space>
      </div>
    </div>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
const loading = ref(false)
const modalVisible = ref(false)

watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
})

watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

const handleCancel = () => {
  modalVisible.value = false
}

const handleDisband = async () => {
  try {
    loading.value = true
    await request.post('/OnionFlowTeam/UnsubscribeOnionFlowTeam', {
      f_UserId: String(userStore.getUserId),
      f_TeamId: props.team.f_Id,
    })
    message.success(t('flow.disbandSuccess'))
    emit('success')
    modalVisible.value = false
  } catch (error) {
    message.error(t('flow.disbandFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.disband-team-modal {
  .danger-text {
    color: #ff4d4f;
    font-size: 16px;
    margin-bottom: 16px;
  }
}
</style> 