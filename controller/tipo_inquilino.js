//@ts-check

//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, deleteRow, saveRow, searchRows} from "../components.js";
import { SERVER }
  from "../constants/api_constant.js";
import {
  getElementById,
   validateExistenceOfUser,
} from "../constants/functions.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_INQUILINO = SERVER + "privada/tipo_inquilino.php?action=";
// @ts-ignore
// @ts-ignore
const ENDPOINT_TIPO_INQUILINO =
  SERVER + "privada/tipo_inquilino.php?action=readAll";
//El nombre del CRUD que es
const CRUD_NAME = "tipo_inquilino";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_tipo_inquilino = {
  id: 0,
  nombre_tipo_inquilino: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Validar que el empleado este en sesión
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  //Declarando cual CRUD es este
  await readRows(API_TIPO_INQUILINO, fillTableTipoInquilino);
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableTipoInquilino(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += `
    <tr>
        <td>${row.nombre_tipo}</td>
        <td>${row.visibilidad}</td>
        <td class="d-flex justify-content-center">
             <a class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
            data-bs-target="#actualizar"><img
                src="../../resources/img/iconos_formularios/edit_35px.png"></a>
            <a onclick="guardarDatosTipoInquilinoEliminar(${row.id_tipo_inquilino})"  class="btn" href="#" id="button_ver_mas" data-bs-toggle="modal"
            data-bs-target="#eliminar"><img
                src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
        </td>
    </tr>
    `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-tipo-inquilino").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
// @ts-ignore
window.guardarDatosTipoInquilinoUpdate = (
  id_tipo_inquilino,
  nombre_tipo_inquilino
) => {
  datos_tipo_inquilino.id = id_tipo_inquilino;
  // @ts-ignore
  $("#actualizar").modal("show");
  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //EL ATRIBUTO "value="""
  //@ts-ignore
  document.getElementById("nombre_tipo_update").value =
    String(nombre_tipo_inquilino);
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
// @ts-ignore
window.guardarDatosTipoInquilinoEliminar = (id_tipo_inquilino) => {
  datos_tipo_inquilino.id = id_tipo_inquilino;
  // @ts-ignore
  $("#eliminar").modal("show");
};

// Método que se ejecuta al enviar un formulario de busqueda
/*getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_TIPO_EMPLEADO, "search-bar", fillTableTipoEmpleado);
});*/

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();

  // Se cierra el formulario de registro
  // @ts-ignore
  // $("#agregar").modal("hide");
  //@ts-ignore
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(event.target);

  // @ts-ignore
  parameters.append("visibilidad", getElementById("visibilidad").checked == true ? '1' : '0');

  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_TIPO_INQUILINO, API_CREATE, parameters, fillTableTipoInquilino);

  let guardar = window.location.href;
  window.location.href = guardar;
});


// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  // @ts-ignore
  $("#actualizar").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("id", datos_tipo_inquilino["id"]);

  // API REQUEST
  await saveRow(API_TIPO_INQUILINO, API_UPDATE, parameters, CRUD_NAME);
});


//EVENTO PARA DELETE
getElementById("delete_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  // @ts-ignore
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id", datos_tipo_inquilino["id"]);

  //API REQUEST
  await deleteRow(API_TIPO_INQUILINO, parameters, CRUD_NAME);
});

