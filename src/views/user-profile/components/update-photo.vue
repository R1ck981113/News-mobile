<template>
  <div class="update-photo">

    <img class="image"
         :src="image"
         ref="image">

    <van-nav-bar class="nav-bar"
                 left-text="取消"
                 right-text="确认"
                 @click-left="$emit('close')"
                 @click-right="onConfirm" />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    // 确认
    async onConfirm () {
      this.$toast.loading({ message: '保存中', forbidClick: true, duration: 0 })
      // 参数值是 multipart/form-data
      const file = await this.getCoppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      await this.$api.updateUserPhoto(fd)
      // 跟新父组件中的用户头像
      this.$emit('updata-photo', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('保存成功')
    },
    // 获取裁剪的图片
    getCoppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => resolve(blob))
      })
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.update-photo {
  height: calc(100% - 46px);
  background-color: #000000;
  image {
    display: block;
    max-width: 100%;
  }
  .nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
  }
}
</style>
