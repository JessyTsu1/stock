<?php
include_once('conn.php');
if (!session_id()) session_start();
$uid=$_SESSION['uid'];
$sql = "select count(*) from combination where uid=".$uid;
$stmt=$con->prepare($sql);
$stmt->bind_result($sum);
$stmt->execute();
$stmt->fetch();
echo $sum;
$_SESSION['sum']=$sum;