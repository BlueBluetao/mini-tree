// pages/society/society.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list:[{
			img:"/assets/2.jpg",
			title:"蛀虫防治大全",
			desc:"喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药",
			time:"7小时前",
			num:8276,
			url:"https://www.baidu.com"
		},{
			img:"/assets/2.jpg",
			title:"蛀虫防治大全",
			desc:"喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药喷散农药",
			time:"7小时前",
			num:8276,
			url:"https://www.bilibili.com"
		}]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	toDetail(e){
		let url = e.currentTarget.dataset.url
		wx.navigateTo({
			url: '/pages/society/web/index?url='+encodeURIComponent(url),
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