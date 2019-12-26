const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
var VM = {
    data: {
        // 地址
        value01:"",
        // 楼层 公司
        value02:"",
        // "完成"按钮 可否点击
        disabled: true
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
}
// 完成
VM.submitHandle = function() {
    util.showModal('提示', '下一步', true, '取消', '确定')
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

}
Page(VM)
