const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        // 余额充足
        isEnough:true
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
// 确认取消
VM.confirmCancel = function() {
    
}
// 预充饭卡
VM.chargeCard = function() {
    
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

}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)
