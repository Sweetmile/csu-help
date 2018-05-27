var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();

Page({
    data: {
        has_login: false,
        err_message: "error",
        line: [1, 2],
        line_item: [1, 2, 3],
        line_size: 3,
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
    onShow: function () {
      // 页面显示
      if (app.globalData.hasLogin) {
        
      } else {
        this.setData({
          err_message: "未绑定教务系统~"
        })
      }

      this.setData({
        has_login: app.globalData.hasLogin,
      });

    }
});