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
      <!--展开折叠开关-->      
      <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-menuon" v-show="!collapsed"></i>
        <i class="iconfont icon-menuon1" v-show="collapsed"></i>
      </div>
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
        <el-menu class="el-menu-vertical"
                 ref="mymenu"
                 :default-active="$route.path"
                 :collapse="collapsed"
                 :unique-opened="true"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="selectMenu"
                 router>
          <template v-for="(one,one_index) in menuData">
            <el-submenu v-if="one.child&&one.child.length" :index="one_index+''" :key="one_index">
              <template slot="title">
                <i :class="one.iconCls"></i>
                <span slot="title" class="elip first">{{one.authName}}</span>
              </template>
              <template v-for="(two,two_index) in one.child">
                <el-submenu v-if="two.child&&two.child.length" :index="one_index+'-'+two_index+''" :key="two_index">
                  <span slot="title" class="elip">{{two.authName}}</span>
                  <el-menu-item @click="_click(three.path)" v-for="(three,index) in two.child" :key="index" :index="three.path" class="elip el-submenu__title">{{three.authName}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="two_index" :index="two.path" class="elip el-submenu__title">{{two.authName}}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else class="el-submenu__title" index="/dashboard" :key="one_index">
                <i class="iconfont icon-homepage_fill" style="float: left;"></i>
                <span slot="title" class="first">{{one.authName}}</span>
            </el-menu-item>
        
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container" :class="collapsed?'content-collapsed':'content-expanded'">
        {{$route.path}}
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
  // import {menuTreeData} from '../api/api'

  export default {
    name: 'home',
    created(){
      // let _this = this;
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      });
      
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        collapsed: false,
        opened_menu : [],
        menuData: [
                    {
                        "child": [],
                        "authName": "首页",
                        "path": "/page/index",
                        "iconCls": "iconfont iconfont icon-books"
                    },

                    {
                        "child": [
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "新增商品SKU导入",
                                        "path": "/page/commodity/CommodityAddSKU",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "修改商品SKU导入",
                                        "path": "/page/commodity/CommodityEditSKU",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "基础数据导出",
                                        "path": "/page/commodity/CommodityProductList-select?type=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类管理",
                                        "path": "/page/commodity/CommodityClassification",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "产品列表查询",
                                        "path": "/page/commodity/CommodityProductList-select",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "产品列表操作",
                                        "path": "/page/commodity/CommodityProductList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "品牌管理",
                                        "path": "/page/commodity/CommodityBrand",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类属性导入",
                                        "path": "/page/commodity/CommodityClassAttribute",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类属性查询",
                                        "path": "/page/commodity/CommodityClassAttribute?type=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "品牌授权",
                                        "path": "/page/commodity/commodityGrant",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "供应商仓库维护",
                                        "path": "/page/commodity/supplierUphold",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "临时数据修改",
                                        "path": "/page/commodity/commodityTemList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "临时数据新增",
                                        "path": "/page/commodity/commodityTemNew",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "供应商ID同步",
                                        "path": "/page/commodity/supplierList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "品牌证书管理",
                                        "path": "/page/commodity/managementBrand",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "运费管理",
                                        "path": "/page/commodity/freightManagement",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "京东商品",
                                        "path": "/page/commodity/jingdong",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "第二套分类",
                                        "path": "/page/commodity/brandClassification",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "轴承查看",
                                        "path": "/page/commodity/bearingView",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "运费管理（物流）",
                                        "path": "/page/commodity/freightLogistics",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "商品编码查询",
                                        "path": "/page/commodity/CommoditySelectCode",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": "基础数据",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "OEM品牌维护",
                                        "path": "/page/commodity/OEMbrand",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类维护",
                                        "path": "/page/commodity/OEMClassified",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "订货号生成",
                                        "path": "/page/commodity/OEMOrderNumber",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": "OEM编码管理",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "产品中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "询价单列表",
                                "path": "/page/inquirySheet/inquirySheetList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "发起询价单",
                                "path": "/page/inquirySheet/addinquirySheet",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待处理的询价单",
                                "path": "/page/inquirySheet/pendingInquirySheet",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "询价汇总",
                                "path": "/page/inquirySheet/inquirySummary",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "询价量统计",
                                "path": "/page/inquirySheet/quotationStatistics",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "采购品牌关系",
                                "path": "/page/inquirySheet/purchasingBrand",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "询价单",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "新建订单",
                                "path": "/page/order/manualOrder",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待客服审核（手工单）",
                                "path": "/page/order/OrderCustomer",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待主管审核（手工单）",
                                "path": "/page/order/OrderExamine",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待付款订单",
                                "path": "/page/order/orderPay",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待确认付款",
                                "path": "/page/order/PaymentSure",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待发货订单",
                                "path": "/page/order/orderShipped",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "订单列表",
                                "path": "/page/order/selectOrder",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "原始订单列表",
                                "path": "/page/order/originalOrder",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "库存查询",
                                "path": "/page/order/orderSelected",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "新增商品",
                                "path": "/page/order/orderAddGoods",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "付款单列表",
                                "path": "/page/order/OrderPayment",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "批量报价",
                                "path": "/page/order/batchQuote",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "付款单待发起",
                                "path": "/page/order/paymentOrderno",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待主管审核付款单",
                                "path": "/page/order/SupervisorOrderno",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "订单未结清",
                                "path": "/page/order/financeNo",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "未审核付款单列表",
                                "path": "/page/order/paymentBill",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "余额转出发起",
                                "path": "/page/order/balanceTransfer",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "余额转出列表",
                                "path": "/page/order/balanceTransferList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "余额转出审核",
                                "path": "/page/order/balanceExamine",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "线下银行查询",
                                "path": "/page/order/bankOffline",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "销售中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "上架商品列表",
                                        "path": "/page/commodity/commodityList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "上架SKU商品修改",
                                        "path": "/page/commodity/CommodityMountingEditSKU",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Net",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "商城上架中心",
                                        "path": "/page/commodity/SellerGoodsList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "商城上架商品修改",
                                        "path": "/page/commodity/ShoppingGoods",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Com",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "上架中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "财务确认",
                                "path": "/page/finance/financeConfirm",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "财务订单统计",
                                "path": "/page/chartReport/financialCount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "地推销售明细",
                                "path": "/page/chartReport/crmOrderDetail",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "当月订单发货时间报表",
                                "path": "/page/finance/orderDeliveryTime",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "财务当月确认到款",
                                "path": "/page/finance/orderMoneyMouth",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "1贷通支付订单",
                                "path": "/page/finance/loanThrough",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "1贷通打款确认",
                                "path": "/page/finance/loanThroughSure",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "增值税专用发票",
                                "path": "/page/finance/invoiceVAT",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "发票快递导入",
                                "path": "/page/finance/importInvoice",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "余额转出确认",
                                "path": "/page/finance/balanceSure",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "收款单",
                                "path": "/page/finance/receiptList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "已确认付款单",
                                "path": "/page/finance/confirmationPayment",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "虚拟卡号",
                                "path": "/page/finance/virtualCardList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "出库单列表",
                                "path": "/page/finance/orderOutboundList",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "财务中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "客户下单统计",
                                "path": "/page/chartReport/buyerOrderNum",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "品牌销售统计",
                                "path": "/page/chartReport/brandOrderNum",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "地推销售统计",
                                "path": "/page/chartReport/manageOrderNum",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "商品销售统计",
                                "path": "/page/chartReport/goodsOrderNum",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "新增用户统计",
                                "path": "/page/chartReport/newUserCount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "用户活跃数",
                                "path": "/page/chartReport/huoyuedu",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "订单数统计",
                                "path": "/page/chartReport/order",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "下单用户转化率",
                                "path": "/page/chartReport/zhuanhualv",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "重复下单率",
                                "path": "/page/chartReport/chongfuxiadanlv",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "销售营业额",
                                "path": "/page/chartReport/yingyeE",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "商品分类销售统计",
                                "path": "/page/chartReport/goodsCategory",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "商品系列销售统计",
                                "path": "/page/chartReport/goodsSeries",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "关键词搜索日志",
                                "path": "/page/chartReport/keywordCount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "客单价统计",
                                "path": "/page/chartReport/kedanjia",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "首单",
                                "path": "/shoudan",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "热卖SKU",
                                "path": "/page/chartReport/hotSKU",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "线上推广统计",
                                "path": "/page/chartReport/lineUp",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "运营报表",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "会员阶梯价",
                                "path": "/page/finance/memberPrice",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "早市",
                                "path": "/page/activitycenter/morningList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "热卖推荐",
                                "path": "/page/operationCenter/hotRecommend",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "直播",
                                "path": "/page/operationCenter/live/livePlatform",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "广告列表统计",
                                "path": "/page/operationCenter/AdList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "热卖推荐统计",
                                "path": "/page/operationCenter/recommendedStatistics",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "工豆充值申请",
                                "path": "/page/operationCenter/gongdou/rechargeApplication",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "工豆充值确认",
                                "path": "/page/operationCenter/gongdou/rechargeConfirmation",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "早市统计",
                                "path": "/page/operationCenter/statisticsMarket",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "推广UV花费",
                                "path": "/page/operationCenter/spendExtension",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "推送京东商品列表",
                                "path": "/page/operationCenter/jingDong/jingDongList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "推广花费汇总",
                                "path": "/page/operationCenter/spendSummary",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "品牌经理维护",
                                "path": "/page/operationCenter/purchasingBrand",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "优惠券",
                                "path": "/page/operationCenter/coupon/couponManagement",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "app版本维护",
                                "path": "/page/operationCenter/app/appMaintenance",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "优惠券集市页维护",
                                "path": "/page/operationCenter/coupon/couponMarket",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "运营中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "产品活动维护",
                                        "path": "/page/activitycenter/activityProductList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "清仓活动",
                                        "path": "/page/activitycenter/clearance/activityClearance",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "添加活动",
                                        "path": "/page/activitycenter/activityProductADD",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "添加广告",
                                        "path": "/page/activitycenter/activityAdvertisement",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "广告列表",
                                        "path": "/page/activitycenter/activityAdvertisementList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "新增特卖预告",
                                        "path": "/page/activitycenter/activityAddSale",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "特卖预告",
                                        "path": "/page/activitycenter/activitySaleList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "团购活动列表",
                                        "path": "/page/group/groupList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "线下推广渠道统计",
                                        "path": "/page/chartReport/promotionChannelStatistics",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "新建团购活动",
                                        "path": "/page/group/NewGroup",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "团购活动提醒",
                                        "path": "/page/group/groupActivity",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "团购活动统计",
                                        "path": "/page/group/groupStatistics",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "线上推广渠道管理",
                                        "path": "/page/activitycenter/channelAdministration",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "组合营销",
                                        "path": "/page/activitycenter/combinedMarketing",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "线上推广统计",
                                        "path": "/page/chartReport/lineUp",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "签到管理",
                                        "path": "/page/activitycenter/attendanceManagement",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "套餐活动明细",
                                        "path": "/page/activitycenter/packageDetails",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "组合营销统计",
                                        "path": "/page/activitycenter/combinedStatistics",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "O2O品牌推广统计",
                                        "path": "/page/activitycenter/o2oBrandExtension",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "西门子PLC培训推广",
                                        "path": "/page/activitycenter/siemensPLC",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Net",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "添加商城活动",
                                        "path": "/page/activitycenter/storeActivityProductADD",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "商城产品活动维护",
                                        "path": "/page/activitycenter/storeActivityProductList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "添加商城广告",
                                        "path": "/page/activitycenter/storeActivityAdvertisement",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "商城广告列表",
                                        "path": "/page/activitycenter/storeActivityAdvertisementList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Com",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "活动中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "现金券充值",
                                "path": "/page/recharge/rechargeCashcoupon",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "兑换记录",
                                "path": "/page/recharge/rechargeExchange",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "折扣比例",
                                "path": "/page/recharge/rechargeDiscount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "积分商品维护",
                                "path": "/page/recharge/rechargeGift",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "礼品订单记录",
                                "path": "/page/recharge/giftOrderRecord",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "礼品维护",
                                "path": "/page/recharge/giftMaintenance",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "工豆分配",
                                "path": "/page/recharge/beanDistribution",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "工豆充值",
                                "path": "/page/recharge/beanRecharge",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "积分/现金券",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": ".Net",
                                "path": "/abc",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "店铺管理",
                                        "path": "/page/shopManagement/ShopList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Com",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "店铺维护",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "新增公告",
                                "path": "/page/message/addNotice",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "公告列表",
                                "path": "/page/message/NoticeList",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "意见箱",
                                "path": "/page/suggestions/complaintBox",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "关键词搜索日志",
                                "path": "/page/chartReport/keywordCount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "订单评价",
                                "path": "/page/message/evaluationOrder",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "消息中心/意见箱",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "推荐品牌管理",
                                        "path": "/page/shoppingAdministration/brandAdmin?channel=1&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "楼层管理（特卖）",
                                        "path": "/page/shoppingAdministration/ActivityFloorList",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "精选品牌",
                                        "path": "/page/shoppingAdministration/brandSelected?channel=1&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "楼层管理（首页）",
                                        "path": "/page/shoppingAdministration/floorAdminIndex?channel=1&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类推荐",
                                        "path": "/page/shoppingAdministration/classRecommend?channel=1&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "新品推荐（广告）",
                                        "path": "/page/shoppingAdministration/newAdvertisement?channel=1&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Net",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [
                                    {
                                        "child": [],
                                        "authName": "热门搜索管理",
                                        "path": "/page/shoppingAdministration/shopIndexhotsearch",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "广告管理",
                                        "path": "/page/shoppingAdministration/shopadvert",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "品牌推荐管理",
                                        "path": "/page/shoppingAdministration/brandAdmin?channel=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "精选品牌",
                                        "path": "/page/shoppingAdministration/brandSelected?channel=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "楼层管理",
                                        "path": "/page/shoppingAdministration/floorAdminIndex?channel=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "分类推荐",
                                        "path": "/page/shoppingAdministration/classRecommend?channel=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "网站公告",
                                        "path": "/page/shoppingAdministration/webNotice",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "每日推荐管理",
                                        "path": "/page/shoppingAdministration/dayrecom",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "新品推荐（广告）",
                                        "path": "/page/shoppingAdministration/newAdvertisement?channel=2&",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "楼层产品管理",
                                        "path": "/page/shoppingAdministration/floorProducts",
                                        "iconCls": "iconfont icon-setup_fill"
                                    },
                                    {
                                        "child": [],
                                        "authName": "楼层广告管理",
                                        "path": "/page/shoppingAdministration/floorAdver",
                                        "iconCls": "iconfont icon-setup_fill"
                                    }
                                ],
                                "authName": ".Com",
                                "path": "",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "首页维护",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "待售后确认(退款单)",
                                "path": "/page/order/customerReturn",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "退款单列表",
                                "path": "/page/order/returnOrder",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "待财务审核（退款单）",
                                "path": "/page/finance/examineFinance",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "退货退款",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "帐号",
                                "path": "/page/system/managerAccount",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "角色",
                                "path": "/page/system/managerRole",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "员工",
                                "path": "/page/system/managerStaff",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "权限",
                                "path": "/page/system/managerMenu",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "飞利浦数据上传",
                                "path": "/page/system/philipsUpload",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "部门",
                                "path": "/page/system/managerDept",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "系统中心",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "线下体验店二维码管理",
                                "path": "/page/microMall/codeQR",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "推广明细",
                                "path": "/page/microMall/extensionDetailed",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "返现明细",
                                "path": "/page/microMall/returnDetail",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "提现管理",
                                "path": "/page/microMall/cashManagement",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "返现设置",
                                "path": "/page/microMall/returnSetting",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "O2O微商模块",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "客户列表",
                                "path": "/page/mallCustomer/customerList",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "商城客户管理",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    },
                    {
                        "child": [
                            {
                                "child": [],
                                "authName": "套餐管理",
                                "path": "/page/ladderPrice/packageManage",
                                "iconCls": "iconfont icon-setup_fill"
                            },
                            {
                                "child": [],
                                "authName": "套餐商品",
                                "path": "/page/ladderPrice/shopPackage",
                                "iconCls": "iconfont icon-setup_fill"
                            }
                        ],
                        "authName": "大客户套餐管理",
                        "path": "",
                        "iconCls": "iconfont icon-setup_fill"
                    }
                ]
      }
    },
    methods: {
      //右上角下拉
      handleCommand(command) {
          this.$router.push(command);
      },

      handleOpen(key,keyPath) {
        // console.log(key,keyPath);
        // this.$refs.mymenu.open('8-0');
      },
      handleClose(key,keyPath) {
        // console.log(key,'///////',keyPath)
//        console.log('handleclose');
        // console.log(this.opened_menu,'666');
        let i = this.opened_menu.findIndex(v => v === key);
        // console.log(i);
        for(i;i<this.opened_menu.length;i++){
            // console.log(this.opened_menu[i]);
            this.$refs.mymenu.close(this.opened_menu[i]);
        }
        // this.$refs.mymenu.close();
      },
      _click (param){
        // console.log(param);
      },
      selectMenu(index, indexPath){
        //   console.log(this.$refs.mymenu.openedMenus);
        //只有一级的，如首页，点击后关闭原有打开
        if(indexPath.length === 1){
            for(let i of this.opened_menu){
                // console.log(i);
                this.$refs.mymenu.close(i);
            }
        }
        
        this.opened_menu = [...this.$refs.mymenu.openedMenus];
      },

      //折叠导航栏
      collapse: function () {
        if(this.collapsed){
            for(let i of this.opened_menu){
            // console.log(i);
            this.$refs.mymenu.open(i);
            }
            this.collapsed = !this.collapsed;
        }else{
            for(let i of this.opened_menu){
            // console.log(i);
            this.$refs.mymenu.close(i);
            }
            setTimeout(() => {
            this.collapsed = !this.collapsed;
            },300);
        }
        // console.log(this.opened_menu)
        // for(let i of this.opened_menu){
        //     // console.log(i);
        //     this.$refs.mymenu.open(i);
        // }
        // setTimeout(() => {
        //     this.collapsed = !this.collapsed;
        // },300);
        // this.handleOpen();
      },
    //   showMenu(i, status){
    //     this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    //   },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      linkTo(path){
        if(path === 'index'){
            this.$router.push({path: '/page/index'});
        }else{
            this.$router.push({path: path});
        }

      }
    },
    mounted() {
        var user = sessionStorage.getItem('access-user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name || '';
        }
        ////ele内部方法，获取现在已打开的index数组,一定要转数组，原数据遍历有问题
        this.opened_menu = [...this.$refs.mymenu.openedMenus];
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
      border:none;
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
  /* .el-menu-item {color: #ccc;} */
  /* .el-submenu {color:#ccc;} */
  .el-submenu__title {color:#ccc;}
  .el-submenu__title i {color: inherit;}
  .el-submenu .el-menu {background: #324057;}
  .el-submenu .el-menu .el-menu {background: #475669;}

  .el-submenu .el-menu-item:hover, .el-submenu__title:hover,
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .el-menu-item.is-active,
  .menu-collapsed .el-submenu.is-active, /*关闭时*/
  .menu-expanded .el-submenu.is-active:not(.is-opened)>.el-submenu__title /*选中，但是没打开的父级*/
  {background: #00C1DE;color: #1F2D3D;}
  .menu-collapsed .el-submenu.is-active>.el-submenu__title {color: inherit;}
  .el-submenu span {padding-right: 12px;}
  /* .menu-collapsed .el-submenu__icon-arrow {display: none;} */
  .menu-collapsed .first {display: none;} /* 折叠导航时，文字先消失 */
  .el-menu--collapse .el-submenu .el-menu {border: none;} /* 折叠后，有边框 ele2.0+ */
  /*.el-submenu__icon-arrow {right: 40px;}*/
  /*******************************************************iconset********************************************************/
  .el-submenu div.el-submenu__title {display: flex;}
  .el-menu .iconfont{
    font-size: 24px;
    vertical-align: baseline;
    margin-right: 6px;
  }
  /**/
  /*******************************************************iconset end********************************************************/

  .warp-breadcrum{
    padding: 5px 0 15px 0px;
    border-bottom: 1px solid #efefef;
  }
  .warp-main{
    padding-top: 20px;
  }
</style>
