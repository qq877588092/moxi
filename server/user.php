<?php
# (1) 先链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "moxi");
// print_r($db);
$email = $_REQUEST["email"];
$password = $_REQUEST["password"];
// print_r($_REQUEST);

# (2) 去数据库中查询看指定的用户名是否存在
$sql = "SELECT * FROM user WHERE email='$email'" ;
$result = mysqli_query($db,$sql);//查询数据库

$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 0)
{
  # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
  $data["status"] = "error";
//   $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  # (2-2) 如果用户名存在，接着检查密码
  $sql2 = "SELECT * FROM user WHERE email='$email'";//查询所有数据
  $res = mysqli_query($db,$sql2);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  $item=$data[0]["password"];
    //          Array
    //          (
    //              [0] => Array
    //                  (
    //                      [id] => 1
    //                      [email] => 13413312659
    //                      [username] => zs
    //                      [password] => w.123
    //                  )

    //          )
//   $item = mysqli_fetch_all($res, MYSQLI_ASSOC)[0]["password"];
//   print_r($item);
  if($password !=  $item)
  {
    # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
    $data["status"] = "error";
    // $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else
  {
    # (2-2-2) 密码正确，那么就返回数据(登录成功)
    $data["status"] = "success";
    // $data["data"]["msg"] = "恭喜你，登录成功";
  }
}

# 最后，需要把结果以JSON数据的方式返回
echo json_encode($data,true);
?>