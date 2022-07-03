//@ts-check

//Importar las constantes y metodos de components.js y api_constant.js
// @ts-ignore
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
  GET_METHOD,
  SERVER,
  API_CREATE,
  API_UPDATE,
  DOM_CONTENT_LOADED,
  SEARCH_BAR,
  SUBMIT,
  INSERT_MODAL,
  UPDATE_MODAL,
  DELETE_FORM,
} from "../constants/api_constant.js";
import {
  getElementById,
} from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_INQUILINO = SERVER + "privada/inquilino.php?action=";

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

  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  // @ts-ignore
  await readRows(API_INQUILINO, fillTableInquilino);
  // Se define una variable para establecer las opciones del componente Modal.

  //Cargar combo box de tipo inquilino
  await fillComboBoxTipoInquilino();
  //Carfar combo box de estado inquilino
  await fillComboxEstadoInquilino();
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
    // @ts-ignore
    getElementById(
      "tipo_inquilino_u"
    ).innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
  });
  APIResponse.dataset.map((element) => {
    // @ts-ignore
    getElementById(
      "tipo_inquilino_i"
    ).innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
  });
}

//Obtener los datos de combobox estado inquilino
async function fillComboxEstadoInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_INQUILINO + "readEstadoInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

  console.log(APIResponse)
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    // @ts-ignore
    getElementById(
      "estado_inquilino_i"
    ).innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`;
  });
  APIResponse.dataset.map((element) => {
    // @ts-ignore
    getElementById(
      "estado_inquilino_u"
    ).innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`;
  });
}

//@ts-ignore
window.seleccionarTipoinquilino = () => {
  //@ts-ignore
  datos_inquilino.id_tipo_inquilino =
    //@ts-ignore
    document.getElementById("tipo_inquilino").value;
};

//@ts-ignore
window.seleccionarEstadoinquilino = () => {
  //@ts-ignore
  datos_inquilino.id_estado_inquilino =
  //@ts-ignore
    document.getElementById("estado_inquilino").value;
};

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableInquilino(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    console.log(row)
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>
                <td><img src="../../api/imagenes/inquilino/${row.imagen}" width=100></td>
                <td>${row.nombre}</td>
                <td>${row.apellido}</td>
                <td>${row.numero_telefono}</td>
                <td>${row.correo_electronico}</td>
                <td>${row.fecha_nacimiento}</td>
                <td>${row.genero}</td>
                <td>${row.DUI}</td>
                <td>${row.NIT}</td>
                <td>${row.NRC}</td>
                <td class="d-flex justify-content-center">
                    <a onclick="guardarDatosinquilinoUpdate(${row.id_inquilino},'${row.nombre}','${row.apellido}','${row.DUI}','${row.NIT}','${row.telefono}','${row.correo_electronico}','${row.genero}','${row.fecha_nacimiento}',${row.id_estado_inquilino},${row.id_tipo_inquilino})" class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
                    data-bs-target="#actualizar"><img
                        src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                    <a onclick="guardarDatosinquilinoEliminar(${row.id_inquilino})" class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
                    data-bs-target="#eliminar"><img
                        src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  // @ts-ignore
  getElementById("tbody-tipoInquilino").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE inquilino
// @ts-ignore
window.guardarDatosinquilinoUpdate = (
  id_inquilino,
  nombre_inquilino,
  apellido_inquilino,
  dui,
  nit,
  nrc,
  telefono,
  correo,
  genero,
  fecha_nacimiento,
  id_estado_inquilino,
  id_tipo_inquilino
) => {
  datos_inquilino.id = id_inquilino;
  // @ts-ignore
  $("#actualizarform").modal("show");
  // datos_inquilino.nombre_estado_inquilino = nombre_estado
  // getElementById('tipo_inquilino').value = nombre_tipo
  //@ts-ignore
  document.getElementById("nombre_inquilino_update").value =
    String(nombre_inquilino);
  //@ts-ignore
  document.getElementById("apellido_inquilino_update").value =
    String(apellido_inquilino);
  //@ts-ignore
  document.getElementById("dui_update").value = String(dui);
  //@ts-ignore
  document.getElementById("nit_update").value = String(nit);
  //@ts-ignore
  document.getElementById("nit_update").value = String(nrc);
  //@ts-ignore
  document.getElementById("telefono_update").value = String(telefono);
  //@ts-ignore
  document.getElementById("correo_electronico_update").value = String(correo);
  //@ts-ignore
  document.getElementById("genero_update").value = String(genero); 
  //@ts-ignore
  document.getElementById("fecha_nacimiento_update").value =String(fecha_nacimiento);
  //@ts-ignore
  document.getElementById("genero_update").value = String(id_estado_inquilino);
  //@ts-ignore
  document.getElementById("genero_update").value = String(id_tipo_inquilino);

};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE inquilino
// @ts-ignore
window.guardarDatosinquilinoEliminar = (id_inquilino) => {
  datos_inquilino.id = id_inquilino;
  // @ts-ignore
  $("#eliminar").modal("show");
};

// Método que se ejecuta al enviar un formulario de busqueda
  //@ts-ignore

getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_INQUILINO, "search-bar", fillTableInquilino);
  });  

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
// @ts-ignore
getElementById("insert_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();

  // Se cierra el formulario de registro
  // @ts-ignore
 // $("#agregar").modal("hide");
  //@ts-ignore

  let parameters = new FormData(getElementById("insert_form"));
      //@ts-ignore
      parameters.append("genero", getElementById("genero_update").value)
      //@ts-ignore
      parameters.append("estado_inquilino", getElementById("estado_inquilino_u").value)

  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_INQUILINO, API_CREATE, parameters, fillTableInquilino);
});


// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
// @ts-ignore
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  // @ts-ignore
  $("#actualizarform").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("id", datos_inquilino.id);
    //@ts-ignore
  parameters.append("genero", getElementById("genero_update").value)
      //@ts-ignore
      parameters.append("estado_inquilino", getElementById("estado_inquilino_u").value)

  // API REQUEST
  await saveRow(API_INQUILINO, API_UPDATE, parameters, fillTableInquilino);
});

//EVENTO PARA DELETE
// @ts-ignore
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id", String(datos_inquilino.id));

  await deleteRow(API_INQUILINO, parameters, fillTableInquilino);

  // @ts-ignore
  $("#eliminar").modal("hide");
});
