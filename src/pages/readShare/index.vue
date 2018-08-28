<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/shar.jpg" alt="" class="img_bg">
      <div class="readshare">
        <div class="readshare-p">
          我是{{result.name}}，我参加<br>
          “2018厦门龙湖小龙人21天阅读习惯<br>
          养成计划”已坚持打卡
        </div>
        <div class="shareBig">
          {{result.dayNum}}<span>天</span>
        </div>
      </div>
      <div class="index-button">
        <div class="warp">
          <div class="box">
            <button open-type='getUserInfo' class="indexbox" @click="getUserInfo" hover-class="shake shake-crazy">
              <img src="../../static/img/bt.png" alt="" mode="widthFix">
            </button>
            <span class="sun"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../register/store'
import Fly from 'flyio/dist/npm/wx'
export default {
  data () {
    return {
      userName: '韩梅梅',
      userDay: '21',
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
  // props: ['userName', 'userDay'],
  methods: {
    subClick () {
      // this.loginAjax()
      let userNew = this.result.flag
      if (userNew === false) {
        const url = '../register/main'
        wx.navigateTo({ url })
      } else {
        const url = '../readEnter/main'
        wx.navigateTo({ url })
      }
    },
    loginAjax () {
      let _this = this
      wx.login({
        success: function (res) {
          var code = res.code
          // _this.subClick()
          if (code) {
            let fly = new Fly() // 创建fly实例
            fly.get('https://xcx.5iwf.cn/wechat/user/login', {
              code: code
            }).then(res => {
              wx.hideLoading()
              store.commit('newResult', res.data)
              _this.result = res.data
              _this.subClick()
            })
          } else {
            console.log('获取用户登录态失败：' + res.errMsg)
          }
        }
      })
    },
    getUserInfo () {
      let _this = this
      wx.getUserInfo({
        success: (res) => {
          store.commit('changeLogin', res.userInfo)
          _this.loginAjax()
        },
        fail () {
          console.log('拒绝收取那')
        }
      })
    }
  },
  created () {
  },
  onShareAppMessage: function () {
    return {
      title: '2018厦门龙湖小龙人阅读习惯养成计划',
      desc: '厦门龙湖小龙人',
      path: '/pages/readShare/main?name=' + this.userName + '&age=' + this.userDay,
      imageUrl: '/static/img/jq.jpg',
      success: function (res) {
        // 转发成功
        console.log('分享成功')
      },
      fail: function (res) {
        console.log('取消分享')
      }
    }
  },
  onLoad: function (optionsTa) {
    let options = JSON.stringify(optionsTa)
    if (options !== '{}') {
      this.userName = options.name
      this.userDay = options.age
    }
  }
}
</script>

<style scoped>
.indexbox{background-color: transparent; padding: 0;}
.warp{width:100px;height:100px;margin:0 auto;}
.box{position:relative;}
.index-button{
  position: absolute;
  top: 61%;
  width: 100%;
  z-index: 9;
}
  .index{
    width: 100%;
    height: 100vh;
  }
  .readshare-p{
    font-size: 14px;
  }
  .shareBig{
    margin-top: 10px;
    font-size: 60px;
    color: #ffd800;
    line-height: 50px;
    font-weight: 800;
  }
  .shareBig span{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-weight: 800;
    font-size: 14px;
    color: black;
    background-color: #ffd800;
    border-radius: 50%;
    vertical-align: bottom;
  }
  .indexshare{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9;
  }
  .readshare{
    position: absolute;
    top: 38%;
    width: 100%;
    color: #fff;
    text-align: center;
    line-height: 23px;
  }
  .index-bg{
    width: 100%;
  }
  .index-bg img{
    width: 100%;
    height: 100%;
  }

</style>
