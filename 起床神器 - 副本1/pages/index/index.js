//index.js
//获取应用实例
var util = require("../../utils/util.js");
var app = getApp()
const deviceID ='需要替换'


Page({
  data: {  
    userInfo: {},
    curIpt:"",
    list:[],
    timeArr:[],
    timecha:0,
  },

  onLoad: function () {
    var that =this;
    wx.getStorage({
      key: '起床list',
      success: function(res) {
        if(res.data){
           that.setData({
            list:res.data
          })
        }
      } 
    })

  app.getUserInfo(function(userInfo){
    that.setData({
      userInfo:userInfo
    })
  })
},

iptChange(e){ 
  var that =this;
  let timeArrnow = util.gettime();
  this.setData({
    curIpt:e.detail.value,
    timeArr:timeArrnow,
  })
},

formReset(){
  this.setData({
    curIpt:"",
    timeArr:[],
  })
},
formSubmit(){
  let cnt = this.data.curIpt.split(" "),newLists = this.data.list,nowtime=this.data.timeArr;
  
  if (cnt){
     newLists.push({hour:cnt[0],minute:cnt[1],nowminute:nowtime[1],nowhour:nowtime[0]});
     this.setData({
      list:newLists,
      curIpt:"",
      timeArr:[],
    }) 
  }
},
toDelete(e){
  let i = e.target.dataset.id,newLists = this.data.list;
  newLists.map(function(l,index){
    if (l.id == i){      
      newLists.splice(index,1);
    }
  })   
  this.setData({
      list:newLists
    })
},
saveData(){
  let listsArr = this.data.list;
  wx.setStorage({
    key:'起床list',
    data:listsArr
  })
},

clacha(){
    let beginhour =this.data.timeArr[0],finishhour =this.data.list[-1][1],beginmin =this.data.timeArr[1],finishmin =this.data.list[-1][1]
    if(beginmin<finishmin){
      mincha = 60+beginmin-finishmin;
      if(beginhour<finishhour){
        hourcha = beginhour+24-finishhour
      }
      else{
        hourcha =finishhour -beginhour;
      }
    }
    else{
      mincha =finishhour -beginhour;
      if(beginhour<finishhour){
        hourcha = beginhour+24-finishhour
      }
      else{
        hourcha =finishhour -beginhour;
      }
    }
    return [hourcha,mincha]
},


upcmd(){
  wx.request({
    method:'POST',
    url:'http://api.heclouds.com/cmds?device_ID='+deviceID,
    data:{
      min:mincha,
      hour:hourcha
    },
    success:(res)=>{
      if(res['errno']==0){
        this.setData({
          feedback:'成功'
        })
      }
      else if(res['errno']==10){
        this.setData({
          feedback :'当前设备未联网'
        })
      }
      else{
        this.setData({feedback:'失败请重试'})
      }

    }
    

  })
}

})
