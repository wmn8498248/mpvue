<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register">
        <div class="register-tit">
          <img src="../../static/img/tit.png" alt="" mode="widthFix">
        </div>
        <ul>
          <li>
            所在楼盘：<br>
            <picker @change="estateChange" :range="estateCity">
              <div class="pick-input">{{estateCity[estateIndex]}}</div>
            </picker>
          </li>
          <li>
            门牌号：<br>
            <input v-model="number" type="text" required>
          </li>
          <li>
            小龙人姓名：<br>
            <input v-model="userName" type="text" required>
          </li>
          <li>
            年级：<br>
            <picker @change="bindCountryChange" :range="countries">
              <div class="pick-input" >{{countries[countryIndex]}}</div>
            </picker>
          </li>
          <li>
            业主姓名：<br>
            <input v-model="ownerName" type="text" required>
          </li>
          <li>
            电话号码：<br>
            <input v-model="mobile" type="number" required>
          </li>
        </ul>
        <div class="register-botton" @click="bindViewTap">
          <img src="../../static/img/anniuq1_03.png" alt="" mode="widthFix">
          <!-- <img src="" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import Fly from 'flyio/dist/npm/wx'
export default {
  data () {
    return {
      wxopenid: null,
      wxid: null,
      cityList: null,
      number: null, // 门牌号
      userName: null, // 小龙人姓名
      ownerName: null, // 业主姓名
      mobile: null, // 手机号
      countryIndex: 0,
      countries: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
      estateCityId: [],
      estateCity: [],
      estateIndex: 0,
      motto: '书润童心-注册',
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
    // increment () {
    //   store.commit('changeLogin', '1')
    // },
    // newResult () {
    //   store.commit('newResult', '2')
    // },
    bindViewTap (type) {
      let housesId = this.estateCityId[this.estateIndex]
      let housesName = this.estateCity[this.estateIndex]
      let address = this.number // 门牌号
      let name = this.userName // 小龙人姓名
      let grade = this.countries[this.countryIndex] // 年级
      let ownersName = this.ownerName // 业主姓名
      let mobile = this.mobile // 电话号码
      let openid = this.result.openid
      let id = this.result.id
      console.log('楼盘id' + housesId)
      console.log('所在楼盘' + housesName)
      console.log('门牌号' + address)
      console.log('小龙人姓名' + name)
      console.log('年级' + grade)
      console.log('业主姓名' + ownersName)
      console.log('电话号码' + mobile)
      console.log('微信openid' + openid)
      console.log('id' + id)
      if (housesName !== null &&
      address !== null &&
      name !== null &&
      grade !== null &&
      ownersName !== null &&
      mobile !== null) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        let fly = new Fly() // 创建fly实例
        fly.post('https://xcx.5iwf.cn/front/wx/saveUser', {
          housesId: housesId, // 楼盘id
          housesName: housesName, // 楼盘名称
          address: address, // 门牌号地址
          name: name, // 小龙人姓名
          grade: grade, // 年级
          ownersName: ownersName, // 业主姓名
          mobile: mobile, // 电话号码
          openid: openid, // 微信openid
          id: id // 用户id，用户登录调用login时返回id和openid
        }, {headers: {'content-type': 'application/x-www-form-urlencoded'}}).then(res => {
          wx.hideLoading()
          console.info(res)
          store.commit('userInfo', res.data.result)
          if (res.data.success === true) {
            const url = '../readEnter/main'
            wx.navigateTo({ url })
            this.contentNewsList = res.data.result.data
          } else {
            wx.showToast({
              title: '请重试',
              icon: 'none',
              duration: 1000
            })
          }
        })
      } else {
        wx.showToast({
          title: '所填信息不允许为空',
          icon: 'none',
          duration: 1000
        })
      }
    },
    cityAjax () {
      let _this = this
      let fly = new Fly() // 创建fly实例
      fly.get('https://xcx.5iwf.cn/front/wx/getHousesInfo').then(res => {
        wx.hideLoading()
        let estateCity = res.data.result
        estateCity.forEach(element => {
          _this.estateCity.push(element.name)
          _this.estateCityId.push(element.id)
        })
      })
    },
    estateChange (e) {
      this.estateIndex = e.mp.detail.value
    },
    bindCountryChange (e) {
      this.countryIndex = e.mp.detail.value
    }
  },

  onLoad () {
    this.cityAjax()
  }
}
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .index-bg img{
    width: 100%;
    height: 100%;
  }
  .register ul li{
    width: 50%;
    margin: auto;
    font-size: 13px;
    margin-bottom: 8px;
    line-height: 23px;
  }
  .register-botton{
    width: 50%;
    margin: auto;

    margin-top: 20px;
  }
  .register ul li input,.register ul li .pick-input{
    width: 100%;
    line-height: 25px;
    height: 25px;
    border-radius: 7px;
    border: none;
    background-color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
    color: #000;
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
</style>
