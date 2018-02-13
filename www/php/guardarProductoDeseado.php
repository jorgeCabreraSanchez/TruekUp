<?php
require_once 'configBD.php';
$datos=[];
session_start();
$idProducto=$_POST['key'];
$id=$_SESSION['id'];
$sql="INSERT INTO deseados VALUES('$id','$idProducto')";
mysqli_query($conn,$sql);
$conn->close();
?>