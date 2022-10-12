"use strict";
$(".include").each(function() {
  if (!!$(this).attr("file")) {
      var $includeObj = $(this);
      $(this).load($(this).attr("file"), function(html) {
          $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
      })
  }
});
var upyunDom = "https://ubing.nxingcloud.co/";
var monther = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
function todayTimeEn(e) {
  var t = new Date();
  t.setDate(t.getDate() - e);
  var r = t.getMonth(),
    a = t.getDate();
  return a < 10 && (a = "0" + a), a + "-" + monther[r] + "-" + t.getFullYear();
}
var today = todayTimeEn(0);
function getImgUrlHd(e) {
  return upyunDom + "bing/" + e + "/" + e + ".jpg";
}
function getImgUrlCom(e) {
  return upyunDom + "bing/" + e + "/" + e + "-compress_25.jpg";
}
function imgpro(e) {
  new Progressive({
    el: e,
    lazyClass: "lazy",
    removePreview: !0,
    scale: !0,
  }).fire();
}
function getUrlParam(e) {
  var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
    n = window.location.search.substr(1).match(t);
  return null != n ? unescape(n[2]) : null;
}
$("#nav").on('click','#btnHome',function(){
  window.location.href = "/";
});
$("#nav").on('click','#btnGallery',function(){
  window.location.href = "/pics/";
});
var verifyCode;
$("#nav").on('click','#btnToday',function(){
  if (!$("#v_container").html()){
    verifyCode = new GVerify("v_container");
  }
  veryfier(getImgUrlHd(today), "BingToday");
});
function download_img(Url, Way){
    // url: imgUrlHd/imgUrlUhd, way: bingHD, bingUhd
    var n = new XMLHttpRequest();
    switch (Way){
        case 'BingHd': 
            var imgName = Url.substr(-15, 15);
            break;
        case 'BingUhd': 
            var imgName = Url.substring(26);
            break;
        case 'BingToday': 
            var imgName = today;
            break;
    }
    n.open("GET", Url, !0),
      (n.responseType = "blob"),
      (n.onload = function (a) {
        if (navigator.msSaveBlob) {
          if(imgtoday){
            Way = Url.substr(Url.lastIndexOf("/") + 1);
          }
          return navigator.msSaveBlob(n.response, Way);
        }
        var e = window.URL.createObjectURL(n.response),
          t = document.createElement("a");
        (t.href = e), (t.download = imgName), t.click();
      }),
      n.send(),
      Swal.fire({
        title: "下载已开始！",
        icon: "success",
        confirmButtonText: "确定",
      });
}
function veryfier(Url,Way){
    if ($.cookie(Url)==undefined){
        $.cookie(Url,1);
    } else{
        var a = parseInt($.cookie(Url))+1;
        $.removeCookie(Url);
        $.cookie(Url,a);
    }
    if ($.cookie(Url)<=2){
        download_img(Url,Way);
    } else if($.cookie(Url)<=5){
        $('#verifyModal').modal();
        $("#my_button").click(function(){
          var res = verifyCode.validate($("#code_input").val());
            if(res){
                download_img(Url,Way);
                Swal.fire({
                    title: "验证正确！",
                    text: "下载已开始！",
                    icon: "success",
                    confirmButtonText: "确定",
                });
                $('#verifyModal').modal('hide');
            }else{
                Swal.fire({
                    title: "验证错误！",
                    text: "请重试！",
                    icon: "error",
                    confirmButtonText: "确定",
                });
            }
        });
    } else{
      $.post("../api/mailto.php",
        {
          mailto: "z1304242002@163.com",
          mailsubject: "Bing-多次下载警告",
          mailcontent: "Bing图片正在被多次下载！"+"次数已达 "+$.cookie(Url)+" 次！",
        });
        Swal.fire({
          title: "请勿重复下载！",
          icon: "warning",
          confirmButtonText: "确定",
      });
    }
}
  
var keyTime = new Date();
function timer(e) {
  var t = e - new Date().getTime(),
    n = ~~((t / 1e3 / 60 / 60) % 24);
  n < 10 && (n = "0" + n);
  var r = ~~((t / 1e3 / 60) % 60);
  r < 10 && (r = "0" + r);
  var a = ~~((t / 1e3) % 60);
  a < 10 && (a = "0" + a),
    $("#h").empty().append(n),
    $("#m").empty().append(r),
    $("#s").empty().append(a);
  var o = Math.floor(1e4 * (1 - t / 864e5)) / 100;
  $("#js-progress").attr("style", "width:" + o + "%"),
    $("#js-progress").attr("aria-valuenow", o),
    $("#js-progress")
      .empty()
      .append(o + "%");
}
keyTime.setDate(keyTime.getDate() + 1),
  keyTime.setHours(0),
  keyTime.setMinutes(1),
  keyTime.setSeconds(30),
  keyTime.setMilliseconds(0),
  timer((keyTime = keyTime.getTime())),
  setInterval("timer(keyTime)", 1e3);
