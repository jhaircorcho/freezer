(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict


$(document).ready(function(){

  $('#ordentrabajo').click(function(){
    GetAlarmas();
    $('#contenido').load("vistas/ordenes_trabajo.php");
    
  });

  $('#sensores').click(function(){
    $('#contenido').load("vistas/monitor.php");
  });

  $('#planeacion').click(function(){
    $('#contenido').load("vistas/planer.php");
    Cargarproyects();
  });

});


function GetAlarmas(){
       
  $.ajax({
    url:'bd/traeralarmas.php',
    type:'POST',
    data:{
    }

  }).done(function(respon){
     var datapar = JSON.parse(respon);
    
       alert(datapar.length);
       
       for (var i=0; i < datapar.length; i++){

       $('#tablebody').prepend('<tr>'+
         '<td>'+(datapar[i][0])+'</td>'+  
         '<td>'+(datapar[i][1])+'</td>'+
         '<td>'+(datapar[i][2])+'</td>'+
         '</tr>');
     }
     cargartablas();
  })

}

function cargartablas() {
  $('#tablaordenes').DataTable();
   } ;

function GetSelectedValue(){
       
    var noEquipo = $("#selEquipo").val();
    var parametroMed = $("#selParametro").val();
    var unidad;
    var titulo;
    
    $.ajax({
      url:'bd/alarmas.php',
      type:'POST',
      data:{
        equipo:noEquipo,
        parametro:parametroMed
      }

    }).done(function(respon){
      alert(respon);
        var numeroalarmas = $('#subalarmas').find('div').length;
        if (numeroalarmas > 0){
            for (var i=0; i <= numeroalarmas; i++){
              $('#subalarmas').remove();
            }
        }
     
      var datapar = JSON.parse(respon);

      for (var i=0; i < datapar.length; i++){

     //[fila][columna] de la tabla de la base de datos
  
     if (parametroMed=="PresionAlta"){
         unidad="PSI";
         titulo="Presion Alta";
         
     }
     else if (parametroMed=="PresionBaja"){
         unidad="PSI";
         titulo="Presion Baja";
         
     }
     else if (parametroMed=="TempCondensador"){
         unidad="C";
         titulo="Temperatura del condensador";
     } 
     else if (parametroMed=="TempEvaporador"){
         unidad="C";
         titulo="Temperatura del evaporador";
     } 
     else if (parametroMed=="Corriente"){
         unidad="A";
         titulo="Corriente";
     } 
     else if (parametroMed=="Consumo"){
         unidad="KWh";
         titulo="Consumo de energia";
     } 
     else if (parametroMed=="VelVentilador"){
         unidad="RPM";
         titulo="RPM del ventilador";
     } 
     else if (parametroMed=="Flujo"){
         unidad="CFM";
         titulo="Flujo de aire";
     }

     $('#alarmas').prepend('<div id="subalarmas" class="d-flex border-bottom py-2 item justify-content-center">' +
      '<div class="d-flex border-bottom py-2 box">'+  
              '<div class="align-self-center">'+
                       '<span id="titulo" class="d-block badge rounded-pill bg-info onclick="document.getElementById("selParametro").style.color = "red"">'+titulo+'</span>'+
                        '<h3 id="dato" class="d-inline-block mb-0">' +(datapar[i][1])+ 
                        '<h3 id="unidad" class="d-inline-block mb-0">' +unidad+' </h3>'+
                        '<h6 id="fechaalarma" class="d-block mb-0" id="fechaa">' + (datapar[i][0])+ ' </h6>'+
                        '<span class="badge rounded-pill bg-danger">Por debajo de parametros</span>'+
                        '<div class="cover align-self-center">'+
                        '<div class="ot"><a id="pprueba" onclick="InsertarOT();" class="ottt" href="#"></i>Generar OT</a></div>'+ 
                        '</div>'+
              '</div>'+
      '</div>'+
      '</div>');
         
    }

    })

}

function CargarDatosGrafico(){
      
  var noEquipo = $("#selEquipo").val();
  var parametroMed = $("#selParametro").val();
  
  $.ajax({
    url:'bd/ControladorGrafico.php',
    type:'POST',
    data:{
      equipo:noEquipo,
      parametro:parametroMed
    }
  }).done(function(resp){
  //  alert(resp);
   if (resp.length>0){
    var id;
    var fechas = [];
    var datomedir = [];
    var titulomedido;
    var UnidadMedidaY;
    var colorparametro = [];
    var colorlinea;
    var datapar = JSON.parse(resp);
    for (var i=0; i < datapar.length; i++){
      //[fila][columna] de la tabla de la base de datos
      
      fechas.push(datapar[i][0]);
      datomedir.push(datapar[i][1]);


    // parametros presion alta 
    if (parametroMed=="PresionAlta"){
      document.getElementById("graficoPresionAlta").style.display="block";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
      id='graficoPresionAlta';
      titulomedido='Presion Alta';
      UnidadMedidaY='PSI';
      colorlinea='#E19419';
      if(datapar[i][1]<146 || datapar[i][1]>150){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

     // parametros presion baja 
     if (parametroMed=="PresionBaja"){
      document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="block";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
      id='graficoPresionBaja';
      titulomedido='Presion Baja'
      UnidadMedidaY='PSI';
      colorlinea='#22D8E9';
      if(datapar[i][1]<40 || datapar[i][1]>60){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

      // parametros corriente
      if (parametroMed=="Corriente"){
        document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="block";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
        id='graficoCorriente';
      titulomedido='Corriente'
      UnidadMedidaY='A';
      colorlinea='#9722E9';
      if(datapar[i][1]<10 || datapar[i][1]>20){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

     // parametros consumo
     if (parametroMed=="Consumo"){
      document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="block";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
      id='graficoConsumo';
      titulomedido='Consumo de potencia'
      UnidadMedidaY='KWh';
      colorlinea='#AD22E9';
      if(datapar[i][1]< 12|| datapar[i][1]>16){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

     // parametros temp condensador
     if (parametroMed=="TempCondensador"){
      document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="block";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
      id='graficoTempCondensador';
      titulomedido='Temperatura del condensador'
      UnidadMedidaY='C';
      colorlinea='#CE15E2';
      if(datapar[i][1]<10 || datapar[i][1]>20){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

  
       // parametros temp. evaporador
       if (parametroMed=="TempEvaporador"){
        document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="block";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="none";
        id='graficoTempEvaporador';
      titulomedido='Temperatura del condensador'
      UnidadMedidaY='C';
      colorlinea='#E21556';
      if(datapar[i][1]>25){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

     // parametros RPM ventilador
     if (parametroMed=="VelVentilador"){
      document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="block";
      document.getElementById("graficoFlujo").style.display="none";
      id='graficoVelVentilador';
      titulomedido='Velocidad del ventilador'
      UnidadMedidaY='RPM';
      colorlinea='#8852A6';
      if(datapar[i][1]<1300 || datapar[i][1]>1500){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
    }

     // parametros Flujo
     if (parametroMed=="Flujo"){
                     document.getElementById("graficoPresionAlta").style.display="none";
      document.getElementById("graficoPresionBaja").style.display="none";
      document.getElementById("graficoCorriente").style.display="none";
      document.getElementById("graficoConsumo").style.display="none";
      document.getElementById("graficoTempCondensador").style.display="none";
      document.getElementById("graficoTempEvaporador").style.display="none";
      document.getElementById("graficoVelVentilador").style.display="none";
      document.getElementById("graficoFlujo").style.display="block";
      id='graficoFlujo';
      titulomedido='Flujo'
      UnidadMedidaY='CFM';
      colorlinea='#50249D';
      if(datapar[i][1]<32 || datapar[i][1]>35){
        colorparametro.push("#F0340C")
      }else{
        colorparametro.push("#3cba9f")
      }
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
     })
  }




function Cargarproyects(){
      
    $.ajax({
      url:'bd/graficoproyects.php',
      type:'POST',
      data:{
        
      }
    }).done(function(resp){
     //  alert(resp);
     if (resp.length>0){
        var id;
        var Cod = [];
        var Labor = [];
        var LaborNo = [];
        var TiempoEstandar = [];
        var titulomedido;
        var UnidadMedidaY;
        var colorparametro = [];
        var DatosProyects = [];
        var colorlinea;
        var datapar = JSON.parse(resp);
          for (var i=0; i < datapar.length; i++){

          //[fila][columna] de la tabla de la base de datos
            LaborNo.push(datapar[i][0]);
            Cod.push(datapar[i][1]);
            Labor.push(datapar[i][2]);
            TiempoEstandar.push(datapar[i][3]);
          

          // parametros Flujo
          //  if (parametroMed=="PresionBaja"){
             //   document.getElementById("graficoPresionBaja").style.display="none"; 
                id='graficoPresionBaja';
                titulomedido='Poryect Presion Baja'
                Labores='CFM';
                colorlinea='#50249D';
                UnidadMedidaY= 'labores';
                colorparametro.push("#F0340C")
           //   }
            }
          }
                  
               var r;
               var g;
               var b;
               var ramdomcolor;
               var borderramdomcolor;

               var seconds = [];
               var minutos;
               var GraphDatasetsArray = [];
               var a = [];
               var valorsecuencial =0;
                  for (i=0; i < datapar.length; i++)
                      { 
                      a= TiempoEstandar[i].split(':');
                      seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
                      minutos = seconds/60;// split it at the colons

                       r = Math.floor(Math.random() * 255);
                       g = Math.floor(Math.random() * 255);
                       b = Math.floor(Math.random() * 255);
                      //  ramdomcolor = "rgb(" + r + "," + g + "," + b + ")";
                       ramdomcolor = "rgb(25, 102, 213)";

                       r = Math.floor(Math.random() * 255);
                       g = Math.floor(Math.random() * 255);
                       b = Math.floor(Math.random() * 255);
                      //  borderramdomcolor= "rgb(" + r + "," + g + "," + b + ")";
                       borderramdomcolor= "rgb(25, 102, 213)";

                      GraphDatasetsArray[i] = 
                                          {
                                            backgroundColor: ramdomcolor,
                                            borderColor:ramdomcolor,
                                            fill: false,
                                            borderWidth : 15,
                                            pointRadius : 0,
                                            data: [{ x: valorsecuencial, y:(LaborNo[i])}, {x: valorsecuencial + minutos,y: (LaborNo[i])}]
                                          }
                                          valorsecuencial = valorsecuencial + minutos;
                      }

                    var ctx = document.getElementById(id);
                    var scatterChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels: [''],
                      yLabels : LaborNo,
                       datasets: 
                        GraphDatasetsArray
                       
                    },
                    options: {
                        legend : {
                            display : false
                        },
                        scales: {
                            xAxes: [{
                                type: 'linear',
                                position: 'bottom',
                                titleFontStyle: "italic",
                                ticks : {
                                    beginAtzero :true,
                                    stepSize : 1
                                }
                            }],
                            yAxes : [{
                              afterDataLimits: function(axis) {
                                  axis.max += 1; // add 1px to top
                                  axis.min -= 1; // add 1px to top
                              },
                              labelMaxWidth: 30,
                                scaleLabel : {
                                    display : true
                                },
                                ticks : {
                                    beginAtZero :true,
                                    stepSize : 1,
                                    callback: function(value, index, values) {
                                        return  Labor[value];
                                    }
                                }
                            }]
                        }
                    },
                });
        })
}

