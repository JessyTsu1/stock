<?php
include_once('conn.php');

$sql = "select count(*) from  data_stock_dfcf where date = '2018-09-03'";
$stmt=$con->prepare($sql);
$stmt->bind_result($sum);
$stmt->execute();
$stmt->fetch();
echo $sum;
if (!session_id()) session_start();
$_SESSION['sum']=$sum;