const app = getApp();
const baseURL = app.config.baseURL;
module.exports=(url,data={},method='GET',header={})=>{
  // 显示loading加载效果
  wx.showLoading({
    title:'加载中'
  })
  return new Promise(function(resolve,reject){
    wx.request({
      url:baseURL+url,
      data,
      method,
      header,
      dataType:'json',
      success:resolve,
      fail:reject,
      complete:()=>{
        wx.hideLoading();
      }
    })
  })
}