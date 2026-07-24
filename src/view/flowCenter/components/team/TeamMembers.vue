<template>
  <div class="team-members-container">
    <div class="members-header">
      <h3 class="members-title">{{ $t('flow.teamMembers') }}</h3>
      <a-button
        type="primary"
        class="invite-btn"
        @click="inviteMembersModalVisible = true"
      >
        <UserOutlined />
        {{ $t('flow.inviteMembers') }}
      </a-button>
    </div>

    <div class="members-content">
      <a-table
        :columns="membersColumns"
        :data-source="membersList"
        :loading="membersLoading"
        :pagination="false"
        row-key="f_UserId"
        class="members-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <div class="member-cell">
              <a-avatar :size="36" :src="record.f_HeadIcon">
                {{ record.f_UserName?.charAt(0) }}
              </a-avatar>
              <div class="member-info">
                <div class="member-name">
                  {{ record.f_UserName }}
                  <span
                    v-if="record.f_UserId === userId"
                    class="current-user"
                    >{{ $t('flow.currentUser') }}</span
                  >
                </div>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'phone'">
            {{ record.f_Mobile }}
          </template>
          <template v-if="column.key === 'permission'">
            {{ record.f_Caption }}
          </template>
          <template v-if="column.key === 'actions'">
            <!-- <a-space v-if="isTeamOwner && record.f_UserId !== userId">
              <a @click="handleEditPermission(record)">修改权限</a>
              <a-spin
                v-if="removingMembers[record.f_UserId]"
                size="small"
              />
              <a
                v-else
                @click="handleRemoveMember(record)"
                class="danger-link"
                >删除</a
              >
            </a-space> -->
          </template>
        </template>
      </a-table>
    </div>

    <!-- 邀请成员弹窗 -->
    <InviteMembersModal
      v-model:open="inviteMembersModalVisible"
      :team-id="teamId"
      @success="handleInviteMembersSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import { UserOutlined } from "@ant-design/icons-vue";
import { useI18n } from 'vue-i18n';
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import { InviteMembersModal } from "../../modal";

interface Props {
  teamId: string;
  teamInfo: any;
}

const props = defineProps<Props>();
const userStore = useUserStore();
const { t } = useI18n();

// 响应式数据
const membersList = ref<any[]>([]);
const membersLoading = ref(false);
const inviteMembersModalVisible = ref(false);
const removingMembers = reactive<Record<string, boolean>>({});

// 计算属性
const userId = computed(() => userStore.getUserId);
const isTeamOwner = computed(
  () => props.teamInfo?.f_OwnerUserId === String(userId.value)
);

const membersColumns = computed(() => [
  { title: t('flow.memberName'), key: "user", dataIndex: "f_UserName" },
  { title: t('flow.phone'), key: "phone", dataIndex: "f_Mobile" },
  { title: t('flow.permissions'), key: "permission", dataIndex: "f_Caption" },
  ...(isTeamOwner.value ? [{ title: t('flow.management'), key: "actions", width: 180 }] : []),
]);

// 获取团队成员列表
const loadMembersList = async () => {
  try {
    membersLoading.value = true;
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamMembersList({
        F_TeamId: props.teamId,
      })
    );

    if (err) {
      console.error("获取团队成员列表失败:", err);
      return;
    }

    membersList.value = response.data || [];
  } catch (error) {
    console.error("获取团队成员列表失败:", error);
  } finally {
    membersLoading.value = false;
  }
};

// 修改权限
const handleEditPermission = (member: any) => {
  // TODO: 实现修改权限功能
  message.info(t('flow.editPermissionInProgress'));
};

// 移除成员
const handleRemoveMember = async (member: any) => {
  try {
    removingMembers[member.f_UserId] = true;
    // TODO: 需要实现removeTeamMember API
    message.info(t('flow.removeMemberInProgress'));
    // const [err] = await awaitWrapper(
    //   flowCenterApi.removeTeamMember({
    //     f_RemovedUserId: member.f_UserId,
    //     f_UserId: String(userId.value),
    //     f_TeamId: props.teamId
    //   })
    // )

    // if (err) {
    //   message.error('移除失败')
    //   return
    // }

    // message.success('移除成功')
    // loadMembersList()
  } catch (error) {
    console.error("移除成员失败:", error);
    message.error(t('flow.removeFailed'));
  } finally {
    removingMembers[member.f_UserId] = false;
  }
};

// 邀请成员成功回调
const handleInviteMembersSuccess = () => {
  loadMembersList();
};

// 生命周期
onMounted(() => {
  loadMembersList();
});
</script>

<style scoped lang="scss">
.team-members-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.members-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .members-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .invite-btn {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.members-content {
  flex: 1;
  overflow: auto;
}

.members-table {
  :deep(.ant-table-thead > tr > th) {
    background: transparent !important;
    font-size: 16px !important;
    color: #808080 !important;
  }
}

.member-cell {
  display: flex;
  align-items: center;
  gap: 15px;

  .member-info {
    .member-name {
      font-size: 16px;
      color: #333;

      .current-user {
        color: #0088ff;
      }
    }
  }
}

.danger-link {
  color: #ff4d4f;
}
</style> 