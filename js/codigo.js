$('#formLogin').submit(function(e){
  e.preventDefault();
  var usuario = $.trim($("#usuario").val());
  var contrasena = $.trim($("#contrasena").val());


  if(usuario.length=="" || contrasena==""){
    Swal.fire({
      icon: 'warning',
      title:'Debe ingresar el usuario y la contraseña',
      confirmButtonColor:"#FF0000",
    });
    return false;
  }else{


    
    LoginFirebase();

     
  }

});
