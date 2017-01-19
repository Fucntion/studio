import Vue from 'vue'
// 注册
Vue.filter('plus', function (value) {
  // 返回处理后的值
  return value+1;
})

//切换时间戳
// 传入php时间戳(10位),返回年月日-时分秒的字符串
Vue.filter('timeStamp', function (phpStamp) {
  // *1000居然错了...我肯定读了假书
  var jsStamp = parseInt(phpStamp);
  var d = new Date(jsStamp);
  var time = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  return time;
})




