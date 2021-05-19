// pages/mygiftcard/mygiftcard.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userGiftCardList:[
            {_id:"cbddf0af6071085e0107937237fc9fcc",cardBuyTime:1618020444679,cardCDKey:"其实就是_id",cardExpirationTime:1649556444679,cardGive:true,cardId:4,cardImage:"https://z3.ax1x.com/2021/04/08/cYvgKI.png",cardName:"喝好的",cardPrice:21,userBlessing:"一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",userName:"Lyx",userOpenId:"o0Fk84zDwl55ZjC_7TmXN_WJsodU"},
            {_id:"28ee4e3e607109e30ec35e745a64d661",cardBuyTime:1618020834470,cardCDKey:"其实就是_id",cardExpirationTime:1933380834470,cardGive:false,cardId:9,cardImage:"https://z3.ax1x.com/2021/04/08/cYvoGQ.md.png",cardName:"小猫小狗",cardPrice:101,userBlessing:"喝点好的",userName:"鲁姚显",userOpenId:"o0Fk84zDwl55ZjC_7TmXN_WJsodU"}
        ],//用户个人的 我的礼品卡
        currentTime:999999999999999, //现在的时间戳
        
        isShowBigCard:-1,  //点击一个卡片 展示巨大卡片 -1隐藏 012345678910出现对应那张
        isShowDetail:0,  //点击查看详情 展示0隐藏 1出现
        
        goumaishijian:0,  //购买时间
        youxiaoqizhi:0,  //有效期至
        
        isCDKeyShow:0,  //打开 兑换CDKey的面板
        CDKVal:0,  //输入框内所填的 CDKey值
        currentGiftInfo:0,  //  !!礼物信息!!!!!!!!!!!!!!!!!!!
        SuccessfulExchange:0,  //判断多重条件 兑换成功
        isOpenGift:0,  //打开礼物盒 出现 图片 礼物信息
        isShowGiftInfo:0,  //显示礼物信息
        newIndexStyle:-1,  //新获得的卡 高亮闪烁
        giftInfoTime:0,  //礼物信息界面中 时间戳的转换


    },

    //填写CKD 点击了兑换按钮
    clcikExchange:function(){
        if(app.globalData.userOpenID==null){
            wx.showToast({
              title: '您还未同步用户OpenID 请前往“我的”进行同步',
              icon:'none',
              duration: 2500
            });
            return;
          }

        this.getCloudAvailableUserGiftCard();
/////////////////////很多判断  然后成功 ↓

        // this.setData({
        //     isCDKeyShow:0,  //关闭CDK兑换面板
        //     SuccessfulExchange:1,  //兑换成功 则出现收到礼品卡面板
        // })
    },

    //点击打开礼物
    openGift:function(){
        this.setData({
            isOpenGift:1, //打开礼物盒
        })

        setTimeout(()=>{
            this.setData({
                isShowGiftInfo:1,  //延迟后 出现礼物信息
            })
        },1600)
    },

    //点击开心收下
    clickShouxia:function(){
        this.updateCloudUserGiftCard();
    },

    //时间戳转年月日 函数
    timestampToTime:function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD ;
        // return YY + MM + DD +" "+hh + mm + ss;
    },
 
    // 转换时间
    exchangeTime:function(){
        let gmsj = this.timestampToTime(this.data.userGiftCardList[this.data.isShowBigCard].cardBuyTime);
        let yxqz = this.timestampToTime(this.data.userGiftCardList[this.data.isShowBigCard].cardExpirationTime);
        this.setData({
            goumaishijian:gmsj,
            youxiaoqizhi:yxqz
        })
    },

    //点击去使用 前往点单页面
    gotoPageorder: function(){
        wx.switchTab({
         url: '/pages/order/order', 
         });
     },

     copyCDKey:function(){
        wx.setClipboardData({
            data: this.data.userGiftCardList[this.data.isShowBigCard]._id,
            success: function () {
                // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
              wx.showToast({
                title: 'CDKey复制成功,快去发送给你的好友吧',
                icon:'none',
                duration: 2500
              })
            //   wx.getClipboardData({
            //     success: function (res) {
            //     }
            //   })
            }
          })
     },

     //查询 输入的CDK是否可用
     getCloudAvailableUserGiftCard:function(){
        let that = this;
    
        wx.cloud.callFunction({
          name:"getAvailableUserGiftCard",
          data:{
            _id:this.data.CDKVal,
          },
          success(res){
              if(res.result.data.length!=0){
                  console.log("cloud查询成功 确实可用",res);
                  that.setData({
                    currentGiftInfo:res.result.data, //存储礼物信息 至临时
                    isCDKeyShow:0,  //关闭CDK兑换面板
                    SuccessfulExchange:1,  //兑换成功 则出现收到礼品卡面板
                  })
                  let cyxqz = that.timestampToTime(that.data.currentGiftInfo[0].cardExpirationTime);
                  that.setData({
                    giftInfoTime:cyxqz
                  })
              }else{
                  console.log("cloud查询成功 但是没有可用的 或 输入错误CDK",res);
                  wx.showToast({
                    title: 'CDKey不可用',
                    icon:'error',
                    duration: 2000
                  });
                  return;
              }
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

     //收下礼物 修改userOpenId为自己的 是否可赠送改为不可赠送
     updateCloudUserGiftCard:function(){
        let that = this;
    
        wx.cloud.callFunction({
          name:"updateUserGiftCardInfo",
          data:{
            _id:this.data.currentGiftInfo[0]._id,
            userOpenId:app.globalData.userOpenID
          },
          success(res){
              console.log("更新成功成功",res);
                that.setData({
                    isOpenGift:0,  //关闭礼物盒
                    SuccessfulExchange:0,  //关闭礼品卡图片
                    isShowGiftInfo:0,  //关闭礼物信息
                });
                that.getCloudUserGiftCard();//更新完成后 重新查询更新数据
                //设置新加入的卡的 高亮闪烁
                // let uGCL = that.data.userGiftCardList;
                // let indexu=uGCL.findIndex(v=>{
                //     if(that.data.currentGiftInfo.length&&that.data.userGiftCardList.length){
                //       return (v._id === that.data.currentGiftInfo[0]._id)
                //     }
                //   });
                that.setData({
                    newIndexStyle:0
                })
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

      getCDKVal:function(e){
        this.setData({ CDKVal: e.detail.value })
    },

    openCDK:function(){
        this.setData({
            isCDKeyShow:1
        })
    },

    closeCDK:function(){
        this.setData({
            isCDKeyShow:0
        })
    },

    showBigCard:function(e){
        const {index} = e.currentTarget.dataset;
        this.setData({
            isShowBigCard:index
        })

        this.exchangeTime()
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

    getCloudUserGiftCard:function(){
        let that = this;
        let uopenid = app.globalData.userOpenID;
    
        wx.cloud.callFunction({
          name:"getUserGiftCardInfo",
          data:{
            userOpenId:uopenid
          },
          success(res){
            console.log("cloud请求成功",res);
            let reverseRes = res.result.data.reverse();
            that.setData({
                userGiftCardList:reverseRes
            })
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
        this.getCloudUserGiftCard();
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
      // 每次进入 判断有没有卡 过期了
      let dt =new Date();
      let ngt = dt.getTime();
      this.setData({
        currentTime:ngt
      });

      ////////新进入 有新卡 就有高亮
      if(app.globalData.haveNewGiftCard==1){
        this.setData({
          newIndexStyle:0
      })
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