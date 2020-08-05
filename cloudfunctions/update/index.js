// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  
  try {

    if(typeof event.data === 'string'){
      event.data = eval('('+event.data+')');
    }

    if(event.doc){
      return await db.collection(event.collection)
      .where({...event.where})
      .update({
        data: {
          // progress: _.inc(10)
          ...event.data
        },
      })
    } else {
      return await db.collection(event.collection)
      .where({...event.where})
      .update({
        data: {
          // progress: _.inc(10)
          ...event.data
        },
      })
    }
  } catch(e) {
    console.error(e)
  }
}