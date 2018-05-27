let util = require('./utils/util.js');
let api = require('./config/api.js');
let user = require('./utils/user.js');

App({
    onLaunch: function () {
    },
    onShow: function (options) {
        user.checkLogin().then(res => {
            this.globalData.hasLogin = true;
        }).catch(() => {
            this.globalData.hasLogin = false;
        });
    },
    globalData: {
        hasLogin: false
    }
})