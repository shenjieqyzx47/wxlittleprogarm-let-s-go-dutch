// index.js
// 获取应用实例
const app = getApp()
const appId = 'wxa432e2765fe1939e'
const appSecret = 'ac53e90451aa4c7733bd8f14c2bf30c5'
const db = wx.cloud.database()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userOpenID:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
      }
    })
    this.getOpenId()
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  aa:function(){
    var that = this
    let userOpenID = this.data.userOpenID;
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        res.userInfo['userOpenID']= userOpenID,
        that.setData({
          userInfo : {...res.userInfo}
        }),
        // db.collection("Users").add({
        //   data: {
        //     userInfo: this.data.userInfo
        //   }
        // })
        this.getCloudUserInfo();
      }
    })
  },

  getCloudUserInfo: function(){
    var userOpenID = this.data.userOpenID;
    db.collection("Users").where({_openid:userOpenID}).get().then(res => {
      console.log(res.data[0].userInfo)
    })
  },

  getOpenId: function() {  // 获取用户的唯一标识
    var that = this
    wx.login({
      success(res){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid: appId,
            secret: appSecret,
            js_code: res.code,
            grant_type:'authorization_code'
          },
          method:"GET",
          success(res){
              that.setData({
                userOpenID: res.data.openid
              })
          }
        })
      }
    })
  }
})
