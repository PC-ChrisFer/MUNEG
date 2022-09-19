// @ts-ignore
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
  DELETE_FORM,
  DOM_CONTENT_LOADED,
  INSERT_MODAL,
  SEARCH_BAR,
  SERVER,
  SUBMIT,
  UPDATE_MODAL,
} from "../constants/api_constant.js";
import {
  getElementById,
  validateExistenceOfUser,
} from "../constants/functions.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_PROPIETARIO = SERVER + "privada/tipo_propietario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_tipo_propietario = {
    id: 0,
    nombre_tipo: " ",
    visibilidad: " ",
};
// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
    validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_TIPO_PROPIETARIO, fillTableTipoPropietario);
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableTipoPropietario(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>  
                <td>${row.nombre_tipo}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardarDatosCategoriaUpdate(${row.id_tipo_propietario},'${row.nombre_tipo}, ${row.visibilidad}')" class="btn btn-primary">
                                <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosCategoriaDelete(${row.id_tipo_propietario})"  class="btn btn-primary"  
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                        </form>
                    </div>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-TipoPropietario").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosTipoPropietarioUpdate = (id_tipo_propietario, nombre_tipo, visibilidad) => {
    datos_tipo_propietario.id = id_tipo_propietario;
    $("#actualizarform").modal("show");
  
    // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
    //EL ATRIBUTO "value="""
    //@ts-ignore
    getElementById("tipo_propietario_update").value = String(nombre_tipo);
    getElementById("visibilidad_update").value = String(visibilidad);
};
  
// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosTipoPropietarioDelete = (id_tipo_propietario) => {
datos_tipo_propietario.id = id_tipo_propietario;
$("#eliminarForm").modal("show");
};
  
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_TIPO_PROPIETARIO, "search-bar", fillTableTipoPropietario);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-modal").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#agregarform").modal("hide");
    //@ts-ignore
    //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
    let parameters = new FormData(getElementById("insert-modal"));
  
    // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
    await saveRow(API_TIPO_PROPIETARIO, API_CREATE, parameters, fillTableTipoPropietario);
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update-modal").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#actualizarform").modal("hide");
    //@ts-ignore
    let parameters = new FormData(getElementById("update-modal"));
    //@ts-ignore
    parameters.append("id", datos_tipo_propietario["id"]);
  
    // API REQUEST
    await saveRow(API_TIPO_PROPIETARIO, API_UPDATE, parameters, fillTableTipoPropietario);
});

//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#eliminarForm").modal("hide");
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id", datos_tipo_propietario["id"]);
  
    //API REQUEST
    await deleteRow(API_TIPO_PROPIETARIO, parameters, fillTableTipoPropietario);
});