//获取应用实例
const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        boxNumber: ''
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
// 保温箱扫码
VM.scanHandle = function() {
    wx.scanCode({
        success: (res) => {
            console.log(res);
            if(res.result.includes('xcx17.mrxdtech.com/api/')){
                return util.errorToast('二维码错误');
            }
            this.setData({
                boxNumber: res.result,
                isDisabled: false
            })
        },
        fail: (err) => {
            console.log(err);
            wx.hideLoading();
            util.errorToast('系统出错,请重试');
        }
    })
}
// 提交
VM.submitHandle = function() {
    if (this.data.isDisabled) {
        return false
    }
    Req.request('submitDeliver', {
        box_id: this.data.boxNumber
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('提交成功')
        this.setData({
            boxNumber: '',
            isDisabled: true
        })
    }, (err) => {
        util.showModal('提示', err.msg, false, '', '确定')
    })
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}
Page(VM)
