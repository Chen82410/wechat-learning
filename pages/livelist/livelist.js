// pages/livelist/livelist.js
import {getLiveInfo} from '../../common/js/services.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData: [],
    liveData: [],
    reliveData: [],
    productId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productId: options.productId
    })
    this._getLiveInfo(this.data.productId)
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
  _getLiveInfo: function (key) {
    let that = this
    getLiveInfo(key)
    .then(res => {
      that.setData({
        allData: res
      })
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: '网络错误!',
        duration: 1000
      })
    })
  },
  toVideo: function (event) {
    wx.navigateTo({
      url: `../learningvideo/learningvideo?${event.currentTarget.dataset.liveId}`,
    })
  }
})