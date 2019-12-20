const app = getApp()
Page({
  data: {
      
  },
  onLoad: function () {
  },

  // 弹窗确定事件
  confirmHandle: function(){
      console.log('确定')
  },

  // 弹窗取消事件
  cancelHandle: function () {
      console.log('取消')
  }
})
