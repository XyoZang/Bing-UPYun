"use strict";
var start_str = "2022/09/09";
var start_date = new Date(start_str);
var date_now = new Date();
if (getQueryVariable("p")) {
  var p = parseInt(getQueryVariable("p"));
} else {
  var p = 1;
}
var num = (date_now-start_date) / (1000 * 3600 * 24);
var days = parseInt(Math.ceil(num));  // 运行日期，即总共图片数
var pmax = Math.floor(days/9)+((days%9!=0)?1:0);
if (p > pmax || p < 1) {
  window.location.href = "/404.html";
}
if (p == 1) {
  $("#carousel-1").attr({
    "data-src": "/api/?date=" + dateFormat(date_now),
    "src": "/api/?date="+dateFormat(date_now)+"&thumbnail=1"
  });
  var car=new Date();
  $("#carousel-2").attr("src","/api/?date="+date_back(car));
  $("#carousel-3").attr("src","/api/?date="+date_back(car));
  $('#carouselExampleCaptions').show();
  imgpro("#carousel-js");
}
if (p == pmax && days % 9 != 0) {
  var imax = (days % 9) - 1;
  for (var i = 8; i > imax; i--) {
    var nodiv = "pic-js-son" + i;
    $("#"+nodiv).remove();
  }
} else {
  var imax = 8;
}
var datediv = new Date();
datediv = datediv.setDate(datediv.getDate()-(p-1)*9+1);
datediv = new Date(datediv);
for (var i = 0; i <= imax; i++) {
  newdiv_date(i);
}
$("#pic-js").on("click", ".pic-item", function () {
  window.location.href = "detail/?date=" + $(this).attr("data-date");
});
var dateText1 = new Date();
dateText1 = dateText1.setDate(dateText1.getDate()-(p-1)*9);
dateText1 = new Date(dateText1);
var dayi = (p - 1) * 9;
getText1();
var dayj = (p - 1) * 9;
var dayk = 0;
var dateText2 = new Date();
dateText2 = dateText2.setDate(dateText2.getDate()-(p-1)*9);
dateText2 = new Date(dateText2);
getText2();
$("#pagenumber").html(p + " / " + pmax);
for (var i = 1; i <= pmax; i++) {
  var pageurl = '<a id="page' + i +'"class="dropdown-item" href="/?p=' + i + '">第 ' + i + " 页</a>";
  $("#pagelist").append(pageurl);
}
$("#page"+p).addClass("disabled");
function pager(fx) {
  switch (fx) {
    case "back":
      if (p == 1) {
        Swal.fire({
          title: "已经是第一页了！",
          icon: "info",
          confirmButtonText: "确定",
        });
      } else {
        window.location.href = "/?p=" + (p - 1);
      }
      break;
    case "next":
      if (p == pmax) {
        Swal.fire({
          title: "已经是最后一页了！",
          icon: "info",
          confirmButtonText: "确定",
        });
      } else {
        window.location.href = "/?p=" + (p + 1);
      }
      break;
    default:
      Swal.fire({
        title: "未知错误",
        icon: "error",
        confirmButtonText: "确定",
      });
  }
}
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
// 参数day版本的加载函数，已废弃
// function newdiv(ID) {
//   var divID = "pic-js-son" + ID,
//     imgID = "img-day" + ID;
//   var newdayID = ID + (p - 1) * 9;
//   var newdivID = "pic-js-son" + newdayID;
//   var newimgID = "img-day" + newdayID;
//   var newdatasrc =
//     "/api/?thumbnail=25&day=" + newdayID;
//   var newsrc = "/api/?thumbnail=1&day=" + newdayID;
//   var newdiv = document.getElementById(divID);
//   newdiv.setAttribute("id", newdivID);
//   newdiv.setAttribute("data-day", newdayID);
//   var newimg = document.getElementById(imgID);
//   newimg.setAttribute("id", newimgID);
//   newimg.setAttribute("src", newsrc);
//   newimg.setAttribute("data-src", newdatasrc);
// }
function date_back(backdate){
  backdate = backdate.setDate(backdate.getDate()-1);
  backdate = new Date(backdate);
  backdate = dateFormat(backdate);
  return backdate;
}
function newdiv_date(ID){
  var divID = "pic-js-son" + ID,
    imgID = "img-day" + ID,
    newdayID = ID + (p - 1) * 9,
    newdivID = "pic-js-son" + newdayID,
    newimgID = "img-day" + newdayID;
  var newdate = date_back(datediv);
  var newdatasrc =
    "/api/?thumbnail=25&date=" + newdate;
  var newsrc = "/api/?thumbnail=1&date=" + newdate;
  $("#"+divID).attr({"id": newdivID,"data-date": newdate});
  $("#"+imgID).attr({"id": newimgID,"src": newsrc,"data-src": newdatasrc});
  imgpro("#"+newdivID);
}
function dateFormat(date){
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let date_new = day + "-" + monther[month] + "-" + year;
  return date_new;
}
function getText1() {
  $.ajax({
    type: "GET",
    async: !0,
    url: "/api/",
    data: "type=json&date=" + dateFormat(dateText1),
    success: function (a) {
      var e = $.parseJSON(a).bing_title,
        t =
          "\n                    <h5>" +
          e.replace(/\([^\)]*\)/g, "").replace(/\s*$/g, "") +
          "</h5>\n                    <p>" +
          e +
          "</p>\n            ";
      $(".carousel-caption").eq(dayi).empty().append(t),
        1 < dayi || ((dayi += 1), date_back(dateText1), getText1());
    },
  });
}
function getText2() {
  $.ajax({
    type: "GET",
    async: !0,
    url: "/api/",
    data: "type=json&date=" + dateFormat(dateText2),
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
        (p-1)*9+imax-1 < dayj || ((dayj += 1), (dayk += 1), date_back(dateText2), getText2());
    },
  });
}
