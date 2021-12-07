<template>
  <div class="article-item">
    <van-cell :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }">
      <!-- 标题 -->
      <div class="title van-multi-ellipsis--l3"
           slot="title">{{article.title}}</div>
      <!-- 中间部分 -->
      <div slot="label">
        <div class="cover-wrap"
             v-if="article.cover.type === 3">
          <div class="cover-wrap-item"
               v-for="(img,index) in article.cover.images"
               :key="index">
            <van-image class="cover-item"
                       fit="cover"
                       :src="img" />
          </div>

        </div>
        <div class="label-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | relativeTime}}</span>
        </div>
      </div>
      <!-- 右边封面 -->
      <div slot="default"
           v-if="article.cover.type === 1">
        <van-image class="right-cover"
                   fit="cover"
                   :src="article.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.article-item {
  border-bottom: 1px solid #edeff3;
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    margin: 15px 0;
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        margin-right: 5px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  /deep/.van-cell__value {
    margin-left: 12px;
    flex: unset;
    width: 116px;
    height: 73px;
  }
  .label-wrap {
    font-size: 11px;
    span {
      margin-right: 12px;
    }
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
