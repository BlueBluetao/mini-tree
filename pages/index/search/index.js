// pages/index/search/index.js
const app = getApp();
import { wxRequest } from '../../../utils/request.js'
import regeneratorRuntime from '../../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList:[],
    list:[],
    showResults:false,
    searchName:"",
    start:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHot()
    if (wx.getStorageSync("searchVal")){
      let list = JSON.parse(wx.getStorageSync("searchVal"))
      this.setData({
        list:list
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getHot:async function(){
    let that = this
    await wxRequest('/search/hotlist').then((res) => {
      if (res) {
        if (res.success = true) {
          that.setData({
            hotList: res.data
          })
        }
      }
    })
  },
  confirm:function(e){
   
    let name = e.detail.value
    console.log(name)
    if (name != "" && this.data.list.indexOf(name)<0){
      let arr=[]
      arr.push(name)
      this.setData({
        list: this.data.list.concat(arr),
        searchName: name,
        showResults: true
      })
      wx.setStorageSync("searchVal", JSON.stringify(this.data.list))
    }
  },
  clear:function(){
    wx.clearStorageSync("searchVal")
    this.setData({
      list:[]
    })
  },
  cancle:function(){
    if (this.data.showResults){
      this.setData({
        searchName: "",
        showResults: false
      })
    }else{
      this.setData({
        searchName: ""
      })
    }
  },
  search:function(e){
    let name = e.currentTarget.dataset.name
    if (name!=""){
      this.setData({
        searchName:name,
        showResults:true
      })
    }
  },
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})