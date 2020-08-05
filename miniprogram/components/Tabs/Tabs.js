// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要接收的数据的名称
    tabs:{
      // type 要接收的数据类型
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   * 1. 页面js文件中存放事件回调函数是存放在data同层级下
   * 2. 组件js文件中存放事件回调函数必须存放在methods中
   * 
   */
  methods: {
    handleItemTap(e){
      // 1. 绑定点击事件
      // 2. 获取被点击的索引
      // 3. 获取原数组
      // 4. 对数组循环--给每一个循环项选中属性改为false，给当前索引项添加激活选中效果
      
      const {index} = e.currentTarget.dataset;
      // 5. 触发父组件中的自定义事件，同时传递数据给负组件--this.triggerEvent("父组件自定义事件名称"，要传递的参数)
      this.triggerEvent("itemChange",{index})
      // let {tabs} = this.data;
      // 深拷贝
      // let tabs = JSON.parse(JSON.stringify(this.data.tabs));
      // tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      // this.setData({
      //   tabs
      // })
    }
  }
})
