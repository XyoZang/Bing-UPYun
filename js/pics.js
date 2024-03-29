const $dynamicGallery = document.getElementById("dynamic-gallery-demo");
var count = 0;
var GalleryEl = new Array();
var start_str = "2022/09/09";
var start_date = new Date(start_str);
var end_date = new Date();
var num = (end_date - start_date) / (1000 * 3600 * 24);
var days = parseInt(Math.ceil(num));
function getTitle(day) {
  let Title;
  $.ajax({
    type: "GET",
    async: false,
    url: "/api/",
    data: "type=json&day=" + day,
    success: function (res) {
      Title = $.parseJSON(res).bing_title;
    },
  });
  return Title;
}
function GetPics(Element) {
  for (var i = 0; i < 9; i++) {
    day = count + i;
    if (day < days) {
      data = {
        src: "/api/?day=" + day,
        thumb: "/api/?day=" + day + "&thumbnail=25",
        subHtml:
          `<div class="lightGallery-captions"><h2>` +
          getTitle(day) +
          `</h2></div>`,
      };
      Element.push(data);
    } else {
      break;
    }
  }
  return Element;
}
function LoadingOn(eleID) {
  document.getElementById(eleID).innerHTML =
    '<span class="spinner-border spinner-border-sm" id="loading"></span>   Loading';
  document.getElementById(eleID).disabled = true;
}
function LoadingOff(eleID, content) {
  document.getElementById(eleID).innerHTML = content;
  document.getElementById(eleID).disabled = false;
}
const dynamicGallery = window.lightGallery($dynamicGallery, {
  licenseKey: "E7523834-34D04F31-885DCD0D-F02C08A8",
  loop: false,
  showZoomInOutIcons: true,
  actualSize: false,
  dynamic: true,
  plugins: [lgZoom, lgThumbnail, lgFullscreen],
  dynamicEl: GalleryEl,
});
$dynamicGallery.addEventListener("click", function () {
  LoadingOn("dynamic-gallery-demo");
  setTimeout(function () {
    if (GalleryEl.length == 0) {
      GetPics(GalleryEl);
    }
    dynamicGallery.refresh(GalleryEl);
    dynamicGallery.openGallery(0);
    LoadingOff("dynamic-gallery-demo", "画廊模式");
  }, 100);
});
document
  .getElementById("dynamic-gallery-demo-load-more")
  .addEventListener("click", () => {
    LoadingOn("dynamic-gallery-demo-load-more", "加载更多");
    setTimeout(function () {
      if (count < days - 9) {
        if (GalleryEl.length == 0) {
          GetPics(GalleryEl);
        } else {
          count += 9;
          var GalleryMore = new Array();
          GetPics(GalleryMore);
          GalleryEl = [...GalleryEl, ...GalleryMore];
        }
        dynamicGallery.refresh(GalleryEl);
        dynamicGallery.openGallery(count);
      } else {
        count = 999;
        Swal.fire({
          title: "没有更多图片了！",
          icon: "info",
          confirmButtonText: "确定",
        });
      }
      LoadingOff("dynamic-gallery-demo-load-more", "加载更多");
    }, 100);
  });
