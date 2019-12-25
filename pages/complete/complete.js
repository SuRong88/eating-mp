//complete.js
//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
import base from '../../utils/base.js'
var VM = {
    data: {
        currentIndex: 0,
        tipList: [{
                pageTitle: '定制完成',
                tipTitle: '定制完成',
                tipDesc: '在送餐日，坐享卫生健康合口味的午餐吧'
            },
            {
                pageTitle: '提交成功',
                tipTitle: '提交成功',
                tipDesc: ''
            },
            {
                pageTitle: '提现成功',
                tipTitle: '提现成功',
                tipDesc: '款项将退还到您微信钱包的零钱，申请后24小时内到账。'
            }
        ]
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    switch (type) {
        case 'custom':
            this.setData({
                currentIndex: 0
            })
            break;
        case 'submit':
            this.setData({
                currentIndex: 1
            })
            break;
        case 'withdraw':
            this.setData({
                currentIndex: 2
            })
            break;
        default:
            break;
    }
}
// 点击完成
VM.completeHandle = function() {}
VM.onLoad = function(query) {
    this.init(query.type)
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
