<?php
header("content-type:text/html;charset=utf-8;");
include_once('conn.php');
$cid=$_GET["cid"];
$limit = $_POST['limit'];
$page = $_POST['page'];
$new_page = ($page - 1)*$limit;
$sql1 = "select * from data_stock_dfcf,com_ps,ps_info where cid=".$cid." and date = '2018-09-03' and com_ps.code=data_stock_dfcf.code and data_stock_dfcf.code=ps_info.code limit ".$new_page.",".$limit;
$result1 = mysqli_query($con, $sql1);
if (!session_id()) session_start();
$count=$_SESSION['sum'];

$arr = array();
while ($row = mysqli_fetch_array($result1)) {
    $arr[] = $row;
}
$donation_data = array(  // 拼装成为前端需要的JSON
    'code'=>0,
    'msg'=>'',
    'count'=>$count,
    'data'=>$arr
);
echo json_encode($donation_data);
//echo $sql;
?>