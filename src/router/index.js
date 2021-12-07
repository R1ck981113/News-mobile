import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
Vue.use(VueRouter)

// 解决报错 Error: Navigation aborted from "/my" to "/my-article/collect" via a navigation guard.
// 错误：通过导航守卫，导航从“/my”中止到“/user/chat”
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    // 登录页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        // 主页
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        // 问答页面
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        // 视频页面
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        // 我的
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    // 搜索
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    // 文章
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的props中 无论是访问还是维护性都是很方便
    props: true,
    meta: { requiresAuth: false }
  },
  {
    // 用户资料
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
    // 小智同学
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  },
  {
    // 我的收藏，历史
    path: '/my-article/:type?',
    name: 'my-article',
    component: () => import('@/views/my-article/'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    // 用户的关注列表 粉丝列表
    path: '/user/:type?',
    name: 'user-followingAndfollowers',
    component: () => import('@/views/user-following/'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

// to:：要访问的页面路由信息
// from：来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 如果已登录 直接放行
    if (store.state.user) {
      return next()
    }
    // 没有登录 提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    })
      .then(() => {
        // 确认 跳转登录页
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 取消了 停止路由导航
        next(false)
      })
  } else {
    // 不需要登录状态的页面，直接过去
    next()
  }
})
export default router
