<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register">
        <div class="register-tit">
          <img src="../../static/img/tit1.png" alt="" mode="widthFix">
        </div>
        <div class="indexEnter">
          <div class="indexEnter-tit">
            <div class="divimg">
              <img v-if="isLogin.avatarUrl" :src="isLogin.avatarUrl" alt="" mode="widthFix">
            </div>
            <div class="divp">
              <p>{{result.name}}&emsp;{{result.grade}}</p>
              <p>阅读天数&ensp;{{result.dayNum}}</p>
              <p>{{result.housesName}}</p>
            </div>
          </div>
          <div class="indexEnter-link">
            <a href="/pages/readEnter1/main" hover-class="shake shake-horizontal">
              <img src="../../static/img/tubiao1.png" alt="" mode="widthFix">
              <p>我要阅读</p>
            </a>
            <a href="/pages/readEnter2/main" hover-class="shake shake-vertical">
              <img src="../../static/img/tubiao2.png" alt="" mode="widthFix">
              <p>阅读成绩</p>
            </a>
            <a href="/pages/readEnter3/main" hover-class="shake shake-rotate">
              <img src="../../static/img/tubiao3.png" alt="" mode="widthFix">
              <p>阅读回顾</p>
            </a>
            <a href="/pages/readEnter4/main" hover-class="shake shake-opacity">
              <img src="../../static/img/tubiao4.png" alt="" mode="widthFix">
              <p>阅读童心</p>
            </a>
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

import store from '../register/store'
export default {
  data () {
    return {
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
  },
  onLoad () {
  }
}
</script>

<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .indexEnter-tit .divimg{
    width: 25%;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
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
