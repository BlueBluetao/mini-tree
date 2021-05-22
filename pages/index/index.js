// pages/index/index.js
const App = getApp();
import { wxRequest } from '../../utils/request.js'
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * Page initial data
   */
  data: {
    tabs:[],
    listType:0,
    start:1,
    hasInfo:false,
    userInfo:null,
    modelType:'mobileBind',
    navH:40,
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      navH:App.globalData.navHeight
    })  
    this.getTagList()
    // this.getList()

    // let that = this
    // let loginStatus = wx.getStorageSync('token') || null;
    // if (loginStatus) {
    //   this.setData({
    //     userInfo: wx.getStorageSync('userInfo')
    //   })
    // } else {
    //   wx.getSetting({
    //     success(res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         app.getToken(1)
    //         setTimeout(() => {
    //           this.setData({
    //             userInfo: wx.getStorageSync('userInfo')
    //           })
    //         }, 1000)
    //       } else {
    //         that.tabLogin()
    //       }
    //     }
    //   })
    // }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

   
  },

  async getTagList(){
    await wxRequest('/tag/list',{}).then((res) => {
      if (res) {
        // console.log(res)
        if(res.success == true) {
            this.setData({
              tabs:res.data
            })
        }
      }
    })
  },

  async getList(){
    await wxRequest('/shop/list',{
      data:{
        type:this.data.listType
      }
    }).then((res) => {
      if (res) {
        console.log(res)
      }
    })
  },
  chooseTab(e){
    let item=e.currentTarget.dataset.item
    console.log(item, '当前切换到的tag-id')
    if(item!=this.data.listType){
      this.setData({
        listType:item
      })

      // this.selectComponent('#list').clear()
      this.selectComponent('#list').getList(true)
    }
  },
  tabLogin() {
    this.selectComponent('#showLogin').toggle()
  },
  toTeacher(){
    if (!wx.getStorageSync('userInfo')) {
      this.tabLogin()
      return
    }
    wx.navigateTo({
      url: '/pages/teacher/index',
    })
  },
  getBanner:async function(){
    let that = this
    // await wxRequest('/app/course/home/list',{
    //   data: { 
    //     start: that.data.start,
    //     limit: that.data.limit,
    //    }
    // }).then((res)=>{
    //   if (res) {
    //     if (res.value.carousels){
    //       let arr = res.value.carousels
    //       arr = arr.filter(item => {
    //         return item.likeurl != 0 && item.likeurl.indexOf('/course/web/detail') < 0
    //       })
    //       that.setData({
    //         banners: arr,
    //       })
    //     } 
    //   }
    // })
  },
  
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {  

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    // wx.stopBackgroundAudio()
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.setData({
      start:1,
      refreshstatus:true
    })
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    if (this.data.noMore){
      return
    }
    this.setData({
      start: this.data.start+1
     })
     this.selectComponent('#list').getList()
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function (options) {
    // return {
    //   title: '益仓步数宝',
    //   desc: '步数换好礼',
    //   path: '/pages/index/index',
    // }
    
  }
})