//comment.js
//获取应用实例
const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        showMask: false,
        // 原因下标
        reasonIndex: -1,
        // meal
        list: [],
        // 当前投诉菜式的下标
        complainIndex: -1,
        reasonArr: ['分量不足', '口味下降']
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
    let orderInfo = app.globalData.orderInfo
    this.setData({
        list: orderInfo.meal
    })
}
//展示投诉mask
VM.showMask = function(e) {
    this.setData({
        complainIndex: util.dataset(e, 'index'),
        reasonIndex: -1,
        showMask: true
    })
}
//隐藏投诉mask
VM.hideMask = function() {
    this.setData({
        showMask: false
    })
}
// 投诉原因选择
VM.reasonSelect = function(e) {
    this.setData({
        reasonIndex: util.dataset(e, 'index')
    })
}
// 提交投诉
VM.submitHandle = function() {
    let data = this.data
    let reasonIndex = data.reasonIndex
    if (reasonIndex < 0) {
        return util.Toast('请选择投诉原因')
    }
    // 当前投诉菜式
    let meal = data.list[data.complainIndex]
    Req.request('addComplaint', {
        order_id: app.globalData.orderInfo.id,
        meal_id: meal.id,
        meal_name: meal.name,
        reason: data.reasonArr[reasonIndex]
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('投诉成功')
        let tar = 'list[' + data.complainIndex + '].complain'
        this.setData({
            [tar]: 1,
            showMask: false
        })
    })
}
//菜式 喜欢不喜欢
VM.preferHandle = function(e) {
    let index = util.dataset(e, 'index')
    let prefer = util.dataset(e, 'prefer')
    let meal = this.data.list[index]
    // 
    if (prefer == meal.prefer) {
        return false
    }
    // 
    Req.request('addPreference', {
        meal_id: meal.id,
        meal_name: meal.name,
        prefer: prefer,
        complain: meal.complain
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('评价成功')
        let tar = 'list[' + index + '].prefer'
        this.setData({
            [tar]: prefer
        })
        // fail not yet
        // 偏好改变 更新上一页"订单列表"数据
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.update()
    })
}
VM.onLoad = function(query) {
    base.onLoad(this)
    this.init(query)
}
Page(VM)
