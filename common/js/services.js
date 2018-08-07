import {URL_DEFAULT} from './global.js'

/*
  获取首页帖子
*/ 
export function getInvitationList(pageNo) {
  const url = URL_DEFAULT
  const data = Object.assign({}, {
    content: 'zone_topics_ex',
    page_no: pageNo,
    page_size: 5,
    account: '17610992252'
  })
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: res => {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data.info)
        }
      },
      fail: err => {
        reject('网络错误1')
      }
    })
  })
}