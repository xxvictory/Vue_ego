import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./utils/event-bus"

Vue.config.productionTip = false

if(localStorage.getItem("token") && localStorage.getItem("egouser")){
  store.commit("LoginModule/setToken",localStorage.getItem("token"))
  store.commit("LoginModule/setUser",localStorage.getItem("egouser"))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
