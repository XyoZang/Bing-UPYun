"use strict";var daydata=getUrlParam("daydata"),bigImgStr='\n            <img data-src="https://bing.mcloc.cn/api/?day='+daydata+'" src="https://bing.mcloc.cn/api/?day='+daydata+'&thumbnail=1" class="d-block w-100 rounded preview lazy" alt="bing">\n';function getImgMsg(a){var e="";return $.ajax({type:"GET",async:!1,url:"https://bing.mcloc.cn/api/",data:"type=json&day="+a,success:function(a){e=$.parseJSON(a)}}),e}$("#bigimg-wrap").children(".progressive").empty().append(bigImgStr),imgpro("#bigimg-wrap");var detailMsg=getImgMsg(daydata),imgSubDate=detailMsg.submission_date,imgTit=detailMsg.bing_title,imgUrlHd=detailMsg.bing_imgurl,imgUrlUhd=detailMsg.bing_imgurluhd;$("title").text(imgTit),$(".bigimg-text").empty().append(imgTit),new Valine({el:"#vcomments",appId:"********",appKey:"********",path:""+imgSubDate});var modalImgStr='\n<img class="rounded img-fluid" src="https://bing.mcloc.cn/api/?day='+daydata+'" alt="">\n';$(".modal-img-wrap").empty().append(modalImgStr),$("#btnHd").click(function(){var i=new XMLHttpRequest;i.open("GET",imgUrlHd,!0),i.responseType="blob",i.onload=function(a){if(navigator.msSaveBlob){return navigator.msSaveBlob(i.response,"bingHd")}var e=window.URL.createObjectURL(i.response),t=document.createElement("a");t.href=e,t.download=today,t.click()},i.send()}),$("#btnUhd").click(function(){var i=new XMLHttpRequest;i.open("GET",imgUrlUhd,!0),i.responseType="blob",i.onload=function(a){if(navigator.msSaveBlob){return navigator.msSaveBlob(i.response,"bingUhd")}var e=window.URL.createObjectURL(i.response),t=document.createElement("a");t.href=e,t.download=today,t.click()},i.send()});