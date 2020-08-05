// components/callPhone.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    phoneNumber:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCallPhone(){
      // console.log(this.data)
      wx.makePhoneCall({
        phoneNumber:this.data.phoneNumber
      })
    }
  }
})
