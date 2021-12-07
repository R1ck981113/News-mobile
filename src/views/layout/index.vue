<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航栏 -->
    <van-tabbar route
                safe-area-inset-bottom
                v-model="active">
      <van-tabbar-item to="/"
                       icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa"
                       icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video"
                       icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my"
                       icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>

<style>
</style>
