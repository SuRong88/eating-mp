// pages/test/test.js
const app = getApp()
import formcheck from '../../utils/formcheck.js'
import util from '../../utils/util.js'
import base from '../../utils/base.js';
var VM = {
    data: {
        headBarHeight: 0,
        padHeight: 0,
        show:1
    }
}
VM.init = function() {
    util.setHeader(this);
    // console.log(page)
    console.log(app)
    // console.log(this);
    // console.log(app.getSystemInfo())
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
