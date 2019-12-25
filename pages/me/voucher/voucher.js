//获取应用实例
const app = getApp()
import formcheck from '../../../utils/formcheck.js'
import util from '../../../utils/util.js'
import base from '../../../utils/base.js'
var VM = {
    data: {
      // 导航下标
      navIndex:0,
      // 是否已使用
      used:true
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
VM.navToggle = function(e){
    var navIndex =  util.dataset(e,'index')
     if ( navIndex==0) {
        this.setData({
           navIndex:navIndex,
           used:false
        }) 
     } else{
        this.setData({
            navIndex:navIndex,
            used:true
         }) 
     }
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}

VM.onReady = function() {

}

VM.onShow = function() {

}

VM.onHide = function() {

}

VM.onUnload = function() {

}

VM.onPullDownRefresh = function() {
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)