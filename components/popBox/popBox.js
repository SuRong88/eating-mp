Component({

    properties: {
        // 这里定义了show属性，属性值可以在组件使用时指定
        show: {
            type: Boolean,
            value: true
        }
    },

    data: {
        // 组件内部数据
    },

    methods: {
        // 弹窗确定事件
        confirmHandle: function() {
            this.triggerEvent('confirm');
            console.log('确定')
        },
        // 弹窗取消事件
        cancelHandle: function() {
            this.triggerEvent('cancel', 'data');
            console.log('取消')
        }
        // _onCollection: function() {
        //     let collected = this.properties.collected;
        //     this.setData({
        //         collected: !collected
        //     })
        //     this.triggerEvent('collected', this.properties.collected);
        // }
    }
})
