const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        // headBarHeight: 0,
        // padHeight: 0,
        show: true
    }
}
VM.init = function() {
    console.log(wx.canIUse('button.open-type.getUserInfo'));
    
    
    util.setHeader(this);
    // Req.request('getSystemInfo', null, {
    //     method: 'get'
    // }, (res) => {
    //     console.log(res)
    // }, (err) => {
    //     console.log(err);
    // })
}
VM.confirmHandle = function() {
    console.log('确定');
    this.setData({
        show: false
    })
}
VM.cancelHandle = function() {
    console.log('取消');
    this.setData({
        show: false
    })
}
// VM.login= function(){
//     console.log('login');
// }
VM.getUserInfo = function(e) {
    console.log(233);
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
        console.log('已授权');
        //用户按了允许授权按钮
    } else {
        console.log('取消授权');
        //用户按了拒绝按钮
    }
}
VM.onLoad = function(query) {
    this.init()
    base.onLoad(this);
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
