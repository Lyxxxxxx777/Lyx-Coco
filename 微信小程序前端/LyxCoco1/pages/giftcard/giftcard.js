// pages/giftcard/giftcard.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allGiftCardList:[],

        isShowBigCard:-1,//点击一个卡片 展示巨大卡片 -1隐藏 012345678910出现对应那张
        isShowDetail:0//点击查看详情 展示0隐藏 1出现
    },

    // 去我的我的我的我的礼品卡页面
    gotoPagemygiftcard: function(){ 

        if(app.globalData.userOpenID==null){
            wx.showToast({
              title: '您还未同步用户OpenID 请前往“我的”进行同步',
              icon:'none',
              duration: 2500
            });
            return;
          }

        wx.navigateTo({
         url: '/pages/mygiftcard/mygiftcard', 
         }) 
        },

    getCloudAllGiftCardList:function(){
        let that =this;
        if(!app.globalData.allGiftCardList.length){//若全局 没数据 则请求数据并保存到全局
            wx.cloud.callFunction({
                name:"getAllGiftCardList",
                success(res){
                    console.log(res)
                    app.globalData.allGiftCardList=res.result.data;//保存至全局
                    console.log("全局礼品卡信息:",app.globalData.allGiftCardList);
                    that.setData({
                        allGiftCardList:app.globalData.allGiftCardList
                    })
                },
                fail(res){
                    console.log("cloud失败",res)
                }
            })
        }
    },

    getAppAllGiftCardList:function(){
        this.setData({
            allGiftCardList:app.globalData.allGiftCardList
        })
    },

    showBigCard:function(e){
        const {index} = e.currentTarget.dataset;
        this.setData({
            isShowBigCard:index
        })
    },

    closeBigCard:function(){
        this.setData({
            isShowBigCard:-1,
            isShowDetail:0
        })
    },

    seeCard:function(){
        console.log("点击了查看详情")
        let nowisShowDetail=this.data.isShowDetail;
        nowisShowDetail++;
        this.setData({
            isShowDetail:nowisShowDetail
        })
    },

    buyCard:function(){
        console.log("点击了购买");
        wx.navigateTo({
            url: `/pages/buygiftcard/buygiftcard?whichCardIndex=${this.data.isShowBigCard}`, 
        }) 
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCloudAllGiftCardList();
        this.getAppAllGiftCardList();
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
        this.setData({
            isShowBigCard:-1,//点击一个卡片 展示巨大卡片 -1隐藏 012345678910出现对应那张
            isShowDetail:0//点击查看详情 展示0隐藏 1出现
        })
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