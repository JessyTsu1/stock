<?php
include_once('conn.php');
$cid=$_GET["cid"];
$sql = "select count(*) from data_stock_dfcf,com_ps where cid=".$cid." and date = '2018-09-03' and com_ps.code=data_stock_dfcf.code";
$stmt=$con->prepare($sql);
$stmt->bind_result($sum);
$stmt->execute();
$stmt->fetch();
echo $sum;
if (!session_id()) session_start();
$_SESSION['sum']=$sum;