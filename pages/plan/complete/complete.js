//complete.js
const app = getApp()
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
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
                pageTitle: '提现中',
                tipTitle: '提现成功',
                tipDesc: '款项将退还到您微信钱包的零钱,退款审核中'
            }
        ]
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    switch (type) {
        // 0定制成功 1申请打包配送成功 2提现成功
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
VM.completeHandle = function() {
    //用户类型 1-新加入的推广用户 2-新加入的推荐用户 3-其他用户
    let userType = app.globalData.userType
    // 推广用户直接回到首页
    if (userType == 1) {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    } else {
        wx.redirectTo({
            url: '/pages/charge/charge',
        })
    }
}
VM.onLoad = function(query) {
    this.init(query.type)
    base.onLoad(this)
}
Page(VM)
