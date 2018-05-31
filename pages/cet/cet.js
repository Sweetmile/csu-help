var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGrade: false,
    grades: [],
    xh: "",
    
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    let that = this;
    that.setData({
      showGrade: wx.getStorageSync("course_shedule"),
    })
    if (wx.getStorageSync("course_shedule")) {
      util.request(api.miniEsInfo, {}, 'GET').then(function (res) {
        if (res.code === "200" && res.data != null) {
          that.setData({
            xh: res.data.schoolNum,
            name: res.data.name
          });
          that.cetSearch();
        }
      })
    }
    
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
  xhInput: function (e) {

    this.setData({
      xh: e.detail.value
    });
  },
  nameInput: function (e) {

    this.setData({
      name: e.detail.value
    });
  },
  cetSearch: function () {
    let that = this;
    var _xh = that.data.xh;
    var _name = that.data.name;
    util.request(api.miniCetGrades, {'xh': _xh, 'name' : _name}, 'POST').then(function (res) {
      if (res.code === "200" && res.data != null) {
        that.setData({
          grades: res.data,
          showGrade: true
        })
        if (res.data.length < 1) {
          util.showModal("未能获取成绩");
        }
      } else {
        util.showModal(res.message);
      }
    })
  }
})