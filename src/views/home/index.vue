<template>
  <div class='home-container'>
    <!-- 导航栏start -->
    <van-nav-bar safe-area-inset-top
                 class="app-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  icon="search"
                  round
                  to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏end -->
    <!-- 文章频道列表star -->
    <!-- 标签页组件有一个功能,只有第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs class="tabs-channel"
              v-model="active"
              line-width="16"
              line-height="3"
              title-active-color="#333333"
              title-inactive-color="#777777">
      <van-tab class="tabs-channel-item"
               v-for="channel in channels"
               :key="channel.id"
               :title="channel.name">
        <!-- 文章列表star -->
        <article-list :channel="channel" />
        <!-- 文章列表end -->
      </van-tab>
      <div slot="nav-right"
           class="wrap-nav-placeholder"></div>
      <div slot="nav-right"
           class="nav-right"
           @click="isChannelEditShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 文章频道列表end -->
    <!-- 频道编辑弹出层start -->
    <van-popup v-model="isChannelEditShow"
               position="bottom"
               :style="{ height: '100%' }"
               closeable
               close-icon-position="top-left"
               round>
      <channel-edit :user-channels="channels"
                    :active="active"
                    @close="isChannelEditShow = false"
                    @update-active="active = $event" />
    </van-popup>
    <!-- 频道编辑弹出层end -->

  </div>
</template>

<script>
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem, setItem } from '../../utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () { },
  methods: {
    // 加载用户频道列表
    async loadUserChannels () {
      let channels = []
      if (this.user) {
        try {
          // 用户登录了
          const { data } = await this.$api.getUserChannels()
          channels = data.data.channels
        } catch (error) {
          // 登录失效了
          setItem('toutiao-user', null)
        }
      } else {
        // 用户未登录 判断是否有本地存储的数据
        channels = getItem('user-channels')
        // 如果也没有本地存储 ，那就请求默认的频道列表
        if (!channels) {
          const { data } = await this.$api.getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 278px;
      height: 32px;
      border: none;
      color: #ffffff;
      background-color: #5babfb;
      .van-icon {
        width: 16px;
      }
    }
  }
  /deep/.tabs-channel {
    .van-tabs__wrap {
      height: 40px;
      border-bottom: 1px solid #edeff3;
      .van-tabs__nav--line {
        padding-bottom: 10px;
      }
      .van-tab {
        width: 96px;
        font-size: 15px;
        border-right: 1px solid #edeff3;
      }
      .van-tab:last-of-type {
        border-right: none;
      }
      .van-tabs__line {
        background-color: #3296fa;
      }
    }
    .nav-right {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 33px;
      height: 40px;
      background-color: #ffffff;
      opacity: 0.9;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 29px;
        background: url('./line-left.png') no-repeat;
        background-size: contain;
      }
    }
    .wrap-nav-placeholder {
      width: 33px;
      flex-shrink: 0;
    }
  }
}
</style>
