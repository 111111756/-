function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour,minute];
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function gettime(){
  var thisdata = new Date(),now =formatTime(thisdata);
  return now;
}


module.exports = {
  formatTime: formatTime,
  gettime:gettime,
  
}
