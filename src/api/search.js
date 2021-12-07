/*
  搜索相关请求模块
*/
import axios from '@/utils/request'

/*
  获取联想建议（自动补全）
*/
export const getSearchSuggestion = q => {
  return axios.get('/app/v1_0/suggestion', {
    params: {
      q // 联想建议关键词
    }
  })
}
/*
  获取搜索结果
*/
export const getSearchResult = params => {
  return axios.get('/app/v1_0/search', {
    params
  })
}
/*
  获取用户搜索历史
*/
export const getSearchHistories = () => {
  return axios.get('/app/v1_0/search/histories')
}
