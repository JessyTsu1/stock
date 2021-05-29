<?php
$oldcid=$_POST['oldcid'];
$newcid=$_POST['newcid'];
$data=$_POST['data'];
$de_json = json_decode($data,TRUE);
$count_json = count($de_json);
for ($i = 0; $i < $count_json; $i++)
{
    include_once('conn.php');
    $code = $de_json[$i]['code'];
    $sql1 = "select * from com_ps where cid =".$newcid." and code = '".$code."'";
    $query1 = mysqli_query($con,$sql1);
    $cnt = mysqli_num_rows($query1);
    include_once('conn2.php');
    if($cnt<1) {
        $sql2 = "update com_ps set cid =".$newcid." where cid=". $oldcid." and code='". $code."'";
        $query2 = mysqli_query($con2, $sql2);
        if (!$query2) {
            break;
        }
    }
    else{
        $sql2 = "delete from com_ps where cid =".$oldcid." and code ='".$code."'";
        $query2 = mysqli_query($con2, $sql2);
        if (!$query2) {
            break;
        }
    }
}
if($i==$count_json){
    echo 1;
}
else{
    echo 0;
}
?>
