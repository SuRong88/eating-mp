//获取应用实例
const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        boxNumber: '',
        isDisabled: true
    }
}
VM.init = function (type) {
    // 设置自定义头部
    util.setHeader(this);
    // this.checkAllow();
}
// 保温箱扫码
VM.scanHandle = function () {
    wx.scanCode({
        success: (res) => {
            console.log(res);
            if (!res.result || res.result.includes('xcxdemo2.mrxdtech.com/api')) {
                return util.showModal('提示', '二维码错误', false, '', '确定')
            }
            this.setData({
                boxNumber: res.result,
                isDisabled: false
            })
        },
        fail: (err) => {
            // console.log(err);
            wx.hideLoading();
            if (err.errMsg == "scanCode:fail cancel") {
                return false;
            }
            return util.showModal('提示', '系统出错,请重试', false, '', '确定')
        }
    })
}
// 提交
VM.submitHandle = function () {
    if (this.data.isDisabled) {
        return util.showModal('提示', '请先扫描保温箱', false, '', '确定')
    }
    this.getLocation();
}
// 获取地理位置 
VM.getLocation = function () {
    wx.getLocation({
        success: res => {
            console.log(res);
            Req.request('submitDeliver', {
                box_id: this.data.boxNumber,
                location: res.latitude + "|" + res.longitude
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
        },
        fail: err => {
            console.log('获取位置失败')
            let that = this
            util.showModal('提示', '请先授权获取地理位置', false, '', '确定', () => {
                wx.openSetting({
                    success: function (dataAu) {
                        if (dataAu.authSetting["scope.userLocation"] == true) {
                            wx.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 1000
                            })
                            that.getLocation()
                        } else {
                            wx.showToast({
                                title: '授权失败',
                                icon: 'none',
                                duration: 1000
                            })
                        }
                    }
                })
            })
        }
    })
}
// 检查位置授权
VM.checkAllow = function (param) {
    wx.getSetting({
        success: (res) => {
            console.log(JSON.stringify(res))
            // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
            // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
            // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                wx.showModal({
                    title: '请求授权当前位置',
                    content: '需要获取您的地理位置，请确认授权',
                    success: function (res) {
                        if (res.cancel) {
                            wx.showToast({
                                title: '拒绝授权',
                                icon: 'none',
                                duration: 1000
                            })
                        } else if (res.confirm) {
                            wx.openSetting({
                                success: function (dataAu) {
                                    if (dataAu.authSetting["scope.userLocation"] == true) {
                                        wx.showToast({
                                            title: '授权成功',
                                            icon: 'success',
                                            duration: 1000
                                        })
                                        //再次授权，调用wx.getLocation的API

                                    } else {
                                        wx.showToast({
                                            title: '授权失败',
                                            icon: 'none',
                                            duration: 1000
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            } else if (res.authSetting['scope.userLocation'] == undefined) {
                //调用wx.getLocation的API
            } else {
                //调用wx.getLocation的API
            }
        }
    })
}
VM.onLoad = function (query) {
    this.init(query)
    base.onLoad(this)
}
Page(VM)