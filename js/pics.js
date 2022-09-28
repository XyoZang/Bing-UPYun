const $dynamicGallery = document.getElementById("dynamic-gallery-demo");

$dynamicGallery.addEventListener("lgInit", (event) => {
  const pluginInstance = event.detail.instance;
  setVimeoThumbnails(pluginInstance);
});

dynamicGallery = window.lightGallery($dynamicGallery, {
  licenseKey: 'E7523834-34D04F31-885DCD0D-F02C08A8',
  dynamic: true,
  plugins: [lgZoom, lgVideo, lgThumbnail],
  dynamicEl: [
    {
      src:
        "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80",
      responsive:
        "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800",
      thumb:
        "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
      subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                <p>Description of the slide 1</p>
            </div>`
    },
    {
      video: {
        source: [
          {
            src: "https://www.lightgalleryjs.com//videos/video1.mp4",
            type: "video/mp4"
          }
        ],
        attributes: { preload: false, controls: true }
      },
      thumb:
        "https://www.lightgalleryjs.com//images/demo/html5-video-poster.jpg",
      subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                <p>Description of the slide 2</p>
            </div>`
    },
    {
      src:
        "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      responsive:
        "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800",
      thumb:
        "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
    },
    {
      src: "https://vimeo.com/2057107"
    },
    {
      src: "//www.youtube.com/watch?v=egyIeygdS_E",
      poster: "https://img.youtube.com/vi/egyIeygdS_E/maxresdefault.jpg",
      thumb: "https://img.youtube.com/vi/egyIeygdS_E/maxresdefault.jpg"
    },
    {
      src: "//vimeo.com/112836958"
    }
  ]
});

// Fetch vimeo thumbnails and update gallery
async function setVimeoThumbnails(dynamicGallery) {
  for (let i = 0; i < dynamicGallery.galleryItems.length; i++) {
    const item = dynamicGallery.galleryItems[i];
    const slideVideoInfo = item.__slideVideoInfo || {};
    if (slideVideoInfo.vimeo) {
      const response = await fetch(
        'https://vimeo.com/api/oembed.json?url=' +
        encodeURIComponent(item.src),
      );
      const vimeoInfo = await response.json();
      dynamicGallery.$container
        .find('.lg-thumb-item')
        .eq(i)
        .find('img')
        .attr('src', vimeoInfo.thumbnail_url);
    }
  }
}

// Open gallery
$dynamicGallery.addEventListener("click", () => {
  dynamicGallery.openGallery(0);
});

