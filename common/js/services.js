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

/**
 *获取专业信息
 *
 * @export
 * @returns
 */
export function getCourseType() {
  const url = URL_DEFAULT
  const data = Object.assign({}, {
    content: 'course_products_ex',
    account: '18618496315'
  })
  return new Promise((resolve, reject) => {
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
        console.log(err)
        reject('网络错误')
      }
    })
  })
}


/**
 *获取直播信息
 *
 * @export
 * @param {*} key product_id
 */
export function getLiveInfo(key) {
  const url = URL_DEFAULT
  const data = Object.assign({}, {
    content: 'course_plan',
    key: key,
    account: '18618496315'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data.info)
        }
      },
      fail: err => {
        console.log(err)
        reject('网络错误')
      }
    })
  })
}

// http://36.110.107.219:20002/soekao-web-dist/getcha?content=course_playback&live_id=153608&nick_name=%E4%B9%9F%E6%9B%BE%E8%B5%B0%E8%BF%87&account=17610992252&callback=__jp3
