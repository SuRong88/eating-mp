const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        showTip: true,
        // 饭菜分量
        weightList: [],
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
    // 送餐日期
    let dayArr = []
    this.data.dayArr.forEach((item, index) => {
        // 周一传1 以此类推
        item.checked && dayArr.push(index + 1)
    })
    // test
    let _data = this.data
    app.globalData.planInfo = {
        date: dayArr.join("|"),
        service: _data.timeArr[_data.checkedIndex02],
        weight: _data.weightList[_data.checkedIndex03].id,
        is_spicy: _data.checkedIndex04 + 1,
        phone: _data.phone
    }
    // end
    return console.log(app.globalData);
    let valiate = (this.data.phone.length == 11 && this.dayArr.length > 0 && this.data.checkedIndex02 >= 0 && this.data
        .checkedIndex03 >= 0 && this.data.checkedIndex04 >= 0)
    if (valiate) {
        let _data = this.data
        app.globalData.planInfo = {
            date: dayArr.join("|"),
            service: _data.timeArr[_data.checkedIndex02],
            weight: _data.weightList[_data.checkedIndex03].id,
            is_spicy: _data.checkedIndex04 + 1,
            phone: _data.phone
        }
        wx.navigateTo({
            url: '/pages/plan/address/address?type=setting'
        })
    } else {
        util.showModal('提示', '请完善定制计划信息', false, '', '确定')
    }
}
VM.getPhoneNumber = function(e) {
    console.log(e);
    // 取消授权
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        util.showModal('提示', '手机授权失败，请重新授权', false, '', '确定')
    } else {
        Req.request('getPhoneNum', {
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
    }
}
VM.onLoad = function(query) {
    this.init()
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
