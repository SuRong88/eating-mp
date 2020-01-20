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
        chargeType: ''
    }
}
VM.init = function(query) {
    // 设置自定义头部
    util.setHeader(this);
    query.type && this.setData({
        chargeType: 'me'
    })
    Req.request('chargeType', null, {
        method: 'get'
    }, (res) => {
        let last_time = null
        let data = res.data;
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
        util.showModal('提示', '系统出错', false, '', '知道了')
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
    let data = this.data
    if (data.checkedIndex < 0) {
        return util.Toast('请选择预充金额', 2000)
    }
    // 充值
    // 获取支付信息
    Req.request('chargeInfo', {
        id: data.priceList[data.checkedIndex].id
    }, {
        method: 'post'
    }, (res) => {
        console.log(res);
        // 微信支付
        app.wxpay(res, () => {
            util.successToast('充值成功')
            setTimeout(() => {
                // 1.个人中心充值
                if (data.chargeType == 'me') {
                    wx.reLaunch({
                        url: '/pages/me/index/index'
                    });
                }
                // 2.定制计划充值
                // not yet 判断条件缺
                if (true) { // 普通用户+受邀用户  进入定制成功页面
                    wx.navigateTo({
                        url: '/pages/complete/complete?type=custom',
                    });
                } else { //
                    wx.reLaunch({
                        url: '/pages/index/index'
                    });
                }
            }, 1500);

        }, () => {
            util.Toast('支付失败')
        });
    }, () => {
        util.showModal('提示', '获取支付信息失败,请重试', false, '', '知道了')
    })

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
