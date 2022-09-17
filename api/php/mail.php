<?php

/**
* 邮件发送
* @param $to 接收人
* @param string $subject 邮件标题
* @param string $content 邮件内容(html模板渲染后的内容)
* @throws Exception
* @throws phpmailerException
*/
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function send_email($to="",$subject='',$content='<h1>Hello World</h1>'){
    // 引入PHPMailer的核心文件
    require_once(dirname(__FILE__)."/phpmailer/PHPMailer.php");
    require_once(dirname(__FILE__)."/phpmailer/Exception.php");
    require_once(dirname(__FILE__)."/phpmailer/SMTP.php");
    
    $config = include 'config.php';
    //初始化邮箱配置信息
    $mailUsername = $config['mailUsername'];
    $mailPassword = $config['mailPassword'];
    $mailFromName = $config['mailFromName'];
    $mailReciDress = $config['mailReciDress'];
    $mailHost = $config['mailHost'];
    $mailPort = $config['mailPort'];
    // 实例化PHPMailer核心类
    $mail = new PHPMailer(true);

    try {
           // 是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        //$mail->SMTPDebug = 2;
        //调试输出格式
        //$mail->Debugoutput = 'html';

        //客户端配置---Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP(); // 使用smtp鉴权方式发送邮件
        $mail->SMTPAuth = true; // smtp需要鉴权 这个必须是true
        $mail->Host = $mailHost; // 链接邮箱的服务器地址
        $mail->Username = $mailUsername; // smtp登录的账号 QQ邮箱即可
        $mail->Password = $mailPassword; // smtp登录的密码 使用生成的授权码
        $mail->SMTPSecure = 'ssl'; // 设置使用ssl加密方式登录鉴权
        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
        $mail->Port = $mailPort; // 设置ssl连接smtp服务器的远程服务器端口号
        $mail->CharSet = 'UTF-8'; // 设置发送的邮件的编码

        //邮件账户设置---Recipients
        //$mail->FromName = $mailFromName; // 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
        //$mail->From = $mailUsername; // 设置发件人邮箱地址 同登录账号
        $mail->setFrom($mailUsername, $mailFromName);
        // $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
        $mail->addAddress($mailReciDress);               //Name is optional
        $mail->addReplyTo($mailUsername, 'Information');
        
        // 设置收件人邮箱地址
        // if(is_array($to))
        // {
        //     foreach($to as $v)
        //     {
        //         $mail->addAddress($v);
        //     }
        // }else{
        //     $mail->addAddress($to);
        // }
        //$mail->addAddress('1234567890@qq.com');
        // 添加多个收件人 则多次调用方法即可

        //邮件内容---Content
        $mail->isHTML(true); // 邮件正文是否为html编码 注意此处是一个方法
        $mail->Subject = $subject; // 添加该邮件的主题
        $email=$content; // 添加邮件正文
        $mail->Body = $email;
        // 为该邮件添加附件
        //$mail->addAttachment('./example.pdf');
        //附加信息，可以省略
        $mail->AltBody = "This is the body in plain text for non-HTML mail clients"; 
        // 发送邮件 返回状态
        
        echo $mailUsername;
        echo $mailPassword;
        echo $mailFromName;
        echo $mailReciDress;
        echo $mailHost;
        echo $mailPort;
    
        $mail->send();
        echo '<br>邮件发送成功！';
    } catch (Exception $e) {
        echo "<br>Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>