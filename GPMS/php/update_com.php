<?php
include_once('conn.php');
$cid=$_GET['cid'];
$cname=$_GET['cname'];
if (!session_id()) session_start();
$uid=$_SESSION['uid'];
$sql = "update combination set cname ='".$cname."'where cid=".$cid." and uid=".$uid;
$query = mysqli_query($con,$sql);

$cnt = mysqli_affected_rows($con);
echo $cnt;
?>
