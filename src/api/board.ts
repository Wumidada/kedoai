import request from '@/utils/request'

// 接口类型定义
interface QueryUserTokenUsageParams {
  F_UserId: string;
  Days: number;
}

interface GetUserGPTAccountInfoParams {
  F_UserId: string;
}

interface OnionGPTProjectParams {
  F_UserId: string;
}

interface CreateGPTProjectParams {
  f_CreateUserId: string;
  f_Caption: string;
  f_Description?: string;
}

interface ModifyGPTProjectParams {
  f_Id: string;
  f_Caption: string;
  f_UserId: string;
  f_Description?: string;
}

interface RemoveGPTProjectParams {
  f_Id: string;
  f_UserId: string;
}

interface ActivateMembershipCodeParams {
  f_Code: string;
  f_UserId: string;
}

export interface ActivateTokenCodeResult {
  redeemedTokens: number;
  remainingQnty: number;
  availableModels: string[];
}


// 查询用户Token使用量
export const QueryUserTokenUsage = (params: QueryUserTokenUsageParams) => {
  return request.get('/Finance/QueryUserTokenUsage', {params})
}

// 获取用户GPT账户信息
export const GetUserGPTAccountInfo = (params: GetUserGPTAccountInfoParams) => {
  return request.get('/Finance/GetUserGPTAccountInfo', {params})
}

// 获取GPT项目列表
export const OnionGPT_GetGTPProjects = (params: OnionGPTProjectParams) => {
  return request.get('/OnionGPT/GetGTPProjects', {params})
}

// 创建GPT项目
export const OnionGPT_CreateGPTProject = (params: CreateGPTProjectParams) => {
  return request.post('/OnionGPT/CreateGPTProject', params)
}

// 修改GPT项目
export const OnionGPT_ModifyGPTProject = (params: ModifyGPTProjectParams) => {
  return request.post('/OnionGPT/ModifyGPTProject', params)
}

// 删除GPT项目
export const OnionGPT_RemoveGPTProject = (params: RemoveGPTProjectParams) => {
  return request.post('/OnionGPT/RemoveGPTProject', params)
}

// 激活会员码
export const User_ActivateMembershipCode = (params: ActivateMembershipCodeParams) => {
  return request.post('/Finance/ActivateMembershipCode', params)
} 