const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        // 按钮状态
        isDisabled: true,
        // 等待授权验证
        waiting: true,
        // 姓名
        name: '',
        phone: '',
        // 授权情况 0-暂未授权 1-授权中 2-已授权 3-未通过授权
        type:1,
        stateInfo:[
            '授权申请处理中，请耐心等待…',
            '已授权，请扫描登录商家终端二维码',
            '未通过授权，请商家处理'
        ]
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    this.setData({
      type:type
    })
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
    this.init(query.type*1)
    base.onLoad(this)
}

Page(VM)
