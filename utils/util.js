var api = require('../config/api.js');
var app = getApp();

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'X-Chelp-Token': wx.getStorageSync('token').token
            },
            success: function (res) {

                if (res.statusCode === 200) {

                  if (res.statusCode === 401) {
                        // 清除登录相关内容
                        try {
                            wx.removeStorageSync('userInfo');
                            wx.removeStorageSync('token');
                            this.globalData.hasLogin = false;
                        } catch (e) {
                            // Do something when catch error
                        }
                    } else {
                        resolve(res.data);
                    }
                } else {
                    reject(res.errMsg);
                }

            },
            fail: function (err) {
                reject(err)
            }
        })
    });
}

function redirect(url) {

    //判断页面是否需要登录
    if (false) {
        wx.redirectTo({
            url: '/pages/auth/login/login'
        });
        return false;
    } else {
        wx.redirectTo({
            url: url
        });
    }
}

function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/static/icon/dialog_error.png'
    })
}
function showModal(msg) {
  wx.showModal({
    title: '',
    content: msg,
    showCancel: false
  })
}
module.exports = {
    formatTime,
    request,
    redirect,
    showErrorToast,
    showModal
}


