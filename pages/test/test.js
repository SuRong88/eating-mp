const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        headBarHeight: 0,
        padHeight: 0,
        show: 1
    }
}
VM.init = function() {
    util.setHeader(this);
    Req.request('getSystemInfo',null, {
        method: 'get'
    }, (res) => {
        console.log(res)
    }, (err) => {
        console.log(err);
    })
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
