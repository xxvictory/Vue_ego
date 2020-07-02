import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Content from "@/views/Content"
import Params from "@/views/Params"
import Product from "@/views/Product"
import Layout from "@/views/Layout"

import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      isLogin:false
    }
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/product'
      },
      {
        path: 'content',
        name: 'Content',
        component: Content,
        meta:{
          isLogin:true
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: Params,
        meta:{
          isLogin:true
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: Product,
        meta:{
          isLogin:true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  if(to.meta.isLogin){ // 判断用户是否需要判断登陆
    if(store.state.LoginModule.token){ // token
      // 跳转到对应页面
      next();
    }else{
      // 去登录页面
      next({
        path:"/login"
      })
    }
  }else{
    next();
  }
})

export default router
