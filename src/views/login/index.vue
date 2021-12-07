<template>
  <div class='login-container'>
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="注册 / 登录"
                 left-arrow
                 @click-left="$router.back()" />
    <!--
      登录表单
      基于 vant 的表单验证:
      1.使用 van-form 组件包裹所有的表单项
      2.给 van-form 绑定 submit 事件 只有表单验证通过 才会调用submit
      3.使用 field 的 rules 属性定义校验规则
     -->
    <van-form :show-error="false"
              :show-error-message="false"
              validate-first
              ref="login-form"
              @submit="onLogin"
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 left-icon="shouji"
                 icon-prefix="iconfont"
                 placeholder="请输入手机号"
                 name='mobile'
                 :rules="formRules.mobile"
                 center />
      <van-field v-model="user.code"
                 left-icon="yanzhengma"
                 icon-prefix="iconfont"
                 placeholder="请输入验证码"
                 name='code'
                 :rules="formRules.code"
                 center
                 clearable>
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down v-if="isCountDownSHow"
                          :time="60 * 1000"
                          format="ss s"
                          @finish="isCountDownSHow = false" />
          <van-button v-else
                      class="send-btn"
                      size="small"
                      round
                      type="primary"
                      :loading="isSendSmsLoading"
                      @click.prevent="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    block>登录</van-button>
      </div>
      <div class="hint">
        <div>测试账号：13911111111</div>
        <div>万能验证码：246810</div>
        <div>注意：！！测试账号登录说验证码错误再点一下登录按钮即可<br /> 另外接口做过处理，很多人调用接口，脏数据太多了。</div>
        <div>如果出现正常调用，返回状态码正常，但是没有效果是正常的。<br />这就说明这个接口不对数据库进行操作了。</div>
      </div>

    </van-form>

  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownSHow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 登录
    async onLogin () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时常(ms),为0时,不会消失
      })
      try {
        const { data } = await this.$api.login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 跳转之前清除页面缓存
        this.$store.commit('deleteCachePage', 'LayoutIndex')
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    onFailed (err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top' // 防止手机键盘太高看不见
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      // 校验手机号 验证通过 请求发送验证码 显示倒计时
      try {
        // 校验手机号
        await this.$refs['login-form'].validate('mobile')
        // 展示按钮的 loading 状态 防止慢速网络多次点击
        this.isSendSmsLoading = true
        // 验证通过 请求发送验证码
        await this.$api.sendSms(this.user.mobile)
        this.isCountDownSHow = true
      } catch (error) {
        // try 里面任何错误的代码都会进入 catch
        // 不同的错误需要有不同的提示,需要判断
        let message = ''
        if (error && error.response && error.response.status === 429) {
          // 发送短信失败提示
          message = '发送太频繁了,请稍后重试'
        } else if (error.name === 'mobile') {
          // 表单验证失败的错误提示
          message = error.message
        } else {
          // 未知错误
          message = '发送失败,请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.login-container {
  .send-btn {
    border: none;
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border: none;
      color: #ffffff;
      background-color: #6db4fb;
      border-radius: 5px;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .hint {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    color: #333;
    div {
      margin-bottom: 9px;
    }
  }
}
</style>
