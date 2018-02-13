<?php
    if (isset($_FILES["imagenPerfil"]["type"])) {
        $validextensions = array("jpeg", "jpg", "png","JPEG", "JPG", "PNG");
        $temporary = explode(".", $_FILES["imagenPerfil"]["name"]);
        $file_extension = end($temporary);

        if ((
        ($_FILES["imagenPerfil"]["type"] == "image/png") ||
         ($_FILES["imagenPerfil"]["type"] == "image/jpg") ||
          ($_FILES["imagenPerfil"]["type"] == "image/jpeg")||
          ($_FILES["imagenPerfil"]["type"] == "image/PNG") ||
           ($_FILES["imagenPerfil"]["type"] == "image/JPG") ||
           ($_FILES["imagenPerfil"]["type"] == "image/JPEG")
        ) && ($_FILES["imagenPerfil"]["size"] < 100000)//Approx. 100kb files can be uploaded.
        && in_array($file_extension, $validextensions)) {
            if ($_FILES["imagenPerfil"]["error"] > 0) {
                print_r("Return Code: " . $_FILES["imagenPerfil"]["error"] . "<br/><br/>");
            } else {
                if (file_exists("../images/usuarios/" . $_FILES["imagenPerfil"]["name"])) {
                    print_r($_FILES["imagenPerfil"]["name"] . " <span id='invalid'><b>already exists.</b></span> ");
                } else {
                    $sourcePath = $_FILES['imagenPerfil']['tmp_name']; // Storing source path of the file in a variable
$targetPath = "../images/usuarios/".basename($_FILES['imagenPerfil']['name']); // Target path where file is to be stored
                   // print("SOURCE ".$sourcePath."<br>\n");
                    // print("TARGET ".$targetPath."<br>\n");


move_uploaded_file($_FILES['imagenPerfil']['tmp_name'], $targetPath) ; // Moving Uploaded file
                    // print("<span id='success'>Image Uploaded Successfully...!!</span><br/>\n");
                    // print("<br/><b>File Name:</b> " . $_FILES["imagenPerfil"]["name"] . "<br>\n");
                    // print("<b>Type:</b> " . $_FILES["imagenPerfil"]["type"] . "<br>\n");
                    // print("<b>Size:</b> " . ($_FILES["imagenPerfil"]["size"] / 1024) . " kB<br>\n");
                    // print("<b>Temp file:</b> " . $_FILES["imagenPerfil"]["tmp_name"] . "<br>");

                    //thumb

                    $ruta = $targetPath;
                    $original = imagecreatefromjpeg($ruta);
                    //cortamos el nombre
                    $arrayInfoNombre = pathinfo($targetPath);
                    print_r($arrayInfoNombre['filename']);


                    $targetPathThumb = "../images/usuarios/".basename($arrayInfoNombre['filename']."-35x30.jpg");
                    $thumb = imagecreatetruecolor(35, 30);
                    $imgOriginalAncho = imagesx($original); //ancho del original
      $imgOriginalAlto = imagesy($original);  //largo del original
      imagecopyresampled($thumb, $original, 0, 0, 0, 0, "35", "30", $imgOriginalAncho, $imgOriginalAlto);
                    $rutaDestino = $targetPathThumb;
                    imagejpeg($thumb, $rutaDestino, 50);
                }
            }
        } else {
            echo "<span id='invalid'>***Invalid file Size or Type***<span>";
        }
    }


?>