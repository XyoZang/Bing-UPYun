"use strict";
$("#pic-js").on("click", ".pic-item", function () {
  window.location.href = "detail/?daydata=" + $(this).attr("data-day");
});

if (window.location.search.substring(3)) {
  var pagenumber = window.location.search.substring(3);
  var p = parseInt(pagenumber);
} else {
  var p = 1;
}
if (p==1){
    document.getElementById("carouselExampleCaptions").style.display='block';
    imgpro("#carousel-js");
}
//计算程序运行时间，即共有多少张图片，从而计算总共页数
var start_str = ("2022/09/09");// 程序开始运行的日期 
var start_date = new Date(start_str);//将字符串转化为时间    
var end_date = new Date();  
var num = (end_date-start_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
var pmax = Math.floor(days/9);
if (days%9 != 0){
    pmax += 1;
}

function newdiv(ID){
  // 配置
  var divID = "pic-js-son" + ID;
  var imgID = "img-day" + ID;
  var newdayID = ID+(p-1)*9;
  var newdivID = "pic-js-son" + newdayID;
  var newimgID = "img-day" + newdayID;
  var newdatasrc = "https://bing.nxingcloud.co/api/?thumbnail=25&day="+newdayID;
  var newsrc = "https://bing.nxingcloud.co/api/?thumbnail=1&day="+newdayID;
  // 运行
  var newdiv = document.getElementById(divID);
  console.log(newdiv);
  newdiv.setAttribute("id", newdivID);
  newdiv.setAttribute("data-day", newdayID);
  var newimg = document.getElementById(imgID);
  newimg.setAttribute("id", newimgID);
  newimg.setAttribute("src", newsrc);
  newimg.setAttribute("data-src", newdatasrc);
}
if (p!=1){
  for (var i = 0; i < 9; i++) {
    newdiv(i);
  }
}

for (var i = 0; i < 9; i++) {
  var ele = "#pic-js-son" + ((p-1)*9+i);
  imgpro(ele);
}
var dayi = (p - 1) * 9;
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
getText1();
var dayj = (p - 1) * 9;
var dayk = 0;
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
        p * 9 - 2 < dayj || ((dayj += 1), (dayk += 1), getText2());
    },
  });
}
getText2();

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
            console.log(pmax);
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

