const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        statusArr: ['准备中', '运送中', '已送达', '临时取消'],
        // pagination
        current: 0,
        rownum: 10,
        total: 0,
        total_page: 1,
        list: [],
        isEmpty: false
    }
}
VM.init = function() {
    console.log(this.data);
    this.getList();
}
// 下一页评论成功之后更新本页面数据
VM.update = function() {
    this.setData({
        current: 0,
        rownum: 10,
        total: 0,
        total_page: 1,
        list: [],
        isEmpty: false
    })
    this.getList();
}
VM.onLoad = function(query) {
    util.setHeader(this);
    base.onLoad(this);
    this.init()
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

// 投诉
VM.jumpComment = function(e) {
    let index = util.dataset(e, 'index')
    let orderInfo = this.data.list[index]
    app.globalData.orderInfo = orderInfo
    wx.navigateTo({
        url: `/pages/comment/comment`
    })
    // console.log(app.globalData);
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
