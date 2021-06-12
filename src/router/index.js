import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from "@/components/user/User";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {path: '/welcome', component: Welcome},
                {path: '/index/users', component: User},
            ]
        }
    ]
})

//路由导行守卫
router.beforeEach((to, from, next) => {
    //to 将访问的路径
    // 从哪个路径跳转过来
    //next 是一个放行函数
    if (to.path === '/login') {
        return next();
    }

    if (!window.sessionStorage.getItem('token')) return next('/login');
    next();
})

export default router;
