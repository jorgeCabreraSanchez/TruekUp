<?php
$datos=[];
$idProducto=$_POST['key'];
$id=$_POST['key1'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="INSERT INTO deseados VALUES('$id','$idProducto')";
mysqli_query($conn,$sql);
?>