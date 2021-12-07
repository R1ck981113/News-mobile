<template>
  <div class="comment-item">
    <van-cell>
      <van-image slot="icon"
                 class="user-avatar"
                 fit="cover"
                 round
                 :src="comment.aut_photo" />
      <div slot="title"
           class="user-info">
        <span class="user-name">{{comment.aut_name}}</span>
        <div class="user-attitude"
             @click="onCommentLike">
          <van-icon class="like-icon"
                    :class="{liked:comment.is_liking}"
                    :name="comment.is_liking ? 'good-job' : 'good-job-o'" />
          <div class="like-count">{{comment.like_count}}</div>
        </div>
      </div>
      <div slot="label"
           class="comment-info">
        <div class="comment">{{comment.content}}</div>
        <div class="pubdate">
          <span>{{comment.pubdate | datetime('MM:DD HH:mm')}}</span>
          <van-button v-show="!isReplyComment"
                      class="comment-btn"
                      color="#f4f5f6"
                      size="mini"
                      round
                      @click="$emit('reply-click',comment)"><span>{{comment.reply_count}}</span> 回复</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    },
    // 是否回复评论
    isReplyComment: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞 取消点赞
        await this.$api.deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 未点赞 点赞
        await this.$api.addCommentLike({ target: commentId })
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.comment-item {
  .user-avatar {
    margin-right: 12px;
    width: 36px;
    height: 36px;
  }
  .user-info {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      flex: 1;
      font-size: 13px;
      color: #406599;
    }
    .user-attitude {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-icon {
        font-size: 16px;
      }
      span {
        font-size: 10px;
        color: #252525;
      }
      .like-icon {
        color: #000000;
      }
      .like-icon.liked {
        color: #ff0000;
      }
      .like-count {
        margin-left: 2px;
      }
    }
  }
  .comment-info {
    .comment {
      margin-bottom: 15px;
      font-size: 16px;
      color: #222222;
    }
    .pubdate {
      display: flex;
      align-items: center;
      font-size: 10px;
      color: #222222;
      .comment-btn {
        margin-left: 13px;
        padding: 0 15px;
        height: 25px;
        .van-button__text {
          color: #222222;
        }
      }
    }
  }
}
</style>
