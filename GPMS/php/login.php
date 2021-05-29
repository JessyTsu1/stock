<?php
include_once('conn.php');
$uname=$_POST['uname'];
$upwd=$_POST['upwd'];

$uid=-1;
$sql = "select uid from user where uname='".$uname."' and upwd='".$upwd."'";
$stmt=$con->prepare($sql);
$stmt->execute();
$stmt->bind_result($uid);
$stmt->execute();
$stmt->fetch();

if($uid>0){
    if (!session_id()) session_start();
    $_SESSION['uid']=$uid;
    echo $uid;
}
else{
    echo 0;
}
?>
