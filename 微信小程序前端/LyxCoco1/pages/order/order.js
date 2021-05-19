// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:null,  //搜索关键字
    searchArr:null,  //搜索后过滤的新数组
    searchTimer:null,  //搜索防抖

    ajaxTeaInfo:{},  //ajax全局奶茶数据

    myTeaData:{},//后台备份
    searchValue:'',//搜索框中内容

    isShowbeef:1,  //显示小蜜蜂 点击不再显示后才没
    isShowCnxh:0,  //猜你喜欢是否 点小蜜蜂
    isShowCnxhDH:0,  //动画
    cnxhtem1:0,  //猜你喜欢气温1  显示
    cnxhxl2:0,  //猜你喜欢销量2  显示
    cnxhgm3:0,  //猜你喜欢购买3  显示
    nowTem:25,  //现在气温
    nowHour:12,  //现在时间12点 19点
    cnxhTemIndex:5,  //猜你喜欢最终温度推荐索引值
    cnxhHourIndex:5,  //猜你喜欢最终时间推荐索引值
    cnxhBillIndex:5,  //猜你喜欢最终订单推荐索引值 5默认珍珠奶茶


    // finallSearchValue:'',//最终匹配用的搜索值
    storeRegExp:'',//正则PetName
    appOrderInfo:{
      nolval:'now',
      storeid:'0',
      storeName:'Lyx&Coco(官方一号店)',
    },
    another:[],//从全局拿的 再来一单的数据

    currentIndex:0,//左侧类别索引值
    currentIndexStyle:0,
    heightArr:[],
    infoIsopening:false,
    currentTeaIndex:0,//当前选中奶茶 索引值

    temporaryTeaInfo:{
      feedSelected:"常规",
      feedPrice:0,
      temSelected:"热",
      sweetSelected:"常规糖",
    },

    cartInfo:[
      // {
      //   teaNumber:1,
      //   teaName:"鲜芋青稞大红袍奶茶/中杯",
      //   teaPrice:14,
      //   feedSelected:"常规",
      //   feedPrice:0,
      //   temSelected:"热",
      //   sweetSelected:"常规糖",
      // },
    ],
    cartTotalPrice:0,//购物车总价
    cartTotalNumber:0,  //总杯数
    isOpenCart:0,//控制打开购物车详情面板0

    orderInfo:{
      nolval:'now',
      storeid:'0',
      storePetname:'官方一号店',
      tea:[
        {
          teaId:0,
          teaName:"鲜芋青稞大红袍奶茶/中杯",
          teaPrice:14,
          feedSelected:"常规",
          feedPrice:0,
          temSelected:"热",
          sweetSelected:"常规糖",
        },
      ],
    },
    teaType:[
      {
        typeId:1,
        typeName:"甄选好茶",
        typeDescribe:"岩骨花香，我有大红袍",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lfZHx.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lfmE6.png"
      },
      {
        typeId:2,
        typeName:"暖饮轻食",
        typeDescribe:"用心手作，一口元气",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lfFgJ.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lfkv9.png"
      },
      {
        typeId:3,
        typeName:"可可牛奶",
        typeDescribe:"浓情可可邂逅香醇牛奶",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lWxH0.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lfSEV.png"
      },
      {
        typeId:4,
        typeName:"醇香奶茶",
        typeDescribe:"这一杯奶茶，什么都可",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lW5HP.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lWb9g.png"
      },
      {
        typeId:5,
        typeName:"咖啡时光",
        typeDescribe:"意式现磨，咖啡唤醒",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lWjun.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lWvBq.png"
      },
      {
        typeId:6,
        typeName:"活力维C",
        typeDescribe:"满杯维C，活力Up Up",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lWLcj.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lWOjs.png"
      },
      {
        typeId:7,
        typeName:"莓果恋人",
        typeDescribe:"双面莓莓，双重美美",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lfPCF.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lfi34.png"
      },
      {
        typeId:8,
        typeName:"乐享生活",
        typeDescribe:"小巧便携，随享咖啡时光",
        typeImage0:"https://s3.ax1x.com/2021/03/08/6lfpNT.png",
        typeImage1:"https://s3.ax1x.com/2021/03/08/6lf94U.png"
      },
    ],
    teaInfo:[
      {
        teaId:0,
        teaName:"鲜芋青稞大红袍奶茶/中杯",
        typeId:0,
        teaImage:"https://s3.ax1x.com/2021/03/08/61AOxO.md.png",
        teaPrice:14,
        teaDescribe:"来自西藏高原的青稞，精心熬煮后口感软糯Q弹，搭配手捣鲜芋和大红袍奶茶，一口馥郁香气。",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"珍珠",feedPrice:1},
            {feedName:"椰果",feedPrice:1},
            {feedName:"红豆",feedPrice:2},
            {feedName:"芋圆",feedPrice:2},
            {feedName:"",feedPrice:0},
          ],
        temArr:["热","温","常规冰","多冰","少冰","去冰",],
        sweetArr:["常规糖","半糖","微糖","不另外加糖"],
       
      },
      {
        teaId:1,
        teaName:"法式奶霜绿茶/中杯",
        typeId:0,
        teaImage:"https://s3.ax1x.com/2021/03/08/61APvF.md.png",
        teaPrice:12,
        teaDescribe:"选用淡雅的茉香绿茶，加入绵密的奶霜，香浓绵滑多层次的口感，融合在味蕾中的幸福感受！",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"珍珠",feedPrice:1},
            {feedName:"椰果",feedPrice:1},
            {feedName:"芋圆",feedPrice:2},
            {feedName:"珍珠鲜芋",feedPrice:4},
            {feedName:"",feedPrice:0},
          ],
        temArr:["热","温","常规冰","多冰","少冰","去冰",],
        sweetArr:["常规糖","半糖","微糖","不另外加糖"],
      },
      {
        teaId:2,
        teaName:"青稞红豆牛奶/大杯",
        typeId:1,
        teaImage:"https://s3.ax1x.com/2021/03/08/61A0Kg.md.png",
        teaPrice:19,
        teaDescribe:"来自西藏高原的青稞，精心熬煮后口感软糯Q弹，搭配香甜红豆和鲜醇牛奶，一口甜蜜满足。",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"珍珠",feedPrice:1},
            {feedName:"青稞",feedPrice:3},
            {feedName:"鲜芋",feedPrice:3},
            {feedName:"布丁",feedPrice:2},
            {feedName:"芋圆",feedPrice:2},
          ],
        temArr:["热","温","常规冰","多冰","少冰","去冰",],
        sweetArr:["常规糖","不另外加糖","",""],
      },
      {
        teaId:3,
        teaName:"莓莓可可牛奶/中杯",
        typeId:2,
        teaImage:"https://s3.ax1x.com/2021/03/08/61AKgO.md.png",
        teaPrice:14,
        teaDescribe:"欧洲进口可可粉与鲜醇牛奶融合成香浓的可可牛奶，搭配酸甜莓果，给你清新的甜蜜滋味。",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"珍珠",feedPrice:1},
            {feedName:"椰果",feedPrice:1},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
          ],
        temArr:["热","常规冰","多冰","少冰","去冰",""],
        sweetArr:["","","",""],
      },
      {
        teaId:4,
        teaName:"珍珠奶茶/中杯",
        typeId:3,
        teaImage:"https://s3.ax1x.com/2021/03/08/61AjMD.md.png",
        teaPrice:10,
        teaDescribe:"醇香奶茶中加入一颗颗香Q弹牙、嚼劲十足的珍珠，人气饮品好喝，不简单。",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"青稞",feedPrice:3},
            {feedName:"鲜芋",feedPrice:3},
            {feedName:"红豆",feedPrice:2},
            {feedName:"布丁",feedPrice:2},
            {feedName:"升级为茶拿铁",feedPrice:3},
          ],
        temArr:["热","温","常规冰","多冰","少冰","去冰",],
        sweetArr:["常规糖","半糖","微糖","不另外加糖"],
      },
      {
        teaId:5,
        teaName:"美式咖啡(L)",
        typeId:4,
        teaImage:"https://s3.ax1x.com/2021/03/08/61AY5t.md.png",
        teaPrice:13,
        teaDescribe:"严选阿拉比咖啡豆，以瑞士进口咖啡机萃取出黄金比例，香气浓郁，品尝黑咖啡纯粹的风味。",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"摇摇冻",feedPrice:1},
            {feedName:"浓缩咖啡",feedPrice:3},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
          ],
        temArr:["热","常规冰","多冰","少冰","去冰",""],
        sweetArr:["","","",""],
      },
      {
        teaId:6,
        teaName:"冰淇淋杨枝甘露/大杯",
        typeId:5,
        teaImage:"https://s3.ax1x.com/2021/03/08/61ApCV.md.png",
        teaPrice:20,
        teaDescribe:"香甜芒果，丝丝清香的微酸白柚粒，融入果香的酸奶、Q弹西米和冰淇淋，轻轻一口，回味无穷。",
        feedArr:[
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
          ],
        temArr:["常规冰","多冰","少冰","去冰","",""],
        sweetArr:["常规糖","","",""],
      },
      {
        teaId:7,
        teaName:"莓莓酸奶/大杯",
        typeId:6,
        teaImage:"https://s3.ax1x.com/2021/03/08/61ANPP.md.png",
        teaPrice:18,
        teaDescribe:"清新的草莓、蔓越莓果粒与细腻稠滑的酸奶相融合，搭配Q弹椰果，给你酸甜可口小“莓”好！",
        feedArr:[
            {feedName:"常规",feedPrice:0},
            {feedName:"珍珠",feedPrice:1},
            {feedName:"椰果",feedPrice:1},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
            {feedName:"",feedPrice:0},
          ],
        temArr:["常规冰","多冰","少冰","去冰","",""],
        sweetArr:["常规糖","不另外加糖","",""],
      },
      {
        teaId:8,
        teaName:"圣托里尼印象滤挂咖啡",
        typeId:7,
        teaImage:"https://s3.ax1x.com/2021/03/08/61A5qJ.md.png",
        teaPrice:8,
        teaDescribe:"荣获国际咖啡品鉴大赛金奖，风味干净明亮，尾韵夹杂着一丝柑橘的清甜。小巧便携，满足随时随地冲泡咖啡的小愿望！",
        feedArr:[
          {feedName:"",feedPrice:0},
          {feedName:"",feedPrice:0},
          {feedName:"",feedPrice:0},
          {feedName:"",feedPrice:0},
          {feedName:"",feedPrice:0},
          {feedName:"",feedPrice:0},
        ],
      temArr:["","","","","",""],
      sweetArr:["","","",""],
      },
    ]
    // storeMsg:null,
  },

  // expInput:function(e){
  //   this.setData({ searchValue: e.detail.value });
  // },

  //获取 温度推荐奶茶
  getTemTea(){
    let temIarr=[];
    if(this.data.nowTem>=30){
      console.log(this.data.nowTem,'℃热！！推荐冰饮')
      this.data.teaInfo.map((v,i)=>{
        if(v.teaName.includes('冰')){
          temIarr.push(i)
        }
      });
    }else if(this.data.nowTem>20&&this.data.nowTem<30){
      console.log(this.data.nowTem,'℃温！！推荐奶茶')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==4){
          temIarr.push(i)
        }
      });
    }else{
      console.log(this.data.nowTem,'℃冷！！推荐暖饮')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==2){
          temIarr.push(i)
        }
      });
    }
    console.log(temIarr);
    let rantem = Math.floor( temIarr.length * Math.random() );
    this.setData({
      cnxhTemIndex:temIarr[rantem]
    })
  },
  //获取 时间点推荐奶茶
  getHourTea:function(){
    let hourIarr=[];
    if(this.data.nowHour>=22&&this.data.nowHour<6){
      console.log(this.data.nowHour,'大半夜！！推荐咖啡')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==5){
          hourIarr.push(i)
        }
      });
    }else if(this.data.nowHour>=6&&this.data.nowHour<11){
      console.log(this.data.nowHour,'早上！！推荐好茶')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==1){
          hourIarr.push(i)
        }
      });
    }else if(this.data.nowHour>=11&&this.data.nowHour<18){
      console.log(this.data.nowHour,'中午！！推荐维C')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==6){
          hourIarr.push(i)
        }
      });
    }else if(this.data.nowHour>=18&&this.data.nowHour<22){
      console.log(this.data.nowHour,'晚上！！推荐可可')
      this.data.teaInfo.map((v,i)=>{
        if(v.typeId==3){
          hourIarr.push(i)
        }
      });
    }
    console.log(hourIarr);
    let ranhour = Math.floor( hourIarr.length * Math.random() );
    this.setData({
      cnxhHourIndex:hourIarr[ranhour]
    })
  },
  //获取 订单推荐奶茶
  getBillTea:function(){  //现在是纯随机
    let ranbill = Math.floor( this.data.teaInfo.length * Math.random() );
    this.setData({
      cnxhBillIndex:ranbill
    })
  },

  openCart:function(){
    console.log("打开购物车");
    let isOpenCartE =this.data.isOpenCart;
    isOpenCartE++;
    this.setData({
      isOpenCart:isOpenCartE
    })
  },

  handleItemTap(e){
    // console.log(e)
    // 获取被点击标题的索引
    const {index} = e.currentTarget.dataset;
    this.setData({
      currentIndex:index,
      currentIndexStyle:index,
    })
  },

   // 搜索
   search:function(e){
    clearTimeout(this.data.searchTimer);
    this.data.searchTimer = setTimeout( ()=>{
      let seaArr = [];
      // 在定时器和延时器里面的this都是指向window
      this.setData({ searchVal: e.detail.value })
      this.data.teaInfo.map((v,i)=>{
        if(v.teaName.includes(e.detail.value)){
          console.log("包含",v.teaName);
          seaArr.push(v);
          this.setData({
            searchArr:seaArr
          })
        }
      });
    }, 200 )
},

  ////////////////////////////////
  //从全局拿数据
  syncdata:function(){
    this.setData({
      storeMsg:app.globalData.storeMsg,
      noworlater:app.globalData.noworlater,
      appOrderInfo:app.globalData.orderInfo,
      cartInfo:app.globalData.cartInfo,
      cartTotalPrice:app.globalData.cartTotalPrice,
      ajaxTeaInfo:app.globalData.ajaxTeaInfo,
      ajaxTypeInfo:app.globalData.ajaxTypeInfo,
    })

    let storeg=/\([^\[\]\n]*\)/;
    // storeg.exec(this.appOrderInfo.storeName)
    let stopet0=storeg.exec(app.globalData.orderInfo.storeName);
    let stopet1=stopet0[0].substr(1);

    this.setData({
      storeRegExp:stopet1.substring(0,stopet1.length-1)
    })

  },
  //回到地址选择页面
  gotoPageaddress: function(){ 
    wx.navigateTo({
     url: '/pages/address/address', 
     }) 
    },
/////////////////////猜你喜欢////////////↓↓↓//////////////
  showCnxh:function(){
    if(this.data.isShowCnxh==0){
      this.setData({
        isShowCnxh:1
      })
      setTimeout(()=>{
        this.setData({
          isShowCnxhDH:1
        })
      },50)
    }else{
      this.setData({
        isShowCnxh:0,
        isShowCnxhDH:0,
        cnxhtem1:0,
        cnxhxl2:0,
        cnxhgm3:0
      })
    }
  },
  showCnxhtem1:function(){
    if(this.data.cnxhtem1==0){
      this.setData({
        cnxhtem1:1,
        cnxhxl2:0,
        cnxhgm3:0
      })
    }else{
      this.setData({
        cnxhtem1:0,
        cnxhxl2:0,
        cnxhgm3:0
      })
    }
  },
  showCnxhxl2:function(){
    if(this.data.cnxhxl2==0){
      this.setData({
        cnxhtem1:0,
        cnxhxl2:1,
        cnxhgm3:0
      })
    }else{
      this.setData({
        cnxhtem1:0,
        cnxhxl2:0,
        cnxhgm3:0
      })
    }
  },
  showCnxhgm3:function(){
    if(this.data.cnxhgm3==0){
      this.setData({
        cnxhtem1:0,
        cnxhxl2:0,
        cnxhgm3:1
      })
    }else{
      this.setData({
        cnxhtem1:0,
        cnxhxl2:0,
        cnxhgm3:0
      })
    }
  },
  neverShowCnxh:function(){
    this.setData({
      isShowbeef:0,
      isShowCnxh:0,
      cnxhtem1:0,
      cnxhxl2:0,
      cnxhgm3:0,
    })
  },
/////////////////////猜你喜欢///////////↑↑↑///////////////





    //点击 去结算 将购物车、总价信息同步至全局 跳转界面 
  gotoCheckOut:function(){
    if(app.globalData.userOpenID==null){
      wx.showToast({
        title: '您还未同步用户OpenID 请前往“我的”进行同步',
        icon:'none',
        duration: 2500
      });
      return;
    }else{ 
      if(this.data.cartTotalPrice!=0){
        app.globalData.cartInfo=this.data.cartInfo;
        app.globalData.cartTotalPrice=this.data.cartTotalPrice;
        // console.log(app.globalData.cartInfo)
        // console.log(app.globalData.cartTotalPrice)
        
        wx.navigateTo({
          url: '/pages/checkout/checkout', 
        }) 
      }

    }
  },

  getHeightArr:function(){
    var that=this;
    //把右边所有item高度累加计算出 放入数组
      let nowHeight=0;
      let query = wx.createSelectorQuery();
      query.selectAll('.righttea').boundingClientRect(rect=>{
        for(let i =0;i<rect.length;i++){
          var indexr = "heightArr["+i+"]";
          that.setData({
            [indexr]:nowHeight
          })
          nowHeight += rect[i].height;
        }
      }).exec();
  },

  getthistea:function(item){
    console.log(item)
  },

  clearTemporaryTeaInfo:function(){
    var feed = "temporaryTeaInfo.feedSelected";
    var feedP = "temporaryTeaInfo.feedPrice"
    var tem = "temporaryTeaInfo.temSelected";
    var sweet = "temporaryTeaInfo.sweetSelected";
    this.setData({
      [feed]:"",
      [feedP]:0,
      [tem]:"",
      [sweet]:"",
    })
  },

  // 设置默认奶茶配料信息
  defaultTemporaryTeaInfo:function(){
    var that = this;
    var feed = "temporaryTeaInfo.feedSelected";
    var feedP = "temporaryTeaInfo.feedPrice"
    var tem = "temporaryTeaInfo.temSelected";
    var sweet = "temporaryTeaInfo.sweetSelected";
    if(that.data.teaInfo[that.data.currentTeaIndex].feedArr[0]){
      this.setData({
        [feed]:that.data.teaInfo[that.data.currentTeaIndex].feedArr[0].feedName,
        [feedP]:that.data.teaInfo[that.data.currentTeaIndex].feedArr[0].feedPrice,
      })
    };
    if(that.data.teaInfo[that.data.currentTeaIndex].temArr[0]){
      this.setData({
        [tem]:that.data.teaInfo[that.data.currentTeaIndex].temArr[0],
      })
    };
    if(that.data.teaInfo[that.data.currentTeaIndex].sweetArr[0]){
      this.setData({
        [sweet]:that.data.teaInfo[that.data.currentTeaIndex].sweetArr[0],
      })
    };
  },
  // 将再来一单信息 添加至购物车
  getAnother:function(){
    if(app.globalData.another){
      this.clearCart();
      this.setData({
        cartInfo:app.globalData.another,
      })
      this.calcTotalPrice();  /////然后计算总价
      
      app.globalData.another=null;
    }
  },

  //计算总价 计算总数
  calcTotalPrice:function(){
    let totalprice = 0;
    let totalnumber = 0;
      for(let i = 0;i < this.data.cartInfo.length;i ++){
        let singleprice = (this.data.cartInfo[i].teaPrice + this.data.cartInfo[i].feedPrice) * this.data.cartInfo[i].teaNumber;
        totalprice += singleprice;
        let singlenumber = this.data.cartInfo[i].teaNumber;
        totalnumber += singlenumber;
      };
      this.setData({
        cartTotalPrice:totalprice,
        cartTotalNumber:totalnumber
      });
      app.globalData.cartTotalPrice=totalprice;  //20210421
  },

  //点击加号后 弹出奶茶详情选择面板////////////////
  openTeaInfo:function(e){
    var that = this;
     // console.log(e)
     // 获取被点击标题的索引
     const {index} = e.currentTarget.dataset;
     this.setData({
      currentTeaIndex:index,
    })
    console.log(this.data.currentTeaIndex)
  
    this.setData({
      infoIsopening:true
    })

    this.defaultTemporaryTeaInfo();
  },
  //关闭奶茶详情选择面板////////////////////////////
  closeTeaInfo:function(){
    this.setData({
      infoIsopening:false
    })
    this.clearTemporaryTeaInfo();
  },

  getFeed:function(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    var feed = "temporaryTeaInfo.feedSelected";
    var feedprice = "temporaryTeaInfo.feedPrice";
    this.setData({
      [feed]:that.data.teaInfo[that.data.currentTeaIndex].feedArr[index].feedName,
      [feedprice]:that.data.teaInfo[that.data.currentTeaIndex].feedArr[index].feedPrice,
    })
  },
  getTem:function(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    var tem = "temporaryTeaInfo.temSelected"
    this.setData({
      [tem]:that.data.teaInfo[that.data.currentTeaIndex].temArr[index],
    })
  },
  getSweet:function(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    var sweet = "temporaryTeaInfo.sweetSelected"
    this.setData({
      [sweet]:that.data.teaInfo[that.data.currentTeaIndex].sweetArr[index],
    })
  },

  // 购物车详情内 清空购物车按钮
  clearCart:function(){
    console.log("点击了 清空");
    this.setData({
      cartInfo:[],
    });
    app.globalData.cartInfo=[];

     /////然后计算总价
     this.calcTotalPrice();
    //  let totalprice = 0;
    //  for(let i = 0;i < this.data.cartInfo.length;i ++){
    //    let singleprice = (this.data.cartInfo[i].teaPrice + this.data.cartInfo[i].feedPrice) * this.data.cartInfo[i].teaNumber;
    //    totalprice += singleprice;
    //  };
    //  this.setData({
    //    cartTotalPrice:totalprice,
    //  });
  },
  // 减号 减一杯奶茶
  reduceTea:function(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    console.log("点击了 减号",index);
    var redu =`cartInfo[${index}].teaNumber`;
    var num = --this.data.cartInfo[index].teaNumber;
    this.setData({
      [redu]:num
    });

    var redut = this.data.cartInfo;
    if(that.data.cartInfo[index].teaNumber<=0){
      redut.splice(index,1);
      console.log(redut);
      console.log("小于0了 删除这杯奶茶")
      that.setData({
        cartInfo:redut
      })
    }else{
      
    };
    /////然后计算总价
    this.calcTotalPrice();
    // let totalprice = 0;
    // for(let i = 0;i < this.data.cartInfo.length;i ++){
    //   let singleprice = (this.data.cartInfo[i].teaPrice + this.data.cartInfo[i].feedPrice) * this.data.cartInfo[i].teaNumber;
    //   totalprice += singleprice;
    // };
    // this.setData({
    //   cartTotalPrice:totalprice,
    // });
  },
  // 加号 加一杯奶茶teaNumber++
  addTea:function(e){
    console.log("点击了 加号");
    var that = this;
    const {index} = e.currentTarget.dataset;
    var addu =`cartInfo[${index}].teaNumber`;
    var num = ++this.data.cartInfo[index].teaNumber;
    this.setData({
      [addu]:num
    });
    /////然后计算总价
    this.calcTotalPrice();
    // let totalprice = 0;
    // for(let i = 0;i < this.data.cartInfo.length;i ++){
    //   let singleprice = (this.data.cartInfo[i].teaPrice + this.data.cartInfo[i].feedPrice) * this.data.cartInfo[i].teaNumber;
    //   totalprice += singleprice;
    // };
    // this.setData({
    //   cartTotalPrice:totalprice,
    // });
  },

  // 加入购物车
  addToCart:function(){
    var that = this;
    var newCartArr={
      teaNumber:1,
      teaName:this.data.teaInfo[this.data.currentTeaIndex].teaName,
      teaPrice:this.data.teaInfo[this.data.currentTeaIndex].teaPrice,
      feedSelected:this.data.temporaryTeaInfo.feedSelected,
      feedPrice:this.data.temporaryTeaInfo.feedPrice,
      temSelected:this.data.temporaryTeaInfo.temSelected,
      sweetSelected:this.data.temporaryTeaInfo.sweetSelected,
    };

    let cart=this.data.cartInfo;
    let index=cart.findIndex(v=>{
      if(this.data.cartInfo.length){
        return (v.teaName === newCartArr.teaName)&&(v.feedSelected === newCartArr.feedSelected)&&(v.temSelected === newCartArr.temSelected)&&(v.sweetSelected === newCartArr.sweetSelected)
      }
    });
    console.log("寻找购物车中已存在奶茶",index);
    if(index > -1){
      let indexm =`cartInfo[${index}].teaNumber`;
      let theNumber = ++this.data.cartInfo[index].teaNumber;
      that.setData({
        [indexm]:theNumber
      })
    }else{
      var indexn="cartInfo["+that.data.cartInfo.length+"]";
        that.setData({
          [indexn]:newCartArr,
        })
    }
    /////然后计算总价
    this.calcTotalPrice();
    // let totalprice = 0;
    // for(let i = 0;i < this.data.cartInfo.length;i ++){
    //   let singleprice = (this.data.cartInfo[i].teaPrice + this.data.cartInfo[i].feedPrice) * this.data.cartInfo[i].teaNumber;
    //   totalprice += singleprice;
    // };
    // this.setData({
    //   cartTotalPrice:totalprice,
    // });

    // 关闭奶茶 选配料面板
    this.setData({
      infoIsopening:false,
    })
    // 清空临时奶茶信息
    this.clearTemporaryTeaInfo();
  },

  //获取现在是几点
  getNowHour:function(){
    let dt = new Date();
    let nh = dt.getHours();
    this.setData({
      nowHour:nh
    })
    this.getHourTea();
  },
  getTemAjax(){
    // wx的ajax 天气接口
    wx.request({
        url: 'https://tianqiapi.com/api?version=v1&appid=36586114&appsecret=C0i87KO0',
        // data:{
        //     city:"杭州"
        //   },
          success:(request)=>{
              console.log(request);
              if(request.data.data[0].tem){
                let ntem = request.data.data[0].tem.substring(0,request.data.data[0].tem.length-1)
                this.setData({
                  nowTem:ntem
                })
              }

              this.getTemTea();
            }
          });
    },


    myTeaAjax(){
    wx.request({
      url: 'http://localhost:8301/coco/menu',
      success:(result)=>{
        console.log(result)
        this.setData({
          
        })
      }
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

  //处理分类数据
  proceTypeInfo(){
    this.setData({
      teaType:this.data.ajaxTypeInfo.data.data
    })
  },

  //阻止滚动穿透 scroll-view 但是总的还是有
  catchTouchMove: function(e) {
    console.log('阻止滚动')
  },
  stopmove:function(){
    return
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.gotoPageaddress();  // 记得打开 进入此页面先 转进选地址页面

    // this.syncdata();
    
    // this.getHeightArr();
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //   var that=this;
    
    // //把右边所有item高度累加计算出 放入数组
    //   let nowHeight=0;
    //   let query = wx.createSelectorQuery();
    //   query.selectAll('.righttea').boundingClientRect(rect=>{
      //     for(let i =0;i<rect.length;i++){
        //       var indexr = "heightArr["+i+"]";
        //       that.setData({
          //         [indexr]:nowHeight
          //       })
          //       nowHeight += rect[i].height+8;
          //     }
          //   }).exec();
        },
        
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
         
          // this.myTeaAjax();  //请求奶茶信息

          this.syncdata();  //拿全局数据
          this.proceTeaInfo();  //处理奶茶数据
          this.proceTypeInfo();  //处理分类数据
          
          this.getAnother();  //添加再来一单的信息

          this.getHeightArr();  //计算高度 一定要拿到数据后渲染完再计算！！

          this.getTemAjax(); //得到当地气温
          this.getNowHour();  //得到现在几点
          this.getBillTea();
        },
        
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  openInfo:function(){
    console.log(this.data.teaType[2].typeId)
  },

  scroll(e) {
    for (let i = 0; i < this.data.heightArr.length; i++) {
    if (e.detail.scrollTop < this.data.heightArr[i] && i !== 0 && e.detail.scrollTop > this.data.heightArr[i - 1]) {
    this.setData({
      currentIndexStyle:i-1,
    })
    }}}
})
