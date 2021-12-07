<template>
  <div class="update-gender">
    <van-picker show-toolbar
                :columns="columns"
                :default-index="value"
                @confirm="onConfirm"
                @cancel="$emit('close')" />
  </div>
</template>

<script>
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 点击完成
    async onConfirm (gender, index) {
      // 只有修改的性别和当前性别不一样时 才能修改
      if (index !== this.value) {
        this.$toast.loading({ message: '保存中', forbidClick: true })
        await this.$api.updateUserProfile({ index })
        this.$emit('input', index)
        this.$toast.success('保存成功')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.update-gender {
  color: #000000;
}
</style>
