<template>
  <a-modal
    v-model:open="visible"
    :title="$t('flow.inviteMembersTitle')"
    @cancel="handleCancel"
    :footer="null"
    width="500px"
  >
    <div class="invite-members-content">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        layout="vertical"
        @finish="handleSubmit"
      >
        <a-form-item :label="$t('flow.inviteMethod')" name="inviteType">
          <a-radio-group v-model:value="form.inviteType">
            <a-radio value="phone">{{ $t('flow.phoneInvite') }}</a-radio>
            <a-radio value="link">{{ $t('flow.linkInvite') }}</a-radio>
          </a-radio-group>
        </a-form-item>

        <template v-if="form.inviteType === 'phone'">
          <template v-if="userSimpleInfoSelected">
            <div class="user-info-card">
              <div class="user-info-header">{{ $t('flow.selectedUser') }}</div>
              <div class="user-info-row">
                <div>
                  <span class="user-name">{{
                    userSimpleInfoSelected?.f_UserName
                  }}</span>
                  <span class="user-mobile"
                    >（{{ userSimpleInfoSelected?.f_Mobile }}）</span
                  >
                </div>
                <a-button
                  type="link"
                  class="user-info-action"
                  @click="resetUserSelect"
                  >{{ $t('flow.reselect') }}</a-button
                >
              </div>
            </div>
          </template>
          <a-form-item v-else :label="$t('flow.phoneNumber')" name="phone">
            <a-auto-complete
              v-model:value="form.phone"
              :options="autoCompleteOptions"
              :filter-option="false"
              @search="handleUserInput"
              @select="handleSelectUser"
              :placeholder="$t('flow.enterPhoneNumber')"
              :maxlength="11"
            />
          </a-form-item>

          <a-form-item :label="$t('flow.rolePermissions')" name="role">
            <a-select v-model:value="form.role" :placeholder="$t('flow.selectRole')">
              <a-select-option
                v-for="role in rolesList"
                :key="role.f_Id"
                :value="role.f_Id"
              >
                {{ role.f_Caption }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-space style="width: 100%; justify-content: flex-end">
              <a-button @click="handleCancel">{{ $t('flow.cancel') }}</a-button>
              <a-button type="primary" html-type="submit" :loading="loading">
                {{ $t('flow.sendInvite') }}
              </a-button>
            </a-space>
          </a-form-item>
        </template>

        <template v-else>
          <a-form-item :label="$t('flow.inviteLink')">
            <a-input
              :value="inviteLink"
              readonly
              :placeholder="$t('flow.generatingLink')"
            >
              <template #suffix>
                <a-button
                  type="link"
                  size="small"
                  @click="copyLink"
                  :disabled="!inviteLink"
                >
                  {{ $t('flow.copyLink') }}
                </a-button>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-space style="width: 100%; justify-content: flex-end">
              <a-button @click="handleCancel">{{ $t('flow.close') }}</a-button>
              <a-button
                type="primary"
                @click="generateLink"
                :loading="linkLoading"
              >
                {{ $t('flow.regenerate') }}
              </a-button>
            </a-space>
          </a-form-item>
        </template>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from 'vue-i18n';
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import { useUserStore } from "@/store/user";
import debounce from 'lodash-es/debounce'

interface Props {
  open: boolean;
  teamId: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:open": [value: boolean];
  success: [];
}>();

const userStore = useUserStore();
const { t } = useI18n();
const visible = ref(false);
const loading = ref(false);
const linkLoading = ref(false);
const rolesList = ref<any[]>([]);
const inviteLink = ref("");
const userSimpleInfo = ref<any>(null);
const userSimpleInfoSelected = ref<any>(null);

const form = reactive({
  inviteType: "phone",
  phone: "",
  role: undefined,
});

const rules = {
  phone: [
    { required: true, message: t('flow.phoneRequired') },
    { pattern: /^1[3-9]\d{9}$/, message: t('flow.phoneFormatError') },
  ],
  role: [{ required: true, message: t('flow.roleRequired') }],
};

// 监听props.open变化
watch(
  () => props.open,
  (newVal) => {
    visible.value = newVal;
    if (newVal) {
      loadRolesList();
      if (form.inviteType === "link") {
        generateLink();
      }
    } else {
      resetForm();
    }
  }
);

// 监听form.inviteType变化
watch(
  () => form.inviteType,
  (newVal) => {
    if (newVal === "link") {
      generateLink();
    }
  },
  { immediate: true }
);

// 监听visible变化
watch(visible, (newVal) => {
  emit("update:open", newVal);
});

// 加载角色列表
const loadRolesList = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.queryTeamRolesList({})
    );

    if (err) {
      console.error("获取角色列表失败:", err);
      return;
    }

    rolesList.value = response.data || [];
    if (rolesList.value.length > 0) {
      form.role = rolesList.value[0].f_Id;
    }
  } catch (error) {
    console.error("获取角色列表失败:", error);
  }
};

// 生成邀请链接
const generateLink = async () => {
  try {
    linkLoading.value = true;
    const [err, response] = await awaitWrapper(
      flowCenterApi.createOnionFlowTeamInviteCode({
        userId: String(userStore.getUserId),
        userName: userStore.getUserName || "",
        teamRoleId: form.role,
        teamId: props.teamId,
      })
    );
    if (err || !response?.data) {
      throw new Error("生成邀请链接失败");
    }
    inviteLink.value = `${
      window.location.origin
    }/acceptInvitation?invitcode=${encodeURIComponent(response.data)}`;
  } catch (error) {
    console.error("生成邀请链接失败:", error);
    message.error(t('flow.generateLinkFailed'));
  } finally {
    linkLoading.value = false;
  }
};

// 复制链接
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(inviteLink.value);
    message.success(t('flow.linkCopied'));
  } catch (error) {
    message.error(t('flow.copyFailed'));
  }
};

// 生成自动完成选项
const autoCompleteOptions = computed(() => {
  const info = userSimpleInfo.value;
  if (info && info.f_Mobile) {
    return [
      {
        value: info.f_Mobile,
        label:
          (info.f_UserName ? info.f_UserName : info.f_Mobile) +
          "（" +
          info.f_Mobile +
          "）",
      },
    ];
  }
  return [];
});

// 选择自动完成项
const handleSelectUser = (val: string) => {
  if (userSimpleInfo.value) {
    userSimpleInfoSelected.value = userSimpleInfo.value;
    form.phone = userSimpleInfo.value.f_Mobile;
    userSimpleInfo.value = null;
  }
};

// 智能查找用户（防抖+表单校验）
const handleUserInput = debounce(async (value: string) => {
  userSimpleInfoSelected.value = null;
  if (!value) {
    userSimpleInfo.value = null;
    return;
  }
  try {
    await formRef.value?.validateFields(["phone"]);
  } catch {
    userSimpleInfo.value = null;
    return;
  }
  const [err, response] = await awaitWrapper(
    flowCenterApi.queryUserSimpleInfo({ account: value })
  );
  if (!err && response?.data) {
    userSimpleInfo.value = response.data;
  } else {
    userSimpleInfo.value = null;
  }
}, 300);

// 表单ref
const formRef = ref();

// 提交表单
const handleSubmit = async () => {
  try {
    if (!userSimpleInfoSelected.value && form.inviteType === "phone") {
      message.warning(t('flow.pleaseSelectUser'));
      return;
    }
    loading.value = true;
    const [err] = await awaitWrapper(
      flowCenterApi.addMemberToTeam({
        f_TeamId: props.teamId,
        f_UserId: userSimpleInfoSelected.value?.f_UserId ?? "",
        f_Mobile: form.phone,
        f_TeamRoleId: form.role,
        f_CreateUserId: String(userStore.getUserId),
        f_CreateUserName: userStore.getUserName || "",
        f_Joined: 0,
        f_AddType: 1,
      })
    );
    if (err) {
      message.error(t('flow.inviteFailed'));
      return;
    }
    message.success(t('flow.inviteSuccess'));
    handleCancel();
    emit("success");
  } catch (error) {
    console.error("邀请成员失败:", error);
    message.error(t('flow.inviteFailed'));
  } finally {
    loading.value = false;
  }
};

// 取消
const handleCancel = () => {
  visible.value = false;
  resetForm();
};

// 重置表单
const resetForm = () => {
  form.inviteType = "phone";
  form.phone = "";
  form.role = undefined;
  inviteLink.value = "";
};

const resetUserSelect = () => {
  userSimpleInfoSelected.value = null;
  form.phone = "";
};
</script>

<style scoped lang="scss">
.invite-members-content {
  margin-top: 20px;
}

:deep(.ant-form-item-label) {
  font-weight: 600;
}

.user-info-card {
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 8px 0;
  margin-bottom: 4px;
  align-items: flex-start;
}
.user-info-header {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
  font-weight: 500;
}
.user-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.user-name {
  font-weight: 600;
}
.user-mobile {
  color: #888;
  // margin-left: 8px;
  font-weight: 400;
}
.user-info-action {
  margin-left: 12px;
  padding: 0 4px;
  height: 22px;
  line-height: 22px;
}
</style>
