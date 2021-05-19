// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"lyxcoco1-8gdy1nrh0dc5d5d7"
 })
// 云函数入口函数
const DB = cloud.database();
exports.main = async (event, context) => {
    try{
        return await DB.collection('userGiftCardList').where({
            _id:event._id,
            cardGive:true
        }).get()
    }catch(err){
        console.log('err ==>',err)
    }
}