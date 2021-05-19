// pages/mine/mine.js
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

    isShowUserName:false,
    userInfo:null,

    userOpenID:0,
    userOpenIDSlice:0,

    todayDate:0,
    myBirthday:0,//生日
    isBirthday:0,
    lingguole:0,  //领过了

    isPhoneShow:0,  //显示手机号授权
    PhoneVal:null,

    isCDKeyShow:0,  //打开 兑换CDKey的面板
    CDKVal:0,  //输入框内所填的 CDKey值
    currentGiftInfo:0,  //  !!礼物信息!!!!!!!!!!!!!!!!!!!
    SuccessfulExchange:0,  //判断多重条件 兑换成功
    isOpenGift:0,  //打开礼物盒 出现 图片 礼物信息
    isShowGiftInfo:0,  //显示礼物信息
    newIndexStyle:-1,  //新获得的卡 高亮闪烁
    giftInfoTime:0,  //礼物信息界面中 时间戳的转换
  },

  onLoad() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  // 用户授权
  getUserProfile() {
    wx.getUserProfile({
      desc:'用于完善用户资料',
      success:(res)=>{
        console.log("获取用户信息成功",res)
        let user =res.userInfo
        wx.setStorageSync('user', user)
        this.setData({
          isShowUserName:true,
          userInfo:user,
        })
      },
      fail:res=>{
        console.log("用户信息")
      }
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
      },
      fail(res){
        console.log("cloud请求失败",res)
      }
    })
  },
  //获取openid
  getopenid:function(){
    let that=this;
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        app.globalData.userOpenID=res.result.openid;
        console.log("获取openid成功:",app.globalData.userOpenID);
        // let oi=res.result.openid

        that.myLoginAjax();

        let theslice1=res.result.openid.slice(0,11);
        let theslice2=theslice1.toUpperCase();
       
        that.setData({
          userOpenID:res.result.openid,
          userOpenIDSlice:theslice2
        })

        // that.getCloudUserGiftCard();
      },
      fail(res){
        console.log("获取openid失败",res)
      },
    })
  },

  //前往集点卡
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

  // 礼品卡CDK//////////////////////////////////////////////////////////////////////////////////
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
          app.globalData.haveNewGiftCard=1;//给全局一个信息 有新获得卡 去我的礼品卡查看时 有个新卡高亮 罢了
          wx.showToast({
            title: '兑换成功！可以前往“首页”-“礼品卡”-“我的礼品卡”进行查看',
            icon:'none',
            duration: 2000
          });
          // that.getCloudUserGiftCard();//更新完成后 重新查询更新数据///这里不需要了 mygiftcard是要的
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

  
  // 礼品卡CDK//////////////↑////////////////////////////////////////////////////////////////////

    //手机验证
  openPhone(){
    if(app.globalData.userOpenID){
      this.setData({
        isPhoneShow:1
      })
    }else{
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });}
  },
  closePhone(){
    this.setData({
      isPhoneShow:0
    })
  },
  getPhoneVal:function(e){
    this.setData({ PhoneVal: e.detail.value })
  },
  getPhone(){
    let  reg = /^1[3-9](\d{9})$/
    if (reg.test(this.data.PhoneVal)) {
      app.globalData.personalInfo.phone=this.data.PhoneVal;
      this.myUpdateUserInfoAjax();
      this.closePhone();
    } else {
      wx.showToast({
        title: '请输入有效号码',
        icon:'error',
        duration: 2500
      });
    }

  },


  getPhoneNumber () {
    wx.request({
      url: 'https://open.ucpaas.com/ol/sms/sendsms',
      data:{
          sid:"32344705ff7704196b8abeb78fcd3b50",
          token:"7e7750f6cfe5c1a6d2f2e704e2e0d60c",
          appid:"814676fd876045aca8c4d498e90ff999",
          templateid:"593045",
          mobile:"18925458130",
      },
      method:"POST",
      success:(result)=>{
        console.log(result)
        
      }
    })
  },

  
  
  //设置地址
  myAddress:function(){
    if(app.globalData.userOpenID){

      wx.chooseAddress({
        success:(res)=>{
          console.log('地址',res)//收货人姓名
          app.globalData.personalInfo.address=res.provinceName+res.cityName+res.countyName+res.detailInfo;
          this.myUpdateUserInfoAjax();
        }
      })
    }else{
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
    }

  },

  //设置生日
  bindDateChange: function(e) {
    if(app.globalData.userOpenID){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        myBirthday: e.detail.value,
      })
      app.globalData.personalInfo.birth=e.detail.value;
      this.myUpdateUserInfoAjax();
    }else{
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
    }

  },

  //检测是否今天是生日 是就出现礼物
  testBirthday:function(){
    if(app.globalData.userOpenID){

      if(this.data.todayDate&&this.data.myBirthday){
        if(this.data.todayDate.slice(4)==this.data.myBirthday.slice(4)){
          console.log('生日快乐')
          this.setData({
            isBirthday:1
          })
        }
      }
    }else{
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
    }
  },
  //收到礼物并点击收下
  thanks:function(){
    if(!this.data.lingguole){
      this.addCloudUserGiftCard();
    }
    this.setData({
      isBirthday:0,
      lingguole:1
    })
    wx.showToast({
      title: '太棒了!',
      icon: 'success',
      duration: 1500
    })
  },

  //免费送生日快乐卡
  addCloudUserGiftCard:function(){
    let dt = new Date();
    let nowTime = dt.getTime();
    let ExpirationTime = nowTime + 86400000;
    let cid = 999;
    let cimg = "https://z3.ax1x.com/2021/04/08/cYvs8H.png";
    let cname = "生日快乐！";
    let cprice = 18;
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
        userBlessing:"Lyx&Coco祝你生日快乐",
        userBuyOpenId:uopenid,
        userName:"Lyx&Coco",
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
  
  //联系客服
  callPhone() {
    wx.makePhoneCall({
     phoneNumber: '0574-18925458130' //仅为示例，并非真实的电话号码
    }).catch((e)=>{
      console.log("取消呼叫客服")
    })
    },

    //打开已经获取过的权限列表
  setting: function () {
    let that=this;
    wx.openSetting({
      success: function (osrs) {
        // 出发条件是返回的时候
        wx.getUserInfo({
          success: function (getuserinfo) {
            that.data.hasuserinfo = true;
            that.setData(that.data);
          },
          fail: function (fres) {
            that.data.hasuserinfo = false;
            that.setData(that.data);
          }
        })
      }
    })
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
    let today= todayY+'-'+todayM+'-'+todayD;
    this.setData({
      todayDate:today
    })
    console.log(this.data.todayDate);

  },

  myLoginAjax(){
    console.log(app.globalData.userOpenID)
     wx.request({
       url: 'http://'+app.globalData.AjaxAdd+':8301/coco/login',
       data: {
        openId:app.globalData.userOpenID,
       },
       success:(result)=>{
         console.log('登录==>',result)
         app.globalData.personalInfo=result.data.data;
       }
     })
   },

  myUpdateUserInfoAjax(){
   wx.request({
     url: 'http://'+app.globalData.AjaxAdd+':8301/userinfo/updateUserinfo',
     data: {
      id:app.globalData.personalInfo.id,
      openId:app.globalData.personalInfo.openId,
      phone:app.globalData.personalInfo.phone,
      address:app.globalData.personalInfo.address,
      collectStore:app.globalData.personalInfo.collectStore,
      birth:app.globalData.personalInfo.birth
     },
     method: 'POST',
     success:(result)=>{
       console.log('用户信息更新 ==>',result)
       wx.showToast({
        title: '保存成功',
        icon:'success',
        duration: 1500
      });
     }
   })
 },

  onShow(options){
    // this.myUpdateUserInfoAjax();  //更新用户信息



    //获取当天日期
    this.getTodayDate();
    //用户授权
    this.getUserProfile();
    var user=wx.getStorageSync('user');
    if(user&&user.nickName){
      this.setData({
        isShowUserName:true,
        userInfo:user,
      })
    }



  }
})