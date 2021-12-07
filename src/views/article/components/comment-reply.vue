<template>
  <div class="comment-reply">
    <!-- 头部信息start -->
    <van-nav-bar :title="`${comment.reply_count} 条回复`">
      <van-icon slot="left"
                name="cross"
                @click="$emit('close')" />
    </van-nav-bar>
    <!-- 头部信息end -->

    <!-- 当前评论项start -->
    <comment-item :comment="comment"
                  :is-reply-comment="true" />
    <!-- 当前评论项end -->

    <!-- 所有评论回复start -->
    <van-cell title="所有回复" />
    <comment-list :source="comment.com_id"
                  :comments="commentList"
                  :is-reply-comment="true"
                  type="c" />
    <!-- 所有评论回复end -->

    <!-- 底部区域start -->
    <van-button class="write-comment"
                @click="onPostComment">发布评论</van-button>
    <!-- 底部区域end -->

    <!-- 回复评论的弹出层start -->
    <van-popup v-model="isReplyCommentPopupShow"
               position="bottom">
      <post-comment :target="comment.com_id"
                    :article-id="articleId"
                    @post-success="onPostSuccess" />
    </van-popup>
    <!-- 回复评论的弹出层end -->
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item/comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
import { getItem } from '../../../utils/storage'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, PostComment },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isReplyCommentPopupShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 发布评论成功
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.comment.reply_count++
      this.isReplyCommentPopupShow = false
    },
    // 发布评论
    onPostComment () {
      if (getItem('toutiao-user')) {
        this.isReplyCommentPopupShow = true
      } else {
        this.$toast('请先登录')
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.comment-reply {
  padding-bottom: 44px;
  .write-comment {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    // border: none;
  }
}
</style>
