var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xh: '',
    pwd: '',
    binded: false,
    bind_xh: '',
    bind_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
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
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });

    });
    if (app.globalData.hasLogin) {
      util.request(api.miniEsBind, { xh: that.data.xh, pwd: that.data.pwd }, 'POST').then(function (res) {
        if (res.code === "200") {
          that.getInfo();
        }
        util.showModal(res.message);
      })
    }
  },

  xhInput: function (e) {

    this.setData({
      xh: e.detail.value
    });
  },
  pwdInput: function (e) {

    this.setData({
      pwd: e.detail.value
    });
  },
  getInfo: function() {
    let that = this;
    util.request(api.miniEsInfo, {}, 'GET').then(function (res) {
      if (res.code === "200" && res.data != null) {
        that.setData({
          binded: true,
          bind_xh: res.data.schoolNum,
          bind_name: res.data.name
        })
      }
    })
  }
})