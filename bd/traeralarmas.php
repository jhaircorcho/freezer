<?php
    require 'ConsultasDB.php';
  

    $MG1 = new ConsultasDB();
    $consulta1 = $MG1 ->TraerAlarmas();
    echo json_encode($consulta1);

?>