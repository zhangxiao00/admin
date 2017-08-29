import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import adList from '@/page/activityCenter/net/adList'
import BookCategoryList from '@/page/bookcategory/list'

import UserList from '@/page/user/list'
import UserChangePwd from '@/page/user/changepwd'
import UserProfile from '@/page/user/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
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
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '活动中心',
      menuShow: true,
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books',
      children: [
        {
          path: '/',
          component: Home,
          name: '.net',
          menuShow: true,
          iconCls: 'iconfont icon-books',
          children: [
            {path: '/activity/net/adList', component: adList, name: '广告列表', menuShow: true},
          ]
        },
        {path: '/bookcategory/list', component: BookCategoryList, name: '图书分类', menuShow: true},
        {
            path: '/',
            component: Home,
            name: '123',
            menuShow: true,
            iconCls: 'iconfont icon-books',
            children: [
                {path: '/activity/net/123', component: 123, name: '123', menuShow: true},
            ]
          },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    }
  ]
})

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
})

export default router
