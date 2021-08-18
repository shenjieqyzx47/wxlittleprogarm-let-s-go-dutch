// app.js
App({
  onLaunch() {
    
    //云数据库初始化
    wx.cloud.init({
      env:"cloud1-9gdo7y2lc5fa06a2"
    })
  },
  globalData: {
    userInfo: null
  }
})
