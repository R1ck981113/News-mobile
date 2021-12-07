/*
  用户相关请求模块
*/
import axios from '@/utils/request'

/*
  用户登录
*/
export const login = data => {
  return axios.post('/app/v1_0/authorizations', data)
}

/*
  发送短信验证码
*/
export const sendSms = mobile => {
  return axios.get(`/app/v1_0/sms/codes/${mobile}`)
}
/*
  获取登录用户信息
*/
export const getCurrentUser = () => {
  return axios.get('/app/v1_0/user')
}
/*
  获取用户频道列表
*/
export const getUserChannels = () => {
  return axios.get('/app/v1_0/user/channels')
}
/*
  关注用户 target=用户id  ！！！！接口有问题！！！！
*/
export const addFollow = target => {
  return axios.post('/app/v1_0/user/followings', { target })
}
/*
  取消关注用户            ！！！！接口有问题！！！！
*/
export const deleteFollow = target => {
  return axios.delete(`/app/v1_0/user/followings/${target}`)
}
/*
  获取用户个人资料
*/
export const getUserProfile = () => {
  return axios.get('/app/v1_0/user/profile')
}
/*
  修改用户个人资料
*/
export const updateUserProfile = data => {
  return axios.patch('/app/v1_0/user/profile', data)
}
/*
  编辑用户照片资料（头像）
*/
export const updateUserPhoto = data => {
  return axios.patch('/app/v1_0/user/photo', data)
}
/*
  获取用户的关注列表
*/
export const getUserFollowings = params => {
  return axios.get('/app/v1_0/user/followings', { params })
}
/*
  取消关注用户
*/
export const cancelFollowing = target => {
  return axios.delete(`/app/v1_0/user/followings/${target}`)
}
/*
  获取用户的粉丝列表
*/
export const getUserFollowers = params => {
  return axios.get('/app/v1_0/user/followers', { params })
}
