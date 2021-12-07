import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.transformResponse = [
  function(data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      return data
    }
  }
]
// 刷新 token 创建一个 axios 实例 不设置拦截器 防止死循环问题
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const { user } = store.state
    // 如果用户已登录,统一给接口设置 token 信息
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 处理完之后一定要把 config 返回否则请求发不出去
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 返回数据
    return response
  },
  async error => {
    const status = error.response.status

    if (status === 400) {
      // 客户端请求参数错误
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      // token无效
      // 如果没有 user 或者 user.token 直接去登录
      const { user } = store.state
      if (!user || !user.token) {
        // 直接跳转到登录页
        return redirectLogin()
      }
      // 使用 refresh_token,则请求获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            // Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 拿到新的 token 之后把他更新到容器中
        user.token = data.data.token
        store.commit('setUser', user)
        // 把失败的请求重新发出去
        return axios(error.config)
      } catch (error) {
        // 刷新 token 失败 直接跳转登录页
        Toast.fail('登录已过期') && redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限操作
      Toast.fail('没有权限操作')
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail('服务端异常，请稍后重试')
    }
    // 抛出异常
    return Promise.reject(error)
  }
)

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default axios
