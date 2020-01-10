<?php

# 插入一行数据到数据库中的SQL语句
# INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES ('1', 'zs', '123456', '18681538888');

# 查询user表中的所有数据
# SELECT * FROM user

# 查询user表中的所有的username
# SELECT username FROM user

# 查询user表中username等于zs的这一条数据
# SELECT * FROM user WHERE username="zs";

# 注册
# (1) 检查数据库中指定的用户名是否存在，如果存在那么返回错误信息(注册失败，用户名已经被使用！)
# (2) 如果该用户名在数据库不存在，那么就往数据库中插入一条数据，并且返回注册成功！

//获取客户端提交的参数
// print_r($_REQUEST);
$password = $_REQUEST["password"];
$email = $_REQUEST["email"];

# 连接数据库： 第一个参数是地址、管理员名字、密码空、你创建的数据库名字
$db = mysqli_connect("127.0.0.1","root","","moxi");
// print_r($db);

//数据库语句
// $sql="INSERT INTO `jk`.`user` (`id`, `email`, `username`, `password`) VALUES (NULL, $email, '$username', '$password')";
// echo $sql;

//查询user表中email等于$email的这一条数据
$sql1="SELECT * FROM user WHERE email='$email'";
$result=mysqli_query($db,$sql1);
// print_r($res); 
// mysqli_result Object
// (
//     [current_field] => 0
//     [field_count] => 4
//     [lengths] => 
//     [num_rows] => 1     返回一行
//     [type] => 0
// )
// print_r(mysqli_num_rows($res)); //拿到返回这个行数的语法

//因为服务器通常返回客户端的是json数据，所以我们需要到这样一个obj
// obj={status:"ok",data:{msg:"注册成功"}}
$obj = array("status"=>"", "data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 1)
{
   $obj["status"] = "error";//状态失败
   $obj["data"]["msg"] = "注册失败，该邮箱已经被使用！！！";
}else
{
    $sql="INSERT INTO `user` (`id`, `email`, `password`) VALUES (NULL, '$email', '$password')";
    //往数据库中插入数据
    mysqli_query($db, $sql);
    // var_dump($res); 
    $obj["status"] = "success";//状态成功
    $obj["data"]["msg"] = "恭喜您，注册成功！！！";
}

echo json_encode($obj,true);//返回给客户端


?>