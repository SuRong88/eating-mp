const util = require('./util.js')
const app = getApp();
const HOST = 'http://xcx17.mrxdtech.com/api';
let Request = null;
// 接口
const OPTIONS = {
    /* 
     **1.用户模块
     */
    // 登录
    login: {
        url: `${HOST}/login`,
    },
    //获取用户信息
    getUserInfo: {
        url: `${HOST}/user`
    },
    // 添加用户偏好
    addPreference: {
        url: `${HOST}/user/prefer`
    },
    // 用户投诉
    addComplaint: {
        url: `${HOST}/complain`
    },
    // 获取投诉记录
    getComplaintList: {
        url: `${HOST}/complain`
    },
    // 提交送餐邀约
    submitInvition: {
        url: `${HOST}/invite`
    },
    // 获取配送订单记录
    getOrderList: {
        url: `${HOST}/order`
    },
    // 退款提现
    refund: {
        url: `${HOST}/refund`
    },
    // 获取代金券
    getVoucherList: {
        url: `${HOST}/voucher`
    },
    // 获取微信手机号
    getPhoneNum: {
        url: `${HOST}/user/phone`
    },
    /*
     **2.支付模块
     */
    // 账户充值
    accountCharge: {
        url: `${HOST}/pay/config`
    },
    // 余额流水
    accountBill:{
        url: `${HOST}/pay`
    },
    /*
     **3.定制计划模块
     */
    // get获取 post提交 put修改定制计划
    planning: {
        url: `${HOST}/plan`
    },
    // 获取饭菜分量,例如--大份12元
    getWeightList: {
        url: `${HOST}/weight`
    },
    /*
     **4.取消送餐模块
     */
    // get获取取消送餐的日期 post提交取消送餐的日期
    cancelDelivery: {
        url: `${HOST}/plan/cancel`
    }
}
// 状态码处理
function codeCheck(data, success, fail) {
    switch (parseInt(data.code)) {
        case 0:
            success && success(data);
            break;
        case 10101: //缺参
            util.errorToast('参数缺失');
            break;
        case 10304: //token过期
            util.errorToast('登录信息已过期,请重新登录');
            break;
        default:
            util.errorToast(data.msg);
            break;
    }
}
// 请求方法
/**
 ** key：接口名
 ** data: 参数
 ** option: 配置
 ** success: 成功的回调函数
 ** fail：失败的回调函数
 ** todo: 自定义接口调用成功的状态码判断方法(delete)
 **/
function request(key, data, option, success, fail) {
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
            'X-Token': wx.getStorageSync('token')
        },
        success: function(res) {
            codeCheck(res.data, success, fail);
            wx.hideLoading();
        },
        fail: function(err) {
            console.log(err);
            wx.hideLoading();
            util.errorToast('系统出错');
        }
    })
}
Request = {
    OPTIONS,
    request
}
module.exports = Request;
