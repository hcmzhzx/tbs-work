import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

//路由钩子
router.beforeEach((to, from, next) => {
   if (to.meta.only) {
      next();
      return
   }
   store.dispatch('userInfo').then(user => {
      const name = `${user.theme}_${to.meta.name}`;
      name == to.name ? next() : next({name,query:to.query,params:to.params});
   })
})

new Vue({
   el: '#app',
   router,
   store,
   components: {App},
   template: '<App/>'
})
