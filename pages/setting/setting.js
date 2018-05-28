var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    b_type: 'primary',
    button: '授权',
    disabled: false,
    es_bind: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (app.globalData.hasLogin) {
      that.setData({
        b_type: 'default',
        button: '已授权',
        disabled: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  wxLogin: function (e) {
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    let that = this;
    user.checkLogin().catch(() => {
      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;
        that.setData({
          b_type: 'default',
          button: '已授权',
          disabled: true
        });
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });

    });
  },
  getInfo: function () {
    let that = this;
    util.request(api.miniEsInfo, {}, 'GET').then(function (res) {
      if (res.code === "200" && res.data != null) {
        that.setData({
          es_bind: true,
        })
      }
    })
  },
  esRemove: function(e) {
    if (!e.detail.value) {
      util.request(api.miniEsUnbind, {}, 'GET').then(function (res) {
        if (res.code === "200") {
          wx.removeStorageSync("course_shedule");
        }
        util.showModal(res.message);
      })
    } else {
      util.redirect('/pages/esbind/esbind');
    }
  }
})