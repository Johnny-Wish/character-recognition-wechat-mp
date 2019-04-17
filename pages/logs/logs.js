//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: []
  },
  onShow: function () {
    this.setData({
      logs: app.globalData.connectionLogs,
    })
  }
})
