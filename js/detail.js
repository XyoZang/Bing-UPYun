"use strict";
var daydata = getUrlParam("date"),
  detailMsg = getImgMsg(daydata),
  imgTit = detailMsg.bing_title,
  bigImgStr =
    '\n            <a href="https://bing.xenns.com/api/?date=' +
    daydata +
    '" alt=""><img data-src="https://bing.xenns.com/api/?date=' +
    daydata +
    '" src="https://bing.xenns.com/api/?date=' +
    daydata +
    '&thumbnail=1" class="d-block w-100 rounded preview lazy" alt=' +
    imgTit +
    "></a>\n";
function getImgMsg(a) {
  var e = "";
  return (
    $.ajax({
      type: "GET",
      async: !1,
      url: "https://bing.xenns.com/api/",
      data: "type=json&date=" + a,
      success: function (a) {
        e = $.parseJSON(a);
      },
    }),
    e
  );
}
$("#bigimg-wrap").children(".progressive").empty().append(bigImgStr),
  imgpro("#bigimg-wrap");
var imgSubDate = detailMsg.submission_date,
  imgUrlHd = detailMsg.bing_imgurl,
  imgUrlUhd = detailMsg.bing_imgurluhd;
$("title").text(imgTit),
  $(".bigimg-text")
    .empty()
    .append(
      '<span class="badge badge-secondary">' +
        imgSubDate +
        "</span>&nbsp;" +
        imgTit
    ),
  new Artalk({
    el: "#vcomments",
    pageKey: `/detail/?date=${imgSubDate}`,
    pageTitle: "",
    server: "https://artalk.xenns.com",
    site: "必应每日一图",
    emoticons: [
      "https://cdn.nxingcloud.co/images/emoji/bilibili2233/bilibili2233.json",
      "https://cdn.nxingcloud.co/images/emoji/Tieba/Tieba.json",
    ],
  });
var modalImgStr =
  '\n<img class="rounded img-fluid" src="https://bing.xenns.com/api/?date=' +
  daydata +
  '" alt="">\n';
$(".modal-img-wrap").empty().append(modalImgStr),
  $("#btnHd").click(function () {
    veryfier(imgUrlHd, "BingHd");
  }),
  $("#btnUhd").click(function () {
    veryfier(imgUrlUhd, "BingUhd");
  });
var gallerycontainer = document.getElementById("detail-gallery");
lightGallery(gallerycontainer, {
  plugins: [lgZoom, lgFullscreen],
  licenseKey: "your_license_key",
  speed: 500,
});
const requestFullScreen = () => {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
};
gallerycontainer.addEventListener("lgAfterOpen", () => {
  requestFullScreen();
});