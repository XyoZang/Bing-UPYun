//获取url参数
let daydata = getUrlParam("daydata");

//生成bigimg
var bigImgStr = `
            <img data-src="https://bing.xenns.com/api/?day=${daydata}" src="https://bing.xenns.com/api/?day=${daydata}&thumbnail=1" class="d-block w-100 rounded preview lazy" alt="bing">
`
$("#bigimg-wrap").children(".progressive").empty().append(bigImgStr);

//图片渐进式加载
imgpro("#bigimg-wrap");

/* ajax获取图片信息 */
function getImgMsg(day) {
    var imgMsg = "";
    $.ajax({
        type: "GET",
        async: false,
        url: "https://bing.xenns.com/api/",
        data: `type=json&day=${day}`,
        success: function (msg) {
            imgMsg = $.parseJSON(msg);
        }
    });
    return imgMsg;
}
/* ajax获取图片信息 end */

//调用ajax函数 获取此图片信息
var detailMsg = getImgMsg(daydata);
var imgSubDate = detailMsg["submission_date"];
var imgTit = detailMsg["bing_title"];
var imgUrlHd = detailMsg["bing_imgurl"];
var imgUrlUhd = detailMsg["bing_imgurluhd"];

//改变网页标题
$('title').text(imgTit);

//添加图片标题
$(".bigimg-text").empty().append(`<span class="badge badge-secondary">${imgSubDate}</span>&nbsp;` + imgTit);

//评论系统
new Artalk({
    el:        '#vcomments',              // 绑定元素的 Selector
    pageKey:   '',                // 固定链接 (留空自动获取)
    pageTitle: '', // 页面标题 (留空自动获取)
    server:    'https://artalk.xenns.com',  // 后端地址
    site:      '必应每日一图',           // 你的站点名
  })

//将数据写入模态框
var modalImgStr = `
<img class="rounded img-fluid" src="https://bing.xenns.com/api/?day=${daydata}" alt="">
`
$(".modal-img-wrap").empty().append(modalImgStr);

/* 点击模态框按钮下载图片 */
$("#btnHd").click(function () {
    var x = new XMLHttpRequest();

    var resourceUrl = imgUrlHd;
    x.open("GET", resourceUrl, true);
    x.responseType = 'blob';

    x.onload = function (e) {
        // ie10+
        if (navigator.msSaveBlob) {
            var name1 = "bingHd";
            return navigator.msSaveBlob(x.response, name1);
        } else {
            var url = window.URL.createObjectURL(x.response)
            var a = document.createElement('a');
            a.href = url;
            a.download = today;
            a.click();
        }
    }
    x.send();

    //弹窗
    layer.msg('下载已开始');
});

$("#btnUhd").click(function () {
    var x = new XMLHttpRequest();

    var resourceUrl = imgUrlUhd;
    x.open("GET", resourceUrl, true);
    x.responseType = 'blob';

    x.onload = function (e) {
        // ie10+
        if (navigator.msSaveBlob) {
            var name2 = "bingUhd";
            return navigator.msSaveBlob(x.response, name2);
        } else {
            var url = window.URL.createObjectURL(x.response)
            var a = document.createElement('a');
            a.href = url;
            a.download = today;
            a.click();
        }
    }
    x.send();

    //弹窗
    layer.msg('下载已开始');
});
/* 点击模态框按钮下载图片 end */