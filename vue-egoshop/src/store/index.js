import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from "./modules/loginModule"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    LoginModule
  }
})

// 在真实开发中，一般不会在store的最外层处理信息
// 一般会创建module