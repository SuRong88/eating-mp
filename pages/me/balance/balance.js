const app = getApp();
const formcheck = require('../../../utils/formcheck.js');
const util = require('../../../utils/util.js');
const base = require('../../../utils/base.js');
var VM = {
    data: {
      
    }
}
VM.init = function(type) {
    // 设置自定义头部
    util.setHeader(this);
}

VM.onLoad = function(query) {
    this.init(query)
}

Page(VM)