<?php
$datos=[];
$idProducto=$_POST['key'];
$id=$_POST['key1'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="DELETE FROM deseados where idUsuario='$id' AND idProducto='$idProducto'";
mysqli_query($conn,$sql);
?>