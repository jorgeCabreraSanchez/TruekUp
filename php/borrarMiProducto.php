<?php
session_start();
$datos=[];
$idProducto=$_POST['key'];
$id  = $_SESSION['id'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="DELETE FROM productos where id='$idProducto' AND idPropietario='$id'";
mysqli_query($conn,$sql);
?>