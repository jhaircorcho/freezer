<?php

$conexion = mysqli_connect('localhost','root','','olimpicaaa');

$fechaalarma=$_POST['fechaalarma'];
$equipo=$_POST['equipo'];
$parametro=$_POST['parametro'];
$DescripcionFalla=$_POST['falla'];
$dato=(int)$_POST['dato'];

$sinfecha = "2000-01-01";


$sql = "INSERT INTO alarmas (ReporteNo,FechaAlarma,EquipoNo,Parametro,DescripcionFalla,DatoMedido,FechaOT,FechaCorrecion)
VALUES ('No01','$fechaalarma','$equipo','$parametro','$DescripcionFalla','$dato','$sinfecha','$sinfecha')";

echo mysqli_query($conexion,$sql);


?>