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
    }, (err) => {
        console.log(err);
        if (err == 50001) {
            this.setData({
                isEmpty: true
            })
        } else {
            util.showModal('提示', '系统出错', false, '', '知道了')
        }
    })
}

// 投诉
VM.jumpComment = function(e) {
    let index = util.dataset(e, 'index')
    let orderInfo = this.data.list[index]
    let status = orderInfo.status
    if (status != 3) {
        return util.showModal('提示', '亲，订单还没完成呢', false, '', '知道了')
    }
    app.globalData.orderInfo = orderInfo
    wx.navigateTo({
        url: `/pages/comment/comment`
    })
}

VM.onPullDownRefresh = function() {
    wx.stopPullDownRefresh()
}

VM.onReachBottom = function() {
    this.getList()
}
Page(VM)
