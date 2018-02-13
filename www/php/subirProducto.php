<?php
session_start();
$usuario = $_SESSION['id'];
require_once 'configBD.php';

$nombre=$_POST['nombre'];
$nombreSubcategoria=$_POST['nombreSubcategoria'];
$nombreCategoria=$_POST['nombreCategoria'];
$idSubcategoria=$_POST['subcategoria'];
$descripcion=$_POST['descripcion'];
$imagenes=$_POST['imagenes'];
$imagenesInput=$_FILES['file']['name'];

// "/imagen".$id."-".$key.".png"



if (!empty($imagenes[0])) {
    
    $cadena = implode(",", $imagenes);
    $nombreImg=explode(",", $cadena);
    
    $sql="SELECT MAX(ID) AS id from productos";
    $idProducto=mysqli_query($conn,$sql);
    $id=mysqli_fetch_array($idProducto);
    $id=$id['id']+1;
    $rutaPrincipal="images/productos/".strtolower($nombreCategoria)."/".strtolower($nombreSubcategoria)."/imagen".$id."-0.png";
    $rutas="";
    foreach ($nombreImg as $key => $value) {
      $rutas.="images/productos/".strtolower($nombreCategoria)."/".strtolower($nombreSubcategoria)."/imagen".$id."-".$key.".png"." ";  
    }
    $rutas=substr($rutas, 0, -1);
    $sql="INSERT INTO productos VALUES($id,'$idSubcategoria','$usuario','$nombre','$descripcion','$rutaPrincipal','$rutas',null,0)";
    mysqli_query($conn,$sql);
 //subira la carpeta
    
    $Base64Img=json_decode($_POST['srcCortado'],true);

    foreach ($Base64Img as $key => $value) {
    $Base64 = base64_decode($value);
    file_put_contents("../images/productos/".strtolower($nombreCategoria)."/".str_replace(' ', '', strtolower($nombreSubcategoria))."/imagen".$id."-".$key.".png", $Base64); 
}


    
}else if(empty($imagenes[0]) && $_FILES['file']['error'][0]!='4'){

    $rutaP="images/productos/".strtolower($nombreCategoria)."/".strtolower($nombreSubcategoria)."/".$imagenesInput[0];
    $rutasCarrusel="";
    foreach ($imagenesInput as $key => $value) {
        $rutasCarrusel.="images/productos/".strtolower($nombreCategoria)."/".strtolower($nombreSubcategoria)."/".$value." ";
    }
    $rutasCarrusel=substr($rutasCarrusel, 0, -1);
    $sql="INSERT INTO productos VALUES(null,'$idSubcategoria','$usuario','$nombre','$descripcion','$rutaP','$rutasCarrusel',null,0)";
    mysqli_query($conn,$sql);

    $move="";
    foreach ($_FILES['file']['tmp_name'] as $key => $value) {
    
        $move = "../images/productos/".strtolower($nombreCategoria)."/".str_replace(' ', '', strtolower($nombreSubcategoria))."/".basename($_FILES['file']['name'][$key],$move);
        move_uploaded_file($_FILES['file']['tmp_name'][$key], $move);
}


}else if(empty($imagenes[0]) && $_FILES['file']['error'][0]=='4'){

    $respuesta="Tienes que publicar una imagen como minimo";
    echo $respuesta;
}

$conn->close();

?>
