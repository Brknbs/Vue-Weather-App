import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

Vue.use(VueAxios, Axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
