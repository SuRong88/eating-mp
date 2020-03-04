const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // pagination
        current: 0,
        rownum: 10,
        total: 0,
        total_page: 1,
        list: [],
        isEmpty: false,
        // 导航下标
        navIndex: 0,
        // 是否已使用
        used: false
    }
}
VM.init = function(type) {
    this.getList();
    // 设置自定义头部
    util.setHeader(this);
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}
VM.navToggle = function(e) {
    let navIndex = util.dataset(e, 'index')
    if (this.data.navIndex == navIndex) {
        return false
    }
    // 切换重置
    this.setData({
        current: 0,
        rownum: 10,
        total: 0,
        total_page: 1,
        list: []
    })
    if (navIndex == 0) {
        this.setData({
            navIndex: navIndex,
            used: false
        })
    } else {
        this.setData({
            navIndex: navIndex,
            used: true
        })
    }
    this.getList()
}
VM.getList = function(e) {
    if (this.data.current >= this.data.total_page) {
        return false
    }
    Req.request('getVoucherList', {
        page: this.data.current + 1,
        rownum: this.data.rownum,
        type: this.data.used ? 2 : 1 //1未使用 2已使用
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
VM.onShareAppMessage = function() {

}
Page(VM)
