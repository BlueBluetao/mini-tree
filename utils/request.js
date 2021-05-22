import regeneratorRuntime from './runtime.js'
const wxRequest = async (url, params = {}) => {
  Object.assign(params, {
    token: wx.getStorageSync('token')
  })
  // 所有的请求，header默认携带token
  let header = params.header || {
    'Content-Type': 'application/json',
    'uuid': params.token || ''
  }
  let data = params.data || {}
  let method = params.method || 'GET'
  // showLoading可以控制是否显示加载状态
  if (params.showLoading) {
    wx.showToast({
      title: '加载中...',
      icon:'none'
    })
  }
  let res = await new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.baseUrl+ url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        if (res && res.data.success) {
          resolve(res.data)
        } else {
          if(params.scan){
            wx.showModal({
              showCancel:false,
              title:res.data.message,
            })
          }else{
            wx.showToast({
              icon:'none',
              title: res.data.message,
              duration:2000
            })
          }
        }
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      },
      complete: (e) => {
        if(e.statusCode==404){
          wx.showToast({
            icon:'none',
            title: '无效链接',
            duration:2000
          })
        }
        // wx.hideLoading()
      }
    })
  })
  return res
}

export  {
  wxRequest
}