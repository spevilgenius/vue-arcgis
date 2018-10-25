/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'es6-promise/auto'
import store from '../store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/mascot/main.scss'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
