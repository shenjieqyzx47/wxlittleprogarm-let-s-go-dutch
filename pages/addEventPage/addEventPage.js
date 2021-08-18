// pages/addEventPage/addEventPage.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    eventName: "",
    eventDescription: "",
    date:"",
    activities:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前日期
    var date = new Date()
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var seperator = "-";
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
   }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate
    this.setData({date: nowDate})
  },

  submit: function(e){
    console.log(e.detail.value);
    const {eventName, eventDescription} = e.detail.value
    console.log(eventName,eventDescription)
    this.setData({
      eventName : eventName,
      eventDescription: eventDescription,
    })
    if (!this.data.id){
      if (eventName.trim() !== "" || eventDescription.trim() !== ""){
        console.log("写入云数据库")
        db.collection("Events").add({
          data: {
            eventName : this.data.eventName,
            eventDescription: this.data.eventDescription
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
    else {
      console.log("更新云数据库")
    }
  },

  onDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  }
})