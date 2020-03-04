const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
const Req = require('../../../utils/request.js');
var VM = {
    data: {
        // 
        headerTitle: '定制计划-地址',
        // 地图选中 地址
        address01: "",
        // 选中地址经纬度
        address01Lat: '',
        address01Lng: '',
        // 手填地址 楼层 公司
        address02: "",
        // "完成"按钮 可否点击
        disabled: true,
        // 地址超出范围
        addressOver: false,
        // 输入校验不通过
        disabled: true,
        // 是否已提交过邀约
        isInvited: false
    }
}
VM.init = function(query) {
    // 设置自定义头部
    util.setHeader(this);
}
// 完成
VM.submitHandle = function() {
    // 校验
    if (this.data.disabled) {
        return util.Toast('请完善地址信息')
    }
    let planInfo = app.globalData.planInfo
    if (!planInfo) {
        return util.Toast('送餐计划参数缺失')
    }
    // 提交
    let data = this.data
    Req.request('planning', {
        date: planInfo.date,
        service_time: planInfo.service_time,
        weight: planInfo.weight,
        is_spicy: planInfo.is_spicy,
        phone: planInfo.phone,
        place: data.address01,
        address: data.address02,
        location: data.address01Lat + ',' + data.address01Lng
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('提交成功',1500)
        setTimeout(()=>{
            wx.redirectTo({
                url: '/pages/plan/complete/complete?type=custom',
            })    
        },1500)
    }, (code) => { //特殊参数
        console.log(code);
        if (code == 10329) {
            util.showModal('提示', '地址超出服务范围,请重新选择', false, '', '确定')
            this.setData({
                addressOver: true
            })
        } else {
            util.showModal('提示', '提交失败,请重试', false, '', '确定')
        }
    })
}
// 送餐地址超出范围 提交邀约
VM.submitInvition = function() {
    if (this.data.isInvited) {
        return util.Toast('请不要重复提交')
    }
    let that = this
    Req.request('submitInvition', {
        location: `${that.data.address01Lat},${that.data.address01Lng}`,
        address: `${that.data.address01}|${that.data.address02}`
    }, {
        method: 'post'
    }, (res) => {
        util.successToast('提交成功')
        this.setData({
            isInvited: true
        })
    }, (err) => {
        util.showModal('提示', '提交失败,请重试', false, '', '确定')
    })
}
// 展示地图
VM.showMap = function() {
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
            var latitude = res.latitude
            var longitude = res.longitude
            // wx.openLocation({
            //     latitude: latitude,
            //     longitude: longitude,
            //     scale: 28
            // })
            wx.chooseLocation({
                latitude: latitude,
                longitude: longitude,
                success: (addressObj) => {
                    console.log(addressObj);
                    this.setData({
                        address01: addressObj.address,
                        address01Lat: addressObj.latitude,
                        address01Lng: addressObj.longitude,
                        disabled: this.data.address02 ? false : true
                    })
                },
                // fail: () => { //取消选择地址 并不是调起地图出错
                //     util.showModal('提示', '获取地图失败,请重试', false, '', '确定')
                // }
            })
            console.log(res);
        }
    })

}
// 地图选址
VM.addressHandle01 = function() {
    console.log(1);
    if (this.data.address02) {
        console.log(2);
        this.setData({
            disabled: false
        })
    }
}
// 手动选址
VM.addressHandle02 = function(e) {
    this.setData({
        disabled: (this.data.address01 && e.detail.value) ? false : true,
        address02: e.detail.value
    })
}
VM.onLoad = function(query) {
    this.init(query)
    base.onLoad(this)
}

Page(VM)
