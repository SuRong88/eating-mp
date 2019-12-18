//introduce.js
//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
var VM = {
    data: {
        // headBarHeight: 0,
        // padHeight: 0,
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
}

VM.onLoad = function(query) {
    this.init()
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
