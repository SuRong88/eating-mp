const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const util = require('../../utils/util.js');
const base = require('../../utils/base.js');
const Req = require('../../utils/request.js');
var VM = {
    data: {
        showWelcome: false,
        noPlan: true,
        spicyArr: ['从不吃辣', '偶尔吃辣', '可常吃辣'],
        // inf
        dayArr: [],
        service_time: [],
        weight: '',
        weight_show: '',
        is_spicy: 1, // 1-从不吃辣 2-偶尔吃辣 3-可常吃辣
        is_spicy_show: ''
    }
}
VM.init = function() {
    // 设置自定义头部
    util.setHeader(this);
    // 首次使用 展示welcome弹窗
    !wx.getStorageSync('welcome') && this.setData({
        showWelcome: true
    })
    Req.request('indexPlanning', null, {
        method: 'get'
    }, (res) => {
        console.log(res);
        // 已有计划
        if (res.data) {
            let data = res.data
            let dayArr = []
            data.date.forEach((item) => {
                dayArr.push("周" + "一二三四五".charAt(item - 1))
            })
            this.setData({
                noPlan: false,
                dayArr: dayArr,
                service_time: data.service_time,
                weight: data.weight,
                weight_show: data.weight_show,
                is_spicy_show: data.is_spicy_show
            })
        }
    }, (err) => {

    })
}
VM.onLoad = function(query) {
    this.init()
    base.onLoad(this)
}
VM.closeWelcome = function() {
    this.setData({
        showWelcome: false
    })
    wx.setStorageSync('welcome', 'isShow')
}
// 根据日期 获取星期 例如：2019-4-25
VM.getWeekDay = function(val) {
    let isNull = function(val) {
        if (val == null || typeof val == "undefined") {
            return true;
        }
        return false;
    };
    let date;
    if (isNull(val)) {
        date = new Date();
    } else {
        var dateArray = val.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    return val = "周" + "日一二三四五六".charAt(date.getDay());
}
VM.onReady = function() {

}

VM.onShow = function() {
    // test
    // console.log(this.getWeekDay('2020-01-17'));
    // let data = {
    //     date:[1,3,5]
    // }
    // let dayArr = []
    // data.date.forEach((item) => {
    //     dayArr.push("周" + "一二三四五".charAt(item - 1))
    // })
    // console.log(dayArr);
}

VM.onHide = function() {

}

VM.onUnload = function() {

}

VM.onPullDownRefresh = function() {

}

VM.onReachBottom = function() {

}
VM.onShareAppMessage = function() {
    return {
        title: "正经一餐",
        path: '/pages/index/index',
        imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    };
}
Page(VM)
