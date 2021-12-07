/*
  频道相关请求模块
*/
import axios from '@/utils/request'

/*
  获取所有频道列表
*/
export const getAllChannels = () => {
  return axios.get('/app/v1_0/channels')
}
/*
  批量修改用户频道列表（重置式） ！！！！！这个接口目前存在问题！！！！！！
*/
export const addUserChannel = data => {
  return axios.patch('/app/v1_0/user/channels', data)
}
/*
  删除指定用户频道   ！！！！！这个接口目前存在问题！！！！！！
*/
export const delUserChannel = target => {
  return axios.delete(`/app/v1_0/user/channels/${target}`)
}
