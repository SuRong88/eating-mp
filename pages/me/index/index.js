const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        userId:'',
        // 头像
        headimg: '',
        // 余额
        amount: 0,
        // 代金券
        voucher_num: 0,
        nickname: '',
        // 用户类型 1-用户 2-配送员 3-打包员 4-全部
        role: 1
    }
}

VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    Req.request('getUserInfo', {}, {
        method: 'get'
    }, (res) => {
        let data = res.data
        this.setData({
            userId:data.id,
            headimg: data.headimg,
            amount: data.amount,
            voucher_num: data.voucher_num,
            nickname: data.nickname || '',
            role: data.role
        })
    }, () => {
        wx.showModal('提示', '系统出错', false, '', '知道了')
    })
}

VM.onLoad = function(query) {
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
    let userId = this.data.userId || '';
    console.log(userId);
    return {
        title: "正经一餐",
        path: '/pages/introduce/introduce?shareId=' + userId,
        imageUrl: ''
    };
}
Page(VM)
