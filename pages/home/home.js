// pages/home.js
import {getInvitationList, favor} from '../../common/js/services.js'
import {formatDate} from '../../common/js/utils.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitationLists: [],
    defaultAvatarUrl: '../../assets/common/male_pic@3x.png',
    defaultNickName: 'xueyuan',
    pageNo: 1,
    isHideLoadMore: false,
    favorImgSrc: ['../../assets/home/home_like@3x.png', '../../assets/home/home_like_highlight@3x.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getInvitationlist(this.data.pageNo)
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
    let that = this
    // wx.startPullDownRefresh()
    this.setData({
      pageNo: 1
    })
    getInvitationList(this.data.pageNo)
    .then(res => {
      for (let item of res) {
        if (item.create_time.length > 10) {
          item.create_time = formatDate(item.create_time)
        }
        if (item.body.length > 100) {
          item.body = item.body.slice(0,100)
        }
      }
      that.setData({
        invitationLists: res
      })
      wx.showToast({
        title: '刷新成功',
        duration: 1000
      })
      wx.stopPullDownRefresh()
    })
    .catch(err => {
      wx.showToast({
        title: '网络错误!',
        duration: 1500
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    this.setData({
      isHideLoadMore: true
    })
    this.data.pageNo++
    console.log(this.data.pageNo)
    getInvitationList(this.data.pageNo)
    .then(res => {
      for (let item of res) {
        if (item.create_time.length > 10) {
          item.create_time = formatDate(item.create_time)
        }
        if (item.body.length > 100) {
          item.body = item.body.slice(0,100)
        }
      }
      that.setData({
        invitationLists: that.data.invitationLists.concat(res)
      })
      that.setData({
        isHideLoadMore: false
      })
    })
    .catch(err => {
      wx.showToast({
        title: '网络错误!',
        duration: 1000
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 获取帖子
  _getInvitationlist: function (pageNo) {
    let that = this
    // console.log(getInvitationList(pageNo))
    getInvitationList(pageNo)
    .then(res => {
      console.log(res)
      for (let item of res) {
        if (item.create_time.length > 10) {
          item.create_time = formatDate(item.create_time)
        }
        if (item.body.length > 100) {
          item.body = item.body.slice(0,100)
        }
      }
      that.setData({
        invitationLists: that.data.invitationLists.concat(res)
      })
      console.log(that.data.invitationLists)
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: err,
      })
    })
  },
  // 去往帖子详情页
  toInvitationDetail: function (event) {
    let dataset = event.currentTarget.dataset
    let contentId = dataset.contentId
    wx.navigateTo({
      url: `../invitationDetail/invitationDetail?contentId=${contentId}` 
    })
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
  // 点赞/取消点赞
  reverseFavor: function (event) {
    let that = this
    let dataset = event.currentTarget.dataset
    let item = dataset.item
    let index = dataset.index
    let tempList = that.data.invitationLists
    favor(item)
    .then(res => {
      console.log(res)
      console.log(tempList)
      if (tempList[index].is_my_favor) {//取消点赞
        tempList[index].favor_cnt--
        wx.showToast({
          title: res.retmsg,
          duration: 1000
        })
      } else {
        tempList[index].favor_cnt++
        wx.showToast({
          title: res.retmsg,
          duration: 1000
        })
      }
      tempList[index].is_my_favor = !tempList[index].is_my_favor
      that.setData({
        invitationLists: tempList
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})