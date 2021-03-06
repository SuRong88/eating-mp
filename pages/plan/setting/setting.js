const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // code
        code:'',
        showTip: true,
        // 饭菜分量
        weightList: [],
        // test 
        phone: '',
        // 每周几天送餐 arr
        dayArr: [{
                name: "周一",
                checked: false,
            },
            {
                name: "周二",
                checked: false,
            },
            {
                name: "周三",
                checked: false,
            },
            {
                name: "周四",
                checked: false,
            },
            {
                name: "周五",
                checked: false,
            }
        ],
        timeArr: ['11:30', '12:00', '12:30', '13:00'],
        // 送达时间
        checkedIndex02: -1,
        // 饭菜分量
        checkedIndex03: -1,
        // 是否吃辣
        checkedIndex04: -1
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
    // 获取code
    let that = this;
    wx.login({
        success: res => {
            that.data.code = res.code
        }
    })
    // 获取饭菜分量list
    Req.request('getWeightList', null, {
        method: 'get'
    }, (res) => {
        console.log(res);
        this.setData({
            weightList: res.data
        })
    }, (err) => {
        util.showModal('提示', '系统出错', false, '', '确定')
    })
}
// 关闭送餐计划提示
VM.closeTip = function() {
    this.setData({
        showTip: false
    })
}
// 每周几天送餐
VM.settingHandle01 = function(e) {
    let index = util.dataset(e, 'index')
    let bool = "dayArr[" + index + "].checked";
    this.setData({
        [bool]: !this.data.dayArr[index].checked
    })
}
// 送达时间
VM.settingHandle02 = function(e) {
    this.setData({
        checkedIndex02: util.dataset(e, 'index') * 1
    })
}
// 饭菜分量
VM.settingHandle03 = function(e) {
    this.setData({
        checkedIndex03: util.dataset(e, 'index') * 1
    })
}
// 是否吃辣
VM.settingHandle04 = function(e) {
    this.setData({
        checkedIndex04: util.dataset(e, 'index') * 1
    })
}
// 下一步
VM.nextStep = function() {
    // 选中 送餐日期
    let dayArr = []
    this.data.dayArr.forEach((item, index) => {
        // 周一传1 以此类推
        item.checked && dayArr.push(index + 1)
    })
    let valiate = (this.data.phone.length == 11 && dayArr.length > 0 && this.data.checkedIndex02 >= 0 && this.data
        .checkedIndex03 >= 0 && this.data.checkedIndex04 >= 0)
    if (valiate) {
        let _data = this.data
        app.globalData.planInfo = {
            date: dayArr.join("|"),
            service_time: _data.timeArr[_data.checkedIndex02],
            weight: _data.weightList[_data.checkedIndex03].id,
            is_spicy: _data.checkedIndex04 + 1,
            phone: _data.phone
        }
        wx.redirectTo({
            url: '/pages/plan/address/address'
        })
    } else {
        console.log('信息不完整');
        util.showModal('提示', '请完善定制计划信息', false, '', '确定')
    }
}
// 获取手机号码
VM.getPhoneNumber = function(e) {
    console.log(e);
    // 取消授权
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        util.showModal('提示', '手机授权失败，请重新授权', false, '', '确定')
    } else { //确认授权
        let that = this
        Req.request('getPhoneNum', {
            code: that.data.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
        }, {
            method: 'get'
        }, (res) => {
            console.log(res);
            this.setData({
                phone: res.data
            })
        }, (err) => {
            util.showModal('提示', '获取手机失败，请重试', false, '', '确定')
        })
        // wx.login({
        //     success: res => {
        //         Req.request('getPhoneNum', {
        //             code: res.code,
        //             iv: e.detail.iv,
        //             encryptedData: e.detail.encryptedData
        //         }, {
        //             method: 'get'
        //         }, (res) => {
        //             console.log(res);
        //             this.setData({
        //                 phone: res.data
        //             })
        //         }, (err) => {
        //             util.showModal('提示', '获取手机失败，请重试', false, '', '确定')
        //         })
        //     },
        //     fail: err => {
        //         wx.showModal({
        //             title: '提示',
        //             content: '登录失败,请重试',
        //             showCancel: false,
        //             confirmColor: '#CA9700',
        //         })
        //     }
        // })
    }
}

VM.onLoad = function(query) {
    this.init()
    base.onLoad(this)
}

Page(VM)
