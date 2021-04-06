<?php

session_start(); // permite iniciar la seccion entre el usuario y el servidor y permite acceder los valores guardados en la variable $_SESSION
include_once 'conexion.php';
$objeto =new Conexion();
$conexion = $objeto->Conectar();

$usuario= (isset($_POST['usuario'])) ? $_POST['usuario']:'';
$password= (isset($_POST['contrasena'])) ? $_POST['contrasena']:'';

$pass= md5($password); // encrita la clave ingresada por el usuario y la compara  con la clave de la base de datos que tambien esta encrytada.

$consulta = "SELECT * FROM usuarios WHERE Usuario='$usuario' AND Contrasena = '$pass' ";

$resultado = $conexion->prepare($consulta);
$resultado->execute();

if($resultado->rowCount()>=1){
    $data = $resultado->fetchAll(PDO::FETCH_ASSOC); // fectchAll devuelve un array que contiene toda la fila del resultado
    $_SESSION["s_usuario"] = $usuario;
}else{
    $_SESSION["s_usuario"]= null;
    $data=null;
}

print json_encode($data);
$conexion=null;
