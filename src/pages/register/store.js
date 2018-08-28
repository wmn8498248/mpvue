// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: [],
    result: [],
    userInfo: [],
    reviewRead: []
  },
  mutations: {
    changeLogin (state, data) {
      state.isLogin = data
    },
    newResult (state, msg) {
      state.result = msg
    },
    userInfo (state, msg) {
      state.userInfo = msg
    },
    reviewRead (state, msg) {
      state.reviewRead = msg
    }
  }
})

export default store
