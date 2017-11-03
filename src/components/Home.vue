<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo">
        <!--<a href="/"><img src="../assets/logo.png" style="width:42px;margin-top: 5px;"></a>-->
      </div>
      <div class="topbar-title" :class="collapsed?'topbar-title-collapsed':'topbar-title-expanded'">
        <span>test</span>
      </div>

      <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-menuon" v-show="!collapsed"></i>
        <i class="iconfont icon-menuon1" v-show="collapsed"></i>
      </div>
      <!--<el-radio-group v-model="collapsed">-->
        <!--<el-radio-button :label="false">展开</el-radio-button>-->
        <!--<el-radio-button :label="true">收起</el-radio-button>-->
      <!--</el-radio-group>-->

      <!--右上角下拉-->
      <div class="topbar-account">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-mine_fill"></i>
            <span>{{sysUserName}}</span>
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/user/profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="/user/changepwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">

        <!--展开折叠开关-->
        <el-menu class="el-menu-vertical" :collapse="collapsed" router>
          <el-menu-item index="/dashboard" class="el-submenu__title">
              <i class="iconfont icon-homepage_fill" style="float: left;"></i>
              <span slot="title" class="first">首页</span>
          </el-menu-item>
          <el-submenu v-if="one.children&&one.menuShow" :index="one.name" v-for="(one,index) in $router.options.routes" :key="index">
            <template slot="title">
              <i :class="one.iconCls"></i>
              <span slot="title" class="elip first">{{one.name}}</span>
            </template>
            <div v-for="(two,index) in one.children" :key="index" v-if="two.menuShow">
              <el-submenu v-if="two.parent" :index="two.parent">
                <span slot="title" class="elip">{{two.parent}}</span>
                <el-menu-item :index="two.path" class="elip el-submenu__title">{{two.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="!two.parent" :index="two.path" class="elip el-submenu__title">{{two.name}}</el-menu-item>
            </div>
          </el-submenu>

        </el-menu>

        <!--菜单展开时的显示情况-->
        <!--<el-menu v-if="!collapsed" default-active="0" @open="handleOpen" @close="handleClose" router>-->
          <!--<template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">-->

            <!--<el-submenu :index="index+''">-->
              <!--<span slot="title"><i :class="item.iconCls"></i>{{item.name}}</span>-->
              <!--<el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow">-->
                <!--&lt;!&ndash;{{term.name}}&ndash;&gt;-->

                <!--<el-submenu v-if="term.children" :index="index+''">-->
                  <!--<span slot="title"><i :class="term.iconCls"></i>{{term.name}}</span>-->
                  <!--<el-menu-item v-for="one in term.children" :key="one.path" :index="one.path" v-if="one.menuShow">-->
                    <!--&lt;!&ndash;{{term.name}}&ndash;&gt;-->
                    <!--{{one.name}}-->
                  <!--</el-menu-item>-->
                <!--</el-submenu>-->
                <!--<el-menu-item v-else-if="!term.children" :index="term.path" class="el-submenu__title">-->
                  <!--<i :class="term.iconCls"></i>{{term.name}}-->
                <!--</el-menu-item>-->



              <!--</el-menu-item>-->
            <!--</el-submenu>-->
            <!--&lt;!&ndash;<el-menu-item v-else-if="!item.children" :index="item.path" class="el-submenu__title">&ndash;&gt;-->
              <!--&lt;!&ndash;<i :class="item.iconCls"></i>{{item.name}}&ndash;&gt;-->
            <!--&lt;!&ndash;</el-menu-item>&ndash;&gt;-->
          <!--</template>-->
        <!--</el-menu>-->

        <!--&lt;!&ndash;菜单折叠后的显示情况&ndash;&gt;-->
        <!--<ul v-else class="el-menu collapsed" ref="menuCollapsed">-->
          <!--<template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">-->
            <!--<li v-if="!item.leaf" :index="index+''" style="position: relative;">-->
              <!--<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>-->
              <!--<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">-->
                <!--<li v-for="term in item.children" :key="term.path" v-if="term.menuShow" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==term.path?'is-active':''"-->
                    <!--@click="$router.push(term.path)">{{term.name}}</li>-->
              <!--</ul>-->
            <!--</li>-->
            <!--<li v-else-if="item.leaf&&item.children&&item.children.length" class="el-menu-item el-submenu__title" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">-->
              <!--<i :class="item.iconCls"></i>-->
            <!--</li>-->
          <!--</template>-->
        <!--</ul>-->

      </aside>

      <!--右侧内容区-->
      <section class="content-container" :class="collapsed?'content-collapsed':'content-expanded'">
        <!--<div class="grid-content bg-purple-light">-->
          <!--<el-col :span="24" class="content-wrapper">-->
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          <!--</el-col>-->
        <!--</div>-->
      </section>
    </el-col>
  <!--底部-->
    <el-col :span="24" class="bobbar-wrap" style="height: 30px;background: #1F2D3D;position: absolute;bottom: 0;">

    </el-col>
  </el-row>
</template>

<script>
  import { bus } from '../bus.js'
  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      })
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        collapsed: false,
      }
    },
    methods: {
      //右上角下拉
      handleCommand(command) {
          this.$router.push(command);
      },

      handleOpen() {
//        console.log('handleopen');
      },
      handleClose() {
//        console.log('handleclose');
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '.././css/style.scss';
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: $dblack;
      /*padding: 0px;*/

    .topbar-btn {
      /*color: #fff;*/
    }
    .topbar-btn:hover {
      /*background-color:$dblack;*/
    }
    .topbar-logo {
      float: left;
      text-align: center;
      /*width: 49px;*/
      /*border-right: 1px solid #000;*/
      /*line-height: 26px;*/
    }
    .topbar-title {
      float: left;
      text-align: center;
      color: #ccc;
      transition: all 0.3s;
      /*border-right: 1px solid #000;*/
    }
    .topbar-title-collapsed{width: 64px;}
    .topbar-title-expanded{width: 220px;}
    .menu-toggle {
      float: left;
      color: #ccc;
      cursor: pointer;
      padding:0 20px;
      &:hover {color:#fff;}
      .iconfont{font-size: 20px;}
    }

    /*右上角*/
    .topbar-account {
      float: right;
      padding-right: 20px;
      height:50px;
      .el-dropdown-link {
        height: 50px;
        display: flex;
        align-items:center;
        color: #ccc;
        cursor: pointer;
      &:hover {color: #fff;text-shadow: 0 0 1px #eee;}
      span {margin: 0 5px 0 2px;}
      .icon-mine_fill{font-size: 40px;}
      }
    }

  }
  .main {
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 30px;
    overflow: hidden;
    background: $dblack;
  }
  /*menu*/
  aside {overflow-y:auto;width: 100%;}
  aside {
    margin-top: 10px;
    background:$dblack;
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 220px;
    }
    .el-menu-vertical.el-menu--collapse {
      /*width: 64px;*/
    }
    .el-menu-vertical{
      border-radius: 0;
      background: $dblack;
    }
  }
    .content-collapsed{margin-left: calc(-100% + 64px);}
    .content-expanded{margin-left: calc(-100% + 220px);}
    .content-container {
      background: $bc;
      border-radius: 10px 0 0 0;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      /*margin-left:-20px;*/
      transition: margin 0.3s;
      z-index:2;
      .content-wrapper {
        /*background-color: $bc;*/
        box-sizing: border-box;
      }
    }
  }
</style>
<style>
  .el-menu-item, .el-submenu__title {color: #ccc;}
  .el-submenu .el-menu {background: #324057;}
  .el-submenu .el-menu .el-menu {background: #475669;}
  .el-submenu .el-menu-item:hover, .el-submenu__title:hover,
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active
  {background-color: #00C1DE;color: #1F2D3D;}
  .el-submenu span {padding-right: 12px;}
  .menu-collapsed .el-submenu__icon-arrow {display: none;}
  .menu-collapsed .first {display: none;}
  /*.el-submenu__icon-arrow {right: 40px;}*/
  /*******************************************************iconset********************************************************/
  .el-submenu div.el-submenu__title {display: flex;}
  .el-menu .iconfont{
    font-size: 24px;
    vertical-align: baseline;
    margin-right: 6px;
  }
  /*系统中心*/
  /*******************************************************iconset end********************************************************/

  .warp-breadcrum{
    padding: 5px 0 15px 0px;
    border-bottom: 1px solid #efefef;
  }
  .warp-main{
    padding-top: 20px;
  }
</style>
