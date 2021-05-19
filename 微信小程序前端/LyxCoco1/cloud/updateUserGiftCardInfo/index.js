// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
   env:"lyxcoco1-8gdy1nrh0dc5d5d7"
})

// 云函数入口函数
exports.main = async (event, context) => {
   return cloud.database().collection("userGiftCardList").doc(event._id).update({
       data:{
           cardGive:false,
           userOpenId:event.userOpenId
       }
   })
   .then(res=>{
       console.log("修改礼品卡拥有者ID成功",res)
       return res
   })
   .catch(res=>{
       console.log("修改礼品卡拥有者ID失败",res)
       return res
   })
}