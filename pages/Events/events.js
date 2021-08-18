// pages/Events/events.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventid:"",
    eventName:"",
    eventDescription:"",
    activities:[],
    iconaddress:{
      饮食:'../icons/food.png',
      交通:'../icons/transportation.png',
      门票:'../icons/tickets.png',
      住宿:'../icons/hotel.png',
      其他:'../icons/other.png'
    },
  },

  navigateToAcvitityPage: function(e){
    console.log("aaaaa",e.currentTarget.dataset)
    wx.navigateTo({
      url: '../activity/activitypage?id='+e.currentTarget.dataset.id,
    })
  },

  navigateToAddActivityPage: function(e){
    wx.navigateTo({
      url: '../addActivityPage/addActivityPage?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection("Events").doc(options.id).get().then(res => {
      that.setData({
        eventid:res.data._id,
        eventName: res.data.eventName,
        eventDescription: res.data.eventDescription
      })
    }),
    wx.setNavigationBarTitle({
      title: that.data.eventName,
    }),
    db.collection('Activities').where({eventID:options.id}).get({
      success: function(e){
        console.log(e.data)
        let activities = that.data.activities
        activities = e.data
        that.setData({activities})
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