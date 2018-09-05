// pages/invitationDetail/invitationDetail.js
import { getInvitationDetails, submitUserContent } from '../../common/js/services'
import { formatDate } from '../../common/js/utils.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatarUrl: '../../assets/common/male_pic@3x.png',
    content_id: null,
    // 帖子详情
    invitationDetail: {},
    favorImgSrc: ['../../assets/home/home_like@3x.png', '../../assets/home/home_like_highlight@3x.png'],
    // 提交按钮状态
    btnType: 'default',
    // 用户输入内容
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    this.setData({
      content_id: options.contentId
    })
    getInvitationDetails(this.data.content_id)
    .then(res => {
      console.log(res)
      res.create_time = formatDate(res.create_time)
      that.setData({
        invitationDetail: res
      })
    })
    .catch(err => {
      wx.showToast({
        title: '网络错误!',
        duration: 1500
      })
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
  // 浏览图片
  viewPic: function (event) {
    let that = this
    console.log(event.currentTarget.dataset)
    let dataset = event.currentTarget.dataset
    let picArr = dataset.picArr
    let index = dataset.index
    let tempArr = []
    for (let item of picArr) {
      tempArr.push(`http://36.110.107.219:20002/soekao-web-dist/getcha?content=zone_attach&key=${item.attach_id}&compress=1&account=17610992252&callback=_jp0`)
    }
    wx.previewImage({
      current: tempArr[index],
      urls: tempArr
    })
  },
  // textarea聚焦
  getContent: function (event) {
    // console.log(event.detail.value)
    this.setData({
      content: event.detail.value
    })
    if (event.detail.value.length > 0) {
      this.setData({
        btnType: 'primary'
      })
    } else {
      this.setData({
        btnType: 'default'
      })
    }
  },
  // 提交
  submitMsg: function () {
    let that = this
    let tempObj = this.data.invitationDetail
    if (this.data.content.length > 0) {
      submitUserContent(that.data.content, tempObj.content_id, 2605603, tempObj.stu_id)
      .then(res => {
        that.setData({
          content: '',
          btnType: 'default'
        })
        console.log(res)
        getInvitationDetails(tempObj.content_id)
        .then(res => {
          console.log(res)
          res.create_time = formatDate(res.create_time)
          that.setData({
            invitationDetail: res
          })
        })
        .catch(err => {
          wx.showToast({
            title: '网络错误!',
            duration: 1500
          })
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '网络错误!',
        })
      })
    }
  }
})