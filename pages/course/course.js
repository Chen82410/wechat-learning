import {getCourseType} from '../../common/js/services'
// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCourses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCourseType()
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
  _getCourseType: function () {
    let that = this
    getCourseType()
    .then(res => {
      that.setData({
        allCourses: res
      })
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: '网络错误!',
        duration: 1000 
      })
    })
  },
  toLive: function (event) {
    const productId = event.currentTarget.dataset.productId
    console.log(productId)
    wx.navigateTo({
      url: `../livelist/livelist?productId=${productId}`,
    })
  }
})