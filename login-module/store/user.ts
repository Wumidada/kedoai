import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: '',
    name: "",
    avatar: "",
    mobile: "",
    isMember: false,
    isMerchant: false,
    tokenBalance: 0
  }),
  actions: {
    setName(name: string) { this.name = name },
    setAvatar(avatar: string) { this.avatar = avatar },
    setId(id: number | string) { this.id = id },
    setMobile(mobile: string) { this.mobile = mobile },
    setMemberStatus(isMember: string | boolean) {
      this.isMember = isMember === "1" || isMember === true
    },
    setMerchantStatus(isMerchant: string | boolean) {
      this.isMerchant = isMerchant === "1" || isMerchant === true
    },
    setTokenBalance(balance: number) { this.tokenBalance = balance },
    setUserLoginInfo(userInfo: any) {
      if (userInfo.f_UserId) this.setId(userInfo.f_UserId)
      if (userInfo.f_UserName) this.setName(userInfo.f_UserName)
      if (userInfo.f_HeadImgurl) this.setAvatar(userInfo.f_HeadImgurl)
      if (userInfo.f_Mobile?.trim()) this.setMobile(userInfo.f_Mobile)
      if (userInfo.f_IsMember !== undefined) this.setMemberStatus(userInfo.f_IsMember)
      if (userInfo.f_IsMerchant !== undefined) this.setMerchantStatus(userInfo.f_IsMerchant)
    },
    clearUserInfo() {
      this.id = ''; this.name = ""; this.avatar = ""; this.mobile = ""
      this.isMember = false; this.isMerchant = false; this.tokenBalance = 0
    }
  }
});