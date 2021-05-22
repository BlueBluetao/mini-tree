// components/imgs/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		imgs: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        if(newVal){
					this.createAn()
				}
      },
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		scrollX:0
	},
	lifetimes:{
		
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		createAn(e){ 
			let that=this
			var timer = setInterval(() => {
				if(that.data.scrollX>230){
					that.setData({
						imgs:that.data.imgs.concat(that.data.imgs.shift()),
						scrollX:0
					})
				}else{
					that.setData({
						scrollX:that.data.scrollX+240
					})
				}
			},1000)
			setTimeout(()=>{
				clearInterval(timer)
			},1000*that.data.imgs.length) 
		},
	}
})
