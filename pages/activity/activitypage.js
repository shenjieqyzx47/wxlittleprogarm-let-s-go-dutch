// pages/activity/activitypage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cells: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    var that = this
    db.collection('Activities').doc(options.id).get({
      success: function(res){
        console.log(res.data[0])
        var cells = []
        cells.push({title:'消费标题', text: res.data.activityName})
        cells.push({title:'消费描述', text: res.data.description})
        cells.push({title:'消费金额', text: res.data.costamount})
        that.setData({
          cells: cells
        })
        console.log(that.data.cells)
      }
    })
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

  }
})