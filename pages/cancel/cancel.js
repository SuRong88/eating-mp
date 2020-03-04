const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        // 余额充足
        isEnough: true,
        //获取取消日期
        list: [],
        // 剩余取消次数
        cancel: 0,
        // not yet
        weekArr: ['周一', '周二', '周三', '周四', '周五'],
        // 是否取消（状态改变）
        isCancel: false,
        // 初始状态的取消日期数组
        list2: []

    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    // 获取取消送餐日期
    Req.request('cancelDelivery', null, {
        method: 'get'
    }, (res) => {
        let list = res.data.date
        let list2 = JSON.parse(JSON.stringify(list))
        this.setData({
            list: list,
            list2: list2,
            cancel: res.data.cancel
        })
    }, (err) => {
        // 预充余额不足
        if (err == 10330) {
            this.setData({
                isEnough: false
            })
        } else {
            util.showModal('提示', '系统出错', false, '', '确定')
        }
    })
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}
// 选中是否取消
// is_choosed:是否可以被选 0不能选 1 可选
// is_cancel:是否已取消 0未取消 1已取消
VM.cancelHandle = function(e) {
    // 1.今天
    let index = util.dataset(e, 'index')
    let selectedDay = this.data.list[index]
    if (selectedDay.is_today == 1) {
        if (this.data.cancel == 0) {
            return util.showModal('提示', '本月取消次数已用完', false, '', '确定')
        }
        if (selectedDay.is_choosed == 0) {
            return util.showModal('提示', '今天已无法取消送餐', false, '', '确定')
        }
        let time = new Date().getHours()
        if (time >= 11) {
            this.setData({
                ['list[' + index + '].is_choosed']: 0
            })
            return util.showModal('提示', '已超过取消时间', false, '', '确定')
        }
        let cancel = selectedDay.is_cancel == 0 ? 1 : 0;
        this.setData({
            ['list[' + index + '].is_cancel']: cancel,
        })
    } else { // 2.非今天
        let cancel = selectedDay.is_cancel == 0 ? 1 : 0;
        this.setData({
            ['list[' + index + '].is_cancel']: cancel,
        })
    }
}
// 确认取消
VM.confirmCancel = function() {
    let cancelDays = []
    let list = this.data.list
    let list2 = this.data.list2

    let isChanged = false
    for (let i = 0; i < list.length; i++) {
        let item1 = list[i]
        let item2 = list2[i]
        if (item1.is_cancel != item2.is_cancel) {
            isChanged = true
            break;
        }
    }
    if(!isChanged){
        return false;
        // return util.showModal('提示', '没变化', false, '', '确定')
    }
    for (let i = 0; i < list.length; i++) {
        let item1 = list[i]
        let item2 = list2[i]
        item1.is_cancel != item2.is_cancel && cancelDays.push(item1.date_str)
        if (item1.is_today == 1 && item1.is_choosed == 1) {
            let time = new Date().getHours()
            if (time >= 10) {
                this.setData({
                    ['list[' + i + '].is_choosed']: 0
                })
                return util.showModal('提示', '今天已超过取消时间', false, '', '确定')
            }
        }
    }
    console.log(cancelDays);
    // 获取取消送餐日期
    Req.request('cancelDelivery', {
        date: JSON.stringify(cancelDays)
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('取消成功')
        setTimeout(() => {
            wx.redirectTo({
                url: '/pages/index/index'
            })
        }, 1500)
    }, (err) => {
        // 
        if (err.code == 10301) {
            util.showModal('提示', err.msg, false, '', '确定')
        } else {
            util.showModal('提示', '系统出错', false, '', '确定')
        }
    })
}
Page(VM)
