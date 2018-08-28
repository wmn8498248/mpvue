<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bg.jpg" alt="" class="img_bg">
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
    <!-- <popup :text="useName"></popup> -->
  </div>
</template>

<script>
import Fly from 'flyio/dist/npm/wx'
import popup from '@/components/popup'
import store from '../register/store'
export default {
  data () {
    return {
      result: null,
      videoPath: '',
      animationData: '',
      rotate: {},
      useName: null,
      motto: '书润童心,阅启成长',
      userInfo: {}
    }
  },
  components: {
    popup
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
  }
}
</script>

<style scoped>
.warp{width:100px;height:100px;margin:0 auto;}
.sun{position:absolute;z-index: 1;top:0;left:0;width:100%;height:100%;background:lightseagreen;
  border-radius: 50%;animation:move 1s ease infinite;
}
.sun.move3{animation:move3 2s ease-in-out;}
@keyframes move{
  0%{transform: scale(1) ;opacity:1;}
  100%{transform: scale(1.4); opacity: 0;}
}
.box{position:relative;}
  .index{
    width: 100%;
    height: 100vh;
  }
  .indexbox{
    position: relative;
    z-index: 2;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
  .index-button{
    position: absolute;
    top: 59%;
    width: 100%;
    z-index: 9;
  }
  .index-bg img{
    width: 100%;
    height: 100vh;
  }
  .index-button .buttonSub{
    display: block;
    width: 25%;
    margin: 0 auto;
  }
  .index-button img{
    display: block;
    width:100%;
  }
</style>
