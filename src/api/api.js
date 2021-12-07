/*
  这里是数据请求的唯一出口
*/
/* ==== 用户相关请求模块 ====  */
import {
  login,
  sendSms,
  getCurrentUser,
  getUserChannels,
  addFollow,
  deleteFollow,
  getUserProfile,
  updateUserProfile,
  updateUserPhoto,
  getUserFollowings,
  getUserFollowers,
  cancelFollowing
} from './user'
/* ==== 文章相关请求模块 ====  */
import {
  getArticle,
  getArticleDetail,
  collectionArticle,
  cancelCollectionArticle,
  addLikings,
  deleteLikings,
  getUserCollectArticles,
  getUserHistoryArticles
} from './article'
/* ==== 频道相关请求模块 ====  */
import { getAllChannels, addUserChannel, delUserChannel } from './channel'
/* ==== 搜索相关请求模块 ====  */
import {
  getSearchSuggestion,
  getSearchResult,
  getSearchHistories
} from './search'
/* ==== 评论相关请求模块 ====  */
import {
  getComments,
  addCommentLike,
  deleteCommentLike,
  addComment
} from './comment'

export default {
  login,
  sendSms,
  getCurrentUser,
  getUserChannels,
  addFollow,
  deleteFollow,
  getUserProfile,
  updateUserProfile,
  updateUserPhoto,
  getUserFollowings,
  getUserFollowers,
  cancelFollowing,
  getArticle,
  getArticleDetail,
  collectionArticle,
  cancelCollectionArticle,
  addLikings,
  deleteLikings,
  getUserCollectArticles,
  getUserHistoryArticles,
  getAllChannels,
  addUserChannel,
  delUserChannel,
  getSearchSuggestion,
  getSearchResult,
  getSearchHistories,
  getComments,
  addCommentLike,
  deleteCommentLike,
  addComment
}
