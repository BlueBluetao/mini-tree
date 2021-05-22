// components/toast.js
const app = getApp();
import { wxRequest } from '../../utils/request.js'
import regeneratorRuntime from '../../utils/runtime.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    getType: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          if (newVal =='filter'){
            this.getlabels()
          }
          if (newVal == 'mobile') {
            this.setData({
              phone:wx.getStorageSync('userInfo').mobile
            })
          }
        }
      }
    },
    infoId:{
      //消息id
      type: Number,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          
        }
      }
    },
    otherId: {
      //评价时对方id
      type: Number,
      value: null,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    isSchool:null,//校内外
    label:null,//标签
    money:null,//课酬
    evaluateStart: null,
    evaluateEnd:null,
    schools:["校内","校外"],
    labels:[],
    moneys:[
      "0-3000",
      "3001-5000",
      "5000-10000",
      "10000以上"
    ],
    content:"",//评论内容
    phone:"",
    code:"",
    timer:null,
    time:60
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 显示遮罩层
    toggle(e) {
      if (this.data.getType == 'mobileBind') {
        this.setData({
          showModal: e
        })
        return
      }      
      if (this.data.getType =='comment'){
        wx.showTabBar()
      }
      this.setData({
        showModal: !this.data.showModal
      })
      
    },
    async commentIt(){
      if (this.data.content==""){
        wx.showToast({
          icon:'none',
          title: '请输入评论内容'
        })
      }

      this.triggerEvent('refreshList', this.data.content)
      
    },
    addOne(){
      this.triggerEvent('addOne')
    },
    async getlabels(){
      await wxRequest('/app/teacher/common/teachers/label/list').then((res) => {
        this.setData({
          labels: res.value.list
        })
      })
    },
    filterFn(e){
      let type = e.currentTarget.dataset.type
      let choose = e.currentTarget.dataset.choose
      if(type==1){
        this.setData({
          isSchool:choose
        })
      }else if(type==2){
        this.setData({
          label: choose
        })
      }else{
        this.setData({
          money: choose
        })
      }
    },
    bindKeyInput(e) {
      let type = e.currentTarget.dataset.type
      if(type==1){
        this.setData({
          evaluateStart: e.detail.value
        })
      }else if(type==2){
        this.setData({
          evaluateEnd: e.detail.value
        })
      }else if(type=='content'){
        this.setData({
          content: e.detail.value
        })
      } else if (type == 'phone') {
        this.setData({
          phone: e.detail.value
        })
      }else if(type=='code'){
        this.setData({
          code: e.detail.value
        })
      }
    },
    reset(){
      this.setData({
        isSchool: null,//校内外
        label: null,//标签
        money: null,//课酬
        evaluateStart: null,
        evaluateEnd: null,
      })
    },
    comfirmFilter(){
      let obj={}
      if (this.data.isSchool) obj.isSchool = this.data.isSchool
      if (this.data.label) obj.label = this.data.label
      if (this.data.money) obj.money = this.data.money
      if (this.data.evaluateStart) obj.evaluateStart = this.data.evaluateStart
      if (this.data.evaluateEnd) obj.evaluateEnd = this.data.evaluateEnd
      this.triggerEvent('filterFn',obj)
    },
    async getCode(){
      await wxRequest('/app/course/user/getCode',{
        data:{
          mobile: this.data.phone
        }
      }).then((res) => {
        let timer = setInterval(() => {
          let t = this.data.time
          if (t == 0) {
            clearInterval(this.data.timer)
            this.setData({
              timer: null
            })
            return
          }
          if (t < 10 && t > 1) {
            this.setData({
              time: '0' + (t - 1)
            })
          } else {
            this.setData({
              time: t - 1
            })
          }
        }, 1000)
        this.setData({
          timer: timer
        })
      })
    },
    async bindPhone() {
      clearInterval(this.data.timer)
      this.setData({
        timer: null
      })
      if (this.data.phone==""){
        wx.showToast({
          title: '请填写手机号',
          icon:'none'
        })
        return
      }
      if (this.data.code == "") {
        wx.showToast({
          title: '请填写验证码',
          icon: 'none'
        })
        return
      }
      await wxRequest('/app/course/user/updateMobile', {
        data: {
          mobile: this.data.phone,
          code: this.data.code
        }
      }).then((res) => {
        if(res){
          wx.showToast({
            title: '绑定成功',
            icon: 'none'
          })
          if(res.value){
            wx.setStorageSync('token', res.value)
          }
          setTimeout(()=>{
            app.whoami(1)
          })
        }
      })
    },
    mobileBind(){
      wx.navigateTo({
        url: '/pages/mine/set/set?showModal=true',
      })
    }
  }
})
