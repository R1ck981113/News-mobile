<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="onConfirm" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 点击完成
    async onConfirm (value) {
      const birthday = dayjs(value).format('YYYY-MM-DD')
      // 当两次生日不一样的时候才可以修改
      if (this.value !== birthday) {
        this.$toast.loading({ message: '保存中', forbidClick: true })
        await this.$api.updateUserProfile({ birthday })
        this.$emit('input', birthday)
        this.$toast.success('保存成功')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
