<template>
  <div class="update-name">
    <!-- nav-bar start -->
    <van-nav-bar title="昵称"
                 @click-left="$emit('close')"
                 @click-right="onConfirm">
      <div slot="left"
           class="nav-bar-text">
        取消
      </div>
      <div slot="right"
           class="nav-bar-text">
        完成
      </div>
    </van-nav-bar>
    <!-- nav-bar end -->

    <!-- 输入框 start -->
    <div class="name-field-wrap">
      <van-field v-model="loadUserName"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="8"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>
    <!-- 输入框 end -->
  </div>
</template>

<script>
export default {
  name: 'UpdateName',
  components: {},
  props: {
    // 声明接收 v-model 传递的数据
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loadUserName: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 点击完成
    async onConfirm () {
      if (this.value !== this.loadUserName) {
        this.$toast.loading({ message: '保存中', forbidClick: true })
        try {
          await this.$api.updateUserProfile({ name: this.loadUserName })
          this.$emit('input', this.loadUserName)
          this.$toast.success('保存成功')
        } catch (err) {
          err && err.response && err.response.status === 409 && this.$toast.fail('昵称已存在')
          return
        }
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.update-name {
  height: 100%;
  background-color: #f5f7f9;
  .nav-bar-text {
    color: #61a6ff;
  }
  .name-field-wrap {
    padding: 10px;
  }
}
</style>
