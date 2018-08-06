// pages/home.js
import getInvitationList from '../../common/js/services.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitationLists: [],
    defaultAvatarUrl: '../../assets/common/male_pic@3x.png',
    defaultNickName: 'xueyuan'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getInvitationlist()
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
  _getInvitationlist: function () {
    // getInvitationList(10, this.data.invitationLists)
    // .then(function (res) {
    //   this.data.invitationLists = res
    // })
    // .catch(err => {
     
    // })
    let that = this
    wx.request({
      url: 'http://36.110.107.219:20002/soekao-web-dist/getcha',
      data: {
        content: 'zone_topics_ex',
        page_no: 1,
        page_size: 10,
        account: '17610992252'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        that.setData({
          invitationLists: res.data
        })
        console.log(that.data.invitationLists)
      },
      fail: function(err) {
        console.log(err)

      }
    })
  }
})