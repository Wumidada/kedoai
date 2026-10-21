import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import {
  User_ActivateMembershipCode,
  type ActivateTokenCodeResult,
} from "@/api/board";
import { useUserStore } from "@/store/user";

const MAX_CODE_LENGTH = 128;
const DEFAULT_AVAILABLE_MODELS = [
  "gpt-6-astra",
  "deepseek-v4-flash",
  "deepseek-v4-pro",
  "gpt-5.6-sol",
];

interface UseMembershipCodeOptions {
  onSuccess?: (result: ActivateTokenCodeResult) => void;
}

/**
 * Token 激活码兑换逻辑。
 *
 * 统一处理输入清理、重复提交保护、Token 余额同步及可用模型更新，
 * 保证不同工作台入口的兑换行为一致。
 */
export function useMembershipCode(options: UseMembershipCodeOptions = {}) {
  const { t } = useI18n();
  const userStore = useUserStore();
  const exchangeCode = ref("");
  const exchangeLoading = ref(false);
  const availableModels = ref<string[]>([...DEFAULT_AVAILABLE_MODELS]);

  const normalizedCode = computed(() => exchangeCode.value.trim());
  const canExchange = computed(
    () => normalizedCode.value.length > 0 && !exchangeLoading.value,
  );

  const handleExchange = async () => {
    // 同时防止按钮点击和回车触发造成并发兑换。
    if (exchangeLoading.value) return;

    const code = normalizedCode.value;
    if (!code) {
      message.warning(t("dashboard.exchange.codeRequired"));
      return;
    }

    const userId = userStore.getUserId;
    if (!userId) {
      message.error(t("dashboard.exchange.loginRequired"));
      return;
    }

    exchangeLoading.value = true;
    try {
      const response = await User_ActivateMembershipCode({
        f_Code: code.slice(0, MAX_CODE_LENGTH),
        f_UserId: String(userId),
      });
      const result = response.data as ActivateTokenCodeResult;
      const redeemedTokens = Number(result?.redeemedTokens);
      const remainingQnty = Number(result?.remainingQnty);

      if (!Number.isFinite(redeemedTokens) || !Number.isFinite(remainingQnty)) {
        throw new Error("Token 兑换接口返回的数据格式不正确");
      }

      exchangeCode.value = "";
      userStore.setTokenBalance(remainingQnty);

      if (Array.isArray(result.availableModels) && result.availableModels.length > 0) {
        availableModels.value = result.availableModels;
      }

      options.onSuccess?.({
        redeemedTokens,
        remainingQnty,
        availableModels: [...availableModels.value],
      });

      message.success(
        t("dashboard.exchange.success", {
          tokens: redeemedTokens.toLocaleString(),
        }),
      );
    } catch (error) {
      // HTTP/API 错误由响应拦截器展示；此处保留日志用于排查数据契约问题。
      console.error("兑换 Token 激活码失败:", error);
    } finally {
      exchangeLoading.value = false;
    }
  };

  return {
    exchangeCode,
    exchangeLoading,
    availableModels,
    canExchange,
    maxCodeLength: MAX_CODE_LENGTH,
    handleExchange,
  };
}
