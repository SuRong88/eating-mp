const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 将&nbsp;转换为可识别
function space(str) {
    var str = str.replace(/&amp;nbsp;/g, '');
    return str
}
// 简易提示框
function Toast(msg) {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
    })
}
// 信息验证报错
// 表单错误信息提示
function errorToast(msg) {
    wx.showToast({
        title: msg,
        // 没有这个
        // icon: 'error',
        duration: 2000
    })
}

// 成功提示
function successToast(msg) {
    wx.showToast({
        title: msg,
        duration: 2000
    })
}

// 加载
function showLoading() {
    wx.showLoading({
        title: '加载中',
        mask: true
    })
}
// 关闭加载
function hideLoading(success, fail, complete) {
    wx.hideLoading()
}

// 模态弹窗
function showModal(title, content, showCancel, cancelText, confirmText, cb_confirm, cb_cancel) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        cancelText: cancelText,
        confirmText: confirmText,
        cancelColor: '#000000',
        confirmColor: '#CA9700',
        success: function(res) {
            if (res.confirm) {
                cb_confirm && cb_confirm();
            } else if (res.cancel) {
                cb_cancel && cb_cancel();
            }
        }
    })
}

// 设置自定义头部高度
function setHeader(that) {
    wx.getSystemInfo({
        success: res => {
            that.setData({
                headBarHeight: res.statusBarHeight / (res.windowWidth / 750),
                padHeight: res.statusBarHeight / (res.windowWidth / 750) + 88
            })
            // console.log(res.statusBarHeight / (res.windowWidth / 750))
        }
    })
}
// 获取 e.currentTarget.dataset 某个key值
function dataset(e, key) {
    return e.currentTarget.dataset[key];
}
module.exports = {
    formatTime,
    space,
    Toast,
    errorToast,
    successToast,
    showLoading,
    hideLoading,
    showModal,
    setHeader,
    dataset
}
