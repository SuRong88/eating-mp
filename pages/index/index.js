const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        showWelcome: false,
        noPlan: false
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
}
VM.closeWelcome = function() {
    this.setData({
        showWelcome: false
    })
}
VM.onLoad = function(query) {
    this.init()
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

}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {
    return {
        title: "按时吃饭",
        path: '/pages/index/index',
        imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    };
}
Page(VM)
