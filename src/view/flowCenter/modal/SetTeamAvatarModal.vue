<template>
  <CustomModal
    v-model:open="modalVisible"
    :title="$t('flow.changeTeamAvatar')"
    :footer="false"
  >
    <div class="set-team-avatar-modal">
      <a-upload
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
        accept="image/*"
      >
        <a-button :loading="loading">{{ $t('flow.selectImage') }}</a-button>
      </a-upload>
      <div v-if="previewUrl" class="avatar-preview">
        <img :src="previewUrl" :alt="$t('flow.avatarPreviewAlt')" style="max-width: 120px; max-height: 120px; border-radius: 50%; margin-top: 16px;" />
      </div>
      <div class="form-buttons">
        <a-space>
          <a-button @click="handleCancel">{{ $t('flow.cancel') }}</a-button>
          <a-button type="primary" :loading="loading" @click="handleSubmit" :disabled="!file">{{ $t('flow.confirmChange') }}</a-button>
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
const modalVisible = ref(false)
const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const loading = ref(false)

watch(() => props.open, (newVal) => {
  modalVisible.value = newVal
  if (!newVal) {
    file.value = null
    previewUrl.value = null
  }
})

watch(modalVisible, (newVal) => {
  emit('update:open', newVal)
})

function handleBeforeUpload(f: File) {
  if (f.size > 5 * 1024 * 1024) {
    message.error(t('flow.imageSizeError'))
    return false
  }
  const reader = new FileReader()
  reader.onload = e => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(f)
  file.value = f
  return false
}

async function handleSubmit() {
  if (!file.value) return
  loading.value = true
  try {
    const reader = new FileReader()
    reader.onload = async e => {
      const base64 = e.target?.result as string
      const [err] = await awaitWrapper(
        flowCenterApi.setTeamAvatar({
          f_Id: String(userStore.getUserId),
          f_TeamId: props.team.f_Id,
          f_HeadIcon: base64
        })
      )
      if (err) {
        message.error(t('flow.changeAvatarFailed'))
        return
      }
      message.success(t('flow.changeAvatarSuccess'))
      emit('success')
      modalVisible.value = false
    }
    reader.readAsDataURL(file.value)
  } catch (error) {
    message.error(t('flow.changeAvatarFailed'))
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  modalVisible.value = false
}
</script>

<style scoped lang="scss">
.set-team-avatar-modal {
  .avatar-preview {
    text-align: center;
  }
  .form-buttons {
    margin-top: 24px;
    margin-bottom: 0;
    :deep(.ant-form-item-control-input-content) {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style> 