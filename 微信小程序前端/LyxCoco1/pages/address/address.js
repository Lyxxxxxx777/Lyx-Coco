// pages/address/address.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    

    data: {
      userInfo:null,
      searchVal:null,  //搜索关键字
      searchArr:null,  //搜索后过滤的新数组
      searchTimer:null,  //搜索防抖

      isShowFJMD:0,
      shoucang:null,  //收藏门店
      shoucangArr:[],

      markersImg:"/image/dogdog.png",
      nowTimeHM:'00:00',
      nowTimeHMN:'0000',

      nearorcoll:[{
        id:0,
        value:"附近门店",
        isActive:true
      },
      {
        id:1,
        value:"收藏的门店",
        isActive:false
      }
    ],

      //地图上的标记点markers
      markers:[],

      //应为后台JSON文件 因为没做添加门店功能 所以直接本地写一个门店信息JSON
      // storeMsg:[]
      
      // noworlater: [
      //   {name: 'now', value: '支付成功后在店内取单',checked: 'true'},
      //   {name: 'later', value: '预约稍晚时间到店取单'},
      // ],
        nolval:'now',
        time: '12:01',

        // 即将要传入全局的值
        addOrderInfo:{
          nolval:'now',
          storeid:'0',
          storeName:'Lyx&Coco(官方一号店)',
          storePosition:"广东省东莞市小坑村文昌路1路（东莞理工学院城市学院9号楼G13号商铺）",
        },
    },

    // 搜索
    search:function(e){
      clearTimeout(this.data.searchTimer);
      this.data.searchTimer = setTimeout( ()=>{
        let seaArr = [];
        // 在定时器和延时器里面的this都是指向window
        this.setData({ searchVal: e.detail.value })
        this.data.storeMsg.map((v,i)=>{
          if(v.storeName.includes(e.detail.value)){
            console.log("包含",v.storeName);
            seaArr.push(v);
            this.setData({
              searchArr:seaArr
            })
          }
        });
      }, 200 )
  },
    //切换 附近门店 or 收藏的门店
    showFJMD(){
      this.setData({
        isShowFJMD:0
      })
    },
    showSCDMD(){
      this.setData({
        isShowFJMD:1
      })
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
        return hh + mm ;
        // return YY + MM + DD +" "+hh + mm + ss;
    },

    //时间戳转年月日 函数
    timestampToTimeN:function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) * 100;
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return hh + mm ;
        // return YY + MM + DD +" "+hh + mm + ss;
    },

    
    bindTimeChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      let indextime="addOrderInfo.nolval"
      this.setData({
        time: e.detail.value,
        nolval:e.detail.value,
        [indextime]:e.detail.value
      })
    },
    syncdata:function(){
      this.setData({
        storeMsg:app.globalData.storeMsg,
        noworlater:app.globalData.noworlater
      })
    },

    //拨打电话 询问门店店员
    callPhone() {
      wx.makePhoneCall({
       phoneNumber: '18925458130' //仅为示例，并非真实的电话号码
      }).catch((e)=>{
        console.log("取消呼叫店长")
      })
      },

      myUpdateUserInfoAjaxAdd(){
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
             title: '修改成功',
            //  title: '收藏成功',
             icon:'success',
             duration: 1500
           });
          }
        })
      },

      myUpdateUserInfoAjaxRed(){
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
             title: '修改成功',
            //  title: '取消收藏',
             icon:'success',
             duration: 1500
           });
          }
        })
      },

      collectit(e){
        if(app.globalData.userOpenID){
          
          console.log("点击收藏按钮",e.currentTarget.dataset)
          const {index} = e.currentTarget.dataset;
          if(!app.globalData.personalInfo.collectStore){
            app.globalData.personalInfo.collectStore=this.data.storeMsg[index].storeid;
            this.setData({
              shoucang:app.globalData.personalInfo.collectStore
            })
            this.myUpdateUserInfoAjaxAdd();
          }else{
            let qwe = app.globalData.personalInfo.collectStore;
            console.log('还没操作时的-->',qwe)
          
              let jishuqi = 0;
            for(var i = 0 ; i < qwe.length ; i ++){
              if(qwe[i]==this.data.storeMsg[index].storeid){
                jishuqi++;
                console.log('计数器-->',jishuqi)
              }
            }
            if(jishuqi){
              //如果已有则取消收藏
                // qwe.replace(this.data.storeMsg[index].storeid,"")
                app.globalData.personalInfo.collectStore=qwe.replace(",","").replace(this.data.storeMsg[index].storeid,"");
                console.log('取消收藏 此时全局的值为-->',app.globalData.personalInfo.collectStore)
                this.setData({
                  shoucang:app.globalData.personalInfo.collectStore
                })
                this.myUpdateUserInfoAjaxRed();
            }else{
              //如果没找到就加入收藏
                // qwe+this.data.storeMsg[index].storeid;
                app.globalData.personalInfo.collectStore=qwe+','+this.data.storeMsg[index].storeid;
                console.log('加入收藏 此时全局的值为-->',app.globalData.personalInfo.collectStore)
                this.setData({
                  shoucang:app.globalData.personalInfo.collectStore
                })
                this.myUpdateUserInfoAjaxAdd();
            }
             
          }

          let theArr = [];
          if(this.data.shoucang.length>1){
            theArr = this.data.shoucang.split(',')
            this.setData({
              shoucangArr:theArr
            })
          }else{
            theArr.push(this.data.shoucang);
            this.setData({
              shoucangArr:theArr
            })
          }

        }else{
          wx.showToast({
            title: '您还未同步用户OpenID 请前往“我的”进行同步',
            icon:'none',
            duration: 2500
          });}

      },

      showDistance(e){
        console.log("点击距离按钮",e.currentTarget.dataset)
        const {index} = e.currentTarget.dataset;
        wx.showToast({
          title: '距离您'+this.data.storeMsg[index].stotome+'米',
          icon: 'download',
          duration: 1500
        })
      },
    //完成门店选择 点击 选择饮品 并将值传入全局
    gotoPageorder: function(){
      app.globalData.orderInfo=this.data.addOrderInfo;
      console.log("全局的值" ,app.globalData.orderInfo)


      wx.switchTab({
       url: '/pages/order/order', 
       });

   },
    getDistance:function( lat1,  lat2,  lon1,  lon2 ) {
      //计算两地距离 单位米
      var R = 6371; // 地球半径
      var latDistance = Math.tan(lat2 - lat1);
      var lonDistance = Math.tan(lon2 - lon1);
      var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.tan(lat1)) * Math.cos(Math.tan(lat2)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c * 1000; // 单位转换成米
      distance = Math.pow(distance, 2);
      var finallDistance = Math.floor( Math.sqrt(distance) * (Math.PI/180));
      console.log(finallDistance);
     
      return finallDistance;
  },

  //点击选中门店 并展示详情
  clickSlectStore:function(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    // console.log(index);
    //将门店ID存入全局变量 orderInfo 后面还有把立即取单预约时间取单存入全局变量
    let myInfo={
      nolval:'now',
      storeid:'0',
      storeName:'',
    };
    myInfo.nolval='now';
    myInfo.storeid=app.globalData.storeMsg[index].storeid;
    myInfo.storeName=app.globalData.storeMsg[index].storeName;
    myInfo.storePosition=app.globalData.storeMsg[index].storePosition;
    this.setData({
      addOrderInfo:myInfo
    })
    // app.globalData.orderInfo.storeid=app.globalData.storeMsg[index].storeid;
    // app.globalData.orderInfo.storePetname=app.globalData.storeMsg[index].storeName;
    // console.log("全局app.js中点单信息：所选门店为",app.globalData.orderInfo.storeid,app.globalData.orderInfo.storePetname);

//收起详情面板
    var indexid = "storeMsg["+index+"].isopening";
    if(!this.data.storeMsg[index].isopening){
      for(let i = 0 ; i < that.data.storeMsg.length ; i ++){
        var indexi = "storeMsg["+i+"].isopening";
        that.setData({
          [indexi]:false
        })
      }
      that.setData({
        [indexid]:true
      })
    }
  },

  //切换查看门店 附近门店或收藏门店 switchTab不能传参 所以改变选项后保存数据到全局变量
  radioChange:function(e){
    app.globalData.orderInfo.nolval = e.detail.value;
    console.log(app.globalData.orderInfo.nolval); 
  },
  
    //获取当前所在地理位置 经纬
    getLocation:function(){
        wx.getLocation({
          success: (result) => {
            console.log(result);
            wx.openLocation({
              latitude: result.latitude,
              longitude: result.longitude,
              scale:18
            })
        },
        fail:()=>{
            console.log("fail");
        },
        complete:()=>{}
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 中间显示你的头像 否则显示默认的
      // let user = wx.getStorageSync('user')
      // this.setData({
      //   isShowUserName:true,
      //   userInfo:user,
      //   markersImg:user.avatarUrl
      // })

      this.setData({
        storeMsg: app.globalData.storeMsg,
        noworlater: app.globalData.noworlater,

     });
      // wx的ajax 天气接口
      // wx.request({
      //   url: 'https://tianqiapi.com/api?version=v1&appid=36586114&appsecret=C0i87KO0',
      //   data:{
      //     city:"杭州"
      //   },
      //   success:(request)=>{
      //     console.log(request);
      //   }
      // });


      var that = this;
      wx.getLocation({
        type: "gcj02",
        success:function(res){
          console.log(res);
          that.setData({
            markers:[
              {
                // latitude:res.latitude,
                // longitude:res.longitude,
                latitude:22.979536,
                longitude:113.842478,
                iconPath:that.data.markersImg,
                width:30,
                height:30,
                circles:15,
                callout:{
                  content:"当前位置",
                  color:"#000",
                  fontSize:16,
                  borderRadius:5,
                  bgColor:"#fff",
                  padding:10,
                  display:"BYCLICK"
                }
              }
            ]
          })

          for(let i = 0 ; i <that.data.storeMsg.length;i++){
            let mylatitude = that.data.storeMsg[i].latitude;
            let mylongitude = that.data.storeMsg[i].longitude;
            let mystoreName = that.data.storeMsg[i].storeName;
            let index = "markers["+(i+1)+"]";
            that.setData({
              [index]:{
                latitude:mylatitude,
                longitude:mylongitude,
                iconPath:"/image/lyxcoco.png",
                width:25,
                height:30,
                callout:{
                  content:mystoreName,
                  color:"#000",
                  fontSize:16,
                  borderRadius:5,
                  bgColor:"#fff",
                  padding:10,
                  display:"BYCLICK"
                }
              },
            })
            
          }
          
          for(let i = 0 ; i <that.data.storeMsg.length;i++){
            let mydistance = that.getDistance(that.data.markers[0].latitude,that.data.storeMsg[i].latitude,that.data.markers[0].longitude,that.data.storeMsg[i].longitude);
            let index = "storeMsg["+i+"].stotome";
            that.setData({
              [index]:mydistance
            })
            
          }
        }
      })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      
    },
    onShow: function () {
      this.syncdata();

      //////////////////////收藏门店
      this.setData({
        shoucang:app.globalData.personalInfo.collectStore
      })
      
      if(this.data.shoucang){

        let theArr = [];
        if(this.data.shoucang.length>1){
          theArr = this.data.shoucang.split(',')
          this.setData({
            shoucangArr:theArr
          })
        }else{
          theArr.push(this.data.shoucang);
          this.setData({
            shoucangArr:theArr
          })
        }
      }
        ////////////////////收藏门店


      let dt = new Date();
      let dtt = dt.getTime();
      let ttt = this.timestampToTime(dtt);
      let tttN = this.timestampToTimeN(dtt);
      this.setData({
        nowTimeHM:ttt,
        nowTimeHMN:tttN
      })
    },


})