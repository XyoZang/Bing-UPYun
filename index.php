<!DOCTYPE html>
<html lang="cn">
<?php
// 获取页码参数
$p = $_REQUEST['p'];

//引入配置文件
$config = include 'api/php/config.php';

//初始化配置
$startdate = $config['startdate'];

// 获取程序运行时间
$Date_1=date("Y-m-d"); // 20**-**-**格式
$Date_2= $startdate;
$d1=strtotime($Date_1); //现在时间
$d2=strtotime($Date_2); //网站建立时间

// 检查是否图片跳转
$imgdate = $_REQUEST['d'];
if ($imgdate){
    $Date_3=date("d-M-Y"); // **-Sep-****格式
    $Date_4= $imgdate;
    $d3=strtotime($Date_3); // 现在时间
    $d4=strtotime($Date_4); // 请求图片的时间
    if ($d2 <= $d4 && $d4 <= $d3  ){
        $imgday=ceil(($d3-$d4)/3600/24);
        $imgurl = "/detail/?daydata=" . $imgday;
        header('content-type:text/html;charset=utf-8');
        echo "'<script>window.location.href='$imgurl'</script>'";
    } else{
        header('content-type:text/html;charset=utf-8');
        echo '<script>window.location.href="/404.html"</script>';
    }
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./static/icons8-bing-32.ico" type="image/x-icon">
    <title>必应每日一图 - 领略世界之美</title>
    <link href="lib/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="lib/progressive-image.css">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_2042758_2fi5tvz8vl4.css">
    <script async defer data-website-id="6264fbba-f3be-4116-bad8-f1a94d822ab9" src="https://uma.nxingcloud.co/xuezm.js"></script>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a id="header-text" class="navbar-brand align-middle" href="/about/"> <i id="header-icon"
                class="iconfont icon-Bing align-bottom"></i> <strong>必应每日一图</strong> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">text</a>
                </li>
            </ul> -->

            <div class="col align-self-end">
                <div class="progress row" style="width: 13.2rem">
                    <div id="js-progress" class="progress-bar progress-bar-striped bg-info" role="progressbar"
                        style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                <div class="row">
                    <span>离下次图片更新还有&nbsp;&nbsp;</span>
                    <span id="h"></span>:
                    <span id="m"></span>:
                    <span id="s"></span>
                </div>
            </div>

            <nav class="navbar-light bg-light mr-auto">
                <form class="form-inline">
                    <button id="btnToday" class="btn btn-sm btn-info" type="button">
                        下载今日壁纸 <span class="badge badge-light">HD</span>
                    </button>
                </form>
            </nav>

            <ul class="navbar-nav">

                <!-- <li class="nav-item active">
                    <a class="nav-link" href="#">主页 <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li> -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        关于
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <!--
                        <a class="dropdown-item" href="https://www.mcloc.cn/"><i class="iconfont icon-weibiaoti1"></i>
                            小马奔腾的作品集</a>
                        -->
                        <a class="dropdown-item" href="https://nxingcloud.co/"><i class="iconfont icon-t"></i>
                            南星的博客</a>
                        <a class="dropdown-item" href="https://github.com/ZhangXQA/Bing-upyun"><i
                                class="iconfont icon-github"></i> GitHub--本站源码</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/about/"><i
                                class="iconfont icon-guanyu"></i> 关于本站 </a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">带您领略世界之美</a>
                </li>
            </ul>

            <!--<form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </nav>
    <?php
    if (!$p || $p==1)
    {
        $p = 1;
    ?>
        <!-- 轮播图 -->
        <div id="carouselExampleCaptions" class="container carousel slide" data-ride="carousel" width="1920px">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div id="carousel-js" class="carousel-item active">
                    <div class="progressive">
                        <img data-src="https://bing.nxingcloud.co/api/?day=0" src="https://bing.nxingcloud.co/api/?day=0&thumbnail=1"
                            class="d-block w-100 rounded preview lazy" alt="bing">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://bing.nxingcloud.co/api/?day=1" class="d-block w-100 rounded" alt="bing">
                    <div class="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://bing.nxingcloud.co/api/?day=2" class="d-block w-100 rounded" alt="bing">
                    <div class="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    <?php
    }
    ?>
    <!-- 标题 -->
    <div id="pic-tit" class="container align-middle">
        <h4><strong>往日图片</strong> <span class="badge badge-info">HD</span></h4>
    </div>

    <!-- 图片 -->
    <div class="container" id="pic-list">

        <div id="pic-js" class="row text-center justify-content-between">
            <?php
            // 获取程序运行时间。
            $Days=ceil(($d1-$d2)/3600/24) + 1;
            $pmax = floor($Days/12);
            if ($Days%12 != 0){
                $pmax += 1;
            }
            if ($p > $pmax || $p < 1) // 若跳转页码不在现有范围内，则转至404页面
            {
                header('content-type:text/html;charset=utf-8');
                echo '<script>window.location.href="/404.html"</script>';
            }
            elseif ($p == $pmax && ($Days%12)!=0) // 若页数为最后一页且有余数,则该页面只显示余数个数的图片
            {
                for ($i=0; $i<=($Days%12-1); $i++)
                {
                    $pnumber = ($p-1) * 12 + $i;
                    $picnumber = (string)$pnumber;
                    $picjs = "pic-js-son";
                    $picid = $picjs . $picnumber; // "pic-js-son0-11"
                    $pic1preix = "https://bing.nxingcloud.co/api/?thumbnail=1&day="; // img: src
                    $pic25preix = "https://bing.nxingcloud.co/api/?thumbnail=25&day="; // img: data-src
                    $pic1url_1 = $pic1preix . $picnumber;
                    $pic25url_1 = $pic25preix . $picnumber;
            ?>
                <div id="<?php echo $picid; ?>" data-day="<?php echo $picnumber; ?>" class="pic-item my-3 shadow-sm rounded">
                    <div class="progressive">
                        <img class="rounded img-fluid preview lazy" data-src="<?php echo $pic25url_1; ?>"
                            src="<?php echo $pic1url_1; ?>" alt="">
                    </div>
                    <p class="my-2"></p>
                </div>
            <?php
                }
            } else
            {
                for ($i=0; $i<=11; $i++)
                {
                    $pnumber = ($p-1) * 12 + $i;
                    $picnumber = (string)$pnumber;
                    $picjs = "pic-js-son";
                    $picid = $picjs . $picnumber; // "pic-js-son0-11"
                    $pic1preix = "https://bing.nxingcloud.co/api/?thumbnail=1&day="; // img: src
                    $pic25preix = "https://bing.nxingcloud.co/api/?thumbnail=25&day="; // img: data-src
                    $pic1url_1 = $pic1preix . $picnumber;
                    $pic25url_1 = $pic25preix . $picnumber;
            ?>
                <div id="<?php echo $picid; ?>" data-day="<?php echo $picnumber; ?>" class="pic-item my-3 shadow-sm rounded">
                    <div class="progressive">
                        <img class="rounded img-fluid preview lazy" data-src="<?php echo $pic25url_1; ?>"
                            src="<?php echo $pic1url_1; ?>" alt="">
                    </div>
                    <p class="my-2"></p>
                </div>
            <?php
                }
            }
            ?>
        </div>
        <div class="alert alert-secondary" role="alert">
        <i class="iconfont icon-jingshi"></i> 本站所有图片均来自Bing搜索官网，版权归图片创作者所有。尊重版权，请勿商用！
        </div>

    </div>
    <div class="page">
        <?php
        if ($pmax==1)
        {
            $back = "/?p=1";
            $next = "/?p=1";
        }
        else {
            if ($p == 1){
                $back = "/?p=" . $pmax;
                $next = "/?p=" . ($p+1);
            } elseif ($p == $pmax) {
                $back = "/?p=" . ($p-1);
                $next = "/";
            } else {
                $back = "/?p=" . ($p-1);
                $next = "/?p=" . ($p+1);
            }
        }
        ?>
        <a href=<?php echo $back; ?>>上一页</a>
        <span>  <?php echo $p; ?> / <?php echo $pmax; ?>  </span>
        <a href=<?php echo $next; ?>>下一页</a>
    </div>

    <!-- 页脚 -->
    <footer class="container-fluid">
        <div class="container">
            <div class="row justify-content-around">
                <div class="card text-white bg-secondary mb-3" style="width: 18rem;">
                    <div class="card-header">本站功能</div>
                    <div class="card-body">
                        <h5 class="card-title">About this website</h5>
                        <p class="card-text">
                            本站提供必应每日壁纸超高分辨率原图下载，同时支持图片处理、回溯的API接口。<br>
                            诗曰：“ 沉舟侧畔千帆过，病树前头万木春。”
                            请跟随必应的脚步，带您领略世界之美。
                        </p>
                    </div>
                </div>
                
                <div class="card text-white bg-secondary mb-3" style="width: 18rem;">
                    <div class="card-header">本站信息</div>
                    <div class="card-body">
                        <h5 class="card-title">Website information</h5>
                        <p class="links" class="card-text">本站建立日期为2022-09-09，采用又拍云作为云存储，在<a href="https://github.com/androidmumo/Bing-upyun/">小马奔腾的源码</a>基础上进行了二次开发，修改详情请移步"<a href="/about/">关于本站</a>"</p><br>
                        <p class="links" class="card-text"><a href="/about/">提点建议</a></p>
                    </div>
                </div>

                <div class="card text-white bg-secondary mb-3" style="width: 18rem;">
                    <div class="card-header">友情链接</div>
                    <div class="card-body">
                        <h5 class="card-title">Links</h5>
                        <p class="links" class="card-text"><a href="https://nxingcloud.co/">南星的博客</a></p>
                        <p class="links" class="card-text"><a href="https://blog.mcloc.cn/">小马奔腾的博客</a></p>
                    </div>
                </div>

            </div>

            <div class="row text-center align-middle">
                <p id="foottext" class="col align-baseline text-secondary">
                    Copyright &copy;
                    <a target="_blank" href="https://nxingcloud.co/" class="text-secondary">
                        2022 南星&NXING
                    </a>&nbsp;|&nbsp;
                    <a target="_blank" href="http://www.beian.miit.gov.cn" class="text-secondary">
                        冀ICP备2022019815号-1
                    </a>&nbsp;|&nbsp;
                    <!--<a target="_blank"
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41080202000141"
                        class="text-secondary">
                        <img src="https://www.mcloc.cn/wp-content/uploads/2020/04/beiantubiao-18.png" />
                        豫公网安备 41080202000141号
                    </a>&nbsp;|&nbsp;
                    -->
                    <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                        class="text-secondary">
                        本网站由
                        <img src="static/upyun_logo5.png" alt="" class="align-middle">
                        提供CDN加速/云存储服务
                    </a>
                </p>
            </div>
        </div>
    </footer>

    <!-- 旧版 IE 升级提示弹窗代码 -->
    <script>
        /*@cc_on 
        var _iealwn = {once: 3, outver: 10};
        document.write('\x3Cscript id="_iealwn_js" src="https://support.dmeng.net/ie-alert-warning/latest.js">\x3C/script>'); 
        @*/
    </script>
    <script src="lib/jquery-1.11.0.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="lib/progressive-image.js"></script>
    <script src="lib/layer/layer.js"></script>
    <script src="js/main.js"></script>
    <script src="js/index.js"></script>
</body>

</html>