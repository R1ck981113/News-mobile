<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center
              :border="false">
      <div slot="title"
           class="channel-title">我的频道</div>
      <van-button class="channel-edit-btn"
                  type="danger"
                  size="mini"
                  plain
                  round
                  @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="12">
      <van-grid-item class="grid-item "
                     :class="active === index ? 'active' :''"
                     :icon="isEdit && index !== 0 ? 'clear' : ''"
                     v-for="(channel,index) in userChannels"
                     :key="channel.id"
                     :text="channel.name"
                     @click="onUserChannelClick(channel,index)" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center
              :border="false">
      <div slot="title"
           class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="12">
      <van-grid-item class="grid-item"
                     v-for="channel in recommendChanenel"
                     :key="channel.id"
                     :text="channel.name"
                     @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannel: [],
      isEdit: false
    }
  },
  // 计算属性会观测内部依赖数据的变化而重新求值
  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChanenel () {
      return this.allChannel.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    // 获取所有的频道
    async loadAllChannels () {
      const { data } = await this.$api.getAllChannels()
      this.allChannel = data.data.channels
    },
    // 添加频道
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 已登录
        await this.$api.addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 未登录
        setItem('user-channels', this.userChannels)
      }
    },
    // 用户频道点击
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态删除频道
        this.deleteChannel(channel, index)
        return
      }
      // 非编辑状态，切换频道
      this.switchChannel(index)
    },
    // 删除频道
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        // 已登录
        await this.$api.delUserChannel(channel.id)
      } else {
        // 未登录
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换频道
    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.channel-edit {
  padding-top: 55px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .channel-edit-btn {
    width: 56px;
  }
  .grid-item {
    position: relative;
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        margin-top: 0;
        font-size: 14px;
        color: #222222;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #cccccc;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: #ff0000 !important;
    }
  }
}
</style>
