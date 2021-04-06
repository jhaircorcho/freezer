<?php
//Creates new record as per request
    //Connect to database
    $servername = "localhost";		//example = localhost or 192.168.0.0
    $username = "root";		//example = root
    $password = "";	
    $dbname = "olimpicaaa";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Database Connection failed: " . $conn->connect_error);
        echo "no conecta";
    }else {
        echo "conecta";
    }

        $PresionAlta = (int)$_POST['PresionAlta'];
        $PresionBaja = (int)$_POST['PresionBaja'];
        $Corriente = (int)$_POST['Corriente'];
        $Consumo = (int)$_POST['Consumo'];
        $TempCondensador = (int)$_POST['TempCondensador'];
        $TempEvaporador = (int)$_POST['TempEvaporador'];
        $VelVentilador = (int)$_POST['VelVentilador'];
        $Flujo = (int)$_POST['Flujo'];

        if ( $PresionAlta < 120 OR $PresionAlta > 240){
                $EstPresionAlta = 'FP';
            }else{
                    $EstPresionAlta = 'Normal';
            }
        if ( $PresionBaja < 120 OR $PresionBaja > 240){
                $EstPresionBaja = 'Normal';
            }else{
                $EstPresionBaja = 'FP';
            }
        if ( $Corriente < 120 OR $Corriente > 240){
                $EstCorriente = 'FP';
            }else{
                $EstCorriente = 'Normal';
            }
        if ( $Consumo < 120 OR $Consumo > 240){
                $EstConsumo = 'FP';
            }else{
                $EstConsumo = 'Normal';
            }
        if ( $TempCondensador < 120 OR $TempCondensador > 240){
                $EstTempCondensador = 'FP';
            }else{
                $EstTempCondensador = 'Normal';
            }
        if ( $TempEvaporador < 120 OR $TempEvaporador > 240){
                $EstTempEvaporador = 'FP';
            }else{
                $EstTempEvaporador = 'Normal';
            }
        if ( $VelVentilador < 120 OR $VelVentilador > 240){
                $EstVelVentilador = 'FP';
            }else{
                $EstVelVentilador = 'Normal';
            }
        if ( $Flujo < 120 OR $Flujo > 240){
                $EstFlujo = 'FP';
            }else{
                $EstFlujo = 'Normal';
            }

        $sql = "INSERT INTO equipo01 (SerialNo, Modelo, Fecha, 
        PresionAlta, 
        EstadoPresionAlta,
        PresionBaja, 
        EstadoPresionBaja,
        Corriente, 
        EstadoCorriente,
        Consumo, 
        EstadoConsumo,
        TempCondensador,
        EstadoTempCondensador,
        TempEvaporador, 
        EstadoTempEvaporador, 
        VelVentilador,
        EstadoVelVentilador,
        Flujo,
        EstadoFlujo) 
        VALUES ('EQU001', 'AIRE152', CURRENT_TIMESTAMP, 
        '".$PresionAlta."', 
        '".$EstPresionAlta."', 
        '".$PresionBaja."', 
        '".$EstPresionBaja."', 
        '".$Corriente."', 
        '".$EstCorriente."', 
        '".$Consumo."', 
        '".$EstConsumo."', 
        '".$TempCondensador."', 
        '".$EstTempCondensador."',
        '".$TempEvaporador."', 
        '".$EstTempEvaporador."', 
        '".$VelVentilador."', 
        '".$EstVelVentilador."', 
        '".$Flujo."', 
        '".$EstFlujo."') ";
	 

		if ($conn->query($sql) === TRUE) {
		    echo "OK";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
//	}


	$conn->close();
?>