<template>
  <div class="my-container">
    <!-- 我的信息 -->
    <van-cell-group v-if="user"
                    class="banner">
      <van-cell class="my-info"
                center
                :border="false">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   :src="currentUser.photo" />
        <div slot="title"
             class="my-name">{{currentUser.name}}</div>
        <van-button class="update-btn"
                    slot="right-icon"
                    to="/user/profile"
                    round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info"
                :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" to="/user/following">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" to="/user/followers">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else
         class="not-login">
      <div @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })">
        <img class="mobile"
             src="./phone.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!--  -->
    <van-grid class="nav-grid mb-5"
              :column-num="2">
      <van-grid-item class="nav-grid-item"
                     icon="shoucang"
                     text="收藏"
                     icon-prefix="iconfont"
                     to="/my-article/collect" />
      <van-grid-item class="nav-grid-item"
                     icon="lishi"
                     text="历史"
                     icon-prefix="iconfont"
                     to="/my-article/histories" />
    </van-grid>
    <!--  -->
    <van-cell-group class="nav-cell mb-5">
      <van-cell class="nav-cell-item"
                title="消息通知"
                is-link
                @click="$toast('开发中')" />
      <van-cell class="nav-cell-item"
                title="小智同学"
                is-link
                to="/user/chat" />
    </van-cell-group>

    <!--  -->
    <van-cell v-if="user"
              class="logout-cell"
              title="退出登录"
              @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {} // 当前登录用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () { },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      })
        .then(() => this.$store.commit('setUser', null)
        )
        .catch(() => { })
    },
    // 加载当前用户数据
    async loadCurrentUser () {
      if (this.user) {
        const { data } = await this.$api.getCurrentUser()
        this.currentUser = data.data
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.my-container {
  .banner {
    background: url('./banner.png') no-repeat;
    background-size: cover;
    box-sizing: border-box;
    .van-cell {
      background-color: unset;
    }
    .my-info {
      padding-top: 41px;
      padding-bottom: 28px;
      box-sizing: border-box;
      .avatar {
        margin-right: 11px;
        width: 66px;
        height: 66px;
        border: 1px solid #ffffff;
        box-sizing: border-box;
      }
      .my-name {
        color: #ffffff;
      }
      .update-btn {
        padding: 3px 10px;
        height: 26px;
        font-size: 10px;
        color: #666;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #ffffff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
    }
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .mobile {
      margin-bottom: 8px;
      width: 66px;
    }
    .text {
      font-size: 14px;
      color: #ffffff;
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      box-sizing: border-box;
      .iconfont {
        font-size: 22px;
      }
      .iconfont-shoucang {
        color: #eb5253;
      }
      .iconfont-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .nav-cell {
    .nav-cell-item {
      font-size: 15px;
      color: #333333;
    }
  }
  .logout-cell {
    font-size: 15px;
    text-align: center;
    color: #d86262;
  }
  .mb-5 {
    margin-bottom: 5px;
  }
}
</style>
