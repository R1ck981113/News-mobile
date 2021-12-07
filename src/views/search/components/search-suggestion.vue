<template>
  <div class="search-suggestion">
    <van-cell v-for="(suggestion,index) in suggestions"
              :key="index"
              icon="search"
              center
              @click="$emit('search',suggestion)">
      <div slot="title"
           v-html="highlignht(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 该回调将会在侦听开始之后被立即调用
      handler: debounce(async function() {
        const { data } = await this.$api.getSearchSuggestion(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    // 高亮显示搜索关键词
    highlignht (str) {
      // ！！！！ 正则表达式 /中间的内容/ 都会当作正则匹配模式字符来对待 ！！！！
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
