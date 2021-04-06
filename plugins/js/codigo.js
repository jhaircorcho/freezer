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
        $.ajax({
            url:"bd/login.php",
            type:'POST',
            datatype:"json",
            data: {usuario:usuario,contrasena:contrasena},
            success:function(data){
                if(data=="null"){
                    Swal.fire({
                        icon: 'error',
                        title:'El usuario y/o la contraseña son incorrectos',
                      });
                }else{
                    Swal.fire({
                        icon: 'success',
                        title:'Ingresa al sistema',
                       
                       
                      }).then((result)=>{
                        if(result.value){
                          window.location.href = "../paginas/menu.php";
                        }
                      })
                }
            }
        })
    }

});




