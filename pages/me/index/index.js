const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
var VM = {
    data: {
        userInfo: null
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    this.setData({
        userInfo: app.globalData.userInfo
    })
}

VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this);
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
    return {
        title: "按时吃饭",
        path: '/pages/index/index',
        imageUrl: ''
    }
}
Page(VM)
