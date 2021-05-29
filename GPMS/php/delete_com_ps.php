<?php
$data=$_POST['data'];
include_once('conn.php');
$de_json = json_decode($data,TRUE);
$count_json = count($de_json);
for ($i = 0; $i < $count_json; $i++)
{
    $cid = $de_json[$i]['cid'];
    $code = $de_json[$i]['code'];
    $sql = "delete from com_ps where cid=$cid and code='$code'";
    $query = mysqli_query($con,$sql);
    if (!$query) {
        break;
    }
}
if($i==$count_json){
   echo 1;
}
else{
   echo 0;
}
?>
