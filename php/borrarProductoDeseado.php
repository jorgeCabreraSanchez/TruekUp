<?php
session_start();
$datos=[];
$idProducto=$_POST['key'];
$id  = $_SESSION['id'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="DELETE FROM deseados where idUsuario='$id' AND idProducto='$idProducto'";
mysqli_query($conn,$sql);
?>