<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search class="search"
                  v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296FA"
                  @search="onSearch"
                  @cancel="$router.back()"
                  @focus="isResultShow = false" />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"
                   :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText"
                       :search-text="searchText"
                       @search="onSearch" />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else
                    :search-histories="SearchHistories"
                    @search="onSearch"
                    @deleteHistories="deleteHistories"
                    @deleteAllHistories="SearchHistories = []" />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    SearchHistories() {
      setItem('search-histories', this.SearchHistories)
    }
  },
  created () {
    this.loadUserSerachHistories()
  },
  mounted () { },
  methods: {
    // 搜索
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      // 数据持久化 判断登录或非登录的情况
      if (this.user) {
        this.loadUserSerachHistories()
      } else {
        const index = this.SearchHistories.findIndex(item => item === this.searchText)
        if (index !== -1) this.SearchHistories.splice(index, 1)
        this.SearchHistories.unshift(this.searchText)
      }
      this.isResultShow = true
    },
    // 获取用户搜索历史
    async loadUserSerachHistories () {
      const localHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await this.$api.getSearchHistories()
      //   localHistories = [...new Set([...localHistories, ...data.data.keywords])]
      // }
      this.SearchHistories = localHistories
    },
    // 删除单个搜索记录
    deleteHistories (historiesItem) {
      this.SearchHistories = this.SearchHistories.filter(item => item !== historiesItem)
    }
  }
}
</script>

<style lang='less' scoped>
.search-container {
  .search {
    /deep/ .van-search__action {
      color: #ffffff;
    }
    .van-search__content {
      height: 28px;
    }
    .van-cell {
      align-items: center;
    }
  }
}
</style>
