const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // pagination
        current: 0,
        rownum: 12,
        total: 0,
        total_page: 1,
        list: [],
        isEmpty: false,

        billArr: ['消费', '充值', '退款']
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    this.getList();
}

VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}
VM.getList = function(e) {
    if (this.data.current >= this.data.total_page) {
        return false
    }
    Req.request('accountBill', {
        page: this.data.current + 1,
        rownum: this.data.rownum,
    }, {
        method: 'get'
    }, (res) => {
        let data = res.data
        let pagination = res.data.pagination
        let list = this.data.list
        this.setData({
            list: list.concat(data.list),
            current: pagination.current * 1,
            rownum: pagination.rownum * 1,
            total: pagination.total * 1,
            total_page: pagination.total_page * 1,
            isEmpty: pagination.total * 1 <= 0 ? true : false
        })
    }, () => {
        wx.showModal('提示', '系统出错', false, '', '知道了')
    })
}

VM.onPullDownRefresh = function() {
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {
    this.getList()
}

Page(VM)
