// pages/addActivityPage/addActivityPage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventID:"",
    activityName:"",
    costamount:"",
    description:"",
    date:"",
    time:"",
    activityCategory:"",
    activityCategoryArray : ["饮食","住宿","交通","门票","其他"]
  },

  onDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  onTimeChange: function(e){
    this.setData({
      time: e.detail.value
    })
  },

  onCategoryChange: function(e){
    console.log(this.data.activityCategoryArray)
    console.log(e)
    this.setData({
      activityCategory: this.data.activityCategoryArray[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      eventID: options.id
    })
  },


  submit: function(e){
    var that = this
    console.log(this.data)
    const {activityName, costamount,description,date,time} = e.detail.value
    //check required input
    if (activityName.trim() !== '' && costamount.trim() !== '' && this.data.activityCategory.trim() !== ''){
      that.setData({
        activityName:activityName,
        costamount: costamount,
        description: description,
        date: date,
        time: time
      })
      db.collection('Activities').add({
        data: {
          ...this.data
        }
      })
    }
    else {
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请填写必要内容'
      })
    }
  }
})