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

function outExpireTime(time) {
  var date = new Date();
  var expireDate = new Date( time[0] + "-" + time[1] + "-" + time[2] + " " + time[3] + ":" + time[4] + ":" + time[5] );
  return date.valueOf() - expireDate.valueOf() > 0;
}

function getCourse(day) {
  if (!wx.getStorageSync("course_shedule")) {
    return []
  }
  var shedule = wx.getStorageSync("course_shedule");
  switch(day) {
    case 0:
      return shedule.sunday;
      break;
    case 1:
      return shedule.monday;
      break;
    case 2:
      return shedule.tuesday;
      break;
    case 3:
      return shedule.wednesday;
      break;
    case 4:
      return shedule.thursday;
      break;
    case 5:
      return shedule.friday;
      break;
    case 6:
      return shedule.saturday;
      break;
  }
}

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
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
    showModal,
    outExpireTime,
    getCourse,
    sleep
}


