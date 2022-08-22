//@ts-check

//Importar las constantes y metodos de components.js y api_constant.js
import {
  readRows,
  saveRow,
  searchRows,
  deleteRow,
  unDeleteRow,
} from "../components.js";
import {
  getElementById,
   validateExistenceOfUser,
} from "../constants/functions.js";
import {
  API_CREATE,
  POST_METHOD,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
  SERVER,
  DOM_CONTENT_LOADED,
} from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

const API_CLIENTE = SERVER + "privada/cliente.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL CLIENTE, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosUpdate/guardarDatosDelete"
let datos_cliente = {
  id_cliente: 0,
  nombre_cliente: "",
  correo: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_CLIENTE, fillTableCliente);
});

// Método que se ejecuta al enviar un formulario de busqueda
//@ts-ignore
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CLIENTE, "search-bar", fillTableCliente);
});

export function fillTableCliente(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <tr>
            <td>${row.nombre_cliente}</td>
            <td>${row.correo}</td>
            <td class="d-flex justify-content-center">
                <a onclick="guardarDatosUpdate(${row.id_cliente},'${row.nombre_cliente}','${row.correo}')" class="btn" id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                <a onclick="guardarDatosDelete(${row.id_cliente})" class="btn" id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
            </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-cliente").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
// @ts-ignore
window.guardarDatosUpdate = (id_cliente, nombre_cliente, correo) => {
  datos_cliente.id_cliente = id_cliente;
  // @ts-ignore
  $("#actualizar").modal("show");
  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //EL ATRIBUTO "value="""
  //@ts-ignore
  document.getElementById("nombre_cliente_update").value =
    String(nombre_cliente);
  //@ts-ignore
  document.getElementById("correo_update").value = String(correo);
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
// @ts-ignore
window.guardarDatosDelete = (id_cliente) => {
  datos_cliente.id_cliente = id_cliente;
  // @ts-ignore
  $("#eliminar").modal("show");
};

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
//@ts-ignore
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // @ts-ignore
  $("#actualizar").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("id_cliente", datos_cliente["id_cliente"]);
  // API REQUEST
  await saveRow(API_CLIENTE, API_UPDATE, parameters, fillTableCliente);
});

//EVENTO PARA DELETE
//@ts-ignore
getElementById("delete_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // @ts-ignore
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id_cliente", datos_cliente["id_cliente"]);

  //API REQUEST
  await deleteRow(API_CLIENTE, parameters, fillTableCliente);
});
