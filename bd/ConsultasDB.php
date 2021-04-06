<?php

use function PHPSTORM_META\elementType;

class ConsultasDB{
    private $conexion;
    function __construct()
    {
        require_once('conexion_graficos.php');
        $this->conexion=new conexion();
        $this->conexion->Conectar();
    }

   
    
    function TraerAlarmas(){
      
        // $equipo="equipo01";
        // $parametro="PresionAlta";
            // $sql = "SELECT Fecha, $parametro FROM $equipo WHERE (Fecha) < ((NOW() - INTERVAL 1 HOUR))"; // llama los datos regitrados en la ultima hora
            // $sql = "SELECT Fecha, $parametro FROM $equipo  WHERE DATE(Fecha) = CURDATE()"; // llama los datos regitrados en la ultima fecha registrada
             $sql = "SELECT EquipoNo, FechaAlarma, DescripcionFalla FROM alarmas"; // llama los ultimos doce datos regitrados 
            //$sql = "SELECT Fecha, AVG($parametro) FROM $equipo "; //llama la fecha y promedio del parametro

            //$sql = "SELECT Fecha, $parametro FROM $equipo ";


            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }




    function TraerDatoGrafico($equipo,$parametro){
      
        // $equipo="equipo01";
        // $parametro="PresionAlta";
            // $sql = "SELECT Fecha, $parametro FROM $equipo WHERE (Fecha) < ((NOW() - INTERVAL 1 HOUR))"; // llama los datos regitrados en la ultima hora
            // $sql = "SELECT Fecha, $parametro FROM $equipo  WHERE DATE(Fecha) = CURDATE()"; // llama los datos regitrados en la ultima fecha registrada
             $sql = "SELECT Fecha, $parametro FROM $equipo ORDER BY Fecha DESC LIMIT 12"; // llama los ultimos doce datos regitrados 
            //$sql = "SELECT Fecha, AVG($parametro) FROM $equipo "; //llama la fecha y promedio del parametro

            //$sql = "SELECT Fecha, $parametro FROM $equipo ";


            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }


    function TraerGraficoProyects(){
      
            $sql = "SELECT LaborNo, Cod, Labor, TiempoEstandar FROM proyeccion WHERE Parametro = 'PresionBaja'"; // llama los ultimos doce datos regitrados 
         
            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }


    function Alarma($equipo,$parametro){
      
        if($parametro=="PresionAlta"){
         //   $sql = "SELECT $equipo.Fecha, $equipo.$parametro FROM $equipo WHERE $equipo.PresionAlta < 120 ||  $equipo.PresionAlta > 240 group by DATE($equipo.Fecha)";
            $sql = "SELECT DATE($equipo.Fecha), $equipo.$parametro FROM $equipo, alarmas WHERE $equipo.PresionAlta < 120 OR $equipo.PresionAlta > 240  AND DATE($equipo.Fecha) > DATE(alarmas.FechaOT)  group by DATE($equipo.Fecha)";
        }
          
        elseif($parametro=="PresionBaja"){
           
            $Buscarsql = "SELECT * FROM alarmas WHERE Parametro= $parametro";
            $consulta = $this->conexion->conexion->query($Buscarsql);
            $número_filas = mysqli_num_rows($consulta);

            if ($número_filas>0){

                $sql = "SELECT FechaAlarma, $parametro FROM $equipo WHERE $parametro < 10  OR $parametro > 18 AND (SELECT MIN(Fecha) FROM $equipo) group by DATE(Fecha)";
            }else{

                $fechaalarma="SELECT Fecha MIN(Fecha) FROM $equipo WHERE $parametro < 10  OR $parametro > 18 AND (SELECT MIN(Fecha) FROM $equipo)";

                // $sql = "INSERT INTO alarmas (ReporteNo,FechaAlarma,EquipoNo,Parametro,DescripcionFalla,DatoMedido,FechaOT,FechaCorrecion)
                // VALUES ('No01','$fechaalarma','$equipo','$parametro','$DescripcionFalla','$dato','$sinfecha','$sinfecha')";

                //  echo mysqli_query($conexion,$sql);





                $sql =  "SELECT ($equipo.Fecha) as Fecha,  $equipo.$parametro as Parametro 
                FROM  $equipo 
                LEFT OUTER JOIN alarmas
                ON ($equipo.Fecha) = (alarmas.FechaAlarma)
                group by DATE($equipo.Fecha)" ;
            }

           
        
        }

        elseif($parametro=="Corriente"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Corriente < 10  || Corriente > 18 group by DATE(Fecha)";
        }

        elseif($parametro=="Consumo"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Consumo < 25  || Consumo > 38 group by DATE(Fecha)";
        }

        elseif($parametro=="TempCondensador"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE TempCondensador < 35  || TempCondensador > 55 group by DATE(Fecha)";
        }

        elseif($parametro=="TempEvaporador"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE TempEvaporador < 16  || TempEvaporador > 55 group by DATE(Fecha)";
        }

        elseif($parametro=="VelVentilador"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE VelVentilador < 900  || VelVentilador > 2500 group by DATE(Fecha)";
        }

        elseif($parametro=="Flujo"){
            $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Flujo < 25  || Flujo > 40 group by DATE(Fecha)";
        }


            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }

    function Alarmas($equipo,$parametro){
      
        if($parametro=="PresionAlta"){
           
        //    $sql = "SELECT Fecha, $parametro FROM $equipo WHERE PresionAlta < 120 OR  PresionAlta > 240  AND DATE(Fecha)  !=  (SELECT DATE(Fecha) FROM Alarmas WHERE CodFalla =$parametro AND EquipoNo=$equipo) group by DATE(Fecha)";
        }
          
        // elseif($parametro=="PresionBaja"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE PresionBaja < 30 ||  PresionBaja > 70  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }

        // elseif($parametro=="Corriente"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Corriente < 10  || Corriente > 18  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }

        // elseif($parametro=="Consumo"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Consumo < 25  || Consumo > 38  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }

        // elseif($parametro=="TempCondensador"){
             $sql = "SELECT Date(Fecha, $parametro FROM $equipo WHERE TempCondensador < 35  || TempCondensador > 55  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
         //      $sql = "SELECT $equipo.Date(Fecha), $equipo.$parametro FROM $equipo, alarmas WHERE  $equipo.TempCondensador < 35 $equipo.TempCondensador > 55 || $equipo.Date(Fecha)=alarmas.Fecha  group by DATE($equipo.Fecha)";
        // }

        // elseif($parametro=="TempEvaporador"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE TempEvaporador < 16  || TempEvaporador > 55  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }

        // elseif($parametro=="VelVentilador"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE VelVentilador < 900  || VelVentilador > 2500  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }

        // elseif($parametro=="Flujo"){
        //     $sql = "SELECT Fecha, $parametro FROM $equipo WHERE Flujo < 25  || Flujo > 40  && Fecha  <>  (SELECT Fecha FROM Alarmas WHERE CodFalla =$parametro && EquipoNo=$equipo) group by DATE(Fecha)";
        // }


            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }

    function generadorproject($parametrosel){
      
      
            $sql = "SELECT * FROM proyeccion WHERE Parametro = '$parametrosel' ";
       
            $arreglo =array();
            if($consulta = $this->conexion->conexion->query($sql)){
    
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion=null;
            }
    }

   

   

}



?>
