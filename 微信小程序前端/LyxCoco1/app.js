// app.js
App({
  onLaunch() {
    //云开发环境初始化
    wx.cloud.init({
      env:"lyxcoco1-8gdy1nrh0dc5d5d7"
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userOpenID:null,
    personalInfo:{},  //地址 生日 收藏门店 ID openId 电话
    storeMsg:[
      {
        storeid:0,
        latitude:22.975651,
        longitude:113.840370,
        storeName:"Lyx&Coco(官方一号店)",
        storePetname:"官方一号店",
        storePosition:"广东省东莞市小坑村文昌路1路（东莞理工学院城市学院9号楼G13号商铺）",
        storeBusinessHoursSta:"10:15",
        storeBusinessHoursStaN:1015,
        storeBusinessHoursEnd:"21:55",
        stotome:"",
        isopening:true
      },
      {
        storeid:1,
        latitude:22.977014,
        longitude:113.842478,
        storeName:"Lyx&Coco(图书馆店)",
        storePetname:"图书馆店",
        storePosition:"广东省东莞市东莞理工学院城市学院图书馆1层",
        storeBusinessHoursSta:"10:15",
        storeBusinessHoursStaN:1015,
        storeBusinessHoursEnd:"21:45",
        stotome:"",
        isopening:false
      },
      {
        storeid:2,
        latitude:22.980733,
        longitude:113.841850,
        storeName:"Lyx&Coco(幼儿园店)",
        storePetname:"幼儿园店",
        storePosition:"广东省东莞市香缘路",
        storeBusinessHoursSta:"10:30",
        storeBusinessHoursStaN:1030,
        storeBusinessHoursEnd:"22:00",
        stotome:"",
        isopening:false
      },
      {
        storeid:3,
        latitude:22.977982,
        longitude:113.839071,
        storeName:"Lyx&Coco(荔香园店)",
        storePetname:"荔香园店",
        storePosition:"广东省东莞市寮步镇井巷村城市学院内",
        storeBusinessHoursSta:"11:00",
        storeBusinessHoursStaN:1100,
        storeBusinessHoursEnd:"22:15",
        stotome:"",
        isopening:false
      },
    ],
    noworlater: [
      {name: 'now', value: '支付成功后在店内取单',checked: 'true'},
      {name: 'later', value: '预约稍晚时间到店取单'},
    ],
    orderInfo:{
      nolval:'now',
      storeid:'0',
      storeName:'Lyx&Coco(官方一号店)',
    },

    
    ajaxTeaInfo:{},  //奶茶信息
    ajaxTypeInfo:{},  //分类信息

    //点击结算后 将购物车信息 同步至全局
    cartInfo:[],
    //点击结算后 将总价信息 同步至全局
    cartTotalPrice:0,
    //再来一单
    another:null,
      // {
      //   teaNumber:1,
      //   teaName:"鲜芋青稞大红袍奶茶/中杯",
      //   teaPrice:14,
      //   feedSelected:"常规",
      //   feedPrice:0,
      //   temSelected:"热",
      //   sweetSelected:"常规糖",
      // },
      // {
      //   teaNumber:1,
      //   teaName:"法式奶霜绿茶/中杯",
      //   teaPrice:12,
      //   feedSelected:"芋圆",
      //   feedPrice:2,
      //   temSelected:"热",
      //   sweetSelected:"常规糖",
      // }

    allGiftCardList:[],  //全部礼品卡信息
    myGiftCardList:["您还没有任何卡券"],  //我有的礼品卡信息
    haveNewGiftCard:0,  //0为没有获得新卡 1为 有获得新的卡

    // AjaxAdd:'localhost'  //请求地址
    // AjaxAdd:'127.0.0.1'  //请求地址 bd
    // AjaxAdd:'192.168.94.61'  //请求地址  w
    AjaxAdd:'192.168.137.1'  //请求地址  w
  }
})
