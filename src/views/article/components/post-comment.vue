<template>
  <div class="post-comment">
    <van-field v-model.trim="message"
               autosize
               type="textarea"
               maxlength="150"
               placeholder="请输入评论"
               show-word-limit
               :border="false" />
    <van-button class="post-btn"
                size="small"
                :disabled="!message"
                @click="onPost">发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {
    // 如果是发布文章评论 传递文章 ID
    // 如果是发布评论回复 传递评论 ID
    target: {
      type: [Number, String, Object],
      required: true
    },
    // 如果发布评论回复 也需要传递文章ID
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: '' // 输入框内容
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 发送评论
    async onPost () {
      try {
        const { data } = await this.$api.addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        this.$emit('post-success', data.data.new_obj)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('网络异常')
        // this.$emit('post-fail')
      }
      this.message = ''
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.post-comment {
  padding-right: 10px;
  display: flex;
  align-items: center;
  .post-btn {
    padding: 0;
    width: 50px;
    .van-button__text {
      color: #3bc1ff;
    }
  }
}
</style>
