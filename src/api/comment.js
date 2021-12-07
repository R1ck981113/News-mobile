/*
  文章评论请求模块
*/
import axios from '@/utils/request'

/*
  获取评论或评论回复     1323927166072651776  1323635979256332288  1326029163924029440
*/
export const getComments = params => {
  return axios.get('/app/v1_0/comments', { params })
}

/*
  对评论或评论回复点赞
 */

export const addCommentLike = data => {
  return axios.post('/app/v1_0/comment/likings', data)
}

/*
  取消对评论或评论回复点赞
 */
export const deleteCommentLike = target => {
  return axios.delete(`/app/v1_0/comment/likings/${target}`)
}

/*
  取消对评论或评论回复点赞
 */
export const addComment = data => {
  return axios.post('/app/v1_0/comments', data)
}
