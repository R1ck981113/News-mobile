<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(article,index) in result"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      const { data } = await this.$api.getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
      this.result.push(...data.data.results)
      // console.log(data.data.results)
      this.loading = false
      // 判断是否还有数据
      if (this.result.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
