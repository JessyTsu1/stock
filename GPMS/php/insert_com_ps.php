<?php
include_once('conn.php');
$data=$_POST['data'];
$de_json = json_decode($data,TRUE);
$count_json = count($de_json);
if (!session_id()) session_start();
$uid=$_SESSION['uid'];

$sql1 = "select cid from combination where uid=".$uid." limit 1";
$stmt=$con->prepare($sql1);
$stmt->bind_result($cid);
$stmt->execute();
$stmt->fetch();

include_once('conn2.php');
$boo=true;
for ($i = 0; $i < $count_json; $i++)
{
    $code = $de_json[$i]['code'];
    $sql2 = "insert into com_ps values(".$cid.",'".$code."')";
    $query = mysqli_query($con2,$sql2);
    if (!$query) {
        $boo=false;
    }
}
if($boo==true){
    echo 1;
}
else{
    echo 0;
}
?>
