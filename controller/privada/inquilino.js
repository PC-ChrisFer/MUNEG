//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow, pieGraph } from "../components.js";
import { GET_METHOD, SERVER, API_CREATE, API_UPDATE, API_SUCESS_REQUEST, POST_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_INQUILINO = SERVER + "privada/inquilino.php?action=";
const API_MUNICIPIO = SERVER + "privada/municipios.php?action=";
//El nombre del CRUD que es
const CRUD_NAME = "inquilino";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE inquilino, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoinquilino"
let datos_inquilino = {
  id: 0,
  nombre_inquilino: " ",
  apellido_inquilino: " ",
  dui: " ",
  nit: " ",
  telefono: " ",
  correo: " ",
  genero: " ",
  fecha_nacimiento: " ",
  imagen: " ",
  id_estado_inquilino: 0,
  nombre_estado_inquilino: "",
  id_tipo_inquilino: 0,
  nombre_tipo_inquilino: "",
  id_departamento: 0,
};

let datos_estado_inquilino = {
  id_estado_inquilino: 0,
  nombre_estado: " ",
};

let datos_tipo_inquilino = {
  id_tipo_inquilino: 0,
  nombre_tipo: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_INQUILINO, fillTableInquilino);
  // Se define una variable para establecer las opciones del componente Modal.
  //Cargar combo box de tipo inquilino
  await fillComboBoxTipoInquilino();
  //Cargar combo box de estado inquilino
  await fillComboxEstadoInquilino();
  //Cargar combo box de departamento
  await fillComboboxDepartamento();
});

//Obtener los datos de combobox tipo inquilino
async function fillComboBoxTipoInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_INQUILINO + "readTipoInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse)
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    getElementById("tipo_inquilino_u").innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
  });
    APIResponse.dataset.map((element) => { 
    getElementById("tipo_inquilino_i").innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
  });
}

//Obtener los datos de combobox estado inquilino
async function fillComboxEstadoInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_INQUILINO + "readEstadoInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => { 
    getElementById("estado_inquilino_i").innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`; });
  APIResponse.dataset.map((element) => { 
    getElementById("estado_inquilino_u").innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`;
  });
}

//Obtener los datos de combobox estado inquilino
async function fillComboboxDepartamento() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_MUNICIPIO + "read_departamento";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => { 
    getElementById("cmb_departamento").innerHTML += `<option value="${element.id_departamento}" > ${element.departamento} </option>`; });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarTipoinquilino = () => {
  datos_inquilino.id_tipo_inquilino = document.getElementById("tipo_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarEstadoinquilino = () => {
  datos_inquilino.id_estado_inquilino = document.getElementById("estado_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.selectDepartamento = (id_departamento) => {
  datos_inquilino.id_departamento = document.getElementById(id_departamento).value;
};

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableInquilino(dataset) {
  //Se define el contenido html
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>
                <td><img src="../../api/imagenes/inquilino/${row.imagen}" width=100></td>
                <td>${row.nombre}</td>
                <td>${row.apellido}</td>
                <td>${row.numero_telefono}</td>
                <td>${row.correo_electronico}</td>
                <td>${row.fecha_nacimiento}</td>
                <td>${row.DUI}</td>
                <td>${row.NIT}</td>
                <td>${row.NRC}</td>
                <td class="d-flex justify-content-center">
                    <a onclick="guardarDatosUpdate(${row.id_inquilino},'${row.nombre}','${row.apellido}','${row.DUI}','${row.NIT}','${row.NRC}','${row.numero_telefono}','${row.correo_electronico}','${row.genero}','${row.fecha_nacimiento}',${row.id_estado_inquilino},${row.id_tipo_inquilino})" class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
                    data-bs-target="#actualizar"><img
                        src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                    <a onclick="guardarDatosEliminar(${row.id_inquilino})" class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
                    data-bs-target="#eliminar"><img
                        src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-tipoInquilino").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE inquilino
window.guardarDatosUpdate = (
  id_inquilino,
  nombre,
  apellido,
  DUI,
  NIT, 
  NRC, 
  telefono,
  correo,
  genero, 
  fecha_nacimiento, 
  id_tipo_inquilino,
  id_estado_inquilino
) => {
  //Se transfieren los datos del boton al json global  
  datos_inquilino.id = id_inquilino;
  //Se llama el modal de actualizar
  $("#actualizarform").modal("show");
  //Se imprime la información en el modal
  document.getElementById("nombre_inquilino_update").value = String(nombre);
  document.getElementById("apellido_inquilino_update").value = String(apellido);
  document.getElementById("dui_update").value = String(DUI);
  document.getElementById("nit_update").value = String(NIT);
  document.getElementById("nrc_update").value = String(NRC);
  document.getElementById("telefono_update").value = String(telefono);
  document.getElementById("correo_electronico_update").value = String(correo);
  document.getElementById("genero_update").value = String(genero);
  document.getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  document.getElementById("tipo_inquilino_u").value = String(id_tipo_inquilino);
  document.getElementById("estado_inquilino_u").value = String(id_estado_inquilino);
};

//Función para cargar el id para el delete
window.guardarDatosEliminar = (id_inquilino) => {
  //Se transfieren los datos del boton al json global  
  datos_inquilino.id = id_inquilino;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_INQUILINO, "search-bar", fillTableInquilino);
});  

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("insert_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("genero", getElementById("genero_update").value)
  parameters.append("estado_inquilino", getElementById("estado_inquilino_u").value)
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_INQUILINO, API_CREATE, parameters, fillTableInquilino);
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_inquilino.id);
  var object = {};
  parameters.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);
  console.log(json);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_INQUILINO, API_UPDATE, parameters, fillTableInquilino);
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_inquilino.id);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await deleteRow(API_INQUILINO, parameters, fillTableInquilino);
});

// Función para crear el grafico que, "La cantidad  de inquilinos por municipio segun el departamento"
export async function graphPieInquilinoDepartamento(id_departamento) {
  //Creo un formData para los parametros
  let parameters = new FormData();
  //Inserto el id_producto a los parametros
  parameters.append("id_departamento", id_departamento);
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_INQUILINO + "graphInquilino2";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let municipio = [];
      let num_inquilino = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        municipio.push(row.municipio);
        num_inquilino.push(row.count);
      });
      getElementById('graph_contrato').innerHTML = '<canvas id="chartInquilino" style="background-color: white; border-radius: 20px"></canvas>'
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      pieGraph(
        "chartInquilino",
        municipio,
        num_inquilino,
        "La cantidad  de inquilinos por municipio segun el departamento."
      );
    } else {
      console.log(response.exception);
    }
  }
}

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  console.log(datos_inquilino.id_departamento);
  await graphPieInquilinoDepartamento(datos_inquilino.id_departamento);
};
