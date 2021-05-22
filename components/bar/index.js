// components/bar/index.js
const App = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		type: {
      type: String,
      value: "search",
      observer: function (newVal, oldVal, changedPath) {
        
      },
		},
	},
	options: {
    addGlobalClass: true
	},
	lifetimes: {
    attached: function() {
			// 在组件实例进入页面节点树时执行
			let menubtn=wx.getMenuButtonBoundingClientRect()
			this.setData({
				navH:App.globalData.navHeight,
				menubtn:menubtn
			})
			
    },
  },
	/**
	 * 组件的初始数据
	 */
	data: {
		navH:0,
		menubtn:{}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})
