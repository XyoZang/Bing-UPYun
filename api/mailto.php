<?php
// 引入邮箱类
include 'php/mail.php';

$mailto = isset($_POST['mailto']) ? htmlspecialchars($_POST['mailto']) : '';
$mailsubject = isset($_POST['mailsubject']) ? htmlspecialchars($_POST['mailsubject']) : '';
$mailcontent = isset($_POST['mailcontent']) ? htmlspecialchars($_POST['mailcontent']) : '';

send_email($to=$mailto, $subject=$mailsubject, $content=$mailcontent);

?>