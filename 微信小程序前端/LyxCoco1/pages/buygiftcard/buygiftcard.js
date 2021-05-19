// pages/buygiftcard/buygiftcard.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allGiftCardList:[],
        whichCardIndex:-1,

        isPayPadShow:0,//微信支付面板
        nicknameVal:0,//你的署名
        blessingVal:0,//祝福语
    },

    getAppAllGiftCardList:function(){
        this.setData({
            allGiftCardList:app.globalData.allGiftCardList
        })
    },

  //支付成功后跳转至 查看订单
  gotoPagemygiftcard: function(){
    wx.redirectTo({ //与以往不同 关闭此页面 并前往 这样的话从"我的礼品卡"返回时不再经过此页buy
        url: '/pages/mygiftcard/mygiftcard', 
        }) 
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
    console.log("点击了确认支付 并直接支付成功")

    if(app.globalData.userOpenID==null){
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
      return;
    }else{
      this.addCloudUserGiftCard();//云数据库添加数据
    }

    this.setData({
      isPayPadShow:0
    });

    wx.showToast({
      title: '支付中...',
      icon: 'loading',
      duration: 1500
    });

    setTimeout(()=>{
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500
      });

      // 支付成功后跳转至 我的礼品卡页面
      setTimeout(()=>{
        this.gotoPagemygiftcard();

      },1000)

    },2000)
  },

  xieshuming:function(e){
    this.setData({ nicknameVal: e.detail.value })
},
  xiezhufu:function(e){
      this.setData({ blessingVal: e.detail.value })
  },

  addCloudUserGiftCard:function(){
    let dt = new Date();
    let nowTime = dt.getTime();
    let ExpirationTime = nowTime + this.data.allGiftCardList[this.data.whichCardIndex].cardLongterm;
    let cid = this.data.allGiftCardList[this.data.whichCardIndex].cardId;
    let cimg = this.data.allGiftCardList[this.data.whichCardIndex].cardImage;
    let cname = this.data.allGiftCardList[this.data.whichCardIndex].cardName;
    let cprice = this.data.allGiftCardList[this.data.whichCardIndex].cardPrice;
    let uopenid = app.globalData.userOpenID;

    wx.cloud.callFunction({
      name:"addUserGiftCardInfo",
      data:{
        cardBuyTime:nowTime,
        cardExpirationTime:ExpirationTime,
        cardGive:true,
        cardId:cid,
        cardImage:cimg,
        cardName:cname,
        cardPrice:cprice,
        userBlessing:this.data.blessingVal,
        userBuyOpenId:uopenid,
        userName:this.data.nicknameVal,
        userOpenId:uopenid
      },
      success(res){
        console.log("cloud请求添加数据成功",res)
      },
      fail(res){
        console.log("cloud请求失败",res)
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAppAllGiftCardList();
        this.setData({
            whichCardIndex:options.whichCardIndex
        })
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