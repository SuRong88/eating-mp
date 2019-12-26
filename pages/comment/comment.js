//comment.js
//获取应用实例
const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
var VM = {
    data: {
        showMask:false,
        reasonIndex:0
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}

VM.reasonSelect = function(e){
    this.setData({
        reasonIndex:util.dataset(e,'index')
    })
}
// 投诉 
VM.complaint = function(){
    this.setData({
       showMask:true 
    })
}
// 提交投诉
VM.submitHandle = function(){
    util.successToast('投诉成功')
    this.setData({
       showMask:false 
    })
}
VM.hideMask = function(){
    this.setData({
       showMask:false 
    })
}
VM.onLoad = function(query) {
    this.init(query)
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
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {

}
Page(VM)
