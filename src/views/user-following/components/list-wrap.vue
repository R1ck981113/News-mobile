<template>
  <div class="list-wrap">
    <!-- 关注 start -->
    <div v-if="type === 'following'"
         class="followers">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <list-item v-for="(item,index) in list"
                   :key="index"
                   :userDetail="item"
                   @deleteUserFollow="deleteUserFollow" />
      </van-list>
    </div>
    <!-- 关注 end -->

    <!-- 粉丝 start -->
    <div v-if="type=== 'followers'"
         class="followers">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <van-cell v-for="(item,index) in list"
                  :key="index"
                  :title="item.name" />
      </van-list>
    </div>
    <!-- 粉丝 end -->
  </div>
</template>

<script>
import ListItem from './list-item'
export default {
  name: 'ListWrap',
  components: { ListItem },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {
    // 加载数据
    async onLoad () {
      try {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const data = await this.detectionType()
        const { results } = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.finished = true
        this.$toast.fail('服务器错误')
      }
    },
    // 判断类型
    async detectionType () {
      if (this.type === 'following') {
        const { data } = await this.$api.getUserFollowings({ page: this.page })
        return data
      } else if (this.type === 'followers') {
        const { data } = await this.$api.getUserFollowers({ page: this.page })
        return data
      }
    },
    // 取消关注
    deleteUserFollow (userId) {
      const followList = this.list.filter(item => {
        if (item.id !== userId) return item
      })
      this.list = followList
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
