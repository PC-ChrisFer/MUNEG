//@ts-check

import { deleteRow, readRows, saveRow, searchRows} from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
} from "../constants/api_constant.js";
import { getElementById,  validateExistenceOfUser } from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";
import { fillPropiedad } from "../publica/inmuebles_alquiler.js";

const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_TIPO_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";
const API_MUNICIPIO = SERVER + "privada/municipios.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";
const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";
<<<<<<< Updated upstream
=======
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

>>>>>>> Stashed changes

let datosPropiedad = {
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
  inquilinoID: 0,
  empleadoID: 0,
};

document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_PROPIEDAD, fillTablePropiedad);
  await fillTipoAcabado();
  await fillMunicipio();
  await fillTipoPropiedad();
  await fillInquilino();
  await fillEmpleado();
});



function fillTablePropiedad(dataset) {
  let content = "";
  console.log(dataset);
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.

    content += ` 
                <tr>
                <td><img src="../../api/imagenes/propiedad/${row.imagen}" width="50%" height="50%"></td>
                <td>${row.direccion}</td>
                <td>${row.codigo}</td>
                <td>${row.precio}</td>
                <td>${row.alquiler}</td>
                <td>${row.descripcion}</td>
                <td>${row.habitaciones}</td>
                <td>${row.plantas}</td>
                <td class="d-flex justify-content-center">
                 <a onclick="guardarDatosUpdate(${row.id_propiedad},'${row.direccion}','${row.area_propiedad}','${row.area_contruccion}','${row.codigo}','${row.precio}','${row.alquiler}','${row.habitaciones}','${row.plantas}','${row.sanitario}','${row.espacio_parqueo}','${row.descripcion}')" class="btn" id="button_ver_mas">
                   <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                 <a onclick="guardarDatosDelete(${row.id_propiedad})" class="btn" id="button_ver_mas">
                   <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
             </td>
             </tr>
            `;
  });
  //@ts-ignore
  getElementById("tbody-propiedad").innerHTML = content;
}

async function fillTipoAcabado() {
  let APIEndpoint = API_TIPO_ACABADO + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmb_tipo_acabado_update"
      ).innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;

      //@ts-ignore
      getElementById(
        "cmb_tipo_acabado"
      ).innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
  console.log("all bad");
}

<<<<<<< Updated upstream
=======
window.abrirModalReportes = () => {
  $("#reportes").modal("show");
};

window.generarReporteCasasMasVendidas_Alquiladas = async () => {
  //contenido de la tabla 
  let tableContent = ""
  // enpoints que vas a utilizar
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';
  let enpointReporte = API_REPORTES + "propiedad_vendida_alquilada"
  // instancia para ingresar parametros
  let parameters = new FormData()
  parameters.append("fecha_firma", getElementById("meses_año").value)

  //Consultas que vas a hacer
  let obtenerDatosParaReporte = await APIConnection(enpointReporte, POST_METHOD, parameters)
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);


  obtenerDatosParaReporte.dataset.forEach(element => {
    tableContent += `
      <tr>
      <td>${element.codigo}</td>
      <td>${element.departamento}</td>
      <td>${element.municipio}</td>
      <td>${element.direccion}</td>
      <td>${element.apellido}</td>
      <td>${element.nombre}</td>
      <td>${element.precio}</td>
      </tr>
    `
  })

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
              <a>PROPIEDADES  CON LOS PRECIOS MÁS BAJOS</a>
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
                      <th>Departamento</th>
                      <th>Municipio</th>
                      <th>Direccion</th>
                      <th>Apellido</th>
                       <th>Nombre</th>
                       <th>Precio</th>

                  </tr>
              </thead>
              <tbody>
                  ${tableContent}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
              <a class="text-footer">MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;


  await generatePDF(generatedHTML, getElementById("meses_año").value + "mes" + ".pdf")
}

//Obtener los datos de combobox tipo municipio
>>>>>>> Stashed changes
async function fillMunicipio() {
  let APIEndpoint = API_MUNICIPIO + "readAll";
  console.log(APIEndpoint);
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
<<<<<<< Updated upstream
      //@ts-ignore
      getElementById(
        "cmb_municipio_update"
      ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;

      //@ts-ignore
      getElementById(
        "cmb_municipio"
      ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
=======
      getElementById("cmb_municipio_update").innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
      getElementById("reporte_municipio_combobox").innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
      getElementById("cmb_municipio").innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
>>>>>>> Stashed changes
    });
    return;
  }
  console.log("all bad");
}
async function fillTipoPropiedad() {
  let APIEndpoint = API_TIPO_PROPIEDAD + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmb_tipo_propiedad_update"
      ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;

      //@ts-ignore
      getElementById(
        "cmb_tipo_propiedad"
      ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
  console.log("all bad");
}

async function fillEmpleado() {
  let APIEndpoint = API_EMPLEADO + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmb_empleado_update"
      ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;

      //@ts-ignore
      getElementById(
        "cmb_empleado"
      ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
    });
    return;
  }
  console.log("all bad");
}

async function fillInquilino() {
  let APIEndpoint = API_INQUILINOS + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmb_inquilino_update"
      ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
      //@ts-ignore
      getElementById(
        "cmb_inquilino"
      ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
    return;
  }
  console.log("all bad");
}

//@ts-ignore
window.selectTipoAcabado = (id_tipo_acabado) => {
  //@ts-ignore
  datosPropiedad.tipo_acabadoID = getElementById(id_tipo_acabado).value;
};

//@ts-ignore
window.selectMunicipio = (id_municipio) => {
  //@ts-ignore
  datosPropiedad.municipioID = getElementById(id_municipio).value;
};

//@ts-ignore
window.selectTipoPropiedad = (id_tipo_propiedad) => {
  //@ts-ignore
  datosPropiedad.tipoPropiedadID = getElementById(id_tipo_propiedad).value;
};

//@ts-ignore
window.selectEmpleado = (id_empleado) => {
  //@ts-ignore
  datosPropiedad.empleadoID = getElementById(id_empleado).value;
};

//@ts-ignore
window.selectInquilino = (id_inquilino) => {
  //@ts-ignore
  datosPropiedad.inquilinoID = getElementById(id_inquilino).value;
};

//@ts-ignore
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
  descripcion
) => {
  datosPropiedad.id_propiedad = id_propiedad;

  //@ts-ignore
  getElementById("direccion_update").value = String(direccion);

  //@ts-ignore
  getElementById("area_propiedad_update").value = String(area_propiedad);

  //@ts-ignore
  getElementById("area_construccion_update").value = String(area_construccion);

  //@ts-ignore
  getElementById("codigo_update").value = String(codigo);

  //@ts-ignore
  getElementById("precio_update").value = String(precio);
  //@ts-ignore
  getElementById("alquiler_update").value = String(alquiler);

  //@ts-ignore
  getElementById("habitaciones_update").value = String(habitaciones);
  //@ts-ignore
  getElementById("plantas_update").value = String(plantas);

  //@ts-ignore
  getElementById("sanitario_update").value = String(sanitario);

  //@ts-ignore
  getElementById("espacio_parqueo_update").value = String(espacio_parqueo);
  //@ts-ignore
  getElementById("descripcion_update").value = String(descripcion);

  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_propiedad) => {
  datosPropiedad.id_propiedad = id_propiedad;
  //@ts-ignore
  $("#eliminar").modal("show");
};

<<<<<<< Updated upstream

// Método que se ejecuta al enviar un formulario de busqueda
//@ts-ignore
getElementById("search-bar").addEventListener("submit", async (event) => {
=======
// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
addEventListener("submit", async (event) => {
>>>>>>> Stashed changes
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_PROPIEDAD, "search-bar", fillTablePropiedad);
});  

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));
  //@ts-ignore
  parameters.append("id_municipio_update", datosPropiedad.municipioID);
  //@ts-ignore
  parameters.append("id_tipo_propiedad_update", datosPropiedad.tipoPropiedadID);
  //@ts-ignore
  parameters.append("id_empleado_update", datosPropiedad.empleadoID);
  //@ts-ignore
  parameters.append("id_inquilino_update", datosPropiedad.inquilinoID);
  parameters.append("id_tipo_acabado_update", datosPropiedad.tipo_acabadoID);

  await saveRow(API_PROPIEDAD, API_CREATE, parameters, fillTablePropiedad);

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("id_municipio_update", datosPropiedad.municipioID);
  //@ts-ignore
  parameters.append("id_tipo_propiedad_update", datosPropiedad.tipoPropiedadID);
  //@ts-ignore
  parameters.append("id_empleado_update", datosPropiedad.empleadoID);
  //@ts-ignore
  parameters.append("id_inquilino_update", datosPropiedad.inquilinoID);
  parameters.append("id_tipo_acabado_update", datosPropiedad.tipo_acabadoID);
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);

  await saveRow(API_PROPIEDAD, API_UPDATE, parameters, fillTablePropiedad);

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);

  await deleteRow(API_PROPIEDAD, parameters, fillTablePropiedad);

  // @ts-ignore
  $("#agregar").modal("hide");
});

//Función para cargar el id para el delete
window.generarReporteCasasMunicipios = async (id_propiedad) => {
  let tableContenido = ""
  // enpoints que vas a utilizar
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';
  let enpointReporte = API_REPORTES + "propiedad_municipio"
  let parameters = new FormData()
  parameters.append("id_municipio", getElementById("reporte_municipio_combobox").value)

  //Consultas que vas a hacer
  let obtenerDatosParaReporte = await APIConnection(enpointReporte, POST_METHOD, parameters)
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  console.log(obtenerDatosParaReporte)

  obtenerDatosParaReporte.dataset
    tableContenido += `
      <tr>
      <td>${ obtenerDatosParaReporte.dataset.codigo}</td>
      <td>${element.municipio}</td>
      <td>${element.direccion}</td>
      <td>${element.apellido}</td>
      <td>${element.nombre}</td>
      <td>${element.precio}</td>
      </tr>
    `

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
              <a>PROPIEDADES  CON LOS PRECIOS MÁS BAJOS</a>
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
                      <th>Departamento</th>
                      <th>Municipio</th>
                      <th>Direccion</th>
                      <th>Apellido</th>
                       <th>Nombre</th>
                       <th>Precio</th>

                  </tr>
              </thead>
              <tbody>
                  ${tableContenido}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
              <a class="text-footer">MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
};