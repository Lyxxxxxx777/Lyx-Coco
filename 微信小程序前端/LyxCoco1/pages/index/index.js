var app = getApp();
Page({
   data:{
       swiperList:[""]
   },
   gotoPageorder: function(){ 
       wx.switchTab({
        url: '/pages/order/order', 
        }) 
    },
    czyhTips:function(){
      wx.showToast({
        title: '暂无优惠活动',
        icon:'error',
        duration: 2000
      });
    },
   gotoPagelightplan: function(){ 
    if(app.globalData.userOpenID==null){
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
      return;
    }

    wx.navigateTo({
     url: '/pages/lightplan/lightplan', 
     }) 
    },
    
    // 去礼品卡页面
    gotoPagegiftcard: function(){ 
    wx.navigateTo({
     url: '/pages/giftcard/giftcard', 
     }) 
    },
   gotoPagesealim: function(){ 
       wx.navigateTo({
        url: '/pages/sealim/sealim', 
        }) 
    },
    gotoPagenewpro: function(){ 
        wx.navigateTo({
         url: '/pages/newpro/newpro', 
         }) 
     },
     onShareAppMessage: function( options ){
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
          title: "转发的标题",    // 默认是小程序的名称(可以写slogan等)
          path: '/pages/share/share',    // 默认是当前页面，必须是以‘/'开头的完整路径
          imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
          success: function(res){
            // 转发成功之后的回调
            if(res.errMsg == 'shareAppMessage:ok'){
            }
          },
          fail: function(){
            // 转发失败之后的回调
            if(res.errMsg == 'shareAppMessage:fail cancel'){
              // 用户取消转发
            }else if(res.errMsg == 'shareAppMessage:fail'){
              // 转发失败，其中 detail message 为详细失败信息
            }
          },
        };
        // 来自页面内的按钮的转发
        if( options.from == 'button' ){
          var eData = options.target.dataset;
          console.log( eData.name );   // shareBtn
          // 此处可以修改 shareObj 中的内容
          shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
        }
        // 返回shareObj
        return shareObj;
      },

      //请求奶茶信息
      myTeaAjax(){
        //在当前页面显示导航条加载动画
        wx.showNavigationBarLoading(); 
        //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
        
        wx.showLoading({
          title: '加载中...',
        })

        wx.request({
          // url: 'http://localhost:8301/coco/menu',
          url: 'http://'+app.globalData.AjaxAdd+':8301/coco/menu',
          success:(result)=>{
            app.globalData.ajaxTeaInfo=result;
            console.log("奶茶信息已存入全局 ==> ",app.globalData.ajaxTeaInfo);
            // wx.showToast({
            //   title: '加载成功',
            //   icon:'success',
            //   duration: 100
            // });
            //隐藏loading 提示框
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
          }
        })
      },
      //请求分类信息
      myTypeAjax(){
        
        wx.request({
          // url: 'http://localhost:8301/coco/loadAllTeatypeForSelect',
          url: 'http://'+app.globalData.AjaxAdd+':8301/coco/loadAllTeatypeForSelect',
          success:(result)=>{
            app.globalData.ajaxTypeInfo=result;
            console.log("分类信息已存入全局 ==> ",app.globalData.ajaxTypeInfo);
            // wx.showToast({
            //   title: '加载成功',
            //   icon:'success',
            //   duration: 100
            // });
          }
        })
      },

       /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        this.myTeaAjax();
        this.myTypeAjax();
      },
      
      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
      },
      
      onPullDownRefresh: function () {
        this.myTeaAjax();
        this.myTypeAjax();
      },
      
      


})
