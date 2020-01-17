const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        // pagination
        current: 0,
        rownum: 10,
        total: 0,
        total_page: 1,
        list: [],
        isEmpty: false
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    this.getList();
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this);
}
// 获取订单
VM.getList = function(e) {
    if (this.data.current >= this.data.total_page) {
        return false
    }
    Req.request('getOrderList', {
        page: this.data.current + 1,
        rownum: this.data.rownum
    }, {
        method: 'get'
    }, (res) => {
        console.log(res);
        let data = res.data
        let pagination = res.data.pagination
        let list = this.data.list
        this.setData({
            list: list.concat(data.list),
            current: pagination.current,
            rownum: pagination.rownum,
            total: pagination.total,
            total_page: pagination.total_page,
            isEmpty: pagination.total <= 0 ? true : false
        })
    }, (err) => {
        wx.showModal('提示', '系统出错', false, '', '知道了')
    })
}
VM.onReady = function() {

}

VM.onShow = function() {
    console.log(getCurrentPages().length);
}

VM.onHide = function() {

}

VM.onUnload = function() {

}

VM.onPullDownRefresh = function() {
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {
    this.getList()
}
VM.onShareAppMessage = function() {

}
Page(VM)
