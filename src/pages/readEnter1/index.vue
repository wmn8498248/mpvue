<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register">
        <div class="register-tit">
          <img src="../../static/img/tit2.png" alt="" mode="widthFix">
        </div>
        <div class="readEnter1">
          <div class="readEnter1-tit">
            阅读心得
          </div>
          <div class="readEnter1-tx">
            <textarea v-model="contentTx" class="" style="height: 5.3em" mode="widthFix"/>
          </div>
          <div v-for="(item ,index) in files" :key="index">
            <div class="weui-uploader__file">
              <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
              <div class="delete-icon" @click="deleteImg" :id="item"></div>
            </div>
          </div>
          <div class="weui-uploader__input-box">
            <div class="weui-uploader__img" @click="bindButtonTap">
              <img :src="uploadeVideo" alt="">
            </div>
            <div class="weui-uploader__video" @click="didPressChooseImage">
              <img :src="uploadeImg" alt="">
            </div>
          </div>
          <div class="readEnter1-botton">
            <img src="../../static/img/anniu3.png" alt="打卡" mode="widthFix" @click="filePathSelect">
          </div>
          <div class="readEnter1-rule">
            <p class="big">阅读规则</p>
            <p class="sm">
              打卡规则：本次小龙人21天阅读习惯养成计划游戏分数总计满分100分，填写信息登记可获得基础分16分，每天打卡可获得4分。打卡达到40分可获得抱枕一个；达到60分可获得文具一套；达到88分可获得书包一个。（还未学会打字的小龙人可由业主代写阅读心得，详情可咨询物业管家）
            </p>
          </div>
        </div>
      </div>
      <div class="show-video" v-if="videoShow">
        <div class="show-videobox">
          <div class="video-closed" @click="videoClose">
            <icon type="cancel" size="30" color="orange"/>
          </div>
          <video :src="videoPath" v-if="liVideo"></video>
          <img :src="videoPath" alt="" mode="widthFix" v-if="liImage">
        </div>
      </div>
      <div class="footer-img">
        <div class="divimg">
          <img src="../../static/img/ft.png" alt="" mode="widthFix">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from '../register/store'
import Fly from 'flyio/dist/npm/wx'
import qiniuUploader from './qiniuUploader.js'
export default {
  data () {
    return {
      contentTx: null,
      filePath: null,
      uuid: null,
      uploadeImg: null,
      uploadeVideo: null,
      videoPath: '',
      files: '',
      liImage: false,
      liVideo: false,
      videoShow: false,
      motto: '书润童心,阅启成长',
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      return store.state.isLogin
    },
    result () {
      return store.state.result
    }
  },
  methods: {
    imgUuid () {
      let _this = this
      let fly = new Fly() // 创建fly实例
      fly.get('https://xcx.5iwf.cn/front/wx/uuid').then(res => {
        _this.uuid = res.data
      })
    },
    filePathSelect () {
      if (this.uploadeImg !== null) {
        let filePath = this.uploadeImg
        this.subClickImg(filePath)
      } else if (this.uploadeVideo !== null) {
        let filePath = this.videoPath
        console.log('视频' + filePath)
        this.subClickVideo(filePath)
      } else {
        wx.showToast({
          title: '必须上传图片或者视频其中一个',
          icon: 'none',
          duration: 1000
        })
      }
    },
    subClickImg (filePath) {
      console.log('————' + filePath)
      wx.showLoading({
        title: '打卡中，请稍后！'
      })
      let txVal = this.contentTx
      if (txVal === null) {
        wx.showToast({
          title: '心得不许为空！',
          icon: 'none',
          duration: 1000
        })
        return
      }
      let txLen = txVal.length
      if (txLen < 10) {
        wx.showToast({
          title: '最少也带10个字吧！',
          icon: 'none',
          duration: 1000
        })
        return
      }
      this.imgUuid()
      let that = this
      qiniuUploader.upload(filePath, (res) => {
        let imgrul = 'https://5iwf.cn/' + res.key
        let fly = new Fly() // 创建fly实例
        fly.post('https://xcx.5iwf.cn/front/wx/saveNotes', {
          images: imgrul, // 图片路径
          content: that.contentTx, // 用户的心得
          userId: this.result.id // 用户ID
        }, {
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        }).then(res => {
          wx.hideLoading()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })

          setTimeout(function () {
            const url = '../readEnter/main'
            wx.navigateTo({ url })
          }, 1000)
          console.info(res)
        })
      }, (error) => {
        // 视频上传失败，可以在七牛的js里面自己加了一个err错误的返回值
        console.log('error' + error)
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 1000
        })
      }, {
        uploadURL: 'https://up.qbox.me',
        domain: 'xcx.5iwf.cn',
        uptokenURL: 'https://xcx.5iwf.cn/front/wx/getToken',
        key: that.uuid
      })
    },
    subClickVideo (filePath) {
      console.log('————' + filePath)
      wx.showLoading({
        title: '打卡中，请稍后！'
      })
      let txVal = this.contentTx
      if (txVal === null) {
        wx.showToast({
          title: '心得不许为空！',
          icon: 'none',
          duration: 1000
        })
        return
      }
      let txLen = txVal.length
      if (txLen < 10) {
        wx.showToast({
          title: '最少也带10个字吧！',
          icon: 'none',
          duration: 1000
        })
        return
      }
      this.imgUuid()
      let that = this
      qiniuUploader.upload(filePath, (res) => {
        let imgrul = 'https://5iwf.cn/' + res.key
        let fly = new Fly() // 创建fly实例
        fly.post('https://xcx.5iwf.cn/front/wx/saveNotes', {
          video: imgrul, // 图片路径
          content: that.contentTx, // 用户的心得
          userId: this.result.id // 用户ID
        }, {
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        }).then(res => {
          wx.hideLoading()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })

          setTimeout(function () {
            const url = '../readEnter/main'
            wx.navigateTo({ url })
          }, 1000)
          console.info(res)
        })
      }, (error) => {
        // 视频上传失败，可以在七牛的js里面自己加了一个err错误的返回值
        console.log('error' + error)
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 1000
        })
      }, {
        uploadURL: 'https://up.qbox.me',
        domain: 'xcx.5iwf.cn',
        uptokenURL: 'https://xcx.5iwf.cn/front/wx/getToken',
        key: that.uuid
      })
    },
    videoClose () {
      this.videoShow = false
      this.liImage = false
      this.liVideo = false
    },
    didPressChooseImage: function () {
      wx.showLoading({
        title: '请稍后！'
      })
      let that = this
      wx.chooseImage({
        count: 1,
        success: function (res) {
          wx.hideLoading()
          that.uploadeImg = res.tempFilePaths[0] // 图片路径
          that.uploadeVideo = null // 图片
        },
        fail: function (res) {
          wx.hideLoading()
          console.info(res)
        }
      })
    },
    bindButtonTap: function () {
      wx.showLoading({
        title: '打卡中，请稍后！'
      })
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          wx.hideLoading()
          that.uploadeVideo = res.thumbTempFilePath // 视频图片
          that.videoPath = res.tempFilePath // 视频文件
          that.uploadeImg = null // 图片上传路径
        },
        fail: function (res) {
          wx.hideLoading()
          console.info(res)
        }
      })
    },
    loginAjax () {
      wx.login({
        success: function (res) {
          var code = res.code
          if (code) {
            // let _this = this
            let fly = new Fly() // 创建fly实例
            fly.get('https://xcx.5iwf.cn/wechat/user/login', {
              code: code
            }).then(res => {
              wx.hideLoading()
              store.commit('newResult', res.data)
            })
          } else {
            console.log('获取用户登录态失败：' + res.errMsg)
          }
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
  .show-video{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
  }
  .show-videobox{
    display: block;
    width: 80%;
    margin: 0 auto;
    position: relative;
  }
  .video-closed{
    position: absolute;
    top: -7px;
    right: -7px;
    z-index: 10;
  }
  .show-video video,.show-video img{
    display: block;
    width: 100%;
    border: 1px solid #9cd3cd;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .readEnter1-botton{
    width: 60%;
    margin: auto;
    margin-top: 30px;
  }
  .weui-uploader__input-box{
    overflow: hidden;
  }
  .readEnter1-rule{
    color: #fff;
  }
  .readEnter1-rule p.big{
    font-size: 14px;
    font-weight: 800;
    margin-top: 5px;
  }
  .readEnter1-rule p.sm{
    font-size: 12px;
    text-indent: 2em;
  }
  .readEnter1{
    width: 90%;
    margin: auto;
    font-size: 14px;
  }
  readEnter1-tx{
    width: 100%;
    padding-left: 10px;
  }
  .readEnter1-tx textarea{
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    background-color: #fff;
    box-sizing: border-box;
    color: #000;
    margin: 7px 0;
  }
  .weui-uploader__img{
    float: left;
    width: 70px;
    height: 70px;
    background: url(../../static/img/fangkuai.png);
    background-size: 100%;
  }
  .weui-uploader__video{
    float: left;
    width: 70px;
    height: 70px;
    margin-left: 8px;
    background: url(../../static/img/fangkuai2.png);
    background-size: 100%;
  }
  .weui-uploader__img img,.weui-uploader__video img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .indexEnter{
    font-size: 14px;
  }
  .indexEnter-tit p{
    color: #ffd800;
    line-height: 25px;
  }
  .indexEnter-tit {
    width: 80%;
    margin: auto;
    overflow: hidden;
  }
  .indexEnter-tit .divimg{
    float: left;
    width: 30%;
    margin-right: 15px;
  }
  .indexEnter-link{
    width: 70%;
    margin: 10px auto;
  }
  .indexEnter-link a{
    float: left;
    width: 50%;
    padding: 0 8%;
    margin-top: 15px;
    box-sizing: border-box;
  }
  .indexEnter-link a p{
    text-align: center;
    line-height: 25px;
  }
  .index{
    width: 100%;
    height: 100vh;
  }
  .index-button{
    position: absolute;
    top: 59%;
    width: 100%;
    z-index: 9;
  }
  .index-bg img{
    width: 100%;
    /* display: block; */
  }
  .register{
    position: absolute;
    top: 0;
    color: #fff;
    width: 100%;
  }
  .register-tit {
    margin-top: 30px;
    margin-bottom: 15px;
  }
  .register-tit img{
    display: block;
    width: 85%;
    height: 100vh;
    margin: auto;
  }
  .footer-img{
    position: absolute;
    bottom:0;
    width: 100%;
    left: 0;
    margin: auto;
  }
  .footer-img .divimg{
    width: 80%;
    margin: auto;
  }
</style>
