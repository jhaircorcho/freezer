<?php
    require 'ConsultasDB.php';
    $equipo = $_POST['equipo'];
    $parametro = $_POST['parametro'];

    $MG1 = new ConsultasDB();
    $consulta1 = $MG1 -> Alarma($equipo,$parametro);
    echo json_encode($consulta1);

?>