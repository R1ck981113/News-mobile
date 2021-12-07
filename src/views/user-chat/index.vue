<template>
  <div class="user-chat">
    <!-- 导航栏 start -->
    <van-nav-bar class="app-nav-bar"
                 title="小智同学"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 导航栏 start -->

    <!-- 消息列表 start -->
    <van-cell-group class="message-list-wrap">
      <van-cell v-for="(item,index) in messages"
                :key="index"
                :title="item.message" />
    </van-cell-group>
    <!-- 消息列表 end -->

    <!-- 发送消息 start -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message"
                 :border="false" />
      <van-button class="send-message-btn"
                  type="info"
                  size="small"
                  @click="onSend">发送</van-button>
    </van-cell-group>
    <!-- 发送消息 end -->
  </div>
</template>

<script>
// import { io } from 'socket.io-client'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null,
      messages: [{ message: '开发中' }]
    }
  },
  computed: {},
  watch: {},
  created () {
    // 建立连接
    // const socket = io('http://ttapi.research.itcast.cn')
    // this.socket = socket
    // socket.on('connect', () => {
    //   console.log('建立连接成功')
    // })
    // // 断开连接
    // socket.on('disconnect', () => {
    //   console.log('断开连接')
    // })
  },
  mounted () { },
  methods: {
    onSend () {
      // const data = {
      //   msg: this.message,
      //   timestamp: Date.now()
      // }
      // this.socket.emit('message', data)
      // this.messages.push(data)
      // this.message = ''
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.user-chat {
  .message-list-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .send-message-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0 14px;
    align-items: center;
    .send-message-btn {
      width: 60px;
    }
  }
}
</style>
