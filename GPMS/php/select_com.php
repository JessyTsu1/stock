<?php
include_once('conn.php');
$cid=$_GET["cid"];
if (!session_id()) session_start();
$uid=$_SESSION['uid'];
$sql = "select * from combination where uid=".$uid." and cid <> ".$cid;
$result1 = mysqli_query($con, $sql);
$count=mysqli_num_rows($result1);
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
//echo mysqli_error($con);