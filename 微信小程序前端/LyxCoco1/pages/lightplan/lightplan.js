// pages/lightplan/lightplan.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ajaxBill:{},
        todayDate:0,  //今天几年几月 对比本月订单
        beefNumber:0,  //已点亮的精灵

        userGiftCardList:[],
        isHaveThisYYMM:-1,  // -1表示本月还没兑换过  其他数字表示换过了
    },

     //时间戳转年月日 函数
     timestampToTime:function (date) {
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM ;
      // return YY + MM + DD +" "+hh + mm + ss;
  },



    getTodayDate:function(){
        let dt = new Date();
        let todayY=dt.getFullYear();
        let todayM=dt.getMonth()+1;
        let todayD=dt.getDate();
        if(todayM<10){
          todayM='0'+todayM
        };
        if(todayD<10){
          todayD='0'+todayD
        };
        let today= todayY+'-'+todayM;
        this.setData({
          todayDate:today
        })
        console.log('今天是几年几月==>',this.data.todayDate);
    
      },

      //点击立即解锁后
      lijijiesuo:function(){
        if((this.data.beefNumber>=5)&&(this.data.isHaveThisYYMM==-1)){
          this.addCloudUserGiftCard();
        }
      },

    //免费送提莫精灵卡
  addCloudUserGiftCard:function(){
    let dt = new Date();
    let nowTime = dt.getTime();
    let ExpirationTime = nowTime + 86400000*30;
    let cid = 2105;
    let cimg = "https://z3.ax1x.com/2021/04/22/cLz60A.png";
    let cname = "小蜜蜂！";
    let cprice = 10;
    let uopenid = app.globalData.userOpenID;

    wx.cloud.callFunction({
      name:"addUserGiftCardInfo",
      data:{
        cardBuyTime:nowTime,
        cardExpirationTime:ExpirationTime,
        cardGive:false,
        cardId:cid,
        cardImage:cimg,
        cardName:cname,
        cardPrice:cprice,
        userBlessing:"小蜜蜂们给你送来了礼物",
        userBuyOpenId:'LyxCocoBeef',
        userName:"小蜜蜂",
        userOpenId:uopenid
      },
      success(res){
        console.log("cloud请求添加数据成功",res)
        wx.showToast({
          title: '兑换成功',
          icon:'success',
          duration: 2500
        });
        wx.redirectTo({
          url: '/pages/mygiftcard/mygiftcard', 
          }) 
      },
      fail(res){
        console.log("cloud请求失败",res)
      }
    })
  },


      //查询我的所有礼品卡
      getCloudUserGiftCard:function(){
        let that = this;
        let uopenid = app.globalData.userOpenID;
    
        wx.cloud.callFunction({
          name:"getUserGiftCardInfo",
          data:{
            userOpenId:uopenid
          },
          success:(res)=>{
            console.log('这个cardBuyTime-->',this.timestampToTime(1619101870425));
            console.log('今天是几年几月-->',this.data.todayDate);
            console.log('那么这两个相等吗',this.timestampToTime(1619101870425)==this.data.todayDate);
            let ishave = -1;
            let buytimearr = [];
            res.result.data.map((v)=>{
              let thebt = this.timestampToTime(v.cardBuyTime);
              buytimearr.push(thebt)
            });
            console.log('瞅瞅时间数组-->',buytimearr)

            res.result.data.map((v)=>{
              if(v.userBuyOpenId=='LyxCocoBeef'){

                buytimearr.map((v)=>{
                  if(v==this.data.todayDate){
                    ishave++;
                    console.log('确实找到了，本月已存在卡')
                  }
                })
                
              }
            });

            console.log("cloud请求成功",res);
            let reverseRes = res.result.data.reverse();
            that.setData({
                userGiftCardList:reverseRes,
                isHaveThisYYMM:ishave,
            })
          },
          fail(res){
            console.log("cloud请求失败",res)
          }
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

           let beefnum = 0;
           let len = result.data.length - 1;
           console.log(result.data[len].pickUpTime)
            if(result.data[len].pickUpTime){
                    result.data.map((v,i)=>{
                        let puti = v.pickUpTime+"time"
                        let puti2 = puti.substring(0,7);
                            console.log(puti2)
                        if(puti2==this.data.todayDate){
                            beefnum++;
                            }
                        })
                    this.setData({
                        beefNumber:beefnum
                    })
                }

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
        this.getTodayDate();  //获取当天日期

        this.getCloudUserGiftCard();

        if(app.globalData.userOpenID){
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