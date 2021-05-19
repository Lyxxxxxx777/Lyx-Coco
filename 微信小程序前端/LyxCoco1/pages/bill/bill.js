// pages/bill/bill.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:null,  //搜索关键字
    searchArr:null,  //搜索后过滤的新数组
    searchTimer:null,  //搜索防抖

    isUserOpenID:null,
    isBillOpen:0,
    ajaxTeaInfo:{},  //ajax全局奶茶数据
    teaInfo:{},
    ajaxBill:[],  //ajax获取的未处理的数据
    teaImgIndexArr:[],
    historyBill:[
      {
        billId:202103270001,
        isOk:'2',//是否支付 是否制作 是否取餐
        payTime:'2021-03-27 12:17:07',
        store:'Lyx&Coco(荔香园店)',
        pay:'微信支付',
        amountMoney:17,
        howToGet:'到店自取',
        pickUpTime:'2021-03-27 12:23:07',
        remarks:'你好',
        billNum:'C104',
        teaImage:"https://s3.ax1x.com/2021/03/08/61AOxO.md.png",
        // cartGoodsList:[
        teaOrder:[
          {
            teaNumber:1,
            teaName:"鲜芋青稞大红袍奶茶",
            teaPrice:14,
            feedSelected:"常规",
            feedPrice:0,
            temSelected:"热",
            sweetSelected:"常规糖",
          },
          {
            teaNumber:1,
            teaName:"法式奶霜绿茶",
            teaPrice:12,
            feedSelected:"芋圆",
            feedPrice:2,
            temSelected:"热",
            sweetSelected:"常规糖",
          }
        ],
        
      },
      {
        billId:202103270002,
        isOk:'2',//是否支付 是否制作 是否取餐
        payTime:'2021-03-27 12:17:07',
        store:'Lyx&Coco(荔香园店)',
        pay:'微信支付',
        amountMoney:17,
        howToGet:'到店自取',
        pickUpTime:'2021-03-27 12:23:07',
        remarks:'你好',
        billNum:'C104',
        teaImage:"https://s3.ax1x.com/2021/03/08/61APvF.md.png",
        teaOrder:[
          {
            teaNumber:1,
            teaName:"鲜芋青稞大红袍奶茶",
            teaPrice:14,
            feedSelected:"常规",
            feedPrice:0,
            temSelected:"热",
            sweetSelected:"常规糖",
          },
          {
            teaNumber:1,
            teaName:"法式奶霜绿茶",
            teaPrice:12,
            feedSelected:"芋圆",
            feedPrice:2,
            temSelected:"热",
            sweetSelected:"常规糖",
          }
        ],
        
      },
      {
        billId:202103270003,
        isOk:'2',//是否支付 是否制作 是否取餐
        payTime:'2021-03-27 12:17:07',
        store:'Lyx&Coco(荔香园店)',
        pay:'微信支付',
        amountMoney:17,
        howToGet:'到店自取',
        pickUpTime:'2021-03-27 12:23:07',
        remarks:'你好',
        billNum:'C104',
        teaImage:"https://s3.ax1x.com/2021/03/08/61A0Kg.md.png",
        teaOrder:[
          {
            teaNumber:1,
            teaName:"鲜芋青稞大红袍奶茶",
            teaPrice:14,
            feedSelected:"常规",
            feedPrice:0,
            temSelected:"热",
            sweetSelected:"常规糖",
          },
          {
            teaNumber:1,
            teaName:"法式奶霜绿茶",
            teaPrice:12,
            feedSelected:"芋圆",
            feedPrice:2,
            temSelected:"热",
            sweetSelected:"常规糖",
          }
        ],
        
      },
      {
        billId:202103270004,
        isOk:'1',//是否支付 是否制作 是否取餐
        payTime:'2021-03-27 12:17:07',
        store:'Lyx&Coco(荔香园店)',
        pay:'微信支付',
        amountMoney:17,
        howToGet:'到店自取',
        pickUpTime:'2021-03-27 12:23:07',
        remarks:'你你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好好',
        billNum:'C117',
        teaImage:"https://s3.ax1x.com/2021/03/08/61A0Kg.md.png",
        teaOrder:[
          {
            teaNumber:1,
            teaName:"鲜芋青稞大红袍奶茶",
            teaPrice:14,
            feedSelected:"椰果",
            feedPrice:1,
            temSelected:"热",
            sweetSelected:"常规糖",
          },
          {
            teaNumber:1,
            teaName:"法式奶霜绿茶",
            teaPrice:12,
            feedSelected:"芋圆",
            feedPrice:2,
            temSelected:"热",
            sweetSelected:"常规糖",
          }
        ],
        
      },
      {
        billId:202103270005,
        isOk:'0',//是否支付 是否制作 是否取餐
        payTime:'2021-03-27 12:17:07',
        store:'Lyx&Coco(荔香园店)',
        pay:'微信支付',
        amountMoney:28,
        howToGet:'到店自取',
        pickUpTime:'2021-03-27 12:23:07',
        remarks:'你好',
        billNum:'C104',
        teaImage:"https://s3.ax1x.com/2021/03/08/61A0Kg.md.png",
        teaOrder:[
          {
            teaNumber:1,
            teaName:"鲜芋青稞大红袍奶茶",
            teaPrice:14,
            feedSelected:"常规",
            feedPrice:0,
            temSelected:"热",
            sweetSelected:"常规糖",
          },
          {
            teaNumber:1,
            teaName:"法式奶霜绿茶",
            teaPrice:12,
            feedSelected:"芋圆",
            feedPrice:2,
            temSelected:"热",
            sweetSelected:"常规糖",
          }
        ],
        
      },
    ]
  },
  gotoPageorder: function(){
    wx.switchTab({
     url: '/pages/order/order', 
     }) 
 },
 gotoPagemine: function(){
    wx.switchTab({
     url: '/pages/mine/mine', 
     }) 
 },

 // 搜索
 search:function(e){
  clearTimeout(this.data.searchTimer);
  this.data.searchTimer = setTimeout( ()=>{
    let seaArr = [];
    // 在定时器和延时器里面的this都是指向window
    this.setData({ searchVal: e.detail.value })
    this.data.historyBill.map((v,i)=>{
      if(v.billId.includes(e.detail.value)||v.store.includes(e.detail.value)){
        console.log("包含",v.billId);
        seaArr.push(v);
        this.setData({
          searchArr:seaArr
        })
      }
    });
  }, 200 )
},

//从全局拿数据
syncdata:function(){
  this.setData({
    ajaxTeaInfo:app.globalData.ajaxTeaInfo,
  })
},

proceTeaInfo(){
  let newti = this.data.ajaxTeaInfo.data.map((v,i)=>{
    return {
      teaId:v.id,
      teaName:v.teaName,
      typeId:v.typeId,
      teaImage:v.teaImage,
      teaPrice:v.teaPrice,
      teaDescribe:v.teaDescribe,
      feedArr:v.feedinfos,
      temArr:v.temName,
      sweetArr:v.sweetName,
    }
  });
  this.setData({
    teaInfo:newti
  })
  // console.log("处理后的奶茶数据==>",newti)
},

 getBillId:function(e){
  const {index} = e.currentTarget.dataset;
  let newindex = index;

  if(index==this.data.isBillOpen){
    newindex=-1
  }
  this.setData({
    isBillOpen:newindex
  })
 },

 another:function(e){
  const {index} = e.currentTarget.dataset;
  console.log(index);

  let myAnother=this.data.historyBill[index].teaOrder;
  app.globalData.another=myAnother;
  console.log("点击再来一单",app.globalData.another);

  this.gotoPageorder();
 },

 proceBill(){
  let newbill = this.data.ajaxBill.data.map((v,i)=>{
    return {
      billId:v.orderId,
      isOk:v.isOk,        // 0待制作，1待取单 ，2已完成
      payTime:v.payTime,
      store:v.store,
      pay:'微信支付',
      amountMoney:v.amountMoney,
      howToGet:v.howToGet,
      pickUpTime:v.pickUpTime,
      remarks:v.remarks,
      billNum:v.pickNum,
      teaImage:'https://s3.ax1x.com/2021/03/08/61A0Kg.md.png',
      teaOrder:v.orderdetails,
    }
  });
  this.setData({
    historyBill:newbill
  })
  // console.log("处理后的奶茶数据==>",newti)

  //然后处理图片
  let imgIndexArr = [];
  if(this.data.teaInfo.length){
    newbill.map((value,index)=>{

        let indeximg = this.data.teaInfo.findIndex(v=>{
          return (v.teaName === value.teaOrder[0].teaName)
        });
        imgIndexArr.push(indeximg);
        
    })
  }
  console.log('图片所在teainfo中的位置',imgIndexArr);
  this.setData({
    teaImgIndexArr:imgIndexArr
  })
  },


 myOrdersAjax(){
   //在当前页面显示导航条加载动画
   wx.showNavigationBarLoading(); 
   //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
   wx.showLoading({
     title: '刷新中...',
   })
   
  wx.request({
    url: 'http://'+app.globalData.AjaxAdd+':8301/coco/orders',
    data: {
      openId:app.globalData.userOpenID,
    },
    success:(result)=>{
      console.log("订单信息已获取 ==> ",result)
      this.setData({
        ajaxBill:result
      });
      this.proceBill();
      //隐藏loading 提示框
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();

    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.syncdata();  //拿全局数据
    if(this.data.ajaxTeaInfo!={}){
      this.proceTeaInfo();  //处理奶茶数据
    }

    this.setData({
      isUserOpenID:app.globalData.userOpenID
    });

    if(this.data.isUserOpenID){
      this.myOrdersAjax();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.myOrdersAjax();
    // wx.showToast({
    //   title: '刷新成功',
    //   icon:'success',
    //   duration: 100
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})