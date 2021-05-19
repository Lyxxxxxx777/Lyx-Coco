// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"lyxcoco1-8gdy1nrh0dc5d5d7"
 })
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}