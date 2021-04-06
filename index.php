<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="plugins/sweetalert2/sweetalert2.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <title>Smart AA</title>

  </head>
  <body id="fondo_login"> 
   
    <section id="secciones"  class="login">
        <div class="container py-5">
            <div class="row">
                <div id="marco_imagen" class="col-lg-4 
                d-none d-lg-block d-xl-none
                d-none  d-lg-none
                d-none d-xl-block">

                      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" ></button>
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img src="img/aires_01.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Montaje</h5>
                              <p>Realizamos el diseño y montaje de los sistemas de refrigeración para la industria</p>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <img src="img/aires_02.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Diseño y selección de equipos</h5>
                              <p>Poseemos la ingenieria para que sus sistemas de refrigeración sean eficientes</p>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <img src="img/aires_03.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Mantenimiento</h5>
                              <p>Contamos con plataformas digitales para prevenir fallas en sus sistemas</p>
                            </div>
                          </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
                </div>
               
                <div class="col-lg-8 px-5 align-self-center ">
                    <h1 class="font-weight-bold my-5" >Ingreso</h1>
                    <h4>Digite su usuario para ingreso al sistema</h4>

                    <form id="formLogin">
                        <div class="form-row">
                              <div class="col-lg-7">
                                      <input id="usuario" name="usuario" type="text" placeholder="Coloca el usuario o email" class="form-control my-4 p-3">
                              </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                    <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese la contraseña" class="form-control my-4 p-3">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                   <input name="submit"  type="submit" class="btn1 mt-2 mb-5"> Ingresar</input>
                            </div>
                        </div>
                        <a href="#">Olvidó la contraseña?</a>
                    </form>

                </div>
            
            </div>
        </div>
    </section>

    <script src="jquery/jquery-3.6.0.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
   
    <script src="popper/popper.min.js"></script>
    <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="js/codigo.js"></script>

    <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>

    <script src="js/firebase.js" ></script>

  </body>
</html>