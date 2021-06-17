import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
// import axios from 'axios'

/*Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:4321/api/'
//config 就是请求对象
axios.interceptors.request.use(config =>{
    console.log(config);
    config.headers.authorization = window.sessionStorage.getItem('token');
    return config;
})*/

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
