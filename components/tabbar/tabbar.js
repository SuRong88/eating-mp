const app = getApp();
const formcheck = require('../../utils/formcheck.js');
const base = require('../../utils/base.js');
const util = require('../../utils/util.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 标题
        tabbarIndex: {
            type: Number,
            value: 0
        },
        // 引用该组件传入的tabbar样式
        cln: {
            type: String,
            value: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tabbarList: [{
                "pagePath": "/pages/index/index",
                "text": "计划",
                "iconPath": "/images/tab_icon01.png",
                "selectedIconPath": "/images/tab_icon01_sel.png"
            },
            {
                "pagePath": "/pages/order/order",
                "text": "订单",
                "iconPath": "/images/tab_icon02.png",
                "selectedIconPath": "/images/tab_icon02_sel.png"
            },
            {
                "pagePath": "/pages/me/index/index",
                "text": "我的",
                "iconPath": "/images/tab_icon03.png",
                "selectedIconPath": "/images/tab_icon03_sel.png"
            },
            // {
            //     "pagePath": "/pages/test/test",
            //     "text": "测试页",
            //     "iconPath": "/images/tab_icon01.png",
            //     "selectedIconPath": "/images/tab_icon01_sel.png"
            // }
        ]
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    lifetimes: {
        attached: function() {
            // 不箭头函数 this指向该组件实例?
            base.onLoad(this);
        },
        moved: function() {},
        detached: function() {},
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function() {},

    // 组件所在页面的生命周期函数
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {},
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})
