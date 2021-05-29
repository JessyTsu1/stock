<?php
header("content-type:text/html;charset=utf-8;");
include_once('conn.php');
if (!session_id()) session_start();
$uid=$_SESSION['uid'];
$limit = $_POST['limit'];
$page = $_POST['page'];
$new_page = ($page - 1)*$limit;
$sql1 = "select * from  combination where uid=".$uid." limit ".$new_page.",".$limit;
$result1 = mysqli_query($con, $sql1);
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
?>