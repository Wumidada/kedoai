import { defineStore } from "pinia";

export interface UserState {
  id: number | string
  name: string
  avatar: string
  mobile: string
  isMember: boolean
  isMerchant: boolean
  tokenBalance: number
}

export const useUserStore = defineStore(
  "user",
  {
    state: ():UserState => {
      return {
        id: '',
        name: "",
        avatar: "",
        mobile: "",
        isMember: false,
        isMerchant: false,
        tokenBalance: 0
      }
    },
    getters: {
      getUserInfo: (state) => {
        return state
      },
      getUserAvatar: (state) => {
        return state.avatar 
      },
      getUserName: (state) => {
        return state.name 
      },
      getUserId: (state) => {
        return state.id 
      },
      getUserMobile: (state) => {
        return state.mobile
      },
      getUserIsMember: (state) => {
        return state.isMember
      },
      getUserIsMerchant: (state) => {
        return state.isMerchant
      },
      getUserTokenBalance: (state) => {
        return state.tokenBalance
      }
    },
    actions: {
      setName(name: string) {
        this.name = name
      },
      setAvatar(avatar: string) {
        this.avatar = avatar
      },
      setId(id: number | string) {
        this.id = id
      },
      setMobile(mobile: string) {
        this.mobile = mobile
      },
      setMemberStatus(isMember: string|boolean) {
        this.isMember = isMember === "1" || isMember === true
      },
      setMerchantStatus(isMerchant: string|boolean) {
        this.isMerchant = isMerchant === "1" || isMerchant === true
      },
      setTokenBalance(balance: number) {
        this.tokenBalance = balance
      },
      /**
       * 统一设置用户登录后的信息
       * @param userInfo 登录API返回的用户信息
       */
      setUserLoginInfo(userInfo: any) {
        if (userInfo.f_UserId) {
          this.setId(userInfo.f_UserId)
        }
        if (userInfo.f_UserName) {
          this.setName(userInfo.f_UserName)
        }
        if (userInfo.f_HeadImgurl) {
          this.setAvatar(userInfo.f_HeadImgurl)
        }
        if (userInfo.f_Mobile?.trim()) {
          this.setMobile(userInfo.f_Mobile)
        }
        // 更新会员状态
        if (userInfo.f_IsMember !== undefined) {
          this.setMemberStatus(userInfo.f_IsMember)
        }
        // 更新商家状态
        if (userInfo.f_IsMerchant !== undefined) {
          this.setMerchantStatus(userInfo.f_IsMerchant)
        }
      },
      clearUserInfo() {
        this.id = ''
        this.name = ""
        this.avatar = ""
        this.mobile = ""
        this.isMember = false
        this.isMerchant = false
        this.tokenBalance = 0
      }
    },
    persist: {
      // omit: ['tokenBalance']
      // tokenBalance 不持久化，每次重新获取
    }
  }
);