<?php
session_start();
$datos=[];
$idProducto=$_POST['key'];
$id  = $_SESSION['id'];
require_once 'configBD.php';
$sql="DELETE FROM productos where id='$idProducto' AND idPropietario='$id'";
mysqli_query($conn,$sql);
?>