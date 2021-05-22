const app = getApp();
Component({
  /**
   * Component properties
   */
  properties: {
    pageUrl: {
      type: String,
      value: 1,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          this.setData({
            pageUrl: newVal
          })
        }
      }
    },
  },
  

  /**
   * Component initial data
   */
  data: {
    showLogin: false,
  },

  /**
   * Component methods
   */
  methods: {
    toggle: function () {
      let userInfo =wx.getStorageSync('userInfo')
      let flag=true
      if(userInfo){
        flag=false
      } else{
        flag=!this.data.showLogin
      }
      this.setData({
        showLogin: flag
      })
    },
    bindGetUserInfo: function () {
      app.getToken(this.data.pageUrl)
    }
    
  }
})
