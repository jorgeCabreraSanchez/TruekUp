<?php
$id=$_POST['key'];
$valor=$_POST['key1'];
session_start();
$idPropietario=$_SESSION['id'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="UPDATE productos SET visible='$valor' WHERE id='$id' and idPropietario='$idPropietario'";
mysqli_query($conn,$sql);
?>