//charge.js
//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
var VM = {
    data: {
        checkedIndex: -1,
        priceList: [{
                price: 200,
                desc: '享每餐优惠2元'
            },
            {
                price: 300,
                desc: '享每餐优惠2元'
            }, {
                price: 500,
                desc: '享每餐优惠2元'
            },
            {
                price: 50,
                desc: ''
            }, {
                price: 100,
                desc: ''
            }
        ]
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
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
        return util.errorToast('请选择预充金额')
    } 
    // 
}
VM.onLoad = function(query) {
    this.init()
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
