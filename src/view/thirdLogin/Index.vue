<!--  -->
<template>
  <div class="logo-box">
    <img alt="" class="logo run" src="@/assets/logo/logo_o.svg" />
    <div class="text">正在验证登录状态...</div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import { useStorage } from "@/hooks/useStorage";

const storage = useStorage();
const userStore = useUserStore();

const emit = defineEmits();
import { useRouter } from "vue-router";
import { awaitWrapper, getUserInfoByToken } from "@/api";
import { RouteHomeRedirectPath } from "@/router";

const router = useRouter();
const route = router.currentRoute.value;

async function actLogin() {
  // 优先从 route.query 获取参数（支持 hash 路由）
  // 如果是从其他路由重定向过来的，优先使用 redirectedFrom 的 query
  const token = route.redirectedFrom?.query?.token || route.query?.token;
  const refreshToken =
    route.redirectedFrom?.query?.refreshToken || route.query?.refreshToken;
  const replacePath =
    route.redirectedFrom?.query?.replacePath || route.query?.replacePath;

  console.log("route.query:", route.query);
  console.log("token:", token);
  console.log("refreshToken:", refreshToken);
  console.log("replacePath:", replacePath);

  if (!token || !refreshToken) {
    await router.replace("/401");
    return;
  }
  storage.setToken(String(token));
  storage.setRefreshToken(String(refreshToken));
  const [err, res] = await awaitWrapper(getUserInfoByToken({ token }));
  if (res && res.data) {
    userStore.setId(res.data.f_UserId);
    userStore.setName(res.data.f_UserName);
    userStore.setAvatar(res.data.f_HeadImgurl);
    userStore.setMemberStatus(Boolean(res.data.f_IsMember));
    userStore.setMobile(res.data.f_Mobile);
    if (replacePath) {
      router.replace(String(replacePath));
    } else {
      router.replace(RouteHomeRedirectPath);
    }
  } else {
    router.replace("/401");
  }
}
actLogin();
</script>
<style lang="scss" scoped>
.logo-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .logo {
    width: 80px;
    height: 80px;
  }

  .text {
    color: #666;
    margin-top: 20px;
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.run {
  animation: rotate 2s linear infinite;
}
</style>
