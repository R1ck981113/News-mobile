<template>
  <!-- 删除历史记录模块有点问题 -->
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelateShow">
        <!--
          prop 数据如果是引用数据类型可以修改
          注意：！！这个修改指的是 user.name = 'jack'，arr.push，arr.splice(0,1)
          但是任何 prop 数据都不能重新赋值
          如果想要 prop 数据等于新数据 让父组件自己修改
         -->
        <span @click="$emit('deleteAllHistories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelateShow = false">完成</span>
      </div>
      <van-icon v-else
                name="delete-o"
                @click="isDelateShow = true" />
    </van-cell>
    <!-- 搜索历史列表 -->
    <van-cell v-for="(item,index) in SearchHistories"
              :key="index"
              :title="item"
              center
              @click="$emit('search',item)">
      <van-icon v-show="isDelateShow"
                name="close"
                @click.stop="$emit('deleteHistories', item)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelateShow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
