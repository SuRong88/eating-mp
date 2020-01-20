const Req = require('./utils/request.js');
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // this.checkNetwork()
    },
    globalData: {
        userInfo: null,
        planInfo: null //定制计划用户选择信息 
    },
    // 用户授权登录
    userLogin: function(cb_ok) {
        wx.login({
            success: res1 => {
                wx.getUserInfo({
                    success: res2 => {
                        let userInfo = res2.userInfo
                        this.globalData.userInfo = userInfo
                        Req.request('login', {
                            code: res1.code,
                            channel_id: '',
                            spread: '',
                            nickname: userInfo.nickName,
                            headimgurl: userInfo.avatarUrl
                        }, {
                            method: 'post'
                        }, (res) => {
                            cb_ok && cb_ok(res)
                            console.log(res)
                            wx.setStorageSync('token', res.data.token)
                        }, (err) => {
                            console.log(err);
                        })
                    }
                })
            },
            fail: err => {
                wx.showModal({
                    title: '提示',
                    content: '登录失败,请重试',
                    showCancel: false,
                    confirmColor: '#CA9700',
                })
            }
        })
    },
    // 判断有没有授权
    checkAuthorize: function(cb_ok, cb_err) {
        if (!wx.getStorageSync('token')) {
            console.log('token缺失');
            return cb_err()
        }
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已授权
                    console.log('已授权');
                    cb_ok && cb_ok();
                } else {
                    // 未授权
                    console.log('未授权');
                    cb_err && cb_err();
                }
            },
        })
    },
    // 检查网络状态(待测)
    checkNetwork: function(cb_ok) {
        wx.getNetworkType({
            success(res) {
                const networkType = res.networkType
                console.log(networkType);
                if (networkType == 'none') {
                    wx.showModal({
                        title: '提示',
                        content: '请检查网络设置',
                        showCancel: false,
                        cancelColor: '#000000',
                        confirmColor: '#CA9700',
                    })
                } else {
                    cb_ok && cb_ok()
                }
            }
        })
    },
    //获取系统信息
    getSystemInfo: function() {
        if (!this.globalData.sys) {
            this.globalData.sys = wx.getSystemInfoSync();
        }
        return this.globalData.sys;
    },
    // 获取 e.currentTarget.dataset 某个key值
    dataset: function(e, key) {
        return e.currentTarget.dataset[key];
    },
    //小程序支付接口
    wxpay: function(inf, success, fail) {
        console.log('***支付数据***', inf);
        wx.requestPayment({
            timeStamp: inf.timeStamp,
            nonceStr: inf.nonceStr,
            package: inf['package'],
            signType: 'MD5',
            paySign: inf.paySign,
            success: function(res) {
                console.log(res);
                if (res.errMsg == "requestPayment:ok") {
                    typeof success === 'function' && success(res);
                }
            },
            fail: function(res) {
                console.log(res);
                var tips = res.err_desc || res.errMsg;
                if (!/cancel/.test(res.errMsg)) {
                    return (typeof fail === 'function' && fail(res));
                }
                typeof fail === 'function' && fail(res);
            }
        });
    }
})
