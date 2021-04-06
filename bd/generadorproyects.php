<?php
    require 'ConsultasDB.php';
    $parametrosel = $_POST['parametrosel'];

    $MG2 = new ConsultasDB();
    $consulta2 = $MG2 -> generadorproject($parametrosel);
    echo json_encode($consulta2);

?>