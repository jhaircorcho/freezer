<?php
    require 'ConsultasDB.php';
 
    $MG = new ConsultasDB();
   // $consulta = $MG -> TraerDatoGrafico();
    $consulta = $MG -> TraerGraficoProyects();
    echo json_encode($consulta);


?>