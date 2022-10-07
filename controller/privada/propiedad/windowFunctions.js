//@ts-check
import { APIConnection } from "../../APIConnection.js";
import {
  generatePDF,
  obtenerFechaActual,
  readDeletedRowns,
  readRows,
} from "../../components.js";
import {
  GET_METHOD,
  POST_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import {
  closeModal,
  getElementById,
  showModal,
} from "../../constants/helpers.js";
import { fillTablePropiedad } from "./fill.js";
import { graphDoughnutPropiedadPropietario } from "./graphics.js";

const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";

export let datosPropiedad = {
  id_propiedad: "",
  direccion_propiedad: "",
  area_propiedad: "",
  area_construccion_propiedad: "",
  codigo: "",
  precio: 0,
  alquiler: "",
  habitaciones: 0,
  plantas: 0,
  sanitario: 0,
  espacioParqueo: 0,
  descripcion: "",
  tipo_acabadoID: "",
  municipioID: 0,
  tipoPropiedadID: 0,
  inquilinoID: null,
  empleadoID: 0,
  propietarioID: 0,
  visibilidad: true,
  imageName:""
};

export var isWatchinDeletedData = false;

window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_PROPIEDAD, fillTablePropiedad);
    isWatchinDeletedData = true;
  } else {
    await readRows(API_PROPIEDAD, fillTablePropiedad);
    isWatchinDeletedData = false;
  }
  getElementById("verDatosliminados").checked === true
    ? (getElementById("textoSwitch").innerHTML = "Hacer visible")
    : (getElementById("textoSwitch").innerHTML = "Hacer invisible");
};

window.cambiarVisibilidadDeResgistro = () => {
  if (isWatchinDeletedData) {
    getElementById("eliminarElemento").checked === true
      ? (datosPropiedad.visibilidad = true)
      : (datosPropiedad.visibilidad = false);
  } else {
    getElementById("eliminarElemento").checked === true
      ? (datosPropiedad.visibilidad = false)
      : (datosPropiedad.visibilidad = true);
  }
};

//Función para guardar los datos cambiados en el combobox
window.selectTipoAcabado = (id_tipo_acabado) => {
  datosPropiedad.tipo_acabadoID = getElementById(id_tipo_acabado).value;
};

//Función para guardar los datos cambiados en el combobox
window.selectMunicipio = (id_municipio) => {
  datosPropiedad.municipioID = getElementById(id_municipio).value;
};

//Función para guardar los datos cambiados en el combobox
window.selectPropietario = (id_propietario) => {
  datosPropiedad.propietarioID = getElementById(id_propietario).value;
};

//Función para guardar los datos cambiados en el combobox
window.selectTipoPropiedad = (id_tipo_propiedad) => {
  datosPropiedad.tipoPropiedadID = getElementById(id_tipo_propiedad).value;
};

//Función para guardar los datos cambiados en el combobox
window.selectEmpleado = (id_empleado) => {
  datosPropiedad.empleadoID = getElementById(id_empleado).value;
};

//Función para guardar los datos cambiados en el combobox
window.selectInquilino = (id_inquilino) => {
  datosPropiedad.inquilinoID = getElementById(id_inquilino).value;
};

// FUNCION PARA GUARDAR LOS DATOS DEL propiedad
window.guardarDatosUpdate = (
  id_propiedad,
  direccion,
  area_propiedad,
  area_construccion,
  codigo,
  precio,
  alquiler,
  habitaciones,
  plantas,
  sanitario,
  espacio_parqueo,
  descripcion,
  visibilidad,
  id_tipo_acabado,
  id_municipio,
  id_tipo_propiedad,
  id_inquilino,
  id_empleado,
  imageName
) => {
  //Se transfieren los datos del boton al json global
  datosPropiedad.id_propiedad = id_propiedad;
  datosPropiedad.visibilidad = visibilidad;
  datosPropiedad.imageName = imageName

  //Se imprime la información en el modal
  getElementById("direccion_update").value = String(direccion);
  getElementById("area_propiedad_update").value = String(area_propiedad);
  getElementById("area_construccion_update").value = String(area_construccion);
  getElementById("codigo_update").value = String(codigo);
  getElementById("precio_update").value = String(precio);
  getElementById("alquiler_update").value = String(alquiler);
  getElementById("habitaciones_update").value = String(habitaciones);
  getElementById("plantas_update").value = String(plantas);
  getElementById("sanitario_update").value = String(sanitario);
  getElementById("espacio_parqueo_update").value = String(espacio_parqueo);
  getElementById("descripcion_update").value = String(descripcion);
  getElementById("cmb_tipo_acabado_update").value = String(id_tipo_acabado);
  getElementById("cmb_municipio_update").value = String(id_municipio);
  getElementById("cmb_tipo_propiedad_update").value = String(id_tipo_propiedad);
  getElementById("cmb_inquilino_update").value = String(id_inquilino);
  getElementById("cmb_empleado_update").value = String(id_empleado);

  showModal("#actualizar");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_propiedad) => {
  datosPropiedad.id_propiedad = id_propiedad;
  showModal("#eliminar");
};

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  //Se envian el parametro del id para realizar la busqueda
  await graphDoughnutPropiedadPropietario(datosPropiedad.propietarioID);
};

//Generar PDF
window.generarReporteCasasMasVendidas_Alquiladas = async () => {
  //contenido de la tabla
  let tableContent = "";
  // enpoints que vas a utilizar
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
  let enpointReporte = API_REPORTES + "propiedad_vendida_alquilada";
  let mesSeleccionado = parseInt(getElementById("meses_año").value);

  if (mesSeleccionado >= 1 && mesSeleccionado <= 12) {
    // instancia para ingresar parametros
    let parameters = new FormData();
    parameters.append("fecha_firma", getElementById("meses_año").value);

    //Consultas que vas a hacer
    let obtenerDatosFechaSeleccionada = await APIConnection(
      enpointReporte,
      POST_METHOD,
      parameters
    );
    let obtenerUsuarioActualResponse = await APIConnection(
      APIEndpointObtenerUsuarioActual,
      GET_METHOD,
      null
    );

    console.log(obtenerDatosFechaSeleccionada)

    obtenerDatosFechaSeleccionada.dataset.forEach((element) => {
      tableContent += `
        <tr>
        <td>${element.codigo}</td>
        <td>${element.departamento}</td>
        <td>${element.municipio}</td>
        <td>${element.direccion}</td>
        <td>${element.nombre} ${element.apellido}</td>
        <td>${element.precio}</td>
        </tr>
      `;
    });

    let generatedHTML = `<!doctype html>
    <html lang="es">
    
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <style>
            body {
                display: flex;
                justify-content: center;
                text-align: center;
    
            }
    
            #tabla-header {
                background-color: #007D84;
                color: aliceblue;
                padding: 10px;
                font-size: 40px;
                padding-bottom: 20px;
                margin-bottom: 10px;
    
            }
    
            #tabla-footer {
                background-color: #007D84;
                color: aliceblue;
                padding: 10px;
                text-align: right;
            }
    
            #tabla-header img {
                max-width: 65px;
            }
    
            /*Tabla de datos*/
            #tabla_datos {
                margin-top: 3%;
                margin-bottom: 3%;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    
            }
    
            /*Colores al encabezado*/
            #tabla_datos th {
                color: white;
                background-color: #018080;
            }
    
            /*Colores al cuerpo*/
            #tabla_datos tr {
                border: solid black 1px;
                background-color: #A1A39F;
            }
    
            #tabla_reporte {
                width: 100%;
                height: 60%;
                margin-top: 20px;
    
            }
    
            #tabla_reporte th,
            td {
                text-align: left;
                padding-left: 5px;
            }
    
            .text-footer {
                font-size: 10px;
                margin-top: 10px;
            }
        </style>
        <title>MUNEG S.A C.V</title>
    
    </head>
    
    <body>
        <!-- Tabla de Datos -->
        <div class="container-fluid" id="tabla_datos" style="width: 100%">
            <div class="container-fluid" id="tabla-header">
                <a>MUNEG</a>
            </div>
            <div class="container-fluid" id="tabla-header">
                <a>PROPIEDADES QUE SE HAN ALQUILADO/VENDIDO DURANTE UN MES</a>
            </div>
            <table class="table table-responsive table-bordered" id="tabla_reporte">
                <thead>
                    <tr>
                        <th>Creado por:</th>
                         <td>${obtenerUsuarioActualResponse.username}</td>
                    </tr>
                    <tr>
                        <th>Fecha:</th>
                        <td>${obtenerFechaActual()}</td>
                    </tr>
                    <tr>
                        <th>Codigo de Propiedad</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Direccion</th>
                        <th>Nombre Completo</th>
                         <th>Precio</th>
  
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>
            <div class="container-fluid" id="tabla-footer">
            <a>MUNEG S.A C.V</a>
            </div>
        </div>
        </main>
    
    </body>
    
    </html>`;

    await generatePDF(
      generatedHTML,
      getElementById("meses_año").value + "mes" + ".pdf"
    );

    window.open(
      "../../api/reporte/" + getElementById("meses_año").value + "mes" + ".pdf"
    );
  } else {
    closeModal("#hide");
    showModal("#errorReporteCasasVendidas");
  }
};

//Función para cargar el reporte
window.generarReporteCasasMunicipios = async () => {
  let tableContenido = "";
  // enpoints que vas a utilizar
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
  let enpointReporte = API_REPORTES + "propiedad_municipio";
  let parameters = new FormData();

  parameters.append(
    "id_municipio",
    getElementById("reporte_municipio_combobox").value
  );

  //Consultas que vas a hacer
  let obtenerDatosParaReporteMunicipios = await APIConnection(
    enpointReporte,
    POST_METHOD,
    parameters
  );

  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

  obtenerDatosParaReporteMunicipios.dataset.forEach((element) => {
    tableContenido += `
        <tr>
        <td>${element.codigo}</td>
        <td>${element.municipio}</td>
        <td>${element.direccion}</td>
        <td>${element.apellido}</td>
        <td>${element.nombre}</td>
        <td>${element.precio}</td>
        </tr>
      `;
  });

  let generatedHTML = `<!doctype html>
    <html lang="es">
    
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <style>
            body {
                display: flex;
                justify-content: center;
                text-align: center;
    
            }
    
            #tabla-header {
                background-color: #007D84;
                color: aliceblue;
                padding: 10px;
                font-size: 40px;
                padding-bottom: 20px;
                margin-bottom: 10px;
    
            }
    
            #tabla-footer {
                background-color: #007D84;
                color: aliceblue;
                padding: 10px;
                text-align: right;
            }
    
            #tabla-header img {
                max-width: 65px;
            }
    
            /*Tabla de datos*/
            #tabla_datos {
                margin-top: 3%;
                margin-bottom: 3%;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    
            }
    
            /*Colores al encabezado*/
            #tabla_datos th {
                color: white;
                background-color: #018080;
            }
    
            /*Colores al cuerpo*/
            #tabla_datos tr {
                border: solid black 1px;
                background-color: #A1A39F;
            }
    
            #tabla_reporte {
                width: 100%;
                height: 60%;
                margin-top: 20px;
    
            }
    
            #tabla_reporte th,
            td {
                text-align: left;
                padding-left: 5px;
            }
    
            .text-footer {
                font-size: 10px;
                margin-top: 10px;
            }
        </style>
        <title>MUNEG S.A C.V</title>
    
    </head>
    
    <body>
        <!-- Tabla de Datos -->
        <div class="container-fluid" id="tabla_datos" style="width: 100%">
            <div class="container-fluid" id="tabla-header">
                <a>MUNEG</a>
            </div>
            <div class="container-fluid" id="tabla-header">
                <a>PROPIEDADES EN MUNICIPIO </a>
            </div>
            <table class="table table-responsive table-bordered" id="tabla_reporte">
                <thead>
                    <tr>
                        <th>Creado por:</th>
                         <td>${ObtenerUsuarioActualResponse.username}</td>
                    </tr>
                    <tr>
                        <th>Fecha:</th>
                        <td>${obtenerFechaActual()}</td>
                    </tr>
                    <tr>
                        <th>Codigo</th>
                        <th>Municipio</th>
                        <th>Direccion</th>
                        <th>Apellido inquilino</th>
                         <th>Nombre inquilino</th>
                         <th>Precio</th>
  
                    </tr>
                </thead>
                <tbody>
                    ${tableContenido}
                </tbody>
            </table>
            <div class="container-fluid" id="tabla-footer">
            <a>MUNEG S.A C.V</a>
            </div>
        </div>
        </main>
    
    </body>
    
    </html>`;

  await generatePDF(
    generatedHTML,
    getElementById("reporte_municipio_combobox").value + "_casas" + ".pdf"
  );
  window.open(
    "../../api/reporte/" +
      getElementById("reporte_municipio_combobox").value +
      "_casas" +
      ".pdf"
  );
};
