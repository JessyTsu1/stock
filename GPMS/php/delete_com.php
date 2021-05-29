<?php
$data=$_POST['data'];
include_once('conn.php');
$de_json = json_decode($data,TRUE);
$count_json = count($de_json);
include_once('conn2.php');
for ($i = 0; $i < $count_json; $i++)
{
    $cid = $de_json[$i]['cid'];
    $sql = "delete from combination where cid=$cid";
    $query = mysqli_query($con2,$sql);
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