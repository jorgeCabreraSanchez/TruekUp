<?php
session_start();
$data = $_POST['dato1'];
$usuario=$_SESSION['id'];
$usuario2=$_POST['dato2'];
$file = 'logs/chatLog'.$usuario."-".$usuario2.'.txt';

if (isset($data)) {
    $fp = fopen($file, "a+");
    fwrite($fp, utf8_decode($data));
    fclose($fp);
    chmod($file, 0777);
    // echo 'Se han guardado correctamente la información en el txt!';
}
else {
    echo 'No hay datos que guardar!';
}
?>