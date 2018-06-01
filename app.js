let util = require('./utils/util.js');
let api = require('./config/api.js');
let user = require('./utils/user.js');

App({
    onshow: function () {
    },
    onLaunch: function (options) {
        user.checkLogin().then(res => {
            this.globalData.hasLogin = true;
        }).catch(() => {
            this.globalData.hasLogin = false;
        });
        wx.reLaunch({
          url: "/pages/home/home"
        });
    },
    globalData: {
        hasLogin: false
    }
})