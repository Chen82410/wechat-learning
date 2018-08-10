const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// module.exports = {
//   formatTime: formatTime,
//   splitAllData: splitAllData
// }

export const splitAllData = (allData, liveData, reliveData) => {
  const dateNow = new Date().getTime()
  for (let item of allData) {
    // 直播
    if (new Date(item.lesson_time).getTime() > dateNow) {
      liveData.push(item) 
    } else {
      reliveData.push(item)
    }
  }
  console.log(liveData)
  console.log(reliveData)
}

