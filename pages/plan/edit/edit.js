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
        checkedIndex04: -1,
        planInfo: null
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
    // 获取饭菜分量list
    Req.request('getWeightList', null, {
        method: 'get'
    }, (res) => {
        this.setData({
            weightList: res.data
        })
        // 获取计划
        Req.request('planning', {}, {
            method: 'get'
        }, (res) => {
            console.log(res.data);
            this.setData({
                planInfo: res.data
            })
            let inf = res.data
            // day
            for (let i = 0; i < inf.date.length; i++) {
                let index = inf.date[i] * 1 - 1
                console.log(index);
                let tar = 'dayArr[' + index + '].checked'
                console.log(tar);
                this.setData({
                    [tar]: true
                })
            }
            // 送达时间
            for (let i = 0; i < this.data.timeArr.length; i++) {
                if (this.data.timeArr[i] == inf.service_time) {
                    this.setData({
                        checkedIndex02: i
                    })
                    break
                }
            }
            // 饭菜分量
            for (let i = 0; i < this.data.weightList.length; i++) {
                if (this.data.weightList[i].id == inf.weight) {
                    this.setData({
                        checkedIndex03: i
                    })
                    break
                }
            }
            // 是否吃辣
            this.setData({
                checkedIndex04: inf.is_spicy - 1
            })

        }, () => {

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
    let valiate = (dayArr.length > 0 && this.data.checkedIndex02 >= 0 && this.data
        .checkedIndex03 >= 0 && this.data.checkedIndex04 >= 0)
    if (valiate) {
        let _data = this.data
        // 修改前的计划信息
        let planInfo01 = this.data.planInfo
        // 变更计划信息
        let planInfo02 = {
            date: dayArr.join("|"),
            service_time: _data.timeArr[_data.checkedIndex02],
            weight: _data.weightList[_data.checkedIndex03].id,
            is_spicy: _data.checkedIndex04 + 1,
        }
        planInfo01.date = planInfo02.date
        planInfo01.service_time = planInfo02.service_time
        planInfo01.weight = planInfo02.weight
        planInfo01.is_spicy = planInfo02.is_spicy
        
        
        app.globalData.planInfo = planInfo01
        console.log(app.globalData.planInfo);
        wx.navigateTo({
            url: '/pages/me/address/address'
        })
    } else {
        console.log('信息不完整');
        util.showModal('提示', '请完善定制计划信息', false, '', '确定')
    }
}

VM.onLoad = function(query) {
    this.init()
    base.onLoad(this)
}

Page(VM)
