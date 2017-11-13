import Vue from 'vue'
import Router from 'vue-router'
//basics
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
//table
import adList from '@/page/activityCenter/table/adList'
import myList from '@/page/activityCenter/table/myList'
import BookCategoryList from '@/page/bookcategory/list'
//user
import UserList from '@/page/user/list'
import UserChangePwd from '@/page/user/changepwd'
import UserProfile from '@/page/user/profile'

//plug
import Editor from '@/page/plug/editor'



// import Coupon from '@/page/operation/coupon'



// import {leftMenu} from '../api/api';


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes : [{
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      // leaf: true, // 只有一个节点
      menuShow: false,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页2', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      iconCls: 'iconfont icon-setup_fill', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '表格',
      menuShow: true,
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-setup_fill',
      children: [
        {
          path: '/activity/table/adList',
          component: adList,
          name: '广告列表',
          menuShow: true,
          iconCls: 'iconfont icon-books',
          parent:'什么列表',

        },
        {path: '/bookcategory/list', component: BookCategoryList, name: '图书分类', menuShow: true},
        {
          path: '/activity/table/myList',
          component: myList,
          name: '广告列表2',
          menuShow: true,
          iconCls: 'iconfont icon-books',
          parent:'什么列表2',

        },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '扩展',
      menuShow: true,
      iconCls: 'iconfont icon-setup_fill',
      children: [
        {path: '/plug/editor', component: Editor, name: '编辑器', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setup_fill',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    }]

});

// let newRouters = [
//   {
//     path: '/test',
//     component : (resolve) => require(['@/page/user/profile'],resolve),
//     name: 'test',
//     // menuShow: true,
//     // iconCls: 'iconfont icon-setup_fill',
//     // children: [
//     //     {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
//     // ]
//   },
// ];
// router.addRoutes(newRouters);


router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router
// export const menu
