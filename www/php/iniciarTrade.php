<?php
	require_once 'configBD.php';

    session_start();
    $id = intval($_SESSION['id']);
    $idProducto = intval($_GET['idProducto']);

            //Creat chat
            $sql = "INSERT into chats values (?,(SELECT idPropietario from productos where id=? and visible='0'));";
            if ($stmt = $conn -> prepare($sql)) {
            $stmt -> bind_param("ii",$id,$idProducto);
            $stmt -> execute(); 
            }

        $stmt -> close(); 


        //Crear Trade
        $sql = "INSERT into trades values (null,?,(SELECT idPropietario from productos where id=? and visible='0'),0,?,1,1,null,'Pendiente');";
        if ($stmt = $conn -> prepare($sql)) {
        $stmt -> bind_param("iii",$id,$idProducto,$idProducto);
        $stmt -> execute(); 

        }

        $stmt -> close();        
        
        //Retornar la id del trade insertado
        $sql = "SELECT @@identity AS id;";
        if ($stmt = $conn -> prepare($sql)) {        
        $stmt -> execute(); 
        $stmt->bind_result($idTrade);
        $stmt->fetch();     

        }        
        $stmt -> close(); 

        echo $idTrade;        
        $conn->close();
?>