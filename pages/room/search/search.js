let util = require('../../../utils/util.js');
let api = require('../../../config/api.js');
let user = require('../../../utils/user.js');
let building = require('../../../config/building.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_building: [],
    show_campus: [],
    show_time: ["1-2", "3-4", "5-6", "7-8", "晚上"],
    campus_index: -1,
    build_index: -1,
    time:["0102", "0304", "0506", "0708", "night"],
    time_index: -1
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
    var campus = building.campus;
    var i = 0;
    let that = this;
    var _campus = [];
    for(i = 0; i < campus.length; i++) {
      _campus[i] = campus[i].xqmc;
    }
    that.setData({
      show_campus: _campus
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
  bindCampusChange: function (e) {
    var build;
    this.setData({
      campus_index: e.detail.value,
    })
    var buildings = building.building;
    var i = 0;
    var _building = [];
    for (i = 0; i < buildings[e.detail.value].length; i++) {
      _building[i] = buildings[e.detail.value][i].jzwmc;
    }
    this.setData({
      show_building: _building
    })
  },
  bindBuildChange: function (e) {
    this.setData({
      build_index: e.detail.value,
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_index: e.detail.value,
    })
  },
  search: function () {
    try {
      var campus = building.campus[this.data.campus_index].xqid;
      var build = building.building[this.data.campus_index][this.data.build_index].jzwid;
      var time = this.data.time[this.data.time_index];
      time = time === undefined ? "" : time;
      util.request(api.miniEsRoom, { 'campus': campus, 'build': build, 'time': time }, 'GET').then(function (res) {
        if (res.code === "200") {
          wx.setStorageSync("study_room", res.data);
          wx.navigateTo({
            url: '/pages/room/result/result'
          })
        } else {
          util.showModal(res.message);
        }
      })
    } catch (err) {
      util.showModal("都要选的");
    }
  }
})