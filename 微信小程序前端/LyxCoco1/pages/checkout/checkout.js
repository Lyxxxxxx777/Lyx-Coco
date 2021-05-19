// pages/checkout/checkout.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        cartInfo:[],  //点击结算后 将购物车信息 同步至全局
        
        cartTotalPrice:0,  //点击结算后 将总价信息 同步至全局
        
        orderInfo:{},  //全局 门店信息

        remarksVal:'',  //备注内容

        isPayPadShow:0,  //支付面板的显示

        myAllCardList:[],  //我的全部礼品卡信息 未处理的
        myCardListId:[],  //经过处理 的数据                     主要的
        myCardList:["您还没有任何卡券"],  //我有的礼品卡信息列表   只剩名字的 用来显示罢了
        myCardIndex:null,
    },

    //从全局拿数据
  syncdata:function(){
    this.setData({
        cartInfo:app.globalData.cartInfo,
        cartTotalPrice:app.globalData.cartTotalPrice,
        orderInfo:app.globalData.orderInfo,
        myAllCardList:app.globalData.myGiftCardList,
    })
  },

  //获取我的礼品卡信息
  getCloudUserGiftCard:function(){
    let that = this;
    let uopenid = app.globalData.userOpenID;

    wx.cloud.callFunction({
      name:"getUserGiftCardInfo",
      data:{
        userOpenId:uopenid
      },
      success(res){
        console.log("cloud请求成功 获取该用户的礼品卡",res);
        let reverseRes = res.result.data.reverse();
        app.globalData.myGiftCardList = reverseRes;
        that.setData({
          myAllCardList:reverseRes,
        });
        that.filterMyGiftCard();
      },
      fail(res){
        console.log("cloud请求失败",res)
      }
    })
  },

  //扣除使用的 卡券的金额  卡券的金额没购物车的多就把卡里的钱扣完 、卡里的钱更多 就是扣购物车的总价
  updateCloudPrice:function(){
    let that = this;

    let dedu = 0;
    if(this.data.myCardListId[this.data.myCardIndex].cardPrice>this.data.cartTotalPrice){
      dedu = this.data.cartTotalPrice;
    }else{
      dedu = this.data.myCardListId[this.data.myCardIndex].cardPrice;
    }
    let amcp = this.data.myCardListId[this.data.myCardIndex].cardPrice- dedu;

    wx.cloud.callFunction({
      name:"updatePrice",
      data:{
        _id:this.data.myCardListId[this.data.myCardIndex]._id,
        cardPrice:amcp
      },
      success(res){
          console.log("礼品卡金额扣除成功",res);
            
      },
      fail(res){
        console.log("cloud请求失败",res);
        wx.showToast({
            title: '网络出错',
            icon:'error',
            duration: 2000
          });
        return;
      }
    })
  },

  //选择礼品卡
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      myCardIndex: e.detail.value
    })
  },

  //支付成功后跳转至 查看订单
  gotoPagebill: function(){
    wx.switchTab({
     url: '/pages/bill/bill', 
     });
 },

  //点击去支付
  gotoPay:function(){
    console.log("点击了去支付")
    this.setData({
      isPayPadShow:1
    })
  },

  closePay:function(){
    console.log("点击了关闭取消支付")
    this.setData({
      isPayPadShow:0
    })
  },

  paySuccess:function(){
    if(this.data.myCardListId.length&&this.data.myCardIndex){
      this.updateCloudPrice();
    }

    console.log("点击了确认支付 并直接支付成功")
    this.setData({
      isPayPadShow:0
    });

    wx.showToast({
      title: '支付中...',
      icon: 'loading',
      duration: 1500
    });

    //数据库中添加订单
    this.myAddOrderAjax();

    // setTimeout(()=>{
    //   wx.showToast({
    //     title: '支付成功',
    //     icon: 'success',
    //     duration: 1500
    //   });

    //   // 支付成功后跳转至 查看订单页面
    //   setTimeout(()=>{
    //     this.gotoPagebill();

    //     //支付成功后清空全局购物车
    //     app.globalData.cartInfo=[];
    //     //支付成功后清空全局 购物车总价格
    //     app.globalData.cartTotalPrice=0;
    //   },1000)

    // },2000)
  },

    xiebeizhu:function(e){
        this.setData({ remarksVal: e.detail.value })
    },

    //处理礼品卡信息 过滤已过期的 没钱的已使用的
    filterMyGiftCard:function(){
      let dt =new Date();
      let ngt = dt.getTime();
      if(this.data.myAllCardList.length){
        let myall = this.data.myAllCardList;
        let newmyall = myall.filter(function(item,index,array){
          return (item.cardPrice>0)&&(item.cardExpirationTime>ngt)
        })
        this.setData({
          myCardListId:newmyall
        });
        
        let namenma = [];
        newmyall.forEach(function(item,index,arrat){
          namenma.push(item.cardName+" ￥"+item.cardPrice)
        })
        console.log(namenma);
        this.setData({
          myCardList:namenma
        })
      }
    },

    myAddOrderAjax(){
    //   let cart = {isOk:1, store: '1', amountMoney:1, howToGet:'1',remarks:'1',cartGoodsList:[{
    //    teaNumber:1,
    //    teaName:"鲜芋青稞大红袍奶茶/中杯",
    //    teaPrice:14,
    //    feedSelected:"常规",
    //    feedPrice:0,
    //    temSelected:"热",
    //    sweetSelected:"常规糖",
    //  },]}
     // let item = JSON.parse(JSON.stringify(this.cart));
     wx.request({
       url: 'http://'+app.globalData.AjaxAdd+':8301/coco/addOrder',
       data: {
         isOk:0,    // 0待制作，1待取单 ，2已完成
         store:this.data.orderInfo.storeName, 
         amountMoney:this.data.cartTotalPrice, 
         howToGet:this.data.orderInfo.nolval,
         remarks:this.data.remarksVal,
         openId:app.globalData.userOpenID,
         cartGoodsList:this.data.cartInfo
      },
       method: 'POST',
       success:(result)=>{
         console.log('成功新增订单 ==> ',result);

         setTimeout(()=>{
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1500
          });
    
          // 支付成功后跳转至 查看订单页面
          setTimeout(()=>{
            this.gotoPagebill();
    
            //支付成功后清空全局购物车
            app.globalData.cartInfo=[];
            //支付成功后清空全局 购物车总价格
            app.globalData.cartTotalPrice=0;
          },1000)
    
        },2000)
         
       },
       fail:(result)=>{
        wx.showToast({
          title: '网络出错',
          icon: 'error',
          duration: 1500
        });
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
      if(app.globalData.userOpenID){
        this.getCloudUserGiftCard();
      }
      
      this.filterMyGiftCard();
      
      this.syncdata();
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