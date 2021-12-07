<template>
  <div class="list-item">
    <van-cell center>
      <!-- 用户头像 start -->
      <van-image slot="icon"
                 width="50"
                 height="50"
                 round
                 :src="userDetail.photo" />
      <!-- 用户头像 end -->

      <!-- 用户信息 start -->
      <div class="user-info"
           slot="title">
        <div class="user-name">{{userDetail.name}}</div>
        <div class="user-fans-count">粉丝数: {{userDetail.fans_count}}</div>
      </div>
      <!-- 用户信息 end -->

      <!-- 关注按钮 start -->
      <van-button class="following"
                  size="small"
                  @click="cancelFollow(userDetail.id)">已关注</van-button>
      <!-- 关注按钮 end -->
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  components: {},
  props: {
    userDetail: {
      type: Object,
      required: true
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
    // 取消关注
    async cancelFollow (userId) {
      try {
        const { status } = await this.$api.cancelFollowing(userId)
        status === 204 && this.$toast.success('取消关注成功')
        this.$emit('deleteUserFollow', userId)
      } catch (error) {
        this.$toast.fail('网络故障,稍后重试')
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.list-item {
  border-bottom: 1px solid #ebedf0;
  .user-info {
    margin-left: 13px;
    .user-name {
      font-size: 14px;
    }
    .user-fans-count {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
