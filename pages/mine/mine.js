// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    isAvatarShow: true,
    avatarSrc: '../../assets/common/male_pic@3x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.getUserInfoTap()
    wx.getSavedFileList({
      success: res => {
        // console.log(res)
        if (res.errMsg === "getSavedFileList:ok") {
          that.setData({
            avatarSrc: res.fileList[0].filePath
          })
        }
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
  
  },
  getUserInfoTap: function () {
    let that = this
    wx.getUserInfo({
      success: res => {
        // console.log(res)
        that.setData({
          avatar: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  avatarShowOrHidden: function () {
    this.setData({
      isAvatarShow: !this.data.isAvatarShow
    })
  },
  uploadAvatar() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], 
      success: res => {
        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
          success: res => {
            that.setData({
              avatarSrc: res.savedFilePath
            })
          },
          fail: (err) => {
            console.log(err)
            wx.showToast({
              title: '设置失败!',
              duration: 1000
            })
          }
        })
       
      },
    })
  }
})