var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();

Page({
    data: {
        has_login: false,
        es_bind: false,
        err_message: "error",
        line: [1, 2],
        line_item: [1, 2, 3],
        line_size: 3,
        has_course: false,
        courses: [],
        list: [
            {
                id: "schedule",
                icon: "/static/icon/index/schedule.png",
                page: "/page/schedule/schedule",
                name: "课程表"
            },
            {
                id: "grade",
                icon: "/static/icon/index/grade.png",
                page: "/page/grade/grade",
                name: "成绩"
            },
            {
                id: "cet",
                icon: "/static/icon/index/cet.png",
                page: "/page/cet/cet",
                name: "CET"
            },
            {
                id: "exam",
                icon: "/static/icon/index/exam.png",
                page: "/page/exam/exam",
                name: "考试安排"
            },
            {
                id: "classroom",
                icon: "/static/icon/index/classroom.png",
                page: "/page/classroom/classroom",
                name: "自习室"
            },
            {
                id: "bus",
                icon: "/static/icon/index/bus.png",
                page: "/page/bus/bus",
                name: "校车"
            },
        ]
    },
    onReady: function () {
      wx.showLoading({
        title: '加载中',
      });
      setTimeout(function () {
        wx.hideLoading()
      }, 1000);
      util.sleep(1000);
      this.setData({
        has_login: app.globalData.hasLogin,
      });
    },
    onShow: function () {
      // 页面显示
      let that = this;
      if (wx.getStorageSync("course_shedule_date") && wx.getStorageSync("course_shedule_date") <= new Date().getDate()) {
        wx.removeStorageSync("course_shedule");
      }
      if (app.globalData.hasLogin && !wx.getStorageSync("course_shedule")) {
        util.request(api.miniEsSchedule, { }, 'GET').then(function (res) {
          if (res.code === "200") {
            wx.setStorageSync("course_shedule", res.data);
            wx.setStorageSync("course_shedule_date", new Date().getDate())
          }
        })
      }
      var day = new Date().getDay();
      var dayCourse = util.getCourse(day);
      that.setData({
        courses: dayCourse,
        has_course: dayCourse.length > 0
      })
      if (!app.globalData.hasLogin) {
        that.setData({
          err_message: "请前往设置授权登陆哦~",
          es_bind: wx.getStorageSync("course_shedule")
        })
      }

    }
});