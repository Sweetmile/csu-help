var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: 1,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    courses: [
      
    ]
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
    if (!wx.getStorageSync("course_shedule")) {
      util.showModal("未绑定教务系统");
    } else {
      var shedule = wx.getStorageSync("course_shedule");
      var _course = this.getCourses(shedule);
      that.setData({
        week: shedule.week,
        courses: _course,
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
  selectWeek: function(e) {
    let that = this;
    if (!wx.getStorageSync("course_shedule")) {
      util.showModal("未绑定教务系统");
      return;
    }
    var week = parseInt(e.detail.value) + 1;
    util.request(api.miniEsSchedule, { 'week': week}, 'GET').then(function (res) {
      if (res.code === "200") {
        var shedule = res.data;
        var _course = that.getCourses(shedule);
        that.setData({
          week: res.data.week,
          courses: that.getCourses(res.data),
        })
      } else {
        util.showModal(res.message);
      }
    })
  },
  showCardView: function(e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
      wx.showActionSheet({
        itemList: [
          "课程：" + this.data.courses[index].name, 
          "教师：" + this.data.courses[index].teacherName, 
          "教室：" + this.data.courses[index].classroom,
          "时间：" + this.data.courses[index].beginTime + "-" +
          this.data.courses[index].endTime 
        ],
      });
  },
  getCourses: function(schedule) {
    var result = [];
    result = result.concat(this.getDayCourses(schedule.monday, 1));
    result = result.concat(this.getDayCourses(schedule.tuesday, 2));
    result = result.concat(this.getDayCourses(schedule.wednesday, 3));
    result = result.concat(this.getDayCourses(schedule.thursday, 4));
    result = result.concat(this.getDayCourses(schedule.friday, 5));
    result = result.concat(this.getDayCourses(schedule.saturday, 6));
    result = result.concat(this.getDayCourses(schedule.sunday, 7));
    return result;
  },
  getDayCourses: function(day, weekday) {
    var result = [];
    var i;
    for (i = 0; i < day.length; i++) {
      result[i] = {
        week: weekday,
        begin: this.getCourseTime(day[i].beginTime),
        end: this.getCourseTime(day[i].endTime),
        name: day[i].courseName,
        classroom: day[i].classRoom,
        teacherName: day[i].teacherName,
        beginTime: day[i].beginTime,
        endTime: day[i].endTime,
      };
    } 
    return result;
  },
  getCourseTime: function(time) {
    switch (time) {
      case "08:00":
        return 1;
        break;
      case "08:45":
        return 1;
        break;
      case "08:55":
        return 2;
        break;
      case "09:40":
        return 2;
        break;
      case "10:00":
        return 3;
        break;
      case "10:45":
        return 3;
        break;
      case "10:55":
        return 4;
        break;
      case "11:40":
        return 4;
        break;
      case "14:00":
        return 5;
        break;
      case "14:45":
        return 5;
        break;
      case "14:55":
        return 6;
        break;
      case "15:40":
        return 6;
        break;
      case "16:00":
        return 7;
        break;
      case "16:45":
        return 7;
        break;
      case "16:55":
        return 8;
        break;
      case "17:40":
        return 8;
        break;
      case "19:00":
        return 9;
        break;
      case "19:45":
        return 9;
        break;
      case "19:55":
        return 10;
        break;
      case "20:40":
        return 10;
        break;
  }
  },
})