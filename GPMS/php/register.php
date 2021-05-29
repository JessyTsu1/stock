<?php
include_once('conn.php');
$uname=$_POST['uname'];
$upwd=$_POST['upwd'];
$uid=-1;
$sql1 = "select * from user where uname='".$uname."' and upwd='".$upwd."'";
$result1 = mysqli_query($con, $sql1);
$count=mysqli_num_rows($result1);
if($count<1){
    include_once('conn2.php');
    $sql2 = "insert into user(uname,upwd) values('".$uname."','".$upwd."')";
    $result2 = mysqli_query($con2, $sql2);
    $cnt = mysqli_affected_rows($con2);
    if($cnt>0){
        echo 1;
    }else{
        echo 0;
    }
}
else{
    echo 2;
}
?>

