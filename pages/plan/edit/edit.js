//获取应用实例
const app = getApp()
import formcheck from '../../../utils/formcheck.js'
import util from '../../../utils/util.js'
import base from '../../../utils/base.js'
var VM = {
    data: {
        showTip: true,
        phone: '',
        // 每周几天送餐 arr
        dayArr: [{
                name: "周一",
                checked: true,
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
        // 送达时间
        checkedIndex02: 0,
        // 饭菜分量
        checkedIndex03: 0,
        // 是否吃辣
        checkedIndex04: 0
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
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
        checkedIndex02: util.dataset(e, 'index')
    })
}
// 饭菜分量
VM.settingHandle03 = function(e) {
    this.setData({
        checkedIndex03: util.dataset(e, 'index')
    })
}
// 是否吃辣
VM.settingHandle04 = function(e) {
    this.setData({
        checkedIndex04: util.dataset(e, 'index')
    })
}
// 下一步
VM.nextStep = function() {
    util.showModal('提示', '下一步', true, '取消', '确定')
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
