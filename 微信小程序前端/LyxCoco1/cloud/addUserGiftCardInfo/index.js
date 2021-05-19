// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
   env:"lyxcoco1-8gdy1nrh0dc5d5d7"
})

// 云函数入口函数
exports.main = async (event, context) => {
   return cloud.database().collection("userGiftCardList").add({
       data:{
           cardBuyTime:event.cardBuyTime,
           cardCDKey:"其实就是_id",
           cardExpirationTime:event.cardExpirationTime,
           cardGive:event.cardGive,
           cardId:event.cardId,
           cardImage:event.cardImage,
           cardName:event.cardName,
           cardPrice:event.cardPrice,
           userBlessing:event.userBlessing,
           userBuyOpenId:event.userBuyOpenId,
           userName:event.userName,
           userOpenId:event.userOpenId
       }
   })
   .then(res=>{
       console.log("新增用户礼品卡数据成功",res)
       return res
   })
   .catch(res=>{
       console.log("新增用户礼品卡数据失败",res)
       return res
   })
}