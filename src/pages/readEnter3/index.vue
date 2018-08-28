<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register" style="height:100%;">
        <div class="register-tit">
          <img src="../../static/img/tit4.png" alt="" mode="widthFix">
        </div>
        <div class="readEnter3">
          <div class="readEnter3-pop" v-if="popVideoBox">
            <div class="readEnter3pop">
              <div class="video-closed" @click="videoClose">
                <icon type="cancel" size="30" color="orange"/>
              </div>
              <img :src="popImg" v-if="popImg" alt="" mode="widthFix">
              <video :src="popVideo" autoplay="true" v-if="popVideo"></video>
            </div>
          </div>
          <div class="readEnter3-box" v-if="reviewReads!==null" v-for="re in reviewReads" :key="re">
            <div class="readEnter3box-time">
              {{re.resultDate}}
            </div>
            <div class="readEnter3box-img">
              <img :src="re.images===null?re.video+'?vframe/jpg/offset/1':re.images" alt="" mode="widthFix" @click="readImg(re)">
            </div>
            <div class="readEnter3box-tx">
              {{re.content}}
            </div>
          </div>
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
import Fly from 'flyio/dist/npm/wx'
import store from '../register/store'
export default {
  data () {
    return {
      reviewReads: null,
      popVideoBox: false,
      popVideo: null,
      popImg: null,
      showVideo: false,
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
    readImg (e) {
      // let that = this
      // let jsonObj = that.reviewReads
      // let jsonArr = []
      // for (var i = 0; i < jsonObj.length; i++) {
      //   jsonArr[i] = jsonObj[i].images
      // }
      // console.log(jsonArr)
      // // 图片预览
      // wx.previewImage({
      //   current: e.images, // 当前显示图片的http链接
      //   urls: jsonArr // 需要预览的图片http链接列表
      // })
      // 七牛云 视频采样缩略图https://5iwf.cn/ODdHTZ45?vframe/jpg/offset/1
      if (e.video === null) {
        this.popImg = e.images
        this.popVideo = false
        this.popVideoBox = true
        console.log('img')
      } else {
        this.popVideo = e.video
        this.popImg = false
        this.popVideoBox = true
        console.log('video')
      }
    },
    reviewRead () {
      let userId = this.result.id
      let that = this
      let fly = new Fly() // 创建fly实例
      fly.get('https://xcx.5iwf.cn/front/wx/getNotesList', {
        userId: userId
      }).then(res => {
        that.reviewReads = res.data.result.reverse()
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    videoClose (e) {
      this.popVideo = false
      this.popVideoBox = false
    }
  },

  created () {
    console.log('page index created', this)
  },
  mounted () {
    console.log('mounted', this)
  },
  onLoad () {
    this.reviewRead()
    console.log('page index onLoad', this)
  },
  onShow () {
    console.log('onShow', this)
  },
  onUnload () {
    console.log('onUnload', this)
  },
  onHide () {
    console.log('onHide', this)
  }
}
</script>

<style scoped>
  .readEnter3pop{
    position: relative;
  }
  .readEnter3-pop{
    position: fixed;
    top: 0;
    left:5%;
    width: 90%;
    padding: 10px;
    background-color: #313a5f;
    border-radius: 7px;
    /* border:2px solid #ffd800; */
    box-sizing: border-box;
    font-size: 12px;
  }
  .video-closed{
    position: absolute;
    top: -7px;
    right: -7px;
    z-index: 10;
  }
  .index .index-bg .readEnter3-pop img, .index .index-bg .readEnter3-pop video{
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  .readEnter3{
    height: 70%;
    overflow: scroll;
    padding-top: 3px;
    position: relative;
  }
  .readEnter3-box{
    padding: 0 10px;
    margin: auto;
    display: flex;
    font-size: 14px;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 2px solid #ffd800;
    padding-bottom: 10px;
  }
  .readEnter3box-time{
    margin-right: 15px;
  }
  .readEnter3box-img{
    width: 35%;
    margin-right: 7px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 7px;
  }
  .index .index-bg .readEnter3box-img img{
    width: 100%;
    min-height: 80px;
  }
  .readEnter3box-tx{
    flex: 1;
    text-align: left;
    font-size: 12px;
    word-break:break-all;
    max-height: 100px;
    overflow: scroll;
    padding-right: 10px;
    text-indent: 2em;
    box-sizing: border-box;
  }
  .readEnter1-botton{
    width: 60%;
    margin: auto;
    margin-top: 40px;
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
