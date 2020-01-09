<?php
# 01-先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "moxi");

# 02-查询获取数据库所有的数据
$sql = "SELECT * FROM goods";

#计算页码的数据
$result = mysqli_query($db, $sql);
$count = ceil(mysqli_num_rows($result) / 40);//ceil向上取整，62/30=3页
#返回
$data =array("count"=>$count);
echo json_encode($data,true);
?>