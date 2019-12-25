//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
import base from '../../utils/base.js'
var VM = {
    data: {
        // 按钮状态
        isDisabled: true,
        // 等待授权验证
        waiting: false,
        // 姓名
        name: '',
        phone: ''
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
// 名字
VM.nameCheck = function(e) {
    let name = e.detail.value
    this.setData({
        name:name
    })
    if (name && formcheck.check_phone(this.data.phone)) {
        this.setData({
            isDisabled: false
        })
    }
}
// 手机
VM.phoneCheck = function(e) {
    let phone = e.detail.value
    this.setData({
        phone:phone
    })
    if (this.data.name && formcheck.check_phone(phone)) {
        this.setData({
            isDisabled: false
        })
    }
}
VM.submitHandle = function() {
    if (this.isDisabled) {
        return false
    }
    this.setData({
        waiting:true
    })
    // util.showLoading()
    // if (!formcheck.check_phone(this.data.phone)) {
    //     return util.Toast('手机号码格式不正确')
    // }
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
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)
