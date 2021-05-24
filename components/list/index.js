// components/list/index.js
import { wxRequest } from '../../utils/request.js'
let arr=[]
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		listType : {
			type:Number,
			value:0,
			observer: function (newVal, oldVal, changedPath) {
        
      },
		},
		start: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal, changedPath) {
        
      },
		},
		pageIn: {
      type: String,
      value: "index",
      observer: function (newVal, oldVal, changedPath) {
        
      },
		},
		// type:{
		// 	type: String,
    //   value: "热门",
    //   observer: function (newVal, oldVal, changedPath) {
        
    //   },
		// },
		name:{
			type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        // if(oldVal){
				// 	this.setData({
				// 		oldType:oldVal
				// 	})
				// }
      },
		}
	},
	options: {
    addGlobalClass: true
	},
	lifetimes: {
    attached: function() {
			// 在组件实例进入页面节点树时执行
			this.getList(true)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
	/**
	 * 组件的初始数据
	 */
	data: {
		limit:20,
    list:[],
		noMore:false,
		oldType:null
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		async getList(flag){
			arr.map(item=>{
				clearInterval(item)
			})
			if(flag){
				this.setData({
					list:[],
					start:1,
				})
			}
			let obj={
				start:this.data.start,
				limit:this.data.limit,
			}
			if(this.data.pageIn=='index') obj.type=this.data.type
			if(this.data.pageIn=='search') obj.name=this.data.name
			await wxRequest('/shop/list',{
				data:{
					type:this.data.listType,
					keyword:this.data.name
				}
			}).then((res) => {
				if (res) {
					if(res.success == true) {
							this.setData({
									list:res.data
							})
					}
				}
			})

			// this.setData({
			// 	list:[{
			// 		homepage_img:"/assets/1.png",
			// 		imgs:["/assets/1.png","/assets/3.jpg","/assets/4.jpg","/assets/5.jpg"],
			// 		name:"金牌苗圃",
			// 		description:"这个苗圃很好这个苗圃很好这个苗圃很好这个苗圃很好这个苗圃很好是加拿大籍书法家dsadsdsdsfdsfsdf",
			// 		address:"句容市XXX街道XXX号",
			// 		scrollX:0,
			// 	},{
			// 		homepage_img:"/assets/1.png",
			// 		imgs:["/assets/1.png","/assets/3.jpg","/assets/4.jpg","/assets/5.jpg"],
			// 		name:"金牌苗圃",
			// 		description:"这个苗圃很好这个苗圃很好这个苗圃很好这个苗圃很好这个苗圃很好是加拿大籍书法家dsadsdsdsfdsfsdf",
			// 		address:"句容市XXX街道XXX号",
			// 		scrollX:0,
			// 	}]
			// })

				this.data.list.map((item,index)=>{
					if(item.imgs.length>3){
						this.createAn(index)	
					}
				})

		},
		connect(event){
			wx.makePhoneCall({
				phoneNumber: event.currentTarget.dataset.phone,
			})
		},
		toDetail(e){
			console.log(e.currentTarget.dataset.id)
			let id = e.currentTarget.dataset.id
			wx.navigateTo({
				url: '/pages/index/detail/index?id='+id,
			})
		},
		createAn(index){ 
			let that=this
			 arr[index] = setInterval(() => {
				if(that.data.list[index].scrollX>230){
					that.setData({
						[`list[${index}].imgs`]:that.data.list[index].imgs.concat(that.data.list[index].imgs.shift()),
						[`list[${index}].scrollX`]:0
					})
				}else{
					that.setData({
						[`list[${index}].scrollX`]:that.data.list[index].scrollX+240
					})
				}
			},1000)
		},
	}
})
