<?php
/*
Copyright © 2020 by nxingcloud@163.com
*/

//网站开始运行日期，供获取随机图功能使用
$config['startdate']     = '****-**-**';

//又拍云连接信息
$config['bucketName']    = '********';  //你的又拍云存储库
$config['operatorName']  = '********';  //你的存储库操作员
$config['operatorPwd']   = '********';  //你的存储库操作员密码
$config['domainName']    = '********';  //又拍云加速域名。注：结尾的 / 不能省略。如：'https://upyun.yourdom.com/'

//数据库信息
$config['mysqlHost']     = '********';  //MySQL数据库主机名
$config['mysqlUsername'] = '********';  //MySQL数据库用户名
$config['mysqlPassword'] = '********';  //MySQL数据库密码
$config['mysqlDbname']   = '********';  //MySQL数据库名

// 邮箱配置信息
// **********发件人配置************
$config['mailUsername']  = '********'; //邮箱发件人账号
$config['mailPassword']  = '********'; //邮箱发件人SMTP密码
$config['mailFromName']  = '********'; //邮箱发件人昵称
$config['mailHost']      = '********'; //邮箱服务器
$config['mailPort']      = '********'; //邮箱端口号，以163为例，若不使用SSL加密方式则端口号为25，否则为465
//***********发件内容及收件人配置******
$config['mailReceiver']  = '********'; //可设置单个收件人，若需多个收件人则以数组['***', '***']形式。
$config['mailSubject']   = '必应每日一图';
$config['mailContent']   = ["开始抓取今日图片···<br>"];

//延时
$config['delay'] = 90; //默认延时90s，不建议修改

return $config;