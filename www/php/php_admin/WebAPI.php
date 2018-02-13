<?php
require_once 'WebDB.php';

class WebAPI {    
    
    
    function delete(){
        if( isset($_GET['action']) && isset($_GET['id']) ){
            if($_GET['action']=='usuarios'){                   
                $db = new WebDB();
                $db->deleteUsuario($_GET['id']);
                $this->response(204);                   
                exit;
            }elseif ($_GET['action']=='productos') {
				$db = new WebDB();
                $db->deleteProducto($_GET['id']);
                $this->response(204);                   
                exit;
			}elseif ($_GET['action']=='truekes') {
				$db = new WebDB();
                $db->deleteTrueke($_GET['id']);
                $this->response(204);                   
                exit;
			}
        }
        $this->response(400);
    }
    
    
    function update() {
		if( isset($_GET['action']) && isset($_GET['id']) ){
			if($_GET['action']=='usuarios'){
				$obj = json_decode( file_get_contents('php://input') );   
				$objArr = (array)$obj;
				if (empty($objArr)){                        
					$this->response(422,"error","Nothing to add. Check json");                        
				}else if(isset($obj->nombre)){
					$db = new WebDB();
					$db->updateUsuario($_GET['id'], $obj->nombre, $obj->email, $obj->direccion, $obj->provincia, $obj->fechaNacimiento);
					$this->response(200,"success","Record updated");                             
				}else{
					$this->response(422,"error","The property is not defined");                        
				}     
				exit;
			}elseif ($_GET['action']=='productos') {
				$obj = json_decode( file_get_contents('php://input') );   
				$objArr = (array)$obj;
				if (empty($objArr)){                        
					$this->response(422,"error","Nothing to add. Check json");                        
				}else if(isset($obj->nombre)){
					$db = new WebDB();
					$db->updateProducto($_GET['id'], $obj->idSubcategoria, $obj->idPropietario, $obj->nombre, $obj->descripcion, $obj->imagen, $obj->imagenes, $obj->caracteristicas, $obj->visible);
					$this->response(200,"success","Record updated");                             
				}else{
					$this->response(422,"error","The property is not defined");                        
				}     
				exit;
			}elseif ($_GET['action']=='truekes') {
				$obj = json_decode( file_get_contents('php://input') );   
				$objArr = (array)$obj;
				if (empty($objArr)){                        
					$this->response(422,"error","Nothing to add. Check json");                        
				}else if(isset($obj->idUsuario1)){
					$db = new WebDB();
					$db->updateTrueke($_GET['id'], $obj->idUsuario1, $obj->idUsuario2, $obj->idProducto1, $obj->idProducto2, $obj->fecha, $obj->estado);
					$this->response(200,"success","Record updated");                             
				}else{
					$this->response(422,"error","The property is not defined");                        
				}     
				exit;
			}
		}
		$this->response(400);
	}
    
    function save(){
		if($_GET['action']=='usuarios'){   
			$obj = json_decode( file_get_contents('php://input') );   
			$objArr = (array)$obj;
			if (empty($objArr)){
				$this->response(422,"error","Nothing to add. Check json");                           
			}else if(isset($obj->nombre)){
				$people = new WebDB();     
				$people->insertUsuario( $obj->nombre, $obj->email, $obj->contraseña, $obj->imagen, $obj->fechaAlta, $obj->direccion, $obj->provincia, $obj->fechaNacimiento);
				$this->response(200,"success","new record added");                             
			}else{
				$this->response(422,"error","The property is not defined");
			}
		}elseif ($_GET['action']=='productos') {
			$obj = json_decode( file_get_contents('php://input') );   
			$objArr = (array)$obj;
			if (empty($objArr)){
				$this->response(422,"error","Nothing to add. Check json");                           
			}else if(isset($obj->nombre)){
				$people = new WebDB();     
				$people->insertProducto( $obj->idSubcategoria, $obj->idPropietario, $obj->nombre, $obj->descripcion, $obj->imagen, $obj->imagenes, $obj->caracteristicas, $obj->visible);
				$this->response(200,"success","new record added");                             
			}else{
				$this->response(422,"error","The property is not defined");
			}
		}elseif ($_GET['action']=='truekes') {
			$obj = json_decode( file_get_contents('php://input') );   
			$objArr = (array)$obj;
			if (empty($objArr)){
				$this->response(422,"error","Nothing to add. Check json");                           
			}else if(isset($obj->idUsuario1)){
				$people = new WebDB();     
				$people->insertTrueke( $obj->idUsuario1, $obj->idUsuario2, $obj->idProducto1, $obj->idProducto2, $obj->fecha, $obj->estado);
				$this->response(200,"success","new record added");                             
			}else{
				$this->response(422,"error","The property is not defined");
			}
		}elseif ($_GET['action']=='admin') {
			$obj = json_decode( file_get_contents('php://input') );   
			$objArr = (array)$obj;
			if (empty($objArr)){
				$this->response(422,"error","Nothing to add. Check json");                           
			}else if(isset($obj->nombre)){
				$people = new WebDB();     
				$people->insertAdmin( $obj->nombre, $obj->email, $obj->pass);
				$this->response(200,"success","new record added");                             
			}else{
				$this->response(422,"error","The property is not defined");
			}
		} else{               
			$this->response(400);
		}  
	}
    
	function response($code=200, $status="", $message="") {
		http_response_code($code);
		if( !empty($status) && !empty($message) ){
			$response = array("status" => $status ,"message"=>$message);  
			echo json_encode($response,JSON_PRETTY_PRINT);    
		}            
	}   

	function get(){
		if($_GET['action']=='usuarios'){         
			$db = new WebDB();
			if(isset($_GET['id'])){
				$response = $db->getUsuario($_GET['id']);                
				echo json_encode($response,JSON_PRETTY_PRINT);
			}else{
				$response = $db->getUsuarios();              
				echo json_encode($response,JSON_PRETTY_PRINT);
			}
		}elseif ($_GET['action']=='productos') {
			$db = new WebDB();
			if(isset($_GET['id'])){
				$response = $db->getProducto($_GET['id']);                
				echo json_encode($response,JSON_PRETTY_PRINT);
			}else{
				$response = $db->getProductos();              
				echo json_encode($response,JSON_PRETTY_PRINT);
			}
		}elseif ($_GET['action']=='truekes') {
			$db = new WebDB();
			if(isset($_GET['id'])){
				$response = $db->getTrueke($_GET['id']);                
				echo json_encode($response,JSON_PRETTY_PRINT);
			}else{
				$response = $db->getTruekes();              
				echo json_encode($response,JSON_PRETTY_PRINT);
			}
		}elseif ($_GET['action']=='admin') {
			$db = new WebDB();
			if(isset($_GET['id'])){
				$response = $db->getAdmin($_GET['id']);                
				echo json_encode($response,JSON_PRETTY_PRINT);
			}else{
				$response = $db->getAdmins();              
				echo json_encode($response,JSON_PRETTY_PRINT);
			}
		}else{
            $this->response(400);
		}       
	}   
    
    public function API(){
        header('Content-Type: application/JSON');                
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
        case 'GET':
            $this->get();
            break;     
        case 'POST':
            $this->save();
            break;                
        case 'PUT':
            $this->update();
            break;      
        case 'DELETE':
            $this->delete();
            break;
        default: 
            $this->response(405);
            break;
        }
    }   
}
