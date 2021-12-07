<template>
  <div id="app">
    <!-- 路由出口 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
/*
  组件的样式作用域 组件的 class 默认作用到组件的根节点
  默认是全局样式,如果不希望当前组件中的样式影响别的组件,我们可以添加作用域

  在有作用域的组件中如何给子组件设置样式
  默认只能作用到子组件的根节点,使用子组件根节点本身的 class类名
  如果是第三方组件你不知道它的根节点类名,那就审查元素查看,或者添加一个类名
*/
</style>
