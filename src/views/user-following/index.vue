<template>
  <div class="user-following">
    <van-tabs v-model="active"
              color="#ffffff"
              line-width="60px"
              title-active-color="#ffffff"
              title-inactive-color="#ffffff"
              background="#3296fa">
      <div slot="nav-left"
           class="arrow-left-wrap"
           @click="$router.back()">
        <van-icon name="arrow-left"
                  size="16px"
                  color="#ffffff" />
      </div>
      <van-tab title="关注">
        <list-wrap class="list-wrap"
                   type="following" />
      </van-tab>
      <van-tab title="粉丝">
        <list-wrap class="list-wrap"
                   type="followers" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ListWrap from './components/list-wrap.vue'
export default {
  name: 'UserFollowig',
  components: { ListWrap },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    // 如果从我的页面点击粉丝进入 那就切换标签页
    if (this.type === 'followers') this.active = 1
  },
  mounted () { },
  methods: {
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.user-following {
  /deep/.van-tabs {
    .arrow-left-wrap {
      margin-left: 16px;
      display: flex;
      align-items: center;
    }
    .van-tab {
      flex: unset;
      width: 160px;
    }
    .van-tabs__line {
      bottom: 17px;
    }
    .list-wrap {
      position: fixed;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
    }
  }
}
</style>
