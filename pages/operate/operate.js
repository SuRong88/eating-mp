const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        // 弹窗
        show: false,
        // 1申请终端角色 2进入终端
        type: 1
        // // 显示返回客户端按钮
        // showReturn:false
    }
}
VM.init = function(query) {
    this.setData({
        type: query.type * 1
    })
    // 设置自定义头部
    util.setHeader(this);
}
// 弹窗
VM.confirmHandle = function() {
    this.setData({
        show: false
    })
    wx.redirectTo({
        url: '/pages/me/index/index'
    })
}
// 弹窗
VM.cancelHandle = function() {
    this.setData({
        show: false
    })
}
// 返回用户端
VM.backClient = function() {
    this.setData({
        show: true
    })
}
// 打包员
VM.roleHandle01 = function() {
    wx.login({
        success: res => {
            Req.request('getApplyState', {
                role: 'packer',
                code: res.code
            }, {
                method: 'post'
            }, (res) => {
                // 授权情况 0-暂未授权 1-授权中 2-已授权 3-未通过授权
                // 角色 1-用户 2-配送员 3-打包员 4-全是
                let adopt = res.data.adopt * 1
                let role = res.data.role * 1
                if (this.data.type == 1) { //申请终端
                    switch (adopt) {
                        case 0:
                            wx.navigateTo({
                                url: '/pages/toggle/toggle?type=packer'
                            })
                            break;
                        default:
                            wx.navigateTo({
                                url: '/pages/state/state?type=' + adopt
                            })
                    }
                } else { //进入终端
                    switch (role) {
                        // 角色 1-用户 2-配送员 3-打包员 4-全是
                        // 用户或者配送员
                        case 1:
                        case 2:
                            util.showModal('提示', '请先申请注册打包员', false, '', '知道了')
                            break;
                        default:
                            wx.navigateTo({
                                url: '/pages/packer/packer'
                            })
                    }
                }
            }, (err) => {
                util.showModal('提示', '系统出错', false, '', '知道了')
            })

        }
    })
}
// 配送员
VM.roleHandle02 = function() {
    wx.login({
        success: res => {
            Req.request('getApplyState', {
                role: 'runner',
                code: res.code
            }, {
                method: 'post'
            }, (res) => {
                // 授权情况 0-暂未授权 1-授权中 2-已授权 3-未通过授权
                // 角色 1-用户 2-配送员 3-打包员 4-全是
                let adopt = res.data.adopt * 1
                let role = res.data.role * 1
                if (this.data.type == 1) { //申请终端
                    switch (adopt) {
                        case 0:
                            wx.navigateTo({
                                url: '/pages/toggle/toggle?type=runner'
                            })
                            break;
                        default:
                            wx.navigateTo({
                                url: '/pages/state/state?type=' + adopt
                            })
                    }
                } else { //进入终端
                    switch (role) {
                        // 用户或者打包员
                        case 1:
                        case 3:
                            util.showModal('提示', '请先申请注册配送员', false, '', '知道了')
                            break;
                        default:
                            wx.navigateTo({
                                url: '/pages/deliver/deliver'
                            })
                    }
                }
            }, (err) => {
                util.showModal('提示', '系统出错', false, '', '知道了')
            })

        }
    })
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}

Page(VM)
