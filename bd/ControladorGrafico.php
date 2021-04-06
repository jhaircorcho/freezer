<?php
    require 'ConsultasDB.php';
    $equipo = $_POST['equipo'];
    $parametro = $_POST['parametro'];

    $MG = new ConsultasDB();
   // $consulta = $MG -> TraerDatoGrafico();
    $consulta = $MG -> TraerDatoGrafico($equipo,$parametro);
    echo json_encode($consulta);


?>