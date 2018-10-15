/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import store from '../store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
