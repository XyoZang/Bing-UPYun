"use strict";
var start_str = ("2022/09/09");// 程序开始运行的日期 
var start_date = new Date(start_str);//将字符串转化为时间    
var date_now = new Date(); //现在的时间

// 检测是否有图片日期跳转
if (getQueryVariable("d")) {
  var imgdate = getQueryVariable("d").replace(/-/g, " "); // 将28-Sep-2022转换为28 Sep 2022
  var date_img = new Date(imgdate);
  if (start_date<=date_img && date_img<=date_now){
    var imgday= (date_now-date_img)/(1000*3600*24);
    var imgday = parseInt(Math.floor(imgday));
    window.location.href = "detail/?daydata=" + imgday;
  } else{
    window.location.href = "/404.html";
  }
}
if (getQueryVariable("p")) {
  var p = parseInt(getQueryVariable("p"));
} else {
  var p = 1;
}
//计算程序运行时间，即共有多少张图片，从而计算总共页数
var num = (date_now-start_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
var pmax = Math.floor(days/9);
if (days%9 != 0){
    pmax += 1;
}
if (p>pmax || p<1){  // 若跳转页码不在现有范围内，则转至404页面
  window.location.href = "/404.html";
}
if (p==1){
    document.getElementById("carouselExampleCaptions").style.display='block';
    imgpro("#carousel-js");
}
if (p==pmax && (days%9)!=0) // 若页数为最后一页且有余数,则该页面只显示余数个数的图片
{
  var imax = days%9-1;
  for(var i=8;i>imax;i--){ // 
    var nodiv = "pic-js-son" + i;
    var dediv = document.getElementById(nodiv);
    dediv.parentNode.removeChild(dediv);
  }
}else{
  var imax = 8;
}
for (var i = 0; i <= imax; i++) {
  newdiv(i);
  var ele = "#pic-js-son" + ((p-1)*9+i);
  imgpro(ele);
}
$("#pic-js").on("click", ".pic-item", function () {
  window.location.href = "detail/?daydata=" + $(this).attr("data-day");
});

var dayi = (p - 1) * 9;
getText1();
var dayj = (p - 1) * 9;
var dayk = 0;
getText2();
document.getElementById("pagenumber").innerHTML=p+" / "+pmax;
function pager(fx){
    switch (fx){
        case "back":
            if (p==1){
                swal({title: "已经是第一页了！",icon: "info",button: "确定",});
            } else{
                window.location.href = "/?p=" + (p-1);
            }
            break;
        case "next":
            if (p==pmax){
                swal({title: "已经是最后一页了！",icon: "info",button: "确定",});
            } else{
                window.location.href = "/?p=" + (p+1);
            }
            break;
        default:
            swal({title: "未知错误",icon: "error",button: "确定",});
    }
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function newdiv(ID){
  // 配置
  var divID = "pic-js-son" + ID, imgID = "img-day" + ID;
  var newdayID = ID+(p-1)*9;
  var newdivID = "pic-js-son" + newdayID;
  var newimgID = "img-day" + newdayID;
  var newdatasrc = "https://bing.nxingcloud.co/api/?thumbnail=25&day="+newdayID;
  var newsrc = "https://bing.nxingcloud.co/api/?thumbnail=1&day="+newdayID;
  // 运行
  var newdiv = document.getElementById(divID);
  newdiv.setAttribute("id", newdivID);
  newdiv.setAttribute("data-day", newdayID);
  var newimg = document.getElementById(imgID);
  newimg.setAttribute("id", newimgID);
  newimg.setAttribute("src", newsrc);
  newimg.setAttribute("data-src", newdatasrc);
}

function getText1() {
  $.ajax({
    type: "GET",
    async: !0,
    url: "https://bing.nxingcloud.co/api/",
    data: "type=json&day=" + dayi,
    success: function (a) {
      var e = $.parseJSON(a).bing_title,
        t =
          "\n                    <h5>" +
          e.replace(/\([^\)]*\)/g, "").replace(/\s*$/g, "") +
          "</h5>\n                    <p>" +
          e +
          "</p>\n            ";
      $(".carousel-caption").eq(dayi).empty().append(t),
        1 < dayi || ((dayi += 1), getText1());
    },
  });
}

function getText2() {
  $.ajax({
    type: "GET",
    async: !0,
    url: "https://bing.nxingcloud.co/api/",
    data: "type=json&day=" + dayj,
    success: function (a) {
      var e = $.parseJSON(a),
        t = e.bing_title,
        i = e.submission_date,
        c = t.replace(/\([^\)]*\)/g, "");
      (c =
        '<span class="badge badge-secondary">' +
        i +
        "</span><br>" +
        (c = c.replace(/\s*$/g, ""))),
        $("#pic-js").children().eq(dayk).children("p").empty().append(c),
        (p-1)*9+imax-1 < dayj || ((dayj += 1), (dayk += 1), getText2());
    },
  });
}
