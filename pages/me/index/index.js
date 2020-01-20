const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // 头像
        headimg:'',
        // 余额
        amount:0,
        // 代金券
        voucher_num:0,
        nickname:''
    }
}

VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    Req.request('getUserInfo', {
    }, {
        method: 'get'
    }, (res) => {
        let data = res.data
        this.setData({
            headimg:data.headimg,
            amount:data.amount,
            voucher_num:data.voucher_num,
            nickname:data.nickname||''
        })
    }, () => {
        wx.showModal('提示', '系统出错', false, '', '知道了')
    })
}

VM.onLoad = function(query) {
    console.log('onload');
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
        title: "正经一餐",
        path: '/pages/index/index',
        imageUrl: ''
    }
}
Page(VM)
