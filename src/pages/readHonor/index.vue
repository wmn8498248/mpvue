<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/honor.jpg" alt="" class="img_bg">
      <div class="readHonor">
        <p class="honorTit"><span>{{result.name}}</span>同学：</p>
        <p class="honorTx">在2018小龙人阅读习惯养成计划活动中，表现出色，坚持阅读，养成了阅读的好习惯，特此授予：<span>“阅读之星”</span> 荣誉称号！</p>
        <p class="honorDate">龙湖集团（厦门）分公司<br>{{userDay}}</p>
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
      reviewReads: null,
      userName: null,
      userDay: null,
      motto: '书润童心,阅启成长',
      userInfo: {},
      options: {}
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
    reviewRead () {
      let userId = this.result.id
      let that = this
      let fly = new Fly() // 创建fly实例
      fly.get('https://xcx.5iwf.cn/front/wx/getNotesList', {
        userId: userId
      }).then(res => {
        that.userDay = res.data.result[20].createTime
        that.reviewReads = res.data.result.reverse()
      }).catch(err => {
        console.log(err.status, err.message)
      })
    }
  },
  created () {
  },
  onShareAppMessage: function () {
    return {
      title: '2018厦门龙湖小龙人阅读习惯养成计划',
      desc: '厦门龙湖小龙人',
      path: '/pages/readHonor/main?name=' + this.result.name + '&age=' + this.userDay,
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
    this.reviewRead()
    let options = JSON.stringify(optionsTa)
    if (options !== '{}') {
      console.log('+++' + options)
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
.readHonor{
  position: absolute;
  top: 31%;
  left: 0;
  width: 100%;
  color: #fff;
  font-size: 15px;
  padding: 0 20px;
  box-sizing: border-box;
}
.readHonor .honorTit span{
  display: inline-block;
  padding: 0 15px;
  color: #ffd800;
  font-weight: 800;
  border-bottom: 1px solid #fff;
}
.readHonor .honorTx{
  text-indent: 2em;
  margin-top: 7px;
  line-height: 23px;
}
.readHonor .honorTx span{
  font-size: 20px;
  color: #ffd800;
  padding: 0;
}
.readHonor .honorDate{
  margin-top: 5px;
  float: right;
  text-align: center;
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
  .index-bg img{
    width: 100%;
    height: 100%;
  }

</style>
