import { wxRequest } from './utils/request.js'
import regeneratorRuntime from './utils/runtime.js'
App({
  onLaunch: function (options) {
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
  },
  getToken: async function(pageUrl){
    let that = this
    wx.login({
      success: function (res) {
        const url = '/';
        wx.getUserInfo({
          withCredentials: true,
          success: function (resa) {
            let params = {
              code: res.code,
              data: resa.encryptedData,
              iv: resa.iv
            };
            const shareId = wx.getStorageSync('share') || null;
            if (shareId) {
              params.constructor.assign(params, { sharer: shareId })
            }
            that.authFn(url, params,pageUrl)
          }
        })
      }
    })       
  },
  authFn: async function (url, params,pageUrl) {
    await wxRequest(url, {
      data: params,
      method: 'POST'
    }).then((resp) => {
      if (resp) {
        wx.setStorageSync('token', resp.value.uuid)
        wx.setStorageSync('userInfo', resp.value)
        const pages = getCurrentPages();
        const perpage = pages[pages.length - 1];
        perpage.onLoad();
        if (pageUrl) {
          perpage.tabLogin()
        }
      }
    })
  },
  whoami: async (pageUrl) => {
    
  },
  globalData: {   
    // baseUrl: "http://localhost:8080" ,
    baseUrl: "http://weapp.miaomu0511.cn" ,
  }
})
