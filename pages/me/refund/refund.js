const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // 弹窗
        show: false,
        showIndex: 0,
        showTexts: [
            "余额为零，无法提现",
            "提现金额超过可取最大金额，请\n与客服联系。",
            "确定要提现全部金额吗？"
        ],
        amount: 0
    }
}
VM.init = function(query) {
    this.setData({
        amount: query.amount || 10
    })
    // 设置自定义头部
    util.setHeader(this);
}

VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}
// 弹窗
VM.confirmHandle = function() {
    var showIndex = this.data.showIndex
    switch (showIndex) {
        // 0没钱 1超额
        case 0:
        case 1:
            this.setData({
                show: false
            })
            break;
            // 提现
        case 2:
            this.setData({
                show: false
            })
            Req.request('refund', null, {
                method: 'post'
            }, (res) => {
                // 判断提现金额是否超过后台设置最大金额
                if (!true) {
                    wx.navigateTo({
                        url: '/pages/complete/complete?type=withdraw'
                    })
                } else {
                    this.setData({
                        show: true,
                        showIndex: 1
                    })
                }
            }, () => {
                wx.showModal('提示', '系统出错', false, '', '知道了')
            })
    }
}
// 弹窗
VM.cancelHandle = function() {
    this.setData({
        show: false
    })
}
// 提现
VM.refundHandle = function() {
    if (this.data.amount == 0) {
        this.setData({
            show: true,
            showIndex: 0
        })
    } else {
        this.setData({
            show: true,
            showIndex: 2
        })
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
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)
