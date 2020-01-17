const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        checkedIndex: -1,
        priceList: [{
            id: '', //充值金额id
            amount: 200, //充值金额
            prefer: 0 //每餐优惠
        }],
        last_time: '',
        count: 0,
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
    Req.request('accountCharge', null, {
        method: 'get'
    }, (res) => {
        let last_time = null
        let data = res.data;
        data.last_time = '2020-01-02 13.20.10'
        // 年月日转换 
        if (data.last_time) {
            let year = data.last_time.slice(0, 4)
            let month = data.last_time.slice(5, 7)
            let day = data.last_time.slice(8, 10)
            last_time = `${year}年${month}月${day}日`
        }
        this.setData({
            priceList: data.list,
            last_time: last_time,
            count: data.count
        })
    }, () => {
        wx.showModal('提示', '系统出错', false, '', '知道了')
    })
}
// 价格选择
VM.checkedHandle = function(e) {
    this.setData({
        checkedIndex: util.dataset(e, 'index')
    })
}
// 支付
VM.payHandle = function() {
    if (this.data.checkedIndex < 0) {
        return util.Toast('请选择预充金额', 2000)
    }
    //充值
    // Req.request('store_order_buy', passVal, {}, (inf) => {
    //     app.wxpay(inf, function() {
    //         setTimeout(() => {
    //             wx.redirectTo({
    //                 url: '/pages/me/index/index',
    //             });
    //         }, 1500);
    //     }, function() {
    //         wx.redirectTo({
    //             url: '/pages/me/index/index'
    //         });
    //     });
    // });
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
