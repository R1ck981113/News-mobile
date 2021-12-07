<template>
  <div class="my-article">
    <!-- 导航栏 start -->
    <van-nav-bar class="app-nav-bar"
                 :title="type === 'collect' ? '收藏': '历史'"
                 left-arrow
                 fixed
                 @click-left="$router.back()" />
    <!-- 导航栏 end -->

    <!-- 收藏列表 start -->
    <van-list v-if="type === 'collect'"
              class="article-list-wrap"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onCollectLoad">
      <van-cell v-for="(item,index) in collectArticles"
                :key="index"
                :title="item.title"
                :to="`/article/${item.art_id}`" />
    </van-list>
    <!-- 收藏列表 end -->

    <!-- 历史文章列表 start -->
    <van-list v-if="type==='histories'"
              class=" article-list-wrap"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onloadHistories">
      <van-cell v-for="(item,index) in historyArticle"
                :key="index"
                :title="item.title"
                :to="`/article/${item.art_id}`" />
    </van-list>
    <!-- 历史文章列表 end -->
  </div>
</template>

<script>
export default {
  name: 'MyArticle',
  components: {},
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      collectArticles: [],
      historyArticle: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 加载收藏的文章
    async onCollectLoad () {
      const { data } = await this.$api.getUserCollectArticles({ page: this.page })
      console.log(data)

      const { results } = data.data
      this.collectArticles.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    },
    // 加载历史文章
    async onloadHistories () {
      try {
        // 异步更新数据
        const { data } = await this.$api.getUserHistoryArticles({ page: this.page })
        const { results } = data.data
        this.historyArticle.push(...results)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        // 发生错误时 关闭 loading
        this.$toast.fail('服务端异常')
        this.loading = false
        this.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.my-article {
  .article-list-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
