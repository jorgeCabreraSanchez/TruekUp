<?php
class WebDB {
    
    protected $mysqli;
    const LOCALHOST = '127.0.0.1';
    const USER = 'root';
    const PASSWORD = 'root';
    const DATABASE = 'bdtruekup';

    public function __construct() {
        try{
            $this->mysqli = new mysqli(self::LOCALHOST, self::USER, self::PASSWORD, self::DATABASE);
            mysqli_set_charset($this->mysqli, "utf8");	
        }catch (mysqli_sql_exception $e){
            http_response_code(500);
            exit;
        }  
    } 

    //USUARIOS

    public function getUsuario($id=0){      
        $stmt = $this->mysqli->prepare("SELECT * FROM usuarios WHERE id=? ; ");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();        
        $usuarios = $result->fetch_all(MYSQLI_ASSOC); 
        $stmt->close();
        return $usuarios;              
    }
    
    
    public function getUsuarios(){        
        $result = $this->mysqli->query('SELECT * FROM usuarios');          
        $usuarios = $result->fetch_all(MYSQLI_ASSOC);          
        $result->close();
        return $usuarios; 
    }
    
    
    public function insertUsuario($nombre='', $email='', $contraseña='', $imagen='', $fechaAlta='', $direccion='', $provincia='', $fechaNacimiento=''){
        $stmt = $this->mysqli->prepare("INSERT INTO usuarios(nombre, email, contraseña, imagen, fechaAlta, direccion, provincia, fechaNacimiento) VALUES (?,?,?,?,?,?,?,?);");
        //ssdi significa String String Decimal Integer
        $stmt->bind_param('ssssssss', $nombre, $email, $contraseña, $imagen, $fechaAlta, $direccion, $provincia, $fechaNacimiento);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;        
    }
    
    
    public function deleteUsuario($id=0) {
        $stmt = $this->mysqli->prepare("DELETE FROM usuarios WHERE id = ?;");
        $stmt->bind_param('i', $id);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;
    }
    
    
	public function updateUsuario($id, $newNombre, $newEmail, $newDireccion, $newProvincia, $newFechaNacimiento) {
        if($this->checkIDUsuario($id)){
            $stmt = $this->mysqli->prepare("UPDATE usuarios SET nombre=?, email=?, direccion=?, provincia=?, fechaNacimiento=? WHERE id = ? ; ");
            $stmt->bind_param('sssssi', $newNombre, $newEmail, $newDireccion, $newProvincia, $newFechaNacimiento, $id);
            $r = $stmt->execute(); 
            $stmt->close();
            return $r;    
        }
        return false;
    }
    
    
	public function checkIDUsuario($id){
        $stmt = $this->mysqli->prepare("SELECT * FROM usuarios WHERE id=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            $stmt->store_result();    
            if ($stmt->num_rows == 1){                
                return true;
            }
        }        
        return false;
    }

    //USUARIOS

    public function getAdmin($id=0){      
        $stmt = $this->mysqli->prepare("SELECT * FROM administrador WHERE id=? ; ");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();        
        $usuarios = $result->fetch_all(MYSQLI_ASSOC); 
        $stmt->close();
        return $usuarios;              
    }
    
    
    public function getAdmins(){        
        $result = $this->mysqli->query('SELECT nombre, pass FROM administrador');          
        $usuarios = $result->fetch_all(MYSQLI_ASSOC);          
        $result->close();
        return $usuarios; 
    }
    
    
    public function insertAdmin($nombre='', $email='', $pass=''){
        $stmt = $this->mysqli->prepare("INSERT INTO administrador(nombre, email, pass) VALUES (?,?,?);");
        //ssdi significa String String Decimal Integer
        $stmt->bind_param('sss', $nombre, $email, $pass);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;        
    }
    
    
    public function deleteAdmin($id=0) {
        $stmt = $this->mysqli->prepare("DELETE FROM administrador WHERE id = ?;");
        $stmt->bind_param('i', $id);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;
    }
    
    
	public function updateAdmin($id, $newNombre, $newEmail, $newContraseña, $newImagen, $newFechaAlta, $newDireccion, $newProvincia, $newFechaNacimiento) {
        if($this->checkIDUsuario($id)){
            $stmt = $this->mysqli->prepare("UPDATE administrador SET nombre=?, email=?, contraseña=?, fechaAlta=? WHERE id = ? ; ");
            $stmt->bind_param('ssssi', $newNombre, $newEmail, $newContraseña, $newFechaAlta, $id);
            $r = $stmt->execute(); 
            $stmt->close();
            return $r;    
        }
        return false;
    }
    
    
	public function checkIDAdmin($id){
        $stmt = $this->mysqli->prepare("SELECT * FROM administrador WHERE id=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            $stmt->store_result();    
            if ($stmt->num_rows == 1){                
                return true;
            }
        }        
        return false;
    }

    //PRODUCTOS

    public function getProducto($id=0){      
        $stmt = $this->mysqli->prepare("SELECT * FROM productos WHERE idPropietario=? ; ");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();        
        $productos = $result->fetch_all(MYSQLI_ASSOC); 
        $stmt->close();
        return $productos;              
    }
    
    
    public function getProductos(){        
        $result = $this->mysqli->query('SELECT * FROM productos');          
        $productos = $result->fetch_all(MYSQLI_ASSOC);          
        $result->close();
        return $productos; 
    }
    
    
    public function insertProducto($idSubcategoria='', $idPropietario='', $nombre='', $descripcion='', $imagen='', $imagenes='', $caracteristicas='', $visible=''){
        $stmt = $this->mysqli->prepare("INSERT INTO productos(idSubcategoria, idPropietario, nombre, descripcion, imagen, imagenes, caracteristicas, visible) VALUES (?,?,?,?,?,?,?,?);");
        //ssdi significa String String Decimal Integer
        $stmt->bind_param('iissssss', $idSubcategoria, $idPropietario, $nombre, $descripcion, $imagen, $imagenes, $caracteristicas, $visible);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;        
    }
    
    
    public function deleteProducto($id=0) {
        $stmt = $this->mysqli->prepare("DELETE FROM productos WHERE id = ?;");
        $stmt->bind_param('i', $id);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;
    }
    
    
	public function updasteProducto($id, $newIdSubcategoria, $newIdPropietario, $newNombre, $newDescripcion, $newImagen, $newImagenes, $newCaracteristicas, $newVisible) {
        if($this->checkIDProducto($id)){
            $stmt = $this->mysqli->prepare("UPDATE productos SET idSubcategoria=?, idPropietario=?, nombre=?, descripcion=?, imagen=?, imagenes=?, caracteristicas=?, visible=? WHERE id = ? ; ");
            $stmt->bind_param('iissssssi', $newIdSubcategoria, $newIdPropietario, $newNombre, $newDescripcion, $newImagen, $newImagenes, $newCaracteristicas, $newVisible, $id);
            $r = $stmt->execute(); 
            $stmt->close();
            return $r;    
        }
        return false;
    }
    
    
	public function checkIDProducto($id){
        $stmt = $this->mysqli->prepare("SELECT * FROM productos WHERE id=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            $stmt->store_result();    
            if ($stmt->num_rows == 1){                
                return true;
            }
        }        
        return false;
    }

    //TRUEKES

    public function getTrueke($id=0){      
        $stmt = $this->mysqli->prepare("SELECT * FROM trades WHERE idTrade=? ; ");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();        
        $productos = $result->fetch_all(MYSQLI_ASSOC); 
        $stmt->close();
        return $productos;              
    }
    
    
    public function getTruekes(){        
        $result = $this->mysqli->query('SELECT * FROM trades');          
        $productos = $result->fetch_all(MYSQLI_ASSOC);          
        $result->close();
        return $productos; 
    }
    
    
    public function insertTrueke($idUsuario1='', $idUsuario2='', $idProducto1='', $idProducto2='', $fecha='', $estado=''){
        $stmt = $this->mysqli->prepare("INSERT INTO trades(idUsuario1, idUsuario2, idProducto1, idProducto2, fecha, estado) VALUES (?,?,?,?,?,?);");
        //ssdi significa String String Decimal Integer
        $stmt->bind_param('iiiiss', $idUsuario1, $idUsuario2, $idProducto1, $idProducto2, $fecha, $estado);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;        
    }
    
    
    public function deleteTrueke($id=0) {
        $stmt = $this->mysqli->prepare("DELETE FROM trades WHERE idTrade = ?;");
        $stmt->bind_param('i', $id);
        $r = $stmt->execute(); 
        $stmt->close();
        return $r;
    }
    
    
	public function updateTrueke($id, $newIdUsuario1, $newIdUsuario2, $newIdProducto1, $newIdProducto2, $newFecha, $newEstado) {
        if($this->checkIDProducto($id)){
            $stmt = $this->mysqli->prepare("UPDATE trades SET idUsuario1=?, idUsuario2=?, idProducto1=?, idProducto2=?, fecha=?, imagenes=?, estado=? WHERE idTrade = ? ; ");
            $stmt->bind_param('iiiissi', $idUsuario1, $idUsuario2, $idProducto1, $idProducto2, $fecha, $estado, $id);
            $r = $stmt->execute(); 
            $stmt->close();
            return $r;    
        }
        return false;
    }
    
    
	public function checkIDTrueke($id){
        $stmt = $this->mysqli->prepare("SELECT * FROM trades WHERE idTrade=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            $stmt->store_result();    
            if ($stmt->num_rows == 1){                
                return true;
            }
        }        
        return false;
    }
    
}