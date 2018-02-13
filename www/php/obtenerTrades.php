<?php

require_once 'configBD.php';


    session_start();
    $id1 = number_format($_SESSION['id'],0,".","");
    $id2 = number_format($_GET['id2'],0,".","");
    // 
	$sql = "SELECT idTrade,idProducto1,idProducto2,usuario1Acepta,usuario2Acepta,'1' from trades where idUsuario1 = ? and idUsuario2 = ? and estado = 'Pendiente' union Select idTrade,idProducto2,idProducto1,usuario2Acepta,usuario1Acepta,'2' from trades where idUsuario2 = ? and idUsuario1 = ? and estado = 'Pendiente' ORDER BY 'idTrade' ASC";
        

    

    if ($stmt = $conn -> prepare($sql)) {        
        $stmt -> bind_param("iiii",$id1,$id2,$id1,$id2);
        $stmt -> execute();
        $stmt -> bind_result($idTrade,$idProducto1,$idProducto2,$usuario1Acepta,$usuario2Acepta,$posicion);                    
        while ($stmt->fetch()) {                                                    
            $trade[] = array($idProducto1,$idProducto2,$usuario1Acepta,$usuario2Acepta,$idTrade,$posicion);
        }
        //Termina el while del 1 if
        $stmt -> close();           
    }    

    
    foreach ($trade as $clave => $valor){
       
        $productos = [];

        $sql2 = "SELECT id,nombre,imagen from productos where id in (?,?)  ORDER BY FIELD(ID,?,?);";
            
            $idProducto1 = number_format($valor[0],0,".","");
            $idProducto2 = number_format($valor[1],0,".","");
            $i = 2;
            if ($stmt2 = $conn -> prepare($sql2)) { 
                
                $stmt2 -> bind_param("iiii",$idProducto1,$idProducto2,$idProducto1,$idProducto2);
                $stmt2 -> execute();
                $stmt2 -> bind_result($id,$nombre,$imagen);                    
                while ($stmt2->fetch()) {                                     
                    $productos[] =  array("id"=>$id,"nombre"=>$nombre,"imagen"=>$imagen,"aceptado"=>$valor[$i]); 
                    $i++;                                       
                }
                $productos[] = $valor[4];
                $productos[] = $valor[5];
             $stmt2 -> close();  

            } 
            $devolver[] = $productos;
    }

        
    echo json_encode($devolver);    
    $conn->close();
?>
