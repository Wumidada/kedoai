import request from '../utils/request'

export const userLoginByWechat = (data: {
  f_OpenId: string;
  f_UnionId: string;
  f_UserName: string;
  f_Sex: string;
  f_HeadImgurl: string;
  f_Mobile?: string;
  f_VerificationCode?: string;
}) => {
  return request.post('/User/UserLoginByWechat', data)
}

export const getWeChatQRCodeInfo = () => {
  return request.get('/WeChat/GetQRCodeInfo')
}

export const getWeChatUserInfoByTick = (data: { scene_Id: string }) => {
  return request.get('/WeChat/GetUserInfoByTick', { params: data })
}

export const getVerificationCode = (data: { phoneNum: string }) => {
  return request.get('/User/GetVerificationCode', { params: data })
}