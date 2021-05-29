<?php
include_once('conn.php');
$cname=$_GET['cname'];
if (!session_id()) session_start();
$uid=$_SESSION['uid'];
$sql = "insert into combination(cname,uid) values('".$cname."',".$uid.")";
$query = mysqli_query($con,$sql);

$cnt = mysqli_affected_rows($con);
echo $cnt;
?>
