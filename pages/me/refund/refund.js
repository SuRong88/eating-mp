//获取应用实例
const app = getApp()
import formcheck from '../../../utils/formcheck.js'
import util from '../../../utils/util.js'
import base from '../../../utils/base.js'
var VM = {
    data: {
        // 弹窗
        show: false,
        showIndex:2,
        showTexts: [
            "每月仅可进行一次退款,下个月可\n再次申请提现。",
            "提现金额超过可取最大金额，请\n与客服联系。",
            "确定要提现全部金额吗？"
        ]
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}

VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
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
// 提现
VM.refundHandle = function() {
    this.setData({
        show: true
    })
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
