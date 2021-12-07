<template>
  <div class="comment-list">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <comment-item v-for="(item,index) in comments"
                    :key="index"
                    :comment="item"
                    :is-reply-comment="isReplyComment"
                    @reply-click="$emit('reply-click',$event)" />
    </van-list>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item/comment-item'
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    // 如果获取文章评论 则传递
    source: {
      type: [Number, String, Object],
      required: true
    },
    comments: {
      type: Array,
      // 数组或对象的返回值必须通过函数返回
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    },
    // 是否回复评论
    isReplyComment: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的页码
      limit: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {
    // 加载数据
    async onLoad () {
      // 1.请求数据
      const { data } = await this.$api.getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // 2.将数据放到列表
      const { results } = data.data
      this.comments.push(...results)
      // 3.将本次loading关闭
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
      // 返回评论数量
      this.$emit('update-total-count', data.data.total_count)
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
