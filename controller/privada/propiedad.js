//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, searchRows, readDeletedRowns, generatePDF, obtenerFechaActual } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE, API_SUCESS_REQUEST, GET_METHOD, POST_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_TIPO_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";
const API_MUNICIPIO = SERVER + "privada/municipios.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";
const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";


// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
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
  visibilidad: true
};

let isWatchinDeletedData = false


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_PROPIEDAD, fillTablePropiedad);
  //Cargar combo box de Tipo Acabado
  await fillTipoAcabado();
  //Cargar combo box de Municipio
  await fillMunicipio();
  //Cargar combo box de Propiedad
  await fillTipoPropiedad();
  //Cargar combo box de Inquilino  
  await fillInquilino();
  //Cargar combo box de Empleado
  await fillEmpleado();

  getElementById('textoSwitch').innerHTML = "Hacer invisible"
});

//Obtener los datos de combobox tipo inquilino
function fillTablePropiedad(dataset) {
  //Se define el contenido html
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
            <a onclick="guardarDatosUpdate(${row.id_propiedad},'${row.direccion}','${row.area_propiedad}','${row.area_contruccion}','${row.codigo}','${row.precio}','${row.alquiler}','${row.habitaciones}','${row.plantas}','${row.sanitario}','${row.espacio_parqueo}','${row.descripcion}','${row.visibilidad}', '${row.id_tipo_acabado}', '${row.id_municipio}', '${row.id_tipo_propiedad}', '${row.id_inquilino}', '${row.id_empleado}')" class="btn" id="button_ver_mas">
              <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
            <a onclick="guardarDatosDelete(${row.id_propiedad})" class="btn" id="button_ver_mas">
              <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
          </td>
       </tr>
            `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-propiedad").innerHTML = content;
}

//Obtener los datos de combobox tipo acabado
async function fillTipoAcabado() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_TIPO_ACABADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_tipo_acabado_update").innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;
      getElementById("cmb_tipo_acabado").innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
  console.log("all bad");
}

window.abrirModalReportes = () => {
  $("#reportes").modal("show");
};

window.generarReporteCasasMasVendidas_Alquiladas = async () => {
  let tableContent = ""
  let enpointReporte = API_REPORTES + "propiedad_vendida_alquilada"
  let parameters = new FormData()
  parameters.append("fecha_firma", getElementById("meses_año").value)
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
                      <th>Dirección</th>
                      <th>Código</th>
                      <th>Direccion</th>
                      <th>monto total</th>
                      <th>placa</th>
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
async function fillMunicipio() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_MUNICIPIO + "readAll";
  console.log(APIEndpoint);
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_municipio_update").innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
      getElementById("cmb_municipio").innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox tipo propiedad
async function fillTipoPropiedad() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_TIPO_PROPIEDAD + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_tipo_propiedad_update").innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
      getElementById("cmb_tipo_propiedad").innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox empleaado
async function fillEmpleado() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_EMPLEADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_empleado_update").innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
      getElementById("cmb_empleado").innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox inquilino
async function fillInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_INQUILINOS + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_inquilino_update").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
      getElementById("cmb_inquilino").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
    return;
  }
}

window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_PROPIEDAD, fillTablePropiedad)
    isWatchinDeletedData = true
  } else {
    await readRows(API_PROPIEDAD, fillTablePropiedad);
    isWatchinDeletedData = false
  }
  getElementById("verDatosliminados").checked === true ? getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
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
  id_empleado
) => {
  //Se transfieren los datos del boton al json global  
  datosPropiedad.id_propiedad = id_propiedad;
  datosPropiedad.visibilidad = visibilidad

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
  getElementById("cmb_tipo_acabado_update").value = String(id_tipo_acabado)
  getElementById("cmb_municipio_update").value = String(id_municipio);
  getElementById("cmb_tipo_propiedad_update").value = String(id_tipo_propiedad);
  getElementById("cmb_inquilino_update").value = String(id_inquilino);
  getElementById("cmb_empleado_update").value = String(id_empleado);
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
};


//Función para cargar el id para el delete
window.guardarDatosDelete = (id_propiedad) => {
  //Se transfieren los datos del boton al json global  
  datosPropiedad.id_propiedad = id_propiedad;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};


// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_PROPIEDAD, "search-bar", fillTablePropiedad);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("insert_form"));
  // Se adhieren datos al arreglo que se envia al insert
  parameters.append("id_municipio_update", datosPropiedad.municipioID);
  parameters.append("id_tipo_propiedad_update", datosPropiedad.tipoPropiedadID);
  parameters.append("id_empleado_update", datosPropiedad.empleadoID);
  parameters.append("id_inquilino_update", datosPropiedad.inquilinoID);
  parameters.append("id_tipo_acabado_update", datosPropiedad.tipo_acabadoID);
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_PROPIEDAD, API_CREATE, parameters, fillTablePropiedad);
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);
  parameters.append("visibilidad", datosPropiedad.visibilidad);

  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await saveRow(API_PROPIEDAD, API_UPDATE, parameters, fillTablePropiedad);
  getElementById("verDatosliminados").checked = false
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
  isWatchinDeletedData = false


  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await deleteRow(API_PROPIEDAD, parameters, fillTablePropiedad);
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
