<?php

	require_once 'configBD.php';
session_start();
$datos=[];
$idProducto=$_POST['key'];
$id  = $_SESSION['id'];
$id=$_SESSION['id'];
$sql="DELETE FROM deseados where idUsuario='$id' AND idProducto='$idProducto'";
mysqli_query($conn,$sql);
?>