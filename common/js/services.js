import URL_DEFAULT from './global.js'

/*
  获取首页帖子
*/ 
export function getInvitationList(pageNo, result) {
  const url = URL_DEFAULT
  const data = Object.assign({}, {
    data: {
      content: 'zone_topics_ex',
      page_no: pageNo,
      page_size: 10,
      account: '17610992252'
    }
  })
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: res => {
        result = res.data
        resolve()
      },
      fail: err => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
        reject()
      }
    })
  })
  return promise
}