<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}
$tbl_name='usuarios';
$nombre = $_POST['nombre'];
$apellido = $_POST['apellidos'];
$email = $_POST['email'];
// $nombre = $_POST['registrarse-repiteemail'];
$password = $_POST['password'];
// $nombre = $_POST['registrarse-repitepassword'];

$buscarUsuario = "SELECT * FROM $tbl_name
                  WHERE email = '$_POST[email]' ";

$result = $conn->query($buscarUsuario);

$count = mysqli_num_rows($result);

if ($count == 1) {
echo "<br />". "El email ya ha sido registrado." . "<br />";
$buscarUsuario = "SELECT * FROM $tbl_name
                  WHERE email = '$_POST[username]' ";

$result = $conn->query($buscarUsuario);

$count = mysqli_num_rows($result);

if ($count == 1) {
    echo "<br />". "El email ya ha sido registrado.." . "<br />";
}
    echo "<a href='index.html'>Por favor escoga otro email</a>";
}
else{
    $query = "INSERT INTO Usuarios (nombre, apellidos, email, contraseña)
    VALUES ('$nombre','$apellido', '$email','$password')";

if ($conn->query($query) === TRUE) {

echo "<br />" . "<h2>" . "Usuario Creado Exitosamente!" . "</h2>";
echo "<h4>" . "Bienvenido: " . $_POST['nombre'] . "</h4>" . "\n\n";
echo "<h5>" . "Hacer Login: " . "<a href='../index.html'>Login</a>" . "</h5>"; 
}

else {
echo "Error al crear el usuario." . $query . "<br>" . $conn->error; 
}
}
mysqli_close($conn);


// $sql = "INSERT INTO usuarios ('id','nombre','apellidos','email',password')
//         VALUES( ,'$nombre','$apellido','$email','$password'";
// $stmt = $conn -> prepare($sql);
// $stmt -> execute();
?>