const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        // 弹窗
        show: false
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
// 弹窗
VM.confirmHandle = function() {
    this.setData({
        show: false
    })
}
// 弹窗
VM.cancelHandle = function() {
    this.setData({
        show: false
    })
}
// 返回用户端
VM.backClient = function() {
    this.setData({
        show: true
    })
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
