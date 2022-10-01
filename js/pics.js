const $dynamicGallery = document.getElementById("dynamic-gallery-demo");

var count = 0;
var GalleryEl = new Array();

//计算程序运行时间，即共有多少张图片 
var start_str = ("2022/09/09");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。  
var start_date = new Date(start_str);//将字符串转化为时间    
var end_date = new Date();  
var num = (end_date-start_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）

function getTitle(day) {
  let Title;
  $.ajax({
    type: "GET",
    async: false,
    url: "https://bing.nxingcloud.co/api/",
    data: "type=json&day=" + day,
    success: function (res) {
      Title = $.parseJSON(res).bing_title;
    },
  });
  return Title;
}

function GetPics(Element)
{
  for (var i = 0; i < 9; i++) {
    day = count + i;
    if (day<days){
      data = {
        src: "https://bing.nxingcloud.co/api/?day=" + day,
        thumb:"https://bing.nxingcloud.co/api/?day=" + day + "&thumbnail=25",
        subHtml:`<div class="lightGallery-captions">
                  <h2>` + getTitle(day) + `</h2>
                </div>`
      }
      Element.push(data);
    } else{
      break;
    }
  }
  return Element;
}

function LoadingOn(eleID){
  document.getElementById(eleID).innerHTML = 
        '<span class="spinner-border spinner-border-sm" id="loading"></span>  Loading';
  document.getElementById(eleID).disabled = true;
}

function LoadingOff(eleID, content){
  document.getElementById(eleID).innerHTML = content;
  document.getElementById(eleID).disabled = false;
}

// **************主进程*****************
const dynamicGallery = window.lightGallery($dynamicGallery, {
  licenseKey: '00000000-00000000-00000000-00000000',
  loop: false,
  showZoomInOutIcons: true,
  actualSize: false,
  dynamic: true,
  plugins: [lgZoom, lgThumbnail, lgFullscreen],
  dynamicEl: GalleryEl,
});

// Open gallery
$dynamicGallery.addEventListener('click', function () {
  LoadingOn("dynamic-gallery-demo");
  setTimeout(function () {
      if (GalleryEl.length == 0){
          GetPics(GalleryEl);
      }
      dynamicGallery.refresh(GalleryEl);
      dynamicGallery.openGallery(0);
      LoadingOff("dynamic-gallery-demo", "画廊模式");
  }, 100);
});

document
  .getElementById('dynamic-gallery-demo-load-more')
  .addEventListener('click', () => {
    LoadingOn("dynamic-gallery-demo-load-more", "加载更多");
    setTimeout(function () {
        if (count<(days-9))
        {
          if (GalleryEl.length == 0){
              GetPics(GalleryEl);
          } else{
              count += 9;
              var GalleryMore = new Array();
              GetPics(GalleryMore);
              GalleryEl = [...GalleryEl, ...GalleryMore];
          }
          dynamicGallery.refresh(GalleryEl);
          // To open gallery after updating slides,
          dynamicGallery.openGallery(count);
        } else{
          count = 999;
          swal({title: "没有更多图片了！",icon: "info",button: "确定",});
        }
        LoadingOff("dynamic-gallery-demo-load-more", "加载更多");
    }, 100);
});
// ******************End-主进程*************
