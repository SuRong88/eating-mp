//setting.js
//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
var VM = {
    data: {
        // headBarHeight: 0,
        // padHeight: 0,
        showTip: true,
        phone: ''
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
VM.settingHandle01 = function() {
    this.setData({
    })
}
// 送达时间
VM.settingHandle02 = function() {
    this.setData({
    })
}
// 饭菜分量
VM.settingHandle03 = function() {
    this.setData({
    })
}
// 是否吃辣
VM.settingHandle04 = function() {
    this.setData({
    })
}
// 下一步
VM.nextStep = function() {
    console.log(233)
    util.showModal('提示','下一步',true,'取消','确定')
}
VM.onLoad = function(query) {
    this.init()
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
