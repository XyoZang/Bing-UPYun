"use strict";$("#pic-js").on("click",".pic-item",function(){window.location.href="detail/?daydata="+$(this).attr("data-day")}),imgpro("#carousel-js");
if (window.location.search.substring(3))
{
    var pagenumber = window.location.search.substring(3);
    var p = parseInt(pagenumber);
} else {
    var p = 1;
}

for(var i=0;i<12;i++){var ele="#pic-js-son"+i;imgpro(ele)}
var dayi=0+(p-1)*12;
function getText1()
{
    $.ajax({
        type:"GET",
        async:!0,
        url:"https://bing.nxingcloud.co/api/",
        data:"type=json&day="+dayi,
        success:function(a)
        {
            var e=$.parseJSON(a).bing_title,
            t="\n                    <h5>"+e.replace(/\([^\)]*\)/g,"").replace(/\s*$/g,"")+"</h5>\n                    <p>"+e+"</p>\n            ";
            $(".carousel-caption").eq(dayi).empty().append(t),
            1<dayi||(dayi+=1,getText1())
        }
    })
}getText1();
var dayj=0+(p-1)*12;
function getText2()
{
    $.ajax(
        {type:"GET",
        async:!0,
        url:"https://bing.nxingcloud.co/api/",
        data:"type=json&day="+dayj,
        success:function(a)
        {
            var e=$.parseJSON(a),
            t=e.bing_title,
            i=e.submission_date,
            c=t.replace(/\([^\)]*\)/g,"");
            c='<span class="badge badge-secondary">'+i+"</span><br>"+(c=c.replace(/\s*$/g,"")),
            $("#pic-js").children().eq(dayj).children("p").empty().append(c),
            10<dayj||(dayj+=1,getText2())
        }
    })
}getText2();