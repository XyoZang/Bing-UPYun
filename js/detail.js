"use strict";var daydata=getUrlParam("daydata"),bigImgStr='\n            <img data-src="https://bing.nxingcloud.co/api/?day='+daydata+'" src="https://bing.nxingcloud.co/api/?day='+daydata+'&thumbnail=1" class="d-block w-100 rounded preview lazy" alt="bing">\n';function getImgMsg(a){var e="";return $.ajax({type:"GET",async:!1,url:"https://bing.nxingcloud.co/api/",data:"type=json&day="+a,success:function(a){e=$.parseJSON(a)}}),e}$("#bigimg-wrap").children(".progressive").empty().append(bigImgStr),imgpro("#bigimg-wrap");var detailMsg=getImgMsg(daydata),imgSubDate=detailMsg.submission_date,imgTit=detailMsg.bing_title,imgUrlHd=detailMsg.bing_imgurl,imgUrlUhd=detailMsg.bing_imgurluhd;$("title").text(imgTit),$(".bigimg-text").empty().append('<span class="badge badge-secondary">'+imgSubDate+"</span>&nbsp;"+imgTit),new Valine({el:"#vcomments",appId:"********",appKey:"********",path:""+imgSubDate});var modalImgStr='\n<img class="rounded img-fluid" src="https://bing.nxingcloud.co/api/?day='+daydata+'" alt="">\n';$(".modal-img-wrap").empty().append(modalImgStr),
$("#btnHd").click(function()
{
    var n=new XMLHttpRequest;
    n.open("GET",imgUrlHd,!0),
    n.responseType="blob",
    n.onload=function(a)
    {
        if(navigator.msSaveBlob)
        {
            return navigator.msSaveBlob(n.response,"bingHd")
        }
        var e=window.URL.createObjectURL(n.response),
        t=document.createElement("a");
        t.href=e,
        t.download= imgUrlHd.substr(-15, 15),
        t.click()
    },
        n.send(),layer.msg("下载已开始")
}),

$("#btnUhd").click(function()
{
    var n=new XMLHttpRequest;
    n.open("GET",imgUrlUhd,!0),
    n.responseType="blob",
    n.onload=function(a)
    {
        if(navigator.msSaveBlob)
        {
            return navigator.msSaveBlob(n.response,"bingUhd")
        }
        var e=window.URL.createObjectURL(n.response),
        t=document.createElement("a");
        t.href=e,
        t.download=imgUrlUhd.substring(27), 
        t.click()
    },
        n.send(),
        layer.msg("下载已开始")
});