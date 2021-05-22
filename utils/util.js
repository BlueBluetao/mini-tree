const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return year+'年'+month+'月'+day+'日'
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
const requestPromise = (url, params, type, header) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: getApp().globalData.baseUrl +url,
      data: params,
      method: type,
      header: {
        'uuid': wx.getStorageSync('token') || null,
        'content-type': 'application/json'
      },
      success: function (resp) {
        resolve(resp);
      }
    })
  })
}

const getMath = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  formatTime: formatTime,
  getMath: getMath,
  requestPromise: requestPromise
}
