//获取应用实例
const app = getApp()
import formcheck from '../../../utils/formcheck.js'
import util from '../../../utils/util.js'
var VM = {
    data: {
      
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}

VM.onLoad = function(query) {
    this.init(query)
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