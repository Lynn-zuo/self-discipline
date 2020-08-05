// miniprogram/pages/index/index.js
const db = wx.cloud.database();
const fetch = require('../../utils/fetch');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliders:[],
    circular:true,
    autoplay:true,
    interval:'1900',
    duration:'600',
    listData:[],
    current:'links',
    tabs:[
      {
        id:0,
        name:"推荐",
        isActive:true
      },
      {
        id:1,
        name:"最新",
        isActive:false
      }
    ]
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSliders();
  },
  // 获取轮播图
  getSliders(){
    const url='index.php?c=slider&a=lists';
    fetch(url).then((res)=>{
      // console.log(res.data.data.list)
      this.setData({
        sliders:res.data.data.list
      });
    })
  },

  // 自定义事件 用来接收子组件传递的数据
  handleItemChange(e){
    // console.log(e.detail)
    let {index} = JSON.parse(JSON.stringify(e.detail));
    // console.log(index)
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs,
      current:index === 0 ? 'links':'time'
    }, ()=>{
      this.getListData();
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  handleLinks(ev){
    // console.log(ev)
    let id = ev.target.dataset.id;
    wx.cloud.callFunction({
      name:'update',
      data:{
        collection:'users',
        doc:id,
        data:"{links:_.inc(1)}"
      }
    }).then((res)=>{
      // console.log(res);
      let updated = res.result.stats.updated;
      if(updated){
        let cloneListData = [...this.data.listData];
        for(let i=0; i<cloneListData.length; i++){
          if(cloneListData[i]._id == id){
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData:cloneListData
        });
      }
    })
    // db.collection('users').doc(id).update({
    //   data:{
    //     links:5
    //   }
    // }).then((res)=>{
    //   console.log(res)
    // });
  },
  getListData(){
    db.collection('users').field({
      userPhoto:true,
      nickName:true,
      links:true
    }).orderBy(this.data.current, 'desc')
    .get().then((res)=>{
      // console.log(this.data.current)
      // console.log(res)
      this.setData({
        listData:res.data
      })
    })
  },
  // 点击图片进入详情页
  handleDetail(ev){
    // console.log(ev)
    let id = ev.target.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?userId='+id
    })
  }
})