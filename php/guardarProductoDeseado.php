<?php
session_start();
$datos=[];
$idProducto=$_POST['key'];
$id = $_SESSION['id'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="INSERT INTO deseados VALUES('$id','$idProducto')";
mysqli_query($conn,$sql);
?>