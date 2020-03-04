const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        // 申请角色 packer deliver
        type: 'packer',

        // 按钮状态
        isDisabled: true,
        // 等待授权验证
        waiting: false,
        // 姓名
        name: '',
        phone: ''
    }
}
VM.init = function(query) {
    this.setData({
        type: query.type || 'packer'
    })
    // 设置自定义头部
    util.setHeader(this);
}
// 名字
VM.nameCheck = function(e) {
    let name = e.detail.value
    this.setData({
        name: name
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
        phone: phone
    })
    if (this.data.name && formcheck.check_phone(phone)) {
        this.setData({
            isDisabled: false
        })
    }
}
VM.submitHandle = function() {
    if (this.data.isDisabled) {
        console.log(2);
        return util.Toast('请填写完整信息', 2000)
    }
    // if (!formcheck.check_phone(phone)) {
    //     return util.Toast('手机格式有误', 2000)
    // }
    let phone = this.data.phone
    let name = this.data.name
    switch (this.data.type) {
        case 'packer':
            Req.request('applyPacker', {
                phone:phone,
                realname:name
            }, {
                method: 'post'
            }, (res) => {
                util.successToast('提交成功')
                // 申请中  
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/state/state?type=1'
                    })
                }, 1500)
            })
            break;
        case 'deliver':
            Req.request('applyDeliver', {
                phone:phone,
                realname:name
            }, {
                method: 'post'
            }, (res) => {
                util.successToast('提交成功')
                // 申请中  
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/state/state?type=1'
                    })
                }, 1500)
            })
            break;
        default:
            Req.request('applyPacker', {
                phone:phone,
                realname:name
            }, {
                method: 'post'
            }, (res) => {
                util.successToast('提交成功')
                // 申请中  
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/state/state?type=1'
                    })
                }, 1500)
            })

    }
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}

Page(VM)
