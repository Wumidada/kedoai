<template>
  <div class="settings-content">
    <div class="settings-list">
      <!-- 头像设置 -->
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-header">
            <a-avatar :size="42"  :class="{ 'team-avatar-text': !teamInfo?.f_HeadIcon }" :src="teamInfo?.f_HeadIcon">
              {{ teamInfo?.f_TeamName?.charAt(0) }}
            </a-avatar>
            <span class="setting-title">{{ $t('flow.avatarSetting') }}</span>
          </div>
          <div class="setting-desc">{{ $t('flow.avatarDescription') }}</div>
        </div>
        <a-button v-if="isTeamOwner" @click="handleSetAvatar">{{ $t('flow.changeAvatar') }}</a-button>
        <span v-else class="readonly-text">{{ $t('flow.onlyOwnerCanModify') }}</span>
      </div>

      <!-- 团队名称 -->
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-title">{{ $t('flow.teamName') }}</div>
          <div class="setting-value">{{ teamInfo?.f_TeamName }}</div>
        </div>
        <a-button v-if="isTeamOwner" @click="handleEditTeamName">{{ $t('flow.modify') }}</a-button>
        <span v-else class="readonly-text">{{ $t('flow.onlyOwnerCanModify') }}</span>
      </div>

      <!-- 移交团队 -->
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-title">{{ $t('flow.handoverTeam') }}</div>
          <div class="setting-desc">{{ $t('flow.handoverDescription') }}</div>
        </div>
        <a-button v-if="isTeamOwner" @click="handleHandoverTeam">{{ $t('flow.handoverTeam') }}</a-button>
        <span v-else class="readonly-text">{{ $t('flow.onlyOwnerCanOperate') }}</span>
      </div>

      <!-- 解散团队 -->
      <div class="setting-item danger">
        <div class="setting-info">
          <div class="setting-title">{{ $t('flow.disbandTeam') }}</div>
          <div class="setting-desc">{{ $t('flow.disbandTeamWarning') }}</div>
        </div>
        <a-button v-if="isTeamOwner" danger @click="handleDisbandTeam">{{ $t('flow.disbandTeam') }}</a-button>
        <span v-else class="readonly-text">{{ $t('flow.onlyOwnerCanOperate') }}</span>
      </div>

      <!-- 退出团队 -->
      <!-- <div class="setting-item danger" v-if="!isTeamOwner">
        <div class="setting-info">
          <div class="setting-title">{{ $t('flow.leaveTeam') }}</div>
          <div class="setting-desc">{{ $t('flow.leaveTeamDescription') }}</div>
        </div>
        <a-button danger @click="handleLeaveTeam">{{ $t('flow.leaveTeam') }}</a-button>
      </div> -->

      <EditTeamNameModal :open="editNameModalOpen" :team="teamInfo" @update:open="v => editNameModalOpen = v" @success="() => { emit('refreshTeamInfo'); }" />
      <HandoverTeamModal :open="handoverModalOpen" :team="teamInfo" @update:open="v => handoverModalOpen = v" @success="() => { emit('handoverTeam'); }" />
      <DisbandTeamModal :open="disbandModalOpen" :team="teamInfo" @update:open="v => disbandModalOpen = v" @success="() => { emit('refreshTeamInfo'); }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { EditTeamNameModal, HandoverTeamModal, DisbandTeamModal } from '@/view/flowCenter/modal'
import { setTeamAvatar } from '@/api/flowcenter'
import { awaitWrapper } from '@/api'

interface Props {
  teamInfo: any
  isTeamOwner: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  refreshTeamInfo: []
  handoverTeam: []
  leaveTeam: []
  avatarUpload: [file: File]
}>()

const userStore = useUserStore()
const { t } = useI18n()
const userId = computed(() => userStore.getUserId)

// modal open states
const editNameModalOpen = ref(false)
const handoverModalOpen = ref(false)
const disbandModalOpen = ref(false)

const handleEditTeamName = () => {
  editNameModalOpen.value = true
}
const handleHandoverTeam = () => {
  handoverModalOpen.value = true
}
const handleDisbandTeam = () => {
  disbandModalOpen.value = true
}
const handleLeaveTeam = () => {
  // 退出团队弹窗如需自定义modal可仿照其它modal新建，否则保留原有confirm
  emit('leaveTeam')
}

const handleSetAvatar = () => {
  // 创建文件输入
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      message.error(t('flow.imageTooLarge'))
      return
    }
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string
      const [err] = await awaitWrapper(
        setTeamAvatar({
          f_Id: String(userId.value),
          f_TeamId: String(props.teamInfo.f_Id),
          f_HeadIcon: base64
        })
      )
      if (err) {
        message.error(t('flow.changeAvatarFailed'))
        return
      }
      message.success(t('flow.changeAvatarSuccess'))
      emit('refreshTeamInfo')
    }
    reader.readAsDataURL(file)
  }
  input.click()
}
</script>

<style scoped lang="scss">
.settings-content {
  height: 100%;
  overflow: hidden;
}

.settings-list {
  padding: 24px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &.danger {
    .setting-title {
      color: #ff4d4f;
    }
  }

  .setting-info {
    .setting-header {
      display: flex;
      align-items: center;
      gap: 8px;
      .team-avatar-text{
        background-color: #1890ff;
        color: white;
        font-size: 12px;
      }

      .setting-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
    }

    .setting-desc {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }

    .setting-value {
      font-size: 14px;
      color: #666;
      margin-top: 4px;
    }
  }
}

.readonly-text {
  font-size: 12px;
  color: #999;
  font-style: italic;
}
</style> 