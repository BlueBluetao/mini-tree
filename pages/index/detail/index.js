// pages/index/detail/index.js
import { wxRequest } from '../../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id:null,
		info:{},
		// info:{
		// 	  img:"/assets/1.png",
    //     imgs:["/assets/1.png","/assets/3.jpg","/assets/4.jpg","/assets/5.jpg"],
    //     name:"金牌苗圃",
    //     description:"这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介",
    //     address:"句容市XXX街道XXX号",
		// 		phone:"15288888888",
		// }
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({
			id:options.id
		})
		this.getDetail(options.id)

		
	},

  async getDetail(id){
    await wxRequest('/shop/detail/'+id,{}).then((res) => {
      if (res) {
        // console.log(res)
        if(res.success == true) {
            this.setData({
              info:res.data
            })
        }
      }
    })
  },


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
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