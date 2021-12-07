<template>
  <div class="user-profile">
    <!-- nav-bar start -->
    <van-nav-bar class="app-nav-bar"
                 left-arrow
                 title="个人信息"
                 @click-left="$router.back()" />
    <!-- nav-bar end -->

    <!--  -->
    <!-- 将input:file隐藏 点击单元格的时候调用file的点击事件 -->
    <input type="file"
           ref="file"
           accept="image/*"
           hidden
           @change="onFileChange" />
    <van-cell title="头像"
              is-link
              center
              @click="$refs.file.click()">
      <van-image width="30"
                 height="30"
                 round
                 fit="cover"
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              is-link
              :value="user.name"
              @click="isEditNameShow = true" />
    <van-cell title="性别"
              is-link
              :value="user.gender === 1 ? '女': '男'"
              @click="isEditGenderShow = true" />
    <van-cell title="生日"
              is-link
              :value="user.birthday"
              @click="isEditBirthdayShow = true" />
    <!--  -->

    <!-- 修改头像弹出层 start -->
    <van-popup v-model="isEditPhotoShow"
               position="bottom"
               :style="{ height: '100%' }">
      <update-photo v-if="isEditPhotoShow"
                    :file="editPhoto"
                    @close="isEditPhotoShow = false"
                    @updata-photo="user.photo = $event" />
    </van-popup>
    <!-- 修改头像弹出层 end -->

    <!-- 修改昵称弹出层 start -->
    <van-popup v-model="isEditNameShow"
               position="bottom"
               :style="{ height: '100%' }">
      <!--
        当传递给子组件的数据 既要使用 又要修改 例如这里的name
        这种情况可以使用 v-mode 简写
        不太常用的 可以用 .sync
      -->
      <update-name v-if="isEditNameShow"
                   v-model="user.name"
                   @close="isEditNameShow = false" />
    </van-popup>
    <!-- 修改昵称弹出层 end -->

    <!-- 修改性别弹出层 start -->
    <van-popup v-model="isEditGenderShow"
               position="bottom">
      <update-gender v-if="isEditGenderShow"
                     v-model="user.gender"
                     @close="isEditGenderShow = false" />
    </van-popup>
    <!-- 修改性别弹出层 end -->

    <!-- 修改生日弹出层 start -->
    <van-popup v-model="isEditBirthdayShow"
               position="bottom">
      <update-birthday v-if="isEditBirthdayShow"
                       v-model="user.birthday"
                       @close="isEditBirthdayShow = false" />
    </van-popup>
    <!-- 修改生日弹出层 end -->
  </div>
</template>

<script>
import UpdatePhoto from './components/update-photo'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditPhotoShow: false, // 修改头像弹出层
      isEditNameShow: false, // 修改昵称弹出层
      isEditGenderShow: false, // 修改性别弹出层
      isEditBirthdayShow: false, // 修改生日弹出层
      editPhoto: null // 选中的新图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () { },
  methods: {
    // 加载用户资料
    async loadUserProfile () {
      const { data } = await this.$api.getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      this.isEditPhotoShow = true
      this.editPhoto = this.$refs.file.files[0]
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>
