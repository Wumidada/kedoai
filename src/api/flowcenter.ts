import request from '@/utils/request'

// 接口类型定义
interface TeamInfo {
  f_Id: string;
  f_Caption: string;
  f_Description?: string;
  f_CreateUserId: string;
  f_CreateTime: string;
  f_Avatar?: string;
}

interface QueryTeamInfoListParams {
  F_UserId: string;
}

interface CreateTeamParams {
  f_TeamName: string;
  f_CreateUserId: string;
  f_Description?: string;
}

interface ModifyTeamParams {
  f_Id: string;
  f_Caption: string;
  f_TeamId: string;
}

interface RemoveTeamParams {
  f_Id: string;
  f_UserId: string;
}

interface FlowTemplateParams {
  F_UserId: string;
  searchKeyword?: string;
  pageIndex?: number;
  pageSize?: number;
}

interface MarketTemplateParams {
  mCategory: string;
  pageIndex?: number;
  pageSize?: number;
  QueryField?: string;
}

interface CreateFlowParams {
  f_Caption: string;
  f_Description?: string;
  f_CreateUserId: string;
  f_TeamId?: string;
  f_OnionFlowSchemeData?: string;
  f_TeamOnionFlowFileGroup?: string;
}

interface FlowListParams {
  userId?: string;
  TeamId?: string;
  QueryField?: string;
  pageIndex?: number;
  pageSize?: number;
}

interface FlowTeamListParams {
  TeamId?: string;
  QueryField?: string;
  pageIndex?: number;
  pageSize?: number;
}

interface ModifyFlowParams {
  f_UserId: string;
  f_NewName: string;
  f_FlowId: string;
}

interface RemoveFlowParams {
  f_Id: string;
  f_UserId: string;
}

interface IndustryCategoryParams {
  mBIIndustryCategory: string;
}

interface PublishFlowParams {
  onionFlowId: string;
  flowtype: string;
}

// 文件夹相关接口参数
interface QueryTeamFileGroupListParams {
  F_TeamId: string;
  UserId: string;
}

interface CreateFileGroupParams {
  f_Caption: string;
  f_TeamId: string;
  f_CreateUserId: string;
}

interface RenameFileGroupParams {
  f_Id: string;
  f_FileGroupNewName: string;
  f_ModifyUserId: string;
}

interface RemoveFileGroupParams {
  f_Id: string;
  f_DeleteUserId: string;
}

interface QueryTeamListInFileGroupParams {
  F_TeamId: string;
  FileGroupId: string;
}

interface QueryTeamMembersListParams {
  F_TeamId: string;
}

// 团队相关接口
export const queryTeamInfoList = (params: QueryTeamInfoListParams) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowTeamInfoList', { params })
}

export const createTeam = (params: CreateTeamParams) => {
  return request.post('/OnionFlowTeam/CreateOnionFlowTeam', params)
}

export const modifyTeam = (params: ModifyTeamParams) => {
  return request.post('/OnionFlowTeam/ModifyOnionFlowTeamName', params)
}

export const removeTeam = (params: RemoveTeamParams) => {
  return request.post('/OnionFlowTeam/RemoveTeam', params)
}

export const addMemberToTeam = (params: any) => {
  return request.post('/OnionFlowTeam/AddMemberToOnionFlowTeam', params)
}

export const queryTeamRolesList = (params: any = {}) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowTeamRolesList', { params })
}

export const getTeamFlowList = (params: FlowTeamListParams) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowSchemeDataListByTeamId', { params })
}

// 文件夹相关接口
export const queryTeamFileGroupList = (params: QueryTeamFileGroupListParams) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowTeamFileGroupList', { params })
}

export const createFileGroup = (params: CreateFileGroupParams) => {
  return request.post('/OnionFlowTeam/CreateOnionFlowTeamFileGroup', params)
}

export const renameFileGroup = (params: RenameFileGroupParams) => {
  return request.post('/OnionFlowTeam/RenameOnionFlowTeamFileGroup', params)
}

export const removeFileGroup = (params: RemoveFileGroupParams) => {
  return request.post('/OnionFlowTeam/RemoveOnionFlowTeamFileGroup', params)
}

export const queryTeamListInFileGroup = (params: QueryTeamListInFileGroupParams) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowTeamListInFileGroup', { params })
}

export const queryTeamMembersList = (params: QueryTeamMembersListParams) => {
  return request.get('/OnionFlowTeam/QueryOnionFlowTeamMembersList', { params })
}

// 流程模板相关接口
export const getFlowTemplates = (params: FlowTemplateParams) => {
  return request.get('/OnionFlowData/GetFlowTemplates', { params })
}

export const getPopularTemplates = (params: FlowTemplateParams) => {
  return request.get('/OnionFlowData/GetPopularTemplates', { params })
}

// 流程相关接口
export const createFlow = (params: CreateFlowParams) => {
  return request.post('/OnionFlowData/SubmitOnionFlowData', params)
}

export const getFlowList = (params: FlowListParams) => {
  return request.get('/OnionFlowData/QueryOnionFlowSchemeDataList', { params })
}

export const getRecentFlows = (params: FlowListParams) => {
  return request.get('/OnionFlowData/GetRecentFlows', { params })
}

export const modifyFlow = (params: ModifyFlowParams) => {
  return request.post('/OnionFlowData/RenameOnionFlowData', params)
}

export const removeFlow = (params: RemoveFlowParams) => {
  return request.post('/OnionFlowData/RemoveOnionFlowData', params)
}


// 行业分类相关接口
export const getFlowIndustryCategory = (params: IndustryCategoryParams) => {
  return request.get('/OnionFlowData/QueryOnionFlowIndustryCategory', { params })
}

// 发布流程相关接口
export const publishFlow = (params: PublishFlowParams) => {
  return request.post('/OnionFlowData/PublishFlow', params)
}

// 回收站相关接口
export const getRecycleBinFlows = (params: FlowListParams) => {
  return request.get('/OnionFlowData/OnionFlowRecycleBin', { params })
}

export const restoreFlow = (params: { f_Id: string; f_UserId: string }) => {
  return request.post('/OnionFlowData/RestoreOnionFlowFile', params)
}

export const permanentDeleteFlow = (params: RemoveFlowParams) => {
  return request.post('/OnionFlowData/PermanentDeleteFlow', params)
}

// 模板市场相关接口（React版本使用的接口）
export const getMarketTemplatesByCategory = (params: MarketTemplateParams) => {
  return request.get('/OnionFlowData/QueryOnionFlowSchemeDataListFromMarketByCategory', { params })
}

export const createOnionFlowTeamInviteCode = (params: any) => {
  return request.get('/OnionFlowTeam/CreateOnionFlowTeamInviteCode', { params })
}

export const queryUserSimpleInfo = (params: { account: string }) => {
  return request.get('/User/QueryUserSimpleInfo', { params })
}

// 团队头像相关接口
export const setTeamAvatar = (params: { f_Id: string; f_TeamId: string; f_HeadIcon: string }) => {
  return request.post('/OnionFlowTeam/SetOnionFlowTeamAvatar', params)
} 