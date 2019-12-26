const util = require('./util.js')
const app = getApp();
const HOST = 'http://xcx.mrxdtech.com/xcx16';
let Request = null;
// 接口
const OPTIONS = {
    // 系统参数
    getSystemInfo: {
        url: `${HOST}/webinfo`,
    },
    //获取用户信息
    getUserInfo: {
        url: `${HOST}/wx/xcxtoken`
    },
    //获取乐器分类列表
    getMusicainList: {
        url: `${HOST}/goods/classify`
    }
}
// 状态码处理
function codeCheck(value, fail) {
    switch (parseInt(value.code)) {
        //输入错误
        case 10101:
            util.errorToast('系统出错');
            break;
        case 10209:
            util.errorToast('系统出错');
            break;
        default:
            util.errorToast(value.msg);
            break;
    }
}
// 请求方法
/**
 ** key：接口名
 ** data: 参数
 ** option: 配置
 **success: 成功的回调函数
 ** fail：失败的回调函数
 ** todo: 自定义接口调用成功的状态码判断方法
 **/
function request(key, data, option, success, fail, todo) {
    util.showLoading();
    let url = OPTIONS[key].url;
    let method = (option && option.method) || 'GET';
    let dataType = (option && option.dataType) || 'json';
    let responseType = (option && option.responseType) || 'text';
    wx.request({
        url: url,
        data: data,
        method: method,
        dataType: dataType,
        responseType: responseType,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'X-Token': wx.getStorageSync('token')
        },
        success: function(res) {
            var value = res.data;
            if (todo) {
                todo(value);
            } else {
                switch (value.code * 1) {
                    case 0:
                        success && success(value.data);
                        break;
                    default:
                        codeCheck(value, fail);
                        break;
                };
            }
            wx.hideLoading();
        },
        fail: function(err) {
            console.log(err);
            util.errorToast('系统出错');
        }
    })
}
Request = {
    OPTIONS,
    request
}
module.exports = Request;
