// pages/grade/grade.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    semesters:[],
    grades: [],
    select_index: 0
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
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var i = 0;
    var semesterInit = [];
    var semIndex = 0;
    for (i = year; i > 2012; i--) {
      if (i == year && month > 6) {
        semesterInit[semIndex++] = year + "-" + (year + 1) + "-1";
      }
      semesterInit[semIndex++] = (i - 1) + "-" + i + "-2";
      semesterInit[semIndex++] = (i - 1) + "-" + i + "-1";
    }
    that.setData({
      semesters : semesterInit,
    })
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
  selectSemester: function (e) {
    let that = this;
    var semester = that.data.semesters[parseInt(e.detail.value)];
    util.request(api.miniEsGrades, { 'semester': semester }, 'GET').then(function (res) {
      if (res.code === "200") {
        var _grades = res.data;
        that.setData({
          grades: _grades,
          select_index: parseInt(e.detail.value)
        })
      } else {
        util.showModal(res.message);
      }
    })
  }
})