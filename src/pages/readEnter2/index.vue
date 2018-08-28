<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register">
        <div class="register-tit" style="margin-bottom:5px;">
          <img src="../../static/img/tit3.png" alt="" mode="widthFix">
        </div>
        <div class="readEnter1">
          <div class="readEnter2">
            <div class="readLoad">
              <div class="readLoad-num">{{store}}/100</div>
              <div class="readLoad-map">
                <div class="readLoad-map-border">
                  <div class="readLoadmap-li" id="scoreHi" :style="{height: (store + '%')}"></div>
                </div>
              </div>
            </div>
            <div class="loading_bg">
              <div class="loading">
                <div class="show_01 show" :style="{top: (100 - store) + '%'}"></div>
                <div class="show_02 show" :style="{top: (100 - store) + '%'}"></div>
              </div>
            </div>
          </div>
          <div class="readEnter1-rule">
            <p class="sm">
              积分规则：我的积分每次打卡完成后自动累计，小龙人形象则会填充能量，在本次21天阅读习惯养成计划完成后可点亮小龙人，形成荣誉证书，期间可将阅读成绩分享给朋友圈的小伙伴呦。
            </p>
          </div>
          <div class="readEnter1-botton" style="margin-top:20px;">
            <button @click="onShareAppMessage">
              <img src="../../static/img/bt2.png" alt="" mode="widthFix">
            </button>
          </div>
        </div>
      </div>
      <div class="footer-img">
        <div class="divimg">
          <img src="../../static/img/ft.png" alt="" mode="widthFix">
        </div>
      </div>
    </div>
    <!-- <readShare v-if="shareShow" :userName="userName" :userDay="userDay"></readShare> -->
  </div>
</template>
<script>
// import readShare from '@/pages/readShare'
import store from '../register/store'
export default {
  data () {
    return {
      store: null,
      shareShow: false,
      userName: '韩美么',
      userDay: '10',
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
    subShar (res) {
      this.shareShow = true
    },
    onShareAppMessage: function (res) {
      console.info(this.result)
      const url = '../readShare/main'
      wx.navigateTo({ url })
    }
  },

  onLoad () {
    this.store = this.result.dayNum * 4 + 16
    console.log('______' + this.store)
    if (this.store === 100) {
      const url = '../readHonor/main'
      wx.navigateTo({ url })
    }
  }
}
</script>
<style scoped>
  .readEnter2{
    width: 80%;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
  }
  .readLoad-map{
    width: 20px;
    height: 150px;
    border-radius: 6px;
    border: 1px solid #9cd3cd;
    margin: auto;
    padding: 5px;
  }
  .readLoad-num{
    line-height: 20px;
  }
  .readLoad-map-border{
    width: 100%;
    height: 100%;
    border: 1px solid #9cd3cd;
    position: relative;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .readLoadmap-li{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40%;
    background-color: #9cd3cd;
    box-sizing: border-box;
    border-radius: 0 0 6px 6px;
  }
  .readLoad{
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 10px;
    width: 50px;
    text-align: center;
  }
  .loading_bg{
    margin-left: 60px;
    width:130px;
    height:215px;
    background:url(http://jwkjeans.com/static/mobile/images/wx/loading_bg.png) no-repeat left top;
    background-size: 100%;
    position: relative;
    box-sizing: border-box;
  }
  .loading{
    width:100%;
    height:100%;
    position:absolute;
    -webkit-mask-image:url(http://jwkjeans.com/static/mobile/images/wx/loading.png);
    -webkit-mask-size:100%;
    background-size: 100%;
  }
  .show{
    width:100%; height:100%; position:absolute; left:0; top:60%;
    animation:sploosh 8s ease-in-out both infinite;
    -webkit-animation:sploosh 8s ease-in-out both infinite;
    background-image: url(http://jwkjeans.com/static/mobile/images/wx/bolang.png);
    background-size: 100%;
    background-repeat: repeat;
  }
  .show_01{-webkit-animation-delay: -0.8s;  animation-delay: -0.8s; opacity:.4;}
  .show_02{-webkit-animation-delay: -1.6s;  animation-delay: -1.6s; opacity:1;}
  /*.show_03{-webkit-animation-delay: -2.4s;  animation-delay: -2.4s; opacity:0.6;}
  .show_04{-webkit-animation-delay: -3.2s;  animation-delay: -3.2s; opacity:0.8;}*/

  @-webkit-keyframes sploosh{
    0% {background-position: 0 bottom;}
    50% {background-position: 200px bottom;}
    100% {background-position: 0 bottom;}
  }
  @keyframes sploosh{
    0% {background-position: 0 bottom;}
    50% {background-position: 200px bottom;}
    100% {background-position: 0 bottom;}
  }
  .readEnter1-botton{
    width: 60%;
    margin: auto;
    margin-top: 30px;
  }
  .readEnter1-botton button{
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
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
