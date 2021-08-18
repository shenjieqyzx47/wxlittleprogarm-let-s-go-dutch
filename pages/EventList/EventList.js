// pages/EventList/EventList.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  //点击跳转到event详情页
  goToEventPage : function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Events/events?id='+e.currentTarget.dataset.id,
    })
  },

  //点击跳转到新增event页
  goToAddEventPage : function(){
    wx.navigateTo({
      url: '../addEventPage/addEventPage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('Events').get({
      success: function(res) {
        // res.data 包含该记录的数据
        let list = that.data.list
        list = res.data
        that.setData({list})
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