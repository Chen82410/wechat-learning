import {URL_DEFAULT, URL_SETIN, URL_SUBMIT} from './global.js'

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
    account: '17610992252'
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
 *点赞/取消点赞
 *
 * @export
 * @param {*} item
 */
export function favor(item) {
  const url = URL_SETIN
  const data = Object.assign({}, {
    content: 'zone_favor',
    flag: item.is_my_favor ? 0 : 1,
    content_id: item.content_id,
    type: 0,
    account: '17610992252'
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
          reject(res.data)
        }
      },
      fail: err => {
        reject('网络错误!')
      }
    })
  })
}


/**
 *获取帖子详情
 *
 * @export
 * @param {*} key 帖子id
 * @returns
 */
export function getInvitationDetails(key) {
  const url = URL_DEFAULT
  const data = Object.assign({}, {
    content: 'zone_topic_ex',
    key: key,
    account: '17610992252'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      success: res => {
        if (res.statusCode === 200)
          resolve(res.data)
        else
          reject(res.data.info)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    })
  })
}


export function submitUserContent(body, contentId, stuId, replyTo) {
  const url = URL_SUBMIT
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {
        content: 'zone_reply',
        data: JSON.stringify({
                body: body,
                content_id: contentId,
                stu_id: stuId,
                reply_to: replyTo,
                rel_reply_id: null,
                account: '17610992252'
              })
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.statusCode === 200) 
          resolve(res.data)
        else 
          reject(res.data.info)
      },
      fail: err => {
        console.log(err)
        reject(err)
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
    account: '17610992252'
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
