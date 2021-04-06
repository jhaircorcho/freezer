 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB7DsXMnyVWr6xntIxYopnuuojrrmGpiRM",
    authDomain: "freezer-280fc.firebaseapp.com",
    projectId: "freezer-280fc",
    storageBucket: "freezer-280fc.appspot.com",
    messagingSenderId: "392792404358",
    appId: "1:392792404358:web:ce92e0e5fc1f81d0a5bc07",
    measurementId: "G-W9T2P252TB"
  };
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();

  function LoginFirebase(){

    var DatoUsuario = $.trim($("#usuario").val());
    var DatoContrasena = $.trim($("#contrasena").val());
    var usuario = [];
    var contrasena = [];

    app.database().ref("usuarios").on('value',(snapshot) => {
      snapshot.forEach((childSnapshot) =>{
        usuario.push(childSnapshot.val().Usuario);  
        contrasena.push(childSnapshot.val().Contrasena);   
     });
    
    if(usuario==DatoUsuario){
      Swal.fire({
                icon: 'success',
                title:'Ingresa al sistema',
               
              }).then((result)=>{
                if(result.value){
                  window.location.href = "contenido.php";
                }
              })
            }else {
              Swal.fire({
                icon: 'error',
                title:'El usuario y/o la contraseña son incorrectos',
              });
              alert('no coincide');
            }
    });
  }


  function SelectDatosFirebase(){

    var noEquipo = $("#selEquipo").val();
    var parametroMed = $("#selParametro").val();
    var id;
    var fechas = [];
    var datomedir = [];
    var titulomedido;
    var UnidadMedidaY;
    var colorparametro = [];
    var colorlinea;

    app.database().ref(noEquipo).limitToLast(10).on('value',(snapshot) => {
      snapshot.forEach((childSnapshot) =>{
         fechas.push(childSnapshot.val().Fecha);   
         if (parametroMed=="TempAmbiente"){
          datomedir.push(childSnapshot.val().TempAmbiente);
        }else if (parametroMed=="TempCompresor"){
          datomedir.push(childSnapshot.val().TempCompresor);
        }else if (parametroMed=="TempFreezer"){
          datomedir.push(childSnapshot.val().TempFreezer);
        }else if (parametroMed=="TempRefrigerador"){
          datomedir.push(childSnapshot.val().TempRefrigerador);
        }else if (parametroMed=="VibCompresor"){
          datomedir.push(childSnapshot.val().VibCompresor);
        }else if (parametroMed=="Voltaje"){
          datomedir.push(childSnapshot.val().Voltaje);
        }else if (parametroMed=="Correinte"){
          datomedir.push(childSnapshot.val().Correinte);
        }else if (parametroMed=="Humedad"){
          datomedir.push(childSnapshot.val().Humedad);
        }
         
     });
     
    for (var i=0; i < fechas.length; i++){
      //[fila][columna] de la tabla de la base de datos
    
      if (parametroMed=="TempAmbiente"){
         document.getElementById("graficoTempAmbiente").style.display="block";
         document.getElementById("graficoTempFreezer").style.display="none";
         document.getElementById("graficoTempRefrigerador").style.display="none";
         document.getElementById("graficoTempCompresor").style.display="none";
         document.getElementById("graficoVibCompresor").style.display="none";
         document.getElementById("graficoCorriente").style.display="none";
         document.getElementById("graficoVoltaje").style.display="none";
         document.getElementById("graficoHumedad").style.display="none";
           id='graficoTempAmbiente';
           titulomedido='Temperatura Ambiente';
           UnidadMedidaY='°F';
           colorlinea='#E19419';
           if(datomedir[i]<146 || datomedir[i]>150){
             colorparametro.push("#F0340C")
           }else{
             colorparametro.push("#3cba9f")
           }
        }
 
      // parametros presion baja 
      if (parametroMed=="TempFreezer"){
        document.getElementById("graficoTempAmbiente").style.display="none";
        document.getElementById("graficoTempFreezer").style.display="block";
        document.getElementById("graficoTempRefrigerador").style.display="none";
        document.getElementById("graficoTempCompresor").style.display="none";
        document.getElementById("graficoVibCompresor").style.display="none";
        document.getElementById("graficoCorriente").style.display="none";
        document.getElementById("graficoVoltaje").style.display="none";
        document.getElementById("graficoHumedad").style.display="none";
          id='graficoTempFreezer';
          titulomedido='Temperatura del freezer'
          UnidadMedidaY='°F';
          colorlinea='#22D8E9';
          if(datomedir[i]<40 || datomedir[i]>60){
            colorparametro.push("#F0340C")
          }else{
            colorparametro.push("#3cba9f")
          }
     }
 
       // parametros corriente
       if (parametroMed=="TempRefrigerador"){
         document.getElementById("graficoTempAmbiente").style.display="none";
         document.getElementById("graficoTempFreezer").style.display="none";
         document.getElementById("graficoTempRefrigerador").style.display="block";
         document.getElementById("graficoTempCompresor").style.display="none";
         document.getElementById("graficoVibCompresor").style.display="none";
         document.getElementById("graficoCorriente").style.display="none";
         document.getElementById("graficoVoltaje").style.display="none";
         document.getElementById("graficoHumedad").style.display="none";
         id='graficoTempRefrigerador';
       titulomedido='Temperatura del refrigerador'
       UnidadMedidaY='°F';
       colorlinea='#9722E9';
       if(datomedir[i]<10 || datomedir[i]>20){
         colorparametro.push("#F0340C")
       }else{
         colorparametro.push("#3cba9f")
       }
     }
 
      // parametros consumo
      if (parametroMed=="TempCompresor"){
          document.getElementById("graficoTempAmbiente").style.display="none";
          document.getElementById("graficoTempFreezer").style.display="none";
          document.getElementById("graficoTempRefrigerador").style.display="none";
          document.getElementById("graficoTempCompresor").style.display="block";
          document.getElementById("graficoVibCompresor").style.display="none";
          document.getElementById("graficoCorriente").style.display="none";
          document.getElementById("graficoVoltaje").style.display="none";
          document.getElementById("graficoHumedad").style.display="none";
       id='graficoTempCompresor';
       titulomedido='Temperatura del compresor'
       UnidadMedidaY='°F';
       colorlinea='#AD22E9';
       if(datomedir[i][1]< 12|| datomedir[i][1]>16){
         colorparametro.push("#F0340C")
       }else{
         colorparametro.push("#3cba9f")
       }
     }
 
      // parametros temp condensador
      if (parametroMed=="VibCompresor"){
          document.getElementById("graficoTempAmbiente").style.display="none";
          document.getElementById("graficoTempFreezer").style.display="none";
          document.getElementById("graficoTempRefrigerador").style.display="none";
          document.getElementById("graficoTempCompresor").style.display="none";
          document.getElementById("graficoVibCompresor").style.display="block";
          document.getElementById("graficoCorriente").style.display="none";
          document.getElementById("graficoVoltaje").style.display="none";
          document.getElementById("graficoHumedad").style.display="none";
       id='graficoVibCompresor';
       titulomedido='Vibración del condensador'
       UnidadMedidaY='Hz';
       colorlinea='#CE15E2';
       if(datomedir[i]<10 || datomedir[i]>20){
         colorparametro.push("#F0340C")
       }else{
         colorparametro.push("#3cba9f")
       }
     }
 
   
        // parametros temp. evaporador
        if (parametroMed=="Correinte"){
            document.getElementById("graficoTempAmbiente").style.display="none";
            document.getElementById("graficoTempFreezer").style.display="none";
            document.getElementById("graficoTempRefrigerador").style.display="none";
            document.getElementById("graficoTempCompresor").style.display="none";
            document.getElementById("graficoVibCompresor").style.display="none";
            document.getElementById("graficoCorriente").style.display="block";
            document.getElementById("graficoVoltaje").style.display="none";
            document.getElementById("graficoHumedad").style.display="none";
         id='graficoCorriente';
           titulomedido='Consumo de corriente'
           UnidadMedidaY='A';
           colorlinea='#E21556';
           if(datomedir[i][1]>25){
             colorparametro.push("#F0340C")
           }else{
             colorparametro.push("#3cba9f")
           }
     }
 
      // parametros RPM ventilador
      if (parametroMed=="Voltaje"){
            document.getElementById("graficoTempAmbiente").style.display="none";
            document.getElementById("graficoTempFreezer").style.display="none";
            document.getElementById("graficoTempRefrigerador").style.display="none";
            document.getElementById("graficoTempCompresor").style.display="none";
            document.getElementById("graficoVibCompresor").style.display="none";
            document.getElementById("graficoCorriente").style.display="none";
            document.getElementById("graficoVoltaje").style.display="block";
            document.getElementById("graficoHumedad").style.display="none";
       id='graficoVoltaje';
       titulomedido='Voltaje'
       UnidadMedidaY='V';
       colorlinea='#8852A6';
       if(datomedir[i]<1300 || datomedir[i]>1500){
         colorparametro.push("#F0340C")
       }else{
         colorparametro.push("#3cba9f")
       }
     }
 
      // parametros Flujo
      if (parametroMed=="Humedad"){
            document.getElementById("graficoTempAmbiente").style.display="none";
            document.getElementById("graficoTempFreezer").style.display="none";
            document.getElementById("graficoTempRefrigerador").style.display="none";
            document.getElementById("graficoTempCompresor").style.display="none";
            document.getElementById("graficoVibCompresor").style.display="none";
            document.getElementById("graficoCorriente").style.display="none";
            document.getElementById("graficoVoltaje").style.display="none";
            document.getElementById("graficoHumedad").style.display="block";
       id='graficoHumedad';
       titulomedido='Humedad del Ambiente'
       UnidadMedidaY='%';
       colorlinea='#50249D';
       if(datomedir[i]<32 || datomedir[i]>35){
         colorparametro.push("#F0340C")
       }else{
         colorparametro.push("#3cba9f")
       }
     }

   }

    

   var ctx = document.getElementById(id);
   var myChart = new Chart(ctx, {
       type: 'line',
       data: {
           labels: fechas,
           datasets: [{
               label: titulomedido,
               data: datomedir,
               borderColor: colorlinea,
               pointBorderColor:colorparametro,
               borderWidth: 5,
               fill: false
           }]
       },
       options: {
           scales: {
               yAxes: [{
                 scaleLabel: {
                     display:true,
                     labelString:UnidadMedidaY
                 },
                   ticks: {
                       beginAtZero: true
                   }
               }]
           }
       }
   });
   myChart.update();


    });
    


   


      
      


    


  }