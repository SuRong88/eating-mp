const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        list: [],
        boxNumber: '',
        isDisabled: true
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}
// 删除餐盒
VM.deleteHandle = function(e) {
    util.showModal('提示', '确定删除该餐盒吗', true, '取消', '确定', () => {
        let index = util.dataset(e, 'index')
        this.data.list.splice(index, 1)
        let isDisabled = this.data.list > 0 ? false : true
        this.setData({
            list: this.data.list,
            isDisabled: isDisabled
        })
    }, () => {
        return false
    })
}
// 餐盒扫码
VM.scanHandle01 = function() {
    wx.scanCode({
        success: (res) => {
            console.log(res)
            let url = res.result
            wx.request({
                url: url,
                // data: data,
                method: 'get',
                dataType: 'json',
                responseType: 'text',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-Token': wx.getStorageSync('token')
                },
                success: (res) => {
                    wx.hideLoading();
                    console.log(res);
                    if (res.data.code == 0) {
                        let list = this.data.list
                        for (let i = 0; i < list.length; i++) {
                            if (list[i] == res.data.data) { //已扫描
                                return util.showModal('提示', '餐盒已存在', false, '', '确定')
                            }
                        }
                        // 成功 餐盒id添加至原有数组
                        util.successToast('扫描成功')
                        list.push(res.data.data)
                        let isDisabled = this.data.boxNumber ? false : true
                        this.setData({
                            list: list,
                            isDisabled: isDisabled
                        })
                        // 待处理
                    } else if (res.data.code == 50003) { //token过期
                        util.showModal('提示', '登录信息已过期,请重新登录', false, '', '确定', () => {
                            getApp().checkAuthorize(() => {
                                getApp().userLogin((res) => {
                                    wx.reLaunch({
                                        url: '/pages/packer/packer'
                                    })
                                })
                            }, () => {
                                wx.reLaunch({
                                    url: '/pages/introduce/introduce'
                                })
                            })
                        })
                    } else {
                        util.showModal('提示', res.data.msg, false, '', '确定')
                    }
                },
                fail: (err) => {
                    console.log(err);
                    wx.hideLoading();
                    util.errorToast('二维码错误');
                }
            })
        },
        fail: (err) => {
            wx.hideLoading();
            if (err.errMsg == "scanCode:fail cancel") {
                return false;
            }
            util.errorToast('系统出错,请重试');
        }
    })
}
// 保温箱扫码
VM.scanHandle02 = function() {
    wx.scanCode({
        success: (res) => {
            console.log(res);
            if (res.result.includes('xcx17.mrxdtech.com/api/')) {
                return util.errorToast('二维码错误');
            }
            let isDisabled = this.data.list.length > 0 ? false : true
            this.setData({
                boxNumber: res.result,
                isDisabled: isDisabled
            })
        },
        fail: (err) => {
            // console.log(err);
            wx.hideLoading();
            if (err.errMsg == "scanCode:fail cancel") {
                return false;
            }
            util.errorToast('系统出错,请重试');
        }
    })
}
// 提交
VM.submitHandle = function() {
    if (this.data.isDisabled) {
        return false
    }
    console.log(this.data.list);
    Req.request('submitPacker', {
        order_id: JSON.stringify(this.data.list),
        box_id: this.data.boxNumber
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('提交成功')
        this.setData({
            list: [],
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
