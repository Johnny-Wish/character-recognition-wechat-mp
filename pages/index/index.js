Page({

  data: {
    context: null,
    labels: null,
    probs: null,
    fetched: false,
    show: true,
  },

  onLoad: function (options) {
  },

  context: null,

  onReady: function () {
    this.context = wx.createCanvasContext("canvas", this)
    this.context.setStrokeStyle('#000000')
    this.context.setLineWidth(25)
    this.context.setLineCap("round")
    // this.context.setFillStyle("rgb(0, 0, 0)")
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  },

  touchStart: function(event) {
    this.context.setStrokeStyle('#000000')
    this.context.setLineWidth(25)
    this.context.setLineCap("round")
    this.context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y)
  },

  touchMove: function(event){
    this.context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y)
    this.context.stroke()
    this.context.draw(true)
    this.context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y)
  },

  touchEnd: function (event) {
    this.context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y)
    this.context.stroke()
    this.context.draw(true)
  },

  btnClear: function() {
    console.log("---btnClear---")
    this.context.clearRect(0,0,0,0)
    this.context.draw()
    this.setData({
      context: this.context,
      probs: null,
      labels: null,
    })
  },

  btnSubmit: function() {
    console.log("---btnSubmit---")
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: 'png',
      destWidth: 28,
      destHeight: 28,
      success: function(res) {
        console.log("----toTempFileSuccesss----")
        console.log(res)
        let tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: 'https://www.floydlabs.com/serve/wish1104/projects/character-recognition',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            console.log("upload success")
            let result = JSON.parse(res.data)
            that.setData(result)
            that.setData({fetched: true})
          },
          fail(res) {
            console.log("upload failure")
            console.log(res)
          },
          complete(res) {
            console.log("upload complete")
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log("----toTempFileFail----")
      },
      complete: function (res) {
        console.log("----toTempFileComplete----")
        console.log(res)
      },
    }, this)
  },

  btnHide: function(){
    this.setData({
      show: !this.data.show
    })
  }

})