const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        // 检查是否已授权中
        checkNow: true
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this)
    // 有网络方可校验是否授权
    util.showLoading()
    app.checkAuthorize(() => {
        util.hideLoading()
        wx.redirectTo({
            url: '/pages/index/index'
        })
    }, () => {
        util.hideLoading()
        this.setData({
            checkNow: false
        })
    })
}

VM.onLoad = function(query) {
    this.init()
    base.onLoad(this)
}
// 用户授权
VM.getUserInfo = function(e) {
    if (e.detail.userInfo) { //用户按了允许授权按钮
        app.userLogin(() => {
            wx.redirectTo({
                url: '/pages/index/index'
            })
        })
    } else { //用户取消授权
        util.showModal('提示', '请先授权使用该小程序', false, '', '确定');
    }
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

}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)
