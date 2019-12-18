//index.js
//获取应用实例
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
var VM = {
    data: {
        // headBarHeight: 0,
        // padHeight: 0,
        noPlan:false
        // headerHeight: 0,
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
    // setTimeout(()=>{
    //     var query = wx.createSelectorQuery();
    //     query.select('#headerBg').boundingClientRect(rect => {
    //         this.setData({
    //             headerHeight: rect.height + 'px'
    //         })
    //         console.log(rect)
    //     }).exec();
    // },1000)
}

VM.onLoad = function(query) {
    this.init()
    // wx.getSystemInfo({
    //     success: res => {
    //         this.setData({
    //             headBarHeight: res.statusBarHeight / (res.windowWidth / 750),
    //             padHeight: res.statusBarHeight / (res.windowWidth / 750) + 88
    //         })
    //         console.log(res.statusBarHeight / (res.windowWidth / 750))
    //     }
    // })
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
