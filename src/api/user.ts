import request from '@/utils/request'

/**
 * 根据token获取用户信息
 */
export const getUserInfoByToken = (data: any) => {
  return request.post('/User/UserLoginBySSOToken', data)
}