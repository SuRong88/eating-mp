const Req = require('./utils/request.js');
const util = require('./utils/util.js');
App({
    onLaunch: function(options) {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 强制更新
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                wx.showLoading({
                    title: '更新中，请稍等',
                    mask: true
                })
                updateManager.onUpdateReady(function() {
                    wx.hideLoading();
                    util.showModal('更新提示', '新版本已下载，点击确定重启应用', false, '', '确定', function() {
                        updateManager.applyUpdate()
                    })
                });
                updateManager.onUpdateFailed(function() {
                    wx.hideLoading();
                    util.showModal('提示', '新版本下载失败，请检查网络重启应用', false, '', '确定')
                });
            }
        })

        let scene = options.scene
        let query = options.query
        
        console.log(query);
        if ([1007, 1008].includes(scene)) {
            console.log('分享进入');
            this.globalData.enterType = 1
            this.globalData.shareId = query.shareId || ''
        } else if ([1047, 1048, 1049].includes(scene)) {
            console.log('扫码进入');
            let  params = decodeURIComponent(query.scene)
            let array = params.split('=')
            console.log(params,array);
            this.globalData.enterType = 2
            // 1.申请打包\配送终端
            if (array[0]=='apply') {
                console.log('申请终端');
                return this.globalData.apply = true
            }
            // 2.进入打包/配送终端
            if (array[0]=='role') {
                console.log('进入终端');
                return this.globalData.role = true
            }
            // 3.用户扫码(推广码)
            console.log('推广二维码');
            this.globalData.spread = array[1] || ''
        } else {
            console.log('普通进入');
            this.globalData.enterType = 3
        }
        console.log('场景值' + options.scene);
        // this.checkNetwork()

        this.checkAuthorize(() => {
            this.globalData.isAbled = true
            wx.getUserInfo({
                success: res => {
                    let userInfo = res.userInfo
                    this.globalData.userInfo = userInfo
                }
            })
        }, () => {
            wx.login({
                success: res1 => {
                    Req.request('login', {
                        code: res1.code,
                        channel_id: this.globalData.shareId,
                        spread: this.globalData.spread,
                    }, {
                        method: 'post'
                    }, (res) => {
                        this.globalData.userType = res.data.action
                        wx.setStorageSync('token', res.data.token)
                    }, (err) => {
                        console.log(err);
                        wx.showModal({
                            title: '提示',
                            content: '系统出错,请重试',
                            showCancel: false,
                            confirmColor: '#CA9700',
                        })
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
        })
    },
    globalData: {
        isAbled: false, //是否已授权
        userInfo: null,
        planInfo: null, //定制计划用户选择信息
        enterType: 3, //1分享进入 2扫码进入 3普通进入
        shareId: '', //推荐人userid
        spread: '', //推广码
        userType: 3, //用户类型 1-新加入的推广用户 2-新加入的推荐用户 3-其他用户
        apply: false, //商家终端角色申请 
        role: false //商家终端角色
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
                            channel_id: this.globalData.shareId,
                            spread: this.globalData.spread,
                            nickname: userInfo.nickName,
                            headimgurl: userInfo.avatarUrl
                        }, {
                            method: 'post'
                        }, (res) => {
                            cb_ok && cb_ok(res)
                            console.log(res)
                            this.globalData.userType = res.data.action
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
