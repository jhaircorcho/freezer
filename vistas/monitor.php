
 <section class="py-3"> 
         
        </section>
          <section class="bg-grey">
            <div class="container">
             <div class="row">
              <div class="col text-center">
            
              <div class="card rounded-0 ">
              <form action=""  method="post">
                  <div class="card-header bg-light"> 
                    <select class="form-select" name="selEquipo" select="" id="selEquipo" onchange="" >
                    <option value="Equipo0451"> Equipo No.1</option>
                    <option value="equipo02">Equipo No.2</option>
                    </select>
              </form>
                    <select class="form-select" select="" id="selParametro" onchange="SelectDatosFirebase(); ">
                    <option value="TempAmbiente">Temperatura Ambiente</option>
                    <option value="TempFreezer">Temperatura Freezer</option>
                    <option value="TempRefrigerador">Temperaura Refrigerador</option>
                    <option value="TempCompresor">Temperatura Compresor</option>
                    <option value="VibCompresor">Vibración compresor</option>
                    <option value="Correinte">Corriente</option>
                    <option value="Voltaje">Voltaje</option>
                    <option value="Humedad">Humedad Ambiente</option>
                    </select>
                  </div>
                  <div id="div_grafico" class="card-body">
                    <canvas id="graficoTempAmbiente"></canvas>
                    <canvas id="graficoTempFreezer"></canvas>
                    <canvas id="graficoTempRefrigerador"></canvas>
                    <canvas id="graficoTempCompresor"></canvas>
                    <canvas id="graficoVibCompresor"></canvas>
                    <canvas id="graficoCorriente"></canvas>
                    <canvas id="graficoVoltaje"></canvas>
                    <canvas id="graficoHumedad"></canvas>
                  </div>
                </div>
            </div>


            <div class="col-lg-3 my-3">
              <div class="card rounded-0 ">
                <div class="card-header bg-light"> 
                  <h6 class="font-weight-bold mb-0">Alertas</h6>
                </div>
               <div id="alarmas" class="alarms justify-content-center card-body pt-2  overflow-scroll" style="height: 520px">  
              
               </div> 
              <button class="btn btn-primary w-100">
                      Ver todos
                    </button>
              </div>
            </div>
             </div>
             </section>