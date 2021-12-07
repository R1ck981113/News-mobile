<template>
  <div class="article-list"
       ref="article-list">
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="successText"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <!-- 文章item组件 -->
        <article-item v-for="(article,index) in articles"
                      :key="index"
                      :article="article" />
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态,加载结束,不在触发加载更多
      timestamp: null,
      isRefreshLoading: false,
      successText: '',
      scrollTop: 0 // 列表滚动到顶部的距离
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    // 拿到滚动距离 记录起来
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    // console.log('从缓存中激活')
    // 把记录的到顶部的距离重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  // deactivated () {
  //   console.log('组件失去活动')
  // },
  methods: {
    // 上拉触底
    async onLoad () {
      const { data } = await this.$api.getArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      // console.log(data)
      this.loading = false
      // 数据全部加载完成 更新获取下一页的数据
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了,把加载状态设置结束,不在触发加载更多
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await this.$api.getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
      this.successText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.article-list {
  position: fixed;
  top: 89px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>
