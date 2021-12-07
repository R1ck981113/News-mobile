<template>
  <div>
    <div class="article-container">
      <!-- 导航栏start -->
      <van-nav-bar class="app-nav-bar"
                   title="文章详情"
                   left-arrow
                   @click-left="$router.back()" />
      <!-- 导航栏end -->

      <!-- 文章start -->
      <div class="article-wrap">
        <!-- 文章标题start -->
        <div class="title">{{article.title}}</div>
        <!-- 文章标题end -->

        <!-- 作者信息start -->
        <div class="author-info">
          <van-cell center>
            <van-image slot="icon"
                       class="author-avatar"
                       round
                       fit="cover"
                       :src="article.aut_photo"></van-image>
            <div slot="title"
                 class="author-name">{{article.aut_name}}</div>
            <div slot="label"
                 class="pubdate">{{article.pubdate | relativeTime}}</div>
            <van-button :icon="article.is_followed ? '' : 'plus'"
                        class="follow-btn"
                        :color="article.is_followed ? '' : '#3296fa'"
                        size="mini"
                        round
                        :loading="isFollowLoading"
                        @click="onFollow">{{article.is_followed ? '已关注' : '关注'}}</van-button>
          </van-cell>
        </div>
        <!-- 作者信息end -->

        <!-- 正文内容statr -->
        <div class="markdown-body"
             v-html="article.content"
             ref="article-content"></div>
        <!-- 正文内容end -->

        <!-- 分割线start -->
        <van-divider>正文结束</van-divider>
        <!-- 分割线end -->

        <!-- 文章评论列表start -->
        <comment-list :source="articleId"
                      :comments="commentList"
                      @update-total-count="totalCommentCount = $event"
                      @reply-click="onReplyClick" />
        <!-- 文章评论列表end -->

      </div>
      <!-- 文章end -->

      <!-- 底部区域start -->
      <div class="article-bottom">
        <van-button class="comment-btn"
                    size="mini"
                    round
                    @click="onWriteComment">写评论</van-button>
        <div class="icon-list">
          <van-icon name="comment-o"
                    :badge="totalCommentCount" />
          <van-icon :name="article.is_collected ? 'star' : 'star-o'"
                    :color="article.is_collected ? 'orange' : '#777'"
                    @click="onCollect" />
          <van-icon :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
                    :color="article.attitude === 1 ? 'red' : '#777'"
                    @click="onAttitude" />
          <van-icon name="share" />
        </div>
      </div>
      <!-- 底部区域end -->

    </div>

    <!-- 回复文章的弹出层start -->
    <van-popup v-model="isCommentPopupShow"
               position="bottom">
      <post-comment :target="articleId"
                    @post-success="onPostSuccess"
                    @post-fail="isCommentPopupShow = false" />
    </van-popup>
    <!-- 回复文章的弹出层end -->

    <!-- 回复评论的弹出层start -->
    <van-popup v-model="isReplyShow"
               position="bottom">
      <comment-reply v-if="isReplyShow"
                     :comment="replyComment"
                     :article-id="articleId"
                     @close="isReplyShow = false" />
    </van-popup>
    <!-- 回复评论的弹出层end -->

  </div>
</template>

<script>
// 在组件中获取动态路由参数：
// 方式1 this.$route.params.xxx
// 方式2 props 传参 推荐
import './github-markdown-css.css'
import { ImagePreview } from 'vant'
import { getItem } from '@/utils/storage'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: { CommentList, PostComment, CommentReply },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isCommentPopupShow: false,
      commentList: [],
      totalCommentCount: 0,
      isReplyShow: false,
      replyComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    // 加载文章内容
    async loadArticle () {
      const { data } = await this.$api.getArticleDetail(this.articleId)
      this.article = data.data
      // 数据改变影响视图更新（DOM数据）不是立即的 所以如果需要在修改数据之后马上操作被该数据影响的试图 DOM 需要把这个代码放到 $nextTick中
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    // 图片预览
    handlePerviewImage () {
      // 1.获取文章 DOM 容器
      const articleContent = this.$refs['article-content']
      // 2.得到所有img标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      // 3.循环 img 列表 给 img注册点击事件
      imgs.forEach((item, index) => {
        imgPaths.push(item.src)
        item.onclick = () => {
          // 4.在事件处理函数中调用 ImagePreview 预览
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    // 关注模块 !!! 接口有问题
    async onFollow () {
      // 判断是否登录
      if (getItem('toutiao-user')) {
        this.isFollowLoading = true
        if (this.article.is_followed) {
          // 已关注那就取消关注
          await this.$api.deleteFollow(this.article.aut_id)
        } else {
          // 没有关注就添加关注
          await this.$api.addFollow(this.article.aut_id)
        }
        // 更新视图
        this.article.is_followed = !this.article.is_followed
        this.isFollowLoading = false
      } else { this.$toast('请先登录') }
    },
    // 收藏模块 !!! 接口有问题
    async onCollect () {
      if (getItem('toutiao-user')) {
        this.$toast.loading({
          message: '操作中...',
          forbidClick: true,
          duration: 0
        })
        if (this.article.is_collected) {
          // 已收藏就取消收藏
          await this.$api.cancelCollectionArticle(this.articleId)
        } else {
          // 未收藏就收藏
          await this.$api.collectionArticle(this.articleId)
        }
        this.article.is_collected = !this.article.is_collected
        this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
      } else { this.$toast('请先登录') }
    },
    // 点赞模块 !!! 接口有问题
    async onAttitude () {
      if (getItem('toutiao-user')) {
        this.$toast.loading({
          message: '操作中...',
          forbidClick: true,
          duration: 0
        })
        if (this.article.attitude === 1) {
          // 已经点赞取消点赞
          await this.$api.deleteLikings(this.articleId)
          this.article.attitude = -1
        } else {
          // 没有点赞添加点赞
          await this.$api.addLikings(this.articleId)
          this.article.attitude = 1
        }
        this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
      } else { this.$toast('请先登录') }
    },
    // 写评论
    onWriteComment () {
      if (getItem('toutiao-user')) {
        this.isCommentPopupShow = true
      } else {
        this.$toast('请先登录')
      }
    },
    // 发送评论成功 将评论添加到最前面 关闭弹出层
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isCommentPopupShow = false
    },
    // 回复文章的评论
    onReplyClick (comment) {
      this.replyComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    background-color: #ffffff;
    .title {
      padding: 15px;
      font-size: 20px;
      color: #3a3a3a;
      font-weight: 700;
    }
    .author-info {
      .author-avatar {
        margin-right: 5px;
        width: 35px;
        height: 35px;
      }
      .author-name {
        font-size: 12px;
        color: #333333;
      }
      .pubdate {
        font-size: 11px;
        color: #b4b4b4;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
      /deep/ .van-cell__label {
        margin-top: 0;
      }
    }
    .markdown-body {
      padding: 16px;
      /deep/ ol {
        list-style: decimal;
      }
    }
  }
  .article-bottom {
    padding: 0 20px 0 15px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #d8d8d8;
    height: 43px;
    background-color: #ffffff;
    .comment-btn {
      margin-right: 38px;
      width: 141px;
      height: 23px;
    }
    .icon-list {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
