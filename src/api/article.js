/*
  文章相关请求模块
*/
import axios from '@/utils/request'
/*
  获取文章列表
*/
export const getArticle = params => {
  return axios.get('/app/v1_1/articles', { params })
}
/*
  获取文章详情
*/
export const getArticleDetail = articleId => {
  return axios.get(`/app/v1_0/articles/${articleId}`)
}
/*
  收藏文章 target=收藏的目标文章ID ！！！！接口有问题！！！！
*/
export const collectionArticle = target => {
  return axios.post('/app/v1_0/article/collections', { target })
}
/*
  取消收藏文章 target=收藏的目标文章ID ！！！！接口有问题！！！！
*/
export const cancelCollectionArticle = target => {
  return axios.delete(`/app/v1_0/article/collections/${target}`)
}
/*
  对文章点赞
*/
export const addLikings = target => {
  return axios.post('/app/v1_0/article/likings', { target })
}
/*
  取消对文章点赞
*/
export const deleteLikings = target => {
  return axios.delete(`/app/v1_0/article/likings/${target}`)
}
/*
  获取当前用户收藏文章列表
*/
export const getUserCollectArticles = params => {
  return axios.get('/app/v1_0/article/collections', { params })
}
/*
  获取当前用户阅读历史文章列表
*/
export const getUserHistoryArticles = params => {
  return axios.get('/app/v1_0/user/histories', { params })
}
