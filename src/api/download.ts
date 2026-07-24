import request from '@/utils/request'


/**
 * 获取对应版本最新版本
 */
export const getLatestVersion = (params:any) => {
  return request.post('/VersionCheck/CheckVersion', params)
}

