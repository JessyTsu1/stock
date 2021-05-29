<?php
header("content-Type: text/html; charset=utf-8");//字符编码设置
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "php_xw";

// 创建连接
$con =mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else{
    echo"Connection successed! \n";
}

$sql = "SELECT code,date,open,close,high,low,cjl,cje FROM data_stock_dfcf WHERE code='000858' LIMIT 50";
$result = mysqli_query($con,$sql);

$arr = array();
while ($row = mysqli_fetch_array($result)) {
    $arr[] = $row;
}
$donation_data = array(  // 拼装成为前端需要的JSON
    'code'=>0,
    'msg'=>'',
    'data'=>$arr
);
echo json_encode($donation_data);


//$arr = array();
//while($row = mysqli_fetch_array($result)) {
//  $count=count($row);//不能在循环语句中，由于每次删除 row数组长度都减小
//  for($i=0;$i<$count;$i++){
//    unset($row[$i]);//删除冗余数据
//  }
//  array_push($arr,$row);
//
//}
//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
//mysqli_close($con);

?>